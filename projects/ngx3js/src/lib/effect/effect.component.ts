import { Component, ContentChildren, forwardRef, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxCameraComponent } from '../camera/camera.component';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { IRendererTimer } from '../ngx-interface';
import { NgxPassComponent } from '../pass/pass.component';
import { NgxRenderTargetComponent } from '../render-target/render-target.component';
import { NgxSceneComponent } from '../scene/scene.component';

/**
 * The Effect component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxEffectComponent) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect) page for a live demo.
 *
 * |  Three Type        | Type Key           | Acceptable Input          |
 * |:--------------------------|:--------------------------|:--------------------------|
 * | AsciiEffect | AsciiEffect, Ascii | resolution, scale, color, alpha, block, invert  |
 * | PeppersGhostEffect | PeppersGhostEffect, PeppersGhost | cameraDistance, reflectFromAbove  |
 * | OutlineEffect | OutlineEffect, Outline |  |
 * | ParallaxBarrierEffect | ParallaxBarrierEffect, ParallaxBarrier |  |
 * | EffectComposer | EffectComposer, Effect | renderToScreen |
 *
 * ```html
 * <ngx3js-effect>
 * 	<ngx3js-pass [type]="'RenderPass'"></ngx3js-pass>
 * </ngx3js-effect>
 * <ngx3js-effect [scene]="scene" [camera]="camera">
 * 	<ngx3js-pass [type]="'RenderPass'"></ngx3js-pass>
 * </ngx3js-effect>
 * ```
 */
@Component({
	selector: 'ngx3js-effect',
	templateUrl: './effect.component.html',
	styleUrls: ['./effect.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxEffectComponent),
		},
	],
})
export class NgxEffectComponent extends NgxAbstractSubscribeComponent implements OnInit {
	/**
	 * The type of effect
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public type: string = 'effect';

	/**
	 * The scene of effect
	 */
	@Input() public scene: I3JS.Scene | NgxSceneComponent = null;

	/**
	 * The camera of effect
	 */
	@Input() public camera: I3JS.Camera | NgxCameraComponent = null;

	/**
	 * The clear of effect component
	 */
	@Input() public clear: boolean = false;

	/**
	 * The viewport of effect component
	 */
	@Input() public viewport: boolean = false;

	/**
	 * The viewportAspect of effect component
	 */
	@Input() public viewportAspect: boolean = false;

	/**
	 * The renderToScreen of effect component
	 */
	@Input() public renderToScreen: boolean = null;

	/**
	 * The x of effect component
	 */
	@Input() public x: number | string = 0;

	/**
	 * The y of effect component
	 */
	@Input() public y: number | string = 0;

	/**
	 * The size of width
	 * - type number
	 *  fixed size
	 * - type string with include %
	 *  relative size from renderer size
	 *  for example
	 *    in case renderer = 1024
	 *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
	 */
	@Input() public width: number | string = '100%';

	/**
	 * The size of height
	 * - type number
	 *  fixed size
	 * - type string with include %
	 *  relative size from renderer size
	 *  for example
	 *    in case renderer = 1024
	 *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
	 */
	@Input() public height: number | string = '100%';

	/**
	 * The scissorTest of effect component
	 */
	@Input() public scissorTest: boolean = false;

	/**
	 * The scissor position of left
	 * - type number
	 *  fixed position
	 * - type string with include %
	 *  relative position from renderer size
	 *  for example
	 *    in case renderer = 1024
	 *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
	 */
	@Input() public scissorX: number | string = 0;

	/**
	 * The scissor position of top
	 * - type number
	 *  fixed position
	 * - type string with include %
	 *  relative position from renderer size
	 *  for example
	 *    in case renderer = 1024
	 *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
	 */
	@Input() public scissorY: number | string = 0;

	/**
	 * The scissor of width
	 * - type number
	 *  fixed size
	 * - type string with include %
	 *  relative size from renderer size
	 *  for example
	 *    in case renderer = 1024
	 *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
	 */
	@Input() public scissorWidth: number | string = '100%';

	/**
	 * The scissor of height
	 * - type number
	 *  fixed size
	 * - type string with include %
	 *  relative size from renderer size
	 *  for example
	 *    in case renderer = 1024
	 *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
	 */
	@Input() public scissorHeight: number | string = '100%';

	/**
	 * The reflectFromAbove of effect component
	 */
	@Input() public reflectFromAbove: boolean = null;

	/**
	 * The cameraDistance of effect component
	 */
	@Input() public cameraDistance: number = null;

	/**
	 * AsciiEffect
	 *
	 * @see AsciiEffect AsciiEffect
	 */
	@Input() public charSet: string = null;

	/**
	 * The resolution of effect component
	 */
	@Input() public resolution: number = null;

	/**
	 * The scale of effect component
	 */
	@Input() public scale: number = null;

	/**
	 * The color of effect component
	 */
	@Input() public color: boolean = null;

	/**
	 * The alpha of effect component
	 */
	@Input() public alpha: boolean = null;

	/**
	 * The block of effect component
	 */
	@Input() public block: boolean = null;

	/**
	 * The invert of effect component
	 */
	@Input() public invert: boolean = null;

	/**
	 * Content children of effect component
	 */
	@ContentChildren(NgxPassComponent, { descendants: false }) private passList: QueryList<NgxPassComponent>;

	/**
	 * Content children of effect component
	 */
	@ContentChildren(NgxRenderTargetComponent, { descendants: false })
	private renderTargetList: QueryList<NgxRenderTargetComponent>;

	/**
	 * Gets render target
	 * @param renderer
	 * @returns render target
	 */
	private getRenderTarget<T>(): T {
		if (NgxThreeUtil.isNotNull(this.renderTargetList) && this.renderTargetList.length > 0) {
			return this.renderTargetList.first.getRenderTarget();
		}
		return undefined;
	}

	/**
	 * Gets reflect from above
	 * @param [def]
	 * @returns true if reflect from above
	 */
	private getReflectFromAbove(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.reflectFromAbove, def);
	}

	/**
	 * Gets camera distance
	 * @param [def]
	 * @returns camera distance
	 */
	private getCameraDistance(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.cameraDistance, def);
	}

	/**
	 * Creates an instance of effect component.
	 */
	constructor() {
		super();
	}

	/**
	 * Gets scene
	 * @param [def]
	 * @returns scene
	 */
	private getScene(def?: I3JS.Scene): I3JS.Scene {
		if (NgxThreeUtil.isNotNull(this.scene)) {
			if (this.scene instanceof NgxSceneComponent) {
				return this.scene.getScene();
			} else {
				return this.scene;
			}
		}
		return def;
	}

	/**
	 * Gets camera
	 * @param [def]
	 * @returns camera
	 */
	private getCamera(def?: I3JS.Camera): I3JS.Camera {
		if (NgxThreeUtil.isNotNull(this.camera)) {
			if (this.camera instanceof NgxCameraComponent) {
				return this.camera.getObject3d();
			} else {
				return this.camera;
			}
		}
		return def;
	}

	/**
	 * Gets x
	 * @param [def]
	 * @returns x
	 */
	private getX(def?: number | string): number {
		const x = this.getViewPortSize(this.x, this.rendererWidth, def);
		if (x < 0) {
			return this.rendererWidth - this.getWidth() + x;
		} else {
			return x;
		}
	}

	/**
	 * Gets y
	 * @param [def]
	 * @returns y
	 */
	private getY(def?: number | string): number {
		const y = this.getViewPortSize(this.y, this.rendererHeight, def);
		if (y < 0) {
			return this.rendererHeight - this.getHeight() + y;
		} else {
			return y;
		}
	}

	/**
	 * Gets width
	 * @param [def]
	 * @returns width
	 */
	private getWidth(def?: number | string): number {
		return this.getViewPortSize(this.width, this.rendererWidth, def);
	}

	/**
	 * Gets height
	 * @param [def]
	 * @returns height
	 */
	private getHeight(def?: number | string): number {
		return this.getViewPortSize(this.height, this.rendererHeight, def);
	}

	/**
	 * Gets scissor x
	 * @param [def]
	 * @returns scissor x
	 */
	private getScissorX(def?: number | string): number {
		return this.getViewPortSize(this.scissorX, this.rendererWidth, def);
	}

	/**
	 * Gets scissor y
	 * @param [def]
	 * @returns scissor y
	 */
	private getScissorY(def?: number | string): number {
		return this.getViewPortSize(this.scissorY, this.rendererHeight, def);
	}

	/**
	 * Gets scissor width
	 * @param [def]
	 * @returns scissor width
	 */
	private getScissorWidth(def?: number | string): number {
		return this.getViewPortSize(this.scissorWidth, this.rendererWidth, def);
	}

	/**
	 * Gets scissor height
	 * @param [def]
	 * @returns scissor height
	 */
	private getScissorHeight(def?: number | string): number {
		return this.getViewPortSize(this.scissorHeight, this.rendererHeight, def);
	}

	/**
	 * Gets view port size
	 * @param size
	 * @param cameraSize
	 * @param [def]
	 * @returns view port size
	 */
	private getViewPortSize(size: number | string, cameraSize: number, def?: number | string): number {
		const baseSize = NgxThreeUtil.getTypeSafe(size, def);
		if (NgxThreeUtil.isNotNull(baseSize)) {
			if (typeof baseSize == 'string') {
				if (baseSize.indexOf('%') > 0) {
					const [percent, extra] = baseSize.split('%');
					const viewSize = Math.ceil((cameraSize * parseFloat(percent)) / 100);
					if (extra === '') {
						return viewSize;
					} else {
						return viewSize + parseInt(extra);
					}
				} else {
					switch (baseSize) {
						case 'x':
							return this.getX(def);
						case 'y':
							return this.getY(def);
						case 'width':
							return this.getWidth(def);
						case 'height':
							return this.getHeight(def);
						case 'scissorx':
						case 'scissorX':
							return this.getScissorX(def);
						case 'scissory':
						case 'scissorY':
							return this.getScissorY(def);
						case 'scissorwidth':
						case 'scissorWidth':
							return this.getScissorWidth(def);
						case 'scissorheight':
						case 'scissorHeight':
							return this.getScissorHeight(def);
						default:
							return parseFloat(baseSize);
					}
				}
			} else {
				return baseSize;
			}
		}
		return 0;
	}

	/**
	 * Gets aspect
	 * @returns aspect
	 */
	private getAspect(): number {
		if (this.viewport) {
			const cWidth = this.getWidth();
			const cHeight = this.getHeight();
			return cWidth / cHeight;
		} else {
			return this.rendererWidth > 0 && this.rendererHeight > 0 ? this.rendererWidth / this.rendererHeight : 1;
		}
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('effect');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.effectEffect !== null && this.effectEffect instanceof N3JS.AsciiEffect) {
			this.effectEffect.domElement.parentNode.removeChild(this.effectEffect.domElement);
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
		if (changes && this.effectEffect) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(this.passList, 'passList', 'pass');
		this.subscribeListQueryChange(this.renderTargetList, 'renderTargetList', 'rendertarget');
		super.ngAfterContentInit();
	}

	/**
	 * Effect width of effect component
	 */
	private rendererWidth: number = 1024;

	/**
	 * Effect height of effect component
	 */
	private rendererHeight: number = 1024;

	/**
	 * pixelRatio of camera component
	 */
	private pixelRatio: number = 1;

	/**
	 * Sets effect size
	 * @param width
	 * @param height
	 */
	public setRendererSize(width: number, height: number, pixelRatio: number) {
		this.rendererWidth = width;
		this.rendererHeight = height;
		this.pixelRatio = pixelRatio;
		if (this.effectEffect !== null) {
			if (this.effectEffect instanceof N3JS.EffectComposer) {
				this.effectEffect.setSize(this.rendererWidth, this.rendererHeight);
				this.effectEffect.setPixelRatio(this.pixelRatio);
			} else if (this.effectEffect.setSize !== undefined) {
				this.effectEffect.setSize(this.rendererWidth, this.rendererHeight);
			}
		}
	}

	/**
	 * Renders effect component
	 * @param renderer
	 * @param renderTimer
	 */
	public render(renderer: I3JS.WebGLRenderer, renderTimer: IRendererTimer) {
		if (this.effectEffect !== null) {
			if (this.viewport) {
				renderer.setViewport(this.getX(), this.getY(), this.getWidth(), this.getHeight());
			}
			if (this.scissorTest) {
				renderer.setScissorTest(true);
				renderer.setScissor(this.getScissorX(), this.getScissorY(), this.getScissorWidth(), this.getScissorHeight());
			}
			if (this.viewportAspect && NgxThreeUtil.isNotNull(this._effectCamera)) {
				if (this._effectCamera instanceof N3JS.PerspectiveCamera) {
					this._effectCamera.aspect = this.getAspect();
					this._effectCamera.updateProjectionMatrix();
				}
			}
			if (this.clear) {
				renderer.autoClear = false;
				renderer.clear();
			}

			if (this.effectEffect instanceof N3JS.EffectComposer) {
				this.effectEffect.render(renderTimer.delta);
			} else {
				this.effectEffect.render(this._effectScene, this._effectCamera);
			}

			if (this.scissorTest) {
				renderer.setScissorTest(false);
			}
		}
	}

	/**
	 * Effect effect of effect component
	 */
	private effectEffect: I3JS.EffectComposer | any = null;

	/**
	 * Gets write buffer
	 * @returns write buffer
	 */
	public getWriteBuffer(): I3JS.WebGLRenderTarget {
		return this.getEffect()?.writeBuffer;
	}

	/**
	 * Gets read buffer
	 * @returns read buffer
	 */
	public getReadBuffer(): I3JS.WebGLRenderTarget {
		return this.getEffect()?.readBuffer;
	}

	/**
	 * Gets render target1
	 * @returns render target1
	 */
	public getRenderTarget1(): I3JS.WebGLRenderTarget {
		return this.getEffect()?.renderTarget1;
	}

	/**
	 * Gets render target2
	 * @returns render target2
	 */
	public getRenderTarget2(): I3JS.WebGLRenderTarget {
		return this.getEffect()?.renderTarget2;
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		if (this.effectEffect !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getEffect();
				return;
			}
			if (
				!NgxThreeUtil.isOnlyIndexOf(
					changes,
					[
						'pass',
						'rendertarget',
						'clear',
						'viewportaspect',
						'viewport',
						'scissortest',
						'x',
						'y',
						'width',
						'height',
						'scissorx',
						'scissory',
						'scissorwidth',
						'scissorheight',
					],
					this.OBJECT_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, ['pass', 'rendertarget']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'pass':
						if (this.effectEffect instanceof N3JS.EffectComposer) {
							const scene = this.getScene(this._effectScene);
							const camera = this.getCamera(this._effectCamera);
							this.passList.forEach((pass) => {
								pass.setEffectComposer(scene, camera, this.effectEffect, this._effectRenderer);
							});
						}
						break;
					case 'rendertarget':
						if (NgxThreeUtil.isNotNull(this.renderTargetList)) {
							this.renderTargetList.forEach((renderTarget) => {
								renderTarget.setMaterial(this.selfAny, 'effecteffect');
							});
						}
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	/**
	 * Effect renderer of effect component
	 */
	private _effectRenderer: I3JS.WebGLRenderer = null;

	/**
	 * Effect camera of effect component
	 */
	private _effectCamera: I3JS.Camera = null;

	/**
	 * Effect scene of effect component
	 */
	private _effectScene: I3JS.Scene = null;

	/**
	 * Sets renderer
	 * @param webGLRenderer
	 * @param camera
	 * @param scene
	 */
	public setRenderer(webGLRenderer: I3JS.WebGLRenderer, camera: I3JS.Camera, scene: I3JS.Scene) {
		if (this._effectRenderer !== webGLRenderer || this._effectCamera !== camera || this._effectScene !== scene) {
			this._effectRenderer = webGLRenderer;
			this._effectCamera = camera;
			this._effectScene = scene;
			if (this.effectEffect === null) {
				this.getEffect();
			} else {
				this.needUpdate = true;
			}
		}
	}

	/**
	 * Gets object
	 * @returns object
	 */
	public getObject<T>(): T {
		return this.getEffect() as T;
	}

	/**
	 * Gets effect
	 * @returns effect
	 */
	public getEffect(): I3JS.EffectComposer | any {
		if (
			this._effectRenderer !== null &&
			this._effectCamera &&
			this._effectScene &&
			(this.effectEffect === null || this._needUpdate)
		) {
			this.needUpdate = false;
			if (this.effectEffect !== null && this.effectEffect instanceof N3JS.AsciiEffect) {
				this.effectEffect.domElement.parentNode.removeChild(this.effectEffect.domElement);
			}
			switch (this.type.toLowerCase()) {
				case 'asciieffect':
				case 'ascii':
					const asciiEffect = new N3JS.AsciiEffect(
						this._effectRenderer,
						NgxThreeUtil.getTypeSafe(this.charSet, ' .:-+*=%@#'),
						{
							resolution: NgxThreeUtil.getTypeSafe(this.resolution),
							scale: NgxThreeUtil.getTypeSafe(this.scale),
							color: NgxThreeUtil.getTypeSafe(this.color),
							alpha: NgxThreeUtil.getTypeSafe(this.alpha),
							block: NgxThreeUtil.getTypeSafe(this.block),
							invert: NgxThreeUtil.getTypeSafe(this.invert),
						}
					);
					asciiEffect.domElement.style.position = 'absolute';
					asciiEffect.domElement.style.left = '0px';
					asciiEffect.domElement.style.top = '0px';
					asciiEffect.domElement.style.color = 'white';
					asciiEffect.domElement.style.backgroundColor = 'black';
					this._effectRenderer.domElement.parentNode.appendChild(asciiEffect.domElement);
					this.effectEffect = asciiEffect;
					asciiEffect.setSize(this.rendererWidth, this.rendererHeight);
					break;
				case 'peppersghosteffect':
				case 'peppersghost':
					const peppersGhostEffect = new N3JS.PeppersGhostEffect(this._effectRenderer);
					peppersGhostEffect.cameraDistance = this.getCameraDistance(15);
					peppersGhostEffect.reflectFromAbove = this.getReflectFromAbove(false);
					this.effectEffect = peppersGhostEffect;
					break;
				case 'outlineeffect':
				case 'outline':
					const outlineEffect = new N3JS.OutlineEffect(this._effectRenderer, {});
					this.effectEffect = outlineEffect;
					break;
				case 'parallaxbarriereffect':
				case 'parallaxbarrier':
					this.effectEffect = new N3JS.ParallaxBarrierEffect(this._effectRenderer);
					break;
				case 'anaglypheffect':
				case 'anaglyph':
					this.effectEffect = new N3JS.AnaglyphEffect(this._effectRenderer);
					break;
				case 'stereoeffect':
				case 'Stereo':
					this.effectEffect = new N3JS.StereoEffect(this._effectRenderer);
					break;
				default:
					const effectEffect = new N3JS.EffectComposer(this._effectRenderer, this.getRenderTarget());
					effectEffect.setPixelRatio(this.pixelRatio);
					this.effectEffect = effectEffect;
					if (NgxThreeUtil.isNotNull(this.renderToScreen)) {
						this.effectEffect.renderToScreen = this.renderToScreen;
					}
					break;
			}
			this.setObject(this.effectEffect);
		}
		return this.effectEffect;
	}
}
