import { Scene } from '../index';

/**
 * Room environment
 */
export interface RoomEnvironment extends Scene {
    new() : this;
}
