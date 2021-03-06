import { Component, ContentChildren, forwardRef, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { NgxGeometryUtils } from '../geometry/geometryUtils';
import { IRendererTimer } from '../ngx-interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import * as AmmoType from '../threejs-library/ammo-type';
import { I3JS, N3JS, NgxThreeUtil } from './../interface';
import { NgxPhysicsComponent } from './../physics/physics.component';
import { NgxRigidbodyNodeComponent } from './rigidbody-node/rigidbody-node.component';

/**
 * Rigidbody type
 */
export interface RigidbodyType {
	/**
	 *
	 */
	type: 'instanced' | 'rigidbody' | 'softbody' | 'debris' | 'mesh';

	/**
	 *
	 */
	rigidBodies: AmmoType.btRigidBody[];

	/**
	 *
	 */
	softBody: AmmoType.btSoftBody;

	/**
	 *
	 */
	debris: NgxRigidbodyComponent[];

	/**
	 *
	 */
	ammoIndexAssociation?: number[][];

	/**
	 *
	 */
	mesh?: I3JS.Object3D;
}

/**
 * The Rigidbody component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRigidbodyComponent) page for details.
 *
 * @see
 */
@Component({
	selector: 'ngx3js-rigidbody',
	templateUrl: './rigidbody.component.html',
	styleUrls: ['./rigidbody.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxRigidbodyComponent),
		},
	],
})
export class NgxRigidbodyComponent extends NgxAbstractSubscribeComponent implements OnInit {
	/**
	 * The type  of rigidbody component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public type: string = 'auto';

	/**
	 * The isSoftBody of rigidbody component
	 */
	@Input() public isSoftBody: boolean = false;

	/**
	 * The width of rigidbody component
	 */
	@Input() public width: number = null;

	/**
	 * The height of rigidbody component
	 */
	@Input() public height: number = null;

	/**
	 * The depth of rigidbody component
	 */
	@Input() public depth: number = null;

	/**
	 * The radius of rigidbody component
	 */
	@Input() public radius: number = null;

	/**
	 * The mass of rigidbody component
	 */
	@Input() public mass: number = null;

	/**
	 * The margin of rigidbody component
	 */
	@Input() public margin: number = null;

	/**
	 * The friction of rigidbody component
	 */
	@Input() public friction: number = null;

	/**
	 * The rollingFriction of rigidbody component
	 */
	@Input() public rollingFriction: number = null;

	/**
	 * The restitution of rigidbody component
	 */
	@Input() public restitution: number = null;

	/**
	 * The inertia of rigidbody component
	 */
	@Input() public inertia: number = null;

	/**
	 * The inertiaX of rigidbody component
	 */
	@Input() public inertiaX: number = null;

	/**
	 * The inertiaY of rigidbody component
	 */
	@Input() public inertiaY: number = null;

	/**
	 * The inertiaZ of rigidbody component
	 */
	@Input() public inertiaZ: number = null;

	/**
	 * The velocityX of rigidbody component
	 */
	@Input() public velocityX: number = null;

	/**
	 * The velocityY of rigidbody component
	 */
	@Input() public velocityY: number = null;

	/**
	 * The velocityZ of rigidbody component
	 */
	@Input() public velocityZ: number = null;

	/**
	 * The angularVelocityX of rigidbody component
	 */
	@Input() public angularVelocityX: number = null;

	/**
	 * The angularVelocityY of rigidbody component
	 */
	@Input() public angularVelocityY: number = null;

	/**
	 * The angularVelocityZ of rigidbody component
	 */
	@Input() public angularVelocityZ: number = null;

	/**
	 * The velocityType of rigidbody component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public velocityType: string = null;

	/**
	 * The damping of rigidbody component
	 */
	@Input() public damping: number = null;

	/**
	 * The linDamping of rigidbody component
	 */
	@Input() public linDamping: number = null;

	/**
	 * The angDamping of rigidbody component
	 */
	@Input() public angDamping: number = null;

	/**
	 * The breakable of rigidbody component
	 */
	@Input() public breakable: boolean = null;

	/**
	 * The collisions of rigidbody component
	 */
	@Input() public collisions: number | string = null;

	/**
	 * The pressure of rigidbody component
	 */
	@Input() public pressure: number = null;

	/**
	 * The stiffness of rigidbody component
	 */
	@Input() public stiffness: number = null;

	/**
	 * The linStiffness of rigidbody component
	 */
	@Input() public linStiffness: number = null;

	/**
	 * The angStiffness of rigidbody component
	 */
	@Input() public angStiffness: number = null;

	/**
	 * The viterations of rigidbody component
	 */
	@Input() public viterations: number = null;

	/**
	 * The piterations of rigidbody component
	 */
	@Input() public piterations: number = null;

	/**
	 * The randomizeConstraints of rigidbody component
	 */
	@Input() public randomizeConstraints: boolean = true;

	/**
	 * Content children of rigidbody component
	 */
	@ContentChildren(NgxRigidbodyNodeComponent, { descendants: false })
	private rigidbodyNodeList: QueryList<NgxRigidbodyNodeComponent>;

	/**
	 * Gets box half extents
	 * @param geometry
	 * @param [def]
	 * @returns box half extents
	 */
	private getBoxHalfExtents(geometry: I3JS.BufferGeometry, def?: I3JS.Vector3): AmmoType.btVector3 {
		let boxHalfExtents = NgxThreeUtil.getVector3Safe(this.width, this.height, this.depth);
		if (NgxThreeUtil.isNull(boxHalfExtents)) {
			boxHalfExtents = this.getGeometrySize(geometry, def);
		}
		return new this._ammo.btVector3(boxHalfExtents.x / 2, boxHalfExtents.y / 2, boxHalfExtents.z / 2);
	}

	/**
	 * Gets radius
	 * @param geometry
	 * @param [def]
	 * @returns radius
	 */
	private getRadius(geometry: I3JS.BufferGeometry, def?: number): number {
		let radius = this.radius;
		if (NgxThreeUtil.isNull(radius)) {
			const geometrySize = this.getGeometrySize(geometry, def);
			radius = Math.max(geometrySize.x, geometrySize.y, geometrySize.z) / 2;
		}
		return radius;
	}

	/**
	 * Gets height
	 * @param geometry
	 * @param [def]
	 * @returns height
	 */
	private getHeight(geometry: I3JS.BufferGeometry, def?: number): number {
		let height = this.height;
		if (NgxThreeUtil.isNull(height)) {
			height = this.getGeometrySize(geometry, def).y;
		}
		return height;
	}

	/**
	 * Gets mass
	 * @param [def]
	 * @returns mass
	 */
	private getMass(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.mass, def);
	}

	/**
	 * Gets margin
	 * @param [def]
	 * @returns margin
	 */
	private getMargin(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.margin, def);
	}

	/**
	 * Gets friction
	 * @param [def]
	 * @returns friction
	 */
	private getFriction(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.friction, def);
	}

	/**
	 * Gets rolling friction
	 * @param [def]
	 * @returns rolling friction
	 */
	private getRollingFriction(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.rollingFriction, def);
	}

	/**
	 * Gets restitution
	 * @param [def]
	 * @returns restitution
	 */
	private getRestitution(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.restitution, def);
	}

	/**
	 * Gets inertia
	 * @param [def]
	 * @returns inertia
	 */
	private getInertia(def?: number): AmmoType.btVector3 {
		const inertia = NgxThreeUtil.getTypeSafe(this.inertia, def);
		const inertiaX = NgxThreeUtil.getTypeSafe(this.inertiaX, 0);
		const inertiaY = NgxThreeUtil.getTypeSafe(this.inertiaY, inertia);
		const inertiaZ = NgxThreeUtil.getTypeSafe(this.inertiaZ, 0);
		return new this._ammo.btVector3(inertiaX, inertiaY, inertiaZ);
	}

	/**
	 * Gets lin damping
	 * @param [def]
	 * @returns lin damping
	 */
	private getLinDamping(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.linDamping, this.damping, def);
	}

	/**
	 * Gets ang damping
	 * @param [def]
	 * @returns ang damping
	 */
	private getAngDamping(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.angDamping, this.damping, def);
	}

	/**
	 * Gets geometry size
	 * @param geometry
	 * @param [def]
	 * @returns geometry size
	 */
	private getGeometrySize(geometry: I3JS.BufferGeometry, def?: I3JS.Vector3 | number): I3JS.Vector3 {
		if (NgxThreeUtil.isNotNull(geometry)) {
			const anyGeometry: any = geometry;
			const parameters = anyGeometry['parameters'];
			switch (geometry.type.toLowerCase()) {
				case 'boxgeometry':
					return new N3JS.Vector3(parameters.width, parameters.height, parameters.depth);
				case 'spheregeometry':
					return new N3JS.Vector3(parameters.radius * 2, parameters.radius * 2, parameters.radius * 2);
				case 'planegeometry':
					return new N3JS.Vector3(parameters.width, parameters.height, 0.01);
				case 'cylindergeometry':
					return new N3JS.Vector3(
						Math.max(parameters.radiusTop, parameters.radiusBottom) * 2,
						parameters.height,
						Math.max(parameters.radiusTop, parameters.radiusBottom) * 2
					);
				case 'conegeometry':
					return new N3JS.Vector3(parameters.radius * 2, parameters.height, parameters.radius * 2);
			}
		}
		if (NgxThreeUtil.isNotNull(def)) {
			if (def instanceof N3JS.Vector3) {
				return def;
			} else if (typeof def === 'number') {
				return new N3JS.Vector3(def, def, def);
			}
		}
		return new N3JS.Vector3();
	}

	/**
	 * Gets geometry segments
	 * @param geometry
	 * @param [def]
	 * @returns geometry segments
	 */
	private getGeometrySegments(geometry: I3JS.BufferGeometry, def?: I3JS.Vector3 | number): I3JS.Vector3 {
		if (NgxThreeUtil.isNotNull(geometry)) {
			if (geometry instanceof N3JS.BoxGeometry) {
				return new N3JS.Vector3(
					geometry.parameters.widthSegments,
					geometry.parameters.heightSegments,
					geometry.parameters.depthSegments
				);
			} else if (geometry instanceof N3JS.SphereGeometry) {
				return new N3JS.Vector3(
					geometry.parameters.widthSegments,
					geometry.parameters.heightSegments,
					geometry.parameters.heightSegments
				);
			} else if (geometry instanceof N3JS.PlaneGeometry) {
				return new N3JS.Vector3(
					geometry.parameters.widthSegments,
					geometry.parameters.heightSegments,
					geometry.parameters.heightSegments
				);
			}
		}
		if (NgxThreeUtil.isNotNull(def)) {
			if (def instanceof N3JS.Vector3) {
				return def;
			} else if (typeof def === 'number') {
				return new N3JS.Vector3(def, def, def);
			}
		}
		return new N3JS.Vector3();
	}

	/**
	 * Creates an instance of rigidbody component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('rigidbody');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (NgxThreeUtil.isNotNull(this._physics) && NgxThreeUtil.isNotNull(this.rigidBody)) {
			if (this.rigidBody.rigidBodies !== null) {
				this.rigidBody.rigidBodies.forEach((rigidBody) => {
					this._physics.removeRigidBody(rigidBody);
				});
			}
			if (this.rigidBody.softBody !== null) {
				if (NgxThreeUtil.isNotNull(this.rigidBody.softBody)) {
					this._physics.removeSoftBody(this.rigidBody.softBody);
				}
			}
			if (this.rigidBody.debris !== null) {
				this.rigidBody.debris.forEach((debris) => {
					debris.ngOnDestroy();
				});
			}
			this.rigidBody = null;
		}
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
		if (changes && this.rigidBody) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(this.rigidbodyNodeList, 'rigidbodyNodeList', 'rigidbodynode');
		super.ngAfterContentInit();
	}

	/**
	 * Gets absolute geometry
	 * @param bufGeometry
	 * @param object3d
	 * @returns absolute geometry
	 */
	private getAbsoluteGeometry(bufGeometry: I3JS.BufferGeometry, object3d: I3JS.Object3D): I3JS.BufferGeometry {
		const absBufGeometry = bufGeometry.clone();
		const positions = absBufGeometry.getAttribute('position');
		const tmp = new N3JS.Vector3();
		object3d.updateMatrixWorld(true);
		for (let i = 0; i < positions.count; i++) {
			tmp.set(positions.getX(i), positions.getY(i), positions.getZ(i));
			const wTmp = object3d.localToWorld(tmp);
			positions.setXYZ(i, wTmp.x, wTmp.y, wTmp.z);
		}
		return absBufGeometry;
	}

	/**
	 * The Object3d of rigidbody component
	 */
	private object3d: I3JS.Object3D = null;

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: I3JS.Object3D): boolean {
		if (super.setParent(parent)) {
			this.object3d = parent;
			this.getRigidBody();
			return true;
		} else {
			return false;
		}
	}

	/**
	 * The Physics of rigidbody component
	 */
	private physics: NgxPhysicsComponent = null;

	/**
	 * The Ammo of rigidbody component
	 */
	private _ammo: AmmoType.AmmoType = null;

	/**
	 * The Physics of rigidbody component
	 */
	private _physics: AmmoType.btSoftRigidDynamicsWorld = null;

	/**
	 * Sets physics
	 * @param physics
	 */
	public setPhysics(physics: NgxPhysicsComponent) {
		this.physics = physics;
		this._physics = this.physics.getPhysics();
		if (this._physics !== null) {
			this._ammo = this.physics.getAmmo();
			this.getRigidBody();
		} else {
			this.unSubscribeRefer('physics');
			this.subscribeRefer(
				'physics',
				NgxThreeUtil.getSubscribe(
					this.physics,
					() => {
						this._physics = this.physics.getPhysics();
						this._ammo = this.physics.getAmmo();
						this.getRigidBody();
					},
					'physics'
				)
			);
		}
	}

	/**
	 * Rigid body of rigidbody component
	 */
	private rigidBody: RigidbodyType = null;

	/**
	 * Gets rigid bodies
	 * @param [index]
	 * @returns rigid bodies
	 */
	private _getRigidBodies(index: number = null): AmmoType.btRigidBody[] {
		const rigidBodies: AmmoType.btRigidBody[] = [];
		if (this.rigidBody !== null) {
			switch (this.rigidBody.type) {
				case 'rigidbody':
					this.rigidBody.rigidBodies.forEach((rigidBody) => {
						rigidBodies.push(rigidBody);
					});
					break;
				case 'instanced':
					if (NgxThreeUtil.isNull(index)) {
						this.rigidBody.rigidBodies.forEach((rigidBody) => {
							rigidBodies.push(rigidBody);
						});
					} else if (NgxThreeUtil.isNotNull(this.rigidBody.rigidBodies[index])) {
						rigidBodies.push(this.rigidBody.rigidBodies[index]);
					}
					break;
				default:
					break;
			}
		}
		return rigidBodies;
	}

	/**
	 * Sets velocity
	 * @param x
	 * @param y
	 * @param z
	 * @param [type]
	 * @param [index]
	 */
	public setVelocity(x: number, y: number, z: number, type: string = 'linear', index: number = null) {
		if (this.rigidBody !== null) {
			const velocity: AmmoType.btVector3 = new this._ammo.btVector3(x, y, z);
			this._getRigidBodies(index).forEach((rigidBody) => {
				switch (type.toLowerCase()) {
					case 'angular':
						rigidBody.setAngularVelocity(velocity);
						break;
					case 'linear':
					default:
						rigidBody.setLinearVelocity(velocity);
						break;
				}
			});
		}
	}

	/**
	 * Gets velocity
	 * @param [type]
	 * @param [index]
	 * @returns velocity
	 */
	public getVelocity(type: string = 'linear', index: number = null): I3JS.Vector3 {
		if (this.rigidBody !== null) {
			let velocity: AmmoType.btVector3 = null;
			this._getRigidBodies(index).forEach((rigidBody) => {
				switch (type.toLowerCase()) {
					case 'angular':
						velocity = rigidBody.getAngularVelocity();
						break;
					case 'linear':
					default:
						velocity = rigidBody.getLinearVelocity();
						break;
				}
			});
			if (velocity !== null) {
				return new N3JS.Vector3(velocity.x(), velocity.y(), velocity.z());
			}
		}
		return null;
	}

	/**
	 * Sets factor
	 * @param x
	 * @param y
	 * @param z
	 * @param [type]
	 * @param [index]
	 */
	public setFactor(x: number, y: number, z: number, type: string = 'linear', index: number = null) {
		if (this.rigidBody !== null) {
			const factor: AmmoType.btVector3 = new this._ammo.btVector3(x, y, z);
			this._getRigidBodies(index).forEach((rigidBody) => {
				switch (type.toLowerCase()) {
					case 'angular':
						rigidBody.setAngularFactor(factor);
						break;
					case 'linear':
					default:
						rigidBody.setLinearFactor(factor);
						break;
				}
			});
		}
	}

	/**
	 * Gets factor
	 * @param [type]
	 * @param [index]
	 * @returns factor
	 */
	public getFactor(type: string = 'linear', index: number = null): I3JS.Vector3 {
		if (this.rigidBody !== null) {
			let factor: AmmoType.btVector3 = null;
			this._getRigidBodies(index).forEach((rigidBody) => {
				switch (type.toLowerCase()) {
					case 'angular':
						factor = rigidBody.getAngularFactor();
						break;
					case 'linear':
					default:
						factor = rigidBody.getLinearFactor();
						break;
				}
			});
			if (factor !== null) {
				return new N3JS.Vector3(factor.x(), factor.y(), factor.z());
			}
		}
		return null;
	}

	/**
	 * Clears forces
	 * @param [index]
	 */
	public clearForces(index: number = null) {
		if (this.rigidBody !== null) {
			this._getRigidBodies(index).forEach((rigidBody) => {
				rigidBody.clearForces();
			});
		}
	}

	/**
	 * Applys torque
	 * @param x
	 * @param y
	 * @param z
	 * @param [type]
	 * @param [index]
	 */
	public applyTorque(x: number, y: number, z: number, type: string = 'torque', index: number = null) {
		if (this.rigidBody !== null) {
			const torque: AmmoType.btVector3 = new this._ammo.btVector3(x, y, z);
			this._getRigidBodies(index).forEach((rigidBody) => {
				switch (type.toLowerCase()) {
					case 'local':
						rigidBody.applyLocalTorque(torque);
						break;
					case 'impulse':
						rigidBody.applyTorqueImpulse(torque);
						break;
					case 'torque':
					default:
						rigidBody.applyTorque(torque);
						break;
				}
			});
		}
	}

	/**
	 * Gets motion state
	 * @param [index]
	 * @returns motion state
	 */
	public getMotionState(index: number = null): AmmoType.btMotionState {
		let motionState = null;
		if (this.rigidBody !== null) {
			this._getRigidBodies(index).forEach((rigidBody) => {
				motionState = rigidBody.getMotionState();
			});
		}
		return motionState;
	}

	/**
	 * Sets motion state
	 * @param motionState
	 * @param [index]
	 */
	public setMotionState(motionState: AmmoType.btMotionState, index: number = null) {
		if (this.rigidBody !== null) {
			this._getRigidBodies(index).forEach((rigidBody) => {
				rigidBody.setMotionState(motionState);
			});
		}
	}

	/**
	 * Sets motion state position
	 * @param [x]
	 * @param [y]
	 * @param [z]
	 * @param [rx]
	 * @param [ry]
	 * @param [rz]
	 * @param [index]
	 */
	public setMotionStatePosition(
		x: number = null,
		y: number = null,
		z: number = null,
		rx: number = null,
		ry: number = null,
		rz: number = null,
		index: number = null
	) {
		if (this.rigidBody !== null) {
			const transform = new this._ammo.btTransform();
			transform.setIdentity();
			const quaternion = this.object3d.quaternion;
			const relRotation = NgxThreeUtil.getEulerSafe(rx, ry, rz);
			if (NgxThreeUtil.isNotNull(relRotation)) {
				quaternion.setFromEuler(relRotation);
			}
			transform.setRotation(new this._ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
			const position = this.object3d.position;
			const relPosition = NgxThreeUtil.getVector3Safe(x, y, z);
			if (NgxThreeUtil.isNotNull(relPosition)) {
				position.copy(relPosition);
			}
			transform.setOrigin(new this._ammo.btVector3(position.x, position.y, position.z));
			const motionState = new this._ammo.btDefaultMotionState(transform);
			this.setMotionState(motionState, index);
		}
	}

	/**
	 * Sets motion state rotation
	 * @param x
	 * @param y
	 * @param z
	 * @param [index]
	 */
	public setMotionStateRotation(x: number, y: number, z: number, index: number = null) {
		if (this.rigidBody !== null) {
			const transform = new this._ammo.btTransform();
			transform.setIdentity();
			const quaternion: I3JS.Quaternion = new N3JS.Quaternion();
			quaternion.setFromEuler(NgxThreeUtil.getEulerSafe(x, y, z));
			transform.setRotation(new this._ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
			const position = this.object3d.position;
			transform.setOrigin(new this._ammo.btVector3(position.x, position.y, position.z));
			const motionState = new this._ammo.btDefaultMotionState(transform);
			this.setMotionState(motionState, index);
		}
	}

	/**
	 * Sets position
	 * @param x
	 * @param y
	 * @param z
	 * @param [index]
	 */
	public setPosition(x: number, y: number, z: number, index: number = null) {
		if (this.rigidBody !== null) {
			let rigidBody: AmmoType.btRigidBody | AmmoType.btSoftBody = null;
			switch (this.rigidBody.type) {
				case 'rigidbody':
					if (this.rigidBody.rigidBodies.length > 0) {
						rigidBody = this.rigidBody.rigidBodies[0];
					}
					break;
				case 'softbody':
					if (NgxThreeUtil.isNotNull(this.rigidBody.softBody)) {
						rigidBody = this.rigidBody.softBody;
					}
					break;
				case 'instanced':
					if (NgxThreeUtil.isNotNull(index) && NgxThreeUtil.isNotNull(this.rigidBody.rigidBodies[index])) {
						rigidBody = this.rigidBody.rigidBodies[index];
					}
					break;
				case 'mesh':
					break;
			}
			if (rigidBody !== null) {
				if (rigidBody instanceof this._ammo.btRigidBody) {
					rigidBody.setAngularVelocity(new this._ammo.btVector3(0, 0, 0));
					rigidBody.setLinearVelocity(new this._ammo.btVector3(0, 0, 0));
				}
				const transform = new this._ammo.btTransform();
				transform.setIdentity();
				transform.setOrigin(new this._ammo.btVector3(x, y, z));
				rigidBody.setWorldTransform(transform);
			} else if (NgxThreeUtil.isNotNull(this.rigidBody.mesh)) {
				const physics: any = this._physics;
				if (NgxThreeUtil.isNotNull(physics.setMeshPosition)) {
					physics.setMeshPosition(this.rigidBody.mesh, new N3JS.Vector3(x, y, z), index);
				}
			}
		}
	}

	/**
	 * Applys force
	 * @param x
	 * @param y
	 * @param z
	 * @param [type]
	 * @param [relX]
	 * @param [relY]
	 * @param [relZ]
	 * @param [index]
	 */
	public applyForce(
		x: number,
		y: number,
		z: number,
		type: string = 'force',
		relX: number = 0,
		relY: number = 0,
		relZ: number = 0,
		index: number = null
	) {
		if (this.rigidBody !== null) {
			const force: AmmoType.btVector3 = new this._ammo.btVector3(x, y, z);
			this._getRigidBodies(index).forEach((rigidBody) => {
				switch (type.toLowerCase()) {
					case 'centrallocal':
						rigidBody.applyCentralLocalForce(force);
						break;
					case 'central':
						rigidBody.applyCentralForce(force);
						break;
					case 'force':
					default:
						const relPos: AmmoType.btVector3 = new this._ammo.btVector3(relX, relY, relZ);
						rigidBody.applyForce(force, relPos);
						break;
				}
			});
		}
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (this.rigidBody !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getRigidBody();
				return;
			}
			if (
				!NgxThreeUtil.isOnlyIndexOf(
					changes,
					[
						'physics',
						'rigidbodynode',
						'velocity',
						'velocityx',
						'velocityy',
						'velocityz',
						'angularvelocityx',
						'angularvelocityy',
						'angularvelocityz',
						'velocitytype',
					],
					this.OBJECT_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, ['init'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['rigidbodynode', 'physics', 'velocity']);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['velocityx', 'velocityy', 'velocityz', 'velocitytype'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['velocity']);
			}
			if (this._physics instanceof this._ammo.btSoftRigidDynamicsWorld) {
				changes.forEach((change) => {
					switch (change.toLowerCase()) {
						case 'velocity':
							if (
								NgxThreeUtil.isNotNull(this.velocityX) ||
								NgxThreeUtil.isNotNull(this.velocityY) ||
								NgxThreeUtil.isNotNull(this.velocityZ)
							) {
								this.setVelocity(
									NgxThreeUtil.getTypeSafe(this.velocityX, 0),
									NgxThreeUtil.getTypeSafe(this.velocityY, 0),
									NgxThreeUtil.getTypeSafe(this.velocityZ, 0),
									NgxThreeUtil.getTypeSafe(this.velocityType, 'linear')
								);
							}
							if (
								NgxThreeUtil.isNotNull(this.angularVelocityX) ||
								NgxThreeUtil.isNotNull(this.angularVelocityY) ||
								NgxThreeUtil.isNotNull(this.angularVelocityZ)
							) {
								this.setVelocity(
									NgxThreeUtil.getTypeSafe(this.angularVelocityX, 0),
									NgxThreeUtil.getTypeSafe(this.angularVelocityY, 0),
									NgxThreeUtil.getTypeSafe(this.angularVelocityZ, 0),
									NgxThreeUtil.getTypeSafe(this.velocityType, 'angular')
								);
							}
							break;
						case 'rigidbodynode':
							this.unSubscribeReferList('rigidbodyNodeList');
							if (NgxThreeUtil.isNotNull(this.rigidbodyNodeList) && NgxThreeUtil.isNotNull(this.rigidBody.softBody)) {
								const softBody = this.rigidBody.softBody;
								this.rigidbodyNodeList.forEach((rigidbodyNode) => {
									rigidbodyNode.setRigidbody(softBody, this._physics, this._ammo);
								});
								this.subscribeListQuery(this.rigidbodyNodeList, 'rigidbodyNodeList', 'rigidbodynode');
							}
							break;
						case 'physics':
							const mass = this.getMass();
							switch (this.rigidBody.type) {
								case 'instanced':
								case 'rigidbody':
									this.rigidBody.rigidBodies.forEach((rigidBody) => {
										if (mass > 0) {
											rigidBody.setActivationState(4);
										}
										this._physics.addRigidBody(rigidBody);
									});
									break;
								case 'softbody':
									if (NgxThreeUtil.isNotNull(this.rigidBody.softBody)) {
										this.rigidBody.softBody.setTotalMass(mass, false);
										if (mass > 0) {
											this.rigidBody.softBody.setActivationState(4);
										}
										this._physics.addSoftBody(this.rigidBody.softBody, 1, -1);
									}
									break;
							}
							break;
					}
				});
			} else {
				changes.forEach((change) => {
					switch (change.toLowerCase()) {
						case 'velocity':
							break;
						case 'rigidbodynode':
							break;
						case 'physics':
							const mass = this.getMass();
							switch (this.rigidBody.type) {
								case 'mesh':
									const physics: any = this._physics;
									if (mass > 0) {
										physics.addMesh(this.rigidBody.mesh, this.mass);
									} else {
										physics.addMesh(this.rigidBody.mesh);
									}
									break;
							}
							break;
					}
				});
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * Creates debris from breakable object
	 * @param objects
	 */
	private _createDebrisFromBreakableObject(objects: I3JS.Object3D[]) {
		this.rigidBody.debris = [];
		const castShadow = this.object3d.castShadow;
		const receiveShadow = this.object3d.receiveShadow;
		objects.forEach((object, idx) => {
			object.castShadow = castShadow;
			object.receiveShadow = receiveShadow;
			this.object3d.parent.add(object);
			const rigidBody = new NgxRigidbodyComponent();
			this.initLocalComponent('debris_' + idx, rigidBody);
			const velocity = object.userData.velocity;
			const angularVelocity = object.userData.angularVelocity;

			rigidBody.updateInputParams(
				{
					mass: object.userData.mass,
					margin: this.margin,
					velocityX: velocity ? velocity.x : null,
					velocityY: velocity ? velocity.y : null,
					velocityZ: velocity ? velocity.z : null,
					angularVelocityX: angularVelocity ? angularVelocity.x : null,
					angularVelocityY: angularVelocity ? angularVelocity.y : null,
					angularVelocityZ: angularVelocity ? angularVelocity.z : null,
					friction: this.friction,
					breakable: this.breakable,
				},
				true,
				{},
				'convexhull'
			);
			rigidBody.setPhysics(this.physics);
			rigidBody.setParent(object);
			this.rigidBody.debris.push(rigidBody);
		});
		this.rigidBody.rigidBodies.forEach((rigidBody) => {
			this._physics.removeRigidBody(rigidBody);
		});
		if (NgxThreeUtil.isNotNull(this.rigidBody.softBody)) {
			this._physics.removeSoftBody(this.rigidBody.softBody);
		}
		this.rigidBody.type = 'debris';
		this.object3d.parent.remove(this.object3d);
	}

	/**
	 * Process geometry
	 * @param bufGeometry
	 * @returns geometry
	 */
	private _processGeometry(bufGeometry: I3JS.BufferGeometry): {
		ammoVertices: number[];
		ammoIndices: number[];
		ammoIndexAssociation: number[][];
	} {
		// Ony consider the position values when merging the vertices
		const posOnlyBufGeometry = new N3JS.BufferGeometry();
		posOnlyBufGeometry.setAttribute('position', bufGeometry.getAttribute('position'));
		posOnlyBufGeometry.setIndex(bufGeometry.getIndex());
		// Merge the vertices so the triangle soup is converted to indexed triangles
		const indexedBufferGeom = NgxGeometryUtils.mergeVertices(posOnlyBufGeometry);
		// Create index arrays mapping the indexed vertices to bufGeometry vertices
		return this._mapIndices(bufGeometry, indexedBufferGeom);
	}

	/**
	 * Determines whether equal is
	 * @param x1
	 * @param y1
	 * @param z1
	 * @param x2
	 * @param y2
	 * @param z2
	 * @returns true if equal
	 */
	private _isEqual(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): boolean {
		const delta = 0.000001;
		return Math.abs(x2 - x1) < delta && Math.abs(y2 - y1) < delta && Math.abs(z2 - z1) < delta;
	}

	/**
	 * Maps indices
	 * @param bufGeometry
	 * @param indexedBufferGeom
	 * @returns indices
	 */
	private _mapIndices(
		bufGeometry: I3JS.BufferGeometry,
		indexedBufferGeom: I3JS.BufferGeometry
	): {
		ammoVertices: number[];
		ammoIndices: number[];
		ammoIndexAssociation: number[][];
	} {
		const vertices = bufGeometry.attributes.position.array as number[];
		const idxVertices = indexedBufferGeom.attributes.position.array as number[];
		const indices = indexedBufferGeom.index.array as number[];
		const numIdxVertices = idxVertices.length / 3;
		const numVertices = vertices.length / 3;
		const ammoIndexAssociation = [];
		for (let i = 0; i < numIdxVertices; i++) {
			const association: any[] = [];
			ammoIndexAssociation.push(association);
			const i3 = i * 3;
			for (let j = 0; j < numVertices; j++) {
				const j3 = j * 3;
				if (
					this._isEqual(
						idxVertices[i3],
						idxVertices[i3 + 1],
						idxVertices[i3 + 2],
						vertices[j3],
						vertices[j3 + 1],
						vertices[j3 + 2]
					)
				) {
					association.push(j);
				}
			}
		}
		return {
			ammoVertices: idxVertices,
			ammoIndices: indices,
			ammoIndexAssociation: ammoIndexAssociation,
		};
	}

	/**
	 * World info of rigidbody component
	 */
	private worldInfo: AmmoType.btSoftBodyWorldInfo = null;

	/**
	 * Gets world info
	 * @returns world info
	 */
	public getWorldInfo(): AmmoType.btSoftBodyWorldInfo {
		if (this.worldInfo === null) {
			this.worldInfo = this._physics.getWorldInfo();
		}
		return this.worldInfo;
	}

	/**
	 * Gets rigid body
	 * @returns rigid body
	 */
	public getRigidBody(): RigidbodyType {
		if (
			this.object3d !== null &&
			NgxThreeUtil.isNotNull(this._ammo) &&
			NgxThreeUtil.isNotNull(this._physics) &&
			(this.rigidBody === null || this._needUpdate)
		) {
			this.needUpdate = false;
			if (this._physics instanceof this._ammo.btSoftRigidDynamicsWorld) {
				if (this.rigidBody !== null) {
					this.rigidBody.rigidBodies.forEach((rigidBody) => {
						this._physics.removeRigidBody(rigidBody);
					});
					if (NgxThreeUtil.isNotNull(this.rigidBody.softBody)) {
						this._physics.removeSoftBody(this.rigidBody.softBody);
					}
					this.rigidBody.debris.forEach((debris) => {
						debris.ngOnDestroy();
					});
				}
				this.transformAux = new this._ammo.btTransform();
				this.positionAux = new N3JS.Vector3();
				let shape: AmmoType.btCollisionShape = null;
				let softBody: AmmoType.btSoftBody = null;
				let type: string = this.type;
				let geometry: I3JS.BufferGeometry = null;
				let ammoIndexAssociation: number[][] = null;
				const localScaling = new N3JS.Vector3(1, 1, 1);
				const anyObject3d: any = this.object3d;
				if (NgxThreeUtil.isNotNull(anyObject3d['geometry'])) {
					geometry = anyObject3d['geometry'];
				} else {
					type = 'empty';
				}
				if (type.toLowerCase() === 'auto') {
					if (NgxThreeUtil.isNotNull(geometry)) {
						switch (geometry.type.toLowerCase()) {
							case 'boxgeometry':
								type = 'box';
								break;
							case 'spheregeometry':
								type = 'sphere';
								break;
							case 'conegeometry':
								type = 'cone';
								break;
							case 'cylindergeometry':
								type = 'cylinder';
								break;
							case 'planegeometry':
								type = 'plane';
								break;
							case 'capsulegeometry':
								type = 'capsule';
								break;
							case 'ropegeometry':
								type = 'rope';
								break;
							default:
								type = 'convexhull';
								break;
						}
						if (this.isSoftBody) {
							switch (type) {
								case 'rope':
									type = 'rope';
									break;
								case 'plane':
									type = 'softpatch';
									break;
								default:
									type = 'softtrimesh';
									break;
							}
						}
					} else {
						type = 'empty';
					}
				}
				switch (type.toLowerCase()) {
					case 'convextriangle':
						{
							const meshInterface: AmmoType.btStridingMeshInterface = null;
							const calcAabb: boolean = false;
							shape = new this._ammo.btConvexTriangleMeshShape(meshInterface, calcAabb);
						}
						break;
					case 'box':
						shape = new this._ammo.btBoxShape(this.getBoxHalfExtents(geometry));
						break;
					case 'capsule':
						shape = new this._ammo.btCapsuleShape(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
						break;
					case 'capsulex':
						shape = new this._ammo.btCapsuleShapeX(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
						break;
					case 'capsulez':
						shape = new this._ammo.btCapsuleShapeZ(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
						break;
					case 'cylinder':
						shape = new this._ammo.btCylinderShape(this.getBoxHalfExtents(geometry));
						break;
					case 'cylinderx':
						shape = new this._ammo.btCylinderShapeX(this.getBoxHalfExtents(geometry));
						break;
					case 'cylinderz':
						shape = new this._ammo.btCylinderShapeZ(this.getBoxHalfExtents(geometry));
						break;
					case 'sphere':
						shape = new this._ammo.btSphereShape(this.getRadius(geometry, 0));
						break;
					case 'multisphere':
						{
							const positions: AmmoType.btVector3 = null;
							const radii: ReadonlyArray<number> = null;
							const numPoints: number = null;
							shape = new this._ammo.btMultiSphereShape(positions, radii, numPoints);
						}
						break;
					case 'cone':
						shape = new this._ammo.btConeShape(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
						break;
					case 'conex':
						shape = new this._ammo.btConeShapeX(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
						break;
					case 'conez':
						shape = new this._ammo.btConeShapeZ(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
						break;
					case 'convexhull':
						{
							const btConvexHullShape = new this._ammo.btConvexHullShape();
							const coords = geometry.attributes.position.array;
							const tempBtVec3 = new this._ammo.btVector3(0, 0, 0);
							for (let i = 0, il = coords.length; i < il; i += 3) {
								tempBtVec3.setValue(coords[i], coords[i + 1], coords[i + 2]);
								const lastOne = i >= il - 3;
								btConvexHullShape.addPoint(tempBtVec3, lastOne);
							}
							shape = btConvexHullShape;
						}
						break;
					case 'compound':
						{
							const enableDynamicAabbTree: boolean = false;
							shape = new this._ammo.btCompoundShape(enableDynamicAabbTree);
						}
						break;
					case 'plane':
					case 'staticplane':
						{
							const planeNormal: AmmoType.btVector3 = null;
							const planeConstant: number = null;
							shape = new this._ammo.btStaticPlaneShape(planeNormal, planeConstant);
						}
						break;
					case 'bvhtriangle':
						{
							const meshInterface: AmmoType.btStridingMeshInterface = null;
							const useQuantizedAabbCompression: boolean = null;
							const buildBvh: boolean = null;
							shape = new this._ammo.btBvhTriangleMeshShape(meshInterface, useQuantizedAabbCompression, buildBvh);
						}
						break;
					case 'terrain':
					case 'heightfieldterrain':
						{
							const size = this.getGeometrySize(geometry);
							const segments = this.getGeometrySegments(geometry);
							const meshPositions = geometry.getAttribute('position') as I3JS.BufferAttribute;
							const heightStickWidth: number = segments.x + 1;
							const heightStickLength: number = segments.y + 1;
							const heightfieldData = this._ammo._malloc(4 * heightStickWidth * heightStickLength);
							let p = 0;
							let p2 = 0;
							let minHeight: number = Infinity;
							let maxHeight: number = -Infinity;
							for (let j = 0; j < heightStickLength; j++) {
								for (let i = 0; i < heightStickWidth; i++) {
									const height = meshPositions.getY(p);
									this._ammo.HEAPF32[(heightfieldData + p2) >> 2] = height;
									minHeight = Math.min(minHeight, height);
									maxHeight = Math.max(maxHeight, height);
									p++;
									p2 += 4;
								}
							}
							const heightScale: number = 1;
							const upAxis: number = 1;
							const hdt: AmmoType.PHY_ScalarType = 'PHY_FLOAT';
							const flipQuadEdges: boolean = false;
							shape = new this._ammo.btHeightfieldTerrainShape(
								heightStickWidth,
								heightStickLength,
								heightfieldData,
								heightScale,
								minHeight,
								maxHeight,
								upAxis,
								hdt,
								flipQuadEdges
							);
							localScaling.set(size.x / heightStickWidth, 1, size.y / heightStickLength);
						}
						break;
					case 'rope':
						switch (geometry.type.toLowerCase()) {
							case 'ropegeometry':
								const absGeometry = this.getAbsoluteGeometry(geometry, this.object3d);
								const attrPos = absGeometry.getAttribute('position') as I3JS.BufferAttribute;
								let index = 0;
								const ropeStart = new this._ammo.btVector3(
									attrPos.getX(index),
									attrPos.getY(index),
									attrPos.getZ(index)
								);
								index = attrPos.count - 1;
								const ropeEnd = new this._ammo.btVector3(attrPos.getX(index), attrPos.getY(index), attrPos.getZ(index));
								softBody = this.physics
									.getSoftBodyHelpers()
									.CreateRope(this.getWorldInfo(), ropeStart, ropeEnd, attrPos.count - 1, 0);
								(geometry.getAttribute('position') as I3JS.BufferAttribute).setUsage(N3JS.DynamicDrawUsage);
								break;
							default:
								break;
						}
						break;
					case 'trimesh':
					case 'softtrimesh':
						{
							const absGeometry = this.getAbsoluteGeometry(geometry, this.object3d);
							const processGeometryInfo = this._processGeometry(absGeometry);
							ammoIndexAssociation = processGeometryInfo.ammoIndexAssociation;
							softBody = this.physics
								.getSoftBodyHelpers()
								.CreateFromTriMesh(
									this.getWorldInfo(),
									processGeometryInfo.ammoVertices,
									processGeometryInfo.ammoIndices,
									processGeometryInfo.ammoIndices.length / 3,
									NgxThreeUtil.getTypeSafe(this.randomizeConstraints, true)
								);
							(geometry.getAttribute('position') as I3JS.BufferAttribute).setUsage(N3JS.DynamicDrawUsage);
						}
						break;
					case 'ellipsoid':
					case 'softellipsoid':
						{
							const center: AmmoType.btVector3 = null;
							const radius: AmmoType.btVector3 = null;
							const res: number = null;
							softBody = this.physics.getSoftBodyHelpers().CreateEllipsoid(this.getWorldInfo(), center, radius, res);
						}
						break;
					case 'softconvex':
					case 'softconvexhull':
						{
							const vertices: AmmoType.btVector3 = null;
							const nvertices: number = null;
							const randomizeConstraints: boolean = null;
							softBody = this.physics
								.getSoftBodyHelpers()
								.CreateFromConvexHull(this.getWorldInfo(), vertices, nvertices, randomizeConstraints);
						}
						break;
					case 'softpatch':
						switch (geometry.type.toLowerCase()) {
							case 'planegeometry':
								{
									const segments = this.getGeometrySegments(geometry, 1);
									const absGeometry = this.getAbsoluteGeometry(geometry, this.object3d);
									const attrPos = absGeometry.getAttribute('position') as I3JS.BufferAttribute;
									const attrCount = attrPos.count;
									let index = 0;
									const clothCorner00 = new this._ammo.btVector3(
										attrPos.getX(index),
										attrPos.getY(index),
										attrPos.getZ(index)
									);
									index = segments.x;
									const clothCorner01 = new this._ammo.btVector3(
										attrPos.getX(index),
										attrPos.getY(index),
										attrPos.getZ(index)
									);
									index = attrCount - segments.x - 1;
									const clothCorner10 = new this._ammo.btVector3(
										attrPos.getX(index),
										attrPos.getY(index),
										attrPos.getZ(index)
									);
									index = attrCount - 1;
									const clothCorner11 = new this._ammo.btVector3(
										attrPos.getX(index),
										attrPos.getY(index),
										attrPos.getZ(index)
									);
									softBody = this.physics
										.getSoftBodyHelpers()
										.CreatePatch(
											this.getWorldInfo(),
											clothCorner00,
											clothCorner01,
											clothCorner10,
											clothCorner11,
											segments.x + 1,
											segments.y + 1,
											0,
											true
										);
									attrPos.setUsage(N3JS.DynamicDrawUsage);
								}
								break;
						}
						break;
					case 'empty':
					default:
						break;
				}
				const mass = this.getMass();
				const margin = this.getMargin(0.05);
				if (softBody === null && shape === null) {
					shape = new this._ammo.btEmptyShape();
				}
				if (softBody !== null) {
					const sbConfig = softBody.get_m_cfg();
					if (NgxThreeUtil.isNotNull(this.viterations)) {
						sbConfig.set_viterations(NgxThreeUtil.getNumberSafe(this.viterations, 10));
					}
					if (NgxThreeUtil.isNotNull(this.piterations)) {
						sbConfig.set_piterations(NgxThreeUtil.getNumberSafe(this.piterations, 10));
					}
					if (NgxThreeUtil.isNotNull(this.collisions)) {
						// Soft-soft and soft-rigid collisions
						sbConfig.set_collisions(NgxThreeUtil.getNumberSafe(this.collisions, 0));
					}
					if (NgxThreeUtil.isNotNull(this.friction)) {
						// Friction
						sbConfig.set_kDF(this.getFriction(0));
					}
					if (NgxThreeUtil.isNotNull(this.damping) || NgxThreeUtil.isNotNull(this.linDamping)) {
						// Damping
						sbConfig.set_kDP(this.getLinDamping(0));
					}
					if (NgxThreeUtil.isNotNull(this.pressure)) {
						sbConfig.set_kPR(this.pressure);
					}
					if (NgxThreeUtil.isNotNull(this.stiffness) || NgxThreeUtil.isNotNull(this.linStiffness)) {
						// Line Stiffness
						softBody.get_m_materials().at(0).set_m_kLST(NgxThreeUtil.getTypeSafe(this.linStiffness, this.stiffness));
					}
					if (NgxThreeUtil.isNotNull(this.stiffness) || NgxThreeUtil.isNotNull(this.angStiffness)) {
						// Angular Stiffness
						softBody.get_m_materials().at(0).set_m_kAST(NgxThreeUtil.getTypeSafe(this.angStiffness, this.stiffness));
					}
					softBody.setActivationState(0);
					const softShape = softBody.getCollisionShape();
					softShape.setMargin(margin);
					this.rigidBody = {
						type: 'softbody',
						rigidBodies: [],
						softBody: softBody,
						debris: [],
						ammoIndexAssociation: ammoIndexAssociation,
					};
				} else if (shape !== null) {
					localScaling.multiply(this.object3d.getWorldScale(new N3JS.Vector3(1, 1, 1)));
					shape.setLocalScaling(new this._ammo.btVector3(localScaling.x, localScaling.y, localScaling.z));
					shape.setMargin(margin);
					const localInertia = this.getInertia(0);
					shape.calculateLocalInertia(mass, localInertia);
					if (this.object3d instanceof N3JS.InstancedMesh) {
						const array = this.object3d.instanceMatrix.array as [];
						const bodies: AmmoType.btRigidBody[] = [];
						for (let i = 0; i < this.object3d.count; i++) {
							const index = i * 16;
							const transform = new this._ammo.btTransform();
							transform.setFromOpenGLMatrix(array.slice(index, index + 16));
							const motionState = new this._ammo.btDefaultMotionState(transform);
							const rbInfo = new this._ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
							const body = new this._ammo.btRigidBody(rbInfo);
							if (NgxThreeUtil.isNotNull(this.friction)) {
								body.setFriction(this.getFriction(0));
							}
							if (NgxThreeUtil.isNotNull(this.rollingFriction)) {
								body.setRollingFriction(this.getRollingFriction(0));
							}
							if (NgxThreeUtil.isNotNull(this.restitution)) {
								body.setRestitution(this.getRestitution(0));
							}
							if (NgxThreeUtil.isNotNull(this.linDamping)) {
								body.setDamping(this.getLinDamping(0), this.getAngDamping(0));
							}
							body.setActivationState(0);
							bodies.push(body);
						}
						if (mass > 0) {
							this.object3d.instanceMatrix.setUsage(N3JS.DynamicDrawUsage);
						}
						this.rigidBody = {
							type: 'instanced',
							rigidBodies: bodies,
							softBody: null,
							debris: [],
						};
					} else {
						const transform = new this._ammo.btTransform();
						transform.setIdentity();
						const quaternion = this.object3d.getWorldQuaternion(new N3JS.Quaternion());
						transform.setRotation(new this._ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
						const position = this.object3d.getWorldPosition(new N3JS.Vector3());
						transform.setOrigin(new this._ammo.btVector3(position.x, position.y, position.z));
						const motionState = new this._ammo.btDefaultMotionState(transform);
						const rbInfo = new this._ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
						const body: any = new this._ammo.btRigidBody(rbInfo);
						if (NgxThreeUtil.isNotNull(this.friction)) {
							body.setFriction(this.getFriction(0));
						}
						if (NgxThreeUtil.isNotNull(this.rollingFriction)) {
							body.setRollingFriction(this.getRollingFriction(0));
						}
						if (NgxThreeUtil.isNotNull(this.restitution)) {
							body.setRestitution(this.getRestitution(0));
						}
						if (NgxThreeUtil.isNotNull(this.linDamping)) {
							body.setDamping(this.getLinDamping(0), this.getAngDamping(0));
						}
						body.setActivationState(0);
						body['object3d'] = this.object3d;
						this.rigidBody = {
							type: 'rigidbody',
							rigidBodies: [body],
							softBody: null,
							debris: [],
						};
						this.object3d.addEventListener('collision', (e) => {
							// this.consoleLog('collision', e, 'info');
						});
						if (this.breakable) {
							this.physics
								.getConvexObjectBreaker()
								.prepareBreakableObject(this.object3d, mass, new N3JS.Vector3(), new N3JS.Vector3(), true);
							const btVecUserData: any = new this._ammo.btVector3(0, 0, 0);
							btVecUserData['threeObject'] = this.object3d;
							body.setUserPointer(btVecUserData);
							this.object3d.addEventListener('debris', (e) => {
								this._createDebrisFromBreakableObject(e.fragments);
							});
						}
					}
				}
			} else {
				this.rigidBody = {
					type: 'mesh',
					rigidBodies: null,
					softBody: null,
					debris: null,
					ammoIndexAssociation: null,
					mesh: this.object3d,
				};
			}
			this.object3d.userData.rigidBody = this.id;
			super.setObject(this.rigidBody);
			NgxThreeUtil.setSubscribeNext(this.object3d, this.subscribeType);
		}
		return this.rigidBody;
	}

	/**
	 * Transform aux of rigidbody component
	 */
	private transformAux: AmmoType.btTransform = null;

	/**
	 * Position aux of rigidbody component
	 */
	private positionAux: I3JS.Vector3 = null;

	/**
	 * Instanced mesh compose
	 * @param position
	 * @param quaternion
	 * @param array
	 * @param index
	 */
	private _instancedMeshCompose(
		position: AmmoType.btVector3,
		quaternion: AmmoType.btQuaternion,
		array: number[],
		index: number
	) {
		const x = quaternion.x(),
			y = quaternion.y(),
			z = quaternion.z(),
			w = quaternion.w();
		const x2 = x + x,
			y2 = y + y,
			z2 = z + z;
		const xx = x * x2,
			xy = x * y2,
			xz = x * z2;
		const yy = y * y2,
			yz = y * z2,
			zz = z * z2;
		const wx = w * x2,
			wy = w * y2,
			wz = w * z2;
		array[index + 0] = 1 - (yy + zz);
		array[index + 1] = xy + wz;
		array[index + 2] = xz - wy;
		array[index + 3] = 0;
		array[index + 4] = xy - wz;
		array[index + 5] = 1 - (xx + zz);
		array[index + 6] = yz + wx;
		array[index + 7] = 0;
		array[index + 8] = xz + wy;
		array[index + 9] = yz - wx;
		array[index + 10] = 1 - (xx + yy);
		array[index + 11] = 0;
		array[index + 12] = position.x();
		array[index + 13] = position.y();
		array[index + 14] = position.z();
		array[index + 15] = 1;
	}

	/**
	 * Updates rigidbody component
	 * @param timer
	 */
	public update(timer: IRendererTimer) {
		if (this.rigidBody !== null) {
			this.object3d.updateMatrixWorld(true);
			switch (this.rigidBody.type) {
				case 'softbody':
					const object3dAny: any = this.object3d;
					if (NgxThreeUtil.isNotNull(object3dAny['geometry']) && NgxThreeUtil.isNotNull(this.rigidBody.softBody)) {
						const softBody = this.rigidBody.softBody;
						const geometry: I3JS.BufferGeometry = object3dAny['geometry'];
						const meshPositions = geometry.getAttribute('position') as I3JS.BufferAttribute;
						const nodes = softBody.get_m_nodes();
						const position = this.positionAux;
						if (NgxThreeUtil.isNotNull(this.rigidBody.ammoIndexAssociation)) {
							const association = this.rigidBody.ammoIndexAssociation;
							const numVerts = association.length;
							for (let j = 0; j < numVerts; j++) {
								const node = nodes.at(j);
								const nodePos = node.get_m_x();
								position.set(nodePos.x(), nodePos.y(), nodePos.z());
								const lPos = this.object3d.worldToLocal(position);
								const assocVertex = association[j];
								for (let k = 0, kl = assocVertex.length; k < kl; k++) {
									let indexVertex = assocVertex[k];
									meshPositions.setXYZ(indexVertex, lPos.x, lPos.y, lPos.z);
								}
							}
						} else {
							const numVerts = meshPositions.count;
							for (let i = 0; i < numVerts; i++) {
								const node = nodes.at(i);
								const nodePos = node.get_m_x();
								position.set(nodePos.x(), nodePos.y(), nodePos.z());
								const lPos = this.object3d.worldToLocal(position);
								meshPositions.setXYZ(i, lPos.x, lPos.y, lPos.z);
							}
						}
						meshPositions.needsUpdate = true;
						geometry.computeVertexNormals();
					}
					break;
				case 'rigidbody':
					if (this.rigidBody.rigidBodies.length > 0) {
						const worldTransform = this.transformAux;
						const motionState = this.rigidBody.rigidBodies[0].getMotionState();
						motionState.getWorldTransform(worldTransform);
						const position = worldTransform.getOrigin();
						const quaternion = worldTransform.getRotation();
						this.object3d.position.set(position.x(), position.y(), position.z());
						this.object3d.quaternion.set(quaternion.x(), quaternion.y(), quaternion.z(), quaternion.w());
						this.object3d.userData.collided = false;
					}
					break;
				case 'instanced':
					if (this.object3d instanceof N3JS.InstancedMesh) {
						const array = this.object3d.instanceMatrix.array as number[];
						const bodies = this.rigidBody.rigidBodies;
						const worldTransform = this.transformAux;
						for (let j = 0; j < bodies.length; j++) {
							const body = bodies[j];
							const motionState = body.getMotionState();
							motionState.getWorldTransform(worldTransform);
							const position = worldTransform.getOrigin();
							const quaternion = worldTransform.getRotation();
							this._instancedMeshCompose(position, quaternion, array, j * 16);
						}
						this.object3d.instanceMatrix.needsUpdate = true;
					}
					break;
				case 'debris':
					if (this.rigidBody.debris.length > 0) {
						this.rigidBody.debris.forEach((debris) => {
							debris.update(timer);
						});
					}
					break;
			}
		}
	}
}
