import { AnimationClip, Mesh, Object3D, Points } from '../index';

/**
 * Collada exporter options
 */
export interface ColladaExporterOptions {
    author?: string;
    textureDirectory?: string;
    version?: string;
}

/**
 * Collada exporter result
 */
export interface ColladaExporterResult {
    data: string;
    textures: object[];
}

/**
 * Collada exporter
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ColladaExporter) page for details.
 *
 * ### Examples
 * [misc / exporter / collada](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_collada)
 */
export interface ColladaExporter {
    new() : this;

    /**
     * Export Object
     * 
     * @param object 
     * @param onDone 
     * @param options 
     * @returns parse 
     */
    parse(
        object: Object3D,
        onDone: (res: ColladaExporterResult) => void,
        options: ColladaExporterOptions,
    ): ColladaExporterResult | null;
}

/**
 * Dracoexporter options
 */
export interface DRACOExporterOptions {
    decodeSpeed?: number;
    encodeSpeed?: number;
    encoderMethod?: number;
    quantization?: number[];
    exportUvs?: boolean;
    exportNormals?: boolean;
    exportColor?: boolean;
}

/**
 * Dracoexporter
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DRACOExporter) page for details.
 * DRACOExporter require "node_modules/ngx3js/assets/js/libs/draco/draco_encoder.js" in angular.json file. 
 * 
 * ### Examples
 * [misc / exporter / draco](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_draco)
 */
export interface DRACOExporter {
    new() : this;

    parse(object: Mesh | Points, options: DRACOExporterOptions): Int8Array;
}

/**
 * Gltfexporter options
 */
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

/**
 * Gltfexporter
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/GLTFExporter) page for details.
 *
 * ### Examples
 * [misc / exporter / gltf](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_gltf)
 */
export interface GLTFExporter {
    new() : this;

    parse(input: Object3D, onCompleted: (gltf: object) => void, options: GLTFExporterOptions): void;
    parseAsync(input: Object3D, options: GLTFExporterOptions): Promise<void>;
}

/**
 * Mmdexporter
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MMDExporter) page for details.
 */
export interface MMDExporter {
    new() : this;

    parseVpd(skin: Object3D, outputShiftJis: boolean, useOriginalBones: boolean): [] | Uint8Array;
}

/**
 * Objexporter
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/OBJExporter) page for details.
 *
 * ### Examples
 * [misc / exporter / obj](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_obj)
 */
export interface OBJExporter {
    new() : this;

    parse(object: Object3D): string;
}

/**
 * Plyexporter options
 */
export interface PLYExporterOptions {
    binary?: boolean;
    excludeAttributes?: string[];
    littleEndian?: boolean;
}

/**
 * Plyexporter
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PLYExporter) page for details.
 *
 * ### Examples
 * [misc / exporter / ply](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_ply)
 */
export interface PLYExporter {
    new() : this;

    parse(object: Object3D, onDone: (res: string) => void, options: PLYExporterOptions): string | null;
}

/**
 * Stlexporter options
 */
export interface STLExporterOptions {
    binary?: boolean;
}

/**
 * Stlexporter
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/STLExporter) page for details.
 *
 * ### Examples
 * [misc / exporter / stl](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_stl)
 */
export interface STLExporter {
    new() : this;

    parse(scene: Object3D, options?: STLExporterOptions): string;
}

/**
 * Usdzexporter
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/USDZExporter) page for details.
 *
 * ### Examples
 * [misc / exporter / usdz](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_usdz)
 */
export interface USDZExporter {
    new() : this;

    parse(scene: Object3D): Promise<Uint8Array>;
}
