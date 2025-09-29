// basic default fragment shader

precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    // Normalize screen coordinates to 0-1 range
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Create a simple animated gradient
    vec3 color = vec3(
        0.5 + 0.5 * sin(u_time + uv.x * 3.14159),
        0.5 + 0.5 * sin(u_time + uv.y * 3.14159 + 2.0),
        0.5 + 0.5 * sin(u_time + (uv.x + uv.y) * 3.14159 + 4.0)
    );
    
    gl_FragColor = vec4(color, 1.0);
}