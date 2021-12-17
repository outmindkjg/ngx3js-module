import {
	ArrayCamera as O3JS_ArrayCamera,
	Camera as O3JS_Camera,
	CubeCamera as O3JS_CubeCamera,
	OrthographicCamera as O3JS_OrthographicCamera,
	PerspectiveCamera as O3JS_PerspectiveCamera,
	StereoCamera as O3JS_StereoCamera,
} from 'three';
import * as I3JS from '../../types/three/cameras';

export type ArrayCamera = I3JS.ArrayCamera;
export const ArrayCamera: ArrayCamera = O3JS_ArrayCamera as any;

export type Camera = I3JS.Camera;
export const Camera: Camera = O3JS_Camera as any;

export type CubeCamera = I3JS.CubeCamera;
export const CubeCamera: CubeCamera = O3JS_CubeCamera as any;

export type OrthographicCamera = I3JS.OrthographicCamera;
export const OrthographicCamera: OrthographicCamera = O3JS_OrthographicCamera as any;

export type PerspectiveCamera = I3JS.PerspectiveCamera;
export const PerspectiveCamera: PerspectiveCamera = O3JS_PerspectiveCamera as any;

export type StereoCamera = I3JS.StereoCamera;
export const StereoCamera: StereoCamera = O3JS_StereoCamera as any;
