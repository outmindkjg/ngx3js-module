import { Directive } from '@angular/core';
import { AbstractObject3dComponent } from './object3d.abstract';
import { RendererTimer } from './interface';


/**
 * AbstractObject3dDirective Abstract
 *
 * @export
 * @abstract
 */
@Directive()
export abstract class AbstractObject3dDirective {

	/**
	 * Creates an instance of AbstractObject3dDirective.
	 *
	 * @constructor
	 */
	constructor(protected object3d: AbstractObject3dComponent) {

	}



	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked the directive's
	 * data-bound properties for the first time,
	 * and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately
	 * after a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
	}

	update(timer : RendererTimer) {}
}

