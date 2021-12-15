import {
	Component,
	ContentChildren,
	Input,
	OnInit,
	QueryList,
	SimpleChanges,
} from '@angular/core';
import * as Ammo from '../threejs-library/ammo';
import * as AmmoType from '../threejs-library/ammo-type';

import { ConvexObjectBreaker } from 'three/examples/jsm/misc/ConvexObjectBreaker';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxThreeUtil, N3JS, I3JS } from './../interface';
import { NgxPhysicsConstraintComponent } from './physics-constraint/physics-constraint.component';
import { AmmoPhysics } from '../threejs-library/AmmoPhysics';
import { OimoPhysics } from '../threejs-library/OimoPhysics';
import { IRendererTimer } from '../ngx-interface';

/**
 * NgxPhysicsComponent
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PhysicsComponent) page for details.
 * See the [ngx physics](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_physics) page for a live demo.
 *
 * ```html
 * <ngx3js-physics></ngx3js-physics>
 * <ngx3js-physics
 * 	[gravity]="-7.8"
 * ></ngx3js-physics>
 * <ngx3js-physics
 * 	[type]="'oimo'" [gravity]="-9.8"
 * ></ngx3js-physics>
 * ```
 *
 * @see AmmoPhysics
 * @see OimoPhysics
 * @see Ammo
 */
@Component({
	selector: 'ngx3js-physics',
	templateUrl: './physics.component.html',
	styleUrls: ['./physics.component.scss'],
})
export class NgxPhysicsComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The Input of physics component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public type: string = '';

	/**
	 * The useCollision of physics component
	 */
	@Input() public useCollision: boolean = false;

	/**
	 * The gravity of physics component
	 */
	@Input() public gravity: number = null;

	/**
	 * The gravityX of physics component
	 */
	@Input() public gravityX: number = null;

	/**
	 * The gravityY of physics component
	 */
	@Input() public gravityY: number = null;

	/**
	 * The gravityZ of physics component
	 */
	@Input() public gravityZ: number = null;

	/**
	 * Content children of physics component
	 */
	@ContentChildren(NgxPhysicsConstraintComponent, { descendants: false })
	private constraintList: QueryList<NgxPhysicsConstraintComponent>;

	/**
	 * Gets gravity
	 * @param [def]
	 * @returns gravity
	 */
	private getGravity(def?: number): AmmoType.btVector3 {
		const gravity = NgxThreeUtil.getTypeSafe(this.gravity, def);
		const gravityX = NgxThreeUtil.getTypeSafe(this.gravityX, 0);
		const gravityY = NgxThreeUtil.getTypeSafe(this.gravityY, gravity);
		const gravityZ = NgxThreeUtil.getTypeSafe(this.gravityZ, 0);
		return new this.ammo.btVector3(gravityX, gravityY, gravityZ);
	}

	/**
	 * Creates an instance of physics component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		try {
			Ammo.AmmoInit({
				Ammo: null,
				locateFile: (ammoFile: string) => {
					return NgxThreeUtil.getStoreUrl(ammoFile);
				},
			}).then((ammoLib: any) => {
				this.ammo = ammoLib;
				this.getPhysics();
			});
		} catch (ex: any) {
			console.log(ex);
		}
		super.ngOnInit('physics');
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
		if (changes && this.physics) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(
			this.constraintList,
			'constraintList',
			'constraint'
		);
		super.ngAfterContentInit();
	}

	/**
	 * The Ammo of physics component
	 */
	private ammo: AmmoType.AmmoType = null;

	/**
	 * The Physics of physics component
	 */
	private physics: AmmoType.btSoftRigidDynamicsWorld = null;

	/**
	 * Gets ammo
	 * @returns
	 */
	public getAmmo() {
		return this.ammo;
	}

	/**
	 * Convex breaker of physics component
	 */
	private convexBreaker: ConvexObjectBreaker = null;

	/**
	 * Gets convex object breaker
	 * @returns convex object breaker
	 */
	public getConvexObjectBreaker(): ConvexObjectBreaker {
		if (this.convexBreaker === null) {
			this.convexBreaker = new ConvexObjectBreaker();
		}
		return this.convexBreaker;
	}

	/**
	 * Soft body helpers of physics component
	 */
	private softBodyHelpers: AmmoType.btSoftBodyHelpers = null;

	/**
	 * Gets soft body helpers
	 * @returns soft body helpers
	 */
	public getSoftBodyHelpers(): AmmoType.btSoftBodyHelpers {
		if (this.softBodyHelpers === null) {
			this.softBodyHelpers = new this.ammo.btSoftBodyHelpers();
		}
		return this.softBodyHelpers;
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (this.physics !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getPhysics();
				return;
			}
			if (
				!NgxThreeUtil.isOnlyIndexOf(
					changes,
					[
						'constraint',
						'usecollision',
						'gravity',
						'gravityx',
						'gravityy',
						'gravityz',
					],
					this.OBJECT_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, ['gravityx', 'gravityy', 'gravityz'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['gravity']);
			}
			if (this.physics instanceof this.ammo.btSoftRigidDynamicsWorld) {
				changes.forEach((change) => {
					switch (change.toLowerCase()) {
						case 'constraint':
							this.unSubscribeReferList('constraintList');
							if (NgxThreeUtil.isNotNull(this.constraintList)) {
								this.constraintList.forEach((constraint) => {
									constraint.setPhysics(this.physics, this.ammo);
								});
								this.subscribeListQuery(
									this.constraintList,
									'constraintList',
									'constraint'
								);
							}
							break;
						case 'gravity':
							const gravity = this.getGravity(-9.8);
							this.physics.setGravity(gravity);
							// this.physics.getWorldInfo().set_m_gravity(gravity);
							break;
					}
				});
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * The Dispatcher of physics component
	 */
	private dispatcher: AmmoType.btCollisionDispatcher = null;

	/**
	 * Gets physics
	 * @returns physics
	 */
	public getPhysics(): AmmoType.btSoftRigidDynamicsWorld {
		if (this.ammo !== null && (this.physics === null || this._needUpdate)) {
			this.needUpdate = false;
			switch (this.type.toLowerCase()) {
				case 'oimophysics':
				case 'oimo':
					OimoPhysics().then((physics: any) => {
						this.dispatcher = null;
						this.physics = physics;
						super.setObject(this.physics);
						this.runSubscribeNext(this.subscribeType);
						this.applyChanges(['constraint', 'gravity']);
					});
					break;
				case 'ammophysics':
				case 'ammo':
					AmmoPhysics().then((physics: any) => {
						this.dispatcher = null;
						this.physics = physics;
						super.setObject(this.physics);
						this.runSubscribeNext(this.subscribeType);
						this.applyChanges(['constraint', 'gravity']);
					});
					break;
				default:
					const collisionConfiguration =
						new this.ammo.btSoftBodyRigidBodyCollisionConfiguration();
					this.dispatcher = new this.ammo.btCollisionDispatcher(
						collisionConfiguration
					);
					const broadphase = new this.ammo.btDbvtBroadphase();
					const solver = new this.ammo.btSequentialImpulseConstraintSolver();
					const softBodySolver = new this.ammo.btDefaultSoftBodySolver();
					this.physics = new this.ammo.btSoftRigidDynamicsWorld(
						this.dispatcher,
						broadphase,
						solver,
						collisionConfiguration,
						softBodySolver
					);
					super.setObject(this.physics);
					this.runSubscribeNext(this.subscribeType);
					this.applyChanges(['constraint', 'gravity']);
					break;
			}
		}
		return this.physics;
	}

	/**
	 * Log seq of physics component
	 */
	private logSeq: number = 0;

	/**
	 * Gets rigid body
	 * @param body
	 * @returns rigid body
	 */
	public getRigidBody(body: AmmoType.btCollisionObject): AmmoType.btRigidBody {
		return (this.ammo as any).castObject(body, this.ammo.btRigidBody);
	}

	/**
	 * Gets collision object
	 * @param body
	 * @returns collision object
	 */
	public getCollisionObject(body: AmmoType.btCollisionObject): I3JS.Object3D {
		const rigidBody: any = this.getRigidBody(body);
		if (
			NgxThreeUtil.isNotNull(rigidBody) &&
			NgxThreeUtil.isNotNull(rigidBody['object3d'])
		) {
			return rigidBody['object3d'];
		}
		return null;
	}

	/**
	 * Gets bt vector3
	 * @param pointer
	 * @returns bt vector3
	 */
	public getBtVector3(pointer: any): any {
		return (this.ammo as any).castObject(pointer, this.ammo.btVector3);
	}

	/**
	 * Impact point of physics component
	 */
	private impactPoint = new N3JS.Vector3();

	/**
	 * Impact normal of physics component
	 */
	private impactNormal = new N3JS.Vector3();

	/**
	 * Updates physics component
	 * @param timer
	 */
	public update(timer: IRendererTimer) {
		if (
			this.ammo !== null &&
			this.physics instanceof this.ammo.btSoftRigidDynamicsWorld &&
			this.dispatcher !== null
		) {
			this.constraintList.forEach((constraint) => {
				constraint.update(timer);
			});
			this.physics.stepSimulation(timer.delta, 10);
			let numManifolds = this.dispatcher.getNumManifolds();
			if (this.useCollision) {
				for (let i = 0; i < numManifolds; i++) {
					let contactManifold = this.dispatcher.getManifoldByIndexInternal(i);
					const body0 = this.getCollisionObject(contactManifold.getBody0());
					const body1 = this.getCollisionObject(contactManifold.getBody1());
					if (body0 !== null && body1 !== null) {
						let numContacts = contactManifold.getNumContacts();
						const contactPoints: AmmoType.btManifoldPoint[] = [];
						for (let j = 0; j < numContacts; j++) {
							contactPoints.push(contactManifold.getContactPoint(j));
						}
						body0.dispatchEvent({
							type: 'collision',
							points: contactPoints,
							collision: body1,
						});
					}
				}
			}
			const convexBreaker = this.convexBreaker;
			if (convexBreaker !== null) {
				for (let i = 0; i < numManifolds; i++) {
					let contactManifold = this.dispatcher.getManifoldByIndexInternal(i);
					const rb0 = this.getRigidBody(contactManifold.getBody0());
					const rb1 = this.getRigidBody(contactManifold.getBody1());
					if (!rb0 || !rb1) {
						continue;
					}
					const threeObject0 = this.getBtVector3(rb0.getUserPointer())[
						'threeObject'
					];
					const threeObject1 = this.getBtVector3(rb1.getUserPointer())[
						'threeObject'
					];
					if (!threeObject0 && !threeObject1) {
						continue;
					}
					const userData0 = threeObject0 ? threeObject0.userData : null;
					const userData1 = threeObject1 ? threeObject1.userData : null;
					const breakable0 = userData0 ? userData0.breakable : false;
					const breakable1 = userData1 ? userData1.breakable : false;
					const collided0 = userData0 ? userData0.collided : false;
					const collided1 = userData1 ? userData1.collided : false;
					if ((!breakable0 && !breakable1) || (collided0 && collided1)) {
						continue;
					}
					let contact = false;
					let maxImpulse = 0;
					for (let j = 0, jl = contactManifold.getNumContacts(); j < jl; j++) {
						const contactPoint = contactManifold.getContactPoint(j);
						if (contactPoint.getDistance() < 0) {
							contact = true;
							const impulse = contactPoint.getAppliedImpulse();
							if (impulse > maxImpulse) {
								maxImpulse = impulse;
								const pos = contactPoint.get_m_positionWorldOnB();
								const normal = contactPoint.get_m_normalWorldOnB();
								this.impactPoint.set(pos.x(), pos.y(), pos.z());
								this.impactNormal.set(normal.x(), normal.y(), normal.z());
							}
							break;
						}
					}
					if (!contact) continue;

					// Subdivision

					const fractureImpulse = 250;
					if (breakable0 && !collided0 && maxImpulse > fractureImpulse) {
						const fragments: I3JS.Object3D[] = [];
						const debris = convexBreaker.subdivideByImpact(
							threeObject0,
							this.impactPoint as any,
							this.impactNormal as any,
							1,
							2
						);
						const numObjects = debris.length;
						for (let j = 0; j < numObjects; j++) {
							const vel = rb0.getLinearVelocity();
							const angVel = rb0.getAngularVelocity();
							const fragment = debris[j];
							fragment.userData.velocity.set(vel.x(), vel.y(), vel.z());
							fragment.userData.angularVelocity.set(
								angVel.x(),
								angVel.y(),
								angVel.z()
							);
							fragments.push(fragment as any);
						}
						userData0.collided = true;
						threeObject0.dispatchEvent({
							type: 'debris',
							fragments: fragments,
							collided: true,
							debris: debris,
						});
					}
					if (breakable1 && !collided1 && maxImpulse > fractureImpulse) {
						const fragments: I3JS.Object3D[] = [];
						const debris = convexBreaker.subdivideByImpact(
							threeObject1,
							this.impactPoint as any,
							this.impactNormal as any,
							1,
							2
						);
						const numObjects = debris.length;
						for (let j = 0; j < numObjects; j++) {
							const vel = rb1.getLinearVelocity();
							const angVel = rb1.getAngularVelocity();
							const fragment = debris[j];
							fragment.userData.velocity.set(vel.x(), vel.y(), vel.z());
							fragment.userData.angularVelocity.set(
								angVel.x(),
								angVel.y(),
								angVel.z()
							);
							fragments.push(fragment as any);
						}
						threeObject1.dispatchEvent({
							type: 'debris',
							fragments: fragments,
							collided: true,
							debris: debris,
						});
					}
				}
			}
		}
	}
}
