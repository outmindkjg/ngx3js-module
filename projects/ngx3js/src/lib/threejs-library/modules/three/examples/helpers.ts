import { LightProbeHelper as O3JS_LightProbeHelper } from 'three/examples/jsm/helpers/LightProbeHelper';
import { PositionalAudioHelper as O3JS_PositionalAudioHelper } from 'three/examples/jsm/helpers/PositionalAudioHelper';
import { RectAreaLightHelper as O3JS_RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { VertexNormalsHelper as O3JS_VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper';
import { VertexTangentsHelper as O3JS_VertexTangentsHelper } from 'three/examples/jsm/helpers/VertexTangentsHelper';
import * as I3JS from '../../../types/three/examples/helpers';

export type LightProbeHelper = I3JS.LightProbeHelper;
export const LightProbeHelper: LightProbeHelper = O3JS_LightProbeHelper as any;

export type PositionalAudioHelper = I3JS.PositionalAudioHelper;
export const PositionalAudioHelper: PositionalAudioHelper = O3JS_PositionalAudioHelper as any;

export type RectAreaLightHelper = I3JS.RectAreaLightHelper;
export const RectAreaLightHelper: RectAreaLightHelper = O3JS_RectAreaLightHelper as any;

export type VertexNormalsHelper = I3JS.VertexNormalsHelper;
export const VertexNormalsHelper: VertexNormalsHelper = O3JS_VertexNormalsHelper as any;

export type VertexTangentsHelper = I3JS.VertexTangentsHelper;
export const VertexTangentsHelper: VertexTangentsHelper = O3JS_VertexTangentsHelper as any;

