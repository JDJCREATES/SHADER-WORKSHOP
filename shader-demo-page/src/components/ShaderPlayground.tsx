import ShaderCanvas from "./ShaderCanvas";

const defaultFragmentShader = `#ifdef GL_ES
precision mediump float;
#endif
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;

export default function ShaderPlayground() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ShaderCanvas fragmentShaderSource={defaultFragmentShader} />
        </div>
    );
}