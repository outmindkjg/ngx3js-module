import { AnimationClip, Mesh, Object3D, Points } from '../index';

export interface ColladaExporterOptions {
    author?: string;
    textureDirectory?: string;
    version?: string;
}

export interface ColladaExporterResult {
    data: string;
    textures: object[];
}

export interface ColladaExporter {
    new() : this;

    parse(
        object: Object3D,
        onDone: (res: ColladaExporterResult) => void,
        options: ColladaExporterOptions,
    ): ColladaExporterResult | null;
}

export interface DRACOExporterOptions {
    decodeSpeed?: number;
    encodeSpeed?: number;
    encoderMethod?: number;
    quantization?: number[];
    exportUvs?: boolean;
    exportNormals?: boolean;
    exportColor?: boolean;
}

export interface DRACOExporter {
    new() : this;

    parse(object: Mesh | Points, options: DRACOExporterOptions): Int8Array;
}

export interface GLTFExporterOptions {
    binary?: boolean;
    trs?: boolean;
    onlyVisible?: boolean;
    truncateDrawRange?: boolean;
    embedImages?: boolean;
    animations?: AnimationClip[];
    forceIndices?: boolean;
    forcePowerOfTwoTextures?: boolean;
    includeCustomExtensions?: boolean;
}

export interface GLTFExporter {
    new() : this;

    parse(input: Object3D, onCompleted: (gltf: object) => void, options: GLTFExporterOptions): void;
    parseAsync(input: Object3D, options: GLTFExporterOptions): Promise<void>;
}

export interface MMDExporter {
    new() : this;

    parseVpd(skin: Object3D, outputShiftJis: boolean, useOriginalBones: boolean): [] | Uint8Array;
}

export interface OBJExporter {
    new() : this;

    parse(object: Object3D): string;
}

export interface PLYExporterOptions {
    binary?: boolean;
    excludeAttributes?: string[];
    littleEndian?: boolean;
}

export interface PLYExporter {
    new() : this;

    parse(object: Object3D, onDone: (res: string) => void, options: PLYExporterOptions): string | null;
}

export interface STLExporterOptions {
    binary?: boolean;
}

export interface STLExporter {
    new() : this;

    parse(scene: Object3D, options?: STLExporterOptions): string;
}

export interface USDZExporter {
    new() : this;

    parse(scene: Object3D): Promise<Uint8Array>;
}
