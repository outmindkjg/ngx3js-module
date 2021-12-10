import {
	Component,
	ContentChildren,
	Input,
	OnInit,
	QueryList,
} from '@angular/core';
import * as THREE from 'three';
import { AbstractGeometryComponent } from '../geometry.abstract';
import { ThreeUtil, ThreeVector } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import * as I3JS from '../threejs-library/three-interface';

/**
 * The Shape component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ShapeComponent) page for details.
 *
 */
@Component({
	selector: 'ngx3js-shape',
	templateUrl: './shape.component.html',
	styleUrls: ['./shape.component.scss'],
})
export class ShapeComponent
	extends AbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The type of shape component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public type: string = 'fromPoints';

	/**
	 * The points of shape component
	 */
	@Input() public points: ThreeVector[] = null;

	/**
	 * The x of shape component
	 */
	@Input() public x: number = null;

	/**
	 * The y of shape component
	 */
	@Input() public y: number = null;

	/**
	 * The aCPx of shape component
	 */
	@Input() public aCPx: number = null;

	/**
	 * The aCPy of shape component
	 */
	@Input() public aCPy: number = null;

	/**
	 * The aX of shape component
	 */
	@Input() public aX: number = null;

	/**
	 * The aY of shape component
	 */
	@Input() public aY: number = null;

	/**
	 * The aCP1x of shape component
	 */
	@Input() public aCP1x: number = null;

	/**
	 * The aCP1y of shape component
	 */
	@Input() public aCP1y: number = null;

	/**
	 * The aCP2x of shape component
	 */
	@Input() public aCP2x: number = null;

	/**
	 * The aCP2y of shape component
	 */
	@Input() public aCP2y: number = null;

	/**
	 * The aRadius of shape component
	 */
	@Input() public aRadius: number = null;

	/**
	 * The aStartAngle of shape component
	 */
	@Input() public aStartAngle: number = null;

	/**
	 * The aEndAngle of shape component
	 */
	@Input() public aEndAngle: number = null;

	/**
	 * The aClockwise of shape component
	 */
	@Input() public aClockwise: boolean = null;

	/**
	 * The xRadius of shape component
	 */
	@Input() public xRadius: number = null;

	/**
	 * The yRadius of shape component
	 */
	@Input() public yRadius: number = null;

	/**
	 * The aRotation of shape component
	 */
	@Input() public aRotation: number = null;

	/**
	 * Content children of shape component
	 */
	@ContentChildren(ShapeComponent, { descendants: false })
	private holes: QueryList<ShapeComponent>;

	/**
	 * Creates an instance of shape component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('shape');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
	}

	/**
	 * Gets points
	 * @param def
	 * @returns points
	 */
	private getPoints(def: ThreeVector[]): I3JS.IVector2[] {
		const points: I3JS.IVector2[] = [];
		(this.points === null ? def : this.points).forEach((p) => {
			points.push(new THREE.Vector2(p.x, p.y));
		});
		return points;
	}

	/**
	 * Gets holes
	 * @returns holes
	 */
	private getHoles(): I3JS.IPath {
		const holes = new THREE.Path();
		if (this.holes !== null && this.holes.length > 0) {
			this.holes.forEach((hole) => {
				hole.getShape(holes);
			});
		}
		return holes;
	}

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: AbstractGeometryComponent): boolean {
		if (super.setParent(parent)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Gets shape
	 * @param shape
	 * @returns shape
	 */
	public getShape(shape: I3JS.IShape | I3JS.IPath): I3JS.IShape | I3JS.IPath {
		switch (this.type.toLowerCase()) {
			case 'frompoints':
				shape.setFromPoints(this.getPoints([]));
				break;
			case 'moveto':
				shape.moveTo(
					ThreeUtil.getTypeSafe(this.x, 0),
					ThreeUtil.getTypeSafe(this.y, 0)
				);
				break;
			case 'lineto':
				shape.lineTo(
					ThreeUtil.getTypeSafe(this.x, 0),
					ThreeUtil.getTypeSafe(this.y, 0)
				);
				break;
			case 'quadraticcurveto':
				shape.quadraticCurveTo(
					ThreeUtil.getTypeSafe(this.aCPx, 0),
					ThreeUtil.getTypeSafe(this.aCPy, 0),
					ThreeUtil.getTypeSafe(this.aX, 0),
					ThreeUtil.getTypeSafe(this.aY, 0)
				);
				break;
			case 'beziercurveto':
				shape.bezierCurveTo(
					ThreeUtil.getTypeSafe(this.aCPy, 0),
					ThreeUtil.getTypeSafe(this.aCP1y, 0),
					ThreeUtil.getTypeSafe(this.aCP2x, 0),
					ThreeUtil.getTypeSafe(this.aCP2y, 0),
					ThreeUtil.getTypeSafe(this.aX, 0),
					ThreeUtil.getTypeSafe(this.aY, 0)
				);
				break;
			case 'splinethru':
				shape.splineThru(this.getPoints([]));
				break;
			case 'arc':
				shape.arc(
					ThreeUtil.getTypeSafe(this.aX, 0),
					ThreeUtil.getTypeSafe(this.aY, 0),
					ThreeUtil.getTypeSafe(this.aRadius, 0),
					ThreeUtil.getAngleSafe(this.aStartAngle, 0),
					ThreeUtil.getAngleSafe(this.aEndAngle, 0),
					ThreeUtil.getTypeSafe(this.aClockwise, false)
				);
				break;
			case 'absarc':
				shape.absarc(
					ThreeUtil.getTypeSafe(this.aX, 0),
					ThreeUtil.getTypeSafe(this.aY, 0),
					ThreeUtil.getTypeSafe(this.aRadius, 0),
					ThreeUtil.getAngleSafe(this.aStartAngle, 0),
					ThreeUtil.getAngleSafe(this.aEndAngle, 0),
					ThreeUtil.getTypeSafe(this.aClockwise, false)
				);
				break;
			case 'ellipse':
				shape.ellipse(
					ThreeUtil.getTypeSafe(this.aX, 0),
					ThreeUtil.getTypeSafe(this.aY, 0),
					ThreeUtil.getTypeSafe(this.xRadius, 0),
					ThreeUtil.getTypeSafe(this.yRadius, 0),
					ThreeUtil.getAngleSafe(this.aStartAngle, 0),
					ThreeUtil.getAngleSafe(this.aEndAngle, 0),
					ThreeUtil.getTypeSafe(this.aClockwise, false),
					ThreeUtil.getTypeSafe(this.aRotation, 0)
				);
				break;
			case 'absellipse':
				shape.absellipse(
					ThreeUtil.getTypeSafe(this.aX, 0),
					ThreeUtil.getTypeSafe(this.aY, 0),
					ThreeUtil.getTypeSafe(this.xRadius, 0),
					ThreeUtil.getTypeSafe(this.yRadius, 0),
					ThreeUtil.getAngleSafe(this.aStartAngle, 0),
					ThreeUtil.getAngleSafe(this.aEndAngle, 0),
					ThreeUtil.getTypeSafe(this.aClockwise, false),
					ThreeUtil.getTypeSafe(this.aRotation, 0)
				);
				break;
			case 'holes':
			case 'hole':
				if (shape instanceof THREE.Shape) {
					shape.holes.push(this.getHoles());
				}
				break;
		}
		return shape;
	}
}
