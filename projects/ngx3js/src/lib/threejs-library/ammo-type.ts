
/**
 * Bt idebug draw
 */
interface btIDebugDraw {
	drawLine(from: btVector3, to: btVector3, color: btVector3): void;
	drawContactPoint(
		pointOnB: btVector3,
		normalOnB: btVector3,
		distance: number,
		lifeTime: number,
		color: btVector3
	): void;
	reportErrorWarning(warningString: string): void;
	draw3dText(location: btVector3, textString: string): void;
	setDebugMode(debugMode: number): void;
	getDebugMode(): number;
}
/**
 * Debug drawer
 */
interface DebugDrawer {
	new (): this;
	drawLine(from: btVector3, to: btVector3, color: btVector3): void;
	drawContactPoint(
		pointOnB: btVector3,
		normalOnB: btVector3,
		distance: number,
		lifeTime: number,
		color: btVector3
	): void;
	reportErrorWarning(warningString: string): void;
	draw3dText(location: btVector3, textString: string): void;
	setDebugMode(debugMode: number): void;
	getDebugMode(): number;
}

/**
 * Bt vector3
 */
export interface btVector3 {
	new (x?: number, y?: number, z?: number): this;
	length(): number;
	x(): number;
	y(): number;
	z(): number;
	setX(x: number): void;
	setY(y: number): void;
	setZ(z: number): void;
	setValue(x: number, y: number, z: number): void;
	normalize(): void;
	rotate(wAxis: btVector3, angle: number): btVector3;
	dot(v: btVector3): number;
	op_mul(x: number): btVector3;
	op_add(v: btVector3): btVector3;
	op_sub(v: btVector3): btVector3;
}
/**
 * Bt vector4
 */
interface btVector4 extends btVector3 {
	new (): this;
	new (x: number, y: number, z: number, w: number): this;
	w(): number;
	setValue(x: number, y: number, z: number): void;
	setValue(x: number, y: number, z: number, w: number): void;
}
/**
 * Bt quad word
 */
interface btQuadWord {
	x(): number;
	y(): number;
	z(): number;
	w(): number;
	setX(x: number): void;
	setY(y: number): void;
	setZ(z: number): void;
	setW(w: number): void;
}
/**
 * Bt quaternion
 */
export interface btQuaternion extends btQuadWord {
	new (x: number, y: number, z: number, w: number): this;
	setValue(x: number, y: number, z: number, w: number): void;
	setEulerZYX(z: number, y: number, x: number): void;
	setRotation(axis: btVector3, angle: number): void;
	normalize(): void;
	length2(): number;
	length(): number;
	dot(q: btQuaternion): number;
	normalized(): btQuaternion;
	getAxis(): btVector3;
	inverse(): btQuaternion;
	getAngle(): number;
	getAngleShortestPath(): number;
	angle(q: btQuaternion): number;
	angleShortestPath(q: btQuaternion): number;
	op_add(q: btQuaternion): btQuaternion;
	op_sub(q: btQuaternion): btQuaternion;
	op_mul(s: number): btQuaternion;
	op_mulq(q: btQuaternion): btQuaternion;
	op_div(s: number): btQuaternion;
}
/**
 * Bt matrix3x3
 */
interface btMatrix3x3 {
	setEulerZYX(ex: number, ey: number, ez: number): void;
	getRotation(q: btQuaternion): void;
	getRow(y: number): btVector3;
}
/**
 * Bt transform
 */
export interface btTransform {
	new (): this;
	new (q: btQuaternion, v: btVector3): this;
	setIdentity(): void;
	setOrigin(origin: btVector3): void;
	setRotation(rotation: btQuaternion): void;
	getOrigin(): btVector3;
	getRotation(): btQuaternion;
	getBasis(): btMatrix3x3;
	setFromOpenGLMatrix(m: ReadonlyArray<number>): void;
	inverse(): btTransform;
	op_mul(t: btTransform): btTransform;
}
/**
 * Bt motion state
 */
export interface btMotionState {
	getWorldTransform(worldTrans: btTransform): void;
	setWorldTransform(worldTrans: btTransform): void;
}
/**
 * Bt default motion state
 */
interface btDefaultMotionState extends btMotionState {
	new (startTrans?: btTransform, centerOfMassOffset?: btTransform): this;
	get_m_graphicsWorldTrans(): btTransform;
	set_m_graphicsWorldTrans(m_graphicsWorldTrans: btTransform): void;
}
/**
 * Bt collision object
 */
export interface btCollisionObject {
	setAnisotropicFriction(
		anisotropicFriction: btVector3,
		frictionMode: number
	): void;
	getCollisionShape(): btCollisionShape;
	setContactProcessingThreshold(contactProcessingThreshold: number): void;
	setActivationState(newState: number): void;
	forceActivationState(newState: number): void;
	activate(forceActivation?: boolean): void;
	isActive(): boolean;
	isKinematicObject(): boolean;
	isStaticObject(): boolean;
	isStaticOrKinematicObject(): boolean;
	getRestitution(): number;
	getFriction(): number;
	getRollingFriction(): number;
	setRestitution(rest: number): void;
	setFriction(frict: number): void;
	setRollingFriction(frict: number): void;
	getWorldTransform(): btTransform;
	getCollisionFlags(): number;
	setCollisionFlags(flags: number): void;
	setWorldTransform(worldTrans: btTransform): void;
	setCollisionShape(collisionShape: btCollisionShape): void;
	setCcdMotionThreshold(ccdMotionThreshold: number): void;
	setCcdSweptSphereRadius(radius: number): void;
	getUserIndex(): number;
	setUserIndex(index: number): void;
	getUserPointer(): unknown;
	setUserPointer(userPointer: unknown): void;
	getBroadphaseHandle(): btBroadphaseProxy;
}
/**
 * Bt collision object wrapper
 */
interface btCollisionObjectWrapper {
	getWorldTransform(): btTransform;
	getCollisionObject(): btCollisionObject;
	getCollisionShape(): btCollisionShape;
}
/**
 * Ray result callback
 */
interface RayResultCallback {
	hasHit(): boolean;
	get_m_collisionFilterGroup(): number;
	set_m_collisionFilterGroup(m_collisionFilterGroup: number): void;
	get_m_collisionFilterMask(): number;
	set_m_collisionFilterMask(m_collisionFilterMask: number): void;
	get_m_closestHitFraction(): number;
	set_m_closestHitFraction(m_closestHitFraction: number): void;
	get_m_collisionObject(): btCollisionObject;
	set_m_collisionObject(m_collisionObject: btCollisionObject): void;
}
/**
 * Closest ray result callback
 */
interface ClosestRayResultCallback extends RayResultCallback {
	new (from: btVector3, to: btVector3): this;
	get_m_rayFromWorld(): btVector3;
	set_m_rayFromWorld(m_rayFromWorld: btVector3): void;
	get_m_rayToWorld(): btVector3;
	set_m_rayToWorld(m_rayToWorld: btVector3): void;
	get_m_hitNormalWorld(): btVector3;
	set_m_hitNormalWorld(m_hitNormalWorld: btVector3): void;
	get_m_hitPointWorld(): btVector3;
	set_m_hitPointWorld(m_hitPointWorld: btVector3): void;
}
/**
 * Bt const collision object array
 */
interface btConstCollisionObjectArray {
	size(): number;
	at(n: number): btCollisionObject;
}
/**
 * Bt scalar array
 */
interface btScalarArray {
	size(): number;
	at(n: number): number;
}
/**
 * All hits ray result callback
 */
interface AllHitsRayResultCallback extends RayResultCallback {
	new (from: btVector3, to: btVector3): this;
	get_m_collisionObjects(): btConstCollisionObjectArray;
	set_m_collisionObjects(m_collisionObjects: btConstCollisionObjectArray): void;
	get_m_rayFromWorld(): btVector3;
	set_m_rayFromWorld(m_rayFromWorld: btVector3): void;
	get_m_rayToWorld(): btVector3;
	set_m_rayToWorld(m_rayToWorld: btVector3): void;
	get_m_hitNormalWorld(): btVector3Array;
	set_m_hitNormalWorld(m_hitNormalWorld: btVector3Array): void;
	get_m_hitPointWorld(): btVector3Array;
	set_m_hitPointWorld(m_hitPointWorld: btVector3Array): void;
	get_m_hitFractions(): btScalarArray;
	set_m_hitFractions(m_hitFractions: btScalarArray): void;
}
/**
 * Bt manifold point
 */
export interface btManifoldPoint {
	getPositionWorldOnA(): btVector3;
	getPositionWorldOnB(): btVector3;
	getAppliedImpulse(): number;
	getDistance(): number;
	get_m_localPointA(): btVector3;
	set_m_localPointA(m_localPointA: btVector3): void;
	get_m_localPointB(): btVector3;
	set_m_localPointB(m_localPointB: btVector3): void;
	get_m_positionWorldOnB(): btVector3;
	set_m_positionWorldOnB(m_positionWorldOnB: btVector3): void;
	get_m_positionWorldOnA(): btVector3;
	set_m_positionWorldOnA(m_positionWorldOnA: btVector3): void;
	get_m_normalWorldOnB(): btVector3;
	set_m_normalWorldOnB(m_normalWorldOnB: btVector3): void;
	get_m_userPersistentData(): any;
	set_m_userPersistentData(m_userPersistentData: any): void;
}
/**
 * Contact result callback
 */
interface ContactResultCallback {
	addSingleResult(
		cp: btManifoldPoint,
		colObj0Wrap: btCollisionObjectWrapper,
		partId0: number,
		index0: number,
		colObj1Wrap: btCollisionObjectWrapper,
		partId1: number,
		index1: number
	): number;
}
/**
 * Concrete contact result callback
 */
interface ConcreteContactResultCallback {
	new (): this;
	addSingleResult(
		cp: btManifoldPoint,
		colObj0Wrap: btCollisionObjectWrapper,
		partId0: number,
		index0: number,
		colObj1Wrap: btCollisionObjectWrapper,
		partId1: number,
		index1: number
	): number;
}
/**
 * Local shape info
 */
interface LocalShapeInfo {
	get_m_shapePart(): number;
	set_m_shapePart(m_shapePart: number): void;
	get_m_triangleIndex(): number;
	set_m_triangleIndex(m_triangleIndex: number): void;
}
/**
 * Local convex result
 */
interface LocalConvexResult {
	new (
		hitCollisionObject: btCollisionObject,
		localShapeInfo: LocalShapeInfo,
		hitNormalLocal: btVector3,
		hitPointLocal: btVector3,
		hitFraction: number
	): this;
	get_m_hitCollisionObject(): btCollisionObject;
	set_m_hitCollisionObject(m_hitCollisionObject: btCollisionObject): void;
	get_m_localShapeInfo(): LocalShapeInfo;
	set_m_localShapeInfo(m_localShapeInfo: LocalShapeInfo): void;
	get_m_hitNormalLocal(): btVector3;
	set_m_hitNormalLocal(m_hitNormalLocal: btVector3): void;
	get_m_hitPointLocal(): btVector3;
	set_m_hitPointLocal(m_hitPointLocal: btVector3): void;
	get_m_hitFraction(): number;
	set_m_hitFraction(m_hitFraction: number): void;
}
/**
 * Convex result callback
 */
interface ConvexResultCallback {
	hasHit(): boolean;
	get_m_collisionFilterGroup(): number;
	set_m_collisionFilterGroup(m_collisionFilterGroup: number): void;
	get_m_collisionFilterMask(): number;
	set_m_collisionFilterMask(m_collisionFilterMask: number): void;
	get_m_closestHitFraction(): number;
	set_m_closestHitFraction(m_closestHitFraction: number): void;
}
/**
 * Closest convex result callback
 */
interface ClosestConvexResultCallback extends ConvexResultCallback {
	new (convexFromWorld: btVector3, convexToWorld: btVector3): this;
	get_m_convexFromWorld(): btVector3;
	set_m_convexFromWorld(m_convexFromWorld: btVector3): void;
	get_m_convexToWorld(): btVector3;
	set_m_convexToWorld(m_convexToWorld: btVector3): void;
	get_m_hitNormalWorld(): btVector3;
	set_m_hitNormalWorld(m_hitNormalWorld: btVector3): void;
	get_m_hitPointWorld(): btVector3;
	set_m_hitPointWorld(m_hitPointWorld: btVector3): void;
}
/**
 * Bt collision shape
 */
export interface btCollisionShape {
	setLocalScaling(scaling: btVector3): void;
	getLocalScaling(): btVector3;
	calculateLocalInertia(mass: number, inertia: btVector3): void;
	setMargin(margin: number): void;
	getMargin(): number;
}
/**
 * Bt convex shape
 */
interface btConvexShape extends btCollisionShape {}
/**
 * Bt convex triangle mesh shape
 */
interface btConvexTriangleMeshShape extends btConvexShape {
	new (meshInterface: btStridingMeshInterface, calcAabb?: boolean): this;
}
/**
 * Bt box shape
 */
interface btBoxShape extends btCollisionShape {
	new (boxHalfExtents: btVector3): this;
	setMargin(margin: number): void;
	getMargin(): number;
}
/**
 * Bt capsule shape
 */
interface btCapsuleShape extends btCollisionShape {
	new (radius: number, height: number): this;
	setMargin(margin: number): void;
	getMargin(): number;
	getUpAxis(): number;
	getRadius(): number;
	getHalfHeight(): number;
}
/**
 * Bt capsule shape x
 */
interface btCapsuleShapeX extends btCapsuleShape {
	new (radius: number, height: number): this;
	setMargin(margin: number): void;
	getMargin(): number;
}
/**
 * Bt capsule shape z
 */
interface btCapsuleShapeZ extends btCapsuleShape {
	new (radius: number, height: number): this;
	setMargin(margin: number): void;
	getMargin(): number;
}
/**
 * Bt cylinder shape
 */
interface btCylinderShape extends btCollisionShape {
	new (halfExtents: btVector3): this;
	setMargin(margin: number): void;
	getMargin(): number;
}
/**
 * Bt cylinder shape x
 */
interface btCylinderShapeX extends btCylinderShape {
	new (halfExtents: btVector3): this;
	setMargin(margin: number): void;
	getMargin(): number;
}
/**
 * Bt cylinder shape z
 */
interface btCylinderShapeZ extends btCylinderShape {
	new (halfExtents: btVector3): this;
	setMargin(margin: number): void;
	getMargin(): number;
}
/**
 * Bt sphere shape
 */
interface btSphereShape extends btCollisionShape {
	new (radius: number): this;
	setMargin(margin: number): void;
	getMargin(): number;
}
/**
 * Bt multi sphere shape
 */
interface btMultiSphereShape extends btCollisionShape {
	new (
		positions: btVector3,
		radii: ReadonlyArray<number>,
		numPoints: number
	): this;
}
/**
 * Bt cone shape
 */
interface btConeShape extends btCollisionShape {
	new (radius: number, height: number): this;
}
/**
 * Bt cone shape x
 */
interface btConeShapeX extends btConeShape {
	new (radius: number, height: number): this;
}
/**
 * Bt cone shape z
 */
interface btConeShapeZ extends btConeShape {
	new (radius: number, height: number): this;
}
/**
 * Bt int array
 */
interface btIntArray {
	size(): number;
	at(n: number): number;
}
/**
 * Bt face
 */
interface btFace {
	get_m_indices(): btIntArray;
	set_m_indices(m_indices: btIntArray): void;
	get_m_plane(): ReadonlyArray<number>;
	set_m_plane(m_plane: ReadonlyArray<number>): void;
}
/**
 * Bt vector3 array
 */
interface btVector3Array {
	size(): number;
	at(n: number): btVector3;
}
/**
 * Bt face array
 */
interface btFaceArray {
	size(): number;
	at(n: number): btFace;
}
/**
 * Bt convex polyhedron
 */
interface btConvexPolyhedron {
	get_m_vertices(): btVector3Array;
	set_m_vertices(m_vertices: btVector3Array): void;
	get_m_faces(): btFaceArray;
	set_m_faces(m_faces: btFaceArray): void;
}
/**
 * Bt convex hull shape
 */
interface btConvexHullShape extends btCollisionShape {
	new (points?: ReadonlyArray<number>, numPoints?: number): this;
	addPoint(point: btVector3, recalculateLocalAABB?: boolean): void;
	setMargin(margin: number): void;
	getMargin(): number;
	getNumVertices(): number;
	initializePolyhedralFeatures(shiftVerticesByMargin: number): boolean;
	recalcLocalAabb(): void;
	getConvexPolyhedron(): btConvexPolyhedron;
}
/**
 * Bt shape hull
 */
interface btShapeHull {
	new (shape: btConvexShape): this;
	buildHull(margin: number): boolean;
	numVertices(): number;
	getVertexPointer(): btVector3;
}
/**
 * Bt compound shape
 */
interface btCompoundShape extends btCollisionShape {
	new (enableDynamicAabbTree?: boolean): this;
	addChildShape(localTransform: btTransform, shape: btCollisionShape): void;
	removeChildShape(shape: btCollisionShape): void;
	removeChildShapeByIndex(childShapeindex: number): void;
	getNumChildShapes(): number;
	getChildShape(index: number): btCollisionShape;
	updateChildTransform(
		childIndex: number,
		newChildTransform: btTransform,
		shouldRecalculateLocalAabb?: boolean
	): void;
	setMargin(margin: number): void;
	getMargin(): number;
}
/**
 * Bt striding mesh interface
 */
export interface btStridingMeshInterface {
	setScaling(scaling: btVector3): void;
}
/**
 * Bt indexed mesh
 */
interface btIndexedMesh {
	get_m_numTriangles(): number;
	set_m_numTriangles(m_numTriangles: number): void;
}
/**
 * Bt indexed mesh array
 */
interface btIndexedMeshArray {
	size(): number;
	at(n: number): btIndexedMesh;
}
/**
 * Bt triangle mesh
 */
interface btTriangleMesh extends btStridingMeshInterface {
	new (use32bitIndices?: boolean, use4componentVertices?: boolean): this;
	addTriangle(
		vertex0: btVector3,
		vertex1: btVector3,
		vertex2: btVector3,
		removeDuplicateVertices?: boolean
	): void;
	findOrAddVertex(vertex: btVector3, removeDuplicateVertices: boolean): number;
	addIndex(index: number): void;
	getIndexedMeshArray(): btIndexedMeshArray;
}
export type PHY_ScalarType =
	| 'PHY_FLOAT'
	| 'PHY_DOUBLE'
	| 'PHY_INTEGER'
	| 'PHY_SHORT'
	| 'PHY_FIXEDPOINT88'
	| 'PHY_UCHAR';
/**
 * Bt concave shape
 */
interface btConcaveShape extends btCollisionShape {}
/**
 * Bt empty shape
 */
interface btEmptyShape extends btConcaveShape {
	new (): this;
}
/**
 * Bt static plane shape
 */
interface btStaticPlaneShape extends btConcaveShape {
	new (planeNormal: btVector3, planeConstant: number): this;
}
/**
 * Bt triangle mesh shape
 */
interface btTriangleMeshShape extends btConcaveShape {}
/**
 * Bt bvh triangle mesh shape
 */
interface btBvhTriangleMeshShape extends btTriangleMeshShape {
	new (
		meshInterface: btStridingMeshInterface,
		useQuantizedAabbCompression: boolean,
		buildBvh?: boolean
	): this;
}
/**
 * Bt heightfield terrain shape
 */
interface btHeightfieldTerrainShape extends btConcaveShape {
	new (
		heightStickWidth: number,
		heightStickLength: number,
		heightfieldData: unknown,
		heightScale: number,
		minHeight: number,
		maxHeight: number,
		upAxis: number,
		hdt: PHY_ScalarType,
		flipQuadEdges: boolean
	): this;
	setMargin(margin: number): void;
	getMargin(): number;
}
/**
 * Bt default collision construction info
 */
interface btDefaultCollisionConstructionInfo {
	new (): this;
}
/**
 * Bt default collision configuration
 */
interface btDefaultCollisionConfiguration {
	new (info?: btDefaultCollisionConstructionInfo): this;
}
/**
 * Bt persistent manifold
 */
interface btPersistentManifold {
	new (): this;
	getBody0(): btCollisionObject;
	getBody1(): btCollisionObject;
	getNumContacts(): number;
	getContactPoint(index: number): btManifoldPoint;
}
/**
 * Bt dispatcher
 */
interface btDispatcher {
	getNumManifolds(): number;
	getManifoldByIndexInternal(index: number): btPersistentManifold;
}
/**
 * Bt collision dispatcher
 */
export interface btCollisionDispatcher extends btDispatcher {
	new (conf: btDefaultCollisionConfiguration): this;
}
/**
 * Bt overlapping pair callback
 */
interface btOverlappingPairCallback {}
/**
 * Bt overlapping pair cache
 */
interface btOverlappingPairCache {
	setInternalGhostPairCallback(
		ghostPairCallback: btOverlappingPairCallback
	): void;
	getNumOverlappingPairs(): number;
}
/**
 * Bt axis sweep3
 */
interface btAxisSweep3 {
	new (
		worldAabbMin: btVector3,
		worldAabbMax: btVector3,
		maxHandles?: number,
		pairCache?: btOverlappingPairCache,
		disableRaycastAccelerator?: boolean
	): this;
}
/**
 * Bt broadphase interface
 */
interface btBroadphaseInterface {
	getOverlappingPairCache(): btOverlappingPairCache;
}
/**
 * Bt collision configuration
 */
interface btCollisionConfiguration {}
/**
 * Bt dbvt broadphase
 */
interface btDbvtBroadphase extends btBroadphaseInterface {
	new (): this;
}
/**
 * Bt broadphase proxy
 */
interface btBroadphaseProxy {
	get_m_collisionFilterGroup(): number;
	set_m_collisionFilterGroup(m_collisionFilterGroup: number): void;
	get_m_collisionFilterMask(): number;
	set_m_collisionFilterMask(m_collisionFilterMask: number): void;
}
/**
 * Bt rigid body construction info
 */
interface btRigidBodyConstructionInfo {
	new (
		mass: number,
		motionState: btMotionState,
		collisionShape: btCollisionShape,
		localInertia?: btVector3
	): this;
	get_m_linearDamping(): number;
	set_m_linearDamping(m_linearDamping: number): void;
	get_m_angularDamping(): number;
	set_m_angularDamping(m_angularDamping: number): void;
	get_m_friction(): number;
	set_m_friction(m_friction: number): void;
	get_m_rollingFriction(): number;
	set_m_rollingFriction(m_rollingFriction: number): void;
	get_m_restitution(): number;
	set_m_restitution(m_restitution: number): void;
	get_m_linearSleepingThreshold(): number;
	set_m_linearSleepingThreshold(m_linearSleepingThreshold: number): void;
	get_m_angularSleepingThreshold(): number;
	set_m_angularSleepingThreshold(m_angularSleepingThreshold: number): void;
	get_m_additionalDamping(): boolean;
	set_m_additionalDamping(m_additionalDamping: boolean): void;
	get_m_additionalDampingFactor(): number;
	set_m_additionalDampingFactor(m_additionalDampingFactor: number): void;
	get_m_additionalLinearDampingThresholdSqr(): number;
	set_m_additionalLinearDampingThresholdSqr(
		m_additionalLinearDampingThresholdSqr: number
	): void;
	get_m_additionalAngularDampingThresholdSqr(): number;
	set_m_additionalAngularDampingThresholdSqr(
		m_additionalAngularDampingThresholdSqr: number
	): void;
	get_m_additionalAngularDampingFactor(): number;
	set_m_additionalAngularDampingFactor(
		m_additionalAngularDampingFactor: number
	): void;
}
/**
 * Bt rigid body
 */
export interface btRigidBody extends btCollisionObject {
	new (constructionInfo: btRigidBodyConstructionInfo): this;
	getCenterOfMassTransform(): btTransform;
	setCenterOfMassTransform(xform: btTransform): void;
	setSleepingThresholds(linear: number, angular: number): void;
	getLinearDamping(): number;
	getAngularDamping(): number;
	setDamping(lin_damping: number, ang_damping: number): void;
	setMassProps(mass: number, inertia: btVector3): void;
	getLinearFactor(): btVector3;
	setLinearFactor(linearFactor: btVector3): void;
	applyTorque(torque: btVector3): void;
	applyLocalTorque(torque: btVector3): void;
	applyForce(force: btVector3, rel_pos: btVector3): void;
	applyCentralForce(force: btVector3): void;
	applyCentralLocalForce(force: btVector3): void;
	applyTorqueImpulse(torque: btVector3): void;
	applyImpulse(impulse: btVector3, rel_pos: btVector3): void;
	applyCentralImpulse(impulse: btVector3): void;
	updateInertiaTensor(): void;
	getLinearVelocity(): btVector3;
	getAngularVelocity(): btVector3;
	setLinearVelocity(lin_vel: btVector3): void;
	setAngularVelocity(ang_vel: btVector3): void;
	getMotionState(): btMotionState;
	setMotionState(motionState: btMotionState): void;
	getAngularFactor(): btVector3;
	setAngularFactor(angularFactor: btVector3): void;
	upcast(colObj: btCollisionObject): btRigidBody;
	getAabb(aabbMin: btVector3, aabbMax: btVector3): void;
	applyGravity(): void;
	getGravity(): btVector3;
	setGravity(acceleration: btVector3): void;
	getBroadphaseProxy(): btBroadphaseProxy;
	clearForces(): void;
}
/**
 * Bt constraint setting
 */
interface btConstraintSetting {
	new (): this;
	get_m_tau(): number;
	set_m_tau(m_tau: number): void;
	get_m_damping(): number;
	set_m_damping(m_damping: number): void;
	get_m_impulseClamp(): number;
	set_m_impulseClamp(m_impulseClamp: number): void;
}
/**
 * Bt typed constraint
 */
export interface btTypedConstraint {
	enableFeedback(needsFeedback: boolean): void;
	getBreakingImpulseThreshold(): number;
	setBreakingImpulseThreshold(threshold: number): void;
	getParam(num: number, axis: number): number;
	setParam(num: number, value: number, axis: number): void;
}
type btConstraintParams =
	| 'BT_CONSTRAINT_ERP'
	| 'BT_CONSTRAINT_STOP_ERP'
	| 'BT_CONSTRAINT_CFM'
	| 'BT_CONSTRAINT_STOP_CFM';
/**
 * Bt point2 point constraint
 */
interface btPoint2PointConstraint extends btTypedConstraint {
	new (
		rbA: btRigidBody,
		rbB: btRigidBody,
		pivotInA: btVector3,
		pivotInB: btVector3
	): this;
	new (rbA: btRigidBody, pivotInA: btVector3): this;
	setPivotA(pivotA: btVector3): void;
	setPivotB(pivotB: btVector3): void;
	getPivotInA(): btVector3;
	getPivotInB(): btVector3;
	get_m_setting(): btConstraintSetting;
	set_m_setting(m_setting: btConstraintSetting): void;
}
/**
 * Bt generic6 dof constraint
 */
interface btGeneric6DofConstraint extends btTypedConstraint {
	new (
		rbA: btRigidBody,
		rbB: btRigidBody,
		frameInA: btTransform,
		frameInB: btTransform,
		useLinearFrameReferenceFrameA: boolean
	): this;
	new (
		rbB: btRigidBody,
		frameInB: btTransform,
		useLinearFrameReferenceFrameB: boolean
	): this;
	setLinearLowerLimit(linearLower: btVector3): void;
	setLinearUpperLimit(linearUpper: btVector3): void;
	setAngularLowerLimit(angularLower: btVector3): void;
	setAngularUpperLimit(angularUpper: btVector3): void;
	getFrameOffsetA(): btTransform;
}
/**
 * Bt generic6 dof spring constraint
 */
interface btGeneric6DofSpringConstraint extends btGeneric6DofConstraint {
	new (
		rbA: btRigidBody,
		rbB: btRigidBody,
		frameInA: btTransform,
		frameInB: btTransform,
		useLinearFrameReferenceFrameA: boolean
	): this;
	new (
		rbB: btRigidBody,
		frameInB: btTransform,
		useLinearFrameReferenceFrameB: boolean
	): this;
	enableSpring(index: number, onOff: boolean): void;
	setStiffness(index: number, stiffness: number): void;
	setDamping(index: number, damping: number): void;
	setEquilibriumPoint(index: number, val: number): void;
	setEquilibriumPoint(index: number): void;
	setEquilibriumPoint(): void;
}
/**
 * Bt sequential impulse constraint solver
 */
interface btSequentialImpulseConstraintSolver {
	new (): this;
}
/**
 * Bt cone twist constraint
 */
interface btConeTwistConstraint extends btTypedConstraint {
	new (
		rbA: btRigidBody,
		rbB: btRigidBody,
		rbAFrame: btTransform,
		rbBFrame: btTransform
	): this;
	new (rbA: btRigidBody, rbAFrame: btTransform): this;
	setLimit(limitIndex: number, limitValue: number): void;
	setAngularOnly(angularOnly: boolean): void;
	setDamping(damping: number): void;
	enableMotor(b: boolean): void;
	setMaxMotorImpulse(maxMotorImpulse: number): void;
	setMaxMotorImpulseNormalized(maxMotorImpulse: number): void;
	setMotorTarget(q: btQuaternion): void;
	setMotorTargetInConstraintSpace(q: btQuaternion): void;
}
/**
 * Bt hinge constraint
 */
interface btHingeConstraint extends btTypedConstraint {
	new (
		rbA: btRigidBody,
		rbB: btRigidBody,
		pivotInA: btVector3,
		pivotInB: btVector3,
		axisInA: btVector3,
		axisInB: btVector3,
		useReferenceFrameA?: boolean
	): this;
	new (
		rbA: btRigidBody,
		rbB: btRigidBody,
		rbAFrame: btTransform,
		rbBFrame: btTransform,
		useReferenceFrameA?: boolean
	): this;
	new (
		rbA: btRigidBody,
		rbAFrame: btTransform,
		useReferenceFrameA?: boolean
	): this;
	setLimit(
		low: number,
		high: number,
		softness: number,
		biasFactor: number,
		relaxationFactor?: number
	): void;
	enableAngularMotor(
		enableMotor: boolean,
		targetVelocity: number,
		maxMotorImpulse: number
	): void;
	setAngularOnly(angularOnly: boolean): void;
	enableMotor(enableMotor: boolean): void;
	setMaxMotorImpulse(maxMotorImpulse: number): void;
	setMotorTarget(targetAngle: number, dt: number): void;
}
/**
 * Bt slider constraint
 */
interface btSliderConstraint extends btTypedConstraint {
	new (
		rbA: btRigidBody,
		rbB: btRigidBody,
		frameInA: btTransform,
		frameInB: btTransform,
		useLinearReferenceFrameA: boolean
	): this;
	new (
		rbB: btRigidBody,
		frameInB: btTransform,
		useLinearReferenceFrameA: boolean
	): this;
	setLowerLinLimit(lowerLimit: number): void;
	setUpperLinLimit(upperLimit: number): void;
	setLowerAngLimit(lowerAngLimit: number): void;
	setUpperAngLimit(upperAngLimit: number): void;
}
/**
 * Bt fixed constraint
 */
interface btFixedConstraint extends btTypedConstraint {
	new (
		rbA: btRigidBody,
		rbB: btRigidBody,
		frameInA: btTransform,
		frameInB: btTransform
	): this;
}
/**
 * Bt constraint solver
 */
interface btConstraintSolver {}
/**
 * Bt dispatcher info
 */
interface btDispatcherInfo {
	get_m_timeStep(): number;
	set_m_timeStep(m_timeStep: number): void;
	get_m_stepCount(): number;
	set_m_stepCount(m_stepCount: number): void;
	get_m_dispatchFunc(): number;
	set_m_dispatchFunc(m_dispatchFunc: number): void;
	get_m_timeOfImpact(): number;
	set_m_timeOfImpact(m_timeOfImpact: number): void;
	get_m_useContinuous(): boolean;
	set_m_useContinuous(m_useContinuous: boolean): void;
	get_m_enableSatConvex(): boolean;
	set_m_enableSatConvex(m_enableSatConvex: boolean): void;
	get_m_enableSPU(): boolean;
	set_m_enableSPU(m_enableSPU: boolean): void;
	get_m_useEpa(): boolean;
	set_m_useEpa(m_useEpa: boolean): void;
	get_m_allowedCcdPenetration(): number;
	set_m_allowedCcdPenetration(m_allowedCcdPenetration: number): void;
	get_m_useConvexConservativeDistanceUtil(): boolean;
	set_m_useConvexConservativeDistanceUtil(
		m_useConvexConservativeDistanceUtil: boolean
	): void;
	get_m_convexConservativeDistanceThreshold(): number;
	set_m_convexConservativeDistanceThreshold(
		m_convexConservativeDistanceThreshold: number
	): void;
}
/**
 * Bt collision world
 */
interface btCollisionWorld {
	getDispatcher(): btDispatcher;
	rayTest(
		rayFromWorld: btVector3,
		rayToWorld: btVector3,
		resultCallback: RayResultCallback
	): void;
	getPairCache(): btOverlappingPairCache;
	getDispatchInfo(): btDispatcherInfo;
	addCollisionObject(
		collisionObject: btCollisionObject,
		collisionFilterGroup?: number,
		collisionFilterMask?: number
	): void;
	removeCollisionObject(collisionObject: btCollisionObject): void;
	getBroadphase(): btBroadphaseInterface;
	convexSweepTest(
		castShape: btConvexShape,
		from: btTransform,
		to: btTransform,
		resultCallback: ConvexResultCallback,
		allowedCcdPenetration: number
	): void;
	contactPairTest(
		colObjA: btCollisionObject,
		colObjB: btCollisionObject,
		resultCallback: ContactResultCallback
	): void;
	contactTest(
		colObj: btCollisionObject,
		resultCallback: ContactResultCallback
	): void;
	updateSingleAabb(colObj: btCollisionObject): void;
	setDebugDrawer(debugDrawer: btIDebugDraw): void;
	getDebugDrawer(): btIDebugDraw;
	debugDrawWorld(): void;
	debugDrawObject(
		worldTransform: btTransform,
		shape: btCollisionShape,
		color: btVector3
	): void;
}
/**
 * Bt contact solver info
 */
interface btContactSolverInfo {
	get_m_splitImpulse(): boolean;
	set_m_splitImpulse(m_splitImpulse: boolean): void;
	get_m_splitImpulsePenetrationThreshold(): number;
	set_m_splitImpulsePenetrationThreshold(
		m_splitImpulsePenetrationThreshold: number
	): void;
	get_m_numIterations(): number;
	set_m_numIterations(m_numIterations: number): void;
}
type btInternalTickCallback = (
	world: btDynamicsWorld,
	timeStep: number
) => void;
/**
 * Bt dynamics world
 */
interface btDynamicsWorld extends btCollisionWorld {
	addAction(action: btActionInterface): void;
	removeAction(action: btActionInterface): void;
	getSolverInfo(): btContactSolverInfo;
	setInternalTickCallback(
		cb: btInternalTickCallback,
		worldUserInfo?: unknown,
		isPreTick?: boolean
	): void;
}
/**
 * Bt discrete dynamics world
 */
interface btDiscreteDynamicsWorld extends btDynamicsWorld {
	new (
		dispatcher: btDispatcher,
		pairCache: btBroadphaseInterface,
		constraintSolver: btConstraintSolver,
		collisionConfiguration: btCollisionConfiguration
	): this;
	setGravity(gravity: btVector3): void;
	getGravity(): btVector3;
	addRigidBody(body: btRigidBody): void;
	addRigidBody(body: btRigidBody, group: number, mask: number): void;
	removeRigidBody(body: btRigidBody): void;
	addConstraint(
		constraint: btTypedConstraint,
		disableCollisionsBetweenLinkedBodies?: boolean
	): void;
	removeConstraint(constraint: btTypedConstraint): void;
	stepSimulation(
		timeStep: number,
		maxSubSteps?: number,
		fixedTimeStep?: number
	): number;
	setContactAddedCallback(funcpointer: number): void;
	setContactProcessedCallback(funcpointer: number): void;
	setContactDestroyedCallback(funcpointer: number): void;
}
/**
 * Bt vehicle tuning
 */
interface btVehicleTuning {
	new (): this;
	get_m_suspensionStiffness(): number;
	set_m_suspensionStiffness(m_suspensionStiffness: number): void;
	get_m_suspensionCompression(): number;
	set_m_suspensionCompression(m_suspensionCompression: number): void;
	get_m_suspensionDamping(): number;
	set_m_suspensionDamping(m_suspensionDamping: number): void;
	get_m_maxSuspensionTravelCm(): number;
	set_m_maxSuspensionTravelCm(m_maxSuspensionTravelCm: number): void;
	get_m_frictionSlip(): number;
	set_m_frictionSlip(m_frictionSlip: number): void;
	get_m_maxSuspensionForce(): number;
	set_m_maxSuspensionForce(m_maxSuspensionForce: number): void;
}
/**
 * Bt vehicle raycaster result
 */
interface btVehicleRaycasterResult {
	get_m_hitPointInWorld(): btVector3;
	set_m_hitPointInWorld(m_hitPointInWorld: btVector3): void;
	get_m_hitNormalInWorld(): btVector3;
	set_m_hitNormalInWorld(m_hitNormalInWorld: btVector3): void;
	get_m_distFraction(): number;
	set_m_distFraction(m_distFraction: number): void;
}
/**
 * Bt vehicle raycaster
 */
interface btVehicleRaycaster {
	castRay(
		from: btVector3,
		to: btVector3,
		result: btVehicleRaycasterResult
	): void;
}
/**
 * Bt default vehicle raycaster
 */
interface btDefaultVehicleRaycaster extends btVehicleRaycaster {
	new (world: btDynamicsWorld): this;
}
/**
 * Raycast info
 */
interface RaycastInfo {
	get_m_contactNormalWS(): btVector3;
	set_m_contactNormalWS(m_contactNormalWS: btVector3): void;
	get_m_contactPointWS(): btVector3;
	set_m_contactPointWS(m_contactPointWS: btVector3): void;
	get_m_suspensionLength(): number;
	set_m_suspensionLength(m_suspensionLength: number): void;
	get_m_hardPointWS(): btVector3;
	set_m_hardPointWS(m_hardPointWS: btVector3): void;
	get_m_wheelDirectionWS(): btVector3;
	set_m_wheelDirectionWS(m_wheelDirectionWS: btVector3): void;
	get_m_wheelAxleWS(): btVector3;
	set_m_wheelAxleWS(m_wheelAxleWS: btVector3): void;
	get_m_isInContact(): boolean;
	set_m_isInContact(m_isInContact: boolean): void;
	get_m_groundObject(): any;
	set_m_groundObject(m_groundObject: any): void;
}
/**
 * Bt wheel info construction info
 */
interface btWheelInfoConstructionInfo {
	get_m_chassisConnectionCS(): btVector3;
	set_m_chassisConnectionCS(m_chassisConnectionCS: btVector3): void;
	get_m_wheelDirectionCS(): btVector3;
	set_m_wheelDirectionCS(m_wheelDirectionCS: btVector3): void;
	get_m_wheelAxleCS(): btVector3;
	set_m_wheelAxleCS(m_wheelAxleCS: btVector3): void;
	get_m_suspensionRestLength(): number;
	set_m_suspensionRestLength(m_suspensionRestLength: number): void;
	get_m_maxSuspensionTravelCm(): number;
	set_m_maxSuspensionTravelCm(m_maxSuspensionTravelCm: number): void;
	get_m_wheelRadius(): number;
	set_m_wheelRadius(m_wheelRadius: number): void;
	get_m_suspensionStiffness(): number;
	set_m_suspensionStiffness(m_suspensionStiffness: number): void;
	get_m_wheelsDampingCompression(): number;
	set_m_wheelsDampingCompression(m_wheelsDampingCompression: number): void;
	get_m_wheelsDampingRelaxation(): number;
	set_m_wheelsDampingRelaxation(m_wheelsDampingRelaxation: number): void;
	get_m_frictionSlip(): number;
	set_m_frictionSlip(m_frictionSlip: number): void;
	get_m_maxSuspensionForce(): number;
	set_m_maxSuspensionForce(m_maxSuspensionForce: number): void;
	get_m_bIsFrontWheel(): boolean;
	set_m_bIsFrontWheel(m_bIsFrontWheel: boolean): void;
}
/**
 * Bt wheel info
 */
interface btWheelInfo {
	get_m_suspensionStiffness(): number;
	set_m_suspensionStiffness(m_suspensionStiffness: number): void;
	get_m_frictionSlip(): number;
	set_m_frictionSlip(m_frictionSlip: number): void;
	get_m_engineForce(): number;
	set_m_engineForce(m_engineForce: number): void;
	get_m_rollInfluence(): number;
	set_m_rollInfluence(m_rollInfluence: number): void;
	get_m_suspensionRestLength1(): number;
	set_m_suspensionRestLength1(m_suspensionRestLength1: number): void;
	get_m_wheelsRadius(): number;
	set_m_wheelsRadius(m_wheelsRadius: number): void;
	get_m_wheelsDampingCompression(): number;
	set_m_wheelsDampingCompression(m_wheelsDampingCompression: number): void;
	get_m_wheelsDampingRelaxation(): number;
	set_m_wheelsDampingRelaxation(m_wheelsDampingRelaxation: number): void;
	get_m_steering(): number;
	set_m_steering(m_steering: number): void;
	get_m_maxSuspensionForce(): number;
	set_m_maxSuspensionForce(m_maxSuspensionForce: number): void;
	get_m_maxSuspensionTravelCm(): number;
	set_m_maxSuspensionTravelCm(m_maxSuspensionTravelCm: number): void;
	get_m_wheelsSuspensionForce(): number;
	set_m_wheelsSuspensionForce(m_wheelsSuspensionForce: number): void;
	get_m_bIsFrontWheel(): boolean;
	set_m_bIsFrontWheel(m_bIsFrontWheel: boolean): void;
	get_m_raycastInfo(): RaycastInfo;
	set_m_raycastInfo(m_raycastInfo: RaycastInfo): void;
	get_m_chassisConnectionPointCS(): btVector3;
	set_m_chassisConnectionPointCS(m_chassisConnectionPointCS: btVector3): void;
	new (ci: btWheelInfoConstructionInfo): this;
	getSuspensionRestLength(): number;
	updateWheel(chassis: btRigidBody, raycastInfo: RaycastInfo): void;
	get_m_worldTransform(): btTransform;
	set_m_worldTransform(m_worldTransform: btTransform): void;
	get_m_wheelDirectionCS(): btVector3;
	set_m_wheelDirectionCS(m_wheelDirectionCS: btVector3): void;
	get_m_wheelAxleCS(): btVector3;
	set_m_wheelAxleCS(m_wheelAxleCS: btVector3): void;
	get_m_rotation(): number;
	set_m_rotation(m_rotation: number): void;
	get_m_deltaRotation(): number;
	set_m_deltaRotation(m_deltaRotation: number): void;
	get_m_brake(): number;
	set_m_brake(m_brake: number): void;
	get_m_clippedInvContactDotSuspension(): number;
	set_m_clippedInvContactDotSuspension(
		m_clippedInvContactDotSuspension: number
	): void;
	get_m_suspensionRelativeVelocity(): number;
	set_m_suspensionRelativeVelocity(m_suspensionRelativeVelocity: number): void;
	get_m_skidInfo(): number;
	set_m_skidInfo(m_skidInfo: number): void;
}
/**
 * Bt action interface
 */
interface btActionInterface {
	updateAction(collisionWorld: btCollisionWorld, deltaTimeStep: number): void;
}
/**
 * Bt kinematic character controller
 */
interface btKinematicCharacterController extends btActionInterface {
	new (
		ghostObject: btPairCachingGhostObject,
		convexShape: btConvexShape,
		stepHeight: number,
		upAxis?: number
	): this;
	setUpAxis(axis: number): void;
	setWalkDirection(walkDirection: btVector3): void;
	setVelocityForTimeInterval(velocity: btVector3, timeInterval: number): void;
	warp(origin: btVector3): void;
	preStep(collisionWorld: btCollisionWorld): void;
	playerStep(collisionWorld: btCollisionWorld, dt: number): void;
	setFallSpeed(fallSpeed: number): void;
	setJumpSpeed(jumpSpeed: number): void;
	setMaxJumpHeight(maxJumpHeight: number): void;
	canJump(): boolean;
	jump(): void;
	setGravity(gravity: number): void;
	getGravity(): number;
	setMaxSlope(slopeRadians: number): void;
	getMaxSlope(): number;
	getGhostObject(): btPairCachingGhostObject;
	setUseGhostSweepTest(useGhostObjectSweepTest: boolean): void;
	onGround(): boolean;
	setUpInterpolate(value: boolean): void;
}
/**
 * Bt raycast vehicle
 */
interface btRaycastVehicle extends btActionInterface {
	new (
		tuning: btVehicleTuning,
		chassis: btRigidBody,
		raycaster: btVehicleRaycaster
	): this;
	applyEngineForce(force: number, wheel: number): void;
	setSteeringValue(steering: number, wheel: number): void;
	getWheelTransformWS(wheelIndex: number): btTransform;
	updateWheelTransform(
		wheelIndex: number,
		interpolatedTransform: boolean
	): void;
	addWheel(
		connectionPointCS0: btVector3,
		wheelDirectionCS0: btVector3,
		wheelAxleCS: btVector3,
		suspensionRestLength: number,
		wheelRadius: number,
		tuning: btVehicleTuning,
		isFrontWheel: boolean
	): btWheelInfo;
	getNumWheels(): number;
	getRigidBody(): btRigidBody;
	getWheelInfo(index: number): btWheelInfo;
	setBrake(brake: number, wheelIndex: number): void;
	setCoordinateSystem(
		rightIndex: number,
		upIndex: number,
		forwardIndex: number
	): void;
	getCurrentSpeedKmHour(): number;
	getChassisWorldTransform(): btTransform;
	rayCast(wheel: btWheelInfo): number;
	updateVehicle(step: number): void;
	resetSuspension(): void;
	getSteeringValue(wheel: number): number;
	updateWheelTransformsWS(
		wheel: btWheelInfo,
		interpolatedTransform?: boolean
	): void;
	setPitchControl(pitch: number): void;
	updateSuspension(deltaTime: number): void;
	updateFriction(timeStep: number): void;
	getRightAxis(): number;
	getUpAxis(): number;
	getForwardAxis(): number;
	getForwardVector(): btVector3;
	getUserConstraintType(): number;
	setUserConstraintType(userConstraintType: number): void;
	setUserConstraintId(uid: number): void;
	getUserConstraintId(): number;
}
/**
 * Bt ghost object
 */
interface btGhostObject extends btCollisionObject {
	new (): this;
	getNumOverlappingObjects(): number;
	getOverlappingObject(index: number): btCollisionObject;
}
/**
 * Bt pair caching ghost object
 */
interface btPairCachingGhostObject extends btGhostObject {
	new (): this;
}
/**
 * Bt ghost pair callback
 */
interface btGhostPairCallback {
	new (): this;
}
/**
 * Bt soft body world info
 */
export interface btSoftBodyWorldInfo {
	new (): this;
	get_air_density(): number;
	set_air_density(air_density: number): void;
	get_water_density(): number;
	set_water_density(water_density: number): void;
	get_water_offset(): number;
	set_water_offset(water_offset: number): void;
	get_m_maxDisplacement(): number;
	set_m_maxDisplacement(m_maxDisplacement: number): void;
	get_water_normal(): btVector3;
	set_water_normal(water_normal: btVector3): void;
	get_m_broadphase(): btBroadphaseInterface;
	set_m_broadphase(m_broadphase: btBroadphaseInterface): void;
	get_m_dispatcher(): btDispatcher;
	set_m_dispatcher(m_dispatcher: btDispatcher): void;
	get_m_gravity(): btVector3;
	set_m_gravity(m_gravity: btVector3): void;
}
/**
 * Face
 */
interface Face {
	get_m_n(): ReadonlyArray<Node>;
	set_m_n(m_n: ReadonlyArray<Node>): void;
	get_m_normal(): btVector3;
	set_m_normal(m_normal: btVector3): void;
	get_m_ra(): number;
	set_m_ra(m_ra: number): void;
}
/**
 * T face array
 */
interface tFaceArray {
	size(): number;
	at(n: number): Face;
}
/**
 * Node
 */
interface Node {
	get_m_x(): btVector3;
	set_m_x(m_x: btVector3): void;
	get_m_q(): btVector3;
	set_m_q(m_q: btVector3): void;
	get_m_v(): btVector3;
	set_m_v(m_v: btVector3): void;
	get_m_f(): btVector3;
	set_m_f(m_f: btVector3): void;
	get_m_n(): btVector3;
	set_m_n(m_n: btVector3): void;
	get_m_im(): number;
	set_m_im(m_im: number): void;
	get_m_area(): number;
	set_m_area(m_area: number): void;
}
/**
 * T node array
 */
interface tNodeArray {
	size(): number;
	at(n: number): Node;
}
/**
 * Material
 */
interface Material {
	get_m_kLST(): number;
	set_m_kLST(m_kLST: number): void;
	get_m_kAST(): number;
	set_m_kAST(m_kAST: number): void;
	get_m_kVST(): number;
	set_m_kVST(m_kVST: number): void;
	get_m_flags(): number;
	set_m_flags(m_flags: number): void;
}
/**
 * T material array
 */
interface tMaterialArray {
	size(): number;
	at(n: number): Material;
}
/**
 * Anchor
 */
interface Anchor {
	get_m_node(): Node;
	set_m_node(m_node: Node): void;
	get_m_local(): btVector3;
	set_m_local(m_local: btVector3): void;
	get_m_body(): btRigidBody;
	set_m_body(m_body: btRigidBody): void;
	get_m_influence(): number;
	set_m_influence(m_influence: number): void;
	get_m_c0(): btMatrix3x3;
	set_m_c0(m_c0: btMatrix3x3): void;
	get_m_c1(): btVector3;
	set_m_c1(m_c1: btVector3): void;
	get_m_c2(): number;
	set_m_c2(m_c2: number): void;
}
/**
 * T anchor array
 */
interface tAnchorArray {
	size(): number;
	at(n: number): Anchor;
	clear(): void;
	push_back(val: Anchor): void;
	pop_back(): void;
}
/**
 * Config
 */
interface Config {
	get_kVCF(): number;
	set_kVCF(kVCF: number): void;
	get_kDP(): number;
	set_kDP(kDP: number): void;
	get_kDG(): number;
	set_kDG(kDG: number): void;
	get_kLF(): number;
	set_kLF(kLF: number): void;
	get_kPR(): number;
	set_kPR(kPR: number): void;
	get_kVC(): number;
	set_kVC(kVC: number): void;
	get_kDF(): number;
	set_kDF(kDF: number): void;
	get_kMT(): number;
	set_kMT(kMT: number): void;
	get_kCHR(): number;
	set_kCHR(kCHR: number): void;
	get_kKHR(): number;
	set_kKHR(kKHR: number): void;
	get_kSHR(): number;
	set_kSHR(kSHR: number): void;
	get_kAHR(): number;
	set_kAHR(kAHR: number): void;
	get_kSRHR_CL(): number;
	set_kSRHR_CL(kSRHR_CL: number): void;
	get_kSKHR_CL(): number;
	set_kSKHR_CL(kSKHR_CL: number): void;
	get_kSSHR_CL(): number;
	set_kSSHR_CL(kSSHR_CL: number): void;
	get_kSR_SPLT_CL(): number;
	set_kSR_SPLT_CL(kSR_SPLT_CL: number): void;
	get_kSK_SPLT_CL(): number;
	set_kSK_SPLT_CL(kSK_SPLT_CL: number): void;
	get_kSS_SPLT_CL(): number;
	set_kSS_SPLT_CL(kSS_SPLT_CL: number): void;
	get_maxvolume(): number;
	set_maxvolume(maxvolume: number): void;
	get_timescale(): number;
	set_timescale(timescale: number): void;
	get_viterations(): number;
	set_viterations(viterations: number): void;
	get_piterations(): number;
	set_piterations(piterations: number): void;
	get_diterations(): number;
	set_diterations(diterations: number): void;
	get_citerations(): number;
	set_citerations(citerations: number): void;
	get_collisions(): number;
	set_collisions(collisions: number): void;
}
/**
 * Bt soft body
 */
export interface btSoftBody extends btCollisionObject {
	new (
		worldInfo: btSoftBodyWorldInfo,
		node_count: number,
		x: btVector3,
		m: ReadonlyArray<number>
	): this;
	get_m_cfg(): Config;
	set_m_cfg(m_cfg: Config): void;
	get_m_nodes(): tNodeArray;
	set_m_nodes(m_nodes: tNodeArray): void;
	get_m_faces(): tFaceArray;
	set_m_faces(m_faces: tFaceArray): void;
	get_m_materials(): tMaterialArray;
	set_m_materials(m_materials: tMaterialArray): void;
	get_m_anchors(): tAnchorArray;
	set_m_anchors(m_anchors: tAnchorArray): void;
	checkLink(node0: number, node1: number): boolean;
	checkFace(node0: number, node1: number, node2: number): boolean;
	appendMaterial(): Material;
	appendNode(x: btVector3, m: number): void;
	appendLink(
		node0: number,
		node1: number,
		mat: Material,
		bcheckexist: boolean
	): void;
	appendFace(node0: number, node1: number, node2: number, mat: Material): void;
	appendTetra(
		node0: number,
		node1: number,
		node2: number,
		node3: number,
		mat: Material
	): void;
	appendAnchor(
		node: number,
		body: btRigidBody,
		disableCollisionBetweenLinkedBodies: boolean,
		influence: number
	): void;
	addForce(force: btVector3): void;
	addForce(force: btVector3, node: number): void;
	addAeroForceToNode(windVelocity: btVector3, nodeIndex: number): void;
	getTotalMass(): number;
	setTotalMass(mass: number, fromfaces: boolean): void;
	setMass(node: number, mass: number): void;
	transform(trs: btTransform): void;
	translate(trs: btVector3): void;
	rotate(rot: btQuaternion): void;
	scale(scl: btVector3): void;
	generateClusters(k: number, maxiterations?: number): number;
	generateBendingConstraints(distance: number, mat: Material): number;
	upcast(colObj: btCollisionObject): btSoftBody;
}
/**
 * Bt soft body rigid body collision configuration
 */
interface btSoftBodyRigidBodyCollisionConfiguration
	extends btDefaultCollisionConfiguration {
	new (info?: btDefaultCollisionConstructionInfo): this;
}
/**
 * Bt soft body solver
 */
interface btSoftBodySolver {}
/**
 * Bt default soft body solver
 */
interface btDefaultSoftBodySolver extends btSoftBodySolver {
	new (): this;
}
/**
 * Bt soft body array
 */
interface btSoftBodyArray {
	size(): number;
	at(n: number): btSoftBody;
}
/**
 * Bt soft rigid dynamics world
 */
export interface btSoftRigidDynamicsWorld extends btDiscreteDynamicsWorld {
	new (
		dispatcher: btDispatcher,
		pairCache: btBroadphaseInterface,
		constraintSolver: btConstraintSolver,
		collisionConfiguration: btCollisionConfiguration,
		softBodySolver: btSoftBodySolver
	): this;
	addSoftBody(
		body: btSoftBody,
		collisionFilterGroup: number,
		collisionFilterMask: number
	): void;
	removeSoftBody(body: btSoftBody): void;
	removeCollisionObject(collisionObject: btCollisionObject): void;
	getWorldInfo(): btSoftBodyWorldInfo;
	getSoftBodyArray(): btSoftBodyArray;
}
/**
 * Bt soft body helpers
 */
export interface btSoftBodyHelpers {
	new (): this;
	CreateRope(
		worldInfo: btSoftBodyWorldInfo,
		from: btVector3,
		to: btVector3,
		res: number,
		fixeds: number
	): btSoftBody;
	CreatePatch(
		worldInfo: btSoftBodyWorldInfo,
		corner00: btVector3,
		corner10: btVector3,
		corner01: btVector3,
		corner11: btVector3,
		resx: number,
		resy: number,
		fixeds: number,
		gendiags: boolean
	): btSoftBody;
	CreatePatchUV(
		worldInfo: btSoftBodyWorldInfo,
		corner00: btVector3,
		corner10: btVector3,
		corner01: btVector3,
		corner11: btVector3,
		resx: number,
		resy: number,
		fixeds: number,
		gendiags: boolean,
		tex_coords: ReadonlyArray<number>
	): btSoftBody;
	CreateEllipsoid(
		worldInfo: btSoftBodyWorldInfo,
		center: btVector3,
		radius: btVector3,
		res: number
	): btSoftBody;
	CreateFromTriMesh(
		worldInfo: btSoftBodyWorldInfo,
		vertices: ReadonlyArray<number>,
		triangles: ReadonlyArray<number>,
		ntriangles: number,
		randomizeConstraints: boolean
	): btSoftBody;
	CreateFromConvexHull(
		worldInfo: btSoftBodyWorldInfo,
		vertices: btVector3,
		nvertices: number,
		randomizeConstraints: boolean
	): btSoftBody;
}

/**
 * Ammo type
 */
export interface AmmoType {
	destroy(obj: any): void;
	_malloc(size: number): number;
	_free(ptr: number): void;
	HEAP8: Int8Array;
	HEAP16: Int16Array;
	HEAP32: Int32Array;
	HEAPU8: Uint8Array;
	HEAPU16: Uint16Array;
	HEAPU32: Uint32Array;
	HEAPF32: Float32Array;
	HEAPF64: Float64Array;
	btIDebugDraw: btIDebugDraw;
	DebugDrawer: DebugDrawer;
	btVector3: btVector3;
	btVector4: btVector3;
	btQuadWord: btQuadWord;
	btQuaternion: btQuaternion;
	btMatrix3x3: btMatrix3x3;
	btTransform: btTransform;
	btMotionState: btMotionState;
	btDefaultMotionState: btDefaultMotionState;

	btCollisionObject: btCollisionObject;
	btCollisionObjectWrapper: btCollisionObjectWrapper;
	RayResultCallback: RayResultCallback;
	ClosestRayResultCallback: ClosestRayResultCallback;
	btConstCollisionObjectArray: btConstCollisionObjectArray;
	btScalarArray: btScalarArray;
	AllHitsRayResultCallback: AllHitsRayResultCallback;
	btManifoldPoint: btManifoldPoint;
	ContactResultCallback: ContactResultCallback;
	ConcreteContactResultCallback: ConcreteContactResultCallback;
	LocalShapeInfo: LocalShapeInfo;
	LocalConvexResult: LocalConvexResult;
	ConvexResultCallback: ConvexResultCallback;
	ClosestConvexResultCallback: ClosestConvexResultCallback;
	btCollisionShape: btCollisionShape;
	btConvexShape: btConvexShape;
	btConvexTriangleMeshShape: btConvexTriangleMeshShape;
	btBoxShape: btBoxShape;
	btCapsuleShape: btCapsuleShape;
	btCapsuleShapeX: btCapsuleShapeX;
	btCapsuleShapeZ: btCapsuleShapeX;
	btCylinderShape: btCylinderShape;
	btCylinderShapeX: btCylinderShapeX;
	btCylinderShapeZ: btCylinderShapeZ;
	btSphereShape: btSphereShape;
	btMultiSphereShape: btMultiSphereShape;
	btConeShape: btConeShape;
	btConeShapeX: btConeShapeX;
	btConeShapeZ: btConeShapeZ;
	btIntArray: btIntArray;
	btFace: btFace;
	btVector3Array: btVector3Array;
	btFaceArray: btFaceArray;
	btConvexPolyhedron: btConvexPolyhedron;
	btConvexHullShape: btConvexHullShape;
	btShapeHull: btShapeHull;
	btCompoundShape: btCompoundShape;
	btStridingMeshInterface: btStridingMeshInterface;
	btIndexedMesh: btIndexedMesh;
	btIndexedMeshArray: btIndexedMeshArray;
	btTriangleMesh: btTriangleMesh;
	PHY_ScalarType: PHY_ScalarType;
	btConcaveShape: btConcaveShape;
	btEmptyShape: btEmptyShape;
	btStaticPlaneShape: btStaticPlaneShape;
	btTriangleMeshShape: btTriangleMeshShape;
	btBvhTriangleMeshShape: btBvhTriangleMeshShape;
	btHeightfieldTerrainShape: btHeightfieldTerrainShape;
	btDefaultCollisionConstructionInfo: btDefaultCollisionConstructionInfo;
	btDefaultCollisionConfiguration: btDefaultCollisionConfiguration;
	btPersistentManifold: btPersistentManifold;
	btDispatcher: btDispatcher;
	btCollisionDispatcher: btCollisionDispatcher;
	btOverlappingPairCallback: btOverlappingPairCallback;
	btOverlappingPairCache: btOverlappingPairCache;
	btAxisSweep3: btAxisSweep3;
	btBroadphaseInterface: btBroadphaseInterface;
	btCollisionConfiguration: btCollisionConfiguration;
	btDbvtBroadphase: btDbvtBroadphase;
	btBroadphaseProxy: btBroadphaseProxy;
	btRigidBodyConstructionInfo: btRigidBodyConstructionInfo;
	btRigidBody: btRigidBody;
	btConstraintSetting: btConstraintSetting;
	btTypedConstraint: btTypedConstraint;
	btConstraintParams: btConstraintParams;
	btPoint2PointConstraint: btPoint2PointConstraint;
	btGeneric6DofConstraint: btGeneric6DofConstraint;
	btGeneric6DofSpringConstraint: btGeneric6DofSpringConstraint;
	btSequentialImpulseConstraintSolver: btSequentialImpulseConstraintSolver;
	btConeTwistConstraint: btConeTwistConstraint;
	btHingeConstraint: btHingeConstraint;
	btSliderConstraint: btSliderConstraint;
	btFixedConstraint: btFixedConstraint;
	btConstraintSolver: btConstraintSolver;
	btDispatcherInfo: btDispatcherInfo;
	btCollisionWorld: btCollisionWorld;
	btContactSolverInfo: btContactSolverInfo;
	btInternalTickCallback: btInternalTickCallback;
	btDynamicsWorld: btDynamicsWorld;
	btDiscreteDynamicsWorld: btDiscreteDynamicsWorld;
	btVehicleTuning: btVehicleTuning;
	btVehicleRaycasterResult: btVehicleRaycasterResult;
	btVehicleRaycaster: btVehicleRaycaster;
	btDefaultVehicleRaycaster: btDefaultVehicleRaycaster;
	RaycastInfo: RaycastInfo;
	btWheelInfoConstructionInfo: btWheelInfoConstructionInfo;
	btWheelInfo: btWheelInfo;
	btActionInterface: btActionInterface;
	btKinematicCharacterController: btKinematicCharacterController;
	btRaycastVehicle: btRaycastVehicle;
	btGhostObject: btGhostObject;
	btPairCachingGhostObject: btPairCachingGhostObject;
	btGhostPairCallback: btGhostPairCallback;
	btSoftBodyWorldInfo: btSoftBodyWorldInfo;
	Face: Face;
	tFaceArray: tFaceArray;
	Node: Node;
	tNodeArray: tNodeArray;
	Material: Material;
	tMaterialArray: tMaterialArray;
	Anchor: Anchor;
	tAnchorArray: tAnchorArray;
	Config: Config;
	btSoftBody: btSoftBody;
	btSoftBodyRigidBodyCollisionConfiguration: btSoftBodyRigidBodyCollisionConfiguration;
	btSoftBodySolver: btSoftBodySolver;
	btDefaultSoftBodySolver: btDefaultSoftBodySolver;
	btSoftBodyArray: btSoftBodyArray;
	btSoftRigidDynamicsWorld: btSoftRigidDynamicsWorld;
	btSoftBodyHelpers: btSoftBodyHelpers;
}
