import { AfterContentInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from './interface';
import { TCanvasFunctionType } from './ngx-interface';
import { NgxAbstractSubscribeComponent } from './subscribe.abstract';
import { TextureUtils } from './texture/textureUtils';

/**
 * The Abstract Texture component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AbstractTextureComponent) page for details.
 *
 * ```ts
 * _@Component({
 * 	providers: [
 * 		{
 * 			provide: NgxAbstractTextureComponent,
 * 			useExisting: forwardRef(() => NgxXxxComponent),
 * 		},
 * 	],
 * })
 * export class NgxXxxComponent extends NgxAbstractTextureComponent implements OnInit {
 * 	constructor() {
 * 		super();
 * 	}
 * }
 * ```
 *
 * @see THREE.Texture
 */
@Component({
	template: '',
})
export class NgxAbstractTextureComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit, OnChanges, AfterContentInit, OnDestroy
{
	/**
	 * The Type of Texture of Matrial
	 */
	@Input() public type: string = 'map';

	/**
	 * The LoadType of Texture - video, image etc
	 *  hdrcube, hdrcubetexture -
	 *  rgbm, rgbmtexture
	 *  auto
	 *  video
	 *  imagebitmap
	 *  image
	 *  texture, texture2d, texture3d
	 *  datatexture, datatexture2d, datatexture3d
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public loaderType: string = null;

	/**
	 * The CubeType of Texture -
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public cubeType: string = null;

	/**
	 * The name of the object (doesn't need to be unique). Default is an empty string.
	 */
	@Input() public name: string = null;

	/**
	 * The refName of geometry component
	 */
	@Input() public refName: string | string[] = null;

	/**
	 * If set to *true*, the alpha channel, if present, is multiplied into the color channels when the texture is uploaded to the GPU. Default is *false*.
	 * Note that this property has no effect for [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap).
	 * You need to configure on bitmap creation instead. See [ImageBitmapLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/loaders/ImageBitmapLoader).
	 *
	 */
	@Input() public premultiplyAlpha: boolean = null;

	/**
	 * The data of DataTexture
	 */
	@Input() public data: BufferSource | number[] = null;

	/**
	 * The texture program params
	 */
	@Input() public programParam: any = null;

	/**
	 * The texture program mipmaps
	 */
	@Input() public programMipmaps: any[] = null;

	/**
	 * The Texture param use when call Canvas Program.
	 */
	@Input() public text: string = null;

	/**
	 * How the image is applied to the object. An object type of [THREE.UVMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) is the default, where the U,V coordinates are used to apply the map.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) page for other mapping types.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.UVMapping | UVMapping, uv |
	 * | THREE.CubeReflectionMapping | CubeReflectionMapping, cubereflection |
	 * | THREE.CubeRefractionMapping | CubeRefractionMapping, cuberefraction |
	 * | THREE.EquirectangularReflectionMapping | EquirectangularReflectionMapping, equirectangularreflection |
	 * | THREE.EquirectangularRefractionMapping | EquirectangularRefractionMapping, equirectangularrefraction |
	 * | THREE.CubeUVReflectionMapping | CubeUVReflectionMapping, cubeuvreflection |
	 * | THREE.CubeUVRefractionMapping | CubeUVRefractionMapping, cubeuvrefraction |
	 * | THREE.Texture.DEFAULT_MAPPING | default |
	 */
	@Input() public mapping: string = null;

	/**
	 * This defines how the texture is wrapped horizontally and corresponds to *U* in UV mapping.
	 * The default is [THREE.ClampToEdgeWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures), where the edge is clamped to the outer edge texels.
	 * The other two choices are [THREE.RepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) and [THREE.MirroredRepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures).
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) page for details.
	 *
	 * The Default Value of wrapS, wrapT.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.RepeatWrapping | RepeatWrapping, wraprepeat, repeat |
	 * | THREE.MirroredRepeatWrapping | MirroredRepeatWrapping, mirroredrepeat |
	 * | THREE.ClampToEdgeWrapping | ClampToEdgeWrapping, clamptoedge |
	 */
	@Input() public wrap: string = null;

	/**
	 * This defines how the texture is wrapped horizontally and corresponds to *U* in UV mapping.
	 * The default is [THREE.ClampToEdgeWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures), where the edge is clamped to the outer edge texels.
	 * The other two choices are [THREE.RepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) and [THREE.MirroredRepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures).
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) page for details.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.RepeatWrapping | RepeatWrapping, wraprepeat, repeat |
	 * | THREE.MirroredRepeatWrapping | MirroredRepeatWrapping, mirroredrepeat |
	 * | THREE.ClampToEdgeWrapping | ClampToEdgeWrapping, clamptoedge |
	 */
	@Input() public wrapS: string = null;

	/**
	 * This defines how the texture is wrapped vertically and corresponds to *V* in UV mapping.
	 * The same choices are available as for [property:number wrapS].
	 * NOTE: tiling of images in textures only functions if image dimensions are powers of two
	 * (2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, ...) in terms of pixels.
	 * Individual dimensions need not be equal, but each must be a power of two.
	 * This is a limitation of WebGL, not three.js.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.RepeatWrapping | RepeatWrapping, wraprepeat, repeat |
	 * | THREE.MirroredRepeatWrapping | MirroredRepeatWrapping, mirroredrepeat |
	 * | THREE.ClampToEdgeWrapping | ClampToEdgeWrapping, clamptoedge |
	 */
	@Input() public wrapT: string = null;

	/**
	 * The Default Value of magFilter, minFilter
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.NearestFilter | NearestFilter, Nearest |
	 * | THREE.NearestMipmapNearestFilter | NearestMipmapNearestFilter, nearestmipmapnearest |
	 * | THREE.NearestMipmapLinearFilter | NearestMipmapLinearFilter, nearestmipmaplinear |
	 * | THREE.LinearMipmapNearestFilter | LinearMipmapNearestFilter, linearmipmapnearest |
	 * | THREE.LinearMipmapLinearFilter | LinearMipmapLinearFilter, linearmipmaplinear |
	 * | THREE.LinearFilter | Linearfilter, linear |
	 */
	@Input() public filter: string = null;

	/**
	 * How the texture is sampled when a texel covers more than one pixel. The default is
	 * [THREE.LinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures), which takes the four closest texels and bilinearly interpolates among them.
	 * The other option is [THREE.NearestFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures), which uses the value of the closest texel.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) page for details.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.NearestFilter | NearestFilter, Nearest |
	 * | THREE.NearestMipmapNearestFilter | NearestMipmapNearestFilter, nearestmipmapnearest |
	 * | THREE.NearestMipmapLinearFilter | NearestMipmapLinearFilter, nearestmipmaplinear |
	 * | THREE.LinearMipmapNearestFilter | LinearMipmapNearestFilter, linearmipmapnearest |
	 * | THREE.LinearMipmapLinearFilter | LinearMipmapLinearFilter, linearmipmaplinear |
	 * | THREE.LinearFilter | Linearfilter, linear |
	 */
	@Input() public magFilter: string = null;

	/**
	 * How the texture is sampled when a texel covers less than one pixel. The default is
	 * [THREE.LinearMipmapLinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures), which uses mipmapping and a trilinear filter.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) page for all possible choices.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.NearestFilter | NearestFilter, Nearest |
	 * | THREE.NearestMipmapNearestFilter | NearestMipmapNearestFilter, nearestmipmapnearest |
	 * | THREE.NearestMipmapLinearFilter | NearestMipmapLinearFilter, nearestmipmaplinear |
	 * | THREE.LinearMipmapNearestFilter | LinearMipmapNearestFilter, linearmipmapnearest |
	 * | THREE.LinearMipmapLinearFilter | LinearMipmapLinearFilter, linearmipmaplinear |
	 * | THREE.LinearFilter | Linearfilter, linear |
	 */
	@Input() public minFilter: string = null;

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
	 * This must correspond to the [.format](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/textures/Texture.format). The default is [THREE.UnsignedByteType](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures), which will be used for most texture formats.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) page for details of other formats.
	 *
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.UnsignedByteType | UnsignedByteType , UnsignedByte, |
	 * | THREE.ByteType | ByteType , Byte |
	 * | THREE.ShortType | ShortType , Short |
	 * | THREE.UnsignedShortType | UnsignedShortType , UnsignedShort |
	 * | THREE.IntType | IntType , Int |
	 * | THREE.UnsignedIntType | UnsignedIntType , UnsignedInt |
	 * | THREE.FloatType | FloatType , Float |
	 * | THREE.HalfFloatType | HalfFloatType , HalfFloat |
	 * | THREE.UnsignedShort4444Type | UnsignedShort4444Type , UnsignedShort4444 |
	 * | THREE.UnsignedShort5551Type | UnsignedShort5551Type , UnsignedShort5551 |
	 * | THREE.UnsignedShort565Type | UnsignedShort565Type , UnsignedShort565 |
	 * | THREE.UnsignedInt248Type | UnsignedInt248Type , UnsignedInt248 |
	 */
	@Input() public dataType: string = null;

	/**
	 * The number of samples taken along the axis through the pixel that has the highest density of texels.
	 * By default, this value is 1. A higher value gives a less blurry result than a basic mipmap, at the cost of more texture samples being used. Use [renderer.getMaxAnisotropy](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer.getMaxAnisotropy)() to find the maximum valid anisotropy value for the GPU; this value is usually a power of 2.
	 */
	@Input() public anisotropy: number = null;

	/**
	 * 4 by default. Specifies the alignment requirements for the start of each pixel row in memory.
	 * The allowable values are 1 (byte-alignment), 2 (rows aligned to even-numbered bytes), 4 (word-alignment), and 8 (rows start on double-word boundaries).
	 * See [glPixelStorei](http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml) for more information.
	 */
	@Input() public unpackAlignment: number = null;

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
	 * How many times the texture is repeated across the surface, in each direction U and V.  If repeat is set greater than 1 in either direction, the corresponding Wrap parameter should also be set to
	 * [THREE.RepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) or [THREE.MirroredRepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) to achieve the desired tiling effect. Setting different repeat values for textures is restricted in the same way like [Texture.offset](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/textures/Texture.offset).
	 *
	 * The default value of repeatX , repeatY
	 */
	@Input() public repeat: number = null;

	/**
	 * How many times the texture is repeated across the surface, in each direction U and V.  If repeat is set greater than 1 in either direction, the corresponding Wrap parameter should also be set to
	 * [THREE.RepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) or [THREE.MirroredRepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) to achieve the desired tiling effect. Setting different repeat values for textures is restricted in the same way like [Texture.offset](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/textures/Texture.offset).
	 *
	 * The value of repeat.x
	 */
	@Input() public repeatX: number = null;

	/**
	 * How many times the texture is repeated across the surface, in each direction U and V.  If repeat is set greater than 1 in either direction, the corresponding Wrap parameter should also be set to
	 * [THREE.RepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) or [THREE.MirroredRepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) to achieve the desired tiling effect. Setting different repeat values for textures is restricted in the same way like [Texture.offset](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/textures/Texture.offset).
	 *
	 * The value of repeat.y
	 */
	@Input() public repeatY: number = null;

	/**
	 * How much a single repetition of the texture is offset from the beginning, in each direction U and V.
	 * Typical range is *0.0* to *1.0*.
	 *
	 * The default value of offsetX, offsetY
	 */
	@Input() public offset: number = null;

	/**
	 * How much a single repetition of the texture is offset from the beginning, in each direction U and V.
	 * Typical range is *0.0* to *1.0*.
	 *
	 * The value of offset.x
	 */
	@Input() public offsetX: number = null;

	/**
	 * How much a single repetition of the texture is offset from the beginning, in each direction U and V.
	 * Typical range is *0.0* to *1.0*.
	 *
	 * The value of offset.y
	 */
	@Input() public offsetY: number = null;

	/**
	 * The point around which rotation occurs. A value of (0.5, 0.5) corresponds to the center of the texture. Default is (0, 0), the lower left.
	 *
	 * The default value of centerX, centerY
	 */
	@Input() public center: number = null;

	/**
	 * The point around which rotation occurs. A value of (0.5, 0.5) corresponds to the center of the texture. Default is (0, 0), the lower left.
	 *
	 * The value of center.x
	 */
	@Input() public centerX: number = null;

	/**
	 * The point around which rotation occurs. A value of (0.5, 0.5) corresponds to the center of the texture. Default is (0, 0), the lower left.
	 *
	 * The value of center.y
	 */
	@Input() public centerY: number = null;

	/**
	 * width of the texture.
	 */
	@Input() public width: number = null;

	/**
	 * height of the texture.
	 */
	@Input() public height: number = null;

	/**
	 * depth of the texture.
	 */
	@Input() public depth: number = null;

	/**
	 * scale of the texture.
	 */
	@Input() public scale: number = null;

	/**
	 * Whether to generate mipmaps (if possible) for a texture. True by default. Set this to false if you are creating mipmaps manually.
	 */
	@Input() public generateMipmaps: boolean = null;

	/**
	 * How much the texture is rotated around the center point, in radians. Positive values are counter-clockwise. Default is *0*.
	 */
	@Input() public rotation: number = null;

	/**
	 * If set to *true*, the texture is flipped along the vertical axis when uploaded to the GPU. Default is *true*.
	 * Note that this property has no effect for [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap).
	 * You need to configure on bitmap creation instead. See [ImageBitmapLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/loaders/ImageBitmapLoader).
	 */
	@Input() public flipY: boolean = null;

	/**
	 * The base attribute can be fine without re-make Texture
	 */
	protected TEXTURE_ATTR: string[] = [];

	/**
	 * Creates an instance of abstract texture component.
	 */
	constructor() {
		super();
		this.TEXTURE_ATTR.push(...this.OBJECT_ATTR);
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 *
	 * @param subscribeType
	 */
	ngOnInit(subscribeType?: string): void {
		super.ngOnInit(subscribeType || 'texture');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.texture !== null) {
			if (this._material !== null) {
				Object.entries(this._material).forEach(([_, info]) => {
					let textureType = info.refType;
					if (textureType === 'auto' || textureType === 'texture' || textureType === '') {
						textureType = this.type;
					}
					info.materials.forEach((material) => {
						if (material instanceof N3JS.Scene) {
							switch (textureType.toLowerCase()) {
								case 'environmentbackground':
								case 'environment-background':
								case 'background-environment':
								case 'backgroundenvironment':
									if (this.texture === material.environment) {
										material.environment = null;
									}
									if (this.texture === material.background) {
										material.background = null;
									}
									break;
								case 'environment':
									if (this.texture === material.environment) {
										material.environment = null;
									}
									break;
								case 'background':
								default:
									if (this.texture === material.background) {
										material.background = null;
									}
									break;
							}
						}
					});
				});
			}
			if (NgxThreeUtil.isNotNull(this.texture.image)) {
				if (
					this.texture instanceof N3JS.VideoTexture &&
					NgxThreeUtil.isNotNull(this.texture.image.srcObject) &&
					NgxThreeUtil.isNotNull(this.texture.image.srcObject.getTracks)
				) {
					this.texture.image.srcObject.getTracks().forEach((track: any) => {
						track.stop();
					});
				} else if (this.texture.image instanceof HTMLMediaElement) {
					this.texture.image.pause();
				}
			}
			this.texture.dispose();
			this.texture = null;
		}
		if (this.refTexture !== null) {
			this.refTexture.dispose();
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
		if (changes) {
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
	 * Gets repeat
	 * @param defX
	 * @param defY
	 * @returns repeat
	 */
	protected getRepeat(defX: number, defY: number): I3JS.Vector2 {
		return NgxThreeUtil.getVector2Safe(
			NgxThreeUtil.getTypeSafe(this.repeatX, this.repeat),
			NgxThreeUtil.getTypeSafe(this.repeatY, this.repeat),
			new N3JS.Vector2(defX, defY)
		);
	}

	/**
	 * Gets offset
	 * @param defX
	 * @param defY
	 * @returns offset
	 */
	protected getOffset(defX: number, defY: number): I3JS.Vector2 {
		return NgxThreeUtil.getVector2Safe(
			NgxThreeUtil.getTypeSafe(this.offsetX, this.offset),
			NgxThreeUtil.getTypeSafe(this.offsetY, this.offset),
			new N3JS.Vector2(defX, defY)
		);
	}

	/**
	 * Gets center
	 * @param defX
	 * @param defY
	 * @returns center
	 */
	private getCenter(defX: number, defY: number): I3JS.Vector2 {
		return NgxThreeUtil.getVector2Safe(
			NgxThreeUtil.getTypeSafe(this.centerX, this.center),
			NgxThreeUtil.getTypeSafe(this.centerY, this.center),
			new N3JS.Vector2(defX, defY)
		);
	}

	/**
	 * Ref texture of abstract texture component
	 */
	private refTexture: I3JS.Texture = null;

	/**
	 * The Texture of abstract texture component
	 */
	protected texture: I3JS.Texture = null;

	/**
	 * Gets texture image
	 * @param image
	 * @param [cubeImage]
	 * @param [program]
	 * @param [onLoad]
	 * @returns texture image
	 */
	public getTextureImage(
		image: string,
		cubeImage?: string[],
		program?: TCanvasFunctionType | string,
		onLoad?: () => void
	): I3JS.Texture {
		return NgxAbstractTextureComponent.getTextureImage(
			image,
			cubeImage,
			program,
			{
				size: this.width || this.height || this.depth,
				width: this.width,
				height: this.height,
				depth: this.depth,
				scale: this.scale,
				type: this.loaderType,
				text: this.text,
				programParam: this.programParam,
				programMipmaps: this.programMipmaps,
				data: this.data,
			},
			onLoad
		);
	}

	/**
	 * Gets texture image option
	 * @param image
	 * @param [optionsTxt]
	 * @param [loaderType]
	 * @param [cubeImage]
	 * @param [onLoad]
	 * @returns texture image option
	 */
	public static getTextureImageOption(
		image: any,
		optionsTxt?: string,
		loaderType?: string,
		cubeImage?: string[],
		onLoad?: () => void
	): I3JS.Texture {
		const loadOption: { [key: string]: any } = {
			size: null,
			width: null,
			height: null,
			depth: null,
			scale: null,
			type: loaderType,
		};
		const textureOption: { [key: string]: any } = {};
		if (NgxThreeUtil.isNotNull(optionsTxt)) {
			const optionsList = optionsTxt.split(',');
			optionsList.forEach((option) => {
				switch (option.toLowerCase()) {
					case 'nearestfilter':
					case 'nearest':
					case 'nearestmipmapnearestfilter':
					case 'nearestmipmapnearest':
					case 'nearestmipmaplinearfilter':
					case 'nearestmipmaplinear':
					case 'linearmipmapnearestfilter':
					case 'linearmipmapnearest':
					case 'linearmipmaplinearfilter':
					case 'linearmipmaplinear':
					case 'linearfilter':
					case 'linear':
						textureOption.minFilter = textureOption.magFilter = NgxThreeUtil.getTypeSafe(
							option,
							'LinearMipmapLinearFilter'
						);
						break;
					case 'minnearestfilter':
					case 'minnearest':
					case 'minnearestmipmapnearestfilter':
					case 'minnearestmipmapnearest':
					case 'minnearestmipmaplinearfilter':
					case 'minnearestmipmaplinear':
					case 'minlinearmipmapnearestfilter':
					case 'minlinearmipmapnearest':
					case 'minlinearmipmaplinearfilter':
					case 'minlinearmipmaplinear':
					case 'minlinearfilter':
					case 'minlinear':
						textureOption.minFilter = NgxThreeUtil.getTypeSafe(option.substr(3), 'LinearMipmapLinearFilter');
						break;
					case 'magnearestfilter':
					case 'magnearest':
					case 'magnearestmipmapnearestfilter':
					case 'magnearestmipmapnearest':
					case 'magnearestmipmaplinearfilter':
					case 'magnearestmipmaplinear':
					case 'maglinearmipmapnearestfilter':
					case 'maglinearmipmapnearest':
					case 'maglinearmipmaplinearfilter':
					case 'maglinearmipmaplinear':
					case 'maglinearfilter':
					case 'maglinear':
						textureOption.magFilter = NgxThreeUtil.getTypeSafe(option.substr(3), 'LinearFilter');
						break;
					case 'repeatwrapping':
					case 'repeat':
					case 'mirroredrepeatwrapping':
					case 'mirroredrepeat':
					case 'clamptoedgewrapping':
					case 'clamptoedge':
					case 'wraprepeat':
						textureOption.wrapS = textureOption.wrapT = NgxThreeUtil.getTypeSafe(option, 'repeat');
						break;
					case 'wrapsrepeatwrapping':
					case 'wrapsrepeat':
					case 'wrapsmirroredrepeatwrapping':
					case 'wrapsmirroredrepeat':
					case 'wrapsclamptoedgewrapping':
					case 'wrapsclamptoedge':
						textureOption.wrapS = NgxThreeUtil.getTypeSafe(option.substr(5), 'repeat');
						break;
					case 'wraptrepeatwrapping':
					case 'wraptrepeat':
					case 'wraptmirroredrepeatwrapping':
					case 'wraptmirroredrepeat':
					case 'wraptclamptoedgewrapping':
					case 'wraptclamptoedge':
						textureOption.wrapT = NgxThreeUtil.getTypeSafe(option.substr(5), 'repeat');
						break;
					case 'alphaformat':
					case 'alpha':
					case 'redformat':
					case 'red':
					case 'redintegerformat':
					case 'redinteger':
					case 'rgformat':
					case 'rg':
					case 'rgintegerformat':
					case 'rginteger':
					case 'rgbformat':
					case 'rgb':
					case 'rgbintegerformat':
					case 'rgbinteger':
					case 'rgbaintegerformat':
					case 'rgbainteger':
					case 'luminanceformat':
					case 'luminance':
					case 'luminancealphaformat':
					case 'luminancealpha':
					case 'rgbeformat':
					case 'rgbe':
					case 'depthformat':
					case 'depth':
					case 'depthstencilformat':
					case 'depthstencil':
					case 'rgbaformat':
					case 'rgba':
						textureOption.format = NgxThreeUtil.getTypeSafe(option, 'rgba');
						break;
					case 'bytetype':
					case 'byte':
					case 'shorttype':
					case 'short':
					case 'unsignedshorttype':
					case 'unsignedshort':
					case 'inttype':
					case 'int':
					case 'unsignedinttype':
					case 'unsignedint':
					case 'floattype':
					case 'float':
					case 'halffloattype':
					case 'halffloat':
					case 'unsignedshort4444type':
					case 'unsignedshort4444':
					case 'unsignedshort5551type':
					case 'unsignedshort5551':
					case 'unsignedshort565type':
					case 'unsignedshort565':
					case 'unsignedint248type':
					case 'unsignedint248':
					case 'unsignedbytetype':
					case 'unsignedbyte':
						textureOption.type = NgxThreeUtil.getTypeSafe(option, 'unsignedbyte');
						break;
					case 'srgbencoding':
					case 'srgb':
					case 'gammaencoding':
					case 'gamma':
					case 'rgbeencoding':
					case 'rgbe':
					case 'logluvencoding':
					case 'logluv':
					case 'rgbm7encoding':
					case 'rgbm7':
					case 'rgbm16encoding':
					case 'rgbm16':
					case 'rgbdencoding':
					case 'rgbd':
					case 'linearencoding':
						textureOption.encoding = NgxThreeUtil.getTypeSafe(option, 'linearencoding');
						break;
					case 'uvmapping':
					case 'uv':
					case 'cubereflectionmapping':
					case 'cubereflection':
					case 'cuberefractionmapping':
					case 'cuberefraction':
					case 'equirectangularreflectionmapping':
					case 'equirectangularreflection':
					case 'equirectangularrefractionmapping':
					case 'equirectangularrefraction':
					case 'cubeuvreflectionmapping':
					case 'cubeuvreflection':
					case 'cubeuvrefractionmapping':
					case 'cubeuvrefraction':
						textureOption.mapping = NgxThreeUtil.getTypeSafe(option, 'default');
						break;
					case 'image':
					case 'texture2d':
					case 'texture3d':
					case 'texture':
					case 'datatexture2d':
					case 'datatexture3d':
					case 'datatexture':
					case 'video':
					case 'videotexture':
						loadOption.type = option;
						break;
					default:
						if (option.indexOf('=') > 0) {
							const [key, value] = option.split('=');
							switch (key.toLowerCase()) {
								case 'size':
									const [width, height, depth] = (value + 'xxx').split('x');
									loadOption.width = parseInt(width);
									loadOption.height = parseInt(height) || loadOption.width;
									loadOption.depth = parseInt(depth) || loadOption.width;
									break;
								case 'width':
								case 'height':
								case 'depth':
								case 'scale':
									loadOption[key.toLowerCase()] = parseInt(value);
									break;
								case 'sigma':
								case 'near':
								case 'far':
									loadOption[key.toLowerCase()] = parseFloat(value);
									break;
								case 'loaderType':
									loadOption.type = value;
									break;
								case 'name':
								case 'filename':
									loadOption.fileName = value;
									break;
								case 'rotation':
								case 'unpackalignment':
								case 'anisotropy':
									textureOption[key.toLowerCase()] = parseFloat(value);
									break;
								case 'mapping':
								case 'wraps':
								case 'wrapt':
								case 'magfilter':
								case 'minfilter':
								case 'format':
								case 'type':
								case 'encoding':
									textureOption[key.toLowerCase()] = value;
									break;
								case 'premultiplyalpha':
								case 'generatemipmaps':
								case 'flipy':
									textureOption[key.toLowerCase()] = NgxThreeUtil.getBooleanSafe(value, false);
									break;
								case 'repeat':
								case 'offset':
									let [x, y] = (value + 'xx').split('x');
									if (y === '') {
										y = x;
									}
									textureOption[key.toLowerCase()] = NgxThreeUtil.getVector2Safe(
										parseFloat(x),
										parseFloat(y),
										null,
										null,
										true
									);
									break;
								default:
									textureOption[key] = parseFloat(value);
									break;
							}
						}
				}
			});
		}
		let texture: I3JS.Texture = null;
		if (NgxThreeUtil.isNotNull(image.getTexture)) {
			texture = image.getTexture();
			NgxThreeUtil.getSubscribe(
				image,
				() => {
					const loadedTexture = image.getTexture();
					if (loadedTexture instanceof N3JS.Texture) {
						texture.image = loadedTexture.image;
						texture.needsUpdate = true;
					}
				},
				'loaded'
			);
			NgxThreeUtil.getSubscribe(
				image,
				() => {
					texture.needsUpdate = true;
				},
				'needsupdate'
			);
		} else if (image instanceof N3JS.Texture) {
			texture = image;
		} else {
			texture = this.getTextureImage(image, cubeImage, null, loadOption, () => {
				this.setTextureOptions(texture, textureOption);
				if (NgxThreeUtil.isNotNull(onLoad)) {
					onLoad();
				}
			});
		}
		this.setTextureOptions(texture, textureOption);
		return texture;
	}

	/**
	 * Gets texture image
	 * @param image
	 * @param [cubeImage]
	 * @param [program]
	 * @param [options]
	 * @param [onLoad]
	 * @returns texture image
	 */
	public static getTextureImage(
		image: string,
		cubeImage?: string[],
		program?: TCanvasFunctionType | string,
		options?: any,
		onLoad?: () => void
	): I3JS.Texture {
		options = options || {};
		onLoad = onLoad || (() => {});
		let loaderType = (options.type || 'auto').toLowerCase();
		if (NgxThreeUtil.isNotNull(cubeImage) && cubeImage.length > 0) {
			cubeImage = NgxThreeUtil.getCubeImage(cubeImage);
			switch (loaderType || 'cubetexture') {
				case 'hdrcube':
				case 'hdrcubetexture':
					const hdrCubeMapLoader : I3JS.HDRCubeTextureLoader = NgxThreeUtil.getLoader('hdrCubeMapLoader', N3JS.HDRCubeTextureLoader);
					if (NgxThreeUtil.isNotNull(image) && image !== '') {
						hdrCubeMapLoader.setPath(NgxThreeUtil.getStoreUrl(image));
					}
					const cubeTexture = new N3JS.CubeTexture();
					hdrCubeMapLoader.load(cubeImage, (hdrCubeMap) => {
						cubeTexture.copy(hdrCubeMap);
						cubeTexture.needsUpdate = true;
						onLoad();
					});
					return cubeTexture;
				case 'rgbm':
				case 'rgbmtexture':
					const rgbmLoader : I3JS.RGBMLoader = NgxThreeUtil.getLoader('rgbmLoader', N3JS.RGBMLoader);
					if (NgxThreeUtil.isNotNull(image) && image !== '') {
						rgbmLoader.setPath(NgxThreeUtil.getStoreUrl(image));
					}
					const rgbmTexture = new N3JS.CubeTexture();
					rgbmLoader.loadCubemap(cubeImage, (rgbmCube) => {
						rgbmTexture.copy(rgbmCube);
						rgbmTexture.needsUpdate = true;
						onLoad();
					});
					return rgbmTexture;
				default:
					const cubeTextureLoader : I3JS.CubeTextureLoader = NgxThreeUtil.getLoader('cubeTextureLoader', N3JS.CubeTextureLoader);
					if (NgxThreeUtil.isNotNull(image) && image !== '') {
						cubeTextureLoader.setPath(NgxThreeUtil.getStoreUrl(image));
					}
					return cubeTextureLoader.load(cubeImage, () => {
						onLoad();
					});
			}
		} else if (NgxThreeUtil.isNotNull(image) && image !== '') {
			const fileName = image.toLowerCase();
			if (loaderType === 'auto') {
				if (
					fileName.endsWith('.webcam') ||
					fileName.endsWith('.mp4') ||
					fileName.endsWith('.m4v') ||
					fileName.endsWith('.f4v') ||
					fileName.endsWith('.mov') ||
					fileName.endsWith('.mpg') ||
					fileName.endsWith('.mpeg') ||
					fileName.endsWith('.mpeg4') ||
					fileName.endsWith('.wmv') ||
					fileName.endsWith('.avi') ||
					fileName.endsWith('.mkv') ||
					fileName.endsWith('.ogv')
				) {
					loaderType = 'video';
				}
			}
			switch ((loaderType || 'texture').toLowerCase()) {
				case 'video':
					const video = document.createElement('video');
					video.loop = true;
					video.crossOrigin = 'anonymous';
					video.playsInline = true;
					if (fileName.endsWith('.webcam')) {
						if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
							navigator.mediaDevices
								.getUserMedia({
									video: { width: 1280, height: 720, facingMode: 'user' },
								})
								.then((stream) => {
									video.srcObject = stream;
									video.play();
									window.setTimeout(() => {
										onLoad();
									}, 500);
								})
								.catch((error) => {
									console.error('Unable to access the camera/webcam.', error);
								});
						} else {
							console.error('MediaDevices interface not available.');
						}
					} else {
						video.addEventListener(
							'play',
							() => {
								window.setTimeout(() => {
									onLoad();
								}, 500);
							},
							{ passive: true }
						);
						video.src = NgxThreeUtil.getStoreUrl(image);
						video.play();
					}
					const videoTexture = new N3JS.VideoTexture(video);
					return videoTexture;
				case 'imagebitmap':
				case 'image':
				case 'texture':
				case 'texture2d':
				case 'texture3d':
				case 'datatexture':
				case 'datatexture2d':
				case 'datatexture3d':
				default:
					if (image.endsWith('.zip')) {
						const fileLoader : I3JS.FileLoader = NgxThreeUtil.getLoader('fileLoader', N3JS.FileLoader);
						fileLoader.setResponseType('arraybuffer');
						let texture: I3JS.Texture = null;
						const width = options.width || 1;
						const height = options.height || 1;
						const depth = options.depth || 1;
						switch ((loaderType || 'texture').toLowerCase()) {
							case 'datatexture2d':
							case 'texture2d':
								texture = new N3JS.DataTexture2DArray(null, width, height, depth);
								break;
							case 'datatexture3d':
							case 'texture3d':
								texture = new N3JS.DataTexture3D(null, width, height, depth);
								break;
							case 'texture':
							case 'datatexture':
							default:
								texture = new N3JS.DataTexture(null, width, height);
								break;
						}
						fileLoader.load(NgxThreeUtil.getStoreUrl(image), (data) => {
							const zip = N3JS.unzipSync(new Uint8Array(data as ArrayBuffer));
							let fileName = (options.fileName || '').toLowerCase();
							let fileObject: any = null;
							Object.entries(zip).forEach(([key, value]) => {
								if (fileObject === null || key.toLowerCase() === fileName) {
									fileObject = value;
								}
							});
							texture.image.data = new Uint8Array(fileObject.buffer);
							texture.needsUpdate = true;
							onLoad();
						});
						return texture;
					} else if (image.endsWith('.room')) {
						const pmremGenerator = NgxThreeUtil.getPmremGenerator();
						const renderTarget = pmremGenerator.fromScene(
							new N3JS.RoomEnvironment(),
							NgxThreeUtil.getTypeSafe(options.sigma, 0),
							NgxThreeUtil.getTypeSafe(options.near, 0.1),
							NgxThreeUtil.getTypeSafe(options.far, 100)
						);
						pmremGenerator.dispose();
						return renderTarget.texture;
					} else if (image.endsWith('.nrrd')) {
						const nrrdLoader : I3JS.NRRDLoader = NgxThreeUtil.getLoader('nrrdLoader', N3JS.NRRDLoader);
						const texture = new N3JS.DataTexture3D(null, 1, 1, 1);
						nrrdLoader.load(NgxThreeUtil.getStoreUrl(image), (volume) => {
							texture.image = {
								data: volume.data,
								width: volume.xLength,
								height: volume.yLength,
								depth: volume.zLength,
							};
							texture.needsUpdate = true;
							onLoad();
						});
						return texture;
					} else {
						switch ((loaderType || 'texture').toLowerCase()) {
							case 'datatexture':
							case 'datatexture2d':
							case 'datatexture3d':
								return TextureUtils.dataTexture(
									image,
									() => {
										onLoad();
									},
									options
								);
							default:
								const textureLoader : I3JS.TextureLoader = NgxThreeUtil.getLoader('textureLoader', N3JS.TextureLoader);
								const texture = textureLoader.load(NgxThreeUtil.getStoreUrl(image), () => {
									texture.needsUpdate = true;
									onLoad();
								});
								return texture;
						}
					}
			}
		} else if (NgxThreeUtil.isNotNull(options.data)) {
			const dataWidth: number = NgxThreeUtil.getTypeSafe(options.width, 32);
			const dataHeight: number = NgxThreeUtil.getTypeSafe(options.height, 32);
			const data = options.data;
			let textureData: any = null;
			if (
				data instanceof Int8Array ||
				data instanceof Uint8Array ||
				data instanceof Uint8ClampedArray ||
				data instanceof Int16Array ||
				data instanceof Uint16Array ||
				data instanceof Int32Array ||
				data instanceof Uint32Array ||
				data instanceof Float32Array ||
				data instanceof Float64Array
			) {
				textureData = data;
			} else if (Array.isArray(data)) {
				textureData = new Float32Array(data.length);
				data.forEach((value, idx) => {
					textureData[idx] = parseFloat(value);
				});
			}
			return new N3JS.DataTexture(data, dataWidth, dataHeight);
		} else if (loaderType === 'framebuffertexture' || loaderType === 'framebuffer') {
			const dataWidth: number = NgxThreeUtil.getTypeSafe(options.width, 32);
			const dataHeight: number = NgxThreeUtil.getTypeSafe(options.height, 32);
			return new N3JS.FramebufferTexture(dataWidth, dataHeight, I3JS.PixelFormat.RGBFormat);
		} else {
			const canvas: HTMLCanvasElement = document.createElement('canvas');
			const canvasWidth: number = NgxThreeUtil.getTypeSafe(options.width, 32);
			const canvasHeight: number = NgxThreeUtil.getTypeSafe(options.height, 32);
			const text: string = NgxThreeUtil.getTypeSafe(options.text, '');
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			if (NgxThreeUtil.isNotNull(program)) {
				const _context = canvas.getContext('2d', {
					alpha: true,
				});
				TextureUtils.drawCanvas(program, _context, text, canvasWidth, canvasHeight, options.programParam);
			}
			const canvasTexture = new N3JS.CanvasTexture(canvas);
			if (NgxThreeUtil.isNotNull(program) && NgxThreeUtil.isNotNull(options.programMipmaps)) {
				canvasTexture.generateMipmaps = false;
				canvasTexture.mipmaps.length = 0;
				canvasTexture.mipmaps[0] = canvas;
				let mipmapWidth = canvasWidth;
				let mipmapHeight = canvasHeight;
				const programMipmaps: any[] = options.programMipmaps;
				for (let i = 0; i < programMipmaps.length; i++) {
					mipmapWidth /= 2;
					mipmapHeight /= 2;
					if (mipmapWidth < 1 || mipmapHeight < 1) {
						break;
					}
					const mipmapCanvas: HTMLCanvasElement = document.createElement('canvas');
					mipmapCanvas.width = mipmapWidth;
					mipmapCanvas.height = mipmapHeight;
					const mipmapContext = mipmapCanvas.getContext('2d', {
						alpha: true,
					});
					TextureUtils.drawCanvas(program, mipmapContext, text, mipmapWidth, mipmapHeight, programMipmaps[i]);
					canvasTexture.mipmaps[i + 1] = mipmapCanvas;
				}
			}
			canvasTexture.needsUpdate = true;
			return canvasTexture;
		}
	}

	/**
	 * Sets texture
	 * @param refTexture
	 */
	public setTexture(refTexture: I3JS.Texture) {
		if (this.refTexture !== refTexture) {
			this.refTexture = refTexture;
			this.refTexture.copy(this.getTexture());
		}
	}

	/**
	 * Sets refer texture
	 * @param texture
	 */
	public setReferTexture(texture: any) {
		if (texture instanceof HTMLVideoElement) {
			this.texture = new N3JS.VideoTexture(texture);
		} else if (texture instanceof N3JS.Texture) {
			this.texture = texture;
		}
		if (texture !== null && this.texture !== null && this.refTexture !== null) {
			this.refTexture.copy(this.getTexture());
		}
	}

	/**
	 * Gets texture options
	 * @param [options]
	 * @returns texture options
	 */
	public getTextureOptions(options: { [key: string]: any } = {}): {
		[key: string]: any;
	} {
		if (NgxThreeUtil.isNotNull(this.mapping)) {
			options.mapping = this.mapping;
		}
		if (NgxThreeUtil.isNotNull(this.wrapS) || NgxThreeUtil.isNotNull(this.wrap)) {
			options.wrapS = NgxThreeUtil.getTypeSafe(this.wrapS, this.wrap, 'clamptoedge');
		}
		if (NgxThreeUtil.isNotNull(this.wrapT) || NgxThreeUtil.isNotNull(this.wrap)) {
			options.wrapT = NgxThreeUtil.getTypeSafe(this.wrapS, this.wrap, 'clamptoedge');
		}
		if (NgxThreeUtil.isNotNull(this.flipY)) {
			options.flipY = NgxThreeUtil.getTypeSafe(this.flipY, true);
		}
		if (NgxThreeUtil.isNotNull(this.rotation)) {
			options.rotation = this.rotation;
		}
		if (NgxThreeUtil.isNotNull(this.premultiplyAlpha)) {
			options.premultiplyAlpha = this.premultiplyAlpha;
		}
		if (NgxThreeUtil.isNotNull(this.magFilter)) {
			options.magFilter = NgxThreeUtil.getTypeSafe(this.magFilter, this.filter, 'linearmipmaplinear');
		}
		if (NgxThreeUtil.isNotNull(this.minFilter) || NgxThreeUtil.isNotNull(this.filter)) {
			options.minFilter = NgxThreeUtil.getTypeSafe(this.minFilter, this.filter, 'linearmipmaplinear');
		}
		if (NgxThreeUtil.isNotNull(this.format)) {
			options.format = this.format;
		}
		if (NgxThreeUtil.isNotNull(this.dataType)) {
			options.type = this.dataType;
		}
		if (NgxThreeUtil.isNotNull(this.anisotropy)) {
			options.anisotropy = this.anisotropy;
		}
		if (NgxThreeUtil.isNotNull(this.unpackAlignment)) {
			options.unpackAlignment = this.unpackAlignment;
		}
		if (NgxThreeUtil.isNotNull(this.generateMipmaps)) {
			options.generateMipmaps = this.generateMipmaps;
		}
		if (NgxThreeUtil.isNotNull(this.encoding)) {
			options.encoding = this.encoding;
		}
		if ((NgxThreeUtil.isNotNull(this.repeatX) && NgxThreeUtil.isNotNull(this.repeatY)) || NgxThreeUtil.isNotNull(this.repeat)) {
			options.repeat = this.getRepeat(1, 1);
		}
		if ((NgxThreeUtil.isNotNull(this.offsetX) && NgxThreeUtil.isNotNull(this.offsetY)) || NgxThreeUtil.isNotNull(this.offset)) {
			options.offset = this.getOffset(0, 0);
		}
		if ((NgxThreeUtil.isNotNull(this.centerX) && NgxThreeUtil.isNotNull(this.centerY)) || NgxThreeUtil.isNotNull(this.center)) {
			options.center = this.getCenter(0, 0);
		}
		if (this.debug) {
			this.consoleLog('texture-option', options);
		}
		return options;
	}

	/**
	 * Sets texture options
	 * @param texture
	 * @param [options]
	 * @returns texture options
	 */
	public static setTextureOptions(texture: { [key: string]: any }, options: { [key: string]: any } = {}): any {
		if (options == {}) {
			return;
		}
		Object.entries(options).forEach(([key, value]) => {
			if (NgxThreeUtil.isNotNull(value)) {
				switch (key.toLowerCase()) {
					case 'mapping':
						texture.mapping = NgxThreeUtil.getMappingSafe(value);
						break;
					case 'wraps':
						texture.wrapS = NgxThreeUtil.getWrappingSafe(value, 'clamptoedge');
						break;
					case 'wrapt':
						texture.wrapT = NgxThreeUtil.getWrappingSafe(value, 'clamptoedge');
						break;
					case 'flipy':
						texture.flipY = NgxThreeUtil.getTypeSafe(value, true);
						break;
					case 'rotation':
						texture.rotation = NgxThreeUtil.getAngleSafe(value, 0);
						break;
					case 'premultiplyalpha':
						texture.premultiplyAlpha = NgxThreeUtil.getTypeSafe(value, true);
						break;
					case 'magfilter':
						texture.magFilter = NgxThreeUtil.getTextureFilterSafe(value, 'linear');
						break;
					case 'minfilter':
						texture.minFilter = NgxThreeUtil.getTextureFilterSafe(value, 'linearmipmaplinear');
						break;
					case 'format':
						texture.format = NgxThreeUtil.getPixelFormatSafe(value, 'rgba');
						break;
					case 'type':
						texture.type = NgxThreeUtil.getTextureDataTypeSafe(value, 'unsignedbyte');
						break;
					case 'anisotropy':
						texture.anisotropy = NgxThreeUtil.getTypeSafe(value, 1);
						break;
					case 'unpackalignment':
						texture.unpackAlignment = NgxThreeUtil.getTypeSafe(value, 4);
						break;
					case 'generatemipmaps':
						texture.generateMipmaps = NgxThreeUtil.getTypeSafe(value, true);
						if (texture.generateMipmaps) {
							texture.mipmaps.length = 0;
						}
						break;
					case 'encoding':
						texture.encoding = NgxThreeUtil.getTextureEncodingSafe(value, 'linear');
						break;
					case 'repeat':
						texture.repeat.copy(value);
						break;
					case 'offset':
						texture.offset.copy(value);
						break;
					case 'center':
						texture.center.copy(value);
						break;
				}
			}
		});
		return texture;
	}

	/**
	 * Determines whether texture is
	 * @param type
	 * @returns true if texture
	 */
	public isTexture(type: String): boolean {
		type = type.toLowerCase();
		return this.type.toLowerCase() === type || (this.type + 'map').toLowerCase() === type;
	}

	/**
	 * The Material of abstract texture component
	 */
	private _material: {
		[key: string]: {
			refType: string;
			materials: (I3JS.Material | I3JS.WebGLRenderTarget | I3JS.Scene | { [uniform: string]: I3JS.IUniform })[];
		};
	} = {};

	/**
	 * unSets object3d
	 * @param object3d
	 */
	public unsetMaterial(material: NgxAbstractSubscribeComponent) {
		const key: string = material.getId();
		this.unSubscribeRefer('texture_' + key);
		this.unSubscribeRefer('untexture_' + key);
		if (NgxThreeUtil.isNotNull(this._material[key])) {
			delete this._material[key];
		}
	}

	/**
	 * Sets material
	 * @param material
	 */
	public setMaterial(material: NgxAbstractSubscribeComponent, refType: string = 'auto') {
		if (NgxThreeUtil.isNotNull(material)) {
			const key: string = material.getId();
			let object = material.getObject();
			let objectList: any[] = [];
			if (NgxThreeUtil.isNotNull(object)) {
				if (NgxThreeUtil.isNotNull(this.refName) && object instanceof N3JS.Object3D) {
					const object3d: I3JS.Object3D = object;
					if (this.refName === '*') {
						object3d.traverse((child: any) => {
							if (NgxThreeUtil.isNotNull(child['material'])) {
								objectList.push(child);
							}
						});
					} else if (Array.isArray(this.refName)) {
						this.refName.forEach((refName) => {
							const foundObj = object3d.getObjectByName(refName);
							if (NgxThreeUtil.isNotNull(foundObj)) {
								objectList.push(foundObj);
							}
						});
					} else {
						const foundObj = object3d.getObjectByName(this.refName);
						if (NgxThreeUtil.isNotNull(foundObj)) {
							objectList.push(foundObj);
						}
					}
				} else {
					objectList.push(object);
				}
			}
			let materials: (I3JS.Material | I3JS.Scene | I3JS.WebGLRenderTarget | { [uniform: string]: I3JS.IUniform })[] = [];
			if (objectList.length > 0) {
				objectList.forEach((object) => {
					if (object instanceof N3JS.Scene) {
						materials.push(object);
					} else if (object instanceof N3JS.Material) {
						if (object instanceof N3JS.ShaderMaterial) {
							if (object instanceof N3JS.NodeMaterial) {
								materials.push(object);
							} else {
								materials.push(object.uniforms);
							}
						} else {
							materials.push(object);
						}
					} else if (object instanceof N3JS.ShaderPass) {
						materials.push(object.material.uniforms);
					} else if (object instanceof N3JS.EffectComposer) {
						materials.push(object.renderTarget1);
					}
				});
			}
			this._material[key] = {
				refType: refType,
				materials: materials,
			};
			this.subscribeRefer(
				'texture_' + key,
				NgxThreeUtil.getSubscribe(
					material,
					() => {
						this.setMaterial(material);
					},
					'loaded'
				)
			);
			this.subscribeRefer(
				'untexture_' + key,
				NgxThreeUtil.getSubscribe(
					material,
					() => {
						this.unsetMaterial(material);
					},
					'destroy'
				)
			);
			this.getTexture();
			this.synkMaterial(this.texture, key);
		}
	}

	/**
	 * Synks object3d
	 * @param [geometry]
	 */
	synkMaterial(texture: I3JS.Texture = null, key: string = null) {
		if (NgxThreeUtil.isNotNull(texture) && this.enabled) {
			if (NgxThreeUtil.isNotNull(this._material)) {
				const materialList: {
					refType: string;
					materials: (I3JS.Material | I3JS.WebGLRenderTarget | I3JS.Scene | { [uniform: string]: I3JS.IUniform })[];
				}[] = [];
				if (NgxThreeUtil.isNotNull(key)) {
					if (
						NgxThreeUtil.isNotNull(this._material[key]) &&
						NgxThreeUtil.isNotNull(this._material[key]) &&
						this._material[key].materials.length > 0
					) {
						materialList.push(this._material[key]);
					}
				} else {
					Object.entries(this._material).forEach(([_, material]) => {
						if (NgxThreeUtil.isNotNull(material) && material.materials.length > 0) {
							materialList.push(material);
						}
					});
				}
				materialList.forEach((info) => {
					let textureType = info.refType;
					if (textureType === 'auto' || textureType === 'texture' || textureType === '') {
						textureType = this.type;
					}
					info.materials.forEach((material) => {
						if (material instanceof N3JS.Material) {
							switch (textureType.toLowerCase()) {
								case 'matcap':
									this.applyTexture2Material(material, 'matcap', texture);
									break;
								case 'env':
								case 'envmap':
									this.applyTexture2Material(material, 'envMap', texture);
									break;
								case 'specular':
								case 'specularmap':
									this.applyTexture2Material(material, 'specularMap', texture);
									break;
								case 'alpha':
								case 'alphamap':
									this.applyTexture2Material(material, 'alphaMap', texture);
									break;
								case 'emissive':
								case 'emissivemap':
									this.applyTexture2Material(material, 'emissiveMap', texture);
									break;
								case 'bump':
								case 'bumpmap':
									this.applyTexture2Material(material, 'bumpMap', texture);
									break;
								case 'normal':
								case 'normalmap':
									this.applyTexture2Material(material, 'normalMap', texture);
									break;
								case 'ao':
								case 'aomap':
									this.applyTexture2Material(material, 'aoMap', texture);
									break;
								case 'displace':
								case 'displacement':
								case 'displacementmap':
									this.applyTexture2Material(material, 'displacementMap', texture);
									break;
								case 'clearcoatnormal':
								case 'clearcoatnormalmap':
									this.applyTexture2Material(material, 'clearcoatNormalMap', texture);
									break;
								case 'metalness':
								case 'metalnessmap':
									this.applyTexture2Material(material, 'metalnessMap', texture);
									break;
								case 'roughness':
								case 'roughnessmap':
									this.applyTexture2Material(material, 'roughnessMap', texture);
									break;
								case 'light':
								case 'lightmap':
									this.applyTexture2Material(material, 'lightMap', texture);
									break;
								case 'gradient':
								case 'gradientmap':
									this.applyTexture2Material(material, 'gradientMap', texture);
									break;
								case 'map':
									this.applyTexture2Material(material, 'map', texture);
									break;
								default:
									this.applyTexture2Material(material, this.type, texture);
									break;
							}
							material.needsUpdate = true;
						} else if (material instanceof N3JS.Scene) {
							switch (textureType.toLowerCase()) {
								case 'environmentbackground':
								case 'environment-background':
								case 'background-environment':
								case 'backgroundenvironment':
									material.environment = texture;
									material.background = texture;
									break;
								case 'environment':
									material.environment = texture;
									break;
								case 'background':
								default:
									material.background = texture;
									break;
							}
						} else if (material instanceof N3JS.WebGLRenderTarget) {
							material.setTexture(texture);
						} else if (typeof material === 'object') {
							const textureTypeInfo = (textureType + '..').split('.');
							const materialUniform: { [key: string]: I3JS.IUniform } = material;
							switch (textureTypeInfo[0].toLowerCase()) {
								case 'uniforms':
									const uniformKey = textureTypeInfo[1];
									const uniformSeqn = parseInt(textureTypeInfo[2] || '-1');
									if (uniformSeqn > -1) {
										if (!Array.isArray(materialUniform[uniformKey].value)) {
											materialUniform[uniformKey].value = [];
										}
										materialUniform[uniformKey].value[uniformSeqn] = texture;
									} else {
										materialUniform[uniformKey].value = texture;
									}
									break;
							}
						}
					});
				});
			} else if (this.texture !== texture) {
				this.texture = texture;
			}
		}
	}

	/**
	 * Applys texture2 material
	 * @param material
	 * @param key
	 * @param texture
	 */
	protected applyTexture2Material(material: I3JS.Material, key: string, texture: I3JS.Texture): void {
		const materialAny: any = material;
		if (material instanceof N3JS.NodeMaterial) {
			switch (key) {
				case 'diffuseMap':
					if (materialAny['color'] instanceof N3JS.OperatorNode) {
						const color: I3JS.OperatorNode = materialAny['color'];
						if (color.a instanceof N3JS.TextureNode) {
							color.a.value = texture;
						}
					}
					break;
				case 'normalMap':
					if (materialAny['normal'] instanceof N3JS.NormalMapNode) {
						const normal: I3JS.NormalMapNode = materialAny['normal'];
						if (normal.value instanceof N3JS.TextureNode) {
							normal.value.value = texture;
						} else {
							normal.value = new N3JS.TextureNode(texture);
						}
					} else {
						materialAny['normal'] = new N3JS.NormalMapNode(new N3JS.TextureNode(texture));
					}
					break;
				default:
					if (materialAny[key] instanceof N3JS.TextureNode) {
						materialAny[key].value = texture;
					} else {
						materialAny[key] = new N3JS.TextureNode(texture);
					}
					break;
			}
		} else if (materialAny[key] !== undefined) {
			materialAny[key] = texture;
		}
	}

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
			NgxAbstractTextureComponent.setTextureOptions(this.texture, this.getTextureOptions());
			if (NgxThreeUtil.isTextureLoaded(this.texture)) {
				this.texture.needsUpdate = true;
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * Sets texture loaded
	 * @param texture
	 */
	protected setTextureLoaded(texture: I3JS.Texture) {
		if (texture !== null) {
			if (NgxThreeUtil.isNotNull(this.cubeType)) {
				switch (this.cubeType.toLowerCase()) {
					case 'angular':
					case 'equirect':
					case 'equirectangular':
					case 'fromequirectangular':
						{
							NgxAbstractTextureComponent.setTextureOptions(texture, this.getTextureOptions());
							const pmremGenerator = NgxThreeUtil.getPmremGenerator();
							const equirectangular = pmremGenerator.fromEquirectangular(texture).texture;
							pmremGenerator.dispose();
							texture.dispose();
							texture = equirectangular;
						}
						break;
					case 'cube':
					case 'cubemap':
					case 'fromcubemap':
						if (texture instanceof N3JS.CubeTexture) {
							NgxAbstractTextureComponent.setTextureOptions(texture, this.getTextureOptions());
							const pmremGenerator = NgxThreeUtil.getPmremGenerator();
							const cubemap = pmremGenerator.fromCubemap(texture).texture;
							texture.dispose();
							pmremGenerator.dispose();
							texture = cubemap;
						}
						break;
				}
			}
			if (this.texture !== texture && texture.image !== null) {
				this.texture = texture;
				super.setObject(this.texture);
			}
			NgxAbstractTextureComponent.setTextureOptions(this.texture, this.getTextureOptions());
			this.synkMaterial(this.texture);
			if (NgxThreeUtil.isTextureLoaded(this.texture)) {
				this.texture.needsUpdate = true;
			}
			this.setSubscribeNext(['texture', 'loaded']);
		}
	}

	/**
	 * Gets texture
	 * @template T
	 * @returns texture
	 */
	public getTexture<T extends I3JS.Texture>(): T {
		return this.texture as T;
	}
}
