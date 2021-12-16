import { ShaderUtils } from '../../shader/shaders/shaderUtils';
import * as N3JS from './../../threejs-library/three-core';
import * as I3JS from './../../threejs-library/three-interface';


/**
 * RawShader material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRawShaderMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/RawShaderMaterial) page for a live demo.
 *
 */
export class NgxRawShaderMaterial extends N3JS.RawShaderMaterial {
	/**
	 * Creates an instance of ngx raw shader material.
	 *
	 * @param [parameters]
	 * @param [shaderId]
	 */
	constructor(
		parameters?: I3JS.ShaderMaterialParameters,
		shaderId?: string,
		glslVersion?: I3JS.GLSLVersion
	) {
		if (shaderId !== null && shaderId !== undefined) {
			const shader = ShaderUtils.getShaderClone(shaderId);
			parameters.vertexShader = shader.vertexShader;
			parameters.fragmentShader = shader.fragmentShader;
			parameters.uniforms = shader.uniforms;
			parameters.defines = shader.defines;
		}
		super(parameters);
		if (glslVersion !== undefined && glslVersion !== null) {
			this.glslVersion = glslVersion;
		}
	}
}

/**
 * Shader material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderMaterial) page for a live demo.
 *
 */
export class NgxShaderMaterial extends N3JS.ShaderMaterial {
	/**
	 * Creates an instance of ngx shader material.
	 *
	 * @param [parameters]
	 * @param [shaderId]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters, shaderId?: string) {
		if (shaderId !== null && shaderId !== undefined) {
			const shader = ShaderUtils.getShaderClone(shaderId);
			parameters.vertexShader = shader.vertexShader;
			parameters.fragmentShader = shader.fragmentShader;
			parameters.uniforms = shader.uniforms;
			parameters.defines = shader.defines;
		}
		super(parameters);
	}
}

/**
 * ShaderAudioVisualizer material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderAudioVisualizerMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderAudioVisualizerMaterial) page for a live demo.
 *
 */
export class NgxShaderAudioVisualizerMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader audio visualizer material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'AudioVisualizer');
	}
}

/**
 * AttributesParticles material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderAttributesParticlesMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderAttributesParticlesMaterial) page for a live demo.
 *
 */
export class NgxShaderAttributesParticlesMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader attributes particles material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'AttributesParticles');
	}
}

/**
 * SelectiveDraw material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderSelectiveDrawMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderSelectiveDrawMaterial) page for a live demo.
 *
 */
export class NgxShaderSelectiveDrawMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader selective draw material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'SelectiveDraw');
	}
}

/**
 * CustomAttributes material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderCustomAttributesMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderCustomAttributesMaterial) page for a live demo.
 *
 */
export class NgxShaderCustomAttributesMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader custom attributes material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'CustomAttributes');
	}
}

/**
 * CustomAttributesLines material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderCustomAttributesLinesMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderCustomAttributesLinesMaterial) page for a live demo.
 *
 */
export class NgxShaderCustomAttributesLinesMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader custom attributes lines material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'CustomAttributesLines');
	}
}

/**
 * CustomAttributesPoints material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderCustomAttributesPointsMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderCustomAttributesPointsMaterial) page for a live demo.
 *
 */
export class NgxShaderCustomAttributesPointsMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader custom attributes points material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'CustomAttributesPoints');
	}
}

/**
 * AttributeSizeColor material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderAttributeSizeColorMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderAttributeSizeColorMaterial) page for a live demo.
 *
 */
export class NgxShaderAttributeSizeColorMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader attribute size color material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'AttributeSizeColor');
	}
}

/**
 * AttributeSizeColor1 material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderAttributeSizeColor1Material) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderAttributeSizeColor1Material) page for a live demo.
 *
 */
export class NgxShaderAttributeSizeColor1Material extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader attribute size color1 material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'AttributeSizeColor1');
	}
}

/**
 * ShaderSkyDome material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderSkyDomeMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderSkyDomeMaterial) page for a live demo.
 *
 */
export class NgxShaderSkyDomeMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader shader sky dome material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'SkyDome');
	}
}

/**
 * ParallaxShader material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderParallaxMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderParallaxMaterial) page for a live demo.
 *
 */
export class NgxShaderParallaxMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader parallax material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'Parallax');
	}
}

/**
 * Fresnel material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderFresnelMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderFresnelMaterial) page for a live demo.
 *
 */
export class NgxShaderFresnelMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader fresnel material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'Fresnel');
	}
}

/**
 * SubsurfaceScattering material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderSubsurfaceScatteringMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderSubsurfaceScatteringMaterial) page for a live demo.
 *
 */
export class NgxShaderSubsurfaceScatteringMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader subsurface scattering material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'SubsurfaceScattering');
	}
}

/**
 * Wireframe material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderWireframeMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderWireframeMaterial) page for a live demo.
 *
 */
export class NgxShaderWireframeMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader wireframe material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'Wireframe');
	}
}

/**
 * NoiseRandom1D material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderNoiseRandom1DMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderNoiseRandom1DMaterial) page for a live demo.
 *
 */
export class NgxShaderNoiseRandom1DMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader noise random1 dmaterial.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'NoiseRandom1D');
	}
}

/**
 * NoiseRandom2D material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderNoiseRandom2DMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderNoiseRandom2DMaterial) page for a live demo.
 *
 */
export class NgxShaderNoiseRandom2DMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader noise random2 dmaterial.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'NoiseRandom2D');
	}
}

/**
 * NoiseRandom3D material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderNoiseRandom3DMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderNoiseRandom3DMaterial) page for a live demo.
 *
 */
export class NgxShaderNoiseRandom3DMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader noise random3 dmaterial.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'NoiseRandom3D');
	}
}

/**
 * ColorRainbow material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderColorRainbowMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderColorRainbowMaterial) page for a live demo.
 *
 */
export class NgxShaderColorRainbowMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader color rainbow material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'ColorRainbow');
	}
}

/**
 * VideoKinect material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderVideoKinectMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderVideoKinectMaterial) page for a live demo.
 *
 */
export class NgxShaderVideoKinectMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader video kinect material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'VideoKinect');
	}
}

/**
 * VolumeRenderShader1 material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderVolumeRenderShader1Material) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderVolumeRenderShader1Material) page for a live demo.
 *
 */
export class NgxShaderVolumeRenderShader1Material extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader volume render shader1 material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'VolumeRenderShader1');
	}
}

/**
 * Instancing material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderInstancingMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderInstancingMaterial) page for a live demo.
 *
 */
export class NgxShaderInstancingMaterial extends NgxRawShaderMaterial {
	/**
	 * Creates an instance of ngx shader instancing material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'Instancing');
	}
}

/**
 * ScaleColor material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderScaleColorMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderScaleColorMaterial) page for a live demo.
 *
 */
export class NgxShaderScaleColorMaterial extends NgxRawShaderMaterial {
	/**
	 * Creates an instance of ngx shader scale color material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'ScaleColor');
	}
}

/**
 * SinColor material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderSinColorMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderSinColorMaterial) page for a live demo.
 *
 */
export class NgxShaderSinColorMaterial extends NgxRawShaderMaterial {
	/**
	 * Creates an instance of ngx shader sin color material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'SinColor');
	}
}

/**
 * RaymarchingReflect material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderRaymarchingReflectMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderRaymarchingReflectMaterial) page for a live demo.
 *
 */
export class NgxShaderRaymarchingReflectMaterial extends NgxRawShaderMaterial {
	/**
	 * Creates an instance of ngx shader raymarching reflect material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'RaymarchingReflect');
	}
}

/**
 * Cloud material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderCloudMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderCloudMaterial) page for a live demo.
 *
 */
export class NgxShaderCloudMaterial extends NgxRawShaderMaterial {
	/**
	 * Creates an instance of ngx shader cloud material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'Cloud', N3JS.GLSL3);
	}
}

/**
 * Perlin material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderPerlinMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderPerlinMaterial) page for a live demo.
 *
 */
export class NgxShaderPerlinMaterial extends NgxRawShaderMaterial {
	/**
	 * Creates an instance of ngx shader perlin material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: I3JS.ShaderMaterialParameters) {
		super(parameters, 'Perlin', N3JS.GLSL3);
	}
}

