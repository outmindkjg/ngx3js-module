import * as THREE from 'three';
import { ReflectorForSSRPass } from './../../threejs-library/ReflectorForSSRPass';
import { AdaptiveToneMappingPass } from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import {
	BokehPass,
	BokehPassParamters,
} from 'three/examples/jsm/postprocessing/BokehPass';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass';
import { CubeTexturePass } from 'three/examples/jsm/postprocessing/CubeTexturePass';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import {
	HalftonePass,
	HalftonePassParameters,
} from 'three/examples/jsm/postprocessing/HalftonePass';
import {
	LUTPass,
	LUTPassParameters,
} from 'three/examples/jsm/postprocessing/LUTPass';
import {
	ClearMaskPass,
	MaskPass,
} from 'three/examples/jsm/postprocessing/MaskPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { Pass } from 'three/examples/jsm/postprocessing/Pass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import {
	SSRPass,
	SSRPassParams,
} from 'three/examples/jsm/postprocessing/SSRPass';
import {
	SSRrPass,
	SSRrPassParams,
} from 'three/examples/jsm/postprocessing/SSRrPass';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

/**
 * Reflector shader
 */
export interface ReflectorShader {
	defines: {
		DISTANCE_ATTENUATION: boolean;
		FRESNEL: boolean;
	};
	uniforms: {
		[key: string]: THREE.IUniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Reflector options
 */
export interface ReflectorOptions {
	clipBias?: number | undefined;
	textureWidth?: number | undefined;
	textureHeight?: number | undefined;
	color?: number | undefined;
	useDepthTexture?: boolean | undefined;
	shader?: ReflectorShader | undefined;
}

/**
 * ReflectorForSSR pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxReflectorForSSRPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/ReflectorForSSRPass) page for a live demo.
 *
 */
export class NgxReflectorForSSRPass extends ReflectorForSSRPass {
	/**
	 * Creates an instance of ngx reflector for ssrpass.
	 *
	 * @param geometry
	 * @param options
	 */
	constructor(geometry: THREE.BufferGeometry, options: ReflectorOptions) {
		super(geometry, options);
	}
}

/**
 * AdaptiveToneMapping pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAdaptiveToneMappingPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/AdaptiveToneMappingPass) page for a live demo.
 *
 */
export class NgxAdaptiveToneMappingPass extends AdaptiveToneMappingPass {
	/**
	 * Creates an instance of ngx adaptive tone mapping pass.
	 *
	 * @param [adaptive]
	 * @param [resolution]
	 */
	constructor(adaptive?: boolean, resolution?: number) {
		super(adaptive, resolution);
	}
}

/**
 * Afterimage pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAfterimagePass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/AfterimagePass) page for a live demo.
 *
 */
export class NgxAfterimagePass extends AfterimagePass {
	/**
	 * Creates an instance of ngx afterimage pass.
	 *
	 * @param [damp]
	 */
	constructor(damp?: number) {
		super(damp);
	}
}

/**
 * Bloom pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxBloomPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/BloomPass) page for a live demo.
 *
 */
export class NgxBloomPass extends BloomPass {
	/**
	 * Creates an instance of ngx bloom pass.
	 *
	 * @param [strength]
	 * @param [kernelSize]
	 * @param [sigma]
	 * @param [resolution]
	 */
	constructor(
		strength?: number,
		kernelSize?: number,
		sigma?: number,
		resolution?: number
	) {
		super(strength, kernelSize, sigma, resolution);
	}
}

/**
 * Bokeh pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxBokehPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/BokehPass) page for a live demo.
 *
 */
export class NgxBokehPass extends BokehPass {
	/**
	 * Creates an instance of ngx bokeh pass.
	 *
	 * @param scene
	 * @param camera
	 * @param params
	 */
	constructor(
		scene: THREE.Scene,
		camera: THREE.Camera,
		params: BokehPassParamters
	) {
		super(scene, camera, params);
	}
}

/**
 * Clear pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxClearPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/ClearPass) page for a live demo.
 *
 */
export class NgxClearPass extends ClearPass {
	/**
	 * Creates an instance of ngx clear pass.
	 *
	 * @param [clearColor]
	 * @param [clearAlpha]
	 */
	constructor(clearColor?: THREE.ColorRepresentation, clearAlpha?: number) {
		super(clearColor, clearAlpha);
	}
}

/**
 * CubeTexture pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCubeTexturePass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/CubeTexturePass) page for a live demo.
 *
 */
export class NgxCubeTexturePass extends CubeTexturePass {
	/**
	 * Creates an instance of ngx cube texture pass.
	 *
	 * @param camera
	 * @param [envMap]
	 * @param [opacity]
	 */
	constructor(
		camera: THREE.PerspectiveCamera,
		envMap?: THREE.CubeTexture,
		opacity?: number
	) {
		super(camera, envMap, opacity);
	}
}

/**
 * DotScreen pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxDotScreenPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/DotScreenPass) page for a live demo.
 *
 */
export class NgxDotScreenPass extends DotScreenPass {
	/**
	 * Creates an instance of ngx dot screen pass.
	 *
	 * @param [center]
	 * @param [angle]
	 * @param [scale]
	 */
	constructor(center?: THREE.Vector2, angle?: number, scale?: number) {
		super(center, angle, scale);
	}
}

/**
 * Film pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxFilmPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/FilmPass) page for a live demo.
 *
 */
export class NgxFilmPass extends FilmPass {
	/**
	 * Creates an instance of ngx film pass.
	 *
	 * @param [noiseIntensity]
	 * @param [scanlinesIntensity]
	 * @param [scanlinesCount]
	 * @param [grayscale]
	 */
	constructor(
		noiseIntensity?: number,
		scanlinesIntensity?: number,
		scanlinesCount?: number,
		grayscale?: number
	) {
		super(noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale);
	}
}

/**
 * Glitch pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxGlitchPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/GlitchPass) page for a live demo.
 *
 */
export class NgxGlitchPass extends GlitchPass {
	/**
	 * Creates an instance of ngx glitch pass.
	 *
	 * @param [dtSize]
	 */
	constructor(dtSize?: number) {
		super(dtSize);
	}
}

/**
 * Halftone pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxHalftonePass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/HalftonePass) page for a live demo.
 *
 */
export class NgxHalftonePass extends HalftonePass {
	/**
	 * Creates an instance of ngx halftone pass.
	 *
	 * @param width
	 * @param height
	 * @param params
	 */
	constructor(width: number, height: number, params: HalftonePassParameters) {
		super(width, height, params);
	}
}

/**
 * LUT pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLUTPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/LUTPass) page for a live demo.
 *
 */
export class NgxLUTPass extends LUTPass {
	/**
	 * Creates an instance of ngx lutpass.
	 *
	 * @param params
	 */
	constructor(params: LUTPassParameters) {
		super(params);
	}
}

/**
 * ClearMask pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxClearMaskPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/ClearMaskPass) page for a live demo.
 *
 */
export class NgxClearMaskPass extends ClearMaskPass {
	/**
	 * Creates an instance of ngx clear mask pass.
	 */
	constructor() {
		super();
	}
}

/**
 * Mask pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMaskPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/MaskPass) page for a live demo.
 *
 */
export class NgxMaskPass extends MaskPass {
	/**
	 * Creates an instance of ngx mask pass.
	 *
	 * @param scene
	 * @param camera
	 */
	constructor(scene: THREE.Scene, camera: THREE.Camera) {
		super(scene, camera);
	}
}

/**
 * OutlinePass pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxOutlinePass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/OutlinePass) page for a live demo.
 *
 */
export class NgxOutlinePass extends OutlinePass {
	/**
	 * Creates an instance of ngx outline pass.
	 *
	 * @param resolution
	 * @param scene
	 * @param camera
	 * @param [selectedObjects]
	 */
	constructor(
		resolution: THREE.Vector2,
		scene: THREE.Scene,
		camera: THREE.Camera,
		selectedObjects?: THREE.Object3D[]
	) {
		super(resolution, scene, camera, selectedObjects);
	}
}

/**
 * Pass pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer) page for a live demo.
 *
 */
export class NgxPass extends Pass {
	/**
	 * Creates an instance of ngx pass.
	 */
	constructor() {
		super();
	}
}

/**
 * Render pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRenderPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/RenderPass) page for a live demo.
 *
 */
export class NgxRenderPass extends RenderPass {
	/**
	 * Creates an instance of ngx render pass.
	 * @param scene
	 * @param camera
	 * @param [overrideMaterial]
	 * @param [clearColor]
	 * @param [clearAlpha]
	 */
	constructor(
		scene: THREE.Scene,
		camera: THREE.Camera,
		overrideMaterial?: THREE.Material,
		clearColor?: THREE.Color,
		clearAlpha?: number
	) {
		super(scene, camera, overrideMaterial, clearColor, clearAlpha);
	}
}

/**
 * SAO pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSAOPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/SAOPass) page for a live demo.
 *
 */
export class NgxSAOPass extends SAOPass {
	constructor(
		scene: THREE.Scene,
		camera: THREE.Camera,
		depthTexture?: boolean,
		useNormals?: boolean,
		resolution?: THREE.Vector2
	) {
		super(scene, camera, depthTexture, useNormals, resolution);
	}
}

/**
 * Save pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSavePass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/SavePass) page for a live demo.
 *
 */
export class NgxSavePass extends SavePass {
	/**
	 * Creates an instance of ngx save pass.
	 *
	 * @param renderTarget
	 */
	constructor(renderTarget: THREE.WebGLRenderTarget) {
		super(renderTarget);
	}
}

/**
 * Shader pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/ShaderPass) page for a live demo.
 *
 */
export class NgxShaderPass extends ShaderPass {
	/**
	 * Creates an instance of ngx shader pass.
	 *
	 * @param shader
	 * @param [textureId]
	 */
	constructor(shader: object, textureId?: string) {
		super(shader, textureId);
	}
}

/**
 * SMAA pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSMAAPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/SMAAPass) page for a live demo.
 *
 */
export class NgxSMAAPass extends SMAAPass {
	/**
	 * Creates an instance of ngx smaapass.
	 *
	 * @param width
	 * @param height
	 */
	constructor(width: number, height: number) {
		super(width, height);
	}
}

/**
 * SSAARender pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSSAARenderPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/SSAARenderPass) page for a live demo.
 *
 */
export class NgxSSAARenderPass extends SSAARenderPass {
	/**
	 * Creates an instance of ngx ssaarender pass.
	 *
	 * @param scene
	 * @param camera
	 * @param clearColor
	 * @param clearAlpha
	 */
	constructor(
		scene: THREE.Scene,
		camera: THREE.Camera,
		clearColor: THREE.ColorRepresentation,
		clearAlpha: number
	) {
		super(scene, camera, clearColor, clearAlpha);
	}
}

/**
 * SSAO pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSSAOPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/SSAOPass) page for a live demo.
 *
 */
export class NgxSSAOPass extends SSAOPass {
	/**
	 * Creates an instance of ngx ssaopass.
	 *
	 * @param scene
	 * @param camera
	 * @param [width]
	 * @param [height]
	 */
	constructor(
		scene: THREE.Scene,
		camera: THREE.Camera,
		width?: number,
		height?: number
	) {
		super(scene, camera, width, height);
	}
}

/**
 * SSR pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSSRPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/SSRPass) page for a live demo.
 *
 */
export class NgxSSRPass extends SSRPass {
	/**
	 * Creates an instance of ngx ssrpass.
	 *
	 * @param params
	 */
	constructor(params: SSRPassParams) {
		super(params);
	}
}

/**
 * SSRr pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSSRrPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/SSRrPass) page for a live demo.
 *
 */
export class NgxSSRrPass extends SSRrPass {
	/**
	 * Creates an instance of ngx ssrr pass.
	 *
	 * @param params
	 */
	constructor(params: SSRrPassParams) {
		super(params);
	}
}

/**
 * TAARender pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTAARenderPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/TAARenderPass) page for a live demo.
 *
 */
export class NgxTAARenderPass extends TAARenderPass {
	/**
	 * Creates an instance of ngx taarender pass.
	 *
	 * @param scene
	 * @param camera
	 * @param clearColor
	 * @param clearAlpha
	 */
	constructor(
		scene: THREE.Scene,
		camera: THREE.Camera,
		clearColor: THREE.ColorRepresentation,
		clearAlpha: number
	) {
		super(scene, camera, clearColor, clearAlpha);
	}
}

/**
 * Texture pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTexturePass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/TexturePass) page for a live demo.
 *
 */
export class NgxTexturePass extends TexturePass {
	/**
	 * Creates an instance of ngx texture pass.
	 *
	 * @param map
	 * @param [opacity]
	 */
	constructor(map: THREE.Texture, opacity?: number) {
		super(map, opacity);
	}
}

/**
 * UnrealBloom pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxUnrealBloomPass) page for details.
 * See the [ngx composer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_composer/UnrealBloomPass) page for a live demo.
 *
 */
export class NgxUnrealBloomPass extends UnrealBloomPass {
	/**
	 * Creates an instance of ngx unreal bloom pass.
	 *
	 * @param resolution
	 * @param strength
	 * @param radius
	 * @param threshold
	 */
	constructor(
		resolution: THREE.Vector2,
		strength: number,
		radius: number,
		threshold: number
	) {
		super(resolution, strength, radius, threshold);
	}
}

export {
	ReflectorForSSRPass,
	AdaptiveToneMappingPass,
	AfterimagePass,
	BloomPass,
	BokehPass,
	BokehPassParamters,
	ClearPass,
	CubeTexturePass,
	DotScreenPass,
	EffectComposer,
	FilmPass,
	GlitchPass,
	HalftonePass,
	HalftonePassParameters,
	LUTPass,
	LUTPassParameters,
	ClearMaskPass,
	MaskPass,
	OutlinePass,
	Pass,
	RenderPass,
	SAOPass,
	SavePass,
	ShaderPass,
	SMAAPass,
	SSAARenderPass,
	SSAOPass,
	SSRPass,
	SSRPassParams,
	SSRrPass,
	SSRrPassParams,
	TAARenderPass,
	TexturePass,
	UnrealBloomPass,
};
