import * as THREE from 'three';
export const ShaderDemo15 = {
  vertexShader: `
  uniform vec2 size;
  out vec2 vUv;
  void main() {
	  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	  vUv.xy = position.xy / size + 0.5;
	  vUv.y = 1.0 - vUv.y; // original data is upside down
  }
  `,
  fragmentShader: `
  precision highp float;
  precision highp int;
  precision highp sampler2DArray;
  uniform sampler2DArray diffuse;
  in vec2 vUv;
  uniform int depth;
  void main() {
	  vec4 color = texture( diffuse, vec3( vUv, depth ) );
	  gl_FragColor = vec4( color.rrr * 1.5, 1.0 );
  }
  `,
  uniforms: {
    diffuse: { value: null },
    depth: { value: 55 },
    size: { value: new THREE.Vector2(50, 50) },
  },
};
