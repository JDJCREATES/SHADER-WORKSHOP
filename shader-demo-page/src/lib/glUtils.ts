export function initWebGL(canvas: HTMLCanvasElement): WebGLRenderingContext | null {
    const gl = canvas.getContext('webgl');
    if (!gl) {
        console.error("Failed to initialize WebGL context");
        return null;
    }
    return gl;
}

export function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) {
        console.error("Failed to create shader");
        return null;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const compileStatus = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compileStatus) {
        const error = gl.getShaderInfoLog(shader);
        console.error("Failed to compile shader:", error);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

export function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
    const program = gl.createProgram();
    if (!program) {
        console.error("Failed to create program");
        return null;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const error = gl.getProgramInfoLog(program);
        console.error("Failed to link program:", error);
        gl.deleteProgram(program);
        return null;
    }
    else {
        console.log("Shader program linked successfully");
    }
    return program;
}

export function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
    }
}

// Additional utility functions can be added here as needed
// e.g., functions for setting up buffers, attributes, uniforms, etc.

// Example: Function to create and bind a buffer
export function createAndBindBuffer(gl: WebGLRenderingContext, data: Float32Array): WebGLBuffer | null {
    const buffer = gl.createBuffer();
    if (!buffer) {
        console.error("Failed to create buffer");
        return null;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return buffer;
}

// Example: Function to set up a vertex attribute
export function setupVertexAttribute(gl: WebGLRenderingContext, program: WebGLProgram, attributeName: string, size: number, type: number, normalized: boolean, stride: number, offset: number) {
    const attributeLocation = gl.getAttribLocation(program, attributeName);
    if (attributeLocation === -1) {
        console.error("Failed to get attribute location:", attributeName);
        return;
    }
    gl.vertexAttribPointer(attributeLocation, size, type, normalized, stride, offset);
    gl.enableVertexAttribArray(attributeLocation);
}

// Example: Function to set a uniform variable
export function setUniform1f(gl: WebGLRenderingContext, program: WebGLProgram, uniformName: string, value: number) {
    const uniformLocation = gl.getUniformLocation(program, uniformName);
    if (!uniformLocation) {
        console.error("Failed to get uniform location:", uniformName);
        return;
    }
    gl.uniform1f(uniformLocation, value);
}

// More functions can be added as needed for different types of uniforms, textures, etc.
// --- IGNORE ---
// Example: Function to create and bind a texture
export function createAndBindTexture(gl: WebGLRenderingContext, image: HTMLImageElement): WebGLTexture | null {
    const texture = gl.createTexture();
    if (!texture) {
        console.error("Failed to create texture");
        return null;
    }
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    return texture;
}

// Example: Function to clear the canvas
export function clearCanvas(gl: WebGLRenderingContext, r: number, g: number, b: number, a: number) {
    gl.clearColor(r, g, b, a);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

// Example: Function to draw the scene
export function drawScene(gl: WebGLRenderingContext, program: WebGLProgram, vertexCount: number) {
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
}

