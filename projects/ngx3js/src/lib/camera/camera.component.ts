import {
	Component,
	EventEmitter,
	forwardRef,
	Input,
	OnInit,
	Output,
	QueryList,
	SimpleChanges,
} from '@angular/core';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import {
	I3JS,
	RendererTimer,
	THREE,
	ThreeColor,
	ThreeUtil,
} from './../interface';
import { LocalStorageService } from './../local-storage.service';
import * as THREE_CAMERA from './cameras/three-cameras';

/**
 * The Camera component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CameraComponent) page for details.
 * See the [ngx camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_camera) page for a live demo.
 *
 * Abstract base class for cameras. This class should always be inherited when you build a new camera.
 *
 * ```html
 * <ngx3js-camera
 * 	[type]="'perspective'" [fov]="45" [near]="0.1" [far]="200"
 * ></ngx3js-camera>
 * <ngx3js-camera
 * 	[type]="'OrthographicCamera'" [orthoSize]="500" [fov]="45 "
 * 	[near]="1" [far]="1000"
 * ></ngx3js-camera>
 * <ngx3js-camera
 * 	[type]="'cube'" [fov]="40" [near]="1" [far]="1000"
 * ></ngx3js-camera>
 * <ngx3js-camera
 * 	[type]="'CubePingPong'" [near]="1" [far]="1000"
 * ></ngx3js-camera>
 * <ngx3js-camera
 * 	[type]="'Cinematic'" [fov]="60" [near]="1" [far]="1000"
 * ></ngx3js-camera>
 * ```
 * @see THREE.Camera
 */
@Component({
	selector: 'ngx3js-camera',
	templateUrl: './camera.component.html',
	styleUrls: ['./camera.component.scss'],
	providers: [
		{
			provide: AbstractObject3dComponent,
			useExisting: forwardRef(() => CameraComponent),
		},
		{
			provide: AbstractSubscribeComponent,
			useExisting: forwardRef(() => CameraComponent),
		},
	],
})
export class CameraComponent
	extends AbstractObject3dComponent
	implements OnInit
{
	/**
	 * The type of camera
	 *
	 * PingPong - When use "PingPongCamera", the camera muse be located in scene
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.PerspectiveCamera - PerspectiveCamera, Perspective
	 * @see THREE.ArrayCamera       - ArrayCamera, Array
	 * @see THREE.CubeCamera        - CubeCamera, Cube, CubePingPong
	 * @see THREE.CubeCamera        - PingPong, CubePingPong, CubePingPongCamera, PingPongCamera
	 * @see THREE.OrthographicCamera - OrthographicCamera, Orthographic
	 * @see THREE.StereoCamera      - StereoCamera, Stereo
	 */
	@Input() public type: string = 'perspective';

	/**
	 * The camera is active.
	 */
	@Input() public active: boolean = true;

	/**
	 * Camera frustum vertical field of view, from bottom to top of view, in degrees. Default is *50*.
	 */
	@Input() public fov: number | string = 50;

	/**
	 * Camera frustum aspect ratio, usually the canvas width / canvas height. Default is *1* (square canvas).
	 */
	@Input() public aspect: number = 1;

	/**
	 * Sets the FOV by focal length in respect to the current [.filmGauge](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/cameras/PerspectiveCamera.filmGauge).
	 * By default, the focal length is specified for a 35mm (full frame) camera.
	 */
	@Input() public focalLength: number = null;

	/**
	 * Camera frustum near plane. Default is *0.1*.
	 * The valid range is between 0 and the current value of the [Camera.far](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/cameras/Camera.far) plane.
	 * Note that, unlike for the [PerspectiveCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/cameras/PerspectiveCamera), *0* is a valid value for an
	 * OrthographicCamera's near plane.
	 */
	@Input() public near: number | string = null;

	/**
	 * Camera frustum far plane. Default is *2000*.
	 * Must be greater than the current value of [Camera.near](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/cameras/Camera.near) plane.
	 */
	@Input() public far: number | string = null;

	/**
	 * The orthoSize of camera component
	 */
	@Input() public orthoSize: number = 400;

	/**
	 * Camera frustum left plane.
	 */
	@Input() public left: number = null;

	/**
	 * Camera frustum right plane.
	 */
	@Input() public right: number = null;

	/**
	 * Camera frustum top plane.
	 */
	@Input() public top: number = null;

	/**
	 * Camera frustum bottom plane.
	 */
	@Input() public bottom: number = null;

	/**
	 * Gets or sets the zoom factor of the camera. Default is *1*.
	 */
	@Input() public zoom: number | string = null;

	/**
	 * Defines whether the renderer should automatically clear its output before rendering a frame.
	 */
	@Input() public autoClear: boolean = null;

	/**
	 * The controlType of camera component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public controlType: string = 'none';

	/**
	 * The autoRotate of camera component
	 */
	@Input() public autoRotate: boolean = null;

	/**
	 * The given scene
	 */
	@Input() public scene: any = null;

	/**
	 * The given scene
	 */
	@Input() public scenes: any[] = null;

	/**
	 * The storageName of camera
	 */
	@Input() public storageName: string = null;

	/**
	 * The viewport of this render target.
	 */
	@Input() public viewport: boolean = false;

	/**
	 * The viewport of this render target.
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.WebGLRenderer#setViewport - renderer
	 * @see THREE.PerspectiveCamera#setViewOffset - viewoffset, offset
	 * @see THREE.OrthographicCamera#setViewOffset - viewoffset, offset
	 * @see THREE.PerspectiveCamera - #viewport - camera
	 *
	 */

	@Input() public viewportType: string = 'renderer';

	/**
	 * The viewport of this render target.
	 * Vector4.x
	 */
	@Input() public x: number | string = 0;

	/**
	 * The viewport of this render target.
	 * Vector4.y
	 */
	@Input() public y: number | string = 0;

	/**
	 * The size of width
	 * - type number
	 *  fixed size
	 * - type string with include %
	 *  relative size from renderer size
	 *  for example
	 *    in case renderer = 1024
	 *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
	 * - type string const refer
	 *   width,height,x,y,
	 */
	@Input() public width: number | string = '100%';

	/**
	 * The size of height
	 * - type number
	 *  fixed size
	 * - type string with include %
	 *  relative size from renderer size
	 *  for example
	 *    in case renderer = 1024
	 *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
	 * - type string const refer
	 *   width,height,x,y,
	 */
	@Input() public height: number | string = '100%';

	/**
	 * Clear the color buffer. Equivalent to calling [.clear](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer.clear)( true, false, false ).
	 */
	@Input() public clearColor: ThreeColor = null;

	/**
	 * The clearAlpha of camera component
	 */
	@Input() public clearAlpha: number = null;

	/**
	 * Clear the depth buffer. Equivalent to calling [.clear](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer.clear)( false, true, false ).
	 */
	@Input() public clearDepth: boolean = null;

	/**
	 * Tells the renderer to clear its color, depth or stencil drawing buffer(s).
	 * This method initializes the color buffer to the current clear color value.
	 * Arguments default to *true*.
	 */
	@Input() public clear: boolean = null;

	/**
	 * Indicates whether the scissor test is active or not.
	 */
	@Input() public scissorTest: boolean = false;

	/**
	 * A rectangular area inside the render target's viewport. Fragments that are outside the area will be discarded.
	 * Vector4.x
	 */
	@Input() public scissorX: number | string = 0;

	/**
	 * A rectangular area inside the render target's viewport. Fragments that are outside the area will be discarded.
	 * Vector4.y
	 */
	@Input() public scissorY: number | string = 0;

	/**
	 * A rectangular area inside the render target's viewport. Fragments that are outside the area will be discarded.
	 * Vector4.width
	 */
	@Input() public scissorWidth: number | string = '100%';

	/**
	 * A rectangular area inside the render target's viewport. Fragments that are outside the area will be discarded.
	 * Vector4.height
	 */
	@Input() public scissorHeight: number | string = '100%';

	/**
	 * The referObject3d of camera component
	 */
	@Input() public referObject3d: AbstractObject3dComponent | I3JS.IObject3D =
		null;

	/**
	 * The Output of renderer component
	 */
	@Output() private onRender: EventEmitter<RendererTimer> =
		new EventEmitter<RendererTimer>();

	/**
	 * Creates an instance of camera component.
	 * @param localStorageService
	 */
	constructor(private localStorageService: LocalStorageService) {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('camera');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
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
		if (changes && this.camera) {
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
	 * Camera frustum vertical field of view, from bottom to top of view, in degrees. Default is *50*.
	 *
	 * @param [def]
	 * @returns fov
	 */
	private getFov(def?: number | string): number {
		const fov = ThreeUtil.getTypeSafe(this.fov, def);
		if (typeof fov === 'string') {
			return parseFloat(fov);
		} else {
			return fov;
		}
	}

	/**
	 * Camera frustum near plane. Default is *0.1*.
	 * The valid range is between 0 and the current value of the [Camera.far](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/cameras/Camera.far) plane.
	 * Note that, unlike for the [PerspectiveCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/cameras/PerspectiveCamera), *0* is a valid value for an
	 * OrthographicCamera's near plane.
	 *
	 * @param [def]
	 * @returns near
	 */
	private getNear(def?: number | string): number {
		const near = ThreeUtil.getTypeSafe(this.near, def);
		if (typeof near === 'string') {
			return parseFloat(near);
		} else {
			return near;
		}
	}

	/**
	 * Camera frustum far plane. Default is *2000*.
	 * Must be greater than the current value of [Camera.near](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/cameras/Camera.near) plane.
	 *
	 * @param [def]
	 * @returns far
	 */
	private getFar(def?: number | string): number {
		const far = ThreeUtil.getTypeSafe(this.far, def);
		if (typeof far === 'string') {
			return parseFloat(far);
		} else {
			return far;
		}
	}

	/**
	 * Camera frustum left plane.
	 * @param [width]
	 * @returns left
	 */
	private getLeft(aspect: number): number {
		return (this.orthoSize / 2) * aspect * ThreeUtil.getTypeSafe(this.left, -1);
	}

	/**
	 * Camera frustum right plane.
	 * @param [width]
	 * @returns right
	 */
	private getRight(aspect?: number): number {
		return (this.orthoSize / 2) * aspect * ThreeUtil.getTypeSafe(this.right, 1);
	}

	/**
	 * Camera frustum top plane.
	 * @param [top]
	 * @returns top
	 */
	private getTop(): number {
		return (this.orthoSize / 2) * ThreeUtil.getTypeSafe(this.top, 1);
	}

	/**
	 * Camera frustum bottom plane.
	 * @param [bottom]
	 * @returns bottom
	 */
	private getBottom(): number {
		return (this.orthoSize / 2) * ThreeUtil.getTypeSafe(this.bottom, -1);
	}

	/**
	 * Gets zoom
	 * @param [def]
	 * @returns zoom
	 */
	private getZoom(def?: number | string): number {
		const zoom = ThreeUtil.getTypeSafe(this.zoom, def, 1);
		if (typeof zoom === 'number') {
			return zoom;
		} else {
			switch (this.type.toLowerCase()) {
				case 'orthographiccamera':
				case 'orthographic':
				case 'ortho':
					switch (zoom.toLowerCase()) {
						case 'auto':
							const fov = THREE.MathUtils.degToRad(this.getFov(50));
							const hyperfocus = (this.getNear(-200) + this.getFar(2000)) / 2;
							const _height = 2 * Math.tan(fov / 2) * hyperfocus;
							return this.getHeight() / _height;
					}
					break;
			}
		}
		return 1;
	}

	/**
	 * Camera frustum aspect ratio, usually the canvas width / canvas height. Default is *1* (square canvas).
	 *
	 * @param [width]
	 * @param [height]
	 * @returns aspect
	 */
	private getAspect(width?: number, height?: number): number {
		if (this.viewport) {
			const cWidth = this.getWidth();
			const cHeight = this.getHeight();
			return cWidth / cHeight;
		} else {
			return width > 0 && height > 0 ? (width / height) * this.aspect : 0.5;
		}
	}

	/**
	 * Gets x
	 * @param [def]
	 * @returns x
	 */
	private getX(def?: number | string): number {
		switch (this.viewportType.toLowerCase()) {
			case 'viewoffset':
			case 'offset':
				const offsetX = this.getViewPortSize(this.x, this.fullWidth, def);
				if (offsetX < 0) {
					return this.fullWidth - this.getWidth() + offsetX;
				} else {
					return offsetX;
				}
			default:
				const x = this.getViewPortSize(this.x, this.rendererWidth, def);
				if (x < 0) {
					return this.rendererWidth - this.getWidth() + x;
				} else {
					return x;
				}
		}
	}

	/**
	 * Gets y
	 * @param [def]
	 * @returns y
	 */
	private getY(def?: number | string): number {
		switch (this.viewportType.toLowerCase()) {
			case 'viewoffset':
			case 'offset':
				const offsetY = this.getViewPortSize(this.y, this.fullHeight, def);
				if (offsetY < 0) {
					return this.fullHeight - this.getHeight() + offsetY;
				} else {
					return offsetY;
				}
			default:
				const y = this.getViewPortSize(this.y, this.rendererHeight, def);
				if (y < 0) {
					return this.rendererHeight - this.getHeight() + y;
				} else {
					return y;
				}
		}
	}

	/**
	 * Gets width
	 * @param [def]
	 * @returns width
	 */
	private getWidth(def?: number | string): number {
		return this.getViewPortSize(this.width, this.rendererWidth, def);
	}

	/**
	 * Gets height
	 * @param [def]
	 * @returns height
	 */
	private getHeight(def?: number | string): number {
		return this.getViewPortSize(this.height, this.rendererHeight, def);
	}

	/**
	 * Gets scissor x
	 * @param [def]
	 * @returns scissor x
	 */
	private getScissorX(def?: number | string): number {
		return this.getViewPortSize(this.scissorX, this.rendererWidth, def);
	}

	/**
	 * Gets scissor y
	 * @param [def]
	 * @returns scissor y
	 */
	private getScissorY(def?: number | string): number {
		return this.getViewPortSize(this.scissorY, this.rendererHeight, def);
	}

	/**
	 * Gets scissor width
	 * @param [def]
	 * @returns scissor width
	 */
	private getScissorWidth(def?: number | string): number {
		return this.getViewPortSize(this.scissorWidth, this.rendererWidth, def);
	}

	/**
	 * Gets scissor height
	 * @param [def]
	 * @returns scissor height
	 */
	private getScissorHeight(def?: number | string): number {
		return this.getViewPortSize(this.scissorHeight, this.rendererHeight, def);
	}

	/**
	 * Gets view port size
	 * @param size
	 * @param cameraSize
	 * @param [def]
	 * @returns view port size
	 */
	private getViewPortSize(
		size: number | string,
		cameraSize: number,
		def?: number | string
	): number {
		const baseSize = ThreeUtil.getTypeSafe(size, def);
		if (ThreeUtil.isNotNull(baseSize)) {
			if (typeof baseSize == 'string') {
				if (baseSize.indexOf('%') > 0) {
					const [percent, extra] = baseSize.split('%');
					const viewSize = Math.ceil((cameraSize * parseFloat(percent)) / 100);
					if (extra === '') {
						return viewSize;
					} else {
						return viewSize + parseInt(extra);
					}
				} else {
					switch (baseSize) {
						case 'x':
							return this.getX(def);
						case 'y':
							return this.getY(def);
						case 'width':
							return this.getWidth(def);
						case 'height':
							return this.getHeight(def);
						case 'scissorx':
						case 'scissorX':
							return this.getScissorX(def);
						case 'scissory':
						case 'scissorY':
							return this.getScissorY(def);
						case 'scissorwidth':
						case 'scissorWidth':
							return this.getScissorWidth(def);
						case 'scissorheight':
						case 'scissorHeight':
							return this.getScissorHeight(def);
						default:
							return parseFloat(baseSize);
					}
				}
			} else {
				return baseSize;
			}
		}
		return 0;
	}

	/**
	 * Gets clear color
	 * @param [def]
	 * @returns clear color
	 */
	private getClearColor(def?: string | number): I3JS.IColor {
		return ThreeUtil.getColorSafe(this.clearColor, def);
	}

	/**
	 * Gets clear alpha
	 * @param [def]
	 * @returns clear alpha
	 */
	private getClearAlpha(def?: number): number {
		return ThreeUtil.getTypeSafe(this.clearAlpha, def);
	}

	/**
	 * The Camera of camera component
	 */
	private camera: I3JS.ICamera | I3JS.IObject3D = null;

	/**
	 * The Camera of camera component
	 */
	private cameraExtra: I3JS.ICubeCamera[] = null;

	/**
	 * The Renderer of camera component
	 */
	private renderer: I3JS.IRenderer = null;

	/**
	 * Css renderer of camera component
	 */
	private cssRenderer:
		| I3JS.ICSS3DRenderer
		| I3JS.ICSS2DRenderer
		| (I3JS.ICSS3DRenderer | I3JS.ICSS2DRenderer)[] = null;

	/**
	 * Renderer scenes of camera component
	 */
	private rendererScenes: QueryList<any> = null;

	/**
	 * Gets renderer
	 * @returns renderer
	 */
	public getRenderer(): I3JS.IRenderer {
		return this.renderer;
	}

	/**
	 * Sets renderer
	 * @param renderer
	 * @param cssRenderer
	 * @param rendererScenes
	 */
	public setRenderer(
		renderer: I3JS.IRenderer,
		cssRenderer:
			| I3JS.ICSS3DRenderer
			| I3JS.ICSS2DRenderer
			| (I3JS.ICSS3DRenderer | I3JS.ICSS2DRenderer)[],
		rendererScenes: QueryList<any>
	) {
		if (this.cssRenderer !== cssRenderer) {
			this.cssRenderer = cssRenderer;
		}
		if (this.renderer !== renderer) {
			this.renderer = renderer;
			this.rendererScenes = rendererScenes;
		}
		this.getObject3d();
	}

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: I3JS.IObject3D): boolean {
		if (super.setParent(parent)) {
			this.getCamera();
			return true;
		}
		return false;
	}

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	public applyChanges3d(changes: string[]) {
		if (this.camera !== null) {
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getObject3d();
				return;
			}
			if (
				!ThreeUtil.isOnlyIndexOf(
					changes,
					[
						'rigidbody',
						'mesh',
						'geometry',
						'material',
						'svg',
						'listener',
						'audio',
						'helper',
						'light',
						'scissortest',
						'scissorx',
						'scissory',
						'scissorwidth',
						'scissorheight',
						'viewport',
						'viewporttype',
						'x',
						'y',
						'width',
						'height',
						'near',
						'far',
						'aspect',
						'fov',
						'orthosize',
						'left',
						'right',
						'top',
						'bottom',
					],
					this.OBJECT3D_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, ['viewport']);
			}
			if (
				ThreeUtil.isIndexOf(changes, [
					'x',
					'y',
					'width',
					'height',
					'viewporttype',
				])
			) {
				changes = ThreeUtil.pushUniq(changes, ['viewport']);
			}
			if (
				ThreeUtil.isIndexOf(changes, [
					'near',
					'far',
					'aspect',
					'fov',
					'orthosize',
					'left',
					'right',
					'top',
					'bottom',
				])
			) {
				changes = ThreeUtil.pushUniq(changes, ['changesize']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'viewport':
						if (this.viewport) {
							switch (this.viewportType.toLowerCase()) {
								case 'viewoffset':
								case 'offset':
									if (
										this.camera instanceof THREE.PerspectiveCamera ||
										this.camera instanceof THREE.OrthographicCamera
									) {
										this.camera.setViewOffset(
											this.fullWidth,
											this.fullHeight,
											this.getX(),
											this.getY(),
											this.getWidth(),
											this.getHeight()
										);
									}
									break;
								case 'viewport':
								case 'camera':
									if (this.camera instanceof THREE.PerspectiveCamera) {
										(this.camera as any)['viewport']
											.set(
												this.getX(),
												this.getY(),
												this.getWidth(),
												this.getHeight()
											)
											.multiplyScalar(this.pixelRatio);
									}
									break;
								default:
									if (
										this.camera instanceof THREE.PerspectiveCamera ||
										this.camera instanceof THREE.OrthographicCamera
									) {
										this.camera.clearViewOffset();
									}
									break;
							}
						} else {
							if (
								this.camera instanceof THREE.PerspectiveCamera ||
								this.camera instanceof THREE.OrthographicCamera
							) {
								this.camera.clearViewOffset();
							}
							if (
								this.renderer !== null &&
								this.renderer instanceof THREE.WebGLRenderer
							) {
								this.renderer.setViewport(
									0,
									0,
									this.rendererWidth,
									this.rendererHeight
								);
							}
						}
						break;
					case 'changesize':
						this.setRendererSize(
							this.rendererWidth,
							this.rendererHeight,
							this.fullWidth,
							this.fullHeight,
							this.pixelRatio
						);
						break;
				}
			});
			super.applyChanges3d(changes);
		}
	}

	/**
	 * Camera width of camera component
	 */
	private rendererWidth: number = 1024;

	/**
	 * Camera height of camera component
	 */
	private rendererHeight: number = 1024;

	/**
	 * full width of camera component
	 */
	private fullWidth: number = 1024;

	/**
	 * full height of camera component
	 */
	private fullHeight: number = 1024;

	/**
	 * pixelRatio of camera component
	 */
	private pixelRatio: number = 1;

	/**
	 * Gets size
	 * @returns size
	 */
	public getSize(): I3JS.IVector2 {
		return new THREE.Vector2(this.rendererWidth, this.rendererHeight);
	}

	/**
	 * The Raycaster of camera component
	 */
	private raycaster: I3JS.IRaycaster = null;

	/**
	 * Gets raycaster
	 * @param [mouse]
	 * @returns raycaster
	 */
	public getRaycaster(mouse: I3JS.IVector2 = null): I3JS.IRaycaster {
		if (this.raycaster === null) {
			this.raycaster = new THREE.Raycaster();
		}
		if (mouse !== null) {
			this.raycaster.setFromCamera(mouse, this.getCamera());
		}
		return this.raycaster;
	}

	/**
	 * Gets intersections
	 * @param mouse
	 * @param mesh
	 * @param [recursive]
	 * @returns intersections
	 */
	public getIntersections(
		mouse: I3JS.IVector2,
		mesh: I3JS.IObject3D | I3JS.IObject3D[],
		recursive: boolean = false
	): I3JS.IIntersection[] {
		const raycaster = this.getRaycaster(mouse);
		if (mesh instanceof THREE.Object3D) {
			return raycaster.intersectObject(mesh, recursive);
		} else if (Array.isArray(mesh)) {
			return raycaster.intersectObjects(mesh, recursive);
		} else {
			return [];
		}
	}

	/**
	 * Gets intersection
	 * @param mouse
	 * @param mesh
	 * @param [recursive]
	 * @returns intersection
	 */
	public getIntersection(
		mouse: I3JS.IVector2,
		mesh: I3JS.IObject3D | I3JS.IObject3D[],
		recursive: boolean = false
	): I3JS.IIntersection {
		const intersects = this.getIntersections(mouse, mesh, recursive);
		if (intersects !== null && intersects.length > 0) {
			return intersects[0];
		} else {
			return null;
		}
	}

	/**
	 * Sets camera size
	 * @param width
	 * @param height
	 * @param fullWidth
	 * @param fullHeight
	 */
	public setRendererSize(
		width: number,
		height: number,
		fullWidth: number,
		fullHeight: number,
		pixelRatio: number = 1
	) {
		this.fullWidth = fullWidth;
		this.fullHeight = fullHeight;
		this.pixelRatio = pixelRatio;
		if (this.isCameraChild) {
			this.rendererWidth = width;
			this.rendererHeight = height;
		} else {
			this.rendererWidth = width;
			this.rendererHeight = height;
		}
		if (this.camera !== null) {
			if (
				this.camera instanceof THREE.OrthographicCamera ||
				this.camera instanceof THREE.PerspectiveCamera
			) {
				this.camera.near = this.getNear(0.1);
				this.camera.far = this.getFar(2000);
				if (this.camera instanceof THREE.OrthographicCamera) {
					const aspect = width / height;
					this.camera.left = this.getLeft(aspect);
					this.camera.right = this.getRight(aspect);
					this.camera.top = this.getTop();
					this.camera.bottom = this.getBottom();
				} else if (this.camera instanceof THREE.PerspectiveCamera) {
					this.camera.fov = this.getFov(50);
					this.camera.aspect = this.getAspect(width, height);
				}
				this.camera.updateProjectionMatrix();
			}
			this.applyChanges(['viewport']);
			this.camera.dispatchEvent({
				type: 'change',
				width: width,
				height: height,
			});
		}
		this.setSubscribeNext('size');
	}

	/**
	 * Determines whether camera child is
	 */
	private isCameraChild: boolean = false;

	/**
	 * Gets cube render target
	 * @returns cube render target
	 */
	public getCubeRenderTarget(): I3JS.IWebGLCubeRenderTarget {
		if (this.camera === null) {
			this.getObject3d();
		}
		if (this.camera instanceof THREE.CubeCamera) {
			return this.camera.renderTarget;
		}
		return undefined;
	}

	/**
	 * Gets texture
	 * @returns texture
	 */
	public getTexture(): I3JS.IWebGLCubeRenderTarget {
		return this.getCubeRenderTarget();
	}

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T extends I3JS.ICamera | I3JS.IObject3D>(): T {
		return this.getCamera() as any;
	}

	/**
	 * Gets camera
	 * @template T
	 * @returns camera
	 */
	public getCamera<T extends I3JS.ICamera | I3JS.IObject3D>(): T {
		if (this.camera === null || this._needUpdate) {
			this.needUpdate = false;
			this.cameraExtra = null;
			const width = this.rendererWidth;
			const height = this.rendererHeight;
			switch (this.type.toLowerCase()) {
				case 'arraycamera':
				case 'array':
					this.camera = new THREE.ArrayCamera();
					break;
				case 'stereocamera':
				case 'stereo':
					this.camera = new THREE.StereoCamera();
					break;
				case 'cubecamera':
				case 'cube':
					this.camera = new THREE.CubeCamera(
						this.getNear(0.1),
						this.getFar(2000),
						new THREE.WebGLCubeRenderTarget(512, {
							encoding: THREE.sRGBEncoding,
							format: THREE.RGBFormat,
							generateMipmaps: true,
							minFilter: THREE.LinearMipmapLinearFilter,
						})
					);
					break;
				case 'cubepingpongcamera':
				case 'cubepingpong':
				case 'pingpongcamera':
				case 'pingpong':
					const webGLCubeRenderTarget1 = new THREE.WebGLCubeRenderTarget(512, {
						encoding: THREE.sRGBEncoding,
						format: THREE.RGBFormat,
						generateMipmaps: true,
						minFilter: THREE.LinearMipmapLinearFilter,
					});
					const cubeCamera1 = new THREE.CubeCamera(
						this.getNear(0.1),
						this.getFar(2000),
						webGLCubeRenderTarget1
					);
					const webGLCubeRenderTarget2 = new THREE.WebGLCubeRenderTarget(512, {
						encoding: THREE.sRGBEncoding,
						format: THREE.RGBFormat,
						generateMipmaps: true,
						minFilter: THREE.LinearMipmapLinearFilter,
					});
					const cubeCamera2 = new THREE.CubeCamera(
						this.getNear(0.1),
						this.getFar(2000),
						webGLCubeRenderTarget2
					);
					this.camera = new THREE.Group();
					this.camera.add(cubeCamera1, cubeCamera2);
					this.cameraExtra = [];
					this.cameraExtra.push(cubeCamera1, cubeCamera2);
					break;
				case 'cinematic':
					this.camera = new THREE_CAMERA.NgxCinematicCamera(
						this.getFov(50),
						this.getAspect(width, height),
						this.getNear(0.1),
						this.getFar(2000)
					) as any;
					break;
				case 'orthographiccamera':
				case 'orthographic':
				case 'ortho':
					const aspect = width / height;
					const orthographicCamera = new THREE.OrthographicCamera(
						this.getLeft(aspect),
						this.getRight(aspect),
						this.getTop(),
						this.getBottom(),
						this.getNear(0.1),
						this.getFar(2000)
					);
					if (ThreeUtil.isNotNull(this.zoom)) {
						orthographicCamera.zoom = this.getZoom(1);
					}
					this.camera = orthographicCamera;
					break;
				case 'perspectivecamera':
				case 'perspective':
				default:
					const perspectiveCamera: any = new THREE_CAMERA.NgxPerspectiveCamera(
						this.getFov(50),
						this.getAspect(width, height),
						this.getNear(0.1),
						this.getFar(2000)
					);
					if (ThreeUtil.isNotNull(this.focalLength)) {
						perspectiveCamera.setFocalLength(
							ThreeUtil.getTypeSafe(this.focalLength, 35)
						);
					}
					if (this.viewport) {
						switch (this.viewportType.toLowerCase()) {
							case 'viewport':
							case 'camera':
								perspectiveCamera['viewport'] = new THREE.Vector4(
									this.getX(),
									this.getY(),
									this.getWidth(),
									this.getHeight()
								).multiplyScalar(this.pixelRatio);
								break;
						}
					}
					this.camera = perspectiveCamera;
					break;
			}
			if (this.parentObject3d instanceof THREE.ArrayCamera) {
				this.isCameraChild = true;
				this.parentObject3d.cameras.push(
					this.camera as I3JS.IPerspectiveCamera
				);
				this.object3d = this.camera as any;
				this.setObject(this.camera);
			} else {
				this.isCameraChild = false;
				this.setObject3d(this.camera as any);
			}
			this.setUserData('clips', null);
			if (ThreeUtil.isNotNull(this.storageName)) {
				this.localStorageService.getObject(
					this.storageName,
					(_: I3JS.IObject3D, clips?: I3JS.IAnimationClip[]) => {
						this.setUserData('clips', clips);
						this.setSubscribeNext('loaded');
					},
					{ object: this.camera }
				);
			}
			this.setSubscribeNext('changecamera');
		}
		return this.camera as T;
	}

	/**
	 * Gets scene
	 * @param [scenes]
	 * @returns scene
	 */
	public getScene(scenes?: QueryList<any> | any): I3JS.IScene {
		if (
			ThreeUtil.isNotNull(this.scene) &&
			ThreeUtil.isNotNull(this.scene.getScene)
		) {
			return this.scene.getScene();
		}
		if (ThreeUtil.isNotNull(scenes)) {
			if (scenes instanceof QueryList && scenes.length > 0) {
				return scenes.first.getScene();
			} else if (ThreeUtil.isNotNull(scenes.getScene)) {
				return scenes.getScene();
			}
		}
		if (ThreeUtil.isNotNull(this.rendererScenes)) {
			if (this.rendererScenes.length > 0) {
				return this.rendererScenes.first.getScene();
			}
		}
		return new THREE.Scene();
	}

	private cubePingPong: number = 0;

	/**
	 * Renders camera component
	 * @param renderer
	 * @param cssRenderer
	 * @param scenes
	 * @param renderTimer
	 * @returns
	 */
	public render(
		renderer: I3JS.IRenderer,
		cssRenderer:
			| I3JS.ICSS3DRenderer
			| I3JS.ICSS2DRenderer
			| (I3JS.ICSS3DRenderer | I3JS.ICSS2DRenderer)[],
		scenes: QueryList<any> | any,
		renderTimer: RendererTimer
	) {
		if (
			!this.active ||
			this.isCameraChild ||
			this.camera === null ||
			!this.camera.visible
		) {
			return;
		}
		const camera = this.getCamera();
		if (ThreeUtil.isNotNull(this.referObject3d)) {
			const object3d =
				this.referObject3d instanceof AbstractObject3dComponent
					? this.referObject3d.getObject3d()
					: this.referObject3d;
			if (ThreeUtil.isNotNull(this.object3d)) {
				camera.position.copy(object3d.position);
				camera.quaternion.copy(object3d.quaternion);
			}
		}
		if (renderer instanceof THREE.WebGLRenderer) {
			if (
				this.camera instanceof THREE.CubeCamera ||
				this.camera instanceof THREE.Group
			) {
				let cubeCamera: I3JS.ICubeCamera = null;
				if (
					this.cameraExtra !== null &&
					this.cameraExtra !== null &&
					this.cameraExtra.length > 0
				) {
					this.cubePingPong = (this.cubePingPong + 1) % this.cameraExtra.length;
					cubeCamera = this.cameraExtra[this.cubePingPong];
				} else if (this.camera instanceof THREE.CubeCamera) {
					cubeCamera = this.camera;
				}
				if (cubeCamera !== null) {
					cubeCamera.update(renderer, this.getScene(scenes));
					if (ThreeUtil.isNotNull(this.material)) {
						const material: any = ThreeUtil.getMaterial(this.material);
						if (
							ThreeUtil.isNotNull(material) &&
							material['envMap'] !== undefined
						) {
							material['envMap'] = cubeCamera.renderTarget.texture;
						}
					}
				}
				return;
			}
			if (ThreeUtil.isNotNull(this.autoClear)) {
				renderer.autoClear = this.autoClear;
			}
			if (ThreeUtil.isNotNull(this.clearColor)) {
				renderer.setClearColor(this.getClearColor(), this.getClearAlpha(1));
			}
		}
		if (camera instanceof THREE.Camera) {
			this.onRender.emit(renderTimer);
			if (this.scenes !== null && this.scenes.length > 0) {
				this.scenes.forEach((sceneCom) => {
					this.renderWithScene(renderer, camera, sceneCom.getScene());
				});
			} else {
				this.renderWithScene(renderer, camera, this.getScene(scenes));
			}
		}
		if (cssRenderer !== null) {
			if (Array.isArray(cssRenderer)) {
				if (this.scenes !== null && this.scenes.length > 0) {
					this.scenes.forEach((sceneCom) => {
						const scene = sceneCom.getScene();
						if (scene !== null) {
							cssRenderer.forEach((child) => {
								child.render(scene, this.getObject3d() as any);
							});
						}
					});
				} else {
					const scene = this.getScene(scenes);
					if (scene !== null) {
						cssRenderer.forEach((child) => {
							child.render(scene as any, this.getObject3d() as any);
						});
					}
				}
			} else {
				if (this.scenes !== null && this.scenes.length > 0) {
					this.scenes.forEach((sceneCom) => {
						const scene = sceneCom.getScene();
						if (scene !== null) {
							cssRenderer.render(scene, this.getObject3d() as any);
						}
					});
				} else {
					const scene = this.getScene(scenes);
					if (scene !== null) {
						cssRenderer.render(scene as any, this.getObject3d() as any);
					}
				}
			}
		}
	}

	/**
	 * Renders with scene
	 * @param renderer
	 * @param camera
	 * @param scene
	 */
	private renderWithScene(
		renderer: I3JS.IRenderer,
		camera: I3JS.ICamera,
		scene: I3JS.IScene
	) {
		if (scene !== null) {
			try {
				if (renderer instanceof THREE.WebGLRenderer) {
					if (this.scissorTest) {
						renderer.setScissorTest(true);
						renderer.setScissor(
							this.getScissorX(),
							this.getScissorY(),
							this.getScissorWidth(),
							this.getScissorHeight()
						);
					}
					if (this.viewport) {
						switch (this.viewportType.toLowerCase()) {
							case 'renderer':
								renderer.setViewport(
									this.getX(),
									this.getY(),
									this.getWidth(),
									this.getHeight()
								);
								break;
						}
					}
				}
				if (renderer instanceof THREE.WebGLRenderer) {
					if (ThreeUtil.isNotNull(this.clear) && this.clear) {
						renderer.clear();
					}
					if (ThreeUtil.isNotNull(this.clearDepth) && this.clearDepth) {
						renderer.clearDepth();
					}
				}
				renderer.render(scene, camera);
				if (renderer instanceof THREE.WebGLRenderer) {
					if (this.scissorTest) {
						renderer.setScissorTest(false);
					}
				}
			} catch (ex) {}
		}
	}
}
