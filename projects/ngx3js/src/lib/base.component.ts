import { AfterViewInit, Inject, Injectable, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxCameraComponent } from './camera/camera.component';
import { NgxMeshComponent } from './mesh/mesh.component';
import { IGuiBaseControl, IGuiControlParam, IRendererTimer } from './ngx-interface';
import { NgxRendererComponent } from './renderer/renderer.component';
import { NgxSceneComponent } from './scene/scene.component';
import { NgxThreeUtil } from './three-util';
import * as N3JS from './threejs-library/three-core';
import * as I3JS from './threejs-library/three-interface';

/**
 * Injectable
 * @template T
 */
@Injectable()
export abstract class NgxBaseComponent<T> implements OnInit, AfterViewInit {
	/**
	 * The Controls of base component
	 */
	public controls: T & IGuiBaseControl;

	/**
	 * Controls params of base component
	 */
	public controlsParams: IGuiControlParam[];

	/**
	 * Creates an instance of ngx base component.
	 * 
	 * @param controls 
	 * @param [controlsParams] 
	 * @param [clearConsole] 
	 * @param [addBaseParam] 
	 */
	constructor(
		@Inject('') controls: T,
		@Inject('') controlsParams: IGuiControlParam[] = [],
		@Inject('') clearConsole: boolean = false,
		@Inject('') addBaseParam: boolean = true
	) {
		this.controls = NgxThreeUtil.getControls(controls, this, addBaseParam);
		this.setControlsParams(controlsParams, addBaseParam);
		if (clearConsole) {
			console.clear();
		}
	}

	/**
	 * Sets controls params
	 * @param [controlsParams]
	 */
	public setControlsParams(controlsParams: IGuiControlParam[] = [], addBaseParam: boolean = true) {
		this.controlsParams = NgxThreeUtil.getControlsParams(controlsParams, this, addBaseParam);
	}

	/**
	 * Gets timeout
	 * 특정 시간후에 이벤트 발생시키기
	 *
	 * @param [timeDelay]
	 * @returns timeout
	 */
	protected getTimeout(timeDelay: number = 50): Promise<void> {
		return new Promise<void>((resolve) => {
			window.setTimeout(() => {
				resolve();
			}, timeDelay);
		});
	}

	/**
	 * Replaces controls value
	 *
	 * @param newValue
	 * @param key
	 * @param [parent]
	 * @param [reDraw]
	 */
	protected replaceControlsValue(newValue: any, key: string, parent: any = null, reDraw: boolean = true) {
		if (parent === null) {
			parent = this.controls;
		}
		if (parent[key] !== undefined) {
			parent[key] = newValue;
			if (reDraw) {
				this.controlsParams = Object.assign([], this.controlsParams);
			}
		}
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {}

	/**
	 * A callback method that is invoked immediately after
	 * Angular has completed initialization of a component's view.
	 * It is invoked only once when the view is instantiated.
	 */
	ngAfterViewInit(): void {
		if (this.controls.meshRotate !== undefined) {
			this.controls.meshRotate.applyAutoRotate();
		}
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this._subscribe !== null) {
			for (let key in this._subscribe) {
				this._subscribe[key].unsubscribe();
			}
			this._subscribe = {};
		}
	}

	/**
	 * Log time seqn of base component
	 */
	private _logTimeSeqn: number = 0;

	/**
	 * Consoles log time
	 * @param key
	 * @param object
	 * @param [repeat]
	 */
	protected consoleLogTime(key: string, object: any, repeat: number = 300): void {
		this._logTimeSeqn++;
		if (this._logTimeSeqn % repeat === 0) {
			this.consoleLog(key, object, 'info');
		}
	}

	/**
	 * Consoles log
	 * @param key
	 * @param object
	 * @param [level]
	 */
	protected consoleLog(key: string, object: any, level: string = 'log'): void {
		switch (level) {
			case 'error':
				console.error(key, object);
				break;
			case 'info':
				console.info(key, object);
				break;
			case 'trace':
				console.trace(key, object);
				break;
			case 'log':
			default:
				// console.log(key, object);
				break;
		}
	}

	/**
	 * The Subscribe of base component
	 */
	private _subscribe: { [key: string]: Subscription } = {};

	/**
	 * subscribe refer
	 * @param key
	 */
	protected unSubscribeRefer(key: string) {
		if (NgxThreeUtil.isNotNull(this._subscribe[key])) {
			this._subscribe[key].unsubscribe();
			delete this._subscribe[key];
		}
	}

	/**
	 * Subscribes refer
	 * @param key
	 * @param subscription
	 */
	protected subscribeRefer(key: string, subscription: Subscription) {
		if (NgxThreeUtil.isNotNull(this._subscribe[key])) {
			this.unSubscribeRefer(key);
		}
		if (NgxThreeUtil.isNotNull(subscription)) {
			this._subscribe[key] = subscription;
		}
	}

	/**
	 * The Renderer of base component
	 */
	public renderer: NgxRendererComponent = null;

	/**
	 * Sets render
	 * @param renderer
	 */
	public setRender(renderer: NgxRendererComponent) {
		this.renderer = renderer;
	}

	/**
	 * The Scene of base component
	 */
	public scene: NgxSceneComponent = null;

	/**
	 * The Scene of base component
	 */
	public sceneObject3d: I3JS.Scene = null;

	/**
	 * The Scene of base component
	 */
	public sceneChildren: I3JS.Object3D[] = null;

	/**
	 * Sets scene
	 * @param scene
	 */
	public setScene(scene: NgxSceneComponent) {
		this.scene = scene;
		this.sceneObject3d = scene.getScene();
		this.sceneChildren = this.sceneObject3d.children;
	}

	/**
	 * The Camera of base component
	 */
	public camera: NgxCameraComponent = null;

	/**
	 * The Camera Object
	 */
	public cameraObject3d: I3JS.Camera = null;

	/**
	 * Sets camera
	 * @param camera
	 */
	public setCamera(camera: NgxCameraComponent) {
		this.camera = camera;
		this.cameraObject3d = this.camera.getCamera();
	}

	/**
	 * The Mesh of base component
	 */
	public mesh: NgxMeshComponent = null;

	/**
	 * Mesh object3d of base component
	 */
	public meshObject3d: I3JS.Object3D = null;

	/**
	 * Mesh children of base component
	 */
	protected meshChildren: I3JS.Object3D[] = null;

	/**
	 * Updates gui controller
	 */
	protected updateGuiController() {
		if (this.mesh !== null) {
			if (this.controls.meshPosition !== undefined) {
				const position = this.mesh.getPosition();
				this.controls.meshPositionOrg = {
					x: position.x,
					y: position.y,
					z: position.z,
				};
				this.controls.meshPosition.x = this.controls.meshPositionOrg.x;
				this.controls.meshPosition.y = this.controls.meshPositionOrg.y;
				this.controls.meshPosition.z = this.controls.meshPositionOrg.z;
			}
			if (this.controls.meshScale !== undefined) {
				const scale = this.mesh.getScale();
				this.controls.meshScaleOrg = {
					x: scale.x,
					y: scale.y,
					z: scale.z,
				};
				this.controls.meshScale.x = this.controls.meshScaleOrg.x;
				this.controls.meshScale.y = this.controls.meshScaleOrg.y;
				this.controls.meshScale.z = this.controls.meshScaleOrg.z;
			}
			if (this.controls.meshRotate !== undefined) {
				const rotation = this.mesh.getRotation();
				this.controls.meshRotateOrg = {
					x: (rotation.x / Math.PI) * 180,
					y: (rotation.y / Math.PI) * 180,
					z: (rotation.z / Math.PI) * 180,
				};
				this.controls.meshRotate.x = this.controls.meshRotateOrg.x;
				this.controls.meshRotate.y = this.controls.meshRotateOrg.y;
				this.controls.meshRotate.z = this.controls.meshRotateOrg.z;
			}
			if (this.controls.meshScale !== undefined) {
				if (this.controls.meshScale.x !== 1) {
					const controlsParams = NgxThreeUtil.getIGuiControlParam(this.controlsParams, 'Mesh Scale');
					const minScale = this.controls.meshScale.x * 0.01;
					const maxScale = this.controls.meshScale.x * 1.5;
					const stepScale = (maxScale - minScale) / 30;
					controlsParams.children.forEach((child) => {
						const childController: any = child.controller;
						if (NgxThreeUtil.isNotNull(childController['min'])) {
							childController['min'](minScale);
						}
						if (NgxThreeUtil.isNotNull(childController['max'])) {
							childController['max'](maxScale);
						}
						if (NgxThreeUtil.isNotNull(childController['step'])) {
							childController['step'](stepScale);
						}
					});
				}
			}
			const controlsParams = NgxThreeUtil.getIGuiControlParam(this.controlsParams, 'Mesh Visible');
			if (NgxThreeUtil.isNotNull(controlsParams) && NgxThreeUtil.isNotNull(this.controls.meshShape)) {
				this.controls.meshShape.visible = this.mesh.getObject3d().visible;
				const helperParams = NgxThreeUtil.getIGuiControlParam(controlsParams.children, 'helperVisible');
				const helper = this.mesh.helperComponent;
				if (helperParams && helperParams.controller) {
					if (NgxThreeUtil.isNotNull(helper)) {
						if (helper instanceof N3JS.SkeletonHelper) {
							helperParams.controller.name('Skeleton');
						} else {
							helperParams.controller.name('Helper');
						}
						this.controls.meshShape.helperVisible = helper.visible;
						NgxThreeUtil.setGuiEnabled(helperParams.controller, true);
					} else {
						this.controls.meshShape.helperVisible = false;
						helperParams.controller.name('Not Supported');
						NgxThreeUtil.setGuiEnabled(helperParams.controller, false);
					}
				} else {
					console.log(helperParams);
				}
			}
		}
	}

	/**
	 * Sets mesh
	 * @param mesh
	 */
	public setMesh(mesh: NgxMeshComponent) {
		this.mesh = mesh;
		if (this.mesh !== null) {
			this.meshObject3d = this.mesh.getObject3d();
			this.meshChildren = this.meshObject3d.children;
			window.setTimeout(() => {
				this.updateGuiController();
			}, 100);
		}
	}

	/**
	 * Determines whether render on
	 * @param timer
	 */
	public onRender(timer: IRendererTimer) {
		NgxThreeUtil.getControlsOnRender(timer, this);
	}
}

