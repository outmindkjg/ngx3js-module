import {
	AnimationClip,
	BufferAttribute,
	BufferGeometry,
	Camera,
	CanvasTexture,
	Color,
	CompressedPixelFormat,
	CompressedTexture,
	CompressedTextureLoader,
	CubeTexture,
	DataTexture,
	DataTexture3D,
	DataTextureLoader,
	FileLoader,
	Group,
	ImageBitmapLoader,
	InterleavedBufferAttribute,
	Loader,
	LoadingManager,
	Mapping,
	Material,
	Mesh,
	Object3D,
	PixelFormat,
	Points,
	Scene,
	Shape,
	ShapePath,
	Side,
	Skeleton,
	SkinnedMesh,
	Texture,
	TextureDataType,
	TextureEncoding,
	TextureLoader,
	Vector2,
	Vector3,
	WebGLRenderer,
	Wrapping,
} from '../index';
import { Volume } from './misc';

export interface Rhino3dmLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (object: Object3D) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Object3D>;
	parse(data: ArrayBufferLike, onLoad: (object: Object3D) => void, onError?: (event: ErrorEvent) => void): void;
	setLibraryPath(path: string): Rhino3dmLoader;
	setWorkerLimit(workerLimit: number): Rhino3dmLoader;
	dispose(): Rhino3dmLoader;
}

export interface ThreeMFLoader extends Loader {
	new (manager?: LoadingManager): this;
	availableExtensions: object[];

	load(
		url: string,
		onLoad: (object: Group) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>;
	parse(data: ArrayBuffer): Group;
	addExtension(extension: object): void;
}

export interface AMFLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (object: Group) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>;
	parse(data: ArrayBuffer): Group;
}

export interface BVH {
	clip: AnimationClip;
	skeleton: Skeleton;
}

export interface BVHLoader extends Loader {
	new (manager?: LoadingManager): this;
	animateBonePositions: boolean;
	animateBoneRotations: boolean;

	load(
		url: string,
		onLoad: (bvh: BVH) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<BVH>;
	parse(text: string): BVH;
}

export interface BasisTextureLoader extends Loader {
	new (manager?: LoadingManager): this;
	transcoderBinary: ArrayBuffer | null;
	transcoderPath: string;
	transcoderPending: Promise<void> | null;

	workerConfig: {
		format: number;
		astcSupported: boolean;
		etcSupported: boolean;
		dxtSupported: boolean;
		pvrtcSupported: boolean;
	};
	workerLimit: number;
	workerNextTaskID: number;
	workerPool: object[];
	workerSourceURL: string;

	detectSupport(renderer: WebGLRenderer): this;
	load(
		url: string,
		onLoad: (texture: CompressedTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<CompressedTexture>;
	setTranscoderPath(path: string): this;
	setWorkerLimit(workerLimit: number): this;
	dispose(): void;
}

export interface Collada {
	kinematics: object;
	library: object;
	scene: Scene;
}

export interface ColladaLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (collada: Collada) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Collada>;
	parse(text: string, path: string): Collada;
}

export interface DDS {
	mipmaps: object[];
	width: number;
	height: number;
	format: PixelFormat | CompressedPixelFormat;
	mipmapCount: number;
	isCubemap: boolean;
}

export interface DDSLoader extends CompressedTextureLoader {
	new (manager?: LoadingManager): this;

	parse(buffer: ArrayBuffer, loadMipmaps: boolean): DDS;
}

export interface DRACOLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (geometry: BufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<BufferGeometry>;
	setDecoderPath(path: string): DRACOLoader;
	setDecoderConfig(config: object): DRACOLoader;
	setWorkerLimit(workerLimit: number): DRACOLoader;
	preload(): DRACOLoader;
	dispose(): DRACOLoader;
}

export interface EXR {
	header: object;
	width: number;
	height: number;
	data: Float32Array;
	format: PixelFormat;
	type: TextureDataType;
}

export interface EXRLoader extends DataTextureLoader {
	new (manager?: LoadingManager): this;
	type: TextureDataType;

	parse(buffer: ArrayBuffer): EXR;
	setDataType(type: TextureDataType): this;
}

export interface FBXLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (object: Group) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>;
	parse(FBXBuffer: ArrayBuffer | string, path: string): Group;
}

export interface FontLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad?: (responseFont: Font) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Font>;
	parse(json: any): Font;
}

export interface Font {
	new (jsondata: any): this;

	/**
	 * @default 'Font'
	 */
	type: string;

	data: string;

	generateShapes(text: string, size: number): Shape[];
}

export interface GCodeLoader extends Loader {
	new (manager?: LoadingManager): this;
	splitLayer: boolean;

	load(
		url: string,
		onLoad: (object: Group) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>;
	parse(data: string): Group;
}

export interface GLTF {
	animations: AnimationClip[];
	scene: Group;
	scenes: Group[];
	cameras: Camera[];
	asset: {
		copyright?: string | undefined;
		generator?: string | undefined;
		version?: string | undefined;
		minVersion?: string | undefined;
		extensions?: any;
		extras?: any;
	};
	parser: GLTFParser;
	userData: any;
}

export interface GLTFLoader extends Loader {
	new (manager?: LoadingManager): this;
	dracoLoader: DRACOLoader | null;

	load(
		url: string,
		onLoad: (gltf: GLTF) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<GLTF>;

	setDRACOLoader(dracoLoader: DRACOLoader): GLTFLoader;

	register(callback: (parser: GLTFParser) => GLTFLoaderPlugin): GLTFLoader;
	unregister(callback: (parser: GLTFParser) => GLTFLoaderPlugin): GLTFLoader;

	setKTX2Loader(ktx2Loader: KTX2Loader): GLTFLoader;
	setMeshoptDecoder(meshoptDecoder: /* MeshoptDecoder */ any): GLTFLoader;

	parse(
		data: ArrayBuffer | string,
		path: string,
		onLoad: (gltf: GLTF) => void,
		onError?: (event: ErrorEvent) => void
	): void;

	parseAsync(data: ArrayBuffer | string, path: string): Promise<void>;
}

export type GLTFReferenceType = 'materials' | 'nodes' | 'textures' | 'meshes';

export interface GLTFReference {
	materials?: number;
	nodes?: number;
	textures?: number;
	meshes?: number;
}

export interface GLTFParser {
	json: any;

	options: {
		path: string;
		manager: LoadingManager;
		ktx2Loader: KTX2Loader;
		meshoptDecoder: /* MeshoptDecoder */ any;
		crossOrigin: string;
		requestHeader: { [header: string]: string };
	};

	fileLoader: FileLoader;
	textureLoader: TextureLoader | ImageBitmapLoader;
	plugins: GLTFLoaderPlugin;
	extensions: { [name: string]: any };
	associations: Map<Object3D | Material | Texture, GLTFReference>;

	getDependency: (type: string, index: number) => Promise<any>;
	getDependencies: (type: string) => Promise<any[]>;
	loadBuffer: (bufferIndex: number) => Promise<ArrayBuffer>;
	loadBufferView: (bufferViewIndex: number) => Promise<ArrayBuffer>;
	loadAccessor: (accessorIndex: number) => Promise<BufferAttribute | InterleavedBufferAttribute>;
	loadTexture: (textureIndex: number) => Promise<Texture>;
	loadTextureImage: (
		textureIndex: number,
		/**
		 * GLTF.Image
		 * See: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/schema/image.schema.json
		 */
		source: { [key: string]: any },
		loader: Loader
	) => Promise<Texture>;
	assignTexture: (
		materialParams: { [key: string]: any },
		mapName: string,
		mapDef: {
			index: number;
			texCoord?: number | undefined;
			extensions?: any;
		}
	) => Promise<void>;
	assignFinalMaterial: (object: Mesh) => void;
	getMaterialType: () => any;
	loadMaterial: (materialIndex: number) => Promise<Material>;
	createUniqueName: (originalName: string) => string;
	createNodeMesh: (nodeIndex: number) => Promise<Group | Mesh | SkinnedMesh>;
	loadGeometries: (
		/**
		 * GLTF.Primitive[]
		 * See: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/schema/mesh.primitive.schema.json
		 */
		primitives: Array<{ [key: string]: any }>
	) => Promise<BufferGeometry[]>;
	loadMesh: (meshIndex: number) => Promise<Group | Mesh | SkinnedMesh>;
	loadCamera: (cameraIndex: number) => Promise<Camera>;
	loadSkin: (skinIndex: number) => Promise<{
		joints: number[];
		inverseBindMatrices?: BufferAttribute | InterleavedBufferAttribute | undefined;
	}>;
	loadAnimation: (animationIndex: number) => Promise<AnimationClip>;
	loadNode: (nodeIndex: number) => Promise<Object3D>;
	loadScene: () => Promise<Group>;
}

export interface GLTFLoaderPlugin {
	beforeRoot?: (() => Promise<void> | null) | undefined;
	afterRoot?: ((result: GLTF) => Promise<void> | null) | undefined;
	loadMesh?: ((meshIndex: number) => Promise<Group | Mesh | SkinnedMesh> | null) | undefined;
	loadBufferView?: ((bufferViewIndex: number) => Promise<ArrayBuffer> | null) | undefined;
	loadMaterial?: ((materialIndex: number) => Promise<Material> | null) | undefined;
	loadTexture?: ((textureIndex: number) => Promise<Texture> | null) | undefined;
	getMaterialType?: ((materialIndex: number) => any | null) | undefined;
	extendMaterialParams?:
		| ((materialIndex: number, materialParams: { [key: string]: any }) => Promise<any> | null)
		| undefined;
	createNodeMesh?: ((nodeIndex: number) => Promise<Group | Mesh | SkinnedMesh> | null) | undefined;
	createNodeAttachment?: ((nodeIndex: number) => Promise<Object3D> | null) | undefined;
}

export interface HDRCubeTextureLoader extends Loader {
	new (manager?: LoadingManager): this;
	hdrLoader: RGBELoader;
	type: TextureDataType;

	load(
		urls: string[],
		onLoad: (texture: CubeTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): CubeTexture;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<CubeTexture>;
	setDataType(type: TextureDataType): this;
}

interface IFCLoader extends Loader {
	ifcManager: IFCManager;

	new (manager?: LoadingManager): this;

	load(
		url: any,
		onLoad: (ifc: IFCModel) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;

	parse(buffer: ArrayBuffer): Promise<IFCModel>;
}

export interface LoaderSettings {
	COORDINATE_TO_ORIGIN: boolean;
	USE_FAST_BOOLS: boolean;
	CIRCLE_SEGMENTS_LOW?: number;
	CIRCLE_SEGMENTS_MEDIUM?: number;
	CIRCLE_SEGMENTS_HIGH?: number;
}

export interface IFCManager {
	parse(buffer: ArrayBuffer): Promise<IFCModel>;

	/**
	 * Sets the relative path of web-ifc.wasm file in the project.
	 * Beware: you **must** serve this file in your page; this means that you have to copy this files from *node_modules/web-ifc* to your deployment directory.
	 *
	 * If you don't use this methods, IFC.js assumes that you are serving it in the root directory.
	 *
	 * Example if web-ifc.wasm is in dist/wasmDir:
	 * `ifcLoader.setWasmPath("dist/wasmDir/") : this;`
	 *
	 * @path Relative path to web-ifc.wasm.
	 */
	setWasmPath(path: string): void;

	/**
	 * Applies a configuration for [web-ifc](https://ifcjs.github.io/info/docs/Guide/web-ifc/Introduction).
	 */
	applyWebIfcConfig(settings: LoaderSettings): void;

	/**
	 * Enables the JSON mode (which consumes way less memory) and eliminates the WASM data.
	 * Only use this in the following scenarios:
	 * - If you don't need to access the properties of the IFC
	 * - If you will provide the properties as JSON.
	 */
	useJSONData(useJSON?: boolean): void;

	/**
	 * Adds the properties of a model as JSON data.
	 * @modelID ID of the IFC model.
	 * @data: data as an object where the keys are the expressIDs and the values the properties.
	 */
	addModelJSONData(
		modelID: number,
		data: {
			[id: number]: JSONObject;
		}
	): void;

	/**
	 * Completely releases the WASM memory, thus drastically decreasing the memory use of the app.
	 * Only use this in the following scenarios:
	 * - If you don't need to access the properties of the IFC
	 * - If you will provide the properties as JSON.
	 */
	disposeMemory(): void;

	/**
	 * Makes object picking a lot faster
	 * Courtesy of gkjohnson's [work](https://github.com/gkjohnson/three-mesh-bvh).
	 * Import these objects from his library and pass them as arguments. IFC.js takes care of the rest!
	 */
	setupThreeMeshBVH(computeBoundsTree: any, disposeBoundsTree: any, acceleratedRaycast: any): void;

	/**
	 * Closes the specified model and deletes it from the [scene](https://threejs.org/docs/#api/en/scenes/Scene).
	 * @modelID ID of the IFC model.
	 * @scene Scene where the model is (if it's located in a scene).
	 */
	close(modelID: number, scene?: Scene): void;

	/**
	 * Gets the **Express ID** to which the given face belongs.
	 * This ID uniquely identifies this entity within this IFC file.
	 * @geometry The geometry of the IFC model.
	 * @faceIndex The index of the face of a geometry.You can easily get this index using the [Raycaster](https://threejs.org/docs/#api/en/core/Raycaster).
	 */
	getExpressId(geometry: BufferGeometry, faceIndex: number): number | undefined;

	/**
	 * Returns all items of the specified type. You can import the types from *web-ifc*.
	 *
	 * Example to get all the standard walls of a project:
	 * ```js
	 * import { IFCWALLSTANDARDCASE } from 'web-ifc';
	 * const walls = ifcLoader.getAllItemsOfType(IFCWALLSTANDARDCASE) : this;
	 * ```
	 * @modelID ID of the IFC model.
	 * @ifcType type of IFC items to get.
	 * @verbose If false (default), this only gets IDs. If true, this also gets the native properties of all the fetched items.
	 */
	getAllItemsOfType(modelID: number, type: number, verbose: boolean): any[];

	/**
	 * Gets the native properties of the given element.
	 * @modelID ID of the IFC model.
	 * @id Express ID of the element.
	 * @recursive Wether you want to get the information of the referenced elements recursively.
	 */
	getItemProperties(modelID: number, id: number, recursive?: boolean): any;

	/**
	 * Gets the [property sets](https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifckernel/lexical/ifcpropertyset.htm) assigned to the given element.
	 * @modelID ID of the IFC model.
	 * @id Express ID of the element.
	 * @recursive If true, this gets the native properties of the referenced elements recursively.
	 */
	getPropertySets(modelID: number, id: number, recursive?: boolean): any[];

	/**
	 * Gets the properties of the type assigned to the element.
	 * For example, if applied to a wall (IfcWall), this would get back the information contained in the IfcWallType assigned to it, if any.
	 * @modelID ID of the IFC model.
	 * @id Express ID of the element.
	 * @recursive If true, this gets the native properties of the referenced elements recursively.
	 */
	getTypeProperties(modelID: number, id: number, recursive?: boolean): any[];

	/**
	 * Gets the materials assigned to the given element.
	 * @modelID ID of the IFC model.
	 * @id Express ID of the element.
	 * @recursive If true, this gets the native properties of the referenced elements recursively.
	 */
	getMaterialsProperties(modelID: number, id: number, recursive?: boolean): any[];

	/**
	 * Gets the ifc type of the specified item.
	 * @modelID ID of the IFC model.
	 * @id Express ID of the element.
	 */
	getIfcType(modelID: number, id: number): string;

	/**
	 * Gets the spatial structure of the project. The
	 * [spatial structure](https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifcproductextension/lexical/ifcspatialstructureelement.htm) is the hierarchical structure that organizes every IFC project (all physical items are referenced to an element of the spatial structure). It is formed by one IfcProject that contains one or more IfcSites, that contain one or more IfcBuildings, that contain one or more IfcBuildingStoreys, that contain one or more IfcSpaces.
	 * @modelID ID of the IFC model.
	 */
	getSpatialStructure(modelID: number): {
		expressID: number;
		type: string;
		children: never[];
	};

	/**
	 * Gets the mesh of the subset with the specified [material](https://threejs.org/docs/#api/en/materials/Material).
	 * If no material is given, this returns the subset with the original materials.
	 * @modelID ID of the IFC model.
	 * @material Material assigned to the subset (if any).
	 */
	getSubset(modelID: number, material?: Material): Mesh | null;

	/**
	 * Removes the specified subset.
	 * @modelID ID of the IFC model.
	 * @parent The parent where the subset is (can be any `THREE.Object3D`).
	 * @material Material assigned to the subset, if any.
	 */
	removeSubset(modelID: number, parent?: Object3D, material?: Material): void;

	/**
	 * Creates a new geometric subset.
	 * @config A configuration object with the following options:
	 * - **scene**: `THREE.Object3D` where the model is located.
	 * - **modelID**: ID of the model.
	 * - **ids**: Express IDs of the items of the model that will conform the subset.
	 * - **removePrevious**: wether to remove the previous subset of this model with this material.
	 * - **material**: (optional) wether to apply a material to the subset
	 */
	createSubset(config: HighlightConfigOfModel): void | Mesh;

	/**
	 * Hides the selected items in the specified model
	 * @modelID ID of the IFC model.
	 * @ids Express ID of the elements.
	 */
	hideItems(modelID: number, ids: number[]): void;

	/**
	 * Hides all the items of the specified model
	 * @modelID ID of the IFC model.
	 */
	hideAllItems(modelID: number): void;

	/**
	 * Shows all the items of the specified model
	 * @modelID ID of the IFC model.
	 * @ids Express ID of the elements.
	 */
	showItems(modelID: number, ids: number[]): void;

	/**
	 * Shows all the items of the specified model
	 * @modelID ID of the IFC model.
	 */
	showAllItems(modelID: number): void;
}

/**
 * Represents an IFC model. This object is returned by the `IFCLoader` after loading an IFC.
 * @geometry `THREE.Buffergeometry`, see Three.js documentation.
 * @materials `THREE.Material[]`, see Three.js documentation.
 * @manager contains all the logic to work with IFC.
 */
export interface IFCModel extends Mesh {
	modelID: number;
	ifcManager: IFCManager | null;
	setIFCManager(manager: IFCManager): void;
}

export interface IdAttributeByMaterial {
	[id: number]: number;
}
export interface IdAttributesByMaterials {
	[materialID: string]: IdAttributeByMaterial;
}
export interface merge {
	(geoms: BufferGeometry[], createGroups?: boolean): BufferGeometry;
}
export interface newFloatAttr {
	(data: any[], size: number): BufferAttribute;
}
export interface newIntAttr {
	(data: any[], size: number): BufferAttribute;
}

export interface HighlightConfig {
	scene: Object3D;
	ids: number[];
	removePrevious: boolean;
	material?: Material;
}

export interface HighlightConfigOfModel extends HighlightConfig {
	modelID: number;
}

export interface SelectedItems {
	[matID: string]: {
		ids: Set<number>;
		mesh: Mesh;
	};
}
export interface MapFaceindexID {
	[key: number]: number;
}
export interface IdGeometries {
	[expressID: number]: BufferGeometry;
}
export interface GeometriesByMaterial {
	material: Material;
	geometries: IdGeometries;
}

export interface GeometriesByMaterials {
	[materialID: string]: GeometriesByMaterial;
}

export interface TypesMap {
	[key: number]: number;
}

export interface IfcModel {
	modelID: number;
	mesh: IfcMesh;
	items: GeometriesByMaterials;
	types: TypesMap;
	jsonData: {
		[id: number]: JSONObject;
	};
}

export interface JSONObject {
	expressID: number;
	type: string;

	[key: string]: any;
}

export interface IfcState {
	models: {
		[modelID: number]: IfcModel;
	};
	api: IfcAPI;
	useJSON: boolean;
	webIfcSettings?: LoaderSettings;
}

export interface IfcMesh extends Mesh {
	modelID: number;
}

export interface Node {
	expressID: number;
	type: string;
	children: Node[];
}

export interface pName {
	name: number;
	relating: string;
	related: string;
	key: string;
}

export interface PropsNames {
	aggregates: {
		name: number;
		relating: string;
		related: string;
		key: string;
	};
	spatial: {
		name: number;
		relating: string;
		related: string;
		key: string;
	};
	psets: {
		name: number;
		relating: string;
		related: string;
		key: string;
	};
	materials: {
		name: number;
		relating: string;
		related: string;
		key: string;
	};
	type: {
		name: number;
		relating: string;
		related: string;
		key: string;
	};
}

export interface IfcGeometry {
	GetVertexData(): number;

	GetVertexDataSize(): number;

	GetIndexData(): number;

	GetIndexDataSize(): number;
}

export interface RawLineData {
	ID: number;
	type: number;
	arguments: any[];
}

export interface VectorEx<T> {
	get(index: number): T;

	size(): number;
}

export interface FlatMesh {
	geometries: VectorEx<PlacedGeometry>;
	expressID: number;
}

export interface PlacedGeometry {
	color: {
		x: number;
		y: number;
		z: number;
		w: number;
	};
	geometryExpressID: number;
	flatTransformation: number[];
}

export interface IfcAPI {
	wasmModule: any;
	fs: any;

	/**
	 * Initializes the WASM module (WebIFCWasm), required before using any other functionality
	 */
	Init(): Promise<void>;

	/**
	 * Opens a model and returns a modelID number
	 * @data Buffer containing IFC data (bytes)
	 * @data Settings settings for loading the model
	 */
	OpenModel(data: string | Uint8Array, settings?: LoaderSettings): number;

	/**
	 * Creates a new model and returns a modelID number
	 * @data Settings settings for generating data the model
	 */
	CreateModel(settings?: LoaderSettings): number;

	ExportFileAsIFC(modelID: number): Uint8Array;

	/**
	 * Opens a model and returns a modelID number
	 * @modelID Model handle retrieved by OpenModel, model must not be closed
	 * @data Buffer containing IFC data (bytes)
	 */
	GetGeometry(modelID: number, geometryExpressID: number): IfcGeometry;

	GetLine(modelID: number, expressID: number, flatten?: boolean): any;

	WriteLine(modelID: number, lineObject: any): void;

	FlattenLine(modelID: number, line: any): void;

	GetRawLineData(modelID: number, expressID: number): RawLineData;

	WriteRawLineData(modelID: number, data: RawLineData): any;

	GetLineIDsWithType(modelID: number, type: number): VectorEx<number>;

	GetAllLines(modelID: number): VectorEx<number>;

	SetGeometryTransformation(modelID: number, transformationMatrix: number[]): void;

	GetVertexArray(ptr: number, size: number): Float32Array;

	GetIndexArray(ptr: number, size: number): Uint32Array;

	getSubArray(heap: any, startPtr: any, sizeBytes: any): any;

	/**
	 * Closes a model and frees all related memory
	 * @modelID Model handle retrieved by OpenModel, model must not be closed
	 */
	CloseModel(modelID: number): void;

	StreamAllMeshes(modelID: number, meshCallback: (mesh: FlatMesh) => void): void;

	/**
	 * Checks if a specific model ID is open or closed
	 * @modelID Model handle retrieved by OpenModel
	 */
	IsModelOpen(modelID: number): boolean;

	/**
	 * Load all geometry in a model
	 * @modelID Model handle retrieved by OpenModel
	 */
	LoadAllGeometry(modelID: number): VectorEx<FlatMesh>;

	/**
	 * Load geometry for a single element
	 * @modelID Model handle retrieved by OpenModel
	 */
	GetFlatMesh(modelID: number, expressID: number): FlatMesh;

	SetWasmPath(path: string): void;
}

export { IFCLoader };

export interface KMZLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (kmz: Collada) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Collada>;
	parse(data: ArrayBuffer): Collada;
}

export interface KTX2Loader extends CompressedTextureLoader {
	new (manager?: LoadingManager): this;

	setTranscoderPath(path: string): KTX2Loader;
	setWorkerLimit(limit: number): KTX2Loader;
	detectSupport(renderer: WebGLRenderer): KTX2Loader;
	dispose(): KTX2Loader;

	parse(
		buffer: ArrayBuffer,
		onLoad: (texture: CompressedTexture) => void,
		onError?: (event: ErrorEvent) => void
	): KTX2Loader;
}

export interface KTX {
	mipmaps: object[];
	width: number;
	height: number;
	format: PixelFormat | CompressedPixelFormat;
	mipmapCount: number;
	isCubemap: boolean;
}

export interface KTXLoader extends CompressedTextureLoader {
	new (manager?: LoadingManager): this;

	parse(buffer: ArrayBuffer, loadMipmaps: boolean): KTX;
}

export interface LDrawLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (data: Group) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>;
	setFileMap(fileMap: Record<string, string>): void;
	setMaterials(materials: Material[]): void;

	parse(text: string, path: string, onLoad: (data: Group) => void): void;

	addMaterial(material: Material): void;
	getMaterial(colourCode: string): Material | null;
}

export interface LUT3dlResult {
	size: number;
	texture: DataTexture;
	texture3D: DataTexture3D;
}

export interface LUT3dlLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (result: LUT3dlResult) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: Error) => void
	): any;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<LUT3dlResult>;
	parse(data: string): LUT3dlResult;
}

export interface LUTCubeResult {
	title: string;
	size: number;
	domainMin: Vector3;
	domainMax: Vector3;
	texture: DataTexture;
	texture3D: DataTexture3D;
}

export interface LUTCubeLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (result: LUTCubeResult) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: Error) => void
	): any;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<LUTCubeResult>;
	parse(data: string): LUTCubeResult;
}

export interface LWO {
	materials: Material[];
	meshes: Object3D[];
}

export interface LWOLoaderParameters {
	/**
	 * Base content delivery folder path, use when it differs from Lightwave default structure
	 */
	resourcePath?: string;
}

export interface LWOLoader extends Loader {
	new (manager?: LoadingManager, parameters?: LWOLoaderParameters): this;

	load(
		url: string,
		onLoad: (lwo: LWO) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<LWO>;
	parse(data: ArrayBuffer, path: string, modelName: string): LWO;
}

export interface LogLuv {
	width: number;
	height: number;
	data: Uint16Array | Float32Array;
	format: PixelFormat;
	type: TextureDataType;
	flipY: boolean;
}
export interface LogLuvLoader extends DataTextureLoader {
    type: TextureDataType;
    new(manager: LoadingManager) : this;
    parse(buffer: Iterable<number>): LogLuv;
    setDataType(value: TextureDataType) : this;
}

export interface LottieLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (texture: CanvasTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<CanvasTexture>;

	setQuality(value: number): void;
}

export interface MD2Loader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (geometry: BufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<BufferGeometry>;
	parse(data: ArrayBuffer): BufferGeometry;
}

export interface MDD {
	morphTargets: BufferAttribute[];
	clip: AnimationClip;
}

export interface MDDLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (result: MDD) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<MDD>;
	parse(data: ArrayBuffer): MDD;
}

export interface MMDLoaderAnimationObject {
	animation: AnimationClip;
	mesh: SkinnedMesh;
}

export interface MMDLoader extends Loader {
	new (manager?: LoadingManager): this;
	animationBuilder: object;
	animationPath: string;
	loader: FileLoader;
	meshBuilder: object;
	parser: object | null;

	load(
		url: string,
		onLoad: (mesh: SkinnedMesh) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<SkinnedMesh>;
	loadAnimation(
		url: string,
		object: SkinnedMesh | Camera,
		onLoad: (object: SkinnedMesh | AnimationClip) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadPMD(
		url: string,
		onLoad: (object: object) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadPMX(
		url: string,
		onLoad: (object: object) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadVMD(
		url: string,
		onLoad: (object: object) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadVPD(
		url: string,
		isUnicode: boolean,
		onLoad: (object: object) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadWithAnimation(
		url: string,
		vmdUrl: string | string[],
		onLoad: (object: MMDLoaderAnimationObject) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	setAnimationPath(animationPath: string): this;
}

export interface MaterialCreatorOptions {
	/**
	 * side: Which side to apply the material
	 * THREE.FrontSide (default), THREE.BackSide, THREE.DoubleSide
	 */
	side?: Side | undefined;
	/*
	 * wrap: What type of wrapping to apply for textures
	 * THREE.RepeatWrapping (default), THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping
	 */
	wrap?: Wrapping | undefined;
	/*
	 * normalizeRGB: RGBs need to be normalized to 0-1 from 0-255
	 * Default: false, assumed to be already normalized
	 */
	normalizeRGB?: boolean | undefined;
	/*
	 * ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's
	 * Default: false
	 */
	ignoreZeroRGBs?: boolean | undefined;
	/*
	 * invertTrProperty: Use values 1 of Tr field for fully opaque. This option is useful for obj exported from 3ds MAX, vcglib or meshlab.
	 * Default: false
	 */
	invertTrProperty?: boolean | undefined;
}

export interface MTLLoader extends Loader {
	new (manager?: LoadingManager): this;
	materialOptions: MaterialCreatorOptions;

	load(
		url: string,
		onLoad: (materialCreator: MTLLoader.MaterialCreator) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	parse(text: string, path: string): MTLLoader.MaterialCreator;
	setMaterialOptions(value: MaterialCreatorOptions): void;

	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<MTLLoader.MaterialCreator>;
}

export interface MaterialInfo {
	ks?: number[] | undefined;
	kd?: number[] | undefined;
	ke?: number[] | undefined;
	map_kd?: string | undefined;
	map_ks?: string | undefined;
	map_ke?: string | undefined;
	norm?: string | undefined;
	map_bump?: string | undefined;
	bump?: string | undefined;
	map_d?: string | undefined;
	ns?: number | undefined;
	d?: number | undefined;
	tr?: number | undefined;
}

export interface TexParams {
	scale: Vector2;
	offset: Vector2;
	url: string;
}

export namespace MTLLoader {
	export interface MaterialCreator {
		new (baseUrl?: string, options?: MaterialCreatorOptions): this;

		baseUrl: string;
		options: MaterialCreatorOptions;
		materialsInfo: { [key: string]: MaterialInfo };
		materials: { [key: string]: Material };
		nameLookup: { [key: string]: number };
		side: Side;
		wrap: Wrapping;
		crossOrigin: string;

		setCrossOrigin(value: string): this;
		setManager(value: LoadingManager): void;
		setMaterials(materialsInfo: { [key: string]: MaterialInfo }): void;
		convert(materialsInfo: { [key: string]: MaterialInfo }): { [key: string]: MaterialInfo };
		preload(): void;
		getIndex(materialName: string): number;
		getAsArray(): Material[];
		create(materialName: string): Material;
		createMaterial_(materialName: string): Material;
		getTextureParams(value: string, matParams: any): TexParams;
		loadTexture(
			url: string,
			mapping?: Mapping,
			onLoad?: (bufferGeometry: BufferGeometry) => void,
			onProgress?: (event: ProgressEvent) => void,
			onError?: (event: ErrorEvent) => void
		): Texture;
	}
}

export interface NRRDLoader {
	new (manager?: LoadingManager): this;
	manager: LoadingManager;
	path: string;

	fieldFunctions: object;

	load(
		url: string,
		onLoad: (group: Volume) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	parse(data: string): Volume;
	parseChars(array: number[], start?: number, end?: number): string;
	setPath(value: string): this;
}

export interface OBJLoader extends Loader {
	new (manager?: LoadingManager): this;
	materials: MTLLoader.MaterialCreator;

	load(
		url: string,
		onLoad: (group: Group) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>;
	parse(data: string): Group;
	setMaterials(materials: MTLLoader.MaterialCreator): this;
}

export interface PCDLoader extends Loader {
	new (manager?: LoadingManager): this;
	littleEndian: boolean;

	load(
		url: string,
		onLoad: (points: Points) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Points>;
	parse(data: ArrayBuffer | string, url: string): Points;
}

export interface PDB {
	geometryAtoms: BufferGeometry;
	geometryBonds: BufferGeometry;
	json: {
		atoms: any[][];
	};
}

export interface PDBLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (pdb: PDB) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<PDB>;
	parse(text: string): PDB;
}

export interface PLYLoader extends Loader {
	new (manager?: LoadingManager): this;
	propertyNameMapping: object;

	load(
		url: string,
		onLoad: (geometry: BufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<BufferGeometry>;
	setPropertyNameMapping(mapping: object): void;
	parse(data: ArrayBuffer | string): BufferGeometry;
}

export interface PRWMLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (geometry: BufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<BufferGeometry>;
	parse(data: ArrayBuffer): BufferGeometry;

	isBigEndianPlatform(): boolean;
}

export interface PVR {
	mipmaps: object[];
	width: number;
	height: number;
	format: CompressedPixelFormat;
	mipmapCount: number;
	isCubemap: boolean;
}

export interface PVRLoader extends CompressedTextureLoader {
	new (manager?: LoadingManager): this;

	parse(buffer: ArrayBuffer, loadMipmaps: boolean): PVR;
}

export interface RGBE {
	width: number;
	height: number;
	data: Float32Array | Uint8Array;
	header: string;
	gamma: number;
	exposure: number;
	format: PixelFormat;
	type: TextureDataType;
}

export interface RGBELoader extends DataTextureLoader {
	new (manager?: LoadingManager): this;
	type: TextureDataType;

	parse(buffer: ArrayBuffer): RGBE;
	setDataType(type: TextureDataType): this;
}

export interface RGBM {
	width: number;
	height: number;
	data: Uint8Array;
	header: string;
	format: PixelFormat;
	type: TextureDataType;
	flipY: boolean;
	encoding: TextureEncoding;
}

export interface RGBMLoader extends DataTextureLoader {
	new (manager?: LoadingManager): this;

	loadCubemap(
		urls: string[],
		onLoad?: (texture: CubeTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): CubeTexture;

	parse(buffer: ArrayBuffer): RGBM;
}

export interface STLLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (geometry: BufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<BufferGeometry>;
	parse(data: ArrayBuffer | string): BufferGeometry;
}

export interface SVGResultPaths extends ShapePath {
	userData?:
		| {
				[key: string]: any;
		  }
		| undefined;
}

export interface SVGResult {
	paths: SVGResultPaths[];
	xml: XMLDocument;
}

export interface StrokeStyle {
	strokeColor: string;
	strokeWidth: number;
	strokeLineJoin: string;
	strokeLineCap: string;
	strokeMiterLimit: number;
}

export interface SVGLoader extends Loader {
	new (manager?: LoadingManager): this;

	defaultDPI: number;
	defaultUnit: string;

	load(
		url: string,
		onLoad: (data: SVGResult) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<SVGResult>;
	parse(text: string): SVGResult;

	getStrokeStyle(width?: number, color?: string, lineJoin?: string, lineCap?: string, miterLimit?: number): StrokeStyle;
	pointsToStroke(points: Vector3[], style: StrokeStyle, arcDivisions?: number, minDistance?: number): BufferGeometry;
	pointsToStrokeWithBuffers(
		points: Vector3[],
		style: StrokeStyle,
		arcDivisions?: number,
		minDistance?: number,
		vertices?: number[],
		normals?: number[],
		uvs?: number[],
		vertexOffset?: number
	): number;
	createShapes(shapePath: ShapePath): Shape[];
}

export interface TDSLoader extends Loader {
	new (manager?: LoadingManager): this;
	debug: boolean;
	group: Group;
	manager: LoadingManager;
	materials: Material[];
	meshes: Mesh[];
	position: number;

	load(
		url: string,
		onLoad: (object: Group) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>;
	parse(arraybuffer: ArrayBuffer, path: string): Group;

	debugMessage(message: object): void;
	endChunk(chunk: object): void;
	nextChunk(data: DataView, chunk: object): void;
	readByte(data: DataView): number;
	readChunk(data: DataView): object;
	readColor(data: DataView): Color;
	readDWord(data: DataView): number;
	readFaceArray(data: DataView, mesh: Mesh): void;
	readFile(arraybuffer: ArrayBuffer, path: string): void;
	readFloat(data: DataView): number;
	readInt(data: DataView): number;
	readMap(data: DataView, path: string): Texture;
	readMesh(data: DataView): Mesh;
	readMeshData(data: DataView, path: string): void;
	readMaterialEntry(data: DataView, path: string): void;
	readMaterialGroup(data: DataView): object;
	readNamedObject(data: DataView): void;
	readShort(data: DataView): number;
	readString(data: DataView, maxLength: number): string;
	readWord(data: DataView): number;
	resetPosition(): void;
}

export interface TGALoader extends DataTextureLoader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad?: (texture: DataTexture, texData: object) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): DataTexture;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<DataTexture>;
	parse(data: ArrayBuffer): DataTexture;
}

export interface TTFLoader extends Loader {
	new (manager?: LoadingManager): this;
	reversed: boolean;

	load(
		url: string,
		onLoad: (json: object) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<object>;
	parse(arraybuffer: ArrayBuffer): object;
}

export interface TiltLoader extends Loader {
	new (manager?: LoadingManager, assetUrl?: string): this;

	load(
		url: string,
		onLoad: (object: Group) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>;
	parse(data: ArrayBuffer): Group;
}

export interface Chunk {
	palette: number[];
	size: { x: number; y: number; z: number };
	data: Uint8Array;
}

export interface VOXLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (chunks: Chunk[]) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<object[]>;
	parse(data: ArrayBuffer): object[];
}

export interface VOXMesh extends Mesh {
	new (chunk: Chunk): this;
}

export interface VOXDataTexture3D extends DataTexture3D {
	new (chunk: Chunk): this;
}

export interface VRMLLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (scene: Scene) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Scene>;
	parse(data: string, path: string): Scene;
}

export interface VRMLoader extends Loader {
	new (manager?: LoadingManager): this;
	gltfLoader: GLTFLoader;

	load(
		url: string,
		onLoad: (scene: GLTF) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<GLTF>;
	parse(gltf: GLTF, onLoad: (scene: GLTF) => void): void;
	setDRACOLoader(dracoLoader: DRACOLoader): this;
}

export interface VTKLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (geometry: BufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<BufferGeometry>;
	parse(data: ArrayBuffer | string, path: string): BufferGeometry;
}

export interface XYZLoader extends Loader {
	new (manager?: LoadingManager): this;

	load(
		url: string,
		onLoad: (geometry: BufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<BufferGeometry>;
	parse(data: string, onLoad: (geometry: BufferGeometry) => void): object;
}

export interface NodeMaterialLoader extends Loader {
	new (manager?: LoadingManager, library?: any): this;
	load(
		url: string,
		onLoad: (geometry: Material) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	getObjectByName(uuid: string): any;
	getObjectById(uuid: string): any;
	getNode(uuid: string): any;
	resolve(json: any): any;
}
