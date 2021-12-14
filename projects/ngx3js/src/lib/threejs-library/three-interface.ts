import * as O3JS from 'three';
export type TCullFace = O3JS.CullFace;
export type TShadowMapType = O3JS.ShadowMapType;
export type TSide = O3JS.Side;
export type TShading = O3JS.Shading;
export type TBlending = O3JS.Blending;
export type TBlendingEquation = O3JS.BlendingEquation;
export type TBlendingDstFactor = O3JS.BlendingDstFactor;
export type TBlendingSrcFactor = O3JS.BlendingSrcFactor;
export type TDepthModes = O3JS.DepthModes;
export type TCombine = O3JS.Combine;
export type TToneMapping = O3JS.ToneMapping;
export type TMapping = O3JS.Mapping;
export type TWrapping = O3JS.Wrapping;
export type TTextureFilter = O3JS.TextureFilter;
export type TTextureDataType = O3JS.TextureDataType;
export type TPixelFormat = O3JS.PixelFormat;
export type TPixelFormatGPU = O3JS.PixelFormatGPU;
export type TCompressedPixelFormat = O3JS.CompressedPixelFormat;
export type TAnimationActionLoopStyles = O3JS.AnimationActionLoopStyles;
export type TInterpolationModes = O3JS.InterpolationModes;
export type TInterpolationEndingModes = O3JS.InterpolationEndingModes;
export type TAnimationBlendMode = O3JS.AnimationBlendMode;
export type TTrianglesDrawModes = O3JS.TrianglesDrawModes;
export type TTextureEncoding = O3JS.TextureEncoding;
export type TDepthPackingStrategies = O3JS.DepthPackingStrategies;
export type TNormalMapTypes = O3JS.NormalMapTypes;
export type TStencilOp = O3JS.StencilOp;
export type TStencilFunc = O3JS.StencilFunc;
export type TUsage = O3JS.Usage;
export type TGLSLVersion = O3JS.GLSLVersion;

export type TMatrix4Tuple = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number
];

export interface IStats {
	REVISION: number;
	dom: HTMLDivElement;
	addPanel(panel: IPanel): IPanel;
	showPanel(id: number): void;
	begin(): void;
	end(): void;
	update(): void;
	domElement: HTMLDivElement;
	setMode(id: number): void;
}

export interface ICSM {
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
	mainFrustum: IFrustum;
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

export interface ICSMHelper {
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


export interface IGyroscope extends IObject3D {
	new (): this;
}

export interface IPositionalAudioHelper extends ILine {
	new (audio: IPositionalAudio, range?: number, divisionsInnerAngle?: number, divisionsOuterAngle?: number): this;

	audio: IPositionalAudio;
	range: number;
	divisionsInnerAngle: number;
	divisionsOuterAngle: number;

	dispose(): void;
	update(): void;
}

export interface IRectAreaLightHelper extends ILine {
	new (light: IRectAreaLight, color?: TColorRepresentation): this;

	light: IRectAreaLight;
	color: TColorRepresentation | undefined;

	dispose(): void;
}

export interface IVertexNormalsHelper extends ILineSegments {
	new (object: IObject3D, size?: number, hex?: number): this;

	object: IObject3D;
	size: number;

	update(): void;
}

export interface IVertexTangentsHelper extends ILineSegments {
	new (object: IObject3D, size?: number, hex?: number): this;

	object: IObject3D;
	size: number;

	update(): void;
}

export interface ILightProbeGenerator {
    fromCubeTexture(cubeTexture: ICubeTexture): ILightProbe;
    fromCubeRenderTarget(renderer: IWebGLRenderer, cubeRenderTarget: IWebGLCubeRenderTarget): ILightProbe;
}

export interface ILensflareElement {
    new(texture: ITexture, size?: number, distance?: number, color?: IColor) : this;
    texture: ITexture;
    size: number;
    distance: number;
    color: IColor;
}

/**
 * Imorph anim mesh
 */
export interface IMorphAnimMesh extends IMesh {
	
	new(geometry: IBufferGeometry, material: IMaterial) : this;
    mixer: IAnimationMixer;
    activeAction: IAnimationAction | null;

    setDirectionForward(): void;
    setDirectionBackward(): void;
    playAnimation(label: string, fps: number): void;
    updateAnimation(delta: number): void;
    copy(source: IMorphAnimMesh): this;
}


export interface ICinematicCamera extends IPerspectiveCamera {
    new(fov: number, aspect: number, near: number, far: number) : this;

    postprocessing: {
        enabled: boolean;
        scene: IScene;
        camera: IOrthographicCamera;
        rtTextureDepth: IWebGLRenderTarget;
        rtTextureColor: IWebGLRenderTarget;
        bokeh_uniforms: any;
    };
    shaderSettings: {
        rings: number;
        samples: number;
    };
    materialDepth: IShaderMaterial;
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
    renderCinematic(scene: IScene, renderer: IWebGLRenderer): void;
    setLens(focalLength: number, frameHeight?: number, fNumber?: number, coc?: number): void;
}

export interface INURBSCurve extends ICurve<IVector3> {
    new(
        degree: number,
        knots: number[],
        controlPoints: IVector2[] | IVector3[] | IVector4[],
        startKnot: number,
        endKnot: number,
    ) : this;
}

export interface INURBSSurface {
    new(
        degree1: number,
        degree2: number,
        knots1: number[],
        knots2: number[],
        controlPoints: IVector2[][] | IVector3[][] | IVector4[][],
    ) : this;

    getPoint(t1: number, t2: number, target: IVector3): void;
}

export interface ICapsule {
    new(start?: IVector3, end?: IVector3, radius?: number) : this;
    start: IVector3;
    end: IVector3;
    radius: number;

    set(start: IVector3, end: IVector3, radius: number): this;
    clone(): ICapsule;
    copy(capsule: ICapsule): this;
    getCenter(target: number): IVector3;
    translate(v: IVector3): this;
    checkAABBAxis(
        p1x: number,
        p1y: number,
        p2x: number,
        p2y: number,
        minx: number,
        maxx: number,
        miny: number,
        maxy: number,
        radius: number,
    ): boolean;
    intersectsBox(box: IBox3): boolean;
    lineLineMinimumPoints(line1: ILine3, line2: ILine3): IVector3[];
}

export interface ILut {
    new(colormap?: string, numberofcolors?: number) : this;
    lut: IColor[];
    map: object[];
    n: number;
    minV: number;
    maxV: number;

    set(value: ILut): this;
    setMin(min: number): this;
    setMax(max: number): this;
    setColorMap(colormap?: string, numberofcolors?: number): this;
    copy(lut: ILut): this;
    getColor(alpha: number): IColor;
    addColorMap(colormapName: string, arrayOfColors: number[][]): void;
    createCanvas(): HTMLCanvasElement;
    updateCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement;
}

export interface IColorMapKeywords {
    rainbow: number[][];
    cooltowarm: number[][];
    blackbody: number[][];
    grayscale: number[][];
}

export interface IMeshSurfaceSampler {
    distribution: Float32Array | null;
    geometry: IBufferGeometry;
    positionAttribute: Float32Array;
    weightAttribute: string | null;

    new(mesh: IMesh) : this;
    binarySearch(x: number): number;
    build(): this;
    sample(targetPosition: IVector3, targetNormal?: IVector3, targetColor?: IColor): this;
    sampleFace(faceIndex: number, targetPosition: IVector3, targetNormal?: IVector3, targetColor?: IColor): this;
    setWeightAttribute(name: string | null): this;
}

export interface IOBB {
    center: IVector3;
    halfSize: IVector3;
    rotation: IMatrix3;

    new(center?: IVector3, halfSize?: IVector3, rotation?: IMatrix3) : this;
    set(center: IVector3, halfSize: IVector3, rotation: IMatrix3): this;
    copy(obb: IOBB): this;
    clone(): this;
    getSize(result: IVector3): IVector3;
    clampPoint(point: IVector3, result: IVector3): IVector3;
    containsPoint(point: IVector3): boolean;
    intersectsBox3(box3: IBox3): boolean;
    intersectsSphere(sphere: ISphere): boolean;
    intersectsOBB(obb: IOBB, epsilon: number): boolean;
    intersectsPlane(plane: IPlane): boolean;
    intersectRay(ray: IRay, result: IVector3): IVector3 | null;
    intersectsRay(ray: IRay): boolean;
    fromBox3(box3: IBox3): this;
    equals(obb: IOBB): boolean;
    applyMatrix4(matrix: IMatrix4): this;
}

export interface IOctree {
    new(box?: IBox3) : this;
    triangles: ITriangle[];
    box: IBox3;
    subTrees: IOctree[];

    addTriangle(triangle: ITriangle): this;
    calcBox(): this;
    split(level: number): this;
    build(): this;
    getRayTriangles(ray: IRay, triangles: ITriangle[]): ITriangle[];
    triangleCapsuleIntersect(capsule: ICapsule, triangle: ITriangle): any;
    triangleSphereIntersect(sphere: ISphere, triangle: ITriangle): any;
    getSphereTriangles(sphere: ISphere, triangles: ITriangle[]): ITriangle[];
    getCapsuleTriangles(capsule: ICapsule, triangles: ITriangle[]): ITriangle[];
    sphereIntersect(sphere: ISphere): any;
    capsuleIntersect(capsule: ICapsule): any;
    rayIntersect(ray: IRay): any;
    fromGraphNode(group: IObject3D): this;
}

export interface IGPUComputationVariable {
    name: string;
    initialValueTexture: ITexture;
    material: IShaderMaterial;
    dependencies: IGPUComputationVariable[];
    renderTargets: IWebGLRenderTarget[];
    wrapS: number;
    wrapT: number;
    minFilter: number;
    magFilter: number;
}

export interface IGPUComputationRenderer {
    new(sizeX: number, sizeY: number, renderer: IWebGLRenderer) : this;

    setDataType(type: O3JS.TextureDataType): void;

    addIGPUComputationVariable(variableName: string, computeFragmentShader: string, initialValueTexture: ITexture): IGPUComputationVariable;
    setIGPUComputationVariableDependencies(variable: IGPUComputationVariable, dependencies: IGPUComputationVariable[] | null): void;

    init(): string | null;
    compute(): void;

    getCurrentRenderTarget(variable: IGPUComputationVariable): IWebGLRenderTarget;
    getAlternateRenderTarget(variable: IGPUComputationVariable): IWebGLRenderTarget;
    addResolutionDefine(materialShader: IShaderMaterial): void;
    createShaderMaterial(computeFragmentShader: string, uniforms?: { [uniform: string]: IUniform }): IShaderMaterial;
    createRenderTarget(
        sizeXTexture: number,
        sizeYTexture: number,
        wrapS: O3JS.Wrapping,
        wrapT: number,
        minFilter: O3JS.TextureFilter,
        magFilter: O3JS.TextureFilter,
    ): IWebGLRenderTarget;
    createTexture(): O3JS.DataTexture;
    renderTexture(input: ITexture, output: ITexture): void;
    doRenderTarget(material: IMaterial, output: IWebGLRenderTarget): void;
}

export interface IUVsDebug {
	(geometry: IBufferGeometry, size: number) : HTMLCanvasElement
};

export interface ILensflare extends IMesh {
    new() : this;
    readonly isLensflare: true;

    addElement(element: ILensflareElement): void;
    dispose(): void;
}


export interface ILightProbeHelper extends IMesh {
	new (lightProbe: ILightProbe, size: number): this;

	lightProbe: ILightProbe;
	size: number;

	dispose(): void;
}

export interface IPanel {
	new (name?: string, fg?: string, bg?: string): this;
	dom: HTMLCanvasElement;
	update(value: number, maxValue: number): void;
}

/**
 * Implementation of a quaternion. This is used for rotating things without incurring in the dreaded gimbal lock issue, amongst other advantages.
 *
 * @example
 * const quaternion = new THREE.Quaternion();
 * quaternion.setFromAxisAngle( new IVector3( 0, 1, 0 ), Math.PI / 2 );
 * const vector = new IVector3( 1, 0, 0 );
 * vector.applyQuaternion( quaternion );
 */
export interface IQuaternion {
	new (x?: number, y?: number, z?: number, w?: number): this;

	/**
	 * @default 0
	 */
	x: number;

	/**
	 * @default 0
	 */
	y: number;

	/**
	 * @default 0
	 */
	z: number;

	/**
	 * @default 1
	 */
	w: number;
	readonly isQuaternion: true;

	/**
	 * Sets values of this quaternion.
	 */
	set(x: number, y: number, z: number, w: number): IQuaternion | O3JS.Quaternion;

	/**
	 * Clones this quaternion.
	 */
	clone(): this;

	/**
	 * Copies values of q to this quaternion.
	 */
	copy(q: IQuaternion | O3JS.Quaternion): this;

	/**
	 * Sets this quaternion from rotation specified by Euler angles.
	 */
	setFromEuler(euler: IEuler | O3JS.Euler, update?: boolean): IQuaternion | O3JS.Quaternion;

	/**
	 * Sets this quaternion from rotation specified by axis and angle.
	 * Adapted from http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm.
	 * Axis have to be normalized, angle is in radians.
	 */
	setFromAxisAngle(axis: IVector3 | O3JS.Vector3, angle: number): IQuaternion | O3JS.Quaternion;

	/**
	 * Sets this quaternion from rotation component of m. Adapted from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm.
	 */
	setFromRotationMatrix(m: IMatrix4 | O3JS.Matrix4): IQuaternion | O3JS.Quaternion;
	setFromUnitVectors(vFrom: IVector3 | O3JS.Vector3, vTo: IVector3 | O3JS.Vector3): IQuaternion | O3JS.Quaternion;
	angleTo(q: IQuaternion | O3JS.Quaternion): number;
	rotateTowards(q: IQuaternion | O3JS.Quaternion, step: number): IQuaternion | O3JS.Quaternion;

	identity(): IQuaternion | O3JS.Quaternion;

	/**
	 * Inverts this quaternion.
	 */
	invert(): IQuaternion | O3JS.Quaternion;

	conjugate(): IQuaternion | O3JS.Quaternion;
	dot(v: IQuaternion | O3JS.Quaternion): number;
	lengthSq(): number;

	/**
	 * Computes length of this quaternion.
	 */
	length(): number;

	/**
	 * Normalizes this quaternion.
	 */
	normalize(): IQuaternion | O3JS.Quaternion;

	/**
	 * Multiplies this quaternion by b.
	 */
	multiply(q: IQuaternion | O3JS.Quaternion): IQuaternion | O3JS.Quaternion;
	premultiply(q: IQuaternion | O3JS.Quaternion): IQuaternion | O3JS.Quaternion;

	/**
	 * Sets this quaternion to a x b
	 * Adapted from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm.
	 */
	multiplyQuaternions(
		a: IQuaternion | O3JS.Quaternion,
		b: IQuaternion | O3JS.Quaternion
	): IQuaternion | O3JS.Quaternion;

	slerp(qb: IQuaternion | O3JS.Quaternion, t: number): IQuaternion | O3JS.Quaternion;
	slerpQuaternions(
		qa: IQuaternion | O3JS.Quaternion,
		qb: IQuaternion | O3JS.Quaternion,
		t: number
	): IQuaternion | O3JS.Quaternion;
	equals(v: IQuaternion | O3JS.Quaternion): boolean;

	/**
	 * Sets this quaternion's x, y, z and w value from the provided array or array-like.
	 * @param array the source array or array-like.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): this;

	/**
	 * Returns an array [x, y, z, w], or copies x, y, z and w into the provided array.
	 * @param array (optional) array to store the quaternion to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray(array?: number[], offset?: number): number[];

	/**
	 * Copies x, y, z and w into the provided array-like.
	 * @param array array-like to store the quaternion to.
	 * @param offset (optional) optional offset into the array.
	 * @return The provided array-like.
	 */
	toArray(array: ArrayLike<number>, offset?: number): ArrayLike<number>;

	_onChange(callback: () => void): IQuaternion | O3JS.Quaternion;
	_onChangeCallback: () => void;

	/**
	 * @deprecated Use {@line THREE.Vector#applyQuaternion vector.applyQuaternion( quaternion )} instead.
	 */
	multiplyVector3(v: any): any;

	/**
	 * @deprecated Use {@line THREE.Quaternion#invert .invert()} instead.
	 */
	inverse(): IQuaternion | O3JS.Quaternion;

	random(): IQuaternion | O3JS.Quaternion;
}

export type TMatrix3Tuple = [number, number, number, number, number, number, number, number, number];

/**
 * ( interface Matrix<T> )
 */
export interface IMatrix {
	/**
	 * Array with matrix values.
	 */
	elements: number[];

	/**
	 * identity():T;
	 */
	identity(): IMatrix;

	/**
	 * copy(m:T):T;
	 */
	copy(m: this): this;

	/**
	 * multiplyScalar(s:number):T;
	 */
	multiplyScalar(s: number): IMatrix;

	determinant(): number;

	/**
	 * transpose():T;
	 */
	transpose(): IMatrix;

	/**
	 * invert():T;
	 */
	invert(): IMatrix;

	/**
	 * clone():T;
	 */
	clone(): IMatrix;
}

export interface IMatrix4 {
	new (): this;

	/**
	 * Array with matrix values.
	 * @default [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
	 */
	elements: number[];

	/**
	 * Sets all fields of this matrix.
	 */
	set(
		n11: number,
		n12: number,
		n13: number,
		n14: number,
		n21: number,
		n22: number,
		n23: number,
		n24: number,
		n31: number,
		n32: number,
		n33: number,
		n34: number,
		n41: number,
		n42: number,
		n43: number,
		n44: number
	): IMatrix4;

	/**
	 * Resets this matrix to identity.
	 */
	identity(): IMatrix4;
	clone(): IMatrix4;
	copy(m: IMatrix4 | O3JS.Matrix4): this;
	copyPosition(m: IMatrix4 | O3JS.Matrix4): IMatrix4;
	extractBasis(
		xAxis: IVector3 | O3JS.Vector3,
		yAxis: IVector3 | O3JS.Vector3,
		zAxis: IVector3 | O3JS.Vector3
	): IMatrix4;
	makeBasis(xAxis: IVector3 | O3JS.Vector3, yAxis: IVector3 | O3JS.Vector3, zAxis: IVector3 | O3JS.Vector3): IMatrix4;

	/**
	 * Copies the rotation component of the supplied matrix m into this matrix rotation component.
	 */
	extractRotation(m: IMatrix4 | O3JS.Matrix4): IMatrix4;
	makeRotationFromEuler(euler: IEuler | O3JS.Euler): IMatrix4;
	makeRotationFromQuaternion(q: IQuaternion | O3JS.Quaternion): IMatrix4;
	/**
	 * Constructs a rotation matrix, looking from eye towards center with defined up vector.
	 */
	lookAt(eye: IVector3 | O3JS.Vector3, target: IVector3 | O3JS.Vector3, up: IVector3 | O3JS.Vector3): IMatrix4;

	/**
	 * Multiplies this matrix by m.
	 */
	multiply(m: IMatrix4 | O3JS.Matrix4): IMatrix4;

	premultiply(m: IMatrix4 | O3JS.Matrix4): IMatrix4;

	/**
	 * Sets this matrix to a x b.
	 */
	multiplyMatrices(a: IMatrix4 | O3JS.Matrix4, b: IMatrix4 | O3JS.Matrix4): IMatrix4;

	/**
	 * Sets this matrix to a x b and stores the result into the flat array r.
	 * r can be either a regular Array or a TypedArray.
	 *
	 * @deprecated This method has been removed completely.
	 */
	multiplyToArray(a: IMatrix4 | O3JS.Matrix4, b: IMatrix4 | O3JS.Matrix4, r: number[]): IMatrix4;

	/**
	 * Multiplies this matrix by s.
	 */
	multiplyScalar(s: number): IMatrix4;

	/**
	 * Computes determinant of this matrix.
	 * Based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
	 */
	determinant(): number;

	/**
	 * Transposes this matrix.
	 */
	transpose(): IMatrix4;

	/**
	 * Sets the position component for this matrix from vector v.
	 */
	setPosition(v: IVector3 | O3JS.Vector3 | number, y?: number, z?: number): IMatrix4;

	/**
	 * Inverts this matrix.
	 */
	invert(): IMatrix4;

	/**
	 * Multiplies the columns of this matrix by vector v.
	 */
	scale(v: IVector3 | O3JS.Vector3): IMatrix4;

	getMaxScaleOnAxis(): number;
	/**
	 * Sets this matrix as translation transform.
	 */
	makeTranslation(x: number, y: number, z: number): IMatrix4;

	/**
	 * Sets this matrix as rotation transform around x axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	makeRotationX(theta: number): IMatrix4;

	/**
	 * Sets this matrix as rotation transform around y axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	makeRotationY(theta: number): IMatrix4;

	/**
	 * Sets this matrix as rotation transform around z axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	makeRotationZ(theta: number): IMatrix4;

	/**
	 * Sets this matrix as rotation transform around axis by angle radians.
	 * Based on http://www.gamedev.net/reference/articles/article1199.asp.
	 *
	 * @param axis Rotation axis.
	 * @param theta Rotation angle in radians.
	 */
	makeRotationAxis(axis: IVector3 | O3JS.Vector3, angle: number): IMatrix4;

	/**
	 * Sets this matrix as scale transform.
	 */
	makeScale(x: number, y: number, z: number): IMatrix4;

	/**
	 * Sets this matrix as shear transform.
	 */
	makeShear(xy: number, xz: number, yx: number, yz: number, zx: number, zy: number): IMatrix4;

	/**
	 * Sets this matrix to the transformation composed of translation, rotation and scale.
	 */
	compose(
		translation: IVector3 | O3JS.Vector3,
		rotation: IQuaternion | O3JS.Quaternion,
		scale: IVector3 | O3JS.Vector3
	): IMatrix4;

	/**
	 * Decomposes this matrix into it's position, quaternion and scale components.
	 */
	decompose(
		translation: IVector3 | O3JS.Vector3,
		rotation: IQuaternion | O3JS.Quaternion,
		scale: IVector3 | O3JS.Vector3
	): IMatrix4;

	/**
	 * Creates a frustum matrix.
	 */
	makePerspective(left: number, right: number, bottom: number, top: number, near: number, far: number): IMatrix4;

	/**
	 * Creates a perspective projection matrix.
	 */
	makePerspective(fov: number, aspect: number, near: number, far: number): IMatrix4;

	/**
	 * Creates an orthographic projection matrix.
	 */
	makeOrthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): IMatrix4;
	equals(matrix: IMatrix4): boolean;

	/**
	 * Sets the values of this matrix from the provided array or array-like.
	 * @param array the source array or array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): IMatrix4;

	/**
	 * Returns an array with the values of this matrix, or copies them into the provided array.
	 * @param array (optional) array to store the matrix to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray(array?: number[], offset?: number): number[];
	toArray(array?: TMatrix4Tuple, offset?: 0): TMatrix4Tuple;

	/**
	 * Copies he values of this matrix into the provided array-like.
	 * @param array array-like to store the matrix to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray(array?: ArrayLike<number>, offset?: number): ArrayLike<number>;

	/**
	 * Set the upper 3x3 elements of this matrix to the values of the Matrix3 m.
	 */
	setFromMatrix3(m: IMatrix3 | O3JS.Matrix3): IMatrix4;

	/**
	 * @deprecated Use {@line THREE.Matrix4#copyPosition .copyPosition()} instead.
	 */
	extractPosition(m: IMatrix4 | O3JS.Matrix4): IMatrix4;

	/**
	 * @deprecated Use {@line THREE.Matrix4#makeRotationFromQuaternion .makeRotationFromQuaternion()} instead.
	 */
	setRotationFromQuaternion(q: IQuaternion | O3JS.Quaternion): IMatrix4;

	/**
	 * @deprecated Use {@line THREE.Vector3#applyMatrix4 vector.applyMatrix4( matrix )} instead.
	 */
	multiplyVector3(v: any): any;

	/**
	 * @deprecated Use {@line THREE.Vector4#applyMatrix4 vector.applyMatrix4( matrix )} instead.
	 */
	multiplyVector4(v: any): any;

	/**
	 * @deprecated This method has been removed completely.
	 */
	multiplyVector3Array(array: number[]): number[];

	/**
	 * @deprecated Use {@line THREE.Vector3#transformDirection Vector3.transformDirection( matrix )} instead.
	 */
	rotateAxis(v: any): void;

	/**
	 * @deprecated Use {@line THREE.Vector3#applyMatrix4 vector.applyMatrix4( matrix )} instead.
	 */
	crossVector(v: any): void;

	/**
	 * @deprecated Use {@line THREE.Matrix4#toArray .toArray()} instead.
	 */
	flattenToArrayOffset(array: number[], offset: number): number[];

	/**
	 * @deprecated Use {@line THREE.Matrix4#invert .invert()} instead.
	 */
	getInverse(matrix: IMatrix): IMatrix;
}

/**
 * ( interface IMatrix<T> )
 */
export interface IMatrix {
	/**
	 * Array with matrix values.
	 */
	elements: number[];

	/**
	 * identity():T;
	 */
	identity(): IMatrix;

	/**
	 * copy(m:T):T;
	 */
	copy(m: this): this;

	/**
	 * multiplyScalar(s:number):T;
	 */
	multiplyScalar(s: number): IMatrix;

	determinant(): number;

	/**
	 * transpose():T;
	 */
	transpose(): IMatrix;

	/**
	 * invert():T;
	 */
	invert(): IMatrix;

	/**
	 * clone():T;
	 */
	clone(): IMatrix;
}

export type IMatrix3Tuple = O3JS.Matrix3Tuple;

/**
 * ( class IMatrix3 implements IMatrix<IMatrix3> )
 */
export interface IMatrix3 extends IMatrix {
	/**
	 * Creates an identity matrix.
	 */
	new (): this;

	/**
	 * Array with matrix values.
	 * @default [1, 0, 0, 0, 1, 0, 0, 0, 1]
	 */
	elements: number[];

	set(
		n11: number,
		n12: number,
		n13: number,
		n21: number,
		n22: number,
		n23: number,
		n31: number,
		n32: number,
		n33: number
	): IMatrix3;
	identity(): IMatrix3;
	clone(): this;
	copy(m: IMatrix3 | O3JS.Matrix3): this;
	extractBasis(
		xAxis: IVector3 | O3JS.Vector3,
		yAxis: IVector3 | O3JS.Vector3,
		zAxis: IVector3 | O3JS.Vector3
	): IMatrix3;
	setFromIMatrix4(m: IMatrix4 | O3JS.Matrix4): IMatrix3;
	multiplyScalar(s: number): IMatrix3;
	determinant(): number;

	/**
	 * Inverts this matrix in place.
	 */
	invert(): IMatrix3;

	/**
	 * Transposes this matrix in place.
	 */
	transpose(): IMatrix3;
	getNormalIMatrix(matrix4: IMatrix4 | O3JS.Matrix4): IMatrix3;

	/**
	 * Transposes this matrix into the supplied array r, and returns itself.
	 */
	transposeIntoArray(r: number[]): IMatrix3;

	setUvTransform(tx: number, ty: number, sx: number, sy: number, rotation: number, cx: number, cy: number): IMatrix3;

	scale(sx: number, sy: number): IMatrix3;

	rotate(theta: number): IMatrix3;

	translate(tx: number, ty: number): IMatrix3;

	equals(matrix: IMatrix3 | O3JS.Matrix3): boolean;

	/**
	 * Sets the values of this matrix from the provided array or array-like.
	 * @param array the source array or array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): IMatrix3;

	/**
	 * Returns an array with the values of this matrix, or copies them into the provided array.
	 * @param array (optional) array to store the matrix to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray(array?: number[], offset?: number): number[];
	toArray(array?: IMatrix3 | O3JS.Matrix3Tuple, offset?: 0): IMatrix3Tuple;

	/**
	 * Copies he values of this matrix into the provided array-like.
	 * @param array array-like to store the matrix to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray(array?: ArrayLike<number>, offset?: number): ArrayLike<number>;

	/**
	 * Multiplies this matrix by m.
	 */
	multiply(m: IMatrix3 | O3JS.Matrix3): IMatrix3;

	premultiply(m: IMatrix3 | O3JS.Matrix3): IMatrix3;

	/**
	 * Sets this matrix to a x b.
	 */
	multiplyMatrices(a: IMatrix3 | O3JS.Matrix3, b: IMatrix3 | O3JS.Matrix3): IMatrix3;

	/**
	 * @deprecated Use {@link IVector3.applyIMatrix3 vector.applyIMatrix3( matrix )} instead.
	 */
	multiplyIVector3(vector: IVector3 | O3JS.Vector3): any;

	/**
	 * @deprecated This method has been removed completely.
	 */
	multiplyIVector3Array(a: any): any;

	/**
	 * @deprecated Use {@link IMatrix3#invert .invert()} instead.
	 */
	getInverse(matrix: IMatrix4, throwOnDegenerate?: boolean): IMatrix3;
	getInverse(matrix: IMatrix): IMatrix;

	/**
	 * @deprecated Use {@link IMatrix3#toArray .toArray()} instead.
	 */
	flattenToArrayOffset(array: number[], offset: number): number[];
}

export type IMatrix4Tuple = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number
];

/**
 * A 4x4 IMatrix.
 *
 * @example
 * // Simple rig for rotating around 3 axes
 * const m = new THREE.IMatrix4();
 * const m1 = new THREE.IMatrix4();
 * const m2 = new THREE.IMatrix4();
 * const m3 = new THREE.IMatrix4();
 * const alpha = 0;
 * const beta = Math.PI;
 * const gamma = Math.PI/2;
 * m1.makeRotationX( alpha );
 * m2.makeRotationY( beta );
 * m3.makeRotationZ( gamma );
 * m.multiplyMatrices( m1, m2 );
 * m.multiply( m3 );
 */
export interface IMatrix4 extends IMatrix {
	new (): this;

	/**
	 * Array with matrix values.
	 * @default [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
	 */
	elements: number[];

	/**
	 * Sets all fields of this matrix.
	 */
	set(
		n11: number,
		n12: number,
		n13: number,
		n14: number,
		n21: number,
		n22: number,
		n23: number,
		n24: number,
		n31: number,
		n32: number,
		n33: number,
		n34: number,
		n41: number,
		n42: number,
		n43: number,
		n44: number
	): IMatrix4;

	/**
	 * Resets this matrix to identity.
	 */
	identity(): IMatrix4;
	clone(): IMatrix4;
	copy(m: IMatrix4 | O3JS.Matrix4): this;
	copyPosition(m: IMatrix4 | O3JS.Matrix4): IMatrix4;
	extractBasis(
		xAxis: IVector3 | O3JS.Vector3,
		yAxis: IVector3 | O3JS.Vector3,
		zAxis: IVector3 | O3JS.Vector3
	): IMatrix4;
	makeBasis(xAxis: IVector3 | O3JS.Vector3, yAxis: IVector3 | O3JS.Vector3, zAxis: IVector3 | O3JS.Vector3): IMatrix4;

	/**
	 * Copies the rotation component of the supplied matrix m into this matrix rotation component.
	 */
	extractRotation(m: IMatrix4 | O3JS.Matrix4): IMatrix4;
	makeRotationFromIEuler(euler: IEuler | O3JS.Euler): IMatrix4;
	makeRotationFromIQuaternion(q: IQuaternion | O3JS.Quaternion): IMatrix4;
	/**
	 * Constructs a rotation matrix, looking from eye towards center with defined up vector.
	 */
	lookAt(eye: IVector3 | O3JS.Vector3, target: IVector3 | O3JS.Vector3, up: IVector3 | O3JS.Vector3): IMatrix4;

	/**
	 * Multiplies this matrix by m.
	 */
	multiply(m: IMatrix4 | O3JS.Matrix4): IMatrix4;

	premultiply(m: IMatrix4 | O3JS.Matrix4): IMatrix4;

	/**
	 * Sets this matrix to a x b.
	 */
	multiplyMatrices(a: IMatrix4 | O3JS.Matrix4, b: IMatrix4 | O3JS.Matrix4): IMatrix4;

	/**
	 * Sets this matrix to a x b and stores the result into the flat array r.
	 * r can be either a regular Array or a TypedArray.
	 *
	 * @deprecated This method has been removed completely.
	 */
	multiplyToArray(a: IMatrix4 | O3JS.Matrix4, b: IMatrix4 | O3JS.Matrix4, r: number[]): IMatrix4;

	/**
	 * Multiplies this matrix by s.
	 */
	multiplyScalar(s: number): IMatrix4;

	/**
	 * Computes determinant of this matrix.
	 * Based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
	 */
	determinant(): number;

	/**
	 * Transposes this matrix.
	 */
	transpose(): IMatrix4;

	/**
	 * Sets the position component for this matrix from vector v.
	 */
	setPosition(v: IVector3 | O3JS.Vector3 | number, y?: number, z?: number): IMatrix4;

	/**
	 * Inverts this matrix.
	 */
	invert(): IMatrix4;

	/**
	 * Multiplies the columns of this matrix by vector v.
	 */
	scale(v: IVector3 | O3JS.Vector3): IMatrix4;

	getMaxScaleOnAxis(): number;
	/**
	 * Sets this matrix as translation transform.
	 */
	makeTranslation(x: number, y: number, z: number): IMatrix4;

	/**
	 * Sets this matrix as rotation transform around x axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	makeRotationX(theta: number): IMatrix4;

	/**
	 * Sets this matrix as rotation transform around y axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	makeRotationY(theta: number): IMatrix4;

	/**
	 * Sets this matrix as rotation transform around z axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	makeRotationZ(theta: number): IMatrix4;

	/**
	 * Sets this matrix as rotation transform around axis by angle radians.
	 * Based on http://www.gamedev.net/reference/articles/article1199.asp.
	 *
	 * @param axis Rotation axis.
	 * @param theta Rotation angle in radians.
	 */
	makeRotationAxis(axis: IVector3 | O3JS.Vector3, angle: number): IMatrix4;

	/**
	 * Sets this matrix as scale transform.
	 */
	makeScale(x: number, y: number, z: number): IMatrix4;

	/**
	 * Sets this matrix as shear transform.
	 */
	makeShear(xy: number, xz: number, yx: number, yz: number, zx: number, zy: number): IMatrix4;

	/**
	 * Sets this matrix to the transformation composed of translation, rotation and scale.
	 */
	compose(
		translation: IVector3 | O3JS.Vector3,
		rotation: IQuaternion | O3JS.Quaternion,
		scale: IVector3 | O3JS.Vector3
	): IMatrix4;

	/**
	 * Decomposes this matrix into it's position, quaternion and scale components.
	 */
	decompose(
		translation: IVector3 | O3JS.Vector3,
		rotation: IQuaternion | O3JS.Quaternion,
		scale: IVector3 | O3JS.Vector3
	): IMatrix4;

	/**
	 * Creates a frustum matrix.
	 */
	makePerspective(left: number, right: number, bottom: number, top: number, near: number, far: number): IMatrix4;

	/**
	 * Creates a perspective projection matrix.
	 */
	makePerspective(fov: number, aspect: number, near: number, far: number): IMatrix4;

	/**
	 * Creates an orthographic projection matrix.
	 */
	makeOrthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): IMatrix4;
	equals(matrix: IMatrix4): boolean;

	/**
	 * Sets the values of this matrix from the provided array or array-like.
	 * @param array the source array or array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): IMatrix4;

	/**
	 * Returns an array with the values of this matrix, or copies them into the provided array.
	 * @param array (optional) array to store the matrix to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray(array?: number[], offset?: number): number[];
	toArray(array?: IMatrix4 | O3JS.Matrix4Tuple, offset?: 0): IMatrix4Tuple;

	/**
	 * Copies he values of this matrix into the provided array-like.
	 * @param array array-like to store the matrix to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray(array?: ArrayLike<number>, offset?: number): ArrayLike<number>;

	/**
	 * Set the upper 3x3 elements of this matrix to the values of the IMatrix3 m.
	 */
	setFromIMatrix3(m: IMatrix3 | O3JS.Matrix3): IMatrix4;

	/**
	 * @deprecated Use {@link IMatrix4#copyPosition .copyPosition()} instead.
	 */
	extractPosition(m: IMatrix4 | O3JS.Matrix4): IMatrix4;

	/**
	 * @deprecated Use {@link IMatrix4#makeRotationFromIQuaternion .makeRotationFromIQuaternion()} instead.
	 */
	setRotationFromIQuaternion(q: IQuaternion | O3JS.Quaternion): IMatrix4;

	/**
	 * @deprecated Use {@link IVector3#applyIMatrix4 vector.applyIMatrix4( matrix )} instead.
	 */
	multiplyIVector3(v: any): any;

	/**
	 * @deprecated Use {@link IVector4#applyIMatrix4 vector.applyIMatrix4( matrix )} instead.
	 */
	multiplyIVector4(v: any): any;

	/**
	 * @deprecated This method has been removed completely.
	 */
	multiplyIVector3Array(array: number[]): number[];

	/**
	 * @deprecated Use {@link IVector3#transformDirection IVector3.transformDirection( matrix )} instead.
	 */
	rotateAxis(v: any): void;

	/**
	 * @deprecated Use {@link IVector3#applyIMatrix4 vector.applyIMatrix4( matrix )} instead.
	 */
	crossIVector(v: any): void;

	/**
	 * @deprecated Use {@link IMatrix4#toArray .toArray()} instead.
	 */
	flattenToArrayOffset(array: number[], offset: number): number[];

	/**
	 * @deprecated Use {@link IMatrix4#invert .invert()} instead.
	 */
	getInverse(matrix: IMatrix): IMatrix;
}

export interface IEuler {
	new (x?: number, y?: number, z?: number, order?: string): this;

	/**
	 * @default 0
	 */
	x: number;

	/**
	 * @default 0
	 */
	y: number;

	/**
	 * @default 0
	 */
	z: number;

	/**
	 * @default THREE.Euler.DefaultOrder
	 */
	order: string;
	readonly isEuler: true;

	_onChangeCallback: () => void;

	set(x: number, y: number, z: number, order?: string): IEuler | O3JS.Euler;
	clone(): this;
	copy(euler: IEuler | O3JS.Euler): this;
	setFromRotationMatrix(m: IMatrix4 | O3JS.Matrix4, order?: string, update?: boolean): IEuler | O3JS.Euler;
	setFromQuaternion(q: IQuaternion | O3JS.Quaternion, order?: string, update?: boolean): IEuler | O3JS.Euler;
	setFromVector3(v: IVector3 | O3JS.Vector3, order?: string): IEuler | O3JS.Euler;
	reorder(newOrder: string): IEuler | O3JS.Euler;
	equals(euler: IEuler | O3JS.Euler): boolean;
	fromArray(xyzo: any[]): IEuler | O3JS.Euler;
	toArray(array?: number[], offset?: number): number[];
	toVector3(optionalResult?: IVector3 | O3JS.Vector3): IVector3;
	_onChange(callback: () => void): this;
}

/**
 * Frustums are used to determine what is inside the camera's field of view. They help speed up the rendering process.
 */
export interface IFrustum {
	new (p0?: IPlane, p1?: IPlane, p2?: IPlane, p3?: IPlane, p4?: IPlane, p5?: IPlane): this;

	/**
	 * Array of 6 vectors.
	 */
	planes: IPlane[];

	set(p0: IPlane, p1: IPlane, p2: IPlane, p3: IPlane, p4: IPlane, p5: IPlane): IFrustum;
	clone(): this;
	copy(frustum: IFrustum): this;
	setFromProjectionMatrix(m: IMatrix4 | O3JS.Matrix4): this;
	intersectsObject(object: IObject3D): boolean;
	intersectsSprite(sprite: ISprite): boolean;
	intersectsSphere(sphere: ISphere): boolean;
	intersectsBox(box: IBox3): boolean;
	containsPoint(point: IVector3 | O3JS.Vector3): boolean;
}

export interface IMathUtils {
	generateUUID(): string;

	/**
	 * Clamps the x to be between a and b.
	 *
	 * @param value Value to be clamped.
	 * @param min Minimum value
	 * @param max Maximum value.
	 */
	clamp(value: number, min: number, max: number): number;
	euclideanModulo(n: number, m: number): number;

	/**
	 * Linear mapping of x from range [a1, a2] to range [b1, b2].
	 *
	 * @param x Value to be mapped.
	 * @param a1 Minimum value for range A.
	 * @param a2 Maximum value for range A.
	 * @param b1 Minimum value for range B.
	 * @param b2 Maximum value for range B.
	 */
	mapLinear(x: number, a1: number, a2: number, b1: number, b2: number): number;

	smoothstep(x: number, min: number, max: number): number;

	smootherstep(x: number, min: number, max: number): number;

	/**
	 * Random float from 0 to 1 with 16 bits of randomness.
	 * Standard Math.random() creates repetitive patterns when applied over larger space.
	 *
	 * @deprecated Use {@link Math#random Math.random()}
	 */
	random16(): number;

	/**
	 * Random integer from low to high interval.
	 */
	randInt(low: number, high: number): number;

	/**
	 * Random float from low to high interval.
	 */
	randFloat(low: number, high: number): number;

	/**
	 * Random float from - range / 2 to range / 2 interval.
	 */
	randFloatSpread(range: number): number;

	/**
	 * Deterministic pseudo-random float in the interval [ 0, 1 ].
	 */
	seededRandom(seed?: number): number;

	degToRad(degrees: number): number;

	radToDeg(radians: number): number;

	isPowerOfTwo(value: number): boolean;

	inverseLerp(x: number, y: number, t: number): number;

	/**
	 * Returns a value linearly interpolated from two known points based
	 * on the given interval - t = 0 will return x and t = 1 will return y.
	 *
	 * @param x Start point.
	 * @param y End point.
	 * @param t interpolation factor in the closed interval [0, 1]
	 */
	lerp(x: number, y: number, t: number): number;

	/**
	 * Smoothly interpolate a number from x toward y in a spring-like
	 * manner using the dt to maintain frame rate independent movement.
	 *
	 * @param x Current point.
	 * @param y Target point.
	 * @param lambda A higher lambda value will make the movement more sudden, and a lower value will make the movement more gradual.
	 * @param dt Delta time in seconds.
	 */
	damp(x: number, y: number, lambda: number, dt: number): number;

	/**
	 * Returns a value that alternates between 0 and length.
	 *
	 * @param x The value to pingpong.
	 * @param length The positive value the will pingpong to. Default is 1.
	 */
	pingpong(x: number, length?: number): number;

	/**
	 * @deprecated Use {@link Math#floorPowerOfTwo .floorPowerOfTwo()}
	 */
	nearestPowerOfTwo(value: number): number;

	/**
	 * @deprecated Use {@link Math#ceilPowerOfTwo .ceilPowerOfTwo()}
	 */
	nextPowerOfTwo(value: number): number;

	floorPowerOfTwo(value: number): number;

	ceilPowerOfTwo(value: number): number;

	setQuaternionFromProperEuler(q: IQuaternion | O3JS.Quaternion, a: number, b: number, c: number, order: string): void;
}

export interface IVector {
	setComponent(index: number, value: number): this;

	getComponent(index: number): number;

	set(...args: number[]): this;

	setScalar(scalar: number): this;

	/**
	 * copy(v:T):T;
	 */
	copy(v: IVector): this;

	/**
	 * NOTE: The second argument is deprecated.
	 *
	 * add(v:T):T;
	 */
	add(v: IVector): this;

	/**
	 * addVectors(a:T, b:T):T;
	 */
	addVectors(a: IVector, b: IVector): this;

	addScaledVector(vector: IVector, scale: number): this;

	/**
	 * Adds the scalar value s to this vector's values.
	 */
	addScalar(scalar: number): this;

	/**
	 * sub(v:T):T;
	 */
	sub(v: IVector): this;

	/**
	 * subVectors(a:T, b:T):T;
	 */
	subVectors(a: IVector, b: IVector): this;

	/**
	 * multiplyScalar(s:number):T;
	 */
	multiplyScalar(s: number): this;

	/**
	 * divideScalar(s:number):T;
	 */
	divideScalar(s: number): this;

	/**
	 * negate():T;
	 */
	negate(): this;

	/**
	 * dot(v:T):T;
	 */
	dot(v: IVector): number;

	/**
	 * lengthSq():number;
	 */
	lengthSq(): number;

	/**
	 * length():number;
	 */
	length(): number;

	/**
	 * normalize():T;
	 */
	normalize(): this;

	/**
	 * NOTE: Vector4 doesn't have the property.
	 *
	 * distanceTo(v:T):number;
	 */
	distanceTo?(v: IVector): number;

	/**
	 * NOTE: Vector4 doesn't have the property.
	 *
	 * distanceToSquared(v:T):number;
	 */
	distanceToSquared?(v: IVector): number;

	/**
	 * setLength(l:number):T;
	 */
	setLength(l: number): this;

	/**
	 * lerp(v:T, alpha:number):T;
	 */
	lerp(v: IVector, alpha: number): this;

	/**
	 * equals(v:T):boolean;
	 */
	equals(v: IVector): boolean;

	/**
	 * clone():T;
	 */
	clone(): IVector;
}

export interface ISpherical {
	new (radius?: number, phi?: number, theta?: number): this;
	/**
	 * @default 1
	 */
	radius: number;

	/**
	 * @default 0
	 */
	phi: number;

	/**
	 * @default 0
	 */
	theta: number;

	set(radius: number, phi: number, theta: number): this;
	clone(): this;
	copy(other: ISpherical): this;
	makeSafe(): this;
	setFromVector3(v: IVector3 | O3JS.Vector3): this;
	setFromCartesianCoords(x: number, y: number, z: number): this;
}

export interface IInterpolant {
	new (parameterPositions: any, sampleValues: any, sampleSize: number, resultBuffer?: any): this;
	parameterPositions: any;
	sampleValues: any;
	valueSize: number;
	resultBuffer: any;
	evaluate(time: number): any;
}

export interface ISphericalHarmonics3 {
	new (): this;
	/**
	 * @default [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(),
	 * new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]
	 */
	coefficients: (IVector3 | O3JS.Vector3)[];
	readonly isSphericalHarmonics3: true;

	set(coefficients: (IVector3 | O3JS.Vector3)[]): ISphericalHarmonics3;
	zero(): ISphericalHarmonics3;
	add(sh: ISphericalHarmonics3): ISphericalHarmonics3;
	addScaledSH(sh: ISphericalHarmonics3, s: number): ISphericalHarmonics3;
	scale(s: number): ISphericalHarmonics3;
	lerp(sh: ISphericalHarmonics3, alpha: number): ISphericalHarmonics3;
	equals(sh: ISphericalHarmonics3): boolean;
	copy(sh: ISphericalHarmonics3): ISphericalHarmonics3;
	clone(): this;

	/**
	 * Sets the values of this spherical harmonics from the provided array or array-like.
	 * @param array the source array or array-like.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): this;

	/**
	 * Returns an array with the values of this spherical harmonics, or copies them into the provided array.
	 * @param array (optional) array to store the spherical harmonics to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray(array?: number[], offset?: number): number[];

	/**
	 * Returns an array with the values of this spherical harmonics, or copies them into the provided array-like.
	 * @param array array-like to store the spherical harmonics to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray(array: ArrayLike<number>, offset?: number): ArrayLike<number>;

	getAt(normal: IVector3 | O3JS.Vector3, target: IVector3 | O3JS.Vector3): IVector3;
	getIrradianceAt(normal: IVector3 | O3JS.Vector3, target: IVector3 | O3JS.Vector3): IVector3;
}

export interface ICylindrical {
	new (radius?: number, theta?: number, y?: number): this;

	/**
	 * @default 1
	 */
	radius: number;

	/**
	 * @default 0
	 */
	theta: number;

	/**
	 * @default 0
	 */
	y: number;

	clone(): this;
	copy(other: ICylindrical): this;
	set(radius: number, theta: number, y: number): this;
	setFromVector3(vec3: IVector3 | O3JS.Vector3): this;
	setFromCartesianCoords(x: number, y: number, z: number): this;
}

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/GLBufferAttribute.js|src/core/GLBufferAttribute.js}
 */

export interface IGLBufferAttribute {
	buffer: WebGLBuffer;
	type: number;
	itemSize: number;
	elementSize: 1 | 2 | 4;
	count: number;
	version: number;

	readonly isGLBufferAttribute: true;

	set needsUpdate(value: boolean);

	setBuffer(buffer: WebGLBuffer): this;
	setType(type: number, elementSize: 1 | 2 | 4): this;
	setItemSize(itemSize: number): this;
	setCount(count: number): this;
}

/**
 * Object for keeping track of time.
 *
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js|src/core/Clock.js}
 */
export interface IClock {
	new (autoStart?: boolean): this;

	/**
	 * If set, starts the clock automatically when the first update is called.
	 * @default true
	 */
	autoStart: boolean;

	/**
	 * When the clock is running, It holds the starttime of the clock.
	 * This counted from the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
	 * @default 0
	 */
	startTime: number;

	/**
	 * When the clock is running, It holds the previous time from a update.
	 * This counted from the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
	 * @default 0
	 */
	oldTime: number;

	/**
	 * When the clock is running, It holds the time elapsed between the start of the clock to the previous update.
	 * This parameter is in seconds of three decimal places.
	 * @default 0
	 */
	elapsedTime: number;

	/**
	 * This property keeps track whether the clock is running or not.
	 * @default false
	 */
	running: boolean;

	/**
	 * Starts clock.
	 */
	start(): void;

	/**
	 * Stops clock.
	 */
	stop(): void;

	/**
	 * Get the seconds passed since the clock started.
	 */
	getElapsedTime(): number;

	/**
	 * Get the seconds passed since the last call to this method.
	 */
	getDelta(): number;
}

export interface IBufferAttribute {
	new (array: ArrayLike<number>, itemSize: number, normalized?: boolean): this; // array parameter should be TypedArray.

	/**
	 * @default ''
	 */
	name: string;
	array: ArrayLike<number>;
	itemSize: number;

	/**
	 * @default THREE.StaticDrawUsage
	 */
	usage: TUsage;

	/**
	 * @default { offset: number; count: number }
	 */
	updateRange: { offset: number; count: number };

	/**
	 * @default 0
	 */
	version: number;

	/**
	 * @default false
	 */
	normalized: boolean;

	/**
	 * @default 0
	 */
	count: number;

	set needsUpdate(value: boolean);

	readonly isBufferAttribute: true;

	onUploadCallback: () => void;
	onUpload(callback: () => void): this;
	setUsage(usage: TUsage): this;
	clone(): this;
	copy(source: IBufferAttribute): this;
	copyAt(index1: number, attribute: IBufferAttribute, index2: number): this;
	copyArray(array: ArrayLike<number>): this;
	copyColorsArray(colors: Array<{ r: number; g: number; b: number }>): this;
	copyVector2sArray(vectors: Array<{ x: number; y: number }>): this;
	copyVector3sArray(vectors: Array<{ x: number; y: number; z: number }>): this;
	copyVector4sArray(vectors: Array<{ x: number; y: number; z: number; w: number }>): this;
	applyMatrix3(m: IMatrix3 | O3JS.Matrix3): this;
	applyMatrix4(m: IMatrix4 | O3JS.Matrix4): this;
	applyNormalMatrix(m: IMatrix3 | O3JS.Matrix3): this;
	transformDirection(m: IMatrix4 | O3JS.Matrix4): this;
	set(value: ArrayLike<number> | ArrayBufferView, offset?: number): this;
	getX(index: number): number;
	setX(index: number, x: number): this;
	getY(index: number): number;
	setY(index: number, y: number): this;
	getZ(index: number): number;
	setZ(index: number, z: number): this;
	getW(index: number): number;
	setW(index: number, z: number): this;
	setXY(index: number, x: number, y: number): this;
	setXYZ(index: number, x: number, y: number, z: number): this;
	setXYZW(index: number, x: number, y: number, z: number, w: number): this;
	toJSON(): {
		itemSize: number;
		type: string;
		array: number[];
		normalized: boolean;
	};
}

export interface IInt8BufferAttribute extends IBufferAttribute {
	new (
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): this;
}

export interface IUint8BufferAttribute extends IBufferAttribute {
	new (
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): this;
}

export interface IUint8ClampedBufferAttribute extends IBufferAttribute {
	new (
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): this;
}

export interface IInt16BufferAttribute extends IBufferAttribute {
	new (
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): this;
}

export interface IUint16BufferAttribute extends IBufferAttribute {
	new (
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): this;
}

export interface IInt32BufferAttribute extends IBufferAttribute {
	new (
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): this;
}

export interface IUint32BufferAttribute extends IBufferAttribute {
	new (
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): this;
}

export interface IFloat16BufferAttribute extends IBufferAttribute {
	new (
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): this;
}

export interface IFloat32BufferAttribute extends IBufferAttribute {
	new (
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): this;
}

export interface IFloat64BufferAttribute extends IBufferAttribute {
	new (
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): this;
}

export interface IPolyhedronBufferGeometry extends IBufferGeometry {}

export interface IIcosahedronBufferGeometry extends IPolyhedronBufferGeometry {}

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/InstancedBufferGeometry.js|src/core/InstancedBufferGeometry.js}
 */
export interface IInstancedBufferGeometry extends IBufferGeometry {
	/**
	 * @default 'InstancedBufferGeometry
	 */
	type: string;

	isInstancedBufferGeometry: boolean;

	groups: Array<{ start: number; count: number; instances: number }>;

	/**
	 * @default Infinity
	 */
	instanceCount: number;

	addGroup(start: number, count: number, instances: number): void;
}

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/InstancedInterleavedBuffer.js|src/core/InstancedInterleavedBuffer.js}
 */
export interface IInstancedInterleavedBuffer extends IInterleavedBuffer {
	new (array: ArrayLike<number>, stride: number, meshPerAttribute?: number): this;

	/**
	 * @default 1
	 */
	meshPerAttribute: number;
}

export interface IInterleavedBuffer {
	new (array: ArrayLike<number>, stride: number): this;

	array: ArrayLike<number>;
	stride: number;

	/**
	 * @default THREE.StaticDrawUsage
	 */
	usage: TUsage;

	/**
	 * @default { offset: number; count: number }
	 */
	updateRange: { offset: number; count: number };

	/**
	 * @default 0
	 */
	version: number;

	length: number;

	/**
	 * @default 0
	 */
	count: number;
	needsUpdate: boolean;
	uuid: string;

	setUsage(usage: TUsage): IInterleavedBuffer;
	clone(data: object): IInterleavedBuffer;
	copy(source: IInterleavedBuffer): this;
	copyAt(index1: number, attribute: IInterleavedBufferAttribute, index2: number): IInterleavedBuffer;
	set(value: ArrayLike<number>, index: number): IInterleavedBuffer;
	toJSON(data: object): {
		uuid: string;
		buffer: string;
		type: string;
		stride: number;
	};
}

export interface IInterleavedBufferAttribute {
	new (interleavedBuffer: IInterleavedBuffer, itemSize: number, offset: number, normalized?: boolean): this;

	/**
	 * @default ''
	 */
	name: string;
	data: IInterleavedBuffer;
	itemSize: number;
	offset: number;

	/**
	 * @default false
	 */
	normalized: boolean;

	get count(): number;
	get array(): ArrayLike<number>;
	set needsUpdate(value: boolean);

	readonly isInterleavedBufferAttribute: true;

	applyMatrix4(m: IMatrix4 | O3JS.Matrix4): this;
	clone(data?: object): IBufferAttribute;
	getX(index: number): number;
	setX(index: number, x: number): this;
	getY(index: number): number;
	setY(index: number, y: number): this;
	getZ(index: number): number;
	setZ(index: number, z: number): this;
	getW(index: number): number;
	setW(index: number, z: number): this;
	setXY(index: number, x: number, y: number): this;
	setXYZ(index: number, x: number, y: number, z: number): this;
	setXYZW(index: number, x: number, y: number, z: number, w: number): this;
	toJSON(data?: object): {
		isInterleavedBufferAttribute: true;
		itemSize: number;
		data: string;
		offset: number;
		normalized: boolean;
	};
	applyNormalMatrix(matrix: IMatrix): this;
	transformDirection(matrix: IMatrix): this;
}

export type TVector2Tuple = [number, number];

/**
 * 2D vector.
 *
 * ( class Vector2 implements Vector<Vector2> )
 */
export interface IVector2 extends IVector {
	new (x?: number, y?: number): this;

	/**
	 * @default 0
	 */
	x: number;

	/**
	 * @default 0
	 */
	y: number;
	width: number;
	height: number;
	readonly isVector2: true;

	/**
	 * Sets value of this vector.
	 */
	set(x: number, y: number): this;

	/**
	 * Sets the x and y values of this vector both equal to scalar.
	 */
	setScalar(scalar: number): this;

	/**
	 * Sets X component of this vector.
	 */
	setX(x: number): this;

	/**
	 * Sets Y component of this vector.
	 */
	setY(y: number): this;

	/**
	 * Sets a component of this vector.
	 */
	setComponent(index: number, value: number): this;

	/**
	 * Gets a component of this vector.
	 */
	getComponent(index: number): number;

	/**
	 * Returns a new Vector2 instance with the same `x` and `y` values.
	 */
	clone(): this;

	/**
	 * Copies value of v to this vector.
	 */
	copy(v: IVector2 | O3JS.Vector2): this;

	/**
	 * Adds v to this vector.
	 */
	add(v: IVector2 | O3JS.Vector2, w?: IVector2 | O3JS.Vector2): this;

	/**
	 * Adds the scalar value s to this vector's x and y values.
	 */
	addScalar(s: number): this;

	/**
	 * Sets this vector to a + b.
	 */
	addVectors(a: IVector2 | O3JS.Vector2, b: IVector2 | O3JS.Vector2): this;

	/**
	 * Adds the multiple of v and s to this vector.
	 */
	addScaledVector(v: IVector2 | O3JS.Vector2, s: number): this;

	/**
	 * Subtracts v from this vector.
	 */
	sub(v: IVector2 | O3JS.Vector2): this;

	/**
	 * Subtracts s from this vector's x and y components.
	 */
	subScalar(s: number): this;

	/**
	 * Sets this vector to a - b.
	 */
	subVectors(a: IVector2 | O3JS.Vector2, b: IVector2 | O3JS.Vector2): this;

	/**
	 * Multiplies this vector by v.
	 */
	multiply(v: IVector2 | O3JS.Vector2): this;

	/**
	 * Multiplies this vector by scalar s.
	 */
	multiplyScalar(scalar: number): this;

	/**
	 * Divides this vector by v.
	 */
	divide(v: IVector2 | O3JS.Vector2): this;

	/**
	 * Divides this vector by scalar s.
	 * Set vector to ( 0, 0 ) if s == 0.
	 */
	divideScalar(s: number): this;

	/**
	 * Multiplies this vector (with an implicit 1 as the 3rd component) by m.
	 */
	applyMatrix3(m: IMatrix3 | O3JS.Matrix3): this;

	/**
	 * If this vector's x or y value is greater than v's x or y value, replace that value with the corresponding min value.
	 */
	min(v: IVector2 | O3JS.Vector2): this;

	/**
	 * If this vector's x or y value is less than v's x or y value, replace that value with the corresponding max value.
	 */
	max(v: IVector2 | O3JS.Vector2): this;

	/**
	 * If this vector's x or y value is greater than the max vector's x or y value, it is replaced by the corresponding value.
	 * If this vector's x or y value is less than the min vector's x or y value, it is replaced by the corresponding value.
	 * @param min the minimum x and y values.
	 * @param max the maximum x and y values in the desired range.
	 */
	clamp(min: IVector2 | O3JS.Vector2, max: IVector2 | O3JS.Vector2): this;

	/**
	 * If this vector's x or y values are greater than the max value, they are replaced by the max value.
	 * If this vector's x or y values are less than the min value, they are replaced by the min value.
	 * @param min the minimum value the components will be clamped to.
	 * @param max the maximum value the components will be clamped to.
	 */
	clampScalar(min: number, max: number): this;

	/**
	 * If this vector's length is greater than the max value, it is replaced by the max value.
	 * If this vector's length is less than the min value, it is replaced by the min value.
	 * @param min the minimum value the length will be clamped to.
	 * @param max the maximum value the length will be clamped to.
	 */
	clampLength(min: number, max: number): this;

	/**
	 * The components of the vector are rounded down to the nearest integer value.
	 */
	floor(): this;

	/**
	 * The x and y components of the vector are rounded up to the nearest integer value.
	 */
	ceil(): this;

	/**
	 * The components of the vector are rounded to the nearest integer value.
	 */
	round(): this;

	/**
	 * The components of the vector are rounded towards zero (up if negative, down if positive) to an integer value.
	 */
	roundToZero(): this;

	/**
	 * Inverts this vector.
	 */
	negate(): this;

	/**
	 * Computes dot product of this vector and v.
	 */
	dot(v: IVector2 | O3JS.Vector2): number;

	/**
	 * Computes cross product of this vector and v.
	 */
	cross(v: IVector2 | O3JS.Vector2): number;

	/**
	 * Computes squared length of this vector.
	 */
	lengthSq(): number;

	/**
	 * Computes length of this vector.
	 */
	length(): number;

	/**
	 * @deprecated Use {@line THREE.Vector2#manhattanLength .manhattanLength()} instead.
	 */
	lengthManhattan(): number;

	/**
	 * Computes the Manhattan length of this vector.
	 *
	 * see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanLength(): number;

	/**
	 * Normalizes this vector.
	 */
	normalize(): this;

	/**
	 * computes the angle in radians with respect to the positive x-axis
	 */
	angle(): number;

	/**
	 * Computes distance of this vector to v.
	 */
	distanceTo(v: IVector2 | O3JS.Vector2): number;

	/**
	 * Computes squared distance of this vector to v.
	 */
	distanceToSquared(v: IVector2 | O3JS.Vector2): number;

	/**
	 * @deprecated Use {@line THREE.Vector2#manhattanDistanceTo .manhattanDistanceTo()} instead.
	 */
	distanceToManhattan(v: IVector2 | O3JS.Vector2): number;

	/**
	 * Computes the Manhattan length (distance) from this vector to the given vector v
	 *
	 * see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanDistanceTo(v: IVector2 | O3JS.Vector2): number;

	/**
	 * Normalizes this vector and multiplies it by l.
	 */
	setLength(length: number): this;

	/**
	 * Linearly interpolates between this vector and v, where alpha is the distance along the line - alpha = 0 will be this vector, and alpha = 1 will be v.
	 * @param v vector to interpolate towards.
	 * @param alpha interpolation factor in the closed interval [0, 1].
	 */
	lerp(v: IVector2 | O3JS.Vector2, alpha: number): this;

	/**
	 * Sets this vector to be the vector linearly interpolated between v1 and v2 where alpha is the distance along the line connecting the two vectors - alpha = 0 will be v1, and alpha = 1 will be v2.
	 * @param v1 the starting vector.
	 * @param v2 vector to interpolate towards.
	 * @param alpha interpolation factor in the closed interval [0, 1].
	 */
	lerpVectors(v1: IVector2 | O3JS.Vector2, v2: IVector2 | O3JS.Vector2, alpha: number): this;

	/**
	 * Checks for strict equality of this vector and v.
	 */
	equals(v: IVector2 | O3JS.Vector2): boolean;

	/**
	 * Sets this vector's x and y value from the provided array or array-like.
	 * @param array the source array or array-like.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): this;

	/**
	 * Returns an array [x, y], or copies x and y into the provided array.
	 * @param array (optional) array to store the vector to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray(array?: number[], offset?: number): number[];
	toArray(array?: TVector2Tuple, offset?: 0): TVector2Tuple;

	/**
	 * Copies x and y into the provided array-like.
	 * @param array array-like to store the vector to.
	 * @param offset (optional) optional offset into the array.
	 * @return The provided array-like.
	 */
	toArray(array: ArrayLike<number>, offset?: number): ArrayLike<number>;

	/**
	 * Sets this vector's x and y values from the attribute.
	 * @param attribute the source attribute.
	 * @param index index in the attribute.
	 */
	fromBufferAttribute(attribute: IBufferAttribute, index: number): this;

	/**
	 * Rotates the vector around center by angle radians.
	 * @param center the point around which to rotate.
	 * @param angle the angle to rotate, in radians.
	 */
	rotateAround(center: IVector2 | O3JS.Vector2, angle: number): this;

	/**
	 * Sets this vector's x and y from Math.random
	 */
	random(): this;
}

export type TVector3Tuple = [number, number, number];

export interface IVector3 extends IVector {
	new (x?: number, y?: number, z?: number): this;

	/**
	 * @default 0
	 */
	x: number;

	/**
	 * @default 0
	 */
	y: number;

	/**
	 * @default 0
	 */
	z: number;
	readonly isVector3: true;

	/**
	 * Sets value of this vector.
	 */
	set(x: number, y: number, z: number): this;

	/**
	 * Sets all values of this vector.
	 */
	setScalar(scalar: number): this;

	/**
	 * Sets x value of this vector.
	 */
	setX(x: number): this;

	/**
	 * Sets y value of this vector.
	 */
	setY(y: number): this;

	/**
	 * Sets z value of this vector.
	 */
	setZ(z: number): this;

	setComponent(index: number, value: number): this;

	getComponent(index: number): number;

	/**
	 * Clones this vector.
	 */
	clone(): this;

	/**
	 * Copies value of v to this vector.
	 */
	copy(v: IVector3 | O3JS.Vector3): this;

	/**
	 * Adds v to this vector.
	 */
	add(v: IVector3 | O3JS.Vector3): this;

	addScalar(s: number): this;

	addScaledVector(v: IVector3 | O3JS.Vector3, s: number): this;

	/**
	 * Sets this vector to a + b.
	 */
	addVectors(a: IVector3 | O3JS.Vector3, b: IVector3 | O3JS.Vector3): this;

	/**
	 * Subtracts v from this vector.
	 */
	sub(a: IVector3 | O3JS.Vector3): this;

	subScalar(s: number): this;

	/**
	 * Sets this vector to a - b.
	 */
	subVectors(a: IVector3 | O3JS.Vector3, b: IVector3 | O3JS.Vector3): this;

	multiply(v: IVector3 | O3JS.Vector3): this;

	/**
	 * Multiplies this vector by scalar s.
	 */
	multiplyScalar(s: number): this;

	multiplyVectors(a: IVector3 | O3JS.Vector3, b: IVector3 | O3JS.Vector3): this;

	applyEuler(euler: IEuler | O3JS.Euler): this;

	applyAxisAngle(axis: IVector3 | O3JS.Vector3, angle: number): this;

	applyMatrix3(m: IMatrix3 | O3JS.Matrix3): this;

	applyNormalMatrix(m: IMatrix3 | O3JS.Matrix3): this;

	applyMatrix4(m: IMatrix4 | O3JS.Matrix4): this;

	applyQuaternion(q: IQuaternion | O3JS.Quaternion): this;

	project(camera: ICamera): this;

	unproject(camera: ICamera): this;

	transformDirection(m: IMatrix4 | O3JS.Matrix4): this;

	divide(v: IVector3 | O3JS.Vector3): this;

	/**
	 * Divides this vector by scalar s.
	 * Set vector to ( 0, 0, 0 ) if s == 0.
	 */
	divideScalar(s: number): this;

	min(v: IVector3 | O3JS.Vector3): this;

	max(v: IVector3 | O3JS.Vector3): this;

	clamp(min: IVector3 | O3JS.Vector3, max: IVector3 | O3JS.Vector3): this;

	clampScalar(min: number, max: number): this;

	clampLength(min: number, max: number): this;

	floor(): this;

	ceil(): this;

	round(): this;

	roundToZero(): this;

	/**
	 * Inverts this vector.
	 */
	negate(): this;

	/**
	 * Computes dot product of this vector and v.
	 */
	dot(v: IVector3 | O3JS.Vector3): number;

	/**
	 * Computes squared length of this vector.
	 */
	lengthSq(): number;

	/**
	 * Computes length of this vector.
	 */
	length(): number;

	/**
	 * Computes Manhattan length of this vector.
	 * http://en.wikipedia.org/wiki/Taxicab_geometry
	 *
	 * @deprecated Use {@line THREE.Vector3#manhattanLength .manhattanLength()} instead.
	 */
	lengthManhattan(): number;

	/**
	 * Computes the Manhattan length of this vector.
	 *
	 * see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanLength(): number;

	/**
	 * Computes the Manhattan length (distance) from this vector to the given vector v
	 *
	 * see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanDistanceTo(v: IVector3 | O3JS.Vector3): number;

	/**
	 * Normalizes this vector.
	 */
	normalize(): this;

	/**
	 * Normalizes this vector and multiplies it by l.
	 */
	setLength(l: number): this;
	lerp(v: IVector3 | O3JS.Vector3, alpha: number): this;

	lerpVectors(v1: IVector3 | O3JS.Vector3, v2: IVector3 | O3JS.Vector3, alpha: number): this;

	/**
	 * Sets this vector to cross product of itself and v.
	 */
	cross(a: IVector3 | O3JS.Vector3): this;

	/**
	 * Sets this vector to cross product of a and b.
	 */
	crossVectors(a: IVector3 | O3JS.Vector3, b: IVector3 | O3JS.Vector3): this;
	projectOnVector(v: IVector3 | O3JS.Vector3): this;
	projectOnPlane(planeNormal: IVector3 | O3JS.Vector3): this;
	reflect(vector: IVector3 | O3JS.Vector3): this;
	angleTo(v: IVector3 | O3JS.Vector3): number;

	/**
	 * Computes distance of this vector to v.
	 */
	distanceTo(v: IVector3 | O3JS.Vector3): number;

	/**
	 * Computes squared distance of this vector to v.
	 */
	distanceToSquared(v: IVector3 | O3JS.Vector3): number;

	/**
	 * @deprecated Use {@line THREE.Vector3#manhattanDistanceTo .manhattanDistanceTo()} instead.
	 */
	distanceToManhattan(v: IVector3 | O3JS.Vector3): number;

	setFromSpherical(s: ISpherical): this;
	setFromSphericalCoords(r: number, phi: number, theta: number): this;
	setFromCylindrical(s: ICylindrical): this;
	setFromCylindricalCoords(radius: number, theta: number, y: number): this;
	setFromMatrixPosition(m: IMatrix4 | O3JS.Matrix4): this;
	setFromMatrixScale(m: IMatrix4 | O3JS.Matrix4): this;
	setFromMatrixColumn(matrix: IMatrix4, index: number): this;
	setFromMatrix3Column(matrix: IMatrix3 | O3JS.Matrix3, index: number): this;

	/**
	 * Checks for strict equality of this vector and v.
	 */
	equals(v: IVector3 | O3JS.Vector3): boolean;

	/**
	 * Sets this vector's x, y and z value from the provided array or array-like.
	 * @param array the source array or array-like.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): this;

	/**
	 * Returns an array [x, y, z], or copies x, y and z into the provided array.
	 * @param array (optional) array to store the vector to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray(array?: number[], offset?: number): number[];
	toArray(array?: TVector3Tuple, offset?: 0): TVector3Tuple;

	/**
	 * Copies x, y and z into the provided array-like.
	 * @param array array-like to store the vector to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray(array: ArrayLike<number>, offset?: number): ArrayLike<number>;

	fromBufferAttribute(attribute: IBufferAttribute | IInterleavedBufferAttribute, index: number): this;

	/**
	 * Sets this vector's x, y and z from Math.random
	 */
	random(): this;

	randomDirection(): this;
}

export type Vector4Tuple = [number, number, number, number];

/**
 * 4D vector.
 *
 * ( class Vector4 implements Vector<Vector4> )
 */
export interface IVector4 extends IVector {
	new (x?: number, y?: number, z?: number, w?: number): this;

	/**
	 * @default 0
	 */
	x: number;

	/**
	 * @default 0
	 */
	y: number;

	/**
	 * @default 0
	 */
	z: number;

	/**
	 * @default 0
	 */
	w: number;

	width: number;
	height: number;
	readonly isVector4: true;

	/**
	 * Sets value of this vector.
	 */
	set(x: number, y: number, z: number, w: number): this;

	/**
	 * Sets all values of this vector.
	 */
	setScalar(scalar: number): this;

	/**
	 * Sets X component of this vector.
	 */
	setX(x: number): this;

	/**
	 * Sets Y component of this vector.
	 */
	setY(y: number): this;

	/**
	 * Sets Z component of this vector.
	 */
	setZ(z: number): this;

	/**
	 * Sets w component of this vector.
	 */
	setW(w: number): this;

	setComponent(index: number, value: number): this;

	getComponent(index: number): number;

	/**
	 * Clones this vector.
	 */
	clone(): this;

	/**
	 * Copies value of v to this vector.
	 */
	copy(v: IVector4 | O3JS.Vector4): this;

	/**
	 * Adds v to this vector.
	 */
	add(v: IVector4 | O3JS.Vector4): this;

	addScalar(scalar: number): this;

	/**
	 * Sets this vector to a + b.
	 */
	addVectors(a: IVector4 | O3JS.Vector4, b: IVector4 | O3JS.Vector4): this;

	addScaledVector(v: IVector4 | O3JS.Vector4, s: number): this;
	/**
	 * Subtracts v from this vector.
	 */
	sub(v: IVector4 | O3JS.Vector4): this;

	subScalar(s: number): this;

	/**
	 * Sets this vector to a - b.
	 */
	subVectors(a: IVector4 | O3JS.Vector4, b: IVector4 | O3JS.Vector4): this;

	multiply(v: IVector4 | O3JS.Vector4): this;

	/**
	 * Multiplies this vector by scalar s.
	 */
	multiplyScalar(s: number): this;

	applyMatrix4(m: IMatrix4 | O3JS.Matrix4): this;

	/**
	 * Divides this vector by scalar s.
	 * Set vector to ( 0, 0, 0 ) if s == 0.
	 */
	divideScalar(s: number): this;

	/**
	 * http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
	 * @param q is assumed to be normalized
	 */
	setAxisAngleFromQuaternion(q: IQuaternion | O3JS.Quaternion): this;

	/**
	 * http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
	 * @param m assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
	 */
	setAxisAngleFromRotationMatrix(m: IMatrix4 | O3JS.Matrix4): this;

	min(v: IVector4 | O3JS.Vector4): this;
	max(v: IVector4 | O3JS.Vector4): this;
	clamp(min: IVector4 | O3JS.Vector4, max: IVector4 | O3JS.Vector4): this;
	clampScalar(min: number, max: number): this;
	floor(): this;
	ceil(): this;
	round(): this;
	roundToZero(): this;

	/**
	 * Inverts this vector.
	 */
	negate(): this;

	/**
	 * Computes dot product of this vector and v.
	 */
	dot(v: IVector4 | O3JS.Vector4): number;

	/**
	 * Computes squared length of this vector.
	 */
	lengthSq(): number;

	/**
	 * Computes length of this vector.
	 */
	length(): number;

	/**
	 * Computes the Manhattan length of this vector.
	 *
	 * see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanLength(): number;

	/**
	 * Normalizes this vector.
	 */
	normalize(): this;
	/**
	 * Normalizes this vector and multiplies it by l.
	 */
	setLength(length: number): this;

	/**
	 * Linearly interpolate between this vector and v with alpha factor.
	 */
	lerp(v: IVector4 | O3JS.Vector4, alpha: number): this;

	lerpVectors(v1: IVector4 | O3JS.Vector4, v2: IVector4 | O3JS.Vector4, alpha: number): this;

	/**
	 * Checks for strict equality of this vector and v.
	 */
	equals(v: IVector4 | O3JS.Vector4): boolean;

	/**
	 * Sets this vector's x, y, z and w value from the provided array or array-like.
	 * @param array the source array or array-like.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): this;

	/**
	 * Returns an array [x, y, z, w], or copies x, y, z and w into the provided array.
	 * @param array (optional) array to store the vector to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray(array?: number[], offset?: number): number[];
	toArray(array?: Vector4Tuple, offset?: 0): Vector4Tuple;

	/**
	 * Copies x, y, z and w into the provided array-like.
	 * @param array array-like to store the vector to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray(array: ArrayLike<number>, offset?: number): ArrayLike<number>;

	fromBufferAttribute(attribute: IBufferAttribute, index: number): this;

	/**
	 * Sets this vector's x, y, z and w from Math.random
	 */
	random(): this;
}

export interface IHSL {
	h: number;
	s: number;
	l: number;
}

export type TColorRepresentation = O3JS.ColorRepresentation | any;

/**
 * Represents a color. See also {@link ColorUtils}.
 *
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/math/Color.js|src/math/Color.js}
 *
 * @example
 * const color = new THREE.Color( 0xff0000 );
 */
export interface IColor {
	new (color?: TColorRepresentation): this;
	new (r: number, g: number, b: number): this;

	readonly isColor: true;

	/**
	 * Red channel value between 0 and 1. Default is 1.
	 * @default 1
	 */
	r: number;

	/**
	 * Green channel value between 0 and 1. Default is 1.
	 * @default 1
	 */
	g: number;

	/**
	 * Blue channel value between 0 and 1. Default is 1.
	 * @default 1
	 */
	b: number;

	set(color: TColorRepresentation): IColor;
	setScalar(scalar: number): IColor;
	setHex(hex: number): IColor;

	/**
	 * Sets this color from RGB values.
	 * @param r Red channel value between 0 and 1.
	 * @param g Green channel value between 0 and 1.
	 * @param b Blue channel value between 0 and 1.
	 */
	setRGB(r: number, g: number, b: number): IColor;

	/**
	 * Sets this color from HSL values.
	 * Based on MochiKit implementation by Bob Ippolito.
	 *
	 * @param h Hue channel value between 0 and 1.
	 * @param s Saturation value channel between 0 and 1.
	 * @param l Value channel value between 0 and 1.
	 */
	setHSL(h: number, s: number, l: number): IColor;

	/**
	 * Sets this color from a CSS context style string.
	 * @param contextStyle Color in CSS context style format.
	 */
	setStyle(style: string): IColor;

	/**
	 * Sets this color from a color name.
	 * Faster than {@line THREE.Color#setStyle .setStyle()} method if you don't need the other CSS-style formats.
	 * @param style Color name in X11 format.
	 */
	setColorName(style: string): IColor;

	/**
	 * Clones this color.
	 */
	clone(): this;

	/**
	 * Copies given color.
	 * @param color Color to copy.
	 */
	copy(color: IColor): this;

	/**
	 * Copies given color making conversion from gamma to linear space.
	 * @param color Color to copy.
	 */
	copyGammaToLinear(color: IColor, gammaFactor?: number): IColor;

	/**
	 * Copies given color making conversion from linear to gamma space.
	 * @param color Color to copy.
	 */
	copyLinearToGamma(color: IColor, gammaFactor?: number): IColor;

	/**
	 * Converts this color from gamma to linear space.
	 */
	convertGammaToLinear(gammaFactor?: number): IColor;

	/**
	 * Converts this color from linear to gamma space.
	 */
	convertLinearToGamma(gammaFactor?: number): IColor;

	/**
	 * Copies given color making conversion from sRGB to linear space.
	 * @param color Color to copy.
	 */
	copySRGBToLinear(color: IColor): IColor;

	/**
	 * Copies given color making conversion from linear to sRGB space.
	 * @param color Color to copy.
	 */
	copyLinearToSRGB(color: IColor): IColor;

	/**
	 * Converts this color from sRGB to linear space.
	 */
	convertSRGBToLinear(): IColor;

	/**
	 * Converts this color from linear to sRGB space.
	 */
	convertLinearToSRGB(): IColor;

	/**
	 * Returns the hexadecimal value of this color.
	 */
	getHex(): number;

	/**
	 * Returns the string formated hexadecimal value of this color.
	 */
	getHexString(): string;

	getHSL(target: IHSL): IHSL;

	/**
	 * Returns the value of this color in CSS context style.
	 * Example: rgb(r, g, b)
	 */
	getStyle(): string;

	offsetHSL(h: number, s: number, l: number): this;

	add(color: IColor): this;
	addColors(color1: IColor, color2: IColor): this;
	addScalar(s: number): this;
	sub(color: IColor): this;
	multiply(color: IColor): this;
	multiplyScalar(s: number): this;
	lerp(color: IColor, alpha: number): this;
	lerpColors(color1: IColor, color2: IColor, alpha: number): this;
	lerpHSL(color: IColor, alpha: number): this;
	equals(color: IColor): boolean;

	/**
	 * Sets this color's red, green and blue value from the provided array or array-like.
	 * @param array the source array or array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): this;

	/**
	 * Returns an array [red, green, blue], or copies red, green and blue into the provided array.
	 * @param array (optional) array to store the color to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray(array?: number[], offset?: number): number[];

	/**
	 * Copies red, green and blue into the provided array-like.
	 * @param array array-like to store the color to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray(xyz: ArrayLike<number>, offset?: number): ArrayLike<number>;

	fromBufferAttribute(attribute: IBufferAttribute, index: number): this;
}

/**
 * a 2d path representation, comprising of points, lines, and cubes, similar to the html5 2d canvas api. It extends CurvePath.
 */
export interface IPath extends ICurvePath<IVector2 | O3JS.Vector2> {
	new (points?: (IVector2 | O3JS.Vector2)[]): this;

	/**
	 * @default 'Path'
	 */
	type: string;

	/**
	 * @default new THREE.Vector2()
	 */
	currentPoint: IVector2 | O3JS.Vector2;

	/**
	 * @deprecated Use {@link Path#setFromPoints .setFromPoints()} instead.
	 */
	fromPoints(vectors: (IVector2 | O3JS.Vector2)[]): this;
	setFromPoints(vectors: (IVector2 | O3JS.Vector2)[]): this;
	moveTo(x: number, y: number): this;
	lineTo(x: number, y: number): this;
	quadraticCurveTo(aCPx: number, aCPy: number, aX: number, aY: number): this;
	bezierCurveTo(aCP1x: number, aCP1y: number, aCP2x: number, aCP2y: number, aX: number, aY: number): this;
	splineThru(pts: (IVector2 | O3JS.Vector2)[]): this;
	arc(aX: number, aY: number, aRadius: number, aStartAngle: number, aEndAngle: number, aClockwise: boolean): this;
	absarc(aX: number, aY: number, aRadius: number, aStartAngle: number, aEndAngle: number, aClockwise: boolean): this;
	ellipse(
		aX: number,
		aY: number,
		xRadius: number,
		yRadius: number,
		aStartAngle: number,
		aEndAngle: number,
		aClockwise: boolean,
		aRotation: number
	): this;
	absellipse(
		aX: number,
		aY: number,
		xRadius: number,
		yRadius: number,
		aStartAngle: number,
		aEndAngle: number,
		aClockwise: boolean,
		aRotation: number
	): this;
}

export interface IArcCurve extends IEllipseCurve {
	new (aX: number, aY: number, aRadius: number, aStartAngle: number, aEndAngle: number, aClockwise: boolean): this;

	/**
	 * @default 'ArcCurve'
	 */
	type: string;
}

export interface ICatmullRomCurve3 extends ICurve<IVector3> {
	/**
	 * @param [points=[]]
	 * @param [closed=false]
	 * @param [curveType='centripetal']
	 * @param [tension=0.5]
	 */
	new (points?: (IVector3 | O3JS.Vector3)[], closed?: boolean, curveType?: string, tension?: number): this;

	/**
	 * @default 'CatmullRomCurve3'
	 */
	type: string;

	/**
	 * @default []
	 */
	points: (IVector3 | O3JS.Vector3)[];
}

export interface ICubicBezierCurve extends ICurve<IVector2 | O3JS.Vector2> {
	new (
		v0: IVector2 | O3JS.Vector2,
		v1: IVector2 | O3JS.Vector2,
		v2: IVector2 | O3JS.Vector2,
		v3: IVector2 | O3JS.Vector2
	): this;

	/**
	 * @default 'CubicBezierCurve'
	 */
	type: string;

	/**
	 * @default new THREE.Vector2()
	 */
	v0: IVector2 | O3JS.Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v1: IVector2 | O3JS.Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v2: IVector2 | O3JS.Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v3: IVector2 | O3JS.Vector2;
}

export interface ICubicBezierCurve3 extends ICurve<IVector3> {
	new (
		v0: IVector3 | O3JS.Vector3,
		v1: IVector3 | O3JS.Vector3,
		v2: IVector3 | O3JS.Vector3,
		v3: IVector3 | O3JS.Vector3
	): this;

	/**
	 * @default 'CubicBezierCurve3'
	 */
	type: string;

	/**
	 * @default new THREE.Vector3()
	 */
	v0: IVector3 | O3JS.Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v1: IVector3 | O3JS.Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v2: IVector3 | O3JS.Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v3: IVector3 | O3JS.Vector3;
}

export interface ICubicBezierCurve extends ICurve<IVector2 | O3JS.Vector2> {
	new (
		v0: IVector2 | O3JS.Vector2,
		v1: IVector2 | O3JS.Vector2,
		v2: IVector2 | O3JS.Vector2,
		v3: IVector2 | O3JS.Vector2
	): this;

	/**
	 * @default 'CubicBezierCurve'
	 */
	type: string;

	/**
	 * @default new THREE.Vector2()
	 */
	v0: IVector2 | O3JS.Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v1: IVector2 | O3JS.Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v2: IVector2 | O3JS.Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v3: IVector2 | O3JS.Vector2;
}

export interface ICubicBezierCurve3 extends ICurve<IVector3> {
	new (
		v0: IVector3 | O3JS.Vector3,
		v1: IVector3 | O3JS.Vector3,
		v2: IVector3 | O3JS.Vector3,
		v3: IVector3 | O3JS.Vector3
	): this;

	/**
	 * @default 'CubicBezierCurve3'
	 */
	type: string;

	/**
	 * @default new THREE.Vector3()
	 */
	v0: IVector3 | O3JS.Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v1: IVector3 | O3JS.Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v2: IVector3 | O3JS.Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v3: IVector3 | O3JS.Vector3;
}

export interface IEllipseCurve extends ICurve<IVector2 | O3JS.Vector2> {
	new (
		aX: number,
		aY: number,
		xRadius: number,
		yRadius: number,
		aStartAngle: number,
		aEndAngle: number,
		aClockwise: boolean,
		aRotation: number
	): this;

	/**
	 * @default 'EllipseCurve'
	 */
	type: string;

	/**
	 * @default 0
	 */
	aX: number;

	/**
	 * @default 0
	 */
	aY: number;

	/**
	 * @default 1
	 */
	xRadius: number;

	/**
	 * @default 1
	 */
	yRadius: number;

	/**
	 * @default 0
	 */
	aStartAngle: number;

	/**
	 * @default 2 * Math.PI
	 */
	aEndAngle: number;

	/**
	 * @default false
	 */
	aClockwise: boolean;

	/**
	 * @default 0
	 */
	aRotation: number;
}

export interface ILineCurve extends ICurve<IVector2 | O3JS.Vector2> {
	new (v1: IVector2 | O3JS.Vector2, v2: IVector2 | O3JS.Vector2): this;

	/**
	 * @default 'LineCurve'
	 */
	type: string;

	/**
	 * @default new THREE.Vector2()
	 */
	v1: IVector2 | O3JS.Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v2: IVector2 | O3JS.Vector2;
}

export interface ILineCurve3 extends ICurve<IVector3> {
	new (v1: IVector3 | O3JS.Vector3, v2: IVector3 | O3JS.Vector3): this;

	/**
	 * @default 'LineCurve3'
	 */
	type: string;

	/**
	 * @default new THREE.Vector3()
	 */
	v1: IVector3 | O3JS.Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v2: IVector3 | O3JS.Vector3;
}

export interface IQuadraticBezierCurve extends ICurve<IVector2 | O3JS.Vector2> {
	new (v0: IVector2 | O3JS.Vector2, v1: IVector2 | O3JS.Vector2, v2: IVector2 | O3JS.Vector2): this;

	/**
	 * @default 'QuadraticBezierCurve'
	 */
	type: string;

	/**
	 * @default new THREE.Vector2()
	 */
	v0: IVector2 | O3JS.Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v1: IVector2 | O3JS.Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v2: IVector2 | O3JS.Vector2;
}

export interface IQuadraticBezierCurve3 extends ICurve<IVector3> {
	new (v0: IVector3 | O3JS.Vector3, v1: IVector3 | O3JS.Vector3, v2: IVector3 | O3JS.Vector3): this;

	/**
	 * @default 'QuadraticBezierCurve3'
	 */
	type: string;

	/**
	 * @default new THREE.Vector3()
	 */
	v0: IVector3 | O3JS.Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v1: IVector3 | O3JS.Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v2: IVector3 | O3JS.Vector3;
}

export interface ISplineCurve extends ICurve<IVector2 | O3JS.Vector2> {
	new (points?: (IVector2 | O3JS.Vector2)[]): this;

	/**
	 * @default 'SplineCurve'
	 */
	type: string;

	/**
	 * @default []
	 */
	points: (IVector2 | O3JS.Vector2)[];
}

export interface ICurvePath<T extends IVector = IVector3> extends ICurve<T> {
	new (): this;

	/**
	 * @default 'CurvePath'
	 */
	type: string;

	/**
	 * @default []
	 */
	curves: Array<ICurve<T>>;

	/**
	 * @default false
	 */
	autoClose: boolean;

	add(curve: ICurve<T>): void;
	closePath(): void;
	getPoint(t: number, optionalTarget?: T): T;
	getCurveLengths(): number[];
}

/**
 * Defines a 2d shape plane using paths.
 */
export interface IShape extends IPath {
	new (points?: (IVector2 | O3JS.Vector2)[]): this;

	/**
	 * @default 'Shape'
	 */
	type: string;

	uuid: string;

	/**
	 * @default []
	 */
	holes: IPath[];

	getPointsHoles(divisions: number): (IVector2 | O3JS.Vector2)[][];

	extractPoints(divisions: number): {
		shape: (IVector2 | O3JS.Vector2)[];
		holes: (IVector2 | O3JS.Vector2)[][];
	};
}

export interface IShapePath {
	new (): this;

	/**
	 * @default 'ShapePath'
	 */
	type: string;

	/**
	 * @default new THREE.Color()
	 */
	color: IColor;

	/**
	 * @default []
	 */
	subPaths: any[];

	/**
	 * @default null
	 */
	currentPath: any;

	moveTo(x: number, y: number): this;
	lineTo(x: number, y: number): this;
	quadraticCurveTo(aCPx: number, aCPy: number, aX: number, aY: number): this;
	bezierCurveTo(aCP1x: number, aCP1y: number, aCP2x: number, aCP2y: number, aX: number, aY: number): this;
	splineThru(pts: (IVector2 | O3JS.Vector2)[]): this;
	toShapes(isCCW: boolean, noHoles?: boolean): IShape[];
}

/**
 * An extensible curve object which contains methods for interpolation
 * class Curve<T extends Vector>
 */
export interface ICurve<T = IVector3> {
	new (): this;

	/**
	 * @default 'Curve'
	 */
	type: string;

	/**
	 * This value determines the amount of divisions when calculating the cumulative segment lengths of a curve via .getLengths.
	 * To ensure precision when using methods like .getSpacedPoints, it is recommended to increase .arcLengthDivisions if the curve is very large.
	 * @default 200
	 */
	arcLengthDivisions: number;

	/**
	 * Returns a vector for point t of the curve where t is between 0 and 1
	 * getPoint(t: number, optionalTarget?: T): T;
	 */
	getPoint(t: number, optionalTarget?: T): T;

	/**
	 * Returns a vector for point at relative position in curve according to arc length
	 * getPointAt(u: number, optionalTarget?: T): T;
	 */
	getPointAt(u: number, optionalTarget?: T): T;

	/**
	 * Get sequence of points using getPoint( t )
	 * getPoints(divisions?: number): T[];
	 */
	getPoints(divisions?: number): T[];

	/**
	 * Get sequence of equi-spaced points using getPointAt( u )
	 * getSpacedPoints(divisions?: number): T[];
	 */
	getSpacedPoints(divisions?: number): T[];

	/**
	 * Get total curve arc length
	 */
	getLength(): number;

	/**
	 * Get list of cumulative segment lengths
	 */
	getLengths(divisions?: number): number[];

	/**
	 * Update the cumlative segment distance cache
	 */
	updateArcLengths(): void;

	/**
	 * Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equi distance
	 */
	getUtoTmapping(u: number, distance: number): number;

	/**
	 * Returns a unit vector tangent at t. If the subclassed curve do not implement its tangent derivation, 2 points a
	 * small delta apart will be used to find its gradient which seems to give a reasonable approximation
	 * getTangent(t: number, optionalTarget?: T): T;
	 */
	getTangent(t: number, optionalTarget?: T): T;

	/**
	 * Returns tangent at equidistance point u on the curve
	 * getTangentAt(u: number, optionalTarget?: T): T;
	 */
	getTangentAt(u: number, optionalTarget?: T): T;

	/**
	 * Generate Frenet frames of the curve
	 */
	computeFrenetFrames(
		segments: number,
		closed?: boolean
	): {
		tangents: (IVector3 | O3JS.Vector3)[];
		normals: (IVector3 | O3JS.Vector3)[];
		binormals: (IVector3 | O3JS.Vector3)[];
	};

	clone(): this;
	copy(source: ICurve<T>): this;
	toJSON(): object;
	fromJSON(json: object): this;
}

export interface ILayers {
	new (): this;

	/**
	 * @default 1 | 0
	 */
	mask: number;

	set(channel: number): void;
	enable(channel: number): void;
	enableAll(): void;
	toggle(channel: number): void;
	disable(channel: number): void;
	disableAll(): void;
	test(layers: ILayers): boolean;
}

export interface IInterpolant {
	parameterPositions: any;
	sampleValues: any;
	valueSize: number;
	resultBuffer: any;

	evaluate(time: number): any;
}

export interface ILinearInterpolant extends IInterpolant {
	interpolate_(i1: number, t0: number, t: number, t1: number): any;
}

export interface IQuaternionLinearInterpolant extends IInterpolant {
	new (parameterPositions: any, samplesValues: any, sampleSize: number, resultBuffer?: any): this;

	interpolate_(i1: number, t0: number, t: number, t1: number): any;
}

export interface IDiscreteInterpolant extends IInterpolant {
	interpolate_(i1: number, t0: number, t: number, t1: number): any;
}

export interface ICubicInterpolant extends IInterpolant {
	interpolate_(i1: number, t0: number, t: number, t1: number): any;
}

export interface IKeyframeTrack {
	name: string;
	times: Float32Array;
	values: Float32Array;

	ValueTypeName: string;
	TimeBufferType: Float32Array;
	ValueBufferType: Float32Array;
	DefaultInterpolation: TInterpolationModes;

	InterpolantFactoryMethodDiscrete(result: any): IDiscreteInterpolant;
	InterpolantFactoryMethodLinear(result: any): ILinearInterpolant;
	InterpolantFactoryMethodSmooth(result: any): ICubicInterpolant;

	setInterpolation(interpolation: TInterpolationModes): IKeyframeTrack;
	getInterpolation(): TInterpolationModes;

	getValueSize(): number;

	shift(timeOffset: number): IKeyframeTrack;
	scale(timeScale: number): IKeyframeTrack;
	trim(startTime: number, endTime: number): IKeyframeTrack;
	validate(): boolean;
	optimize(): IKeyframeTrack;
	clone(): this;
}

export interface IBooleanKeyframeTrack extends IKeyframeTrack {
	new (name: string, times: any[], values: any[]): this;

	/**
	 * @default 'bool'
	 */
	ValueTypeName: string;
}

export interface IColorKeyframeTrack extends IKeyframeTrack {
	new (name: string, times: any[], values: any[], interpolation?: TInterpolationModes): this;

	/**
	 * @default 'color'
	 */
	ValueTypeName: string;
}

export interface INumberKeyframeTrack extends IKeyframeTrack {
	new (name: string, times: any[], values: any[], interpolation?: TInterpolationModes): this;

	/**
	 * @default 'number'
	 */
	ValueTypeName: string;
}

export interface IQuaternionKeyframeTrack extends IKeyframeTrack {
	new (name: string, times: any[], values: any[], interpolation?: TInterpolationModes): this;

	/**
	 * @default 'quaternion'
	 */
	ValueTypeName: string;
}

export interface IStringKeyframeTrack extends IKeyframeTrack {
	new (name: string, times: any[], values: any[], interpolation?: TInterpolationModes): this;

	/**
	 * @default 'string'
	 */
	ValueTypeName: string;
}

export interface IVectorKeyframeTrack extends IKeyframeTrack {
	new (name: string, times: any[], values: any[], interpolation?: TInterpolationModes): this;

	/**
	 * @default 'vector'
	 */
	ValueTypeName: string;
}

export interface IMorphTarget {
	name: string;
	vertices: (IVector3 | O3JS.Vector3)[];
}

export interface IAnimationClip {
	new (name?: string, duration?: number, tracks?: IKeyframeTrack[], blendMode?: TAnimationBlendMode): this;
	name: string;
	tracks: IKeyframeTrack[];

	/**
	 * @default THREE.NormalAnimationBlendMode
	 */
	blendMode: TAnimationBlendMode;

	/**
	 * @default -1
	 */
	duration: number;
	uuid: string;
	results: any[];

	resetDuration(): IAnimationClip;
	trim(): IAnimationClip;
	validate(): boolean;
	optimize(): IAnimationClip;
	clone(): this;
	toJSON(clip: IAnimationClip): any;

	CreateFromMorphTargetSequence(
		name: string,
		morphTargetSequence: IMorphTarget[],
		fps: number,
		noLoop: boolean
	): IAnimationClip;
	findByName(clipArray: IAnimationClip[], name: string): IAnimationClip;
	CreateClipsFromMorphTargetSequences(morphTargets: IMorphTarget[], fps: number, noLoop: boolean): IAnimationClip[];
	parse(json: any): IAnimationClip;
	parseAnimation(animation: any, bones: IBone[]): IAnimationClip;
}

export interface IAnimationAction {
	blendMode: TAnimationBlendMode;

	/**
	 * @default THREE.LoopRepeat
	 */
	loop: TAnimationActionLoopStyles;

	/**
	 * @default 0
	 */
	time: number;

	/**
	 * @default 1
	 */
	timeScale: number;

	/**
	 * @default 1
	 */
	weight: number;

	/**
	 * @default Infinity
	 */
	repetitions: number;

	/**
	 * @default false
	 */
	paused: boolean;

	/**
	 * @default true
	 */
	enabled: boolean;

	/**
	 * @default false
	 */
	clampWhenFinished: boolean;

	/**
	 * @default true
	 */
	zeroSlopeAtStart: boolean;

	/**
	 * @default true
	 */
	zeroSlopeAtEnd: boolean;

	play(): IAnimationAction;
	stop(): IAnimationAction;
	reset(): IAnimationAction;
	isRunning(): boolean;
	isScheduled(): boolean;
	startAt(time: number): IAnimationAction;
	setLoop(mode: TAnimationActionLoopStyles, repetitions: number): IAnimationAction;
	setEffectiveWeight(weight: number): IAnimationAction;
	getEffectiveWeight(): number;
	fadeIn(duration: number): IAnimationAction;
	fadeOut(duration: number): IAnimationAction;
	crossFadeFrom(fadeOutAction: IAnimationAction, duration: number, warp: boolean): IAnimationAction;
	crossFadeTo(fadeInAction: IAnimationAction, duration: number, warp: boolean): IAnimationAction;
	stopFading(): IAnimationAction;
	setEffectiveTimeScale(timeScale: number): IAnimationAction;
	getEffectiveTimeScale(): number;
	setDuration(duration: number): IAnimationAction;
	syncWith(action: IAnimationAction): IAnimationAction;
	halt(duration: number): IAnimationAction;
	warp(statTimeScale: number, endTimeScale: number, duration: number): IAnimationAction;
	stopWarping(): IAnimationAction;
	getMixer(): IAnimationMixer;
	getClip(): IAnimationClip;
	getRoot(): IObject3D;
}

export interface IAnimationMixer extends IEventDispatcher {
	new (root: IObject3D | IAnimationObjectGroup): this;
	/**
	 * @default 0
	 */
	time: number;

	/**
	 * @default 1.0
	 */
	timeScale: number;

	clipAction(
		clip: IAnimationClip,
		root?: IObject3D | IAnimationObjectGroup,
		blendMode?: TAnimationBlendMode
	): IAnimationAction;
	existingAction(clip: IAnimationClip, root?: IObject3D | IAnimationObjectGroup): IAnimationAction | null;
	stopAllAction(): IAnimationMixer;
	update(deltaTime: number): IAnimationMixer;
	setTime(timeInSeconds: number): IAnimationMixer;
	getRoot(): IObject3D | IAnimationObjectGroup;
	uncacheClip(clip: IAnimationClip): void;
	uncacheRoot(root: IObject3D | IAnimationObjectGroup): void;
	uncacheAction(clip: IAnimationClip, root?: IObject3D | IAnimationObjectGroup): void;
}

export interface IBaseEvent {
	type: string;
}

/**
 * Event object.
 */
export interface IEvent extends IBaseEvent {
	target?: any;
	[attachment: string]: any;
}
export type IEventListener<E, T, U> = (event: E & { type: T } & { target: U }) => void;

export interface IEventDispatcher<E = O3JS.Event> {
	/**
	 * Adds a listener to an event type.
	 * @param type The type of event to listen to.
	 * @param listener The function that gets called when the event is fired.
	 */
	addEventListener<T>(type: T, listener: IEventListener<E, T, this>): void;

	/**
	 * Checks if listener is added to an event type.
	 * @param type The type of event to listen to.
	 * @param listener The function that gets called when the event is fired.
	 */
	hasEventListener<T>(type: T, listener: IEventListener<E, T, this>): boolean;

	/**
	 * Removes a listener from an event type.
	 * @param type The type of the listener that gets removed.
	 * @param listener The listener function that gets removed.
	 */
	removeEventListener<T>(type: T, listener: IEventListener<E, T, this>): void;

	/**
	 * Fire an event type.
	 * @param type The type of event that gets fired.
	 */
	dispatchEvent(event: E): void;
}

export interface IUniform<TValue = any> {
	value: TValue;
}

export interface IShader {
	uniforms: { [uniform: string]: IUniform };
	vertexShader: string;
	fragmentShader: string;
}

export interface IMaterialParameters {
	alphaTest?: number | undefined;
	alphaToCoverage?: boolean | undefined;
	blendDst?: TBlendingDstFactor | undefined;
	blendDstAlpha?: number | undefined;
	blendEquation?: TBlendingEquation | undefined;
	blendEquationAlpha?: number | undefined;
	blending?: TBlending | undefined;
	blendSrc?: TBlendingSrcFactor | TBlendingDstFactor | undefined;
	blendSrcAlpha?: number | undefined;
	clipIntersection?: boolean | undefined;
	clippingPlanes?: IPlane[] | undefined;
	clipShadows?: boolean | undefined;
	colorWrite?: boolean | undefined;
	defines?: any;
	depthFunc?: TDepthModes | undefined;
	depthTest?: boolean | undefined;
	depthWrite?: boolean | undefined;
	fog?: boolean | undefined;
	name?: string | undefined;
	opacity?: number | undefined;
	polygonOffset?: boolean | undefined;
	polygonOffsetFactor?: number | undefined;
	polygonOffsetUnits?: number | undefined;
	precision?: 'highp' | 'mediump' | 'lowp' | null | undefined;
	premultipliedAlpha?: boolean | undefined;
	dithering?: boolean | undefined;
	side?: TSide | undefined;
	shadowSide?: TSide | undefined;
	toneMapped?: boolean | undefined;
	transparent?: boolean | undefined;
	vertexColors?: boolean | undefined;
	visible?: boolean | undefined;
	format?: TPixelFormat | undefined;
	stencilWrite?: boolean | undefined;
	stencilFunc?: TStencilFunc | undefined;
	stencilRef?: number | undefined;
	stencilWriteMask?: number | undefined;
	stencilFuncMask?: number | undefined;
	stencilFail?: TStencilOp | undefined;
	stencilZFail?: TStencilOp | undefined;
	stencilZPass?: TStencilOp | undefined;
	userData?: any;
}

/**
 * Materials describe the appearance of objects. They are defined in a (mostly) renderer-independent way, so you don't have to rewrite materials if you decide to use a different renderer.
 */
export interface IMaterial extends IEventDispatcher {
	new (parameters?: IMaterialParameters): this;

	/**
	 * Sets the alpha value to be used when running an alpha test. Default is 0.
	 * @default 0
	 */
	alphaTest: number;

	/**
	 * Enables alpha to coverage. Can only be used with MSAA-enabled rendering contexts.
	 * @default false
	 */
	alphaToCoverage: boolean;

	/**
	 * Blending destination. It's one of the blending mode constants defined in Three.js. Default is {@link OneMinusSrcAlphaFactor}.
	 * @default THREE.OneMinusSrcAlphaFactor
	 */
	blendDst: TBlendingDstFactor;

	/**
	 * The tranparency of the .blendDst. Default is null.
	 * @default null
	 */
	blendDstAlpha: number | null;

	/**
	 * Blending equation to use when applying blending. It's one of the constants defined in Three.js. Default is {@link AddEquation}.
	 * @default THREE.AddEquation
	 */
	blendEquation: TBlendingEquation;

	/**
	 * The tranparency of the .blendEquation. Default is null.
	 * @default null
	 */
	blendEquationAlpha: number | null;

	/**
	 * Which blending to use when displaying objects with this material. Default is {@link NormalBlending}.
	 * @default THREE.NormalBlending
	 */
	blending: TBlending;

	/**
	 * Blending source. It's one of the blending mode constants defined in Three.js. Default is {@link SrcAlphaFactor}.
	 * @default THREE.SrcAlphaFactor
	 */
	blendSrc: TBlendingSrcFactor | TBlendingDstFactor;

	/**
	 * The tranparency of the .blendSrc. Default is null.
	 * @default null
	 */
	blendSrcAlpha: number | null;

	/**
	 * Changes the behavior of clipping planes so that only their intersection is clipped, rather than their union. Default is false.
	 * @default false
	 */
	clipIntersection: boolean;

	/**
	 * User-defined clipping planes specified as IPlane objects in world space.
	 * These planes apply to the objects this material is attached to.
	 * Points in space whose signed distance to the plane is negative are clipped (not rendered).
	 * See the WebGL / clipping /intersection example. Default is null.
	 * @default null
	 */
	clippingPlanes: any;

	/**
	 * Defines whether to clip shadows according to the clipping planes specified on this material. Default is false.
	 * @default false
	 */
	clipShadows: boolean;

	/**
	 * Whether to render the material's color. This can be used in conjunction with a mesh's .renderOrder property to create invisible objects that occlude other objects. Default is true.
	 * @default true
	 */
	colorWrite: boolean;

	/**
	 * Custom defines to be injected into the shader. These are passed in form of an object literal, with key/value pairs. { MY_CUSTOM_DEFINE: '' , PI2: Math.PI * 2 }.
	 * The pairs are defined in both vertex and fragment shaders. Default is undefined.
	 * @default undefined
	 */
	defines: undefined | { [key: string]: any };

	/**
	 * Which depth function to use. Default is {@link LessEqualDepth}. See the depth mode constants for all possible values.
	 * @default THREE.LessEqualDepth
	 */
	depthFunc: TDepthModes;

	/**
	 * Whether to have depth test enabled when rendering this material. Default is true.
	 * @default true
	 */
	depthTest: boolean;

	/**
	 * Whether rendering this material has any effect on the depth buffer. Default is true.
	 * When drawing 2D overlays it can be useful to disable the depth writing in order to layer several things together without creating z-index artifacts.
	 * @default true
	 */
	depthWrite: boolean;

	/**
	 * Whether the material is affected by fog. Default is true.
	 * @default fog
	 */
	fog: boolean;

	/**
	 * When this property is set to O3JS.RGBFormat, the material is considered to be opaque and alpha values are ignored.
	 * @default THREE.RGBAFormat
	 */
	format: TPixelFormat;

	/**
	 * Unique number of this material instance.
	 */
	id: number;

	/**
	 * Whether rendering this material has any effect on the stencil buffer. Default is *false*.
	 * @default false
	 */
	stencilWrite: boolean;

	/**
	 * The stencil comparison function to use. Default is {@link AlwaysStencilFunc}. See stencil operation constants for all possible values.
	 * @default THREE.AlwaysStencilFunc
	 */
	stencilFunc: TStencilFunc;

	/**
	 * The value to use when performing stencil comparisons or stencil operations. Default is *0*.
	 * @default 0
	 */
	stencilRef: number;

	/**
	 * The bit mask to use when writing to the stencil buffer. Default is *0xFF*.
	 * @default 0xff
	 */
	stencilWriteMask: number;

	/**
	 * The bit mask to use when comparing against the stencil buffer. Default is *0xFF*.
	 * @default 0xff
	 */
	stencilFuncMask: number;

	/**
	 * Which stencil operation to perform when the comparison function returns false. Default is {@link KeepStencilOp}. See the stencil operation constants for all possible values.
	 * @default THREE.KeepStencilOp
	 */
	stencilFail: TStencilOp;

	/**
	 * Which stencil operation to perform when the comparison function returns true but the depth test fails.
	 * Default is {@link KeepStencilOp}.
	 * See the stencil operation constants for all possible values.
	 * @default THREE.KeepStencilOp
	 */
	stencilZFail: TStencilOp;

	/**
	 * Which stencil operation to perform when the comparison function returns true and the depth test passes.
	 * Default is {@link KeepStencilOp}.
	 * See the stencil operation constants for all possible values.
	 * @default THREE.KeepStencilOp
	 */
	stencilZPass: TStencilOp;

	/**
	 * Used to check whether this or derived classes are materials. Default is true.
	 * You should not change this, as it used internally for optimisation.
	 */
	readonly isMaterial: true;

	/**
	 * Material name. Default is an empty string.
	 * @default ''
	 */
	name: string;

	/**
	 * Specifies that the material needs to be updated, WebGL wise. Set it to true if you made changes that need to be reflected in WebGL.
	 * This property is automatically set to true when instancing a new material.
	 * @default false
	 */
	needsUpdate: boolean;

	/**
	 * Opacity. Default is 1.
	 * @default 1
	 */
	opacity: number;

	/**
	 * Whether to use polygon offset. Default is false. This corresponds to the POLYGON_OFFSET_FILL WebGL feature.
	 * @default false
	 */
	polygonOffset: boolean;

	/**
	 * Sets the polygon offset factor. Default is 0.
	 * @default 0
	 */
	polygonOffsetFactor: number;

	/**
	 * Sets the polygon offset units. Default is 0.
	 * @default 0
	 */
	polygonOffsetUnits: number;

	/**
	 * Override the renderer's default precision for this material. Can be "highp", "mediump" or "lowp". Defaults is null.
	 * @default null
	 */
	precision: 'highp' | 'mediump' | 'lowp' | null;

	/**
	 * Whether to premultiply the alpha (transparency) value. See WebGL / Materials / Transparency for an example of the difference. Default is false.
	 * @default false
	 */
	premultipliedAlpha: boolean;

	/**
	 * Whether to apply dithering to the color to remove the appearance of banding. Default is false.
	 * @default false
	 */
	dithering: boolean;

	/**
	 * Defines which of the face sides will be rendered - front, back or both.
	 * Default is O3JS.FrontSide. Other options are O3JS.BackSide and O3JS.DoubleSide.
	 * @default THREE.FrontSide
	 */
	side: TSide;

	/**
	 * Defines which of the face sides will cast shadows. Default is *null*.
	 * If *null*, the value is opposite that of side, above.
	 * @default null
	 */
	shadowSide: TSide | null;

	/**
	 * Defines whether this material is tone mapped according to the renderer's toneMapping setting.
	 * Default is true.
	 * @default true
	 */
	toneMapped: boolean;

	/**
	 * Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects.
	 * When set to true, the extent to which the material is transparent is controlled by setting it's .opacity property.
	 * Default is false.
	 * @default false
	 */
	transparent: boolean;

	/**
	 * Value is the string 'Material'. This shouldn't be changed, and can be used to find all objects of this type in a scene.
	 * @default 'Material'
	 */
	type: string;

	/**
	 * UUID of this material instance. This gets automatically assigned, so this shouldn't be edited.
	 */
	uuid: string;

	/**
	 * Defines whether vertex coloring is used. Default is false.
	 * @default false
	 */
	vertexColors: boolean;

	/**
	 * Defines whether this material is visible. Default is true.
	 * @default true
	 */
	visible: boolean;

	/**
	 * An object that can be used to store custom data about the Material. It should not hold references to functions as these will not be cloned.
	 * @default {}
	 */
	userData: any;

	/**
	 * This starts at 0 and counts how many times .needsUpdate is set to true.
	 * @default 0
	 */
	version: number;

	/**
	 * Return a new material with the same parameters as this material.
	 */
	clone(): this;

	/**
	 * Copy the parameters from the passed material into this material.
	 * @param material
	 */
	copy(material: IMaterial): this;

	/**
	 * This disposes the material. Textures of a material don't get disposed. These needs to be disposed by {@line THREE.Texture}.
	 */
	dispose(): void;

	/**
	 * An optional callback that is executed immediately before the shader program is compiled.
	 * This function is called with the shader source code as a parameter.
	 * Useful for the modification of built-in materials.
	 * @param shader Source code of the shader
	 * @param renderer WebGLRenderer Context that is initializing the material
	 */
	onBeforeCompile(shader: IShader, renderer: IWebGLRenderer): void;

	/**
	 * In case onBeforeCompile is used, this callback can be used to identify values of settings used in onBeforeCompile, so three.js can reuse a cached shader or recompile the shader as needed.
	 */
	customProgramCacheKey(): string;

	/**
	 * Sets the properties based on the values.
	 * @param values A container with parameters.
	 */
	setValues(values: IMaterialParameters): void;

	/**
	 * Convert the material to three.js JSON format.
	 * @param meta Object containing metadata such as textures or images for the material.
	 */
	toJSON(meta?: any): any;
}

export interface ISpriteMaterialParameters extends IMaterialParameters {
	color?: TColorRepresentation | undefined;
	map?: ITexture | null | undefined;
	alphaMap?: ITexture | null | undefined;
	rotation?: number | undefined;
	sizeAttenuation?: boolean | undefined;
}

export interface ISpriteMaterial extends IMaterial {
	new (parameters?: ISpriteMaterialParameters): this;

	/**
	 * @default 'SpriteMaterial'
	 */
	type: string;

	/**
	 * @default new THREE.Color( 0xffffff )
	 */
	color: IColor;

	/**
	 * @default null
	 */
	map: ITexture | null;

	/**
	 * @default null
	 */
	alphaMap: ITexture | null;

	/**
	 * @default 0
	 */
	rotation: number;

	/**
	 * @default true
	 */
	sizeAttenuation: boolean;

	/**
	 * @default true
	 */
	transparent: boolean;

	readonly isSpriteMaterial: true;

	setValues(parameters: ISpriteMaterialParameters): void;
	copy(source: ISpriteMaterial): this;
}

export interface ILineBasicMaterialParameters extends IMaterialParameters {
	color?: TColorRepresentation | undefined;
	linewidth?: number | undefined;
	linecap?: string | undefined;
	linejoin?: string | undefined;
}

export interface ILineBasicMaterial extends IMaterial {
	new (parameters?: ILineBasicMaterialParameters): this;

	/**
	 * @default 'LineBasicMaterial'
	 */
	type: string;

	/**
	 * @default 0xffffff
	 */
	color: IColor;

	/**
	 * @default 1
	 */
	linewidth: number;

	/**
	 * @default 'round'
	 */
	linecap: string;

	/**
	 * @default 'round'
	 */
	linejoin: string;

	setValues(parameters: ILineBasicMaterialParameters): void;
}

export interface ILineDashedMaterialParameters extends ILineBasicMaterialParameters {
	scale?: number | undefined;
	dashSize?: number | undefined;
	gapSize?: number | undefined;
}

export interface ILineDashedMaterial extends ILineBasicMaterial {
	new (parameters?: ILineDashedMaterialParameters): this;

	/**
	 * @default 'LineDashedMaterial'
	 */
	type: string;

	/**
	 * @default 1
	 */
	scale: number;

	/**
	 * @default 1
	 */
	dashSize: number;

	/**
	 * @default 1
	 */
	gapSize: number;

	readonly isLineDashedMaterial: true;

	setValues(parameters: ILineDashedMaterialParameters): void;
}

export interface IMeshBasicMaterialParameters extends IMaterialParameters {
	color?: TColorRepresentation | undefined;
	opacity?: number | undefined;
	map?: ITexture | null | undefined;
	lightMap?: ITexture | null;
	lightMapIntensity?: number | undefined;
	aoMap?: ITexture | null | undefined;
	aoMapIntensity?: number | undefined;
	specularMap?: ITexture | null | undefined;
	alphaMap?: ITexture | null | undefined;
	envMap?: ITexture | null | undefined;
	combine?: TCombine | undefined;
	reflectivity?: number | undefined;
	refractionRatio?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;
	wireframeLinecap?: string | undefined;
	wireframeLinejoin?: string | undefined;
}

export interface IMeshBasicMaterial extends IMaterial {
	new (parameters?: IMeshBasicMaterialParameters): this;

	/**
	 * @default 'MeshBasicMaterial'
	 */
	type: string;

	/**
	 * @default new THREE.Color( 0xffffff )
	 */
	color: IColor;

	/**
	 * @default null
	 */
	map: ITexture | null;

	/**
	 * @default null
	 */
	lightMap: ITexture | null;

	/**
	 * @default 1
	 */
	lightMapIntensity: number;

	/**
	 * @default null
	 */
	aoMap: ITexture | null;

	/**
	 * @default 1
	 */
	aoMapIntensity: number;

	/**
	 * @default null
	 */
	specularMap: ITexture | null;

	/**
	 * @default null
	 */
	alphaMap: ITexture | null;

	/**
	 * @default null
	 */
	envMap: ITexture | null;

	/**
	 * @default THREE.MultiplyOperation
	 */
	combine: TCombine;

	/**
	 * @default 1
	 */
	reflectivity: number;

	/**
	 * @default 0.98
	 */
	refractionRatio: number;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * @default 'round'
	 */
	wireframeLinecap: string;

	/**
	 * @default 'round'
	 */
	wireframeLinejoin: string;

	setValues(parameters: IMeshBasicMaterialParameters): void;
}

export interface IMeshDepthMaterialParameters extends IMaterialParameters {
	map?: ITexture | null | undefined;
	alphaMap?: ITexture | null | undefined;
	depthPacking?: TDepthPackingStrategies | undefined;
	displacementMap?: ITexture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;
}

export interface IMeshDepthMaterial extends IMaterial {
	new (parameters?: IMeshDepthMaterialParameters): this;

	/**
	 * @default 'MeshDepthMaterial'
	 */
	type: string;

	/**
	 * @default null
	 */
	map: ITexture | null;

	/**
	 * @default null
	 */
	alphaMap: ITexture | null;

	/**
	 * @default THREE.BasicDepthPacking
	 */
	depthPacking: TDepthPackingStrategies;

	/**
	 * @default null
	 */
	displacementMap: ITexture | null;

	/**
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * @default false
	 */
	fog: boolean;

	setValues(parameters: IMeshDepthMaterialParameters): void;
}

export interface IMeshDistanceMaterialParameters extends IMaterialParameters {
	map?: ITexture | null | undefined;
	alphaMap?: ITexture | null | undefined;
	displacementMap?: ITexture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	farDistance?: number | undefined;
	nearDistance?: number | undefined;
	referencePosition?: IVector3 | O3JS.Vector3 | undefined;
}

export interface IMeshDistanceMaterial extends IMaterial {
	new (parameters?: IMeshDistanceMaterialParameters): this;

	/**
	 * @default 'MeshDistanceMaterial'
	 */
	type: string;

	/**
	 * @default null
	 */
	map: ITexture | null;

	/**
	 * @default null
	 */
	alphaMap: ITexture | null;

	/**
	 * @default null
	 */
	displacementMap: ITexture | null;

	/**
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * @default 1000
	 */
	farDistance: number;

	/**
	 * @default 1
	 */
	nearDistance: number;

	/**
	 * @default new THREE.Vector3()
	 */
	referencePosition: IVector3 | O3JS.Vector3;

	/**
	 * @default false
	 */
	fog: boolean;

	setValues(parameters: IMeshDistanceMaterialParameters): void;
}

export interface IMeshLambertMaterialParameters extends IMaterialParameters {
	color?: TColorRepresentation | undefined;
	emissive?: TColorRepresentation | undefined;
	emissiveIntensity?: number | undefined;
	emissiveMap?: ITexture | null | undefined;
	map?: ITexture | null | undefined;
	lightMap?: ITexture | null | undefined;
	lightMapIntensity?: number | undefined;
	aoMap?: ITexture | null | undefined;
	aoMapIntensity?: number | undefined;
	specularMap?: ITexture | null | undefined;
	alphaMap?: ITexture | null | undefined;
	envMap?: ITexture | null | undefined;
	combine?: TCombine | undefined;
	reflectivity?: number | undefined;
	refractionRatio?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;
	wireframeLinecap?: string | undefined;
	wireframeLinejoin?: string | undefined;
}

export interface IMeshLambertMaterial extends IMaterial {
	new (parameters?: IMeshLambertMaterialParameters): this;

	/**
	 * @default 'MeshLambertMaterial'
	 */
	type: string;

	/**
	 * @default new THREE.Color( 0xffffff )
	 */
	color: IColor;

	/**
	 * @default new THREE.Color( 0x000000 )
	 */
	emissive: IColor;

	/**
	 * @default 1
	 */
	emissiveIntensity: number;

	/**
	 * @default null
	 */
	emissiveMap: ITexture | null;

	/**
	 * @default null
	 */
	map: ITexture | null;

	/**
	 * @default null
	 */
	lightMap: ITexture | null;

	/**
	 * @default 1
	 */
	lightMapIntensity: number;

	/**
	 * @default null
	 */
	aoMap: ITexture | null;

	/**
	 * @default 1
	 */
	aoMapIntensity: number;

	/**
	 * @default null
	 */
	specularMap: ITexture | null;

	/**
	 * @default null
	 */
	alphaMap: ITexture | null;

	/**
	 * @default null
	 */
	envMap: ITexture | null;

	/**
	 * @default THREE.MultiplyOperation
	 */
	combine: TCombine;

	/**
	 * @default 1
	 */
	reflectivity: number;

	/**
	 * @default 0.98
	 */
	refractionRatio: number;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * @default 'round'
	 */
	wireframeLinecap: string;

	/**
	 * @default 'round'
	 */
	wireframeLinejoin: string;

	setValues(parameters: IMeshLambertMaterialParameters): void;
}

export interface IMeshMatcapMaterialParameters extends IMaterialParameters {
	color?: TColorRepresentation | undefined;
	matcap?: ITexture | null | undefined;
	map?: ITexture | null | undefined;
	bumpMap?: ITexture | null | undefined;
	bumpScale?: number | undefined;
	normalMap?: ITexture | null | undefined;
	normalMapType?: TNormalMapTypes | undefined;
	normalScale?: IVector2 | O3JS.Vector2 | undefined;
	displacementMap?: ITexture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	alphaMap?: ITexture | null | undefined;
	flatShading?: boolean | undefined;
}

export interface IMeshMatcapMaterial extends IMaterial {
	new (parameters?: IMeshMatcapMaterialParameters): this;

	/**
	 * @default 'MeshMatcapMaterial'
	 */
	type: string;

	/**
	 * @default { 'MATCAP': '' }
	 */
	defines: { [key: string]: any };

	/**
	 * @default new THREE.Color( 0xffffff )
	 */
	color: IColor;

	/**
	 * @default null
	 */
	matcap: ITexture | null;

	/**
	 * @default null
	 */
	map: ITexture | null;

	/**
	 * @default null
	 */
	bumpMap: ITexture | null;

	/**
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * @default null
	 */
	normalMap: ITexture | null;

	/**
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: TNormalMapTypes;

	/**
	 * @default new Vector2( 1, 1 )
	 */
	normalScale: IVector2 | O3JS.Vector2;

	/**
	 * @default null
	 */
	displacementMap: ITexture | null;

	/**
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * @default null
	 */
	alphaMap: ITexture | null;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 * @default false
	 */
	flatShading: boolean;

	setValues(parameters: IMeshMatcapMaterialParameters): void;
}

export interface IMeshNormalMaterialParameters extends IMaterialParameters {
	bumpMap?: ITexture | null | undefined;
	bumpScale?: number | undefined;
	normalMap?: ITexture | null | undefined;
	normalMapType?: TNormalMapTypes | undefined;
	normalScale?: IVector2 | O3JS.Vector2 | undefined;
	displacementMap?: ITexture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;
	flatShading?: boolean | undefined;
}

export interface IMeshNormalMaterial extends IMaterial {
	new (parameters?: IMeshNormalMaterialParameters): this;

	/**
	 * @default 'MeshNormalMaterial'
	 */
	type: string;

	/**
	 * @default null
	 */
	bumpMap: ITexture | null;

	/**
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * @default null
	 */
	normalMap: ITexture | null;

	/**
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: TNormalMapTypes;

	/**
	 * @default new THREE.Vector2( 1, 1 )
	 */
	normalScale: IVector2 | O3JS.Vector2;

	/**
	 * @default null
	 */
	displacementMap: ITexture | null;

	/**
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 * @default false
	 */
	flatShading: boolean;

	setValues(parameters: IMeshNormalMaterialParameters): void;
}

export interface IMeshPhongMaterialParameters extends IMaterialParameters {
	/** geometry color in hexadecimal. Default is 0xffffff. */
	color?: TColorRepresentation | undefined;
	specular?: TColorRepresentation | undefined;
	shininess?: number | undefined;
	opacity?: number | undefined;
	map?: ITexture | null | undefined;
	lightMap?: ITexture | null | undefined;
	lightMapIntensity?: number | undefined;
	aoMap?: ITexture | null | undefined;
	aoMapIntensity?: number | undefined;
	emissive?: TColorRepresentation | undefined;
	emissiveIntensity?: number | undefined;
	emissiveMap?: ITexture | null | undefined;
	bumpMap?: ITexture | null | undefined;
	bumpScale?: number | undefined;
	normalMap?: ITexture | null | undefined;
	normalMapType?: TNormalMapTypes | undefined;
	normalScale?: IVector2 | O3JS.Vector2 | undefined;
	displacementMap?: ITexture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	specularMap?: ITexture | null | undefined;
	alphaMap?: ITexture | null | undefined;
	envMap?: ITexture | null | undefined;
	combine?: TCombine | undefined;
	reflectivity?: number | undefined;
	refractionRatio?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;
	wireframeLinecap?: string | undefined;
	wireframeLinejoin?: string | undefined;
	flatShading?: boolean | undefined;
}

export interface IMeshPhongMaterial extends IMaterial {
	new (parameters?: IMeshPhongMaterialParameters): this;

	/**
	 * @default 'MeshNormalMaterial'
	 */
	type: string;

	/**
	 * @default new THREE.Color( 0xffffff )
	 */
	color: IColor;

	/**
	 * @default new THREE.Color( 0x111111 )
	 */
	specular: IColor;

	/**
	 * @default 30
	 */
	shininess: number;

	/**
	 * @default null
	 */
	map: ITexture | null;

	/**
	 * @default null
	 */
	lightMap: ITexture | null;

	/**
	 * @default null
	 */
	lightMapIntensity: number;

	/**
	 * @default null
	 */
	aoMap: ITexture | null;

	/**
	 * @default null
	 */
	aoMapIntensity: number;

	/**
	 * @default new THREE.Color( 0x000000 )
	 */
	emissive: IColor;

	/**
	 * @default 1
	 */
	emissiveIntensity: number;

	/**
	 * @default null
	 */
	emissiveMap: ITexture | null;

	/**
	 * @default null
	 */
	bumpMap: ITexture | null;

	/**
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * @default null
	 */
	normalMap: ITexture | null;

	/**
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: TNormalMapTypes;

	/**
	 * @default new Vector2( 1, 1 )
	 */
	normalScale: IVector2 | O3JS.Vector2;

	/**
	 * @default null
	 */
	displacementMap: ITexture | null;

	/**
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * @default null
	 */
	specularMap: ITexture | null;

	/**
	 * @default null
	 */
	alphaMap: ITexture | null;

	/**
	 * @default null
	 */
	envMap: ITexture | null;

	/**
	 * @default THREE.MultiplyOperation
	 */
	combine: TCombine;

	/**
	 * @default 1
	 */
	reflectivity: number;

	/**
	 * @default 0.98
	 */
	refractionRatio: number;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * @default 'round'
	 */
	wireframeLinecap: string;

	/**
	 * @default 'round'
	 */
	wireframeLinejoin: string;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 * @default false
	 */
	flatShading: boolean;

	/**
	 * @deprecated Use {@link MeshStandardMaterial O3JS.MeshStandardMaterial} instead.
	 */
	metal: boolean;

	setValues(parameters: IMeshPhongMaterialParameters): void;
}

export interface IMeshStandardMaterialParameters extends IMaterialParameters {
	color?: TColorRepresentation | undefined;
	roughness?: number | undefined;
	metalness?: number | undefined;
	map?: ITexture | null | undefined;
	lightMap?: ITexture | null | undefined;
	lightMapIntensity?: number | undefined;
	aoMap?: ITexture | null | undefined;
	aoMapIntensity?: number | undefined;
	emissive?: TColorRepresentation | undefined;
	emissiveIntensity?: number | undefined;
	emissiveMap?: ITexture | null | undefined;
	bumpMap?: ITexture | null | undefined;
	bumpScale?: number | undefined;
	normalMap?: ITexture | null | undefined;
	normalMapType?: TNormalMapTypes | undefined;
	normalScale?: IVector2 | O3JS.Vector2 | undefined;
	displacementMap?: ITexture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	roughnessMap?: ITexture | null | undefined;
	metalnessMap?: ITexture | null | undefined;
	alphaMap?: ITexture | null | undefined;
	envMap?: ITexture | null | undefined;
	envMapIntensity?: number | undefined;
	refractionRatio?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;

	flatShading?: boolean | undefined;
}

export interface IMeshStandardMaterialParameters extends IMaterialParameters {
	color?: TColorRepresentation | undefined;
	roughness?: number | undefined;
	metalness?: number | undefined;
	map?: ITexture | null | undefined;
	lightMap?: ITexture | null | undefined;
	lightMapIntensity?: number | undefined;
	aoMap?: ITexture | null | undefined;
	aoMapIntensity?: number | undefined;
	emissive?: TColorRepresentation | undefined;
	emissiveIntensity?: number | undefined;
	emissiveMap?: ITexture | null | undefined;
	bumpMap?: ITexture | null | undefined;
	bumpScale?: number | undefined;
	normalMap?: ITexture | null | undefined;
	normalMapType?: TNormalMapTypes | undefined;
	normalScale?: IVector2 | O3JS.Vector2 | undefined;
	displacementMap?: ITexture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	roughnessMap?: ITexture | null | undefined;
	metalnessMap?: ITexture | null | undefined;
	alphaMap?: ITexture | null | undefined;
	envMap?: ITexture | null | undefined;
	envMapIntensity?: number | undefined;
	refractionRatio?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;

	flatShading?: boolean | undefined;
}

export interface IMeshStandardMaterial extends IMaterial {
	new (parameters?: IMeshStandardMaterialParameters): this;
	/**
	 * @default 'MeshStandardMaterial'
	 */
	type: string;

	/**
	 * @default { 'STANDARD': '' }
	 */
	defines: { [key: string]: any };

	/**
	 * @default new THREE.Color( 0xffffff )
	 */
	color: IColor;

	/**
	 * @default 1
	 */
	roughness: number;

	/**
	 * @default 0
	 */
	metalness: number;

	/**
	 * @default null
	 */
	map: ITexture | null;

	/**
	 * @default null
	 */
	lightMap: ITexture | null;

	/**
	 * @default 1
	 */
	lightMapIntensity: number;

	/**
	 * @default null
	 */
	aoMap: ITexture | null;

	/**
	 * @default 1
	 */
	aoMapIntensity: number;

	/**
	 * @default new THREE.Color( 0x000000 )
	 */
	emissive: IColor;

	/**
	 * @default 1
	 */
	emissiveIntensity: number;

	/**
	 * @default null
	 */
	emissiveMap: ITexture | null;

	/**
	 * @default null
	 */
	bumpMap: ITexture | null;

	/**
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * @default null
	 */
	normalMap: ITexture | null;

	/**
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: TNormalMapTypes;

	/**
	 * @default new THREE.Vector2( 1, 1 )
	 */
	normalScale: IVector2 | O3JS.Vector2;

	/**
	 * @default null
	 */
	displacementMap: ITexture | null;

	/**
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * @default null
	 */
	roughnessMap: ITexture | null;

	/**
	 * @default null
	 */
	metalnessMap: ITexture | null;

	/**
	 * @default null
	 */
	alphaMap: ITexture | null;

	/**
	 * @default null
	 */
	envMap: ITexture | null;

	/**
	 * @default 1
	 */
	envMapIntensity: number;

	/**
	 * @default 0.98
	 */
	refractionRatio: number;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * @default 'round'
	 */
	wireframeLinecap: string;

	/**
	 * @default 'round'
	 */
	wireframeLinejoin: string;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 * @default false
	 */
	flatShading: boolean;

	isMeshStandardMaterial: boolean;

	setValues(parameters: IMeshStandardMaterialParameters): void;
}

export interface ILineMaterialParameters extends IMaterialParameters {
    alphaToCoverage?: boolean | undefined;
    color?: number | undefined;
    dashed?: boolean | undefined;
    dashScale?: number | undefined;
    dashSize?: number | undefined;
    dashOffset?: number | undefined;
    gapSize?: number | undefined;
    linewidth?: number | undefined;
    resolution?: IVector2 | undefined;
    wireframe?: boolean | undefined;
    worldUnits?: boolean | undefined;
}

export interface ILineMaterial extends IShaderMaterial {
    new(parameters?: ILineMaterialParameters) : this;
    color: IColor;
    dashed: boolean;
    dashScale: number;
    dashSize: number;
    dashOffset: number;
    gapSize: number;
    opacity: number;
    readonly isLineMaterial: true;
    linewidth: number;
    resolution: IVector2;
    alphaToCoverage: boolean;
    worldUnits: boolean;
}

export interface IMeshPhysicalMaterialParameters extends IMeshStandardMaterialParameters {
	clearcoat?: number | undefined;
	clearcoatMap?: ITexture | null | undefined;
	clearcoatRoughness?: number | undefined;
	clearcoatRoughnessMap?: ITexture | null | undefined;
	clearcoatNormalScale?: IVector2 | O3JS.Vector2 | undefined;
	clearcoatNormalMap?: ITexture | null | undefined;

	reflectivity?: number | undefined;
	ior?: number | undefined;

	sheen?: number | undefined;
	sheenColor?: IColor | undefined;
	sheenRoughness?: number | undefined;

	transmission?: number | undefined;
	transmissionMap?: ITexture | null | undefined;
	attenuationDistance?: number | undefined;
	attenuationColor?: IColor | undefined;

	specularIntensity?: number | undefined;
	specularColor?: IColor | undefined;
	specularIntensityMap?: ITexture | null | undefined;
	specularColorMap?: ITexture | null | undefined;
}

export interface IMeshPhysicalMaterial extends IMeshStandardMaterial {
	new (parameters?: IMeshPhysicalMaterialParameters): this;

	/**
	 * @default 'MeshPhysicalMaterial'
	 */
	type: string;

	/**
	 * @default { 'STANDARD': '', 'PHYSICAL': '' }
	 */
	defines: { [key: string]: any };

	/**
	 * @default 0
	 */
	clearcoat: number;

	/**
	 * @default null
	 */
	clearcoatMap: ITexture | null;

	/**
	 * @default 0
	 */
	clearcoatRoughness: number;

	/**
	 * @default null
	 */
	clearcoatRoughnessMap: ITexture | null;

	/**
	 * @default new THREE.Vector2( 1, 1 )
	 */
	clearcoatNormalScale: IVector2 | O3JS.Vector2;

	/**
	 * @default null
	 */
	clearcoatNormalMap: ITexture | null;

	/**
	 * @default 0.5
	 */
	reflectivity: number;

	/**
	 * @default 1.5
	 */
	ior: number;

	/**
	 * @default 0.0
	 */
	sheen: number;

	/**
	 * @default Color( 0x000000 )
	 */
	sheenColor: IColor;

	/**
	 * @default null
	 */
	sheenColorMap: ITexture | null;

	/**
	 * @default 1.0
	 */
	sheenRoughness: number;

	/**
	 * @default null
	 */
	sheenRoughnessMap: ITexture | null;

	/**
	 * @default 0
	 */
	transmission: number;

	/**
	 * @default null
	 */
	transmissionMap: ITexture | null;

	/**
	 * @default 0.01
	 */
	thickness: number;

	/**
	 * @default null
	 */
	thicknessMap: ITexture | null;

	/**
	 * @default 0.0
	 */
	attenuationDistance: number;

	/**
	 * @default Color( 1, 1, 1 )
	 */
	attenuationColor: IColor;

	/**
	 * @default 1.0
	 */
	specularIntensity: number;

	/**
	 * @default Color(1, 1, 1)
	 */
	specularColor: IColor;

	/**
	 * @default null
	 */
	specularIntensityMap: ITexture | null;

	/**
	 * @default null
	 */
	specularColorMap: ITexture | null;
}

export interface IMeshToonMaterialParameters extends IMaterialParameters {
	/** geometry color in hexadecimal. Default is 0xffffff. */
	color?: TColorRepresentation | undefined;
	opacity?: number | undefined;
	gradientMap?: ITexture | null | undefined;
	map?: ITexture | null | undefined;
	lightMap?: ITexture | null | undefined;
	lightMapIntensity?: number | undefined;
	aoMap?: ITexture | null | undefined;
	aoMapIntensity?: number | undefined;
	emissive?: TColorRepresentation | undefined;
	emissiveIntensity?: number | undefined;
	emissiveMap?: ITexture | null | undefined;
	bumpMap?: ITexture | null | undefined;
	bumpScale?: number | undefined;
	normalMap?: ITexture | null | undefined;
	normalMapType?: TNormalMapTypes | undefined;
	normalScale?: IVector2 | O3JS.Vector2 | undefined;
	displacementMap?: ITexture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	alphaMap?: ITexture | null | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;
	wireframeLinecap?: string | undefined;
	wireframeLinejoin?: string | undefined;
}

export interface IMeshToonMaterial extends IMaterial {
	new (parameters?: IMeshToonMaterialParameters): this;

	/**
	 * @default 'MeshToonMaterial'
	 */
	type: string;

	/**
	 * @default { 'TOON': '' }
	 */
	defines: { [key: string]: any };

	/**
	 * @default new THREE.Color( 0xffffff )
	 */
	color: IColor;

	/**
	 * @default null
	 */
	gradientMap: ITexture | null;

	/**
	 * @default null
	 */
	map: ITexture | null;

	/**
	 * @default null
	 */
	lightMap: ITexture | null;

	/**
	 * @default 1
	 */
	lightMapIntensity: number;

	/**
	 * @default null
	 */
	aoMap: ITexture | null;

	/**
	 * @default 1
	 */
	aoMapIntensity: number;

	/**
	 * @default new THREE.Color( 0x000000 )
	 */
	emissive: IColor;

	/**
	 * @default 1
	 */
	emissiveIntensity: number;

	/**
	 * @default null
	 */
	emissiveMap: ITexture | null;

	/**
	 * @default null
	 */
	bumpMap: ITexture | null;

	/**
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * @default null
	 */
	normalMap: ITexture | null;

	/**
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: TNormalMapTypes;

	/**
	 * @default new THREE.Vector2( 1, 1 )
	 */
	normalScale: IVector2 | O3JS.Vector2;

	/**
	 * @default null
	 */
	displacementMap: ITexture | null;

	/**
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * @default null
	 */
	alphaMap: ITexture | null;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * @default 'round'
	 */
	wireframeLinecap: string;

	/**
	 * @default 'round'
	 */
	wireframeLinejoin: string;

	setValues(parameters: IMeshToonMaterialParameters): void;
}

export interface IPointsMaterialParameters extends IMaterialParameters {
	color?: TColorRepresentation | undefined;
	map?: ITexture | null | undefined;
	alphaMap?: ITexture | null | undefined;
	size?: number | undefined;
	sizeAttenuation?: boolean | undefined;
}

export interface IPointsMaterial extends IMaterial {
	new (parameters?: IPointsMaterialParameters): this;
	/**
	 * @default 'PointsMaterial'
	 */
	type: string;

	/**
	 * @default new THREE.Color( 0xffffff )
	 */
	color: IColor;

	/**
	 * @default null
	 */
	map: ITexture | null;

	/**
	 * @default null
	 */
	alphaMap: ITexture | null;

	/**
	 * @default 1
	 */
	size: number;

	/**
	 * @default true
	 */
	sizeAttenuation: boolean;

	setValues(parameters: IPointsMaterialParameters): void;
}

export interface IShaderMaterialParameters extends IMaterialParameters {
	uniforms?: { [uniform: string]: IUniform } | undefined;
	vertexShader?: string | undefined;
	fragmentShader?: string | undefined;
	linewidth?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;
	lights?: boolean | undefined;
	clipping?: boolean | undefined;

	extensions?:
		| {
				derivatives?: boolean | undefined;
				fragDepth?: boolean | undefined;
				drawBuffers?: boolean | undefined;
				shaderTextureLOD?: boolean | undefined;
		  }
		| undefined;
	glslVersion?: TGLSLVersion | undefined;
}

export interface IShaderMaterial extends IMaterial {
	new (parameters?: IShaderMaterialParameters): this;

	/**
	 * @default 'ShaderMaterial'
	 */
	type: string;

	/**
	 * @default {}
	 */
	defines: { [key: string]: any };

	/**
	 * @default {}
	 */
	uniforms: { [uniform: string]: IUniform };
	vertexShader: string;
	fragmentShader: string;

	/**
	 * @default 1
	 */
	linewidth: number;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * @default false
	 */
	fog: boolean;

	/**
	 * @default false
	 */
	lights: boolean;

	/**
	 * @default false
	 */
	clipping: boolean;

	/**
	 * @deprecated Use {@link ShaderMaterial#extensions.derivatives extensions.derivatives} instead.
	 */
	derivatives: any;

	/**
	 * @default { derivatives: false, fragDepth: false, drawBuffers: false, shaderTextureLOD: false }
	 */
	extensions: {
		derivatives: boolean;
		fragDepth: boolean;
		drawBuffers: boolean;
		shaderTextureLOD: boolean;
	};

	/**
	 * @default { 'color': [ 1, 1, 1 ], 'uv': [ 0, 0 ], 'uv2': [ 0, 0 ] }
	 */
	defaultAttributeValues: any;

	/**
	 * @default undefined
	 */
	index0AttributeName: string | undefined;

	/**
	 * @default false
	 */
	uniformsNeedUpdate: boolean;

	/**
	 * @default null
	 */
	glslVersion: TGLSLVersion | null;

	isShaderMaterial: boolean;

	setValues(parameters: IShaderMaterialParameters): void;
	toJSON(meta: any): any;
}

export interface IRawShaderMaterial extends IShaderMaterial {}

export interface INgxRawShaderMaterial extends IRawShaderMaterial {
	new(
		parameters?: IShaderMaterialParameters,
		shaderId?: string,
		glslVersion?: TGLSLVersion
	) : this;
}

export interface INgxShaderMaterial extends IShaderMaterial {
	new(
		parameters?: IShaderMaterialParameters,
		shaderId?: string,
		glslVersion?: TGLSLVersion
	) : this;
}


export interface IShadowMaterialParameters extends IMaterialParameters {
	color?: TColorRepresentation | undefined;
}

export interface IShadowMaterial extends IMaterial {
	new (parameters?: IShadowMaterialParameters): this;

	/**
	 * @default 'ShadowMaterial'
	 */
	type: string;

	/**
	 * @default new THREE.Color( 0x000000 )
	 */
	color: IColor;

	/**
	 * @default true
	 */
	transparent: boolean;
}

export interface IRenderer {
	domElement: HTMLCanvasElement;
	render(scene: IObject3D, camera: ICamera): void;
	setSize(width: number, height: number, updateStyle?: boolean): void;
}

/** This is only available in worker JS contexts, not the DOM. */
// tslint:disable-next-line:no-empty-interface
export interface IOffscreenCanvas extends EventTarget {}

export interface IWebGLRendererParameters {
	/**
	 * A Canvas where the renderer draws its output.
	 */
	canvas?: HTMLCanvasElement | IOffscreenCanvas | undefined;

	/**
	 * A WebGL Rendering Context.
	 * (https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext)
	 * Default is null
	 */
	context?: WebGLRenderingContext | undefined;

	/**
	 * shader precision. Can be "highp", "mediump" or "lowp".
	 */
	precision?: string | undefined;

	/**
	 * default is false.
	 */
	alpha?: boolean | undefined;

	/**
	 * default is true.
	 */
	premultipliedAlpha?: boolean | undefined;

	/**
	 * default is false.
	 */
	antialias?: boolean | undefined;

	/**
	 * default is true.
	 */
	stencil?: boolean | undefined;

	/**
	 * default is false.
	 */
	preserveDrawingBuffer?: boolean | undefined;

	/**
	 * Can be "high-performance", "low-power" or "default"
	 */
	powerPreference?: string | undefined;

	/**
	 * default is true.
	 */
	depth?: boolean | undefined;

	/**
	 * default is false.
	 */
	logarithmicDepthBuffer?: boolean | undefined;

	/**
	 * default is false.
	 */
	failIfMajorPerformanceCaveat?: boolean | undefined;
}

export interface IWebGLDebug {
	/**
	 * Enables error checking and reporting when shader programs are being compiled.
	 */
	checkShaderErrors: boolean;
}

export interface IWebGLRenderTargetOptions {
	wrapS?: TWrapping | undefined;
	wrapT?: TWrapping | undefined;
	magFilter?: TTextureFilter | undefined;
	minFilter?: TTextureFilter | undefined;
	format?: number | undefined; // RGBAFormat;
	type?: TTextureDataType | undefined; // UnsignedByteType;
	anisotropy?: number | undefined; // 1;
	depthBuffer?: boolean | undefined; // true;
	stencilBuffer?: boolean | undefined; // false;
	generateMipmaps?: boolean | undefined; // true;
	depthTexture?: IDepthTexture | undefined;
	encoding?: TTextureEncoding | undefined;
}

export interface ITexture extends IEventDispatcher {
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
	new (
		image?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
		mapping?: TMapping,
		wrapS?: TWrapping,
		wrapT?: TWrapping,
		magFilter?: TTextureFilter,
		minFilter?: TTextureFilter,
		format?: TPixelFormat,
		type?: TTextureDataType,
		anisotropy?: number,
		encoding?: TTextureEncoding
	): this;

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
	mapping: TMapping;

	/**
	 * @default THREE.ClampToEdgeWrapping
	 */
	wrapS: TWrapping;

	/**
	 * @default THREE.ClampToEdgeWrapping
	 */
	wrapT: TWrapping;

	/**
	 * @default THREE.LinearFilter
	 */
	magFilter: TTextureFilter;

	/**
	 * @default THREE.LinearMipmapLinearFilter
	 */
	minFilter: TTextureFilter;

	/**
	 * @default 1
	 */
	anisotropy: number;

	/**
	 * @default THREE.RGBAFormat
	 */
	format: TPixelFormat;

	internalFormat: TPixelFormatGPU | null;

	/**
	 * @default THREE.UnsignedByteType
	 */
	type: TTextureDataType;

	/**
	 * @default new IMatrix3()
	 */
	matrix: IMatrix3 | O3JS.Matrix3;

	/**
	 * @default true
	 */
	matrixAutoUpdate: boolean;

	/**
	 * @default new IVector2( 0, 0 )
	 */
	offset: IVector2 | O3JS.Vector2;

	/**
	 * @default new IVector2( 1, 1 )
	 */
	repeat: IVector2 | O3JS.Vector2;

	/**
	 * @default new IVector2( 0, 0 )
	 */
	center: IVector2 | O3JS.Vector2;

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
	encoding: TTextureEncoding;

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
	clone(): this;
	copy(source: ITexture): this;
	toJSON(meta: any): any;
	dispose(): void;
	transformUv(uv: IVector2 | O3JS.Vector2): IVector2;
	updateMatrix(): void;
}

export interface IDataTexture extends ITexture {
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
	new (
		data?: BufferSource | null,
		width?: number,
		height?: number,
		format?: TPixelFormat,
		type?: TTextureDataType,
		mapping?: TMapping,
		wrapS?: TWrapping,
		wrapT?: TWrapping,
		magFilter?: TTextureFilter,
		minFilter?: TTextureFilter,
		anisotropy?: number,
		encoding?: TTextureEncoding
	): this;

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
	format: TPixelFormat;

	readonly isDataTexture: true;
}

export interface IDataTexture3D extends ITexture {
	new (data: BufferSource, width: number, height: number, depth: number): this;

	/**
	 * @default THREE.NearestFilter
	 */
	magFilter: TTextureFilter;

	/**
	 * @default THREE.NearestFilter
	 */
	minFilter: TTextureFilter;

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

export interface IDataTexture2DArray extends ITexture {
	new (data?: BufferSource, width?: number, height?: number, depth?: number): this;

	/**
	 * @default THREE.NearestFilter
	 */
	magFilter: TTextureFilter;

	/**
	 * @default THREE.NearestFilter
	 */
	minFilter: TTextureFilter;

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

export interface IDepthTexture extends ITexture {
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
	new (
		width: number,
		height: number,
		type?: TTextureDataType,
		mapping?: TMapping,
		wrapS?: TWrapping,
		wrapT?: TWrapping,
		magFilter?: TTextureFilter,
		minFilter?: TTextureFilter,
		anisotropy?: number
	): this;

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

export interface ICanvasTexture extends ITexture {
	new (
		canvas: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
		mapping?: TMapping,
		wrapS?: TWrapping,
		wrapT?: TWrapping,
		magFilter?: TTextureFilter,
		minFilter?: TTextureFilter,
		format?: TPixelFormat,
		type?: TTextureDataType,
		anisotropy?: number
	): this;
	readonly isCanvasTexture: true;
}

export interface ICompressedTexture extends ITexture {
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
	new (
		mipmaps: ImageData[],
		width: number,
		height: number,
		format?: TCompressedPixelFormat,
		type?: TTextureDataType,
		mapping?: TMapping,
		wrapS?: TWrapping,
		wrapT?: TWrapping,
		magFilter?: TTextureFilter,
		minFilter?: TTextureFilter,
		anisotropy?: number,
		encoding?: TTextureEncoding
	): this;

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

export interface ICubeTexture extends ITexture {
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
		mapping?: TMapping,
		wrapS?: TWrapping,
		wrapT?: TWrapping,
		magFilter?: TTextureFilter,
		minFilter?: TTextureFilter,
		format?: TPixelFormat,
		type?: TTextureDataType,
		anisotropy?: number,
		encoding?: TTextureEncoding
	): this;

	images: any; // returns and sets the value of Texture.image in the codde ?

	/**
	 * @default false
	 */
	flipY: boolean;

	readonly isCubeTexture: true;
}

export interface IVideoTexture extends ITexture {
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
	new (
		video: HTMLVideoElement,
		mapping?: TMapping,
		wrapS?: TWrapping,
		wrapT?: TWrapping,
		magFilter?: TTextureFilter,
		minFilter?: TTextureFilter,
		format?: TPixelFormat,
		type?: TTextureDataType,
		anisotropy?: number
	): this;

	readonly isVideoTexture: true;

	/**
	 * @default false
	 */
	generateMipmaps: boolean;
}

/**
 * Scenes allow you to set up what and where is to be rendered by three.js. This is where you place objects, lights and cameras.
 */
export interface IScene extends IObject3D {
	type: 'Scene';

	/**
	 * A fog instance defining the type of fog that affects everything rendered in the scene. Default is null.
	 * @default null
	 */
	fog: IFogBase | null;

	/**
	 * If not null, it will force everything in the scene to be rendered with that material. Default is null.
	 * @default null
	 */
	overrideMaterial: IMaterial | null;

	/**
	 * @default true
	 */
	autoUpdate: boolean;

	/**
	 * @default null
	 */
	background: null | IColor | ITexture;

	/**
	 * @default null
	 */
	environment: null | ITexture;

	readonly isScene: true;

	/**
	 * Calls before rendering scene
	 */
	onBeforeRender: (
		renderer: IWebGLRenderer,
		scene: IScene,
		camera: ICamera,
		renderTarget: any // any required for Object3D.onBeforeRender compatibility
	) => void;

	/**
	 * Calls after rendering scene
	 */
	onAfterRender: (renderer: IWebGLRenderer, scene: IScene, camera: ICamera) => void;

	toJSON(meta?: any): any;
}

export interface IFogBase {
	name: string;
	color: IColor;
	clone(): IFogBase;
	toJSON(): any;
}

/**
 * This class contains the parameters that define linear fog, i.e., that grows linearly denser with the distance.
 */
export interface IFog extends IFogBase {
	new (color: TColorRepresentation, near?: number, far?: number): this;

	/**
	 * The minimum distance to start applying fog. Objects that are less than 'near' units from the active camera won't be affected by fog.
	 * @default 1
	 */
	near: number;

	/**
	 * The maximum distance at which fog stops being calculated and applied. Objects that are more than 'far' units away from the active camera won't be affected by fog.
	 * @default 1000
	 */
	far: number;

	readonly isFog: true;

	clone(): IFog;
	toJSON(): any;
}

export interface IFogExp2 extends IFogBase {
	new (hex: number | string, density?: number): this;
	/**
	 * Defines how fast the fog will grow dense.
	 * @default 0.00025
	 */
	density: number;

	readonly isFogExp2: true;

	clone(): IFogExp2;
	toJSON(): any;
}

export interface IWebGLCapabilitiesParameters {
	precision?: string | undefined;
	logarithmicDepthBuffer?: boolean | undefined;
}

export interface IWebGLCapabilities {
	new (gl: WebGLRenderingContext, extensions: any, parameters: IWebGLCapabilitiesParameters): this;

	readonly isWebGL2: boolean;
	precision: string;
	logarithmicDepthBuffer: boolean;
	maxTextures: number;
	maxVertexTextures: number;
	maxTextureSize: number;
	maxCubemapSize: number;
	maxAttributes: number;
	maxVertexUniforms: number;
	maxVaryings: number;
	maxFragmentUniforms: number;
	vertexTextures: boolean;
	floatFragmentTextures: boolean;
	floatVertexTextures: boolean;

	getMaxAnisotropy(): number;
	getMaxPrecision(precision: string): string;
}

export interface IWebGLObjects {
	new (gl: WebGLRenderingContext, geometries: any, attributes: any, info: any): this;

	update(object: any): any;
	dispose(): void;
}

export interface IWebGLShadowMap {
	new (_renderer: IWebGLRenderer, _objects: IWebGLObjects, _capabilities: IWebGLCapabilities): this;

	/**
	 * @default false
	 */
	enabled: boolean;

	/**
	 * @default true
	 */
	autoUpdate: boolean;

	/**
	 * @default false
	 */
	needsUpdate: boolean;

	/**
	 * @default THREE.PCFShadowMap
	 */
	type: O3JS.ShadowMapType;

	render(shadowsArray: ILight[], scene: IScene, camera: ICamera): void;
}

export interface IWebGLRenderTarget extends IEventDispatcher {
	new (width: number, height: number, options?: IWebGLRenderTargetOptions): this;
	uuid: string;
	width: number;
	height: number;
	depth: number;

	scissor: IVector4;
	/**
	 * @default false
	 */
	scissorTest: boolean;
	viewport: IVector4;
	texture: ITexture;

	/**
	 * @default true
	 */
	depthBuffer: boolean;

	/**
	 * @default true
	 */
	stencilBuffer: boolean;

	/**
	 * @default null
	 */
	depthTexture: IDepthTexture;

	readonly isWebGLRenderTarget: true;

	/**
	 * @deprecated Use {@line THREE.Texture#wrapS texture.wrapS} instead.
	 */
	wrapS: any;
	/**
	 * @deprecated Use {@line THREE.Texture#wrapT texture.wrapT} instead.
	 */
	wrapT: any;
	/**
	 * @deprecated Use {@line THREE.Texture#magFilter texture.magFilter} instead.
	 */
	magFilter: any;
	/**
	 * @deprecated Use {@line THREE.Texture#minFilter texture.minFilter} instead.
	 */
	minFilter: any;
	/**
	 * @deprecated Use {@line THREE.Texture#anisotropy texture.anisotropy} instead.
	 */
	anisotropy: any;
	/**
	 * @deprecated Use {@line THREE.Texture#offset texture.offset} instead.
	 */
	offset: any;
	/**
	 * @deprecated Use {@line THREE.Texture#repeat texture.repeat} instead.
	 */
	repeat: any;
	/**
	 * @deprecated Use {@line THREE.Texture#format texture.format} instead.
	 */
	format: any;
	/**
	 * @deprecated Use {@line THREE.Texture#type texture.type} instead.
	 */
	type: any;
	/**
	 * @deprecated Use {@line THREE.Texture#generateMipmaps texture.generateMipmaps} instead.
	 */
	generateMipmaps: any;

	setTexture(texture: ITexture): void;
	setSize(width: number, height: number, depth?: number): void;
	clone(): this;
	copy(source: IWebGLRenderTarget): this;
	dispose(): void;
}

export interface IWebGLMultisampleRenderTarget extends IWebGLRenderTarget {
	new (width: number, height: number, options?: IWebGLRenderTargetOptions): this;

	readonly isWebGLMultisampleRenderTarget: true;
	/**
	 * Specifies the number of samples to be used for the renderbuffer storage.However, the maximum supported size for multisampling is platform dependent and defined via gl.MAX_SAMPLES.
	 * @default 4
	 */
	samples: number;
}

export interface IWebGLCubeRenderTarget extends IWebGLRenderTarget {
	new (size: number, options?: IWebGLRenderTargetOptions): this;

	texture: ICubeTexture;

	fromEquirectangularTexture(renderer: IWebGLRenderer, texture: ITexture): this;

	clear(renderer: IWebGLRenderer, color: boolean, depth: boolean, stencil: boolean): void;
}

export interface IWebGL1Renderer extends IWebGLRenderer {
	new (parameters?: IWebGLRendererParameters): this;
	readonly isWebGL1Renderer: true;
}

/**
 * This class originall extended WebGLMultipleRenderTarget
 * However, there are some issues with this method as documented below
 */
export interface IWebGLMultipleRenderTargets extends IEventDispatcher {
	new (width: number, height: number, count: number): this;

	texture: ITexture[];

	readonly isWebGLMultipleRenderTargets: true;

	setSize(width: number, height: number, depth?: number): this;
	copy(source: IWebGLMultipleRenderTargets): this;
	clone(): this;
	dispose(): void;
	// This is an available method, however it will break the code see https://github.com/mrdoob/three.js/issues/21930
	setTexture(texture: ITexture): void;
}

export type TXRAnimationLoopCallback = (time: number, frame?: O3JS.XRFrame) => void;

export type TXRFrameRequestCallback = (time: number, frame: O3JS.XRFrame) => void;

export interface ILine3 {
	new (start?: IVector3 | O3JS.Vector3, end?: IVector3 | O3JS.Vector3): this;

	/**
	 * @default new IVector3()
	 */
	start: IVector3;

	/**
	 * @default new IVector3()
	 */
	end: IVector3;

	set(start?: IVector3 | O3JS.Vector3, end?: IVector3 | O3JS.Vector3): ILine3;
	clone(): this;
	copy(line: ILine3): this;
	getCenter(target: IVector3 | O3JS.Vector3): IVector3;
	delta(target: IVector3 | O3JS.Vector3): IVector3;
	distanceSq(): number;
	distance(): number;
	at(t: number, target: IVector3 | O3JS.Vector3): IVector3;
	closestPointToPointParameter(point: IVector3 | O3JS.Vector3, clampToLine?: boolean): number;
	closestPointToPoint(point: IVector3 | O3JS.Vector3, clampToLine: boolean, target: IVector3 | O3JS.Vector3): IVector3;
	applyMatrix4(matrix: IMatrix4): ILine3;
	equals(line: ILine3): boolean;
}

export interface IPlane {
	new (normal?: IVector3 | O3JS.Vector3, constant?: number): this;

	/**
	 * @default new IVector3( 1, 0, 0 )
	 */
	normal: IVector3;

	/**
	 * @default 0
	 */
	constant: number;

	readonly isPlane: true;

	set(normal: IVector3 | O3JS.Vector3, constant: number): IPlane;
	setComponents(x: number, y: number, z: number, w: number): IPlane;
	setFromNormalAndCoplanarPoint(normal: IVector3 | O3JS.Vector3, point: IVector3 | O3JS.Vector3): IPlane;
	setFromCoplanarPoints(a: IVector3 | O3JS.Vector3, b: IVector3 | O3JS.Vector3, c: IVector3 | O3JS.Vector3): IPlane;
	clone(): this;
	copy(plane: IPlane): this;
	normalize(): IPlane;
	negate(): IPlane;
	distanceToPoint(point: IVector3 | O3JS.Vector3): number;
	distanceToSphere(sphere: ISphere): number;
	projectPoint(point: IVector3 | O3JS.Vector3, target: IVector3 | O3JS.Vector3): IVector3;
	orthoPoint(point: IVector3 | O3JS.Vector3, target: IVector3 | O3JS.Vector3): IVector3;
	intersectLine(line: ILine3, target: IVector3 | O3JS.Vector3): IVector3 | null;
	intersectsLine(line: ILine3): boolean;
	intersectsBox(box: IBox3): boolean;
	intersectsSphere(sphere: ISphere): boolean;
	coplanarPoint(target: IVector3 | O3JS.Vector3): IVector3;
	applyMatrix4(matrix: IMatrix4, optionalNormalMatrix?: IMatrix3 | O3JS.Matrix3): IPlane;
	translate(offset: IVector3 | O3JS.Vector3): IPlane;
	equals(plane: IPlane): boolean;

	/**
	 * @deprecated Use {@line THREE.Plane#intersectsLine .intersectsLine()} instead.
	 */
	isIntersectionLine(l: any): any;
}

export interface ITriangle {
	new (a?: IVector3 | O3JS.Vector3, b?: IVector3 | O3JS.Vector3, c?: IVector3 | O3JS.Vector3): this;

	/**
	 * @default new IVector3()
	 */
	a: IVector3;

	/**
	 * @default new IVector3()
	 */
	b: IVector3;

	/**
	 * @default new IVector3()
	 */
	c: IVector3;

	set(a: IVector3 | O3JS.Vector3, b: IVector3 | O3JS.Vector3, c: IVector3 | O3JS.Vector3): ITriangle;
	setFromPointsAndIndices(points: (IVector3 | O3JS.Vector3)[], i0: number, i1: number, i2: number): this;
	setFromAttributeAndIndices(
		attribute: IBufferAttribute | IInterleavedBufferAttribute,
		i0: number,
		i1: number,
		i2: number
	): this;
	clone(): this;
	copy(triangle: ITriangle): this;
	getArea(): number;
	getMidpoint(target: IVector3 | O3JS.Vector3): IVector3;
	getNormal(target: IVector3 | O3JS.Vector3): IVector3;
	getPlane(target: IPlane): IPlane;
	getBarycoord(point: IVector3 | O3JS.Vector3, target: IVector3 | O3JS.Vector3): IVector3;
	getUV(
		point: IVector3 | O3JS.Vector3,
		uv1: IVector2 | O3JS.Vector2,
		uv2: IVector2 | O3JS.Vector2,
		uv3: IVector2 | O3JS.Vector2,
		target: IVector2 | O3JS.Vector2
	): IVector2;
	containsPoint(point: IVector3 | O3JS.Vector3): boolean;
	intersectsBox(box: IBox3): boolean;
	isFrontFacing(direction: IVector3 | O3JS.Vector3): boolean;
	closestPointToPoint(point: IVector3 | O3JS.Vector3, target: IVector3 | O3JS.Vector3): IVector3;
	equals(triangle: ITriangle): boolean;
}

export interface ISphere {
	new (center?: IVector3 | O3JS.Vector3, radius?: number): this;
	/**
	 * @default new Vector3()
	 */
	center: IVector3;

	/**
	 * @default 1
	 */
	radius: number;

	set(center: IVector3 | O3JS.Vector3, radius: number): ISphere;
	setFromPoints(points: (IVector3 | O3JS.Vector3)[], optionalCenter?: IVector3 | O3JS.Vector3): ISphere;
	clone(): this;
	copy(sphere: ISphere): this;
	expandByPoint(point: IVector3 | O3JS.Vector3): this;
	isEmpty(): boolean;
	makeEmpty(): this;
	containsPoint(point: IVector3 | O3JS.Vector3): boolean;
	distanceToPoint(point: IVector3 | O3JS.Vector3): number;
	intersectsSphere(sphere: ISphere): boolean;
	intersectsBox(box: IBox3): boolean;
	intersectsPlane(plane: IPlane): boolean;
	clampPoint(point: IVector3 | O3JS.Vector3, target: IVector3 | O3JS.Vector3): IVector3;
	getBoundingBox(target: IBox3): IBox3;
	applyMatrix4(matrix: IMatrix4): ISphere;
	translate(offset: IVector3 | O3JS.Vector3): ISphere;
	equals(sphere: ISphere): boolean;
	union(sphere: ISphere): this;

	/**
	 * @deprecated Use {@line THREE.Sphere#isEmpty .isEmpty()} instead.
	 */
	empty(): any;
}

export interface IBox2 {
	new (min?: IVector2 | O3JS.Vector2, max?: IVector2 | O3JS.Vector2): this;

	/**
	 * @default new THREE.Vector2( + Infinity, + Infinity )
	 */
	min: IVector2;

	/**
	 * @default new THREE.Vector2( - Infinity, - Infinity )
	 */
	max: IVector2;

	set(min: IVector2 | O3JS.Vector2, max: IVector2 | O3JS.Vector2): IBox2;
	setFromPoints(points: (IVector2 | O3JS.Vector2)[]): IBox2;
	setFromCenterAndSize(center: IVector2 | O3JS.Vector2, size: IVector2 | O3JS.Vector2): IBox2;
	clone(): this;
	copy(box: IBox2): this;
	makeEmpty(): IBox2;
	isEmpty(): boolean;
	getCenter(target: IVector2 | O3JS.Vector2): IVector2;
	getSize(target: IVector2 | O3JS.Vector2): IVector2;
	expandByPoint(point: IVector2 | O3JS.Vector2): IBox2;
	expandByVector(vector: IVector2 | O3JS.Vector2): IBox2;
	expandByScalar(scalar: number): IBox2;
	containsPoint(point: IVector2 | O3JS.Vector2): boolean;
	containsBox(box: IBox2): boolean;
	getParameter(point: IVector2 | O3JS.Vector2, target: IVector2 | O3JS.Vector2): IVector2;
	intersectsBox(box: IBox2): boolean;
	clampPoint(point: IVector2 | O3JS.Vector2, target: IVector2 | O3JS.Vector2): IVector2;
	distanceToPoint(point: IVector2 | O3JS.Vector2): number;
	intersect(box: IBox2): IBox2;
	union(box: IBox2): IBox2;
	translate(offset: IVector2 | O3JS.Vector2): IBox2;
	equals(box: IBox2): boolean;
}

export interface IBox3 {
	new (min?: IVector3 | O3JS.Vector3, max?: IVector3 | O3JS.Vector3): this;

	/**
	 * @default new IVector3( + Infinity, + Infinity, + Infinity )
	 */
	min: IVector3;

	/**
	 * @default new IVector3( - Infinity, - Infinity, - Infinity )
	 */
	max: IVector3;
	readonly isBox3: true;

	set(min: IVector3 | O3JS.Vector3, max: IVector3 | O3JS.Vector3): this;
	setFromArray(array: ArrayLike<number>): this;
	setFromBufferAttribute(bufferAttribute: IBufferAttribute): this;
	setFromPoints(points: (IVector3 | O3JS.Vector3)[]): this;
	setFromCenterAndSize(center: IVector3 | O3JS.Vector3, size: IVector3 | O3JS.Vector3): this;
	setFromObject(object: IObject3D): this;
	clone(): this;
	copy(box: IBox3): this;
	makeEmpty(): this;
	isEmpty(): boolean;
	getCenter(target: IVector3 | O3JS.Vector3): IVector3;
	getSize(target: IVector3 | O3JS.Vector3): IVector3;
	expandByPoint(point: IVector3 | O3JS.Vector3): this;
	expandByVector(vector: IVector3 | O3JS.Vector3): this;
	expandByScalar(scalar: number): this;
	expandByObject(object: IObject3D): this;
	containsPoint(point: IVector3 | O3JS.Vector3): boolean;
	containsBox(box: IBox3): boolean;
	getParameter(point: IVector3 | O3JS.Vector3, target: IVector3 | O3JS.Vector3): IVector3;
	intersectsBox(box: IBox3): boolean;
	intersectsSphere(sphere: ISphere): boolean;
	intersectsPlane(plane: IPlane): boolean;
	intersectsTriangle(triangle: ITriangle): boolean;
	clampPoint(point: IVector3 | O3JS.Vector3, target: IVector3 | O3JS.Vector3): IVector3;
	distanceToPoint(point: IVector3 | O3JS.Vector3): number;
	getBoundingSphere(target: ISphere): ISphere;
	intersect(box: IBox3): this;
	union(box: IBox3): this;
	applyMatrix4(matrix: IMatrix4): this;
	translate(offset: IVector3 | O3JS.Vector3): this;
	equals(box: IBox3): boolean;
	/**
	 * @deprecated Use {@line THREE.Box3#isEmpty .isEmpty()} instead.
	 */
	empty(): any;
	/**
	 * @deprecated Use {@line THREE.Box3#intersectsBox .intersectsBox()} instead.
	 */
	isIntersectionBox(b: any): any;
	/**
	 * @deprecated Use {@line THREE.Box3#intersectsSphere .intersectsSphere()} instead.
	 */
	isIntersectionSphere(s: any): any;
}

export interface IPMREMGenerator {
	new (renderer: IWebGLRenderer): this;
	fromScene(scene: IScene, sigma?: number, near?: number, far?: number): IWebGLRenderTarget;
	fromEquirectangular(equirectangular: ITexture): IWebGLRenderTarget;
	fromCubemap(cubemap: ICubeTexture): IWebGLRenderTarget;
	compileCubemapShader(): void;
	compileEquirectangularShader(): void;
	dispose(): void;
}

export interface IUVGenerator {
	generateTopUV(
		geometry: IExtrudeGeometry,
		vertices: number[],
		indexA: number,
		indexB: number,
		indexC: number
	): (IVector2 | O3JS.Vector2)[];
	generateSideWallUV(
		geometry: IExtrudeGeometry,
		vertices: number[],
		indexA: number,
		indexB: number,
		indexC: number,
		indexD: number
	): (IVector2 | O3JS.Vector2)[];
}

export interface IWebGLRendererParameters {
	/**
	 * A Canvas where the renderer draws its output.
	 */
	canvas?: HTMLCanvasElement | IOffscreenCanvas | undefined;

	/**
	 * A WebGL Rendering Context.
	 * (https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext)
	 * Default is null
	 */
	context?: WebGLRenderingContext | undefined;

	/**
	 * shader precision. Can be "highp", "mediump" or "lowp".
	 */
	precision?: string | undefined;

	/**
	 * default is false.
	 */
	alpha?: boolean | undefined;

	/**
	 * default is true.
	 */
	premultipliedAlpha?: boolean | undefined;

	/**
	 * default is false.
	 */
	antialias?: boolean | undefined;

	/**
	 * default is true.
	 */
	stencil?: boolean | undefined;

	/**
	 * default is false.
	 */
	preserveDrawingBuffer?: boolean | undefined;

	/**
	 * Can be "high-performance", "low-power" or "default"
	 */
	powerPreference?: string | undefined;

	/**
	 * default is true.
	 */
	depth?: boolean | undefined;

	/**
	 * default is false.
	 */
	logarithmicDepthBuffer?: boolean | undefined;

	/**
	 * default is false.
	 */
	failIfMajorPerformanceCaveat?: boolean | undefined;
}

/**
 * The WebGL renderer displays your beautifully crafted scenes using WebGL, if your device supports it.
 * This renderer has way better performance than CanvasRenderer.
 *
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js|src/renderers/WebGLRenderer.js}
 */
export interface IWebGLRenderer extends IRenderer {
	new (parameters?: IWebGLRendererParameters): this;

	/**
	 * A Canvas where the renderer draws its output.
	 * This is automatically created by the renderer in the constructor (if not provided already); you just need to add it to your page.
	 * @default document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' )
	 */
	domElement: HTMLCanvasElement;

	/**
	 * The HTML5 Canvas's 'webgl' context obtained from the canvas where the renderer will draw.
	 */
	context: WebGLRenderingContext;

	/**
	 * Defines whether the renderer should automatically clear its output before rendering.
	 * @default true
	 */
	autoClear: boolean;

	/**
	 * If autoClear is true, defines whether the renderer should clear the color buffer. Default is true.
	 * @default true
	 */
	autoClearColor: boolean;

	/**
	 * If autoClear is true, defines whether the renderer should clear the depth buffer. Default is true.
	 * @default true
	 */
	autoClearDepth: boolean;

	/**
	 * If autoClear is true, defines whether the renderer should clear the stencil buffer. Default is true.
	 * @default true
	 */
	autoClearStencil: boolean;

	/**
	 * Debug configurations.
	 * @default { checkShaderErrors: true }
	 */
	debug: IWebGLDebug;

	/**
	 * Defines whether the renderer should sort objects. Default is true.
	 * @default true
	 */
	sortObjects: boolean;

	/**
	 * @default []
	 */
	clippingPlanes: any[];

	/**
	 * @default false
	 */
	localClippingEnabled: boolean;

	extensions: O3JS.WebGLExtensions;

	/**
	 * Default is LinearEncoding.
	 * @default THREE.LinearEncoding
	 */
	outputEncoding: O3JS.TextureEncoding;

	/**
	 * @default false
	 */
	physicallyCorrectLights: boolean;

	/**
	 * @default THREE.NoToneMapping
	 */
	toneMapping: O3JS.ToneMapping;

	/**
	 * @default 1
	 */
	toneMappingExposure: number;

	info: O3JS.WebGLInfo;

	shadowMap: O3JS.WebGLShadowMap;

	pixelRatio: number;

	capabilities: O3JS.WebGLCapabilities;
	properties: O3JS.WebGLProperties;
	renderLists: O3JS.WebGLRenderLists;
	state: O3JS.WebGLState;

	xr: O3JS.WebXRManager;

	/**
	 * Return the WebGL context.
	 */
	getContext(): WebGLRenderingContext;
	getContextAttributes(): any;
	forceContextLoss(): void;
	forceContextRestore(): void;

	/**
	 * @deprecated Use {@link WebGLCapabilities#getMaxAnisotropy .capabilities.getMaxAnisotropy()} instead.
	 */
	getMaxAnisotropy(): number;

	/**
	 * @deprecated Use {@link WebGLCapabilities#precision .capabilities.precision} instead.
	 */
	getPrecision(): string;

	getPixelRatio(): number;
	setPixelRatio(value: number): void;

	getDrawingBufferSize(target: IVector2 | O3JS.Vector2): IVector2;
	setDrawingBufferSize(width: number, height: number, pixelRatio: number): void;

	getSize(target: IVector2 | O3JS.Vector2): IVector2;

	/**
	 * Resizes the output canvas to (width, height), and also sets the viewport to fit that size, starting in (0, 0).
	 */
	setSize(width: number, height: number, updateStyle?: boolean): void;

	getCurrentViewport(target: IVector4 | O3JS.Vector4): IVector4;

	/**
	 * Copies the viewport into target.
	 */
	getViewport(target: IVector4 | O3JS.Vector4): IVector4;

	/**
	 * Sets the viewport to render from (x, y) to (x + width, y + height).
	 * (x, y) is the lower-left corner of the region.
	 */
	setViewport(x: IVector4 | O3JS.Vector4 | number, y?: number, width?: number, height?: number): void;

	/**
	 * Copies the scissor area into target.
	 */
	getScissor(target: IVector4 | O3JS.Vector4): IVector4;

	/**
	 * Sets the scissor area from (x, y) to (x + width, y + height).
	 */
	setScissor(x: IVector4 | O3JS.Vector4 | number, y?: number, width?: number, height?: number): void;

	/**
	 * Returns true if scissor test is enabled; returns false otherwise.
	 */
	getScissorTest(): boolean;

	/**
	 * Enable the scissor test. When this is enabled, only the pixels within the defined scissor area will be affected by further renderer actions.
	 */
	setScissorTest(enable: boolean): void;

	/**
	 * Sets the custom opaque sort function for the WebGLRenderLists. Pass null to use the default painterSortStable function.
	 */
	setOpaqueSort(method: (a: any, b: any) => number): void;

	/**
	 * Sets the custom transparent sort function for the WebGLRenderLists. Pass null to use the default reversePainterSortStable function.
	 */
	setTransparentSort(method: (a: any, b: any) => number): void;

	/**
	 * Returns a O3JS.Color instance with the current clear color.
	 */
	getClearColor(target: IColor): IColor;

	/**
	 * Sets the clear color, using color for the color and alpha for the opacity.
	 */
	setClearColor(color: TColorRepresentation, alpha?: number): void;

	/**
	 * Returns a float with the current clear alpha. Ranges from 0 to 1.
	 */
	getClearAlpha(): number;

	setClearAlpha(alpha: number): void;

	/**
	 * Tells the renderer to clear its color, depth or stencil drawing buffer(s).
	 * Arguments default to true
	 */
	clear(color?: boolean, depth?: boolean, stencil?: boolean): void;

	clearColor(): void;
	clearDepth(): void;
	clearStencil(): void;
	clearTarget(renderTarget: IWebGLRenderTarget, color: boolean, depth: boolean, stencil: boolean): void;

	/**
	 * @deprecated Use {@link WebGLState#reset .state.reset()} instead.
	 */
	resetGLState(): void;
	dispose(): void;

	renderBufferDirect(
		camera: ICamera,
		scene: IScene,
		geometry: IBufferGeometry,
		material: IMaterial,
		object: IObject3D,
		geometryGroup: any
	): void;

	/**
	 * A build in function that can be used instead of requestAnimationFrame. For WebXR projects this function must be used.
	 * @param callback The function will be called every available frame. If `null` is passed it will stop any already ongoing animation.
	 */
	setAnimationLoop(callback: TXRAnimationLoopCallback | null): void;

	/**
	 * @deprecated Use {@line THREE.WebGLRenderer#setAnimationLoop .setAnimationLoop()} instead.
	 */
	animate(callback: () => void): void;

	/**
	 * Compiles all materials in the scene with the camera. This is useful to precompile shaders before the first rendering.
	 */
	compile(scene: IObject3D, camera: ICamera): void;

	/**
	 * Render a scene or an object using a camera.
	 * The render is done to a previously specified {@line THREE.WebGLRenderTarget#renderTarget .renderTarget} set by calling
	 * {@line THREE.WebGLRenderer#setRenderTarget .setRenderTarget} or to the canvas as usual.
	 *
	 * By default render buffers are cleared before rendering but you can prevent this by setting the property
	 * {@line THREE.WebGLRenderer#autoClear autoClear} to false. If you want to prevent only certain buffers being cleared
	 * you can set either the {@line THREE.WebGLRenderer#autoClearColor autoClearColor},
	 * {@line THREE.WebGLRenderer#autoClearStencil autoClearStencil} or {@line THREE.WebGLRenderer#autoClearDepth autoClearDepth}
	 * properties to false. To forcibly clear one ore more buffers call {@line THREE.WebGLRenderer#clear .clear}.
	 */
	render(scene: IObject3D, camera: ICamera): void;

	/**
	 * Returns the current active cube face.
	 */
	getActiveCubeFace(): number;

	/**
	 * Returns the current active mipmap level.
	 */
	getActiveMipmapLevel(): number;

	/**
	 * Returns the current render target. If no render target is set, null is returned.
	 */
	getRenderTarget(): IWebGLRenderTarget | null;

	/**
	 * @deprecated Use {@line THREE.WebGLRenderer#getRenderTarget .getRenderTarget()} instead.
	 */
	getCurrentRenderTarget(): IWebGLRenderTarget | null;

	/**
	 * Sets the active render target.
	 *
	 * @param renderTarget The {@line THREE.WebGLRenderTarget renderTarget} that needs to be activated. When `null` is given, the canvas is set as the active render target instead.
	 * @param activeCubeFace Specifies the active cube side (PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5) of {@link WebGLCubeRenderTarget}.
	 * @param activeMipmapLevel Specifies the active mipmap level.
	 */
	setRenderTarget(
		renderTarget: IWebGLRenderTarget | IWebGLMultipleRenderTargets | null,
		activeCubeFace?: number,
		activeMipmapLevel?: number
	): void;

	readRenderTargetPixels(
		renderTarget: IWebGLRenderTarget | IWebGLMultipleRenderTargets,
		x: number,
		y: number,
		width: number,
		height: number,
		buffer: any,
		activeCubeFaceIndex?: number
	): void;

	/**
	 * Copies a region of the currently bound framebuffer into the selected mipmap level of the selected texture.
	 * This region is defined by the size of the destination texture's mip level, offset by the input position.
	 *
	 * @param position Specifies the pixel offset from which to copy out of the framebuffer.
	 * @param texture Specifies the destination texture.
	 * @param level Specifies the destination mipmap level of the texture.
	 */
	copyFramebufferToTexture(position: IVector2 | O3JS.Vector2, texture: ITexture, level?: number): void;

	/**
	 * Copies srcTexture to the specified level of dstTexture, offset by the input position.
	 *
	 * @param position Specifies the pixel offset into the dstTexture where the copy will occur.
	 * @param srcTexture Specifies the source texture.
	 * @param dstTexture Specifies the destination texture.
	 * @param level Specifies the destination mipmap level of the texture.
	 */
	copyTextureToTexture(
		position: IVector2 | O3JS.Vector2,
		srcTexture: ITexture,
		dstTexture: ITexture,
		level?: number
	): void;

	/**
	 * Copies the pixels of a texture in the bounds sourceBox in the desination texture starting from the given position.
	 * @param sourceBox Specifies the bounds
	 * @param position Specifies the pixel offset into the dstTexture where the copy will occur.
	 * @param srcTexture Specifies the source texture.
	 * @param dstTexture Specifies the destination texture.
	 * @param level Specifies the destination mipmap level of the texture.
	 */
	copyTextureToTexture3D(
		sourceBox: IBox3,
		position: IVector3,
		srcTexture: ITexture,
		dstTexture: IDataTexture3D | IDataTexture2DArray,
		level?: number
	): void;

	/**
	 * Initializes the given texture. Can be used to preload a texture rather than waiting until first render (which can cause noticeable lags due to decode and GPU upload overhead).
	 *
	 * @param texture The texture to Initialize.
	 */
	initTexture(texture: ITexture): void;

	/**
	 * Can be used to reset the internal WebGL state.
	 */
	resetState(): void;

	/**
	 * @deprecated
	 */
	gammaFactor: number;

	/**
	 * @deprecated Use {@line THREE.WebGLRenderer#xr .xr} instead.
	 */
	vr: boolean;

	/**
	 * @deprecated Use {@link WebGLShadowMap#enabled .shadowMap.enabled} instead.
	 */
	shadowMapEnabled: boolean;

	/**
	 * @deprecated Use {@link WebGLShadowMap#type .shadowMap.type} instead.
	 */
	shadowMapType: O3JS.ShadowMapType;

	/**
	 * @deprecated Use {@link WebGLShadowMap#cullFace .shadowMap.cullFace} instead.
	 */
	shadowMapCullFace: O3JS.CullFace;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'OES_texture_float' )} instead.
	 */
	supportsFloatTextures(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'OES_texture_half_float' )} instead.
	 */
	supportsHalfFloatTextures(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'OES_standard_derivatives' )} instead.
	 */
	supportsStandardDerivatives(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'WEBGL_compressed_texture_s3tc' )} instead.
	 */
	supportsCompressedTextureS3TC(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'WEBGL_compressed_texture_pvrtc' )} instead.
	 */
	supportsCompressedTexturePVRTC(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'EXT_blend_minmax' )} instead.
	 */
	supportsBlendMinMax(): any;

	/**
	 * @deprecated Use {@link WebGLCapabilities#vertexTextures .capabilities.vertexTextures} instead.
	 */
	supportsVertexTextures(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'ANGLE_instanced_arrays' )} instead.
	 */
	supportsInstancedArrays(): any;

	/**
	 * @deprecated Use {@line THREE.WebGLRenderer#setScissorTest .setScissorTest()} instead.
	 */
	enableScissorTest(boolean: any): any;
}

export interface IGeometryUtils {
	mergeBufferAttributes(attributes: IBufferAttribute[]): IBufferAttribute;
	mergeBufferGeometries(geometries: IBufferGeometry[], useGroups?: boolean): IBufferGeometry;
	interleaveAttributes(attributes: IBufferAttribute[]): IInterleavedBufferAttribute;
	estimateBytesUsed(geometry: IBufferGeometry): number;
	mergeVertices(geometry: IBufferGeometry, tolerance?: number): IBufferGeometry;
	toTrianglesDrawMode(geometry: IBufferGeometry, drawMode: TTrianglesDrawModes): IBufferGeometry;
	computeMorphedAttributes(object: IMesh | ILine | IPoints): object;
	hilbert2D(
		center?: IVector3,
		size?: number,
		iterations?: number,
		v0?: number,
		v1?: number,
		v2?: number,
		v3?: number
	): IVector3[];
	hilbert3D(
		center?: IVector3,
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
	): IVector3[];
	gosper(size?: number): number[];
}

export interface IRoomEnvironment extends IScene {
    new() : this;
}

export interface INodeFlow {
    result: string;
    code: string;
    extra: object;
}

export interface INode {
    new(type?: string) : this;

    uuid: string;
    name: string;
    type: string | undefined;
    userData: object;
    readonly isNode: true;
    frameId: number | undefined;
    hashProperties: string[] | undefined;

    analyze(builder: INodeBuilder, settings?: object): void;
    analyzeAndFlow(builder: INodeBuilder, output: string, settings?: object): INodeFlow;
    flow(builder: INodeBuilder, output: string, settings?: object): INodeFlow;
    build(builder: INodeBuilder, output: string, uuid?: string): string;
    generate(builder: INodeBuilder, output: string, uuid?: string, type?: string, ns?: string): string;
    appendDepsNode(builder: INodeBuilder, data: object, output: string): void;
    setName(name: string): this;
    getName(builder: INodeBuilder): string;
    getType(builder: INodeBuilder, output?: string): string;
    getJSONNode(meta?: object | string): object | undefined;
    getHash(): string;
    copy(source: INode): this;
    createJSONNode(meta?: object | string): object;
    toJSON(meta?: object | string): object;
}

export interface INodeBuilder {
    new() : this;

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

    build(vertex: INode, fragment: INode): this;
    buildShader(shader: string, node: INode): void;
    setMaterial(material: IMaterial, renderer: IWebGLRenderer): this;
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
    getNodeData(node: INode): object;
    createUniform(
        shader: string,
        type: string,
        node: INode,
        ns?: string,
        needsUpdate?: boolean,
        label?: string,
    ): INodeUniform;
    createVertexUniform(type: string, node: INode, ns?: string, needsUpdate?: boolean, label?: string): INodeUniform;
    createFragmentUniform(type: string, node: INode, ns?: string, needsUpdate?: boolean, label?: string): INodeUniform;
    include(node: INode, parent?: boolean, source?: string): void;
    colorToVectorProperties(color: string): string;
    colorToVector(color: string): string;
    getIncludes(type: string, shader: string): object[];
    getIncludesCode(type: string, shader: string): string;
    getConstructorFromLength(len: number): string;
    isTypeMatrix(format: string): boolean;
    getTypeLength(type: string): number;
    getTypeFromLength(len: number): string;
    findNode(): INode;
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
    getTextureEncodingFromMap(map: ITexture): O3JS.TextureEncoding;
}

export interface IBoolNode extends IInputNode {
    new(value?: boolean) : this;

    value: boolean;
    nodeType: string;

    generateReadonly(
        builder: INodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: IBoolNode): this;
}

export interface IIntNode extends IInputNode {
    new(value?: number) : this;

    value: number;
    nodeType: string;

    generateReadonly(
        builder: INodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: IIntNode): this;
}

export interface IFloatNode extends IInputNode {
    new(value?: number) : this;

    value: number;
    nodeType: string;

    generateReadonly(
        builder: INodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: IFloatNode): this;
}



export interface ITempNodeParams {
    shared?: boolean;
    unique?: boolean;
}

export interface ITempNode extends INode {
    new(type: string, params?: ITempNodeParams):this;

    shared: boolean;
    unique: boolean;
    label: string | undefined;

    build(builder: INodeBuilder, output: string, uuid?: string, ns?: string): string;
    getShared(builder: INodeBuilder, output: string): boolean;
    getUnique(builder: INodeBuilder, output: string): boolean;
    setLabel(name: string): this;
    getLabel(builder: INodeBuilder): string;
    getUuid(unique: boolean): string;
    getTemp(builder: INodeBuilder, uuid: string): string | undefined;
}

export interface IFunctionNodeInput {
    name: string;
    type: string;
    qualifier: string;
}

export interface IFunctionNode extends ITempNode {
    new(src: string, includes?: object[], extensions?: object, keywords?: object, type?: string) : this;

    isMethod: boolean;
    nodeType: string;
    useKeywords: boolean;

    inputs: IFunctionNodeInput[] | undefined;
    includes: object[] | undefined;
    extensions: object | undefined;
    keywords: object | undefined;

    getShared(builder: INodeBuilder, output: string): boolean;
    getType(builder: INodeBuilder): string;
    getInputByName(name: string): IFunctionNodeInput | undefined;
    getIncludeByName(name: string): object | undefined;
    parse(src: string, includes?: object[], extensions?: object, keywords?: object): void;
    copy(source: IFunctionNode): this;
}

export interface IInputNode extends ITempNode {
    new(type: string, params?: ITempNodeParams) : this;

    readonly: boolean;

    setReadonly(value: boolean): this;
    getReadonly(builder: INodeBuilder): boolean;
    copy(source: IInputNode): this;
}

export interface IConstNode extends ITempNode {
    new(src: string, useDefine?: boolean) : this;

    src: string;
    useDefine: boolean;
    nodeType: string;

    getType(builder: INodeBuilder): string;
    parse(src: string, useDefine?: boolean): void;
    build(builder: INodeBuilder, output: string): string;
    copy(source: IConstNode): this;

    PI: string;
    PI2: string;
    RECIPROCAL_PI: string;
    RECIPROCAL_PI2: string;
    LOG2: string;
    EPSILON: string;
	
}

export interface IVarNode extends INode {
    new(type: string, value?: any) : this;

    value: any;
    nodeType: string;

    getType(builder: INodeBuilder): string;
    copy(source: IVarNode): this;
}

export interface IStructNodeInput {
    type: string;
    name: string;
}

export interface IStructNode extends ITempNode {
    new(src?: string) : this;

    inputs: IStructNodeInput[];
    src: string;
    nodeType: string;

    getType(builder: INodeBuilder): string;
    getInputByName(name: string): IStructNodeInput;
    parse(src: string): void;
}

export interface IAttributeNode extends ITempNode {
    new(name: string, type?: string) : this;

    name: string;
    nodeType: string;

    getAttributeType(builder: INodeBuilder): string;
    getType(builder: INodeBuilder): string;
    copy(source: IAttributeNode): this;
}



export interface IUVNode extends ITempNode {
    new(index?: number) : this;

    index: number;
    nodeType: string;

    copy(source: IUVNode): this;
}

export interface IExpressionNode extends IFunctionNode {
    new(src: string, type?: string, keywords?: object, extensions?: object, includes?: object[]) : this;
}

export interface IFunctionCallNode extends ITempNode {
    new(func: IFunctionNode, inputs?: INode[]) : this;

    nodeType: string;

    value: IFunctionNode;
    inputs: INode[];

    setFunction(func: IFunctionNode, inputs?: INode[]): void;
    getFunction(): IFunctionNode;
    getType(): string;
    copy(source: IFunctionCallNode): this;
}

export interface INodeLibKeyword {
    callback: (builder: INodeBuilder) => void;
    cache?: object;
}

export interface INodeLib {
    add(node: INode): void;
    addKeyword(name: string, callback: (builder: INodeBuilder) => void, cache?: object): void;
    remove(node: INode): void;
    removeKeyword(name: string): void;
    get(name: string): INode;
    getKeyword(name: string, builder: INodeBuilder): any;
    getKeywordData(name: string): INodeLibKeyword;
    contains(name: string): boolean;
    containsKeyword(name: string): boolean;
}

export interface INodeUtils {
    addShortcuts(proto: INode, proxy: string, list: any[]): void;
}



export interface IMatrix3Node extends IInputNode {
    new(matrix?: IMatrix3) : this;

    value: IMatrix3;
    nodeType: string;
    elements: number[];

    generateReadonly(
        builder: INodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: IMatrix3Node): this;
}

export interface IMatrix4Node extends IInputNode {
    new(matrix?: IMatrix4) : this;

    value: IMatrix4;
    nodeType: string;
    elements: number[];

    generateReadonly(
        builder: INodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: IMatrix4Node): this;
}

export interface ICubeTextureNode extends IInputNode {
    new(value: ICubeTexture, uv?: INode, bias?: INode) : this;

    value: ICubeTexture;
    uv: INode | undefined;
    bias: INode | undefined;
    nodeType: string;

    getTexture(builder: INodeBuilder, output: string): string;
    copy(source: ICubeTextureNode): this;
}

export interface IScreenNode extends ITextureNode {
    new(uv?: IUVNode) : this;

    nodeType: string;

    getTexture(builder: INodeBuilder, output: string): string;
}

export interface IReflectorOptions {
    color?: TColorRepresentation;
    textureWidth?: number;
    textureHeight?: number;
    clipBias?: number;
    shader?: object;
    encoding?: O3JS.TextureEncoding;
}

export interface IReflector extends IMesh {
    new(geometry?: IBufferGeometry, options?: IReflectorOptions) : this;

    getRenderTarget(): IWebGLRenderTarget;
}

export interface IReflectorRTT extends IReflector {
    new(geometry?: IBufferGeometry, options?: IReflectorOptions) : this;
}

export interface IReflectorNode extends ITempNode {
    new(mirror?: IReflectorRTT) : this;

    mirror: IReflectorRTT;
    textureMatrix: IMatrix4Node;
    localPosition: IPositionNode;
    uv: IOperatorNode;
    uvResult: IOperatorNode;
    texture: ITextureNode;

    nodeType: string;

    copy(source: IReflectorNode): this;
}

export interface IPropertyNode extends IInputNode {
    new(object: object, property: string, type: string) : this;

    object: object;
    property: string;
    nodeType: string;
    value: any;
}

export interface IRTTNodeOptions extends IWebGLRenderTargetOptions {
    clear?: boolean;
}

export interface IRTTNode extends ITextureNode {
    new(width: number, height: number, input: ITextureNode, options?: IRTTNodeOptions) : this;

    input: ITextureNode;
    clear: boolean;
    renderTarget: IWebGLRenderTarget;
    material: object; // NodeMaterial
    camera: IOrthographicCamera;
    scene: IScene;
    quad: IMesh;
    render: boolean;

    build(builder: INodeBuilder, output: string, uuid?: string): string;
    updateFramesaveTo(frame: INodeFrame): void;
    updateFrame(frame: INodeFrame): void;
    copy(source: IRTTNode): this;
}

export interface IColorsNode extends ITempNode {
    new(index?: number) : this;

    index: number;
    nodeType: string;

    copy(source: IColorsNode): this;
}

export interface IPositionNode extends ITempNode {
    new(scope?: string) : this;

    scope: string;
    nodeType: string;

    copy(source: IPositionNode): this;

    LOCAL: string;
    WORLD: string;
    VIEW: string;
    PROJECTION: string;
}

export interface INormalNode extends ITempNode {
    new(scope?: string) : this;

    scope: string;
    nodeType: string;

    copy(source: INormalNode): this;

    LOCAL: string;
    WORLD: string;
}

export interface ICameraNode extends ITempNode {
    new(scope?: string, camera?: ICamera) : this;

    scope: string;
    near: IFloatNode | undefined;
    far: IFloatNode | undefined;
    camera: ICamera | undefined;
    updateFrame: boolean | undefined;
    nodeType: string;

    setCamera(camera: ICamera): void;
    setScope(scope: string): void;
    onUpdateFrame(frame: INodeFrame): void;
    copy(source: ICameraNode): this;

    Nodes: {
        depthColor: IFunctionNode;
    };
    POSITION: string;
    DEPTH: string;
    TO_VERTEX: string;
}

export interface ILightNode extends ITempNode {
    new(scope?: string) : this;

    scope: string;
    nodeType: string;

    copy(source: ILightNode): this;

    TOTAL: string;
}

export interface IReflectNode extends ITempNode {
    new(scope?: string) : this;

    scope: string;
    nodeType: string;

    CUBE: string;
    SPHERE: string;
    VECTOR: string;
}

export interface IScreenUVNode extends ITempNode {
    new(resolution?: IResolutionNode) : this;

    resolution: IResolutionNode;
    nodeType: string;

    copy(source: IScreenUVNode): this;
}

export interface IResolutionNode extends IVector2Node {
    new() : this;

    size: IVector2;
    nodeType: string;

    updateFrame(frame: INodeFrame): void;
    copy(source: IResolutionNode): this;
}

export interface IMathNode extends ITempNode {
    new(a: INode, bOrMethod: INode | string, cOrMethod?: INode | string, method?: string) : this;

    a: INode;
    b: INode | string | undefined;
    c: INode | string | undefined;
    method: string;
    nodeType: string;

    getNumInputs(builder: INodeBuilder): number;
    getInputType(builder: INodeBuilder): string;
    copy(source: IMathNode): this;

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

export interface ICondNode extends ITempNode {
    new(a: INode, b: INode, op: string, ifNode?: INode, elseNode?: INode) : this;

    a: INode;
    b: INode;
    op: string;
    ifNode: INode | undefined;
    elseNode: INode | undefined;
    nodeType: string;

    getCondType(builder: INodeBuilder): string;
    copy(source: ICondNode): this;

    EQUAL: string;
    NOT_EQUAL: string;
    GREATER: string;
    GREATER_EQUAL: string;
    LESS: string;
    LESS_EQUAL: string;
    AND: string;
    OR: string;
}

export interface ICheckerNode extends ITempNode {
    new(uv?: IUVNode | IUVTransformNode) : this;

    uv: IUVNode | IUVTransformNode;
    nodeType: string;

    copy(source: ICheckerNode): this;

    Nodes: {
        checker: IFunctionNode;
    };
}

export interface ITextureCubeUVNode extends ITempNode {
    new(uv: INode, textureSize: IFloatNode) : this;

    uv: INode;
    textureSize: IFloatNode;
    nodeType: string;

    Nodes: {
        TextureCubeUVData: IStructNode;
        textureCubeUV: IFunctionNode;
    };
}

export interface ITextureCubeNode extends ITempNode {
    new(value: ITextureNode, textureSize?: IFloatNode) : this;

    value: ITextureNode;
    textureSize: IFloatNode;
    radianceCache: {
        uv: ITextureCubeUVNode;
    };
    irradianceCache: {
        uv: ITextureCubeUVNode;
    };
    nodeType: string;

    generateTextureCubeUV(builder: INodeBuilder, output: string): string;
}

export interface IBumpMapNode extends ITempNode {
    new(value: ITextureNode, scale?: IFloatNode) : this;

    value: ITextureNode;
    scale: IFloatNode;
    toNormalMap: boolean;
    nodeType: string;

    copy(source: IBumpMapNode): this;

    Nodes: {
        dHdxy_fwd: IFunctionNode;
        perturbNormalArb: IFunctionNode;
        bumpToNormal: IFunctionNode;
    };
}

export interface IBypassNode extends INode {
    new(code: INode, value?: INode) : this;

    code: INode;
    value: INode | undefined;
    nodeType: string;

    copy(source: IBypassNode): this;
}

export interface IJoinNode extends ITempNode {
    new(x: INode, y: INode, z?: INode, w?: INode) : this;

    x: INode;
    y: INode;
    z: INode | undefined;
    w: INode | undefined;
    nodeType: string;

    getNumElements(): number;
    copy(source: IJoinNode): this;
}

export interface ISwitchNode extends INode {
    new(node: INode, components?: string) : this;

    node: INode;
    components: string;
    nodeType: string;

    copy(source: ISwitchNode): this;
}

export interface ITimerNode extends IFloatNode {
    new(scale?: number, scope?: string, timeScale?: boolean) : this;

    scale: number;
    scope: string;
    timeScale: boolean;
    nodeType: string;

    getUnique(): boolean;
    updateFrame(frame: INodeFrame): void;
    copy(source: ITimerNode): this;

    GLOBAL: string;
    LOCAL: string;
    DELTA: string;
}

export interface IVelocityNodeParams {
    damping: number;
    spring: number;
    type: string;
}

export interface IVelocityNode extends IVector3Node {
    new(target: IObject3D, params?: IVelocityNodeParams) : this;

    velocity: IVector3;
    moment: IVector3 | undefined;
    speed: IVector3 | undefined;
    springVelocity: IVector3 | undefined;
    lastVelocity: IVector3 | undefined;

    nodeType: string;

    setParams(params: IVelocityNodeParams): void;
    setTarget(target: IObject3D): void;
    updateFrameVelocity(frame: INodeFrame): void;
    updateFrame(frame: INodeFrame): void;
    copy(source: IVelocityNode): this;
}

export interface IMaxMIPLevelNode extends IFloatNode {
    new(texture: INode) : this;

    texture: INode;
    maxMIPLevel: number;
    nodeType: string;
    value: number;
}

export interface ISpecularMIPLevelNode extends ITempNode {
    new(texture: INode) : this;

    texture: INode;
    maxMIPLevel: IMaxMIPLevelNode;
    nodeType: string;

    copy(source: ISpecularMIPLevelNode): this;

    Nodes: {
        getSpecularMIPLevel: IFunctionNode;
    };
}


export interface IColorSpaceNode extends ITempNode {
    new(input: INode, method?: string) : this;

    input: INode;
    method: string | undefined;
    nodeType: string;

    fromEncoding(encoding: number): void;
    fromDecoding(encoding: number): void;
    copy(source: IColorSpaceNode): this;

    Nodes: {
        LinearToLinear: IFunctionNode;
        GammaToLinear: IFunctionNode;
        LinearToGamma: IFunctionNode;
        sRGBToLinear: IFunctionNode;
        LinearTosRGB: IFunctionNode;
        RGBEToLinear: IFunctionNode;
        LinearToRGBE: IFunctionNode;
        RGBMToLinear: IFunctionNode;
        LinearToRGBM: IFunctionNode;
        RGBDToLinear: IFunctionNode;
        LinearToRGBD: IFunctionNode;
        cLogLuvM: IFunctionNode;
        LinearToLogLuv: IFunctionNode;
        cLogLuvInverseM: IFunctionNode;
        LogLuvToLinear: IFunctionNode;
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

export interface IBlurNode extends ITempNode {
    new(value: ITextureNode, uv?: IUVNode, radius?: number, size?: IVector2) : this;

    value: ITextureNode;
    uv: IUVNode;
    radius: IVector2Node;
    size: IVector2;
    blurX: boolean;
    blurY: boolean;
    horizontal: IFloatNode;
    vertical: IFloatNode;
    nodeType: string;

    updateFrame(frame: INodeFrame): void;
    copy(source: IBlurNode): this;

    Nodes: {
        blurX: IFunctionNode;
        blurY: IFunctionNode;
    };
}

export interface IColorAdjustmentNode extends ITempNode {
    new(rgb: INode, adjustment?: IFloatNode, method?: string) : this;

    rgb: INode;
    adjustment: IFloatNode | undefined;
    method: string;
    nodeType: string;

    copy(source: IColorAdjustmentNode): this;

    Nodes: {
        hue: IFunctionNode;
        saturation: IFunctionNode;
        vibrance: IFunctionNode;
    };

    SATURATION: string;
    HUE: string;
    VIBRANCE: string;
    BRIGHTNESS: string;
    CONTRAST: string;
}

export interface ILuminanceNode extends ITempNode {
    new(rgb: INode) : this;

    rgb: INode;
    nodeType: string;

    copy(source: ILuminanceNode): this;

    Nodes: {
        LUMA: IConstNode;
        luminance: IFunctionNode;
    };
}

export interface IBasicNode extends INode {
    new() : this;

    position: INode;
    color: INode;
    alpha: INode;
    mask: INode;
    nodeType: string;

    build(builder: INodeBuilder): string;
    copy(source: IBasicNode): this;
}

export interface ISpriteNode extends INode {
    new() : this;

    color: INode;
    spherical: true;
    nodeType: string;

    build(builder: INodeBuilder): string;
    copy(source: ISpriteNode): this;
}

export interface IPhongNode extends INode {
    new() : this;

    color: INode;
    specular: INode;
    shininess: INode;
    nodeType: string;

    build(builder: INodeBuilder): string;
    copy(source: IPhongNode): this;
}

export interface IStandardNode extends INode {
    new() : this;

    color: INode;
    roughness: INode;
    metalness: INode;
    nodeType: string;
    sheenColor: INode;

    build(builder: INodeBuilder): string;
    copy(source: IStandardNode): this;
}

export interface IMeshStandardNode extends IStandardNode {
    new() : this;

    properties: {
        color: IColor;
        roughness: number;
        metalness: number;
        normalScale: IVector2;
    };

    inputs: {
        color: IPropertyNode;
        roughness: IPropertyNode;
        metalness: IPropertyNode;
        normalScale: IPropertyNode;
    };

    build(builder: INodeBuilder): string;
}

export interface IBasicNodeMaterial extends INodeMaterial {
    new() : this;

    color: INode;
    alpha: INode;
    mask: INode;
    position: INode;
}

export interface ISpriteNodeMaterial extends INodeMaterial {
    new() : this;

    color: INode;
    alpha: INode;
    mask: INode;
    position: INode;
    spherical: INode;
}

export interface IPhongNodeMaterial extends INodeMaterial {
    new() : this;

    color: INode;
    alpha: INode;
    specular: INode;
    shininess: INode;
    normal: INode;
    emissive: INode;
    ambient: INode;
    light: INode;
    shadow: INode;
    ao: INode;
    environment: INode;
    environmentAlpha: INode;
    mask: INode;
    position: INode;
}

export interface IStandardNodeMaterial extends INodeMaterial {
    new() : this;

    color: INode;
    alpha: INode;
    roughness: INode;
    metalness: INode;
    reflectivity: INode;
    clearcoat: INode;
    clearcoatRoughness: INode;
    clearcoatNormal: INode;
    normal: INode;
    emissive: INode;
    ambient: INode;
    light: INode;
    shadow: INode;
    ao: INode;
    environment: INode;
    mask: INode;
    position: INode;
    sheenColor: INode;
}

export interface IMeshStandardNodeMaterial extends INodeMaterial {
    new() : this;

    color: IColor | INode;
    roughness: number | INode;
    metalness: number | INode;
    map: ITexture | INode;
    normalMap: ITexture | INode;
    normalScale: IVector2 | INode;
    metalnessMap: ITexture | INode;
    roughnessMap: ITexture | INode;
    envMap: ICubeTexture | INode;
}

export interface INodePostProcessing {
    new(renderer: IWebGLRenderer, renderTarget?: IWebGLRenderTarget) : this;

    renderer: IWebGLRenderer;
    renderTarget: IWebGLRenderTarget;

    output: IScreenNode;
    material: INodeMaterial;

    camera: IOrthographicCamera;
    scene: IScene;

    quad: IMesh;
    needsUpdate: boolean;

    render(scene: IScene, camera: ICamera, frame: INodeFrame): void;
    setSize(width: number, height: number): void;
    copy(source: INodePostProcessing): this;
    toJSON(meta?: object | string): object;
}


export interface IUVTransformNode extends IExpressionNode {
    new(uv?: IUVNode, position?: IMatrix3Node) : this;

    uv: IUVNode;
    position: IMatrix3Node;

    nodeType: string;

    setUvTransform(tx: number, ty: number, sx: number, sy: number, rotation: number, cx?: number, cy?: number): void;
    copy(source: IUVTransformNode): this;
}

export interface ITextureNode extends IInputNode {
    new(value: ITexture, uv?: IUVNode | IUVTransformNode, bias?: INode, project?: boolean) : this;

    value: ITexture;
    uv: IUVNode | IUVTransformNode;
    bias: INode;
    project: boolean;
    nodeType: string;

    getTexture(builder: INodeBuilder, output: string): string;
    copy(source: ITextureNode): this;
}

export interface IVector2Node extends IInputNode {
    new(x: IVector2 | number, y?: number) : this;

    value: IVector2;
    nodeType: string;

    generateReadonly(
        builder: INodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: IVector2Node): this;
}

export interface IVector3Node extends IInputNode {
    new(x: IVector3 | number, y?: number, z?: number) : this;

    value: IVector3;
    nodeType: string;

    generateReadonly(
        builder: INodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: IVector3Node): this;
}

export interface IVector4Node extends IInputNode {
    new(x: IVector4 | number, y?: number, z?: number, w?: number) : this;

    value: IVector4;
    nodeType: string;

    generateReadonly(
        builder: INodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: IVector4Node): this;
}

export interface IColorNode extends IInputNode {
    new(color: TColorRepresentation, g?: number, b?: number) : this;

    value: IColor;
    nodeType: string;

    generateReadonly(
        builder: INodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: IColorNode): this;
}



export interface INormalMapNode extends ITempNode {
    new(value: ITextureNode, scale?: IVector2Node) : this;

    value: ITextureNode;
    scale: IVector2Node;
    toNormalMap: boolean;
    nodeType: string;

    copy(source: INormalMapNode): this;

    Nodes: {
        perturbNormal2Arb: IFunctionNode;
    };
}

export interface IOperatorNode extends ITempNode {
    new(a: INode, b: INode, op: string) : this;

    a: INode;
    b: INode;
    op: string;

    copy(source: IOperatorNode): this;

    ADD: string;
    SUB: string;
    MUL: string;
    DIV: string;
}

export interface INodeMaterialBuildParams {
    builder?: INodeBuilder;
    renderer?: IWebGLRenderer;
}

export interface INodeUniformParams {
    name?: string;
    type?: string;
    node?: INode;
    needsUpdate?: boolean;
}

export interface INodeUniform {
    new(params?: INodeUniformParams):this;
    name: string | undefined;
    type: string | undefined;
    node: INode | undefined;
    needsUpdate: boolean | undefined;
    value: any;
}

export interface INodeFrame {
    new(time: number) : this;
    time: number;
    id: number;
    delta: number | undefined;
    renderer: IWebGLRenderer | undefined;
    renderTexture: ITexture | undefined;

    update(delta: number): this;
    setRenderer(renderer: IWebGLRenderer): this;
    setRenderTexture(renderTexture: ITexture): this;
    updateNode(node: INode): this;
}

export interface IRawNode extends INode {
    new(value: INode) : this;

    value: INode;
    nodeType: string;

    copy(source: IRawNode): this;
}


export interface INodeMaterial extends IShaderMaterial {
    new(vertex: INode, fragment: INode) : this;

    vertex: INode | IRawNode;
    fragment: INode | IRawNode;

    updaters: object[];

    readonly isNodeMaterial: true;
    properties: object;

    updateFrame(frame: INodeFrame): void;
    build(params?: INodeMaterialBuildParams): this;
    getHash(): string;
    copy(source: INodeMaterial): this;
}


/**
 * This is a superefficent class for geometries because it saves all data in buffers.
 * It reduces memory costs and cpu cycles. But it is not as easy to work with because of all the necessary buffer calculations.
 * It is mainly interesting when working with static objects.
 *
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/BufferGeometry.js|src/core/BufferGeometry.js}
 */
export interface IBufferGeometry extends IEventDispatcher {
	new (): this;
	/**
	 * Unique number of this buffergeometry instance
	 */
	id: number;
	uuid: string;

	/**
	 * @default ''
	 */
	name: string;

	/**
	 * @default 'BufferGeometry'
	 */
	type: string;

	/**
	 * @default null
	 */
	index: IBufferAttribute | null;

	/**
	 * @default {}
	 */
	attributes: {
		[name: string]: IBufferAttribute | IInterleavedBufferAttribute;
	};

	/**
	 * @default {}
	 */
	morphAttributes: {
		[name: string]: Array<IBufferAttribute | IInterleavedBufferAttribute>;
	};

	/**
	 * @default false
	 */
	morphTargetsRelative: boolean;

	/**
	 * @default []
	 */
	groups: Array<{
		start: number;
		count: number;
		materialIndex?: number | undefined;
	}>;

	/**
	 * @default null
	 */
	boundingBox: IBox3 | null;

	/**
	 * @default null
	 */
	boundingSphere: ISphere | null;

	/**
	 * @default { start: 0, count: Infinity }
	 */
	drawRange: { start: number; count: number };

	/**
	 * @default {}
	 */
	userData: { [key: string]: any };
	readonly isBufferGeometry: true;

	getIndex(): IBufferAttribute | null;
	setIndex(index: IBufferAttribute | number[] | null): IBufferGeometry;

	setAttribute(
		name: O3JS.BuiltinShaderAttributeName | (string & {}),
		attribute: IBufferAttribute | IInterleavedBufferAttribute
	): IBufferGeometry;
	getAttribute(name: O3JS.BuiltinShaderAttributeName | (string & {})): IBufferAttribute | IInterleavedBufferAttribute;
	deleteAttribute(name: O3JS.BuiltinShaderAttributeName | (string & {})): IBufferGeometry;
	hasAttribute(name: O3JS.BuiltinShaderAttributeName | (string & {})): boolean;

	addGroup(start: number, count: number, materialIndex?: number): void;
	clearGroups(): void;

	setDrawRange(start: number, count: number): void;

	/**
	 * Bakes matrix transform directly into vertex coordinates.
	 */
	applyMatrix4(matrix: IMatrix4): IBufferGeometry;
	applyQuaternion(q: IQuaternion | O3JS.Quaternion): IBufferGeometry;

	rotateX(angle: number): IBufferGeometry;
	rotateY(angle: number): IBufferGeometry;
	rotateZ(angle: number): IBufferGeometry;
	translate(x: number, y: number, z: number): IBufferGeometry;
	scale(x: number, y: number, z: number): IBufferGeometry;
	lookAt(v: IVector3 | O3JS.Vector3): void;

	center(): IBufferGeometry;

	setFromPoints(points: (IVector3 | O3JS.Vector3)[] | (IVector2 | O3JS.Vector2)[]): IBufferGeometry;

	/**
	 * Computes bounding box of the geometry, updating Geometry.boundingBox attribute.
	 * Bounding boxes aren't computed by default. They need to be explicitly computed, otherwise they are null.
	 */
	computeBoundingBox(): void;

	/**
	 * Computes bounding sphere of the geometry, updating Geometry.boundingSphere attribute.
	 * Bounding spheres aren't' computed by default. They need to be explicitly computed, otherwise they are null.
	 */
	computeBoundingSphere(): void;

	/**
	 * Computes and adds tangent attribute to this geometry.
	 */
	computeTangents(): void;

	/**
	 * Computes vertex normals by averaging face normals.
	 */
	computeVertexNormals(): void;

	merge(geometry: IBufferGeometry, offset?: number): IBufferGeometry;
	normalizeNormals(): void;

	toNonIndexed(): IBufferGeometry;

	toJSON(): any;
	clone(): IBufferGeometry;
	copy(source: IBufferGeometry): this;

	/**
	 * Disposes the object from memory.
	 * You need to call this when you want the bufferGeometry removed while the application is running.
	 */
	dispose(): void;

	/**
	 * @deprecated Use {@line THREE.BufferGeometry#groups .groups} instead.
	 */
	drawcalls: any;

	/**
	 * @deprecated Use {@line THREE.BufferGeometry#groups .groups} instead.
	 */
	offsets: any;

	/**
	 * @deprecated Use {@line THREE.BufferGeometry#setIndex .setIndex()} instead.
	 */
	addIndex(index: any): void;

	/**
	 * @deprecated Use {@line THREE.BufferGeometry#addGroup .addGroup()} instead.
	 */
	addDrawCall(start: any, count: any, indexOffset?: any): void;

	/**
	 * @deprecated Use {@line THREE.BufferGeometry#clearGroups .clearGroups()} instead.
	 */
	clearDrawCalls(): void;

	/**
	 * @deprecated Use {@line THREE.BufferGeometry#setAttribute .setAttribute()} instead.
	 */
	addAttribute(name: string, attribute: IBufferAttribute | IInterleavedBufferAttribute): IBufferGeometry;
	addAttribute(name: any, array: any, itemSize: any): any;

	/**
	 * @deprecated Use {@line THREE.BufferGeometry#deleteAttribute .deleteAttribute()} instead.
	 */
	removeAttribute(name: string): IBufferGeometry;
}

export interface IBoxGeometry extends IBufferGeometry {
	/**
	 * @param [width=1] — Width of the sides on the X axis.
	 * @param [height=1] — Height of the sides on the Y axis.
	 * @param [depth=1] — Depth of the sides on the Z axis.
	 * @param [widthSegments=1] — Number of segmented faces along the width of the sides.
	 * @param [heightSegments=1] — Number of segmented faces along the height of the sides.
	 * @param [depthSegments=1] — Number of segmented faces along the depth of the sides.
	 */
	new (
		width?: number,
		height?: number,
		depth?: number,
		widthSegments?: number,
		heightSegments?: number,
		depthSegments?: number
	): this;

	/**
	 * @default 'BoxGeometry'
	 */
	type: string;

	parameters: {
		width: number;
		height: number;
		depth: number;
		widthSegments: number;
		heightSegments: number;
		depthSegments: number;
	};
}

export interface ICircleGeometry extends IBufferGeometry {
	/**
	 * @param [radius=1]
	 * @param [segments=8]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	new (radius?: number, segments?: number, thetaStart?: number, thetaLength?: number): this;

	/**
	 * @default 'CircleGeometry'
	 */
	type: string;

	parameters: {
		radius: number;
		segments: number;
		thetaStart: number;
		thetaLength: number;
	};
}

export interface IConeGeometry extends ICylinderGeometry {
	/**
	 * @param [radius=1] — Radius of the cone base.
	 * @param [height=1] — Height of the cone.
	 * @param [radialSegments=8] — Number of segmented faces around the circumference of the cone.
	 * @param [heightSegments=1] — Number of rows of faces along the height of the cone.
	 * @param [openEnded=false] — A Boolean indicating whether the base of the cone is open or capped.
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	new (
		radius?: number,
		height?: number,
		radialSegments?: number,
		heightSegments?: number,
		openEnded?: boolean,
		thetaStart?: number,
		thetaLength?: number
	): this;

	/**
	 * @default 'ConeGeometry'
	 */
	type: string;
}

export interface ICylinderGeometry extends IBufferGeometry {
	/**
	 * @param [radiusTop=1] — Radius of the cylinder at the top.
	 * @param [radiusBottom=1] — Radius of the cylinder at the bottom.
	 * @param [height=1] — Height of the cylinder.
	 * @param [radialSegments=8] — Number of segmented faces around the circumference of the cylinder.
	 * @param [heightSegments=1] — Number of rows of faces along the height of the cylinder.
	 * @param [openEnded=false] - A Boolean indicating whether or not to cap the ends of the cylinder.
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	new (
		radiusTop?: number,
		radiusBottom?: number,
		height?: number,
		radialSegments?: number,
		heightSegments?: number,
		openEnded?: boolean,
		thetaStart?: number,
		thetaLength?: number
	): this;

	/**
	 * @default 'CylinderGeometry'
	 */
	type: string;

	parameters: {
		radiusTop: number;
		radiusBottom: number;
		height: number;
		radialSegments: number;
		heightSegments: number;
		openEnded: boolean;
		thetaStart: number;
		thetaLength: number;
	};
}

export interface IDodecahedronGeometry extends IPolyhedronGeometry {
	/**
	 * @param [radius=1]
	 * @param [detail=0]
	 */
	new (radius?: number, detail?: number): this;

	/**
	 * @default 'DodecahedronGeometry'
	 */
	type: string;
}

export interface IEdgesGeometry<TBufferGeometry extends IBufferGeometry = IBufferGeometry> extends IBufferGeometry {
	/**
	 * @param geometry
	 * @param [thresholdAngle=1]
	 */
	new (geometry?: TBufferGeometry, thresholdAngle?: number): this;

	/**
	 * @default 'EdgesGeometry'
	 */
	type: string;

	parameters: {
		geometry: TBufferGeometry;
		thresholdAngle: number;
	};
}

export interface IIcosahedronGeometry extends IPolyhedronGeometry {
	/**
	 * @param [radius=1]
	 * @param [detail=0]
	 */
	new (radius?: number, detail?: number): this;

	/**
	 * @default 'IcosahedronGeometry'
	 */
	type: string;
}

export interface ILatheGeometry extends IBufferGeometry {
	/**
	 * @param points
	 * @param [segments=12]
	 * @param [phiStart=0]
	 * @param [phiLength=Math.PI * 2]
	 */
	new (points?: (IVector2 | O3JS.Vector2)[], segments?: number, phiStart?: number, phiLength?: number): this;

	/**
	 * @default 'LatheGeometry'
	 */
	type: string;

	parameters: {
		points: (IVector2 | O3JS.Vector2)[];
		segments: number;
		phiStart: number;
		phiLength: number;
	};
}

export interface IOctahedronGeometry extends IPolyhedronGeometry {
	/**
	 * @param [radius=1]
	 * @param [detail=0]
	 */
	new (radius?: number, detail?: number): this;

	/**
	 * @default 'OctahedronGeometry'
	 */
	type: string;
}

export interface IPlaneGeometry extends IBufferGeometry {
	/**
	 * @param [width=1] — Width of the sides on the X axis.
	 * @param [height=1] — Height of the sides on the Y axis.
	 * @param [widthSegments=1] — Number of segmented faces along the width of the sides.
	 * @param [heightSegments=1] — Number of segmented faces along the height of the sides.
	 */
	new (width?: number, height?: number, widthSegments?: number, heightSegments?: number): this;

	/**
	 * @default 'PlaneGeometry'
	 */
	type: string;

	parameters: {
		width: number;
		height: number;
		widthSegments: number;
		heightSegments: number;
	};
}

export interface IPolyhedronGeometry extends IBufferGeometry {
	/**
	 * @param vertices
	 * @param indices
	 * @param [radius=1]
	 * @param [detail=0]
	 */
	new (vertices?: number[], indices?: number[], radius?: number, detail?: number): this;

	/**
	 * @default 'PolyhedronGeometry'
	 */
	type: string;

	parameters: {
		vertices: number[];
		indices: number[];
		radius: number;
		detail: number;
	};
}

export interface IExtrudeGeometryOptions {
	/**
	 * @default 12
	 */
	curveSegments?: number | undefined;
	/**
	 * @default 1
	 */
	steps?: number | undefined;
	/**
	 * @default 100
	 */
	depth?: number | undefined;
	/**
	 * @default true
	 */
	bevelEnabled?: boolean | undefined;
	/**
	 * @default 6
	 */
	bevelThickness?: number | undefined;
	bevelSize?: number | undefined;
	/**
	 * @default 0
	 */
	bevelOffset?: number | undefined;
	/**
	 * @default 3
	 */
	bevelSegments?: number | undefined;
	extrudePath?: ICurve<IVector3> | undefined;
	UVGenerator?: IUVGenerator | undefined;
}

export interface IExtrudeGeometry extends IBufferGeometry {
	new (shapes?: IShape | IShape[], options?: IExtrudeGeometryOptions): this;
	/**
	 * @default 'ExtrudeGeometry'
	 */
	type: string;

	addShapeList(shapes: IShape[], options?: any): void;
	addShape(shape: IShape, options?: any): void;
}

export interface IRingGeometry extends IBufferGeometry {
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [thetaSegments=8]
	 * @param [phiSegments=1]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	new (
		innerRadius?: number,
		outerRadius?: number,
		thetaSegments?: number,
		phiSegments?: number,
		thetaStart?: number,
		thetaLength?: number
	): this;

	/**
	 * @default 'RingGeometry'
	 */
	type: string;

	parameters: {
		innerRadius: number;
		outerRadius: number;
		thetaSegments: number;
		phiSegments: number;
		thetaStart: number;
		thetaLength: number;
	};
}

export interface IShapeGeometry extends IBufferGeometry {
	new (shapes?: IShape | IShape[], curveSegments?: number): this;

	/**
	 * @default 'ShapShapeGeometryeBufferGeometry'
	 */
	type: string;

	new (shapes?: IShape | IShape[], curveSegments?: number): this;
}

export interface ISphereGeometry extends IBufferGeometry {
	/**
	 * @param [radius=50] — sphere radius. Default is 50.
	 * @param [widthSegments=8] — number of horizontal segments. Minimum value is 3, and the default is 8.
	 * @param [heightSegments=6] — number of vertical segments. Minimum value is 2, and the default is 6.
	 * @param [phiStart=0] — specify horizontal starting angle. Default is 0.
	 * @param [phiLength=Math.PI * 2] — specify horizontal sweep angle size. Default is Math.PI * 2.
	 * @param [thetaStart=0] — specify vertical starting angle. Default is 0.
	 * @param [thetaLength=Math.PI * 2] — specify vertical sweep angle size. Default is Math.PI.
	 */
	new (
		radius?: number,
		widthSegments?: number,
		heightSegments?: number,
		phiStart?: number,
		phiLength?: number,
		thetaStart?: number,
		thetaLength?: number
	): this;

	/**
	 * @default 'SphereGeometry'
	 */
	type: string;

	parameters: {
		radius: number;
		widthSegments: number;
		heightSegments: number;
		phiStart: number;
		phiLength: number;
		thetaStart: number;
		thetaLength: number;
	};
}

export interface ITetrahedronGeometry extends IPolyhedronGeometry {
	/**
	 * @param [radius=1]
	 * @param [detail=0]
	 */
	new (radius?: number, detail?: number): this;

	/**
	 * @default 'TetrahedronGeometry'
	 */
	type: string;
}

export interface ITorusGeometry extends IBufferGeometry {
	/**
	 * @param [radius=1]
	 * @param [tube=0.4]
	 * @param [radialSegments=8]
	 * @param [tubularSegments=6]
	 * @param [arc=Math.PI * 2]
	 */
	new (radius?: number, tube?: number, radialSegments?: number, tubularSegments?: number, arc?: number): this;

	/**
	 * @default 'TorusGeometry'
	 */
	type: string;

	parameters: {
		radius: number;
		tube: number;
		radialSegments: number;
		tubularSegments: number;
		arc: number;
	};
}

export interface ITorusKnotGeometry extends IBufferGeometry {
	/**
	 * @param [radius=1]
	 * @param [tube=0.4]
	 * @param [radialSegments=64]
	 * @param [tubularSegments=8]
	 * @param [p=2]
	 * @param [q=3]
	 */
	new (radius?: number, tube?: number, tubularSegments?: number, radialSegments?: number, p?: number, q?: number): this;

	/**
	 * @default 'TorusKnotGeometry'
	 */
	type: string;

	parameters: {
		radius: number;
		tube: number;
		tubularSegments: number;
		radialSegments: number;
		p: number;
		q: number;
	};
}

export interface ITubeGeometry extends IBufferGeometry {
	/**
	 * @param path
	 * @param [tubularSegments=64]
	 * @param [radius=1]
	 * @param [radiusSegments=8]
	 * @param [closed=false]
	 */
	new (
		path?: ICurve<IVector3>,
		tubularSegments?: number,
		radius?: number,
		radiusSegments?: number,
		closed?: boolean
	): this;

	/**
	 * @default 'TubeGeometry'
	 */
	type: string;

	parameters: {
		path: ICurve<IVector3>;
		tubularSegments: number;
		radius: number;
		radialSegments: number;
		closed: boolean;
	};
	tangents: (IVector3 | O3JS.Vector3)[];
	normals: (IVector3 | O3JS.Vector3)[];
	binormals: (IVector3 | O3JS.Vector3)[];
}

export interface IWireframeGeometry<TBufferGeometry extends IBufferGeometry = IBufferGeometry> extends IBufferGeometry {
	new (geometry?: TBufferGeometry): this;

	/**
	 * @default 'WireframeGeometry'
	 */
	type: string;

	parameters: {
		geometry: TBufferGeometry;
	};
}

export interface ILineSegmentsGeometry extends IInstancedBufferGeometry {
	new (): this;
	readonly isLineSegmentsGeometry: true;

	applyMatrix4(matrix: IMatrix4): this;
	computeBoundingBox(): void;
	computeBoundingSphere(): void;
	fromEdgesGeometry(geometry: IEdgesGeometry): this;
	fromLineSegments(lineSegments: ILineSegments): this;
	fromMesh(mesh: IMesh): this;
	fromWireframeGeometry(geometry: IWireframeGeometry): this;
	setColors(array: number[] | Float32Array): this;
	setPositions(array: number[] | Float32Array): this;
}

export interface IWireframeGeometry2 extends ILineSegmentsGeometry {
	new (geometry: IBufferGeometry): this;
	readonly sWireframeGeometry2: boolean;
}

export interface IWireframeGeometry2 extends ILineSegmentsGeometry {
	new (geometry: IBufferGeometry): this;
	readonly sWireframeGeometry2: boolean;
}

export interface IBoxLineGeometry extends IBufferGeometry {
	new (
		width?: number,
		height?: number,
		depth?: number,
		widthSegments?: number,
		heightSegments?: number,
		depthSegments?: number
	): this;
}

export interface IConvexGeometry extends IBufferGeometry {
	new (points: IVector3[]): this;
}

export interface IDecalGeometry extends IBufferGeometry {
	new (mesh: IMesh, position: IVector3, orientation: IEuler, size: IVector3): this;
}

export interface IDecalVertex {
	new (position: IVector3, normal: IVector3): this;
	clone(): this;
}

export interface IRandomGenerator {
	random(): number;
	getSeed(): number;
	setSeed(seed: number): void;
}

export interface ILightningSegment {
	iteration: number;
	pos0: IVector3;
	pos1: IVector3;
	linPos0: IVector3;
	linPos1: IVector3;
	up0: IVector3;
	up1: IVector3;
	radius0: number;
	radius1: number;
	fraction0: number;
	fraction1: number;
	positionVariationFactor: number;
}

export interface ILightningSubray {
	seed: number;
	maxIterations: number;
	recursion: number;
	pos0: IVector3;
	pos1: IVector3;
	linPos0: IVector3;
	linPos1: IVector3;
	up0: IVector3;
	up1: IVector3;
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

export interface IRayParameters {
	sourceOffset?: IVector3;
	destOffset?: IVector3;

	timeScale?: number;
	roughness?: number;
	straightness?: number;

	up0?: IVector3;
	up1?: IVector3;
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

	randomGenerator?: IRandomGenerator;
	noiseSeed?: number;

	onDecideSubrayCreation?: (segment: ILightningSegment, lightningStrike: ILightningStrike) => void;
	onSubrayCreation?: (
		segment: ILightningSegment,
		parentSubray: ILightningSubray,
		childSubray: ILightningSubray,
		lightningStrike: ILightningStrike
	) => void;
}

export interface ILightningStrike {
	new (rayParameters?: IRayParameters): this;
	copyParameters(dest?: IRayParameters, source?: IRayParameters): IRayParameters;
	state: number;
	update(time: number): void;

	copy(source: ILightningStrike): ILightningStrike;
	clone(): this;
}

export interface IParametricGeometry extends IBufferGeometry {
	new (func?: (u: number, v: number, target: IVector3) => void, slices?: number, stacks?: number): this;

	/**
	 * @default 'ParametricGeometry'
	 */
	type: string;

	parameters: {
		func: (u: number, v: number, dest: IVector3) => void;
		slices: number;
		stacks: number;
	};
}

export interface IParametricTubeGeometry extends IParametricGeometry {
	new (path: ICurve<IVector3>, segments?: number, radius?: number, segmentsRadius?: number, closed?: boolean): this;
}

export interface IParametricTorusKnotGeometry extends IParametricTubeGeometry {
	new (radius?: number, tube?: number, segmentsT?: number, segmentsR?: number, p?: number, q?: number): this;
}

export interface IParametricSphereGeometry extends IParametricGeometry {
	new (size: number, u: number, v: number): this;
}

export interface IParametricPlaneGeometry extends IParametricGeometry {
	new (width: number, depth: number, segmentsWidth: number, segmentsDepth: number): this;
}

export interface IParametricGeometries {
	klein(v: number, u: number, target: IVector3): IVector3;
	plane(width: number, height: number): (u: number, v: number, target: IVector3) => IVector3;
	mobius(u: number, t: number, target: IVector3): IVector3;
	mobius3d(u: number, t: number, target: IVector3): IVector3;
	TubeGeometry: IParametricTubeGeometry;
	TorusKnotGeometry: IParametricTorusKnotGeometry;
	SphereGeometry: IParametricSphereGeometry;
	PlaneGeometry: IParametricPlaneGeometry;
}

export interface IRoundedBoxGeometry extends IBoxGeometry {
	new (width?: number, height?: number, depth?: number, segments?: number, radius?: number): this;
}

export interface ITeapotGeometry extends IBufferGeometry {
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

export interface ITextGeometryParameters {
	font: IFont;
	size?: number | undefined;
	height?: number | undefined;
	curveSegments?: number | undefined;
	bevelEnabled?: boolean | undefined;
	bevelThickness?: number | undefined;
	bevelSize?: number | undefined;
	bevelOffset?: number | undefined;
	bevelSegments?: number | undefined;
}

export interface ITextGeometry extends IExtrudeGeometry {
	/**
	 * @default 'TextGeometry'
	 */
	type: string;

	new (text: string, parameters: ITextGeometryParameters): this;

	parameters: {
		font: IFont;
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

export interface ILineGeometry extends ILineSegmentsGeometry {
	new (): this;
	readonly isLineGeometry: true;

	fromLine(line: ILine): this;
}

export interface IRollerCoasterGeometry extends IBufferGeometry {
	new (curve: ICurve<IVector3>, divisions: number): this;
}

export interface IRollerCoasterLiftersGeometry extends IBufferGeometry {
	new (curve: ICurve<IVector3>, divisions: number): this;
}

export interface IRollerCoasterShadowGeometry extends IBufferGeometry {
	new (curve: ICurve<IVector3>, divisions: number): this;
}

export interface IRollerCoasterSkyGeometry extends IBufferGeometry {
	new (curve: ICurve<IVector3>, divisions: number): this;
}

export interface IRollerCoasterTreesGeometry extends IBufferGeometry {
	new (landscape: IMesh): this;
}

/**
 * The Capsule geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCapsuleGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/CapsuleGeometry) page for a live demo.
 *
 */
export interface ICapsuleGeometry extends IBufferGeometry {
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
export interface ICircleDepthGeometry extends IBufferGeometry {
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
export interface IGridGeometry extends IBufferGeometry {
	/**
	 * The Parameters of grid geometry
	 */
	parameters: {
		width: number;
		height: number;
		depth: number;
		widthSegments: number;
		heightSegments: number;
		colorW: IColor;
		colorH: IColor;
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
		colorW?: IColor,
		colorH?: IColor
	): this;
}

export interface IPlaneDepthGeometry extends IBufferGeometry {
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
export interface IPlanePerlinGeometry {
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
	getTerrain(planeWidth: number, planeHeight: number, planeDepth: number): IBufferGeometry;
	/**
	 * Gets minecraft
	 * @param planeWidth
	 * @param planeHeight
	 * @param planeDepth
	 * @returns minecraft
	 */
	getMinecraft(planeWidth: number, planeHeight: number, planeDepth: number): IBufferGeometry;
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
		light: IColor,
		shadow: IColor
	): IBufferGeometry;
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
		planeGeometry: IBufferGeometry,
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
		colors?: IColor[]
	): IBufferGeometry;
	/**
	 * Gets texture
	 * @param sun
	 * @param color
	 * @param add
	 * @returns texture
	 */
	getTexture(sun: IVector3, color: IColor, add: IColor): HTMLCanvasElement;
}

/**
 * The RingDepth geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRingDepthGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/RingDepthGeometry) page for a live demo.
 *
 */
export interface IRingDepthGeometry extends IBufferGeometry {
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
export interface IRopeGeometry extends IBufferGeometry {
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
export interface IStarDepthGeometry extends IBufferGeometry {
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
export interface IOutlineGeometry extends IWireframeGeometry {
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [segments=5]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	new (geometry: IBufferGeometry, scale?: number): this;
}

/**
 * The Star geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxStarGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/StarGeometry) page for a live demo.
 *
 */
export interface IStarGeometry extends ICircleGeometry {
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [segments=5]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	new (innerRadius?: number, outerRadius?: number, segments?: number, thetaStart?: number, thetaLength?: number): this;
}

export interface IEdgeSplitModifier {
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
	modify(geometry: IBufferGeometry, cutOffPoint: number, tryKeepNormals: boolean): IBufferGeometry;
}

export interface ISimplifyModifier {
	new (): this;
	modify(geometry: IBufferGeometry, count: number): IBufferGeometry;
}

export interface IGeometryCompressionUtils {
	compressNormals(mesh: IMesh, encodeMethod: string): void;
	compressPositions(mesh: IMesh): void;
	compressUvs(mesh: IMesh): void;
}

export interface ITessellateModifier {
	new (maxEdgeLength?: number, maxIterations?: number): this;
	maxEdgeLength: number;
	maxIterations: number;

	modify<TGeometry extends IBufferGeometry>(geometry: TGeometry): TGeometry;
}

export interface IGroup extends IObject3D {
	type: 'Group';
	readonly isGroup: true;
}

export interface IRay {
	new (origin?: IVector3 | O3JS.Vector3, direction?: IVector3 | O3JS.Vector3): this;

	/**
	 * @default new IVector3()
	 */
	origin: IVector3;

	/**
	 * @default new IVector3( 0, 0, - 1 )
	 */
	direction: IVector3;

	set(origin: IVector3 | O3JS.Vector3, direction: IVector3 | O3JS.Vector3): IRay;
	clone(): this;
	copy(ray: IRay): this;
	at(t: number, target: IVector3 | O3JS.Vector3): IVector3;
	lookAt(v: IVector3 | O3JS.Vector3): IRay;
	recast(t: number): IRay;
	closestPointToPoint(point: IVector3 | O3JS.Vector3, target: IVector3 | O3JS.Vector3): IVector3;
	distanceToPoint(point: IVector3 | O3JS.Vector3): number;
	distanceSqToPoint(point: IVector3 | O3JS.Vector3): number;
	distanceSqToSegment(
		v0: IVector3 | O3JS.Vector3,
		v1: IVector3 | O3JS.Vector3,
		optionalPointOnRay?: IVector3 | O3JS.Vector3,
		optionalPointOnSegment?: IVector3 | O3JS.Vector3
	): number;
	intersectSphere(sphere: ISphere, target: IVector3 | O3JS.Vector3): IVector3 | null;
	intersectsSphere(sphere: ISphere): boolean;
	distanceToPlane(plane: IPlane): number;
	intersectPlane(plane: IPlane, target: IVector3 | O3JS.Vector3): IVector3 | null;
	intersectsPlane(plane: IPlane): boolean;
	intersectBox(box: IBox3, target: IVector3 | O3JS.Vector3): IVector3 | null;
	intersectsBox(box: IBox3): boolean;
	intersectTriangle(
		a: IVector3 | O3JS.Vector3,
		b: IVector3 | O3JS.Vector3,
		c: IVector3 | O3JS.Vector3,
		backfaceCulling: boolean,
		target: IVector3 | O3JS.Vector3
	): IVector3 | null;
	applyMatrix4(matrix4: IMatrix4 | O3JS.Matrix4): IRay;
	equals(ray: IRay): boolean;

	/**
	 * @deprecated Use {@line THREE.Ray#intersectsBox .intersectsBox()} instead.
	 */
	isIntersectionBox(b: any): any;

	/**
	 * @deprecated Use {@line THREE.Ray#intersectsPlane .intersectsPlane()} instead.
	 */
	isIntersectionPlane(p: any): any;

	/**
	 * @deprecated Use {@line THREE.Ray#intersectsSphere .intersectsSphere()} instead.
	 */
	isIntersectionSphere(s: any): any;
}

export interface IFace {
	a: number;
	b: number;
	c: number;
	normal: IVector3;
	materialIndex: number;
}

export interface IIntersection<TIntersected extends IObject3D = IObject3D> {
	distance: number;
	distanceToRay?: number | undefined;
	point: IVector3;
	index?: number | undefined;
	face?: IFace | null | undefined;
	faceIndex?: number | undefined;
	object: TIntersected;
	uv?: IVector2 | undefined;
	instanceId?: number | undefined;
}

export interface IRaycaster {
	new (origin?: IVector3 | O3JS.Vector3, direction?: IVector3 | O3JS.Vector3, near?: number, far?: number): this;

	/** The Ray used for the raycasting. */
	ray: IRay;

	/**
	 * The near factor of the raycaster. This value indicates which objects can be discarded based on the
	 * distance. This value shouldn't be negative and should be smaller than the far property.
	 * @default 0
	 */
	near: number;

	/**
	 * The far factor of the raycaster. This value indicates which objects can be discarded based on the
	 * distance. This value shouldn't be negative and should be larger than the near property.
	 * @default Infinity
	 */
	far: number;

	/**
	 * The camera to use when raycasting against view-dependent objects such as billboarded objects like Sprites. This field
	 * can be set manually or is set when calling "setFromCamera".
	 */
	camera: ICamera;

	/**
	 * Used by Raycaster to selectively ignore 3D objects when performing intersection tests.
	 * @default new THREE.Layers()
	 */
	layers: ILayers;

	/**
	 * @default { Mesh: {}, Line: { threshold: 1 }, LOD: {}, Points: { threshold: 1 }, Sprite: {} }
	 */
	params: O3JS.RaycasterParameters;

	/**
	 * Updates the ray with a new origin and direction.
	 * @param origin The origin vector where the ray casts from.
	 * @param direction The normalized direction vector that gives direction to the ray.
	 */
	set(origin: IVector3 | O3JS.Vector3, direction: IVector3 | O3JS.Vector3): void;

	/**
	 * Updates the ray with a new origin and direction.
	 * @param coords 2D coordinates of the mouse, in normalized device coordinates (NDC)---X and Y components should be between -1 and 1.
	 * @param camera camera from which the ray should originate
	 */
	setFromCamera(coords: { x: number; y: number }, camera: ICamera): void;

	/**
	 * Checks all intersection between the ray and the object with or without the descendants. Intersections are returned sorted by distance, closest first.
	 * @param object The object to check for intersection with the ray.
	 * @param recursive If true, it also checks all descendants. Otherwise it only checks intersecton with the object. Default is false.
	 * @param optionalTarget (optional) target to set the result. Otherwise a new Array is instantiated. If set, you must clear this array prior to each call (i.e., array.length = 0;).
	 */
	intersectObject<TIntersected extends IObject3D>(
		object: IObject3D,
		recursive?: boolean,
		optionalTarget?: Array<IIntersection<TIntersected>>
	): Array<IIntersection<TIntersected>>;

	/**
	 * Checks all intersection between the ray and the objects with or without the descendants.
	 * Intersections are returned sorted by distance, closest first.
	 * Intersections are of the same form as those returned by .intersectObject.
	 * @param objects The objects to check for intersection with the ray.
	 * @param recursive If true, it also checks all descendants of the objects. Otherwise it only checks intersecton with the objects. Default is false.
	 * @param optionalTarget (optional) target to set the result. Otherwise a new Array is instantiated. If set, you must clear this array prior to each call (i.e., array.length = 0;).
	 */
	intersectObjects<TIntersected extends IObject3D>(
		objects: IObject3D[],
		recursive?: boolean,
		optionalTarget?: Array<IIntersection<TIntersected>>
	): Array<IIntersection<TIntersected>>;
}

export interface ILoader {
	new (manager?: ILoadingManager): this;
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
	manager: ILoadingManager;

	/**
	 * @default {}
	 */
	requestHeader: { [header: string]: string };

	/*
	load(): void;
	parse(): void;
	*/

	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<any>;

	setCrossOrigin(crossOrigin: string): this;
	setWithCredentials(value: boolean): this;
	setPath(path: string): this;
	setResourcePath(resourcePath: string): this;
	setRequestHeader(requestHeader: { [header: string]: string }): this;
}

/**
 * Handles and keeps track of loaded and pending data.
 */
export interface ILoadingManager {
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
	 * The default is a function with empty body.
	 */
	onLoad: () => void;

	/**
	 * Will be called for each loaded item.
	 * The default is a function with empty body.
	 * @param url The url of the item just loaded.
	 * @param loaded The number of items already loaded so far.
	 * @param total The total amount of items to be loaded.
	 */
	onProgress: (url: string, loaded: number, total: number) => void;

	/**
	 * Will be called when item loading fails.
	 * The default is a function with empty body.
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

	itemStart(url: string): void;
	itemEnd(url: string): void;
	itemError(url: string): void;

	// handlers

	addHandler(regex: RegExp, loader: ILoader): this;
	removeHandler(regex: RegExp): this;
	getHandler(file: string): ILoader | null;
}

/**
 * A loader for loading an image.
 * Unlike other loaders, this one emits events instead of using predefined callbacks. So if you're interested in getting notified when things happen, you need to add listeners to the object.
 */
export interface IImageLoader extends ILoader {
	load(
		url: string,
		onLoad?: (image: HTMLImageElement) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): HTMLImageElement;

	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<HTMLImageElement>;
}

export interface IAnimationLoader extends ILoader {
	load(
		url: string,
		onLoad: (response: IAnimationClip[]) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IAnimationClip[]>;
	parse(json: any): IAnimationClip[];
}

export interface IAudioLoader extends ILoader {
	load(
		url: string,
		onLoad: (audioBuffer: AudioBuffer) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;

	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<AudioBuffer>;
}

export interface IBufferGeometryLoader extends ILoader {
	load(
		url: string,
		onLoad: (bufferGeometry: IInstancedBufferGeometry | IBufferGeometry) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(
		url: string,
		onProgress?: (event: ProgressEvent) => void
	): Promise<IInstancedBufferGeometry | IBufferGeometry>;
	parse(json: any): IInstancedBufferGeometry | IBufferGeometry;
}

export interface ICompressedTextureLoader extends ILoader {
	load(
		url: string,
		onLoad: (texture: ICompressedTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): ICompressedTexture;

	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ICompressedTexture>;
}

export interface ICubeTextureLoader extends ILoader {
	load(
		urls: string[],
		onLoad?: (texture: ICubeTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): ICubeTexture;

	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ICubeTexture>;
}

export interface IDataTextureLoader extends ILoader {
	load(
		url: string,
		onLoad: (dataTexture: IDataTexture, texData: object) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): IDataTexture;

	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IDataTexture>;
}

export interface IChunk {
	palette: number[];
	size: { x: number; y: number; z: number };
	data: Uint8Array;
}

export interface IVOXMesh extends IMesh {
	new (chunk: IChunk): this;
}

export interface IVOXDataTexture3D extends IDataTexture3D {
	new (chunk: IChunk): this;
}

export interface IVOXLoader extends ILoader {
	load(
		url: string,
		onLoad: (chunks: IChunk[]) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<object[]>;
	parse(data: ArrayBuffer): object[];
}

export interface IVRMLLoader extends ILoader {
	load(
		url: string,
		onLoad: (scene: IScene) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IScene>;
	parse(data: string, path: string): IScene;
}

export interface IVRMLoader extends ILoader {
	gltfLoader: IGLTFLoader;

	load(
		url: string,
		onLoad: (scene: IGLTF) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IGLTF>;
	parse(gltf: IGLTF, onLoad: (scene: IGLTF) => void): void;
	setDRACOLoader(dracoLoader: IDRACOLoader): this;
}

export interface IVTKLoader extends ILoader {
	load(
		url: string,
		onLoad: (geometry: IBufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IBufferGeometry>;
	parse(data: ArrayBuffer | string, path: string): IBufferGeometry;
}

export interface IXYZLoader extends ILoader {
	load(
		url: string,
		onLoad: (geometry: IBufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IBufferGeometry>;
	parse(data: string, onLoad: (geometry: IBufferGeometry) => void): object;
}

export interface IMD2PartsConfig {
	baseUrl: string;
	body: string;
	skins: string[];
	weapons: Array<[string, string]>;
}

export interface IMD2Character {
	new (): this;
	scale: number;
	animationFPS: number;
	root: IObject3D;
	meshBody: IMesh | null;
	meshWeapon: IMesh | null;
	skinsBody: ITexture[];
	skinsWeapon: ITexture[];
	weapons: IMesh[];
	activeAnimation: string | null;
	mixer: IAnimationMixer | null;
	loadCounter: number;

	onLoadComplete(): void;
	loadParts(config: IMD2PartsConfig): void;
	setPlaybackRate(rate: number): void;
	setWireframe(wireframeEnabled: boolean): void;
	setSkin(index: number): void;
	setWeapon(index: number): void;
	setAnimation(clipName: string): void;
	syncWeaponAnimation(): void;
	update(delta: number): void;
}

export interface IMD2CharacterComplex {
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
	root: IObject3D;
	meshBody: IMesh | null;
	meshWeapon: IMesh | null;
	controls: null;
	skinsBody: ITexture[];
	skinsWeapon: ITexture[];
	weapons: IMesh[];
	currentSkin: number;
	onLoadComplete: () => void;

	meshes: IMesh[];
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
	shareParts(original: IMD2CharacterComplex): void;
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

export interface IMMDAnimationHelperParameter {
    sync?: boolean | undefined;
    afterglow?: number | undefined;
    resetPhysicsOnLoop?: boolean | undefined;
}

export interface IMMDAnimationHelperAddParameter {
    animation?: IAnimationClip | IAnimationClip[] | undefined;
    physics?: boolean | undefined;
    warmup?: number | undefined;
    unitStep?: number | undefined;
    maxStepNum?: number | undefined;
    gravity?: number | undefined;
    delayTime?: number | undefined;
}

export interface IMMDAnimationHelperPoseParameter {
    resetPose?: boolean | undefined;
    ik?: boolean | undefined;
    grant?: boolean | undefined;
}

export interface IIKS {
    effector: number;
    iteration: number;
    links: {
        enabled: boolean;
        index: number;
    };
    maxAngle: number;
    target: number;
}

export interface IMMDPhysicsParameter {
    unitStep?: number | undefined;
    maxStepNum?: number | undefined;
    gravity?: IVector3 | undefined;
}

export interface IMMDPhysics {
    new(
        mesh: ISkinnedMesh,
        rigidBodyParams: object[],
        constraintParams?: object[],
        params?: IMMDPhysicsParameter,
    ) : this;
    manager: any;
    mesh: ISkinnedMesh;
    unitStep: number;
    maxStepNum: number;
    gravity: IVector3;
    world: null;
    bodies: any[];
    constraints: any[];

    update(delta: number): this;
    reset(): this;
    warmup(cycles: number): this;
    setGravity(gravity: IVector3): this;
    createHelper(): IMMDPhysicsHelper;
}

export interface IMMDPhysicsHelper extends IObject3D {
    new() : this;
}

export interface ICCDIKSolver {
    new(mesh: ISkinnedMesh, iks: IIKS[]) : this;

    update(): this;
    updateOne(iks: IIKS): this;
    createHelper(): ICCDIKHelper;
}

export interface ICCDIKHelper extends IObject3D {
    new(mesh: ISkinnedMesh, iks: IIKS[]): this;
}

export interface IMMDAnimationHelperMixer {
    looped: boolean;
    mixer?: IAnimationMixer | undefined;
    ikSolver: ICCDIKSolver;
    grantSolver: IGrantSolver;
    physics?: IMMDPhysics | undefined;
    duration?: number | undefined;
}

export interface IMMDAnimationHelper {
    new(params?: IMMDAnimationHelperParameter) : this;
    meshes: ISkinnedMesh[];
    camera: ICamera | null;
    cameraTarget: IObject3D;
    audio: IAudio;
    audioManager: IAudioManager;
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
    objects: WeakMap<ISkinnedMesh | ICamera | IAudioManager, IMMDAnimationHelperMixer>;
    onBeforePhysics: (mesh: ISkinnedMesh) => void;
    sharedPhysics: boolean;
    masterPhysics: null;

    add(object: ISkinnedMesh | ICamera | IAudio, params?: IMMDAnimationHelperAddParameter): this;
    remove(object: ISkinnedMesh | ICamera | IAudio): this;
    update(delta: number): this;
    pose(mesh: ISkinnedMesh, vpd: object, params?: IMMDAnimationHelperPoseParameter): this;
    enable(key: string, enabled: boolean): this;
    createGrantSolver(mesh: ISkinnedMesh): IGrantSolver;
}

export interface IAudioManagerParameter {
    delayTime?: number | undefined;
}

export interface IAudioManager {
    new(audio: IAudio, params?: IAudioManagerParameter) : this;
    audio: IAudio;
    elapsedTime: number;
    currentTime: number;
    delayTime: number;
    audioDuration: number;
    duration: number;

    control(delta: number): this;
}

export interface IGrantSolver {
    new(mesh: ISkinnedMesh, grants: object[]) : this;
    mesh: ISkinnedMesh;
    grants: object[];

    update(): this;
    updateOne(gran: object[]): this;
    addGrantRotation(bone: IBone, q: IQuaternion, ratio: number): this;
}


export interface ICSS2DObject extends IObject3D {
	new (element: HTMLElement): this;
	element: HTMLElement;

	onBeforeRender: (renderer: unknown, scene: IScene, camera: ICamera) => void;
	onAfterRender: (renderer: unknown, scene: IScene, camera: ICamera) => void;
}

export type TCSS2DParameters = {
	element?: HTMLElement;
};

export interface ICSS2DRenderer {
	new (parameters?: TCSS2DParameters): this;
	domElement: HTMLElement;

	getSize(): { width: number; height: number };
	setSize(width: number, height: number): void;
	render(scene: IScene, camera: ICamera): void;
}

export interface ICSS3DObject extends IObject3D {
	new (element: HTMLElement): this;
	element: HTMLElement;

	onBeforeRender: (renderer: unknown, scene: IScene, camera: ICamera) => void;
	onAfterRender: (renderer: unknown, scene: IScene, camera: ICamera) => void;
}

export interface ICSS3DSprite extends ICSS3DObject {
	new (element: HTMLElement): this;
}


export interface IInteractiveGroup extends IGroup {
    new(renderer: IWebGLRenderer, camera: ICamera) : this;
}

export interface ILineSegments2 extends IMesh {
    geometry: ILineSegmentsGeometry;
    material: ILineMaterial;

    new(geometry?: ILineSegmentsGeometry, material?: ILineMaterial) : this;
    readonly isLineSegments2: true;

    computeLineDistances(): this;
}

export interface ILine2 extends ILineSegments2 {
    geometry: ILineGeometry;
    material: ILineMaterial;

    new(geometry?: ILineGeometry, material?: ILineMaterial) : this;
    readonly isLine2: true;
}

export interface IWireframe extends IMesh {
    new(geometry?: ILineSegmentsGeometry, material?: ILineMaterial) : this;
    readonly isWireframe: true;

    computeLineDistances(): this;
}

export interface ITubePainter {
    new() : this;

    mesh: IMesh;

    stroke(position1: IVector3, position2: IVector3, matrix1: IMatrix4, matrix2: IMatrix4): void;
    updateGeometry(start: number, end: number): void;
}

export interface ISplineUniform {
    spineTexture: IUniform;
    pathOffset: IUniform;
    pathSegment: IUniform;
    spineOffset: IUniform;
    flow: IUniform;
}

export interface IFlow {
    new(mesh: IMesh, numberOfCurves?: number) : this;
    curveArray: number[];
    curveLengthArray: number[];
    object3D: IMesh;
    splineTexure: IDataTexture;
    uniforms: ISplineUniform;
    updateCurve(index: number, curve: ICurve<IVector3>): void;
    moveAlongCurve(amount: number): void;
}

export interface IInstancedFlow extends IFlow {
    new(count: number, curveCount: number, geometry: IBufferGeometry, material: IMaterial) : this;
    object3D: IInstancedMesh;
    offsets: number[];
    whichCurve: number[];

    moveIndividualAlongCurve(index: number, offset: number): void;
    setCurve(index: number, curveNo: number): void;
}

export interface IStormParams {
    size?: number;
    minHeight?: number;
    maxHeight?: number;
    maxSlope?: number;

    maxLightnings?: number;

    lightningMinPeriod?: number;
    lightningMaxPeriod?: number;
    lightningMinDuration?: number;
    lightningMaxDuration?: number;

    lightningParameters?: IRayParameters;
    lightningMaterial?: IMaterial;

    isEternal?: boolean;

    onRayPosition?: (source: IVector3, dest: IVector3) => void;
    onLightningDown?: (lightning: ILightningStrike) => void;
}

export interface ILightningStorm {
    new(stormParams?: IStormParams) : this;
    update(time: number): void;
    copy(source: ILightningStorm): ILightningStorm;
    clone(): this;
}

export interface IMarchingCubes extends IMesh {
    new(
        resolution: number,
        material: IMaterial,
        enableUvs?: boolean,
        enableColors?: boolean,
        maxPolyCount?: number,
    ) : this;

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

    addBall(ballx: number, bally: number, ballz: number, strength: number, subtract: number, colors?: IColor): void;

    addPlaneX(strength: number, subtract: number): void;
    addPlaneY(strength: number, subtract: number): void;
    addPlaneZ(strength: number, subtract: number): void;

    setCell(x: number, y: number, z: number, value: number): void;
    getCell(x: number, y: number, z: number): number;

    blur(intensity: number): void;

    reset(): void;
    render(renderCallback: any): void;
    generateGeometry(): IBufferGeometry;
    generateIBufferGeometry(): IBufferGeometry;
}

export interface IRefractorOptions {
    color?: TColorRepresentation;
    textureWidth?: number;
    textureHeight?: number;
    clipBias?: number;
    shader?: object;
    encoding?: O3JS.TextureEncoding;
}

export interface IRefractor extends IMesh {
    new(geometry?: IBufferGeometry, options?: IRefractorOptions) : this;

    getRenderTarget(): IWebGLRenderTarget;
}

export interface ISky extends IMesh {
    new() : this;

    geometry: IBoxGeometry;
    material: IShaderMaterial;

    SkyShader: object;
}

export interface IWaterOptions {
    textureWidth?: number;
    textureHeight?: number;
    clipBias?: number;
    alpha?: number;
    time?: number;
    waterNormals?: ITexture;
    sunDirection?: IVector3;
    sunColor?: TColorRepresentation;
    waterColor?: TColorRepresentation;
    eye?: IVector3;
    distortionScale?: number;
    side?: O3JS.Side;
    fog?: boolean;
}

export interface IWater extends IMesh {
    material: IShaderMaterial;
    new(geometry: IBufferGeometry, options: IWaterOptions) : this;
}

export interface IWater2Options {
    color?: TColorRepresentation;
    textureWidth?: number;
    textureHeight?: number;
    clipBias?: number;
    flowDirection?: IVector2;
    flowSpeed?: number;
    reflectivity?: number;
    scale?: number;
    shader?: object;
    flowMap?: ITexture;
    normalMap0?: ITexture;
    normalMap1?: ITexture;
    encoding?: O3JS.TextureEncoding;
}

export interface IWater2 extends IMesh {
    material: IShaderMaterial;
    new(geometry: IBufferGeometry, options: IWater2Options) : this;
}


export type TCSS3DParameters = {
	element?: HTMLElement;
};

export interface ICSS3DRenderer {
	new (parameters?: TCSS3DParameters): this;
	domElement: HTMLElement;

	getSize(): { width: number; height: number };
	setSize(width: number, height: number): void;
	render(scene: IScene, camera: ICamera): void;
}

export interface ISVGObject extends IObject3D {
	new (node: SVGElement): this;
	node: SVGElement;
}

export interface ISVGRenderer {
	new (): this;
	domElement: SVGElement;
	autoClear: boolean;
	sortObjects: boolean;
	sortElements: boolean;
	overdraw: number;
	info: { render: { vertices: number; faces: number } };

	getSize(): { width: number; height: number };
	setQuality(quality: string): void;
	setClearColor(color: IColor, alpha: number): void;
	setPixelRatio(): void;
	setSize(width: number, height: number): void;
	setPrecision(precision: number): void;
	clear(): void;
	render(scene: IScene, camera: ICamera): void;
}

export enum EArcballControlsMouseActionOperations {
	PAN = 'PAN',
	ROTATE = 'ROTATE',
	ZOOM = 'ZOOM',
	FOV = 'FOV',
}

export type TArcballControlsMouseActionMouse = 0 | 1 | 2 | 'WHEEL';

export enum EArcballControlsMouseActionKeys {
	SHIFT = 'SHIFT',
	CTRL = 'CTRL',
}

export interface IArcballControls extends IEventDispatcher {
	camera: ICamera | null;
	domElement: HTMLElement;
	scene?: IScene | null | undefined;

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
	target: IVector3;

	/**
	 * @default 0.67
	 */
	radiusFactor: number;

	new (camera: ICamera, domElement: HTMLElement, scene?: IScene | null): this;

	getRaycaster(): IRaycaster;

	activateGizmos(isActive: boolean): void;

	copyState(): void;

	pasteState(): void;

	saveState(): void;

	reset(): void;

	setCamera(camera: ICamera): void;

	setGizmosVisible(value: boolean): void;

	setTbRadius(value: number): void;

	setMouseAction(
		operation: EArcballControlsMouseActionOperations,
		mouse: TArcballControlsMouseActionMouse,
		key?: EArcballControlsMouseActionKeys
	): boolean;

	unsetMouseAction(mouse: TArcballControlsMouseActionMouse, key?: EArcballControlsMouseActionKeys): boolean;

	setTarget(x: number, y: number, z: number): void;

	update(): void;

	dispose(): void;
}

export interface IDragControls extends IEventDispatcher {
	new (objects: IObject3D[], camera: ICamera, domElement?: HTMLElement): this;

	object: ICamera;

	// API

	enabled: boolean;
	transformGroup: boolean;

	activate(): void;
	deactivate(): void;
	dispose(): void;
	getObjects(): IObject3D[];
}

export interface IFirstPersonControls {
	new (object: ICamera, domElement?: HTMLElement): this;

	object: ICamera;
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
	lookAt(x: number | IVector3, y: number, z: number): this;
	update(delta: number): this;
	dispose(): void;
}

export interface IFlyControls extends IEventDispatcher {
	new (object: ICamera, domElement?: HTMLElement): this;

	object: ICamera;
	domElement: HTMLElement | HTMLDocument;

	movementSpeed: number;
	rollSpeed: number;
	dragToLook: boolean;
	autoForward: boolean;

	update(delta: number): void;
	dispose(): void;
}

export enum EMOUSE {
	LEFT = 0,
	MIDDLE = 1,
	RIGHT = 2,
	ROTATE = 0,
	DOLLY = 1,
	PAN = 2,
}

export enum ETOUCH {
	ROTATE,
	PAN,
	DOLLY_PAN,
	DOLLY_ROTATE,
}

export interface IOrbitControls {
	new (object: ICamera, domElement?: HTMLElement): this;

	object: ICamera;
	domElement: HTMLElement | HTMLDocument;

	// API
	enabled: boolean;
	target: IVector3;

	// deprecated
	center: IVector3;

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
	mouseButtons: { LEFT: EMOUSE; MIDDLE: EMOUSE; RIGHT: EMOUSE };
	touches: { ONE: ETOUCH; TWO: ETOUCH };

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

export interface IMapControls extends IOrbitControls {
	new (object: ICamera, domElement?: HTMLElement): this;
}

export interface IPointerLockControls extends IEventDispatcher {
	new (camera: ICamera, domElement?: HTMLElement): this;

	domElement: HTMLElement;

	// API

	isLocked: boolean;

	minPolarAngle: number;
	maxPolarAngle: number;

	connect(): void;
	disconnect(): void;
	dispose(): void;
	getObject(): ICamera;
	getDirection(v: IVector3): IVector3;
	moveForward(distance: number): void;
	moveRight(distance: number): void;
	lock(): void;
	unlock(): void;
}

export interface ITrackballControls extends IEventDispatcher {
	new (object: ICamera, domElement?: HTMLElement): this;

	object: ICamera;
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
	mouseButtons: { LEFT: EMOUSE; MIDDLE: EMOUSE; RIGHT: EMOUSE };

	target: IVector3;
	position0: IVector3;
	target0: IVector3;
	up0: IVector3;

	update(): void;

	reset(): void;

	dispose(): void;

	checkDistances(): void;

	zoomCamera(): void;

	panCamera(): void;

	rotateCamera(): void;

	handleResize(): void;
}

export interface ITransformControls extends IObject3D {
	new (object: ICamera, domElement?: HTMLElement): this;

	domElement: HTMLElement;

	// API

	camera: ICamera;
	object: IObject3D | undefined;
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
		LEFT: EMOUSE;
		MIDDLE: EMOUSE;
		RIGHT: EMOUSE;
	};

	attach(object: IObject3D): this;
	detach(): this;
	getMode(): 'translate' | 'rotate' | 'scale';
	getRaycaster(): IRaycaster;
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
export interface IReflectorShader {
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
export interface IReflectorForSSRPass extends IPass {
	/**
	 * Creates an instance of ngx reflector for ssrpass.
	 *
	 * @param geometry
	 * @param options
	 */
	new (geometry: IBufferGeometry, options: IReflectorOptions): this;
}

/**
 * AdaptiveToneMapping pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAdaptiveToneMappingPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/AdaptiveToneMappingPass) page for a live demo.
 *
 */
export interface IAdaptiveToneMappingPass extends IPass {
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
	luminanceRT: IWebGLRenderTarget;
	previousLuminanceRT: IWebGLRenderTarget;
	currentLuminanceRT: IWebGLRenderTarget;
	copyUniforms: object;
	materialCopy: IShaderMaterial;
	materialLuminance: IShaderMaterial;
	adaptLuminanceShader: object;
	materialAdaptiveLum: IShaderMaterial;
	materialToneMap: IShaderMaterial;
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
export interface IAfterimagePass extends IPass {
	/**
	 * Creates an instance of ngx afterimage pass.
	 *
	 * @param [damp]
	 */
	new (damp?: number): this;

	shader: object;
	uniforms: object;
	textureComp: IWebGLRenderTarget;
	textureOld: IWebGLRenderTarget;
	shaderMaterial: IShaderMaterial;
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
export interface IBloomPass extends IPass {
	/**
	 * Creates an instance of ngx bloom pass.
	 *
	 * @param [strength]
	 * @param [kernelSize]
	 * @param [sigma]
	 * @param [resolution]
	 */
	new (strength?: number, kernelSize?: number, sigma?: number, resolution?: number): this;
	renderTargetX: IWebGLRenderTarget;
	renderTargetY: IWebGLRenderTarget;
	copyUniforms: object;
	materialCopy: IShaderMaterial;
	convolutionUniforms: object;
	materialConvolution: IShaderMaterial;
	fsQuad: object;
}

export interface IBokehPassParamters {
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
export interface IBokehPass extends IPass {
	/**
	 * Creates an instance of ngx bokeh pass.
	 *
	 * @param scene
	 * @param camera
	 * @param params
	 */
	new (scene: IScene, camera: ICamera, params: IBokehPassParamters): this;

	scene: IScene;
	camera: ICamera;
	renderTargetColor: IWebGLRenderTarget;
	renderTargetDepth: IWebGLRenderTarget;
	materialDepth: IMeshDepthMaterial;
	materialBokeh: IShaderMaterial;
	uniforms: object;
	fsQuad: object;
	oldClearColor: IColor;
}

/**
 * Clear pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxClearPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/ClearPass) page for a live demo.
 *
 */
export interface IClearPass extends IPass {
	/**
	 * Creates an instance of ngx clear pass.
	 *
	 * @param [clearColor]
	 * @param [clearAlpha]
	 */
	new (clearColor?: TColorRepresentation, clearAlpha?: number): this;

	clearColor: TColorRepresentation;
	clearAlpha: number;
}

/**
 * CubeTexture pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCubeTexturePass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/CubeTexturePass) page for a live demo.
 *
 */
export interface ICubeTexturePass extends IPass {
	/**
	 * Creates an instance of ngx cube texture pass.
	 *
	 * @param camera
	 * @param [envMap]
	 * @param [opacity]
	 */
	new (camera: IPerspectiveCamera, envMap?: ICubeTexture, opacity?: number): this;

	camera: IPerspectiveCamera;
	cubeShader: object;
	cubeMesh: IMesh;
	envMap: ICubeTexture;
	opacity: number;
	cubeScene: IScene;
	cubeCamera: IPerspectiveCamera;
}

/**
 * DotScreen pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxDotScreenPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/DotScreenPass) page for a live demo.
 *
 */
export interface IDotScreenPass extends IPass {
	/**
	 * Creates an instance of ngx dot screen pass.
	 *
	 * @param [center]
	 * @param [angle]
	 * @param [scale]
	 */
	new (center?: IVector2, angle?: number, scale?: number): this;

	uniforms: object;
	material: IShaderMaterial;
	fsQuad: object;
}

/**
 * Film pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxFilmPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/FilmPass) page for a live demo.
 *
 */
export interface IFilmPass extends IPass {
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
	material: IShaderMaterial;
	fsQuad: object;
}

/**
 * Glitch pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxGlitchPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/GlitchPass) page for a live demo.
 *
 */
export interface IGlitchPass extends IPass {
	/**
	 * Creates an instance of ngx glitch pass.
	 *
	 * @param [dtSize]
	 */
	new (dtSize?: number): this;

	uniforms: object;
	material: IShaderMaterial;
	fsQuad: object;
	goWild: boolean;
	curF: number;
	randX: number;

	generateTrigger(): void;
	generateHeightmap(dt_size: number): IDataTexture;
}

export interface IHalftonePassParameters {
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
export interface IHalftonePass extends IPass {
	/**
	 * Creates an instance of ngx halftone pass.
	 *
	 * @param width
	 * @param height
	 * @param params
	 */
	new (width: number, height: number, params: IHalftonePassParameters): this;
	uniforms: object;
	material: IShaderMaterial;
	fsQuad: object;
}

export interface ILUTPassParameters {
	lut?: IDataTexture | IDataTexture3D;
	intensity?: number;
}

/**
 * LUT pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLUTPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/LUTPass) page for a live demo.
 *
 */
export interface ILUTPass extends IPass {
	/**
	 * Creates an instance of ngx lutpass.
	 *
	 * @param params
	 */
	new (params: ILUTPassParameters): this;

	lut?: IDataTexture | IDataTexture3D;
	intensity?: number;
}

/**
 * ClearMask pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxClearMaskPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/ClearMaskPass) page for a live demo.
 *
 */
export interface IClearMaskPass extends IPass {
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
export interface IMaskPass extends IPass {
	/**
	 * Creates an instance of ngx mask pass.
	 *
	 * @param scene
	 * @param camera
	 */
	new (scene: IScene, camera: ICamera): this;

	scene: IScene;
	camera: ICamera;
	inverse: boolean;
}

/**
 * OutlinePass pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxOutlinePass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/OutlinePass) page for a live demo.
 *
 */
export interface IOutlinePass extends IPass {
	/**
	 * Creates an instance of ngx outline pass.
	 *
	 * @param resolution
	 * @param scene
	 * @param camera
	 * @param [selectedObjects]
	 */
	new (resolution: IVector2, scene: IScene, camera: ICamera, selectedObjects?: IObject3D[]): this;

	renderScene: IScene;
	renderCamera: ICamera;
	selectedObjects: IObject3D[];
	visibleEdgeColor: IColor;
	hiddenEdgeColor: IColor;
	edgeGlow: number;
	usePatternTexture: boolean;
	edgeThickness: number;
	edgeStrength: number;
	downSampleRatio: number;
	pulsePeriod: number;
	resolution: IVector2;
	patternTexture: ITexture;

	maskBufferMaterial: IMeshBasicMaterial;
	renderTargetMaskBuffer: IWebGLRenderTarget;
	depthMaterial: IMeshDepthMaterial;
	prepareMaskMaterial: IShaderMaterial;
	renderTargetDepthBuffer: IWebGLRenderTarget;
	renderTargetMaskDownSampleBuffer: IWebGLRenderTarget;
	renderTargetBlurBuffer1: IWebGLRenderTarget;
	renderTargetBlurBuffer2: IWebGLRenderTarget;
	edgeDetectionMaterial: IShaderMaterial;
	renderTargetEdgeBuffer1: IWebGLRenderTarget;
	renderTargetEdgeBuffer2: IWebGLRenderTarget;
	separableBlurMaterial1: IShaderMaterial;
	separableBlurMaterial2: IShaderMaterial;
	overlayMaterial: IShaderMaterial;
	copyUniforms: object;
	materialCopy: IShaderMaterial;
	oldClearColor: IColor;
	oldClearAlpha: number;
	fsQuad: object;
	tempPulseColor1: IColor;
	tempPulseColor2: IColor;
	textureMatrix: IMatrix4;

	dispose(): void;
	changeVisibilityOfSelectedObjects(bVisible: boolean): void;
	changeVisibilityOfNonSelectedObjects(bVisible: boolean): void;
	updateTextureMatrix(): void;
	getPrepareMaskMaterial(): IShaderMaterial;
	getEdgeDetectionMaterial(): IShaderMaterial;
	getSeperableBlurMaterial(): IShaderMaterial;
	getOverlayMaterial(): IShaderMaterial;
}

export interface IPass {
	new (): this;
	enabled: boolean;
	needsSwap: boolean;
	clear: boolean;
	renderToScreen: boolean;

	setSize(width: number, height: number): void;
	render(
		renderer: IWebGLRenderer,
		writeBuffer: IWebGLRenderTarget,
		readBuffer: IWebGLRenderTarget,
		deltaTime: number,
		maskActive: boolean
	): void;
}

export interface IFullScreenQuad {
	new (material?: IMaterial): this;

	render(renderer: IWebGLRenderer): void;
	dispose(): void;

	material: IMaterial;
}

/**
 * Render pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRenderPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/RenderPass) page for a live demo.
 *
 */
export interface IRenderPass extends IPass {
	/**
	 * Creates an instance of ngx render pass.
	 * @param scene
	 * @param camera
	 * @param [overrideMaterial]
	 * @param [clearColor]
	 * @param [clearAlpha]
	 */
	new (scene: IScene, camera: ICamera, overrideMaterial?: IMaterial, clearColor?: IColor, clearAlpha?: number): this;

	scene: IScene;
	camera: ICamera;
	overrideMaterial: IMaterial;
	clearColor: IColor;
	clearAlpha: number;
	clearDepth: boolean;
}

export enum ESAO_OUTPUT {
	Beauty,
	Default,
	SAO,
	Depth,
	Normal,
}

export interface ISAOPassParams {
	output: ESAO_OUTPUT;
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
export interface ISAOPass extends IPass {
	new (scene: IScene, camera: ICamera, depthTexture?: boolean, useNormals?: boolean, resolution?: IVector2): this;

	scene: IScene;
	camera: ICamera;
	supportsDepthTextureExtension: boolean;
	supportsNormalTexture: boolean;
	originalClearColor: IColor;
	oldClearColor: IColor;
	oldClearAlpha: number;
	resolution: IVector2;
	saoRenderTarget: IWebGLRenderTarget;
	blurIntermediateRenderTarget: IWebGLRenderTarget;
	beautyRenderTarget: IWebGLRenderTarget;
	normalRenderTarget: IWebGLRenderTarget;
	depthRenderTarget: IWebGLRenderTarget;
	depthMaterial: IMeshDepthMaterial;
	normalMaterial: IMeshNormalMaterial;
	saoMaterial: IShaderMaterial;
	vBlurMaterial: IShaderMaterial;
	hBlurMaterial: IShaderMaterial;
	materialCopy: IShaderMaterial;
	depthCopy: IShaderMaterial;
	fsQuad: object;
	params: ISAOPassParams;

	renderPass(
		renderer: IWebGLRenderer,
		passMaterial: IMaterial,
		renderTarget: IWebGLRenderTarget,
		clearColor?: TColorRepresentation,
		clearAlpha?: number
	): void;
	renderOverride(
		renderer: IWebGLRenderer,
		overrideMaterial: IMaterial,
		renderTarget: IWebGLRenderTarget,
		clearColor?: TColorRepresentation,
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
export interface ISavePass extends IPass {
	/**
	 * Creates an instance of ngx save pass.
	 *
	 * @param renderTarget
	 */
	new (renderTarget: IWebGLRenderTarget): this;

	textureID: string;
	renderTarget: IWebGLRenderTarget;
	uniforms: object;
	material: IShaderMaterial;
	fsQuad: object;
}

/**
 * Shader pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/ShaderPass) page for a live demo.
 *
 */
export interface IShaderPass extends IPass {
	/**
	 * Creates an instance of ngx shader pass.
	 *
	 * @param shader
	 * @param [textureId]
	 */
	new (shader: object, textureId?: string): this;

	textureID: string;
	uniforms: { [name: string]: { value: any } };
	material: IShaderMaterial;
	fsQuad: object;
}

/**
 * SMAA pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSMAAPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SMAAPass) page for a live demo.
 *
 */
export interface ISMAAPass extends IPass {
	/**
	 * Creates an instance of ngx smaapass.
	 *
	 * @param width
	 * @param height
	 */
	new (width: number, height: number): this;

	edgesRT: IWebGLRenderTarget;
	weightsRT: IWebGLRenderTarget;
	areaTexture: ITexture;
	searchTexture: ITexture;
	uniformsEdges: object;
	materialEdges: IShaderMaterial;
	uniformsWeights: object;
	materialWeights: IShaderMaterial;
	uniformsBlend: object;
	materialBlend: IShaderMaterial;
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
export interface ISSAARenderPass extends IPass {
	/**
	 * Creates an instance of ngx ssaarender pass.
	 *
	 * @param scene
	 * @param camera
	 * @param clearColor
	 * @param clearAlpha
	 */
	new (scene: IScene, camera: ICamera, clearColor: TColorRepresentation, clearAlpha: number): this;

	scene: IScene;
	camera: ICamera;
	sampleLevel: number;
	unbiased: boolean;
	clearColor: TColorRepresentation;
	clearAlpha: number;
	copyUniforms: object;
	copyMaterial: IShaderMaterial;
	fsQuad: object;
	sampleRenderTarget: undefined | IWebGLRenderTarget;
}

/**
 * SSAO pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSSAOPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SSAOPass) page for a live demo.
 *
 */
export interface ISSAOPass extends IPass {
	/**
	 * Creates an instance of ngx ssaopass.
	 *
	 * @param scene
	 * @param camera
	 * @param [width]
	 * @param [height]
	 */
	new (scene: IScene, camera: ICamera, width?: number, height?: number): this;

	scene: IScene;
	camera: ICamera;
	width: number;
	height: boolean;
	clear: boolean;
	kernelRadius: number;
	kernelSize: number;
	kernel: IVector3[];
	noiseTexture: IDataTexture;
	output: any;
	minDistance: number;
	maxDistance: number;
	beautyRenderTarget: IWebGLRenderTarget;
	normalRenderTarget: IWebGLRenderTarget;
	ssaoRenderTarget: IWebGLRenderTarget;
	blurRenderTarget: IWebGLRenderTarget;
	ssaoMaterial: IShaderMaterial;
	normalMaterial: IMeshNormalMaterial;
	blurMaterial: IShaderMaterial;
	depthRenderMaterial: IShaderMaterial;
	copyMaterial: IShaderMaterial;
	fsQuad: object;
	originalClearColor: IColor;
	dipose(): void;
	generateSampleKernel(): IVector3[];
	generateRandomKernelRotations(): void;
	renderPass(
		renderer: IWebGLRenderer,
		passMaterial: IMaterial,
		renderTarget: IWebGLRenderTarget,
		clearColor?: TColorRepresentation,
		clearAlpha?: number
	): void;
	renderOverride(
		renderer: IWebGLRenderer,
		overrideMaterial: IMaterial,
		renderTarget: IWebGLRenderTarget,
		clearColor?: TColorRepresentation,
		clearAlpha?: number
	): void;
}

export interface ISSRPassParams {
	renderer: IWebGLRenderer;
	scene: IScene;
	camera: ICamera;
	width?: number | undefined;
	height?: number | undefined;
	selects: IMesh[] | null;
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
export interface ISSRPass extends IPass {
	/**
	 * Creates an instance of ngx ssrpass.
	 *
	 * @param params
	 */
	new (params: ISSRPassParams): this;

	width: number;
	height: number;
	clear: boolean;
	renderer: IWebGLRenderer;
	scene: IScene;
	camera: ICamera;
	groundReflector: any | null;
	opacity: number;
	output: number;
	maxDistance: number;
	thickness: number;
	tempColor: IColor;

	get selects(): IMesh[] | null;
	set selects(val: IMesh[] | null);
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

	beautyRenderTarget: IWebGLRenderTarget;
	prevRenderTarget: IWebGLRenderTarget;
	normalRenderTarget: IWebGLRenderTarget;
	metalnessRenderTarget: IWebGLRenderTarget;
	ssrRenderTarget: IWebGLRenderTarget;

	blurRenderTarget: IWebGLRenderTarget;
	blurRenderTarget2: IWebGLRenderTarget;

	ssrMaterial: IShaderMaterial;

	normalMaterial: IMeshNormalMaterial;

	metalnessOnMaterial: IMeshBasicMaterial;

	metalnessOffMaterial: IMeshBasicMaterial;

	blurMaterial: IShaderMaterial;
	blurMaterial2: IShaderMaterial;

	depthRenderMaterial: IShaderMaterial;

	copyMaterial: IShaderMaterial;

	fsQuad: IFullScreenQuad;

	originalClearColor: IColor;

	dispose: () => void;

	renderPass: (
		renderer: IWebGLRenderer,
		passMaterial: IMaterial,
		renderTarget: IWebGLRenderTarget,
		clearColor: TColorRepresentation,
		clearAlpha: TColorRepresentation
	) => void;

	renderOverride: (
		renderer: IWebGLRenderer,
		passMaterial: IMaterial,
		renderTarget: IWebGLRenderTarget,
		clearColor: TColorRepresentation,
		clearAlpha: TColorRepresentation
	) => void;

	renderMetalness: (
		renderer: IWebGLRenderer,
		passMaterial: IMaterial,
		renderTarget: IWebGLRenderTarget,
		clearColor: TColorRepresentation,
		clearAlpha: TColorRepresentation
	) => void;
}

export interface ISSRrPassParams {
	renderer: IWebGLRenderer;
	scene: IScene;
	camera: ICamera;
	width?: number | undefined;
	height?: number | undefined;
	selects: IMesh[] | null;
}

/**
 * SSRr pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSSRrPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SSRrPass) page for a live demo.
 *
 */
export interface ISSRrPass extends IPass {
	/**
	 * Creates an instance of ngx ssrr pass.
	 *
	 * @param params
	 */
	new (params: ISSRrPassParams): this;

	width: number;
	height: number;
	clear: boolean;

	renderer: IWebGLRenderer;
	scene: IScene;
	camera: ICamera;

	output: number;

	ior: number;
	maxDistance: number;
	surfDist: number;

	color: IColor;

	seleects: IMesh[] | null;

	_specular: boolean;
	get specular(): boolean;
	set specular(spec: boolean);

	_fillHole: boolean;
	get fillHole(): boolean;
	set fillHole(spec: boolean);

	_infiniteThick: boolean;
	get infiniteThick(): boolean;
	set infiniteThick(spec: boolean);

	beautyRenderTarget: IWebGLRenderTarget;
	specularRenderTarget: IWebGLRenderTarget;
	normalSelectsRenderTarget: IWebGLRenderTarget;
	refractiveRenderTarget: IWebGLRenderTarget;
	ssrrRenderTarget: IWebGLRenderTarget;

	ssrrMaterial: IShaderMaterial;

	normalMaterial: IMeshNormalMaterial;
	refractiveOnMaterial: IMeshBasicMaterial;
	refractiveOffMaterial: IMeshBasicMaterial;
	specularMaterial: IMeshStandardMaterial;

	depthRenderMaterial: IShaderMaterial;
	copyMaterial: IShaderMaterial;

	fsQuad: IFullScreenQuad;

	originalClearColor: IColor;

	dispose: () => void;

	render: (renderer: IWebGLRenderer, writeBuffer: IWebGLRenderTarget) => void;

	renderPass: (
		renderer: IWebGLRenderer,
		passMaterial: IMaterial,
		renderTarget: IWebGLRenderTarget,
		clearColor: TColorRepresentation,
		clearAlpha: TColorRepresentation
	) => void;

	renderOverride: (
		renderer: IWebGLRenderer,
		passMaterial: IMaterial,
		renderTarget: IWebGLRenderTarget,
		clearColor: TColorRepresentation,
		clearAlpha: TColorRepresentation
	) => void;

	renderRefractive: (
		renderer: IWebGLRenderer,
		passMaterial: IMaterial,
		renderTarget: IWebGLRenderTarget,
		clearColor: TColorRepresentation,
		clearAlpha: TColorRepresentation
	) => void;

	setSize: (width: number, height: number) => void;
}

/**
 * TAARender pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTAARenderPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/TAARenderPass) page for a live demo.
 *
 */
export interface ITAARenderPass extends ISSAARenderPass {
	/**
	 * Creates an instance of ngx taarender pass.
	 *
	 * @param scene
	 * @param camera
	 * @param clearColor
	 * @param clearAlpha
	 */
	new (scene: IScene, camera: ICamera, clearColor: TColorRepresentation, clearAlpha: number): this;

	accumulate: boolean;
}

/**
 * Texture pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTexturePass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/TexturePass) page for a live demo.
 *
 */
export interface ITexturePass extends IPass {
	/**
	 * Creates an instance of ngx texture pass.
	 *
	 * @param map
	 * @param [opacity]
	 */
	new (map: ITexture, opacity?: number): this;

	map: ITexture;
	opacity: number;
	uniforms: object;
	material: IShaderMaterial;
	fsQuad: object;
}

/**
 * UnrealBloom pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxUnrealBloomPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/UnrealBloomPass) page for a live demo.
 *
 */
export interface IUnrealBloomPass extends IPass {
	/**
	 * Creates an instance of ngx unreal bloom pass.
	 *
	 * @param resolution
	 * @param strength
	 * @param radius
	 * @param threshold
	 */
	new (resolution: IVector2, strength: number, radius: number, threshold: number): this;

	resolution: IVector2;
	strength: number;
	radius: number;
	threshold: number;
	clearColor: IColor;
	renderTargetsHorizontal: IWebGLRenderTarget[];
	renderTargetsVertical: IWebGLRenderTarget[];
	nMips: number;
	renderTargetBright: IWebGLRenderTarget;
	highPassUniforms: object;
	materialHighPassFilter: IShaderMaterial;
	separableBlurMaterials: IShaderMaterial[];
	compositeMaterial: IShaderMaterial;
	bloomTintColors: IVector3[];
	copyUniforms: object;
	materialCopy: IShaderMaterial;
	oldClearColor: IColor;
	oldClearAlpha: number;
	basic: IMeshBasicMaterial;
	fsQuad: object;

	dispose(): void;
	getSeperableBlurMaterial(): IShaderMaterial;
	getCompositeMaterial(): IShaderMaterial;
}

/**
 * Copy pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderCopyPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/CopyPass) page for a live demo.
 *
 */
export interface IShaderCopyPass extends IShaderPass {
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
export interface IShaderRGBShiftPass extends IShaderPass {
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
export interface IShaderBleachBypassPass extends IShaderPass {
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
export interface IShaderSepiaPass extends IShaderPass {
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
export interface IShaderVignettePass extends IShaderPass {
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
export interface IShaderGammaCorrectionPass extends IShaderPass {
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
export interface IShaderFXAAPass extends IShaderPass {
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
export interface IShaderPixelPass extends IShaderPass {
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
export interface IShaderLuminosityPass extends IShaderPass {
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
export interface IShaderDotScreenPass extends IShaderPass {
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
export interface ISobelOperatorPass extends IShaderPass {
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
export interface IShaderMaterialPass extends IShaderPass {
	/**
	 * Creates an instance of ngx ShaderMaterial pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

export interface IAsciiEffectOptions {
	resolution?: number;
	scale?: number;
	color?: boolean;
	alpha?: boolean;
	block?: boolean;
	invert?: boolean;
}

export interface IAsciiEffect {
	new (renderer: IWebGLRenderer, charSet?: string, options?: IAsciiEffectOptions): this;
	domElement: HTMLElement;

	render(scene: IScene, camera: ICamera): void;
	setSize(width: number, height: number): void;
}

export interface IOutlineEffectParameters {
	defaultThickness?: number | undefined;
	defaultColor?: number[] | undefined;
	defaultAlpha?: number | undefined;
	defaultKeepAlive?: boolean | undefined;
}

export interface IOutlineEffect {
	new (renderer: IWebGLRenderer, parameters?: IOutlineEffectParameters): this;
	enabled: boolean;
	autoClear: boolean;
	domElement: HTMLElement;
	shadowMap: IWebGLShadowMap;

	clear(color?: boolean, depth?: boolean, stencil?: boolean): void;
	getPixelRatio(): number;
	getSize(target: IVector2): IVector2;
	render(scene: IScene, camera: ICamera): void;
	renderOutline(scene: IScene, camera: ICamera): void;
	setRenderTarget(renderTarget: IWebGLRenderTarget | null): void;
	setPixelRatio(value: number): void;
	setScissor(x: IVector4 | number, y?: number, width?: number, height?: number): void;
	setScissorTest(enable: boolean): void;
	setSize(width: number, height: number, updateStyle?: boolean): void;
	setViewport(x: IVector4 | number, y?: number, width?: number, height?: number): void;
}

export interface IParallaxBarrierEffect {
	new (renderer: IWebGLRenderer): this;

	render(scene: IScene, camera: ICamera): void;
	setSize(width: number, height: number): void;
}

export interface IPeppersGhostEffect {
	new (renderer: IWebGLRenderer): this;
	cameraDistance: number;
	reflectFromAbove: boolean;

	render(scene: IScene, camera: ICamera): void;
	setSize(width: number, height: number): void;
}

export interface IEffectComposer {
	new (renderer: IWebGLRenderer, renderTarget?: IWebGLRenderTarget): this;
	renderer: IWebGLRenderer;
	renderTarget1: IWebGLRenderTarget;
	renderTarget2: IWebGLRenderTarget;
	writeBuffer: IWebGLRenderTarget;
	readBuffer: IWebGLRenderTarget;
	passes: IPass[];
	copyPass: IShaderPass;
	clock: IClock;
	renderToScreen: boolean;

	swapBuffers(): void;
	addPass(pass: IPass): void;
	insertPass(pass: IPass, index: number): void;
	removePass(pass: IPass): void;
	isLastEnabledPass(passIndex: number): boolean;
	render(deltaTime?: number): void;
	reset(renderTarget?: IWebGLRenderTarget): void;
	setSize(width: number, height: number): void;
	setPixelRatio(pixelRatio: number): void;
}

export interface IUVBoxes {
	w: number;
	h: number;
	index: number;
}

export interface ILightMapContainers {
	basicMat: IMaterial | IMaterial[];
	object: IObject3D;
}

export interface IProgressiveLightMap {
	renderer: IWebGLRenderer;
	res: number;
	lightMapContainers: ILightMapContainers[];
	compiled: boolean;
	scene: IScene;
	tinyTarget: IWebGLRenderTarget;
	buffer1Active: boolean;
	firstUpdate: boolean;
	warned: boolean;

	progressiveLightMap1: IWebGLRenderTarget;
	progressiveLightMap2: IWebGLRenderTarget;

	uvMat: IMeshPhongMaterial;

	uv_boxes: IUVBoxes[];

	blurringPlane: IMesh<IPlaneGeometry, IMeshBasicMaterial>;

	labelMaterial: IMeshBasicMaterial;
	labelPlane: IPlaneGeometry;
	labelMesh: IMesh<IPlaneGeometry, IMeshBasicMaterial>;

	new (renderer: IWebGLRenderer, res?: number): this;

	addObjectsToLightMap(objects: IObject3D[]): void;

	update(camera: ICamera, blendWindow?: number, blurEdges?: boolean): void;

	showDebugLightmap(visible: boolean, position?: IVector3): void;
}

export interface ISceneUtils {
	createMeshesFromInstancedMesh(instancedMesh: IInstancedMesh): IGroup;
	createMultiMaterialObject(geometry: IBufferGeometry, materials: IMaterial[]): IGroup;
	/**
	 * @deprecated Use scene.attach( child ) instead.
	 */
	detach(child: IObject3D, parent: IObject3D, scene: IScene): void;
	/**
	 * @deprecated Use parent.attach( child ) instead.
	 */
	attach(child: IObject3D, scene: IScene, parent: IObject3D): void;
}

export interface IShadowMesh extends IMesh {
	new (mesh?: IMesh): this;

	update(plane: IPlane, lightPosition4D: IVector4): void;
}

export interface ISize {
	width: number;
	height: number;
	set: (width: number, height: number) => void;
}

export interface IPosition {
	x: number;
	y: number;
	set: (x: number, y: number) => void;
}

export interface IShadowMapViewer {
	new (light: ILight): this;

	enabled: boolean;
	size: ISize;
	position: IPosition;
	render(renderer: IRenderer): void;
	updateForWindowResize(): void;
	update(): void;
}

export interface ITiltLoader extends ILoader {
	new (manager?: ILoadingManager, storePath?: string): this;
	load(
		url: string,
		onLoad: (object: IGroup) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IGroup>;
	parse(data: ArrayBuffer): IGroup;
}

export interface IFileLoader extends ILoader {
	mimeType: undefined | MimeType;
	responseType: undefined | string;

	load(
		url: string,
		onLoad?: (response: string | ArrayBuffer) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): any;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<string | ArrayBuffer>;
	setMimeType(mimeType: MimeType): IFileLoader;
	setResponseType(responseType: string): IFileLoader;
}

export interface IImageBitmapLoader extends ILoader {
	/**
	 * @default { premultiplyAlpha: 'none' }
	 */
	options: undefined | object;

	readonly isImageBitmapLoader: true;

	setOptions(options: object): IImageBitmapLoader;
	load(
		url: string,
		onLoad?: (response: ImageBitmap) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): any;

	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ImageBitmap>;
}

/**
 * A loader for loading an image.
 * Unlike other loaders, this one emits events instead of using predefined callbacks. So if you're interested in getting notified when things happen, you need to add listeners to the object.
 */
export interface IImageLoader extends ILoader {
	load(
		url: string,
		onLoad?: (image: HTMLImageElement) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): HTMLImageElement;

	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<HTMLImageElement>;
}

export interface IMaterialLoader extends ILoader {
	/**
	 * @default {}
	 */
	textures: { [key: string]: ITexture };

	load(
		url: string,
		onLoad: (material: IMaterial) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: Error | ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IMaterial>;
	setTextures(textures: { [key: string]: ITexture }): this;
	parse(json: any): IMaterial;
}

export interface IObjectLoader extends ILoader {
	load(
		url: string,
		// tslint:disable-next-line:no-unnecessary-generics
		onLoad?: <ObjectType extends IObject3D>(object: ObjectType) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: Error | ErrorEvent) => void
	): void;
	loadAsync<ObjectType extends IObject3D>(
		url: string,
		onProgress?: (event: ProgressEvent) => void
	): // tslint:disable-next-line:no-unnecessary-generics
	Promise<ObjectType>;
	// tslint:disable-next-line:no-unnecessary-generics
	parse<T extends IObject3D>(json: any, onLoad?: (object: IObject3D) => void): T;
	// tslint:disable-next-line:no-unnecessary-generics
	parseAsync<T extends IObject3D>(json: any): Promise<T>;
	parseGeometries(json: any): {
		[key: string]: IInstancedBufferGeometry | IBufferGeometry;
	}; // Array of BufferGeometry or Geometry or Geometry2.
	parseMaterials(json: any, textures: ITexture[]): IMaterial[]; // Array of Classes that inherits from Matrial.
	parseAnimations(json: any): IAnimationClip[];
	parseImages(json: any, onLoad: () => void): { [key: string]: HTMLImageElement };
	parseImagesAsync(json: any): Promise<{ [key: string]: HTMLImageElement }>;
	parseTextures(json: any, images: any): ITexture[];
	parseObject<T extends IObject3D>(
		data: any,
		geometries: any[],
		materials: IMaterial[],
		animations: IAnimationClip[]
	): T;
}

/**
 * Class for loading a texture.
 * Unlike other loaders, this one emits events instead of using predefined callbacks. So if you're interested in getting notified when things happen, you need to add listeners to the object.
 */
export interface ITextureLoader extends ILoader {
	load(
		url: string,
		onLoad?: (texture: ITexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): ITexture;

	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ITexture>;
}
export interface IColladaExporterOptions {
	author?: string;
	textureDirectory?: string;
	version?: string;
}

export interface IColladaExporterResult {
	data: string;
	textures: object[];
}

export interface IColladaExporter {
	new (): this;

	parse(
		object: IObject3D,
		onDone: (res: IColladaExporterResult) => void,
		options: IColladaExporterOptions
	): IColladaExporterResult | null;
}

export interface IDRACOExporterOptions {
	decodeSpeed?: number;
	encodeSpeed?: number;
	encoderMethod?: number;
	quantization?: number[];
	exportUvs?: boolean;
	exportNormals?: boolean;
	exportColor?: boolean;
}

export interface IDRACOExporter {
	new (): this;
	parse(object: IMesh | IPoints, options: IDRACOExporterOptions): Int8Array;
}

export interface IGLTFExporterOptions {
	binary?: boolean;
	trs?: boolean;
	onlyVisible?: boolean;
	truncateDrawRange?: boolean;
	embedImages?: boolean;
	animations?: IAnimationClip[];
	forceIndices?: boolean;
	forcePowerOfTwoTextures?: boolean;
	includeCustomExtensions?: boolean;
}

export interface IGLTFExporter {
	new (): this;
	parse(input: IObject3D, onCompleted: (gltf: object) => void, options: IGLTFExporterOptions): void;
}

export interface IMMDExporter {
	new (): this;
	parseVpd(skin: IObject3D, outputShiftJis: boolean, useOriginalBones: boolean): [] | Uint8Array;
}

export interface IOBJExporter {
	new (): this;
	parse(object: IObject3D): string;
}

export interface IPLYExporterOptions {
	binary?: boolean;
	excludeAttributes?: string[];
	littleEndian?: boolean;
}

export interface IPLYExporter {
	new (): this;
	parse(object: IObject3D, onDone: (res: string) => void, options: IPLYExporterOptions): string | null;
}

export interface ISTLExporterOptions {
	binary?: boolean;
}

export interface ISTLExporter {
	new (): this;

	parse(scene: IObject3D, options?: ISTLExporterOptions): string;
}

export interface IUSDZExporter {
	new (): this;
	parse(scene: IObject3D): Promise<Uint8Array>;
}

export interface IRhino3dmLoader extends ILoader {
	load(
		url: string,
		onLoad: (object: IObject3D) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IObject3D>;
	parse(data: ArrayBufferLike, onLoad: (object: IObject3D) => void, onError?: (event: ErrorEvent) => void): void;
	setLibraryPath(path: string): IRhino3dmLoader;
	setWorkerLimit(workerLimit: number): IRhino3dmLoader;
	dispose(): IRhino3dmLoader;
}

export interface IThreeMFLoader extends ILoader {
	availableExtensions: object[];
	load(
		url: string,
		onLoad: (object: IGroup) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IGroup>;
	parse(data: ArrayBuffer): IGroup;
	addExtension(extension: object): void;
}

export interface IAMFLoader extends ILoader {
	load(
		url: string,
		onLoad: (object: IGroup) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IGroup>;
	parse(data: ArrayBuffer): IGroup;
}

export interface IBasisTextureLoader extends ILoader {
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

	detectSupport(renderer: IWebGLRenderer): this;
	load(
		url: string,
		onLoad: (texture: ICompressedTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ICompressedTexture>;
	setTranscoderPath(path: string): this;
	setWorkerLimit(workerLimit: number): this;
	dispose(): void;
}

export interface IBVH {
	clip: IAnimationClip;
	skeleton: ISkeleton;
}

export interface IBVHLoader extends ILoader {
	animateBonePositions: boolean;
	animateBoneRotations: boolean;
	load(
		url: string,
		onLoad: (bvh: IBVH) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IBVH>;
	parse(text: string): IBVH;
}

export interface ICollada {
	kinematics: object;
	library: object;
	scene: IScene;
}

export interface IColladaLoader extends ILoader {
	load(
		url: string,
		onLoad: (collada: ICollada) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ICollada>;
	parse(text: string, path: string): ICollada;
}

export interface IDDS {
	mipmaps: object[];
	width: number;
	height: number;
	format: O3JS.PixelFormat | O3JS.CompressedPixelFormat;
	mipmapCount: number;
	isCubemap: boolean;
}

export interface IDDSLoader extends ICompressedTextureLoader {
	parse(buffer: ArrayBuffer, loadMipmaps: boolean): IDDS;
}

export interface IDRACOLoader extends ILoader {
	load(
		url: string,
		onLoad: (geometry: IBufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IBufferGeometry>;
	setDecoderPath(path: string): IDRACOLoader;
	setDecoderConfig(config: object): IDRACOLoader;
	setWorkerLimit(workerLimit: number): IDRACOLoader;
	preload(): IDRACOLoader;
	dispose(): IDRACOLoader;
}

export interface IEXR {
	header: object;
	width: number;
	height: number;
	data: Float32Array;
	format: O3JS.PixelFormat;
	type: O3JS.TextureDataType;
}

export interface IEXRLoader extends IDataTextureLoader {
	type: O3JS.TextureDataType;

	parse(buffer: ArrayBuffer): IEXR;
	setDataType(type: O3JS.TextureDataType): this;
}

export interface IFBXLoader extends ILoader {
	load(
		url: string,
		onLoad: (object: IGroup) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IGroup>;
	parse(FBXBuffer: ArrayBuffer | string, path: string): IGroup;
}

export interface IFont {
	new (jsondata: any): this;

	/**
	 * @default 'Font'
	 */
	type: string;

	data: string;

	generateShapes(text: string, size: number): IShape[];
}

export interface IFontLoader extends ILoader {
	load(
		url: string,
		onLoad?: (responseFont: IFont) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IFont>;
	parse(json: any): IFont;
}

export interface IGCodeLoader extends ILoader {
	splitLayer: boolean;
	load(
		url: string,
		onLoad: (object: IGroup) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IGroup>;
	parse(data: string): IGroup;
}

export interface IGLTF {
	animations: IAnimationClip[];
	scene: IGroup;
	scenes: IGroup[];
	cameras: ICamera[];
	asset: {
		copyright?: string | undefined;
		generator?: string | undefined;
		version?: string | undefined;
		minVersion?: string | undefined;
		extensions?: any;
		extras?: any;
	};
	parser: IGLTFParser;
	userData: any;
}

export interface IGLTFLoader extends ILoader {
	dracoLoader: IDRACOLoader | null;

	load(
		url: string,
		onLoad: (gltf: IGLTF) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IGLTF>;

	setDRACOLoader(dracoLoader: IDRACOLoader): IGLTFLoader;

	register(callback: (parser: IGLTFParser) => IGLTFLoaderPlugin): IGLTFLoader;
	unregister(callback: (parser: IGLTFParser) => IGLTFLoaderPlugin): IGLTFLoader;

	setKTX2Loader(ktx2Loader: IKTX2Loader): IGLTFLoader;
	setMeshoptDecoder(meshoptDecoder: /* MeshoptDecoder */ any): IGLTFLoader;

	parse(
		data: ArrayBuffer | string,
		path: string,
		onLoad: (gltf: IGLTF) => void,
		onError?: (event: ErrorEvent) => void
	): void;
}

export type TGLTFReferenceType = 'materials' | 'nodes' | 'textures' | 'meshes';

export interface IGLTFReference {
	materials?: number;
	nodes?: number;
	textures?: number;
	meshes?: number;
}

export interface IGLTFParser {
	json: any;

	options: {
		path: string;
		manager: ILoadingManager;
		ktx2Loader: IKTX2Loader;
		meshoptDecoder: /* MeshoptDecoder */ any;
		crossOrigin: string;
		requestHeader: { [header: string]: string };
	};

	fileLoader: IFileLoader;
	textureLoader: ITextureLoader | IImageBitmapLoader;
	plugins: IGLTFLoaderPlugin;
	extensions: { [name: string]: any };
	associations: Map<IObject3D | IMaterial | ITexture, IGLTFReference>;

	getDependency: (type: string, index: number) => Promise<any>;
	getDependencies: (type: string) => Promise<any[]>;
	loadBuffer: (bufferIndex: number) => Promise<ArrayBuffer>;
	loadBufferView: (bufferViewIndex: number) => Promise<ArrayBuffer>;
	loadAccessor: (accessorIndex: number) => Promise<IBufferAttribute | IInterleavedBufferAttribute>;
	loadTexture: (textureIndex: number) => Promise<ITexture>;
	loadTextureImage: (
		textureIndex: number,
		/**
		 * GLTF.Image
		 * See: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/schema/image.schema.json
		 */
		source: { [key: string]: any },
		loader: ILoader
	) => Promise<ITexture>;
	assignTexture: (
		materialParams: { [key: string]: any },
		mapName: string,
		mapDef: {
			index: number;
			texCoord?: number | undefined;
			extensions?: any;
		}
	) => Promise<void>;
	assignFinalMaterial: (object: IMesh) => void;
	getMaterialType: () => any;
	loadMaterial: (materialIndex: number) => Promise<IMaterial>;
	createUniqueName: (originalName: string) => string;
	createNodeMesh: (nodeIndex: number) => Promise<IGroup | IMesh | ISkinnedMesh>;
	loadGeometries: (
		/**
		 * GLTF.Primitive[]
		 * See: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/schema/mesh.primitive.schema.json
		 */
		primitives: Array<{ [key: string]: any }>
	) => Promise<IBufferGeometry[]>;
	loadMesh: (meshIndex: number) => Promise<IGroup | IMesh | ISkinnedMesh>;
	loadCamera: (cameraIndex: number) => Promise<ICamera>;
	loadSkin: (skinIndex: number) => Promise<{
		joints: number[];
		inverseBindMatrices?: IBufferAttribute | IInterleavedBufferAttribute | undefined;
	}>;
	loadAnimation: (animationIndex: number) => Promise<IAnimationClip>;
	loadNode: (nodeIndex: number) => Promise<IObject3D>;
	loadScene: () => Promise<IGroup>;
}

export interface IGLTFLoaderPlugin {
	beforeRoot?: (() => Promise<void> | null) | undefined;
	afterRoot?: ((result: IGLTF) => Promise<void> | null) | undefined;
	loadMesh?: ((meshIndex: number) => Promise<IGroup | IMesh | ISkinnedMesh> | null) | undefined;
	loadBufferView?: ((bufferViewIndex: number) => Promise<ArrayBuffer> | null) | undefined;
	loadMaterial?: ((materialIndex: number) => Promise<IMaterial> | null) | undefined;
	loadTexture?: ((textureIndex: number) => Promise<ITexture> | null) | undefined;
	getMaterialType?: ((materialIndex: number) => IMaterial | null) | undefined;
	extendMaterialParams?:
		| ((materialIndex: number, materialParams: { [key: string]: any }) => Promise<any> | null)
		| undefined;
	createNodeMesh?: ((nodeIndex: number) => Promise<IGroup | IMesh | ISkinnedMesh> | null) | undefined;
	createNodeAttachment?: ((nodeIndex: number) => Promise<IObject3D> | null) | undefined;
}

export interface IHDRCubeTextureLoader extends ILoader {
	hdrLoader: IRGBELoader;
	type: O3JS.TextureDataType;

	load(
		urls: string[],
		onLoad: (texture: ICubeTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): ICubeTexture;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ICubeTexture>;
	setDataType(type: O3JS.TextureDataType): this;
}

export interface IIFCLoaderSettings {
	COORDINATE_TO_ORIGIN: boolean;
	USE_FAST_BOOLS: boolean;
	CIRCLE_SEGMENTS_LOW?: number;
	CIRCLE_SEGMENTS_MEDIUM?: number;
	CIRCLE_SEGMENTS_HIGH?: number;
}

export interface IIFCJSONObject {
	expressID: number;
	type: string;

	[key: string]: any;
}

export interface IIFCHighlightConfig {
	scene: IObject3D;
	ids: number[];
	removePrevious: boolean;
	material?: IMaterial;
}

export interface IIFCHighlightConfigOfModel extends IIFCHighlightConfig {
	modelID: number;
}

export interface IIFCManager {
	parse(buffer: ArrayBuffer): Promise<IIFCModel>;

	/**
	 * Sets the relative path of web-ifc.wasm file in the project.
	 * Beware: you **must** serve this file in your page; this means
	 * that you have to copy this files from *node_modules/web-ifc*
	 * to your deployment directory.
	 *
	 * If you don't use this methods,
	 * IFC.js assumes that you are serving it in the root directory.
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
	applyWebIfcConfig(settings: IIFCLoaderSettings): void;

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
			[id: number]: IIFCJSONObject;
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
	close(modelID: number, scene?: IScene): void;

	/**
	 * Gets the **Express ID** to which the given face belongs.
	 * This ID uniquely identifies this entity within this IFC file.
	 * @geometry The geometry of the IFC model.
	 * @faceIndex The index of the face of a geometry.You can easily get this index using the [Raycaster](https://threejs.org/docs/#api/en/core/Raycaster).
	 */
	getExpressId(geometry: IBufferGeometry, faceIndex: number): number | undefined;

	/**
	 * Returns all items of the specified type. You can import
	 * the types from *web-ifc*.
	 *
	 * Example to get all the standard walls of a project:
	 * ```js
	 * import { IFCWALLSTANDARDCASE } from 'web-ifc';
	 * const walls = ifcLoader.getAllItemsOfType(IFCWALLSTANDARDCASE);
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
	 * Gets the [property sets](https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifckernel/lexical/ifcpropertyset.htm)
	 * assigned to the given element.
	 * @modelID ID of the IFC model.
	 * @id Express ID of the element.
	 * @recursive If true, this gets the native properties of the referenced elements recursively.
	 */
	getPropertySets(modelID: number, id: number, recursive?: boolean): any[];

	/**
	 * Gets the properties of the type assigned to the element.
	 * For example, if applied to a wall (IfcWall), this would get back the information
	 * contained in the IfcWallType assigned to it, if any.
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
	 * [spatial structure](https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifcproductextension/lexical/ifcspatialstructureelement.htm)
	 * is the hierarchical structure that organizes every IFC project (all physical items
	 * are referenced to an element of the spatial structure). It is formed by
	 * one IfcProject that contains one or more IfcSites, that contain one or more
	 * IfcBuildings, that contain one or more IfcBuildingStoreys, that contain
	 * one or more IfcSpaces.
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
	getSubset(modelID: number, material?: IMaterial): IMesh | null;

	/**
	 * Removes the specified subset.
	 * @modelID ID of the IFC model.
	 * @parent The parent where the subset is (can be any `THREE.Object3D`).
	 * @material Material assigned to the subset, if any.
	 */
	removeSubset(modelID: number, parent?: IObject3D, material?: IMaterial): void;

	/**
	 * Creates a new geometric subset.
	 * @config A configuration object with the following options:
	 * - **scene**: `THREE.Object3D` where the model is located.
	 * - **modelID**: ID of the model.
	 * - **ids**: Express IDs of the items of the model that will conform the subset.
	 * - **removePrevious**: wether to remove the previous subset of this model with this material.
	 * - **material**: (optional) wether to apply a material to the subset
	 */
	createSubset(config: IIFCHighlightConfigOfModel): void | IMesh;

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

export interface IIFCModel extends IMesh {
	modelID: number;
	ifcManager: IIFCManager | null;
	/**
	 * @deprecated `IfcModel` is already a mesh; you can place it in the scene directly.
	 */
	mesh: this;

	setIFCManager(manager: IIFCManager): void;

	/**
	 * @deprecated Use `IfcModel.ifcManager.setWasmPath` instead.
	 *
	 * Sets the relative path of web-ifc.wasm file in the project.
	 * Beware: you **must** serve this file in your page; this means
	 * that you have to copy this files from *node_modules/web-ifc*
	 * to your deployment directory.
	 *
	 * If you don't use this methods,
	 * IFC.js assumes that you are serving it in the root directory.
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
	close(scene?: IScene): void;

	/**
	 * @deprecated Use `IfcModel.ifcManager.getExpressId` instead.
	 *
	 * Gets the **Express ID** to which the given face belongs.
	 * This ID uniquely identifies this entity within this IFC file.
	 * @geometry The geometry of the IFC model.
	 * @faceIndex The index of the face of a geometry.You can easily get this index using the [Raycaster](https://threejs.org/docs/#api/en/core/Raycaster).
	 */
	getExpressId(geometry: IBufferGeometry, faceIndex: number): number | undefined;

	/**
	 * @deprecated Use `IfcModel.ifcManager.getAllItemsOfType` instead.
	 *
	 * Returns all items of the specified type. You can import
	 * the types from *web-ifc*.
	 *
	 * Example to get all the standard walls of a project:
	 * ```js
	 * import { IFCWALLSTANDARDCASE } from 'web-ifc';
	 * const walls = ifcLoader.getAllItemsOfType(IFCWALLSTANDARDCASE);
	 * ```
	 * @ifcType The type of IFC items to get.
	 * @verbose If false (default), this only gets IDs. If true, this also gets the native properties of all the fetched items.
	 */
	getAllItemsOfType(type: number, verbose: boolean): any[];

	/**
	 * @deprecated Use `IfcModel.ifcManager.getItemProperties` instead.
	 *
	 * Gets the native properties of the given element.
	 * @id Express ID of the element.
	 * @recursive Wether you want to get the information of the referenced elements recursively.
	 */
	getItemProperties(id: number, recursive?: boolean): any;

	/**
	 * @deprecated Use `IfcModel.ifcManager.getPropertySets` instead.
	 *
	 * Gets the [property sets](https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifckernel/lexical/ifcpropertyset.htm)
	 * assigned to the given element.
	 * @id Express ID of the element.
	 * @recursive If true, this gets the native properties of the referenced elements recursively.
	 */
	getPropertySets(id: number, recursive?: boolean): any[];

	/**
	 * @deprecated Use `IfcModel.ifcManager.getTypeProperties` instead.
	 *
	 * Gets the properties of the type assigned to the element.
	 * For example, if applied to a wall (IfcWall), this would get back the information
	 * contained in the IfcWallType assigned to it, if any.
	 * @id Express ID of the element.
	 * @recursive If true, this gets the native properties of the referenced elements recursively.
	 */
	getTypeProperties(id: number, recursive?: boolean): any[];

	/**
	 * @deprecated Use `IfcModel.ifcManager.getIfcType` instead.
	 *
	 * Gets the ifc type of the specified item.
	 * @id Express ID of the element.
	 */
	getIfcType(id: number): string;

	/**
	 * @deprecated Use `IfcModel.ifcManager.getSpatialStructure` instead.
	 *
	 * Gets the spatial structure of the project. The
	 * [spatial structure](https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifcproductextension/lexical/ifcspatialstructureelement.htm)
	 * is the hierarchical structure that organizes every IFC project (all physical items
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
	getSubset(material?: IMaterial): IMesh | null;

	/**
	 * @deprecated Use `IfcModel.ifcManager.removeSubset` instead.
	 *
	 * Removes the specified subset.
	 * @parent The parent where the subset is (can be any `THREE.Object3D`).
	 * @material Material assigned to the subset, if any.
	 */
	removeSubset(parent?: IObject3D, material?: IMaterial): void;

	/**
	 * @deprecated Use `IfcModel.ifcManager.createSubset` instead.
	 *
	 * Creates a new geometric subset.
	 * @config A configuration object with the following options:
	 * - **scene**: `THREE.Object3D` where the model is located.
	 * - **ids**: Express IDs of the items of the model that will conform the subset.
	 * - **removePrevious**: Wether to remove the previous subset of this model with this material.
	 * - **material**: (optional) Wether to apply a material to the subset
	 */
	createSubset(config: IIFCHighlightConfig): void | IMesh;

	/**
	 * @deprecated Use `IfcModel.ifcManager.hideItems` instead.
	 *
	 * Hides the selected items in the specified model
	 * @ids Express ID of the elements.
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
	 * @ids Express ID of the elements.
	 */
	showItems(ids: number[]): void;

	/**
	 * @deprecated Use `IfcModel.ifcManager.showAllItems` instead.
	 *
	 * Shows all the items of the specified model
	 */
	showAllItems(): void;
}

export interface IIFCLoader extends ILoader {
	ifcManager: IIFCManager;
	load(
		url: any,
		onLoad: (ifc: IIFCModel) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;

	parse(buffer: ArrayBuffer): Promise<IIFCModel>;
}

export interface IKTX {
	mipmaps: object[];
	width: number;
	height: number;
	format: O3JS.PixelFormat | O3JS.CompressedPixelFormat;
	mipmapCount: number;
	isCubemap: boolean;
}

export interface IKTXLoader extends ICompressedTextureLoader {
	parse(buffer: ArrayBuffer, loadMipmaps: boolean): IKTX;
}

export interface ILDrawLoader extends ILoader {
	load(
		url: string,
		onLoad: (data: IGroup) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IGroup>;
	setFileMap(fileMap: Record<string, string>): void;
	setMaterials(materials: IMaterial[]): void;

	parse(text: string, path: string, onLoad: (data: IGroup) => void): void;

	addMaterial(material: IMaterial): void;
	getMaterial(colourCode: string): IMaterial | null;
}

export interface ILottieLoader extends ILoader {
	load(
		url: string,
		onLoad: (texture: ICanvasTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ICanvasTexture>;
	setQuality(value: number): void;
}

export interface ILUT3dlResult {
	size: number;
	texture: IDataTexture;
	texture3D: IDataTexture3D;
}

export interface ILUT3dlLoader extends ILoader {
	load(
		url: string,
		onLoad: (result: ILUT3dlResult) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: Error) => void
	): any;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ILUT3dlResult>;
	parse(data: string): ILUT3dlResult;
}

export interface ILWO {
	materials: IMaterial[];
	meshes: IObject3D[];
}

export interface ILWOLoaderParameters {
	/**
	 * Base content delivery folder path, use when it differs from Lightwave default structure
	 */
	resourcePath?: string;
}

export interface ILWOLoader extends ILoader {
	new (manager?: ILoadingManager, parameters?: ILWOLoaderParameters): this;

	load(
		url: string,
		onLoad: (lwo: ILWO) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ILWO>;
	parse(data: ArrayBuffer, path: string, modelName: string): ILWO;
}

export interface ILUTCubeResult {
	title: string;
	size: number;
	domainMin: IVector3;
	domainMax: IVector3;
	texture: IDataTexture;
	texture3D: IDataTexture3D;
}

export interface ILUTCubeLoader extends ILoader {
	load(
		url: string,
		onLoad: (result: ILUTCubeResult) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: Error) => void
	): any;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ILUTCubeResult>;
	parse(data: string): ILUTCubeResult;
}

export interface IMD2Loader extends ILoader {
	load(
		url: string,
		onLoad: (geometry: IBufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IBufferGeometry>;
	parse(data: ArrayBuffer): IBufferGeometry;
}

export interface IMDD {
	morphTargets: IBufferAttribute[];
	clip: IAnimationClip;
}

export interface IMDDLoader extends ILoader {
	load(
		url: string,
		onLoad: (result: IMDD) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IMDD>;
	parse(data: ArrayBuffer): IMDD;
}

export interface IMMDLoaderAnimationObject {
	animation: IAnimationClip;
	mesh: ISkinnedMesh;
}

export interface IMMDLoader extends ILoader {
	animationBuilder: object;
	animationPath: string;
	loader: IFileLoader;
	meshBuilder: object;
	parser: object | null;

	load(
		url: string,
		onLoad: (mesh: ISkinnedMesh) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ISkinnedMesh>;
	loadAnimation(
		url: string,
		object: ISkinnedMesh | ICamera,
		onLoad: (object: ISkinnedMesh | IAnimationClip) => void,
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
		onLoad: (object: IMMDLoaderAnimationObject) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	setAnimationPath(animationPath: string): this;
}

export interface IMTLLoader extends ILoader {
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

export interface IVolume {
	new (xLength?: number, yLength?: number, zLength?: number, type?: string, arrayBuffer?: ArrayLike<number>): this;

	xLength: number;
	yLength: number;
	zLength: number;

	axisOrder: Array<'x' | 'y' | 'z'>;

	data: ArrayLike<number>;

	spacing: number[];
	offset: number[];

	matrix: IMatrix3;

	lowerThreshold: number;
	upperThreshold: number;

	sliceList: IVolumeSlice[];

	getData(i: number, j: number, k: number): number;
	access(i: number, j: number, k: number): number;
	reverseAccess(index: number): number[];

	map(functionToMap: () => void, context: this): this;

	extractPerpendicularPlane(axis: string, RASIndex: number): object;
	extractSlice(axis: string, index: number): IVolumeSlice;

	repaintAllSlices(): this;
	computeMinMax(): number[];
}

export interface IVolumeSlice {
	new (volume: IVolume, index?: number, axis?: string): this;
	index: number;
	axis: string;

	canvas: HTMLCanvasElement;
	canvasBuffer: HTMLCanvasElement;

	ctx: CanvasRenderingContext2D;
	ctxBuffer: CanvasRenderingContext2D;

	mesh: IMesh;

	geometryNeedsUpdate: boolean;

	sliceAccess: number;
	jLength: number;
	iLength: number;
	matrix: IMatrix3;

	repaint(): void;
	updateGeometry(): void;
}

export interface INRRDLoader extends ILoader {
	path: string;
	fieldFunctions: object;

	load(
		url: string,
		onLoad: (group: IVolume) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	parse(data: string): IVolume;
	parseChars(array: number[], start?: number, end?: number): string;
	setPath(value: string): this;
}

export interface IOBJLoader extends ILoader {
	materials: any;

	load(
		url: string,
		onLoad: (group: IGroup) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IGroup>;
	parse(data: string): IGroup;
	setMaterials(materials: any): this;
}

export interface IPCDLoader extends ILoader {
	littleEndian: boolean;
	load(
		url: string,
		onLoad: (points: IPoints) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IPoints>;
	parse(data: ArrayBuffer | string, url: string): IPoints;
}

export interface IPDB {
	geometryAtoms: IBufferGeometry;
	geometryBonds: IBufferGeometry;
	json: {
		atoms: any[][];
	};
}

export interface IPDBLoader extends ILoader {
	load(
		url: string,
		onLoad: (pdb: IPDB) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IPDB>;
	parse(text: string): IPDB;
}

export interface IPRWMLoader extends ILoader {
	load(
		url: string,
		onLoad: (geometry: IBufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IBufferGeometry>;
	parse(data: ArrayBuffer): IBufferGeometry;
	isBigEndianPlatform(): boolean;
}

export interface IPLYLoader extends ILoader {
	propertyNameMapping: object;
	load(
		url: string,
		onLoad: (geometry: IBufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IBufferGeometry>;
	setPropertyNameMapping(mapping: object): void;
	parse(data: ArrayBuffer | string): IBufferGeometry;
}

export interface IPVR {
	mipmaps: object[];
	width: number;
	height: number;
	format: O3JS.CompressedPixelFormat;
	mipmapCount: number;
	isCubemap: boolean;
}

export interface IPVRLoader extends ICompressedTextureLoader {
	parse(buffer: ArrayBuffer, loadMipmaps: boolean): IPVR;
}

export interface ILoaderUtils {
	decodeText(array: BufferSource): string;
	extractUrlBase(url: string): string;
	resolveURL(url: string, path: string): string;
}

export interface IRGBE {
	width: number;
	height: number;
	data: Float32Array | Uint8Array;
	header: string;
	gamma: number;
	exposure: number;
	format: O3JS.PixelFormat;
	type: O3JS.TextureDataType;
}

export interface IRGBELoader extends IDataTextureLoader {
	type: O3JS.TextureDataType;
	parse(buffer: ArrayBuffer): IRGBE;
	setDataType(type: O3JS.TextureDataType): this;
}

export interface IRGBM {
	width: number;
	height: number;
	data: Uint8Array;
	header: string;
	format: O3JS.PixelFormat;
	type: O3JS.TextureDataType;
	flipY: boolean;
	encoding: O3JS.TextureEncoding;
}

export interface IRGBMLoader extends IDataTextureLoader {
	loadCubemap(
		urls: string[],
		onLoad?: (texture: ICubeTexture) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): ICubeTexture;

	parse(buffer: ArrayBuffer): IRGBM;
}

export interface ISTLLoader extends ILoader {
	load(
		url: string,
		onLoad: (geometry: IBufferGeometry) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IBufferGeometry>;
	parse(data: ArrayBuffer | string): IBufferGeometry;
}

export interface ISVGResultPaths extends IShapePath {
	userData?:
		| {
				[key: string]: any;
		  }
		| undefined;
}

export interface ISVGResult {
	paths: ISVGResultPaths[];
	xml: XMLDocument;
}

export interface IStrokeStyle {
	strokeColor: string;
	strokeWidth: number;
	strokeLineJoin: string;
	strokeLineCap: string;
	strokeMiterLimit: number;
}

export interface ISVGLoader extends ILoader {
	defaultDPI: number;
	defaultUnit: string;

	load(
		url: string,
		onLoad: (data: ISVGResult) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ISVGResult>;
	parse(text: string): ISVGResult;

	getStrokeStyle(
		width?: number,
		color?: string,
		lineJoin?: string,
		lineCap?: string,
		miterLimit?: number
	): IStrokeStyle;

	pointsToStroke(points: IVector3[], style: IStrokeStyle, arcDivisions?: number, minDistance?: number): IBufferGeometry;
	pointsToStrokeWithBuffers(
		points: IVector3[],
		style: IStrokeStyle,
		arcDivisions?: number,
		minDistance?: number,
		vertices?: number[],
		normals?: number[],
		uvs?: number[],
		vertexOffset?: number
	): number;
	createShapes(shapePath: IShapePath): IShape[];
}

export interface ITDSLoader extends ILoader {
	debug: boolean;
	group: IGroup;
	manager: ILoadingManager;
	materials: IMaterial[];
	meshes: IMesh[];
	position: number;

	load(
		url: string,
		onLoad: (object: IGroup) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IGroup>;
	parse(arraybuffer: ArrayBuffer, path: string): IGroup;

	debugMessage(message: object): void;
	endChunk(chunk: object): void;
	nextChunk(data: DataView, chunk: object): void;
	readByte(data: DataView): number;
	readChunk(data: DataView): object;
	readColor(data: DataView): IColor;
	readDWord(data: DataView): number;
	readFaceArray(data: DataView, mesh: IMesh): void;
	readFile(arraybuffer: ArrayBuffer, path: string): void;
	readFloat(data: DataView): number;
	readInt(data: DataView): number;
	readMap(data: DataView, path: string): ITexture;
	readMesh(data: DataView): IMesh;
	readMeshData(data: DataView, path: string): void;
	readMaterialEntry(data: DataView, path: string): void;
	readMaterialGroup(data: DataView): object;
	readNamedObject(data: DataView): void;
	readShort(data: DataView): number;
	readString(data: DataView, maxLength: number): string;
	readWord(data: DataView): number;
	resetPosition(): void;
}

export interface ITGALoader extends IDataTextureLoader {
	load(
		url: string,
		onLoad?: (texture: IDataTexture, texData: object) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): IDataTexture;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IDataTexture>;
	parse(data: ArrayBuffer): IDataTexture;
}

export interface ITTFLoader extends ILoader {
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

export interface IAudio<NodeType extends AudioNode = GainNode> extends IObject3D {
	new (listener: IAudioListener): this;
	type: 'Audio';
	listener: IAudioListener;
	context: AudioContext;
	gain: GainNode;

	/**
	 * @default false
	 */
	autoplay: boolean;
	buffer: null | AudioBuffer;

	/**
	 * @default 0
	 */
	detune: number;

	/**
	 * @default false
	 */
	loop: boolean;

	/**
	 * @default 0
	 */
	loopStart: number;

	/**
	 * @default 0
	 */
	loopEnd: number;

	/**
	 * @default 0
	 */
	offset: number;

	/**
	 * @default undefined
	 */
	duration: number | undefined;

	/**
	 * @default 1
	 */
	playbackRate: number;

	/**
	 * @default false
	 */
	isPlaying: boolean;

	/**
	 * @default true
	 */
	hasPlaybackControl: boolean;

	/**
	 * @default 'empty'
	 */
	sourceType: string;
	source: null | AudioBufferSourceNode;

	/**
	 * @default []
	 */
	filters: AudioNode[];

	getOutput(): NodeType;
	setNodeSource(audioNode: AudioBufferSourceNode): this;
	setMediaElementSource(mediaElement: HTMLMediaElement): this;
	setMediaStreamSource(mediaStream: MediaStream): this;
	setBuffer(audioBuffer: AudioBuffer): this;
	play(delay?: number): this;
	onEnded(): void;
	pause(): this;
	stop(): this;
	connect(): this;
	disconnect(): this;
	setDetune(value: number): this;
	getDetune(): number;
	getFilters(): AudioNode[];
	setFilters(value: AudioNode[]): this;
	getFilter(): AudioNode;
	setFilter(filter: AudioNode): this;
	setPlaybackRate(value: number): this;
	getPlaybackRate(): number;
	getLoop(): boolean;
	setLoop(value: boolean): this;
	setLoopStart(value: number): this;
	setLoopEnd(value: number): this;
	getVolume(): number;
	setVolume(value: number): this;
	/**
	 * @deprecated Use {@link AudioLoader} instead.
	 */
	load(file: string): IAudio;
}

export interface IPositionalAudio extends IAudio<PannerNode> {
	panner: PannerNode;

	getOutput(): PannerNode;
	setRefDistance(value: number): this;
	getRefDistance(): number;
	setRolloffFactor(value: number): this;
	getRolloffFactor(): number;
	setDistanceModel(value: string): this;
	getDistanceModel(): string;
	setMaxDistance(value: number): this;
	getMaxDistance(): number;
	setDirectionalCone(coneInnerAngle: number, coneOuterAngle: number, coneOuterGain: number): this;
	updateMatrixWorld(force?: boolean): void;
}

export interface IAudioListener extends IObject3D {
	type: 'AudioListener';
	context: AudioContext;
	gain: GainNode;

	/**
	 * @default null
	 */
	filter: any;

	/**
	 * @default 0
	 */
	timeDelta: number;

	getInput(): GainNode;
	removeFilter(): this;
	setFilter(value: any): this;
	getFilter(): any;
	setMasterVolume(value: number): this;
	getMasterVolume(): number;
	updateMatrixWorld(force?: boolean): void;
}

export interface IKMZLoader extends ILoader {
	load(
		url: string,
		onLoad: (kmz: ICollada) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ICollada>;
	parse(data: ArrayBuffer): ICollada;
}

export interface IKTX2Loader extends ICompressedTextureLoader {
	setTranscoderPath(path: string): IKTX2Loader;
	setWorkerLimit(limit: number): IKTX2Loader;
	detectSupport(renderer: IWebGLRenderer): IKTX2Loader;
	dispose(): IKTX2Loader;

	parse(
		buffer: ArrayBuffer,
		onLoad: (texture: ICompressedTexture) => void,
		onError?: (event: ErrorEvent) => void
	): IKTX2Loader;
}

export interface IAudioAnalyser {
	new (audio: IAudio<AudioNode>, fftSize?: number): this;
	analyser: AnalyserNode;
	data: Uint8Array;
	getFrequencyData(): Uint8Array;
	getAverageFrequency(): number;
}

export interface IAudioLoader extends ILoader {
	load(
		url: string,
		onLoad: (audioBuffer: AudioBuffer) => void,
		onProgress?: (request: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void
	): void;
	loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<AudioBuffer>;
}

export interface IAnimationObjectGroup {
	new (...args: any[]): this;
	uuid: string;
	stats: {
		bindingsPerObject: number;
		objects: {
			total: number;
			inUse: number;
		};
	};
	readonly isAnimationObjectGroup: true;

	add(...args: any[]): void;
	remove(...args: any[]): void;
	uncache(...args: any[]): void;
}

export interface IAnimationUtils {
	arraySlice(array: any, from: number, to: number): any;
	convertArray(array: any, type: any, forceClone: boolean): any;
	isTypedArray(object: any): boolean;
	getKeyFrameOrder(times: number[]): number[];
	sortedArray(values: any[], stride: number, order: number[]): any[];
	flattenJSON(jsonKeys: string[], times: any[], values: any[], valuePropertyName: string): void;

	/**
	 * @param sourceClip
	 * @param name
	 * @param startFrame
	 * @param endFrame
	 * @param [fps=30]
	 */
	subclip(sourceClip: IAnimationClip, name: string, startFrame: number, endFrame: number, fps?: number): IAnimationClip;

	/**
	 * @param targetClip
	 * @param [referenceFrame=0]
	 * @param [referenceClip=targetClip]
	 * @param [fps=30]
	 */
	makeClipAdditive(
		targetClip: IAnimationClip,
		referenceFrame?: number,
		referenceClip?: IAnimationClip,
		fps?: number
	): IAnimationClip;
}

export interface IArrowHelper extends IObject3D {
	/**
	 * @param [dir] Direction from origin. Must be a unit vector.
	 * @param [origin] Point at which the arrow starts.
	 * @param [length] Length of the arrow.
	 * @param [color] Hexadecimal value to define color.
	 * @param [headLength] The length of the head of the arrow.
	 * @param [headWidth] The width of the head of the arrow.
	 */
	new (
		dir?: IVector3 | O3JS.Vector3,
		origin?: IVector3 | O3JS.Vector3,
		length?: number,
		color?: TColorRepresentation,
		headLength?: number,
		headWidth?: number
	): this;

	/**
	 * @default 'ArrowHelper'
	 */
	type: string;

	/**
	 * Contains the line part of the arrowHelper.
	 */
	line: ILine;

	/**
	 * Contains the cone part of the arrowHelper.
	 */
	cone: IMesh;

	/**
	 * @param dir The desired direction. Must be a unit vector.
	 */
	setDirection(dir: IVector3 | O3JS.Vector3): void;

	/**
	 * @param length The desired length.
	 * @param [headLength] The length of the head of the arrow.
	 * @param [headWidth] The width of the head of the arrow.
	 */
	setLength(length: number, headLength?: number, headWidth?: number): void;

	/**
	 * @param color The desired color.
	 */
	setColor(color: TColorRepresentation): void;
}

export interface IAxesHelper extends ILineSegments {
	/**
	 * @param [size=1]
	 */
	new (size?: number): this;

	/**
	 * @default 'AxesHelper'
	 */
	type: string;

	setColors(xAxisColor: IColor, yAxisColor: IColor, zAxisColor: IColor): this;

	dispose(): void;
}

export interface IBox3Helper extends ILineSegments {
	/**
	 * @param box
	 * @param [color=0xffff00]
	 */
	new (box: IBox3, color?: IColor): this;

	/**
	 * @default 'Box3Helper'
	 */
	type: string;

	box: IBox3;
}

export interface IBoxHelper extends ILineSegments {
	/**
	 * @param object
	 * @param [color=0xffff00]
	 */
	new (object: IObject3D, color?: TColorRepresentation): this;

	/**
	 * @default 'BoxHelper'
	 */
	type: string;

	update(object?: IObject3D): void;

	setFromObject(object: IObject3D): this;
}

export interface ICameraHelper extends ILineSegments {
	new (camera: ICamera): this;

	camera: ICamera;
	pointMap: { [id: string]: number[] };

	/**
	 * @default 'CameraHelper'
	 */
	type: string;

	update(): void;

	dispose(): void;
}

export interface IDirectionalLightHelper extends IObject3D {
	/**
	 * @param light
	 * @param [size=1]
	 * @param color
	 */
	new (light: IDirectionalLight, size?: number, color?: TColorRepresentation): this;

	light: IDirectionalLight;
	lightPlane: ILine;
	targetLine: ILine;

	/**
	 * @default undefined
	 */
	color: TColorRepresentation | undefined;
	matrix: IMatrix4;

	/**
	 * @default false
	 */
	matrixAutoUpdate: boolean;

	dispose(): void;
	update(): void;
}

export interface IGridHelper extends ILineSegments {
	new (size?: number, divisions?: number, color1?: TColorRepresentation, color2?: TColorRepresentation): this;

	/**
	 * @default 'GridHelper'
	 */
	type: string;

	/**
	 * @deprecated Colors should be specified in the constructor.
	 */
	setColors(color1?: TColorRepresentation, color2?: TColorRepresentation): void;
}

export interface IHemisphereLightHelper extends IObject3D {
	new (light: IHemisphereLight, size: number, color?: TColorRepresentation): this;
	light: IHemisphereLight;
	matrix: IMatrix4;
	matrixAutoUpdate: boolean;
	material: IMeshBasicMaterial;

	color: TColorRepresentation | undefined;

	dispose(): void;
	update(): void;
}

export interface IPlaneHelper extends ILineSegments {
	new (plane: IPlane, size?: number, hex?: number): this;
	/**
	 * @default 'PlaneHelper'
	 */
	type: string;

	plane: IPlane;

	/**
	 * @default 1
	 */
	size: number;

	updateMatrixWorld(force?: boolean): void;
}

export interface IPointLightHelper extends IObject3D {
	new (light: IPointLight, sphereSize?: number, color?: TColorRepresentation): this;
	/**
	 * @default 'PointLightHelper'
	 */
	type: string;

	light: IPointLight;
	color: TColorRepresentation | undefined;
	matrix: IMatrix4;

	/**
	 * @default false
	 */
	matrixAutoUpdate: boolean;

	dispose(): void;
	update(): void;
}

export interface IPolarGridHelper extends ILineSegments {
	/**
	 * @param [radius=10]
	 * @param [radials=16]
	 * @param [circles=8]
	 * @param [divisions=64]
	 * @param [color1=0x444444]
	 * @param [color2=0x888888]
	 */
	new (
		radius?: number,
		radials?: number,
		circles?: number,
		divisions?: number,
		color1?: TColorRepresentation,
		color2?: TColorRepresentation
	): this;
	/**
	 * @default 'PolarGridHelper'
	 */
	type: string;
}

export interface ISkeletonHelper extends ILineSegments {
	new (object: IObject3D): this;

	/**
	 * @default 'SkeletonHelper'
	 */
	type: string;

	bones: IBone[];
	root: IObject3D;

	readonly isSkeletonHelper: true;

	matrix: IMatrix4;

	/**
	 * @default false
	 */
	matrixAutoUpdate: boolean;

	getBoneList(object: IObject3D): IBone[];
	update(): void;
}

export interface ISpotLightHelper extends IObject3D {
	new (light: ILight, color?: TColorRepresentation): this;

	light: ILight;
	matrix: IMatrix4;

	/**
	 * @default false
	 */
	matrixAutoUpdate: boolean;
	color: TColorRepresentation | undefined;
	cone: ILineSegments;

	dispose(): void;
	update(): void;
}

/**
 * Object3D
 */
export interface IObject3D extends IEventDispatcher<IEvent> {
	new (): this;

	/**
	 * Unique number of this object instance.
	 */
	id: number;

	uuid: string;

	/**
	 * Optional name of the object (doesn't need to be unique).
	 * @default ''
	 */
	name: string;

	/**
	 * @default 'Object3D'
	 */
	type: string;

	/**
	 * Object's parent in the scene graph.
	 * @default null
	 */
	parent: IObject3D | null;

	/**
	 * Array with object's children.
	 * @default []
	 */
	children: IObject3D[];

	/**
	 * Up direction.
	 * @default THREE.Object3D.DefaultUp.clone()
	 */
	up: IVector3;

	/**
	 * Object's local position.
	 * @default new IVector3()
	 */
	readonly position: IVector3;

	/**
	 * Object's local rotation (Euler angles), in radians.
	 * @default new THREE.Euler()
	 */
	readonly rotation: IEuler;

	/**
	 * Object's local rotation as a Quaternion.
	 * @default new THREE.Quaternion()
	 */
	readonly quaternion: IQuaternion;

	/**
	 * Object's local scale.
	 * @default new IVector3()
	 */
	readonly scale: IVector3;

	/**
	 * @default new IMatrix4()
	 */
	readonly modelViewMatrix: IMatrix4;

	/**
	 * @default new IMatrix3()
	 */
	readonly normalMatrix: IMatrix3;

	/**
	 * Local transform.
	 * @default new IMatrix4()
	 */
	matrix: IMatrix4;

	/**
	 * The global transform of the object. If the Object3d has no parent, then it's identical to the local transform.
	 * @default new IMatrix4()
	 */
	matrixWorld: IMatrix4;

	/**
	 * When this is set, it calculates the matrix of position, (rotation or quaternion) and scale every frame and also
	 * recalculates the matrixWorld property.
	 * @default THREE.Object3D.DefaultMatrixAutoUpdate
	 */
	matrixAutoUpdate: boolean;

	/**
	 * When this is set, it calculates the matrixWorld in that frame and resets this property to false.
	 * @default false
	 */
	matrixWorldNeedsUpdate: boolean;

	/**
	 * @default new THREE.Layers()
	 */
	layers: ILayers;
	/**
	 * Object gets rendered if true.
	 * @default true
	 */
	visible: boolean;

	/**
	 * Gets rendered into shadow map.
	 * @default false
	 */
	castShadow: boolean;

	/**
	 * Material gets baked in shadow receiving.
	 * @default false
	 */
	receiveShadow: boolean;

	/**
	 * When this is set, it checks every frame if the object is in the frustum of the camera before rendering the object.
	 * If set to false the object gets rendered every frame even if it is not in the frustum of the camera.
	 * @default true
	 */
	frustumCulled: boolean;

	/**
	 * Overrides the default rendering order of scene graph objects, from lowest to highest renderOrder.
	 * Opaque and transparent objects remain sorted independently though.
	 * When this property is set for an instance of Group, all descendants objects will be sorted and rendered together.
	 * @default 0
	 */
	renderOrder: number;

	/**
	 * Array with animation clips.
	 * @default []
	 */
	animations: IAnimationClip[];

	/**
	 * An object that can be used to store custom data about the Object3d. It should not hold references to functions as these will not be cloned.
	 * @default {}
	 */
	userData: { [key: string]: any };

	/**
	 * Custom depth material to be used when rendering to the depth map. Can only be used in context of meshes.
	 * When shadow-casting with a DirectionalLight or SpotLight, if you are (a) modifying vertex positions in
	 * the vertex shader, (b) using a displacement map, (c) using an alpha map with alphaTest, or (d) using a
	 * transparent texture with alphaTest, you must specify a customDepthMaterial for proper shadows.
	 */
	customDepthMaterial: IMaterial;

	/**
	 * Same as customDepthMaterial, but used with PointLight.
	 */
	customDistanceMaterial: IMaterial;

	/**
	 * Used to check whether this or derived classes are Object3Ds. Default is true.
	 * You should not change this, as it is used internally for optimisation.
	 */
	readonly isObject3D: true;

	/**
	 * Calls before rendering object
	 */
	onBeforeRender: (
		renderer: IWebGLRenderer,
		scene: IScene,
		camera: ICamera,
		geometry: IBufferGeometry,
		material: IMaterial,
		group: IGroup
	) => void;

	/**
	 * Calls after rendering object
	 */
	onAfterRender: (
		renderer: IWebGLRenderer,
		scene: IScene,
		camera: ICamera,
		geometry: IBufferGeometry,
		material: IMaterial,
		group: IGroup
	) => void;

	/**
	 * This updates the position, rotation and scale with the matrix.
	 */
	applyMatrix4(matrix: IMatrix4): void;

	applyQuaternion(quaternion: IQuaternion | O3JS.Quaternion): this;

	setRotationFromAxisAngle(axis: IVector3 | O3JS.Vector3, angle: number): void;

	setRotationFromEuler(euler: IEuler | O3JS.Euler): void;

	setRotationFromMatrix(m: IMatrix4 | O3JS.Matrix4): void;

	setRotationFromQuaternion(q: IQuaternion | O3JS.Quaternion): void;

	/**
	 * Rotate an object along an axis in object space. The axis is assumed to be normalized.
	 * @param axis	A normalized vector in object space.
	 * @param angle	The angle in radians.
	 */
	rotateOnAxis(axis: IVector3 | O3JS.Vector3, angle: number): this;

	/**
	 * Rotate an object along an axis in world space. The axis is assumed to be normalized. Method Assumes no rotated parent.
	 * @param axis	A normalized vector in object space.
	 * @param angle	The angle in radians.
	 */
	rotateOnWorldAxis(axis: IVector3 | O3JS.Vector3, angle: number): this;

	/**
	 *
	 * @param angle
	 */
	rotateX(angle: number): this;

	/**
	 *
	 * @param angle
	 */
	rotateY(angle: number): this;

	/**
	 *
	 * @param angle
	 */
	rotateZ(angle: number): this;

	/**
	 * @param axis	A normalized vector in object space.
	 * @param distance	The distance to translate.
	 */
	translateOnAxis(axis: IVector3 | O3JS.Vector3, distance: number): this;

	/**
	 * Translates object along x axis by distance.
	 * @param distance Distance.
	 */
	translateX(distance: number): this;

	/**
	 * Translates object along y axis by distance.
	 * @param distance Distance.
	 */
	translateY(distance: number): this;

	/**
	 * Translates object along z axis by distance.
	 * @param distance Distance.
	 */
	translateZ(distance: number): this;

	/**
	 * Updates the vector from local space to world space.
	 * @param vector A local vector.
	 */
	localToWorld(vector: IVector3 | O3JS.Vector3): IVector3;

	/**
	 * Updates the vector from world space to local space.
	 * @param vector A world vector.
	 */
	worldToLocal(vector: IVector3 | O3JS.Vector3): IVector3;

	/**
	 * Rotates object to face point in space.
	 * @param vector A world vector to look at.
	 */
	lookAt(vector: IVector3 | O3JS.Vector3 | number, y?: number, z?: number): void;

	/**
	 * Adds object as child of this object.
	 */
	add(...object: IObject3D[]): this;

	/**
	 * Removes object as child of this object.
	 */
	remove(...object: IObject3D[]): this;

	/**
	 * Removes this object from its current parent.
	 */
	removeFromParent(): this;

	/**
	 * Removes all child objects.
	 */
	clear(): this;

	/**
	 * Adds object as a child of this, while maintaining the object's world transform.
	 */
	attach(object: IObject3D): this;

	/**
	 * Searches through the object's children and returns the first with a matching id.
	 * @param id	Unique number of the object instance
	 */
	getObjectById(id: number): IObject3D | undefined;

	/**
	 * Searches through the object's children and returns the first with a matching name.
	 * @param name	String to match to the children's Object3d.name property.
	 */
	getObjectByName(name: string): IObject3D | undefined;

	getObjectByProperty(name: string, value: string): IObject3D | undefined;

	getWorldPosition(target: IVector3 | O3JS.Vector3): IVector3;
	getWorldQuaternion(target: IQuaternion | O3JS.Quaternion): IQuaternion | O3JS.Quaternion;
	getWorldScale(target: IVector3 | O3JS.Vector3): IVector3;
	getWorldDirection(target: IVector3 | O3JS.Vector3): IVector3;

	raycast(raycaster: IRaycaster, intersects: IIntersection[]): void;

	traverse(callback: (object: IObject3D) => any): void;

	traverseVisible(callback: (object: IObject3D) => any): void;

	traverseAncestors(callback: (object: IObject3D) => any): void;

	/**
	 * Updates local transform.
	 */
	updateMatrix(): void;

	/**
	 * Updates global transform of the object and its children.
	 */
	updateMatrixWorld(force?: boolean): void;

	updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void;

	toJSON(meta?: { geometries: any; materials: any; textures: any; images: any }): any;

	clone(recursive?: boolean): this;

	/**
	 *
	 * @param object
	 * @param recursive
	 */
	copy(source: this, recursive?: boolean): this;
}

/**
 * Abstract base class for cameras. This class should always be inherited when you build a new camera.
 */
export interface ICamera extends IObject3D {
	/**
	 * This is the inverse of matrixWorld. MatrixWorld contains the Matrix which has the world transform of the Camera.
	 * @default new IMatrix4()
	 */
	matrixWorldInverse: IMatrix4 | O3JS.Matrix4;

	/**
	 * This is the matrix which contains the projection.
	 * @default new IMatrix4()
	 */
	projectionMatrix: IMatrix4 | O3JS.Matrix4;

	/**
	 * This is the inverse of projectionMatrix.
	 * @default new IMatrix4()
	 */
	projectionMatrixInverse: IMatrix4 | O3JS.Matrix4;

	readonly isCamera: true;

	getWorldDirection(target: IVector3 | O3JS.Vector3): IVector3;

	updateMatrixWorld(force?: boolean): void;
}

/**
 * Camera with orthographic projection
 *
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/cameras/OrthographicCamera.js|src/cameras/OrthographicCamera.js}
 *
 * @example
 * const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
 * scene.add( camera );
 */
export interface IOrthographicCamera extends ICamera {
	/**
	 * @param left Camera frustum left plane.
	 * @param right Camera frustum right plane.
	 * @param top Camera frustum top plane.
	 * @param bottom Camera frustum bottom plane.
	 * @param [near=0.1] Camera frustum near plane.
	 * @param [far=2000] Camera frustum far plane.
	 */
	new (left: number, right: number, top: number, bottom: number, near?: number, far?: number): this;

	type: 'OrthographicCamera';

	readonly isOrthographicCamera: true;

	/**
	 * @default 1
	 */
	zoom: number;

	/**
	 * @default null
	 */
	view: null | {
		enabled: boolean;
		fullWidth: number;
		fullHeight: number;
		offsetX: number;
		offsetY: number;
		width: number;
		height: number;
	};

	/**
	 * Camera frustum left plane.
	 * @default -1
	 */
	left: number;

	/**
	 * Camera frustum right plane.
	 * @default 1
	 */
	right: number;

	/**
	 * Camera frustum top plane.
	 * @default 1
	 */
	top: number;

	/**
	 * Camera frustum bottom plane.
	 * @default -1
	 */
	bottom: number;

	/**
	 * Camera frustum near plane.
	 * @default 0.1
	 */
	near: number;

	/**
	 * Camera frustum far plane.
	 * @default 2000
	 */
	far: number;

	/**
	 * Updates the camera projection matrix. Must be called after change of parameters.
	 */
	updateProjectionMatrix(): void;
	setViewOffset(
		fullWidth: number,
		fullHeight: number,
		offsetX: number,
		offsetY: number,
		width: number,
		height: number
	): void;
	clearViewOffset(): void;
	toJSON(meta?: any): any;
}

/**
 * Camera with perspective projection.
 *
 * @source https://github.com/mrdoob/three.js/blob/master/src/cameras/PerspectiveCamera.js
 */
export interface IPerspectiveCamera extends ICamera {
	/**
	 * @param [fov=50] Camera frustum vertical field of view. Default value is 50.
	 * @param [aspect=1] Camera frustum aspect ratio. Default value is 1.
	 * @param [near=0.1] Camera frustum near plane. Default value is 0.1.
	 * @param [far=2000] Camera frustum far plane. Default value is 2000.
	 */
	new (fov?: number, aspect?: number, near?: number, far?: number): this;

	type: 'PerspectiveCamera';

	readonly isPerspectiveCamera: true;

	/**
	 * @default 1
	 */
	zoom: number;

	/**
	 * Camera frustum vertical field of view, from bottom to top of view, in degrees.
	 * @default 50
	 */
	fov: number;

	/**
	 * Camera frustum aspect ratio, window width divided by window height.
	 * @default 1
	 */
	aspect: number;

	/**
	 * Camera frustum near plane.
	 * @default 0.1
	 */
	near: number;

	/**
	 * Camera frustum far plane.
	 * @default 2000
	 */
	far: number;

	/**
	 * @default 10
	 */
	focus: number;

	/**
	 * @default null
	 */
	view: null | {
		enabled: boolean;
		fullWidth: number;
		fullHeight: number;
		offsetX: number;
		offsetY: number;
		width: number;
		height: number;
	};

	/**
	 * @default 35
	 */
	filmGauge: number;

	/**
	 * @default 0
	 */
	filmOffset: number;

	setFocalLength(focalLength: number): void;
	getFocalLength(): number;
	getEffectiveFOV(): number;
	getFilmWidth(): number;
	getFilmHeight(): number;

	/**
	 * Sets an offset in a larger frustum. This is useful for multi-window or multi-monitor/multi-machine setups.
	 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and the monitors are in grid like this:
	 *
	 * +---+---+---+
	 * | A | B | C |
	 * +---+---+---+
	 * | D | E | F |
	 * +---+---+---+
	 *
	 * then for each monitor you would call it like this:
	 *
	 * const w = 1920;
	 * const h = 1080;
	 * const fullWidth = w * 3;
	 * const fullHeight = h * 2;
	 *
	 * // A
	 * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
	 * // B
	 * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
	 * // C
	 * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
	 * // D
	 * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
	 * // E
	 * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
	 * // F
	 * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h ); Note there is no reason monitors have to be the same size or in a grid.
	 *
	 * @param fullWidth full width of multiview setup
	 * @param fullHeight full height of multiview setup
	 * @param x horizontal offset of subcamera
	 * @param y vertical offset of subcamera
	 * @param width width of subcamera
	 * @param height height of subcamera
	 */
	setViewOffset(fullWidth: number, fullHeight: number, x: number, y: number, width: number, height: number): void;
	clearViewOffset(): void;

	/**
	 * Updates the camera projection matrix. Must be called after change of parameters.
	 */
	updateProjectionMatrix(): void;
	toJSON(meta?: any): any;

	/**
	 * @deprecated Use {@link PerspectiveCamera#setFocalLength .setFocalLength()} and {@link PerspectiveCamera#filmGauge .filmGauge} instead.
	 */
	setLens(focalLength: number, frameHeight?: number): void;
}

export interface ICubeCamera extends IObject3D {
	new (near: number, far: number, renderTarget: IWebGLCubeRenderTarget): this;

	type: 'CubeCamera';

	renderTarget: IWebGLCubeRenderTarget;

	update(renderer: IWebGLRenderer, scene: IScene): void;
}

export interface IStereoCamera extends ICamera {
	type: 'StereoCamera';

	/**
	 * @default 1
	 */
	aspect: number;

	/**
	 * @default 0.064
	 */
	eyeSep: number;

	cameraL: IPerspectiveCamera;
	cameraR: IPerspectiveCamera;

	update(camera: IPerspectiveCamera): void;
}

export interface IArrayCamera extends IPerspectiveCamera {
	new (cameras?: IPerspectiveCamera[]): this;

	/**
	 * @default []
	 */
	cameras: IPerspectiveCamera[];
	readonly isArrayCamera: true;
}

export interface ILightShadow {
	camera: ICamera;

	/**
	 * @default 0
	 */
	bias: number;

	/**
	 * @default 0
	 */
	normalBias: number;

	/**
	 * @default 1
	 */
	radius: number;

	/**
	 * @default 8
	 */
	blurSamples: number;

	/**
	 * @default new THREE.Vector2( 512, 512 )
	 */
	mapSize: IVector2 | O3JS.Vector2;

	/**
	 * @default null
	 */
	map: IWebGLRenderTarget;

	/**
	 * @default null
	 */
	mapPass: IWebGLRenderTarget;

	/**
	 * @default new THREE.Matrix4()
	 */
	matrix: IMatrix4;

	/**
	 * @default true
	 */
	autoUpdate: boolean;

	/**
	 * @default false
	 */
	needsUpdate: boolean;

	copy(source: ILightShadow): this;
	clone(recursive?: boolean): this;
	toJSON(): any;
	getFrustum(): number;
	updateMatrices(light: ILight, viewportIndex?: number): void;
	getViewport(viewportIndex: number): IVector4;
	getFrameExtents(): IVector2;
	dispose(): void;
}

/**
 * @example
 * const light = new THREE.PointLight( 0xff0000, 1, 100 );
 * light.position.set( 50, 50, 50 );
 * scene.add( light );
 */
export interface IPointLight extends ILight {
	new (color?: TColorRepresentation, intensity?: number, distance?: number, decay?: number): this;

	/**
	 * @default 'PointLight'
	 */
	type: string;

	/**
	 * Light's intensity.
	 * @default 1
	 */
	intensity: number;

	/**
	 * If non-zero, light will attenuate linearly from maximum intensity at light position down to zero at distance.
	 * @default 0
	 */
	distance: number;

	/**
	 * @default 1
	 */
	decay: number;

	/**
	 * @default new THREE.PointLightShadow()
	 */
	shadow: IPointLightShadow;

	power: number;
}

export interface IPointLightShadow extends ILightShadow {
	camera: IPerspectiveCamera;
}

export interface IRectAreaLight extends ILight {
	new (color?: TColorRepresentation, intensity?: number, width?: number, height?: number): this;
	/**
	 * @default 'RectAreaLight'
	 */
	type: string;

	/**
	 * @default 10
	 */
	width: number;

	/**
	 * @default 10
	 */
	height: number;

	/**
	 * @default 1
	 */
	intensity: number;

	power: number;

	readonly isRectAreaLight: true;
}

/**
 * A point light that can cast shadow in one direction.
 */
export interface ISpotLight extends ILight {
	new (
		color?: TColorRepresentation,
		intensity?: number,
		distance?: number,
		angle?: number,
		penumbra?: number,
		decay?: number
	): this;

	/**
	 * @default 'SpotLight'
	 */
	type: string;

	/**
	 * @default THREE.Object3D.DefaultUp
	 */
	position: IVector3;

	/**
	 * Spotlight focus points at target.position.
	 * @default new THREE.Object3D()
	 */
	target: IObject3D;

	/**
	 * Light's intensity.
	 * @default 1
	 */
	intensity: number;

	/**
	 * If non-zero, light will attenuate linearly from maximum intensity at light position down to zero at distance.
	 * @default 0
	 */
	distance: number;

	/**
	 * Maximum extent of the spotlight, in radians, from its direction.
	 * @default Math.PI / 3.
	 */
	angle: number;

	/**
	 * @default 1
	 */
	decay: number;

	/**
	 * @default new THREE.SpotLightShadow()
	 */
	shadow: ISpotLightShadow;
	power: number;

	/**
	 * @default 0
	 */
	penumbra: number;

	readonly isSpotLight: true;
}

export interface ISpotLightShadow extends ILightShadow {
	camera: IPerspectiveCamera;
	readonly isSpotLightShadow: true;

	/**
	 * @default 1
	 */
	focus: number;
}

/**
 * Abstract base class for lights.
 */
export interface ILight extends IObject3D {
	new (hex?: number | string, intensity?: number): this;
	/**
	 * @default 'Light'
	 */
	type: string;

	color: IColor;

	/**
	 * @default 1
	 */
	intensity: number;
	readonly isLight: true;

	shadow: ILightShadow;
	/**
	 * @deprecated Use shadow.camera.fov instead.
	 */
	shadowCameraFov: any;
	/**
	 * @deprecated Use shadow.camera.left instead.
	 */
	shadowCameraLeft: any;
	/**
	 * @deprecated Use shadow.camera.right instead.
	 */
	shadowCameraRight: any;
	/**
	 * @deprecated Use shadow.camera.top instead.
	 */
	shadowCameraTop: any;
	/**
	 * @deprecated Use shadow.camera.bottom instead.
	 */
	shadowCameraBottom: any;
	/**
	 * @deprecated Use shadow.camera.near instead.
	 */
	shadowCameraNear: any;
	/**
	 * @deprecated Use shadow.camera.far instead.
	 */
	shadowCameraFar: any;
	/**
	 * @deprecated Use shadow.bias instead.
	 */
	shadowBias: any;
	/**
	 * @deprecated Use shadow.mapSize.width instead.
	 */
	shadowMapWidth: any;
	/**
	 * @deprecated Use shadow.mapSize.height instead.
	 */
	shadowMapHeight: any;

	dispose(): void;
}

/**
 * This light's color gets applied to all the objects in the scene globally.
 *
 * @source https://github.com/mrdoob/three.js/blob/master/src/lights/AmbientLight.js
 */
export interface IAmbientLight extends ILight {
	new (color?: TColorRepresentation, intensity?: number): this;
	/**
	 * @default 'AmbientLight'
	 */
	type: string;

	readonly isAmbientLight: true;
}

export interface ILightProbe extends ILight {
	new (sh?: ISphericalHarmonics3, intensity?: number): this;

	/**
	 * @default 'LightProbe'
	 */
	type: string;

	readonly isLightProbe: true;

	/**
	 * @default new THREE.SphericalHarmonics3()
	 */
	sh: ISphericalHarmonics3;
}

export interface IAmbientLightProbe extends ILightProbe {
	readonly isAmbientLightProbe: true;
}

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/lights/DirectionalLight.js|src/lights/DirectionalLight.js}
 *
 * @example
 * // White directional light at half intensity shining from the top.
 * const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
 * directionalLight.position.set( 0, 1, 0 );
 * scene.add( directionalLight );
 */
export interface IDirectionalLight extends ILight {
	new (color?: TColorRepresentation, intensity?: number): this;
	/**
	 * @default 'DirectionalLight'
	 */
	type: string;

	/**
	 * @default THREE.Object3D.DefaultUp
	 */
	readonly position: IVector3;

	/**
	 * Target used for shadow camera orientation.
	 * @default new THREE.Object3D()
	 */
	target: IObject3D;

	/**
	 * Light's intensity.
	 * @default 1
	 */
	intensity: number;

	/**
	 * @default new THREE.DirectionalLightShadow()
	 */
	shadow: IDirectionalLightShadow;
	readonly isDirectionalLight: true;
}

export interface IDirectionalLightShadow extends ILightShadow {
	camera: IOrthographicCamera;
	readonly isDirectionalLightShadow: true;
}

export interface IHemisphereLight extends ILight {
	new (skyColor?: TColorRepresentation, groundColor?: TColorRepresentation, intensity?: number): this;

	/**
	 * @default 'HemisphereLight'
	 */
	type: string;

	/**
	 * @default THREE.Object3D.DefaultUp
	 */
	position: IVector3;

	groundColor: IColor;

	readonly isHemisphereLight: true;
}

export interface IHemisphereLightProbe extends ILightProbe {
	readonly isHemisphereLightProbe: true;
}

export interface IMesh<
	TGeometry extends IBufferGeometry = IBufferGeometry,
	TMaterial extends IMaterial | IMaterial[] = IMaterial | IMaterial[]
> extends IObject3D {
	new (geometry?: TGeometry, material?: TMaterial): this;

	geometry: TGeometry;
	material: TMaterial;
	morphTargetInfluences?: number[] | undefined;
	morphTargetDictionary?: { [key: string]: number } | undefined;
	readonly isMesh: true;
	type: string;
	updateMorphTargets(): void;
	raycast(raycaster: IRaycaster, intersects: IIntersection[]): void;
}

export interface IBone extends IObject3D {
	new (): this;
	readonly isBone: true;
	type: 'Bone';
}

export interface IGroup extends IObject3D {
	new (): this;
	type: 'Group';
	readonly isGroup: true;
}

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/InstancedBufferAttribute.js|src/core/InstancedBufferAttribute.js}
 */
export interface IInstancedBufferAttribute extends IBufferAttribute {
	/**
	 * @default 1
	 */
	meshPerAttribute: number;
}

export interface IInstancedMesh<
	TGeometry extends IBufferGeometry = IBufferGeometry,
	TMaterial extends IMaterial | IMaterial[] = IMaterial | IMaterial[]
> extends IMesh<TGeometry, TMaterial> {
	new (geometry: TGeometry | undefined, material: TMaterial | undefined, count: number): this;
	count: number;
	instanceColor: null | IInstancedBufferAttribute;
	instanceMatrix: IInstancedBufferAttribute;
	readonly isInstancedMesh: true;

	getColorAt(index: number, color: IColor): void;
	getMatrixAt(index: number, matrix: IMatrix4): void;
	setColorAt(index: number, color: IColor): void;
	setMatrixAt(index: number, matrix: IMatrix4): void;
	dispose(): void;
}

export interface ILine<
	TGeometry extends IBufferGeometry = IBufferGeometry,
	TMaterial extends IMaterial | IMaterial[] = IMaterial | IMaterial[]
> extends IObject3D {
	new (geometry?: TGeometry, material?: TMaterial): this;

	geometry: TGeometry;
	material: TMaterial;

	type: 'Line' | 'LineLoop' | 'LineSegments' | string;
	readonly isLine: true;

	morphTargetInfluences?: number[] | undefined;
	morphTargetDictionary?: { [key: string]: number } | undefined;

	computeLineDistances(): this;
	raycast(raycaster: IRaycaster, intersects: IIntersection[]): void;
	updateMorphTargets(): void;
}

/**
 * A class for displaying points. The points are rendered by the WebGLRenderer using gl.POINTS.
 */
export interface IPoints<
	TGeometry extends IBufferGeometry = IBufferGeometry,
	TMaterial extends IMaterial | IMaterial[] = IMaterial | IMaterial[]
> extends IObject3D {
	new (geometry?: TGeometry, material?: TMaterial): this;

	type: 'Points';
	morphTargetInfluences?: number[] | undefined;
	morphTargetDictionary?: { [key: string]: number } | undefined;
	readonly isPoints: true;

	/**
	 * An instance of BufferGeometry, where each vertex designates the position of a particle in the system.
	 */
	geometry: TGeometry;

	/**
	 * An instance of Material, defining the object's appearance. Default is a PointsMaterial with randomised colour.
	 */
	material: TMaterial;

	raycast(raycaster: IRaycaster, intersects: IIntersection[]): void;
	updateMorphTargets(): void;
}

export interface ILineLoop<
	TGeometry extends IBufferGeometry = IBufferGeometry,
	TMaterial extends IMaterial | IMaterial[] = IMaterial | IMaterial[]
> extends ILine<TGeometry, TMaterial> {
	new (geometry?: TGeometry, material?: TMaterial): this;
	type: 'LineLoop';
	readonly isLineLoop: true;
}

export interface ILineSegments<
	TGeometry extends IBufferGeometry = IBufferGeometry,
	TMaterial extends IMaterial | IMaterial[] = IMaterial | IMaterial[]
> extends ILine<TGeometry, TMaterial> {
	new (geometry?: TGeometry, material?: TMaterial): this;
	/**
	 * @default 'LineSegments'
	 */
	type: 'LineSegments' | string;
	readonly isLineSegments: true;
}

export interface ILOD extends IObject3D {
	new (): this;
	type: 'LOD';
	levels: Array<{ distance: number; object: IObject3D }>;
	autoUpdate: boolean;
	readonly isLOD: true;

	addLevel(object: IObject3D, distance?: number): this;
	getCurrentLevel(): number;
	getObjectForDistance(distance: number): IObject3D | null;
	raycast(raycaster: IRaycaster, intersects: IIntersection[]): void;
	update(camera: ICamera): void;
	toJSON(meta: any): any;

	/**
	 * @deprecated Use {@link LOD#levels .levels} instead.
	 */
	objects: any[];
}

export interface ISkeleton {
	new (bones: IBone[], boneInverses?: IMatrix4 | O3JS.Matrix4[]): this;
	uuid: string;
	bones: IBone[];
	boneInverses: IMatrix4 | O3JS.Matrix4[];
	boneMatrices: Float32Array;
	boneTexture: null | IDataTexture;
	boneTextureSize: number;
	frame: number;

	init(): void;
	calculateInverses(): void;
	computeBoneTexture(): this;
	pose(): void;
	update(): void;
	clone(): ISkeleton;
	getBoneByName(name: string): undefined | IBone;
	dispose(): void;

	/**
	 * @deprecated This property has been removed completely.
	 */
	useVertexTexture: boolean;
}

export interface ISkinnedMesh<
	TGeometry extends IBufferGeometry = IBufferGeometry,
	TMaterial extends IMaterial | IMaterial[] = IMaterial | IMaterial[]
> extends IMesh<TGeometry, TMaterial> {
	new (geometry?: TGeometry, material?: TMaterial, useVertexTexture?: boolean): this;
	bindMode: string;
	bindMatrix: IMatrix4 | O3JS.Matrix4;
	bindMatrixInverse: IMatrix4 | O3JS.Matrix4;
	skeleton: ISkeleton;
	readonly isSkinnedMesh: true;

	bind(skeleton: ISkeleton, bindMatrix?: IMatrix4 | O3JS.Matrix4): void;
	pose(): void;
	normalizeSkinWeights(): void;
	updateMatrixWorld(force?: boolean): void;
	boneTransform(index: number, target: IVector3 | O3JS.Vector3): IVector3;
}

export interface ISprite extends IObject3D {
	new (material?: ISpriteMaterial): this;

	type: 'Sprite';
	readonly isSprite: true;

	geometry: IBufferGeometry;
	material: ISpriteMaterial;
	center: IVector2 | O3JS.Vector2;

	raycast(raycaster: IRaycaster, intersects: IIntersection[]): void;
	copy(source: this): this;
}

export interface IShaderChunk {
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

export interface IShader {
	uniforms: { [uniform: string]: IUniform };
	vertexShader: string;
	fragmentShader: string;
}

export interface IShaderLib {
	[name: string]: IShader;
	basic: IShader;
	lambert: IShader;
	phong: IShader;
	standard: IShader;
	matcap: IShader;
	points: IShader;
	dashed: IShader;
	depth: IShader;
	normal: IShader;
	sprite: IShader;
	background: IShader;
	cube: IShader;
	equirect: IShader;
	distanceRGBA: IShader;
	shadow: IShader;
	physical: IShader;
}

export interface IUniformsUtils {
	merge: (uniforms_src: any) => any;
	clone: (uniforms: any) => any;
}

export interface IUniformsLib {
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
