import * as O3JS_Stats from 'three/examples/jsm/libs/stats.module';
import { TWEEN as O3JS_TWEEN } from './tween.module';
import * as O3JS_Fflate from './fflate.module';
import { GUI as O3JS_GUI } from './lil-gui';

import * as I3JS from '../../../types/three/examples/libs';

import { MeshoptDecoder as O3JS_MeshoptDecoder } from './meshopt_decoder.module';

export type Stats = I3JS.Stats;
export const Stats: Stats = O3JS_Stats.default as any;

export type GUI = I3JS.GUI;
export const GUI: GUI = O3JS_GUI as any;

export type unzip = I3JS.unzip;
export const unzip: unzip = O3JS_Fflate.unzip as any;
export type unzipSync = I3JS.unzipSync;
export const unzipSync: unzipSync = O3JS_Fflate.unzipSync as any;
export type strFromU8 = I3JS.strFromU8;
export const strFromU8: strFromU8 = O3JS_Fflate.strFromU8 as any;
export type Deflate = I3JS.Deflate;
export const Deflate: Deflate = O3JS_Fflate.Deflate as any;
export type AsyncDeflate = I3JS.AsyncDeflate;
export const AsyncDeflate: AsyncDeflate = O3JS_Fflate.AsyncDeflate as any;
export type AsyncDecompress = I3JS.AsyncDecompress;
export const AsyncDecompress: AsyncDecompress = O3JS_Fflate.AsyncDecompress as any;
export type AsyncGunzip = I3JS.AsyncGunzip;
export const AsyncGunzip: AsyncGunzip = O3JS_Fflate.AsyncGunzip as any;
export type AsyncGzip = I3JS.AsyncGzip;
export const AsyncGzip: AsyncGzip = O3JS_Fflate.AsyncGzip as any;
export type AsyncInflate = I3JS.AsyncInflate;
export const AsyncInflate: AsyncInflate = O3JS_Fflate.AsyncInflate as any;
export type AsyncUnzipInflate = I3JS.AsyncUnzipInflate;
export const AsyncUnzipInflate: AsyncUnzipInflate = O3JS_Fflate.AsyncUnzipInflate as any;
export type AsyncUnzlib = I3JS.AsyncUnzlib;
export const AsyncUnzlib: AsyncUnzlib = O3JS_Fflate.AsyncUnzlib as any;
export type AsyncZipDeflate = I3JS.AsyncZipDeflate;
export const AsyncZipDeflate: AsyncZipDeflate = O3JS_Fflate.AsyncZipDeflate as any;
export type AsyncZlib = I3JS.AsyncZlib;
export const AsyncZlib: AsyncZlib = O3JS_Fflate.AsyncZlib as any;
export type DecodeUTF8 = I3JS.DecodeUTF8;
export const DecodeUTF8: DecodeUTF8 = O3JS_Fflate.DecodeUTF8 as any;
export type Decompress = I3JS.Decompress;
export const Decompress: Decompress = O3JS_Fflate.Decompress as any;
export type EncodeUTF8 = I3JS.EncodeUTF8;
export const EncodeUTF8: EncodeUTF8 = O3JS_Fflate.EncodeUTF8 as any;
export type Gunzip = I3JS.Gunzip;
export const Gunzip: Gunzip = O3JS_Fflate.Gunzip as any;
export type Gzip = I3JS.Gzip;
export const Gzip: Gzip = O3JS_Fflate.Gzip as any;
export type Inflate = I3JS.Inflate;
export const Inflate: Inflate = O3JS_Fflate.Inflate as any;
export type Unzip = I3JS.Unzip;
export const Unzip: Unzip = O3JS_Fflate.Unzip as any;
export type UnzipInflate = I3JS.UnzipInflate;
export const UnzipInflate: UnzipInflate = O3JS_Fflate.UnzipInflate as any;
export type UnzipPassThrough = I3JS.UnzipPassThrough;
export const UnzipPassThrough: UnzipPassThrough = O3JS_Fflate.UnzipPassThrough as any;
export type Unzlib = I3JS.Unzlib;
export const Unzlib: Unzlib = O3JS_Fflate.Unzlib as any;
export type Zip = I3JS.Zip;
export const Zip: Zip = O3JS_Fflate.Zip as any;
export type ZipDeflate = I3JS.ZipDeflate;
export const ZipDeflate: ZipDeflate = O3JS_Fflate.ZipDeflate as any;
export type ZipPassThrough = I3JS.ZipPassThrough;
export const ZipPassThrough: ZipPassThrough = O3JS_Fflate.ZipPassThrough as any;
export type Zlib = I3JS.Zlib;
export const Zlib: Zlib = O3JS_Fflate.Zlib as any;

export type TWEEN = I3JS.TWEEN;
export const TWEEN: TWEEN = O3JS_TWEEN as any;

export type Tween = I3JS.Tween;
export const Tween: Tween = O3JS_TWEEN.Tween as any;

export const MeshoptDecoder: any = O3JS_MeshoptDecoder as any;
