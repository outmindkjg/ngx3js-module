import {
	Directive, Input,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { AbstractObject3dDirective } from '../directive.abstract';

/**
 * Rotate Directive
 *
 * @example
 * ```html
 *  <ngx3js-mesh [ngx3jsRotate]=""></ngx3js-mesh>
 * ```
 *
 */
@Directive({
	selector: '[ngx3jsRotate]',
})
export class RotateDirective extends AbstractObject3dDirective implements OnChanges {
	/**
	 * The canvas background color
	 */
	@Input('ngx3jsRotate') public ngx3jsRotate: string = '';

	/**
	 * Creates an instance of drawing canvas directive.
	 * @param ele
	 */
	constructor(object3d: AbstractObject3dComponent) {
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
		if (changes.ngx3jsRotate) {

		}
	}

}
