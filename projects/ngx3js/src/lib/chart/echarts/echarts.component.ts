import { Component, EventEmitter, forwardRef, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgxAbstractRendererUpdateComponent } from '../../renderer-update.abstract';
import { I3JS, N3JS, NgxThreeUtil } from '../../interface';
import { ChartUtils } from '../chart-utils';
import { INgxColor, IRendererTimer } from './../../ngx-interface';
import { NgxAbstractSubscribeComponent } from './../../subscribe.abstract';
import { NgxAbstractTextureComponent } from './../../texture.abstract';
import * as ECHARTS from './echarts.interface';

/**
 * NgxTextureEChartsComponent
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTextureEChartsComponent) page for details.
 * See the [ngx echarts](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_echarts) page for a live demo.
 *
 * ```html
 * <ngx3js-texture-echarts [options]="options"></ngx3js-texture-echarts>
 * ```
 */
@Component({
	selector: 'ngx3js-texture-echarts',
	templateUrl: './echarts.component.html',
	styleUrls: ['./echarts.component.scss'],
	providers: [
		{
			provide: NgxAbstractTextureComponent,
			useExisting: forwardRef(() => NgxTextureEChartsComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxTextureEChartsComponent),
		},
		{
			provide: NgxAbstractRendererUpdateComponent,
			useExisting: forwardRef(() => NgxTextureEChartsComponent),
		},
	],
})
export class NgxTextureEChartsComponent extends NgxAbstractTextureComponent implements OnInit {
	@Input() public echarts: ECHARTS.echarts = null;

	@Input() public option: ECHARTS.EChartOption | ECHARTS.EChartsResponsiveOption = {};

	@Input() public optionSeqn: string = null;

	@Output() public onInitChart: EventEmitter<ECHARTS.ECharts> = new EventEmitter<ECHARTS.ECharts>();

	@Input() public width: number = 1;

	@Input() public height: number = 1;

	@Input() public canvasSize: number = 1024;

	@Input() public canvasBackground: INgxColor = null;

	@Input() public canvasBackgroundOpacity: number = 1;

	/**
	 * Creates an instance of mesh component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('texture-echarts');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this._mapCanvas !== null) {
			this._mapCanvas.parentNode.removeChild(this._mapCanvas);
		}
		if (this._mapCanvasHolder !== null) {
			this._mapCanvasHolder.parentNode.removeChild(this._mapCanvasHolder);
		}
		if (this._lastChartInfo.setInterval !== null) {
			window.clearInterval(this._lastChartInfo.setInterval);
			this._lastChartInfo.setInterval = null;
		}
		if (this._chart !== null) {
			this.echarts.dispose(this._chart);
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
		if (changes && this.texture) {
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
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		if (this.texture !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getTexture();
				return;
			}
			if (
				!NgxThreeUtil.isOnlyIndexOf(
					changes,
					['option', 'optionseqn', 'canvasbackground', 'canvasbackgroundopacity'],
					this.TEXTURE_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, ['initchart']);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['option', 'optionseqn', 'canvasbackground', 'canvasbackgroundopacity'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['initchart']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'initchart':
						this.initChart();
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	private jsonFileLoad(url: string, callBack: (data: any) => void) {
		this.binaryFileLoad(url, (text) => {
			try {
				callBack(JSON.parse(text));
			} catch (error) {}
		});
	}

	private binaryFileLoad(url: string, callBack: (data: any) => void) {
		const fileLoader: I3JS.FileLoader = NgxThreeUtil.getLoader('fileLoader', N3JS.FileLoader);
		fileLoader.load(NgxThreeUtil.getStoreUrl(url), (text) => {
			callBack(text);
		});
	}

	private checkMapResource(mapResource: ECHARTS.EChartsMapResource[]) {
		const resource = mapResource.shift();
		if (resource !== null && resource !== undefined) {
			switch (resource.type) {
				case 'map':
					if (NgxThreeUtil.isNotNullEmpty(resource.url)) {
						if (resource.url.endsWith('.svg')) {
							this.binaryFileLoad(resource.url, (svg) => {
								this.echarts.registerMap(resource.name, { svg: svg });
								if (resource.parent && resource.key) {
									resource.parent[resource.key] = resource.name;
								}
								this.checkMapResource(mapResource);
							});
						} else if (resource.url.endsWith('.json')) {
							this.jsonFileLoad(resource.url, (json) => {
								this.echarts.registerMap(resource.name, json, resource.specialAreas);
								if (resource.parent && resource.key) {
									resource.parent[resource.key] = resource.name;
								}
								this.checkMapResource(mapResource);
							});
						}
					} else if (NgxThreeUtil.isNotNullEmpty(resource.json)) {
						this.echarts.registerMap(resource.name, resource.json, resource.specialAreas);
						if (resource.parent && resource.key) {
							resource.parent[resource.key] = resource.name;
						}
						this.checkMapResource(mapResource);
					} else {
						this.checkMapResource(mapResource);
					}
					break;
				default:
					this.checkMapResource(mapResource);
					break;
			}
		} else {
			this.initChart();
		}
	}

	/**
	 * Checks map resource option
	 *
	 * @param mapOptions
	 * @param mapResource
	 * @param [mapParent]
	 * @param [mapParentKey]
	 */
	private checkMapResourceOption(
		mapOptions: any,
		mapResource: ECHARTS.EChartsMapResource[],
		mapParent: any = null,
		mapParentKey: string = null
	) {
		if (NgxThreeUtil.isNotNull(mapOptions)) {
			if (Array.isArray(mapOptions)) {
				mapOptions.forEach((map) => {
					if (NgxThreeUtil.isNotNull(map?.map)) {
						this.checkMapResourceOption(map?.map, mapResource, map, 'map');
					} else {
						this.checkMapResourceOption(map, mapResource);
					}
				});
			} else if (typeof mapOptions === 'object') {
				if (NgxThreeUtil.isNotNull(mapOptions.json)) {
					this.echarts.registerMap(mapOptions.name, mapOptions.json, mapOptions.specialAreas);
				}
				if (this.echarts.getMap(mapOptions.name) !== null) {
					if (mapParent !== null) {
						mapParent[mapParentKey] = mapOptions.name;
					}
				} else if (NgxThreeUtil.isNotNull(mapOptions.url)) {
					mapResource.push({
						name: mapOptions.name,
						url: mapOptions.url,
						json: mapOptions.json,
						specialAreas: mapOptions.specialAreas,
						type: 'map',
						parent: mapParent,
						key: mapParentKey,
						loaded: false,
					});
				}
			}
		}
	}

	private checkGeoOption(geoOptions: any, mapResource: ECHARTS.EChartsMapResource[]) {
		if (NgxThreeUtil.isNotNull(geoOptions)) {
			if (Array.isArray(geoOptions)) {
				geoOptions.forEach((geo) => {
					this.checkGeoOption(geo, mapResource);
				});
			} else if (NgxThreeUtil.isNotNull(geoOptions)) {
				if (NgxThreeUtil.isNotNull(geoOptions.map) && typeof geoOptions.map === 'object') {
					this.checkMapResourceOption(geoOptions.map, mapResource, geoOptions, 'map');
				}
				if (NgxThreeUtil.isNotNull(geoOptions.tooltip)) {
					this.checkTooltipOption(geoOptions.tooltip);
				}
			}
		}
	}

	/**
	 * Checks light option
	 *
	 * @param lightOptions
	 */
	private checkLightOption(lightOptions: any) {
		if (
			NgxThreeUtil.isNotNull(lightOptions.ambientCubemap) &&
			NgxThreeUtil.isNotNullEmpty(lightOptions.ambientCubemap.texture)
		) {
			lightOptions.ambientCubemap.texture = this.checkTextureOption(lightOptions.ambientCubemap.texture);
		}
	}

	/**
	 * Checks series option
	 * @param tooltipOptions
	 */
	private checkTooltipOption(tooltipOptions: any) {
		if (NgxThreeUtil.isNotNull(tooltipOptions)) {
			if (Array.isArray(tooltipOptions)) {
				tooltipOptions.forEach((tooltip) => {
					this.checkTooltipOption(tooltip);
				});
			} else {
				if (NgxThreeUtil.isNull(tooltipOptions.renderMode)) {
					tooltipOptions.renderMode = 'richText';
				}
				if (NgxThreeUtil.isNotNullEmpty(tooltipOptions.position)) {
					tooltipOptions.position = this.checkScriptOption(tooltipOptions.position);
				}
				this.checkFormatterOption(tooltipOptions);
			}
		}
	}

	/**
	 * Checks series option
	 * @param axisOptions
	 */
	private checkAxisOption(axisOptions: any) {
		if (NgxThreeUtil.isNotNull(axisOptions)) {
			if (Array.isArray(axisOptions)) {
				axisOptions.forEach((axis) => {
					this.checkAxisOption(axis);
				});
			} else {
				if (NgxThreeUtil.isNotNullEmpty(axisOptions.axisLabel)) {
					const axisLabel = axisOptions.axisLabel;
					this.checkFormatterOption(axisLabel);
				}
				if (NgxThreeUtil.isNotNullEmpty(axisOptions.axisPointer)) {
					const axisPointer = axisOptions.axisPointer;
					if (NgxThreeUtil.isNotNullEmpty(axisPointer.label)) {
						const label = axisPointer.label;
						this.checkFormatterOption(label);
					}
				}
			}
		}
	}

	/**
	 * Checks series option
	 * @param axisOptions
	 */
	private checkToolboxOption(toolboxOptions: any) {
		if (NgxThreeUtil.isNotNull(toolboxOptions)) {
			if (Array.isArray(toolboxOptions)) {
				toolboxOptions.forEach((toolbox) => {
					this.checkToolboxOption(toolbox);
				});
			} else {
				if (NgxThreeUtil.isNotNull(toolboxOptions.feature)) {
					const feature: any = toolboxOptions.feature;
					if (NgxThreeUtil.isNotNull(feature.saveAsImage)) {
						delete feature.saveAsImage;
					}
					if (NgxThreeUtil.isNotNull(feature.dataView)) {
						delete feature.dataView;
					}
				}
			}
		}
	}

	/**
	 * Checks series option
	 * @param seriesOptions
	 */
	private checkFormatterOption(formatterOptions: any) {
		if (NgxThreeUtil.isNotNull(formatterOptions)) {
			if (Array.isArray(formatterOptions)) {
				formatterOptions.forEach((formatter) => {
					this.checkFormatterOption(formatter);
				});
			} else {
				if (NgxThreeUtil.isNotNullEmpty(formatterOptions.formatter)) {
					if (typeof formatterOptions.formatter === 'string') {
						formatterOptions.formatter = formatterOptions.formatter.replace(/<br\/>|<br \/>|<br>/i, '\n');
					}
					formatterOptions.formatter = this.checkScriptOption(formatterOptions.formatter);
				}
				if (NgxThreeUtil.isNotNullEmpty(formatterOptions.rich)) {
					const rich: { [key: string]: any } = formatterOptions.rich;
					Object.entries(rich).forEach(([key, value]) => {
						if (typeof value === 'object' && NgxThreeUtil.isNotNullEmpty(value.backgroundColor)) {
							value.backgroundColor = this.checkTextureOption(value.backgroundColor);
						}
					});
				}
			}
		}
	}

	/**
	 * Checks series option
	 * @param seriesOptions
	 */
	private checkSeriesOption(seriesOptions: any) {
		if (Array.isArray(seriesOptions)) {
			seriesOptions.forEach((series) => {
				this.checkSeriesOption(series);
			});
		} else {
			if (NgxThreeUtil.isNotNull(seriesOptions.roam)) {
				seriesOptions.roam = false;
			}
			if (NgxThreeUtil.isNotNullEmpty(seriesOptions.renderItem)) {
				seriesOptions.renderItem = this.checkScriptOption(seriesOptions.renderItem);
			}
			if (NgxThreeUtil.isNotNullEmpty(seriesOptions.animationDelay)) {
				seriesOptions.animationDelay = this.checkScriptOption(seriesOptions.animationDelay);
			}
			if (NgxThreeUtil.isNotNullEmpty(seriesOptions.symbolSize)) {
				seriesOptions.symbolSize = this.checkScriptOption(seriesOptions.symbolSize);
			}
			if (NgxThreeUtil.isNotNullEmpty(seriesOptions.emphasis)) {
				const emphasis = seriesOptions.emphasis;
				if (NgxThreeUtil.isNotNullEmpty(emphasis.label)) {
					const label = emphasis.label;
					this.checkFormatterOption(label);
				}
			}
			if (NgxThreeUtil.isNotNullEmpty(seriesOptions.labelLayout)) {
				seriesOptions.labelLayout = this.checkScriptOption(seriesOptions.labelLayout);
			}
			if (NgxThreeUtil.isNotNullEmpty(seriesOptions.tooltip)) {
				const tooltip = seriesOptions.tooltip;
				this.checkFormatterOption(tooltip);
			}
			if (NgxThreeUtil.isNotNullEmpty(seriesOptions.detail)) {
				const detail = seriesOptions.detail;
				this.checkFormatterOption(detail);
			}
			if (NgxThreeUtil.isNotNullEmpty(seriesOptions.markPoint)) {
				const markPoint = seriesOptions.markPoint;
				if (NgxThreeUtil.isNotNullEmpty(markPoint.label)) {
					const label = markPoint.label;
					this.checkFormatterOption(label);
				}
				if (NgxThreeUtil.isNotNullEmpty(markPoint.tooltip)) {
					const tooltip = markPoint.tooltip;
					this.checkFormatterOption(tooltip);
				}
			}
			if (NgxThreeUtil.isNotNullEmpty(seriesOptions.data) && Array.isArray(seriesOptions.data)) {
				seriesOptions.data.forEach((data: any) => {
					if (typeof data === 'object' && data !== null) {
						if (data.label !== undefined && typeof data.label === 'object') {
							const label = data.label;
							this.checkFormatterOption(label);
						}
						if (NgxThreeUtil.isNotNullEmpty(data.animationDelay)) {
							data.animationDelay = this.checkScriptOption(data.animationDelay);
							this._lastChartInfo.hasAnimation = true;
						}
					}
				});
			}
			if (NgxThreeUtil.isNotNullEmpty(seriesOptions.universalTransition)) {
				const universalTransition = seriesOptions.universalTransition;
				if (NgxThreeUtil.isNotNullEmpty(universalTransition.delay)) {
					universalTransition.delay = this.checkScriptOption(universalTransition.delay);
				}
			}

			if (NgxThreeUtil.isNotNullEmpty(seriesOptions.label)) {
				const label = seriesOptions.label;
				this.checkFormatterOption(label);
			}
			if (NgxThreeUtil.isNotNullEmpty(seriesOptions.endLabel)) {
				const endLabel = seriesOptions.endLabel;
				this.checkFormatterOption(endLabel);
			}
			if (NgxThreeUtil.isNotNullEmpty(seriesOptions.itemStyle)) {
				const itemStyle = seriesOptions.itemStyle;
				if (NgxThreeUtil.isNotNullEmpty(itemStyle.color)) {
					itemStyle.color = this.checkScriptOption(itemStyle.color);
				}
			}
			if (
				NgxThreeUtil.isNotNullEmpty(seriesOptions.axisLabel) ||
				NgxThreeUtil.isNotNullEmpty(seriesOptions.axisPointer)
			) {
				this.checkAxisOption(seriesOptions);
			}
			if (
				NgxThreeUtil.isNotNull(seriesOptions.animationType) ||
				NgxThreeUtil.isNotNull(seriesOptions.animationEasing) ||
				NgxThreeUtil.isNotNull(seriesOptions.animationDelay) ||
				NgxThreeUtil.isNotNull(seriesOptions.animationDurationUpdate)
			) {
				this._lastChartInfo.hasAnimation = true;
			}
		}
	}

	/**
	 * Checks texture option
	 * @param textureOptions
	 */
	private checkTextureOption(textureOptions: any) {
		if (NgxThreeUtil.isNotNullEmpty(textureOptions)) {
			if (typeof textureOptions === 'object' && typeof textureOptions.image === 'string') {
				const imageSrc: string = textureOptions.image;
				if (imageSrc.startsWith('data:')) {
					const image = new Image();
					image.src = imageSrc;
					textureOptions.image = image;
				} else if (ChartUtils.isFunctionString(imageSrc)) {
					const imageFunction = this.checkEvalString(imageSrc);
					if (typeof imageFunction === 'function') {
						textureOptions.image = imageFunction();
					}
				} else {
					textureOptions.image = NgxThreeUtil.getStoreUrl(imageSrc);
				}
			} else {
				textureOptions = NgxThreeUtil.getStoreUrl(textureOptions);
			}
		}
		return textureOptions;
	}

	private checkGrid3DOption(grid3DOptions: any) {
		if (NgxThreeUtil.isNotNull(grid3DOptions)) {
			if (Array.isArray(grid3DOptions)) {
				grid3DOptions.forEach((grid3D) => {
					this.checkGrid3DOption(grid3D);
				});
			} else {
				if (NgxThreeUtil.isNotNull(grid3DOptions.light)) {
					this.checkLightOption(grid3DOptions.light);
				}
			}
		}
	}

	private checkGlobeOption(globeOptions: any) {
		if (NgxThreeUtil.isNotNull(globeOptions)) {
			if (Array.isArray(globeOptions)) {
				globeOptions.forEach((globe) => {
					this.checkGlobeOption(globe);
				});
			} else {
				if (NgxThreeUtil.isNotNull(globeOptions.environment)) {
					globeOptions.environment = this.checkTextureOption(globeOptions.environment);
				}
				if (NgxThreeUtil.isNotNull(globeOptions.heightTexture)) {
					globeOptions.heightTexture = this.checkTextureOption(globeOptions.heightTexture);
				}
				if (NgxThreeUtil.isNotNull(globeOptions.baseTexture)) {
					globeOptions.baseTexture = this.checkTextureOption(globeOptions.baseTexture);
				}
				if (NgxThreeUtil.isNotNull(globeOptions.displacementTexture)) {
					globeOptions.displacementTexture = this.checkTextureOption(globeOptions.displacementTexture);
				}
				if (NgxThreeUtil.isNotNull(globeOptions.light)) {
					this.checkLightOption(globeOptions.light);
				}
				if (NgxThreeUtil.isNotNull(globeOptions.layers)) {
					if (Array.isArray(globeOptions.layers)) {
						globeOptions.layers.forEach((layer: any) => {
							if (NgxThreeUtil.isNotNull(layer.texture)) {
								layer.texture = this.checkTextureOption(layer.texture);
							}
						});
					}
				}
			}
		}
	}

	private _sharedVar: any = {};

	/**
	 * Checks function option
	 *
	 * @param scriptOptions
	 * @returns function option
	 */
	private checkEvalString(str: string): any {
		return ChartUtils.getString2Function(str, {
			echarts: this.echarts,
			THREE: N3JS,
			Utils: ChartUtils,
			sharedVar: this._sharedVar || {},
		});
	}

	/**
	 * Checks function option
	 *
	 * @param scriptOptions
	 * @returns function option
	 */
	private checkScriptOption(scriptOptions: any): any {
		let functionItem = null;
		if (NgxThreeUtil.isNotNullEmpty(scriptOptions)) {
			if (typeof scriptOptions === 'string') {
				let scriptOptionsTrim = scriptOptions.trim();
				if (ChartUtils.isFunctionString(scriptOptionsTrim)) {
					scriptOptionsTrim = ChartUtils.getFunctionString(scriptOptionsTrim);
					functionItem = this.checkEvalString(scriptOptionsTrim);
					if (typeof functionItem === 'function' || typeof functionItem === 'object') {
						return functionItem;
					} else {
						functionItem = null;
					}
				} else if (ChartUtils.isObjectString(scriptOptionsTrim)) {
					try {
						functionItem = JSON.parse(scriptOptionsTrim);
					} catch (ex) {
						this.consoleLog('jsonItem', ex, 'error');
						functionItem = null;
					}
				} else if (ChartUtils.isCallableString(scriptOptionsTrim)) {
					functionItem = this.checkEvalString(scriptOptionsTrim);
				} else {
					functionItem = scriptOptions;
				}
			} else {
				functionItem = scriptOptions;
			}
		}
		return functionItem;
	}

	private _lastChartInfo: {
		url: string;
		seqn: string;
		background: any;
		setInterval: any;
		hasAnimation: boolean;
	} = {
		url: null,
		seqn: null,
		background: null,
		setInterval: null,
		hasAnimation: false,
	};

	private initChart() {
		if (NgxThreeUtil.isNull(this.echarts)) {
			return;
		}
		this._chartOption = this.option || {};
		if (NgxThreeUtil.isNotNullEmpty(this._chartOption.url) && this._chartOption.url !== this._lastChartInfo.url) {
			this.jsonFileLoad(this._chartOption.url, (json) => {
				this._lastChartInfo.url = this._chartOption.url;
				Object.assign(this._chartOption, json);
				this.initChart();
			});
			return;
		}
		this._lastChartInfo.hasAnimation = false;
		const mapResource: ECHARTS.EChartsMapResource[] = [];
		if (NgxThreeUtil.isNotNull(this._chartOption.geo)) {
			this.checkGeoOption(this._chartOption.geo, mapResource);
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.geo3D)) {
			this.checkGeoOption(this._chartOption.geo3D, mapResource);
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.series)) {
			this.checkMapResourceOption(this._chartOption.series, mapResource, this._chartOption.series, 'map');
		}
		if (NgxThreeUtil.isNotNull(this._chartOption?.sharedVar.registerMap)) {
			this.checkMapResourceOption(this._chartOption?.sharedVar.registerMap, mapResource);
		}
		if (mapResource.length > 0) {
			this.checkMapResource(mapResource);
			return;
		}
		if (this._lastChartInfo.setInterval !== null) {
			window.clearInterval(this._lastChartInfo.setInterval);
			this._lastChartInfo.setInterval = null;
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.sharedVar)) {
			Object.entries(this._chartOption.sharedVar).forEach(([key, value]) => {
				switch (key) {
					case 'on':
						const sharedValueOn: Function[] = [];
						if (Array.isArray(value)) {
							value.forEach((onValue) => {
								let sharedValue = onValue;
								if (typeof sharedValue === 'string') {
									sharedValue = this.checkScriptOption(sharedValue);
								}
								if (typeof sharedValue === 'function') {
									sharedValueOn.push(sharedValue);
								}
							});
						} else {
							let sharedValue = value;
							if (typeof sharedValue === 'string') {
								sharedValue = this.checkScriptOption(sharedValue);
							}
							if (typeof sharedValue === 'function') {
								sharedValueOn.push(sharedValue);
							}
						}
						this._sharedVar.on = this._chartOption.sharedVar.on = sharedValueOn;
						break;
					default:
						let sharedValue = value;
						if (typeof value === 'string') {
							sharedValue = this.checkScriptOption(value);
						}
						this._sharedVar[key] = this._chartOption.sharedVar[key] = sharedValue;
						break;
				}
			});
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.series)) {
			this.checkSeriesOption(this._chartOption.series);
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.options)) {
			if (Array.isArray(this._chartOption.options)) {
				this._chartOption.options.forEach((options) => {
					if (NgxThreeUtil.isNotNull(options.series)) {
						this.checkSeriesOption(options.series);
					}
				});
			}
		}

		if (NgxThreeUtil.isNotNull(this._chartOption.tooltip)) {
			this.checkTooltipOption(this._chartOption.tooltip);
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.baseOption)) {
			const baseOption = this._chartOption.baseOption;
			if (NgxThreeUtil.isNotNull(baseOption.tooltip)) {
				this.checkTooltipOption(baseOption.tooltip);
			}
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.xAxis)) {
			this.checkAxisOption(this._chartOption.xAxis);
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.yAxis)) {
			this.checkAxisOption(this._chartOption.yAxis);
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.toolbox)) {
			this.checkToolboxOption(this._chartOption.toolbox);
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.animationDelayUpdate)) {
			this._chartOption.animationDelayUpdate = this.checkScriptOption(this._chartOption.animationDelayUpdate);
		}
		if (NgxThreeUtil.isNotNullEmpty(this.canvasBackground) && NgxThreeUtil.isNull(this._chartOption.backgroundColor)) {
			const backgroundColor = NgxThreeUtil.getColorAlphaSafe(this.canvasBackground, this.canvasBackgroundOpacity);
			if (NgxThreeUtil.isNotNull(backgroundColor)) {
				let backgroundColorRgb: string = 'transparent';
				if (backgroundColor instanceof N3JS.Color) {
					backgroundColorRgb =
						'rgb( ' + backgroundColor.r * 255 + ', ' + backgroundColor.g * 255 + ', ' + backgroundColor.b * 255 + ')';
				} else {
					backgroundColorRgb =
						'rgba( ' +
						backgroundColor.x * 255 +
						', ' +
						backgroundColor.y * 255 +
						', ' +
						backgroundColor.z * 255 +
						', ' +
						backgroundColor.w +
						')';
				}
				this._lastChartInfo.background = this._chartOption.backgroundColor;
				this._chartOption.backgroundColor = backgroundColorRgb;
			}
		} else if (NgxThreeUtil.isNotNull(this._lastChartInfo.background)) {
			this._chartOption.backgroundColor = this._lastChartInfo.background;
		}
		this.checkTextureOption(this._chartOption.backgroundColor);
		if (NgxThreeUtil.isNotNull(this._chartOption.globe)) {
			this.checkGlobeOption(this._chartOption.globe);
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.grid3D)) {
			this.checkGrid3DOption(this._chartOption.grid3D);
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.actions) && Array.isArray(this._chartOption.actions)) {
			this._chartOption.actions.forEach((actions) => {
				if (typeof actions.handler === 'string') {
					actions.handler = this.checkScriptOption(actions.handler);
					if (typeof actions.handler === 'string' && actions.handler.startsWith('sharedVar')) {
						const [_, sharedKey] = (actions.handler + '.').split('.');
						if (sharedKey !== null && sharedKey.length > 0) {
							actions.handler = this._sharedVar[sharedKey] || {};
						} else {
							actions.handler = this._sharedVar;
						}
					}
				}
				if (typeof actions.handler === 'function') {
					const handler = actions.handler;
					if (NgxThreeUtil.isNotNull(actions.value)) {
						actions.change = () => {
							handler(this._chart, actions.value);
						};
					} else {
						actions.onclick = () => {
							handler(this._chart);
						};
					}
				} else if (typeof actions.handler !== 'object' || NgxThreeUtil.isNull(actions.property)) {
					actions.handler = null;
					actions.onclick = null;
				}
			});
		}
		if (
			this._chart !== null &&
			NgxThreeUtil.isNotNullEmpty(this.optionSeqn) &&
			this._lastChartInfo.seqn !== this.optionSeqn
		) {
			this.echarts.dispose(this._chart);
			this._lastChartInfo.seqn = this.optionSeqn;
			this._chart = null;
		}
		if (this._chart === null) {
			this._chart = this.echarts.init(this._mapCanvas);
		}
		this._sharedVar.myChart = this._chart;
		if (
			this._lastChartInfo.hasAnimation ||
			NgxThreeUtil.isNotNull(this._chartOption.globe) ||
			NgxThreeUtil.isNotNull(this._chartOption.animationDuration) ||
			NgxThreeUtil.isNotNull(this._chartOption.animationDelayUpdate) ||
			NgxThreeUtil.isNotNull(this._chartOption.animationEasing)
		) {
			this._chart.setOption({}, true);
			this.getTimeout(500).then(() => {
				this._chart.setOption(this._chartOption);
			});
		} else {
			this._chart.setOption(this._chartOption, true, false);
		}
		this._chart.resize({
			width: this._mapCanvasSize.x,
			height: this._mapCanvasSize.y,
		});
		if (NgxThreeUtil.isNotNull(this._chartOption.sharedVar)) {
			const sharedVar = this._chartOption.sharedVar;
			if (NgxThreeUtil.isNotNull(sharedVar.zrClick) || NgxThreeUtil.isNotNull(sharedVar.zrMousemove)) {
				const zr = this._chart.getZr();
				if (NgxThreeUtil.isNotNull(sharedVar.zrClick) && typeof sharedVar.zrClick === 'function') {
					const zrClick = sharedVar.zrClick;
					zr.on('click', (params: any) => {
						zrClick(params, this._chart);
					});
				}
				if (NgxThreeUtil.isNotNull(sharedVar.zrMousemove) && typeof sharedVar.zrMousemove === 'function') {
					const zrMousemove = sharedVar.zrMousemove;
					zr.on('mousemove', (params: any) => {
						zrMousemove(params, this._chart);
					});
				}
			}
			if (NgxThreeUtil.isNotNull(sharedVar.graphic) && typeof sharedVar.graphic === 'function') {
				this.getTimeout().then(() => {
					sharedVar.graphic();
				});
			}
			if (NgxThreeUtil.isNotNull(sharedVar.click) && typeof sharedVar.click === 'function') {
				this._chart.on('click', sharedVar.click);
			}
			if (NgxThreeUtil.isNotNull(sharedVar.dataZoom) && typeof sharedVar.dataZoom === 'function') {
				this._chart.on('dataZoom', sharedVar.dataZoom);
			}
			if (NgxThreeUtil.isNotNull(sharedVar.updateAxisPointer) && typeof sharedVar.updateAxisPointer === 'function') {
				this._chart.on('updateAxisPointer', sharedVar.updateAxisPointer);
			}
			if (NgxThreeUtil.isNotNull(sharedVar.brushSelected) && typeof sharedVar.brushSelected === 'function') {
				this._chart.on('brushSelected', sharedVar.brushSelected);
			}
			if (NgxThreeUtil.isNotNull(sharedVar.geoselectchanged) && typeof sharedVar.geoselectchanged === 'function') {
				this._chart.on('geoselectchanged', sharedVar.geoselectchanged);
			}
			if (NgxThreeUtil.isNotNull(sharedVar.mouseover) && typeof sharedVar.mouseover === 'function') {
				sharedVar.mouseover();
			}
			if (NgxThreeUtil.isNotNull(sharedVar.mouseout) && typeof sharedVar.mouseout === 'function') {
				sharedVar.mouseout();
			}
			if (NgxThreeUtil.isNotNull(sharedVar.on) && Array.isArray(sharedVar.on)) {
				sharedVar.on.forEach((onfun) => {
					onfun(this._chart);
				});
			}
		}
		this.texture.needsUpdate = true;
		this.onInitChart.emit(this._chart);
		if (
			NgxThreeUtil.isNotNull(this._chartOption.sharedVar?.setInterval) &&
			typeof this._chartOption.sharedVar?.setInterval === 'function'
		) {
			this._lastChartInfo.setInterval = this._chartOption.sharedVar?.setInterval(this._chart);
		}
		if (
			NgxThreeUtil.isNotNull(this._chartOption.sharedVar?.onInit) &&
			typeof this._chartOption.sharedVar?.onInit === 'function'
		) {
			this.getTimeout(600).then(() => {
				this._chartOption.sharedVar?.onInit(this._chart);
			});
		} else if (
			NgxThreeUtil.isNotNull(this._chartOption.sharedVar?.setTimeout) &&
			typeof this._chartOption.sharedVar?.setTimeout === 'function'
		) {
			this.getTimeout(600).then(() => {
				this._chartOption.sharedVar?.setTimeout(this._chart);
			});
		}
	}

	public getChart(): ECHARTS.ECharts {
		return this._chart;
	}

	/**
	 * Gets mesh
	 * @template T
	 * @returns mesh
	 */
	public getTexture<T extends I3JS.Texture>(): T {
		if (this.texture === null || this._needUpdate) {
			this.needUpdate = false;
			if (this._mapCanvas !== null) {
				this._mapCanvas.parentNode.removeChild(this._mapCanvas);
			}
			if (this._chart !== null) {
				this.echarts.dispose(this._chart);
				this._chart = null;
			}
			if (this._mapCanvasHolder === null) {
				this._mapCanvasHolder = document.createElement('div');
				this._mapCanvasHolder.style.width = '0px';
				this._mapCanvasHolder.style.height = '0px';
				this._mapCanvasHolder.style.overflow = 'hidden';
				this._mapCanvasHolder.style.position = 'absolute';
				this._mapCanvasHolder.style.left = '0px';
				this._mapCanvasHolder.style.top = '0px';
				document.body.append(this._mapCanvasHolder);
			}
			const mapCanvas = (this._mapCanvas = document.createElement('canvas'));
			this._mapCanvasSize = new N3JS.Vector2(this.canvasSize, Math.round((this.canvasSize * this.height) / this.width));
			mapCanvas.width = this._mapCanvasSize.x;
			mapCanvas.height = this._mapCanvasSize.y;
			mapCanvas.style.position = 'absolute';
			mapCanvas.style.left = '0';
			mapCanvas.style.top = '0';
			mapCanvas.style.pointerEvents = 'none';
			this._mapCanvasHolder.append(mapCanvas);
			this.texture = new N3JS.CanvasTexture(this._mapCanvas);
			this.synkMaterial(this.texture);
			super.setObject(this.texture);
		}
		return this.texture as T;
	}

	/**
	 * Updates ngx event proxy component
	 *
	 * @param renderTimer
	 */
	public update(_: IRendererTimer) {
		if (this.texture !== null) {
			this.texture.needsUpdate = true;
		}
	}

	private _chart: ECHARTS.ECharts = null;
	private _chartOption: ECHARTS.EChartOption | ECHARTS.EChartsResponsiveOption = {};
	private _mapCanvasSize: I3JS.Vector2 = null;
	private _mapCanvas: HTMLCanvasElement = null;
	private _mapCanvasHolder: HTMLDivElement = null;
}
