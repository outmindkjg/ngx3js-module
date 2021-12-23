import { Camera } from './cameras';
import { Object3D } from './core';
import { Material } from './materials';
import { Color, ColorRepresentation } from './math';
import { WebGLRenderer } from './renderers';
import { Texture } from './textures';

/**
 * Abstract Fog base Class
 */
export interface FogBase {
	/**
	 */
	new (): this;

	/**
	 * Optional name of the object (doesn't need to be unique). Default is an empty string.
	 * @default ''
	 */
	name: string;

	/**
	 * Fog color.  Example: If set to black, far away objects will be rendered black.
	 */
	color: Color;

	/**
	 * @returns Returns a new fog instance with the same parameters as this one.
	 */
	clone(): FogBase;

	/**
	 * @returns Return fog data in JSON format.
	 */
	toJSON(): any;
}

/**
 * This class contains the parameters that define linear fog, i.e., that grows linearly denser with the distance.
 */
export interface Fog extends FogBase {
	/**
	 * The color parameter is passed to the [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) constructor to set the color property. Color can be a hexadecimal integer or a CSS-style string.
	 */
	new (color: ColorRepresentation, near?: number, far?: number): this;

	/**
	 * Optional name of the object (doesn't need to be unique). Default is an empty string.
	 * @default ''
	 */
	name: string;

	/**
	 * Fog color.  Example: If set to black, far away objects will be rendered black.
	 */
	color: Color;

	/**
	 * The minimum distance to start applying fog. Objects that are less than 'near' units from the active camera won't be affected by fog.
	 * Default is 1.
	 * @default 1
	 */
	near: number;

	/**
	 * The maximum distance at which fog stops being calculated and applied. Objects that are more than 'far' units away from the active camera won't be affected by fog.
	 * Default is 1000.
	 * @default 1000
	 */
	far: number;

	readonly isFog: true;

	/**
	 * @returns Returns a new fog instance with the same parameters as this one.
	 */
	clone(): Fog;

	/**
	 * @returns Return fog data in JSON format.
	 */
	toJSON(): any;
}
/**
 * This class contains the parameters that define exponential squared fog, which gives a clear view near the camera and a faster than exponentially densening fog farther from the camera.
 */
export interface FogExp2 extends FogBase {
	/**
	 * The color parameter is passed to the [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) constructor to set the color property. Color can be a hexadecimal integer or a CSS-style string.
	 */
	new (hex: number | string, density?: number): this;

	/**
	 * Optional name of the object (doesn't need to be unique). Default is an empty string.
	 * @default ''
	 */
	name: string;

	/**
	 * Fog color. Example: If set to black, far away objects will be rendered black.
	 */
	color: Color;

	/**
	 * Defines how fast the fog will grow dense.
	 * Default is 0.00025.
	 * @default 0.00025
	 */
	density: number;

	readonly isFogExp2: true;

	/**
	 * @returns Returns a new FogExp2 instance with the same parameters as this one.
	 */
	clone(): FogExp2;

	/**
	 * @returns Return FogExp2 data in JSON format.
	 */
	toJSON(): any;
}

/**
 * Scenes allow you to set up what and where is to be rendered by three.js. This is where you place objects, lights and cameras.
 */
export interface Scene extends Object3D {
	/**
	 * Create a new scene object.
	 */
	new (): this;

	type: 'Scene';

	/**
	 * A [fog](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Fog) instance defining the type of fog that affects everything rendered in the scene. Default is null.
	 * @default null
	 */
	fog: FogBase | null;

	/**
	 * If not null, it will force everything in the scene to be rendered with that material. Default is null.
	 * @default null
	 */
	overrideMaterial: Material | null;

	/**
	 * Default is true. If set, then the renderer checks every frame if the scene and its objects needs matrix updates.
	 * When it isn't, then you have to maintain all matrices in the scene yourself.
	 * @default true
	 */
	autoUpdate: boolean;

	/**
	 * If not null, sets the background used when rendering the scene, and is always rendered first.
	 * Can be set to a [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) which sets the clear color, a [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) covering the canvas, a cubemap as a [CubeTexture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubeTexture) or an equirectangular as a [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture) . Default is null.
	 * @default null
	 */
	background: null | Color | Texture;

	/**
	 * If not null, this texture is set as the environment map for all physical materials in the scene.
	 * However, it's not possible to overwrite an existing texture assigned to [MeshStandardMaterial.envMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MeshStandardMaterial.envMap). Default is null.
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
		renderTarget: any // any required for Object3D.onBeforeRender compatibility
	) => void;

	/**
	 * Calls after rendering scene
	 */
	onAfterRender: (renderer: WebGLRenderer, scene: Scene, camera: Camera) => void;

	/**
	 * Convert the scene to three.js [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4).
	 * @param met object containing metadata such as textures or images for the scene.
	 */
	toJSON(meta?: any): any;
}
