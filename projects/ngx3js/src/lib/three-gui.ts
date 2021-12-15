import { INgxThreeGuiController } from "./ngx-interface";
import { NgxThreeUtil } from "./three-util";
import { GUI } from "./threejs-library/lil-gui";

/**
 * Three gui
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxThreeGui) page for details.
 *
 */
 export class NgxThreeGui implements INgxThreeGuiController {
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
		if (NgxThreeGui.customCss !== null) {
			NgxThreeUtil.cssInject(NgxThreeGui.customCss);
			NgxThreeGui.customCss = null;
		}
		return this;
	}

	/**
	 * Adds color
	 * @param object
	 * @param property
	 * @returns color
	 */
	public addColor(object: any, property: string): INgxThreeGuiController {
		return this.gui.addColor(object, property);
	}

	/**
	 * Adds folder
	 * @param name
	 * @returns folder
	 */
	public addFolder(name: string): INgxThreeGuiController {
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
	public add(object: any, property: string, option1?: any, options2?: any, options3?: any): INgxThreeGuiController {
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
