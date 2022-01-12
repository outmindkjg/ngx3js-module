import { I3JS, N3JS } from "./interface";
import { NgxThreeUtil } from "./three-util";

/**
 * Three gui
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxThreeGui) page for details.
 *
 */
 export class NgxThreeGui extends N3JS.GUI {

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
		params?: I3JS.GUIParameters
	) {
		super(params)
		this.setStyle(style);
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

}
