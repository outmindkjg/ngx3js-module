import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { ICurveClass, ICurvesNormalParameters, IRendererTimer } from '../ngx-interface';
import { CurvesCircle } from './curves/circle';
import * as TWEEN from './curves/tween';
import { CurvesLine } from './curves/line';
import * as POLYGON from './curves/polygon';
import { CurvesRollerCoaster } from './curves/rollercoaster';


export const CurveConf: {
	[key: string]: ICurveClass | string;
} = {
	grannyknotcurve: N3JS.Curves.GrannyKnot,
	grannyknot: 'grannyknotcurve',
	heartcurve: N3JS.Curves.HeartCurve,
	heart: 'heartcurve',
	vivianicurve: N3JS.Curves.VivianiCurve,
	viviani: 'vivianicurve',
	knotcurve: N3JS.Curves.KnotCurve,
	knot: 'knotcurve',
	helixcurve: N3JS.Curves.HelixCurve,
	helix: 'helixcurve',
	trefoilknotcurve: N3JS.Curves.TrefoilKnot,
	trefoilknot: 'trefoilknotcurve',
	torusknotcurve: N3JS.Curves.TorusKnot,
	torusknot: 'torusknotcurve',
	cinquefoilknotcurve: N3JS.Curves.CinquefoilKnot,
	cinquefoilknot: 'cinquefoilknotcurve',
	trefoilpolynomialknotcurve: N3JS.Curves.TrefoilPolynomialKnot,
	trefoilpolynomialknot: 'trefoilpolynomialknotcurve',
	decoratedtorusknot4bcurve: N3JS.Curves.DecoratedTorusKnot4b,
	decoratedtorusknot4b: 'decoratedtorusknot4bcurve',
	decoratedtorusknot4acurve: N3JS.Curves.DecoratedTorusKnot4a,
	decoratedtorusknot4a: 'decoratedtorusknot4acurve',
	figureeightpolynomialknotcurve: N3JS.Curves.FigureEightPolynomialKnot,
	figureeightpolynomialknot: 'figureeightpolynomialknotcurve',
	decoratedtorusknot5acurve: N3JS.Curves.DecoratedTorusKnot5a,
	decoratedtorusknot5a: 'decoratedtorusknot5acurve',
	decoratedtorusknot5ccurve: N3JS.Curves.DecoratedTorusKnot5c,
	decoratedtorusknot5c: 'decoratedtorusknot5ccurve',
	circlecurve: CurvesCircle,
	circle: 'circlecurve',
	linecurve: CurvesLine,
	line: 'linecurve',
	trianglecurve: POLYGON.CurvesRegularPolygonTriangle,
	triangle: 'trianglecurve',
	squarecurve: POLYGON.CurvesRegularPolygonSquare,
	square: 'squarecurve',
	pentagoncurve: POLYGON.CurvesRegularPolygonPentagon,
	pentagon: 'pentagoncurve',
	hexagoncurve: POLYGON.CurvesRegularPolygonHexagon,
	hexagon: 'hexagoncurve',
	heptagoncurve: POLYGON.CurvesRegularPolygonHeptagon,
	heptagon: 'heptagoncurve',
	octagoncurve: POLYGON.CurvesRegularPolygonOctagon,
	octagon: 'octagoncurve',
	nonagoncurve: POLYGON.CurvesRegularPolygonNonagon,
	nonagon: 'nonagoncurve',
	decagoncurve: POLYGON.CurvesRegularPolygonDecagon,
	decagon: 'decagoncurve',
	undecagoncurve: POLYGON.CurvesRegularPolygonUndecagon,
	undecagon: 'undecagoncurve',
	dodecagoncurve: POLYGON.CurvesRegularPolygonDodecagon,
	dodecagon: 'dodecagoncurve',
	linearincurve: TWEEN.CurvesTweenLinearEaseIn,
	linearin: 'linearincurve',
	linearinoutcurve: TWEEN.CurvesTweenLinearEaseInOut,
	linearinout: 'linearinoutcurve',
	linearoutcurve: TWEEN.CurvesTweenLinearEaseOut,
	linearout: 'linearoutcurve',
	lineareasenonecurve: TWEEN.CurvesTweenLinearEaseNone,
	lineareasenone: 'lineareasenonecurve',
	quadincurve: TWEEN.CurvesTweenQuadEaseIn,
	quadin: 'quadincurve',
	quadinoutcurve: TWEEN.CurvesTweenQuadEaseInOut,
	quadinout: 'quadinoutcurve',
	quadoutcurve: TWEEN.CurvesTweenQuadEaseOut,
	quadout: 'quadoutcurve',
	cubicincurve: TWEEN.CurvesTweenCubicEaseIn,
	cubicin: 'cubicincurve',
	cubicinoutcurve: TWEEN.CurvesTweenCubicEaseInOut,
	cubicinout: 'cubicinoutcurve',
	cubicoutcurve: TWEEN.CurvesTweenCubicEaseOut,
	cubicout: 'cubicoutcurve',
	quartincurve: TWEEN.CurvesTweenQuartEaseIn,
	quartin: 'quartincurve',
	quartinoutcurve: TWEEN.CurvesTweenQuartEaseInOut,
	quartinout: 'quartinoutcurve',
	quartoutcurve: TWEEN.CurvesTweenQuartEaseOut,
	quartout: 'quartoutcurve',
	quintincurve: TWEEN.CurvesTweenQuintEaseIn,
	quintin: 'quintincurve',
	quintinoutcurve: TWEEN.CurvesTweenQuintEaseInOut,
	quintinout: 'quintinoutcurve',
	quintoutcurve: TWEEN.CurvesTweenQuintEaseOut,
	quintout: 'quintoutcurve',
	backincurve: TWEEN.CurvesTweenBackEaseIn,
	backin: 'backincurve',
	backinoutcurve: TWEEN.CurvesTweenBackEaseInOut,
	backinout: 'backinoutcurve',
	backoutcurve: TWEEN.CurvesTweenBackEaseOut,
	backout: 'backoutcurve',
	elasticincurve: TWEEN.CurvesTweenElasticEaseIn,
	elasticin: 'elasticincurve',
	elasticinoutcurve: TWEEN.CurvesTweenElasticEaseInOut,
	elasticinout: 'elasticinoutcurve',
	elasticoutcurve: TWEEN.CurvesTweenElasticEaseOut,
	elasticout: 'elasticoutcurve',
	bounceincurve: TWEEN.CurvesTweenBounceEaseIn,
	bouncein: 'bounceincurve',
	bounceinoutcurve: TWEEN.CurvesTweenBounceEaseInOut,
	bounceinout: 'bounceinoutcurve',
	bounceoutcurve: TWEEN.CurvesTweenBounceEaseOut,
	bounceout: 'bounceoutcurve',
	circincurve: TWEEN.CurvesTweenCircEaseIn,
	circin: 'circincurve',
	circinoutcurve: TWEEN.CurvesTweenCircEaseInOut,
	circinout: 'circinoutcurve',
	circoutcurve: TWEEN.CurvesTweenCircEaseOut,
	circout: 'circoutcurve',
	expoincurve: TWEEN.CurvesTweenExpoEaseIn,
	expoin: 'expoincurve',
	expoinoutcurve: TWEEN.CurvesTweenExpoEaseInOut,
	expoinout: 'expoinoutcurve',
	expooutcurve: TWEEN.CurvesTweenExpoEaseOut,
	expoout: 'expooutcurve',
	sineincurve: TWEEN.CurvesTweenSineEaseIn,
	sinein: 'sineincurve',
	sineinoutcurve: TWEEN.CurvesTweenSineEaseInOut,
	sineinout: 'sineinoutcurve',
	sineoutcurve: TWEEN.CurvesTweenSineEaseOut,
	sineout: 'sineoutcurve',
	rollercoastercurve: CurvesRollerCoaster,
	rollercoaster: 'rollercoastercurve',
};

/**
 * Curve utils
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurveUtils) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve) page for a live curve demo.
 *
 */
export class NgxCurveUtils {
	/**
	 * Adds curve
	 * @param key
	 * @param curve
	 * @param [alias]
	 */
	public static addCurve(key: string, curve: ICurveClass, alias?: string[]) {
		key = key.toLowerCase();
		if (NgxThreeUtil.isNotNull(alias)) {
			alias.forEach((aliasKey) => {
				if (aliasKey !== null && aliasKey.length > 3) {
					CurveConf[aliasKey.toLowerCase()] = key;
				}
			});
		}
		CurveConf[key] = curve;
	}

	/**
	 * Gets curve class
	 * @param key
	 * @returns curve class
	 */
	public static getCurveClass(key: string): ICurveClass {
		key = key.toLowerCase();
		if (NgxThreeUtil.isNotNull(CurveConf[key])) {
			const curve = CurveConf[key.toLowerCase()];
			if (typeof curve === 'string') {
				return this.getCurveClass(curve);
			} else {
				return curve;
			}
		} else {
			console.error('unknown curve :' + key);
			return CurvesLine;
		}
	}

	/**
	 * Gets curve
	 * @param key
	 * @param [scale]
	 * @param [options]
	 * @returns curve
	 */
	public static getCurve(
		key: string,
		scale?: number,
		options?: any
	): I3JS.Curve<I3JS.Vector3> {
		const curve = this.getCurveClass(key);
		return new curve(scale, options);
	}

	/**
	 * Gets curve normal
	 * @param key
	 * @param [normalOption]
	 * @param [option]
	 * @returns curve normal
	 */
	public static getCurveNormal(
		key: string | I3JS.Curve<I3JS.Vector3>,
		normalOption?: ICurvesNormalParameters,
		option?: any
	): CurvesNormal {
		if (key instanceof N3JS.Curve) {
			return new CurvesNormal(key, normalOption);
		} else if (typeof key === 'string') {
			return new CurvesNormal(this.getCurve(key, option), normalOption);
		} else {
			return new CurvesNormal(this.getCurve('circle', option), normalOption);
		}
	}
}

/**
 * Curves normal
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesNormal) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve) page for a live curve demo.
 *
 */
export class CurvesNormal extends N3JS.CurveVector3 {
	/**
	 * The Scale of curves normal
	 */
	private scale: I3JS.Vector3 = null;

	/**
	 * The Rotation of curves normal
	 */
	private rotation: I3JS.Euler = null;

	/**
	 * The Center of curves normal
	 */
	private center: I3JS.Vector3 = null;

	/**
	 * The Multiply of curves normal
	 */
	private multiply: number = null;

	/**
	 * Creates an instance of curves normal.
	 * @param curve
	 * @param parameters
	 */
	constructor(
		curve: I3JS.Curve<I3JS.Vector3>,
		parameters: ICurvesNormalParameters
	) {
		super();
		parameters = parameters || {};
		if (NgxThreeUtil.isNotNull(parameters.rotation)) {
			this.rotation = parameters.rotation;
		}
		if (NgxThreeUtil.isNotNull(parameters.scale)) {
			this.scale = parameters.scale;
		}
		if (NgxThreeUtil.isNotNull(parameters.center)) {
			this.center = parameters.center;
		}
		if (NgxThreeUtil.isNotNull(parameters.multiply)) {
			this.multiply = parameters.multiply;
		}
		if (NgxThreeUtil.isNull(this.multiply) || this.multiply === 1) {
			this.multiply = null;
		}
		this.setOptions(parameters.options);
		this.setCurve(curve);
	}

	/**
	 * The Curve of curves normal
	 */
	public curve: I3JS.Curve<I3JS.Vector3> = null;

	/**
	 * Sets options
	 * @param options
	 */
	public setOptions(options: string) {
		if (NgxThreeUtil.isNotNull(options)) {
			options.split(',').forEach((option) => {
				switch (option.toLowerCase()) {
					case 'absx':
						this._absX = true;
						break;
					case 'absy':
						this._absY = true;
						break;
					case 'absz':
						this._absZ = true;
						break;
					case 'once':
						this._repeatType = 'once';
						break;
					case 'repeat':
						this._repeatType = 'repeat';
						break;
					case 'yoyo':
						this._repeatType = 'yoyo';
						break;
				}
			});
		}
	}

	/**
	 * Sets curve
	 * @param curve
	 */
	public setCurve(curve: I3JS.Curve<I3JS.Vector3>) {
		let minX = +Infinity;
		let minY = +Infinity;
		let minZ = +Infinity;
		let maxX = -Infinity;
		let maxY = -Infinity;
		let maxZ = -Infinity;
		for (let i = 0; i <= 1; i += 0.02) {
			const v = curve.getPoint(i);
			minX = Math.min(minX, v.x);
			minY = Math.min(minY, v.y);
			minZ = Math.min(minZ, v.z);
			maxX = Math.max(maxX, v.x);
			maxY = Math.max(maxY, v.y);
			maxZ = Math.max(maxZ, v.z);
		}
		this.curve = curve;
		this._center = new N3JS.Vector3(
			minX + maxX,
			minY + maxY,
			minZ + maxZ
		).multiplyScalar(0.5);
		const maxL = Math.max(maxX - minX, maxY - minY, maxZ - minZ);
		this._scale = new N3JS.Vector3(1, 1, 1);
		if (maxL > 2.5) {
			this._scale.multiplyScalar(2 / maxL);
		}
	}

	/**
	 * The Center of curves normal
	 */
	private _center: I3JS.Vector3 = null;

	/**
	 * The Scale of curves normal
	 */
	private _scale: I3JS.Vector3 = null;

	/**
	 * Abs x of curves normal
	 */
	private _absX: boolean = false;

	/**
	 * Abs y of curves normal
	 */
	private _absY: boolean = false;

	/**
	 * Abs z of curves normal
	 */
	private _absZ: boolean = false;

	/**
	 * Repeat type of curves normal
	 */
	private _repeatType: string = 'repeat';

	/**
	 * Gets point
	 * @param t
	 * @param [optionalTarget]
	 * @returns point
	 */
	public getPoint(t: number, optionalTarget?: I3JS.Vector3): I3JS.Vector3 {
		optionalTarget = this.curve.getPoint(t, optionalTarget);
		optionalTarget.sub(this._center);
		if (this._scale !== null) {
			optionalTarget.multiply(this._scale);
		}
		if (this.rotation !== null) {
			optionalTarget.applyEuler(this.rotation);
		}
		if (this.scale !== null) {
			optionalTarget.multiply(this.scale);
		}
		if (this.multiply !== null) {
			optionalTarget.multiplyScalar(this.multiply);
		}
		if (this._absX) {
			optionalTarget.x = Math.abs(optionalTarget.x);
		}
		if (this._absY) {
			optionalTarget.y = Math.abs(optionalTarget.y);
		}
		if (this._absZ) {
			optionalTarget.z = Math.abs(optionalTarget.z);
		}
		if (NgxThreeUtil.isNotNull(this.center)) {
			optionalTarget.add(this.center);
		}
		return optionalTarget;
	}

	/**
	 * Gets elapsed time
	 * @param timer
	 * @returns elapsed time
	 */
	private getElapsedTime(timer: IRendererTimer): number {
		let t: number = timer.elapsedTime;
		switch (this._repeatType.toLowerCase()) {
			case 'yoyo':
				t = t % 2;
				if (t > 1) {
					t = 2 - t;
				}
				break;
			case 'once':
				t = Math.max(0, Math.min(1, t));
				break;
			default:
				t = t % 1;
				break;
		}
		return t;
	}

	/**
	 * Last v3 of curves normal
	 */
	private _lastV3: I3JS.Vector3 = null;

	/**
	 * Refer center of curves normal
	 */
	public referCenter: I3JS.Vector3 = null;

	/**
	 * Gets point v3
	 * @param timer
	 * @param p
	 * @returns point v3
	 */
	public getPointV3(timer: IRendererTimer, p: I3JS.Vector3): I3JS.Vector3 {
		const cp = this.getPoint(this.getElapsedTime(timer));
		if (this._lastV3 === null) {
			this._lastV3 = new N3JS.Vector3(cp.x, cp.y, cp.z);
		} else {
			this._lastV3.copy(cp);
		}
		if (this.referCenter !== null) {
			this._lastV3.add(this.referCenter);
		}
		p.copy(this._lastV3);
		return this._lastV3;
	}

	/**
	 * Last v2 of curves normal
	 */
	private _lastV2: I3JS.Vector2 = null;

	/**
	 * Gets point v2
	 * @param timer
	 * @param p
	 * @returns point v2
	 */
	public getPointV2(timer: IRendererTimer, p: I3JS.Vector2): I3JS.Vector2 {
		const cp = this.getPoint(this.getElapsedTime(timer));
		if (this._lastV2 === null) {
			this._lastV2 = new N3JS.Vector2(cp.x, cp.y);
		} else {
			this._lastV2.set(cp.x, cp.y);
		}
		p.copy(this._lastV2);
		return this._lastV2;
	}

	/**
	 * Last euler of curves normal
	 */
	private _lastEuler: I3JS.Euler = null;

	/**
	 * Gets point euler
	 * @param timer
	 * @param p
	 * @returns point euler
	 */
	public getPointEuler(timer: IRendererTimer, p: I3JS.Euler): I3JS.Euler {
		const cp = this.getPoint(this.getElapsedTime(timer));
		if (this._lastEuler === null) {
			this._lastEuler = new N3JS.Euler(cp.x, cp.y, cp.z);
		} else {
			this._lastEuler.set(cp.x, cp.y, cp.z);
		}
		p.copy(this._lastEuler);
		return this._lastEuler;
	}

	/**
	 * Last color of curves normal
	 */
	private _lastColor: I3JS.Color = null;

	/**
	 * Gets point color
	 * @param timer
	 * @param p
	 * @returns point color
	 */
	public getPointColor(timer: IRendererTimer, p: I3JS.Color): I3JS.Color {
		const cp = this.getPoint(this.getElapsedTime(timer));
		cp.clampScalar(0, 1);
		if (this._lastColor === null) {
			this._lastColor = new N3JS.Color(cp.x, cp.y, cp.z);
		} else {
			this._lastColor.setRGB(cp.x, cp.y, cp.z);
		}
		p.copy(this._lastColor);
		return this._lastColor;
	}

	/**
	 * Last float of curves normal
	 */
	private _lastFloat: I3JS.Vector3 = null;

	/**
	 * Gets point float
	 * @param timer
	 * @param [min]
	 * @param [max]
	 * @returns point float
	 */
	public getPointFloat(
		timer: IRendererTimer,
		min: number = 0,
		max: number = 1
	): number {
		if (this._lastFloat === null) {
			this._lastFloat = new N3JS.Vector3();
		}
		this.getPointV3(timer, this._lastFloat);
		const length = Math.max(0, Math.min(1, (this._lastFloat.y + 1) / 2));
		return min + (max - min) * length;
	}
}
