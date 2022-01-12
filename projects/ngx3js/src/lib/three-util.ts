import { Observable, Subscription } from 'rxjs';
import { NgxMeshComponent } from './mesh/mesh.component';
import {
	ICssStyle,
	IGuiBaseControl,
	IGuiControlParam, INgxColor,
	INgxThreeGuiController, IRendererTimer,
	ITagAttributes
} from './ngx-interface';
import { NgxThreeClock } from './three-clock';
import { NgxThreeStats } from './three-stats';
import * as Ammo from './threejs-library/ammo-type';
import * as N3JS from './threejs-library/three-core';
import * as I3JS from './threejs-library/three-interface';

/**
 * Three util
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxThreeUtil) page for details.
 *
 */
export class NgxThreeUtil {
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
		styles: string | ICssStyle,
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
							ele.src = NgxThreeUtil.getStoreUrl(value);
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
	public static getPmremGenerator(): I3JS.PMREMGenerator {
		const pmremGenerator = new N3JS.PMREMGenerator(this.getRenderer() as I3JS.WebGLRenderer);
		pmremGenerator.compileCubemapShader();
		return pmremGenerator;
	}

	/**
	 * Gets renderer
	 * @returns renderer
	 */
	public static getRenderer(): I3JS.Renderer {
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
	public static getRendererSize(): I3JS.Vector2 {
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
	public static getSizeSubscribe(): Observable<I3JS.Vector2> {
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
	public static getUpdateSubscribe(): Observable<IRendererTimer> {
		if (this.lastRenderer !== null) {
			return this.lastRenderer.updateSubscribe();
		} else {
			return undefined;
		}
	}

	/**
	 * Render timer of three util
	 */
	private static renderTimer: IRendererTimer;

	/**
	 * Renders three util
	 * @param renderTimer
	 */
	public static render(renderTimer: IRendererTimer) {
		if (this.renderTimer !== renderTimer) {
			this.renderTimer = renderTimer;
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
		} else if (NgxThreeUtil.isNotNull(addMe)) {
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
	private static _manager: I3JS.LoadingManager = null;

	private static _loader: { [key: string]: I3JS.Loader } = {};

	/**
	 * Gets loader
	 *
	 * @param key
	 * @param loader
	 * @returns
	 */
	public static getLoader<T>(key: string, loader: N3JS.Loader, options?: any): T {
		if (this._loader[key] === undefined) {
			this._loader[key] = new loader(this.getLoadingManager(), options);
			switch (key) {
				case 'ifcLoader':
					(this._loader[key] as any).ifcManager.setWasmPath(this.getStoreUrl('jsm/loaders/ifc/'));
					break;
				case 'ktx2Loader':
					(this._loader[key] as any).setTranscoderPath(this.getStoreUrl('js/libs/basis/'));
					(this._loader[key] as any).detectSupport(new N3JS.WebGL1Renderer());
					break;
				case 'rhino3dmLoader':
					(this._loader[key] as any).setLibraryPath(this.getStoreUrl('jsm/libs/rhino3dm/'));
					break;
				case 'basisTextureLoader':
					(this._loader[key] as any).setTranscoderPath(this.getStoreUrl('js/libs/basis/'));
					(this._loader[key] as any).detectSupport(new N3JS.WebGL1Renderer());
					break;
				case 'dracoLoader':
					(this._loader[key] as any).setDecoderPath(NgxThreeUtil.getStoreUrl('js/libs/draco/'));
					(this._loader[key] as any).setDecoderConfig({ type: 'js' });
					break;
				case 'basisTextureLoader':
					break;
			}
		}
		return this._loader[key] as any;
	}

	/**
	 * Clears loading manager
	 */
	 public static clearLoadingManager() {
		if (this._manager !== null) {
			this._manager = null;
		}
		this._loader = {};
	}

	/**
	 * Gets loading manager
	 * @returns loading manager
	 */
	public static getLoadingManager(): I3JS.LoadingManager {
		if (this._manager === null) {
			this._manager = new N3JS.LoadingManager(
				() => {},
				(url: string, loaded: number, total: number) => {
					this.setLoadingProcess(url, loaded, total);
				},
				(url: string) => {
					console.error(url);
				}
			);
			const cache:I3JS.Cache = N3JS.Cache;
			if (cache !== null && cache !== undefined) {
				cache.enabled = true;
			}
			this._manager.addHandler(/\.dds$/i, this.getLoader('ddsLoader',N3JS.DDSLoader));
		}
		return this._manager;
	}

	/**
	 * Gets html code
	 * @param info
	 * @param [preTab]
	 * @returns html code
	 */
	public static getHtmlCode(info: ITagAttributes, preTab: string = ''): string {
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
	public static getColor(color: INgxColor | { r: number; g: number; b: number }): I3JS.Color {
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
	public static getColorRGB(r: number, g: number, b: number, color?: INgxColor): I3JS.Color {
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
	public static getColorHSL(h?: number, s?: number, l?: number, color?: INgxColor): I3JS.Color {
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
	public static getColorHex(color?: INgxColor): number {
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
	public static getColorHexString(color?: INgxColor): string {
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
	public static getColorStyle(color?: INgxColor): string {
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
	public static getColorMultiplySafe(color: INgxColor, altColor?: INgxColor, multiply?: number): I3JS.Color {
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
	public static getColorSafe(color: INgxColor, altColor?: INgxColor, nullColor?: INgxColor): I3JS.Color {
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
	public static getColorAlphaSafe(color: INgxColor, alpha: number, altColor?: INgxColor): I3JS.Color | I3JS.Vector4 {
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
	public static getVector2VSafe(v2: number[] | I3JS.Vector2, altValue?: I3JS.Vector2): I3JS.Vector2 {
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
		altValue?: I3JS.Vector2,
		v2?: number[] | I3JS.Vector2,
		isRequired?: boolean
	): I3JS.Vector2 {
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
	public static getVector3VSafe(v3: number[] | I3JS.Vector3, altValue?: I3JS.Vector3): I3JS.Vector3 {
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
		altValue?: I3JS.Vector3,
		v3?: number[] | I3JS.Vector3,
		isRequired?: boolean
	): I3JS.Vector3 {
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
	public static getMatrix4Safe(obj: I3JS.Object3D, matrixType: string = 'maxtix'): I3JS.Matrix4 {
		if (this.isNotNull(obj)) {
			const anyObj: any = obj;
			switch (matrixType.toLowerCase()) {
				case 'projectionmatrixinverse':
					if (this.isNotNull(anyObj['projectionMatrixInverse'])) {
						return anyObj['projectionMatrixInverse'].clone();
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
					if (obj.matrixWorld) {
						return obj.matrixWorld;
					}
					break;
				case 'matrix':
				default:
					if (obj.matrix) {
						return obj.matrix;
					}
					break;
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
		altValue?: I3JS.Euler,
		isRequired?: boolean
	): I3JS.Euler {
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
	 * Gets object3d
	 * @template T
	 * @param object3d
	 * @param [isRequired]
	 * @returns object3d
	 */
	public static getObject3d<T extends I3JS.Object3D>(object3d: any, isRequired: boolean = true): T {
		if (object3d instanceof N3JS.Object3D) {
			return object3d as T;
		} else if (this.isNotNull(object3d.getMesh)) {
			const mesh: I3JS.Object3D = object3d.getMesh();
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
	public static getMeshFind(mesh: any): I3JS.Mesh {
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
			let childMesh: I3JS.Mesh = null;
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
	public static getMesh(mesh: any): I3JS.Mesh {
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
	public static getLight(light: any): I3JS.Light {
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
	public static getMaterialByType(material: any, materialType?: string): I3JS.Material {
		let matchedMat: I3JS.Material = null;
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
	public static getMaterial(material: any): I3JS.Material | I3JS.Material[] {
		if (material instanceof N3JS.Material) {
			return material;
		} else if (Array.isArray(material)) {
			return material;
		} else if (this.isNotNull(material.getMaterial)) {
			return material.getMaterial() as I3JS.Material;
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
	public static getMaterialOne(material: any): I3JS.Material {
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
	public static getGeometry(geometry: any): I3JS.BufferGeometry {
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
	 * Clears ngx three util
	 */
	public static clear(clearCache : boolean = false) {
		this.clearThreeComponent();
		this.clearLoadingManager();
		if (clearCache) {
			const cache:I3JS.Cache = N3JS.Cache;
			if (cache !== null && cache !== undefined) {
				cache.clear();
			}
		}
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
	 * Clears three component
	 */
	public static clearThreeComponent() {
		this.loadedComponent = {};
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
	 * Gets timeout
	 * 특정 시간후에 이벤트 발생시키기
	 *
	 * @param [timeDelay]
	 * @returns timeout
	 */
	 public static getTimeout(timeDelay: number = 50): Promise<void> {
		return new Promise<void>((resolve) => {
			window.setTimeout(() => {
				resolve();
			}, timeDelay);
		});
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
					const nextKeyList = nextKey.split(',');
					let isCalled : boolean = false;
					for(let i = 0; i < nextKeyList.length; i++) {
						const key = nextKeyList[i];
						if (isCalled) {
							break;
						}
						if (this.isNull(key)) {
							continue;
						}
						switch (key.toLowerCase()) {
							case 'lookat':
								if (this.isIndexOf(keyList, ['object3d', 'mesh', 'position', 'lookat'])) {
									callBack('lookat');
									isCalled = true;
								}
								break;
							case 'position':
								if (this.isIndexOf(keyList, ['object3d', 'mesh', 'position'])) {
									callBack('position');
									isCalled = true;
								}
								break;
							case 'rotation':
								if (this.isIndexOf(keyList, ['object3d', 'mesh', 'rotation'])) {
									callBack('rotation');
									isCalled = true;
								}
								break;
							case 'scale':
								if (this.isIndexOf(keyList, ['object3d', 'mesh', 'scale'])) {
									callBack('scale');
									isCalled = true;
								}
								break;
							case 'geometry':
								if (this.isIndexOf(keyList, ['object3d', 'mesh', 'geometry', 'loaded'])) {
									callBack('geometry');
									isCalled = true;
								}
								break;
							case 'material':
								if (this.isIndexOf(keyList, ['object3d', 'mesh', 'material', 'loaded'])) {
									callBack('material');
									isCalled = true;
								}
								break;
							case 'texture':
								if (this.isIndexOf(keyList, ['object3d', 'mesh', 'material', 'texture', 'loaded'])) {
									callBack('texture');
									isCalled = true;
								}
								break;
							default:
								if (keyList.includes(key.toLowerCase())) {
									callBack(key);
									isCalled = true;
								}
								break;
						}
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
	public static getTexture(texture: any, refType: string = 'map', isRequired: boolean = true): I3JS.Texture {
		if (texture instanceof N3JS.Texture) {
			return texture;
		} else if (texture instanceof N3JS.Object3D || this.isNotNull(texture.getObject3d)) {
			const pmremGenerator = NgxThreeUtil.getPmremGenerator();
			const pmremGeneratorTexture = pmremGenerator.fromScene(
				texture instanceof N3JS.Object3D ? texture : texture.getObject3d()
			).texture;
			pmremGenerator.dispose();
			return pmremGeneratorTexture;
		} else if (this.isNotNull(texture.getTexture)) {
			const foundTexture = texture.getTexture(refType);
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
	public static getPosition(position: any): I3JS.Vector3 {
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
	public static getRotation(rotation: any): I3JS.Euler {
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
	public static getScale(scale: any): I3JS.Vector3 {
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
	public static getLookAt(lookat: any): I3JS.Vector3 {
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
	public static isTextureLoaded(texture: I3JS.Texture): boolean {
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
			if (NgxThreeUtil.isNotNull(texture.image.data) && texture.image.data.length > 0) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Gets cube image
	 * @param cubeImage
	 * @returns cube image
	 */
	public static getCubeImage(cubeImage: string[]): string[] {
		if (NgxThreeUtil.isNotNull(cubeImage) && cubeImage.length !== 6 && cubeImage.length >= 1) {
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
	public static getClock(autoStart?: boolean): NgxThreeClock {
		return new NgxThreeClock(autoStart);
	}

	/**
	 * The Stats of three util
	 */
	public static stats: NgxThreeStats = null;

	/**
	 * Gets stats
	 * @param [style]
	 * @returns stats
	 */
	public static getStats(style?: object): NgxThreeStats {
		return new NgxThreeStats(style);
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
		component: { mesh?: NgxMeshComponent; controls?: any; controlsParams?: any },
		addBaseParam: boolean = true
	): T & IGuiBaseControl {
		const baseControl: IGuiBaseControl = {
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
						const controlsParams = this.getIGuiControlParam(component.controlsParams, 'Mesh Rotation');
						if (this.isNotNull(controlsParams)) {
							if (component.controls.meshRotate.autoRotate) {
								this.setGuiEnabled(controlsParams.children[1]?.controller as I3JS.GUIController, false);
								this.setGuiEnabled(controlsParams.children[4]?.controller as I3JS.GUIController, true);
							} else {
								if (this.isNotNull(component.mesh)) {
									const meshRotate = component.mesh.getRotation();
									component.controls.meshRotate.x = ((meshRotate.x / Math.PI) * 180) % 360;
									component.controls.meshRotate.y = ((meshRotate.y / Math.PI) * 180) % 360;
									component.controls.meshRotate.z = ((meshRotate.z / Math.PI) * 180) % 360;
								}
								this.setGuiEnabled(controlsParams.children[1]?.controller as I3JS.GUIController, true);
								this.setGuiEnabled(controlsParams.children[4]?.controller as I3JS.GUIController, false);
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
		params: IGuiControlParam[],
		component: { mesh?: NgxMeshComponent; controls?: any; controlsParams?: any },
		addBaseParam: boolean = true
	): IGuiControlParam[] {
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
		timer: IRendererTimer,
		component: {
			mesh?: NgxMeshComponent;
			controls?: IGuiBaseControl;
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
		control: I3JS.GUIController,
		onFinishChange?: (value?: any) => void,
		onChange?: (value?: any) => void,
		listen?: boolean,
		title?: string
	): I3JS.GUIController {
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
	public static setGuiEnabled(control: I3JS.GUIController, isEnable: boolean = true) {
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
	public static getIGuiControlParam(children: IGuiControlParam[], name: string): IGuiControlParam {
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (child.name === name) {
				return child;
			}
			if (child.type === 'folder' && child.children && child.children.length > 0) {
				const foundChild = this.getIGuiControlParam(child.children, name);
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
	public static setupGui(
		control: any,
		gui: I3JS.GUI | I3JS.GUIController,
		params: IGuiControlParam[]
	): I3JS.GUI | I3JS.GUIController {
		params.forEach((param) => {
			const params = param.control ? control[param.control] : control;
			if (this.isNotNull(params)) {
				if (gui instanceof N3JS.GUI) {
					const guiFolder : I3JS.GUI = gui;
					switch (param.type) {
						case 'color':
							param.controller = this.setupGuiChange(
								guiFolder.addColor(params, param.name),
								param.finishChange,
								param.change,
								param.listen,
								param.title
							);
							break;
						case 'folder':
							const folder = guiFolder.addFolder(param.name);
							param.controller = this.setupGui(params, folder, param.children);
							if (param.isOpen) {
								folder.open();
							}
							break;
						case 'number':
							param.controller = this.setupGuiChange(
								guiFolder.add(params, param.name, param.min, param.max, param.step),
								param.finishChange,
								param.change,
								param.listen,
								param.title
							);
							break;
						case 'listen':
							param.controller = guiFolder.add(params, param.name).listen();
							break;
						case 'select':
							param.controller = this.setupGuiChange(
								guiFolder.add(params, param.name, param.select),
								param.finishChange,
								param.change,
								param.listen,
								param.title
							);
							break;
						case 'button':
						default:
							param.controller = this.setupGuiChange(
								guiFolder.add(params, param.name),
								param.finishChange,
								param.change,
								param.listen,
								param.title
							);
							break;
					}
				}
			} else {

			}
		});
		return gui;
	}

	/**
	 * Gets mouse safe
	 * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.button
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.MOUSE.LEFT | left |
	 * | THREE.MOUSE.MIDDLE | middle |
	 * | THREE.MOUSE.RIGHT | right |
	 * | THREE.MOUSE.ROTATE | rotate |
	 * | THREE.MOUSE.DOLLY | dolly |
	 * | THREE.MOUSE.PAN | pan |
	 *
	 * @param baseMouse
	 * @param [altMouse]
	 * @param [def]
	 * @returns mouse safe
	 */
	public static getMouseSafe(baseMouse: string, altMouse?: string, def?: string): I3JS.MOUSE {
		const mouse = this.getTypeSafe(baseMouse, altMouse, def || '');
		switch (mouse.toLowerCase()) {
			case 'left':
				return I3JS.MOUSE.LEFT;
			case 'middle':
				return I3JS.MOUSE.MIDDLE;
			case 'right':
				return I3JS.MOUSE.RIGHT;
			case 'rotate':
				return I3JS.MOUSE.ROTATE;
			case 'dolly':
				return I3JS.MOUSE.DOLLY;
			case 'pan':
				return I3JS.MOUSE.PAN;
			default:
				return undefined;
		}
	}

	/**
	 * Gets touch safe
	 * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.button
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.TOUCH.ROTATE | rotate |
	 * | THREE.TOUCH.PAN | pan |
	 * | THREE.TOUCH.DOLLY_PAN | dollypan, dolly_pan |
	 * | THREE.TOUCH.DOLLY_ROTATE | dollyrotate, dolly_rotate |
	 *
	 * @param baseTouch
	 * @param [altTouch]
	 * @param [def]
	 * @returns touch safe
	 */
	public static getTouchSafe(baseTouch: string, altTouch?: string, def?: string): I3JS.TOUCH {
		const touch = this.getTypeSafe(baseTouch, altTouch, def || '');
		switch (touch.toLowerCase()) {
			case 'rotate':
				return I3JS.TOUCH.ROTATE;
			case 'pan':
				return I3JS.TOUCH.PAN;
			case 'dolly_pan':
			case 'dollypan':
				return I3JS.TOUCH.DOLLY_PAN;
			case 'dolly_rotate':
			case 'dollyrotate':
				return I3JS.TOUCH.DOLLY_ROTATE;
			default:
				return undefined;
		}
	}

	/**
	 * Gets CullFace safe
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.CullFaceNone | none |
	 * | THREE.CullFaceBack | back |
	 * | THREE.CullFaceFront | front |
	 * | THREE.CullFaceFrontBack | frontback |
	 *
	 * @param baseTouch
	 * @param [altTouch]
	 * @param [def]
	 * @returns CullFace safe
	 */
	public static getCullFaceSafe(baseCullFace: string, altCullFace?: string, def?: string): I3JS.CullFace {
		const cullFace = this.getTypeSafe(baseCullFace, altCullFace, def || '');
		switch (cullFace.toLowerCase()) {
			case 'none':
				return I3JS.CullFace.CullFaceNone;
			case 'back':
				return I3JS.CullFace.CullFaceBack;
			case 'front':
				return I3JS.CullFace.CullFaceFront;
			case 'frontback':
				return I3JS.CullFace.CullFaceFrontBack;
			default:
				return undefined;
		}
	}

	/**
	 * Gets Shadowing Type
	 *
	 * @param baseShadowMapType
	 * @param [def]
	 * @returns shadow map type safe
	 */
	public static getShadowMapTypeSafe(baseShadowMapType: string, def?: string): I3JS.ShadowMapType {
		const shadowMapType = this.getTypeSafe(baseShadowMapType, def, '');
		switch (shadowMapType.toLowerCase()) {
			case 'basicshadowmap':
			case 'basic':
				return I3JS.ShadowMapType.BasicShadowMap;
			case 'pcfshadowmap':
			case 'pcf':
				return I3JS.ShadowMapType.PCFShadowMap;
			case 'vsmshadowmap':
			case 'vsm':
				return I3JS.ShadowMapType.VSMShadowMap;
			case 'pcfsoftshadowmap':
			case 'pcfsoft':
			default:
				return I3JS.ShadowMapType.PCFSoftShadowMap;
		}
	}

	/**
	 * Gets side
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.FrontSide | FrontSide , Front |
	 * | THREE.BackSide | BackSide , Back |
	 * | THREE.DoubleSide | DoubleSide , Double |
	 *
	 * @param [def]
	 * @returns side
	 */
	public static getSideSafe(baseSide: string, altSide?: string, def?: string): I3JS.Side {
		const side = this.getTypeSafe(baseSide, altSide, def || '');
		switch (side.toLowerCase()) {
			case 'backside':
			case 'back':
				return I3JS.Side.BackSide;
			case 'doubleside':
			case 'double':
				return I3JS.Side.DoubleSide;
			case 'frontside':
			case 'front':
				return I3JS.Side.FrontSide;
		}
		return undefined;
	}

	/**
	 * Gets Shading
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.FlatShading | Flat |
	 * | THREE.SmoothShading | Smooth |
	 *
	 * @param [def]
	 * @returns Shading
	 */
	public static getShadingSafe(baseSide: string, altSide?: string, def?: string): I3JS.Shading {
		const side = this.getTypeSafe(baseSide, altSide, def || '');
		switch (side.toLowerCase()) {
			case 'flat':
				return I3JS.Shading.FlatShading;
			case 'smooth':
				return I3JS.Shading.SmoothShading;
		}
		return undefined;
	}

	/**
	 * Which blending to use when displaying objects with this material. Default is {@link NormalBlending}.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.NoBlending | NoBlending, No |
	 * | THREE.NormalBlending | NormalBlending, Normal |
	 * | THREE.AdditiveBlending | AdditiveBlending, Additive |
	 * | THREE.SubtractiveBlending | SubtractiveBlending, Subtractive |
	 * | THREE.MultiplyBlending | MultiplyBlending, Multiply |
	 * | THREE.CustomBlending | CustomBlending, Custom |
	 *
	 * @param baseBlending
	 * @param [altBlending]
	 * @param [def]
	 * @returns blending safe
	 *
	 *
	 */
	public static getBlendingSafe(baseBlending: string, altBlending?: string, def?: string): I3JS.Blending {
		const blending = this.getTypeSafe(baseBlending, altBlending, def || '');
		switch (blending.toLowerCase()) {
			case 'noblending':
			case 'no':
				return I3JS.Blending.NoBlending;
			case 'normalblending':
			case 'normal':
				return I3JS.Blending.NormalBlending;
			case 'additiveblending':
			case 'additive':
				return I3JS.Blending.AdditiveBlending;
			case 'subtractiveblending':
			case 'subtractive':
				return I3JS.Blending.SubtractiveBlending;
			case 'multiplyblending':
			case 'multiply':
				return I3JS.Blending.MultiplyBlending;
			case 'customblending':
			case 'custom':
				return I3JS.Blending.CustomBlending;
		}
		return undefined;
	}

	/**
	 * Gets blend equation
	 * custom blending equations (numbers start from 100 not to clash with other mappings to OpenGL constants defined in Texture.js)
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.AddEquation | AddEquation, Add |
	 * | THREE.SubtractEquation | SubtractEquation, Subtract |
	 * | THREE.ReverseSubtractEquation | ReverseSubtractEquation, ReverseSubtract, Reverse |
	 * | THREE.MinEquation | MinEquation, Min |
	 * | THREE.MaxEquation | MaxEquation, Max |
	 *
	 * @param [def]
	 * @returns blend equation
	 */
	public static getBlendEquationSafe(baseBlendEquation: string, def?: string): I3JS.BlendingEquation {
		const blendEquation = this.getTypeSafe(baseBlendEquation, def, '');
		switch (blendEquation.toLowerCase()) {
			case 'addequation':
			case 'add':
				return I3JS.BlendingEquation.AddEquation;
			case 'subtractequation':
			case 'subtract':
				return I3JS.BlendingEquation.SubtractEquation;
			case 'reversesubtractequation':
			case 'reverse':
			case 'reversesubtract':
				return I3JS.BlendingEquation.ReverseSubtractEquation;
			case 'minequation':
			case 'min':
				return I3JS.BlendingEquation.MinEquation;
			case 'maxequation':
			case 'max':
				return I3JS.BlendingEquation.MaxEquation;
		}
		return undefined;
	}

	/**
	 * Which blending to use when displaying objects with this material.
	 * This must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) to use custom [blendSrc](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendSrc), [blendDst](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendDst) or [blendEquation](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendEquation).
	 * See the blending mode [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) for all possible values. Default is [NormalBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials).
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.ZeroFactor | ZeroFactor , Zero |
	 * | THREE.OneFactor | OneFactor , One |
	 * | THREE.SrcColorFactor | SrcColorFactor , SrcColor |
	 * | THREE.OneMinusSrcColorFactor | OneMinusSrcColorFactor , OneMinusSrcColor |
	 * | THREE.SrcAlphaFactor | SrcAlphaFactor , SrcAlpha |
	 * | THREE.OneMinusSrcAlphaFactor | OneMinusSrcAlphaFactor , OneMinusSrcAlpha |
	 * | THREE.DstAlphaFactor | DstAlphaFactor , DstAlpha |
	 * | THREE.OneMinusDstAlphaFactor | OneMinusDstAlphaFactor , OneMinusDstAlpha |
	 * | THREE.DstColorFactor | DstColorFactor , DstColor |
	 * | THREE.OneMinusDstColorFactor | OneMinusDstColorFactor , OneMinusDstColor |
	 *
	 * @param [def]
	 * @returns blend src
	 */
	public static getBlendDstSafe(baseBlendSrc: string, def?: string): I3JS.BlendingDstFactor {
		const blendSrc = this.getTypeSafe(baseBlendSrc, def, '');
		switch (blendSrc.toLowerCase()) {
			case 'zerofactor':
			case 'zero':
				return I3JS.BlendingDstFactor.ZeroFactor;
			case 'onefactor':
			case 'one':
				return I3JS.BlendingDstFactor.OneFactor;
			case 'srccolorfactor':
			case 'srccolor':
				return I3JS.BlendingDstFactor.SrcColorFactor;
			case 'oneminussrccolorfactor':
			case 'oneminussrccolor':
				return I3JS.BlendingDstFactor.OneMinusSrcColorFactor;
			case 'srcalphafactor':
			case 'srcalpha':
				return I3JS.BlendingDstFactor.SrcAlphaFactor;
			case 'oneminussrcalphafactor':
			case 'oneminussrcalpha':
				return I3JS.BlendingDstFactor.OneMinusSrcAlphaFactor;
			case 'dstalphafactor':
			case 'dstalpha':
				return I3JS.BlendingDstFactor.DstAlphaFactor;
			case 'oneminusdstalphafactor':
			case 'oneminusdstalpha':
				return I3JS.BlendingDstFactor.OneMinusDstAlphaFactor;
			case 'dstcolorfactor':
			case 'dstcolor':
				return I3JS.BlendingDstFactor.DstColorFactor;
			case 'oneminusdstcolorfactor':
			case 'oneminusdstcolor':
				return I3JS.BlendingDstFactor.OneMinusDstColorFactor;
		}
		return undefined;
	}

	/**
	 * Which blending to use when displaying objects with this material.
	 * This must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) to use custom [blendSrc](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendSrc), [blendDst](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendDst) or [blendEquation](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendEquation).
	 * See the blending mode [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) for all possible values. Default is [NormalBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials).
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.SrcAlphaSaturateFactor | SrcAlphaSaturateFactor , SrcAlphaSaturate, SrcAlpha |
	 *
	 * @param [def]
	 * @returns blend src
	 */
	public static getBlendSrcSafe(baseBlendSrc: string, def?: string): I3JS.BlendingSrcFactor {
		const blendSrc = this.getTypeSafe(baseBlendSrc, def, '');
		switch (blendSrc.toLowerCase()) {
			case 'srcalphasaturatefactor':
			case 'srcalphasaturate':
				return I3JS.BlendingSrcFactor.SrcAlphaSaturateFactor;
		}
		return undefined;
	}

	/**
	 * Gets depth func
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.NeverDepth | NeverDepth, Never |
	 * | THREE.AlwaysDepth | AlwaysDepth, Always |
	 * | THREE.LessDepth | LessDepth, Less |
	 * | THREE.LessEqualDepth | LessEqualDepth, LessEqual |
	 * | THREE.EqualDepth | EqualDepth, Equal |
	 * | THREE.GreaterEqualDepth | GreaterEqualDepth, GreaterEqual |
	 * | THREE.GreaterDepth | GreaterDepth, Greater |
	 * | THREE.NotEqualDepth | NotEqualDepth, NotEqual |
	 *
	 * @param [def]
	 * @returns depth func
	 */
	public static getDepthModesSafe(baseDepthFunc: string, def?: string): I3JS.DepthModes {
		const depthFunc = NgxThreeUtil.getTypeSafe(baseDepthFunc, def, '');
		switch (depthFunc.toLowerCase()) {
			case 'neverdepth':
			case 'never':
				return I3JS.DepthModes.NeverDepth;
			case 'alwaysdepth':
			case 'always':
				return I3JS.DepthModes.AlwaysDepth;
			case 'lessdepth':
			case 'less':
				return I3JS.DepthModes.LessDepth;
			case 'lessequaldepth':
			case 'lessequal':
				return I3JS.DepthModes.LessEqualDepth;
			case 'equaldepth':
			case 'equal':
				return I3JS.DepthModes.EqualDepth;
			case 'greaterequaldepth':
			case 'greaterequal':
				return I3JS.DepthModes.GreaterEqualDepth;
			case 'greaterdepth':
			case 'greater':
				return I3JS.DepthModes.GreaterDepth;
			case 'notequaldepth':
			case 'notequal':
				return I3JS.DepthModes.NotEqualDepth;
		}
		return undefined;
	}

	/**
	 * Gets combine
	 * @param [def]
	 * @returns combine
	 */
	public static getCombineSafe(baseCombine: string, def?: string): I3JS.Combine {
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
	 * Get The ToneMapping
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.NoToneMapping | No |
	 * | THREE.LinearToneMapping | Linear |
	 * | THREE.ReinhardToneMapping | Reinhard |
	 * | THREE.CineonToneMapping | Cineon |
	 * | THREE.ACESFilmicToneMapping | ACESFilmic |
	 * | THREE.CustomToneMapping | Custom |
	 *
	 * @param [def]
	 * @returns toneMapping
	 */
	public static getToneMappingSafe(baseToneMapping: string, def?: string): I3JS.ToneMapping {
		const toneMapping = this.getTypeSafe(baseToneMapping, def, '');
		switch (toneMapping.toLowerCase()) {
			case 'no':
				return I3JS.ToneMapping.NoToneMapping;
			case 'linear':
				return I3JS.ToneMapping.LinearToneMapping;
			case 'reinhard':
				return I3JS.ToneMapping.ReinhardToneMapping;
			case 'cineon':
				return I3JS.ToneMapping.CineonToneMapping;
			case 'acesfilmic':
				return I3JS.ToneMapping.ACESFilmicToneMapping;
			case 'custom':
				return I3JS.ToneMapping.CustomToneMapping;
		}
		return undefined;
	}

	/**
	 * Gets mapping safe
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.UVMapping | UVMapping, UV |
	 * | THREE.CubeReflectionMapping | CubeReflectionMapping, CubeReflection |
	 * | THREE.CubeRefractionMapping | CubeRefractionMapping, CubeRefraction |
	 * | THREE.EquirectangularReflectionMapping | EquirectangularReflectionMapping, EquirectangularReflection |
	 * | THREE.EquirectangularRefractionMapping | EquirectangularRefractionMapping, EquirectangularRefraction |
	 * | THREE.CubeUVReflectionMapping | CubeUVReflectionMapping, CubeUVReflection |
	 * | THREE.CubeUVRefractionMapping | CubeUVRefractionMapping, CubeUVRefraction |
	 *
	 * @param baseMapping
	 * @param [altMapping]
	 * @param [def]
	 * @returns mapping safe
	 */
	public static getMappingSafe(baseMapping: string, altMapping?: string, def?: string): I3JS.Mapping {
		const mapping = this.getTypeSafe(baseMapping, altMapping, def || '');
		switch (mapping.toLowerCase()) {
			case 'uvmapping':
			case 'uv':
				return I3JS.Mapping.UVMapping;
			case 'cubereflectionmapping':
			case 'cubereflection':
				return I3JS.Mapping.CubeReflectionMapping;
			case 'cuberefractionmapping':
			case 'cuberefraction':
				return I3JS.Mapping.CubeRefractionMapping;
			case 'equirectangularreflectionmapping':
			case 'equirectangularreflection':
				return I3JS.Mapping.EquirectangularReflectionMapping;
			case 'equirectangularrefractionmapping':
			case 'equirectangularrefraction':
				return I3JS.Mapping.EquirectangularRefractionMapping;
			case 'cubeuvreflectionmapping':
			case 'cubeuvreflection':
				return I3JS.Mapping.CubeUVReflectionMapping;
			case 'cubeuvrefractionmapping':
			case 'cubeuvrefraction':
				return I3JS.Mapping.CubeUVRefractionMapping;
			default:
				return N3JS.DEFAULT_MAPPING;
		}
	}

	/**
	 * Gets wrapping safe
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.RepeatWrapping | RepeatWrapping, Repeat |
	 * | THREE.MirroredRepeatWrapping | MirroredRepeatWrapping, MirroredRepeat |
	 * | THREE.ClampToEdgeWrapping | ClampToEdgeWrapping, ClampToEdge |
	 *
	 * @param baseWrap
	 * @param [altWrap]
	 * @param [def]
	 * @returns wrapping safe
	 */
	public static getWrappingSafe(baseWrap: string, altWrap?: string, def?: string): I3JS.Wrapping {
		const wrap = this.getTypeSafe(baseWrap, altWrap, def || '');
		switch (wrap.toLowerCase()) {
			case 'wraprepeat':
			case 'repeatwrapping':
			case 'repeat':
				return I3JS.Wrapping.RepeatWrapping;
			case 'mirroredrepeatwrapping':
			case 'mirroredrepeat':
				return I3JS.Wrapping.MirroredRepeatWrapping;
			case 'clamptoedgewrapping':
			case 'clamptoedge':
				return I3JS.Wrapping.ClampToEdgeWrapping;
			default:
				return undefined;
		}
	}

	/**
	 * Gets texture filter safe
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.NearestFilter | NearestFilter, Nearest |
	 * | THREE.NearestMipmapNearestFilter | NearestMipmapNearestFilter, nearestmipmapnearest |
	 * | THREE.NearestMipmapLinearFilter | NearestMipmapLinearFilter, nearestmipmaplinear |
	 * | THREE.LinearMipmapNearestFilter | LinearMipmapNearestFilter, linearmipmapnearest |
	 * | THREE.LinearMipmapLinearFilter | LinearMipmapLinearFilter, linearmipmaplinear |
	 * | THREE.LinearFilter | Linearfilter, linear |
	 *
	 * @param baseFilter
	 * @param [altFilter]
	 * @param [def]
	 * @returns texture filter safe
	 */
	public static getTextureFilterSafe(baseFilter: string, altFilter?: string, def?: string): I3JS.TextureFilter {
		const filter = this.getTypeSafe(baseFilter, altFilter, def || '');
		switch (filter.toLowerCase()) {
			case 'nearestfilter':
			case 'nearest':
				return I3JS.TextureFilter.NearestFilter;
			case 'nearestmipmapnearestfilter':
			case 'nearestmipmapnearest':
				return I3JS.TextureFilter.NearestMipmapNearestFilter;
			case 'nearestmipmaplinearfilter':
			case 'nearestmipmaplinear':
				return I3JS.TextureFilter.NearestMipmapLinearFilter;
			case 'linearmipmapnearestfilter':
			case 'linearmipmapnearest':
				return I3JS.TextureFilter.LinearMipmapNearestFilter;
			case 'linearmipmaplinearfilter':
			case 'linearmipmaplinear':
				return I3JS.TextureFilter.LinearMipmapLinearFilter;
			case 'linearfilter':
			case 'linear':
				return I3JS.TextureFilter.LinearFilter;
			default:
				return undefined;
		}
	}

	/**
	 * Gets texture data type safe
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.ByteType | ByteType, Byte |
	 * | THREE.ShortType | ShortType, Short |
	 * | THREE.UnsignedShortType | UnsignedShortType, UnsignedShort |
	 * | THREE.IntType | IntType, Int |
	 * | THREE.UnsignedIntType | UnsignedIntType, UnsignedInt |
	 * | THREE.FloatType | FloatType, Float |
	 * | THREE.HalfFloatType | HalfFloatType, HalfFloat |
	 * | THREE.UnsignedShort4444Type | UnsignedShort4444Type, UnsignedShort4444 |
	 * | THREE.UnsignedShort5551Type | UnsignedShort5551Type, UnsignedShort5551 |
	 * | THREE.UnsignedShort565Type | UnsignedShort565Type, UnsignedShort565 |
	 * | THREE.UnsignedInt248Type | UnsignedInt248Type, UnsignedInt248 |
	 * | THREE.UnsignedByteType | UnsignedByteType, UnsignedByte |
	 *
	 * @param baseFormat
	 * @param [altFormat]
	 * @param [def]
	 * @returns texture data type safe
	 */
	public static getTextureDataTypeSafe(baseFormat: string, altFormat?: string, def?: string): I3JS.TextureDataType {
		const type = this.getTypeSafe(baseFormat, altFormat, def || '');
		switch (type.toLowerCase()) {
			case 'bytetype':
			case 'byte':
				return I3JS.TextureDataType.ByteType;
			case 'shorttype':
			case 'short':
				return I3JS.TextureDataType.ShortType;
			case 'unsignedshorttype':
			case 'unsignedshort':
				return I3JS.TextureDataType.UnsignedShortType;
			case 'inttype':
			case 'int':
				return I3JS.TextureDataType.IntType;
			case 'unsignedinttype':
			case 'unsignedint':
				return I3JS.TextureDataType.UnsignedIntType;
			case 'floattype':
			case 'float':
				return I3JS.TextureDataType.FloatType;
			case 'halffloattype':
			case 'halffloat':
				return I3JS.TextureDataType.HalfFloatType;
			case 'unsignedshort4444type':
			case 'unsignedshort4444':
				return I3JS.TextureDataType.UnsignedShort4444Type;
			case 'unsignedshort5551type':
			case 'unsignedshort5551':
				return I3JS.TextureDataType.UnsignedShort5551Type;
			case 'unsignedshort565type':
			case 'unsignedshort565':
				return I3JS.TextureDataType.UnsignedShort565Type;
			case 'unsignedint248type':
			case 'unsignedint248':
				return I3JS.TextureDataType.UnsignedInt248Type;
			case 'unsignedbytetype':
			case 'unsignedbyte':
				return I3JS.TextureDataType.UnsignedByteType;
			default:
				return undefined;
		}
	}

	/**
	 * Gets pixel format safe
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.AlphaFormat | AlphaFormat, Alpha |
	 * | THREE.RedFormat | RedFormat, Red |
	 * | THREE.RedIntegerFormat | RedIntegerFormat, RedInteger |
	 * | THREE.RGFormat | RGFormat, RG |
	 * | THREE.RGIntegerFormat | RGIntegerFormat, RGInteger |
	 * | THREE.RGBFormat | RGBFormat, RGB |
	 * | THREE.RGBIntegerFormat | RGBIntegerFormat, RGBInteger |
	 * | THREE.RGBAIntegerFormat | RGBAIntegerFormat, RGBAInteger |
	 * | THREE.LuminanceFormat | LuminanceFormat, Luminance |
	 * | THREE.LuminanceAlphaFormat | LuminanceAlphaFormat, LuminanceAlpha |
	 * | THREE.RGBEFormat | RGBEFormat, RGBE |
	 * | THREE.DepthFormat | DepthFormat, Depth |
	 * | THREE.DepthStencilFormat | DepthStencilFormat, DepthStencil |
	 * | THREE.RGBAFormat | RGBAFormat, RGBA |
	 *
	 * @param baseFormat
	 * @param [altFormat]
	 * @param [def]
	 * @returns pixel format safe
	 */
	public static getPixelFormatSafe(baseFormat: string, altFormat?: string, def?: string): I3JS.PixelFormat {
		const format = this.getTypeSafe(baseFormat, altFormat, def || '');
		switch (format.toLowerCase()) {
			case 'alphaformat':
			case 'alpha':
				return I3JS.PixelFormat.AlphaFormat;
			case 'redformat':
			case 'red':
				return I3JS.PixelFormat.RedFormat;
			case 'redintegerformat':
			case 'redinteger':
				return I3JS.PixelFormat.RedIntegerFormat;
			case 'rgformat':
			case 'rg':
				return I3JS.PixelFormat.RGFormat;
			case 'rgintegerformat':
			case 'rginteger':
				return I3JS.PixelFormat.RGIntegerFormat;
			case 'rgbformat':
			case 'rgb':
				return I3JS.PixelFormat.RGBFormat;
			case 'rgbintegerformat':
			case 'rgbinteger':
				return I3JS.PixelFormat.RGBIntegerFormat;
			case 'rgbaintegerformat':
			case 'rgbainteger':
				return I3JS.PixelFormat.RGBAIntegerFormat;
			case 'luminanceformat':
			case 'luminance':
				return I3JS.PixelFormat.LuminanceFormat;
			case 'luminancealphaformat':
			case 'luminancealpha':
				return I3JS.PixelFormat.LuminanceAlphaFormat;
			case 'rgbeformat':
			case 'rgbe':
				return I3JS.PixelFormat.RGBEFormat;
			case 'depthformat':
			case 'depth':
				return I3JS.PixelFormat.DepthFormat;
			case 'depthstencilformat':
			case 'depthstencil':
				return I3JS.PixelFormat.DepthStencilFormat;
			case 'rgbaformat':
			case 'rgba':
				return I3JS.PixelFormat.RGBAFormat;
			default:
				break;
		}
		return undefined;
	}

	/**
	 * Gets pixel format gpusafe, Internal Pixel Formats
	 *
	 * @param baseFormat
	 * @param [altFormat]
	 * @param [def]
	 * @returns pixel format gpusafe
	 */
	public static getPixelFormatGPUSafe(baseFormat: string, altFormat?: string, def?: string): I3JS.PixelFormatGPU {
		const format = this.getTypeSafe(baseFormat, altFormat, def || '');
		switch (format.toLowerCase()) {
			case 'alpha':
				return 'ALPHA';
			case 'rgb':
				return 'RGB';
			case 'rgba':
				return 'RGBA';
			case 'luminance':
				return 'LUMINANCE';
			case 'luminance_alpha':
				return 'LUMINANCE_ALPHA';
			case 'red_integer':
				return 'RED_INTEGER';
			case 'r8':
				return 'R8';
			case 'r8_snorm':
				return 'R8_SNORM';
			case 'r8i':
				return 'R8I';
			case 'r8ui':
				return 'R8UI';
			case 'r16i':
				return 'R16I';
			case 'r16ui':
				return 'R16UI';
			case 'r16f':
				return 'R16F';
			case 'r32i':
				return 'R32I';
			case 'r32ui':
				return 'R32UI';
			case 'r32f':
				return 'R32F';
			case 'rg8':
				return 'RG8';
			case 'rg8_snorm':
				return 'RG8_SNORM';
			case 'rg8i':
				return 'RG8I';
			case 'rg8ui':
				return 'RG8UI';
			case 'rg16i':
				return 'RG16I';
			case 'rg16ui':
				return 'RG16UI';
			case 'rg16f':
				return 'RG16F';
			case 'rg32i':
				return 'RG32I';
			case 'rg32ui':
				return 'RG32UI';
			case 'rg32f':
				return 'RG32F';
			case 'rgb565':
				return 'RGB565';
			case 'rgb8':
				return 'RGB8';
			case 'rgb8_snorm':
				return 'RGB8_SNORM';
			case 'rgb8i':
				return 'RGB8I';
			case 'rgb8ui':
				return 'RGB8UI';
			case 'rgb16i':
				return 'RGB16I';
			case 'rgb16ui':
				return 'RGB16UI';
			case 'rgb16f':
				return 'RGB16F';
			case 'rgb32i':
				return 'RGB32I';
			case 'rgb32ui':
				return 'RGB32UI';
			case 'rgb32f':
				return 'RGB32F';
			case 'rgb9_e5':
				return 'RGB9_E5';
			case 'srgb8':
				return 'SRGB8';
			case 'r11f_g11f_b10f':
				return 'R11F_G11F_B10F';
			case 'rgba4':
				return 'RGBA4';
			case 'rgba8':
				return 'RGBA8';
			case 'rgba8_snorm':
				return 'RGBA8_SNORM';
			case 'rgba8i':
				return 'RGBA8I';
			case 'rgba8ui':
				return 'RGBA8UI';
			case 'rgba16i':
				return 'RGBA16I';
			case 'rgba16ui':
				return 'RGBA16UI';
			case 'rgba16f':
				return 'RGBA16F';
			case 'rgba32i':
				return 'RGBA32I';
			case 'rgba32ui':
				return 'RGBA32UI';
			case 'rgba32f':
				return 'RGBA32F';
			case 'rgb5_a1':
				return 'RGB5_A1';
			case 'rgb10_a2':
				return 'RGB10_A2';
			case 'rgb10_a2ui':
				return 'RGB10_A2UI';
			case 'srgb8_alpha8':
				return 'SRGB8_ALPHA8';
			case 'depth_component16':
				return 'DEPTH_COMPONENT16';
			case 'depth_component24':
				return 'DEPTH_COMPONENT24';
			case 'depth_component32f':
				return 'DEPTH_COMPONENT32F';
			case 'depth24_stencil8':
				return 'DEPTH24_STENCIL8';
			case 'depth32f_stencil8':
				return 'DEPTH32F_STENCIL8';
			default:
				break;
		}
		return undefined;
	}

	/**
	 * Gets pixel format safe
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.AlphaFormat | AlphaFormat, Alpha |
	 * | THREE.RedFormat | RedFormat, Red |
	 * | THREE.RedIntegerFormat | RedIntegerFormat, RedInteger |
	 * | THREE.RGFormat | RGFormat, RG |
	 * | THREE.RGIntegerFormat | RGIntegerFormat, RGInteger |
	 * | THREE.RGBFormat | RGBFormat, RGB |
	 * | THREE.RGBIntegerFormat | RGBIntegerFormat, RGBInteger |
	 * | THREE.RGBAIntegerFormat | RGBAIntegerFormat, RGBAInteger |
	 * | THREE.LuminanceFormat | LuminanceFormat, Luminance |
	 * | THREE.LuminanceAlphaFormat | LuminanceAlphaFormat, LuminanceAlpha |
	 * | THREE.RGBEFormat | RGBEFormat, RGBE |
	 * | THREE.DepthFormat | DepthFormat, Depth |
	 * | THREE.DepthStencilFormat | DepthStencilFormat, DepthStencil |
	 * | THREE.RGBAFormat | RGBAFormat, RGBA |
	 *
	 * @param baseFormat
	 * @param [altFormat]
	 * @param [def]
	 * @returns pixel format safe
	 */
	public static getCompressedPixelFormatSafe(
		baseFormat: string,
		altFormat?: string,
		def?: string
	): I3JS.CompressedPixelFormat {
		const format = this.getTypeSafe(baseFormat, altFormat, def || '');
		switch (format.toLowerCase()) {
			case 'rgb_s3tc_dxt1':
				return I3JS.CompressedPixelFormat.RGB_S3TC_DXT1_Format;
			case 'rgba_s3tc_dxt1':
				return I3JS.CompressedPixelFormat.RGBA_S3TC_DXT1_Format;
			case 'rgba_s3tc_dxt3':
				return I3JS.CompressedPixelFormat.RGBA_S3TC_DXT3_Format;
			case 'rgba_s3tc_dxt5':
				return I3JS.CompressedPixelFormat.RGBA_S3TC_DXT5_Format;
			case 'rgb_pvrtc_4bppv1':
				return I3JS.CompressedPixelFormat.RGB_PVRTC_4BPPV1_Format;
			case 'rgb_pvrtc_2bppv1':
				return I3JS.CompressedPixelFormat.RGB_PVRTC_2BPPV1_Format;
			case 'rgba_pvrtc_4bppv1':
				return I3JS.CompressedPixelFormat.RGBA_PVRTC_4BPPV1_Format;
			case 'rgba_pvrtc_2bppv1':
				return I3JS.CompressedPixelFormat.RGBA_PVRTC_2BPPV1_Format;
			case 'rgb_etc1':
				return I3JS.CompressedPixelFormat.RGB_ETC1_Format;
			case 'rgb_etc2':
				return I3JS.CompressedPixelFormat.RGB_ETC2_Format;
			case 'rgba_etc2_eac':
				return I3JS.CompressedPixelFormat.RGBA_ETC2_EAC_Format;
			case 'rgba_astc_4x4':
				return I3JS.CompressedPixelFormat.RGBA_ASTC_4x4_Format;
			case 'rgba_astc_5x4':
				return I3JS.CompressedPixelFormat.RGBA_ASTC_5x4_Format;
			case 'rgba_astc_5x5':
				return I3JS.CompressedPixelFormat.RGBA_ASTC_5x5_Format;
			case 'rgba_astc_6x5':
				return I3JS.CompressedPixelFormat.RGBA_ASTC_6x5_Format;
			case 'rgba_astc_6x6':
				return I3JS.CompressedPixelFormat.RGBA_ASTC_6x6_Format;
			case 'rgba_astc_8x5':
				return I3JS.CompressedPixelFormat.RGBA_ASTC_8x5_Format;
			case 'rgba_astc_8x6':
				return I3JS.CompressedPixelFormat.RGBA_ASTC_8x6_Format;
			case 'rgba_astc_8x8':
				return I3JS.CompressedPixelFormat.RGBA_ASTC_8x8_Format;
			case 'rgba_astc_10x5':
				return I3JS.CompressedPixelFormat.RGBA_ASTC_10x5_Format;
			case 'rgba_astc_10x6':
				return I3JS.CompressedPixelFormat.RGBA_ASTC_10x6_Format;
			case 'rgba_astc_10x8':
				return I3JS.CompressedPixelFormat.RGBA_ASTC_10x8_Format;
			case 'rgba_astc_10x10':
				return I3JS.CompressedPixelFormat.RGBA_ASTC_10x10_Format;
			case 'rgba_astc_12x10':
				return I3JS.CompressedPixelFormat.RGBA_ASTC_12x10_Format;
			case 'rgba_astc_12x12':
				return I3JS.CompressedPixelFormat.RGBA_ASTC_12x12_Format;
			case 'rgba_bptc':
				return I3JS.CompressedPixelFormat.RGBA_BPTC_Format;
			case 'srgb8_alpha8_astc_4x4':
				return I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_4x4_Format;
			case 'srgb8_alpha8_astc_5x4':
				return I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_5x4_Format;
			case 'srgb8_alpha8_astc_5x5':
				return I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_5x5_Format;
			case 'srgb8_alpha8_astc_6x5':
				return I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_6x5_Format;
			case 'srgb8_alpha8_astc_6x6':
				return I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_6x6_Format;
			case 'srgb8_alpha8_astc_8x5':
				return I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_8x5_Format;
			case 'srgb8_alpha8_astc_8x6':
				return I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_8x6_Format;
			case 'srgb8_alpha8_astc_8x8':
				return I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_8x8_Format;
			case 'srgb8_alpha8_astc_10x5':
				return I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_10x5_Format;
			case 'srgb8_alpha8_astc_10x6':
				return I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_10x6_Format;
			case 'srgb8_alpha8_astc_10x8':
				return I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_10x8_Format;
			case 'srgb8_alpha8_astc_10x10':
				return I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_10x10_Format;
			case 'srgb8_alpha8_astc_12x10':
				return I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_12x10_Format;
			case 'srgb8_alpha8_astc_12x12':
				return I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_12x12_Format;
			default:
				break;
		}
		return undefined;
	}

	/**
	 * Gets pixel format or compressed pixel format safe
	 *
	 * @param baseFormat
	 * @param [altFormat]
	 * @param [def]
	 * @returns pixel format or compressed pixel format safe
	 */
	public static getPixelFormatOrCompressedPixelFormatSafe(
		baseFormat: string,
		altFormat?: string,
		def?: string
	): I3JS.PixelFormat | I3JS.CompressedPixelFormat {
		const pixelFormat = this.getPixelFormatSafe(baseFormat, altFormat, def);
		if (this.isNull(pixelFormat)) {
			return this.getCompressedPixelFormatSafe(baseFormat, altFormat, def);
		} else {
			return pixelFormat;
		}
	}

	/**
	 * Gets loop
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.LoopOnce | LoopOnce, Once |
	 * | THREE.LoopRepeat | LoopRepeat, Repeat |
	 * | THREE.LoopPingPong | LoopPingPong, PingPong |
	 *
	 * @param [def]
	 * @returns loop
	 */
	public static getLoopSafe(baseLoop: string, def?: string): I3JS.AnimationActionLoopStyles {
		const loop = this.getTypeSafe(baseLoop, def, '');
		switch (loop.toLowerCase()) {
			case 'looponce':
			case 'once':
				return I3JS.AnimationActionLoopStyles.LoopOnce;
			case 'looppingpong':
			case 'pingpong':
				return I3JS.AnimationActionLoopStyles.LoopPingPong;
			case 'looprepeat':
			case 'repeat':
			default:
				return I3JS.AnimationActionLoopStyles.LoopRepeat;
		}
	}

	/**
	 * Gets interpolation
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.InterpolateDiscrete | InterpolateDiscrete, Discrete |
	 * | THREE.InterpolateLinear | InterpolateLinear, Linear |
	 * | THREE.InterpolateSmooth | InterpolateSmooth, Smooth |
	 *
	 * @param [def]
	 * @returns interpolation
	 */
	public static getInterpolationSafe(baseInterpolation: string, def?: string): I3JS.InterpolationModes {
		const interpolation = this.getTypeSafe(baseInterpolation, def, '');
		switch (interpolation.toLowerCase()) {
			case 'interpolatediscrete':
			case 'discrete':
				return I3JS.InterpolationModes.InterpolateDiscrete;
			case 'interpolatelinear':
			case 'linear':
				return I3JS.InterpolationModes.InterpolateLinear;
			case 'interpolatesmooth':
			case 'smooth':
				return I3JS.InterpolationModes.InterpolateSmooth;
			default:
				return undefined;
		}
	}

	/**
	 * Gets interpolation ending
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.ZeroCurvatureEnding | ZeroCurvatureEnding, ZeroCurvature |
	 * | THREE.ZeroSlopeEnding | ZeroSlopeEnding, ZeroSlope |
	 * | THREE.WrapAroundEnding | WrapAroundEnding, WrapAround |
	 *
	 * @param [def]
	 * @returns interpolation ending
	 */
	public static getInterpolationEndingSafe(baseInterpolation: string, def?: string): I3JS.InterpolationEndingModes {
		const interpolation = this.getTypeSafe(baseInterpolation, def, '');
		switch (interpolation.toLowerCase()) {
			case 'zerocurvature':
			case 'zerocurvatureending':
				return I3JS.InterpolationEndingModes.ZeroCurvatureEnding;
			case 'zeroslope':
			case 'zeroslopeending':
				return I3JS.InterpolationEndingModes.ZeroSlopeEnding;
			case 'wraparound':
			case 'wraparoundending':
				return I3JS.InterpolationEndingModes.WrapAroundEnding;
			default:
				return undefined;
		}
	}

	/**
	 * Gets blend mode
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.NormalAnimationBlendMode | NormalAnimationBlendMode, NormalAnimation, Normal |
	 * | THREE.AdditiveAnimationBlendMode | AdditiveAnimationBlendMode, AdditiveAnimation, Additive |
	 *
	 * @param [def]
	 * @returns blend mode
	 */
	public static getBlendModeSafe(baseBlendMode: string, def?: string): I3JS.AnimationBlendMode {
		const blendMode = this.getTypeSafe(baseBlendMode, def, '');
		switch (blendMode.toLowerCase()) {
			case 'normalanimationblendmode':
			case 'normalanimation':
			case 'normal':
				return I3JS.AnimationBlendMode.NormalAnimationBlendMode;
			case 'additiveanimationblendmode':
			case 'additiveanimation':
			case 'additive':
				return I3JS.AnimationBlendMode.AdditiveAnimationBlendMode;
		}
		return N3JS.NormalAnimationBlendMode;
	}

	/**
	 * Gets TrianglesDraw mode
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.TrianglesDrawMode | TrianglesDrawMode, DrawMode |
	 * | THREE.TriangleStripDrawMode | TriangleStripDrawMode, StripDrawMode, Strip |
	 * | THREE.TriangleFanDrawMode | TriangleFanDrawMode, FanDrawMode, Fan |
	 *
	 * @param [def]
	 * @returns TrianglesDraw mode
	 */
	public static getTrianglesDrawModesSafe(baseBlendMode: string, def?: string): I3JS.TrianglesDrawModes {
		const blendMode = this.getTypeSafe(baseBlendMode, def, '');
		switch (blendMode.toLowerCase()) {
			case 'drawmode':
			case 'trianglesdrawmode':
				return I3JS.TrianglesDrawModes.TrianglesDrawMode;
			case 'strip':
			case 'stripdrawmode':
			case 'trianglestripdrawmode':
				return I3JS.TrianglesDrawModes.TriangleStripDrawMode;
			case 'fan':
			case 'fandrawmode':
			case 'trianglefandrawmode':
				return I3JS.TrianglesDrawModes.TriangleFanDrawMode;
		}
		return undefined;
	}

	/**
	 * Gets texture encoding safe
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.sRGBEncoding | sRGBEncoding, sRGB |
	 * | THREE.GammaEncoding | GammaEncoding, Gamma |
	 * | THREE.RGBEEncoding | RGBEEncoding, RGBE |
	 * | THREE.LogLuvEncoding | LogLuvEncoding, LogLuv |
	 * | THREE.RGBM7Encoding | RGBM7Encoding, RGBM7 |
	 * | THREE.RGBM16Encoding | RGBM16Encoding, RGBM16 |
	 * | THREE.RGBDEncoding | RGBDEncoding, RGBD |
	 * | THREE.LinearEncoding | LinearEncoding, Linear |
	 *
	 * @param baseEncoding
	 * @param [altEncoding]
	 * @param [def]
	 * @returns texture encoding safe
	 */
	public static getTextureEncodingSafe(baseEncoding: string, altEncoding?: string, def?: string): I3JS.TextureEncoding {
		const encoding = this.getTypeSafe(baseEncoding, altEncoding, def || '');
		switch (encoding.toLowerCase()) {
			case 'srgbencoding':
			case 'srgb':
				return I3JS.TextureEncoding.sRGBEncoding;
			case 'gammaencoding':
			case 'gamma':
				return I3JS.TextureEncoding.GammaEncoding;
			case 'rgbeencoding':
			case 'rgbe':
				return I3JS.TextureEncoding.RGBEEncoding;
			// case 'logluvencoding':
			// case 'logluv':
			//	return THREE.LogLuvEncoding;
			case 'rgbm7encoding':
			case 'rgbm7':
				return I3JS.TextureEncoding.RGBM7Encoding;
			case 'rgbm16encoding':
			case 'rgbm16':
				return I3JS.TextureEncoding.RGBM16Encoding;
			case 'rgbdencoding':
			case 'rgbd':
				return I3JS.TextureEncoding.RGBDEncoding;
			case 'linearencoding':
			case 'linear':
				return I3JS.TextureEncoding.LinearEncoding;
			default:
				return undefined;
		}
	}

	/**
	 * Gets depth packing, Depth packing strategies
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.RGBADepthPacking | RGBADepthPacking, RGBADepth, RGBA |
	 * | THREE.BasicDepthPacking | BasicDepthPacking, BasicDepth, Basic |
	 *
	 * @param [def]
	 * @returns depth packing
	 */
	public static getDepthPackingSafe(baseDepthPacking: string, def?: string): I3JS.DepthPackingStrategies {
		const depthPacking = this.getTypeSafe(baseDepthPacking, def, '');
		switch (depthPacking.toLowerCase()) {
			case 'rgba':
			case 'rgbadepthpacking':
			case 'rgbadepth':
				return I3JS.DepthPackingStrategies.RGBADepthPacking;
			case 'basic':
			case 'basicdepthpacking':
			case 'basicdepth':
			default:
				return I3JS.DepthPackingStrategies.BasicDepthPacking;
		}
	}

	/**
	 * Gets normal map type
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.TangentSpaceNormalMap | TangentSpaceNormalMap, TangentSpace |
	 * | THREE.ObjectSpaceNormalMap | ObjectSpaceNormalMap, ObjectSpace |
	 *
	 * @param [def]
	 * @returns normal map type
	 */
	public static getNormalMapTypeSafe(baseNormalMapType: string, def?: string): I3JS.NormalMapTypes {
		const normalMapType = NgxThreeUtil.getTypeSafe(baseNormalMapType, def, '');
		switch (normalMapType.toLowerCase()) {
			case 'tangentspacenormalmap':
			case 'tangentspace':
				return I3JS.NormalMapTypes.TangentSpaceNormalMap;
			case 'objectspacenormalmap':
			case 'objectspace':
				return I3JS.NormalMapTypes.ObjectSpaceNormalMap;
		}
		return undefined;
	}

	/**
	 * Gets stencil fail
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.ZeroStencilOp | ZeroStencilOp, Zero |
	 * | THREE.KeepStencilOp | KeepStencilOp, Keep |
	 * | THREE.ReplaceStencilOp | ReplaceStencilOp, Replace |
	 * | THREE.IncrementStencilOp | IncrementStencilOp, Increment |
	 * | THREE.DecrementStencilOp | DecrementStencilOp, Decrement |
	 * | THREE.IncrementWrapStencilOp | IncrementWrapStencilOp, IncrementWrap |
	 * | THREE.DecrementWrapStencilOp | DecrementWrapStencilOp, DecrementWrap |
	 * | THREE.InvertStencilOp | InvertStencilOp, Invert |
	 *
	 * @param [def]
	 * @returns stencil fail
	 */
	public static getStencilOpSafe(baseStencilFail: string, def?: string): I3JS.StencilOp {
		const stencilFail = this.getTypeSafe(baseStencilFail, def, '');
		switch (stencilFail.toLowerCase()) {
			case 'zerostencilop':
			case 'zero':
				return I3JS.StencilOp.ZeroStencilOp;
			case 'keepstencilop':
			case 'keep':
				return I3JS.StencilOp.KeepStencilOp;
			case 'replacestencilop':
			case 'replace':
				return I3JS.StencilOp.ReplaceStencilOp;
			case 'incrementstencilop':
			case 'increment':
				return I3JS.StencilOp.IncrementStencilOp;
			case 'decrementstencilop':
			case 'decrement':
				return I3JS.StencilOp.DecrementStencilOp;
			case 'incrementwrapstencilop':
			case 'incrementwrap':
				return I3JS.StencilOp.IncrementWrapStencilOp;
			case 'decrementwrapstencilop':
			case 'decrementwrap':
				return I3JS.StencilOp.DecrementWrapStencilOp;
			case 'invertstencilop':
			case 'invert':
				return I3JS.StencilOp.InvertStencilOp;
		}
		return undefined;
	}

	/**
	 * Gets stencil func
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.NeverStencilFunc | NeverStencilFunc, Never |
	 * | THREE.LessStencilFunc | LessStencilFunc, Less |
	 * | THREE.EqualStencilFunc | EqualStencilFunc, Equal |
	 * | THREE.LessEqualStencilFunc | LessEqualStencilFunc, LessEqual |
	 * | THREE.GreaterStencilFunc | GreaterStencilFunc, Greater |
	 * | THREE.NotEqualStencilFunc | NotEqualStencilFunc, NotEqual |
	 * | THREE.GreaterEqualStencilFunc | GreaterEqualStencilFunc, GreaterEqual |
	 * | THREE.AlwaysStencilFunc | AlwaysStencilFunc, Always |
	 *
	 * @param [def]
	 * @returns stencil func
	 */
	public static getStencilFuncSafe(baseStencilFunc: string, def?: string): I3JS.StencilFunc {
		const stencilFunc = NgxThreeUtil.getTypeSafe(baseStencilFunc, def, '');
		switch (stencilFunc.toLowerCase()) {
			case 'neverstencilfunc':
			case 'never':
				return I3JS.StencilFunc.NeverStencilFunc;
			case 'lessstencilfunc':
			case 'less':
				return I3JS.StencilFunc.LessStencilFunc;
			case 'equalstencilfunc':
			case 'equal':
				return I3JS.StencilFunc.EqualStencilFunc;
			case 'lessequalstencilfunc':
			case 'lessequal':
				return I3JS.StencilFunc.LessEqualStencilFunc;
			case 'greaterstencilfunc':
			case 'greater':
				return I3JS.StencilFunc.GreaterStencilFunc;
			case 'notequalstencilfunc':
			case 'notequal':
				return I3JS.StencilFunc.NotEqualStencilFunc;
			case 'greaterequalstencilfunc':
			case 'greaterequal':
				return I3JS.StencilFunc.GreaterEqualStencilFunc;
			case 'alwaysstencilfunc':
			case 'always':
				return I3JS.StencilFunc.AlwaysStencilFunc;
		}
		return undefined;
	}

	/**
	 * Gets usage
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.StreamDrawUsage | StreamDrawUsage, StreamDraw |
	 * | THREE.StaticReadUsage | StaticReadUsage, StaticRead |
	 * | THREE.DynamicReadUsage | DynamicReadUsage, DynamicRead |
	 * | THREE.StreamReadUsage | StreamReadUsage, StreamRead |
	 * | THREE.StaticCopyUsage | StaticCopyUsage, StaticCopy |
	 * | THREE.DynamicCopyUsage | DynamicCopyUsage, DynamicCopy |
	 * | THREE.StreamCopyUsage | StreamCopyUsage, StreamCopy |
	 * | THREE.StaticDrawUsage | StaticDrawUsage, StaticDraw |
	 * | THREE.DynamicDrawUsage | DynamicDrawUsage, DynamicDraw |
	 *
	 * @param [def]
	 * @returns usage
	 */
	public static getUsageSafe(baseUsage: string, def?: string): I3JS.Usage {
		const usage = NgxThreeUtil.getTypeSafe(baseUsage, def, '');
		switch (usage.toLowerCase()) {
			case 'streamdrawusage':
			case 'streamdraw':
				return I3JS.Usage.StreamDrawUsage;
			case 'staticreadusage':
			case 'staticread':
				return I3JS.Usage.StaticReadUsage;
			case 'dynamicreadusage':
			case 'dynamicread':
				return I3JS.Usage.DynamicReadUsage;
			case 'streamreadusage':
			case 'streamread':
				return I3JS.Usage.StreamReadUsage;
			case 'staticcopyusage':
			case 'staticcopy':
				return I3JS.Usage.StaticCopyUsage;
			case 'dynamiccopyusage':
			case 'dynamiccopy':
				return I3JS.Usage.DynamicCopyUsage;
			case 'streamcopyusage':
			case 'streamcopy':
				return I3JS.Usage.StreamCopyUsage;
			case 'staticdrawusage':
			case 'staticdraw':
				return I3JS.Usage.StaticDrawUsage;
			case 'dynamicdrawusage':
			case 'dynamicdraw':
			default:
				return I3JS.Usage.DynamicDrawUsage;
		}
	}

	/**
	 * Gets glsl version
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.GLSLVersion.GLSL1 | GLSL1, GL1, 1 |
	 * | THREE.GLSLVersion.GLSL3 | GLSL3, GL3, 3 |
	 *
	 * @param [def]
	 * @returns glsl version
	 */
	public static getGlslVersionSafe(baseGlslVersion: string, def?: string): I3JS.GLSLVersion {
		const glslVersion = this.getTypeSafe(baseGlslVersion, def, '');
		switch (glslVersion.toLowerCase()) {
			case '1':
			case 'gl1':
			case 'glsl1':
				return I3JS.GLSLVersion.GLSL1;
			case '3':
			case 'gl3':
			case 'glsl3':
				return I3JS.GLSLVersion.GLSL3;
		}
		return null;
	}

	/**
	 * Gets builtin shader attribute name safe
	 *
	 * @param baseShaderAttributeName
	 * @param [def]
	 * @returns builtin shader attribute name safe
	 */
	public static getBuiltinShaderAttributeNameSafe(
		baseShaderAttributeName: string,
		def?: string
	): I3JS.BuiltinShaderAttributeName {
		const shaderAttributeName = this.getTypeSafe(baseShaderAttributeName, def, '');
		switch (shaderAttributeName.toLowerCase()) {
			case 'position':
				return 'position';
			case 'normal':
				return 'normal';
			case 'uv':
				return 'uv';
			case 'color':
				return 'color';
			case 'skinindex':
				return 'skinIndex';
			case 'skinweight':
				return 'skinWeight';
			case 'instancematrix':
				return 'instanceMatrix';
			case 'morphtarget0':
				return 'morphTarget0';
			case 'morphtarget1':
				return 'morphTarget1';
			case 'morphtarget2':
				return 'morphTarget2';
			case 'morphtarget3':
				return 'morphTarget3';
			case 'morphtarget4':
				return 'morphTarget4';
			case 'morphtarget5':
				return 'morphTarget5';
			case 'morphtarget6':
				return 'morphTarget6';
			case 'morphtarget7':
				return 'morphTarget7';
			case 'morphnormal0':
				return 'morphNormal0';
			case 'morphnormal1':
				return 'morphNormal1';
			case 'morphnormal2':
				return 'morphNormal2';
			case 'morphnormal3':
				return 'morphNormal3';
		}
		return undefined;
	}

	/**
	 * Gets precision safe
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | String | highp |
	 * | String | mediump |
	 * | String | lowp |
	 *
	 * @param basePrecision
	 * @param [def]
	 * @returns precision safe
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
}
