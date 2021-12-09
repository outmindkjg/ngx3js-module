import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CssStyle, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import * as THREE_CORE from './../threejs-library/three-core';

/**
 * The Background component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BackgroundComponent) page for details.
 *
 * The background shorthand CSS property sets all background style properties at once, such as color, image, origin and size, or repeat method.
 *
 * @see [MDN Web Docs - background](https://developer.mozilla.org/en-US/docs/Web/CSS/background)
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
	 * The visible of background component
	 */
	@Input() public visible: boolean = true;

	/**
	 * The pseudo of background component
	 */
	@Input() public pseudo: string = null;

	/**
	 * The transition of background component
	 */
	@Input() public transition: string[] = null;

	/**
	 * The content of background component
	 */
	@Input() public content: string = null;

	/**
	 * The background-color CSS property sets the background color of an element.
	 */
	@Input() public backgroundColor: string | number = null;

	/**
	 * The background-color CSS property sets the background color alpha of an element.
	 */
	@Input() public backgroundAlpha: number = null;

	/**
	 * The background-image CSS property sets one or more background images on an element.
	 */
	@Input() public backgroundImage: string = null;

	/**
	 * The background-repeat CSS property sets how background images are repeated. A background image can be repeated along the horizontal and vertical axes, or not repeated at all.
	 */
	@Input() public backgroundRepeat: string = null;

	/**
	 * The background-repeat CSS property sets how background images are repeated. A background image can be repeated along the horizontal and vertical axes, or not repeated at all.
	 */
	@Input() public backgroundRepeatX: string = null;

	/**
	 * The background-repeat CSS property sets how background images are repeated. A background image can be repeated along the horizontal and vertical axes, or not repeated at all.
	 */
	@Input() public backgroundRepeatY: string = null;

	/**
	 * The background-position CSS property sets the initial position for each background image. The position is relative to the position layer set by background-origin.
	 */
	@Input() public backgroundPosition: string = null;

	/**
	 * The background-position CSS property sets the initial position for each background image. The position is relative to the position layer set by background-origin.
	 */
	@Input() public backgroundPositionX: string = null;

	/**
	 * The background-position CSS property sets the initial position for each background image. The position is relative to the position layer set by background-origin.
	 */
	@Input() public backgroundPositionY: string = null;

	/**
	 * The background-size CSS property sets the size of the element's background image. The image can be left to its natural size, stretched, or constrained to fit the available space.
	 */
	@Input() public backgroundSize: string = null;

	/**
	 * The background-size CSS property sets the size of the element's background image. The image can be left to its natural size, stretched, or constrained to fit the available space.
	 */
	@Input() public backgroundSizeX: string = null;

	/**
	 * The background-size CSS property sets the size of the element's background image. The image can be left to its natural size, stretched, or constrained to fit the available space.
	 */
	@Input() public backgroundSizeY: string = null;

	/**
	 * The background-clip CSS property sets whether an element's background extends underneath its border box, padding box, or content box.
	 */
	@Input() public backgroundClip: string = null;

	/**
	 * The padding CSS shorthand property sets the padding area on all four sides of an element at once.
	 */
	@Input() public padding: string | number = null;

	/**
	 * The padding-left CSS property sets the width of the padding area to the left of an element.
	 */
	@Input() public paddingLeft: string | number = null;

	/**
	 * The padding-top CSS property sets the height of the padding area on the top of an element.
	 */
	@Input() public paddingTop: string | number = null;

	/**
	 * The padding-right CSS property sets the width of the padding area on the right of an element.
	 */
	@Input() public paddingRight: string | number = null;

	/**
	 * The padding-right CSS property sets the width of the padding area on the bottom of an element.
	 */
	@Input() public paddingBottom: string | number = null;

	/**
	 * The margin CSS shorthand property sets the margin area on all four sides of an element.
	 */
	@Input() public margin: string | number = null;

	/**
	 * The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
	 */
	@Input() public marginLeft: string | number = null;

	/**
	 * The margin-top CSS property sets the margin area on the top of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
	 */
	@Input() public marginTop: string | number = null;

	/**
	 * The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
	 */
	@Input() public marginRight: string | number = null;

	/**
	 * The margin-bottom CSS property sets the margin area on the bottom of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
	 */
	@Input() public marginBottom: string | number = null;

	/**
	 * The border shorthand CSS property sets an element's border. It sets the values of border-width, border-style, and border-color.
	 */
	@Input() public border: string | number = null;

	/**
	 * The border-color shorthand CSS property sets the color of an element's border.
	 */
	@Input() public borderColor: string | number = null;

	/**
	 * The border-style shorthand CSS property sets the line style for all four sides of an element's border.
	 */
	@Input() public borderStyle: string = null;

	/**
	 * The border-width shorthand CSS property sets the width of an element's border.
	 */
	@Input() public borderWidth: string | number = null;

	/**
	 * The border-radius CSS property rounds the corners of an element's outer border edge. You can set a single radius to make circular corners, or two radii to make elliptical corners.
	 */
	@Input() public borderRadius: string | number = null;

	/**
	 * The border-left shorthand CSS property sets all the properties of an element's left border.
	 */
	@Input() public borderLeft: string | number = null;

	/**
	 * The border-top shorthand CSS property sets all the properties of an element's top border.
	 */
	@Input() public borderTop: string | number = null;

	/**
	 * The border-right shorthand CSS property sets all the properties of an element's right border.
	 */
	@Input() public borderRight: string | number = null;

	/**
	 * The border-bottom shorthand CSS property sets an element's bottom border. It sets the values of border-bottom-width, border-bottom-style and border-bottom-color.
	 */
	@Input() public borderBottom: string | number = null;

	/**
	 * The border-image CSS property draws an image around a given element. It replaces the element's regular border.
	 */
	@Input() public borderImage: string = null;

	/**
	 * The border-image-source CSS property sets the source image used to create an element's border image.
	 */
	@Input() public borderImageSource: string = null;

	/**
	 * The border-image-slice CSS property divides the image specified by border-image-source into regions. These regions form the components of an element's border image.
	 */
	@Input() public borderImageSlice: string | number = null;

	/**
	 * The border-image-outset CSS property sets the distance by which an element's border image is set out from its border box.
	 * The parts of the border image that are rendered outside the element's border box with border-image-outset do not trigger overflow scrollbars and don't capture mouse events.
	 */
	@Input() public borderImageOutset: string | number = null;

	/**
	 * The border-image-repeat CSS property defines how the edge regions of a source image are adjusted to fit the dimensions of an element's border image.
	 */
	@Input() public borderImageRepeat: string = null;

	/**
	 * The border-image-width CSS property sets the width of an element's border image.
	 */
	@Input() public borderImageWidth: string | number = null;

	/**
	 * The opacity CSS property sets the opacity of an element. Opacity is the degree to which content behind an element is hidden, and is the opposite of transparency.
	 */
	@Input() public opacity: number = null;

	/**
	 * The color CSS property sets the foreground color value of an element's text and text decorations, and sets the <currentcolor> value. currentcolor may be used as an indirect value on other properties and is the default for other color properties, such as border-color.
	 */
	@Input() public color: string | number = null;

	/**
	 * The font-family CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
	 */
	@Input() public fontFamily: string = null;

	/**
	 * The font-size CSS property sets the size of the font. Changing the font size also updates the sizes of the font size-relative <length> units, such as em, ex, and so forth.
	 */
	@Input() public fontSize: number = null;

	/**
	 * The font-style CSS property sets whether a font should be styled with a normal, italic, or oblique face from its font-family.
	 */
	@Input() public fontStyle: string = null;

	/**
	 * The font-weight CSS property sets the weight (or boldness) of the font. The weights available depend on the font-family that is currently set.
	 */
	@Input() public fontWeight: string = null;

	/**
	 * The text-align CSS property sets the horizontal alignment of the content inside a block element or table-cell box. This means it works like vertical-align but in the horizontal direction.
	 */
	@Input() public textAlign: string = null;

	/**
	 * The text-transform CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby.
	 */
	@Input() public textTransform: string = null;

	/**
	 * The text-decoration shorthand CSS property sets the appearance of decorative lines on text. It is a shorthand for text-decoration-line, text-decoration-color, text-decoration-style, and the newer text-decoration-thickness property.
	 */
	@Input() public textDecoration: string = null;

	/**
	 * The letter-spacing CSS property sets the horizontal spacing behavior between text characters. This value is added to the natural spacing between characters while rendering the text. Positive values of letter-spacing causes characters to spread farther apart, while negative values of letter-spacing bring characters closer together.
	 */
	@Input() public letterSpacing: string = null;

	/**
	 * The text-indent CSS property sets the length of empty space (indentation) that is put before lines of text in a block.
	 */
	@Input() public textIndent: string = null;

	/**
	 * The text-justify CSS property sets what type of justification should be applied to text when text-align: justify; is set on an element.
	 */
	@Input() public textJustify: string = null;

	/**
	 * The text-size-adjust CSS property controls the text inflation algorithm used on some smartphones and tablets. Other browsers will ignore this property.
	 */
	@Input() public textSizeAdjust: string = null;

	/**
	 * The white-space CSS property sets how white space inside an element is handled.
	 */
	@Input() public whiteSpace: string = null;

	/**
	 * The word-break CSS property sets whether line breaks appear wherever the text would otherwise overflow its content box.
	 */
	@Input() public wordBreak: string = null;

	/**
	 * The word-spacing CSS property sets the length of space between words and between tags.
	 */
	@Input() public wordSpacing: string = null;

	/**
	 * The background-color CSS property sets the background color of an element.
	 * @param [def]
	 * @returns background color
	 */
	private getBackgroundColor(
		def?: string | number
	): THREE_CORE.IColor | THREE_CORE.IVector4 {
		return ThreeUtil.getColorAlphaSafe(
			this.backgroundColor,
			this.backgroundAlpha,
			def
		);
	}

	/**
	 * The background-repeat CSS property sets how background images are repeated. A background image can be repeated along the horizontal and vertical axes, or not repeated at all.
	 *
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
	 * The background-position CSS property sets the initial position for each background image. The position is relative to the position layer set by background-origin.
	 *
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
	 * The background-size CSS property sets the size of the element's background image. The image can be left to its natural size, stretched, or constrained to fit the available space.
	 *
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
