import * as O3JS from 'three';
export namespace I3JS {
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

	/**
	 * Implementation of a quaternion. This is used for rotating things without incurring in the dreaded gimbal lock issue, amongst other advantages.
	 *
	 * @example
	 * const quaternion = new O3JS.Quaternion();
	 * quaternion.setFromAxisAngle( new IVector3( 0, 1, 0 ), Math.PI / 2 );
	 * const vector = new IVector3( 1, 0, 0 );
	 * vector.applyQuaternion( quaternion );
	 */
	export interface IQuaternion {
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
		set(x: number, y: number, z: number, w: number): IQuaternion;

		/**
		 * Clones this quaternion.
		 */
		clone(): this;

		/**
		 * Copies values of q to this quaternion.
		 */
		copy(q: IQuaternion): this;

		/**
		 * Sets this quaternion from rotation specified by Euler angles.
		 */
		setFromEuler(euler: IEuler, update?: boolean): IQuaternion;

		/**
		 * Sets this quaternion from rotation specified by axis and angle.
		 * Adapted from http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm.
		 * Axis have to be normalized, angle is in radians.
		 */
		setFromAxisAngle(axis: IVector3, angle: number): IQuaternion;

		/**
		 * Sets this quaternion from rotation component of m. Adapted from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm.
		 */
		setFromRotationMatrix(m: IMatrix4): IQuaternion;
		setFromUnitVectors(vFrom: IVector3, vTo: IVector3): IQuaternion;
		angleTo(q: IQuaternion): number;
		rotateTowards(q: IQuaternion, step: number): IQuaternion;

		identity(): IQuaternion;

		/**
		 * Inverts this quaternion.
		 */
		invert(): IQuaternion;

		conjugate(): IQuaternion;
		dot(v: IQuaternion): number;
		lengthSq(): number;

		/**
		 * Computes length of this quaternion.
		 */
		length(): number;

		/**
		 * Normalizes this quaternion.
		 */
		normalize(): IQuaternion;

		/**
		 * Multiplies this quaternion by b.
		 */
		multiply(q: IQuaternion): IQuaternion;
		premultiply(q: IQuaternion): IQuaternion;

		/**
		 * Sets this quaternion to a x b
		 * Adapted from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm.
		 */
		multiplyQuaternions(a: IQuaternion, b: IQuaternion): IQuaternion;

		slerp(qb: IQuaternion, t: number): IQuaternion;
		slerpQuaternions(qa: IQuaternion, qb: IQuaternion, t: number): IQuaternion;
		equals(v: IQuaternion): boolean;

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

		_onChange(callback: () => void): IQuaternion;
		_onChangeCallback: () => void;

		/**
		 * @deprecated Use {@link O3JS.Vector#applyQuaternion vector.applyQuaternion( quaternion )} instead.
		 */
		multiplyVector3(v: any): any;

		/**
		 * @deprecated Use {@link O3JS.Quaternion#invert .invert()} instead.
		 */
		inverse(): IQuaternion;

		random(): IQuaternion;
	}

	export type TMatrix3Tuple = [
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

		new() : this;

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
		copy(m: IMatrix4): this;
		copyPosition(m: IMatrix4): IMatrix4;
		extractBasis(xAxis: IVector3, yAxis: IVector3, zAxis: IVector3): IMatrix4;
		makeBasis(xAxis: IVector3, yAxis: IVector3, zAxis: IVector3): IMatrix4;

		/**
		 * Copies the rotation component of the supplied matrix m into this matrix rotation component.
		 */
		extractRotation(m: IMatrix4): IMatrix4;
		makeRotationFromEuler(euler: IEuler): IMatrix4;
		makeRotationFromQuaternion(q: IQuaternion): IMatrix4;
		/**
		 * Constructs a rotation matrix, looking from eye towards center with defined up vector.
		 */
		lookAt(eye: IVector3, target: IVector3, up: IVector3): IMatrix4;

		/**
		 * Multiplies this matrix by m.
		 */
		multiply(m: IMatrix4): IMatrix4;

		premultiply(m: IMatrix4): IMatrix4;

		/**
		 * Sets this matrix to a x b.
		 */
		multiplyMatrices(a: IMatrix4, b: IMatrix4): IMatrix4;

		/**
		 * Sets this matrix to a x b and stores the result into the flat array r.
		 * r can be either a regular Array or a TypedArray.
		 *
		 * @deprecated This method has been removed completely.
		 */
		multiplyToArray(a: IMatrix4, b: IMatrix4, r: number[]): IMatrix4;

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
		setPosition(v: IVector3 | number, y?: number, z?: number): IMatrix4;

		/**
		 * Inverts this matrix.
		 */
		invert(): IMatrix4;

		/**
		 * Multiplies the columns of this matrix by vector v.
		 */
		scale(v: IVector3): IMatrix4;

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
		makeRotationAxis(axis: IVector3, angle: number): IMatrix4;

		/**
		 * Sets this matrix as scale transform.
		 */
		makeScale(x: number, y: number, z: number): IMatrix4;

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
		): IMatrix4;

		/**
		 * Sets this matrix to the transformation composed of translation, rotation and scale.
		 */
		compose(
			translation: IVector3,
			rotation: IQuaternion,
			scale: IVector3
		): IMatrix4;

		/**
		 * Decomposes this matrix into it's position, quaternion and scale components.
		 */
		decompose(
			translation: IVector3,
			rotation: IQuaternion,
			scale: IVector3
		): IMatrix4;

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
		): IMatrix4;

		/**
		 * Creates a perspective projection matrix.
		 */
		makePerspective(
			fov: number,
			aspect: number,
			near: number,
			far: number
		): IMatrix4;

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
		): IMatrix4;
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
		setFromMatrix3(m: IMatrix3): IMatrix4;

		/**
		 * @deprecated Use {@link O3JS.Matrix4#copyPosition .copyPosition()} instead.
		 */
		extractPosition(m: IMatrix4): IMatrix4;

		/**
		 * @deprecated Use {@link O3JS.Matrix4#makeRotationFromQuaternion .makeRotationFromQuaternion()} instead.
		 */
		setRotationFromQuaternion(q: IQuaternion): IMatrix4;

		/**
		 * @deprecated Use {@link O3JS.Vector3#applyMatrix4 vector.applyMatrix4( matrix )} instead.
		 */
		multiplyVector3(v: any): any;

		/**
		 * @deprecated Use {@link O3JS.Vector4#applyMatrix4 vector.applyMatrix4( matrix )} instead.
		 */
		multiplyVector4(v: any): any;

		/**
		 * @deprecated This method has been removed completely.
		 */
		multiplyVector3Array(array: number[]): number[];

		/**
		 * @deprecated Use {@link O3JS.Vector3#transformDirection Vector3.transformDirection( matrix )} instead.
		 */
		rotateAxis(v: any): void;

		/**
		 * @deprecated Use {@link O3JS.Vector3#applyMatrix4 vector.applyMatrix4( matrix )} instead.
		 */
		crossVector(v: any): void;

		/**
		 * @deprecated Use {@link O3JS.Matrix4#toArray .toArray()} instead.
		 */
		flattenToArrayOffset(array: number[], offset: number): number[];

		/**
		 * @deprecated Use {@link O3JS.Matrix4#invert .invert()} instead.
		 */
		getInverse(matrix: IMatrix): IMatrix;
	}

	/**
	 * ( class Matrix3 implements Matrix<Matrix3> )
	 */
	export interface IMatrix3 {
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
		copy(m: IMatrix3): this;
		extractBasis(xAxis: IVector3, yAxis: IVector3, zAxis: IVector3): IMatrix3;
		setFromMatrix4(m: IMatrix4): IMatrix3;
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
		getNormalMatrix(matrix4: IMatrix4): IMatrix3;

		/**
		 * Transposes this matrix into the supplied array r, and returns itself.
		 */
		transposeIntoArray(r: number[]): IMatrix3;

		setUvTransform(
			tx: number,
			ty: number,
			sx: number,
			sy: number,
			rotation: number,
			cx: number,
			cy: number
		): IMatrix3;

		scale(sx: number, sy: number): IMatrix3;

		rotate(theta: number): IMatrix3;

		translate(tx: number, ty: number): IMatrix3;

		equals(matrix: IMatrix3): boolean;

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
		toArray(array?: TMatrix3Tuple, offset?: 0): TMatrix3Tuple;

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
		multiply(m: IMatrix3): IMatrix3;

		premultiply(m: IMatrix3): IMatrix3;

		/**
		 * Sets this matrix to a x b.
		 */
		multiplyMatrices(a: IMatrix3, b: IMatrix3): IMatrix3;

		/**
		 * @deprecated Use {@link O3JS.Vector3.applyMatrix3 vector.applyMatrix3( matrix )} instead.
		 */
		multiplyVector3(vector: IVector3): any;

		/**
		 * @deprecated This method has been removed completely.
		 */
		multiplyVector3Array(a: any): any;

		/**
		 * @deprecated Use {@link O3JS.Matrix3#invert .invert()} instead.
		 */
		getInverse(matrix: IMatrix4, throwOnDegenerate?: boolean): IMatrix3;
		getInverse(matrix: IMatrix): IMatrix;

		/**
		 * @deprecated Use {@link O3JS.Matrix3#toArray .toArray()} instead.
		 */
		flattenToArrayOffset(array: number[], offset: number): number[];
	}

	export interface IEuler {
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
		 * @default O3JS.Euler.DefaultOrder
		 */
		order: string;
		readonly isEuler: true;

		_onChangeCallback: () => void;

		set(x: number, y: number, z: number, order?: string): IEuler;
		clone(): this;
		copy(euler: IEuler): this;
		setFromRotationMatrix(
			m: IMatrix4,
			order?: string,
			update?: boolean
		): IEuler;
		setFromQuaternion(q: IQuaternion, order?: string, update?: boolean): IEuler;
		setFromVector3(v: IVector3, order?: string): IEuler;
		reorder(newOrder: string): IEuler;
		equals(euler: IEuler): boolean;
		fromArray(xyzo: any[]): IEuler;
		toArray(array?: number[], offset?: number): number[];
		toVector3(optionalResult?: IVector3): IVector3;
		_onChange(callback: () => void): this;
	}

	/**
	 * Frustums are used to determine what is inside the camera's field of view. They help speed up the rendering process.
	 */
	export interface IFrustum {
		/**
		 * Array of 6 vectors.
		 */
		planes: IPlane[];

		set(
			p0: IPlane,
			p1: IPlane,
			p2: IPlane,
			p3: IPlane,
			p4: IPlane,
			p5: IPlane
		): IFrustum;
		clone(): this;
		copy(frustum: IFrustum): this;
		setFromProjectionMatrix(m: IMatrix4): this;
		intersectsObject(object: IObject3D): boolean;
		intersectsSprite(sprite: ISprite): boolean;
		intersectsSphere(sphere: ISphere): boolean;
		intersectsBox(box: IBox3): boolean;
		containsPoint(point: IVector3): boolean;
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
		mapLinear(
			x: number,
			a1: number,
			a2: number,
			b1: number,
			b2: number
		): number;

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

		setQuaternionFromProperEuler(
			q: IQuaternion,
			a: number,
			b: number,
			c: number,
			order: string
		): void;
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
		setFromVector3(v: IVector3): this;
		setFromCartesianCoords(x: number, y: number, z: number): this;
	}

	export interface IInterpolant {
		parameterPositions: any;
		sampleValues: any;
		valueSize: number;
		resultBuffer: any;
		evaluate(time: number): any;
	}

	export interface ISphericalHarmonics3 {
		/**
		 * @default [new O3JS.Vector3(), new O3JS.Vector3(), new O3JS.Vector3(), new O3JS.Vector3(),
		 * new O3JS.Vector3(), new O3JS.Vector3(), new O3JS.Vector3(), new O3JS.Vector3(), new O3JS.Vector3()]
		 */
		coefficients: IVector3[];
		readonly isSphericalHarmonics3: true;

		set(coefficients: IVector3[]): ISphericalHarmonics3;
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

		getAt(normal: IVector3, target: IVector3): IVector3;
		getIrradianceAt(normal: IVector3, target: IVector3): IVector3;
	}

	export interface ICylindrical {
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
		setFromVector3(vec3: IVector3): this;
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
		/**
		 * @default ''
		 */
		name: string;
		array: ArrayLike<number>;
		itemSize: number;

		/**
		 * @default O3JS.StaticDrawUsage
		 */
		usage: O3JS.Usage;

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
		setUsage(usage: O3JS.Usage): this;
		clone(): this;
		copy(source: IBufferAttribute): this;
		copyAt(index1: number, attribute: IBufferAttribute, index2: number): this;
		copyArray(array: ArrayLike<number>): this;
		copyColorsArray(colors: Array<{ r: number; g: number; b: number }>): this;
		copyVector2sArray(vectors: Array<{ x: number; y: number }>): this;
		copyVector3sArray(
			vectors: Array<{ x: number; y: number; z: number }>
		): this;
		copyVector4sArray(
			vectors: Array<{ x: number; y: number; z: number; w: number }>
		): this;
		applyMatrix3(m: IMatrix3): this;
		applyMatrix4(m: IMatrix4): this;
		applyNormalMatrix(m: IMatrix3): this;
		transformDirection(m: IMatrix4): this;
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

	export interface IIcosahedronBufferGeometry
		extends IPolyhedronBufferGeometry {}

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
		/**
		 * @default 1
		 */
		meshPerAttribute: number;
	}

	export interface IInterleavedBuffer {
		array: ArrayLike<number>;
		stride: number;

		/**
		 * @default O3JS.StaticDrawUsage
		 */
		usage: O3JS.Usage;

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

		setUsage(usage: O3JS.Usage): IInterleavedBuffer;
		clone(data: object): IInterleavedBuffer;
		copy(source: IInterleavedBuffer): this;
		copyAt(
			index1: number,
			attribute: IInterleavedBufferAttribute,
			index2: number
		): IInterleavedBuffer;
		set(value: ArrayLike<number>, index: number): IInterleavedBuffer;
		toJSON(data: object): {
			uuid: string;
			buffer: string;
			type: string;
			stride: number;
		};
	}

	export interface IInterleavedBufferAttribute {
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

		applyMatrix4(m: IMatrix4): this;
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

		new(x?: number, y?: number):this;

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
		copy(v: IVector2): this;

		/**
		 * Adds v to this vector.
		 */
		add(v: IVector2, w?: IVector2): this;

		/**
		 * Adds the scalar value s to this vector's x and y values.
		 */
		addScalar(s: number): this;

		/**
		 * Sets this vector to a + b.
		 */
		addVectors(a: IVector2, b: IVector2): this;

		/**
		 * Adds the multiple of v and s to this vector.
		 */
		addScaledVector(v: IVector2, s: number): this;

		/**
		 * Subtracts v from this vector.
		 */
		sub(v: IVector2): this;

		/**
		 * Subtracts s from this vector's x and y components.
		 */
		subScalar(s: number): this;

		/**
		 * Sets this vector to a - b.
		 */
		subVectors(a: IVector2, b: IVector2): this;

		/**
		 * Multiplies this vector by v.
		 */
		multiply(v: IVector2): this;

		/**
		 * Multiplies this vector by scalar s.
		 */
		multiplyScalar(scalar: number): this;

		/**
		 * Divides this vector by v.
		 */
		divide(v: IVector2): this;

		/**
		 * Divides this vector by scalar s.
		 * Set vector to ( 0, 0 ) if s == 0.
		 */
		divideScalar(s: number): this;

		/**
		 * Multiplies this vector (with an implicit 1 as the 3rd component) by m.
		 */
		applyMatrix3(m: IMatrix3): this;

		/**
		 * If this vector's x or y value is greater than v's x or y value, replace that value with the corresponding min value.
		 */
		min(v: IVector2): this;

		/**
		 * If this vector's x or y value is less than v's x or y value, replace that value with the corresponding max value.
		 */
		max(v: IVector2): this;

		/**
		 * If this vector's x or y value is greater than the max vector's x or y value, it is replaced by the corresponding value.
		 * If this vector's x or y value is less than the min vector's x or y value, it is replaced by the corresponding value.
		 * @param min the minimum x and y values.
		 * @param max the maximum x and y values in the desired range.
		 */
		clamp(min: IVector2, max: IVector2): this;

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
		dot(v: IVector2): number;

		/**
		 * Computes cross product of this vector and v.
		 */
		cross(v: IVector2): number;

		/**
		 * Computes squared length of this vector.
		 */
		lengthSq(): number;

		/**
		 * Computes length of this vector.
		 */
		length(): number;

		/**
		 * @deprecated Use {@link O3JS.Vector2#manhattanLength .manhattanLength()} instead.
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
		distanceTo(v: IVector2): number;

		/**
		 * Computes squared distance of this vector to v.
		 */
		distanceToSquared(v: IVector2): number;

		/**
		 * @deprecated Use {@link O3JS.Vector2#manhattanDistanceTo .manhattanDistanceTo()} instead.
		 */
		distanceToManhattan(v: IVector2): number;

		/**
		 * Computes the Manhattan length (distance) from this vector to the given vector v
		 *
		 * see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
		 */
		manhattanDistanceTo(v: IVector2): number;

		/**
		 * Normalizes this vector and multiplies it by l.
		 */
		setLength(length: number): this;

		/**
		 * Linearly interpolates between this vector and v, where alpha is the distance along the line - alpha = 0 will be this vector, and alpha = 1 will be v.
		 * @param v vector to interpolate towards.
		 * @param alpha interpolation factor in the closed interval [0, 1].
		 */
		lerp(v: IVector2, alpha: number): this;

		/**
		 * Sets this vector to be the vector linearly interpolated between v1 and v2 where alpha is the distance along the line connecting the two vectors - alpha = 0 will be v1, and alpha = 1 will be v2.
		 * @param v1 the starting vector.
		 * @param v2 vector to interpolate towards.
		 * @param alpha interpolation factor in the closed interval [0, 1].
		 */
		lerpVectors(v1: IVector2, v2: IVector2, alpha: number): this;

		/**
		 * Checks for strict equality of this vector and v.
		 */
		equals(v: IVector2): boolean;

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
		rotateAround(center: IVector2, angle: number): this;

		/**
		 * Sets this vector's x and y from Math.random
		 */
		random(): this;
	}

	export type TVector3Tuple = [number, number, number];

	export interface IVector3 extends IVector {

		new(x?: number, y?: number, z?: number):this;

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
		setX(x: number): IVector3;

		/**
		 * Sets y value of this vector.
		 */
		setY(y: number): IVector3;

		/**
		 * Sets z value of this vector.
		 */
		setZ(z: number): IVector3;

		setComponent(index: number, value: number): this;

		getComponent(index: number): number;

		/**
		 * Clones this vector.
		 */
		clone(): this;

		/**
		 * Copies value of v to this vector.
		 */
		copy(v: IVector3): this;

		/**
		 * Adds v to this vector.
		 */
		add(v: IVector3): this;

		addScalar(s: number): this;

		addScaledVector(v: IVector3, s: number): this;

		/**
		 * Sets this vector to a + b.
		 */
		addVectors(a: IVector3, b: IVector3): this;

		/**
		 * Subtracts v from this vector.
		 */
		sub(a: IVector3): this;

		subScalar(s: number): this;

		/**
		 * Sets this vector to a - b.
		 */
		subVectors(a: IVector3, b: IVector3): this;

		multiply(v: IVector3): this;

		/**
		 * Multiplies this vector by scalar s.
		 */
		multiplyScalar(s: number): this;

		multiplyVectors(a: IVector3, b: IVector3): this;

		applyEuler(euler: IEuler): this;

		applyAxisAngle(axis: IVector3, angle: number): this;

		applyMatrix3(m: IMatrix3): this;

		applyNormalMatrix(m: IMatrix3): this;

		applyMatrix4(m: IMatrix4): this;

		applyQuaternion(q: IQuaternion): this;

		project(camera: ICamera): this;

		unproject(camera: ICamera): this;

		transformDirection(m: IMatrix4): this;

		divide(v: IVector3): this;

		/**
		 * Divides this vector by scalar s.
		 * Set vector to ( 0, 0, 0 ) if s == 0.
		 */
		divideScalar(s: number): this;

		min(v: IVector3): this;

		max(v: IVector3): this;

		clamp(min: IVector3, max: IVector3): this;

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
		dot(v: IVector3): number;

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
		 * @deprecated Use {@link O3JS.Vector3#manhattanLength .manhattanLength()} instead.
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
		manhattanDistanceTo(v: IVector3): number;

		/**
		 * Normalizes this vector.
		 */
		normalize(): this;

		/**
		 * Normalizes this vector and multiplies it by l.
		 */
		setLength(l: number): this;
		lerp(v: IVector3, alpha: number): this;

		lerpVectors(v1: IVector3, v2: IVector3, alpha: number): this;

		/**
		 * Sets this vector to cross product of itself and v.
		 */
		cross(a: IVector3): this;

		/**
		 * Sets this vector to cross product of a and b.
		 */
		crossVectors(a: IVector3, b: IVector3): this;
		projectOnVector(v: IVector3): this;
		projectOnPlane(planeNormal: IVector3): this;
		reflect(vector: IVector3): this;
		angleTo(v: IVector3): number;

		/**
		 * Computes distance of this vector to v.
		 */
		distanceTo(v: IVector3): number;

		/**
		 * Computes squared distance of this vector to v.
		 */
		distanceToSquared(v: IVector3): number;

		/**
		 * @deprecated Use {@link O3JS.Vector3#manhattanDistanceTo .manhattanDistanceTo()} instead.
		 */
		distanceToManhattan(v: IVector3): number;

		setFromSpherical(s: ISpherical): this;
		setFromSphericalCoords(r: number, phi: number, theta: number): this;
		setFromCylindrical(s: ICylindrical): this;
		setFromCylindricalCoords(radius: number, theta: number, y: number): this;
		setFromMatrixPosition(m: IMatrix4): this;
		setFromMatrixScale(m: IMatrix4): this;
		setFromMatrixColumn(matrix: IMatrix4, index: number): this;
		setFromMatrix3Column(matrix: IMatrix3, index: number): this;

		/**
		 * Checks for strict equality of this vector and v.
		 */
		equals(v: IVector3): boolean;

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

		fromBufferAttribute(
			attribute: IBufferAttribute | IInterleavedBufferAttribute,
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
	export interface IVector4 extends IVector {

		new(x?: number, y?: number, z?: number, w?: number):this;

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
		copy(v: IVector4): this;

		/**
		 * Adds v to this vector.
		 */
		add(v: IVector4): this;

		addScalar(scalar: number): this;

		/**
		 * Sets this vector to a + b.
		 */
		addVectors(a: IVector4, b: IVector4): this;

		addScaledVector(v: IVector4, s: number): this;
		/**
		 * Subtracts v from this vector.
		 */
		sub(v: IVector4): this;

		subScalar(s: number): this;

		/**
		 * Sets this vector to a - b.
		 */
		subVectors(a: IVector4, b: IVector4): this;

		multiply(v: IVector4): this;

		/**
		 * Multiplies this vector by scalar s.
		 */
		multiplyScalar(s: number): this;

		applyMatrix4(m: IMatrix4): this;

		/**
		 * Divides this vector by scalar s.
		 * Set vector to ( 0, 0, 0 ) if s == 0.
		 */
		divideScalar(s: number): this;

		/**
		 * http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
		 * @param q is assumed to be normalized
		 */
		setAxisAngleFromQuaternion(q: IQuaternion): this;

		/**
		 * http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
		 * @param m assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
		 */
		setAxisAngleFromRotationMatrix(m: IMatrix4): this;

		min(v: IVector4): this;
		max(v: IVector4): this;
		clamp(min: IVector4, max: IVector4): this;
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
		dot(v: IVector4): number;

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
		lerp(v: IVector4, alpha: number): this;

		lerpVectors(v1: IVector4, v2: IVector4, alpha: number): this;

		/**
		 * Checks for strict equality of this vector and v.
		 */
		equals(v: IVector4): boolean;

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

	export type TColorRepresentation = IColor | string | number;

	/**
	 * Represents a color. See also {@link ColorUtils}.
	 *
	 * see {@link https://github.com/mrdoob/three.js/blob/master/src/math/Color.js|src/math/Color.js}
	 *
	 * @example
	 * const color = new O3JS.Color( 0xff0000 );
	 */
	export interface IColor {
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
		 * Faster than {@link O3JS.Color#setStyle .setStyle()} method if you don't need the other CSS-style formats.
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
	export interface IPath extends ICurvePath<IVector2> {

		new(points?: IVector2[]) : this;

		/**
		 * @default 'Path'
		 */
		type: string;

		/**
		 * @default new O3JS.Vector2()
		 */
		currentPoint: IVector2;

		/**
		 * @deprecated Use {@link Path#setFromPoints .setFromPoints()} instead.
		 */
		fromPoints(vectors: IVector2[]): this;
		setFromPoints(vectors: IVector2[]): this;
		moveTo(x: number, y: number): this;
		lineTo(x: number, y: number): this;
		quadraticCurveTo(aCPx: number, aCPy: number, aX: number, aY: number): this;
		bezierCurveTo(
			aCP1x: number,
			aCP1y: number,
			aCP2x: number,
			aCP2y: number,
			aX: number,
			aY: number
		): this;
		splineThru(pts: IVector2[]): this;
		arc(
			aX: number,
			aY: number,
			aRadius: number,
			aStartAngle: number,
			aEndAngle: number,
			aClockwise: boolean
		): this;
		absarc(
			aX: number,
			aY: number,
			aRadius: number,
			aStartAngle: number,
			aEndAngle: number,
			aClockwise: boolean
		): this;
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
		new (
			aX: number,
			aY: number,
			aRadius: number,
			aStartAngle: number,
			aEndAngle: number,
			aClockwise: boolean
		): this;

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
		new (
			points?: IVector3[],
			closed?: boolean,
			curveType?: string,
			tension?: number
		): this;

		/**
		 * @default 'CatmullRomCurve3'
		 */
		type: string;

		/**
		 * @default []
		 */
		points: IVector3[];
	}

	export interface ICubicBezierCurve extends ICurve<IVector2> {
		new (v0: IVector2, v1: IVector2, v2: IVector2, v3: IVector2): this;

		/**
		 * @default 'CubicBezierCurve'
		 */
		type: string;

		/**
		 * @default new THREE.Vector2()
		 */
		v0: IVector2;

		/**
		 * @default new THREE.Vector2()
		 */
		v1: IVector2;

		/**
		 * @default new THREE.Vector2()
		 */
		v2: IVector2;

		/**
		 * @default new THREE.Vector2()
		 */
		v3: IVector2;
	}

	export interface ICubicBezierCurve3 extends ICurve<IVector3> {
		new (v0: IVector3, v1: IVector3, v2: IVector3, v3: IVector3): this;

		/**
		 * @default 'CubicBezierCurve3'
		 */
		type: string;

		/**
		 * @default new THREE.Vector3()
		 */
		v0: IVector3;

		/**
		 * @default new THREE.Vector3()
		 */
		v1: IVector3;

		/**
		 * @default new THREE.Vector3()
		 */
		v2: IVector3;

		/**
		 * @default new THREE.Vector3()
		 */
		v3: IVector3;
	}

	export interface ICubicBezierCurve extends ICurve<IVector2> {
		new (v0: IVector2, v1: IVector2, v2: IVector2, v3: IVector2): this;

		/**
		 * @default 'CubicBezierCurve'
		 */
		type: string;

		/**
		 * @default new THREE.Vector2()
		 */
		v0: IVector2;

		/**
		 * @default new THREE.Vector2()
		 */
		v1: IVector2;

		/**
		 * @default new THREE.Vector2()
		 */
		v2: IVector2;

		/**
		 * @default new THREE.Vector2()
		 */
		v3: IVector2;
	}

	export interface ICubicBezierCurve3 extends ICurve<IVector3> {
		new (v0: IVector3, v1: IVector3, v2: IVector3, v3: IVector3): this;

		/**
		 * @default 'CubicBezierCurve3'
		 */
		type: string;

		/**
		 * @default new THREE.Vector3()
		 */
		v0: IVector3;

		/**
		 * @default new THREE.Vector3()
		 */
		v1: IVector3;

		/**
		 * @default new THREE.Vector3()
		 */
		v2: IVector3;

		/**
		 * @default new THREE.Vector3()
		 */
		v3: IVector3;
	}

	export interface IEllipseCurve extends ICurve<IVector2> {
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

	export interface ILineCurve extends ICurve<IVector2> {
		new (v1: IVector2, v2: IVector2): this;

		/**
		 * @default 'LineCurve'
		 */
		type: string;

		/**
		 * @default new THREE.Vector2()
		 */
		v1: IVector2;

		/**
		 * @default new THREE.Vector2()
		 */
		v2: IVector2;
	}

	export interface ILineCurve3 extends ICurve<IVector3> {
		new (v1: IVector3, v2: IVector3): this;

		/**
		 * @default 'LineCurve3'
		 */
		type: string;

		/**
		 * @default new THREE.Vector3()
		 */
		v1: IVector3;

		/**
		 * @default new THREE.Vector3()
		 */
		v2: IVector3;
	}

	export interface IQuadraticBezierCurve extends ICurve<IVector2> {
		new (v0: IVector2, v1: IVector2, v2: IVector2): this;

		/**
		 * @default 'QuadraticBezierCurve'
		 */
		type: string;

		/**
		 * @default new THREE.Vector2()
		 */
		v0: IVector2;

		/**
		 * @default new THREE.Vector2()
		 */
		v1: IVector2;

		/**
		 * @default new THREE.Vector2()
		 */
		v2: IVector2;
	}

	export interface IQuadraticBezierCurve3 extends ICurve<IVector3> {
		new (v0: IVector3, v1: IVector3, v2: IVector3): this;

		/**
		 * @default 'QuadraticBezierCurve3'
		 */
		type: string;

		/**
		 * @default new THREE.Vector3()
		 */
		v0: IVector3;

		/**
		 * @default new THREE.Vector3()
		 */
		v1: IVector3;

		/**
		 * @default new THREE.Vector3()
		 */
		v2: IVector3;
	}

	export interface ISplineCurve extends ICurve<IVector2> {
		new (points?: IVector2[]): this;

		/**
		 * @default 'SplineCurve'
		 */
		type: string;

		/**
		 * @default []
		 */
		points: IVector2[];
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

		new(points?: IVector2[]):this;

		/**
		 * @default 'Shape'
		 */
		type: string;

		uuid: string;

		/**
		 * @default []
		 */
		holes: IPath[];

		getPointsHoles(divisions: number): IVector2[][];

		extractPoints(divisions: number): {
			shape: IVector2[];
			holes: IVector2[][];
		};
	}

	export interface IShapePath {

		new() : this;

		/**
		 * @default 'ShapePath'
		 */
		type: string;

		/**
		 * @default new O3JS.Color()
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
		bezierCurveTo(
			aCP1x: number,
			aCP1y: number,
			aCP2x: number,
			aCP2y: number,
			aX: number,
			aY: number
		): this;
		splineThru(pts: IVector2[]): this;
		toShapes(isCCW: boolean, noHoles?: boolean): IShape[];
	}

	/**
	 * An extensible curve object which contains methods for interpolation
	 * class Curve<T extends Vector>
	 */
	export interface ICurve<T extends O3JS.Vector> {
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
			tangents: IVector3[];
			normals: IVector3[];
			binormals: IVector3[];
		};

		clone(): this;
		copy(source: ICurve<T>): this;
		toJSON(): object;
		fromJSON(json: object): this;
	}

	export interface ILayers {
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
		new (
			parameterPositions: any,
			samplesValues: any,
			sampleSize: number,
			resultBuffer?: any
		): this;

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
		DefaultInterpolation: O3JS.InterpolationModes;

		InterpolantFactoryMethodDiscrete(result: any): IDiscreteInterpolant;
		InterpolantFactoryMethodLinear(result: any): ILinearInterpolant;
		InterpolantFactoryMethodSmooth(result: any): ICubicInterpolant;

		setInterpolation(interpolation: O3JS.InterpolationModes): IKeyframeTrack;
		getInterpolation(): O3JS.InterpolationModes;

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
		new (
			name: string,
			times: any[],
			values: any[],
			interpolation?: O3JS.InterpolationModes
		): this;

		/**
		 * @default 'color'
		 */
		ValueTypeName: string;
	}

	export interface INumberKeyframeTrack extends IKeyframeTrack {
		new (
			name: string,
			times: any[],
			values: any[],
			interpolation?: O3JS.InterpolationModes
		): this;

		/**
		 * @default 'number'
		 */
		ValueTypeName: string;
	}

	export interface IQuaternionKeyframeTrack extends IKeyframeTrack {
		new (
			name: string,
			times: any[],
			values: any[],
			interpolation?: O3JS.InterpolationModes
		): this;

		/**
		 * @default 'quaternion'
		 */
		ValueTypeName: string;
	}

	export interface IStringKeyframeTrack extends IKeyframeTrack {
		new (
			name: string,
			times: any[],
			values: any[],
			interpolation?: O3JS.InterpolationModes
		): this;

		/**
		 * @default 'string'
		 */
		ValueTypeName: string;
	}

	export interface IVectorKeyframeTrack extends IKeyframeTrack {
		new (
			name: string,
			times: any[],
			values: any[],
			interpolation?: O3JS.InterpolationModes
		): this;

		/**
		 * @default 'vector'
		 */
		ValueTypeName: string;
	}

	export interface IMorphTarget {
		name: string;
		vertices: IVector3[];
	}

	export interface IAnimationClip {
		name: string;
		tracks: IKeyframeTrack[];

		/**
		 * @default O3JS.NormalAnimationBlendMode
		 */
		blendMode: O3JS.AnimationBlendMode;

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
	}

	export interface IAnimationAction {
		blendMode: O3JS.AnimationBlendMode;

		/**
		 * @default O3JS.LoopRepeat
		 */
		loop: O3JS.AnimationActionLoopStyles;

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
		setLoop(
			mode: O3JS.AnimationActionLoopStyles,
			repetitions: number
		): IAnimationAction;
		setEffectiveWeight(weight: number): IAnimationAction;
		getEffectiveWeight(): number;
		fadeIn(duration: number): IAnimationAction;
		fadeOut(duration: number): IAnimationAction;
		crossFadeFrom(
			fadeOutAction: IAnimationAction,
			duration: number,
			warp: boolean
		): IAnimationAction;
		crossFadeTo(
			fadeInAction: IAnimationAction,
			duration: number,
			warp: boolean
		): IAnimationAction;
		stopFading(): IAnimationAction;
		setEffectiveTimeScale(timeScale: number): IAnimationAction;
		getEffectiveTimeScale(): number;
		setDuration(duration: number): IAnimationAction;
		syncWith(action: IAnimationAction): IAnimationAction;
		halt(duration: number): IAnimationAction;
		warp(
			statTimeScale: number,
			endTimeScale: number,
			duration: number
		): IAnimationAction;
		stopWarping(): IAnimationAction;
		getMixer(): IAnimationMixer;
		getClip(): IAnimationClip;
		getRoot(): IObject3D;
	}

	export interface IAnimationMixer extends O3JS.EventDispatcher {
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
			blendMode?: O3JS.AnimationBlendMode
		): IAnimationAction;
		existingAction(
			clip: IAnimationClip,
			root?: IObject3D | IAnimationObjectGroup
		): IAnimationAction | null;
		stopAllAction(): IAnimationMixer;
		update(deltaTime: number): IAnimationMixer;
		setTime(timeInSeconds: number): IAnimationMixer;
		getRoot(): IObject3D | IAnimationObjectGroup;
		uncacheClip(clip: IAnimationClip): void;
		uncacheRoot(root: IObject3D | IAnimationObjectGroup): void;
		uncacheAction(
			clip: IAnimationClip,
			root?: IObject3D | IAnimationObjectGroup
		): void;
	}

	export type EventListener<E, T, U> = (
		event: E & { type: T } & { target: U }
	) => void;

	export interface IEventDispatcher<E = O3JS.Event> {
		/**
		 * Adds a listener to an event type.
		 * @param type The type of event to listen to.
		 * @param listener The function that gets called when the event is fired.
		 */
		addEventListener<T>(type: T, listener: EventListener<E, T, this>): void;

		/**
		 * Checks if listener is added to an event type.
		 * @param type The type of event to listen to.
		 * @param listener The function that gets called when the event is fired.
		 */
		hasEventListener<T>(type: T, listener: EventListener<E, T, this>): boolean;

		/**
		 * Removes a listener from an event type.
		 * @param type The type of the listener that gets removed.
		 * @param listener The listener function that gets removed.
		 */
		removeEventListener<T>(type: T, listener: EventListener<E, T, this>): void;

		/**
		 * Fire an event type.
		 * @param type The type of event that gets fired.
		 */
		dispatchEvent(event: E): void;
	}

	export interface IMaterialParameters {
		alphaTest?: number | undefined;
		alphaToCoverage?: boolean | undefined;
		blendDst?: O3JS.BlendingDstFactor | undefined;
		blendDstAlpha?: number | undefined;
		blendEquation?: O3JS.BlendingEquation | undefined;
		blendEquationAlpha?: number | undefined;
		blending?: O3JS.Blending | undefined;
		blendSrc?: O3JS.BlendingSrcFactor | O3JS.BlendingDstFactor | undefined;
		blendSrcAlpha?: number | undefined;
		clipIntersection?: boolean | undefined;
		clippingPlanes?: IPlane[] | undefined;
		clipShadows?: boolean | undefined;
		colorWrite?: boolean | undefined;
		defines?: any;
		depthFunc?: O3JS.DepthModes | undefined;
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
		side?: O3JS.Side | undefined;
		shadowSide?: O3JS.Side | undefined;
		toneMapped?: boolean | undefined;
		transparent?: boolean | undefined;
		vertexColors?: boolean | undefined;
		visible?: boolean | undefined;
		format?: O3JS.PixelFormat | undefined;
		stencilWrite?: boolean | undefined;
		stencilFunc?: O3JS.StencilFunc | undefined;
		stencilRef?: number | undefined;
		stencilWriteMask?: number | undefined;
		stencilFuncMask?: number | undefined;
		stencilFail?: O3JS.StencilOp | undefined;
		stencilZFail?: O3JS.StencilOp | undefined;
		stencilZPass?: O3JS.StencilOp | undefined;
		userData?: any;
	}

	export interface IUniform<TValue = any> {
		value: TValue;
	}

	export interface IShader {
		uniforms: { [uniform: string]: IUniform };
		vertexShader: string;
		fragmentShader: string;
	}

	/**
	 * Materials describe the appearance of objects. They are defined in a (mostly) renderer-independent way, so you don't have to rewrite materials if you decide to use a different renderer.
	 */
	export interface IMaterial extends O3JS.EventDispatcher {
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
		 * @default O3JS.OneMinusSrcAlphaFactor
		 */
		blendDst: O3JS.BlendingDstFactor;

		/**
		 * The tranparency of the .blendDst. Default is null.
		 * @default null
		 */
		blendDstAlpha: number | null;

		/**
		 * Blending equation to use when applying blending. It's one of the constants defined in Three.js. Default is {@link AddEquation}.
		 * @default O3JS.AddEquation
		 */
		blendEquation: O3JS.BlendingEquation;

		/**
		 * The tranparency of the .blendEquation. Default is null.
		 * @default null
		 */
		blendEquationAlpha: number | null;

		/**
		 * Which blending to use when displaying objects with this material. Default is {@link NormalBlending}.
		 * @default O3JS.NormalBlending
		 */
		blending: O3JS.Blending;

		/**
		 * Blending source. It's one of the blending mode constants defined in Three.js. Default is {@link SrcAlphaFactor}.
		 * @default O3JS.SrcAlphaFactor
		 */
		blendSrc: O3JS.BlendingSrcFactor | O3JS.BlendingDstFactor;

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
		 * @default O3JS.LessEqualDepth
		 */
		depthFunc: O3JS.DepthModes;

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
		 * @default O3JS.RGBAFormat
		 */
		format: O3JS.PixelFormat;

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
		 * @default O3JS.AlwaysStencilFunc
		 */
		stencilFunc: O3JS.StencilFunc;

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
		 * @default O3JS.KeepStencilOp
		 */
		stencilFail: O3JS.StencilOp;

		/**
		 * Which stencil operation to perform when the comparison function returns true but the depth test fails.
		 * Default is {@link KeepStencilOp}.
		 * See the stencil operation constants for all possible values.
		 * @default O3JS.KeepStencilOp
		 */
		stencilZFail: O3JS.StencilOp;

		/**
		 * Which stencil operation to perform when the comparison function returns true and the depth test passes.
		 * Default is {@link KeepStencilOp}.
		 * See the stencil operation constants for all possible values.
		 * @default O3JS.KeepStencilOp
		 */
		stencilZPass: O3JS.StencilOp;

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
		 * @default O3JS.FrontSide
		 */
		side: O3JS.Side;

		/**
		 * Defines which of the face sides will cast shadows. Default is *null*.
		 * If *null*, the value is opposite that of side, above.
		 * @default null
		 */
		shadowSide: O3JS.Side | null;

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
		 * This disposes the material. Textures of a material don't get disposed. These needs to be disposed by {@link O3JS.Texture}.
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
		setValues(values: O3JS.MaterialParameters): void;

		/**
		 * Convert the material to three.js JSON format.
		 * @param meta Object containing metadata such as textures or images for the material.
		 */
		toJSON(meta?: any): any;
	}

	export interface ISpriteMaterial extends IMaterial {
		/**
		 * @default 'SpriteMaterial'
		 */
		type: string;

		/**
		 * @default new O3JS.Color( 0xffffff )
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

		setValues(parameters: O3JS.SpriteMaterialParameters): void;
		copy(source: ISpriteMaterial): this;
	}

	export interface ILineBasicMaterial extends IMaterial {
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

		setValues(parameters: O3JS.LineBasicMaterialParameters): void;
	}

	export interface ILineDashedMaterial extends ILineBasicMaterial {
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

		setValues(parameters: O3JS.LineDashedMaterialParameters): void;
	}

	export interface IMeshBasicMaterial extends IMaterial {
		/**
		 * @default 'MeshBasicMaterial'
		 */
		type: string;

		/**
		 * @default new O3JS.Color( 0xffffff )
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
		 * @default O3JS.MultiplyOperation
		 */
		combine: O3JS.Combine;

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

		setValues(parameters: O3JS.MeshBasicMaterialParameters): void;
	}

	export interface IMeshDepthMaterial extends IMaterial {
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
		 * @default O3JS.BasicDepthPacking
		 */
		depthPacking: O3JS.DepthPackingStrategies;

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

		setValues(parameters: O3JS.MeshDepthMaterialParameters): void;
	}

	export interface IMeshDistanceMaterial extends IMaterial {
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
		 * @default new O3JS.Vector3()
		 */
		referencePosition: IVector3;

		/**
		 * @default false
		 */
		fog: boolean;

		setValues(parameters: O3JS.MeshDistanceMaterialParameters): void;
	}

	export interface IMeshLambertMaterial extends IMaterial {
		/**
		 * @default 'MeshLambertMaterial'
		 */
		type: string;

		/**
		 * @default new O3JS.Color( 0xffffff )
		 */
		color: IColor;

		/**
		 * @default new O3JS.Color( 0x000000 )
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
		 * @default O3JS.MultiplyOperation
		 */
		combine: O3JS.Combine;

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

		setValues(parameters: O3JS.MeshLambertMaterialParameters): void;
	}

	export interface IMeshMatcapMaterial extends IMaterial {
		/**
		 * @default 'MeshMatcapMaterial'
		 */
		type: string;

		/**
		 * @default { 'MATCAP': '' }
		 */
		defines: { [key: string]: any };

		/**
		 * @default new O3JS.Color( 0xffffff )
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
		 * @default O3JS.TangentSpaceNormalMap
		 */
		normalMapType: O3JS.NormalMapTypes;

		/**
		 * @default new Vector2( 1, 1 )
		 */
		normalScale: IVector2;

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

		setValues(parameters: O3JS.MeshMatcapMaterialParameters): void;
	}

	export interface IMeshNormalMaterial extends IMaterial {
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
		 * @default O3JS.TangentSpaceNormalMap
		 */
		normalMapType: O3JS.NormalMapTypes;

		/**
		 * @default new O3JS.Vector2( 1, 1 )
		 */
		normalScale: IVector2;

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

		setValues(parameters: O3JS.MeshNormalMaterialParameters): void;
	}

	export interface IMeshPhongMaterial extends IMaterial {
		/**
		 * @default 'MeshNormalMaterial'
		 */
		type: string;

		/**
		 * @default new O3JS.Color( 0xffffff )
		 */
		color: IColor;

		/**
		 * @default new O3JS.Color( 0x111111 )
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
		 * @default new O3JS.Color( 0x000000 )
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
		 * @default O3JS.TangentSpaceNormalMap
		 */
		normalMapType: O3JS.NormalMapTypes;

		/**
		 * @default new Vector2( 1, 1 )
		 */
		normalScale: IVector2;

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
		 * @default O3JS.MultiplyOperation
		 */
		combine: O3JS.Combine;

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

		setValues(parameters: O3JS.MeshPhongMaterialParameters): void;
	}

	export interface IMeshStandardMaterial extends IMaterial {
		/**
		 * @default 'MeshStandardMaterial'
		 */
		type: string;

		/**
		 * @default { 'STANDARD': '' }
		 */
		defines: { [key: string]: any };

		/**
		 * @default new O3JS.Color( 0xffffff )
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
		 * @default new O3JS.Color( 0x000000 )
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
		 * @default O3JS.TangentSpaceNormalMap
		 */
		normalMapType: O3JS.NormalMapTypes;

		/**
		 * @default new O3JS.Vector2( 1, 1 )
		 */
		normalScale: IVector2;

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

		setValues(parameters: O3JS.MeshStandardMaterialParameters): void;
	}

	export interface IMeshPhysicalMaterial extends IMeshStandardMaterial {
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
		 * @default new O3JS.Vector2( 1, 1 )
		 */
		clearcoatNormalScale: IVector2;

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

	export interface IMeshToonMaterial extends IMaterial {
		/**
		 * @default 'MeshToonMaterial'
		 */
		type: string;

		/**
		 * @default { 'TOON': '' }
		 */
		defines: { [key: string]: any };

		/**
		 * @default new O3JS.Color( 0xffffff )
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
		 * @default new O3JS.Color( 0x000000 )
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
		 * @default O3JS.TangentSpaceNormalMap
		 */
		normalMapType: O3JS.NormalMapTypes;

		/**
		 * @default new O3JS.Vector2( 1, 1 )
		 */
		normalScale: IVector2;

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

		setValues(parameters: O3JS.MeshToonMaterialParameters): void;
	}

	export interface IPointsMaterial extends IMaterial {
		/**
		 * @default 'PointsMaterial'
		 */
		type: string;

		/**
		 * @default new O3JS.Color( 0xffffff )
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

		setValues(parameters: O3JS.PointsMaterialParameters): void;
	}

	export interface IShaderMaterial extends IMaterial {
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
		glslVersion: O3JS.GLSLVersion | null;

		isShaderMaterial: boolean;

		setValues(parameters: O3JS.ShaderMaterialParameters): void;
		toJSON(meta: any): any;
	}

	export interface IRawShaderMaterial extends IShaderMaterial {}

	export interface IShadowMaterial extends IMaterial {
		/**
		 * @default 'ShadowMaterial'
		 */
		type: string;

		/**
		 * @default new O3JS.Color( 0x000000 )
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
		wrapS?: O3JS.Wrapping | undefined;
		wrapT?: O3JS.Wrapping | undefined;
		magFilter?: O3JS.TextureFilter | undefined;
		minFilter?: O3JS.TextureFilter | undefined;
		format?: number | undefined; // RGBAFormat;
		type?: O3JS.TextureDataType | undefined; // UnsignedByteType;
		anisotropy?: number | undefined; // 1;
		depthBuffer?: boolean | undefined; // true;
		stencilBuffer?: boolean | undefined; // false;
		generateMipmaps?: boolean | undefined; // true;
		depthTexture?: O3JS.DepthTexture | undefined;
		encoding?: O3JS.TextureEncoding | undefined;
	}

	export interface ITexture extends O3JS.EventDispatcher {
		id: number;
		uuid: string;

		/**
		 * @default ''
		 */
		name: string;
		sourceFile: string;

		/**
		 * @default O3JS.Texture.DEFAULT_IMAGE
		 */
		image: any; // HTMLImageElement or ImageData or { width: number, height: number } in some children;

		/**
		 * @default []
		 */
		mipmaps: any[]; // ImageData[] for 2D textures and CubeTexture[] for cube textures;

		/**
		 * @default O3JS.Texture.DEFAULT_MAPPING
		 */
		mapping: O3JS.Mapping;

		/**
		 * @default O3JS.ClampToEdgeWrapping
		 */
		wrapS: O3JS.Wrapping;

		/**
		 * @default O3JS.ClampToEdgeWrapping
		 */
		wrapT: O3JS.Wrapping;

		/**
		 * @default O3JS.LinearFilter
		 */
		magFilter: O3JS.TextureFilter;

		/**
		 * @default O3JS.LinearMipmapLinearFilter
		 */
		minFilter: O3JS.TextureFilter;

		/**
		 * @default 1
		 */
		anisotropy: number;

		/**
		 * @default O3JS.RGBAFormat
		 */
		format: O3JS.PixelFormat;

		internalFormat: O3JS.PixelFormatGPU | null;

		/**
		 * @default O3JS.UnsignedByteType
		 */
		type: O3JS.TextureDataType;

		/**
		 * @default new IMatrix3()
		 */
		matrix: IMatrix3;

		/**
		 * @default true
		 */
		matrixAutoUpdate: boolean;

		/**
		 * @default new IVector2( 0, 0 )
		 */
		offset: IVector2;

		/**
		 * @default new IVector2( 1, 1 )
		 */
		repeat: IVector2;

		/**
		 * @default new IVector2( 0, 0 )
		 */
		center: IVector2;

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
		 * @default O3JS.LinearEncoding
		 */
		encoding: O3JS.TextureEncoding;

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
		transformUv(uv: IVector2): IVector2;
		updateMatrix(): void;
	}

	export interface IDataTexture extends ITexture {
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
		 * @default O3JS.DepthFormat
		 */
		format: O3JS.PixelFormat;

		readonly isDataTexture: true;
	}

	export interface IDataTexture3D extends ITexture {
		/**
		 * @default O3JS.NearestFilter
		 */
		magFilter: O3JS.TextureFilter;

		/**
		 * @default O3JS.NearestFilter
		 */
		minFilter: O3JS.TextureFilter;

		/**
		 * @default O3JS.ClampToEdgeWrapping
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
		/**
		 * @default O3JS.NearestFilter
		 */
		magFilter: O3JS.TextureFilter;

		/**
		 * @default O3JS.NearestFilter
		 */
		minFilter: O3JS.TextureFilter;

		/**
		 * @default O3JS.ClampToEdgeWrapping
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
		readonly isCanvasTexture: true;
	}

	export interface ICompressedTexture extends ITexture {
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
		images: any; // returns and sets the value of Texture.image in the codde ?

		/**
		 * @default false
		 */
		flipY: boolean;

		readonly isCubeTexture: true;
	}

	export interface IVideoTexture extends ITexture {
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
		onAfterRender: (
			renderer: IWebGLRenderer,
			scene: IScene,
			camera: ICamera
		) => void;

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
		/**
		 * Defines how fast the fog will grow dense.
		 * @default 0.00025
		 */
		density: number;

		readonly isFogExp2: true;

		clone(): IFogExp2;
		toJSON(): any;
	}

	export interface IWebGLRenderTarget extends O3JS.EventDispatcher {
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
		 * @deprecated Use {@link O3JS.Texture#wrapS texture.wrapS} instead.
		 */
		wrapS: any;
		/**
		 * @deprecated Use {@link O3JS.Texture#wrapT texture.wrapT} instead.
		 */
		wrapT: any;
		/**
		 * @deprecated Use {@link O3JS.Texture#magFilter texture.magFilter} instead.
		 */
		magFilter: any;
		/**
		 * @deprecated Use {@link O3JS.Texture#minFilter texture.minFilter} instead.
		 */
		minFilter: any;
		/**
		 * @deprecated Use {@link O3JS.Texture#anisotropy texture.anisotropy} instead.
		 */
		anisotropy: any;
		/**
		 * @deprecated Use {@link O3JS.Texture#offset texture.offset} instead.
		 */
		offset: any;
		/**
		 * @deprecated Use {@link O3JS.Texture#repeat texture.repeat} instead.
		 */
		repeat: any;
		/**
		 * @deprecated Use {@link O3JS.Texture#format texture.format} instead.
		 */
		format: any;
		/**
		 * @deprecated Use {@link O3JS.Texture#type texture.type} instead.
		 */
		type: any;
		/**
		 * @deprecated Use {@link O3JS.Texture#generateMipmaps texture.generateMipmaps} instead.
		 */
		generateMipmaps: any;

		setTexture(texture: ITexture): void;
		setSize(width: number, height: number, depth?: number): void;
		clone(): this;
		copy(source: IWebGLRenderTarget): this;
		dispose(): void;
	}

	export interface IWebGLMultisampleRenderTarget extends IWebGLRenderTarget {
		readonly isWebGLMultisampleRenderTarget: true;
		/**
		 * Specifies the number of samples to be used for the renderbuffer storage.However, the maximum supported size for multisampling is platform dependent and defined via gl.MAX_SAMPLES.
		 * @default 4
		 */
		samples: number;
	}

	export interface IWebGLCubeRenderTarget extends IWebGLRenderTarget {
		texture: ICubeTexture;

		fromEquirectangularTexture(
			renderer: IWebGLRenderer,
			texture: ITexture
		): this;

		clear(
			renderer: IWebGLRenderer,
			color: boolean,
			depth: boolean,
			stencil: boolean
		): void;
	}

	export interface IWebGL1Renderer extends IWebGLRenderer {
		readonly isWebGL1Renderer: true;
	}

	/**
	 * This class originall extended WebGLMultipleRenderTarget
	 * However, there are some issues with this method as documented below
	 */
	export interface IWebGLMultipleRenderTargets extends O3JS.EventDispatcher {
		texture: ITexture[];

		readonly isWebGLMultipleRenderTargets: true;

		setSize(width: number, height: number, depth?: number): this;
		copy(source: IWebGLMultipleRenderTargets): this;
		clone(): this;
		dispose(): void;
		// This is an available method, however it will break the code see https://github.com/mrdoob/three.js/issues/21930
		setTexture(texture: ITexture): void;
	}

	export type TXRAnimationLoopCallback = (
		time: number,
		frame?: O3JS.XRFrame
	) => void;

	export type TXRFrameRequestCallback = (
		time: number,
		frame: O3JS.XRFrame
	) => void;

	export interface ILine3 {
		/**
		 * @default new IVector3()
		 */
		start: IVector3;

		/**
		 * @default new IVector3()
		 */
		end: IVector3;

		set(start?: IVector3, end?: IVector3): ILine3;
		clone(): this;
		copy(line: ILine3): this;
		getCenter(target: IVector3): IVector3;
		delta(target: IVector3): IVector3;
		distanceSq(): number;
		distance(): number;
		at(t: number, target: IVector3): IVector3;
		closestPointToPointParameter(
			point: IVector3,
			clampToLine?: boolean
		): number;
		closestPointToPoint(
			point: IVector3,
			clampToLine: boolean,
			target: IVector3
		): IVector3;
		applyMatrix4(matrix: IMatrix4): ILine3;
		equals(line: ILine3): boolean;
	}

	export interface IPlane {
		/**
		 * @default new IVector3( 1, 0, 0 )
		 */
		normal: IVector3;

		/**
		 * @default 0
		 */
		constant: number;

		readonly isPlane: true;

		set(normal: IVector3, constant: number): IPlane;
		setComponents(x: number, y: number, z: number, w: number): IPlane;
		setFromNormalAndCoplanarPoint(normal: IVector3, point: IVector3): IPlane;
		setFromCoplanarPoints(a: IVector3, b: IVector3, c: IVector3): IPlane;
		clone(): this;
		copy(plane: IPlane): this;
		normalize(): IPlane;
		negate(): IPlane;
		distanceToPoint(point: IVector3): number;
		distanceToSphere(sphere: ISphere): number;
		projectPoint(point: IVector3, target: IVector3): IVector3;
		orthoPoint(point: IVector3, target: IVector3): IVector3;
		intersectLine(line: ILine3, target: IVector3): IVector3 | null;
		intersectsLine(line: ILine3): boolean;
		intersectsBox(box: IBox3): boolean;
		intersectsSphere(sphere: ISphere): boolean;
		coplanarPoint(target: IVector3): IVector3;
		applyMatrix4(matrix: IMatrix4, optionalNormalMatrix?: IMatrix3): IPlane;
		translate(offset: IVector3): IPlane;
		equals(plane: IPlane): boolean;

		/**
		 * @deprecated Use {@link O3JS.Plane#intersectsLine .intersectsLine()} instead.
		 */
		isIntersectionLine(l: any): any;
	}

	export interface ITriangle {
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

		set(a: IVector3, b: IVector3, c: IVector3): ITriangle;
		setFromPointsAndIndices(
			points: IVector3[],
			i0: number,
			i1: number,
			i2: number
		): this;
		setFromAttributeAndIndices(
			attribute: IBufferAttribute | IInterleavedBufferAttribute,
			i0: number,
			i1: number,
			i2: number
		): this;
		clone(): this;
		copy(triangle: ITriangle): this;
		getArea(): number;
		getMidpoint(target: IVector3): IVector3;
		getNormal(target: IVector3): IVector3;
		getPlane(target: IPlane): IPlane;
		getBarycoord(point: IVector3, target: IVector3): IVector3;
		getUV(
			point: IVector3,
			uv1: IVector2,
			uv2: IVector2,
			uv3: IVector2,
			target: IVector2
		): IVector2;
		containsPoint(point: IVector3): boolean;
		intersectsBox(box: IBox3): boolean;
		isFrontFacing(direction: IVector3): boolean;
		closestPointToPoint(point: IVector3, target: IVector3): IVector3;
		equals(triangle: ITriangle): boolean;
	}

	export interface ISphere {
		/**
		 * @default new Vector3()
		 */
		center: IVector3;

		/**
		 * @default 1
		 */
		radius: number;

		set(center: IVector3, radius: number): ISphere;
		setFromPoints(points: IVector3[], optionalCenter?: IVector3): ISphere;
		clone(): this;
		copy(sphere: ISphere): this;
		expandByPoint(point: IVector3): this;
		isEmpty(): boolean;
		makeEmpty(): this;
		containsPoint(point: IVector3): boolean;
		distanceToPoint(point: IVector3): number;
		intersectsSphere(sphere: ISphere): boolean;
		intersectsBox(box: IBox3): boolean;
		intersectsPlane(plane: IPlane): boolean;
		clampPoint(point: IVector3, target: IVector3): IVector3;
		getBoundingBox(target: IBox3): IBox3;
		applyMatrix4(matrix: IMatrix4): ISphere;
		translate(offset: IVector3): ISphere;
		equals(sphere: ISphere): boolean;
		union(sphere: ISphere): this;

		/**
		 * @deprecated Use {@link O3JS.Sphere#isEmpty .isEmpty()} instead.
		 */
		empty(): any;
	}

	export interface IBox2 {
		new (min?: IVector2, max?: IVector2): this;

		/**
		 * @default new O3JS.Vector2( + Infinity, + Infinity )
		 */
		min: IVector2;

		/**
		 * @default new O3JS.Vector2( - Infinity, - Infinity )
		 */
		max: IVector2;

		set(min: IVector2, max: IVector2): IBox2;
		setFromPoints(points: IVector2[]): IBox2;
		setFromCenterAndSize(center: IVector2, size: IVector2): IBox2;
		clone(): this;
		copy(box: IBox2): this;
		makeEmpty(): IBox2;
		isEmpty(): boolean;
		getCenter(target: IVector2): IVector2;
		getSize(target: IVector2): IVector2;
		expandByPoint(point: IVector2): IBox2;
		expandByVector(vector: IVector2): IBox2;
		expandByScalar(scalar: number): IBox2;
		containsPoint(point: IVector2): boolean;
		containsBox(box: IBox2): boolean;
		getParameter(point: IVector2, target: IVector2): IVector2;
		intersectsBox(box: IBox2): boolean;
		clampPoint(point: IVector2, target: IVector2): IVector2;
		distanceToPoint(point: IVector2): number;
		intersect(box: IBox2): IBox2;
		union(box: IBox2): IBox2;
		translate(offset: IVector2): IBox2;
		equals(box: IBox2): boolean;
	}

	export interface IBox3 {
		/**
		 * @default new IVector3( + Infinity, + Infinity, + Infinity )
		 */
		min: IVector3;

		/**
		 * @default new IVector3( - Infinity, - Infinity, - Infinity )
		 */
		max: IVector3;
		readonly isBox3: true;

		set(min: IVector3, max: IVector3): this;
		setFromArray(array: ArrayLike<number>): this;
		setFromBufferAttribute(bufferAttribute: IBufferAttribute): this;
		setFromPoints(points: IVector3[]): this;
		setFromCenterAndSize(center: IVector3, size: IVector3): this;
		setFromObject(object: IObject3D): this;
		clone(): this;
		copy(box: IBox3): this;
		makeEmpty(): this;
		isEmpty(): boolean;
		getCenter(target: IVector3): IVector3;
		getSize(target: IVector3): IVector3;
		expandByPoint(point: IVector3): this;
		expandByVector(vector: IVector3): this;
		expandByScalar(scalar: number): this;
		expandByObject(object: IObject3D): this;
		containsPoint(point: IVector3): boolean;
		containsBox(box: IBox3): boolean;
		getParameter(point: IVector3, target: IVector3): IVector3;
		intersectsBox(box: IBox3): boolean;
		intersectsSphere(sphere: ISphere): boolean;
		intersectsPlane(plane: IPlane): boolean;
		intersectsTriangle(triangle: ITriangle): boolean;
		clampPoint(point: IVector3, target: IVector3): IVector3;
		distanceToPoint(point: IVector3): number;
		getBoundingSphere(target: ISphere): ISphere;
		intersect(box: IBox3): this;
		union(box: IBox3): this;
		applyMatrix4(matrix: IMatrix4): this;
		translate(offset: IVector3): this;
		equals(box: IBox3): boolean;
		/**
		 * @deprecated Use {@link O3JS.Box3#isEmpty .isEmpty()} instead.
		 */
		empty(): any;
		/**
		 * @deprecated Use {@link O3JS.Box3#intersectsBox .intersectsBox()} instead.
		 */
		isIntersectionBox(b: any): any;
		/**
		 * @deprecated Use {@link O3JS.Box3#intersectsSphere .intersectsSphere()} instead.
		 */
		isIntersectionSphere(s: any): any;
	}

	export interface IPMREMGenerator {
		fromScene(
			scene: IScene,
			sigma?: number,
			near?: number,
			far?: number
		): IWebGLRenderTarget;
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
		): IVector2[];
		generateSideWallUV(
			geometry: IExtrudeGeometry,
			vertices: number[],
			indexA: number,
			indexB: number,
			indexC: number,
			indexD: number
		): IVector2[];
	}

	/**
	 * The WebGL renderer displays your beautifully crafted scenes using WebGL, if your device supports it.
	 * This renderer has way better performance than CanvasRenderer.
	 *
	 * see {@link https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js|src/renderers/WebGLRenderer.js}
	 */
	export interface IWebGLRenderer extends IRenderer {
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
		 * @default O3JS.LinearEncoding
		 */
		outputEncoding: O3JS.TextureEncoding;

		/**
		 * @default false
		 */
		physicallyCorrectLights: boolean;

		/**
		 * @default O3JS.NoToneMapping
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

		getDrawingBufferSize(target: IVector2): IVector2;
		setDrawingBufferSize(
			width: number,
			height: number,
			pixelRatio: number
		): void;

		getSize(target: IVector2): IVector2;

		/**
		 * Resizes the output canvas to (width, height), and also sets the viewport to fit that size, starting in (0, 0).
		 */
		setSize(width: number, height: number, updateStyle?: boolean): void;

		getCurrentViewport(target: IVector4): IVector4;

		/**
		 * Copies the viewport into target.
		 */
		getViewport(target: IVector4): IVector4;

		/**
		 * Sets the viewport to render from (x, y) to (x + width, y + height).
		 * (x, y) is the lower-left corner of the region.
		 */
		setViewport(
			x: IVector4 | number,
			y?: number,
			width?: number,
			height?: number
		): void;

		/**
		 * Copies the scissor area into target.
		 */
		getScissor(target: IVector4): IVector4;

		/**
		 * Sets the scissor area from (x, y) to (x + width, y + height).
		 */
		setScissor(
			x: IVector4 | number,
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
		clearTarget(
			renderTarget: IWebGLRenderTarget,
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
		 * @deprecated Use {@link O3JS.WebGLRenderer#setAnimationLoop .setAnimationLoop()} instead.
		 */
		animate(callback: () => void): void;

		/**
		 * Compiles all materials in the scene with the camera. This is useful to precompile shaders before the first rendering.
		 */
		compile(scene: IObject3D, camera: ICamera): void;

		/**
		 * Render a scene or an object using a camera.
		 * The render is done to a previously specified {@link O3JS.WebGLRenderTarget#renderTarget .renderTarget} set by calling
		 * {@link O3JS.WebGLRenderer#setRenderTarget .setRenderTarget} or to the canvas as usual.
		 *
		 * By default render buffers are cleared before rendering but you can prevent this by setting the property
		 * {@link O3JS.WebGLRenderer#autoClear autoClear} to false. If you want to prevent only certain buffers being cleared
		 * you can set either the {@link O3JS.WebGLRenderer#autoClearColor autoClearColor},
		 * {@link O3JS.WebGLRenderer#autoClearStencil autoClearStencil} or {@link O3JS.WebGLRenderer#autoClearDepth autoClearDepth}
		 * properties to false. To forcibly clear one ore more buffers call {@link O3JS.WebGLRenderer#clear .clear}.
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
		 * @deprecated Use {@link O3JS.WebGLRenderer#getRenderTarget .getRenderTarget()} instead.
		 */
		getCurrentRenderTarget(): IWebGLRenderTarget | null;

		/**
		 * Sets the active render target.
		 *
		 * @param renderTarget The {@link O3JS.WebGLRenderTarget renderTarget} that needs to be activated. When `null` is given, the canvas is set as the active render target instead.
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
		copyFramebufferToTexture(
			position: IVector2,
			texture: ITexture,
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
			position: IVector2,
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
		 * @deprecated Use {@link O3JS.WebGLRenderer#xr .xr} instead.
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
		 * @deprecated Use {@link O3JS.WebGLRenderer#setScissorTest .setScissorTest()} instead.
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
	export interface IBufferGeometry extends O3JS.EventDispatcher {
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
		getAttribute(
			name: O3JS.BuiltinShaderAttributeName | (string & {})
		): IBufferAttribute | IInterleavedBufferAttribute;
		deleteAttribute(
			name: O3JS.BuiltinShaderAttributeName | (string & {})
		): IBufferGeometry;
		hasAttribute(
			name: O3JS.BuiltinShaderAttributeName | (string & {})
		): boolean;

		addGroup(start: number, count: number, materialIndex?: number): void;
		clearGroups(): void;

		setDrawRange(start: number, count: number): void;

		/**
		 * Bakes matrix transform directly into vertex coordinates.
		 */
		applyMatrix4(matrix: IMatrix4): IBufferGeometry;
		applyQuaternion(q: IQuaternion): IBufferGeometry;

		rotateX(angle: number): IBufferGeometry;
		rotateY(angle: number): IBufferGeometry;
		rotateZ(angle: number): IBufferGeometry;
		translate(x: number, y: number, z: number): IBufferGeometry;
		scale(x: number, y: number, z: number): IBufferGeometry;
		lookAt(v: IVector3): void;

		center(): IBufferGeometry;

		setFromPoints(points: IVector3[] | IVector2[]): IBufferGeometry;

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
		 * @deprecated Use {@link O3JS.BufferGeometry#groups .groups} instead.
		 */
		drawcalls: any;

		/**
		 * @deprecated Use {@link O3JS.BufferGeometry#groups .groups} instead.
		 */
		offsets: any;

		/**
		 * @deprecated Use {@link O3JS.BufferGeometry#setIndex .setIndex()} instead.
		 */
		addIndex(index: any): void;

		/**
		 * @deprecated Use {@link O3JS.BufferGeometry#addGroup .addGroup()} instead.
		 */
		addDrawCall(start: any, count: any, indexOffset?: any): void;

		/**
		 * @deprecated Use {@link O3JS.BufferGeometry#clearGroups .clearGroups()} instead.
		 */
		clearDrawCalls(): void;

		/**
		 * @deprecated Use {@link O3JS.BufferGeometry#setAttribute .setAttribute()} instead.
		 */
		addAttribute(
			name: string,
			attribute: IBufferAttribute | IInterleavedBufferAttribute
		): IBufferGeometry;
		addAttribute(name: any, array: any, itemSize: any): any;

		/**
		 * @deprecated Use {@link O3JS.BufferGeometry#deleteAttribute .deleteAttribute()} instead.
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
		new (
			radius?: number,
			segments?: number,
			thetaStart?: number,
			thetaLength?: number
		): this;

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

	export interface IEdgesGeometry<
		TBufferGeometry extends O3JS.BufferGeometry = O3JS.BufferGeometry
	> extends IBufferGeometry {
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
		new (
			points?: IVector2[],
			segments?: number,
			phiStart?: number,
			phiLength?: number
		): this;

		/**
		 * @default 'LatheGeometry'
		 */
		type: string;

		parameters: {
			points: IVector2[];
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
		new (
			width?: number,
			height?: number,
			widthSegments?: number,
			heightSegments?: number
		): this;

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
		new (
			vertices?: number[],
			indices?: number[],
			radius?: number,
			detail?: number
		): this;

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

	export interface IExtrudeGeometry extends IBufferGeometry {
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
		new (
			radius?: number,
			tube?: number,
			radialSegments?: number,
			tubularSegments?: number,
			arc?: number
		): this;

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
		new (
			radius?: number,
			tube?: number,
			tubularSegments?: number,
			radialSegments?: number,
			p?: number,
			q?: number
		): this;

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
		tangents: IVector3[];
		normals: IVector3[];
		binormals: IVector3[];
	}

	export interface IWireframeGeometry<
		TBufferGeometry extends O3JS.BufferGeometry = O3JS.BufferGeometry
	> extends IBufferGeometry {
		new (geometry?: TBufferGeometry): this;

		/**
		 * @default 'WireframeGeometry'
		 */
		type: string;

		parameters: {
			geometry: TBufferGeometry;
		};
	}

	export interface IGroup extends IObject3D {
		type: 'Group';
		readonly isGroup: true;
	}

	export interface IRay {
		/**
		 * @default new IVector3()
		 */
		origin: IVector3;

		/**
		 * @default new IVector3( 0, 0, - 1 )
		 */
		direction: IVector3;

		set(origin: IVector3, direction: IVector3): IRay;
		clone(): this;
		copy(ray: IRay): this;
		at(t: number, target: IVector3): IVector3;
		lookAt(v: IVector3): IRay;
		recast(t: number): IRay;
		closestPointToPoint(point: IVector3, target: IVector3): IVector3;
		distanceToPoint(point: IVector3): number;
		distanceSqToPoint(point: IVector3): number;
		distanceSqToSegment(
			v0: IVector3,
			v1: IVector3,
			optionalPointOnRay?: IVector3,
			optionalPointOnSegment?: IVector3
		): number;
		intersectSphere(sphere: ISphere, target: IVector3): IVector3 | null;
		intersectsSphere(sphere: ISphere): boolean;
		distanceToPlane(plane: IPlane): number;
		intersectPlane(plane: IPlane, target: IVector3): IVector3 | null;
		intersectsPlane(plane: IPlane): boolean;
		intersectBox(box: IBox3, target: IVector3): IVector3 | null;
		intersectsBox(box: IBox3): boolean;
		intersectTriangle(
			a: IVector3,
			b: IVector3,
			c: IVector3,
			backfaceCulling: boolean,
			target: IVector3
		): IVector3 | null;
		applyMatrix4(matrix4: IMatrix4): IRay;
		equals(ray: IRay): boolean;

		/**
		 * @deprecated Use {@link O3JS.Ray#intersectsBox .intersectsBox()} instead.
		 */
		isIntersectionBox(b: any): any;

		/**
		 * @deprecated Use {@link O3JS.Ray#intersectsPlane .intersectsPlane()} instead.
		 */
		isIntersectionPlane(p: any): any;

		/**
		 * @deprecated Use {@link O3JS.Ray#intersectsSphere .intersectsSphere()} instead.
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
		 * @default new O3JS.Layers()
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
		set(origin: IVector3, direction: IVector3): void;

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
		new(manager?: ILoadingManager): this;
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

		loadAsync(
			url: string,
			onProgress?: (event: ProgressEvent) => void
		): Promise<any>;

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
		/**
		 * Will be called when loading of an item starts.
		 * @param url The url of the item that started loading.
		 * @param loaded The number of items already loaded so far.
		 * @param total The total amount of items to be loaded.
		 */
		onStart?:
			| ((url: string, loaded: number, total: number) => void)
			| undefined;

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

		loadAsync(
			url: string,
			onProgress?: (event: ProgressEvent) => void
		): Promise<HTMLImageElement>;
	}

	export interface IAnimationLoader extends ILoader {
		load(
			url: string,
			onLoad: (response: IAnimationClip[]) => void,
			onProgress?: (request: ProgressEvent) => void,
			onError?: (event: ErrorEvent) => void
		): void;
		loadAsync(
			url: string,
			onProgress?: (event: ProgressEvent) => void
		): Promise<IAnimationClip[]>;
		parse(json: any): IAnimationClip[];
	}

	export interface IAudioLoader extends ILoader {
		load(
			url: string,
			onLoad: (audioBuffer: AudioBuffer) => void,
			onProgress?: (request: ProgressEvent) => void,
			onError?: (event: ErrorEvent) => void
		): void;

		loadAsync(
			url: string,
			onProgress?: (event: ProgressEvent) => void
		): Promise<AudioBuffer>;
	}

	export interface IBufferGeometryLoader extends ILoader {
		load(
			url: string,
			onLoad: (
				bufferGeometry: IInstancedBufferGeometry | IBufferGeometry
			) => void,
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

		loadAsync(
			url: string,
			onProgress?: (event: ProgressEvent) => void
		): Promise<ICompressedTexture>;
	}

	export interface ICubeTextureLoader extends ILoader {
		load(
			urls: string[],
			onLoad?: (texture: ICubeTexture) => void,
			onProgress?: (event: ProgressEvent) => void,
			onError?: (event: ErrorEvent) => void
		): ICubeTexture;

		loadAsync(
			url: string,
			onProgress?: (event: ProgressEvent) => void
		): Promise<ICubeTexture>;
	}

	export interface IDataTextureLoader extends ILoader {
		load(
			url: string,
			onLoad: (dataTexture: IDataTexture, texData: object) => void,
			onProgress?: (event: ProgressEvent) => void,
			onError?: (event: ErrorEvent) => void
		): IDataTexture;

		loadAsync(
			url: string,
			onProgress?: (event: ProgressEvent) => void
		): Promise<IDataTexture>;
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
		loadAsync(
			url: string,
			onProgress?: (event: ProgressEvent) => void
		): Promise<string | ArrayBuffer>;
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

		loadAsync(
			url: string,
			onProgress?: (event: ProgressEvent) => void
		): Promise<ImageBitmap>;
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

		loadAsync(
			url: string,
			onProgress?: (event: ProgressEvent) => void
		): Promise<HTMLImageElement>;
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
		loadAsync(
			url: string,
			onProgress?: (event: ProgressEvent) => void
		): Promise<IMaterial>;
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
		parse<T extends IObject3D>(
			json: any,
			onLoad?: (object: IObject3D) => void
		): T;
		// tslint:disable-next-line:no-unnecessary-generics
		parseAsync<T extends IObject3D>(json: any): Promise<T>;
		parseGeometries(json: any): {
			[key: string]: IInstancedBufferGeometry | IBufferGeometry;
		}; // Array of BufferGeometry or Geometry or Geometry2.
		parseMaterials(json: any, textures: ITexture[]): IMaterial[]; // Array of Classes that inherits from Matrial.
		parseAnimations(json: any): IAnimationClip[];
		parseImages(
			json: any,
			onLoad: () => void
		): { [key: string]: HTMLImageElement };
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

		loadAsync(
			url: string,
			onProgress?: (event: ProgressEvent) => void
		): Promise<ITexture>;
	}

	export interface ILoaderUtils {
		decodeText(array: BufferSource): string;
		extractUrlBase(url: string): string;
		resolveURL(url: string, path: string): string;
	}

	export interface IAudio<NodeType extends AudioNode = GainNode>
		extends IObject3D {
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
		setDirectionalCone(
			coneInnerAngle: number,
			coneOuterAngle: number,
			coneOuterGain: number
		): this;
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

	export interface IAudioAnalyser {
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
		loadAsync(
			url: string,
			onProgress?: (event: ProgressEvent) => void
		): Promise<AudioBuffer>;
	}

	export interface IAnimationObjectGroup {
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
		flattenJSON(
			jsonKeys: string[],
			times: any[],
			values: any[],
			valuePropertyName: string
		): void;

		/**
		 * @param sourceClip
		 * @param name
		 * @param startFrame
		 * @param endFrame
		 * @param [fps=30]
		 */
		subclip(
			sourceClip: IAnimationClip,
			name: string,
			startFrame: number,
			endFrame: number,
			fps?: number
		): IAnimationClip;

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
		setDirection(dir: IVector3): void;

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
		 * @default 'AxesHelper'
		 */
		type: string;

		setColors(xAxisColor: IColor, yAxisColor: IColor, zAxisColor: IColor): this;

		dispose(): void;
	}

	export interface IBox3Helper extends ILineSegments {
		/**
		 * @default 'Box3Helper'
		 */
		type: string;

		box: IBox3;
	}

	export interface IBoxHelper extends ILineSegments {
		/**
		 * @default 'BoxHelper'
		 */
		type: string;

		update(object?: IObject3D): void;

		setFromObject(object: IObject3D): this;
	}

	export interface ICameraHelper extends ILineSegments {
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
		/**
		 * @default 'GridHelper'
		 */
		type: string;

		/**
		 * @deprecated Colors should be specified in the constructor.
		 */
		setColors(
			color1?: TColorRepresentation,
			color2?: TColorRepresentation
		): void;
	}

	export interface IHemisphereLightHelper extends IObject3D {
		light: IHemisphereLight;
		matrix: IMatrix4;
		matrixAutoUpdate: boolean;
		material: IMeshBasicMaterial;

		color: TColorRepresentation | undefined;

		dispose(): void;
		update(): void;
	}

	export interface IPlaneHelper extends ILineSegments {
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
		 * @default 'PolarGridHelper'
		 */
		type: string;
	}

	export interface ISkeletonHelper extends ILineSegments {
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
	export interface IObject3D<E extends O3JS.BaseEvent = O3JS.Event>
		extends O3JS.EventDispatcher<E> {
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
		 * @default O3JS.Object3D.DefaultUp.clone()
		 */
		up: IVector3;

		/**
		 * Object's local position.
		 * @default new IVector3()
		 */
		readonly position: IVector3;

		/**
		 * Object's local rotation (Euler angles), in radians.
		 * @default new O3JS.Euler()
		 */
		readonly rotation: IEuler;

		/**
		 * Object's local rotation as a Quaternion.
		 * @default new O3JS.Quaternion()
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
		 * @default O3JS.Object3D.DefaultMatrixAutoUpdate
		 */
		matrixAutoUpdate: boolean;

		/**
		 * When this is set, it calculates the matrixWorld in that frame and resets this property to false.
		 * @default false
		 */
		matrixWorldNeedsUpdate: boolean;

		/**
		 * @default new O3JS.Layers()
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

		applyQuaternion(quaternion: IQuaternion): this;

		setRotationFromAxisAngle(axis: IVector3, angle: number): void;

		setRotationFromEuler(euler: IEuler): void;

		setRotationFromMatrix(m: IMatrix4): void;

		setRotationFromQuaternion(q: IQuaternion): void;

		/**
		 * Rotate an object along an axis in object space. The axis is assumed to be normalized.
		 * @param axis	A normalized vector in object space.
		 * @param angle	The angle in radians.
		 */
		rotateOnAxis(axis: IVector3, angle: number): this;

		/**
		 * Rotate an object along an axis in world space. The axis is assumed to be normalized. Method Assumes no rotated parent.
		 * @param axis	A normalized vector in object space.
		 * @param angle	The angle in radians.
		 */
		rotateOnWorldAxis(axis: IVector3, angle: number): this;

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
		translateOnAxis(axis: IVector3, distance: number): this;

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
		localToWorld(vector: IVector3): IVector3;

		/**
		 * Updates the vector from world space to local space.
		 * @param vector A world vector.
		 */
		worldToLocal(vector: IVector3): IVector3;

		/**
		 * Rotates object to face point in space.
		 * @param vector A world vector to look at.
		 */
		lookAt(vector: IVector3 | number, y?: number, z?: number): void;

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

		getWorldPosition(target: IVector3): IVector3;
		getWorldQuaternion(target: IQuaternion): IQuaternion;
		getWorldScale(target: IVector3): IVector3;
		getWorldDirection(target: IVector3): IVector3;

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
	export interface ICamera extends IObject3D {
		/**
		 * This is the inverse of matrixWorld. MatrixWorld contains the Matrix which has the world transform of the Camera.
		 * @default new IMatrix4()
		 */
		matrixWorldInverse: IMatrix4;

		/**
		 * This is the matrix which contains the projection.
		 * @default new IMatrix4()
		 */
		projectionMatrix: IMatrix4;

		/**
		 * This is the inverse of projectionMatrix.
		 * @default new IMatrix4()
		 */
		projectionMatrixInverse: IMatrix4;

		readonly isCamera: true;

		getWorldDirection(target: IVector3): IVector3;

		updateMatrixWorld(force?: boolean): void;
	}

	/**
	 * Camera with orthographic projection
	 *
	 * see {@link https://github.com/mrdoob/three.js/blob/master/src/cameras/OrthographicCamera.js|src/cameras/OrthographicCamera.js}
	 *
	 * @example
	 * const camera = new O3JS.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
	 * scene.add( camera );
	 */
	export interface IOrthographicCamera extends ICamera {
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
		setViewOffset(
			fullWidth: number,
			fullHeight: number,
			x: number,
			y: number,
			width: number,
			height: number
		): void;
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
		 * @default new O3JS.Vector2( 512, 512 )
		 */
		mapSize: IVector2;

		/**
		 * @default null
		 */
		map: IWebGLRenderTarget;

		/**
		 * @default null
		 */
		mapPass: IWebGLRenderTarget;

		/**
		 * @default new O3JS.Matrix4()
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
	 * const light = new O3JS.PointLight( 0xff0000, 1, 100 );
	 * light.position.set( 50, 50, 50 );
	 * scene.add( light );
	 */
	export interface IPointLight extends ILight {
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
		 * @default new O3JS.PointLightShadow()
		 */
		shadow: IPointLightShadow;

		power: number;
	}

	export interface IPointLightShadow extends ILightShadow {
		camera: IPerspectiveCamera;
	}

	export interface IRectAreaLight extends ILight {
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
		/**
		 * @default 'SpotLight'
		 */
		type: string;

		/**
		 * @default O3JS.Object3D.DefaultUp
		 */
		position: IVector3;

		/**
		 * Spotlight focus points at target.position.
		 * @default new O3JS.Object3D()
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
		 * @default new O3JS.SpotLightShadow()
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
		/**
		 * @default 'AmbientLight'
		 */
		type: string;

		readonly isAmbientLight: true;
	}

	export interface ILightProbe extends ILight {
		/**
		 * @default 'LightProbe'
		 */
		type: string;

		readonly isLightProbe: true;

		/**
		 * @default new O3JS.SphericalHarmonics3()
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
	 * const directionalLight = new O3JS.DirectionalLight( 0xffffff, 0.5 );
	 * directionalLight.position.set( 0, 1, 0 );
	 * scene.add( directionalLight );
	 */
	export interface IDirectionalLight extends ILight {
		/**
		 * @default 'DirectionalLight'
		 */
		type: string;

		/**
		 * @default O3JS.Object3D.DefaultUp
		 */
		readonly position: IVector3;

		/**
		 * Target used for shadow camera orientation.
		 * @default new O3JS.Object3D()
		 */
		target: IObject3D;

		/**
		 * Light's intensity.
		 * @default 1
		 */
		intensity: number;

		/**
		 * @default new O3JS.DirectionalLightShadow()
		 */
		shadow: IDirectionalLightShadow;
		readonly isDirectionalLight: true;
	}

	export interface IDirectionalLightShadow extends ILightShadow {
		camera: IOrthographicCamera;
		readonly isDirectionalLightShadow: true;
	}

	export interface IHemisphereLight extends ILight {
		/**
		 * @default 'HemisphereLight'
		 */
		type: string;

		/**
		 * @default O3JS.Object3D.DefaultUp
		 */
		position: IVector3;

		groundColor: IColor;

		readonly isHemisphereLight: true;
	}

	export interface IHemisphereLightProbe extends ILightProbe {
		readonly isHemisphereLightProbe: true;
	}

	export interface IMesh<
		TGeometry extends O3JS.BufferGeometry = O3JS.BufferGeometry,
		TMaterial extends O3JS.Material | O3JS.Material[] = O3JS.Material | O3JS.Material[]
	> extends IObject3D {
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
		readonly isBone: true;
		type: 'Bone';
	}

	export interface IGroup extends IObject3D {
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
		TGeometry extends O3JS.BufferGeometry = O3JS.BufferGeometry,
		TMaterial extends O3JS.Material | O3JS.Material[] = O3JS.Material | O3JS.Material[]
	> extends IMesh<TGeometry, TMaterial> {
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
		TGeometry extends O3JS.BufferGeometry = O3JS.BufferGeometry,
		TMaterial extends O3JS.Material | O3JS.Material[] = O3JS.Material | O3JS.Material[]
	> extends IObject3D {
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
		TGeometry extends O3JS.BufferGeometry = O3JS.BufferGeometry,
		TMaterial extends O3JS.Material | O3JS.Material[] = O3JS.Material | O3JS.Material[]
	> extends IObject3D {
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
		TGeometry extends IBufferGeometry = O3JS.BufferGeometry,
		TMaterial extends IMaterial | IMaterial[] = O3JS.Material | O3JS.Material[]
	> extends ILine<TGeometry, TMaterial> {
		type: 'LineLoop';
		readonly isLineLoop: true;
	}

	export interface ILineSegments<
		TGeometry extends IBufferGeometry = O3JS.BufferGeometry,
		TMaterial extends IMaterial | IMaterial[] = O3JS.Material | O3JS.Material[]
	> extends ILine<TGeometry, TMaterial> {
		/**
		 * @default 'LineSegments'
		 */
		type: 'LineSegments' | string;
		readonly isLineSegments: true;
	}

	export interface ILOD extends IObject3D {
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
		uuid: string;
		bones: IBone[];
		boneInverses: IMatrix4[];
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
		TGeometry extends IBufferGeometry = O3JS.BufferGeometry,
		TMaterial extends IMaterial | IMaterial[] = O3JS.Material | O3JS.Material[]
	> extends IMesh<TGeometry, TMaterial> {
		bindMode: string;
		bindMatrix: IMatrix4;
		bindMatrixInverse: IMatrix4;
		skeleton: ISkeleton;
		readonly isSkinnedMesh: true;

		bind(skeleton: ISkeleton, bindMatrix?: IMatrix4): void;
		pose(): void;
		normalizeSkinWeights(): void;
		updateMatrixWorld(force?: boolean): void;
		boneTransform(index: number, target: IVector3): IVector3;
	}

	export interface ISprite extends IObject3D {
		type: 'Sprite';
		readonly isSprite: true;

		geometry: IBufferGeometry;
		material: ISpriteMaterial;
		center: IVector2;

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

	export const CullFaceNone: O3JS.CullFace = O3JS.CullFaceNone;
	export const CullFaceBack: O3JS.CullFace = O3JS.CullFaceBack;
	export const CullFaceFront: O3JS.CullFace = O3JS.CullFaceFront;
	export const CullFaceFrontBack: O3JS.CullFace = O3JS.CullFaceFrontBack;
	export const BasicShadowMap: O3JS.ShadowMapType = O3JS.BasicShadowMap;
	export const PCFShadowMap: O3JS.ShadowMapType = O3JS.PCFShadowMap;
	export const PCFSoftShadowMap: O3JS.ShadowMapType = O3JS.PCFSoftShadowMap;
	export const VSMShadowMap: O3JS.ShadowMapType = O3JS.VSMShadowMap;
	export const FrontSide: O3JS.Side = O3JS.FrontSide;
	export const BackSide: O3JS.Side = O3JS.BackSide;
	export const DoubleSide: O3JS.Side = O3JS.DoubleSide;
	export const FlatShading: O3JS.Shading = O3JS.FlatShading;
	export const SmoothShading: O3JS.Shading = O3JS.SmoothShading;
	export const NoBlending: O3JS.Blending = O3JS.NoBlending;
	export const NormalBlending: O3JS.Blending = O3JS.NormalBlending;
	export const AdditiveBlending: O3JS.Blending = O3JS.AdditiveBlending;
	export const SubtractiveBlending: O3JS.Blending = O3JS.SubtractiveBlending;
	export const MultiplyBlending: O3JS.Blending = O3JS.MultiplyBlending;
	export const CustomBlending: O3JS.Blending = O3JS.CustomBlending;
	export const AddEquation: O3JS.BlendingEquation = O3JS.AddEquation;
	export const SubtractEquation: O3JS.BlendingEquation = O3JS.SubtractEquation;
	export const ReverseSubtractEquation: O3JS.BlendingEquation =
		O3JS.ReverseSubtractEquation;
	export const MinEquation: O3JS.BlendingEquation = O3JS.MinEquation;
	export const MaxEquation: O3JS.BlendingEquation = O3JS.MaxEquation;
	export const ZeroFactor: O3JS.BlendingDstFactor = O3JS.ZeroFactor;
	export const OneFactor: O3JS.BlendingDstFactor = O3JS.OneFactor;
	export const SrcColorFactor: O3JS.BlendingDstFactor = O3JS.SrcColorFactor;
	export const OneMinusSrcColorFactor: O3JS.BlendingDstFactor =
		O3JS.OneMinusSrcColorFactor;
	export const SrcAlphaFactor: O3JS.BlendingDstFactor = O3JS.SrcAlphaFactor;
	export const OneMinusSrcAlphaFactor: O3JS.BlendingDstFactor =
		O3JS.OneMinusSrcAlphaFactor;
	export const DstAlphaFactor: O3JS.BlendingDstFactor = O3JS.DstAlphaFactor;
	export const OneMinusDstAlphaFactor: O3JS.BlendingDstFactor =
		O3JS.OneMinusDstAlphaFactor;
	export const DstColorFactor: O3JS.BlendingDstFactor = O3JS.DstColorFactor;
	export const OneMinusDstColorFactor: O3JS.BlendingDstFactor =
		O3JS.OneMinusDstColorFactor;
	export const SrcAlphaSaturateFactor: O3JS.BlendingSrcFactor =
		O3JS.SrcAlphaSaturateFactor;
	export const NeverDepth: O3JS.DepthModes = O3JS.NeverDepth;
	export const AlwaysDepth: O3JS.DepthModes = O3JS.AlwaysDepth;
	export const LessDepth: O3JS.DepthModes = O3JS.LessDepth;
	export const LessEqualDepth: O3JS.DepthModes = O3JS.LessEqualDepth;
	export const EqualDepth: O3JS.DepthModes = O3JS.EqualDepth;
	export const GreaterEqualDepth: O3JS.DepthModes = O3JS.GreaterEqualDepth;
	export const GreaterDepth: O3JS.DepthModes = O3JS.GreaterDepth;
	export const NotEqualDepth: O3JS.DepthModes = O3JS.NotEqualDepth;
	export const MultiplyOperation: O3JS.Combine = O3JS.MultiplyOperation;
	export const MixOperation: O3JS.Combine = O3JS.MixOperation;
	export const AddOperation: O3JS.Combine = O3JS.AddOperation;
	export const NoToneMapping: O3JS.ToneMapping = O3JS.NoToneMapping;
	export const LinearToneMapping: O3JS.ToneMapping = O3JS.LinearToneMapping;
	export const ReinhardToneMapping: O3JS.ToneMapping = O3JS.ReinhardToneMapping;
	export const CineonToneMapping: O3JS.ToneMapping = O3JS.CineonToneMapping;
	export const ACESFilmicToneMapping: O3JS.ToneMapping =
		O3JS.ACESFilmicToneMapping;
	export const UVMapping: O3JS.Mapping = O3JS.UVMapping;
	export const CubeReflectionMapping: O3JS.Mapping = O3JS.CubeReflectionMapping;
	export const CubeRefractionMapping: O3JS.Mapping = O3JS.CubeRefractionMapping;
	export const EquirectangularReflectionMapping: O3JS.Mapping =
		O3JS.EquirectangularReflectionMapping;
	export const EquirectangularRefractionMapping: O3JS.Mapping =
		O3JS.EquirectangularRefractionMapping;
	export const CubeUVReflectionMapping: O3JS.Mapping =
		O3JS.CubeUVReflectionMapping;
	export const CubeUVRefractionMapping: O3JS.Mapping =
		O3JS.CubeUVRefractionMapping;
	export const RepeatWrapping: O3JS.Wrapping = O3JS.RepeatWrapping;
	export const ClampToEdgeWrapping: O3JS.Wrapping = O3JS.ClampToEdgeWrapping;
	export const MirroredRepeatWrapping: O3JS.Wrapping =
		O3JS.MirroredRepeatWrapping;
	export const NearestFilter: O3JS.TextureFilter = O3JS.NearestFilter;
	export const NearestMipmapNearestFilter: O3JS.TextureFilter =
		O3JS.NearestMipmapNearestFilter;
	export const NearestMipMapNearestFilter: O3JS.TextureFilter =
		O3JS.NearestMipMapNearestFilter;
	export const NearestMipmapLinearFilter: O3JS.TextureFilter =
		O3JS.NearestMipmapLinearFilter;
	export const NearestMipMapLinearFilter: O3JS.TextureFilter =
		O3JS.NearestMipMapLinearFilter;
	export const LinearFilter: O3JS.TextureFilter = O3JS.LinearFilter;
	export const LinearMipmapNearestFilter: O3JS.TextureFilter =
		O3JS.LinearMipmapNearestFilter;
	export const LinearMipMapNearestFilter: O3JS.TextureFilter =
		O3JS.LinearMipMapNearestFilter;
	export const LinearMipmapLinearFilter: O3JS.TextureFilter =
		O3JS.LinearMipmapLinearFilter;
	export const LinearMipMapLinearFilter: O3JS.TextureFilter =
		O3JS.LinearMipMapLinearFilter;
	export const UnsignedByteType: O3JS.TextureDataType = O3JS.UnsignedByteType;
	export const ByteType: O3JS.TextureDataType = O3JS.ByteType;
	export const ShortType: O3JS.TextureDataType = O3JS.ShortType;
	export const UnsignedShortType: O3JS.TextureDataType = O3JS.UnsignedShortType;
	export const IntType: O3JS.TextureDataType = O3JS.IntType;
	export const UnsignedIntType: O3JS.TextureDataType = O3JS.UnsignedIntType;
	export const FloatType: O3JS.TextureDataType = O3JS.FloatType;
	export const HalfFloatType: O3JS.TextureDataType = O3JS.HalfFloatType;
	export const UnsignedShort4444Type: O3JS.TextureDataType =
		O3JS.UnsignedShort4444Type;
	export const UnsignedShort5551Type: O3JS.TextureDataType =
		O3JS.UnsignedShort5551Type;
	export const UnsignedShort565Type: O3JS.TextureDataType =
		O3JS.UnsignedShort565Type;
	export const UnsignedInt248Type: O3JS.TextureDataType =
		O3JS.UnsignedInt248Type;
	export const AlphaFormat: O3JS.PixelFormat = O3JS.AlphaFormat;
	export const RGBFormat: O3JS.PixelFormat = O3JS.RGBFormat;
	export const RGBAFormat: O3JS.PixelFormat = O3JS.RGBAFormat;
	export const LuminanceFormat: O3JS.PixelFormat = O3JS.LuminanceFormat;
	export const LuminanceAlphaFormat: O3JS.PixelFormat =
		O3JS.LuminanceAlphaFormat;
	export const RGBEFormat: O3JS.PixelFormat = O3JS.RGBEFormat;
	export const DepthFormat: O3JS.PixelFormat = O3JS.DepthFormat;
	export const DepthStencilFormat: O3JS.PixelFormat = O3JS.DepthStencilFormat;
	export const RedFormat: O3JS.PixelFormat = O3JS.RedFormat;
	export const RedIntegerFormat: O3JS.PixelFormat = O3JS.RedIntegerFormat;
	export const RGFormat: O3JS.PixelFormat = O3JS.RGFormat;
	export const RGIntegerFormat: O3JS.PixelFormat = O3JS.RGIntegerFormat;
	export const RGBIntegerFormat: O3JS.PixelFormat = O3JS.RGBIntegerFormat;
	export const RGBAIntegerFormat: O3JS.PixelFormat = O3JS.RGBAIntegerFormat;
	export const RGB_S3TC_DXT1_Format: O3JS.CompressedPixelFormat =
		O3JS.RGB_S3TC_DXT1_Format;
	export const RGBA_S3TC_DXT1_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_S3TC_DXT1_Format;
	export const RGBA_S3TC_DXT3_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_S3TC_DXT3_Format;
	export const RGBA_S3TC_DXT5_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_S3TC_DXT5_Format;
	export const RGB_PVRTC_4BPPV1_Format: O3JS.CompressedPixelFormat =
		O3JS.RGB_PVRTC_4BPPV1_Format;
	export const RGB_PVRTC_2BPPV1_Format: O3JS.CompressedPixelFormat =
		O3JS.RGB_PVRTC_2BPPV1_Format;
	export const RGBA_PVRTC_4BPPV1_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_PVRTC_4BPPV1_Format;
	export const RGBA_PVRTC_2BPPV1_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_PVRTC_2BPPV1_Format;
	export const RGB_ETC1_Format: O3JS.CompressedPixelFormat =
		O3JS.RGB_ETC1_Format;
	export const RGB_ETC2_Format: O3JS.CompressedPixelFormat =
		O3JS.RGB_ETC2_Format;
	export const RGBA_ETC2_EAC_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ETC2_EAC_Format;
	export const RGBA_ASTC_4x4_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_4x4_Format;
	export const RGBA_ASTC_5x4_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_5x4_Format;
	export const RGBA_ASTC_5x5_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_5x5_Format;
	export const RGBA_ASTC_6x5_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_6x5_Format;
	export const RGBA_ASTC_6x6_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_6x6_Format;
	export const RGBA_ASTC_8x5_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_8x5_Format;
	export const RGBA_ASTC_8x6_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_8x6_Format;
	export const RGBA_ASTC_8x8_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_8x8_Format;
	export const RGBA_ASTC_10x5_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_10x5_Format;
	export const RGBA_ASTC_10x6_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_10x6_Format;
	export const RGBA_ASTC_10x8_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_10x8_Format;
	export const RGBA_ASTC_10x10_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_10x10_Format;
	export const RGBA_ASTC_12x10_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_12x10_Format;
	export const RGBA_ASTC_12x12_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_12x12_Format;
	export const SRGB8_ALPHA8_ASTC_4x4_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_4x4_Format;
	export const SRGB8_ALPHA8_ASTC_5x4_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_5x4_Format;
	export const SRGB8_ALPHA8_ASTC_5x5_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_5x5_Format;
	export const SRGB8_ALPHA8_ASTC_6x5_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_6x5_Format;
	export const SRGB8_ALPHA8_ASTC_6x6_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_6x6_Format;
	export const SRGB8_ALPHA8_ASTC_8x5_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_8x5_Format;
	export const SRGB8_ALPHA8_ASTC_8x6_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_8x6_Format;
	export const SRGB8_ALPHA8_ASTC_8x8_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_8x8_Format;
	export const SRGB8_ALPHA8_ASTC_10x5_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_10x5_Format;
	export const SRGB8_ALPHA8_ASTC_10x6_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_10x6_Format;
	export const SRGB8_ALPHA8_ASTC_10x8_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_10x8_Format;
	export const SRGB8_ALPHA8_ASTC_10x10_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_10x10_Format;
	export const SRGB8_ALPHA8_ASTC_12x10_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_12x10_Format;
	export const SRGB8_ALPHA8_ASTC_12x12_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_12x12_Format;
	export const RGBA_BPTC_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_BPTC_Format;
	export const LoopOnce: O3JS.AnimationActionLoopStyles = O3JS.LoopOnce;
	export const LoopRepeat: O3JS.AnimationActionLoopStyles = O3JS.LoopRepeat;
	export const LoopPingPong: O3JS.AnimationActionLoopStyles = O3JS.LoopPingPong;
	export const InterpolateDiscrete: O3JS.InterpolationModes =
		O3JS.InterpolateDiscrete;
	export const InterpolateLinear: O3JS.InterpolationModes =
		O3JS.InterpolateLinear;
	export const InterpolateSmooth: O3JS.InterpolationModes =
		O3JS.InterpolateSmooth;
	export const ZeroCurvatureEnding: O3JS.InterpolationEndingModes =
		O3JS.ZeroCurvatureEnding;
	export const ZeroSlopeEnding: O3JS.InterpolationEndingModes =
		O3JS.ZeroSlopeEnding;
	export const WrapAroundEnding: O3JS.InterpolationEndingModes =
		O3JS.WrapAroundEnding;
	export const NormalAnimationBlendMode: O3JS.AnimationBlendMode =
		O3JS.NormalAnimationBlendMode;
	export const AdditiveAnimationBlendMode: O3JS.AnimationBlendMode =
		O3JS.AdditiveAnimationBlendMode;
	export const TrianglesDrawMode: O3JS.TrianglesDrawModes =
		O3JS.TrianglesDrawMode;
	export const TriangleStripDrawMode: O3JS.TrianglesDrawModes =
		O3JS.TriangleStripDrawMode;
	export const TriangleFanDrawMode: O3JS.TrianglesDrawModes =
		O3JS.TriangleFanDrawMode;
	export const LinearEncoding: O3JS.TextureEncoding = O3JS.LinearEncoding;
	export const sRGBEncoding: O3JS.TextureEncoding = O3JS.sRGBEncoding;
	export const GammaEncoding: O3JS.TextureEncoding = O3JS.GammaEncoding;
	export const RGBEEncoding: O3JS.TextureEncoding = O3JS.RGBEEncoding;
	// export const LogLuvEncoding: O3JS.TextureEncoding = O3JS.LogLuvEncoding;
	export const RGBM7Encoding: O3JS.TextureEncoding = O3JS.RGBM7Encoding;
	export const RGBM16Encoding: O3JS.TextureEncoding = O3JS.RGBM16Encoding;
	export const RGBDEncoding: O3JS.TextureEncoding = O3JS.RGBDEncoding;
	export const BasicDepthPacking: O3JS.DepthPackingStrategies =
		O3JS.BasicDepthPacking;
	export const RGBADepthPacking: O3JS.DepthPackingStrategies =
		O3JS.RGBADepthPacking;
	export const TangentSpaceNormalMap: O3JS.NormalMapTypes =
		O3JS.TangentSpaceNormalMap;
	export const ObjectSpaceNormalMap: O3JS.NormalMapTypes =
		O3JS.ObjectSpaceNormalMap;
	export const ZeroStencilOp: O3JS.StencilOp = O3JS.ZeroStencilOp;
	export const KeepStencilOp: O3JS.StencilOp = O3JS.KeepStencilOp;
	export const ReplaceStencilOp: O3JS.StencilOp = O3JS.ReplaceStencilOp;
	export const IncrementStencilOp: O3JS.StencilOp = O3JS.IncrementStencilOp;
	export const DecrementStencilOp: O3JS.StencilOp = O3JS.DecrementStencilOp;
	export const IncrementWrapStencilOp: O3JS.StencilOp =
		O3JS.IncrementWrapStencilOp;
	export const DecrementWrapStencilOp: O3JS.StencilOp =
		O3JS.DecrementWrapStencilOp;
	export const InvertStencilOp: O3JS.StencilOp = O3JS.InvertStencilOp;
	export const NeverStencilFunc: O3JS.StencilFunc = O3JS.NeverStencilFunc;
	export const LessStencilFunc: O3JS.StencilFunc = O3JS.LessStencilFunc;
	export const EqualStencilFunc: O3JS.StencilFunc = O3JS.EqualStencilFunc;
	export const LessEqualStencilFunc: O3JS.StencilFunc =
		O3JS.LessEqualStencilFunc;
	export const GreaterStencilFunc: O3JS.StencilFunc = O3JS.GreaterStencilFunc;
	export const NotEqualStencilFunc: O3JS.StencilFunc = O3JS.NotEqualStencilFunc;
	export const GreaterEqualStencilFunc: O3JS.StencilFunc =
		O3JS.GreaterEqualStencilFunc;
	export const AlwaysStencilFunc: O3JS.StencilFunc = O3JS.AlwaysStencilFunc;
	export const StaticDrawUsage: O3JS.Usage = O3JS.StaticDrawUsage;
	export const DynamicDrawUsage: O3JS.Usage = O3JS.DynamicDrawUsage;
	export const StreamDrawUsage: O3JS.Usage = O3JS.StreamDrawUsage;
	export const StaticReadUsage: O3JS.Usage = O3JS.StaticReadUsage;
	export const DynamicReadUsage: O3JS.Usage = O3JS.DynamicReadUsage;
	export const StreamReadUsage: O3JS.Usage = O3JS.StreamReadUsage;
	export const StaticCopyUsage: O3JS.Usage = O3JS.StaticCopyUsage;
	export const DynamicCopyUsage: O3JS.Usage = O3JS.DynamicCopyUsage;
	export const StreamCopyUsage: O3JS.Usage = O3JS.StreamCopyUsage;
	export const GLSL1: O3JS.GLSLVersion = O3JS.GLSL1;
	export const GLSL3: O3JS.GLSLVersion = O3JS.GLSL3;
}
