import { HTMLMesh } from 'three/examples/jsm/interactive/HTMLMesh';
import { I3JS, MaterialParameters, N3JS, ThreeUtil } from '../../interface';

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
	constructor(dom: HTMLElement, options?: MaterialParameters) {
		super(dom);
		if (options !== null && options !== undefined) {
			const material = this.material as any;
			if (ThreeUtil.isNotNull(options.fog)) {
				material.fog = ThreeUtil.getBooleanSafe(options.fog, true);
			}
			if (ThreeUtil.isNotNull(options.side)) {
				material.side = ThreeUtil.getSideSafe(options.side, 'front');
			}
			if (ThreeUtil.isNotNull(options.opacity)) {
				material.opacity = ThreeUtil.getNumberSafe(options.opacity, 1);
			}
			if (ThreeUtil.isNotNull(options.shadowSide)) {
				material.shadowSide = ThreeUtil.getSideSafe(options.shadowSide, null);
			}
			if (ThreeUtil.isNotNull(options.toneMapped)) {
				material.toneMapped = ThreeUtil.getBooleanSafe(options.toneMapped, true);
			}
			if (ThreeUtil.isNotNull(options.transparent)) {
				material.transparent = ThreeUtil.getBooleanSafe(options.transparent, false);
			}
			if (ThreeUtil.isNotNull(options.vertexColors)) {
				material.vertexColors = ThreeUtil.getBooleanSafe(options.transparent, false);
			}
			if (ThreeUtil.isNotNull(options.visible)) {
				material.visible = ThreeUtil.getBooleanSafe(options.visible, true);
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
		public fontColor: I3JS.TColorRepresentation = 0xffffff,
		public fontFamily: string = 'Arial',
		public side: I3JS.TSide = N3JS.DoubleSide
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
			color: ThreeUtil.getColorSafe(this.fontColor, 0xffffff) as any,
			side: this.side,
			map: texture,
			transparent: true,
		});
		this.geometry = new N3JS.PlaneGeometry((this.height * textWidth) / textHeight, this.height);
	}
}
