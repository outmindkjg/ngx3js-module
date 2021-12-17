import { CinematicCamera as O3JS_CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera';
import * as I3JS from '../../../types/three/examples/cameras';

export type CinematicCamera = I3JS.CinematicCamera;
export const CinematicCamera: CinematicCamera = O3JS_CinematicCamera as any;
