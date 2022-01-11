import {
	Component,
	forwardRef,
	Input,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { NgxAbstractChartComponent } from '../../chart.abstract';
import { NgxThreeUtil, I3JS, N3JS } from '../../interface';
import { INgxColor } from '../../ngx-interface';
import { NgxAbstractObject3dComponent } from '../../object3d.abstract';

/**
 * The Chart Title component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxChartTitleComponent) page for details.
 *
 */
@Component({
	selector: 'ngx3js-chart-title',
	templateUrl: './title.component.html',
	styleUrls: ['./title.component.scss'],
	providers: [
		{
			provide: NgxAbstractObject3dComponent,
			useExisting: forwardRef(() => NgxChartTitleComponent),
		},
	],
})
export class NgxChartTitleComponent
	extends NgxAbstractChartComponent
	implements OnInit
{
	/**
	 * The type of chart title component
	 */
	@Input() public type: string = '';

	/**
	 * The message of chart title component
	 */
	@Input() public message: string = null;

	/**
	 * The color of chart title component
	 */
	@Input() public color: INgxColor = null;

	/**
	 * The align of chart title component
	 */
	@Input() public align: string = null;

	/**
	 * The fontFamily of chart title component
	 */
	@Input() public fontFamily: string = null;

	/**
	 * Creates an instance of chart title component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('chart-title');
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
	 * The Title of chart title component
	 */
	private _title: I3JS.Object3D = null;

	/**
	 * The Material of chart title component
	 */
	private _material: I3JS.MeshBasicMaterial = null;

	/**
	 * The Geometry of chart title component
	 */
	private _geometry: I3JS.PlaneGeometry = null;

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	protected applyChanges3d(changes: string[]) {
		if (this._title !== null) {
			if (NgxThreeUtil.isIndexOf(changes, ['clearinit'])) {
				this.getTitle();
			}
			if (
				!NgxThreeUtil.isOnlyIndexOf(changes, ['opacity', 'align'], this.CHART_ATTR)
			) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, ['init'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['opacity', 'align']);
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
					case 'align':
						if (NgxThreeUtil.isNotNull(this.align)) {
							const geometry = this._geometry;
							const width = geometry.parameters.width;
							const height = geometry.parameters.height;
							geometry.center();
							NgxThreeUtil.getTypeSafe(this.align, 'center')
								.split('-')
								.forEach((align) => {
									switch (align.toLowerCase()) {
										case 'left':
											geometry.translate(width / 2, 0, 0);
											break;
										case 'right':
											geometry.translate(-width / 2, 0, 0);
											break;
										case 'top':
											geometry.translate(0, height / 2, 0);
											break;
										case 'bottom':
											geometry.translate(0, -height / 2, 0);
											break;
									}
								});
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
		return this.getTitle();
	}

	/**
	 * Gets Chart
	 * @template T
	 * @returns object3d
	 */
	public getTitle<T extends I3JS.Object3D>(): T {
		if (this._title === null || this._needUpdate) {
			this.needUpdate = false;
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			const message = NgxThreeUtil.getTypeSafe(this.message, 'no title');
			const height = NgxThreeUtil.getTypeSafe(this.height, 1);
			const font =
				'normal 100px ' + NgxThreeUtil.getTypeSafe(this.fontFamily, 'Arial');
			context.font = font;
			let textWidth = 500;
			const textHeight = 110;
			switch (this.type.toLowerCase()) {
				case 'label':
					textWidth =
						(NgxThreeUtil.getTypeSafe(this.width, 1) * textHeight) / height;
					break;
				case 'title':
				case 'subtitle':
				default:
					const metrics = context.measureText(message);
					textWidth = metrics.width;
					break;
			}
			canvas.width = textWidth;
			canvas.height = textHeight;
			const options = NgxThreeUtil.getTypeSafe(this.options, {});
			if (NgxThreeUtil.isNotNull(options.backgroundColor)) {
				context.fillStyle =
					'#' +
					NgxThreeUtil.getColorSafe(
						options.backgroundColor,
						'0x000000'
					).getHexString();
				context.fillRect(0, 0, textWidth, textHeight);
			}
			context.font = font;
			context.textBaseline = 'middle';
			context.fillStyle =
				'#' + NgxThreeUtil.getColorSafe(this.color, '0xffffff').getHexString();
			switch (this.type.toLowerCase()) {
				case 'label':
					context.textAlign = 'left';
					context.fillText(message, textHeight * 0.1, textHeight * 0.6);
					break;
				case 'title':
				case 'subtitle':
				default:
					context.textAlign = 'center';
					context.fillText(message, textWidth * 0.5, textHeight * 0.6);
					break;
			}
			const texture = new N3JS.Texture(canvas);
			texture.needsUpdate = true;
			this._material = new N3JS.MeshBasicMaterial({
				color: 0xffffff,
				side: N3JS.DoubleSide,
				map: texture,
				opacity: 1,
				transparent: true,
			});
			const width = (height * textWidth) / textHeight;
			this._geometry = new N3JS.PlaneGeometry(width, height);
			this._title = new N3JS.Mesh(this._geometry, this._material);
			this.setChart(this._title);
		}
		return this._title as T;
	}
}
