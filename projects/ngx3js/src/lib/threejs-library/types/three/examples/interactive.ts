import { Frustum, Object3D, Scene, Vector2, Vector3, Camera, Group, Mesh, WebGLRenderer } from '../index';

/**
 * Htmlmesh
 */
export interface HTMLMesh extends Mesh {
    new(dom: HTMLElement) : this;
}

/**
 * Interactive group
 */
export interface InteractiveGroup extends Group {
    new(renderer: WebGLRenderer, camera: Camera) : this;
}

/**
 * Selection box
 */
export interface SelectionBox {
    new(camera: Camera, scene: Scene, deep?: number) : this;
    camera: Camera;
    collection: Mesh[];
    deep: number;
    endPoint: Vector3;
    scene: Scene;
    startPoint: Vector3;

    select(startPoint?: Vector3, endPoint?: Vector3): Mesh[];
    updateFrustum(startPoint: Vector3, endPoint: Vector3): void;
    searchChildInFrustum(frustum: Frustum, object: Object3D): void;
}

/**
 * Selection helper
 */
export interface SelectionHelper {
    new(selectionBox: SelectionBox, renderer: WebGLRenderer, cssClassName: string) : this;
    element: HTMLElement;
    isDown: boolean;
    pointBottomRight: Vector2;
    pointTopLeft: Vector2;
    renderer: WebGLRenderer;
    startPoint: Vector2;

    onSelectStart(event: Event): void;
    onSelectMove(event: Event): void;
    onSelectOver(event: Event): void;
}
