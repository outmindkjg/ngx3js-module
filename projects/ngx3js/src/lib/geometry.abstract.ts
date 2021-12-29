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
import { NgxGeometryUtils } from './geometry/geometryUtils';
import { I3JS, N3JS, NgxThreeUtil } from './interface';
import { TAttrBufferAttribute } from './ngx-interface';
import { NgxPositionComponent } from './position/position.component';
import { NgxRotationComponent } from './rotation/rotation.component';
import { NgxScaleComponent } from './scale/scale.component';
import { NgxAbstractSubscribeComponent } from './subscribe.abstract';
import { NgxTranslationComponent } from './translation/translation.component';

/**
 * The Abstract Geometry component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AbstractGeometryComponent) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry) page for a live demo.
 *
 * ```ts
 * _@Component({
 * 	providers: [
 * 		{
 * 			provide: NgxAbstractGeometryComponent,
 * 			useExisting: forwardRef(() => NgxXxxComponent),
 * 		},
 * 	],
 * })
 * export class NgxXxxComponent extends NgxAbstractGeometryComponent implements OnInit {
 * 	constructor() {
 * 		super();
 * 	}
 * }
 * ```
 */
@Component({
	template: '',
})
export class NgxAbstractGeometryComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit, OnChanges, AfterContentInit, OnDestroy
{
	/**
	 * The name of the object (doesn't need to be unique). Default is an empty string.
	 */
	@Input() public name: string = null;

	/**
	 * refer mesh name  of geometry component
	 */
	@Input() public refName: string | string[] = null;

	/**
	 * The align of geometry
	 *
	 * left, center, right, top, bottom, front, back, double
	 *
	 * Notice - case insensitive. mixed
	 *
	 */
	@Input() public align: string = null;

	/**
	 * Center the geometry based on the bounding box.
	 */
	@Input() public center: boolean = false;

	/**
	 * Computes vertex normals by averaging face normals.
	 */
	@Input() public computeVertexNormals: boolean = false;

	/**
	 * Computes bounding box of the geometry, updating [BufferGeometry.boundingBox](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/BufferGeometry.boundingBox) attribute. Bounding boxes aren't computed by default. They need to be explicitly computed, otherwise they are *null*.
	 */
	@Input() public computeBoundingBox: boolean = false;

	/**
	 * Computes bounding sphere of the geometry, updating [BufferGeometry.boundingSphere](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/BufferGeometry.boundingSphere) attribute. Bounding spheres aren't computed by default. They need to be explicitly computed, otherwise they are *null*.
	 */
	@Input() public computeBoundingSphere: boolean = false;

	/**
	 * Calculates and adds a tangent attribute to this geometry.
	 * The computation is only supported for indexed geometries and if position, normal, and uv attributes are defined.
	 */
	@Input() public computeTangents: boolean = false;

	/**
	 * Scale the geometry data. This is typically done as a one time operation, and not during a loop. Use [Object3D.scale](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D.scale) for typical real-time mesh scaling.
	 */
	@Input() public scale: number = null;

	/**
	 * Scale the geometry data. This is typically done as a one time operation, and not during a loop. Use [Object3D.scale](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D.scale) for typical real-time mesh scaling.
	 */
	@Input() public sphereScale: number = null;

	/**
	 * This hashmap has as id the name of the attribute to be set and as value the [buffer](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/BufferAttribute) to set it to.
	 * Rather than accessing this property directly, use [BufferGeometry.setAttribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/BufferGeometry.setAttribute) and [BufferGeometry.getAttribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/BufferGeometry.getAttribute) to access attributes of this geometry.
	 */
	@Input() public attributes: { [key: string]: TAttrBufferAttribute } = null;

	/**
	 * Hashmap of [BufferAttribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/BufferAttribute)s holding details of the geometry's morph targets.
	 */
	@Input() public morphAttributes: { [key: string]: TAttrBufferAttribute[] } =
		null;

	/**
	 * The autoDisplacement of abstract geometry component
	 */
	@Input() public autoDisplacement: boolean = null;

	/**
	 * The autoDisplacementSize of abstract geometry component
	 */
	@Input() public autoDisplacementSize: number = 3;

	/**
	 * The autoCustomColor of abstract geometry component
	 */
	@Input() public autoCustomColor: boolean = null;

	/**
	 * The autoCustomColorSize of abstract geometry component
	 */
	@Input() public autoCustomColorSize: number = 3;

	/**
	 * The autoCustomColorKey of abstract geometry component
	 */
	@Input() public autoCustomColorKey: string = null;

	/**
	 * The autoSize of abstract geometry component
	 */
	@Input() public autoSize: boolean = null;

	/**
	 * The autoSizeSize of abstract geometry component
	 */
	@Input() public autoSizeSize: number = 1;

	/**
	 * The attrPosition of abstract geometry component
	 */
	@Input() public attrPosition: TAttrBufferAttribute = null;

	/**
	 * The attrPositionUsage of abstract geometry component
	 */
	@Input() public attrPositionUsage: string = null;

	/**
	 * The attrUv of abstract geometry component
	 */
	@Input() public attrUv: TAttrBufferAttribute = null;

	/**
	 * The attrUvUsage of abstract geometry component
	 */
	@Input() public attrUvUsage: string = null;

	/**
	 * The attrTextureIndex of abstract geometry component
	 */
	@Input() public attrTextureIndex: TAttrBufferAttribute = null;

	/**
	 * The attrTextureIndexUsage of abstract geometry component
	 */
	@Input() public attrTextureIndexUsage: string = null;

	/**
	 * The attrVertColor of abstract geometry component
	 */
	@Input() public attrVertColor: TAttrBufferAttribute = null;

	/**
	 * The attrVisible of abstract geometry component
	 */
	@Input() public attrVisible: TAttrBufferAttribute = null;

	/**
	 * The vertexBuffer of abstract geometry component
	 */
	@Input() public vertexBuffer:
		| Float32Array
		| I3JS.InterleavedBuffer
		| number[] = null;

	/**
	 * The vertexBufferStride of abstract geometry component
	 */
	@Input() public vertexBufferStride: number = null;

	/**
	 * The attrOffset of abstract geometry component
	 */
	@Input() public attrOffset: TAttrBufferAttribute = null;

	/**
	 * The attrOffsetUsage of abstract geometry component
	 */
	@Input() public attrOffsetUsage: string = null;

	/**
	 * The attrTranslate of abstract geometry component
	 */
	@Input() public attrTranslate: TAttrBufferAttribute = null;

	/**
	 * The attrTranslateUsage of abstract geometry component
	 */
	@Input() public attrTranslateUsage: string = null;

	/**
	 * The attrOrientationStart of abstract geometry component
	 */
	@Input() public attrOrientationStart: TAttrBufferAttribute = null;

	/**
	 * The attrOrientationStartUsage of abstract geometry component
	 */
	@Input() public attrOrientationStartUsage: string = null;

	/**
	 * The attrOrientationEnd of abstract geometry component
	 */
	@Input() public attrOrientationEnd: TAttrBufferAttribute = null;

	/**
	 * The attrOrientationEndUsage of abstract geometry component
	 */
	@Input() public attrOrientationEndUsage: string = null;

	/**
	 * The attrNormal of abstract geometry component
	 */
	@Input() public attrNormal: TAttrBufferAttribute = null;

	/**
	 * The attrNormalUsage of abstract geometry component
	 */
	@Input() public attrNormalUsage: string = null;

	/**
	 * The attrNormalNormalized of abstract geometry component
	 */
	@Input() public attrNormalNormalized: boolean = false;

	/**
	 * The attrColor of abstract geometry component
	 */
	@Input() public attrColor: TAttrBufferAttribute = null;

	/**
	 * The attrColorUsage of abstract geometry component
	 */
	@Input() public attrColorUsage: string = null;

	/**
	 * The attrColorSize of abstract geometry component
	 */
	@Input() public attrColorSize: number = null;

	/**
	 * The attrColorKey of abstract geometry component
	 */
	@Input() public attrColorKey: string = null;

	/**
	 * The attrColorNormalized of abstract geometry component
	 */
	@Input() public attrColorNormalized: boolean = false;

	/**
	 * The attrCustomColor of abstract geometry component
	 */
	@Input() public attrCustomColor: TAttrBufferAttribute = null;

	/**
	 * The attrCustomColorUsage of abstract geometry component
	 */
	@Input() public attrCustomColorUsage: string = null;

	/**
	 * The attrSize of abstract geometry component
	 */
	@Input() public attrSize: TAttrBufferAttribute = null;

	/**
	 * Defines the intended usage pattern of the data store for optimization purposes. Corresponds to the *usage* parameter of
	 * [WebGLRenderingContext.bufferData](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData)().
	 */
	@Input() public attrSizeUsage: string = null;

	/**
	 * The attrScale of abstract geometry component
	 */
	@Input() public attrScale: TAttrBufferAttribute = null;

	/**
	 * The attrScaleUsage of abstract geometry component
	 */
	@Input() public attrScaleUsage: string = null;

	/**
	 * The attrIndex of abstract geometry component
	 */
	@Input() public attrIndex: TAttrBufferAttribute = null;

	/**
	 * The attrIndexUsage of abstract geometry component
	 */
	@Input() public attrIndexUsage: string = null;

	/**
	 * Return a non-index version of an indexed BufferGeometry.
	 */
	@Input() public toNonIndexed: boolean = null;

	/**
	 * The flipY of abstract geometry component
	 */
	@Input() public flipY: boolean = null;

	/**
	 * geometry -- Instance of [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/BufferGeometry) to merge the vertices of.
	 * tolerance -- The maximum allowable difference between vertex attributes to merge. Defaults to 1e-4.
	 * Returns a new [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/BufferGeometry) with vertices for which all similar vertex attributes (within tolerance) are merged.
	 */
	@Input() public mergeVertices: boolean = null;

	/**
	 * The geometry to modify by splitting edges. This geometry can be any of any type: Geometry or BufferGeometry, indexed or not
	 */
	@Input() public edgeSplit: boolean = null;

	/**
	 * The cutoff angle in radians. If the angle between two face normals is higher than this value, a split will be made.
	 *
	 * @see EdgeSplitModifier
	 */
	@Input() public cutOffAngle: number = null;

	/**
	 * Set to true to keep the normal values for vertices that won't be split.
	 * To use this feature, you also need to pass an indexed geometry with a 'normal' BufferAttribute
	 *
	 * @see EdgeSplitModifier
	 */
	@Input() public tryKeepNormals: boolean = null;

	/**
	 * The simplify of abstract geometry component
	 */
	@Input() public simplify: boolean = null;

	/**
	 * The count of abstract geometry component
	 */
	@Input() public count: number = null;

	/**
	 * The tessellate of abstract geometry component
	 */
	@Input() public tessellate: boolean = null;

	/**
	 * The maxEdgeLength of abstract geometry component
	 */
	@Input() public maxEdgeLength: number = null;

	/**
	 * The maxIterations of abstract geometry component
	 */
	@Input() public maxIterations: number = null;

	/**
	 * The meshType of abstract geometry component
	 * 
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.EdgesGeometry | EdgesGeometry, Edges |
	 * | THREE.WireframeGeometry | WireframeGeometry, Wireframe |
	 * | WireframeGeometry2 | WireframeGeometry2, Wireframe2 |
	 */
	@Input() public meshType: string = null;

	/**
	 * The thresholdAngle of geometry component
	 */
	@Input() public thresholdAngle: number = null;

	/**
	 * The program of abstract geometry component
	 */
	@Input() public program: string = null;

	/**
	 * The programParam of abstract geometry component
	 */
	@Input() public programParam: any = null;

	/**
	 * drawRangeStart of abstract geometry component
	 *
	 * @see THREE.BufferGeometry setDrawRange
	 */
	@Input() public drawRangeStart: number = null;

	/**
	 * drawRangeCount of abstract geometry component
	 *
	 * @see THREE.BufferGeometry setDrawRange
	 */
	@Input() public drawRangeCount: number = null;

	/**
	 * The compressPositions
	 *
	 * @see GeometryCompressionUtils.compressPositions
	 */
	@Input() public compressPositions: boolean = null;

	/**
	 * Make the input mesh.geometry's normal attribute encoded and compressed by 3 different methods.
	 * Also will change the mesh.material to `PackedPhongMaterial` which let the vertex shader program decode the normal data.
	 *
	 * "DEFAULT" || "OCT1Byte" || "OCT2Byte" || "ANGLES"
	 *
	 * "OCT1Byte"
	 * It is not recommended to use 1-byte octahedron normals encoding unless you want to extremely reduce the memory usage
	 * As it makes vertex data not aligned to a 4 byte boundary which may harm some WebGL implementations and sometimes the normal distortion is visible
	 * Please refer to @zeux 's comments in https://github.com/mrdoob/three.js/pull/18208
	 *
	 * "OCT2Byte"
	 * "ANGLES"
	 */
	@Input() public compressNormals: string = null;

	/**
	 * The compressUvs
	 *
	 * @see GeometryCompressionUtils.compressUvs
	 */
	@Input() public compressUvs: boolean = null;

	/**
	 * The onInit of abstract geometry component
	 */
	@Input() public onInit: (
		geometry: I3JS.BufferGeometry
	) => void | I3JS.BufferGeometry = null;

	/**
	 * Content children of abstract geometry component
	 */
	@ContentChildren(NgxTranslationComponent, { descendants: false }) private translationList: QueryList<NgxTranslationComponent>;

	/**
	 * Content children of abstract geometry component
	 */
	@ContentChildren(NgxScaleComponent, { descendants: false }) private scaleList: QueryList<NgxScaleComponent>;

	/**
	 * Content children of abstract geometry component
	 */
	@ContentChildren(NgxRotationComponent, { descendants: false }) private rotationList: QueryList<NgxRotationComponent>;

	/**
	 * Content children of abstract geometry component
	 */
	@ContentChildren(NgxPositionComponent, { descendants: false }) private positionList: QueryList<NgxPositionComponent>;

	/**
	 * Geometry attr of abstract geometry component
	 */
	protected GEOMETRY_ATTR: string[] = [
		'name',
		'align',
		'drawrangestart',
		'drawrangecount',
	];

	/**
	 * Creates an instance of abstract geometry component.
	 */
	constructor() {
		super();
		this.GEOMETRY_ATTR.push(...this.OBJECT_ATTR);
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 *
	 * @param subscribeType
	 */
	ngOnInit(subscribeType?: string): void {
		super.ngOnInit(subscribeType || 'geometry');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.geometry !== null) {
			this.geometry.dispose();
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
		if (changes && this.geometry !== null) {
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(
			this.translationList,
			'translationList',
			'translation'
		);
		this.subscribeListQueryChange(this.scaleList, 'scaleList', 'scale');
		this.subscribeListQueryChange(
			this.rotationList,
			'rotationList',
			'rotation'
		);
		this.subscribeListQueryChange(
			this.positionList,
			'positionList',
			'position'
		);
		super.ngAfterContentInit();
	}

	/**
	 * Determines whether Geometry type is
	 * @returns true if Geometry type
	 */
	public isGeometryType(): boolean {
		return (
			this.enabled && (NgxThreeUtil.isNull(this.refName) || this.refName === '*')
		);
	}

	/**
	 * Gets morph attributes
	 * @returns morph attributes
	 */
	protected getMorphAttributes(): {
		key: string;
		value: I3JS.BufferAttribute[];
	}[] {
		const attributes: { key: string; value: I3JS.BufferAttribute[] }[] = [];
		if (NgxThreeUtil.isNotNull(this.morphAttributes)) {
			Object.entries(this.morphAttributes).forEach(([key, value]) => {
				switch (key) {
					case 'position':
					case 'color':
					case 'normal':
					case 'customColor':
					default:
						const valueList: I3JS.BufferAttribute[] = [];
						value.forEach((val) => {
							valueList.push(this.getAttribute(val, 3));
						});
						attributes.push({ key: key, value: valueList });
						break;
				}
			});
		}
		return attributes;
	}

	/**
	 * Gets attributes
	 * @param [colorType]
	 * @returns attributes
	 */
	protected getAttributes(
		colorType: string = ''
	): { key: string; value: I3JS.BufferAttribute }[] {
		const attributes: { key: string; value: any }[] = [];
		if (NgxThreeUtil.isNotNull(this.attrPosition)) {
			attributes.push({
				key: 'position',
				value: this.getAttribute(this.attrPosition, 3, this.attrPositionUsage),
			});
		}
		if (NgxThreeUtil.isNotNull(this.attrColor)) {
			if (colorType == 'instanced') {
				attributes.push({
					key: NgxThreeUtil.getTypeSafe(this.attrColorKey, 'color'),
					value: this.getAttribute(
						this.attrColor,
						NgxThreeUtil.getTypeSafe(this.attrColorSize, 4),
						this.attrColorUsage,
						'instanced',
						this.attrColorNormalized
					),
				});
			} else {
				attributes.push({
					key: NgxThreeUtil.getTypeSafe(this.attrColorKey, 'color'),
					value: this.getAttribute(
						this.attrColor,
						NgxThreeUtil.getTypeSafe(this.attrColorSize, 3),
						this.attrColorUsage,
						'float',
						this.attrColorNormalized
					),
				});
			}
		} else if (NgxThreeUtil.isNotNull(this.attrVertColor)) {
			attributes.push({
				key: 'vertColor',
				value: this.getAttribute(
					this.attrVertColor,
					NgxThreeUtil.getTypeSafe(this.attrColorSize, 3),
					this.attrColorUsage,
					'float',
					this.attrColorNormalized
				),
			});
		}
		if (NgxThreeUtil.isNotNull(this.attrVisible)) {
			attributes.push({
				key: 'visible',
				value: this.getAttribute(this.attrVisible, 1),
			});
		}
		if (NgxThreeUtil.isNotNull(this.attrOffset)) {
			attributes.push({
				key: 'offset',
				value: this.getAttribute(
					this.attrOffset,
					3,
					this.attrOffsetUsage,
					'instanced'
				),
			});
		}
		if (NgxThreeUtil.isNotNull(this.attrTranslate)) {
			attributes.push({
				key: 'translate',
				value: this.getAttribute(
					this.attrTranslate,
					3,
					this.attrTranslateUsage,
					'instanced'
				),
			});
		}
		if (NgxThreeUtil.isNotNull(this.attrOrientationStart)) {
			attributes.push({
				key: 'orientationStart',
				value: this.getAttribute(
					this.attrOrientationStart,
					4,
					this.attrOrientationStartUsage,
					'instanced'
				),
			});
		}
		if (NgxThreeUtil.isNotNull(this.attrOrientationEnd)) {
			attributes.push({
				key: 'orientationEnd',
				value: this.getAttribute(
					this.attrOrientationEnd,
					4,
					this.attrOrientationEndUsage,
					'instanced'
				),
			});
		}
		if (NgxThreeUtil.isNotNull(this.attrNormal)) {
			attributes.push({
				key: 'normal',
				value: this.getAttribute(
					this.attrNormal,
					3,
					this.attrNormalUsage,
					'float',
					this.attrNormalNormalized
				),
			});
		}
		if (NgxThreeUtil.isNotNull(this.attrCustomColor)) {
			attributes.push({
				key: 'customColor',
				value: this.getAttribute(
					this.attrCustomColor,
					3,
					this.attrCustomColorUsage
				),
			});
		}
		if (NgxThreeUtil.isNotNull(this.attrSize)) {
			attributes.push({
				key: 'size',
				value: this.getAttribute(this.attrSize, 1, this.attrSizeUsage),
			});
		}
		if (NgxThreeUtil.isNotNull(this.attrScale)) {
			attributes.push({
				key: 'scale',
				value: this.getAttribute(this.attrScale, 1, this.attrScaleUsage),
			});
		}
		if (NgxThreeUtil.isNotNull(this.attrIndex)) {
			attributes.push({
				key: 'index',
				value: this.getAttribute(this.attrIndex, 1, this.attrIndexUsage, 'int'),
			});
		}
		if (NgxThreeUtil.isNotNull(this.attrTextureIndex)) {
			attributes.push({
				key: 'textureIndex',
				value: this.getAttribute(
					this.attrTextureIndex,
					1,
					this.attrTextureIndexUsage,
					'uint'
				),
			});
		}
		if (NgxThreeUtil.isNotNull(this.attrUv)) {
			attributes.push({
				key: 'uv',
				value: this.getAttribute(this.attrUv, 2, this.attrUvUsage),
			});
		}
		if (NgxThreeUtil.isNotNull(this.vertexBuffer)) {
			let vertexBuffer: I3JS.InterleavedBuffer = null;
			if (this.vertexBuffer instanceof N3JS.InterleavedBuffer) {
				vertexBuffer = this.vertexBuffer;
			} else if (this.vertexBuffer instanceof Float32Array) {
				vertexBuffer = new N3JS.InterleavedBuffer(
					this.vertexBuffer,
					NgxThreeUtil.getTypeSafe(this.vertexBufferStride, 8)
				);
			} else {
				vertexBuffer = new N3JS.InterleavedBuffer(
					new Float32Array(this.vertexBuffer),
					NgxThreeUtil.getTypeSafe(this.vertexBufferStride, 8)
				);
			}
			attributes.push({
				key: 'position',
				value: new N3JS.InterleavedBufferAttribute(vertexBuffer, 3, 0),
			});
			attributes.push({
				key: 'uv',
				value: new N3JS.InterleavedBufferAttribute(vertexBuffer, 2, 4),
			});
		}

		if (NgxThreeUtil.isNotNull(this.attributes)) {
			Object.entries(this.attributes).forEach(([key, value]) => {
				switch (key) {
					case 'size':
						attributes.push({ key: key, value: this.getAttribute(value, 1) });
						break;
					case 'index':
						attributes.push({
							key: key,
							value: this.getAttribute(value, 1, this.attrIndexUsage, 'int'),
						});
						break;
					case 'textureIndex':
						attributes.push({
							key: key,
							value: this.getAttribute(
								value,
								1,
								this.attrTextureIndexUsage,
								'uint'
							),
						});
						break;
					case 'offset':
						attributes.push({
							key: 'offset',
							value: this.getAttribute(value, 3, null, 'instanced'),
						});
						break;
					case 'orientationStart':
					case 'orientationEnd':
						attributes.push({
							key: key,
							value: this.getAttribute(value, 4, null, 'instanced'),
						});
						break;
					case 'uv':
						attributes.push({
							key: key,
							value: this.getAttribute(value, 2, this.attrUvUsage),
						});
						break;
					case 'position':
						attributes.push({ key: key, value: this.getAttribute(value, 3) });
						break;
					case 'color':
						attributes.push({
							key: key,
							value: this.getAttribute(value, 3, this.attrColorUsage),
						});
						break;
					case 'normal':
						attributes.push({
							key: key,
							value: this.getAttribute(
								value,
								3,
								this.attrNormalUsage,
								null,
								this.attrNormalNormalized
							),
						});
						break;
					case 'customColor':
						attributes.push({
							key: key,
							value: this.getAttribute(value, 3, this.attrCustomColorUsage),
						});
						break;
					default:
						attributes.push({ key: key, value: this.getAttribute(value, 3) });
						break;
				}
			});
		}
		return attributes;
	}

	/**
	 * Gets attribute
	 * @param value
	 * @param itemSize
	 * @param [usage]
	 * @param [bufferType]
	 * @param [normalized]
	 * @returns attribute
	 */
	protected getAttribute(
		value: TAttrBufferAttribute,
		itemSize: number,
		usage?: string,
		bufferType?: string,
		normalized?: boolean
	): I3JS.BufferAttribute {
		if (value instanceof N3JS.BufferAttribute) {
			return value;
		}
		const attribute = NgxThreeUtil.getTypeSafe(value, []);
		let bufferAttribute: I3JS.BufferAttribute = null;
		if (attribute instanceof N3JS.BufferAttribute) {
			return attribute;
		} else if (attribute instanceof Int8Array) {
			bufferAttribute = new N3JS.BufferAttribute(attribute, itemSize);
		} else if (attribute instanceof Int16Array) {
			bufferAttribute = new N3JS.BufferAttribute(attribute, itemSize);
		} else if (attribute instanceof Int32Array) {
			bufferAttribute = new N3JS.BufferAttribute(attribute, itemSize);
		} else if (attribute instanceof Uint8Array) {
			bufferAttribute = new N3JS.BufferAttribute(attribute, itemSize);
		} else if (attribute instanceof Uint16Array) {
			bufferAttribute = new N3JS.BufferAttribute(attribute, itemSize);
		} else if (attribute instanceof Uint32Array) {
			bufferAttribute = new N3JS.BufferAttribute(attribute, itemSize);
		} else if (attribute instanceof Float32Array) {
			bufferAttribute = new N3JS.BufferAttribute(attribute, itemSize);
		} else if (attribute instanceof Float64Array) {
			bufferAttribute = new N3JS.BufferAttribute(attribute, itemSize);
		} else if (Array.isArray(attribute)) {
			switch ((bufferType || 'float').toLowerCase()) {
				case 'int':
					const intArray = new Uint32Array(attribute.length);
					attribute.forEach((v, i) => {
						intArray[i] = v;
					});
					bufferAttribute = new N3JS.Uint32BufferAttribute(intArray, itemSize);
					break;
				case 'uint':
					const uintArray = new Uint32Array(attribute.length);
					attribute.forEach((v, i) => {
						uintArray[i] = v;
					});
					bufferAttribute = new N3JS.Int32BufferAttribute(uintArray, itemSize);
					break;
				case 'instanced':
					const instancedFloatArray = new Float32Array(attribute.length);
					attribute.forEach((v, i) => {
						instancedFloatArray[i] = v;
					});
					bufferAttribute = new N3JS.InstancedBufferAttribute(
						instancedFloatArray,
						itemSize
					);
					break;
				case 'float':
				default:
					if (NgxThreeUtil.isNotNull(normalized) && normalized) {
						const normalizedIntArray = new Uint8Array(attribute.length);
						attribute.forEach((v, i) => {
							normalizedIntArray[i] = v;
						});
						bufferAttribute = new N3JS.Uint8BufferAttribute(
							normalizedIntArray,
							itemSize
						);
						bufferAttribute.normalized = true;
					} else {
						const floatArray = new Float32Array(attribute.length);
						attribute.forEach((v, i) => {
							floatArray[i] = v;
						});
						bufferAttribute = new N3JS.Float32BufferAttribute(
							floatArray,
							itemSize
						);
					}
			}
		}
		if (bufferAttribute !== null && NgxThreeUtil.isNotNull(usage)) {
			switch (usage.toLowerCase()) {
				case 'staticdrawusage':
				case 'staticdraw':
					bufferAttribute.setUsage(N3JS.StaticDrawUsage);
					break;
				case 'dynamicdrawusage':
				case 'dynamicdraw':
					bufferAttribute.setUsage(N3JS.DynamicDrawUsage);
					break;
				case 'streamdrawusage':
				case 'streamdraw':
					bufferAttribute.setUsage(N3JS.StreamDrawUsage);
					break;
				case 'staticreadusage':
				case 'staticread':
					bufferAttribute.setUsage(N3JS.StaticReadUsage);
					break;
				case 'dynamicreadusage':
				case 'dynamicread':
					bufferAttribute.setUsage(N3JS.DynamicReadUsage);
					break;
				case 'streamreadusage':
				case 'streamread':
					bufferAttribute.setUsage(N3JS.StreamReadUsage);
					break;
				case 'staticcopyusage':
				case 'staticcopy':
					bufferAttribute.setUsage(N3JS.StaticCopyUsage);
					break;
				case 'dynamiccopyusage':
				case 'dynamiccopy':
					bufferAttribute.setUsage(N3JS.DynamicCopyUsage);
					break;
				case 'streamcopyusage':
				case 'streamcopy':
					bufferAttribute.setUsage(N3JS.StreamCopyUsage);
					break;
			}
		}
		bufferAttribute.needsUpdate = true;
		return bufferAttribute;
	}

	/**
	 * Object3d of Geomerty component
	 */
	private _object3d: {
		[key: string]: (I3JS.Mesh | I3JS.Line | I3JS.Points | I3JS.Sprite)[];
	} = {};

	/**
	 * unSets object3d
	 * @param object3d
	 */
	public unsetObject3d(object3d: NgxAbstractSubscribeComponent) {
		const key: string = object3d.getId();
		this.unSubscribeRefer('geometry_' + key);
		this.unSubscribeRefer('ungeometry_' + key);
		if (NgxThreeUtil.isNotNull(this._object3d[key])) {
			delete this._object3d[key];
		}
	}

	/**
	 * Sets object3d
	 * @param object3d
	 */
	public setObject3d(object3d: NgxAbstractSubscribeComponent) {
		if (NgxThreeUtil.isNotNull(object3d)) {
			const key: string = object3d.getId();
			let object = NgxThreeUtil.getObject3d(object3d);
			const objectList: I3JS.Object3D[] = [];
			let meshes: (I3JS.Mesh | I3JS.Line | I3JS.Points | I3JS.Sprite)[] =
				[];
			if (NgxThreeUtil.isNotNull(object)) {
				if (NgxThreeUtil.isNotNull(this.refName)) {
					if (this.refName === '*') {
						object.traverse((child: any) => {
							if (NgxThreeUtil.isNotNull(child['geometry'])) {
								objectList.push(child);
							}
						});
					} else if (Array.isArray(this.refName)) {
						this.refName.forEach((refName) => {
							const foundObj = object.getObjectByName(refName);
							if (NgxThreeUtil.isNotNull(foundObj)) {
								objectList.push(foundObj);
							}
						});
					} else {
						const foundObj = object.getObjectByName(this.refName);
						if (NgxThreeUtil.isNotNull(foundObj)) {
							objectList.push(foundObj);
						}
					}
				} else {
					objectList.push(object);
				}
			}
			if (objectList.length > 0) {
				objectList.forEach((object) => {
					if (
						object instanceof N3JS.Mesh ||
						object instanceof N3JS.Line ||
						object instanceof N3JS.Points ||
						object instanceof N3JS.Sprite
					) {
						meshes.push(object);
					}
				});
			}
			this._object3d[key] = meshes;
			this.subscribeRefer(
				'geometry_' + key,
				NgxThreeUtil.getSubscribe(
					object3d,
					() => {
						this.setObject3d(object3d);
					},
					'loaded'
				)
			);
			this.subscribeRefer(
				'ungeometry_' + key,
				NgxThreeUtil.getSubscribe(
					object3d,
					() => {
						this.unsetObject3d(object3d);
					},
					'destroy'
				)
			);
			this.getGeometry();
			this.synkObject3d(this.geometry, key);
		}
	}

	/**
	 * Synks object3d
	 * @param [geometry]
	 */
	synkObject3d(geometry: I3JS.BufferGeometry = null, key: string = null) {
		if (NgxThreeUtil.isNotNull(geometry) && this.enabled) {
			if (NgxThreeUtil.isNotNull(this._object3d)) {
				let object3dList: (
					| I3JS.Mesh
					| I3JS.Line
					| I3JS.Points
					| I3JS.Sprite
				)[] = [];
				if (NgxThreeUtil.isNotNull(key)) {
					if (
						NgxThreeUtil.isNotNull(this._object3d[key]) &&
						NgxThreeUtil.isNotNull(this._object3d[key]) &&
						this._object3d[key].length > 0
					) {
						object3dList.push(...this._object3d[key]);
					}
				} else {
					Object.entries(this._object3d).forEach(([_, object3d]) => {
						if (NgxThreeUtil.isNotNull(object3d) && object3d.length > 0) {
							object3dList.push(...object3d);
						}
					});
				}
				object3dList.forEach((info: any) => {
					info.geometry = this.geometry;
					if (info instanceof N3JS.Mesh) {
						if (
							NgxThreeUtil.isNotNull(this.compressPositions) &&
							this.compressPositions
						) {
							N3JS.GeometryCompressionUtils.compressPositions(info);
						}
						if (NgxThreeUtil.isNotNull(this.compressNormals)) {
							switch (this.compressNormals.toLowerCase()) {
								case 'default':
									N3JS.GeometryCompressionUtils.compressNormals(info, 'DEFAULT');
									break;
								case 'oct1byte':
									N3JS.GeometryCompressionUtils.compressNormals(info, 'OCT1Byte');
									break;
								case 'oct2byte':
									N3JS.GeometryCompressionUtils.compressNormals(info, 'OCT2Byte');
									break;
								case 'angles':
									N3JS.GeometryCompressionUtils.compressNormals(info, 'ANGLES');
									break;
							}
						}
						if (this.compressUvs) {
							N3JS.GeometryCompressionUtils.compressUvs(info);
						}
					}
					if (NgxThreeUtil.isNotNull(info['updateMorphTargets'])) {
						info['updateMorphTargets']();
					}
				});
			} else if (this.geometry !== geometry) {
				this.geometry = geometry;
			}
		}
	}

	/**
	 * The Geometry of abstract geometry component
	 */
	protected geometry: I3JS.BufferGeometry = null;

	/**
	 * Sets geometry
	 * @param geometry
	 */
	protected setGeometry(geometry: I3JS.BufferGeometry) {
		if (NgxThreeUtil.isNotNull(geometry) && this.geometry !== geometry) {
			const anyGeometry: any = geometry;
			if (NgxThreeUtil.isNotNull(geometry.getAttribute('position'))) {
				if (NgxThreeUtil.isNotNull(this.meshType)) {
					const meshType = this.meshType.toLowerCase();
					switch (meshType) {
						case 'wireframesimple':
						case 'wireframebuffergeometry':
						case 'wireframegeometry':
						case 'wireframebuffer':
						case 'wireframe':
						case 'wireframe2buffergeometry':
						case 'wireframe2geometry':
						case 'wireframe2buffer':
						case 'wireframe2':
						case 'wireframebuffergeometry2':
						case 'wireframegeometry2':
						case 'wireframebuffer2':
						case 'edgesbuffergeometry':
						case 'edgesbuffer':
						case 'edgesgeometry':
						case 'edges':
							let lineGeometry: I3JS.BufferGeometry = null;
							switch (meshType) {
								case 'wireframesimple':
									const simpleParameters: any = anyGeometry['parameters'] || {};
									lineGeometry = new N3JS.WireframeGeometry(geometry);
									let simplePositions: Float32Array = null;
									switch (geometry.type) {
										case 'PlaneGeometry':
											simplePositions = new Float32Array(15);
											const halfWidth = simpleParameters['width'] / 2;
											const halfHeight = simpleParameters['height'] / 2;
											simplePositions[0] = -halfWidth;
											simplePositions[1] = halfHeight;
											simplePositions[2] = 0;
											simplePositions[3] = -halfWidth;
											simplePositions[4] = -halfHeight;
											simplePositions[5] = 0;
											simplePositions[6] = halfWidth;
											simplePositions[7] = -halfHeight;
											simplePositions[8] = 0;
											simplePositions[9] = halfWidth;
											simplePositions[10] = halfHeight;
											simplePositions[11] = 0;
											simplePositions[12] = -halfWidth;
											simplePositions[13] = halfHeight;
											simplePositions[14] = 0;
											break;
									}
									if (simplePositions !== null) {
										const positionAttribe = new N3JS.Float32BufferAttribute(
											simplePositions,
											3
										);
										lineGeometry.setAttribute('position', positionAttribe);
									}
									break;
								case 'wireframebuffergeometry':
								case 'wireframegeometry':
								case 'wireframebuffer':
								case 'wireframe':
									lineGeometry = new N3JS.WireframeGeometry(geometry);
									break;
								case 'wireframe2buffergeometry':
								case 'wireframe2geometry':
								case 'wireframe2buffer':
								case 'wireframe2':
								case 'wireframebuffergeometry2':
								case 'wireframegeometry2':
								case 'wireframebuffer2':
									const vertices: number[] = [];
									const parameters: any = anyGeometry['parameters'] || {};
									const attrPosition = geometry.getAttribute('position');
									const attrIndex = geometry.getIndex();
									let px1 = 0;
									let py1 = 0;
									let pz1 = 0;
									let px2 = 0;
									let py2 = 0;
									let pz2 = 0;
									switch (geometry.type) {
										case 'CircleGeometry':
											{
												lineGeometry = new N3JS.LineSegmentsGeometry();
												const segments = (parameters.segments || 1) + 2;
												const isClosed =
													parameters.thetaLength < Math.PI * 2 ? false : true;
												for (
													let i = isClosed ? 1 : 0;
													i <= (isClosed ? segments - 2 : segments - 1);
													i++
												) {
													const idx = (i + 1) % segments;
													px1 = attrPosition.getX(i);
													py1 = attrPosition.getY(i);
													pz1 = attrPosition.getZ(i);
													px2 = attrPosition.getX(idx);
													py2 = attrPosition.getY(idx);
													pz2 = attrPosition.getZ(idx);
													vertices.push(px1, py1, pz1, px2, py2, pz2);
												}
											}
											break;
										case 'CircleDepthGeometry':
										case 'PlaneDepthGeometry':
										case 'RingDepthGeometry':
										case 'StarDepthGeometry':
											{
												const sideGroup = geometry.groups[2];
												if (NgxThreeUtil.isNotNull(sideGroup)) {
													lineGeometry = new N3JS.LineSegmentsGeometry();
													for (
														let i = sideGroup.start;
														i < sideGroup.start + sideGroup.count;
														i += 3
													) {
														const idxStart = attrIndex.getX(i);
														const idxEnd = attrIndex.getX(i + 1);
														px1 = attrPosition.getX(idxStart);
														py1 = attrPosition.getY(idxStart);
														pz1 = attrPosition.getZ(idxStart);
														px2 = attrPosition.getX(idxEnd);
														py2 = attrPosition.getY(idxEnd);
														pz2 = attrPosition.getZ(idxEnd);
														vertices.push(px1, py1, pz1, px2, py2, pz2);
													}
												}
											}
											break;
										case 'BoxGeometry':
											{
												lineGeometry = new N3JS.LineSegmentsGeometry();
												const gridY = parameters.heightSegments + 1;
												const gridZ = parameters.depthSegments + 1;
												const p1 = 0;
												const p2 = p1 + gridZ - 1;
												const p3 = gridZ * gridY - 1;
												const p4 = p3 - p2;
												const skipDepth = gridZ * gridY;
												const p5 = p1 + skipDepth;
												const p6 = p2 + skipDepth;
												const p7 = p3 + skipDepth;
												const p8 = p4 + skipDepth;
												const lineList: { start: number; end: number }[] = [];
												lineList.push({ start: p1, end: p2 });
												lineList.push({ start: p2, end: p3 });
												lineList.push({ start: p3, end: p4 });
												lineList.push({ start: p4, end: p1 });
												lineList.push({ start: p5, end: p6 });
												lineList.push({ start: p6, end: p7 });
												lineList.push({ start: p7, end: p8 });
												lineList.push({ start: p8, end: p5 });
												lineList.push({ start: p1, end: p6 });
												lineList.push({ start: p2, end: p5 });
												lineList.push({ start: p3, end: p8 });
												lineList.push({ start: p4, end: p7 });
												lineList.forEach((line) => {
													const idxStart = line.start;
													const idxEnd = line.end;
													px1 = attrPosition.getX(idxStart);
													py1 = attrPosition.getY(idxStart);
													pz1 = attrPosition.getZ(idxStart);
													px2 = attrPosition.getX(idxEnd);
													py2 = attrPosition.getY(idxEnd);
													pz2 = attrPosition.getZ(idxEnd);
													vertices.push(px1, py1, pz1, px2, py2, pz2);
												});
											}
											break;
										case 'PlaneGeometry':
											{
												lineGeometry = new N3JS.LineSegmentsGeometry();
												const gridX = parameters.widthSegments + 1;
												const gridY = parameters.heightSegments + 1;
												const p1 = 0;
												const p2 = p1 + gridX - 1;
												const p3 = gridX * gridY - 1;
												const p4 = p3 - p2;
												const lineList: { start: number; end: number }[] = [];
												lineList.push({ start: p1, end: p2 });
												lineList.push({ start: p2, end: p3 });
												lineList.push({ start: p3, end: p4 });
												lineList.push({ start: p4, end: p1 });
												lineList.forEach((line) => {
													const idxStart = line.start;
													const idxEnd = line.end;
													px1 = attrPosition.getX(idxStart);
													py1 = attrPosition.getY(idxStart);
													pz1 = attrPosition.getZ(idxStart);
													px2 = attrPosition.getX(idxEnd);
													py2 = attrPosition.getY(idxEnd);
													pz2 = attrPosition.getZ(idxEnd);
													vertices.push(px1, py1, pz1, px2, py2, pz2);
												});
											}
											break;
										case 'RingGeometry':
											{
												lineGeometry = new N3JS.LineSegmentsGeometry();
												const gridX = parameters.thetaSegments + 1;
												const gridY = parameters.phiSegments + 1;
												const lineList: { start: number; end: number }[] = [];
												for (let i = 0; i < gridX - 1; i++) {
													lineList.push({ start: i, end: i + 1 });
												}
												const topStart = gridX * (gridY - 1);
												for (let i = 0; i < gridX - 1; i++) {
													lineList.push({
														start: topStart + i,
														end: topStart + i + 1,
													});
												}

												lineList.push({ start: 0, end: topStart });
												lineList.push({
													start: 0 + gridX - 1,
													end: topStart + gridX - 1,
												});
												lineList.forEach((line) => {
													const idxStart = line.start;
													const idxEnd = line.end;
													px1 = attrPosition.getX(idxStart);
													py1 = attrPosition.getY(idxStart);
													pz1 = attrPosition.getZ(idxStart);
													px2 = attrPosition.getX(idxEnd);
													py2 = attrPosition.getY(idxEnd);
													pz2 = attrPosition.getZ(idxEnd);
													vertices.push(px1, py1, pz1, px2, py2, pz2);
												});
											}
											break;
										case 'StarGeometry':
											{
												lineGeometry = new N3JS.LineSegmentsGeometry();
												const segments = (parameters.segments || 1) + 2;
												const isClosed =
													parameters.thetaLength < Math.PI * 2 ? false : true;
												for (
													let i = isClosed ? 1 : 0;
													i <= (isClosed ? segments - 2 : segments - 1);
													i++
												) {
													const idx = (i + 1) % segments;
													px1 = attrPosition.getX(i);
													py1 = attrPosition.getY(i);
													pz1 = attrPosition.getZ(i);
													px2 = attrPosition.getX(idx);
													py2 = attrPosition.getY(idx);
													pz2 = attrPosition.getZ(idx);
													vertices.push(px1, py1, pz1, px2, py2, pz2);
												}
											}
											break;
										default:
											break;
									}
									if (lineGeometry === null) {
										lineGeometry = new N3JS.WireframeGeometry2(
											geometry
										);
									}
									if (vertices.length > 0) {
										const lineSegments = new Float32Array(vertices);
										const instanceBuffer = new N3JS.InstancedInterleavedBuffer(
											lineSegments,
											6,
											1
										); // xyz, xyz
										lineGeometry.setAttribute(
											'instanceStart',
											new N3JS.InterleavedBufferAttribute(instanceBuffer, 3, 0)
										); // xyz
										lineGeometry.setAttribute(
											'instanceEnd',
											new N3JS.InterleavedBufferAttribute(instanceBuffer, 3, 3)
										); // xyz
										lineGeometry.computeBoundingBox();
										lineGeometry.computeBoundingSphere();
									}
									break;
								case 'edgesbuffergeometry':
								case 'edgesbuffer':
								case 'edgesgeometry':
								case 'edges':
									lineGeometry = new N3JS.EdgesGeometry(
										geometry,
										NgxThreeUtil.getTypeSafe(this.thresholdAngle, 0)
									);
									break;
							}
							if (lineGeometry !== null) {
								geometry = lineGeometry;
							}
							break;
					}
				}
				if (NgxThreeUtil.isNotNull(this.program)) {
					NgxGeometryUtils.getGeometry(
						this.program,
						geometry,
						this.programParam
					);
				}
				if (
					NgxThreeUtil.isNotNull(this.drawRangeStart) &&
					NgxThreeUtil.isNotNull(this.drawRangeCount)
				) {
					geometry.setDrawRange(this.drawRangeStart, this.drawRangeCount);
				}
				if (this.center) {
					geometry.center();
				}
				if (
					NgxThreeUtil.isNotNull(this.translationList) &&
					this.translationList.length > 0
				) {
					this.translationList.forEach((translation) => {
						const matrix = translation.getTranslation();
						geometry.applyMatrix4(matrix);
					});
				}
				if (
					NgxThreeUtil.isNotNull(this.rotationList) &&
					this.rotationList.length > 0
				) {
					this.rotationList.forEach((rotation) => {
						const euler = rotation.getRotation();
						geometry.rotateX(euler.x);
						geometry.rotateY(euler.y);
						geometry.rotateZ(euler.z);
					});
				}
				if (NgxThreeUtil.isNotNull(this.scale)) {
					const geometryScale = NgxThreeUtil.getTypeSafe(this.scale, 1);
					if (NgxThreeUtil.isNotNull(geometryScale) && geometryScale > 0) {
						geometry.scale(geometryScale, geometryScale, geometryScale);
					}
				}
				if (NgxThreeUtil.isNotNull(this.sphereScale)) {
					const sphereScale = NgxThreeUtil.getTypeSafe(this.sphereScale, 1);
					if (NgxThreeUtil.isNotNull(sphereScale) && sphereScale > 0) {
						if (geometry.boundingSphere === null) {
							geometry.computeBoundingSphere();
						}
						const scaleFactor = sphereScale / geometry.boundingSphere.radius;
						geometry.scale(scaleFactor, scaleFactor, scaleFactor);
					}
				}
				if (NgxThreeUtil.isNotNull(this.scaleList) && this.scaleList.length > 0) {
					this.scaleList.forEach((scale) => {
						const vector = scale.getScale();
						geometry.scale(vector.x, vector.y, vector.z);
					});
				}
				if (
					NgxThreeUtil.isNotNull(this.positionList) &&
					this.positionList.length > 0
				) {
					this.positionList.forEach((pos) => {
						const position = pos.getPosition();
						switch (pos.type.toLowerCase()) {
							case 'rotate':
								if (position.x !== 0) {
									geometry.rotateX(NgxThreeUtil.getAngleSafe(position.x));
								}
								if (position.y !== 0) {
									geometry.rotateY(NgxThreeUtil.getAngleSafe(position.y));
								}
								if (position.z !== 0) {
									geometry.rotateZ(NgxThreeUtil.getAngleSafe(position.z));
								}
								break;
							case 'scale':
								geometry.scale(position.x, position.y, position.z);
								break;
							case 'position':
							case 'translate':
							default:
								geometry.translate(position.x, position.y, position.z);
								break;
						}
					});
				}
				if (NgxThreeUtil.isNotNull(this.morphAttributes)) {
					const attributes = this.getMorphAttributes();
					if (attributes.length > 0) {
						attributes.forEach((attribute) => {
							switch (attribute.key.toLowerCase()) {
								default:
									geometry.morphAttributes[attribute.key] = attribute.value;
									break;
							}
						});
					}
				}
				if (
					NgxThreeUtil.isNotNull(this.autoDisplacement) &&
					this.autoDisplacement
				) {
					const itemCount = geometry.attributes.position.count;
					const itemSize = NgxThreeUtil.getTypeSafe(this.autoDisplacementSize, 3);
					geometry.setAttribute(
						'displacement',
						new N3JS.Float32BufferAttribute(itemCount * itemSize, itemSize)
					);
				}
				if (NgxThreeUtil.isNotNull(this.autoCustomColor) && this.autoCustomColor) {
					const itemCount = geometry.attributes.position.count;
					const itemSize = NgxThreeUtil.getTypeSafe(this.autoCustomColorSize, 3);
					geometry.setAttribute(
						NgxThreeUtil.getTypeSafe(this.autoCustomColorKey, 'customColor'),
						new N3JS.Float32BufferAttribute(itemCount * itemSize, itemSize)
					);
				}
				if (NgxThreeUtil.isNotNull(this.autoSize) && this.autoSize) {
					const itemCount = geometry.attributes.position.count;
					const itemSize = NgxThreeUtil.getTypeSafe(this.autoSizeSize, 1);
					geometry.setAttribute(
						'size',
						new N3JS.Float32BufferAttribute(itemCount * itemSize, itemSize)
					);
				}
				if (this.mergeVertices) {
					geometry = N3JS.GeometryUtils.mergeVertices(geometry);
				}
				if (this.edgeSplit) {
					const modifier = new N3JS.EdgeSplitModifier();
					geometry = modifier.modify(
						geometry,
						NgxThreeUtil.getAngleSafe(this.cutOffAngle, 0),
						NgxThreeUtil.getTypeSafe(this.tryKeepNormals, false)
					);
				}
				if (this.simplify) {
					const modifier = new N3JS.SimplifyModifier();
					const count = Math.floor(
						geometry.attributes.position.count *
							Math.max(0, Math.min(1, NgxThreeUtil.getTypeSafe(this.count, 1)))
					);
					geometry = modifier.modify(geometry, count);
					geometry.computeVertexNormals();
				}
				if (this.tessellate) {
					const modifier = new N3JS.TessellateModifier(
						NgxThreeUtil.getTypeSafe(this.maxEdgeLength, 8),
						NgxThreeUtil.getTypeSafe(this.maxIterations, 6)
					);
					geometry = modifier.modify(geometry);
				}
				if (this.computeVertexNormals) {
					geometry.computeVertexNormals();
				}
				if (this.computeTangents) {
					geometry.computeTangents();
				}
				if (this.computeBoundingSphere) {
					geometry.computeBoundingSphere();
				}
				if (this.computeBoundingBox) {
					geometry.computeBoundingBox();
				}
				if (this.toNonIndexed) {
					geometry = geometry.toNonIndexed();
				}
				if (this.flipY && NgxThreeUtil.isNotNull(geometry.getAttribute('uv'))) {
					const uv = geometry.attributes.uv;
					for (let i = 0; i < uv.count; i++) {
						uv.setY(i, 1 - uv.getY(i));
					}
				}
			}
			if (NgxThreeUtil.isNotNull(this.onInit)) {
				const tmpGeometry = this.onInit(geometry);
				if (
					NgxThreeUtil.isNotNull(tmpGeometry) &&
					tmpGeometry instanceof N3JS.BufferGeometry
				) {
					geometry = tmpGeometry;
				}
			}
			this.geometry = geometry;
			if (NgxThreeUtil.isNotNull(this.name)) {
				this.geometry.name = this.name;
			}
			super.setObject(this.geometry);
			this.synkObject3d(this.geometry);
		}
	}

	/**
	 * Gets geometry
	 * @template T
	 * @returns geometry
	 */
	public getGeometry<T extends I3JS.BufferGeometry>(): T {
		return this.geometry as T;
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (this.geometry !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getGeometry();
				return;
			}
			if (
				!NgxThreeUtil.isOnlyIndexOf(
					changes,
					['name', 'refgeometry', 'align'],
					this.GEOMETRY_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, [
					'name',
					'refgeometry',
					'align',
					'drawrange',
				]);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['drawrangecount', 'drawrangestart'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['drawrange']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'drawrange':
						if (
							NgxThreeUtil.isNotNull(this.drawRangeStart) &&
							NgxThreeUtil.isNotNull(this.drawRangeCount)
						) {
							this.geometry.setDrawRange(
								this.drawRangeStart,
								this.drawRangeCount
							);
						}
						break;
					case 'name':
						if (NgxThreeUtil.isNotNull(this.name)) {
							this.geometry.name = NgxThreeUtil.getTypeSafe(this.name, 'No Name');
						}
						break;
					case 'align':
						if (
							NgxThreeUtil.isNotNull(this.align) &&
							NgxThreeUtil.isNotNull(this.geometry.getAttribute('position'))
						) {
							this.geometry.center();
							this.geometry.computeBoundingBox();
							const boundingBox = this.geometry.boundingBox;
							const alignSides = [
								'left',
								'center',
								'right',
								'top',
								'middle',
								'bottom',
								'front',
								'back',
								'double',
							];
							const alignGeometry = this.align.toLowerCase();
							alignSides.forEach((side) => {
								if (alignGeometry.indexOf(side) > -1) {
									switch (side.toLowerCase()) {
										case 'left':
											this.geometry.translate(-boundingBox.max.x, 0, 0);
											break;
										case 'center':
											this.geometry.translate(
												-(boundingBox.max.x + boundingBox.min.x) / 2,
												0,
												0
											);
											break;
										case 'right':
											this.geometry.translate(-boundingBox.min.x, 0, 0);
											break;
										case 'top':
											this.geometry.translate(0, -boundingBox.max.y, 0);
											break;
										case 'middle':
											this.geometry.translate(
												0,
												-(boundingBox.max.y + boundingBox.min.y) / 2,
												0
											);
											break;
										case 'bottom':
											this.geometry.translate(0, -boundingBox.min.y, 0);
											break;
										case 'front':
											this.geometry.translate(0, 0, -boundingBox.max.z);
											break;
										case 'double':
											this.geometry.translate(
												0,
												0,
												-(boundingBox.max.z + boundingBox.min.z) / 2
											);
											break;
										case 'back':
											this.geometry.translate(0, 0, -boundingBox.min.z);
											break;
									}
								}
							});
						}
						break;
				}
			});
			super.applyChanges(changes);
		}
	}
}
