import { ColorRepresentation, LightProbe, Line, LineSegments, Mesh, Object3D, PositionalAudio, RectAreaLight } from '../index';

export interface LightProbeHelper extends Mesh {
    new(lightProbe: LightProbe, size: number) : this;

    lightProbe: LightProbe;
    size: number;

    dispose(): void;
}

export interface PositionalAudioHelper extends Line {
    new(audio: PositionalAudio, range?: number, divisionsInnerAngle?: number, divisionsOuterAngle?: number) : this;

    audio: PositionalAudio;
    range: number;
    divisionsInnerAngle: number;
    divisionsOuterAngle: number;

    dispose(): void;
    update(): void;
}

export interface RectAreaLightHelper extends Line {
    new(light: RectAreaLight, color?: ColorRepresentation) : this;

    light: RectAreaLight;
    color: ColorRepresentation | undefined;

    dispose(): void;
}

export interface VertexNormalsHelper extends LineSegments {
    new(object: Object3D, size?: number, hex?: number) : this;

    object: Object3D;
    size: number;

    update(): void;
}

export interface VertexTangentsHelper extends LineSegments {
    new(object: Object3D, size?: number, hex?: number) : this;

    object: Object3D;
    size: number;

    update(): void;
}
