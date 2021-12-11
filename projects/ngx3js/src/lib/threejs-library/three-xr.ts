

import * as O3JS from 'three';

export type TXRSessionMode = O3JS.XRSessionMode;

export type TXRReferenceSpaceType = O3JS.XRReferenceSpaceType;

export type TXREnvironmentBlendMode = O3JS.XREnvironmentBlendMode;

export type TXRVisibilityState = O3JS.XRVisibilityState;

export type TXRHandedness = O3JS.XRHandedness;

export type TXRTargetRayMode = O3JS.XRTargetRayMode;

export type TXREye = O3JS.XREye;

export type TXREventType = O3JS.XREventType;

export type TXRAnimationLoopCallback = O3JS.XRAnimationLoopCallback;

export type TXRFrameRequestCallback = O3JS.XRFrameRequestCallback;


export interface IXR extends EventTarget {
    requestSession(mode: TXRSessionMode, options?: IXRSessionInit): Promise<IXRSession>;
    isSessionSupported(mode: TXRSessionMode): Promise<boolean>;
}

export interface IWindow {
    XRSession?: IConstructor<IXRSession> | undefined;
    XR?: IConstructor<IXR> | undefined;
}

export interface INavigator {
    xr?: IXR | undefined;
}

export interface IXRReferenceSpace extends EventTarget {
    getOffsetReferenceSpace(originOffset: IXRRigidTransform): IXRReferenceSpace;
}
export interface IXRHitTestOptionsInit {
    space: EventTarget;
    offsetRay?: IXRRay | undefined;
}

export interface IXRTransientInputHitTestOptionsInit {
    profile: string;
    offsetRay?: IXRRay | undefined;
}

export interface IXRViewport {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}

export interface IWebGLRenderingContext {
    makeXRCompatible(): Promise<void>;
}

export interface IXRRenderState {
    readonly depthNear: number;
    readonly depthFar: number;
    readonly inlineVerticalFieldOfView?: number | undefined;
    readonly baseLayer?: IXRWebGLLayer | undefined;
}

export interface IXRRenderStateInit {
    depthNear?: number | undefined;
    depthFar?: number | undefined;
    inlineVerticalFieldOfView?: number | undefined;
    baseLayer?: IXRWebGLLayer | undefined;
}

export interface IXRGamepad {
    readonly id: string;
    readonly index: number; // long
    readonly connected: boolean;
    readonly timestamp: DOMHighResTimeStamp;
    readonly mapping: GamepadMappingType;
    readonly axes: Float32Array; // FrozenArray<double>;
    readonly buttons: GamepadButton[]; // FrozenArray<GamepadButton>;
}

export interface IXRInputSource {
    readonly handedness: TXRHandedness;
    readonly targetRayMode: TXRTargetRayMode;
    readonly targetRaySpace: EventTarget;
    readonly gripSpace?: EventTarget | undefined;
    readonly profiles: string[];
    readonly gamepad: IXRGamepad;
    readonly hand?: IXRHand | undefined;
}

export interface IXRSessionInit {
    optionalFeatures?: string[] | undefined;
    requiredFeatures?: string[] | undefined;
}

export interface IXRSession extends EventTarget {
    requestReferenceSpace(type: TXRReferenceSpaceType): Promise<IXRReferenceSpace>;
    updateRenderState(renderStateInit: IXRRenderStateInit): Promise<void>;
    requestAnimationFrame(callback: TXRFrameRequestCallback): number;
    cancelAnimationFrame(id: number): void;
    end(): Promise<void>;
    renderState: IXRRenderState;
    inputSources: IXRInputSource[];
    environmentBlendMode: TXREnvironmentBlendMode;
    visibilityState: TXRVisibilityState;

    // hit test
    requestHitTestSource(options: IXRHitTestOptionsInit): Promise<IXRHitTestSource>;
    requestHitTestSourceForTransientInput(
        options: IXRTransientInputHitTestOptionsInit,
    ): Promise<IXRTransientInputHitTestSource>;

    // legacy AR hit test
    requestHitTest(ray: IXRRay, referenceSpace: IXRReferenceSpace): Promise<IXRHitResult[]>;

    // legacy plane detection
    updateWorldTrackingState(options: { planeDetectionState?: { enabled: boolean } | undefined }): void;
}

export interface IXRReferenceSpace extends EventTarget {
    getOffsetReferenceSpace(originOffset: IXRRigidTransform): IXRReferenceSpace;
    onreset: any;
}

export type TXRPlaneSet = Set<IXRPlane>;
export type TXRAnchorSet = Set<IXRAnchor>;

export interface IXRFrame {
    readonly session: IXRSession;
    getViewerPose(referenceSpace: IXRReferenceSpace): IXRViewerPose | undefined;
    getPose(space: EventTarget, baseSpace: EventTarget): IXRPose | undefined;

    // AR
    getHitTestResults(hitTestSource: IXRHitTestSource): IXRHitTestResult[];
    getHitTestResultsForTransientInput(hitTestSource: IXRTransientInputHitTestSource): IXRTransientInputHitTestResult[];
    // Anchors
    trackedAnchors?: TXRAnchorSet | undefined;
    createAnchor(pose: IXRRigidTransform, space: EventTarget): Promise<IXRAnchor>;
    // Planes
    worldInformation: {
        detectedPlanes?: TXRPlaneSet | undefined;
    };
    // Hand tracking
    getJointPose(joint: IXRJointSpace, baseSpace: EventTarget): IXRJointPose;
}

export interface IXRViewerPose {
    readonly transform: IXRRigidTransform;
    readonly views: IXRView[];
}

export interface IXRPose {
    readonly emulatedPosition: boolean;
    readonly transform: IXRRigidTransform;
}

export interface IXRWebGLLayerInit {
    antialias?: boolean | undefined;
    depth?: boolean | undefined;
    stencil?: boolean | undefined;
    alpha?: boolean | undefined;
    ignoreDepthValues?: boolean | undefined;
    framebufferScaleFactor?: number | undefined;
}

export interface IDOMPointInit {
    w?: number | undefined;
    x?: number | undefined;
    y?: number | undefined;
    z?: number | undefined;
}

export interface IXRView {
    readonly eye: TXREye;
    readonly projectionMatrix: Float32Array;
    readonly viewMatrix: Float32Array;
    readonly transform: IXRRigidTransform;
}

export interface IXRRayDirectionInit {
    x?: number | undefined;
    y?: number | undefined;
    z?: number | undefined;
    w?: number | undefined;
}

export interface IXRWebGLLayer {
    new(session: IXRSession, gl: WebGLRenderingContext | undefined, options?: IXRWebGLLayerInit) : this;
    framebuffer: WebGLFramebuffer;
    framebufferWidth: number;
    framebufferHeight: number;
    getViewport(view: IXRView): IXRViewport;
}

export interface IXRRigidTransform {
    new(matrix: Float32Array | DOMPointInit, direction?: DOMPointInit):this;
    position: DOMPointReadOnly;
    orientation: DOMPointReadOnly;
    matrix: Float32Array;
    inverse: IXRRigidTransform;
}

export interface IXRRay {
    readonly origin: DOMPointReadOnly;
    readonly direction: IXRRayDirectionInit;
    matrix: Float32Array;

    new(transformOrOrigin: IXRRigidTransform | DOMPointInit, direction?: IXRRayDirectionInit):this;
}


export interface IXRHitResult {
    hitMatrix: Float32Array;
}

export interface IXRTransientInputHitTestResult {
    readonly inputSource: IXRInputSource;
    readonly results: IXRHitTestResult[];
}

export interface IXRHitTestResult {
    getPose(baseSpace: EventTarget): IXRPose | undefined | null;
    // When anchor system is enabled
    createAnchor?(pose: IXRRigidTransform): Promise<IXRAnchor>;
}

export interface IXRHitTestSource {
    cancel(): void;
}

export interface IXRTransientInputHitTestSource {
    cancel(): void;
}

export interface IXRHitTestOptionsInit {
    space: EventTarget;
    entityTypes?: O3JS.XRHitTestTrackableType[] | undefined;
    offsetRay?: IXRRay | undefined;
}

export interface IXRTransientInputHitTestOptionsInit {
    profile: string;
    entityTypes?: O3JS.XRHitTestTrackableType[] | undefined;
    offsetRay?: IXRRay | undefined;
}

export interface IXRAnchor {
    anchorSpace: EventTarget;
    delete(): void;
}

export interface IXRPlane {
    orientation: 'Horizontal' | 'Vertical';
    planeSpace: EventTarget;
    polygon: DOMPointReadOnly[];
    lastChangedTime: number;
}



export interface IXRJointSpace extends EventTarget {
    readonly jointName: O3JS.XRHandJoint;
}

export interface IXRJointPose extends IXRPose {
    readonly radius: number | undefined;
}

export interface IXRHand extends Map<O3JS.XRHandJoint, IXRJointSpace> {
    readonly size: number;
}

export interface IConstructor<T = object> {
    new (...args: any[]): T;
    prototype: T;
}

export interface IXRInputSourceChangeEvent {
    session: IXRSession;
    removed: IXRInputSource[];
    added: IXRInputSource[];
}

export interface IXRInputSourceEvent extends Event {
    readonly frame: IXRFrame;
    readonly inputSource: IXRInputSource;
}
