import {
    Box3Helper,
    BufferGeometry, Camera, DirectionalLight, Group,
    LineBasicMaterial,
    LineSegments, Material, Matrix4, Mesh,
    MeshBasicMaterial, Object3D, PlaneGeometry, Vector2, Vector3
} from '../index';

/**
 * Cmsmode
 */
export enum CMSMode {
    practical = 'practical',
    uniform = 'uniform',
    logarithmic = 'logarithmic',
    custom = 'custom',
}

/**
 * Cmsparameters
 */
export interface CMSParameters {
    camera?: Camera;
    parent?: Object3D;
    cascades?: number;
    maxFar?: number;
    mode?: CMSMode;
    shadowMapSize?: number;
    shadowBias?: number;
    lightDirection?: Vector3;
    lightIntensity?: number;
    lightNear?: number;
    lightFar?: number;
    lightMargin?: number;
    customSplitsCallback?: (cascades: number, cameraNear: number, cameraFar: number, breaks: number[]) => void;
}

/**
 * Csm
 */
export interface CSM {
    new(data?: CMSParameters) : this;
    camera: Camera;
    parent: Object3D;
    cascades: number;
    maxFar: number;
    mode: CMSMode;
    shadowMapSize: number;
    shadowBias: number;
    lightDirection: Vector3;
    lightIntensity: number;
    lightNear: number;
    lightFar: number;
    lightMargin: number;
    customSplitsCallback: (cascades: number, cameraNear: number, cameraFar: number, breaks: number[]) => void;
    fade: boolean;
    mainFrustum: CSMFrustum;
    frustums: CSMFrustum[];
    breaks: number[];
    lights: DirectionalLight[];
    shaders: Map<unknown, string>;
    createLights(): void;
    initCascades(): void;
    updateShadowBounds(): void;
    getBreaks(): void;
    update(): void;
    injectInclude(): void;
    setupMaterial(material: Material): void;
    updateUniforms(): void;
    getExtendedBreaks(target: Vector2[]): void;
    updateFrustums(): void;
    remove(): void;
    dispose(): void;
}

/**
 * Csmfrustum verticies
 */
export interface CSMFrustumVerticies {
    near: Vector3[];
    far: Vector3[];
}

/**
 * Csmfrustum parameters
 */
export interface CSMFrustumParameters {
    projectionMatrix?: Matrix4;
    maxFar?: number;
}

/**
 * Csmfrustum
 */
export interface CSMFrustum {
    new(data?: CSMFrustumParameters) : this;
    vertices: CSMFrustumVerticies;
    setFromProjectionMatrix(projectionMatrix: Matrix4, maxFar: number): CSMFrustumVerticies;
    split(breaks: number[], target: CSMFrustum[]): void;
    toSpace(cameraMatrix: Matrix4, target: CSMFrustum): void;
}

/**
 * Csmhelper
 * @template TCSM 
 */
export interface CSMHelper<TCSM extends CSM = CSM> extends Group {
    new(csm: TCSM) : this;
    csm: TCSM;
    displayFrustum: boolean;
    displayPlanes: boolean;
    displayShadowBounds: boolean;
    frustumLines: LineSegments<BufferGeometry, LineBasicMaterial>;
    cascadeLines: Box3Helper[];
    cascadePlanes: Array<Mesh<PlaneGeometry, MeshBasicMaterial>>;
    shadowLines: Box3Helper[];
    updateVisibility(): void;
    update(): void;
}

/**
 * Csmshader
 */
export interface CSMShader {
    lights_fragment_begin: string;
    lights_pars_begin: string;
}
