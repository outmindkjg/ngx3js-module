import { RoomEnvironment as O3JS_RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import * as I3JS from '../../../types/three/examples/environments';

export type RoomEnvironment = I3JS.RoomEnvironment;
export const RoomEnvironment: RoomEnvironment = O3JS_RoomEnvironment as any;

