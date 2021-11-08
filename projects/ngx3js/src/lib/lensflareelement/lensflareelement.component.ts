import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import {
	Lensflare,
	LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';
import { ThreeColor, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { AbstractTextureComponent } from '../texture.abstract';

/**
 * LensflareelementComponent
 *
 * ```html
 * <ngx3js-mesh [type]="'lensflare'">
 * 	<ngx3js-lensflareelement
 * 		[image]="'textures/lensflare/lensflare0.png'"
 * 		[size]="700"
 * 		[distance]="0"
 * 		[color]="light.color"
 * 	></ngx3js-lensflareelement>
 * 	<ngx3js-lensflareelement
 * 		[image]="'textures/lensflare/lensflare3.png'"
 * 		[size]="60"
 * 		[distance]="0.6"
 * 	></ngx3js-lensflareelement>
 * 	<ngx3js-lensflareelement
 * 		[image]="'textures/lensflare/lensflare3.png'"
 * 		[size]="70"
 * 		[distance]="0.7"
 * 	></ngx3js-lensflareelement>
 * 	<ngx3js-lensflareelement
 * 		[image]="'textures/lensflare/lensflare3.png'"
 * 		[size]="120"
 * 		[distance]="0.9"
 * 	></ngx3js-lensflareelement>
 * 	<ngx3js-lensflareelement
 * 		[image]="'textures/lensflare/lensflare3.png'"
 * 		[size]="70"
 * 		[distance]="1"
 * 	></ngx3js-lensflareelement>
 * </ngx3js-mesh>
 * ```
 * @see LensflareElement
 */
@Component({
	selector: 'ngx3js-lensflareelement',
	templateUrl: './lensflareelement.component.html',
	styleUrls: ['./lensflareelement.component.scss'],
})
export class LensflareelementComponent
	extends AbstractSubscribeComponent
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
	@Input() public color: ThreeColor = null;

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
	public getTexture(): THREE.Texture {
		return AbstractTextureComponent.getTextureImage(
			ThreeUtil.getTypeSafe(this.image)
		);
	}

	/**
	 * Lensflare element of LensflareElement
	 */
	private lensflareElement: LensflareElement = null;

	/**
	 * The Lensflare of LensflareElement
	 */
	private lensflare: Lensflare = null;

	/**
	 * Sets lensflare
	 * @param lensflare
	 */
	public setLensflare(lensflare: Lensflare) {
		if (this.lensflare !== lensflare) {
			this.lensflare = lensflare;
			this.lensflare.addElement(this.getLensflareElement());
		}
	}

	/**
	 * Gets lensflare element
	 * @returns lensflare element
	 */
	public getLensflareElement(): LensflareElement {
		if (this.lensflareElement === null || this._needUpdate) {
			this.needUpdate = false;
			this.lensflareElement = new LensflareElement(
				this.getTexture(),
				ThreeUtil.getTypeSafe(this.size, 100),
				ThreeUtil.getTypeSafe(this.distance, 0),
				ThreeUtil.getColorSafe(this.color)
			);
			super.setObject(this.lensflareElement);
		}
		return this.lensflareElement;
	}
}
