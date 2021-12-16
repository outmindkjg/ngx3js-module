import { CompressedPixelFormat, Mapping, PixelFormat, PixelFormatGPU, TextureDataType, TextureEncoding, TextureFilter, Wrapping } from './constants';
import { EventDispatcher } from './core';
import { Matrix3, Vector2 } from './math';

export interface CanvasTexture extends Texture {
    /**
     * @param canvas
     * @param [format=THREE.RGBAFormat]
     * @param [type=THREE.UnsignedByteType]
     * @param [mapping=THREE.Texture.DEFAULT_MAPPING]
     * @param [wrapS=THREE.ClampToEdgeWrapping]
     * @param [wrapT=THREE.ClampToEdgeWrapping]
     * @param [magFilter=THREE.LinearFilter]
     * @param [minFilter=THREE.LinearMipmapLinearFilter]
     * @param [anisotropy=1]
     * @param [encoding=THREE.LinearEncoding]
     */
    new( 
        canvas: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: TextureFilter,
        minFilter?: TextureFilter,
        format?: PixelFormat,
        type?: TextureDataType,
        anisotropy?: number,
    ) : this;

    readonly isCanvasTexture: true;
}

export interface CompressedTexture extends Texture {
    /**
     * @param mipmaps
     * @param width
     * @param height
     * @param [format=THREE.RGBAFormat]
     * @param [type=THREE.UnsignedByteType]
     * @param [mapping=THREE.Texture.DEFAULT_MAPPING]
     * @param [wrapS=THREE.ClampToEdgeWrapping]
     * @param [wrapT=THREE.ClampToEdgeWrapping]
     * @param [magFilter=THREE.LinearFilter]
     * @param [minFilter=THREE.LinearMipmapLinearFilter]
     * @param [anisotropy=1]
     * @param [encoding=THREE.LinearEncoding]
     */
    new( 
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
        encoding?: TextureEncoding,
    ) : this;

    image: { width: number; height: number };

    mipmaps: ImageData[];

    /**
     * @default false
     */
    flipY: boolean;

    /**
     * @default false
     */
    generateMipmaps: boolean;

    readonly isCompressedTexture: true;
}

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
    new( 
        images?: any[], // HTMLImageElement or HTMLCanvasElement
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: TextureFilter,
        minFilter?: TextureFilter,
        format?: PixelFormat,
        type?: TextureDataType,
        anisotropy?: number,
        encoding?: TextureEncoding,
    ) : this;

    images: any; // returns and sets the value of Texture.image in the codde ?

    /**
     * @default false
     */
    flipY: boolean;

    readonly isCubeTexture: true;
}

export interface DataTexture extends Texture {
    /**
     * @param data
     * @param width
     * @param height
     * @param [format=THREE.RGBAFormat]
     * @param [type=THREE.UnsignedByteType]
     * @param [mapping=THREE.Texture.DEFAULT_MAPPING]
     * @param [wrapS=THREE.ClampToEdgeWrapping]
     * @param [wrapT=THREE.ClampToEdgeWrapping]
     * @param [magFilter=THREE.NearestFilter]
     * @param [minFilter=THREE.NearestFilter]
     * @param [anisotropy=1]
     * @param [encoding=THREE.LinearEncoding]
     */
    new( 
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
        encoding?: TextureEncoding,
    ) : this;

    image: ImageData;

    /**
     * @default false
     */
    flipY: boolean;

    /**
     * @default false
     */
    generateMipmaps: boolean;

    /**
     * @default 1
     */
    unpackAlignment: number;

    /**
     * @default THREE.DepthFormat
     */
    format: PixelFormat;

    readonly isDataTexture: true;
}

export interface DataTexture2DArray extends Texture {
    new( data?: BufferSource, width?: number, height?: number, depth?: number) : this;

    /**
     * @default THREE.NearestFilter
     */
    magFilter: TextureFilter;

    /**
     * @default THREE.NearestFilter
     */
    minFilter: TextureFilter;

    /**
     * @default THREE.ClampToEdgeWrapping
     */
    wrapR: boolean;

    /**
     * @default false
     */
    flipY: boolean;

    /**
     * @default false
     */
    generateMipmaps: boolean;

    readonly isDataTexture2DArray: true;
}

export interface DataTexture3D extends Texture {
    new( data: BufferSource, width: number, height: number, depth: number) : this;

    /**
     * @default THREE.NearestFilter
     */
    magFilter: TextureFilter;

    /**
     * @default THREE.NearestFilter
     */
    minFilter: TextureFilter;

    /**
     * @default THREE.ClampToEdgeWrapping
     */
    wrapR: boolean;

    /**
     * @default false
     */
    flipY: boolean;

    /**
     * @default false
     */
    generateMipmaps: boolean;

    readonly isDataTexture3D: true;
}

export interface DepthTexture extends Texture {
    /**
     * @param width
     * @param height
     * @param type
     * @param [mapping=THREE.Texture.DEFAULT_MAPPING]
     * @param [wrapS=THREE.ClampToEdgeWrapping]
     * @param [wrapT=THREE.ClampToEdgeWrapping]
     * @param [magFilter=THREE.NearestFilter]
     * @param [minFilter=THREE.NearestFilter]
     * @param [anisotropy=1]
     */
    new( 
        width: number,
        height: number,
        type?: TextureDataType,
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: TextureFilter,
        minFilter?: TextureFilter,
        anisotropy?: number,
    ) : this;

    image: { width: number; height: number };

    /**
     * @default false
     */
    flipY: boolean;

    /**
     * @default false
     */
    generateMipmaps: boolean;

    readonly isDepthTexture: true;
}

export interface Texture extends EventDispatcher {
    /**
     * @param [image]
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
    new( 
        image?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: TextureFilter,
        minFilter?: TextureFilter,
        format?: PixelFormat,
        type?: TextureDataType,
        anisotropy?: number,
        encoding?: TextureEncoding,
    ) : this;

    id: number;
    uuid: string;

    /**
     * @default ''
     */
    name: string;
    sourceFile: string;

    /**
     * @default THREE.Texture.DEFAULT_IMAGE
     */
    image: any; // HTMLImageElement or ImageData or { width: number, height: number } in some children;

    /**
     * @default []
     */
    mipmaps: any[]; // ImageData[] for 2D textures and CubeTexture[] for cube textures;

    /**
     * @default THREE.Texture.DEFAULT_MAPPING
     */
    mapping: Mapping;

    /**
     * @default THREE.ClampToEdgeWrapping
     */
    wrapS: Wrapping;

    /**
     * @default THREE.ClampToEdgeWrapping
     */
    wrapT: Wrapping;

    /**
     * @default THREE.LinearFilter
     */
    magFilter: TextureFilter;

    /**
     * @default THREE.LinearMipmapLinearFilter
     */
    minFilter: TextureFilter;

    /**
     * @default 1
     */
    anisotropy: number;

    /**
     * @default THREE.RGBAFormat
     */
    format: PixelFormat;

    internalFormat: PixelFormatGPU | null;

    /**
     * @default THREE.UnsignedByteType
     */
    type: TextureDataType;

    /**
     * @default new THREE.Matrix3()
     */
    matrix: Matrix3;

    /**
     * @default true
     */
    matrixAutoUpdate: boolean;

    /**
     * @default new THREE.Vector2( 0, 0 )
     */
    offset: Vector2;

    /**
     * @default new THREE.Vector2( 1, 1 )
     */
    repeat: Vector2;

    /**
     * @default new THREE.Vector2( 0, 0 )
     */
    center: Vector2;

    /**
     * @default 0
     */
    rotation: number;

    /**
     * @default true
     */
    generateMipmaps: boolean;

    /**
     * @default false
     */
    premultiplyAlpha: boolean;

    /**
     * @default true
     */
    flipY: boolean;

    /**
     * @default 4
     */
    unpackAlignment: number;

    /**
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
    needsUpdate: boolean;
    readonly isTexture: true;

    onUpdate: () => void;
    DEFAULT_IMAGE: any;
    DEFAULT_MAPPING: any;

    clone(): this;
    copy(source: Texture): this;
    toJSON(meta: any): any;
    dispose(): void;
    transformUv(uv: Vector2): Vector2;
    updateMatrix(): void;
}

export interface VideoTexture extends Texture {
    /**
     * @param video
     * @param [mapping=THREE.Texture.DEFAULT_MAPPING]
     * @param [wrapS=THREE.ClampToEdgeWrapping]
     * @param [wrapT=THREE.ClampToEdgeWrapping]
     * @param [magFilter=THREE.LinearFilter]
     * @param [minFilter=THREE.LinearFilter]
     * @param [format=THREE.RGBFormat]
     * @param [type=THREE.UnsignedByteType]
     * @param [anisotropy=1]
     */
    new( 
        video: HTMLVideoElement,
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: TextureFilter,
        minFilter?: TextureFilter,
        format?: PixelFormat,
        type?: TextureDataType,
        anisotropy?: number,
    ) : this;

    readonly isVideoTexture: true;

    /**
     * @default false
     */
    generateMipmaps: boolean;
}
