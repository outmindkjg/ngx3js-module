import {
	AfterContentInit,
	Component,
	ContentChildren,
	EventEmitter,
	forwardRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	QueryList,
	SimpleChanges,
} from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { NgxLookatComponent } from '../lookat/lookat.component';
import { IRendererTimer } from '../ngx-interface';
import { NgxSceneComponent } from '../scene/scene.component';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxAVRControls } from './controls/avr-controls';
import { NgxPlaneControls } from './controls/plane-controls';
import { NgxSelectBoxControls } from './controls/selection-box-controls';

/**
 * NgxControlComponent
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ControlComponent) page for details.
 * See the [ngx control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control) page for a live demo.
 *
 * |  Three Type        | Type Key           | Acceptable Input          |
 * |:--------------------------|:--------------------------|:--------------------------|
 * | OrbitControls | OrbitControls, Orbit | autoRotate, autoRotateSpeed, enableDamping, dampingFactor, enablePan, enableKeys, screenSpacePanning, minDistance, maxDistance, enableZoom, minZoom, maxZoom, rotateSpeed, zoomSpeed, panSpeed, minPolarAngle, maxPolarAngle  |
 * | TransformControls | TransformControls, Transform | eventListener(dragging-changed, objectChange) |
 * | DragControls | DragControls, Drag | camera |
 * | TrackballControls | TrackballControls, Trackball | staticMoving, keys  |
 * | FlyControls | FlyControls, Fly | camera, movementSpeed, rollSpeed, dragToLook, autoForward |
 * | PointerLockControls | PointerLockControls, PointerLock | objects |
 * | FirstPersonControls | FirstPersonControls, FirstPerson | movementSpeed, lookSpeed, lookVertical, autoForward, activeLook, heightSpeed, heightCoef, heightMin, heightMax, verticalMin, verticalMax, mouseDragOn |
 * | ArcballControls | ArcballControls, Arcball | camera, gizmoVisible  |
 * | NgxSelectBoxControls | SelectBoxControls, SelectBox | camera  |
 * | CsmControls | CsmControls, Csm | maxFar, cascades, mode, shadowMapSize, lightDirectionX, lightDirectionY, lightDirectionZ  |
 * | NgxPlaneControls | PlaneControls, Plane | rotateSpeed, zoomSpeed, panSpeed, minDistance, maxDistance  |
 *
 * ```html
 * <ngx3js-renderer
 * 	[controlType]="'orbit'"
 * 	[controlOptions]="{ enablePan: false, enableDamping: true }"
 * ></ngx3js-renderer>
 * <ngx3js-control
 * 	[type]="'arcball'" [gizmoVisible]="true"
 * ></ngx3js-control>
 * <ngx3js-control
 * 	[type]="'DeviceOrientationControls'"
 * ></ngx3js-control>
 * <ngx3js-control
 * 	[type]="'plane'"
 * ></ngx3js-control>
 * <ngx3js-control
 * 	[type]="'FlyControls'"
 * 	[movementSpeed]="1000" [rollSpeed]="7.5" [autoForward]="false"
 * 	[dragToLook]="false"
 * ></ngx3js-control>
 * <ngx3js-control
 * 	[type]="'PointerLockControls'"
 * 	(onLoad)="setPointerLock($event)"
 * >
 * </ngx3js-control>
 * <ngx3js-control
 * 	[type]="'DragControls'"
 * 	(onLoad)="setDragControl($event)"
 * ></ngx3js-control>
 * <ngx3js-renderer
 * 	[controlType]="'FirstPerson'" [controlOptions]="{
 * 		enablePan: false,
 * 		enableDamping: true,
 * 		movementSpeed: 1000,
 * 		lookSpeed: 0.125,
 * 		lookVertical: true
 * 	}"
 * ></ngx3js-renderer>
 * <ngx3js-control
 * 	[type]="'TransformControls'"
 * 	(eventListener)="setTransformEventListener($event)"
 * 	(onLoad)="setTransformControl($event)"
 * ></ngx3js-control>
 * <ngx3js-control
 * 	[type]="'TrackballControls'" [rollSpeed]="1.0" [zoomSpeed]="1.2 "
 * 	[panSpeed]="0.8" [keys]="['KeyA', 'KeyS', 'KeyD']"
 * ></ngx3js-control>
 * <ngx3js-renderer
 * 	[controlType]="'selectbox'"
 * 	[controlOptions]="{
 * 		enablePan: false,
 * 		enableDamping: true
 * 	}"
 * ></ngx3js-renderer>
 * <ngx3js-control
 * 	[type]="'csm'" [maxFar]="1000" [cascades]="4 "
 * 	[mode]="'practical'" [scene]="scene" [shadowMapSize]="1024 "
 * 	[lightDirectionX]="-1" [lightDirectionY]="-1" [lightDirectionZ]="-1 "
 * 	[camera]="camera"
 * 	(onLoad)="setCsm($event)"
 * ></ngx3js-control>
 * ```
 */
@Component({
	selector: 'ngx3js-control',
	templateUrl: './control.component.html',
	styleUrls: ['./control.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxControlComponent),
		},
	],
})
export class NgxControlComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit, OnDestroy, OnChanges, AfterContentInit
{
	/**
	 * The type of control
	 *
	 * See the [ngx TransformControls control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/TransformControls) page for a live demo.
	 * See the [ngx DragControls control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/DragControls) page for a live demo.
	 * See the [ngx OrbitControls control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/OrbitControls) page for a live demo.
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
	 */
	@Input() type: string = 'orbit';

	/**
	 * The autoRotate of control
	 */
	@Input() public autoRotate: boolean = null;

	/**
	 * The autoRotateSpeed of control
	 */
	@Input() public autoRotateSpeed: number = null;

	/**
	 * The screenSpacePanning of control
	 */
	@Input() public screenSpacePanning: boolean = null;

	/**
	 * The minDistance of control
	 */
	@Input() public minDistance: number = null;

	/**
	 * The maxDistance of control
	 */
	@Input() public maxDistance: number = null;

	/**
	 * The xDistance of control
	 */
	@Input() public xDistance: number = null;

	/**
	 * The yDistance of control
	 */
	@Input() public yDistance: number = null;

	/**
	 * The enableZoom of control
	 */
	@Input() public enableZoom: boolean = null;

	/**
	 * The minZoom of control
	 */
	@Input() public minZoom: number = null;

	/**
	 * The maxZoom of control
	 */
	@Input() public maxZoom: number = null;

	/**
	 * The staticMoving of control
	 */
	@Input() public staticMoving: boolean = null;

	/**
	 * The gizmoVisible of control
	 */
	@Input() public gizmoVisible: boolean = null;

	/**
	 * The keys of control
	 */
	@Input() public keys: string[] = null;

	/**
	 * The rotateSpeed of control
	 */
	@Input() public rotateSpeed: number = null;

	/**
	 * The zoomSpeed of control
	 */
	@Input() public zoomSpeed: number = null;

	/**
	 * The panSpeed of control
	 */
	@Input() public panSpeed: number = null;

	/**
	 * The minPolarAngle of control
	 */
	@Input() public minPolarAngle: number = null;

	/**
	 * Input  of ngx control component
	 */
	@Input() public minAzimuthAngle: number = null;

	/**
	 * Input  of ngx control component
	 */
	@Input() public maxAzimuthAngle: number = null;

	/**
	 * The maxPolarAngle of control
	 */
	@Input() public maxPolarAngle: number = null;

	/**
	 * The enableKeys of control
	 */
	@Input() public enableKeys: boolean = null;

	/**
	 * The enablePan of control
	 */
	@Input() public enablePan: boolean = null;

	/**
	 * The enableDamping of control
	 */
	@Input() public enableDamping: boolean = null;

	/**
	 * The dampingFactor of control
	 */
	@Input() public dampingFactor: number = null;

	/**
	 * The movementSpeed of control
	 */
	@Input() public movementSpeed: number = null;

	/**
	 * The rollSpeed of control
	 */
	@Input() public rollSpeed: number = null;

	/**
	 * The dragToLook of control
	 */
	@Input() public dragToLook: boolean = null;

	/**
	 * The autoForward of control
	 */
	@Input() public autoForward: boolean = null;

	/**
	 * The lookSpeed of control
	 */
	@Input() public lookSpeed: number = null;

	/**
	 * The lookVertical of control
	 */
	@Input() public lookVertical: boolean = null;

	/**
	 * The activeLook of control
	 */
	@Input() public activeLook: boolean = null;

	/**
	 * The heightSpeed of control
	 */
	@Input() public heightSpeed: boolean = null;

	/**
	 * The heightCoef of control
	 */
	@Input() public heightCoef: number = null;

	/**
	 * The heightMin of control
	 */
	@Input() public heightMin: number = null;

	/**
	 * The heightMax of control
	 */
	@Input() public heightMax: number = null;

	/**
	 * The constrainVertical of control
	 */
	@Input() public constrainVertical: boolean = null;

	/**
	 * The verticalMin of control
	 */
	@Input() public verticalMin: number = null;

	/**
	 * The verticalMax of control
	 */
	@Input() public verticalMax: number = null;

	/**
	 * The mouseDragOn of control
	 */
	@Input() public mouseDragOn: boolean = null;

	/**
	 * The maxFar of control
	 */
	@Input() public maxFar: number = null;

	/**
	 * The cascades of control
	 */
	@Input() public cascades: number = null;

	/**
	 * The mode of control
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public mode: string = null;

	/**
	 * The scene of control
	 */
	@Input() public scene: any = null;

	/**
	 * The shadowMapSize of control
	 */
	@Input() public shadowMapSize: number = null;

	/**
	 * The lightDirectionX of control
	 */
	@Input() public lightDirectionX: number = null;

	/**
	 * The lightDirectionY of control
	 */
	@Input() public lightDirectionY: number = null;

	/**
	 * The lightDirectionZ of control
	 */
	@Input() public lightDirectionZ: number = null;

	/**
	 * The target of control
	 */
	@Input() public target: I3JS.Vector3 | NgxLookatComponent | any = null;

	/**
	 * The camera of control
	 */
	@Input() public camera: any = null;

	/**
	 * EventListener of control
	 */
	@Output() private eventListener: EventEmitter<{ type: string; event: any }> = new EventEmitter<{
		type: string;
		event: any;
	}>();

	/**
	 * The lookat list of control
	 */
	@ContentChildren(NgxLookatComponent, { descendants: false }) private lookatList: QueryList<NgxLookatComponent> = null;

	/**
	 * Creates an instance of control.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('control');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.controlDomElement !== null && this.controlDomElement.parentElement !== null) {
			this.controlDomElement.parentElement.removeChild(this.controlDomElement);
		}
		if (NgxThreeUtil.isNotNull(this.control)) {
			if (this.control instanceof N3JS.TransformControls && this.control.parent) {
				this.control.parent.remove(this.control);
			}
			if (NgxThreeUtil.isNotNull(this.control.dispose)) {
				this.control.dispose();
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
		if (changes && this.control) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(this.lookatList, 'lookatList', 'lookat');
		super.ngAfterContentInit();
	}

	private _cachedLookatList: NgxLookatComponent[] = [];

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (this.control !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getControl();
				return;
			}
			if (!NgxThreeUtil.isOnlyIndexOf(changes, ['target', 'lookat'], this.OBJECT_ATTR)) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, ['target']);
			}
			if (NgxThreeUtil.isIndexOf(changes, 'lookat')) {
				changes = NgxThreeUtil.pushUniq(changes, ['target']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'target':
						const newLookatList: NgxLookatComponent[] = [];
						if (NgxThreeUtil.isNotNull(this.target)) {
							if (this.target instanceof NgxLookatComponent) {
								newLookatList.push(this.target);
							} else {
								this.control['target'] = NgxThreeUtil.getLookAt(this.target);
							}
						}
						if (NgxThreeUtil.isNotNull(this.lookatList)) {
							this.lookatList.forEach((lookat) => {
								newLookatList.push(lookat);
							});
						}
						this._cachedLookatList.forEach((lookat) => {
							if (newLookatList.indexOf(lookat) === -1) {
								lookat.unsetObject3d(this.selfAny);
							}
						});
						newLookatList.forEach((lookat) => {
							if (this._cachedLookatList.indexOf(lookat) === -1) {
								lookat.setObject3d(this.selfAny);
							}
						});
						this._cachedLookatList = newLookatList;
						// this.setSubscribeNext('lookat');
						break;
				}
			});
		}
	}

	/**
	 * The Camera of control
	 */
	private _camera: I3JS.Camera = null;

	/**
	 * The Renderer of control
	 */
	private _renderer: I3JS.Renderer = null;

	private _renderCaller: (...args: any[]) => void = null;

	/**
	 * The Renderer of control
	 */
	private controlDomElement: HTMLElement = null;

	/**
	 * The Scene of control
	 */
	private _scene: QueryList<NgxSceneComponent> = null;

	/**
	 * Dom element of control
	 */
	private _domElement: HTMLElement = null;

	/**
	 * Sets camera dom element
	 * @param camera
	 * @param domElement
	 * @param scenes
	 */
	public setCameraDomElement(
		camera: I3JS.Camera,
		domElement: HTMLElement,
		scenes: QueryList<NgxSceneComponent>,
		renderer: I3JS.Renderer,
		renderCaller: (...args: any[]) => void = null
	) {
		if (
			this._camera !== camera ||
			this._domElement !== domElement ||
			this._scene !== scenes ||
			this._renderer !== renderer
		) {
			this._camera = camera;
			this._domElement = domElement;
			this._scene = scenes;
			this._renderer = renderer;
			this._renderCaller = renderCaller;
			this.unSubscribeRefer('cameraload');
			const cameraCom = NgxThreeUtil.getThreeComponent(camera);
			if (NgxThreeUtil.isNotNull(cameraCom)) {
				this.subscribeRefer(
					'cameraload',
					NgxThreeUtil.getSubscribe(
						cameraCom,
						() => {
							this._camera = cameraCom.getCamera();
							this.needUpdate = true;
						},
						'loaded'
					)
				);
			}
			switch (this.type.toLowerCase()) {
				case 'csm':
				case 'csmcontrol':
					break;
				default:
					this.control = null;
					this.getControl();
					break;
			}
		}
	}

	/**
	 * The Control of control
	 */
	private control: any = null;

	/**
	 * Gets control
	 * @returns control
	 */
	public getControl(): any {
		if (this.control === null || this._needUpdate) {
			this.needUpdate = false;
			const camera = this._camera;
			const domElement = this._domElement;
			if (this.control !== null) {
				if (this.control instanceof N3JS.TransformControls && this.control.parent) {
					this.control.parent.remove(this.control);
				}
				if (NgxThreeUtil.isNotNull(this.control.dispose)) {
					this.control.dispose();
				}
			}
			this.control = null;
			let control: any = null;
			switch (this.type.toLowerCase()) {
				case 'ar':
				case 'vr':
				case 'xr':
				case 'avr':
				case 'avrcontrols':
					control = new NgxAVRControls(
						this.type,
						camera,
						this._scene.first.getScene(),
						this._renderer as I3JS.WebGLRenderer,
						{},
						domElement,
						this._renderCaller,
						true
					);
					break;
				case 'ar-only':
				case 'vr-only':
				case 'xr-only':
				case 'avr-only':
				case 'avrcontrols-only':
					control = new NgxAVRControls(
						this.type.substr(0, 2),
						camera,
						this._scene.first.getScene(),
						this._renderer as I3JS.WebGLRenderer,
						{},
						domElement,
						this._renderCaller,
						false
					);
					break;
				case 'flycontrols':
				case 'fly':
					const flyControls = new N3JS.FlyControls(camera, domElement);
					if (NgxThreeUtil.isNotNull(this.movementSpeed)) {
						flyControls.movementSpeed = this.movementSpeed;
					}
					if (NgxThreeUtil.isNotNull(this.rollSpeed)) {
						flyControls.rollSpeed = NgxThreeUtil.getAngleSafe(this.rollSpeed, 0);
					}
					if (NgxThreeUtil.isNotNull(this.dragToLook)) {
						flyControls.dragToLook = this.dragToLook;
					}
					if (NgxThreeUtil.isNotNull(this.autoForward)) {
						flyControls.autoForward = this.autoForward;
					}
					control = flyControls;
					break;
				case 'deviceorientationcontrols':
				case 'deviceorientation':
					// const deviceOrientationControls = new DeviceOrientationControls(
					//	camera
					// );
					// control = deviceOrientationControls;
					break;
				case 'pointerlockcontrols':
				case 'pointerlock':
					const pointerLockControls = new N3JS.PointerLockControls(camera);
					control = pointerLockControls;
					this._scene.first.getScene().add(pointerLockControls.getObject());
					break;
				case 'dragcontrols':
				case 'drag':
					const dragControls = new N3JS.DragControls([], camera, domElement);
					control = dragControls;
					break;
				case 'firstpersoncontrols':
				case 'firstperson':
					const firstPersonControls = new N3JS.FirstPersonControls(camera, domElement);
					if (NgxThreeUtil.isNotNull(this.movementSpeed)) {
						firstPersonControls.movementSpeed = this.movementSpeed;
					}
					if (NgxThreeUtil.isNotNull(this.lookSpeed)) {
						firstPersonControls.lookSpeed = this.lookSpeed;
					}
					if (NgxThreeUtil.isNotNull(this.lookVertical)) {
						firstPersonControls.lookVertical = this.lookVertical;
					}
					if (NgxThreeUtil.isNotNull(this.autoForward)) {
						firstPersonControls.autoForward = this.autoForward;
					}
					if (NgxThreeUtil.isNotNull(this.activeLook)) {
						firstPersonControls.activeLook = this.activeLook;
					}
					if (NgxThreeUtil.isNotNull(this.heightSpeed)) {
						firstPersonControls.heightSpeed = this.heightSpeed;
					}
					if (NgxThreeUtil.isNotNull(this.heightCoef)) {
						firstPersonControls.heightCoef = this.heightCoef;
					}
					if (NgxThreeUtil.isNotNull(this.heightMin)) {
						firstPersonControls.heightMin = this.heightMin;
					}
					if (NgxThreeUtil.isNotNull(this.heightMax)) {
						firstPersonControls.heightMax = this.heightMax;
					}
					if (NgxThreeUtil.isNotNull(this.constrainVertical)) {
						firstPersonControls.constrainVertical = this.constrainVertical;
					}
					if (NgxThreeUtil.isNotNull(this.verticalMin)) {
						firstPersonControls.verticalMin = this.verticalMin;
					}
					if (NgxThreeUtil.isNotNull(this.verticalMax)) {
						firstPersonControls.verticalMax = this.verticalMax;
					}
					if (NgxThreeUtil.isNotNull(this.mouseDragOn)) {
						firstPersonControls.mouseDragOn = this.mouseDragOn;
					}
					control = firstPersonControls;
					break;
				case 'transformcontrols':
				case 'transform':
					const transformControls = new N3JS.TransformControls(camera, domElement);
					transformControls.addEventListener('dragging-changed', (event) => {
						this.eventListener.emit({ type: 'dragging-changed', event: event });
					});
					transformControls.addEventListener('objectChange', (event) => {
						this.eventListener.emit({ type: 'objectChange', event: event });
					});
					control = transformControls;
					if (this._scene !== null && this._scene.length > 0) {
						window.setTimeout(() => {
							this._scene.first.getScene().add(control);
						}, 100);
					}
					break;
				case 'trackballcontrols':
				case 'trackball':
					const trackballControls = new N3JS.TrackballControls(camera, domElement);
					if (NgxThreeUtil.isNotNull(this.staticMoving)) {
						trackballControls.staticMoving = this.staticMoving;
					}
					if (NgxThreeUtil.isNotNull(this.keys)) {
						trackballControls.keys = this.keys;
					}
					control = trackballControls;
					break;
				case 'arcballcontrols':
				case 'arcball':
					const arcballControls = new N3JS.ArcballControls(camera, domElement, this._scene.first.getScene());
					if (NgxThreeUtil.isNotNull(this.gizmoVisible)) {
						arcballControls.setGizmosVisible(this.gizmoVisible);
					}
					control = arcballControls;
					break;
				case 'selectbox':
				case 'selectboxcontrols':
					const selectBoxControls = new NgxSelectBoxControls(
						camera,
						this._scene.first.getScene(),
						this._renderer as I3JS.WebGLRenderer
					);
					control = selectBoxControls;
					break;
				case 'csmcontrol':
				case 'csm':
					let csmScene = NgxThreeUtil.getTypeSafe(this.scene, {});
					if (NgxThreeUtil.isNotNull(csmScene.getSceneDumpy)) {
						csmScene = csmScene.getSceneDumpy();
					}
					if (!(csmScene instanceof N3JS.Scene)) {
						this.consoleLog('error Scene', csmScene, 'error');
						csmScene = new N3JS.Scene();
					}
					let csmCamera = NgxThreeUtil.getTypeSafe(this.camera, this._camera, {});
					if (NgxThreeUtil.isNotNull(csmCamera.getCamera)) {
						csmCamera = csmCamera.getObject3d();
					}
					if (!(csmCamera instanceof N3JS.Camera)) {
						this.consoleLog('error Camera', csmCamera, 'error');
						csmCamera = new N3JS.Camera();
					}
					const csm = new N3JS.CsmControls({
						maxFar: NgxThreeUtil.getTypeSafe(this.maxFar, 100000),
						cascades: NgxThreeUtil.getTypeSafe(this.cascades, 3),
						mode: NgxThreeUtil.getTypeSafe(this.mode, 'practical') as any,
						parent: csmScene,
						shadowMapSize: NgxThreeUtil.getTypeSafe(this.shadowMapSize, 2048),
						lightDirection: NgxThreeUtil.getVector3Safe(
							this.lightDirectionX,
							this.lightDirectionY,
							this.lightDirectionZ,
							new N3JS.Vector3(1, 1, 1)
						).normalize(),
						camera: csmCamera,
					});
					control = csm;
					break;
				case 'planecontrols':
				case 'plane':
					const mouseMoveControls = new NgxPlaneControls(camera, domElement);
					if (NgxThreeUtil.isNotNull(this.rotateSpeed)) {
						mouseMoveControls.rotateSpeed = this.rotateSpeed;
					}
					if (NgxThreeUtil.isNotNull(this.zoomSpeed)) {
						mouseMoveControls.zoomSpeed = this.zoomSpeed;
					}
					if (NgxThreeUtil.isNotNull(this.panSpeed)) {
						mouseMoveControls.panSpeed = this.panSpeed;
					}
					if (NgxThreeUtil.isNotNull(this.minDistance)) {
						mouseMoveControls.minDistance = this.minDistance;
					}
					if (NgxThreeUtil.isNotNull(this.maxDistance)) {
						mouseMoveControls.maxDistance = this.maxDistance;
					}
					control = mouseMoveControls;
					break;
				case 'orbitcontrols':
				case 'orbit':
				default:
					const orbitControls = new N3JS.OrbitControls(camera, domElement);
					if (NgxThreeUtil.isNotNull(this.autoRotate)) {
						orbitControls.autoRotate = this.autoRotate;
					}
					if (NgxThreeUtil.isNotNull(this.autoRotateSpeed)) {
						orbitControls.autoRotateSpeed = this.autoRotateSpeed;
					}
					if (NgxThreeUtil.isNotNull(this.enableDamping)) {
						orbitControls.enableDamping = this.enableDamping;
					}
					if (NgxThreeUtil.isNotNull(this.dampingFactor)) {
						orbitControls.dampingFactor = this.dampingFactor;
					}
					if (NgxThreeUtil.isNotNull(this.enablePan)) {
						orbitControls.enablePan = this.enablePan;
					}
					if (NgxThreeUtil.isNotNull(this.enableKeys)) {
						orbitControls.enableKeys = this.enableKeys;
					}
					if (NgxThreeUtil.isNotNull(this.screenSpacePanning)) {
						orbitControls.screenSpacePanning = this.screenSpacePanning;
					}
					if (NgxThreeUtil.isNotNull(this.minDistance)) {
						orbitControls.minDistance = this.minDistance;
					}
					if (NgxThreeUtil.isNotNull(this.maxDistance)) {
						orbitControls.maxDistance = this.maxDistance;
					}
					if (NgxThreeUtil.isNotNull(this.enableZoom)) {
						orbitControls.enableZoom = this.enableZoom;
					}
					if (NgxThreeUtil.isNotNull(this.minZoom)) {
						orbitControls.minZoom = this.minZoom;
					}
					if (NgxThreeUtil.isNotNull(this.maxZoom)) {
						orbitControls.maxZoom = this.maxZoom;
					}
					if (NgxThreeUtil.isNotNull(this.rotateSpeed)) {
						orbitControls.rotateSpeed = this.rotateSpeed;
					}
					if (NgxThreeUtil.isNotNull(this.zoomSpeed)) {
						orbitControls.zoomSpeed = this.zoomSpeed;
					}
					if (NgxThreeUtil.isNotNull(this.panSpeed)) {
						orbitControls.panSpeed = this.panSpeed;
					}
					if (NgxThreeUtil.isNotNull(this.minPolarAngle)) {
						orbitControls.minPolarAngle = NgxThreeUtil.getAngleSafe(this.minPolarAngle, 180);
					}
					if (NgxThreeUtil.isNotNull(this.minAzimuthAngle)) {
						orbitControls.minAzimuthAngle = NgxThreeUtil.getAngleSafe(this.minAzimuthAngle, 0);
					}
					if (NgxThreeUtil.isNotNull(this.maxAzimuthAngle)) {
						orbitControls.maxAzimuthAngle = NgxThreeUtil.getAngleSafe(this.maxAzimuthAngle, 0);
					}
					if (NgxThreeUtil.isNotNull(this.maxPolarAngle)) {
						orbitControls.maxPolarAngle = NgxThreeUtil.getAngleSafe(this.maxPolarAngle, 180);
					}
					orbitControls.addEventListener('change', () => {
						camera.dispatchEvent({ type: 'change' });
					});
					control = orbitControls;
					break;
			}
			this.control = control;
			super.setObject(this.control);
		}
		return this.control;
	}

	/**
	 * Renders control component
	 * @param renderTimer
	 */
	public render(renderTimer: IRendererTimer) {
		if (this.control !== null && NgxThreeUtil.isNotNull(this.control.update)) {
			if (
				this.control instanceof N3JS.FlyControls ||
				this.control instanceof N3JS.FirstPersonControls ||
				this.control instanceof NgxPlaneControls ||
				this.control instanceof NgxAVRControls
			) {
				this.control.update(renderTimer.delta);
			} else if (this.control instanceof N3JS.TransformControls) {
				// pass
			} else {
				this.control.update();
			}
		}
	}
}
