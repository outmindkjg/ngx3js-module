import {
	Component,
	ContentChildren,
	forwardRef,
	Input,
	OnInit,
	QueryList,
	SimpleChanges
} from '@angular/core';
import {
	NgxAbstractThreeController,
	NgxAutoUniformsController
} from '../controller.abstract';
import { NgxAbstractControllerComponent } from '../controller.component.abstract';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { IControlObjectItem, IHtmlCollection, IRendererTimer, INgxColor } from '../ngx-interface';
import { NgxControllerItemComponent } from './controller-item/controller-item.component';

/**
 * NgxControllerComponent
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ControllerComponent) page for details.
 *
 * ```html
 * <ngx3js-controller
 * 	[type]="'tween'" [options]="'once'" [duration]="info.duration"
 * ></ngx3js-controller>
 * <ngx3js-controller>
 * 	<ngx3js-controller-item
 * 		[refRate]="analyser1"
 * 		[type]="'material'"
 * 		[material]="'emissive'"
 * 		[colorType]="'rate'"
 * 	></ngx3js-controller-item>
 * </ngx3js-controller>
 * <ngx3js-controller>
 * 	<ngx3js-controller-item [type]="'autoupdate'"></ngx3js-controller-item>
 * </ngx3js-controller>
 * <ngx3js-controller
 * 	[type]="'uniforms'"
 * 	[controlParams]="{
 * 		key: 'time',
 * 		speed: controls.speed
 * 	}"
 * ></ngx3js-controller>
 * <ngx3js-controller [type]="'auto'">
 * 	<ngx3js-controller-item
 * 		[type]="'uniforms'"
 * 		[uniform]="'cameraPos'"
 * 		[valueType]="'copyposition'"
 * 		[refValue]="camera"
 * 	></ngx3js-controller-item>
 * </ngx3js-controller>
 * ```
 */
@Component({
	selector: 'ngx3js-controller',
	templateUrl: './controller.component.html',
	styleUrls: ['./controller.component.scss'],
	providers: [
		{
			provide: NgxAbstractControllerComponent,
			useExisting: forwardRef(() => NgxControllerComponent),
		},
	],
})
export class NgxControllerComponent
	extends NgxAbstractControllerComponent
	implements OnInit
{
	/**
	 * The type of controller component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public type: string = 'auto';

	/**
	 * The controlComponent of controller component
	 */
	@Input() public controlComponent: {
		new (ref3d: I3JS.Object3D, ref2d: IHtmlCollection): NgxAbstractThreeController;
	} = null;

	/**
	 * The controlParams of controller component
	 */
	@Input() public controlParams: { [key: string]: any } = null;

	/**
	 * The curve of controller component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public curve: string = null;

	/**
	 * The scale of controller component
	 */
	@Input() public scale: number = null;

	/**
	 * The radius of controller component
	 */
	@Input() public radius: number = null;

	/**
	 * The radiusX of controller component
	 */
	@Input() public radiusX: number = null;

	/**
	 * The radiusY of controller component
	 */
	@Input() public radiusY: number = null;

	/**
	 * The radiusZ of controller component
	 */
	@Input() public radiusZ: number = null;

	/**
	 * The rotationX of controller component
	 */
	@Input() public rotationX: number = null;

	/**
	 * The rotationY of controller component
	 */
	@Input() public rotationY: number = null;

	/**
	 * The rotationZ of controller component
	 */
	@Input() public rotationZ: number = null;

	/**
	 * The centerX of controller component
	 */
	@Input() public centerX: number = null;

	/**
	 * The centerY of controller component
	 */
	@Input() public centerY: number = null;

	/**
	 * The centerZ of controller component
	 */
	@Input() public centerZ: number = null;

	/**
	 * The duration of controller component
	 */
	@Input() public duration: number = null;

	/**
	 * The delta of controller component
	 */
	@Input() public delta: number = null;

	/**
	 * The multiply of controller component
	 */
	@Input() public multiply: number = null;

	/**
	 * The options of controller component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public options: string = null;

	/**
	 * The visible of controller component
	 */
	@Input() public visible: boolean = false;

	/**
	 * The color of controller component
	 */
	@Input() public color: INgxColor = null;

	/**
	 * The opacity of controller component
	 */
	@Input() public opacity: number = null;

	/**
	 * The tubularSegments of controller component
	 */
	@Input() public tubularSegments: number = null;

	/**
	 * The tubeRadius of controller component
	 */
	@Input() public tubeRadius: number = null;

	/**
	 * The tubeRadiusSegments of controller component
	 */
	@Input() public tubeRadiusSegments: number = null;

	/**
	 * The closed of controller component
	 */
	@Input() public closed: boolean = null;

	/**
	 * The material of controller component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public material: string = null;

	/**
	 * The useEvent of controller component
	 */
	@Input() public useEvent: boolean = false;

	/**
	 * The eventSeqn of controller component
	 */
	@Input() public eventSeqn: number = 1000;

	/**
	 * The mstDuration of controller component
	 */
	@Input() public mstDuration: number = null;

	/**
	 * Content children of controller component
	 */
	@ContentChildren(NgxControllerItemComponent, { descendants: false })
	controllerItemList: QueryList<NgxControllerItemComponent>;

	/**
	 * Creates an instance of controller component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('controller');
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
		if (changes && (this._controller !== null || this.pathGuide !== null)) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
		this.subscribeListQueryChange(
			this.controllerItemList,
			'controllerItemList',
			'controllerItem'
		);
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		if (this._controller !== null || this._controllerItems !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getController();
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, ['type', 'object3d', 'object2d'])) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, [
					'controlparams',
					'render',
					'position',
				]);
			}
			if (NgxThreeUtil.isIndexOf(changes, 'render')) {
				changes = NgxThreeUtil.pushUniq(changes, ['scene', 'canvas']);
			}
			if (this._controller !== null && this._renderer !== null) {
				changes.forEach((change) => {
					switch (change.toLowerCase()) {
						case 'controlparams':
							this._controller.setVariables(this.controlParams);
							break;
						case 'render':
							this._controller.setRenderer(
								this._renderer,
								this._scenes,
								this._cameras,
								this._canvas2ds
							);
							break;
						case 'scene':
							if (this._scene !== null) {
								this._controller.setScene(this._scene);
							}
							break;
						case 'canvas':
							if (this._canvas !== null) {
								this._controller.setCanvas(this._canvas);
							}
							break;
					}
				});
			} else if (this._controllerItems !== null) {
				if (
					NgxThreeUtil.isIndexOf(changes, [
						'controlleritem',
						'scale',
						'radius',
						'radiusx',
						'radiusy',
						'radiusz',
						'rotationx',
						'rotationy',
						'rotationz',
						'centerx',
						'centery',
						'centerz',
						'duration',
						'delta',
						'multiply',
						'options',
						'controlleritem',
						'color',
						'opacity',
						'tubularsegments',
						'thubradius',
						'tuberadiussegments',
						'closed',
						'material',
					])
				) {
					this.needUpdate = true;
					return;
				}
				changes.forEach((change) => {
					switch (change.toLowerCase()) {
						case 'visible':
							if (this.pathGuide !== null) {
								this.pathGuide.visible = NgxThreeUtil.getTypeSafe(
									this.visible,
									false
								);
							}
							break;
						case 'position':
							this.refreshRefObject3dPosition();
							break;
					}
				});
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * The Controller of controller component
	 */
	private _controller: NgxAbstractThreeController = null;

	/**
	 * Path guide of controller component
	 */
	private pathGuide: I3JS.Object3D = null;

	/**
	 * Ref object3dposition of controller component
	 */
	private refObject3dposition: I3JS.Vector3 = new N3JS.Vector3();

	/**
	 * The Duration of controller component
	 */
	private _duration: number = 1;

	/**
	 * Refreshs ref object3d position
	 */
	public refreshRefObject3dPosition() {
		if (NgxThreeUtil.isNotNull(this.refObject3d)) {
			if (NgxThreeUtil.isNotNull(this.refObject3d.userData.initPosition)) {
				this.refObject3dposition.copy(this.refObject3d.userData.initPosition);
			} else {
				this.refObject3dposition.copy(this.refObject3d.position);
			}
			if (this.pathGuide !== null) {
				this.pathGuide.children[0].position.copy(this.refObject3dposition);
			}
			this._controlItem.object3d = this.refObject3d;
			this._controlItem.component = NgxThreeUtil.getThreeComponent(
				this.refObject3d
			);
			this._controlItem.position = this.refObject3d.position;
			this._controlItem.rotation = this.refObject3d.rotation;
			this._controlItem.scale = this.refObject3d.scale;
			if (this.refObject3d instanceof N3JS.Mesh) {
				if (Array.isArray(this.refObject3d.material)) {
					if (this.refObject3d.material.length > 0) {
						this._controlItem.material = this.refObject3d.material[0];
					} else {
						this._controlItem.material = null;
					}
				} else {
					this._controlItem.material = this.refObject3d.material;
				}
				if (
					NgxThreeUtil.isNotNull(this._controlItem.material) &&
					this._controlItem.material instanceof N3JS.ShaderMaterial
				) {
					this._controlItem.uniforms = this._controlItem.material.uniforms;
				} else {
					this._controlItem.uniforms = null;
				}
				this._controlItem.geometry = this.refObject3d.geometry;
				this._controlItem.attributes = this._controlItem.geometry.attributes;
				this._controlItem.morphAttributes =
					this._controlItem.geometry.morphAttributes;
			} else {
				this._controlItem.material = null;
				this._controlItem.geometry = null;
				this._controlItem.uniforms = null;
				this._controlItem.attributes = null;
				this._controlItem.morphAttributes = null;
			}
		}
	}

	/**
	 * Control item of controller component
	 */
	private _controlItem: IControlObjectItem = {
		object3d: null,
		component: null,
		position: null,
		rotation: null,
		scale: null,
		material: null,
		uniforms: null,
		geometry: null,
		attributes: null,
		morphAttributes: null,
	};

	/**
	 * Controller items of controller component
	 */
	private _controllerItems: NgxControllerItemComponent[] = null;

	/**
	 * Gets controller
	 */
	public getController(): void {
		if (
			(this.refObject3d !== null || this.refObject2d !== null) &&
			this._needUpdate &&
			NgxThreeUtil.isNotNull(this.controllerItemList)
		) {
			this.needUpdate = false;
			this._controllerItems = null;
			this._controller = null;
			let controller: any = null;
			this._duration = NgxThreeUtil.getTypeSafe(this.mstDuration, 1);
			if (this.pathGuide !== null) {
				this.pathGuide.parent.remove(this.pathGuide);
				this.pathGuide = null;
			}
			if (typeof this.type === 'string') {
				switch (this.type.toLowerCase()) {
					case 'uniforms':
						controller = NgxAutoUniformsController;
						break;
					case 'auto':
						if (NgxThreeUtil.isNotNull(this.controlComponent)) {
							controller = this.controlComponent;
						} else {
							controller = 'auto';
						}
						break;
					default:
						controller = this.type;
						break;
				}
			} else {
				controller = this.type;
			}
			if (NgxThreeUtil.isNotNull(controller)) {
				if (typeof controller === 'string' && this.refObject3d !== null) {
					const controllerItemList: NgxControllerItemComponent[] = [];
					if (this.pathGuide === null) {
						this.pathGuide = new N3JS.Group();
						this.pathGuide.add(new N3JS.Group());
						if (this.visible) {
							this.refObject3d.parent.add(this.pathGuide as any);
						}
					} else if (
						this.visible &&
						this.refObject3d.parent !== this.pathGuide.parent
					) {
						this.refObject3d.parent.add(this.pathGuide as any);
					}
					switch (controller.toLowerCase()) {
						case 'positionlookat':
						case 'position':
						case 'scale':
						case 'rotation':
						case 'lookat':
						case 'material':
						case 'tween':
						case 'uniforms':
							const controllerItem = this.initLocalComponent(
								'controllerItem',
								new NgxControllerItemComponent()
							);
							controllerItem.updateInputParams({
								type: controller,
								curve: this.curve,
								scale: this.scale,
								radius: this.radius,
								radiusX: this.radiusX,
								radiusY: this.radiusY,
								radiusZ: this.radiusZ,
								rotationX: this.rotationX,
								rotationY: this.rotationY,
								rotationZ: this.rotationZ,
								centerX: this.centerX,
								centerY: this.centerY,
								centerZ: this.centerZ,
								duration: this.duration,
								delta: this.delta,
								multiply: this.multiply,
								options: this.options,
								color: this.color,
								opacity: this.opacity,
								tubularSegments: this.tubularSegments,
								tubeRadius: this.tubeRadius,
								tubeRradiusSegments: this.tubeRadiusSegments,
								closed: this.closed,
								visible: this.visible,
								material: this.material,
							});
							controllerItemList.push(
								controllerItem.getController(this._controlItem, this.pathGuide)
							);
							break;
					}
					if (
						NgxThreeUtil.isNotNull(this.controllerItemList) &&
						this.controllerItemList.length > 0
					) {
						this.controllerItemList.forEach((controllerItem) => {
							controllerItemList.push(
								controllerItem.getController(this._controlItem, this.pathGuide)
							);
						});
					}
					this._controllerItems = controllerItemList;
					super.setObject(this._controllerItems);
				} else {
					this._controller = new controller(this.refObject3d, this.refObject2d);
					this._controller.setVariables(this.controlParams);
					this._controller.awake();
					super.setObject(this._controller);
				}
			}
		}
	}

	/**
	 * Log seqn of controller component
	 */
	private _logSeqn: number = 0;

	/**
	 * Render time of controller component
	 */
	private renderTime: number = 0;

	/**
	 * Updates controller component
	 * @param rendererTimer
	 */
	public update(rendererTimer: IRendererTimer) {
		if (this._controller !== null) {
			this._controller.update(rendererTimer);
		} else if (this.refObject3d !== null && this._controllerItems !== null) {
			const events: string[] = [];
			if (this._event !== null && false) {
				this.renderTime +=
					(this._event.direction.y / 1000) * rendererTimer.delta;
			} else {
				this.renderTime += rendererTimer.delta / this._duration;
			}
			const dirIRendererTimer: IRendererTimer = {
				elapsedTime: this.renderTime,
				delta: rendererTimer.delta / this._duration,
			};
			this._controllerItems.forEach((item) => {
				item.update(dirIRendererTimer, events);
			});
			if (this.useEvent && events.length > 0) {
				if (
					this._logSeqn % this.eventSeqn === 0 &&
					NgxThreeUtil.isNotNull(this.refObject3d.userData.component) &&
					NgxThreeUtil.isNotNull(
						this.refObject3d.userData.component.setSubscribeNext
					)
				) {
					this.refObject3d.userData.component.setSubscribeNext(events);
				}
				this._logSeqn++;
			}
		} else {
			this.consoleLogTime('controller', rendererTimer);
		}
	}
}
