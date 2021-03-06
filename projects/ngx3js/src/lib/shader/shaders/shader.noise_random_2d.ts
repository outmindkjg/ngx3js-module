import { IShaderType } from '../../ngx-interface';

export const ShaderNoiseRandom2D: IShaderType = {
	vertexShader: `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
	fragmentShader: `
  #include <common>
  varying vec2 vUv;
  void main() {
    vec2 rand2 = vec2( rand( vUv ), rand( vUv + vec2( 0.4, 0.6 ) ) );
    gl_FragColor.xyz = mix( mix( vec3( 1.0, 1.0, 1.0 ), vec3( 0.0, 0.0, 1.0 ), rand2.x ), vec3( 0.0 ), rand2.y );
    gl_FragColor.w = 1.0;
  }
  `,
};
