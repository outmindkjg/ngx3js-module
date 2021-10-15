import * as THREE from 'three';
export const ScaleColor = {
	vertexShader: `
  precision highp float;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float time;
  attribute vec3 position;
  attribute vec2 uv;
  attribute vec3 translate;
  varying vec2 vUv;
  varying float vScale;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( translate, 1.0 );
    vec3 trTime = vec3(translate.x + time,translate.y + time,translate.z + time);
    float scale =  sin( trTime.x * 2.1 ) + sin( trTime.y * 3.2 ) + sin( trTime.z * 4.3 );
    vScale = scale;
    scale = scale * 10.0 + 10.0;
    mvPosition.xyz += position * scale;
    vUv = uv;
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
	fragmentShader: `
  precision highp float;
  uniform sampler2D map;
  varying vec2 vUv;
  varying float vScale;
  // HSL to RGB Convertion helpers
  vec3 HUEtoRGB(float H){
    H = mod(H,1.0);
    float R = abs(H * 6.0 - 3.0) - 1.0;
    float G = 2.0 - abs(H * 6.0 - 2.0);
    float B = 2.0 - abs(H * 6.0 - 4.0);
    return clamp(vec3(R,G,B),0.0,1.0);
  }
  vec3 HSLtoRGB(vec3 HSL){
    vec3 RGB = HUEtoRGB(HSL.x);
    float C = (1.0 - abs(2.0 * HSL.z - 1.0)) * HSL.y;
    return (RGB - 0.5) * C + HSL.z;
  }
  void main() {
    vec4 diffuseColor = texture2D( map, vUv );
    gl_FragColor = vec4( diffuseColor.xyz * HSLtoRGB(vec3(vScale/5.0, 1.0, 0.5)), diffuseColor.w );
    if ( diffuseColor.w < 0.5 ) discard;
  }
  `,
	uniforms: {
		map: { value: null } as any,
		time: { value: 0.0 },
	},
};
