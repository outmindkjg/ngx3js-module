import {
	AnimationLoader as O3JS_AnimationLoader,
	AudioLoader as O3JS_AudioLoader,
	BufferGeometryLoader as O3JS_BufferGeometryLoader,
	CompressedTextureLoader as O3JS_CompressedTextureLoader,
	CubeTextureLoader as O3JS_CubeTextureLoader,
	DataTextureLoader as O3JS_DataTextureLoader,
	FileLoader as O3JS_FileLoader,
	ImageBitmapLoader as O3JS_ImageBitmapLoader,
	ImageLoader as O3JS_ImageLoader,
	Cache as  O3JS_Cache,
	Loader as O3JS_Loader,
	LoaderUtils as O3JS_LoaderUtils,
	LoadingManager as O3JS_LoadingManager,
	MaterialLoader as O3JS_MaterialLoader,
	ObjectLoader as O3JS_ObjectLoader,
	TextureLoader as O3JS_TextureLoader,
} from 'three';
import * as I3JS from '../../types/three/loaders';

export type AnimationLoader = I3JS.AnimationLoader;
export const AnimationLoader: AnimationLoader = O3JS_AnimationLoader as any;

export type AudioLoader = I3JS.AudioLoader;
export const AudioLoader: AudioLoader = O3JS_AudioLoader as any;

export type BufferGeometryLoader = I3JS.BufferGeometryLoader;
export const BufferGeometryLoader: BufferGeometryLoader = O3JS_BufferGeometryLoader as any;

export type CompressedTextureLoader = I3JS.CompressedTextureLoader;
export const CompressedTextureLoader: CompressedTextureLoader = O3JS_CompressedTextureLoader as any;

export type CubeTextureLoader = I3JS.CubeTextureLoader;
export const CubeTextureLoader: CubeTextureLoader = O3JS_CubeTextureLoader as any;

export type DataTextureLoader = I3JS.DataTextureLoader;
export const DataTextureLoader: DataTextureLoader = O3JS_DataTextureLoader as any;

export type FileLoader = I3JS.FileLoader;
export const FileLoader: FileLoader = O3JS_FileLoader as any;

export type ImageBitmapLoader = I3JS.ImageBitmapLoader;
export const ImageBitmapLoader: ImageBitmapLoader = O3JS_ImageBitmapLoader as any;

export type ImageLoader = I3JS.ImageLoader;
export const ImageLoader: ImageLoader = O3JS_ImageLoader as any;

export type Loader = I3JS.Loader;
export const Loader: Loader = O3JS_Loader as any;

export type Cache = I3JS.Cache;
export const Cache: Cache = O3JS_Cache as any;

export type LoaderUtils = I3JS.LoaderUtils;
export const LoaderUtils: LoaderUtils = O3JS_LoaderUtils as any;

export type LoadingManager = I3JS.LoadingManager;
export const LoadingManager: LoadingManager = O3JS_LoadingManager as any;

export type MaterialLoader = I3JS.MaterialLoader;
export const MaterialLoader: MaterialLoader = O3JS_MaterialLoader as any;

export type ObjectLoader = I3JS.ObjectLoader;
export const ObjectLoader: ObjectLoader = O3JS_ObjectLoader as any;

export type TextureLoader = I3JS.TextureLoader;
export const TextureLoader: TextureLoader = O3JS_TextureLoader as any;
