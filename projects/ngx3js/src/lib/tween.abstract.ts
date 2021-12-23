import {
	AfterContentInit,
	Component,
	ContentChildren,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	QueryList,
	SimpleChanges
} from '@angular/core';
import * as GSAP from 'gsap';
import { I3JS, NgxThreeUtil } from './interface';
import { NgxAbstractSubscribeComponent } from './subscribe.abstract';
import { NgxTweenComponent } from './tween/tween.component';

/**
 * The Abstract Tween component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AbstractTweenComponent) page for details.
 *
 */
@Component({
	template: '',
})
export class NgxAbstractTweenComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit, OnChanges, AfterContentInit, OnDestroy
{
	/**
	 * Start tween
	 */
	@Input() public tweenStart: boolean = true;

	/**
	 * Content children of abstract tween component
	 */
	@ContentChildren(NgxTweenComponent, { descendants: false }) private tweenList: QueryList<NgxTweenComponent>;

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 *
	 * @param subscribeType
	 */
	ngOnInit(subscribeType?: string): void {
		super.ngOnInit(subscribeType);
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
		if (changes && this.tweenTimer) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(this.tweenList, 'tweenList', 'tween');
		super.ngAfterContentInit();
	}

	/**
	 * Tween target of abstract tween component
	 */
	private tweenTarget: any = null;

	/**
	 * Tween timer of abstract tween component
	 */
	private tweenTimer: GSAP.TimelineLite | GSAP.TimelineMax = null;

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: I3JS.Object3D | any): boolean {
		return super.setParent(parent);
	}

	/**
	 * Sets tween target
	 * @param tweenTarget
	 */
	public setTweenTarget(tweenTarget: any) {
		if (this.tweenTarget !== tweenTarget) {
			this.tweenTarget = tweenTarget;
			this.resetTween();
		}
	}

	/**
	 * Resets tween
	 */
	public resetTween() {
		if (
			NgxThreeUtil.isNotNull(this.tweenTarget) &&
			NgxThreeUtil.isNotNull(this.tweenList) &&
			this.tweenList.length > 0 &&
			this.tweenStart
		) {
			this.tweenTimer = new GSAP.TimelineLite();
			this.tweenList.forEach((tween) => {
				tween.getTween(this.tweenTimer, this.tweenTarget, this);
			});
			this.tweenTimer.play();
		} else if (this.tweenTimer !== null) {
			this.tweenTimer.kill();
			this.tweenTimer = null;
		}
	}
}
