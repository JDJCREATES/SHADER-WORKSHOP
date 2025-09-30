import ShaderCanvas from "./ShaderCanvas";
import defaultFragmentShader from '../shaders/fragmentShader.glsl?raw';

export default function ShaderPlayground() {
    return (
        <>
            <ShaderCanvas fragmentShaderSource={defaultFragmentShader} />
        </>
    );
}