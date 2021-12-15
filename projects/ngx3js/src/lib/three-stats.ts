import * as N3JS from './threejs-library/three-core';
import * as I3JS from './threejs-library/three-interface';

/**
 * Three stats
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxThreeStats) page for details.
 *
 */
 export class NgxThreeStats implements I3JS.Stats {
	/**
	 * The Revision of three stats
	 */
	REVISION: number;

	/**
	 * The Stats of three stats
	 */
	stats: I3JS.Stats = null;

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
	public addPanel(panel: I3JS.Panel): I3JS.Panel {
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