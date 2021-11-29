import {
	AfterContentInit,
	Component,
	ContentChildren,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	QueryList,
	SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
// import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { ArcballControls } from 'three/examples/jsm/controls/ArcballControls';
import { CSM } from 'three/examples/jsm/csm/CSM';
import { RendererTimer, ThreeUtil } from '../interface';
import { LookatComponent } from '../lookat/lookat.component';
import { SceneComponent } from '../scene/scene.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { AVRControls } from './avr-controls';
import { PlaneControls } from './plane-controls';
import { SelectBoxControls } from './selection-box-controls';

/**
 * Control options
 */
export interface ControlOptions {
	/**
	 * The type of control
	 *
	 * Notice - case insensitive.
	 *
	 * @see FlyControls - FlyControls, Fly
	 * @see FirstPersonControls - FirstPersonControls, FirstPerson
	 * @see DeviceOrientationControls - DeviceOrientationControls, DeviceOrientation
	 * @see DragControls - DragControls, Drag
	 * @see TransformControls - TransformControls, Transform
	 * @see TrackballControls - TrackballControls, Trackball
	 * @see ArcballControls - ArcballControls, Arcball
	 * @see CSM - CSM
	 * @see PlaneControls - PlaneControls, Plane
	 * @see OrbitControls - OrbitControls, Orbit
	 */
	type?: string;

	/**
	 * The autoRotate of control
	 */
	autoRotate?: boolean;

	/**
	 * The autoRotateSpeed of control
	 */
	autoRotateSpeed?: number;

	/**
	 * The screenSpacePanning of control
	 */
	screenSpacePanning?: boolean;

	/**
	 * The minDistance of control
	 */
	minDistance?: number;

	/**
	 * The maxDistance of control
	 */
	maxDistance?: number;

	/**
	 * The xDistance of control
	 */
	xDistance?: number;

	/**
	 * The yDistance of control
	 */
	yDistance?: number;

	/**
	 * The enableZoom of control
	 */
	enableZoom?: boolean;

	/**
	 * The minZoom of control
	 */
	minZoom?: number;

	/**
	 * The maxZoom of control
	 */
	maxZoom?: number;

	/**
	 * The staticMoving of control
	 */
	staticMoving?: boolean;

	/**
	 * The rotateSpeed of control
	 */
	rotateSpeed?: number;

	/**
	 * The zoomSpeed of control
	 */
	zoomSpeed?: number;

	/**
	 * The panSpeed of control
	 */
	panSpeed?: number;

	/**
	 * The minPolarAngle of control
	 */
	minPolarAngle?: number;

	/**
	 * The maxPolarAngle of control
	 */
	maxPolarAngle?: number;

	/**
	 * The enableKeys of control
	 */
	enableKeys?: boolean;

	/**
	 * The enablePan of control
	 */
	enablePan?: boolean;

	/**
	 * The enableDamping of control
	 */
	enableDamping?: boolean;

	/**
	 * The dampingFactor of control
	 */
	dampingFactor?: number;

	/**
	 * The movementSpeed of control
	 */
	movementSpeed?: number;

	/**
	 * The rollSpeed of control in degree
	 */
	rollSpeed?: number;

	/**
	 * The dragToLook of control
	 */
	dragToLook?: boolean;

	/**
	 * The autoForward of control
	 */
	autoForward?: boolean;

	/**
	 * The lookSpeed of control
	 */
	lookSpeed?: number;

	/**
	 * The lookVertical of control
	 */
	lookVertical?: boolean;

	/**
	 * The activeLook of control
	 */
	activeLook?: boolean;

	/**
	 * The heightSpeed of control
	 */
	heightSpeed?: boolean;

	/**
	 * The heightCoef of control
	 */
	heightCoef?: number;

	/**
	 * The heightMin of control
	 */
	heightMin?: number;

	/**
	 * The heightMax of control
	 */
	heightMax?: number;

	/**
	 * The constrainVertical of control
	 */
	constrainVertical?: boolean;

	/**
	 * The verticalMin of control
	 */
	verticalMin?: number;

	/**
	 * The verticalMax of control
	 */
	verticalMax?: number;

	/**
	 * The mouseDragOn of control
	 */
	mouseDragOn?: boolean;

	/**
	 * The maxFar of control
	 */
	maxFar?: number;

	/**
	 * The cascades of control
	 */
	cascades?: number;

	/**
	 * The mode of control
	 *
	 * Notice - case insensitive.
	 *
	 */
	mode?: string;

	/**
	 * The scene of control
	 */
	scene?: any;

	/**
	 * The shadowMapSize of control
	 */
	shadowMapSize?: number;

	/**
	 * The lightDirectionX of control
	 */
	lightDirectionX?: number;

	/**
	 * The lightDirectionY of control
	 */
	lightDirectionY?: number;

	/**
	 * The lightDirectionZ of control
	 */
	lightDirectionZ?: number;

	/**
	 * The target of control
	 */
	target?: THREE.Vector3 | LookatComponent | any;

	/**
	 * The camera of control
	 */
	camera?: any;

	/**
	 * The lookat list of control
	 */
	lookatList?: QueryList<LookatComponent>;
}

/**
 * ControlComponent
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ControlComponent) page for details.
 * See the [ngx control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control) page for a live demo.
 *
 * ```html
 * <ngx3js-renderer
 * 	[controlType]="'orbit'" [controlOptions]="{ enablePan: false, enableDamping: true }"
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
 * 	[type]="'FlyControls'" [movementSpeed]="1000 " [rollSpeed]="7.5 " [autoForward]="false " [dragToLook]="false"
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
 * 	[type]="'TrackballControls'" [rollSpeed]="1.0 " [zoomSpeed]="1.2 " [panSpeed]="0.8 " [keys]="['KeyA', 'KeyS', 'KeyD']"
 * ></ngx3js-control>
 * <ngx3js-renderer
 * 	[controlType]="'selectbox'" [controlOptions]="{ enablePan: false, enableDamping: true }"
 * ></ngx3js-renderer>
 * <ngx3js-control
 * 	[type]="'csm'" [maxFar]="1000 " [cascades]="4 " [mode]="'practical'" [scene]="scene " [shadowMapSize]="1024 " [lightDirectionX]="-1 " [lightDirectionY]="-1 " [lightDirectionZ]="-1 " [camera]="camera"
 * 	(onLoad)="setCsm($event)"
 * ></ngx3js-control>
 * ```
 */
@Component({
	selector: 'ngx3js-control',
	templateUrl: './control.component.html',
	styleUrls: ['./control.component.scss'],
})
export class ControlComponent
	extends AbstractSubscribeComponent
	implements OnInit, OnDestroy, OnChanges, AfterContentInit
{
	/**
	 * The type of control
	 *
	 * Notice - case insensitive.
	 * See the [ngx TransformControls control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/TransformControls) page for a live demo.
	 * See the [ngx DragControls control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/DragControls) page for a live demo.
	 * See the [ngx OrbitControls control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/OrbitControls) page for a live demo.
	 *
	 * @see FlyControls - FlyControls, Fly
	 * @see FirstPersonControls - FirstPersonControls, FirstPerson
	 * @see DeviceOrientationControls - DeviceOrientationControls, DeviceOrientation
	 * @see DragControls - DragControls, Drag
	 * @see TransformControls - TransformControls, Transform
	 * @see TrackballControls - TrackballControls, Trackball
	 * @see ArcballControls - ArcballControls, Arcball
	 * @see CSM - CSM
	 * @see PlaneControls - PlaneControls, Plane
	 * @see OrbitControls - OrbitControls, Orbit
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
	@Input() public target: THREE.Vector3 | LookatComponent | any = null;

	/**
	 * The camera of control
	 */
	@Input() public camera: any = null;

	/**
	 * EventListener of control
	 */
	@Output() private eventListener: EventEmitter<{ type: string; event: any }> =
		new EventEmitter<{ type: string; event: any }>();

	/**
	 * The lookat list of control
	 */
	@ContentChildren(LookatComponent, { descendants: false })
	private lookatList: QueryList<LookatComponent> = null;

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
		if (
			this.controlDomElement !== null &&
			this.controlDomElement.parentElement !== null
		) {
			this.controlDomElement.parentElement.removeChild(this.controlDomElement);
		}
		if (ThreeUtil.isNotNull(this.control)) {
			if (this.control instanceof TransformControls && this.control.parent) {
				this.control.parent.remove(this.control);
			}
			if (ThreeUtil.isNotNull(this.control.dispose)) {
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

	private _cachedLookatList: LookatComponent[] = [];

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (this.control !== null) {
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getControl();
				return;
			}
			if (
				!ThreeUtil.isOnlyIndexOf(
					changes,
					['target', 'lookat'],
					this.OBJECT_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, ['target']);
			}
			if (ThreeUtil.isIndexOf(changes, 'lookat')) {
				changes = ThreeUtil.pushUniq(changes, ['target']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'target':
						const newLookatList: LookatComponent[] = [];
						if (ThreeUtil.isNotNull(this.target)) {
							if (this.target instanceof LookatComponent) {
								newLookatList.push(this.target);
							} else {
								this.control['target'] = ThreeUtil.getLookAt(this.target);
							}
						}
						if (ThreeUtil.isNotNull(this.lookatList)) {
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
	private _camera: THREE.Camera = null;

	/**
	 * The Renderer of control
	 */
	private _renderer: THREE.Renderer = null;

	private _renderCaller: (...args: any[]) => void = null;

	/**
	 * The Renderer of control
	 */
	private controlDomElement: HTMLElement = null;

	/**
	 * The Scene of control
	 */
	private _scene: QueryList<SceneComponent> = null;

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
		camera: THREE.Camera,
		domElement: HTMLElement,
		scenes: QueryList<SceneComponent>,
		renderer: THREE.Renderer,
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
			const cameraCom = ThreeUtil.getThreeComponent(camera);
			if (ThreeUtil.isNotNull(cameraCom)) {
				this.subscribeRefer(
					'cameraload',
					ThreeUtil.getSubscribe(
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
				if (this.control instanceof TransformControls && this.control.parent) {
					this.control.parent.remove(this.control);
				}
				if (ThreeUtil.isNotNull(this.control.dispose)) {
					this.control.dispose();
				}
			}
			this.control = null;
			let control: any = null;
			switch (this.type.toLowerCase()) {
				case 'ar':
				case 'vr':
				case 'xr':
					control = new AVRControls(
						this.type,
						camera,
						this._scene.first.getScene(),
						this._renderer as THREE.WebGLRenderer,
						{},
						domElement,
						this._renderCaller,
						true
					);
					break;
				case 'ar-only':
				case 'vr-only':
				case 'xr-only':
					control = new AVRControls(
						this.type.substr(0, 2),
						camera,
						this._scene.first.getScene(),
						this._renderer as THREE.WebGLRenderer,
						{},
						domElement,
						this._renderCaller,
						false
					);
					break;
				case 'flycontrols':
				case 'fly':
					const flyControls = new FlyControls(camera, domElement);
					if (ThreeUtil.isNotNull(this.movementSpeed)) {
						flyControls.movementSpeed = this.movementSpeed;
					}
					if (ThreeUtil.isNotNull(this.rollSpeed)) {
						flyControls.rollSpeed = ThreeUtil.getAngleSafe(this.rollSpeed, 0);
					}
					if (ThreeUtil.isNotNull(this.dragToLook)) {
						flyControls.dragToLook = this.dragToLook;
					}
					if (ThreeUtil.isNotNull(this.autoForward)) {
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
					const pointerLockControls = new PointerLockControls(camera);
					control = pointerLockControls;
					this._scene.first.getScene().add(pointerLockControls.getObject());
					break;
				case 'dragcontrols':
				case 'drag':
					const dragControls = new DragControls([], camera, domElement);
					control = dragControls;
					break;
				case 'firstpersoncontrols':
				case 'firstperson':
					const firstPersonControls = new FirstPersonControls(
						camera,
						domElement
					);
					if (ThreeUtil.isNotNull(this.movementSpeed)) {
						firstPersonControls.movementSpeed = this.movementSpeed;
					}
					if (ThreeUtil.isNotNull(this.lookSpeed)) {
						firstPersonControls.lookSpeed = this.lookSpeed;
					}
					if (ThreeUtil.isNotNull(this.lookVertical)) {
						firstPersonControls.lookVertical = this.lookVertical;
					}
					if (ThreeUtil.isNotNull(this.autoForward)) {
						firstPersonControls.autoForward = this.autoForward;
					}
					if (ThreeUtil.isNotNull(this.activeLook)) {
						firstPersonControls.activeLook = this.activeLook;
					}
					if (ThreeUtil.isNotNull(this.heightSpeed)) {
						firstPersonControls.heightSpeed = this.heightSpeed;
					}
					if (ThreeUtil.isNotNull(this.heightCoef)) {
						firstPersonControls.heightCoef = this.heightCoef;
					}
					if (ThreeUtil.isNotNull(this.heightMin)) {
						firstPersonControls.heightMin = this.heightMin;
					}
					if (ThreeUtil.isNotNull(this.heightMax)) {
						firstPersonControls.heightMax = this.heightMax;
					}
					if (ThreeUtil.isNotNull(this.constrainVertical)) {
						firstPersonControls.constrainVertical = this.constrainVertical;
					}
					if (ThreeUtil.isNotNull(this.verticalMin)) {
						firstPersonControls.verticalMin = this.verticalMin;
					}
					if (ThreeUtil.isNotNull(this.verticalMax)) {
						firstPersonControls.verticalMax = this.verticalMax;
					}
					if (ThreeUtil.isNotNull(this.mouseDragOn)) {
						firstPersonControls.mouseDragOn = this.mouseDragOn;
					}
					control = firstPersonControls;
					break;
				case 'transformcontrols':
				case 'transform':
					const transformControls = new TransformControls(camera, domElement);
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
					const trackballControls = new TrackballControls(camera, domElement);
					if (ThreeUtil.isNotNull(this.staticMoving)) {
						trackballControls.staticMoving = this.staticMoving;
					}
					if (ThreeUtil.isNotNull(this.keys)) {
						trackballControls.keys = this.keys;
					}
					control = trackballControls;
					break;
				case 'arcballcontrols':
				case 'arcball':
					const arcballControls = new ArcballControls(
						camera,
						domElement,
						this._scene.first.getScene()
					);
					if (ThreeUtil.isNotNull(this.gizmoVisible)) {
						(arcballControls as any).setGizmosVisible(this.gizmoVisible);
					}
					control = arcballControls;
					break;
				case 'selectbox':
				case 'selectboxcontrols':
					const selectBoxControls = new SelectBoxControls(
						camera,
						this._scene.first.getScene(),
						this._renderer as THREE.WebGLRenderer
					);
					control = selectBoxControls;
					break;
				case 'csm':
					let csmScene = ThreeUtil.getTypeSafe(this.scene, {});
					if (ThreeUtil.isNotNull(csmScene.getSceneDumpy)) {
						csmScene = csmScene.getSceneDumpy();
					}
					if (!(csmScene instanceof THREE.Scene)) {
						this.consoleLog('error Scene', csmScene, 'error');
						csmScene = new THREE.Scene();
					}
					let csmCamera = ThreeUtil.getTypeSafe(this.camera, this._camera, {});
					if (ThreeUtil.isNotNull(csmCamera.getCamera)) {
						csmCamera = csmCamera.getObject3d();
					}
					if (!(csmCamera instanceof THREE.Camera)) {
						this.consoleLog('error Camera', csmCamera, 'error');
						csmCamera = new THREE.Camera();
					}
					const csm = new CSM({
						maxFar: ThreeUtil.getTypeSafe(this.maxFar, 100000),
						cascades: ThreeUtil.getTypeSafe(this.cascades, 3),
						mode: ThreeUtil.getTypeSafe(this.mode, 'practical'),
						parent: csmScene,
						shadowMapSize: ThreeUtil.getTypeSafe(this.shadowMapSize, 2048),
						lightDirection: ThreeUtil.getVector3Safe(
							this.lightDirectionX,
							this.lightDirectionY,
							this.lightDirectionZ,
							new THREE.Vector3(1, 1, 1)
						).normalize(),
						camera: csmCamera,
					});
					control = csm;
					break;
				case 'planecontrols':
				case 'plane':
					const mouseMoveControls = new PlaneControls(camera, domElement);
					if (ThreeUtil.isNotNull(this.rotateSpeed)) {
						mouseMoveControls.rotateSpeed = this.rotateSpeed;
					}
					if (ThreeUtil.isNotNull(this.zoomSpeed)) {
						mouseMoveControls.zoomSpeed = this.zoomSpeed;
					}
					if (ThreeUtil.isNotNull(this.panSpeed)) {
						mouseMoveControls.panSpeed = this.panSpeed;
					}
					if (ThreeUtil.isNotNull(this.xDistance)) {
						mouseMoveControls.xDistance = this.xDistance;
					}
					if (ThreeUtil.isNotNull(this.yDistance)) {
						mouseMoveControls.yDistance = this.yDistance;
					}
					control = mouseMoveControls;
					break;
				case 'orbitcontrols':
				case 'orbit':
				default:
					const orbitControls = new OrbitControls(camera, domElement);
					if (ThreeUtil.isNotNull(this.autoRotate)) {
						orbitControls.autoRotate = this.autoRotate;
					}
					if (ThreeUtil.isNotNull(this.autoRotateSpeed)) {
						orbitControls.autoRotateSpeed = this.autoRotateSpeed;
					}
					if (ThreeUtil.isNotNull(this.enableDamping)) {
						orbitControls.enableDamping = this.enableDamping;
					}
					if (ThreeUtil.isNotNull(this.dampingFactor)) {
						orbitControls.dampingFactor = this.dampingFactor;
					}
					if (ThreeUtil.isNotNull(this.enablePan)) {
						orbitControls.enablePan = this.enablePan;
					}
					if (ThreeUtil.isNotNull(this.enableKeys)) {
						orbitControls.enableKeys = this.enableKeys;
					}
					if (ThreeUtil.isNotNull(this.screenSpacePanning)) {
						orbitControls.screenSpacePanning = this.screenSpacePanning;
					}
					if (ThreeUtil.isNotNull(this.minDistance)) {
						orbitControls.minDistance = this.minDistance;
					}
					if (ThreeUtil.isNotNull(this.maxDistance)) {
						orbitControls.maxDistance = this.maxDistance;
					}
					if (ThreeUtil.isNotNull(this.enableZoom)) {
						orbitControls.enableZoom = this.enableZoom;
					}
					if (ThreeUtil.isNotNull(this.minZoom)) {
						orbitControls.minZoom = this.minZoom;
					}
					if (ThreeUtil.isNotNull(this.maxZoom)) {
						orbitControls.maxZoom = this.maxZoom;
					}
					if (ThreeUtil.isNotNull(this.rotateSpeed)) {
						orbitControls.rotateSpeed = this.rotateSpeed;
					}
					if (ThreeUtil.isNotNull(this.zoomSpeed)) {
						orbitControls.zoomSpeed = this.zoomSpeed;
					}
					if (ThreeUtil.isNotNull(this.panSpeed)) {
						orbitControls.panSpeed = this.panSpeed;
					}
					if (ThreeUtil.isNotNull(this.minPolarAngle)) {
						orbitControls.minPolarAngle = ThreeUtil.getAngleSafe(
							this.minPolarAngle,
							180
						);
					}
					if (ThreeUtil.isNotNull(this.maxPolarAngle)) {
						orbitControls.maxPolarAngle = ThreeUtil.getAngleSafe(
							this.maxPolarAngle,
							180
						);
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
	public render(renderTimer: RendererTimer) {
		if (this.control !== null && ThreeUtil.isNotNull(this.control.update)) {
			if (
				this.control instanceof FlyControls ||
				this.control instanceof FirstPersonControls ||
				this.control instanceof PlaneControls ||
				this.control instanceof AVRControls
			) {
				this.control.update(renderTimer.delta);
			} else if (this.control instanceof TransformControls) {
				// pass
			} else {
				this.control.update();
			}
		}
	}
}
