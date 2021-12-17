import { Fog as O3JS_Fog, FogExp2 as O3JS_FogExp2, Scene as O3JS_Scene } from 'three';
import * as I3JS from '../../types/three/scenes';

export type Fog = I3JS.Fog;
export const Fog: Fog = O3JS_Fog as any;

export type FogExp2 = I3JS.FogExp2;
export const FogExp2: FogExp2 = O3JS_FogExp2 as any;

export type Scene = I3JS.Scene;
export const Scene: Scene = O3JS_Scene as any;
