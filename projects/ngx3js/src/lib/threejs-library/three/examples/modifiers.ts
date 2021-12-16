import {
    BufferGeometry, Curve, DataTexture, InstancedMesh, Material, Mesh, Uniform, Vector3
} from '../index';

export interface SplineUniform {
    spineTexture: Uniform;
    pathOffset: Uniform;
    pathSegment: Uniform;
    spineOffset: Uniform;
    flow: Uniform;
}
export interface initSplineTexture{
    (size?: number): DataTexture;
}

export interface updateSplineTexture{
    (texture: DataTexture, splineCurve: Curve<Vector3>, offset?: number): void;
}

export interface getUniforms{
    (splineTexture: DataTexture): SplineUniform;
}

export interface modifyShader{
    (material: Material, uniforms: SplineUniform, numberOfCurves?: number): void;
}

export interface Flow {
    new(mesh: Mesh, numberOfCurves?: number) : this;
    curveArray: number[];
    curveLengthArray: number[];
    object3D: Mesh;
    splineTexure: DataTexture;
    uniforms: SplineUniform;
    updateCurve(index: number, curve: Curve<Vector3>): void;
    moveAlongCurve(amount: number): void;
}

export interface InstancedFlow extends Flow {
    new(count: number, curveCount: number, geometry: BufferGeometry, material: Material) : this;
    object3D: InstancedMesh;
    offsets: number[];
    whichCurve: number[];

    moveIndividualAlongCurve(index: number, offset: number): void;
    setCurve(index: number, curveNo: number): void;
}

export interface EdgeSplitModifier {
    new() : this;

    /**
     * @param geometry					The geometry to modify by splitting edges.
     * 									This geometry can be any of any type: Geometry or BufferGeometry, indexed or
     * 									not...
     *
     * @param cutOffPoint				The cutoff angle in radians. If the angle between two face normals is higher
     * 									than this value, a split will be made.
     *
     * @param [tryKeepNormals = true]	Set to true to keep the normal values for vertices that won't be split.
     * 									To use this feature, you also need to pass an indexed geometry with a 'normal'
     * 									BufferAttribute.
     */
    modify(geometry: BufferGeometry, cutOffPoint: number, tryKeepNormals: boolean): BufferGeometry;
}

export interface SimplifyModifier {
    new() : this;
    modify(geometry: BufferGeometry, count: number): BufferGeometry;
}

export interface TessellateModifier {
    new(maxEdgeLength?: number, maxIterations?: number) : this;
    maxEdgeLength: number;
    maxIterations: number;

    modify<TGeometry extends BufferGeometry>(geometry: TGeometry): TGeometry;
}
