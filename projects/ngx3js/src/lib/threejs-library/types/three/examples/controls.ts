import { Camera, EventDispatcher, MOUSE, Object3D, Raycaster, Scene, TOUCH, Vector3 } from '../index';

/**
 * Arcball controls mouse action operations
 */
export enum ArcballControlsMouseActionOperations {
    PAN = 'PAN',
    ROTATE = 'ROTATE',
    ZOOM = 'ZOOM',
    FOV = 'FOV',
}

export type ArcballControlsMouseActionMouse = 0 | 1 | 2 | 'WHEEL';

export enum ArcballControlsMouseActionKeys {
    SHIFT = 'SHIFT',
    CTRL = 'CTRL',
}

/**
 * Arcball controls
 */
export interface ArcballControls extends EventDispatcher {
    camera: Camera | null;
    domElement: HTMLElement;
    scene?: Scene | null | undefined;

    /**
     * @default 500
     */
    focusAnimationTime: number;

    /**
     * @default true
     */
    enabled: boolean;

    /**
     * @default true
     */
    enablePan: boolean;

    /**
     * @default true
     */
    enableRotate: boolean;

    /**
     * @default true
     */
    enableZoom: boolean;

    /**
     * @default true
     */
    enableGizmos: boolean;

    /**
     * @default true
     */
    adjustNearFar: boolean;

    /**
     * @default 1.1
     */
    scaleFactor: number;

    /**
     * @default 25
     */
    dampingFactor: number;

    /**
     * @default 20
     */
    wMax: number; // maximum angular velocity allowed

    /**
     * @default true
     */
    enableAnimations: boolean; // if animations should be performed

    /**
     * @default false
     */
    enableGrid: boolean; // if grid should be showed during pan operation

    /**
     * @default false
     */
    cursorZoom: boolean; // if wheel zoom should be cursor centered

    /**
     * @default 5
     */
    minFov: number;

    /**
     * @default 90
     */
    maxFov: number;

    /**
     * @default 0
     */
    minDistance: number;

    /**
     * @default Infinity
     */
    maxDistance: number;

    /**
     * @default 0
     */
    minZoom: number;

    /**
     * @default Infinity
     */
    maxZoom: number;

    /**
     * @default Vector3(0,0,0)
     */
    target: Vector3;

    /**
     * @default 0.67
     */
    radiusFactor: number;

    new(camera: Camera, domElement: HTMLElement, scene?: Scene | null) : this;

    getRaycaster(): Raycaster;

    activateGizmos(isActive: boolean): void;

    copyState(): void;

    pasteState(): void;

    saveState(): void;

    reset(): void;

    setCamera(camera: Camera): void;

    setGizmosVisible(value: boolean): void;

    setTbRadius(value: number): void;

    setMouseAction(
        operation: ArcballControlsMouseActionOperations,
        mouse: ArcballControlsMouseActionMouse,
        key?: ArcballControlsMouseActionKeys,
    ): boolean;

    unsetMouseAction(mouse: ArcballControlsMouseActionMouse, key?: ArcballControlsMouseActionKeys): boolean;

    setTarget(x: number, y: number, z: number): void;

    update(): void;

    dispose(): void;
}

/**
 * Drag controls
 */
export interface DragControls extends EventDispatcher {
    new(objects: Object3D[], camera: Camera, domElement?: HTMLElement) : this;

    object: Camera;
    enabled: boolean;
    transformGroup: boolean;
    activate(): void;
    deactivate(): void;
    dispose(): void;
    getObjects(): Object3D[];
    getRaycaster(): Raycaster;
}

/**
 * First person controls
 */
export interface FirstPersonControls {
    new(object: Camera, domElement?: HTMLElement) : this;

    object: Camera;
    domElement: HTMLElement | HTMLDocument;

    enabled: boolean;
    movementSpeed: number;
    lookSpeed: number;
    lookVertical: boolean;
    autoForward: boolean;
    activeLook: boolean;
    heightSpeed: boolean;
    heightCoef: number;
    heightMin: number;
    heightMax: number;
    constrainVertical: boolean;
    verticalMin: number;
    verticalMax: number;
    mouseDragOn: boolean;

    handleResize(): void;
    lookAt(x: number | Vector3, y: number, z: number) : this;
    update(delta: number) : this;
    dispose(): void;
}

/**
 * Fly controls
 */
export interface FlyControls extends EventDispatcher {
    new(object: Camera, domElement?: HTMLElement) : this;

    object: Camera;
    domElement: HTMLElement | HTMLDocument;

    movementSpeed: number;
    rollSpeed: number;
    dragToLook: boolean;
    autoForward: boolean;

    update(delta: number): void;
    dispose(): void;
}

/**
 * Orbit controls
 */
export interface OrbitControls {
    new(object: Camera, domElement?: HTMLElement) : this;

    object: Camera;
    domElement: HTMLElement | HTMLDocument;

    // API
    enabled: boolean;
    target: Vector3;

    // deprecated
    center: Vector3;

    minDistance: number;
    maxDistance: number;

    minZoom: number;
    maxZoom: number;

    minPolarAngle: number;
    maxPolarAngle: number;

    minAzimuthAngle: number;
    maxAzimuthAngle: number;

    enableDamping: boolean;
    dampingFactor: number;

    enableZoom: boolean;
    zoomSpeed: number;

    enableRotate: boolean;
    rotateSpeed: number;

    enablePan: boolean;
    panSpeed: number;
    screenSpacePanning: boolean;
    keyPanSpeed: number;

    autoRotate: boolean;
    autoRotateSpeed: number;

    enableKeys: boolean;
    keys: { LEFT: string; UP: string; RIGHT: string; BOTTOM: string };
    mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE };
    touches: { ONE: TOUCH; TWO: TOUCH };

    update(): boolean;

    listenToKeyEvents(domElement: HTMLElement): void;

    saveState(): void;

    reset(): void;

    dispose(): void;

    getPolarAngle(): number;

    getAzimuthalAngle(): number;

    getDistance(): number;

    addEventListener(type: string, listener: (event: any) => void): void;

    hasEventListener(type: string, listener: (event: any) => void): boolean;

    removeEventListener(type: string, listener: (event: any) => void): void;

    dispatchEvent(event: { type: string; target: any }): void;
}

/**
 * Map controls
 */
export interface MapControls extends OrbitControls {
    new(object: Camera, domElement?: HTMLElement) : this;
}

/**
 * Pointer lock controls
 */
export interface PointerLockControls extends EventDispatcher {
    new(camera: Camera, domElement?: HTMLElement) : this;

    domElement: HTMLElement;

    // API

    isLocked: boolean;

    minPolarAngle: number;
    maxPolarAngle: number;

    connect(): void;
    disconnect(): void;
    dispose(): void;
    getObject(): Camera;
    getDirection(v: Vector3): Vector3;
    moveForward(distance: number): void;
    moveRight(distance: number): void;
    lock(): void;
    unlock(): void;
}

/**
 * Trackball controls
 */
export interface TrackballControls extends EventDispatcher {
    new(object: Camera, domElement?: HTMLElement) : this;

    object: Camera;
    domElement: HTMLElement;

    enabled: boolean;
    screen: { left: number; top: number; width: number; height: number };
    rotateSpeed: number;
    zoomSpeed: number;
    panSpeed: number;
    noRotate: boolean;
    noZoom: boolean;
    noPan: boolean;
    noRoll: boolean;
    staticMoving: boolean;
    dynamicDampingFactor: number;
    minDistance: number;
    maxDistance: number;
    keys: string[];
    mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE };

    target: Vector3;
    position0: Vector3;
    target0: Vector3;
    up0: Vector3;

    update(): void;

    reset(): void;

    dispose(): void;

    checkDistances(): void;

    zoomCamera(): void;

    panCamera(): void;

    rotateCamera(): void;

    handleResize(): void;
}

/**
 * Transform controls
 */
export interface TransformControls extends Object3D {
    new(object: Camera, domElement?: HTMLElement) : this;

    domElement: HTMLElement;

    // API

    camera: Camera;
    object: Object3D | undefined;
    enabled: boolean;
    axis: 'X' | 'Y' | 'Z' | 'E' | 'XY' | 'YZ' | 'XZ' | 'XYZ' | 'XYZE' | null;
    mode: 'translate' | 'rotate' | 'scale';
    translationSnap: number | null;
    rotationSnap: number | null;
    space: 'world' | 'local';
    size: number;
    dragging: boolean;
    showX: boolean;
    showY: boolean;
    showZ: boolean;
    readonly isTransformControls: true;
    mouseButtons: {
        LEFT: MOUSE;
        MIDDLE: MOUSE;
        RIGHT: MOUSE;
    };

    attach(object: Object3D) : this;
    detach() : this;
    getMode(): 'translate' | 'rotate' | 'scale';
    getRaycaster(): Raycaster;
    setMode(mode: 'translate' | 'rotate' | 'scale'): void;
    setTranslationSnap(translationSnap: number | null): void;
    setRotationSnap(rotationSnap: number | null): void;
    setScaleSnap(scaleSnap: number | null): void;
    setSize(size: number): void;
    setSpace(space: 'world' | 'local'): void;
    dispose(): void;
}
