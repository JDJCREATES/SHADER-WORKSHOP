// renders a fullscreen quad with the shader applied

import React, { useRef, useEffect } from 'react';
import { initWebGL, createShader, createProgram, resizeCanvasToDisplaySize } from '../lib/glUtils';
import vertexShaderSource from '../shaders/vertexShader.glsl?raw';


interface ShaderCanvasProps {
    fragmentShaderSource: string;
    uniforms?: Record<string, number | number[] | [number, number] | [number, number, number] | [number, number, number, number]>;
    mousePosition?: { x: number; y: number };
}

const ShaderCanvas: React.FC<ShaderCanvasProps> = ({ 
    fragmentShaderSource, 
    uniforms = {},
    mousePosition = { x: 0, y: 0 }
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glRef = useRef<WebGLRenderingContext | null>(null);
    const programRef = useRef<WebGLProgram | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const resolutionRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const gl = initWebGL(canvas);
        if (!gl) return;
        glRef.current = gl;
        startTimeRef.current = performance.now();
        resolutionRef.current = { width: canvas.width, height: canvas.height };

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vertexShader || !fragmentShader) return;
        
        const program = createProgram(gl, vertexShader, fragmentShader);
        if (!program) return;
        programRef.current = program;

        // Create vertex buffer for fullscreen quad
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [
            -1, -1,
             1, -1,
            -1,  1,
            -1,  1,
             1, -1,
             1,  1,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        const render = (time: number) => {
            if (!gl || !program || startTimeRef.current === null) return;
            
            resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);

            const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
            const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
            const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse');
            const currentTime = (time - startTimeRef.current) / 1000;

            if (timeUniformLocation) {
                gl.uniform1f(timeUniformLocation, currentTime);
            }
            if (resolutionUniformLocation) {
                gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
            }
            if (mouseUniformLocation) {
                gl.uniform2f(mouseUniformLocation, mousePosition.x, mousePosition.y);
            }

            // Set custom uniforms
            Object.entries(uniforms).forEach(([name, value]) => {
                const location = gl.getUniformLocation(program, name);
                if (location) {
                    if (typeof value === 'number') {
                        gl.uniform1f(location, value);
                    } else if (Array.isArray(value)) {
                        switch (value.length) {
                            case 2:
                                gl.uniform2f(location, value[0], value[1]);
                                break;
                            case 3:
                                gl.uniform3f(location, value[0], value[1], value[2]);
                                break;
                            case 4:
                                gl.uniform4f(location, value[0], value[1], value[2], value[3]);
                                break;
                        }
                    }
                }
            });
            
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameIdRef.current = requestAnimationFrame(render);
        };

        // Start the render loop
        render(performance.now());

        // Cleanup function
        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [fragmentShaderSource, uniforms, mousePosition]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
};

export default ShaderCanvas;