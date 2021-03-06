import { IShaderType } from '../../ngx-interface';

export const ShaderDemo8: IShaderType = {
	vertexShader: `
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
	fragmentShader: `
  void main() {
    if ( mod ( gl_FragCoord.x, 4.0001 ) < 1.0 || mod ( gl_FragCoord.y, 4.0001 ) < 1.0 )
      gl_FragColor = vec4( XXX, 1.0 );
    else
      gl_FragColor = vec4( 1.0 );
  }
  `,
};
