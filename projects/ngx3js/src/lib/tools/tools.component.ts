import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { NgxLocalStorageService } from '../local-storage.service';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxAbstractTextureComponent } from '../texture.abstract';

/**
 * Tools Component
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ToolsComponent) page for details.
 *
 * ```html
 * <ngx3js-tools
 * 	[type]="'audio'" [url]="'sounds/ping_pong.mp3'"
 * ></ngx3js-tools>
 * <ngx3js-tools
 * 	[type]="'pmremtexture'" [background]="'0xcccccc'"
 * ></ngx3js-tools>
 * <ngx3js-tools
 * 	[type]="'pmremtexture'"
 * 	[storageName]="'spot1Lux.hdr'"
 * 	[storageOption]="{ path: 'textures/equirectangular/' }"
 * ></ngx3js-tools>
 * ```
 */
@Component({
	selector: 'ngx3js-tools',
	templateUrl: './tools.component.html',
	styleUrls: ['./tools.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxToolsComponent),
		},
	],
})
export class NgxToolsComponent extends NgxAbstractSubscribeComponent implements OnInit {
	/**
	 * The Input of tools component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public type: string = '';

	/**
	 * The url of tools component
	 */
	@Input() public url: string = null;

	/**
	 * The size of tools component
	 */
	@Input() public size: number = null;

	/**
	 * [THREE.LinearEncoding](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) is the default.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) page for details of other formats.
	 * Note that if this value is changed on a texture after the material has been used, it is necessary to trigger a Material.needsUpdate for this value to be realized in the shader.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.LinearEncoding | LinearEncoding , |
	 * | THREE.sRGBEncoding | sRGBEncoding , |
	 * | THREE.GammaEncoding | GammaEncoding , |
	 * | THREE.RGBEEncoding | RGBEEncoding , |
	 * | THREE.LogLuvEncoding | LogLuvEncoding , |
	 * | THREE.RGBM7Encoding | RGBM7Encoding , |
	 * | THREE.RGBM16Encoding | RGBM16Encoding , |
	 * | THREE.RGBDEncoding | RGBDEncoding , |
	 */
	@Input() public encoding: string = null;

	/**
	 * The default is [THREE.RGBAFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures), although the [TextureLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/textures/TextureLoader) will automatically set this to [THREE.RGBFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) for JPG images.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) page for details of other formats.
	 * 
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.AlphaFormat | AlphaFormat, Alpha |
	 * | THREE.RedFormat | RedFormat, Red |
	 * | THREE.RedIntegerFormat | RedIntegerFormat, RedInteger |
	 * | THREE.RGFormat | RGFormat, RG |
	 * | THREE.RGIntegerFormat | RGIntegerFormat, RGInteger |
	 * | THREE.RGBFormat | RGBFormat, RGB |
	 * | THREE.RGBIntegerFormat | RGBIntegerFormat, RGBInteger |
	 * | THREE.RGBAIntegerFormat | RGBAIntegerFormat, RGBAInteger |
	 * | THREE.LuminanceFormat | LuminanceFormat, Luminance |
	 * | THREE.LuminanceAlphaFormat | LuminanceAlphaFormat, LuminanceAlpha |
	 * | THREE.RGBEFormat | RGBEFormat, RGBE |
	 * | THREE.DepthFormat | DepthFormat, Depth |
	 * | THREE.DepthStencilFormat | DepthStencilFormat, DepthStencil |
	 * | THREE.RGBAFormat | RGBAFormat, RGBA |
	 */
	@Input() public format: string = null;

	/**
	 * The background of tools component
	 */
	@Input() public background: string | number | NgxAbstractTextureComponent = null;

	/**
	 * The storageName of tools component
	 */
	@Input() public storageName: string = null;

	/**
	 * The storageOption of tools component
	 */
	@Input() public storageOption: any = null;

	/**
	 * Gets size
	 * @param [def]
	 * @returns size
	 */
	private getSize(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.size, def);
	}

	/**
	 * Creates an instance of tools component.
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
		super.ngOnInit('tools');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
	}

	private tool: any = null;

	/**
	 * Audio loader of tools component
	 */
	private audioLoader: I3JS.AudioLoader = null;

	/**
	 * Gets audio
	 * @returns audio
	 */
	public getAudio(): AudioBuffer {
		const audioBuffer = this.getTool();
		if (audioBuffer instanceof AudioBuffer) {
			return audioBuffer;
		} else {
			return null;
		}
	}

	/**
	 * Gets texture
	 * @returns texture
	 */
	public getTexture(): I3JS.Texture {
		const texture = this.getTool();
		if (texture instanceof N3JS.Texture) {
			return texture;
		} else {
			return null;
		}
	}

	/**
	 * Gets tool
	 * @returns tool
	 */
	public getTool(): any {
		if (this.tool === null || this._needUpdate) {
			this.needUpdate = false;
			let tool: any = null;
			switch (this.type.toLowerCase()) {
				case 'pmremtexture':
					const pmremGenerator = new N3JS.PMREMGenerator(NgxThreeUtil.getRenderer() as I3JS.WebGLRenderer);
					if (NgxThreeUtil.isNotNull(this.storageName)) {
						this.localStorageService.getTexture(
							this.storageName,
							(texture) => {
								if (texture !== null) {
									this.tool = pmremGenerator.fromEquirectangular(texture).texture;
									super.setObject(this.tool);
									this.setSubscribeNext(['texture', 'loaded']);
									pmremGenerator.dispose();
								}
							},
							this.storageOption
						);
						tool = {};
					} else {
						const envScene = new N3JS.Scene();
						if (NgxThreeUtil.isNotNull(this.background)) {
							if (this.background instanceof NgxAbstractTextureComponent) {
								envScene.background = this.background.getTexture();
							} else {
								envScene.background = NgxThreeUtil.getColorSafe(this.background);
							}
						}
						tool = pmremGenerator.fromScene(envScene).texture;
						pmremGenerator.dispose();
					}
					break;
				case 'audio':
					if (this.audioLoader === null) {
						this.audioLoader = new N3JS.AudioLoader();
					}
					tool = {};
					this.audioLoader.load(NgxThreeUtil.getStoreUrl(this.url), (audioBuffer: AudioBuffer) => {
						this.tool = audioBuffer;
						this.setObject(this.tool);
						this.setSubscribeNext('audio');
					});
					break;
				case 'cuberendertarget':
				case 'cuberender':
				case 'webglcuberendertarget':
				default:
					tool = new N3JS.WebGLCubeRenderTarget(this.getSize(256), {
						encoding: NgxThreeUtil.getTextureEncodingSafe(this.encoding, 'sRGB'),
						format: NgxThreeUtil.getPixelFormatSafe(this.format, 'RGBA', ''),
					});
					break;
			}
			this.tool = tool;
			this.setObject(this.tool);
		}
		return this.tool;
	}
}
