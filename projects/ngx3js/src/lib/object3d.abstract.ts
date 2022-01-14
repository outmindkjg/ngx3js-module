import {
	AfterContentInit,
	Component,
	ContentChildren,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	QueryList,
	SimpleChanges
} from '@angular/core';
import { NgxAnimationGroupComponent } from './animation-group/animation-group.component';
import { NgxAbstractControllerComponent } from './controller.component.abstract';
import { NgxAbstractGeometryComponent } from './geometry.abstract';
import { I3JS, N3JS, NgxThreeUtil } from './interface';
import { NgxLookatComponent } from './lookat/lookat.component';
import { NgxAbstractMaterialComponent } from './material.abstract';
import { NgxMixerComponent } from './mixer/mixer.component';
import { ITagAttributes } from './ngx-interface';
import { NgxPositionComponent } from './position/position.component';
import { NgxRigidbodyComponent } from './rigidbody/rigidbody.component';
import { NgxRotationComponent } from './rotation/rotation.component';
import { NgxScaleComponent } from './scale/scale.component';
import { NgxAbstractSubscribeComponent } from './subscribe.abstract';


/**
 * The Abstract Object3d component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAbstractObject3dComponent) page for details.
 *
 * ```ts
 * _@Component({
 * 	providers: [
 * 		{
 * 			provide: NgxAbstractObject3dComponent,
 * 			useExisting: forwardRef(() => NgxXxxComponent),
 * 		},
 * 		{
 * 			provide: NgxAbstractSubscribeComponent,
 * 			useExisting: forwardRef(() => NgxXxxComponent),
 * 		},
 * 	],
 * })
 * export class NgxXxxComponent extends NgxAbstractObject3dComponent implements OnInit {
 * 	constructor() {
 * 		super();
 * 	}
 * }
 * ```
 */
@Component({
	template: '',
})
export class NgxAbstractObject3dComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit, OnChanges, AfterContentInit, OnDestroy
{
	/**
	 * Object gets rendered if *true*. Default is *true*.
	 */
	@Input() public visible: boolean = true;

	/**
	 * The name of the object (doesn't need to be unique). Default is an empty string.
	 */
	@Input() public name: string = '';

	/**
	 * When this is set, it calculates the matrix of position, (rotation or quaternion) and scale every frame and also recalculates the matrixWorld property. Default is [Object3D.DefaultMatrixAutoUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D.DefaultMatrixAutoUpdate) (true).
	 */
	@Input() public matrixAutoUpdate: boolean = null;

	/**
	 * The layer membership of the object. The object is only visible if it has at least one layer in common with the [Camera](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/cameras/Camera) in use. This property can also be used to filter out unwanted objects in ray-intersection tests when using [Raycaster](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Raycaster).
	 */
	@Input() private layers: number | number[] | { [key: number]: boolean } =
		null;

	/**
	 * Whether the object gets rendered into shadow map. Default is *false*.
	 */
	@Input() public castShadow: boolean = null;

	/**
	 * Whether the material receives shadows. Default is *false*.
	 */
	@Input() public receiveShadow: boolean = null;

	/**
	 * When this is set, it checks every frame if the object is in the frustum of the camera before rendering the object. If set to `false` the object gets rendered every frame even if it is not in the frustum of the camera. Default is `true`.
	 */
	@Input() public frustumCulled: boolean = null;

	/**
	 * This value allows the default rendering order of [scene graph](https://en.wikipedia.org/wiki/Scene_graph) objects to be overridden although opaque and transparent objects remain sorted independently. When this property is set for an instance of [Group](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/objects/Group), all descendants objects will be sorted and rendered together.
	 * Sorting is from lowest to highest renderOrder. Default value is *0*.
	 */
	@Input() private renderOrder: number = null;

	/**
	 *
	 */
	@Input() private controller: NgxAbstractControllerComponent = null;

	/**
	 *
	 */
	@Input() private prefab: NgxAbstractObject3dComponent = null;

	/**
	 * A [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector3) representing the object's local position. Default is (0, 0, 0).
	 */
	@Input() private position:
		| I3JS.Vector3
		| number[]
		| NgxPositionComponent
		| any = null;

	/**
	 * Object's local rotation (see [Euler angles](https://en.wikipedia.org/wiki/Euler_angles)), in radians.
	 */
	@Input() private rotation:
		| I3JS.Vector3
		| number[]
		| NgxRotationComponent
		| any = null;

	/**
	 * The object's local scale. Default is [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector3)( 1, 1, 1 ).
	 */
	@Input() private scale: I3JS.Vector3 | number[] | NgxScaleComponent | any =
		null;

	/**
	 * vector - A vector representing a position in world space.
	 * Optionally, the [Object3D.x](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D.x), [Object3D.y](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D.y) and [Object3D.z](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D.z) components of the world space position.
	 * Rotates the object to face a point in world space.
	 * This method does not support objects having non-uniformly-scaled parent(s).
	 */
	@Input() private lookat: I3JS.Vector3 | number[] | NgxLookatComponent | any =
		null;

	/**
	 * The distance at which to display this level of detail.
	 */
	@Input() private loDistance: number = null;

	/**
	 * Custom depth material to be used when rendering to the depth map. Can only be used in context of meshes.
	 * When shadow-casting with a [DirectionalLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/lights/DirectionalLight) or [SpotLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/lights/SpotLight), if you are (a) modifying vertex positions in the vertex shader, (b) using a displacement map, (c) using an alpha map with alphaTest, or (d) using a transparent texture with alphaTest, you must specify a customDepthMaterial for proper shadows. Default is *undefined*.
	 */
	@Input() private customDepth:
		| NgxAbstractMaterialComponent
		| I3JS.Material
		| any = null;

	/**
	 * Same as [Object3D.customDepthMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D.customDepthMaterial), but used with [PointLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/lights/PointLight). Default is *undefined*.
	 */
	@Input() private customDistance:
		| NgxAbstractMaterialComponent
		| I3JS.Material
		| any = null;

	/**
	 * The animaion group of this object 3d
	 */
	@Input() private animationGroup:
		| NgxAnimationGroupComponent
		| I3JS.AnimationObjectGroup = null;

	/**
	 * An optional callback that is executed immediately before a 3D object is rendered.
	 * This function is called with the following parameters: renderer, scene, camera, geometry, material, group.
	 *
	 * Please notice that this callback is only executed for *renderable* 3D objects. Meaning 3D objects which define their visual appearance with geometries and materials like instances of [Mesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/objects/Mesh), [Line](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/objects/Line), [Points](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/objects/Points) or [Sprite](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/objects/Sprite).
	 * Instances of [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D), [Group](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/objects/Group) or [Bone](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/objects/Bone) are not renderable and thus this callback is not executed for such objects.
	 */
	@Input() private onBeforeRender: (
		renderer?: I3JS.WebGLRenderer,
		scene?: I3JS.Scene,
		camera?: I3JS.Camera,
		geometry?: I3JS.BufferGeometry,
		material?: I3JS.Material,
		group?: I3JS.Group
	) => void = null;

	/**
	 * The geometry of mesh
	 */
	@Input() public geometry:
		| NgxAbstractGeometryComponent
		| I3JS.BufferGeometry
		| any = null;

	/**
	 * The material of mesh
	 */
	@Input() public material: NgxAbstractMaterialComponent | I3JS.Material = null;

	/**
	 * The material of mesh is array
	 */
	@Input() public materialIsArray: boolean = null;

	/**
	 * Content children of mesh component
	 */
	@ContentChildren(NgxAbstractGeometryComponent, { descendants: false })
	protected geometryList: QueryList<NgxAbstractGeometryComponent>;

	/**
	 * Content children of abstract object3d component
	 */
	@ContentChildren(NgxAbstractControllerComponent, { descendants: false })
	protected controllerList: QueryList<NgxAbstractControllerComponent>;

	/**
	 * Content children of abstract object3d component
	 */
	@ContentChildren(NgxPositionComponent, { descendants: false }) private positionList: QueryList<NgxPositionComponent>;

	/**
	 * Content children of abstract object3d component
	 */
	@ContentChildren(NgxRotationComponent, { descendants: false }) private rotationList: QueryList<NgxRotationComponent>;

	/**
	 * Content children of abstract object3d component
	 */
	@ContentChildren(NgxScaleComponent, { descendants: false }) private scaleList: QueryList<NgxScaleComponent>;

	/**
	 * Content children of abstract object3d component
	 */
	@ContentChildren(NgxLookatComponent, { descendants: false }) private lookatList: QueryList<NgxLookatComponent>;

	/**
	 * Content children of abstract object3d component
	 */
	@ContentChildren(NgxAbstractMaterialComponent, { descendants: false })
	protected materialList: QueryList<NgxAbstractMaterialComponent>;

	/**
	 * Content children of abstract object3d component
	 */
	@ContentChildren(NgxAbstractObject3dComponent, { descendants: false })
	protected object3dList: QueryList<NgxAbstractObject3dComponent>;

	/**
	 * Content children of abstract object3d component
	 */
	@ContentChildren(NgxRigidbodyComponent, { descendants: false }) private rigidbodyList: QueryList<NgxRigidbodyComponent>;

	/**
	 * Content children of abstract object3d component
	 */
	@ContentChildren(NgxMixerComponent, { descendants: false }) private mixerList: QueryList<NgxMixerComponent>;

	/**
	 * Object3 d attr of abstract object3d component
	 */
	protected OBJECT3D_ATTR: string[] = [
		'name',
		'position',
		'onbeforerender',
		'rotation',
		'scale',
		'layers',
		'visible',
		'castshadow',
		'receiveshadow',
		'frustumculled',
		'renderorder',
		'customdepthmaterial',
		'customdistancematerial',
		'material',
		'lodistance',
		'helper',
		'mixer',
		'animationgroup',
		'prefab',
	];

	/**
	 * Gets lo distance
	 * @param [def]
	 * @returns lo distance
	 */
	private getLoDistance(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.loDistance, def);
	}

	/**
	 * Gets visible
	 * @param [def]
	 * @returns true if visible
	 */
	protected getVisible(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.visible, def);
	}

	/**
	 * Gets name
	 * @param [def]
	 * @returns name
	 */
	protected getName(def?: string): string {
		return NgxThreeUtil.getTypeSafe(this.name, def);
	}

	/**
	 * Creates an instance of abstract object3d component.
	 */
	constructor() {
		super();
		this.OBJECT3D_ATTR.push(...this.OBJECT_ATTR);
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 *
	 * @param subscribeType
	 */
	ngOnInit(subscribeType?: string): void {
		super.ngOnInit(subscribeType || 'object3d');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.object3d !== null) {
			if (this.object3d.parent !== null) {
				this.removeObject3d(this.object3d);
				this.object3d.parent = null;
			}
			this.object3d = null;
		}
		if (this.parentObject3d !== null) {
			this.parentObject3d = null;
		}
		if (this._addedReferChild !== null && this._addedReferChild.length > 0) {
			this._addedReferChild.forEach((child) => {
				this.removeObject3d(child);
			});
			this._addedReferChild = [];
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
		if (changes && this.object3d !== null) {
			if (changes.visible) {
				if (NgxThreeUtil.isNotNull(this.visible)) {
					this.object3d.visible = this.getVisible(true);
				}
				delete changes.visible;
			}
			if (changes.name) {
				if (NgxThreeUtil.isNotNull(this.name)) {
					this.object3d.name = this.getName('no-name');
				}
				delete changes.name;
			}
			if (changes.visible) {
				if (NgxThreeUtil.isNotNull(this.visible)) {
					this.object3d.visible = this.visible;
				}
				delete changes.visible;
			}
			if (changes.frustumCulled) {
				if (NgxThreeUtil.isNotNull(this.frustumCulled)) {
					this.object3d.frustumCulled = this.frustumCulled;
				}
				delete changes.frustumCulled;
			}
			if (changes.castShadow) {
				if (NgxThreeUtil.isNotNull(this.castShadow)) {
					this.object3d.castShadow = this.castShadow;
				}
				delete changes.castShadow;
			}
			if (changes.receiveShadow) {
				if (NgxThreeUtil.isNotNull(this.receiveShadow)) {
					this.object3d.receiveShadow = this.receiveShadow;
				}
				delete changes.receiveShadow;
			}
			if (changes.renderOrder) {
				if (NgxThreeUtil.isNotNull(this.renderOrder)) {
					this.object3d.renderOrder = this.renderOrder;
				}
				delete changes.renderOrder;
			}
			if (changes.matrixAutoUpdate) {
				if (NgxThreeUtil.isNotNull(this.matrixAutoUpdate)) {
					this.object3d.matrixAutoUpdate = this.matrixAutoUpdate;
					this.object3d.updateMatrix();
				}
				delete changes.matrixAutoUpdate;
			}
			if (changes.layers) {
				this.addChanges('layers');
				delete changes.layers;
			}
			if (changes.position) {
				this.addChanges('position');
				delete changes.position;
			}
			if (changes.rotation) {
				this.addChanges('rotation');
				delete changes.rotation;
			}
			if (changes.scale) {
				this.addChanges('scale');
				delete changes.scale;
			}
			if (changes.lookat) {
				this.addChanges('lookat');
				delete changes.lookat;
			}
			if (changes.controller) {
				this.addChanges('controller');
				delete changes.controller;
			}
			if (changes.loDistance) {
				this.addChanges('loDistance');
				delete changes.loDistance;
			}
			if (changes.debug) {
				delete changes.debug;
			}
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(
			this.geometryList,
			'geometryList',
			'geometry'
		);
		this.subscribeListQueryChange(
			this.object3dList,
			'object3dList',
			'object3d'
		);
		this.subscribeListQueryChange(
			this.controllerList,
			'controllerList',
			'controller'
		);
		this.subscribeListQueryChange(
			this.positionList,
			'positionList',
			'position'
		);
		this.subscribeListQueryChange(
			this.rotationList,
			'rotationList',
			'rotation'
		);
		this.subscribeListQueryChange(this.scaleList, 'scaleList', 'scale');
		this.subscribeListQueryChange(this.lookatList, 'lookatList', 'lookat');
		this.subscribeListQueryChange(
			this.materialList,
			'materialList',
			'material'
		);
		this.subscribeListQueryChange(
			this.rigidbodyList,
			'rigidbodyList',
			'rigidbody'
		);
		this.subscribeListQueryChange(this.mixerList, 'mixerList', 'mixer');
		super.ngAfterContentInit();
	}

	/**
	 * Gets materials
	 * @param [parameters]
	 * @param [required]
	 * @returns materials
	 */
	protected getMaterials(
		parameters?: I3JS.MeshBasicMaterialParameters,
		required: boolean = true
	): I3JS.Material | I3JS.Material[] {
		const materials: I3JS.Material[] = [];
		if (this.material !== null && this.material !== undefined) {
			const material = NgxThreeUtil.getMaterialByType(this.material, 'material');
			if (NgxThreeUtil.isNotNull(material)) {
				materials.push(material);
			}
		}
		if (this.materialList !== null && this.materialList.length > 0) {
			this.materialList.forEach((material) => {
				if (material.isMaterialType('material')) {
					materials.push(material.getMaterial());
				}
			});
		}
		if (materials.length == 0 && required) {
			materials.push(new N3JS.MeshBasicMaterial(parameters));
		}
		if (NgxThreeUtil.isNotNull(this.materialIsArray)) {
			if (this.materialIsArray) {
				return materials;
			} else if (materials.length > 0) {
				return materials[0];
			}
		} else {
			if (materials.length == 1) {
				return materials[0];
			} else if (materials.length > 1) {
				return materials;
			}
		}
		return null;
	}

	/**
	 * Gets material one
	 * @param [parameters]
	 * @param [required]
	 * @returns material one
	 */
	protected getMaterialOne(
		parameters?: I3JS.MeshBasicMaterialParameters,
		required: boolean = true
	): I3JS.Material {
		const materials = this.getMaterials(parameters, required);
		if (Array.isArray(materials)) {
			return materials[0];
		} else {
			return materials;
		}
	}

	/**
	 * Gets materials multi
	 * @param [parameters]
	 * @param [required]
	 * @returns materials multi
	 */
	protected getMaterialsMulti(
		parameters?: I3JS.MeshBasicMaterialParameters,
		required: boolean = true
	): I3JS.Material[] {
		const materials = this.getMaterials(parameters, required);
		if (Array.isArray(materials)) {
			return materials;
		} else if (materials !== null) {
			return [materials];
		} else {
			return [];
		}
	}
	/**
	 * Gets geometry
	 * @returns geometry
	 */
	public getGeometry(): I3JS.BufferGeometry {
		let geometry: I3JS.BufferGeometry = null;
		if (this.geometry !== null) {
			return NgxThreeUtil.getGeometry(this.geometry);
		}
		if (this.geometryList !== null && this.geometryList.length > 0) {
			this.geometryList.forEach((geometryCom) => {
				if (geometryCom.isGeometryType()) {
					geometry = geometryCom.getGeometry();
				}
			});
			if (NgxThreeUtil.isNotNull(geometry)) {
				return geometry;
			}
		}
		return new N3JS.BufferGeometry();
	}

	/**
	 * Gets position
	 * @returns position
	 */
	public getPosition(): I3JS.Vector3 {
		if (this.object3d !== null) {
			return this.object3d.position;
		} else if (this.positionList !== null && this.positionList.length > 0) {
			return this.positionList.first.getPosition();
		} else {
			return new N3JS.Vector3(0, 0, 0);
		}
	}

	/**
	 * Sets position
	 * @param x
	 * @param y
	 * @param z
	 * @returns position
	 */
	public setPosition(x: number, y: number, z: number): this {
		if (this.object3d !== null) {
			if (x === null) {
				x = this.object3d.position.x;
			}
			if (y === null) {
				y = this.object3d.position.y;
			}
			if (z === null) {
				z = this.object3d.position.z;
			}
			const position = NgxThreeUtil.getVector3Safe(x, y, z);
			this.object3d.position.copy(position);
		}
		return this;
	}

	/**
	 * Adds position
	 * @param x
	 * @param y
	 * @param z
	 * @returns position
	 */
	public addPosition(x: number, y: number, z: number): this {
		if (this.object3d !== null) {
			if (x === null) {
				x = 0;
			}
			if (y === null) {
				y = 0;
			}
			if (z === null) {
				z = 0;
			}
			x += this.object3d.position.x;
			y += this.object3d.position.y;
			z += this.object3d.position.z;
			const position = NgxThreeUtil.getVector3Safe(x, y, z);
			this.object3d.position.copy(position);
		}
		return this;
	}

	/**
	 * Gets scale
	 * @returns scale
	 */
	public getScale(): I3JS.Vector3 {
		if (this.object3d !== null) {
			return this.object3d.scale;
		} else if (this.scaleList !== null && this.scaleList.length > 0) {
			return this.scaleList.first.getScale();
		} else {
			return new N3JS.Vector3(1, 1, 1);
		}
	}

	/**
	 * Sets scale
	 * @param x
	 * @param y
	 * @param z
	 * @returns scale
	 */
	public setScale(x: number, y: number, z: number): this {
		if (this.object3d !== null) {
			if (x === null) {
				x = this.object3d.scale.x;
			}
			if (y === null) {
				y = this.object3d.scale.y;
			}
			if (z === null) {
				z = this.object3d.scale.z;
			}
			const scale = NgxThreeUtil.getVector3Safe(x, y, z);
			this.object3d.scale.copy(scale);
		}
		return this;
	}

	/**
	 * Sets scale scalar
	 * @param scalar
	 * @returns scale scalar
	 */
	public setScaleScalar(scalar: number): this {
		if (this.object3d !== null) {
			this.object3d.scale.setScalar(scalar);
		}
		return this;
	}

	/**
	 * Gets rotation
	 * @returns rotation
	 */
	public getRotation(): I3JS.Euler {
		if (this.object3d !== null) {
			return this.object3d.rotation;
		} else if (this.rotationList !== null && this.rotationList.length > 0) {
			return this.rotationList.first.getRotation();
		} else {
			return new N3JS.Euler(0, 0, 0);
		}
	}

	/**
	 * Sets rotation
	 * @param x
	 * @param y
	 * @param z
	 * @returns rotation
	 */
	public setRotation(x: number, y: number, z: number): this {
		if (this.object3d !== null) {
			if (x === null) {
				x = (this.object3d.rotation.x / Math.PI) * 180;
			}
			if (y === null) {
				y = (this.object3d.rotation.y / Math.PI) * 180;
			}
			if (z === null) {
				z = (this.object3d.rotation.z / Math.PI) * 180;
			}
			const rotation = NgxThreeUtil.getEulerSafe(x, y, z);
			this.object3d.rotation.copy(rotation);
		}
		return this;
	}

	/**
	 * Adds rotation
	 * @param x
	 * @param y
	 * @param z
	 * @returns rotation
	 */
	public addRotation(x: number, y: number, z: number): this {
		if (this.object3d !== null) {
			x += (this.object3d.rotation.x / Math.PI) * 180;
			y += (this.object3d.rotation.y / Math.PI) * 180;
			z += (this.object3d.rotation.z / Math.PI) * 180;
			const rotation = NgxThreeUtil.getEulerSafe(x, y, z);
			this.object3d.rotation.copy(rotation);
		}
		return this;
	}

	/**
	 * Sets lookat
	 * @param x
	 * @param y
	 * @param z
	 * @returns lookat
	 */
	public setLookat(x: number, y: number, z: number): this {
		if (this.object3d !== null) {
			const position = NgxThreeUtil.getVector3Safe(x, y, z);
			this.object3d.lookAt(position);
			this.object3d.updateMatrixWorld();
		}
		return this;
	}

	/**
	 * Sets visible
	 * @param visible
	 * @param [_]
	 */
	public setVisible(visible: boolean, _: boolean = null) {
		if (this.object3d !== null && visible !== null && visible !== undefined) {
			this.object3d.visible = visible;
			this.visible = visible;
		}
	}

	/**
	 * Gets object by name
	 * @param name
	 * @returns object by name
	 */
	public getObjectByName(name: string): I3JS.Object3D | undefined {
		if (this.object3d !== null) {
			return this.object3d.getObjectByName(name);
		}
		return null;
	}

	/**
	 * Gets object by id
	 * @param id
	 * @returns object by id
	 */
	public getObjectById(id: number): I3JS.Object3D | undefined {
		if (this.object3d !== null) {
			return this.object3d.getObjectById(id);
		}
		return null;
	}

	/**
	 * Gets object by property
	 * @param name
	 * @param value
	 * @returns object by property
	 */
	public getObjectByProperty(
		name: string,
		value: string
	): I3JS.Object3D | undefined {
		if (this.object3d !== null) {
			return this.object3d.getObjectByProperty(name, value);
		}
		return null;
	}

	/**
	 * The Object3d of abstract object3d component
	 */
	protected object3d: I3JS.Object3D = null;

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T extends I3JS.Object3D>(): T {
		return this.object3d as T;
	}

	/**
	 * Gets tag attribute object3d
	 * @param tagAttributes
	 */
	public getTagAttributeObject3d(tagAttributes: ITagAttributes) {
		if (
			tagAttributes.options.position !== null &&
			this.positionList &&
			this.positionList.length > 0
		) {
			tagAttributes.options.position = this.object3d.position;
			tagAttributes.children.push(this.positionList.first);
		}
		if (
			tagAttributes.options.rotation !== null &&
			this.rotationList &&
			this.rotationList.length > 0
		) {
			tagAttributes.options.rotation = this.object3d.rotation;
			tagAttributes.children.push(this.rotationList.first);
		}
	}

	/**
	 * Parent object3d of abstract object3d component
	 */
	protected parentObject3d: I3JS.Object3D = null;

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: I3JS.Object3D): boolean {
		if (super.setParent(parent)) {
			const oldParent = this.parentObject3d;
			this.parentObject3d = parent;
			if (
				this.object3d !== null &&
				this.parentObject3d !== null &&
				this.parentObject3d instanceof N3JS.Object3D
			) {
				if (
					oldParent === this.object3d.parent ||
					this.parentObject3d.parent === null
				) {
					if (this.parentObject3d instanceof N3JS.LOD) {
						this.parentObject3d.addLevel(
							this.object3d as I3JS.Object3D,
							this.getLoDistance(0)
						);
					} else {
						this.parentObject3d.add(this.object3d);
					}
				} else {
					this.parentObject3d.parent.add(this.object3d);
				}
				return false;
			} else {
				return true;
			}
		}
		return false;
	}

	/**
	 * Removes object3d
	 * @param object3d
	 */
	removeObject3d(object3d: I3JS.Object3D) {
		if (object3d !== null && object3d.parent !== null) {
			object3d.traverse((child) => {
				if (child instanceof N3JS.CSS2DObject || child instanceof N3JS.CSS3DObject) {
					if (child.element.parentNode) {
						child.element.parentNode.removeChild(child.element);
					}
				}
			});
			object3d.parent.remove(object3d);
			object3d.parent = null;
		}
	}

	/**
	 * Added refer child of abstract object3d component
	 */
	private _addedReferChild: I3JS.Object3D[] = [];

	/**
	 * Adds parent object3d
	 * @param object3d
	 * @param [changes]
	 */
	public addParentObject3d(
		object3d: I3JS.Object3D,
		changes?: string | string[]
	) {
		if (NgxThreeUtil.isNotNull(this.object3d) && NgxThreeUtil.isNotNull(object3d)) {
			if (this.object3d.parent !== null) {
				this.object3d.parent.add(object3d);
			} else {
				this.object3d.add(object3d);
			}
			this._addedReferChild.push(object3d);
			if (NgxThreeUtil.isNotNull(changes)) {
				this.addChanges(changes);
			}
		}
	}

	/**
	 * Adds child object3d
	 * @param object3d
	 * @param [changes]
	 */
	public addChildObject3d(
		object3d: I3JS.Object3D,
		changes?: string | string[]
	) {
		if (NgxThreeUtil.isNotNull(this.object3d) && NgxThreeUtil.isNotNull(object3d)) {
			if (this._addedReferChild.length > 0) {
				this._addedReferChild.forEach((child) => {
					this.removeObject3d(child);
				});
				this._addedReferChild = [];
			}
			this._addedReferChild.push(object3d);
			this.object3d.add(object3d);
			if (NgxThreeUtil.isNotNull(changes)) {
				this.addChanges(changes);
			}
		}
	}

	/**
	 * Sets parent object3d
	 * @param object3d
	 */
	public setParentObject3d(object3d: I3JS.Object3D) {
		if (NgxThreeUtil.isNotNull(object3d) && this.object3d !== object3d) {
			this.setObject3d(object3d);
			if (this.parentObject3d !== null && this.parentObject3d.parent !== null) {
				this.parentObject3d.parent.add(this.object3d);
			}
		}
	}

	/**
	 * Sets object3d
	 * @param object3d
	 */
	protected setObject3d(object3d: I3JS.Object3D) {
		if (NgxThreeUtil.isNotNull(object3d) && this.object3d !== object3d) {
			if (this.object3d !== null && this.object3d.parent !== null) {
				this.object3d.parent.remove(this.object3d);
			}
			if (
				object3d !== null &&
				this.parentObject3d !== null &&
				object3d.parent !== this.parentObject3d
			) {
				this.parentObject3d.add(object3d);
			}
			if (this._addedReferChild !== null && this._addedReferChild.length > 0) {
				this._addedReferChild.forEach((child) => {
					this.removeObject3d(child);
				});
				this._addedReferChild = [];
			}
			this.object3d = object3d;
			if (this.object3d !== null) {
				this.setTweenTarget(this.object3d);
			}
			super.setObject(this.object3d);
			if (this.object3d !== null) {
				this.cachedPositionList.forEach((position) => {
					position.setObject3d(this.selfAny);
				});
				this.cachedRotationList.forEach((rotation) => {
					rotation.setObject3d(this.selfAny);
				});
				this.cachedScaleList.forEach((scale) => {
					scale.setObject3d(this.selfAny);
				});
				this.cachedLookatList.forEach((lookat) => {
					lookat.setObject3d(this.selfAny);
				});
				this.cachedMaterialList.forEach((material) => {
					material.setObject3d(this.selfAny);
				});
				this.cachedGeometryList.forEach((geometry) => {
					geometry.setObject3d(this.selfAny);
				});
			}
		}
	}

	/**
	 * Gets object top
	 * @returns object top
	 */
	public getObjectTop(): I3JS.Object3D {
		let parent: I3JS.Object3D = this.parent;
		while (parent.parent !== null) {
			parent = parent.parent;
		}
		return parent;
	}

	/**
	 * Applys changes
	 * @param changes
	 */
	protected applyChanges(changes: string[]) {
		this.applyChanges3d(changes);
	}

	private cachedPrefab: I3JS.Object3D = null;
	protected cachedPositionList: NgxPositionComponent[] = [];
	protected cachedRotationList: NgxRotationComponent[] = [];
	protected cachedScaleList: NgxScaleComponent[] = [];
	protected cachedLookatList: NgxLookatComponent[] = [];
	protected cachedMaterialList: NgxAbstractMaterialComponent[] = [];
	protected cachedGeometryList: NgxAbstractGeometryComponent[] = [];

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	protected applyChanges3d(changes: string[]) {
		if (this.object3d !== null) {
			if (NgxThreeUtil.isIndexOf(changes, ['clearinit'])) {
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, ['init'])) {
				changes = NgxThreeUtil.pushUniq(changes, [
					'position',
					'rotation',
					'scale',
					'lookat',
					'visible',
					'name',
					'matrixautoupdate',
					'layers',
					'castshadow',
					'receiveshadow',
					'frustumculled',
					'renderorder',
					'lodistance',
					'animationgroup',
					'object3d',
					'onbeforerender',
					'rigidbody',
					'controller',
					'prefab',
					'geometry',
					'material',
					'mixer',
				]);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['customdepth', 'customdistance'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['material']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'visible':
						if (NgxThreeUtil.isNotNull(this.visible)) {
							this.object3d.visible = this.visible;
						}
						break;
					case 'name':
						if (NgxThreeUtil.isNotNull(this.name) && this.name !== '') {
							this.object3d.name = this.name;
						}
						break;
					case 'prefab':
						if (NgxThreeUtil.isNotNull(this.prefab)) {
							this.unSubscribeRefer('prefab');
							if (
								this.cachedPrefab !== null &&
								this.cachedPrefab.parent !== null
							) {
								this.cachedPrefab.parent.remove(this.cachedPrefab.parent);
							}
							const tmpPrefab: I3JS.Object3D = NgxThreeUtil.getObject3d(
								this.prefab,
								false
							);
							if (tmpPrefab !== null) {
								this.cachedPrefab = tmpPrefab.clone(true);
								this.object3d.add(this.cachedPrefab);
							}
							this.subscribeRefer(
								'prefab',
								NgxThreeUtil.getSubscribe(
									this.prefab,
									() => {
										this.addChanges('prefab');
									},
									'loaded'
								)
							);
						}
						break;
					case 'onbeforerender':
						if (NgxThreeUtil.isNotNull(this.onBeforeRender)) {
							this.object3d.onBeforeRender = this.onBeforeRender;
						}
						break;
					case 'matrixautoupdate':
						if (NgxThreeUtil.isNotNull(this.matrixAutoUpdate)) {
							this.object3d.matrixAutoUpdate = this.matrixAutoUpdate;
							this.object3d.updateMatrix();
						}
						break;
					case 'layers':
						if (NgxThreeUtil.isNotNull(this.layers)) {
							if (typeof this.layers === 'number') {
								this.object3d.layers.set(this.layers);
							} else if (Array.isArray(this.layers)) {
								this.layers.forEach((layer) => {
									this.object3d.layers.enable(layer);
								});
							} else {
								for (const [key, value] of Object.entries(this.layers)) {
									if (typeof key === 'number') {
										if (value) {
											this.object3d.layers.enable(key);
										} else {
											this.object3d.layers.disable(key);
										}
									}
								}
							}
						}
						break;
					case 'castshadow':
						if (
							!(this.object3d instanceof N3JS.Scene) &&
							!(this.object3d instanceof N3JS.Camera) &&
							!(this.object3d instanceof N3JS.HemisphereLight) &&
							!(this.object3d instanceof N3JS.AmbientLight) &&
							!(this.object3d instanceof N3JS.RectAreaLight)
						) {
							if (NgxThreeUtil.isNotNull(this.castShadow)) {
								this.object3d.castShadow = this.castShadow;
							}
						}
						break;
					case 'receiveshadow':
						if (
							!(this.object3d instanceof N3JS.Scene) &&
							!(this.object3d instanceof N3JS.Camera)
						) {
							if (NgxThreeUtil.isNotNull(this.receiveShadow)) {
								this.object3d.receiveShadow = this.receiveShadow;
							}
						}
						break;
					case 'frustumculled':
						if (NgxThreeUtil.isNotNull(this.frustumCulled)) {
							this.object3d.frustumCulled = this.frustumCulled;
						}
						break;
					case 'renderorder':
						if (NgxThreeUtil.isNotNull(this.renderOrder)) {
							this.object3d.renderOrder = this.renderOrder;
						}
						break;
					case 'lodistance':
						if (
							NgxThreeUtil.isNotNull(this.loDistance) &&
							this.parentObject3d instanceof N3JS.LOD
						) {
							this.parentObject3d.addLevel(
								this.object3d as I3JS.Object3D,
								this.getLoDistance(0)
							);
						}
						break;
					case 'object3d':
						this.unSubscribeReferList('object3dList');
						if (NgxThreeUtil.isNotNull(this.object3dList)) {
							this.object3dList.forEach((object3d) => {
								object3d.setParent(this.object3d);
							});
							this.subscribeListQuery(
								this.object3dList,
								'object3dList',
								'object3d'
							);
						}
						break;
					case 'position':
						const newPositionList: NgxPositionComponent[] = [];
						if (NgxThreeUtil.isNotNull(this.position)) {
							if (this.position instanceof NgxPositionComponent) {
								newPositionList.push(this.position);
							} else {
								this.object3d.position.copy(
									NgxThreeUtil.getPosition(this.position)
								);
							}
						}
						if (NgxThreeUtil.isNotNull(this.positionList)) {
							this.positionList.forEach((position) => {
								newPositionList.push(position);
							});
						}
						this.cachedPositionList.forEach((position) => {
							if (newPositionList.indexOf(position) === -1) {
								position.unsetObject3d(this.selfAny);
							}
						});
						newPositionList.forEach((position) => {
							if (this.cachedPositionList.indexOf(position) === -1) {
								position.setObject3d(this.selfAny);
							}
						});
						if (newPositionList.length > 0) {
							// this.object3d.position.copy(newPositionList[0].getPosition());
						}
						this.cachedPositionList = newPositionList;
						if (newPositionList.length === 0) {
							this.setUserData('initPosition', this.object3d.position.clone());
						}
						this.setSubscribeNext('position');
						break;
					case 'rotation':
						const newRotationList: NgxRotationComponent[] = [];
						if (NgxThreeUtil.isNotNull(this.rotation)) {
							if (this.rotation instanceof NgxRotationComponent) {
								newRotationList.push(this.rotation);
							} else {
								this.object3d.rotation.copy(
									NgxThreeUtil.getRotation(this.position)
								);
							}
						}
						if (NgxThreeUtil.isNotNull(this.rotationList)) {
							this.rotationList.forEach((rotation) => {
								newRotationList.push(rotation);
							});
						}
						this.cachedRotationList.forEach((rotation) => {
							if (newRotationList.indexOf(rotation) === -1) {
								rotation.unsetObject3d(this.selfAny);
							}
						});
						newRotationList.forEach((rotation) => {
							if (this.cachedRotationList.indexOf(rotation) === -1) {
								rotation.setObject3d(this.selfAny);
							}
						});
						this.cachedRotationList = newRotationList;
						this.setSubscribeNext('rotation');
						break;
					case 'scale':
						const newScaleList: NgxScaleComponent[] = [];
						if (NgxThreeUtil.isNotNull(this.scale)) {
							if (this.scale instanceof NgxScaleComponent) {
								newScaleList.push(this.scale);
							} else {
								this.object3d.scale.copy(NgxThreeUtil.getScale(this.scale));
							}
						}
						if (NgxThreeUtil.isNotNull(this.scaleList)) {
							this.scaleList.forEach((scale) => {
								newScaleList.push(scale);
							});
						}
						this.cachedScaleList.forEach((scale) => {
							if (newScaleList.indexOf(scale) === -1) {
								scale.unsetObject3d(this.selfAny);
							}
						});
						newScaleList.forEach((scale) => {
							if (this.cachedScaleList.indexOf(scale) === -1) {
								scale.setObject3d(this.selfAny);
							}
						});
						this.cachedScaleList = newScaleList;
						this.setSubscribeNext('scale');
						break;
					case 'lookat':
						const newLookatList: NgxLookatComponent[] = [];
						if (NgxThreeUtil.isNotNull(this.lookat)) {
							if (this.lookat instanceof NgxLookatComponent) {
								newLookatList.push(this.lookat);
							} else {
								this.object3d.lookAt(NgxThreeUtil.getLookAt(this.lookat));
							}
						}
						if (NgxThreeUtil.isNotNull(this.lookatList)) {
							this.lookatList.forEach((lookat) => {
								newLookatList.push(lookat);
							});
						}
						this.cachedLookatList.forEach((lookat) => {
							if (newLookatList.indexOf(lookat) === -1) {
								lookat.unsetObject3d(this.selfAny);
							}
						});
						newLookatList.forEach((lookat) => {
							if (this.cachedLookatList.indexOf(lookat) === -1) {
								lookat.setObject3d(this.selfAny);
							}
						});
						this.cachedLookatList = newLookatList;
						this.setSubscribeNext('lookat');
						break;
					case 'controller':
						this.unSubscribeRefer('controller');
						if (NgxThreeUtil.isNotNull(this.controller)) {
							this.controller.setObject3d(this.object3d);
							this.subscribeRefer(
								'controller',
								NgxThreeUtil.getSubscribe(
									this.controller,
									(event) => {
										this.addChanges(event);
									},
									'controller'
								)
							);
						}
						this.unSubscribeReferList('controllerList');
						if (NgxThreeUtil.isNotNull(this.controllerList)) {
							this.controllerList.forEach((controller) => {
								controller.setObject3d(this.object3d);
							});
							this.subscribeListQuery(
								this.controllerList,
								'controllerList',
								'controller'
							);
						}
						break;
					case 'material':
						const newMaterialList: {
							type: string;
							component: NgxAbstractMaterialComponent;
						}[] = [];
						if (NgxThreeUtil.isNotNull(this.customDepth)) {
							if (this.customDepth instanceof NgxAbstractMaterialComponent) {
								newMaterialList.push({
									type: 'customDepth',
									component: this.customDepth,
								});
							} else {
								this.object3d.customDepthMaterial = NgxThreeUtil.getMaterialOne(
									this.customDepth
								);
							}
						}
						if (NgxThreeUtil.isNotNull(this.customDistance)) {
							if (this.customDistance instanceof NgxAbstractMaterialComponent) {
								newMaterialList.push({
									type: 'customDepth',
									component: this.customDistance,
								});
							} else {
								this.object3d.customDistanceMaterial = NgxThreeUtil.getMaterialOne(
									this.customDistance
								);
							}
						}
						if (NgxThreeUtil.isNotNull(this.material)) {
							if (this.material instanceof NgxAbstractMaterialComponent) {
								newMaterialList.push({
									type: 'material',
									component: this.material,
								});
							}
						}
						if (NgxThreeUtil.isNotNull(this.materialList)) {
							this.materialList.forEach((material) => {
								newMaterialList.push({
									type: 'material',
									component: material,
								});
							});
						}
						const cachedMaterialList: NgxAbstractMaterialComponent[] = [];
						newMaterialList.forEach((material) => {
							cachedMaterialList.push(material.component);
						});
						this.cachedMaterialList.forEach((material) => {
							if (cachedMaterialList.indexOf(material) === -1) {
								material.unsetObject3d(this.selfAny);
							}
						});
						newMaterialList.forEach((material) => {
							if (this.cachedMaterialList.indexOf(material.component) === -1) {
								material.component.setObject3d(this.selfAny, material.type);
							}
						});
						this.cachedMaterialList = cachedMaterialList;
						break;
					case 'geometry':
						const newGeometryList: NgxAbstractGeometryComponent[] = [];
						if (NgxThreeUtil.isNotNull(this.geometry)) {
							const selfObject3d: any = this.object3d;
							if (this.geometry instanceof NgxAbstractGeometryComponent) {
								newGeometryList.push(this.geometry);
							} else if (NgxThreeUtil.isNotNull(selfObject3d['geometry'])) {
								selfObject3d['geometry'] = NgxThreeUtil.getGeometry(this.geometry);
							}
						}
						if (NgxThreeUtil.isNotNull(this.geometryList)) {
							this.geometryList.forEach((geometry) => {
								newGeometryList.push(geometry);
							});
						}
						this.cachedGeometryList.forEach((geometry) => {
							if (newGeometryList.indexOf(geometry) === -1) {
								geometry.unsetObject3d(this.selfAny);
							}
						});
						newGeometryList.forEach((geometry) => {
							if (this.cachedGeometryList.indexOf(geometry) === -1) {
								geometry.setObject3d(this.selfAny);
							}
						});
						this.cachedGeometryList = newGeometryList;
						break;
					case 'mixer':
						this.unSubscribeReferList('mixerList');
						if (NgxThreeUtil.isNotNull(this.mixerList)) {
							this.mixerList.forEach((mixer) => {
								mixer.setParent(this.object3d);
							});
							this.subscribeListQuery(this.mixerList, 'mixerList', 'mixer');
						}
						break;
					case 'animationgroup':
						if (NgxThreeUtil.isNotNull(this.animationGroup)) {
							let animationGroup: any = null;
							if (this.animationGroup instanceof NgxAnimationGroupComponent) {
								animationGroup = this.animationGroup.getAnimationGroup();
							} else {
								animationGroup = this.animationGroup;
							}
							if (animationGroup !== null) {
								let oldObject: I3JS.Object3D = null;
								animationGroup['_objects'].forEach((object: any) => {
									if (object.userData.component == this.id) {
										oldObject = object;
									}
								});
								if (oldObject !== null) {
									animationGroup.remove(oldObject);
								}
								animationGroup.add(this.object3d);
							}
						}
						break;
					case 'rigidbody':
						this.unSubscribeReferList('rigidbodyList');
						if (NgxThreeUtil.isNotNull(this.rigidbodyList)) {
							this.rigidbodyList.forEach((rigidbody) => {
								rigidbody.setParent(this.object3d);
							});
							this.subscribeListQuery(
								this.rigidbodyList,
								'rigidbodyList',
								'rigidbody'
							);
						}
						break;
				}
			});
			if (
				NgxThreeUtil.isIndexOf(changes, [
					'position',
					'rotation',
					'scale',
					'lookat',
				]) &&
				!this.object3d.matrixAutoUpdate
			) {
				this.object3d.updateMatrix();
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * Shows debug
	 * @param obj
	 */
	public showDebug(obj: I3JS.Object3D) {
		const lines: string[] = [];
		lines.push(obj.name || obj.id.toString());
		this.addDebugLine(obj.children, lines, '\t');
		this.consoleLog('object : ', lines.join('\n'));
	}

	/**
	 * Adds debug line
	 * @param objs
	 * @param lines
	 * @param prefix
	 * @returns debug line
	 */
	public addDebugLine(
		objs: I3JS.Object3D[],
		lines: string[],
		prefix: string
	): string[] {
		if (objs.length > 0) {
			objs.forEach((obj) => {
				lines.push(prefix + (obj.name || obj.id.toString()));
				this.addDebugLine(obj.children, lines, prefix + '\t');
			});
		}
		return lines;
	}
}
