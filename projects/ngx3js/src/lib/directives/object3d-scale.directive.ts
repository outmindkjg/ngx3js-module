import {
	Directive,
	forwardRef,
	Input,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import {
	NgxAbstractObject3dDirective,
	NgxAbstractThreeDirective
} from '../directive.abstract';
import { I3JS, NgxThreeUtil } from '../interface';
import { TObject3dFunction, IRendererTimer, IScaleOptions } from '../ngx-interface';
import { NgxAbstractObject3dComponent } from '../object3d.abstract';

/**
 * Scale Directive
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ScaleDirective) page for details.
 * See the [ngx directives](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_directives) page for a live demo.
 *
 * ```html
 * <ngx3js-mesh [ngx3jsScale]="{
 * 		type : 'xyz',
 * 		speed : 0.1,
 * 		easing : 'linearIn',
 * 		repeat : 'yoyo',
 * 		start : 0,
 * 		end : 1
 * }"></ngx3js-mesh>
 * ```
 *
 */
@Directive({
	selector: '[ngx3jsScale]',
	providers: [
		{
			provide: NgxAbstractThreeDirective,
			multi: true,
			useExisting: forwardRef(() => NgxScaleDirective),
		},
	],
})
export class NgxScaleDirective
	extends NgxAbstractObject3dDirective
	implements OnChanges
{
	/**
	 * Input  of scale directive
	 */
	@Input('ngx3jsScale') public ngx3jsScale:
		| IScaleOptions
		| TObject3dFunction
		| string = 'xyz';

	/**
	 * Creates an instance of scale directive.
	 * @param object3d
	 */
	constructor(object3d: NgxAbstractObject3dComponent) {
		super(object3d);
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		if (changes.ngx3jsScale && NgxThreeUtil.isNotNull(this.ngx3jsScale)) {
			const options: IScaleOptions = {
				type: null,
				easing: 'linearin',
				repeat: 'yoyo',
				start: 0,
				end: 1,
				speed: 0.1,
			};
			if (typeof this.ngx3jsScale === 'string') {
				switch (this.ngx3jsScale) {
					case 'none':
					case 'pause':
					case 'stop':
					case 'play':
					case 'x':
					case 'y':
					case 'z':
					case 'xy':
					case 'xz':
					case 'yz':
					case 'xyz':
						options.type = this.ngx3jsScale;
						break;
					default:
						const [type, speed, easing, repeat, start, end] = (
							this.ngx3jsScale + ':0.1:linearin:yoyo:0:1'
						).split(':');
						options.type = type;
						options.speed = parseFloat(speed) || 0.1;
						options.easing = easing;
						options.repeat = repeat;
						options.start = parseFloat(start) || 0;
						options.end = parseFloat(end) || 1;
						break;
				}
			} else if (typeof this.ngx3jsScale === 'function') {
				this.setObject3dFunction(this.ngx3jsScale);
			} else {
				if (NgxThreeUtil.isNotNull(this.ngx3jsScale.type)) {
					options.type = this.ngx3jsScale.type;
				}
				if (NgxThreeUtil.isNotNull(this.ngx3jsScale.speed)) {
					options.speed = this.ngx3jsScale.speed;
				}
				if (NgxThreeUtil.isNotNull(this.ngx3jsScale.easing)) {
					options.easing = this.ngx3jsScale.easing;
				}
				if (NgxThreeUtil.isNotNull(this.ngx3jsScale.repeat)) {
					options.repeat = this.ngx3jsScale.repeat;
				}
				if (NgxThreeUtil.isNotNull(this.ngx3jsScale.start)) {
					options.start = this.ngx3jsScale.start;
				}
				if (NgxThreeUtil.isNotNull(this.ngx3jsScale.end)) {
					options.end = this.ngx3jsScale.end;
				}
			}
			if (options.type !== null) {
				const easing = this.getEasing(
					options.easing,
					options.speed || 0.1,
					options.repeat,
					options.start,
					options.end
				);
				switch (options.type) {
					case 'none':
					case 'stop':
					case 'pause':
						this.pause();
						break;
					case 'play':
						this.play();
						break;
					case 'x':
						this.setObject3dFunction(
							(object3d: I3JS.Object3D, _: number, timer: IRendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.scale.x = deltaValue;
							}
						);
						break;
					case 'y':
						this.setObject3dFunction(
							(object3d: I3JS.Object3D, _: number, timer: IRendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.scale.y = deltaValue;
							}
						);
						break;
					case 'z':
						this.setObject3dFunction(
							(object3d: I3JS.Object3D, _: number, timer: IRendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.scale.z = deltaValue;
							}
						);
						break;
					case 'xy':
						this.setObject3dFunction(
							(object3d: I3JS.Object3D, _: number, timer: IRendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.scale.x = deltaValue;
								object3d.scale.y = deltaValue;
							}
						);
						break;
					case 'xz':
						this.setObject3dFunction(
							(object3d: I3JS.Object3D, _: number, timer: IRendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.scale.x = deltaValue;
								object3d.scale.z = deltaValue;
							}
						);
						break;
					case 'yz':
						this.setObject3dFunction(
							(object3d: I3JS.Object3D, _: number, timer: IRendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.scale.y = deltaValue;
								object3d.scale.z = deltaValue;
							}
						);
						break;
					case 'xyz':
						this.setObject3dFunction(
							(object3d: I3JS.Object3D, _: number, timer: IRendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.scale.x = deltaValue;
								object3d.scale.y = deltaValue;
								object3d.scale.z = deltaValue;
							}
						);
						break;
				}
			}
		}
	}
}
