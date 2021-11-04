import {
	Component,
	forwardRef,
	Input,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import {
	AbstractChartComponent,
	AttributeUpdateInfo,
} from '../../chart.abstract';
import { AbstractObject3dComponent } from '../../object3d.abstract';
import * as THREE from 'three';
import { RendererTimer, ThreeUtil } from '../../interface';
import { MathUtils } from 'three';

@Component({
	selector: 'ngx3js-chart-bar',
	templateUrl: './bar.component.html',
	styleUrls: ['./bar.component.scss'],
	providers: [
		{
			provide: AbstractObject3dComponent,
			useExisting: forwardRef(() => ChartBarComponent),
		},
	],
})
export class ChartBarComponent
	extends AbstractChartComponent
	implements OnInit
{
	/**
	 * Input  of chart bar component
	 */
	@Input() public type: string = '';

	/**
	 * Input  of chart bar component
	 */
	@Input() public data: number[] = [];

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() public scaleMin: number = null;

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() public scaleMax: number = null;

	/**
	 * Creates an instance of chart bar component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('chart-bar');
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
	 * Line  of chart bar component
	 */
	private _line: THREE.Object3D = null;

	/**
	 * Material  of chart bar component
	 */
	private _material: THREE.Material = null;

	/**
	 * Geometry  of chart bar component
	 */
	private _geometry: THREE.BufferGeometry = null;

	/**
	 * Material border of chart bar component
	 */
	private _materialBorder: THREE.LineBasicMaterial = null;

	/**
	 * Geometry border of chart bar component
	 */
	private _geometryBorder: THREE.BufferGeometry = null;

	/**
	 * Material point of chart bar component
	 */
	private _materialPoint: THREE.Material = null;

	/**
	 * Geometry point of chart bar component
	 */
	private _geometryPoint: THREE.BufferGeometry = null;

	/**
	 * Material point border of chart bar component
	 */
	private _materialPointBorder: THREE.LineBasicMaterial = null;

	/**
	 * Geometry point border of chart bar component
	 */
	private _geometryPointBorder: THREE.BufferGeometry = null;

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	protected applyChanges3d(changes: string[]) {
		if (this._line !== null) {
			if (ThreeUtil.isIndexOf(changes, ['clearinit'])) {
				this.getLine();
			}
			if (!ThreeUtil.isOnlyIndexOf(changes, ['options'], this.CHART_ATTR)) {
				this.needUpdate = true;
				return;
			}
			if (ThreeUtil.isIndexOf(changes, ['init'])) {
				changes = ThreeUtil.pushUniq(changes, ['options']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'options':
						if (ThreeUtil.isNotNull(this.options)) {
							this._material.opacity = ThreeUtil.getTypeSafe(
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
	public getChart<T extends THREE.Object3D>(): T {
		return this.getLine();
	}

	/**
	 * Gets Chart
	 * @template T
	 * @returns object3d
	 */
	public getLine<T extends THREE.Object3D>(): T {
		if (this._line === null || this._needUpdate) {
			this.needUpdate = false;
			this.clearChart();
			this._line = new THREE.Group();
			const width = ThreeUtil.getTypeSafe(this.width, 1);
			const height = ThreeUtil.getTypeSafe(this.height, 1);
			const data: number[] = ThreeUtil.getTypeSafe(this.data, []);
			this.getTestData(data);
			const baseZ = this.getDepthCenter();
			const [scaleMax, scaleMin] = this.getScaleMinMax(data);
			const scaleDist = scaleMax - scaleMin;
			const upPoints: number[] = [];
			const downPoints: number[] = [];
			const downBase = -height / 2;
			data.forEach((p) => {
				upPoints.push((((p - scaleMin) / scaleDist - 0.5) * height) / 2);
				downPoints.push(downBase);
			});
			let attributePosition: Float32Array = null;
			let attributeLine: Float32Array = null;
			let attributeIndex: number[] = [];
			let areaUpdateAttributes: AttributeUpdateInfo[] = [];
			let lineUpdateAttributes: AttributeUpdateInfo[] = [];
			const lineStepX = width / upPoints.length;
			const lineBaseX = -width / 2 + lineStepX / 2;
			const lineLen = upPoints.length;
			const middleY = 0;
			switch (this.type.toLowerCase()) {
				case 'line':
				default:
					attributePosition = new Float32Array(upPoints.length * 2 * 3);
					attributeLine = new Float32Array((upPoints.length - 1) * 2 * 3);
					let areaIdx = 0;
					upPoints.forEach((p, i) => {
						const idx = i * 6;
						const x = i * lineStepX + lineBaseX;
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
						if (i < lineLen - 1) {
							attributeLine[idx + 0] = x;
							attributeLine[idx + 1] = middleY;
							attributeLine[idx + 2] = baseZ;
							const nextP = upPoints[i + 1];
							const nextX = (i + 1) * lineStepX + lineBaseX;
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
					break;
			}
			this._geometry = new THREE.BufferGeometry();
			this._geometry.setAttribute(
				'position',
				new THREE.BufferAttribute(attributePosition, 3)
			);
			this._geometry.setIndex(attributeIndex);
			this._geometry.computeVertexNormals();
			const options = ThreeUtil.getTypeSafe(this.options, {});
			this._material = new THREE.MeshPhongMaterial({
				color: ThreeUtil.getColorSafe(options.backgroundColor, 0xff0000),
				opacity: ThreeUtil.getTypeSafe(options.opacity, 1),
				side: this.getSide('double'),
				transparent: true,
			});
			const wallMesh = new THREE.Mesh(this._geometry, this._material);
			wallMesh.name = 'wall';
			wallMesh.receiveShadow = true;
			wallMesh.castShadow = true;
			this._line.add(wallMesh);
			this.addUpdateAttributes(this._geometry, areaUpdateAttributes);
			this._geometryBorder = new THREE.BufferGeometry();
			this._geometryBorder.setAttribute(
				'position',
				new THREE.BufferAttribute(attributeLine, 3)
			);
			this._materialBorder = new THREE.LineBasicMaterial({
				color: ThreeUtil.getColorSafe(options.borderColor, 0x00ff00),
				transparent: true,
			});
			const borderMesh = new THREE.LineSegments(
				this._geometryBorder,
				this._materialBorder
			);
			borderMesh.name = 'border';
			this._line.add(borderMesh);
			this.addUpdateAttributes(this._geometryBorder, lineUpdateAttributes);
			let pointerInfo = this.getPointShape();
			let pointer: THREE.Object3D = pointerInfo.mesh;
			this._geometryPoint = pointerInfo.geometry;
			this._materialPoint = pointerInfo.material;
			this._geometryPointBorder = pointerInfo.geometryBorder;
			this._materialPointBorder = pointerInfo.materialBorder;
			upPoints.forEach((p, i) => {
				const x = i * lineStepX + lineBaseX;
				const position: THREE.Vector3 = new THREE.Vector3(x, middleY, baseZ);
				const point = pointer.clone(true);
				point.position.copy(position);
				point.castShadow = true;
				this._line.add(point);
				this.addUpdatePosition(
					point,
					{
						index: 1,
						from: middleY,
						to: p,
					},
					true
				);
			});
			this.setChart(this._line);
		}
		return this._line as T;
	}
}
