import { ColorRepresentation, LightProbe, Line, LineSegments, Mesh, Object3D, PositionalAudio, RectAreaLight } from '../index';

/**
 * Light probe helper
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LightProbeHelper) page for details.
 *
 * ### Examples
 * [webgl / lightprobe / cubecamera](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lightprobe_cubecamera)
 */
export interface LightProbeHelper extends Mesh {
    new(lightProbe: LightProbe, size: number) : this;

    lightProbe: LightProbe;
    size: number;

    dispose(): void;
}

/**
 * Positional audio helper
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PositionalAudioHelper) page for details.
 *
 * ### Examples
 * [webaudio / orientation](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_orientation)
 */
export interface PositionalAudioHelper extends Line {
    new(audio: PositionalAudio, range?: number, divisionsInnerAngle?: number, divisionsOuterAngle?: number) : this;

    audio: PositionalAudio;
    range: number;
    divisionsInnerAngle: number;
    divisionsOuterAngle: number;

    dispose(): void;
    update(): void;
}

/**
 * Rect area light helper
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/RectAreaLightHelper) page for details.
 *
 * ### Examples
 * [webgl / lights / rectarealight](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lights_rectarealight)
 */
export interface RectAreaLightHelper extends Line {
    new(light: RectAreaLight, color?: ColorRepresentation) : this;

    light: RectAreaLight;
    color: ColorRepresentation | undefined;

    dispose(): void;
}

/**
 * Vertex normals helper
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/VertexNormalsHelper) page for details.
 *
 * ### Examples
 * [webgl / helpers](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_helpers)
 */
export interface VertexNormalsHelper extends LineSegments {
    new(object: Object3D, size?: number, hex?: number) : this;

    object: Object3D;
    size: number;

    update(): void;
}

/**
 * Vertex tangents helper
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/VertexTangentsHelper) page for details.
 *
 * ### Examples
 * [webgl / helpers](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_helpers)
 */
export interface VertexTangentsHelper extends LineSegments {
    new(object: Object3D, size?: number, hex?: number) : this;

    object: Object3D;
    size: number;

    update(): void;
}
