// Wave distortion effect
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_amplitude;    // Wave strength
uniform float u_frequency;    // Wave frequency
uniform float u_waveSpeed;    // Wave animation speed

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Create multiple wave layers
    float wave1 = sin(uv.x * u_frequency + u_time * u_waveSpeed) * u_amplitude;
    float wave2 = sin(uv.y * u_frequency * 0.7 + u_time * u_waveSpeed * 1.3) * u_amplitude * 0.5;
    
    // Combine waves
    float distortion = wave1 + wave2;
    
    // Create color based on distortion and mouse position
    float mouseInfluence = length(uv - u_mouse / u_resolution.xy) * 2.0;
    float hue = uv.x + distortion + mouseInfluence + u_time * 0.1;
    
    vec3 color = hsv2rgb(vec3(hue, 0.8, 1.0));
    gl_FragColor = vec4(color, 1.0);
}