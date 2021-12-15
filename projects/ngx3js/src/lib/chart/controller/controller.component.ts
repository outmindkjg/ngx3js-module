import {
	Component,
	forwardRef,
	Input,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { NgxAbstractChartComponent } from '../../chart.abstract';
import { NgxAbstractControllerComponent } from '../../controller.component.abstract';
import { NgxThreeUtil } from '../../interface';
import { IRendererTimer } from '../../ngx-interface';

/**
 * The Chart Controller component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ChartControllerComponent) page for details.
 *
 */
@Component({
	selector: 'ngx3js-chart-controller',
	templateUrl: './controller.component.html',
	styleUrls: ['./controller.component.scss'],
	providers: [
		{
			provide: NgxAbstractControllerComponent,
			useExisting: forwardRef(() => NgxChartControllerComponent),
		},
	],
})
export class NgxChartControllerComponent
	extends NgxAbstractControllerComponent
	implements OnInit
{
	/**
	 * The Input of controller component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public type: string = 'auto';

	/**
	 * The Input of controller component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public duration: number = 2;

	/**
	 * Creates an instance of controller component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('controller');
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
		if (changes && this.refObject3d !== null) {
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
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		if (this.refObject3d !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getController();
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, ['type', 'object3d', 'object2d'])) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, []);
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * The Duration of controller component
	 */
	private _duration: number = 1;

	/**
	 * The Duration of controller component
	 */
	private _chartComponent: NgxAbstractChartComponent = null;

	/**
	 * Gets controller
	 */
	public getController(): void {
		if (
			this.refObject3d !== null &&
			(this._chartComponent === null || this._needUpdate)
		) {
			this.needUpdate = false;
			const component = NgxThreeUtil.getThreeComponent(this.refObject3d);
			this._duration = NgxThreeUtil.getTypeSafe(this.duration, 1);
			this.elapsedTime = 0;
			if (component instanceof NgxAbstractChartComponent) {
				this._chartComponent = component;
			}
			super.setObject({
				controller: this._chartComponent,
			});
		}
	}

	/**
	 * Elapsed time of chart controller component
	 */
	private elapsedTime: number = 0;

	/**
	 * Updates controller component
	 * @param rendererTimer
	 */
	public update(rendererTimer: IRendererTimer) {
		if (this._chartComponent !== null) {
			const delta = rendererTimer.delta / this._duration;
			this.elapsedTime += delta;
			this._chartComponent.update(rendererTimer, this.elapsedTime, delta);
		} else {
			this.consoleLogTime('chart controller', rendererTimer);
		}
	}
}
