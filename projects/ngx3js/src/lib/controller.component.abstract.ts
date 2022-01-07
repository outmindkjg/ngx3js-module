import {
	AfterContentInit,
	Component,
	OnChanges,
	OnDestroy,
	OnInit,
	QueryList,
	SimpleChanges
} from '@angular/core';
import { NgxCameraComponent } from './camera/camera.component';
import { NgxCanvasComponent } from './canvas/canvas.component';
import { I3JS, NgxThreeUtil } from './interface';
import { IHtmlCollection, IRendererEvent, IRendererTimer } from './ngx-interface';
import { NgxSceneComponent } from './scene/scene.component';
import { NgxAbstractSubscribeComponent } from './subscribe.abstract';

/**
 * The Abstract Controller component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AbstractControllerComponent) page for details.
 *
 *
 * ```ts
 * _@Component({
 * 	providers: [
 * 		{
 * 			provide: NgxAbstractControllerComponent,
 * 			useExisting: forwardRef(() => NgxXxxComponent),
 * 		},
 * 	],
 * })
 * export class NgxXxxComponent extends NgxAbstractControllerComponent implements OnInit {
 * 	constructor() {
 * 		super();
 * 	}
 * }
 * ```
 */
@Component({
	template: '',
})
export class NgxAbstractControllerComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit, OnChanges, AfterContentInit, OnDestroy
{
	/**
	 * Creates an instance of controller component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(subscribeType?: string): void {
		super.ngOnInit(subscribeType || 'controller');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.refObject3d !== null) {
			this.refObject3d = undefined;
		}
		if (this.refObject2d !== null) {
			this.refObject2d = undefined;
		}
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		super.applyChanges(changes);
	}

	/**
	 * Ref object3d of controller component
	 */
	protected refObject3d: I3JS.Object3D = null;

	/**
	 * Ref object2d of controller component
	 */
	protected refObject2d: IHtmlCollection = null;

	/**
	 * Sets object3d
	 * @param refObject3d
	 */
	public setObject3d(refObject3d: I3JS.Object3D) {
		if (this.refObject3d !== refObject3d) {
			this.refObject3d = refObject3d;
			if (this.refObject3d !== null) {
				this.unSubscribeRefer('position');
				this.addChanges('position');
				this.subscribeRefer(
					'position',
					NgxThreeUtil.getSubscribe(
						this.refObject3d,
						() => {
							this.unSubscribeRefer('position');
							this.addChanges('position');
						},
						'position'
					)
				);
			}
			if (this.checkController()) {
				this.addChanges('object3d');
			}
		}
	}

	/**
	 * Sets object2d
	 * @param refObject2d
	 */
	public setObject2d(refObject2d: IHtmlCollection) {
		if (this.refObject2d !== refObject2d) {
			this.refObject2d = refObject2d;
			if (this.checkController()) {
				this.addChanges('object2d');
			}
		}
	}

	/**
	 * The Renderer of controller component
	 */
	protected _renderer: I3JS.Renderer = null;

	/**
	 * The Scenes of controller component
	 */
	protected _scenes: QueryList<NgxSceneComponent> = null;

	/**
	 * The Cameras of controller component
	 */
	protected _cameras: QueryList<NgxCameraComponent> = null;

	/**
	 * The Canvas2ds of controller component
	 */
	protected _canvas2ds: QueryList<NgxCanvasComponent> = null;

	/**
	 * The Scene of controller component
	 */
	protected _scene: I3JS.Scene = null;

	/**
	 * The Canvas of controller component
	 */
	protected _canvas: IHtmlCollection = null;

	/**
	 * The Event of controller component
	 */
	protected _event: IRendererEvent = null;

	/**
	 * Sets renderer
	 * @param renderer
	 * @param scenes
	 * @param cameras
	 * @param canvas2ds
	 */
	public setRenderer(
		renderer: I3JS.Renderer,
		scenes: QueryList<NgxSceneComponent>,
		cameras: QueryList<NgxCameraComponent>,
		canvas2ds: QueryList<NgxCanvasComponent>
	) {
		this._renderer = renderer;
		this._event = NgxThreeUtil.getThreeComponent(renderer)?.events;
		this._scenes = scenes;
		this._cameras = cameras;
		this._canvas2ds = canvas2ds;
		if (this.checkController()) {
			this.addChanges('render');
		}
	}

	/**
	 * Sets scene
	 * @param scene
	 */
	public setScene(scene: I3JS.Scene) {
		this._scene = scene;
		if (this.checkController()) {
			this.addChanges('scene');
		}
	}

	/**
	 * Sets canvas
	 * @param canvas
	 */
	public setCanvas(canvas: IHtmlCollection) {
		this._canvas = canvas;
		if (this.checkController()) {
			this.addChanges('canvas');
		}
	}

	/**
	 * Checks controller
	 * @returns true if controller
	 */
	private checkController(): boolean {
		if (this.refObject3d !== null || this.refObject2d !== null) {
			if (this._needUpdate) {
				this.getController();
				return false;
			} else {
				return true;
			}
		}
		return false;
	}

	/**
	 * Gets controller
	 */
	public getController(): void {}

	/**
	 * Updates controller component
	 * @param rendererTimer
	 */
	public update(rendererTimer: IRendererTimer) {}
}
