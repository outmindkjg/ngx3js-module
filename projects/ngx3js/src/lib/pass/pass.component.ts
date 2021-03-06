import { Component, ContentChildren, forwardRef, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { NgxMeshComponent } from '../mesh/mesh.component';
import { INgxColor } from '../ngx-interface';
import { NgxShaderComponent } from '../shader/shader.component';
import { ShaderUtils } from '../shader/shaders/shaderUtils';
import { NgxSizeComponent } from '../size/size.component';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxTextureComponent } from '../texture/texture.component';
import * as NGX_PASS from './index';

/**
 * The Pass component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPassComponent) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect) page for a live demo.
 *
 * |  Three Type        | Type Key           | Acceptable Input          |
 * |:--------------------------|:--------------------------|:--------------------------|
 * | AdaptiveToneMappingPass | AdaptiveToneMappingPass, AdaptiveToneMapping | adaptive, resolution  |
 * | AfterimagePass | AfterimagePass, Afterimage | damp  |
 * | BloomPass | BloomPass, Bloom | strength, kernelSize, sigma, resolution |
 * | BokehPass | BokehPass, Bokeh | focus, aspect, aperture, maxblur, width, height |
 * | CubeTexturePass | CubeTexturePass, CubeTexture | effectCamera, envMap, opacity |
 * | DotScreenPass | DotScreenPass, DotScreen | centerX, centerY, angle, scale |
 * | FilmPass | FilmPass, Film | noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale |
 * | GlitchPass | GlitchPass, Glitch | dtSize, goWild |
 * | HalftonePass | HalftonePass, Halftone | size |
 * | ClearMaskPass | ClearMaskPass, ClearMask |  |
 * | MaskPass | MaskPass, Mask | effectScene, effectCamera, inverse |
 * | OutlinePass | OutlinePass, Outline | effectScene, effectCamera, patternTexture, selectedObjects, visibleEdgeColor, hiddenEdgeColor, edgeGlow, usePatternTexture, edgeThickness, edgeStrength, downSampleRatio, pulsePeriod |
 * | RenderPass | RenderPass, Render | effectScene, effectCamera |
 * | SAOPass | SAOPass, SAO | effectScene, effectCamera, depthTexture, useNormals, width, height, output, saoBias, saoIntensity, saoScale, saoKernelRadius, saoMinResolution, saoBlur, saoBlurRadius, saoBlurStdDev, saoBlurDepthCutoff |
 * | SavePass | SavePass, Save | renderTarget |
 * | NgxShaderCopyPass | CopyPass, Copy | textureId |
 * | NgxShaderRGBShiftPass | ShaderRGBShiftPass, RGBShift | textureId, uniforms |
 * | NgxShaderBleachBypassPass | BleachBypassPass, BleachBypass | textureId, uniforms |
 * | NgxShaderSepiaPass | SepiaPass, Sepia | textureId, uniforms |
 * | NgxShaderVignettePass | VignettePass, Vignette | textureId, uniforms |
 * | NgxShaderGammaCorrectionPass | GammaCorrectionPass, GammaCorrection | textureId, uniforms |
 * | NgxShaderFXAAPass | FXAAPass, FXAA | textureId, uniforms |
 * | NgxShaderPixelPass | PixelPass, Pixel | textureId, uniforms |
 * | NgxShaderLuminosityPass | LuminosityPass, Luminosity | textureId, uniforms |
 * | NgxShaderDotScreenPass | DotScreenPass, DotScreen | textureId, uniforms |
 * | NgxShaderSobelOperatorPass | SobelOperatorPass, SobelOperator | textureId, uniforms |
 * | NgxShaderMaterialPass | MaterialPass, Material | textureId, uniforms |
 * | ShaderPass | ShaderPass, Shader | textureId, shader, uniforms |
 * | SMAAPass | SMAAPass, SMAA | textureId, uniforms |
 * | SSAARenderPass | SSAARenderPass, SSAARender | effectScene, effectCamera, clearColor, clearAlpha, sampleLevel, unbiased |
 * | SSAOPass | SSAOPass, SSAO | effectScene, effectCamera, kernelRadius, minDistance, maxDistance |
 * | TAARenderPass | TAARenderPass, TAARender | effectScene, effectCamera, clearColor, clearAlpha, sampleLevel, unbiased, accumulate |
 * | TexturePass | TexturePass, Texture | effectCamera, effectScene, opacity |
 * | UnrealBloomPass | UnrealBloomPass, UnrealBloom | width, height, strength, radius, threshold |
 * | SSRPass | SSRPass, SSR | mesh, effectScene, effectCamera, selects,  |
 * | SSRrPass | SSRrPass, SSRr | effectScene, effectCamera, selects |
 * | LUTPass | LUTPass, LUT | intensity |
 * | ClearPass | ClearPass, Clear | clearColor, clearAlpha |
 *
 * ```html
 * <ngx3js-composer>
 * 	<ngx3js-pass [type]="'RenderPass'"></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'FilmPass'"
 * 		[noiseIntensity]="0.35" [scanlinesIntensity]="0.75"
 * 		[scanlinesCount]="2048" [grayscale]="false"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'ShaderPass'" [shader]="'CopyShader'"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass [type]="'bloom'" [strength]="0.75"></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'film'"
 * 		[noiseIntensity]="0.5"
 * 		[scanlinesIntensity]="0.5" [scanlinesCount]="1448"
 * 		[grayscale]="false"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'shader'"
 * 		[shader]="'focus'"
 * 		[uniforms]="{ screenWidth: 2048, screenHeight: 2048 }"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'ShaderPass'"
 * 		[shader]="'DotScreen'"
 * 		[uniforms]="{ scale: 2 }"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'ShaderPass'"
 * 		[shader]="'RGBShift'"
 * 		[uniforms]="{ amount: 0.0015 }"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'ShaderPass'"
 * 		[shader]="'BleachBypassShader'"
 * 		[uniforms]="{ opacity: 0.95 }"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'ShaderPass'"
 * 		[shader]="'SepiaShader'"
 * 		[uniforms]="{ amount: 0.9 }"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'ShaderPass'"
 * 		[shader]="'VignetteShader'"
 * 		[uniforms]="{ offset: 0.95, darkness: 1.6 }"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'ShaderPass'"
 * 		[shader]="'GammaCorrectionShader'"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'BloomPass'"
 * 		[strength]="0.5"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'FilmPass'"
 * 		[noiseIntensity]="0.35"
 * 		[scanlinesIntensity]="0.025"
 * 		[scanlinesCount]="648"
 * 		[grayscale]="false"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'FilmPass'"
 * 		[noiseIntensity]="0.35"
 * 		[scanlinesIntensity]="0.5"
 * 		[scanlinesCount]="2048"
 * 		[grayscale]="true"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'DotScreenPass'"
 * 		[centerX]="0"
 * 		[centerY]="0"
 * 		[angle]="28"
 * 		[scale]="0.8"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'ShaderPass'"
 * 		[shader]="'HorizontalBlurShader'"
 * 		[uniforms]="{ h: 2 / 400 }"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'ShaderPass'"
 * 		[shader]="'VerticalBlurShader'"
 * 		[uniforms]="{ v: 2 / 400 }"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'ShaderPass'"
 * 		[shader]="'ColorifyShader'"
 * 		[uniforms]="{ color: '0xffc0c0' }"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'ShaderPass'"
 * 		[shader]="'ColorifyShader'"
 * 		[uniforms]="{ color: '0xffb0b0' }"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass [type]="'ClearMaskPass'"></ngx3js-pass>
 * 	<ngx3js-pass [type]="'MaskPass'"></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'MaskPass'"
 * 		[inverse]="true"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'RenderPass'"
 * 		[scene]="sceneBG"
 * 		[camera]="cameraOrtho"
 * 	></ngx3js-pass>
 * 	<ngx3js-pass
 * 		[type]="'RenderPass'"
 * 		[clear]="false"
 * 		[scene]="scene"
 * 		[camera]="camera"
 * 	></ngx3js-pass>
 * </ngx3js-composer>
 *
 * ```
 */
@Component({
	selector: 'ngx3js-pass',
	templateUrl: './pass.component.html',
	styleUrls: ['./pass.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxPassComponent),
		},
	],
})
export class NgxPassComponent extends NgxAbstractSubscribeComponent implements OnInit {
	/**
	 * The Input of pass component
	 *
	 */
	@Input() public type: string = '';

	/**
	 * The refer of pass component
	 */
	@Input() public refer: NgxPassComponent = null;

	/**
	 * The needsSwap of pass component
	 */
	@Input() public needsSwap: boolean = null;

	/**
	 * The clear of pass component
	 */
	@Input() public clear: boolean = null;

	/**
	 * The renderToScreen of pass component
	 */
	@Input() public renderToScreen: boolean = null;

	/**
	 * The adaptive of pass component
	 */
	@Input() public adaptive: boolean = null;

	/**
	 * The resolution of pass component
	 */
	@Input() public resolution: number = null;

	/**
	 * The damp of pass component
	 */
	@Input() public damp: number = null;

	/**
	 * The strength of pass component
	 */
	@Input() public strength: number = null;

	/**
	 * The kernelSize of pass component
	 */
	@Input() public kernelSize: number = null;

	/**
	 * The sigma of pass component
	 */
	@Input() public sigma: number = null;

	/**
	 * The scene of pass component
	 */
	@Input() public scene: any = null;

	/**
	 * The camera of pass component
	 */
	@Input() public camera: any = null;

	/**
	 * The params of pass component
	 */
	@Input() public params: I3JS.BokehPassParamters = null;

	/**
	 * The intensity of pass component
	 */
	@Input() public intensity: number = null;

	/**
	 * The clearColor of pass component
	 */
	@Input() public clearColor: INgxColor = null;

	/**
	 * The clearAlpha of pass component
	 */
	@Input() public clearAlpha: number = null;

	/**
	 * The envMap of pass component
	 */
	@Input() public envMap: I3JS.CubeTexture | NgxTextureComponent = null;

	/**
	 * The opacity of pass component
	 */
	@Input() public opacity: number = null;

	/**
	 * The centerX of pass component
	 */
	@Input() public centerX: number = null;

	/**
	 * The centerY of pass component
	 */
	@Input() public centerY: number = null;

	/**
	 * The angle of pass component
	 */
	@Input() public angle: number = null;

	/**
	 * The scale of pass component
	 */
	@Input() public scale: number = null;

	/**
	 * The noiseIntensity of pass component
	 */
	@Input() public noiseIntensity: number = null;

	/**
	 * The scanlinesIntensity of pass component
	 */
	@Input() public scanlinesIntensity: number = null;

	/**
	 * The scanlinesCount of pass component
	 */
	@Input() public scanlinesCount: number = null;

	/**
	 * The grayscale of pass component
	 */
	@Input() public grayscale: boolean = null;

	/**
	 * The dtSize of pass component
	 */
	@Input() public dtSize: number = null;

	/**
	 * The size of width
	 * - type number
	 *  fixed size
	 * - type string with include %
	 *  relative size from renderer size
	 *  for example
	 *    in case renderer = 1024
	 *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
	 */
	@Input() public width: number = null;

	/**
	 * The size of height
	 * - type number
	 *  fixed size
	 * - type string with include %
	 *  relative size from renderer size
	 *  for example
	 *    in case renderer = 1024
	 *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
	 */
	@Input() public height: number = null;

	/**
	 * The size of pass component
	 */
	@Input() public size: I3JS.Vector2 | NgxSizeComponent = null;

	/**
	 * [THREE.LinearEncoding](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) is the default.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) page for details of other formats.
	 * Note that if this value is changed on a texture after the material has been used, it is necessary to trigger a Material.needsUpdate for this value to be realized in the shader.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.LinearEncoding | LinearEncoding , |
	 * | THREE.sRGBEncoding | sRGBEncoding , |
	 * | THREE.GammaEncoding | GammaEncoding , |
	 * | THREE.RGBEEncoding | RGBEEncoding , |
	 * | THREE.LogLuvEncoding | LogLuvEncoding , |
	 * | THREE.RGBM7Encoding | RGBM7Encoding , |
	 * | THREE.RGBM16Encoding | RGBM16Encoding , |
	 * | THREE.RGBDEncoding | RGBDEncoding , |
	 */
	@Input() public encoding: string = null;

	/**
	 * Define whether the material uses morphTargets. Default is false.
	 */
	@Input() public selects: I3JS.Mesh[] = null;

	/**
	 * Define whether the material uses morphTargets. Default is false.
	 */
	@Input() public morphTargets: boolean = null;

	/**
	 * The selectedObjects of pass component
	 */
	@Input() public selectedObjects: (I3JS.Object3D | any)[] = null;

	/**
	 * The overrideMaterial of pass component
	 */
	@Input() public overrideMaterial: I3JS.Material = null;

	/**
	 * Define whether the material uses morphTargets. Default is false.
	 */
	@Input() public mesh: I3JS.Mesh | NgxMeshComponent | any = null;

	/**
	 * The depthTexture of pass component
	 */
	@Input() public depthTexture: boolean = null;

	/**
	 * The useNormals of pass component
	 */
	@Input() public useNormals: boolean = null;

	/**
	 * The renderTarget of pass component
	 */
	@Input() public renderTarget: I3JS.WebGLRenderTarget = null;

	/**
	 * The Input of pass component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public shader: string = null;

	/**
	 * The Input of pass component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public materialShader: string = null;

	/**
	 * The textureId of pass component
	 */
	@Input() public textureId: string = null;

	/**
	 * The map of pass component
	 */
	@Input() public map: I3JS.Texture | NgxTextureComponent | any = null;

	/**
	 * The texture of pass component
	 */
	@Input() public texture: I3JS.Texture | NgxTextureComponent = null;

	/**
	 * The patternTexture of pass component
	 */
	@Input() public patternTexture: I3JS.Texture | NgxTextureComponent = null;

	/**
	 * The radius of pass component
	 */
	@Input() public radius: number = null;

	/**
	 * The threshold of pass component
	 */
	@Input() public threshold: number = null;

	/**
	 * The goWild of pass component
	 */
	@Input() public goWild: boolean = null;

	/**
	 * The uniforms of pass component
	 */
	@Input() public uniforms: { [key: string]: any } = null;

	/**
	 * The Input of pass component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public lut: string = null;

	/**
	 * The use2DLut of pass component
	 */
	@Input() public use2DLut: boolean = null;

	/**
	 * The inverse of pass component
	 */
	@Input() public inverse: boolean = null;

	/**
	 * The focus of pass component
	 */
	@Input() public focus: number = null;

	/**
	 * The aspect of pass component
	 */
	@Input() public aspect: number = null;

	/**
	 * The aperture of pass component
	 */
	@Input() public aperture: number = null;

	/**
	 * The maxblur of pass component
	 */
	@Input() public maxblur: number = null;

	/**
	 * The sampleLevel of pass component
	 */
	@Input() public sampleLevel: number = null;

	/**
	 * The unbiased of pass component
	 */
	@Input() public unbiased: boolean = null;

	/**
	 * The accumulate of pass component
	 */
	@Input() public accumulate: boolean = null;

	/**
	 * The visibleEdgeColor of pass component
	 */
	@Input() public visibleEdgeColor: INgxColor = null;

	/**
	 * The hiddenEdgeColor of pass component
	 */
	@Input() public hiddenEdgeColor: INgxColor = null;

	/**
	 * The edgeGlow of pass component
	 */
	@Input() public edgeGlow: number = null;

	/**
	 * The usePatternTexture of pass component
	 */
	@Input() public usePatternTexture: boolean = null;

	/**
	 * The edgeThickness of pass component
	 */
	@Input() public edgeThickness: number = null;

	/**
	 * The edgeStrength of pass component
	 */
	@Input() public edgeStrength: number = null;

	/**
	 * The downSampleRatio of pass component
	 */
	@Input() public downSampleRatio: number = null;

	/**
	 * The pulsePeriod of pass component
	 */
	@Input() public pulsePeriod: number = null;

	/**
	 * The Input of pass component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public output: string = null;

	/**
	 * The kernelRadius of pass component
	 */
	@Input() public kernelRadius: number = null;

	/**
	 * The minDistance of pass component
	 */
	@Input() public minDistance: number = null;

	/**
	 * The maxDistance of pass component
	 */
	@Input() public maxDistance: number = null;

	/**
	 * The saoBias of pass component
	 */
	@Input() public saoBias: number = null;

	/**
	 * The saoIntensity of pass component
	 */
	@Input() public saoIntensity: number = null;

	/**
	 * The saoScale of pass component
	 */
	@Input() public saoScale: number = null;

	/**
	 * The saoKernelRadius of pass component
	 */
	@Input() public saoKernelRadius: number = null;

	/**
	 * The saoMinResolution of pass component
	 */
	@Input() public saoMinResolution: number = null;

	/**
	 * The saoBlur of pass component
	 */
	@Input() public saoBlur: boolean = null;

	/**
	 * The saoBlurRadius of pass component
	 */
	@Input() public saoBlurRadius: number = null;

	/**
	 * The saoBlurStdDev of pass component
	 */
	@Input() public saoBlurStdDev: number = null;

	/**
	 * The saoBlurDepthCutoff of pass component
	 */
	@Input() public saoBlurDepthCutoff: number = null;

	/**
	 * The vertexShader of pass component
	 */
	@Input() public vertexShader: string = null;

	/**
	 * The fragmentShader of pass component
	 */
	@Input() public fragmentShader: string = null;

	/**
	 * The bloomTexture of pass component
	 */
	@Input() public bloomTexture: any = null;

	/**
	 * Content children of pass component
	 */
	@ContentChildren(NgxShaderComponent) private shaderList: QueryList<NgxShaderComponent>;

	/**
	 * Creates an instance of pass component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('pass');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.pass !== null) {
			this.pass.enabled = false;
			if (this.effectComposer !== null) {
				this.effectComposer.removePass(this.pass);
			}
		}
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
		if (changes && this.pass) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
	}

	/**
	 * Gets lut
	 * @param callBack
	 * @param [def]
	 */
	private getLut(callBack: (result: I3JS.LUTCubeResult) => void, def?: string): void {
		const lut = NgxThreeUtil.getTypeSafe(this.lut, def, 'remy24');
		let lutPath = '';
		switch (lut.toLowerCase()) {
			case 'bourbon 64.cube':
			case 'bourbon64':
				lutPath = 'luts/Bourbon 64.CUBE';
				break;
			case 'chemical 168.cube':
			case 'chemical168':
				lutPath = 'luts/Chemical 168.CUBE';
				break;
			case 'clayton 33.cube':
			case 'clayton33':
				lutPath = 'luts/Clayton 33.CUBE';
				break;
			case 'cubicle 99.cube':
			case 'cubicle99':
				lutPath = 'luts/Cubicle 99.CUBE';
				break;
			case 'remy 24.cube':
			case 'remy24':
				lutPath = 'luts/Remy 24.CUBE';
				break;
			default:
				lutPath = lut;
				break;
		}
		const lutCubeLoader : I3JS.LUTCubeLoader = NgxThreeUtil.getLoader('lutCubeLoader', N3JS.LUTCubeLoader);
		lutCubeLoader.load(NgxThreeUtil.getStoreUrl(lutPath), (result: I3JS.LUTCubeResult) => {
			callBack(result);
		});
	}

	/**
	 * Gets clear
	 * @param [def]
	 * @returns true if clear
	 */
	private getClear(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.clear, def);
	}

	/**
	 * Gets render to screen
	 * @param [def]
	 * @returns true if render to screen
	 */
	private getRenderToScreen(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.renderToScreen, def);
	}

	/**
	 * Gets scene
	 * @param [def]
	 * @returns scene
	 */
	private getScene(def?: any): I3JS.Scene {
		const scene = NgxThreeUtil.getTypeSafe(this.scene, def);
		if (NgxThreeUtil.isNotNull(scene)) {
			if (scene instanceof N3JS.Scene) {
				return scene;
			} else {
				return scene.getScene();
			}
		} else {
			return new N3JS.Scene();
		}
	}

	/**
	 * Gets camera
	 * @param [def]
	 * @returns camera
	 */
	private getCamera(def?: any): I3JS.Camera {
		const camera = NgxThreeUtil.getTypeSafe(this.camera, def);
		if (NgxThreeUtil.isNotNull(camera)) {
			if (camera instanceof N3JS.Camera) {
				return camera;
			} else {
				return camera.getObject3d();
			}
		} else {
			return new N3JS.Camera();
		}
	}

	/**
	 * Gets params
	 * @param [def]
	 * @returns params
	 */
	private getParams(def?: I3JS.BokehPassParamters): I3JS.BokehPassParamters {
		return NgxThreeUtil.getTypeSafe(this.params, def);
	}

	/**
	 * Gets env map
	 * @param [def]
	 * @returns env map
	 */
	private getEnvMap(def?: I3JS.CubeTexture): I3JS.CubeTexture {
		const cubeTexture = this.getTexture(this.envMap, def);
		if (cubeTexture instanceof N3JS.CubeTexture) {
			return cubeTexture;
		}
		return undefined;
	}

	/**
	 * Gets pattern texture
	 * @param [def]
	 * @returns pattern texture
	 */
	private getPatternTexture(def?: I3JS.Texture): I3JS.Texture {
		return this.getTexture(this.patternTexture, def);
	}

	/**
	 * Gets texture
	 * @param baseTexture
	 * @param [def]
	 * @returns texture
	 */
	private getTexture(
		baseTexture: I3JS.Texture | NgxTextureComponent | any,
		def?: I3JS.Texture | NgxTextureComponent | any
	): I3JS.Texture {
		const texture = NgxThreeUtil.getTypeSafe(baseTexture, NgxThreeUtil.getTypeSafe(this.texture, this.map, def), def);
		if (texture instanceof N3JS.Texture) {
			return texture;
		} else if (texture instanceof NgxTextureComponent) {
			return texture.getTexture();
		}
		return undefined;
	}

	/**
	 * Gets height
	 * @param [def]
	 * @returns height
	 */
	private getSize(width?: number, height?: number): I3JS.Vector2 {
		if (NgxThreeUtil.isNotNull(this.size)) {
			if (this.size instanceof N3JS.Vector2) {
				return this.size;
			} else if (this.size instanceof NgxSizeComponent) {
				return this.size.getSize();
			}
		}
		return NgxThreeUtil.getVector2Safe(
			NgxThreeUtil.getTypeSafe(this.width, width, 1024),
			NgxThreeUtil.getTypeSafe(this.height, height, 1024),
			null,
			null,
			true
		).multiplyScalar(window.devicePixelRatio);
	}

	/**
	 * Gets selected objects
	 * @param [def]
	 * @returns selected objects
	 */
	private getSelectedObjects(def?: I3JS.Object3D[]): I3JS.Object3D[] {
		const selectedObjects = NgxThreeUtil.getTypeSafe(this.selectedObjects, def);
		const safeObject3d: I3JS.Object3D[] = [];
		selectedObjects.forEach((child) => {
			if (child instanceof N3JS.Object3D) {
				safeObject3d.push(child);
			} else if (child.getMesh) {
				safeObject3d.push(child.getMesh());
			} else if (child.getHelper) {
				safeObject3d.push(child.getHelper());
			} else if (child.getObject3d) {
				safeObject3d.push(child.getObject3d());
			}
		});
		return safeObject3d;
	}

	/**
	 * Gets override material
	 * @param [def]
	 * @returns override material
	 */
	private getOverrideMaterial(def?: I3JS.Material): I3JS.Material {
		return NgxThreeUtil.getTypeSafe(this.overrideMaterial, def);
	}

	/**
	 * Gets sao output
	 * @param [def]
	 * @returns sao output
	 */
	private getSaoOutput(def?: string): number {
		const output = NgxThreeUtil.getTypeSafe(this.output, def, '');
		switch (output.toLowerCase()) {
			case 'beauty':
				return 1;
			case 'sao':
				return 2;
			case 'depth':
				return 3;
			case 'normal':
				return 4;
			case 'default':
			default:
				return 0;
		}
	}

	/**
	 * Gets ssao output
	 * @param [def]
	 * @returns ssao output
	 */
	private getSsaoOutput(def?: string): number {
		const output = NgxThreeUtil.getTypeSafe(this.output, def, '');
		switch (output.toLowerCase()) {
			case 'ssao':
				return 1;
			case 'blur':
				return 1;
			case 'beauty':
				return 3;
			case 'depth':
				return 4;
			case 'normal':
				return 5;
			case 'default':
			default:
				return 0;
		}
	}

	/**
	 * Gets shader
	 * @param [def]
	 * @returns shader
	 */
	private getShader(def?: string): {
		uniforms?: any;
		vertexShader?: any;
		fragmentShader?: any;
	} {
		const shader = NgxThreeUtil.getTypeSafe(this.shader, def, '');
		let shaderUniforms: {
			uniforms?: any;
			vertexShader?: any;
			fragmentShader?: any;
		} = null;
		switch (shader.toLowerCase()) {
			case 'shadermaterial':
			case 'material':
				const shaderMaterialParameters: I3JS.ShaderMaterialParameters = {
					vertexShader: this.getMaterialShader('x-shader/x-vertex'),
					fragmentShader: this.getMaterialShader('x-shader/x-fragment'),
					uniforms: this.getUniforms(ShaderUtils.getUniforms(this.materialShader)),
				};
				shaderUniforms = new N3JS.ShaderMaterial(shaderMaterialParameters);
				break;
			default:
				shaderUniforms = ShaderUtils.getShaderClone(shader);
				if (NgxThreeUtil.isNotNull(shaderUniforms.uniforms)) {
					this.getUniforms(shaderUniforms.uniforms);
				}
				break;
		}
		if (shaderUniforms !== null) {
			return shaderUniforms;
		}
		return undefined;
	}

	/**
	 * Gets uniforms
	 * @param resultUniforms
	 * @returns uniforms
	 */
	private getUniforms(resultUniforms: { [uniform: string]: I3JS.IUniform }): {
		[uniform: string]: I3JS.IUniform;
	} {
		const uniforms: {
			[key: string]: any;
		} = NgxThreeUtil.getTypeSafe(this.uniforms, {});
		Object.entries(uniforms).forEach(([key, value]) => {
			if (NgxThreeUtil.isNotNull(value) && NgxThreeUtil.isNotNull(value['type']) && NgxThreeUtil.isNotNull(value['value'])) {
				const valueType: string = value['type'];
				const valueValue: any = value['value'];
				switch (valueType.toLowerCase()) {
					case 'projectionmatrixinverse':
					case 'projectionmatrix':
					case 'matrixworldinverse':
					case 'matrixworld':
					case 'matrix':
						if (NgxThreeUtil.isNotNull(valueValue.getObject3d)) {
							this.unSubscribeRefer('unforms_' + key);
							const object3d: I3JS.Object3D = valueValue.getObject3d();
							resultUniforms[key] = {
								value: NgxThreeUtil.getMatrix4Safe(object3d, valueType),
							};
							if (NgxThreeUtil.isNotNull(valueValue.getSubscribe)) {
								this.subscribeRefer(
									'unforms_' + key,
									valueValue.getSubscribe().subscribe((e: any) => {
										resultUniforms[key].value = NgxThreeUtil.getMatrix4Safe(e, valueType);
									})
								);
							}
						} else {
							resultUniforms[key] = {
								value: new N3JS.Matrix4(),
							};
						}
						break;
					case 'vector2':
					case 'v2':
						if (NgxThreeUtil.isNotNull(valueValue.getSize)) {
							this.unSubscribeRefer('unforms_' + key);
							resultUniforms[key] = {
								value: valueValue.getSize(),
							};
							if (NgxThreeUtil.isNotNull(valueValue.sizeSubscribe)) {
								this.subscribeRefer(
									'unforms_' + key,
									valueValue.sizeSubscribe().subscribe((e: any) => {
										resultUniforms[key].value = e;
									})
								);
							}
						} else {
							resultUniforms[key] = {
								value: NgxThreeUtil.getVector2Safe(valueValue[0], valueValue[1], new N3JS.Vector2()),
							};
						}
						break;
					case 'vector3':
					case 'vector':
					case 'v3':
						resultUniforms[key] = {
							value: NgxThreeUtil.getVector3Safe(valueValue[0], valueValue[1], valueValue[2], new N3JS.Vector3()),
						};
						break;
					case 'color':
						resultUniforms[key] = {
							value: NgxThreeUtil.getColorSafe(valueValue, 0xffffff),
						};
						break;
					case 'image':
					case 'texture2d':
					case 'texture3d':
					case 'texture':
					case 'datatexture2d':
					case 'datatexture3d':
					case 'datatexture':
					case 'video':
					case 'videotexture':
						resultUniforms[key] = {
							value: NgxTextureComponent.getTextureImageOption(valueValue, value['options'], valueType.toLowerCase()),
						};
						break;
					case 'imagelist':
					case 'texturelist':
					case 'imagearray':
					case 'texturearray':
						const textureList: I3JS.Texture[] = [];
						const texturePathList: string[] = [];
						const textureOption = value['options'];
						if (typeof valueValue === 'string') {
							valueValue.split(',').forEach((path) => {
								if (path !== '' && path.length > 3) {
									texturePathList.push(path);
								}
							});
						} else if (NgxThreeUtil.isNotNull(valueValue.forEach)) {
							valueValue.forEach((path: any) => {
								if (path !== '' && path.length > 3) {
									texturePathList.push(path);
								}
							});
						}
						texturePathList.forEach((texturePath) => {
							textureList.push(NgxTextureComponent.getTextureImageOption(texturePath, textureOption, 'texture'));
						});
						resultUniforms[key] = {
							value: textureList,
						};
						break;
					case 'int':
					case 'integer':
						resultUniforms[key] = { value: parseInt(valueValue) };
						break;
					case 'str':
					case 'string':
						resultUniforms[key] = { value: valueValue.toString() };
						break;
					case 'double':
					case 'float':
					case 'number':
						resultUniforms[key] = { value: parseFloat(valueValue) };
						break;
					default:
						resultUniforms[key] = { value: valueValue };
						break;
				}
			} else if (NgxThreeUtil.isNotNull(value) && value['value'] !== undefined) {
				resultUniforms[key] = value;
			} else {
				switch (key) {
					case 'color':
						resultUniforms.color.value = NgxThreeUtil.getColorSafe(value, resultUniforms.color.value);
						break;
					case 'deltaX':
						resultUniforms.delta.value = NgxThreeUtil.getVector2Safe(
							uniforms.deltaX,
							uniforms.deltaY,
							resultUniforms.delta.value
						);
						break;
					case 'powRGBx':
						resultUniforms.powRGB.value = NgxThreeUtil.getVector3Safe(
							uniforms.powRGBx,
							uniforms.powRGBy,
							uniforms.powRGBz,
							resultUniforms.powRGB.value
						);
						break;
					case 'mulRGBx':
						resultUniforms.mulRGB.value = NgxThreeUtil.getVector3Safe(
							uniforms.mulRGBx,
							uniforms.mulRGBy,
							uniforms.mulRGBz,
							resultUniforms.mulRGB.value
						);
						break;
					case 'addRGBx':
						resultUniforms.addRGB.value = NgxThreeUtil.getVector3Safe(
							uniforms.addRGBx,
							uniforms.addRGBy,
							uniforms.addRGBz,
							resultUniforms.addRGB.value
						);
						break;
					default:
						resultUniforms[key] = { value: value };
						break;
				}
			}
		});
		Object.entries(resultUniforms).forEach(([key, value]) => {
			switch (key) {
				case 'resolution':
					resultUniforms.resolution.value = NgxThreeUtil.getVector2Safe(
						uniforms.resolutionX || this.width || 1024,
						uniforms.resolutionY || this.height || 1024,
						value.value
					);
					break;
				case 'bloomTexture':
					if (NgxThreeUtil.isNotNull(this.bloomTexture) && NgxThreeUtil.isNotNull(this.bloomTexture.getRenderTarget2)) {
						resultUniforms.bloomTexture.value = this.bloomTexture.getRenderTarget2().texture;
					}
					break;
			}
		});
		if (this.debug) {
			this.consoleLog('pass-uniforms', resultUniforms);
		}
		return resultUniforms;
	}

	/**
	 * Sets assign uniforms
	 * @param resultUniforms
	 */
	private setAssignUniforms(resultUniforms: { [key: string]: I3JS.IUniform }) {
		if (NgxThreeUtil.isNotNull(this.uniforms)) {
			Object.entries(resultUniforms).forEach(([key, value]) => {
				this.uniforms[key] = value;
			});
		}
	}

	/**
	 * Gets material shader
	 * @param type
	 * @returns
	 */
	private getMaterialShader(type: string) {
		if (type === 'x-shader/x-vertex') {
			if (NgxThreeUtil.isNotNull(this.vertexShader) || NgxThreeUtil.isNotNull(this.materialShader)) {
				return ShaderUtils.getVertexShader(NgxThreeUtil.getTypeSafe(this.vertexShader, this.materialShader));
			}
		} else if (type === 'x-shader/x-fragment') {
			if (NgxThreeUtil.isNotNull(this.fragmentShader) || NgxThreeUtil.isNotNull(this.materialShader)) {
				return ShaderUtils.getFragmentShader(NgxThreeUtil.getTypeSafe(this.fragmentShader, this.materialShader));
			}
		}
		if (this.shaderList !== null && this.shaderList.length > 0) {
			const foundShader = this.shaderList.find((shader) => {
				return shader.type.toLowerCase() === type;
			});
			if (foundShader !== null && foundShader !== undefined) {
				return foundShader.getShader();
			}
		}
		return undefined;
	}

	/**
	 * Gets map
	 * @param [effectComposer]
	 * @param [camera]
	 * @param [scene]
	 * @param [mapType]
	 * @returns map
	 */
	private getMap(
		effectComposer?: I3JS.EffectComposer,
		camera?: I3JS.Camera,
		scene?: I3JS.Scene,
		mapType?: string
	): I3JS.Texture {
		const map = this.getTexture(this.map, this.texture);
		if (NgxThreeUtil.isNotNull(map)) {
			return map;
		}
		if (NgxThreeUtil.isNotNull(effectComposer)) {
			switch ((mapType || '').toLowerCase()) {
				case 'target1':
					return effectComposer.renderTarget1.texture;
				case 'write':
					return effectComposer.writeBuffer.texture;
				case 'read':
					return effectComposer.readBuffer.texture;
				case 'target2':
				default:
					return effectComposer.renderTarget2.texture;
			}
		}
		const refMap = this.map;
		if (
			NgxThreeUtil.isNotNull(refMap) &&
			refMap.getRenderTarget2 &&
			refMap.getRenderTarget1 &&
			refMap.getWriteBuffer &&
			refMap.getReadBuffer
		) {
			switch ((mapType || '').toLowerCase()) {
				case 'target1':
					return refMap.getRenderTarget1(effectComposer.renderer, camera, scene).texture;
				case 'write':
					return refMap.getWriteBuffer(effectComposer.renderer, camera, scene).texture;
				case 'read':
					return refMap.getReadBuffer(effectComposer.renderer, camera, scene).texture;
				case 'target2':
				default:
					return refMap.getRenderTarget2(effectComposer.renderer, camera, scene).texture;
			}
		}
		return undefined;
	}

	/**
	 * Effect composer of pass component
	 */
	private effectComposer: I3JS.EffectComposer = null;

	/**
	 * Effect scene of pass component
	 */
	private effectScene: I3JS.Scene = null;

	/**
	 * Effect camera of pass component
	 */
	private effectCamera: I3JS.Camera = null;

	/**
	 * Effect camera of pass component
	 */
	private effectRenderer: I3JS.WebGLRenderer = null;

	/**
	 * The Pass of pass component
	 */
	private pass: I3JS.Pass = null;

	/**
	 * Sets scene
	 * @param [scene]
	 */
	public setScene(scene?: I3JS.Scene) {
		if (this.effectScene !== scene) {
			this.effectScene = scene;
			const anyPass: any = this.pass;
			if (anyPass !== null && anyPass['scene'] !== undefined) {
				anyPass['scene'] = this.getScene(this.effectScene);
			}
		}
	}

	/**
	 * Sets effect composer
	 * @param [scene]
	 * @param [camera]
	 * @param [effectComposer]
	 */
	public setEffectComposer(
		scene?: I3JS.Scene,
		camera?: I3JS.Camera,
		effectComposer?: I3JS.EffectComposer,
		renderer?: I3JS.WebGLRenderer
	) {
		if (
			this.effectComposer !== effectComposer ||
			scene !== this.effectScene ||
			camera !== this.effectCamera ||
			renderer !== this.effectRenderer
		) {
			this.effectComposer = effectComposer;
			this.effectScene = scene;
			this.effectCamera = camera;
			this.effectRenderer = renderer;
			if (this.pass === null) {
				this.getPass();
			} else {
				this.needUpdate = true;
			}
		}
	}

	/**
	 * Gets object
	 * @returns object
	 */
	public getObject<T>(): T {
		return this.getPass() as any;
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		if (this.pass !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getPass();
				return;
			}

			if (
				!NgxThreeUtil.isOnlyIndexOf(changes, ['init', 'enabled', 'needsswap', 'clear', 'rendertoscreen'], this.OBJECT_ATTR)
			) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, ['enabled', 'needsswap', 'clear', 'rendertoscreen']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'enabled':
						if (NgxThreeUtil.isNotNull(this.enabled)) {
							this.pass.enabled = NgxThreeUtil.getTypeSafe(this.enabled, true);
						}
						break;
					case 'needsswap':
						if (NgxThreeUtil.isNotNull(this.needsSwap)) {
							this.pass.needsSwap = NgxThreeUtil.getTypeSafe(this.needsSwap, true);
						}
						break;
					case 'clear':
						if (NgxThreeUtil.isNotNull(this.clear)) {
							this.pass.clear = this.getClear(false);
						}
						break;
					case 'rendertoscreen':
						if (NgxThreeUtil.isNotNull(this.renderToScreen)) {
							this.pass.renderToScreen = this.getRenderToScreen(false);
						}
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	/**
	 * Gets pass
	 * @returns pass
	 */
	public getPass<T extends I3JS.Pass>(): T {
		if (this.pass === null || this._needUpdate) {
			this.needUpdate = false;
			let pass: I3JS.Pass = null;
			this.unSubscribeRefer('passSize');
			if (NgxThreeUtil.isNotNull(this.refer)) {
				this.unSubscribeRefer('referPass');
				if (NgxThreeUtil.isNotNull(this.refer.getPass)) {
					pass = this.refer.getPass();
				}
				this.subscribeRefer(
					'referPass',
					NgxThreeUtil.getSubscribe(
						this.refer,
						() => {
							this.needUpdate = true;
						},
						'pass'
					)
				);
			}
			if (pass === null) {
				switch (this.type.toLowerCase()) {
					case 'adaptivetonemappingpass':
					case 'adaptivetonemapping':
						pass = new N3JS.AdaptiveToneMappingPass(NgxThreeUtil.getTypeSafe(this.adaptive), NgxThreeUtil.getTypeSafe(this.resolution));
						break;
					case 'afterimagepass':
					case 'afterimage':
						pass = new N3JS.AfterimagePass(NgxThreeUtil.getTypeSafe(this.damp));
						break;
					case 'bloompass':
					case 'bloom':
						pass = new N3JS.BloomPass(
							NgxThreeUtil.getTypeSafe(this.strength, 1),
							NgxThreeUtil.getTypeSafe(this.kernelSize, 25),
							NgxThreeUtil.getTypeSafe(this.sigma, 4),
							NgxThreeUtil.getTypeSafe(this.resolution, 255)
						);
						break;
					case 'bokehpass':
					case 'bokeh':
						pass = new N3JS.BokehPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera), {
							focus: NgxThreeUtil.getTypeSafe(this.focus, 1.0),
							aspect: NgxThreeUtil.getTypeSafe(this.aspect, null),
							aperture: NgxThreeUtil.getTypeSafe(this.aperture, null),
							maxblur: NgxThreeUtil.getTypeSafe(this.maxblur, null),
							width: NgxThreeUtil.getTypeSafe(this.width, null),
							height: NgxThreeUtil.getTypeSafe(this.height, null),
						});
						break;
					case 'cubetexturepass':
					case 'cubetexture':
						pass = new N3JS.CubeTexturePass(
							this.getCamera(this.effectCamera) as I3JS.PerspectiveCamera,
							this.getEnvMap(),
							NgxThreeUtil.getTypeSafe(this.opacity)
						);
						break;
					case 'dotscreenpass':
					case 'dotscreen':
						pass = new N3JS.DotScreenPass(NgxThreeUtil.getVector2Safe(this.centerX, this.centerY), NgxThreeUtil.getAngleSafe(this.angle), NgxThreeUtil.getTypeSafe(this.scale));
						break;
					case 'filmpass':
					case 'film':
						pass = new N3JS.FilmPass(
							NgxThreeUtil.getTypeSafe(this.noiseIntensity),
							NgxThreeUtil.getTypeSafe(this.scanlinesIntensity),
							NgxThreeUtil.getTypeSafe(this.scanlinesCount),
							NgxThreeUtil.getTypeSafe(this.grayscale) ? 1 : 0
						);
						break;
					case 'glitchpass':
					case 'glitch':
						const glitchpass = new N3JS.GlitchPass(NgxThreeUtil.getTypeSafe(this.dtSize));
						glitchpass.goWild = NgxThreeUtil.getTypeSafe(this.goWild, false);
						pass = glitchpass;
						break;
					case 'halftonepass':
					case 'halftone':
						const halftoneSize = this.getSize();
						const halftonePass: any = new N3JS.HalftonePass(
							halftoneSize.x,
							halftoneSize.y,
							null // this.getParams(null)
						);
						this.subscribeRefer(
							'passSize',
							NgxThreeUtil.getSubscribe(
								this.size,
								() => {
									const size = this.getSize();
									halftonePass.uniforms['width'].value = size.x;
									halftonePass.uniforms['height'].value = size.y;
								},
								'loaded'
							)
						);
						pass = halftonePass;
						break;
					case 'clearmaskpass':
					case 'clearmask':
						pass = new N3JS.ClearMaskPass();
						break;
					case 'maskpass':
					case 'mask':
						const maskpass = new N3JS.MaskPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera));
						if (NgxThreeUtil.isNotNull(this.inverse)) {
							maskpass.inverse = NgxThreeUtil.getTypeSafe(this.inverse, false);
						}
						pass = maskpass;
						break;
					case 'outlinepass':
					case 'outline':
						const outlineSize = this.getSize();
						const outlinePass = new N3JS.OutlinePass(
							outlineSize,
							this.getScene(this.effectScene),
							this.getCamera(this.effectCamera)
						);
						if (NgxThreeUtil.isNotNull(this.patternTexture)) {
							outlinePass.patternTexture = this.getPatternTexture();
						}
						if (NgxThreeUtil.isNotNull(this.selectedObjects)) {
							outlinePass.selectedObjects = this.getSelectedObjects();
						}
						if (NgxThreeUtil.isNotNull(this.visibleEdgeColor)) {
							outlinePass.visibleEdgeColor = NgxThreeUtil.getColorSafe(this.visibleEdgeColor, 0xffffff);
						}
						if (NgxThreeUtil.isNotNull(this.hiddenEdgeColor)) {
							outlinePass.hiddenEdgeColor = NgxThreeUtil.getColorSafe(this.hiddenEdgeColor, 0xffffff);
						}
						if (NgxThreeUtil.isNotNull(this.edgeGlow)) {
							outlinePass.edgeGlow = NgxThreeUtil.getTypeSafe(this.edgeGlow, 0);
						}
						if (NgxThreeUtil.isNotNull(this.usePatternTexture)) {
							outlinePass.usePatternTexture = NgxThreeUtil.getTypeSafe(this.usePatternTexture, false);
						}
						if (NgxThreeUtil.isNotNull(this.edgeThickness)) {
							outlinePass.edgeThickness = NgxThreeUtil.getTypeSafe(this.edgeThickness, 1.0);
						}
						if (NgxThreeUtil.isNotNull(this.edgeStrength)) {
							outlinePass.edgeStrength = NgxThreeUtil.getTypeSafe(this.edgeStrength, 3.0);
						}
						if (NgxThreeUtil.isNotNull(this.downSampleRatio)) {
							outlinePass.downSampleRatio = NgxThreeUtil.getTypeSafe(this.downSampleRatio, 2.0);
						}
						if (NgxThreeUtil.isNotNull(this.pulsePeriod)) {
							outlinePass.pulsePeriod = NgxThreeUtil.getTypeSafe(this.pulsePeriod, 0.0);
						}
						this.subscribeRefer(
							'passSize',
							NgxThreeUtil.getSubscribe(
								this.size,
								() => {
									const size = this.getSize();
									outlinePass.setSize(size.x, size.y);
								},
								'loaded'
							)
						);
						pass = outlinePass;
						break;
					case 'renderpass':
					case 'render':
						pass = new N3JS.RenderPass(
							this.getScene(this.effectScene),
							this.getCamera(this.effectCamera)
							//this.getOverrideMaterial(null),
							//new THREE.Color(this.getClearColor()),
							// NgxThreeUtil.getTypeSafe(this.clearAlpha)
						);
						break;
					case 'saopass':
					case 'sao':
						const saoPass = new N3JS.SAOPass(
							this.getScene(this.effectScene),
							this.getCamera(this.effectCamera),
							NgxThreeUtil.getTypeSafe(this.depthTexture),
							NgxThreeUtil.getTypeSafe(this.useNormals),
							NgxThreeUtil.getVector2Safe(this.width, this.height)
						);
						saoPass.params = {
							output: this.getSaoOutput('Default'),
							saoBias: NgxThreeUtil.getTypeSafe(this.saoBias, 0.5),
							saoIntensity: NgxThreeUtil.getTypeSafe(this.saoIntensity, 0.18),
							saoScale: NgxThreeUtil.getTypeSafe(this.saoScale, 1),
							saoKernelRadius: NgxThreeUtil.getTypeSafe(this.saoKernelRadius, this.kernelRadius, 100),
							saoMinResolution: NgxThreeUtil.getTypeSafe(this.saoMinResolution, 0),
							saoBlur: NgxThreeUtil.getTypeSafe(this.saoBlur, true),
							saoBlurRadius: NgxThreeUtil.getTypeSafe(this.saoBlurRadius, 8),
							saoBlurStdDev: NgxThreeUtil.getTypeSafe(this.saoBlurStdDev, 4),
							saoBlurDepthCutoff: NgxThreeUtil.getTypeSafe(this.saoBlurDepthCutoff, 0.01),
						};
						pass = saoPass;
						break;
					case 'savepass':
					case 'save':
						pass = new N3JS.SavePass(NgxThreeUtil.getTypeSafe(this.renderTarget));
						break;
					case 'copypass':
					case 'copy':
						pass = new NGX_PASS.NgxShaderCopyPass(NgxThreeUtil.getTypeSafe(this.textureId));
						break;
					case 'rgbshiftpass':
					case 'rgbshift':
						const rgbshiftpass = new NGX_PASS.NgxShaderRGBShiftPass(NgxThreeUtil.getTypeSafe(this.textureId));
						this.getUniforms(rgbshiftpass.uniforms);
						pass = rgbshiftpass;
						break;
					case 'bleachbypasspass':
					case 'bleachbypass':
						const bleachbypass = new NGX_PASS.NgxShaderBleachBypassPass(NgxThreeUtil.getTypeSafe(this.textureId));
						this.getUniforms(bleachbypass.uniforms);
						pass = bleachbypass;
						break;
					case 'sepiapass':
					case 'sepia':
						const sepiapass = new NGX_PASS.NgxShaderSepiaPass(NgxThreeUtil.getTypeSafe(this.textureId));
						this.getUniforms(sepiapass.uniforms);
						pass = sepiapass;
						break;
					case 'vignettepass':
					case 'vignette':
						const vignettepass = new NGX_PASS.NgxShaderVignettePass(NgxThreeUtil.getTypeSafe(this.textureId));
						this.getUniforms(vignettepass.uniforms);
						pass = vignettepass;
						break;
					case 'gammacorrectionpass':
					case 'gammacorrection':
						const gammacorrectionpass = new NGX_PASS.NgxShaderGammaCorrectionPass(NgxThreeUtil.getTypeSafe(this.textureId));
						this.getUniforms(gammacorrectionpass.uniforms);
						pass = gammacorrectionpass;
						break;
					case 'fxaapass':
					case 'fxaa':
						const fxaapass = new NGX_PASS.NgxShaderFXAAPass(NgxThreeUtil.getTypeSafe(this.textureId));
						this.getUniforms(fxaapass.uniforms);
						pass = fxaapass;
						break;
					case 'pixelpass':
					case 'pixel':
						const pixelpass = new NGX_PASS.NgxShaderPixelPass(NgxThreeUtil.getTypeSafe(this.textureId));
						this.getUniforms(pixelpass.uniforms);
						pass = pixelpass;
						break;
					case 'luminositypass':
					case 'luminosity':
						const luminositypass = new NGX_PASS.NgxShaderLuminosityPass(NgxThreeUtil.getTypeSafe(this.textureId));
						this.getUniforms(luminositypass.uniforms);
						pass = luminositypass;
						break;
					case 'shaderdotscreenpass':
					case 'shaderdotscreen':
						const dotscreenpass = new NGX_PASS.NgxShaderDotScreenPass(NgxThreeUtil.getTypeSafe(this.textureId));
						this.getUniforms(dotscreenpass.uniforms);
						pass = dotscreenpass;
						break;
					case 'sobeloperatorpass':
					case 'sobeloperator':
						const sobeloperatorpass = new NGX_PASS.NgxSobelOperatorPass(NgxThreeUtil.getTypeSafe(this.textureId));
						this.getUniforms(sobeloperatorpass.uniforms);
						pass = sobeloperatorpass;
						break;
					case 'materialpass':
					case 'material':
						const materialpass = new NGX_PASS.NgxShaderMaterialPass(NgxThreeUtil.getTypeSafe(this.textureId));
						this.getUniforms(materialpass.uniforms);
						pass = materialpass;
						break;
					case 'shaderpass':
					case 'shader':
						const shaderPass = new N3JS.ShaderPass(this.getShader(), NgxThreeUtil.getTypeSafe(this.textureId));
						pass = shaderPass;
						break;
					case 'smaapass':
					case 'smaa':
						const smaaSize = this.getSize();
						const smaaPass = new N3JS.SMAAPass(smaaSize.x, smaaSize.y);
						this.subscribeRefer(
							'passSize',
							NgxThreeUtil.getSubscribe(
								this.size,
								() => {
									const size = this.getSize();
									smaaPass.setSize(size.x, size.y);
								},
								'loaded'
							)
						);
						pass = smaaPass;
						break;
					case 'ssaarenderpass':
					case 'ssaarender':
						const ssaaRenderPass = new N3JS.SSAARenderPass(
							this.getScene(this.effectScene),
							this.getCamera(this.effectCamera),
							NgxThreeUtil.getColorSafe(this.clearColor),
							NgxThreeUtil.getTypeSafe(this.clearAlpha)
						);
						if (NgxThreeUtil.isNotNull(this.sampleLevel)) {
							ssaaRenderPass.sampleLevel = NgxThreeUtil.getTypeSafe(this.sampleLevel, 4);
						}
						if (NgxThreeUtil.isNotNull(this.unbiased)) {
							ssaaRenderPass.unbiased = NgxThreeUtil.getTypeSafe(this.unbiased, true);
						}
						pass = ssaaRenderPass;
						break;
					case 'ssaopass':
					case 'ssao':
						const ssaoSize = this.getSize();
						const ssaoPass = new N3JS.SSAOPass(
							this.getScene(this.effectScene),
							this.getCamera(this.effectCamera),
							ssaoSize.x,
							ssaoSize.y
						);
						ssaoPass.output = this.getSsaoOutput('Default');
						ssaoPass.kernelRadius = NgxThreeUtil.getTypeSafe(this.kernelRadius, this.saoKernelRadius, 8);
						ssaoPass.minDistance = NgxThreeUtil.getTypeSafe(this.minDistance, 0.005);
						ssaoPass.maxDistance = NgxThreeUtil.getTypeSafe(this.maxDistance, 0.1);
						this.subscribeRefer(
							'passSize',
							NgxThreeUtil.getSubscribe(
								this.size,
								() => {
									const size = this.getSize();
									ssaoPass.setSize(size.x, size.y);
								},
								'loaded'
							)
						);
						pass = ssaoPass;
						break;
					case 'taarenderpass':
					case 'taarender':
						const taaRenderPass = new N3JS.TAARenderPass(
							this.getScene(this.effectScene),
							this.getCamera(this.effectCamera),
							NgxThreeUtil.getColorSafe(this.clearColor),
							NgxThreeUtil.getTypeSafe(this.clearAlpha)
						);
						if (NgxThreeUtil.isNotNull(this.sampleLevel)) {
							taaRenderPass.sampleLevel = NgxThreeUtil.getTypeSafe(this.sampleLevel, 4);
						}
						if (NgxThreeUtil.isNotNull(this.unbiased)) {
							taaRenderPass.unbiased = NgxThreeUtil.getTypeSafe(this.unbiased, true);
						}
						if (NgxThreeUtil.isNotNull(this.accumulate)) {
							taaRenderPass.accumulate = NgxThreeUtil.getTypeSafe(this.accumulate, false);
						}
						pass = taaRenderPass;
						break;
					case 'texturepass':
					case 'texture':
						pass = new N3JS.TexturePass(
							this.getMap(this.effectComposer, this.effectCamera, this.effectScene),
							NgxThreeUtil.getTypeSafe(this.opacity)
						);
						break;
					case 'unrealbloompass':
					case 'unrealbloom':
						pass = new N3JS.UnrealBloomPass(
							NgxThreeUtil.getVector2Safe(this.width | 512, this.height | 512, new N3JS.Vector2(512, 512)),
							NgxThreeUtil.getTypeSafe(this.strength, 1.5),
							NgxThreeUtil.getTypeSafe(this.radius, 0.4),
							NgxThreeUtil.getTypeSafe(this.threshold, 0.85)
						);
						break;
					case 'ssrpass':
					case 'ssr':
						let groundReflector: any = null;
						if (NgxThreeUtil.isNotNull(this.mesh)) {
							const object3d = NgxThreeUtil.getObject3d(this.mesh);
							if (object3d instanceof N3JS.ReflectorForSSRPass) {
								groundReflector = object3d;
								groundReflector.material.depthWrite = false;
							}
						}
						const ssrSize = this.getSize();
						const ssrPass = new N3JS.SSRPass({
							renderer: this.effectRenderer,
							scene: this.getScene(this.effectScene),
							camera: this.getCamera(this.effectCamera),
							width: ssrSize.x,
							height: ssrSize.y,
							selects: NgxThreeUtil.getTypeSafe(this.selects, []),
							isPerspectiveCamera: undefined,
							isBouncing: undefined,
							groundReflector: groundReflector,
						});
						this.subscribeRefer(
							'passSize',
							NgxThreeUtil.getSubscribe(
								this.size,
								() => {
									const size = this.getSize();
									ssrPass.setSize(size.x, size.y);
								},
								'loaded'
							)
						);
						pass = ssrPass;
						break;
					case 'ssrrpass':
					case 'ssrr':
						const ssrrSize = this.getSize();
						const ssrrPass = new N3JS.SSRrPass({
							renderer: this.effectRenderer,
							scene: this.getScene(this.effectScene),
							camera: this.getCamera(this.effectCamera),
							width: ssrrSize.x,
							height: ssrrSize.y,
							selects: NgxThreeUtil.getTypeSafe(this.selects, []),
						});
						this.subscribeRefer(
							'passSize',
							NgxThreeUtil.getSubscribe(
								this.size,
								() => {
									const size = this.getSize();
									ssrrPass.setSize(size.x, size.y);
								},
								'loaded'
							)
						);
						pass = ssrrPass;
						break;
					case 'lutpass':
					case 'lut':
						const lutPass = new N3JS.LUTPass({
							lut: null,
							intensity: NgxThreeUtil.getTypeSafe(this.intensity),
						});
						lutPass.enabled = false;
						this.getLut((result) => {
							const anyPass: any = this.pass;
							anyPass['lut'] = this.use2DLut ? result.texture : result.texture3D;
							this.pass.enabled = this.enabled;
						});
						pass = lutPass;
						break;
					case 'clearpass':
					case 'clear':
						pass = new N3JS.ClearPass(NgxThreeUtil.getColorSafe(this.clearColor), NgxThreeUtil.getTypeSafe(this.clearAlpha));
						break;
					default:
						pass = null;
						break;
				}
			}
			if (this.effectComposer !== null && pass !== null) {
				let passIndex = -1;
				if (this.pass !== null) {
					passIndex = this.effectComposer.passes.indexOf(this.pass);
				}
				if (passIndex === -1) {
					this.effectComposer.addPass(pass);
				} else {
					this.effectComposer.removePass(this.pass);
					this.effectComposer.insertPass(pass, passIndex);
				}
			}
			const anyPass: any = pass;
			if (NgxThreeUtil.isNotNull(anyPass['uniforms']) && NgxThreeUtil.isNotNull(this.uniforms)) {
				this.setAssignUniforms(anyPass['uniforms']);
			}
			this.pass = pass;
			this.setObject(this.pass);
		}
		return this.pass as T;
	}
}
