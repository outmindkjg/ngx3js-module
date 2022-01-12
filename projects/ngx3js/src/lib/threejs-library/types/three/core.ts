import { AnimationClip } from './animation';
import { Camera } from './cameras';
import { BuiltinShaderAttributeName, Usage } from './constants';
import { Material } from './materials';
import { Box3, Euler, Matrix, Matrix3, Matrix4, Quaternion, Ray, Sphere, Vector2, Vector3 } from './math';
import { Group } from './objects';
import { WebGLRenderer } from './renderers';
import { Scene } from './scenes';

/**
 * This class stores data for an attribute (such as vertex positions, face indices, normals, colors, UVs, and any custom attributes ) associated with a [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry), which allows for more efficient passing of data to the GPU. See that page for details and a usage example., cata is stored as vectors of any length (defined by [itemSize](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.itemSize)), and in general in the methods outlined below if passing in an index, this is automatically multiplied by the vector length.
 */
export interface BufferAttribute {
	/**
	 * @param array Must be a [TypedArray](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/TypedArray). Used to instantiate the buffer. This array should have itemSize * numVertices
	 * @param itemSize The number of values of the array that should be associated with a particular vertex. For instance, if this attribute is storing a 3-component vector (such as a position, normal, or color), then itemSize should be 3.
	 * @param normalized Applies to integer data only. Indicates how the underlying data in the buffer maps to the values in the GLSL code. For instance, if [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TypedArray) is an instance of UInt16Array, and [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is true, the values 0 - +65535 in the array  data will be mapped to 0.0f - +1.0f in the GLSL attribute. An Int16Array (signed) would map  from -32767 - +32767  to -1.0f - +1.0f. If [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is false, the values  will be converted to floats unmodified, i.e. 32767 becomes 32767.0f.
	 */
	new (array: Iterable<number> | ArrayLike<number> | number, itemSize: number, normalized?: boolean): this; // array parameter should be TypedArray.

	/**
	 * Optional name for this attribute instance. Default is an empty string.
	 * @default ''
	 */
	name: string;

	/**
	 * The [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TypedArray) holding data stored in the buffer.
	 */
	array: ArrayLike<number>;

	/**
	 * The length of vectors that are being stored in the [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.array).
	 */
	itemSize: number;

	/**
	 * Defines the intended usage pattern of the data store for optimization purposes. Corresponds to the *usage* parameter of [WebGLRenderingContext.bufferData](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData)().
	 * Default is [StaticDrawUsage](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttributeUsage). See usage [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttributeUsage) for all possible values.
	 * @default THREE.StaticDrawUsage
	 */
	usage: Usage;

	/**
	 * Object containing:
	 * @param offset Default is *0*. Position at which to start update.
	 * @param count Default is *-1*, which means don't use update ranges.
	 * This can be used to only update some components of stored vectors (for example, just the component related to color).
	 * @default { offset: number; count: number }
	 */
	updateRange: { offset: number; count: number };

	/**
	 * A version number, incremented every time the [needsUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.needsUpdate) property is set to true.
	 * @default 0
	 */
	version: number;

	/**
	 * Indicates how the underlying data in the buffer maps to the values in the GLSL shader code.
	 * See the constructor above for details.
	 * @default false
	 */
	normalized: boolean;

	/**
	 * Stores the [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.array)'s length divided by the [itemSize](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.itemSize).
	 * If the buffer is storing a 3-component vector (such as a position, normal, or color), then this will count the number of such vectors stored.
	 * @default 0
	 */
	count: number;

	/**
	 * Flag to indicate that this attribute has changed and should be re-sent to the GPU.
	 * Set this to true when you modify the value of the array.
	 * Setting this to true also increments the [version](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.version).
	 */
	set needsUpdate(value: boolean);

	readonly isBufferAttribute: true;

	/**
	 * A callback function that is executed after the Renderer has transferred the attribute array data to the GPU.
	 */
	onUploadCallback: () => void;

	/**
	 * Sets the value of the onUploadCallback property.
	 * In the [WebGL / Buffergeometry](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry) this is used to free memory after the buffer has been	transferred to the GPU.
	 */
	onUpload(callback: () => void): this;

	/**
	 * Set [usage](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.usage) to value. See usage [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttributeUsage) for all possible input values.
	 */
	setUsage(usage: Usage): this;

	/**
	 * @returns Return a copy of this bufferAttribute.
	 */
	clone(): this;

	/**
	 * Copies another BufferAttribute to this BufferAttribute.
	 */
	copy(source: BufferAttribute): this;

	/**
	 * Copy a vector from bufferAttribute[index2] to [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.array)[index1].
	 */
	copyAt(index1: number, attribute: BufferAttribute, index2: number): this;

	/**
	 * Copy the array given here (which can be a normal array or TypedArray) into [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.array).
	 * See [TypedArray.set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set) for notes on requirements if copying a TypedArray.
	 */
	copyArray(array: ArrayLike<number>): this;

	/**
	 * Copy an array representing RGB color values into [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.array).
	 */
	copyColorsArray(colors: Array<{ r: number; g: number; b: number }>): this;

	/**
	 * Copy an array representing [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2)s into [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.array).
	 */
	copyVector2sArray(vectors: Array<{ x: number; y: number }>): this;

	/**
	 * Copy an array representing [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3)s into [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.array).
	 */
	copyVector3sArray(vectors: Array<{ x: number; y: number; z: number }>): this;

	/**
	 * Copy an array representing [Vector4](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4)s into [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.array).
	 */
	copyVector4sArray(vectors: Array<{ x: number; y: number; z: number; w: number }>): this;

	/**
	 * Applies matrix [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3) to every Vector3 element of this BufferAttribute.
	 */
	applyMatrix3(m: Matrix3): this;

	/**
	 * Applies matrix [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) to every Vector3 element of this BufferAttribute.
	 */
	applyMatrix4(m: Matrix4): this;

	/**
	 * Applies normal matrix [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3) to every Vector3 element of this BufferAttribute.
	 */
	applyNormalMatrix(m: Matrix3): this;

	/**
	 * Applies matrix [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) to every Vector3 element of this BufferAttribute, interpreting the elements as a direction vectors.
	 */
	transformDirection(m: Matrix4): this;

	/**
	 * Calls [TypedArray.set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set)( [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array), [offset](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) ) on the [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.array).
	 * In particular, see that page for requirements on [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) being a [TypedArray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TypedArray).
	 *
	 * @param value An [Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) or [TypedArray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TypedArray) from which to copy values.
	 * @param offset index of the [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.array) at which to start copying.
	 */
	set(value: ArrayLike<number> | ArrayBufferView, offset?: number): this;

	/**
	 * @returns Returns the x component of the vector at the given index.
	 */
	getX(index: number): number;

	/**
	 * Sets the x component of the vector at the given index.
	 */
	setX(index: number, x: number): this;

	/**
	 * @returns Returns the y component of the vector at the given index.
	 */
	getY(index: number): number;

	/**
	 * Sets the y component of the vector at the given index.
	 */
	setY(index: number, y: number): this;

	/**
	 * @returns Returns the z component of the vector at the given index.
	 */
	getZ(index: number): number;

	/**
	 * Sets the z component of the vector at the given index.
	 */
	setZ(index: number, z: number): this;

	/**
	 * @returns Returns the w component of the vector at the given index.
	 */
	getW(index: number): number;

	/**
	 * Sets the w component of the vector at the given index.
	 */
	setW(index: number, z: number): this;

	/**
	 * Sets the x and y components of the vector at the given index.
	 */
	setXY(index: number, x: number, y: number): this;

	/**
	 * Sets the x, y and z components of the vector at the given index.
	 */
	setXYZ(index: number, x: number, y: number, z: number): this;

	/**
	 * Sets the x, y, z and w components of the vector at the given index.
	 */
	setXYZW(index: number, x: number, y: number, z: number, w: number): this;

	/**
	 */
	toJSON(): {
		itemSize: number;
		type: string;
		array: number[];
		normalized: boolean;
	};
}

/**
 * Int8 buffer attribute
 */
export interface Int8BufferAttribute extends BufferAttribute {
	/**
	 * @param array Must be a [TypedArray](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/TypedArray). Used to instantiate the buffer. This array should have itemSize * numVertices
	 * @param itemSize The number of values of the array that should be associated with a particular vertex. For instance, if this attribute is storing a 3-component vector (such as a position, normal, or color), then itemSize should be 3.
	 * @param normalized Applies to integer data only. Indicates how the underlying data in the buffer maps to the values in the GLSL code. For instance, if [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TypedArray) is an instance of UInt16Array, and [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is true, the values 0 - +65535 in the array  data will be mapped to 0.0f - +1.0f in the GLSL attribute. An Int16Array (signed) would map  from -32767 - +32767  to -1.0f - +1.0f. If [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is false, the values  will be converted to floats unmodified, i.e. 32767 becomes 32767.0f.
	 */
	new (array: Iterable<number> | ArrayLike<number> | number, itemSize: number, normalized?: boolean): this; // array parameter should be TypedArray.
}

/**
 * Uint8 buffer attribute
 */
export interface Uint8BufferAttribute extends BufferAttribute {
	/**
	 * @param array Must be a [TypedArray](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/TypedArray). Used to instantiate the buffer. This array should have itemSize * numVertices
	 * @param itemSize The number of values of the array that should be associated with a particular vertex. For instance, if this attribute is storing a 3-component vector (such as a position, normal, or color), then itemSize should be 3.
	 * @param normalized Applies to integer data only. Indicates how the underlying data in the buffer maps to the values in the GLSL code. For instance, if [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TypedArray) is an instance of UInt16Array, and [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is true, the values 0 - +65535 in the array  data will be mapped to 0.0f - +1.0f in the GLSL attribute. An Int16Array (signed) would map  from -32767 - +32767  to -1.0f - +1.0f. If [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is false, the values  will be converted to floats unmodified, i.e. 32767 becomes 32767.0f.
	 */
	new (array: Iterable<number> | ArrayLike<number> | number, itemSize: number, normalized?: boolean): this; // array parameter should be TypedArray.
}

/**
 * Uint8 clamped buffer attribute
 */
export interface Uint8ClampedBufferAttribute extends BufferAttribute {
	/**
	 * @param array Must be a [TypedArray](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/TypedArray). Used to instantiate the buffer. This array should have itemSize * numVertices
	 * @param itemSize The number of values of the array that should be associated with a particular vertex. For instance, if this attribute is storing a 3-component vector (such as a position, normal, or color), then itemSize should be 3.
	 * @param normalized Applies to integer data only. Indicates how the underlying data in the buffer maps to the values in the GLSL code. For instance, if [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TypedArray) is an instance of UInt16Array, and [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is true, the values 0 - +65535 in the array  data will be mapped to 0.0f - +1.0f in the GLSL attribute. An Int16Array (signed) would map  from -32767 - +32767  to -1.0f - +1.0f. If [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is false, the values  will be converted to floats unmodified, i.e. 32767 becomes 32767.0f.
	 */
	new (array: Iterable<number> | ArrayLike<number> | number, itemSize: number, normalized?: boolean): this; // array parameter should be TypedArray.
}

/**
 * Int16 buffer attribute
 */
export interface Int16BufferAttribute extends BufferAttribute {
	/**
	 * @param array Must be a [TypedArray](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/TypedArray). Used to instantiate the buffer. This array should have itemSize * numVertices
	 * @param itemSize The number of values of the array that should be associated with a particular vertex. For instance, if this attribute is storing a 3-component vector (such as a position, normal, or color), then itemSize should be 3.
	 * @param normalized Applies to integer data only. Indicates how the underlying data in the buffer maps to the values in the GLSL code. For instance, if [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TypedArray) is an instance of UInt16Array, and [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is true, the values 0 - +65535 in the array  data will be mapped to 0.0f - +1.0f in the GLSL attribute. An Int16Array (signed) would map  from -32767 - +32767  to -1.0f - +1.0f. If [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is false, the values  will be converted to floats unmodified, i.e. 32767 becomes 32767.0f.
	 */
	new (array: Iterable<number> | ArrayLike<number> | number, itemSize: number, normalized?: boolean): this; // array parameter should be TypedArray.
}

/**
 * Uint16 buffer attribute
 */
export interface Uint16BufferAttribute extends BufferAttribute {
	/**
	 * @param array Must be a [TypedArray](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/TypedArray). Used to instantiate the buffer. This array should have itemSize * numVertices
	 * @param itemSize The number of values of the array that should be associated with a particular vertex. For instance, if this attribute is storing a 3-component vector (such as a position, normal, or color), then itemSize should be 3.
	 * @param normalized Applies to integer data only. Indicates how the underlying data in the buffer maps to the values in the GLSL code. For instance, if [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TypedArray) is an instance of UInt16Array, and [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is true, the values 0 - +65535 in the array  data will be mapped to 0.0f - +1.0f in the GLSL attribute. An Int16Array (signed) would map  from -32767 - +32767  to -1.0f - +1.0f. If [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is false, the values  will be converted to floats unmodified, i.e. 32767 becomes 32767.0f.
	 */
	new (array: Iterable<number> | ArrayLike<number> | number, itemSize: number, normalized?: boolean): this; // array parameter should be TypedArray.
}

/**
 * Int32 buffer attribute
 */
export interface Int32BufferAttribute extends BufferAttribute {
	/**
	 * @param array Must be a [TypedArray](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/TypedArray). Used to instantiate the buffer. This array should have itemSize * numVertices
	 * @param itemSize The number of values of the array that should be associated with a particular vertex. For instance, if this attribute is storing a 3-component vector (such as a position, normal, or color), then itemSize should be 3.
	 * @param normalized Applies to integer data only. Indicates how the underlying data in the buffer maps to the values in the GLSL code. For instance, if [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TypedArray) is an instance of UInt16Array, and [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is true, the values 0 - +65535 in the array  data will be mapped to 0.0f - +1.0f in the GLSL attribute. An Int16Array (signed) would map  from -32767 - +32767  to -1.0f - +1.0f. If [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is false, the values  will be converted to floats unmodified, i.e. 32767 becomes 32767.0f.
	 */
	new (array: Iterable<number> | ArrayLike<number> | number, itemSize: number, normalized?: boolean): this; // array parameter should be TypedArray.
}

/**
 * Uint32 buffer attribute
 */
export interface Uint32BufferAttribute extends BufferAttribute {
	/**
	 * @param array Must be a [TypedArray](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/TypedArray). Used to instantiate the buffer. This array should have itemSize * numVertices
	 * @param itemSize The number of values of the array that should be associated with a particular vertex. For instance, if this attribute is storing a 3-component vector (such as a position, normal, or color), then itemSize should be 3.
	 * @param normalized Applies to integer data only. Indicates how the underlying data in the buffer maps to the values in the GLSL code. For instance, if [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TypedArray) is an instance of UInt16Array, and [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is true, the values 0 - +65535 in the array  data will be mapped to 0.0f - +1.0f in the GLSL attribute. An Int16Array (signed) would map  from -32767 - +32767  to -1.0f - +1.0f. If [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is false, the values  will be converted to floats unmodified, i.e. 32767 becomes 32767.0f.
	 */
	new (array: Iterable<number> | ArrayLike<number> | number, itemSize: number, normalized?: boolean): this; // array parameter should be TypedArray.
}

/**
 * Float16 buffer attribute
 */
export interface Float16BufferAttribute extends BufferAttribute {
	/**
	 * @param array Must be a [TypedArray](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/TypedArray). Used to instantiate the buffer. This array should have itemSize * numVertices
	 * @param itemSize The number of values of the array that should be associated with a particular vertex. For instance, if this attribute is storing a 3-component vector (such as a position, normal, or color), then itemSize should be 3.
	 * @param normalized Applies to integer data only. Indicates how the underlying data in the buffer maps to the values in the GLSL code. For instance, if [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TypedArray) is an instance of UInt16Array, and [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is true, the values 0 - +65535 in the array  data will be mapped to 0.0f - +1.0f in the GLSL attribute. An Int16Array (signed) would map  from -32767 - +32767  to -1.0f - +1.0f. If [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is false, the values  will be converted to floats unmodified, i.e. 32767 becomes 32767.0f.
	 */
	new (array: Iterable<number> | ArrayLike<number> | number, itemSize: number, normalized?: boolean): this; // array parameter should be TypedArray.
}

/**
 * Float32 buffer attribute
 */
export interface Float32BufferAttribute extends BufferAttribute {
	/**
	 * @param array Must be a [TypedArray](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/TypedArray). Used to instantiate the buffer. This array should have itemSize * numVertices
	 * @param itemSize The number of values of the array that should be associated with a particular vertex. For instance, if this attribute is storing a 3-component vector (such as a position, normal, or color), then itemSize should be 3.
	 * @param normalized Applies to integer data only. Indicates how the underlying data in the buffer maps to the values in the GLSL code. For instance, if [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TypedArray) is an instance of UInt16Array, and [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is true, the values 0 - +65535 in the array  data will be mapped to 0.0f - +1.0f in the GLSL attribute. An Int16Array (signed) would map  from -32767 - +32767  to -1.0f - +1.0f. If [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is false, the values  will be converted to floats unmodified, i.e. 32767 becomes 32767.0f.
	 */
	new (array: Iterable<number> | ArrayLike<number> | number, itemSize: number, normalized?: boolean): this; // array parameter should be TypedArray.
}

/**
 * Float64 buffer attribute
 */
export interface Float64BufferAttribute extends BufferAttribute {
	/**
	 * @param array Must be a [TypedArray](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/TypedArray). Used to instantiate the buffer. This array should have itemSize * numVertices
	 * @param itemSize The number of values of the array that should be associated with a particular vertex. For instance, if this attribute is storing a 3-component vector (such as a position, normal, or color), then itemSize should be 3.
	 * @param normalized Applies to integer data only. Indicates how the underlying data in the buffer maps to the values in the GLSL code. For instance, if [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TypedArray) is an instance of UInt16Array, and [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is true, the values 0 - +65535 in the array  data will be mapped to 0.0f - +1.0f in the GLSL attribute. An Int16Array (signed) would map  from -32767 - +32767  to -1.0f - +1.0f. If [normalized](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is false, the values  will be converted to floats unmodified, i.e. 32767 becomes 32767.0f.
	 */
	new (array: Iterable<number> | ArrayLike<number> | number, itemSize: number, normalized?: boolean): this; // array parameter should be TypedArray.
}

/**
 * A representation of mesh, line, or point geometry. Includes vertex positions, face indices, normals, colors, UVs, and custom attributes within buffers, reducing the cost of passing all this data to the GPU.
 * To read and edit data in BufferGeometry attributes, see [BufferAttribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute) documentation.
 *
 * ### Examples
 * [Mesh with non-indexed faces](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry) |
 * [Mesh with indexed faces](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_indexed) |
 * [Lines](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_lines) |
 * [Indexed Lines](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_lines_indexed) |
 * [Particles](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_custom_attributes_particles) |
 * [Raw Shaders](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_rawshader)
 *
 * ### Code Example
 * 
 * ```js
 * const geometry = new THREE.BufferGeometry();
 * //  create a simple square shape. We duplicate the top left and bottom right // vertices because each vertex needs to appear once per triangle.
 * const vertices = new Float32Array( [
 *  -1.0, -1.0,  1.0,
 *   1.0, -1.0,  1.0,
 *   1.0,  1.0,  1.0,
 *   1.0,  1.0,  1.0,
 *  -1.0,  1.0,  1.0,
 *  -1.0, -1.0,  1.0
 * ] );
 * //  itemSize = 3 because there are 3 values (components) per vertex
 * geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
 * const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
 * const mesh = new THREE.Mesh( geometry, material );
 * ```
 */
export interface BufferGeometry extends EventDispatcher {
	/**
	 * This creates a new BufferGeometry. It also sets several properties to an default value.
	 */
	new (): this;

	MaxIndex: number;

	/**
	 * Unique number for this bufferGeometry instance.
	 */
	id: number;

	/**
	 * [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier) of this object instance.
	 * This gets automatically assigned and shouldn't be edited.
	 */
	uuid: string;

	/**
	 * Optional name for this bufferGeometry instance. Default is an empty string.
	 * @default ''
	 */
	name: string;

	/**
	 * @default 'BufferGeometry'
	 */
	type: string;

	/**
	 * Allows for vertices to be re-used across multiple triangles; this is called using "indexed triangles".
	 * Each triangle is associated with the indices of three vertices. This attribute therefore stores the index of each vertex for each triangular face.
	 * If this attribute is not set, the [renderer](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) assumes that each three contiguous positions represent a single triangle.
	 * Default is *null*.
	 * @default null
	 */
	index: BufferAttribute | null;

	/**
	 * An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
	 */
	parameters?: any;

	/**
	 * This hashmap has as id the name of the attribute to be set and as value the [buffer](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute) to set it to.
	 * Rather than accessing this property directly, use *.setAttribute* and *.getAttribute* to access attributes of this geometry.
	 * @default {}
	 */
	attributes: {
		[name: string]: BufferAttribute | InterleavedBufferAttribute;
	};

	/**
	 * Hashmap of [BufferAttribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute)s holding details of the geometry's morph targets.
	 * @default {}
	 */
	morphAttributes: {
		[name: string]: Array<BufferAttribute | InterleavedBufferAttribute>;
	};

	/**
	 * Used to control the morph target behavior; when set to true, the morph target data is treated as relative offsets, rather than as absolute positions/normals.
	 * Default is *false*.
	 * @default false
	 */
	morphTargetsRelative: boolean;

	/**
	 * Split the geometry into groups, each of which will be rendered in a separate WebGL draw call.
	 * This allows an array of materials to be used with the bufferGeometry.
	 * Each group is an object of the form: { start: Integer, count: Integer, materialIndex: Integer } where start specifies the first element in this draw call – the first vertex for non-indexed geometry, otherwise the first triangle index. Count specifies how many vertices (or indices) are included, and materialIndex specifies the material array index to use.
	 * Use *.addGroup* to add groups, rather than modifying this array directly.
	 * @default []
	 */
	groups: Array<{ start: number; count: number; materialIndex?: number | undefined }>;

	/**
	 * Bounding box for the bufferGeometry, which can be calculated with *.computeBoundingBox*(). Default is *null*.
	 * @default null
	 */
	boundingBox: Box3 | null;

	/**
	 * Bounding sphere for the bufferGeometry, which can be calculated with *.computeBoundingSphere*(). Default is *null*.
	 * @default null
	 */
	boundingSphere: Sphere | null;

	/**
	 * Determines the part of the geometry to render. This should not be set directly, instead use *.setDrawRange*. Default is { start: 0, count: Infinity }
	 * For non-indexed BufferGeometry, count is the number of vertices to render.
	 * For indexed BufferGeometry, count is the number of indices to render.
	 * @default { start: 0, count: Infinity }
	 */
	drawRange: { start: number; count: number };

	/**
	 * An object that can be used to store custom data about the BufferGeometry. It should not hold references to functions as these will not be cloned.
	 * @default {}
	 */
	userData: { [key: string]: any };
	readonly isBufferGeometry: true;

	/**
	 * @returns Return the *.index* buffer.
	 */
	getIndex(): BufferAttribute | null;

	/**
	 * Set the *.index* buffer.
	 */
	setIndex(index: BufferAttribute | number[] | null): BufferGeometry;

	/**
	 * Sets an attribute to this geometry. Use this rather than the attributes property, because an internal hashmap of *.attributes* is maintained to speed up iterating over attributes.
	 * @param name
	 * @param attribute
	 */
	setAttribute(
		name: BuiltinShaderAttributeName | (string & {}),
		attribute: BufferAttribute | InterleavedBufferAttribute
	): BufferGeometry;

	/**
	 * @returns Returns the [attribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute) with the specified name.
	 */
	getAttribute(name: BuiltinShaderAttributeName | (string & {})): BufferAttribute | InterleavedBufferAttribute;

	/**
	 * Deletes the [attribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute) with the specified name.
	 */
	deleteAttribute(name: BuiltinShaderAttributeName | (string & {})): BufferGeometry;

	/**
	 * @returns Returns *true* if the attribute with the specified name exists.
	 */
	hasAttribute(name: BuiltinShaderAttributeName | (string & {})): boolean;

	/**
	 * Adds a group to this geometry; see the [groups](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry.groups) property for details.
	 */
	addGroup(start: number, count: number, materialIndex?: number): void;

	/**
	 * Clears all groups.
	 */
	clearGroups(): void;

	/**
	 * Set the *.drawRange* property. For non-indexed BufferGeometry, count is the number of vertices to render.
	 * For indexed BufferGeometry, count is the number of indices to render.
	 */
	setDrawRange(start: number, count: number): void;

	/**
	 * Applies the matrix transform to the geometry.
	 */
	applyMatrix4(matrix: Matrix4): BufferGeometry;

	/**
	 * Applies the rotation represented by the quaternion to the geometry.
	 */
	applyQuaternion(q: Quaternion): BufferGeometry;

	/**
	 * Rotate the geometry about the X axis. This is typically done as a one time operation, and not during a loop.
	 * Use [Object3D.rotation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.rotation) for typical real-time mesh rotation.
	 */
	rotateX(angle: number): BufferGeometry;

	/**
	 * Rotate the geometry about the Y axis. This is typically done as a one time operation, and not during a loop.
	 * Use [Object3D.rotation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.rotation) for typical real-time mesh rotation.
	 */
	rotateY(angle: number): BufferGeometry;

	/**
	 * Rotate the geometry about the Z axis. This is typically done as a one time operation, and not during a loop.
	 * Use [Object3D.rotation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.rotation) for typical real-time mesh rotation.
	 */
	rotateZ(angle: number): BufferGeometry;

	/**
	 * Translate the geometry. This is typically done as a one time operation, and not during a loop.
	 * Use [Object3D.position](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.position) for typical real-time mesh translation.
	 */
	translate(x: number, y: number, z: number): BufferGeometry;

	/**
	 * Scale the geometry data. This is typically done as a one time operation, and not during a loop.
	 * Use [Object3D.scale](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.scale) for typical real-time mesh scaling.
	 */
	scale(x: number, y: number, z: number): BufferGeometry;

	/**
	 * Rotates the geometry to face a point in space. This is typically done as a one time operation, and not during a loop.
	 * Use [Object3D.lookAt](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.lookAt) for typical real-time mesh usage.
	 * @param vector A world vector to look at.
	 */
	lookAt(v: Vector3): void;

	/**
	 * Center the geometry based on the bounding box.
	 */
	center(): BufferGeometry;

	/**
	 * Sets the attributes for this BufferGeometry from an array of points.
	 */
	setFromPoints(points: Vector3[] | Vector2[]): BufferGeometry;

	/**
	 * Computes bounding box of the geometry, updating *.boundingBox* attribute.
	 * Bounding boxes aren't computed by default. They need to be explicitly computed, otherwise they are *null*.
	 */
	computeBoundingBox(): void;

	/**
	 * Computes bounding sphere of the geometry, updating *.boundingSphere* attribute.
	 * Bounding spheres aren't computed by default. They need to be explicitly computed, otherwise they are *null*.
	 */
	computeBoundingSphere(): void;

	/**
	 * Calculates and adds a tangent attribute to this geometry.
	 * The computation is only supported for indexed geometries and if position, normal, and uv attributes are defined.
	 */
	computeTangents(): void;

	/**
	 * Computes vertex normals by averaging face normals.
	 */
	computeVertexNormals(): void;

	/**
	 * Merge in another BufferGeometry with an optional offset of where to start merging in.
	 */
	merge(geometry: BufferGeometry, offset?: number): BufferGeometry;

	/**
	 * Every normal vector in a geometry will have a magnitude of 1.
	 * This will correct lighting on the geometry surfaces.

     */
	normalizeNormals(): void;

	/**
	 * @returns Return a non-index version of an indexed BufferGeometry.
	 */
	toNonIndexed(): BufferGeometry;

	/**
	 * Convert the buffer geometry to three.js [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4).
	 */
	toJSON(): any;

	/**
	 * Creates a clone of this BufferGeometry.
	 */
	clone(): BufferGeometry;

	/**
	 * Copies another BufferGeometry to this BufferGeometry.
	 */
	copy(source: BufferGeometry): this;

	/**
	 * Disposes the object from memory.
	 * You need to call this when you want the BufferGeometry removed while the application is running.
	 */
	dispose(): void;

	/**
	 *
	 * @param name
	 * @param array
	 * @param itemSize
	 * @returns attribute
	 */
	addAttribute(name: any, array: any, itemSize: any): any;
}

/**
 * Object for keeping track of time. This uses [performance.now](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)
 * if it is available, otherwise it reverts to the less accurate [Date.now](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now).
 */
export interface Clock {
	/**
	 * @param autoStart whether to automatically start the clock. Default is true.
	 */
	new (autoStart?: boolean): this;

	/**
	 * If set, starts the clock automatically when the first update is called. Default is true.
	 * @default true
	 */
	autoStart: boolean;

	/**
	 * Holds the time at which the clock's [start](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.start) method was last called.
	 * @default 0
	 */
	startTime: number;

	/**
	 * Holds the time at which the clock's [start](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.start), [getElapsedTime](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.getElapsedTime) or [getDelta](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.getDelta) methods were last called.
	 * @default 0
	 */
	oldTime: number;

	/**
	 * Keeps track of the total time that the clock has been running.
	 * @default 0
	 */
	elapsedTime: number;

	/**
	 * Whether the clock is running or not.
	 * @default false
	 */
	running: boolean;

	/**
	 * Starts clock. Also sets the [startTime](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.startTime) and [oldTime](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.oldTime) to the current time, sets [elapsedTime](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.elapsedTime) to *0* and [running](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.running) to *true*.
	 */
	start(): void;

	/**
	 * Stops clock and sets [oldTime](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.oldTime) to the current time.
	 */
	stop(): void;

	/**
	 * Get the seconds passed since the clock started and sets [oldTime](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.oldTime) to the current time.
	 * If [autoStart](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.autoStart) is *true* and the clock is not running, also starts the clock.
	 */
	getElapsedTime(): number;

	/**
	 * Get the seconds passed since the time [oldTime](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.oldTime) was set and sets [oldTime](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.oldTime) to the current time.
	 * If [autoStart](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.autoStart) is *true* and the clock is not running, also starts the clock.
	 */
	getDelta(): number;
}

export interface BaseEvent {
	type: string;
}

/**
 * Event object.
 */
export interface Event extends BaseEvent {
	target?: any;
	[attachment: string]: any;
}
export type EventListener<E, T, U> = (event: E & { type: T } & { target: U }) => void;

/**
 * JavaScript events for custom objects.
 * [Eventdispatcher on GitHub](https://github.com/mrdoob/eventdispatcher.js)
 *
 * ### Code Example
 * 
 * ```js
 * //  Adding events to a custom object
 * class Car extends EventDispatcher {
 * 	start() {
 * 		this.dispatchEvent( { type: 'start', message: 'vroom vroom!' } );
 * 	}
 * };
 * //  Using events with the custom object
 * const car = new Car();
 * car.addEventListener( 'start', function ( event ) {
 * 	alert( event.message );
 * });
 * car.start();
 * ```
 */
export interface EventDispatcher<E extends BaseEvent = Event> {
	/**
	 * Creates eventDispatcher object. It needs to be call with '.call' to add the functionality to an object.
	 */
	new (): this;

	/**
	 * Adds a listener to an event type.
	 * @param type The type of event to listen to.
	 * @param listener The that gets called when the event is fired.
	 */
	addEventListener<T extends E['type']>(type: T, listener: EventListener<E, T, this>): void;

	/**
	 * Checks if listener is added to an event type.
	 * @param type The type of event to listen to.
	 * @param listener The that gets called when the event is fired.
	 */
	hasEventListener<T extends E['type']>(type: T, listener: EventListener<E, T, this>): boolean;

	/**
	 * Removes a listener from an event type.
	 * @param type The type of the listener that gets removed.
	 * @param listener The listener that gets removed.
	 */
	removeEventListener<T extends E['type']>(type: T, listener: EventListener<E, T, this>): void;

	/**
	 * Fire an event type.
	 * @param type The type of event that gets fired.
	 */
	dispatchEvent(event: E): void;
}

/**
 * This buffer attribute class does not construct a VBO. Instead, it uses whatever VBO is passed in constructor and can later be altered via the *buffer* property.
 * It is required to pass additional params alongside the VBO. Those are:
 * the GL context, the GL data type, the number of components per vertex, the number of bytes per component, and the number of vertices.
 * The most common use case for this class is when some kind of GPGPU
 * calculation interferes or even produces the VBOs in question.
 */
export interface GLBufferAttribute {
	/**
	 *
	 * gl.FLOAT: 4
	 * gl.UNSIGNED_SHORT: 2
	 * gl.SHORT: 2
	 * gl.UNSIGNED_INT: 4
	 * gl.INT: 4
	 * gl.BYTE: 1
	 * gl.UNSIGNED_BYTE: 1
	 *
	 * @param buffer Must be a [WebGLBuffer](https://developer.mozilla.org/en-US/docs/Web/API/WebGLBuffer).
	 * @param type* - One of [WebGL Data Types](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants#Data_types).
	 * @param itemSize The number of values of the array that should be associated with a particular vertex. For instance, if this attribute is storing a 3-component vector (such as a position, normal, or color), then itemSize should be 3.
	 * @param elementSize 1, 2 or 4. The corresponding size (in bytes) for the given "type" param.
	 * @param count The expected number of vertices in VBO.
	 */
	new (buffer: WebGLBuffer, type: number, itemSize: number, elementSize: 1 | 2 | 4, count: number): this;

	/**
	 * The current [WebGLBuffer](https://developer.mozilla.org/en-US/docs/Web/API/WebGLBuffer) instance.
	 */
	buffer: WebGLBuffer;

	/**
	 * A [WebGL Data Type](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants#Data_types) describing the underlying VBO contents.
	 * Set this property together with *elementSize*. The recommended way is using the *setType* method.
	 */
	type: number;

	/**
	 * How many values make up each item (vertex).
	 */
	itemSize: number;

	/**
	 * Stores the corresponding size in bytes for the current *type* property value.
	 * See above (constructor) for a list of known type sizes.
	 */
	elementSize: 1 | 2 | 4;

	/**
	 * The expected number of vertices in VBO.
	 */
	count: number;

	/**
	 * A version number, incremented every time the needsUpdate property is set to true.
	 */
	version: number;

	/**
	 * Read-only. Always *true*.
	 */
	readonly isGLBufferAttribute: true;

	/**
	 * Default is *false*. Setting this to true increments [version](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/GLBufferAttribute.version).
	 * @param value
	 */
	set needsUpdate(value: boolean);

	/**
	 * Sets the *buffer* property.
	 */
	setBuffer(buffer: WebGLBuffer): this;

	/**
	 * Sets the both *type* and *elementSize* properties.
	 */
	setType(type: number, elementSize: 1 | 2 | 4): this;

	/**
	 * Sets the *itemSize* property.
	 */
	setItemSize(itemSize: number): this;

	/**
	 * Sets the *count* property.
	 */
	setCount(count: number): this;
}

/**
 * see [examples/jsm/utils/BufferGeometryUtils.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/utils/BufferGeometryUtils.js)
 */
export interface BufferGeometryUtils {
	/**
	 *
	 * @param geometries
	 * @returns buffer geometries
	 */
	mergeBufferGeometries(geometries: BufferGeometry[]): BufferGeometry;
	/**
	 * Calculates and adds a tangent attribute to this geometry.
	 * The computation is only supported for indexed geometries and if position, normal, and uv attributes are defined.
	 */
	computeTangents(geometry: BufferGeometry): null;

	/**
	 *
	 * @param attributes
	 * @returns buffer attributes
	 */
	mergeBufferAttributes(attributes: BufferAttribute[]): BufferAttribute;
}

/**
 * An instanced version of [BufferAttribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute).
 */
export interface InstancedBufferAttribute extends BufferAttribute {
	/**
	 *
	 * @param array
	 * @param itemSize
	 * @param normalized
	 * @param meshPerAttribute
	 */
	new (array: ArrayLike<number>, itemSize: number, normalized?: boolean, meshPerAttribute?: number): this;

	/**
	 * Defines how often a value of this buffer attribute should be repeated. A value of one means that each value of the instanced attribute is used for a single instance. A value of two means that each value is used for two consecutive instances (and so on). Default is *1*.
	 * @default 1
	 */
	meshPerAttribute: number;
}

/**
 * An instanced version of [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
 */
export interface InstancedBufferGeometry extends BufferGeometry {
	/**
	 *
	 */
	new (): this;

	/**
	 * @default 'InstancedBufferGeometry
	 */
	type: string;

	isInstancedBufferGeometry: boolean;

	groups: Array<{ start: number; count: number; instances: number }>;

	/**
	 * Default is *Infinity*.
	 * @default Infinity
	 */
	instanceCount: number;

	addGroup(start: number, count: number, instances: number): void;
}

/**
 * An instanced version of [InterleavedBuffer](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/InterleavedBuffer).
 */
export interface InstancedInterleavedBuffer extends InterleavedBuffer {
	/**
	 *
	 * @param array
	 * @param stride
	 * @param meshPerAttribute
	 */
	new (array: ArrayLike<number>, stride: number, meshPerAttribute?: number): this;

	/**
	 * Default is *1*.
	 * @default 1
	 */
	meshPerAttribute: number;
}

/**
 * "Interleaved" means that multiple attributes, possibly of different types, (e.g., position, normal, uv, color) are packed into a single array buffer.
 * An introduction into interleaved arrays can be found here: [Interleaved array basics](https://blog.tojicode.com/2011/05/interleaved-array-basics.html)
 *
 * ### Examples
 * [webgl / buffergeometry / points / interleaved](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_points_interleaved)
 */
export interface InterleavedBuffer {
	/**
	 * @param array A typed array with a shared buffer. Stores the geometry data.
	 * @param stride The number of typed-array elements per vertex.
	 */
	new (array: ArrayLike<number>, stride: number): this;

	/**
	 * A typed array with a shared buffer. Stores the geometry data.
	 */
	array: ArrayLike<number>;

	/**
	 * The number of typed-array elements per vertex.
	 */
	stride: number;

	/**
	 * Defines the intended usage pattern of the data store for optimization purposes. Corresponds to the *usage* parameter of [WebGLRenderingContext.bufferData](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData)().
	 * @default THREE.StaticDrawUsage
	 */
	usage: Usage;

	/**
	 * Object containing offset and count.
	 * @default { offset: number; count: number }
	 */
	updateRange: { offset: number; count: number };

	/**
	 * A version number, incremented every time the needsUpdate property is set to true.
	 *
	 * @default 0
	 */
	version: number;

	/**
	 *
	 */
	length: number;

	/**
	 * Gives the total number of elements in the array.
	 * @default 0
	 */
	count: number;

	/**
	 * Default is *false*. Setting this to true increments [version](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/InterleavedBuffer.version).
	 */
	needsUpdate: boolean;

	/**
	 * [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier) of this instance. This gets automatically assigned, so this shouldn't be edited.
	 */
	uuid: string;

	/**
	 * Set [usage](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/InterleavedBuffer.usage) to value.
	 */
	setUsage(usage: Usage): InterleavedBuffer;

	/**
	 * @param data This object holds shared array buffers required for properly cloning geometries with interleaved attributes.
	 * Creates a clone of this InterleavedBuffer.
	 */
	clone(data: object): InterleavedBuffer;

	/**
	 * Copies another InterleavedBuffer to this InterleavedBuffer.
	 */
	copy(source: InterleavedBuffer): this;

	/**
	 * Copies data from attribute[index2] to [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/InterleavedBuffer.array)[index1].
	 */
	copyAt(index1: number, attribute: InterleavedBufferAttribute, index2: number): InterleavedBuffer;

	/**
	 * Stores multiple values in the buffer, reading input values from a specified array.
	 * @param value The source (typed) array.
	 * @param offset The offset into the target array at which to begin writing values from the source array. Default is *0*.
	 */
	set(value: ArrayLike<number>, index: number): InterleavedBuffer;

	/**
	 * Serializes this InterleavedBuffer.
	 * @param data  This object holds shared array buffers required for properly serializing geometries with interleaved attributes.
	 */
	toJSON(data: object): {
		uuid: string;
		buffer: string;
		type: string;
		stride: number;
	};
}
/**
 * see [src/core/InterleavedBufferAttribute.js](https://github.com/mrdoob/three.js/blob/master/src/core/InterleavedBufferAttribute.js)
 */
export interface InterleavedBufferAttribute {
	/**
	 *
	 * @param interleavedBuffer
	 * @param itemSize
	 * @param offset
	 * @param normalized
	 */
	new (interleavedBuffer: InterleavedBuffer, itemSize: number, offset: number, normalized?: boolean): this;

	/**
	 * Optional name for this attribute instance. Default is an empty string.
	 * @default ''
	 */
	name: string;

	/**
	 * The [InterleavedBuffer](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/InterleavedBuffer) instance passed in the constructor.
	 */
	data: InterleavedBuffer;

	/**
	 * How many values make up each item.
	 */
	itemSize: number;

	/**
	 * The offset in the underlying array buffer where an item starts.
	 */
	offset: number;

	/**
	 * Default is *false*.
	 * @default false
	 */
	normalized: boolean;

	/**
	 * The value of [data](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/InterleavedBufferAttribute.data).count.
	 * If the buffer is storing a 3-component item (such as a position, normal, or color), then this will count the number of such items stored.
	 */
	get count(): number;

	/**
	 * The value of [data](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/InterleavedBufferAttribute.data).array.
	 */
	get array(): ArrayLike<number>;

	/**
	 * Default is *false*. Setting this to *true* will send the entire interleaved buffer (not just the specific attribute data) to the GPU again.
	 */
	set needsUpdate(value: boolean);

	/**
	 *
	 */
	readonly isInterleavedBufferAttribute: true;

	/**
	 * Applies matrix [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) to every Vector3 element of this InterleavedBufferAttribute.
	 */
	applyMatrix4(m: Matrix4): this;

	/**
	 *
	 */
	clone(data?: object): BufferAttribute;

	/**
	 * @returns Returns the x component of the item at the given index.
	 */
	getX(index: number): number;

	/**
	 * Sets the x component of the item at the given index.
	 */
	setX(index: number, x: number): this;

	/**
	 * @returns Returns the y component of the item at the given index.
	 */
	getY(index: number): number;

	/**
	 * Sets the y component of the item at the given index.
	 */
	setY(index: number, y: number): this;

	/**
	 * @returns Returns the z component of the item at the given index.
	 */
	getZ(index: number): number;

	/**
	 * Sets the z component of the item at the given index.
	 */
	setZ(index: number, z: number): this;

	/**
	 * @returns Returns the w component of the item at the given index.
	 */
	getW(index: number): number;

	/**
	 * Sets the w component of the item at the given index.
	 */
	setW(index: number, z: number): this;

	/**
	 * Sets the x and y components of the item at the given index.
	 */
	setXY(index: number, x: number, y: number): this;

	/**
	 * Sets the x, y and z components of the item at the given index.
	 */
	setXYZ(index: number, x: number, y: number, z: number): this;

	/**
	 * Sets the x, y, z and w components of the item at the given index.
	 */
	setXYZW(index: number, x: number, y: number, z: number, w: number): this;

	/**
	 *
	 */
	toJSON(data?: object): {
		isInterleavedBufferAttribute: true;
		itemSize: number;
		data: string;
		offset: number;
		normalized: boolean;
	};

	/**
	 * Applies normal matrix [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3) to every Vector3 element of this InterleavedBufferAttribute.
	 */
	applyNormalMatrix(matrix: Matrix): this;

	/**
	 * Applies matrix [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) to every Vector3 element of this InterleavedBufferAttribute, interpreting the elements as a direction vectors.
	 */
	transformDirection(matrix: Matrix): this;
}

/**
 * A [Layers](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Layers) object assigns an [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D) to 1 or more of 32 layers numbered 0 to 31 - internally the layers are stored as a [bit mask](https://en.wikipedia.org/wiki/Mask_(computing)), and by default all Object3Ds are a member of layer 0.
 * This can be used to control visibility - an object must share a layer with a [camera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Camera) to be visible when that camera's view is rendered.
 * All classes that inherit from [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D) have an [Object3D.layers](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.layers) property which is an instance of this class.
 *
 * ### Examples
 * [WebGL / layers](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_layers)
 */
export interface Layers {
	/**
	 * Create a new Layers object, with membership initially set to layer 0.
	 */
	new (): this;

	/**
	 * A bit mask storing which of the 32 layers this layers object is currently a member of.
	 */
	mask: number;

	/**
	 * Set membership to *layer*, and remove membership all other layers.
	 * @param channel an integer from 0 to 31.
	 */
	set(channel: number): void;

	/**
	 * Add membership of this *layer*.
	 * @param channel an integer from 0 to 31.
	 */
	enable(channel: number): void;

	/**
	 * Add membership to all layers.
	 */
	enableAll(): void;

	/**
	 * Toggle membership of *layer*.
	 * @param channel an integer from 0 to 31.
	 */
	toggle(channel: number): void;

	/**
	 * Remove membership of this *layer*.
	 * @param channel an integer from 0 to 31.
	 */
	disable(channel: number): void;

	/**
	 * Remove membership from all layers.
	 */
	disableAll(): void;

	/**
	 * @param layers A Layers object Returns true if this and the passed *layers* object have at least one layer in common.
	 */
	test(layers: Layers): boolean;

	/**
	 * @param channel an integer from 0 to 31.
	 * @returns Returns true if the given layer is enabled.
	 */
	isEnabled(channel: number): boolean;
}

/**
 * This is the base class for most objects in three.js and provides a set of properties and methods for manipulating objects in 3D space.
 * Note that this can be used for grouping objects via the *.add*( object ) method which adds the object as a child, however it is better to use [Group](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Group) for this.
 */
export interface Object3D<E extends BaseEvent = Event> extends EventDispatcher<E> {
	/**
	 * The constructor takes no arguments.
	 */
	new (): this;

	/**
	 * The BufferGeometry
	 */
	geometry?: BufferGeometry;

	/**
	 * The Material
	 */
	material?: Material | Material[];

	/**
	 * Unique number for this object instance.
	 * @readonly
	 */
	id: number;

	/**
	 * [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier) of this object instance.
	 * This gets automatically assigned, so this shouldn't be edited.
	 */
	uuid: string;

	/**
	 * Optional name of the object (doesn't need to be unique). Default is an empty string.
	 * @default ''
	 */
	name: string;

	/**
	 * @default 'Object3D'
	 */
	type: string;

	/**
	 * Object's parent in the [scene graph](https://en.wikipedia.org/wiki/Scene_graph). An object can have at most one parent.
	 * @default null
	 */
	parent: Object3D | null;

	/**
	 * Array with object's children. See [Group](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Group) for info on manually grouping objects.
	 * @default []
	 */
	children: Object3D[];

	/**
	 * This is used by the *.lookAt* method, for example, to determine the orientation of the result.
	 * Default is [Object3D.DefaultUp](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.DefaultUp) - that is, ( 0, 1, 0 ).
	 * @default THREE.Object3D.DefaultUp.clone()
	 */
	up: Vector3;

	/**
	 * A [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) representing the object's local position. Default is (0, 0, 0).
	 * @default new THREE.Vector3()
	 */
	readonly position: Vector3;

	/**
	 * Object's local rotation (see [Euler angles](https://en.wikipedia.org/wiki/Euler_angles)), in radians.
	 * @default new THREE.Euler()
	 */
	readonly rotation: Euler;

	/**
	 * Object's local rotation as a [Quaternion](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion).
	 * @default new THREE.Quaternion()
	 */
	readonly quaternion: Quaternion;

	/**
	 * The object's local scale. Default is [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3)( 1, 1, 1 ).
	 * @default new THREE.Vector3()
	 */
	readonly scale: Vector3;

	/**
	 * This is passed to the shader and used to calculate the position of the object.
	 * @default new THREE.Matrix4()
	 */
	readonly modelViewMatrix: Matrix4;

	/**
	 * This is passed to the shader and used to calculate lighting for the object. It is the transpose of the inverse of the upper left 3x3 sub-matrix of this object's modelViewMatrix.
	 * The reason for this special matrix is that simply using the modelViewMatrix could result in a non-unit length of normals (on scaling) or in a non-perpendicular direction (on non-uniform scaling).
	 * On the other hand the translation part of the modelViewMatrix is not relevant for the calculation of normals. Thus a Matrix3 is sufficient.
	 * @default new THREE.Matrix3()
	 */
	readonly normalMatrix: Matrix3;

	/**
	 * The local transform matrix.
	 * @default new THREE.Matrix4()
	 */
	matrix: Matrix4;

	/**
	 * The global transform of the object. If the Object3D has no parent, then it's identical to the local transform *.matrix*.
	 * @default new THREE.Matrix4()
	 */
	matrixWorld: Matrix4;

	/**
	 * When this is set, it calculates the matrix of position, (rotation or quaternion) and scale every frame and also recalculates the matrixWorld property. Default is [Object3D.DefaultMatrixAutoUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.DefaultMatrixAutoUpdate) (true).
	 * @default THREE.Object3D.DefaultMatrixAutoUpdate
	 */
	matrixAutoUpdate: boolean;

	/**
	 * When this is set, it calculates the matrixWorld in that frame and resets this property  to false. Default is *false*.
	 * @default false
	 */
	matrixWorldNeedsUpdate: boolean;

	/**
	 * The layer membership of the object. The object is only visible if it has at least one layer in common with the [Camera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Camera) in use. This property can also be used to filter out unwanted objects in ray-intersection tests when using [Raycaster](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Raycaster).
	 * @default new THREE.Layers()
	 */
	layers: Layers;

	/**
	 * Object gets rendered if *true*. Default is *true*.
	 * @default true
	 */
	visible: boolean;

	/**
	 * Whether the object gets rendered into shadow map. Default is *false*.
	 * @default false
	 */
	castShadow: boolean;

	/**
	 * Whether the material receives shadows. Default is *false*.
	 * @default false
	 */
	receiveShadow: boolean;

	/**
	 * When this is set, it checks every frame if the object is in the frustum of the camera before rendering the object. If set to `false` the object gets rendered every frame even if it is not in the frustum of the camera. Default is `true`.
	 * @default true
	 */
	frustumCulled: boolean;

	/**
	 * This value allows the default rendering order of [scene graph](https://en.wikipedia.org/wiki/Scene_graph) objects to be overridden although opaque and transparent objects remain sorted independently. When this property is set for an instance of [Group](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Group), all descendants objects will be sorted and rendered together.
	 * Sorting is from lowest to highest renderOrder. Default value is *0*.
	 * @default 0
	 */
	renderOrder: number;

	/**
	 * Array with object's animation clips.
	 * @default []
	 */
	animations: AnimationClip[];

	/**
	 * An object that can be used to store custom data about the Object3D. It should not hold references to functions as these will not be cloned.
	 * @default {}
	 */
	userData: { [key: string]: any };

	/**
	 * Custom depth material to be used when rendering to the depth map. Can only be used in context of meshes.
	 * When shadow-casting with a [DirectionalLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DirectionalLight) or [SpotLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpotLight), if you are modifying vertex positions in the vertex shader you must specify a customDepthMaterial for proper shadows. Default is *undefined*.
	 */
	customDepthMaterial: Material;

	/**
	 * Same as *.customDepthMaterial*, but used with [PointLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PointLight). Default is *undefined*.
	 */
	customDistanceMaterial: Material;

	/**
	 * Used to check whether this or derived classes are Object3Ds. Default is true.
	 * You should not change this, as it is used internally for optimisation.
	 */
	readonly isObject3D: true;

	/**
	 * An optional callback that is executed immediately before a 3D object is rendered.
	 * This function is called with the following parameters: renderer, scene, camera, geometry, material, group.
	 * Please notice that this callback is only executed for *renderable* 3D objects. Meaning 3D objects which define their visual appearance with geometries and materials like instances of [Mesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Mesh), [Line](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line), [Points](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Points) or [Sprite](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sprite).
	 * Instances of [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D), [Group](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Group) or [Bone](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Bone) are not renderable and thus this callback is not executed for such objects.
	 */
	onBeforeRender: (
		renderer: WebGLRenderer,
		scene: Scene,
		camera: Camera,
		geometry: BufferGeometry,
		material: Material,
		group: Group
	) => void;

	/**
	 * An optional callback that is executed immediately after a 3D object is rendered.
	 * This function is called with the following parameters: renderer, scene, camera, geometry, material, group.
	 * Please notice that this callback is only executed for *renderable* 3D objects. Meaning 3D objects which define their visual appearance with geometries and materials like instances of [Mesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Mesh), [Line](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line), [Points](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Points) or [Sprite](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sprite).
	 * Instances of [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D), [Group](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Group) or [Bone](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Bone) are not renderable and thus this callback is not executed for such objects.
	 */
	onAfterRender: (
		renderer: WebGLRenderer,
		scene: Scene,
		camera: Camera,
		geometry: BufferGeometry,
		material: Material,
		group: Group
	) => void;

	/**
	 * The default *.up* direction for objects, also used as the default position for [DirectionalLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DirectionalLight),
	 * [HemisphereLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/HemisphereLight) and [Spotlight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Spotlight) (which creates lights shining from the top down).
	 * Set to ( 0, 1, 0 ) by default.
	 * @static
	 */
	DefaultUp: Vector3;

	/**
	 * The default setting for *.matrixAutoUpdate* for newly created Object3Ds.
	 * @static
	 */
	DefaultMatrixAutoUpdate: boolean;

	/**
	 * Applies the matrix transform to the object and updates the object's position, rotation and scale.
	 */
	applyMatrix4(matrix: Matrix4): void;

	/**
	 * Applies the rotation represented by the quaternion to the object.
	 */
	applyQuaternion(quaternion: Quaternion): this;

	/**
	 * Calls [setFromAxisAngle](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion.setFromAxisAngle)( [axis](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), [angle](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) ) on the *.quaternion*.
	 * @param axis A normalized vector in object space.
	 * @param angle angle in radians
	 */
	setRotationFromAxisAngle(axis: Vector3, angle: number): void;

	/**
	 * Calls [setRotationFromEuler](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion.setRotationFromEuler)( [euler](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Euler)) on the *.quaternion*.
	 * @param euler Euler angle specifying rotation amount.
	 */
	setRotationFromEuler(euler: Euler): void;

	/**
	 * Calls [setFromRotationMatrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion.setFromRotationMatrix)( [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4)) on the *.quaternion*.
	 * Note that this assumes that the upper 3x3 of m is a pure rotation matrix (i.e, unscaled).
	 * @param m rotate the quaternion by the rotation component of the matrix.
	 */
	setRotationFromMatrix(m: Matrix4): void;

	/**
	 * Copy the given quaternion into *.quaternion*.
	 * @param q normalized Quaternion
	 */
	setRotationFromQuaternion(q: Quaternion): void;

	/**
	 * Rotate an object along an axis in object space. The axis is assumed to be normalized.
	 * @param axis	A normalized vector in object space.
	 * @param angle	The angle in radians.
	 */
	rotateOnAxis(axis: Vector3, angle: number): this;

	/**
	 * Rotate an object along an axis in world space. The axis is assumed to be normalized.
	 * Method Assumes no rotated parent.
	 * @param axis	A normalized vector in object space.
	 * @param angle	The angle in radians.
	 */
	rotateOnWorldAxis(axis: Vector3, angle: number): this;

	/**
	 * Rotates the object around x axis in local space.
	 * @param angle The angle to rotate in radians.
	 */
	rotateX(angle: number): this;

	/**
	 * Rotates the object around y axis in local space.
	 * @param angle The angle to rotate in radians.
	 */
	rotateY(angle: number): this;

	/**
	 * Rotates the object around z axis in local space.
	 * @param angle The angle to rotate in radians.
	 */
	rotateZ(angle: number): this;

	/**
	 * Translate an object by distance along an axis in object space. The axis is assumed to be normalized.
	 * @param axis	A normalized vector in object space.
	 * @param distance	The distance to translate.
	 */
	translateOnAxis(axis: Vector3, distance: number): this;

	/**
	 * Translates object along x axis in object space by *distance* units.
	 * @param distance Distance.
	 */
	translateX(distance: number): this;

	/**
	 * Translates object along y axis in object space by *distance* units.
	 * @param distance Distance.
	 */
	translateY(distance: number): this;

	/**
	 * Translates object along z axis in object space by *distance* units.
	 * @param distance Distance.
	 */
	translateZ(distance: number): this;

	/**
	 * Converts the vector from this object's local space to world space.
	 * @param vector A vector representing a position in this object's local space.
	 * @param vector A local vector.
	 */
	localToWorld(vector: Vector3): Vector3;

	/**
	 * Converts the vector from world space to this object's local space.
	 * @param vector A vector representing a position in world space.
	 */
	worldToLocal(vector: Vector3): Vector3;

	/**
	 * Optionally, the *.x*, *.y* and *.z* components of the world space position.
	 * Rotates the object to face a point in world space.
	 * This method does not support objects having non-uniformly-scaled parent(s).
	 *
	 * @param vector A vector representing a position in world space.
	 */
	lookAt(vector: Vector3 | number, y?: number, z?: number): void;

	/**
	 * Adds *object* as child of this object. An arbitrary number of objects may be added. Any current parent on an object passed in here will be removed, since an object can have at most one parent.
	 * See [Group](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Group) for info on manually grouping objects.
	 */
	add(...object: Object3D[]): this;

	/**
	 * Removes *object* as child of this object. An arbitrary number of objects may be removed.
	 */
	remove(...object: Object3D[]): this;

	/**
	 * Removes this object from its current parent.
	 */
	removeFromParent(): this;

	/**
	 * Removes all child objects.
	 */
	clear(): this;

	/**
	 * Adds *object* as a child of this, while maintaining the object's world transform.
	 * Note: This method does not support scene graphs having non-uniformly-scaled nodes(s).
	 */
	attach(object: Object3D): this;

	/**
	 * Note that ids are assigned in chronological order: 1, 2, 3, ..., incrementing by one for each new object.
	 * @param id  Unique number of the object instance Searches through an object and its children, starting with the object itself, and returns the first with a matching id.
	 */
	getObjectById(id: number): Object3D | undefined;

	/**
	 * Searches through an object and its children, starting with the object itself, and returns the first with a matching name.
	 * Note that for most objects the name is an empty string by default. You will have to set it manually to make use of this method.
	 * @param name String to match to the children's Object3D.name property.
	 */
	getObjectByName(name: string): Object3D | undefined;

	/**
	 * Searches through an object and its children, starting with the object itself, and returns the first with a property that matches the value given.
	 * @param name The property name to search for.
	 * @param value Value of the given property.
	 */
	getObjectByProperty(name: string, value: string): Object3D | undefined;

	/**
	 * @param target The result will be copied into this Vector3.
	 * @returns Returns a vector representing the position of the object in world space.
	 */
	getWorldPosition(target: Vector3): Vector3;

	/**
	 * @param target The result will be copied into this Quaternion.
	 * @returns Returns a quaternion representing the rotation of the object in world space.
	 */
	getWorldQuaternion(target: Quaternion): Quaternion;

	/**
	 * @param target The result will be copied into this Vector3.
	 * @returns Returns a vector of the scaling factors applied to the object for each axis in world space.
	 */
	getWorldScale(target: Vector3): Vector3;

	/**
	 * @param target The result will be copied into this Vector3.
	 * @returns Returns a vector representing the direction of object's positive z-axis in world space.
	 */
	getWorldDirection(target: Vector3): Vector3;

	/**
	 * Abstract (empty) method to get intersections between a casted ray and this object.
	 * Subclasses such as [Mesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Mesh), [Line](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line), and [Points](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Points) implement this method in order to use raycasting.
	 */
	raycast(raycaster: Raycaster, intersects: Intersection[]): void;

	/**
	 * Executes the callback on this object and all descendants.
	 * Note: Modifying the scene graph inside the callback is discouraged.
	 * @param callback A function with as first argument an object3D object.
	 */
	traverse(callback: (object: Object3D) => any): void;

	/**
	 * Like traverse, but the callback will only be executed for visible objects.
	 * Descendants of invisible objects are not traversed.
	 * Note: Modifying the scene graph inside the callback is discouraged.
	 * @param callback A function with as first argument an object3D object.
	 */
	traverseVisible(callback: (object: Object3D) => any): void;

	/**
	 * Executes the callback on all ancestors.
	 * Note: Modifying the scene graph inside the callback is discouraged.
	 * @param callback A function with as first argument an object3D object.
	 */
	traverseAncestors(callback: (object: Object3D) => any): void;

	/**
	 * Updates the local transform.
	 */
	updateMatrix(): void;

	/**
	 * Updates the global transform of the object and its descendants.
	 */
	updateMatrixWorld(force?: boolean): void;

	/**
	 * Updates the global transform of the object.
	 * @param updateParents recursively updates global transform of ancestors.
	 * @param updateChildren recursively updates global transform of descendants.
	 */
	updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void;

	/**
	 */
	toJSON(meta?: { geometries: any; materials: any; textures: any; images: any }): any;

	/**
	 * @param recursive if true, descendants of the object are also cloned. Default is true.
	 * @returns Returns a clone of this object and optionally all descendants.
	 */
	clone(recursive?: boolean): this;

	/**
	 * Copy the given object into this object.
	 * Note: event listeners and user-defined callbacks (*.onAfterRender* and *.onBeforeRender*) are not copied.
	 * @param recursive if true, descendants of the object are also copied. Default is true.
	 */
	copy(source: this, recursive?: boolean): this;
}

/**
 * Face
 */
export interface Face {
	a: number;
	b: number;
	c: number;
	normal: Vector3;
	materialIndex: number;
}

/**
 * Intersection
 * @template TIntersected
 */
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

/**
 * Raycaster parameters
 */
export interface RaycasterParameters {
	Mesh?: any;
	Line?: { threshold: number } | undefined;
	LOD?: any;
	Points?: { threshold: number } | undefined;
	Sprite?: any;
}

/**
 * This class is designed to assist with [raycasting](https://en.wikipedia.org/wiki/Ray_casting).
 * Raycasting is used for mouse picking (working out what objects in the 3d space the mouse is over) amongst other things.
 *
 * ### Examples
 * [Raycasting to a Mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_interactive_cubes) |
 * [Raycasting to a Mesh in using an OrthographicCamera](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_interactive_cubes_ortho) |
 * [Raycasting to a Mesh with BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_interactive_buffergeometry) |
 * [Raycasting to a InstancedMesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_instancing_raycast) |
 * [Raycasting to a Line](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_interactive_lines) |
 * [Raycasting to Points](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_interactive_raycasting_points) |
 * [Terrain raycasting](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_terrain_raycast) |
 * [Raycasting to paint voxels](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_interactive_voxelpainter) |
 * [Raycast to a Texture](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_raycast_texture)
 *
 * ### Code Example
 * 
 * ```js
 * const raycaster = new THREE.Raycaster();
 * const mouse = new THREE.Vector2();
 * function onMouseMove( event ) {
 *  //  calculate mouse position in normalized device coordinates // (-1 to +1) for both components
 *  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
 *  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
 * }
 * function render() {
 *  //  update the picking ray with the camera and mouse position raycaster.setFromCamera( mouse, camera );
 *  //  calculate objects intersecting the picking ray
 * 	const intersects = raycaster.intersectObjects( scene.children );
 *  for ( let i = 0; i < intersects.length; i ++ ) {
 *      intersects[ i ].object.material.color.set( 0xff0000 );
 *  }
 *  renderer.render( scene, camera );
 * }
 * window.addEventListener( 'mousemove', onMouseMove, false );
 * window.requestAnimationFrame(render);
 * ```
 */
export interface Raycaster {
	/**
	 * This creates a new raycaster object.
	 * @param origin The origin vector where the ray casts from.
	 * @param direction The direction vector that gives direction to the ray. Should be normalized.
	 * @param near All results returned are further away than near. Near can't be negative. Default value is 0.
	 * @param far All results returned are closer then far. Far can't be lower then near . Default value is Infinity.
	 */
	new (origin?: Vector3, direction?: Vector3, near?: number, far?: number): this;

	/**
	 * The [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) used for the raycasting.
	 */
	ray: Ray;

	/**
	 * The near factor of the raycaster. This value indicates which objects can be discarded based on the distance.
	 * This value shouldn't be negative and should be smaller than the far property.
	 * @default 0
	 */
	near: number;

	/**
	 * The far factor of the raycaster. This value indicates which objects can be discarded based on the distance.
	 * This value shouldn't be negative and should be larger than the near property.
	 * @default Infinity
	 */
	far: number;

	/**
	 * The camera to use when raycasting against view-dependent objects such as billboarded objects like [Sprites](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sprites). This field can be set manually or is set when calling "setFromCamera".
	 * Defaults to null.
	 */
	camera: Camera;

	/**
	 * Used by Raycaster to selectively ignore 3D objects when performing intersection tests. The following code example ensures that only 3D objects on layer *1* will be honored by the instance of Raycaster.
	 * raycaster.layers.set( 1 );
	 * object.layers.enable( 1 );
	 * @default new THREE.Layers()
	 */
	layers: Layers;

	/**
	 * An object with the following properties:
	 * Where threshold is the precision of the raycaster when intersecting objects, in world units.
	 * @default { Mesh: {}, Line: { threshold: 1 }, LOD: {}, Points: { threshold: 1 }, Sprite: {} }
	 */
	params: RaycasterParameters;

	/**
	 * Updates the ray with a new origin and direction. Please note that this method only copies the values from the arguments.
	 * @param origin The origin vector where the ray casts from.
	 * @param direction The normalized direction vector that gives direction to the ray.
	 */
	set(origin: Vector3, direction: Vector3): void;

	/**
	 * Updates the ray with a new origin and direction.
	 * @param coords 2D coordinates of the mouse, in normalized device coordinates (NDC)---X and Y components should be between -1 and 1.
	 * @param camer A camera from which the ray should originate Updates the ray with a new origin and direction.
	 */
	setFromCamera(coords: { x: number; y: number }, camera: Camera): void;

	/**
	 * Checks all intersection between the ray and the object with or without the descendants. Intersections are returned sorted by distance, closest first.
	 * An array of intersections is returned... [ { distance, point, face, faceIndex, object }, ... ] distance - Second set of U,V coordinates at point of intersection [instanceId](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) – The index number of the instance where the ray intersects the InstancedMesh *Raycaster* delegates to the [raycast](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.raycast) method of the passed object, when evaluating whether the ray intersects the object or not. This allows [meshes](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Mesh) to respond differently to ray casting than [lines](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line) and [pointclouds](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Points).
	 * *Note* that for meshes, faces must be pointed towards the origin of the *.ray* in order to be detected; intersections of the ray passing through the back of a face will not be detected. To raycast against both faces of an object, you'll want to set the [material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Mesh.material)'s [side](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material.side) property to *THREE.DoubleSide*.
	 *
	 * @param object The object to check for intersection with the ray.
	 * @param recursive If true, it also checks all descendants. Otherwise it only checks intersection with the object. Default is true.
	 * @param optionalTarget target to set the result. Otherwise a new [Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) is instantiated. If set, you must clear this array prior to each call (i.e., array.length = 0;).
	 */
	intersectObject<TIntersected extends Object3D>(
		object: Object3D,
		recursive?: boolean,
		optionalTarget?: Array<Intersection<TIntersected>>
	): Array<Intersection<TIntersected>>;

	/**
	 * Checks all intersection between the ray and the objects with or without the descendants. Intersections are returned sorted by distance, closest first. Intersections are of the same form as those returned by *.intersectObject*.
	 *
	 * @param objects The objects to check for intersection with the ray.
	 * @param recursive If true, it also checks all descendants of the objects. Otherwise it only checks intersection with the objects. Default is true.
	 * @param optionalTarget target to set the result. Otherwise a new [Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) is instantiated. If set, you must clear this array prior to each call (i.e., array.length = 0;).
	 */
	intersectObjects<TIntersected extends Object3D>(
		objects: Object3D[],
		recursive?: boolean,
		optionalTarget?: Array<Intersection<TIntersected>>
	): Array<Intersection<TIntersected>>;
}

/**
 * Uniforms are global GLSL variables. They are passed to shader programs.
 *
 * ### Code Example
 * 
 * ```js
 * uniforms: {
 *  time: { value: 1.0 }, resolution: new Uniform( new Vector2() )
 * };
 * ```
 * 
 * Each uniform must have a *value* property. The type of the value must correspond to the type of the uniform variable in the GLSL code as specified for the primitive GLSL types in the table below. Uniform structures and arrays are also supported. GLSL arrays of primitive type must either be specified as an array of the corresponding THREE objects or as a flat array containing the data of all the objects. In other words; GLSL primitives in arrays must not be represented by arrays. This rule does not apply transitively.
 * An array of *vec2* arrays, each with a length of five vectors, must be an array of arrays, of either five [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) objects or ten *number*s.
 *
 * |    GLSL type      |      JavaScript type      |
 * |:-----------------:|--------------------------:|
 * | int               | [Number](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Number) |
 * | uint (WebGL 2)    | [Number](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Number) |
 * | float             | [Number](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Number) |
 * | bool              | [Boolean](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) |
 * | bool              | [Number](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Number) |
 * | vec2              | [THREE.Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) |
 * | vec2              | [Float32Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float32Array) (*) |
 * | vec2              | [Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) (*) |
 * | vec3              | [THREE.Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) |
 * | vec3              | [THREE.Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) |
 * | vec3              | [Float32Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float32Array) (*) |
 * | vec3              | [Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) (*) |
 * | vec4              | [THREE.Vector4](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4) |
 * | vec4              | [THREE.Quaternion](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion) |
 * | vec4              | [Float32Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float32Array) (*) |
 * | vec4              | [Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) (*) |
 * | mat2              | [Float32Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float32Array) (*) |
 * | mat2              | [Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) (*) |
 * | mat3              | [THREE.Matrix3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3) |
 * | mat3              | [Float32Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float32Array) (*) |
 * | mat3              | [Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) (*) |
 * | mat4              | [THREE.Matrix4](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) |
 * | mat4              | [Float32Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float32Array) (*) |
 * | mat4              | [Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) (*) |
 * | ivec2, bvec2      | [Float32Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float32Array) (*) |
 * | ivec2, bvec2      | [Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) (*) |
 * | ivec3, bvec3      | [Int32Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Int32Array) (*) |
 * | ivec3, bvec3      | [Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) (*) |
 * | ivec4, bvec4      | [Int32Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Int32Array) (*) |
 * | ivec4, bvec4      | [Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) (*) |
 * | sampler2D         | [THREE.Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) |
 * | samplerCube       | [THREE.CubeTexture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubeTexture) |
 *
 */
export interface Uniform {
	new (value: any): this;
	/**
	 */
	new (type: string, value: any): this;

	value: any;

	onUpdateCallback: () => void;
}
