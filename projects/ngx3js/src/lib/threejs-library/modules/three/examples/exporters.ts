import { ColladaExporter as O3JS_ColladaExporter } from 'three/examples/jsm/exporters/ColladaExporter';
import { DRACOExporter as O3JS_DRACOExporter } from 'three/examples/jsm/exporters/DRACOExporter';
import { GLTFExporter as O3JS_GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { MMDExporter as O3JS_MMDExporter } from 'three/examples/jsm/exporters/MMDExporter';
import { OBJExporter as O3JS_OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
import { PLYExporter as O3JS_PLYExporter } from 'three/examples/jsm/exporters/PLYExporter';
import { STLExporter as O3JS_STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { USDZExporter as O3JS_USDZExporter } from 'three/examples/jsm/exporters/USDZExporter';
import * as I3JS from '../../../types/three/examples/exporters';

export type ColladaExporter = I3JS.ColladaExporter;
export const ColladaExporter: ColladaExporter = O3JS_ColladaExporter as any;

export type DRACOExporter = I3JS.DRACOExporter;
export const DRACOExporter: DRACOExporter = O3JS_DRACOExporter as any;

export type GLTFExporter = I3JS.GLTFExporter;
export const GLTFExporter: GLTFExporter = O3JS_GLTFExporter as any;

export type MMDExporter = I3JS.MMDExporter;
export const MMDExporter: MMDExporter = O3JS_MMDExporter as any;

export type OBJExporter = I3JS.OBJExporter;
export const OBJExporter: OBJExporter = O3JS_OBJExporter as any;

export type PLYExporter = I3JS.PLYExporter;
export const PLYExporter: PLYExporter = O3JS_PLYExporter as any;

export type STLExporter = I3JS.STLExporter;
export const STLExporter: STLExporter = O3JS_STLExporter as any;

export type USDZExporter = I3JS.USDZExporter;
export const USDZExporter: USDZExporter = O3JS_USDZExporter as any;

