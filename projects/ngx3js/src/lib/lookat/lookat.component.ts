import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { TagAttributes, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import * as THREE_CORE from './../threejs-library/three-core';

/**
 * The Lookat component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LookatComponent) page for details.
 *
 * vector - A vector representing a position in world space.
 * Optionally, the [x](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector3.x), [y](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector3.y) and [z](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector3.z) components of the world space position.
 *
 * Rotates the object to face a point in world space.
 *
 * This method does not support objects having non-uniformly-scaled parent(s).
 *
 * ```html
 * <ngx3js-renderer>
 * 	<ngx3js-lookat [x]="0" [y]="0" [z]="0"></ngx3js-lookat>
 * </ngx3js-renderer>
 * ```
 * @see THREE.Object3D.lookAt
 */
@Component({
	selector: 'ngx3js-lookat',
	templateUrl: './lookat.component.html',
	styleUrls: ['./lookat.component.scss'],
})
export class LookatComponent
	extends AbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The refer of lookat component
	 */
	@Input() public refer: any = null;

	/**
	 * The refName of rotation component
	 */
	@Input() public refName: string = null;

	/**
	 * The current value of the x component. Default value is *0*.
	 */
	@Input() public x: number = 0;

	/**
	 * The current value of the y component. Default value is *0*.
	 */
	@Input() public y: number = 0;

	/**
	 * The current value of the z component. Default value is *0*.
	 */
	@Input() public z: number = 0;

	/**
	 * Creates an instance of lookat component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('lookat');
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
		if (changes && this.lookat) {
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
	 * The Lookat of lookat component
	 */
	private lookat: THREE_CORE.IVector3 = null;

	/**
	 * The Object3d of lookat component
	 */
	private _object3d: {
		[key: string]: THREE_CORE.IObject3D | { target: THREE_CORE.IVector3 };
	} = {};

	/**
	 * unSets object3d
	 * @param object3d
	 */
	public unsetObject3d(object3d: AbstractSubscribeComponent) {
		const key: string = object3d.getId();
		this.unSubscribeRefer('lookat_' + key);
		this.unSubscribeRefer('unlookat_' + key);
		if (ThreeUtil.isNotNull(this._object3d[key])) {
			delete this._object3d[key];
		}
	}

	/**
	 * Sets object3d
	 * @param object3d
	 */
	public setObject3d(object3d: AbstractSubscribeComponent) {
		if (ThreeUtil.isNotNull(object3d)) {
			const key: string = object3d.getId();
			const object: any = object3d.getObject();
			if (object instanceof THREE.Object3D) {
				if (ThreeUtil.isNotNull(this.refName) && ThreeUtil.isNotNull(object)) {
					this._object3d[key] = object.getObjectByName(this.refName);
				} else {
					this._object3d[key] = object;
				}
			} else if (ThreeUtil.isNotNull(object.target)) {
				this._object3d[key] = object;
			}
			this.subscribeRefer(
				'lookat_' + key,
				ThreeUtil.getSubscribe(
					object3d,
					() => {
						this.setObject3d(object3d);
					},
					'loaded'
				)
			);
			this.subscribeRefer(
				'unlookat_' + key,
				ThreeUtil.getSubscribe(
					object3d,
					() => {
						this.unsetObject3d(object3d);
					},
					'destroy'
				)
			);
			this.getLookAt();
			this.synkObject3d(this.lookat, key);
		}
	}

	/**
	 * Synks object3d
	 * @param [lookat]
	 */
	public synkObject3d(lookat: THREE_CORE.IVector3 = null, key: string = null) {
		if (ThreeUtil.isNotNull(lookat) && this.enabled) {
			if (ThreeUtil.isNotNull(this._object3d)) {
				const object3dList: (THREE_CORE.IObject3D | { target: THREE_CORE.IVector3 })[] = [];
				if (ThreeUtil.isNotNull(key)) {
					if (ThreeUtil.isNotNull(this._object3d[key])) {
						object3dList.push(this._object3d[key]);
					}
				} else {
					Object.entries(this._object3d).forEach(([_, object3d]) => {
						if (ThreeUtil.isNotNull(object3d)) {
							object3dList.push(object3d);
						}
					});
				}
				object3dList.forEach((object3d) => {
					if (
						ThreeUtil.isNotNull(this.x) &&
						ThreeUtil.isNotNull(this.y) &&
						ThreeUtil.isNotNull(this.z)
					) {
						if (object3d instanceof THREE.Object3D) {
							object3d.lookAt(lookat);
						} else if (object3d !== null && object3d !== undefined) {
							const objectTraget : any = object3d;
							objectTraget.target.set(lookat.x, lookat.y, lookat.z);
							const object3dAny: any = object3d;
							if (ThreeUtil.isNotNull(object3dAny['update'])) {
								object3dAny['update']();
							}
						}
					}
				});
			} else if (this.lookat !== lookat) {
				this.lookat.copy(lookat);
			}
		}
	}

	/**
	 * Sets Lookat
	 * @param [x]
	 * @param [y]
	 * @param [z]
	 */
	public setLookat(x?: number, y?: number, z?: number) {
		if (this.lookat !== null) {
			this.x = ThreeUtil.getTypeSafe(x, this.lookat.x);
			this.y = ThreeUtil.getTypeSafe(y, this.lookat.y);
			this.z = ThreeUtil.getTypeSafe(z, this.lookat.z);
		} else {
			this.x = ThreeUtil.getTypeSafe(x, 0);
			this.y = ThreeUtil.getTypeSafe(y, 0);
			this.z = ThreeUtil.getTypeSafe(z, 0);
		}
		this.needUpdate = true;
	}

	/**
	 * Gets tag attribute
	 * @param [options]
	 * @returns tag attribute
	 */
	public getTagAttribute(options?: any): TagAttributes {
		const tagAttributes: TagAttributes = {
			tag: 'ngx3js-lookat',
			attributes: [],
		};
		if (ThreeUtil.isNotNull(options.lookat)) {
			tagAttributes.attributes.push({ name: 'x', value: options.lookat.x });
			tagAttributes.attributes.push({ name: 'y', value: options.lookat.y });
			tagAttributes.attributes.push({ name: 'z', value: options.lookat.z });
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
		if (this.lookat !== null) {
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getLookAt();
				return;
			}
			if (!ThreeUtil.isOnlyIndexOf(changes, ['init', 'type', 'enabled'])) {
				this.needUpdate = true;
				return;
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * Gets look at
	 * @returns look at
	 */
	private _getLookAt(): THREE_CORE.IVector3 {
		let lookat: THREE_CORE.IVector3 = null;
		if (this.refer !== null) {
			this.unSubscribeRefer('refer');
			lookat = ThreeUtil.getLookAt(this.refer);
			this.subscribeRefer(
				'refer',
				ThreeUtil.getSubscribe(
					this.refer,
					() => {
						this.needUpdate = true;
					},
					'lookat'
				)
			);
		}
		if (lookat === null) {
			lookat = ThreeUtil.getVector3Safe(
				this.x,
				this.y,
				this.z,
				null,
				null,
				true
			);
		}
		return lookat;
	}

	/**
	 * Gets look at
	 * @returns look at
	 */
	public getLookAt(): THREE_CORE.IVector3 {
		if (this._needUpdate) {
			this.needUpdate = false;
			this.lookat = this._getLookAt();
			this.setObject(this.lookat);
			this.synkObject3d(this.lookat);
		}
		return this.lookat;
	}
}
