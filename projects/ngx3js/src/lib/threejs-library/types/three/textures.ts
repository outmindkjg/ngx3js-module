import {
	CompressedPixelFormat,
	Mapping,
	PixelFormat,
	PixelFormatGPU,
	TextureDataType,
	TextureEncoding,
	TextureFilter,
	Wrapping,
} from './constants';
import { EventDispatcher } from './core';
import { Matrix3, Vector2 } from './math';

/**
 * Creates a texture from a canvas element.
 * This is almost the same as the base [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) class, except that it sets [needsUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.needsUpdate) to *true* immediately.
 */
export interface CanvasTexture extends Texture {
	/**
	 * @param canvas The HTML canvas element from which to load the texture.
	 * @param mapping How the image is applied to the object. An object type of [THREE.UVMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [mapping constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param wrapS The default is [THREE.ClampToEdgeWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [wrap mode constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param wrapT The default is [THREE.ClampToEdgeWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [wrap mode constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param magFilter How the texture is sampled when a texel covers more than one pixel.
	 * The default is [THREE.LinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures). See [magnification filter constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param minFilter How the texture is sampled when a texel covers less than one pixel.
	 * The default is [THREE.LinearMipmapLinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures). See [minification filter constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param format The format used in the texture.
	 * See [format constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param type Default is [THREE.UnsignedByteType](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [type constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param anisotropy The number of samples taken along the axis through the pixel that has the highest density of texels. By default, this value is 1. A higher value gives a less blurry result than a basic mipmap, at the cost of more texture samples being used. Use [renderer.getMaxAnisotropy](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLrenderer.getMaxAnisotropy)() to find the maximum valid anisotropy value for the GPU; this value is usually a power of 2.
	 */
	new (
		canvas: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
		mapping?: Mapping,
		wrapS?: Wrapping,
		wrapT?: Wrapping,
		magFilter?: TextureFilter,
		minFilter?: TextureFilter,
		format?: PixelFormat,
		type?: TextureDataType,
		anisotropy?: number
	): this;

	readonly isCanvasTexture: true;
}

/**
 * Creates a texture based on data in compressed form, for example from a [DDS](https://en.wikipedia.org/wiki/DirectDraw_Surface) file.
 * For use with the [CompressedTextureLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CompressedTextureLoader).
 */
export interface CompressedTexture extends Texture {
	/**
	 * @param mipmaps The mipmaps array should contain objects with data, width and height. The mipmaps should be of the correct format and type.
	 * @param width The width of the biggest mipmap.
	 * @param height The height of the biggest mipmap.
	 * @param format The format used in the mipmaps.
	 * See [ST3C Compressed Texture Formats](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures),
	 * [PVRTC Compressed Texture Formats](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) and [ETC Compressed Texture Format](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param type Default is [THREE.UnsignedByteType](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [type constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param mapping How the image is applied to the object. An object type of [THREE.UVMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [mapping constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param wrapS The default is [THREE.ClampToEdgeWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [wrap mode constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param wrapT The default is [THREE.ClampToEdgeWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [wrap mode constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param magFilter How the texture is sampled when a texel covers more than one pixel.
	 * The default is [THREE.LinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures). See [magnification filter constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param minFilter How the texture is sampled when a texel covers less than one pixel.
	 * The default is [THREE.LinearMipmapLinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures). See [minification filter constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param anisotropy The number of samples taken along the axis through the pixel that has the highest density of texels.
	 * By default, this value is 1. A higher value gives a less blurry result than a basic mipmap, at the cost of more texture samples being used.
	 * Use renderer.getMaxAnisotropy() to find the maximum valid anisotropy value for the GPU; this value is usually a power of 2.
	 */
	new (
		mipmaps: ImageData[],
		width: number,
		height: number,
		format?: CompressedPixelFormat,
		type?: TextureDataType,
		mapping?: Mapping,
		wrapS?: Wrapping,
		wrapT?: Wrapping,
		magFilter?: TextureFilter,
		minFilter?: TextureFilter,
		anisotropy?: number,
		encoding?: TextureEncoding
	): this;

	image: { width: number; height: number };

	/**
	 * Array of user-specified mipmaps (optional).
	 */
	mipmaps: ImageData[];

	/**
	 * False by default. Flipping textures does not work for compressed textures.
	 * @default false
	 */
	flipY: boolean;

	/**
	 * False by default. Mipmaps can't be generated for compressed textures <h2>Methods</h2>
	 * See the base [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) class for common methods.
	 * @default false
	 */
	generateMipmaps: boolean;

	readonly isCompressedTexture: true;
}

/**
 * Creates a cube texture made up of six images.
 *
 * ### Code Example
 * ```js
 * const loader = new THREE.CubeTextureLoader();
 * loader.setPath( 'textures/cube/pisa/' );
 * const textureCube = loader.load( [
 *  'px.png', 'nx.png',
 *  'py.png', 'ny.png',
 *  'pz.png', 'nz.png' ]
 * );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
 * ```
 */
export interface CubeTexture extends Texture {
	/**
	 * @param [images=[]]
	 * @param [mapping=THREE.CubeReflectionMapping]
	 * @param [wrapS=THREE.ClampToEdgeWrapping]
	 * @param [wrapT=THREE.ClampToEdgeWrapping]
	 * @param [magFilter=THREE.LinearFilter]
	 * @param [minFilter=THREE.LinearMipmapLinearFilter]
	 * @param [format=THREE.RGBFormat]
	 * @param [type=THREE.UnsignedByteType]
	 * @param [anisotropy=1]
	 * @param [encoding=THREE.LinearEncoding]
	 */
	new (
		images?: any[], // HTMLImageElement or HTMLCanvasElement
		mapping?: Mapping,
		wrapS?: Wrapping,
		wrapT?: Wrapping,
		magFilter?: TextureFilter,
		minFilter?: TextureFilter,
		format?: PixelFormat,
		type?: TextureDataType,
		anisotropy?: number,
		encoding?: TextureEncoding
	): this;

	images: any; // returns and sets the value of Texture.image in the codde ?

	/**
	 * False by default. Flipping textures does not work for compressed textures.
	 * @default false
	 */
	flipY: boolean;

	readonly isCubeTexture: true;
}

/**
 * Creates a texture directly from raw data, width and height.
 *
 * ### Code Example
 * ```js
 * // create a buffer with color data
 * const width = 512;
 * const height = 512;
 * const size = width * height;
 * const data = new Uint8Array( 3 * size );
 * const color = new THREE.Color( 0xffffff );
 * const r = Math.floor( color.r * 255 );
 * const g = Math.floor( color.g * 255 );
 * const b = Math.floor( color.b * 255 );
 * for ( let i = 0; i < size; i ++ ) {
 * 	const stride = i * 3;
 * 	data[ stride ] = r;
 * 	data[ stride + 1 ] = g;
 * 	data[ stride + 2 ] = b;
 * }
 * // used the buffer to create a DataTexture
 * const texture = new THREE.DataTexture( data, width, height, THREE.RGBFormat );
 * texture.needsUpdate = true;
 * ```
 */
export interface DataTexture extends Texture {
	/**
	 * The data argument must be an [ArrayBufferView](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView).
	 * Further parameters correspond to the properties inherited from [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture), where both magFilter and minFilter default to THREE.NearestFilter. The properties flipY and generateMipmaps are initially set to false.
	 * The interpretation of the data depends on type and format:
	 * If the type is THREE.UnsignedByteType, a Uint8Array will be useful for addressing the texel data.
	 * If the format is THREE.RGBAFormat, data needs four values for one texel; Red, Green, Blue and Alpha (typically the opacity). Similarly, THREE.RGBFormat specifies a format where only three values are used for each texel.
	 * For the packed types, THREE.UnsignedShort4444Type, THREE.UnsignedShort5551Type or THREE.UnsignedShort565Type, all color components of one texel can be addressed as bitfields within an integer element of a Uint16Array.
	 * In order to use the types THREE.FloatType and THREE.HalfFloatType, the WebGL implementation must support the respective extensions OES_texture_float and OES_texture_half_float. In order to use THREE.LinearFilter for component-wise, bilinear interpolation of the texels based on these types, the WebGL extensions OES_texture_float_linear or OES_texture_half_float_linear must also be present.
	 */
	new (
		data?: BufferSource | null,
		width?: number,
		height?: number,
		format?: PixelFormat,
		type?: TextureDataType,
		mapping?: Mapping,
		wrapS?: Wrapping,
		wrapT?: Wrapping,
		magFilter?: TextureFilter,
		minFilter?: TextureFilter,
		anisotropy?: number,
		encoding?: TextureEncoding
	): this;

	/**
	 * Overridden with a record type holding data, width and height.
	 */
	image: ImageData;

	/**
	 * False by default. Flipping textures does not work for compressed textures.
	 * @default false
	 */
	flipY: boolean;

	/**
	 * False by default. Mipmaps can't be generated for compressed textures <h2>Methods</h2>
	 * See the base [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) class for common methods.
	 * @default false
	 */
	generateMipmaps: boolean;

	/**
	 * 4 by default. Specifies the alignment requirements for the start of each pixel row in memory.
	 * The allowable values are 1 (byte-alignment), 2 (rows aligned to even-numbered bytes),
	 * 4 (word-alignment), and 8 (rows start on double-word boundaries).
	 * See [glPixelStorei](http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml) for more information.
	 * @default 1
	 */
	unpackAlignment: number;

	/**
	 * @default THREE.DepthFormat
	 */
	format: PixelFormat;

	readonly isDataTexture: true;
}

/**
 * Creates an array of textures directly from raw data, width and height and depth. This type of texture can only be used with a WebGL 2 rendering context.
 *
 * The data argument must be an [ArrayBufferView](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView).
 * The properties inherited from [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) are the default, except magFilter and minFilter default to THREE.NearestFilter. The properties flipY and generateMipmaps are initially set to false.
 * The interpretation of the data depends on type and format:
 * If the type is THREE.UnsignedByteType, a Uint8Array will be useful for addressing the texel data.
 * If the format is THREE.RGBAFormat, data needs four values for one texel; Red, Green, Blue and Alpha (typically the opacity). Similarly, THREE.RGBFormat specifies a format where only three values are used for each texel.
 * For the packed types, THREE.UnsignedShort4444Type, THREE.UnsignedShort5551Type or THREE.UnsignedShort565Type, all color components of one texel can be addressed as bitfields within an integer element of a Uint16Array.
 * In order to use the types THREE.FloatType and THREE.HalfFloatType, the WebGL implementation must support the respective extensions OES_texture_float and OES_texture_half_float. In order to use THREE.LinearFilter for component-wise, bilinear interpolation of the texels based on these types, the WebGL extensions OES_texture_float_linear or OES_texture_half_float_linear must also be present.
 *
 * ### Examples
 * [WebGL2 / materials / texture2darray](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl2_materials_texture2darray)
 * 
 * ### Code Example
 * ```js
 * This creates a DataTexture2DArray where each texture has a different color.
 * // create a buffer with color data
 * const width = 512;
 * const height = 512;
 * const depth = 100;
 * const size = width * height;
 * const data = new Uint8Array( 3 * size * depth );
 * for ( let i = 0; i < depth; i ++ ) {
 * 	const color = new THREE.Color( Math.random(), Math.random(), Math.random() );
 * 	const r = Math.floor( color.r * 255 );
 * 	const g = Math.floor( color.g * 255 );
 * 	const b = Math.floor( color.b * 255 );
 * 	for ( let j = 0; j < size; j ++ ) {
 * 		const stride = ( i * size + j ) * 3;
 * 		data[ stride ] = r;
 * 		data[ stride + 1 ] = g;
 * 		data[ stride + 2 ] = b;
 * 	}
 * }
 * // used the buffer to create a DataTexture2DArray
 * const texture = new THREE.DataTexture2DArray( data, width, height, depth );
 * texture.format = THREE.RGBFormat;
 * texture.needsUpdate = true;
 * ```
 */
export interface DataTexture2DArray extends Texture {
	new (data?: BufferSource, width?: number, height?: number, depth?: number): this;

	/**
	 * How the texture is sampled when a texel covers more than one pixel. The default is  [THREE.LinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), which takes the four closest texels and bilinearly interpolates among them.
	 * The other option is [THREE.NearestFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), which uses the value of the closest texel.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) page for details.
	 * @default THREE.NearestFilter
	 */
	magFilter: TextureFilter;

	/**
	 * How the texture is sampled when a texel covers less than one pixel. The default is [THREE.LinearMipmapLinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), which uses mipmapping and a trilinear filter.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) page for all possible choices.
	 * @default THREE.NearestFilter
	 */
	minFilter: TextureFilter;

	/**
	 * @default THREE.ClampToEdgeWrapping
	 */
	wrapR: boolean;

	/**
	 * False by default. Flipping textures does not work for compressed textures.
	 * @default false
	 */
	flipY: boolean;

	/**
	 * False by default. Mipmaps can't be generated for compressed textures <h2>Methods</h2>
	 * See the base [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) class for common methods.
	 * @default false
	 */
	generateMipmaps: boolean;

	readonly isDataTexture2DArray: true;
}

/**
 * Creates a three-dimensional texture. This type of texture can only be used with a WebGL 2 rendering context.
 *
 * ### Examples
 * [WebGL2 / materials / texture3d](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl2_materials_texture3d)
 */
export interface DataTexture3D extends Texture {
	/**
	 * @param dat A data of the texture.
	 * @param width width of the texture.
	 * @param height height of the texture.
	 * @param depth depth of the texture.
	 */
	new (data: BufferSource, width: number, height: number, depth: number): this;

	/**
	 * How the texture is sampled when a texel covers more than one pixel. The default is  [THREE.LinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), which takes the four closest texels and bilinearly interpolates among them.
	 * The other option is [THREE.NearestFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), which uses the value of the closest texel.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) page for details.
	 * @default THREE.NearestFilter
	 */
	magFilter: TextureFilter;

	/**
	 * How the texture is sampled when a texel covers less than one pixel. The default is [THREE.LinearMipmapLinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), which uses mipmapping and a trilinear filter.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) page for all possible choices.
	 * @default THREE.NearestFilter
	 */
	minFilter: TextureFilter;

	/**
	 * This defines how the texture is wrapped in the depth direction.
	 * The default is [THREE.ClampToEdgeWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), where the edge is clamped to the outer edge texels.
	 * The other two choices are [THREE.RepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) and [THREE.MirroredRepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) page for details.
	 * @default THREE.ClampToEdgeWrapping
	 */
	wrapR: boolean;

	/**
	 * False by default. Flipping textures does not work for compressed textures.
	 * @default false
	 */
	flipY: boolean;

	/**
	 * False by default. Mipmaps can't be generated for compressed textures <h2>Methods</h2>
	 * See the base [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) class for common methods.
	 * @default false
	 */
	generateMipmaps: boolean;

	readonly isDataTexture3D: true;
}

/**
 * This class can be used to automatically save the depth information of a rendering into a texture.
 * When using a WebGL 1 rendering context, DepthTexture requires support for the [WEBGL_depth_texture](https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/) extension.
 *
 * ### Examples
 * [depth / texture](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_depth_texture)
 */
export interface DepthTexture extends Texture {
	/**
	 * @param width width of the texture.
	 * @param height height of the texture.
	 * @param type Default is [THREE.UnsignedShortType](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) when unsing [DepthFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) and [THREE.UnsignedInt248Type](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) when using  [DepthStencilFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [type constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param mapping 
	 * See [mapping mode constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for details.
	 * @param wrapS The default is [THREE.ClampToEdgeWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [wrap mode constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param wrapT The default is [THREE.ClampToEdgeWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [wrap mode constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param magFilter How the texture is sampled when a texel covers more than one pixel.
	 * The default is [THREE.NearestFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures). See [magnification filter constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param minFilter How the texture is sampled when a texel covers less than one pixel.
	 * The default is [THREE.NearestFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures). See [minification filter constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param anisotropy The number of samples taken along the axis through the pixel that has the highest density of texels.
	 * By default, this value is 1. A higher value gives a less blurry result than a basic mipmap, at the cost of more texture samples being used.
	 * Use [renderer.getMaxAnisotropy](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLrenderer.getMaxAnisotropy)() to find the maximum valid anisotropy value for the GPU; this value is usually a power of 2.
	 * @param format must be either [DepthFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) (default) or [DepthStencilFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [format constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for details.
	 */
	new (
		width: number,
		height: number,
		type?: TextureDataType,
		mapping?: Mapping,
		wrapS?: Wrapping,
		wrapT?: Wrapping,
		magFilter?: TextureFilter,
		minFilter?: TextureFilter,
		anisotropy?: number
	): this;

	image: { width: number; height: number };

	/**
	 * False by default. Flipping textures does not work for compressed textures.
	 * @default false
	 */
	flipY: boolean;

	/**
	 * False by default. Mipmaps can't be generated for compressed textures <h2>Methods</h2>
	 * See the base [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) class for common methods.
	 * @default false
	 */
	generateMipmaps: boolean;

	readonly isDepthTexture: true;
}

/**
 * Create a texture to apply to a surface or as a reflection or refraction map.
 * Note: After the initial use of a texture, its dimensions, format, and type cannot be changed. Instead, call *.dispose*() on the texture and instantiate a new one.
 *
 * ### Code Example
 * ```js
 * // load a texture, set wrap mode to repeat
 * const texture = new THREE.TextureLoader().load( "textures/water.jpg" );
 * texture.wrapS = THREE.RepeatWrapping;
 * texture.wrapT = THREE.RepeatWrapping;
 * texture.repeat.set( 4, 4 );
 * ```
 */
export interface Texture extends EventDispatcher {
	/**
	 * @param image
	 * @param [mapping=THREE.Texture.DEFAULT_MAPPING]
	 * @param [wrapS=THREE.ClampToEdgeWrapping]
	 * @param [wrapT=THREE.ClampToEdgeWrapping]
	 * @param [magFilter=THREE.LinearFilter]
	 * @param [minFilter=THREE.LinearMipmapLinearFilter]
	 * @param [format=THREE.RGBAFormat]
	 * @param [type=THREE.UnsignedByteType]
	 * @param [anisotropy=1]
	 * @param [encoding=THREE.LinearEncoding]
	 */
	new (
		image?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
		mapping?: Mapping,
		wrapS?: Wrapping,
		wrapT?: Wrapping,
		magFilter?: TextureFilter,
		minFilter?: TextureFilter,
		format?: PixelFormat,
		type?: TextureDataType,
		anisotropy?: number,
		encoding?: TextureEncoding
	): this;

	/**
	 * @param Readonly unique number for this texture instance.
	 */
	id: number;

	/**
	 * [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier) of this object instance.
	 * This gets automatically assigned, so this shouldn't be edited.
	 */
	uuid: string;

	/**
	 * Optional name of the object (doesn't need to be unique). Default is an empty string.
	 * @default ''
	 */
	name: string;

	sourceFile: string;

	/**
	 * @default THREE.Texture.DEFAULT_IMAGE
	 */
	image: any; // HTMLImageElement or ImageData or { width: number, height: number } in some children;

	/**
	 * Array of user-specified mipmaps (optional).
	 * @default []
	 */
	mipmaps: any[]; // ImageData[] for 2D textures and CubeTexture[] for cube textures;

	/**
	 * How the image is applied to the object. An object type of [THREE.UVMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) is the default, where the U,V coordinates are used to apply the map.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) page for other mapping types.
	 * @default THREE.Texture.DEFAULT_MAPPING
	 */
	mapping: Mapping;

	/**
	 * This defines how the texture is wrapped horizontally and corresponds to *U* in UV mapping.
	 * The default is [THREE.ClampToEdgeWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), where the edge is clamped to the outer edge texels.
	 * The other two choices are [THREE.RepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) and [THREE.MirroredRepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) page for details.
	 * @default THREE.ClampToEdgeWrapping
	 */
	wrapS: Wrapping;

	/**
	 * This defines how the texture is wrapped vertically and corresponds to *V* in UV mapping.
	 * The same choices are available as for [property:number wrapS].
	 * NOTE: tiling of images in textures only functions if image dimensions are powers of two  (2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, ...) in terms of pixels.
	 * Individual dimensions need not be equal, but each must be a power of two.
	 * This is a limitation of WebGL, not three.js.
	 * @default THREE.ClampToEdgeWrapping
	 */
	wrapT: Wrapping;

	/**
	 * How the texture is sampled when a texel covers more than one pixel. The default is  [THREE.LinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), which takes the four closest texels and bilinearly interpolates among them.
	 * The other option is [THREE.NearestFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), which uses the value of the closest texel.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) page for details.
	 * @default THREE.LinearFilter
	 */
	magFilter: TextureFilter;

	/**
	 * How the texture is sampled when a texel covers less than one pixel. The default is [THREE.LinearMipmapLinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), which uses mipmapping and a trilinear filter.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) page for all possible choices.
	 * @default THREE.LinearMipmapLinearFilter
	 */
	minFilter: TextureFilter;

	/**
	 * The number of samples taken along the axis through the pixel that has the highest density of texels.
	 * By default, this value is 1. A higher value gives a less blurry result than a basic mipmap, at the cost of more texture samples being used. Use [renderer.getMaxAnisotropy](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.getMaxAnisotropy)() to find the maximum valid anisotropy value for the GPU; this value is usually a power of 2.
	 * @default 1
	 */
	anisotropy: number;

	/**
	 * The default is [THREE.RGBAFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), although the [TextureLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TextureLoader) will automatically set this to [THREE.RGBFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for JPG images.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) page for details of other formats.
	 * @default THREE.RGBAFormat
	 */
	format: PixelFormat;

	/**
	 * The default value is obtained using a combination of [.format](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.format) and [.type](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.type).
	 * The GPU format allows the developer to specify how the data is going to be stored on the GPU.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) page for details regarding all supported internal formats.
	 */
	internalFormat: PixelFormatGPU | null;

	/**
	 * This must correspond to the [.format](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.format). The default is [THREE.UnsignedByteType](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), which will be used for most texture formats.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) page for details of other formats.
	 * @default THREE.UnsignedByteType
	 */
	type: TextureDataType;

	/**
	 * The uv-transform matrix for the texture. Updated by the renderer from the texture properties [.offset](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.offset), [.repeat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.repeat),
	 * [.rotation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.rotation), and [.center](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.center) when the texture's [.matrixAutoUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.matrixAutoUpdate) property is true.
	 * When [.matrixAutoUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.matrixAutoUpdate) property is false, this matrix may be set manually.
	 * Default is the identity matrix.
	 * @default new THREE.Matrix3()
	 */
	matrix: Matrix3;

	/**
	 * Whether to update the texture's uv-transform [.matrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.matrix) from the texture properties [.offset](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.offset), [.repeat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.repeat),
	 * [.rotation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.rotation), and [.center](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.center). True by default.
	 * Set this to false if you are specifying the uv-transform matrix directly.
	 * @default true
	 */
	matrixAutoUpdate: boolean;

	/**
	 * How much a single repetition of the texture is offset from the beginning, in each direction U and V.
	 * Typical range is *0.0* to *1.0*.
	 * The below texture types share the *first* uv channel in the engine. The offset (and repeat) setting is evaluated according to the following priorities and then shared by those textures:
	 * @default new THREE.Vector2( 0, 0 )
	 */
	offset: Vector2;

	/**
	 * How many times the texture is repeated across the surface, in each direction U and V.  If repeat is set greater than 1 in either direction, the corresponding Wrap parameter should also be set to [THREE.RepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) or [THREE.MirroredRepeatWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) to achieve the desired tiling effect. Setting different repeat values for textures is restricted in the same way like *.offset*.
	 * @default new THREE.Vector2( 1, 1 )
	 */
	repeat: Vector2;

	/**
	 * The point around which rotation occurs. A value of (0.5, 0.5) corresponds to the center of the texture. Default is (0, 0), the lower left.
	 * @default new THREE.Vector2( 0, 0 )
	 */
	center: Vector2;

	/**
	 * How much the texture is rotated around the center point, in radians. Positive values are counter-clockwise. Default is *0*.
	 * @default 0
	 */
	rotation: number;

	/**
	 * False by default. Mipmaps can't be generated for compressed textures <h2>Methods</h2>
	 * See the base [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) class for common methods.
	 * @default true
	 */
	generateMipmaps: boolean;

	/**
	 * If set to *true*, the alpha channel, if present, is multiplied into the color channels when the texture is uploaded to the GPU. Default is *false*.
	 * Note that this property has no effect for [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap).
	 * You need to configure on bitmap creation instead. See [ImageBitmapLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ImageBitmapLoader).
	 * @default false
	 */
	premultiplyAlpha: boolean;

	/**
	 * False by default. Flipping textures does not work for compressed textures.
	 * @default true
	 */
	flipY: boolean;

	/**
	 * 4 by default. Specifies the alignment requirements for the start of each pixel row in memory.
	 * The allowable values are 1 (byte-alignment), 2 (rows aligned to even-numbered bytes),
	 * 4 (word-alignment), and 8 (rows start on double-word boundaries).
	 * See [glPixelStorei](http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml) for more information.
	 * @default 4
	 */
	unpackAlignment: number;

	/**
	 * THREE.LinearEncoding THREE.sRGBEncoding THREE.GammaEncoding THREE.RGBEEncoding THREE.RGBDEncoding THREE.BasicDepthPacking THREE.RGBADepthPacking
	 * For use with a Texture's [encoding](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.encoding)	property.
	 * If the encoding type is changed after the texture has already been used by a material, you will need to set [Material.needsUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material.needsUpdate) to *true* to make the material recompile.
	 * [LinearEncoding](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant) is the default.
	 * Values other than this are only valid for a material's map, envMap and emissiveMap.
	 * @default THREE.LinearEncoding
	 */
	encoding: TextureEncoding;

	/**
	 * @default false
	 */
	isRenderTargetTexture: boolean;

	/**
	 * An object that can be used to store custom data about the Material. It should not hold references to functions as these will not be cloned.
	 * @default {}
	 */
	userData: any;

	/**
	 * @default 0
	 */
	version: number;

	/**
	 *
	 */
	needsUpdate: boolean;

	readonly isTexture: true;

	/**
	 *
	 */
	onUpdate: () => void;
	DEFAULT_IMAGE: any;
	DEFAULT_MAPPING: any;

	/**
	 * Make copy of the texture. Note this is not a "deep copy", the image is shared.
	 * Besides, cloning a texture does not automatically mark it for a texture upload. You have to set [Texture.needsUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.needsUpdate) to true as soon as its image property (the data source) is fully loaded or ready.
	 */
	clone(): this;

	/**
	 *
	 * @param source
	 * @returns copy
	 */
	copy(source: Texture): this;

	/**
	 * Convert the texture to three.js [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4).
	 * @param met optional object containing metadata.
	 */
	toJSON(meta: any): any;

	/**
	 * Frees the GPU related resources allocated by a texture. Call this method whenever a texture is no longer used in your app.
	 */
	dispose(): void;

	/**
	 * Transform the uv based on the value of this texture's [.offset](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.offset), [.repeat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.repeat),
	 * [.wrapS](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.wrapS), [.wrapT](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.wrapT) and [.flipY](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.flipY) properties.
	 */
	transformUv(uv: Vector2): Vector2;

	/**
	 * Update the texture's uv-transform [.matrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.matrix) from the texture properties [.offset](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.offset), [.repeat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.repeat),
	 * [.rotation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.rotation), and [.center](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.center).
	 */
	updateMatrix(): void;
}

/**
 * Creates a texture for use with a video texture.
 * This is almost the same as the base [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) class, except that it continuously sets [needsUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.needsUpdate) to *true* so that the texture is updated as the video plays. Automatic creation of [mipmaps](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.mipmaps) is also disabled.
 *
 * ### Examples
 * [materials / video](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_video)
 * 
 * ### Code Example
 * ```js
 * // assuming you have created a HTML video element with id="video"
 * const video = document.getElementById( 'video' );
 * const texture = new THREE.VideoTexture( video );
 * ```
 */
export interface VideoTexture extends Texture {
	/**
	 * @param video The video element to use as the texture.
	 * @param mapping 	How the image is applied to the object. An object type of [THREE.UVMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [mapping constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param wrapS The default is [THREE.ClampToEdgeWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [wrap mode constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param wrapT The default is [THREE.ClampToEdgeWrapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [wrap mode constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param magFilter How the texture is sampled when a texel covers more than one pixel.
	 * The default is [THREE.LinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures). See [magnification filter constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param minFilter How the texture is sampled when a texel covers less than one pixel.
	 * The default is [THREE.LinearMipmapLinearFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures). See [minification filter constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param format The default is [THREE.RGBFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [format constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * Note that a bug has been reported with Firefox's WebGL implementation where use of [THREE.RGBFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) on a VideoTexture can result in a significant performance penalty, if you encounter this issue it is recommended to pass in [THREE.RGBAFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) instead.
	 * @param type Default is [THREE.UnsignedByteType](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * See [type constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) for other choices.
	 * @param anisotropy The number of samples taken along the axis through the pixel that has the highest density of texels.
	 * By default, this value is 1. A higher value gives a less blurry result than a basic mipmap, at the cost of more texture samples being used.
	 * Use [renderer.getMaxAnisotropy](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLrenderer.getMaxAnisotropy)() to find the maximum valid anisotropy value for the GPU; this value is usually a power of 2.
	 */
	new (
		video: HTMLVideoElement,
		mapping?: Mapping,
		wrapS?: Wrapping,
		wrapT?: Wrapping,
		magFilter?: TextureFilter,
		minFilter?: TextureFilter,
		format?: PixelFormat,
		type?: TextureDataType,
		anisotropy?: number
	): this;

	readonly isVideoTexture: true;

	/**
	 * False by default. Mipmaps can't be generated for compressed textures <h2>Methods</h2>
	 * See the base [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) class for common methods.
	 * @default false
	 */
	generateMipmaps: boolean;
}
