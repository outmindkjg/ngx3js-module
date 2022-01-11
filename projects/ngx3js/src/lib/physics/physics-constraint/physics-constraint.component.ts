import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgxThreeUtil } from '../../interface';
import { IRendererTimer } from '../../ngx-interface';
import { NgxAbstractSubscribeComponent } from '../../subscribe.abstract';
import * as AmmoType from '../../threejs-library/ammo-type';

/**
 * The Physics Constraint component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPhysicsConstraintComponent) page for details.
 * See the [ngx physics](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_physics) page for a live demo.
 *
 */
@Component({
	selector: 'ngx3js-physics-constraint',
	templateUrl: './physics-constraint.component.html',
	styleUrls: ['./physics-constraint.component.scss'],
})
export class NgxPhysicsConstraintComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The type of physics constraint component
	 */
	@Input() public type: string = '';

	/**
	 * The source1 of physics constraint component
	 */
	@Input() public source1: any = null;

	/**
	 * The source2 of physics constraint component
	 */
	@Input() public source2: any = null;

	/**
	 * The pivot1x of physics constraint component
	 */
	@Input() public pivot1x: number = null;

	/**
	 * The pivot1y of physics constraint component
	 */
	@Input() public pivot1y: number = null;

	/**
	 * The pivot1z of physics constraint component
	 */
	@Input() public pivot1z: number = null;

	/**
	 * The pivot2x of physics constraint component
	 */
	@Input() public pivot2x: number = null;

	/**
	 * The pivot2y of physics constraint component
	 */
	@Input() public pivot2y: number = null;

	/**
	 * The pivot2z of physics constraint component
	 */
	@Input() public pivot2z: number = null;

	/**
	 * The axisx of physics constraint component
	 */
	@Input() public axisx: number = null;

	/**
	 * The axisy of physics constraint component
	 */
	@Input() public axisy: number = null;

	/**
	 * The axisz of physics constraint component
	 */
	@Input() public axisz: number = null;

	/**
	 * The enableMotor of physics constraint component
	 */
	@Input() public enableMotor: boolean = false;

	/**
	 * The targetVelocity of physics constraint component
	 */
	@Input() public targetVelocity: number = 0;

	/**
	 * The maxMotorImpulse of physics constraint component
	 */
	@Input() public maxMotorImpulse: number = 0;

	/**
	 * The disableCollisionsBetweenLinkedBodies of physics constraint componenta
	 */
	@Input() public disableCollisionsBetweenLinkedBodies: boolean = true;

	/**
	 * Creates an instance of physics constraint component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('physics-constraint');
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
		if (changes && this.constraint) {
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
	 * The Constraint of physics constraint component
	 */
	private constraint: AmmoType.btTypedConstraint = null;

	/**
	 * The Physics of physics constraint component
	 */
	private physics: AmmoType.btSoftRigidDynamicsWorld = null;

	/**
	 * The Ammo of physics constraint component
	 */
	private ammo: AmmoType.AmmoType = null;

	/**
	 * Sets physics
	 * @param physics
	 * @param ammo
	 */
	public setPhysics(
		physics: AmmoType.btSoftRigidDynamicsWorld,
		ammo: AmmoType.AmmoType
	) {
		this.physics = physics;
		this.ammo = ammo;
		this.getConstraint();
	}

	/**
	 * Gets rigid body
	 * @param obj
	 * @param key
	 * @returns
	 */
	private getRigidBody(obj: any, key: string) {
		if (NgxThreeUtil.isNotNull(obj)) {
			this.unSubscribeRefer(key);
			const body = NgxThreeUtil.getRigidbody(obj);
			this.subscribeRefer(
				key,
				NgxThreeUtil.getSubscribe(
					obj,
					(event) => {
						if (this.constraint !== null) {
							this.needUpdate = true;
						} else {
							this.getConstraint();
						}
					},
					'rigidbody'
				)
			);
			return body;
		}
		return null;
	}

	/**
	 * Gets bt vector3
	 * @param x
	 * @param y
	 * @param z
	 * @returns bt vector3
	 */
	private getBtVector3(x: number, y: number, z: number): AmmoType.btVector3 {
		return new this.ammo.btVector3(
			NgxThreeUtil.getTypeSafe(x, 0),
			NgxThreeUtil.getTypeSafe(y, 0),
			NgxThreeUtil.getTypeSafe(z, 0)
		);
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (this.constraint !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getConstraint();
				return;
			}

			if (
				!NgxThreeUtil.isOnlyIndexOf(
					changes,
					['angularmotor', 'enablemotor', 'targetvelocity', 'maxMotorimpulse'],
					this.OBJECT_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, ['init'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['angularmotor']);
				return;
			}
			if (
				NgxThreeUtil.isIndexOf(changes, [
					'enableMotor',
					'targetVelocity',
					'maxMotorImpulse',
				])
			) {
				changes = NgxThreeUtil.pushUniq(changes, ['angularmotor']);
				return;
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'angularmotor':
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	/**
	 * Gets constraint
	 * @returns constraint
	 */
	public getConstraint(): AmmoType.btTypedConstraint {
		if (
			NgxThreeUtil.isNotNull(this.ammo) &&
			NgxThreeUtil.isNotNull(this.physics) &&
			(this.constraint === null || this._needUpdate)
		) {
			this.needUpdate = false;
			if (this.constraint !== null) {
				this.physics.removeConstraint(this.constraint);
			}
			let constraint: AmmoType.btTypedConstraint = null;
			switch (this.type.toLowerCase()) {
				case 'hinge':
					const source1: any = this.getRigidBody(this.source1, 'source1');
					const source2: any = this.getRigidBody(this.source2, 'source2');
					if (NgxThreeUtil.isNotNull(source1) && NgxThreeUtil.isNotNull(source2)) {
						const pivotA = this.getBtVector3(
							this.pivot1x,
							this.pivot1y,
							this.pivot1z
						);
						const pivotB = this.getBtVector3(
							this.pivot2x,
							this.pivot2y,
							this.pivot2z
						);
						const axis = this.getBtVector3(this.axisx, this.axisy, this.axisz);
						constraint = new this.ammo.btHingeConstraint(
							source1,
							source2,
							pivotA,
							pivotB,
							axis,
							axis,
							true
						);
					}
					break;
			}
			if (constraint !== null) {
				this.constraint = constraint;
				this.physics.addConstraint(
					this.constraint,
					this.disableCollisionsBetweenLinkedBodies
				);
				this.setObject(this.constraint);
			}
		}
		return this.constraint;
	}

	/**
	 * Updates physics constraint component
	 * @param timer
	 */
	update(timer: IRendererTimer) {
		if (this.constraint !== null) {
			if (
				this.constraint instanceof this.ammo.btHingeConstraint &&
				this.enableMotor
			) {
				this.constraint.enableAngularMotor(
					this.enableMotor,
					NgxThreeUtil.getTypeSafe(this.targetVelocity, 0) * timer.delta,
					NgxThreeUtil.getTypeSafe(this.maxMotorImpulse, 50)
				);
			}
		}
	}
}
