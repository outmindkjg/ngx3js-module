import { AnimationClip } from './animation';
import { BufferGeometry, InstancedBufferGeometry, Object3D } from './core';
import { Material } from './materials';
import { CompressedTexture, CubeTexture, DataTexture, Texture } from './textures';

/**
 */
export interface AnimationLoader extends Loader {
	/**
	 */
	new (manager?: LoadingManager): this;

	/**
	 */
	load(
		url: string,
		onLoad: (response: AnimationClip[]) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;

	/**
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<AnimationClip[]>;

	/**
	 */
	parse(json: any): AnimationClip[];
}

/**
 */
export interface AudioLoader extends Loader {
	/**
	 */
	new (manager?: LoadingManager): this;

	/**
	 */
	load(
		url: string,
		onLoad: (audioBuffer: AudioBuffer) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;

	/**
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<AudioBuffer>;
}

/**
 */
export interface BufferGeometryLoader extends Loader {
	/**
	 */
	new (manager?: LoadingManager): this;

	/**
	 */
	load(
		url: string,
		onLoad: (bufferGeometry: InstancedBufferGeometry | BufferGeometry) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;

	/**
	 */
	loadAsync(
		url: string,
		onProgress?: (event: ProgressEvent) => void
	): Promise<InstancedBufferGeometry | BufferGeometry>;

	/**
	 */
	parse(json: any): InstancedBufferGeometry | BufferGeometry;
}

/**
 */
export interface Cache {
	/**
	 * @default false
	 */
	enabled: boolean;

	/**
	 * @default {}
	 */
	files: any;

	/**
	 */
	add(key: string, file: any): void;

	/**
	 */
	get(key: string): any;

	/**
	 */
	remove(key: string): void;

	/**
	 */
	clear(): void;
}

/**
 */
export interface CompressedTextureLoader extends Loader {
	/**
	 */
	new (manager?: LoadingManager): this;

	/**
	 */
	load(
		url: string,
		onLoad: (texture: CompressedTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): CompressedTexture;

	/**
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<CompressedTexture>;
}

/**
 */
export interface CubeTextureLoader extends Loader {
	/**
	 */
	new (manager?: LoadingManager): this;

	/**
	 */
	load(
		urls: string[],
		onLoad?: (texture: CubeTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): CubeTexture;

	/**
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<CubeTexture>;
}

/**
 */
export interface DataTextureLoader extends Loader {
	/**
	 */
	new (manager?: LoadingManager): this;

	/**
	 */
	load(
		url: string,
		onLoad: (dataTexture: DataTexture, texData: object) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): DataTexture;

	/**
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<DataTexture>;
}

/**
 */
export interface FileLoader extends Loader {
	/**
	 */
	new (manager?: LoadingManager): this;

	/**
	 */
	mimeType: undefined | MimeType;

	/**
	 */
	responseType: undefined | string;

	/**
	 */
	load(
		url: string,
		onLoad?: (response: string | ArrayBuffer) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): any;

	/**
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<string | ArrayBuffer>;

	/**
	 */
	setMimeType(mimeType: MimeType): FileLoader;

	/**
	 */
	setResponseType(responseType: string): FileLoader;
}

/**
 */
export interface ImageBitmapLoader extends Loader {
	/**
	 */
	new (manager?: LoadingManager): this;

	/**
	 * @default { premultiplyAlpha: 'none' }
	 */
	options: undefined | object;

	/**
	 */
	readonly isImageBitmapLoader: true;

	/**
	 */
	setOptions(options: object): ImageBitmapLoader;

	/**
	 */
	load(
		url: string,
		onLoad?: (response: ImageBitmap) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): any;

	/**
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ImageBitmap>;
}

/**
 * A loader for loading an image.
 * Unlike other loaders, this one emits events instead of using predefined callbacks. So if you're interested in getting notified when things happen, you need to add listeners to the object.
 */
export interface ImageLoader extends Loader {
	/**
	 */
	new (manager?: LoadingManager): this;

	/**
	 */
	load(
		url: string,
		onLoad?: (image: HTMLImageElement) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): HTMLImageElement;

	/**
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<HTMLImageElement>;
}

/**
 * Base class for implementing loaders.
 */
export interface Loader {
	/**
	 */
	new (manager?: LoadingManager): this;

	/**
	 * @default 'anonymous'
	 */
	crossOrigin: string;

	/**
	 * @default: false
	 */
	withCredentials: boolean;

	/**
	 * @default ''
	 */
	path: string;

	/**
	 * @default ''
	 */
	resourcePath: string;

	/**
	 */
	manager: LoadingManager;

	/**
	 * @default {}
	 */
	requestHeader: { [header: string]: string };

	/*
	load(): void;
	parse(): void;
	*/
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<any>;

	/**
	 */
	setCrossOrigin(crossOrigin: string): this;

	/**
	 */
	setWithCredentials(value: boolean): this;

	/**
	 */
	setPath(path: string): this;

	/**
	 */
	setResourcePath(resourcePath: string): this;

	/**
	 */
	setRequestHeader(requestHeader: { [header: string]: string }): this;
}

/**
 */
export interface LoaderUtils {
	/**
	 */
	decodeText(array: BufferSource): string;

	/**
	 */
	extractUrlBase(url: string): string;

	/**
	 */
	resolveURL(url: string, path: string): string;
}

/**
 * Handles and keeps track of loaded and pending data.
 */
export interface LoadingManager {
	/**
	 */
	new (
		onLoad?: () => void,
		onProgress?: (url: string, loaded: number, total: number) => void,
		onError?: (url: string) => void
	): this;

	/**
	 * Will be called when loading of an item starts.
	 * @param url The url of the item that started loading.
	 * @param loaded The number of items already loaded so far.
	 * @param total The total amount of items to be loaded.
	 */
	onStart?: ((url: string, loaded: number, total: number) => void) | undefined;

	/**
	 * Will be called when all items finish loading.
	 * The default is a with empty body.
	 */
	onLoad: () => void;

	/**
	 * Will be called for each loaded item.
	 * The default is a with empty body.
	 * @param url The url of the item just loaded.
	 * @param loaded The number of items already loaded so far.
	 * @param total The total amount of items to be loaded.
	 */
	onProgress: (url: string, loaded: number, total: number) => void;

	/**
	 * Will be called when item loading fails.
	 * The default is a with empty body.
	 * @param url The url of the item that errored.
	 */
	onError: (url: string) => void;

	/**
	 * If provided, the callback will be passed each resource URL before a request is sent.
	 * The callback may return the original URL, or a new URL to override loading behavior.
	 * This behavior can be used to load assets from .ZIP files, drag-and-drop APIs, and Data URIs.
	 * @param callback URL modifier callback. Called with url argument, and must return resolvedURL.
	 */
	setURLModifier(callback?: (url: string) => string): this;

	/**
	 * Given a URL, uses the URL modifier callback (if any) and returns a resolved URL.
	 * If no URL modifier is set, returns the original URL.
	 * @param url the url to load
	 */
	resolveURL(url: string): string;

	/**
	 */
	itemStart(url: string): void;

	/**
	 */
	itemEnd(url: string): void;

	/**
	 */
	itemError(url: string): void;

	/**
	 */
	addHandler(regex: RegExp, loader: Loader): this;

	/**
	 */
	removeHandler(regex: RegExp): this;

	/**
	 */
	getHandler(file: string): Loader | null;
}

/**
 */
export interface MaterialLoader extends Loader {
	/**
	 */
	new (manager?: LoadingManager): this;

	/**
	 * @default {}
	 */
	textures: { [key: string]: Texture };

	/**
	 */
	load(
		url: string,
		onLoad: (material: Material) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: Error | ErrorEvent) => void
	): void;

	/**
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Material>;

	/**
	 */
	setTextures(textures: { [key: string]: Texture }): this;

	/**
	 */
	parse(json: any): Material;
}

/**
 */
export interface ObjectLoader extends Loader {
	/**
	 */
	new (manager?: LoadingManager): this;

	/**
	 */
	load(
		url: string,
		onLoad?: <ObjectType extends Object3D>(object: ObjectType) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: Error | ErrorEvent) => void
	): void;

	/**
	 */
	loadAsync<ObjectType extends Object3D>(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ObjectType>;

	/**
	 */
	parse<T extends Object3D>(json: any, onLoad?: (object: Object3D) => void): T;

	/**
	 */
	parseAsync<T extends Object3D>(json: any): Promise<T>;

	/**
	 */
	parseGeometries(json: any): { [key: string]: InstancedBufferGeometry | BufferGeometry }; // Array of BufferGeometry or Geometry or Geometry2.

	/**
	 */
	parseMaterials(json: any, textures: Texture[]): Material[]; // Array of Classes that inherits from Matrial.

	/**
	 */
	parseAnimations(json: any): AnimationClip[];

	/**
	 */
	parseImages(json: any, onLoad: () => void): { [key: string]: HTMLImageElement };

	/**
	 */
	parseImagesAsync(json: any): Promise<{ [key: string]: HTMLImageElement }>;

	/**
	 */
	parseTextures(json: any, images: any): Texture[];

	/**
	 */
	parseObject<T extends Object3D>(data: any, geometries: any[], materials: Material[], animations: AnimationClip[]): T;
}

/**
 * Class for loading a texture.
 * Unlike other loaders, this one emits events instead of using predefined callbacks. So if you're interested in getting notified when things happen, you need to add listeners to the object.
 */
export interface TextureLoader extends Loader {
	/**
	 */
	new (manager?: LoadingManager): this;

	/**
	 */
	load(
		url: string,
		onLoad?: (texture: Texture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): Texture;

	/**
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Texture>;
}
