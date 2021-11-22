import {
	Directive,
	forwardRef,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import {
	AbstractThreeDirective,
	ObjectFunction,
	DirectiveOptions,
} from '../directive.abstract';
import { RendererTimer, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * Number options
 */
export interface NumberOptions extends DirectiveOptions {}

/**
 * Number Directive
 *
 * @example
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
			provide: AbstractThreeDirective,
			multi: true,
			useExisting: forwardRef(() => NumberDirective),
		},
	],
})
export class NumberDirective
	extends AbstractThreeDirective
	implements OnChanges
{
	/**
	 * Input  of number directive
	 */
	@Input('ngx3jsNumber') public ngx3jsNumber:
		| NumberOptions
		| ObjectFunction
		| string = 'none';

	/**
	 * Creates an instance of number directive.
	 *
	 * @param object3d
	 */
	constructor(object: AbstractSubscribeComponent) {
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
		if (changes.ngx3jsNumber && ThreeUtil.isNotNull(this.ngx3jsNumber)) {
			const options: NumberOptions = {
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
				if (ThreeUtil.isNotNull(this.ngx3jsNumber.type)) {
					options.type = this.ngx3jsNumber.type;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsNumber.speed)) {
					options.speed = this.ngx3jsNumber.speed;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsNumber.easing)) {
					options.easing = this.ngx3jsNumber.easing;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsNumber.repeat)) {
					options.repeat = this.ngx3jsNumber.repeat;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsNumber.start)) {
					options.start = this.ngx3jsNumber.start;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsNumber.end)) {
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
							(object: any, _: number, timer: RendererTimer) => {
								if (
									object[property] !== undefined &&
									typeof object[property] === 'number'
								) {
									const deltaValue = easing(timer.delta);
									object[property] += deltaValue;
								}
							}
						);
						break;
				}
			}
		}
	}
}
