import {
	Component, forwardRef, Input,
	OnInit,
	QueryList,
	SimpleChanges
} from '@angular/core';
import { NgxHelperComponent } from '../helper/helper.component';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { NgxLightComponent } from '../light/light.component';
import { NgxMeshComponent } from '../mesh/mesh.component';
import { IRendererTimer } from '../ngx-interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { ViewerCanvas } from './viewer-canvas';

/**
 * The Viewer component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxViewerComponent) page for details.
 *
 * ```html
 * <ngx3js-viewer
 * 	[type]="'canvas'"
 * 	[canvasOptions]="canvasOptions"
 * 	[x]="viewPort.x" [y]="viewPort.y"
 * 	[width]="viewPort.width" [height]="viewPort.height"
 * ></ngx3js-viewer>
 * <ngx3js-viewer
 * 	[type]="'canvas'"
 * 	[canvasOptions]="canvasOptions"
 * ></ngx3js-viewer>
 * <ngx3js-viewer
 * 	[type]="'shadowmapviewer'"
 * 	[x]="10" [y]="-10"
 * 	[width]="'25%'" [height]="'25%'"
 * 	[light]="spotLight" [enabled]="controls.hudEnable"
 * ></ngx3js-viewer>
 * <ngx3js-viewer
 * 	[type]="'shadowmapviewer'"
 * 	[x]="-10" [y]="-10" [width]="'15%'"
 * 	[height]="'width'" [light]="spotLight"
 * ></ngx3js-viewer>
 * <ngx3js-viewer
 * 	[type]="'shadowmesh'"
 * 	[mesh]="cube"
 * 	[light]="sunLight" [plane]="plane"
 * ></ngx3js-viewer>
 * ```
 */
@Component({
	selector: 'ngx3js-viewer',
	templateUrl: './viewer.component.html',
	styleUrls: ['./viewer.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxViewerComponent),
		},
	],
})
export class NgxViewerComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The type of viewer
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | ViewerCanvas | canvas |
	 * | ShadowMapViewer | shadowmapviewer, shadowmap |
	 * | ShadowMesh | shadowmesh, shadow |
	 * | ProgressiveLightMap | progressivelightmap, progressivelight |
	 */
	@Input() public type: string = 'shadowmap';

	/**
	 * The Light of Viewer
	 */
	@Input() public light: NgxLightComponent | NgxMeshComponent | I3JS.Light = null;

	/**
	 * The Mesh of Viewer
	 */
	@Input() public mesh: NgxMeshComponent | NgxHelperComponent | I3JS.Mesh = null;

	/**
	 * The Plane of Viewer
	 */
	@Input() public plane:
		| NgxMeshComponent
		| NgxHelperComponent
		| I3JS.Object3D
		| I3JS.Plane = null;

	/**
	 * The x of position
	 */
	@Input() public x: number | string = 0;

	/**
	 * The y of position
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
	 * The lightMapRes of ProgressiveLightMap
	 */
	@Input() public lightMapRes: number = 1024;

	/**
	 * The blendWindow of viewer component
	 */
	@Input() public blendWindow: number = 200;

	/**
	 * The blurEdges of viewer component
	 */
	@Input() public blurEdges: boolean = true;

	/**
	 * The debugLightmap of viewer component
	 */
	@Input() public debugLightmap: boolean = false;

	/**
	 * The canvasOptions of viewer component
	 */
	@Input() public canvasOptions: any = null;

	/**
	 * Gets light
	 * @returns light
	 */
	private getLight(): I3JS.Light {
		this.unSubscribeRefer('light');
		if (NgxThreeUtil.isNotNull(this.light)) {
			const light = NgxThreeUtil.getLight(this.light);
			this.subscribeRefer(
				'light',
				NgxThreeUtil.getSubscribe(
					this.light,
					() => {
						this.needUpdate = true;
					},
					'light'
				)
			);
			return light;
		}
		return new N3JS.PointLight();
	}

	/**
	 * Gets mesh
	 * @returns mesh
	 */
	private getMesh(): I3JS.Mesh {
		this.unSubscribeRefer('mesh');
		if (NgxThreeUtil.isNotNull(this.mesh)) {
			const mesh = NgxThreeUtil.getMesh(this.mesh);
			this.subscribeRefer(
				'mesh',
				NgxThreeUtil.getSubscribe(
					this.mesh,
					() => {
						this.needUpdate = true;
					},
					'mesh'
				)
			);
			return mesh;
		}
		return new N3JS.Mesh();
	}

	/**
	 * Gets plane
	 * @returns plane
	 */
	private getPlane(): I3JS.Plane {
		const plane = new N3JS.Plane(new N3JS.Vector3(0, 1, 0), 0.01);
		if (NgxThreeUtil.isNotNull(this.plane)) {
			let mesh: I3JS.Object3D = null;
			if (this.plane instanceof N3JS.Plane) {
				plane.copy(this.plane);
			} else if (this.plane instanceof N3JS.Mesh) {
				mesh = this.plane;
			} else if (this.plane instanceof NgxMeshComponent) {
				mesh = this.plane.getObject3d();
				this.subscribeRefer(
					'referTarget',
					NgxThreeUtil.getSubscribe(
						this.plane,
						() => {
							this.needUpdate = true;
						},
						'mesh'
					)
				);
			}
			if (mesh !== null) {
				mesh.updateMatrixWorld();
				const p1 = new N3JS.Vector3(0, 0.01, 0);
				const p2 = new N3JS.Vector3(100, 0.01, 0);
				const p3 = new N3JS.Vector3(0, 0.01, 100);
				mesh.localToWorld(p1);
				mesh.localToWorld(p2);
				mesh.localToWorld(p3);
				plane.setFromCoplanarPoints(p1, p3, p2);
				plane.constant *= -1;
			}
		}
		return plane;
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
	 * Gets view port size
	 * @param size
	 * @param cameraSize
	 * @param [def]
	 * @returns view port size
	 */
	private getViewPortSize(
		size: number | string,
		cameraSize: number,
		def?: number | string
	): number {
		const baseSize = NgxThreeUtil.getTypeSafe(size, def);
		if (NgxThreeUtil.isNotNull(baseSize)) {
			let resultSize: number = 0;
			if (typeof baseSize == 'string') {
				if (baseSize.endsWith('%')) {
					resultSize = Math.ceil(
						(cameraSize * parseFloat(baseSize.slice(0, -1))) / 100
					);
				} else {
					switch (baseSize) {
						case 'x':
							resultSize = this.getX(def);
							break;
						case 'y':
							resultSize = this.getY(def);
							break;
						case 'width':
							resultSize = this.getWidth(def);
							break;
						case 'height':
							resultSize = this.getHeight(def);
							break;
						default:
							resultSize = parseFloat(baseSize);
							break;
					}
				}
			} else {
				resultSize = baseSize;
			}
			return resultSize;
		}
		return 0;
	}

	/**
	 * Creates an instance of viewer component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('viewer');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.viewer !== null && NgxThreeUtil.isNotNull(this.viewer.dispose)) {
			this.viewer.dispose();
		}
		this.viewer = null;
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
		if (changes && this.viewer) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
	}

	/**
	 * The Renderer of viewer component
	 */
	private renderer: I3JS.Renderer = null;

	/**
	 * Sets renderer
	 * @param renderer
	 */
	public setRenderer(renderer: I3JS.Renderer) {
		this.renderer = renderer;
		this.getViewer();
	}

	/**
	 * Gets renderer
	 * @returns renderer
	 */
	public getRenderer(): I3JS.Renderer {
		return this.renderer;
	}

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: any): boolean {
		if (super.setParent(parent)) {
			if (this.viewer !== null && this.viewer instanceof N3JS.Mesh) {
				this.parent.add(this.viewer);
			}
			return true;
		} else {
			return false;
		}
	}

	/**
	 * The Viewer of viewer component
	 */
	private viewer: any = null;

	/**
	 * Renderer width of viewer component
	 */
	private rendererWidth: number = 1024;

	/**
	 * Renderer height of viewer component
	 */
	private rendererHeight: number = 1024;

	/**
	 * Renderer height of viewer component
	 */
	private pixelRatio: number = 1;

	/**
	 * Sets viewer size
	 * @param width
	 * @param height
	 */
	public setRendererSize(width: number, height: number, pixelRatio: number) {
		this.rendererWidth = width;
		this.rendererHeight = height;
		this.pixelRatio = pixelRatio;
		if (this.viewer !== null) {
			this.resizeViewer();
		}
	}

	/**
	 * Resizes viewer
	 */
	public resizeViewer() {
		if (this.viewer !== null) {
			switch (this.type.toLowerCase()) {
				case 'canvas':
				case 'shadowmapviewer':
				case 'shadowmap':
					this.viewer.position.x = this.getX();
					this.viewer.position.y = this.getY();
					this.viewer.size.width = this.getWidth();
					this.viewer.size.height = this.getHeight();
					this.viewer.enabled = this.enabled;
					this.viewer.updateForWindowResize();
					break;
				default:
					break;
			}
		}
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (this.viewer !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getViewer();
				return;
			}
			if (
				!NgxThreeUtil.isOnlyIndexOf(
					changes,
					['x', 'y', 'width', 'height', 'canvasoptions'],
					this.OBJECT_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, ['x', 'y', 'width', 'height'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['reset']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'reset':
						this.resizeViewer();
						break;
					case 'canvasoptions':
						if (this.viewer instanceof ViewerCanvas) {
							this.viewer.setOptions(this.canvasOptions);
						}
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	/**
	 * Gets viewer
	 * @returns
	 */
	public getViewer() {
		if (this.viewer === null || this._needUpdate) {
			if (this.viewer !== null) {
				if (NgxThreeUtil.isNotNull(this.viewer.parent)) {
					this.viewer.parent.remove(this.viewer);
				}
				if (NgxThreeUtil.isNotNull(this.viewer.dispose)) {
					this.viewer.dispose();
				}
			}
			this.needUpdate = false;
			this.unSubscribeRefer('referTarget');
			this.unSubscribeRefer('light');
			this.unSubscribeRefer('mesh');
			switch (this.type.toLowerCase()) {
				case 'canvas':
					this.viewer = new ViewerCanvas(this.renderer, this.canvasOptions);
					this.resizeViewer();
					break;
				case 'shadowmapviewer':
				case 'shadowmap':
					this.viewer = new N3JS.ShadowMapViewer(this.getLight());
					this.resizeViewer();
					break;
				case 'shadowmesh':
				case 'shadow':
					const shadowMesh = new N3JS.ShadowMesh(this.getMesh());
					this._refLight = this.getLight();
					this._refPlane = this.getPlane();
					this._refLightPosition = new N3JS.Vector4(0, 0, 0, 0.001);
					this.viewer = shadowMesh;
					if (this.parent !== null) {
						this.parent.add(this.viewer);
					}
					break;
				case 'progressivelightmap':
				case 'progressivelight':
					const progressiveSurfacemap = new N3JS.ProgressiveLightMap(
						this.getRenderer() as I3JS.WebGLRenderer,
						NgxThreeUtil.getTypeSafe(this.lightMapRes, 1024)
					);
					const lightmapObjects: any = [];
					progressiveSurfacemap.addObjectsToLightMap(lightmapObjects);
					this.viewer = progressiveSurfacemap;
					break;
				default:
					break;
			}
			this.setObject(this.viewer);
		}
		return this.viewer;
	}

	/**
	 * Ref light of viewer component
	 */
	private _refLight: I3JS.Light = null;

	/**
	 * Ref plane of viewer component
	 */
	private _refPlane: I3JS.Plane = null;

	/**
	 * Ref light position of viewer component
	 */
	private _refLightPosition: I3JS.Vector4 = null;

	/**
	 * Updates viewer component
	 * @param _
	 */
	public update(_: IRendererTimer) {
		if (this.viewer !== null) {
			switch (this.type.toLowerCase()) {
				case 'shadowmesh':
				case 'shadow':
					if (this._refLight !== null && this._refPlane) {
						this._refLightPosition.x = this._refLight.position.x;
						this._refLightPosition.y = this._refLight.position.y;
						this._refLightPosition.z = this._refLight.position.z;
						this.viewer.update(this._refPlane, this._refLightPosition);
					}
					break;
			}
		}
	}

	/**
	 * Gets scene
	 * @param [scenes]
	 * @returns scene
	 */
	public getScene(scenes?: QueryList<any> | any): I3JS.Scene {
		if (NgxThreeUtil.isNotNull(scenes)) {
			if (scenes instanceof QueryList && scenes.length > 0) {
				return scenes.first.getScene();
			} else if (scenes instanceof N3JS.Scene) {
				return scenes;
			} else if (NgxThreeUtil.isNotNull(scenes.getScene)) {
				return scenes.getScene();
			}
		}
		return new N3JS.Scene();
	}

	/**
	 * Gets camera
	 * @param [cameras]
	 * @returns camera
	 */
	public getCamera(cameras?: QueryList<any> | any): I3JS.Camera {
		if (NgxThreeUtil.isNotNull(cameras)) {
			if (cameras instanceof QueryList && cameras.length > 0) {
				return cameras.first.getCamera();
			} else if (cameras instanceof N3JS.Camera) {
				return cameras;
			} else if (NgxThreeUtil.isNotNull(cameras.getCamera)) {
				return cameras.getCamera();
			}
		}
		return new N3JS.Camera();
	}

	/**
	 * Renders viewer component
	 * @param renderer
	 * @param scenes
	 * @param cameras
	 * @param [renderTimer]
	 */
	public render(
		renderer: I3JS.Renderer,
		scenes: QueryList<any> | any,
		cameras: QueryList<any> | any,
		renderTimer?: IRendererTimer
	) {
		if (this.viewer !== null && this.enabled) {
			switch (this.type.toLowerCase()) {
				case 'shadowmapviewer':
				case 'shadowmap':
					this.viewer.render(renderer);
					break;
				case 'canvas':
					{
						const scene = this.getScene(scenes);
						const camera = this.getCamera(cameras);
						this.viewer.render(renderer, scene, camera);
					}
					break;
				case 'progressivelightmap':
				case 'progressivelight':
					if (this.viewer instanceof N3JS.ProgressiveLightMap) {
						const camera = this.getCamera(cameras);
						this.viewer.update(
							camera,
							NgxThreeUtil.getTypeSafe(this.blendWindow, 200),
							NgxThreeUtil.getTypeSafe(this.blurEdges, true)
						);
						if (!this.viewer.firstUpdate) {
							this.viewer.showDebugLightmap(
								NgxThreeUtil.getTypeSafe(this.debugLightmap, false)
							);
						}
					}
					break;
				default:
					break;
			}
		}
	}
}
