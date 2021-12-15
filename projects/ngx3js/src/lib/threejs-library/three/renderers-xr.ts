import { Camera } from "./cameras";
import { EventDispatcher } from "./core";
import { Group } from "./objects";

export type XRSessionMode = 'inline' | 'immersive-vr' | 'immersive-ar';

export type XRReferenceSpaceType = 'viewer' | 'local' | 'local-floor' | 'bounded-floor' | 'unbounded';

export type XREnvironmentBlendMode = 'opaque' | 'additive' | 'alpha-blend';

export type XRVisibilityState = 'visible' | 'visible-blurred' | 'hidden';

export type XRHandedness = 'none' | 'left' | 'right';

export type XRTargetRayMode = 'gaze' | 'tracked-pointer' | 'screen';

export type XREye = 'none' | 'left' | 'right';

export type XREventType =
    | 'end'
    | 'select'
    | 'selectstart'
    | 'selectend'
    | 'squeeze'
    | 'squeezestart'
    | 'squeezeend'
    | 'inputsourceschange';

export type XRAnimationLoopCallback = (time: number, frame?: XRFrame) => void;

export type XRFrameRequestCallback = (time: number, frame: XRFrame) => void;

export interface XR extends EventTarget {
    requestSession(mode: XRSessionMode, options?: XRSessionInit): Promise<XRSession>;
    isSessionSupported(mode: XRSessionMode): Promise<boolean>;
}

export interface Window {
    XRSession?: Constructor<XRSession> | undefined;
    XR?: Constructor<XR> | undefined;
}

export interface Navigator {
    xr?: XR | undefined;
}

export interface XRViewport {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}

export interface WebGLRenderingContext {
    makeXRCompatible(): Promise<void>;
}

export interface XRRenderState {
    readonly depthNear: number;
    readonly depthFar: number;
    readonly inlineVerticalFieldOfView?: number | undefined;
    readonly baseLayer?: XRWebGLLayer | undefined;
}

export interface XRRenderStateInit {
    depthNear?: number | undefined;
    depthFar?: number | undefined;
    inlineVerticalFieldOfView?: number | undefined;
    baseLayer?: XRWebGLLayer | undefined;
}

export interface XRGamepad {
    readonly id: string;
    readonly index: number; // long
    readonly connected: boolean;
    readonly timestamp: DOMHighResTimeStamp;
    readonly mapping: GamepadMappingType;
    readonly axes: Float32Array; // FrozenArray<double>;
    readonly buttons: GamepadButton[]; // FrozenArray<GamepadButton>;
}

export interface XRInputSource {
    readonly handedness: XRHandedness;
    readonly targetRayMode: XRTargetRayMode;
    readonly targetRaySpace: EventTarget;
    readonly gripSpace?: EventTarget | undefined;
    readonly profiles: string[];
    readonly gamepad: XRGamepad;
    readonly hand?: XRHand | undefined;
}

export interface XRSessionInit {
    optionalFeatures?: string[] | undefined;
    requiredFeatures?: string[] | undefined;
}

export interface XRSession extends EventTarget {
    requestReferenceSpace(type: XRReferenceSpaceType): Promise<XRReferenceSpace>;
    updateRenderState(renderStateInit: XRRenderStateInit): Promise<void>;
    requestAnimationFrame(callback: XRFrameRequestCallback): number;
    cancelAnimationFrame(id: number): void;
    end(): Promise<void>;
    renderState: XRRenderState;
    inputSources: XRInputSource[];
    environmentBlendMode: XREnvironmentBlendMode;
    visibilityState: XRVisibilityState;

    // hit test
    requestHitTestSource(options: XRHitTestOptionsInit): Promise<XRHitTestSource>;
    requestHitTestSourceForTransientInput(
        options: XRTransientInputHitTestOptionsInit,
    ): Promise<XRTransientInputHitTestSource>;

    // legacy AR hit test
    requestHitTest(ray: XRRay, referenceSpace: XRReferenceSpace): Promise<XRHitResult[]>;

    // legacy plane detection
    updateWorldTrackingState(options: { planeDetectionState?: { enabled: boolean } | undefined }): void;
}

export interface XRReferenceSpace extends EventTarget {
    getOffsetReferenceSpace(originOffset: XRRigidTransform): XRReferenceSpace;
    onreset: any;
}

export type XRPlaneSet = Set<XRPlane>;
export type XRAnchorSet = Set<XRAnchor>;

export interface XRFrame {
    readonly session: XRSession;
    getViewerPose(referenceSpace: XRReferenceSpace): XRViewerPose | undefined;
    getPose(space: EventTarget, baseSpace: EventTarget): XRPose | undefined;

    // AR
    getHitTestResults(hitTestSource: XRHitTestSource): XRHitTestResult[];
    getHitTestResultsForTransientInput(hitTestSource: XRTransientInputHitTestSource): XRTransientInputHitTestResult[];
    // Anchors
    trackedAnchors?: XRAnchorSet | undefined;
    createAnchor(pose: XRRigidTransform, space: EventTarget): Promise<XRAnchor>;
    // Planes
    worldInformation: {
        detectedPlanes?: XRPlaneSet | undefined;
    };
    // Hand tracking
    getJointPose(joint: XRJointSpace, baseSpace: EventTarget): XRJointPose;
}

export interface XRViewerPose {
    readonly transform: XRRigidTransform;
    readonly views: XRView[];
}

export interface XRPose {
    readonly emulatedPosition: boolean;
    readonly transform: XRRigidTransform;
}

export interface XRWebGLLayerInit {
    antialias?: boolean | undefined;
    depth?: boolean | undefined;
    stencil?: boolean | undefined;
    alpha?: boolean | undefined;
    ignoreDepthValues?: boolean | undefined;
    framebufferScaleFactor?: number | undefined;
}

export interface XRWebGLLayer {
    new(session: XRSession, gl: WebGLRenderingContext | undefined, options?: XRWebGLLayerInit) : this;
    framebuffer: WebGLFramebuffer;
    framebufferWidth: number;
    framebufferHeight: number;
    getViewport(view: XRView): XRViewport;
}

export interface DOMPointInit {
    w?: number | undefined;
    x?: number | undefined;
    y?: number | undefined;
    z?: number | undefined;
}

export interface XRRigidTransform {
    new(matrix: Float32Array | DOMPointInit, direction?: DOMPointInit) : this;
    position: DOMPointReadOnly;
    orientation: DOMPointReadOnly;
    matrix: Float32Array;
    inverse: XRRigidTransform;
}

export interface XRView {
    readonly eye: XREye;
    readonly projectionMatrix: Float32Array;
    readonly viewMatrix: Float32Array;
    readonly transform: XRRigidTransform;
}

export interface XRRayDirectionInit {
    x?: number | undefined;
    y?: number | undefined;
    z?: number | undefined;
    w?: number | undefined;
}

export interface XRRay {
    readonly origin: DOMPointReadOnly;
    readonly direction: XRRayDirectionInit;
    matrix: Float32Array;

    new(transformOrOrigin: XRRigidTransform | DOMPointInit, direction?: XRRayDirectionInit) : this;
}

export enum XRHitTestTrackableType {
    'point',
    'plane',
    'mesh',
}

export interface XRHitResult {
    hitMatrix: Float32Array;
}

export interface XRTransientInputHitTestResult {
    readonly inputSource: XRInputSource;
    readonly results: XRHitTestResult[];
}

export interface XRHitTestResult {
    getPose(baseSpace: EventTarget): XRPose | undefined | null;
    // When anchor system is enabled
    createAnchor?(pose: XRRigidTransform): Promise<XRAnchor>;
}

export interface XRHitTestSource {
    cancel(): void;
}

export interface XRTransientInputHitTestSource {
    cancel(): void;
}

export interface XRHitTestOptionsInit {
    space: EventTarget;
    entityTypes?: XRHitTestTrackableType[] | undefined;
    offsetRay?: XRRay | undefined;
}

export interface XRTransientInputHitTestOptionsInit {
    profile: string;
    entityTypes?: XRHitTestTrackableType[] | undefined;
    offsetRay?: XRRay | undefined;
}

export interface XRAnchor {
    anchorSpace: EventTarget;
    delete(): void;
}

export interface XRPlane {
    orientation: 'Horizontal' | 'Vertical';
    planeSpace: EventTarget;
    polygon: DOMPointReadOnly[];
    lastChangedTime: number;
}

export enum XRHandJoint {
    'wrist',
    'thumb-metacarpal',
    'thumb-phalanx-proximal',
    'thumb-phalanx-distal',
    'thumb-tip',
    'index-finger-metacarpal',
    'index-finger-phalanx-proximal',
    'index-finger-phalanx-intermediate',
    'index-finger-phalanx-distal',
    'index-finger-tip',
    'middle-finger-metacarpal',
    'middle-finger-phalanx-proximal',
    'middle-finger-phalanx-intermediate',
    'middle-finger-phalanx-distal',
    'middle-finger-tip',
    'ring-finger-metacarpal',
    'ring-finger-phalanx-proximal',
    'ring-finger-phalanx-intermediate',
    'ring-finger-phalanx-distal',
    'ring-finger-tip',
    'pinky-finger-metacarpal',
    'pinky-finger-phalanx-proximal',
    'pinky-finger-phalanx-intermediate',
    'pinky-finger-phalanx-distal',
    'pinky-finger-tip',
}

export interface XRJointSpace extends EventTarget {
    readonly jointName: XRHandJoint;
}

export interface XRJointPose extends XRPose {
    readonly radius: number | undefined;
}

export interface XRHand extends Map<XRHandJoint, XRJointSpace> {
    readonly size: number;
}

export interface Constructor<T = object> {
    new (...args: any[]): T;
    prototype: T;
}

export interface XRInputSourceChangeEvent {
    session: XRSession;
    removed: XRInputSource[];
    added: XRInputSource[];
}

export interface XRInputSourceEvent extends Event {
    readonly frame: XRFrame;
    readonly inputSource: XRInputSource;
}



export type XRControllerEventType = XREventType | 'disconnected' | 'connected';

export interface WebXRController {
    new() : this;

    getTargetRaySpace(): Group;
    getGripSpace(): Group;
    dispatchEvent(event: { type: XRControllerEventType; data?: XRInputSource | undefined }): this;
    disconnect(inputSource: XRInputSource): this;
    update(inputSource: XRInputSource, frame: XRFrame, referenceSpace: XRReferenceSpace): this;
}

export interface WebXRManager extends EventDispatcher {
    new(renderer: any, gl: WebGLRenderingContext) : this;

    /**
     * @default false
     */
    enabled: boolean;

    /**
     * @default false
     */
    isPresenting: boolean;

    getController(index: number): Group;
    getControllerGrip(index: number): Group;
    getHand(index: number): Group;
    setFramebufferScaleFactor(value: number): void;
    setReferenceSpaceType(value: XRReferenceSpaceType): void;
    getReferenceSpace(): XRReferenceSpace | null;
    getSession(): XRSession | null;
    setSession(value: XRSession): Promise<void>;
    getCamera(camera: Camera): Camera;
    setAnimationLoop(callback: XRFrameRequestCallback): void;
    getFoveation(): number | undefined;
    setFoveation(foveation: number): void;
    dispose(): void;
}

