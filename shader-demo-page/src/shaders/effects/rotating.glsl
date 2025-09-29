// Rotating geometric shapes
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_rotationSpeed;
uniform vec2 u_shapeSize;
uniform float u_shapeCount;

mat2 rotate2d(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat2(c, -s, s, c);
}

float box(vec2 st, vec2 size) {
    vec2 d = abs(st) - size;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 st = uv * 2.0 - 1.0;
    st.x *= u_resolution.x / u_resolution.y;
    
    vec3 finalColor = vec3(0.0);
    
    // Create multiple rotating shapes
    for (float i = 0.0; i < u_shapeCount; i++) {
        vec2 pos = st;
        pos = rotate2d(u_time * u_rotationSpeed + i * 0.5) * pos;
        pos += vec2(sin(u_time + i) * 0.3, cos(u_time * 0.7 + i) * 0.2);
        
        float sdf = box(pos, u_shapeSize);
        float mask = 1.0 - smoothstep(0.0, 0.02, abs(sdf));
        
        vec3 color = palette(i / u_shapeCount + u_time * 0.2);
        finalColor += color * mask;
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
}