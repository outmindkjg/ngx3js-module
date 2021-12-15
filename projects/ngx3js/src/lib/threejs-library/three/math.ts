import { Camera } from './cameras';
import { BufferAttribute, InterleavedBufferAttribute, Object3D } from './core';
import { Sprite } from './objects';

export interface Box2 {
	new (min?: Vector2, max?: Vector2): this;

	/**
	 * @default new THREE.Vector2( + Infinity, + Infinity )
	 */
	min: Vector2;

	/**
	 * @default new THREE.Vector2( - Infinity, - Infinity )
	 */
	max: Vector2;

	set(min: Vector2, max: Vector2): Box2;
	setFromPoints(points: Vector2[]): Box2;
	setFromCenterAndSize(center: Vector2, size: Vector2): Box2;
	clone(): this;
	copy(box: Box2): this;
	makeEmpty(): Box2;
	isEmpty(): boolean;
	getCenter(target: Vector2): Vector2;
	getSize(target: Vector2): Vector2;
	expandByPoint(point: Vector2): Box2;
	expandByVector(vector: Vector2): Box2;
	expandByScalar(scalar: number): Box2;
	containsPoint(point: Vector2): boolean;
	containsBox(box: Box2): boolean;
	getParameter(point: Vector2, target: Vector2): Vector2;
	intersectsBox(box: Box2): boolean;
	clampPoint(point: Vector2, target: Vector2): Vector2;
	distanceToPoint(point: Vector2): number;
	intersect(box: Box2): Box2;
	union(box: Box2): Box2;
	translate(offset: Vector2): Box2;
	equals(box: Box2): boolean;
	/**
	 * @deprecated Use {@link Box2#isEmpty .isEmpty()} instead.
	 */
	empty(): any;
	/**
	 * @deprecated Use {@link Box2#intersectsBox .intersectsBox()} instead.
	 */
	isIntersectionBox(b: any): any;
}

export interface Box3 {
	new (min?: Vector3, max?: Vector3): this;

	/**
	 * @default new THREE.Vector3( + Infinity, + Infinity, + Infinity )
	 */
	min: Vector3;

	/**
	 * @default new THREE.Vector3( - Infinity, - Infinity, - Infinity )
	 */
	max: Vector3;
	readonly isBox3: true;

	set(min: Vector3, max: Vector3): this;
	setFromArray(array: ArrayLike<number>): this;
	setFromBufferAttribute(bufferAttribute: BufferAttribute): this;
	setFromPoints(points: Vector3[]): this;
	setFromCenterAndSize(center: Vector3, size: Vector3): this;
	setFromObject(object: Object3D): this;
	clone(): this;
	copy(box: Box3): this;
	makeEmpty(): this;
	isEmpty(): boolean;
	getCenter(target: Vector3): Vector3;
	getSize(target: Vector3): Vector3;
	expandByPoint(point: Vector3): this;
	expandByVector(vector: Vector3): this;
	expandByScalar(scalar: number): this;
	expandByObject(object: Object3D): this;
	containsPoint(point: Vector3): boolean;
	containsBox(box: Box3): boolean;
	getParameter(point: Vector3, target: Vector3): Vector3;
	intersectsBox(box: Box3): boolean;
	intersectsSphere(sphere: Sphere): boolean;
	intersectsPlane(plane: Plane): boolean;
	intersectsTriangle(triangle: Triangle): boolean;
	clampPoint(point: Vector3, target: Vector3): Vector3;
	distanceToPoint(point: Vector3): number;
	getBoundingSphere(target: Sphere): Sphere;
	intersect(box: Box3): this;
	union(box: Box3): this;
	applyMatrix4(matrix: Matrix4): this;
	translate(offset: Vector3): this;
	equals(box: Box3): boolean;
	/**
	 * @deprecated Use {@link Box3#isEmpty .isEmpty()} instead.
	 */
	empty(): any;
	/**
	 * @deprecated Use {@link Box3#intersectsBox .intersectsBox()} instead.
	 */
	isIntersectionBox(b: any): any;
	/**
	 * @deprecated Use {@link Box3#intersectsSphere .intersectsSphere()} instead.
	 */
	isIntersectionSphere(s: any): any;
}

export interface HSL {
	h: number;
	s: number;
	l: number;
}

export type ColorRepresentation = Color | string | number;

/**
 * Represents a color. See also {@link ColorUtils}.
 *
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/math/Color.js|src/math/Color.js}
 *
 * @example
 * const color = new THREE.Color( 0xff0000 );
 */
export interface Color {
	new (color?: ColorRepresentation): this;
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

	set(color: ColorRepresentation): Color;
	setScalar(scalar: number): Color;
	setHex(hex: number): Color;

	/**
	 * Sets this color from RGB values.
	 * @param r Red channel value between 0 and 1.
	 * @param g Green channel value between 0 and 1.
	 * @param b Blue channel value between 0 and 1.
	 */
	setRGB(r: number, g: number, b: number): Color;

	/**
	 * Sets this color from HSL values.
	 * Based on MochiKit implementation by Bob Ippolito.
	 *
	 * @param h Hue channel value between 0 and 1.
	 * @param s Saturation value channel between 0 and 1.
	 * @param l Value channel value between 0 and 1.
	 */
	setHSL(h: number, s: number, l: number): Color;

	/**
	 * Sets this color from a CSS context style string.
	 * @param contextStyle Color in CSS context style format.
	 */
	setStyle(style: string): Color;

	/**
	 * Sets this color from a color name.
	 * Faster than {@link Color#setStyle .setStyle()} method if you don't need the other CSS-style formats.
	 * @param style Color name in X11 format.
	 */
	setColorName(style: string): Color;

	/**
	 * Clones this color.
	 */
	clone(): this;

	/**
	 * Copies given color.
	 * @param color Color to copy.
	 */
	copy(color: Color): this;

	/**
	 * Copies given color making conversion from gamma to linear space.
	 * @param color Color to copy.
	 */
	copyGammaToLinear(color: Color, gammaFactor?: number): Color;

	/**
	 * Copies given color making conversion from linear to gamma space.
	 * @param color Color to copy.
	 */
	copyLinearToGamma(color: Color, gammaFactor?: number): Color;

	/**
	 * Converts this color from gamma to linear space.
	 */
	convertGammaToLinear(gammaFactor?: number): Color;

	/**
	 * Converts this color from linear to gamma space.
	 */
	convertLinearToGamma(gammaFactor?: number): Color;

	/**
	 * Copies given color making conversion from sRGB to linear space.
	 * @param color Color to copy.
	 */
	copySRGBToLinear(color: Color): Color;

	/**
	 * Copies given color making conversion from linear to sRGB space.
	 * @param color Color to copy.
	 */
	copyLinearToSRGB(color: Color): Color;

	/**
	 * Converts this color from sRGB to linear space.
	 */
	convertSRGBToLinear(): Color;

	/**
	 * Converts this color from linear to sRGB space.
	 */
	convertLinearToSRGB(): Color;

	/**
	 * Returns the hexadecimal value of this color.
	 */
	getHex(): number;

	/**
	 * Returns the string formated hexadecimal value of this color.
	 */
	getHexString(): string;

	getHSL(target: HSL): HSL;

	/**
	 * Returns the value of this color in CSS context style.
	 * Example: rgb(r, g, b)
	 */
	getStyle(): string;

	offsetHSL(h: number, s: number, l: number): this;

	add(color: Color): this;
	addColors(color1: Color, color2: Color): this;
	addScalar(s: number): this;
	sub(color: Color): this;
	multiply(color: Color): this;
	multiplyScalar(s: number): this;
	lerp(color: Color, alpha: number): this;
	lerpColors(color1: Color, color2: Color, alpha: number): this;
	lerpHSL(color: Color, alpha: number): this;
	equals(color: Color): boolean;

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

	fromBufferAttribute(attribute: BufferAttribute, index: number): this;

	/**
	 * List of X11 color names.
	 */
	NAMES: Record<string, number>;
}

export interface Cylindrical {
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
	copy(other: Cylindrical): this;
	set(radius: number, theta: number, y: number): this;
	setFromVector3(vec3: Vector3): this;
	setFromCartesianCoords(x: number, y: number, z: number): this;
}

export interface Euler {
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

	set(x: number, y: number, z: number, order?: string): Euler;
	clone(): this;
	copy(euler: Euler): this;
	setFromRotationMatrix(m: Matrix4, order?: string, update?: boolean): Euler;
	setFromQuaternion(q: Quaternion, order?: string, update?: boolean): Euler;
	setFromVector3(v: Vector3, order?: string): Euler;
	reorder(newOrder: string): Euler;
	equals(euler: Euler): boolean;
	fromArray(xyzo: any[]): Euler;
	toArray(array?: number[], offset?: number): number[];
	toVector3(optionalResult?: Vector3): Vector3;
	_onChange(callback: () => void): this;

	RotationOrders: string[];
	DefaultOrder: string;
}

/**
 * Frustums are used to determine what is inside the camera's field of view. They help speed up the rendering process.
 */
export interface Frustum {
	new (p0?: Plane, p1?: Plane, p2?: Plane, p3?: Plane, p4?: Plane, p5?: Plane): this;

	/**
	 * Array of 6 vectors.
	 */
	planes: Plane[];

	set(p0: Plane, p1: Plane, p2: Plane, p3: Plane, p4: Plane, p5: Plane): Frustum;
	clone(): this;
	copy(frustum: Frustum): this;
	setFromProjectionMatrix(m: Matrix4): this;
	intersectsObject(object: Object3D): boolean;
	intersectsSprite(sprite: Sprite): boolean;
	intersectsSphere(sphere: Sphere): boolean;
	intersectsBox(box: Box3): boolean;
	containsPoint(point: Vector3): boolean;
}

export interface Interpolant {
	new (parameterPositions: any, sampleValues: any, sampleSize: number, resultBuffer?: any): this;

	parameterPositions: any;
	sampleValues: any;
	valueSize: number;
	resultBuffer: any;

	evaluate(time: number): any;
}

export interface CubicInterpolant extends Interpolant {
	new (parameterPositions: any, samplesValues: any, sampleSize: number, resultBuffer?: any): this;

	interpolate_(i1: number, t0: number, t: number, t1: number): any;
}

export interface DiscreteInterpolant extends Interpolant {
	new (parameterPositions: any, samplesValues: any, sampleSize: number, resultBuffer?: any): this;

	interpolate_(i1: number, t0: number, t: number, t1: number): any;
}

export interface LinearInterpolant extends Interpolant {
	new (parameterPositions: any, samplesValues: any, sampleSize: number, resultBuffer?: any): this;

	interpolate_(i1: number, t0: number, t: number, t1: number): any;
}

export interface QuaternionLinearInterpolant extends Interpolant {
	new (parameterPositions: any, samplesValues: any, sampleSize: number, resultBuffer?: any): this;

	interpolate_(i1: number, t0: number, t: number, t1: number): any;
}

export interface Line3 {
	new (start?: Vector3, end?: Vector3): this;

	/**
	 * @default new THREE.Vector3()
	 */
	start: Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	end: Vector3;

	set(start?: Vector3, end?: Vector3): Line3;
	clone(): this;
	copy(line: Line3): this;
	getCenter(target: Vector3): Vector3;
	delta(target: Vector3): Vector3;
	distanceSq(): number;
	distance(): number;
	at(t: number, target: Vector3): Vector3;
	closestPointToPointParameter(point: Vector3, clampToLine?: boolean): number;
	closestPointToPoint(point: Vector3, clampToLine: boolean, target: Vector3): Vector3;
	applyMatrix4(matrix: Matrix4): Line3;
	equals(line: Line3): boolean;
}

export interface MathUtils {
	/**
	 * @see {@link https://github.com/mrdoob/three.js/blob/master/src/math/MathUtils.js|src/math/MathUtils.js}
	 */

	DEG2RAD: number;
	RAD2DEG: number;

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

	setQuaternionFromProperEuler(q: Quaternion, a: number, b: number, c: number, order: string): void;
}

export type Matrix3Tuple = [number, number, number, number, number, number, number, number, number];

/**
 * ( interface Matrix<T> )
 */
export interface Matrix {
	/**
	 * Array with matrix values.
	 */
	elements: number[];

	/**
	 * identity():T;
	 */
	identity(): Matrix;

	/**
	 * copy(m:T):T;
	 */
	copy(m: this): this;

	/**
	 * multiplyScalar(s:number):T;
	 */
	multiplyScalar(s: number): Matrix;

	determinant(): number;

	/**
	 * transpose():T;
	 */
	transpose(): Matrix;

	/**
	 * invert():T;
	 */
	invert(): Matrix;

	/**
	 * clone():T;
	 */
	clone(): Matrix;
}

/**
 * ( class Matrix3 extends Matrix<Matrix3> )
 */
export interface Matrix3 extends Matrix {
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
	): Matrix3;
	identity(): Matrix3;
	clone(): this;
	copy(m: Matrix3): this;
	extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): Matrix3;
	setFromMatrix4(m: Matrix4): Matrix3;
	multiplyScalar(s: number): Matrix3;
	determinant(): number;

	/**
	 * Inverts this matrix in place.
	 */
	invert(): Matrix3;

	/**
	 * Transposes this matrix in place.
	 */
	transpose(): Matrix3;
	getNormalMatrix(matrix4: Matrix4): Matrix3;

	/**
	 * Transposes this matrix into the supplied array r, and returns itself.
	 */
	transposeIntoArray(r: number[]): Matrix3;

	setUvTransform(tx: number, ty: number, sx: number, sy: number, rotation: number, cx: number, cy: number): Matrix3;

	scale(sx: number, sy: number): Matrix3;

	rotate(theta: number): Matrix3;

	translate(tx: number, ty: number): Matrix3;

	equals(matrix: Matrix3): boolean;

	/**
	 * Sets the values of this matrix from the provided array or array-like.
	 * @param array the source array or array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): Matrix3;

	/**
	 * Returns an array with the values of this matrix, or copies them into the provided array.
	 * @param array (optional) array to store the matrix to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray(array?: number[], offset?: number): number[];
	toArray(array?: Matrix3Tuple, offset?: 0): Matrix3Tuple;

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
	multiply(m: Matrix3): Matrix3;

	premultiply(m: Matrix3): Matrix3;

	/**
	 * Sets this matrix to a x b.
	 */
	multiplyMatrices(a: Matrix3, b: Matrix3): Matrix3;

	/**
	 * @deprecated Use {@link Vector3.applyMatrix3 vector.applyMatrix3( matrix )} instead.
	 */
	multiplyVector3(vector: Vector3): any;

	/**
	 * @deprecated This method has been removed completely.
	 */
	multiplyVector3Array(a: any): any;

	/**
	 * @deprecated Use {@link Matrix3#invert .invert()} instead.
	 */
	getInverse(matrix: Matrix4, throwOnDegenerate?: boolean): Matrix3;
	getInverse(matrix: Matrix): Matrix;

	/**
	 * @deprecated Use {@link Matrix3#toArray .toArray()} instead.
	 */
	flattenToArrayOffset(array: number[], offset: number): number[];
}

export type Matrix4Tuple = [
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
 * A 4x4 Matrix.
 *
 * @example
 * // Simple rig for rotating around 3 axes
 * const m = new THREE.Matrix4();
 * const m1 = new THREE.Matrix4();
 * const m2 = new THREE.Matrix4();
 * const m3 = new THREE.Matrix4();
 * const alpha = 0;
 * const beta = Math.PI;
 * const gamma = Math.PI/2;
 * m1.makeRotationX( alpha );
 * m2.makeRotationY( beta );
 * m3.makeRotationZ( gamma );
 * m.multiplyMatrices( m1, m2 );
 * m.multiply( m3 );
 */
export interface Matrix4 extends Matrix {
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
	): Matrix4;

	/**
	 * Resets this matrix to identity.
	 */
	identity(): Matrix4;
	clone(): Matrix4;
	copy(m: Matrix4): this;
	copyPosition(m: Matrix4): Matrix4;
	extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): Matrix4;
	makeBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): Matrix4;

	/**
	 * Copies the rotation component of the supplied matrix m into this matrix rotation component.
	 */
	extractRotation(m: Matrix4): Matrix4;
	makeRotationFromEuler(euler: Euler): Matrix4;
	makeRotationFromQuaternion(q: Quaternion): Matrix4;
	/**
	 * Constructs a rotation matrix, looking from eye towards center with defined up vector.
	 */
	lookAt(eye: Vector3, target: Vector3, up: Vector3): Matrix4;

	/**
	 * Multiplies this matrix by m.
	 */
	multiply(m: Matrix4): Matrix4;

	premultiply(m: Matrix4): Matrix4;

	/**
	 * Sets this matrix to a x b.
	 */
	multiplyMatrices(a: Matrix4, b: Matrix4): Matrix4;

	/**
	 * Sets this matrix to a x b and stores the result into the flat array r.
	 * r can be either a regular Array or a TypedArray.
	 *
	 * @deprecated This method has been removed completely.
	 */
	multiplyToArray(a: Matrix4, b: Matrix4, r: number[]): Matrix4;

	/**
	 * Multiplies this matrix by s.
	 */
	multiplyScalar(s: number): Matrix4;

	/**
	 * Computes determinant of this matrix.
	 * Based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
	 */
	determinant(): number;

	/**
	 * Transposes this matrix.
	 */
	transpose(): Matrix4;

	/**
	 * Sets the position component for this matrix from vector v.
	 */
	setPosition(v: Vector3 | number, y?: number, z?: number): Matrix4;

	/**
	 * Inverts this matrix.
	 */
	invert(): Matrix4;

	/**
	 * Multiplies the columns of this matrix by vector v.
	 */
	scale(v: Vector3): Matrix4;

	getMaxScaleOnAxis(): number;
	/**
	 * Sets this matrix as translation transform.
	 */
	makeTranslation(x: number, y: number, z: number): Matrix4;

	/**
	 * Sets this matrix as rotation transform around x axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	makeRotationX(theta: number): Matrix4;

	/**
	 * Sets this matrix as rotation transform around y axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	makeRotationY(theta: number): Matrix4;

	/**
	 * Sets this matrix as rotation transform around z axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	makeRotationZ(theta: number): Matrix4;

	/**
	 * Sets this matrix as rotation transform around axis by angle radians.
	 * Based on http://www.gamedev.net/reference/articles/article1199.asp.
	 *
	 * @param axis Rotation axis.
	 * @param theta Rotation angle in radians.
	 */
	makeRotationAxis(axis: Vector3, angle: number): Matrix4;

	/**
	 * Sets this matrix as scale transform.
	 */
	makeScale(x: number, y: number, z: number): Matrix4;

	/**
	 * Sets this matrix as shear transform.
	 */
	makeShear(xy: number, xz: number, yx: number, yz: number, zx: number, zy: number): Matrix4;

	/**
	 * Sets this matrix to the transformation composed of translation, rotation and scale.
	 */
	compose(translation: Vector3, rotation: Quaternion, scale: Vector3): Matrix4;

	/**
	 * Decomposes this matrix into it's position, quaternion and scale components.
	 */
	decompose(translation: Vector3, rotation: Quaternion, scale: Vector3): Matrix4;

	/**
	 * Creates a frustum matrix.
	 */
	makePerspective(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4;

	/**
	 * Creates a perspective projection matrix.
	 */
	makePerspective(fov: number, aspect: number, near: number, far: number): Matrix4;

	/**
	 * Creates an orthographic projection matrix.
	 */
	makeOrthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): Matrix4;
	equals(matrix: Matrix4): boolean;

	/**
	 * Sets the values of this matrix from the provided array or array-like.
	 * @param array the source array or array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): Matrix4;

	/**
	 * Returns an array with the values of this matrix, or copies them into the provided array.
	 * @param array (optional) array to store the matrix to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray(array?: number[], offset?: number): number[];
	toArray(array?: Matrix4Tuple, offset?: 0): Matrix4Tuple;

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
	setFromMatrix3(m: Matrix3): Matrix4;

	/**
	 * @deprecated Use {@link Matrix4#copyPosition .copyPosition()} instead.
	 */
	extractPosition(m: Matrix4): Matrix4;

	/**
	 * @deprecated Use {@link Matrix4#makeRotationFromQuaternion .makeRotationFromQuaternion()} instead.
	 */
	setRotationFromQuaternion(q: Quaternion): Matrix4;

	/**
	 * @deprecated Use {@link Vector3#applyMatrix4 vector.applyMatrix4( matrix )} instead.
	 */
	multiplyVector3(v: any): any;

	/**
	 * @deprecated Use {@link Vector4#applyMatrix4 vector.applyMatrix4( matrix )} instead.
	 */
	multiplyVector4(v: any): any;

	/**
	 * @deprecated This method has been removed completely.
	 */
	multiplyVector3Array(array: number[]): number[];

	/**
	 * @deprecated Use {@link Vector3#transformDirection Vector3.transformDirection( matrix )} instead.
	 */
	rotateAxis(v: any): void;

	/**
	 * @deprecated Use {@link Vector3#applyMatrix4 vector.applyMatrix4( matrix )} instead.
	 */
	crossVector(v: any): void;

	/**
	 * @deprecated Use {@link Matrix4#toArray .toArray()} instead.
	 */
	flattenToArrayOffset(array: number[], offset: number): number[];

	/**
	 * @deprecated Use {@link Matrix4#invert .invert()} instead.
	 */
	getInverse(matrix: Matrix): Matrix;
}

export interface Plane {
	new (normal?: Vector3, constant?: number): this;

	/**
	 * @default new THREE.Vector3( 1, 0, 0 )
	 */
	normal: Vector3;

	/**
	 * @default 0
	 */
	constant: number;

	readonly isPlane: true;

	set(normal: Vector3, constant: number): Plane;
	setComponents(x: number, y: number, z: number, w: number): Plane;
	setFromNormalAndCoplanarPoint(normal: Vector3, point: Vector3): Plane;
	setFromCoplanarPoints(a: Vector3, b: Vector3, c: Vector3): Plane;
	clone(): this;
	copy(plane: Plane): this;
	normalize(): Plane;
	negate(): Plane;
	distanceToPoint(point: Vector3): number;
	distanceToSphere(sphere: Sphere): number;
	projectPoint(point: Vector3, target: Vector3): Vector3;
	orthoPoint(point: Vector3, target: Vector3): Vector3;
	intersectLine(line: Line3, target: Vector3): Vector3 | null;
	intersectsLine(line: Line3): boolean;
	intersectsBox(box: Box3): boolean;
	intersectsSphere(sphere: Sphere): boolean;
	coplanarPoint(target: Vector3): Vector3;
	applyMatrix4(matrix: Matrix4, optionalNormalMatrix?: Matrix3): Plane;
	translate(offset: Vector3): Plane;
	equals(plane: Plane): boolean;

	/**
	 * @deprecated Use {@link Plane#intersectsLine .intersectsLine()} instead.
	 */
	isIntersectionLine(l: any): any;
}

/**
 * Implementation of a quaternion. This is used for rotating things without incurring in the dreaded gimbal lock issue, amongst other advantages.
 *
 * @example
 * const quaternion = new THREE.Quaternion();
 * quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );
 * const vector = new THREE.Vector3( 1, 0, 0 );
 * vector.applyQuaternion( quaternion );
 */
export interface Quaternion {
	/**
	 * @param x x coordinate
	 * @param y y coordinate
	 * @param z z coordinate
	 * @param w w coordinate
	 */
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
	set(x: number, y: number, z: number, w: number): Quaternion;

	/**
	 * Clones this quaternion.
	 */
	clone(): this;

	/**
	 * Copies values of q to this quaternion.
	 */
	copy(q: Quaternion): this;

	/**
	 * Sets this quaternion from rotation specified by Euler angles.
	 */
	setFromEuler(euler: Euler, update?: boolean): Quaternion;

	/**
	 * Sets this quaternion from rotation specified by axis and angle.
	 * Adapted from http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm.
	 * Axis have to be normalized, angle is in radians.
	 */
	setFromAxisAngle(axis: Vector3, angle: number): Quaternion;

	/**
	 * Sets this quaternion from rotation component of m. Adapted from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm.
	 */
	setFromRotationMatrix(m: Matrix4): Quaternion;
	setFromUnitVectors(vFrom: Vector3, vTo: Vector3): Quaternion;
	angleTo(q: Quaternion): number;
	rotateTowards(q: Quaternion, step: number): Quaternion;

	identity(): Quaternion;

	/**
	 * Inverts this quaternion.
	 */
	invert(): Quaternion;

	conjugate(): Quaternion;
	dot(v: Quaternion): number;
	lengthSq(): number;

	/**
	 * Computes length of this quaternion.
	 */
	length(): number;

	/**
	 * Normalizes this quaternion.
	 */
	normalize(): Quaternion;

	/**
	 * Multiplies this quaternion by b.
	 */
	multiply(q: Quaternion): Quaternion;
	premultiply(q: Quaternion): Quaternion;

	/**
	 * Sets this quaternion to a x b
	 * Adapted from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm.
	 */
	multiplyQuaternions(a: Quaternion, b: Quaternion): Quaternion;

	slerp(qb: Quaternion, t: number): Quaternion;
	slerpQuaternions(qa: Quaternion, qb: Quaternion, t: number): Quaternion;
	equals(v: Quaternion): boolean;

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

	_onChange(callback: () => void): Quaternion;
	_onChangeCallback: () => void;

	slerpFlat(
		dst: number[],
		dstOffset: number,
		src0: number[],
		srcOffset: number,
		src1: number[],
		stcOffset1: number,
		t: number
	): Quaternion;

	multiplyQuaternionsFlat(
		dst: number[],
		dstOffset: number,
		src0: number[],
		srcOffset: number,
		src1: number[],
		stcOffset1: number
	): number[];

	/**
	 * @deprecated Use qm.slerpQuaternions( qa, qb, t ) instead..
	 */
	slerp(qa: Quaternion, qb: Quaternion, qm: Quaternion, t: number): number;

	/**
	 * @deprecated Use {@link Vector#applyQuaternion vector.applyQuaternion( quaternion )} instead.
	 */
	multiplyVector3(v: any): any;

	/**
	 * @deprecated Use {@link Quaternion#invert .invert()} instead.
	 */
	inverse(): Quaternion;

	random(): Quaternion;
}

export interface Ray {
	new (origin?: Vector3, direction?: Vector3): this;

	/**
	 * @default new THREE.Vector3()
	 */
	origin: Vector3;

	/**
	 * @default new THREE.Vector3( 0, 0, - 1 )
	 */
	direction: Vector3;

	set(origin: Vector3, direction: Vector3): Ray;
	clone(): this;
	copy(ray: Ray): this;
	at(t: number, target: Vector3): Vector3;
	lookAt(v: Vector3): Ray;
	recast(t: number): Ray;
	closestPointToPoint(point: Vector3, target: Vector3): Vector3;
	distanceToPoint(point: Vector3): number;
	distanceSqToPoint(point: Vector3): number;
	distanceSqToSegment(v0: Vector3, v1: Vector3, optionalPointOnRay?: Vector3, optionalPointOnSegment?: Vector3): number;
	intersectSphere(sphere: Sphere, target: Vector3): Vector3 | null;
	intersectsSphere(sphere: Sphere): boolean;
	distanceToPlane(plane: Plane): number;
	intersectPlane(plane: Plane, target: Vector3): Vector3 | null;
	intersectsPlane(plane: Plane): boolean;
	intersectBox(box: Box3, target: Vector3): Vector3 | null;
	intersectsBox(box: Box3): boolean;
	intersectTriangle(a: Vector3, b: Vector3, c: Vector3, backfaceCulling: boolean, target: Vector3): Vector3 | null;
	applyMatrix4(matrix4: Matrix4): Ray;
	equals(ray: Ray): boolean;

	/**
	 * @deprecated Use {@link Ray#intersectsBox .intersectsBox()} instead.
	 */
	isIntersectionBox(b: any): any;

	/**
	 * @deprecated Use {@link Ray#intersectsPlane .intersectsPlane()} instead.
	 */
	isIntersectionPlane(p: any): any;

	/**
	 * @deprecated Use {@link Ray#intersectsSphere .intersectsSphere()} instead.
	 */
	isIntersectionSphere(s: any): any;
}

export interface Sphere {
	new (center?: Vector3, radius?: number): this;

	/**
	 * @default new Vector3()
	 */
	center: Vector3;

	/**
	 * @default 1
	 */
	radius: number;

	set(center: Vector3, radius: number): Sphere;
	setFromPoints(points: Vector3[], optionalCenter?: Vector3): Sphere;
	clone(): this;
	copy(sphere: Sphere): this;
	expandByPoint(point: Vector3): this;
	isEmpty(): boolean;
	makeEmpty(): this;
	containsPoint(point: Vector3): boolean;
	distanceToPoint(point: Vector3): number;
	intersectsSphere(sphere: Sphere): boolean;
	intersectsBox(box: Box3): boolean;
	intersectsPlane(plane: Plane): boolean;
	clampPoint(point: Vector3, target: Vector3): Vector3;
	getBoundingBox(target: Box3): Box3;
	applyMatrix4(matrix: Matrix4): Sphere;
	translate(offset: Vector3): Sphere;
	equals(sphere: Sphere): boolean;
	union(sphere: Sphere): this;

	/**
	 * @deprecated Use {@link Sphere#isEmpty .isEmpty()} instead.
	 */
	empty(): any;
}

export interface Spherical {
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
	copy(other: Spherical): this;
	makeSafe(): this;
	setFromVector3(v: Vector3): this;
	setFromCartesianCoords(x: number, y: number, z: number): this;
}

export interface SphericalHarmonics3 {
	new (): this;

	/**
	 * @default [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(),
	 * new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]
	 */
	coefficients: Vector3[];
	readonly isSphericalHarmonics3: true;

	set(coefficients: Vector3[]): SphericalHarmonics3;
	zero(): SphericalHarmonics3;
	add(sh: SphericalHarmonics3): SphericalHarmonics3;
	addScaledSH(sh: SphericalHarmonics3, s: number): SphericalHarmonics3;
	scale(s: number): SphericalHarmonics3;
	lerp(sh: SphericalHarmonics3, alpha: number): SphericalHarmonics3;
	equals(sh: SphericalHarmonics3): boolean;
	copy(sh: SphericalHarmonics3): SphericalHarmonics3;
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

	getAt(normal: Vector3, target: Vector3): Vector3;
	getIrradianceAt(normal: Vector3, target: Vector3): Vector3;

	getBasisAt(normal: Vector3, shBasis: number[]): void;
}

export interface Triangle {
	new (a?: Vector3, b?: Vector3, c?: Vector3): this;

	/**
	 * @default new THREE.Vector3()
	 */
	a: Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	b: Vector3;

	/**
	 * @default new THREE.Vector3()
	 */
	c: Vector3;

	set(a: Vector3, b: Vector3, c: Vector3): Triangle;
	setFromPointsAndIndices(points: Vector3[], i0: number, i1: number, i2: number): this;
	setFromAttributeAndIndices(
		attribute: BufferAttribute | InterleavedBufferAttribute,
		i0: number,
		i1: number,
		i2: number
	): this;
	clone(): this;
	copy(triangle: Triangle): this;
	getArea(): number;
	getMidpoint(target: Vector3): Vector3;
	getNormal(target: Vector3): Vector3;
	getPlane(target: Plane): Plane;
	getBarycoord(point: Vector3, target: Vector3): Vector3;
	getUV(point: Vector3, uv1: Vector2, uv2: Vector2, uv3: Vector2, target: Vector2): Vector2;
	containsPoint(point: Vector3): boolean;
	intersectsBox(box: Box3): boolean;
	isFrontFacing(direction: Vector3): boolean;
	closestPointToPoint(point: Vector3, target: Vector3): Vector3;
	equals(triangle: Triangle): boolean;

	getNormal(a: Vector3, b: Vector3, c: Vector3, target: Vector3): Vector3;
	getBarycoord(point: Vector3, a: Vector3, b: Vector3, c: Vector3, target: Vector3): Vector3;
	containsPoint(point: Vector3, a: Vector3, b: Vector3, c: Vector3): boolean;
	getUV(
		point: Vector3,
		p1: Vector3,
		p2: Vector3,
		p3: Vector3,
		uv1: Vector2,
		uv2: Vector2,
		uv3: Vector2,
		target: Vector2
	): Vector2;
	isFrontFacing(a: Vector3, b: Vector3, c: Vector3, direction: Vector3): boolean;
}

export type Vector2Tuple = [number, number];

/**
 * ( interface Vector<T> )
 *
 * Abstract interface of {@link https://github.com/mrdoob/three.js/blob/master/src/math/Vector2.js|Vector2},
 * {@link https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js|Vector3}
 * and {@link https://github.com/mrdoob/three.js/blob/master/src/math/Vector4.js|Vector4}.
 *
 * Currently the members of Vector is NOT type safe because it accepts different typed vectors.
 *
 * Those definitions will be changed when TypeScript innovates Generics to be type safe.
 *
 * @example
 * const v:THREE.Vector = new THREE.Vector3();
 * v.addVectors(new THREE.Vector2(0, 1), new THREE.Vector2(2, 3)); // invalid but compiled successfully
 */
export interface Vector {
	setComponent(index: number, value: number): this;

	getComponent(index: number): number;

	set(...args: number[]): this;

	setScalar(scalar: number): this;

	/**
	 * copy(v:T):T;
	 */
	copy(v: Vector): this;

	/**
	 * NOTE: The second argument is deprecated.
	 *
	 * add(v:T):T;
	 */
	add(v: Vector): this;

	/**
	 * addVectors(a:T, b:T):T;
	 */
	addVectors(a: Vector, b: Vector): this;

	addScaledVector(vector: Vector, scale: number): this;

	/**
	 * Adds the scalar value s to this vector's values.
	 */
	addScalar(scalar: number): this;

	/**
	 * sub(v:T):T;
	 */
	sub(v: Vector): this;

	/**
	 * subVectors(a:T, b:T):T;
	 */
	subVectors(a: Vector, b: Vector): this;

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
	dot(v: Vector): number;

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
	distanceTo?(v: Vector): number;

	/**
	 * NOTE: Vector4 doesn't have the property.
	 *
	 * distanceToSquared(v:T):number;
	 */
	distanceToSquared?(v: Vector): number;

	/**
	 * setLength(l:number):T;
	 */
	setLength(l: number): this;

	/**
	 * lerp(v:T, alpha:number):T;
	 */
	lerp(v: Vector, alpha: number): this;

	/**
	 * equals(v:T):boolean;
	 */
	equals(v: Vector): boolean;

	/**
	 * clone():T;
	 */
	clone(): Vector;
}

/**
 * 2D vector.
 *
 * ( class Vector2 extends Vector<Vector2> )
 */
export interface Vector2 extends Vector {
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
	copy(v: Vector2): this;

	/**
	 * Adds v to this vector.
	 */
	add(v: Vector2, w?: Vector2): this;

	/**
	 * Adds the scalar value s to this vector's x and y values.
	 */
	addScalar(s: number): this;

	/**
	 * Sets this vector to a + b.
	 */
	addVectors(a: Vector2, b: Vector2): this;

	/**
	 * Adds the multiple of v and s to this vector.
	 */
	addScaledVector(v: Vector2, s: number): this;

	/**
	 * Subtracts v from this vector.
	 */
	sub(v: Vector2): this;

	/**
	 * Subtracts s from this vector's x and y components.
	 */
	subScalar(s: number): this;

	/**
	 * Sets this vector to a - b.
	 */
	subVectors(a: Vector2, b: Vector2): this;

	/**
	 * Multiplies this vector by v.
	 */
	multiply(v: Vector2): this;

	/**
	 * Multiplies this vector by scalar s.
	 */
	multiplyScalar(scalar: number): this;

	/**
	 * Divides this vector by v.
	 */
	divide(v: Vector2): this;

	/**
	 * Divides this vector by scalar s.
	 * Set vector to ( 0, 0 ) if s == 0.
	 */
	divideScalar(s: number): this;

	/**
	 * Multiplies this vector (with an implicit 1 as the 3rd component) by m.
	 */
	applyMatrix3(m: Matrix3): this;

	/**
	 * If this vector's x or y value is greater than v's x or y value, replace that value with the corresponding min value.
	 */
	min(v: Vector2): this;

	/**
	 * If this vector's x or y value is less than v's x or y value, replace that value with the corresponding max value.
	 */
	max(v: Vector2): this;

	/**
	 * If this vector's x or y value is greater than the max vector's x or y value, it is replaced by the corresponding value.
	 * If this vector's x or y value is less than the min vector's x or y value, it is replaced by the corresponding value.
	 * @param min the minimum x and y values.
	 * @param max the maximum x and y values in the desired range.
	 */
	clamp(min: Vector2, max: Vector2): this;

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
	dot(v: Vector2): number;

	/**
	 * Computes cross product of this vector and v.
	 */
	cross(v: Vector2): number;

	/**
	 * Computes squared length of this vector.
	 */
	lengthSq(): number;

	/**
	 * Computes length of this vector.
	 */
	length(): number;

	/**
	 * @deprecated Use {@link Vector2#manhattanLength .manhattanLength()} instead.
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
	distanceTo(v: Vector2): number;

	/**
	 * Computes squared distance of this vector to v.
	 */
	distanceToSquared(v: Vector2): number;

	/**
	 * @deprecated Use {@link Vector2#manhattanDistanceTo .manhattanDistanceTo()} instead.
	 */
	distanceToManhattan(v: Vector2): number;

	/**
	 * Computes the Manhattan length (distance) from this vector to the given vector v
	 *
	 * see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanDistanceTo(v: Vector2): number;

	/**
	 * Normalizes this vector and multiplies it by l.
	 */
	setLength(length: number): this;

	/**
	 * Linearly interpolates between this vector and v, where alpha is the distance along the line - alpha = 0 will be this vector, and alpha = 1 will be v.
	 * @param v vector to interpolate towards.
	 * @param alpha interpolation factor in the closed interval [0, 1].
	 */
	lerp(v: Vector2, alpha: number): this;

	/**
	 * Sets this vector to be the vector linearly interpolated between v1 and v2 where alpha is the distance along the line connecting the two vectors - alpha = 0 will be v1, and alpha = 1 will be v2.
	 * @param v1 the starting vector.
	 * @param v2 vector to interpolate towards.
	 * @param alpha interpolation factor in the closed interval [0, 1].
	 */
	lerpVectors(v1: Vector2, v2: Vector2, alpha: number): this;

	/**
	 * Checks for strict equality of this vector and v.
	 */
	equals(v: Vector2): boolean;

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
	toArray(array?: Vector2Tuple, offset?: 0): Vector2Tuple;

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
	fromBufferAttribute(attribute: BufferAttribute, index: number): this;

	/**
	 * Rotates the vector around center by angle radians.
	 * @param center the point around which to rotate.
	 * @param angle the angle to rotate, in radians.
	 */
	rotateAround(center: Vector2, angle: number): this;

	/**
	 * Sets this vector's x and y from Math.random
	 */
	random(): this;
}

export type Vector3Tuple = [number, number, number];

/**
 * 3D vector. ( class Vector3 extends Vector<Vector3> )
 *
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js}
 *
 * @example
 * const a = new THREE.Vector3( 1, 0, 0 );
 * const b = new THREE.Vector3( 0, 1, 0 );
 * const c = new THREE.Vector3();
 * c.crossVectors( a, b );
 */
export interface Vector3 extends Vector {
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
	setX(x: number): Vector3;

	/**
	 * Sets y value of this vector.
	 */
	setY(y: number): Vector3;

	/**
	 * Sets z value of this vector.
	 */
	setZ(z: number): Vector3;

	setComponent(index: number, value: number): this;

	getComponent(index: number): number;

	/**
	 * Clones this vector.
	 */
	clone(): this;

	/**
	 * Copies value of v to this vector.
	 */
	copy(v: Vector3): this;

	/**
	 * Adds v to this vector.
	 */
	add(v: Vector3): this;

	addScalar(s: number): this;

	addScaledVector(v: Vector3, s: number): this;

	/**
	 * Sets this vector to a + b.
	 */
	addVectors(a: Vector3, b: Vector3): this;

	/**
	 * Subtracts v from this vector.
	 */
	sub(a: Vector3): this;

	subScalar(s: number): this;

	/**
	 * Sets this vector to a - b.
	 */
	subVectors(a: Vector3, b: Vector3): this;

	multiply(v: Vector3): this;

	/**
	 * Multiplies this vector by scalar s.
	 */
	multiplyScalar(s: number): this;

	multiplyVectors(a: Vector3, b: Vector3): this;

	applyEuler(euler: Euler): this;

	applyAxisAngle(axis: Vector3, angle: number): this;

	applyMatrix3(m: Matrix3): this;

	applyNormalMatrix(m: Matrix3): this;

	applyMatrix4(m: Matrix4): this;

	applyQuaternion(q: Quaternion): this;

	project(camera: Camera): this;

	unproject(camera: Camera): this;

	transformDirection(m: Matrix4): this;

	divide(v: Vector3): this;

	/**
	 * Divides this vector by scalar s.
	 * Set vector to ( 0, 0, 0 ) if s == 0.
	 */
	divideScalar(s: number): this;

	min(v: Vector3): this;

	max(v: Vector3): this;

	clamp(min: Vector3, max: Vector3): this;

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
	dot(v: Vector3): number;

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
	 * @deprecated Use {@link Vector3#manhattanLength .manhattanLength()} instead.
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
	manhattanDistanceTo(v: Vector3): number;

	/**
	 * Normalizes this vector.
	 */
	normalize(): this;

	/**
	 * Normalizes this vector and multiplies it by l.
	 */
	setLength(l: number): this;
	lerp(v: Vector3, alpha: number): this;

	lerpVectors(v1: Vector3, v2: Vector3, alpha: number): this;

	/**
	 * Sets this vector to cross product of itself and v.
	 */
	cross(a: Vector3): this;

	/**
	 * Sets this vector to cross product of a and b.
	 */
	crossVectors(a: Vector3, b: Vector3): this;
	projectOnVector(v: Vector3): this;
	projectOnPlane(planeNormal: Vector3): this;
	reflect(vector: Vector3): this;
	angleTo(v: Vector3): number;

	/**
	 * Computes distance of this vector to v.
	 */
	distanceTo(v: Vector3): number;

	/**
	 * Computes squared distance of this vector to v.
	 */
	distanceToSquared(v: Vector3): number;

	/**
	 * @deprecated Use {@link Vector3#manhattanDistanceTo .manhattanDistanceTo()} instead.
	 */
	distanceToManhattan(v: Vector3): number;

	setFromSpherical(s: Spherical): this;
	setFromSphericalCoords(r: number, phi: number, theta: number): this;
	setFromCylindrical(s: Cylindrical): this;
	setFromCylindricalCoords(radius: number, theta: number, y: number): this;
	setFromMatrixPosition(m: Matrix4): this;
	setFromMatrixScale(m: Matrix4): this;
	setFromMatrixColumn(matrix: Matrix4, index: number): this;
	setFromMatrix3Column(matrix: Matrix3, index: number): this;

	/**
	 * Checks for strict equality of this vector and v.
	 */
	equals(v: Vector3): boolean;

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
	toArray(array?: Vector3Tuple, offset?: 0): Vector3Tuple;

	/**
	 * Copies x, y and z into the provided array-like.
	 * @param array array-like to store the vector to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray(array: ArrayLike<number>, offset?: number): ArrayLike<number>;

	fromBufferAttribute(attribute: BufferAttribute | InterleavedBufferAttribute, index: number): this;

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
 * ( class Vector4 extends Vector<Vector4> )
 */
export interface Vector4 extends Vector {
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
	copy(v: Vector4): this;

	/**
	 * Adds v to this vector.
	 */
	add(v: Vector4): this;

	addScalar(scalar: number): this;

	/**
	 * Sets this vector to a + b.
	 */
	addVectors(a: Vector4, b: Vector4): this;

	addScaledVector(v: Vector4, s: number): this;
	/**
	 * Subtracts v from this vector.
	 */
	sub(v: Vector4): this;

	subScalar(s: number): this;

	/**
	 * Sets this vector to a - b.
	 */
	subVectors(a: Vector4, b: Vector4): this;

	multiply(v: Vector4): this;

	/**
	 * Multiplies this vector by scalar s.
	 */
	multiplyScalar(s: number): this;

	applyMatrix4(m: Matrix4): this;

	/**
	 * Divides this vector by scalar s.
	 * Set vector to ( 0, 0, 0 ) if s == 0.
	 */
	divideScalar(s: number): this;

	/**
	 * http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
	 * @param q is assumed to be normalized
	 */
	setAxisAngleFromQuaternion(q: Quaternion): this;

	/**
	 * http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
	 * @param m assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
	 */
	setAxisAngleFromRotationMatrix(m: Matrix4): this;

	min(v: Vector4): this;
	max(v: Vector4): this;
	clamp(min: Vector4, max: Vector4): this;
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
	dot(v: Vector4): number;

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
	lerp(v: Vector4, alpha: number): this;

	lerpVectors(v1: Vector4, v2: Vector4, alpha: number): this;

	/**
	 * Checks for strict equality of this vector and v.
	 */
	equals(v: Vector4): boolean;

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

	fromBufferAttribute(attribute: BufferAttribute, index: number): this;

	/**
	 * Sets this vector's x, y, z and w from Math.random
	 */
	random(): this;
}
