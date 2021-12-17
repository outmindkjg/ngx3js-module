import { IShaderType } from './../../ngx-interface';
import * as N3JS from './../../threejs-library/three-core';
import * as I3JS from './../../threejs-library/three-interface';
import { AttributesParticles } from './shader.attributes_particles';
import { AttributeSizeColor } from './shader.attributes_size_color';
import { AttributeSizeColor1 } from './shader.attributes_size_color1';
import { AudioVisualizer } from './shader.audio_visualizer';
import { CloudShader } from './shader.cloud';
import { ColorRainbow } from './shader.color_rainbow';
import { ColorRandom } from './shader.color_random';
import { ColorScreen } from './shader.color_screen';
import { CustomAttributes } from './shader.custom_attributes';
import { CustomAttributesLines } from './shader.custom_attributes_lines';
import { CustomAttributesPoints } from './shader.custom_attributes_points';
import { ShaderDemo1 } from './shader.demo1';
import { ShaderDemo10 } from './shader.demo10';
import { ShaderDemo11 } from './shader.demo11';
import { ShaderDemo12 } from './shader.demo12';
import { ShaderDemo13 } from './shader.demo13';
import { ShaderDemo14 } from './shader.demo14';
import { ShaderDemo15 } from './shader.demo15';
import { ShaderDemo16 } from './shader.demo16';
import { ShaderDemo2 } from './shader.demo2';
import { ShaderDemo3 } from './shader.demo3';
import { ShaderDemo4 } from './shader.demo4';
import { ShaderDemo5 } from './shader.demo5';
import { ShaderDemo6 } from './shader.demo6';
import { ShaderDemo7 } from './shader.demo7';
import { ShaderDemo8 } from './shader.demo8';
import { ShaderDemo9 } from './shader.demo9';
import { BufferGeometryInstancing } from './shader.instancing';
import { ShaderLava } from './shader.lava';
import { LightsHemisphere } from './shader.lights_hemisphere';
import { ModifierTessellation } from './shader.modifier_tessellation';
import { ShaderNoiseRandom1D } from './shader.noise_random_1d';
import { ShaderNoiseRandom2D } from './shader.noise_random_2d';
import { ShaderNoiseRandom3D } from './shader.noise_random_3d';
import { PerlinShader } from './shader.perlin';
import { PointsWaves } from './shader.points_waves';
import { RaymarchingReflect } from './shader.raymarching_reflect';
import { ScaleColor } from './shader.scale_color';
import { SelectiveDraw } from './shader.selective_draw';
import { SinColor } from './shader.sin_color';
import { ShaderSkyDome } from './shader.skydome';
import { UnrealBloomSelective } from './shader.unreal_bloom_selective';
import { VideoKinect } from './shader.video_kinect';
import { WireFrame } from './shader.wireframe';

export const ShaderAliasConf: {
	[key: string]: string;
} = {};
export const ShaderConf: {
	[key: string]: IShaderType | string;
} = {
	horizontalblurshader: N3JS.HorizontalBlurShader,
	horizontalblur: 'horizontalblurshader',
	smaaedgesshader: N3JS.SMAAEdgesShader,
	smaaedges: 'smaaedgesshader',
	smaaweightsshader: N3JS.SMAAWeightsShader,
	smaaweights: 'smaaweightsshader',
	smaablendshader: N3JS.SMAABlendShader,
	smaablend: 'smaablendshader',
	focusshader: N3JS.FocusShader,
	focus: 'focusshader',
	verticalblurshader: N3JS.VerticalBlurShader,
	verticalblur: 'verticalblurshader',
	godraysdepthmaskshader: N3JS.GodRaysDepthMaskShader,
	godraysdepthmask: 'godraysdepthmaskshader',
	godraysgenerateshader: N3JS.GodRaysGenerateShader,
	godraysgenerate: 'godraysgenerateshader',
	godrayscombineshader: N3JS.GodRaysCombineShader,
	godrayscombine: 'godrayscombineshader',
	godraysfakesunshader: N3JS.GodRaysFakeSunShader,
	godraysfakesun: 'godraysfakesunshader',
	// fresnelshader: N3JS.FresnelShader,
	// fresnel: 'fresnelshader',
	depthlimitedblurshader: N3JS.DepthLimitedBlurShader,
	depthlimitedblur: 'depthlimitedblurshader',
	convolutionshader: N3JS.ConvolutionShader,
	convolution: 'convolutionshader',
	basicshader: N3JS.BasicShader,
	basic: 'basicshader',
	sepiashader: N3JS.SepiaShader,
	sepia: 'sepiashader',
	rgbshiftshader: N3JS.RGBShiftShader,
	rgbshift: 'rgbshiftshader',
	mirrorshader: N3JS.MirrorShader,
	mirror: 'mirrorshader',
	bleachbypassshader: N3JS.BleachBypassShader,
	bleachbypass: 'bleachbypassshader',
	toonshader: N3JS.ToonShader1,
	toon: 'toonshader',
	toon1shader: N3JS.ToonShader1,
	toon1: 'toon1shader',
	toon2shader: N3JS.ToonShader2,
	toon2: 'toon2shader',
	colorcorrectionshader: N3JS.ColorCorrectionShader,
	colorcorrection: 'colorcorrectionshader',
	blendshader: N3JS.BlendShader,
	blend: 'blendshader',
	halftoneshader: N3JS.HalftoneShader,
	halftone: 'halftoneshader',
	technicolorshader: N3JS.TechnicolorShader,
	technicolor: 'technicolorshader',
	gammacorrectionshader: N3JS.GammaCorrectionShader,
	gammacorrection: 'gammacorrectionshader',
	tonemapshader: N3JS.ToneMapShader,
	tonemap: 'tonemapshader',
	dotscreenshader: N3JS.DotScreenShader,
	dotscreen: 'dotscreenshader',
	unpackdepthrgbashader: N3JS.UnpackDepthRGBAShader,
	unpackdepthrgba: 'unpackdepthrgbashader',
	subsurfacescatteringshader: N3JS.SubsurfaceScatteringShader,
	subsurfacescattering: 'subsurfacescatteringshader',
	digitalglitchshader: N3JS.DigitalGlitch,
	digitalglitch: 'digitalglitchshader',
	fxaashader: N3JS.FXAAShader,
	fxaa: 'fxaashader',
	dofmipmapshader: N3JS.DOFMipMapShader,
	dofmipmap: 'dofmipmapshader',
	freichenshader: N3JS.FreiChenShader,
	freichen: 'freichenshader',
	brightnesscontrastshader: N3JS.BrightnessContrastShader,
	brightnesscontrast: 'brightnesscontrastshader',
	pixelshader: N3JS.PixelShader,
	pixel: 'pixelshader',
	copyshader: N3JS.CopyShader,
	copy: 'copyshader',
	saoshader: N3JS.SAOShader,
	sao: 'saoshader',
	horizontaltiltshiftshader: N3JS.HorizontalTiltShiftShader,
	horizontaltiltshift: 'horizontaltiltshiftshader',
	// parallaxshader: ParallaxShader,
	// parallax: 'parallaxshader',
	luminosityshader: N3JS.LuminosityShader,
	luminosity: 'luminosityshader',
	huesaturationshader: N3JS.HueSaturationShader,
	huesaturation: 'huesaturationshader',
	luminosityhighpassshader: N3JS.LuminosityHighPassShader,
	luminosityhighpass: 'luminosityhighpassshader',
	bokehshader: N3JS.BokehShader,
	bokeh: 'bokehshader',
	filmshader: N3JS.FilmShader,
	film: 'filmshader',
	volumerender1shader: N3JS.VolumeRenderShader1,
	volumerendershader1: 'volumerender1shader',
	volumerender1: 'volumerender1shader',
	verticaltiltshiftshader: N3JS.VerticalTiltShiftShader,
	verticaltiltshift: 'verticaltiltshiftshader',
	kaleidoshader: N3JS.KaleidoShader,
	kaleido: 'kaleidoshader',
	colorifyshader: N3JS.ColorifyShader,
	colorify: 'colorifyshader',
	ssaoshader: N3JS.SSAOShader,
	ssao: 'ssaoshader',
	waterrefractionshader: N3JS.WaterRefractionShader,
	waterrefraction: 'waterrefractionshader',
	bokeh2shader: N3JS.BokehShader2 as any,
	bokehshader2: 'bokeh2shader',
	bokeh2: 'bokeh2shader',
	bokehdepthshader: N3JS.BokehDepthShader,
	bokehdepth: 'bokehdepthshader',
	normalmapshader: N3JS.NormalMapShader,
	normalmap: 'normalmapshader',
	afterimageshader: N3JS.AfterimageShader,
	afterimage: 'afterimageshader',
	vignetteshader: N3JS.VignetteShader,
	vignette: 'vignetteshader',
	triangleblurshader: N3JS.TriangleBlurShader,
	triangleblur: 'triangleblurshader',
	sobeloperatorshader: N3JS.SobelOperatorShader,
	sobeloperator: 'sobeloperatorshader',
	cloudshader: CloudShader,
	cloud: 'cloudshader',
	audiovisualizershader: AudioVisualizer,
	audiovisualizer: 'audiovisualizershader',
	wireframeshader: WireFrame,
	wireframe: 'wireframeshader',
	lightshemisphereshader: LightsHemisphere,
	lightshemisphere: 'lightshemisphereshader',
	attributesparticlesshader: AttributesParticles,
	attributesparticles: 'attributesparticlesshader',
	instancingshader: BufferGeometryInstancing,
	instancing: 'instancingshader',
	perlinshader: PerlinShader,
	perlin: 'perlinshader',
	pointswavesshader: PointsWaves,
	pointswaves: 'pointswavesshader',
	modifiertessellationshader: ModifierTessellation,
	modifiertessellation: 'modifiertessellationshader',
	selectivedrawshader: SelectiveDraw,
	selectivedraw: 'selectivedrawshader',
	customattributesshader: CustomAttributes,
	customattributes: 'customattributesshader',
	customattributeslinesshader: CustomAttributesLines,
	customattributeslines: 'customattributeslinesshader',
	attributeslines: 'customattributeslinesshader',
	customattributespointsshader: CustomAttributesPoints,
	customattributespoints: 'customattributespointsshader',
	attributespoints: 'customattributespointsshader',
	lavashader: ShaderLava,
	shaderlava: 'lavashader',
	lava: 'lavashader',
	videokinectshader: VideoKinect,
	videokinect: 'videokinectshader',

	skydomeshader: ShaderSkyDome,
	shaderskydome: 'skydomeshader',
	skydome: 'skydomeshader',

	demo1shader: ShaderDemo1,
	shaderdemo1: 'demo1shader',
	demo1: 'demo1shader',

	demo2shader: ShaderDemo2,
	shaderdemo2: 'demo2shader',
	demo2: 'demo2shader',

	demo3shader: ShaderDemo3,
	shaderdemo3: 'demo3shader',
	demo3: 'demo3shader',

	demo4shader: ShaderDemo4,
	shaderdemo4: 'demo4shader',
	demo4: 'demo4shader',

	demo5shader: ShaderDemo5,
	shaderdemo5: 'demo5shader',
	demo5: 'demo5shader',

	demo6shader: ShaderDemo6,
	shaderdemo6: 'demo6shader',
	demo6: 'demo6shader',

	demo7shader: ShaderDemo7,
	shaderdemo7: 'demo7shader',
	demo7: 'demo7shader',

	demo8shader: ShaderDemo8,
	shaderdemo8: 'demo8shader',
	demo8: 'demo8shader',

	demo9shader: ShaderDemo9,
	shaderdemo9: 'demo9shader',
	demo9: 'demo9shader',

	demo10shader: ShaderDemo10,
	shaderdemo10: 'demo10shader',
	demo10: 'demo10shader',

	demo11shader: ShaderDemo11,
	shaderdemo11: 'demo11shader',
	demo11: 'demo11shader',

	demo12shader: ShaderDemo12,
	shaderdemo12: 'demo12shader',
	demo12: 'demo12shader',

	demo13shader: ShaderDemo13,
	shaderdemo13: 'demo13shader',
	demo13: 'demo13shader',

	demo14shader: ShaderDemo14,
	shaderdemo14: 'demo14shader',
	demo14: 'demo14shader',

	demo15shader: ShaderDemo15,
	shaderdemo15: 'demo15shader',
	demo15: 'demo15shader',

	demo16shader: ShaderDemo16,
	shaderdemo16: 'demo16shader',
	demo16: 'demo16shader',

	scalecolorshader: ScaleColor,
	scalecolor: 'scalecolorshader',

	sincolorshader: SinColor,
	sincolor: 'sincolorshader',

	attributesizecolorshader: AttributeSizeColor,
	attributesizecolor: 'attributesizecolorshader',
	sizecolor: 'attributesizecolorshader',
	attributesizecolor1shader: AttributeSizeColor1,
	attributesizecolor1: 'attributesizecolor1shader',
	sizecolor1: 'attributesizecolor1shader',

	noiserandom1dshader: ShaderNoiseRandom1D,
	shadernoiserandom1d: 'noiserandom1dshader',
	noiserandom1d: 'noiserandom1dshader',

	noiserandom2dshader: ShaderNoiseRandom2D,
	shadernoiserandom2d: 'noiserandom2dshader',
	noiserandom2d: 'noiserandom2dshader',

	noiserandom3dshader: ShaderNoiseRandom3D,
	shadernoiserandom3d: 'noiserandom3dshader',
	noiserandom3d: 'noiserandom3dshader',

	colorrainbowshader: ColorRainbow,
	colorrainbow: 'colorrainbowshader',

	unrealbloomselectiveshader: UnrealBloomSelective,
	unrealbloomselective: 'unrealbloomselectiveshader',

	raymarchingreflectshader: RaymarchingReflect,
	raymarchingreflect: 'raymarchingreflectshader',

	colorrandomshader: ColorRandom,
	colorrandom: 'colorrandomshader',
	colorscreenshader: ColorScreen,
	colorscreen: 'colorscreenshader',
};

/**
 * Shader utils
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ShaderUtils) page for details.
 *
 */
export class ShaderUtils {
	public static addShader(key: string, shader: IShaderType, alias?: string[]) {
		key = key.toLowerCase();
		if (alias !== undefined && alias !== null) {
			alias.forEach((aliasKey) => {
				if (aliasKey !== null && aliasKey.length > 3) {
					ShaderConf[aliasKey.toLowerCase()] = key;
				}
			});
		}
		ShaderConf[key] = shader;
	}

	public static getShader(key: string | IShaderType): IShaderType {
		if (typeof key === 'string') {
			const lowKey = key.toLowerCase();
			if (ShaderConf[lowKey] !== null && ShaderConf[lowKey] !== undefined) {
				const shader = ShaderConf[key.toLowerCase()];
				if (typeof shader === 'string') {
					return this.getShader(shader);
				} else {
					return shader;
				}
			} else if (N3JS.ShaderLib[key] !== undefined) {
				return N3JS.ShaderLib[key];
			} else {
				console.error('unknown shader :' + key);
				return {
					uniforms: {},
					fragmentShader: '',
				};
			}
		} else {
			return {
				defines: key.defines,
				uniforms: key.uniforms,
				vertexShader: key.vertexShader,
				fragmentShader: key.fragmentShader,
			};
		}
	}
	public static getShaderClone(key: string): IShaderType {
		const shader = this.getShader(key);
		return {
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader,
			uniforms:
				shader.uniforms !== undefined && shader.uniforms !== null
					? N3JS.UniformsUtils.clone(shader.uniforms)
					: undefined,
			defines:
				shader.defines !== undefined && shader.defines !== null ? N3JS.UniformsUtils.clone(shader.defines) : undefined,
		};
	}

	public static getFragmentShader(key: string | IShaderType): string {
		if (typeof key === 'string' && !/^[a-zA-Z0-9]+$/.test(key)) {
			return key;
		} else {
			return this.getShader(key).fragmentShader;
		}
	}

	public static getVertexShader(key: string | IShaderType): string {
		if (typeof key === 'string' && !/^[a-zA-Z0-9]+$/.test(key)) {
			return key;
		} else {
			return this.getShader(key).vertexShader;
		}
	}

	public static getUniforms(key: string | IShaderType): {
		[key: string]: I3JS.IUniform;
	} {
		if (key !== undefined && key !== null) {
			if (typeof key === 'string') {
				if (key !== undefined && key !== null && key !== '') {
					return N3JS.UniformsUtils.clone(this.getShader(key).uniforms);
				}
			} else if (key.uniforms !== undefined && key.uniforms !== null) {
				return N3JS.UniformsUtils.clone(key.uniforms);
			}
		}
		return {};
	}

	public static checkShader() {
		const shaderList: string[] = [];
		Object.entries(ShaderConf).forEach(([key, value]) => {
			shaderList.push(key.toLowerCase() + ' : ' + key);
		});
		console.log(shaderList.join(',\n'));
	}
}
