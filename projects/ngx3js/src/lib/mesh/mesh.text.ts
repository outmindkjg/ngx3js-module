import * as THREE from 'three';
import { ThreeUtil } from '../interface';

/**
 * Mesh text
 *
 * ```ts
 * const mesh = new MeshText('message', 10, 0xffffff);
 * ```
 */
export class MeshText extends THREE.Mesh {
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
		public fontColor: THREE.ColorRepresentation = 0xffffff,
		public fontFamily: string = 'Arial',
		public side: THREE.Side = THREE.DoubleSide
	) {
		super(new THREE.BufferGeometry(), new THREE.Material());
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
		const texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;
		this.material = new THREE.MeshBasicMaterial({
			color: ThreeUtil.getColorSafe(this.fontColor, 0xffffff),
			side: this.side,
			map: texture,
			transparent: true,
		});
		this.geometry = new THREE.PlaneGeometry(
			(this.height * textWidth) / textHeight,
			this.height
		);
	}
}
