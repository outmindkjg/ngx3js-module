import { Box3, BufferGeometry, Color, HSL, Line3, Matrix3, Matrix4, Mesh, Object3D, Plane, Ray, Sphere, Triangle, Vector3 } from '../index';

export interface Capsule {
    new(start?: Vector3, end?: Vector3, radius?: number) : this;
    start: Vector3;
    end: Vector3;
    radius: number;

    set(start: Vector3, end: Vector3, radius: number) : this;
    clone(): Capsule;
    copy(capsule: Capsule) : this;
    getCenter(target: number): Vector3;
    translate(v: Vector3) : this;
    checkAABBAxis(
        p1x: number,
        p1y: number,
        p2x: number,
        p2y: number,
        minx: number,
        maxx: number,
        miny: number,
        maxy: number,
        radius: number,
    ): boolean;
    intersectsBox(box: Box3): boolean;
    lineLineMinimumPoints(line1: Line3, line2: Line3): Vector3[];
}

export interface CMYK {
    c: number;
    m: number;
    y: number;
    k: number;
}

export interface ColorConverter {
    setHSV(color: Color, h: number, s: number, v: number): Color;
    getHSV(color: Color, target: HSL): HSL;
    setCMYK(color: Color, c: number, m: number, y: number, k: number): Color;
    getCMYK(color: Color, target: CMYK): CMYK;
}

export interface FaceEx {
    new() : this;
    normal: Vector3;
    midpoint: Vector3;
    area: number;
    constant: number;
    outside: VertexNode;
    mark: number;
    edge: HalfEdge;

    create(a: VertexNode, b: VertexNode, c: VertexNode): FaceEx;

    compute() : this;
    getEdge(i: number): HalfEdge;
}

export interface HalfEdge {
    new(vertex: VertexNode, face: FaceEx) : this;
    vertex: VertexNode;
    prev: HalfEdge;
    next: HalfEdge;
    twin: HalfEdge;
    face: FaceEx;

    head(): VertexNode;
    length(): number;
    lengthSquared(): number;
    setTwin(edge: HalfEdge) : this;
    tail(): VertexNode;
}

export interface VertexNode {
    new(point: Vector3) : this;
    point: Vector3;
    prev: VertexNode;
    next: VertexNode;
    face: FaceEx;
}

export interface VertexList {
    new() : this;
    head: VertexNode;
    tail: VertexNode;

    append(vertex: VertexNode) : this;
    appendChain(vertex: VertexNode) : this;
    clear() : this;
    first(): VertexNode;
    insertAfter(target: VertexNode, vertex: VertexNode) : this;
    insertBefore(target: VertexNode, vertex: VertexNode) : this;
    isEmpty(): boolean;
    last(): VertexNode;
    remove(vertex: VertexNode) : this;
    removeSubList(a: VertexNode, b: VertexNode) : this;
}

export interface ConvexHull {
    new() : this;
    tolerance: number;
    faces: FaceEx[];
    newFaces: FaceEx[];
    assigned: VertexList;
    unassigned: VertexList;
    vertices: VertexNode[];

    addAdjoiningFace(eyeVertex: VertexNode, horizonEdge: HalfEdge): HalfEdge;
    addNewFaces(eyeVertex: VertexNode, horizon: HalfEdge[]) : this;
    addVertexToFace(vertex: VertexNode, face: FaceEx) : this;
    addVertexToHull(eyeVertex: VertexNode) : this;
    cleanup() : this;
    compute() : this;
    computeExtremes(): object;
    computeHorizon(eyePoint: Vector3, crossEdge: HalfEdge, face: FaceEx, horizon: HalfEdge[]) : this;
    computeInitialHull() : this;
    containsPoint(point: Vector3): boolean;
    deleteFaceVertices(face: FaceEx, absorbingFace: FaceEx) : this;
    intersectRay(ray: Ray, target: Vector3): Vector3 | null;
    intersectsRay(ray: Ray): boolean;
    makeEmpty() : this;
    nextVertexToAdd(): VertexNode | undefined;
    reindexFaces() : this;
    removeAllVerticesFromFace(face: FaceEx): VertexNode | undefined;
    removeVertexFromFace(vertex: VertexNode, face: FaceEx) : this;
    resolveUnassignedPoints(newFaces: FaceEx[]) : this;
    setFromPoints(points: Vector3[]) : this;
    setFromObject(object: Object3D) : this;
}
export interface ImprovedNoise {
    new() : this;
    noise(x: number, y: number, z: number): number;
}

export interface Lut {
    new(colormap?: string, numberofcolors?: number) : this;
    lut: Color[];
    map: object[];
    n: number;
    minV: number;
    maxV: number;

    set(value: Lut) : this;
    setMin(min: number) : this;
    setMax(max: number) : this;
    setColorMap(colormap?: string, numberofcolors?: number) : this;
    copy(lut: Lut) : this;
    getColor(alpha: number): Color;
    addColorMap(colormapName: string, arrayOfColors: number[][]): void;
    createCanvas(): HTMLCanvasElement;
    updateCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement;
}

export interface ColorMapKeywords {
    rainbow: number[][];
    cooltowarm: number[][];
    blackbody: number[][];
    grayscale: number[][];
}

export interface MeshSurfaceSampler {
    distribution: Float32Array | null;
    geometry: BufferGeometry;
    positionAttribute: Float32Array;
    weightAttribute: string | null;

    new(mesh: Mesh) : this;
    binarySearch(x: number): number;
    build() : this;
    sample(targetPosition: Vector3, targetNormal?: Vector3, targetColor?: Color) : this;
    sampleFace(faceIndex: number, targetPosition: Vector3, targetNormal?: Vector3, targetColor?: Color) : this;
    setWeightAttribute(name: string | null) : this;
}

export interface OBB {
    center: Vector3;
    halfSize: Vector3;
    rotation: Matrix3;

    new(center?: Vector3, halfSize?: Vector3, rotation?: Matrix3) : this;
    set(center: Vector3, halfSize: Vector3, rotation: Matrix3) : this;
    copy(obb: OBB) : this;
    clone() : this;
    getSize(result: Vector3): Vector3;
    clampPoint(point: Vector3, result: Vector3): Vector3;
    containsPoint(point: Vector3): boolean;
    intersectsBox3(box3: Box3): boolean;
    intersectsSphere(sphere: Sphere): boolean;
    intersectsOBB(obb: OBB, epsilon: number): boolean;
    intersectsPlane(plane: Plane): boolean;
    intersectRay(ray: Ray, result: Vector3): Vector3 | null;
    intersectsRay(ray: Ray): boolean;
    fromBox3(box3: Box3) : this;
    equals(obb: OBB): boolean;
    applyMatrix4(matrix: Matrix4) : this;
}

export interface Octree {
    new(box?: Box3) : this;
    triangles: Triangle[];
    box: Box3;
    subTrees: Octree[];

    addTriangle(triangle: Triangle) : this;
    calcBox() : this;
    split(level: number) : this;
    build() : this;
    getRayTriangles(ray: Ray, triangles: Triangle[]): Triangle[];
    triangleCapsuleIntersect(capsule: Capsule, triangle: Triangle): any;
    triangleSphereIntersect(sphere: Sphere, triangle: Triangle): any;
    getSphereTriangles(sphere: Sphere, triangles: Triangle[]): Triangle[];
    getCapsuleTriangles(capsule: Capsule, triangles: Triangle[]): Triangle[];
    sphereIntersect(sphere: Sphere): any;
    capsuleIntersect(capsule: Capsule): any;
    rayIntersect(ray: Ray): any;
    fromGraphNode(group: Object3D) : this;
}
export interface SimplexNoise {
    new(r?: object) : this;
    dot(g: number[], x: number, y: number): number;
    dot3(g: number[], x: number, y: number, z: number): number;
    dot4(g: number[], x: number, y: number, z: number, w: number): number;
    noise(xin: number, yin: number): number;
    noise3d(xin: number, yin: number, zin: number): number;
    noise4d(x: number, y: number, z: number, w: number): number;
}
