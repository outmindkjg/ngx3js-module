import * as Curves from './curves/curves';
import { RendererTimer, ThreeUtil, THREE, I3JS } from '../interface';
import { CurvesCircle } from './curves/circle';
import * as GSAP from './curves/gsap';
import { CurvesLine } from './curves/line';
import * as POLYGON from './curves/polygon';
import { CurvesRollerCoaster } from './curves/rollercoaster';

/**
 * Curve class
 */
export interface CurveClass {
	new (scale?: number, options?: any): I3JS.ICurve<I3JS.IVector3>;
}

export const CurveConf: {
	[key: string]: CurveClass | string;
} = {
	grannyknotcurve: Curves.CurvesGrannyKnot as any,
	grannyknot: 'grannyknotcurve',
	heartcurve: Curves.CurvesHeartCurve as any,
	heart: 'heartcurve',
	vivianicurve: Curves.CurvesVivianiCurve as any,
	viviani: 'vivianicurve',
	knotcurve: Curves.CurvesKnotCurve as any,
	knot: 'knotcurve',
	helixcurve: Curves.CurvesHelixCurve as any,
	helix: 'helixcurve',
	trefoilknotcurve: Curves.CurvesTrefoilKnot as any,
	trefoilknot: 'trefoilknotcurve',
	torusknotcurve: Curves.CurvesTorusKnot as any,
	torusknot: 'torusknotcurve',
	cinquefoilknotcurve: Curves.CurvesCinquefoilKnot as any,
	cinquefoilknot: 'cinquefoilknotcurve',
	trefoilpolynomialknotcurve: Curves.CurvesTrefoilPolynomialKnot as any,
	trefoilpolynomialknot: 'trefoilpolynomialknotcurve',
	decoratedtorusknot4bcurve: Curves.CurvesDecoratedTorusKnot4b as any,
	decoratedtorusknot4b: 'decoratedtorusknot4bcurve',
	decoratedtorusknot4acurve: Curves.CurvesDecoratedTorusKnot4a as any,
	decoratedtorusknot4a: 'decoratedtorusknot4acurve',
	figureeightpolynomialknotcurve: Curves.CurvesFigureEightPolynomialKnot as any,
	figureeightpolynomialknot: 'figureeightpolynomialknotcurve',
	decoratedtorusknot5acurve: Curves.CurvesDecoratedTorusKnot5a as any,
	decoratedtorusknot5a: 'decoratedtorusknot5acurve',
	decoratedtorusknot5ccurve: Curves.CurvesDecoratedTorusKnot5c as any,
	decoratedtorusknot5c: 'decoratedtorusknot5ccurve',
	circlecurve: CurvesCircle as any,
	circle: 'circlecurve',
	linecurve: CurvesLine as any,
	line: 'linecurve',
	trianglecurve: POLYGON.CurvesRegularPolygonTriangle as any,
	triangle: 'trianglecurve',
	squarecurve: POLYGON.CurvesRegularPolygonSquare as any,
	square: 'squarecurve',
	pentagoncurve: POLYGON.CurvesRegularPolygonPentagon as any,
	pentagon: 'pentagoncurve',
	hexagoncurve: POLYGON.CurvesRegularPolygonHexagon as any,
	hexagon: 'hexagoncurve',
	heptagoncurve: POLYGON.CurvesRegularPolygonHeptagon as any,
	heptagon: 'heptagoncurve',
	octagoncurve: POLYGON.CurvesRegularPolygonOctagon as any,
	octagon: 'octagoncurve',
	nonagoncurve: POLYGON.CurvesRegularPolygonNonagon as any,
	nonagon: 'nonagoncurve',
	decagoncurve: POLYGON.CurvesRegularPolygonDecagon as any,
	decagon: 'decagoncurve',
	undecagoncurve: POLYGON.CurvesRegularPolygonUndecagon as any,
	undecagon: 'undecagoncurve',
	dodecagoncurve: POLYGON.CurvesRegularPolygonDodecagon as any,
	dodecagon: 'dodecagoncurve',
	linearincurve: GSAP.CurvesGsapLinearEaseIn as any,
	linearin: 'linearincurve',
	linearinoutcurve: GSAP.CurvesGsapLinearEaseInOut as any,
	linearinout: 'linearinoutcurve',
	linearoutcurve: GSAP.CurvesGsapLinearEaseOut as any,
	linearout: 'linearoutcurve',
	lineareasenonecurve: GSAP.CurvesGsapLinearEaseNone as any,
	lineareasenone: 'lineareasenonecurve',
	quadincurve: GSAP.CurvesGsapQuadEaseIn as any,
	quadin: 'quadincurve',
	quadinoutcurve: GSAP.CurvesGsapQuadEaseInOut as any,
	quadinout: 'quadinoutcurve',
	quadoutcurve: GSAP.CurvesGsapQuadEaseOut as any,
	quadout: 'quadoutcurve',
	cubicincurve: GSAP.CurvesGsapCubicEaseIn as any,
	cubicin: 'cubicincurve',
	cubicinoutcurve: GSAP.CurvesGsapCubicEaseInOut as any,
	cubicinout: 'cubicinoutcurve',
	cubicoutcurve: GSAP.CurvesGsapCubicEaseOut as any,
	cubicout: 'cubicoutcurve',
	quartincurve: GSAP.CurvesGsapQuartEaseIn as any,
	quartin: 'quartincurve',
	quartinoutcurve: GSAP.CurvesGsapQuartEaseInOut as any,
	quartinout: 'quartinoutcurve',
	quartoutcurve: GSAP.CurvesGsapQuartEaseOut as any,
	quartout: 'quartoutcurve',
	quintincurve: GSAP.CurvesGsapQuintEaseIn as any,
	quintin: 'quintincurve',
	quintinoutcurve: GSAP.CurvesGsapQuintEaseInOut as any,
	quintinout: 'quintinoutcurve',
	quintoutcurve: GSAP.CurvesGsapQuintEaseOut as any,
	quintout: 'quintoutcurve',
	strongincurve: GSAP.CurvesGsapStrongEaseIn as any,
	strongin: 'strongincurve',
	stronginoutcurve: GSAP.CurvesGsapStrongEaseInOut as any,
	stronginout: 'stronginoutcurve',
	strongoutcurve: GSAP.CurvesGsapStrongEaseOut as any,
	strongout: 'strongoutcurve',
	power1incurve: GSAP.CurvesGsapPower1EaseIn as any,
	power1in: 'power1incurve',
	power1inoutcurve: GSAP.CurvesGsapPower1EaseInOut as any,
	power1inout: 'power1inoutcurve',
	power1outcurve: GSAP.CurvesGsapPower1EaseOut as any,
	power1out: 'power1outcurve',
	power2incurve: GSAP.CurvesGsapPower2EaseIn as any,
	power2in: 'power2incurve',
	power2inoutcurve: GSAP.CurvesGsapPower2EaseInOut as any,
	power2inout: 'power2inoutcurve',
	power2outcurve: GSAP.CurvesGsapPower2EaseOut as any,
	power2out: 'power2outcurve',
	power3incurve: GSAP.CurvesGsapPower3EaseIn as any,
	power3in: 'power3incurve',
	power3inoutcurve: GSAP.CurvesGsapPower3EaseInOut as any,
	power3inout: 'power3inoutcurve',
	power3outcurve: GSAP.CurvesGsapPower3EaseOut as any,
	power3out: 'power3outcurve',
	power4incurve: GSAP.CurvesGsapPower4EaseIn as any,
	power4in: 'power4incurve',
	power4inoutcurve: GSAP.CurvesGsapPower4EaseInOut as any,
	power4inout: 'power4inoutcurve',
	power4outcurve: GSAP.CurvesGsapPower4EaseOut as any,
	power4out: 'power4outcurve',
	backincurve: GSAP.CurvesGsapBackEaseIn as any,
	backin: 'backincurve',
	backinoutcurve: GSAP.CurvesGsapBackEaseInOut as any,
	backinout: 'backinoutcurve',
	backoutcurve: GSAP.CurvesGsapBackEaseOut as any,
	backout: 'backoutcurve',
	elasticincurve: GSAP.CurvesGsapElasticEaseIn as any,
	elasticin: 'elasticincurve',
	elasticinoutcurve: GSAP.CurvesGsapElasticEaseInOut as any,
	elasticinout: 'elasticinoutcurve',
	elasticoutcurve: GSAP.CurvesGsapElasticEaseOut as any,
	elasticout: 'elasticoutcurve',
	bounceincurve: GSAP.CurvesGsapBounceEaseIn as any,
	bouncein: 'bounceincurve',
	bounceinoutcurve: GSAP.CurvesGsapBounceEaseInOut as any,
	bounceinout: 'bounceinoutcurve',
	bounceoutcurve: GSAP.CurvesGsapBounceEaseOut as any,
	bounceout: 'bounceoutcurve',
	circincurve: GSAP.CurvesGsapCircEaseIn as any,
	circin: 'circincurve',
	circinoutcurve: GSAP.CurvesGsapCircEaseInOut as any,
	circinout: 'circinoutcurve',
	circoutcurve: GSAP.CurvesGsapCircEaseOut as any,
	circout: 'circoutcurve',
	expoincurve: GSAP.CurvesGsapExpoEaseIn as any,
	expoin: 'expoincurve',
	expoinoutcurve: GSAP.CurvesGsapExpoEaseInOut as any,
	expoinout: 'expoinoutcurve',
	expooutcurve: GSAP.CurvesGsapExpoEaseOut as any,
	expoout: 'expooutcurve',
	sineincurve: GSAP.CurvesGsapSineEaseIn as any,
	sinein: 'sineincurve',
	sineinoutcurve: GSAP.CurvesGsapSineEaseInOut as any,
	sineinout: 'sineinoutcurve',
	sineoutcurve: GSAP.CurvesGsapSineEaseOut as any,
	sineout: 'sineoutcurve',
	power0nonecurve: GSAP.CurvesGsapPower0EaseNone as any,
	power0none: 'power0nonecurve',
	rollercoastercurve: CurvesRollerCoaster as any,
	rollercoaster: 'rollercoastercurve',
};

/**
 * Curve utils
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurveUtils) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve) page for a live curve demo.
 *
 */
export class CurveUtils {
	/**
	 * Adds curve
	 * @param key
	 * @param curve
	 * @param [alias]
	 */
	public static addCurve(key: string, curve: CurveClass, alias?: string[]) {
		key = key.toLowerCase();
		if (ThreeUtil.isNotNull(alias)) {
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
	public static getCurveClass(key: string): CurveClass {
		key = key.toLowerCase();
		if (ThreeUtil.isNotNull(CurveConf[key])) {
			const curve = CurveConf[key.toLowerCase()];
			if (typeof curve === 'string') {
				return this.getCurveClass(curve);
			} else {
				return curve;
			}
		} else {
			console.error('unknown curve :' + key);
			return CurvesLine as any;
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
	): I3JS.ICurve<I3JS.IVector3> {
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
		key: string | I3JS.ICurve<I3JS.IVector3>,
		normalOption?: CurvesNormalParameters,
		option?: any
	): CurvesNormal {
		if (key instanceof THREE.Curve) {
			return new CurvesNormal(key, normalOption);
		} else if (typeof key === 'string') {
			return new CurvesNormal(this.getCurve(key, option), normalOption);
		} else {
			return new CurvesNormal(this.getCurve('circle', option), normalOption);
		}
	}
}

/**
 * Curves normal parameters
 */
export interface CurvesNormalParameters {
	scale?: I3JS.IVector3;
	rotation?: I3JS.IEuler;
	center?: I3JS.IVector3;
	multiply?: number;
	options?: string;
}

/**
 * Curves normal
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesNormal) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve) page for a live curve demo.
 *
 */
export class CurvesNormal extends THREE.Curve {
	/**
	 * The Scale of curves normal
	 */
	private scale: I3JS.IVector3 = null;

	/**
	 * The Rotation of curves normal
	 */
	private rotation: I3JS.IEuler = null;

	/**
	 * The Center of curves normal
	 */
	private center: I3JS.IVector3 = null;

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
		curve: I3JS.ICurve<I3JS.IVector3>,
		parameters: CurvesNormalParameters
	) {
		super();
		parameters = parameters || {};
		if (ThreeUtil.isNotNull(parameters.rotation)) {
			this.rotation = parameters.rotation;
		}
		if (ThreeUtil.isNotNull(parameters.scale)) {
			this.scale = parameters.scale;
		}
		if (ThreeUtil.isNotNull(parameters.center)) {
			this.center = parameters.center;
		}
		if (ThreeUtil.isNotNull(parameters.multiply)) {
			this.multiply = parameters.multiply;
		}
		if (ThreeUtil.isNull(this.multiply) || this.multiply === 1) {
			this.multiply = null;
		}
		this.setOptions(parameters.options);
		this.setCurve(curve);
	}

	/**
	 * The Curve of curves normal
	 */
	public curve: I3JS.ICurve<I3JS.IVector3> = null;

	/**
	 * Sets options
	 * @param options
	 */
	public setOptions(options: string) {
		if (ThreeUtil.isNotNull(options)) {
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
	public setCurve(curve: I3JS.ICurve<I3JS.IVector3>) {
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
		this._center = new THREE.Vector3(
			minX + maxX,
			minY + maxY,
			minZ + maxZ
		).multiplyScalar(0.5);
		const maxL = Math.max(maxX - minX, maxY - minY, maxZ - minZ);
		this._scale = new THREE.Vector3(1, 1, 1);
		if (maxL > 2.5) {
			this._scale.multiplyScalar(2 / maxL);
		}
	}

	/**
	 * The Center of curves normal
	 */
	private _center: I3JS.IVector3 = null;

	/**
	 * The Scale of curves normal
	 */
	private _scale: I3JS.IVector3 = null;

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
	public getPoint(t: number, optionalTarget?: I3JS.IVector3): I3JS.IVector3 {
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
		if (ThreeUtil.isNotNull(this.center)) {
			optionalTarget.add(this.center);
		}
		return optionalTarget;
	}

	/**
	 * Gets elapsed time
	 * @param timer
	 * @returns elapsed time
	 */
	private getElapsedTime(timer: RendererTimer): number {
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
	private _lastV3: I3JS.IVector3 = null;

	/**
	 * Refer center of curves normal
	 */
	public referCenter: I3JS.IVector3 = null;

	/**
	 * Gets point v3
	 * @param timer
	 * @param p
	 * @returns point v3
	 */
	public getPointV3(timer: RendererTimer, p: I3JS.IVector3): I3JS.IVector3 {
		const cp = this.getPoint(this.getElapsedTime(timer));
		if (this._lastV3 === null) {
			this._lastV3 = new THREE.Vector3(cp.x, cp.y, cp.z);
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
	private _lastV2: I3JS.IVector2 = null;

	/**
	 * Gets point v2
	 * @param timer
	 * @param p
	 * @returns point v2
	 */
	public getPointV2(timer: RendererTimer, p: I3JS.IVector2): I3JS.IVector2 {
		const cp = this.getPoint(this.getElapsedTime(timer));
		if (this._lastV2 === null) {
			this._lastV2 = new THREE.Vector2(cp.x, cp.y);
		} else {
			this._lastV2.set(cp.x, cp.y);
		}
		p.copy(this._lastV2);
		return this._lastV2;
	}

	/**
	 * Last euler of curves normal
	 */
	private _lastEuler: I3JS.IEuler = null;

	/**
	 * Gets point euler
	 * @param timer
	 * @param p
	 * @returns point euler
	 */
	public getPointEuler(timer: RendererTimer, p: I3JS.IEuler): I3JS.IEuler {
		const cp = this.getPoint(this.getElapsedTime(timer));
		if (this._lastEuler === null) {
			this._lastEuler = new THREE.Euler(cp.x, cp.y, cp.z);
		} else {
			this._lastEuler.set(cp.x, cp.y, cp.z);
		}
		p.copy(this._lastEuler);
		return this._lastEuler;
	}

	/**
	 * Last color of curves normal
	 */
	private _lastColor: I3JS.IColor = null;

	/**
	 * Gets point color
	 * @param timer
	 * @param p
	 * @returns point color
	 */
	public getPointColor(timer: RendererTimer, p: I3JS.IColor): I3JS.IColor {
		const cp = this.getPoint(this.getElapsedTime(timer));
		cp.clampScalar(0, 1);
		if (this._lastColor === null) {
			this._lastColor = new THREE.Color(cp.x, cp.y, cp.z);
		} else {
			this._lastColor.setRGB(cp.x, cp.y, cp.z);
		}
		p.copy(this._lastColor);
		return this._lastColor;
	}

	/**
	 * Last float of curves normal
	 */
	private _lastFloat: I3JS.IVector3 = null;

	/**
	 * Gets point float
	 * @param timer
	 * @param [min]
	 * @param [max]
	 * @returns point float
	 */
	public getPointFloat(
		timer: RendererTimer,
		min: number = 0,
		max: number = 1
	): number {
		if (this._lastFloat === null) {
			this._lastFloat = new THREE.Vector3();
		}
		this.getPointV3(timer, this._lastFloat);
		const length = Math.max(0, Math.min(1, (this._lastFloat.y + 1) / 2));
		return min + (max - min) * length;
	}
}
