import { LightProbeGenerator as O3JS_LightProbeGenerator } from 'three/examples/jsm/lights/LightProbeGenerator';
import * as I3JS from '../../../types/three/examples/lights';

export type LightProbeGenerator = I3JS.LightProbeGenerator;
export const LightProbeGenerator: LightProbeGenerator = O3JS_LightProbeGenerator as any;

