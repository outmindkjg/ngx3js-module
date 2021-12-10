import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { I3JS } from '../../threejs-library/three-interface';

/**
 * AVR Controls
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAVRControls) page for details.
 * See the [ngx control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/AVRControls) page for a live demo.
 *
 */
export class NgxAVRControls {
	/**
	 * The Control of avrcontrols
	 */
	control: OrbitControls = null;

	/**
	 * The Button of avrcontrols
	 */
	button: HTMLElement = null;

	/**
	 * The Target of avrcontrols
	 */
	public target: I3JS.IVector3 = new THREE.Vector3();

	/**
	 * Creates an instance of plane controls.
	 * @param camera
	 * @param domElement
	 */
	constructor(
		private type: string,
		private camera: I3JS.ICamera,
		private scene: I3JS.IScene,
		private renderer: I3JS.IWebGLRenderer,
		private sessionInit: any,
		private domElement: HTMLElement,
		private renderCaller: any,
		private altControl: boolean = true
	) {
		this.button = this.getButton();
		this.renderer.domElement.parentElement.appendChild(this.button);
		if ('xr' in navigator) {
			this.renderer.xr.enabled = true;
			const xr: any = (navigator as any)['xr'];
			switch (this.type.toLowerCase()) {
				case 'ar':
					xr.isSessionSupported('immersive-ar').then((supported: boolean) => {
						if (!supported) {
							this.enableVirtualButton('AR NOT SUPPORTED(USE VIRTUAL)');
						}
					});
					break;
				case 'vr':
				case 'xr':
				default:
					xr.isSessionSupported('immersive-vr').then((supported: boolean) => {
						if (!supported) {
							this.enableVirtualButton('VR NOT SUPPORTED(USE VIRTUAL)');
						}
					});
					break;
			}
		}
	}

	/**
	 * Stylizes element
	 *
	 * @param element
	 */
	private stylizeElement(element: any) {
		element.style.position = 'absolute';
		element.style.bottom = '20px';
		element.style.padding = '12px 6px';
		element.style.border = '1px solid #fff';
		element.style.borderRadius = '4px';
		element.style.background = 'rgba(0,0,0,0.1)';
		element.style.color = '#fff';
		element.style.font = 'normal 13px sans-serif';
		element.style.textAlign = 'center';
		element.style.opacity = '0.5';
		element.style.outline = 'none';
		element.style.zIndex = '999';
	}

	/**
	 * Enables virtual button
	 * @param text
	 */
	private enableVirtualButton(text: string) {
		const button = this.button;
		button.textContent = text;
		button.style.left = 'calc(50% - 125px)';
		button.style.width = '250px';
		button.onclick = () => {
			this.buttonVirtualClick();
		};
		if (this.control === null && this.altControl) {
			this.control = new OrbitControls(this.camera, this.domElement);
			this.control.enablePan = true;
			this.control.enableDamping = true;
			if (this.target !== null && this.control.target !== this.target) {
				this.control.target.copy(this.target);
				this.target = this.control.target;
			}
		}
	}

	/**
	 * Disables button
	 * @param text
	 */
	private disableButton(text: string) {
		const button = this.button;
		button.style.display = '';
		button.style.cursor = 'auto';
		button.style.left = 'calc(50% - 75px)';
		button.style.width = '150px';
		button.onmouseenter = null;
		button.onmouseleave = null;
		button.onclick = null;
		button.textContent = text;
	}

	/**
	 * Gets button
	 * @returns button
	 */
	private getButton(): HTMLElement {
		if ('xr' in navigator) {
			const button = document.createElement('button');
			button.style.display = 'inline-block';
			button.style.pointerEvents = 'all';
			button.style.cursor = 'pointer';
			button.style.left = 'calc(50% - 50px)';
			button.style.width = '100px';
			button.onmouseenter = () => {
				button.style.opacity = '1.0';
			};
			button.onmouseleave = () => {
				button.style.opacity = '0.5';
			};
			button.onclick = () => {
				this.buttonClick();
			};
			this.stylizeElement(button);
			return button;
		} else {
			const message = document.createElement('a');
			if (window.isSecureContext === false) {
				message.href = document.location.href.replace(/^http:/, 'https:');
				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message
			} else {
				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';
			}
			message.style.left = 'calc(50% - 90px)';
			message.style.width = '180px';
			message.style.textDecoration = 'none';
			this.stylizeElement(message);
			return message;
		}
	}

	/**
	 * Current session of avrcontrols
	 */
	private currentSession: any = null;

	/**
	 * Buttons virtual click
	 */
	private buttonVirtualClick() {
		if (this.currentSession === null) {
			this.onSessionStarted(new VirtualSession());
		} else {
			this.currentSession.end();
		}
	}

	/**
	 * Buttons click
	 */
	private buttonClick() {
		if (this.currentSession === null) {
			const xr = (navigator as any)['xr'];
			switch (this.type.toLowerCase()) {
				case 'ar':
					if (this.sessionInit.domOverlay === undefined) {
						var overlay = document.createElement('div');
						overlay.style.display = 'none';
						document.body.appendChild(overlay);
						var svg = document.createElementNS(
							'http://www.w3.org/2000/svg',
							'svg'
						);
						svg.setAttribute('width', '38');
						svg.setAttribute('height', '38');
						svg.style.position = 'absolute';
						svg.style.right = '20px';
						svg.style.top = '20px';
						svg.addEventListener(
							'click',
							() => {
								this.currentSession.end();
							},
							{ passive: true }
						);
						overlay.appendChild(svg);
						var path = document.createElementNS(
							'http://www.w3.org/2000/svg',
							'path'
						);
						path.setAttribute('d', 'M 12,12 L 28,28 M 28,12 12,28');
						path.setAttribute('stroke', '#fff');
						path.setAttribute('stroke-width', '2');
						svg.appendChild(path);
						if (this.sessionInit.optionalFeatures === undefined) {
							this.sessionInit.optionalFeatures = [];
						}
						this.sessionInit.optionalFeatures.push('dom-overlay');
						this.sessionInit.domOverlay = { root: overlay };
					}
					xr.requestSession('immersive-ar', this.sessionInit).then(
						(session: any) => {
							this.onSessionStarted(session);
						}
					);
					break;
				case 'vr':
				case 'xr':
					this.sessionInit = {
						optionalFeatures: [
							'local-floor',
							'bounded-floor',
							'hand-tracking',
							'layers',
						],
					};
					xr.requestSession('immersive-vr', this.sessionInit).then(
						(session: any) => {
							this.onSessionStarted(session);
						}
					);
					break;
			}
		} else {
			this.currentSession.end();
		}
	}

	/**
	 * Determines whether session ended on
	 */
	private _onSessionEnded: any = null;

	/**
	 * Determines whether session started on
	 * @param session
	 */
	private async onSessionStarted(session: any) {
		this._onSessionEnded = () => {
			this.onSessionEnded();
		};
		session.addEventListener('end', this._onSessionEnded, { passive: true });
		try {
			await this.renderer.xr.setSession(session);
		} catch (ex) {
			console.log(ex);
		}
		const button = this.button;
		button.style.left = 'calc(50% - 50px)';
		button.style.width = '100px';
		switch (this.type.toLowerCase()) {
			case 'ar':
				this.button.textContent = 'STOP AR';
				break;
			case 'vr':
			case 'xr':
			default:
				this.button.textContent = 'EXIT VR';
				break;
		}
		this.currentSession = session;
	}

	/**
	 * Determines whether session ended on
	 */
	private onSessionEnded(/*event*/) {
		this.currentSession.removeEventListener('end', this._onSessionEnded);
		switch (this.type.toLowerCase()) {
			case 'ar':
				this.button.textContent = 'START AR';
				break;
			case 'vr':
			case 'xr':
			default:
				this.button.textContent = 'ENTER VR';
				break;
		}
		this.currentSession = null;
	}

	/**
	 * Disposes avrcontrols
	 */
	dispose() {
		if (this.button !== null && this.button.parentElement !== null) {
			this.button.parentElement.removeChild(this.button);
		}
		if (this.control !== null) {
			this.control.dispose();
		}
	}

	/**
	 * Updates avrcontrols
	 * @param delta
	 */
	update(delta: number) {
		if (this.control !== null && this.altControl) {
			this.control.update();
		}
	}
}

/**
 * Virtual session
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/VirtualSession) page for details.
 *
 */
export class VirtualSession implements THREE.XRSession {
	/**
	 * Creates an instance of plane controls.
	 * @param camera
	 * @param domElement
	 */
	constructor() {}

	/**
	 * Requests reference space
	 * @param type
	 * @returns reference space
	 */
	requestReferenceSpace(
		type: THREE.XRReferenceSpaceType
	): Promise<THREE.XRReferenceSpace> {
		return new Promise<THREE.XRReferenceSpace>((resolve) => {
			resolve(null);
		});
	}

	/**
	 * Updates render state
	 * @param renderStateInit
	 * @returns render state
	 */
	updateRenderState(renderStateInit: THREE.XRRenderStateInit): Promise<void> {
		return new Promise<void>((resolve) => {
			resolve();
		});
	}

	/**
	 * Requests animation frame
	 * @param callback
	 * @returns animation frame
	 */
	requestAnimationFrame(callback: THREE.XRFrameRequestCallback): number {
		return 0;
	}

	/**
	 * Cancels animation frame
	 * @param id
	 */
	cancelAnimationFrame(id: number): void {}

	/**
	 * Ends virtual session
	 * @returns end
	 */
	end(): Promise<void> {
		return new Promise<void>((resolve) => {
			resolve();
			this.dispatchEvent(new Event('end'));
		});
	}

	/**
	 * Render state of virtual session
	 */
	renderState: THREE.XRRenderState;

	/**
	 * Input sources of virtual session
	 */
	inputSources: THREE.XRInputSource[];

	/**
	 * Environment blend mode of virtual session
	 */
	environmentBlendMode: THREE.XREnvironmentBlendMode;

	/**
	 * Visibility state of virtual session
	 */
	visibilityState: THREE.XRVisibilityState;

	/**
	 * Requests hit test source
	 * @param options
	 * @returns hit test source
	 */
	requestHitTestSource(
		options: THREE.XRHitTestOptionsInit
	): Promise<THREE.XRHitTestSource> {
		return new Promise<THREE.XRHitTestSource>((resolve) => {
			resolve(null);
		});
	}

	/**
	 * Requests hit test source for transient input
	 * @param options
	 * @returns hit test source for transient input
	 */
	requestHitTestSourceForTransientInput(
		options: THREE.XRTransientInputHitTestOptionsInit
	): Promise<THREE.XRTransientInputHitTestSource> {
		return new Promise<THREE.XRTransientInputHitTestSource>((resolve) => {
			resolve(null);
		});
	}

	/**
	 * Requests hit test
	 * @param ray
	 * @param referenceSpace
	 * @returns hit test
	 */
	requestHitTest(
		ray: THREE.XRRay,
		referenceSpace: THREE.XRReferenceSpace
	): Promise<THREE.XRHitResult[]> {
		return new Promise<THREE.XRHitResult[]>((resolve) => {
			resolve([]);
		});
	}

	/**
	 * Updates world tracking state
	 * @param options
	 */
	updateWorldTrackingState(options: {
		planeDetectionState?: { enabled: boolean };
	}): void {}

	private _listeners: { [key: string]: any[] } = {};
	/**
	 * Adds event listener
	 * @param type
	 * @param callback
	 * @param [options]
	 */
	addEventListener(
		type: string,
		callback: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions
	): void {
		if (this._listeners === undefined) this._listeners = {};
		const listeners = this._listeners;
		if (listeners[type] === undefined) {
			listeners[type] = [];
		}
		if (listeners[type].indexOf(callback) === -1) {
			listeners[type].push(callback);
		}
	}

	hasEventListener(type: string, listener: any) {
		if (this._listeners === undefined) return false;
		const listeners = this._listeners;
		return (
			listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1
		);
	}

	/**
	 * Dispatchs event
	 * @param event
	 * @returns true if event
	 */
	dispatchEvent(event: Event): boolean {
		if (this._listeners === undefined) false;
		const listeners = this._listeners;
		const listenerArray = listeners[event.type];
		if (listenerArray !== undefined) {
			const array = listenerArray.slice(0);
			for (let i = 0, l = array.length; i < l; i++) {
				array[i].call(this, event);
			}
		}
		return true;
	}

	/**
	 * Removes event listener
	 * @param type
	 * @param callback
	 * @param [options]
	 */
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions
	): void {
		if (this._listeners === undefined) return;
		const listeners = this._listeners;
		const listenerArray = listeners[type];
		if (listenerArray !== undefined) {
			const index = listenerArray.indexOf(listener);
			if (index !== -1) {
				listenerArray.splice(index, 1);
			}
		}
	}

	/**
	 * Removes all listeners
	 * @param [eventName]
	 */
	removeAllListeners?(eventName?: string): void {}

	/**
	 * Events listeners
	 * @param [eventName]
	 * @returns listeners
	 */
	eventListeners?(eventName?: string): EventListenerOrEventListenerObject[] {
		return [];
	}
}
