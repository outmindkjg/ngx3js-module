import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { INgxColor } from '../ngx-interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxAbstractTextureComponent } from '../texture.abstract';

/**
 * The Lensflareelement component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLensflareelementComponent) page for details.
 * See the [ngx lensflares](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lensflares) page for a live demo.
 *
 * ```html
 * <ngx3js-mesh [type]="'lensflare'">
 * 	<ngx3js-lensflareelement
 * 		[image]="'textures/lensflare/lensflare0.png'"
 * 		[size]="700" [distance]="0" [color]="light.color"
 * 	></ngx3js-lensflareelement>
 * 	<ngx3js-lensflareelement
 * 		[image]="'textures/lensflare/lensflare3.png'"
 * 		[size]="60" [distance]="0.6"
 * 	></ngx3js-lensflareelement>
 * 	<ngx3js-lensflareelement
 * 		[image]="'textures/lensflare/lensflare3.png'"
 * 		[size]="70" [distance]="0.7"
 * 	></ngx3js-lensflareelement>
 * 	<ngx3js-lensflareelement
 * 		[image]="'textures/lensflare/lensflare3.png'"
 * 		[size]="120" [distance]="0.9"
 * 	></ngx3js-lensflareelement>
 * 	<ngx3js-lensflareelement
 * 		[image]="'textures/lensflare/lensflare3.png'"
 * 		[size]="70" [distance]="1"
 * 	></ngx3js-lensflareelement>
 * </ngx3js-mesh>
 * ```
 * @see LensflareElement
 */
@Component({
	selector: 'ngx3js-lensflareelement',
	templateUrl: './lensflareelement.component.html',
	styleUrls: ['./lensflareelement.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxLensflareelementComponent),
		},
	],
})
export class NgxLensflareelementComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit
{
	/**
	 * image of LensflareElement
	 */
	@Input() public image: string = null;

	/**
	 * size of LensflareElement
	 */
	@Input() public size: number = null;

	/**
	 * distance of LensflareElement
	 */
	@Input() public distance: number = null;

	/**
	 * color of LensflareElement
	 */
	@Input() public color: INgxColor = null;

	/**
	 * Creates an instance of LensflareElement.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('lensflareelement');
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
		if (changes && this.lensflare) {
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
	 * Gets texture
	 * @returns texture
	 */
	public getTexture(): I3JS.Texture {
		return NgxAbstractTextureComponent.getTextureImage(
			NgxThreeUtil.getTypeSafe(this.image)
		);
	}

	/**
	 * Lensflare element of LensflareElement
	 */
	private lensflareElement: I3JS.LensflareElement = null;

	/**
	 * The Lensflare of LensflareElement
	 */
	private lensflare: I3JS.Lensflare = null;

	/**
	 * Sets lensflare
	 * @param lensflare
	 */
	public setLensflare(lensflare: I3JS.Lensflare) {
		if (this.lensflare !== lensflare) {
			this.lensflare = lensflare;
			this.lensflare.addElement(this.getLensflareElement());
		}
	}

	/**
	 * Gets lensflare element
	 * @returns lensflare element
	 */
	public getLensflareElement(): I3JS.LensflareElement {
		if (this.lensflareElement === null || this._needUpdate) {
			this.needUpdate = false;
			this.lensflareElement = new N3JS.LensflareElement(
				this.getTexture(),
				NgxThreeUtil.getTypeSafe(this.size, 100),
				NgxThreeUtil.getTypeSafe(this.distance, 0),
				NgxThreeUtil.getColorSafe(this.color)
			);
			super.setObject(this.lensflareElement);
		}
		return this.lensflareElement;
	}
}
