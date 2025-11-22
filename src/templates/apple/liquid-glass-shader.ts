/**
 * Liquid Glass WebGPU Shader
 * Adaptable glass refraction effect for any rectangle size
 */

export const SHADER_CODE = `
struct Uniforms {
  resolution: vec2f,
  rectPos: vec2f,
  rectSize: vec2f,
  time: f32,
  refraction: f32,
  bevelDepth: f32,
  bevelWidth: f32,
  radius: f32,
  textureWidth: f32,
  textureHeight: f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var bgTexture: texture_2d<f32>;
@group(0) @binding(2) var bgSampler: sampler;

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
}

@vertex
fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  var positions = array<vec2f, 6>(
    vec2f(-1.0, -1.0),
    vec2f(1.0, -1.0),
    vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0),
    vec2f(1.0, -1.0),
    vec2f(1.0, 1.0)
  );
  
  var output: VertexOutput;
  output.position = vec4f(positions[vertexIndex], 0.0, 1.0);
  output.uv = (positions[vertexIndex] + 1.0) * 0.5;
  return output;
}

// Unsigned distance to rounded box
fn udRoundBox(p: vec2f, b: vec2f, r: f32) -> f32 {
  return length(max(abs(p) - b + r, vec2f(0.0))) - r;
}

fn random(st: vec2f) -> f32 {
  return fract(sin(dot(st, vec2f(12.9898, 78.233))) * 43758.5453123);
}

fn edgeFactor(uv: vec2f, rectSize: vec2f, radius: f32) -> f32 {
  let p_px = (uv - 0.5) * rectSize;
  let b_px = 0.5 * rectSize;
  let d = -udRoundBox(p_px, b_px, radius);
  let bevel_px = uniforms.bevelWidth * min(rectSize.x, rectSize.y);
  return 1.0 - smoothstep(0.0, bevel_px, d);
}

@fragment
fn fs_main(input: VertexOutput) -> @location(0) vec4f {
  // input.uv is already 0-1 within the canvas (which fills the rectangle)
  let localUV = input.uv;
  
  // Calculate edge factor for beveling
  let edge = edgeFactor(localUV, uniforms.rectSize, uniforms.radius);
  
  // Calculate refraction offset
  let p = localUV - 0.5;
  
  // Create rectangular distortion area that maintains aspect ratio
  // Keep small safe space from borders (distortion area is 0.85 of the size)
  let distortionScale = vec2f(1, 1); // Small safe space around borders
  let normalizedP = p / distortionScale; // Scale to -1 to 1 in distortion area
  
  // Calculate distance for rectangular distortion using max of abs values
  let rectDist = max(abs(normalizedP.x), abs(normalizedP.y));
  let centerDistortion = smoothstep(1.0, 0.0, rectDist); // Stronger inside rectangle
  
  // Use rectangular distance instead of circular for blend to avoid ball shape
  let rectBlend = smoothstep(0.15, 0.45, rectDist);
  
  let offsetAmt = (edge * uniforms.refraction + pow(edge, 10.0) * uniforms.bevelDepth) * (1.0 + centerDistortion * 3.0);
  let offset = normalize(p) * offsetAmt * rectBlend;
  
  // Map to the correct part of the captured background texture
  // Convert rectangle position to normalized texture coordinates
  let texLeft = uniforms.rectPos.x / uniforms.textureWidth;
  let texTop = uniforms.rectPos.y / uniforms.textureHeight;
  let texWidth = uniforms.rectSize.x / uniforms.textureWidth;
  let texHeight = uniforms.rectSize.y / uniforms.textureHeight;
  
  // Sample from the correct region with refraction
  // Flip Y coordinate since texture origin is top-left, but we want natural orientation
  let flippedUV = vec2f(localUV.x, 1.0 - localUV.y);
  let bgUV = vec2f(texLeft, texTop) + flippedUV * vec2f(texWidth, texHeight) + offset * vec2f(1.0, -1.0) * 0.1;
  
  var refrCol: vec4f;
  
  // Chromatic aberration strength increases at edges, fade out in center
  let chromaticStrength = edge * 0.003;
  let centerFade = smoothstep(0.0, 0.4, rectDist); // Fade chromatic effect in center
  

  // Chromatic aberration - sample RGB channels separately with slight offset at edges
  let offsetDir = normalize(p);
  
  // Apply chromatic aberration only at edges/sides
  let chromaticOffset = chromaticStrength * centerFade;
  
  // Red channel - shifted outward
  let rUV = bgUV + offsetDir * chromaticOffset * 1.5;
  let r = textureSample(bgTexture, bgSampler, rUV).r;
  
  // Green channel - center
  let g = textureSample(bgTexture, bgSampler, bgUV).g;
  
  // Blue channel - shifted inward
  let bUV = bgUV - offsetDir * chromaticOffset;
  let b = textureSample(bgTexture, bgSampler, bUV).b;
  
  refrCol = vec4f(r, g, b, 1.0);

  // Apply shape mask with rounded corners
  let p_px = (localUV - 0.5) * uniforms.rectSize;
  let b_px = 0.5 * uniforms.rectSize;
  let dmask = udRoundBox(p_px, b_px, uniforms.radius);
  let inShape = 1.0 - step(0.0, dmask);
  
  refrCol = vec4f(refrCol.rgb * inShape, inShape * 0.9);
  
  return refrCol;
}
`;

// Default shader parameters
export const SHADER_PARAMS = {
  refraction: 0.08,
  bevelDepth: 0.15,
  bevelWidth: 0.15,
  radius: 20.0,
};
