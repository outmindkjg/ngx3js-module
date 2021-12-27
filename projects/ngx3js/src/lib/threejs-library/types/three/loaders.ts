import { AnimationClip } from './animation';
import { BufferGeometry, InstancedBufferGeometry, Object3D } from './core';
import { Material } from './materials';
import { CompressedTexture, CubeTexture, DataTexture, Texture } from './textures';

/**
 * Class for loading [AnimationClips](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationClip) in JSON format.
 * This uses the [FileLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FileLoader) internally for loading files.
 *
 * ### Code Example
 * ```js
 * //  instantiate a loader
 * const loader = new THREE.AnimationLoader();
 * //  load a resource
 * loader.load(
 * 	'animations/animation.js', //  resource URL
 * 	function ( animations ) { 	//  onLoad callback
 * 		// animations is an array of AnimationClips
 * 	},
 * 	function ( xhr ) { //  onProgress callback
 * 		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
 * 	},
 * 	function ( err ) { //  onError callback
 * 		console.log( 'An error happened' );
 * 	}
 * );
 * ```
 */
export interface AnimationLoader extends Loader {
	/**
	 * Creates a new AnimationLoader.
	 * @param manager The [loadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager) for the loader to use. Default is [THREE.DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager).
	 */
	new (manager?: LoadingManager): this;

	/**
	 * Begin loading from url and pass the loaded animation to onLoad.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onLoad Will be called when load completes. The argument will be the loaded [animation clips](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationClip).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 * @param onError Will be called if load errors.
	 */
	load(
		url: string,
		onLoad: (response: AnimationClip[]) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;

	/**
	 * Begin loading from url and pass the loaded animation to onLoad.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<AnimationClip[]>;

	/**
	 * @param json required Parse the JSON object and return an array of animation clips. Individual clips in the object will be parsed with [AnimationClip.parse](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationClip.parse).
	 */
	parse(json: any): AnimationClip[];
}

/**
 * Class for loading an [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer).
 * This uses the [FileLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FileLoader) internally for loading files.
 *
 * ### Code Example
 * ```js
 * // instantiate a listener
 * const audioListener = new THREE.AudioListener();
 * // add the listener to the camera
 * camera.add( audioListener );
 * // instantiate audio object
 * const oceanAmbientSound = new THREE.Audio( audioListener );
 * // add the audio object to the scene
 * scene.add( oceanAmbientSound );
 * // instantiate a loader
 * const loader = new THREE.AudioLoader();
 * // load a resource
 * loader.load(
 * 	'audio/ambient_ocean.ogg', // resource URL
 * 	function ( audioBuffer ) { // onLoad callback
 * 		// set the audio object buffer to the loaded object
 * 		oceanAmbientSound.setBuffer( audioBuffer );
 * 		// play the audio
 * 		oceanAmbientSound.play();
 * 	},
 * 	function ( xhr ) { // onProgress callback
 * 		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
 * 	},
 * 	function ( err ) { // onError callback
 * 		console.log( 'An error happened' );
 * 	}
 * );
 * ```
 */
export interface AudioLoader extends Loader {
	/**
	 * Creates a new AudioLoader.
	 * @param manager The [loadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager) for the loader to use. Default is [THREE.DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager).
	 */
	new (manager?: LoadingManager): this;

	/**
	 * Begin loading from url and pass the loaded [AudioBuffer](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/String) to onLoad.
	 *
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onLoad Will be called when load completes. The argument will be the loaded text response.
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 * @param onError Will be called when load errors.
	 */
	load(
		url: string,
		onLoad: (audioBuffer: AudioBuffer) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;

	/**
	 * Begin loading from url and pass the loaded [AudioBuffer](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/String) to onLoad.
	 *
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<AudioBuffer>;
}

/**
 * A loader for loading a [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
 * This uses the [FileLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FileLoader) internally for loading files.
 *
 * ### Code Example
 * ```js
 * // instantiate a loader
 * const loader = new THREE.BufferGeometryLoader();
 * // load a resource
 * loader.load(
 * 	'models/json/pressure.json', // resource URL
 * 	function ( geometry ) { // onLoad callback
 * 		const material = new THREE.MeshLambertMaterial( { color: 0xF5F5F5 } );
 * 		const object = new THREE.Mesh( geometry, material );
 * 		scene.add( object );
 * 	},
 * 	function ( xhr ) { // onProgress callback
 * 		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
 * 	},
 * 	function ( err ) { // onError callback
 * 		console.log( 'An error happened' );
 * 	}
 * );
 * ```
 *
 * ### Examples
 * [WebGL / performance](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_performance)
 */
export interface BufferGeometryLoader extends Loader {
	/**
	 * Creates a new BufferGeometryLoader.
	 * @param manager The [loadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager) for the loader to use. Default is [THREE.DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager).
	 */
	new (manager?: LoadingManager): this;

	/**
	 * Begin loading from url and call onLoad with the parsed response content.
	 * @param url Will be called when load completes. The argument will be the loaded [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 * @param onError Will be called when load errors.
	 */
	load(
		url: string,
		onLoad: (bufferGeometry: InstancedBufferGeometry | BufferGeometry) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;

	/**
	 * Begin loading from url and call onLoad with the parsed response content.
	 * @param url Will be called when load completes. The argument will be the loaded [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 */
	loadAsync(
		url: string,
		onProgress?: (event: ProgressEvent) => void
	): Promise<InstancedBufferGeometry | BufferGeometry>;

	/**
	 * @param json The <em>JSON</em> structure to parse.
	 * Parse a <em>JSON</em> structure and return a [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
	 */
	parse(json: any): InstancedBufferGeometry | BufferGeometry;
}

/**
 * A simple caching system, used internally by [FileLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FileLoader).
 *
 * ### Examples
 * [WebGL / geometry / text](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_text) |
 * [WebGL / interactive / instances / gpu](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_interactive_instances_gpu) |
 * [WebGL / loader / ttf](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_ttf)
 *
 * To enable caching across all loaders	that use [FileLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FileLoader) THREE.Cache.enabled = true.
 */
export interface Cache {
	/**
	 * Whether caching is enabled. Default is *false*.
	 * @default false
	 */
	enabled: boolean;

	/**
	 * An [object](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object) that holds cached files.
	 * @default {}
	 */
	files: any;

	/**
	 * Adds a cache entry with a key to reference the file. If this key already holds a file, it is overwritten.
	 * @param key The key to reference the cached file by.
	 * @param file The file to be cached.
	 */
	add(key: string, file: any): void;

	/**
	 * Get the value of key. If the key does not exist *undefined* is returned.
	 * @param key A string key
	 */
	get(key: string): any;

	/**
	 * Remove the cached file associated with the key.
	 * @param key A string key that references a cached file.
	 */
	remove(key: string): void;

	/**
	 * Remove all values from the cache.
	 */
	clear(): void;
}

/**
 * Abstract base class for block based textures loader (dds, pvr, ...).
 * This uses the [FileLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FileLoader) internally for loading files.
 *
 * ### Examples
 * See the [DDSLoader](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/DDSLoader.js) |
 * and [PVRLoader](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/PVRLoader.js) |
 * for examples of derived classes.
 */
export interface CompressedTextureLoader extends Loader {
	/**
	 * Creates a new CompressedTextureLoader.
	 * @param manager The [loadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager) for the loader to use. Default is [THREE.DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager).
	 */
	new (manager?: LoadingManager): this;

	/**
	 * Begin loading from url and pass the loaded texture to onLoad.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onLoad Will be called when load completes. The argument will be the loaded texture.
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 * @param onError Will be called when load errors.
	 */
	load(
		url: string,
		onLoad: (texture: CompressedTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): CompressedTexture;

	/**
	 * Begin loading from url and pass the loaded texture to onLoad.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<CompressedTexture>;
}

/**
 * Class for loading a [CubeTexture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubeTexture).
 * This uses the [ImageLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ImageLoader) internally for loading files.
 *
 * ### Code Example
 * ```js
 * const scene = new THREE.Scene();
 * scene.background = new THREE.CubeTextureLoader().setPath( 'textures/cubeMaps/' )
 * 	.load( [
 * 		'px.png',
 * 		'nx.png',
 * 		'py.png',
 * 		'ny.png',
 * 		'pz.png',
 * 		'nz.png'
 * 	]);
 * ```
 *
 * ### Examples
 * [materials / cubemap](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_cubemap) |
 * [materials / cubemap / dynamic](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_cubemap_dynamic) |
 * [materials / cubemap / refraction](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_cubemap_refraction)
 */
export interface CubeTextureLoader extends Loader {
	/**
	 * Creates a new CubeTextureLoader.
	 * @param manager The [loadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager) for the loader to use. Default is [THREE.DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager).
	 */
	new (manager?: LoadingManager): this;

	/**
	 * Begin loading from url and pass the loaded [texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubeTexture) to onLoad.
	 * The urls should be specified in the following order: pos-x, neg-x, pos-y, neg-y, pos-z, neg-z.
	 * They can also be [Data URIs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * Note that, by convention, cube maps are specified in a coordinate system in which positive-x is to the right when looking up the positive-z axis -- in other words, using a left-handed coordinate system.
	 * Since three.js uses a right-handed coordinate system, environment maps used in three.js will have pos-x and neg-x swapped.
	 *
	 * @param urls array of 6 urls to images, one for each side of the CubeTexture.
	 * @param onLoad Will be called when load completes. The argument will be the loaded [texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 * @param onError Will be called when load errors.
	 */
	load(
		urls: string[],
		onLoad?: (texture: CubeTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): CubeTexture;

	/**
	 * Begin loading from url and pass the loaded [texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubeTexture) to onLoad.
	 * The urls should be specified in the following order: pos-x, neg-x, pos-y, neg-y, pos-z, neg-z.
	 * They can also be [Data URIs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * Note that, by convention, cube maps are specified in a coordinate system in which positive-x is to the right when looking up the positive-z axis -- in other words, using a left-handed coordinate system.
	 * Since three.js uses a right-handed coordinate system, environment maps used in three.js will have pos-x and neg-x swapped.
	 *
	 * @param urls array of 6 urls to images, one for each side of the CubeTexture.
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<CubeTexture>;
}

/**
 * Abstract base class to load generic binary textures formats (rgbe, hdr, ...).
 * This uses the [FileLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FileLoader) internally for loading files, and creates a new [DataTexture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DataTexture).
 *
 * ### Examples
 * See the [RGBELoader](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/RGBELoader.js) for an example of a derived class.
 */
export interface DataTextureLoader extends Loader {
	/**
	 * @param manager The [loadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager) for the loader to use.
	 * Default is [THREE.DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager).
	 * Creates a new DataTextureLoader.
	 */
	new (manager?: LoadingManager): this;

	/**
	 * Begin loading from url and pass the loaded texture to onLoad.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onLoad Will be called when load completes. The argument will be the loaded texture.
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 * @param onError Will be called when load errors.
	 */
	load(
		url: string,
		onLoad: (dataTexture: DataTexture, texData: object) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): DataTexture;

	/**
	 * Begin loading from url and pass the loaded texture to onLoad.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<DataTexture>;
}

/**
 * A low level class for loading resources with XMLHttpRequest, used internaly by most loaders.
 * It can also be used directly to load any file type that does not have a loader.
 *
 * ### Code Example
 * ```js
 * const loader = new THREE.FileLoader();
 * // load a text file and output the result to the console
 * loader.load(
 * 	'example.txt', // resource URL
 * 	function ( data ) { // onLoad callback
 * 		// output the text to the console
 * 		console.log( data )
 * 	},
 * 	function ( xhr ) { // onProgress callback
 * 		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
 * 	},
 * 	function ( err ) { // onError callback
 * 		console.error( 'An error happened' );
 * 	}
 * );
 * ```
 *
 * <em>Note:</em> The cache must be enabled using THREE.Cache.enabled = true;
 * This is a global property and only needs to be set once to be used by all loaders that use FileLoader internally.
 * [Cache](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Cache) is a cache module that holds the response from each request made through this loader, so each file is requested once.
 *
 */
export interface FileLoader extends Loader {
	/**
	 * Creates a new FileLoader.
	 * @param manager The [loadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager) for the loader to use. Default is [THREE.DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager).
	 */
	new (manager?: LoadingManager): this;

	/**
	 * The expected [mimeType](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types).
	 * See *.setMimeType*. Default is *undefined*.
	 */
	mimeType: undefined | MimeType;

	/**
	 * The expected response type. See *.setResponseType*. Default is *undefined*.
	 */
	responseType: undefined | string;

	/**
	 * Load the URL and pass the response to the onLoad function.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onLoad Will be called when loading completes. The argument will be the loaded response.
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 * @param onError Will be called if an error occurs.
	 */
	load(
		url: string,
		onLoad?: (response: string | ArrayBuffer) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): any;

	/**
	 * Load the URL and pass the response to the onLoad function.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<string | ArrayBuffer>;

	/**
	 * Set the expected [mimeType](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) of the file being loaded. Note that in many cases this will be determined automatically, so by default it is *undefined*.
	 */
	setMimeType(mimeType: MimeType): FileLoader;

	/**
	 * Change the response type. Valid values are:
	 *
	 * - text - returns the data as [String](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/String).
	 * - arraybuffer - loads the data into a [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) and returns that.
	 * - blob - returns the data as a [Blob](https://developer.mozilla.org/en/docs/Web/API/Blob).
	 * - document - parses the file using the [DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser).
	 * - json - parses the file using [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).
	 */
	setResponseType(responseType: string): FileLoader;
}

/**
 * A loader for loading an [Image](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Image) as an [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap).
 * An ImageBitmap provides an asynchronous and resource efficient pathway to prepare textures for rendering in WebGL.
 * Unlike [FileLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FileLoader), ImageBitmapLoader does not avoid multiple concurrent requests to the same URL.
 *
 * Note that [Texture.flipY](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.flipY) and [Texture.premultiplyAlpha](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.premultiplyAlpha) with [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap) are ignored.
 * [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap) needs these configuration on bitmap creation unlike regular images need them on uploading to GPU. You need to set the equivalent options via [ImageBitmapLoader.setOptions](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ImageBitmapLoader.setOptions)
 * instead. Refer to [WebGL specification](https://www.khronos.org/registry/webgl/specs/latest/1.0/#6.10) for the detail.
 *
 * ### Examples
 * [WebGL / loader / ImageBitmap](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_imagebitmap)
 *
 * ### Code Example
 * ```js
 * // instantiate a loader
 * const loader = new THREE.ImageBitmapLoader();
 * // set options if needed
 * loader.setOptions( { imageOrientation: 'flipY' } );
 * // load a image resource
 * loader.load(
 * 	'textures/skyboxsun25degtest.png', // resource URL
 * 	function ( imageBitmap ) { // onLoad callback
 * 		const texture = new THREE.CanvasTexture( imageBitmap );
 * 		const material = new THREE.MeshBasicMaterial( { map: texture } );
 * 	},
 * 	undefined, // onProgress callback currently not supported
 * 	function ( err ) { // onError callback
 * 		console.log( 'An error happened' );
 * 	}
 * );
 * ```
 *
 */
export interface ImageBitmapLoader extends Loader {
	/**
	 * Creates a new ImageBitmapLoader.
	 * @param manager The [loadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager) for the loader to use. Default is [THREE.DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager).
	 */
	new (manager?: LoadingManager): this;

	/**
	 * An optional object that sets options for the internally used [createImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap) factory method. Default is *undefined*.
	 * @default { premultiplyAlpha: 'none' }
	 */
	options: undefined | object;

	readonly isImageBitmapLoader: true;

	/**
	 * Sets the options object for [createImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap).
	 */
	setOptions(options: object): ImageBitmapLoader;

	/**
	 * Begin loading from url and return the [image](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ImageBitmap) object that will contain the data.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onLoad Will be called when load completes. The argument will be the loaded [image](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Image).
	 * @param onProgress This callback function is currently not supported.
	 * @param onError Will be called when load errors.
	 */
	load(
		url: string,
		onLoad?: (response: ImageBitmap) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): any;

	/**
	 * Begin loading from url and return the [image](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ImageBitmap) object that will contain the data.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onProgress This callback function is currently not supported.
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ImageBitmap>;
}

/**
 * A loader for loading an [Image](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Image).
 * This is used internally by the [CubeTextureLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubeTextureLoader), [ObjectLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ObjectLoader) and [TextureLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TextureLoader).
 *
 * ### Examples
 * [WebGL / loader / obj](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_obj) |
 * [WebGL / shaders / ocean](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_shaders_ocean)
 *
 * ### Code Example
 * ```js
 * // instantiate a loader
 * const loader = new THREE.ImageLoader();
 * // load a image resource
 * loader.load(
 * 	'textures/skyboxsun25degtest.png', // resource URL
 * 	function ( image ) { // onLoad callback
 * 		// use the image, e.g. draw part of it on a canvas
 * 		const canvas = document.createElement( 'canvas' );
 * 		const context = canvas.getContext( '2d' );
 * 		context.drawImage( image, 100, 100 );
 * 	},
 * 	undefined, // onProgress callback currently not supported
 * 	function () { // onError callback
 * 		console.error( 'An error happened.' );
 * 	}
 * );
 * ```
 *
 * Please note three.js r84 dropped support for ImageLoader progress events. For an ImageLoader that supports progress events, see [this thread](https://github.com/mrdoob/three.js/issues/10439#issuecomment-275785639).
 */
export interface ImageLoader extends Loader {
	/**
	 * Creates a new ImageLoader.
	 * @param manager The [loadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager) for the loader to use. Default is [THREE.DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager).
	 */
	new (manager?: LoadingManager): this;

	/**
	 * Begin loading from url and return the [image](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Image) object that will contain the data.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onLoad Will be called when load completes. The argument will be the loaded [image](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Image).
	 * @param onProgress This callback function is currently not supported.
	 * @param onError Will be called when load errors.
	 */
	load(
		url: string,
		onLoad?: (image: HTMLImageElement) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): HTMLImageElement;

	/**
	 * Begin loading from url and return the [image](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Image) object that will contain the data.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onProgress This callback function is currently not supported.
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<HTMLImageElement>;
}

/**
 * Base class for implementing loaders.
 */
export interface Loader {
	/**
	 * Creates a new Loader.
	 * @param manager The [loadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager) for the loader to use. Default is [THREE.DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager).
	 */
	new (manager?: LoadingManager): this;

	/**
	 * The crossOrigin string to implement CORS for loading the url from a different domain that allows CORS.
	 * Default is *anonymous*.
	 * @default 'anonymous'
	 */
	crossOrigin: string;

	/**
	 * Whether the XMLHttpRequest uses credentials. See *.setWithCredentials*.
	 * Default is *false*.
	 * @default: false
	 */
	withCredentials: boolean;

	/**
	 * The base path from which the asset will be loaded.
	 * Default is the empty string.
	 * @default ''
	 */
	path: string;

	/**
	 * The base path from which additional resources like textures will be loaded.
	 * Default is the empty string.
	 * @default ''
	 */
	resourcePath: string;

	/**
	 * The [loadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager)  the loader is using. Default is [DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DefaultLoadingManager).
	 */
	manager: LoadingManager;

	/**
	 * The [request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header) used in HTTP request. See *.setRequestHeader*. Default is empty object.
	 * @default {}
	 */
	requestHeader: { [header: string]: string };

	/*
	 * @param url A string containing the path/URL of the file to be loaded.
	 * @param onProgress A function to be called while the loading is in progress. The argument will be the XMLHttpRequest instance, that contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 * This method is equivalent to *.load*, but returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
	 * [onLoad](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Function) is handled by [Promise.resolve](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) and [onError](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Function) is handled by [Promise.reject](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject).
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<any>;

	/**
	 * @param crossOrigin The crossOrigin string to implement CORS for loading the url from a different domain that allows CORS.
	 */
	setCrossOrigin(crossOrigin: string): this;

	/**
	 * Whether the XMLHttpRequest uses credentials such as cookies, authorization headers or TLS client certificates. See [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials).
	 * Note that this has no effect if you are loading files locally or from the same domain.
	 */
	setWithCredentials(value: boolean): this;

	/**
	 * @param path Set the base path for the asset.
	 */
	setPath(path: string): this;

	/**
	 * @param resourcePath Set the base path for dependent resources like textures.
	 */
	setResourcePath(resourcePath: string): this;

	/**
	 * @param requestHeader key: The name of the header whose value is to be set. value: The value to set as the body of the header.
	 * Set the [request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header) used in HTTP request.
	 */
	setRequestHeader(requestHeader: { [header: string]: string }): this;
}

/**
 * An object with several loader utility functions.
 */
export interface LoaderUtils {
	/**
	 * The function takes a stream of bytes as input and returns a string representation.
	 * @param array A stream of bytes as a typed array.
	 */
	decodeText(array: BufferSource): string;

	/**
	 * Extract the base from the URL.
	 * @param url The url to extract the base url from.
	 */
	extractUrlBase(url: string): string;

	/**
	 * Resolves relative urls against the given path. Absolute paths, data urls, and blob urls will be returned as is. Invalid urls will return an empty string.
	 * @param url The absolute or relative url resolve.
	 * @param path The base path for relative urls to be resolved against.
	 */
	resolveURL(url: string, path: string): string;
}

/**
 * Handles and keeps track of loaded and pending data. A default global instance of this class is created and used by loaders if not supplied manually - see [DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DefaultLoadingManager).
 * In general that should be sufficient, however there are times when it can be useful to have separate loaders -
 * for example if you want to show separate loading bars for objects and textures.
 *
 * ### Code Example
 * This example shows how to use LoadingManager to track the progress of [OBJLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/OBJLoader).
 * ```js
 * const manager = new THREE.LoadingManager();
 * manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
 * 	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
 * };
 * manager.onLoad = function ( ) {
 * 	console.log( 'Loading complete!');
 * };
 * manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
 * 	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
 * };
 * manager.onError = function ( url ) {
 * 	console.log( 'There was an error loading ' + url );
 * };
 * const loader = new THREE.OBJLoader( manager );
 * loader.load( 'file.obj', function ( object ) {
 * 		console.log( object);
 * });
 * ```
 * In addition to observing progress, a LoadingManager can be used to override resource URLs during loading. This may be helpful for assets coming from drag-and-drop events, WebSockets, WebRTC, or other APIs. An example showing how to load an in-memory model using Blob URLs is below.
 * ```js
 * // Blob or File objects created when dragging files into the webpage.
 * const blobs = {'fish.gltf': blob1, 'diffuse.png': blob2, 'normal.png': blob3};
 * const manager = new THREE.LoadingManager();
 * // Initialize loading manager with URL callback.
 * const objectURLs = [];
 * manager.setURLModifier( ( url ) => {
 * 	url = URL.createObjectURL( blobs[ url ] );
 * 	objectURLs.push( url );
 * 	return url;
 * });
 * // Load as usual, then revoke the blob URLs.
 * const loader = new THREE.GLTFLoader( manager );
 * loader.load( 'fish.gltf', (gltf) => {
 * 	scene.add( gltf.scene );
 * 	objectURLs.forEach( ( url ) => URL.revokeObjectURL( url ) );
 * });
 * ```
 *
 * ### Examples
 * [WebGL / loader / fbx](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_fbx) |
 * [WebGL / loader / obj](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_obj) |
 * [WebGL / materials / physical / reflectivity](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_physical_reflectivity) |
 * [WebGL / postprocesing / outline](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_outline)
 */
export interface LoadingManager {
	/**
	 * Creates a new LoadingManager.
	 * @param onLoad this function will be called when all loaders are done.
	 * @param onProgress this function will be called when an item is complete.
	 * @param onError this function will be called a loader encounters errors.
	 */
	new (
		onLoad?: () => void,
		onProgress?: (url: string, loaded: number, total: number) => void,
		onError?: (url: string) => void
	): this;

	/**
	 * This function will be called when loading starts.
	 * By default this is undefined.
	 * The arguments are:
	 * - url - The url of the item just loaded.
	 * - itemsLoaded - the number  of items already loaded so far.
	 * - itemsTotal - the total amount of items to be loaded.
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
	 * - url The url of the item just loaded.
	 * - loaded The number of items already loaded so far.
	 * - total The total amount of items to be loaded.
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
	 * @param url The url to load
	 */
	resolveURL(url: string): string;

	/**
	 * @param url The url to load This should be called by any loader using the manager when the loader starts loading an url.
	 */
	itemStart(url: string): void;

	/**
	 * @param url The loaded url This should be called by any loader using the manager when the loader ended loading an url.
	 */
	itemEnd(url: string): void;

	/**
	 * @param url The loaded url This should be called by any loader using the manager when the loader errors loading an url.
	 */
	itemError(url: string): void;

	/**
	 * Registers a loader with the given regular expression. Can be used to define what loader should be used in order to load specific files. A typical use case is to overwrite the default loader for textures. add handler for TGA textures manager.addHandler( /\.tga$/i, new TGALoader() );
	 * @param regex A regular expression.
	 * @param loader The loader.
	 */
	addHandler(regex: RegExp, loader: Loader): this;

	/**
	 * Removes the loader for the given regular expression.
	 * @param regex A regular expression.
	 */
	removeHandler(regex: RegExp): this;

	/**
	 * Can be used to retrieve the registered loader for the given file path.
	 * @param file The file path.
	 */
	getHandler(file: string): Loader | null;
}

/**
 * A loader for loading a [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material) in JSON format.
 * This uses the [FileLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FileLoader) internally for loading files.
 *
 * ### Code Example
 * ```js
 * // instantiate a loader
 * const loader = new THREE.MaterialLoader();
 * // load a resource
 * loader.load(
 * 	'path/to/material.json', // resource URL
 * 	function ( material ) { // onLoad callback
 * 		object.material = material;
 * 	},
 * 	function ( xhr ) { // onProgress callback
 * 		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
 * 	},
 * 	function ( err ) { // onError callback
 * 		console.log( 'An error happened' );
 * 	}
 * );
 * ```
 *
 */
export interface MaterialLoader extends Loader {
	/**
	 * Creates a new MaterialLoader.
	 * @param manager The [loadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager) for the loader to use. Default is [THREE.DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager).
	 */
	new (manager?: LoadingManager): this;

	/**
	 * @default {}
	 */
	textures: { [key: string]: Texture };

	/**
	 * Begin loading from url.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onLoad Will be called when load completes. The argument will be the loaded [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 * @param onError Will be called when load errors.
	 */
	load(
		url: string,
		onLoad: (material: Material) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: Error | ErrorEvent) => void
	): void;

	/**
	 * Begin loading from url.
	 *
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Material>;

	/**
	 * @param textures object containing any textures used by the material.
	 */
	setTextures(textures: { [key: string]: Texture }): this;

	/**
	 * @param json The json object containing the parameters of the Material.
	 * Parse a <em>JSON</em> structure and create a new [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material) of the type [json.type](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/String) with parameters defined in the json object.
	 */
	parse(json: any): Material;
}

/**
 * A loader for loading a JSON resource in the [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4).
 * This uses the [FileLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FileLoader) internally for loading files.
 *
 * ### Examples
 * [WebGL / materials / lightmap](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_lightmap)
 *
 * ### Code Example
 * ```js
 * const loader = new THREE.ObjectLoader();
 * loader.load(
 * 	'models/json/example.json', // resource URL
 * 	function ( obj ) { // onLoad callback
 * 		// Here the loaded data is assumed to be an object.
 * 		// Add the loaded object to the scene
 * 		scene.add( obj );
 * 	},
 * 	function ( xhr ) { // onProgress callback
 * 		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
 * 	},
 * 	function ( err ) { // onError callback
 * 		console.error( 'An error happened' );
 * 	}
 * );
 * // Alternatively, to parse a previously loaded JSON structure
 * const object = loader.parse( a_json_object );
 * scene.add( object );
 * ```
 *
 * ### Ngx3Js Code Example
 *
 */
export interface ObjectLoader extends Loader {
	/**
	 * Creates a new ObjectLoader.
	 * @param manager The [loadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager) for the loader to use. Default is [THREE.DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager).
	 */
	new (manager?: LoadingManager): this;

	/**
	 * Begin loading from url and call onLoad with the parsed response content.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onLoad Will be called when load completes. The argument will be the loaded [object](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 * @param onError Will be called when load errors.
	 */
	load(
		url: string,
		onLoad?: <ObjectType extends Object3D>(object: ObjectType) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: Error | ErrorEvent) => void
	): void;

	/**
	 * Begin loading from url and call onLoad with the parsed response content.
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 */
	loadAsync<ObjectType extends Object3D>(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ObjectType>;

	/**
	 * Parse a <em>JSON</em> structure and return a threejs object.
	 * This is used internally by *.load*() but can also be used directly to parse a previously loaded JSON structure.
	 * @param json required. The JSON source to parse.
	 * @param onLoad Will be called when parsed completes. The argument will be the parsed [object](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D).
	 */
	parse<T extends Object3D>(json: any, onLoad?: (object: Object3D) => void): T;

	/**
	 * Parse a <em>JSON</em> structure and return a threejs object.
	 * This is used internally by *.load*() but can also be used directly to parse a previously loaded JSON structure.
	 * @param json required. The JSON source to parse.
	 */
	parseAsync<T extends Object3D>(json: any): Promise<T>;

	/**
	 * This is used by *.parse*() to parse any [geometries](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry) in the JSON structure.
	 * @param json required. The JSON source to parse.
	 */
	parseGeometries(json: any): { [key: string]: InstancedBufferGeometry | BufferGeometry }; // Array of BufferGeometry or Geometry or Geometry2.

	/**
	 * This is used by *.parse*() to parse any materials in the JSON structure using [MaterialLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MaterialLoader).
	 * @param json required. The JSON source to parse.
	 */
	parseMaterials(json: any, textures: Texture[]): Material[]; // Array of Classes that inherits from Matrial.

	/**
	 * This is used by *.parse*() to parse any animations in the JSON structure, using [AnimationClip.parse](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationClip.parse)().
	 * @param json required. The JSON source to parse.
	 */
	parseAnimations(json: any): AnimationClip[];

	/**
	 * This is used by *.parse*() to parse any images in the JSON structure, using [ImageLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ImageLoader).
	 * @param json required. The JSON source to parse.
	 */
	parseImages(json: any, onLoad: () => void): { [key: string]: HTMLImageElement };

	/**
	 * This is used by *.parse*() to parse any images in the JSON structure, using [ImageLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ImageLoader).
	 * @param json required. The JSON source to parse.
	 */
	parseImagesAsync(json: any): Promise<{ [key: string]: HTMLImageElement }>;

	/**
	 * This is used by *.parse*() to parse any textures in the JSON structure.
	 * @param json required. The JSON source to parse.
	 */
	parseTextures(json: any, images: any): Texture[];

	/**
	 * This is used by *.parse*() to parse any 3D objects in the JSON structure.
	 * @param json required. The JSON source to parse.
	 * @param geometries required. The geometries of the JSON.
	 * @param materials required. The materials of the JSON.
	 * @param animations required. The animations of the JSON.
	 */
	parseObject<T extends Object3D>(data: any, geometries: any[], materials: Material[], animations: AnimationClip[]): T;
}

/**
 * Class for loading a [texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture).
 * This uses the [ImageLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ImageLoader) internally for loading files.
 *
 * ### Examples
 * [geometry / cube](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_cube)
 *
 * ### Code Example
 * ```js
 * const texture = new THREE.TextureLoader().load( 'textures/land_ocean_ice_cloud_2048.jpg' );
 * // immediately use the texture for material creation
 * const material = new THREE.MeshBasicMaterial( { map: texture } );
 * ```
 *
 * ### Code Example with Callbacks
 * ```js
 * // instantiate a loader
 * const loader = new THREE.TextureLoader();
 * // load a resource
 * loader.load(
 * 	'textures/land_ocean_ice_cloud_2048.jpg', // resource URL
 * 	function ( texture ) { // onLoad callback
 * 		// in this example we create the material when the texture is loaded
 * 		const material = new THREE.MeshBasicMaterial( { map: texture  } );
 * 	},
 * 	undefined, // onProgress callback currently not supported
 * 	function ( err ) { // onError callback
 * 		console.error( 'An error happened.' );
 * 	}
 * );
 * ```
 *
 * Please note three.js r84 dropped support for TextureLoader progress events. For a TextureLoader that supports progress events, see [this thread](https://github.com/mrdoob/three.js/issues/10439#issuecomment-293260145).
 */
export interface TextureLoader extends Loader {
	/**
	 * Creates a new TextureLoader.
	 * @param manager The [loadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager) for the loader to use. Default is [THREE.DefaultLoadingManager](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LoadingManager).
	 */
	new (manager?: LoadingManager): this;

	/**
	 * Begin loading from the given URL and pass the fully loaded [texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) to onLoad. The method also returns a new texture object which can directly be used for material creation.
	 * If you do it this way, the texture may pop up in your scene once the respective loading process is finished.
	 *
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onLoad Will be called when load completes. The argument will be the loaded [texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 * @param onError Will be called when load errors.
	 */
	load(
		url: string,
		onLoad?: (texture: Texture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): Texture;

	/**
	 * Begin loading from the given URL and pass the fully loaded [texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) to onLoad. The method also returns a new texture object which can directly be used for material creation.
	 * If you do it this way, the texture may pop up in your scene once the respective loading process is finished.
	 *
	 * @param url The path or URL to the file. This can also be a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 * @param onProgress Will be called while load progresses. The argument will be the XMLHttpRequest instance, which contains .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) and .[loaded](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) bytes. If the server does not set the Content-Length header; .[total](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) will be 0.
	 */
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Texture>;
}
