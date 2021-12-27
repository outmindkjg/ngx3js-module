import { Camera, Matrix3, Scene, Vector2, Vector4, WebGLRenderer, WebGLRenderTarget, WebGLShadowMap } from '../index';

/**
 * Anaglyph effect
 */
export interface AnaglyphEffect {
    new(renderer: WebGLRenderer, width?: number, height?: number) : this;
    colorMatrixLeft: Matrix3;
    colorMatrixRight: Matrix3;

    dispose(): void;
    render(scene: Scene, camera: Camera): void;
    setSize(width: number, height: number): void;
}

/**
 * Ascii effect options
 */
export interface AsciiEffectOptions {
    resolution?: number;
    scale?: number;
    color?: boolean;
    alpha?: boolean;
    block?: boolean;
    invert?: boolean;
}

/**
 * Ascii effect
 */
export interface AsciiEffect {
    new(renderer: WebGLRenderer, charSet?: string, options?: AsciiEffectOptions) : this;
    domElement: HTMLElement;

    render(scene: Scene, camera: Camera): void;
    setSize(width: number, height: number): void;
}

/**
 * Outline effect parameters
 */
export interface OutlineEffectParameters {
    defaultThickness?: number | undefined;
    defaultColor?: number[] | undefined;
    defaultAlpha?: number | undefined;
    defaultKeepAlive?: boolean | undefined;
}

/**
 * Outline effect
 */
export interface OutlineEffect {
    new(renderer: WebGLRenderer, parameters?: OutlineEffectParameters) : this;
    enabled: boolean;
    autoClear: boolean;
    domElement: HTMLElement;
    shadowMap: WebGLShadowMap;

    clear(color?: boolean, depth?: boolean, stencil?: boolean): void;
    getPixelRatio(): number;
    getSize(target: Vector2): Vector2;
    render(scene: Scene, camera: Camera): void;
    renderOutline(scene: Scene, camera: Camera): void;
    setRenderTarget(renderTarget: WebGLRenderTarget | null): void;
    setPixelRatio(value: number): void;
    setScissor(x: Vector4 | number, y?: number, width?: number, height?: number): void;
    setScissorTest(enable: boolean): void;
    setSize(width: number, height: number, updateStyle?: boolean): void;
    setViewport(x: Vector4 | number, y?: number, width?: number, height?: number): void;
}

/**
 * Parallax barrier effect
 */
export interface ParallaxBarrierEffect {
    new(renderer: WebGLRenderer) : this;

    render(scene: Scene, camera: Camera): void;
    setSize(width: number, height: number): void;
}

/**
 * Peppers ghost effect
 */
export interface PeppersGhostEffect {
    new(renderer: WebGLRenderer) : this;
    cameraDistance: number;
    reflectFromAbove: boolean;

    render(scene: Scene, camera: Camera): void;
    setSize(width: number, height: number): void;
}

/**
 * Stereo effect
 */
export interface StereoEffect {
    new(renderer: WebGLRenderer) : this;

    setEyeSeparation(eyeSep: number): void;
    render(scene: Scene, camera: Camera): void;
    setSize(width: number, height: number): void;
}
