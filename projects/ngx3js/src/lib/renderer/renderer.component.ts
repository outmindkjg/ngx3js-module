import {
	AfterContentInit,
	AfterViewInit,
	Component,
	ContentChildren,
	ElementRef,
	EventEmitter, forwardRef, HostListener,
	Input,
	OnChanges,
	OnInit,
	Output,
	QueryList,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgxCanvasComponent } from '../canvas/canvas.component';
import { NgxControlComponent } from '../control/control.component';
import { NgxAbstractControllerComponent } from '../controller.component.abstract';
import { NgxAbstractThreeDirective } from '../directive.abstract';
import { NgxEffectComponent } from '../effect/effect.component';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { IControlOptions, IGuiControlParam, IRendererEvent, IRendererInfo, IRendererTimer } from '../ngx-interface';
import { NgxPlaneComponent } from '../plane/plane.component';
import { NgxSharedComponent } from '../shared/shared.component';
import { NgxSizeComponent } from '../size/size.component';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxThreeClock } from '../three-clock';
import { NgxThreeGui } from '../three-gui';
import { NgxThreeStats } from '../three-stats';
import { NgxViewerComponent } from '../viewer/viewer.component';
import { NgxAudioComponent } from './../audio/audio.component';
import { NgxCameraComponent } from './../camera/camera.component';
import { NgxListenerComponent } from './../listener/listener.component';
import { NgxLookatComponent } from './../lookat/lookat.component';
import { NgxSceneComponent } from './../scene/scene.component';
import { NgxTweenComponent } from './../tween/tween.component';


/**
 * The Renderer component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/RendererComponent) page for details.
 * See the [ngx renderer](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_renderer) page for a live demo.
 *
 * ```html
 * <ngx3js-renderer
 * 	[controlType]="'orbit'"
 * 	[controlOptions]="{
 * 		enablePan: false,
 * 		enableDamping: true
 * 	}"
 * 	[cssType]="'css2d'"
 * 	[statsMode]="0" [antialias]="true" [shadowMapEnabled]="true"
 * 	[guiControl]="controls" [guiParams]="controlsParams"
 * 	(onRender)="onRender($event)"
 * ></ngx3js-renderer>
 * ```
 * @see THREE.WebGLRenderer
 * @see SVGRenderer
 */
@Component({
	selector: 'ngx3js-renderer',
	templateUrl: './renderer.component.html',
	styleUrls: ['./renderer.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxRendererComponent),
		},
	],
})
export class NgxRendererComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit, AfterContentInit, AfterViewInit, OnChanges
{
	/**
	 * The type of renderer
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | SVGRenderer | SVGRenderer, SVG |
	 * | THREE.WebGLRenderer | WebGLRenderer, WebGL, GL, WebGL2 |
	 */
	@Input() public type: string = 'webgl';

	/**
	 * The xrEnabled of renderer component
	 */
	@Input() public xrEnabled: boolean = false;

	/**
	 * The type of css renderer
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | CSS2DRenderer | CSS2DRenderer, CSS2D, 2D |
	 * | CSS3DRenderer | CSS3DRenderer, CSS3D, 3D |
	 *
	 * mixed - "css3d,css2d", "css2d,css3d"
	 */
	@Input() public cssType: string = 'none';

	/**
	 * The type of css canvas class
	 *
	 */
	@Input() public cssClass: string = '';

	/**
	 * The type of control
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | FlyControls | FlyControls, Fly |
	 * | FirstPersonControls | FirstPersonControls, FirstPerson |
	 * | DeviceOrientationControls | DeviceOrientationControls, DeviceOrientation |
	 * | DragControls | DragControls, Drag |
	 * | TransformControls | TransformControls, Transform |
	 * | TrackballControls | TrackballControls, Trackball |
	 * | ArcballControls | ArcballControls, Arcball |
	 * | CSM | CSM |
	 * | PlaneControls | PlaneControls, Plane |
	 * | OrbitControls | OrbitControls, Orbit |
	 * @see NgxControlComponent
	 */
	@Input() public controlType: string = 'none';

	/**
	 * The options of control
	 */
	@Input() public controlOptions: IControlOptions = null;

	/**
	 * If set, use shadow maps in the scene. Default is *true*.
	 */
	@Input() public shadowMapEnabled: boolean = true;

	/**
	 * Whether to use physically correct lighting mode. Default is *false*.
	 * See the [example:webgl_lights_physical lights / physical] example.
	 */
	@Input() public physicallyCorrectLights: boolean = null;

	/**
	 * Defines shadow map type (unfiltered, percentage close filtering, percentage close filtering with bilinear filtering in shader)
	 * Options are THREE.BasicShadowMap, THREE.PCFShadowMap (default), THREE.PCFSoftShadowMap and THREE.VSMShadowMap. See [Renderer constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Renderer) for details.
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public shadowMapType: string = null;

	/**
	 * Sets the clear color
	 */
	@Input() public clearColor: string | number = null;

	/**
	 * Sets the alpha of the clear color
	 */
	@Input() public clearAlpha: number = null;

	/**
	 * Default is [NoToneMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Renderer). See the [Renderer constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Renderer) for other choices.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.LinearToneMapping | LinearToneMapping, Linear |
	 * | THREE.ReinhardToneMapping | ReinhardToneMapping, Reinhard |
	 * | THREE.CineonToneMapping | CineonToneMapping, CineonTone |
	 * | THREE.ACESFilmicToneMapping | ACESFilmicToneMapping, ACESFilmic |
	 * | THREE.NoToneMapping | NoToneMapping, No |
	 */
	@Input() public toneMapping: string = null;

	/**
	 * Exposure level of tone mapping. Default is *1*.
	 */
	@Input() public toneMappingExposure: number = null;

	/**
	 * Defines whether the renderer respects object-level clipping planes. Default is *false*.
	 */
	@Input() public localClippingEnabled: boolean = null;

	/**
	 * User-defined clipping planes specified as THREE.Plane objects in world space.
	 */
	@Input() public globalClippingEnabled: boolean = null;

	/**
	 * whether to perform antialiasing. Default is *false*.
	 */
	@Input() public antialias: boolean = false;

	/**
	 * whether to perform alpha. Default is *false*.
	 */
	@Input() public alpha: boolean = false;

	/**
	 * The quality of SVGRenderer
	 *
	 * Notice - case insensitive.
	 *
	 * high - high quality.
	 * low - low quality.
	 */
	@Input() public quality: string = null;

	/**
	 * The Input of renderer component
	 *
	 * Notice - case insensitive.
	 *
	 * auto - auto fix the size of renderer.
	 * fixed - use fixed size of renderer.
	 */
	@Input() public sizeType: string = 'auto';

	/**
	 * The width of renderer
	 */
	@Input() public width: number | string = -1;

	/**
	 * The height of renderer
	 */
	@Input() public height: number | string = -1;

	/**
	 * The x position of renderer
	 *
	 * number : fixed position.
	 * string : % - the percent of renderer.
	 * string : % -/+ number - the percent of renderer and add some value.
	 */
	@Input() public x: number | string = 0;

	/**
	 * The y position of renderer
	 *
	 * number : fixed position.
	 * string : % - the percent of renderer.
	 * string : % -/+ number - the percent of renderer and add some value.
	 */
	@Input() public y: number | string = 0;

	/**
	 * the stats mode  of stats module
	 */
	@Input() public statsMode: number = -1;

	/**
	 * The statsStyle of stats module
	 */
	@Input() public statsStyle: any = null;

	/**
	 * Defines whether the renderer should automatically clear its output before rendering a frame.
	 */
	@Input() public autoClear: boolean = null;

	/**
	 * If [WebGLRenderer.autoClear](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer.autoClear) is true, defines whether the renderer should clear the color buffer.
	 * 	Default is *true*.
	 */
	@Input() public autoClearColor: boolean = true;

	/**
	 * Defines the output encoding of the renderer. Default is [THREE.LinearEncoding](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures).
	 * If a render target has been set using [.setRenderTarget](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer.setRenderTarget) then renderTarget.texture.encoding will be used instead.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) page for details of other formats.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.sRGBEncoding | sRGBEncoding, sRGB |
	 * | THREE.GammaEncoding | GammaEncoding, Gamma |
	 * | THREE.RGBEEncoding | RGBEEncoding, RGBE |
	 * | THREE.LogLuvEncoding | LogLuvEncoding, LogLuv |
	 * | THREE.RGBM7Encoding | RGBM7Encoding, RGBM7 |
	 * | THREE.RGBM16Encoding | RGBM16Encoding, RGBM16 |
	 * | THREE.RGBDEncoding | RGBDEncoding, RGBD |
	 * | THREE.LinearEncoding | LinearEncoding, Linear |
	 */
	@Input() public outputEncoding: string = null;

	/**
	 * The guiControl of GUI
	 */
	@Input() public guiControl: any = null;

	/**
	 * The guiParams of GUI
	 */
	@Input() public guiParams: IGuiControlParam[] = [];

	/**
	 * The guiOpen of GUI
	 */
	@Input() public guiOpen: boolean = false;

	/**
	 * The guiStyle of GUI
	 */
	@Input() public guiStyle: any = null;

	/**
	 * The guiOpen of GUI
	 */
	@Input() public composerEnable: boolean = true;

	/**
	 * whether to use a logarithmic depth buffer. It may be neccesary to use this if dealing with huge differences in scale in a single scene. Note that this setting uses gl_FragDepth if available which disables the [Early Fragment Test](https://www.khronos.org/opengl/wiki/Early_Fragment_Test) optimization and can cause a decrease in performance.
	 * Default is *false*. See the [example:webgl_camera_logarithmicdepthbuffer camera / logarithmicdepthbuffer] example.
	 */
	@Input() public logarithmicDepthBuffer: boolean = false;

	/**
	 * whether to preserve the buffers until manually cleared or overwritten. Default is *false*.
	 */
	@Input() public preserveDrawingBuffer: boolean = false;

	/**
	 * The Input of renderer component
	 *
	 * Notice - case insensitive.
	 *
	 * string join by ,
	 *
	 * change - change.
	 * pointerdown, mousedown, down - pointerdown.
	 * pointerup, mouseup, up - pointerup.
	 * pointermove, mousemove, move - pointermove.
	 * keydown - keydown.
	 * keyup - keyup.
	 * keypress - keypress.
	 * click - click.
	 * mouseover - mouseover, over.
	 * mouseout - mouseout, out.
	 *
	 * @see HTMLElement.addEventListener
	 */
	@Input() public useEvent: string = null;

	/**
	 * The camera of renderer component
	 */
	@Input() public camera: NgxCameraComponent = null;

	/**
	 * The scene of renderer component
	 */
	@Input() public scene: NgxSceneComponent = null;

	/**
	 * The requiredExtensions of renderer component
	 */
	@Input() public requiredExtensions: string[] = null;

	/**
	 * The beforeRender of renderer component
	 */
	@Input() public beforeRender: (info: IRendererInfo) => boolean = null;

	/**
	 * The afterRender of renderer component
	 */
	@Input() public afterRender: (info: IRendererInfo) => any = null;

	/**
	 * The Output of renderer component
	 */
	@Output() private eventListener: EventEmitter<IRendererEvent> = new EventEmitter<IRendererEvent>();

	/**
	 * The Output of renderer component
	 */
	@Output() private onRender: EventEmitter<IRendererTimer> = new EventEmitter<IRendererTimer>();

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(NgxSceneComponent, { descendants: false }) private sceneList: QueryList<NgxSceneComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(NgxCameraComponent, { descendants: true }) private cameraList: QueryList<NgxCameraComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(NgxEffectComponent, { descendants: true }) private effectList: QueryList<NgxEffectComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(NgxViewerComponent, { descendants: true }) private viewerList: QueryList<NgxViewerComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(NgxListenerComponent, { descendants: true }) private listenerList: QueryList<NgxListenerComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(NgxAudioComponent, { descendants: true }) private audioList: QueryList<NgxAudioComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(NgxAbstractControllerComponent, { descendants: true }) private controllerList: QueryList<NgxAbstractControllerComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(NgxLookatComponent, { descendants: false }) private lookatList: QueryList<NgxLookatComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(NgxControlComponent, { descendants: false }) private controlList: QueryList<NgxControlComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(NgxPlaneComponent) private clippingPlanesList: QueryList<NgxPlaneComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(NgxCanvasComponent) private canvas2dList: QueryList<NgxCanvasComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(NgxSharedComponent, { descendants: true }) private sharedList: QueryList<NgxSharedComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(NgxSizeComponent, { descendants: true }) private sizeList: QueryList<NgxSizeComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(NgxAbstractThreeDirective, { descendants: true }) private threeDirectiveList: QueryList<NgxAbstractThreeDirective>;
	 
	/**
	 * Content children of ngx renderer component
	 */
	@ContentChildren(NgxTweenComponent, { descendants: true }) private golbalTweenList: QueryList<NgxTweenComponent>;

	/**
	 * View child of renderer component
	 */
	@ViewChild('canvas') private canvasEle: ElementRef = null;

	/**
	 * View child of renderer component
	 */
	@ViewChild('debugStats') private debugStatsEle: ElementRef = null;

	/**
	 * View child of renderer component
	 */
	@ViewChild('debugControls') private debugControlsEle: ElementRef = null;

	/**
	 * View child of renderer component
	 */
	@ViewChild('renderer') private rendererEle: ElementRef = null;

	/**
	 * Gets clipping planes
	 * @param [def]
	 * @returns clipping planes
	 */
	private getClippingPlanes(def?: I3JS.Plane[]): I3JS.Plane[] {
		if (this.clippingPlanesList !== null && this.clippingPlanesList !== undefined) {
			const clippingPlanes: I3JS.Plane[] = [];
			this.clippingPlanesList.forEach((plane) => {
				clippingPlanes.push(plane.getWorldPlane());
			});
			return clippingPlanes;
		} else {
			return def;
		}
	}

	private static _showNgxLog : boolean = false;

	/**
	 * Creates an instance of renderer component.
	 */
	constructor() {
		super();
		if (!NgxRendererComponent._showNgxLog) {
			NgxRendererComponent._showNgxLog = true;
			console.log(
				[
					'    __     __',
					' __/ __\\  / __\\__   ____   _____   _____',
					'/ __/  /\\/ /  /___\\/ ____\\/ _____\\/ _____\\',
					'\\/_   __/ /   _   / /  __/ / __  / / __  /_   __   _____',
					'/ /  / / /  / /  / /  / / /  ___/ /  ___/\\ _\\/ __\\/ _____\\',
					'\\/__/  \\/__/\\/__/\\/__/  \\/_____/\\/_____/\\/__/ /  / /  ___/',
					'                                         / __/  /  \\__  \\',
					' with %c Angular ngx3js %c                   \\/____/\\/_____/',
					' https://github.com/outmindkjg/ngx3js-module',
				].join('\n'),
				'color:red;font-style:italic;text-shadow: 1px 1px 2px red, 0 0 0.2em white, 0 0 0.03em gray;',
				''
			);
		}
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('renderer');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		this.dispose();
		if (NgxThreeUtil.isNotNull(this.stats)) {
			this.stats.dom.parentNode.removeChild(this.stats.dom);
		}
		if (NgxThreeUtil.isNotNull(this.renderControl)) {
			this.renderControl.ngOnDestroy();
		}
		Object.entries(this._eventListener).forEach(([key, value]) => {
			this.removeEvent(key, value);
			delete this._eventListener[key];
		});
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
		if (changes && this.renderer) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit() {
		this.subscribeListQueryChange(this.sceneList, 'sceneList', 'scene');
		this.subscribeListQueryChange(this.cameraList, 'cameraList', 'camera');
		this.subscribeListQueryChange(this.effectList, 'effectList', 'effect');
		this.subscribeListQueryChange(this.viewerList, 'viewerList', 'viewer');
		this.subscribeListQueryChange(this.listenerList, 'listenerList', 'listener');
		this.subscribeListQueryChange(this.audioList, 'audioList', 'audio');
		this.subscribeListQueryChange(this.controllerList, 'controllerList', 'controller');
		this.subscribeListQueryChange(this.lookatList, 'lookatList', 'lookat');
		this.subscribeListQueryChange(this.controlList, 'controlList', 'control');
		this.subscribeListQueryChange(this.clippingPlanesList, 'clippingPlanesList', 'clippingPlanes');
		this.subscribeListQueryChange(this.canvas2dList, 'canvas2dList', 'canvas2d');
		this.subscribeListQueryChange(this.sharedList, 'sharedList', 'shared');
		this.subscribeListQueryChange(this.sizeList, 'sizeList', 'size');
		this.subscribeListQueryChange(this.golbalTweenList, 'tweenList', 'tween');
		super.ngAfterContentInit();
	}

	/**
	 * A callback method that is invoked immediately after
	 * Angular has completed initialization of a component's view.
	 * It is invoked only once when the view is instantiated.
	 */
	ngAfterViewInit() {
		let errorCode: string = null;
		switch (this.type.toLowerCase()) {
			case 'gl2':
			case 'webgl2':
				if (!this.isAvailable('gl2')) {
					errorCode = 'gl2';
				}
		}
		if (NgxThreeUtil.isNotNull(this.requiredExtensions)) {
			this.requiredExtensions.forEach((extension) => {
				if (!this.isAvailable(extension)) {
					switch (extension) {
						case 'compressed_texture_pvrtc':
						case 'compressed':
							errorCode = 'WEBGL_compressed_texture_pvrtc';
							break;
						case 'depth_texture':
						case 'depth':
							errorCode = 'WEBGL_depth_texture';
							break;
						default:
							errorCode = extension;
							break;
					}
				}
			});
		}
		if (errorCode !== null) {
			const errorEle = document.createElement('DIV');
			switch (errorCode) {
				case 'gpu':
					errorEle.innerHTML = 'Your browser does not support WebGPU.';
					break;
				case 'gl2':
					errorEle.innerHTML =
						'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" target="_blank">WebGL 2</a>';
					break;
				default:
					errorEle.innerHTML =
						'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" target="_blank">' +
						errorCode +
						'</a>';
					break;
			}
			this.dispose();
			this.renderer = null;
			this.userGestureSubscribe(errorEle).subscribe(() => {
				this.ngAfterViewInit();
			});
			return;
		}
		this.clock = NgxThreeUtil.getClock(true);
		this.renderer = this.getRenderer();
	}

	/**
	 * Determines whether available is
	 *
	 * @param type
	 * @returns true if available
	 */
	private isAvailable(type: string): boolean {
		switch (type.toLowerCase()) {
			case 'gpu':
				return (navigator as any)['gpu'] !== undefined;
			case 'gl': {
				try {
					const canvas = document.createElement('canvas');
					return !!(
						window.WebGLRenderingContext &&
						(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
					);
				} catch (e) {
					return false;
				}
			}
			case 'gl2': {
				try {
					const canvas = document.createElement('canvas');
					return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
				} catch (e) {
					return false;
				}
			}
			case 'compressed':
				return this.isHasExtension('WEBGL_compressed_texture_pvrtc');
			case 'depth':
				return this.isHasExtension('WEBGL_depth_texture');
		}
		return true;
	}

	/**
	 * Check gl of renderer component
	 */
	private _checkGl: any = null;

	/**
	 * Determines whether has extension is
	 *
	 * @param name
	 * @returns true if has extension
	 */
	private isHasExtension(name: string): boolean {
		if (this._checkGl === null) {
			let domElement = document.createElement('canvas');
			this._checkGl = domElement.getContext('webgl') || domElement.getContext('experimental-webgl');
		}
		if (NgxThreeUtil.isNotNull(this._checkGl.getExtension)) {
			return this._checkGl.getExtension(name) !== null;
		} else {
			return false;
		}
	}

	/**
	 * Disposes renderer component
	 */
	dispose() {
		if (NgxThreeUtil.isNotNull(this.renderer) && this.renderer instanceof N3JS.WebGLRenderer) {
			if (this.renderer.domElement && this.renderer.domElement.parentNode) {
				this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
			}
			this.renderer.forceContextLoss();
			this.renderer.dispose();
			this.renderer = null;
		}
		if (this.cssRenderer !== null) {
			if (Array.isArray(this.cssRenderer)) {
				this.cssRenderer.forEach((cssRenderer) => {
					if (cssRenderer.domElement && cssRenderer.domElement.parentNode) {
						cssRenderer.domElement.parentNode.removeChild(cssRenderer.domElement);
					}
				});
			} else {
				if (this.cssRenderer.domElement && this.cssRenderer.domElement.parentNode) {
					this.cssRenderer.domElement.parentNode.removeChild(this.cssRenderer.domElement);
				}
			}
			this.cssRenderer = null;
		}
		if (this._tweenGroup !== null) {
			this._tweenGroup.removeAll();
			this._tweenGroup = null;
		}
		if (this.stats !== null) {
			this.stats = null;
		}
	}

	/**
	 * Removes event
	 * @param type
	 * @param listener
	 * @returns
	 */
	removeEvent(type: string, listener: any): any {
		if (NgxThreeUtil.isNotNull(listener)) {
			switch (type) {
				case 'keydown':
				case 'keyup':
				case 'keypress':
					window.removeEventListener(type, listener);
					break;
				default:
					this.rendererEle.nativeElement.removeEventListener(type, listener);
					break;
			}
		}
		return null;
	}

	/**
	 * The Events of renderer component
	 */
	private events: IRendererEvent = {
		type: 'none',
		nativeElement: null,
		client: new N3JS.Vector2(),
		clientX: 0,
		clientY: 0,
		offset: new N3JS.Vector2(),
		offsetX: 0,
		offsetY: 0,
		rate: new N3JS.Vector2(),
		rateX: 0,
		rateY: 0,
		size: new N3JS.Vector2(),
		width: 0,
		height: 0,
		mouse: new N3JS.Vector2(),
		direction: new N3JS.Vector2(),
		keyInfo: {
			code: null,
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			key: '',
			timeStamp: 0,
			timeRepeat: 0,
			xy: new N3JS.Vector2(),
		},
		event: {},
	};

	/**
	 * Offset top of renderer component
	 */
	private offsetTop: number = 0;

	/**
	 * Offset left of renderer component
	 */
	private offsetLeft: number = 0;

	/**
	 * Offset right of renderer component
	 */
	private offsetRight: number = 0;

	/**
	 * Offset bottom of renderer component
	 */
	private offsetBottom: number = 0;

	/**
	 * Sets events
	 * @param type
	 * @param event
	 */
	private setEvents(type: string, event: TouchInit | KeyboardEvent) {
		let clientX = 0;
		let clientY = 0;
		if (event instanceof KeyboardEvent) {
			clientX = this.offsetLeft;
			clientY = this.offsetTop;
			const keyInfo = this.events.keyInfo;
			if (event.type == 'keyup') {
				keyInfo.code = null;
				keyInfo.ctrlKey = false;
				keyInfo.altKey = false;
				keyInfo.shiftKey = false;
				keyInfo.key = '';
				keyInfo.timeStamp = 0;
				keyInfo.timeRepeat = 0;
				keyInfo.xy.set(0, 0);
			} else if (this.events.keyInfo.code === event.code) {
				keyInfo.timeRepeat = event.timeStamp - keyInfo.timeStamp;
				switch (event.code) {
					case 'ArrowRight':
						keyInfo.xy.x += keyInfo.timeRepeat;
						break;
					case 'ArrowLeft':
						keyInfo.xy.x -= keyInfo.timeRepeat;
						break;
					case 'ArrowUp':
						keyInfo.xy.y += keyInfo.timeRepeat;
						break;
					case 'ArrowDown':
						keyInfo.xy.y -= keyInfo.timeRepeat;
						break;
				}
			} else {
				keyInfo.code = event.code;
				keyInfo.ctrlKey = event.ctrlKey;
				keyInfo.altKey = event.altKey;
				keyInfo.shiftKey = event.shiftKey;
				keyInfo.key = event.key;
				keyInfo.timeStamp = event.timeStamp;
				keyInfo.timeRepeat = 0;
				keyInfo.xy.set(0, 0);
			}
		} else {
			clientX = event.clientX;
			clientY = event.clientY;
		}
		const offsetX = clientX - this.offsetLeft;
		const offsetY = clientY - this.offsetTop;
		this.events.type = type;
		this.events.clientX = clientX;
		this.events.clientY = clientY;
		this.events.client.set(clientX, clientY);
		this.events.offsetX = offsetX;
		this.events.offsetY = offsetY;
		this.events.offset.set(offsetX, offsetY);
		this.events.rateX = offsetX / this.rendererWidth;
		this.events.rateY = offsetY / this.rendererHeight;
		this.events.rate.set(this.events.rateX, this.events.rateY);
		this.events.mouse.set((offsetX / this.rendererWidth) * 2 - 1, -(offsetY / this.rendererHeight) * 2 + 1);
		this.events.event = event;
		this.eventListener.emit(this.events);
	}

	/**
	 * Adds event
	 * @param type
	 * @param listener
	 * @returns
	 */
	public addEvent(type: string, listener: any) {
		if (NgxThreeUtil.isNull(listener)) {
			listener = (event: TouchInit | KeyboardEvent) => {
				this.setEvents(type, event);
			};
			switch (type) {
				case 'keydown':
				case 'keyup':
				case 'keypress':
					window.addEventListener(type, listener, { passive: true });
					break;
				default:
					this.rendererEle.nativeElement.addEventListener(type, listener, {
						passive: true,
					});
					break;
			}
		}
		return listener;
	}

	/**
	 * Event listener of renderer component
	 */
	private _eventListener: {
		[key: string]: (event: any) => void;
	} = {};

	/**
	 * Gets clear color
	 * @param [def]
	 * @returns clear color
	 */
	private getClearColor(def?: string | number): I3JS.Color {
		return NgxThreeUtil.getColorSafe(this.clearColor, def);
	}

	/**
	 * Gets clear alpha
	 * @param [def]
	 * @returns clear alpha
	 */
	private getClearAlpha(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.clearAlpha, def);
	}

	/**
	 * Gets render size
	 * @param size
	 * @param renderSize
	 * @param [def]
	 * @returns render size
	 */
	private getRenderSize(size: number | string, renderSize: number, def?: number | string): number {
		const baseSize = NgxThreeUtil.getTypeSafe(size, def);
		if (NgxThreeUtil.isNotNull(baseSize)) {
			if (typeof baseSize == 'string') {
				if (baseSize.indexOf('%') > 0) {
					const [percent, extra] = baseSize.split('%');
					const viewSize = Math.ceil((renderSize * parseFloat(percent)) / 100);
					if (extra === '') {
						return viewSize;
					} else {
						return viewSize + parseInt(extra);
					}
				} else {
					return parseFloat(baseSize);
				}
			} else if (baseSize >= 0) {
				return baseSize;
			}
		}
		return renderSize;
	}

	/**
	 * Sets size
	 * @param width
	 * @param height
	 */
	public setSize(width: number, height: number) {
		const rendererWidth = this.getRenderSize(this.width, width);
		const rendererHeight = this.getRenderSize(this.height, height);
		const left = this.getRenderSize(this.x, width);
		const top = this.getRenderSize(this.y, height);
		if (this._lastConfirmHtml !== null) {
			this._lastConfirmHtml.style.width = rendererWidth + 'px';
			this._lastConfirmHtml.style.height = rendererHeight + 'px';
			this._lastConfirmHtml.style.left = left + 'px';
			this._lastConfirmHtml.style.top = top + 'px';
		}
		if (this.canvasEle !== null) {
			this.canvasEle.nativeElement.style.width = rendererWidth + 'px';
			this.canvasEle.nativeElement.style.height = rendererHeight + 'px';
			this.canvasEle.nativeElement.style.left = left + 'px';
			this.canvasEle.nativeElement.style.top = top + 'px';
		}
		this.rendererWidth = rendererWidth;
		this.rendererHeight = rendererHeight;
		if (this.renderer !== null && this.renderer !== undefined) {
			this.events.width = this.rendererWidth;
			this.events.height = this.rendererHeight;
			this.events.nativeElement = this.rendererEle.nativeElement;
			this.offsetTop = 0;
			this.offsetLeft = 0;
			let offsetParent = this.rendererEle.nativeElement;
			while (offsetParent) {
				this.offsetLeft += offsetParent.offsetLeft;
				this.offsetTop += offsetParent.offsetTop;
				offsetParent = offsetParent.offsetParent;
			}
			this.offsetRight = this.offsetLeft + this.rendererWidth;
			this.offsetBottom = this.offsetTop + this.rendererHeight;
			const pixelRatio = window.devicePixelRatio;
			this.events.size.set(this.rendererWidth, this.rendererHeight);
			this.renderer.setSize(this.rendererWidth, this.rendererHeight);
			this.effectList.forEach((composer) => {
				composer.setRendererSize(this.rendererWidth, this.rendererHeight, pixelRatio);
			});
			this.cameraList.forEach((camera) => {
				camera.setRendererSize(this.rendererWidth, this.rendererHeight, width, height, pixelRatio);
			});
			this.viewerList.forEach((viewer) => {
				viewer.setRendererSize(this.rendererWidth, this.rendererHeight, pixelRatio);
			});
			this.sizeList.forEach((size) => {
				size.setRendererSize(this.rendererWidth, this.rendererHeight, pixelRatio);
			});
			if (this.cssRenderer !== null) {
				if (Array.isArray(this.cssRenderer)) {
					this.cssRenderer.forEach((cssRenderer) => {
						cssRenderer.setSize(this.rendererWidth, this.rendererHeight);
					});
				} else {
					this.cssRenderer.setSize(this.rendererWidth, this.rendererHeight);
				}
			}
			const rendererSize = this.getSize();
			this.canvas2dList.forEach((canvas2d) => {
				canvas2d.setSize(rendererSize);
			});

			this._sizeSubject.next(rendererSize);
		}
	}

	/**
	 * Size subject of renderer component
	 */
	protected _sizeSubject: Subject<I3JS.Vector2> = new Subject<I3JS.Vector2>();

	/**
	 * Update subject of renderer component
	 */
	protected _updateSubject: Subject<IRendererTimer> = new Subject<IRendererTimer>();

	/**
	 * Sizes subscribe
	 * @returns subscribe
	 */
	public sizeSubscribe(): Observable<I3JS.Vector2> {
		return this._sizeSubject.asObservable();
	}

	/**
	 * Updates subscribe
	 * @returns subscribe
	 */
	public updateSubscribe(): Observable<IRendererTimer> {
		return this._updateSubject.asObservable();
	}

	/**
	 * User gesture subject of renderer component
	 */
	protected _userGestureSubject: Subject<boolean> = new Subject<boolean>();

	/**
	 * Users gesture subscribe
	 * @param [ele]
	 * @returns gesture subscribe
	 */
	public userGestureSubscribe(ele?: HTMLElement): Observable<boolean> {
		const observable = this._userGestureSubject.asObservable();
		if (!this._userGestureShown) {
			this._userGestureShown = true;
			window.setTimeout(() => {
				this.drawGesture(ele);
			}, 100);
		}
		return observable;
	}

	/**
	 * Last confirm html of renderer component
	 */
	private _lastConfirmHtml: HTMLElement = null;

	/**
	 * User gesture shown of renderer component
	 */
	private _userGestureShown: boolean = false;

	/**
	 * Draws gesture
	 * @param [ele]
	 */
	private drawGesture(ele?: HTMLElement) {
		if (this._lastConfirmHtml !== null) {
			this._lastConfirmHtml.parentNode.removeChild(this._lastConfirmHtml);
			this._lastConfirmHtml = null;
		}
		this._userGestureShown = true;
		const confirm = document.createElement('div');
		confirm.className = 'message-info';
		const button = document.createElement('button');
		button.className = 'message-button';
		button.innerHTML = '<b>Re</b>try';
		button.addEventListener(
			'click',
			() => {
				confirm.parentNode.removeChild(confirm);
				this._lastConfirmHtml = null;
				this._userGestureShown = false;
				this._userGestureSubject.next(true);
			},
			{ passive: true }
		);
		if (NgxThreeUtil.isNotNull(ele)) {
			const message = document.createElement('div');
			message.className = 'message';
			message.append(ele);
			confirm.append(message);
		}
		confirm.append(button);
		this.canvasEle.nativeElement.appendChild(confirm);
		this._lastConfirmHtml = confirm;
		this.resizeRender();
	}

	/**
	 * Gets size
	 * @returns size
	 */
	public getSize(): I3JS.Vector2 {
		return new N3JS.Vector2(this.rendererWidth, this.rendererHeight);
	}

	/**
	 * The Renderlistener of renderer component
	 */
	private renderlistener: I3JS.AudioListener = null;

	private _tweenGroup : I3JS.TweenGroup = null;

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		if (this.renderer !== null && this.renderer !== undefined) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getRenderer();
				return;
			}
			if (
				!NgxThreeUtil.isOnlyIndexOf(
					changes,
					[
						'useevent',
						'shared',
						'width',
						'height',
						'x',
						'y',
						'resize',
						'scene',
						'camera',
						'control',
						'composer',
						'viewer',
						'listener',
						'audio',
						'controller',
						'lookat',
						'control',
						'localclippingenabled',
						'globalclippingenabled',
						'clearcolor',
						'clearalpha',
						'tonemapping',
						'tonemappingexposure',
						'shadowmapenabled',
						'physicallycorrectlights',
						'shadowmaptype',
						'composerenable',
						'autoclear',
						'autoclearcolor',
						'outputencoding',
						'clippingplanes',
						'canvas2d',
						'cssclass',
						'controltype',
						'controloptions',
						'guiparams',
						'guicontrol',
						'size',
						'tween'
					],
					this.OBJECT_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, [
					'useevent',
					'shared',
					'resize',
					'scene',
					'camera',
					'control',
					'composer',
					'viewer',
					'listener',
					'audio',
					'controller',
					'lookat',
					'control',
					'clippingPlanes',
					'canvas2d',
					'statsmode',
					'guicontrol',
					'tween',
					'webglrenderer',
				]);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['width', 'height', 'x', 'y', 'size'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['resize']);
			}
			if (NgxThreeUtil.isIndexOf(changes, 'guiparams')) {
				changes = NgxThreeUtil.pushUniq(changes, ['guicontrol']);
			}
			if (
				NgxThreeUtil.isIndexOf(changes, [
					'localclippingenabled',
					'globalclippingenabled',
					'statsmode',
					'clearcolor',
					'clearalpha',
					'tonemapping',
					'tonemappingexposure',
					'shadowmapenabled',
					'physicallycorrectlights',
					'shadowmaptype',
					'autoclear',
					'autoclearcolor',
					'outputencoding',
					'clippingplanes',
				])
			) {
				changes = NgxThreeUtil.pushUniq(changes, ['webglrenderer']);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['camera', 'controltype', 'controloptions'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['control']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'guicontrol':
						if (this.gui !== null && changes.indexOf('init') === -1) {
							this.gui.domElement.parentNode.removeChild(this.gui.domElement);
							this.gui = null;
						}
						if (
							this.gui == null &&
							NgxThreeUtil.isNotNull(this.guiControl) &&
							NgxThreeUtil.isNotNull(this.guiParams) &&
							this.guiParams.length > 0
						) {
							const gui = NgxThreeUtil.setupGui(this.guiControl, this.getGui(), this.guiParams);
							if (this.guiOpen) {
								gui.open();
							} else {
								gui.close();
							}
						}
						break;
					case 'useevent':
						const useEvents = NgxThreeUtil.isNotNull(this.useEvent) ? this.useEvent.toLowerCase().split(',') : [];
						if (useEvents.indexOf('change') > -1) {
							this._eventListener.change = this.addEvent('change', this._eventListener.change);
						} else {
							this._eventListener.change = this.removeEvent('change', this._eventListener.change);
						}
						if (
							useEvents.indexOf('pointerdown') > -1 ||
							useEvents.indexOf('mousedown') > -1 ||
							useEvents.indexOf('down') > -1
						) {
							this._eventListener.pointerdown = this.addEvent('pointerdown', this._eventListener.pointerdown);
						} else {
							this._eventListener.pointerdown = this.removeEvent('pointerdown', this._eventListener.pointerdown);
						}
						if (
							useEvents.indexOf('pointerup') > -1 ||
							useEvents.indexOf('mouseup') > -1 ||
							useEvents.indexOf('up') > -1
						) {
							this._eventListener.pointerup = this.addEvent('pointerup', this._eventListener.pointerup);
						} else {
							this._eventListener.pointerup = this.removeEvent('pointerup', this._eventListener.pointerup);
						}
						if (
							useEvents.indexOf('pointermove') > -1 ||
							useEvents.indexOf('mousemove') > -1 ||
							useEvents.indexOf('move') > -1
						) {
							this._eventListener.pointermove = this.addEvent('pointermove', this._eventListener.pointermove);
						} else {
							this._eventListener.pointermove = this.removeEvent('pointermove', this._eventListener.pointermove);
						}
						if (useEvents.indexOf('keydown') > -1) {
							this._eventListener.keydown = this.addEvent('keydown', this._eventListener.keydown);
						} else {
							this._eventListener.keydown = this.removeEvent('keydown', this._eventListener.keydown);
						}
						if (useEvents.indexOf('keyup') > -1) {
							this._eventListener.keyup = this.addEvent('keyup', this._eventListener.keyup);
						} else {
							this._eventListener.keyup = this.removeEvent('keyup', this._eventListener.keyup);
						}
						if (useEvents.indexOf('keypress') > -1 || useEvents.indexOf('press') > -1) {
							this._eventListener.keypress = this.addEvent('keypress', this._eventListener.keypress);
						} else {
							this._eventListener.keypress = this.removeEvent('keypress', this._eventListener.keypress);
						}
						if (useEvents.indexOf('click') > -1) {
							this._eventListener.click = this.addEvent('click', this._eventListener.click);
						} else {
							this._eventListener.click = this.removeEvent('click', this._eventListener.click);
						}
						if (useEvents.indexOf('mouseover') > -1 || useEvents.indexOf('over') > -1) {
							this._eventListener.mouseover = this.addEvent('mouseover', this._eventListener.mouseover);
						} else {
							this._eventListener.mouseover = this.removeEvent('mouseover', this._eventListener.mouseover);
						}
						if (useEvents.indexOf('mouseout') > -1 || useEvents.indexOf('out') > -1) {
							this._eventListener.mouseout = this.addEvent('mouseout', this._eventListener.mouseout);
						} else {
							this._eventListener.mouseout = this.removeEvent('mouseout', this._eventListener.mouseout);
						}
						break;
					case 'resize':
						this.resizeRender();
						break;
					case 'webglrenderer':
						if (this.renderer instanceof N3JS.WebGLRenderer) {
							if (NgxThreeUtil.isNotNull(this.clearColor)) {
								this.renderer.setClearColor(this.getClearColor());
							}
							if (NgxThreeUtil.isNotNull(this.clearAlpha)) {
								this.renderer.setClearAlpha(this.getClearAlpha());
							}
							if (NgxThreeUtil.isNotNull(this.toneMapping)) {
								this.renderer.toneMapping = NgxThreeUtil.getToneMappingSafe(this.toneMapping);
							}
							if (NgxThreeUtil.isNotNull(this.toneMappingExposure)) {
								this.renderer.toneMappingExposure = this.toneMappingExposure;
							}
							this.renderer.setPixelRatio(window.devicePixelRatio);
							if (NgxThreeUtil.isNotNull(this.shadowMapEnabled)) {
								this.renderer.shadowMap.enabled = this.shadowMapEnabled;
							}
							if (NgxThreeUtil.isNotNull(this.physicallyCorrectLights)) {
								this.renderer.physicallyCorrectLights = this.physicallyCorrectLights;
							}
							if (this.renderer.shadowMap.enabled && NgxThreeUtil.isNotNull(this.shadowMapType)) {
								this.renderer.shadowMap.type = NgxThreeUtil.getShadowMapTypeSafe(this.shadowMapType, 'pcfsoft');
							}
							if (NgxThreeUtil.isNotNull(this.autoClear)) {
								this.renderer.autoClear = this.autoClear;
							}
							if (NgxThreeUtil.isNotNull(this.autoClearColor)) {
								this.renderer.autoClearColor = this.autoClearColor;
							}
							if (NgxThreeUtil.isNotNull(this.outputEncoding)) {
								this.renderer.outputEncoding = NgxThreeUtil.getTextureEncodingSafe(this.outputEncoding, 'linear');
							}
							if (NgxThreeUtil.isNotNull(this.localClippingEnabled)) {
								this.renderer.localClippingEnabled = this.localClippingEnabled;
							}
							if (NgxThreeUtil.isNotNull(this.globalClippingEnabled)) {
								this.renderer.clippingPlanes = !this.globalClippingEnabled ? [] : this.getClippingPlanes();
							}
						}
						break;
					case 'statsmode':
						if (this.statsMode >= 0) {
							if (this.stats === null) {
								this.getStats();
							}
							this.stats?.showPanel(this.statsMode);
						} else {
							if (this.stats !== null) {
								this.stats?.dom.parentNode.removeChild(this.stats.dom);
							}
							this.stats = null;
						}
						break;
					case 'control':
						this.controls = this.getControls(this.cameraList, this.sceneList, this.canvasEle.nativeElement);
						break;
					case 'tween' :
						if (this.golbalTweenList.length > 0) {
							if (this._tweenGroup === null) {
								this._tweenGroup = new N3JS.TweenGroup();
							}
							this.golbalTweenList.forEach(tween => {
								tween.setTweenGroup(this._tweenGroup);
							});
						} else {
							if (this._tweenGroup !== null) {
								this._tweenGroup.removeAll();
							}
							this._tweenGroup = null;
						}
						break;
					case 'scene':
						this.unSubscribeReferList('sceneList');
						if (NgxThreeUtil.isNotNull(this.sceneList)) {
							this.sceneList.forEach((scene) => {
								scene.setRenderer(this);
							});
							this.subscribeListQuery(this.sceneList, 'sceneList', 'scene');
						}
						break;
					case 'camera':
						this.unSubscribeReferList('cameraList');
						if (NgxThreeUtil.isNotNull(this.cameraList)) {
							this.cameraList.forEach((camera) => {
								camera.setRenderer(this.renderer, this.cssRenderer, this.sceneList);
							});
							this.subscribeListQuery(this.cameraList, 'cameraList', 'camera');
						}
						break;
					case 'composer':
						this.unSubscribeReferList('effectList');
						if (NgxThreeUtil.isNotNull(this.effectList) && this.renderer instanceof N3JS.WebGLRenderer) {
							const renderer = this.renderer;
							if (
								this.effectList.length > 0 &&
								this.cameraList.length > 0 &&
								this.sceneList.length > 0 &&
								this.renderer instanceof N3JS.WebGLRenderer
							) {
								let camera: I3JS.Camera = null;
								this.cameraList.forEach((cameraCom) => {
									if (camera === null) {
										const tmpCamera = cameraCom.getCamera();
										if (tmpCamera instanceof N3JS.Camera) {
											camera = tmpCamera;
										}
									}
								});
								const scene = this.sceneList.first.getScene();
								this.effectList.forEach((composer) => {
									composer.setRenderer(renderer, camera, scene);
								});
							}
							this.subscribeListQuery(this.effectList, 'effectList', 'composer');
						}
						break;
					case 'viewer':
						this.unSubscribeReferList('viewerList');
						if (NgxThreeUtil.isNotNull(this.viewerList)) {
							this.viewerList.forEach((viewer) => {
								viewer.setRenderer(this.renderer);
							});
							this.subscribeListQuery(this.viewerList, 'viewerList', 'viewer');
						}
						break;
					case 'listener':
						this.unSubscribeReferList('listenerList');
						if (NgxThreeUtil.isNotNull(this.listenerList)) {
							this.listenerList.forEach((listener) => {
								this.renderlistener = listener.getListener();
							});
							this.subscribeListQuery(this.listenerList, 'listenerList', 'listener');
						}
						break;
					case 'audio':
						this.unSubscribeReferList('audioList');
						if (NgxThreeUtil.isNotNull(this.audioList)) {
							this.audioList.forEach((audio) => {
								audio.setListener(this.renderlistener, this);
							});
							this.subscribeListQuery(this.audioList, 'audioList', 'audio');
						}
						break;
					case 'controller':
						this.unSubscribeReferList('controllerList');
						if (NgxThreeUtil.isNotNull(this.controllerList)) {
							this.controllerList.forEach((controller) => {
								controller.setRenderer(this.renderer, this.sceneList, this.cameraList, this.canvas2dList);
							});
							this.subscribeListQuery(this.controllerList, 'controllerList', 'controller');
						}
						break;
					case 'canvas2d':
						this.unSubscribeReferList('canvas2dList');
						if (NgxThreeUtil.isNotNull(this.canvas2dList)) {
							this.canvas2dList.forEach((canvas2d) => {
								canvas2d.setParentNode(this.canvasEle.nativeElement);
							});
							this.subscribeListQuery(this.canvas2dList, 'canvas2dList', 'canvas2d');
						}
						break;
					case 'shared':
						this.unSubscribeReferList('sharedList');
						if (NgxThreeUtil.isNotNull(this.sharedList)) {
							this.sharedList.forEach((shared) => {
								shared.getShared();
							});
							this.subscribeListQuery(this.sharedList, 'sharedList', 'shared');
						}
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	/**
	 * The Renderer of renderer component
	 */
	public renderer: I3JS.Renderer = null;

	/**
	 * Css renderer of renderer component
	 */
	private cssRenderer: I3JS.CSS3DRenderer | I3JS.CSS2DRenderer | (I3JS.CSS3DRenderer | I3JS.CSS2DRenderer)[] = null;

	/**
	 * Renderer width of renderer component
	 */
	public rendererWidth: number = 1024;

	/**
	 * Renderer height of renderer component
	 */
	public rendererHeight: number = 768;

	/**
	 * The Stats of renderer component
	 */
	private stats: NgxThreeStats = null;

	/**
	 * The Gui of renderer component
	 */
	public gui: NgxThreeGui = null;

	/**
	 * The Clock of renderer component
	 */
	private clock: NgxThreeClock = null;

	/**
	 * The Controls of renderer component
	 */
	private controls: NgxControlComponent[] = null;

	/**
	 * Render control of renderer component
	 */
	private renderControl: NgxControlComponent = null;

	/**
	 * Gets Render controls
	 * @returns controls
	 */
	public getRenderControl(): NgxControlComponent {
		return this.renderControl;
	}

	/**
	 * Gets controls
	 * @param cameras
	 * @param scenes
	 * @param domElement
	 * @returns controls
	 */
	private getControls(
		cameras: QueryList<NgxCameraComponent>,
		scenes: QueryList<NgxSceneComponent>,
		domElement: HTMLElement
	): NgxControlComponent[] {
		let cameraComp: NgxCameraComponent = null;
		let controlType: string = this.controlType.toLowerCase();
		if (this.renderControl !== null) {
			this.renderControl.ngOnDestroy();
			this.renderControl = null;
		}
		if (cameras !== null && cameras.length > 0) {
			let cameraCompFounded: boolean = false;
			cameraComp = cameras.find((camera) => {
				if (camera.controlType.toLowerCase() !== 'none') {
					controlType = camera.controlType;
					cameraCompFounded = true;
					return true;
				} else if (!cameraCompFounded) {
					cameraCompFounded = true;
					return true;
				}
				return false;
			});
		}
		let controls: NgxControlComponent[] = [];
		if (cameraComp !== null && cameraComp !== undefined) {
			const camera: I3JS.Camera = cameraComp.getCamera();
			switch (controlType.toLowerCase()) {
				case 'none':
					break;
				default:
					if (controlType.length > 1) {
						const control = this.initLocalComponent('control', new NgxControlComponent());
						const controlOptions = this.controlOptions || {};
						controlOptions.lookatList = this.lookatList;
						control.updateInputParams(controlOptions, false, {}, controlType);
						control.setCameraDomElement(camera, domElement, scenes, this.renderer, this._renderCaller);
						controls.push(control);
						this.renderControl = control;
					}
					break;
			}
			if (this.controlList !== null && this.controlList !== undefined) {
				this.controlList.forEach((control) => {
					control.setCameraDomElement(camera, domElement, scenes, this.renderer, this._renderCaller);
					controls.push(control);
				});
			}
		}
		return controls;
	}

	/**
	 * Gets stats
	 * @returns stats
	 */
	private getStats(): NgxThreeStats {
		if (this.stats === null) {
			this.stats = NgxThreeUtil.getStats(
				NgxThreeUtil.getTypeSafe(this.statsStyle, {
					position: 'absolute',
					left: '0px',
					top: '0px',
				})
			);
			this.debugStatsEle.nativeElement.appendChild(this.stats.dom);
		}
		return this.stats;
	}

	/**
	 * Gets gui
	 * @returns gui
	 */
	private getGui(): NgxThreeGui {
		if (this.gui === null) {
			this.gui = new NgxThreeGui(
				NgxThreeUtil.getTypeSafe(this.guiStyle, {
					position: 'absolute',
					marginRight: '0px',
					right: '0px',
					top: '0px',
				})
			);
			this.debugControlsEle.nativeElement.appendChild(this.gui.domElement);
			this.gui.domElement.addEventListener('pointerdown', (e) => {
				e.stopPropagation();
			});
			this.gui.domElement.addEventListener('click', (e) => {
				e.stopPropagation();
			});
		}
		return this.gui;
	}

	/**
	 * Gets Object
	 * @returns Object
	 */
	public getObject<T>(): T {
		return this.getRenderer() as any;
	}

	/**
	 * Gets Renderer
	 * @returns Renderer
	 */
	public getRenderer(): I3JS.Renderer {
		if (NgxThreeUtil.isNull(this.renderer) || this._needUpdate) {
			this.needUpdate = false;
			this.dispose();
			if (this.renderer !== null) {
				this.renderer = null;
			}
			if (this.cssRenderer !== null) {
				this.cssRenderer = null;
			}
			this._renderCaller = () => {
				this.render();
			};
			switch (this.cssType.toLowerCase()) {
				case '3d,2d':
				case '2d,3d':
				case 'css3d,css2d':
				case 'css2d,css3d':
				case 'css3drenderer,css2drenderer':
				case 'css2drenderer,css3drenderer':
					this.cssRenderer = [];
					this.cssRenderer.push(new N3JS.CSS2DRenderer());
					this.cssRenderer.push(new N3JS.CSS3DRenderer());
					break;
				case '3d':
				case 'css3d':
				case 'css3drenderer':
					this.cssRenderer = new N3JS.CSS3DRenderer();
					break;
				case '2d':
				case 'css2d':
				case 'css2drenderer':
					this.cssRenderer = new N3JS.CSS2DRenderer();
					break;
				default:
					this.cssRenderer = null;
					break;
			}
			switch (this.type.toLowerCase()) {
				case 'svg':
				case 'svgrenderer':
					const svgRenderer = new N3JS.SVGRenderer();
					if (NgxThreeUtil.isNotNull(this.quality)) {
						svgRenderer.setQuality(NgxThreeUtil.getTypeSafe(this.quality, 'high').toLowerCase());
					}
					this.renderer = svgRenderer as any;
					break;
				case 'gl2':
				case 'webgl2':
				case 'webgl2renderer':
				case 'gl':
				case 'webgl':
				case 'webglrenderer':
				default:
					const webGLRenderer = new N3JS.WebGLRenderer({
						alpha: this.alpha,
						antialias: this.antialias,
						logarithmicDepthBuffer: this.logarithmicDepthBuffer,
						preserveDrawingBuffer: this.preserveDrawingBuffer,
					});
					webGLRenderer.xr.enabled = this.xrEnabled;
					this.renderer = webGLRenderer;
					break;
			}
			if (this.cssRenderer !== null) {
				if (Array.isArray(this.cssRenderer)) {
					this.cssRenderer.forEach((cssRenderer) => {
						cssRenderer.domElement.style.position = 'absolute';
						cssRenderer.domElement.style.top = '0px';
						cssRenderer.domElement.style.left = '0px';
						cssRenderer.domElement.style.pointerEvents = 'none';
						this.canvasEle.nativeElement.appendChild(cssRenderer.domElement);
					});
				} else {
					this.cssRenderer.domElement.style.position = 'absolute';
					this.cssRenderer.domElement.style.top = '0px';
					this.cssRenderer.domElement.style.left = '0px';
					this.cssRenderer.domElement.style.pointerEvents = 'none';
					this.canvasEle.nativeElement.appendChild(this.cssRenderer.domElement);
				}
			}
			this.renderer.domElement.style.position = 'relative';
			this.canvasEle.nativeElement.appendChild(this.renderer.domElement);
			NgxThreeUtil.setRenderer(this);
			(this.renderer as any)['userData'] = {};
			super.setObject(this.renderer);
			this.resizeRender();
			this._renderCaller();
		}
		return this.renderer;
	}

	/**
	 * Render caller of renderer component
	 */
	private _renderCaller: (...args: any[]) => void = null;

	/**
	 * The Cameras of renderer component
	 */
	private _cameras: I3JS.Camera[] = null;

	/**
	 * The Scenes of renderer component
	 */
	private _scenes: I3JS.Scene[] = null;

	/**
	 * Gets render info
	 * @param timer
	 * @returns render info
	 */
	public getRenderInfo(timer?: IRendererTimer): IRendererInfo {
		if (this._cameras === null) {
			this._cameras = [];
			this.cameraList.forEach((camera) => {
				this._cameras.push(camera.getObject3d());
			});
		}
		if (this._scenes === null) {
			this._scenes = [];
			this.sceneList.forEach((scene) => {
				this._scenes.push(scene.getScene());
			});
		}
		return {
			timer: timer,
			innerWidth: this.rendererWidth,
			innerHeight: this.rendererHeight,
			renderer: this.renderer,
			cssRenderer: this.cssRenderer,
			cameras: this._cameras,
			scenes: this._scenes,
		};
	}

	/**
	 * Determines whether paused is
	 */
	private _isPaused: boolean = false;

	/**
	 * Renders once
	 * @returns
	 */
	private _renderOnce() {
		if (this.renderer === null || this.renderer === undefined) {
			return;
		}
		if (this.stats !== null) {
			this.stats?.begin();
		}
		const renderTimer = this.clock.getTimer(this.renderer, this.events);
		if (this._tweenGroup !== null) {
			this._tweenGroup.update();
			// this._tweenGroup.update(renderTimer.elapsedTime * 1000);
		}
		this.events.direction.lerp(this.events.keyInfo.xy, renderTimer.delta / 3);
		this.onRender.emit(renderTimer);
		this.controllerList.forEach((controller) => {
			controller.update(renderTimer);
		});
		this.threeDirectiveList.forEach((object3d) => {
			object3d.update(renderTimer);
		});
		this.sceneList.forEach((scene) => {
			scene.update(renderTimer);
		});
		NgxThreeUtil.render(renderTimer);
		if (this.controls !== null) {
			this.controls.forEach((control) => {
				control.render(renderTimer);
			});
		}
		if (NgxThreeUtil.isNull(this.beforeRender) || !this.beforeRender(this.getRenderInfo(renderTimer))) {
			// if (this.effectList.length > 0 && this.renderer instanceof THREE.WebGLRenderer && this.panSpeed ) {
			this._updateSubject.next(renderTimer);
			if (this.composerEnable && this.effectList.length > 0 && this.renderer instanceof N3JS.WebGLRenderer) {
				this.effectList.forEach((composer) => {
					composer.render(this.renderer as I3JS.WebGLRenderer, renderTimer);
				});
			} else if (this.cameraList && this.cameraList.length > 0) {
				this.cameraList.forEach((camera) => {
					camera.render(this.renderer, this.cssRenderer, this.scene || this.sceneList, renderTimer);
				});
			} else if (NgxThreeUtil.isNotNull(this.camera)) {
				this.camera.render(this.renderer, this.cssRenderer, this.scene || this.sceneList, renderTimer);
			}
			this.viewerList.forEach((viewer) => {
				viewer.render(this.renderer, this.scene || this.sceneList, this.camera || this.cameraList, renderTimer);
			});
		}
		if (NgxThreeUtil.isNotNull(this.afterRender)) {
			this.afterRender(this.getRenderInfo(renderTimer));
		}
		if (this.stats !== null) {
			this.stats.end();
		}
	}

	/**
	 * Renders renderer component
	 * @returns
	 */
	public render() {
		if (this.renderer === null) {
			return;
		}
		if (!this._isPaused) {
			this._renderOnce();
		}
		requestAnimationFrame(this._renderCaller);
	}

	/**
	 * Hosts listener
	 */
	@HostListener('window:resize')
	public resizeRender() {
		if (typeof this.width === 'string' || typeof this.height === 'string' || this.width <= 0 || this.height <= 0) {
			if (this.sizeType === 'auto') {
				this.setSize(this.rendererEle.nativeElement.clientWidth, this.rendererEle.nativeElement.clientHeight);
			} else {
				this.setSize(window.innerWidth, window.innerHeight);
			}
		} else {
			this.setSize(this.width, this.height);
		}
	}

	/**
	 * Gets canvas json
	 * @param callback
	 * @param [options]
	 */
	public getCanvasJson(
		callback: (json: any) => void,
		options?: { width?: number; height?: number; name?: string; type?: string }
	) {
		if (
			this.renderer !== null &&
			this.renderer.domElement !== null &&
			NgxThreeUtil.isNotNull(this.renderer.domElement.toDataURL)
		) {
			this._isPaused = true;
			this._renderOnce();
			options = options || {};
			let imageType = NgxThreeUtil.getTypeSafe(options.type, 'png');
			let contentType = 'image/png';
			switch (imageType.toLowerCase()) {
				case 'jpg':
				case 'jpeg':
					contentType = 'image/jpeg';
					break;
				case 'png':
				default:
					imageType = 'png';
					contentType = 'image/png';
					break;
			}
			let imageName = NgxThreeUtil.getTypeSafe(options.name, 'auto');
			if (imageName == '' || imageName == 'auto') {
				imageName = window.location.hash.substr(window.location.hash.lastIndexOf('/') + 1);
			}
			const resultJson = {
				content: '',
				contentType: contentType,
				size: 0,
				name: imageName + '.' + imageType,
			};
			if (
				NgxThreeUtil.isNotNull(options.width) &&
				NgxThreeUtil.isNotNull(options.height) &&
				options.width > 0 &&
				options.height > 0
			) {
				const canvas: HTMLCanvasElement = document.createElement('canvas');
				canvas.width = options.width;
				canvas.height = options.height;
				const context = canvas.getContext('2d', {
					alpha: true,
				});
				const canvasImage: HTMLImageElement = document.createElement('img');
				canvasImage.src = this.renderer.domElement.toDataURL('png');
				canvasImage.addEventListener(
					'load',
					() => {
						let sx: number = 0;
						let sy: number = 0;
						let sw: number = 0;
						let sh: number = 0;
						const canvasImageRate = canvasImage.naturalWidth / canvasImage.naturalHeight;
						const thumbRate = options.width / options.height;
						if (canvasImageRate > thumbRate) {
							sw = canvasImage.naturalHeight * thumbRate;
							sh = canvasImage.naturalHeight;
							sx = (canvasImage.naturalWidth - sw) / 2;
						} else {
							sh = canvasImage.naturalWidth / thumbRate;
							sw = canvasImage.naturalWidth;
							sy = (canvasImage.naturalHeight - sh) / 2;
						}
						let dx: number = 0;
						let dy: number = 0;
						let dw: number = options.width;
						let dh: number = options.height;
						context.drawImage(canvasImage, sx, sy, sw, sh, dx, dy, dw, dh);
						resultJson.content = canvas.toDataURL(imageType);
						if (NgxThreeUtil.isNotNull(options.name)) {
							this.getDownloadFile(resultJson);
						} else {
							const blob = this.dataURLtoBlob(resultJson.content);
							resultJson.size = blob.size;
						}
						this._isPaused = false;
						callback(resultJson);
					},
					{ passive: true }
				);
				canvasImage.addEventListener(
					'error',
					() => {
						this._isPaused = false;
					},
					{ passive: true }
				);
			} else {
				resultJson.content = this.renderer.domElement.toDataURL(imageType);
				if (NgxThreeUtil.isNotNull(options.name)) {
					this.getDownloadFile(resultJson);
				} else {
					const blob = this.dataURLtoBlob(resultJson.content);
					resultJson.size = blob.size;
				}
				this._isPaused = false;
				callback(resultJson);
			}
		}
	}

	/**
	 * Gets download file
	 * @param result
	 */
	private getDownloadFile(result: any) {
		if (result && result.content !== null && result.content !== '') {
			const blob = this.dataURLtoBlob(result.content);
			result.size = blob.size;
			var tempUrl = window.URL.createObjectURL(blob);
			let link = document.createElement('a');
			link.setAttribute('download', result.name);
			link.setAttribute('href', tempUrl);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}

	/**
	 * 서버로 부터 파일 다운 받기 - Blob
	 *
	 * @param dataUrl {{ string }}
	 *
	 * @returns {{Blob}}
	 */
	private dataURLtoBlob(dataUrl: string): Blob {
		let arr = dataUrl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	}

	/**
	 * Changes auto size
	 */
	public changeAutoSize() {}

	/**
	 * Resizes canvas
	 * @param width
	 * @param height
	 */
	public resizeCanvas(width: number, height: number) {
		if (width <= 0 || height <= 0) {
			this.width = 0;
			this.height = 0;
			this.sizeType = 'auto';
			this.resizeRender();
		} else {
			this.width = width;
			this.height = height;
			this.setSize(this.width, this.height);
		}
	}
}
