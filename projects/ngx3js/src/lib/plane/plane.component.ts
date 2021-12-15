import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgxThreeUtil, N3JS, I3JS } from '../interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * The Plane component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PlaneComponent) page for details.
 *
 */
@Component({
	selector: 'ngx3js-plane',
	templateUrl: './plane.component.html',
	styleUrls: ['./plane.component.scss'],
})
export class NgxPlaneComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The x of plane component
	 */
	@Input() public x: number = null;

	/**
	 * The y of plane component
	 */
	@Input() public y: number = null;

	/**
	 * The z of plane component
	 */
	@Input() public z: number = null;

	/**
	 * The w of plane component
	 */
	@Input() public w: number = null;

	/**
	 * Creates an instance of plane component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('plane');
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
		if (changes && this.plane) {
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
	 * The Plane of plane component
	 */
	private plane: I3JS.Plane = null;

	/**
	 * World plane of plane component
	 */
	private worldPlane: I3JS.Plane = null;

	/**
	 * Sets plane
	 * @param x
	 * @param y
	 * @param z
	 * @param w
	 */
	public setPlane(x: number, y: number, z: number, w: number) {
		if (NgxThreeUtil.isNotNull(x)) {
			this.x = x;
		}
		if (NgxThreeUtil.isNotNull(y)) {
			this.y = y;
		}
		if (NgxThreeUtil.isNotNull(z)) {
			this.z = z;
		}
		if (NgxThreeUtil.isNotNull(w)) {
			this.w = w;
		}
		this.needUpdate = true;
		this.getPlane();
		if (this.worldPlane !== null) {
			this.worldPlane.copy(this.plane);
		}
	}

	/**
	 * Gets world plane
	 * @param [matrixWorld]
	 * @returns world plane
	 */
	public getWorldPlane(matrixWorld?: I3JS.Matrix4): I3JS.Plane {
		if (this.worldPlane === null) {
			this.worldPlane = new N3JS.Plane();
		}
		this.worldPlane.copy(this.getPlane());
		if (matrixWorld !== null && matrixWorld !== undefined) {
			this.worldPlane.applyMatrix4(matrixWorld);
		}
		return this.worldPlane;
	}

	/**
	 * Gets plane
	 * @returns plane
	 */
	public getPlane(): I3JS.Plane {
		if (this.plane === null || this._needUpdate) {
			this.needUpdate = false;
			this.plane = new N3JS.Plane(
				NgxThreeUtil.getVector3Safe(this.x, this.y, this.z),
				NgxThreeUtil.getTypeSafe(this.w, 0)
			);
			this.setObject(this.plane);
		}
		this.plane.set(
			NgxThreeUtil.getVector3Safe(this.x, this.y, this.z),
			NgxThreeUtil.getTypeSafe(this.w, 0)
		);
		return this.plane;
	}
}
