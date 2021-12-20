import { Camera, OrthographicCamera, PerspectiveCamera } from './cameras';
import { Object3D } from './core';
import { Color, ColorRepresentation, Matrix4, SphericalHarmonics3, Vector2, Vector3, Vector4 } from './math';
import { WebGLRenderTarget } from './renderers';

/**
 * This light's color gets applied to all the objects in the scene globally.
 *
 * @source https://github.com/mrdoob/three.js/blob/master/src/lights/AmbientLight.js
 */
export interface AmbientLight extends Light {
    /**
     * This creates a Ambientlight with a color.
     * @param color Numeric value of the RGB component of the color or a Color instance.
     * @param [intensity=1]
     */
    new( color?: ColorRepresentation, intensity?: number) : this;

    /**
     * @default 'AmbientLight'
     */
    type: string;

    readonly isAmbientLight: true;
}

export interface AmbientLightProbe extends LightProbe {
    new( color?: ColorRepresentation, intensity?: number) : this;

    readonly isAmbientLightProbe: true;
}

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/lights/DirectionalLight.js|src/lights/DirectionalLight.js}
 *
 * @example
 * // White directional light at half intensity shining from the top.
 * const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
 * directionalLight.position.set( 0, 1, 0 );
 * scene.add( directionalLight );
 */
export interface DirectionalLight extends Light {
    new( color?: ColorRepresentation, intensity?: number) : this;

    /**
     * @default 'DirectionalLight'
     */
    type: string;

    /**
     * @default THREE.Object3D.DefaultUp
     */
    readonly position: Vector3;

    /**
     * Target used for shadow camera orientation.
     * @default new THREE.Object3D()
     */
    target: Object3D;

    /**
     * Light's intensity.
     * @default 1
     */
    intensity: number;

    /**
     * @default new THREE.DirectionalLightShadow()
     */
    shadow: DirectionalLightShadow;
    readonly isDirectionalLight: true;
}

export interface DirectionalLightShadow extends LightShadow {
    camera: OrthographicCamera;
    readonly isDirectionalLightShadow: true;
}

export interface HemisphereLight extends Light {
    /**
     * @param skyColor
     * @param groundColor
     * @param [intensity=1]
     */
    new( skyColor?: ColorRepresentation, groundColor?: ColorRepresentation, intensity?: number) : this;

    /**
     * @default 'HemisphereLight'
     */
    type: string;

    /**
     * @default THREE.Object3D.DefaultUp
     */
    position: Vector3;

    groundColor: Color;

    readonly isHemisphereLight: true;
}

export interface HemisphereLightProbe extends LightProbe {
    new( skyColor?: ColorRepresentation, groundColor?: ColorRepresentation, intensity?: number) : this;

    readonly isHemisphereLightProbe: true;
}

// Lights //////////////////////////////////////////////////////////////////////////////////

/**
 * Abstract base class for lights.
 */
export interface Light extends Object3D {
    new( hex?: number | string, intensity?: number) : this;

    /**
     * @default 'Light'
     */
    type: string;

    color: Color;

    /**
     * @default 1
     */
    intensity: number;
    readonly isLight: true;

    shadow: LightShadow;
    /**
     * @deprecated Use shadow.camera.fov instead.
     */
    shadowCameraFov: any;
    /**
     * @deprecated Use shadow.camera.left instead.
     */
    shadowCameraLeft: any;
    /**
     * @deprecated Use shadow.camera.right instead.
     */
    shadowCameraRight: any;
    /**
     * @deprecated Use shadow.camera.top instead.
     */
    shadowCameraTop: any;
    /**
     * @deprecated Use shadow.camera.bottom instead.
     */
    shadowCameraBottom: any;
    /**
     * @deprecated Use shadow.camera.near instead.
     */
    shadowCameraNear: any;
    /**
     * @deprecated Use shadow.camera.far instead.
     */
    shadowCameraFar: any;
    /**
     * @deprecated Use shadow.bias instead.
     */
    shadowBias: any;
    /**
     * @deprecated Use shadow.mapSize.width instead.
     */
    shadowMapWidth: any;
    /**
     * @deprecated Use shadow.mapSize.height instead.
     */
    shadowMapHeight: any;

    dispose(): void;
}

export interface LightProbe extends Light {
    new( sh?: SphericalHarmonics3, intensity?: number) : this;

    /**
     * @default 'LightProbe'
     */
    type: string;

    readonly isLightProbe: true;

    /**
     * @default new THREE.SphericalHarmonics3()
     */
    sh: SphericalHarmonics3;

    fromJSON(json: object): LightProbe;
}

export interface LightShadow {
    new( camera: Camera) : this;

    camera: Camera;

    /**
     * @default 0
     */
    bias: number;

    /**
     * @default 0
     */
    normalBias: number;

    /**
     * @default 1
     */
    radius: number;

    /**
     * @default 8
     */
    blurSamples: number;

    /**
     * @default new THREE.Vector2( 512, 512 )
     */
    mapSize: Vector2;

    /**
     * @default null
     */
    map: WebGLRenderTarget;

    /**
     * @default null
     */
    mapPass: WebGLRenderTarget;

    /**
     * @default new THREE.Matrix4()
     */
    matrix: Matrix4;

    /**
     * @default true
     */
    autoUpdate: boolean;

    /**
     * @default false
     */
    needsUpdate: boolean;

    copy(source: LightShadow): this;
    clone(recursive?: boolean): this;
    toJSON(): any;
    getFrustum(): number;
    updateMatrices(light: Light, viewportIndex?: number): void;
    getViewport(viewportIndex: number): Vector4;
    getFrameExtents(): Vector2;
    dispose(): void;
}

/**
 * @example
 * const light = new THREE.PointLight( 0xff0000, 1, 100 );
 * light.position.set( 50, 50, 50 );
 * scene.add( light );
 */
export interface PointLight extends Light {
    new( color?: ColorRepresentation, intensity?: number, distance?: number, decay?: number) : this;

    /**
     * @default 'PointLight'
     */
    type: string;

    /**
     * Light's intensity.
     * @default 1
     */
    intensity: number;

    /**
     * If non-zero, light will attenuate linearly from maximum intensity at light position down to zero at distance.
     * @default 0
     */
    distance: number;

    /**
     * @default 1
     */
    decay: number;

    /**
     * @default new THREE.PointLightShadow()
     */
    shadow: PointLightShadow;

    power: number;
}

export interface PointLightShadow extends LightShadow {
    camera: PerspectiveCamera;
}

export interface RectAreaLight extends Light {
    new( color?: ColorRepresentation, intensity?: number, width?: number, height?: number) : this;

    /**
     * @default 'RectAreaLight'
     */
    type: string;

    /**
     * @default 10
     */
    width: number;

    /**
     * @default 10
     */
    height: number;

    /**
     * @default 1
     */
    intensity: number;

    power: number;

    readonly isRectAreaLight: true;
}

/**
 * A point light that can cast shadow in one direction.
 */
export interface SpotLight extends Light {
    new( 
        color?: ColorRepresentation,
        intensity?: number,
        distance?: number,
        angle?: number,
        penumbra?: number,
        decay?: number,
    ) : this;

    /**
     * @default 'SpotLight'
     */
    type: string;

    /**
     * @default THREE.Object3D.DefaultUp
     */
    position: Vector3;

    /**
     * Spotlight focus points at target.position.
     * @default new THREE.Object3D()
     */
    target: Object3D;

    /**
     * Light's intensity.
     * @default 1
     */
    intensity: number;

    /**
     * If non-zero, light will attenuate linearly from maximum intensity at light position down to zero at distance.
     * @default 0
     */
    distance: number;

    /**
     * Maximum extent of the spotlight, in radians, from its direction.
     * @default Math.PI / 3.
     */
    angle: number;

    /**
     * @default 1
     */
    decay: number;

    /**
     * @default new THREE.SpotLightShadow()
     */
    shadow: SpotLightShadow;
    power: number;

    /**
     * @default 0
     */
    penumbra: number;

    readonly isSpotLight: true;
}

export interface SpotLightShadow extends LightShadow {
    camera: PerspectiveCamera;
    readonly isSpotLightShadow: true;

    /**
     * @default 1
     */
    focus: number;
}
