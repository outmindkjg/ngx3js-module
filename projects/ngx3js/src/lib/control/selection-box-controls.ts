import * as THREE from 'three';
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox';
import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper';
import { ThreeColor, ThreeUtil } from '../interface';

/**
 * Plane controls
 */
export class SelectBoxControls {
	/**
	 * Selection box of select box controls
	 */
	public selectionBox: SelectionBox = null;

	/**
	 * Helper  of select box controls
	 */
	public helper: SelectionHelper = null;

	/**
	 * Pointerup  of select box controls
	 */
	pointerup: ThreeColor = 0xffffff;

	/**
	 * Pointerdown  of select box controls
	 */
	pointerdown: ThreeColor = 0x000000;

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
		camera: THREE.Camera,
		scene: THREE.Scene,
		renderer: THREE.WebGLRenderer
	) {
		this.selectionBox = new SelectionBox(camera, scene);
		this.helper = new SelectionHelper(this.selectionBox, renderer, 'selectBox');
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
		docElement.addEventListener('pointerdown', (event) => {
			for (const item of this.selectionBox.collection) {
				const material: any = item.material;
				if (ThreeUtil.isNotNull(material['emissive'])) {
					material['emissive'].set(ThreeUtil.getColorSafe(this.pointerdown));
				}
			}
			const mouse = this.getMouse(event);
			this.selectionBox.startPoint.set(mouse.x, mouse.y, 0.5);
		});

		docElement.addEventListener('pointermove', (event) => {
			if (this.helper.isDown) {
				for (let i = 0; i < this.selectionBox.collection.length; i++) {
					const item: any = this.selectionBox.collection[i].material;
					if (ThreeUtil.isNotNull(item['emissive'])) {
						item['emissive'].set(ThreeUtil.getColorSafe(this.pointerdown));
					}
				}
				const mouse = this.getMouse(event);
				this.selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
				const allSelected = this.selectionBox.select();
				allSelected.forEach((item) => {
					const material: any = item.material;
					if (ThreeUtil.isNotNull(material['emissive'])) {
						material['emissive'].set(ThreeUtil.getColorSafe(this.pointerup));
					}
				});
			}
		});

		docElement.addEventListener('pointerup', (event) => {
			const mouse = this.getMouse(event);
			this.selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
			const allSelected = this.selectionBox.select();
			allSelected.forEach((item) => {
				const material: any = item.material;
				if (ThreeUtil.isNotNull(material['emissive'])) {
					material['emissive'].set(ThreeUtil.getColorSafe(this.pointerup));
				}
			});
		});
	}

	/**
	 * Mouse  of select box controls
	 */
	private mouse: THREE.Vector2 = new THREE.Vector2();

	/**
	 * Gets mouse
	 * @param event
	 * @returns mouse
	 */
	private getMouse(event: any): THREE.Vector2 {
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
