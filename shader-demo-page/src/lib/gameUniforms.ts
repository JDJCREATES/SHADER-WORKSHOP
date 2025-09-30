const gameUniforms = {
    u_time: 0,
    u_resolution: { width: 0, height: 0 },
    u_mouse: { x: 0, y: 0 },
    u_cameraPosition: { x: 0, y: 0, z: 0 },
    u_lightDirection: { x: 0, y: 1, z: 0 },
    u_playerPosition: { x: 0, y: 0, z: 0 },
    u_playerHealth: 100,
    u_playerScore: 0,
    u_gameLevel: 1,
    u_timeOfDay: 0, // 0 to 24
    u_weatherCondition: 0, // 0: clear, 1: rain, 2: snow, etc.
    u_enemyCount: 0,
    u_npcCount: 0,
    u_colonistCount: 0,
    
    u_isPaused: false,
    u_isGameOver: false,
    u_backgroundColor: { r: 0, g: 0, b: 0 },
    u_foregroundColor: { r: 1, g: 1, b: 1 },
    u_ambientLightColor: { r: 0.2, g: 0.2, b: 0.2 },
    u_diffuseLightColor: { r: 1, g: 1, b: 1 },
    u_specularLightColor: { r: 1, g: 1, b: 1 },
    u_materialShininess: 32.0,
    u_fogDensity: 0.0,
    u_fogColor: { r: 0.5, g: 0.5, b: 0.5 },
    u_textureScale: { x: 1, y: 1 },
    u_textureOffset: { x: 0, y: 0 },
    u_windDirection: { x: 1, y: 0, z: 0 },
    u_windSpeed: 0.0,
    u_gravity: { x: 0, y: -9.81, z: 0 },
    u_timeSinceLastCheckpoint: 0.0,
    u_totalPlayTime: 0.0,
    u_frameCount: 0,
    u_deltaTime: 0.016, // assuming 60 FPS
    u_aspectRatio: 1.0,
    u_fieldOfView: 45.0,
    u_nearClip: 0.1,
    u_farClip: 1000.0,
    u_projectionMatrix: new Float32Array(16), // 4x4 matrix
    u_viewMatrix: new Float32Array(16), // 4x4 matrix
    u_modelMatrix: new Float32Array(16), // 4x4 matrix
    u_normalMatrix: new Float32Array(9), // 3x3 matrix
    // Add more game-specific uniforms as needed

    
};

export default gameUniforms;