import * as THREE_TEXTURE from 'three';
import * as I3JS from '../../types/three/textures';

export type CanvasTexture = I3JS.CanvasTexture;
export const CanvasTexture: CanvasTexture = THREE_TEXTURE.CanvasTexture as any;

export type CompressedTexture = I3JS.CompressedTexture;
export const CompressedTexture: CompressedTexture = THREE_TEXTURE.CompressedTexture as any;

export type CubeTexture = I3JS.CubeTexture;
export const CubeTexture: CubeTexture = THREE_TEXTURE.CubeTexture as any;

export type DataTexture = I3JS.DataTexture;
export const DataTexture: DataTexture = THREE_TEXTURE.DataTexture as any;

export type DataTexture2DArray = I3JS.DataTexture2DArray;
export const DataTexture2DArray: DataTexture2DArray = THREE_TEXTURE.DataTexture2DArray as any;

export type DataTexture3D = I3JS.DataTexture3D;
export const DataTexture3D: DataTexture3D = THREE_TEXTURE.DataTexture3D as any;

export type DepthTexture = I3JS.DepthTexture;
export const DepthTexture: DepthTexture = THREE_TEXTURE.DepthTexture as any;

export type Texture = I3JS.Texture;
export const Texture: Texture = THREE_TEXTURE.Texture as any;

export type VideoTexture = I3JS.VideoTexture;
export const VideoTexture: VideoTexture = THREE_TEXTURE.VideoTexture as any;

export type FramebufferTexture = I3JS.FramebufferTexture;
export const FramebufferTexture: FramebufferTexture = (THREE_TEXTURE as any).FramebufferTexture;

