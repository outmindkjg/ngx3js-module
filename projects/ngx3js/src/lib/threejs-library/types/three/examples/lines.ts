import {
    BufferGeometry, Color, EdgesGeometry,
    InstancedBufferGeometry, Line, LineSegments, MaterialParameters, Matrix4, Mesh, ShaderMaterial, Vector2, WireframeGeometry
} from '../index';

/**
 * Line2
 */
export interface Line2 extends LineSegments2 {
    geometry: LineGeometry;
    material: LineMaterial;

    new(geometry?: LineGeometry, material?: LineMaterial) : this;
    readonly isLine2: true;
}

/**
 * Line geometry
 */
export interface LineGeometry extends LineSegmentsGeometry {
    new() : this;
    readonly isLineGeometry: true;

    fromLine(line: Line) : this;
}

/**
 * Line material parameters
 */
export interface LineMaterialParameters extends MaterialParameters {
    alphaToCoverage?: boolean | undefined;
    color?: number | undefined;
    dashed?: boolean | undefined;
    dashScale?: number | undefined;
    dashSize?: number | undefined;
    dashOffset?: number | undefined;
    gapSize?: number | undefined;
    linewidth?: number | undefined;
    resolution?: Vector2 | undefined;
    wireframe?: boolean | undefined;
    worldUnits?: boolean | undefined;
}

/**
 * Line material
 */
export interface LineMaterial extends ShaderMaterial {
    new(parameters?: LineMaterialParameters) : this;
    color: Color;
    dashed: boolean;
    dashScale: number;
    dashSize: number;
    dashOffset: number;
    gapSize: number;
    opacity: number;
    readonly isLineMaterial: true;
    linewidth: number;
    resolution: Vector2;
    alphaToCoverage: boolean;
    worldUnits: boolean;
}

/**
 * Line segments2
 */
export interface LineSegments2 extends Mesh {
    geometry: LineSegmentsGeometry;
    material: LineMaterial;

    new(geometry?: LineSegmentsGeometry, material?: LineMaterial) : this;
    readonly isLineSegments2: true;

    computeLineDistances() : this;
}

/**
 * Line segments geometry
 */
export interface LineSegmentsGeometry extends InstancedBufferGeometry {
    new() : this;
    readonly isLineSegmentsGeometry: true;

    applyMatrix4(matrix: Matrix4) : this;
    computeBoundingBox(): void;
    computeBoundingSphere(): void;
    fromEdgesGeometry(geometry: EdgesGeometry) : this;
    fromLineSegments(lineSegments: LineSegments) : this;
    fromMesh(mesh: Mesh) : this;
    fromWireframeGeometry(geometry: WireframeGeometry) : this;
    setColors(array: number[] | Float32Array) : this;
    setPositions(array: number[] | Float32Array) : this;
}

/**
 * Wireframe
 */
export interface Wireframe extends Mesh {
    new(geometry?: LineSegmentsGeometry, material?: LineMaterial) : this;
    readonly isWireframe: true;

    computeLineDistances() : this;
}

/**
 * Wireframe geometry2
 */
export interface WireframeGeometry2 extends LineSegmentsGeometry {
    new(geometry: BufferGeometry) : this;
    readonly sWireframeGeometry2: boolean;
}
