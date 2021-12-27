import { CubeTexture, LightProbe, WebGLRenderer, WebGLCubeRenderTarget } from '../index';

/**
 * Light probe generator
 */
export interface LightProbeGenerator {
	fromCubeTexture(cubeTexture: CubeTexture): LightProbe;
	fromCubeRenderTarget(renderer: WebGLRenderer, cubeRenderTarget: WebGLCubeRenderTarget): LightProbe;
}

/**
 * Rect area light uniforms lib
 */
export interface RectAreaLightUniformsLib {
	init(): void;
}

/**
 * Rect area light uniforms lib
 */
export interface RectAreaLightUniformsLib {
	init(): void;
}
