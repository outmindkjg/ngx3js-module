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
	constructor(protected object3dCom: AbstractObject3dComponent) {

	}

	/**
	 * Cachec object3d of abstract object3d directive
	 */
	private _cachecObject3d : THREE.Object3D = null;

	/**
	 * Gets object3d
	 */
	protected get object3d():THREE.Object3D {
		if (this._cachecObject3d === null) {
			this._cachecObject3d = this.object3dCom.getObject3d();
		}
		return this._cachecObject3d;
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

	protected elapsedTime : number = 0;

	public update(timer : RendererTimer) {
		this.elapsedTime += timer.delta;
	}
}

