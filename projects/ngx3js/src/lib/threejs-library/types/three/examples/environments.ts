import { Scene } from '../index';

/**
 * Room environment
 */
export interface RoomEnvironment extends Scene {
    new() : this;
}

 /**
  * Debug environment
  */
 export interface DebugEnvironment extends Scene {
    new() : this;
}
