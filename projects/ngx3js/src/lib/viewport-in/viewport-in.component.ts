import {
	Component,
	HostListener,
	ElementRef,
	OnInit,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';

/**
 * Component
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxViewportInComponent) page for details.
 *
 */
@Component({
	selector: 'ngx3js-viewport-in',
	templateUrl: './viewport-in.component.html',
	styleUrls: ['./viewport-in.component.scss'],
})
export class NgxViewportInComponent implements OnInit, OnChanges {
	@Input() public scrollEle: Element = null;

	@Input() public isRepeat: boolean = false;

	@Input() public scrollRate: number = 0.7;

	/**
	 * Creates an instance of chart axes component.
	 */
	constructor(private el: ElementRef) {}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		this.setScrollEvent(this.scrollEle || window);
	}

	/**
	 * on changes
	 *
	 * @param changes
	 */
	ngOnChanges(changes: SimpleChanges): void {
		this.setScrollEvent(this.scrollEle || window);
	}

	/**
	 * on destroy
	 */
	ngOnDestroy(): void {
		if (this._lastScrollObj !== null) {
			this.setScrollEvent(null);
		}
	}

	/**
	 * Last scroll obj of ngx viewport in component
	 */
	private _lastScrollObj: Element | Window = null;

	/**
	 * Last scroll event of ngx viewport in component
	 */
	private _lastScrollEvent: EventListener = null;

	/**
	 * Sets scroll event
	 *
	 * @param ele
	 */
	private setScrollEvent(ele: Element | Window) {
		if (ele === null) {
			if (this._lastScrollObj !== null) {
				this._lastScrollObj.removeEventListener(
					'scroll',
					this._lastScrollEvent
				);
				this._lastScrollObj = null;
			}
		} else if (this._lastScrollObj !== ele) {
			if (this._lastScrollObj !== null) {
				this._lastScrollObj.removeEventListener(
					'scroll',
					this._lastScrollEvent
				);
				this._lastScrollObj = null;
			}
			if (this._lastScrollEvent === null) {
				this._lastScrollEvent = () => {
					this.isVisible = this.isElementInViewport(
						this.el.nativeElement,
						this._lastScrollObj
					);
					if (!this.isRepeat && this.isVisible) {
						this.setScrollEvent(null);
					}
				};
			}
			this._lastScrollObj = ele;
			ele.addEventListener('scroll', this._lastScrollEvent);
			this._lastScrollEvent(null);
		}
	}

	/**
	 * Determines whether element in viewport is
	 *
	 * @param el
	 * @param scrollObj
	 * @returns true if element in viewport
	 */
	private isElementInViewport(
		el: HTMLElement,
		scrollObj: Element | Window
	): boolean {
		const rect = el.getBoundingClientRect();
		const scrollSize: {
			clientHeight: number;
			clientWidth: number;
		} = {
			clientHeight: 0,
			clientWidth: 0,
		};
		if (scrollObj instanceof Window) {
			scrollSize.clientWidth = scrollObj.innerWidth;
			scrollSize.clientHeight = scrollObj.innerHeight;
		} else {
			scrollSize.clientWidth = scrollObj.clientWidth;
			scrollSize.clientHeight = scrollObj.clientHeight;
		}
		return (
			rect.top >= 0 &&
			rect.top + (rect.bottom - rect.top) * this.scrollRate <=
				(scrollSize.clientHeight || document.documentElement.clientHeight)
		);
	}

	/**
	 * Determines whether visible is
	 */
	public isVisible: boolean = false;
}
