import {
    BufferGeometry, DirectionalLight, Group, Intersection, LightProbe, Mesh, MeshBasicMaterial, Object3D, Raycaster,
    SphereGeometry, Texture, Vector3, WebGLRenderer, XRFrame
} from '../index';
import { GLTFLoader } from './loaders';

/**
 * Arbutton
 */
export interface ARButton {
    createButton(renderer: WebGLRenderer, sessionInit?: any): HTMLElement;
}

/**
 * Oculus hand model
 */
export interface OculusHandModel extends Object3D {
    controller: Object3D;
    motionController: Object3D | null;
    envMap: Texture | null;

    mesh: Mesh | null;

    new(controller: Object3D) : this;

    updateMatrixWorld(force?: boolean): void;

    getPointerPosition(): Vector3 | null;

    intersectBoxObject(boxObject: Object3D): boolean;

    checkButton(button: Object3D): void;
}

/**
 * Oculus hand pointer model
 */
export interface OculusHandPointerModel extends Object3D {
    hand: Object3D;
    controller: Object3D;
    motionController: Object3D | null;

    envMap: Texture | null;

    mesh: Mesh | null;

    pointerGeometry: BufferGeometry | null;
    pointerMesh: Mesh<BufferGeometry, MeshBasicMaterial> | null;
    pointerObject: Object3D | null;

    pinched: boolean;
    attached: boolean;

    cursorObject: Mesh<SphereGeometry, MeshBasicMaterial> | null;

    raycaster: Raycaster;

    visible: boolean;
    xrInputSource: unknown;

    new(hand: Object3D, controller: Object3D) : this;


    createPointer(): void;


    updateMatrixWorld(force?: boolean): void;

    isPinched(): boolean;

    setAttached(attached: boolean): void;

    isAttached(): boolean;

    intersectObject(object: Object3D, recursive?: boolean): Intersection[] | void;

    intersectObjects(objects: Object3D[], recursive?: boolean): Intersection[] | void;

    checkIntersections(objects: Object3D[], recursive?: boolean): void;

    setCursor(distance: number): void;
}

/**
 * Create text
 */
export interface createText {
    (message: string, height: number): Mesh;
}

/**
 * Vrbutton
 */
export interface VRButton {
    createButton(renderer: WebGLRenderer): HTMLElement;
}

/**
 * Xrcontroller model
 */
export interface XRControllerModel extends Object3D {
    new() : this;

    motionController: any;

    setEnvironmentMap(envMap: Texture): XRControllerModel;
}

/**
 * Xrcontroller model factory
 */
export interface XRControllerModelFactory {
    new(gltfLoader?: GLTFLoader) : this;
    gltfLoader: GLTFLoader | null;
    path: string;

    createControllerModel(controller: Group): XRControllerModel;
}

/**
 * Session light probe
 */
export interface SessionLightProbe {
    xrLight: XREstimatedLight;
    renderer: WebGLRenderer;
    lightProbe: unknown;
    xrWebGLBinding: unknown | null;
    estimationStartCallback: () => void;
    frameCallback: (this: SessionLightProbe, time: number, xrFrame: XRFrame) => void;

    new(
        xrLight: XREstimatedLight,
        renderer: WebGLRenderer,
        lightProbe: unknown,
        environmentEstimation: boolean,
        estimationStartCallback: () => void,
    ) : this;

    updateReflection: () => void;

    onXRFrame: (time: number, xrFrame: XRFrame) => void;

    dispose: () => void;
}

/**
 * Xrestimated light
 */
export interface XREstimatedLight extends Group {
    lightProbe: LightProbe;
    directionalLight: DirectionalLight;
    environment: Texture;

    new(renderer: WebGLRenderer, environmentEstimation?: boolean) : this;
}

/**
 * Xrhand mesh model
 */
export interface XRHandMeshModel {
    controller: Object3D;
    handModel: Object3D;
    bones: Object3D[];

    new(handModel: Object3D, controller: Object3D, path: string, handedness: string) : this;

    updateMesh(): void;
}

export type XRHandModelHandedness = 'left' | 'right';

/**
 * Xrhand model
 */
export interface XRHandModel extends Object3D {
    new() : this;

    motionController: XRHandPrimitiveModel | XRHandMeshModel;
}

/**
 * Xrhand model factory
 */
export interface XRHandModelFactory {
    new() : this;
    path: string;

    setPath(path: string): XRHandModelFactory;

    createHandModel(
        controller: Group,
        profile?: 'spheres' | 'boxes' | 'oculus',
        options?: XRHandPrimitiveModelOptions,
    ): XRHandModel;
}

/**
 * Xrhand primitive model options
 */
export interface XRHandPrimitiveModelOptions {
    primitive?: 'sphere' | 'box' | undefined;
}

/**
 * Xrhand primitive model
 */
export interface XRHandPrimitiveModel {
    controller: Group;
    handModel: XRHandModel;
    envMap: Texture | null;
    handMesh: Group;

    new(
        handModel: XRHandModel,
        controller: Group,
        path: string,
        handedness: XRHandModelHandedness,
        options: XRHandPrimitiveModelOptions,
    ) : this;

    updateMesh: () => void;
}
