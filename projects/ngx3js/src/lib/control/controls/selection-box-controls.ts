import { I3JS, N3JS, NgxThreeUtil } from '../../interface';
import { INgxColor } from '../../ngx-interface';

/**
 * Select Box Controls
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SelectBoxControls) page for details.
 *
 */
export class NgxSelectBoxControls {
	/**
	 * Selection box of select box controls
	 */
	public selectionBox: I3JS.SelectionBox = null;

	/**
	 * The Helper of select box controls
	 */
	public helper: I3JS.SelectionHelper = null;

	/**
	 * The Pointerup of select box controls
	 */
	pointerup: INgxColor = 0xffffff;

	/**
	 * The Pointerdown of select box controls
	 */
	pointerdown: INgxColor = 0x000000;

	/**
	 * Offset top of renderer component
	 */
	private offsetTop: number = 0;

	/**
	 * Offset left of renderer component
	 */
	private offsetLeft: number = 0;

	/**
	 * Doc element of select box controls
	 */
	private docElement: HTMLElement;

	/**
	 * Creates an instance of plane controls.
	 * @param camera
	 * @param domElement
	 */
	constructor(
		camera: I3JS.Camera,
		scene: I3JS.Scene,
		renderer: I3JS.WebGLRenderer
	) {
		this.selectionBox = new N3JS.SelectionBox(camera, scene);
		this.helper = new N3JS.SelectionHelper(
			this.selectionBox,
			renderer,
			'selectBox'
		);
		const docElement = renderer.domElement.parentElement;
		this.docElement = docElement;
		let offsetParent: any = docElement;
		this.offsetTop = 0;
		this.offsetLeft = 0;
		while (offsetParent) {
			this.offsetLeft += offsetParent.offsetLeft;
			this.offsetTop += offsetParent.offsetTop;
			offsetParent = offsetParent.offsetParent;
		}
		docElement.addEventListener(
			'pointerdown',
			(event) => {
				for (const item of this.selectionBox.collection) {
					const material: any = item.material;
					if (NgxThreeUtil.isNotNull(material['emissive'])) {
						material['emissive'].set(NgxThreeUtil.getColorSafe(this.pointerdown));
					}
				}
				const mouse = this.getMouse(event);
				this.selectionBox.startPoint.set(mouse.x, mouse.y, 0.5);
			},
			{ passive: true }
		);

		docElement.addEventListener(
			'pointermove',
			(event) => {
				if (this.helper.isDown) {
					for (let i = 0; i < this.selectionBox.collection.length; i++) {
						const item: any = this.selectionBox.collection[i].material;
						if (NgxThreeUtil.isNotNull(item['emissive'])) {
							item['emissive'].set(NgxThreeUtil.getColorSafe(this.pointerdown));
						}
					}
					const mouse = this.getMouse(event);
					this.selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
					const allSelected = this.selectionBox.select();
					allSelected.forEach((item) => {
						const material: any = item.material;
						if (NgxThreeUtil.isNotNull(material['emissive'])) {
							material['emissive'].set(NgxThreeUtil.getColorSafe(this.pointerup));
						}
					});
				}
			},
			{ passive: true }
		);

		docElement.addEventListener('pointerup', (event) => {
			const mouse = this.getMouse(event);
			this.selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
			const allSelected = this.selectionBox.select();
			allSelected.forEach((item) => {
				const material: any = item.material;
				if (NgxThreeUtil.isNotNull(material['emissive'])) {
					material['emissive'].set(NgxThreeUtil.getColorSafe(this.pointerup));
				}
			});
		}),
			{ passive: true };
	}

	/**
	 * The Mouse of select box controls
	 */
	private mouse: I3JS.Vector2 = new N3JS.Vector2();

	/**
	 * Gets mouse
	 * @param event
	 * @returns mouse
	 */
	private getMouse(event: any): I3JS.Vector2 {
		const clientX = event.clientX;
		const clientY = event.clientY;
		const offsetX = clientX - this.offsetLeft;
		const offsetY = clientY - this.offsetTop;
		this.mouse.set(
			(offsetX / this.docElement.clientWidth) * 2 - 1,
			-(offsetY / this.docElement.clientHeight) * 2 + 1
		);
		return this.mouse;
	}
}
