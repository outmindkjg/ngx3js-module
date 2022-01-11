import { I3JS, N3JS, NgxThreeUtil } from '../../interface';
import { ICurvesParameters } from '../../ngx-interface';

/**
 * Curves tween
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTween) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/linearin) page for a live curve demo.
 *
 */
export class CurvesTween extends N3JS.CurveVector3 {
	/**
	 * Ease function of curves tween
	 */
	private easeFunction: (progress: number) => number;

	/**
	 * The Radius of curves tween
	 */
	private radius: number = 1;

	/**
	 * Rate x of curves tween
	 */
	private rateX: number = 1;

	/**
	 * Rate y of curves tween
	 */
	private rateY: number = 0.2;

	/**
	 * Rate z of curves tween
	 */
	private rateZ: number = 1;

	/**
	 * Creates an instance of curves tween.
	 * @param easeFunction
	 * @param [radius]
	 * @param [options]
	 */
	constructor(
		easeFunction: (progress: number) => number,
		radius: number = 1,
		options?: ICurvesParameters
	) {
		super();
		this.easeFunction = easeFunction || N3JS.Easing.Linear.None;
		options = options || {};
		this.radius = NgxThreeUtil.isNotNull(radius) ? radius : 1;
		this.rateX = NgxThreeUtil.isNotNull(options.rateX) ? options.rateX : 1;
		this.rateY = NgxThreeUtil.isNotNull(options.rateY) ? options.rateY : 1;
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
		const v = Math.max(-1, Math.min(1, t * 2 - 1));
		let y = this.easeFunction(t) * 2 - 1;
		return point
			.set(v * this.rateX, y * this.rateY, y * this.rateZ)
			.multiplyScalar(this.radius);
	}
}

/**
 * Curves tween linear ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenLinearEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/linearin) page for a live curve demo.
 *
 */
export class CurvesTweenLinearEaseIn extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Linear.None, radius, options);
	}
}

/**
 * Curves tween linear ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenLinearEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/linearinout) page for a live curve demo.
 *
 */
export class CurvesTweenLinearEaseInOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Linear.None, radius, options);
	}
}

/**
 * Curves tween linear ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenLinearEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/linearout) page for a live curve demo.
 *
 */
export class CurvesTweenLinearEaseOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Linear.None, radius, options);
	}
}

/**
 * Curves tween linear ease none
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenLinearEaseNone) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/linearnone) page for a live curve demo.
 *
 */
export class CurvesTweenLinearEaseNone extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Linear.None, radius, options);
	}
}

/**
 * Curves tween quad ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenQuadEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quadin) page for a live curve demo.
 *
 */
export class CurvesTweenQuadEaseIn extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Quadratic.In, radius, options);
	}
}

/**
 * Curves tween quad ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenQuadEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quadinout) page for a live curve demo.
 *
 */
export class CurvesTweenQuadEaseInOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Quadratic.InOut, radius, options);
	}
}

/**
 * Curves tween quad ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenQuadEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quadout) page for a live curve demo.
 *
 */
export class CurvesTweenQuadEaseOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Quadratic.Out, radius, options);
	}
}

/**
 * Curves tween cubic ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenCubicEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/cubicin) page for a live curve demo.
 *
 */
export class CurvesTweenCubicEaseIn extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Cubic.In, radius, options);
	}
}

/**
 * Curves tween cubic ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenCubicEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/cubicinout) page for a live curve demo.
 *
 */
export class CurvesTweenCubicEaseInOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Cubic.InOut, radius, options);
	}
}

/**
 * Curves tween cubic ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenCubicEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/cubicout) page for a live curve demo.
 *
 */
export class CurvesTweenCubicEaseOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Cubic.Out, radius, options);
	}
}

/**
 * Curves tween quart ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenQuartEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quartin) page for a live curve demo.
 *
 */
export class CurvesTweenQuartEaseIn extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Quartic.In, radius, options);
	}
}

/**
 * Curves tween quart ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenQuartEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quartinout) page for a live curve demo.
 *
 */
export class CurvesTweenQuartEaseInOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Quartic.InOut, radius, options);
	}
}

/**
 * Curves tween quart ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenQuartEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quartout) page for a live curve demo.
 *
 */
export class CurvesTweenQuartEaseOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Quartic.Out, radius, options);
	}
}

/**
 * Curves tween quint ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenQuintEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quintin) page for a live curve demo.
 *
 */
export class CurvesTweenQuintEaseIn extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Quintic.In, radius, options);
	}
}

/**
 * Curves tween quint ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenQuintEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quintinout) page for a live curve demo.
 *
 */
export class CurvesTweenQuintEaseInOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Quintic.InOut, radius, options);
	}
}

/**
 * Curves tween quint ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenQuintEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/quintout) page for a live curve demo.
 *
 */
export class CurvesTweenQuintEaseOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Quintic.Out, radius, options);
	}
}

/**
 * Curves tween back ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenBackEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/backin) page for a live curve demo.
 *
 */
export class CurvesTweenBackEaseIn extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Back.In, radius, options);
	}
}

/**
 * Curves tween back ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenBackEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/backinout) page for a live curve demo.
 *
 */
export class CurvesTweenBackEaseInOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Back.InOut, radius, options);
	}
}

/**
 * Curves tween back ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenBackEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/backout) page for a live curve demo.
 *
 */
export class CurvesTweenBackEaseOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Back.Out, radius, options);
	}
}

/**
 * Curves tween elastic ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenElasticEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/elasticin) page for a live curve demo.
 *
 */
export class CurvesTweenElasticEaseIn extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Elastic.In, radius, options);
	}
}

/**
 * Curves tween elastic ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenElasticEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/elasticout) page for a live curve demo.
 *
 */
export class CurvesTweenElasticEaseInOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Elastic.InOut, radius, options);
	}
}

/**
 * Curves tween elastic ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenElasticEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/elasticinout) page for a live curve demo.
 *
 */
export class CurvesTweenElasticEaseOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Elastic.Out, radius, options);
	}
}

/**
 * Curves tween bounce ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenBounceEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/bouncein) page for a live curve demo.
 *
 */
export class CurvesTweenBounceEaseIn extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Bounce.In, radius, options);
	}
}

/**
 * Curves tween bounce ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenBounceEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/bounceinout) page for a live curve demo.
 *
 */
export class CurvesTweenBounceEaseInOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Bounce.InOut, radius, options);
	}
}

/**
 * Curves tween bounce ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenBounceEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/bounceout) page for a live curve demo.
 *
 */
export class CurvesTweenBounceEaseOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Bounce.Out, radius, options);
	}
}

/**
 * Curves tween circ ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenCircEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/circin) page for a live curve demo.
 *
 */
export class CurvesTweenCircEaseIn extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Circular.In, radius, options);
	}
}

/**
 * Curves tween circ ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenCircEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/circinout) page for a live curve demo.
 *
 */
export class CurvesTweenCircEaseInOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Circular.InOut, radius, options);
	}
}

/**
 * Curves tween circ ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenCircEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/circout) page for a live curve demo.
 *
 */
export class CurvesTweenCircEaseOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Circular.Out, radius, options);
	}
}

/**
 * Curves tween expo ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenExpoEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/expoin) page for a live curve demo.
 *
 */
export class CurvesTweenExpoEaseIn extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Exponential.In, radius, options);
	}
}

/**
 * Curves tween expo ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenExpoEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/expoinout) page for a live curve demo.
 *
 */
export class CurvesTweenExpoEaseInOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Exponential.InOut, radius, options);
	}
}

/**
 * Curves tween expo ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenExpoEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/expoout) page for a live curve demo.
 *
 */
export class CurvesTweenExpoEaseOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Exponential.Out, radius, options);
	}
}

/**
 * Curves tween sine ease in
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenSineEaseIn) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/sinein) page for a live curve demo.
 *
 */
export class CurvesTweenSineEaseIn extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Sinusoidal.In, radius, options);
	}
}

/**
 * Curves tween sine ease in out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenSineEaseInOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/sineinout) page for a live curve demo.
 *
 */
export class CurvesTweenSineEaseInOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Sinusoidal.InOut, radius, options);
	}
}

/**
 * Curves tween sine ease out
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesTweenSineEaseOut) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve/sineout) page for a live curve demo.
 *
 */
export class CurvesTweenSineEaseOut extends CurvesTween {
	constructor(radius: number = 1, options?: ICurvesParameters) {
		super(N3JS.Easing.Sinusoidal.Out, radius, options);
	}
}
