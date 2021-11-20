import {
	Directive,
	forwardRef,
	Input,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import {
	AbstractThreeDirective, ObjectFunction
} from '../directive.abstract';
import { RendererTimer, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * Number options
 */
export interface NumberOptions {
	/** type */
	type?: 'none' | string;

	/** yoyo */
	yoyo?: boolean;

	/** min */
	min?: number;

	/** max */
	max?: number;

	/** speed */
	speed?: number;
}

/**
 * Number Directive
 *
 * @example
 * ```html
 *  <ngx3js-mesh [ngx3jsNumber]="{ type : 'xyz', speed : 0.1,  yoyo : true, min : 0, max : 1 }"></ngx3js-mesh>
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
				yoyo: true,
				min: 0,
				max: 1,
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
						const [type, speed, yoyo, min, max] = (
							this.ngx3jsNumber + ':0.1:true:0:1'
						).split(':');
						options.type = type;
						options.yoyo = yoyo === 'true' || yoyo === 'yes' ? true : false;
						options.speed = parseFloat(speed) || 0.1;
						options.min = parseFloat(min) || 0;
						options.max = parseFloat(max) || 1;
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
				if (ThreeUtil.isNotNull(this.ngx3jsNumber.yoyo)) {
					options.yoyo = this.ngx3jsNumber.yoyo;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsNumber.min)) {
					options.min = this.ngx3jsNumber.min;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsNumber.max)) {
					options.max = this.ngx3jsNumber.max;
				}
			}
			if (options.type !== null) {
				const speed = options.speed || 0.1;
				const yoyo = options.yoyo;
				const min = options.min;
				const max = options.max;
				let direction: number = 1;
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
						this.setObjectFunction(
							(object: any, _: number, timer: RendererTimer) => {
								if (
									object[property] !== undefined &&
									typeof object[property] === 'number'
								) {
									const deltaValue = timer.delta * speed * direction;
									object[property] += deltaValue;
									if (
										yoyo &&
										((direction > 0 && object[property] > max) ||
											(direction < 0 && object[property] < min))
									) {
										direction *= -1;
										object[property] = Math.min(
											Math.max(object[property], min),
											max
										);
									}
								}
							}
						);
						break;
				}
			}
		}
	}
}
