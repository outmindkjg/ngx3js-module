import { Directive, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { RendererTimer, ThreeUtil } from './interface';
import { AbstractObject3dComponent } from './object3d.abstract';

/**
 * ObjectFunction
 */
 export type ObjectFunction = (
	object: any,
	elapsedTime?: number,
	timer?: RendererTimer
) => void;

/**
 * Object3dFunction
 */
export type Object3dFunction = (
	object3d: THREE.Object3D,
	elapsedTime?: number,
	timer?: RendererTimer
) => void;

/**
 * AbstractObject3dDirective Abstract
 *
 * @export
 * @abstract
 */
@Directive()
export abstract class AbstractThreeDirective {
	/**
	 * Creates an instance of AbstractObject3dDirective.
	 *
	 * @constructor
	 */
	constructor(@Inject('')  protected objectCom : any) {}

	/**
	 * subscription
	 * @param subscriptions
	 * @returns subscription
	 */
	protected unSubscription(subscriptions: Subscription[]): Subscription[] {
		if (subscriptions !== null && subscriptions.length > 0) {
			subscriptions.forEach((subscription) => {
				subscription.unsubscribe();
			});
		}
		return [];
	}

	/**
	 * The Subscribe of abstract subscribe component
	 */
	private _subscribe: { [key: string]: Subscription } = {};

	/**
	 * subscribe refer
	 * @param key
	 */
	protected unSubscribeRefer(key: string) {
		if (ThreeUtil.isNotNull(this._subscribe[key])) {
			this._subscribe[key].unsubscribe();
			delete this._subscribe[key];
		}
	}

	/**
	 * Subscribes refer
	 * @param key
	 * @param subscription
	 */
	protected subscribeRefer(key: string, subscription: Subscription) {
		if (ThreeUtil.isNotNull(this._subscribe[key])) {
			this.unSubscribeRefer(key);
		}
		if (ThreeUtil.isNotNull(subscription)) {
			this._subscribe[key] = subscription;
		}
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this._subscribe !== null) {
			for (let key in this._subscribe) {
				this._subscribe[key].unsubscribe();
			}
			this._subscribe = {};
		}
	}

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked the directive's
	 * data-bound properties for the first time,
	 * and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		this.subscribeRefer(
			'object_directive',
			ThreeUtil.getSubscribe(
				this.objectCom,
				() => {
					this._cachedObject = null;
				},
				'init'
			)
		);
	}

	/**
	 * Cached object of abstract three directive
	 */
	 private _cachedObject: any = null;

	 /**
	  * Gets object3d
	  */
	 protected get object(): THREE.Object3D {
		 if (this._cachedObject === null ) {
			 this._cachedObject = this.objectCom.getObject();
		 }
		 return this._cachedObject;
	 }
	 
	/**
	 * Enabled  of abstract directive
	 */
	protected enabled: boolean = false;

	/**
	 * Elapsed time of abstract object3d directive
	 */
	protected elapsedTime: number = 0;

	/**
	 * Plays abstract directive
	 */
	protected play() {
		this.enabled = true;
	}

	/**
	 * Pauses abstract directive
	 */
	protected pause() {
		this.enabled = false;
	}

	/**
	 * Object3d function of abstract object3d directive
	 */
	 protected objectFunction: ObjectFunction = null;

	 setObjectFunction(func: ObjectFunction) {
		 this.objectFunction = func;
		 this.enabled = this.objectFunction !== null;
	 }
 
	/**
	 * Updates abstract directive
	 * @param timer
	 */
	public update(timer: RendererTimer) {
		if (this.enabled) {
			this.elapsedTime += timer.delta;
			if (this.objectFunction !== null) {
				this.objectFunction(this.object, this.elapsedTime, timer);
			}
		}
	}
}
/**
 * AbstractObject3dDirective Abstract
 *
 * @export
 * @abstract
 */
@Directive()
export abstract class AbstractObject3dDirective extends AbstractThreeDirective {
	/**
	 * Creates an instance of AbstractObject3dDirective.
	 *
	 * @constructor
	 */
	constructor(protected object3dCom: AbstractObject3dComponent) {
		super(object3dCom);
	}

	/**
	 * Cached object3d of abstract object3d directive
	 */
	private _cachedObject3d: THREE.Object3D = null;

	/**
	 * Gets object3d
	 */
	protected get object3d(): THREE.Object3D {
		if (this._cachedObject3d === null) {
			this._cachedObject3d = this.object3dCom.getObject3d();
		}
		return this._cachedObject3d;
	}

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked the directive's
	 * data-bound properties for the first time,
	 * and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		this.subscribeRefer(
			'object3d_directive',
			ThreeUtil.getSubscribe(
				this.object3dCom,
				() => {
					this._cachedObject3d = null;
				},
				'init'
			)
		);
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately
	 * after a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	/**
	 * Object3d function of abstract object3d directive
	 */
	protected object3dFunction: Object3dFunction = null;

	setObject3dFunction(func: Object3dFunction) {
		this.object3dFunction = func;
		this.enabled = this.object3dFunction !== null;
	}

	/**
	 * Updates abstract object3d directive
	 *
	 * @param timer
	 */
	public update(timer: RendererTimer) {
		if (this.enabled && this.object3dFunction !== null) {
			super.update(timer);
			this.object3dFunction(this.object3d, this.elapsedTime, timer);
		}
	}
}
