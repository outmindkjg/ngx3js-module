import { HTMLMesh } from 'three/examples/jsm/interactive/HTMLMesh';
import { I3JS, N3JS, NgxThreeUtil } from '../../interface';
import { IMaterialParameters } from '../../ngx-interface';

/**
 * HTMLMesh mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxHTMLMesh) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/HTMLMesh) page for a live demo.
 *
 */
export class NgxHTMLMesh extends HTMLMesh {
	/**
	 * Creates an instance of ngx htmlmesh.
	 * @param dom
	 */
	constructor(dom: HTMLElement, options?: IMaterialParameters) {
		super(dom);
		if (options !== null && options !== undefined) {
			const material = this.material as any;
			if (NgxThreeUtil.isNotNull(options.fog)) {
				material.fog = NgxThreeUtil.getBooleanSafe(options.fog, true);
			}
			if (NgxThreeUtil.isNotNull(options.side)) {
				material.side = NgxThreeUtil.getSideSafe(options.side, 'front');
			}
			if (NgxThreeUtil.isNotNull(options.opacity)) {
				material.opacity = NgxThreeUtil.getNumberSafe(options.opacity, 1);
			}
			if (NgxThreeUtil.isNotNull(options.shadowSide)) {
				material.shadowSide = NgxThreeUtil.getSideSafe(options.shadowSide, null);
			}
			if (NgxThreeUtil.isNotNull(options.toneMapped)) {
				material.toneMapped = NgxThreeUtil.getBooleanSafe(options.toneMapped, true);
			}
			if (NgxThreeUtil.isNotNull(options.transparent)) {
				material.transparent = NgxThreeUtil.getBooleanSafe(options.transparent, false);
			}
			if (NgxThreeUtil.isNotNull(options.vertexColors)) {
				material.vertexColors = NgxThreeUtil.getBooleanSafe(options.transparent, false);
			}
			if (NgxThreeUtil.isNotNull(options.visible)) {
				material.visible = NgxThreeUtil.getBooleanSafe(options.visible, true);
			}
		}
	}
}

/**
 * MeshText mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMeshText) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/MeshText) page for a live demo.
 *
 */
export class NgxMeshText extends N3JS.Mesh {
	/**
	 * Creates an instance of mesh text.
	 * @param message
	 * @param [height]
	 * @param [fontColor]
	 * @param [side]
	 */
	constructor(
		public message: string,
		public height: number = 20,
		public fontColor: I3JS.ColorRepresentation = 0xffffff,
		public fontFamily: string = 'Arial',
		public side: I3JS.Side = N3JS.DoubleSide
	) {
		super(new N3JS.BufferGeometry(), new N3JS.Material());
		this.redraw();
	}

	/**
	 * Redraws mesh text
	 */
	redraw() {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		const textHeight = 100;
		context.font = 'normal ' + textHeight + 'px ' + this.fontFamily;
		const metrics = context.measureText(this.message);
		const textWidth = metrics.width;
		canvas.width = textWidth;
		canvas.height = textHeight;
		context.font = 'normal ' + textHeight + 'px ' + this.fontFamily;
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillStyle = '#ffffff';
		context.fillText(this.message, textWidth / 2, textHeight / 2);
		const texture = new N3JS.Texture(canvas);
		texture.needsUpdate = true;
		this.material = new N3JS.MeshBasicMaterial({
			color: NgxThreeUtil.getColorSafe(this.fontColor, 0xffffff) as any,
			side: this.side,
			map: texture,
			transparent: true,
		});
		this.geometry = new N3JS.PlaneGeometry((this.height * textWidth) / textHeight, this.height);
	}
}
