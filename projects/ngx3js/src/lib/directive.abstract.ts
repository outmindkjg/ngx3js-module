import { Directive, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { RendererTimer, ThreeUtil } from './interface';
import { AbstractObject3dComponent } from './object3d.abstract';
import * as GSAP from 'gsap';
import * as THREE_CORE from './threejs-library/three-core';

export interface EaseFunction {
	(progress: number): number;
}

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
	object3d: THREE_CORE.IObject3D,
	elapsedTime?: number,
	timer?: RendererTimer
) => void;

/**
 * Direc options
 */
export interface DirectiveOptions {
	/** type */
	type?: 'none' | string;

	/** easing */
	easing?: string;

	/** repeat */
	repeat?: string;

	/** start */
	start?: number;

	/** end */
	end?: number;

	/** speed */
	speed?: number;
}

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
	constructor(@Inject('') protected objectCom: any) {}

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
	protected get object(): THREE_CORE.IObject3D {
		if (this._cachedObject === null) {
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

	protected getEasing(
		type: string,
		speed: number,
		repeat: string = 'yoyo',
		start: number,
		end: number
	): EaseFunction {
		let easing: EaseFunction = null;
		switch (type.toLowerCase()) {
			case 'linearinout':
				easing = GSAP.Linear.easeInOut;
				break;
			case 'linearout':
				easing = GSAP.Linear.easeOut;
				break;
			case 'linearnone':
				easing = GSAP.Linear.easeNone;
				break;
			case 'quadin':
				easing = GSAP.Quad.easeIn;
				break;
			case 'quadinout':
				easing = GSAP.Quad.easeInOut;
				break;
			case 'quadout':
				easing = GSAP.Quad.easeOut;
				break;
			case 'cubicin':
				easing = GSAP.Cubic.easeIn;
				break;
			case 'cubicinout':
				easing = GSAP.Cubic.easeInOut;
				break;
			case 'cubicout':
				easing = GSAP.Cubic.easeOut;
				break;
			case 'quartin':
				easing = GSAP.Quart.easeIn;
				break;
			case 'quartinout':
				easing = GSAP.Quart.easeInOut;
				break;
			case 'quartout':
				easing = GSAP.Quart.easeOut;
				break;
			case 'quintin':
				easing = GSAP.Quint.easeIn;
				break;
			case 'quintinout':
				easing = GSAP.Quint.easeInOut;
				break;
			case 'quintout':
				easing = GSAP.Quint.easeOut;
				break;
			case 'strongin':
				easing = GSAP.Strong.easeIn;
				break;
			case 'stronginout':
				easing = GSAP.Strong.easeInOut;
				break;
			case 'strongout':
				easing = GSAP.Strong.easeOut;
				break;
			case 'power1in':
				easing = GSAP.Power1.easeIn;
				break;
			case 'power1inout':
				easing = GSAP.Power1.easeInOut;
				break;
			case 'power1out':
				easing = GSAP.Power1.easeOut;
				break;
			case 'power2in':
				easing = GSAP.Power2.easeIn;
				break;
			case 'power2inout':
				easing = GSAP.Power2.easeInOut;
				break;
			case 'power2out':
				easing = GSAP.Power2.easeOut;
				break;
			case 'power3in':
				easing = GSAP.Power3.easeIn;
				break;
			case 'power3inout':
				easing = GSAP.Power3.easeInOut;
				break;
			case 'power3out':
				easing = GSAP.Power3.easeOut;
				break;
			case 'power4in':
				easing = GSAP.Power4.easeIn;
				break;
			case 'power4inout':
				easing = GSAP.Power4.easeInOut;
				break;
			case 'power4out':
				easing = GSAP.Power4.easeOut;
				break;
			case 'backin':
				easing = GSAP.Back.easeIn;
				break;
			case 'backinout':
				easing = GSAP.Back.easeInOut;
				break;
			case 'backout':
				easing = GSAP.Back.easeOut;
				break;
			case 'elasticin':
				easing = GSAP.Elastic.easeIn;
				break;
			case 'elasticinout':
				easing = GSAP.Elastic.easeInOut;
				break;
			case 'elasticout':
				easing = GSAP.Elastic.easeOut;
				break;
			case 'bouncein':
				easing = GSAP.Bounce.easeIn;
				break;
			case 'bounceinout':
				easing = GSAP.Bounce.easeInOut;
				break;
			case 'bounceout':
				easing = GSAP.Bounce.easeOut;
				break;
			case 'circin':
				easing = GSAP.Circ.easeIn;
				break;
			case 'circinout':
				easing = GSAP.Circ.easeInOut;
				break;
			case 'circout':
				easing = GSAP.Circ.easeOut;
				break;
			case 'expoin':
				easing = GSAP.Expo.easeIn;
				break;
			case 'expoinout':
				easing = GSAP.Expo.easeInOut;
				break;
			case 'expoout':
				easing = GSAP.Expo.easeOut;
				break;
			case 'sinein':
				easing = GSAP.Sine.easeIn;
				break;
			case 'sineinout':
				easing = GSAP.Sine.easeInOut;
				break;
			case 'sineout':
				easing = GSAP.Sine.easeOut;
				break;
			case 'power0none':
				easing = GSAP.Power0.easeNone;
				break;
			case 'linearin':
			default:
				easing = GSAP.Linear.easeIn;
				break;
		}
		let elapsedTime: number = 0;
		const gap = end - start;
		switch (repeat.toLowerCase()) {
			case 'yoyo':
				return (delta: number): number => {
					elapsedTime += delta * speed;
					const progress = elapsedTime % 2;
					if (progress > 1) {
						return easing(2 - progress) * gap + start;
					} else {
						return easing(progress) * gap + start;
					}
				};
			case 'repeat':
				return (delta: number): number => {
					elapsedTime += delta * speed;
					const progress = elapsedTime % 1;
					return easing(progress) * gap + start;
				};
			default:
				return (delta: number): number => {
					elapsedTime += delta * speed;
					const progress = Math.min(1, elapsedTime);
					return easing(progress) * gap + start;
				};
		}
	}

	/**
	 * Log time seqn of abstract subscribe component
	 */
	private _logTimeSeqn: number = 0;

	/**
	 * Consoles log time
	 * @param key
	 * @param object
	 * @param [repeat]
	 */
	protected consoleLogTime(
		key: string,
		object: any,
		repeat: number = 300
	): void {
		this._logTimeSeqn++;
		if (this._logTimeSeqn % repeat === 0) {
			console.log(key, object);
		}
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
	private _cachedObject3d: THREE_CORE.IObject3D = null;

	/**
	 * Gets object3d
	 */
	protected get object3d(): THREE_CORE.IObject3D {
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
