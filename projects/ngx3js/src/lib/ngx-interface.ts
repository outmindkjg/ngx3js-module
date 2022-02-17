import { QueryList } from '@angular/core';
import * as I3JS from './threejs-library/three-interface';

/**
 * Apply matrix4
 */
export interface IApplyMatrix4 {
	/**
	 * applyMatrix4
	 * @param matrix
	 * @returns matrix4
	 */
	applyMatrix4(matrix: I3JS.Matrix4): any;
}

/**
 * Iloading process
 */
export interface ILoadingProcess {
	setLoadingProcess : (url: string, loaded: number, total: number) => void;
}

 /**
  * Iloading process info
  */
 export interface ILoadingProcessInfo {
	url : string;
	loaded : number;
	total : number;
	percent : number;
	remindPercent : number;
}

/**
 * Curves parameters
 */
export interface ICurvesParameters {
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
export interface ITextureOption {
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
export interface IStorageOption {
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
	object?: I3JS.SkinnedMesh | I3JS.Camera | any;

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

	/** auto select first child */
	firstChild?: boolean;
}

/**
 * Storage export option
 */
export interface IStorageExportOption {
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
	animations?: I3JS.AnimationClip[];

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
 * INgxUniform
 */
export type INgxUniform = { type: string; value: any; options?: any } | I3JS.IUniform;

/**
 * INgxUniforms
 */
export type INgxUniforms = { [key: string]: INgxUniform };

/**
 * INgxTexture
 */
export type INgxTexture = string | I3JS.Texture | ITextureOption | any;

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
export type INgxColor = string | number | I3JS.Color;

/**
 * Three Vector
 */
export interface INgxVector {
	x: number;
	y: number;
	z?: number;
	w?: number;
}

/**
 * MaterialParameters
 */
export interface IMaterialParameters {
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
export interface INgxFace {
	a: number;
	b: number;
	c: number;
}

/**
 * Loaded object
 */
export interface ILoadedObject {
	object?: I3JS.Object3D;
	material?: I3JS.Material | any;
	geometry?: I3JS.BufferGeometry;
	texture?: I3JS.Texture;
	clips?: I3JS.AnimationClip[] | any;
	morphTargets?: I3JS.BufferAttribute[];
	source?: any;
}

export interface ILoadedNameMap {
	[key: string]: ILoadedNameMap;
}

/**
 * Gui base control
 */
export interface IGuiBaseControl {
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
export interface ITagAttributes {
	tag: string;
	attributes: { name: string; value: any }[];
	children?: { getTagAttribute: (options?: any) => ITagAttributes }[];
	options?: any;
}

/**
 * Css style
 *
 * @see [MDN Web Docs - Css](https://developer.mozilla.org/en-US/docs/Web/CSS)
 */
export interface ICssStyle {
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
	background?: INgxColor | I3JS.Vector4;

	/** The background-color CSS property sets the background color of an element. */
	backgroundColor?: INgxColor | I3JS.Vector4;

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
	borderColor?: INgxColor | I3JS.Vector4;

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
	color?: INgxColor | I3JS.Vector4;

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
 * Renderer timer
 */
export interface IRendererTimer {
	delta: number;
	elapsedTime: number;
	renderer?: I3JS.Renderer;
	event?: IRendererEvent;
}

/**
 * Renderer info
 */
export interface IRendererInfo {
	timer: IRendererTimer;
	innerWidth: number;
	innerHeight: number;
	renderer: I3JS.Renderer;
	cssRenderer: any;
	cameras: I3JS.Camera[];
	scenes: I3JS.Scene[];
}

/**
 * Renderer event
 */
export interface IRendererEvent {
	type: string;
	client?: I3JS.Vector2;
	clientX?: number;
	clientY?: number;
	offset?: I3JS.Vector2;
	offsetX?: number;
	offsetY?: number;
	rate?: I3JS.Vector2;
	rateX?: number;
	rateY?: number;
	width?: number;
	height?: number;
	nativeElement?: HTMLElement;
	size?: I3JS.Vector2;
	mouse?: I3JS.Vector2;
	direction?: I3JS.Vector2;
	keyInfo?: {
		code: string;
		ctrlKey: boolean;
		altKey: boolean;
		shiftKey: boolean;
		key: string;
		timeStamp: number;
		timeRepeat: number;
		xy: I3JS.Vector2;
	};
	event: any;
	controls? : any[];
	renderer? : I3JS.WebGL1Renderer;
	mainCamera? : I3JS.Camera;
	mainScene? : I3JS.Scene;
	cameras? : I3JS.Camera[];
	scenes? : I3JS.Scene[];
}

/**
 * Gui control param
 */
export interface IGuiControlParam {
	/**
	 * The name of gui control
	 */
	name: string;

	/**
	 * The name of gui control
	 */
	 value? : any;

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

	control?: string | { [key: string]: any };

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
	children?: IGuiControlParam[];

	/**
	 * The controller of gui
	 */
	controller?: I3JS.GUI | I3JS.GUIController;
}

/**
 * Three gui controller
 */
export interface INgxThreeGuiController {
	domElement?: HTMLElement;
	add(object: any, property: string, min?: any, max?: number, step?: number): INgxThreeGuiController;
	addColor(object: any, property: string): INgxThreeGuiController;
	remove(controller: any): this;
	destroy(): this;
	addFolder(name: string): INgxThreeGuiController;
	removeFolder(folder: any): this;
	listen(obj?: any): this;
	onFinishChange(callBack: (e: any) => void): this;
	onChange(callBack: (e: any) => void): this;
	name(name: string): this;
	open(): this;
	close(): this;
	hide(): this;
	show(): this;
}

export interface IEaseFunction {
	(progress: number): number;
}

/**
 * TObjectFunction
 */
export type TObjectFunction = (object: any, elapsedTime?: number, timer?: IRendererTimer) => void;

/**
 * TObject3dFunction
 */
export type TObject3dFunction = (object3d: I3JS.Object3D, elapsedTime?: number, timer?: IRendererTimer) => void;

/**
 * Direc options
 */
export interface IDirectiveOptions {
	/** type */
	type?: 'none' | string;

	/** easing */
	easing?: string;

	/** repeat */
	repeat?: string;

	/** start */
	start?: number;

	/** end */
	end?: number;

	/** speed */
	speed?: number;
}

/**
 * Attr Buffer Attribute
 */
export type TAttrBufferAttribute =
	| number[]
	| Int8Array
	| Int16Array
	| Int32Array
	| Uint8Array
	| Uint16Array
	| Uint32Array
	| Float32Array
	| Float64Array
	| I3JS.BufferAttribute;

/**
 * Geometries parametric
 */
export interface IGeometriesParametric {
	(u: number, v: number, target?: any): INgxVector;
}

/**
 * Mesh material raw
 */
export interface ITMeshMaterialRaw {
	geometry?: I3JS.BufferGeometry;
	userData?: any;
	material: I3JS.Material | I3JS.Material[];
	customDepthMaterial?: I3JS.Material;
	customDistanceMaterial?: I3JS.Material;
}

/**
 * Mesh Material
 */
export type TMeshMaterial = ITMeshMaterialRaw | I3JS.Scene;

/**
 * TCanvasFunctionType
 */
export type TCanvasFunctionType = (
	ctx?: CanvasRenderingContext2D,
	text?: string,
	width?: number,
	height?: number,
	options?: any
) => void;

/**
 * TDataFunctionType
 */
export type TDataFunctionType = (options?: any) => I3JS.DataTexture | I3JS.DataTexture3D;

/**
 * Attribute update info
 */
export interface IAttributeUpdateInfo {
	index: number;
	from: number;
	to: number;
}

/**
 * Shape info
 */
export interface IShapeInfo {
	backgroundColor?: INgxColor;
	opacity?: number;
	borderColor?: INgxColor;
	borderWidth?: number;
	radius?: number;
	hoverBackgroundColor?: INgxColor;
	hoverOpacity?: number;
	hoverBorderColor?: INgxColor;
	hoverBorderWidth?: number;
	hoverRadius?: number;
}

/**
 * Chart shape
 */
export interface IChartShape {
	mesh: I3JS.Mesh;
	geometry: I3JS.BufferGeometry;
	material: I3JS.Material;
	geometryBorder: I3JS.BufferGeometry;
	materialBorder: I3JS.LineDashedMaterial;
}

/**
 * Color opacity
 */
export interface IColorOpacity {
	/**
	 * color
	 */
	color: INgxColor;
	/**
	 * opacity
	 */
	opacity: number;
}

/**
 * Background border
 */
export interface IBackgroundBorder {
	/**
	 * backgroundColor
	 */
	backgroundColor: IColorOpacity;
	/**
	 * borderColor
	 */
	borderColor?: IColorOpacity;
	/**
	 * hoverBackgroundColor
	 */
	hoverBackgroundColor?: IColorOpacity;
	/**
	 * hoverBorderColor
	 */
	hoverBorderColor?: IColorOpacity;
}

/**
 * Chart data
 */
export interface IChartData {
	datasets: {
		data: (number | { x: number; y: number; r?: number })[];
		type?: string;
		label?: string;
		backgroundColor?: INgxColor[] | INgxColor;
		borderColor?: INgxColor[] | INgxColor;
		borderWidth?: number;
		fill?: boolean;
		hoverBackgroundColor?: INgxColor[] | INgxColor;
		hoverBorderColor?: INgxColor[] | INgxColor;
		hoverBorderDash?: string;
		hoverBorderCapStyle?: string;
		hoverBorderDashOffset?: number;
		hoverBorderJoinStyle?: string;
		hoverBorderWidth?: number;
		pointBackgroundColor?: INgxColor;
		pointBorderColor?: INgxColor;
		pointBorderWidth?: number;
		pointHoverBackgroundColor?: INgxColor;
		pointHoverBorderColor?: INgxColor;
		pointHoverRadius?: number;
		pointRadius?: number;
		pointStyle?: string;
		hoverOffset?: number;
		tension?: number;
	}[];
	labels?: string[];
	options?: any;
}

/**
 * Curve class
 */
export interface ICurveClass {
	new (scale?: number, options?: any): I3JS.Curve<I3JS.Vector3>;
}

/**
 * Number options
 */
export interface INumberOptions extends IDirectiveOptions {}

/**
 * Curves normal parameters
 */
export interface ICurvesNormalParameters {
	scale?: I3JS.Vector3;
	rotation?: I3JS.Euler;
	center?: I3JS.Vector3;
	multiply?: number;
	options?: string;
}

/**
 * Control object item
 */
export interface IControlObjectItem {
	/**
	 *
	 */
	object3d?: I3JS.Object3D;

	/**
	 *
	 */
	component?: any;

	/**
	 *
	 */
	position?: I3JS.Vector3;

	/**
	 *
	 */
	rotation?: I3JS.Euler;

	/**
	 *
	 */
	scale?: I3JS.Vector3;

	/**
	 *
	 */
	material?: I3JS.Material;

	/**
	 *
	 */
	uniforms?: { [uniform: string]: I3JS.IUniform };

	/**
	 *
	 */
	geometry?: I3JS.BufferGeometry;

	/**
	 *
	 */
	attributes?: {
		[name: string]: I3JS.BufferAttribute | I3JS.InterleavedBufferAttribute;
	};

	/**
	 *
	 */
	morphAttributes?: {
		[name: string]: (I3JS.BufferAttribute | I3JS.InterleavedBufferAttribute)[];
	};
}

/**
 * Position options
 */
export interface IPositionOptions extends IDirectiveOptions {}

/**
 * Scale options
 */
export interface IScaleOptions extends IDirectiveOptions {}

/**
 * Rotate options
 */
export interface IRotateOptions extends IDirectiveOptions {}

/**
 * Helper options
 */
export interface IHelperOptions {
	/**
	 * the type of helper
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | Gyroscope | Gyroscope |
	 * | CSM | CSM |
	 * | THREE.ArrowHelper | ArrowHelper, Arrow |
	 * | THREE.BoxHelper | BoxHelper, Box |
	 * | THREE.Box3Helper | Box3Helper, Box3 |
	 * | THREE.GridHelper | GridHelper, Grid |
	 * | THREE.PolarGridHelper | PolarGridHelper, PolarGrid |
	 * | PositionalAudioHelper | PositionalAudioHelper, PositionalAudio |
	 * | THREE.CameraHelper | CameraHelper, Camera |
	 * | THREE.DirectionalLightHelper | DirectionalLightHelper, DirectionalLight, Directional, Light |
	 * | THREE.HemisphereLightHelper | HemisphereLightHelper, HemisphereLight, Hemisphere, Light |
	 * | THREE.PointLightHelper | PointLightHelper, PointLightHelper, PointLight, Light |
	 * | THREE.SpotLightHelper | SpotLightHelper, SpotLight, Light |
	 * | RectAreaLightHelper | RectAreaLightHelper, RectAreaLight, Light |
	 * | LightProbeHelper | LightProbeHelper, LightProbe, Light |
	 * | THREE.PlaneHelper | PlaneHelper, Plane |
	 * | VertexTangentsHelper | VertexTangentsHelper, VertexTangents |
	 * | VertexNormalsHelper | VertexNormalsHelper, VertexNormals |
	 * | THREE.SkeletonHelper | SkeletonHelper, Skeleton |
	 * | THREE.AxesHelper | AxesHelper, Axes |
	 */
	type?: string;

	/**
	 * color -- The desired color.
	 */
	color?: string | number;

	/**
	 * The target object of helper
	 */
	target?: any;

	/**
	 * size of the lines representing the axes. Default is *1*.
	 */
	size?: number;

	/**
	 * The radius of the polar grid. This can be any positive number. Default is 10.
	 */
	radius?: number;

	/**
	 * The number of radial lines. This can be any positive integer. Default is 16.
	 */
	radials?: number;

	/**
	 * The number of circles. This can be any positive integer. Default is 8.
	 */
	circles?: number;

	/**
	 * The number of line segments used for each circle. This can be any positive integer that is 3 or greater. Default is 64.
	 */
	divisions?: number;

	/**
	 * The first color used for grid elements. This can be a [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Color), a hexadecimal value and an CSS-Color name. Default is 0x444444
	 */
	color1?: INgxColor;

	/**
	 * The second color used for grid elements. This can be a [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Color), a hexadecimal value and an CSS-Color name. Default is 0x888888
	 */
	color2?: INgxColor;

	/**
	 * Float in the range of *0.0* - *1.0* indicating how transparent the material is.
	 */
	opacity?: number;

	/**
	 * Whether rendering this material has any effect on the depth buffer. Default is *true*.
	 */
	depthWrite?: boolean;

	/**
	 * The color of material
	 */
	materialColor?: INgxColor;

	/**
	 * The Input of helper component
	 * Which blending to use when displaying objects with this material. Default is {@link NormalBlending}.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * @default THREE.NormalBlending
	 * | THREE.NoBlending | NoBlending, No |
	 * | THREE.NormalBlending | NormalBlending, Normal |
	 * | THREE.AdditiveBlending | AdditiveBlending, Additive |
	 * | THREE.SubtractiveBlending | SubtractiveBlending, Subtractive |
	 * | THREE.MultiplyBlending | MultiplyBlending, Multiply |
	 * | THREE.CustomBlending | CustomBlending, Custom |
	 */
	materialBlending?: string;

	/**
	 * Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects.
	 * When set to true, the extent to which the material is transparent is controlled by setting it's .opacity property.
	 * Default is false.
	 * @default false
	 */
	materialTransparent?: boolean;

	/**
	 * X Direction from origin. Must be a unit vector.
	 *
	 */
	dirX?: number;

	/**
	 * Y Direction from origin. Must be a unit vector.
	 */
	dirY?: number;

	/**
	 * Z Direction from origin. Must be a unit vector.
	 */
	dirZ?: number;

	/**
	 * X Point at which the arrow starts.
	 */
	originX?: number;

	/**
	 * Y Point at which the arrow starts.
	 */
	originY?: number;

	/**
	 * Z Point at which the arrow starts.
	 */
	originZ?: number;

	/**
	 * Point at which the arrow starts.
	 */
	arrowFrom?: any;

	/**
	 * Point at which the arrow end.
	 */
	arrowTo?: any;

	/**
	 * length of the arrow. Default is *1*.
	 */
	length?: number;

	/**
	 * The length of the head of the arrow. Default is 0.2 * length.
	 */
	headLength?: number;

	/**
	 * The width of the head of the arrow. Default is 0.2 * headLength.
	 */
	headWidth?: number;

	/**
	 * Update matrix for this helper
	 */
	matrix?: I3JS.Matrix4;

	/**
	 * this children of Gyroscope
	 */
	children?: any[];

	/**
	 * The cms control of CSMHelper
	 */
	control?: any;

	/**
	 * the range of PositionalAudioHelper
	 */
	range?: number;

	/**
	 * the divisionsInnerAngle of PositionalAudioHelper
	 */
	divisionsInnerAngle?: number;

	/**
	 * the divisionsOuterAngle of PositionalAudioHelper
	 */
	divisionsOuterAngle?: number;
}

/**
 * Svg geometry
 */
export interface ISvgGeometry {
	geometry: I3JS.BufferGeometry;
	style?: {
		fill?: string;
		fillOpacity?: number;
		strokeLineCap?: string;
		strokeLineJoin?: string;
		strokeMiterLimit?: number;
		strokeOpacity?: number;
		strokeWidth?: number;
	};
}

/**
 * ShaderType
 */
export interface IShaderType {
	defines?: {
		[key: string]: any;
	};
	uniforms?: {
		[key: string]: I3JS.IUniform;
	};
	fragmentShader: string;
	vertexShader?: string;
}

/**
 * Volume Options
 */
export interface IVolumeOptions {
	/** x */
	x?: number;

	/** y */
	y?: number;

	/** z */
	z?: number;

	/** helperVisible */
	helperVisible?: boolean;

	/** helperColor */
	helperColor?: INgxColor;

	/** boxVisible */
	boxVisible?: boolean;

	/** xVisible */
	xVisible?: boolean;

	/** yVisible */
	yVisible?: boolean;

	/** zVisible */
	zVisible?: boolean;

	/** lowerThreshold */
	lowerThreshold?: number;

	/** upperThreshold */
	upperThreshold?: number;

	/** windowLow */
	windowLow?: number;

	/** windowHigh */
	windowHigh?: number;
}

/**
 * Character Control
 */
export interface ICharacterControl {
	crouch?: boolean;
	jump?: boolean;
	attack?: boolean;
	moveForward?: boolean;
	moveBackward?: boolean;
	moveLeft?: boolean;
	moveRight?: boolean;
}

/**
 * Object3d options
 */
export interface IObject3dOptions {
	/**
	 * Object gets rendered if *true*. Default is *true*.
	 */
	visible?: boolean;

	/**
	 * The name of the object (doesn't need to be unique). Default is an empty string.
	 */
	name?: string;

	/**
	 * When this is set, it calculates the matrix of position, (rotation or quaternion) and scale every frame and also recalculates the matrixWorld property. Default is [Object3D.DefaultMatrixAutoUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D.DefaultMatrixAutoUpdate) (true).
	 */
	matrixAutoUpdate?: boolean;

	/**
	 * The layer membership of the object. The object is only visible if it has at least one layer in common with the [Camera](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/cameras/Camera) in use. This property can also be used to filter out unwanted objects in ray-intersection tests when using [Raycaster](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Raycaster).
	 */
	layers?: number[];

	/**
	 * Whether the object gets rendered into shadow map. Default is *false*.
	 */
	castShadow?: boolean;

	/**
	 * Whether the material receives shadows. Default is *false*.
	 */
	receiveShadow?: boolean;

	/**
	 * When this is set, it checks every frame if the object is in the frustum of the camera before rendering the object. If set to `false` the object gets rendered every frame even if it is not in the frustum of the camera. Default is `true`.
	 */
	frustumCulled?: boolean;

	/**
	 * This value allows the default rendering order of [scene graph](https://en.wikipedia.org/wiki/Scene_graph) objects to be overridden although opaque and transparent objects remain sorted independently. When this property is set for an instance of [Group](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/objects/Group), all descendants objects will be sorted and rendered together.
	 * Sorting is from lowest to highest renderOrder. Default value is *0*.
	 */
	renderOrder?: number;

	/**
	 *
	 */
	controller?: any;

	/**
	 * A [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector3) representing the object's local position. Default is (0, 0, 0).
	 */
	position?: I3JS.Vector3 | number[] | any;

	/**
	 * Object's local rotation (see [Euler angles](https://en.wikipedia.org/wiki/Euler_angles)), in radians.
	 */
	rotation?: I3JS.Vector3 | number[] | any;

	/**
	 * The object's local scale. Default is [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector3)( 1, 1, 1 ).
	 */
	scale?: I3JS.Vector3 | number[] | any;

	/**
	 * vector - A vector representing a position in world space.
	 * Optionally, the [Object3D.x](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D.x), [Object3D.y](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D.y) and [Object3D.z](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D.z) components of the world space position.
	 * Rotates the object to face a point in world space.
	 * This method does not support objects having non-uniformly-scaled parent(s).
	 */
	lookat?: I3JS.Vector3 | number[] | any;

	/**
	 * The distance at which to display this level of detail.
	 */
	loDistance?: number;

	/**
	 * Custom depth material to be used when rendering to the depth map. Can only be used in context of meshes.
	 * When shadow-casting with a [DirectionalLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/lights/DirectionalLight) or [SpotLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/lights/SpotLight), if you are (a) modifying vertex positions in the vertex shader, (b) using a displacement map, (c) using an alpha map with alphaTest, or (d) using a transparent texture with alphaTest, you must specify a customDepthMaterial for proper shadows. Default is *undefined*.
	 */
	customDepth?: I3JS.Material | any;

	/**
	 * Same as [Object3D.customDepthMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D.customDepthMaterial), but used with [PointLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/lights/PointLight). Default is *undefined*.
	 */
	customDistance?: I3JS.Material | any;

	/**
	 * The animaion group of this object 3d
	 */
	animationGroup?: I3JS.AnimationObjectGroup | any;
}

/**
 * Light options
 */
export interface ILightOptions extends IObject3dOptions {
	/**
	 * The type of light
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.PointLight | PointLight, Point |
	 * | THREE.RectAreaLight | RectAreaLight, RectArea |
	 * | THREE.SpotLight | SpotLight, Spot |
	 * | THREE.DirectionalLight | DirectionalLight, Directional |
	 * | THREE.HemisphereLight | HemisphereLight, Hemisphere |
	 * | THREE.LightProbe | LightProbe, Probe |
	 * | THREE.AmbientLight | AmbientLight, Ambient |
	 */
	type?: string;

	/**
	 * Numeric value of the RGB component of the color. Default is 0xffffff.
	 */
	color?: INgxColor;

	/**
	 * hexadecimal color of the sky. Default is 0xffffff.
	 */
	skyColor?: INgxColor;

	/**
	 * hexadecimal color of the ground. Default is 0xffffff.
	 */
	groundColor?: INgxColor;

	/**
	 * Numeric value of the light's strength/intensity. Default is 1.
	 */
	intensity?: number;

	/**
	 * Maximum range of the light. Default is 0 (no limit).
	 */
	distance?: number;

	/**
	 * Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2(360).
	 */
	angle?: number;

	/**
	 * Percent of the spotlight cone that is attenuated due to penumbra. Takes values between zero and 1. Default is zero.
	 */
	penumbra?: number;

	/**
	 * The amount the light dims along the distance of the light. Default is 1.
	 */
	decay?: number;

	/**
	 * width of the light. Default is 10.
	 */
	width?: number;

	/**
	 * height of the light. Default is 10.
	 */
	height?: number;

	/**
	 * Shadow map bias, how much to add or subtract from the normalized depth when deciding whether a surface is in shadow.
	 * The default is 0. Very tiny adjustments here (in the order of 0.0001) may help reduce artefacts in shadows
	 */
	shadowBias?: number;

	/**
	 * Setting this to values greater than 1 will blur the edges of the shadow.
	 * High values will cause unwanted banding effects in the shadows - a greater [LightShadow.mapSize](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/lights/shadows/LightShadow.mapSize) will allow for a higher value to be used here before these effects become visible.
	 * If [WebGLRenderer.shadowMap.type](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer.shadowMap.type) is set to [PCFSoftShadowMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Renderer), radius has no effect and it is recommended to increase softness by decreasing [LightShadow.mapSize](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/lights/shadows/LightShadow.mapSize) instead.
	 * Note that this has no effect if the [WebGLRenderer.shadowMap.type](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer.shadowMap.type) is set to [BasicShadowMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Renderer).
	 */
	shadowRadius?: number;

	/**
	 * Used to focus the shadow camera. The camera's field of view is set as a percentage of the spotlight's field-of-view. Range is [0, 1]. Default is 1.0.
	 */
	shadowFocus?: number;

	/**
	 * Camera frustum near plane.
	 */
	shadowCameraNear?: number;

	/**
	 * A [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector2) defining the width and height of the shadow map.
	 */
	shadowMapSize?: number;

	/**
	 * A [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector2) defining the width and height of the shadow map.
	 * vector2.width
	 */
	shadowMapSizeWidth?: number;

	/**
	 * A [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector2) defining the width and height of the shadow map.
	 * vector2.height
	 */
	shadowMapSizeHeight?: number;

	/**
	 * Camera frustum far plane. Default is *2000*.
	 * Must be greater than the current value of [Camera.near](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/cameras/Camera.near) plane.
	 */
	shadowCameraFar?: number;

	/**
	 * Camera frustum vertical field of view, from bottom to top of view, in degrees. Default is *50*.
	 */
	shadowCameraFov?: number;

	/**
	 * Camera frustum left plane.
	 */
	shadowCameraLeft?: number;

	/**
	 * Camera frustum right plane.
	 */
	shadowCameraRight?: number;

	/**
	 * Camera frustum top plane.
	 */
	shadowCameraTop?: number;

	/**
	 * Camera frustum bottom plane.
	 */
	shadowCameraBottom?: number;

	/**
	 * Gets or sets the zoom factor of the camera. Default is *1*.
	 */
	shadowCameraZoom?: number;

	/**
	 * An instance of [SphericalHarmonics3](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/SphericalHarmonics3).
	 */
	sh?: string;

	/**
	 * The Input of light component
	 */
	texture?: any;

	/**
	 * The Input of light component
	 */
	target?: any;

	/**
	 * The Input of light component
	 */
	targetX?: number;

	/**
	 * The Input of light component
	 */
	targetY?: number;

	/**
	 * The Input of light component
	 */
	targetZ?: number;

	/**
	 * The Input of light component
	 */
	renderer?: any;

	/**
	 * The Input of light component
	 */
	renderTarget?: any;
}

/**
 * Html collection
 */
export interface IHtmlCollection {
	html: HTMLElement;
	name: string;
	component: any;
	children: IHtmlCollection[];
}

/**
 * Control options
 */
export interface IControlOptions {
	/**
	 * The type of control
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | FlyControls | FlyControls, Fly |
	 * | FirstPersonControls | FirstPersonControls, FirstPerson |
	 * | DeviceOrientationControls | DeviceOrientationControls, DeviceOrientation |
	 * | DragControls | DragControls, Drag |
	 * | TransformControls | TransformControls, Transform |
	 * | TrackballControls | TrackballControls, Trackball |
	 * | ArcballControls | ArcballControls, Arcball |
	 * | CSM | CSM |
	 * | PlaneControls | PlaneControls, Plane |
	 * | OrbitControls | OrbitControls, Orbit |
	 */
	type?: string;

	/**
	 * The autoRotate of control
	 */
	autoRotate?: boolean;

	/**
	 * The autoRotateSpeed of control
	 */
	autoRotateSpeed?: number;

	/**
	 * The screenSpacePanning of control
	 */
	screenSpacePanning?: boolean;

	/**
	 * The minDistance of control
	 */
	minDistance?: number;

	/**
	 * The maxDistance of control
	 */
	maxDistance?: number;

	/**
	 * The xDistance of control
	 */
	xDistance?: number;

	/**
	 * The yDistance of control
	 */
	yDistance?: number;

	/**
	 * The enableZoom of control
	 */
	enableZoom?: boolean;

	/**
	 * The minZoom of control
	 */
	minZoom?: number;

	/**
	 * The maxZoom of control
	 */
	maxZoom?: number;

	/**
	 * The staticMoving of control
	 */
	staticMoving?: boolean;

	/**
	 * The rotateSpeed of control
	 */
	rotateSpeed?: number;

	/**
	 * The zoomSpeed of control
	 */
	zoomSpeed?: number;

	/**
	 * The panSpeed of control
	 */
	panSpeed?: number;

	/**
	 * The minPolarAngle of control
	 */
	minPolarAngle?: number;

	/**
	 * The minAzimuthAngle of control
	 */
	minAzimuthAngle?: number;

	/**
	 * The maxAzimuthAngle of control
	 */
	maxAzimuthAngle?: number;

	/**
	 * The maxPolarAngle of control
	 */
	maxPolarAngle?: number;

	/**
	 * The enableKeys of control
	 */
	enableKeys?: boolean;

	/**
	 * The enablePan of control
	 */
	enablePan?: boolean;

	/**
	 * The enableDamping of control
	 */
	enableDamping?: boolean;

	/**
	 * The dampingFactor of control
	 */
	dampingFactor?: number;

	/**
	 * The movementSpeed of control
	 */
	movementSpeed?: number;

	/**
	 * The rollSpeed of control in degree
	 */
	rollSpeed?: number;

	/**
	 * The dragToLook of control
	 */
	dragToLook?: boolean;

	/**
	 * The autoForward of control
	 */
	autoForward?: boolean;

	/**
	 * The lookSpeed of control
	 */
	lookSpeed?: number;

	/**
	 * The lookVertical of control
	 */
	lookVertical?: boolean;

	/**
	 * The activeLook of control
	 */
	activeLook?: boolean;

	/**
	 * The heightSpeed of control
	 */
	heightSpeed?: boolean;

	/**
	 * The heightCoef of control
	 */
	heightCoef?: number;

	/**
	 * The heightMin of control
	 */
	heightMin?: number;

	/**
	 * The heightMax of control
	 */
	heightMax?: number;

	/**
	 * The constrainVertical of control
	 */
	constrainVertical?: boolean;

	/**
	 * The verticalMin of control
	 */
	verticalMin?: number;

	/**
	 * The verticalMax of control
	 */
	verticalMax?: number;

	/**
	 * The mouseDragOn of control
	 */
	mouseDragOn?: boolean;

	/**
	 * The maxFar of control
	 */
	maxFar?: number;

	/**
	 * The cascades of control
	 */
	cascades?: number;

	/**
	 * The mode of control
	 *
	 * Notice - case insensitive.
	 *
	 */
	mode?: string;

	/**
	 * The scene of control
	 */
	scene?: any;

	/**
	 * The shadowMapSize of control
	 */
	shadowMapSize?: number;

	/**
	 * The lightDirectionX of control
	 */
	lightDirectionX?: number;

	/**
	 * The lightDirectionY of control
	 */
	lightDirectionY?: number;

	/**
	 * The lightDirectionZ of control
	 */
	lightDirectionZ?: number;

	/**
	 * The target of control
	 */
	target?: I3JS.Vector3 | any;

	/**
	 * The camera of control
	 */
	camera?: any;

	/**
	 * The lookat list of control
	 */
	lookatList?: QueryList<any>;
}


export interface IIconInfo {
	name?: string,
	version?: number,
	popularity?: number,
	codepoint?: number,
	unsupported_families?: string[],
	categories?: string[],
	tags?: string[],
	codehex? : string,
	char? : string; 
	sizes_px?: number[]
}