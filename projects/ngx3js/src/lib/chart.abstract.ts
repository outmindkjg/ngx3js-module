import { AfterContentInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from './interface';
import { IAttributeUpdateInfo, IChartShape, IRendererTimer, IShapeInfo } from './ngx-interface';
import { NgxAbstractObject3dComponent } from './object3d.abstract';
import * as NGX_GEOMETRY from './geometry/index';


/**
 * The Abstract Chart component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AbstractChartComponent) page for details.
 *
 * ```ts
 * _@Component({
 * 	providers: [
 * 		{
 * 			provide: NgxAbstractObject3dComponent,
 * 			useExisting: forwardRef(() => NgxXxxComponent),
 * 		},
 * 	],
 * })
 * export class NgxXxxComponent extends NgxAbstractChartComponent implements OnInit {
 * 	constructor() {
 * 		super();
 * 	}
 * }
 * ```
 */
@Component({
	template: '',
})
export class NgxAbstractChartComponent
	extends NgxAbstractObject3dComponent
	implements OnInit, OnChanges, AfterContentInit, OnDestroy
{
	/**
	 * Width; that is, the length of the edges parallel to the X axis. Optional; defaults to 1.
	 */
	@Input() public width: number = null;

	/**
	 * Height; that is, the length of the edges parallel to the Y axis. Optional; defaults to 1.
	 */
	@Input() public height: number = null;

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() public depth: number = null;

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() public depthIdx: number = 0;

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() public depthLength: number = 1;

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() public depthSize: number = 0.8;

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() public widthLength: number = 1;

	@Input() public options: IShapeInfo = null;

	@Input() public label: string = null;

	@Input() public pointStyle: string = 'circle';

	@Input() public pointOffset: number = 0.1;

	@Input() public pointOptions: IShapeInfo = null;

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() public scaleMin: number = null;

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() public scaleMax: number = null;

	/**
	 * Object3 d attr of abstract object3d component
	 */
	protected CHART_ATTR: string[] = [];

	/**
	 * Creates an instance of abstract object3d component.
	 */
	constructor() {
		super();
		this.CHART_ATTR.push(...this.OBJECT3D_ATTR);
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 *
	 * @param subscribeType
	 */
	ngOnInit(subscribeType?: string): void {
		super.ngOnInit(subscribeType || 'chart');
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
		if (changes && this.object3d !== null) {
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
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: I3JS.Object3D): boolean {
		if (super.setParent(parent)) {
			this.getChart();
			return true;
		}
		return false;
	}

	/**
	 * The Chart of abstract chart component
	 */
	protected chart: I3JS.Object3D = null;

	/**
	 * Sets object3d
	 * @param object
	 */
	protected setObject3d(object: I3JS.Object3D) {
		this.setChart(object);
	}

	/**
	 * Gets depth center
	 *
	 * @returns depth center
	 */
	protected getDepthCenter(): number {
		const depth = NgxThreeUtil.getTypeSafe(this.depth, 1);
		const depthIdx = NgxThreeUtil.getTypeSafe(this.depthIdx, 0);
		const depthLength = Math.max(1, NgxThreeUtil.getTypeSafe(this.depthLength, 1));
		return (depth / depthLength) * (depthIdx + 0.5) - depth / 2;
	}

	/**
	 * Gets depth size
	 *
	 * @returns depth size
	 */
	protected getDepthSize(): number {
		const depth = NgxThreeUtil.getTypeSafe(this.depth, 1);
		const depthLength = Math.max(1, NgxThreeUtil.getTypeSafe(this.depthLength, 1));
		return (depth / depthLength) * NgxThreeUtil.getTypeSafe(this.depthSize, 0.9);
	}

	/**
	 * Gets width center
	 * @param widthIdx
	 * @returns width center
	 */
	protected getWidthCenter(widthIdx: number): number {
		const width = NgxThreeUtil.getTypeSafe(this.width, 1);
		const widthLength = Math.max(1, NgxThreeUtil.getTypeSafe(this.widthLength, 1));
		return (width / widthLength) * (widthIdx + 0.5) - width / 2;
	}

	/**
	 * Gets height center
	 * @param scaleMin
	 * @param scaleMax
	 * @param value
	 * @returns height center
	 */
	protected getHeightCenter(scaleMin: number, scaleMax: number, value: number): number {
		const scaleDist = scaleMax - scaleMin;
		const height = NgxThreeUtil.getTypeSafe(this.height, 1);
		return (((value - scaleMin) / scaleDist - 0.5) * height) / 2;
	}

	/**
	 * Gets scale min max
	 * @param data
	 * @returns
	 */
	protected getScaleMinMax(data: number[]) {
		let scaleMax = 100;
		let scaleMin = 0;
		if (NgxThreeUtil.isNotNull(this.scaleMax)) {
			scaleMax = NgxThreeUtil.getTypeSafe(this.scaleMax, 100);
		} else if (data.length > 0) {
			scaleMax = -Infinity;
			data.forEach((p) => {
				scaleMax = Math.max(scaleMax, p);
			});
		}
		if (NgxThreeUtil.isNotNull(this.scaleMin)) {
			scaleMin = NgxThreeUtil.getTypeSafe(this.scaleMin, 0);
		} else if (data.length > 0) {
			scaleMin = Infinity;
			data.forEach((p) => {
				scaleMin = Math.min(scaleMin, p);
			});
		}
		return [scaleMin, scaleMax];
	}

	/**
	 * Gets test data
	 * @param data
	 * @param [len]
	 * @returns
	 */
	protected getTestData(data: number[], len: number = 10) {
		if (data.length === 0) {
			for (let i = 0; i < len; i++) {
				data.push(Math.random() * 100);
			}
			this.widthLength = data.length;
		}
		return data;
	}

	/**
	 * Adds pointer
	 * @param upPoints
	 * @param pointer
	 * @param parent
	 * @param middleY
	 * @param baseZ
	 */
	protected addPointer(
		upPoints: number[],
		pointer: I3JS.Object3D,
		parent: I3JS.Object3D,
		middleY: number,
		baseZ: number
	) {
		const height = NgxThreeUtil.getTypeSafe(this.height, 1);
		const offsetY = height * NgxThreeUtil.getTypeSafe(this.pointOffset, 0);
		upPoints.forEach((p, i) => {
			const x = this.getWidthCenter(i);
			const point = pointer.clone(true);
			point.position.set(x, middleY, baseZ);
			point.castShadow = true;
			parent.add(point);
			this.addUpdatePosition(
				point,
				{
					index: 1,
					from: middleY,
					to: p + offsetY,
				},
				true
			);
		});
	}

	/**
	 * Update attributes of abstract chart component
	 */
	private _updateAttributes: {
		attribute: I3JS.BufferAttribute | I3JS.InterleavedBufferAttribute;
		values: IAttributeUpdateInfo[];
	}[] = [];

	/**
	 * Update position of abstract chart component
	 */
	private _updatePosition: {
		position: I3JS.Vector3;
		value: IAttributeUpdateInfo;
	}[] = [];

	/**
	 * Update points of abstract chart component
	 */
	private _updatePoints: I3JS.Object3D[] = [];

	/**
	 * Adds update attributes
	 * @param geometry
	 * @param values
	 */
	protected addUpdateAttributes(geometry: I3JS.BufferGeometry, values: IAttributeUpdateInfo[]) {
		this._updateAttributes.push({
			attribute: geometry.getAttribute('position'),
			values: values,
		});
	}

	/**
	 * Adds update position
	 * @param object3d
	 * @param value
	 * @param [isPointer]
	 */
	protected addUpdatePosition(object3d: I3JS.Object3D, value: IAttributeUpdateInfo, isPointer: boolean = true) {
		this._updatePosition.push({
			position: object3d.position,
			value: value,
		});
		if (isPointer) {
			this._updatePoints.push(object3d);
		}
	}

	/**
	 * Clears chart
	 */
	protected clearChart() {
		this._updateAttributes = [];
		this._updatePosition = [];
		this._updatePoints = [];
	}

	/**
	 * Sets chart
	 * @param object
	 */
	protected setChart(object: I3JS.Object3D) {
		this.chart = object;
		super.setObject3d(object);
		if (this.controllerList.length === 0) {
			this.update(null, 1, 0.1);
		}
	}

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T extends I3JS.Object3D>(): T {
		return this.getChart();
	}

	/**
	 * Gets Chart
	 * @template T
	 * @returns object3d
	 */
	public getChart<T extends I3JS.Object3D>(): T {
		return this.chart as T;
	}

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	protected applyChanges3d(changes: string[]) {
		if (this.chart !== null) {
			if (NgxThreeUtil.isIndexOf(changes, ['clearinit'])) {
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, ['init'])) {
				changes = NgxThreeUtil.pushUniq(changes, []);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
				}
			});
			super.applyChanges3d(changes);
		}
	}

	/**
	 * Gets point shape
	 * @returns point shape
	 */
	protected getPointShape(): IChartShape {
		return this.getMeshAndBorder(NgxThreeUtil.getTypeSafe(this.pointStyle, 'circle'), this.pointOptions);
	}

	/**
	 * Gets mesh and border
	 * @param type
	 * @param options
	 * @returns mesh and border
	 */
	protected getMeshAndBorder(type: string, options: IShapeInfo): IChartShape {
		if (NgxThreeUtil.isNull(options)) {
			options = {};
		}
		if (NgxThreeUtil.isNull(options.radius)) {
			options.radius = 0.06;
		}
		let geometry: I3JS.BufferGeometry = null;
		let side: string = 'front';
		switch (type.toLowerCase()) {
			case 'plane':
				geometry = new N3JS.PlaneGeometry(options.radius * 2, options.radius * 2);
				side = 'double';
				break;
			case 'star':
				geometry = new NGX_GEOMETRY.NgxStarGeometry(options.radius * 0.5, options.radius, 5) as any;
				side = 'double';
				break;
			case 'ring':
				geometry = new N3JS.RingGeometry(options.radius * 0.5, options.radius);
				side = 'double';
				break;
			case 'sphere':
				geometry = new N3JS.SphereGeometry(options.radius, 10, 5);
				break;
			case 'box':
				geometry = new N3JS.BoxGeometry(options.radius * 2, options.radius * 2, options.radius * 2);
				break;
			case 'circle':
			default:
				geometry = new N3JS.CircleGeometry(options.radius, 32);
				side = 'double';
				break;
		}
		const material = new N3JS.MeshPhongMaterial({
			color: NgxThreeUtil.getColorSafe(options.backgroundColor, 0xff0000),
			opacity: NgxThreeUtil.getTypeSafe(options.opacity, 1),
			side: NgxThreeUtil.getSideSafe(side),
			transparent: true,
		});
		const mesh: I3JS.Mesh = new N3JS.Mesh(geometry, material);
		mesh.castShadow = true;
		const geometryBorder = new NGX_GEOMETRY.NgxOutlineGeometry(geometry, 1.2) as any;
		const materialBorder = new N3JS.LineDashedMaterial({
			color: NgxThreeUtil.getColorSafe(options.borderColor, 0x000000),
			linewidth: 3,
			linecap: 'round',
			linejoin: 'round',
			dashSize: 3,
			gapSize: 1,
			scale: 500,
		});
		let border: I3JS.LineSegments = new N3JS.LineSegments(geometryBorder as any, materialBorder);
		border.computeLineDistances();
		mesh.add(border);
		return {
			mesh: mesh,
			geometry: geometry,
			material: material,
			geometryBorder: geometryBorder,
			materialBorder: materialBorder,
		};
	}

	/**
	 * Updates abstract chart component
	 * @param _
	 * @param elapsedTime
	 * @param delta
	 */
	public update(_: IRendererTimer, elapsedTime: number, delta: number) {
		if (
			NgxThreeUtil.isNotNull(this._updateAttributes) ||
			NgxThreeUtil.isNotNull(this._updatePosition) ||
			NgxThreeUtil.isNotNull(this._updatePoints)
		) {
			if (elapsedTime > 0 && elapsedTime < 1.5 && delta > 0) {
				elapsedTime = Math.min(elapsedTime, 1);
				if (NgxThreeUtil.isNotNull(this._updateAttributes) && this._updateAttributes.length > 0) {
					this._updateAttributes.forEach((info) => {
						const attribute = info.attribute;
						info.values.forEach((data) => {
							attribute.setY(data.index, N3JS.MathUtils.lerp(data.from, data.to, elapsedTime));
						});
						attribute.needsUpdate = true;
					});
				}
				if (NgxThreeUtil.isNotNull(this._updatePosition) && this._updatePosition.length > 0) {
					this._updatePosition.forEach((info) => {
						const position = info.position;
						const data = info.value;
						position.setY(N3JS.MathUtils.lerp(data.from, data.to, elapsedTime));
					});
				}
			}
			if (NgxThreeUtil.isNotNull(this._updatePoints) && this._updatePoints.length > 0) {
				this._updatePoints.forEach((object3d) => {
					object3d.rotation.y += delta * 0.5;
					object3d.rotation.x += delta * 0.3;
				});
			}
		}
	}
}
