import {
	Component,
	forwardRef,
	Input,
	OnInit,
	SimpleChanges
} from '@angular/core';
import { INgxColor } from '../ngx-interface';
import { NgxAbstractObject3dComponent } from '../object3d.abstract';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { I3JS, N3JS, NgxThreeUtil } from './../interface';

/**
 * The Helper component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/HelperComponent) page for details.
 *
 * ```html
 * <ngx3js-helper
 * 	[type]="'GridHelper'" [size]="500" [divisions]="100 "
 * 	[color1]="'0x000000'" [opacity]="0.2"
 * ></ngx3js-helper>
 * <ngx3js-helper
 * 	[type]="'Camera'" [target]="sunLight "
 * 	[visible]="true"
 * ></ngx3js-helper>
 * <ngx3js-helper
 * 	[visible]="false" [type]="'csmhelper'" [control]="csm"
 * 	(onLoad)="setHelper($event)"
 * ></ngx3js-helper>
 * <ngx3js-helper
 * 	[type]="'arrowhelper'"
 * 	[arrowFrom]="sunLight" [arrowTo]="scene"
 * 	[length]="0.9" [color]="'0xffff00'" [headLength]="0.25"
 * 	[headWidth]="0.08"
 * ></ngx3js-helper>
 * ```
 */
@Component({
	selector: 'ngx3js-helper',
	templateUrl: './helper.component.html',
	styleUrls: ['./helper.component.scss'],
	providers: [
		{
			provide: NgxAbstractObject3dComponent,
			useExisting: forwardRef(() => NgxHelperComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxHelperComponent),
		},
	],
})
export class NgxHelperComponent
	extends NgxAbstractObject3dComponent
	implements OnInit
{
	/**
	 * the type of helper
	 *
	 * Notice - case insensitive.
	 *
	 * @see Gyroscope - Gyroscope
	 * @see CSM - CSM
	 * @see THREE.ArrowHelper - ArrowHelper, Arrow
	 * @see THREE.BoxHelper - BoxHelper, Box
	 * @see THREE.Box3Helper - Box3Helper, Box3
	 * @see THREE.GridHelper - GridHelper, Grid
	 * @see THREE.PolarGridHelper - PolarGridHelper, PolarGrid
	 * @see PositionalAudioHelper - PositionalAudioHelper, PositionalAudio
	 * @see THREE.CameraHelper - CameraHelper, Camera
	 * @see THREE.DirectionalLightHelper - DirectionalLightHelper, DirectionalLight, Directional, Light
	 * @see THREE.HemisphereLightHelper - HemisphereLightHelper, HemisphereLight, Hemisphere, Light
	 * @see THREE.PointLightHelper - PointLightHelper, PointLightHelper, PointLight, Light
	 * @see THREE.SpotLightHelper - SpotLightHelper, SpotLight, Light
	 * @see RectAreaLightHelper - RectAreaLightHelper, RectAreaLight, Light
	 * @see LightProbeHelper - LightProbeHelper, LightProbe, Light
	 * @see THREE.PlaneHelper - PlaneHelper, Plane
	 * @see VertexTangentsHelper - VertexTangentsHelper, VertexTangents
	 * @see VertexNormalsHelper - VertexNormalsHelper, VertexNormals
	 * @see THREE.SkeletonHelper - SkeletonHelper, Skeleton
	 * @see THREE.AxesHelper - AxesHelper, Axes
	 */
	@Input() public type: string = 'axes';

	/**
	 * color -- The desired color.
	 */
	@Input() public color: string | number = null;

	/**
	 * The target object of helper
	 */
	@Input() public target: any = null;

	/**
	 * size of the lines representing the axes. Default is *1*.
	 */
	@Input() public size: number = null;

	/**
	 * The radius of the polar grid. This can be any positive number. Default is 10.
	 */
	@Input() public radius: number = null;

	/**
	 * The number of radial lines. This can be any positive integer. Default is 16.
	 */
	@Input() public radials: number = null;

	/**
	 * The number of circles. This can be any positive integer. Default is 8.
	 */
	@Input() public circles: number = null;

	/**
	 * The number of line segments used for each circle. This can be any positive integer that is 3 or greater. Default is 64.
	 */
	@Input() public divisions: number = null;

	/**
	 * The first color used for grid elements. This can be a [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Color), a hexadecimal value and an CSS-Color name. Default is 0x444444
	 */
	@Input() public color1: INgxColor = null;

	/**
	 * The second color used for grid elements. This can be a [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Color), a hexadecimal value and an CSS-Color name. Default is 0x888888
	 */
	@Input() public color2: INgxColor = null;

	/**
	 * Float in the range of *0.0* - *1.0* indicating how transparent the material is.
	 */
	@Input() public opacity: number = null;

	/**
	 * Whether rendering this material has any effect on the depth buffer. Default is *true*.
	 */
	@Input() public depthWrite: boolean = null;

	/**
	 * The color of material
	 */
	@Input() public materialColor: INgxColor = null;

	/**
	 * The Input of helper component
	 *
	 * Notice - case insensitive.
	 *
	 * Which blending to use when displaying objects with this material. Default is {@link NormalBlending}.
	 *
	 * @default THREE.NormalBlending
	 *
	 * @see THREE.NoBlending - NoBlending, No
	 * @see THREE.NormalBlending - NormalBlending, Normal
	 * @see THREE.AdditiveBlending - AdditiveBlending, Additive
	 * @see THREE.SubtractiveBlending - SubtractiveBlending, Subtractive
	 * @see THREE.MultiplyBlending - MultiplyBlending, Multiply
	 * @see THREE.CustomBlending - CustomBlending, Custom
	 */
	@Input() public materialBlending: string = null;

	/**
	 * Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects.
	 * When set to true, the extent to which the material is transparent is controlled by setting it's .opacity property.
	 * Default is false.
	 * @default false
	 */
	@Input() public materialTransparent: boolean = null;

	/**
	 * X Direction from origin. Must be a unit vector.
	 *
	 */
	@Input() public dirX: number = null;

	/**
	 * Y Direction from origin. Must be a unit vector.
	 */
	@Input() public dirY: number = null;

	/**
	 * Z Direction from origin. Must be a unit vector.
	 */
	@Input() public dirZ: number = null;

	/**
	 * X Point at which the arrow starts.
	 */
	@Input() public originX: number = null;

	/**
	 * Y Point at which the arrow starts.
	 */
	@Input() public originY: number = null;

	/**
	 * Z Point at which the arrow starts.
	 */
	@Input() public originZ: number = null;

	/**
	 * Point at which the arrow starts.
	 */
	@Input() public arrowFrom: any = null;

	/**
	 * Point at which the arrow end.
	 */
	@Input() public arrowTo: any = null;

	/**
	 * length of the arrow. Default is *1*.
	 */
	@Input() public length: number = null;

	/**
	 * The length of the head of the arrow. Default is 0.2 * length.
	 */
	@Input() public headLength: number = null;

	/**
	 * The width of the head of the arrow. Default is 0.2 * headLength.
	 */
	@Input() public headWidth: number = null;

	/**
	 * Update matrix for this helper
	 */
	@Input() public matrix: I3JS.Matrix4 = null;

	/**
	 * this children of Gyroscope
	 */
	@Input() public children: any[] = null;

	/**
	 * The cms control of CSMHelper
	 */
	@Input() public control: any = null;

	/**
	 * the range of PositionalAudioHelper
	 */
	@Input() public range: number = null;

	/**
	 * the divisionsInnerAngle of PositionalAudioHelper
	 */
	@Input() public divisionsInnerAngle: number = null;

	/**
	 * the divisionsOuterAngle of PositionalAudioHelper
	 */
	@Input() public divisionsOuterAngle: number = null;

	/**
	 * Gets target
	 *
	 * @param [target]
	 * @returns target
	 */
	private getTarget(target?: I3JS.Object3D): I3JS.Object3D {
		this.unSubscribeRefer('target');
		let targetMesh: I3JS.Object3D = null;
		if (NgxThreeUtil.isNotNull(this.target)) {
			targetMesh = NgxThreeUtil.getObject3d(this.target, false);
			this.subscribeRefer(
				'target',
				NgxThreeUtil.getSubscribe(
					this.target,
					() => {
						this.needUpdate = true;
					},
					'loaded'
				)
			);
		}
		if (targetMesh === null && NgxThreeUtil.isNotNull(target)) {
			targetMesh = NgxThreeUtil.getObject3d(target, false);
		}
		if (
			NgxThreeUtil.isNotNull(targetMesh) &&
			targetMesh instanceof N3JS.Object3D &&
			NgxThreeUtil.isNotNull(targetMesh.userData.refTarget)
		) {
			targetMesh =
				NgxThreeUtil.getObject3d(targetMesh.userData.refTarget, false) ||
				targetMesh;
		}
		return targetMesh;
	}

	/**
	 * Gets size
	 *
	 * @param [def]
	 * @returns size
	 */
	private getSize(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.size, def);
	}

	/**
	 * Gets color
	 * @param [def]
	 * @returns color
	 */
	private getColor(def?: number | string): I3JS.Color {
		return NgxThreeUtil.getColorSafe(this.color, def);
	}

	/**
	 * Gets color hex
	 * @param [def]
	 * @returns color hex
	 */
	private getColorHex(def?: number | string): number {
		const color = this.getColor(def);
		if (NgxThreeUtil.isNotNull(color)) {
			return color.getHex();
		} else {
			return undefined;
		}
	}

	/**
	 * Gets radius
	 * @param [def]
	 * @returns radius
	 */
	private getRadius(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.radius, def);
	}

	/**
	 * Gets radials
	 * @param [def]
	 * @returns radials
	 */
	private getRadials(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.radials, def);
	}

	/**
	 * Gets circles
	 * @param [def]
	 * @returns circles
	 */
	private getCircles(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.circles, def);
	}

	/**
	 * Gets divisions
	 * @param [def]
	 * @returns divisions
	 */
	private getDivisions(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.divisions, def);
	}

	/**
	 * Gets color1
	 * @param [def]
	 * @returns color1
	 */
	private getColor1(def?: INgxColor): I3JS.Color {
		return NgxThreeUtil.getColorSafe(this.color1, this.color, def);
	}

	/**
	 * Gets color2
	 * @param [def]
	 * @returns color2
	 */
	private getColor2(def?: INgxColor): I3JS.Color {
		return NgxThreeUtil.getColorSafe(this.color2, this.color1 || this.color, def);
	}

	/**
	 * Gets opacity
	 * @param [def]
	 * @returns opacity
	 */
	private getOpacity(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.opacity, def);
	}

	/**
	 * Gets depth write
	 * @param [def]
	 * @returns true if depth write
	 */
	private getDepthWrite(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.depthWrite, def);
	}

	/**
	 * Direction from origin. Must be a unit vector.
	 *
	 * @param [def]
	 * @returns dir
	 */
	private getDirection(def?: I3JS.Vector3): I3JS.Vector3 {
		if (
			NgxThreeUtil.isNotNull(this.arrowFrom) &&
			NgxThreeUtil.isNotNull(this.arrowTo)
		) {
			const arrowFrom: I3JS.Vector3 = this.getObjectPosition(this.arrowFrom);
			const arrowTo: I3JS.Vector3 = this.getObjectPosition(this.arrowTo);
			const arrowDirection = new N3JS.Vector3();
			arrowDirection.subVectors(arrowTo, arrowFrom).normalize();
			return arrowDirection;
		} else {
			return NgxThreeUtil.getTypeSafe(
				NgxThreeUtil.getVector3Safe(this.dirX, this.dirY, this.dirZ),
				def
			);
		}
	}

	/**
	 * Gets origin
	 * @param [def]
	 * @returns origin
	 */
	private getOrigin(def?: I3JS.Vector3): I3JS.Vector3 {
		let origin: I3JS.Vector3 = def;
		if (NgxThreeUtil.isNotNull(this.arrowFrom)) {
			origin = this.getObjectPosition(this.arrowFrom);
		}
		if (
			NgxThreeUtil.isNotNull(this.originX) &&
			NgxThreeUtil.isNotNull(this.originY) &&
			NgxThreeUtil.isNotNull(this.originZ)
		) {
			origin = origin.clone();
			origin.add(
				NgxThreeUtil.getTypeSafe(
					NgxThreeUtil.getVector3Safe(this.originX, this.originY, this.originZ),
					def
				)
			);
		}
		return origin;
	}

	/**
	 * Gets object position
	 *
	 * @param obj
	 * @returns object position
	 */
	private getObjectPosition(obj: any): I3JS.Vector3 {
		if (NgxThreeUtil.isNotNull(obj)) {
			if (obj instanceof N3JS.Vector3) {
				return obj;
			} else if (NgxThreeUtil.isNotNull(obj.getPosition)) {
				return obj.getPosition();
			} else if (NgxThreeUtil.isNotNull(obj.position)) {
				return obj.position;
			}
		}
		return new N3JS.Vector3(0, 0, 0);
	}

	/**
	 * Gets length
	 * @param [def]
	 * @returns length
	 */
	private getLength(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.length, def);
	}

	/**
	 * Gets head length
	 * @param [def]
	 * @returns head length
	 */
	private getHeadLength(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.headLength, def);
	}

	/**
	 * Gets head width
	 * @param [def]
	 * @returns head width
	 */
	private getHeadWidth(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.headWidth, def);
	}

	/**
	 * Creates an instance of helper component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('helper');
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
		if (changes && this.helper) {
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
	 * Sets update
	 */
	public setUpdate() {
		if (NgxThreeUtil.isNotNull(this.helper)) {
			const helper: any = this.helper;
			if (NgxThreeUtil.isNotNull(helper.update)) {
				if (helper instanceof N3JS.SkeletonHelper) {
				} else {
					window.setTimeout(() => {
						helper.update();
					}, 100);
				}
			}
		}
	}

	/**
	 * The Helper of helper component
	 */
	private helper: I3JS.Object3D = null;

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: I3JS.Object3D): boolean {
		if (super.setParent(parent)) {
			this.getHelper();
			this.unSubscribeRefer('helperReset');
			this.subscribeRefer(
				'helperReset',
				NgxThreeUtil.getSubscribe(
					this.parentObject3d,
					() => {
						this.needUpdate = true;
					},
					'loaded'
				)
			);
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
		if (this.helper !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getObject3d();
				return;
			}
			if (!NgxThreeUtil.isOnlyIndexOf(changes, [], this.OBJECT3D_ATTR)) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, ['update']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'update':
						this.setUpdate();
						break;
					default:
						break;
				}
			});
			super.applyChanges3d(changes);
		}
	}

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T extends I3JS.Object3D>(): T {
		return this.getHelper();
	}

	/**
	 * Gets helper
	 * @template T
	 * @returns helper
	 */
	public getHelper<T extends I3JS.Object3D>(): T {
		if (this.helper === null || this._needUpdate) {
			this.needUpdate = false;
			this.removeObject3d(this.helper);
			if (this.parentObject3d !== null) {
				this.parentObject3d.updateMatrixWorld(true);
			}
			this.helper = null;
			let parentAdd: boolean = true;
			let basemesh: any = null;
			switch (this.type.toLowerCase()) {
				case 'gyroscopehelper':
				case 'gyroscope':
					const gyroscope = new N3JS.Gyroscope();
					if (NgxThreeUtil.isNotNull(this.children)) {
						this.children.forEach((child) => {
							if (child.getMesh) {
								gyroscope.add(child.getObject3d());
							} else if (child.getLight) {
								gyroscope.add(child.getObject3d());
							} else if (child.getCamera) {
								gyroscope.add(child.getObject3d());
							}
						});
					}
					basemesh = gyroscope;
					break;
				case 'csmhelper':
				case 'csm':
					let csm = this.control || {};
					if (NgxThreeUtil.isNotNull(csm.getControl)) {
						csm = csm.getControl();
					}
					if (!(csm instanceof N3JS.CSM)) {
						// csm = new CSM({ parent: new THREE.Scene() });
					}
					const csmHelper = new N3JS.CSMHelper(csm);
					basemesh = csmHelper as any;
					break;
				case 'arrowhelper':
				case 'arrow':
					basemesh = new N3JS.ArrowHelper(
						this.getDirection(new N3JS.Vector3(0, 0, 1)),
						this.getOrigin(new N3JS.Vector3(0, 0, 0)),
						this.getLength(1),
						this.getColor(0xffff00),
						this.getHeadLength(),
						this.getHeadWidth()
					);
					break;
				case 'boxhelper':
				case 'box':
					const boxHelper = new N3JS.BoxHelper(
						this.getTarget(this.parent),
						this.getColor(0xffff00)
					);
					basemesh = boxHelper;
					break;
				case 'box3helper':
				case 'box3':
					basemesh = new N3JS.Box3Helper(null);
					break;
				case 'gridhelper':
				case 'grid':
					basemesh = new N3JS.GridHelper(
						this.getSize(10),
						this.getDivisions(10),
						this.getColor1(0x444444),
						this.getColor2(0x888888)
					);
					parentAdd = false;
					break;
				case 'polargridhelper':
				case 'polargrid':
					basemesh = new N3JS.PolarGridHelper(
						this.getRadius(10),
						this.getRadials(16),
						this.getCircles(8),
						this.getDivisions(64),
						this.getColor1(0x444444),
						this.getColor2(0x888888)
					);
					basemesh.receiveShadow = true;
					break;
				case 'positionalaudio':
				case 'positionalaudiohelper':
					let audioTarget = this.getTarget(this.parent);
					if (audioTarget instanceof N3JS.PositionalAudio) {
						const positionalAudioHelper: any = new N3JS.PositionalAudioHelper(
							audioTarget as any,
							NgxThreeUtil.getTypeSafe(this.range, 1),
							NgxThreeUtil.getTypeSafe(this.divisionsInnerAngle, 16),
							NgxThreeUtil.getTypeSafe(this.divisionsOuterAngle, 2)
						);
						parentAdd = false;
						if (positionalAudioHelper.audio.buffer === null) {
							this.subscribeRefer(
								'audioload',
								NgxThreeUtil.getSubscribe(
									audioTarget,
									() => {
										positionalAudioHelper.material[0].visible = true;
										this.addChanges('update');
									},
									'loaded'
								)
							);
						}
						basemesh = positionalAudioHelper;
					} else {
						basemesh = new N3JS.AxesHelper(this.getSize(10));
					}
					break;
				case 'camerahelper':
				case 'camera':
					let cameraTarget = this.getTarget(this.parent);
					if (
						cameraTarget instanceof N3JS.Light &&
						cameraTarget.shadow.camera
					) {
						basemesh = new N3JS.CameraHelper(cameraTarget.shadow.camera);
					} else if (cameraTarget instanceof N3JS.Camera) {
						basemesh = new N3JS.CameraHelper(cameraTarget);
					} else {
						basemesh = new N3JS.AxesHelper(this.getSize(10));
					}
					break;
				case 'directionallighthelper':
				case 'hemispherelighthelper':
				case 'rectarealighthelper':
				case 'pointlighthelper':
				case 'spotlighthelper':
				case 'lightprobehelper':
				case 'lighthelper':
				case 'directionallight':
				case 'hemispherelight':
				case 'rectarealight':
				case 'pointlight':
				case 'spotlight':
				case 'lightprobe':
				case 'light':
					let lightTarget = this.getTarget(this.parent);
					if (lightTarget instanceof N3JS.DirectionalLight) {
						basemesh = new N3JS.DirectionalLightHelper(
							lightTarget,
							this.getSize(10),
							this.getColor()
						);
					} else if (lightTarget instanceof N3JS.HemisphereLight) {
						basemesh = new N3JS.HemisphereLightHelper(
							lightTarget,
							this.getSize(10),
							this.getColor()
						);
					} else if (lightTarget instanceof N3JS.PointLight) {
						basemesh = new N3JS.PointLightHelper(
							lightTarget,
							this.getSize(10),
							this.getColor()
						);
					} else if (lightTarget instanceof N3JS.SpotLight) {
						basemesh = new N3JS.SpotLightHelper(lightTarget, this.getColor());
					} else if (lightTarget instanceof N3JS.RectAreaLight) {
						basemesh = new N3JS.RectAreaLightHelper(
							lightTarget as any,
							this.getColor() as any
						);
					} else if (lightTarget instanceof N3JS.LightProbe) {
						basemesh = new N3JS.LightProbeHelper(
							lightTarget as any,
							this.getSize(10)
						);
					}
					break;
				case 'planehelper':
				case 'plane':
					if (
						this.parent instanceof N3JS.Mesh &&
						this.parent.material instanceof N3JS.Material
					) {
						basemesh = new N3JS.Group();
						const clippingPlanes: I3JS.Plane[] =
							this.parent.material.clippingPlanes;
						if (clippingPlanes !== null && clippingPlanes !== undefined) {
							clippingPlanes.forEach((clippingPlane) => {
								basemesh.add(
									new N3JS.PlaneHelper(
										clippingPlane,
										this.getSize(10),
										this.getColorHex()
									)
								);
							});
						}
					} else {
						basemesh = null;
					}
					break;
				case 'vertexnormalshelper':
				case 'vertextangentshelper':
				case 'vertexnormals':
				case 'vertextangents':
					const vertexMesh = this.getTarget(this.parent);
					if (
						vertexMesh instanceof N3JS.Mesh &&
						vertexMesh.geometry instanceof N3JS.BufferGeometry &&
						vertexMesh.geometry.attributes.normal
					) {
						vertexMesh.geometry.computeTangents();
						// this.parent.updateMatrixWorld( true );
						if (NgxThreeUtil.isNotNull(vertexMesh.parent)) {
							vertexMesh.parent.updateMatrixWorld(true);
						}
						switch (this.type.toLowerCase()) {
							case 'vertextangentshelper':
							case 'vertextangents':
								basemesh = new N3JS.VertexTangentsHelper(
									vertexMesh as any,
									this.getSize(),
									this.getColorHex()
								);
								break;
							case 'vertexnormalshelper':
							case 'vertexnormals':
							default:
								basemesh = new N3JS.VertexNormalsHelper(
									vertexMesh as any,
									this.getSize(),
									this.getColorHex()
								);
								break;
						}
					} else {
						basemesh = new N3JS.AxesHelper(this.getSize(10));
					}
					break;
				case 'skeletonhelper':
				case 'skeleton':
					basemesh = new N3JS.SkeletonHelper(this.getTarget(this.parent));
					break;
				case 'axeshelper':
				case 'axes':
				default:
					basemesh = new N3JS.AxesHelper(this.getSize(10));
					parentAdd = false;
					break;
			}
			if (basemesh !== null) {
				if (
					basemesh instanceof N3JS.Line &&
					NgxThreeUtil.isNotNull(basemesh.material) &&
					basemesh.material instanceof N3JS.Material
				) {
					const opacity = this.getOpacity(1);
					const basemeshMaterial: any = basemesh.material;
					if (opacity >= 0 && opacity < 1) {
						basemeshMaterial.opacity = opacity;
						basemeshMaterial.transparent = true;
					} else if (NgxThreeUtil.isNotNull(this.materialTransparent)) {
						basemeshMaterial.transparent = this.materialTransparent;
					}
					if (
						NgxThreeUtil.isNotNull(this.materialColor) &&
						basemeshMaterial['color'] !== undefined
					) {
						basemeshMaterial['color'] = NgxThreeUtil.getColorSafe(
							this.materialColor
						);
					}
					if (NgxThreeUtil.isNotNull(this.materialBlending)) {
						basemeshMaterial.blending = NgxThreeUtil.getBlendingSafe(
							this.materialBlending,
							'NormalBlending'
						);
					}
					if (NgxThreeUtil.isNotNull(this.depthWrite)) {
						basemeshMaterial.depthWrite = this.getDepthWrite(false);
					}
				}
				if (NgxThreeUtil.isNotNull(this.matrix)) {
					basemesh.applyMatrix4(this.matrix);
				}
			} else {
				basemesh = new N3JS.Group();
				parentAdd = false;
			}
			this.helper = basemesh;
			if (!parentAdd) {
				this.setObject3d(this.helper);
			} else {
				this.setParentObject3d(this.helper);
			}
		}
		return this.helper as T;
	}
}
