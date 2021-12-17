import {
	BufferAttribute,
	BufferGeometry, Curve, CurvePath, InterleavedBufferAttribute,
	Line,
	Mesh,
	Points, TrianglesDrawModes, Vector2, Vector3
} from './types/three/index';
export * from './types/three/examples/index';
export * from './types/three/index';

export interface GeometryUtils {
	mergeBufferAttributes(attributes: BufferAttribute[]): BufferAttribute;
	mergeBufferGeometries(geometries: BufferGeometry[], useGroups?: boolean): BufferGeometry;
	interleaveAttributes(attributes: BufferAttribute[]): InterleavedBufferAttribute;
	estimateBytesUsed(geometry: BufferGeometry): number;
	mergeVertices(geometry: BufferGeometry, tolerance?: number): BufferGeometry;
	toTrianglesDrawMode(geometry: BufferGeometry, drawMode: TrianglesDrawModes): BufferGeometry;
	computeMorphedAttributes(object: Mesh | Line | Points): object;
	hilbert2D(
		center?: Vector3,
		size?: number,
		iterations?: number,
		v0?: number,
		v1?: number,
		v2?: number,
		v3?: number
	): Vector3[];
	hilbert3D(
		center?: Vector3,
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
	): Vector3[];
	gosper(size?: number): number[];
}

