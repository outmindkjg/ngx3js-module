import { I3JS, N3JS, NgxThreeUtil } from '../../interface';
import { ICurvesParameters } from '../../ngx-interface';

/**
 * Curves polygon
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesPolygon) page for details.
 *
 */
export class CurvesPolygon extends N3JS.CurveVector3 {
	/**
	 * The Radius of curves polygon
	 */
	private radius: number = 1;

	/**
	 * Radius inner of curves polygon
	 */
	private radiusInner: number = 0;

	/**
	 * Wave h of curves polygon
	 */
	private waveH: number = 0;

	/**
	 * Wave r of curves polygon
	 */
	private waveR: number = 0;

	/**
	 * Rate x of curves polygon
	 */
	private rateX: number = 1;

	/**
	 * Rate y of curves polygon
	 */
	private rateY: number = 0.2;

	/**
	 * Rate z of curves polygon
	 */
	private rateZ: number = 1;

	/**
	 * The Points of curves polygon
	 */
	public points: I3JS.Vector3[] = [];

	/**
	 * Creates an instance of curves polygon.
	 * @param [points]
	 * @param [radius]
	 * @param [options]
	 */
	constructor(
		points: I3JS.Vector3[] = [],
		radius: number = 1,
		options?: ICurvesParameters
	) {
		super();
		this.points = points;
		this.radius = NgxThreeUtil.isNotNull(radius) ? radius : 1;
		this.radiusInner = NgxThreeUtil.isNotNull(options.radiusInner)
			? options.radiusInner
			: -0.2;
		this.waveH = NgxThreeUtil.isNotNull(options.waveH) ? options.waveH : 0;
		this.waveR = NgxThreeUtil.isNotNull(options.waveR) ? options.waveR : 0;
		this.rateX = NgxThreeUtil.isNotNull(options.rateX) ? options.rateX : 1;
		this.rateY = NgxThreeUtil.isNotNull(options.rateY) ? options.rateY : 1;
		this.rateZ = NgxThreeUtil.isNotNull(options.rateZ) ? options.rateZ : 1;
		this._rateV = new N3JS.Vector3(this.rateX, this.rateY, this.rateZ);
	}

	/**
	 * Rate v of curves polygon
	 */
	private _rateV: I3JS.Vector3 = null;

	/**
	 * Clears points
	 */
	public clearPoints() {
		this.points = [];
	}

	/**
	 * Adds point
	 * @param p
	 */
	public addPoint(p: I3JS.Vector3) {
		this.points.push(p);
	}

	/**
	 * Gets point
	 * @param t
	 * @param optionalTarget
	 * @returns
	 */
	public getPoint(t: number, optionalTarget: I3JS.Vector3) {
		const point = optionalTarget || new N3JS.Vector3();
		const len = this.points.length;
		if (len >= 2) {
			const index = len * t;
			const prevIndex = t >= 1 ? len - 1 : Math.floor(index);
			const nextIndex = t >= 1 ? prevIndex : (prevIndex + 1) % len;
			const prevP = this.points[prevIndex].clone();
			const nextP = this.points[nextIndex].clone().sub(prevP);
			const waveT = index - prevIndex;
			const currentP = prevP.clone().addScaledVector(nextP, waveT);
			const waveP = new N3JS.Vector3(0, 0, 0);
			if (this.waveH != 0) {
				const waveR = t * 2 * Math.PI;
				waveP.y = Math.sin(waveR * this.waveH);
			}
			if (this.radiusInner != 0 && this.waveR !== 0) {
				const waveR = t * 2 * Math.PI;
				const radiusInner = Math.sin(waveR) * this.radiusInner;
				waveP.x = Math.sin(waveR * len) * radiusInner;
				waveP.z = Math.cos(waveR * len) * radiusInner;
			}
			return point
				.set(currentP.x, currentP.y, currentP.z)
				.add(waveP.multiply(this._rateV))
				.multiplyScalar(this.radius);
		} else {
			return point;
		}
	}
}

/**
 * Curves regular polygon
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesRegularPolygon) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/square) page for a live curve demo.
 *
 */
export class CurvesRegularPolygon extends CurvesPolygon {
	/**
	 * Creates an instance of curves regular polygon.
	 * @param [vertex]
	 * @param [radius]
	 * @param [options]
	 */
	constructor(
		vertex: number = 3,
		radius: number = 1,
		options: ICurvesParameters = {}
	) {
		super([], radius, options);
		this.setVertex(vertex);
	}

	/**
	 * Sets vertex
	 * @param vertex
	 */
	public setVertex(vertex: number) {
		this.clearPoints();
		for (let i = 0; i < vertex; i++) {
			const t = (2 * Math.PI * i) / vertex;
			this.addPoint(new N3JS.Vector3(Math.sin(t), 0, Math.cos(t)));
		}
	}
}

/**
 * Curves regular polygon triangle
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesRegularPolygonTriangle) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/triangle) page for a live curve demo.
 *
 */
export class CurvesRegularPolygonTriangle extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(3, radius, options || {});
	}
}

/**
 * Curves regular polygon square
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesRegularPolygonSquare) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/square) page for a live curve demo.
 *
 */
export class CurvesRegularPolygonSquare extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(4, radius, options || {});
	}
}

/**
 * Curves regular polygon pentagon
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesRegularPolygonPentagon) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/pentagon) page for a live curve demo.
 *
 */
export class CurvesRegularPolygonPentagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(5, radius, options || {});
	}
}

/**
 * Curves regular polygon hexagon
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesRegularPolygonHexagon) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/hexagon) page for a live curve demo.
 *
 */
export class CurvesRegularPolygonHexagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(6, radius, options || {});
	}
}

/**
 * Curves regular polygon heptagon
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesRegularPolygonHeptagon) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/heptagon) page for a live curve demo.
 *
 */
export class CurvesRegularPolygonHeptagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(7, radius, options || {});
	}
}

/**
 * Curves regular polygon octagon
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesRegularPolygonOctagon) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/octagon) page for a live curve demo.
 *
 */
export class CurvesRegularPolygonOctagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(8, radius, options || {});
	}
}

/**
 * Curves regular polygon nonagon
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesRegularPolygonNonagon) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/nonagon) page for a live curve demo.
 *
 */
export class CurvesRegularPolygonNonagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(9, radius, options || {});
	}
}

/**
 * Curves regular polygon decagon
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesRegularPolygonDecagon) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/decagon) page for a live curve demo.
 *
 */
export class CurvesRegularPolygonDecagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(10, radius, options || {});
	}
}

/**
 * Curves regular polygon undecagon
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesRegularPolygonUndecagon) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/undecagon) page for a live curve demo.
 *
 */
export class CurvesRegularPolygonUndecagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(11, radius, options || {});
	}
}

/**
 * Curves regular polygon dodecagon
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesRegularPolygonDodecagon) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/dodecagon) page for a live curve demo.
 *
 */
export class CurvesRegularPolygonDodecagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(12, radius, options || {});
	}
}
