import { AnimationClip, AnimationMixer, Audio, Bone, Camera, Euler, Matrix4, Object3D, Quaternion, SkinnedMesh, Vector3 } from '../index';

export interface AnimationClipCreator {
    CreateRotationAnimation(period: number, axis: string): AnimationClip;
    CreateScaleAxisAnimation(period: number, axis: string): AnimationClip;
    CreateShakeAnimation(duration: number, shakeScale: Vector3): AnimationClip;
    CreatePulsationAnimation(duration: number, pulseScale: number): AnimationClip;
    CreateVisibilityAnimation(duration: number): AnimationClip;
    CreateMaterialColorAnimation(duration: number, colors: number[]): AnimationClip;
}

// tslint:disable-next-line:interface-name
export interface IKS {
    effector: number;
    iteration: number;
    links: {
        enabled: boolean;
        index: number;
    };
    maxAngle: number;
    target: number;
}

export interface CCDIKSolver {
    new(mesh: SkinnedMesh, iks: IKS[]) : this;

    update() : this;
    updateOne(iks: IKS) : this;
    createHelper(): CCDIKHelper;
}

export interface CCDIKHelper extends Object3D {
    new(mesh: SkinnedMesh, iks: IKS[]) : this;
}

export interface MMDAnimationHelperParameter {
    sync?: boolean | undefined;
    afterglow?: number | undefined;
    resetPhysicsOnLoop?: boolean | undefined;
}

export interface MMDAnimationHelperAddParameter {
    animation?: AnimationClip | AnimationClip[] | undefined;
    physics?: boolean | undefined;
    warmup?: number | undefined;
    unitStep?: number | undefined;
    maxStepNum?: number | undefined;
    gravity?: number | undefined;
    delayTime?: number | undefined;
}

export interface MMDAnimationHelperPoseParameter {
    resetPose?: boolean | undefined;
    ik?: boolean | undefined;
    grant?: boolean | undefined;
}

export interface MMDAnimationHelperMixer {
    looped: boolean;
    mixer?: AnimationMixer | undefined;
    ikSolver: CCDIKSolver;
    grantSolver: GrantSolver;
    physics?: MMDPhysics | undefined;
    duration?: number | undefined;
}

export interface MMDAnimationHelper {
    new(params?: MMDAnimationHelperParameter) : this;
    meshes: SkinnedMesh[];
    camera: Camera | null;
    cameraTarget: Object3D;
    audio: Audio;
    audioManager: AudioManager;
    configuration: {
        sync: boolean;
        afterglow: number;
        resetPhysicsOnLoop: boolean;
    };
    enabled: {
        animation: boolean;
        ik: boolean;
        grant: boolean;
        physics: boolean;
        cameraAnimation: boolean;
    };
    objects: WeakMap<SkinnedMesh | Camera | AudioManager, MMDAnimationHelperMixer>;
    onBeforePhysics: (mesh: SkinnedMesh) => void;
    sharedPhysics: boolean;
    masterPhysics: null;

    add(object: SkinnedMesh | Camera | Audio, params?: MMDAnimationHelperAddParameter) : this;
    remove(object: SkinnedMesh | Camera | Audio) : this;
    update(delta: number) : this;
    pose(mesh: SkinnedMesh, vpd: object, params?: MMDAnimationHelperPoseParameter) : this;
    enable(key: string, enabled: boolean) : this;
    createGrantSolver(mesh: SkinnedMesh): GrantSolver;
}

export interface AudioManagerParameter {
    delayTime?: number | undefined;
}

export interface AudioManager {
    new(audio: Audio, params?: AudioManagerParameter) : this;
    audio: Audio;
    elapsedTime: number;
    currentTime: number;
    delayTime: number;
    audioDuration: number;
    duration: number;

    control(delta: number) : this;
}

export interface GrantSolver {
    new(mesh: SkinnedMesh, grants: object[]) : this;
    mesh: SkinnedMesh;
    grants: object[];

    update() : this;
    updateOne(gran: object[]) : this;
    addGrantRotation(bone: Bone, q: Quaternion, ratio: number) : this;
}

export interface MMDPhysicsParameter {
    unitStep?: number | undefined;
    maxStepNum?: number | undefined;
    gravity?: Vector3 | undefined;
}

export interface MMDPhysics {
    new(
        mesh: SkinnedMesh,
        rigidBodyParams: object[],
        constraintParams?: object[],
        params?: MMDPhysicsParameter,
    ) : this;
    manager: ResourceManager;
    mesh: SkinnedMesh;
    unitStep: number;
    maxStepNum: number;
    gravity: Vector3;
    world: null;
    bodies: RigidBody[];
    constraints: Constraint[];

    update(delta: number) : this;
    reset() : this;
    warmup(cycles: number) : this;
    setGravity(gravity: Vector3) : this;
    createHelper(): MMDPhysicsHelper;
}

export interface ResourceManager {
    new() : this;
    threeVector3s: Vector3[];
    threeMatrix4s: Matrix4[];
    threeQuaternions: Quaternion[];
    threeEulers: Euler[];
    transforms: object[];
    quaternions: object[];
    vector3s: object[];

    allocThreeVector3(): void;
    freeThreeVector3(v: Vector3): void;
    allocThreeMatrix4(): void;
    freeThreeMatrix4(m: Matrix4): void;
    allocThreeQuaternion(): void;
    freeThreeQuaternion(q: Quaternion): void;
    allocThreeEuler(): void;
    freeThreeEuler(e: Euler): void;
    allocTransform(): void;
    freeTransform(t: object): void;
    allocQuaternion(): void;
    freeQuaternion(q: object): void;
    allocVector3(): void;
    freeVector3(v: object): void;
    setIdentity(): void;
    getBasis(t: object): object;
    getBasisAsMatrix3(t: object): object;
    getOrigin(t: object): object;
    setOrigin(t: object, v: object): void;
    copyOrigin(t1: object, t2: object): void;
    setBasis(t: object, q: object): void;
    setBasisFromMatrix3(t: object, m: object): void;
    setOriginFromArray3(t: object, a: number[]): void;
    setOriginFromThreeVector3(t: object, v: Vector3): void;
    setBasisFromArray3(t: object, a: number[]): void;
    setBasisFromThreeQuaternion(t: object, a: Quaternion): void;
    multiplyTransforms(t1: object, t2: object): object;
    inverseTransform(t: object): object;
    multiplyMatrices3(m1: object, m2: object): object;
    addVector3(v1: object, v2: object): object;
    dotVectors3(v1: object, v2: object): number;
    rowOfMatrix3(m: object, i: number): object;
    columnOfMatrix3(m: object, i: number): object;
    negativeVector3(v: object): object;
    multiplyMatrix3ByVector3(m: object, v: object): object;
    transposeMatrix3(m: object): object;
    quaternionToMatrix3(q: object): object;
    matrix3ToQuaternion(m: object): object;
}

export interface RigidBody {
    new(mesh: SkinnedMesh, world: object, params: object, manager: ResourceManager) : this;
    mesh: SkinnedMesh;
    world: object;
    params: object;
    manager: ResourceManager;

    body: object;
    bone: Bone;
    boneOffsetForm: object;
    boneOffsetFormInverse: object;

    reset() : this;
    updateFromBone() : this;
    updateBone() : this;
}

export interface Constraint {
    new(
        mesh: SkinnedMesh,
        world: object,
        bodyA: RigidBody,
        bodyB: RigidBody,
        params: object,
        manager: ResourceManager,
    ) : this;

    mesh: SkinnedMesh;
    world: object;
    bodyA: RigidBody;
    bodyB: RigidBody;
    params: object;
    manager: ResourceManager;
}

export interface MMDPhysicsHelper extends Object3D {
    new() : this;
}
