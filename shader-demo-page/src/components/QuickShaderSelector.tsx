import { useState } from 'react';
import ShaderCanvas from '../components/ShaderCanvas';
import { shaderTemplates } from '../lib/shaderUtils';

const quickEffects = {
  'Template: Rainbow': () => shaderTemplates.rainbow(),
  'Template: Circle': () => shaderTemplates.circle(),
  'Template: Waves': () => shaderTemplates.waves(), 
  'Template: Rotating': () => shaderTemplates.rotating(),
  'Custom: Simple Gradient': () => `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(uv.x, uv.y, sin(u_time));
    gl_FragColor = vec4(color, 1.0);
}`,
  'Custom: Pulsing Dot': () => `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 center = vec2(0.5);
    float dist = distance(uv, center);
    float pulse = sin(u_time * 3.0) * 0.1 + 0.2;
    float circle = smoothstep(pulse, pulse - 0.02, dist);
    gl_FragColor = vec4(vec3(circle), 1.0);
}`
};

export default function QuickShaderSelector() {
  const [selectedShader, setSelectedShader] = useState<keyof typeof quickEffects>('Template: Rainbow');

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Quick selector */}
      <div style={{ 
        padding: '10px', 
        background: '#2a2a2a', 
        display: 'flex', 
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        {Object.keys(quickEffects).map((name) => (
          <button
            key={name}
            onClick={() => setSelectedShader(name as keyof typeof quickEffects)}
            style={{
              padding: '8px 16px',
              background: selectedShader === name ? '#4a90e2' : '#3a3a3a',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div style={{ flex: 1 }}>
        <ShaderCanvas 
          fragmentShaderSource={quickEffects[selectedShader]()}
        />
      </div>
    </div>
  );
}