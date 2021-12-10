import * as THREE from 'three';
import * as I3JS from '../../threejs-library/three-interface';

/**
 * Plane controls
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPlaneControls) page for details.
 * See the [ngx control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/PlaneControls) page for a live demo.
 *
 */
export class NgxPlaneControls {
	/**
	 * Min distance of plane controls
	 */
	public minDistance: number = 2;

	/**
	 * Max distance of plane controls
	 */
	public maxDistance: number = 100;

	/**
	 * Rotate speed of plane controls
	 */
	public rotateSpeed = 1.0;

	/**
	 * Zoom speed of plane controls
	 */
	public zoomSpeed = 1.2;

	/**
	 * Pan speed of plane controls
	 */
	public panSpeed = 0.5;

	/**
	 * The Target of plane controls
	 */
	public target: I3JS.IVector3 = new THREE.Vector3();

	/**
	 * The Enabled of plane controls
	 */
	public enabled: boolean = true;

	/**
	 * The Screen of plane controls
	 */
	public screen: {
		left: number;
		top: number;
		width: number;
		height: number;
	} = { left: 0, top: 0, width: 0, height: 0 };

	/**
	 * Creates an instance of plane controls.
	 * @param camera
	 * @param domElement
	 */
	constructor(private camera: I3JS.ICamera, private domElement: HTMLElement) {
		if (domElement === undefined) {
			console.warn(
				'THREE.PlainControls: The second parameter "domElement" is now mandatory.'
			);
		}
		window.setTimeout(() => {
			this.handleResize();
			this.setActive(true);
			this.cameraPosition = new THREE.Vector3();
			this.cameraPosition.copy(this.camera.position);
		}, 100);
	}

	/**
	 * Handles resize
	 */
	public handleResize() {
		const box = this.domElement.getBoundingClientRect();
		const d = this.domElement.ownerDocument.documentElement;
		this.screen = {
			left: box.left + window.pageXOffset - d.clientLeft,
			top: box.top + window.pageYOffset - d.clientTop,
			width: box.width,
			height: box.height,
		};
	}

	/**
	 * Gets mouse on screen
	 * @param vector
	 * @param pageX
	 * @param pageY
	 * @returns
	 */
	public getMouseOnScreen(vector: I3JS.IVector2, pageX: number, pageY: number) {
		vector.set(
			((pageX - this.screen.left) / this.screen.width - 0.5) * 2,
			(0.5 - (pageY - this.screen.top) / this.screen.height) * 2
		);
		return vector;
	}

	/**
	 * The Mouse of plane controls
	 */
	private mouse: I3JS.IVector2 = new THREE.Vector2();

	/**
	 * Camera position of plane controls
	 */
	private cameraPosition: I3JS.IVector3 = null;

	/**
	 * Sets active
	 * @param isActive
	 */
	public setActive(isActive: boolean) {
		if (isActive) {
			if (this._mouseMoveHandler === null) {
				this._mouseMoveHandler = (event: any) => {
					if (this.enabled === false) return;
					this.getMouseOnScreen(this.mouse, event.pageX, event.pageY);
					const xDistance = this.maxDistance;
					const yDistance = this.maxDistance;

					const cameraPosition = new THREE.Vector2(xDistance, yDistance);
					cameraPosition.multiply(this.mouse);
					cameraPosition.add(new THREE.Vector2(this.target.x, this.target.y));
					this.cameraPosition = new THREE.Vector3(
						cameraPosition.x,
						Math.max(0.5, cameraPosition.y),
						this.camera.position.z
					);
				};
				this.domElement.addEventListener(
					'pointermove',
					this._mouseMoveHandler,
					{ passive: true }
				);
			}
		} else {
			if (this._mouseMoveHandler !== null) {
				this.domElement.removeEventListener(
					'pointermove',
					this._mouseMoveHandler
				);
				this._mouseMoveHandler = null;
			}
		}
	}

	/**
	 * Mouse move handler of plane controls
	 */
	private _mouseMoveHandler: any = null;

	/**
	 * Disposes plane controls
	 */
	public dispose() {
		this.setActive(false);
	}

	/**
	 * Updates plane controls
	 * @param delta
	 */
	public update(delta: number) {
		if (this.cameraPosition !== null) {
			this.camera.position.lerp(this.cameraPosition, this.panSpeed * delta);
			this.camera.lookAt(this.target);
		}
	}
}
