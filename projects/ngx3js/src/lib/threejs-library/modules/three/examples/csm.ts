import { CSM as O3JS_CSM } from 'three/examples/jsm/csm/CSM';
// import { default as O3JS_Frustum } from 'three/examples/jsm/csm/Frustum';
import { CSMHelper as O3JS_CSMHelper } from 'three/examples/jsm/csm/CSMHelper';
import * as I3JS from '../../../types/three/examples/csm';

export type CsmControls = I3JS.CSM;
export const CsmControls: CsmControls = O3JS_CSM as any;

// export type CSMFrustum = I3JS.CSMFrustum;
// export const CSMFrustum: CSMFrustum = O3JS_Frustum as any;

export type CSMHelper = I3JS.CSMHelper;
export const CSMHelper: CSMHelper = O3JS_CSMHelper as any;
