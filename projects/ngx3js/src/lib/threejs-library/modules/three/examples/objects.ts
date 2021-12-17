import { Lensflare as O3JS_Lensflare, LensflareElement as O3JS_LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { LightningStorm as O3JS_LightningStorm } from 'three/examples/jsm/objects/LightningStorm';
import { MarchingCubes as O3JS_MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';
import { Reflector as O3JS_Reflector } from 'three/examples/jsm/objects/Reflector';
import * as O3JS_ReflectorForSSRPass from 'three/examples/jsm/objects/ReflectorForSSRPass';
import { ReflectorRTT as O3JS_ReflectorRTT } from 'three/examples/jsm/objects/ReflectorRTT';
import { Refractor as O3JS_Refractor } from 'three/examples/jsm/objects/Refractor';
import { ShadowMesh as O3JS_ShadowMesh } from 'three/examples/jsm/objects/ShadowMesh';
import { Sky as O3JS_Sky } from 'three/examples/jsm/objects/Sky';
import { Water as O3JS_Water } from 'three/examples/jsm/objects/Water';
import { Water as O3JS_Water2 } from 'three/examples/jsm/objects/Water2';
import * as I3JS from '../../../types/three/examples/objects';

export type LensflareElement = I3JS.LensflareElement;
export const LensflareElement: LensflareElement = O3JS_LensflareElement as any;

export type Lensflare = I3JS.Lensflare;
export const Lensflare: Lensflare = O3JS_Lensflare as any;

export type LightningStorm = I3JS.LightningStorm;
export const LightningStorm: LightningStorm = O3JS_LightningStorm as any;

export type MarchingCubes = I3JS.MarchingCubes;
export const MarchingCubes: MarchingCubes = O3JS_MarchingCubes as any;

export type Reflector = I3JS.Reflector;
export const Reflector: Reflector = O3JS_Reflector as any;

export type ReflectorForSSRPass = I3JS.ReflectorForSSRPass;
export const ReflectorForSSRPass: ReflectorForSSRPass = (O3JS_ReflectorForSSRPass as any).ReflectorForSSRPass as any;

export type ReflectorRTT = I3JS.ReflectorRTT;
export const ReflectorRTT: ReflectorRTT = O3JS_ReflectorRTT as any;

export type Refractor = I3JS.Refractor;
export const Refractor: Refractor = O3JS_Refractor as any;

export type ShadowMesh = I3JS.ShadowMesh;
export const ShadowMesh: ShadowMesh = O3JS_ShadowMesh as any;

export type Sky = I3JS.Sky;
export const Sky: Sky = O3JS_Sky as any;

export type Water = I3JS.Water;
export const Water: Water = O3JS_Water as any;

export type Water2 = I3JS.Water2;
export const Water2: Water2 = O3JS_Water2 as any;

