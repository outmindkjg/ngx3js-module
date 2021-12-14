import { forwardRef } from '@angular/core';
import {
	Component,
	ContentChildren,
	Input,
	OnInit,
	QueryList,
	SimpleChanges,
} from '@angular/core';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { AbstractControllerComponent } from '../controller.component.abstract';
import { FogComponent } from '../fog/fog.component';
import { ThreeColor, ThreeTexture, ThreeUtil } from '../interface';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { PhysicsComponent } from '../physics/physics.component';
import { RendererComponent } from '../renderer/renderer.component';
import { AbstractTextureComponent } from '../texture.abstract';
import { TextureComponent } from '../texture/texture.component';
import { ViewerComponent } from '../viewer/viewer.component';
import { RendererTimer, N3JS, I3JS } from './../interface';
import { LocalStorageService } from './../local-storage.service';
import { MixerComponent } from './../mixer/mixer.component';
import { RigidbodyComponent } from './../rigidbody/rigidbody.component';

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
			provide: AbstractObject3dComponent,
			useExisting: forwardRef(() => SceneComponent),
		},
		{
			provide: AbstractSubscribeComponent,
			useExisting: forwardRef(() => SceneComponent),
		},
	],
})
export class SceneComponent
	extends AbstractObject3dComponent
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
	@Input() public background: ThreeTexture | ThreeColor = null;

	/**
	 * If not null, this texture is set as the environment map for all physical materials in the scene.
	 * However, it's not possible to overwrite an existing texture assigned to [MeshStandardMaterial.envMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/MeshStandardMaterial.envMap). Default is null.
	 */
	@Input() public environment: ThreeTexture = null;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(PhysicsComponent, { descendants: false })
	private physicsList: QueryList<PhysicsComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(RigidbodyComponent, { descendants: true })
	private sceneRigidbodyList: QueryList<RigidbodyComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(FogComponent, { descendants: false })
	private fogList: QueryList<FogComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(AbstractControllerComponent, { descendants: true })
	private sceneControllerList: QueryList<AbstractControllerComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(MixerComponent, { descendants: true })
	private sceneMixerList: QueryList<MixerComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(ViewerComponent, { descendants: true })
	private viewerList: QueryList<ViewerComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(TextureComponent, { descendants: false })
	private textureList: QueryList<TextureComponent>;

	/**
	 * Creates an instance of scene component.
	 * @param localStorageService
	 */
	constructor(private localStorageService: LocalStorageService) {
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
	private scene: I3JS.IScene = null;

	/**
	 * The Renderer of scene component
	 */
	private renderer: RendererComponent = null;

	/**
	 * Sets renderer
	 * @param renderer
	 */
	public setRenderer(renderer: RendererComponent) {
		this.renderer = renderer;
	}

	/**
	 * Gets renderer
	 * @returns renderer
	 */
	public getRenderer(): RendererComponent {
		return this.renderer;
	}

	/**
	 * Gets three renderer
	 * @returns three renderer
	 */
	public getThreeRenderer(): I3JS.IRenderer {
		if (ThreeUtil.isNotNull(this.renderer)) {
			return this.renderer.getRenderer();
		} else {
			return ThreeUtil.getRenderer();
		}
	}

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T extends I3JS.IObject3D>(): T {
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
	private _physics: PhysicsComponent = null;

	/**
	 * Gets texture option
	 * @param map
	 * @param name
	 * @returns texture option
	 */
	private getTextureOption(map: ThreeTexture, name: string): I3JS.ITexture {
		if (ThreeUtil.isNotNull(map)) {
			if (typeof map === 'string') {
				const texture = AbstractTextureComponent.getTextureImageOption(
					map,
					null,
					'texture',
					null,
					() => {
						this.addChanges(name);
					}
				);
				return texture;
			} else if (ThreeUtil.isNotNull(map['value'])) {
				const texture = AbstractTextureComponent.getTextureImageOption(
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
				const texture = ThreeUtil.getTexture(map, name);
				this.subscribeRefer(
					name,
					ThreeUtil.getSubscribe(
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

	private _cachedTextureList: AbstractTextureComponent[] = [];

	/**
	 * Applys changes3d
	 * @param changes
	 */
	public applyChanges3d(changes: string[]) {
		if (this.scene !== null) {
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, [
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
			if (ThreeUtil.isIndexOf(changes, ['background', 'environment'])) {
				changes = ThreeUtil.pushUniq(changes, ['texture']);
			}
			changes.forEach((change) => {
				switch (change) {
					case 'viewer':
						this.unSubscribeReferList('viewerList');
						if (ThreeUtil.isNotNull(this.viewerList)) {
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
							ThreeUtil.isNotNull(this.sceneRigidbodyList) &&
							ThreeUtil.isNotNull(this.physicsList) &&
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
							ThreeUtil.isNotNull(this._physics) &&
							ThreeUtil.isNotNull(this.sceneMixerList)
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
						if (ThreeUtil.isNotNull(this.fogList)) {
							this.fogList.forEach((fog) => {
								fog.setScene(this.scene);
							});
							this.subscribeListQuery(this.fogList, 'fogList', 'fog');
						}
						break;
					case 'controller':
					case 'scenecontroller':
						this.unSubscribeReferList('sceneControllerList');
						if (ThreeUtil.isNotNull(this.sceneControllerList)) {
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
							component: AbstractTextureComponent;
						}[] = [];
						let backgroundTexture: AbstractTextureComponent = null;
						let environmentTexture: AbstractTextureComponent = null;
						if (ThreeUtil.isNotNull(this.background)) {
							if (ThreeUtil.isColor(this.background)) {
								this.scene.background = ThreeUtil.getColorSafe(
									this.background,
									0x000000
								);
							} else if (this.background instanceof AbstractTextureComponent) {
								backgroundTexture = this.background;
							} else {
								this.scene.background = this.getTextureOption(
									this.background,
									'background'
								);
							}
						}
						if (ThreeUtil.isNotNull(this.environment)) {
							if (this.environment instanceof AbstractTextureComponent) {
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
						if (ThreeUtil.isNotNull(this.textureList)) {
							this.textureList.forEach((texture) => {
								newTextureList.push({
									type: 'auto',
									component: texture as any,
								});
							});
						}
						const cachedTextureList: AbstractTextureComponent[] = [];
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
	public update(timer: RendererTimer) {
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
	public getScene(): I3JS.IScene {
		if (this.scene === null || this._needUpdate) {
			this.getSceneDumpy();
		}
		if (!this._sceneSynked) {
			this._sceneSynked = true;
			if (ThreeUtil.isNotNull(this.storageName)) {
				this.scene = new N3JS.Scene();
				this.localStorageService.getScene(
					this.storageName,
					(scene: I3JS.IScene) => {
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
	public getSceneDumpy(): I3JS.IScene {
		if (this.scene === null || this._needUpdate) {
			this.needUpdate = false;
			this.scene = new N3JS.Scene();
			this._sceneSynked = false;
		}
		return this.scene;
	}
}
