import { Camera, Matrix3, Scene, Vector2, Vector4, WebGLRenderer, WebGLRenderTarget, WebGLShadowMap } from '../index';

/**
 * Anaglyph effect
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnaglyphEffect) page for details.
 * See the [webgl / effects / anaglyph](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_anaglyph) page for a live demo.
 *
 * ### Examples
 * [webgl / effects / anaglyph](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_anaglyph)
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
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AsciiEffect) page for details.
 * See the [webgl / effects / ascii](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_ascii) page for a live demo.
 *
 * ### Examples
 * [webgl / effects / ascii](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_ascii)
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
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/OutlineEffect) page for details.
 * See the [webgl / materials / variations / toon](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_ascii) page for a live demo.
 *
 * ### Examples
 * [webgl / materials / variations / toon](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_variations_toon) |
 * [webgl / loader / mmd](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_mmd) |
 * [webgl / loader / mmd / pose](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_mmd_pose) |
 * [webgl / loader / mmd / audio](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_mmd_audio)
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
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ParallaxBarrierEffect) page for details.
 * See the [webgl / effects / parallaxbarrier](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_parallaxbarrier) page for a live demo.
 *
 * ### Examples
 * [webgl / effects / parallaxbarrier](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_parallaxbarrier)
 */
export interface ParallaxBarrierEffect {
    new(renderer: WebGLRenderer) : this;

    render(scene: Scene, camera: Camera): void;
    setSize(width: number, height: number): void;
}

/**
 * Peppers ghost effect
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PeppersGhostEffect) page for details.
 * See the [webgl / effects / peppersghost](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_peppersghost) page for a live demo.
 *
 * ### Examples
 * [webgl / effects / peppersghost](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_peppersghost)
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
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/StereoEffect) page for details.
 * See the [webgl / effects / stereo](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_stereo) page for a live demo.
 *
 * ### Examples
 * [webgl / effects / stereo](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_stereo)
 */
export interface StereoEffect {
    new(renderer: WebGLRenderer) : this;

    setEyeSeparation(eyeSep: number): void;
    render(scene: Scene, camera: Camera): void;
    setSize(width: number, height: number): void;
}
