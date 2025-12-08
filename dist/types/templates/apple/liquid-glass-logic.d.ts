export declare class LiquidGlassDialog {
    canvas: HTMLCanvasElement;
    dialog: HTMLElement;
    device: GPUDevice | null;
    context: GPUCanvasContext | null;
    pipeline: GPURenderPipeline | null;
    uniformBuffer: GPUBuffer | null;
    bindGroup: GPUBindGroup | null;
    backgroundTexture: GPUTexture | null;
    sampler: GPUSampler | null;
    startTime: number;
    isCapturing: boolean;
    animationFrameId: number | null;
    scrollListener: ((e: Event) => void) | null;
    resizeObserver: ResizeObserver | null;
    resizeDebounceTimer: number | null;
    isRendering: boolean;
    contextLost: boolean;
    pageReflection: ImageBitmap | null;
    rectBounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    constructor(canvas: HTMLCanvasElement, dialog: HTMLElement, pageReflection: ImageBitmap | null);
    init(): Promise<boolean>;
    initWebGPU(): Promise<boolean>;
    captureBackground(imageBitmap: ImageBitmap): Promise<void>;
    updateUniforms(): void;
    render(): void;
    resize(immediate?: boolean): void;
    setupScrollListener(): void;
    setupResizeObserver(): void;
    cleanup(): void;
}
