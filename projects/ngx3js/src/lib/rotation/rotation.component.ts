import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { ITagAttributes } from '../ngx-interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * The Rotation component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRotationComponent) page for details.
 * See the [ngx rotation](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_rotation) page for a live demo.
 *
 * ```html
 * <ngx3js-rotation
 * 	[x]="-90" [y]="0" [z]="0" [isRadian]="false"
 * ></ngx3js-rotation>
 * ```
 */
@Component({
	selector: 'ngx3js-rotation',
	templateUrl: './rotation.component.html',
	styleUrls: ['./rotation.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxRotationComponent),
		},
	],
})
export class NgxRotationComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The refer of rotation component
	 */
	@Input() public refer: any = null;

	/**
	 * The refName of rotation component
	 */
	@Input() public refName: string = null;

	/**
	 * The current value of the x component.
	 */
	@Input() public x: number | string = 0;

	/**
	 * The current value of the y component.
	 */
	@Input() public y: number | string = 0;

	/**
	 * The current value of the z component.
	 */
	@Input() public z: number | string = 0;

	/**
	 * The current value of the order component.
	 */
	@Input() public order: string = null;

	/**
	 * The value type is radian. Default value is *false*.
	 */
	@Input() public isRadian: boolean = false;

	/**
	 * Creates an instance of rotation component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('rotation');
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
		if (changes && this.rotation) {
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
	 * The Rotation of rotation component
	 */
	private rotation: I3JS.Euler = null;

	/**
	 * The Object3d of rotation component
	 */
	private _object3d: {
		[key: string]: I3JS.Object3D;
	} = {};

	/**
	 * unSets object3d
	 * @param object3d
	 */
	public unsetObject3d(object3d: NgxAbstractSubscribeComponent) {
		const key: string = object3d.getId();
		this.unSubscribeRefer('rotation_' + key);
		this.unSubscribeRefer('unrotation_' + key);
		if (NgxThreeUtil.isNotNull(this._object3d[key])) {
			delete this._object3d[key];
		}
	}

	/**
	 * Sets object3d
	 * @param object3d
	 */
	public setObject3d(object3d: NgxAbstractSubscribeComponent) {
		if (NgxThreeUtil.isNotNull(object3d)) {
			const key: string = object3d.getId();
			const object = NgxThreeUtil.getObject3d(object3d);
			if (NgxThreeUtil.isNotNull(this.refName) && NgxThreeUtil.isNotNull(object)) {
				this._object3d[key] = object.getObjectByName(this.refName);
			} else {
				this._object3d[key] = object;
			}
			this.subscribeRefer(
				'rotation_' + key,
				NgxThreeUtil.getSubscribe(
					object3d,
					() => {
						this.setObject3d(object3d);
					},
					'loaded'
				)
			);
			this.subscribeRefer(
				'unrotation_' + key,
				NgxThreeUtil.getSubscribe(
					object3d,
					() => {
						this.unsetObject3d(object3d);
					},
					'destroy'
				)
			);
			this.getRotation();
			this.synkObject3d(this.rotation, key);
		}
	}

	/**
	 * Synks object3d
	 * @param [rotation]
	 */
	public synkObject3d(rotation: I3JS.Euler = null, key: string = null) {
		if (NgxThreeUtil.isNotNull(rotation) && this.enabled) {
			if (NgxThreeUtil.isNotNull(this._object3d)) {
				const object3dList: I3JS.Object3D[] = [];
				if (NgxThreeUtil.isNotNull(key)) {
					if (NgxThreeUtil.isNotNull(this._object3d[key])) {
						object3dList.push(this._object3d[key]);
					}
				} else {
					Object.entries(this._object3d).forEach(([_, object3d]) => {
						if (NgxThreeUtil.isNotNull(object3d)) {
							object3dList.push(object3d);
						}
					});
				}
				object3dList.forEach((object3d) => {
					if (object3d instanceof N3JS.Object3D) {
						if (
							NgxThreeUtil.isNotNull(this.x) &&
							NgxThreeUtil.isNotNull(this.y) &&
							NgxThreeUtil.isNotNull(this.z)
						) {
							object3d.rotation.copy(rotation);
						} else {
							if (NgxThreeUtil.isNotNull(this.x)) {
								object3d.rotation.x = rotation.x;
							}
							if (NgxThreeUtil.isNotNull(this.y)) {
								object3d.rotation.y = rotation.y;
							}
							if (NgxThreeUtil.isNotNull(this.z)) {
								object3d.rotation.z = rotation.z;
							}
							if (NgxThreeUtil.isNotNull(this.order)) {
								object3d.rotation.order = rotation.order;
							}
						}
					}
				});
			} else if (this.rotation !== rotation) {
				this.rotation.copy(rotation);
			}
		}
	}

	/**
	 * Sets rotation
	 * @param [x]
	 * @param [y]
	 * @param [z]
	 */
	public setRotation(x?: number, y?: number, z?: number) {
		if (this.rotation !== null) {
			this.x = NgxThreeUtil.getTypeSafe(x, this.rotation.x);
			this.y = NgxThreeUtil.getTypeSafe(y, this.rotation.y);
			this.z = NgxThreeUtil.getTypeSafe(z, this.rotation.z);
		} else {
			this.x = NgxThreeUtil.getTypeSafe(x, 0);
			this.y = NgxThreeUtil.getTypeSafe(y, 0);
			this.z = NgxThreeUtil.getTypeSafe(z, 0);
		}
		this.isRadian = false;
		this.needUpdate = true;
	}

	/**
	 * Gets tag attribute
	 * @param [options]
	 * @returns tag attribute
	 */
	public getTagAttribute(options?: any): ITagAttributes {
		const tagAttributes: ITagAttributes = {
			tag: 'ngx3js-rotation',
			attributes: [],
		};
		if (NgxThreeUtil.isNotNull(options.rotation)) {
			tagAttributes.attributes.push({
				name: 'x',
				value: NgxThreeUtil.getRadian2AngleSafe(options.rotation.x),
			});
			tagAttributes.attributes.push({
				name: 'y',
				value: NgxThreeUtil.getRadian2AngleSafe(options.rotation.y),
			});
			tagAttributes.attributes.push({
				name: 'z',
				value: NgxThreeUtil.getRadian2AngleSafe(options.rotation.z),
			});
		} else {
			tagAttributes.attributes.push({ name: 'x', value: this.x });
			tagAttributes.attributes.push({ name: 'y', value: this.y });
			tagAttributes.attributes.push({ name: 'z', value: this.z });
		}
		return tagAttributes;
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (this.rotation !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getRotation();
				return;
			}
			if (!NgxThreeUtil.isOnlyIndexOf(changes, ['init', 'type', 'enabled'])) {
				this.needUpdate = true;
				return;
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * Gets rotation
	 * @returns rotation
	 */
	private _getRotation(): I3JS.Euler {
		let rotation: I3JS.Euler = null;
		if (NgxThreeUtil.isNotNull(this.refer)) {
			rotation = NgxThreeUtil.getRotation(this.refer);
		}
		if (rotation === null) {
			if (
				this.isRadian &&
				typeof this.x === 'number' &&
				typeof this.y === 'number' &&
				typeof this.z === 'number'
			) {
				rotation = new N3JS.Euler(this.x, this.y, this.z);
			} else {
				rotation = NgxThreeUtil.getEulerSafe(this.x, this.y, this.z, null, true);
			}
			if (NgxThreeUtil.isNotNull(this.order)) {
				rotation.order = this.order;
			}
		}
		return rotation;
	}

	/**
	 * Gets rotation
	 * @returns rotation
	 */
	public getRotation(): I3JS.Euler {
		if (this.rotation === null || this._needUpdate) {
			this.needUpdate = false;
			this.rotation = this._getRotation();
			this.setObject(this.rotation);
			this.synkObject3d(this.rotation);
		}
		return this.rotation;
	}
}
