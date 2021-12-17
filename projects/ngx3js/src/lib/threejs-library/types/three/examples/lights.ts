import { CubeTexture, LightProbe, WebGLRenderer, WebGLCubeRenderTarget } from '../index';

export interface LightProbeGenerator {
    fromCubeTexture(cubeTexture: CubeTexture): LightProbe;
    fromCubeRenderTarget(renderer: WebGLRenderer, cubeRenderTarget: WebGLCubeRenderTarget): LightProbe;
}

export interface RectAreaLightUniformsLib {
    init(): void;
}

export interface RectAreaLightUniformsLib {
    init(): void;
}
