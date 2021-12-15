import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgxThreeUtil, I3JS, N3JS } from '../interface';
import { ITagAttributes } from '../ngx-interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * The Scale component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ScaleComponent) page for details.
 * See the [ngx scale](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_scale) page for a live demo.
 *
 */
@Component({
	selector: 'ngx3js-scale',
	templateUrl: './scale.component.html',
	styleUrls: ['./scale.component.scss'],
})
export class NgxScaleComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The refer of scale component
	 */
	@Input() public refer: any = null;

	/**
	 * The refName of rotation component
	 */
	@Input() public refName: string = null;

	/**
	 * The current value of the x component. Default value is *1*.
	 */
	@Input() public x: number = 1;

	/**
	 * The current value of the y component. Default value is *1*.
	 */
	@Input() public y: number = 1;

	/**
	 * The current value of the z component. Default value is *1*.
	 */
	@Input() public z: number = 1;

	/**
	 * Multiplies this vector by scalar s.
	 */
	@Input() public multiply: number = null;

	/**
	 * The scaleMode of scale component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public scaleMode: string = 'max';

	/**
	 * Creates an instance of scale component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('scale');
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
		if (changes && this.scale) {
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
	 * The Scale of scale component
	 */
	private scale: I3JS.Vector3 = null;

	/**
	 * The Object3d of scale component
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
		this.unSubscribeRefer('scale_' + key);
		this.unSubscribeRefer('unscale_' + key);
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
				'scale_' + key,
				NgxThreeUtil.getSubscribe(
					object3d,
					() => {
						this.setObject3d(object3d);
					},
					'loaded'
				)
			);
			this.subscribeRefer(
				'unscale_' + key,
				NgxThreeUtil.getSubscribe(
					object3d,
					() => {
						this.unsetObject3d(object3d);
					},
					'destroy'
				)
			);
			this.getScale();
			this.synkObject3d(this.scale, key);
		}
	}

	/**
	 * Synks object3d
	 * @param [scale]
	 */
	public synkObject3d(scale: I3JS.Vector3 = null, key: string = null) {
		if (NgxThreeUtil.isNotNull(scale) && this.enabled) {
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
						object3d.scale.copy(scale);
					} else {
						if (NgxThreeUtil.isNotNull(this.x)) {
							object3d.scale.x = scale.x;
						}
						if (NgxThreeUtil.isNotNull(this.y)) {
							object3d.scale.y = scale.y;
						}
						if (NgxThreeUtil.isNotNull(this.z)) {
							object3d.scale.z = scale.z;
						}
					}
				}
			});
		}
	}

	/**
	 * Sets scale
	 * @param [x]
	 * @param [y]
	 * @param [z]
	 */
	public setScale(x?: number, y?: number, z?: number) {
		if (this.scale !== null) {
			this.x = NgxThreeUtil.getTypeSafe(x, this.scale.x);
			this.y = NgxThreeUtil.getTypeSafe(y, this.scale.y);
			this.z = NgxThreeUtil.getTypeSafe(z, this.scale.z);
		} else {
			this.x = NgxThreeUtil.getTypeSafe(x, 0);
			this.y = NgxThreeUtil.getTypeSafe(y, 0);
			this.z = NgxThreeUtil.getTypeSafe(z, 0);
		}
		this.needUpdate = true;
	}

	/**
	 * Gets tag attribute
	 * @param [options]
	 * @returns tag attribute
	 */
	public getTagAttribute(options?: any): ITagAttributes {
		const tagAttributes: ITagAttributes = {
			tag: 'ngx3js-scale',
			attributes: [],
		};
		if (NgxThreeUtil.isNotNull(options.scale)) {
			tagAttributes.attributes.push({ name: 'x', value: options.scale.x });
			tagAttributes.attributes.push({ name: 'y', value: options.scale.y });
			tagAttributes.attributes.push({ name: 'z', value: options.scale.z });
		} else {
			tagAttributes.attributes.push({ name: 'x', value: this.x });
			tagAttributes.attributes.push({ name: 'y', value: this.y });
			tagAttributes.attributes.push({ name: 'z', value: this.z });
		}
		return tagAttributes;
	}

	/**
	 * Gets scale from size
	 * @param size
	 * @returns scale from size
	 */
	private getScaleFromSize(size: I3JS.Vector2): I3JS.Vector3 {
		switch (this.scaleMode) {
			case 'max':
				const maxSize = Math.max(size.x, size.y);
				return new N3JS.Vector3(maxSize * this.x, maxSize * this.y, this.z);
			case 'min':
				const minSize = Math.min(size.x, size.y);
				return new N3JS.Vector3(minSize * this.x, minSize * this.y, this.z);
			default:
				return new N3JS.Vector3(size.x * this.x, size.y * this.y, this.z);
		}
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (this.scale !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getScale();
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
	 * Gets scale
	 * @returns scale
	 */
	private _getScale(): I3JS.Vector3 {
		let scale: I3JS.Vector3 = null;
		if (this.refer !== null && this.refer !== undefined) {
			if (this.refer.getSize) {
				scale = this.getScaleFromSize(this.refer.getSize());
			} else {
				scale = NgxThreeUtil.getScale(this.refer);
			}
		}
		if (scale === null) {
			scale = NgxThreeUtil.getVector3Safe(
				this.x,
				this.y,
				this.z,
				null,
				null,
				true
			);
		}
		if (NgxThreeUtil.isNotNull(this.multiply)) {
			scale.multiplyScalar(this.multiply);
		}
		return scale;
	}

	/**
	 * Gets scale
	 * @returns scale
	 */
	public getScale(): I3JS.Vector3 {
		if (this.scale === null || this._needUpdate) {
			this.needUpdate = false;
			this.scale = this._getScale();
			this.setObject(this.scale);
			this.synkObject3d(this.scale);
		}
		return this.scale;
	}
}
