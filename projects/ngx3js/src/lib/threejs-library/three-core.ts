import * as THREE from 'three';

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

export type Matrix3Tuple = [
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

export interface Matrix4 {
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
	makeShear(
		xy: number,
		xz: number,
		yx: number,
		yz: number,
		zx: number,
		zy: number
	): Matrix4;

	/**
	 * Sets this matrix to the transformation composed of translation, rotation and scale.
	 */
	compose(translation: Vector3, rotation: Quaternion, scale: Vector3): Matrix4;

	/**
	 * Decomposes this matrix into it's position, quaternion and scale components.
	 */
	decompose(
		translation: Vector3,
		rotation: Quaternion,
		scale: Vector3
	): Matrix4;

	/**
	 * Creates a frustum matrix.
	 */
	makePerspective(
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number
	): Matrix4;

	/**
	 * Creates a perspective projection matrix.
	 */
	makePerspective(
		fov: number,
		aspect: number,
		near: number,
		far: number
	): Matrix4;

	/**
	 * Creates an orthographic projection matrix.
	 */
	makeOrthographic(
		left: number,
		right: number,
		top: number,
		bottom: number,
		near: number,
		far: number
	): Matrix4;
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

/**
 * ( class Matrix3 implements Matrix<Matrix3> )
 */
export interface Matrix3 {
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

	setUvTransform(
		tx: number,
		ty: number,
		sx: number,
		sy: number,
		rotation: number,
		cx: number,
		cy: number
	): Matrix3;

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

export interface Euler {
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
}

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

export interface Spherical {
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

export interface Cylindrical {
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

export interface BufferAttribute {
	/**
	 * @default ''
	 */
	name: string;
	array: ArrayLike<number>;
	itemSize: number;

	/**
	 * @default THREE.StaticDrawUsage
	 */
	usage: THREE.Usage;

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
	setUsage(usage: THREE.Usage): this;
	clone(): this;
	copy(source: BufferAttribute): this;
	copyAt(index1: number, attribute: BufferAttribute, index2: number): this;
	copyArray(array: ArrayLike<number>): this;
	copyColorsArray(colors: Array<{ r: number; g: number; b: number }>): this;
	copyVector2sArray(vectors: Array<{ x: number; y: number }>): this;
	copyVector3sArray(vectors: Array<{ x: number; y: number; z: number }>): this;
	copyVector4sArray(
		vectors: Array<{ x: number; y: number; z: number; w: number }>
	): this;
	applyMatrix3(m: Matrix3): this;
	applyMatrix4(m: Matrix4): this;
	applyNormalMatrix(m: Matrix3): this;
	transformDirection(m: Matrix4): this;
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

export interface InterleavedBuffer {
	array: ArrayLike<number>;
	stride: number;

	/**
	 * @default THREE.StaticDrawUsage
	 */
	usage: THREE.Usage;

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

	setUsage(usage: THREE.Usage): InterleavedBuffer;
	clone(data: object): InterleavedBuffer;
	copy(source: InterleavedBuffer): this;
	copyAt(
		index1: number,
		attribute: InterleavedBufferAttribute,
		index2: number
	): InterleavedBuffer;
	set(value: ArrayLike<number>, index: number): InterleavedBuffer;
	toJSON(data: object): {
		uuid: string;
		buffer: string;
		type: string;
		stride: number;
	};
}

export interface InterleavedBufferAttribute {
	/**
	 * @default ''
	 */
	name: string;
	data: InterleavedBuffer;
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

	applyMatrix4(m: Matrix4): this;
	clone(data?: object): BufferAttribute;
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
	applyNormalMatrix(matrix: Matrix): this;
	transformDirection(matrix: Matrix): this;
}

export type Vector2Tuple = [number, number];

/**
 * 2D vector.
 *
 * ( class Vector2 implements Vector<Vector2> )
 */
export interface Vector2 extends Vector {
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


export interface Vector3 extends Vector {
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
	copy(v: THREE.Vector3): this;

	/**
	 * Adds v to this vector.
	 */
	add(v: THREE.Vector3): this;

	addScalar(s: number): this;

	addScaledVector(v: THREE.Vector3, s: number): this;

	/**
	 * Sets this vector to a + b.
	 */
	addVectors(a: THREE.Vector3, b: THREE.Vector3): this;

	/**
	 * Subtracts v from this vector.
	 */
	sub(a: THREE.Vector3): this;

	subScalar(s: number): this;

	/**
	 * Sets this vector to a - b.
	 */
	subVectors(a: THREE.Vector3, b: THREE.Vector3): this;

	multiply(v: THREE.Vector3): this;

	/**
	 * Multiplies this vector by scalar s.
	 */
	multiplyScalar(s: number): this;

	multiplyVectors(a: THREE.Vector3, b: THREE.Vector3): this;

	applyEuler(euler: Euler): this;

	applyAxisAngle(axis: THREE.Vector3, angle: number): this;

	applyMatrix3(m: THREE.Matrix3): this;

	applyNormalMatrix(m: THREE.Matrix3): this;

	applyMatrix4(m: THREE.Matrix4): this;

	applyQuaternion(q: THREE.Quaternion): this;

	project(camera: THREE.Camera): this;

	unproject(camera: THREE.Camera): this;

	transformDirection(m: THREE.Matrix4): this;

	divide(v: THREE.Vector3): this;

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
	lerp(v: THREE.Vector3, alpha: number): this;

	lerpVectors(v1: THREE.Vector3, v2: THREE.Vector3, alpha: number): this;

	/**
	 * Sets this vector to cross product of itself and v.
	 */
	cross(a: THREE.Vector3): this;

	/**
	 * Sets this vector to cross product of a and b.
	 */
	crossVectors(a: THREE.Vector3, b: THREE.Vector3): this;
	projectOnVector(v: THREE.Vector3): this;
	projectOnPlane(planeNormal: THREE.Vector3): this;
	reflect(vector: THREE.Vector3): this;
	angleTo(v: THREE.Vector3): number;

	/**
	 * Computes distance of this vector to v.
	 */
	distanceTo(v: THREE.Vector3): number;

	/**
	 * Computes squared distance of this vector to v.
	 */
	distanceToSquared(v: THREE.Vector3): number;

	/**
	 * @deprecated Use {@link Vector3#manhattanDistanceTo .manhattanDistanceTo()} instead.
	 */
	distanceToManhattan(v: THREE.Vector3): number;

	setFromSpherical(s: THREE.Spherical): this;
	setFromSphericalCoords(r: number, phi: number, theta: number): this;
	setFromCylindrical(s: THREE.Cylindrical): this;
	setFromCylindricalCoords(radius: number, theta: number, y: number): this;
	setFromMatrixPosition(m: THREE.Matrix4): this;
	setFromMatrixScale(m: THREE.Matrix4): this;
	setFromMatrixColumn(matrix: THREE.Matrix4, index: number): this;
	setFromMatrix3Column(matrix: THREE.Matrix3, index: number): this;

	/**
	 * Checks for strict equality of this vector and v.
	 */
	equals(v: THREE.Vector3): boolean;

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
	toArray(array?: THREE.Vector3Tuple, offset?: 0): Vector3Tuple;

	/**
	 * Copies x, y and z into the provided array-like.
	 * @param array array-like to store the vector to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray(array: ArrayLike<number>, offset?: number): ArrayLike<number>;

	fromBufferAttribute(
		attribute: THREE.BufferAttribute | THREE.InterleavedBufferAttribute,
		index: number
	): this;

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
export interface Vector4 extends Vector {
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
}

export interface Layers {
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
	test(layers: Layers): boolean;
}

export interface Interpolant {
	parameterPositions: any;
	sampleValues: any;
	valueSize: number;
	resultBuffer: any;

	evaluate(time: number): any;
}

export interface LinearInterpolant extends Interpolant {
	interpolate_(i1: number, t0: number, t: number, t1: number): any;
}

export interface DiscreteInterpolant extends Interpolant {
	interpolate_(i1: number, t0: number, t: number, t1: number): any;
}

export interface CubicInterpolant extends Interpolant {
	interpolate_(i1: number, t0: number, t: number, t1: number): any;
}

export interface KeyframeTrack {
	name: string;
	times: Float32Array;
	values: Float32Array;

	ValueTypeName: string;
	TimeBufferType: Float32Array;
	ValueBufferType: Float32Array;
    DefaultInterpolation: THREE.InterpolationModes;

	InterpolantFactoryMethodDiscrete(result: any): DiscreteInterpolant;
	InterpolantFactoryMethodLinear(result: any): LinearInterpolant;
	InterpolantFactoryMethodSmooth(result: any): CubicInterpolant;

	setInterpolation(interpolation: THREE.InterpolationModes): KeyframeTrack;
	getInterpolation(): THREE.InterpolationModes;

	getValueSize(): number;

	shift(timeOffset: number): KeyframeTrack;
	scale(timeScale: number): KeyframeTrack;
	trim(startTime: number, endTime: number): KeyframeTrack;
	validate(): boolean;
	optimize(): KeyframeTrack;
	clone(): this;
}

export interface MorphTarget {
	name: string;
	vertices: Vector3[];
}

export interface AnimationClip {
	name: string;
	tracks: KeyframeTrack[];

	/**
	 * @default THREE.NormalAnimationBlendMode
	 */
	blendMode: THREE.AnimationBlendMode;

	/**
	 * @default -1
	 */
	duration: number;
	uuid: string;
	results: any[];

	resetDuration(): AnimationClip;
	trim(): AnimationClip;
	validate(): boolean;
	optimize(): AnimationClip;
	clone(): this;
	toJSON(clip: AnimationClip): any;
}

export type EventListener<E, T, U> = (
	event: E & { type: T } & { target: U }
) => void;


export interface EventDispatcher<E = THREE.Event> {
	/**
	 * Adds a listener to an event type.
	 * @param type The type of event to listen to.
	 * @param listener The function that gets called when the event is fired.
	 */
	addEventListener<T>(
		type: T,
		listener: EventListener<E, T, this>
	): void;

	/**
	 * Checks if listener is added to an event type.
	 * @param type The type of event to listen to.
	 * @param listener The function that gets called when the event is fired.
	 */
	hasEventListener<T>(
		type: T,
		listener: EventListener<E, T, this>
	): boolean;

	/**
	 * Removes a listener from an event type.
	 * @param type The type of the listener that gets removed.
	 * @param listener The listener function that gets removed.
	 */
	removeEventListener<T>(
		type: T,
		listener: EventListener<E, T, this>
	): void;

	/**
	 * Fire an event type.
	 * @param type The type of event that gets fired.
	 */
	dispatchEvent(event: E): void;
}

export interface MaterialParameters {
	alphaTest?: number | undefined;
	alphaToCoverage?: boolean | undefined;
	blendDst?: THREE.BlendingDstFactor | undefined;
	blendDstAlpha?: number | undefined;
	blendEquation?: THREE.BlendingEquation | undefined;
	blendEquationAlpha?: number | undefined;
	blending?: THREE.Blending | undefined;
	blendSrc?: THREE.BlendingSrcFactor | THREE.BlendingDstFactor | undefined;
	blendSrcAlpha?: number | undefined;
	clipIntersection?: boolean | undefined;
	clippingPlanes?: Plane[] | undefined;
	clipShadows?: boolean | undefined;
	colorWrite?: boolean | undefined;
	defines?: any;
	depthFunc?: THREE.DepthModes | undefined;
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
	side?: THREE.Side | undefined;
	shadowSide?: THREE.Side | undefined;
	toneMapped?: boolean | undefined;
	transparent?: boolean | undefined;
	vertexColors?: boolean | undefined;
	visible?: boolean | undefined;
	format?: THREE.PixelFormat | undefined;
	stencilWrite?: boolean | undefined;
	stencilFunc?: THREE.StencilFunc | undefined;
	stencilRef?: number | undefined;
	stencilWriteMask?: number | undefined;
	stencilFuncMask?: number | undefined;
	stencilFail?: THREE.StencilOp | undefined;
	stencilZFail?: THREE.StencilOp | undefined;
	stencilZPass?: THREE.StencilOp | undefined;
	userData?: any;
}

export interface IUniform<TValue = any> {
	value: TValue;
}

export interface Shader {
	uniforms: { [uniform: string]: THREE.IUniform };
	vertexShader: string;
	fragmentShader: string;
}

/**
 * Materials describe the appearance of objects. They are defined in a (mostly) renderer-independent way, so you don't have to rewrite materials if you decide to use a different renderer.
 */
export interface Material extends EventDispatcher {
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
	blendDst: THREE.BlendingDstFactor;

	/**
	 * The tranparency of the .blendDst. Default is null.
	 * @default null
	 */
	blendDstAlpha: number | null;

	/**
	 * Blending equation to use when applying blending. It's one of the constants defined in Three.js. Default is {@link AddEquation}.
	 * @default THREE.AddEquation
	 */
	blendEquation: THREE.BlendingEquation;

	/**
	 * The tranparency of the .blendEquation. Default is null.
	 * @default null
	 */
	blendEquationAlpha: number | null;

	/**
	 * Which blending to use when displaying objects with this material. Default is {@link NormalBlending}.
	 * @default THREE.NormalBlending
	 */
	blending: THREE.Blending;

	/**
	 * Blending source. It's one of the blending mode constants defined in Three.js. Default is {@link SrcAlphaFactor}.
	 * @default THREE.SrcAlphaFactor
	 */
	blendSrc: THREE.BlendingSrcFactor | THREE.BlendingDstFactor;

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
	 * User-defined clipping planes specified as THREE.Plane objects in world space.
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
	depthFunc: THREE.DepthModes;

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
	 * When this property is set to THREE.RGBFormat, the material is considered to be opaque and alpha values are ignored.
	 * @default THREE.RGBAFormat
	 */
	format: THREE.PixelFormat;

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
	stencilFunc: THREE.StencilFunc;

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
	stencilFail: THREE.StencilOp;

	/**
	 * Which stencil operation to perform when the comparison function returns true but the depth test fails.
	 * Default is {@link KeepStencilOp}.
	 * See the stencil operation constants for all possible values.
	 * @default THREE.KeepStencilOp
	 */
	stencilZFail: THREE.StencilOp;

	/**
	 * Which stencil operation to perform when the comparison function returns true and the depth test passes.
	 * Default is {@link KeepStencilOp}.
	 * See the stencil operation constants for all possible values.
	 * @default THREE.KeepStencilOp
	 */
	stencilZPass: THREE.StencilOp;

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
	 * Default is THREE.FrontSide. Other options are THREE.BackSide and THREE.DoubleSide.
	 * @default THREE.FrontSide
	 */
	side: THREE.Side;

	/**
	 * Defines which of the face sides will cast shadows. Default is *null*.
	 * If *null*, the value is opposite that of side, above.
	 * @default null
	 */
	shadowSide: THREE.Side | null;

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
	copy(material: Material): this;

	/**
	 * This disposes the material. Textures of a material don't get disposed. These needs to be disposed by {@link Texture}.
	 */
	dispose(): void;

	/**
	 * An optional callback that is executed immediately before the shader program is compiled.
	 * This function is called with the shader source code as a parameter.
	 * Useful for the modification of built-in materials.
	 * @param shader Source code of the shader
	 * @param renderer WebGLRenderer Context that is initializing the material
	 */
	onBeforeCompile(shader: Shader, renderer: WebGLRenderer): void;

	/**
	 * In case onBeforeCompile is used, this callback can be used to identify values of settings used in onBeforeCompile, so three.js can reuse a cached shader or recompile the shader as needed.
	 */
	customProgramCacheKey(): string;

	/**
	 * Sets the properties based on the values.
	 * @param values A container with parameters.
	 */
	setValues(values: MaterialParameters): void;

	/**
	 * Convert the material to three.js JSON format.
	 * @param meta Object containing metadata such as textures or images for the material.
	 */
	toJSON(meta?: any): any;
}

export interface Renderer {
	domElement: HTMLCanvasElement;

	render(scene: Object3D, camera: Camera): void;
	setSize(width: number, height: number, updateStyle?: boolean): void;
}

/** This is only available in worker JS contexts, not the DOM. */
// tslint:disable-next-line:no-empty-interface
export interface OffscreenCanvas extends EventTarget {}

export interface WebGLRendererParameters {
	/**
	 * A Canvas where the renderer draws its output.
	 */
	canvas?: HTMLCanvasElement | OffscreenCanvas | undefined;

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

export interface WebGLDebug {
	/**
	 * Enables error checking and reporting when shader programs are being compiled.
	 */
	checkShaderErrors: boolean;
}

export interface WebGLRenderTargetOptions {
	wrapS?: THREE.Wrapping | undefined;
	wrapT?: THREE.Wrapping | undefined;
	magFilter?: THREE.TextureFilter | undefined;
	minFilter?: THREE.TextureFilter | undefined;
	format?: number | undefined; // RGBAFormat;
	type?: THREE.TextureDataType | undefined; // UnsignedByteType;
	anisotropy?: number | undefined; // 1;
	depthBuffer?: boolean | undefined; // true;
	stencilBuffer?: boolean | undefined; // false;
	generateMipmaps?: boolean | undefined; // true;
	depthTexture?: THREE.DepthTexture | undefined;
	encoding?: THREE.TextureEncoding | undefined;
}

export interface Texture extends EventDispatcher {
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
	mapping: THREE.Mapping;

	/**
	 * @default THREE.ClampToEdgeWrapping
	 */
	wrapS: THREE.Wrapping;

	/**
	 * @default THREE.ClampToEdgeWrapping
	 */
	wrapT: THREE.Wrapping;

	/**
	 * @default THREE.LinearFilter
	 */
	magFilter: THREE.TextureFilter;

	/**
	 * @default THREE.LinearMipmapLinearFilter
	 */
	minFilter: THREE.TextureFilter;

	/**
	 * @default 1
	 */
	anisotropy: number;

	/**
	 * @default THREE.RGBAFormat
	 */
	format: THREE.PixelFormat;

	internalFormat: THREE.PixelFormatGPU | null;

	/**
	 * @default THREE.UnsignedByteType
	 */
	type: THREE.TextureDataType;

	/**
	 * @default new THREE.Matrix3()
	 */
	matrix: Matrix3;

	/**
	 * @default true
	 */
	matrixAutoUpdate: boolean;

	/**
	 * @default new THREE.Vector2( 0, 0 )
	 */
	offset: Vector2;

	/**
	 * @default new THREE.Vector2( 1, 1 )
	 */
	repeat: Vector2;

	/**
	 * @default new THREE.Vector2( 0, 0 )
	 */
	center: Vector2;

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
	encoding: THREE.TextureEncoding;

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
	copy(source: Texture): this;
	toJSON(meta: any): any;
	dispose(): void;
	transformUv(uv: Vector2): Vector2;
	updateMatrix(): void;
}

export interface DataTexture3D extends Texture {
	/**
	 * @default THREE.NearestFilter
	 */
	magFilter: THREE.TextureFilter;

	/**
	 * @default THREE.NearestFilter
	 */
	minFilter: THREE.TextureFilter;

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

export interface DataTexture2DArray extends Texture {
	/**
	 * @default THREE.NearestFilter
	 */
	magFilter: THREE.TextureFilter;

	/**
	 * @default THREE.NearestFilter
	 */
	minFilter: THREE.TextureFilter;

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

export interface DepthTexture extends Texture {
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

/**
 * Scenes allow you to set up what and where is to be rendered by three.js. This is where you place objects, lights and cameras.
 */
export interface Scene extends Object3D {
	type: 'Scene';

	/**
	 * A fog instance defining the type of fog that affects everything rendered in the scene. Default is null.
	 * @default null
	 */
	fog: THREE.FogBase | null;

	/**
	 * If not null, it will force everything in the scene to be rendered with that material. Default is null.
	 * @default null
	 */
	overrideMaterial: Material | null;

	/**
	 * @default true
	 */
	autoUpdate: boolean;

	/**
	 * @default null
	 */
	background: null | Color | Texture;

	/**
	 * @default null
	 */
	environment: null | Texture;

	readonly isScene: true;

	/**
	 * Calls before rendering scene
	 */
	onBeforeRender: (
        renderer: THREE.WebGLRenderer,
		scene: THREE.Scene,
		camera: THREE.Camera,
		renderTarget: any // any required for Object3D.onBeforeRender compatibility
	) => void;

	/**
	 * Calls after rendering scene
	 */
	onAfterRender: (
		renderer: THREE.WebGLRenderer,
		scene: THREE.Scene,
		camera: THREE.Camera
	) => void;

	toJSON(meta?: any): any;
}

export interface WebGLRenderTarget extends EventDispatcher {
	uuid: string;
	width: number;
	height: number;
	depth: number;

	scissor: Vector4;
	/**
	 * @default false
	 */
	scissorTest: boolean;
	viewport: Vector4;
	texture: THREE.Texture;

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
	depthTexture: THREE.DepthTexture;
	readonly isWebGLRenderTarget: true;

	/**
	 * @deprecated Use {@link Texture#wrapS texture.wrapS} instead.
	 */
	wrapS: any;
	/**
	 * @deprecated Use {@link Texture#wrapT texture.wrapT} instead.
	 */
	wrapT: any;
	/**
	 * @deprecated Use {@link Texture#magFilter texture.magFilter} instead.
	 */
	magFilter: any;
	/**
	 * @deprecated Use {@link Texture#minFilter texture.minFilter} instead.
	 */
	minFilter: any;
	/**
	 * @deprecated Use {@link Texture#anisotropy texture.anisotropy} instead.
	 */
	anisotropy: any;
	/**
	 * @deprecated Use {@link Texture#offset texture.offset} instead.
	 */
	offset: any;
	/**
	 * @deprecated Use {@link Texture#repeat texture.repeat} instead.
	 */
	repeat: any;
	/**
	 * @deprecated Use {@link Texture#format texture.format} instead.
	 */
	format: any;
	/**
	 * @deprecated Use {@link Texture#type texture.type} instead.
	 */
	type: any;
	/**
	 * @deprecated Use {@link Texture#generateMipmaps texture.generateMipmaps} instead.
	 */
	generateMipmaps: any;

	setTexture(texture: THREE.Texture): void;
	setSize(width: number, height: number, depth?: number): void;
	clone(): this;
	copy(source: THREE.WebGLRenderTarget): this;
	dispose(): void;
}

/**
 * This class originall extended WebGLMultipleRenderTarget
 * However, there are some issues with this method as documented below
 */
export interface WebGLMultipleRenderTargets extends EventDispatcher {
	texture: Texture[];

	readonly isWebGLMultipleRenderTargets: true;

	setSize(width: number, height: number, depth?: number): this;
	copy(source: WebGLMultipleRenderTargets): this;
	clone(): this;
	dispose(): void;
	// This is an available method, however it will break the code see https://github.com/mrdoob/three.js/issues/21930
	setTexture(texture: Texture): void;
}

export type XRAnimationLoopCallback = (
	time: number,
	frame?: THREE.XRFrame
) => void;

export type XRFrameRequestCallback = (
	time: number,
	frame: THREE.XRFrame
) => void;

export interface Line3 {
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
	closestPointToPoint(
		point: Vector3,
		clampToLine: boolean,
		target: Vector3
	): Vector3;
	applyMatrix4(matrix: Matrix4): Line3;
	equals(line: Line3): boolean;
}

export interface Plane {
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

export interface Triangle {
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
	setFromPointsAndIndices(
		points: Vector3[],
		i0: number,
		i1: number,
		i2: number
	): this;
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
	getUV(
		point: Vector3,
		uv1: Vector2,
		uv2: Vector2,
		uv3: Vector2,
		target: Vector2
	): Vector2;
	containsPoint(point: Vector3): boolean;
	intersectsBox(box: Box3): boolean;
	isFrontFacing(direction: Vector3): boolean;
	closestPointToPoint(point: Vector3, target: Vector3): Vector3;
	equals(triangle: Triangle): boolean;
}

export interface Sphere {
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
	intersectsPlane(plane: THREE.Plane): boolean;
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

export interface Box3 {
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
	intersectsSphere(sphere: THREE.Sphere): boolean;
	intersectsPlane(plane: Plane): boolean;
	intersectsTriangle(triangle: THREE.Triangle): boolean;
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

/**
 * The WebGL renderer displays your beautifully crafted scenes using WebGL, if your device supports it.
 * This renderer has way better performance than CanvasRenderer.
 *
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js|src/renderers/WebGLRenderer.js}
 */
export interface WebGLRenderer extends Renderer{
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
	debug: WebGLDebug;

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

	extensions: THREE.WebGLExtensions;

	/**
	 * Default is LinearEncoding.
	 * @default THREE.LinearEncoding
	 */
	outputEncoding: THREE.TextureEncoding;

	/**
	 * @default false
	 */
	physicallyCorrectLights: boolean;

	/**
	 * @default THREE.NoToneMapping
	 */
	toneMapping: THREE.ToneMapping;

	/**
	 * @default 1
	 */
	toneMappingExposure: number;

	info: THREE.WebGLInfo;

	shadowMap: THREE.WebGLShadowMap;

	pixelRatio: number;

	capabilities: THREE.WebGLCapabilities;
	properties: THREE.WebGLProperties;
	renderLists: THREE.WebGLRenderLists;
	state: THREE.WebGLState;

	xr: THREE.WebXRManager;

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

	getDrawingBufferSize(target: Vector2): Vector2;
	setDrawingBufferSize(width: number, height: number, pixelRatio: number): void;

	getSize(target: Vector2): Vector2;

	/**
	 * Resizes the output canvas to (width, height), and also sets the viewport to fit that size, starting in (0, 0).
	 */
	setSize(width: number, height: number, updateStyle?: boolean): void;

	getCurrentViewport(target: Vector4): Vector4;

	/**
	 * Copies the viewport into target.
	 */
	getViewport(target: Vector4): Vector4;

	/**
	 * Sets the viewport to render from (x, y) to (x + width, y + height).
	 * (x, y) is the lower-left corner of the region.
	 */
	setViewport(
		x: Vector4 | number,
		y?: number,
		width?: number,
		height?: number
	): void;

	/**
	 * Copies the scissor area into target.
	 */
	getScissor(target: Vector4): Vector4;

	/**
	 * Sets the scissor area from (x, y) to (x + width, y + height).
	 */
	setScissor(
		x: Vector4 | number,
		y?: number,
		width?: number,
		height?: number
	): void;

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
	 * Returns a THREE.Color instance with the current clear color.
	 */
	getClearColor(target: Color): Color;

	/**
	 * Sets the clear color, using color for the color and alpha for the opacity.
	 */
	setClearColor(color: ColorRepresentation, alpha?: number): void;

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
	clearTarget(
		renderTarget: WebGLRenderTarget,
		color: boolean,
		depth: boolean,
		stencil: boolean
	): void;

	/**
	 * @deprecated Use {@link WebGLState#reset .state.reset()} instead.
	 */
	resetGLState(): void;
	dispose(): void;

	renderBufferDirect(
		camera: Camera,
		scene: Scene,
		geometry: BufferGeometry,
		material: Material,
		object: Object3D,
		geometryGroup: any
	): void;

	/**
	 * A build in function that can be used instead of requestAnimationFrame. For WebXR projects this function must be used.
	 * @param callback The function will be called every available frame. If `null` is passed it will stop any already ongoing animation.
	 */
	setAnimationLoop(callback: XRAnimationLoopCallback | null): void;

	/**
	 * @deprecated Use {@link WebGLRenderer#setAnimationLoop .setAnimationLoop()} instead.
	 */
	animate(callback: () => void): void;

	/**
	 * Compiles all materials in the scene with the camera. This is useful to precompile shaders before the first rendering.
	 */
	compile(scene: Object3D, camera: Camera): void;

	/**
	 * Render a scene or an object using a camera.
	 * The render is done to a previously specified {@link WebGLRenderTarget#renderTarget .renderTarget} set by calling
	 * {@link WebGLRenderer#setRenderTarget .setRenderTarget} or to the canvas as usual.
	 *
	 * By default render buffers are cleared before rendering but you can prevent this by setting the property
	 * {@link WebGLRenderer#autoClear autoClear} to false. If you want to prevent only certain buffers being cleared
	 * you can set either the {@link WebGLRenderer#autoClearColor autoClearColor},
	 * {@link WebGLRenderer#autoClearStencil autoClearStencil} or {@link WebGLRenderer#autoClearDepth autoClearDepth}
	 * properties to false. To forcibly clear one ore more buffers call {@link WebGLRenderer#clear .clear}.
	 */
	render(scene: Object3D, camera: Camera): void;

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
	getRenderTarget(): WebGLRenderTarget | null;

	/**
	 * @deprecated Use {@link WebGLRenderer#getRenderTarget .getRenderTarget()} instead.
	 */
	getCurrentRenderTarget(): WebGLRenderTarget | null;

	/**
	 * Sets the active render target.
	 *
	 * @param renderTarget The {@link WebGLRenderTarget renderTarget} that needs to be activated. When `null` is given, the canvas is set as the active render target instead.
	 * @param activeCubeFace Specifies the active cube side (PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5) of {@link WebGLCubeRenderTarget}.
	 * @param activeMipmapLevel Specifies the active mipmap level.
	 */
	setRenderTarget(
		renderTarget: WebGLRenderTarget | WebGLMultipleRenderTargets | null,
		activeCubeFace?: number,
		activeMipmapLevel?: number
	): void;

	readRenderTargetPixels(
		renderTarget: WebGLRenderTarget | WebGLMultipleRenderTargets,
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
	copyFramebufferToTexture(
		position: Vector2,
		texture: Texture,
		level?: number
	): void;

	/**
	 * Copies srcTexture to the specified level of dstTexture, offset by the input position.
	 *
	 * @param position Specifies the pixel offset into the dstTexture where the copy will occur.
	 * @param srcTexture Specifies the source texture.
	 * @param dstTexture Specifies the destination texture.
	 * @param level Specifies the destination mipmap level of the texture.
	 */
	copyTextureToTexture(
		position: Vector2,
		srcTexture: Texture,
		dstTexture: Texture,
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
		sourceBox: Box3,
		position: Vector3,
		srcTexture: Texture,
		dstTexture: DataTexture3D | DataTexture2DArray,
		level?: number
	): void;

	/**
	 * Initializes the given texture. Can be used to preload a texture rather than waiting until first render (which can cause noticeable lags due to decode and GPU upload overhead).
	 *
	 * @param texture The texture to Initialize.
	 */
	initTexture(texture: Texture): void;

	/**
	 * Can be used to reset the internal WebGL state.
	 */
	resetState(): void;

	/**
	 * @deprecated
	 */
	gammaFactor: number;

	/**
	 * @deprecated Use {@link WebGLRenderer#xr .xr} instead.
	 */
	vr: boolean;

	/**
	 * @deprecated Use {@link WebGLShadowMap#enabled .shadowMap.enabled} instead.
	 */
	shadowMapEnabled: boolean;

	/**
	 * @deprecated Use {@link WebGLShadowMap#type .shadowMap.type} instead.
	 */
	shadowMapType: THREE.ShadowMapType;

	/**
	 * @deprecated Use {@link WebGLShadowMap#cullFace .shadowMap.cullFace} instead.
	 */
	shadowMapCullFace: THREE.CullFace;

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
	 * @deprecated Use {@link WebGLRenderer#setScissorTest .setScissorTest()} instead.
	 */
	enableScissorTest(boolean: any): any;
}

/**
 * This is a superefficent class for geometries because it saves all data in buffers.
 * It reduces memory costs and cpu cycles. But it is not as easy to work with because of all the necessary buffer calculations.
 * It is mainly interesting when working with static objects.
 *
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/BufferGeometry.js|src/core/BufferGeometry.js}
 */
export interface BufferGeometry extends EventDispatcher {
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
	index: BufferAttribute | null;

	/**
	 * @default {}
	 */
	attributes: {
		[name: string]: BufferAttribute | InterleavedBufferAttribute;
	};

	/**
	 * @default {}
	 */
	morphAttributes: {
		[name: string]: Array<BufferAttribute | InterleavedBufferAttribute>;
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
	boundingBox: THREE.Box3 | null;

	/**
	 * @default null
	 */
	boundingSphere: THREE.Sphere | null;

	/**
	 * @default { start: 0, count: Infinity }
	 */
	drawRange: { start: number; count: number };

	/**
	 * @default {}
	 */
	userData: { [key: string]: any };
	readonly isBufferGeometry: true;

	getIndex(): BufferAttribute | null;
	setIndex(index: BufferAttribute | number[] | null): BufferGeometry;

	setAttribute(
		name: THREE.BuiltinShaderAttributeName | (string & {}),
		attribute: BufferAttribute | InterleavedBufferAttribute
	): BufferGeometry;
	getAttribute(
		name: THREE.BuiltinShaderAttributeName | (string & {})
	): BufferAttribute | InterleavedBufferAttribute;
	deleteAttribute(
		name: THREE.BuiltinShaderAttributeName | (string & {})
	): BufferGeometry;
	hasAttribute(name: THREE.BuiltinShaderAttributeName | (string & {})): boolean;

	addGroup(start: number, count: number, materialIndex?: number): void;
	clearGroups(): void;

	setDrawRange(start: number, count: number): void;

	/**
	 * Bakes matrix transform directly into vertex coordinates.
	 */
	applyMatrix4(matrix: Matrix4): BufferGeometry;
	applyQuaternion(q: Quaternion): BufferGeometry;

	rotateX(angle: number): BufferGeometry;
	rotateY(angle: number): BufferGeometry;
	rotateZ(angle: number): BufferGeometry;
	translate(x: number, y: number, z: number): BufferGeometry;
	scale(x: number, y: number, z: number): BufferGeometry;
	lookAt(v: Vector3): void;

	center(): BufferGeometry;

	setFromPoints(points: Vector3[] | Vector2[]): BufferGeometry;

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

	merge(geometry: BufferGeometry, offset?: number): BufferGeometry;
	normalizeNormals(): void;

	toNonIndexed(): BufferGeometry;

	toJSON(): any;
	clone(): BufferGeometry;
	copy(source: BufferGeometry): this;

	/**
	 * Disposes the object from memory.
	 * You need to call this when you want the bufferGeometry removed while the application is running.
	 */
	dispose(): void;

	/**
	 * @deprecated Use {@link BufferGeometry#groups .groups} instead.
	 */
	drawcalls: any;

	/**
	 * @deprecated Use {@link BufferGeometry#groups .groups} instead.
	 */
	offsets: any;

	/**
	 * @deprecated Use {@link BufferGeometry#setIndex .setIndex()} instead.
	 */
	addIndex(index: any): void;

	/**
	 * @deprecated Use {@link BufferGeometry#addGroup .addGroup()} instead.
	 */
	addDrawCall(start: any, count: any, indexOffset?: any): void;

	/**
	 * @deprecated Use {@link BufferGeometry#clearGroups .clearGroups()} instead.
	 */
	clearDrawCalls(): void;

	/**
	 * @deprecated Use {@link BufferGeometry#setAttribute .setAttribute()} instead.
	 */
	addAttribute(
		name: string,
		attribute: BufferAttribute | InterleavedBufferAttribute
	): BufferGeometry;
	addAttribute(name: any, array: any, itemSize: any): any;

	/**
	 * @deprecated Use {@link BufferGeometry#deleteAttribute .deleteAttribute()} instead.
	 */
	removeAttribute(name: string): BufferGeometry;
}

export interface Group extends Object3D {
	type: 'Group';
	readonly isGroup: true;
}

export interface Ray {
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
	distanceSqToSegment(
		v0: Vector3,
		v1: Vector3,
		optionalPointOnRay?: Vector3,
		optionalPointOnSegment?: Vector3
	): number;
	intersectSphere(sphere: Sphere, target: Vector3): Vector3 | null;
	intersectsSphere(sphere: Sphere): boolean;
	distanceToPlane(plane: Plane): number;
	intersectPlane(plane: Plane, target: Vector3): Vector3 | null;
	intersectsPlane(plane: Plane): boolean;
	intersectBox(box: Box3, target: Vector3): Vector3 | null;
	intersectsBox(box: Box3): boolean;
	intersectTriangle(
		a: Vector3,
		b: Vector3,
		c: Vector3,
		backfaceCulling: boolean,
		target: Vector3
	): Vector3 | null;
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

export interface Face {
	a: number;
	b: number;
	c: number;
	normal: Vector3;
	materialIndex: number;
}

export interface Intersection<TIntersected extends Object3D = Object3D> {
	distance: number;
	distanceToRay?: number | undefined;
	point: Vector3;
	index?: number | undefined;
	face?: Face | null | undefined;
	faceIndex?: number | undefined;
	object: TIntersected;
	uv?: Vector2 | undefined;
	instanceId?: number | undefined;
}

export interface Raycaster {
	/** The Ray used for the raycasting. */
	ray: Ray;

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
	camera: Camera;

	/**
	 * Used by Raycaster to selectively ignore 3D objects when performing intersection tests.
	 * @default new THREE.Layers()
	 */
	layers: Layers;

	/**
	 * @default { Mesh: {}, Line: { threshold: 1 }, LOD: {}, Points: { threshold: 1 }, Sprite: {} }
	 */
	params: THREE.RaycasterParameters;

	/**
	 * Updates the ray with a new origin and direction.
	 * @param origin The origin vector where the ray casts from.
	 * @param direction The normalized direction vector that gives direction to the ray.
	 */
	set(origin: Vector3, direction: Vector3): void;

	/**
	 * Updates the ray with a new origin and direction.
	 * @param coords 2D coordinates of the mouse, in normalized device coordinates (NDC)---X and Y components should be between -1 and 1.
	 * @param camera camera from which the ray should originate
	 */
	setFromCamera(coords: { x: number; y: number }, camera: Camera): void;

	/**
	 * Checks all intersection between the ray and the object with or without the descendants. Intersections are returned sorted by distance, closest first.
	 * @param object The object to check for intersection with the ray.
	 * @param recursive If true, it also checks all descendants. Otherwise it only checks intersecton with the object. Default is false.
	 * @param optionalTarget (optional) target to set the result. Otherwise a new Array is instantiated. If set, you must clear this array prior to each call (i.e., array.length = 0;).
	 */
	intersectObject<TIntersected extends Object3D>(
		object: Object3D,
		recursive?: boolean,
		optionalTarget?: Array<Intersection<TIntersected>>
	): Array<Intersection<TIntersected>>;

	/**
	 * Checks all intersection between the ray and the objects with or without the descendants.
	 * Intersections are returned sorted by distance, closest first.
	 * Intersections are of the same form as those returned by .intersectObject.
	 * @param objects The objects to check for intersection with the ray.
	 * @param recursive If true, it also checks all descendants of the objects. Otherwise it only checks intersecton with the objects. Default is false.
	 * @param optionalTarget (optional) target to set the result. Otherwise a new Array is instantiated. If set, you must clear this array prior to each call (i.e., array.length = 0;).
	 */
	intersectObjects<TIntersected extends Object3D>(
		objects: Object3D[],
		recursive?: boolean,
		optionalTarget?: Array<Intersection<TIntersected>>
	): Array<Intersection<TIntersected>>;
}

/**
 * Object3D
 */
export interface Object3D extends EventDispatcher<THREE.Event> {
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
	parent: Object3D | null;

	/**
	 * Array with object's children.
	 * @default []
	 */
	children: Object3D[];

	/**
	 * Up direction.
	 * @default THREE.Object3D.DefaultUp.clone()
	 */
	up: Vector3;

	/**
	 * Object's local position.
	 * @default new THREE.Vector3()
	 */
	readonly position: Vector3;

	/**
	 * Object's local rotation (Euler angles), in radians.
	 * @default new THREE.Euler()
	 */
	readonly rotation: Euler;

	/**
	 * Object's local rotation as a Quaternion.
	 * @default new THREE.Quaternion()
	 */
	readonly quaternion: Quaternion;

	/**
	 * Object's local scale.
	 * @default new THREE.Vector3()
	 */
	readonly scale: Vector3;

	/**
	 * @default new THREE.Matrix4()
	 */
	readonly modelViewMatrix: Matrix4;

	/**
	 * @default new THREE.Matrix3()
	 */
	readonly normalMatrix: Matrix3;

	/**
	 * Local transform.
	 * @default new THREE.Matrix4()
	 */
	matrix: Matrix4;

	/**
	 * The global transform of the object. If the Object3d has no parent, then it's identical to the local transform.
	 * @default new THREE.Matrix4()
	 */
	matrixWorld: Matrix4;

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
	layers: Layers;
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
	animations: AnimationClip[];

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
	customDepthMaterial: THREE.Material;

	/**
	 * Same as customDepthMaterial, but used with PointLight.
	 */
	customDistanceMaterial: THREE.Material;

	/**
	 * Used to check whether this or derived classes are Object3Ds. Default is true.
	 * You should not change this, as it is used internally for optimisation.
	 */
	readonly isObject3D: true;

	/**
	 * Calls before rendering object
	 */
	onBeforeRender: (
		renderer: THREE.WebGLRenderer ,
		scene: THREE.Scene,
		camera: THREE.Camera,
		geometry: THREE.BufferGeometry,
		material: THREE.Material,
		group: THREE.Group
	) => void;

	/**
	 * Calls after rendering object
	 */
	onAfterRender: (
		renderer: THREE.WebGLRenderer,
		scene: THREE.Scene,
		camera: THREE.Camera,
		geometry: THREE.BufferGeometry,
		material: THREE.Material,
		group: THREE.Group
	) => void;

	/**
	 * This updates the position, rotation and scale with the matrix.
	 */
	applyMatrix4(matrix: THREE.Matrix4): void;

	applyQuaternion(quaternion: THREE.Quaternion): this;

	setRotationFromAxisAngle(axis: THREE.Vector3, angle: number): void;

	setRotationFromEuler(euler: THREE.Euler): void;

	setRotationFromMatrix(m: THREE.Matrix4): void;

	setRotationFromQuaternion(q: THREE.Quaternion): void;

	/**
	 * Rotate an object along an axis in object space. The axis is assumed to be normalized.
	 * @param axis	A normalized vector in object space.
	 * @param angle	The angle in radians.
	 */
	rotateOnAxis(axis: THREE.Vector3, angle: number): this;

	/**
	 * Rotate an object along an axis in world space. The axis is assumed to be normalized. Method Assumes no rotated parent.
	 * @param axis	A normalized vector in object space.
	 * @param angle	The angle in radians.
	 */
	rotateOnWorldAxis(axis: THREE.Vector3, angle: number): this;

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
	translateOnAxis(axis: THREE.Vector3, distance: number): this;

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
	localToWorld(vector: THREE.Vector3): Vector3;

	/**
	 * Updates the vector from world space to local space.
	 * @param vector A world vector.
	 */
	worldToLocal(vector: THREE.Vector3): Vector3;

	/**
	 * Rotates object to face point in space.
	 * @param vector A world vector to look at.
	 */
	lookAt(vector: THREE.Vector3 | number, y?: number, z?: number): void;

	/**
	 * Adds object as child of this object.
	 */
	add(...object: THREE.Object3D[]): this;

	/**
	 * Removes object as child of this object.
	 */
	remove(...object: THREE.Object3D[]): this;

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
	attach(object: THREE.Object3D): this;

	/**
	 * Searches through the object's children and returns the first with a matching id.
	 * @param id	Unique number of the object instance
	 */
	getObjectById(id: number): Object3D | undefined;

	/**
	 * Searches through the object's children and returns the first with a matching name.
	 * @param name	String to match to the children's Object3d.name property.
	 */
	getObjectByName(name: string): Object3D | undefined;

	getObjectByProperty(name: string, value: string): Object3D | undefined;

	getWorldPosition(target: THREE.Vector3): Vector3;
	getWorldQuaternion(target: THREE.Quaternion): Quaternion;
	getWorldScale(target: THREE.Vector3): Vector3;
	getWorldDirection(target: THREE.Vector3): Vector3;

	raycast(raycaster: THREE.Raycaster, intersects: THREE.Intersection[]): void;

	traverse(callback: (object: THREE.Object3D) => any): void;

	traverseVisible(callback: (object: THREE.Object3D) => any): void;

	traverseAncestors(callback: (object: THREE.Object3D) => any): void;

	/**
	 * Updates local transform.
	 */
	updateMatrix(): void;

	/**
	 * Updates global transform of the object and its children.
	 */
	updateMatrixWorld(force?: boolean): void;

	updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void;

	toJSON(meta?: {
		geometries: any;
		materials: any;
		textures: any;
		images: any;
	}): any;

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
export interface Camera extends Object3D {
	/**
	 * This is the inverse of matrixWorld. MatrixWorld contains the Matrix which has the world transform of the Camera.
	 * @default new THREE.Matrix4()
	 */
	matrixWorldInverse: THREE.Matrix4;

	/**
	 * This is the matrix which contains the projection.
	 * @default new THREE.Matrix4()
	 */
	projectionMatrix: THREE.Matrix4;

	/**
	 * This is the inverse of projectionMatrix.
	 * @default new THREE.Matrix4()
	 */
	projectionMatrixInverse: THREE.Matrix4;

	readonly isCamera: true;

	getWorldDirection(target: THREE.Vector3): Vector3;

	updateMatrixWorld(force?: boolean): void;
}
