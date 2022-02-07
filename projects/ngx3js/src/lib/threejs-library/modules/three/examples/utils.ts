import * as O3JS_BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import * as O3JS_CameraUtils from 'three/examples/jsm/utils/CameraUtils';
import * as O3JS_GeometryCompressionUtils from 'three/examples/jsm/utils/GeometryCompressionUtils';
import * as O3JS_GeometryUtils from 'three/examples/jsm/utils/GeometryUtils';
// import { RoughnessMipmapper as O3JS_RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper';
import * as O3JS_SceneUtils from 'three/examples/jsm/utils/SceneUtils';
import { ShadowMapViewer as O3JS_ShadowMapViewer } from 'three/examples/jsm/utils/ShadowMapViewer';
import * as O3JS_SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';
import { UVsDebug as O3JS_UVsDebug } from 'three/examples/jsm/utils/UVsDebug';
import * as I3JS from '../../../types/three/examples/utils';

export type CameraUtils = I3JS.CameraUtils;
export const CameraUtils: CameraUtils = O3JS_CameraUtils as any;

export type GeometryCompressionUtils = I3JS.GeometryCompressionUtils;
export const GeometryCompressionUtils: GeometryCompressionUtils = O3JS_GeometryCompressionUtils as any;

// export type RoughnessMipmapper = I3JS.RoughnessMipmapper;
// export const RoughnessMipmapper: RoughnessMipmapper = O3JS_RoughnessMipmapper as any;

export type SceneUtils = I3JS.SceneUtils;
export const SceneUtils: SceneUtils = O3JS_SceneUtils as any;

export type ShadowMapViewer = I3JS.ShadowMapViewer;
export const ShadowMapViewer: ShadowMapViewer = O3JS_ShadowMapViewer as any;

export type SkeletonUtils = I3JS.SkeletonUtils;
export const SkeletonUtils: SkeletonUtils = O3JS_SkeletonUtils as any;

export type UVsDebug = I3JS.UVsDebug;
export const UVsDebug: UVsDebug = O3JS_UVsDebug as any;

export type GeometryUtils = I3JS.GeometryUtils;
export const GeometryUtils: GeometryUtils = {
	mergeBufferAttributes: O3JS_BufferGeometryUtils.mergeBufferAttributes as any,
	mergeBufferGeometries: O3JS_BufferGeometryUtils.mergeBufferGeometries as any,
	interleaveAttributes: O3JS_BufferGeometryUtils.interleaveAttributes as any,
	estimateBytesUsed: O3JS_BufferGeometryUtils.estimateBytesUsed as any,
	mergeVertices: O3JS_BufferGeometryUtils.mergeVertices as any,
	toTrianglesDrawMode: O3JS_BufferGeometryUtils.toTrianglesDrawMode as any,
	computeMorphedAttributes: O3JS_BufferGeometryUtils.computeMorphedAttributes as any,
	hilbert2D: (O3JS_GeometryUtils as any).hilbert2D,
	hilbert3D: (O3JS_GeometryUtils as any).hilbert3D,
	gosper: (O3JS_GeometryUtils as any).gosper,
};
