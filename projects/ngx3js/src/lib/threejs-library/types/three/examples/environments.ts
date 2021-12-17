import { Scene } from '../index';

export interface RoomEnvironment extends Scene {
    new() : this;
}
