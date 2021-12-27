import { IUniform, Material, Matrix4, Texture, Uniform, Vector2 } from '../index';

/**
 * Afterimage shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AfterimageShader) page for details.
 * See the [webgl / postprocessing / afterimage](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_afterimage) | page for a live demo.
 *
 */
export interface AfterimageShader {
	uniforms: {
		damp: Uniform;
		tOld: Uniform;
		tNew: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Basic shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BasicShader) page for details.
 *
 */
export interface BasicShader {
	uniforms: {};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Bleach bypass shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BleachBypassShader) page for details.
 * See the [webgl / postprocessing / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_advanced) | page for a live demo.
 *
 */
export interface BleachBypassShader {
	uniforms: {
		tDiffuse: Uniform;
		opacity: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Blend shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BlendShader) page for details.
 *
 */
export interface BlendShader {
	uniforms: {
		tDiffuse1: Uniform;
		tDiffuse2: Uniform;
		mixRatio: Uniform;
		opacity: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Bokeh shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BokehShader) page for details.
 * See the [webgl / postprocessing / dof](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_dof) | page for a live demo.
 *
 */
export interface BokehShader {
	defines: {
		DEPTH_PACKING: number;
		PERSPECTIVE_CAMERA: number;
	};
	uniforms: {
		tColor: Uniform;
		tDepth: Uniform;
		focus: Uniform;
		aspect: Uniform;
		aperture: Uniform;
		maxblur: Uniform;
		nearClip: Uniform;
		farClip: Uniform;
		textureWidth: Uniform;
		textureHeight: Uniform;
		focalDepth: Uniform;
		focalLength: Uniform;
		fstop: Uniform;
		showFocus: Uniform;
		manualdof: Uniform;
		vignetting: Uniform;
		depthblur: Uniform;
		threshold: Uniform;
		gain: Uniform;
		bias: Uniform;
		fringe: Uniform;
		znear: Uniform;
		zfar: Uniform;
		noise: Uniform;
		dithering: Uniform;
		pentagon: Uniform;
		shaderFocus: Uniform;
		focusCoords: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Bokeh depth shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BokehDepthShader) page for details.
 *
 */
export interface BokehDepthShader {
	uniforms: {
		mNear: Uniform;
		mFar: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Brightness contrast shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BrightnessContrastShader) page for details.
 *
 */
export interface BrightnessContrastShader {
	uniforms: {
		tDiffuse: Uniform;
		brightness: Uniform;
		contrast: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Color correction shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ColorCorrectionShader) page for details.
 *
 */
export interface ColorCorrectionShader {
	uniforms: {
		tDiffuse: Uniform;
		powRGB: Uniform;
		mulRGB: Uniform;
		addRGB: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Colorify shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ColorifyShader) page for details.
 * See the [webgl / postprocessing / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_advanced) | page for a live demo.
 *
 */
export interface ColorifyShader {
	uniforms: {
		tDiffuse: Uniform;
		color: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Convolution shader
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ConvolutionShader) page for details.
 *
 */
export interface ConvolutionShader {
	defines: {
		KERNEL_SIZE_FLOAT: string;
		KERNEL_SIZE_INT: string;
	};
	uniforms: {
		tDiffuse: Uniform;
		uImageIncrement: Uniform;
		cKernel: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;

	buildKernel(sigma: number): number[];
}

/**
 * Copy shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CopyShader) page for details.
 * See the [webgl / postprocessing / masking](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_masking) | page for a live demo.
 *
 */
export interface CopyShader {
	uniforms: {
		tDiffuse: Uniform;
		opacity: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

export interface DOFMipMapShader {
	uniforms: {
		tColor: Uniform;
		tDepth: Uniform;
		focus: Uniform;
		maxblur: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Depth limited blur shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DepthLimitedBlurShader) page for details.
 *
 */
export interface DepthLimitedBlurShader {
	defines: {
		KERNEL_RADIUS: number;
		DEPTH_PACKING: number;
		PERSPECTIVE_CAMERA: number;
	};
	uniforms: {
		tDiffuse: Uniform;
		size: Uniform;
		sampleUvOffsets: Uniform;
		sampleWeights: Uniform;
		tDepth: Uniform;
		cameraNear: Uniform;
		cameraFar: Uniform;
		depthCutoff: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

export interface BlurShaderUtils {
	createSampleWeights(kernelRadius: number, stdDev: number): number[];
	createSampleOffsets(kernelRadius: number, uvIncrement: Vector2): Vector2[];
	configure(configure: Material, kernelRadius: number, stdDev: number, uvIncrement: Vector2): void;
}

/**
 * Digital glitch
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DigitalGlitch) page for details.
 * See the [webgl / postprocessing / glitch](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_glitch) | page for a live demo.
 *
 */
export interface DigitalGlitch {
	uniforms: {
		tDiffuse: Uniform;
		tDisp: Uniform;
		byp: Uniform;
		amount: Uniform;
		angle: Uniform;
		seed: Uniform;
		seed_x: Uniform;
		seed_y: Uniform;
		distortion_x: Uniform;
		distortion_y: Uniform;
		col_s: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Dot screen shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DotScreenShader) page for details.
 * See the [webgl / postprocessing](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing) | page for a live demo.
 *
 */
export interface DotScreenShader {
	uniforms: {
		tDiffuse: Uniform;
		tSize: Uniform;
		center: Uniform;
		angle: Uniform;
		scale: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Fxaashader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FXAAShader) page for details.
 * See the [webgl / postprocessing / fxaa](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_fxaa) | page for a live demo.
 *
 */
export interface FXAAShader {
	uniforms: {
		tDiffuse: Uniform;
		resolution: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Film shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FilmShader) page for details.
 * See the [webgl / points / dynamic](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_points_dynamic) | page for a live demo.
 *
 */
export interface FilmShader {
	uniforms: {
		tDiffuse: Uniform;
		time: Uniform;
		nIntensity: Uniform;
		sIntensity: Uniform;
		sCount: Uniform;
		grayscale: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Focus shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FocusShader) page for details.
 *
 */
export interface FocusShader {
	uniforms: {
		tDiffuse: Uniform;
		screenWidth: Uniform;
		screenHeight: Uniform;
		sampleDistance: Uniform;
		waveFactor: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Frei chen shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FreiChenShader) page for details.
 *
 */
export interface FreiChenShader {
	uniforms: {
		tDiffuse: Uniform;
		aspect: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Gamma correction shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/GammaCorrectionShader) page for details.
 * See the [webgl / postprocessing / 3dlut](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_3dlut) | page for a live demo.
 *
 */
export interface GammaCorrectionShader {
	uniforms: {
		tDiffuse: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * God rays depth mask shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/GodRaysDepthMaskShader) page for details.
 * See the [webgl / postprocessing / godrays](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_godrays) | page for a live demo.
 *
 */
export interface GodRaysDepthMaskShader {
	uniforms: {
		tInput: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * God rays generate shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/GodRaysGenerateShader) page for details.
 * See the [webgl / postprocessing / godrays](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_godrays) | page for a live demo.
 *
 */
export interface GodRaysGenerateShader {
	uniforms: {
		tInput: Uniform;
		fStepSize: Uniform;
		vSunPositionScreenSpace: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * God rays combine shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/GodRaysCombineShader) page for details.
 * See the [webgl / postprocessing / godrays](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_godrays) | page for a live demo.
 *
 */
export interface GodRaysCombineShader {
	uniforms: {
		tColors: Uniform;
		tGodRays: Uniform;
		fGodRayIntensity: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * God rays fake sun shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/GodRaysFakeSunShader) page for details.
 * See the [webgl / postprocessing / godrays](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_godrays) | page for a live demo.
 *
 */
export interface GodRaysFakeSunShader {
	uniforms: {
		vSunPositionScreenSpace: Uniform;
		fAspect: Uniform;
		sunColor: Uniform;
		bgColor: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Halftone shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/HalftoneShader) page for details.
 * See the [webgl / postprocessing / rgb / halftone](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_rgb_halftone) | page for a live demo.
 *
 */
export interface HalftoneShader {
	uniforms: {
		tDiffuse: Uniform;
		shape: Uniform;
		radius: Uniform;
		rotateR: Uniform;
		rotateG: Uniform;
		rotateB: Uniform;
		scatter: Uniform;
		width: Uniform;
		height: Uniform;
		blending: Uniform;
		blendingMode: Uniform;
		greyscale: Uniform;
		disable: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Horizontal blur shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/HorizontalBlurShader) page for details.
 * See the [webgl / postprocessing / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_advanced) | page for a live demo.
 *
 */
export interface HorizontalBlurShader {
	uniforms: {
		tDiffuse: Uniform;
		h: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Horizontal tilt shift shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/HorizontalTiltShiftShader) page for details.
 *
 */
export interface HorizontalTiltShiftShader {
	uniforms: {
		tDiffuse: Uniform;
		h: Uniform;
		r: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Hue saturation shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/HueSaturationShader) page for details.
 *
 */
export interface HueSaturationShader {
	uniforms: {
		tDiffuse: Uniform;
		hue: Uniform;
		saturation: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Kaleido shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/KaleidoShader) page for details.
 *
 */
export interface KaleidoShader {
	uniforms: {
		tDiffuse: Uniform;
		sides: Uniform;
		angle: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Luminosity high pass shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LuminosityHighPassShader) page for details.
 * See the [webgl / postprocessing / sobel](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_sobel) | page for a live demo.
 *
 */
export interface LuminosityHighPassShader {
	shaderID: string;
	uniforms: {
		tDiffuse: Uniform;
		luminosityThreshold: Uniform;
		smoothWidth: Uniform;
		defaultColor: Uniform;
		defaultOpacity: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Luminosity shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LuminosityShader) page for details.
 * See the [webgl / postprocessing / sobel](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_sobel) | page for a live demo.
 *
 */
export interface LuminosityShader {
	uniforms: {
		tDiffuse: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Mirror shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MirrorShader) page for details.
 *
 */
export interface MirrorShader {
	uniforms: {
		tDiffuse: Uniform;
		side: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Normal map shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NormalMapShader) page for details.
 *
 */
export interface NormalMapShader {
	uniforms: {
		heightMap: Uniform;
		resolution: Uniform;
		scale: Uniform;
		height: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Pixel shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PixelShader) page for details.
 * See the [webgl / postprocessing / pixel](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_pixel) | page for a live demo.
 *
 */
export interface PixelShader {
	uniforms: {
		tDiffuse: Uniform;
		resolution: Uniform;
		pixelSize: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Rgbshift shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/RGBShiftShader) page for details.
 * See the [webgl / postprocessing](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing) | page for a live demo.
 *
 */
export interface RGBShiftShader {
	uniforms: {
		tDiffuse: Uniform;
		amount: Uniform;
		angle: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Saoshader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SAOShader) page for details.
 * See the [webgl / postprocessing / sao](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_sao) | page for a live demo.
 *
 */
export interface SAOShader {
	defines: {
		NUM_SAMPLES: number;
		NUM_RINGS: number;
		NORMAL_TEXTURE: number;
		DIFFUSE_TEXTURE: number;
		DEPTH_PACKING: number;
		PERSPECTIVE_CAMERA: number;
	};
	uniforms: {
		tDepth: Uniform;
		tDiffuse: Uniform;
		tNormal: Uniform;
		size: Uniform;
		cameraNear: Uniform;
		cameraFar: Uniform;
		cameraProjectionMatrix: Uniform;
		cameraInverseProjectionMatrix: Uniform;
		scale: Uniform;
		intensity: Uniform;
		bias: Uniform;
		minResolution: Uniform;
		kernelRadius: Uniform;
		randomSeed: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Smaaedges shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SMAAEdgesShader) page for details.
 * See the [webgl / postprocessing / smaa](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_smaa) | page for a live demo.
 *
 */
export interface SMAAEdgesShader {
	defines: {
		SMAA_THRESHOLD: string;
	};
	uniforms: {
		tDiffuse: Uniform;
		resolution: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Smaaweights shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SMAAWeightsShader) page for details.
 * See the [webgl / postprocessing / smaa](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_smaa) | page for a live demo.
 *
 */
export interface SMAAWeightsShader {
	defines: {
		SMAA_MAX_SEARCH_STEPS: string;
		SMAA_AREATEX_MAX_DISTANCE: string;
		SMAA_AREATEX_PIXEL_SIZE: string;
		SMAA_AREATEX_SUBTEX_SIZE: string;
	};
	uniforms: {
		tDiffuse: Uniform;
		tArea: Uniform;
		tSearch: Uniform;
		resolution: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Smaablend shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SMAABlendShader) page for details.
 * See the [webgl / postprocessing / smaa](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_smaa) | page for a live demo.
 *
 */
export interface SMAABlendShader {
	uniforms: {
		tDiffuse: Uniform;
		tColor: Uniform;
		resolution: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Ssaoshader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SSAOShader) page for details.
 * See the [webgl / postprocessing / ssao](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_ssao) | page for a live demo.
 *
 */
export interface SSAOShader {
	defines: {
		PERSPECTIVE_CAMERA: number;
		KERNEL_SIZE: number;
	};
	uniforms: {
		tDiffuse: Uniform;
		tNormal: Uniform;
		tDepth: Uniform;
		tNoise: Uniform;
		kernel: Uniform;
		cameraNear: Uniform;
		cameraFar: Uniform;
		resolution: Uniform;
		cameraProjectionMatrix: Uniform;
		cameraInverseProjectionMatrix: Uniform;
		kernelRadius: Uniform;
		minDistance: Uniform;
		maxDistance: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Ssaodepth shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SSAODepthShader) page for details.
 * See the [webgl / postprocessing / ssao](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_ssao) | page for a live demo.
 *
 */
export interface SSAODepthShader {
	defines: {
		PERSPECTIVE_CAMERA: number;
	};
	uniforms: {
		tDepth: Uniform;
		cameraNear: Uniform;
		cameraFar: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Ssaoblur shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SSAOBlurShader) page for details.
 * See the [webgl / postprocessing / ssao](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_ssao) | page for a live demo.
 *
 */
export interface SSAOBlurShader {
	uniforms: {
		tDiffuse: Uniform;
		resolution: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Ssrshader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SSRShader) page for details.
 * See the [webgl / postprocessing / ssr](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_ssr) | page for a live demo.
 *
 */
export interface SSRShader {
	defines: {
		MAX_STEP: number;
		isPerspectiveCamera: boolean;
		isDistanceAttenuation: boolean;
		isFresnel: boolean;
		isInfiniteThick: boolean;
		isSelective: boolean;
	};
	uniforms: {
		tDiffuse: IUniform<Texture | null>;
		tNormal: IUniform<Texture | null>;
		tMetalness: IUniform<Texture | null>;
		tDepth: IUniform<Texture | null>;
		cameraNear: IUniform<number>;
		cameraFar: IUniform<number>;
		resolution: IUniform<Vector2>;
		cameraProjectionMatrix: IUniform<Matrix4>;
		cameraInverseProjectionMatrix: IUniform<Matrix4>;
		opacity: IUniform<number>;
		maxDistance: IUniform<number>;
		cameraRange: IUniform<number>;
		thickness: IUniform<number>;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Ssrdepth shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SSRDepthShader) page for details.
 * See the [webgl / postprocessing / ssr](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_ssr) | page for a live demo.
 *
 */
export interface SSRDepthShader {
	defines: {
		PERSPECTIVE_CAMERA: number;
	};
	uniforms: {
		tDepth: IUniform<Texture | null>;
		cameraNear: IUniform<number>;
		cameraFar: IUniform<number>;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Ssrblur shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SSRBlurShader) page for details.
 * See the [webgl / postprocessing / ssr](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_ssr) | page for a live demo.
 *
 */
export interface SSRBlurShader {
	uniforms: {
		tDiffuse: IUniform<Texture | null>;
		resolution: IUniform<Vector2>;
		opacity: IUniform<number>;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Ssrr shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SSRrShader) page for details.
 * See the [webgl / postprocessing / ssrr](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_ssrr) | page for a live demo.
 *
 */
export interface SSRrShader {
	defines: {
		MAX_STEP: number;
		PERSPECTIVE_CAMERA: boolean;
		SPECULAR: boolean;
		FILL_HOLE: boolean;
		INFINITE_THICK: boolean;
	};

	uniforms: {
		tDiffuse: IUniform<Texture | null>;
		tSpecular: IUniform<Texture | null>;
		tNormalSelects: IUniform<Texture | null>;
		tRefractive: IUniform<Texture | null>;
		tDepthSelects: IUniform<Texture | null>;
		cameraNear: IUniform<number | null>;
		cameraFar: IUniform<number | null>;
		resolution: IUniform<Vector2>;
		cameraProjectionMatrix: IUniform<Matrix4>;
		cameraInverseProjectionMatrix: IUniform<Matrix4>;
		ior: IUniform<number>;
		cameraRange: IUniform<number>;
		maxDistance: IUniform<number>;
		surfDist: IUniform<number>;
	};

	vertexShader: string;

	fragmentShader: string;
}

/**
 * Ssrr depth shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SSRrDepthShader) page for details.
 * See the [webgl / postprocessing / ssrr](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_ssrr) | page for a live demo.
 *
 */
export interface SSRrDepthShader {
	defines: {
		PERSPECTIVE_CAMERA: number;
	};

	uniforms: {
		tDepth: IUniform<Texture | null>;
		cameraNear: IUniform<number | null>;
		cameraFar: IUniform<number | null>;
	};

	vertexShader: string;

	fragmentShader: string;
}

/**
 * Sepia shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SepiaShader) page for details.
 * See the [webgl / postprocessing / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_advanced) | page for a live demo.
 *
 */
export interface SepiaShader {
	uniforms: {
		tDiffuse: Uniform;
		amount: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Sobel operator shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SobelOperatorShader) page for details.
 * See the [webgl / postprocessing / sobel](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_sobel) | page for a live demo.
 *
 */
export interface SobelOperatorShader {
	uniforms: {
		tDiffuse: Uniform;
		resolution: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Subsurface scattering shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SubsurfaceScatteringShader) page for details.
 * See the [webgl / materials / subsurface / scattering](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_subsurface_scattering) | page for a live demo.
 *
 */
export interface SubsurfaceScatteringShader {
	uniforms: {
		alphaMap: Uniform;
		ambientLightColor: Uniform;
		color: Uniform;
		diffuse: Uniform;
		directionalLights: Uniform;
		directionalShadowMap: Uniform;
		directionalShadowMatrix: Uniform;
		emissive: Uniform;
		hemisphereLights: Uniform;
		lightProbe: Uniform;
		map: Uniform;
		opacity: Uniform;
		pointLights: Uniform;
		pointShadowMap: Uniform;
		pointShadowMatrix: Uniform;
		rectAreaLights: Uniform;
		shininess: Uniform;
		specular: Uniform;
		spotLights: Uniform;
		spotShadowMap: Uniform;
		spotShadowMatrix: Uniform;
		thicknessAmbient: Uniform;
		thicknessAttenuation: Uniform;
		thicknessColor: Uniform;
		thicknessDistortion: Uniform;
		thicknessMap: Uniform;
		thicknessPower: Uniform;
		thicknessScale: Uniform;
		uvTransform: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Technicolor shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TechnicolorShader) page for details.
 *
 */
export interface TechnicolorShader {
	uniforms: {
		tDiffuse: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Tone map shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ToneMapShader) page for details.
 *
 */
export interface ToneMapShader {
	uniforms: {
		tDiffuse: Uniform;
		averageLuminance: Uniform;
		luminanceMap: Uniform;
		maxLuminance: Uniform;
		minLuminance: Uniform;
		middleGrey: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Toon shader1
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FilmShader) page for details.
 *
 */
export interface ToonShader1 {
	uniforms: {
		uDirLightPos: Uniform;
		uDirLightColor: Uniform;
		uAmbientLightColor: Uniform;
		uBaseColor: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Toon shader2
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ToonShader2) page for details.
 *
 */
export interface ToonShader2 {
	uniforms: {
		uDirLightPos: Uniform;
		uDirLightColor: Uniform;
		uAmbientLightColor: Uniform;
		uBaseColor: Uniform;
		uLineColor1: Uniform;
		uLineColor2: Uniform;
		uLineColor3: Uniform;
		uLineColor4: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Toon shader hatching
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ToonShaderHatching) page for details.
 *
 */
export interface ToonShaderHatching {
	uniforms: {
		uDirLightPos: Uniform;
		uDirLightColor: Uniform;
		uAmbientLightColor: Uniform;
		uBaseColor: Uniform;
		uLineColor1: Uniform;
		uLineColor2: Uniform;
		uLineColor3: Uniform;
		uLineColor4: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Toon shader dotted
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ToonShaderDotted) page for details.
 *
 */
export interface ToonShaderDotted {
	uniforms: {
		uDirLightPos: Uniform;
		uDirLightColor: Uniform;
		uAmbientLightColor: Uniform;
		uBaseColor: Uniform;
		uLineColor1: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Triangle blur shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TriangleBlurShader) page for details.
 *
 */
export interface TriangleBlurShader {
	uniforms: {
		texture: Uniform;
		delta: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Unpack depth rgbashader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/UnpackDepthRGBAShader) page for details.
 *
 */
export interface UnpackDepthRGBAShader {
	uniforms: {
		tDiffuse: Uniform;
		opacity: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Vertical blur shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/VerticalBlurShader) page for details.
 * See the [webgl / postprocessing / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_advanced) | page for a live demo.
 *
 */
export interface VerticalBlurShader {
	uniforms: {
		tDiffuse: Uniform;
		v: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Vertical tilt shift shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/VerticalTiltShiftShader) page for details.
 *
 */
export interface VerticalTiltShiftShader {
	uniforms: {
		tDiffuse: Uniform;
		v: Uniform;
		r: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Vignette shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/VignetteShader) page for details.
 * See the [webgl / postprocessing / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_advanced) | page for a live demo.
 *
 */
export interface VignetteShader {
	uniforms: {
		tDiffuse: Uniform;
		offset: Uniform;
		darkness: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Volume render shader1
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/VolumeRenderShader1) page for details.
 * See the [webgl2 / materials / texture3d](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl2_materials_texture3d) | page for a live demo.
 *
 */
export interface VolumeRenderShader1 {
	uniforms: {
		u_size: Uniform;
		u_renderstyle: Uniform;
		u_renderthreshold: Uniform;
		u_clim: Uniform;
		u_data: Uniform;
		u_cmdata: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Water refraction shader
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WaterRefractionShader) page for details.
 * See the [webgl / refraction](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_refraction) | page for a live demo.
 *
 */
export interface WaterRefractionShader {
	uniforms: {
		color: Uniform;
		time: Uniform;
		tDiffuse: Uniform;
		tDudv: Uniform;
		textureMatrix: Uniform;
	};
	vertexShader: string;
	fragmentShader: string;
}
