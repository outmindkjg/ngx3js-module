import { Camera } from './cameras';
import { BufferGeometry, InstancedBufferAttribute, Intersection, Object3D, Raycaster } from './core';
import { Material, SpriteMaterial } from './materials';
import { Color, Matrix4, Vector2, Vector3 } from './math';
import { DataTexture } from './textures';

// Objects //////////////////////////////////////////////////////////////////////////////////

export interface Bone extends Object3D {
    new( ) : this;
    readonly isBone: true;
    type: 'Bone';
}

export interface Group extends Object3D {
    new( ) : this;
    type: 'Group';
    readonly isGroup: true;
}

export interface InstancedMesh<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
> extends Mesh<TGeometry, TMaterial> {
    new( geometry: TGeometry | undefined, material: TMaterial | undefined, count: number) : this;

    count: number;
    instanceColor: null | InstancedBufferAttribute;
    instanceMatrix: InstancedBufferAttribute;
    readonly isInstancedMesh: true;

    getColorAt(index: number, color: Color): void;
    getMatrixAt(index: number, matrix: Matrix4): void;
    setColorAt(index: number, color: Color): void;
    setMatrixAt(index: number, matrix: Matrix4): void;
    dispose(): void;
}

export interface LOD extends Object3D {
    new( ) : this;

    type: 'LOD';

    levels: Array<{ distance: number; object: Object3D }>;
    autoUpdate: boolean;
    readonly isLOD: true;

    addLevel(object: Object3D, distance?: number): this;
    getCurrentLevel(): number;
    getObjectForDistance(distance: number): Object3D | null;
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
    update(camera: Camera): void;
    toJSON(meta: any): any;

    /**
     * @deprecated Use {@link LOD#levels .levels} instead.
     */
    objects: any[];
}

export interface Line<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
> extends Object3D {
    new( geometry?: TGeometry, material?: TMaterial) : this;

    geometry: TGeometry;
    material: TMaterial;

    type: 'Line' | 'LineLoop' | 'LineSegments' | string;
    readonly isLine: true;

    morphTargetInfluences?: number[] | undefined;
    morphTargetDictionary?: { [key: string]: number } | undefined;

    computeLineDistances(): this;
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
    updateMorphTargets(): void;
}

export interface LineLoop<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
> extends Line<TGeometry, TMaterial> {
    new( geometry?: TGeometry, material?: TMaterial) : this;

    type: 'LineLoop';
    readonly isLineLoop: true;
}

export interface LineSegments<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
> extends Line<TGeometry, TMaterial> {
    new( geometry?: TGeometry, material?: TMaterial) : this;

    /**
     * @default 'LineSegments'
     */
    type: 'LineSegments' | string;
    readonly isLineSegments: true;
}

export interface Mesh<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
> extends Object3D {
    new( geometry?: TGeometry, material?: TMaterial) : this;

    geometry: TGeometry;
    material: TMaterial;
    morphTargetInfluences?: number[] | undefined;
    morphTargetDictionary?: { [key: string]: number } | undefined;
    readonly isMesh: true;
    type: string;

    updateMorphTargets(): void;
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}

/**
 * A class for displaying points. The points are rendered by the WebGLRenderer using gl.POINTS.
 */
export interface Points<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
> extends Object3D {
    /**
     * @param geometry An instance of BufferGeometry.
     * @param material An instance of Material (optional).
     */
    new( geometry?: TGeometry, material?: TMaterial) : this;

    type: 'Points';
    morphTargetInfluences?: number[] | undefined;
    morphTargetDictionary?: { [key: string]: number } | undefined;
    readonly isPoints: true;

    /**
     * An instance of BufferGeometry, where each vertex designates the position of a particle in the system.
     */
    geometry: TGeometry;

    /**
     * An instance of Material, defining the object's appearance. Default is a PointsMaterial with randomised colour.
     */
    material: TMaterial;

    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
    updateMorphTargets(): void;
}

export interface Skeleton {
    new( bones: Bone[], boneInverses?: Matrix4[]) : this;

    uuid: string;
    bones: Bone[];
    boneInverses: Matrix4[];
    boneMatrices: Float32Array;
    boneTexture: null | DataTexture;
    boneTextureSize: number;
    frame: number;

    init(): void;
    calculateInverses(): void;
    computeBoneTexture(): this;
    pose(): void;
    update(): void;
    clone(): Skeleton;
    getBoneByName(name: string): undefined | Bone;
    dispose(): void;

    /**
     * @deprecated This property has been removed completely.
     */
    useVertexTexture: boolean;
}

export interface SkinnedMesh<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
> extends Mesh<TGeometry, TMaterial> {
    new( geometry?: TGeometry, material?: TMaterial, useVertexTexture?: boolean) : this;

    bindMode: string;
    bindMatrix: Matrix4;
    bindMatrixInverse: Matrix4;
    skeleton: Skeleton;
    readonly isSkinnedMesh: true;

    bind(skeleton: Skeleton, bindMatrix?: Matrix4): void;
    pose(): void;
    normalizeSkinWeights(): void;
    updateMatrixWorld(force?: boolean): void;
    boneTransform(index: number, target: Vector3): Vector3;
}

export interface Sprite extends Object3D {
    new( material?: SpriteMaterial) : this;

    type: 'Sprite';
    readonly isSprite: true;

    geometry: BufferGeometry;
    material: SpriteMaterial;
    center: Vector2;

    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
    copy(source: this): this;
}
