import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { INgxVector } from '../ngx-interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * The Curve component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCurveComponent) page for details.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve) page for a live curve demo.
 *
 * An abstract base class for creating a [name] object that contains methods for interpolation.
 * For an array of [name]s see [CurvePath](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/CurvePath).
 *
 * ```html
 * <ngx3js-curve
 * 	[type]="'catmullrom'" [points]="curvePath" [closed]="true "
 * 	[curveType]="'centripetal'"
 * ></ngx3js-curve>
 * ```
 */
@Component({
	selector: 'ngx3js-curve',
	templateUrl: './curve.component.html',
	styleUrls: ['./curve.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxCurveComponent),
		},
	],
})
export class NgxCurveComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The curve type
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.ArcCurve | ArcCurve, Arc |
	 * | THREE.CatmullRomCurve3 | CatmullRomCurve3, Spline3, Catmullrom |
	 * | THREE.CubicBezierCurve | CubicBezierCurve, CubicBezier |
	 * | THREE.CubicBezierCurve3 | CubicBezierCurve3, CubicBezier3 |
	 * | THREE.EllipseCurve | EllipseCurve, Ellipse |
	 * | THREE.LineCurve | LineCurve, Line |
	 * | THREE.LineCurve3 | LineCurve3, Line3 |
	 * | THREE.QuadraticBezierCurve | QuadraticBezierCurve, QuadraticBezier |
	 * | THREE.QuadraticBezierCurve3 | QuadraticBezierCurve3, QuadraticBezier3 |
	 * | THREE.SplineCurve | SplineCurve, Spline |
	 */
	@Input() public type: string = 'spline';

	/**
	 * The X center of the ellipse. Default is *0*.
	 */
	@Input() public aX: number = null;

	/**
	 * The Y center of the ellipse. Default is *0*.
	 */
	@Input() public aY: number = null;

	/**
	 * The aRadius of curve component
	 */
	@Input() public aRadius: number = null;

	/**
	 * The start angle of the curve in radians starting from the positive X axis.  Default is *0*.
	 */
	@Input() public aStartAngle: number = null;

	/**
	 * The end angle of the curve in radians starting from the positive X axis. Default is *2 x Math.PI*.
	 */
	@Input() public aEndAngle: number = null;

	/**
	 * Whether the ellipse is drawn clockwise. Default is *false*.
	 */
	@Input() public aClockwise: boolean = null;

	/**
	 * array of [Vector2s](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector2).
	 * Creates a Path from the points. The first point defines the offset, then successive points are added to the [curves](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/CurvePath.curves) array as [LineCurves](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/LineCurve).
	 * If no points are specified, an empty path is created and the [LineCurve.currentPoint](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/LineCurve.currentPoint) is set to the origin.
	 */
	@Input() public points: INgxVector[] = null;

	/**
	 * Whether the curve is closed. Default is *false*.
	 */
	@Input() public closed: boolean = null;

	/**
	 * Possible values are *centripetal*, *chordal* and *catmullrom*.
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public curveType: string = null;

	/**
	 * When [CatmullRomCurve3.curveType](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/extras/curves/CatmullRomCurve3.curveType) is *catmullrom*, defines catmullrom's tension.
	 */
	@Input() public tension: number = null;

	/**
	 * The radius of the ellipse in the x direction. Default is *1*.
	 */
	@Input() public xRadius: number = null;

	/**
	 * The radius of the ellipse in the y direction. Default is *1*.
	 */
	@Input() public yRadius: number = null;

	/**
	 * The rotation angle of the ellipse in radians, counterclockwise from the positive X axis (optional). Default is *0*.
	 */
	@Input() public aRotation: number = null;

	/**
	 * Gets points v3
	 * @param def
	 * @param min
	 * @returns points v3
	 */
	private getPointsV3(def: INgxVector[], min: number): I3JS.Vector3[] {
		const points: I3JS.Vector3[] = [];
		(this.points === null ? def : this.points).forEach((p) => {
			points.push(new N3JS.Vector3(p.x, p.y, p.z));
		});
		if (points.length < min) {
			for (let i = 0; i < min - points.length; i++) {
				points.push(new N3JS.Vector3(0, 0, 0));
			}
		}
		return points;
	}

	/**
	 * Gets points v2
	 * @param def
	 * @param min
	 * @returns points v2
	 */
	private getPointsV2(def: INgxVector[], min: number): I3JS.Vector2[] {
		const points: I3JS.Vector2[] = [];
		(this.points === null ? def : this.points).forEach((p) => {
			points.push(new N3JS.Vector2(p.x, p.y));
		});
		if (points.length < min) {
			for (let i = 0; i < min - points.length; i++) {
				points.push(new N3JS.Vector2(0, 0));
			}
		}
		return points;
	}

	/**
	 * Creates an instance of curve component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('curve');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
		if (changes && this.curve) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
	}

	/**
	 * The Curve of curve component
	 */
	private curve: I3JS.Curve<I3JS.Vector> = null;

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		if (this.curve !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getCurve();
				return;
			}
			if (!NgxThreeUtil.isOnlyIndexOf(changes, [], this.OBJECT_ATTR)) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, []);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					default:
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	/**
	 * Gets curve
	 * @returns curve
	 */
	public getCurve(): I3JS.Curve<I3JS.Vector> {
		if (this.curve === null || this._needUpdate) {
			this.needUpdate = false;
			switch (this.type.toLowerCase()) {
				case 'arccurve':
				case 'arc':
					this.curve = new N3JS.ArcCurve(
						NgxThreeUtil.getTypeSafe(this.aX, 1),
						NgxThreeUtil.getTypeSafe(this.aY, 1),
						NgxThreeUtil.getTypeSafe(this.aRadius, 1),
						NgxThreeUtil.getTypeSafe(this.aStartAngle, 1),
						NgxThreeUtil.getTypeSafe(this.aEndAngle, 1),
						NgxThreeUtil.getTypeSafe(this.aClockwise, false)
					);
					break;
				case 'catmullromcurve3':
				case 'spline3':
				case 'catmullrom':
					this.curve = new N3JS.CatmullRomCurve3(
						this.getPointsV3([], 3),
						NgxThreeUtil.getTypeSafe(this.closed, false),
						NgxThreeUtil.getTypeSafe(this.curveType, 'centripetal'),
						NgxThreeUtil.getTypeSafe(this.tension, 0.5)
					);
					break;
				case 'cubicbeziercurve':
				case 'cubicbezier':
					const cubicbezierV2 = this.getPointsV2([], 4);
					this.curve = new N3JS.CubicBezierCurve(
						cubicbezierV2[0],
						cubicbezierV2[1],
						cubicbezierV2[2],
						cubicbezierV2[3]
					);
					break;
				case 'cubicbeziercurve3':
				case 'cubicbezier3':
					const cubicbezierV3 = this.getPointsV3([], 4);
					this.curve = new N3JS.CubicBezierCurve3(
						cubicbezierV3[0],
						cubicbezierV3[1],
						cubicbezierV3[2],
						cubicbezierV3[3]
					);
					break;
				case 'ellipsecurve':
				case 'ellipse':
					this.curve = new N3JS.EllipseCurve(
						NgxThreeUtil.getTypeSafe(this.aX, 0),
						NgxThreeUtil.getTypeSafe(this.aY, 0),
						NgxThreeUtil.getTypeSafe(this.xRadius, 1),
						NgxThreeUtil.getTypeSafe(this.yRadius, 1),
						NgxThreeUtil.getTypeSafe(this.aStartAngle, 0),
						NgxThreeUtil.getTypeSafe(this.aEndAngle, 360),
						NgxThreeUtil.getTypeSafe(this.aClockwise, false),
						NgxThreeUtil.getTypeSafe(this.aRotation, 0)
					);
					break;
				case 'linecurve':
				case 'line':
					const lineV2 = this.getPointsV2([], 2);
					this.curve = new N3JS.LineCurve(lineV2[0], lineV2[1]);
					break;
				case 'linecurve3':
				case 'line3':
					const lineV3 = this.getPointsV3([], 2);
					this.curve = new N3JS.LineCurve3(lineV3[0], lineV3[1]);
					break;
				case 'quadraticbeziercurve':
				case 'quadraticbezier':
					const quadraticbezierV2 = this.getPointsV2([], 3);
					this.curve = new N3JS.QuadraticBezierCurve(
						quadraticbezierV2[0],
						quadraticbezierV2[1],
						quadraticbezierV2[2]
					);
					break;
				case 'quadraticbeziercurve3':
				case 'quadraticbezier3':
					const quadraticbezierV3 = this.getPointsV3([], 3);
					this.curve = new N3JS.QuadraticBezierCurve3(
						quadraticbezierV3[0],
						quadraticbezierV3[1],
						quadraticbezierV3[2]
					);
					break;
				case 'splinecurve':
				case 'spline':
					this.curve = new N3JS.SplineCurve(this.getPointsV2([], 1));
					break;
			}
			this.setObject(this.curve);
			this.setSubscribeNext('curve');
		}
		return this.curve;
	}
}
