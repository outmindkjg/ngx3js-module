import {
	AfterContentInit,
	Component, forwardRef, Input,
	OnInit,
	SimpleChanges
} from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * The Size component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSizeComponent) page for details.
 *
 * ```html
 * <ngx3js-size #renderSize [width]="'100%'" [height]="'100%'"></ngx3js-size>
 * <ngx3js-size #renderSize></ngx3js-size>
 * ```
 */
@Component({
	selector: 'ngx3js-size',
	templateUrl: './size.component.html',
	styleUrls: ['./size.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxSizeComponent),
		},
	],
})
export class NgxSizeComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit, AfterContentInit
{
	/**
	 * The size of width
	 * - type number
	 *  fixed size
	 * - type string with include %
	 *  relative size from renderer size
	 *  for example
	 *    in case renderer = 1024
	 *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
	 */
	@Input() public width: number | string = '100%';

	/**
	 * The size of height
	 * - type number
	 *  fixed size
	 * - type string with include %
	 *  relative size from renderer size
	 *  for example
	 *    in case renderer = 1024
	 *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
	 */
	@Input() public height: number | string = '100%';

	/**
	 * Creates an instance of shared component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('size');
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
		if (changes) {
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
	 * Gets width
	 * @param [def]
	 * @returns width
	 */
	private getWidth(def?: number | string): number {
		return this.getViewPortSize(this.width, this.rendererWidth, def);
	}

	/**
	 * Gets height
	 * @param [def]
	 * @returns height
	 */
	private getHeight(def?: number | string): number {
		return this.getViewPortSize(this.height, this.rendererHeight, def);
	}

	/**
	 * Gets view port size
	 * @param size
	 * @param cameraSize
	 * @param [def]
	 * @returns view port size
	 */
	private getViewPortSize(
		size: number | string,
		cameraSize: number,
		def?: number | string
	): number {
		const baseSize = NgxThreeUtil.getTypeSafe(size, def);
		if (NgxThreeUtil.isNotNull(baseSize)) {
			if (typeof baseSize == 'string') {
				if (baseSize.indexOf('%') > 0) {
					const [percent, extra] = baseSize.split('%');
					const viewSize = Math.ceil((cameraSize * parseFloat(percent)) / 100);
					if (extra === '') {
						return viewSize;
					} else {
						return viewSize + parseInt(extra);
					}
				} else {
					switch (baseSize) {
						case 'width':
							return this.getWidth(def);
						case 'height':
							return this.getHeight(def);
						default:
							return parseFloat(baseSize);
					}
				}
			} else {
				return baseSize;
			}
		}
		return 0;
	}

	/**
	 * Size width of size component
	 */
	private rendererWidth: number = 1024;

	/**
	 * Size height of size component
	 */
	private rendererHeight: number = 1024;

	/**
	 * Size pixelRatio of size component
	 */
	private sizePixelRatio: number = 1;

	/**
	 * Sets size size
	 * @param width
	 * @param height
	 */
	public setRendererSize(
		width: number,
		height: number,
		pixelRatio: number = 1
	) {
		this.rendererWidth = width;
		this.rendererHeight = height;
		this.sizePixelRatio = pixelRatio;
		this.needUpdate = true;
	}

	private size: I3JS.Vector2 = null;

	/**
	 * Applys changes3d
	 * @param changes
	 */
	public applyChanges(changes: string[]) {
		if (this.size !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getSize();
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, ['width', 'height'])) {
				this.needUpdate = true;
				return;
			}
		}
		super.applyChanges(changes);
	}

	/**
	 * Gets object
	 * @returns object
	 */
	public getObject<T>(): T {
		return this.getSize() as any;
	}

	public getSize(): I3JS.Vector2 {
		if (this.size === null || this._needUpdate) {
			this.needUpdate = false;
			this.size = new N3JS.Vector2(this.getWidth(), this.getHeight());
			if (this.sizePixelRatio !== 1) {
				this.size.multiplyScalar(this.sizePixelRatio);
			}
			this.setObject(this.size);
		}
		return this.size;
	}
}
