import {
	Camera,
	Clock,
	Color,
	ColorRepresentation,
	CubeTexture,
	DataTexture,
	DataTexture3D,
	Material,
	Matrix4,
	Mesh,
	MeshBasicMaterial,
	MeshDepthMaterial,
	MeshNormalMaterial,
	MeshStandardMaterial,
	Object3D,
	PerspectiveCamera,
	Scene,
	ShaderMaterial,
	Texture,
	Vector2,
	Vector3,
	WebGLRenderer,
	WebGLRenderTarget,
} from '../index';
import { Reflector } from './objects';

/**
 * Adaptive tone mapping pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AdaptiveToneMappingPass) page for details.
 *
 * ### Examples
 * [webgl / shaders / tonemapping](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_shaders_tonemapping)
 */
export interface AdaptiveToneMappingPass extends Pass {
	new (adaptive?: boolean, resolution?: number): this;
	adaptive: boolean;
	resolution: number;
	needsInit: number;
	luminanceRT: WebGLRenderTarget;
	previousLuminanceRT: WebGLRenderTarget;
	currentLuminanceRT: WebGLRenderTarget;
	copyUniforms: object;
	materialCopy: ShaderMaterial;
	materialLuminance: ShaderMaterial;
	adaptLuminanceShader: object;
	materialAdaptiveLum: ShaderMaterial;
	materialToneMap: ShaderMaterial;
	fsQuad: object;

	reset(): void;
	setAdaptive(adaptive: boolean): void;
	setAdaptionRate(rate: number): void;
	setMinLuminance(minLum: number): void;
	setMaxLuminance(maxLum: number): void;
	setAverageLuminance(avgLum: number): void;
	setMiddleGrey(middleGrey: number): void;
	dispose(): void;
}

/**
 * Afterimage pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AfterimagePass) page for details.
 *
 * ### Examples
 * [webgl / shaders / tonemapping](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_shaders_tonemapping)
 */
export interface AfterimagePass extends Pass {
	new (damp?: number): this;
	shader: object;
	uniforms: object;
	textureComp: WebGLRenderTarget;
	textureOld: WebGLRenderTarget;
	shaderMaterial: ShaderMaterial;
	compFsQuad: object;
	copyFsQuad: object;
}

/**
 * Bloom pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BloomPass) page for details.
 *
 * ### Examples
 * [webgl / materials / video](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_video) |
 * [webgl / points / dynamic](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_points_dynamic) |
 * [webgl / postprocessing / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_advanced) |
 * [webgl / postprocessing / unreal / bloom / selective](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_unreal_bloom_selective) |
 * [webgl / postprocessing / unreal / bloom](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_unreal_bloom)
 */
export interface BloomPass extends Pass {
	new (strength?: number, kernelSize?: number, sigma?: number, resolution?: number): this;
	renderTargetX: WebGLRenderTarget;
	renderTargetY: WebGLRenderTarget;
	copyUniforms: object;
	materialCopy: ShaderMaterial;
	convolutionUniforms: object;
	materialConvolution: ShaderMaterial;
	fsQuad: object;
}

/**
 * Bokeh pass paramters
 */
export interface BokehPassParamters {
	focus?: number;
	aspect?: number;
	aperture?: number;
	maxblur?: number;
	width?: number;
	height?: number;
}

/**
 * Bokeh pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BokehPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / dof](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_dof)
 */
export interface BokehPass extends Pass {
	new (scene: Scene, camera: Camera, params: BokehPassParamters): this;
	scene: Scene;
	camera: Camera;
	renderTargetColor: WebGLRenderTarget;
	renderTargetDepth: WebGLRenderTarget;
	materialDepth: MeshDepthMaterial;
	materialBokeh: ShaderMaterial;
	uniforms: object;
	fsQuad: object;
	oldClearColor: Color;
}

/**
 * Clear pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ClearPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / backgrounds](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_backgrounds) |
 * [webgl / postprocessing / masking](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_masking)
 */
export interface ClearPass extends Pass {
	new (clearColor?: ColorRepresentation, clearAlpha?: number): this;
	clearColor: ColorRepresentation;
	clearAlpha: number;
}

/**
 * Cube texture pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubeTexturePass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / backgrounds](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_backgrounds)
 */
export interface CubeTexturePass extends Pass {
	new (camera: PerspectiveCamera, envMap?: CubeTexture, opacity?: number): this;
	camera: PerspectiveCamera;
	cubeShader: object;
	cubeMesh: Mesh;
	envMap: CubeTexture;
	opacity: number;
	cubeScene: Scene;
	cubeCamera: PerspectiveCamera;
}

/**
 * Dot screen pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DotScreenPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_advanced)
 */
export interface DotScreenPass extends Pass {
	new (center?: Vector2, angle?: number, scale?: number): this;
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;
}

/**
 * Effect composer
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/EffectComposer) page for details.
 *
 * ### Examples
 * [misc / controls / fly](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_controls_fly) |
 * [webgl / lightningstrike](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lightningstrike) |
 * [webgl / materials / normalmap](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_normalmap) |
 * [webgl / materials / video](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_video) |
 * [webgl / points / dynamic](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_points_dynamic)
 */
export interface EffectComposer {
	new (renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget): this;
	renderer: WebGLRenderer;
	renderTarget1: WebGLRenderTarget;
	renderTarget2: WebGLRenderTarget;
	writeBuffer: WebGLRenderTarget;
	readBuffer: WebGLRenderTarget;
	passes: Pass[];
	copyPass: ShaderPass;
	clock: Clock;
	renderToScreen: boolean;

	swapBuffers(): void;
	addPass(pass: Pass): void;
	insertPass(pass: Pass, index: number): void;
	removePass(pass: Pass): void;
	isLastEnabledPass(passIndex: number): boolean;
	render(deltaTime?: number): void;
	reset(renderTarget?: WebGLRenderTarget): void;
	setSize(width: number, height: number): void;
	setPixelRatio(pixelRatio: number): void;
}

/**
 * Film pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FilmPass) page for details.
 *
 * ### Examples
 * [misc / controls / fly](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_controls_fly) |
 * [webgl / points / dynamic](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_points_dynamic) |
 * [webgl / postprocessing / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_advanced) |
 * [webgl / shader / lava](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_shader_lava)
 */
export interface FilmPass extends Pass {
	new (noiseIntensity?: number, scanlinesIntensity?: number, scanlinesCount?: number, grayscale?: number): this;
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;
}

/**
 * Glitch pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/GlitchPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / glitch](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_glitch)
 */
export interface GlitchPass extends Pass {
	new (dt_size?: number): this;
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;
	goWild: boolean;
	curF: number;
	randX: number;

	generateTrigger(): void;
	generateHeightmap(dt_size: number): DataTexture;
}

/**
 * Halftone pass parameters
 */
export interface HalftonePassParameters {
	shape?: number;
	radius?: number;
	rotateR?: number;
	rotateB?: number;
	rotateG?: number;
	scatter?: number;
	blending?: number;
	blendingMode?: number;
	greyscale?: boolean;
	disable?: boolean;
}

/**
 * Halftone pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/HalftonePass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / rgb / halftone](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_rgb_halftone)
 */
export interface HalftonePass extends Pass {
	new (width: number, height: number, params: HalftonePassParameters): this;
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;
}

/**
 * Lutpass parameters
 */
export interface LUTPassParameters {
	lut?: DataTexture | DataTexture3D;
	intensity?: number;
}

/**
 * Lutpass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LUTPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / 3dlut](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_3dlut)
 */
export interface LUTPass extends ShaderPass {
	lut?: DataTexture | DataTexture3D;
	intensity?: number;
	new (params: LUTPassParameters): this;
}

/**
 * Mask pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MaskPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_advanced) |
 * [webgl / postprocessing / masking](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_masking)
 */
export interface MaskPass extends Pass {
	new (scene: Scene, camera: Camera): this;
	scene: Scene;
	camera: Camera;
	inverse: boolean;
}

/**
 * Clear mask pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ClearMaskPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_advanced) |
 * [webgl / postprocessing / masking](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_masking)
 */
export interface ClearMaskPass extends Pass {
	new (): this;
}

/**
 * Outline pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/OutlinePass) page for details.
 *
 * ### Examples
 * [webgl / lightningstrike](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lightningstrike) |
 * [webgl / postprocessing / outline](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_outline)
 */
export interface OutlinePass extends Pass {
	new (resolution: Vector2, scene: Scene, camera: Camera, selectedObjects?: Object3D[]): this;
	renderScene: Scene;
	renderCamera: Camera;
	selectedObjects: Object3D[];
	visibleEdgeColor: Color;
	hiddenEdgeColor: Color;
	edgeGlow: number;
	usePatternTexture: boolean;
	edgeThickness: number;
	edgeStrength: number;
	downSampleRatio: number;
	pulsePeriod: number;
	resolution: Vector2;
	patternTexture: Texture;

	maskBufferMaterial: MeshBasicMaterial;
	renderTargetMaskBuffer: WebGLRenderTarget;
	depthMaterial: MeshDepthMaterial;
	prepareMaskMaterial: ShaderMaterial;
	renderTargetDepthBuffer: WebGLRenderTarget;
	renderTargetMaskDownSampleBuffer: WebGLRenderTarget;
	renderTargetBlurBuffer1: WebGLRenderTarget;
	renderTargetBlurBuffer2: WebGLRenderTarget;
	edgeDetectionMaterial: ShaderMaterial;
	renderTargetEdgeBuffer1: WebGLRenderTarget;
	renderTargetEdgeBuffer2: WebGLRenderTarget;
	separableBlurMaterial1: ShaderMaterial;
	separableBlurMaterial2: ShaderMaterial;
	overlayMaterial: ShaderMaterial;
	copyUniforms: object;
	materialCopy: ShaderMaterial;
	oldClearColor: Color;
	oldClearAlpha: number;
	fsQuad: object;
	tempPulseColor1: Color;
	tempPulseColor2: Color;
	textureMatrix: Matrix4;

	dispose(): void;
	changeVisibilityOfSelectedObjects(bVisible: boolean): void;
	changeVisibilityOfNonSelectedObjects(bVisible: boolean): void;
	updateTextureMatrix(): void;
	getPrepareMaskMaterial(): ShaderMaterial;
	getEdgeDetectionMaterial(): ShaderMaterial;
	getSeperableBlurMaterial(): ShaderMaterial;
	getOverlayMaterial(): ShaderMaterial;
}

/**
 * Pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Pass) page for details.
 */
export interface Pass {
	new (): this;
	enabled: boolean;
	needsSwap: boolean;
	clear: boolean;
	renderToScreen: boolean;

	setSize(width: number, height: number): void;
	render(
		renderer: WebGLRenderer,
		writeBuffer: WebGLRenderTarget,
		readBuffer: WebGLRenderTarget,
		deltaTime: number,
		maskActive: boolean
	): void;
}

/**
 * Full screen quad
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FullScreenQuad) page for details.
 */
export interface FullScreenQuad {
	new (material?: Material): this;

	render(renderer: WebGLRenderer): void;
	dispose(): void;

	material: Material;
}

/**
 * Render pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/RenderPass) page for details.
 *
 * ### Examples
 * [misc / controls / fly](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_controls_fly) |
 * [webgl / lightningstrike](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lightningstrike) |
 * [webgl / materials / normalmap](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_normalmap) |
 * [webgl / materials / video](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_video) |
 * [webgl / points / dynamic](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_points_dynamic)
 */
export interface RenderPass extends Pass {
	new (scene: Scene, camera: Camera, overrideMaterial?: Material, clearColor?: Color, clearAlpha?: number): this;
	scene: Scene;
	camera: Camera;
	overrideMaterial: Material;
	clearColor: Color;
	clearAlpha: number;
	clearDepth: boolean;
}

/**
 * Output
 */
export enum SAOPassOUTPUT {
	Beauty,
	Default,
	SAO,
	Depth,
	Normal,
}

/**
 * Saopass params
 */
export interface SAOPassParams {
	output: SAOPassOUTPUT;
	saoBias: number;
	saoIntensity: number;
	saoScale: number;
	saoKernelRadius: number;
	saoMinResolution: number;
	saoBlur: boolean;
	saoBlurRadius: number;
	saoBlurStdDev: number;
	saoBlurDepthCutoff: number;
}

/**
 * Saopass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SAOPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / sao](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_sao) |
 * [webgl / postprocessing / ssao](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_ssao)
 */
export interface SAOPass extends Pass {
	new (scene: Scene, camera: Camera, depthTexture?: boolean, useNormals?: boolean, resolution?: Vector2): this;
	scene: Scene;
	camera: Camera;
	supportsDepthTextureExtension: boolean;
	supportsNormalTexture: boolean;
	originalClearColor: Color;
	oldClearColor: Color;
	oldClearAlpha: number;
	resolution: Vector2;
	saoRenderTarget: WebGLRenderTarget;
	blurIntermediateRenderTarget: WebGLRenderTarget;
	beautyRenderTarget: WebGLRenderTarget;
	normalRenderTarget: WebGLRenderTarget;
	depthRenderTarget: WebGLRenderTarget;
	depthMaterial: MeshDepthMaterial;
	normalMaterial: MeshNormalMaterial;
	saoMaterial: ShaderMaterial;
	vBlurMaterial: ShaderMaterial;
	hBlurMaterial: ShaderMaterial;
	materialCopy: ShaderMaterial;
	depthCopy: ShaderMaterial;
	fsQuad: object;
	params: SAOPassParams;

	OUTPUT: SAOPassOUTPUT;

	renderPass(
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor?: ColorRepresentation,
		clearAlpha?: number
	): void;
	renderOverride(
		renderer: WebGLRenderer,
		overrideMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor?: ColorRepresentation,
		clearAlpha?: number
	): void;
}

/**
 * Smaapass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SMAAPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / smaa](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_smaa)
 */
export interface SMAAPass extends Pass {
	new (width: number, height: number): this;
	edgesRT: WebGLRenderTarget;
	weightsRT: WebGLRenderTarget;
	areaTexture: Texture;
	searchTexture: Texture;
	uniformsEdges: object;
	materialEdges: ShaderMaterial;
	uniformsWeights: object;
	materialWeights: ShaderMaterial;
	uniformsBlend: object;
	materialBlend: ShaderMaterial;
	fsQuad: object;

	getAreaTexture(): string;
	getSearchTexture(): string;
}

/**
 * Ssaarender pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SSAARenderPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / ssaa](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_ssaa)
 */
export interface SSAARenderPass extends Pass {
	new (scene: Scene, camera: Camera, clearColor: ColorRepresentation, clearAlpha: number): this;
	scene: Scene;
	camera: Camera;
	sampleLevel: number;
	unbiased: boolean;
	clearColor: ColorRepresentation;
	clearAlpha: number;
	copyUniforms: object;
	copyMaterial: ShaderMaterial;
	fsQuad: object;
	sampleRenderTarget: undefined | WebGLRenderTarget;
}

/**
 * Ssaopass output
 */
export enum SSAOPassOUTPUT {
	Default = 0,
	SSAO = 1,
	Blur = 2,
	Beauty = 3,
	Depth = 4,
	Normal = 5,
}

/**
 * Ssaopass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SSAOPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / ssao](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_ssao)
 */
export interface SSAOPass extends Pass {
	new (scene: Scene, camera: Camera, width?: number, height?: number): this;
	scene: Scene;
	camera: Camera;
	width: number;
	height: boolean;
	clear: boolean;
	kernelRadius: number;
	kernelSize: number;
	kernel: Vector3[];
	noiseTexture: DataTexture;
	output: SSAOPassOUTPUT;
	minDistance: number;
	maxDistance: number;
	beautyRenderTarget: WebGLRenderTarget;
	normalRenderTarget: WebGLRenderTarget;
	ssaoRenderTarget: WebGLRenderTarget;
	blurRenderTarget: WebGLRenderTarget;
	ssaoMaterial: ShaderMaterial;
	normalMaterial: MeshNormalMaterial;
	blurMaterial: ShaderMaterial;
	depthRenderMaterial: ShaderMaterial;
	copyMaterial: ShaderMaterial;
	fsQuad: object;
	originalClearColor: Color;

	OUTPUT: SSAOPassOUTPUT;

	dipose(): void;
	generateSampleKernel(): Vector3[];
	generateRandomKernelRotations(): void;
	renderPass(
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor?: ColorRepresentation,
		clearAlpha?: number
	): void;
	renderOverride(
		renderer: WebGLRenderer,
		overrideMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor?: ColorRepresentation,
		clearAlpha?: number
	): void;
}

/**
 * Ssrpass params
 */
export interface SSRPassParams {
	renderer: WebGLRenderer;
	scene: Scene;
	camera: Camera;
	width?: number | undefined;
	height?: number | undefined;
	selects: Mesh[] | null;
	isPerspectiveCamera?: boolean | undefined;
	isBouncing?: boolean | undefined;
	groundReflector: Reflector | null;
}

/**
 * Ssrpass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SSRPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / ssr](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_ssr)
 */
export interface SSRPass extends Pass {
	width: number;
	height: number;
	clear: boolean;
	renderer: WebGLRenderer;
	scene: Scene;
	camera: Camera;
	groundReflector: Reflector | null;
	opacity: number;
	output: number;
	maxDistance: number;
	thickness: number;
	tempColor: Color;

	get selects(): Mesh[] | null;
	set selects(val: Mesh[] | null);
	selective: boolean;
	get isBouncing(): boolean;
	set isBouncing(val: boolean);

	blur: boolean;

	get isDistanceAttenuation(): boolean;
	set isDistanceAttenuation(val: boolean);
	get isFresnel(): boolean;
	set isFresnel(val: boolean);
	get isInfiniteThick(): boolean;
	set isInfiniteThick(val: boolean);

	thickTolerance: number;

	beautyRenderTarget: WebGLRenderTarget;
	prevRenderTarget: WebGLRenderTarget;
	normalRenderTarget: WebGLRenderTarget;
	metalnessRenderTarget: WebGLRenderTarget;
	ssrRenderTarget: WebGLRenderTarget;

	blurRenderTarget: WebGLRenderTarget;
	blurRenderTarget2: WebGLRenderTarget;

	ssrMaterial: ShaderMaterial;

	normalMaterial: MeshNormalMaterial;

	metalnessOnMaterial: MeshBasicMaterial;

	metalnessOffMaterial: MeshBasicMaterial;

	blurMaterial: ShaderMaterial;
	blurMaterial2: ShaderMaterial;

	depthRenderMaterial: ShaderMaterial;

	copyMaterial: ShaderMaterial;

	fsQuad: FullScreenQuad;

	originalClearColor: Color;

	OUTPUT: {
		Default: 0;
		SSR: 1;
		Beauty: 3;
		Depth: 4;
		Normal: 5;
		Metalness: 7;
	};

	new (params: SSRPassParams): this;

	dispose: () => void;

	renderPass: (
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor: ColorRepresentation,
		clearAlpha: ColorRepresentation
	) => void;

	renderOverride: (
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor: ColorRepresentation,
		clearAlpha: ColorRepresentation
	) => void;

	renderMetalness: (
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor: ColorRepresentation,
		clearAlpha: ColorRepresentation
	) => void;
}

/**
 * Ssrr pass params
 */
export interface SSRrPassParams {
	renderer: WebGLRenderer;
	scene: Scene;
	camera: Camera;
	width?: number | undefined;
	height?: number | undefined;
	selects: Mesh[] | null;
}

enum SSRrPassOUTPUT {
	Default= 0,
	SSRr = 1,
	Beauty = 3,
	Depth =  4,
	DepthSelects = 9,
	NormalSelects = 5,
	Refractive = 7,
	Specular = 8
}

/**
 * Ssrr pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SSRrPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / ssrr](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_ssrr)
 */
export interface SSRrPass extends Pass {
	width: number;
	height: number;
	clear: boolean;

	renderer: WebGLRenderer;
	scene: Scene;
	camera: Camera;

	output: number;

	ior: number;
	maxDistance: number;
	surfDist: number;

	color: Color;

	seleects: Mesh[] | null;

	_specular: boolean;
	get specular(): boolean;
	set specular(spec: boolean);

	_fillHole: boolean;
	get fillHole(): boolean;
	set fillHole(spec: boolean);

	_infiniteThick: boolean;
	get infiniteThick(): boolean;
	set infiniteThick(spec: boolean);

	beautyRenderTarget: WebGLRenderTarget;
	specularRenderTarget: WebGLRenderTarget;
	normalSelectsRenderTarget: WebGLRenderTarget;
	refractiveRenderTarget: WebGLRenderTarget;
	ssrrRenderTarget: WebGLRenderTarget;

	ssrrMaterial: ShaderMaterial;

	normalMaterial: MeshNormalMaterial;
	refractiveOnMaterial: MeshBasicMaterial;
	refractiveOffMaterial: MeshBasicMaterial;
	specularMaterial: MeshStandardMaterial;

	depthRenderMaterial: ShaderMaterial;
	copyMaterial: ShaderMaterial;

	fsQuad: FullScreenQuad;

	originalClearColor: Color;

	new (params: SSRrPassParams): this;

	dispose: () => void;

	render: (renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget) => void;

	renderPass: (
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor: ColorRepresentation,
		clearAlpha: ColorRepresentation
	) => void;

	renderOverride: (
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor: ColorRepresentation,
		clearAlpha: ColorRepresentation
	) => void;

	renderRefractive: (
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor: ColorRepresentation,
		clearAlpha: ColorRepresentation
	) => void;

	setSize: (width: number, height: number) => void;

	/**  
	 * @static
	 */
	OUTPUT : SSRrPassOUTPUT;
}

/**
 * Save pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SavePass) page for details.
 */
export interface SavePass extends Pass {
	new (renderTarget: WebGLRenderTarget): this;
	textureID: string;
	renderTarget: WebGLRenderTarget;
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;
}

/**
 * Shader pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ShaderPass) page for details.
 *
 * ### Examples
 * [webgl / materials / normalmap](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_normalmap) |
 * [webgl / materials / video](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_video) |
 * [webgl / points / dynamic](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_points_dynamic) |
 * [webgl / postprocessing / 3dlut](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_3dlut) |
 * [webgl / postprocessing / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_advanced)
 */
export interface ShaderPass extends Pass {
	new (shader: object, textureID?: string): this;
	textureID: string;
	uniforms: { [name: string]: { value: any } };
	material: ShaderMaterial;
	fsQuad: object;
}

/**
 * Taarender pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TAARenderPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / taa](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_taa)
 */
export interface TAARenderPass extends SSAARenderPass {
	new (scene: Scene, camera: Camera, clearColor: ColorRepresentation, clearAlpha: number): this;
	accumulate: boolean;
}

/**
 * Texture pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TexturePass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_advanced) |
 * [webgl / postprocessing / backgrounds](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_backgrounds) |
 * [webgl / postprocessing / masking](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_masking)
 */
export interface TexturePass extends Pass {
	new (map: Texture, opacity?: number): this;
	map: Texture;
	opacity: number;
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;
}

/**
 * Unreal bloom pass
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/UnrealBloomPass) page for details.
 *
 * ### Examples
 * [webgl / postprocessing / unreal / bloom / selective](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_unreal_bloom_selective) |
 * [webgl / postprocessing / unreal / bloom](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_unreal_bloom) |
 * [webgl / tiled / forward](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_tiled_forward)
 */
export interface UnrealBloomPass extends Pass {
	new (resolution: Vector2, strength: number, radius: number, threshold: number): this;
	resolution: Vector2;
	strength: number;
	radius: number;
	threshold: number;
	clearColor: Color;
	renderTargetsHorizontal: WebGLRenderTarget[];
	renderTargetsVertical: WebGLRenderTarget[];
	nMips: number;
	renderTargetBright: WebGLRenderTarget;
	highPassUniforms: object;
	materialHighPassFilter: ShaderMaterial;
	separableBlurMaterials: ShaderMaterial[];
	compositeMaterial: ShaderMaterial;
	bloomTintColors: Vector3[];
	copyUniforms: object;
	materialCopy: ShaderMaterial;
	oldClearColor: Color;
	oldClearAlpha: number;
	basic: MeshBasicMaterial;
	fsQuad: object;

	dispose(): void;
	getSeperableBlurMaterial(): ShaderMaterial;
	getCompositeMaterial(): ShaderMaterial;
}
