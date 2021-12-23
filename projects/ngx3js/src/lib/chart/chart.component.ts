import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxBaseComponent } from '../base.component';
import {
	I3JS,
	N3JS, NgxThreeUtil
} from '../interface';
import { NgxMeshComponent } from '../mesh/mesh.component';
import {
	IBackgroundBorder,
	IChartData, IColorOpacity, IGuiControlParam,
	IRendererEvent,
	IRendererTimer,
	INgxColor,
	INgxVector
} from '../ngx-interface';



/**
 * The Chart component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ChartComponent) page for details.
 *
 */
@Component({
	selector: 'ngx3js-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss'],
})
export class NgxChartComponent extends NgxBaseComponent<any> implements OnChanges {
	/**
	 * The Input of chart component
	 */
	@Input() guiControl: any = null;

	/**
	 * The Input of chart component
	 */
	@Input() guiParams: IGuiControlParam[] = null;

	/**
	 * The Input of chart component
	 */
	@Input() type: string = 'bar';

	/**
	 * The Input of chart component
	 */
	@Input() data: IChartData = {
		labels: ['Data1', 'Data2', 'Data3', 'Data4', 'Data5', 'Data6', 'Data7'],
		datasets: [
			{
				type: 'bar',
				label: 'My First Dataset',
				data: [65, 59, 80, 81, 56, 55, 40],
				backgroundColor: [
					'rgba(255, 99, 132, 0.4)',
					'rgba(255, 159, 64, 0.9)',
					'rgba(255, 205, 86, 0.9)',
					'rgba(75, 192, 192, 0.9)',
					'rgba(54, 162, 235, 0.9)',
					'rgba(153, 102, 255, 0.9)',
					'rgba(201, 203, 207, 0.9)',
				],
				borderColor: [
					'rgb(255, 99, 132)',
					'rgb(255, 159, 64)',
					'rgb(255, 205, 86)',
					'rgb(75, 192, 192)',
					'rgb(54, 162, 235)',
					'rgb(153, 102, 255)',
					'rgb(201, 203, 207)',
				],
				hoverBackgroundColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255, 205, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(201, 203, 207, 1)',
				],
				hoverBorderColor: [
					'rgb(255, 0, 0)',
					'rgb(255, 255, 64)',
					'rgb(255, 255, 86)',
					'rgb(75, 192, 192)',
					'rgb(54, 255, 235)',
					'rgb(153, 102, 255)',
					'rgb(201, 255, 207)',
				],
				borderWidth: 1,
			},
			{
				type: 'line',
				label: 'My First Dataset',
				data: [65, 59, 80, 81, 56, 55, 40],
				backgroundColor: [
					'rgba(255, 99, 132, 0.4)',
					'rgba(255, 159, 64, 0.9)',
					'rgba(255, 205, 86, 0.9)',
					'rgba(75, 192, 192, 0.9)',
					'rgba(54, 162, 235, 0.9)',
					'rgba(153, 102, 255, 0.9)',
					'rgba(201, 203, 207, 0.9)',
				],
				borderColor: [
					'rgb(255, 99, 132)',
					'rgb(255, 159, 64)',
					'rgb(255, 205, 86)',
					'rgb(75, 192, 192)',
					'rgb(54, 162, 235)',
					'rgb(153, 102, 255)',
					'rgb(201, 203, 207)',
				],
				hoverBackgroundColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255, 205, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(201, 203, 207, 1)',
				],
				hoverBorderColor: [
					'rgb(255, 0, 0)',
					'rgb(255, 255, 64)',
					'rgb(255, 255, 86)',
					'rgb(75, 192, 192)',
					'rgb(54, 255, 235)',
					'rgb(153, 102, 255)',
					'rgb(201, 255, 207)',
				],
				borderWidth: 1,
			},
			{
				type: 'line',
				label: 'My First Dataset',
				data: [65, 59, 80, 81, 56, 55, 40, 56, 55, 40],
				backgroundColor: [
					'rgba(255, 99, 132, 0.4)',
					'rgba(255, 159, 64, 0.9)',
					'rgba(255, 205, 86, 0.9)',
					'rgba(75, 192, 192, 0.9)',
					'rgba(54, 162, 235, 0.9)',
					'rgba(153, 102, 255, 0.9)',
					'rgba(201, 203, 207, 0.9)',
				],
				borderColor: [
					'rgb(255, 99, 132)',
					'rgb(255, 159, 64)',
					'rgb(255, 205, 86)',
					'rgb(75, 192, 192)',
					'rgb(54, 162, 235)',
					'rgb(153, 102, 255)',
					'rgb(201, 203, 207)',
				],
				hoverBackgroundColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255, 205, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(201, 203, 207, 1)',
				],
				hoverBorderColor: [
					'rgb(255, 0, 0)',
					'rgb(255, 255, 64)',
					'rgb(255, 255, 86)',
					'rgb(75, 192, 192)',
					'rgb(54, 255, 235)',
					'rgb(153, 102, 255)',
					'rgb(201, 255, 207)',
				],
				borderWidth: 1,
			},
		],
	};

	/**
	 * The Input of chart component
	 */
	@Input() options: any = null;

	/**
	 * The Input of chart component
	 */
	@Input() width: number = 1000;

	/**
	 * The Input of chart component
	 */
	@Input() height: number = 700;

	/**
	 * The Input of chart component
	 */
	@Input() depth: number = 200;

	/**
	 * The Input of chart component
	 */
	@Input() padding: number = 0.5;

	/**
	 * Creates an instance of chart component.
	 */
	constructor() {
		super({}, []);
	}

	/**
	 * on init
	 */
	ngOnInit() {}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {}

	/**
	 * A callback method that is invoked immediately after
	 * Angular has completed initialization of a component's view.
	 * It is invoked only once when the view is instantiated.
	 */
	ngAfterViewInit() {
		window.setTimeout(() => {
			this.drawChart();
		}, 100);
	}

	/**
	 * Gets color opacity
	 * @param color
	 * @param [def]
	 * @returns color opacity
	 */
	private getColorOpacity(color: INgxColor, def?: INgxColor): IColorOpacity {
		color = NgxThreeUtil.getTypeSafe(color, def);
		if (typeof color === 'string' && color.indexOf('rgba') === 0) {
			let [_, val1, val2, val3, alpha] = (color + ',,,,')
				.replace('(', ',')
				.replace(')', ',')
				.replace(':', ',')
				.replace(/[^A-Za-z\-0-9\.,]/g, '')
				.split(',');
			let opacity = parseFloat(alpha);
			return {
				color: 'rgb(' + val1 + ',' + val2 + ',' + val3 + ')',
				opacity: opacity,
			};
		} else if (
			typeof color === 'string' &&
			color.indexOf('transparent') === 0
		) {
			return { color: 0xffffff, opacity: 0 };
		} else {
			return { color: color, opacity: 1 };
		}
	}

	/**
	 * The Colors of chart component
	 */
	private COLORS: string[] = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba',
	];

	/**
	 * Gets color opacity list
	 * @param colors
	 * @param idxLen
	 * @returns color opacity list
	 */
	private getColorOpacityList(
		colors: INgxColor | INgxColor[],
		idxLen: number
	): IColorOpacity[] {
		const colorList: IColorOpacity[] = [];
		if (NgxThreeUtil.isNotNull(colors)) {
			if (Array.isArray(colors)) {
				colors.forEach((color) => {
					colorList.push(this.getColorOpacity(color));
				});
			} else {
				colorList.push(this.getColorOpacity(colors));
			}
		}
		if (colorList.length === 0) {
			for (let i = 0; i < idxLen; i++) {
				colorList.push({
					color: this.COLORS[i % this.COLORS.length],
					opacity: 1,
				});
			}
		}
		const currLen = colorList.length;
		for (let i = currLen; i < idxLen; i++) {
			colorList.push(colorList[i % currLen]);
		}
		return colorList;
	}

	/**
	 * Draws chart
	 */
	private drawChart() {
		let minValue = Infinity;
		let maxValue = -Infinity;
		let barChartZIdx = 0;
		let barChartXMax = 0;
		let lineChartZIdx = 0;
		let lineChartXMax = 0;
		this.barChart = null;
		this.lineChart = null;
		this.data.datasets.forEach((data) => {
			const tmpValue: number[] = [];
			data.data.forEach((value) => {
				if (typeof value === 'number') {
					value = Math.min(100, Math.max(30, Math.random() * 100));
					tmpValue.push(value);
					minValue = Math.min(minValue, value);
					maxValue = Math.max(maxValue, value);
				}
			});
			data.data = tmpValue;
			const type = NgxThreeUtil.getTypeSafe(data.type, this.type, 'bar');
			switch (type.toLowerCase()) {
				case 'bar':
					barChartXMax = Math.max(barChartXMax, data.data.length);
					barChartZIdx++;
					break;
				case 'line':
					lineChartXMax = Math.max(lineChartXMax, data.data.length);
					lineChartZIdx++;
					break;
			}
		});
		const chartXMax = Math.max(barChartXMax, lineChartXMax);
		const chartZMax = Math.max(barChartZIdx, lineChartZIdx);
		if (maxValue <= 10) {
			maxValue = 10;
		} else if (maxValue <= 50) {
			maxValue = 50;
		} else if (maxValue <= 100) {
			maxValue = 100;
		} else if (maxValue <= 200) {
			maxValue = 200;
		} else if (maxValue <= 500) {
			maxValue = 500;
		} else if (maxValue <= 1000) {
			maxValue = 1000;
		}
		if (minValue <= 10) {
			minValue = 0;
		} else if (minValue <= 50) {
			minValue = 10;
		} else if (minValue <= 100) {
			minValue = 50;
		} else if (minValue <= 200) {
			minValue = 100;
		} else if (minValue <= 500) {
			minValue = 200;
		} else if (minValue <= 1000) {
			minValue = 500;
		}
		this.chartZero = new N3JS.Vector3(0, minValue, 0);
		this.chartScale = new N3JS.Vector3(
			this.width / chartXMax,
			this.height / Math.max(1, maxValue - minValue),
			this.depth / chartZMax
		);
		const chartPadding = this.getLocalPosition(1, 0, 1);
		this.chartPosition = new N3JS.Vector3(
			-this.width / 2 - chartPadding.x / 2,
			-this.height / 2,
			-this.depth / 2 + chartPadding.z / 2
		);
		const xLabelList: string[] = [];
		this.data.labels.forEach((label) => {
			xLabelList.push(label);
		});
		if (barChartZIdx > 0) {
			this.barChart = [];
			const position = this.getLocalPosition(1, maxValue, 1);
			this.barGeometryInfo = {
				width: position.x * this.padding,
				height: position.y,
				depth: position.z * this.padding,
			};
		}
		if (lineChartZIdx > 0) {
			this.lineChart = [];
			this.lineCurvePath = [];
			const position = this.getLocalPosition(1, maxValue, 1);
			const radius = Math.min(position.x, position.y, position.z);
			this.lineGeometryInfo = {
				radius: (radius / 5) * this.padding,
			};
		}
		let barChartCurrIdx = 0;
		let lineChartCurrIdx = 0;
		this.data.datasets.forEach((data, idx) => {
			const type = NgxThreeUtil.getTypeSafe(data.type, this.type, 'bar');
			switch (type.toLowerCase()) {
				case 'bar':
					{
						const backgroundColor: IColorOpacity[] = this.getColorOpacityList(
							data.backgroundColor,
							barChartXMax
						);
						const borderColor: IColorOpacity[] = this.getColorOpacityList(
							data.borderColor || data.backgroundColor,
							barChartXMax
						);
						const hoverBackgroundColor: IColorOpacity[] =
							this.getColorOpacityList(
								data.hoverBackgroundColor || data.backgroundColor,
								barChartXMax
							);
						const hoverBorderColor: IColorOpacity[] = this.getColorOpacityList(
							data.hoverBorderColor || data.borderColor || data.backgroundColor,
							barChartXMax
						);
						const barColorInfo: IBackgroundBorder[] = [];
						const borderWidth = NgxThreeUtil.getTypeSafe(data.borderWidth, 1);
						backgroundColor.forEach((colorInfo, idx) => {
							barColorInfo.push({
								backgroundColor: colorInfo,
								borderColor: borderColor[idx],
								hoverBackgroundColor: hoverBackgroundColor[idx],
								hoverBorderColor: hoverBorderColor[idx],
							});
						});
						data.data.forEach((value, idx) => {
							const x = barChartXMax - idx;
							const y = typeof value === 'number' ? value : 0;
							const z = barChartCurrIdx;
							const position = this.getLocalPosition(x, y, z);
							const colorInfo = barColorInfo[idx % barColorInfo.length];
							const tooltipPosition: I3JS.Vector3 =
								this.getGlobalPosition(position);
							this.barChart.push({
								position: { x: position.x, y: 0, z: position.z },
								scale: { x: 1, y: 0, z: 1 },
								userData: {
									type: 'bar',
									scaleY: position.y / this.height,
									colorInfo: colorInfo,
									toolTipText: this.getTooltipText(xLabelList[idx], value),
									tooltipPosition: tooltipPosition,
								},
								color: colorInfo.backgroundColor,
								borderWidth: borderWidth / 300,
								borderColor: colorInfo.borderColor,
							});
						});
						barChartCurrIdx++;
					}
					break;
				case 'line':
					{
						const backgroundColor: IColorOpacity[] = this.getColorOpacityList(
							data.backgroundColor,
							barChartXMax
						);
						const borderColor: IColorOpacity[] = this.getColorOpacityList(
							data.borderColor || data.backgroundColor,
							barChartXMax
						);
						const hoverBackgroundColor: IColorOpacity[] =
							this.getColorOpacityList(
								data.hoverBackgroundColor || data.backgroundColor,
								barChartXMax
							);
						const hoverBorderColor: IColorOpacity[] = this.getColorOpacityList(
							data.hoverBorderColor || data.borderColor || data.backgroundColor,
							barChartXMax
						);
						const lineColorInfo: IBackgroundBorder[] = [];
						const borderWidth = NgxThreeUtil.getTypeSafe(data.borderWidth, 1);
						backgroundColor.forEach((colorInfo, idx) => {
							lineColorInfo.push({
								backgroundColor: colorInfo,
								borderColor: borderColor[idx],
								hoverBackgroundColor: hoverBackgroundColor[idx],
								hoverBorderColor: hoverBorderColor[idx],
							});
						});
						const lineCurvePath: INgxVector[] = [];

						data.data.forEach((value, idx) => {
							const x = lineChartXMax - idx;
							const y = typeof value === 'number' ? value : 0;
							const z = lineChartCurrIdx;
							const position = this.getLocalPosition(x, y, z);
							const colorInfo = lineColorInfo[idx % lineColorInfo.length];
							const tooltipPosition: I3JS.Vector3 =
								this.getGlobalPosition(position);
							lineCurvePath.push(position);
							this.lineChart.push({
								position: { x: position.x, y: 0, z: position.z },
								scale: { x: 1, y: 1, z: 1 },
								userData: {
									type: 'line',
									posY: position.y,
									colorInfo: colorInfo,
									toolTipText: this.getTooltipText(xLabelList[idx], value),
									tooltipPosition: tooltipPosition,
								},
								color: colorInfo.backgroundColor,
								borderWidth: borderWidth / 300,
								borderColor: colorInfo.borderColor,
							});
						});
						this.lineCurvePath.push(lineCurvePath);
						lineChartCurrIdx++;
					}
					break;
			}
		});
		this.axisX = { x: 0, y: -this.height / 2, z: 0 };
		this.axisY = { x: this.width / 2, y: 0, z: 0 };
		this.axisZ = { x: 0, y: 0, z: this.depth / 2 };
		this.grideInfo = {
			color1: 0xff0000,
			color2: 0xffffff,
			offset: 2,
			widthSegments: 20,
			heightSegments: 20,
		};
		this.yLabel = [];
		const labelStep = (maxValue - minValue) / 10;
		for (let i = minValue; i < maxValue; i += labelStep) {
			const position = this.getGlobalPosition(this.getLocalPosition(0, i, 0));
			this.yLabel.push({
				position: { x: this.width / 2, y: position.y, z: 0 },
				text: i.toFixed(2),
			});
		}
		this.xLabel = [];
		this.data.labels.forEach((label, idx) => {
			const position = this.getGlobalPosition(
				this.getLocalPosition(idx + 1, minValue, chartZMax - 0.5)
			);
			this.xLabel.push({
				position: {
					x: position.x - this.axisX.x,
					y: position.y - this.axisX.y,
					z: position.z - this.axisX.z,
				},
				text: label,
			});
		});
		this.elapsedTime = 0;
	}

	/**
	 * Gets tooltip text
	 * @param label
	 * @param value
	 * @returns tooltip text
	 */
	private getTooltipText(label: string, value: any): string {
		if (typeof value === 'number') {
			return (
				'<span>' +
				label +
				'</span> : ' +
				value.toFixed(2).replace(/\B(?=(\d{3,})+(?!\d))/g, ',')
			);
		} else {
			return '<span>' + label + '</span> : ' + value;
		}
	}

	/**
	 * Gets tooltip text
	 * @param label
	 * @param value
	 * @returns tooltip text
	 */
	private getGlobalPosition(p: I3JS.Vector3): I3JS.Vector3 {
		return p.clone().add(this.chartPosition);
	}

	/**
	 * Gets tooltip text
	 * @param label
	 * @param value
	 * @returns tooltip text
	 */
	private getLocalPosition(x: number, y: number, z: number): I3JS.Vector3 {
		return new N3JS.Vector3(x, y, z)
			.sub(this.chartZero)
			.multiply(this.chartScale);
	}

	/**
	 * Axis x of chart component
	 */
	public chartScale: I3JS.Vector3 = new N3JS.Vector3(1, 1, 1);

	/**
	 * Axis x of chart component
	 */
	public chartZero: I3JS.Vector3 = new N3JS.Vector3(0, 0, 0);

	/**
	 * Axis x of chart component
	 */
	public chartPosition: I3JS.Vector3 = new N3JS.Vector3(0, 0, 0);

	/**
	 * Axis x of chart component
	 */
	public axisX: INgxVector = null;

	/**
	 * Axis y of chart component
	 */
	public axisY: INgxVector = null;

	/**
	 * Axis z of chart component
	 */
	public axisZ: INgxVector = null;

	/**
	 * Gride info of chart component
	 */
	public grideInfo: {
		color1: INgxColor;
		color2: INgxColor;
		offset: number;
		widthSegments: number;
		heightSegments: number;
	} = null;

	/**
	 * Bar chart of chart component
	 */
	public barChart: {
		position: INgxVector;
		scale: INgxVector;
		userData: any;
		color: IColorOpacity;
		borderWidth: number;
		borderColor: IColorOpacity;
	}[] = null;

	/**
	 * Line chart of chart component
	 */
	public lineChart: {
		position: INgxVector;
		scale: INgxVector;
		userData: any;
		color: IColorOpacity;
		borderWidth: number;
		borderColor: IColorOpacity;
	}[] = null;

	/**
	 * Bar geometry info of chart component
	 */
	public barGeometryInfo: { width: number; height: number; depth: number } = {
		width: 100,
		height: 100,
		depth: 100,
	};

	/**
	 * Bar geometry info of chart component
	 */
	public lineGeometryInfo: { radius: number } = {
		radius: 100,
	};

	/**
	 * Line curve path of chart component
	 */
	public lineCurvePath: INgxVector[][] = [];

	/**
	 * Y label of chart component
	 */
	public yLabel: { position: INgxVector; text: string }[] = null;

	/**
	 * X label of chart component
	 */
	public xLabel: { position: INgxVector; text: string }[] = null;

	/**
	 * Elapsed time of chart component
	 */
	private elapsedTime: number = null;

	/**
	 * The Tooltip of chart component
	 */
	tooltip: I3JS.CSS2DObject = null;

	/**
	 * Tooltip position of chart component
	 */
	tooltipPosition: I3JS.Vector3 = null;

	/**
	 * Sets tool tip
	 * @param mesh
	 */
	public setToolTip(mesh: NgxMeshComponent) {
		this.tooltip = mesh.getMesh();
	}

	/**
	 * Last intersect of chart component
	 */
	lastIntersect: I3JS.Mesh = null;

	/**
	 * Determines whether mouse move on
	 * @param event
	 */
	public onMouseMove(event: IRendererEvent) {
		if (
			this.camera !== null &&
			this.mesh !== null &&
			this.meshObject3d !== null
		) {
			const intersect = this.camera.getIntersection(
				event.mouse,
				this.meshObject3d,
				true
			);
			if (intersect !== null && intersect.object !== null) {
				if (
					this.lastIntersect !== intersect.object &&
					NgxThreeUtil.isNotNull(intersect.object.userData.type)
				) {
					if (this.lastIntersect !== null) {
						this.setMaterialColor(this.lastIntersect, false);
						this.lastIntersect = null;
					}
					this.lastIntersect = intersect.object as I3JS.Mesh;
					this.setMaterialColor(this.lastIntersect, true);
				}
			} else if (this.lastIntersect !== null) {
				this.setMaterialColor(this.lastIntersect, false);
				this.lastIntersect = null;
			}
		}
	}

	/**
	 * Sets material color
	 * @param mesh
	 * @param isHover
	 * @returns material color
	 */
	private setMaterialColor(mesh: I3JS.Mesh, isHover: boolean): void {
		const material: I3JS.MeshLambertMaterial =
			mesh.material as I3JS.MeshLambertMaterial;
		const colorInfo: IBackgroundBorder = mesh.userData.colorInfo;
		if (NgxThreeUtil.isNull(colorInfo)) {
			return;
		}
		const backgroundColor: IColorOpacity = isHover
			? colorInfo.hoverBackgroundColor
			: colorInfo.backgroundColor;
		if (NgxThreeUtil.isNotNull(material) && NgxThreeUtil.isNotNull(backgroundColor)) {
			material.color = NgxThreeUtil.getColorSafe(backgroundColor.color);
			material.opacity = NgxThreeUtil.getTypeSafe(backgroundColor.opacity, 1);
			const borderColor: IColorOpacity = isHover
				? colorInfo.hoverBorderColor
				: colorInfo.borderColor;
			if (NgxThreeUtil.isNotNull(borderColor) && mesh.children.length > 0) {
				const child = mesh.children[0];
				if (child instanceof N3JS.LineSegments) {
					const childMaterial: I3JS.LineBasicMaterial =
						child.material as I3JS.LineBasicMaterial;
					childMaterial.color = NgxThreeUtil.getColorSafe(borderColor.color);
					childMaterial.opacity = NgxThreeUtil.getTypeSafe(borderColor.opacity, 1);
				}
			}
			if (this.tooltip !== null) {
				if (isHover) {
					this.tooltip.visible = true;
					this.tooltip.element.innerHTML = mesh.userData.toolTipText;
					this.tooltipPosition = mesh.userData.tooltipPosition;
				} else {
					this.tooltipPosition = null;
					this.tooltip.visible = false;
				}
			}
		}
	}

	/**
	 * Determines whether render on
	 * @param timer
	 */
	public onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.elapsedTime !== null && this.elapsedTime < 1) {
			this.elapsedTime = Math.min(1, this.elapsedTime + timer.delta / 10);
			this.meshObject3d.traverse((child) => {
				if (child.userData.type !== undefined) {
					switch (child.userData.type) {
						case 'bar':
							{
								const childScaleY = child.scale.y;
								const targetScaleY = child.userData.scaleY;
								child.scale.y =
									(targetScaleY - childScaleY) * this.elapsedTime + childScaleY;
							}
							break;
						case 'line':
							{
								const childPositionY = child.position.y;
								const targetPositionY = child.userData.posY;
								child.position.y =
									(targetPositionY - childPositionY) * this.elapsedTime +
									childPositionY;
							}
							break;
					}
				}
			});
		}
		if (this.tooltip !== null && this.tooltipPosition !== null) {
			this.tooltip.position.lerp(this.tooltipPosition, timer.delta * 3);
		}
	}
}
