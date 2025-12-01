/**
 * Liquid Glass WebGPU Renderer
 * Main application logic for the liquid glass effect adapted for PWA install dialog
 */

import { SHADER_CODE, SHADER_PARAMS } from './liquid-glass-shader';
import html2canvas from 'html2canvas';

export class LiquidGlassDialog {
  canvas: HTMLCanvasElement;
  dialog: HTMLElement;
  device: GPUDevice | null = null;
  context: GPUCanvasContext | null = null;
  pipeline: GPURenderPipeline | null = null;
  uniformBuffer: GPUBuffer | null = null;
  bindGroup: GPUBindGroup | null = null;
  backgroundTexture: GPUTexture | null = null;
  sampler: GPUSampler | null = null;
  startTime: number;
  isCapturing: boolean = false;
  animationFrameId: number | null = null;
  scrollListener: ((e: Event) => void) | null = null;
  resizeObserver: ResizeObserver | null = null;
  resizeDebounceTimer: number | null = null;
  isRendering: boolean = false;
  contextLost: boolean = false;
  pageReflection: ImageBitmap | null = null;
  
  // Track dialog rect position and size
  rectBounds = { x: 0, y: 0, width: 0, height: 0 };
  
  constructor(canvas: HTMLCanvasElement, dialog: HTMLElement, pageReflection: ImageBitmap | null) {
    this.canvas = canvas;
    this.dialog = dialog;
    this.pageReflection = pageReflection;
    this.startTime = performance.now();
  }

  async init() {
    const initialized = await this.initWebGPU();
    if (!initialized) {
      console.error('Failed to initialize WebGPU');
      return false;
    }
    
    // Capture background once at initialization
    await this.captureBackground(this.pageReflection!);
    
    this.resize();
    this.setupScrollListener();
    this.setupResizeObserver();
    
    // Start rendering only after background is captured and not already rendering
    if (!this.isRendering) {
      this.isRendering = true;
      requestAnimationFrame(() => this.render());
    }
    
    return true;
  }

  async initWebGPU(): Promise<boolean> {
    if (!('gpu' in navigator)) {
      console.log('WebGPU not supported');
      return false;
    }

    try {
      // Get adapter and device
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        console.error('No appropriate GPUAdapter found.');
        return false;
      }

      this.device = await adapter.requestDevice();
      
      // Configure canvas context
      this.context = this.canvas.getContext('webgpu') as GPUCanvasContext;
      if (!this.context) {
        console.error('Failed to get WebGPU context');
        return false;
      }

      const format = navigator.gpu.getPreferredCanvasFormat();

      // Initial configuration - ensure non-zero size
      const width = Math.max(1, this.canvas.width);
      const height = Math.max(1, this.canvas.height);
      if (this.canvas.width === 0 || this.canvas.height === 0) {
          this.canvas.width = width;
          this.canvas.height = height;
      }
      
      this.context.configure({
        device: this.device,
        format: format,
        alphaMode: 'premultiplied',
      });

      // Create shader module
      const shaderModule = this.device.createShaderModule({
        label: 'Liquid Glass Shader',
        code: SHADER_CODE
      });

      // Create uniform buffer (will hold rect bounds, resolution, time, etc.)
      this.uniformBuffer = this.device.createBuffer({
        size: 64, // 16 floats * 4 bytes
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });

      // Create sampler once
      this.sampler = this.device.createSampler({
        magFilter: 'linear',
        minFilter: 'linear',
      });

      // Create bind group layout
      const bindGroupLayout = this.device.createBindGroupLayout({
        entries: [
          { binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
          { binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } },
          { binding: 2, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'filtering' } }
        ]
      });

      // Create render pipeline immediately
      this.pipeline = this.device.createRenderPipeline({
        layout: this.device.createPipelineLayout({
          bindGroupLayouts: [bindGroupLayout]
        }),
        vertex: {
          module: shaderModule,
          entryPoint: 'vs_main',
        },
        fragment: {
          module: shaderModule,
          entryPoint: 'fs_main',
          targets: [{
            format: format
          }]
        },
        primitive: { topology: 'triangle-list' },
      });

      return true;
    } catch (error) {
      console.error('WebGPU initialization error:', error);
      return false;
    }
  }

  async captureBackground(imageBitmap: ImageBitmap) {
    if (this.isCapturing || typeof html2canvas === 'undefined' || !this.device || !this.pipeline || !this.uniformBuffer || !this.sampler) {
      return;
    }

    this.isCapturing = true;

    try {
      // Recreate texture with correct size if needed
      if (!this.backgroundTexture || 
          this.backgroundTexture.width !== imageBitmap.width ||
          this.backgroundTexture.height !== imageBitmap.height) {
        
        if (this.backgroundTexture) {
          this.backgroundTexture.destroy();
        }

        // Create texture with correct size from the image
        this.backgroundTexture = this.device.createTexture({
          size: [imageBitmap.width, imageBitmap.height, 1],
          format: 'rgba8unorm',
          usage: GPUTextureUsage.TEXTURE_BINDING |
                 GPUTextureUsage.COPY_DST |
                 GPUTextureUsage.RENDER_ATTACHMENT,
        });

        // Create bind group using existing pipeline layout
        this.bindGroup = this.device.createBindGroup({
          layout: this.pipeline.getBindGroupLayout(0),
          entries: [
            { binding: 0, resource: { buffer: this.uniformBuffer } },
            { binding: 1, resource: this.backgroundTexture.createView() },
            { binding: 2, resource: this.sampler }
          ]
        });
      }

      this.device.queue.copyExternalImageToTexture(
        { source: imageBitmap },
        { texture: this.backgroundTexture },
        [imageBitmap.width, imageBitmap.height]
      );

    } catch (error) {
      console.error('Failed to capture background:', error);
    } finally {
      this.isCapturing = false;
    }
  }

  updateUniforms() {
    if (!this.device || !this.uniformBuffer || !this.backgroundTexture) return;

    const rect = this.dialog.getBoundingClientRect();
    const time = (performance.now() - this.startTime) / 1000.0;
    
    // Get current scroll position
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;
    
    // Update rect bounds - dialog is fixed, so we need to account for scroll
    // The position in the captured texture is the dialog's viewport position + scroll offset
    this.rectBounds = {
      x: rect.left + scrollX,
      y: rect.top + scrollY,
      width: rect.width,
      height: rect.height
    };
    
    // Calculate texture coordinates for the part of the background under the rectangle
    const textureWidth = this.backgroundTexture.width;
    const textureHeight = this.backgroundTexture.height;
    
    // Pack uniforms (must match shader struct layout)
    const uniformData = new Float32Array([
      this.canvas.width,           // resolution.x
      this.canvas.height,          // resolution.y
      this.rectBounds.x,           // rectPos.x (position in the full page including scroll)
      this.rectBounds.y,           // rectPos.y (position in the full page including scroll)
      rect.width,                  // rectSize.x
      rect.height,                 // rectSize.y
      time,                        // time
      SHADER_PARAMS.refraction,    // refraction
      SHADER_PARAMS.bevelDepth,    // bevelDepth
      SHADER_PARAMS.bevelWidth,    // bevelWidth
      SHADER_PARAMS.radius,        // radius (border-radius in pixels)
      textureWidth,                // texture width
      textureHeight,               // texture height
      0.0,                         // padding
      0.0,                         // padding
    ]);
    
    this.device.queue.writeBuffer(this.uniformBuffer, 0, uniformData);
  }

  render() {
    if (!this.isRendering || this.contextLost) {
      return;
    }

    if (!this.device || !this.context || !this.pipeline || !this.bindGroup) {
      return;
    }

    try {
      this.updateUniforms();
      
      const commandEncoder = this.device.createCommandEncoder();
      const currentTexture = this.context.getCurrentTexture();
      const textureView = currentTexture.createView();
      
      const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [{
          view: textureView,
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          loadOp: 'clear',
          storeOp: 'store',
        }]
      };
      
      const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
      passEncoder.setPipeline(this.pipeline);
      passEncoder.setBindGroup(0, this.bindGroup);
      passEncoder.draw(6, 1, 0, 0);
      passEncoder.end();
      
      this.device.queue.submit([commandEncoder.finish()]);
      
      // Continue rendering
      if (this.isRendering) {
        requestAnimationFrame(() => this.render());
      }
    } catch (error) {
      console.error('Render error:', error);
      this.contextLost = true;
      this.isRendering = false;
      // Don't continue rendering if there's an error
    }
  }

  resize(immediate: boolean = false) {
    if (!this.context || !this.device) return;

    const rect = this.dialog.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, 2);
    
    const newWidth = Math.floor(rect.width * dpr);
    const newHeight = Math.floor(rect.height * dpr);
    
    // Always update style dimensions immediately to prevent visual jumps
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    
    // Only resize if dimensions actually changed
    if (this.canvas.width === newWidth && this.canvas.height === newHeight) {
      return;
    }
    
    // Debounce actual canvas resize and context reconfiguration during animations
    if (!immediate) {
      if (this.resizeDebounceTimer !== null) {
        clearTimeout(this.resizeDebounceTimer);
      }
      this.resizeDebounceTimer = window.setTimeout(() => {
        this.resize(true);
        this.resizeDebounceTimer = null;
      }, 100); // Wait 100ms after last resize event
      return;
    }
    
    this.canvas.width = newWidth;
    this.canvas.height = newHeight;
    
    // Reconfigure context after resize
    try {
      const format = navigator.gpu.getPreferredCanvasFormat();
      this.context.configure({
        device: this.device,
        format: format,
        alphaMode: 'premultiplied',
      });
    } catch (error) {
      console.error('Failed to reconfigure context:', error);
      this.contextLost = true;
      this.isRendering = false;
    }
  }

  setupScrollListener() {
    this.scrollListener = () => {
      if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
      }
      this.animationFrameId = requestAnimationFrame(() => {
        // Just update uniforms - no need to recapture, the render loop will pick up the new scroll position
        this.animationFrameId = null;
      });
    };
    
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  setupResizeObserver() {
    // Observe dialog size changes and update canvas accordingly
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this.dialog) {
          // Call resize without immediate flag to debounce during animations
          this.resize(false);
        }
      }
    });

    this.resizeObserver.observe(this.dialog);
  }

  cleanup() {
    // Stop rendering
    this.isRendering = false;
    
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
    
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    if (this.resizeDebounceTimer !== null) {
      clearTimeout(this.resizeDebounceTimer);
      this.resizeDebounceTimer = null;
    }

    // Clean up WebGPU resources
    if (this.backgroundTexture) {
      this.backgroundTexture.destroy();
      this.backgroundTexture = null;
    }
    
    if (this.uniformBuffer) {
      this.uniformBuffer.destroy();
      this.uniformBuffer = null;
    }

    // Clear other references
    this.bindGroup = null;
    this.pipeline = null;
    this.context = null;
    this.device = null;
  }
}
