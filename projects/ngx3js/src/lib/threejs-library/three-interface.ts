import * as O3JS from 'three';
import { AnimationAction, AnimationClip, AnimationMixer } from './three/animation';
import { Audio, PositionalAudio } from './three/audio';
import { Camera, OrthographicCamera, PerspectiveCamera } from './three/cameras';
import {
	GLSLVersion, MOUSE,
	TOUCH, TrianglesDrawModes
} from './three/constants';
import { BufferAttribute, BufferGeometry, Clock, EventDispatcher, InstancedBufferGeometry, InterleavedBufferAttribute, Object3D, Raycaster } from './three/core';
import { Curve, Shape, ShapePath } from './three/extras';
import { BoxGeometry, CircleGeometry, EdgesGeometry, ExtrudeGeometry, PlaneGeometry, WireframeGeometry } from './three/geometries';
import { Light, LightProbe, RectAreaLight } from './three/lights';
import { CompressedTextureLoader, DataTextureLoader, FileLoader, ImageBitmapLoader, Loader, LoadingManager, TextureLoader } from './three/loaders';
import { Material, MeshBasicMaterial, MeshDepthMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshStandardMaterial, RawShaderMaterial, ShaderMaterial, ShaderMaterialParameters } from './three/materials';
import { Box3, Color, ColorRepresentation, Euler, Frustum, Line3, Matrix3, Matrix4, Plane, Quaternion, Ray, Sphere, Triangle, Vector2, Vector3, Vector4 } from './three/math';
import { Bone, Group, InstancedMesh, Line, LineSegments, Mesh, Points, Skeleton, SkinnedMesh } from './three/objects';
import { IUniform, Renderer, Shader, WebGLCubeRenderTarget, WebGLRenderer, WebGLRenderTarget, WebGLRenderTargetOptions, WebGLShadowMap } from './three/renderers';
import { Scene } from './three/scenes';
import { CanvasTexture, CompressedTexture, CubeTexture, DataTexture, DataTexture3D, Texture } from './three/textures';


export * from './three/animation';
export * from './three/audio';
export * from './three/cameras';
export * from './three/constants';
export * from './three/core';
export * from './three/examples';
export * from './three/extras';
export * from './three/geometries';
export * from './three/helpers';
export * from './three/lights';
export * from './three/loaders';
export * from './three/materials';
export * from './three/math';
export * from './three/objects';
export * from './three/renderers';
export * from './three/renderers-xr';
export * from './three/scenes';
export * from './three/textures';


export interface Stats {
	REVISION: number;
	dom: HTMLDivElement;
	addPanel(panel: Panel): Panel;
	showPanel(id: number): void;
	begin(): void;
	end(): void;
	update(): void;
	domElement: HTMLDivElement;
	setMode(id: number): void;
}

export interface CSM {
	new (data: any): this;
	camera: any;
	parent: any;
	cascades: any;
	maxFar: any;
	mode: any;
	shadowMapSize: any;
	shadowBias: any;
	lightDirection: any;
	lightIntensity: any;
	lightNear: any;
	lightFar: any;
	lightMargin: any;
	customSplitsCallback: any;
	fade: boolean;
	mainFrustum: Frustum;
	frustums: any[];
	breaks: any[];
	lights: any[];
	shaders: Map<any, any>;
	createLights(): void;
	initCascades(): void;
	updateShadowBounds(): void;
	getBreaks(): void;
	update(): void;
	injectInclude(): void;
	setupMaterial(material: any): void;
	updateUniforms(): void;
	getExtendedBreaks(target: any): void;
	updateFrustums(): void;
	remove(): void;
	dispose(): void;
}

export interface CSMHelper {
	new (csm: any): this;
	csm: any;
	displayFrustum: boolean;
	displayPlanes: boolean;
	displayShadowBounds: boolean;
	frustumLines: any;
	cascadeLines: any[];
	cascadePlanes: any[];
	shadowLines: any[];
	updateVisibility(): void;
	update(): void;
}

export interface Gyroscope extends Object3D {
	new (): this;
}

export interface PositionalAudioHelper extends Line {
	new (audio: PositionalAudio, range?: number, divisionsInnerAngle?: number, divisionsOuterAngle?: number): this;

	audio: PositionalAudio;
	range: number;
	divisionsInnerAngle: number;
	divisionsOuterAngle: number;

	dispose(): void;
	update(): void;
}

export interface RectAreaLightHelper extends Line {
	new (light: RectAreaLight, color?: ColorRepresentation): this;

	light: RectAreaLight;
	color: ColorRepresentation | undefined;

	dispose(): void;
}

export interface VertexNormalsHelper extends LineSegments {
	new (object: Object3D, size?: number, hex?: number): this;

	object: Object3D;
	size: number;

	update(): void;
}

export interface VertexTangentsHelper extends LineSegments {
	new (object: Object3D, size?: number, hex?: number): this;

	object: Object3D;
	size: number;

	update(): void;
}

export interface LightProbeGenerator {
	fromCubeTexture(cubeTexture: CubeTexture): LightProbe;
	fromCubeRenderTarget(renderer: WebGLRenderer, cubeRenderTarget: WebGLCubeRenderTarget): LightProbe;
}

export interface LensflareElement {
	new (texture: Texture, size?: number, distance?: number, color?: Color): this;
	texture: Texture;
	size: number;
	distance: number;
	color: Color;
}

/**
 * Imorph anim mesh
 */
export interface MorphAnimMesh extends Mesh {
	new (geometry: BufferGeometry, material: Material): this;
	mixer: AnimationMixer;
	activeAction: AnimationAction | null;

	setDirectionForward(): void;
	setDirectionBackward(): void;
	playAnimation(label: string, fps: number): void;
	updateAnimation(delta: number): void;
	copy(source: MorphAnimMesh): this;
}

export interface CinematicCamera extends PerspectiveCamera {
	new (fov: number, aspect: number, near: number, far: number): this;

	postprocessing: {
		enabled: boolean;
		scene: Scene;
		camera: OrthographicCamera;
		rtTextureDepth: WebGLRenderTarget;
		rtTextureColor: WebGLRenderTarget;
		bokeh_uniforms: any;
	};
	shaderSettings: {
		rings: number;
		samples: number;
	};
	materialDepth: ShaderMaterial;
	coc: number;
	aperture: number;
	fNumber: number;
	hyperFocal: number;
	filmGauge: number;

	linearize(depth: number): number;
	smoothstep(near: number, far: number, depth: number): number;
	saturate(x: number): number;
	focusAt(focusDistance: number): void;
	initPostProcessing(): void;
	renderCinematic(scene: Scene, renderer: WebGLRenderer): void;
	setLens(focalLength: number, frameHeight?: number, fNumber?: number, coc?: number): void;
}

export interface NURBSCurve extends Curve<Vector3> {
	new (
		degree: number,
		knots: number[],
		controlPoints: Vector2[] | Vector3[] | Vector4[],
		startKnot: number,
		endKnot: number
	): this;
}

export interface NURBSSurface {
	new (
		degree1: number,
		degree2: number,
		knots1: number[],
		knots2: number[],
		controlPoints: Vector2[][] | Vector3[][] | Vector4[][]
	): this;

	getPoint(t1: number, t2: number, target: Vector3): void;
}

export interface Capsule {
	new (start?: Vector3, end?: Vector3, radius?: number): this;
	start: Vector3;
	end: Vector3;
	radius: number;

	set(start: Vector3, end: Vector3, radius: number): this;
	clone(): Capsule;
	copy(capsule: Capsule): this;
	getCenter(target: number): Vector3;
	translate(v: Vector3): this;
	checkAABBAxis(
		p1x: number,
		p1y: number,
		p2x: number,
		p2y: number,
		minx: number,
		maxx: number,
		miny: number,
		maxy: number,
		radius: number
	): boolean;
	intersectsBox(box: Box3): boolean;
	lineLineMinimumPoints(line1: Line3, line2: Line3): Vector3[];
}

export interface Lut {
	new (colormap?: string, numberofcolors?: number): this;
	lut: Color[];
	map: object[];
	n: number;
	minV: number;
	maxV: number;

	set(value: Lut): this;
	setMin(min: number): this;
	setMax(max: number): this;
	setColorMap(colormap?: string, numberofcolors?: number): this;
	copy(lut: Lut): this;
	getColor(alpha: number): Color;
	addColorMap(colormapName: string, arrayOfColors: number[][]): void;
	createCanvas(): HTMLCanvasElement;
	updateCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement;
}

export interface ColorMapKeywords {
	rainbow: number[][];
	cooltowarm: number[][];
	blackbody: number[][];
	grayscale: number[][];
}

export interface MeshSurfaceSampler {
	distribution: Float32Array | null;
	geometry: BufferGeometry;
	positionAttribute: Float32Array;
	weightAttribute: string | null;

	new (mesh: Mesh): this;
	binarySearch(x: number): number;
	build(): this;
	sample(targetPosition: Vector3, targetNormal?: Vector3, targetColor?: Color): this;
	sampleFace(faceIndex: number, targetPosition: Vector3, targetNormal?: Vector3, targetColor?: Color): this;
	setWeightAttribute(name: string | null): this;
}

export interface OBB {
	center: Vector3;
	halfSize: Vector3;
	rotation: Matrix3;

	new (center?: Vector3, halfSize?: Vector3, rotation?: Matrix3): this;
	set(center: Vector3, halfSize: Vector3, rotation: Matrix3): this;
	copy(obb: OBB): this;
	clone(): this;
	getSize(result: Vector3): Vector3;
	clampPoint(point: Vector3, result: Vector3): Vector3;
	containsPoint(point: Vector3): boolean;
	intersectsBox3(box3: Box3): boolean;
	intersectsSphere(sphere: Sphere): boolean;
	intersectsOBB(obb: OBB, epsilon: number): boolean;
	intersectsPlane(plane: Plane): boolean;
	intersectRay(ray: Ray, result: Vector3): Vector3 | null;
	intersectsRay(ray: Ray): boolean;
	fromBox3(box3: Box3): this;
	equals(obb: OBB): boolean;
	applyMatrix4(matrix: Matrix4): this;
}

export interface Octree {
	new (box?: Box3): this;
	triangles: Triangle[];
	box: Box3;
	subTrees: Octree[];

	addTriangle(triangle: Triangle): this;
	calcBox(): this;
	split(level: number): this;
	build(): this;
	getRayTriangles(ray: Ray, triangles: Triangle[]): Triangle[];
	triangleCapsuleIntersect(capsule: Capsule, triangle: Triangle): any;
	triangleSphereIntersect(sphere: Sphere, triangle: Triangle): any;
	getSphereTriangles(sphere: Sphere, triangles: Triangle[]): Triangle[];
	getCapsuleTriangles(capsule: Capsule, triangles: Triangle[]): Triangle[];
	sphereIntersect(sphere: Sphere): any;
	capsuleIntersect(capsule: Capsule): any;
	rayIntersect(ray: Ray): any;
	fromGraphNode(group: Object3D): this;
}

export interface GPUComputationVariable {
	name: string;
	initialValueTexture: Texture;
	material: ShaderMaterial;
	dependencies: GPUComputationVariable[];
	renderTargets: WebGLRenderTarget[];
	wrapS: number;
	wrapT: number;
	minFilter: number;
	magFilter: number;
}

export interface GPUComputationRenderer {
	new (sizeX: number, sizeY: number, renderer: WebGLRenderer): this;

	setDataType(type: O3JS.TextureDataType): void;

	addIGPUComputationVariable(
		variableName: string,
		computeFragmentShader: string,
		initialValueTexture: Texture
	): GPUComputationVariable;
	setIGPUComputationVariableDependencies(
		variable: GPUComputationVariable,
		dependencies: GPUComputationVariable[] | null
	): void;

	init(): string | null;
	compute(): void;

	getCurrentRenderTarget(variable: GPUComputationVariable): WebGLRenderTarget;
	getAlternateRenderTarget(variable: GPUComputationVariable): WebGLRenderTarget;
	addResolutionDefine(materialShader: ShaderMaterial): void;
	createShaderMaterial(computeFragmentShader: string, uniforms?: { [uniform: string]: IUniform }): ShaderMaterial;
	createRenderTarget(
		sizeXTexture: number,
		sizeYTexture: number,
		wrapS: O3JS.Wrapping,
		wrapT: number,
		minFilter: O3JS.TextureFilter,
		magFilter: O3JS.TextureFilter
	): WebGLRenderTarget;
	createTexture(): O3JS.DataTexture;
	renderTexture(input: Texture, output: Texture): void;
	doRenderTarget(material: Material, output: WebGLRenderTarget): void;
}

export interface UVsDebug {
	(geometry: BufferGeometry, size: number): HTMLCanvasElement;
}

export interface Lensflare extends Mesh {
	new (): this;
	readonly isLensflare: true;

	addElement(element: LensflareElement): void;
	dispose(): void;
}

export interface LightProbeHelper extends Mesh {
	new (lightProbe: LightProbe, size: number): this;

	lightProbe: LightProbe;
	size: number;

	dispose(): void;
}

export interface Panel {
	new (name?: string, fg?: string, bg?: string): this;
	dom: HTMLCanvasElement;
	update(value: number, maxValue: number): void;
}

export interface NgxRawShaderMaterial extends RawShaderMaterial {
	new (parameters?: ShaderMaterialParameters, shaderId?: string, glslVersion?: GLSLVersion): this;
}

export interface NgxShaderMaterial extends ShaderMaterial {
	new (parameters?: ShaderMaterialParameters, shaderId?: string, glslVersion?: GLSLVersion): this;
}

export type XRAnimationLoopCallback = (time: number, frame?: O3JS.XRFrame) => void;

export type XRFrameRequestCallback = (time: number, frame: O3JS.XRFrame) => void;


export interface GeometryUtils {
	mergeBufferAttributes(attributes: BufferAttribute[]): BufferAttribute;
	mergeBufferGeometries(geometries: BufferGeometry[], useGroups?: boolean): BufferGeometry;
	interleaveAttributes(attributes: BufferAttribute[]): InterleavedBufferAttribute;
	estimateBytesUsed(geometry: BufferGeometry): number;
	mergeVertices(geometry: BufferGeometry, tolerance?: number): BufferGeometry;
	toTrianglesDrawMode(geometry: BufferGeometry, drawMode: TrianglesDrawModes): BufferGeometry;
	computeMorphedAttributes(object: Mesh | Line | Points): object;
	hilbert2D(
		center?: Vector3,
		size?: number,
		iterations?: number,
		v0?: number,
		v1?: number,
		v2?: number,
		v3?: number
	): Vector3[];
	hilbert3D(
		center?: Vector3,
		size?: number,
		iterations?: number,
		v0?: number,
		v1?: number,
		v2?: number,
		v3?: number,
		v4?: number,
		v5?: number,
		v6?: number,
		v7?: number
	): Vector3[];
	gosper(size?: number): number[];
}

export interface RoomEnvironment extends Scene {
	new (): this;
}

export interface NodeFlow {
	result: string;
	code: string;
	extra: object;
}

export interface Node {
	new (type?: string): this;

	uuid: string;
	name: string;
	type: string | undefined;
	userData: object;
	readonly isNode: true;
	frameId: number | undefined;
	hashProperties: string[] | undefined;

	analyze(builder: NodeBuilder, settings?: object): void;
	analyzeAndFlow(builder: NodeBuilder, output: string, settings?: object): NodeFlow;
	flow(builder: NodeBuilder, output: string, settings?: object): NodeFlow;
	build(builder: NodeBuilder, output: string, uuid?: string): string;
	generate(builder: NodeBuilder, output: string, uuid?: string, type?: string, ns?: string): string;
	appendDepsNode(builder: NodeBuilder, data: object, output: string): void;
	setName(name: string): this;
	getName(builder: NodeBuilder): string;
	getType(builder: NodeBuilder, output?: string): string;
	getJSONNode(meta?: object | string): object | undefined;
	getHash(): string;
	copy(source: Node): this;
	createJSONNode(meta?: object | string): object;
	toJSON(meta?: object | string): object;
}

export interface NodeBuilder {
	new (): this;

	slots: string[];
	caches: string[];
	contexts: object[];

	keywords: object;
	nodeData: object;

	requires: {
		uv: boolean[];
		color: boolean[];
		lights: boolean;
		fog: boolean;
		transparent: boolean;
		irradiance: boolean;
	};

	includes: {
		consts: object[];
		functions: object[];
		structs: object[];
	};

	attributes: object;
	prefixCode: string;

	parsCode: {
		vertex: string;
		fragment: string;
	};

	code: {
		vertex: string;
		fragment: string;
	};

	nodeCode: {
		vertex: string;
		fragment: string;
	};

	resultCode: {
		vertex: string;
		fragment: string;
	};

	finalCode: {
		vertex: string;
		fragment: string;
	};

	inputs: {
		uniforms: {
			list: object[];
			vertex: object[];
			fragment: object[];
		};
		vars: {
			varying: object[];
			vertex: object[];
			fragment: object[];
		};
	};

	defines: object;
	uniforms: object;
	extensions: object;
	updaters: object[];
	nodes: object[];

	analyzing: boolean;

	build(vertex: Node, fragment: Node): this;
	buildShader(shader: string, node: Node): void;
	setMaterial(material: Material, renderer: WebGLRenderer): this;
	addFlow(slot: string, cache?: string, context?: object): this;
	removeFlow(): this;
	addCache(name: string): this;
	removeCache(): this;
	addContext(context: object): this;
	removeContext(): this;
	addSlot(name: string): this;
	removeSlot(): this;
	addVertexCode(code: string): void;
	addFragmentCode(code: string): void;
	addCode(code: string, shader?: string): void;
	addVertexNodeCode(code: string): void;
	addFragmentNodeCode(code: string): void;
	addNodeCode(code: string, shader?: string): void;
	clearNodeCode(shader: string): string;
	clearVertexNodeCode(): string;
	clearFragmentNodeCode(): string;
	addVertexFinalCode(code: string): void;
	addFragmentFinalCode(code: string): void;
	addFinalCode(code: string, shader?: string): void;
	addVertexParsCode(code: string): void;
	addFragmentParsCode(code: string): void;
	addParsCode(code: string, shader?: string): void;
	addVaryCode(code: string): void;
	isCache(name: string): boolean;
	isSlot(name: string): boolean;
	define(name: string, value: any): void;
	isDefined(name: string): boolean;
	getVar(uuid: string, type: string, ns: string, labelOrShader?: string, prefix?: string, label?: string): object;
	getAttribute(name: string, type: string): any;
	getCode(shader: string): string;
	getVarListCode(vars: object[], prefix?: string): string;
	getVars(shader: string): object[];
	getNodeData(node: Node): object;
	createUniform(
		shader: string,
		type: string,
		node: Node,
		ns?: string,
		needsUpdate?: boolean,
		label?: string
	): NodeUniform;
	createVertexUniform(type: string, node: Node, ns?: string, needsUpdate?: boolean, label?: string): NodeUniform;
	createFragmentUniform(type: string, node: Node, ns?: string, needsUpdate?: boolean, label?: string): NodeUniform;
	include(node: Node, parent?: boolean, source?: string): void;
	colorToVectorProperties(color: string): string;
	colorToVector(color: string): string;
	getIncludes(type: string, shader: string): object[];
	getIncludesCode(type: string, shader: string): string;
	getConstructorFromLength(len: number): string;
	isTypeMatrix(format: string): boolean;
	getTypeLength(type: string): number;
	getTypeFromLength(len: number): string;
	findNode(): Node;
	resolve(): void;
	format(code: string, from: string, to: string): string;
	getTypeByFormat(format: string): string;
	getFormatByType(type: string): string;
	getUuid(uuid: string, useCache?: boolean): string;
	getElementByIndex(index: number): string;
	getIndexByElement(elm: string): number;
	isShader(shader: string): boolean;
	setShader(shader: string): this;
	mergeDefines(defines: object): object;
	mergeUniform(uniforms: object): object;
	getTextureEncodingFromMap(map: Texture): O3JS.TextureEncoding;
}

export interface BoolNode extends InputNode {
	new (value?: boolean): this;

	value: boolean;
	nodeType: string;

	generateReadonly(
		builder: NodeBuilder,
		output: string,
		uuid?: string,
		type?: string,
		ns?: string,
		needsUpdate?: boolean
	): string;
	copy(source: BoolNode): this;
}

export interface IntNode extends InputNode {
	new (value?: number): this;

	value: number;
	nodeType: string;

	generateReadonly(
		builder: NodeBuilder,
		output: string,
		uuid?: string,
		type?: string,
		ns?: string,
		needsUpdate?: boolean
	): string;
	copy(source: IntNode): this;
}

export interface FloatNode extends InputNode {
	new (value?: number): this;

	value: number;
	nodeType: string;

	generateReadonly(
		builder: NodeBuilder,
		output: string,
		uuid?: string,
		type?: string,
		ns?: string,
		needsUpdate?: boolean
	): string;
	copy(source: FloatNode): this;
}

export interface TempNodeParams {
	shared?: boolean;
	unique?: boolean;
}

export interface TempNode extends Node {
	new (type: string, params?: TempNodeParams): this;

	shared: boolean;
	unique: boolean;
	label: string | undefined;

	build(builder: NodeBuilder, output: string, uuid?: string, ns?: string): string;
	getShared(builder: NodeBuilder, output: string): boolean;
	getUnique(builder: NodeBuilder, output: string): boolean;
	setLabel(name: string): this;
	getLabel(builder: NodeBuilder): string;
	getUuid(unique: boolean): string;
	getTemp(builder: NodeBuilder, uuid: string): string | undefined;
}

export interface FunctionNodeInput {
	name: string;
	type: string;
	qualifier: string;
}

export interface FunctionNode extends TempNode {
	new (src: string, includes?: object[], extensions?: object, keywords?: object, type?: string): this;

	isMethod: boolean;
	nodeType: string;
	useKeywords: boolean;

	inputs: FunctionNodeInput[] | undefined;
	includes: object[] | undefined;
	extensions: object | undefined;
	keywords: object | undefined;

	getShared(builder: NodeBuilder, output: string): boolean;
	getType(builder: NodeBuilder): string;
	getInputByName(name: string): FunctionNodeInput | undefined;
	getIncludeByName(name: string): object | undefined;
	parse(src: string, includes?: object[], extensions?: object, keywords?: object): void;
	copy(source: FunctionNode): this;
}

export interface InputNode extends TempNode {
	new (type: string, params?: TempNodeParams): this;

	readonly: boolean;

	setReadonly(value: boolean): this;
	getReadonly(builder: NodeBuilder): boolean;
	copy(source: InputNode): this;
}

export interface ConstNode extends TempNode {
	new (src: string, useDefine?: boolean): this;

	src: string;
	useDefine: boolean;
	nodeType: string;

	getType(builder: NodeBuilder): string;
	parse(src: string, useDefine?: boolean): void;
	build(builder: NodeBuilder, output: string): string;
	copy(source: ConstNode): this;

	PI: string;
	PI2: string;
	RECIPROCAL_PI: string;
	RECIPROCAL_PI2: string;
	LOG2: string;
	EPSILON: string;
}

export interface VarNode extends Node {
	new (type: string, value?: any): this;

	value: any;
	nodeType: string;

	getType(builder: NodeBuilder): string;
	copy(source: VarNode): this;
}

export interface StructNodeInput {
	type: string;
	name: string;
}

export interface StructNode extends TempNode {
	new (src?: string): this;

	inputs: StructNodeInput[];
	src: string;
	nodeType: string;

	getType(builder: NodeBuilder): string;
	getInputByName(name: string): StructNodeInput;
	parse(src: string): void;
}

export interface AttributeNode extends TempNode {
	new (name: string, type?: string): this;

	name: string;
	nodeType: string;

	getAttributeType(builder: NodeBuilder): string;
	getType(builder: NodeBuilder): string;
	copy(source: AttributeNode): this;
}

export interface UVNode extends TempNode {
	new (index?: number): this;

	index: number;
	nodeType: string;

	copy(source: UVNode): this;
}

export interface ExpressionNode extends FunctionNode {
	new (src: string, type?: string, keywords?: object, extensions?: object, includes?: object[]): this;
}

export interface FunctionCallNode extends TempNode {
	new (func: FunctionNode, inputs?: Node[]): this;

	nodeType: string;

	value: FunctionNode;
	inputs: Node[];

	setFunction(func: FunctionNode, inputs?: Node[]): void;
	getFunction(): FunctionNode;
	getType(): string;
	copy(source: FunctionCallNode): this;
}

export interface NodeLibKeyword {
	callback: (builder: NodeBuilder) => void;
	cache?: object;
}

export interface NodeLib {
	add(node: Node): void;
	addKeyword(name: string, callback: (builder: NodeBuilder) => void, cache?: object): void;
	remove(node: Node): void;
	removeKeyword(name: string): void;
	get(name: string): Node;
	getKeyword(name: string, builder: NodeBuilder): any;
	getKeywordData(name: string): NodeLibKeyword;
	contains(name: string): boolean;
	containsKeyword(name: string): boolean;
}

export interface NodeUtils {
	addShortcuts(proto: Node, proxy: string, list: any[]): void;
}

export interface Matrix3Node extends InputNode {
	new (matrix?: Matrix3): this;

	value: Matrix3;
	nodeType: string;
	elements: number[];

	generateReadonly(
		builder: NodeBuilder,
		output: string,
		uuid?: string,
		type?: string,
		ns?: string,
		needsUpdate?: boolean
	): string;
	copy(source: Matrix3Node): this;
}

export interface Matrix4Node extends InputNode {
	new (matrix?: Matrix4): this;

	value: Matrix4;
	nodeType: string;
	elements: number[];

	generateReadonly(
		builder: NodeBuilder,
		output: string,
		uuid?: string,
		type?: string,
		ns?: string,
		needsUpdate?: boolean
	): string;
	copy(source: Matrix4Node): this;
}

export interface CubeTextureNode extends InputNode {
	new (value: CubeTexture, uv?: Node, bias?: Node): this;

	value: CubeTexture;
	uv: Node | undefined;
	bias: Node | undefined;
	nodeType: string;

	getTexture(builder: NodeBuilder, output: string): string;
	copy(source: CubeTextureNode): this;
}

export interface ScreenNode extends TextureNode {
	new (uv?: UVNode): this;

	nodeType: string;

	getTexture(builder: NodeBuilder, output: string): string;
}

export interface ReflectorOptions {
	color?: ColorRepresentation;
	textureWidth?: number;
	textureHeight?: number;
	clipBias?: number;
	shader?: object;
	encoding?: O3JS.TextureEncoding;
}

export interface Reflector extends Mesh {
	new (geometry?: BufferGeometry, options?: ReflectorOptions): this;

	getRenderTarget(): WebGLRenderTarget;
}

export interface ReflectorRTT extends Reflector {
	new (geometry?: BufferGeometry, options?: ReflectorOptions): this;
}

export interface ReflectorNode extends TempNode {
	new (mirror?: ReflectorRTT): this;

	mirror: ReflectorRTT;
	textureMatrix: Matrix4Node;
	localPosition: PositionNode;
	uv: OperatorNode;
	uvResult: OperatorNode;
	texture: TextureNode;

	nodeType: string;

	copy(source: ReflectorNode): this;
}

export interface PropertyNode extends InputNode {
	new (object: object, property: string, type: string): this;

	object: object;
	property: string;
	nodeType: string;
	value: any;
}

export interface RTTNodeOptions extends WebGLRenderTargetOptions {
	clear?: boolean;
}

export interface RTTNode extends TextureNode {
	new (width: number, height: number, input: TextureNode, options?: RTTNodeOptions): this;

	input: TextureNode;
	clear: boolean;
	renderTarget: WebGLRenderTarget;
	material: object; // NodeMaterial
	camera: OrthographicCamera;
	scene: Scene;
	quad: Mesh;
	render: boolean;

	build(builder: NodeBuilder, output: string, uuid?: string): string;
	updateFramesaveTo(frame: NodeFrame): void;
	updateFrame(frame: NodeFrame): void;
	copy(source: RTTNode): this;
}

export interface ColorsNode extends TempNode {
	new (index?: number): this;

	index: number;
	nodeType: string;

	copy(source: ColorsNode): this;
}

export interface PositionNode extends TempNode {
	new (scope?: string): this;

	scope: string;
	nodeType: string;

	copy(source: PositionNode): this;

	LOCAL: string;
	WORLD: string;
	VIEW: string;
	PROJECTION: string;
}

export interface NormalNode extends TempNode {
	new (scope?: string): this;

	scope: string;
	nodeType: string;

	copy(source: NormalNode): this;

	LOCAL: string;
	WORLD: string;
}

export interface CameraNode extends TempNode {
	new (scope?: string, camera?: Camera): this;

	scope: string;
	near: FloatNode | undefined;
	far: FloatNode | undefined;
	camera: Camera | undefined;
	updateFrame: boolean | undefined;
	nodeType: string;

	setCamera(camera: Camera): void;
	setScope(scope: string): void;
	onUpdateFrame(frame: NodeFrame): void;
	copy(source: CameraNode): this;

	Nodes: {
		depthColor: FunctionNode;
	};
	POSITION: string;
	DEPTH: string;
	TO_VERTEX: string;
}

export interface LightNode extends TempNode {
	new (scope?: string): this;

	scope: string;
	nodeType: string;

	copy(source: LightNode): this;

	TOTAL: string;
}

export interface ReflectNode extends TempNode {
	new (scope?: string): this;

	scope: string;
	nodeType: string;

	CUBE: string;
	SPHERE: string;
	VECTOR: string;
}

export interface ScreenUVNode extends TempNode {
	new (resolution?: ResolutionNode): this;

	resolution: ResolutionNode;
	nodeType: string;

	copy(source: ScreenUVNode): this;
}

export interface ResolutionNode extends Vector2Node {
	new (): this;

	size: Vector2;
	nodeType: string;

	updateFrame(frame: NodeFrame): void;
	copy(source: ResolutionNode): this;
}

export interface MathNode extends TempNode {
	new (a: Node, bOrMethod: Node | string, cOrMethod?: Node | string, method?: string): this;

	a: Node;
	b: Node | string | undefined;
	c: Node | string | undefined;
	method: string;
	nodeType: string;

	getNumInputs(builder: NodeBuilder): number;
	getInputType(builder: NodeBuilder): string;
	copy(source: MathNode): this;

	RAD: string;
	DEG: string;
	EXP: string;
	EXP2: string;
	LOG: string;
	LOG2: string;
	SQRT: string;
	INV_SQRT: string;
	FLOOR: string;
	CEIL: string;
	NORMALIZE: string;
	SATURATE: string;
	SIN: string;
	COS: string;
	TAN: string;
	ASIN: string;
	ACOS: string;
	ARCTAN: string;
	ABS: string;
	SIGN: string;
	LENGTH: string;
	NEGATE: string;
	INVERT: string;

	MIN: string;
	MAX: string;
	MOD: string;
	STEP: string;
	REFLECT: string;
	DISTANCE: string;
	DOT: string;
	CROSS: string;
	POW: string;

	MIX: string;
	CLAMP: string;
	REFRACT: string;
	SMOOTHSTEP: string;
	FACEFORWARD: string;
}

export interface CondNode extends TempNode {
	new (a: Node, b: Node, op: string, ifNode?: Node, elseNode?: Node): this;

	a: Node;
	b: Node;
	op: string;
	ifNode: Node | undefined;
	elseNode: Node | undefined;
	nodeType: string;

	getCondType(builder: NodeBuilder): string;
	copy(source: CondNode): this;

	EQUAL: string;
	NOT_EQUAL: string;
	GREATER: string;
	GREATER_EQUAL: string;
	LESS: string;
	LESS_EQUAL: string;
	AND: string;
	OR: string;
}

export interface CheckerNode extends TempNode {
	new (uv?: UVNode | UVTransformNode): this;

	uv: UVNode | UVTransformNode;
	nodeType: string;

	copy(source: CheckerNode): this;

	Nodes: {
		checker: FunctionNode;
	};
}

export interface TextureCubeUVNode extends TempNode {
	new (uv: Node, textureSize: FloatNode): this;

	uv: Node;
	textureSize: FloatNode;
	nodeType: string;

	Nodes: {
		TextureCubeUVData: StructNode;
		textureCubeUV: FunctionNode;
	};
}

export interface TextureCubeNode extends TempNode {
	new (value: TextureNode, textureSize?: FloatNode): this;

	value: TextureNode;
	textureSize: FloatNode;
	radianceCache: {
		uv: TextureCubeUVNode;
	};
	irradianceCache: {
		uv: TextureCubeUVNode;
	};
	nodeType: string;

	generateTextureCubeUV(builder: NodeBuilder, output: string): string;
}

export interface BumpMapNode extends TempNode {
	new (value: TextureNode, scale?: FloatNode): this;

	value: TextureNode;
	scale: FloatNode;
	toNormalMap: boolean;
	nodeType: string;

	copy(source: BumpMapNode): this;

	Nodes: {
		dHdxy_fwd: FunctionNode;
		perturbNormalArb: FunctionNode;
		bumpToNormal: FunctionNode;
	};
}

export interface BypassNode extends Node {
	new (code: Node, value?: Node): this;

	code: Node;
	value: Node | undefined;
	nodeType: string;

	copy(source: BypassNode): this;
}

export interface JoinNode extends TempNode {
	new (x: Node, y: Node, z?: Node, w?: Node): this;

	x: Node;
	y: Node;
	z: Node | undefined;
	w: Node | undefined;
	nodeType: string;

	getNumElements(): number;
	copy(source: JoinNode): this;
}

export interface SwitchNode extends Node {
	new (node: Node, components?: string): this;

	node: Node;
	components: string;
	nodeType: string;

	copy(source: SwitchNode): this;
}

export interface TimerNode extends FloatNode {
	new (scale?: number, scope?: string, timeScale?: boolean): this;

	scale: number;
	scope: string;
	timeScale: boolean;
	nodeType: string;

	getUnique(): boolean;
	updateFrame(frame: NodeFrame): void;
	copy(source: TimerNode): this;

	GLOBAL: string;
	LOCAL: string;
	DELTA: string;
}

export interface VelocityNodeParams {
	damping: number;
	spring: number;
	type: string;
}

export interface VelocityNode extends Vector3Node {
	new (target: Object3D, params?: VelocityNodeParams): this;

	velocity: Vector3;
	moment: Vector3 | undefined;
	speed: Vector3 | undefined;
	springVelocity: Vector3 | undefined;
	lastVelocity: Vector3 | undefined;

	nodeType: string;

	setParams(params: VelocityNodeParams): void;
	setTarget(target: Object3D): void;
	updateFrameVelocity(frame: NodeFrame): void;
	updateFrame(frame: NodeFrame): void;
	copy(source: VelocityNode): this;
}

export interface MaxMIPLevelNode extends FloatNode {
	new (texture: Node): this;

	texture: Node;
	maxMIPLevel: number;
	nodeType: string;
	value: number;
}

export interface SpecularMIPLevelNode extends TempNode {
	new (texture: Node): this;

	texture: Node;
	maxMIPLevel: MaxMIPLevelNode;
	nodeType: string;

	copy(source: SpecularMIPLevelNode): this;

	Nodes: {
		getSpecularMIPLevel: FunctionNode;
	};
}

export interface ColorSpaceNode extends TempNode {
	new (input: Node, method?: string): this;

	input: Node;
	method: string | undefined;
	nodeType: string;

	fromEncoding(encoding: number): void;
	fromDecoding(encoding: number): void;
	copy(source: ColorSpaceNode): this;

	Nodes: {
		LinearToLinear: FunctionNode;
		GammaToLinear: FunctionNode;
		LinearToGamma: FunctionNode;
		sRGBToLinear: FunctionNode;
		LinearTosRGB: FunctionNode;
		RGBEToLinear: FunctionNode;
		LinearToRGBE: FunctionNode;
		RGBMToLinear: FunctionNode;
		LinearToRGBM: FunctionNode;
		RGBDToLinear: FunctionNode;
		LinearToRGBD: FunctionNode;
		cLogLuvM: FunctionNode;
		LinearToLogLuv: FunctionNode;
		cLogLuvInverseM: FunctionNode;
		LogLuvToLinear: FunctionNode;
	};

	LINEAR_TO_LINEAR: string;

	GAMMA_TO_LINEAR: string;
	LINEAR_TO_GAMMA: string;

	SRGB_TO_LINEAR: string;
	LINEAR_TO_SRGB: string;

	RGBE_TO_LINEAR: string;
	LINEAR_TO_RGBE: string;

	RGBM_TO_LINEAR: string;
	LINEAR_TO_RGBM: string;

	RGBD_TO_LINEAR: string;
	LINEAR_TO_RGBD: string;

	LINEAR_TO_LOG_LUV: string;
	LOG_LUV_TO_LINEAR: string;

	getEncodingComponents(encoding: number): any[];
}

export interface BlurNode extends TempNode {
	new (value: TextureNode, uv?: UVNode, radius?: number, size?: Vector2): this;

	value: TextureNode;
	uv: UVNode;
	radius: Vector2Node;
	size: Vector2;
	blurX: boolean;
	blurY: boolean;
	horizontal: FloatNode;
	vertical: FloatNode;
	nodeType: string;

	updateFrame(frame: NodeFrame): void;
	copy(source: BlurNode): this;

	Nodes: {
		blurX: FunctionNode;
		blurY: FunctionNode;
	};
}

export interface ColorAdjustmentNode extends TempNode {
	new (rgb: Node, adjustment?: FloatNode, method?: string): this;

	rgb: Node;
	adjustment: FloatNode | undefined;
	method: string;
	nodeType: string;

	copy(source: ColorAdjustmentNode): this;

	Nodes: {
		hue: FunctionNode;
		saturation: FunctionNode;
		vibrance: FunctionNode;
	};

	SATURATION: string;
	HUE: string;
	VIBRANCE: string;
	BRIGHTNESS: string;
	CONTRAST: string;
}

export interface LuminanceNode extends TempNode {
	new (rgb: Node): this;

	rgb: Node;
	nodeType: string;

	copy(source: LuminanceNode): this;

	Nodes: {
		LUMA: ConstNode;
		luminance: FunctionNode;
	};
}

export interface BasicNode extends Node {
	new (): this;

	position: Node;
	color: Node;
	alpha: Node;
	mask: Node;
	nodeType: string;

	build(builder: NodeBuilder): string;
	copy(source: BasicNode): this;
}

export interface SpriteNode extends Node {
	new (): this;

	color: Node;
	spherical: true;
	nodeType: string;

	build(builder: NodeBuilder): string;
	copy(source: SpriteNode): this;
}

export interface PhongNode extends Node {
	new (): this;

	color: Node;
	specular: Node;
	shininess: Node;
	nodeType: string;

	build(builder: NodeBuilder): string;
	copy(source: PhongNode): this;
}

export interface StandardNode extends Node {
	new (): this;

	color: Node;
	roughness: Node;
	metalness: Node;
	nodeType: string;
	sheenColor: Node;

	build(builder: NodeBuilder): string;
	copy(source: StandardNode): this;
}

export interface MeshStandardNode extends StandardNode {
	new (): this;

	properties: {
		color: Color;
		roughness: number;
		metalness: number;
		normalScale: Vector2;
	};

	inputs: {
		color: PropertyNode;
		roughness: PropertyNode;
		metalness: PropertyNode;
		normalScale: PropertyNode;
	};

	build(builder: NodeBuilder): string;
}

export interface BasicNodeMaterial extends NodeMaterial {
	new (): this;

	color: Node;
	alpha: Node;
	mask: Node;
	position: Node;
}

export interface SpriteNodeMaterial extends NodeMaterial {
	new (): this;

	color: Node;
	alpha: Node;
	mask: Node;
	position: Node;
	spherical: Node;
}

export interface PhongNodeMaterial extends NodeMaterial {
	new (): this;

	color: Node;
	alpha: Node;
	specular: Node;
	shininess: Node;
	normal: Node;
	emissive: Node;
	ambient: Node;
	light: Node;
	shadow: Node;
	ao: Node;
	environment: Node;
	environmentAlpha: Node;
	mask: Node;
	position: Node;
}

export interface StandardNodeMaterial extends NodeMaterial {
	new (): this;

	color: Node;
	alpha: Node;
	roughness: Node;
	metalness: Node;
	reflectivity: Node;
	clearcoat: Node;
	clearcoatRoughness: Node;
	clearcoatNormal: Node;
	normal: Node;
	emissive: Node;
	ambient: Node;
	light: Node;
	shadow: Node;
	ao: Node;
	environment: Node;
	mask: Node;
	position: Node;
	sheenColor: Node;
}

export interface MeshStandardNodeMaterial extends NodeMaterial {
	new (): this;

	color: Color | Node;
	roughness: number | Node;
	metalness: number | Node;
	map: Texture | Node;
	normalMap: Texture | Node;
	normalScale: Vector2 | Node;
	metalnessMap: Texture | Node;
	roughnessMap: Texture | Node;
	envMap: CubeTexture | Node;
}

export interface NodePostProcessing {
	new (renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget): this;

	renderer: WebGLRenderer;
	renderTarget: WebGLRenderTarget;

	output: ScreenNode;
	material: NodeMaterial;

	camera: OrthographicCamera;
	scene: Scene;

	quad: Mesh;
	needsUpdate: boolean;

	render(scene: Scene, camera: Camera, frame: NodeFrame): void;
	setSize(width: number, height: number): void;
	copy(source: NodePostProcessing): this;
	toJSON(meta?: object | string): object;
}

export interface UVTransformNode extends ExpressionNode {
	new (uv?: UVNode, position?: Matrix3Node): this;

	uv: UVNode;
	position: Matrix3Node;

	nodeType: string;

	setUvTransform(tx: number, ty: number, sx: number, sy: number, rotation: number, cx?: number, cy?: number): void;
	copy(source: UVTransformNode): this;
}

export interface TextureNode extends InputNode {
	new (value: Texture, uv?: UVNode | UVTransformNode, bias?: Node, project?: boolean): this;

	value: Texture;
	uv: UVNode | UVTransformNode;
	bias: Node;
	project: boolean;
	nodeType: string;

	getTexture(builder: NodeBuilder, output: string): string;
	copy(source: TextureNode): this;
}

export interface Vector2Node extends InputNode {
	new (x: Vector2 | number, y?: number): this;

	value: Vector2;
	nodeType: string;

	generateReadonly(
		builder: NodeBuilder,
		output: string,
		uuid?: string,
		type?: string,
		ns?: string,
		needsUpdate?: boolean
	): string;
	copy(source: Vector2Node): this;
}

export interface Vector3Node extends InputNode {
	new (x: Vector3 | number, y?: number, z?: number): this;

	value: Vector3;
	nodeType: string;

	generateReadonly(
		builder: NodeBuilder,
		output: string,
		uuid?: string,
		type?: string,
		ns?: string,
		needsUpdate?: boolean
	): string;
	copy(source: Vector3Node): this;
}

export interface Vector4Node extends InputNode {
	new (x: Vector4 | number, y?: number, z?: number, w?: number): this;

	value: Vector4;
	nodeType: string;

	generateReadonly(
		builder: NodeBuilder,
		output: string,
		uuid?: string,
		type?: string,
		ns?: string,
		needsUpdate?: boolean
	): string;
	copy(source: Vector4Node): this;
}

export interface ColorNode extends InputNode {
	new (color: ColorRepresentation, g?: number, b?: number): this;

	value: Color;
	nodeType: string;

	generateReadonly(
		builder: NodeBuilder,
		output: string,
		uuid?: string,
		type?: string,
		ns?: string,
		needsUpdate?: boolean
	): string;
	copy(source: ColorNode): this;
}

export interface NormalMapNode extends TempNode {
	new (value: TextureNode, scale?: Vector2Node): this;

	value: TextureNode;
	scale: Vector2Node;
	toNormalMap: boolean;
	nodeType: string;

	copy(source: NormalMapNode): this;

	Nodes: {
		perturbNormal2Arb: FunctionNode;
	};
}

export interface OperatorNode extends TempNode {
	new (a: Node, b: Node, op: string): this;

	a: Node;
	b: Node;
	op: string;

	copy(source: OperatorNode): this;

	ADD: string;
	SUB: string;
	MUL: string;
	DIV: string;
}

export interface NodeMaterialBuildParams {
	builder?: NodeBuilder;
	renderer?: WebGLRenderer;
}

export interface NodeUniformParams {
	name?: string;
	type?: string;
	node?: Node;
	needsUpdate?: boolean;
}

export interface NodeUniform {
	new (params?: NodeUniformParams): this;
	name: string | undefined;
	type: string | undefined;
	node: Node | undefined;
	needsUpdate: boolean | undefined;
	value: any;
}

export interface NodeFrame {
	new (time: number): this;
	time: number;
	id: number;
	delta: number | undefined;
	renderer: WebGLRenderer | undefined;
	renderTexture: Texture | undefined;

	update(delta: number): this;
	setRenderer(renderer: WebGLRenderer): this;
	setRenderTexture(renderTexture: Texture): this;
	updateNode(node: Node): this;
}

export interface RawNode extends Node {
	new (value: Node): this;

	value: Node;
	nodeType: string;

	copy(source: RawNode): this;
}

export interface NodeMaterial extends ShaderMaterial {
	new (vertex: Node, fragment: Node): this;

	vertex: Node | RawNode;
	fragment: Node | RawNode;

	updaters: object[];

	readonly isNodeMaterial: true;
	properties: object;

	updateFrame(frame: NodeFrame): void;
	build(params?: NodeMaterialBuildParams): this;
	getHash(): string;
	copy(source: NodeMaterial): this;
}

export interface LineSegmentsGeometry extends InstancedBufferGeometry {
	new (): this;
	readonly isLineSegmentsGeometry: true;

	applyMatrix4(matrix: Matrix4): this;
	computeBoundingBox(): void;
	computeBoundingSphere(): void;
	fromEdgesGeometry(geometry: EdgesGeometry): this;
	fromLineSegments(lineSegments: LineSegments): this;
	fromMesh(mesh: Mesh): this;
	fromWireframeGeometry(geometry: WireframeGeometry): this;
	setColors(array: number[] | Float32Array): this;
	setPositions(array: number[] | Float32Array): this;
}

export interface WireframeGeometry2 extends LineSegmentsGeometry {
	new (geometry: BufferGeometry): this;
	readonly sWireframeGeometry2: boolean;
}

export interface WireframeGeometry2 extends LineSegmentsGeometry {
	new (geometry: BufferGeometry): this;
	readonly sWireframeGeometry2: boolean;
}

export interface BoxLineGeometry extends BufferGeometry {
	new (
		width?: number,
		height?: number,
		depth?: number,
		widthSegments?: number,
		heightSegments?: number,
		depthSegments?: number
	): this;
}

export interface ConvexGeometry extends BufferGeometry {
	new (points: Vector3[]): this;
}

export interface DecalGeometry extends BufferGeometry {
	new (mesh: Mesh, position: Vector3, orientation: Euler, size: Vector3): this;
}

export interface DecalVertex {
	new (position: Vector3, normal: Vector3): this;
	clone(): this;
}

export interface RandomGenerator {
	random(): number;
	getSeed(): number;
	setSeed(seed: number): void;
}

export interface LightningSegment {
	iteration: number;
	pos0: Vector3;
	pos1: Vector3;
	linPos0: Vector3;
	linPos1: Vector3;
	up0: Vector3;
	up1: Vector3;
	radius0: number;
	radius1: number;
	fraction0: number;
	fraction1: number;
	positionVariationFactor: number;
}

export interface LightningSubray {
	seed: number;
	maxIterations: number;
	recursion: number;
	pos0: Vector3;
	pos1: Vector3;
	linPos0: Vector3;
	linPos1: Vector3;
	up0: Vector3;
	up1: Vector3;
	radius0: number;
	radius1: number;
	birthTime: number;
	deathTime: number;
	timeScale: number;
	roughness: number;
	straightness: number;
	propagationTimeFactor: number;
	vanishingTimeFactor: number;
	endPropagationTime: number;
	beginVanishingTime: number;
}

export interface RayParameters {
	sourceOffset?: Vector3;
	destOffset?: Vector3;

	timeScale?: number;
	roughness?: number;
	straightness?: number;

	up0?: Vector3;
	up1?: Vector3;
	radius0?: number;
	radius1?: number;
	radius0Factor?: number;
	radius1Factor?: number;
	minRadius?: number;

	isEternal?: boolean;
	birthTime?: number;
	deathTime?: number;
	propagationTimeFactor?: number;
	vanishingTimeFactor?: number;
	subrayPeriod?: number;
	subrayDutyCycle?: number;

	maxIterations?: number;
	isStatic?: boolean;
	ramification?: number;
	maxSubrayRecursion?: number;
	recursionProbability?: number;
	generateUVs?: boolean;

	randomGenerator?: RandomGenerator;
	noiseSeed?: number;

	onDecideSubrayCreation?: (segment: LightningSegment, lightningStrike: LightningStrike) => void;
	onSubrayCreation?: (
		segment: LightningSegment,
		parentSubray: LightningSubray,
		childSubray: LightningSubray,
		lightningStrike: LightningStrike
	) => void;
}

export interface LightningStrike {
	new (rayParameters?: RayParameters): this;
	copyParameters(dest?: RayParameters, source?: RayParameters): RayParameters;
	state: number;
	update(time: number): void;

	copy(source: LightningStrike): LightningStrike;
	clone(): this;
}

export interface ParametricGeometry extends BufferGeometry {
	new (func?: (u: number, v: number, target: Vector3) => void, slices?: number, stacks?: number): this;

	/**
	 * @default 'ParametricGeometry'
	 */
	type: string;

	parameters: {
		func: (u: number, v: number, dest: Vector3) => void;
		slices: number;
		stacks: number;
	};
}

export interface ParametricTubeGeometry extends ParametricGeometry {
	new (path: Curve<Vector3>, segments?: number, radius?: number, segmentsRadius?: number, closed?: boolean): this;
}

export interface ParametricTorusKnotGeometry extends ParametricTubeGeometry {
	new (radius?: number, tube?: number, segmentsT?: number, segmentsR?: number, p?: number, q?: number): this;
}

export interface ParametricSphereGeometry extends ParametricGeometry {
	new (size: number, u: number, v: number): this;
}

export interface ParametricPlaneGeometry extends ParametricGeometry {
	new (width: number, depth: number, segmentsWidth: number, segmentsDepth: number): this;
}

export interface ParametricGeometries {
	klein(v: number, u: number, target: Vector3): Vector3;
	plane(width: number, height: number): (u: number, v: number, target: Vector3) => Vector3;
	mobius(u: number, t: number, target: Vector3): Vector3;
	mobius3d(u: number, t: number, target: Vector3): Vector3;
	TubeGeometry: ParametricTubeGeometry;
	TorusKnotGeometry: ParametricTorusKnotGeometry;
	SphereGeometry: ParametricSphereGeometry;
	PlaneGeometry: ParametricPlaneGeometry;
}

export interface RoundedBoxGeometry extends BoxGeometry {
	new (width?: number, height?: number, depth?: number, segments?: number, radius?: number): this;
}

export interface TeapotGeometry extends BufferGeometry {
	new (
		size?: number,
		segments?: number,
		bottom?: boolean,
		lid?: boolean,
		body?: boolean,
		fitLid?: boolean,
		blinn?: boolean
	): this;
}

export interface TextGeometryParameters {
	font: Font;
	size?: number | undefined;
	height?: number | undefined;
	curveSegments?: number | undefined;
	bevelEnabled?: boolean | undefined;
	bevelThickness?: number | undefined;
	bevelSize?: number | undefined;
	bevelOffset?: number | undefined;
	bevelSegments?: number | undefined;
}

export interface TextGeometry extends ExtrudeGeometry {
	/**
	 * @default 'TextGeometry'
	 */
	type: string;

	new (text: string, parameters: TextGeometryParameters): this;

	parameters: {
		font: Font;
		size: number;
		height: number;
		curveSegments: number;
		bevelEnabled: boolean;
		bevelThickness: number;
		bevelSize: number;
		bevelOffset: number;
		bevelSegments: number;
	};
}

export interface LineGeometry extends LineSegmentsGeometry {
	new (): this;
	readonly isLineGeometry: true;

	fromLine(line: Line): this;
}

export interface RollerCoasterGeometry extends BufferGeometry {
	new (curve: Curve<Vector3>, divisions: number): this;
}

export interface RollerCoasterLiftersGeometry extends BufferGeometry {
	new (curve: Curve<Vector3>, divisions: number): this;
}

export interface RollerCoasterShadowGeometry extends BufferGeometry {
	new (curve: Curve<Vector3>, divisions: number): this;
}

export interface RollerCoasterSkyGeometry extends BufferGeometry {
	new (curve: Curve<Vector3>, divisions: number): this;
}

export interface RollerCoasterTreesGeometry extends BufferGeometry {
	new (landscape: Mesh): this;
}

/**
 * The Capsule geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCapsuleGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/CapsuleGeometry) page for a live demo.
 *
 */
export interface CapsuleGeometry extends BufferGeometry {
	/**
	 * The Parameters of capsule geometry
	 */
	parameters: {
		radius: number;
		radiusSegments: number;
		height: number;
		heightSegments: number;
		phiStart: number;
		phiLength: number;
	};

	/**
	 * @param [radius=50] — sphere radius. Default is 50.
	 * @param [radiusSegments=30] — number of horizontal segments. Minimum value is 3, and the default is 8.
	 * @param [height=10] — specify vertical starting angle. Default is 0.
	 * @param [heightSegments=1] — specify vertical sweep angle size. Default is Math.PI.
	 * @param [phiStart=0] — specify horizontal starting angle. Default is 0.
	 * @param [phiLength=Math.PI * 2] — specify horizontal sweep angle size. Default is Math.PI * 2.
	 */
	new (
		radius?: number,
		radiusSegments?: number,
		height?: number,
		heightSegments?: number,
		phiStart?: number,
		phiLength?: number
	): this;
}

/**
 * The Circle Depth geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCircleDepthGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/CircleDepthGeometry) page for a live demo.
 *
 */
export interface CircleDepthGeometry extends BufferGeometry {
	/**
	 * @default 'CircleDepthGeometry'
	 */
	type: string;

	/**
	 * The Parameters of circle depth geometry
	 */
	parameters: {
		radius: number;
		depth: number;
		segments: number;
		thetaStart: number;
		thetaLength: number;
		depthRate: number;
	};

	/**
	 * @param [radius=1]
	 * @param [depth=1]
	 * @param [segments=8]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 * @param [depthRate=1]
	 */
	new (
		radius?: number,
		depth?: number,
		segments?: number,
		thetaStart?: number,
		thetaLength?: number,
		depthRate?: number
	): this;
}

/**
 * The Grid geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxGridGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/GridGeometry) page for a live demo.
 *
 */
export interface GridGeometry extends BufferGeometry {
	/**
	 * The Parameters of grid geometry
	 */
	parameters: {
		width: number;
		height: number;
		depth: number;
		widthSegments: number;
		heightSegments: number;
		colorW: Color;
		colorH: Color;
	};

	/**
	 * @param [width=1]
	 * @param [height=1]
	 * @param [depth=1]
	 * @param [widthSegments=1]
	 * @param [heightSegments=1]
	 */
	new (
		width?: number,
		height?: number,
		depth?: number,
		widthSegments?: number,
		heightSegments?: number,
		colorW?: Color,
		colorH?: Color
	): this;
}

export interface PlaneDepthGeometry extends BufferGeometry {
	/**
	 * @default 'PlaneDepthGeometry'
	 */
	type: string;

	/**
	 * The Parameters of plane depth geometry
	 */
	parameters: {
		width: number;
		height: number;
		depth: number;
		widthSegments: number;
		heightSegments: number;
		depthRate: number;
	};

	/**
	 * @param [width=1] — Width of the sides on the X axis.
	 * @param [height=1] — Height of the sides on the Y axis.
	 * @param [depth=1] — Depth of the sides on the Z axis.
	 * @param [widthSegments=1] — Number of segmented faces along the width of the sides.
	 * @param [heightSegments=1] — Number of segmented faces along the height of the sides.
	 * @param [depthRate=1]
	 */
	new (
		width?: number,
		height?: number,
		depth?: number,
		widthSegments?: number,
		heightSegments?: number,
		depthRate?: number
	): this;
}

/**
 * The Plane Perlin geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPlanePerlinGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/PlanePerlinGeometry) page for a live demo.
 *
 */
export interface PlanePerlinGeometry {
	/**
	 * The Data of plane perlin geometry
	 */
	data: number[];
	/**
	 * Creates an instance of plane perlin geometry.
	 * @param worldWidth
	 * @param worldDepth
	 * @param [quality]
	 */
	new (worldWidth: number, worldDepth: number, quality?: number): this;
	/**
	 * Gets y
	 * @param x
	 * @param z
	 * @returns
	 */
	getY(x: number, z: number): number;
	/**
	 * Generates height
	 * @param width
	 * @param height
	 * @param [quality]
	 * @returns height
	 */
	generateHeight(width: number, height: number, quality?: number): number[];
	/**
	 * Gets terrain
	 * @param planeWidth
	 * @param planeHeight
	 * @param planeDepth
	 * @returns terrain
	 */
	getTerrain(planeWidth: number, planeHeight: number, planeDepth: number): BufferGeometry;
	/**
	 * Gets minecraft
	 * @param planeWidth
	 * @param planeHeight
	 * @param planeDepth
	 * @returns minecraft
	 */
	getMinecraft(planeWidth: number, planeHeight: number, planeDepth: number): BufferGeometry;
	/**
	 * Gets minecraft ao
	 * @param planeWidth
	 * @param planeHeight
	 * @param planeDepth
	 * @param light
	 * @param shadow
	 * @returns minecraft ao
	 */
	getMinecraftAo(
		planeWidth: number,
		planeHeight: number,
		planeDepth: number,
		light: Color,
		shadow: Color
	): BufferGeometry;
	/**
	 * Gets geometry
	 * @param planeGeometry
	 * @param uv
	 * @param rotate
	 * @param translate
	 * @param [colors]
	 * @returns geometry
	 */
	getGeometry(
		planeGeometry: BufferGeometry,
		uv: number[],
		rotate: {
			x: number;
			y: number;
			z: number;
		},
		translate: {
			x: number;
			y: number;
			z: number;
		},
		colors?: Color[]
	): BufferGeometry;
	/**
	 * Gets texture
	 * @param sun
	 * @param color
	 * @param add
	 * @returns texture
	 */
	getTexture(sun: Vector3, color: Color, add: Color): HTMLCanvasElement;
}

/**
 * The RingDepth geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRingDepthGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/RingDepthGeometry) page for a live demo.
 *
 */
export interface RingDepthGeometry extends BufferGeometry {
	/**
	 * @default 'RingDepthGeometry'
	 */
	type: string;
	/**
	 * The Parameters of ring depth geometry
	 */
	parameters: {
		innerRadius: number;
		outerRadius: number;
		depth: number;
		thetaSegments: number;
		phiSegments: number;
		thetaStart: number;
		thetaLength: number;
		depthRate: number;
	};
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [depth=1]
	 * @param [thetaSegments=8]
	 * @param [phiSegments=1]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 * @param [depthRate=1]
	 */
	new (
		innerRadius?: number,
		outerRadius?: number,
		depth?: number,
		thetaSegments?: number,
		phiSegments?: number,
		thetaStart?: number,
		thetaLength?: number,
		depthRate?: number
	): this;
}

/**
 * The Rope geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRopeGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/RopeGeometry) page for a live demo.
 *
 */
export interface RopeGeometry extends BufferGeometry {
	/**
	 * The Parameters of rope geometry
	 */
	parameters: {
		width: number;
		widthSegments: number;
	};
	/**
	 * @param [width=1]
	 * @param [widthSegments=1]
	 */
	new (width?: number, widthSegments?: number): this;
}

/**
 * The Star Depth geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxStarDepthGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/StarDepthGeometry) page for a live demo.
 *
 */
export interface StarDepthGeometry extends BufferGeometry {
	/**
	 * @default 'StarDepthGeometry'
	 */
	type: string;
	/**
	 * The Parameters of star depth geometry
	 */
	parameters: {
		innerRadius: number;
		outerRadius: number;
		depth: number;
		segments: number;
		thetaStart: number;
		thetaLength: number;
		depthRate: number;
	};
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [depth=1]
	 * @param [segments=5]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 * @param [depthRate=1]
	 */
	new (
		innerRadius?: number,
		outerRadius?: number,
		depth?: number,
		segments?: number,
		thetaStart?: number,
		thetaLength?: number,
		depthRate?: number
	): this;
}

/**
 * The Outline geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxOutlineGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/OutlineGeometry) page for a live demo.
 *
 */
export interface OutlineGeometry extends WireframeGeometry {
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [segments=5]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	new (geometry: BufferGeometry, scale?: number): this;
}

/**
 * The Star geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxStarGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/StarGeometry) page for a live demo.
 *
 */
export interface StarGeometry extends CircleGeometry {
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [segments=5]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	new (innerRadius?: number, outerRadius?: number, segments?: number, thetaStart?: number, thetaLength?: number): this;
}

export interface EdgeSplitModifier {
	new (): this;
	/**
	 * @param geometry					The geometry to modify by splitting edges.
	 * 									This geometry can be any of any type: Geometry or BufferGeometry, indexed or
	 * 									not...
	 *
	 * @param cutOffPoint				The cutoff angle in radians. If the angle between two face normals is higher
	 * 									than this value, a split will be made.
	 *
	 * @param [tryKeepNormals = true]	Set to true to keep the normal values for vertices that won't be split.
	 * 									To use this feature, you also need to pass an indexed geometry with a 'normal'
	 * 									BufferAttribute.
	 */
	modify(geometry: BufferGeometry, cutOffPoint: number, tryKeepNormals: boolean): BufferGeometry;
}

export interface SimplifyModifier {
	new (): this;
	modify(geometry: BufferGeometry, count: number): BufferGeometry;
}

export interface GeometryCompressionUtils {
	compressNormals(mesh: Mesh, encodeMethod: string): void;
	compressPositions(mesh: Mesh): void;
	compressUvs(mesh: Mesh): void;
}

export interface TessellateModifier {
	new (maxEdgeLength?: number, maxIterations?: number): this;
	maxEdgeLength: number;
	maxIterations: number;

	modify<TGeometry extends BufferGeometry>(geometry: TGeometry): TGeometry;
}

export interface Chunk {
	palette: number[];
	size: { x: number; y: number; z: number };
	data: Uint8Array;
}

export interface VOXMesh extends Mesh {
	new (chunk: Chunk): this;
}

export interface VOXDataTexture3D extends DataTexture3D {
	new (chunk: Chunk): this;
}

export interface VOXLoader extends Loader {
	load(
		url: string,
		onLoad: (chunks: Chunk[]) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<object[]>;
	parse(data: ArrayBuffer): object[];
}

export interface VRMLLoader extends Loader {
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
	load(
		url: string,
		onLoad: (geometry: BufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<BufferGeometry>;
	parse(data: string, onLoad: (geometry: BufferGeometry) => void): object;
}

export interface MD2PartsConfig {
	baseUrl: string;
	body: string;
	skins: string[];
	weapons: Array<[string, string]>;
}

export interface MD2Character {
	new (): this;
	scale: number;
	animationFPS: number;
	root: Object3D;
	meshBody: Mesh | null;
	meshWeapon: Mesh | null;
	skinsBody: Texture[];
	skinsWeapon: Texture[];
	weapons: Mesh[];
	activeAnimation: string | null;
	mixer: AnimationMixer | null;
	loadCounter: number;

	onLoadComplete(): void;
	loadParts(config: MD2PartsConfig): void;
	setPlaybackRate(rate: number): void;
	setWireframe(wireframeEnabled: boolean): void;
	setSkin(index: number): void;
	setWeapon(index: number): void;
	setAnimation(clipName: string): void;
	syncWeaponAnimation(): void;
	update(delta: number): void;
}

export interface MD2CharacterComplex {
	new (): this;
	scale: number;
	animationFPS: number;
	transitionFrames: number;
	maxSpeed: number;
	maxReverseSpeed: number;
	frontAcceleration: number;
	backAcceleration: number;
	frontDecceleration: number;
	angularSpeed: number;
	root: Object3D;
	meshBody: Mesh | null;
	meshWeapon: Mesh | null;
	controls: null;
	skinsBody: Texture[];
	skinsWeapon: Texture[];
	weapons: Mesh[];
	currentSkin: number;
	onLoadComplete: () => void;

	meshes: Mesh[];
	animations: object[];
	loadCounter: number;
	speed: number;
	bodyOrientation: number;
	walkSpeed: number;
	crouchSpeed: number;
	activeAnimation: string;
	oldAnimation: string;

	enableShadows(enable: boolean): void;
	setVisible(enable: boolean): void;
	shareParts(original: MD2CharacterComplex): void;
	loadParts(config: object): void;
	setPlaybackRate(rate: number): void;
	setWireframe(wireframeEnabled: boolean): void;
	setSkin(index: number): void;
	setWeapon(index: number): void;
	setAnimation(animationName: string): void;
	update(delta: number): void;
	updateAnimations(delta: number): void;
	updateBehaviors(): void;
	updateMovementModel(delta: number): void;
}

export interface MMDAnimationHelperParameter {
	sync?: boolean | undefined;
	afterglow?: number | undefined;
	resetPhysicsOnLoop?: boolean | undefined;
}

export interface MMDAnimationHelperAddParameter {
	animation?: AnimationClip | AnimationClip[] | undefined;
	physics?: boolean | undefined;
	warmup?: number | undefined;
	unitStep?: number | undefined;
	maxStepNum?: number | undefined;
	gravity?: number | undefined;
	delayTime?: number | undefined;
}

export interface MMDAnimationHelperPoseParameter {
	resetPose?: boolean | undefined;
	ik?: boolean | undefined;
	grant?: boolean | undefined;
}

export interface KS {
	effector: number;
	iteration: number;
	links: {
		enabled: boolean;
		index: number;
	};
	maxAngle: number;
	target: number;
}

export interface MMDPhysicsParameter {
	unitStep?: number | undefined;
	maxStepNum?: number | undefined;
	gravity?: Vector3 | undefined;
}

export interface MMDPhysics {
	new (mesh: SkinnedMesh, rigidBodyParams: object[], constraintParams?: object[], params?: MMDPhysicsParameter): this;
	manager: any;
	mesh: SkinnedMesh;
	unitStep: number;
	maxStepNum: number;
	gravity: Vector3;
	world: null;
	bodies: any[];
	constraints: any[];

	update(delta: number): this;
	reset(): this;
	warmup(cycles: number): this;
	setGravity(gravity: Vector3): this;
	createHelper(): MMDPhysicsHelper;
}

export interface MMDPhysicsHelper extends Object3D {
	new (): this;
}

export interface CCDIKSolver {
	new (mesh: SkinnedMesh, iks: KS[]): this;

	update(): this;
	updateOne(iks: KS): this;
	createHelper(): CCDIKHelper;
}

export interface CCDIKHelper extends Object3D {
	new (mesh: SkinnedMesh, iks: KS[]): this;
}

export interface MMDAnimationHelperMixer {
	looped: boolean;
	mixer?: AnimationMixer | undefined;
	ikSolver: CCDIKSolver;
	grantSolver: GrantSolver;
	physics?: MMDPhysics | undefined;
	duration?: number | undefined;
}

export interface MMDAnimationHelper {
	new (params?: MMDAnimationHelperParameter): this;
	meshes: SkinnedMesh[];
	camera: Camera | null;
	cameraTarget: Object3D;
	audio: Audio;
	audioManager: AudioManager;
	configuration: {
		sync: boolean;
		afterglow: number;
		resetPhysicsOnLoop: boolean;
	};
	enabled: {
		animation: boolean;
		ik: boolean;
		grant: boolean;
		physics: boolean;
		cameraAnimation: boolean;
	};
	objects: WeakMap<SkinnedMesh | Camera | AudioManager, MMDAnimationHelperMixer>;
	onBeforePhysics: (mesh: SkinnedMesh) => void;
	sharedPhysics: boolean;
	masterPhysics: null;

	add(object: SkinnedMesh | Camera | Audio, params?: MMDAnimationHelperAddParameter): this;
	remove(object: SkinnedMesh | Camera | Audio): this;
	update(delta: number): this;
	pose(mesh: SkinnedMesh, vpd: object, params?: MMDAnimationHelperPoseParameter): this;
	enable(key: string, enabled: boolean): this;
	createGrantSolver(mesh: SkinnedMesh): GrantSolver;
}

export interface AudioManagerParameter {
	delayTime?: number | undefined;
}

export interface AudioManager {
	new (audio: Audio, params?: AudioManagerParameter): this;
	audio: Audio;
	elapsedTime: number;
	currentTime: number;
	delayTime: number;
	audioDuration: number;
	duration: number;

	control(delta: number): this;
}

export interface GrantSolver {
	new (mesh: SkinnedMesh, grants: object[]): this;
	mesh: SkinnedMesh;
	grants: object[];

	update(): this;
	updateOne(gran: object[]): this;
	addGrantRotation(bone: Bone, q: Quaternion, ratio: number): this;
}

export interface CSS2DObject extends Object3D {
	new (element: HTMLElement): this;
	element: HTMLElement;

	onBeforeRender: (renderer: unknown, scene: Scene, camera: Camera) => void;
	onAfterRender: (renderer: unknown, scene: Scene, camera: Camera) => void;
}

export type CSS2DParameters = {
	element?: HTMLElement;
};

export interface CSS2DRenderer {
	new (parameters?: CSS2DParameters): this;
	domElement: HTMLElement;

	getSize(): { width: number; height: number };
	setSize(width: number, height: number): void;
	render(scene: Scene, camera: Camera): void;
}

export interface CSS3DObject extends Object3D {
	new (element: HTMLElement): this;
	element: HTMLElement;

	onBeforeRender: (renderer: unknown, scene: Scene, camera: Camera) => void;
	onAfterRender: (renderer: unknown, scene: Scene, camera: Camera) => void;
}

export interface CSS3DSprite extends CSS3DObject {
	new (element: HTMLElement): this;
}

export interface InteractiveGroup extends Group {
	new (renderer: WebGLRenderer, camera: Camera): this;
}

export interface LineSegments2 extends Mesh {
	geometry: any ; /* LineSegmentsGeometry */
	material: LineMaterial;

	new (geometry?: LineSegmentsGeometry, material?: LineMaterial): this;
	readonly isLineSegments2: true;

	computeLineDistances(): this;
}
/* todo */
export interface LineMaterial extends Material {
	new (aa : any): this;
}

export interface Line2 extends LineSegments2 {
	geometry: LineGeometry;
	material: LineMaterial;
	new (geometry?: LineGeometry, material?: LineMaterial): this;
	readonly isLine2: true;
}

export interface Wireframe extends Mesh {
	new (geometry?: LineSegmentsGeometry, material?: LineMaterial): this;
	readonly isWireframe: true;

	computeLineDistances(): this;
}

export interface TubePainter {
	new (): this;

	mesh: Mesh;

	stroke(position1: Vector3, position2: Vector3, matrix1: Matrix4, matrix2: Matrix4): void;
	updateGeometry(start: number, end: number): void;
}

export interface SplineUniform {
	spineTexture: IUniform;
	pathOffset: IUniform;
	pathSegment: IUniform;
	spineOffset: IUniform;
	flow: IUniform;
}

export interface Flow {
	new (mesh: Mesh, numberOfCurves?: number): this;
	curveArray: number[];
	curveLengthArray: number[];
	object3D: Mesh;
	splineTexure: DataTexture;
	uniforms: SplineUniform;
	updateCurve(index: number, curve: Curve<Vector3>): void;
	moveAlongCurve(amount: number): void;
}

export interface InstancedFlow extends Flow {
	new (count: number, curveCount: number, geometry: BufferGeometry, material: Material): this;
	object3D: InstancedMesh;
	offsets: number[];
	whichCurve: number[];

	moveIndividualAlongCurve(index: number, offset: number): void;
	setCurve(index: number, curveNo: number): void;
}

export interface StormParams {
	size?: number;
	minHeight?: number;
	maxHeight?: number;
	maxSlope?: number;

	maxLightnings?: number;

	lightningMinPeriod?: number;
	lightningMaxPeriod?: number;
	lightningMinDuration?: number;
	lightningMaxDuration?: number;

	lightningParameters?: RayParameters;
	lightningMaterial?: Material;

	isEternal?: boolean;

	onRayPosition?: (source: Vector3, dest: Vector3) => void;
	onLightningDown?: (lightning: LightningStrike) => void;
}

export interface LightningStorm {
	new (stormParams?: StormParams): this;
	update(time: number): void;
	copy(source: LightningStorm): LightningStorm;
	clone(): this;
}

export interface MarchingCubes extends Mesh {
	new (
		resolution: number,
		material: Material,
		enableUvs?: boolean,
		enableColors?: boolean,
		maxPolyCount?: number
	): this;

	enableUvs: boolean;
	enableColors: boolean;

	resolution: number;

	// parameters

	isolation: number;

	// size of field, 32 is pushing it in Javascript :)

	size: number;
	size2: number;
	size3: number;
	halfsize: number;

	// deltas

	delta: number;
	yd: number;
	zd: number;

	field: Float32Array;
	normal_cache: Float32Array;
	palette: Float32Array;

	maxCount: number;
	count: number;

	hasPositions: boolean;
	hasNormals: boolean;
	hasColors: boolean;
	hasUvs: boolean;

	positionArray: Float32Array;
	normalArray: Float32Array;

	uvArray: Float32Array;
	colorArray: Float32Array;

	begin(): void;
	end(): void;

	init(resolution: number): void;

	addBall(ballx: number, bally: number, ballz: number, strength: number, subtract: number, colors?: Color): void;

	addPlaneX(strength: number, subtract: number): void;
	addPlaneY(strength: number, subtract: number): void;
	addPlaneZ(strength: number, subtract: number): void;

	setCell(x: number, y: number, z: number, value: number): void;
	getCell(x: number, y: number, z: number): number;

	blur(intensity: number): void;

	reset(): void;
	render(renderCallback: any): void;
	generateGeometry(): BufferGeometry;
	generateIBufferGeometry(): BufferGeometry;
}

export interface RefractorOptions {
	color?: ColorRepresentation;
	textureWidth?: number;
	textureHeight?: number;
	clipBias?: number;
	shader?: object;
	encoding?: O3JS.TextureEncoding;
}

export interface Refractor extends Mesh {
	new (geometry?: BufferGeometry, options?: RefractorOptions): this;

	getRenderTarget(): WebGLRenderTarget;
}

export interface Sky extends Mesh {
	new (): this;

	geometry: BoxGeometry;
	material: ShaderMaterial;

	SkyShader: object;
}

export interface WaterOptions {
	textureWidth?: number;
	textureHeight?: number;
	clipBias?: number;
	alpha?: number;
	time?: number;
	waterNormals?: Texture;
	sunDirection?: Vector3;
	sunColor?: ColorRepresentation;
	waterColor?: ColorRepresentation;
	eye?: Vector3;
	distortionScale?: number;
	side?: O3JS.Side;
	fog?: boolean;
}

export interface Water extends Mesh {
	material: ShaderMaterial;
	new (geometry: BufferGeometry, options: WaterOptions): this;
}

export interface Water2Options {
	color?: ColorRepresentation;
	textureWidth?: number;
	textureHeight?: number;
	clipBias?: number;
	flowDirection?: Vector2;
	flowSpeed?: number;
	reflectivity?: number;
	scale?: number;
	shader?: object;
	flowMap?: Texture;
	normalMap0?: Texture;
	normalMap1?: Texture;
	encoding?: O3JS.TextureEncoding;
}

export interface Water2 extends Mesh {
	material: ShaderMaterial;
	new (geometry: BufferGeometry, options: Water2Options): this;
}

export type CSS3DParameters = {
	element?: HTMLElement;
};

export interface CSS3DRenderer {
	new (parameters?: CSS3DParameters): this;
	domElement: HTMLElement;

	getSize(): { width: number; height: number };
	setSize(width: number, height: number): void;
	render(scene: Scene, camera: Camera): void;
}

export interface SVGObject extends Object3D {
	new (node: SVGElement): this;
	node: SVGElement;
}

export interface SVGRenderer {
	new (): this;
	domElement: SVGElement;
	autoClear: boolean;
	sortObjects: boolean;
	sortElements: boolean;
	overdraw: number;
	info: { render: { vertices: number; faces: number } };

	getSize(): { width: number; height: number };
	setQuality(quality: string): void;
	setClearColor(color: Color, alpha: number): void;
	setPixelRatio(): void;
	setSize(width: number, height: number): void;
	setPrecision(precision: number): void;
	clear(): void;
	render(scene: Scene, camera: Camera): void;
}

export enum ArcballControlsMouseActionOperations {
	PAN = 'PAN',
	ROTATE = 'ROTATE',
	ZOOM = 'ZOOM',
	FOV = 'FOV',
}

export type ArcballControlsMouseActionMouse = 0 | 1 | 2 | 'WHEEL';

export enum ArcballControlsMouseActionKeys {
	SHIFT = 'SHIFT',
	CTRL = 'CTRL',
}

export interface ArcballControls extends EventDispatcher {
	camera: Camera | null;
	domElement: HTMLElement;
	scene?: Scene | null | undefined;

	/**
	 * @default 500
	 */
	focusAnimationTime: number;

	/**
	 * @default true
	 */
	enabled: boolean;

	/**
	 * @default true
	 */
	enablePan: boolean;

	/**
	 * @default true
	 */
	enableRotate: boolean;

	/**
	 * @default true
	 */
	enableZoom: boolean;

	/**
	 * @default true
	 */
	enableGizmos: boolean;

	/**
	 * @default true
	 */
	adjustNearFar: boolean;

	/**
	 * @default 1.1
	 */
	scaleFactor: number;

	/**
	 * @default 25
	 */
	dampingFactor: number;

	/**
	 * @default 20
	 */
	wMax: number; // maximum angular velocity allowed

	/**
	 * @default true
	 */
	enableAnimations: boolean; // if animations should be performed

	/**
	 * @default false
	 */
	enableGrid: boolean; // if grid should be showed during pan operation

	/**
	 * @default false
	 */
	cursorZoom: boolean; // if wheel zoom should be cursor centered

	/**
	 * @default 5
	 */
	minFov: number;

	/**
	 * @default 90
	 */
	maxFov: number;

	/**
	 * @default 0
	 */
	minDistance: number;

	/**
	 * @default Infinity
	 */
	maxDistance: number;

	/**
	 * @default 0
	 */
	minZoom: number;

	/**
	 * @default Infinity
	 */
	maxZoom: number;

	/**
	 * @default Vector3(0,0,0)
	 */
	target: Vector3;

	/**
	 * @default 0.67
	 */
	radiusFactor: number;

	new (camera: Camera, domElement: HTMLElement, scene?: Scene | null): this;

	getRaycaster(): Raycaster;

	activateGizmos(isActive: boolean): void;

	copyState(): void;

	pasteState(): void;

	saveState(): void;

	reset(): void;

	setCamera(camera: Camera): void;

	setGizmosVisible(value: boolean): void;

	setTbRadius(value: number): void;

	setMouseAction(
		operation: ArcballControlsMouseActionOperations,
		mouse: ArcballControlsMouseActionMouse,
		key?: ArcballControlsMouseActionKeys
	): boolean;

	unsetMouseAction(mouse: ArcballControlsMouseActionMouse, key?: ArcballControlsMouseActionKeys): boolean;

	setTarget(x: number, y: number, z: number): void;

	update(): void;

	dispose(): void;
}

export interface DragControls extends EventDispatcher {
	new (objects: Object3D[], camera: Camera, domElement?: HTMLElement): this;

	object: Camera;

	// API

	enabled: boolean;
	transformGroup: boolean;

	activate(): void;
	deactivate(): void;
	dispose(): void;
	getObjects(): Object3D[];
}

export interface FirstPersonControls {
	new (object: Camera, domElement?: HTMLElement): this;

	object: Camera;
	domElement: HTMLElement | HTMLDocument;

	enabled: boolean;
	movementSpeed: number;
	lookSpeed: number;
	lookVertical: boolean;
	autoForward: boolean;
	activeLook: boolean;
	heightSpeed: boolean;
	heightCoef: number;
	heightMin: number;
	heightMax: number;
	constrainVertical: boolean;
	verticalMin: number;
	verticalMax: number;
	mouseDragOn: boolean;

	handleResize(): void;
	lookAt(x: number | Vector3, y: number, z: number): this;
	update(delta: number): this;
	dispose(): void;
}

export interface FlyControls extends EventDispatcher {
	new (object: Camera, domElement?: HTMLElement): this;

	object: Camera;
	domElement: HTMLElement | HTMLDocument;

	movementSpeed: number;
	rollSpeed: number;
	dragToLook: boolean;
	autoForward: boolean;

	update(delta: number): void;
	dispose(): void;
}

export interface OrbitControls {
	new (object: Camera, domElement?: HTMLElement): this;

	object: Camera;
	domElement: HTMLElement | HTMLDocument;

	// API
	enabled: boolean;
	target: Vector3;

	// deprecated
	center: Vector3;

	minDistance: number;
	maxDistance: number;

	minZoom: number;
	maxZoom: number;

	minPolarAngle: number;
	maxPolarAngle: number;

	minAzimuthAngle: number;
	maxAzimuthAngle: number;

	enableDamping: boolean;
	dampingFactor: number;

	enableZoom: boolean;
	zoomSpeed: number;

	enableRotate: boolean;
	rotateSpeed: number;

	enablePan: boolean;
	panSpeed: number;
	screenSpacePanning: boolean;
	keyPanSpeed: number;

	autoRotate: boolean;
	autoRotateSpeed: number;

	enableKeys: boolean;
	keys: { LEFT: string; UP: string; RIGHT: string; BOTTOM: string };
	mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE };
	touches: { ONE: TOUCH; WO: TOUCH };

	update(): boolean;

	listenToKeyEvents(domElement: HTMLElement): void;

	saveState(): void;

	reset(): void;

	dispose(): void;

	getPolarAngle(): number;

	getAzimuthalAngle(): number;

	getDistance(): number;

	// EventDispatcher mixins
	addEventListener(type: string, listener: (event: any) => void): void;

	hasEventListener(type: string, listener: (event: any) => void): boolean;

	removeEventListener(type: string, listener: (event: any) => void): void;

	dispatchEvent(event: { type: string; target: any }): void;
}

export interface MapControls extends OrbitControls {
	new (object: Camera, domElement?: HTMLElement): this;
}

export interface PointerLockControls extends EventDispatcher {
	new (camera: Camera, domElement?: HTMLElement): this;

	domElement: HTMLElement;

	// API

	isLocked: boolean;

	minPolarAngle: number;
	maxPolarAngle: number;

	connect(): void;
	disconnect(): void;
	dispose(): void;
	getObject(): Camera;
	getDirection(v: Vector3): Vector3;
	moveForward(distance: number): void;
	moveRight(distance: number): void;
	lock(): void;
	unlock(): void;
}

export interface TrackballControls extends EventDispatcher {
	new (object: Camera, domElement?: HTMLElement): this;

	object: Camera;
	domElement: HTMLElement;

	// API
	enabled: boolean;
	screen: { left: number; top: number; width: number; height: number };
	rotateSpeed: number;
	zoomSpeed: number;
	panSpeed: number;
	noRotate: boolean;
	noZoom: boolean;
	noPan: boolean;
	noRoll: boolean;
	staticMoving: boolean;
	dynamicDampingFactor: number;
	minDistance: number;
	maxDistance: number;
	keys: string[];
	mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE };

	target: Vector3;
	position0: Vector3;
	target0: Vector3;
	up0: Vector3;

	update(): void;

	reset(): void;

	dispose(): void;

	checkDistances(): void;

	zoomCamera(): void;

	panCamera(): void;

	rotateCamera(): void;

	handleResize(): void;
}

export interface TransformControls extends Object3D {
	new (object: Camera, domElement?: HTMLElement): this;

	domElement: HTMLElement;

	// API

	camera: Camera;
	object: Object3D | undefined;
	enabled: boolean;
	axis: 'X' | 'Y' | 'Z' | 'E' | 'XY' | 'YZ' | 'XZ' | 'XYZ' | 'XYZE' | null;
	mode: 'translate' | 'rotate' | 'scale';
	translationSnap: number | null;
	rotationSnap: number | null;
	space: 'world' | 'local';
	size: number;
	dragging: boolean;
	showX: boolean;
	showY: boolean;
	showZ: boolean;
	readonly isTransformControls: true;
	mouseButtons: {
		LEFT: MOUSE;
		MIDDLE: MOUSE;
		RIGHT: MOUSE;
	};

	attach(object: Object3D): this;
	detach(): this;
	getMode(): 'translate' | 'rotate' | 'scale';
	getRaycaster(): Raycaster;
	setMode(mode: 'translate' | 'rotate' | 'scale'): void;
	setTranslationSnap(translationSnap: number | null): void;
	setRotationSnap(rotationSnap: number | null): void;
	setScaleSnap(scaleSnap: number | null): void;
	setSize(size: number): void;
	setSpace(space: 'world' | 'local'): void;
	dispose(): void;
}

/**
 * Reflector shader
 */
export interface ReflectorShader {
	defines: {
		DISTANCE_ATTENUATION: boolean;
		FRESNEL: boolean;
	};
	uniforms: {
		[key: string]: IUniform;
	};
	vertexShader: string;
	fragmentShader: string;
}

/**
 * ReflectorForSSR pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxReflectorForSSRPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/ReflectorForSSRPass) page for a live demo.
 *
 */
export interface ReflectorForSSRPass extends Pass {
	/**
	 * Creates an instance of ngx reflector for ssrpass.
	 *
	 * @param geometry
	 * @param options
	 */
	new (geometry: BufferGeometry, options: ReflectorOptions): this;
}

/**
 * AdaptiveToneMapping pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAdaptiveToneMappingPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/AdaptiveToneMappingPass) page for a live demo.
 *
 */
export interface AdaptiveToneMappingPass extends Pass {
	/**
	 * Creates an instance of ngx adaptive tone mapping pass.
	 *
	 * @param [adaptive]
	 * @param [resolution]
	 */
	new (adaptive?: boolean, resolution?: number): this;

	adaptive: boolean;
	resolution: number;
	needsInit: number;
	luminanceRT: WebGLRenderTarget;
	previousLuminanceRT: WebGLRenderTarget;
	currentLuminanceRT: WebGLRenderTarget;
	copyUniforms: object;
	materialCopy: ShaderMaterial;
	materialLuminance: ShaderMaterial;
	adaptLuminanceShader: object;
	materialAdaptiveLum: ShaderMaterial;
	materialToneMap: ShaderMaterial;
	fsQuad: object;

	reset(): void;
	setAdaptive(adaptive: boolean): void;
	setAdaptionRate(rate: number): void;
	setMinLuminance(minLum: number): void;
	setMaxLuminance(maxLum: number): void;
	setAverageLuminance(avgLum: number): void;
	setMiddleGrey(middleGrey: number): void;
	dispose(): void;
}

/**
 * Afterimage pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAfterimagePass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/AfterimagePass) page for a live demo.
 *
 */
export interface AfterimagePass extends Pass {
	/**
	 * Creates an instance of ngx afterimage pass.
	 *
	 * @param [damp]
	 */
	new (damp?: number): this;

	shader: object;
	uniforms: object;
	textureComp: WebGLRenderTarget;
	textureOld: WebGLRenderTarget;
	shaderMaterial: ShaderMaterial;
	compFsQuad: object;
	copyFsQuad: object;
}

/**
 * Bloom pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxBloomPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/BloomPass) page for a live demo.
 *
 */
export interface BloomPass extends Pass {
	/**
	 * Creates an instance of ngx bloom pass.
	 *
	 * @param [strength]
	 * @param [kernelSize]
	 * @param [sigma]
	 * @param [resolution]
	 */
	new (strength?: number, kernelSize?: number, sigma?: number, resolution?: number): this;
	renderTargetX: WebGLRenderTarget;
	renderTargetY: WebGLRenderTarget;
	copyUniforms: object;
	materialCopy: ShaderMaterial;
	convolutionUniforms: object;
	materialConvolution: ShaderMaterial;
	fsQuad: object;
}

export interface BokehPassParamters {
	focus?: number;
	aspect?: number;
	aperture?: number;
	maxblur?: number;
	width?: number;
	height?: number;
}

/**
 * Bokeh pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxBokehPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/BokehPass) page for a live demo.
 *
 */
export interface BokehPass extends Pass {
	/**
	 * Creates an instance of ngx bokeh pass.
	 *
	 * @param scene
	 * @param camera
	 * @param params
	 */
	new (scene: Scene, camera: Camera, params: BokehPassParamters): this;

	scene: Scene;
	camera: Camera;
	renderTargetColor: WebGLRenderTarget;
	renderTargetDepth: WebGLRenderTarget;
	materialDepth: MeshDepthMaterial;
	materialBokeh: ShaderMaterial;
	uniforms: object;
	fsQuad: object;
	oldClearColor: Color;
}

/**
 * Clear pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxClearPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/ClearPass) page for a live demo.
 *
 */
export interface ClearPass extends Pass {
	/**
	 * Creates an instance of ngx clear pass.
	 *
	 * @param [clearColor]
	 * @param [clearAlpha]
	 */
	new (clearColor?: ColorRepresentation, clearAlpha?: number): this;

	clearColor: ColorRepresentation;
	clearAlpha: number;
}

/**
 * CubeTexture pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCubeTexturePass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/CubeTexturePass) page for a live demo.
 *
 */
export interface CubeTexturePass extends Pass {
	/**
	 * Creates an instance of ngx cube texture pass.
	 *
	 * @param camera
	 * @param [envMap]
	 * @param [opacity]
	 */
	new (camera: PerspectiveCamera, envMap?: CubeTexture, opacity?: number): this;

	camera: PerspectiveCamera;
	cubeShader: object;
	cubeMesh: Mesh;
	envMap: CubeTexture;
	opacity: number;
	cubeScene: Scene;
	cubeCamera: PerspectiveCamera;
}

/**
 * DotScreen pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxDotScreenPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/DotScreenPass) page for a live demo.
 *
 */
export interface DotScreenPass extends Pass {
	/**
	 * Creates an instance of ngx dot screen pass.
	 *
	 * @param [center]
	 * @param [angle]
	 * @param [scale]
	 */
	new (center?: Vector2, angle?: number, scale?: number): this;

	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;
}

/**
 * Film pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxFilmPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/FilmPass) page for a live demo.
 *
 */
export interface FilmPass extends Pass {
	/**
	 * Creates an instance of ngx film pass.
	 *
	 * @param [noiseIntensity]
	 * @param [scanlinesIntensity]
	 * @param [scanlinesCount]
	 * @param [grayscale]
	 */
	new (noiseIntensity?: number, scanlinesIntensity?: number, scanlinesCount?: number, grayscale?: number): this;

	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;
}

/**
 * Glitch pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxGlitchPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/GlitchPass) page for a live demo.
 *
 */
export interface GlitchPass extends Pass {
	/**
	 * Creates an instance of ngx glitch pass.
	 *
	 * @param [dtSize]
	 */
	new (dtSize?: number): this;

	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;
	goWild: boolean;
	curF: number;
	randX: number;

	generateTrigger(): void;
	generateHeightmap(dt_size: number): DataTexture;
}

export interface HalftonePassParameters {
	shape?: number;
	radius?: number;
	rotateR?: number;
	rotateB?: number;
	rotateG?: number;
	scatter?: number;
	blending?: number;
	blendingMode?: number;
	greyscale?: boolean;
	disable?: boolean;
}

/**
 * Halftone pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxHalftonePass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/HalftonePass) page for a live demo.
 *
 */
export interface HalftonePass extends Pass {
	/**
	 * Creates an instance of ngx halftone pass.
	 *
	 * @param width
	 * @param height
	 * @param params
	 */
	new (width: number, height: number, params: HalftonePassParameters): this;
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;
}

export interface LUTPassParameters {
	lut?: DataTexture | DataTexture3D;
	intensity?: number;
}

/**
 * LUT pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLUTPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/LUTPass) page for a live demo.
 *
 */
export interface LUTPass extends Pass {
	/**
	 * Creates an instance of ngx lutpass.
	 *
	 * @param params
	 */
	new (params: LUTPassParameters): this;

	lut?: DataTexture | DataTexture3D;
	intensity?: number;
}

/**
 * ClearMask pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxClearMaskPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/ClearMaskPass) page for a live demo.
 *
 */
export interface ClearMaskPass extends Pass {
	/**
	 * Creates an instance of ngx clear mask pass.
	 */
	new (): this;
}

/**
 * Mask pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMaskPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/MaskPass) page for a live demo.
 *
 */
export interface MaskPass extends Pass {
	/**
	 * Creates an instance of ngx mask pass.
	 *
	 * @param scene
	 * @param camera
	 */
	new (scene: Scene, camera: Camera): this;

	scene: Scene;
	camera: Camera;
	inverse: boolean;
}

/**
 * OutlinePass pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxOutlinePass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/OutlinePass) page for a live demo.
 *
 */
export interface OutlinePass extends Pass {
	/**
	 * Creates an instance of ngx outline pass.
	 *
	 * @param resolution
	 * @param scene
	 * @param camera
	 * @param [selectedObjects]
	 */
	new (resolution: Vector2, scene: Scene, camera: Camera, selectedObjects?: Object3D[]): this;

	renderScene: Scene;
	renderCamera: Camera;
	selectedObjects: Object3D[];
	visibleEdgeColor: Color;
	hiddenEdgeColor: Color;
	edgeGlow: number;
	usePatternTexture: boolean;
	edgeThickness: number;
	edgeStrength: number;
	downSampleRatio: number;
	pulsePeriod: number;
	resolution: Vector2;
	patternTexture: Texture;

	maskBufferMaterial: MeshBasicMaterial;
	renderTargetMaskBuffer: WebGLRenderTarget;
	depthMaterial: MeshDepthMaterial;
	prepareMaskMaterial: ShaderMaterial;
	renderTargetDepthBuffer: WebGLRenderTarget;
	renderTargetMaskDownSampleBuffer: WebGLRenderTarget;
	renderTargetBlurBuffer1: WebGLRenderTarget;
	renderTargetBlurBuffer2: WebGLRenderTarget;
	edgeDetectionMaterial: ShaderMaterial;
	renderTargetEdgeBuffer1: WebGLRenderTarget;
	renderTargetEdgeBuffer2: WebGLRenderTarget;
	separableBlurMaterial1: ShaderMaterial;
	separableBlurMaterial2: ShaderMaterial;
	overlayMaterial: ShaderMaterial;
	copyUniforms: object;
	materialCopy: ShaderMaterial;
	oldClearColor: Color;
	oldClearAlpha: number;
	fsQuad: object;
	tempPulseColor1: Color;
	tempPulseColor2: Color;
	textureMatrix: Matrix4;

	dispose(): void;
	changeVisibilityOfSelectedObjects(bVisible: boolean): void;
	changeVisibilityOfNonSelectedObjects(bVisible: boolean): void;
	updateTextureMatrix(): void;
	getPrepareMaskMaterial(): ShaderMaterial;
	getEdgeDetectionMaterial(): ShaderMaterial;
	getSeperableBlurMaterial(): ShaderMaterial;
	getOverlayMaterial(): ShaderMaterial;
}

export interface Pass {
	new (): this;
	enabled: boolean;
	needsSwap: boolean;
	clear: boolean;
	renderToScreen: boolean;

	setSize(width: number, height: number): void;
	render(
		renderer: WebGLRenderer,
		writeBuffer: WebGLRenderTarget,
		readBuffer: WebGLRenderTarget,
		deltaTime: number,
		maskActive: boolean
	): void;
}

export interface FullScreenQuad {
	new (material?: Material): this;

	render(renderer: WebGLRenderer): void;
	dispose(): void;

	material: Material;
}

/**
 * Render pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRenderPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/RenderPass) page for a live demo.
 *
 */
export interface RenderPass extends Pass {
	/**
	 * Creates an instance of ngx render pass.
	 * @param scene
	 * @param camera
	 * @param [overrideMaterial]
	 * @param [clearColor]
	 * @param [clearAlpha]
	 */
	new (scene: Scene, camera: Camera, overrideMaterial?: Material, clearColor?: Color, clearAlpha?: number): this;

	scene: Scene;
	camera: Camera;
	overrideMaterial: Material;
	clearColor: Color;
	clearAlpha: number;
	clearDepth: boolean;
}

export enum SAO_OUTPUT {
	Beauty,
	Default,
	SAO,
	Depth,
	Normal,
}

export interface SAOPassParams {
	output: SAO_OUTPUT;
	saoBias: number;
	saoIntensity: number;
	saoScale: number;
	saoKernelRadius: number;
	saoMinResolution: number;
	saoBlur: boolean;
	saoBlurRadius: number;
	saoBlurStdDev: number;
	saoBlurDepthCutoff: number;
}

/**
 * SAO pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSAOPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SAOPass) page for a live demo.
 *
 */
export interface SAOPass extends Pass {
	new (scene: Scene, camera: Camera, depthTexture?: boolean, useNormals?: boolean, resolution?: Vector2): this;

	scene: Scene;
	camera: Camera;
	supportsDepthTextureExtension: boolean;
	supportsNormalTexture: boolean;
	originalClearColor: Color;
	oldClearColor: Color;
	oldClearAlpha: number;
	resolution: Vector2;
	saoRenderTarget: WebGLRenderTarget;
	blurIntermediateRenderTarget: WebGLRenderTarget;
	beautyRenderTarget: WebGLRenderTarget;
	normalRenderTarget: WebGLRenderTarget;
	depthRenderTarget: WebGLRenderTarget;
	depthMaterial: MeshDepthMaterial;
	normalMaterial: MeshNormalMaterial;
	saoMaterial: ShaderMaterial;
	vBlurMaterial: ShaderMaterial;
	hBlurMaterial: ShaderMaterial;
	materialCopy: ShaderMaterial;
	depthCopy: ShaderMaterial;
	fsQuad: object;
	params: SAOPassParams;

	renderPass(
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor?: ColorRepresentation,
		clearAlpha?: number
	): void;
	renderOverride(
		renderer: WebGLRenderer,
		overrideMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor?: ColorRepresentation,
		clearAlpha?: number
	): void;
}

/**
 * Save pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSavePass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SavePass) page for a live demo.
 *
 */
export interface SavePass extends Pass {
	/**
	 * Creates an instance of ngx save pass.
	 *
	 * @param renderTarget
	 */
	new (renderTarget: WebGLRenderTarget): this;

	textureID: string;
	renderTarget: WebGLRenderTarget;
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;
}

/**
 * Shader pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/ShaderPass) page for a live demo.
 *
 */
export interface ShaderPass extends Pass {
	/**
	 * Creates an instance of ngx shader pass.
	 *
	 * @param shader
	 * @param [textureId]
	 */
	new (shader: object, textureId?: string): this;

	textureID: string;
	uniforms: { [name: string]: { value: any } };
	material: ShaderMaterial;
	fsQuad: object;
}

/**
 * SMAA pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSMAAPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SMAAPass) page for a live demo.
 *
 */
export interface SMAAPass extends Pass {
	/**
	 * Creates an instance of ngx smaapass.
	 *
	 * @param width
	 * @param height
	 */
	new (width: number, height: number): this;

	edgesRT: WebGLRenderTarget;
	weightsRT: WebGLRenderTarget;
	areaTexture: Texture;
	searchTexture: Texture;
	uniformsEdges: object;
	materialEdges: ShaderMaterial;
	uniformsWeights: object;
	materialWeights: ShaderMaterial;
	uniformsBlend: object;
	materialBlend: ShaderMaterial;
	fsQuad: object;

	getAreaTexture(): string;
	getSearchTexture(): string;
}

/**
 * SSAARender pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSSAARenderPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SSAARenderPass) page for a live demo.
 *
 */
export interface SSAARenderPass extends Pass {
	/**
	 * Creates an instance of ngx ssaarender pass.
	 *
	 * @param scene
	 * @param camera
	 * @param clearColor
	 * @param clearAlpha
	 */
	new (scene: Scene, camera: Camera, clearColor: ColorRepresentation, clearAlpha: number): this;

	scene: Scene;
	camera: Camera;
	sampleLevel: number;
	unbiased: boolean;
	clearColor: ColorRepresentation;
	clearAlpha: number;
	copyUniforms: object;
	copyMaterial: ShaderMaterial;
	fsQuad: object;
	sampleRenderTarget: undefined | WebGLRenderTarget;
}

/**
 * SSAO pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSSAOPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SSAOPass) page for a live demo.
 *
 */
export interface SSAOPass extends Pass {
	/**
	 * Creates an instance of ngx ssaopass.
	 *
	 * @param scene
	 * @param camera
	 * @param [width]
	 * @param [height]
	 */
	new (scene: Scene, camera: Camera, width?: number, height?: number): this;

	scene: Scene;
	camera: Camera;
	width: number;
	height: boolean;
	clear: boolean;
	kernelRadius: number;
	kernelSize: number;
	kernel: Vector3[];
	noiseTexture: DataTexture;
	output: any;
	minDistance: number;
	maxDistance: number;
	beautyRenderTarget: WebGLRenderTarget;
	normalRenderTarget: WebGLRenderTarget;
	ssaoRenderTarget: WebGLRenderTarget;
	blurRenderTarget: WebGLRenderTarget;
	ssaoMaterial: ShaderMaterial;
	normalMaterial: MeshNormalMaterial;
	blurMaterial: ShaderMaterial;
	depthRenderMaterial: ShaderMaterial;
	copyMaterial: ShaderMaterial;
	fsQuad: object;
	originalClearColor: Color;
	dipose(): void;
	generateSampleKernel(): Vector3[];
	generateRandomKernelRotations(): void;
	renderPass(
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor?: ColorRepresentation,
		clearAlpha?: number
	): void;
	renderOverride(
		renderer: WebGLRenderer,
		overrideMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor?: ColorRepresentation,
		clearAlpha?: number
	): void;
}

export interface SSRPassParams {
	renderer: WebGLRenderer;
	scene: Scene;
	camera: Camera;
	width?: number | undefined;
	height?: number | undefined;
	selects: Mesh[] | null;
	isPerspectiveCamera?: boolean | undefined;
	isBouncing?: boolean | undefined;
	groundReflector: any | null;
}

/**
 * SSR pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSSRPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SSRPass) page for a live demo.
 *
 */
export interface SSRPass extends Pass {
	/**
	 * Creates an instance of ngx ssrpass.
	 *
	 * @param params
	 */
	new (params: SSRPassParams): this;

	width: number;
	height: number;
	clear: boolean;
	renderer: WebGLRenderer;
	scene: Scene;
	camera: Camera;
	groundReflector: any | null;
	opacity: number;
	output: number;
	maxDistance: number;
	thickness: number;
	tempColor: Color;

	get selects(): Mesh[] | null;
	set selects(val: Mesh[] | null);
	selective: boolean;
	get isBouncing(): boolean;
	set isBouncing(val: boolean);

	blur: boolean;

	get isDistanceAttenuation(): boolean;
	set isDistanceAttenuation(val: boolean);
	get isFresnel(): boolean;
	set isFresnel(val: boolean);
	get isInfiniteThick(): boolean;
	set isInfiniteThick(val: boolean);

	thickTolerance: number;

	beautyRenderTarget: WebGLRenderTarget;
	prevRenderTarget: WebGLRenderTarget;
	normalRenderTarget: WebGLRenderTarget;
	metalnessRenderTarget: WebGLRenderTarget;
	ssrRenderTarget: WebGLRenderTarget;

	blurRenderTarget: WebGLRenderTarget;
	blurRenderTarget2: WebGLRenderTarget;

	ssrMaterial: ShaderMaterial;

	normalMaterial: MeshNormalMaterial;

	metalnessOnMaterial: MeshBasicMaterial;

	metalnessOffMaterial: MeshBasicMaterial;

	blurMaterial: ShaderMaterial;
	blurMaterial2: ShaderMaterial;

	depthRenderMaterial: ShaderMaterial;

	copyMaterial: ShaderMaterial;

	fsQuad: FullScreenQuad;

	originalClearColor: Color;

	dispose: () => void;

	renderPass: (
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor: ColorRepresentation,
		clearAlpha: ColorRepresentation
	) => void;

	renderOverride: (
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor: ColorRepresentation,
		clearAlpha: ColorRepresentation
	) => void;

	renderMetalness: (
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor: ColorRepresentation,
		clearAlpha: ColorRepresentation
	) => void;
}

export interface SSRrPassParams {
	renderer: WebGLRenderer;
	scene: Scene;
	camera: Camera;
	width?: number | undefined;
	height?: number | undefined;
	selects: Mesh[] | null;
}

/**
 * SSRr pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSSRrPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SSRrPass) page for a live demo.
 *
 */
export interface SSRrPass extends Pass {
	/**
	 * Creates an instance of ngx ssrr pass.
	 *
	 * @param params
	 */
	new (params: SSRrPassParams): this;

	width: number;
	height: number;
	clear: boolean;

	renderer: WebGLRenderer;
	scene: Scene;
	camera: Camera;

	output: number;

	ior: number;
	maxDistance: number;
	surfDist: number;

	color: Color;

	seleects: Mesh[] | null;

	_specular: boolean;
	get specular(): boolean;
	set specular(spec: boolean);

	_fillHole: boolean;
	get fillHole(): boolean;
	set fillHole(spec: boolean);

	_infiniteThick: boolean;
	get infiniteThick(): boolean;
	set infiniteThick(spec: boolean);

	beautyRenderTarget: WebGLRenderTarget;
	specularRenderTarget: WebGLRenderTarget;
	normalSelectsRenderTarget: WebGLRenderTarget;
	refractiveRenderTarget: WebGLRenderTarget;
	ssrrRenderTarget: WebGLRenderTarget;

	ssrrMaterial: ShaderMaterial;

	normalMaterial: MeshNormalMaterial;
	refractiveOnMaterial: MeshBasicMaterial;
	refractiveOffMaterial: MeshBasicMaterial;
	specularMaterial: MeshStandardMaterial;

	depthRenderMaterial: ShaderMaterial;
	copyMaterial: ShaderMaterial;

	fsQuad: FullScreenQuad;

	originalClearColor: Color;

	dispose: () => void;

	render: (renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget) => void;

	renderPass: (
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor: ColorRepresentation,
		clearAlpha: ColorRepresentation
	) => void;

	renderOverride: (
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor: ColorRepresentation,
		clearAlpha: ColorRepresentation
	) => void;

	renderRefractive: (
		renderer: WebGLRenderer,
		passMaterial: Material,
		renderTarget: WebGLRenderTarget,
		clearColor: ColorRepresentation,
		clearAlpha: ColorRepresentation
	) => void;

	setSize: (width: number, height: number) => void;
}

/**
 * AARender pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTAARenderPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/TAARenderPass) page for a live demo.
 *
 */
export interface TAARenderPass extends SSAARenderPass {
	/**
	 * Creates an instance of ngx taarender pass.
	 *
	 * @param scene
	 * @param camera
	 * @param clearColor
	 * @param clearAlpha
	 */
	new (scene: Scene, camera: Camera, clearColor: ColorRepresentation, clearAlpha: number): this;

	accumulate: boolean;
}

/**
 * Texture pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTexturePass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/TexturePass) page for a live demo.
 *
 */
export interface TexturePass extends Pass {
	/**
	 * Creates an instance of ngx texture pass.
	 *
	 * @param map
	 * @param [opacity]
	 */
	new (map: Texture, opacity?: number): this;

	map: Texture;
	opacity: number;
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: object;
}

/**
 * UnrealBloom pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxUnrealBloomPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/UnrealBloomPass) page for a live demo.
 *
 */
export interface UnrealBloomPass extends Pass {
	/**
	 * Creates an instance of ngx unreal bloom pass.
	 *
	 * @param resolution
	 * @param strength
	 * @param radius
	 * @param threshold
	 */
	new (resolution: Vector2, strength: number, radius: number, threshold: number): this;

	resolution: Vector2;
	strength: number;
	radius: number;
	threshold: number;
	clearColor: Color;
	renderTargetsHorizontal: WebGLRenderTarget[];
	renderTargetsVertical: WebGLRenderTarget[];
	nMips: number;
	renderTargetBright: WebGLRenderTarget;
	highPassUniforms: object;
	materialHighPassFilter: ShaderMaterial;
	separableBlurMaterials: ShaderMaterial[];
	compositeMaterial: ShaderMaterial;
	bloomTintColors: Vector3[];
	copyUniforms: object;
	materialCopy: ShaderMaterial;
	oldClearColor: Color;
	oldClearAlpha: number;
	basic: MeshBasicMaterial;
	fsQuad: object;

	dispose(): void;
	getSeperableBlurMaterial(): ShaderMaterial;
	getCompositeMaterial(): ShaderMaterial;
}

/**
 * Copy pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderCopyPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/CopyPass) page for a live demo.
 *
 */
export interface ShaderCopyPass extends ShaderPass {
	/**
	 * Creates an instance of ngx copy pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * RGBShift pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderRGBShiftPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/RGBShiftPass) page for a live demo.
 *
 */
export interface ShaderRGBShiftPass extends ShaderPass {
	/**
	 * Creates an instance of ngx RGBShift pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * BleachBypass pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderBleachBypassPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/BleachBypassPass) page for a live demo.
 *
 */
export interface ShaderBleachBypassPass extends ShaderPass {
	/**
	 * Creates an instance of ngx BleachBypass pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * Sepia pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderSepiaPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SepiaPass) page for a live demo.
 *
 */
export interface ShaderSepiaPass extends ShaderPass {
	/**
	 * Creates an instance of ngx Sepia pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * Vignette pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderVignettePass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/VignettePass) page for a live demo.
 *
 */
export interface ShaderVignettePass extends ShaderPass {
	/**
	 * Creates an instance of ngx Vignette pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * GammaCorrection pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderGammaCorrectionPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/GammaCorrectionPass) page for a live demo.
 *
 */
export interface ShaderGammaCorrectionPass extends ShaderPass {
	/**
	 * Creates an instance of ngx GammaCorrection pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * FXAA pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderFXAAPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/FXAAPass) page for a live demo.
 *
 */
export interface ShaderFXAAPass extends ShaderPass {
	/**
	 * Creates an instance of ngx FXAA pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * Pixel pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderPixelPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/PixelPass) page for a live demo.
 *
 */
export interface ShaderPixelPass extends ShaderPass {
	/**
	 * Creates an instance of ngx Pixel pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * Luminosity pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderLuminosityPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/LuminosityPass) page for a live demo.
 *
 */
export interface ShaderLuminosityPass extends ShaderPass {
	/**
	 * Creates an instance of ngx Luminosity pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * DotScreen pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderDotScreenPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/DotScreenPass) page for a live demo.
 *
 */
export interface ShaderDotScreenPass extends ShaderPass {
	/**
	 * Creates an instance of ngx Luminosity pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * SobelOperator pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSobelOperatorPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SobelOperatorPass) page for a live demo.
 *
 */
export interface SobelOperatorPass extends ShaderPass {
	/**
	 * Creates an instance of ngx SobelOperator pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * ShaderMaterial pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderMaterialPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/ShaderMaterialPass) page for a live demo.
 *
 */
export interface ShaderMaterialPass extends ShaderPass {
	/**
	 * Creates an instance of ngx ShaderMaterial pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

export interface AsciiEffectOptions {
	resolution?: number;
	scale?: number;
	color?: boolean;
	alpha?: boolean;
	block?: boolean;
	invert?: boolean;
}

export interface AsciiEffect {
	new (renderer: WebGLRenderer, charSet?: string, options?: AsciiEffectOptions): this;
	domElement: HTMLElement;

	render(scene: Scene, camera: Camera): void;
	setSize(width: number, height: number): void;
}

export interface OutlineEffectParameters {
	defaultThickness?: number | undefined;
	defaultColor?: number[] | undefined;
	defaultAlpha?: number | undefined;
	defaultKeepAlive?: boolean | undefined;
}

export interface OutlineEffect {
	new (renderer: WebGLRenderer, parameters?: OutlineEffectParameters): this;
	enabled: boolean;
	autoClear: boolean;
	domElement: HTMLElement;
	shadowMap: WebGLShadowMap;

	clear(color?: boolean, depth?: boolean, stencil?: boolean): void;
	getPixelRatio(): number;
	getSize(target: Vector2): Vector2;
	render(scene: Scene, camera: Camera): void;
	renderOutline(scene: Scene, camera: Camera): void;
	setRenderTarget(renderTarget: WebGLRenderTarget | null): void;
	setPixelRatio(value: number): void;
	setScissor(x: Vector4 | number, y?: number, width?: number, height?: number): void;
	setScissorTest(enable: boolean): void;
	setSize(width: number, height: number, updateStyle?: boolean): void;
	setViewport(x: Vector4 | number, y?: number, width?: number, height?: number): void;
}

export interface ParallaxBarrierEffect {
	new (renderer: WebGLRenderer): this;

	render(scene: Scene, camera: Camera): void;
	setSize(width: number, height: number): void;
}

export interface PeppersGhostEffect {
	new (renderer: WebGLRenderer): this;
	cameraDistance: number;
	reflectFromAbove: boolean;

	render(scene: Scene, camera: Camera): void;
	setSize(width: number, height: number): void;
}

export interface EffectComposer {
	new (renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget): this;
	renderer: WebGLRenderer;
	renderTarget1: WebGLRenderTarget;
	renderTarget2: WebGLRenderTarget;
	writeBuffer: WebGLRenderTarget;
	readBuffer: WebGLRenderTarget;
	passes: Pass[];
	copyPass: ShaderPass;
	clock: Clock;
	renderToScreen: boolean;

	swapBuffers(): void;
	addPass(pass: Pass): void;
	insertPass(pass: Pass, index: number): void;
	removePass(pass: Pass): void;
	isLastEnabledPass(passIndex: number): boolean;
	render(deltaTime?: number): void;
	reset(renderTarget?: WebGLRenderTarget): void;
	setSize(width: number, height: number): void;
	setPixelRatio(pixelRatio: number): void;
}

export interface UVBoxes {
	w: number;
	h: number;
	index: number;
}

export interface LightMapContainers {
	basicMat: Material | Material[];
	object: Object3D;
}

export interface ProgressiveLightMap {
	renderer: WebGLRenderer;
	res: number;
	lightMapContainers: LightMapContainers[];
	compiled: boolean;
	scene: Scene;
	tinyTarget: WebGLRenderTarget;
	buffer1Active: boolean;
	firstUpdate: boolean;
	warned: boolean;

	progressiveLightMap1: WebGLRenderTarget;
	progressiveLightMap2: WebGLRenderTarget;

	uvMat: MeshPhongMaterial;

	uv_boxes: UVBoxes[];

	blurringPlane: Mesh<PlaneGeometry, MeshBasicMaterial>;

	labelMaterial: MeshBasicMaterial;
	labelPlane: PlaneGeometry;
	labelMesh: Mesh<PlaneGeometry, MeshBasicMaterial>;

	new (renderer: WebGLRenderer, res?: number): this;

	addObjectsToLightMap(objects: Object3D[]): void;

	update(camera: Camera, blendWindow?: number, blurEdges?: boolean): void;

	showDebugLightmap(visible: boolean, position?: Vector3): void;
}

export interface SceneUtils {
	createMeshesFromInstancedMesh(instancedMesh: InstancedMesh): Group;
	createMultiMaterialObject(geometry: BufferGeometry, materials: Material[]): Group;
	/**
	 * @deprecated Use scene.attach( child ) instead.
	 */
	detach(child: Object3D, parent: Object3D, scene: Scene): void;
	/**
	 * @deprecated Use parent.attach( child ) instead.
	 */
	attach(child: Object3D, scene: Scene, parent: Object3D): void;
}

export interface ShadowMesh extends Mesh {
	new (mesh?: Mesh): this;

	update(plane: Plane, lightPosition4D: Vector4): void;
}

export interface Size {
	width: number;
	height: number;
	set: (width: number, height: number) => void;
}

export interface Position {
	x: number;
	y: number;
	set: (x: number, y: number) => void;
}

export interface ShadowMapViewer {
	new (light: Light): this;

	enabled: boolean;
	size: Size;
	position: Position;
	render(renderer: Renderer): void;
	updateForWindowResize(): void;
	update(): void;
}

export interface TiltLoader extends Loader {
	new (manager?: LoadingManager, storePath?: string): this;
	load(
		url: string,
		onLoad: (object: Group) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>;
	parse(data: ArrayBuffer): Group;
}

export interface ColladaExporterOptions {
	author?: string;
	textureDirectory?: string;
	version?: string;
}

export interface ColladaExporterResult {
	data: string;
	textures: object[];
}

export interface ColladaExporter {
	new (): this;

	parse(
		object: Object3D,
		onDone: (res: ColladaExporterResult) => void,
		options: ColladaExporterOptions
	): ColladaExporterResult | null;
}

export interface DRACOExporterOptions {
	decodeSpeed?: number;
	encodeSpeed?: number;
	encoderMethod?: number;
	quantization?: number[];
	exportUvs?: boolean;
	exportNormals?: boolean;
	exportColor?: boolean;
}

export interface DRACOExporter {
	new (): this;
	parse(object: Mesh | Points, options: DRACOExporterOptions): Int8Array;
}

export interface GLTFExporterOptions {
	binary?: boolean;
	trs?: boolean;
	onlyVisible?: boolean;
	truncateDrawRange?: boolean;
	embedImages?: boolean;
	animations?: AnimationClip[];
	forceIndices?: boolean;
	forcePowerOfTwoTextures?: boolean;
	includeCustomExtensions?: boolean;
}

export interface GLTFExporter {
	new (): this;
	parse(input: Object3D, onCompleted: (gltf: object) => void, options: GLTFExporterOptions): void;
}

export interface MMDExporter {
	new (): this;
	parseVpd(skin: Object3D, outputShiftJis: boolean, useOriginalBones: boolean): [] | Uint8Array;
}

export interface OBJExporter {
	new (): this;
	parse(object: Object3D): string;
}

export interface PLYExporterOptions {
	binary?: boolean;
	excludeAttributes?: string[];
	littleEndian?: boolean;
}

export interface PLYExporter {
	new (): this;
	parse(object: Object3D, onDone: (res: string) => void, options: PLYExporterOptions): string | null;
}

export interface STLExporterOptions {
	binary?: boolean;
}

export interface STLExporter {
	new (): this;

	parse(scene: Object3D, options?: STLExporterOptions): string;
}

export interface USDZExporter {
	new (): this;
	parse(scene: Object3D): Promise<Uint8Array>;
}

export interface Rhino3dmLoader extends Loader {
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
	load(
		url: string,
		onLoad: (object: Group) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>;
	parse(data: ArrayBuffer): Group;
}

export interface BasisTextureLoader extends Loader {
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

export interface BVH {
	clip: AnimationClip;
	skeleton: Skeleton;
}

export interface BVHLoader extends Loader {
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

export interface Collada {
	kinematics: object;
	library: object;
	scene: Scene;
}

export interface ColladaLoader extends Loader {
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
	format: O3JS.PixelFormat | O3JS.CompressedPixelFormat;
	mipmapCount: number;
	isCubemap: boolean;
}

export interface DDSLoader extends CompressedTextureLoader {
	parse(buffer: ArrayBuffer, loadMipmaps: boolean): DDS;
}

export interface DRACOLoader extends Loader {
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
	format: O3JS.PixelFormat;
	type: O3JS.TextureDataType;
}

export interface EXRLoader extends DataTextureLoader {
	type: O3JS.TextureDataType;

	parse(buffer: ArrayBuffer): EXR;
	setDataType(type: O3JS.TextureDataType): this;
}

export interface FBXLoader extends Loader {
	load(
		url: string,
		onLoad: (object: Group) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>;
	parse(FBXBuffer: ArrayBuffer | string, path: string): Group;
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

export interface FontLoader extends Loader {
	load(
		url: string,
		onLoad?: (responseFont: Font) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Font>;
	parse(json: any): Font;
}

export interface GCodeLoader extends Loader {
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
	getMaterialType?: ((materialIndex: number) => Material | null) | undefined;
	extendMaterialParams?:
		| ((materialIndex: number, materialParams: { [key: string]: any }) => Promise<any> | null)
		| undefined;
	createNodeMesh?: ((nodeIndex: number) => Promise<Group | Mesh | SkinnedMesh> | null) | undefined;
	createNodeAttachment?: ((nodeIndex: number) => Promise<Object3D> | null) | undefined;
}

export interface HDRCubeTextureLoader extends Loader {
	hdrLoader: RGBELoader;
	type: O3JS.TextureDataType;

	load(
		urls: string[],
		onLoad: (texture: CubeTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): CubeTexture;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<CubeTexture>;
	setDataType(type: O3JS.TextureDataType): this;
}

export interface IFCLoaderSettings {
	COORDINATE_TO_ORIGIN: boolean;
	USE_FAST_BOOLS: boolean;
	CIRCLE_SEGMENTS_LOW?: number;
	CIRCLE_SEGMENTS_MEDIUM?: number;
	CIRCLE_SEGMENTS_HIGH?: number;
}

export interface IFCJSONObject {
	expressID: number;
	type: string;

	[key: string]: any;
}

export interface IFCHighlightConfig {
	scene: Object3D;
	ids: number[];
	removePrevious: boolean;
	material?: Material;
}

export interface IFCHighlightConfigOfModel extends IFCHighlightConfig {
	modelID: number;
}

export interface IFCManager {
	parse(buffer: ArrayBuffer): Promise<IFCModel>;

	/**
	 * Sets the relative path of web-ifc.wasm file in the project.
	 * Beware: you **must** serve this file in your page; this means
	 * that you have to copy this files from *node_modules/web-ifc*
	 * to your deployment directory.
	 *
	 * If you don't use this methods,
	 * FC.js assumes that you are serving it in the root directory.
	 *
	 * Example if web-ifc.wasm is in dist/wasmDir:
	 * `ifcLoader.setWasmPath("dist/wasmDir/");`
	 *
	 * @path Relative path to web-ifc.wasm.
	 */
	setWasmPath(path: string): void;

	/**
	 * Applies a configuration for [web-ifc](https://ifcjs.github.io/info/docs/Guide/web-ifc/Introduction).
	 */
	applyWebIfcConfig(settings: IFCLoaderSettings): void;

	/**
	 * Enables the JSON mode (which consumes way less memory) and eliminates the WASM data.
	 * Only use this in the following scenarios:
	 * - If you don't need to access the properties of the FC
	 * - If you will provide the properties as JSON.
	 */
	useJSONData(useJSON?: boolean): void;

	/**
	 * Adds the properties of a model as JSON data.
	 * @modelID D of the FC model.
	 * @data: data as an object where the keys are the expressIDs and the values the properties.
	 */
	addModelJSONData(
		modelID: number,
		data: {
			[id: number]: IFCJSONObject;
		}
	): void;

	/**
	 * Completely releases the WASM memory, thus drastically decreasing the memory use of the app.
	 * Only use this in the following scenarios:
	 * - If you don't need to access the properties of the FC
	 * - If you will provide the properties as JSON.
	 */
	disposeMemory(): void;

	/**
	 * Makes object picking a lot faster
	 * Courtesy of gkjohnson's [work](https://github.com/gkjohnson/three-mesh-bvh).
	 * Import these objects from his library and pass them as arguments. FC.js takes care of the rest!
	 */
	setupThreeMeshBVH(computeBoundsTree: any, disposeBoundsTree: any, acceleratedRaycast: any): void;

	/**
	 * Closes the specified model and deletes it from the [scene](https://threejs.org/docs/#api/en/scenes/Scene).
	 * @modelID D of the FC model.
	 * @scene Scene where the model is (if it's located in a scene).
	 */
	close(modelID: number, scene?: Scene): void;

	/**
	 * Gets the **Express D** to which the given face belongs.
	 * This D uniquely identifies this entity within this FC file.
	 * @geometry The geometry of the FC model.
	 * @faceIndex The index of the face of a geometry.You can easily get this index using the [Raycaster](https://threejs.org/docs/#api/en/core/Raycaster).
	 */
	getExpressId(geometry: BufferGeometry, faceIndex: number): number | undefined;

	/**
	 * Returns all items of the specified type. You can import
	 * the types from *web-ifc*.
	 *
	 * Example to get all the standard walls of a project:
	 * ```js
	 * import { FCWALLSTANDARDCASE } from 'web-ifc';
	 * const walls = ifcLoader.getAllItemsOfType(FCWALLSTANDARDCASE);
	 * ```
	 * @modelID D of the FC model.
	 * @ifcType type of FC items to get.
	 * @verbose If false (default), this only gets Ds. If true, this also gets the native properties of all the fetched items.
	 */
	getAllItemsOfType(modelID: number, type: number, verbose: boolean): any[];

	/**
	 * Gets the native properties of the given element.
	 * @modelID D of the FC model.
	 * @id Express D of the element.
	 * @recursive Wether you want to get the information of the referenced elements recursively.
	 */
	getItemProperties(modelID: number, id: number, recursive?: boolean): any;

	/**
	 * Gets the [property sets](https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifckernel/lexical/ifcpropertyset.htm)
	 * assigned to the given element.
	 * @modelID D of the FC model.
	 * @id Express D of the element.
	 * @recursive If true, this gets the native properties of the referenced elements recursively.
	 */
	getPropertySets(modelID: number, id: number, recursive?: boolean): any[];

	/**
	 * Gets the properties of the type assigned to the element.
	 * For example, if applied to a wall (IfcWall), this would get back the information
	 * contained in the IfcWallType assigned to it, if any.
	 * @modelID D of the FC model.
	 * @id Express D of the element.
	 * @recursive If true, this gets the native properties of the referenced elements recursively.
	 */
	getTypeProperties(modelID: number, id: number, recursive?: boolean): any[];

	/**
	 * Gets the materials assigned to the given element.
	 * @modelID D of the FC model.
	 * @id Express D of the element.
	 * @recursive If true, this gets the native properties of the referenced elements recursively.
	 */
	getMaterialsProperties(modelID: number, id: number, recursive?: boolean): any[];

	/**
	 * Gets the ifc type of the specified item.
	 * @modelID D of the FC model.
	 * @id Express D of the element.
	 */
	getIfcType(modelID: number, id: number): string;

	/**
	 * Gets the spatial structure of the project. The
	 * [spatial structure](https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifcproductextension/lexical/ifcspatialstructureelement.htm)
	 * is the hierarchical structure that organizes every FC project (all physical items
	 * are referenced to an element of the spatial structure). It is formed by
	 * one IfcProject that contains one or more IfcSites, that contain one or more
	 * IfcBuildings, that contain one or more IfcBuildingStoreys, that contain
	 * one or more IfcSpaces.
	 * @modelID D of the FC model.
	 */
	getSpatialStructure(modelID: number): {
		expressID: number;
		type: string;
		children: never[];
	};

	/**
	 * Gets the mesh of the subset with the specified [material](https://threejs.org/docs/#api/en/materials/Material).
	 * If no material is given, this returns the subset with the original materials.
	 * @modelID D of the FC model.
	 * @material Material assigned to the subset (if any).
	 */
	getSubset(modelID: number, material?: Material): Mesh | null;

	/**
	 * Removes the specified subset.
	 * @modelID D of the FC model.
	 * @parent The parent where the subset is (can be any `THREE.Object3D`).
	 * @material Material assigned to the subset, if any.
	 */
	removeSubset(modelID: number, parent?: Object3D, material?: Material): void;

	/**
	 * Creates a new geometric subset.
	 * @config A configuration object with the following options:
	 * - **scene**: `THREE.Object3D` where the model is located.
	 * - **modelID**: D of the model.
	 * - **ids**: Express Ds of the items of the model that will conform the subset.
	 * - **removePrevious**: wether to remove the previous subset of this model with this material.
	 * - **material**: (optional) wether to apply a material to the subset
	 */
	createSubset(config: IFCHighlightConfigOfModel): void | Mesh;

	/**
	 * Hides the selected items in the specified model
	 * @modelID D of the FC model.
	 * @ids Express D of the elements.
	 */
	hideItems(modelID: number, ids: number[]): void;

	/**
	 * Hides all the items of the specified model
	 * @modelID D of the FC model.
	 */
	hideAllItems(modelID: number): void;

	/**
	 * Shows all the items of the specified model
	 * @modelID D of the FC model.
	 * @ids Express D of the elements.
	 */
	showItems(modelID: number, ids: number[]): void;

	/**
	 * Shows all the items of the specified model
	 * @modelID D of the FC model.
	 */
	showAllItems(modelID: number): void;
}

export interface IFCModel extends Mesh {
	modelID: number;
	ifcManager: IFCManager | null;
	/**
	 * @deprecated `IfcModel` is already a mesh; you can place it in the scene directly.
	 */
	mesh: this;

	setIFCManager(manager: IFCManager): void;

	/**
	 * @deprecated Use `IfcModel.ifcManager.setWasmPath` instead.
	 *
	 * Sets the relative path of web-ifc.wasm file in the project.
	 * Beware: you **must** serve this file in your page; this means
	 * that you have to copy this files from *node_modules/web-ifc*
	 * to your deployment directory.
	 *
	 * If you don't use this methods,
	 * FC.js assumes that you are serving it in the root directory.
	 *
	 * Example if web-ifc.wasm is in dist/wasmDir:
	 * `ifcLoader.setWasmPath("dist/wasmDir/");`
	 *
	 * @path Relative path to web-ifc.wasm.
	 */
	setWasmPath(path: string): void;

	/**
	 * @deprecated Use `IfcModel.ifcManager.close` instead.
	 *
	 * Closes the specified model and deletes it from the [scene](https://threejs.org/docs/#api/en/scenes/Scene).
	 * @scene Scene where the model is (if it's located in a scene).
	 */
	close(scene?: Scene): void;

	/**
	 * @deprecated Use `IfcModel.ifcManager.getExpressId` instead.
	 *
	 * Gets the **Express D** to which the given face belongs.
	 * This D uniquely identifies this entity within this FC file.
	 * @geometry The geometry of the FC model.
	 * @faceIndex The index of the face of a geometry.You can easily get this index using the [Raycaster](https://threejs.org/docs/#api/en/core/Raycaster).
	 */
	getExpressId(geometry: BufferGeometry, faceIndex: number): number | undefined;

	/**
	 * @deprecated Use `IfcModel.ifcManager.getAllItemsOfType` instead.
	 *
	 * Returns all items of the specified type. You can import
	 * the types from *web-ifc*.
	 *
	 * Example to get all the standard walls of a project:
	 * ```js
	 * import { FCWALLSTANDARDCASE } from 'web-ifc';
	 * const walls = ifcLoader.getAllItemsOfType(FCWALLSTANDARDCASE);
	 * ```
	 * @ifcType The type of FC items to get.
	 * @verbose If false (default), this only gets Ds. If true, this also gets the native properties of all the fetched items.
	 */
	getAllItemsOfType(type: number, verbose: boolean): any[];

	/**
	 * @deprecated Use `IfcModel.ifcManager.getItemProperties` instead.
	 *
	 * Gets the native properties of the given element.
	 * @id Express D of the element.
	 * @recursive Wether you want to get the information of the referenced elements recursively.
	 */
	getItemProperties(id: number, recursive?: boolean): any;

	/**
	 * @deprecated Use `IfcModel.ifcManager.getPropertySets` instead.
	 *
	 * Gets the [property sets](https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifckernel/lexical/ifcpropertyset.htm)
	 * assigned to the given element.
	 * @id Express D of the element.
	 * @recursive If true, this gets the native properties of the referenced elements recursively.
	 */
	getPropertySets(id: number, recursive?: boolean): any[];

	/**
	 * @deprecated Use `IfcModel.ifcManager.getTypeProperties` instead.
	 *
	 * Gets the properties of the type assigned to the element.
	 * For example, if applied to a wall (IfcWall), this would get back the information
	 * contained in the IfcWallType assigned to it, if any.
	 * @id Express D of the element.
	 * @recursive If true, this gets the native properties of the referenced elements recursively.
	 */
	getTypeProperties(id: number, recursive?: boolean): any[];

	/**
	 * @deprecated Use `IfcModel.ifcManager.getIfcType` instead.
	 *
	 * Gets the ifc type of the specified item.
	 * @id Express D of the element.
	 */
	getIfcType(id: number): string;

	/**
	 * @deprecated Use `IfcModel.ifcManager.getSpatialStructure` instead.
	 *
	 * Gets the spatial structure of the project. The
	 * [spatial structure](https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifcproductextension/lexical/ifcspatialstructureelement.htm)
	 * is the hierarchical structure that organizes every FC project (all physical items
	 * are referenced to an element of the spatial structure). It is formed by
	 * one IfcProject that contains one or more IfcSites, that contain one or more
	 * IfcBuildings, that contain one or more IfcBuildingStoreys, that contain
	 * one or more IfcSpaces.
	 */
	getSpatialStructure(): {
		expressID: number;
		type: string;
		children: never[];
	};

	/**
	 * @deprecated Use `IfcModel.ifcManager.getSubset` instead.
	 *
	 * Gets the mesh of the subset with the specified [material](https://threejs.org/docs/#api/en/materials/Material).
	 * If no material is given, this returns the subset with the original materials.
	 * @material Material assigned to the subset, if any.
	 */
	getSubset(material?: Material): Mesh | null;

	/**
	 * @deprecated Use `IfcModel.ifcManager.removeSubset` instead.
	 *
	 * Removes the specified subset.
	 * @parent The parent where the subset is (can be any `THREE.Object3D`).
	 * @material Material assigned to the subset, if any.
	 */
	removeSubset(parent?: Object3D, material?: Material): void;

	/**
	 * @deprecated Use `IfcModel.ifcManager.createSubset` instead.
	 *
	 * Creates a new geometric subset.
	 * @config A configuration object with the following options:
	 * - **scene**: `THREE.Object3D` where the model is located.
	 * - **ids**: Express Ds of the items of the model that will conform the subset.
	 * - **removePrevious**: Wether to remove the previous subset of this model with this material.
	 * - **material**: (optional) Wether to apply a material to the subset
	 */
	createSubset(config: IFCHighlightConfig): void | Mesh;

	/**
	 * @deprecated Use `IfcModel.ifcManager.hideItems` instead.
	 *
	 * Hides the selected items in the specified model
	 * @ids Express D of the elements.
	 */
	hideItems(ids: number[]): void;

	/**
	 * @deprecated Use `IfcModel.ifcManager.hideAllItems` instead.
	 *
	 * Hides all the items of the specified model
	 */
	hideAllItems(): void;

	/**
	 * @deprecated Use `IfcModel.ifcManager.showItems` instead.
	 *
	 * Hides all the items of the specified model
	 * @ids Express D of the elements.
	 */
	showItems(ids: number[]): void;

	/**
	 * @deprecated Use `IfcModel.ifcManager.showAllItems` instead.
	 *
	 * Shows all the items of the specified model
	 */
	showAllItems(): void;
}

export interface IFCLoader extends Loader {
	ifcManager: IFCManager;
	load(
		url: any,
		onLoad: (ifc: IFCModel) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;

	parse(buffer: ArrayBuffer): Promise<IFCModel>;
}

export interface KTX {
	mipmaps: object[];
	width: number;
	height: number;
	format: O3JS.PixelFormat | O3JS.CompressedPixelFormat;
	mipmapCount: number;
	isCubemap: boolean;
}

export interface KTXLoader extends CompressedTextureLoader {
	parse(buffer: ArrayBuffer, loadMipmaps: boolean): KTX;
}

export interface LDrawLoader extends Loader {
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

export interface LottieLoader extends Loader {
	load(
		url: string,
		onLoad: (texture: CanvasTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<CanvasTexture>;
	setQuality(value: number): void;
}

export interface LUT3dlResult {
	size: number;
	texture: DataTexture;
	texture3D: DataTexture3D;
}

export interface LUT3dlLoader extends Loader {
	load(
		url: string,
		onLoad: (result: LUT3dlResult) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: Error) => void
	): any;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<LUT3dlResult>;
	parse(data: string): LUT3dlResult;
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

export interface LUTCubeResult {
	title: string;
	size: number;
	domainMin: Vector3;
	domainMax: Vector3;
	texture: DataTexture;
	texture3D: DataTexture3D;
}

export interface LUTCubeLoader extends Loader {
	load(
		url: string,
		onLoad: (result: LUTCubeResult) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: Error) => void
	): any;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<LUTCubeResult>;
	parse(data: string): LUTCubeResult;
}

export interface MD2Loader extends Loader {
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

export interface MTLLoader extends Loader {
	materialOptions: any;

	load(
		url: string,
		onLoad: (materialCreator: any) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	parse(text: string, path: string): any;
	setMaterialOptions(value: any): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<any>;
}

export interface Volume {
	new (xLength?: number, yLength?: number, zLength?: number, type?: string, arrayBuffer?: ArrayLike<number>): this;

	xLength: number;
	yLength: number;
	zLength: number;

	axisOrder: Array<'x' | 'y' | 'z'>;

	data: ArrayLike<number>;

	spacing: number[];
	offset: number[];

	matrix: Matrix3;

	lowerThreshold: number;
	upperThreshold: number;

	sliceList: VolumeSlice[];

	getData(i: number, j: number, k: number): number;
	access(i: number, j: number, k: number): number;
	reverseAccess(index: number): number[];

	map(functionToMap: () => void, context: this): this;

	extractPerpendicularPlane(axis: string, RASIndex: number): object;
	extractSlice(axis: string, index: number): VolumeSlice;

	repaintAllSlices(): this;
	computeMinMax(): number[];
}

export interface VolumeSlice {
	new (volume: Volume, index?: number, axis?: string): this;
	index: number;
	axis: string;

	canvas: HTMLCanvasElement;
	canvasBuffer: HTMLCanvasElement;

	ctx: CanvasRenderingContext2D;
	ctxBuffer: CanvasRenderingContext2D;

	mesh: Mesh;

	geometryNeedsUpdate: boolean;

	sliceAccess: number;
	jLength: number;
	iLength: number;
	matrix: Matrix3;

	repaint(): void;
	updateGeometry(): void;
}

export interface NRRDLoader extends Loader {
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
	materials: any;

	load(
		url: string,
		onLoad: (group: Group) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>;
	parse(data: string): Group;
	setMaterials(materials: any): this;
}

export interface PCDLoader extends Loader {
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
	load(
		url: string,
		onLoad: (pdb: PDB) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<PDB>;
	parse(text: string): PDB;
}

export interface PRWMLoader extends Loader {
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

export interface PLYLoader extends Loader {
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

export interface PVR {
	mipmaps: object[];
	width: number;
	height: number;
	format: O3JS.CompressedPixelFormat;
	mipmapCount: number;
	isCubemap: boolean;
}

export interface PVRLoader extends CompressedTextureLoader {
	parse(buffer: ArrayBuffer, loadMipmaps: boolean): PVR;
}

export interface RGBE {
	width: number;
	height: number;
	data: Float32Array | Uint8Array;
	header: string;
	gamma: number;
	exposure: number;
	format: O3JS.PixelFormat;
	type: O3JS.TextureDataType;
}

export interface RGBELoader extends DataTextureLoader {
	type: O3JS.TextureDataType;
	parse(buffer: ArrayBuffer): RGBE;
	setDataType(type: O3JS.TextureDataType): this;
}

export interface RGBM {
	width: number;
	height: number;
	data: Uint8Array;
	header: string;
	format: O3JS.PixelFormat;
	type: O3JS.TextureDataType;
	flipY: boolean;
	encoding: O3JS.TextureEncoding;
}

export interface RGBMLoader extends DataTextureLoader {
	loadCubemap(
		urls: string[],
		onLoad?: (texture: CubeTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): CubeTexture;

	parse(buffer: ArrayBuffer): RGBM;
}

export interface STLLoader extends Loader {
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

export interface KMZLoader extends Loader {
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

export interface ShaderChunk {
	[name: string]: string;
	alphamap_fragment: string;
	alphamap_pars_fragment: string;
	alphatest_fragment: string;
	aomap_fragment: string;
	aomap_pars_fragment: string;
	begin_vertex: string;
	beginnormal_vertex: string;
	bsdfs: string;
	bumpmap_pars_fragment: string;
	clipping_planes_fragment: string;
	clipping_planes_pars_fragment: string;
	clipping_planes_pars_vertex: string;
	clipping_planes_vertex: string;
	color_fragment: string;
	color_pars_fragment: string;
	color_pars_vertex: string;
	color_vertex: string;
	common: string;
	cube_frag: string;
	cube_vert: string;
	cube_uv_reflection_fragment: string;
	defaultnormal_vertex: string;
	depth_frag: string;
	depth_vert: string;
	distanceRGBA_frag: string;
	distanceRGBA_vert: string;
	displacementmap_vertex: string;
	displacementmap_pars_vertex: string;
	emissivemap_fragment: string;
	emissivemap_pars_fragment: string;
	encodings_pars_fragment: string;
	encodings_fragment: string;
	envmap_fragment: string;
	envmap_common_pars_fragment: string;
	envmap_pars_fragment: string;
	envmap_pars_vertex: string;
	envmap_vertex: string;
	equirect_frag: string;
	equirect_vert: string;
	fog_fragment: string;
	fog_pars_fragment: string;
	linedashed_frag: string;
	linedashed_vert: string;
	lightmap_fragment: string;
	lightmap_pars_fragment: string;
	lights_lambert_vertex: string;
	lights_pars_begin: string;
	envmap_physical_pars_fragment: string;
	lights_pars_map: string;
	lights_phong_fragment: string;
	lights_phong_pars_fragment: string;
	lights_physical_fragment: string;
	lights_physical_pars_fragment: string;
	lights_fragment_begin: string;
	lights_fragment_maps: string;
	lights_fragment_end: string;
	logdepthbuf_fragment: string;
	logdepthbuf_pars_fragment: string;
	logdepthbuf_pars_vertex: string;
	logdepthbuf_vertex: string;
	map_fragment: string;
	map_pars_fragment: string;
	map_particle_fragment: string;
	map_particle_pars_fragment: string;
	meshbasic_frag: string;
	meshbasic_vert: string;
	meshlambert_frag: string;
	meshlambert_vert: string;
	meshphong_frag: string;
	meshphong_vert: string;
	meshphysical_frag: string;
	meshphysical_vert: string;
	metalnessmap_fragment: string;
	metalnessmap_pars_fragment: string;
	morphnormal_vertex: string;
	morphtarget_pars_vertex: string;
	morphtarget_vertex: string;
	normal_flip: string;
	normal_frag: string;
	normal_fragment_begin: string;
	normal_fragment_maps: string;
	normal_vert: string;
	normalmap_pars_fragment: string;
	clearcoat_normal_fragment_begin: string;
	clearcoat_normal_fragment_maps: string;
	clearcoat_pars_fragment: string;
	packing: string;
	points_frag: string;
	points_vert: string;
	shadow_frag: string;
	shadow_vert: string;

	premultiplied_alpha_fragment: string;
	project_vertex: string;
	roughnessmap_fragment: string;
	roughnessmap_pars_fragment: string;
	shadowmap_pars_fragment: string;
	shadowmap_pars_vertex: string;
	shadowmap_vertex: string;
	shadowmask_pars_fragment: string;
	skinbase_vertex: string;
	skinning_pars_vertex: string;
	skinning_vertex: string;
	skinnormal_vertex: string;
	specularmap_fragment: string;
	specularmap_pars_fragment: string;
	tonemapping_fragment: string;
	tonemapping_pars_fragment: string;
	uv2_pars_fragment: string;
	uv2_pars_vertex: string;
	uv2_vertex: string;
	uv_pars_fragment: string;
	uv_pars_vertex: string;
	uv_vertex: string;
	worldpos_vertex: string;
}

export interface ShaderLib {
	[name: string]: Shader;
	basic: Shader;
	lambert: Shader;
	phong: Shader;
	standard: Shader;
	matcap: Shader;
	points: Shader;
	dashed: Shader;
	depth: Shader;
	normal: Shader;
	sprite: Shader;
	background: Shader;
	cube: Shader;
	equirect: Shader;
	distanceRGBA: Shader;
	shadow: Shader;
	physical: Shader;
}

export interface UniformsLib {
	common: {
		diffuse: IUniform;
		opacity: IUniform;
		map: IUniform;
		uvTransform: IUniform;
		uv2Transform: IUniform;
		alphaMap: IUniform;
	};
	specularmap: {
		specularMap: IUniform;
	};
	envmap: {
		envMap: IUniform;
		flipEnvMap: IUniform;
		reflectivity: IUniform;
		refractionRatio: IUniform;
		maxMipLevel: IUniform;
	};
	aomap: {
		aoMap: IUniform;
		aoMapIntensity: IUniform;
	};
	lightmap: {
		lightMap: IUniform;
		lightMapIntensity: IUniform;
	};
	emissivemap: {
		emissiveMap: IUniform;
	};
	bumpmap: {
		bumpMap: IUniform;
		bumpScale: IUniform;
	};
	normalmap: {
		normalMap: IUniform;
		normalScale: IUniform;
	};
	displacementmap: {
		displacementMap: IUniform;
		displacementScale: IUniform;
		displacementBias: IUniform;
	};
	roughnessmap: {
		roughnessMap: IUniform;
	};
	metalnessmap: {
		metalnessMap: IUniform;
	};
	gradientmap: {
		gradientMap: IUniform;
	};
	fog: {
		fogDensity: IUniform;
		fogNear: IUniform;
		fogFar: IUniform;
		fogColor: IUniform;
	};
	lights: {
		ambientLightColor: IUniform;
		directionalLights: {
			value: any[];
			properties: {
				direction: {};
				color: {};
			};
		};
		directionalLightShadows: {
			value: any[];
			properties: {
				shadowBias: {};
				shadowNormalBias: {};
				shadowRadius: {};
				shadowMapSize: {};
			};
		};
		directionalShadowMap: IUniform;
		directionalShadowMatrix: IUniform;
		spotLights: {
			value: any[];
			properties: {
				color: {};
				position: {};
				direction: {};
				distance: {};
				coneCos: {};
				penumbraCos: {};
				decay: {};
			};
		};
		spotLightShadows: {
			value: any[];
			properties: {
				shadowBias: {};
				shadowNormalBias: {};
				shadowRadius: {};
				shadowMapSize: {};
			};
		};
		spotShadowMap: IUniform;
		spotShadowMatrix: IUniform;
		pointLights: {
			value: any[];
			properties: {
				color: {};
				position: {};
				decay: {};
				distance: {};
			};
		};
		pointLightShadows: {
			value: any[];
			properties: {
				shadowBias: {};
				shadowNormalBias: {};
				shadowRadius: {};
				shadowMapSize: {};
			};
		};
		pointShadowMap: IUniform;
		pointShadowMatrix: IUniform;
		hemisphereLights: {
			value: any[];
			properties: {
				direction: {};
				skycolor: {};
				groundColor: {};
			};
		};
		rectAreaLights: {
			value: any[];
			properties: {
				color: {};
				position: {};
				width: {};
				height: {};
			};
		};
	};
	points: {
		diffuse: IUniform;
		opacity: IUniform;
		size: IUniform;
		scale: IUniform;
		map: IUniform;
		uvTransform: IUniform;
	};
}
