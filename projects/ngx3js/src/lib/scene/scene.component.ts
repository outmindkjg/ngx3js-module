import {
	Component,
	ContentChildren, forwardRef, Input,
	OnInit,
	QueryList,
	SimpleChanges
} from '@angular/core';
import { NgxAbstractControllerComponent } from '../controller.component.abstract';
import { NgxFogComponent } from '../fog/fog.component';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { NgxAbstractObject3dComponent } from '../object3d.abstract';
import { NgxPhysicsComponent } from '../physics/physics.component';
import { NgxRendererComponent } from '../renderer/renderer.component';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxAbstractTextureComponent } from '../texture.abstract';
import { NgxTextureComponent } from '../texture/texture.component';
import { NgxViewerComponent } from '../viewer/viewer.component';
import { NgxLocalStorageService } from './../local-storage.service';
import { NgxMixerComponent } from './../mixer/mixer.component';
import { IRendererTimer, INgxColor, INgxTexture } from './../ngx-interface';
import { NgxRigidbodyComponent } from './../rigidbody/rigidbody.component';

/**
 * The Scene component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SceneComponent) page for details.
 * See the [ngx scene](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_scene) page for a live demo.
 *
 */
@Component({
	selector: 'ngx3js-scene',
	templateUrl: './scene.component.html',
	styleUrls: ['./scene.component.scss'],
	providers: [
		{
			provide: NgxAbstractObject3dComponent,
			useExisting: forwardRef(() => NgxSceneComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxSceneComponent),
		},
	],
})
export class NgxSceneComponent
	extends NgxAbstractObject3dComponent
	implements OnInit
{
	/**
	 * The storageName of scene component
	 */
	@Input() public storageName: string = null;

	/**
	 * If not null, sets the background used when rendering the scene, and is always rendered first.
	 * Can be set to a [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Color) which sets the clear color, a [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/textures/Texture) covering the canvas, a cubemap as a [CubeTexture](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/textures/CubeTexture) or an equirectangular as a [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/textures/Texture) . Default is null.
	 */
	@Input() public background: INgxTexture | INgxColor = null;

	/**
	 * If not null, this texture is set as the environment map for all physical materials in the scene.
	 * However, it's not possible to overwrite an existing texture assigned to [MeshStandardMaterial.envMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/MeshStandardMaterial.envMap). Default is null.
	 */
	@Input() public environment: INgxTexture = null;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(NgxPhysicsComponent, { descendants: false })
	private physicsList: QueryList<NgxPhysicsComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(NgxRigidbodyComponent, { descendants: true })
	private sceneRigidbodyList: QueryList<NgxRigidbodyComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(NgxFogComponent, { descendants: false })
	private fogList: QueryList<NgxFogComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(NgxAbstractControllerComponent, { descendants: true })
	private sceneControllerList: QueryList<NgxAbstractControllerComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(NgxMixerComponent, { descendants: true })
	private sceneMixerList: QueryList<NgxMixerComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(NgxViewerComponent, { descendants: true })
	private viewerList: QueryList<NgxViewerComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(NgxTextureComponent, { descendants: false })
	private textureList: QueryList<NgxTextureComponent>;

	/**
	 * Creates an instance of scene component.
	 * @param localStorageService
	 */
	constructor(private localStorageService: NgxLocalStorageService) {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('scene');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
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
		if (changes && this.scene) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(this.physicsList, 'physicsList', 'physics');
		this.subscribeListQueryChange(
			this.sceneRigidbodyList,
			'sceenrigidbodyList',
			'rigidbody'
		);
		this.subscribeListQueryChange(this.fogList, 'fogList', 'fog');
		this.subscribeListQueryChange(this.textureList, 'textureList', 'texture');
		this.subscribeListQueryChange(
			this.sceneControllerList,
			'sceneControllerList',
			'sceneController'
		);
		this.subscribeListQueryChange(
			this.sceneMixerList,
			'sceneMixerList',
			'mixer'
		);
		this.subscribeListQueryChange(this.viewerList, 'viewerList', 'viewer');
		super.ngAfterContentInit();
	}

	/**
	 * The Scene of scene component
	 */
	private scene: I3JS.Scene = null;

	/**
	 * The Renderer of scene component
	 */
	private renderer: NgxRendererComponent = null;

	/**
	 * Sets renderer
	 * @param renderer
	 */
	public setRenderer(renderer: NgxRendererComponent) {
		this.renderer = renderer;
	}

	/**
	 * Gets renderer
	 * @returns renderer
	 */
	public getRenderer(): NgxRendererComponent {
		return this.renderer;
	}

	/**
	 * Gets three renderer
	 * @returns three renderer
	 */
	public getThreeRenderer(): I3JS.Renderer {
		if (NgxThreeUtil.isNotNull(this.renderer)) {
			return this.renderer.getRenderer();
		} else {
			return NgxThreeUtil.getRenderer();
		}
	}

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T extends I3JS.Object3D>(): T {
		return this.getScene() as any;
	}

	/**
	 * Gets json
	 * @returns json
	 */
	public getJson(): any {
		return this.getScene().toJSON();
	}

	/**
	 * Sets clear
	 */
	public setClear(): void {
		const scene = this.getScene();
		if (scene['clear']) {
			scene['clear']();
		} else {
			scene.children = [];
		}
	}

	/**
	 * Sets savelocal storage
	 * @param storageName
	 * @returns
	 */
	public setSavelocalStorage(storageName: string) {
		return this.localStorageService.setScene(storageName, this.getScene());
	}

	/**
	 * The Physics of scene component
	 */
	private _physics: NgxPhysicsComponent = null;

	/**
	 * Gets texture option
	 * @param map
	 * @param name
	 * @returns texture option
	 */
	private getTextureOption(map: INgxTexture, name: string): I3JS.Texture {
		if (NgxThreeUtil.isNotNull(map)) {
			if (typeof map === 'string') {
				const texture = NgxAbstractTextureComponent.getTextureImageOption(
					map,
					null,
					'texture',
					null,
					() => {
						this.addChanges(name);
					}
				);
				return texture;
			} else if (NgxThreeUtil.isNotNull(map['value'])) {
				const texture = NgxAbstractTextureComponent.getTextureImageOption(
					map['value'],
					map['options'],
					map['type'] as string,
					map['cubeImage'],
					() => {
						this.addChanges(name);
					}
				);
				return texture;
			} else {
				this.unSubscribeRefer(name);
				const texture = NgxThreeUtil.getTexture(map, name);
				this.subscribeRefer(
					name,
					NgxThreeUtil.getSubscribe(
						map,
						() => {
							this.addChanges(name);
						},
						'texture'
					)
				);
				return texture;
			}
		}
		return null;
	}

	private _cachedTextureList: NgxAbstractTextureComponent[] = [];

	/**
	 * Applys changes3d
	 * @param changes
	 */
	public applyChanges3d(changes: string[]) {
		if (this.scene !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, [
					'material',
					'background',
					'environment',
					'texture',
					'mesh',
					'viewer',
					'light',
					'camera',
					'physics',
					'fog',
					'scenecontroller',
				]);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['background', 'environment'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['texture']);
			}
			changes.forEach((change) => {
				switch (change) {
					case 'viewer':
						this.unSubscribeReferList('viewerList');
						if (NgxThreeUtil.isNotNull(this.viewerList)) {
							this.viewerList.forEach((viewer) => {
								viewer.setParent(this.scene);
							});
							this.subscribeListQuery(this.viewerList, 'viewerList', 'viewer');
						}
						break;
					case 'rigidbody':
					case 'physics':
					case 'mixer':
						this.unSubscribeReferList('physicsList');
						this.unSubscribeReferList('rigidbodyList');
						this.unSubscribeReferList('mixerList');
						if (
							NgxThreeUtil.isNotNull(this.sceneRigidbodyList) &&
							NgxThreeUtil.isNotNull(this.physicsList) &&
							this.physicsList.length > 0
						) {
							this._physics = this.physicsList.first;
							this.sceneRigidbodyList.forEach((rigidbody) => {
								rigidbody.setPhysics(this._physics);
							});
							this.subscribeListQuery(
								this.physicsList,
								'physicsList',
								'physics'
							);
							this.subscribeListQuery(
								this.sceneRigidbodyList,
								'rigidbodyList',
								'rigidbody'
							);
						}
						if (
							NgxThreeUtil.isNotNull(this._physics) &&
							NgxThreeUtil.isNotNull(this.sceneMixerList)
						) {
							this.sceneMixerList.forEach((mixer) => {
								mixer.setPhysics(this._physics);
							});
							this.subscribeListQuery(
								this.sceneMixerList,
								'sceneMixerList',
								'mixer'
							);
						}
						break;
					case 'fog':
						this.unSubscribeReferList('fogList');
						if (NgxThreeUtil.isNotNull(this.fogList)) {
							this.fogList.forEach((fog) => {
								fog.setScene(this.scene);
							});
							this.subscribeListQuery(this.fogList, 'fogList', 'fog');
						}
						break;
					case 'controller':
					case 'scenecontroller':
						this.unSubscribeReferList('sceneControllerList');
						if (NgxThreeUtil.isNotNull(this.sceneControllerList)) {
							this.sceneControllerList.forEach((controller) => {
								controller.setScene(this.scene);
							});
							this.subscribeListQuery(
								this.sceneControllerList,
								'sceneControllerList',
								'controller'
							);
						}
						break;
					case 'background':
					case 'environment':
						break;
					case 'texture':
						const newTextureList: {
							type: string;
							component: NgxAbstractTextureComponent;
						}[] = [];
						let backgroundTexture: NgxAbstractTextureComponent = null;
						let environmentTexture: NgxAbstractTextureComponent = null;
						if (NgxThreeUtil.isNotNull(this.background)) {
							if (NgxThreeUtil.isColor(this.background)) {
								this.scene.background = NgxThreeUtil.getColorSafe(
									this.background,
									0x000000
								);
							} else if (this.background instanceof NgxAbstractTextureComponent) {
								backgroundTexture = this.background;
							} else {
								this.scene.background = this.getTextureOption(
									this.background,
									'background'
								);
							}
						}
						if (NgxThreeUtil.isNotNull(this.environment)) {
							if (this.environment instanceof NgxAbstractTextureComponent) {
								environmentTexture = this.environment;
							} else {
								this.scene.environment = this.getTextureOption(
									this.environment,
									'environment'
								);
							}
						}
						if (backgroundTexture !== null || environmentTexture !== null) {
							if (backgroundTexture === environmentTexture) {
								newTextureList.push({
									type: 'background-environment',
									component: backgroundTexture,
								});
							} else {
								if (backgroundTexture !== null) {
									newTextureList.push({
										type: 'background',
										component: backgroundTexture,
									});
								}
								if (environmentTexture !== null) {
									newTextureList.push({
										type: 'environment',
										component: environmentTexture,
									});
								}
							}
						}
						if (NgxThreeUtil.isNotNull(this.textureList)) {
							this.textureList.forEach((texture) => {
								newTextureList.push({
									type: 'auto',
									component: texture as any,
								});
							});
						}
						const cachedTextureList: NgxAbstractTextureComponent[] = [];
						newTextureList.forEach((texture) => {
							cachedTextureList.push(texture.component);
						});
						this._cachedTextureList.forEach((texture) => {
							if (cachedTextureList.indexOf(texture) === -1) {
								texture.unsetMaterial(this.selfAny);
							}
						});
						newTextureList.forEach((material) => {
							if (this._cachedTextureList.indexOf(material.component) === -1) {
								material.component.setMaterial(this.selfAny, material.type);
							}
						});
						this._cachedTextureList = cachedTextureList;
						break;
				}
			});
		}
		super.applyChanges3d(changes);
	}

	/**
	 * Updates scene component
	 * @param timer
	 */
	public update(timer: IRendererTimer) {
		this.viewerList.forEach((viewer) => {
			viewer.update(timer);
		});
		this.sceneMixerList.forEach((mixer) => {
			mixer.update(timer);
		});
		this.physicsList.forEach((physics) => {
			physics.update(timer);
		});
		this.sceneRigidbodyList.forEach((rigidbody) => {
			rigidbody.update(timer);
		});
	}

	/**
	 * Scene synked of scene component
	 */
	private _sceneSynked: boolean = false;

	/**
	 * Gets scene
	 * @returns scene
	 */
	public getScene(): I3JS.Scene {
		if (this.scene === null || this._needUpdate) {
			this.getSceneDumpy();
		}
		if (!this._sceneSynked) {
			this._sceneSynked = true;
			if (NgxThreeUtil.isNotNull(this.storageName)) {
				this.scene = new N3JS.Scene();
				this.localStorageService.getScene(
					this.storageName,
					(scene: I3JS.Scene) => {
						this.scene = scene;
						this.setObject3d(scene as any);
					}
				);
			} else {
				this.setObject3d(this.scene as any);
			}
		}
		return this.scene;
	}

	/**
	 * Gets scene dumpy
	 * @returns scene dumpy
	 */
	public getSceneDumpy(): I3JS.Scene {
		if (this.scene === null || this._needUpdate) {
			this.needUpdate = false;
			this.scene = new N3JS.Scene();
			this._sceneSynked = false;
		}
		return this.scene;
	}
}
