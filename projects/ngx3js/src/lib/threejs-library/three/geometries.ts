import { BufferGeometry } from './core';
import { Curve, Shape } from './extras';
import { Vector2, Vector3 } from './math';

export interface BoxGeometry extends BufferGeometry {
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

	fromJSON(data: any): BoxGeometry;
}

export interface CircleGeometry extends BufferGeometry {
	/**
	 * @param [radius=1]
	 * @param [segments=8]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	new (radius?: number, segments?: number, thetaStart?: number, thetaLength?: number): this;

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

	fromJSON(data: any): CircleGeometry;
}

export interface ConeGeometry extends CylinderGeometry {
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

	fromJSON(data: any): ConeGeometry;
}

export interface CylinderGeometry extends BufferGeometry {
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

	fromJSON(data: any): CylinderGeometry;
}

export interface DodecahedronGeometry extends PolyhedronGeometry {
	/**
	 * @param [radius=1]
	 * @param [detail=0]
	 */
	new (radius?: number, detail?: number): this;

	/**
	 * @default 'DodecahedronGeometry'
	 */
	type: string;

	fromJSON(data: any): DodecahedronGeometry;
}

export interface EdgesGeometry<TBufferGeometry extends BufferGeometry = BufferGeometry> extends BufferGeometry {
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

export interface ExtrudeGeometryOptions {
	/**
	 * @default 12
	 */
	curveSegments?: number | undefined;
	/**
	 * @default 1
	 */
	steps?: number | undefined;
	/**
	 * @default 100
	 */
	depth?: number | undefined;
	/**
	 * @default true
	 */
	bevelEnabled?: boolean | undefined;
	/**
	 * @default 6
	 */
	bevelThickness?: number | undefined;
	bevelSize?: number | undefined;
	/**
	 * @default 0
	 */
	bevelOffset?: number | undefined;
	/**
	 * @default 3
	 */
	bevelSegments?: number | undefined;
	extrudePath?: Curve<Vector3> | undefined;
	UVGenerator?: UVGenerator | undefined;
}

export interface UVGenerator {
	generateTopUV(
		geometry: ExtrudeGeometry,
		vertices: number[],
		indexA: number,
		indexB: number,
		indexC: number
	): Vector2[];
	generateSideWallUV(
		geometry: ExtrudeGeometry,
		vertices: number[],
		indexA: number,
		indexB: number,
		indexC: number,
		indexD: number
	): Vector2[];
}

export interface ExtrudeGeometry extends BufferGeometry {
	new (shapes?: Shape | Shape[], options?: ExtrudeGeometryOptions): this;

	/**
	 * @default 'ExtrudeGeometry'
	 */
	type: string;

	addShapeList(shapes: Shape[], options?: any): void;
	addShape(shape: Shape, options?: any): void;

	fromJSON(data: any): ExtrudeGeometry;
}

export interface IcosahedronGeometry extends PolyhedronGeometry {
	/**
	 * @param [radius=1]
	 * @param [detail=0]
	 */
	new (radius?: number, detail?: number): this;

	/**
	 * @default 'IcosahedronGeometry'
	 */
	type: string;

	fromJSON(data: any): IcosahedronGeometry;
}

export interface LatheGeometry extends BufferGeometry {
	/**
	 * @param points
	 * @param [segments=12]
	 * @param [phiStart=0]
	 * @param [phiLength=Math.PI * 2]
	 */
	new (points?: Vector2[], segments?: number, phiStart?: number, phiLength?: number): this;

	/**
	 * @default 'LatheGeometry'
	 */
	type: string;

	parameters: {
		points: Vector2[];
		segments: number;
		phiStart: number;
		phiLength: number;
	};

	fromJSON(data: any): LatheGeometry;
}

export interface OctahedronGeometry extends PolyhedronGeometry {
	/**
	 * @param [radius=1]
	 * @param [detail=0]
	 */
	new (radius?: number, detail?: number): this;

	/**
	 * @default 'OctahedronGeometry'
	 */
	type: string;

	fromJSON(data: any): OctahedronGeometry;
}

export interface PlaneGeometry extends BufferGeometry {
	/**
	 * @param [width=1] — Width of the sides on the X axis.
	 * @param [height=1] — Height of the sides on the Y axis.
	 * @param [widthSegments=1] — Number of segmented faces along the width of the sides.
	 * @param [heightSegments=1] — Number of segmented faces along the height of the sides.
	 */
	new (width?: number, height?: number, widthSegments?: number, heightSegments?: number): this;

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

	fromJSON(data: any): PlaneGeometry;
}

export interface PolyhedronGeometry extends BufferGeometry {
	/**
	 * @param vertices
	 * @param indices
	 * @param [radius=1]
	 * @param [detail=0]
	 */
	new (vertices?: number[], indices?: number[], radius?: number, detail?: number): this;

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

	fromJSON(data: any): PolyhedronGeometry;
}

export interface RingGeometry extends BufferGeometry {
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

	fromJSON(data: any): RingGeometry;
}

export interface ShapeGeometry extends BufferGeometry {
	/**
	 * @default 'ShapShapeGeometryeBufferGeometry'
	 */
	type: string;

	new (shapes?: Shape | Shape[], curveSegments?: number): this;

	fromJSON(data: any): ShapeGeometry;
}

export interface SphereGeometry extends BufferGeometry {
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

	fromJSON(data: any): SphereGeometry;
}

export interface TetrahedronGeometry extends PolyhedronGeometry {
	/**
	 * @param [radius=1]
	 * @param [detail=0]
	 */
	new (radius?: number, detail?: number): this;

	/**
	 * @default 'TetrahedronGeometry'
	 */
	type: string;

	fromJSON(data: any): TetrahedronGeometry;
}

export interface TorusGeometry extends BufferGeometry {
	/**
	 * @param [radius=1]
	 * @param [tube=0.4]
	 * @param [radialSegments=8]
	 * @param [tubularSegments=6]
	 * @param [arc=Math.PI * 2]
	 */
	new (radius?: number, tube?: number, radialSegments?: number, tubularSegments?: number, arc?: number): this;

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

	fromJSON(data: any): TorusGeometry;
}

export interface TorusKnotGeometry extends BufferGeometry {
	/**
	 * @param [radius=1]
	 * @param [tube=0.4]
	 * @param [radialSegments=64]
	 * @param [tubularSegments=8]
	 * @param [p=2]
	 * @param [q=3]
	 */
	new (radius?: number, tube?: number, tubularSegments?: number, radialSegments?: number, p?: number, q?: number): this;

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

	fromJSON(data: any): TorusKnotGeometry;
}

export interface TubeGeometry extends BufferGeometry {
	/**
	 * @param path
	 * @param [tubularSegments=64]
	 * @param [radius=1]
	 * @param [radiusSegments=8]
	 * @param [closed=false]
	 */
	new (
		path?: Curve<Vector3>,
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
		path: Curve<Vector3>;
		tubularSegments: number;
		radius: number;
		radialSegments: number;
		closed: boolean;
	};
	tangents: Vector3[];
	normals: Vector3[];
	binormals: Vector3[];

	fromJSON(data: any): TubeGeometry;
}

export interface WireframeGeometry<TBufferGeometry extends BufferGeometry = BufferGeometry> extends BufferGeometry {
	new (geometry?: TBufferGeometry): this;

	/**
	 * @default 'WireframeGeometry'
	 */
	type: string;

	parameters: {
		geometry: TBufferGeometry;
	};
}
