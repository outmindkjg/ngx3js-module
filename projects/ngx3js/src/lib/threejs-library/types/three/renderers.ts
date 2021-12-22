import { Camera } from './cameras';
import {
	Blending,
	BlendingDstFactor,
	BlendingEquation,
	BlendingSrcFactor,
	CullFace,
	DepthModes,
	ShadowMapType,
	TextureDataType,
	TextureEncoding,
	TextureFilter,
	ToneMapping,
	Wrapping,
} from './constants';
import { BufferAttribute, BufferGeometry, EventDispatcher, InterleavedBufferAttribute, Object3D } from './core';
import { Light } from './lights';
import { Material } from './materials';
import { Box3, Color, ColorRepresentation, Vector2, Vector3, Vector4 } from './math';
import { Group } from './objects';
import { Scene } from './scenes';
import { CubeTexture, DataTexture2DArray, DataTexture3D, DepthTexture, Texture } from './textures';

/**
 * Since r118 [WebGLRenderer](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) automatically uses a WebGL 2 rendering context. When upgrading an existing project to => r118, applications might break because of two reasons:
 * Custom shader code needs to be GLSL 3.0 conform.
 * WebGL 1 extension checks have to be changed.
 */
export interface WebGL1Renderer extends WebGLRenderer {
	/**
	 * Creates a new WebGL1Renderer
	 */
	new (parameters?: WebGLRendererParameters): this;
	readonly isWebGL1Renderer: true;
}

/**
 * Used by the [CubeCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubeCamera) as its [WebGLRenderTarget](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderTarget).
 *
 * ### Examples
 * See [CubeCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubeCamera) for examples.
 */
export interface WebGLCubeRenderTarget extends WebGLRenderTarget {
	/**
	 * Creates a new WebGLCubeRenderTarget
	 *
	 * @param size - the size, in pixels.
	 * @param options - object that holds texture parameters for an auto-generated target texture and depthBuffer/stencilBuffer booleans. For an explanation of the texture parameters see [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture). The following are valid options:
	 */
	new (size: number, options?: WebGLRenderTargetOptions): this;

	/**
	 */
	texture: CubeTexture;

	/**
	 * Use this method if you want to convert an equirectangular panorama to the cubemap format.
	 * @param renderer - the renderer.
	 * @param texture - the equirectangular texture.
	 */
	fromEquirectangularTexture(renderer: WebGLRenderer, texture: Texture): this;

	/**
	 * Call this to clear the renderTarget's color, depth, and/or stencil buffers.
	 * The color buffer is set to the renderer's current clear color. Arguments default to *true*.
	 */
	clear(renderer: WebGLRenderer, color: boolean, depth: boolean, stencil: boolean): void;
}

/**
 * A special render target that enables a fragment shader to write to several textures.
 * This approach is useful for advanced rendering techniques like post-processing or deferred rendering.
 * Heads up: WebGLMultipleRenderTargets can only be used with a WebGL 2 rendering context.
 *
 * ### Examples
 * [webgl2 / multiple / rendertargets ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl2_multiple_rendertargets)
 */
export interface WebGLMultipleRenderTargets extends EventDispatcher {
	/**
	 * @param width - The width of the render target.
	 * @param height - The height of the render target.
	 * @param count - The number of render targets.
	 */
	new (width: number, height: number, count: number): this;

	/**
	 * The texture property is overwritten in [name] and replaced with an array. This array holds the [texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderTarget.texture)
	 * references of the respective render targets.
	 * [WebGLRenderTarget](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderTarget) properties are available on this class.
	 */
	texture: Texture[];

	readonly isWebGLMultipleRenderTargets: true;

	/**
	 */
	setSize(width: number, height: number, depth?: number): this;

	/**
	 */
	copy(source: WebGLMultipleRenderTargets): this;

	/**
	 */
	clone(): this;

	/**
	 */
	dispose(): void;

	/**
	 */
	setTexture(texture: Texture): void;
}

/**
 * A special render target that can be used to utilize multi-sampled renderbuffers.
 * Heads up: [name] can only be used with a WebGL 2 rendering context.
 * ### Examples
 * [webgl2 / multisampled / renderbuffers ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl2_multisampled_renderbuffers)
 */
export interface WebGLMultisampleRenderTarget extends WebGLRenderTarget {
	/**
	 * @param width - The width of the render target.
	 * @param height - The height of the render target.
	 * @param options - object that holds texture parameters for an auto-generated target texture and depthBuffer/stencilBuffer booleans.
	 */
	new (width: number, height: number, options?: WebGLRenderTargetOptions): this;

	readonly isWebGLMultisampleRenderTarget: true;

	/**
	 * Specifies the number of samples to be used for the renderbuffer storage. However, the maximum supported size for multisampling is platform dependent and defined via *gl.MAX_SAMPLES*.
	 * [WebGLRenderTarget](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderTarget) properties are available on this class.
	 * @default 4
	 */
	samples: number;
}

/**
 * Web glrender target options
 */
export interface WebGLRenderTargetOptions {
	/**
	 * default is [ClampToEdgeWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 */
	wrapS?: Wrapping | undefined;

	/**
	 * default is [ClampToEdgeWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 */
	wrapT?: Wrapping | undefined;

	/**
	 * default is [.LinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 */
	magFilter?: TextureFilter | undefined;

	/**
	 * default is [LinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 */
	minFilter?: TextureFilter | undefined;

	/**
	 * default is [RGBAFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 */
	format?: number | undefined; // RGBAFormat;

	/**
	 * default is [UnsignedByteType](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 */
	type?: TextureDataType | undefined; // UnsignedByteType;

	/**
	 * default is *1*. See [Texture.anistropy](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.anistropy)
	 */
	anisotropy?: number | undefined; // 1;

	/**
	 * default is *true*.
	 */
	depthBuffer?: boolean | undefined; // true;

	/**
	 * default is *false*.
	 */
	stencilBuffer?: boolean | undefined; // false;

	/**
	 * default is *false*.
	 */
	generateMipmaps?: boolean | undefined; // true;

	/**
	 */
	depthTexture?: DepthTexture | undefined;

	/**
	 * default is [LinearEncoding](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 */
	encoding?: TextureEncoding | undefined;
}

/**
 * A [render target](https://webglfundamentals.org/webgl/lessons/webgl-render-to-texture.html) is a buffer where the video card draws pixels for a scene that	is being rendered in the background.r It is used in different effects, such as applying postprocessing to a rendered image before displaying it on the screen.
 */
export interface WebGLRenderTarget extends EventDispatcher {
	/**
	 * @param width - The width of the renderTarget.
	 * @param height - The height of the renderTarget.
	 * @param options -(optional object that holds texture parameters for an auto-generated target texture and depthBuffer/stencilBuffer booleans.
	 */
	new (width: number, height: number, options?: WebGLRenderTargetOptions): this;

	/**
	 */
	uuid: string;

	/**
	 * The width of the render target.
	 */
	width: number;

	/**
	 * The height of the render target.
	 */
	height: number;

	/**
	 */
	depth: number;

	/**
	 * A rectangular area inside the render target's viewport. Fragments that are outside the area will be discarded.
	 */
	scissor: Vector4;

	/**
	 * Indicates whether the scissor test is active or not.
	 */
	scissorTest: boolean;

	/**
	 * The viewport of this render target.
	 */
	viewport: Vector4;

	/**
	 * This texture instance holds the rendered pixels. Use it as input for further processing.
	 */
	texture: Texture | CubeTexture;

	/**
	 * Renders to the depth buffer. Default is true.
	 */
	depthBuffer: boolean;

	/**
	 * Renders to the stencil buffer. Default is false.
	 */
	stencilBuffer: boolean;

	/**
	 * If set, the scene depth will be rendered to this texture. Default is null.
	 */
	depthTexture: DepthTexture;

	readonly isWebGLRenderTarget: true;

	/**
	 */
	setTexture(texture: Texture): void;

	/**
	 * Sets the size of the render target.
	 */
	setSize(width: number, height: number, depth?: number): void;

	/**
	 * Creates a copy of this render target.
	 */
	clone(): this;

	/**
	 * Adopts the settings of the given render target.
	 */
	copy(source: WebGLRenderTarget): this;

	/**
	 * Dispatches a dispose event.
	 */
	dispose(): void;
}

/**
 */
export interface Renderer {
	/**
	 */
	new (): this;

	/**
	 */
	domElement: HTMLCanvasElement;

	/**
	 */
	render(scene: Object3D, camera: Camera): void;

	/**
	 */
	setSize(width: number, height: number, updateStyle?: boolean): void;
}

/** This is only available in worker JS contexts, not the DOM. */
// tslint:disable-next-line:no-empty-interface

/**
 */
export interface OffscreenCanvas extends EventTarget {}

/**
 */
export interface WebGLRendererParameters {
	/**
	 * A Canvas where the renderer draws its output.
	 */
	canvas?: HTMLCanvasElement | OffscreenCanvas | undefined;

	/**
	 * A WebGL Rendering Context.
	 * (https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext)
	 * Default is null
	 */
	context?: WebGLRenderingContext | undefined;

	/**
	 * shader precision. Can be "highp", "mediump" or "lowp".
	 */
	precision?: string | undefined;

	/**
	 * default is false.
	 */
	alpha?: boolean | undefined;

	/**
	 * default is true.
	 */
	premultipliedAlpha?: boolean | undefined;

	/**
	 * default is false.
	 */
	antialias?: boolean | undefined;

	/**
	 * default is true.
	 */
	stencil?: boolean | undefined;

	/**
	 * default is false.
	 */
	preserveDrawingBuffer?: boolean | undefined;

	/**
	 * Can be "high-performance", "low-power" or "default"
	 */
	powerPreference?: string | undefined;

	/**
	 * default is true.
	 */
	depth?: boolean | undefined;

	/**
	 * default is false.
	 */
	logarithmicDepthBuffer?: boolean | undefined;

	/**
	 * default is false.
	 */
	failIfMajorPerformanceCaveat?: boolean | undefined;
}

/**
 */
export interface WebGLDebug {
	/**
	 * Enables error checking and reporting when shader programs are being compiled.
	 */
	checkShaderErrors: boolean;
}

/**
 * The WebGL renderer displays your beautifully crafted scenes using WebGL, if your device supports it.
 * This renderer has way better performance than CanvasRenderer.
 *
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js|src/renderers/WebGLRenderer.js}
 */
export interface WebGLRenderer extends Renderer {
	/**
	 * parameters is an optional object with properties defining the renderer's behaviour.
	 * The constructor also accepts no parameters at all.
	 * In all cases, it will assume sane defaults when parameters are missing.
	 */
	new (parameters?: WebGLRendererParameters): this;

	/**
	 * A Canvas where the renderer draws its output.
	 * This is automatically created by the renderer in the constructor (if not provided already) : this; you just need to add it to your page.
	 * @default document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' )
	 */
	domElement: HTMLCanvasElement;

	/**
	 * The HTML5 Canvas's 'webgl' context obtained from the canvas where the renderer will draw.
	 */
	context: WebGLRenderingContext;

	/**
	 * Defines whether the renderer should automatically clear its output before rendering.
	 * @default true
	 */
	autoClear: boolean;

	/**
	 * If autoClear is true, defines whether the renderer should clear the color buffer. Default is true.
	 * @default true
	 */
	autoClearColor: boolean;

	/**
	 * If autoClear is true, defines whether the renderer should clear the depth buffer. Default is true.
	 * @default true
	 */
	autoClearDepth: boolean;

	/**
	 * If autoClear is true, defines whether the renderer should clear the stencil buffer. Default is true.
	 * @default true
	 */
	autoClearStencil: boolean;

	/**
	 * Debug configurations.
	 * @default { checkShaderErrors: true }
	 */
	debug: WebGLDebug;

	/**
	 * Defines whether the renderer should sort objects. Default is true.
	 * @default true
	 */
	sortObjects: boolean;

	/**
	 * @default []
	 */
	clippingPlanes: any[];

	/**
	 * @default false
	 */
	localClippingEnabled: boolean;

	extensions: WebGLExtensions;

	/**
	 * Default is LinearEncoding.
	 * @default THREE.LinearEncoding
	 */
	outputEncoding: TextureEncoding;

	/**
	 * @default false
	 */
	physicallyCorrectLights: boolean;

	/**
	 * @default THREE.NoToneMapping
	 */
	toneMapping: ToneMapping;

	/**
	 * @default 1
	 */
	toneMappingExposure: number;

	/**
	 */
	info: WebGLInfo;

	/**
	 */
	shadowMap: WebGLShadowMap;

	/**
	 */
	pixelRatio: number;

	/**
	 */
	capabilities: WebGLCapabilities;

	/**
	 */
	properties: WebGLProperties;

	/**
	 */
	renderLists: WebGLRenderLists;

	/**
	 */
	state: WebGLState;

	/**
	 */
	xr: WebXRManager;

	/**
	 * Return the WebGL context.
	 */
	getContext(): WebGLRenderingContext;

	/**
	 */
	getContextAttributes(): any;

	/**
	 */
	forceContextLoss(): void;

	/**
	 */
	forceContextRestore(): void;

	getPixelRatio(): number;

	/**
	 */
	setPixelRatio(value: number): void;

	/**
	 */
	getDrawingBufferSize(target: Vector2): Vector2;

	/**
	 */
	setDrawingBufferSize(width: number, height: number, pixelRatio: number): void;

	/**
	 */
	getSize(target: Vector2): Vector2;

	/**
	 * Resizes the output canvas to (width, height), and also sets the viewport to fit that size, starting in (0, 0).
	 */
	setSize(width: number, height: number, updateStyle?: boolean): void;

	/**
	 */
	getCurrentViewport(target: Vector4): Vector4;

	/**
	 * Copies the viewport into target.
	 */
	getViewport(target: Vector4): Vector4;

	/**
	 * Sets the viewport to render from (x, y) to (x + width, y + height).
	 * (x, y) is the lower-left corner of the region.
	 */
	setViewport(x: Vector4 | number, y?: number, width?: number, height?: number): void;

	/**
	 * Copies the scissor area into target.
	 */
	getScissor(target: Vector4): Vector4;

	/**
	 * Sets the scissor area from (x, y) to (x + width, y + height).
	 */
	setScissor(x: Vector4 | number, y?: number, width?: number, height?: number): void;

	/**
	 * Returns true if scissor test is enabled; returns false otherwise.
	 */
	getScissorTest(): boolean;

	/**
	 * Enable the scissor test. When this is enabled, only the pixels within the defined scissor area will be affected by further renderer actions.
	 */
	setScissorTest(enable: boolean): void;

	/**
	 * Sets the custom opaque sort for the WebGLRenderLists. Pass null to use the default painterSortStable function.
	 */
	setOpaqueSort(method: (a: any, b: any) => number): void;

	/**
	 * Sets the custom transparent sort for the WebGLRenderLists. Pass null to use the default reversePainterSortStable function.
	 */
	setTransparentSort(method: (a: any, b: any) => number): void;

	/**
	 * Returns a THREE.Color instance with the current clear color.
	 */
	getClearColor(target: Color): Color;

	/**
	 * Sets the clear color, using color for the color and alpha for the opacity.
	 */
	setClearColor(color: ColorRepresentation, alpha?: number): void;

	/**
	 * Returns a float with the current clear alpha. Ranges from 0 to 1.
	 */
	getClearAlpha(): number;

	/**
	 */
	setClearAlpha(alpha: number): void;

	/**
	 * Tells the renderer to clear its color, depth or stencil drawing buffer(s).
	 * Arguments default to true
	 */
	clear(color?: boolean, depth?: boolean, stencil?: boolean): void;

	/**
	 */
	clearColor(): void;

	/**
	 */
	clearDepth(): void;

	/**
	 */
	clearStencil(): void;

	/**
	 */
	clearTarget(renderTarget: WebGLRenderTarget, color: boolean, depth: boolean, stencil: boolean): void;

	/**
	 */
	dispose(): void;

	/**
	 */
	renderBufferDirect(
		camera: Camera,
		scene: Scene,
		geometry: BufferGeometry,
		material: Material,
		object: Object3D,
		geometryGroup: any
	): void;

	/**
	 * A build in that can be used instead of requestAnimationFrame. For WebXR projects this must be used.
	 * @param callback The will be called every available frame. If `null` is passed it will stop any already ongoing animation.
	 */
	setAnimationLoop(callback: XRAnimationLoopCallback | null): void;

	/**
	 * Compiles all materials in the scene with the camera. This is useful to precompile shaders before the first rendering.
	 */
	compile(scene: Object3D, camera: Camera): void;

	/**
	 * Render a scene or an object using a camera.
	 * The render is done to a previously specified {@link WebGLRenderTarget#renderTarget .renderTarget} set by calling
	 * {@link WebGLRenderer#setRenderTarget .setRenderTarget} or to the canvas as usual.
	 *
	 * By default render buffers are cleared before rendering but you can prevent this by setting the property
	 * {@link WebGLRenderer#autoClear autoClear} to false. If you want to prevent only certain buffers being cleared
	 * you can set either the {@link WebGLRenderer#autoClearColor autoClearColor},
	 * {@link WebGLRenderer#autoClearStencil autoClearStencil} or {@link WebGLRenderer#autoClearDepth autoClearDepth}
	 * properties to false. To forcibly clear one ore more buffers call {@link WebGLRenderer#clear .clear}.
	 */
	render(scene: Object3D, camera: Camera): void;

	/**
	 * Returns the current active cube face.
	 */
	getActiveCubeFace(): number;

	/**
	 * Returns the current active mipmap level.
	 */
	getActiveMipmapLevel(): number;

	/**
	 * Returns the current render target. If no render target is set, null is returned.
	 */
	getRenderTarget(): WebGLRenderTarget | null;

	/**
	 * Sets the active render target.
	 *
	 * @param renderTarget The {@link WebGLRenderTarget renderTarget} that needs to be activated. When `null` is given, the canvas is set as the active render target instead.
	 * @param activeCubeFace Specifies the active cube side (PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5) of {@link WebGLCubeRenderTarget}.
	 * @param activeMipmapLevel Specifies the active mipmap level.
	 */
	setRenderTarget(
		renderTarget: WebGLRenderTarget | WebGLMultipleRenderTargets | null,
		activeCubeFace?: number,
		activeMipmapLevel?: number
	): void;

	/**
	 */
	readRenderTargetPixels(
		renderTarget: WebGLRenderTarget | WebGLMultipleRenderTargets,
		x: number,
		y: number,
		width: number,
		height: number,
		buffer: any,
		activeCubeFaceIndex?: number
	): void;

	/**
	 * Copies a region of the currently bound framebuffer into the selected mipmap level of the selected texture.
	 * This region is defined by the size of the destination texture's mip level, offset by the input position.
	 *
	 * @param position Specifies the pixel offset from which to copy out of the framebuffer.
	 * @param texture Specifies the destination texture.
	 * @param level Specifies the destination mipmap level of the texture.
	 */
	copyFramebufferToTexture(position: Vector2, texture: Texture, level?: number): void;

	/**
	 * Copies srcTexture to the specified level of dstTexture, offset by the input position.
	 *
	 * @param position Specifies the pixel offset into the dstTexture where the copy will occur.
	 * @param srcTexture Specifies the source texture.
	 * @param dstTexture Specifies the destination texture.
	 * @param level Specifies the destination mipmap level of the texture.
	 */
	copyTextureToTexture(position: Vector2, srcTexture: Texture, dstTexture: Texture, level?: number): void;

	/**
	 * Copies the pixels of a texture in the bounds sourceBox in the desination texture starting from the given position.
	 * @param sourceBox Specifies the bounds
	 * @param position Specifies the pixel offset into the dstTexture where the copy will occur.
	 * @param srcTexture Specifies the source texture.
	 * @param dstTexture Specifies the destination texture.
	 * @param level Specifies the destination mipmap level of the texture.
	 */
	copyTextureToTexture3D(
		sourceBox: Box3,
		position: Vector3,
		srcTexture: Texture,
		dstTexture: DataTexture3D | DataTexture2DArray,
		level?: number
	): void;

	/**
	 * Initializes the given texture. Can be used to preload a texture rather than waiting until first render (which can cause noticeable lags due to decode and GPU upload overhead).
	 *
	 * @param texture The texture to Initialize.
	 */
	initTexture(texture: Texture): void;

	/**
	 * Can be used to reset the internal WebGL state.
	 */
	resetState(): void;

	/**
	 * @deprecated
	 */
	gammaFactor: number;

	/**
	 * @deprecated Use {@link WebGLRenderer#xr .xr} instead.
	 */
	vr: boolean;

	/**
	 * @deprecated Use {@link WebGLShadowMap#enabled .shadowMap.enabled} instead.
	 */
	shadowMapEnabled: boolean;

	/**
	 * @deprecated Use {@link WebGLShadowMap#type .shadowMap.type} instead.
	 */
	shadowMapType: ShadowMapType;

	/**
	 * @deprecated Use {@link WebGLShadowMap#cullFace .shadowMap.cullFace} instead.
	 */
	shadowMapCullFace: CullFace;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'OES_texture_float' )} instead.
	 */
	supportsFloatTextures(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'OES_texture_half_float' )} instead.
	 */
	supportsHalfFloatTextures(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'OES_standard_derivatives' )} instead.
	 */
	supportsStandardDerivatives(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'WEBGL_compressed_texture_s3tc' )} instead.
	 */
	supportsCompressedTextureS3TC(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'WEBGL_compressed_texture_pvrtc' )} instead.
	 */
	supportsCompressedTexturePVRTC(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'EXT_blend_minmax' )} instead.
	 */
	supportsBlendMinMax(): any;

	/**
	 * @deprecated Use {@link WebGLCapabilities#vertexTextures .capabilities.vertexTextures} instead.
	 */
	supportsVertexTextures(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'ANGLE_instanced_arrays' )} instead.
	 */
	supportsInstancedArrays(): any;

	/**
	 * @deprecated Use {@link WebGLRenderer#setScissorTest .setScissorTest()} instead.
	 */
	enableScissorTest(boolean: any): any;
}
// Renderers / Shaders /////////////////////////////////////////////////////////////////////
export interface ShaderChunk {
	/**
	 */
	[name: string]: string;

	/**
	 */
	alphamap_fragment: string;

	/**
	 */
	alphamap_pars_fragment: string;

	/**
	 */
	alphatest_fragment: string;

	/**
	 */
	aomap_fragment: string;

	/**
	 */
	aomap_pars_fragment: string;

	/**
	 */
	begin_vertex: string;

	/**
	 */
	beginnormal_vertex: string;

	/**
	 */
	bsdfs: string;

	/**
	 */
	bumpmap_pars_fragment: string;

	/**
	 */
	clipping_planes_fragment: string;

	/**
	 */
	clipping_planes_pars_fragment: string;

	/**
	 */
	clipping_planes_pars_vertex: string;

	/**
	 */
	clipping_planes_vertex: string;

	/**
	 */
	color_fragment: string;

	/**
	 */
	color_pars_fragment: string;

	/**
	 */
	color_pars_vertex: string;

	/**
	 */
	color_vertex: string;

	/**
	 */
	common: string;

	/**
	 */
	cube_frag: string;

	/**
	 */
	cube_vert: string;

	/**
	 */
	cube_uv_reflection_fragment: string;

	/**
	 */
	defaultnormal_vertex: string;

	/**
	 */
	depth_frag: string;

	/**
	 */
	depth_vert: string;

	/**
	 */
	distanceRGBA_frag: string;

	/**
	 */
	distanceRGBA_vert: string;

	/**
	 */
	displacementmap_vertex: string;

	/**
	 */
	displacementmap_pars_vertex: string;

	/**
	 */
	emissivemap_fragment: string;

	/**
	 */
	emissivemap_pars_fragment: string;

	/**
	 */
	encodings_pars_fragment: string;

	/**
	 */
	encodings_fragment: string;

	/**
	 */
	envmap_fragment: string;

	/**
	 */
	envmap_common_pars_fragment: string;

	/**
	 */
	envmap_pars_fragment: string;

	/**
	 */
	envmap_pars_vertex: string;

	/**
	 */
	envmap_vertex: string;

	/**
	 */
	equirect_frag: string;

	/**
	 */
	equirect_vert: string;

	/**
	 */
	fog_fragment: string;

	/**
	 */
	fog_pars_fragment: string;

	/**
	 */
	linedashed_frag: string;

	/**
	 */
	linedashed_vert: string;

	/**
	 */
	lightmap_fragment: string;

	/**
	 */
	lightmap_pars_fragment: string;

	/**
	 */
	lights_lambert_vertex: string;

	/**
	 */
	lights_pars_begin: string;

	/**
	 */
	envmap_physical_pars_fragment: string;

	/**
	 */
	lights_pars_map: string;

	/**
	 */
	lights_phong_fragment: string;

	/**
	 */
	lights_phong_pars_fragment: string;

	/**
	 */
	lights_physical_fragment: string;

	/**
	 */
	lights_physical_pars_fragment: string;

	/**
	 */
	lights_fragment_begin: string;

	/**
	 */
	lights_fragment_maps: string;

	/**
	 */
	lights_fragment_end: string;

	/**
	 */
	logdepthbuf_fragment: string;

	/**
	 */
	logdepthbuf_pars_fragment: string;

	/**
	 */
	logdepthbuf_pars_vertex: string;

	/**
	 */
	logdepthbuf_vertex: string;

	/**
	 */
	map_fragment: string;

	/**
	 */
	map_pars_fragment: string;

	/**
	 */
	map_particle_fragment: string;

	/**
	 */
	map_particle_pars_fragment: string;

	/**
	 */
	meshbasic_frag: string;

	/**
	 */
	meshbasic_vert: string;

	/**
	 */
	meshlambert_frag: string;

	/**
	 */
	meshlambert_vert: string;

	/**
	 */
	meshphong_frag: string;

	/**
	 */
	meshphong_vert: string;

	/**
	 */
	meshphysical_frag: string;

	/**
	 */
	meshphysical_vert: string;

	/**
	 */
	metalnessmap_fragment: string;

	/**
	 */
	metalnessmap_pars_fragment: string;

	/**
	 */
	morphnormal_vertex: string;

	/**
	 */
	morphtarget_pars_vertex: string;

	/**
	 */
	morphtarget_vertex: string;

	/**
	 */
	normal_flip: string;

	/**
	 */
	normal_frag: string;

	/**
	 */
	normal_fragment_begin: string;

	/**
	 */
	normal_fragment_maps: string;

	/**
	 */
	normal_vert: string;

	/**
	 */
	normalmap_pars_fragment: string;

	/**
	 */
	clearcoat_normal_fragment_begin: string;

	/**
	 */
	clearcoat_normal_fragment_maps: string;

	/**
	 */
	clearcoat_pars_fragment: string;

	/**
	 */
	packing: string;

	/**
	 */
	points_frag: string;

	/**
	 */
	points_vert: string;

	/**
	 */
	shadow_frag: string;

	/**
	 */
	shadow_vert: string;

	/**
	 */
	premultiplied_alpha_fragment: string;

	/**
	 */
	project_vertex: string;

	/**
	 */
	roughnessmap_fragment: string;

	/**
	 */
	roughnessmap_pars_fragment: string;

	/**
	 */
	shadowmap_pars_fragment: string;

	/**
	 */
	shadowmap_pars_vertex: string;

	/**
	 */
	shadowmap_vertex: string;

	/**
	 */
	shadowmask_pars_fragment: string;

	/**
	 */
	skinbase_vertex: string;

	/**
	 */
	skinning_pars_vertex: string;

	/**
	 */
	skinning_vertex: string;

	/**
	 */
	skinnormal_vertex: string;

	/**
	 */
	specularmap_fragment: string;

	/**
	 */
	specularmap_pars_fragment: string;

	/**
	 */
	tonemapping_fragment: string;

	/**
	 */
	tonemapping_pars_fragment: string;

	/**
	 */
	uv2_pars_fragment: string;

	/**
	 */
	uv2_pars_vertex: string;

	/**
	 */
	uv2_vertex: string;

	/**
	 */
	uv_pars_fragment: string;

	/**
	 */
	uv_pars_vertex: string;

	/**
	 */
	uv_vertex: string;

	/**
	 */
	worldpos_vertex: string;
}

/**
 */
export interface Shader {
	/**
	 */
	uniforms: { [uniform: string]: IUniform };

	/**
	 */
	vertexShader: string;

	/**
	 */
	fragmentShader: string;
}

/**
 */
export interface ShaderLib {
	/**
	 */
	[name: string]: Shader;

	/**
	 */
	basic: Shader;

	/**
	 */
	lambert: Shader;

	/**
	 */
	phong: Shader;

	/**
	 */
	standard: Shader;

	/**
	 */
	matcap: Shader;

	/**
	 */
	points: Shader;

	/**
	 */
	dashed: Shader;

	/**
	 */
	depth: Shader;

	/**
	 */
	normal: Shader;

	/**
	 */
	sprite: Shader;

	/**
	 */
	background: Shader;

	/**
	 */
	cube: Shader;

	/**
	 */
	equirect: Shader;

	/**
	 */
	distanceRGBA: Shader;

	/**
	 */
	shadow: Shader;

	/**
	 */
	physical: Shader;
}

/**
 */
export interface IUniform<TValue = any> {
	/**
	 */
	value: TValue;
}

/**
 */
export interface UniformsLib {
	/**
	 */
	common: {
		diffuse: IUniform;
		opacity: IUniform;
		map: IUniform;
		uvTransform: IUniform;
		uv2Transform: IUniform;
		alphaMap: IUniform;
	};

	/**
	 */
	specularmap: {
		specularMap: IUniform;
	};

	/**
	 */
	envmap: {
		envMap: IUniform;
		flipEnvMap: IUniform;
		reflectivity: IUniform;
		refractionRatio: IUniform;
		maxMipLevel: IUniform;
	};

	/**
	 */
	aomap: {
		aoMap: IUniform;
		aoMapIntensity: IUniform;
	};

	/**
	 */
	lightmap: {
		lightMap: IUniform;
		lightMapIntensity: IUniform;
	};

	/**
	 */
	emissivemap: {
		emissiveMap: IUniform;
	};

	/**
	 */
	bumpmap: {
		bumpMap: IUniform;
		bumpScale: IUniform;
	};

	/**
	 */
	normalmap: {
		normalMap: IUniform;
		normalScale: IUniform;
	};

	/**
	 */
	displacementmap: {
		displacementMap: IUniform;
		displacementScale: IUniform;
		displacementBias: IUniform;
	};

	/**
	 */
	roughnessmap: {
		roughnessMap: IUniform;
	};

	/**
	 */
	metalnessmap: {
		metalnessMap: IUniform;
	};

	/**
	 */
	gradientmap: {
		gradientMap: IUniform;
	};

	/**
	 */
	fog: {
		fogDensity: IUniform;
		fogNear: IUniform;
		fogFar: IUniform;
		fogColor: IUniform;
	};

	/**
	 */
	lights: {
		ambientLightColor: IUniform;
		directionalLights: {
			value: any[];
			properties: {
				direction: {};
				color: {};
			};
		};
		directionalLightShadows: {
			value: any[];
			properties: {
				shadowBias: {};
				shadowNormalBias: {};
				shadowRadius: {};
				shadowMapSize: {};
			};
		};
		directionalShadowMap: IUniform;
		directionalShadowMatrix: IUniform;
		spotLights: {
			value: any[];
			properties: {
				color: {};
				position: {};
				direction: {};
				distance: {};
				coneCos: {};
				penumbraCos: {};
				decay: {};
			};
		};
		spotLightShadows: {
			value: any[];
			properties: {
				shadowBias: {};
				shadowNormalBias: {};
				shadowRadius: {};
				shadowMapSize: {};
			};
		};
		spotShadowMap: IUniform;
		spotShadowMatrix: IUniform;
		pointLights: {
			value: any[];
			properties: {
				color: {};
				position: {};
				decay: {};
				distance: {};
			};
		};
		pointLightShadows: {
			value: any[];
			properties: {
				shadowBias: {};
				shadowNormalBias: {};
				shadowRadius: {};
				shadowMapSize: {};
			};
		};
		pointShadowMap: IUniform;
		pointShadowMatrix: IUniform;
		hemisphereLights: {
			value: any[];
			properties: {
				direction: {};
				skycolor: {};
				groundColor: {};
			};
		};
		rectAreaLights: {
			value: any[];
			properties: {
				color: {};
				position: {};
				width: {};
				height: {};
			};
		};
	};
	points: {
		diffuse: IUniform;
		opacity: IUniform;
		size: IUniform;
		scale: IUniform;
		map: IUniform;
		uvTransform: IUniform;
	};
}

/**
 */
export interface cloneUniforms {
	(uniforms_src: any): any;
}

/**
 */
export interface mergeUniforms {
	(uniforms: any[]): any;
}

/**
 */
export interface UniformsUtils {
	merge(uniforms: any[]): any;
	clone(uniforms_src: any): any;
}

/**
 */
export interface WebGLAttributes {
	/**
	 */
	new (gl: WebGLRenderingContext | WebGL2RenderingContext, capabilities: WebGLCapabilities): this;

	/**
	 */
	get(attribute: BufferAttribute | InterleavedBufferAttribute): {
		buffer: WebGLBuffer;
		type: number;
		bytesPerElement: number;
		version: number;
	};

	/**
	 */
	remove(attribute: BufferAttribute | InterleavedBufferAttribute): void;

	/**
	 */
	update(attribute: BufferAttribute | InterleavedBufferAttribute, bufferType: number): void;
}

/**
 */
export interface WebGLBindingStates {
	/**
	 */
	new (
		gl: WebGLRenderingContext,
		extensions: WebGLExtensions,
		attributes: WebGLAttributes,
		capabilities: WebGLCapabilities
	): this;

	/**
	 */
	setup(
		object: Object3D,
		material: Material,
		program: WebGLProgram,
		geometry: BufferGeometry,
		index: BufferAttribute
	): void;

	/**
	 */
	reset(): void;

	/**
	 */
	resetDefaultState(): void;

	/**
	 */
	dispose(): void;

	/**
	 */
	releaseStatesOfGeometry(): void;

	/**
	 */
	releaseStatesOfProgram(): void;

	/**
	 */
	initAttributes(): void;

	/**
	 */
	enableAttribute(attribute: number): void;

	/**
	 */
	disableUnusedAttributes(): void;
}

/**
 */
export interface WebGLBufferRenderer {
	/**
	 */
	new (gl: WebGLRenderingContext, extensions: WebGLExtensions, info: WebGLInfo, capabilities: WebGLCapabilities): this;

	/**
	 */
	setMode(value: any): void;

	/**
	 */
	render(start: any, count: number): void;

	/**
	 */
	renderInstances(start: any, count: number, primcount: number): void;
}

/**
 */
export interface WebGLCapabilitiesParameters {
	/**
	 */
	precision?: string | undefined;

	/**
	 */
	logarithmicDepthBuffer?: boolean | undefined;
}

/**
 */
export interface WebGLCapabilities {
	/**
	 */
	new (gl: WebGLRenderingContext, extensions: any, parameters: WebGLCapabilitiesParameters): this;

	/**
	 */
	readonly isWebGL2: boolean;

	/**
	 */
	precision: string;

	/**
	 */
	logarithmicDepthBuffer: boolean;

	/**
	 */
	maxTextures: number;

	/**
	 */
	maxVertexTextures: number;

	/**
	 */
	maxTextureSize: number;

	/**
	 */
	maxCubemapSize: number;

	/**
	 */
	maxAttributes: number;

	/**
	 */
	maxVertexUniforms: number;

	/**
	 */
	maxVaryings: number;

	/**
	 */
	maxFragmentUniforms: number;

	/**
	 */
	vertexTextures: boolean;

	/**
	 */
	floatFragmentTextures: boolean;

	/**
	 */
	floatVertexTextures: boolean;

	/**
	 */
	getMaxAnisotropy(): number;

	/**
	 */
	getMaxPrecision(precision: string): string;
}

/**
 */
export interface WebGLClipping {
	/**
	 */
	new (properties: WebGLProperties): this;

	/**
	 */
	uniform: { value: any; needsUpdate: boolean };

	/**
	 * @default 0
	 */
	numPlanes: number;

	/**
	 * @default 0
	 */
	numIntersection: number;

	/**
	 */
	init(planes: any[], enableLocalClipping: boolean, camera: Camera): boolean;

	/**
	 */
	beginShadows(): void;

	/**
	 */
	endShadows(): void;

	/**
	 */
	setState(material: Material, camera: Camera, useCache: boolean): void;
}

/**
 */
export interface WebGLCubeMaps {
	/**
	 */
	new (renderer: WebGLRenderer): this;

	/**
	 */
	get(texture: any): any;

	/**
	 */
	dispose(): void;
}

/**
 */
export interface WebGLCubeUVMaps {
	/**
	 */
	new (renderer: WebGLRenderer): this;

	/**
	 */
	get<T>(texture: T): T extends Texture ? Texture : T;

	/**
	 */
	dispose(): void;
}

/**
 */
export interface WebGLExtensions {
	/**
	 */
	new (gl: WebGLRenderingContext): this;

	/**
	 */
	has(name: string): boolean;

	/**
	 */
	init(capabilities: WebGLCapabilities): void;

	/**
	 */
	get(name: string): any;
}

/**
 */
export interface WebGLGeometries {
	/**
	 */
	new (gl: WebGLRenderingContext, attributes: WebGLAttributes, info: WebGLInfo): this;

	/**
	 */
	get(object: Object3D, geometry: BufferGeometry): BufferGeometry;

	/**
	 */
	update(geometry: BufferGeometry): void;

	/**
	 */
	getWireframeAttribute(geometry: BufferGeometry): BufferAttribute;
}

/**
 */
export interface WebGLIndexedBufferRenderer {
	/**
	 */
	new (gl: WebGLRenderingContext, extensions: any, info: any, capabilities: any): this;

	/**
	 */
	setMode(value: any): void;

	/**
	 */
	setIndex(index: any): void;

	/**
	 */
	render(start: any, count: number): void;

	/**
	 */
	renderInstances(start: any, count: number, primcount: number): void;
}

/**
 * An object with a series of statistical information about the graphics board memory and the rendering process.
 */
export interface WebGLInfo {
	/**
	 */
	new (gl: WebGLRenderingContext): this;

	/**
	 * @default true
	 */
	autoReset: boolean;

	/**
	 * @default { geometries: 0, textures: 0 }
	 */
	memory: {
		geometries: number;
		textures: number;
	};

	/**
	 * @default null
	 */
	programs: WebGLProgram[] | null;

	/**
	 * @default { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 }
	 */
	render: {
		calls: number;
		frame: number;
		lines: number;
		points: number;
		triangles: number;
	};

	/**
	 */
	update(count: number, mode: number, instanceCount: number): void;

	/**
	 */
	reset(): void;
}

/**
 */
export interface WebGLLights {
	/**
	 */
	new (extensions: WebGLExtensions, capabilities: WebGLCapabilities): this;

	/**
	 */
	state: {
		version: number;

		hash: {
			directionalLength: number;
			pointLength: number;
			spotLength: number;
			rectAreaLength: number;
			hemiLength: number;

			numDirectionalShadows: number;
			numPointShadows: number;
			numSpotShadows: number;
		};

		ambient: number[];
		probe: any[];
		directional: any[];
		directionalShadow: any[];
		directionalShadowMap: any[];
		directionalShadowMatrix: any[];
		spot: any[];
		spotShadow: any[];
		spotShadowMap: any[];
		spotShadowMatrix: any[];
		rectArea: any[];
		point: any[];
		pointShadow: any[];
		pointShadowMap: any[];
		pointShadowMatrix: any[];
		hemi: any[];
	};

	/**
	 */
	get(light: any): any;

	/**
	 */
	setup(lights: any): void;

	/**
	 */
	setupView(lights: any, camera: any): void;
}

/**
 */
export interface WebGLObjects {
	/**
	 */
	new (gl: WebGLRenderingContext, geometries: any, attributes: any, info: any): this;

	/**
	 */
	update(object: any): any;

	/**
	 */
	dispose(): void;
}

/**
 */
export interface WebGLProgram {
	/**
	 */
	new (renderer: WebGLRenderer, cacheKey: string, parameters: object): this;

	/**
	 */
	name: string;

	/**
	 */
	id: number;

	/**
	 */
	cacheKey: string; // unique identifier for this program, used for looking up compiled programs from cache.

	/**
	 * @default 1
	 */
	usedTimes: number;

	/**
	 */
	program: any;

	/**
	 */
	vertexShader: WebGLShader;

	/**
	 */
	fragmentShader: WebGLShader;

	/**
	 * @deprecated Use {@link WebGLProgram#getUniforms getUniforms()} instead.
	 */
	uniforms: any;

	/**
	 * @deprecated Use {@link WebGLProgram#getAttributes getAttributes()} instead.
	 */
	attributes: any;

	/**
	 */
	getUniforms(): WebGLUniforms;

	/**
	 */
	getAttributes(): any;

	/**
	 */
	destroy(): void;
}

/**
 */
export interface WebGLPrograms {
	/**
	 */
	new (
		renderer: WebGLRenderer,
		cubemaps: WebGLCubeMaps,
		extensions: WebGLExtensions,
		capabilities: WebGLCapabilities,
		bindingStates: WebGLBindingStates,
		clipping: WebGLClipping
	): this;

	/**
	 */
	programs: WebGLProgram[];

	/**
	 */
	getParameters(material: Material, lights: any, shadows: object[], scene: Scene, object: any): any;

	/**
	 */
	getProgramCacheKey(parameters: any): string;

	/**
	 */
	getUniforms(material: Material): object;

	/**
	 */
	acquireProgram(parameters: any, cacheKey: string): WebGLProgram;

	/**
	 */
	releaseProgram(program: WebGLProgram): void;
}

/**
 */
export interface WebGLProperties {
	/**
	 */
	new (): this;

	/**
	 */
	get(object: any): any;

	/**
	 */
	remove(object: any): void;

	/**
	 */
	update(object: any, key: any, value: any): any;

	/**
	 */
	dispose(): void;
}

/**
 */
export interface RenderItem {
	/**
	 */
	id: number;

	/**
	 */
	object: Object3D;

	/**
	 */
	geometry: BufferGeometry | null;

	/**
	 */
	material: Material;

	/**
	 */
	program: WebGLProgram;

	/**
	 */
	groupOrder: number;

	/**
	 */
	renderOrder: number;

	/**
	 */
	z: number;

	/**
	 */
	group: Group | null;
}

/**
 */
export interface WebGLRenderList {
	/**
	 */
	new (properties: WebGLProperties): this;

	/**
	 * @default []
	 */
	opaque: RenderItem[];

	/**
	 * @default []
	 */
	transparent: RenderItem[];

	/**
	 * @default []
	 */
	transmissive: RenderItem[];

	/**
	 */
	init(): void;

	/**
	 */
	push(
		object: Object3D,
		geometry: BufferGeometry | null,
		material: Material,
		groupOrder: number,
		z: number,
		group: Group | null
	): void;

	/**
	 */
	unshift(
		object: Object3D,
		geometry: BufferGeometry | null,
		material: Material,
		groupOrder: number,
		z: number,
		group: Group | null
	): void;

	/**
	 */
	sort(opaqueSort: (a: any, b: any) => number, transparentSort: (a: any, b: any) => number): void;

	/**
	 */
	finish(): void;
}

/**
 */
export interface WebGLRenderLists {
	/**
	 */
	new (properties: WebGLProperties): this;

	/**
	 */
	dispose(): void;

	/**
	 */
	get(scene: Scene, renderCallDepth: number): WebGLRenderList;
}

/**
 */
export interface WebGLShader {
	(gl: WebGLRenderingContext, type: string, string: string): WebGLShader;
}

/**
 */
export interface WebGLShadowMap {
	/**
	 */
	new (_renderer: WebGLRenderer, _objects: WebGLObjects, _capabilities: WebGLCapabilities): this;

	/**
	 * @default false
	 */
	enabled: boolean;

	/**
	 * @default true
	 */
	autoUpdate: boolean;

	/**
	 * @default false
	 */
	needsUpdate: boolean;

	/**
	 * @default THREE.PCFShadowMap
	 */
	type: ShadowMapType;

	/**
	 */
	render(shadowsArray: Light[], scene: Scene, camera: Camera): void;

	/**
	 * @deprecated Use {@link Material#shadowSide} instead.
	 */
	cullFace: any;
}

/**
 */
export interface WebGLColorBuffer {
	/**
	 */
	new (): this;

	/**
	 */
	setMask(colorMask: boolean): void;

	/**
	 */
	setLocked(lock: boolean): void;

	/**
	 */
	setClear(r: number, g: number, b: number, a: number, premultipliedAlpha: boolean): void;

	/**
	 */
	reset(): void;
}

/**
 */
export interface WebGLDepthBuffer {
	/**
	 */
	new (): this;

	/**
	 */
	setTest(depthTest: boolean): void;

	/**
	 */
	setMask(depthMask: boolean): void;

	/**
	 */
	setFunc(depthFunc: DepthModes): void;

	/**
	 */
	setLocked(lock: boolean): void;

	/**
	 */
	setClear(depth: number): void;

	/**
	 */
	reset(): void;
}

/**
 */
export interface WebGLStencilBuffer {
	/**
	 */
	new (): this;

	/**
	 */
	setTest(stencilTest: boolean): void;

	/**
	 */
	setMask(stencilMask: number): void;

	/**
	 */
	setFunc(stencilFunc: number, stencilRef: number, stencilMask: number): void;

	/**
	 */
	setOp(stencilFail: number, stencilZFail: number, stencilZPass: number): void;

	/**
	 */
	setLocked(lock: boolean): void;

	/**
	 */
	setClear(stencil: number): void;

	/**
	 */
	reset(): void;
}

/**
 */
export interface WebGLState {
	/**
	 */
	new (gl: WebGLRenderingContext, extensions: WebGLExtensions, capabilities: WebGLCapabilities): this;

	/**
	 */
	buffers: {
		color: WebGLColorBuffer;
		depth: WebGLDepthBuffer;
		stencil: WebGLStencilBuffer;
	};

	/**
	 */
	initAttributes(): void;

	/**
	 */
	enableAttribute(attribute: number): void;

	/**
	 */
	enableAttributeAndDivisor(attribute: number, meshPerAttribute: number): void;

	/**
	 */
	disableUnusedAttributes(): void;

	/**
	 */
	vertexAttribPointer(
		index: number,
		size: number,
		type: number,
		normalized: boolean,
		stride: number,
		offset: number
	): void;

	/**
	 */
	enable(id: number): void;

	/**
	 */
	disable(id: number): void;

	/**
	 */
	bindFramebuffer(target: number, framebuffer: WebGLFramebuffer | null): void;

	/**
	 */
	bindXRFramebuffer(framebuffer: WebGLFramebuffer | null): void;

	/**
	 */
	useProgram(program: any): boolean;

	/**
	 */
	setBlending(
		blending: Blending,
		blendEquation?: BlendingEquation,
		blendSrc?: BlendingSrcFactor,
		blendDst?: BlendingDstFactor,
		blendEquationAlpha?: BlendingEquation,
		blendSrcAlpha?: BlendingSrcFactor,
		blendDstAlpha?: BlendingDstFactor,
		premultiplyAlpha?: boolean
	): void;

	/**
	 */
	setMaterial(material: Material, frontFaceCW: boolean): void;

	/**
	 */
	setFlipSided(flipSided: boolean): void;

	/**
	 */
	setCullFace(cullFace: CullFace): void;

	/**
	 */
	setLineWidth(width: number): void;

	/**
	 */
	setPolygonOffset(polygonoffset: boolean, factor?: number, units?: number): void;

	/**
	 */
	setScissorTest(scissorTest: boolean): void;

	/**
	 */
	activeTexture(webglSlot: number): void;

	/**
	 */
	bindTexture(webglType: number, webglTexture: any): void;

	/**
	 */
	unbindTexture(): void;
	// Same interface as https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/compressedTexImage2D

	/**
	 */
	compressedTexImage2D(
		target: number,
		level: number,
		internalformat: number,
		width: number,
		height: number,
		border: number,
		data: ArrayBufferView
	): void;
	// Same interface as https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D

	/**
	 */
	texImage2D(
		target: number,
		level: number,
		internalformat: number,
		width: number,
		height: number,
		border: number,
		format: number,
		type: number,
		pixels: ArrayBufferView | null
	): void;

	/**
	 */
	texImage2D(target: number, level: number, internalformat: number, format: number, type: number, source: any): void;

	/**
	 */
	texImage3D(
		target: number,
		level: number,
		internalformat: number,
		width: number,
		height: number,
		depth: number,
		border: number,
		format: number,
		type: number,
		pixels: any
	): void;

	/**
	 */
	scissor(scissor: Vector4): void;

	/**
	 */
	viewport(viewport: Vector4): void;

	/**
	 */
	reset(): void;
}

/**
 */
export interface WebGLTextures {
	/**
	 */
	new (
		gl: WebGLRenderingContext,
		extensions: WebGLExtensions,
		state: WebGLState,
		properties: WebGLProperties,
		capabilities: WebGLCapabilities,
		utils: WebGLUtils,
		info: WebGLInfo
	): this;

	/**
	 */
	allocateTextureUnit(): void;

	/**
	 */
	resetTextureUnits(): void;

	/**
	 */
	setTexture2D(texture: any, slot: number): void;

	/**
	 */
	setTexture2DArray(texture: any, slot: number): void;

	/**
	 */
	setTexture3D(texture: any, slot: number): void;

	/**
	 */
	setTextureCube(texture: any, slot: number): void;

	/**
	 */
	setupRenderTarget(renderTarget: any): void;

	/**
	 */
	updateRenderTargetMipmap(renderTarget: any): void;

	/**
	 */
	updateMultisampleRenderTarget(renderTarget: any): void;

	/**
	 */
	safeSetTexture2D(texture: any, slot: number): void;

	/**
	 */
	safeSetTextureCube(texture: any, slot: number): void;
}

/**
 */
export interface WebGLUniforms {
	/**
	 */
	new (gl: WebGLRenderingContext, program: WebGLProgram): this;

	/**
	 */
	setValue(gl: WebGLRenderingContext, name: string, value: any, textures: WebGLTextures): void;

	/**
	 */
	setOptional(gl: WebGLRenderingContext, object: any, name: string): void;

	/**
	 */
	upload(gl: WebGLRenderingContext, seq: any, values: any[], textures: WebGLTextures): void;

	/**
	 */
	seqWithValue(seq: any, values: any[]): any[];
}

/**
 */
export interface WebGLUtils {
	/**
	 */
	new (gl: WebGLRenderingContext | WebGL2RenderingContext, extensions: any, capabilities: any): this;

	/**
	 */
	convert(p: any): void;
}

export type XRSessionMode = 'inline' | 'immersive-vr' | 'immersive-ar';

export type XRReferenceSpaceType = 'viewer' | 'local' | 'local-floor' | 'bounded-floor' | 'unbounded';

export type XREnvironmentBlendMode = 'opaque' | 'additive' | 'alpha-blend';

export type XRVisibilityState = 'visible' | 'visible-blurred' | 'hidden';

export type XRHandedness = 'none' | 'left' | 'right';

export type XRTargetRayMode = 'gaze' | 'tracked-pointer' | 'screen';

export type XREye = 'none' | 'left' | 'right';

export type XREventType =
	| 'end'
	| 'select'
	| 'selectstart'
	| 'selectend'
	| 'squeeze'
	| 'squeezestart'
	| 'squeezeend'
	| 'inputsourceschange';

export type XRAnimationLoopCallback = (time: number, frame?: XRFrame) => void;

export type XRFrameRequestCallback = (time: number, frame: XRFrame) => void;

/**
 */
export interface XR extends EventTarget {
	/**
	 */
	requestSession(mode: XRSessionMode, options?: XRSessionInit): Promise<XRSession>;

	/**
	 */
	isSessionSupported(mode: XRSessionMode): Promise<boolean>;
}

/**
 */
export interface Window {
	/**
	 */
	XRSession?: Constructor<XRSession> | undefined;

	/**
	 */
	XR?: Constructor<XR> | undefined;
}

/**
 */
export interface Navigator {
	xr?: XR | undefined;
}

/**
 */
export interface XRReferenceSpace extends EventTarget {
	/**
	 */
	getOffsetReferenceSpace(originOffset: XRRigidTransform): XRReferenceSpace;
}
export interface XRHitTestOptionsInit {
	/**
	 */
	space: EventTarget;

	/**
	 */
	offsetRay?: XRRay | undefined;
}

/**
 */
export interface XRTransientInputHitTestOptionsInit {
	/**
	 */
	profile: string;

	/**
	 */
	offsetRay?: XRRay | undefined;
}

/**
 */
export interface XRViewport {
	readonly x: number;
	readonly y: number;
	readonly width: number;
	readonly height: number;
}

/**
 */
export interface WebGLRenderingContext {
	/**
	 */
	makeXRCompatible(): Promise<void>;
}

/**
 */
export interface XRRenderState {
	/**
	 */
	readonly depthNear: number;

	/**
	 */
	readonly depthFar: number;

	/**
	 */
	readonly inlineVerticalFieldOfView?: number | undefined;

	/**
	 */
	readonly baseLayer?: XRWebGLLayer | undefined;
}

/**
 */
export interface XRRenderStateInit {
	/**
	 */
	depthNear?: number | undefined;

	/**
	 */
	depthFar?: number | undefined;

	/**
	 */
	inlineVerticalFieldOfView?: number | undefined;

	/**
	 */
	baseLayer?: XRWebGLLayer | undefined;
}

/**
 */
export interface XRGamepad {
	/**
	 */
	readonly id: string;

	/**
	 */
	readonly index: number; // long

	/**
	 */
	readonly connected: boolean;

	/**
	 */
	readonly timestamp: DOMHighResTimeStamp;

	/**
	 */
	readonly mapping: GamepadMappingType;

	/**
	 */
	readonly axes: Float32Array; // FrozenArray<double>;

	/**
	 */
	readonly buttons: GamepadButton[]; // FrozenArray<GamepadButton>;
}

/**
 */
export interface XRInputSource {
	/**
	 */
	readonly handedness: XRHandedness;

	/**
	 */
	readonly targetRayMode: XRTargetRayMode;

	/**
	 */
	readonly targetRaySpace: EventTarget;

	/**
	 */
	readonly gripSpace?: EventTarget | undefined;

	/**
	 */
	readonly profiles: string[];

	/**
	 */
	readonly gamepad: XRGamepad;

	/**
	 */
	readonly hand?: XRHand | undefined;
}

/**
 */
export interface XRSessionInit {
	/**
	 */
	optionalFeatures?: string[] | undefined;

	/**
	 */
	requiredFeatures?: string[] | undefined;
}

/**
 */
export interface XRSession extends EventTarget {
	/**
	 */
	requestReferenceSpace(type: XRReferenceSpaceType): Promise<XRReferenceSpace>;

	/**
	 */
	updateRenderState(renderStateInit: XRRenderStateInit): Promise<void>;

	/**
	 */
	requestAnimationFrame(callback: XRFrameRequestCallback): number;

	/**
	 */
	cancelAnimationFrame(id: number): void;

	/**
	 */
	end(): Promise<void>;

	/**
	 */
	renderState: XRRenderState;

	/**
	 */
	inputSources: XRInputSource[];

	/**
	 */
	environmentBlendMode: XREnvironmentBlendMode;

	/**
	 */
	visibilityState: XRVisibilityState;

	// hit test

	/**
	 */
	requestHitTestSource(options: XRHitTestOptionsInit): Promise<XRHitTestSource>;

	/**
	 */
	requestHitTestSourceForTransientInput(
		options: XRTransientInputHitTestOptionsInit
	): Promise<XRTransientInputHitTestSource>;

	// legacy AR hit test

	/**
	 */
	requestHitTest(ray: XRRay, referenceSpace: XRReferenceSpace): Promise<XRHitResult[]>;

	// legacy plane detection

	/**
	 */
	updateWorldTrackingState(options: { planeDetectionState?: { enabled: boolean } | undefined }): void;
}

/**
 */
export interface XRReferenceSpace extends EventTarget {
	/**
	 */
	getOffsetReferenceSpace(originOffset: XRRigidTransform): XRReferenceSpace;

	/**
	 */
	onreset: any;
}

export type XRPlaneSet = Set<XRPlane>;
export type XRAnchorSet = Set<XRAnchor>;

/**
 */
export interface XRFrame {
	/**
	 */
	readonly session: XRSession;

	/**
	 */
	getViewerPose(referenceSpace: XRReferenceSpace): XRViewerPose | undefined;

	/**
	 */
	getPose(space: EventTarget, baseSpace: EventTarget): XRPose | undefined;

	// AR

	/**
	 */
	getHitTestResults(hitTestSource: XRHitTestSource): XRHitTestResult[];

	/**
	 */
	getHitTestResultsForTransientInput(hitTestSource: XRTransientInputHitTestSource): XRTransientInputHitTestResult[];
	// Anchors

	/**
	 */
	trackedAnchors?: XRAnchorSet | undefined;

	/**
	 */
	createAnchor(pose: XRRigidTransform, space: EventTarget): Promise<XRAnchor>;
	// Planes

	/**
	 */
	worldInformation: {
		detectedPlanes?: XRPlaneSet | undefined;
	};
	// Hand tracking

	/**
	 */
	getJointPose(joint: XRJointSpace, baseSpace: EventTarget): XRJointPose;
}

/**
 */
export interface XRViewerPose {
	/**
	 */
	readonly transform: XRRigidTransform;

	/**
	 */
	readonly views: XRView[];
}

/**
 */
export interface XRPose {
	/**
	 */
	readonly emulatedPosition: boolean;

	/**
	 */
	readonly transform: XRRigidTransform;
}

/**
 */
export interface XRWebGLLayerInit {
	/**
	 */
	antialias?: boolean | undefined;

	/**
	 */
	depth?: boolean | undefined;

	/**
	 */
	stencil?: boolean | undefined;

	/**
	 */
	alpha?: boolean | undefined;

	/**
	 */
	ignoreDepthValues?: boolean | undefined;

	/**
	 */
	framebufferScaleFactor?: number | undefined;
}

/**
 */
export interface XRWebGLLayer {
	/**
	 */
	new (session: XRSession, gl: WebGLRenderingContext | undefined, options?: XRWebGLLayerInit): this;

	/**
	 */
	framebuffer: WebGLFramebuffer;

	/**
	 */
	framebufferWidth: number;

	/**
	 */
	framebufferHeight: number;

	/**
	 */
	getViewport(view: XRView): XRViewport;
}

/**
 */
export interface DOMPointInit {
	/**
	 */
	w?: number | undefined;

	/**
	 */
	x?: number | undefined;

	/**
	 */
	y?: number | undefined;

	/**
	 */
	z?: number | undefined;
}

/**
 */
export interface XRRigidTransform {
	/**
	 */
	new (matrix: Float32Array | DOMPointInit, direction?: DOMPointInit): this;

	/**
	 */
	position: DOMPointReadOnly;

	/**
	 */
	orientation: DOMPointReadOnly;

	/**
	 */
	matrix: Float32Array;

	/**
	 */
	inverse: XRRigidTransform;
}

/**
 */
export interface XRView {
	/**
	 */
	readonly eye: XREye;

	/**
	 */
	readonly projectionMatrix: Float32Array;

	/**
	 */
	readonly viewMatrix: Float32Array;

	/**
	 */
	readonly transform: XRRigidTransform;
}

/**
 */
export interface XRRayDirectionInit {
	/**
	 */
	x?: number | undefined;

	/**
	 */
	y?: number | undefined;

	/**
	 */
	z?: number | undefined;

	/**
	 */
	w?: number | undefined;
}

/**
 */
export interface XRRay {
	/**
	 */
	readonly origin: DOMPointReadOnly;

	/**
	 */
	readonly direction: XRRayDirectionInit;

	/**
	 */
	matrix: Float32Array;

	/**
	 */
	new (transformOrOrigin: XRRigidTransform | DOMPointInit, direction?: XRRayDirectionInit): this;
}

export enum XRHitTestTrackableType {
	'point',
	'plane',
	'mesh',
}

/**
 */
export interface XRHitResult {
	hitMatrix: Float32Array;
}

/**
 */
export interface XRTransientInputHitTestResult {
	readonly inputSource: XRInputSource;
	readonly results: XRHitTestResult[];
}

/**
 */
export interface XRHitTestResult {
	/**
	 */
	getPose(baseSpace: EventTarget): XRPose | undefined | null;
	// When anchor system is enabled

	/**
	 */
	createAnchor?(pose: XRRigidTransform): Promise<XRAnchor>;
}

/**
 */
export interface XRHitTestSource {
	/**
	 */
	cancel(): void;
}

/**
 */
export interface XRTransientInputHitTestSource {
	/**
	 */
	cancel(): void;
}

/**
 */
export interface XRHitTestOptionsInit {
	/**
	 */
	space: EventTarget;

	/**
	 */
	entityTypes?: XRHitTestTrackableType[] | undefined;

	/**
	 */
	offsetRay?: XRRay | undefined;
}

/**
 */
export interface XRTransientInputHitTestOptionsInit {
	/**
	 */
	profile: string;

	/**
	 */
	entityTypes?: XRHitTestTrackableType[] | undefined;

	/**
	 */
	offsetRay?: XRRay | undefined;
}

/**
 */
export interface XRAnchor {
	/**
	 */
	anchorSpace: EventTarget;

	/**
	 */
	delete(): void;
}

/**
 */
export interface XRPlane {
	/**
	 */
	orientation: 'Horizontal' | 'Vertical';

	/**
	 */
	planeSpace: EventTarget;

	/**
	 */
	polygon: DOMPointReadOnly[];

	/**
	 */
	lastChangedTime: number;
}

/**
 */
export enum XRHandJoint {
	'wrist',
	'thumb-metacarpal',
	'thumb-phalanx-proximal',
	'thumb-phalanx-distal',
	'thumb-tip',
	'index-finger-metacarpal',
	'index-finger-phalanx-proximal',
	'index-finger-phalanx-intermediate',
	'index-finger-phalanx-distal',
	'index-finger-tip',
	'middle-finger-metacarpal',
	'middle-finger-phalanx-proximal',
	'middle-finger-phalanx-intermediate',
	'middle-finger-phalanx-distal',
	'middle-finger-tip',
	'ring-finger-metacarpal',
	'ring-finger-phalanx-proximal',
	'ring-finger-phalanx-intermediate',
	'ring-finger-phalanx-distal',
	'ring-finger-tip',
	'pinky-finger-metacarpal',
	'pinky-finger-phalanx-proximal',
	'pinky-finger-phalanx-intermediate',
	'pinky-finger-phalanx-distal',
	'pinky-finger-tip',
}

/**
 */
export interface XRJointSpace extends EventTarget {
	/**
	 */
	readonly jointName: XRHandJoint;
}

/**
 */
export interface XRJointPose extends XRPose {
	/**
	 */
	readonly radius: number | undefined;
}

/**
 */
export interface XRHand extends Map<XRHandJoint, XRJointSpace> {
	/**
	 */
	readonly size: number;
}

/**
 */
export interface Constructor<T = object> {
	/**
	 */
	new (...args: any[]): T;

	/**
	 */
	prototype: T;
}

/**
 */
export interface XRInputSourceChangeEvent {
	/**
	 */
	session: XRSession;

	/**
	 */
	removed: XRInputSource[];

	/**
	 */
	added: XRInputSource[];
}

/**
 */
export interface XRInputSourceEvent extends Event {
	/**
	 */
	readonly frame: XRFrame;

	/**
	 */
	readonly inputSource: XRInputSource;
}

/**
 */
export type XRControllerEventType = XREventType | 'disconnected' | 'connected';

/**
 */
export interface WebXRController {
	/**
	 */
	new (): this;

	/**
	 */
	getTargetRaySpace(): Group;

	/**
	 */
	getGripSpace(): Group;

	/**
	 */
	dispatchEvent(event: { type: XRControllerEventType; data?: XRInputSource | undefined }): this;

	/**
	 */
	disconnect(inputSource: XRInputSource): this;

	/**
	 */
	update(inputSource: XRInputSource, frame: XRFrame, referenceSpace: XRReferenceSpace): this;
}

/**
 */
export interface WebXRManager extends EventDispatcher {
	/**
	 */
	new (renderer: any, gl: WebGLRenderingContext): this;

	/**
	 * @default false
	 */
	enabled: boolean;

	/**
	 * @default false
	 */
	isPresenting: boolean;

	/**
	 */
	getController(index: number): Group;

	/**
	 */
	getControllerGrip(index: number): Group;

	/**
	 */
	getHand(index: number): Group;

	/**
	 */
	setFramebufferScaleFactor(value: number): void;

	/**
	 */
	setReferenceSpaceType(value: XRReferenceSpaceType): void;

	/**
	 */
	getReferenceSpace(): XRReferenceSpace | null;

	/**
	 */
	getSession(): XRSession | null;

	/**
	 */
	setSession(value: XRSession): Promise<void>;

	/**
	 */
	getCamera(camera: Camera): Camera;

	/**
	 */
	setAnimationLoop(callback: XRFrameRequestCallback): void;

	/**
	 */
	getFoveation(): number | undefined;

	/**
	 */
	setFoveation(foveation: number): void;

	/**
	 */
	dispose(): void;
}
