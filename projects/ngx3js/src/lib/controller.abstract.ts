import { QueryList } from '@angular/core';
import { NgxCameraComponent } from './camera/camera.component';
import { NgxCanvasComponent } from './canvas/canvas.component';
import { I3JS, N3JS, NgxThreeUtil } from './interface';
import { NgxAbstractMaterialComponent } from './material.abstract';
import { IHtmlCollection, IRendererTimer } from './ngx-interface';
import { NgxSceneComponent } from './scene/scene.component';
import { NgxVisualComponent } from './visual/visual.component';

/**
 * Abstract three controller
 *
 * ```ts
 * export class NgxXxxControllerComponent extends NgxAbstractControllerComponent implements OnInit {
 * 	constructor() {
 * 		super();
 * 	}
 * }
 * ```
 */
export abstract class NgxAbstractThreeController {
	/**
	 * Enable This Controller
	 */
	protected enable: boolean = true;

	/**
	 * The duration run animation in sec
	 */
	protected duration: number = 3;

	/**
	 * The Easing method
	 */
	protected easing: string = null;

	protected template: string = null;

	/**
	 * The Repeat Count
	 */
	protected repeat: number = null;

	/**
	 *
	 */
	protected yoyo: boolean = null;

	/**
	 * The Overshoot of abstract three controller
	 */
	protected overshoot: number = null;

	/**
	 * The Amplitude of abstract three controller
	 */
	protected amplitude: number = null;

	/**
	 * The Period of abstract three controller
	 */
	protected period: number = null;

	/**
	 * Linear ratio of abstract three controller
	 */
	protected linearRatio: number = null;

	/**
	 * The Power of abstract three controller
	 */
	protected power: number = null;

	/**
	 * Yoyo mode of abstract three controller
	 */
	protected yoyoMode: boolean = null;

	/**
	 * The Steps of abstract three controller
	 */
	protected steps: number = null;

	/**
	 * Ref object of abstract three controller
	 */
	protected refObject: I3JS.Object3D = null;

	/**
	 * Ref object2d of abstract three controller
	 */
	protected refObject2d: IHtmlCollection = null;

	/**
	 * Tween timer of abstract three controller
	 */
	protected _tweenTimer: I3JS.Tween = null;

	/**
	 * Creates an instance of abstract three controller.
	 *
	 * @param refObject3D
	 * @param refObject2D
	 */
	constructor(refObject3D: I3JS.Object3D, refObject2D: IHtmlCollection) {
		this.setObject3d(refObject3D);
		this.setObject2d(refObject2D);
	}

	/**
	 * Gets duration
	 *
	 * @param [def]
	 * @returns duration
	 */
	protected getDuration(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.duration, def, 3);
	}

	/**
	 * Gets repeat
	 *
	 * @param [def]
	 * @returns repeat
	 */
	protected getRepeat(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.repeat, def, 0);
	}

	/**
	 * Gets yoyo
	 *
	 * @param [def]
	 * @returns true if yoyo
	 */
	protected getYoyo(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.yoyo, def, false);
	}

	/**
	 * Gets overshoot
	 *
	 * @param [def]
	 * @returns overshoot
	 */
	private getOvershoot(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.overshoot, def, 1);
	}

	/**
	 * Gets amplitude
	 *
	 * @param [def]
	 * @returns amplitude
	 */
	protected getAmplitude(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.amplitude, def, 1);
	}

	/**
	 * Gets period
	 *
	 * @param [def]
	 * @returns period
	 */
	protected getPeriod(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.period, def, 1);
	}

	/**
	 * Gets linear ratio
	 *
	 * @param [def]
	 * @returns linear ratio
	 */
	protected getLinearRatio(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.linearRatio, def, 1);
	}

	/**
	 * Gets power
	 *
	 * @param [def]
	 * @returns power
	 */
	protected getPower(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.power, def, 1);
	}

	/**
	 * Gets yoyo mode
	 *
	 * @param [def]
	 * @returns true if yoyo mode
	 */
	protected getYoyoMode(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.yoyoMode, def, false);
	}

	/**
	 * Gets steps
	 *
	 * @param [def]
	 * @returns steps
	 */
	protected getSteps(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.steps, def, 12);
	}

	/**
	 * Gets easing
	 *
	 * @param [def]
	 * @param [isTemplate]
	 * @returns easing
	 */
	protected getEasing(def?: string, isTemplate?: boolean): I3JS.EasingFunction {
		const easing = isTemplate
			? NgxThreeUtil.getTypeSafe(this.template, def, '')
			: NgxThreeUtil.getTypeSafe(this.easing, def, '');
		switch (easing.toLowerCase()) {
			case 'back':
			case 'back.easein':
				return N3JS.Easing.Back.In;
			case 'back.easeinout':
				return N3JS.Easing.Back.InOut;
			case 'back.easeout':
				return N3JS.Easing.Back.Out;
			case 'elastic':
			case 'elastic.easein':
				return N3JS.Easing.Elastic.In;
			case 'elastic.easeinout':
				return N3JS.Easing.Elastic.InOut;
			case 'elastic.easeout':
				return N3JS.Easing.Elastic.Out;
			case 'bounce':
			case 'bounce.easein':
				return N3JS.Easing.Bounce.In;
			case 'bounce.easeinout':
				return N3JS.Easing.Bounce.InOut;
			case 'bounce.easeout':
				return N3JS.Easing.Bounce.Out;
			case 'circ':
			case 'circ.easein':
				return N3JS.Easing.Circular.In;
			case 'circ.easeinout':
				return N3JS.Easing.Circular.InOut;
			case 'circ.easeout':
				return N3JS.Easing.Circular.Out;
			case 'expo':
			case 'expo.easein':
				return N3JS.Easing.Exponential.In;
			case 'expo.easeinout':
				return N3JS.Easing.Exponential.InOut;
			case 'expo.easeout':
				return N3JS.Easing.Exponential.Out;
			case 'sine':
			case 'sine.easein':
				return N3JS.Easing.Sinusoidal.In;
			case 'sine.easeinout':
				return N3JS.Easing.Sinusoidal.InOut;
			case 'sine.easeout':
				return N3JS.Easing.Sinusoidal.Out;
			default:
				return N3JS.Easing.Linear.None;
		}
	}

	/**
	 * The Renderer of abstract three controller
	 */
	_renderer: I3JS.Renderer = null;

	/**
	 * The Scenes of abstract three controller
	 */
	_scenes: QueryList<NgxSceneComponent> = null;

	/**
	 * The Cameras of abstract three controller
	 */
	_cameras: QueryList<NgxCameraComponent> = null;

	/**
	 * The Canvases of abstract three controller
	 */
	_canvases: QueryList<NgxCanvasComponent> = null;

	/**
	 * Sets renderer
	 * @param renderer
	 * @param scenes
	 * @param cameras
	 * @param canvases
	 */
	public setRenderer(
		renderer: I3JS.Renderer,
		scenes: QueryList<NgxSceneComponent>,
		cameras: QueryList<NgxCameraComponent>,
		canvases: QueryList<NgxCanvasComponent>
	) {
		this._renderer = renderer;
		this._scenes = scenes;
		this._cameras = cameras;
		this._canvases = canvases;
		if (
			this._scene === null &&
			this._scenes !== null &&
			this._scenes.length > 0
		) {
			this._scene = this._scenes.first.getScene();
		}
		if (
			this._camera === null &&
			this._cameras !== null &&
			this._cameras.length > 0
		) {
			this._camera = this._cameras.first.getObject3d();
		}
		if (
			this._canvas === null &&
			this._canvases !== null &&
			this._canvases.length > 0
		) {
			this._canvas = this._canvases.first.getCollection();
		}
	}

	/**
	 * The Scene of abstract three controller
	 */
	private _scene: I3JS.Scene = null;

	/**
	 * The Camera of abstract three controller
	 */
	private _camera: I3JS.Camera = null;

	/**
	 * The Canvas of abstract three controller
	 */
	private _canvas: IHtmlCollection = null;

	/**
	 * Sets scene
	 *
	 * @param scene
	 */
	public setScene(scene: I3JS.Scene) {
		this._scene = scene;
	}

	/**
	 * Sets canvas
	 * @param canvas
	 */
	public setCanvas(canvas: IHtmlCollection) {
		this._canvas = canvas;
	}

	/**
	 * Sets object3d
	 * @param refObject
	 */
	public setObject3d(refObject: I3JS.Object3D) {
		this.refObject = refObject;
	}

	/**
	 * Sets object2d
	 * @param refObject
	 */
	public setObject2d(refObject: IHtmlCollection) {
		this.refObject2d = refObject;
	}

	/**
	 * Gets position
	 */
	protected get position(): I3JS.Vector3 {
		return this.refObject.position;
	}

	/**
	 * Gets scale
	 */
	protected get scale(): I3JS.Vector3 {
		return this.refObject.scale;
	}

	/**
	 * Gets rotation
	 */
	protected get rotation(): I3JS.Euler {
		return this.refObject.rotation;
	}

	/**
	 * Gets material
	 */
	protected get material(): I3JS.Material {
		if (this.refObject instanceof N3JS.Mesh) {
			if (this.refObject.material instanceof Array) {
				return this.refObject.material[0];
			} else {
				return this.refObject.material;
			}
		}
		return new N3JS.Material();
	}

	/**
	 * Gets materials
	 */
	protected get materials(): I3JS.Material[] {
		if (this.refObject instanceof N3JS.Mesh) {
			if (this.refObject.material instanceof Array) {
				return this.refObject.material;
			} else {
				return [this.refObject.material];
			}
		}
		return [];
	}

	/**
	 * Gets geometry
	 */
	protected get geometry(): I3JS.BufferGeometry {
		if (this.refObject instanceof N3JS.Mesh) {
			return this.refObject.geometry;
		}
		return new N3JS.BufferGeometry();
	}

	/**
	 * Gets scene
	 */
	protected get scene(): I3JS.Scene {
		if (this._scene === null && this.refObject !== null) {
			let lastObj: I3JS.Object3D = this.refObject;
			while (!(lastObj instanceof N3JS.Scene) && lastObj.parent) {
				lastObj = lastObj.parent;
			}
			if (lastObj instanceof N3JS.Scene) {
				this._scene = lastObj;
			}
		}
		if (this._scene !== null) {
			return this._scene;
		} else {
			return new N3JS.Scene();
		}
	}

	/**
	 * Gets camera
	 */
	protected get camera(): I3JS.Camera {
		if (
			this._camera === null &&
			this._cameras !== null &&
			this._cameras.length > 0
		) {
			this._camera = this._cameras.first.getObject3d();
		}
		return this._camera;
	}

	/**
	 * Gets camera by name
	 * @param name  The name of the object (doesn't need to be unique). Default is an empty string.
	 * @returns camera by name
	 */
	protected getCameraByName(name: string): I3JS.Camera {
		if (this._cameras !== null) {
			const camara = this._cameras.find((camera) => {
				return camera.name == name;
			});
			if (NgxThreeUtil.isNotNull(camara)) {
				return camara.getObject3d();
			}
		}
		return null;
	}

	/**
	 * Gets object by name
	 * @param name The name of the object (doesn't need to be unique). Default is an empty string.
	 * @param [fromTop]
	 * @returns object by name
	 */
	protected getObjectByName(
		name: string,
		fromTop: boolean = false
	): I3JS.Object3D {
		if (fromTop) {
			return this.scene.getObjectByName(name);
		} else {
			return this.refObject.getObjectByName(name);
		}
	}

	/**
	 * Gets object by property
	 * @param name The name of the object (doesn't need to be unique). Default is an empty string.
	 * @param value
	 * @param [fromTop]
	 * @returns object by property
	 */
	protected getObjectByProperty(
		name: string,
		value: string,
		fromTop: boolean = false
	): I3JS.Object3D {
		if (fromTop) {
			return this.scene.getObjectByProperty(name, value);
		} else {
			return this.refObject.getObjectByProperty(name, value);
		}
	}

	/**
	 * Gets object by function
	 * @param fn
	 * @param [fromTop]
	 * @param [obj3d]
	 * @returns object by function
	 */
	protected getObjectByFunction(
		fn: (arg: any) => boolean,
		fromTop: boolean = false,
		obj3d: I3JS.Object3D = null
	): I3JS.Object3D {
		if (obj3d === null) {
			obj3d = fromTop ? this.scene : this.refObject;
		}
		if (fn(obj3d)) return obj3d;
		for (let i = 0, l = obj3d.children.length; i < l; i++) {
			const child = obj3d.children[i];
			const object = this.getObjectByFunction(fn, false, child);
			if (object !== undefined) {
				return object;
			}
		}
		return undefined;
	}

	/**
	 * Gets objects by function
	 * @param fn
	 * @param [fromTop]
	 * @param [obj3d]
	 * @param [result]
	 * @returns objects by function
	 */
	protected getObjectsByFunction(
		fn: (arg: any) => boolean,
		fromTop: boolean = false,
		obj3d: I3JS.Object3D = null,
		result: I3JS.Object3D[] = []
	): I3JS.Object3D[] {
		if (obj3d === null) {
			obj3d = fromTop ? this.scene : this.refObject;
		}
		if (fn(obj3d)) result.push(obj3d);
		for (let i = 0, l = obj3d.children.length; i < l; i++) {
			const child = obj3d.children[i];
			this.getObjectsByFunction(fn, false, child, result);
		}
		return result;
	}

	/**
	 * Gets component
	 * @param [refObject]
	 * @returns component
	 */
	protected getComponent(refObject?: I3JS.Object3D): any {
		const object3d = refObject || this.refObject;
		if (
			NgxThreeUtil.isNotNull(object3d) &&
			NgxThreeUtil.isNotNull(object3d.userData.component)
		) {
			return object3d.userData.component;
		}
		return undefined;
	}

	/**
	 * Gets component2 d
	 * @param [refObject]
	 * @returns component2 d
	 */
	protected getComponent2D(refObject?: IHtmlCollection): NgxVisualComponent {
		const object2d = refObject || this.refObject2d;
		if (
			NgxThreeUtil.isNotNull(object2d) &&
			NgxThreeUtil.isNotNull(object2d.component) &&
			object2d.component instanceof NgxVisualComponent
		) {
			return object2d.component;
		}
		return undefined;
	}

	/**
	 * Gets html element
	 * @param [refObject]
	 * @returns html element
	 */
	protected getHtmlElement(refObject?: IHtmlCollection): HTMLElement {
		const object2d = refObject || this.refObject2d;
		if (
			NgxThreeUtil.isNotNull(object2d) &&
			NgxThreeUtil.isNotNull(object2d.html) &&
			object2d.html instanceof HTMLElement
		) {
			return object2d.html;
		}
		return undefined;
	}

	/**
	 * Gets abstract material component
	 * @param [refObject]
	 * @returns abstract material component
	 */
	protected getAbstractMaterialComponent(
		refObject?: I3JS.Object3D
	): NgxAbstractMaterialComponent {
		const object3d = refObject || this.refObject;
		if (
			NgxThreeUtil.isNotNull(object3d) &&
			object3d instanceof N3JS.Mesh &&
			NgxThreeUtil.isNotNull(object3d.material)
		) {
			let materialComp: any = null;
			if (
				object3d.material instanceof N3JS.Material &&
				NgxThreeUtil.isNotNull(object3d.material.userData.component)
			) {
				materialComp = object3d.material.userData.component;
			} else if (
				object3d.material instanceof Array &&
				object3d.material.length > 0
			) {
				materialComp = object3d.material[0].userData.component;
			}
			if (
				NgxThreeUtil.isNotNull(materialComp) &&
				materialComp instanceof NgxAbstractMaterialComponent
			) {
				return materialComp;
			}
		}
		return undefined;
	}

	/**
	 * Gets controller
	 * @template T
	 * @param type
	 * @param [refObject]
	 * @returns controller
	 */
	protected getController<T extends NgxAbstractThreeController>(
		type: { new (obj: any): T },
		refObject?: I3JS.Object3D
	): T {
		const component = this.getComponent(refObject);
		if (NgxThreeUtil.isNotNull(component.controllerList)) {
			const controller = component.controllerList.find((controller: any) => {
				return controller.getController() instanceof type;
			});
			if (NgxThreeUtil.isNotNull(controller)) {
				return controller.getController() as T;
			}
		}
		return undefined;
	}

	/**
	 * Gets controllers
	 * @template T
	 * @param [type]
	 * @param [refObject]
	 * @returns controllers
	 */
	protected getControllers<T extends NgxAbstractThreeController>(
		type: { new (obj: any): T } = null,
		refObject?: I3JS.Object3D
	): T[] {
		const controllers: T[] = [];
		const component = this.getComponent(refObject);
		if (NgxThreeUtil.isNotNull(component.controllerList)) {
			const controller = component.controllerList.filter((controller: any) => {
				if (type === null) {
					return true;
				} else {
					return controller.getController() instanceof type;
				}
			});
			if (NgxThreeUtil.isNotNull(controller) && controller.length > 0) {
				controller.forEach((controller: any) => {
					controllers.push(controller.getController() as T);
				});
			}
		}
		return controllers;
	}

	/**
	 * Sets variables
	 * @param variables
	 */
	public setVariables(variables: { [key: string]: any }) {
		if (variables !== null && typeof variables === 'object') {
			const selfObj: any = this;
			Object.entries(variables).forEach(([key, value]) => {
				if (selfObj[key] !== undefined) {
					selfObj[key] = value;
				}
			});
		}
	}

	/**
	 * Awakes abstract three controller
	 */
	public awake(): void {
		if (this.refObject !== null && this.refObject.visible) {
			this.onEnable();
		}
		this.reset();
		this.start();
		if (this.refObject !== null && !this.refObject.visible) {
			this.onDisable();
		}
	}


	/**
	 * Gets tween timer
	 */
	protected getTweenTimer(object : object): I3JS.Tween {
		if (this._tweenTimer === null || this._tweenTimer._object !== object) {
			this._tweenTimer = new N3JS.TWEEN.Tween(object);
		}
		return this._tweenTimer;
	}

	/**
	 * Determines whether enable on
	 */
	public onEnable(): void {}

	/**
	 * Resets abstract three controller
	 */
	public reset(): void {}

	/**
	 * Starts abstract three controller
	 */
	public start(): void {}

	/**
	 * Fixed update
	 */
	public fixedUpdate(): void {}

	/**
	 * Updates abstract three controller
	 * @param rendererTimer
	 */
	public update(rendererTimer: IRendererTimer): void {}

	/**
	 * Lates update
	 */
	public lateUpdate(): void {}

	/**
	 * Determines whether application quit on
	 */
	public onApplicationQuit(): void {}

	/**
	 * Determines whether disable on
	 */
	public onDisable(): void {
		this.refObject.onBeforeRender;
	}

	/**
	 * Determines whether destory on
	 */
	public onDestory(): void {}
}

/**
 * Auto rotation controller
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAutoRotationController) page for details.
 *
 */
export class NgxAutoRotationController extends NgxAbstractThreeController {
	/**
	 * The X of auto rotation controller
	 */
	protected x: number = 0;

	/**
	 * The Y of auto rotation controller
	 */
	protected y: number = 0;

	/**
	 * The Z of auto rotation controller
	 */
	protected z: number = 0;

	/**
	 * Sets variables
	 * @param variables
	 */
	public setVariables(variables: { [key: string]: any }) {
		super.setVariables(variables);
		if (this.enable) {
			if (this.refObject !== null) {
				// todo
			} else if (this.refObject2d !== null) {
				// todo
			}
		}
	}
}

/**
 * Auto scale controller
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAutoScaleController) page for details.
 *
 */
export class NgxAutoScaleController extends NgxAbstractThreeController {
	/**
	 * The X of auto scale controller
	 */
	protected x: number = null;

	/**
	 * The Y of auto scale controller
	 */
	protected y: number = null;

	/**
	 * The Z of auto scale controller
	 */
	protected z: number = null;

	/**
	 * Sets variables
	 * @param variables
	 */
	public setVariables(variables: { [key: string]: any }) {
		super.setVariables(variables);
		if (this.enable) {
			if (this.refObject !== null) {
				// todo
			} else if (this.refObject2d !== null) {
				// todo
			}
		}
	}
}

/**
 * Auto position controller
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAutoPositionController) page for details.
 *
 */
export class NgxAutoPositionController extends NgxAbstractThreeController {
	/**
	 * The X of auto position controller
	 */
	protected x: number = null;

	/**
	 * The Y of auto position controller
	 */
	protected y: number = null;

	/**
	 * The Z of auto position controller
	 */
	protected z: number = null;

	/**
	 * Sets variables
	 * @param variables
	 */
	public setVariables(variables: { [key: string]: any }) {
		super.setVariables(variables);
		if (this.enable) {
			if (this.refObject !== null) {
				// todo
			} else if (this.refObject2d !== null) {
				// todo
			}
		}
	}
}

/**
 * Auto material controller
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAutoMaterialController) page for details.
 *
 */
export class NgxAutoMaterialController extends NgxAbstractThreeController {
	/**
	 * The Color of auto material controller
	 */
	protected color: number | string | I3JS.Color = null;

	/**
	 * The Opacity of auto material controller
	 */
	protected opacity: number = null;

	/**
	 * Sets variables
	 * @param variables
	 */
	public setVariables(variables: { [key: string]: any }) {
		super.setVariables(variables);
		if (this.enable) {
			if (this.refObject !== null) {
				// todo
			} else if (this.refObject2d !== null) {
				// todo
			}
		} else {
				// todo
			}
	}
}

/**
 * Auto uniforms controller
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAutoUniformsController) page for details.
 *
 */
export class NgxAutoUniformsController extends NgxAbstractThreeController {
	/**
	 * The Key of auto uniforms controller
	 */
	protected key: string = null;

	/**
	 * Value type of auto uniforms controller
	 */
	protected valueType: string = 'elapsedTime';

	/**
	 * The Speed of auto uniforms controller
	 */
	protected speed: number = 1;

	/**
	 * Sets object3d
	 * @param refObject
	 */
	public setObject3d(refObject: I3JS.Object3D) {
		super.setObject3d(refObject);
	}

	/**
	 * Sets variables
	 * @param variables
	 */
	public setVariables(variables: { [key: string]: any }) {
		super.setVariables(variables);
		this.uniform = null;
		const refObject: any = this.refObject;
		if (NgxThreeUtil.isNotNull(this.key) && refObject['material']) {
			const material = refObject['material'];
			if (material instanceof N3JS.ShaderMaterial) {
				this.uniform = material.uniforms[this.key];
			}
		}
	}

	/**
	 * The Uniform of auto uniforms controller
	 */
	private uniform: I3JS.IUniform = null;

	/**
	 * Updates auto uniforms controller
	 * @param rendererTimer
	 */
	public update(rendererTimer: IRendererTimer): void {
		if (this.uniform !== null) {
			switch (this.valueType.toLowerCase()) {
				default:
					this.uniform.value = rendererTimer.elapsedTime * this.speed;
					break;
			}
		}
	}
}
