// Animated circle with customizable properties
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_radius;     // Custom uniform for circle size
uniform vec3 u_color;       // Custom uniform for circle color
uniform float u_speed;      // Custom uniform for animation speed

float circle(vec2 st, float radius) {
    return length(st) - radius;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 st = uv * 2.0 - 1.0;
    st.x *= u_resolution.x / u_resolution.y;
    
    // Animate the circle position
    st += vec2(sin(u_time * u_speed) * 0.3, cos(u_time * u_speed * 0.7) * 0.2);
    
    float sdf = circle(st, u_radius);
    float mask = 1.0 - smoothstep(0.0, 0.02, abs(sdf));
    
    vec3 color = u_color * mask;
    gl_FragColor = vec4(color, 1.0);
}