import { Directive, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { I3JS, N3JS, NgxThreeUtil } from './interface';
import { IRendererTimer, TObject3dFunction, TObjectFunction } from './ngx-interface';
import { NgxAbstractObject3dComponent } from './object3d.abstract';

/**
 * NgxAbstractObject3dDirective Abstract
 *
 * @export
 * @abstract
 */
@Directive()
export abstract class NgxAbstractThreeDirective {
	/**
	 * Creates an instance of NgxAbstractObject3dDirective.
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
		if (NgxThreeUtil.isNotNull(this._subscribe[key])) {
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
		if (NgxThreeUtil.isNotNull(this._subscribe[key])) {
			this.unSubscribeRefer(key);
		}
		if (NgxThreeUtil.isNotNull(subscription)) {
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
			NgxThreeUtil.getSubscribe(
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
	protected get object(): I3JS.Object3D {
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

	protected getEasing(type: string, speed: number, repeat: string = 'yoyo', start: number, end: number): I3JS.EasingFunction {
		let easing: I3JS.EasingFunction = null;
		switch (type.toLowerCase()) {
			case 'linearinout':
			case 'linearout':
			case 'linearnone':
				easing = N3JS.Easing.Linear.None;
				break;
			case 'quadin':
				easing = N3JS.Easing.Quadratic.In;
				break;
			case 'quadinout':
				easing = N3JS.Easing.Quadratic.InOut;
				break;
			case 'quadout':
				easing = N3JS.Easing.Quadratic.Out;
				break;
			case 'cubicin':
				easing = N3JS.Easing.Cubic.In;
				break;
			case 'cubicinout':
				easing = N3JS.Easing.Cubic.InOut;
				break;
			case 'cubicout':
				easing = N3JS.Easing.Cubic.Out;
				break;
			case 'quartin':
				easing = N3JS.Easing.Quartic.In;
				break;
			case 'quartinout':
				easing = N3JS.Easing.Quartic.InOut;
				break;
			case 'quartout':
				easing = N3JS.Easing.Quartic.Out;
				break;
			case 'quintin':
				easing = N3JS.Easing.Quintic.In;
				break;
			case 'quintinout':
				easing = N3JS.Easing.Quintic.InOut;
				break;
			case 'quintout':
				easing = N3JS.Easing.Quintic.Out;
				break;
			case 'backin':
				easing = N3JS.Easing.Back.In;
				break;
			case 'backinout':
				easing = N3JS.Easing.Back.InOut;
				break;
			case 'backout':
				easing = N3JS.Easing.Back.Out;
				break;
			case 'elasticin':
				easing = N3JS.Easing.Elastic.In;
				break;
			case 'elasticinout':
				easing = N3JS.Easing.Elastic.InOut;
				break;
			case 'elasticout':
				easing = N3JS.Easing.Elastic.Out;
				break;
			case 'bouncein':
				easing = N3JS.Easing.Bounce.In;
				break;
			case 'bounceinout':
				easing = N3JS.Easing.Bounce.InOut;
				break;
			case 'bounceout':
				easing = N3JS.Easing.Bounce.Out;
				break;
			case 'circin':
				easing = N3JS.Easing.Circular.In;
				break;
			case 'circinout':
				easing = N3JS.Easing.Circular.InOut;
				break;
			case 'circout':
				easing = N3JS.Easing.Circular.Out;
				break;
			case 'expoin':
				easing = N3JS.Easing.Exponential.In;
				break;
			case 'expoinout':
				easing = N3JS.Easing.Exponential.InOut;
				break;
			case 'expoout':
				easing = N3JS.Easing.Exponential.Out;
				break;
			case 'sinein':
				easing = N3JS.Easing.Sinusoidal.In;
				break;
			case 'sineinout':
				easing = N3JS.Easing.Sinusoidal.InOut;
				break;
			case 'sineout':
				easing = N3JS.Easing.Sinusoidal.Out;
				break;
			case 'linearin':
			default:
				easing = N3JS.Easing.Linear.None;
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
	protected consoleLogTime(key: string, object: any, repeat: number = 300): void {
		this._logTimeSeqn++;
		if (this._logTimeSeqn % repeat === 0) {
			console.log(key, object);
		}
	}

	/**
	 * Object3d function of abstract object3d directive
	 */
	protected objectFunction: TObjectFunction = null;

	setObjectFunction(func: TObjectFunction) {
		this.objectFunction = func;
		this.enabled = this.objectFunction !== null;
	}

	/**
	 * Updates abstract directive
	 * @param timer
	 */
	public update(timer: IRendererTimer) {
		if (this.enabled) {
			this.elapsedTime += timer.delta;
			if (this.objectFunction !== null) {
				this.objectFunction(this.object, this.elapsedTime, timer);
			}
		}
	}
}
/**
 * NgxAbstractObject3dDirective Abstract
 *
 * @export
 * @abstract
 */
@Directive()
export abstract class NgxAbstractObject3dDirective extends NgxAbstractThreeDirective {
	/**
	 * Creates an instance of NgxAbstractObject3dDirective.
	 *
	 * @constructor
	 */
	constructor(protected object3dCom: NgxAbstractObject3dComponent) {
		super(object3dCom);
	}

	/**
	 * Cached object3d of abstract object3d directive
	 */
	private _cachedObject3d: I3JS.Object3D = null;

	/**
	 * Gets object3d
	 */
	protected get object3d(): I3JS.Object3D {
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
			NgxThreeUtil.getSubscribe(
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
	protected object3dFunction: TObject3dFunction = null;

	setObject3dFunction(func: TObject3dFunction) {
		this.object3dFunction = func;
		this.enabled = this.object3dFunction !== null;
	}

	/**
	 * Updates abstract object3d directive
	 *
	 * @param timer
	 */
	public update(timer: IRendererTimer) {
		if (this.enabled && this.object3dFunction !== null) {
			super.update(timer);
			this.object3dFunction(this.object3d, this.elapsedTime, timer);
		}
	}
}
