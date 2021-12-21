import { Scene } from './scenes';
import { Mapping } from './constants';
import { Color, Vector, Vector2, Vector3 } from './math';
import { WebGLRenderer, WebGLRenderTarget } from './renderers';
import { CubeTexture, Texture } from './textures';

/**
 */
export interface DataUtils {
	/**
	 */
	toHalfFloat(val: number): number;
}

/**
 */
export interface ImageUtils {
	/**
	 */
	getDataURL(image: any): string;

	/**
	 * @deprecated
	 */
	crossOrigin: string;

	/**
	 * @deprecated Use {@link TextureLoader THREE.TextureLoader()} instead.
	 */
	loadTexture(
		url: string,
		mapping?: Mapping,
		onLoad?: (texture: Texture) => void,
		onError?: (message: string) => void
	): Texture;

	/**
	 * @deprecated Use {@link CubeTextureLoader THREE.CubeTextureLoader()} instead.
	 */
	loadTextureCube(
		array: string[],
		mapping?: Mapping,
		onLoad?: (texture: Texture) => void,
		onError?: (message: string) => void
	): Texture;
}

/**
 */
export interface PMREMGenerator {
	/**
	 */
	new (renderer: WebGLRenderer): this;

	/**
	 */
	fromScene(scene: Scene, sigma?: number, near?: number, far?: number): WebGLRenderTarget;

	/**
	 */
	fromEquirectangular(equirectangular: Texture): WebGLRenderTarget;

	/**
	 */
	fromCubemap(cubemap: CubeTexture): WebGLRenderTarget;

	/**
	 */
	compileCubemapShader(): void;

	/**
	 */
	compileEquirectangularShader(): void;

	/**
	 */
	dispose(): void;
}

/**
 */
export interface Vec2 {
	x: number;
	y: number;
}

/**
 */
export interface ShapeUtils {
	/**
	 */
	area(contour: Vec2[]): number;

	/**
	 */
	triangulateShape(contour: Vec2[], holes: Vec2[][]): number[][];

	/**
	 */
	isClockWise(pts: Vec2[]): boolean;
}

// Extras / Core /////////////////////////////////////////////////////////////////////

/**
 * An extensible curve object which contains methods for interpolation
 * class Curve<T extends Vector>
 */
export interface Curve<T extends Vector> {
	/**
	 */
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
		tangents: Vector3[];
		normals: Vector3[];
		binormals: Vector3[];
	};

	/**
	 */
	clone(): this;

	/**
	 */
	copy(source: Curve<T>): this;

	/**
	 */
	toJSON(): object;

	/**
	 */
	fromJSON(json: object): this;

	/**
	 * @deprecated since r84.
	 */
	create(constructorFunc: () => void, getPointFunc: () => void): () => void;
}

/**
 */
export interface CurvePath<T extends Vector> extends Curve<T> {
	/**
	 */
	new (): this;

	/**
	 * @default 'CurvePath'
	 */
	type: string;

	/**
	 * @default []
	 */
	curves: Array<Curve<T>>;

	/**
	 * @default false
	 */
	autoClose: boolean;

	/**
	 */
	add(curve: Curve<T>): void;

	/**
	 */
	closePath(): void;

	/**
	 */
	getPoint(t: number, optionalTarget?: T): T;

	/**
	 */
	getCurveLengths(): number[];
}

/**
 * a 2d path representation, comprising of points, lines, and cubes, similar to the html5 2d canvas api. It extends CurvePath.
 */
export interface Path extends CurvePath<Vector2> {
	/**
	 */
	new (points?: Vector2[]): this;

	/**
	 * @default 'Path'
	 */
	type: string;

	/**
	 * @default new THREE.Vector2()
	 */
	currentPoint: Vector2;

	/**
	 * @deprecated Use {@link Path#setFromPoints .setFromPoints()} instead.
	 */
	fromPoints(vectors: Vector2[]): this;

	/**
	 */
	setFromPoints(vectors: Vector2[]): this;

	/**
	 */
	moveTo(x: number, y: number): this;

	/**
	 */
	lineTo(x: number, y: number): this;

	/**
	 */
	quadraticCurveTo(aCPx: number, aCPy: number, aX: number, aY: number): this;

	/**
	 */
	bezierCurveTo(aCP1x: number, aCP1y: number, aCP2x: number, aCP2y: number, aX: number, aY: number): this;

	/**
	 */
	splineThru(pts: Vector2[]): this;

	/**
	 */
	arc(aX: number, aY: number, aRadius: number, aStartAngle: number, aEndAngle: number, aClockwise: boolean): this;

	/**
	 */
	absarc(aX: number, aY: number, aRadius: number, aStartAngle: number, aEndAngle: number, aClockwise: boolean): this;

	/**
	 */
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

	/**
	 */
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

/**
 * Defines a 2d shape plane using paths.
 */
export interface Shape extends Path {
	/**
	 */
	new (points?: Vector2[]): this;

	/**
	 * @default 'Shape'
	 */
	type: string;

	/**
	 */
	uuid: string;

	/**
	 * @default []
	 */
	holes: Path[];

	/**
	 */
	getPointsHoles(divisions: number): Vector2[][];

	/**
	 */
	extractPoints(divisions: number): {
		shape: Vector2[];
		holes: Vector2[][];
	};
}

/**
 */
export interface ShapePath {
	/**
	 */
	new (): this;

	/**
	 * @default 'ShapePath'
	 */
	type: string;

	/**
	 * @default new THREE.Color()
	 */
	color: Color;

	/**
	 * @default []
	 */
	subPaths: any[];

	/**
	 * @default null
	 */
	currentPath: any;

	/**
	 */
	moveTo(x: number, y: number): this;

	/**
	 */
	lineTo(x: number, y: number): this;

	/**
	 */
	quadraticCurveTo(aCPx: number, aCPy: number, aX: number, aY: number): this;

	/**
	 */
	bezierCurveTo(aCP1x: number, aCP1y: number, aCP2x: number, aCP2y: number, aX: number, aY: number): this;

	/**
	 */
	splineThru(pts: Vector2[]): this;

	/**
	 */
	toShapes(isCCW: boolean, noHoles?: boolean): Shape[];
}

/**
 */
export interface ArcCurve extends EllipseCurve {
	/**
	 */
	new (aX: number, aY: number, aRadius: number, aStartAngle: number, aEndAngle: number, aClockwise: boolean): this;

	/**
	 * @default 'ArcCurve'
	 */
	type: string;
}

// Extras / Curves /////////////////////////////////////////////////////////////////////

/**
 */
export interface CurveUtils {
	/**
	 */
	tangentQuadraticBezier(t: number, p0: number, p1: number, p2: number): number;

	/**
	 */
	tangentCubicBezier(t: number, p0: number, p1: number, p2: number, p3: number): number;

	/**
	 */
	tangentSpline(t: number, p0: number, p1: number, p2: number, p3: number): number;

	/**
	 */
	interpolate(p0: number, p1: number, p2: number, p3: number, t: number): number;
}

/**
 */
export interface CatmullRomCurve3 extends Curve<Vector3> {
	/**
	 * @param [points=[]]
	 * @param [closed=false]
	 * @param [curveType='centripetal']
	 * @param [tension=0.5]
	 */
	new (points?: Vector3[], closed?: boolean, curveType?: string, tension?: number): this;

	/**
	 * @default 'CatmullRomCurve3'
	 */
	type: string;

	/**
	 * @default []
	 */
	points: Vector3[];
}

/**
 */
export interface CubicBezierCurve extends Curve<Vector2> {
	/**
	 */
	new (v0: Vector2, v1: Vector2, v2: Vector2, v3: Vector2): this;

	/**
	 * @default 'CubicBezierCurve'
	 */
	type: string;

	/**
	 * @default new THREE.Vector2()
	 */
	v0: Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v1: Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v2: Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v3: Vector2;
}

/**
 */
export interface CubicBezierCurve3 extends Curve<Vector3> {
	/**
	 */
	new (v0: Vector3, v1: Vector3, v2: Vector3, v3: Vector3): this;

	/**
	 * @default 'CubicBezierCurve3'
	 */
	type: string;

	/**
	 * @default new THREE.Vector3()
	 */
	v0: Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v1: Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v2: Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v3: Vector3;
}

/**
 */
export interface EllipseCurve extends Curve<Vector2> {
	/**
	 */
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

/**
 */
export interface LineCurve extends Curve<Vector2> {
	/**
	 */
	new (v1: Vector2, v2: Vector2): this;

	/**
	 * @default 'LineCurve'
	 */
	type: string;

	/**
	 * @default new THREE.Vector2()
	 */
	v1: Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v2: Vector2;
}

/**
 */
export interface LineCurve3 extends Curve<Vector3> {
	/**
	 */
	new (v1: Vector3, v2: Vector3): this;

	/**
	 * @default 'LineCurve3'
	 */
	type: string;

	/**
	 * @default new THREE.Vector3()
	 */
	v1: Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v2: Vector3;
}

/**
 */
export interface QuadraticBezierCurve extends Curve<Vector2> {
	/**
	 */
	new (v0: Vector2, v1: Vector2, v2: Vector2): this;

	/**
	 * @default 'QuadraticBezierCurve'
	 */
	type: string;

	/**
	 * @default new THREE.Vector2()
	 */
	v0: Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v1: Vector2;

	/**
	 * @default new THREE.Vector2()
	 */
	v2: Vector2;
}

/**
 */
export interface QuadraticBezierCurve3 extends Curve<Vector3> {
	/**
	 */
	new (v0: Vector3, v1: Vector3, v2: Vector3): this;

	/**
	 * @default 'QuadraticBezierCurve3'
	 */
	type: string;

	/**
	 * @default new THREE.Vector3()
	 */
	v0: Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v1: Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	v2: Vector3;
}

/**
 */
export interface SplineCurve extends Curve<Vector2> {
	/**
	 */
	new (points?: Vector2[]): this;

	/**
	 * @default 'SplineCurve'
	 */
	type: string;

	/**
	 * @default []
	 */
	points: Vector2[];
}

/**
 */
export interface CurveVector2 extends Curve<Vector2> {}

/**
 */
export interface CurveVector3 extends Curve<Vector3> {}

/**
 */
export interface CurvePathVector2 extends CurvePath<Vector2> {}

/**
 */
export interface CurvePathVector3 extends CurvePath<Vector3> {}
