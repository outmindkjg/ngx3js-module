import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractSubscribeComponent } from '../../subscribe.abstract';
import Ammo from 'ammojs-typed';
import { RendererTimer, ThreeUtil } from '../../interface';

@Component({
	selector: 'ngx3js-physics-constraint',
	templateUrl: './physics-constraint.component.html',
	styleUrls: ['./physics-constraint.component.scss'],
})
export class PhysicsConstraintComponent
	extends AbstractSubscribeComponent
	implements OnInit
{
	/**
	 * Input  of physics constraint component
	 */
	@Input() public type: string = '';

	/**
	 * Input  of physics constraint component
	 */
	@Input() public source1: any = null;

	/**
	 * Input  of physics constraint component
	 */
	@Input() public source2: any = null;

	/**
	 * Input  of physics constraint component
	 */
	@Input() public pivot1x: number = null;

	/**
	 * Input  of physics constraint component
	 */
	@Input() public pivot1y: number = null;

	/**
	 * Input  of physics constraint component
	 */
	@Input() public pivot1z: number = null;

	/**
	 * Input  of physics constraint component
	 */
	@Input() public pivot2x: number = null;

	/**
	 * Input  of physics constraint component
	 */
	@Input() public pivot2y: number = null;

	/**
	 * Input  of physics constraint component
	 */
	@Input() public pivot2z: number = null;

	/**
	 * Input  of physics constraint component
	 */
	@Input() public axisx: number = null;

	/**
	 * Input  of physics constraint component
	 */
	@Input() public axisy: number = null;

	/**
	 * Input  of physics constraint component
	 */
	@Input() public axisz: number = null;

	/**
	 * Input  of physics constraint component
	 */
	@Input() public enableMotor: boolean = false;

	/**
	 * Input  of physics constraint component
	 */
	@Input() public targetVelocity: number = 0;

	/**
	 * Input  of physics constraint component
	 */
	@Input() public maxMotorImpulse: number = 0;

	/**
	 * Input  of physics constraint componenta
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
	 * Constraint  of physics constraint component
	 */
	private constraint: Ammo.btTypedConstraint = null;

	/**
	 * Physics  of physics constraint component
	 */
	private physics: Ammo.btSoftRigidDynamicsWorld = null;

	/**
	 * Ammo  of physics constraint component
	 */
	private ammo: typeof Ammo = null;

	/**
	 * Sets physics
	 * @param physics
	 * @param ammo
	 */
	public setPhysics(physics: Ammo.btSoftRigidDynamicsWorld, ammo: typeof Ammo) {
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
		if (ThreeUtil.isNotNull(obj)) {
			this.unSubscribeRefer(key);
			const body = ThreeUtil.getRigidbody(obj);
			this.subscribeRefer(
				key,
				ThreeUtil.getSubscribe(
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
	private getBtVector3(x: number, y: number, z: number): Ammo.btVector3 {
		return new this.ammo.btVector3(
			ThreeUtil.getTypeSafe(x, 0),
			ThreeUtil.getTypeSafe(y, 0),
			ThreeUtil.getTypeSafe(z, 0)
		);
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (this.constraint !== null) {
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getConstraint();
				return;
			}

			if (
				!ThreeUtil.isOnlyIndexOf(
					changes,
					['angularmotor', 'enablemotor', 'targetvelocity', 'maxMotorimpulse'],
					this.OBJECT_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (ThreeUtil.isIndexOf(changes, ['init'])) {
				changes = ThreeUtil.pushUniq(changes, ['angularmotor']);
				return;
			}
			if (
				ThreeUtil.isIndexOf(changes, [
					'enableMotor',
					'targetVelocity',
					'maxMotorImpulse',
				])
			) {
				changes = ThreeUtil.pushUniq(changes, ['angularmotor']);
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
	public getConstraint(): Ammo.btTypedConstraint {
		if (
			ThreeUtil.isNotNull(this.ammo) &&
			ThreeUtil.isNotNull(this.physics) &&
			(this.constraint === null || this._needUpdate)
		) {
			this.needUpdate = false;
			if (this.constraint !== null) {
				this.physics.removeConstraint(this.constraint);
			}
			let constraint: Ammo.btTypedConstraint = null;
			switch (this.type.toLowerCase()) {
				case 'hinge':
					const source1 = this.getRigidBody(this.source1, 'source1');
					const source2 = this.getRigidBody(this.source2, 'source2');
					if (ThreeUtil.isNotNull(source1) && ThreeUtil.isNotNull(source2)) {
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
	update(timer: RendererTimer) {
		if (this.constraint !== null) {
			if (
				this.constraint instanceof this.ammo.btHingeConstraint &&
				this.enableMotor
			) {
				this.constraint.enableAngularMotor(
					this.enableMotor,
					ThreeUtil.getTypeSafe(this.targetVelocity, 0) * timer.delta,
					ThreeUtil.getTypeSafe(this.maxMotorImpulse, 50)
				);
			}
		}
	}
}
