import { ShaderPass } from './three/examples/index';
import {
	BufferAttribute,
	BufferGeometry, CircleGeometry, Color, Curve, CurvePath, GLSLVersion,
	InterleavedBufferAttribute,
	Line,
	Mesh,
	Points,
	RawShaderMaterial,
	ShaderMaterial,
	ShaderMaterialParameters, TrianglesDrawModes, Vector2, Vector3, WireframeGeometry
} from './three/index';
export * from './three/examples/index';
export * from './three/index';

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

export interface CurveVector2 extends Curve<Vector2> {}
export interface CurveVector3 extends Curve<Vector3> {}
export interface CurvePathVector2 extends CurvePath<Vector2> {}
export interface CurvePathVector3 extends CurvePath<Vector3> {}
