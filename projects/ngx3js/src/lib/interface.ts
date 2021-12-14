import { AfterViewInit, Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import * as Ammo from './threejs-library/ammo-type';
import * as CHROMA from 'chroma-js';
import { Observable, Subscription } from 'rxjs';
import { CameraComponent } from './camera/camera.component';
import { MeshComponent } from './mesh/mesh.component';
import { RendererComponent } from './renderer/renderer.component';
import { SceneComponent } from './scene/scene.component';
import { GUI } from './threejs-library/lil-gui';
import * as I3JS from './threejs-library/three-interface';
import * as N3JS from './threejs-library/three-core';
export { I3JS, N3JS };

/**
 * Apply matrix4
 */
export interface ApplyMatrix4 {
	/**
	 * applyMatrix4
	 * @param matrix
	 * @returns matrix4
	 */
	applyMatrix4(matrix: I3JS.IMatrix4): any;
}

/**
 * Curves parameters
 */
export interface CurvesParameters {
	/** radiusInner */
	radiusInner?: number;

	/** waveH */
	waveH?: number;

	/** waveR */
	waveR?: number;

	/** rateX */
	rateX?: number;

	/** rateY */
	rateY?: number;

	/** rateZ */
	rateZ?: number;
}

/**
 * Texture option
 */
export interface TextureOption {
	/** The texture type */
	type: string;

	/** The texture value */
	value: string;

	/** The texture options */
	options?: string;

	/** The cube image url */
	cubeImage?: string[];
}

/**
 * Storage option
 */
export interface StorageOption {
	/** path */
	path?: string;

	/** autoCenter */
	autoCenter?: boolean;

	/** debugName */
	debugName?: boolean;

	/** debug */
	debug?: boolean;

	/** firstMesh */
	firstMesh?: boolean;

	/** name */
	name?: string;

	/** scale */
	scale?: number;

	/** material */
	material?: string;

	/** The resource path */
	resourcePath?: string;

	/** Use Darco */
	useDraco?: boolean;

	/** Use Ktx2 */
	useKtx2?: boolean;

	/** vmdUrl */
	vmdUrl?: string | string[];

	/** ref object */
	object?: I3JS.ISkinnedMesh | I3JS.ICamera | any;

	/** drawFillShapes */
	drawFillShapes?: boolean;

	/** drawStrokes */
	drawStrokes?: boolean;

	/** fillShapesWireframe */
	fillShapesWireframe?: boolean;

	/** strokesWireframe */
	strokesWireframe?: boolean;

	/** type */
	type?: string;

	/** baseUrl */
	baseUrl?: string;

	/** body */
	body?: any;

	/** cssType */
	cssType?: string;

	/** geometry */
	geometry?: boolean;

	/** loaderType */
	loaderType?: string;

	/** quality */
	quality?: number;

	/** dataType */
	dataType?: any;
}

/**
 * Storage export option
 */
export interface StorageExportOption {
	/** binary */
	binary?: boolean;

	/** trs */
	trs?: boolean;

	/** onlyVisible */
	onlyVisible?: boolean;

	/** truncateDrawRange */
	truncateDrawRange?: boolean;

	/** embedImages */
	embedImages?: boolean;

	/** animations */
	animations?: I3JS.IAnimationClip[];

	/** forceIndices */
	forceIndices?: boolean;

	/** forcePowerOfTwoTextures */
	forcePowerOfTwoTextures?: boolean;

	/** includeCustomExtensions */
	includeCustomExtensions?: boolean;

	/** excludeAttributes */
	excludeAttributes?: string[];

	/** littleEndian */
	littleEndian?: boolean;

	/** maxTextureSize */
	maxTextureSize?: number;
}

/**
 * ThreeUniform
 */
export type ThreeUniform = { type: string; value: any; options?: any } | I3JS.IUniform;

/**
 * ThreeUniforms
 */
export type ThreeUniforms = { [key: string]: ThreeUniform };

/**
 * ThreeTexture
 */
export type ThreeTexture = string | I3JS.ITexture | TextureOption | any;

/**
 * Three Color
 * string hexcode - #ffffff
 * string hsl(0,1,1)
 * string rgb(255,255,255)
 * string color name - red,blue...  'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF ...
 * string random
 * number 0xffffff
 * THREE.Color
 */
export type ThreeColor = string | number | I3JS.IColor;

/**
 * Three Vector
 */
export interface ThreeVector {
	x: number;
	y: number;
	z?: number;
	w?: number;
}

/**
 * MaterialParameters
 */
export interface MaterialParameters {
	fog?: boolean | undefined;
	opacity?: number | undefined;
	side?: string | undefined;
	shadowSide?: string | undefined;
	toneMapped?: boolean | undefined;
	transparent?: boolean | undefined;
	vertexColors?: boolean | undefined;
	visible?: boolean | undefined;
}

/**
 * Three Face
 */
export interface ThreeFace {
	a: number;
	b: number;
	c: number;
}

/**
 * Loaded object
 */
export interface LoadedObject {
	object?: I3JS.IObject3D;
	material?: I3JS.IMaterial | any;
	geometry?: I3JS.IBufferGeometry;
	texture?: I3JS.ITexture;
	clips?: I3JS.IAnimationClip[] | any;
	morphTargets?: I3JS.IBufferAttribute[];
	source?: any;
}

export interface LoadedNameMap {
	[key: string]: LoadedNameMap;
}

/**
 * Gui base control
 */
export interface GuiBaseControl {
	meshShape?: {
		visible: boolean;
		helperVisible: boolean;
		wireframe: boolean;
	};
	meshRotateOrg?: {
		x: number;
		y: number;
		z: number;
	};
	meshRotate?: {
		x: number;
		y: number;
		z: number;
		autoRotate: boolean;
		speed: number;
		reset: () => void;
		applyAutoRotate: () => void;
		update: () => void;
	};
	meshPositionOrg?: {
		x: number;
		y: number;
		z: number;
	};
	meshPosition?: {
		x: number;
		y: number;
		z: number;
		reset: () => void;
		update: () => void;
	};
	meshScaleOrg?: {
		x: number;
		y: number;
		z: number;
	};
	meshScale?: {
		x: number;
		y: number;
		z: number;
		reset: () => void;
		update: () => void;
	};
}

/**
 * Tag attributes
 */
export interface TagAttributes {
	tag: string;
	attributes: { name: string; value: any }[];
	children?: { getTagAttribute: (options?: any) => TagAttributes }[];
	options?: any;
}

/**
 * Css style
 *
 * @see [MDN Web Docs - Css](https://developer.mozilla.org/en-US/docs/Web/CSS)
 */
export interface CssStyle {
	/**
	 * The HTTP Content-Security-Policy img-src directive specifies valid sources of images and favicons.
	 * The HTTP Content-Security-Policy (CSP) frame-src directive specifies valid sources for nested browsing contexts loading using elements such as <frame> and <iframe>.
	 */
	src?: string;

	/** The draggable global attribute is an enumerated attribute that indicates whether the element can be dragged, either with native browser behavior or the HTML Drag and Drop API. */
	draggable?: boolean;

	/** The Element property innerHTML gets or sets the HTML or XML markup contained within the element. */
	innerHTML?: string;

	/** The textContent property of the Node interface represents the text content of the node and its descendants. */
	textContent?: string;

	/** The content CSS property replaces an element with a generated value. Objects inserted using the content property are anonymous replaced elements. */
	content?: string;

	/** The position CSS property sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements. */
	position?: string;

	/** The pointer-events CSS property sets under what circumstances (if any) a particular graphic element can become the target of pointer events. */
	pointerEvents?: string;

	/** The overflow CSS shorthand property sets the desired behavior for an element's overflow — i.e. when an element's content is too big to fit in its block formatting context — in both directions. */
	overflow?: string;

	/** The z-index CSS property sets the z-order of a positioned element and its descendants or flex items. Overlapping elements with a larger z-index cover those with a smaller one. */
	zIndex?: number;

	/** The width CSS property sets an element's width. By default, it sets the width of the content area, but if box-sizing is set to border-box, it sets the width of the border area. */
	width?: number | string;

	/** The height CSS property specifies the height of an element. By default, the property defines the height of the content area. If box-sizing is set to border-box, however, it instead determines the height of the border area. */
	height?: number | string;

	/** The min-width CSS property sets the minimum width of an element. It prevents the used value of the width property from becoming smaller than the value specified for min-width. */
	minWidth?: number | string;

	/** The min-height CSS property sets the minimum height of an element. It prevents the used value of the height property from becoming smaller than the value specified for min-height. */
	minHeight?: number | string;

	/** The max-width CSS property sets the maximum width of an element. It prevents the used value of the width property from becoming larger than the value specified by max-width. */
	maxWidth?: number | string;

	/** The max-height CSS property sets the maximum height of an element. It prevents the used value of the height property from becoming larger than the value specified for max-height. */
	maxHeight?: number | string;

	/** The left CSS property participates in specifying the horizontal position of a positioned element. It has no effect on non-positioned elements. */
	left?: number | string;

	/** The right CSS property participates in specifying the horizontal position of a positioned element. It has no effect on non-positioned elements. */
	right?: number | string;

	/** The top CSS property participates in specifying the vertical position of a positioned element. It has no effect on non-positioned elements. */
	top?: number | string;

	/** The bottom CSS property participates in setting the vertical position of a positioned element. It has no effect on non-positioned elements. */
	bottom?: number | string;

	/** The transition CSS property is a shorthand property for transition-property, transition-duration, transition-timing-function, and transition-delay. */
	transition?: string | string[];

	/** The background shorthand CSS property sets all background style properties at once, such as color, image, origin and size, or repeat method. */
	background?: ThreeColor | I3JS.IVector4;

	/** The background-color CSS property sets the background color of an element. */
	backgroundColor?: ThreeColor | I3JS.IVector4;

	/** The background-image CSS property sets one or more background images on an element. */
	backgroundImage?: string;

	/** The background-repeat CSS property sets how background images are repeated. A background image can be repeated along the horizontal and vertical axes, or not repeated at all. */
	backgroundRepeat?: string;

	/** The background-repeat CSS property sets how background images are repeated. A background image can be repeated along the horizontal and vertical axes, or not repeated at all. */
	backgroundRepeatX?: string;

	/** The background-repeat CSS property sets how background images are repeated. A background image can be repeated along the horizontal and vertical axes, or not repeated at all. */
	backgroundRepeatY?: string;

	/** The background-position CSS property sets the initial position for each background image. The position is relative to the position layer set by background-origin. */
	backgroundPosition?: string;

	/** The background-position CSS property sets the initial position for each background image. The position is relative to the position layer set by background-origin. */
	backgroundPositionX?: number | string;

	/** The background-position CSS property sets the initial position for each background image. The position is relative to the position layer set by background-origin. */
	backgroundPositionY?: number | string;

	/** The background-size CSS property sets the size of the element's background image. The image can be left to its natural size, stretched, or constrained to fit the available space. */
	backgroundSize?: number | string;

	/** The background-size CSS property sets the size of the element's background image. The image can be left to its natural size, stretched, or constrained to fit the available space. */
	backgroundSizeX?: number | string;

	/** The background-size CSS property sets the size of the element's background image. The image can be left to its natural size, stretched, or constrained to fit the available space. */
	backgroundSizeY?: number | string;

	/** The background-clip CSS property sets whether an element's background extends underneath its border box, padding box, or content box. */
	backgroundClip?: string;

	/** The padding CSS shorthand property sets the padding area on all four sides of an element at once. */
	padding?: number | string;

	/** The padding-left CSS property sets the width of the padding area to the left of an element. */
	paddingLeft?: number | string;

	/** The padding-top CSS property sets the height of the padding area on the top of an element. */
	paddingTop?: number | string;

	/** The padding-right CSS property sets the width of the padding area on the right of an element. */
	paddingRight?: number | string;

	/** The padding-right CSS property sets the width of the padding area on the bottom of an element. */
	paddingBottom?: number | string;

	/** The margin CSS shorthand property sets the margin area on all four sides of an element. */
	margin?: number | string;

	/** The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer. */
	marginLeft?: number | string;

	/** The margin-top CSS property sets the margin area on the top of an element. A positive value places it farther from its neighbors, while a negative value places it closer. */
	marginTop?: number | string;

	/** The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer. */
	marginRight?: number | string;

	/** The margin-bottom CSS property sets the margin area on the bottom of an element. A positive value places it farther from its neighbors, while a negative value places it closer. */
	marginBottom?: number | string;

	/** The border shorthand CSS property sets an element's border. It sets the values of border-width, border-style, and border-color. */
	border?: number | string;

	/** The border-color shorthand CSS property sets the color of an element's border. */
	borderColor?: ThreeColor | I3JS.IVector4;

	/** The border-style shorthand CSS property sets the line style for all four sides of an element's border. */
	borderStyle?: string;

	/** The border-width shorthand CSS property sets the width of an element's border. */
	borderWidth?: number | string;

	/** The border-radius CSS property rounds the corners of an element's outer border edge. You can set a single radius to make circular corners, or two radii to make elliptical corners. */
	borderRadius?: number | string;

	/** The border-left shorthand CSS property sets all the properties of an element's left border. */
	borderLeft?: number | string;

	/** The border-top shorthand CSS property sets all the properties of an element's top border. */
	borderTop?: number | string;

	/** The border-right shorthand CSS property sets all the properties of an element's right border. */
	borderRight?: number | string;

	/** The border-bottom shorthand CSS property sets an element's bottom border. It sets the values of border-bottom-width, border-bottom-style and border-bottom-color. */
	borderBottom?: number | string;

	/** The border-image CSS property draws an image around a given element. It replaces the element's regular border. */
	borderImage?: string;

	/** The border-image-source CSS property sets the source image used to create an element's border image. */
	borderImageSource?: string;

	/** The border-image-slice CSS property divides the image specified by border-image-source into regions. These regions form the components of an element's border image. */
	borderImageSlice?: string | number;

	/**
	 * The border-image-outset CSS property sets the distance by which an element's border image is set out from its border box.
	 * The parts of the border image that are rendered outside the element's border box with border-image-outset do not trigger overflow scrollbars and don't capture mouse events.
	 */
	borderImageOutset?: string | number;

	/** The border-image-repeat CSS property defines how the edge regions of a source image are adjusted to fit the dimensions of an element's border image. */
	borderImageRepeat?: string;

	/** The border-image-width CSS property sets the width of an element's border image. */
	borderImageWidth?: number | string;

	/** The opacity CSS property sets the opacity of an element. Opacity is the degree to which content behind an element is hidden, and is the opposite of transparency. */
	opacity?: number;

	/** The color CSS property sets the foreground color value of an element's text and text decorations, and sets the <currentcolor> value. currentcolor may be used as an indirect value on other properties and is the default for other color properties, such as border-color. */
	color?: ThreeColor | I3JS.IVector4;

	/** The font-family CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element. */
	fontFamily?: string;

	/** The font-size CSS property sets the size of the font. Changing the font size also updates the sizes of the font size-relative <length> units, such as em, ex, and so forth. */
	fontSize?: number | string;

	/** The font-style CSS property sets whether a font should be styled with a normal, italic, or oblique face from its font-family. */
	fontStyle?: string;

	/** The font-weight CSS property sets the weight (or boldness) of the font. The weights available depend on the font-family that is currently set. */
	fontWeight?: number | string;

	/** The text-align CSS property sets the horizontal alignment of the content inside a block element or table-cell box. This means it works like vertical-align but in the horizontal direction. */
	textAlign?: string;

	/** The text-transform CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby. */
	textTransform?: string;

	/** The text-decoration shorthand CSS property sets the appearance of decorative lines on text. It is a shorthand for text-decoration-line, text-decoration-color, text-decoration-style, and the newer text-decoration-thickness property. */
	textDecoration?: string;

	/** The letter-spacing CSS property sets the horizontal spacing behavior between text characters. This value is added to the natural spacing between characters while rendering the text. Positive values of letter-spacing causes characters to spread farther apart, while negative values of letter-spacing bring characters closer together. */
	letterSpacing?: string;

	/** The text-indent CSS property sets the length of empty space (indentation) that is put before lines of text in a block. */
	textIndent?: number | string;

	/** The text-justify CSS property sets what type of justification should be applied to text when text-align: justify; is set on an element. */
	textJustify?: string;

	/** The text-size-adjust CSS property controls the text inflation algorithm used on some smartphones and tablets. Other browsers will ignore this property. */
	textSizeAdjust?: string;

	/** The white-space CSS property sets how white space inside an element is handled. */
	whiteSpace?: string;

	/** The word-break CSS property sets whether line breaks appear wherever the text would otherwise overflow its content box. */
	wordBreak?: string;

	/** The word-spacing CSS property sets the length of space between words and between tags. */
	wordSpacing?: string;

	/** The change event is fired for <input>, <select>, and <textarea> elements when an alteration to the element's value is committed by the user. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value. */
	change?: (e?: any) => void;

	/** An element receives a click event when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. */
	click?: (e?: any) => void;

	/** The dblclick event fires when a pointing device button (such as a mouse's primary button) is double-clicked; that is, when it's rapidly clicked twice on a single element within a very short span of time. */
	dblclick?: (e?: any) => void;

	/** The HTMLElement.focus() method sets focus on the specified element, if it can be focused. The focused element is the element which will receive keyboard and similar events by default. */
	focus?: (e?: any) => void;

	/** The keyup event is fired when a key is released. */
	keyup?: (e?: any) => void;

	/** The keydown event is fired when a key is pressed. */
	keydown?: (e?: any) => void;

	/** The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images. */
	load?: (e?: any) => void;

	/** The select event fires when some text has been selected. */
	select?: (e?: any) => void;

	/** The mousedown event is fired at an Element when a pointing device button is pressed while the pointer is inside the element. */
	mousedown?: (e?: any) => void;

	/** The mouseout event is fired at an Element when a pointing device (usually a mouse) is used to move the cursor so that it is no longer contained within the element or one of its children. */
	mouseout?: (e?: any) => void;

	/** The mouseover event is fired at an Element when a pointing device (such as a mouse or trackpad) is used to move the cursor onto the element or one of its child elements. */
	mouseover?: (e?: any) => void;

	/** The mousemove event is fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it. */
	mousemove?: (e?: any) => void;

	/** The mouseup event is fired at an Element when a button on a pointing device (such as a mouse or trackpad) is released while the pointer is located inside it. */
	mouseup?: (e?: any) => void;

	/** The Element property innerHTML gets or sets the HTML or XML markup contained within the element. */
	innerHtml?: string;

	/** The innerText property of the HTMLElement interface represents the "rendered" text content of a node and its descendants. */
	innerText?: string;

	/** The className property of the Element interface gets and sets the value of the class attribute of the specified element. */
	className?: string;

	/** The transform CSS property lets you rotate, scale, skew, or translate an element. It modifies the coordinate space of the CSS visual formatting model. */
	transform?: string | string[];

	/** The transform-origin CSS property sets the origin for an element's transformations. */
	transformOrigin?: string;
}

/**
 * Injectable
 * @template T
 */
@Injectable()
export abstract class BaseComponent<T> implements OnInit, AfterViewInit {
	/**
	 * The Controls of base component
	 */
	public controls: T & GuiBaseControl;

	/**
	 * Controls params of base component
	 */
	public controlsParams: GuiControlParam[];

	/**
	 * Creates an instance of base component.
	 * @param controls
	 * @param [controlsParams]
	 */
	constructor(
		@Inject('') controls: T,
		@Inject('') controlsParams: GuiControlParam[] = [],
		@Inject('') clearConsole: boolean = true,
		@Inject('') addBaseParam: boolean = true
	) {
		this.controls = ThreeUtil.getControls(controls, this, addBaseParam);
		this.setControlsParams(controlsParams, addBaseParam);
		if (clearConsole) {
			console.clear();
		}
	}

	/**
	 * Sets controls params
	 * @param [controlsParams]
	 */
	public setControlsParams(controlsParams: GuiControlParam[] = [], addBaseParam: boolean = true) {
		this.controlsParams = ThreeUtil.getControlsParams(controlsParams, this, addBaseParam);
	}

	/**
	 * Gets timeout
	 * 특정 시간후에 이벤트 발생시키기
	 *
	 * @param [timeDelay]
	 * @returns timeout
	 */
	protected getTimeout(timeDelay: number = 50): Promise<void> {
		return new Promise<void>((resolve) => {
			window.setTimeout(() => {
				resolve();
			}, timeDelay);
		});
	}

	/**
	 * Replaces controls value
	 *
	 * @param newValue
	 * @param key
	 * @param [parent]
	 * @param [reDraw]
	 */
	protected replaceControlsValue(newValue: any, key: string, parent: any = null, reDraw: boolean = true) {
		if (parent === null) {
			parent = this.controls;
		}
		if (parent[key] !== undefined) {
			parent[key] = newValue;
			if (reDraw) {
				this.controlsParams = Object.assign([], this.controlsParams);
			}
		}
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {}

	/**
	 * A callback method that is invoked immediately after
	 * Angular has completed initialization of a component's view.
	 * It is invoked only once when the view is instantiated.
	 */
	ngAfterViewInit(): void {
		if (this.controls.meshRotate !== undefined) {
			this.controls.meshRotate.applyAutoRotate();
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
	 * Log time seqn of base component
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
			this.consoleLog(key, object, 'info');
		}
	}

	/**
	 * Consoles log
	 * @param key
	 * @param object
	 * @param [level]
	 */
	protected consoleLog(key: string, object: any, level: string = 'log'): void {
		switch (level) {
			case 'error':
				console.error(key, object);
				break;
			case 'info':
				console.info(key, object);
				break;
			case 'trace':
				console.trace(key, object);
				break;
			case 'log':
			default:
				// console.log(key, object);
				break;
		}
	}

	/**
	 * The Subscribe of base component
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
	 * The Renderer of base component
	 */
	public renderer: RendererComponent = null;

	/**
	 * Sets render
	 * @param renderer
	 */
	public setRender(renderer: RendererComponent) {
		this.renderer = renderer;
	}

	/**
	 * The Scene of base component
	 */
	public scene: SceneComponent = null;

	/**
	 * The Scene of base component
	 */
	public sceneObject3d: I3JS.IScene = null;

	/**
	 * The Scene of base component
	 */
	public sceneChildren: I3JS.IObject3D[] = null;

	/**
	 * Sets scene
	 * @param scene
	 */
	public setScene(scene: SceneComponent) {
		this.scene = scene;
		this.sceneObject3d = scene.getScene();
		this.sceneChildren = this.sceneObject3d.children;
	}

	/**
	 * The Camera of base component
	 */
	public camera: CameraComponent = null;

	/**
	 * The Camera Object
	 */
	public cameraObject3d: I3JS.ICamera = null;

	/**
	 * Sets camera
	 * @param camera
	 */
	public setCamera(camera: CameraComponent) {
		this.camera = camera;
		this.cameraObject3d = this.camera.getCamera();
	}

	/**
	 * The Mesh of base component
	 */
	public mesh: MeshComponent = null;

	/**
	 * Mesh object3d of base component
	 */
	public meshObject3d: I3JS.IObject3D = null;

	/**
	 * Mesh children of base component
	 */
	protected meshChildren: I3JS.IObject3D[] = null;

	/**
	 * Updates gui controller
	 */
	protected updateGuiController() {
		if (this.mesh !== null) {
			if (this.controls.meshPosition !== undefined) {
				const position = this.mesh.getPosition();
				this.controls.meshPositionOrg = {
					x: position.x,
					y: position.y,
					z: position.z,
				};
				this.controls.meshPosition.x = this.controls.meshPositionOrg.x;
				this.controls.meshPosition.y = this.controls.meshPositionOrg.y;
				this.controls.meshPosition.z = this.controls.meshPositionOrg.z;
			}
			if (this.controls.meshScale !== undefined) {
				const scale = this.mesh.getScale();
				this.controls.meshScaleOrg = {
					x: scale.x,
					y: scale.y,
					z: scale.z,
				};
				this.controls.meshScale.x = this.controls.meshScaleOrg.x;
				this.controls.meshScale.y = this.controls.meshScaleOrg.y;
				this.controls.meshScale.z = this.controls.meshScaleOrg.z;
			}
			if (this.controls.meshRotate !== undefined) {
				const rotation = this.mesh.getRotation();
				this.controls.meshRotateOrg = {
					x: (rotation.x / Math.PI) * 180,
					y: (rotation.y / Math.PI) * 180,
					z: (rotation.z / Math.PI) * 180,
				};
				this.controls.meshRotate.x = this.controls.meshRotateOrg.x;
				this.controls.meshRotate.y = this.controls.meshRotateOrg.y;
				this.controls.meshRotate.z = this.controls.meshRotateOrg.z;
			}
			if (this.controls.meshScale !== undefined) {
				if (this.controls.meshScale.x !== 1) {
					const controlsParams = ThreeUtil.getGuiControlParam(this.controlsParams, 'Mesh Scale');
					const minScale = this.controls.meshScale.x * 0.01;
					const maxScale = this.controls.meshScale.x * 1.5;
					const stepScale = (maxScale - minScale) / 30;
					controlsParams.children.forEach((child) => {
						const childController: any = child.controller;
						if (ThreeUtil.isNotNull(childController['min'])) {
							childController['min'](minScale);
						}
						if (ThreeUtil.isNotNull(childController['max'])) {
							childController['max'](maxScale);
						}
						if (ThreeUtil.isNotNull(childController['step'])) {
							childController['step'](stepScale);
						}
					});
				}
			}
			const controlsParams = ThreeUtil.getGuiControlParam(this.controlsParams, 'Mesh Visible');
			if (ThreeUtil.isNotNull(controlsParams) && ThreeUtil.isNotNull(this.controls.meshShape)) {
				this.controls.meshShape.visible = this.mesh.getObject3d().visible;
				const helperParams = ThreeUtil.getGuiControlParam(controlsParams.children, 'helperVisible');
				const helper = this.mesh.helperComponent;
				if (helperParams && helperParams.controller) {
					if (ThreeUtil.isNotNull(helper)) {
						if (helper instanceof N3JS.SkeletonHelper) {
							helperParams.controller.name('Skeleton');
						} else {
							helperParams.controller.name('Helper');
						}
						this.controls.meshShape.helperVisible = helper.visible;
						ThreeUtil.setGuiEnabled(helperParams.controller, true);
					} else {
						this.controls.meshShape.helperVisible = false;
						helperParams.controller.name('Not Supported');
						ThreeUtil.setGuiEnabled(helperParams.controller, false);
					}
				} else {
					console.log(helperParams);
				}
			}
		}
	}

	/**
	 * Sets mesh
	 * @param mesh
	 */
	public setMesh(mesh: MeshComponent) {
		this.mesh = mesh;
		if (this.mesh !== null) {
			this.meshObject3d = this.mesh.getObject3d() as any;
			this.meshChildren = this.meshObject3d.children;
			window.setTimeout(() => {
				this.updateGuiController();
			}, 100);
		}
	}

	/**
	 * Determines whether render on
	 * @param timer
	 */
	public onRender(timer: RendererTimer) {
		ThreeUtil.getControlsOnRender(timer, this);
	}
}

/**
 * Three util
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ThreeUtil) page for details.
 *
 */
export class ThreeUtil {
	/**
	 * Css inject
	 *
	 * @param cssContent
	 * @param [id]
	 * @param [indoc]
	 * @returns true if inject
	 */
	public static cssInject(cssContent: string, id?: string, indoc?: any): boolean {
		const doc: Document = indoc || document;
		let cssParent: HTMLElement = doc.getElementsByTagName('head')[0];
		if (cssParent === null || cssParent == undefined) {
			cssParent = doc.getElementsByTagName('body')[0];
		}
		if (cssParent !== null && cssParent !== undefined) {
			if (id !== null && id !== undefined) {
				const oldcss = doc.getElementById(id);
				if (oldcss !== null && oldcss !== undefined) {
					oldcss.parentElement.removeChild(oldcss);
				}
			} else {
			}
			try {
				const injected = document.createElement('style');
				injected.type = 'text/css';
				if (id !== null && id !== undefined) {
					injected.id = id;
				}
				injected.innerHTML = cssContent;
				cssParent.appendChild(injected);
				return true;
			} catch (e) {}
		}
		return false;
	}

	/**
	 * Css eject
	 *
	 * @param id
	 * @param [indoc]
	 * @returns true if eject
	 */
	public static cssEject(id: string, indoc?: any): boolean {
		const doc: Document = indoc || document;
		const oldcss = doc.getElementById(id);
		if (oldcss !== null && oldcss !== undefined) {
			oldcss.parentElement.removeChild(oldcss);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Makes uuid
	 *
	 * @param len
	 * @param [pre]
	 * @returns
	 */
	public static makeUUID(len: number, pre?: string) {
		var result = '';
		var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		var maxLen = characters.length;
		for (var i = 0; i < len; i++) {
			result += characters.charAt(Math.floor(Math.random() * maxLen));
		}
		return (pre ? pre : 'tmp') + '_' + result;
	}

	/**
	 * Camels case to dash
	 *
	 * @param myStr
	 * @returns
	 */
	public static camelCaseToDash(myStr: string) {
		return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	/**
	 * Removes css style
	 * @param ele
	 * @param [clazzName]
	 * @returns true if css style
	 */
	public static removeCssStyle(ele: HTMLElement, clazzName?: string): boolean {
		if (this.isNotNull(clazzName)) {
			this.cssEject(clazzName);
			if (ele.classList.contains(clazzName)) {
				ele.classList.remove(clazzName);
			}
			if (this.isNotNull(this._elementEvents[clazzName])) {
				const eleEvents = this._elementEvents[clazzName];
				Object.entries(eleEvents).forEach(([key, value]) => {
					ele.removeEventListener(key, value, false);
				});
				delete this._elementEvents[clazzName];
			}
		}
		return true;
	}

	/**
	 * Toggles css style
	 * @param ele
	 * @param [clazzName]
	 * @param [isActive]
	 * @returns true if css style
	 */
	public static toggleCssStyle(ele: HTMLElement, clazzName?: string, isActive?: boolean): boolean {
		if (this.isNotNull(clazzName)) {
			if (!isActive) {
				if (ele.classList.contains(clazzName)) {
					ele.classList.remove(clazzName);
				}
				if (this.isNotNull(this._elementEvents[clazzName])) {
					const eleEvents = this._elementEvents[clazzName];
					Object.entries(eleEvents).forEach(([key, value]) => {
						ele.removeEventListener(key, value, false);
					});
				}
			} else {
				if (!ele.classList.contains(clazzName)) {
					ele.classList.add(clazzName);
				}
				if (this.isNotNull(this._elementEvents[clazzName])) {
					const eleEvents = this._elementEvents[clazzName];
					Object.entries(eleEvents).forEach(([key, value]) => {
						ele.addEventListener(key, value, { passive: true });
					});
				}
			}
		}
		return true;
	}

	/**
	 * Gets child element save
	 * @param parentEle
	 * @returns child element save
	 */
	public static getChildElementSave(parentEle: HTMLElement): HTMLElement {
		const ele: Node = parentEle.cloneNode(true);
		const childNodes: Node[] = [];
		ele.childNodes.forEach((child) => {
			childNodes.push(child);
		});
		childNodes.forEach((child) => {
			switch (child.nodeType) {
				case Node.ELEMENT_NODE:
					const childEle: HTMLElement = child as HTMLElement;
					switch (childEle.tagName) {
						case 'P':
						case 'DIV':
						case 'FONT':
						case 'SPAN':
						case 'IMG':
						case 'I':
						case 'B':
						case 'STRONG':
						case 'IFRAME':
						case 'H1':
						case 'H2':
						case 'H3':
						case 'H4':
						case 'H5':
							break;
						default:
							ele.removeChild(childEle);
							break;
					}
					break;
				default:
					break;
			}
		});
		return ele as HTMLElement;
	}

	/**
	 * Adds css style
	 * @param ele
	 * @param styles
	 * @param [clazzName]
	 * @param [classPrefix]
	 * @param [vertualClass]
	 * @returns css style
	 */
	public static addCssStyle(
		ele: HTMLElement,
		styles: string | CssStyle,
		clazzName?: string,
		classPrefix?: string,
		vertualClass?: string
	): string {
		if (clazzName === null || clazzName === undefined) {
			clazzName = this.makeUUID(15, classPrefix);
		}
		if (typeof styles == 'string') {
			styles = {
				innerHtml: styles,
			};
		}
		if (styles === null || styles === undefined) {
			styles = {};
		}

		const eventList: { [key: string]: (e?: any) => void } = {};
		const styleList: { [key: string]: string } = {};

		Object.entries(styles).forEach(([key, value]) => {
			if (this.isNotNull(value)) {
				switch (key) {
					case 'change':
					case 'click':
					case 'dblclick':
					case 'focus':
					case 'keyup':
					case 'keydown':
					case 'load':
					case 'select':
					case 'mousedown':
					case 'mouseout':
					case 'mouseover':
					case 'mousemove':
					case 'mouseup':
						if (typeof value === 'function') {
							eventList[key] = value;
						} else {
							eventList[key] = null;
						}
						break;
					case 'src':
						if (
							ele instanceof HTMLImageElement ||
							ele instanceof HTMLIFrameElement ||
							ele instanceof HTMLVideoElement ||
							ele instanceof HTMLAudioElement
						) {
							ele.src = ThreeUtil.getStoreUrl(value);
						}
						break;
					case 'draggable':
						ele.draggable = value;
						break;
					case 'innerHtml':
					case 'innerHTML':
						ele.innerHTML = value;
						break;
					case 'innerText':
						ele.innerText = value;
						break;
					case 'textContent':
						ele.textContent = value;
						break;
					case 'zIndex':
					case 'opacity':
					case 'borderImageSlice':
						if (typeof value == 'number') {
							styleList[key] = value.toString();
						} else if (typeof value == 'string') {
							styleList[key] = parseFloat(value).toString();
						}
						break;
					case 'transition':
						if (typeof value === 'string' && value != '') {
							styleList[key] = value;
						} else if (value instanceof Array && value.length > 0) {
							styleList[key] = value.join(', ');
						}
						break;
					case 'color':
					case 'background':
					case 'backgroundColor':
					case 'borderColor':
						if (typeof value == 'number' || typeof value == 'string') {
							if (
								typeof value == 'string' &&
								(value.indexOf('rgba') > -1 || value.indexOf('rgb') > -1 || value.indexOf('#') > -1)
							) {
								styleList[key] = value;
							} else {
								styleList[key] = this.getColorSafe(value).getStyle();
							}
						} else if (value instanceof N3JS.Color) {
							styleList[key] = value.getStyle();
						} else if (value instanceof N3JS.Vector4) {
							styleList[key] =
								'rgba(' + value.x * 255 + ',' + value.y * 255 + ',' + value.z * 255 + ',' + value.w + ')';
						}
						break;
					case 'transform':
						if (value instanceof Array) {
							if (value.length > 0) {
								styleList[key] = value.join(' ');
							}
						} else if (typeof value == 'string' && value !== '') {
							styleList[key] = value;
						}
						break;
					case 'backgroundImage':
					case 'borderImageSource':
						styleList[key] = 'url(' + value + ')';
						break;
					case 'content':
						if (typeof value == 'string' && value !== '') {
							styleList[key] = "'" + value + "'";
						}
						break;
					case 'position':
					case 'pointerEvents':
					case 'overflow':
					case 'width':
					case 'height':
					case 'minWidth':
					case 'minHeight':
					case 'maxWidth':
					case 'maxHeight':
					case 'left':
					case 'right':
					case 'top':
					case 'bottom':
					case 'borderWidth':
					case 'borderRadius':
					case 'backgroundRepeat':
					case 'backgroundRepeatX':
					case 'backgroundRepeatY':
					case 'backgroundPosition':
					case 'backgroundPositionX':
					case 'backgroundPositionY':
					case 'backgroundSize':
					case 'backgroundSizeX':
					case 'backgroundSizeY':
					case 'backgroundClip':
					case 'padding':
					case 'paddingLeft':
					case 'paddingTop':
					case 'paddingRight':
					case 'paddingBottom':
					case 'margin':
					case 'marginLeft':
					case 'marginTop':
					case 'marginRight':
					case 'marginBottom':
					case 'border':
					case 'borderStyle':
					case 'borderLeft':
					case 'borderTop':
					case 'borderRight':
					case 'borderBottom':
					case 'borderImage':
					case 'borderImageOutset':
					case 'borderImageRepeat':
					case 'borderImageWidth':
					case 'fontFamily':
					case 'fontSize':
					case 'fontStyle':
					case 'fontWeight':
					case 'textAlign':
					case 'textTransform':
					case 'textDecoration':
					case 'letterSpacing':
					case 'textIndent':
					case 'textJustify':
					case 'textSizeAdjust':
					case 'whiteSpace':
					case 'wordBreak':
					case 'wordSpacing':
					case 'transformOrigin':
						if (typeof value == 'number') {
							styleList[key] = value + 'px';
						} else if (typeof value == 'string') {
							styleList[key] = value;
						}
						break;
				}
			}
		});
		switch (vertualClass) {
			case 'inline':
				const eleStyle: any = ele.style;
				Object.entries(styleList).forEach(([key, value]) => {
					eleStyle[key] = value;
				});
				if (this.isNotNull(styles.className)) {
					ele.className = styles.className;
				}
				break;
			default:
				const cssStyleList: string[] = [];
				Object.entries(styleList).forEach(([key, value]) => {
					cssStyleList.push(this.camelCaseToDash(key) + ': ' + value);
				});
				this.cssInject(
					'.' + clazzName + (vertualClass ? ':' + vertualClass : '') + '{' + cssStyleList.join(';') + '}',
					clazzName
				);
				if (!ele.classList.contains(clazzName)) {
					ele.classList.add(clazzName);
				}
				break;
		}
		if (eventList != {}) {
			let eleEvents: { [key: string]: any } = null;
			if (this.isNotNull(this._elementEvents[clazzName])) {
				eleEvents = this._elementEvents[clazzName];
			} else {
				eleEvents = this._elementEvents[clazzName] = {};
			}
			Object.entries(eventList).forEach(([key, value]) => {
				const oldEvent = eleEvents[key];
				if (this.isNotNull(value) && oldEvent !== value) {
					if (this.isNotNull(oldEvent)) {
						ele.removeEventListener(key, oldEvent, false);
					}
					ele.addEventListener(key, value, { passive: true });
					eleEvents[key] = value;
				} else if (this.isNull(value) && this.isNotNull(oldEvent)) {
					ele.removeEventListener(key, oldEvent, false);
					delete eleEvents[key];
				}
			});
			this._elementEvents[clazzName] = eleEvents;
		}
		return clazzName;
	}

	/**
	 * Element events of three util
	 */
	private static _elementEvents: { [key: string]: { [key: string]: any } } = {};

	/**
	 * Gets chroma scale
	 * @param scales
	 * @returns chroma scale
	 */
	public static getChromaScale(...scales: any[]): CHROMA.Scale {
		return CHROMA.scale(scales);
	}

	/**
	 * Last renderer of three util
	 */
	public static lastRenderer: any = null;

	/**
	 * Sets renderer
	 * @param lastRenderer
	 */
	public static setRenderer(lastRenderer: any) {
		this.lastRenderer = lastRenderer;
	}

	/**
	 * Gets pmrem generator
	 * @returns pmrem generator
	 */
	public static getPmremGenerator(): I3JS.IPMREMGenerator {
		return new N3JS.PMREMGenerator(this.getRenderer() as I3JS.IWebGLRenderer);
	}

	/**
	 * Gets renderer
	 * @returns renderer
	 */
	public static getRenderer(): I3JS.IRenderer {
		if (this.lastRenderer !== null) {
			return this.lastRenderer.getRenderer();
		} else {
			return new N3JS.WebGLRenderer();
		}
	}

	/**
	 * Gets renderer size
	 * @returns renderer size
	 */
	public static getRendererSize(): I3JS.IVector2 {
		if (this.lastRenderer !== null) {
			return this.lastRenderer.getSize();
		} else {
			return new N3JS.Vector2(1024, 1024);
		}
	}

	/**
	 * Gets size subscribe
	 * @returns size subscribe
	 */
	public static getSizeSubscribe(): Observable<I3JS.IVector2> {
		if (this.lastRenderer !== null) {
			return this.lastRenderer.sizeSubscribe();
		} else {
			return undefined;
		}
	}

	/**
	 * Gets update subscribe
	 * @returns update subscribe
	 */
	public static getUpdateSubscribe(): Observable<RendererTimer> {
		if (this.lastRenderer !== null) {
			return this.lastRenderer.updateSubscribe();
		} else {
			return undefined;
		}
	}

	/**
	 * Render timer of three util
	 */
	private static renderTimer: RendererTimer;

	/**
	 * Renders three util
	 * @param renderTimer
	 */
	public static render(renderTimer: RendererTimer) {
		if (this.renderTimer !== renderTimer) {
			this.renderTimer = renderTimer;
			// GSAP.update(renderTimer.elapsedTime * 1000);
			// TWEEN.update();
		}
	}

	/**
	 * Determines whether null is
	 * @param value
	 * @returns true if null
	 */
	public static isNull(value: any): boolean {
		return value === null || value === undefined;
	}

	/**
	 * Determines whether not null is
	 * @param value
	 * @returns true if not null
	 */
	public static isNotNull(value: any): boolean {
		return !this.isNull(value);
	}

	/**
	 * Determines whether array is
	 * @param value
	 * @returns true if array
	 */
	public static isArray(value: any): boolean {
		return Array.isArray(value);
	}

	/**
	 * Gets first
	 * @template T
	 * @param value
	 * @returns first
	 */
	public static getFirst<T>(value: T | T[]): T {
		if (Array.isArray(value)) {
			return value[0] || null;
		} else {
			return value;
		}
	}

	/**
	 * Determines whether index of is
	 * @template T
	 * @param data
	 * @param findMe
	 * @returns true if index of
	 */
	public static isIndexOf<T>(data: T[], findMe: T[] | T): boolean {
		if (Array.isArray(findMe)) {
			let result: boolean = false;
			findMe.forEach((txt) => {
				if (data.indexOf(txt) > -1) {
					result = true;
				}
			});
			return result;
		} else {
			return data.indexOf(findMe) > -1;
		}
	}

	/**
	 * Determines whether only index of is
	 * @template T
	 * @param data
	 * @param findMe
	 * @param [addedFindMe]
	 * @returns true if only index of
	 */
	public static isOnlyIndexOf<T>(data: T[], findMe: T[], addedFindMe?: T[]): boolean {
		if (data.length === 0) {
			return true;
		} else {
			if (this.isNotNull(addedFindMe)) {
				findMe = this.pushUniq(findMe, addedFindMe);
			}
			let result: boolean = true;
			data.forEach((txt) => {
				if (findMe.indexOf(txt) === -1) {
					result = false;
				}
			});
			return result;
		}
	}

	/**
	 * Pushs uniq
	 * @template T
	 * @param data
	 * @param addMe
	 * @returns uniq
	 */
	public static pushUniq<T>(data: T[], addMe: T[] | T): T[] {
		if (Array.isArray(addMe)) {
			addMe.forEach((obj) => {
				if (data.indexOf(obj) === -1) {
					data.push(obj);
				}
			});
		} else if (ThreeUtil.isNotNull(addMe)) {
			if (data.indexOf(addMe) === -1) {
				data.push(addMe);
			}
		}
		return data;
	}

	/**
	 * Gets store url
	 * @param url
	 * @returns
	 */
	public static setAssetUrl(url: string) {
		this.assetUrl = url.endsWith('/') ? url : url + '/';
	}

	/**
	 * Asset url
	 */
	private static assetUrl: string = 'assets/examples/';

	/**
	 * Gets store url
	 *
	 * @param url
	 * @returns store url
	 */
	public static getStoreUrl(url: string) {
		if (
			url.startsWith('/') ||
			url.startsWith('http://') ||
			url.startsWith('https://') ||
			url.startsWith(this.assetUrl)
		) {
			return url;
		} else {
			return this.assetUrl + url;
		}
	}

	/**
	 * Sets loading process
	 *
	 * @param url
	 * @param loaded
	 * @param total
	 */
	public static setLoadingProcess(url: string, loaded: number, total: number) {
		console.log('Loaded %c%d%c/%d => %c%s', 'font-weight:bold', loaded, '', total, 'font-style:italic', url);
	}

	/**
	 * The Manager of three util
	 */
	private static _manager: I3JS.ILoadingManager = null;

	/**
	 * Gets loading manager
	 * @returns loading manager
	 */
	public static getLoadingManager(): I3JS.ILoadingManager {
		if (this._manager === null) {
			this._manager = new N3JS.LoadingManager(
				() => {},
				(url: string, loaded: number, total: number) => {
					this.setLoadingProcess(url, loaded, total);
				},
				(url: string) => {
					console.error(url);
				}
			) as any;
			this._manager.addHandler(/\.dds$/i, new N3JS.DDSLoader());
		}
		return this._manager;
	}

	/**
	 * Gets html code
	 * @param info
	 * @param [preTab]
	 * @returns html code
	 */
	public static getHtmlCode(info: TagAttributes, preTab: string = ''): string {
		const tag = info.tag;
		const attributes = info.attributes;
		const tags: string[] = [];
		tags.push(preTab + '<' + tag);
		attributes.forEach((attr) => {
			const key = attr.name;
			const value = attr.value;
			if (this.isNotNull(value)) {
				if (value instanceof N3JS.Color) {
					tags.push(preTab + '\t[' + key + ']="\'#' + value.getHexString() + '\'"');
				} else if (typeof value == 'number') {
					if (Math.round(value) !== value) {
						tags.push(preTab + '\t[' + key + ']="' + parseFloat(value.toFixed(4)) + '"');
					} else {
						tags.push(preTab + '\t[' + key + ']="' + value + '"');
					}
				} else if (typeof value == 'string') {
					tags.push(preTab + '\t[' + key + ']="\'' + value + '\'"');
				}
			}
		});
		tags.push(preTab + '>');
		if (info.children && info.children.length > 0) {
			info.children.forEach((child) => {
				tags.push(this.getHtmlCode(child.getTagAttribute(info.options), preTab + '\t'));
			});
		}
		tags.push(preTab + '</' + tag + '>');
		return tags.join('\n');
	}

	/**
	 * Gets color
	 * @param color
	 * @returns color
	 */
	public static getColor(color: ThreeColor | { r: number; g: number; b: number }): I3JS.IColor {
		if (this.isNotNull(color)) {
			if (color instanceof N3JS.Color) {
				return color;
			} else if (typeof color === 'string') {
				return this.getColorSafe(color, null);
			} else if (typeof color === 'object') {
				if (this.isNotNull(color.r) && this.isNotNull(color.g) && this.isNotNull(color.b)) {
					return new N3JS.Color(color.r, color.g, color.b);
				}
			} else {
				return new N3JS.Color(color);
			}
		}
		return undefined;
	}

	/**
	 * Gets color rgb
	 * @param r
	 * @param g
	 * @param b
	 * @param [color]
	 * @returns color rgb
	 */
	public static getColorRGB(r: number, g: number, b: number, color?: ThreeColor): I3JS.IColor {
		const colorObj = this.isNotNull(color) ? this.getColor(color) : new N3JS.Color(0x000000);
		if (this.isNotNull(colorObj)) {
			return colorObj.setRGB(
				this.isNotNull(r) ? r : colorObj.r,
				this.isNotNull(g) ? g : colorObj.g,
				this.isNotNull(b) ? b : colorObj.b
			);
		}
		return undefined;
	}

	/**
	 * Gets color hsl
	 * @param [h]
	 * @param [s]
	 * @param [l]
	 * @param [color]
	 * @returns color hsl
	 */
	public static getColorHSL(h?: number, s?: number, l?: number, color?: ThreeColor): I3JS.IColor {
		const colorObj = this.isNotNull(color) ? this.getColor(color) : new N3JS.Color(0x000000);
		if (this.isNotNull(colorObj)) {
			const hsl = colorObj.getHSL({ h: 0, s: 0, l: 0 });
			return colorObj.setHSL(
				this.isNotNull(h) ? h : hsl.h,
				this.isNotNull(s) ? s : hsl.s,
				this.isNotNull(l) ? l : hsl.l
			);
		}
		return undefined;
	}

	/**
	 * Gets color hex
	 * @param [color]
	 * @returns color hex
	 */
	public static getColorHex(color?: ThreeColor): number {
		const colorObj = this.getColor(color);
		if (this.isNotNull(colorObj)) {
			return colorObj.getHex();
		}
		return undefined;
	}

	/**
	 * Gets color hex string
	 * @param [color]
	 * @returns color hex string
	 */
	public static getColorHexString(color?: ThreeColor): string {
		const colorObj = this.getColor(color);
		if (this.isNotNull(colorObj)) {
			return colorObj.getHexString();
		}
		return undefined;
	}

	/**
	 * Gets color style
	 * @param [color]
	 * @returns color style
	 */
	public static getColorStyle(color?: ThreeColor): string {
		const colorObj = this.getColor(color);
		if (this.isNotNull(colorObj)) {
			return colorObj.getStyle();
		}
		return undefined;
	}

	/**
	 * Gets color multiply safe
	 * @param color
	 * @param [altColor]
	 * @param [multiply]
	 * @returns color multiply safe
	 */
	public static getColorMultiplySafe(color: ThreeColor, altColor?: ThreeColor, multiply?: number): I3JS.IColor {
		const safeColor = this.getColorSafe(color, altColor);
		if (this.isNotNull(safeColor) && this.isNotNull(multiply)) {
			safeColor.multiplyScalar(multiply);
			if (safeColor.r < 0 || safeColor.r > 1) {
				safeColor.r = Math.min(1, Math.max(0, safeColor.r));
			}
			if (safeColor.g < 0 || safeColor.g > 1) {
				safeColor.g = Math.min(1, Math.max(0, safeColor.g));
			}
			if (safeColor.b < 0 || safeColor.b > 1) {
				safeColor.b = Math.min(1, Math.max(0, safeColor.b));
			}
		}
		return safeColor;
	}

	/**
	 * Gets parse float
	 * @param value
	 * @param [max]
	 * @returns parse float
	 */
	public static getParseFloat(value: string, max: number = 1): number {
		if (/^(\+|\-|)[0-9]+(\.|)[0-9]*$/.test(value)) {
			return parseFloat(value);
		} else {
			switch (value.toLowerCase()) {
				case 'random':
				default:
					return Math.random() * max;
			}
		}
	}

	/**
	 * Determines whether not null is color
	 * @param color
	 * @returns true if not null
	 */
	public static isColor(color: any): boolean {
		if (color instanceof N3JS.Color || typeof color === 'number') {
			return true;
		} else if (
			typeof color === 'string' &&
			(color.startsWith('0x') ||
				color.startsWith('rgb(') ||
				color.startsWith('RGB(') ||
				color.startsWith('color(') ||
				color.startsWith('COLOR(') ||
				color.startsWith('hsl(') ||
				color.startsWith('HSL(') ||
				color.startsWith('#') ||
				/^[a-z]{3,10}$/.test(color) ||
				color.indexOf('random') >= 0)
		) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Gets color safe
	 * @param color
	 * @param [altColor]
	 * @param [nullColor]
	 * @returns color safe
	 */
	public static getColorSafe(color: ThreeColor, altColor?: ThreeColor, nullColor?: ThreeColor): I3JS.IColor {
		const defColor = this.isNotNull(color) ? color : this.isNotNull(altColor) ? altColor : nullColor;
		if (this.isNotNull(defColor)) {
			if (defColor instanceof N3JS.Color) {
				return defColor;
			} else if (typeof defColor === 'string') {
				const colorStr: string = defColor;
				if (colorStr.startsWith('#')) {
					return new N3JS.Color(colorStr);
				} else if (colorStr === 'random') {
					return new N3JS.Color(Math.random() * 0xffffff);
				} else if (colorStr.startsWith('0x')) {
					return new N3JS.Color(parseInt(colorStr, 16));
				} else if (colorStr.indexOf(':') > 0 || colorStr.indexOf('(') > 0) {
					let [type, val1, val2, val3] = (colorStr + ',,,')
						.replace('(', ',')
						.replace(')', ',')
						.replace(':', ',')
						.replace(/[^A-Za-z\-0-9\.,]/g, '')
						.split(',');
					switch (type.toLowerCase()) {
						case 'hsl':
							const h = this.getParseFloat(val1, 1);
							const s = this.getParseFloat(val2, 1);
							const l = this.getParseFloat(val3, 1);
							const tmp = new N3JS.Color().setHSL(h, s, l);
							return tmp;
						case 'rgb':
							const r = this.getParseFloat(val1, 255);
							const g = this.getParseFloat(val2, 255);
							const b = this.getParseFloat(val3, 255);
							return new N3JS.Color(r / 255, g / 255, b / 255);
						case 'color':
						case 'rgbf':
							return new N3JS.Color(
								this.getParseFloat(val1, 1),
								this.getParseFloat(val2, 1),
								this.getParseFloat(val3, 1)
							);
					}
				}
			}
			return new N3JS.Color(defColor);
		}
		return undefined;
	}

	/**
	 * Gets color alpha safe
	 * @param color
	 * @param alpha
	 * @param [altColor]
	 * @returns color alpha safe
	 */
	public static getColorAlphaSafe(
		color: ThreeColor,
		alpha: number,
		altColor?: ThreeColor
	): I3JS.IColor | I3JS.IVector4 {
		const defColor = this.getColorSafe(color, altColor);
		if (this.isNotNull(defColor)) {
			if (this.isNotNull(alpha) && alpha >= 0 && alpha <= 1) {
				return new N3JS.Vector4(defColor.r, defColor.g, defColor.b, alpha);
			} else {
				return defColor;
			}
		} else if (this.isNotNull(alpha) && alpha >= 0 && alpha <= 1) {
			return new N3JS.Vector4(0, 0, 0, alpha);
		}
		return undefined;
	}

	/**
	 * Gets type safe
	 * @template T
	 * @param value
	 * @param [altValue]
	 * @param [nullValue]
	 * @returns type safe
	 */
	public static getTypeSafe<T>(value: T, altValue?: T, nullValue?: T): T {
		const defValue = this.isNotNull(value) ? value : altValue;
		if (this.isNotNull(defValue)) {
			return defValue;
		}
		if (this.isNotNull(nullValue)) {
			return nullValue;
		} else {
			return undefined;
		}
	}

	/**
	 * Gets number safe
	 * @param num
	 * @param [altnum]
	 * @returns number safe
	 */
	public static getNumberSafe(num: number | string, altnum?: number): number {
		const defValue = this.getTypeSafe(num, altnum);
		if (this.isNotNull(defValue)) {
			if (typeof defValue === 'string') {
				if (defValue.startsWith('0x')) {
					return parseInt(defValue, 16);
				}
				return Math.random();
			} else {
				return defValue;
			}
		}
		return undefined;
	}

	/**
	 * Gets angle safe
	 * @param angle
	 * @param [altangle]
	 * @returns angle safe
	 */
	public static getAngleSafe(angle: number | string, altangle?: number): number {
		const defValue = this.getTypeSafe(angle, altangle);
		if (this.isNotNull(defValue)) {
			if (typeof angle === 'string') {
				return Math.random() * 2 * Math.PI;
			} else {
				return ((defValue as number) / 180) * Math.PI;
			}
		}
		return undefined;
	}

	/**
	 * Gets boolean safe
	 * @param bl
	 * @param [altbl]
	 * @returns true if boolean safe
	 */
	public static getBooleanSafe(bl: string | number | boolean, altbl?: string | number | boolean): boolean {
		const defValue = this.getTypeSafe(bl, altbl);
		if (typeof defValue === 'boolean') {
			return defValue;
		} else if (typeof defValue === 'string') {
			switch (defValue.toLowerCase()) {
				case '1':
				case 'y':
				case 'yes':
				case 'true':
				case 't':
				case 'on':
					return true;
				case '':
				case '0':
				case 'n':
				case 'no':
				case 'false':
				case 'f':
				case 'off':
					return false;
			}
		} else if (typeof defValue === 'number') {
			if (defValue > 0) {
				return true;
			} else {
				return false;
			}
		}
		return undefined;
	}

	/**
	 * Gets angle2 radian safe
	 * @param angle
	 * @param [altangle]
	 * @returns angle2 radian safe
	 */
	public static getAngle2RadianSafe(angle: number, altangle?: number): number {
		const defValue = this.getTypeSafe(angle, altangle);
		if (this.isNotNull(defValue)) {
			return (defValue / 180) * Math.PI;
		}
		return undefined;
	}

	/**
	 * Gets radian2 angle safe
	 * @param angle
	 * @param [altangle]
	 * @returns radian2 angle safe
	 */
	public static getRadian2AngleSafe(angle: number, altangle?: number): number {
		const defValue = this.getTypeSafe(angle, altangle);
		if (this.isNotNull(defValue)) {
			return (defValue / Math.PI) * 180;
		}
		return undefined;
	}

	/**
	 * Gets vector2 vsafe
	 * @param v2
	 * @param [altValue]
	 * @returns vector2 vsafe
	 */
	public static getVector2VSafe(v2: number[] | I3JS.IVector2, altValue?: I3JS.IVector2): I3JS.IVector2 {
		if (v2 instanceof N3JS.Vector2) {
			return v2;
		} else if (Array.isArray(v2) && this.isNotNull(v2) && v2.length >= 2) {
			return this.getVector2Safe(v2[0], v2[1], altValue);
		}
		return undefined;
	}

	/**
	 * Gets vector2 safe
	 * @param x
	 * @param y
	 * @param [altValue]
	 * @param [v2]
	 * @param [isRequired]
	 * @returns vector2 safe
	 */
	public static getVector2Safe(
		x: number,
		y: number,
		altValue?: I3JS.IVector2,
		v2?: number[] | I3JS.IVector2,
		isRequired?: boolean
	): I3JS.IVector2 {
		const defValue =
			this.isNotNull(x) || this.isNotNull(y) ? new N3JS.Vector2(this.getTypeSafe(x, y), this.getTypeSafe(y, x)) : null;
		if (this.isNotNull(defValue)) {
			return defValue;
		}
		if (this.isNotNull(v2)) {
			return this.getVector2VSafe(v2, altValue);
		}
		if (this.isNotNull(altValue)) {
			return altValue;
		}
		if (isRequired) {
			return new N3JS.Vector2();
		}
		return undefined;
	}

	/**
	 * Gets vector3 vsafe
	 * @param v3
	 * @param [altValue]
	 * @returns vector3 vsafe
	 */
	public static getVector3VSafe(v3: number[] | I3JS.IVector3, altValue?: I3JS.IVector3): I3JS.IVector3 {
		if (v3 instanceof N3JS.Vector3) {
			return v3;
		} else if (Array.isArray(v3) && this.isNotNull(v3) && v3.length >= 3) {
			return this.getVector3Safe(v3[0], v3[1], v3[2], altValue);
		}
		return undefined;
	}

	/**
	 * Gets vector3 safe
	 * @param x
	 * @param y
	 * @param z
	 * @param [altValue]
	 * @param [v3]
	 * @param [isRequired]
	 * @returns vector3 safe
	 */
	public static getVector3Safe(
		x: number,
		y: number,
		z: number,
		altValue?: I3JS.IVector3,
		v3?: number[] | I3JS.IVector3,
		isRequired?: boolean
	): I3JS.IVector3 {
		const defValue =
			this.isNotNull(x) || this.isNotNull(y) || this.isNotNull(z)
				? new N3JS.Vector3(this.getTypeSafe(x, y, z), this.getTypeSafe(y, z, x), this.getTypeSafe(z, x, y))
				: null;
		if (this.isNotNull(defValue)) {
			return defValue;
		}
		if (this.isNotNull(v3)) {
			return this.getVector3VSafe(v3, altValue);
		}
		if (this.isNotNull(altValue)) {
			return altValue;
		}
		if (isRequired) {
			return new N3JS.Vector3();
		}
		return undefined;
	}

	/**
	 * Gets matrix4 safe
	 * @param obj
	 * @param [matrixType]
	 * @returns matrix4 safe
	 */
	public static getMatrix4Safe(obj: I3JS.IObject3D, matrixType: string = 'maxtix'): I3JS.IMatrix4 {
		if (this.isNotNull(obj)) {
			const anyObj: any = obj;
			switch (matrixType.toLowerCase()) {
				case 'projectionmatrixinverse':
					if (this.isNotNull(anyObj['projectionMatrixInverse'])) {
						return new N3JS.Matrix4().copy(anyObj['projectionMatrixInverse']);
					}
					break;
				case 'projectionmatrix':
					if (this.isNotNull(anyObj['projectionMatrix'])) {
						return anyObj['projectionMatrix'];
					}
					break;
				case 'matrixworldinverse':
					if (this.isNotNull(anyObj['matrixWorldInverse'])) {
						return anyObj['matrixWorldInverse'];
					}
					break;
				case 'matrixworld':
					return obj.matrixWorld;
				case 'matrix':
				default:
					return obj.matrix;
			}
		}
		return new N3JS.Matrix4();
	}

	/**
	 * Gets euler safe
	 *
	 * @param x
	 * @param y
	 * @param z
	 * @param [altValue]
	 * @param [isRequired]
	 * @returns euler safe
	 */
	public static getEulerSafe(
		x: number | string,
		y: number | string,
		z: number | string,
		altValue?: I3JS.IEuler,
		isRequired?: boolean
	): I3JS.IEuler {
		const defValue =
			this.isNotNull(x) || this.isNotNull(y) || this.isNotNull(z)
				? new N3JS.Euler(
						this.getAngleSafe(this.getTypeSafe(x, y, z), 0),
						this.getAngleSafe(this.getTypeSafe(y, x, z), 0),
						this.getAngleSafe(this.getTypeSafe(z, x, y), 0)
				  )
				: altValue;
		if (this.isNotNull(defValue)) {
			return defValue;
		}
		if (isRequired) {
			return new N3JS.Euler(0, 0, 0);
		}
		return undefined;
	}

	/**
	 * Gets wrapping safe
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.Wrapping
	 * @see THREE.RepeatWrapping - RepeatWrapping, Repeat
	 * @see THREE.MirroredRepeatWrapping - MirroredRepeatWrapping, MirroredRepeat
	 * @see THREE.ClampToEdgeWrapping - ClampToEdgeWrapping, ClampToEdge
	 *
	 * @param baseWrap
	 * @param [altWrap]
	 * @param [def]
	 * @returns wrapping safe
	 */
	public static getWrappingSafe(baseWrap: string, altWrap?: string, def?: string): I3JS.TWrapping {
		const wrap = this.getTypeSafe(baseWrap, altWrap, def || '');
		switch (wrap.toLowerCase()) {
			case 'wraprepeat':
			case 'repeatwrapping':
			case 'repeat':
				return N3JS.RepeatWrapping;
			case 'mirroredrepeatwrapping':
			case 'mirroredrepeat':
				return N3JS.MirroredRepeatWrapping;
			case 'clamptoedgewrapping':
			case 'clamptoedge':
				return N3JS.ClampToEdgeWrapping;
			default:
				return undefined;
		}
	}

	/**
	 * Gets texture filter safe
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.TextureFilter
	 * @see THREE.NearestFilter               - NearestFilter, Nearest
	 * @see THREE.NearestMipmapNearestFilter  - NearestMipmapNearestFilter, nearestmipmapnearest
	 * @see THREE.NearestMipmapLinearFilter   - NearestMipmapLinearFilter, nearestmipmaplinear
	 * @see THREE.LinearMipmapNearestFilter   - LinearMipmapNearestFilter, linearmipmapnearest
	 * @see THREE.LinearMipmapLinearFilter    - LinearMipmapLinearFilter, linearmipmaplinear
	 * @see THREE.LinearFilter                - Linearfilter, linear
	 *
	 * @param baseFilter
	 * @param [altFilter]
	 * @param [def]
	 * @returns texture filter safe
	 */
	public static getTextureFilterSafe(baseFilter: string, altFilter?: string, def?: string): I3JS.TTextureFilter {
		const filter = this.getTypeSafe(baseFilter, altFilter, def || '');
		switch (filter.toLowerCase()) {
			case 'nearestfilter':
			case 'nearest':
				return N3JS.NearestFilter;
			case 'nearestmipmapnearestfilter':
			case 'nearestmipmapnearest':
				return N3JS.NearestMipmapNearestFilter;
			case 'nearestmipmaplinearfilter':
			case 'nearestmipmaplinear':
				return N3JS.NearestMipmapLinearFilter;
			case 'linearmipmapnearestfilter':
			case 'linearmipmapnearest':
				return N3JS.LinearMipmapNearestFilter;
			case 'linearmipmaplinearfilter':
			case 'linearmipmaplinear':
				return N3JS.LinearMipmapLinearFilter;
			case 'linearfilter':
			case 'linear':
				return N3JS.LinearFilter;
			default:
				return undefined;
		}
	}

	/**
	 * Gets side
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.Side
	 * @see THREE.FrontSide - FrontSide , Front
	 * @see THREE.BackSide - BackSide , Back
	 * @see THREE.DoubleSide - DoubleSide , Double
	 *
	 * @param [def]
	 * @returns side
	 */
	public static getSideSafe(baseSide: string, altSide?: string, def?: string): I3JS.TSide {
		const side = this.getTypeSafe(baseSide, altSide, def || '');
		switch (side.toLowerCase()) {
			case 'backside':
			case 'back':
				return N3JS.BackSide;
			case 'doubleside':
			case 'double':
				return N3JS.DoubleSide;
			case 'frontside':
			case 'front':
				return N3JS.FrontSide;
		}
		return undefined;
	}

	/**
	 * Gets shadow map type
	 * @param [def]
	 * @returns shadow map type
	 */
	public static getShadowMapTypeSafe(baseShadowMapType: string, def?: string): I3JS.TShadowMapType {
		const shadowMapType = this.getTypeSafe(baseShadowMapType, def, '');
		switch (shadowMapType.toLowerCase()) {
			case 'basicshadowmap':
			case 'basic':
				return N3JS.BasicShadowMap;
			case 'pcfshadowmap':
			case 'pcf':
				return N3JS.PCFShadowMap;
			case 'vsmshadowmap':
			case 'vsm':
				return N3JS.VSMShadowMap;
			case 'pcfsoftshadowmap':
			case 'pcfsoft':
			default:
				return N3JS.PCFSoftShadowMap;
		}
	}

	/**
	 * Gets interpolation
	 * @param [def]
	 * @returns interpolation
	 */
	public static getInterpolationSafe(baseInterpolation: string, def?: string): I3JS.TInterpolationModes {
		const interpolation = this.getTypeSafe(baseInterpolation, def, '');
		switch (interpolation.toLowerCase()) {
			case 'interpolatediscrete':
			case 'discrete':
				return N3JS.InterpolateDiscrete;
			case 'interpolatelinear':
			case 'linear':
				return N3JS.InterpolateLinear;
			case 'interpolatesmooth':
			case 'smooth':
				return N3JS.InterpolateSmooth;
			default:
				return undefined;
		}
	}

	/**
	 * Gets normal map type
	 * @param [def]
	 * @returns normal map type
	 */
	public static getNormalMapTypeSafe(baseNormalMapType: string, def?: string): I3JS.TNormalMapTypes {
		const normalMapType = ThreeUtil.getTypeSafe(baseNormalMapType, def, '');
		switch (normalMapType.toLowerCase()) {
			case 'tangentspace':
				return N3JS.TangentSpaceNormalMap;
			case 'objectspace':
				return N3JS.ObjectSpaceNormalMap;
		}
		return undefined;
	}
	/**
	 * Gets stencil func
	 * @param [def]
	 * @returns stencil func
	 */
	public static getStencilFuncSafe(baseStencilFunc: string, def?: string): I3JS.TStencilFunc {
		const stencilFunc = ThreeUtil.getTypeSafe(baseStencilFunc, def, '');
		switch (stencilFunc.toLowerCase()) {
			case 'never':
				return N3JS.NeverStencilFunc;
			case 'less':
				return N3JS.LessStencilFunc;
			case 'equal':
				return N3JS.EqualStencilFunc;
			case 'lessequal':
				return N3JS.LessEqualStencilFunc;
			case 'greater':
				return N3JS.GreaterStencilFunc;
			case 'notequal':
				return N3JS.NotEqualStencilFunc;
			case 'greaterequal':
				return N3JS.GreaterEqualStencilFunc;
			case 'always':
				return N3JS.AlwaysStencilFunc;
		}
		return undefined;
	}

	/**
	 * Gets stencil fail
	 * @param [def]
	 * @returns stencil fail
	 */
	public static getStencilOpSafe(baseStencilFail: string, def?: string): I3JS.TStencilOp {
		const stencilFail = this.getTypeSafe(baseStencilFail, def, '');
		switch (stencilFail.toLowerCase()) {
			case 'zero':
				return N3JS.ZeroStencilOp;
			case 'keep':
				return N3JS.KeepStencilOp;
			case 'replace':
				return N3JS.ReplaceStencilOp;
			case 'increment':
				return N3JS.IncrementStencilOp;
			case 'decrement':
				return N3JS.DecrementStencilOp;
			case 'incrementwrap':
				return N3JS.IncrementWrapStencilOp;
			case 'decrementwrap':
				return N3JS.DecrementWrapStencilOp;
			case 'invert':
				return N3JS.InvertStencilOp;
		}
		return undefined;
	}

	/**
	 * Which blending to use when displaying objects with this material. Default is {@link NormalBlending}.
	 * @default THREE.NormalBlending
	 *
	 * Notice - case insensitive.
	 *
	 * @param baseBlending
	 * @param [altBlending]
	 * @param [def]
	 * @returns blending safe
	 *
	 * @see THREE.NoBlending - NoBlending, No
	 * @see THREE.NormalBlending - NormalBlending, Normal
	 * @see THREE.AdditiveBlending - AdditiveBlending, Additive
	 * @see THREE.SubtractiveBlending - SubtractiveBlending, Subtractive
	 * @see THREE.MultiplyBlending - MultiplyBlending, Multiply
	 * @see THREE.CustomBlending - CustomBlending, Custom
	 *
	 */
	public static getBlendingSafe(baseBlending: string, altBlending?: string, def?: string): I3JS.TBlending {
		const blending = this.getTypeSafe(baseBlending, altBlending, def || '');
		switch (blending.toLowerCase()) {
			case 'noblending':
			case 'no':
				return N3JS.NoBlending;
			case 'normalblending':
			case 'normal':
				return N3JS.NormalBlending;
			case 'additiveblending':
			case 'additive':
				return N3JS.AdditiveBlending;
			case 'subtractiveblending':
			case 'subtractive':
				return N3JS.SubtractiveBlending;
			case 'multiplyblending':
			case 'multiply':
				return N3JS.MultiplyBlending;
			case 'customblending':
			case 'custom':
				return N3JS.CustomBlending;
		}
		return undefined;
	}

	/**
	 * Gets blend equation
	 * @param [def]
	 * @returns blend equation
	 */
	public static getBlendEquationSafe(baseBlendEquation: string, def?: string): I3JS.TBlendingEquation {
		const blendEquation = this.getTypeSafe(baseBlendEquation, def, '');
		switch (blendEquation.toLowerCase()) {
			case 'add':
				return N3JS.AddEquation;
			case 'subtract':
				return N3JS.SubtractEquation;
			case 'reversesubtract':
				return N3JS.ReverseSubtractEquation;
			case 'min':
				return N3JS.MinEquation;
			case 'max':
				return N3JS.MaxEquation;
		}
		return undefined;
	}

	/**
	 * Which blending to use when displaying objects with this material.
	 * This must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) to use custom [blendSrc](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendSrc), [blendDst](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendDst) or [blendEquation](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendEquation).
	 * See the blending mode [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) for all possible values. Default is [NormalBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials).
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.BlendingDstFactor
	 * @see THREE.ZeroFactor - ZeroFactor , Zero
	 * @see THREE.OneFactor - OneFactor , One
	 * @see THREE.SrcColorFactor - SrcColorFactor , SrcColor
	 * @see THREE.OneMinusSrcColorFactor - OneMinusSrcColorFactor , OneMinusSrcColor
	 * @see THREE.SrcAlphaFactor - SrcAlphaFactor , SrcAlpha
	 * @see THREE.OneMinusSrcAlphaFactor - OneMinusSrcAlphaFactor , OneMinusSrcAlpha
	 * @see THREE.DstAlphaFactor - DstAlphaFactor , DstAlpha
	 * @see THREE.OneMinusDstAlphaFactor - OneMinusDstAlphaFactor , OneMinusDstAlpha
	 * @see THREE.DstColorFactor - DstColorFactor , DstColor
	 * @see THREE.OneMinusDstColorFactor - OneMinusDstColorFactor , OneMinusDstColor
	 *
	 * @param [def]
	 * @returns blend src
	 */
	public static getBlendDstSafe(baseBlendSrc: string, def?: string): I3JS.TBlendingDstFactor {
		const blendSrc = this.getTypeSafe(baseBlendSrc, def, '');
		switch (blendSrc.toLowerCase()) {
			case 'zerofactor':
			case 'zero':
				return N3JS.ZeroFactor;
			case 'onefactor':
			case 'one':
				return N3JS.OneFactor;
			case 'srccolorfactor':
			case 'srccolor':
				return N3JS.SrcColorFactor;
			case 'oneminussrccolorfactor':
			case 'oneminussrccolor':
				return N3JS.OneMinusSrcColorFactor;
			case 'srcalphafactor':
			case 'srcalpha':
				return N3JS.SrcAlphaFactor;
			case 'oneminussrcalphafactor':
			case 'oneminussrcalpha':
				return N3JS.OneMinusSrcAlphaFactor;
			case 'dstalphafactor':
			case 'dstalpha':
				return N3JS.DstAlphaFactor;
			case 'oneminusdstalphafactor':
			case 'oneminusdstalpha':
				return N3JS.OneMinusDstAlphaFactor;
			case 'dstcolorfactor':
			case 'dstcolor':
				return N3JS.DstColorFactor;
			case 'oneminusdstcolorfactor':
			case 'oneminusdstcolor':
				return N3JS.OneMinusDstColorFactor;
		}
		return undefined;
	}

	/**
	 * Which blending to use when displaying objects with this material.
	 * This must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) to use custom [blendSrc](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendSrc), [blendDst](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendDst) or [blendEquation](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendEquation).
	 * See the blending mode [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) for all possible values. Default is [NormalBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials).
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.BlendingDstFactor
	 * @see THREE.ZeroFactor - ZeroFactor , Zero
	 * @see THREE.OneFactor - OneFactor , One
	 * @see THREE.SrcColorFactor - SrcColorFactor , SrcColor
	 * @see THREE.OneMinusSrcColorFactor - OneMinusSrcColorFactor , OneMinusSrcColor
	 * @see THREE.SrcAlphaFactor - SrcAlphaFactor , SrcAlpha
	 * @see THREE.OneMinusSrcAlphaFactor - OneMinusSrcAlphaFactor , OneMinusSrcAlpha
	 * @see THREE.DstAlphaFactor - DstAlphaFactor , DstAlpha
	 * @see THREE.OneMinusDstAlphaFactor - OneMinusDstAlphaFactor , OneMinusDstAlpha
	 * @see THREE.DstColorFactor - DstColorFactor , DstColor
	 * @see THREE.OneMinusDstColorFactor - OneMinusDstColorFactor , OneMinusDstColor
	 *
	 * @param [def]
	 * @returns blend src
	 */
	public static getBlendSrcSafe(baseBlendSrc: string, def?: string): I3JS.TBlendingSrcFactor {
		const blendSrc = this.getTypeSafe(baseBlendSrc, def, '');
		switch (blendSrc.toLowerCase()) {
			case 'srcalphasaturatefactor':
			case 'srcalphasaturate':
				return N3JS.SrcAlphaSaturateFactor;
		}
		return undefined;
	}
	/**
	 * Gets depth func
	 * @param [def]
	 * @returns depth func
	 */
	public static getDepthModesSafe(baseDepthFunc: string, def?: string): I3JS.TDepthModes {
		const depthFunc = ThreeUtil.getTypeSafe(baseDepthFunc, def, '');
		switch (depthFunc.toLowerCase()) {
			case 'never':
				return N3JS.NeverDepth;
			case 'always':
				return N3JS.AlwaysDepth;
			case 'less':
				return N3JS.LessDepth;
			case 'lessequal':
				return N3JS.LessEqualDepth;
			case 'equal':
				return N3JS.EqualDepth;
			case 'greaterequal':
				return N3JS.GreaterEqualDepth;
			case 'greater':
				return N3JS.GreaterDepth;
			case 'notequal':
				return N3JS.NotEqualDepth;
		}
		return undefined;
	}

	/**
	 * Gets precision
	 * @param [def]
	 * @returns precision
	 */
	public static getPrecisionSafe(basePrecision: string, def?: string): 'highp' | 'mediump' | 'lowp' | null {
		const precision = this.getTypeSafe(basePrecision, def, '');
		switch (precision.toLowerCase()) {
			case 'highp':
				return 'highp';
			case 'mediump':
				return 'mediump';
			case 'lowp':
				return 'lowp';
		}
		return undefined;
	}

	/**
	 * Gets pixel format safe
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.PixelFormat
	 * @see THREE.AlphaFormat - AlphaFormat, Alpha
	 * @see THREE.RedFormat - RedFormat, Red
	 * @see THREE.RedIntegerFormat - RedIntegerFormat, RedInteger
	 * @see THREE.RGFormat - RGFormat, RG
	 * @see THREE.RGIntegerFormat - RGIntegerFormat, RGInteger
	 * @see THREE.RGBFormat - RGBFormat, RGB
	 * @see THREE.RGBIntegerFormat - RGBIntegerFormat, RGBInteger
	 * @see THREE.RGBAIntegerFormat - RGBAIntegerFormat, RGBAInteger
	 * @see THREE.LuminanceFormat - LuminanceFormat, Luminance
	 * @see THREE.LuminanceAlphaFormat - LuminanceAlphaFormat, LuminanceAlpha
	 * @see THREE.RGBEFormat - RGBEFormat, RGBE
	 * @see THREE.DepthFormat - DepthFormat, Depth
	 * @see THREE.DepthStencilFormat - DepthStencilFormat, DepthStencil
	 * @see THREE.RGBAFormat - RGBAFormat, RGBA
	 *
	 * @param baseFormat
	 * @param [altFormat]
	 * @param [def]
	 * @returns pixel format safe
	 */
	public static getPixelFormatSafe(baseFormat: string, altFormat?: string, def?: string): I3JS.TPixelFormat {
		const format = this.getTypeSafe(baseFormat, altFormat, def || '');
		switch (format.toLowerCase()) {
			case 'alphaformat':
			case 'alpha':
				return N3JS.AlphaFormat;
			case 'redformat':
			case 'red':
				return N3JS.RedFormat;
			case 'redintegerformat':
			case 'redinteger':
				return N3JS.RedIntegerFormat;
			case 'rgformat':
			case 'rg':
				return N3JS.RGFormat;
			case 'rgintegerformat':
			case 'rginteger':
				return N3JS.RGIntegerFormat;
			case 'rgbformat':
			case 'rgb':
				return N3JS.RGBFormat;
			case 'rgbintegerformat':
			case 'rgbinteger':
				return N3JS.RGBIntegerFormat;
			case 'rgbaintegerformat':
			case 'rgbainteger':
				return N3JS.RGBAIntegerFormat;
			case 'luminanceformat':
			case 'luminance':
				return N3JS.LuminanceFormat;
			case 'luminancealphaformat':
			case 'luminancealpha':
				return N3JS.LuminanceAlphaFormat;
			case 'rgbeformat':
			case 'rgbe':
				return N3JS.RGBEFormat;
			case 'depthformat':
			case 'depth':
				return N3JS.DepthFormat;
			case 'depthstencilformat':
			case 'depthstencil':
				return N3JS.DepthStencilFormat;
			case 'rgbaformat':
			case 'rgba':
				return N3JS.RGBAFormat;
			default:
				break;
		}
		return undefined;
	}

	/**
	 * Gets combine
	 * @param [def]
	 * @returns combine
	 */
	public static getCombineSafe(baseCombine: string, def?: string): I3JS.TCombine {
		const combine = this.getTypeSafe(baseCombine, def, '');
		switch (combine.toLowerCase()) {
			case 'multiplyoperation':
			case 'multiply':
				return N3JS.MultiplyOperation;
			case 'mixoperation':
			case 'mix':
				return N3JS.MixOperation;
			case 'addoperation':
			case 'add':
				return N3JS.AddOperation;
		}
		return undefined;
	}

	/**
	 * Gets depth packing
	 * @param [def]
	 * @returns depth packing
	 */
	public static getDepthPackingSafe(baseDepthPacking: string, def?: string): I3JS.TDepthPackingStrategies {
		const depthPacking = this.getTypeSafe(baseDepthPacking, def, '');
		switch (depthPacking.toLowerCase()) {
			case 'rgba':
			case 'rgbadepth':
				return N3JS.RGBADepthPacking;
			case 'basic':
			case 'basicdepth':
			default:
				return N3JS.BasicDepthPacking;
		}
	}

	/**
	 * Gets glsl version
	 * @param [def]
	 * @returns glsl version
	 */
	public static getGlslVersionSafe(baseGlslVersion: string, def?: string): I3JS.TGLSLVersion {
		const glslVersion = this.getTypeSafe(baseGlslVersion, def, '');
		switch (glslVersion.toLowerCase()) {
			case '1':
			case 'gl1':
			case 'glsl1':
				return N3JS.GLSL1;
			case '3':
			case 'gl3':
			case 'glsl3':
				return N3JS.GLSL3;
		}
		return null;
	}

	/**
	 * Gets blend mode
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.AnimationBlendMode
	 * @see THREE.NormalAnimationBlendMode - NormalAnimationBlendMode, NormalAnimation, Normal
	 * @see THREE.AdditiveAnimationBlendMode - AdditiveAnimationBlendMode, AdditiveAnimation, Additive
	 *
	 * @param [def]
	 * @returns blend mode
	 */
	public static getBlendModeSafe(baseBlendMode: string, def?: string): I3JS.TAnimationBlendMode {
		const blendMode = this.getTypeSafe(baseBlendMode, def, '');
		switch (blendMode.toLowerCase()) {
			case 'normalanimationblendmode':
			case 'normalanimation':
			case 'normal':
				return N3JS.NormalAnimationBlendMode;
			case 'additiveanimationblendmode':
			case 'additiveanimation':
			case 'additive':
				return N3JS.AdditiveAnimationBlendMode;
		}
		return N3JS.NormalAnimationBlendMode;
	}

	/**
	 * Gets loop
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.AnimationActionLoopStyles
	 * @see THREE.LoopOnce - LoopOnce, Once
	 * @see THREE.LoopRepeat - LoopRepeat, Repeat
	 * @see THREE.LoopPingPong - LoopPingPong, PingPong
	 *
	 * @param [def]
	 * @returns loop
	 */
	public static getLoopSafe(baseLoop: string, def?: string): I3JS.TAnimationActionLoopStyles {
		const loop = this.getTypeSafe(baseLoop, def, '');
		switch (loop.toLowerCase()) {
			case 'looponce':
			case 'once':
				return N3JS.LoopOnce;
			case 'looppingpong':
			case 'pingpong':
				return N3JS.LoopPingPong;
			case 'looprepeat':
			case 'repeat':
			default:
				return N3JS.LoopRepeat;
		}
	}

	/**
	 * Gets usage
	 * @param [def]
	 * @returns usage
	 */
	public static getUsageSafe(baseUsage: string, def?: string): I3JS.TUsage {
		const usage = ThreeUtil.getTypeSafe(baseUsage, def, '');
		switch (usage.toLowerCase()) {
			case 'streamdrawusage':
			case 'streamdraw':
				return N3JS.StreamDrawUsage;
			case 'staticreadusage':
			case 'staticread':
				return N3JS.StaticReadUsage;
			case 'dynamicreadusage':
			case 'dynamicread':
				return N3JS.DynamicReadUsage;
			case 'streamreadusage':
			case 'streamread':
				return N3JS.StreamReadUsage;
			case 'staticcopyusage':
			case 'staticcopy':
				return N3JS.StaticCopyUsage;
			case 'dynamiccopyusage':
			case 'dynamiccopy':
				return N3JS.DynamicCopyUsage;
			case 'streamcopyusage':
			case 'streamcopy':
				return N3JS.StreamCopyUsage;
			case 'staticdrawusage':
			case 'staticdraw':
				return N3JS.StaticDrawUsage;
			case 'dynamicdrawusage':
			case 'dynamicdraw':
			default:
				return N3JS.DynamicDrawUsage;
		}
	}

	/**
	 * Gets texture data type safe
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.TextureDataType
	 * @see THREE.ByteType - ByteType, Byte
	 * @see THREE.ShortType - ShortType, Short
	 * @see THREE.UnsignedShortType - UnsignedShortType, UnsignedShort
	 * @see THREE.IntType - IntType, Int
	 * @see THREE.UnsignedIntType - UnsignedIntType, UnsignedInt
	 * @see THREE.FloatType - FloatType, Float
	 * @see THREE.HalfFloatType - HalfFloatType, HalfFloat
	 * @see THREE.UnsignedShort4444Type - UnsignedShort4444Type, UnsignedShort4444
	 * @see THREE.UnsignedShort5551Type - UnsignedShort5551Type, UnsignedShort5551
	 * @see THREE.UnsignedShort565Type - UnsignedShort565Type, UnsignedShort565
	 * @see THREE.UnsignedInt248Type - UnsignedInt248Type, UnsignedInt248
	 * @see THREE.UnsignedByteType - UnsignedByteType, UnsignedByte
	 *
	 * @param baseFormat
	 * @param [altFormat]
	 * @param [def]
	 * @returns texture data type safe
	 */
	public static getTextureDataTypeSafe(baseFormat: string, altFormat?: string, def?: string): I3JS.TTextureDataType {
		const type = this.getTypeSafe(baseFormat, altFormat, def || '');
		switch (type.toLowerCase()) {
			case 'bytetype':
			case 'byte':
				return N3JS.ByteType;
			case 'shorttype':
			case 'short':
				return N3JS.ShortType;
			case 'unsignedshorttype':
			case 'unsignedshort':
				return N3JS.UnsignedShortType;
			case 'inttype':
			case 'int':
				return N3JS.IntType;
			case 'unsignedinttype':
			case 'unsignedint':
				return N3JS.UnsignedIntType;
			case 'floattype':
			case 'float':
				return N3JS.FloatType;
			case 'halffloattype':
			case 'halffloat':
				return N3JS.HalfFloatType;
			case 'unsignedshort4444type':
			case 'unsignedshort4444':
				return N3JS.UnsignedShort4444Type;
			case 'unsignedshort5551type':
			case 'unsignedshort5551':
				return N3JS.UnsignedShort5551Type;
			case 'unsignedshort565type':
			case 'unsignedshort565':
				return N3JS.UnsignedShort565Type;
			case 'unsignedint248type':
			case 'unsignedint248':
				return N3JS.UnsignedInt248Type;
			case 'unsignedbytetype':
			case 'unsignedbyte':
				return N3JS.UnsignedByteType;
			default:
				return undefined;
		}
	}

	/**
	 * Gets object3d
	 * @template T
	 * @param object3d
	 * @param [isRequired]
	 * @returns object3d
	 */
	public static getObject3d<T extends I3JS.IObject3D>(object3d: any, isRequired: boolean = true): T {
		if (object3d instanceof N3JS.Object3D) {
			return object3d as T;
		} else if (this.isNotNull(object3d.getMesh)) {
			const mesh: I3JS.IObject3D = object3d.getMesh();
			if (mesh !== null && this.isNotNull(mesh.userData.refTarget)) {
				return mesh.userData.refTarget as T;
			} else {
				return mesh as T;
			}
		} else if (this.isNotNull(object3d.getLight)) {
			return object3d.getLight() as T;
		} else if (this.isNotNull(object3d.getHelper)) {
			return object3d.getHelper() as T;
		} else if (this.isNotNull(object3d.getAudio)) {
			return object3d.getAudio() as T;
		} else if (this.isNotNull(object3d.getCamera)) {
			return object3d.getCamera() as T;
		} else if (this.isNotNull(object3d.getScene)) {
			return object3d.getScene() as T;
		} else if (this.isNotNull(object3d.getMesh)) {
			return object3d.getMesh() as T;
		} else if (this.isNotNull(object3d.getObject3d)) {
			return object3d.getObject3d() as T;
		}
		if (!isRequired) {
			return null;
		}
		return new N3JS.Object3D() as T;
	}

	/**
	 * Gets mesh find
	 * @param mesh
	 * @returns mesh find
	 */
	public static getMeshFind(mesh: any): I3JS.IMesh {
		if (mesh instanceof N3JS.Mesh) {
			return mesh;
		} else if (this.isNotNull(mesh.getHelper)) {
			mesh = mesh.getHelper();
		} else if (this.isNotNull(mesh.getMesh)) {
			mesh = mesh.getObject3d();
		} else if (this.isNotNull(mesh)) {
			mesh = this.getObject3d(mesh);
		}
		if (mesh instanceof N3JS.Mesh) {
			return mesh;
		} else if (mesh instanceof N3JS.Group) {
			let childMesh: I3JS.IMesh = null;
			mesh.children.forEach((child) => {
				if (childMesh === null && child instanceof N3JS.Mesh) {
					childMesh = child;
				}
			});
			if (childMesh !== null) {
				return childMesh;
			}
		}
		return null;
	}

	/**
	 * Gets mesh
	 * @param mesh
	 * @returns mesh
	 */
	public static getMesh(mesh: any): I3JS.IMesh {
		const findedMesh = this.getMeshFind(mesh);
		if (findedMesh !== null) {
			return findedMesh;
		}
		return new N3JS.Mesh();
	}

	/**
	 * Gets light
	 * @param light
	 * @returns light
	 */
	public static getLight(light: any): I3JS.ILight {
		if (light instanceof N3JS.Light) {
			return light;
		} else if (this.isNotNull(light)) {
			const mesh = this.getObject3d(light);
			if (mesh instanceof N3JS.Light) {
				return mesh;
			}
		}
		return new N3JS.Light();
	}

	/**
	 * Gets material by type
	 * @param material
	 * @param [materialType]
	 * @returns material by type
	 */
	public static getMaterialByType(material: any, materialType?: string): I3JS.IMaterial {
		let matchedMat: I3JS.IMaterial = null;
		if (this.isNotNull(materialType) && materialType != '') {
			const matList = this.getMaterial(material);
			if (Array.isArray(matList)) {
				matList.forEach((mat) => {
					if (
						(this.isNull(mat.userData.materialType) || materialType.toLowerCase() === mat.userData.materialType) &&
						(this.isNull(mat.userData.refName) || mat.userData.refName == '')
					) {
						matchedMat = mat;
					}
				});
			} else if (
				(this.isNull(matList.userData.materialType) || materialType.toLowerCase() === matList.userData.materialType) &&
				(this.isNull(matList.userData.refName) || matList.userData.refName == '')
			) {
				matchedMat = matList;
			}
		} else {
			const matList = this.getMaterial(material);
			if (Array.isArray(matList)) {
				if (matList.length > 0) {
					matchedMat = matList[0];
				}
			} else {
				matchedMat = matList;
			}
		}
		return matchedMat;
	}

	/**
	 * Gets material
	 * @param material
	 * @returns material
	 */
	public static getMaterial(material: any): I3JS.IMaterial | I3JS.IMaterial[] {
		if (material instanceof N3JS.Material) {
			return material;
		} else if (Array.isArray(material)) {
			return material;
		} else if (this.isNotNull(material.getMaterial)) {
			return material.getMaterial() as I3JS.IMaterial;
		} else if (this.isNotNull(material)) {
			const mesh = this.getObject3d(material);
			if (mesh instanceof N3JS.Mesh) {
				if (this.isNotNull(material.material)) {
					return material.material;
				}
			}
		}
		return new N3JS.Material();
	}

	/**
	 * Gets material one
	 * @param material
	 * @returns material one
	 */
	public static getMaterialOne(material: any): I3JS.IMaterial {
		const materialList = this.getMaterial(material);
		if (Array.isArray(materialList)) {
			if (materialList.length > 0) {
				materialList[0];
			}
		} else {
			return materialList;
		}
		return new N3JS.Material();
	}

	/**
	 * Gets geometry
	 *
	 * @param geometry
	 * @returns geometry
	 */
	public static getGeometry(geometry: any): I3JS.IBufferGeometry {
		if (this.isNotNull(geometry)) {
			if (geometry instanceof N3JS.BufferGeometry) {
				return geometry;
			} else if (this.isNotNull(geometry.getGeometry)) {
				return geometry.getGeometry();
			} else {
				const mesh = this.getObject3d(geometry);
				if (mesh instanceof N3JS.Mesh) {
					if (this.isNotNull(mesh.geometry)) {
						return mesh.geometry;
					}
				}
			}
		}
		return new N3JS.BufferGeometry();
	}

	/**
	 * Loaded component of three util
	 */
	private static loadedComponent: { [key: string]: any } = {};

	/**
	 * Sets three component
	 * @param key
	 * @param [object]
	 */
	public static setThreeComponent(key: string, object?: any) {
		if (this.isNotNull(object)) {
			this.loadedComponent[key] = object;
		} else {
			delete this.loadedComponent[key];
		}
	}

	/**
	 * Determines whether three component is
	 * @param object
	 * @param [key]
	 * @returns true if three component
	 */
	public static isThreeComponent(object: any, key: string = 'component'): boolean {
		if (this.isNotNull(object.getObject3d)) {
			return true;
		} else if (this.isNotNull(object.userData) && this.isNotNull(object.userData[key])) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Gets three component
	 * @param object
	 * @returns three component
	 */
	public static getThreeComponent(object: any): any {
		if (this.isNotNull(object.getObject3d)) {
			return object;
		}
		if (this.isThreeComponent(object, 'component')) {
			if (this.isNotNull(this.loadedComponent[object.userData.component])) {
				return this.loadedComponent[object.userData.component];
			} else {
				console.log(object.userData.component, this.loadedComponent);
			}
		}
		return null;
	}

	/**
	 * Gets rigidbody component
	 * @param object
	 * @returns rigidbody component
	 */
	public static getRigidbodyComponent(object: any): any {
		if (this.isNotNull(object.getRigidBody)) {
			return object;
		}
		if (this.isThreeComponent(object, 'rigidBody')) {
			if (this.isNotNull(object.getUserData)) {
				const userData = object.getUserData();
				if (this.isNotNull(userData.rigidBody)) {
					return this.loadedComponent[userData.rigidBody] || null;
				}
			} else {
				return this.loadedComponent[object.userData.rigidBody] || null;
			}
		}
		return null;
	}

	/**
	 * Gets rigidbody
	 * @param object
	 * @returns rigidbody
	 */
	public static getRigidbody(object: any): Ammo.btRigidBody {
		const rigidbodyComponent = this.getRigidbodyComponent(object);
		if (rigidbodyComponent !== null && this.isNotNull(rigidbodyComponent.getRigidBody)) {
			const rigidBody = rigidbodyComponent.getRigidBody();
			if (this.isNotNull(rigidBody) && this.isNotNull(rigidBody.rigidBodies) && rigidBody.rigidBodies.length > 0) {
				return rigidBody.rigidBodies[0];
			}
		}
		return null;
	}

	/**
	 * Sets subscribe next
	 * @param object
	 * @param key
	 */
	public static setSubscribeNext(object: any, key: string | string[]) {
		if (this.isNotNull(object.setSubscribeNext)) {
			object.setSubscribeNext(key);
		} else if (this.isThreeComponent(object)) {
			const threeComponent = this.getThreeComponent(object);
			if (this.isNotNull(threeComponent)) {
				this.setSubscribeNext(threeComponent, key);
			}
		} else {
			// console.error(object);
		}
	}

	/**
	 * Gets subscribe
	 * @param object
	 * @param callBack
	 * @param nextKey
	 * @returns subscribe
	 */
	public static getSubscribe(object: any, callBack: (key?: string) => void, nextKey: string): Subscription {
		if (this.isNull(object)) {
			return null;
		}
		if (this.isThreeComponent(object)) {
			const threeComponent = this.getThreeComponent(object);
			if (this.isNotNull(threeComponent) && this.isNotNull(threeComponent.getSubscribe)) {
				object = threeComponent;
			}
		}
		if (this.isNotNull(object.getSubscribe)) {
			return (object.getSubscribe() as Observable<string[]>).subscribe((keyList: string[]) => {
				if (this.isNull(nextKey)) {
					callBack('anyevent');
				} else {
					switch (nextKey.toLowerCase()) {
						case 'lookat':
							if (this.isIndexOf(keyList, ['object3d', 'mesh', 'position', 'lookat'])) {
								callBack('lookat');
							}
							break;
						case 'position':
							if (this.isIndexOf(keyList, ['object3d', 'mesh', 'position'])) {
								callBack('position');
							}
							break;
						case 'rotation':
							if (this.isIndexOf(keyList, ['object3d', 'mesh', 'rotation'])) {
								callBack('rotation');
							}
							break;
						case 'scale':
							if (this.isIndexOf(keyList, ['object3d', 'mesh', 'scale'])) {
								callBack('scale');
							}
							break;
						case 'geometry':
							if (this.isIndexOf(keyList, ['object3d', 'mesh', 'geometry', 'loaded'])) {
								callBack('geometry');
							}
							break;
						case 'material':
							if (this.isIndexOf(keyList, ['object3d', 'mesh', 'material', 'loaded'])) {
								callBack('material');
							}
							break;
						case 'texture':
							if (this.isIndexOf(keyList, ['object3d', 'mesh', 'material', 'texture', 'loaded'])) {
								callBack('texture');
							}
							break;
						default:
							if (keyList.indexOf(nextKey.toLowerCase()) > -1) {
								callBack(nextKey);
							}
							break;
					}
				}
			});
		}
		return null;
	}

	/**
	 * Gets texture
	 * @param texture
	 * @param [refType]
	 * @param [isRequired]
	 * @returns texture
	 */
	public static getTexture(texture: any, refType: string = 'map', isRequired: boolean = true): I3JS.ITexture {
		if (texture instanceof N3JS.Texture) {
			return texture;
		} else if (texture instanceof N3JS.Object3D || this.isNotNull(texture.getObject3d)) {
			const pmremGenerator = ThreeUtil.getPmremGenerator();
			const pmremGeneratorTexture = pmremGenerator.fromScene(
				texture instanceof N3JS.Object3D ? texture : texture.getObject3d()
			).texture;
			pmremGenerator.dispose();
			return pmremGeneratorTexture;
		} else if (this.isNotNull(texture.getTexture)) {
			const foundTexture = texture.getTexture();
			if (!(foundTexture instanceof N3JS.VideoTexture) || foundTexture.image.readyState > 0) {
				return foundTexture;
			}
		} else if (this.isNotNull(texture)) {
			const material: any = this.getMaterial(texture);
			if (Array.isArray(material) && material.length > 0) {
				const firstMaterial: any = material[0];
				if (this.isNotNull(firstMaterial[refType]) && firstMaterial[refType] instanceof N3JS.Texture) {
					return firstMaterial[refType];
				}
			} else {
				if (this.isNotNull(material[refType]) && material[refType] instanceof N3JS.Texture) {
					return material[refType];
				}
			}
		}
		if (!isRequired) {
			return null;
		}
		return new N3JS.Texture();
	}

	/**
	 * Gets position
	 * @param position
	 * @returns position
	 */
	public static getPosition(position: any): I3JS.IVector3 {
		if (this.isNotNull(position)) {
			if (position instanceof N3JS.Vector3) {
				return position;
			} else if (Array.isArray(position) && position.length >= 3) {
				return this.getVector3Safe(position[0], position[1], position[2], null, null, true);
			} else if (this.isNotNull(position.getPosition)) {
				return position.getPosition();
			} else if (this.isNotNull(position.getLookAt)) {
				return position.getLookAt();
			} else if (this.isNotNull(position.x) && this.isNotNull(position.y) && this.isNotNull(position.z)) {
				return this.getVector3Safe(position.x, position.y, position.z, null, null, true);
			} else {
				const object3d = this.getObject3d(position);
				return object3d.position;
			}
		}
		return new N3JS.Vector3();
	}

	/**
	 * Gets rotation
	 * @param rotation
	 * @returns rotation
	 */
	public static getRotation(rotation: any): I3JS.IEuler {
		if (this.isNotNull(rotation)) {
			if (rotation instanceof N3JS.Euler) {
				return rotation;
			} else if (Array.isArray(rotation) && rotation.length >= 3) {
				return this.getEulerSafe(rotation[0], rotation[1], rotation[2], null, true);
			} else if (this.isNotNull(rotation.getRotation)) {
				return rotation.getRotation();
			} else if (this.isNotNull(rotation.x) && this.isNotNull(rotation.y) && this.isNotNull(rotation.z)) {
				if (this.isNotNull(rotation.isEuler) && rotation.isEuler) {
					return new N3JS.Euler(rotation.x, rotation.y, rotation.z);
				} else {
					return this.getEulerSafe(rotation.x, rotation.y, rotation.z, null, true);
				}
			} else {
				const object3d = this.getObject3d(rotation);
				return object3d.rotation;
			}
		}
		return new N3JS.Euler();
	}

	/**
	 * Gets scale
	 * @param scale
	 * @returns scale
	 */
	public static getScale(scale: any): I3JS.IVector3 {
		if (this.isNotNull(scale)) {
			if (scale instanceof N3JS.Vector3) {
				return scale;
			} else if (Array.isArray(scale) && scale.length >= 3) {
				return this.getVector3Safe(scale[0], scale[1], scale[2], null, null, true);
			} else if (this.isNotNull(scale.getScale)) {
				return scale.getScale();
			} else if (this.isNotNull(scale.x) && this.isNotNull(scale.y) && this.isNotNull(scale.z)) {
				return this.getVector3Safe(scale.x, scale.y, scale.z, null, null, true);
			} else {
				const object3d = this.getObject3d(scale);
				return object3d.scale;
			}
		}
		return new N3JS.Vector3(1, 1, 1);
	}

	/**
	 * Gets look at
	 * @param lookat
	 * @returns look at
	 */
	public static getLookAt(lookat: any): I3JS.IVector3 {
		if (this.isNotNull(lookat)) {
			if (lookat instanceof N3JS.Vector3) {
				return lookat;
			} else if (Array.isArray(lookat) && lookat.length >= 3) {
				return this.getVector3Safe(lookat[0], lookat[1], lookat[2], null, null, true);
			} else if (this.isNotNull(lookat.getLookAt)) {
				return lookat.getLookAt();
			} else if (this.isNotNull(lookat.getPosition)) {
				return lookat.getPosition();
			} else if (this.isNotNull(lookat.x) && this.isNotNull(lookat.y) && this.isNotNull(lookat.z)) {
				return this.getVector3Safe(lookat.x, lookat.y, lookat.z, null, null, true);
			} else {
				return this.getObject3d(lookat).position;
			}
		}
		return new N3JS.Vector3();
	}

	/**
	 * Determines whether texture loaded is
	 * @param texture
	 * @returns true if texture loaded
	 */
	public static isTextureLoaded(texture: I3JS.ITexture): boolean {
		if (texture instanceof N3JS.CubeTexture || (texture as any)['isCubeTexture']) {
			if (this.isNotNull(texture.image) && texture.image.length >= 6) {
				return true;
			}
		}
		if (texture instanceof N3JS.CompressedTexture || (texture as any)['isCompressedTexture']) {
			return true;
		}
		if (texture instanceof N3JS.DataTexture || (texture as any)['isDataTexture']) {
			if (this.isNotNull(texture.image) && this.isNotNull(texture.image.data) && texture.image.data.length > 0) {
				return true;
			}
		}
		if (texture instanceof N3JS.VideoTexture || (texture as any)['isVideoTexture']) {
			if (this.isNotNull(texture.image) && texture.image instanceof HTMLVideoElement && texture.image.error === null) {
				return true;
			}
		}
		if (texture instanceof N3JS.Texture && this.isNotNull(texture.image)) {
			if (
				texture.image instanceof HTMLImageElement ||
				texture.image instanceof HTMLCanvasElement ||
				texture.image instanceof HTMLVideoElement
			) {
				return true;
			}
			if (Array.isArray(texture.image) && texture.image.length >= 6) {
				return true;
			}
			if (ThreeUtil.isNotNull(texture.image.data) && texture.image.data.length > 0) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Gets texture encoding safe
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.TextureEncoding
	 * @see THREE.sRGBEncoding - sRGBEncoding, sRGB
	 * @see THREE.GammaEncoding - GammaEncoding, Gamma
	 * @see THREE.RGBEEncoding - RGBEEncoding, RGBE
	 * @see THREE.LogLuvEncoding - LogLuvEncoding, LogLuv
	 * @see THREE.RGBM7Encoding - RGBM7Encoding, RGBM7
	 * @see THREE.RGBM16Encoding - RGBM16Encoding, RGBM16
	 * @see THREE.RGBDEncoding - RGBDEncoding, RGBD
	 * @see THREE.LinearEncoding - LinearEncoding, Linear
	 *
	 * @param baseEncoding
	 * @param [altEncoding]
	 * @param [def]
	 * @returns texture encoding safe
	 */
	public static getTextureEncodingSafe(
		baseEncoding: string,
		altEncoding?: string,
		def?: string
	): I3JS.TTextureEncoding {
		const encoding = this.getTypeSafe(baseEncoding, altEncoding, def || '');
		switch (encoding.toLowerCase()) {
			case 'srgbencoding':
			case 'srgb':
				return N3JS.sRGBEncoding;
			case 'gammaencoding':
			case 'gamma':
				return N3JS.GammaEncoding;
			case 'rgbeencoding':
			case 'rgbe':
				return N3JS.RGBEEncoding;
			// case 'logluvencoding':
			// case 'logluv':
			//	return THREE.LogLuvEncoding;
			case 'rgbm7encoding':
			case 'rgbm7':
				return N3JS.RGBM7Encoding;
			case 'rgbm16encoding':
			case 'rgbm16':
				return N3JS.RGBM16Encoding;
			case 'rgbdencoding':
			case 'rgbd':
				return N3JS.RGBDEncoding;
			case 'linearencoding':
			case 'linear':
				return N3JS.LinearEncoding;
			default:
				return undefined;
		}
	}

	/**
	 * Gets mapping safe
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.Mapping
	 * @see THREE.UVMapping - UVMapping, UV
	 * @see THREE.CubeReflectionMapping - CubeReflectionMapping, CubeReflection
	 * @see THREE.CubeRefractionMapping - CubeRefractionMapping, CubeRefraction
	 * @see THREE.EquirectangularReflectionMapping - EquirectangularReflectionMapping, EquirectangularReflection
	 * @see THREE.EquirectangularRefractionMapping - EquirectangularRefractionMapping, EquirectangularRefraction
	 * @see THREE.CubeUVReflectionMapping - CubeUVReflectionMapping, CubeUVReflection
	 * @see THREE.CubeUVRefractionMapping - CubeUVRefractionMapping, CubeUVRefraction
	 *
	 * @param baseMapping
	 * @param [altMapping]
	 * @param [def]
	 * @returns mapping safe
	 */
	public static getMappingSafe(baseMapping: string, altMapping?: string, def?: string): I3JS.TMapping {
		const mapping = this.getTypeSafe(baseMapping, altMapping, def || '');
		switch (mapping.toLowerCase()) {
			case 'uvmapping':
			case 'uv':
				return N3JS.UVMapping;
			case 'cubereflectionmapping':
			case 'cubereflection':
				return N3JS.CubeReflectionMapping;
			case 'cuberefractionmapping':
			case 'cuberefraction':
				return N3JS.CubeRefractionMapping;
			case 'equirectangularreflectionmapping':
			case 'equirectangularreflection':
				return N3JS.EquirectangularReflectionMapping;
			case 'equirectangularrefractionmapping':
			case 'equirectangularrefraction':
				return N3JS.EquirectangularRefractionMapping;
			case 'cubeuvreflectionmapping':
			case 'cubeuvreflection':
				return N3JS.CubeUVReflectionMapping;
			case 'cubeuvrefractionmapping':
			case 'cubeuvrefraction':
				return N3JS.CubeUVRefractionMapping;
			default:
				return N3JS.DEFAULT_MAPPING;
		}
	}

	/**
	 * Gets cube image
	 * @param cubeImage
	 * @returns cube image
	 */
	public static getCubeImage(cubeImage: string[]): string[] {
		if (ThreeUtil.isNotNull(cubeImage) && cubeImage.length !== 6 && cubeImage.length >= 1) {
			const prefix = cubeImage[0];
			const postfix = cubeImage[1] || 'png';
			const prefix1 = cubeImage[2] || 'p';
			const prefix2 = cubeImage[3] || 'n';
			return [
				prefix + prefix1 + 'x.' + postfix,
				prefix + prefix2 + 'x.' + postfix,
				prefix + prefix1 + 'y.' + postfix,
				prefix + prefix2 + 'y.' + postfix,
				prefix + prefix1 + 'z.' + postfix,
				prefix + prefix2 + 'z.' + postfix,
			];
		} else {
			return cubeImage;
		}
	}

	/**
	 * Gets clock
	 * @param [autoStart]
	 * @returns clock
	 */
	public static getClock(autoStart?: boolean): ThreeClock {
		return new ThreeClock(autoStart);
	}

	/**
	 * The Stats of three util
	 */
	public static stats: ThreeStats = null;

	/**
	 * Gets stats
	 * @param [style]
	 * @returns stats
	 */
	public static getStats(style?: object): ThreeStats {
		return new ThreeStats(style);
	}

	/**
	 * Gets controls
	 * @template T
	 * @param param
	 * @param component
	 * @returns controls
	 */
	public static getControls<T>(
		param: T,
		component: { mesh?: MeshComponent; controls?: any; controlsParams?: any },
		addBaseParam: boolean = true
	): T & GuiBaseControl {
		const baseControl: GuiBaseControl = {
			meshShape: {
				visible: true,
				helperVisible: false,
				wireframe: false,
			},
			meshRotate: {
				x: 0,
				y: 0,
				z: 0,
				autoRotate: false,
				speed: 10,
				reset: () => {
					if (
						this.isNotNull(component.controls) &&
						this.isNotNull(component.controls.meshRotate) &&
						this.isNotNull(component.controls.meshRotateOrg)
					) {
						component.controls.meshRotate.x = component.controls.meshRotateOrg.x;
						component.controls.meshRotate.y = component.controls.meshRotateOrg.y;
						component.controls.meshRotate.z = component.controls.meshRotateOrg.z;
						component.controls.meshRotate.autoRotate = true;
						component.controls.meshRotate.applyAutoRotate();
						component.controls.meshRotate.update();
					}
				},
				applyAutoRotate: () => {
					if (this.isNotNull(component.controlsParams)) {
						const controlsParams = this.getGuiControlParam(component.controlsParams, 'Mesh Rotation');
						if (this.isNotNull(controlsParams)) {
							if (component.controls.meshRotate.autoRotate) {
								this.setGuiEnabled(controlsParams.children[1].controller, false);
								this.setGuiEnabled(controlsParams.children[4].controller, true);
							} else {
								if (this.isNotNull(component.mesh)) {
									const meshRotate = component.mesh.getRotation();
									component.controls.meshRotate.x = ((meshRotate.x / Math.PI) * 180) % 360;
									component.controls.meshRotate.y = ((meshRotate.y / Math.PI) * 180) % 360;
									component.controls.meshRotate.z = ((meshRotate.z / Math.PI) * 180) % 360;
								}
								this.setGuiEnabled(controlsParams.children[1].controller, true);
								this.setGuiEnabled(controlsParams.children[4].controller, false);
							}
						}
					}
				},
				update: () => {
					if (this.isNotNull(component.mesh) && this.isNotNull(component.controls.meshRotate)) {
						component.mesh.setRotation(
							component.controls.meshRotate.x,
							component.controls.meshRotate.autoRotate ? null : component.controls.meshRotate.y,
							component.controls.meshRotate.z
						);
					}
				},
			},
			meshPosition: {
				x: 0,
				y: 0,
				z: 0,
				reset: () => {
					if (
						this.isNotNull(component.controls) &&
						this.isNotNull(component.controls.meshPosition) &&
						this.isNotNull(component.controls.meshPositionOrg)
					) {
						component.controls.meshPosition.x = component.controls.meshPositionOrg.x;
						component.controls.meshPosition.y = component.controls.meshPositionOrg.y;
						component.controls.meshPosition.z = component.controls.meshPositionOrg.z;
						component.controls.meshPosition.update();
					}
				},
				update: () => {
					if (this.isNotNull(component.mesh) && this.isNotNull(component.controls.meshPosition)) {
						component.mesh.setPosition(
							component.controls.meshPosition.x,
							component.controls.meshPosition.y,
							component.controls.meshPosition.z
						);
					}
				},
			},
			meshScale: {
				x: 1,
				y: 1,
				z: 1,
				reset: () => {
					if (
						this.isNotNull(component.controls) &&
						this.isNotNull(component.controls.meshScale) &&
						this.isNotNull(component.controls.meshScaleOrg)
					) {
						component.controls.meshScale.x = component.controls.meshScaleOrg.x;
						component.controls.meshScale.y = component.controls.meshScaleOrg.y;
						component.controls.meshScale.z = component.controls.meshScaleOrg.z;
						component.controls.meshScale.update();
					}
				},
				update: () => {
					if (this.isNotNull(component.mesh) && this.isNotNull(component.controls.meshScale)) {
						component.mesh.setScale(
							component.controls.meshScale.x,
							component.controls.meshScale.y,
							component.controls.meshScale.z
						);
					}
				},
			},
		};
		if (addBaseParam) {
			return Object.assign(param, baseControl);
		} else {
			return Object.assign(param, {});
		}
	}

	/**
	 * Gets controls params
	 * @param params
	 * @param component
	 * @returns controls params
	 */
	public static getControlsParams(
		params: GuiControlParam[],
		component: { mesh?: MeshComponent; controls?: any; controlsParams?: any },
		addBaseParam: boolean = true
	): GuiControlParam[] {
		if (addBaseParam) {
			params.push({
				name: 'Mesh Visible',
				type: 'folder',
				control: 'meshShape',
				children: [
					{
						name: 'visible',
						type: 'checkbox',
						listen: true,
						change: () => {
							if (this.isNotNull(component.mesh)) {
								component.mesh.setVisible(component.controls.meshShape.visible, null);
							}
						},
					},
					{
						name: 'helperVisible',
						type: 'checkbox',
						listen: true,
						change: () => {
							if (this.isNotNull(component.mesh)) {
								component.mesh.setVisible(null, component.controls.meshShape.helperVisible);
							}
						},
					},
					{
						name: 'wireframe',
						type: 'checkbox',
						listen: true,
						change: () => {
							if (this.isNotNull(component.mesh)) {
								component.mesh.setWireFrame(component.controls.meshShape.wireframe);
							}
						},
					},
				],
				isOpen: false,
			});
			params.push({
				name: 'Mesh Rotation',
				type: 'folder',
				control: 'meshRotate',
				children: [
					{
						name: 'x',
						type: 'number',
						min: -360,
						max: 360,
						step: 5,
						listen: true,
						change: () => {
							component.controls.meshRotate.update();
						},
					},
					{
						name: 'y',
						type: 'number',
						min: -360,
						max: 360,
						step: 5,
						listen: true,
						change: () => {
							component.controls.meshRotate.update();
						},
					},
					{
						name: 'z',
						type: 'number',
						min: -360,
						max: 360,
						step: 5,
						listen: true,
						change: () => {
							component.controls.meshRotate.update();
						},
					},
					{
						name: 'autoRotate',
						type: 'checkbox',
						title: 'Auto Rotation',
						listen: true,
						change: () => {
							component.controls.meshRotate.applyAutoRotate();
						},
					},
					{
						name: 'speed',
						type: 'number',
						min: -90,
						max: 90,
						step: 1,
						listen: true,
						title: 'Auto DegPSec',
					},
					{ name: 'reset', type: 'button', title: 'Reset Rotation' },
				],
				isOpen: false,
			});
			params.push({
				name: 'Mesh Position',
				type: 'folder',
				control: 'meshPosition',
				children: [
					{
						name: 'x',
						type: 'number',
						min: -3,
						max: 3,
						step: 0.01,
						listen: true,
						change: () => {
							component.controls.meshPosition.update();
						},
					},
					{
						name: 'y',
						type: 'number',
						min: -3,
						max: 3,
						step: 0.01,
						listen: true,
						change: () => {
							component.controls.meshPosition.update();
						},
					},
					{
						name: 'z',
						type: 'number',
						min: -3,
						max: 3,
						step: 0.01,
						listen: true,
						change: () => {
							component.controls.meshPosition.update();
						},
					},
					{ name: 'reset', type: 'button', title: 'Reset Position' },
				],
				isOpen: false,
			});
			params.push({
				name: 'Mesh Scale',
				type: 'folder',
				control: 'meshScale',
				children: [
					{
						name: 'x',
						type: 'number',
						min: 0.001,
						max: 5,
						step: 0.001,
						listen: true,
						change: () => {
							component.controls.meshScale.update();
						},
					},
					{
						name: 'y',
						type: 'number',
						min: 0.001,
						max: 5,
						step: 0.001,
						listen: true,
						change: () => {
							component.controls.meshScale.update();
						},
					},
					{
						name: 'z',
						type: 'number',
						min: 0.001,
						max: 5,
						step: 0.001,
						listen: true,
						change: () => {
							component.controls.meshScale.update();
						},
					},
					{ name: 'reset', type: 'button', title: 'Reset Scale' },
				],
				isOpen: false,
			});
		}
		return params;
	}

	/**
	 * Gets controls on render
	 * @param timer
	 * @param component
	 */
	public static getControlsOnRender(
		timer: RendererTimer,
		component: {
			mesh?: MeshComponent;
			controls?: GuiBaseControl;
			controlsParams?: any;
		}
	) {
		if (
			this.isNotNull(component.controls) &&
			this.isNotNull(component.mesh) &&
			component.controls.meshRotate !== undefined
		) {
			if (component.controls.meshRotate.autoRotate && component.controls.meshRotate.speed !== 0) {
				component.mesh.addRotation(0, component.controls.meshRotate.speed * timer.delta, 0);
			}
		}
	}

	/**
	 * Setups gui change
	 * @param control
	 * @param [onFinishChange]
	 * @param [onChange]
	 * @param [listen]
	 * @param [title]
	 * @returns gui change
	 */
	public static setupGuiChange(
		control: ThreeGuiController,
		onFinishChange?: (value?: any) => void,
		onChange?: (value?: any) => void,
		listen?: boolean,
		title?: string
	): ThreeGuiController {
		if (listen !== null && listen !== undefined && listen) {
			control.listen();
		}
		if (onFinishChange !== null && onFinishChange !== undefined) {
			control.onFinishChange(onFinishChange);
		}
		if (onChange !== null && onChange !== undefined) {
			control.onChange(onChange);
		}
		if (title !== null && title !== undefined) {
			control.name(title);
		}

		return control;
	}

	/**
	 * Sets gui enabled
	 * @param control
	 * @param [isEnable]
	 */
	public static setGuiEnabled(control: ThreeGuiController, isEnable: boolean = true) {
		if (control !== null && control !== undefined && control.domElement) {
			const domElement = control.domElement;
			if (isEnable) {
				domElement.classList.remove('no-pointer-events');
				domElement.classList.remove('control-disabled');
			} else {
				domElement.classList.add('no-pointer-events');
				domElement.classList.add('control-disabled');
			}
		} else {
			console.log('error', control);
		}
	}

	/**
	 * Gets gui control param
	 * @param children
	 * @param name
	 * @returns gui control param
	 */
	public static getGuiControlParam(children: GuiControlParam[], name: string): GuiControlParam {
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (child.name === name) {
				return child;
			}
			if (child.type === 'folder' && child.children && child.children.length > 0) {
				const foundChild = this.getGuiControlParam(child.children, name);
				if (foundChild !== null) {
					return foundChild;
				}
			}
		}
		return null;
	}

	/**
	 * Setups gui
	 * @param control
	 * @param gui
	 * @param params
	 * @returns gui
	 */
	public static setupGui(control: any, gui: ThreeGuiController, params: GuiControlParam[]): ThreeGuiController {
		params.forEach((param) => {
			const params = param.control ? control[param.control] : control;
			if (this.isNotNull(params)) {
				switch (param.type) {
					case 'color':
						param.controller = this.setupGuiChange(
							gui.addColor(params, param.name),
							param.finishChange,
							param.change,
							param.listen,
							param.title
						);
						break;
					case 'folder':
						const folder = gui.addFolder(param.name);
						param.controller = this.setupGui(params, folder, param.children);
						if (param.isOpen) {
							folder.open();
						}
						break;
					case 'number':
						param.controller = this.setupGuiChange(
							gui.add(params, param.name, param.min, param.max, param.step),
							param.finishChange,
							param.change,
							param.listen,
							param.title
						);
						break;
					case 'listen':
						param.controller = gui.add(params, param.name).listen();
						break;
					case 'select':
						param.controller = this.setupGuiChange(
							gui.add(params, param.name, param.select),
							param.finishChange,
							param.change,
							param.listen,
							param.title
						);
						break;
					case 'button':
					default:
						param.controller = this.setupGuiChange(
							gui.add(params, param.name),
							param.finishChange,
							param.change,
							param.listen,
							param.title
						);
						break;
				}
			}
		});
		return gui;
	}
}

/**
 * Renderer timer
 */
export interface RendererTimer {
	delta: number;
	elapsedTime: number;
	renderer?: I3JS.IRenderer;
	event?: RendererEvent;
}

/**
 * Renderer info
 */
export interface RendererInfo {
	timer: RendererTimer;
	innerWidth: number;
	innerHeight: number;
	renderer: I3JS.IRenderer;
	cssRenderer: any;
	cameras: I3JS.ICamera[];
	scenes: I3JS.IScene[];
}

/**
 * Renderer event
 */
export interface RendererEvent {
	type: string;
	client?: I3JS.IVector2;
	clientX?: number;
	clientY?: number;
	offset?: I3JS.IVector2;
	offsetX?: number;
	offsetY?: number;
	rate?: I3JS.IVector2;
	rateX?: number;
	rateY?: number;
	width?: number;
	height?: number;
	nativeElement?: HTMLElement;
	size?: I3JS.IVector2;
	mouse?: I3JS.IVector2;
	direction?: I3JS.IVector2;
	keyInfo?: {
		code: string;
		ctrlKey: boolean;
		altKey: boolean;
		shiftKey: boolean;
		key: string;
		timeStamp: number;
		timeRepeat: number;
		xy: I3JS.IVector2;
	};
	event: any;
}

/**
 * Three clock
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ThreeClock) page for details.
 *
 */
export class ThreeClock extends N3JS.Clock {
	/**
	 * Gets timer
	 * @param renderer
	 * @param event
	 * @returns timer
	 */
	public getTimer(renderer: I3JS.IRenderer, event: RendererEvent): RendererTimer {
		const delta = this.getDelta();
		const elapsedTime = this.getElapsedTime();
		return {
			delta: delta,
			elapsedTime: elapsedTime,
			renderer: renderer,
			event: event,
		};
	}
}

/**
 * Three stats
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ThreeStats) page for details.
 *
 */
export class ThreeStats implements I3JS.IStats {
	/**
	 * The Revision of three stats
	 */
	REVISION: number;

	/**
	 * The Stats of three stats
	 */
	stats: I3JS.IStats = null;

	/**
	 * The Dom of three stats
	 */
	dom: HTMLDivElement;

	/**
	 * Dom element of three stats
	 */
	domElement: HTMLDivElement;

	/**
	 * Creates an instance of three stats.
	 * @param [style]
	 */
	constructor(style?: object) {
		this.stats = (N3JS.Stats as any)();
		this.domElement = this.dom = this.stats.dom;
		this.REVISION = this.stats.REVISION;
		this.setStyle(style);
	}

	/**
	 * Sets style
	 * @param style
	 */
	public setStyle(style: object) {
		if (style !== null && style !== undefined) {
			Object.entries(style).forEach(([key, value]) => {
				const statsDomStyle: any = this.stats.dom.style;
				statsDomStyle[key] = value;
			});
		}
	}

	/**
	 * Adds panel
	 * @param panel
	 * @returns panel
	 */
	public addPanel(panel: I3JS.IPanel): I3JS.IPanel {
		return this.stats.addPanel(panel);
	}

	/**
	 * Shows panel
	 * @param id
	 */
	showPanel(id: number): void {
		this.stats.showPanel(id);
	}

	/**
	 * Begins three stats
	 */
	begin(): void {
		this.stats.begin();
	}

	/**
	 * Ends three stats
	 */
	end(): void {
		this.stats.end();
	}

	/**
	 * Updates three stats
	 */
	update(): void {
		this.stats.update();
	}

	/**
	 * Sets mode
	 * @param id
	 */
	public setMode(id: number): void {
		this.stats.setMode(id);
	}
}

/**
 * Gui control param
 */
export interface GuiControlParam {
	/**
	 * The name of gui control
	 */
	name: string;
	/**
	 * The type of gui control
	 */
	type?: 'number' | 'folder' | 'select' | 'folder' | 'button' | 'color' | 'checkbox' | 'input' | 'listen' | 'auto';
	/**
	 * The min value of number type
	 */
	min?: number;
	/**
	 * The max value of number type
	 */
	max?: number;
	/**
	 * The step value of number type
	 */
	step?: number;
	/**
	 * The select value of select type
	 */
	select?: string[] | { [key: string]: any };
	control?: string;
	listen?: boolean;
	/**
	 * is opened in case folder
	 */
	isOpen?: boolean;
	/**
	 * The title of gui name
	 */
	title?: string;
	/**
	 * on change value trigger
	 */
	change?: (value?: any) => void;
	/**
	 * on change finish value trigger
	 */
	finishChange?: (value?: any) => void;
	/**
	 * The children of folder type
	 */
	children?: GuiControlParam[];
	/**
	 * The controller of gui
	 */
	controller?: ThreeGuiController;
}

/**
 * ThreeGeometryCustom
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ThreeGeometryCustom) page for details.
 *
 */
@Component({
	template: '',
})
export class ThreeGeometryCustom {
	/**
	 * Scale the geometry data. This is typically done as a one time operation, and not during a loop. Use [Object3D.scale](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D.scale) for typical real-time mesh scaling.
	 */
	@Input() scale: number = null;

	/**
	 * The Geometry of three geometry custom
	 */
	protected geometry: I3JS.IBufferGeometry = null;

	/**
	 * Inits geometry
	 * @returns geometry
	 */
	public initGeometry(): I3JS.IBufferGeometry {
		return new N3JS.BufferGeometry();
	}

	/**
	 * Sets geometry
	 * @param geometry
	 */
	public setGeometry(geometry: I3JS.IBufferGeometry) {
		if (ThreeUtil.isNotNull(this.scale)) {
			const scale = ThreeUtil.getTypeSafe(this.scale, 1);
			geometry.scale(scale, scale, scale);
		}
		this.geometry = geometry;
	}

	/**
	 * Gets geometry
	 * @returns geometry
	 */
	public getGeometry(): I3JS.IBufferGeometry {
		if (this.geometry === null) {
			this.setGeometry(this.initGeometry());
		}
		return this.geometry;
	}
}

/**
 * Three gui
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ThreeGui) page for details.
 *
 */
export class ThreeGui implements ThreeGuiController {
	/**
	 * The Gui of three gui
	 */
	public gui: any = null;

	/**
	 * Dom element of three gui
	 */
	public domElement: HTMLElement;

	/**
	 * Custom css of three gui
	 */
	public static customCss: string =
		'.no-pointer-events {pointer-events: none;}.control-disabled {color: #888;text-decoration: line-through;}';

	/**
	 * Creates an instance of three gui.
	 * @param [style]
	 * @param [pars]
	 */
	constructor(
		style?: any,
		pars?: {
			closeOnTop?: boolean;
			autoPlace?: boolean;
			width?: number;
		}
	) {
		if (style instanceof GUI) {
			this.gui = style;
			this.domElement = this.gui.domElement;
		} else {
			const GUIAny: any = GUI;
			this.gui = new GUIAny(pars);
			this.domElement = this.gui.domElement;
			this.setStyle(style);
		}
	}

	/**
	 * Sets style
	 * @param style
	 * @returns style
	 */
	public setStyle(style: object): this {
		if (style !== null && style !== undefined) {
			const domElement = this.domElement;
			const domElementStyle: any = domElement.style;
			Object.entries(style).forEach(([key, value]) => {
				domElementStyle[key] = value;
			});
		}
		if (ThreeGui.customCss !== null) {
			ThreeUtil.cssInject(ThreeGui.customCss);
			ThreeGui.customCss = null;
		}
		return this;
	}

	/**
	 * Adds color
	 * @param object
	 * @param property
	 * @returns color
	 */
	public addColor(object: any, property: string): ThreeGuiController {
		return this.gui.addColor(object, property);
	}

	/**
	 * Adds folder
	 * @param name
	 * @returns folder
	 */
	public addFolder(name: string): ThreeGuiController {
		return this.gui.addFolder(name);
	}

	/**
	 * Adds three gui
	 * @param object
	 * @param property
	 * @param [option1]
	 * @param [options2]
	 * @param [options3]
	 * @returns add
	 */
	public add(object: any, property: string, option1?: any, options2?: any, options3?: any): ThreeGuiController {
		return this.gui.add(object, property, option1, options2, options3);
	}

	/**
	 * Destroys three gui
	 * @returns
	 */
	destroy() {
		this.gui.destroy();
		return this;
	}

	/**
	 * Removes folder
	 * @param folder
	 * @returns folder
	 */
	removeFolder(folder: any): this {
		this.gui.removeFolder(folder);
		return this;
	}

	/**
	 * Listens three gui
	 * @returns listen
	 */
	listen(): this {
		this.gui.listen();
		return this;
	}

	/**
	 * Names three gui
	 * @param name
	 * @returns name
	 */
	name(name: string): this {
		this.gui.name(name);
		return this;
	}

	/**
	 * Determines whether finish change on
	 * @param callBack
	 * @returns finish change
	 */
	onFinishChange(callBack: (e: any) => void): this {
		this.gui.onFinishChange(callBack);
		return this;
	}

	/**
	 * Determines whether change on
	 * @param callBack
	 * @returns change
	 */
	onChange(callBack: (e: any) => void): this {
		this.gui.onChange(callBack);
		return this;
	}

	/**
	 * Opens three gui
	 * @returns open
	 */
	open(): this {
		this.gui.open();
		return this;
	}

	/**
	 * Closes three gui
	 * @returns close
	 */
	close(): this {
		this.gui.close();
		return this;
	}

	/**
	 * Hides three gui
	 * @returns hide
	 */
	hide(): this {
		this.gui.hide();
		return this;
	}

	/**
	 * Shows three gui
	 * @returns show
	 */
	show(): this {
		this.gui.show();
		return this;
	}

	/**
	 * Removes three gui
	 * @param controller
	 * @returns remove
	 */
	remove(controller: any): this {
		this.gui.remove(controller);
		return this;
	}
}

/**
 * Three gui controller
 */
export interface ThreeGuiController {
	domElement?: HTMLElement;
	add(object: any, property: string, min?: any, max?: number, step?: number): ThreeGuiController;
	addColor(object: any, property: string): ThreeGuiController;
	remove(controller: any): this;
	destroy(): this;
	addFolder(name: string): ThreeGuiController;
	removeFolder(folder: any): this;
	listen(): this;
	onFinishChange(callBack: (e: any) => void): this;
	onChange(callBack: (e: any) => void): this;
	name(name: string): this;
	open(): this;
	close(): this;
	hide(): this;
	show(): this;
}
