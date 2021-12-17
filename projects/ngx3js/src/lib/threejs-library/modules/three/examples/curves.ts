import { Curves as O3JS_Curves } from 'three/examples/jsm/curves/CurveExtras';
import { NURBSCurve as O3JS_NURBSCurve } from 'three/examples/jsm/curves/NURBSCurve';
import { NURBSSurface as O3JS_NURBSSurface } from 'three/examples/jsm/curves/NURBSSurface';
import * as O3JS_NURBSUtils from 'three/examples/jsm/curves/NURBSUtils';
import * as I3JS from '../../../types/three/examples/curves';

export type Curves = I3JS.Curves;
export const Curves: Curves = O3JS_Curves as any;

export type NURBSCurve = I3JS.NURBSCurve;
export const NURBSCurve: NURBSCurve = O3JS_NURBSCurve as any;

export type NURBSSurface = I3JS.NURBSSurface;
export const NURBSSurface: NURBSSurface = O3JS_NURBSSurface as any;

export type NURBSUtils = I3JS.NURBSUtils;
export const NURBSUtils: NURBSUtils = O3JS_NURBSUtils as any;

