import {
	Component, EventEmitter, forwardRef,
	Input,
	OnInit,
	Output,
	SimpleChanges
} from '@angular/core';
import {
	I3JS,
	N3JS,
	NgxThreeUtil
} from '../../interface';
import { ChartUtils } from '../chart-utils';
import { INgxColor } from './../../ngx-interface';
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
	],
})
export class NgxTextureEChartsComponent
	extends NgxAbstractTextureComponent
	implements OnInit
{
	@Input() public echarts: ECHARTS.echarts = null;

	@Input() public option:
		| ECHARTS.EChartOption
		| ECHARTS.EChartsResponsiveOption = {};

	@Input() public optionSeqn: string = null;

	@Output() public onInitChart: EventEmitter<ECHARTS.ECharts> =
		new EventEmitter<ECHARTS.ECharts>();

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
					[
						'option',
						'optionseqn',
						'canvasbackground',
						'canvasbackgroundopacity',
					],
					this.TEXTURE_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, ['initchart']);
			}
			if (
				NgxThreeUtil.isIndexOf(changes, [
					'option',
					'optionseqn',
					'canvasbackground',
					'canvasbackgroundopacity',
				])
			) {
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
		const fileLoader: I3JS.FileLoader = NgxThreeUtil.getLoader(
			'fileLoader',
			N3JS.FileLoader
		);
		fileLoader.load(NgxThreeUtil.getStoreUrl(url), (text) => {
			callBack(text);
		});
	}

	private checkMapResource(mapResource: ECHARTS.EChartsMapResource[]) {
		const resource = mapResource.shift();
		if (resource !== null && resource !== undefined) {
			switch (resource.type) {
				case 'map':
					if (resource.url.endsWith('.svg')) {
						this.binaryFileLoad(resource.url, (svg) => {
							this.echarts.registerMap(resource.name, { svg: svg });
							if (resource.parent && resource.key) {
								resource.parent[resource.key] = resource.name;
							}
							this.checkMapResource(mapResource);
						});
					}
					break;
			}
		} else {
			this.initChart();
		}
	}

	private checkGeoOption(
		geoOptions: any,
		mapResource: ECHARTS.EChartsMapResource[]
	) {
		if (NgxThreeUtil.isNotNull(geoOptions) && Array.isArray(geoOptions)) {
			geoOptions.forEach((geo: any) => {
				if (
					NgxThreeUtil.isNotNull(geo.map) &&
					typeof geo.map === 'object' &&
					NgxThreeUtil.isNotNull(geo.map.url)
				) {
					if (this.echarts.getMap(geo.map.name) !== null) {
						geo.map = geo.map.name;
					} else {
						mapResource.push({
							name: geo.map.name,
							url: geo.map.url,
							type: 'map',
							parent: geo,
							key: 'map',
							loaded: false,
						});
					}
				}
			});
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
			lightOptions.ambientCubemap.texture = this.checkTextureOption(
				lightOptions.ambientCubemap.texture
			);
		}
	}

	/**
	 * Checks series option
	 * @param seriesOptions
	 */
	private checkSeriesOption(seriesOptions: any) {
		if (NgxThreeUtil.isNotNullEmpty(seriesOptions.renderItem)) {
			seriesOptions.renderItem = this.checkScriptOption(
				seriesOptions.renderItem
			);
		}
		if (
			NgxThreeUtil.isNotNullEmpty(seriesOptions.data) &&
			Array.isArray(seriesOptions.data)
		) {
			seriesOptions.data.forEach((data : any) => {
				if (
					typeof data === 'object' &&
					data.label !== undefined &&
					typeof data.label === 'object' &&
					typeof data.label.rich === 'object'
				) {
					const rich: { [key: string]: any } = data.label.rich;
					Object.entries(rich).forEach(([key, value]) => {
						if (
							typeof value === 'object' &&
							NgxThreeUtil.isNotNullEmpty(value.backgroundColor)
						) {
							value.backgroundColor = this.checkTextureOption(
								value.backgroundColor
							);
						}
					});
				}
			});
		}
	}

	/**
	 * Checks texture option
	 * @param textureOptions
	 */
	private checkTextureOption(textureOptions: any) {
		if (NgxThreeUtil.isNotNullEmpty(textureOptions)) {
			if (
				typeof textureOptions === 'object' &&
				typeof textureOptions.image === 'string'
			) {
				const imageSrc: string = textureOptions.image;
				if (imageSrc.startsWith('data:')) {
					const image = new Image();
					image.src = imageSrc;
					textureOptions.image = image;
				} else {
					textureOptions.image = NgxThreeUtil.getStoreUrl(imageSrc);
				}
			} else {
				textureOptions = NgxThreeUtil.getStoreUrl(textureOptions);
			}
		}
		return textureOptions;
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
			Chart : this.echarts,
			THREE : N3JS,
			Utils : ChartUtils,
			sharedVar : this._sharedVar || {},
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
					if (
						typeof functionItem === 'function' ||
						typeof functionItem === 'object'
					) {
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
	} = {
		url: null,
		seqn: null,
		background: null,
	};

	private initChart() {
		if (NgxThreeUtil.isNull(this.echarts)) {
			return;
		}
		this._chartOption = this.option || {};
		if (
			NgxThreeUtil.isNotNullEmpty(this._chartOption.url) &&
			this._chartOption.url !== this._lastChartInfo.url
		) {
			this.jsonFileLoad(this._chartOption.url, (json) => {
				this._lastChartInfo.url = this._chartOption.url;
				Object.assign(this._chartOption, json);
				this.initChart();
			});
			return;
		}
		const mapResource: ECHARTS.EChartsMapResource[] = [];
		if (NgxThreeUtil.isNotNull(this._chartOption.geo)) {
			this.checkGeoOption(this._chartOption.geo, mapResource);
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.geo3D)) {
			this.checkGeoOption(this._chartOption.geo3D, mapResource);
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.series)) {
			if (Array.isArray(this._chartOption.series)) {
				this._chartOption.series.forEach((series) => {
					this.checkSeriesOption(series);
				});
			} else {
				this.checkSeriesOption(this._chartOption.series);
			}
		}
		if (mapResource.length > 0) {
			this.checkMapResource(mapResource);
			return;
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.sharedVar)) {
			Object.entries(this._chartOption.sharedVar).forEach(([key, value]) => {
				let sharedValue = value;
				if (typeof value === 'string') {
					sharedValue = this.checkScriptOption(value);
				}
				this._sharedVar[key] = this._chartOption.sharedVar[key] = sharedValue;
			});
		}
		if (NgxThreeUtil.isNotNullEmpty(this.canvasBackground)) {
			const backgroundColor = NgxThreeUtil.getColorAlphaSafe(
				this.canvasBackground,
				this.canvasBackgroundOpacity
			);
			if (NgxThreeUtil.isNotNull(backgroundColor)) {
				let backgroundColorRgb: string = 'transparent';
				if (backgroundColor instanceof N3JS.Color) {
					backgroundColorRgb =
						'rgb( ' +
						backgroundColor.r * 255 +
						', ' +
						backgroundColor.g * 255 +
						', ' +
						backgroundColor.b * 255 +
						')';
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
		if (
			NgxThreeUtil.isNotNull(this._chartOption.globe) &&
			Array.isArray(this._chartOption.globe)
		) {
			this._chartOption.globe.forEach((globe: any) => {
				if (NgxThreeUtil.isNotNull(globe.environment)) {
					globe.environment = this.checkTextureOption(globe.environment);
				}
				if (NgxThreeUtil.isNotNull(globe.heightTexture)) {
					globe.heightTexture = this.checkTextureOption(globe.heightTexture);
				}
				if (NgxThreeUtil.isNotNull(globe.baseTexture)) {
					globe.baseTexture = this.checkTextureOption(globe.baseTexture);
				}
				if (NgxThreeUtil.isNotNull(globe.displacementTexture)) {
					globe.displacementTexture = this.checkTextureOption(
						globe.displacementTexture
					);
				}
				if (NgxThreeUtil.isNotNull(globe.light)) {
					this.checkLightOption(globe.light);
				}
				if (NgxThreeUtil.isNotNull(globe.layers)) {
					if (Array.isArray(globe.layers)) {
						globe.layers.forEach((layer : any) => {
							if (NgxThreeUtil.isNotNull(layer.texture)) {
								layer.texture = this.checkTextureOption(layer.texture);
							}
						});
					}
				}
			});
		}
		if (
			NgxThreeUtil.isNotNull(this._chartOption.grid3D) &&
			Array.isArray(this._chartOption.grid3D)
		) {
			this._chartOption.grid3D.forEach((grid3D: any) => {
				if (NgxThreeUtil.isNotNull(grid3D.light)) {
					this.checkLightOption(grid3D.light);
				}
			});
		}
		if (
			NgxThreeUtil.isNotNull(this._chartOption.actions) &&
			Array.isArray(this._chartOption.actions)
		) {
			this._chartOption.actions.forEach((actions) => {
				if (typeof actions.handler === 'string') {
					actions.handler = this.checkScriptOption(actions.handler);
					if (
						typeof actions.handler === 'string' &&
						actions.handler.startsWith('sharedVar')
					) {
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
					actions.onclick = () => {
						handler(this._chart);
					};
				} else if (
					typeof actions.handler !== 'object' ||
					NgxThreeUtil.isNull(actions.property)
				) {
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
			this._chart.dispose();
			this._lastChartInfo.seqn = this.optionSeqn;
			this._chart = null;
		}
		if (this._chart === null) {
			this._chart = this.echarts.init(this._mapCanvas);
		}
		this._chart.setOption(this._chartOption, true, false);
		this._chart.resize({
			width: this._mapCanvasSize.x,
			height: this._mapCanvasSize.y,
		});
		this.texture.needsUpdate = true;
		this.onInitChart.emit(this._chart);
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
			}
			const mapCanvas =
				(this._mapCanvas =
				this._mapCanvas =
					document.createElement('canvas'));
			this._mapCanvasSize = new N3JS.Vector2(
				this.canvasSize,
				Math.round((this.canvasSize * this.height) / this.width)
			);
			mapCanvas.width = this._mapCanvasSize.x;
			mapCanvas.height = this._mapCanvasSize.y;
			mapCanvas.style.pointerEvents = 'none';
			mapCanvas.style.display = 'none';
			document.body.append(mapCanvas);
			this._chart = null;
			this.texture = new N3JS.CanvasTexture(this._mapCanvas);
			this.synkMaterial(this.texture);
			super.setObject(this.texture);
		}
		return this.texture as T;
	}

	private _chart: ECHARTS.ECharts = null;
	private _chartOption: ECHARTS.EChartOption | ECHARTS.EChartsResponsiveOption =
		{};
	private _mapCanvasSize: I3JS.Vector2 = null;
	private _mapCanvas: HTMLCanvasElement = null;
}
