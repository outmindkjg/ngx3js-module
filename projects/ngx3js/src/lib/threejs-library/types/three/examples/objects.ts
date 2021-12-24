import { BoxGeometry, BufferGeometry, Camera, Color, ColorRepresentation, IUniform, Material, Mesh, Plane, Scene, ShaderMaterial, Side, Texture, TextureEncoding, Vector2, Vector3, Vector4, WebGLRenderer, WebGLRenderTarget } from '../index';
import { LightningStrike, RayParameters } from './geometries';

/**
 * Lensflare element
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LensflareElement) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/LensflareElement) page for a live demo.
 *
 */
export interface LensflareElement {
    new(texture: Texture, size?: number, distance?: number, color?: Color) : this;
    texture: Texture;
    size: number;
    distance: number;
    color: Color;
}

/**
 * Lensflare
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Lensflare) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Lensflare) page for a live demo.
 *
 */
export interface Lensflare extends Mesh {
    new() : this;
    readonly isLensflare: true;

    addElement(element: LensflareElement): void;
    dispose(): void;
}

/**
 * Storm params
 */
export interface StormParams {
    size?: number;
    minHeight?: number;
    maxHeight?: number;
    maxSlope?: number;

    maxLightnings?: number;

    lightningMinPeriod?: number;
    lightningMaxPeriod?: number;
    lightningMinDuration?: number;
    lightningMaxDuration?: number;

    lightningParameters?: RayParameters;
    lightningMaterial?: Material;

    isEternal?: boolean;

    onRayPosition?: (source: Vector3, dest: Vector3) => void;
    onLightningDown?: (lightning: LightningStrike) => void;
}

/**
 * Lightning storm
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LightningStorm) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/LightningStorm) page for a live demo.
 *
 */
export interface LightningStorm extends Mesh{
    new(stormParams?: StormParams) : this;
    update(time: number): void;
    clone() : this;
}

/**
 * Marching cubes
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MarchingCubes) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/MarchingCubes) page for a live demo.
 *
 */
export interface MarchingCubes extends Mesh {
    new(
        resolution: number,
        material: Material,
        enableUvs?: boolean,
        enableColors?: boolean,
        maxPolyCount?: number,
    ) : this;

    enableUvs: boolean;
    enableColors: boolean;

    resolution: number;

    // parameters

    isolation: number;

    // size of field, 32 is pushing it in Javascript :)

    size: number;
    size2: number;
    size3: number;
    halfsize: number;

    // deltas

    delta: number;
    yd: number;
    zd: number;

    field: Float32Array;
    normal_cache: Float32Array;
    palette: Float32Array;

    maxCount: number;
    count: number;

    hasPositions: boolean;
    hasNormals: boolean;
    hasColors: boolean;
    hasUvs: boolean;

    positionArray: Float32Array;
    normalArray: Float32Array;

    uvArray: Float32Array;
    colorArray: Float32Array;

    begin(): void;
    end(): void;

    init(resolution: number): void;

    addBall(ballx: number, bally: number, ballz: number, strength: number, subtract: number, colors?: Color): void;

    addPlaneX(strength: number, subtract: number): void;
    addPlaneY(strength: number, subtract: number): void;
    addPlaneZ(strength: number, subtract: number): void;

    setCell(x: number, y: number, z: number, value: number): void;
    getCell(x: number, y: number, z: number): number;

    blur(intensity: number): void;

    reset(): void;
    render(renderCallback: any): void;
    generateGeometry(): BufferGeometry;
    generateBufferGeometry(): BufferGeometry;
}

/**
 * Reflector shader
 */
export interface ReflectorShader {
    defines: {
        DISTANCE_ATTENUATION: boolean;
        FRESNEL: boolean;
    };
    uniforms: {
        [key: string]: IUniform;
    };
    vertexShader: string;
    fragmentShader: string;
}

/**
 * Reflector options
 */
export interface ReflectorOptions {
    color?: ColorRepresentation;
    textureWidth?: number;
    textureHeight?: number;
    clipBias?: number;
    shader?: object;
    encoding?: TextureEncoding;
}

/**
 * Reflector
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Reflector) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Reflector) page for a live demo.
 *
 */
export interface Reflector extends Mesh {
    new(geometry?: BufferGeometry, options?: ReflectorOptions) : this;
    getRenderTarget(): WebGLRenderTarget;
}

/**
 * Reflector for ssrpass options
 */
export interface ReflectorForSSRPassOptions {
    clipBias?: number | undefined;
    textureWidth?: number | undefined;
    textureHeight?: number | undefined;
    color?: ColorRepresentation |undefined;
    useDepthTexture?: boolean | undefined;
    shader?: ReflectorShader | object | undefined;
    encoding?: TextureEncoding;
}

/**
 * Reflector for ssrpass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ReflectorForSSRPass) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/ReflectorForSSRPass) page for a live demo.
 *
 */
export interface ReflectorForSSRPass extends Mesh<BufferGeometry> {
    type: 'ReflectorForSSRPass';
    options: ReflectorOptions;

    ReflectorShader: ReflectorShader;

    needsUpdate: boolean;
    maxDistance: number;
    opacity: number;

    get distanceAttenuation(): boolean;
    set distanceAttenuation(val: boolean);
    get fresnel(): boolean;
    set fresnel(val: boolean);

    material: ShaderMaterial;

    renderTarget: WebGLRenderTarget;

    new(geometry: BufferGeometry, options: ReflectorForSSRPassOptions) : this;

    doRender: (renderer: WebGLRenderer, scene: Scene, camera: Camera) => void;

    getRenderTarget: () => WebGLRenderTarget;
}

/**
 * Reflector rtt
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ReflectorRTT) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/ReflectorRTT) page for a live demo.
 *
 */
export interface ReflectorRTT extends ReflectorForSSRPass {
    new(geometry?: BufferGeometry, options?: ReflectorForSSRPassOptions) : this;
}

/**
 * Refractor options
 */
export interface RefractorOptions {
    color?: ColorRepresentation;
    textureWidth?: number;
    textureHeight?: number;
    clipBias?: number;
    shader?: object;
    encoding?: TextureEncoding;
}

/**
 * Refractor
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Refractor) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Refractor) page for a live demo.
 *
 */
export interface Refractor extends Mesh {
    new(geometry?: BufferGeometry, options?: RefractorOptions) : this;

    getRenderTarget(): WebGLRenderTarget;
}

/**
 * Shadow mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ShadowMesh) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/ShadowMesh) page for a live demo.
 *
 */
export interface ShadowMesh extends Mesh {
    new( mesh : Mesh ) : this;

    update(plane: Plane, lightPosition4D: Vector4): void;
}

/**
 * Sky
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sky) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Sky) page for a live demo.
 *
 */
export interface Sky extends Mesh {
    new() : this;

    geometry: BoxGeometry;
    material: ShaderMaterial;

    SkyShader: object;
}

/**
 * Water options
 */
export interface WaterOptions {
    textureWidth?: number;
    textureHeight?: number;
    clipBias?: number;
    alpha?: number;
    time?: number;
    waterNormals?: Texture;
    sunDirection?: Vector3;
    sunColor?: ColorRepresentation;
    waterColor?: ColorRepresentation;
    eye?: Vector3;
    distortionScale?: number;
    side?: Side;
    fog?: boolean;
}

/**
 * Water
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Water) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Water) page for a live demo.
 *
 */
export interface Water extends Mesh {
    material: ShaderMaterial;
    new(geometry: BufferGeometry, options: WaterOptions) : this;
}

/**
 * Water2 options
 */
export interface Water2Options {
    color?: ColorRepresentation;
    textureWidth?: number;
    textureHeight?: number;
    clipBias?: number;
    flowDirection?: Vector2;
    flowSpeed?: number;
    reflectivity?: number;
    scale?: number;
    shader?: object;
    flowMap?: Texture;
    normalMap0?: Texture;
    normalMap1?: Texture;
    encoding?: TextureEncoding;
}

/**
 * Water2
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Water2) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Water2) page for a live demo.
 *
 */
export interface Water2 extends Mesh {
    material: ShaderMaterial;
    new(geometry: BufferGeometry, options: Water2Options) : this;
}
