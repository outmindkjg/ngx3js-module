import { BoxLineGeometry as O3JS_BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry';
import { ConvexGeometry as O3JS_ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import {
	DecalGeometry as O3JS_DecalGeometry,
	DecalVertex as O3JS_DecalVertex,
} from 'three/examples/jsm/geometries/DecalGeometry';
import { LightningStrike as O3JS_LightningStrike } from 'three/examples/jsm/geometries/LightningStrike';
import { ParametricGeometries as O3JS_ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries';
import { ParametricGeometry as O3JS_ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import { RoundedBoxGeometry as O3JS_RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import { TeapotGeometry as O3JS_TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry';
import { TextGeometry as O3JS_TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import * as I3JS from '../../../types/three/examples/geometries';

export type BoxLineGeometry = I3JS.BoxLineGeometry;
export const BoxLineGeometry: BoxLineGeometry = O3JS_BoxLineGeometry as any;

export type ConvexGeometry = I3JS.ConvexGeometry;
export const ConvexGeometry: ConvexGeometry = O3JS_ConvexGeometry as any;

export type DecalGeometry = I3JS.DecalGeometry;
export const DecalGeometry: DecalGeometry = O3JS_DecalGeometry as any;

export type DecalVertex = I3JS.DecalVertex;
export const DecalVertex: DecalVertex = O3JS_DecalVertex as any;

export type LightningStrike = I3JS.LightningStrike;
export const LightningStrike: LightningStrike = O3JS_LightningStrike as any;

export type ParametricGeometries = I3JS.ParametricGeometries;
export const ParametricGeometries: ParametricGeometries = O3JS_ParametricGeometries as any;

export type ParametricGeometry = I3JS.ParametricGeometry;
export const ParametricGeometry: ParametricGeometry = O3JS_ParametricGeometry as any;

export { ParametricGeometry as ParametricBufferGeometry };
export { TextGeometry as TextBufferGeometry };

export type RoundedBoxGeometry = I3JS.RoundedBoxGeometry;
export const RoundedBoxGeometry: RoundedBoxGeometry = O3JS_RoundedBoxGeometry as any;

export type TeapotGeometry = I3JS.TeapotGeometry;
export const TeapotGeometry: TeapotGeometry = O3JS_TeapotGeometry as any;

export type TextGeometry = I3JS.TextGeometry;
export const TextGeometry: TextGeometry = O3JS_TextGeometry as any;
