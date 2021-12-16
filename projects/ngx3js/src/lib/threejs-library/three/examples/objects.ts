import { BoxGeometry, BufferGeometry, Camera, Color, ColorRepresentation, IUniform, Material, Mesh, Plane, Scene, ShaderMaterial, Side, Texture, TextureEncoding, Vector2, Vector3, Vector4, WebGLRenderer, WebGLRenderTarget } from '../index';
import { LightningStrike, RayParameters } from './geometries';

export interface LensflareElement {
    new(texture: Texture, size?: number, distance?: number, color?: Color) : this;
    texture: Texture;
    size: number;
    distance: number;
    color: Color;
}

export interface Lensflare extends Mesh {
    new() : this;
    readonly isLensflare: true;

    addElement(element: LensflareElement): void;
    dispose(): void;
}

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

export interface LightningStorm {
    new(stormParams?: StormParams) : this;
    update(time: number): void;
    copy(source: LightningStorm): LightningStorm;
    clone() : this;
}

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

export interface ReflectorOptions {
    color?: ColorRepresentation;
    textureWidth?: number;
    textureHeight?: number;
    clipBias?: number;
    shader?: object;
    encoding?: TextureEncoding;
}

export interface Reflector extends Mesh {
    new(geometry?: BufferGeometry, options?: ReflectorOptions) : this;
    getRenderTarget(): WebGLRenderTarget;
}


export interface ReflectorForSSRPassOptions {
    clipBias?: number | undefined;
    textureWidth?: number | undefined;
    textureHeight?: number | undefined;
    color?: ColorRepresentation |undefined;
    useDepthTexture?: boolean | undefined;
    shader?: ReflectorShader | object | undefined;
    encoding?: TextureEncoding;
}

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

export interface ReflectorRTT extends ReflectorForSSRPass {
    new(geometry?: BufferGeometry, options?: ReflectorForSSRPassOptions) : this;
}

export interface RefractorOptions {
    color?: ColorRepresentation;
    textureWidth?: number;
    textureHeight?: number;
    clipBias?: number;
    shader?: object;
    encoding?: TextureEncoding;
}

export interface Refractor extends Mesh {
    new(geometry?: BufferGeometry, options?: RefractorOptions) : this;

    getRenderTarget(): WebGLRenderTarget;
}

export interface ShadowMesh extends Mesh {
    new( mesh : Mesh ) : this;

    update(plane: Plane, lightPosition4D: Vector4): void;
}

export interface Sky extends Mesh {
    new() : this;

    geometry: BoxGeometry;
    material: ShaderMaterial;

    SkyShader: object;
}

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

export interface Water extends Mesh {
    material: ShaderMaterial;
    new(geometry: BufferGeometry, options: WaterOptions) : this;
}

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

export interface Water2 extends Mesh {
    material: ShaderMaterial;
    new(geometry: BufferGeometry, options: Water2Options) : this;
}
