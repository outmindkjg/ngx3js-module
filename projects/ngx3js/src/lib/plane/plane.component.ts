import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * The Plane component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPlaneComponent) page for details.
 *
 */
@Component({
	selector: 'ngx3js-plane',
	templateUrl: './plane.component.html',
	styleUrls: ['./plane.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxPlaneComponent),
		},
	],
})
export class NgxPlaneComponent extends NgxAbstractSubscribeComponent implements OnInit {
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
	 * The negate of plane component
	 */
	@Input() public negate: boolean = null;

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

	protected applyChanges(changes: string[]): void {
		if (this.plane !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getPlane();
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, ['init'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['x', 'y', 'z', 'w', 'negate']);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['negate'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['x', 'y', 'z', 'w']);
			}

			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'x':
						this.plane.normal.x = NgxThreeUtil.getTypeSafe(this.x, 0);
						break;
					case 'y':
						this.plane.normal.y = NgxThreeUtil.getTypeSafe(this.y, 0);
						break;
					case 'z':
						this.plane.normal.z = NgxThreeUtil.getTypeSafe(this.z, 0);
						break;
					case 'w':
						this.plane.constant = NgxThreeUtil.getTypeSafe(this.w, 0);
						break;
				}
			});
			if (NgxThreeUtil.isIndexOf(changes, ['negate']) && NgxThreeUtil.isNotNull(this.negate) && this.negate) {
				this.plane.negate();
			}
			super.applyChanges(changes);
		}
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
		this.plane.set(NgxThreeUtil.getVector3Safe(this.x, this.y, this.z), NgxThreeUtil.getTypeSafe(this.w, 0));
		return this.plane;
	}
}
