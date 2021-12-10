import * as I3JS from '../threejs-library/three-interface';
import * as THREE from 'three';

export class N3js {
	/**
	 * Gets box2
	 * @param [min]
	 * @param [max]
	 * @returns box2
	 */
	public static getBox2(min?: I3JS.IVector2, max?: I3JS.IVector2): I3JS.IBox2 {
		return new THREE.Box2(min, max);
	}

	/**
	 * Gets box3
	 * @param [min]
	 * @param [max]
	 * @returns box3
	 */
	public static getBox3(min?: I3JS.IVector3, max?: I3JS.IVector3): I3JS.IBox3 {
		return new THREE.Box3(min, max);
	}

	/**
	 * Gets color
	 * @param [color]
	 * @returns color
	 */
	public static getColor(color?: I3JS.TColorRepresentation): I3JS.IColor {
		return new THREE.Color(color);
	}

	/**
	 * Gets cylindrical
	 * @param [radius]
	 * @param [theta]
	 * @param [y]
	 * @returns cylindrical
	 */
	public static getCylindrical(
		radius?: number,
		theta?: number,
		y?: number
	): I3JS.ICylindrical {
		return new THREE.Cylindrical(radius, theta, y);
	}

	/**
	 * Gets euler
	 * @param [x]
	 * @param [y]
	 * @param [z]
	 * @param [order]
	 * @returns euler
	 */
	public static getEuler(
		x?: number,
		y?: number,
		z?: number,
		order?: string
	): I3JS.IEuler {
		return new THREE.Euler(x, y, z, order);
	}

	/**
	 * Gets frustum
	 * @param [p0]
	 * @param [p1]
	 * @param [p2]
	 * @param [p3]
	 * @param [p4]
	 * @param [p5]
	 * @returns frustum
	 */
	public static getFrustum(
		p0?: I3JS.IPlane,
		p1?: I3JS.IPlane,
		p2?: I3JS.IPlane,
		p3?: I3JS.IPlane,
		p4?: I3JS.IPlane,
		p5?: I3JS.IPlane
	): I3JS.IFrustum {
		return new THREE.Frustum(p0, p1, p2, p3, p4, p5);
	}

	/**
	 * Gets line3
	 * @param [start]
	 * @param [end]
	 * @returns line3
	 */
	public static getLine3(
		start?: I3JS.IVector3,
		end?: I3JS.IVector3
	): I3JS.ILine3 {
		return new THREE.Line3(start, end);
	}

	public static MathUtils: I3JS.IMathUtils = THREE.MathUtils;

	/**
	 * Gets matrix3
	 * @returns matrix3
	 */
	public static getMatrix3(): I3JS.IMatrix3 {
		return new THREE.Matrix3();
	}

	/**
	 * Gets matrix4
	 * @returns matrix4
	 */
	public static getMatrix4(): I3JS.IMatrix4 {
		return new THREE.Matrix4();
	}

	/**
	 * Gets plane
	 * @param [normal]
	 * @param [constant]
	 * @returns plane
	 */
	public static getPlane(
		normal?: I3JS.IVector3,
		constant?: number
	): I3JS.IPlane {
		return new THREE.Plane(normal, constant);
	}

	/**
	 * Gets quaternion
	 * @param [x]
	 * @param [y]
	 * @param [z]
	 * @param [w]
	 * @returns quaternion
	 */
	public static getQuaternion(
		x?: number,
		y?: number,
		z?: number,
		w?: number
	): I3JS.IQuaternion {
		return new THREE.Quaternion(x, y, z, w);
	}

	/**
	 * Gets ray
	 * @param [origin]
	 * @param [direction]
	 * @returns ray
	 */
	public static getRay(
		origin?: I3JS.IVector3,
		direction?: I3JS.IVector3
	): I3JS.IRay {
		return new THREE.Ray(origin, direction);
	}

	/**
	 * Gets sphere
	 * @param [center]
	 * @param [radius]
	 * @returns sphere
	 */
	public static getSphere(
		center?: I3JS.IVector3,
		radius?: number
	): I3JS.ISphere {
		return new THREE.Sphere(center, radius);
	}

	/**
	 * Gets spherical
	 * @param [radius]
	 * @param [phi]
	 * @param [theta]
	 * @returns spherical
	 */
	public static getSpherical(
		radius?: number,
		phi?: number,
		theta?: number
	): I3JS.ISpherical {
		return new THREE.Spherical(radius, phi, theta);
	}

	/**
	 * Gets spherical harmonics3
	 * @returns spherical harmonics3
	 */
	public static getSphericalHarmonics3(): I3JS.ISphericalHarmonics3 {
		return new THREE.SphericalHarmonics3();
	}

	/**
	 * Gets triangle
	 * @param [a]
	 * @param [b]
	 * @param [c]
	 * @returns triangle
	 */
	public static getTriangle(
		a?: I3JS.IVector3,
		b?: I3JS.IVector3,
		c?: I3JS.IVector3
	): I3JS.ITriangle {
		return new THREE.Triangle(a, b, c);
	}

	/**
	 * Gets vector2
	 * @param [x]
	 * @param [y]
	 * @returns vector2
	 */
	public static getVector2(x?: number, y?: number): I3JS.IVector2 {
		return new THREE.Vector2(x, y);
	}

	/**
	 * Gets vector3
	 * @param [x]
	 * @param [y]
	 * @param [z]
	 * @returns vector3
	 */
	public static getVector3(x?: number, y?: number, z?: number): I3JS.IVector3 {
		return new THREE.Vector3(x, y, z);
	}

	/**
	 * Gets vector4
	 * @param [x]
	 * @param [y]
	 * @param [z]
	 * @param [w]
	 * @returns vector4
	 */
	public static getVector4(
		x?: number,
		y?: number,
		z?: number,
		w?: number
	): I3JS.IVector4 {
		return new THREE.Vector4(x, y, z, w);
	}

	/**
	 * Gets cubic interpolant
	 *
	 * @param parameterPositions
	 * @param samplesValues
	 * @param sampleSize
	 * @param [resultBuffer]
	 * @returns cubic interpolant
	 */
	public static getCubicInterpolant(
		parameterPositions: any,
		samplesValues: any,
		sampleSize: number,
		resultBuffer?: any
	): I3JS.IInterpolant {
		return new THREE.CubicInterpolant(
			parameterPositions,
			samplesValues,
			sampleSize,
			resultBuffer
		);
	}

	/**
	 * Gets discrete interpolant
	 *
	 * @param parameterPositions
	 * @param samplesValues
	 * @param sampleSize
	 * @param [resultBuffer]
	 * @returns discrete interpolant
	 */
	public static getDiscreteInterpolant(
		parameterPositions: any,
		samplesValues: any,
		sampleSize: number,
		resultBuffer?: any
	): I3JS.IInterpolant {
		return new THREE.DiscreteInterpolant(
			parameterPositions,
			samplesValues,
			sampleSize,
			resultBuffer
		);
	}

	/**
	 * Gets linear interpolant
	 *
	 * @param parameterPositions
	 * @param samplesValues
	 * @param sampleSize
	 * @param [resultBuffer]
	 * @returns linear interpolant
	 */
	public static getLinearInterpolant(
		parameterPositions: any,
		samplesValues: any,
		sampleSize: number,
		resultBuffer?: any
	): I3JS.IInterpolant {
		return new THREE.LinearInterpolant(
			parameterPositions,
			samplesValues,
			sampleSize,
			resultBuffer
		);
	}

	/**
	 * Gets quaternion linear interpolant
	 *
	 * @param parameterPositions
	 * @param samplesValues
	 * @param sampleSize
	 * @param [resultBuffer]
	 * @returns quaternion linear interpolant
	 */
	public static getQuaternionLinearInterpolant(
		parameterPositions: any,
		samplesValues: any,
		sampleSize: number,
		resultBuffer?: any
	): I3JS.IInterpolant {
		return new THREE.QuaternionLinearInterpolant(
			parameterPositions,
			samplesValues,
			sampleSize,
			resultBuffer
		);
	}

	/**
	 * Gets buffer attribute
	 *
	 * @param array
	 * @param itemSize
	 * @param [normalized]
	 * @returns buffer attribute
	 */
	public static getBufferAttribute(
		array: ArrayLike<number>,
		itemSize: number,
		normalized?: boolean
	): I3JS.IBufferAttribute {
		return new THREE.BufferAttribute(array, itemSize, normalized);
	}

	/**
	 * Gets int8 buffer attribute
	 * @param array
	 * @param itemSize
	 * @param [normalized]
	 * @returns int8 buffer attribute
	 */
	public static getInt8BufferAttribute(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): I3JS.IBufferAttribute {
		return new THREE.Int8BufferAttribute(array, itemSize, normalized);
	}

	/**
	 * Gets uint8 buffer attribute
	 * @param array
	 * @param itemSize
	 * @param [normalized]
	 * @returns uint8 buffer attribute
	 */
	public static getUint8BufferAttribute(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): I3JS.IBufferAttribute {
		return new THREE.Uint8BufferAttribute(array, itemSize, normalized);
	}

	/**
	 * Gets uint8 clamped buffer attribute
	 * @param array
	 * @param itemSize
	 * @param [normalized]
	 * @returns uint8 clamped buffer attribute
	 */
	public static getUint8ClampedBufferAttribute(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): I3JS.IBufferAttribute {
		return new THREE.Uint8ClampedBufferAttribute(array, itemSize, normalized);
	}

	/**
	 * Gets int16 buffer attribute
	 * @param array
	 * @param itemSize
	 * @param [normalized]
	 * @returns int16 buffer attribute
	 */
	public static getInt16BufferAttribute(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): I3JS.IBufferAttribute {
		return new THREE.Int16BufferAttribute(array, itemSize, normalized);
	}

	/**
	 * Gets uint16 buffer attribute
	 * @param array
	 * @param itemSize
	 * @param [normalized]
	 * @returns uint16 buffer attribute
	 */
	public static getUint16BufferAttribute(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): I3JS.IBufferAttribute {
		return new THREE.Uint16BufferAttribute(array, itemSize, normalized);
	}

	/**
	 * Gets int32 buffer attribute
	 * @param array
	 * @param itemSize
	 * @param [normalized]
	 * @returns int32 buffer attribute
	 */
	public static getInt32BufferAttribute(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): I3JS.IBufferAttribute {
		return new THREE.Int32BufferAttribute(array, itemSize, normalized);
	}

	/**
	 * Gets uint32 buffer attribute
	 * @param array
	 * @param itemSize
	 * @param [normalized]
	 * @returns uint32 buffer attribute
	 */
	public static getUint32BufferAttribute(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): I3JS.IBufferAttribute {
		return new THREE.Uint32BufferAttribute(array, itemSize, normalized);
	}

	/**
	 * Gets float16 buffer attribute
	 * @param array
	 * @param itemSize
	 * @param [normalized]
	 * @returns float16 buffer attribute
	 */
	public static getFloat16BufferAttribute(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): I3JS.IBufferAttribute {
		return new THREE.Float16BufferAttribute(array, itemSize, normalized);
	}

	/**
	 * Gets float32 buffer attribute
	 * @param array
	 * @param itemSize
	 * @param [normalized]
	 * @returns float32 buffer attribute
	 */
	public static getFloat32BufferAttribute(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): I3JS.IBufferAttribute {
		return new THREE.Float32BufferAttribute(array, itemSize, normalized);
	}

	/**
	 * Gets float64 buffer attribute
	 * @param array
	 * @param itemSize
	 * @param [normalized]
	 * @returns float64 buffer attribute
	 */
	public static getFloat64BufferAttribute(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	): I3JS.IBufferAttribute {
		return new THREE.Float64BufferAttribute(array, itemSize, normalized);
	}

	/**
	 * Gets buffer geometry
	 *
	 * @returns buffer geometry
	 */
	public static getBufferGeometry(): I3JS.IBufferGeometry {
		return new THREE.BufferGeometry();
	}

	/**
	 * Gets clock
	 *
	 * @param [autoStart]
	 * @returns clock
	 */
	public static getClock(autoStart?: boolean): I3JS.IClock {
		return new THREE.Clock(autoStart);
	}

	/**
	 * Gets event dispatcher
	 *
	 * @returns event dispatcher
	 */
	public static getEventDispatcher(): I3JS.IEventDispatcher {
		return new THREE.EventDispatcher();
	}

	/**
	 * Gets glbuffer attribute
	 *
	 * @param buffer
	 * @param type
	 * @param itemSize
	 * @param elementSize
	 * @param count
	 * @returns glbuffer attribute
	 */
	public static getGLBufferAttribute(
		buffer: WebGLBuffer,
		type: number,
		itemSize: number,
		elementSize: 1 | 2 | 4,
		count: number
	): I3JS.IGLBufferAttribute {
		return new THREE.GLBufferAttribute(
			buffer,
			type,
			itemSize,
			elementSize,
			count
		);
	}

	/**
	 * Gets instanced buffer attribute
	 *
	 * @param array
	 * @param itemSize
	 * @param [normalized]
	 * @param [meshPerAttribute]
	 * @returns instanced buffer attribute
	 */
	public static getInstancedBufferAttribute(
		array: ArrayLike<number>,
		itemSize: number,
		normalized?: boolean,
		meshPerAttribute?: number
	): I3JS.IInstancedBufferAttribute {
		return new THREE.InstancedBufferAttribute(
			array,
			itemSize,
			normalized,
			meshPerAttribute
		);
	}

	/**
	 * Gets instanced buffer geometry
	 *
	 * @returns instanced buffer geometry
	 */
	public static getInstancedBufferGeometry(): I3JS.IInstancedBufferGeometry {
		return new THREE.InstancedBufferGeometry();
	}

	/**
	 * Gets instanced interleaved buffer
	 *
	 * @param array
	 * @param stride
	 * @param [meshPerAttribute]
	 * @returns instanced interleaved buffer
	 */
	public static getInstancedInterleavedBuffer(
		array: ArrayLike<number>,
		stride: number,
		meshPerAttribute?: number
	): I3JS.IInstancedInterleavedBuffer {
		return new THREE.InstancedInterleavedBuffer(
			array,
			stride,
			meshPerAttribute
		);
	}

	/**
	 * Gets interleaved buffer
	 *
	 * @param array
	 * @param stride
	 * @returns interleaved buffer
	 */
	public static getInterleavedBuffer(
		array: ArrayLike<number>,
		stride: number
	): I3JS.IInterleavedBuffer {
		return new THREE.InterleavedBuffer(array, stride);
	}

	/**
	 * Gets interleaved buffer attribute
	 *
	 * @param interleavedBuffer
	 * @param itemSize
	 * @param offset
	 * @param [normalized]
	 * @returns interleaved buffer attribute
	 */
	public static getInterleavedBufferAttribute(
		interleavedBuffer: I3JS.IInterleavedBuffer,
		itemSize: number,
		offset: number,
		normalized?: boolean
	): I3JS.IInterleavedBufferAttribute {
		return new THREE.InterleavedBufferAttribute(
			interleavedBuffer,
			itemSize,
			offset,
			normalized
		);
	}

	/**
	 * Gets layers
	 *
	 * @returns layers
	 */
	public static getLayers(): I3JS.ILayers {
		return new THREE.Layers();
	}

	/**
	 * Gets object3 d
	 *
	 * @returns object3 d
	 */
	public static getObject3D(): I3JS.IObject3D {
		return new THREE.Object3D();
	}

	/**
	 * Gets raycaster
	 *
	 * @param [origin]
	 * @param [direction]
	 * @param [near]
	 * @param [far]
	 * @returns raycaster
	 */
	public static getRaycaster(
		origin?: I3JS.IVector3,
		direction?: I3JS.IVector3,
		near?: number,
		far?: number
	): I3JS.IRaycaster {
		return new THREE.Raycaster(origin, direction, near, far);
	}

	/**
	 * Gets uniform
	 *
	 * @param value
	 * @returns uniform
	 */
	public static getUniform(value: any): I3JS.IUniform {
		return new THREE.Uniform(value);
	}

	/**
	 * Gets box geometry
	 * @param [width]
	 * @param [height]
	 * @param [depth]
	 * @param [widthSegments]
	 * @param [heightSegments]
	 * @param [depthSegments]
	 * @returns box geometry
	 */
	public static getBoxGeometry(
		width?: number,
		height?: number,
		depth?: number,
		widthSegments?: number,
		heightSegments?: number,
		depthSegments?: number
	): I3JS.IBufferGeometry {
		return new THREE.BoxGeometry(
			width,
			height,
			depth,
			widthSegments,
			heightSegments,
			depthSegments
		);
	}

	/**
	 * Gets circle geometry
	 * @param [radius]
	 * @param [segments]
	 * @param [thetaStart]
	 * @param [thetaLength]
	 * @returns circle geometry
	 */
	public static getCircleGeometry(
		radius?: number,
		segments?: number,
		thetaStart?: number,
		thetaLength?: number
	): I3JS.IBufferGeometry {
		return new THREE.CircleGeometry(radius, segments, thetaStart, thetaLength);
	}

	/**
	 * Gets cone geometry
	 * @param [radius]
	 * @param [height]
	 * @param [radialSegments]
	 * @param [heightSegments]
	 * @param [openEnded]
	 * @param [thetaStart]
	 * @param [thetaLength]
	 * @returns cone geometry
	 */
	public static getConeGeometry(
		radius?: number,
		height?: number,
		radialSegments?: number,
		heightSegments?: number,
		openEnded?: boolean,
		thetaStart?: number,
		thetaLength?: number
	): I3JS.IBufferGeometry {
		return new THREE.ConeGeometry(
			radius,
			height,
			radialSegments,
			heightSegments,
			openEnded,
			thetaStart,
			thetaLength
		);
	}

	/**
	 * Gets cylinder geometry
	 * @param [radiusTop]
	 * @param [radiusBottom]
	 * @param [height]
	 * @param [radialSegments]
	 * @param [heightSegments]
	 * @param [openEnded]
	 * @param [thetaStart]
	 * @param [thetaLength]
	 * @returns cylinder geometry
	 */
	public static getCylinderGeometry(
		radiusTop?: number,
		radiusBottom?: number,
		height?: number,
		radialSegments?: number,
		heightSegments?: number,
		openEnded?: boolean,
		thetaStart?: number,
		thetaLength?: number
	): I3JS.IBufferGeometry {
		return new THREE.CylinderGeometry(
			radiusTop,
			radiusBottom,
			height,
			radialSegments,
			heightSegments,
			openEnded,
			thetaStart,
			thetaLength
		);
	}

	/**
	 * Gets dodecahedron geometry
	 * @param [radius]
	 * @param [detail]
	 * @returns dodecahedron geometry
	 */
	public static getDodecahedronGeometry(
		radius?: number,
		detail?: number
	): I3JS.IBufferGeometry {
		return new THREE.DodecahedronGeometry(radius, detail);
	}

	/**
	 * Gets edges geometry
	 * @param [geometry]
	 * @param [thresholdAngle]
	 * @returns edges geometry
	 */
	public static getEdgesGeometry(
		geometry?: I3JS.IBufferGeometry,
		thresholdAngle?: number
	): I3JS.IBufferGeometry {
		return new THREE.EdgesGeometry(geometry, thresholdAngle);
	}

	/**
	 * Gets extrude geometry
	 * @param [shapes]
	 * @param [options]
	 * @returns extrude geometry
	 */
	public static getExtrudeGeometry(
		shapes?: I3JS.IShape | I3JS.IShape[],
		options?: THREE.ExtrudeGeometryOptions
	): I3JS.IExtrudeGeometry {
		return new THREE.ExtrudeGeometry(shapes, options);
	}

	/**
	 * Gets icosahedron geometry
	 * @param [radius]
	 * @param [detail]
	 * @returns icosahedron geometry
	 */
	public static getIcosahedronGeometry(
		radius?: number,
		detail?: number
	): I3JS.IBufferGeometry {
		return new THREE.IcosahedronGeometry(radius, detail);
	}

	/**
	 * Gets lathe geometry
	 * @param [points]
	 * @param [segments]
	 * @param [phiStart]
	 * @param [phiLength]
	 * @returns lathe geometry
	 */
	public static getLatheGeometry(
		points?: I3JS.IVector2[],
		segments?: number,
		phiStart?: number,
		phiLength?: number
	): I3JS.IBufferGeometry {
		return new THREE.LatheGeometry(points, segments, phiStart, phiLength);
	}

	/**
	 * Gets octahedron geometry
	 * @param [radius]
	 * @param [detail]
	 * @returns octahedron geometry
	 */
	public static getOctahedronGeometry(
		radius?: number,
		detail?: number
	): I3JS.IBufferGeometry {
		return new THREE.OctahedronGeometry(radius, detail);
	}

	/**
	 * Gets plane geometry
	 * @param [width]
	 * @param [height]
	 * @param [widthSegments]
	 * @param [heightSegments]
	 * @returns plane geometry
	 */
	public static getPlaneGeometry(
		width?: number,
		height?: number,
		widthSegments?: number,
		heightSegments?: number
	): I3JS.IBufferGeometry {
		return new THREE.PlaneGeometry(
			width,
			height,
			widthSegments,
			heightSegments
		);
	}

	/**
	 * Gets polyhedron geometry
	 * @param [vertices]
	 * @param [indices]
	 * @param [radius]
	 * @param [detail]
	 * @returns polyhedron geometry
	 */
	public static getPolyhedronGeometry(
		vertices?: number[],
		indices?: number[],
		radius?: number,
		detail?: number
	): I3JS.IBufferGeometry {
		return new THREE.PolyhedronGeometry(vertices, indices, radius, detail);
	}

	/**
	 * Gets ring geometry
	 * @param [innerRadius]
	 * @param [outerRadius]
	 * @param [thetaSegments]
	 * @param [phiSegments]
	 * @param [thetaStart]
	 * @param [thetaLength]
	 * @returns ring geometry
	 */
	public static getRingGeometry(
		innerRadius?: number,
		outerRadius?: number,
		thetaSegments?: number,
		phiSegments?: number,
		thetaStart?: number,
		thetaLength?: number
	): I3JS.IBufferGeometry {
		return new THREE.RingGeometry(
			innerRadius,
			outerRadius,
			thetaSegments,
			phiSegments,
			thetaStart,
			thetaLength
		);
	}

	/**
	 * Gets shape geometry
	 * @param [shapes]
	 * @param [curveSegments]
	 * @returns shape geometry
	 */
	public static getShapeGeometry(
		shapes?: I3JS.IShape | I3JS.IShape[],
		curveSegments?: number
	): I3JS.IBufferGeometry {
		return new THREE.ShapeGeometry(shapes, curveSegments);
	}

	/**
	 * Gets sphere geometry
	 * @param [radius]
	 * @param [widthSegments]
	 * @param [heightSegments]
	 * @param [phiStart]
	 * @param [phiLength]
	 * @param [thetaStart]
	 * @param [thetaLength]
	 * @returns sphere geometry
	 */
	public static getSphereGeometry(
		radius?: number,
		widthSegments?: number,
		heightSegments?: number,
		phiStart?: number,
		phiLength?: number,
		thetaStart?: number,
		thetaLength?: number
	): I3JS.IBufferGeometry {
		return new THREE.SphereGeometry(
			radius,
			widthSegments,
			heightSegments,
			phiStart,
			phiLength,
			thetaStart,
			thetaLength
		);
	}

	/**
	 * Gets tetrahedron geometry
	 * @param [radius]
	 * @param [detail]
	 * @returns tetrahedron geometry
	 */
	public static getTetrahedronGeometry(
		radius?: number,
		detail?: number
	): I3JS.IBufferGeometry {
		return new THREE.TetrahedronGeometry(radius, detail);
	}

	/**
	 * Gets torus geometry
	 * @param [radius]
	 * @param [tube]
	 * @param [radialSegments]
	 * @param [tubularSegments]
	 * @param [arc]
	 * @returns torus geometry
	 */
	public static getTorusGeometry(
		radius?: number,
		tube?: number,
		radialSegments?: number,
		tubularSegments?: number,
		arc?: number
	): I3JS.IBufferGeometry {
		return new THREE.TorusGeometry(
			radius,
			tube,
			radialSegments,
			tubularSegments,
			arc
		);
	}

	/**
	 * Gets torus knot geometry
	 * @param [radius]
	 * @param [tube]
	 * @param [tubularSegments]
	 * @param [radialSegments]
	 * @param [p]
	 * @param [q]
	 * @returns torus knot geometry
	 */
	public static getTorusKnotGeometry(
		radius?: number,
		tube?: number,
		tubularSegments?: number,
		radialSegments?: number,
		p?: number,
		q?: number
	): I3JS.IBufferGeometry {
		return new THREE.TorusKnotGeometry(
			radius,
			tube,
			tubularSegments,
			radialSegments,
			p,
			q
		);
	}

	/**
	 * Gets tube geometry
	 * @param [path]
	 * @param [tubularSegments]
	 * @param [radius]
	 * @param [radiusSegments]
	 * @param [closed]
	 * @returns tube geometry
	 */
	public static getTubeGeometry(
		path?: I3JS.ICurve<I3JS.IVector3>,
		tubularSegments?: number,
		radius?: number,
		radiusSegments?: number,
		closed?: boolean
	): I3JS.IBufferGeometry {
		return new THREE.TubeGeometry(
			path,
			tubularSegments,
			radius,
			radiusSegments,
			closed
		);
	}

	/**
	 * Gets wireframe geometry
	 * @param [geometry]
	 * @returns wireframe geometry
	 */
	public static getWireframeGeometry(
		geometry?: I3JS.IBufferGeometry
	): I3JS.IBufferGeometry {
		return new THREE.WireframeGeometry(geometry);
	}

	public static getAmbientLight(
		color?: I3JS.TColorRepresentation,
		intensity?: number
	): I3JS.IAmbientLight {
		return new THREE.AmbientLight(color, intensity);
	}

	public static getAmbientLightProbe(
		color?: I3JS.TColorRepresentation,
		intensity?: number
	): I3JS.IAmbientLightProbe {
		return new THREE.AmbientLightProbe(color, intensity);
	}

	public static getDirectionalLight(
		color?: I3JS.TColorRepresentation,
		intensity?: number
	): I3JS.IDirectionalLight {
		return new THREE.DirectionalLight(color, intensity);
	}

	// public static getDirectionalLightShadow(camera: I3JS.ICamera): I3JS.IDirectionalLightShadow {
	//	return new THREE.DirectionalLightShadow(camera);
	// }

	public static getHemisphereLight(
		skyColor?: I3JS.TColorRepresentation,
		groundColor?: I3JS.TColorRepresentation,
		intensity?: number
	): I3JS.IHemisphereLight {
		return new THREE.HemisphereLight(skyColor, groundColor, intensity);
	}

	public static getHemisphereLightProbe(
		skyColor?: I3JS.TColorRepresentation,
		groundColor?: I3JS.TColorRepresentation,
		intensity?: number
	): I3JS.IHemisphereLightProbe {
		return new THREE.HemisphereLightProbe(skyColor, groundColor, intensity);
	}

	public static getLight(
		hex?: number | string,
		intensity?: number
	): I3JS.ILight {
		return new THREE.Light(hex, intensity);
	}

	public static getLightProbe(
		sh?: I3JS.ISphericalHarmonics3,
		intensity?: number
	): I3JS.ILightProbe {
		return new THREE.LightProbe(sh, intensity);
	}

	// public static getLightShadow(camera: I3JS.ICamera): I3JS.ILightShadow {
	//	return new THREE.LightShadow(camera);
	// }

	public static getPointLight(
		color?: I3JS.TColorRepresentation,
		intensity?: number,
		distance?: number,
		decay?: number
	): I3JS.IPointLight {
		return new THREE.PointLight(color, intensity, distance, decay);
	}

	// public static getPointLightShadow(camera: I3JS.ICamera): I3JS.IPointLightShadow {
	//	return new THREE.PointLightShadow(camera);
	// }

	public static getRectAreaLight(
		color?: I3JS.TColorRepresentation,
		intensity?: number,
		width?: number,
		height?: number
	): I3JS.IRectAreaLight {
		return new THREE.RectAreaLight(color, intensity, width, height);
	}

	public static getSpotLight(
		color?: I3JS.TColorRepresentation,
		intensity?: number,
		distance?: number,
		angle?: number,
		penumbra?: number,
		decay?: number
	): I3JS.ISpotLight {
		return new THREE.SpotLight(
			color,
			intensity,
			distance,
			angle,
			penumbra,
			decay
		);
	}

	// public static getSpotLightShadow(camera: I3JS.ICamera): I3JS.ISpotLightShadow {
	//	return new THREE.SpotLightShadow(camera);
	// }

	public static getArrayCamera(
		cameras?: I3JS.IPerspectiveCamera[]
	): I3JS.IArrayCamera {
		return new THREE.ArrayCamera(cameras);
	}

	public static getCamera(): I3JS.ICamera {
		return new THREE.Camera();
	}

	public static getCubeCamera(
		near: number,
		far: number,
		renderTarget: I3JS.IWebGLCubeRenderTarget
	): I3JS.ICubeCamera {
		return new THREE.CubeCamera(near, far, renderTarget);
	}

	public static getOrthographicCamera(
		left: number,
		right: number,
		top: number,
		bottom: number,
		near?: number,
		far?: number
	): I3JS.IOrthographicCamera {
		return new THREE.OrthographicCamera(left, right, top, bottom, near, far);
	}

	public static getPerspectiveCamera(
		fov?: number,
		aspect?: number,
		near?: number,
		far?: number
	): I3JS.IPerspectiveCamera {
		return new THREE.PerspectiveCamera(fov, aspect, near, far);
	}

	public static getStereoCamera(): I3JS.IStereoCamera {
		return new THREE.StereoCamera();
	}

	public static getAudio(listener: I3JS.IAudioListener): I3JS.IAudio {
		return new THREE.Audio(listener);
	}

	public static getAudioAnalyser(
		audio: I3JS.IAudio<AudioNode>,
		fftSize?: number
	): I3JS.IAudioAnalyser {
		return new THREE.AudioAnalyser(audio, fftSize);
	}

	public static getAudioListener(): I3JS.IAudioListener {
		return new THREE.AudioListener();
	}

	public static getPositionalAudio(
		listener: I3JS.IAudioListener
	): I3JS.IPositionalAudio {
		return new THREE.PositionalAudio(listener);
	}

	// public static getAnimationAction(mixer: I3JS.IAnimationMixer, clip: I3JS.IAnimationClip, localRoot?: I3JS.IObject3D, blendMode?: THREE.AnimationBlendMode): I3JS.IAnimationAction {
	//	return new THREE.AnimationAction(mixer, clip, localRoot, blendMode);
	// }

	public static getAnimationClip(
		name?: string,
		duration?: number,
		tracks?: I3JS.IKeyframeTrack[],
		blendMode?: THREE.AnimationBlendMode
	): I3JS.IAnimationClip {
		return new THREE.AnimationClip(name, duration, tracks, blendMode);
	}

	public static getAnimationMixer(
		root: I3JS.IObject3D | I3JS.IAnimationObjectGroup
	): I3JS.IAnimationMixer {
		return new THREE.AnimationMixer(root);
	}

	public static getAnimationObjectGroup(
		...args: any[]
	): I3JS.IAnimationObjectGroup {
		return new THREE.AnimationObjectGroup(...args);
	}

	public static AnimationUtils: I3JS.IAnimationUtils = THREE.AnimationUtils;

	public static getBooleanKeyframeTrack(
		name: string,
		times: any[],
		values: any[]
	): I3JS.IKeyframeTrack {
		return new THREE.BooleanKeyframeTrack(name, times, values);
	}

	public static getColorKeyframeTrack(
		name: string,
		times: any[],
		values: any[],
		interpolation?: THREE.InterpolationModes
	): I3JS.IKeyframeTrack {
		return new THREE.ColorKeyframeTrack(name, times, values, interpolation);
	}

	public static getNumberKeyframeTrack(
		name: string,
		times: any[],
		values: any[],
		interpolation?: THREE.InterpolationModes
	): I3JS.IKeyframeTrack {
		return new THREE.NumberKeyframeTrack(name, times, values, interpolation);
	}

	public static getQuaternionKeyframeTrack(
		name: string,
		times: any[],
		values: any[],
		interpolation?: THREE.InterpolationModes
	): I3JS.IKeyframeTrack {
		return new THREE.QuaternionKeyframeTrack(
			name,
			times,
			values,
			interpolation
		);
	}

	public static getStringKeyframeTrack(
		name: string,
		times: any[],
		values: any[],
		interpolation?: THREE.InterpolationModes
	): I3JS.IKeyframeTrack {
		return new THREE.StringKeyframeTrack(name, times, values, interpolation);
	}

	public static getVectorKeyframeTrack(
		name: string,
		times: any[],
		values: any[],
		interpolation?: THREE.InterpolationModes
	): I3JS.IKeyframeTrack {
		return new THREE.VectorKeyframeTrack(name, times, values, interpolation);
	}

	public static getArrowHelper(
		dir?: I3JS.IVector3,
		origin?: I3JS.IVector3,
		length?: number,
		color?: I3JS.TColorRepresentation,
		headLength?: number,
		headWidth?: number
	): I3JS.IArrowHelper {
		return new THREE.ArrowHelper(
			dir,
			origin,
			length,
			color,
			headLength,
			headWidth
		);
	}

	public static getAxesHelper(size?: number): I3JS.IAxesHelper {
		return new THREE.AxesHelper(size);
	}

	public static getBox3Helper(
		box: I3JS.IBox3,
		color?: I3JS.IColor
	): I3JS.IBox3Helper {
		return new THREE.Box3Helper(box, color);
	}

	public static getBoxHelper(
		object: I3JS.IObject3D,
		color?: I3JS.TColorRepresentation
	): I3JS.IBoxHelper {
		return new THREE.BoxHelper(object, color);
	}

	public static getCameraHelper(camera: I3JS.ICamera): I3JS.ICameraHelper {
		return new THREE.CameraHelper(camera);
	}

	public static getDirectionalLightHelper(
		light: I3JS.IDirectionalLight,
		size?: number,
		color?: I3JS.TColorRepresentation
	): I3JS.IDirectionalLightHelper {
		return new THREE.DirectionalLightHelper(light, size, color);
	}

	public static getGridHelper(
		size?: number,
		divisions?: number,
		color1?: I3JS.TColorRepresentation,
		color2?: I3JS.TColorRepresentation
	): I3JS.IGridHelper {
		return new THREE.GridHelper(size, divisions, color1, color2);
	}

	public static getHemisphereLightHelper(
		light: I3JS.IHemisphereLight,
		size: number,
		color?: I3JS.TColorRepresentation
	): I3JS.IHemisphereLightHelper {
		return new THREE.HemisphereLightHelper(light, size, color);
	}

	public static getPlaneHelper(
		plane: I3JS.IPlane,
		size?: number,
		hex?: number
	): I3JS.IPlaneHelper {
		return new THREE.PlaneHelper(plane, size, hex);
	}

	public static getPointLightHelper(
		light: I3JS.IPointLight,
		sphereSize?: number,
		color?: I3JS.TColorRepresentation
	): I3JS.IPointLightHelper {
		return new THREE.PointLightHelper(light, sphereSize, color);
	}

	public static getPolarGridHelper(
		radius?: number,
		radials?: number,
		circles?: number,
		divisions?: number,
		color1?: I3JS.TColorRepresentation,
		color2?: I3JS.TColorRepresentation
	): I3JS.IPolarGridHelper {
		return new THREE.PolarGridHelper(
			radius,
			radials,
			circles,
			divisions,
			color1,
			color2
		);
	}

	public static getSkeletonHelper(
		object: I3JS.IObject3D
	): I3JS.ISkeletonHelper {
		return new THREE.SkeletonHelper(object);
	}

	public static getSpotLightHelper(
		light: I3JS.ILight,
		color?: I3JS.TColorRepresentation
	): I3JS.ISpotLightHelper {
		return new THREE.SpotLightHelper(light, color);
	}

	public static getLineBasicMaterial(
		parameters?: THREE.LineBasicMaterialParameters
	): I3JS.ILineBasicMaterial {
		return new THREE.LineBasicMaterial(parameters);
	}

	public static getLineDashedMaterial(
		parameters?: THREE.LineDashedMaterialParameters
	): I3JS.ILineDashedMaterial {
		return new THREE.LineDashedMaterial(parameters);
	}

	public static getMaterial(): I3JS.IMaterial {
		return new THREE.Material();
	}

	public static getMeshBasicMaterial(
		parameters?: THREE.MeshBasicMaterialParameters
	): I3JS.IMeshBasicMaterial {
		return new THREE.MeshBasicMaterial(parameters);
	}

	public static getMeshDepthMaterial(
		parameters?: THREE.MeshDepthMaterialParameters
	): I3JS.IMeshDepthMaterial {
		return new THREE.MeshDepthMaterial(parameters);
	}

	public static getMeshDistanceMaterial(
		parameters?: THREE.MeshDistanceMaterialParameters
	): I3JS.IMeshDistanceMaterial {
		return new THREE.MeshDistanceMaterial(parameters);
	}

	public static getMeshLambertMaterial(
		parameters?: THREE.MeshLambertMaterialParameters
	): I3JS.IMeshLambertMaterial {
		return new THREE.MeshLambertMaterial(parameters);
	}

	public static getMeshMatcapMaterial(
		parameters?: THREE.MeshMatcapMaterialParameters
	): I3JS.IMeshMatcapMaterial {
		return new THREE.MeshMatcapMaterial(parameters);
	}

	public static getMeshNormalMaterial(
		parameters?: THREE.MeshNormalMaterialParameters
	): I3JS.IMeshNormalMaterial {
		return new THREE.MeshNormalMaterial(parameters);
	}

	public static getMeshPhongMaterial(
		parameters?: THREE.MeshPhongMaterialParameters
	): I3JS.IMeshPhongMaterial {
		return new THREE.MeshPhongMaterial(parameters);
	}

	public static getMeshPhysicalMaterial(
		parameters?: THREE.MeshPhysicalMaterialParameters
	): I3JS.IMeshPhysicalMaterial {
		return new THREE.MeshPhysicalMaterial(parameters);
	}

	public static getMeshStandardMaterial(
		parameters?: THREE.MeshStandardMaterialParameters
	): I3JS.IMeshStandardMaterial {
		return new THREE.MeshStandardMaterial(parameters);
	}

	public static getMeshToonMaterial(
		parameters?: THREE.MeshToonMaterialParameters
	): I3JS.IMeshToonMaterial {
		return new THREE.MeshToonMaterial(parameters);
	}

	public static getPointsMaterial(
		parameters?: THREE.PointsMaterialParameters
	): I3JS.IPointsMaterial {
		return new THREE.PointsMaterial(parameters);
	}

	public static getRawShaderMaterial(
		parameters?: THREE.ShaderMaterialParameters
	): I3JS.IRawShaderMaterial {
		return new THREE.RawShaderMaterial(parameters);
	}

	public static getShaderMaterial(
		parameters?: THREE.ShaderMaterialParameters
	): I3JS.IShaderMaterial {
		return new THREE.ShaderMaterial(parameters);
	}

	public static getShadowMaterial(
		parameters?: THREE.ShadowMaterialParameters
	): I3JS.IShadowMaterial {
		return new THREE.ShadowMaterial(parameters);
	}

	public static getSpriteMaterial(
		parameters?: THREE.SpriteMaterialParameters
	): I3JS.ISpriteMaterial {
		return new THREE.SpriteMaterial(parameters);
	}

	public static getBone(): I3JS.IBone {
		return new THREE.Bone();
	}

	public static getGroup(): I3JS.IGroup {
		return new THREE.Group();
	}

	public static getInstancedMesh(
		geometry: I3JS.IBufferGeometry,
		material: I3JS.IMaterial | I3JS.IMaterial[],
		count: number
	): I3JS.IInstancedMesh {
		return new THREE.InstancedMesh(geometry, material, count);
	}

	public static getLine(
		geometry: I3JS.IBufferGeometry,
		material: I3JS.IMaterial | I3JS.IMaterial[]
	): I3JS.ILine {
		return new THREE.Line(geometry, material);
	}

	public static getLineLoop(
		geometry: I3JS.IBufferGeometry,
		material: I3JS.IMaterial | I3JS.IMaterial[]
	): I3JS.ILineLoop {
		return new THREE.LineLoop(geometry, material);
	}

	public static getLineSegments(
		geometry: I3JS.IBufferGeometry,
		material: I3JS.IMaterial | I3JS.IMaterial[]
	): I3JS.ILineSegments {
		return new THREE.LineSegments(geometry, material);
	}

	public static getLOD(): I3JS.ILOD {
		return new THREE.LOD();
	}

	public static getMesh(
		geometry: I3JS.IBufferGeometry,
		material: I3JS.IMaterial | I3JS.IMaterial[]
	): I3JS.IMesh {
		return new THREE.Mesh(geometry, material);
	}

	public static getPoints(
		geometry: I3JS.IBufferGeometry,
		material: I3JS.IMaterial | I3JS.IMaterial[]
	): I3JS.IPoints {
		return new THREE.Points(geometry, material);
	}

	public static getSkeleton(
		bones: I3JS.IBone[],
		boneInverses?: I3JS.IMatrix4[]
	): I3JS.ISkeleton {
		return new THREE.Skeleton(bones, boneInverses);
	}

	public static getSkinnedMesh(
		geometry: I3JS.IBufferGeometry,
		material: I3JS.IMaterial | I3JS.IMaterial[],
		useVertexTexture?: boolean
	): I3JS.ISkinnedMesh {
		return new THREE.SkinnedMesh(geometry, material, useVertexTexture);
	}

	public static getSprite(material?: I3JS.ISpriteMaterial): I3JS.ISprite {
		return new THREE.Sprite(material);
	}

	public static getWebGL1Renderer(
		parameters?: THREE.WebGLRendererParameters
	): I3JS.IWebGL1Renderer {
		return new THREE.WebGL1Renderer(parameters);
	}

	public static getWebGLCubeRenderTarget(
		size: number,
		options?: THREE.WebGLRenderTargetOptions
	): I3JS.IWebGLCubeRenderTarget {
		return new THREE.WebGLCubeRenderTarget(size, options);
	}

	public static getWebGLMultipleRenderTargets(
		width: number,
		height: number,
		count: number
	): I3JS.IWebGLMultipleRenderTargets {
		return new THREE.WebGLMultipleRenderTargets(width, height, count);
	}

	public static getWebGLMultisampleRenderTarget(
		width: number,
		height: number,
		options?: THREE.WebGLRenderTargetOptions
	): I3JS.IWebGLMultisampleRenderTarget {
		return new THREE.WebGLMultisampleRenderTarget(width, height, options);
	}

	public static getWebGLRenderer(
		parameters?: THREE.WebGLRendererParameters
	): I3JS.IWebGLRenderer {
		return new THREE.WebGLRenderer(parameters);
	}

	public static getWebGLRenderTarget(
		width: number,
		height: number,
		options?: THREE.WebGLRenderTargetOptions
	): I3JS.IWebGLRenderTarget {
		return new THREE.WebGLRenderTarget(width, height, options);
	}

	public static getFog(
		color: I3JS.TColorRepresentation,
		near?: number,
		far?: number
	): I3JS.IFog {
		return new THREE.Fog(color, near, far);
	}

	public static getFogExp2(
		hex: number | string,
		density?: number
	): I3JS.IFogExp2 {
		return new THREE.FogExp2(hex, density);
	}

	public static getScene(): I3JS.IScene {
		return new THREE.Scene();
	}

	public static getCanvasTexture(
		canvas:
			| HTMLImageElement
			| HTMLCanvasElement
			| HTMLVideoElement
			| ImageBitmap,
		mapping?: THREE.Mapping,
		wrapS?: THREE.Wrapping,
		wrapT?: THREE.Wrapping,
		magFilter?: THREE.TextureFilter,
		minFilter?: THREE.TextureFilter,
		format?: THREE.PixelFormat,
		type?: THREE.TextureDataType,
		anisotropy?: number
	): I3JS.ICanvasTexture {
		return new THREE.CanvasTexture(
			canvas,
			mapping,
			wrapS,
			wrapT,
			magFilter,
			minFilter,
			format,
			type,
			anisotropy
		);
	}

	public static getCompressedTexture(
		mipmaps: ImageData[],
		width: number,
		height: number,
		format?: THREE.CompressedPixelFormat,
		type?: THREE.TextureDataType,
		mapping?: THREE.Mapping,
		wrapS?: THREE.Wrapping,
		wrapT?: THREE.Wrapping,
		magFilter?: THREE.TextureFilter,
		minFilter?: THREE.TextureFilter,
		anisotropy?: number,
		encoding?: THREE.TextureEncoding
	): I3JS.ICompressedTexture {
		return new THREE.CompressedTexture(
			mipmaps,
			width,
			height,
			format,
			type,
			mapping,
			wrapS,
			wrapT,
			magFilter,
			minFilter,
			anisotropy,
			encoding
		);
	}

	public static getCubeTexture(
		images?: any[], // HTMLImageElement or HTMLCanvasElement
		mapping?: THREE.Mapping,
		wrapS?: THREE.Wrapping,
		wrapT?: THREE.Wrapping,
		magFilter?: THREE.TextureFilter,
		minFilter?: THREE.TextureFilter,
		format?: THREE.PixelFormat,
		type?: THREE.TextureDataType,
		anisotropy?: number,
		encoding?: THREE.TextureEncoding
	): I3JS.ICubeTexture {
		return new THREE.CubeTexture(
			images,
			mapping,
			wrapS,
			wrapT,
			magFilter,
			minFilter,
			format,
			type,
			anisotropy,
			encoding
		);
	}

	public static getDataTexture(
		data?: BufferSource | null,
		width?: number,
		height?: number,
		format?: THREE.PixelFormat,
		type?: THREE.TextureDataType,
		mapping?: THREE.Mapping,
		wrapS?: THREE.Wrapping,
		wrapT?: THREE.Wrapping,
		magFilter?: THREE.TextureFilter,
		minFilter?: THREE.TextureFilter,
		anisotropy?: number,
		encoding?: THREE.TextureEncoding
	): I3JS.IDataTexture {
		return new THREE.DataTexture(
			data,
			width,
			height,
			format,
			type,
			mapping,
			wrapS,
			wrapT,
			magFilter,
			minFilter,
			anisotropy,
			encoding
		);
	}

	public static getDataTexture2DArray(
		data?: BufferSource,
		width?: number,
		height?: number,
		depth?: number
	): I3JS.IDataTexture2DArray {
		return new THREE.DataTexture2DArray(data, width, height, depth);
	}

	public static getDataTexture3D(
		data: BufferSource,
		width: number,
		height: number,
		depth: number
	): I3JS.IDataTexture3D {
		return new THREE.DataTexture3D(data, width, height, depth);
	}

	public static getDepthTexture(
		width: number,
		height: number,
		type?: THREE.TextureDataType,
		mapping?: THREE.Mapping,
		wrapS?: THREE.Wrapping,
		wrapT?: THREE.Wrapping,
		magFilter?: THREE.TextureFilter,
		minFilter?: THREE.TextureFilter,
		anisotropy?: number
	): I3JS.IDepthTexture {
		return new THREE.DepthTexture(
			width,
			height,
			type,
			mapping,
			wrapS,
			wrapT,
			magFilter,
			minFilter,
			anisotropy
		);
	}

	public static getTexture(
		image?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
		mapping?: THREE.Mapping,
		wrapS?: THREE.Wrapping,
		wrapT?: THREE.Wrapping,
		magFilter?: THREE.TextureFilter,
		minFilter?: THREE.TextureFilter,
		format?: THREE.PixelFormat,
		type?: THREE.TextureDataType,
		anisotropy?: number,
		encoding?: THREE.TextureEncoding
	): I3JS.ITexture {
		return new THREE.Texture(
			image,
			mapping,
			wrapS,
			wrapT,
			magFilter,
			minFilter,
			format,
			type,
			anisotropy,
			encoding
		);
	}

	public static getVideoTexture(
		video: HTMLVideoElement,
		mapping?: THREE.Mapping,
		wrapS?: THREE.Wrapping,
		wrapT?: THREE.Wrapping,
		magFilter?: THREE.TextureFilter,
		minFilter?: THREE.TextureFilter,
		format?: THREE.PixelFormat,
		type?: THREE.TextureDataType,
		anisotropy?: number
	): I3JS.IVideoTexture {
		return new THREE.VideoTexture(
			video,
			mapping,
			wrapS,
			wrapT,
			magFilter,
			minFilter,
			format,
			type,
			anisotropy
		);
	}

	/**
	 * Gets animation loader
	 * @param [manager]
	 * @returns animation loader
	 */
	public static getAnimationLoader(
		manager?: I3JS.ILoadingManager
	): I3JS.IAnimationLoader {
		return new THREE.AnimationLoader(manager);
	}

	/**
	 * Gets audio loader
	 * @param [manager]
	 * @returns audio loader
	 */
	public static getAudioLoader(
		manager?: I3JS.ILoadingManager
	): I3JS.IAudioLoader {
		return new THREE.AudioLoader(manager);
	}

	/**
	 * Gets buffer geometry loader
	 * @param [manager]
	 * @returns buffer geometry loader
	 */
	public static getBufferGeometryLoader(
		manager?: I3JS.ILoadingManager
	): I3JS.IBufferGeometryLoader {
		return new THREE.BufferGeometryLoader(manager);
	}

	/**
	 * Gets compressed texture loader
	 * @param [manager]
	 * @returns compressed texture loader
	 */
	public static getCompressedTextureLoader(
		manager?: I3JS.ILoadingManager
	): I3JS.ICompressedTextureLoader {
		return new THREE.CompressedTextureLoader(manager);
	}

	/**
	 * Gets cube texture loader
	 * @param [manager]
	 * @returns cube texture loader
	 */
	public static getCubeTextureLoader(
		manager?: I3JS.ILoadingManager
	): I3JS.ICubeTextureLoader {
		return new THREE.CubeTextureLoader(manager);
	}

	/**
	 * Gets data texture loader
	 * @param [manager]
	 * @returns data texture loader
	 */
	public static getDataTextureLoader(
		manager?: I3JS.ILoadingManager
	): I3JS.IDataTextureLoader {
		return new THREE.DataTextureLoader(manager);
	}

	/**
	 * Gets file loader
	 * @param [manager]
	 * @returns file loader
	 */
	public static getFileLoader(
		manager?: I3JS.ILoadingManager
	): I3JS.IFileLoader {
		return new THREE.FileLoader(manager);
	}

	/**
	 * Gets image bitmap loader
	 * @param [manager]
	 * @returns image bitmap loader
	 */
	public static getImageBitmapLoader(
		manager?: I3JS.ILoadingManager
	): I3JS.IImageBitmapLoader {
		return new THREE.ImageBitmapLoader(manager);
	}

	/**
	 * Gets image loader
	 * @param [manager]
	 * @returns image loader
	 */
	public static getImageLoader(
		manager?: I3JS.ILoadingManager
	): I3JS.IImageLoader {
		return new THREE.ImageLoader(manager);
	}

	/**
	 * Gets loader
	 * @param [manager]
	 * @returns loader
	 */
	public static getLoader(manager?: I3JS.ILoadingManager): I3JS.ILoader {
		return new THREE.Loader(manager);
	}

	/**
	 * Gets loader utils
	 */
	public static LoaderUtils: I3JS.ILoaderUtils = THREE.LoaderUtils;

	/**
	 * Gets loading manager
	 * @param [onLoad]
	 * @param [onProgress]
	 * @param [onError]
	 * @returns loading manager
	 */
	public static getLoadingManager(
		onLoad?: () => void,
		onProgress?: (url: string, loaded: number, total: number) => void,
		onError?: (url: string) => void
	): I3JS.ILoadingManager {
		return new THREE.LoadingManager(onLoad, onProgress, onError);
	}

	/**
	 * Gets material loader
	 * @param [manager]
	 * @returns material loader
	 */
	public static getMaterialLoader(
		manager?: I3JS.ILoadingManager
	): I3JS.IMaterialLoader {
		return new THREE.MaterialLoader(manager);
	}

	/**
	 * Gets object loader
	 * @param [manager]
	 * @returns object loader
	 */
	public static getObjectLoader(
		manager?: I3JS.ILoadingManager
	): I3JS.IObjectLoader {
		return new THREE.ObjectLoader(manager);
	}

	/**
	 * Gets texture loader
	 * @param [manager]
	 * @returns texture loader
	 */
	public static getTextureLoader(
		manager?: I3JS.ILoadingManager
	): I3JS.ITextureLoader {
		return new THREE.TextureLoader(manager);
	}

	/**
	 * Gets arc curve
	 *
	 * @param aX
	 * @param aY
	 * @param aRadius
	 * @param aStartAngle
	 * @param aEndAngle
	 * @param aClockwise
	 * @returns arc curve
	 */
	public static getArcCurve(
		aX: number,
		aY: number,
		aRadius: number,
		aStartAngle: number,
		aEndAngle: number,
		aClockwise: boolean
	): I3JS.ICurve<I3JS.IVector2> {
		return new THREE.ArcCurve(
			aX,
			aY,
			aRadius,
			aStartAngle,
			aEndAngle,
			aClockwise
		);
	}

	/**
	 * Gets catmull rom curve3
	 *
	 * @param [points]
	 * @param [closed]
	 * @param [curveType]
	 * @param [tension]
	 * @returns catmull rom curve3
	 */
	public static getCatmullRomCurve3(
		points?: I3JS.IVector3[],
		closed?: boolean,
		curveType?: string,
		tension?: number
	): I3JS.ICurve<I3JS.IVector3> {
		return new THREE.CatmullRomCurve3(points, closed, curveType, tension);
	}

	/**
	 * Gets cubic bezier curve
	 *
	 * @param v0
	 * @param v1
	 * @param v2
	 * @param v3
	 * @returns cubic bezier curve
	 */
	public static getCubicBezierCurve(
		v0: I3JS.IVector2,
		v1: I3JS.IVector2,
		v2: I3JS.IVector2,
		v3: I3JS.IVector2
	): I3JS.ICurve<I3JS.IVector2> {
		return new THREE.CubicBezierCurve(v0, v1, v2, v3);
	}

	/**
	 * Gets cubic bezier curve3
	 *
	 * @param v0
	 * @param v1
	 * @param v2
	 * @param v3
	 * @returns cubic bezier curve3
	 */
	public static getCubicBezierCurve3(
		v0: I3JS.IVector3,
		v1: I3JS.IVector3,
		v2: I3JS.IVector3,
		v3: I3JS.IVector3
	): I3JS.ICurve<I3JS.IVector3> {
		return new THREE.CubicBezierCurve3(v0, v1, v2, v3);
	}

	/**
	 * Gets ellipse curve
	 *
	 * @param aX
	 * @param aY
	 * @param xRadius
	 * @param yRadius
	 * @param aStartAngle
	 * @param aEndAngle
	 * @param aClockwise
	 * @param aRotation
	 * @returns ellipse curve
	 */
	public static getEllipseCurve(
		aX: number,
		aY: number,
		xRadius: number,
		yRadius: number,
		aStartAngle: number,
		aEndAngle: number,
		aClockwise: boolean,
		aRotation: number
	): I3JS.ICurve<I3JS.IVector2> {
		return new THREE.EllipseCurve(
			aX,
			aY,
			xRadius,
			yRadius,
			aStartAngle,
			aEndAngle,
			aClockwise,
			aRotation
		);
	}

	/**
	 * Gets line curve
	 *
	 * @param v1
	 * @param v2
	 * @returns line curve
	 */
	public static getLineCurve(
		v1: I3JS.IVector2,
		v2: I3JS.IVector2
	): I3JS.ICurve<I3JS.IVector2> {
		return new THREE.LineCurve(v1, v2);
	}

	/**
	 * Gets line curve3
	 *
	 * @param v1
	 * @param v2
	 * @returns line curve3
	 */
	public static getLineCurve3(
		v1: I3JS.IVector3,
		v2: I3JS.IVector3
	): I3JS.ICurve<I3JS.IVector3> {
		return new THREE.LineCurve3(v1, v2);
	}

	/**
	 * Gets quadratic bezier curve
	 *
	 * @param v0
	 * @param v1
	 * @param v2
	 * @returns quadratic bezier curve
	 */
	public static getQuadraticBezierCurve(
		v0: I3JS.IVector2,
		v1: I3JS.IVector2,
		v2: I3JS.IVector2
	): I3JS.ICurve<I3JS.IVector2> {
		return new THREE.QuadraticBezierCurve(v0, v1, v2);
	}

	/**
	 * Gets quadratic bezier curve3
	 *
	 * @param v0
	 * @param v1
	 * @param v2
	 * @returns quadratic bezier curve3
	 */
	public static getQuadraticBezierCurve3(
		v0: I3JS.IVector3,
		v1: I3JS.IVector3,
		v2: I3JS.IVector3
	): I3JS.ICurve<I3JS.IVector3> {
		return new THREE.QuadraticBezierCurve3(v0, v1, v2);
	}

	/**
	 * Gets spline curve
	 *
	 * @param [points]
	 * @returns spline curve
	 */
	public static getSplineCurve(
		points?: I3JS.IVector2[]
	): I3JS.ICurve<I3JS.IVector2> {
		return new THREE.SplineCurve(points);
	}

	/**
	 * Gets shape
	 *
	 * @param [points]
	 * @returns shape
	 */
	public static getShape(points?: I3JS.IVector2[]): I3JS.IShape {
		return new THREE.Shape(points);
	}

	/**
	 * Gets shape path
	 *
	 * @returns shape path
	 */
	public static getShapePath(): I3JS.IShapePath {
		return new THREE.ShapePath();
	}

	/**
	 * Gets path
	 *
	 * @param [points]
	 * @returns path
	 */
	public static getPath(points?: I3JS.IVector2[]): I3JS.IPath {
		return new THREE.Path(points);
	}

	/**
	 * Gets curve path
	 *
	 * @returns curve path
	 */
	public static getCurvePath(): I3JS.ICurvePath<I3JS.IVector> {
		return new THREE.CurvePath();
	}

	
	public static ShaderChunk: any = THREE.ShaderChunk;
	public static Box2: any = THREE.Box2;
	public static Box3: any = THREE.Box3;
	public static Color: any = THREE.Color;
	public static Cylindrical: any = THREE.Cylindrical;
	public static Euler: any = THREE.Euler;
	public static Frustum: any = THREE.Frustum;
	public static Line3: any = THREE.Line3;
	public static Matrix3: any = THREE.Matrix3;
	public static Matrix4: any = THREE.Matrix4;
	public static Plane: any = THREE.Plane;
	public static Quaternion: any = THREE.Quaternion;
	public static Ray: any = THREE.Ray;
	public static Sphere: any = THREE.Sphere;
	public static Spherical: any = THREE.Spherical;
	public static SphericalHarmonics3: any = THREE.SphericalHarmonics3;
	public static Triangle: any = THREE.Triangle;
	public static Vector2: any = THREE.Vector2;
	public static Vector3: any = THREE.Vector3;
	public static Vector4: any = THREE.Vector4;
	public static CubicInterpolant: any = THREE.CubicInterpolant;
	public static DiscreteInterpolant: any = THREE.DiscreteInterpolant;
	public static LinearInterpolant: any = THREE.LinearInterpolant;
	public static QuaternionLinearInterpolant: any = THREE.QuaternionLinearInterpolant;
	public static BufferAttribute: any = THREE.BufferAttribute;
	public static Int8BufferAttribute: any = THREE.Int8BufferAttribute;
	public static Uint8BufferAttribute: any = THREE.Uint8BufferAttribute;
	public static Uint8ClampedBufferAttribute: any = THREE.Uint8ClampedBufferAttribute;
	public static Int16BufferAttribute: any = THREE.Int16BufferAttribute;
	public static Uint16BufferAttribute: any = THREE.Uint16BufferAttribute;
	public static Int32BufferAttribute: any = THREE.Int32BufferAttribute;
	public static Uint32BufferAttribute: any = THREE.Uint32BufferAttribute;
	public static Float16BufferAttribute: any = THREE.Float16BufferAttribute;
	public static Float32BufferAttribute: any = THREE.Float32BufferAttribute;
	public static Float64BufferAttribute: any = THREE.Float64BufferAttribute;
	public static BufferGeometry: any = THREE.BufferGeometry;
	public static Clock: any = THREE.Clock;
	public static EventDispatcher: any = THREE.EventDispatcher;
	public static GLBufferAttribute: any = THREE.GLBufferAttribute;
	public static InstancedBufferAttribute: any = THREE.InstancedBufferAttribute;
	public static InstancedBufferGeometry: any = THREE.InstancedBufferGeometry;
	public static InstancedInterleavedBuffer: any = THREE.InstancedInterleavedBuffer;
	public static InterleavedBuffer: any = THREE.InterleavedBuffer;
	public static InterleavedBufferAttribute: any = THREE.InterleavedBufferAttribute;
	public static Layers: any = THREE.Layers;
	public static Object3D: any = THREE.Object3D;
	public static Raycaster: any = THREE.Raycaster;
	public static Uniform: any = THREE.Uniform;
	public static UniformsUtils: any = THREE.UniformsUtils;
	public static UniformsLib: any = THREE.UniformsLib;
	public static BoxGeometry: any = THREE.BoxGeometry;
	public static CircleGeometry: any = THREE.CircleGeometry;
	public static ConeGeometry: any = THREE.ConeGeometry;
	public static CylinderGeometry: any = THREE.CylinderGeometry;
	public static DodecahedronGeometry: any = THREE.DodecahedronGeometry;
	public static EdgesGeometry: any = THREE.EdgesGeometry;
	public static ExtrudeGeometry: any = THREE.ExtrudeGeometry;
	public static IcosahedronGeometry: any = THREE.IcosahedronGeometry;
	public static LatheGeometry: any = THREE.LatheGeometry;
	public static OctahedronGeometry: any = THREE.OctahedronGeometry;
	public static PlaneGeometry: any = THREE.PlaneGeometry;
	public static PolyhedronGeometry: any = THREE.PolyhedronGeometry;
	public static RingGeometry: any = THREE.RingGeometry;
	public static ShapeGeometry: any = THREE.ShapeGeometry;
	public static SphereGeometry: any = THREE.SphereGeometry;
	public static TetrahedronGeometry: any = THREE.TetrahedronGeometry;
	public static TorusGeometry: any = THREE.TorusGeometry;
	public static TorusKnotGeometry: any = THREE.TorusKnotGeometry;
	public static TubeGeometry: any = THREE.TubeGeometry;
	public static WireframeGeometry: any = THREE.WireframeGeometry;
	public static AmbientLight: any = THREE.AmbientLight;
	public static AmbientLightProbe: any = THREE.AmbientLightProbe;
	public static DirectionalLight: any = THREE.DirectionalLight;
	public static HemisphereLight: any = THREE.HemisphereLight;
	public static HemisphereLightProbe: any = THREE.HemisphereLightProbe;
	public static Light: any = THREE.Light;
	public static LightProbe: any = THREE.LightProbe;
	public static PointLight: any = THREE.PointLight;
	public static RectAreaLight: any = THREE.RectAreaLight;
	public static SpotLight: any = THREE.SpotLight;
	public static ArrayCamera: any = THREE.ArrayCamera;
	public static Camera: any = THREE.Camera;
	public static CubeCamera: any = THREE.CubeCamera;
	public static OrthographicCamera: any = THREE.OrthographicCamera;
	public static PerspectiveCamera: any = THREE.PerspectiveCamera;
	public static StereoCamera: any = THREE.StereoCamera;
	public static Audio: any = THREE.Audio;
	public static AudioAnalyser: any = THREE.AudioAnalyser;
	public static AudioListener: any = THREE.AudioListener;
	public static PositionalAudio: any = THREE.PositionalAudio;
	public static AnimationClip: any = THREE.AnimationClip;
	public static AnimationMixer: any = THREE.AnimationMixer;
	public static AnimationObjectGroup: any = THREE.AnimationObjectGroup;
	public static BooleanKeyframeTrack: any = THREE.BooleanKeyframeTrack;
	public static ColorKeyframeTrack: any = THREE.ColorKeyframeTrack;
	public static NumberKeyframeTrack: any = THREE.NumberKeyframeTrack;
	public static QuaternionKeyframeTrack: any = THREE.QuaternionKeyframeTrack;
	public static StringKeyframeTrack: any = THREE.StringKeyframeTrack;
	public static VectorKeyframeTrack: any = THREE.VectorKeyframeTrack;
	public static ArrowHelper: any = THREE.ArrowHelper;
	public static AxesHelper: any = THREE.AxesHelper;
	public static Box3Helper: any = THREE.Box3Helper;
	public static BoxHelper: any = THREE.BoxHelper;
	public static CameraHelper: any = THREE.CameraHelper;
	public static DirectionalLightHelper: any = THREE.DirectionalLightHelper;
	public static GridHelper: any = THREE.GridHelper;
	public static HemisphereLightHelper: any = THREE.HemisphereLightHelper;
	public static PlaneHelper: any = THREE.PlaneHelper;
	public static PointLightHelper: any = THREE.PointLightHelper;
	public static PolarGridHelper: any = THREE.PolarGridHelper;
	public static SkeletonHelper: any = THREE.SkeletonHelper;
	public static SpotLightHelper: any = THREE.SpotLightHelper;
	public static LineBasicMaterial: any = THREE.LineBasicMaterial;
	public static LineDashedMaterial: any = THREE.LineDashedMaterial;
	public static Material: any = THREE.Material;
	public static MeshBasicMaterial: any = THREE.MeshBasicMaterial;
	public static MeshDepthMaterial: any = THREE.MeshDepthMaterial;
	public static MeshDistanceMaterial: any = THREE.MeshDistanceMaterial;
	public static MeshLambertMaterial: any = THREE.MeshLambertMaterial;
	public static MeshMatcapMaterial: any = THREE.MeshMatcapMaterial;
	public static MeshNormalMaterial: any = THREE.MeshNormalMaterial;
	public static MeshPhongMaterial: any = THREE.MeshPhongMaterial;
	public static MeshPhysicalMaterial: any = THREE.MeshPhysicalMaterial;
	public static MeshStandardMaterial: any = THREE.MeshStandardMaterial;
	public static MeshToonMaterial: any = THREE.MeshToonMaterial;
	public static PointsMaterial: any = THREE.PointsMaterial;
	public static RawShaderMaterial: any = THREE.RawShaderMaterial;
	public static ShaderMaterial: any = THREE.ShaderMaterial;
	public static ShadowMaterial: any = THREE.ShadowMaterial;
	public static SpriteMaterial: any = THREE.SpriteMaterial;
	public static Bone: any = THREE.Bone;
	public static Group: any = THREE.Group;
	public static InstancedMesh: any = THREE.InstancedMesh;
	public static Line: any = THREE.Line;
	public static LineLoop: any = THREE.LineLoop;
	public static LineSegments: any = THREE.LineSegments;
	public static LOD: any = THREE.LOD;
	public static Mesh: any = THREE.Mesh;
	public static Points: any = THREE.Points;
	public static Skeleton: any = THREE.Skeleton;
	public static SkinnedMesh: any = THREE.SkinnedMesh;
	public static Sprite: any = THREE.Sprite;
	public static WebGL1Renderer: any = THREE.WebGL1Renderer;
	public static WebGLCubeRenderTarget: any = THREE.WebGLCubeRenderTarget;
	public static WebGLMultipleRenderTargets: any = THREE.WebGLMultipleRenderTargets;
	public static WebGLMultisampleRenderTarget: any = THREE.WebGLMultisampleRenderTarget;
	public static WebGLRenderer: any = THREE.WebGLRenderer;
	public static WebGLRenderTarget: any = THREE.WebGLRenderTarget;
	public static Fog: any = THREE.Fog;
	public static FogExp2: any = THREE.FogExp2;
	public static Scene: any = THREE.Scene;
	public static CanvasTexture: any = THREE.CanvasTexture;
	public static CompressedTexture: any = THREE.CompressedTexture;
	public static CubeTexture: any = THREE.CubeTexture;
	public static DataTexture: any = THREE.DataTexture;
	public static DataTexture2DArray: any = THREE.DataTexture2DArray;
	public static DataTexture3D: any = THREE.DataTexture3D;
	public static DepthTexture: any = THREE.DepthTexture;
	public static Texture: any = THREE.Texture;
	public static VideoTexture: any = THREE.VideoTexture;
	public static AnimationLoader: any = THREE.AnimationLoader;
	public static AudioLoader: any = THREE.AudioLoader;
	public static BufferGeometryLoader: any = THREE.BufferGeometryLoader;
	public static CompressedTextureLoader: any = THREE.CompressedTextureLoader;
	public static CubeTextureLoader: any = THREE.CubeTextureLoader;
	public static DataTextureLoader: any = THREE.DataTextureLoader;
	public static FileLoader: any = THREE.FileLoader;
	public static ImageBitmapLoader: any = THREE.ImageBitmapLoader;
	public static ImageLoader: any = THREE.ImageLoader;
	public static Loader: any = THREE.Loader;
	public static LoadingManager: any = THREE.LoadingManager;
	public static MaterialLoader: any = THREE.MaterialLoader;
	public static ObjectLoader: any = THREE.ObjectLoader;
	public static TextureLoader: any = THREE.TextureLoader;
	public static ArcCurve: any = THREE.ArcCurve;
	public static CatmullRomCurve3: any = THREE.CatmullRomCurve3;
	public static CubicBezierCurve: any = THREE.CubicBezierCurve;
	public static CubicBezierCurve3: any = THREE.CubicBezierCurve3;
	public static EllipseCurve: any = THREE.EllipseCurve;
	public static LineCurve: any = THREE.LineCurve;
	public static LineCurve3: any = THREE.LineCurve3;
	public static QuadraticBezierCurve: any = THREE.QuadraticBezierCurve;
	public static QuadraticBezierCurve3: any = THREE.QuadraticBezierCurve3;
	public static SplineCurve: any = THREE.SplineCurve;
	public static Shape: any = THREE.Shape;
	public static ShapePath: any = THREE.ShapePath;
	public static Path: any = THREE.Path;
	public static CurvePath: any = THREE.CurvePath;
}
