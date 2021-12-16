import { Camera } from './cameras';
import { Object3D } from './core';
import { Material } from './materials';
import { Color, ColorRepresentation } from './math';
import { WebGLRenderer } from './renderers';
import { Texture } from './textures';

export interface FogBase {
    name: string;
    color: Color;
    clone(): FogBase;
    toJSON(): any;
}

/**
 * This class contains the parameters that define linear fog, i.e., that grows linearly denser with the distance.
 */
export interface Fog extends FogBase {
    new( color: ColorRepresentation, near?: number, far?: number) : this;

    /**
     * @default ''
     */
    name: string;

    /**
     * Fog color.
     */
    color: Color;

    /**
     * The minimum distance to start applying fog. Objects that are less than 'near' units from the active camera won't be affected by fog.
     * @default 1
     */
    near: number;

    /**
     * The maximum distance at which fog stops being calculated and applied. Objects that are more than 'far' units away from the active camera won't be affected by fog.
     * @default 1000
     */
    far: number;

    readonly isFog: true;

    clone(): Fog;
    toJSON(): any;
}
/**
 * This class contains the parameters that define linear fog, i.e., that grows exponentially denser with the distance.
 */
export interface FogExp2 extends FogBase {
    new( hex: number | string, density?: number) : this;

    /**
     * @default ''
     */
    name: string;

    color: Color;

    /**
     * Defines how fast the fog will grow dense.
     * @default 0.00025
     */
    density: number;

    readonly isFogExp2: true;

    clone(): FogExp2;
    toJSON(): any;
}

// Scenes /////////////////////////////////////////////////////////////////////

/**
 * Scenes allow you to set up what and where is to be rendered by three.js. This is where you place objects, lights and cameras.
 */
export interface Scene extends Object3D {
    new( ) : this;

    type: 'Scene';

    /**
     * A fog instance defining the type of fog that affects everything rendered in the scene. Default is null.
     * @default null
     */
    fog: FogBase | null;

    /**
     * If not null, it will force everything in the scene to be rendered with that material. Default is null.
     * @default null
     */
    overrideMaterial: Material | null;

    /**
     * @default true
     */
    autoUpdate: boolean;

    /**
     * @default null
     */
    background: null | Color | Texture;

    /**
     * @default null
     */
    environment: null | Texture;

    readonly isScene: true;

    /**
     * Calls before rendering scene
     */
    onBeforeRender: (
        renderer: WebGLRenderer,
        scene: Scene,
        camera: Camera,
        renderTarget: any, // any required for Object3D.onBeforeRender compatibility
    ) => void;

    /**
     * Calls after rendering scene
     */
    onAfterRender: (renderer: WebGLRenderer, scene: Scene, camera: Camera) => void;

    toJSON(meta?: any): any;
}
