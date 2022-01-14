import {
	AnimationAction,
	AnimationMixer,
	BufferGeometry,
	Camera,
	Curve,
	DataTexture,
	IUniform,
	Material,
	Matrix3,
	Matrix4,
	Mesh,
	MeshBasicMaterial,
	MeshPhongMaterial,
	Object3D,
	Plane,
	PlaneGeometry,
	Scene,
	ShaderMaterial,
	Texture,
	TextureDataType,
	TextureFilter,
	Vector3,
	WebGLRenderer,
	WebGLRenderTarget,
	Wrapping,
} from '../index';

/**
 * Cut by plane output
 */
export interface CutByPlaneOutput {
	object1: Object3D;
	object2: Object3D;
}

/**
 * Convex object breaker
 */
export interface ConvexObjectBreaker {
	new (minSizeForBreak?: number, smallDelta?: number): this;
	prepareBreakableObject(
		object: Object3D,
		mass: number,
		velocity: Vector3,
		angularVelocity: Vector3,
		breakable: boolean
	): void;
	subdivideByImpact(
		object: Object3D,
		pointOfImpact: Vector3,
		normal: Vector3,
		maxRadialIterations: number,
		maxRandomIterations: number
	): Object3D[];
	cutByPlane(object: Object3D, plane: Plane, output: CutByPlaneOutput): number;
}

/**
 * Variable
 */
export interface Variable {
	name: string;
	initialValueTexture: Texture;
	material: ShaderMaterial;
	dependencies: Variable[];
	renderTargets: WebGLRenderTarget[];
	wrapS: number;
	wrapT: number;
	minFilter: number;
	magFilter: number;
}

/**
 * Gpucomputation renderer
 */
export interface GPUComputationRenderer {
	new (sizeX: number, sizeY: number, renderer: WebGLRenderer): this;

	setDataType(type: TextureDataType): void;

	addVariable(variableName: string, computeFragmentShader: string, initialValueTexture: Texture): Variable;
	setVariableDependencies(variable: Variable, dependencies: Variable[] | null): void;

	init(): string | null;
	compute(): void;

	getCurrentRenderTarget(variable: Variable): WebGLRenderTarget;
	getAlternateRenderTarget(variable: Variable): WebGLRenderTarget;
	addResolutionDefine(materialShader: ShaderMaterial): void;
	createShaderMaterial(computeFragmentShader: string, uniforms?: { [uniform: string]: IUniform }): ShaderMaterial;
	createRenderTarget(
		sizeXTexture: number,
		sizeYTexture: number,
		wrapS: Wrapping,
		wrapT: number,
		minFilter: TextureFilter,
		magFilter: TextureFilter
	): WebGLRenderTarget;
	createTexture(): DataTexture;
	renderTexture(input: Texture, output: Texture | WebGLRenderTarget): void;
	doRenderTarget(material: Material, output: WebGLRenderTarget): void;
}

/**
 * Gyroscope
 */
export interface Gyroscope extends Object3D {
	new (): this;
}

/**
 * Md2 parts config
 */
export interface MD2PartsConfig {
	baseUrl: string;
	body: string;
	skins: string[];
	weapons: Array<[string, string]>;
}

/**
 * Md2 character
 */
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
	controls: any;
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

/**
 * Md2 character complex
 */
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
	controls: any;
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

/**
 * Morph anim mesh
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

/**
 * Morph blend mesh
 */
export interface MorphBlendMesh extends Mesh {
	new (geometry: BufferGeometry, material: Material): this;
	animationsMap: object;
	animationsList: object[];

	createAnimation(name: string, start: number, end: number, fps: number): void;
	autoCreateAnimations(fps: number): void;
	setAnimationDirectionForward(name: string): void;
	setAnimationDirectionBackward(name: string): void;
	setAnimationFPS(name: string, fps: number): void;
	setAnimationDuration(name: string, duration: number): void;
	setAnimationWeight(name: string, weight: number): void;
	setAnimationTime(name: string, time: number): void;
	getAnimationTime(name: string): number;
	getAnimationDuration(name: string): number;
	playAnimation(name: string): void;
	stopAnimation(name: string): void;
	update(delta: number): void;
}

/**
 * Uvboxes
 */
export interface UVBoxes {
	w: number;
	h: number;
	index: number;
}

/**
 * Light map containers
 */
export interface LightMapContainers {
	basicMat: Material | Material[];
	object: Object3D;
}

/**
 * Progressive light map
 */
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

	_initializeBlurPlane(res: number, lightMap?: Texture | null): void;
}

/**
 * Roller coaster geometry
 */
export interface RollerCoasterGeometry extends BufferGeometry {
	new (curve: Curve<Vector3>, divisions: number): this;
}

/**
 * Roller coaster lifters geometry
 */
export interface RollerCoasterLiftersGeometry extends BufferGeometry {
	new (curve: Curve<Vector3>, divisions: number): this;
}

/**
 * Roller coaster shadow geometry
 */
export interface RollerCoasterShadowGeometry extends BufferGeometry {
	new (curve: Curve<Vector3>, divisions: number): this;
}

/**
 * Roller coaster sky geometry
 */
export interface RollerCoasterSkyGeometry extends BufferGeometry {
	new (curve: Curve<Vector3>, divisions: number): this;
}

/**
 * Roller coaster trees geometry
 */
export interface RollerCoasterTreesGeometry extends BufferGeometry {
	new (landscape: Mesh): this;
}

/**
 * Tube painter
 */
export interface TubePainter {
	new (): this;

	mesh: Mesh;

	stroke(position1: Vector3, position2: Vector3, matrix1: Matrix4, matrix2: Matrix4): void;
	updateGeometry(start: number, end: number): void;
}

/**
 * Volume
 */
export interface Volume {
	new (xLength?: number, yLength?: number, zLength?: number, type?: string, arrayBuffer?: ArrayLike<number>): this;

	xLength: number;
	yLength: number;
	zLength: number;

	windowLow: number;
	windowHigh: number;

	axisOrder: Array<'x' | 'y' | 'z'>;

	data: ArrayLike<number>;

	spacing: number[];
	offset: number[];

	matrix: Matrix3 | Matrix4;

	lowerThreshold: number;
	upperThreshold: number;

	RASDimensions: any;

	min?: number;

	max?: number;

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

/**
 * Volume slice
 */
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
