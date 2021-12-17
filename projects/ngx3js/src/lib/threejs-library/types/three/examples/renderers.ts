import { Camera, Color, Material, Object3D, Scene, Vector2, Vector3, Vector4 } from '../index';

export interface CSS2DObject extends Object3D {
    new(element: HTMLElement) : this;
    element: HTMLElement;

    onBeforeRender: (renderer: unknown, scene: Scene, camera: Camera) => void;
    onAfterRender: (renderer: unknown, scene: Scene, camera: Camera) => void;
}

export type CSS2DParameters = {
    element?: HTMLElement;
};

export interface CSS2DRenderer {
    new(parameters?: CSS2DParameters) : this;
    domElement: HTMLElement;

    getSize(): { width: number; height: number };
    setSize(width: number, height: number): void;
    render(scene: Scene, camera: Camera): void;
}

export interface CSS3DObject extends Object3D {
    new(element: HTMLElement) : this;
    element: HTMLElement;

    onBeforeRender: (renderer: unknown, scene: Scene, camera: Camera) => void;
    onAfterRender: (renderer: unknown, scene: Scene, camera: Camera) => void;
}

export interface CSS3DSprite extends CSS3DObject {
    new(element: HTMLElement) : this;
}

export type CSS3DParameters = {
    element?: HTMLElement;
};

export interface CSS3DRenderer {
    new(parameters?: CSS3DParameters) : this;
    domElement: HTMLElement;

    getSize(): { width: number; height: number };
    setSize(width: number, height: number): void;
    render(scene: Scene, camera: Camera): void;
}

export interface RenderableObject {
    id: number;
    object: Object3D;
    z: number;
    renderOrder: number;
}

export interface RenderableFace {
    id: number;
    v1: RenderableVertex;
    v2: RenderableVertex;
    v3: RenderableVertex;
    normalModel: Vector3;
    vertexNormalsModel: Vector3[];
    vertexNormalsLength: number;
    color: Color;
    material: Material;
    uvs: Vector2[];
    z: number;
    renderOrder: number;
}

export interface RenderableVertex {
    position: Vector3;
    positionWorld: Vector3;
    positionScreen: Vector4;
    visible: boolean;

    copy(vertex: RenderableVertex): void;
}

export interface RenderableLine {
    id: number;
    v1: RenderableVertex;
    v2: RenderableVertex;
    vertexColors: Color[];
    material: Material;
    z: number;
    renderOrder: number;
}

export interface RenderableSprite {
    id: number;
    object: Object3D;
    x: number;
    y: number;
    z: number;
    rotation: number;
    scale: Vector2;
    material: Material;
    renderOrder: number;
}

export interface Projector {
    new() : this;

    projectScene(scene: Scene, camera: Camera, sortObjects: boolean, sortElements: boolean): any;
}

export interface SVGObject extends Object3D {
    new(node: SVGElement) : this;
    node: SVGElement;
}

export interface SVGRenderer {
    new() : this;
    domElement: SVGElement;
    autoClear: boolean;
    sortObjects: boolean;
    sortElements: boolean;
    overdraw: number;
    info: { render: { vertices: number; faces: number } };

    getSize(): { width: number; height: number };
    setQuality(quality: string): void;
    setClearColor(color: Color, alpha: number): void;
    setPixelRatio(): void;
    setSize(width: number, height: number): void;
    setPrecision(precision: number): void;
    clear(): void;
    render(scene: Scene, camera: Camera): void;
}
