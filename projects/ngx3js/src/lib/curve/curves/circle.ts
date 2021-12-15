import { I3JS, N3JS, NgxThreeUtil } from '../../interface';
import { ICurvesParameters } from '../../ngx-interface';

/**
 * Curves circle
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesCircle) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/circle) page for a live curve demo.
 *
 */
export class CurvesCircle extends N3JS.Curve {
	/**
	 * The Radius of curves circle
	 */
	private radius: number = 1;

	/**
	 * Radius inner of curves circle
	 */
	private radiusInner: number = 0;

	/**
	 * Wave h of curves circle
	 */
	private waveH: number = 0;

	/**
	 * Wave r of curves circle
	 */
	private waveR: number = 0;

	/**
	 * Rate x of curves circle
	 */
	private rateX: number = 1;

	/**
	 * Rate y of curves circle
	 */
	private rateY: number = 0.2;

	/**
	 * Rate z of curves circle
	 */
	private rateZ: number = 1;

	/**
	 * Creates an instance of curves circle.
	 * @param [radius]
	 * @param [options]
	 */
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super();
		options = options || {};
		this.radius = NgxThreeUtil.isNotNull(radius) ? radius : 1;
		this.radiusInner = NgxThreeUtil.isNotNull(options.radiusInner)
			? options.radiusInner
			: -0.2;
		this.waveH = NgxThreeUtil.isNotNull(options.waveH) ? options.waveH : 0;
		this.waveR = NgxThreeUtil.isNotNull(options.waveR) ? options.waveR : 0;
		this.rateX = NgxThreeUtil.isNotNull(options.rateX) ? options.rateX : 1;
		this.rateY = NgxThreeUtil.isNotNull(options.rateY) ? options.rateY : 0.2;
		this.rateZ = NgxThreeUtil.isNotNull(options.rateZ) ? options.rateZ : 1;
	}

	/**
	 * Gets point
	 * @param t
	 * @param optionalTarget
	 * @returns
	 */
	public getPoint(t: number, optionalTarget: I3JS.Vector3) {
		const point = optionalTarget || new N3JS.Vector3();
		t = 2 * Math.PI * t;
		const radius =
			this.waveR != 0 && this.radiusInner != 0
				? (Math.sin(t * this.waveR) * this.radiusInner + 1) * this.radius
				: this.radius;
		const y = this.waveH != 0 ? Math.sin(t * this.waveH) : 0;
		return point
			.set(Math.sin(t) * this.rateX, y * this.rateY, Math.cos(t) * this.rateZ)
			.multiplyScalar(radius);
	}
}
