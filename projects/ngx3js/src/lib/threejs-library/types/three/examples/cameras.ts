import {
    OrthographicCamera, PerspectiveCamera, Scene, ShaderMaterial, WebGLRenderer, WebGLRenderTarget
} from '../index';

export interface CinematicCamera extends PerspectiveCamera {
    new(fov: number, aspect: number, near: number, far: number) : this;

    postprocessing: {
        enabled: boolean;
        scene: Scene;
        camera: OrthographicCamera;
        rtTextureDepth: WebGLRenderTarget;
        rtTextureColor: WebGLRenderTarget;
        bokeh_uniforms: any;
    };
    shaderSettings: {
        rings: number;
        samples: number;
    };
    materialDepth: ShaderMaterial;
    coc: number;
    aperture: number;
    fNumber: number;
    hyperFocal: number;
    filmGauge: number;

    linearize(depth: number): number;
    smoothstep(near: number, far: number, depth: number): number;
    saturate(x: number): number;
    focusAt(focusDistance: number): void;
    initPostProcessing(): void;
    renderCinematic(scene: Scene, renderer: WebGLRenderer): void;
    setLens(focalLength: number, frameHeight?: number, fNumber?: number, coc?: number): void;
}
