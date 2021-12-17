import {
	CanvasTexture as O3JS_CanvasTexture,
	CompressedTexture as O3JS_CompressedTexture,
	CubeTexture as O3JS_CubeTexture,
	DataTexture as O3JS_DataTexture,
	DataTexture2DArray as O3JS_DataTexture2DArray,
	DataTexture3D as O3JS_DataTexture3D,
	DepthTexture as O3JS_DepthTexture,
	Texture as O3JS_Texture,
	VideoTexture as O3JS_VideoTexture,
} from 'three';
import * as I3JS from '../../types/three/textures';

export type CanvasTexture = I3JS.CanvasTexture;
export const CanvasTexture: CanvasTexture = O3JS_CanvasTexture as any;

export type CompressedTexture = I3JS.CompressedTexture;
export const CompressedTexture: CompressedTexture = O3JS_CompressedTexture as any;

export type CubeTexture = I3JS.CubeTexture;
export const CubeTexture: CubeTexture = O3JS_CubeTexture as any;

export type DataTexture = I3JS.DataTexture;
export const DataTexture: DataTexture = O3JS_DataTexture as any;

export type DataTexture2DArray = I3JS.DataTexture2DArray;
export const DataTexture2DArray: DataTexture2DArray = O3JS_DataTexture2DArray as any;

export type DataTexture3D = I3JS.DataTexture3D;
export const DataTexture3D: DataTexture3D = O3JS_DataTexture3D as any;

export type DepthTexture = I3JS.DepthTexture;
export const DepthTexture: DepthTexture = O3JS_DepthTexture as any;

export type Texture = I3JS.Texture;
export const Texture: Texture = O3JS_Texture as any;

export type VideoTexture = I3JS.VideoTexture;
export const VideoTexture: VideoTexture = O3JS_VideoTexture as any;
