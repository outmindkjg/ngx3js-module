import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Plane controls
 */
export class AVRControls {
	control: OrbitControls = null;

	button: HTMLElement = null;

	public target: THREE.Vector3 = new THREE.Vector3();

	/**
	 * Creates an instance of plane controls.
	 * @param camera
	 * @param domElement
	 */
	constructor(private type: string, private camera: THREE.Camera, private scene: THREE.Scene, private renderer: THREE.WebGLRenderer, private sessionInit: any, private domElement: HTMLElement, private renderCaller: any, private altControl: boolean = true) {
		this.button = this.getButton();
		this.renderer.domElement.parentElement.appendChild(this.button);
		if ('xr' in navigator) {
			this.renderer.xr.enabled = true;
			const xr: any = (navigator as any)['xr'];
			switch (this.type.toLowerCase()) {
				case 'ar':
					xr.isSessionSupported('immersive-ar').then((supported : boolean) => {
						if (!supported) {
							this.enableVirtualButton('AR NOT SUPPORTED(USE VIRTUAL)');
						}
					});
					break;
				case 'vr':
				case 'xr':
				default:
					xr.isSessionSupported('immersive-vr').then((supported : boolean) => {
						if (!supported) {
							this.enableVirtualButton('VR NOT SUPPORTED(USE VIRTUAL)');
						}
					});
					break;
			}
		}
	}

	private stylizeElement(element : any) {
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

	private enableVirtualButton(text : string) {
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

	private disableButton(text : string) {
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

	private currentSession: any = null;

	private buttonVirtualClick() {
		if (this.currentSession === null) {
			this.onSessionStarted(new VirtualSession());
		} else {
			this.currentSession.end();	
		}
	}

	private buttonClick() {
		if (this.currentSession === null) {
			const xr = (navigator as any)['xr'];
			switch (this.type.toLowerCase()) {
				case 'ar':
					if (this.sessionInit.domOverlay === undefined) {
						var overlay = document.createElement('div');
						overlay.style.display = 'none';
						document.body.appendChild(overlay);
						var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
						svg.setAttribute('width', '38');
						svg.setAttribute('height', '38');
						svg.style.position = 'absolute';
						svg.style.right = '20px';
						svg.style.top = '20px';
						svg.addEventListener('click', () => {
							this.currentSession.end();
						});
						overlay.appendChild(svg);
						var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
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
					xr.requestSession('immersive-ar', this.sessionInit).then((session : any) => {
						this.onSessionStarted(session);
					});
					break;
				case 'vr':
				case 'xr':
					this.sessionInit = { optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers'] };
					xr.requestSession('immersive-vr', this.sessionInit).then((session : any) => {
						this.onSessionStarted(session);
					});
					break;
			}
		} else {
			this.currentSession.end()
		}
	}
	private _onSessionEnded: any = null;

	private async onSessionStarted(session : any) {
		this._onSessionEnded = () => {
			this.onSessionEnded();
		};
		session.addEventListener('end', this._onSessionEnded);
		try {
			await this.renderer.xr.setSession(session);
		} catch(ex) {
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

	dispose() {
		if (this.button !== null && this.button.parentElement !== null) {
			this.button.parentElement.removeChild(this.button);
		}
		if (this.control !== null) {
			this.control.dispose();
		}
	}

	update(delta: number) {
		if (this.control !== null && this.altControl) {
			this.control.update();
		}
	}
}

export class VirtualSession implements THREE.XRSession {
	/**
	 * Creates an instance of plane controls.
	 * @param camera
	 * @param domElement
	 */
	constructor() {
	}
	requestReferenceSpace(type: THREE.XRReferenceSpaceType): Promise<THREE.XRReferenceSpace> {
		throw new Error('Method not implemented.');
	}
	updateRenderState(renderStateInit: THREE.XRRenderStateInit): Promise<void> {
		throw new Error('Method not implemented.');
	}
	requestAnimationFrame(callback: THREE.XRFrameRequestCallback): number {
		throw new Error('Method not implemented.');
	}
	cancelAnimationFrame(id: number): void {
		throw new Error('Method not implemented.');
	}
	end(): Promise<void> {
		throw new Error('Method not implemented.');
	}
	renderState: THREE.XRRenderState;
	inputSources: THREE.XRInputSource[];
	environmentBlendMode: THREE.XREnvironmentBlendMode;
	visibilityState: THREE.XRVisibilityState;
	requestHitTestSource(options: THREE.XRHitTestOptionsInit): Promise<THREE.XRHitTestSource> {
		throw new Error('Method not implemented.');
	}
	requestHitTestSourceForTransientInput(options: THREE.XRTransientInputHitTestOptionsInit): Promise<THREE.XRTransientInputHitTestSource> {
		throw new Error('Method not implemented.');
	}
	requestHitTest(ray: THREE.XRRay, referenceSpace: THREE.XRReferenceSpace): Promise<THREE.XRHitResult[]> {
		throw new Error('Method not implemented.');
	}
	updateWorldTrackingState(options: { planeDetectionState?: { enabled: boolean; }; }): void {
		throw new Error('Method not implemented.');
	}
	addEventListener(type: string, callback: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
		throw new Error('Method not implemented.');
	}
	dispatchEvent(event: Event): boolean {
		throw new Error('Method not implemented.');
	}
	removeEventListener(type: string, callback: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void {
		throw new Error('Method not implemented.');
	}
	removeAllListeners?(eventName?: string): void {
		throw new Error('Method not implemented.');
	}
	eventListeners?(eventName?: string): EventListenerOrEventListenerObject[] {
		throw new Error('Method not implemented.');
	}

}

