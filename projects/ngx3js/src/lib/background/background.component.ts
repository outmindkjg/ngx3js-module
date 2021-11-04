import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CssStyle, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * BackgroundComponent
 */
@Component({
	selector: 'ngx3js-background',
	templateUrl: './background.component.html',
	styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent
	extends AbstractSubscribeComponent
	implements OnInit
{
	/**
	 * Input  of background component
	 */
	@Input() public visible: boolean = true;

	/**
	 * Input  of background component
	 */
	@Input() public pseudo: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public transition: string[] = null;

	/**
	 * Input  of background component
	 */
	@Input() public content: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public backgroundColor: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public backgroundAlpha: number = null;

	/**
	 * Input  of background component
	 */
	@Input() public backgroundImage: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public backgroundRepeat: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public backgroundRepeatX: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public backgroundRepeatY: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public backgroundPosition: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public backgroundPositionX: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public backgroundPositionY: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public backgroundSize: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public backgroundSizeX: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public backgroundSizeY: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public backgroundClip: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public padding: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public paddingLeft: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public paddingTop: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public paddingRight: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public paddingBottom: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public margin: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public marginLeft: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public marginTop: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public marginRight: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public marginBottom: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public border: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public borderColor: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public borderStyle: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public borderWidth: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public borderRadius: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public borderLeft: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public borderTop: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public borderRight: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public borderBottom: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public borderImage: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public borderImageSource: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public borderImageSlice: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public borderImageOutset: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public borderImageRepeat: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public borderImageWidth: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public opacity: number = null;

	/**
	 * Input  of background component
	 */
	@Input() public color: string | number = null;

	/**
	 * Input  of background component
	 */
	@Input() public fontFamily: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public fontSize: number = null;

	/**
	 * Input  of background component
	 */
	@Input() public fontStyle: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public fontWeight: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public textAlign: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public textTransform: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public textDecoration: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public letterSpacing: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public textIndent: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public textJustify: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public textSizeAdjust: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public whiteSpace: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public wordBreak: string = null;

	/**
	 * Input  of background component
	 */
	@Input() public wordSpacing: string = null;

	/**
	 * Gets background color
	 * @param [def]
	 * @returns background color
	 */
	private getBackgroundColor(
		def?: string | number
	): THREE.Color | THREE.Vector4 {
		return ThreeUtil.getColorAlphaSafe(
			this.backgroundColor,
			this.backgroundAlpha,
			def
		);
	}

	/**
	 * Gets background repeat
	 * @param [def]
	 * @returns background repeat
	 */
	private getBackgroundRepeat(def?: string): string {
		if (
			ThreeUtil.isNotNull(this.backgroundRepeatX) &&
			ThreeUtil.isNotNull(this.backgroundRepeatX)
		) {
			return this.backgroundRepeatX + ' ' + this.backgroundRepeatY;
		}
		return ThreeUtil.getTypeSafe(this.backgroundRepeat, def);
	}

	/**
	 * Gets background position
	 * @param [def]
	 * @returns background position
	 */
	private getBackgroundPosition(def?: string): string {
		if (
			ThreeUtil.isNotNull(this.backgroundPositionX) &&
			ThreeUtil.isNotNull(this.backgroundPositionY)
		) {
			return this.backgroundPositionX + ' ' + this.backgroundPositionY;
		}
		return ThreeUtil.getTypeSafe(this.backgroundPosition, def);
	}

	/**
	 * Gets background size
	 * @param [def]
	 * @returns background size
	 */
	private getBackgroundSize(def?: string): string {
		if (
			ThreeUtil.isNotNull(this.backgroundSizeX) &&
			ThreeUtil.isNotNull(this.backgroundSizeY)
		) {
			return this.backgroundSizeX + ' ' + this.backgroundSizeY;
		}
		return ThreeUtil.getTypeSafe(this.backgroundSize, def);
	}

	/**
	 * Creates an instance of background component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('background');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.parentNode !== null) {
			if (ThreeUtil.isNotNull(this.cssClazzName)) {
				ThreeUtil.removeCssStyle(this.parentNode, this.cssClazzName);
				this.cssClazzName = null;
			}
			this.parentNode = null;
		}
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
		if (changes && this.cssClazzName) {
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
	 * Parent node of background component
	 */
	private parentNode: HTMLElement = null;

	/**
	 * Sets parent node
	 * @param parentNode
	 */
	public setParentNode(parentNode: HTMLElement) {
		if (this.parentNode !== parentNode) {
			this.parentNode = parentNode;
		}
		this.applyHtmlStyle();
	}

	/**
	 * Gets style
	 * @returns style
	 */
	public getStyle(): CssStyle {
		return {
			content: ThreeUtil.getTypeSafe(this.content),
			transition: ThreeUtil.getTypeSafe(this.transition),
			backgroundColor: this.getBackgroundColor(),
			backgroundImage: ThreeUtil.getTypeSafe(this.backgroundImage),
			backgroundRepeat: this.getBackgroundRepeat(),
			backgroundPosition: this.getBackgroundPosition(),
			backgroundSize: this.getBackgroundSize(),
			backgroundClip: ThreeUtil.getTypeSafe(this.backgroundClip),
			padding: ThreeUtil.getTypeSafe(this.padding),
			paddingLeft: ThreeUtil.getTypeSafe(this.paddingLeft),
			paddingTop: ThreeUtil.getTypeSafe(this.paddingTop),
			paddingRight: ThreeUtil.getTypeSafe(this.paddingRight),
			paddingBottom: ThreeUtil.getTypeSafe(this.paddingBottom),
			margin: ThreeUtil.getTypeSafe(this.margin),
			marginLeft: ThreeUtil.getTypeSafe(this.marginLeft),
			marginTop: ThreeUtil.getTypeSafe(this.marginTop),
			marginRight: ThreeUtil.getTypeSafe(this.marginRight),
			marginBottom: ThreeUtil.getTypeSafe(this.marginBottom),
			border: ThreeUtil.getTypeSafe(this.border),
			borderColor: ThreeUtil.getTypeSafe(this.borderColor),
			borderStyle: ThreeUtil.getTypeSafe(this.borderStyle),
			borderWidth: ThreeUtil.getTypeSafe(this.borderWidth),
			borderRadius: ThreeUtil.getTypeSafe(this.borderRadius),
			borderLeft: ThreeUtil.getTypeSafe(this.borderLeft),
			borderTop: ThreeUtil.getTypeSafe(this.borderTop),
			borderRight: ThreeUtil.getTypeSafe(this.borderRight),
			borderBottom: ThreeUtil.getTypeSafe(this.borderBottom),
			borderImage: ThreeUtil.getTypeSafe(this.borderImage),
			borderImageSource: ThreeUtil.getTypeSafe(this.borderImageSource),
			borderImageSlice: ThreeUtil.getTypeSafe(this.borderImageSlice),
			borderImageOutset: ThreeUtil.getTypeSafe(this.borderImageOutset),
			borderImageRepeat: ThreeUtil.getTypeSafe(this.borderImageRepeat),
			borderImageWidth: ThreeUtil.getTypeSafe(this.borderImageWidth),
			opacity: ThreeUtil.getTypeSafe(this.opacity),
			color: ThreeUtil.getTypeSafe(this.color),
			fontFamily: ThreeUtil.getTypeSafe(this.fontFamily),
			fontSize: ThreeUtil.getTypeSafe(this.fontSize),
			fontStyle: ThreeUtil.getTypeSafe(this.fontStyle),
			fontWeight: ThreeUtil.getTypeSafe(this.fontWeight),
			textAlign: ThreeUtil.getTypeSafe(this.textAlign),
			textTransform: ThreeUtil.getTypeSafe(this.textTransform),
			textDecoration: ThreeUtil.getTypeSafe(this.textDecoration),
			letterSpacing: ThreeUtil.getTypeSafe(this.letterSpacing),
			textIndent: ThreeUtil.getTypeSafe(this.textIndent),
			textJustify: ThreeUtil.getTypeSafe(this.textJustify),
			textSizeAdjust: ThreeUtil.getTypeSafe(this.textSizeAdjust),
			whiteSpace: ThreeUtil.getTypeSafe(this.whiteSpace),
			wordBreak: ThreeUtil.getTypeSafe(this.wordBreak),
			wordSpacing: ThreeUtil.getTypeSafe(this.wordSpacing),
		};
	}

	/**
	 * Applys html style
	 */
	public applyHtmlStyle() {
		if (this.parentNode !== null) {
			if (this.visible && this._needUpdate) {
				this.needUpdate = false;
				const style: CssStyle = this.getStyle();
				this.cssClazzName = ThreeUtil.addCssStyle(
					this.parentNode,
					style,
					this.cssClazzName,
					'background',
					this.pseudo
				);
				super.setObject(this.cssClazzName);
			} else {
				ThreeUtil.toggleCssStyle(this.parentNode, this.cssClazzName, false);
			}
		}
	}

	/**
	 * Css clazz name of background component
	 */
	private cssClazzName: string = null;
}
