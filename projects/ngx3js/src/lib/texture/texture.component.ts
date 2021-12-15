import {
	Component,
	forwardRef,
	Input,
	OnDestroy,
	OnInit,
	SimpleChanges
} from '@angular/core';
import { Lut } from 'three/examples/jsm/math/Lut';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { NgxLocalStorageService } from '../local-storage.service';
import { TCanvasFunctionType } from '../ngx-interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxAbstractTextureComponent } from '../texture.abstract';

/**
 * Texture Component
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TextureComponent) page for details.
 *
 * ```html
 * <ngx3js-texture
 * 	[type]="'environment'"
 * 	[storageName]="'textures/equirectangular/venice_sunset_1k.hdr'"
 * 	[mapping]="'EquirectangularReflectionMapping'"
 * ></ngx3js-texture>
 * <ngx3js-texture
 * 	[type]="'map'"
 * 	[image]="'models/obj/cerberus/Cerberus_A.jpg'"
 * 	[encoding]="'sRGBEncoding'" [wrapS]="'RepeatWrapping'"
 * ></ngx3js-texture>
 * <ngx3js-texture
 * 	[type]="'metalnessMap'"
 * 	[image]="'models/obj/cerberus/Cerberus_RM.jpg'"
 * 	[wrapS]="'RepeatWrapping'"
 * ></ngx3js-texture>
 * <ngx3js-texture
 * 	[type]="'roughnessMap'"
 * 	[image]="'models/obj/cerberus/Cerberus_RM.jpg'"
 * 	[wrapS]="'RepeatWrapping'"
 * ></ngx3js-texture>
 * <ngx3js-texture
 * 	[type]="'normalMap'"
 * 	[image]="'models/obj/cerberus/Cerberus_N.jpg'"
 * 	[wrapS]="'RepeatWrapping'"
 * ></ngx3js-texture>
 * <ngx3js-texture
 * 	[type]="'map'"
 * 	[image]="'textures/planets/earth_atmos_2048.jpg'"
 * ></ngx3js-texture>
 * <ngx3js-texture
 * 	[type]="'specularMap'"
 * 	[image]="'textures/planets/earth_specular_2048.jpg'"
 * ></ngx3js-texture>
 * <ngx3js-texture
 * 	[type]="'normalMap'"
 * 	[image]="'textures/planets/earth_normal_2048.jpg'"
 * ></ngx3js-texture>
 * <ngx3js-texture
 * 	[program]="'shadow2'"
 * 	[width]="128" [height]="128"
 * ></ngx3js-texture>
 * <ngx3js-texture
 * 	[type]="'background-environment'"
 * 	[storageName]="'textures/equirectangular/venice_sunset_1k.hdr'"
 * 	[cubeType]="'Equirectangular'"
 * ></ngx3js-texture>
 * <ngx3js-texture
 * 	[type]="'map'"
 * 	[image]="'textures/uv_grid_opengl.jpg'"
 * 	[wrap]="'RepeatWrapping'"
 * ></ngx3js-texture>
 * <ngx3js-texture
 * 	[image]="'textures/grid.png'"
 * 	[wrap]="'RepeatWrapping'" [repeat]="40"
 * ></ngx3js-texture>
 * <ngx3js-texture
 * 	[image]="'textures/grid.png'"
 * 	[wrap]="'RepeatWrapping'" [repeatX]="4 * 5" [repeatY]="3 * 5"
 * ></ngx3js-texture>
 * <ngx3js-texture
 * 	[image]="'textures/patterns/circuit_pattern.png'"
 * 	[anisotropy]="16"
 * ></ngx3js-texture>
 * <ngx3js-texture
 * 	[image]="'textures/crate.gif'"
 * 	[flipY]="true"
 * ></ngx3js-texture>
 * ```
 */
@Component({
	selector: 'ngx3js-texture',
	templateUrl: './texture.component.html',
	styleUrls: ['./texture.component.scss'],
	providers: [
		{
			provide: NgxAbstractTextureComponent,
			useExisting: forwardRef(() => NgxTextureComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxTextureComponent),
		},
	],
})
export class NgxTextureComponent
	extends NgxAbstractTextureComponent
	implements OnInit, OnDestroy
{
	/**
	 * The refer of texture component
	 */
	@Input() public refer: any = null;

	/**
	 * The image of texture component
	 */
	@Input() public image: string = null;

	/**
	 * The cubeImage of texture component
	 */
	@Input() public cubeImage: string[] = null;

	/**
	 * The storageName of texture component
	 */
	@Input() public storageName: string = null;

	/**
	 * The storageOption of texture component
	 */
	@Input() public storageOption: any = null;

	/**
	 * The program of texture component
	 */
	@Input() public program: TCanvasFunctionType | string = null;

	/**
	 * The canvas of texture component
	 */
	@Input() public canvas:
		| HTMLVideoElement
		| HTMLImageElement
		| HTMLCanvasElement
		| ImageBitmap
		| string = null;

	/**
	 * The Input of texture component
	 */
	/**
	 * The perlin of texture component
	 */
	@Input() public perlin: any = null;

	/**
	 * The sunX of texture component
	 */
	@Input() public sunX: number = null;

	/**
	 * The sunY of texture component
	 */
	@Input() public sunY: number = null;

	/**
	 * The sunZ of texture component
	 */
	@Input() public sunZ: number = null;

	/**
	 * The useDropImage of texture component
	 */
	@Input() public useDropImage: boolean = false;

	/**
	 * The color of texture component
	 */
	@Input() public color: number | string = null;

	/**
	 * The add of texture component
	 */
	@Input() public add: number | string = null;

	/**
	 * Gets image
	 * @param [def]
	 * @returns image
	 */
	private getImage(def?: string): string {
		return NgxThreeUtil.getTypeSafe(this.image, def);
	}

	/**
	 * Gets cube image
	 * @param [def]
	 * @returns cube image
	 */
	private getCubeImage(def?: string[]): string[] {
		return NgxThreeUtil.getTypeSafe(this.cubeImage, def);
	}

	/**
	 * Gets program
	 * @param [def]
	 * @returns program
	 */
	private getProgram(
		def?: TCanvasFunctionType | string
	): TCanvasFunctionType | string {
		return NgxThreeUtil.getTypeSafe(this.program, def);
	}

	/**
	 * Gets canvas
	 * @param [def]
	 * @returns canvas
	 */
	private getCanvas(
		def?: string
	): HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | ImageBitmap {
		if (NgxThreeUtil.isNull(this.canvas) || typeof this.canvas === 'string') {
			const canvas = (NgxThreeUtil.getTypeSafe(this.canvas, def, '') as string)
				.toLowerCase()
				.replace(/[^a-z0-9]/gi, '');
			switch (canvas) {
				case 'flakes':
				case 'flakestexture':
				case 'lutrainbow':
				case 'lutcooltowarm':
				case 'lutblackbody':
				case 'lutgrayscale':
					return new Lut(canvas.toLowerCase().substr(3)).createCanvas();
				case 'lut':
				default:
					return new Lut().createCanvas();
			}
		} else {
			return this.canvas;
		}
	}

	/**
	 * Creates an instance of texture component.
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
		super.ngOnInit('texture');
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
		if (changes) {
			if (changes.useDropImage) {
				this.setUseDropImage(this.useDropImage);
				delete changes.useDropImage;
			}
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
	 * Sets use drop image
	 * @param useDropImage
	 */
	private setUseDropImage(useDropImage: boolean) {
		if (useDropImage) {
			if (this._dragOverHandler === null) {
				this._dragOverHandler = (event: any) => {
					event.preventDefault();
					event.dataTransfer.dropEffect = 'copy';
				};
				document.addEventListener('dragover', this._dragOverHandler, {
					passive: true,
				});
			}
			if (this._dragEnterHandler === null) {
				this._dragEnterHandler = () => {
					document.body.style.opacity = (0.5).toString();
				};
				document.addEventListener('dragenter', this._dragEnterHandler, {
					passive: true,
				});
			}
			if (this._dragLeaveHandler === null) {
				this._dragLeaveHandler = () => {
					document.body.style.opacity = (1).toString();
				};
				document.addEventListener('dragleave', this._dragLeaveHandler, {
					passive: true,
				});
			}
			if (this._dropHandler === null) {
				this._dropHandler = (event: any) => {
					event.preventDefault();
					if (this.texture !== null) {
						const texture = this.texture;
						const reader = new FileReader();
						reader.addEventListener(
							'load',
							(event) => {
								texture.image.src = event.target.result;
								texture.needsUpdate = true;
								this.synkMaterial(texture);
							},
							{ passive: true }
						);
						reader.readAsDataURL(event.dataTransfer.files[0]);
					}
					document.body.style.opacity = (1).toString();
				};
				document.addEventListener('drop', this._dropHandler, { passive: true });
			}
		} else {
			if (this._dragOverHandler !== null) {
				document.removeEventListener('dragover', this._dragOverHandler);
				this._dragOverHandler = null;
			}
			if (this._dragEnterHandler !== null) {
				document.removeEventListener('dragenter', this._dragEnterHandler);
				this._dragEnterHandler = null;
			}
			if (this._dragLeaveHandler !== null) {
				document.removeEventListener('dragleave', this._dragLeaveHandler);
				this._dragLeaveHandler = null;
			}
			if (this._dropHandler !== null) {
				document.removeEventListener('drop', this._dropHandler);
				this._dropHandler = null;
			}
		}
	}

	/**
	 * Drag over handler of texture component
	 */
	private _dragOverHandler: any = null;

	/**
	 * Drag enter handler of texture component
	 */
	private _dragEnterHandler: any = null;

	/**
	 * Drag leave handler of texture component
	 */
	private _dragLeaveHandler: any = null;

	/**
	 * Drop handler of texture component
	 */
	private _dropHandler: any = null;

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (this.texture !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getTexture();
				return;
			}
			if (
				NgxThreeUtil.isIndexOf(changes, [
					'image',
					'storagename',
					'storageoption',
					'cubeimage',
					'loadertype',
					'canvas',
					'text',
					'width',
					'height',
				])
			) {
				this.needUpdate = true;
				return;
			}
			NgxAbstractTextureComponent.setTextureOptions(
				this.texture,
				this.getTextureOptions()
			);
			if (NgxThreeUtil.isTextureLoaded(this.texture)) {
				this.texture.needsUpdate = true;
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * Gets texture
	 * @template T
	 * @returns texture
	 */
	public getTexture<T extends I3JS.Texture>(): T {
		if (this.texture === null || this._needUpdate) {
			this.needUpdate = false;
			this.unSubscribeRefer('referTexture');
			if (this.refer !== null) {
				if (this.refer instanceof NgxTextureComponent) {
					this.texture = this.getTextureImage(
						this.refer.getImage(null),
						this.refer.getCubeImage(null),
						this.refer.getProgram(null)
					);
					this.texture.repeat.copy(this.refer.getRepeat(1, 1));
					this.texture.offset.copy(this.refer.getOffset(0, 0));
				} else if (this.refer.getTexture && this.refer.textureSubscribe) {
					this.setReferTexture(this.refer.getTexture());
					this.subscribeRefer(
						'referTexture',
						this.refer.textureSubscribe().subscribe((texture: any) => {
							if (texture instanceof N3JS.Texture) {
								this.setReferTexture(texture);
							} else {
								this.setReferTexture(this.refer.getTexture());
							}
						})
					);
				} else {
					this.texture = new N3JS.Texture();
				}
			} else if (NgxThreeUtil.isNotNull(this.storageName)) {
				const cubeType = NgxThreeUtil.getTypeSafe(this.cubeType, 'none');
				switch (cubeType.toLowerCase()) {
					case 'angular':
					case 'equirect':
					case 'equirectangular':
					case 'fromequirectangular':
					case 'cube':
					case 'cubemap':
					case 'fromcubemap':
						this.texture = new N3JS.CubeTexture([]);
						break;
					default:
						if (
							this.storageName.endsWith('.hdr') ||
							this.storageName.endsWith('.exr')
						) {
							this.texture = new N3JS.DataTexture(new Uint8Array(6), 1, 1);
						} else if (
							this.storageName.endsWith('.pvr') ||
							this.storageName.endsWith('.ktx') ||
							this.storageName.endsWith('.ktx2') ||
							this.storageName.endsWith('.dds')
						) {
							this.texture = new N3JS.CompressedTexture(null, 1, 1);
						} else {
							this.texture = new N3JS.Texture();
						}
						break;
				}
				this.localStorageService.getTexture(
					this.storageName,
					(texture) => {
						this.setTextureLoaded(texture);
					},
					this.storageOption
				);
			} else {
				if (NgxThreeUtil.isNotNull(this.canvas)) {
					const canvas = this.getCanvas();
					this.texture = new N3JS.CanvasTexture(canvas);
					if (canvas instanceof HTMLCanvasElement) {
						canvas.addEventListener('needupdate', () => {
							this.texture.needsUpdate = true;
						});
					}
				} else if (
					NgxThreeUtil.isNotNull(this.perlin) &&
					this.perlin.getPerlinGeometry
				) {
					this.texture = new N3JS.CanvasTexture(
						this.perlin
							.getPerlinGeometry()
							.getTexture(
								NgxThreeUtil.getVector3Safe(
									this.sunX,
									this.sunY,
									this.sunZ,
									new N3JS.Vector3(1, 1, 1)
								),
								NgxThreeUtil.getColorSafe(this.color, 0x602000),
								NgxThreeUtil.getColorSafe(this.add, 0xe08060)
							)
					);
				} else {
					this.texture = this.getTextureImage(
						this.getImage(null),
						this.getCubeImage(null),
						this.getProgram(null),
						() => {
							this.setTextureLoaded(this.texture);
						}
					);
				}
				if (NgxThreeUtil.isNotNull(this.mapping)) {
					this.texture.mapping = NgxThreeUtil.getMappingSafe(this.mapping);
				}
			}
			this.synkMaterial(this.texture);
			super.setObject(this.texture);
		}
		return this.texture as T;
	}
}
