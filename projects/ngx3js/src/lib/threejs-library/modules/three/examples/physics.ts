import { AmmoPhysics as O3JS_AmmoPhysics } from 'three/examples/jsm/physics/AmmoPhysics';
import * as I3JS from '../../../types/three/examples/physics';
import { OimoPhysics as O3JS_OimoPhysics } from './OimoPhysics';

export type AmmoPhysics = I3JS.AmmoPhysics;
export const AmmoPhysics: AmmoPhysics = O3JS_AmmoPhysics as any;

export type OimoPhysics = I3JS.OimoPhysics;
export const OimoPhysics: OimoPhysics = O3JS_OimoPhysics as any;

