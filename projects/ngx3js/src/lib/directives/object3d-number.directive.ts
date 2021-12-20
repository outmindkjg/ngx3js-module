import {
	Directive,
	forwardRef,
	Input,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import {
	NgxAbstractThreeDirective
} from '../directive.abstract';
import { NgxThreeUtil } from '../interface';
import { IDirectiveOptions, TObjectFunction, IRendererTimer, INumberOptions } from '../ngx-interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * Number Directive
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NumberDirective) page for details.
 * See the [ngx directives](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_directives) page for a live demo.
 *
 * ```html
 * <ngx3js-light [ngx3jsNumber]="{
 * 		type : 'intensity',
 * 		speed : 0.1,
 * 		easing : 'linearIn',
 * 		repeat : 'yoyo',
 * 		start : 0,
 * 		end : 1
 * }"></ngx3js-light>
 * ```
 *
 */
@Directive({
	selector: '[ngx3jsNumber]',
	providers: [
		{
			provide: NgxAbstractThreeDirective,
			multi: true,
			useExisting: forwardRef(() => NumberDirective),
		},
	],
})
export class NumberDirective
	extends NgxAbstractThreeDirective
	implements OnChanges
{
	/**
	 * Input  of number directive
	 */
	@Input('ngx3jsNumber') public ngx3jsNumber:
		| INumberOptions
		| TObjectFunction
		| string = 'none';

	/**
	 * Creates an instance of number directive.
	 *
	 * @param object3d
	 */
	constructor(object: NgxAbstractSubscribeComponent) {
		super(object);
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		if (changes.ngx3jsNumber && NgxThreeUtil.isNotNull(this.ngx3jsNumber)) {
			const options: INumberOptions = {
				type: null,
				easing: 'linearin',
				repeat: 'yoyo',
				start: 0,
				end: 1,
				speed: 0.1,
			};
			if (typeof this.ngx3jsNumber === 'string') {
				switch (this.ngx3jsNumber) {
					case 'none':
					case 'pause':
					case 'stop':
					case 'play':
						options.type = this.ngx3jsNumber;
						break;
					default:
						const [type, speed, easing, repeat, start, end] = (
							this.ngx3jsNumber + ':0.1:linearin:yoyo:0:1'
						).split(':');
						options.type = type;
						options.speed = parseFloat(speed) || 0.1;
						options.easing = easing;
						options.repeat = repeat;
						options.start = parseFloat(start) || 0;
						options.end = parseFloat(end) || 1;
						break;
				}
			} else if (typeof this.ngx3jsNumber === 'function') {
				this.setObjectFunction(this.ngx3jsNumber);
			} else {
				if (NgxThreeUtil.isNotNull(this.ngx3jsNumber.type)) {
					options.type = this.ngx3jsNumber.type;
				}
				if (NgxThreeUtil.isNotNull(this.ngx3jsNumber.speed)) {
					options.speed = this.ngx3jsNumber.speed;
				}
				if (NgxThreeUtil.isNotNull(this.ngx3jsNumber.easing)) {
					options.easing = this.ngx3jsNumber.easing;
				}
				if (NgxThreeUtil.isNotNull(this.ngx3jsNumber.repeat)) {
					options.repeat = this.ngx3jsNumber.repeat;
				}
				if (NgxThreeUtil.isNotNull(this.ngx3jsNumber.start)) {
					options.start = this.ngx3jsNumber.start;
				}
				if (NgxThreeUtil.isNotNull(this.ngx3jsNumber.end)) {
					options.end = this.ngx3jsNumber.end;
				}
			}
			if (options.type !== null) {
				switch (options.type) {
					case 'none':
					case 'stop':
					case 'pause':
						this.pause();
						break;
					case 'play':
						this.play();
						break;
					default:
						const property = options.type;
						const easing = this.getEasing(
							options.easing,
							options.speed || 0.1,
							options.repeat,
							options.start,
							options.end
						);
						this.setObjectFunction(
							(object: any, _: number, timer: IRendererTimer) => {
								if (
									object[property] !== undefined &&
									typeof object[property] === 'number'
								) {
									const deltaValue = easing(timer.delta);
									object[property] = deltaValue;
								}
							}
						);
						break;
				}
			}
		}
	}
}
