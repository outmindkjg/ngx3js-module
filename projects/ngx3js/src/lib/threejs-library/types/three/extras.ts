import { Color, Vector, Vector2, Vector3 } from './math';
import { WebGLRenderer, WebGLRenderTarget } from './renderers';
import { Scene } from './scenes';
import { CubeTexture, Texture } from './textures';

/**
 * A class containing utility functions for data.
 */
export interface DataUtils {
	/**
	 * @param va A single precision floating point value.
	 * @returns Returns a half precision floating point value represented as an uint16 value.
	 */
	toHalfFloat(val: number): number;
}

/**
 * A class containing utility functions for images.
 */
export interface ImageUtils {
	/**
	 * @param imag The image object.
	 * @returns Returns a data URI containing a representation of the given image.
	 */
	getDataURL(image: any): string;
}

/**
 * This class generates a Prefiltered, Mipmapped Radiance Environment Map (PMREM) from a cubeMap environment texture.
 * This allows different levels of blur to be quickly accessed based on material roughness. It is packed into a special CubeUV format that allows us to perform custom interpolation so that we can support nonlinear formats such as RGBE.l Unlike a traditional mipmap chain, it only goes down to the LOD_MIN level (above), and then creates extra even e filtered 'mips' at the same LOD_MIN resolution, associated with higher roughness levels. In this way we maintain resolution to smoothly interpolate diffuse lighting while limiting sampling computation.
 */
export interface PMREMGenerator {
	/**
	 * This constructor creates a new PMREMGenerator.
	 */
	new (renderer: WebGLRenderer): this;

	/**
	 * Generates a PMREM from a supplied Scene, which can be faster than using an image if networking bandwidth is low.
	 * Optional near and far planes ensure the scene is rendered in its entirety (the cubeCamera is placed at the origin).
	 * @param scene The given scene.
	 * @param sigm A Specifies a blur radius in radians to be applied to the scene before PMREM generation. Default is *0*.
	 * @param near The near plane value. Default is *0.1*.
	 * @param far The far plane value. Default is *100*.
	 */
	fromScene(scene: Scene, sigma?: number, near?: number, far?: number): WebGLRenderTarget;

	/**
	 * Generates a PMREM from an equirectangular texture, which can be either LDR (RGBFormat) or HDR (RGBEFormat).
	 * The ideal input image size is 1k (1024 x 512), as this matches best with the 256 x 256 cubemap output.
	 * @param equirectangular The equirectangular texture.
	 */
	fromEquirectangular(equirectangular: Texture): WebGLRenderTarget;

	/**
	 * Generates a PMREM from an cubemap texture, which can be either LDR (RGBFormat) or HDR (RGBEFormat).
	 * The ideal input cube size is 256 x 256, as this matches best with the 256 x 256 cubemap output.
	 * @param cubemap The cubemap texture.
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
export interface ShapeVec2 {
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
	 * @param contou 2D polygon. An array of THREE.Vector2()
	 */
	area(contour: ShapeVec2[]): number;

	/**
	 * Used internally by [ExtrudeGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ExtrudeGeometry) and [ShapeGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ShapeGeometry) to calculate faces in shapes with holes.
	 * @param contou 2D polygon. An array of [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 * @param hole An array that holds arrays of [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2)s. Each array represents a single hole definition.
	 */
	triangulateShape(contour: ShapeVec2[], holes: ShapeVec2[][]): number[][];

	/**
	 * Used internally by [Path](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Path),
	 * [ExtrudeGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ExtrudeGeometry) and [ShapeGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ShapeGeometry).
	 * @param pt points defining a 2D polygon Note that this is a linear function so it is necessary to calculate separately for x, y  components of a polygon.
	 */
	isClockWise(pts: ShapeVec2[]): boolean;
}

/**
 * An abstract base class for creating a Curve object that contains methods for interpolation.
 * For an array of Curves see [CurvePath](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvePath).
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
	 * @param t A position on the curve. Must be in the range [ 0, 1 ].
	 * @param optionalTarget If specified, the result will be copied into this Vector, otherwise a new Vector will be created.
	 * @returns Returns a vector for a given position on the curve.
	 */
	getPoint(t: number, optionalTarget?: T): T;

	/**
	 * @param u A position on the curve according to the arc length. Must be in the range [ 0, 1 ].
	 * @param optionalTarget If specified, the result will be copied into this Vector, otherwise a new Vector will be created.
	 * @returns Returns a vector for a given position on the curve according to the arc length.
	 */
	getPointAt(u: number, optionalTarget?: T): T;

	/**
	 * @param division number of pieces to divide the curve into. Default is *5*.
	 * @returns Returns a set of divisions + 1 points using getPoint( t ).
	 */
	getPoints(divisions?: number): T[];

	/**
	 * @param division number of pieces to divide the curve into. Default is *5*.
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
	 * Given u in the range ( 0 .. 1 ), returns [t](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) also in the range ( 0 .. 1 ). u and t can then be used to give you points which are equidistant from the ends of the curve, using *.getPoint*.
	 */
	getUtoTmapping(u: number, distance: number): number;

	/**
	 * @param t A position on the curve. Must be in the range [ 0, 1 ].
	 * @param optionalTarget If specified, the result will be copied into this Vector, otherwise a new Vector will be created.
	 * @returns Returns a unit vector tangent at t. If the derived curve does not implement its tangent derivation, two points a small delta apart will be used to find its gradient which seems to give a reasonable approximation.
	 */
	getTangent(t: number, optionalTarget?: T): T;

	/**
	 * @param u A position on the curve according to the arc length. Must be in the range [ 0, 1 ].
	 * @param optionalTarget If specified, the result will be copied into this Vector, otherwise a new Vector will be created.
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
	 * Copies another Curve object to this instance.
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
	 * @param division number of pieces to divide the curve into. Default is *12*.
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
 *
 * ### Code Example
 * ```js
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
	 * @param point array of [Vector2s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
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
	 * Points are added to the [curves](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvePath.curves) array as [LineCurves](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineCurve).
	 * @param point array of [Vector2s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
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
	 * @param points An array of [Vector2s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2)
	 */
	splineThru(pts: Vector2[]): this;

	/**
	 * @param x The center of the arc offset from the last call.
	 * @param radiu The radius of the arc.
	 * @param startAngl The start angle in radians.
	 * @param endAngl The end angle in radians.
	 * @param clockwis Sweep the arc clockwise. Defaults to *false*.
	 * Adds an [EllipseCurve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/EllipseCurve) to the path, positioned relative to *.currentPoint*.
	 */
	arc(aX: number, aY: number, aRadius: number, aStartAngle: number, aEndAngle: number, aClockwise: boolean): this;

	/**
	 * Adds an absolutely positioned [EllipseCurve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/EllipseCurve) to the path.
	 * @param aX The absolute center of the arc.
	 * @param aY The absolute center of the arc.
	 * @param xRadius The radius of the arc.
	 * @param yRadius The radius of the arc.
	 * @param aStartAngle The start angle in radians.
	 * @param aEndAngle The end angle in radians.
	 * @param aClockwise Sweep the arc clockwise. Defaults to *false*.
	 */
	absarc(aX: number, aY: number, aRadius: number, aStartAngle: number, aEndAngle: number, aClockwise: boolean): this;

	/**
	 * @param x The center of the ellipse offset from the last call.
	 * @param xRadiu The radius of the ellipse in the x axis.
	 * @param yRadiu The radius of the ellipse in the y axis.
	 * @param startAngl The start angle in radians.
	 * @param endAngl The end angle in radians.
	 * @param clockwis Sweep the ellipse clockwise. Defaults to *false*.
	 * @param rotatio The rotation angle of the ellipse in radians, counterclockwise from the positive X axis. Optional, defaults to *0*.
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
	 * @param x The absolute center of the ellipse.
	 * @param xRadiu The radius of the ellipse in the x axis.
	 * @param yRadiu The radius of the ellipse in the y axis.
	 * @param startAngl The start angle in radians.
	 * @param endAngl The end angle in radians.
	 * @param clockwis Sweep the ellipse clockwise. Defaults to false.
	 * @param rotatio The rotation angle of the ellipse in radians, counterclockwise from the positive X axis. Optional, defaults to 0.
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
 * Defines an arbitrary 2d shape plane using paths with optional holes. It can be used with [ExtrudeGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ExtrudeGeometry),
 * [ShapeGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ShapeGeometry), to get points, or to get triangulated faces.
 *
 * ### Code Example
 * ```js
 * const heartShape = new THREE.Shape();
 * heartShape.moveTo( 25, 25 );
 * heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
 * heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
 * heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
 * heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
 * heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
 * heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );
 * const extrudeSettings = {
 * 	depth: 8,
 * 	bevelEnabled: true,
 * 	bevelSegments: 2,
 * 	steps: 2,
 * 	bevelSize: 1,
 * 	bevelThickness: 1
 * };
 * const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
 * const mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
 * ```
 *
 * ### Examples
 * [geometry / shapes](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_shapes) |
 * [geometry / extrude / shapes](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_extrude_shapes) |
 * [geometry / extrude / shapes2](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_extrude_shapes2)
 */
export interface Shape extends Path {
	/**
	 * Creates a Shape from the points. The first point defines the offset, then successive points are added to the [curves](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvePath.curves) array as [LineCurves](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineCurve).
	 * If no points are specified, an empty shape is created and the *.currentPoint* is set to the origin.
	 * @param point array of [Vector2s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 */
	new (points?: Vector2[]): this;

	/**
	 * @default 'Shape'
	 */
	type: string;

	/**
	 * [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier) of this instance. This gets automatically assigned, so this shouldn't be edited.
	 */
	uuid: string;

	/**
	 * An array of [paths](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Path) that define the holes in the shape.
	 * @default []
	 */
	holes: Path[];

	/**
	 * Get an array of [Vector2s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) that represent the holes in the shape.
	 * @param division The fineness of the result.
	 */
	getPointsHoles(divisions: number): Vector2[][];

	/**
	 * Call [getPoints](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Curve.getPoints) on the shape and the *.holes* array, and return an object of the form:  { shape holes } where shape and holes are arrays of [Vector2s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 * @param division The fineness of the result.
	 */
	extractPoints(divisions: number): {
		shape: Vector2[];
		holes: Vector2[][];
	};
}

/**
 * This class is used to convert a series of shapes to an array of [Path](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Path)s, for example an SVG shape to a path (see the example below).
 *
 * ### Examples
 * [geometry / extrude / shapes2](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_extrude_shapes2)
 */
export interface ShapePath {
	/**
	 * Creates a new ShapePath. Unlike a [Path](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Path), no points are passed in as the ShapePath is designed to be generated after creation.
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
	 * @param points An array of [Vector2s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2)
	 */
	splineThru(pts: Vector2[]): this;

	/**
	 * @param isCC Changes how solids and holes are generated noHoles -- Whether or not to generate holes Converts the [subPaths](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ShapePath.subPaths) array into an array of Shapes. By default solid shapes are defined clockwise (CW) and holes are defined counterclockwise (CCW). If isCCW is set to true, then those are flipped. If the parameter noHoles is set to true then all paths are set as solid shapes and isCCW is ignored.
	 */
	toShapes(isCCW: boolean, noHoles?: boolean): Shape[];
}

/**
 * Alias for [EllipseCurve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/EllipseCurve).
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
 * Create a smooth 3d spline curve from a series of points using the [Catmull-Rom](https://en.wikipedia.org/wiki/Centripetal_Catmull-Rom_spline) algorithm.
 *
 * ### Examples
 * [WebGL / geometry / extrude / splines](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_extrude_splines)
 *
 * ### Code Example
 * ```js
 * // Create a closed wavey loop
 * const curve = new THREE.CatmullRomCurve3( [
 * 	new THREE.Vector3( -10, 0, 10 ),
 * 	new THREE.Vector3( -5, 5, 5 ),
 * 	new THREE.Vector3( 0, 0, 0 ),
 * 	new THREE.Vector3( 5, -5, 5 ),
 * 	new THREE.Vector3( 10, 0, 10 )
 * ] );
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 * const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
 * // Create the final object to add to the scene
 * const curveObject = new THREE.Line( geometry, material );
 * ```
 */
export interface CatmullRomCurve3 extends Curve<Vector3> {
	/**
	 * @param points – An array of [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) points
	 * @param closed – Whether the curve is closed. Default is *false*.
	 * @param curveType – Type of the curve. Default is *centripetal*.
	 * @param tension – Tension of the curve. Default is *0.5*.
	 */
	new (points?: Vector3[], closed?: boolean, curveType?: string, tension?: number): this;

	/**
	 * @default 'CatmullRomCurve3'
	 */
	type: string;

	/**
	 * The array of [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) points that define the curve. It needs at least two entries.
	 * @default []
	 */
	points: Vector3[];
}

/**
 * Create a smooth 2d [cubic bezier curve](http://en.wikipedia.org/wiki/B%C3%A9zier_curve#mediaviewer/File:Bezier_curve.svg), defined by a start point, endpoint and two control points.
 *
 * ### Code Example
 * ```js
 * const curve = new THREE.CubicBezierCurve(
 * 	new THREE.Vector2( -10, 0 ),
 * 	new THREE.Vector2( -5, 15 ),
 * 	new THREE.Vector2( 20, 15 ),
 * 	new THREE.Vector2( 10, 0 )
 * );
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 * const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
 * // Create the final object to add to the scene
 * const curveObject = new THREE.Line( geometry, material );
 * ```
 */
export interface CubicBezierCurve extends Curve<Vector2> {
	/**
	 * @param v0 – The starting point.
	 * @param v1 – The first control point.
	 * @param v2 – The second control point.
	 * @param v3 – The ending point.
	 */
	new (v0: Vector2, v1: Vector2, v2: Vector2, v3: Vector2): this;

	/**
	 * @default 'CubicBezierCurve'
	 */
	type: string;

	/**
	 * The starting point.
	 * @default new THREE.Vector2()
	 */
	v0: Vector2;

	/**
	 * The first control point.
	 * @default new THREE.Vector2()
	 */
	v1: Vector2;

	/**
	 * The second control point.
	 * @default new THREE.Vector2()
	 */
	v2: Vector2;

	/**
	 * The ending point.
	 * @default new THREE.Vector2()
	 */
	v3: Vector2;
}

/**
 * Create a smooth 3d [cubic bezier curve](http://en.wikipedia.org/wiki/B%C3%A9zier_curve#mediaviewer/File:Bezier_curve.svg), defined by a start point, endpoint and two control points.
 *
 * ### Code Example
 * ```js
 * const curve = new THREE.CubicBezierCurve3(
 * 	new THREE.Vector3( -10, 0, 0 ),
 * 	new THREE.Vector3( -5, 15, 0 ),
 * 	new THREE.Vector3( 20, 15, 0 ),
 * 	new THREE.Vector3( 10, 0, 0 )
 * );
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 * const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
 * // Create the final object to add to the scene
 * const curveObject = new THREE.Line( geometry, material );
 * ```
 */
export interface CubicBezierCurve3 extends Curve<Vector3> {
	/**
	 * @param v0 – The starting point.
	 * @param v1 – The first control point.
	 * @param v2 – The second control point.
	 * @param v3 – The ending point.
	 */
	new (v0: Vector3, v1: Vector3, v2: Vector3, v3: Vector3): this;

	/**
	 * @default 'CubicBezierCurve3'
	 */
	type: string;

	/**
	 * The starting point.
	 * @default new THREE.Vector3()
	 */
	v0: Vector3;

	/**
	 * The first control point.
	 * @default new THREE.Vector3()
	 */
	v1: Vector3;

	/**
	 * The second control point.
	 * @default new THREE.Vector3()
	 */
	v2: Vector3;

	/**
	 * The ending point.
	 * @default new THREE.Vector3()
	 */
	v3: Vector3;
}

/**
 * Creates a 2d curve in the shape of an ellipse. Setting the [xRadius](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Number) equal to the [yRadius](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Number) will result in a circle.
 *
 * ### Code Example
 * ```js
 * const curve = new THREE.EllipseCurve(
 * 	  0,   0, // ax, aY
 * 	10, 10, // xRadius, yRadius
 * 	  0,  2 * Math.PI,  // aStartAngle, aEndAngle
 * 	false,  // aClockwise
 * 	0 // aRotation
 * );
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 * const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
 * // Create the final object to add to the scene
 * const ellipse = new THREE.Line( geometry, material );
 * ```
 */
export interface EllipseCurve extends Curve<Vector2> {
	/**
	 * @param aX – The X center of the ellipse. Default is *0*.
	 * @param aY – The Y center of the ellipse. Default is *0*.
	 * @param xRadius – The radius of the ellipse in the x direction. Default is *1*.
	 * @param yRadius – The radius of the ellipse in the y direction. Default is *1*.
	 * @param aStartAngle – The start angle of the curve in radians starting from the positive X axis.  Default is *0*.
	 * @param aEndAngle – The end angle of the curve in radians starting from the positive X axis. Default is *2 x Math.PI*.
	 * @param aClockwise – Whether the ellipse is drawn clockwise. Default is *false*.
	 * @param aRotation  – The rotation angle of the ellipse in radians, counterclockwise from the positive X axis Default is *0*.
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
	 * The X center of the ellipse.
	 * @default 0
	 */
	aX: number;

	/**
	 * The Y center of the ellipse.
	 * @default 0
	 */
	aY: number;

	/**
	 * The radius of the ellipse in the x direction.
	 * @default 1
	 */
	xRadius: number;

	/**
	 * The radius of the ellipse in the y direction.
	 * @default 1
	 */
	yRadius: number;

	/**
	 * The start angle of the curve in radians starting from the middle right side.
	 * @default 0
	 */
	aStartAngle: number;

	/**
	 * The end angle of the curve in radians starting from the middle right side.
	 * @default 2 * Math.PI
	 */
	aEndAngle: number;

	/**
	 * Whether the ellipse is drawn clockwise.
	 * @default false
	 */
	aClockwise: boolean;

	/**
	 * The rotation angle of the ellipse in radians, counterclockwise from the positive X axis Default is *0*.
	 * @default 0
	 */
	aRotation: number;
}

/**
 * A curve representing a 2d line segment.
 */
export interface LineCurve extends Curve<Vector2> {
	/**
	 * @param v1 – The start point.
	 * @param v2 The end point.
	 */
	new (v1: Vector2, v2: Vector2): this;

	/**
	 * @default 'LineCurve'
	 */
	type: string;

	/**
	 * The start point.
	 * @default new THREE.Vector2()
	 */
	v1: Vector2;

	/**
	 * The end point
	 * @default new THREE.Vector2()
	 */
	v2: Vector2;
}

/**
 * A curve representing a 3d line segment.
 */
export interface LineCurve3 extends Curve<Vector3> {
	/**
	 * @param v1 – The start point.
	 * @param v2 The end point.
	 */
	new (v1: Vector3, v2: Vector3): this;

	/**
	 * @default 'LineCurve3'
	 */
	type: string;

	/**
	 * The start point.
	 * @default new THREE.Vector3()
	 */
	v1: Vector3;

	/**
	 * The end point.
	 * @default new THREE.Vector3()
	 */
	v2: Vector3;
}

/**
 * Create a smooth 2d [quadratic bezier curve](http://en.wikipedia.org/wiki/B%C3%A9zier_curve#mediaviewer/File:B%C3%A9zier_2_big.gif), defined by a startpoint, endpoint and a single control point.
 *
 * ### Code Example
 * ```js
 * const curve = new THREE.QuadraticBezierCurve(
 * 	new THREE.Vector2( -10, 0 ),
 * 	new THREE.Vector2( 20, 15 ),
 * 	new THREE.Vector2( 10, 0 )
 * );
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 * const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
 * // Create the final object to add to the scene
 * const curveObject = new THREE.Line( geometry, material );
 * ```
 */
export interface QuadraticBezierCurve extends Curve<Vector2> {
	/**
	 * @param  v0 – The startpoint.
	 * @param  v1 – The control point.
	 * @param  v2 – The endpoint.
	 */
	new (v0: Vector2, v1: Vector2, v2: Vector2): this;

	/**
	 * @default 'QuadraticBezierCurve'
	 */
	type: string;

	/**
	 * The startpoint.
	 * @default new THREE.Vector2()
	 */
	v0: Vector2;

	/**
	 * The control point.
	 * @default new THREE.Vector2()
	 */
	v1: Vector2;

	/**
	 * The endpoint.
	 * @default new THREE.Vector2()
	 */
	v2: Vector2;
}

/**
 * Create a smooth 3d [quadratic bezier curve](http://en.wikipedia.org/wiki/B%C3%A9zier_curve#mediaviewer/File:B%C3%A9zier_2_big.gif), defined by a startpoint, endpoint and a single control point.
 *
 * ### Code Example
 * ```js
 * const curve = new THREE.QuadraticBezierCurve3(
 * 	new THREE.Vector3( -10, 0, 0 ),
 * 	new THREE.Vector3( 20, 15, 0 ),
 * 	new THREE.Vector3( 10, 0, 0 )
 * );
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 * const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
 * // Create the final object to add to the scene
 * const curveObject = new THREE.Line( geometry, material );
 * ```
 */
export interface QuadraticBezierCurve3 extends Curve<Vector3> {
	/**
	 * @param v0 – The starting point
	 * @param v1 – The middle control point
	 * @param v2 – The ending point
	 */
	new (v0: Vector3, v1: Vector3, v2: Vector3): this;

	/**
	 * @default 'QuadraticBezierCurve3'
	 */
	type: string;

	/**
	 * The startpoint.
	 * @default new THREE.Vector3()
	 */
	v0: Vector3;

	/**
	 * The control point.
	 * @default new THREE.Vector3()
	 */
	v1: Vector3;

	/**
	 * The endpoint.
	 * @default new THREE.Vector3()
	 */
	v2: Vector3;
}

/**
 * Create a smooth 2d spline curve from a series of points. Internally this uses [Interpolations.CatmullRom](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Interpolations.CatmullRom) to create the curve.
 *
 * ### Code Example
 * ```js
 * // Create a sine-like wave
 * const curve = new THREE.SplineCurve( [
 * 	new THREE.Vector2( -10, 0 ),
 * 	new THREE.Vector2( -5, 5 ),
 * 	new THREE.Vector2( 0, 0 ),
 * 	new THREE.Vector2( 5, -5 ),
 * 	new THREE.Vector2( 10, 0 )
 * ] );
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 * const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
 * // Create the final object to add to the scene
 * const splineObject = new THREE.Line( geometry, material );
 * ```
 */
export interface SplineCurve extends Curve<Vector2> {
	/**
	 * @param points An array of [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) points that define the curve.
	 */
	new (points?: Vector2[]): this;

	/**
	 * @default 'SplineCurve'
	 */
	type: string;

	/**
	 * The array of [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) points that define the curve.
	 * @default []
	 */
	points: Vector2[];
}

/**
 * Alias Class for Curve<Vector2>
 */
export interface CurveVector2 extends Curve<Vector2> {}

/**
 * Alias Class for Curve<Vector3>
 */
export interface CurveVector3 extends Curve<Vector3> {}

/**
 * Alias Class for CurvePath<Vector2>
 */
export interface CurvePathVector2 extends CurvePath<Vector2> {}

/**
 * Alias Class for CurvePath<Vector3>
 */
export interface CurvePathVector3 extends CurvePath<Vector3> {}
