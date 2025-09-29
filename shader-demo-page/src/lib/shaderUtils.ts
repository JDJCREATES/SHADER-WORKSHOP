// Shader utility functions for common patterns and effects

export const shaderUtils = {
  // Common shader header with uniforms
  getBaseUniforms: () => `
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
`,

  // UV coordinate setup
  getUVSetup: () => `
vec2 uv = gl_FragCoord.xy / u_resolution.xy;
vec2 st = uv * 2.0 - 1.0;  // Normalized coordinates (-1 to 1)
st.x *= u_resolution.x / u_resolution.y;  // Fix aspect ratio
`,

  // Color mixing functions
  getColorUtils: () => `
vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`,

  // Distance functions for shapes
  getShapeFunctions: () => `
float circle(vec2 st, float radius) {
    return length(st) - radius;
}

float box(vec2 st, vec2 size) {
    vec2 d = abs(st) - size;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float smoothstep_sdf(float sdf, float width) {
    return 1.0 - smoothstep(0.0, width, abs(sdf));
}
`,

  // Animation helpers
  getAnimationUtils: () => `
float pulse(float speed) {
    return sin(u_time * speed) * 0.5 + 0.5;
}

float wave(float speed, float amplitude, float frequency, vec2 coord) {
    return sin(coord.x * frequency + u_time * speed) * amplitude;
}

mat2 rotate2d(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat2(c, -s, s, c);
}
`,

  // Build complete shader
  buildShader: (mainBody: string, includeUtils: string[] = []) => {
    let shader = shaderUtils.getBaseUniforms();
    
    if (includeUtils.includes('uv')) shader += shaderUtils.getUVSetup();
    if (includeUtils.includes('colors')) shader += shaderUtils.getColorUtils();
    if (includeUtils.includes('shapes')) shader += shaderUtils.getShapeFunctions();
    if (includeUtils.includes('animation')) shader += shaderUtils.getAnimationUtils();
    
    shader += `
void main() {
${mainBody}
}`;
    
    return shader;
  }
};

// Quick shader templates
export const shaderTemplates = {
  rainbow: () => shaderUtils.buildShader(`
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = palette(uv.x + u_time * 0.5);
    gl_FragColor = vec4(color, 1.0);
`, ['colors']),

  circle: () => shaderUtils.buildShader(`
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 st = uv * 2.0 - 1.0;
    st.x *= u_resolution.x / u_resolution.y;
    
    float sdf = circle(st, 0.3);
    float mask = smoothstep_sdf(sdf, 0.02);
    
    vec3 color = vec3(mask);
    gl_FragColor = vec4(color, 1.0);
`, ['shapes']),

  waves: () => shaderUtils.buildShader(`
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    float w1 = wave(2.0, 0.1, 5.0, uv);
    float w2 = wave(1.5, 0.15, 3.0, uv + vec2(0.5, 0.0));
    
    vec3 color = hsv2rgb(vec3(uv.x + w1 + w2 + u_time * 0.1, 0.8, 1.0));
    gl_FragColor = vec4(color, 1.0);
`, ['colors', 'animation']),

  rotating: () => shaderUtils.buildShader(`
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 st = uv * 2.0 - 1.0;
    st.x *= u_resolution.x / u_resolution.y;
    
    st = rotate2d(u_time) * st;
    
    float sdf = box(st, vec2(0.3, 0.1));
    float mask = smoothstep_sdf(sdf, 0.02);
    
    vec3 color = palette(mask + u_time * 0.5);
    gl_FragColor = vec4(color, 1.0);
`, ['colors', 'shapes', 'animation'])
};