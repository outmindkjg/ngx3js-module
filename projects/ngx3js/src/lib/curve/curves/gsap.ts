import * as GSAP from 'gsap';
import { ThreeUtil, CurvesParameters, I3JS, N3JS } from '../../interface';

/**
 * Curves gsap
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsap) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/linearin) page for a live curve demo.
 *
 */
export class CurvesGsap extends N3JS.Curve {
	/**
	 * Ease function of curves gsap
	 */
	private easeFunction: (progress: number) => number;

	/**
	 * The Radius of curves gsap
	 */
	private radius: number = 1;

	/**
	 * Rate x of curves gsap
	 */
	private rateX: number = 1;

	/**
	 * Rate y of curves gsap
	 */
	private rateY: number = 0.2;

	/**
	 * Rate z of curves gsap
	 */
	private rateZ: number = 1;

	/**
	 * Creates an instance of curves gsap.
	 * @param easeFunction
	 * @param [radius]
	 * @param [options]
	 */
	constructor(
		easeFunction: (progress: number) => number,
		radius: number = 1,
		options?: CurvesParameters
	) {
		super();
		this.easeFunction = easeFunction || GSAP.Power1.easeIn;
		options = options || {};
		this.radius = ThreeUtil.isNotNull(radius) ? radius : 1;
		this.rateX = ThreeUtil.isNotNull(options.rateX) ? options.rateX : 1;
		this.rateY = ThreeUtil.isNotNull(options.rateY) ? options.rateY : 1;
		this.rateZ = ThreeUtil.isNotNull(options.rateZ) ? options.rateZ : 1;
	}

	/**
	 * Gets point
	 * @param t
	 * @param optionalTarget
	 * @returns
	 */
	public getPoint(t: number, optionalTarget: I3JS.IVector3) {
		const point = optionalTarget || new N3JS.Vector3();
		const v = Math.max(-1, Math.min(1, t * 2 - 1));
		let y = this.easeFunction(t) * 2 - 1;
		return point
			.set(v * this.rateX, y * this.rateY, y * this.rateZ)
			.multiplyScalar(this.radius);
	}
}

/**
 * Curves gsap linear ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapLinearEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/linearin) page for a live curve demo.
 *
 */
export class CurvesGsapLinearEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Linear.easeIn, radius, options);
	}
}

/**
 * Curves gsap linear ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapLinearEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/linearinout) page for a live curve demo.
 *
 */
export class CurvesGsapLinearEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Linear.easeInOut, radius, options);
	}
}

/**
 * Curves gsap linear ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapLinearEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/linearout) page for a live curve demo.
 *
 */
export class CurvesGsapLinearEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Linear.easeOut, radius, options);
	}
}

/**
 * Curves gsap linear ease none
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapLinearEaseNone) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/linearnone) page for a live curve demo.
 *
 */
export class CurvesGsapLinearEaseNone extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Linear.easeNone, radius, options);
	}
}

/**
 * Curves gsap quad ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapQuadEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quadin) page for a live curve demo.
 *
 */
export class CurvesGsapQuadEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quad.easeIn, radius, options);
	}
}

/**
 * Curves gsap quad ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapQuadEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quadinout) page for a live curve demo.
 *
 */
export class CurvesGsapQuadEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quad.easeInOut, radius, options);
	}
}

/**
 * Curves gsap quad ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapQuadEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quadout) page for a live curve demo.
 *
 */
export class CurvesGsapQuadEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quad.easeOut, radius, options);
	}
}

/**
 * Curves gsap cubic ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapCubicEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/cubicin) page for a live curve demo.
 *
 */
export class CurvesGsapCubicEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Cubic.easeIn, radius, options);
	}
}

/**
 * Curves gsap cubic ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapCubicEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/cubicinout) page for a live curve demo.
 *
 */
export class CurvesGsapCubicEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Cubic.easeInOut, radius, options);
	}
}

/**
 * Curves gsap cubic ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapCubicEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/cubicout) page for a live curve demo.
 *
 */
export class CurvesGsapCubicEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Cubic.easeOut, radius, options);
	}
}

/**
 * Curves gsap quart ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapQuartEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quartin) page for a live curve demo.
 *
 */
export class CurvesGsapQuartEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quart.easeIn, radius, options);
	}
}

/**
 * Curves gsap quart ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapQuartEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quartinout) page for a live curve demo.
 *
 */
export class CurvesGsapQuartEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quart.easeInOut, radius, options);
	}
}

/**
 * Curves gsap quart ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapQuartEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quartout) page for a live curve demo.
 *
 */
export class CurvesGsapQuartEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quart.easeOut, radius, options);
	}
}

/**
 * Curves gsap quint ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapQuintEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quintin) page for a live curve demo.
 *
 */
export class CurvesGsapQuintEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quint.easeIn, radius, options);
	}
}

/**
 * Curves gsap quint ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapQuintEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quintinout) page for a live curve demo.
 *
 */
export class CurvesGsapQuintEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quint.easeInOut, radius, options);
	}
}

/**
 * Curves gsap quint ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapQuintEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quintout) page for a live curve demo.
 *
 */
export class CurvesGsapQuintEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quint.easeOut, radius, options);
	}
}

/**
 * Curves gsap strong ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapStrongEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/strongin) page for a live curve demo.
 *
 */
export class CurvesGsapStrongEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Strong.easeIn, radius, options);
	}
}

/**
 * Curves gsap strong ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapStrongEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/stronginout) page for a live curve demo.
 *
 */
export class CurvesGsapStrongEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Strong.easeInOut, radius, options);
	}
}

/**
 * Curves gsap strong ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapStrongEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/strongout) page for a live curve demo.
 *
 */
export class CurvesGsapStrongEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Strong.easeOut, radius, options);
	}
}

/**
 * Curves gsap power1 ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapPower1EaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/power1in) page for a live curve demo.
 *
 */
export class CurvesGsapPower1EaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power1.easeIn, radius, options);
	}
}

/**
 * Curves gsap power1 ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapPower1EaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/power1inout) page for a live curve demo.
 *
 */
export class CurvesGsapPower1EaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power1.easeInOut, radius, options);
	}
}

/**
 * Curves gsap power1 ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapPower1EaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/power1out) page for a live curve demo.
 *
 */
export class CurvesGsapPower1EaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power1.easeOut, radius, options);
	}
}

/**
 * Curves gsap power2 ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapPower2EaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/power2in) page for a live curve demo.
 *
 */
export class CurvesGsapPower2EaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power2.easeIn, radius, options);
	}
}

/**
 * Curves gsap power2 ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapPower2EaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/power2inout) page for a live curve demo.
 *
 */
export class CurvesGsapPower2EaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power2.easeInOut, radius, options);
	}
}

/**
 * Curves gsap power2 ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapPower2EaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/power2out) page for a live curve demo.
 *
 */
export class CurvesGsapPower2EaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power2.easeOut, radius, options);
	}
}

/**
 * Curves gsap power3 ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapPower3EaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/power3in) page for a live curve demo.
 *
 */
export class CurvesGsapPower3EaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power3.easeIn, radius, options);
	}
}

/**
 * Curves gsap power3 ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapPower3EaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/power3inout) page for a live curve demo.
 *
 */
export class CurvesGsapPower3EaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power3.easeInOut, radius, options);
	}
}

/**
 * Curves gsap power3 ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapPower3EaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/power3out) page for a live curve demo.
 *
 */
export class CurvesGsapPower3EaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power3.easeOut, radius, options);
	}
}

/**
 * Curves gsap power4 ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapPower4EaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/power4in) page for a live curve demo.
 *
 */
export class CurvesGsapPower4EaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power4.easeIn, radius, options);
	}
}

/**
 * Curves gsap power4 ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapPower4EaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/power4inout) page for a live curve demo.
 *
 */
export class CurvesGsapPower4EaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power4.easeInOut, radius, options);
	}
}

/**
 * Curves gsap power4 ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapPower4EaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/power4out) page for a live curve demo.
 *
 */
export class CurvesGsapPower4EaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power4.easeOut, radius, options);
	}
}

/**
 * Curves gsap back ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapBackEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/backin) page for a live curve demo.
 *
 */
export class CurvesGsapBackEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Back.easeIn, radius, options);
	}
}

/**
 * Curves gsap back ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapBackEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/backinout) page for a live curve demo.
 *
 */
export class CurvesGsapBackEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Back.easeInOut, radius, options);
	}
}

/**
 * Curves gsap back ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapBackEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/backout) page for a live curve demo.
 *
 */
export class CurvesGsapBackEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Back.easeOut, radius, options);
	}
}

/**
 * Curves gsap elastic ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapElasticEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/elasticin) page for a live curve demo.
 *
 */
export class CurvesGsapElasticEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Elastic.easeIn, radius, options);
	}
}

/**
 * Curves gsap elastic ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapElasticEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/elasticout) page for a live curve demo.
 *
 */
export class CurvesGsapElasticEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Elastic.easeInOut, radius, options);
	}
}

/**
 * Curves gsap elastic ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapElasticEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/elasticinout) page for a live curve demo.
 *
 */
export class CurvesGsapElasticEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Elastic.easeOut, radius, options);
	}
}

/**
 * Curves gsap bounce ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapBounceEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/bouncein) page for a live curve demo.
 *
 */
export class CurvesGsapBounceEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Bounce.easeIn, radius, options);
	}
}

/**
 * Curves gsap bounce ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapBounceEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/bounceinout) page for a live curve demo.
 *
 */
export class CurvesGsapBounceEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Bounce.easeInOut, radius, options);
	}
}

/**
 * Curves gsap bounce ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapBounceEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/bounceout) page for a live curve demo.
 *
 */
export class CurvesGsapBounceEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Bounce.easeOut, radius, options);
	}
}

/**
 * Curves gsap circ ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapCircEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/circin) page for a live curve demo.
 *
 */
export class CurvesGsapCircEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Circ.easeIn, radius, options);
	}
}

/**
 * Curves gsap circ ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapCircEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/circinout) page for a live curve demo.
 *
 */
export class CurvesGsapCircEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Circ.easeInOut, radius, options);
	}
}

/**
 * Curves gsap circ ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapCircEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/circout) page for a live curve demo.
 *
 */
export class CurvesGsapCircEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Circ.easeOut, radius, options);
	}
}

/**
 * Curves gsap expo ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapExpoEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/expoin) page for a live curve demo.
 *
 */
export class CurvesGsapExpoEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Expo.easeIn, radius, options);
	}
}

/**
 * Curves gsap expo ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapExpoEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/expoinout) page for a live curve demo.
 *
 */
export class CurvesGsapExpoEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Expo.easeInOut, radius, options);
	}
}

/**
 * Curves gsap expo ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapExpoEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/expoout) page for a live curve demo.
 *
 */
export class CurvesGsapExpoEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Expo.easeOut, radius, options);
	}
}

/**
 * Curves gsap sine ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapSineEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/sinein) page for a live curve demo.
 *
 */
export class CurvesGsapSineEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Sine.easeIn, radius, options);
	}
}

/**
 * Curves gsap sine ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapSineEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/sineinout) page for a live curve demo.
 *
 */
export class CurvesGsapSineEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Sine.easeInOut, radius, options);
	}
}

/**
 * Curves gsap sine ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapSineEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/sineout) page for a live curve demo.
 *
 */
export class CurvesGsapSineEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Sine.easeOut, radius, options);
	}
}

/**
 * Curves gsap power0 ease none
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesGsapPower0EaseNone) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/power0none) page for a live curve demo.
 *
 */
export class CurvesGsapPower0EaseNone extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power0.easeNone, radius, options);
	}
}
