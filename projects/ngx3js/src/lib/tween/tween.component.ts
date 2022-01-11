import { Component, EventEmitter, forwardRef, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgxThreeUtil, I3JS, N3JS } from '../interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * Tween Component
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTweenComponent) page for details.
 *
 * ```html
 * <ngx3js-tween
 * 	[easing]="'power4.easein'" [targets]="'position'"
 * 	(onLoad)="setLightTween($event)"
 * ></ngx3js-tween>
 * <ngx3js-tween
 * 	[easing]="'power4.easein'"
 * 	(onLoad)="setLightTween($event)"
 * ></ngx3js-tween>
 * ```
 */
@Component({
	selector: 'ngx3js-tween',
	templateUrl: './tween.component.html',
	styleUrls: ['./tween.component.scss'],
})
export class NgxTweenComponent implements OnInit {
	/**
	 * The targets of tween component
	 */
	@Input() public targets: string = null;

	/**
	 * The to of tween component
	 */
	@Input() public to: any = null;

	/**
	 * The duration of tween component
	 */
	@Input() public duration: number = null;

	/**
	 * The Input of tween component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public easing: string = null;

	/**
	 * The template of tween component
	 */
	@Input() public template: string = null;

	/**
	 * The repeat of tween component
	 */
	@Input() public repeat: number = null;

	/**
	 * The yoyo of tween component
	 */
	@Input() public yoyo: boolean = null;

	/**
	 * The overshoot of tween component
	 */
	@Input() public overshoot: number = null;

	/**
	 * The amplitude of tween component
	 */
	@Input() public amplitude: number = null;

	/**
	 * The period of tween component
	 */
	@Input() public period: number = null;

	/**
	 * The linearRatio of tween component
	 */
	@Input() public linearRatio: number = null;

	/**
	 * The power of tween component
	 */
	@Input() public power: number = null;

	/**
	 * The yoyoMode of tween component
	 */
	@Input() public yoyoMode: boolean = null;

	/**
	 * The steps of tween component
	 */
	@Input() public steps: number = null;

	/**
	 * Will be called when load completes. The argument will be the loaded self
	 */
	@Output() public onLoad: EventEmitter<this> = new EventEmitter<this>();

	/**
	 * The steps of tween component
	 */
	@Input() public events: string = null;

	/**
	 * Output  of ngx tween component
	 */
	@Output() public onTweenEvent: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * Gets duration
	 * @param [def]
	 * @returns duration
	 */
	private getDuration(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.duration, def, 3);
	}

	/**
	 * Gets repeat
	 * @param [def]
	 * @returns repeat
	 */
	private getRepeat(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.repeat, def, 1);
	}

	/**
	 * Gets yoyo
	 * @param [def]
	 * @returns true if yoyo
	 */
	private getYoyo(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.yoyo, def, false);
	}

	/**
	 * Gets overshoot
	 * @param [def]
	 * @returns overshoot
	 */
	private getOvershoot(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.overshoot, def, 1);
	}

	/**
	 * Gets amplitude
	 * @param [def]
	 * @returns amplitude
	 */
	private getAmplitude(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.amplitude, def, 1);
	}

	/**
	 * Gets period
	 * @param [def]
	 * @returns period
	 */
	private getPeriod(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.period, def, 1);
	}

	/**
	 * Gets linear ratio
	 * @param [def]
	 * @returns linear ratio
	 */
	private getLinearRatio(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.linearRatio, def, 1);
	}

	/**
	 * Gets power
	 * @param [def]
	 * @returns power
	 */
	private getPower(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.power, def, 1);
	}

	/**
	 * Gets yoyo mode
	 * @param [def]
	 * @returns true if yoyo mode
	 */
	private getYoyoMode(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.yoyoMode, def, false);
	}

	/**
	 * Gets steps
	 * @param [def]
	 * @returns steps
	 */
	private getSteps(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.steps, def, 12);
	}

	/**
	 * Gets easing
	 * @param [def]
	 * @param [isTemplate]
	 * @returns easing
	 */
	private getEasing(def?: string, isTemplate?: boolean): I3JS.EasingFunction {
		const easing = isTemplate
			? NgxThreeUtil.getTypeSafe(this.template, def, '')
			: NgxThreeUtil.getTypeSafe(this.easing, def, '');
		switch (easing.toLowerCase()) {
			case 'back':
			case 'back.easein':
				return N3JS.Easing.Back.In;
			case 'back.easeinout':
				return N3JS.Easing.Back.InOut;
			case 'back.easeout':
				return N3JS.Easing.Back.Out;
			case 'elastic':
			case 'elastic.easein':
				return N3JS.Easing.Elastic.In;
			case 'elastic.easeinout':
				return N3JS.Easing.Elastic.InOut;
			case 'elastic.easeout':
				return N3JS.Easing.Elastic.Out;
			case 'bounce':
			case 'bounce.easein':
				return N3JS.Easing.Bounce.In;
			case 'bounce.easeinout':
				return N3JS.Easing.Bounce.InOut;
			case 'bounce.easeout':
				return N3JS.Easing.Bounce.Out;
			case 'circ':
			case 'circ.easein':
				return N3JS.Easing.Circular.In;
			case 'circ.easeinout':
				return N3JS.Easing.Circular.InOut;
			case 'circ.easeout':
				return N3JS.Easing.Circular.Out;
			case 'expo':
			case 'expo.easein':
				return N3JS.Easing.Exponential.In;
			case 'expo.easeinout':
				return N3JS.Easing.Exponential.InOut;
			case 'expo.easeout':
				return N3JS.Easing.Exponential.Out;
			case 'sine':
			case 'sine.easein':
				return N3JS.Easing.Sinusoidal.In;
			case 'sine.easeinout':
				return N3JS.Easing.Sinusoidal.InOut;
			case 'sine.easeout':
				return N3JS.Easing.Sinusoidal.Out;
			default:
				return N3JS.Easing.Linear.None;
		}
	}

	/**
	 * Gets targets
	 * @param target
	 * @param [def]
	 * @returns targets
	 */
	private getTargets(target: any, def?: string): any {
		const key = NgxThreeUtil.getTypeSafe(this.targets, def, null);
		if (NgxThreeUtil.isNotNull(key) && NgxThreeUtil.isNotNull(target[key])) {
			return target[key];
		}
		return target;
	}

	/**
	 * Gets to
	 * @param [def]
	 * @returns to
	 */
	private getTo(def?: any): any {
		const to = NgxThreeUtil.getTypeSafe(this.to, def, {});
		const result: { [key: string]: any } = {};
		Object.entries(to).forEach(([key, value]) => {
			switch (key) {
				default:
					result[key] = value;
					break;
			}
		});
		return result;
	}

	/**
	 * Creates an instance of tween component.
	 */
	constructor() {}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this._tween !== null) {
			this._tween.stop();
			if (this._tweenGroup !== null) {
				this._tweenGroup.remove(this._tween);
			}
			this._tween = null;
		}
		if (this.parentEle !== null) {
			this.parentEle = null;
		}
		if (this._tweenTarget !== null) {
			this._tweenTarget = null;
		}
		if (this._tweenGroup !== null) {
			this._tweenGroup = null;
		}
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {}

	/**
	 * Parent ele of tween component
	 */
	private parentEle: any = null;

	/**
	 * Tween target of tween component
	 */
	private _tweenTarget: any = null;

	/**
	 * Tween group of ngx tween component
	 */
	private _tweenGroup: I3JS.TweenGroup = null;

	/**
	 * The Tween of tween component
	 */
	private _tween: I3JS.Tween = null;

	/**
	 * Sets tween
	 * @param to
	 * @param [duration]
	 * @returns tween
	 */
	public setTween(to: any, duration?: number): any {
		if (NgxThreeUtil.isNotNull(to) && this._tweenGroup !== null) {
			if (this._tween !== null) {
				this._tween.stop();
				this._tweenGroup.remove(this._tween);
			}
			const targets = this.getTargets(this._tweenTarget, null);
			this._tween = new N3JS.Tween(targets, this._tweenGroup).to(to);
			if (NgxThreeUtil.isNotNull(this.duration)) {
				this._tween.duration(this.getDuration() * 1000);
			} else if (NgxThreeUtil.isNotNull(duration)) {
				this._tween.duration(duration * 1000);
			}
			if (NgxThreeUtil.isNotNull(this.yoyo)) {
				this._tween.yoyo(this.getYoyo());
			}
			if (NgxThreeUtil.isNotNull(this.repeat)) {
				this._tween.repeat(this.getRepeat());
			}
			if (NgxThreeUtil.isNotNull(this.easing)) {
				this._tween.easing(this.getEasing());
			}
			if (NgxThreeUtil.isNotNull(this.events)) {
				this.events.split(',').forEach((event) => {
					switch (event.toLowerCase()) {
						case 'update':
							this._tween.onUpdate(() => {
								this.onTweenEvent.emit('update');
							});
							break;
						case 'start':
							this._tween.onStart(() => {
								this.onTweenEvent.emit('start');
							});
							break;
						case 'stop':
							this._tween.onStop(() => {
								this.onTweenEvent.emit('stop');
							});
							break;
						case 'complete':
							this._tween.onComplete(() => {
								this.onTweenEvent.emit('complete');
							});
							break;
						case 'repeat':
							this._tween.onRepeat(() => {
								this.onTweenEvent.emit('repeat');
							});
							break;
					}
				});
			}
			this._tween.start();
		}
	}

	/**
	 * Gets tween
	 * @param tween
	 * @param tweenTarget
	 * @param parentEle
	 * @returns tween
	 */
	public setTweenGroup(tweenGroup: I3JS.TweenGroup) {
		if (this._tweenGroup !== tweenGroup) {
			this._tweenGroup = tweenGroup;
			if (this._tweenTarget !== null && this.parentEle !== null) {
				this.getTween(this._tweenTarget, this.parentEle);
			}
		}
	}

	/**
	 * Gets tween
	 * @param tween
	 * @param tweenTarget
	 * @param parentEle
	 * @returns tween
	 */
	public getTween(tweenTarget: any, parentEle: any) {
		this.parentEle = parentEle;
		this._tweenTarget = tweenTarget;
		if (this._tweenGroup !== null) {
			if (NgxThreeUtil.isNotNull(this.to)) {
				this.setTween(this.getTo(), this.getDuration());
			}
			this.onLoad.emit(this);
		}
	}
}
