import { AnimationClip } from './animation';
import { Camera } from './cameras';
import { BuiltinShaderAttributeName, Usage } from './constants';
import { Material } from './materials';
import { Box3, Euler, Matrix, Matrix3, Matrix4, Quaternion, Ray, Sphere, Vector2, Vector3 } from './math';
import { Group } from './objects';
import { WebGLRenderer } from './renderers';
import { Scene } from './scenes';

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/BufferAttribute.js|src/core/BufferAttribute.js}
 */
export interface BufferAttribute {
    new( array: ArrayLike<number>, itemSize: number, normalized?: boolean) : this; // array parameter should be TypedArray.

    /**
     * @default ''
     */
    name: string;
    array: ArrayLike<number>;
    itemSize: number;

    /**
     * @default THREE.StaticDrawUsage
     */
    usage: Usage;

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
    setUsage(usage: Usage): this;
    clone(): this;
    copy(source: BufferAttribute): this;
    copyAt(index1: number, attribute: BufferAttribute, index2: number): this;
    copyArray(array: ArrayLike<number>): this;
    copyColorsArray(colors: Array<{ r: number; g: number; b: number }>): this;
    copyVector2sArray(vectors: Array<{ x: number; y: number }>): this;
    copyVector3sArray(vectors: Array<{ x: number; y: number; z: number }>): this;
    copyVector4sArray(vectors: Array<{ x: number; y: number; z: number; w: number }>): this;
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

/**
 * @deprecated THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead.
 */
export interface Int8Attribute extends BufferAttribute {
    new( array: any, itemSize: number) : this;
}

/**
 * @deprecated THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead.
 */
export interface Uint8Attribute extends BufferAttribute {
    new( array: any, itemSize: number) : this;
}

/**
 * @deprecated THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead.
 */
export interface Uint8ClampedAttribute extends BufferAttribute {
    new( array: any, itemSize: number) : this;
}

/**
 * @deprecated THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead.
 */
export interface Int16Attribute extends BufferAttribute {
    new( array: any, itemSize: number) : this;
}

/**
 * @deprecated THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead.
 */
export interface Uint16Attribute extends BufferAttribute {
    new( array: any, itemSize: number) : this;
}

/**
 * @deprecated THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead.
 */
export interface Int32Attribute extends BufferAttribute {
    new( array: any, itemSize: number) : this;
}

/**
 * @deprecated THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead.
 */
export interface Uint32Attribute extends BufferAttribute {
    new( array: any, itemSize: number) : this;
}

/**
 * @deprecated THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead.
 */
export interface Float32Attribute extends BufferAttribute {
    new( array: any, itemSize: number) : this;
}

/**
 * @deprecated THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead.
 */
export interface Float64Attribute extends BufferAttribute {
    new( array: any, itemSize: number) : this;
}

export interface Int8BufferAttribute extends BufferAttribute {
    new( 
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ) : this;
}

export interface Uint8BufferAttribute extends BufferAttribute {
    new( 
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ) : this;
}

export interface Uint8ClampedBufferAttribute extends BufferAttribute {
    new( 
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ) : this;
}

export interface Int16BufferAttribute extends BufferAttribute {
    new( 
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ) : this;
}

export interface Uint16BufferAttribute extends BufferAttribute {
    new( 
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ) : this;
}

export interface Int32BufferAttribute extends BufferAttribute {
    new( 
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ) : this;
}

export interface Uint32BufferAttribute extends BufferAttribute {
    new( 
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ) : this;
}

export interface Float16BufferAttribute extends BufferAttribute {
    new( 
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ) : this;
}

export interface Float32BufferAttribute extends BufferAttribute {
    new( 
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ) : this;
}

export interface Float64BufferAttribute extends BufferAttribute {
    new( 
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ) : this;
}

/**
 * This is a superefficent class for geometries because it saves all data in buffers.
 * It reduces memory costs and cpu cycles. But it is not as easy to work with because of all the necessary buffer calculations.
 * It is mainly interesting when working with objects.
 *
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/BufferGeometry.js|src/core/BufferGeometry.js}
 */
export interface BufferGeometry extends EventDispatcher {
    /**
     * This creates a new BufferGeometry. It also sets several properties to an default value.
     */
    new( ) : this;

    MaxIndex: number;

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
    groups: Array<{ start: number; count: number; materialIndex?: number | undefined }>;

    /**
     * @default null
     */
    boundingBox: Box3 | null;

    /**
     * @default null
     */
    boundingSphere: Sphere | null;

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
        name: BuiltinShaderAttributeName | (string & {}),
        attribute: BufferAttribute | InterleavedBufferAttribute,
    ): BufferGeometry;
    getAttribute(name: BuiltinShaderAttributeName | (string & {})): BufferAttribute | InterleavedBufferAttribute;
    deleteAttribute(name: BuiltinShaderAttributeName | (string & {})): BufferGeometry;
    hasAttribute(name: BuiltinShaderAttributeName | (string & {})): boolean;

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
    addAttribute(name: string, attribute: BufferAttribute | InterleavedBufferAttribute): BufferGeometry;
    addAttribute(name: any, array: any, itemSize: any): any;

    /**
     * @deprecated Use {@link BufferGeometry#deleteAttribute .deleteAttribute()} instead.
     */
    removeAttribute(name: string): BufferGeometry;
}
/**
 * Object for keeping track of time.
 *
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js|src/core/Clock.js}
 */
export interface Clock {
    /**
     * @param [autoStart=true] Automatically start the clock.
     */
    new( autoStart?: boolean) : this;

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
 * JavaScript events for custom objects
 *
 * @source src/core/EventDispatcher.js
 */
export interface EventDispatcher<E extends BaseEvent = Event> {
    /**
     * Creates eventDispatcher object. It needs to be call with '.call' to add the functionality to an object.
     */
    new( ) : this;

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
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/GLBufferAttribute.js|src/core/GLBufferAttribute.js}
 */

export interface GLBufferAttribute {
    new( buffer: WebGLBuffer, type: number, itemSize: number, elementSize: 1 | 2 | 4, count: number) : this;

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
 * see {@link https://github.com/mrdoob/three.js/blob/master/examples/jsm/utils/BufferGeometryUtils.js|examples/jsm/utils/BufferGeometryUtils.js}
 */
export interface  BufferGeometryUtils {
    mergeBufferGeometries(geometries: BufferGeometry[]): BufferGeometry;
    computeTangents(geometry: BufferGeometry): null;
    mergeBufferAttributes(attributes: BufferAttribute[]): BufferAttribute;
}

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/InstancedBufferAttribute.js|src/core/InstancedBufferAttribute.js}
 */
export interface InstancedBufferAttribute extends BufferAttribute {
    new( array: ArrayLike<number>, itemSize: number, normalized?: boolean, meshPerAttribute?: number) : this;

    /**
     * @default 1
     */
    meshPerAttribute: number;
}

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/InstancedBufferGeometry.js|src/core/InstancedBufferGeometry.js}
 */
export interface InstancedBufferGeometry extends BufferGeometry {
    new( ) : this;

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
export interface InstancedInterleavedBuffer extends InterleavedBuffer {
    new( array: ArrayLike<number>, stride: number, meshPerAttribute?: number) : this;

    /**
     * @default 1
     */
    meshPerAttribute: number;
}

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/InterleavedBuffer.js|src/core/InterleavedBuffer.js}
 */
export interface InterleavedBuffer {
    new( array: ArrayLike<number>, stride: number) : this;

    array: ArrayLike<number>;
    stride: number;

    /**
     * @default THREE.StaticDrawUsage
     */
    usage: Usage;

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

    setUsage(usage: Usage): InterleavedBuffer;
    clone(data: object): InterleavedBuffer;
    copy(source: InterleavedBuffer): this;
    copyAt(index1: number, attribute: InterleavedBufferAttribute, index2: number): InterleavedBuffer;
    set(value: ArrayLike<number>, index: number): InterleavedBuffer;
    toJSON(data: object): {
        uuid: string;
        buffer: string;
        type: string;
        stride: number;
    };
}
/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/InterleavedBufferAttribute.js|src/core/InterleavedBufferAttribute.js}
 */
export interface InterleavedBufferAttribute {
    new( interleavedBuffer: InterleavedBuffer, itemSize: number, offset: number, normalized?: boolean) : this;

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
export interface Layers {
    new( ) : this;

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
    isEnabled(channel: number): boolean;
}

/**
 * Base class for scene graph objects
 */
export interface Object3D<E extends BaseEvent = Event> extends EventDispatcher<E> {
    new( ) : this;

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
    customDepthMaterial: Material;

    /**
     * Same as customDepthMaterial, but used with PointLight.
     */
    customDistanceMaterial: Material;

    /**
     * Used to check whether this or derived classes are Object3Ds. Default is true.
     * You should not change this, as it is used internally for optimisation.
     */
    readonly isObject3D: true;

    /**
     * Calls before rendering object
     */
    onBeforeRender: (
        renderer: WebGLRenderer,
        scene: Scene,
        camera: Camera,
        geometry: BufferGeometry,
        material: Material,
        group: Group,
    ) => void;

    /**
     * Calls after rendering object
     */
    onAfterRender: (
        renderer: WebGLRenderer,
        scene: Scene,
        camera: Camera,
        geometry: BufferGeometry,
        material: Material,
        group: Group,
    ) => void;

    DefaultUp: Vector3;
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
     * axis -- A normalized vector in object space.
     * angle -- angle in radians
     * @param axis A normalized vector in object space.
     * @param angle angle in radians
     */
    setRotationFromAxisAngle(axis: Vector3, angle: number): void;

    /**
     * Calls setRotationFromEuler(euler) on the .quaternion.
     * @param euler Euler angle specifying rotation amount.
     */
    setRotationFromEuler(euler: Euler): void;

    /**
     * Calls setFromRotationMatrix(m) on the .quaternion.
     *
     * Note that this assumes that the upper 3x3 of m is a pure rotation matrix (i.e, unscaled).
     * @param m rotate the quaternion by the rotation component of the matrix.
     */
    setRotationFromMatrix(m: Matrix4): void;

    /**
     * Copy the given quaternion into .quaternion.
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
     * Rotate an object along an axis in world space. The axis is assumed to be normalized. Method Assumes no rotated parent.
     * @param axis	A normalized vector in object space.
     * @param angle	The angle in radians.
     */
    rotateOnWorldAxis(axis: Vector3, angle: number): this;

    /**
     * Rotates the object around x axis in local space.
     * @param angle the angle to rotate in radians.
     */
    rotateX(angle: number): this;

    /**
     * Rotates the object around y axis in local space.
     * @param angle the angle to rotate in radians.
     */
    rotateY(angle: number): this;

    /**
     * Rotates the object around z axis in local space.
     * @param angle the angle to rotate in radians.
     */
    rotateZ(angle: number): this;

    /**
     * Translate an object by distance along an axis in object space. The axis is assumed to be normalized.
     * @param axis	A normalized vector in object space.
     * @param distance	The distance to translate.
     */
    translateOnAxis(axis: Vector3, distance: number): this;

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
    localToWorld(vector: Vector3): Vector3;

    /**
     * Updates the vector from world space to local space.
     * @param vector A world vector.
     */
    worldToLocal(vector: Vector3): Vector3;

    /**
     * Optionally, the x, y and z components of the world space position.
     * Rotates the object to face a point in world space.
     * This method does not support objects having non-uniformly-scaled parent(s).
     * @param vector A world vector to look at.
     */
    lookAt(vector: Vector3 | number, y?: number, z?: number): void;

    /**
     * Adds object as child of this object.
     */
    add(...object: Object3D[]): this;

    /**
     * Removes object as child of this object.
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
     * Adds object as a child of this, while maintaining the object's world transform.
     */
    attach(object: Object3D): this;

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

    getWorldPosition(target: Vector3): Vector3;
    getWorldQuaternion(target: Quaternion): Quaternion;
    getWorldScale(target: Vector3): Vector3;
    getWorldDirection(target: Vector3): Vector3;

    raycast(raycaster: Raycaster, intersects: Intersection[]): void;

    traverse(callback: (object: Object3D) => any): void;

    traverseVisible(callback: (object: Object3D) => any): void;

    traverseAncestors(callback: (object: Object3D) => any): void;

    /**
     * Updates local transform.
     */
    updateMatrix(): void;

    /**
     * Updates global transform of the object and its children.
     */
    updateMatrixWorld(force?: boolean): void;

    /**
     * Updates the global transform of the object.
     * @param updateParents recursively updates global transform of ancestors.
     * @param updateChildren recursively updates global transform of descendants.
     */
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

export interface RaycasterParameters {
    Mesh?: any;
    Line?: { threshold: number } | undefined;
    LOD?: any;
    Points?: { threshold: number } | undefined;
    Sprite?: any;
}

export interface Raycaster {
    /**
     * This creates a new raycaster object.
     * @param origin The origin vector where the ray casts from.
     * @param direction The direction vector that gives direction to the ray. Should be normalized.
     * @param near All results returned are further away than near. Near can't be negative. Default value is 0.
     * @param far All results returned are closer then far. Far can't be lower then near . Default value is Infinity.
     */
    new( origin?: Vector3, direction?: Vector3, near?: number, far?: number) : this;

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
    params: RaycasterParameters;

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
        optionalTarget?: Array<Intersection<TIntersected>>,
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
        optionalTarget?: Array<Intersection<TIntersected>>,
    ): Array<Intersection<TIntersected>>;
}
export interface Uniform {
    new( value: any) : this;
    /**
     * @deprecated
     */
    new( type: string, value: any) : this;
    /**
     * @deprecated
     */
    type: string;
    value: any;
    /**
     * @deprecated Use {@link Object3D#onBeforeRender object.onBeforeRender()} instead.
     */
    dynamic: boolean;
    onUpdateCallback: () => void;

    /**
     * @deprecated Use {@link Object3D#onBeforeRender object.onBeforeRender()} instead.
     */
    onUpdate(callback: () => void): Uniform;
}
