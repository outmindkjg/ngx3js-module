import { CSM as O3JS_CSM } from 'three/examples/jsm/csm/CSM';
import { default as O3JS_CSMFrustum } from 'three/examples/jsm/csm/CSMFrustum';
import { CSMHelper as O3JS_CSMHelper } from 'three/examples/jsm/csm/CSMHelper';
import * as I3JS from '../../../types/three/examples/csm';

export type CSM = I3JS.CSM;
export const CSM: CSM = O3JS_CSM as any;

export type CSMFrustum = I3JS.CSMFrustum;
export const CSMFrustum: CSMFrustum = O3JS_CSMFrustum as any;

export type CSMHelper = I3JS.CSMHelper;
export const CSMHelper: CSMHelper = O3JS_CSMHelper as any;
