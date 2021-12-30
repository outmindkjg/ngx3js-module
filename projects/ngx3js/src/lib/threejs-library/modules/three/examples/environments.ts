// @ts-nocheck
import { RoomEnvironment as O3JS_RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { DebugEnvironment as O3JS_DebugEnvironment } from 'three/examples/jsm/environments/DebugEnvironment';
import * as I3JS from '../../../types/three/examples/environments';

export type RoomEnvironment = I3JS.RoomEnvironment;
export const RoomEnvironment: RoomEnvironment = O3JS_RoomEnvironment as any;

export type DebugEnvironment = I3JS.DebugEnvironment;
export const DebugEnvironment: DebugEnvironment = O3JS_DebugEnvironment as any;
