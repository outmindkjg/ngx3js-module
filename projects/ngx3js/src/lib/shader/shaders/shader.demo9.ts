import { NgxThreeUtil } from '../../interface';
import { IShaderType } from '../../ngx-interface';

export const ShaderDemo9: IShaderType = {
	vertexShader: `
  attribute float size;
  attribute vec3 customColor;
  varying vec3 vColor;
  void main() {
    vColor = customColor;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = size * ( 300.0 / -mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
	fragmentShader: `
  uniform vec3 color;
  uniform sampler2D pointTexture;
  uniform float alphaTest;
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4( color * vColor, 1.0 );
    gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
    if ( gl_FragColor.a < alphaTest ) discard;
  }
  `,
	uniforms: {
		color: { value: NgxThreeUtil.getColorSafe(0xffffff) },
		pointTexture: { value: null },
		alphaTest: { value: 0.9 },
	},
};
