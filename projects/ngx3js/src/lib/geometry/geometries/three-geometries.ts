import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry';
import {
	LightningStrike,
	RayParameters
} from 'three/examples/jsm/geometries/LightningStrike';
import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry';
import {
	TextGeometry,
	TextGeometryParameters
} from 'three/examples/jsm/geometries/TextGeometry';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import * as RollerCoaster from 'three/examples/jsm/misc/RollerCoaster';
import { I3JS, THREE } from '../../interface';


/**
 * Buffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/BufferGeometry) page for a live demo.
 *
 */
export class NgxBufferGeometry extends THREE.BufferGeometry {
	/**
	 * Creates an instance of buffer geometry.
	 */
	constructor() {
		super();
	}
}

/**
 * PlaneBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPlaneBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/PlaneBufferGeometry) page for a live demo.
 *
 */
export class NgxPlaneBufferGeometry extends THREE.PlaneBufferGeometry {
	/**
	 * Creates an instance of plane buffer geometry.
	 *
	 * @param [width] — Width of the sides on the X axis.
	 * @param [height] — Height of the sides on the Y axis.
	 * @param [widthSegments] — Number of segmented faces along the width of the sides.
	 * @param [heightSegments] — Number of segmented faces along the height of the sides.
	 */
	constructor(
		width?: number,
		height?: number,
		widthSegments?: number,
		heightSegments?: number
	) {
		super(width, height, widthSegments, heightSegments);
	}
}

/**
 * InstancedBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxInstancedBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/InstancedBufferGeometry) page for a live demo.
 *
 */
export class NgxInstancedBufferGeometry extends THREE.InstancedBufferGeometry {
	/**
	 * Creates an instance of instanced buffer geometry.
	 */
	constructor() {
		super();
	}
}

/**
 * Teapot geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTeapotGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/TeapotGeometry) page for a live demo.
 *
 */
export class NgxTeapotGeometry extends TeapotGeometry {
	/**
	 * Creates an instance of teapot geometry.
	 *
	 * @param [size]
	 * @param [segments]
	 * @param [bottom]
	 * @param [lid]
	 * @param [body]
	 * @param [fitLid]
	 * @param [blinn]
	 */
	constructor(
		size?: number,
		segments?: number,
		bottom?: boolean,
		lid?: boolean,
		body?: boolean,
		fitLid?: boolean,
		blinn?: boolean
	) {
		super(size, segments, bottom, lid, body, fitLid, blinn as any);
	}
}

/**
 * BoxBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxBoxBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/BoxBufferGeometry) page for a live demo.
 *
 */
export class NgxBoxBufferGeometry extends THREE.BoxBufferGeometry {
	/**
	 * Creates an instance of box buffer geometry.
	 *
	 * @param [width] — Width of the sides on the X axis.
	 * @param [height] — Height of the sides on the Y axis.
	 * @param [depth] — Depth of the sides on the Z axis.
	 * @param [widthSegments] — Number of segmented faces along the width of the sides.
	 * @param [heightSegments] — Number of segmented faces along the height of the sides.
	 * @param [depthSegments] — Number of segmented faces along the depth of the sides.
	 */
	constructor(
		width: number = 1,
		height: number = 1,
		depth: number = 1,
		widthSegments: number = 1,
		heightSegments: number = 1,
		depthSegments: number = 1
	) {
		super(width, height, depth, widthSegments, heightSegments, depthSegments);
	}
}

/**
 * CircleBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCircleBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/CircleBufferGeometry) page for a live demo.
 *
 */
export class NgxCircleBufferGeometry extends THREE.CircleBufferGeometry {
	/**
	 * Creates an instance of circle buffer geometry.
	 *
	 * @param [radius]
	 * @param [segments]
	 * @param [thetaStart]
	 * @param [thetaLength]
	 */
	constructor(
		radius: number = 1,
		segments: number = 8,
		thetaStart: number = 0,
		thetaLength: number = Math.PI * 2
	) {
		super(radius, segments, thetaStart, thetaLength);
	}
}

/**
 * ConeBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxConeBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ConeBufferGeometry) page for a live demo.
 *
 */
export class NgxConeBufferGeometry extends THREE.ConeBufferGeometry {
	/**
	 * Creates an instance of cone buffer geometry.
	 *
	 * @param [radius] — Radius of the cone base.
	 * @param [height] — Height of the cone.
	 * @param [radialSegments] — Number of segmented faces around the circumference of the cone.
	 * @param [heightSegments] — Number of rows of faces along the height of the cone.
	 * @param [openEnded] — A Boolean indicating whether the base of the cone is open or capped.
	 * @param [thetaStart]
	 * @param [thetaLength]
	 */
	constructor(
		radius: number = 1,
		height: number = 1,
		radialSegments: number = 8,
		heightSegments: number = 1,
		openEnded: boolean = false,
		thetaStart: number = 0,
		thetaLength: number = Math.PI * 2
	) {
		super(
			radius,
			height,
			radialSegments,
			heightSegments,
			openEnded,
			thetaStart,
			thetaLength
		);
	}
}

/**
 * CylinderBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCylinderBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/CylinderBufferGeometry) page for a live demo.
 *
 */
export class NgxCylinderBufferGeometry extends THREE.CylinderBufferGeometry {
	/**
	 * Creates an instance of cylinder buffer geometry.
	 *
	 * @param [radiusTop] — Radius of the cylinder at the top.
	 * @param [radiusBottom] — Radius of the cylinder at the bottom.
	 * @param [height] — Height of the cylinder.
	 * @param [radialSegments] — Number of segmented faces around the circumference of the cylinder.
	 * @param [heightSegments] — Number of rows of faces along the height of the cylinder.
	 * @param [openEnded] - A Boolean indicating whether or not to cap the ends of the cylinder.
	 * @param [thetaStart]
	 * @param [thetaLength]
	 */
	constructor(
		radiusTop: number = 1,
		radiusBottom: number = 1,
		height: number = 1,
		radialSegments: number = 8,
		heightSegments: number = 1,
		openEnded: boolean = false,
		thetaStart: number = 0,
		thetaLength: number = Math.PI * 2
	) {
		super(
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
}

/**
 * DodecahedronBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxDodecahedronBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/DodecahedronBufferGeometry) page for a live demo.
 *
 */
export class NgxDodecahedronBufferGeometry extends THREE.DodecahedronBufferGeometry {
	/**
	 * Creates an instance of dodecahedron buffer geometry.
	 *
	 * @param [radius]
	 * @param [detail]
	 */
	constructor(radius: number = 1, detail: number = 0) {
		super(radius, detail);
	}
}

/**
 * ShapeBufferGeometry geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShapeBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ShapeBufferGeometry) page for a live demo.
 *
 */
export class NgxShapeBufferGeometry extends THREE.ShapeBufferGeometry {
	/**
	 * Creates an instance of shape buffer geometry.
	 *
	 * @param [shapes]
	 * @param [curveSegments]
	 */
	constructor(shapes?: I3JS.IShape | I3JS.IShape[], curveSegments?: number) {
		super(shapes as any, curveSegments);
	}
}

/**
 * ExtrudeBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxExtrudeBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ExtrudeBufferGeometry) page for a live demo.
 *
 */
export class NgxExtrudeBufferGeometry extends THREE.ExtrudeBufferGeometry {
	/**
	 * Creates an instance of extrude buffer geometry.
	 *
	 * @param [shapes]
	 * @param [options]
	 */
	constructor(
		shapes?: I3JS.IShape | I3JS.IShape[],
		options?: I3JS.IExtrudeGeometryOptions
	) {
		super(shapes as any, options);
	}
}

/**
 * PolyhedronBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPolyhedronBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/PolyhedronBufferGeometry) page for a live demo.
 *
 */
export class NgxPolyhedronBufferGeometry extends THREE.PolyhedronBufferGeometry {
	/**
	 * Creates an instance of polyhedron buffer geometry.
	 *
	 * @param [vertices]
	 * @param [indices]
	 * @param [radius]
	 * @param [detail]
	 */
	constructor(
		vertices?: number[],
		indices?: number[],
		radius?: number,
		detail?: number
	) {
		super(vertices, indices, radius, detail);
	}
}

/**
 * RingBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRingBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/RingBufferGeometry) page for a live demo.
 *
 */
export class NgxRingBufferGeometry extends THREE.RingBufferGeometry {
	/**
	 * Creates an instance of ring buffer geometry.
	 *
	 * @param [innerRadius]
	 * @param [outerRadius]
	 * @param [thetaSegments]
	 * @param [phiSegments]
	 * @param [thetaStart]
	 * @param [thetaLength]
	 */
	constructor(
		innerRadius: number = 0.5,
		outerRadius: number = 1,
		thetaSegments: number = 8,
		phiSegments: number = 1,
		thetaStart: number = 0,
		thetaLength: number = Math.PI * 2
	) {
		super(
			innerRadius,
			outerRadius,
			thetaSegments,
			phiSegments,
			thetaStart,
			thetaLength
		);
	}
}

/**
 * SphereBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSphereBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/SphereBufferGeometry) page for a live demo.
 *
 */
export class NgxSphereBufferGeometry extends THREE.SphereBufferGeometry {
	/**
	 * Creates an instance of sphere buffer geometry.
	 *
	 * @param [radius] — sphere radius. Default is 50.
	 * @param [widthSegments] — number of horizontal segments. Minimum value is 3, and the default is 8.
	 * @param [heightSegments] — number of vertical segments. Minimum value is 2, and the default is 6.
	 * @param [phiStart] — specify horizontal starting angle. Default is 0.
	 * @param [phiLength] — specify horizontal sweep angle size. Default is Math.PI * 2.
	 * @param [thetaStart] — specify vertical starting angle. Default is 0.
	 * @param [thetaLength] — specify vertical sweep angle size. Default is Math.PI.
	 */
	constructor(
		radius: number = 50,
		widthSegments: number = 8,
		heightSegments: number = 6,
		phiStart: number = 0,
		phiLength: number = Math.PI * 2,
		thetaStart: number = 0,
		thetaLength: number = Math.PI * 2
	) {
		super(
			radius,
			widthSegments,
			heightSegments,
			phiStart,
			phiLength,
			thetaStart,
			thetaLength
		);
	}
}

/**
 * TetrahedronBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTetrahedronBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/TetrahedronBufferGeometry) page for a live demo.
 *
 */
export class NgxTetrahedronBufferGeometry extends THREE.TetrahedronBufferGeometry {
	/**
	 * Creates an instance of tetrahedron buffer geometry.
	 *
	 * @param [radius]
	 * @param [detail]
	 */
	constructor(radius: number = 1, detail: number = 0) {
		super(radius, detail);
	}
}

/**
 * TorusBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTorusBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/TorusBufferGeometry) page for a live demo.
 *
 */
export class NgxTorusBufferGeometry extends THREE.TorusBufferGeometry {
	/**
	 * Creates an instance of torus buffer geometry.
	 *
	 * @param [radius]
	 * @param [tube]
	 * @param [radialSegments]
	 * @param [tubularSegments]
	 * @param [arc]
	 */
	constructor(
		radius: number = 1,
		tube: number = 0.4,
		radialSegments: number = 8,
		tubularSegments: number = 6,
		arc: number = Math.PI * 2
	) {
		super(radius, tube, radialSegments, tubularSegments, arc);
	}
}

/**
 * TorusKnotBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTorusKnotBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/TorusKnotBufferGeometry) page for a live demo.
 *
 */
export class NgxTorusKnotBufferGeometry extends THREE.TorusKnotBufferGeometry {
	/**
	 * Creates an instance of torus knot buffer geometry.
	 *
	 * @param [radius]
	 * @param [tube]
	 * @param [radialSegments]
	 * @param [tubularSegments]
	 * @param [p]
	 * @param [q]
	 */
	constructor(
		radius?: number,
		tube?: number,
		tubularSegments?: number,
		radialSegments?: number,
		p?: number,
		q?: number
	) {
		super(radius, tube, tubularSegments, radialSegments, p, q);
	}
}

/**
 * TubeBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTubeBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/TubeBufferGeometry) page for a live demo.
 *
 */
export class NgxTubeBufferGeometry extends THREE.TubeBufferGeometry {
	/**
	 * Creates an instance of tube buffer geometry.
	 *
	 * @param [path]
	 * @param [tubularSegments]
	 * @param [radius]
	 * @param [radiusSegments]
	 * @param [closed]
	 */
	constructor(
		path?: I3JS.ICurve<I3JS.IVector3>,
		tubularSegments?: number,
		radius?: number,
		radiusSegments?: number,
		closed?: boolean
	) {
		super(path as any, tubularSegments, radius, radiusSegments, closed);
	}
}

/**
 * IcosahedronBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxIcosahedronBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/IcosahedronBufferGeometry) page for a live demo.
 *
 */
export class NgxIcosahedronBufferGeometry extends THREE.IcosahedronBufferGeometry {
	/**
	 * Creates an instance of icosahedron buffer geometry.
	 * @param [radius]
	 * @param [detail]
	 */
	constructor(radius: number = 1, detail: number = 0) {
		super(radius, detail);
	}
}

/**
 * LatheBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLatheBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/LatheBufferGeometry) page for a live demo.
 *
 */
export class NgxLatheBufferGeometry extends THREE.LatheBufferGeometry {
	/**
	 * Creates an instance of lathe buffer geometry.
	 *
	 * @param [points]
	 * @param [segments]
	 * @param [phiStart]
	 * @param [phiLength]
	 */
	constructor(
		points?: I3JS.IVector2[],
		segments: number = 12,
		phiStart: number = 0,
		phiLength: number = Math.PI * 2
	) {
		super(points as any, segments, phiStart, phiLength);
	}
}

/**
 * OctahedronBuffer geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxOctahedronBufferGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/OctahedronBufferGeometry) page for a live demo.
 *
 */
export class NgxOctahedronBufferGeometry extends THREE.OctahedronBufferGeometry {
	/**
	 * Creates an instance of octahedron buffer geometry.
	 *
	 * @param [radius]
	 * @param [detail]
	 */
	constructor(radius: number = 1, detail: number = 0) {
		super(radius, detail);
	}
}

/**
 * Convex geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxConvexGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ConvexGeometry) page for a live demo.
 *
 */
export class NgxConvexGeometry extends ConvexGeometry {
	/**
	 * Creates an instance of convex geometry.
	 * @param points
	 */
	constructor(points: I3JS.IVector3[]) {
		super(points as any);
	}
}

/**
 * Decal geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxDecalGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/DecalGeometry) page for a live demo.
 *
 */
export class NgxDecalGeometry extends DecalGeometry {
	/**
	 * Creates an instance of decal geometry.
	 *
	 * @param mesh
	 * @param position
	 * @param orientation
	 * @param size
	 */
	constructor(
		mesh: I3JS.IMesh,
		position: I3JS.IVector3,
		orientation: I3JS.IEuler,
		size: I3JS.IVector3
	) {
		super(mesh as any, position as any, orientation as any, size as any);
	}
}

/**
 * ParametricTube geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxParametricTubeGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ParametricTubeGeometry) page for a live demo.
 *
 */
export class NgxParametricTubeGeometry extends ParametricGeometries.TubeGeometry {
	constructor(
		path: I3JS.ICurve<I3JS.IVector3>,
		segments?: number,
		radius?: number,
		segmentsRadius?: number,
		closed?: boolean
	) {
		super(path as any, segments, radius, segmentsRadius, closed);
	}
}

/**
 * ParametricSphere geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxParametricSphereGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ParametricSphereGeometry) page for a live demo.
 *
 */
export class NgxParametricSphereGeometry extends ParametricGeometries.SphereGeometry {
	/**
	 * Creates an instance of parametric sphere geometry.
	 *
	 * @param size
	 * @param u
	 * @param v
	 */
	constructor(size: number, u: number, v: number) {
		super(size, u, v);
	}
}

/**
 * ParametricTorusKnot geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxParametricTorusKnotGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ParametricTorusKnotGeometry) page for a live demo.
 *
 */
export class NgxParametricTorusKnotGeometry extends ParametricGeometries.TorusKnotGeometry {
	/**
	 * Creates an instance of parametric torus knot geometry.
	 * @param [radius]
	 * @param [tube]
	 * @param [segmentsT]
	 * @param [segmentsR]
	 * @param [p]
	 * @param [q]
	 */
	constructor(
		radius?: number,
		tube?: number,
		segmentsT?: number,
		segmentsR?: number,
		p?: number,
		q?: number
	) {
		super(radius, tube, segmentsT, segmentsR, p, q);
	}
}

/**
 * ParametricPlane geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxParametricPlaneGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ParametricPlaneGeometry) page for a live demo.
 *
 */
export class NgxParametricPlaneGeometry extends ParametricGeometries.PlaneGeometry {
	/**
	 * Creates an instance of parametric plane geometry.
	 *
	 * @param width
	 * @param depth
	 * @param segmentsWidth
	 * @param segmentsDepth
	 */
	constructor(
		width: number,
		depth: number,
		segmentsWidth: number,
		segmentsDepth: number
	) {
		super(width, depth, segmentsWidth, segmentsDepth);
	}
}

/**
 * RoundedBox geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRoundedBoxGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/RoundedBoxGeometry) page for a live demo.
 *
 */
export class NgxRoundedBoxGeometry extends RoundedBoxGeometry {
	/**
	 * Creates an instance of rounded box geometry.
	 *
	 * @param [width]
	 * @param [height]
	 * @param [depth]
	 * @param [segments]
	 * @param [radius]
	 */
	constructor(
		width?: number,
		height?: number,
		depth?: number,
		segments?: number,
		radius?: number
	) {
		super(width, height, depth, segments, radius);
	}
}

/**
 * LineGeometry geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLineGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/LineGeometry) page for a live demo.
 *
 */
export class NgxLineGeometry extends LineGeometry {
	/**
	 * Creates an instance of line geometry.
	 *
	 */
	constructor() {
		super();
	}
}

/**
 * LightningStrike geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLightningStrike) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/LightningStrike) page for a live demo.
 *
 */
export class NgxLightningStrikeGeometry extends LightningStrike {
	/**
	 * Creates an instance of lightning strike.
	 *
	 * @param [rayParameters]
	 */
	constructor(rayParameters?: RayParameters) {
		super(rayParameters);
	}
}

/**
 * BoxLine geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxBoxLineGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/BoxLineGeometry) page for a live demo.
 *
 */
export class NgxBoxLineGeometry extends BoxLineGeometry {
	/**
	 * Creates an instance of box line geometry.
	 *
	 * @param [width]
	 * @param [height]
	 * @param [depth]
	 * @param [widthSegments]
	 * @param [heightSegments]
	 * @param [depthSegments]
	 */
	constructor(
		width?: number,
		height?: number,
		depth?: number,
		widthSegments?: number,
		heightSegments?: number,
		depthSegments?: number
	) {
		super(width, height, depth, widthSegments, heightSegments, depthSegments);
	}
}

/**
 * Parametric geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxParametricGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ParametricGeometry) page for a live demo.
 *
 */
export class NgxParametricGeometry extends ParametricGeometry {
	/**
	 * Creates an instance of parametric geometry.
	 *
	 * @param [func]
	 * @param [slices]
	 * @param [stacks]
	 */
	constructor(
		func?: (u: number, v: number, target: I3JS.IVector3) => void,
		slices?: number,
		stacks?: number
	) {
		super(func as any, slices, stacks);
	}
}

/**
 * Text geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTextGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/TextGeometry) page for a live demo.
 *
 */
export class NgxTextGeometry extends TextGeometry {
	/**
	 * Creates an instance of text geometry.
	 *
	 * @param text
	 * @param parameters
	 */
	constructor(text: string, parameters: TextGeometryParameters) {
		super(text, parameters);
	}
}

/**
 * RollerCoasterShadow geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRollerCoasterShadowGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/RollerCoasterShadowGeometry) page for a live demo.
 *
 */
export class NgxRollerCoasterShadowGeometry extends RollerCoaster.RollerCoasterShadowGeometry {
	/**
	 * Creates an instance of roller coaster shadow geometry.
	 *
	 * @param curve
	 * @param divisions
	 */
	constructor(curve: I3JS.ICurve<I3JS.IVector3>, divisions: number) {
		super(curve as any, divisions);
	}
}

/**
 * RollerCoasterLifters geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRollerCoasterLiftersGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/RollerCoasterLiftersGeometry) page for a live demo.
 *
 */
export class NgxRollerCoasterLiftersGeometry extends RollerCoaster.RollerCoasterLiftersGeometry {
	/**
	 * Creates an instance of roller coaster lifters geometry.
	 *
	 * @param curve
	 * @param divisions
	 */
	constructor(curve: I3JS.ICurve<I3JS.IVector3>, divisions: number) {
		super(curve as any, divisions);
	}
}

/**
 * RollerCoaster geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRollerCoasterGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/RollerCoasterGeometry) page for a live demo.
 *
 */
export class NgxRollerCoasterGeometry extends RollerCoaster.RollerCoasterGeometry {
	/**
	 * Creates an instance of roller coaster geometry.
	 *
	 * @param curve
	 * @param divisions
	 */
	constructor(curve: I3JS.ICurve<I3JS.IVector3>, divisions: number) {
		super(curve as any, divisions);
	}
}

/**
 * RollerCoasterSky geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRollerCoasterSkyGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/RollerCoasterSkyGeometry) page for a live demo.
 *
 */
export class NgxRollerCoasterSkyGeometry extends RollerCoaster.SkyGeometry {
	/**
	 * Creates an instance of roller coaster sky geometry.
	 *
	 * @param curve
	 * @param divisions
	 */
	constructor(curve: I3JS.ICurve<I3JS.IVector3>, divisions: number) {
		super(curve as any, divisions);
	}
}

/**
 * RollerCoasterTrees geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRollerCoasterTreesGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/RollerCoasterTreesGeometry) page for a live demo.
 *
 */
export class NgxRollerCoasterTreesGeometry extends RollerCoaster.TreesGeometry {
	/**
	 * Creates an instance of roller coaster trees geometry.
	 *
	 * @param landscape
	 */
	constructor(landscape: I3JS.IMesh) {
		super(landscape as any);
	}
}

export { RayParameters, TextGeometryParameters, ParametricGeometries };
