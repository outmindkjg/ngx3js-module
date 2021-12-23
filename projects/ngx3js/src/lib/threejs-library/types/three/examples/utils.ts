import {
    AnimationClip, Bone, BufferAttribute, BufferGeometry, Group, InstancedMesh, InterleavedBufferAttribute, Light, Line, Material, Matrix4, Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera, Points, Renderer, Scene, Skeleton, SkeletonHelper, TrianglesDrawModes, Vector3, WebGLRenderer
} from '../index';

export interface mergeBufferGeometries{
    (geometries: BufferGeometry[], useGroups?: boolean): BufferGeometry;
}
export interface mergeBufferAttributes{
    (attributes: BufferAttribute[]): BufferAttribute;
}
export interface interleaveAttributes{
    (attributes: BufferAttribute[]): InterleavedBufferAttribute;
}
export interface estimateBytesUsed{
    (geometry: BufferGeometry): number;
}
export interface mergeVertices{
    (geometry: BufferGeometry, tolerance?: number): BufferGeometry;
}
export interface toTrianglesDrawMode{
    (geometry: BufferGeometry, drawMode: TrianglesDrawModes): BufferGeometry;
}
export interface computeMorphedAttributes{
    (object: Mesh | Line | Points): object;
}

export interface CameraUtils {
    frameCorners(
        camera: PerspectiveCamera,
        bottomLeftCorner: Vector3,
        bottomRightCorner: Vector3,
        topLeftCorner: Vector3,
        estimateViewFrustum?: boolean,
    ): void;
}

export interface GeometryCompressionUtils {
    compressNormals(mesh: Mesh, encodeMethod: string): void;
    compressPositions(mesh: Mesh): void;
    compressUvs(mesh: Mesh): void;
}

export interface GeometryUtils {
	mergeBufferAttributes?(attributes: BufferAttribute[]): BufferAttribute;
	mergeBufferGeometries?(geometries: BufferGeometry[], useGroups?: boolean): BufferGeometry;
	interleaveAttributes?(attributes: BufferAttribute[]): InterleavedBufferAttribute;
	estimateBytesUsed?(geometry: BufferGeometry): number;
	mergeVertices?(geometry: BufferGeometry, tolerance?: number): BufferGeometry;
	toTrianglesDrawMode?(geometry: BufferGeometry, drawMode: TrianglesDrawModes): BufferGeometry;
	computeMorphedAttributes?(object: Mesh | Line | Points): object;
	hilbert2D?(
		center?: Vector3,
		size?: number,
		iterations?: number,
		v0?: number,
		v1?: number,
		v2?: number,
		v3?: number
	): Vector3[];
	hilbert3D?(
		center?: Vector3,
		size?: number,
		iterations?: number,
		v0?: number,
		v1?: number,
		v2?: number,
		v3?: number,
		v4?: number,
		v5?: number,
		v6?: number,
		v7?: number
	): Vector3[];
	gosper?(size?: number): number[];
}

export interface RoughnessMipmapper {
    new(renderer: WebGLRenderer) : this;
    generateMipmaps(material: MeshStandardMaterial): void;
    dispose(): void;
}

export interface SceneUtils {
    createMeshesFromInstancedMesh(instancedMesh: InstancedMesh): Group;
    createMultiMaterialObject(geometry: BufferGeometry, materials: Material[]): Group;
}

export interface Size {
    width: number;
    height: number;
    set: (width: number, height: number) => void;
}

export interface Position {
    x: number;
    y: number;
    set: (x: number, y: number) => void;
}

export interface ShadowMapViewer {
    new(light: Light) : this;

    enabled: boolean;
    size: Size;
    position: Position;
    render(renderer: Renderer): void;
    updateForWindowResize(): void;
    update(): void;
}

export interface SkeletonUtils {
    retarget(target: Object3D | Skeleton, source: Object3D | Skeleton, options: {}): void;

    retargetClip(
        target: Skeleton | Object3D,
        source: Skeleton | Object3D,
        clip: AnimationClip,
        options: {},
    ): AnimationClip;

    getHelperFromSkeleton(skeleton: Skeleton): SkeletonHelper;

    getSkeletonOffsets(target: Object3D | Skeleton, source: Object3D | Skeleton, options: {}): Matrix4[];

    renameBones(skeleton: Skeleton, names: {}): any;

    getBones(skeleton: Skeleton | Bone[]): Bone[];

    getBoneByName(name: string, skeleton: Skeleton): Bone;

    getNearestBone(bone: Bone, names: {}): Bone;

    findBoneTrackData(name: string, tracks: any[]): {};

    getEqualsBonesNames(skeleton: Skeleton, targetSkeleton: Skeleton): string[];

    clone(source: Object3D): Object3D;
}

export interface UVsDebug{
    (geometry: BufferGeometry, size: number): HTMLCanvasElement;
}
