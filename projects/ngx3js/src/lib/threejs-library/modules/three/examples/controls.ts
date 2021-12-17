import { ArcballControls as O3JS_ArcballControls } from 'three/examples/jsm/controls/ArcballControls';
import { DragControls as O3JS_DragControls } from 'three/examples/jsm/controls/DragControls';
import { FirstPersonControls as O3JS_FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { FlyControls as O3JS_FlyControls } from 'three/examples/jsm/controls/FlyControls';
import {
	OrbitControls as O3JS_OrbitControls,
	MapControls as O3JS_MapControls,
} from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls as O3JS_PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { TrackballControls as O3JS_TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { TransformControls as O3JS_TransformControls } from 'three/examples/jsm/controls/TransformControls';
import * as I3JS from '../../../types/three/examples/controls';

export type ArcballControls = I3JS.ArcballControls;
export const ArcballControls: ArcballControls = O3JS_ArcballControls as any;

export type DragControls = I3JS.DragControls;
export const DragControls: DragControls = O3JS_DragControls as any;

export type FirstPersonControls = I3JS.FirstPersonControls;
export const FirstPersonControls: FirstPersonControls = O3JS_FirstPersonControls as any;

export type FlyControls = I3JS.FlyControls;
export const FlyControls: FlyControls = O3JS_FlyControls as any;

export type OrbitControls = I3JS.OrbitControls;
export const OrbitControls: OrbitControls = O3JS_OrbitControls as any;

export type MapControls = I3JS.MapControls;
export const MapControls: MapControls = O3JS_MapControls as any;

export type PointerLockControls = I3JS.PointerLockControls;
export const PointerLockControls: PointerLockControls = O3JS_PointerLockControls as any;

export type TrackballControls = I3JS.TrackballControls;
export const TrackballControls: TrackballControls = O3JS_TrackballControls as any;

export type TransformControls = I3JS.TransformControls;
export const TransformControls: TransformControls = O3JS_TransformControls as any;
