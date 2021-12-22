import { Scene } from './scenes';
import { Mapping } from './constants';
import { Color, Vector, Vector2, Vector3 } from './math';
import { WebGLRenderer, WebGLRenderTarget } from './renderers';
import { CubeTexture, Texture } from './textures';

/**
 * A class containing utility functions for data.
 */
export interface DataUtils {
	/**
	 * @param va - A single precision floating point value.
	 * @returns Returns a half precision floating point value represented as an uint16 value.
	 */
	toHalfFloat(val: number): number;
}

/**
 * A class containing utility functions for images.
 */
export interface ImageUtils {
	/**
	 * @param imag - The image object.
	 * @returns Returns a data URI containing a representation of the given image.
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
 * This class generates a Prefiltered, Mipmapped Radiance Environment Map (PMREM) from a cubeMap environment texture.
 * This allows different levels of blur to be quickly accessed based on material roughness. It is packed into a special CubeUV format that allows us to perform custom interpolation so that we can support nonlinear formats such as RGBE.l Unlike a traditional mipmap chain, it only goes down to the LOD_MIN level (above), and then creates extra even e filtered 'mips' at the same LOD_MIN resolution, associated with higher roughness levels. In this way we maintain resolution to smoothly interpolate diffuse lighting while limiting sampling computation.
 */
export interface PMREMGenerator {
	/**
	 * This constructor creates a new [name].
	 */
	new (renderer: WebGLRenderer): this;

	/**
	 * Generates a PMREM from a supplied Scene, which can be faster than using an image if networking bandwidth is low.
	 * Optional near and far planes ensure the scene is rendered in its entirety (the cubeCamera is placed at the origin).
	 * @param scene - The given scene.
	 * @param sigma - Specifies a blur radius in radians to be applied to the scene before PMREM generation. Default is *0*.
	 * @param near - The near plane value. Default is *0.1*.
	 * @param far - The far plane value. Default is *100*.
	 */
	fromScene(scene: Scene, sigma?: number, near?: number, far?: number): WebGLRenderTarget;

	/**
	 * Generates a PMREM from an equirectangular texture, which can be either LDR (RGBFormat) or HDR (RGBEFormat).
	 * The ideal input image size is 1k (1024 x 512), as this matches best with the 256 x 256 cubemap output.
	 * @param equirectangular - The equirectangular texture.
	 */
	fromEquirectangular(equirectangular: Texture): WebGLRenderTarget;

	/**
	 * Generates a PMREM from an cubemap texture, which can be either LDR (RGBFormat) or HDR (RGBEFormat).
	 * The ideal input cube size is 256 x 256, as this matches best with the 256 x 256 cubemap output.
	 * @param cubemap - The cubemap texture.
	 */
	fromCubemap(cubemap: CubeTexture): WebGLRenderTarget;

	/**
	 * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during your texture's network fetch for increased concurrency.
	 */
	compileCubemapShader(): void;

	/**
	 * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during your texture's network fetch for increased concurrency.
	 */
	compileEquirectangularShader(): void;

	/**
	 * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class, so you should not need more than one PMREMGenerator object. If you do, calling dispose() on one of them will cause any others to also become unusable.
	 */
	dispose(): void;
}

/**
 * Vec2
 */
export interface Vec2 {
	x: number;
	y: number;
}

/**
 * A class containing utility functions for shapes.
 * Note that these are all linear functions so it is necessary to calculate separately for x, y (and z, w if present) components of a vector.
 */
export interface ShapeUtils {
	/**
	 * Calculate area of a ( 2D ) contour polygon.
	 * @param contou - 2D polygon. An array of THREE.Vector2()
	 */
	area(contour: Vec2[]): number;

	/**
	 * Used internally by [ExtrudeGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ExtrudeGeometry) and [ShapeGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ShapeGeometry) to calculate faces in shapes with holes.
	 * @param contou - 2D polygon. An array of [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 * @param hole - An array that holds arrays of [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2)s. Each array represents a single hole definition.
	 */
	triangulateShape(contour: Vec2[], holes: Vec2[][]): number[][];

	/**
	 * Used internally by [Path](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Path),
	 * [ExtrudeGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ExtrudeGeometry) and [ShapeGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ShapeGeometry).
	 * @param pt - points defining a 2D polygon Note that this is a linear function so it is necessary to calculate separately for x, y  components of a polygon.
	 */
	isClockWise(pts: Vec2[]): boolean;
}

// Extras / Core /////////////////////////////////////////////////////////////////////

/**
 * An abstract base class for creating a [name] object that contains methods for interpolation.
 * For an array of [name]s see [CurvePath](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvePath).
 */
export interface Curve<T extends Vector> {
	/**
	 * This constructor creates a new Curve.
	 */
	new (): this;

	/**
	 * @default 'Curve'
	 */
	type: string;

	/**
	 * This value determines the amount of divisions when calculating the cumulative segment lengths of a curve via *.getLengths*.
	 * To ensure precision when using methods like *.getSpacedPoints*, it is recommended to increase *.arcLengthDivisions* if the curve is very large. Default is 200.
	 * @default 200
	 */
	arcLengthDivisions: number;

	/**
	 * @param t - A position on the curve. Must be in the range [ 0, 1 ].
	 * @param optionalTarget - If specified, the result will be copied into this Vector, otherwise a new Vector will be created.
	 * @returns Returns a vector for a given position on the curve.
	 */
	getPoint(t: number, optionalTarget?: T): T;

	/**
	 * @param u - A position on the curve according to the arc length. Must be in the range [ 0, 1 ].
	 * @param optionalTarget - If specified, the result will be copied into this Vector, otherwise a new Vector will be created.
	 * @returns Returns a vector for a given position on the curve according to the arc length.
	 */
	getPointAt(u: number, optionalTarget?: T): T;

	/**
	 * @param division - number of pieces to divide the curve into. Default is *5*.
	 * @returns Returns a set of divisions + 1 points using getPoint( t ).
	 */
	getPoints(divisions?: number): T[];

	/**
	 * @param division - number of pieces to divide the curve into. Default is *5*.
	 * @returns Returns a set of divisions + 1 equi-spaced points using getPointAt( u ).
	 */
	getSpacedPoints(divisions?: number): T[];

	/**
	 * Get total curve arc length.
	 */
	getLength(): number;

	/**
	 * Get list of cumulative segment lengths.
	 */
	getLengths(divisions?: number): number[];

	/**
	 * Update the cumlative segment distance cache. The method must be called every time curve parameters are changed.
	 * If an updated curve is part of a composed curve like [CurvePath](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvePath), *.updateArcLengths*() must be called on the composed curve, too.
	 */
	updateArcLengths(): void;

	/**
	 * Given u in the range ( 0 .. 1 ), returns [t](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) also in the range ( 0 .. 1 ).
	 * u and t can then be used to give you points which are equidistant from the ends of the curve, using *.getPoint*.
	 */
	getUtoTmapping(u: number, distance: number): number;

	/**
	 * @param t - A position on the curve. Must be in the range [ 0, 1 ].
	 * @param optionalTarget - If specified, the result will be copied into this Vector, otherwise a new Vector will be created.
	 * @returns Returns a unit vector tangent at t. If the derived curve does not implement its tangent derivation, two points a small delta apart will be used to find its gradient which seems to give a reasonable approximation.
	 */
	getTangent(t: number, optionalTarget?: T): T;

	/**
	 * @param u - A position on the curve according to the arc length. Must be in the range [ 0, 1 ].
	 * @param optionalTarget - If specified, the result will be copied into this Vector, otherwise a new Vector will be created.
	 * @returns Returns tangent at a point which is equidistant to the ends of the curve from the point given in *.getTangent*.
	 */
	getTangentAt(u: number, optionalTarget?: T): T;

	/**
	 * Generates the Frenet Frames. Requires a curve definition in 3D space. Used in geometries like [TubeGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TubeGeometry) or [ExtrudeGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ExtrudeGeometry).
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
	 * Creates a clone of this instance.
	 */
	clone(): this;

	/**
	 * Copies another [name] object to this instance.
	 */
	copy(source: Curve<T>): this;

	/**
	 * @returns Returns a JSON object representation of this instance.
	 */
	toJSON(): object;

	/**
	 * Copies the data from the given JSON object to this instance.
	 */
	fromJSON(json: object): this;

	/**
	 * @deprecated since r84.
	 */
	create(constructorFunc: () => void, getPointFunc: () => void): () => void;
}

/**
 * An abstract base class extending [Curve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Curve). A CurvePath is simply an array of connected curves, but retains the api of a curve.
 */
export interface CurvePath<T extends Vector> extends Curve<T> {
	/**
	 * The constructor take no parameters.
	 */
	new (): this;

	/**
	 * @default 'CurvePath'
	 */
	type: string;

	/**
	 * The array of [Curves](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Curve).
	 * @default []
	 */
	curves: Array<Curve<T>>;

	/**
	 * Whether or not to automatically close the path.
	 * @default false
	 */
	autoClose: boolean;

	/**
	 * Add a curve to the *.curves* array.
	 */
	add(curve: Curve<T>): void;

	/**
	 * Adds a [lineCurve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineCurve) to close the path.
	 */
	closePath(): void;

	/**
	 * @param division - number of pieces to divide the curve into. Default is *12*.
	 * @returns Returns an array of points representing a sequence of curves. The *division* parameter defines the number of pieces each curve is divided into. However, for optimization and quality purposes, the actual sampling resolution for each curve depends on its type. For example, for a [LineCurve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineCurve), the returned number of points is always just 2.
	 */
	getPoint(t: number, optionalTarget?: T): T;

	/**
	 * Get list of cumulative curve lengths of the curves in the *.curves* array.
	 */
	getCurveLengths(): number[];
}

/**
 * A 2D path representation. The class provides methods for creating paths and contours of 2D shapes similar to the 2D Canvas API.
 * ### Code Example
 * ```javascript
 * const path = new THREE.Path();
 * path.lineTo( 0, 0.8 );
 * path.quadraticCurveTo( 0, 1, 0.2, 1 );
 * path.lineTo( 1, 1 );
 * const points = path.getPoints();
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 * const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
 * const line = new THREE.Line( geometry, material );
 * scene.add( line );
 * ```
 */
export interface Path extends CurvePath<Vector2> {
	/**
	 * Creates a Path from the points. The first point defines the offset, then successive points are added to the [curves](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvePath.curves) array as [LineCurves](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineCurve).
	 * If no points are specified, an empty path is created and the *.currentPoint* is set to the origin.
	 * @param point - array of [Vector2s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 */
	new (points?: Vector2[]): this;

	/**
	 * @default 'Path'
	 */
	type: string;

	/**
	 * The current offset of the path. Any new [Curve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Curve) added will start here.
	 * @default new THREE.Vector2()
	 */
	currentPoint: Vector2;

	/**
	 * @deprecated Use {@link Path#setFromPoints .setFromPoints()} instead.
	 */
	fromPoints(vectors: Vector2[]): this;

	/**
	 * Points are added to the [curves](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvePath.curves)
	 * array as [LineCurves](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineCurve).
	 * @param point -  array of [Vector2s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 */
	setFromPoints(vectors: Vector2[]): this;

	/**
	 * Move the *.currentPoint* to x, y.
	 */
	moveTo(x: number, y: number): this;

	/**
	 * Connects a [LineCurve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineCurve) from *.currentPoint* to x, y onto the path.
	 */
	lineTo(x: number, y: number): this;

	/**
	 * Creates a quadratic curve from *.currentPoint* with cpX and cpY as control point and updates *.currentPoint* to x and y.
	 */
	quadraticCurveTo(aCPx: number, aCPy: number, aX: number, aY: number): this;

	/**
	 * This creates a bezier curve from *.currentPoint* with (cp1X, cp1Y) and (cp2X, cp2Y) as control points and updates *.currentPoint* to x and y.
	 */
	bezierCurveTo(aCP1x: number, aCP1y: number, aCP2x: number, aCP2y: number, aX: number, aY: number): this;

	/**
	 * Connects a new [SplineCurve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SplineCurve) onto the path.
	 * @param points - An array of [Vector2s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2)
	 */
	splineThru(pts: Vector2[]): this;

	/**
	 * @param x - The center of the arc offset from the last call.
	 * @param radiu - The radius of the arc.
	 * @param startAngl - The start angle in radians.
	 * @param endAngl - The end angle in radians.
	 * @param clockwis - Sweep the arc clockwise. Defaults to *false*.
	 * Adds an [EllipseCurve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/EllipseCurve) to the path, positioned relative to *.currentPoint*.
	 */
	arc(aX: number, aY: number, aRadius: number, aStartAngle: number, aEndAngle: number, aClockwise: boolean): this;

	/**
	 * Adds an absolutely positioned [EllipseCurve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/EllipseCurve) to the path.
	 * @param aX - The absolute center of the arc.
	 * @param aY - The absolute center of the arc.
	 * @param xRadius - The radius of the arc.
	 * @param yRadius - The radius of the arc.
	 * @param aStartAngle - The start angle in radians.
	 * @param aEndAngle - The end angle in radians.
	 * @param aClockwise - Sweep the arc clockwise. Defaults to *false*.
	 */
	absarc(aX: number, aY: number, aRadius: number, aStartAngle: number, aEndAngle: number, aClockwise: boolean): this;

	/**
	 * @param x - The center of the ellipse offset from the last call.
	 * @param xRadiu - The radius of the ellipse in the x axis.
	 * @param yRadiu - The radius of the ellipse in the y axis.
	 * @param startAngl - The start angle in radians.
	 * @param endAngl - The end angle in radians.
	 * @param clockwis - Sweep the ellipse clockwise. Defaults to *false*.
	 * @param rotatio - The rotation angle of the ellipse in radians, counterclockwise from the positive X axis. Optional, defaults to *0*.
	 * Adds an [EllipseCurve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/EllipseCurve) to the path, positioned relative to *.currentPoint*.
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
	 * @param x - The absolute center of the ellipse.
	 * @param xRadiu - The radius of the ellipse in the x axis.
	 * @param yRadiu - The radius of the ellipse in the y axis.
	 * @param startAngl - The start angle in radians.
	 * @param endAngl - The end angle in radians.
	 * @param clockwis - Sweep the ellipse clockwise. Defaults to false.
	 * @param rotatio - The rotation angle of the ellipse in radians, counterclockwise from the positive X axis. Optional, defaults to 0.
	 * Adds an absolutely positioned [EllipseCurve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/EllipseCurve) to the path.
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
	 * Array of [Path](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Path)s.
	 * @default []
	 */
	subPaths: any[];

	/**
	 * The current [Path](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Path) that is being generated.
	 * @default null
	 */
	currentPath: any;

	/**
	 * Move the *.currentPoint* to x, y.
	 */
	moveTo(x: number, y: number): this;

	/**
	 * Connects a [LineCurve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineCurve) from *.currentPoint* to x, y onto the path.
	 */
	lineTo(x: number, y: number): this;

	/**
	 * Creates a quadratic curve from *.currentPoint* with cpX and cpY as control point and updates *.currentPoint* to x and y.
	 */
	quadraticCurveTo(aCPx: number, aCPy: number, aX: number, aY: number): this;

	/**
	 * This creates a bezier curve from *.currentPoint* with (cp1X, cp1Y) and (cp2X, cp2Y) as control points and updates *.currentPoint* to x and y.
	 */
	bezierCurveTo(aCP1x: number, aCP1y: number, aCP2x: number, aCP2y: number, aX: number, aY: number): this;

	/**
	 * Connects a new [SplineCurve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SplineCurve) onto the path.
	 * @param points - An array of [Vector2s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2)
	 */
	splineThru(pts: Vector2[]): this;

	/**
	 * @param isCC - Changes how solids and holes are generated noHoles -- Whether or not to generate holes Converts the [subPaths](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ShapePath.subPaths) array into an array of Shapes. By default solid shapes are defined clockwise (CW) and holes are defined counterclockwise (CCW). If isCCW is set to true, then those are flipped. If the parameter noHoles is set to true then all paths are set as solid shapes and isCCW is ignored.
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
