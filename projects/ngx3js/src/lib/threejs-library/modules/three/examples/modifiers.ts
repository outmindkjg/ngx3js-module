import { Flow as O3JS_Flow, InstancedFlow as O3JS_InstancedFlow } from 'three/examples/jsm/modifiers/CurveModifier';
import { EdgeSplitModifier as O3JS_EdgeSplitModifier } from 'three/examples/jsm/modifiers/EdgeSplitModifier';
import { SimplifyModifier as O3JS_SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier';
import { TessellateModifier as O3JS_TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier';
import * as I3JS from '../../../types/three/examples/modifiers';

export type Flow = I3JS.Flow;
export const Flow: Flow = O3JS_Flow as any;

export type InstancedFlow = I3JS.InstancedFlow;
export const InstancedFlow: InstancedFlow = O3JS_InstancedFlow as any;

export type EdgeSplitModifier = I3JS.EdgeSplitModifier;
export const EdgeSplitModifier: EdgeSplitModifier = O3JS_EdgeSplitModifier as any;

export type SimplifyModifier = I3JS.SimplifyModifier;
export const SimplifyModifier: SimplifyModifier = O3JS_SimplifyModifier as any;

export type TessellateModifier = I3JS.TessellateModifier;
export const TessellateModifier: TessellateModifier = O3JS_TessellateModifier as any;

