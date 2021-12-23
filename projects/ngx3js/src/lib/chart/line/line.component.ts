import {
	Component,
	forwardRef,
	Input,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import {
	NgxAbstractChartComponent,
} from '../../chart.abstract';
import { I3JS, N3JS, NgxThreeUtil } from '../../interface';
import { IAttributeUpdateInfo } from '../../ngx-interface';
import { NgxAbstractObject3dComponent } from '../../object3d.abstract';

/**
 * The Chart Line component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ChartLineComponent) page for details.
 *
 */
@Component({
	selector: 'ngx3js-chart-line',
	templateUrl: './line.component.html',
	styleUrls: ['./line.component.scss'],
	providers: [
		{
			provide: NgxAbstractObject3dComponent,
			useExisting: forwardRef(() => NgxChartLineComponent),
		},
	],
})
export class NgxChartLineComponent extends NgxAbstractChartComponent implements OnInit
{
	/**
	 * The type of chart line component
	 */
	@Input() public type: string = '';

	/**
	 * The data of chart line component
	 */
	@Input() public data: number[] = [];

	/**
	 * Creates an instance of chart line component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('chart-line');
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
		if (changes && this.chart) {
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
	 * The Line of chart line component
	 */
	private _line: I3JS.Object3D = null;

	/**
	 * The Material of chart line component
	 */
	private _material: I3JS.Material = null;

	/**
	 * The Geometry of chart line component
	 */
	private _geometry: I3JS.BufferGeometry = null;

	/**
	 * Material border of chart line component
	 */
	private _materialBorder: I3JS.LineBasicMaterial = null;

	/**
	 * Geometry border of chart line component
	 */
	private _geometryBorder: I3JS.BufferGeometry = null;

	/**
	 * Material point of chart line component
	 */
	private _materialPoint: I3JS.Material = null;

	/**
	 * Geometry point of chart line component
	 */
	private _geometryPoint: I3JS.BufferGeometry = null;

	/**
	 * Material point border of chart line component
	 */
	private _materialPointBorder: I3JS.LineBasicMaterial = null;

	/**
	 * Geometry point border of chart line component
	 */
	private _geometryPointBorder: I3JS.BufferGeometry = null;

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	protected applyChanges3d(changes: string[]) {
		if (this._line !== null) {
			if (NgxThreeUtil.isIndexOf(changes, ['clearinit'])) {
				this.getLine();
			}
			if (!NgxThreeUtil.isOnlyIndexOf(changes, ['options'], this.CHART_ATTR)) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, ['init'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['options']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'options':
						if (NgxThreeUtil.isNotNull(this.options)) {
							this._material.opacity = NgxThreeUtil.getTypeSafe(
								this.options.opacity,
								1
							);
						}
						break;
				}
			});
			super.applyChanges3d(changes);
		}
	}

	/**
	 * Gets Chart
	 * @template T
	 * @returns object3d
	 */
	public getChart<T extends I3JS.Object3D>(): T {
		return this.getLine();
	}

	/**
	 * Gets Chart
	 * @template T
	 * @returns object3d
	 */
	public getLine<T extends I3JS.Object3D>(): T {
		if (this._line === null || this._needUpdate) {
			this.needUpdate = false;
			this.clearChart();
			this._line = new N3JS.Group();
			const data: number[] = NgxThreeUtil.getTypeSafe(this.data, []);
			this.getTestData(data);
			const baseZ = this.getDepthCenter();
			const [scaleMin, scaleMax] = this.getScaleMinMax(data);
			const upPoints: number[] = [];
			const downPoints: number[] = [];
			const downBase = -NgxThreeUtil.getTypeSafe(this.height, 1) / 2;
			data.forEach((p) => {
				upPoints.push(this.getHeightCenter(scaleMin, scaleMax, p));
				downPoints.push(downBase);
			});
			let attributePosition: Float32Array = null;
			let attributeLine: Float32Array = null;
			let attributeIndex: number[] = [];
			let areaUpdateAttributes: IAttributeUpdateInfo[] = [];
			let lineUpdateAttributes: IAttributeUpdateInfo[] = [];
			const middleY = 0;
			let areaIdx = 0;
			let side: string = 'double';
			switch (this.type.toLowerCase()) {
				case 'linedepth':
					attributePosition = new Float32Array(upPoints.length * 2 * 3 * 2);
					attributeLine = new Float32Array((upPoints.length - 1) * 2 * 3 * 2);
					const lineDepthSizeHalf = this.getDepthSize() / 2;
					upPoints.forEach((p, i) => {
						const idx = i * 12;
						const x = this.getWidthCenter(i);
						attributePosition[idx + 0] = x;
						attributePosition[idx + 1] = middleY;
						attributePosition[idx + 2] = baseZ + lineDepthSizeHalf;
						attributePosition[idx + 3] = x;
						attributePosition[idx + 4] = downPoints[i];
						attributePosition[idx + 5] = baseZ + lineDepthSizeHalf;
						areaUpdateAttributes.push({
							index: areaIdx,
							from: middleY,
							to: p,
						});
						attributePosition[idx + 6] = x;
						attributePosition[idx + 7] = middleY;
						attributePosition[idx + 8] = baseZ - lineDepthSizeHalf;
						attributePosition[idx + 9] = x;
						attributePosition[idx + 10] = downPoints[i];
						attributePosition[idx + 11] = baseZ - lineDepthSizeHalf;
						areaUpdateAttributes.push({
							index: areaIdx + 2,
							from: middleY,
							to: p,
						});

						if (i < this.widthLength - 1) {
							const nextP = upPoints[i + 1];
							const nextX = this.getWidthCenter(i + 1);
							attributeLine[idx + 0] = x;
							attributeLine[idx + 1] = middleY;
							attributeLine[idx + 2] = baseZ + lineDepthSizeHalf;
							attributeLine[idx + 3] = nextX;
							attributeLine[idx + 4] = middleY;
							attributeLine[idx + 5] = baseZ + lineDepthSizeHalf;
							lineUpdateAttributes.push({
								index: areaIdx,
								from: middleY,
								to: p,
							});
							lineUpdateAttributes.push({
								index: areaIdx + 1,
								from: middleY,
								to: nextP,
							});
							attributeLine[idx + 6] = x;
							attributeLine[idx + 7] = middleY;
							attributeLine[idx + 8] = baseZ - lineDepthSizeHalf;
							attributeLine[idx + 9] = nextX;
							attributeLine[idx + 10] = middleY;
							attributeLine[idx + 11] = baseZ - lineDepthSizeHalf;
							lineUpdateAttributes.push({
								index: areaIdx + 2,
								from: middleY,
								to: p,
							});
							lineUpdateAttributes.push({
								index: areaIdx + 3,
								from: middleY,
								to: nextP,
							});
						}
						areaIdx += 4;
					});
					attributeIndex.push(0, 2, 1);
					attributeIndex.push(2, 3, 1);
					for (let i = 0; i < upPoints.length - 1; i++) {
						const indexIdx = i * 4;
						attributeIndex.push(indexIdx, indexIdx + 1, indexIdx + 4);
						attributeIndex.push(indexIdx + 1, indexIdx + 5, indexIdx + 4);
						attributeIndex.push(indexIdx + 2, indexIdx + 6, indexIdx + 3);
						attributeIndex.push(indexIdx + 6, indexIdx + 7, indexIdx + 3);
						attributeIndex.push(indexIdx, indexIdx + 4, indexIdx + 2);
						attributeIndex.push(indexIdx + 4, indexIdx + 6, indexIdx + 2);
					}
					const ldEnd = (upPoints.length - 1) * 4;
					attributeIndex.push(ldEnd + 0, ldEnd + 1, ldEnd + 2);
					attributeIndex.push(ldEnd + 2, ldEnd + 1, ldEnd + 3);
					attributeIndex.push(1, 3, ldEnd + 1);
					attributeIndex.push(3, ldEnd + 3, ldEnd + 1);
					side = 'front';
					break;
				case 'line':
				default:
					attributePosition = new Float32Array(upPoints.length * 2 * 3);
					attributeLine = new Float32Array((upPoints.length - 1) * 2 * 3);
					upPoints.forEach((p, i) => {
						const idx = i * 6;
						const x = this.getWidthCenter(i);
						attributePosition[idx + 0] = x;
						attributePosition[idx + 1] = middleY;
						attributePosition[idx + 2] = baseZ;
						attributePosition[idx + 3] = x;
						attributePosition[idx + 4] = downPoints[i];
						attributePosition[idx + 5] = baseZ;
						areaUpdateAttributes.push({
							index: areaIdx,
							from: middleY,
							to: p,
						});
						if (i < this.widthLength - 1) {
							attributeLine[idx + 0] = x;
							attributeLine[idx + 1] = middleY;
							attributeLine[idx + 2] = baseZ;
							const nextP = upPoints[i + 1];
							const nextX = this.getWidthCenter(i + 1);
							attributeLine[idx + 3] = nextX;
							attributeLine[idx + 4] = middleY;
							attributeLine[idx + 5] = baseZ;
							lineUpdateAttributes.push({
								index: areaIdx,
								from: middleY,
								to: p,
							});
							lineUpdateAttributes.push({
								index: areaIdx + 1,
								from: middleY,
								to: nextP,
							});
						}
						areaIdx += 2;
					});
					for (let i = 0; i < upPoints.length - 1; i++) {
						const indexIdx = i * 2;
						attributeIndex.push(indexIdx, indexIdx + 1, indexIdx + 2);
						attributeIndex.push(indexIdx + 1, indexIdx + 3, indexIdx + 2);
					}
					side = 'double';
					break;
			}
			this._geometry = new N3JS.BufferGeometry();
			this._geometry.setAttribute(
				'position',
				new N3JS.BufferAttribute(attributePosition, 3)
			);
			this._geometry.setIndex(attributeIndex);
			this._geometry.computeVertexNormals();
			const options = NgxThreeUtil.getTypeSafe(this.options, {});
			this._material = new N3JS.MeshPhongMaterial({
				color: NgxThreeUtil.getColorSafe(options.backgroundColor, 0xff0000),
				opacity: NgxThreeUtil.getTypeSafe(options.opacity, 1),
				side: NgxThreeUtil.getSideSafe(side),
				transparent: true,
			});
			const wallMesh = new N3JS.Mesh(this._geometry, this._material);
			wallMesh.name = 'wall';
			wallMesh.receiveShadow = true;
			wallMesh.castShadow = true;
			this._line.add(wallMesh);
			this.addUpdateAttributes(this._geometry, areaUpdateAttributes);
			this._geometryBorder = new N3JS.BufferGeometry();
			this._geometryBorder.setAttribute(
				'position',
				new N3JS.BufferAttribute(attributeLine, 3)
			);
			this._materialBorder = new N3JS.LineBasicMaterial({
				color: NgxThreeUtil.getColorSafe(options.borderColor, 0x00ff00),
				transparent: true,
			});
			const borderMesh = new N3JS.LineSegments(
				this._geometryBorder,
				this._materialBorder
			);
			borderMesh.name = 'border';
			this._line.add(borderMesh);
			this.addUpdateAttributes(this._geometryBorder, lineUpdateAttributes);
			let pointerInfo = this.getPointShape();
			let pointer: I3JS.Object3D = pointerInfo.mesh;
			this._geometryPoint = pointerInfo.geometry;
			this._materialPoint = pointerInfo.material;
			this._geometryPointBorder = pointerInfo.geometryBorder;
			this._materialPointBorder = pointerInfo.materialBorder;
			this.addPointer(upPoints, pointer, this._line, middleY, baseZ);
			this.setChart(this._line);
		}
		return this._line as T;
	}
}
