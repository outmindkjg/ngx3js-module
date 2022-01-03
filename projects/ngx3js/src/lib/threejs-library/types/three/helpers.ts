import { Camera } from './cameras';
import { Object3D } from './core';
import { DirectionalLight, HemisphereLight, Light, PointLight } from './lights';
import { MeshBasicMaterial } from './materials';
import { Box3, Color, ColorRepresentation, Matrix4, Plane, Vector3 } from './math';
import { Bone, Line, LineSegments, Mesh } from './objects';

/**
 * An 3D arrow object for visualizing directions.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ArrowHelper) page for details.
 *
 * ### Examples
 * [WebGL / shadowmesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_shadowmesh)
 *
 * ### Code Example
 * ```js
 * const dir = new THREE.Vector3( 1, 2, 0 );
 * // normalize the direction vector (convert to vector of length 1)
 * dir.normalize();
 * const origin = new THREE.Vector3( 0, 0, 0 );
 * const length = 1;
 * const hex = 0xffff00;
 * const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
 * scene.add( arrowHelper );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-helper [type]="'ArrowHelper'" [dirX]="1" [dirY]="2" [dirZ]="0" [originX]="0" [originY]="0" [originZ]="0" [color]="'0xffff00'" [length]="1"></ngx3js-helper>
 * ```
 */
export interface ArrowHelper extends Object3D {
	/**
	 * @param dir direction from origin. Must be a unit vector.
	 * @param origin Point at which the arrow starts.
	 * @param length length of the arrow. Default is *1*.
	 * @param hex hexadecimal value to define color. Default is 0xffff00.
	 * @param headLength The length of the head of the arrow. Default is 0.2 * length.
	 * @param headWidth The width of the head of the arrow. Default is 0.2 * headLength.
	 */
	new (
		dir?: Vector3,
		origin?: Vector3,
		length?: number,
		color?: ColorRepresentation,
		headLength?: number,
		headWidth?: number
	): this;

	/**
	 * @default 'ArrowHelper'
	 */
	type: string;

	/**
	 * Contains the line part of the arrowHelper.
	 */
	line: Line;

	/**
	 * Contains the cone part of the arrowHelper.
	 */
	cone: Mesh;

	/**
	 * @param dir The desired direction. Must be a unit vector.
	 */
	setDirection(dir: Vector3): void;

	/**
	 * @param length The desired length.
	 * @param headLength The length of the head of the arrow.
	 * @param headWidth The width of the head of the arrow.
	 */
	setLength(length: number, headLength?: number, headWidth?: number): void;

	/**
	 * Sets the color of the arrowHelper.
	 * @param color The desired color.
	 */
	setColor(color: ColorRepresentation): void;
}

/**
 * An axis object to visualize the 3 axes in a simple way.
 * The X axis is red. The Y axis is green. The Z axis is blue.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AxesHelper) page for details.
 *
 * ### Examples
 * [WebGL / buffergeometry / compression](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_compression) |
 * [WebGL / geometry / convex](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_convex) |
 * [WebGL / loader / nrrd](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_nrrd) |
 * [misc / animation / keys](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_animation_keys) |
 * [webgl / loader / pcd](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_pcd)
 *
 * ### Code Example
 * ```js
 * const axesHelper = new THREE.AxesHelper( 5 );
 * scene.add( axesHelper );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-helper [type]="'AxesHelper'" [size]="5"></ngx3js-helper>
 * ```
 */
export interface AxesHelper extends LineSegments {
	/**
	 * @param size size of the lines representing the axes. Default is *1*.
	 */
	new (size?: number): this;

	/**
	 * @default 'AxesHelper'
	 */
	type: string;

	/**
	 * Sets the axes colors
	 *
	 * @param xAxisColor
	 * @param yAxisColor
	 * @param zAxisColor
	 */
	setColors(xAxisColor: Color, yAxisColor: Color, zAxisColor: Color): this;

	/**
	 * Disposes of the internally-created [material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line.material) and [geometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line.geometry) used by this helper.
	 */
	dispose(): void;
}

/**
 * Helper object to visualize a [Box3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3Helper) page for details.
 *
 * ### Code Example
 * ```js
 * const box = new THREE.Box3();
 * box.setFromCenterAndSize( new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 2, 1, 3 ) );
 * const helper = new THREE.Box3Helper( box, 0xffff00 );
 * scene.add( helper );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-helper [type]="'Box3Helper'"></ngx3js-helper>
 * ```
 */
export interface Box3Helper extends LineSegments {
	/**
	 * Creates a new wireframe box that represents the passed Box3.
	 * @param box The Box3 to show.
	 * @param color The box's color. Default is 0xffff00.
	 */
	new (box: Box3, color?: Color): this;

	/**
	 * @default 'Box3Helper'
	 */
	type: string;

	/**
	 * The Box3 being visualized.
	 */
	box: Box3;
}

/**
 * Helper object to graphically show the world-axis-aligned bounding box around an object. The actual bounding box is handled with [Box3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3), this is just a visual helper for debugging.
 * It can be automatically resized with the [BoxHelper.update](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BoxHelper.update) method when the object it's created from is transformed.
 * Note that the object must have a [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry) for this to work, so it won't work with [Sprites](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sprite).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BoxHelper) page for details.
 *
 * ### Examples
 * [WebGL / helpers](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_helpers) |
 * [WebGL / loader / nrrd](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_nrrd) |
 * [WebGL / buffergeometry / drawrange](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_drawrange)
 *
 * ### Code Example
 * ```js
 * const sphere = new THREE.SphereGeometry();
 * const object = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( 0xff0000 ) );
 * const box = new THREE.BoxHelper( object, 0xffff00 );
 * scene.add( box );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'SphereGeometry'"></ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [color]="'0xff0000'"></ngx3js-material>
 * 	<ngx3js-helper [type]="'BoxHelper'" [color]="'0xffff00'"></ngx3js-helper>
 * </ngx3js-mesh>
 * ```
 */
export interface BoxHelper extends LineSegments {
	/**
	 * Creates a new wireframe box that bounds the passed object. Internally this uses [Box3.setFromObject](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3.setFromObject) to calculate the dimensions. Note that this includes any children.
	 * @param object The object3D to show the world-axis-aligned boundingbox.
	 * @param color hexadecimal value that defines the box's color. Default is 0xffff00.
	 */
	new (object: Object3D, color?: ColorRepresentation): this;

	/**
	 * @default 'BoxHelper'
	 */
	type: string;

	/**
	 * Updates the helper's geometry to match the dimensions of the object, including any children. See [Box3.setFromObject](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3.setFromObject).
	 */
	update(object?: Object3D): void;

	/**
	 * Updates the wireframe box for the passed object.
	 * @param object Object3D to create the helper of.
	 */
	setFromObject(object: Object3D): this;
}

/**
 * This helps with visualizing what a camera contains in its frustum.
 * It visualizes the frustum of a camera using a [LineSegments](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineSegments).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CameraHelper) page for details.
 *
 * ### Examples
 * [WebGL / camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_camera) |
 * [WebGL / extrude / splines](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_extrude_splines)
 * [webaudio / orientation](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_orientation)
 * [webgl / animation / multiple](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_animation_multiple)
 * [webgl / animation / skinning / blending](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_animation_skinning_blending)
 *
 * ### Code Example
 * ```js
 * const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
 * const helper = new THREE.CameraHelper( camera );
 * scene.add( helper );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-camera [type]="'perspective'" [fov]="75" [near]="0.1" [far]="1000">
 * 	<ngx3js-helper [type]="'CameraHelper'"></ngx3js-helper>
 * </ngx3js-camera>
 * ```
 */
export interface CameraHelper extends LineSegments {
	/**
	 * This create a new CameraHelper for the specified camera.
	 * @param camer A The camera to visualize.
	 */
	new (camera: Camera): this;

	/**
	 */
	camera: Camera;

	/**
	 * This contains the points used to visualize the camera.
	 */
	pointMap: { [id: string]: number[] };

	/**
	 * @default 'CameraHelper'
	 */
	type: string;

	/**
	 * Updates the helper based on the projectionMatrix of the camera.
	 */
	update(): void;

	/**
	 * Disposes of the internally-created [material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line.material) and [geometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line.geometry) used by this helper.
	 */
	dispose(): void;
}

/**
 * Helper object to assist with visualizing a [DirectionalLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DirectionalLight)'s effect on the scene.
 * This consists of plane and a line representing the light's position and direction.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DirectionalLightHelper) page for details.
 *
 * ### Examples
 * [webgl / lights / hemisphere](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lights_hemisphere)
 * [webgl / pmrem / test](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_pmrem_test)
 * [webgl / shadowmap / pcss](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_shadowmap_pcss)
 *
 * ### Code Example
 * ```js
 * const light = new THREE.DirectionalLight( 0xFFFFFF );
 * const helper = new THREE.DirectionalLightHelper( light, 5 );
 * scene.add( helper );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-light [type]="'DirectionalLight'" [color]="'0xffffff'">
 * 	<ngx3js-helper [type]="'DirectionalLightHelper'" [size]="5"></ngx3js-helper>
 * </ngx3js-light>
 * ```
 */
export interface DirectionalLightHelper extends Object3D {
	/**
	 * @param light The light to be visualized.
	 * @param size dimensions of the plane. Default is *1*.
	 * @param color if this is not the set the helper will take the color of the light.
	 */
	new (light: DirectionalLight, size?: number, color?: ColorRepresentation): this;

	/**
	 * Reference to the [directionalLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DirectionalLight) being visualized.
	 */
	light: DirectionalLight;

	/**
	 * Contains the line mesh showing the location of the directional light.
	 */
	lightPlane: Line;

	/**
	 */
	targetLine: Line;

	/**
	 * The color parameter passed in the constructor. Default is *undefined*. If this is changed, the helper's color will update the next time *.update* is called.
	 * @default undefined
	 */
	color: ColorRepresentation | undefined;

	/**
	 */
	matrix: Matrix4;

	/**
	 * @default false
	 */
	matrixAutoUpdate: boolean;

	/**
	 * Dispose of the directionalLightHelper.
	 */
	dispose(): void;

	/**
	 * Updates the helper to match the position and direction of the *.light* being visualized.
	 */
	update(): void;
}

/**
 * The GridHelper is an object to define grids. Grids are two-dimensional arrays of lines.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/GridHelper) page for details.
 *
 * ### Examples
 * [WebGL / helpers](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_helpers)
 * [misc / controls / transform](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_controls_transform)
 * [webaudio / sandbox](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_sandbox)
 * [webgl / animation / skinning / morph](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_animation_skinning_morph)
 * [webgl / interactive / voxelpainter](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_interactive_voxelpainter)
 *
 * ### Code Example
 * ```js
 * const size = 10;
 * const divisions = 10;
 * const gridHelper = new THREE.GridHelper( size, divisions );
 * scene.add( gridHelper );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-helper [type]="'GridHelper'" [size]="10" [divisions]="10"></ngx3js-helper>
 * ```
 */
export interface GridHelper extends LineSegments {
	/**
	 * @param size The size of the grid. Default is 10.
	 * @param divisions The number of divisions across the grid. Default is 10.
	 * @param color1 The color of the centerline. This can be a [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color), a hexadecimal value and an CSS-Color name. Default is 0x444444
	 * @param color2 The color of the lines of the grid. This can be a [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color), a hexadecimal value and an CSS-Color name. Default is 0x888888
	 */
	new (size?: number, divisions?: number, color1?: ColorRepresentation, color2?: ColorRepresentation): this;

	/**
	 * @default 'GridHelper'
	 */
	type: string;
}

/**
 * Creates a visual aid consisting of a spherical [Mesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Mesh) for a [HemisphereLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/HemisphereLight).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/HemisphereLightHelper) page for details.
 *
 * ### Examples
 * [webgl / lights / hemisphere](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lights_hemisphere)
 *
 * ### Code Example
 * ```js
 * const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
 * const helper = new THREE.HemisphereLightHelper( light, 5 );
 * scene.add( helper );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-light [type]="'HemisphereLight'" [skyColor]="'0xffffbb'" [groundColor]="'0x080820'" [intensity]="1">
 * 	<ngx3js-helper [type]="'HemisphereLightHelper'"></ngx3js-helper>
 * </ngx3js-light>
 * ```
 */
export interface HemisphereLightHelper extends Object3D {
	/**
	 * @param light The light being visualized.
	 * @param size The size of the mesh used to visualize the light.
	 * @param color if this is not the set the helper will take the color of the light.
	 */
	new (light: HemisphereLight, size: number, color?: ColorRepresentation): this;

	/**
	 * Reference to the HemisphereLight being visualized.
	 */
	light: HemisphereLight;

	/**
	 * Reference to the hemisphereLight's [matrixWorld](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrixWorld).
	 */
	matrix: Matrix4;

	/**
	 * See [Object3D.matrixAutoUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrixAutoUpdate). Set to *false* here as the helper is using the hemisphereLight's [matrixWorld](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrixWorld).
	 */
	matrixAutoUpdate: boolean;

	/**
	 */
	material: MeshBasicMaterial;

	/**
	 * The color parameter passed in the constructor. Default is *undefined*. If this is changed, the helper's color will update the next time *.update* is called.
	 */
	color: ColorRepresentation | undefined;

	/**
	 * Dispose of the hemisphereLightHelper.
	 */
	dispose(): void;

	/**
	 * Updates the helper to match the position and direction of the *.light*.
	 */
	update(): void;
}

/**
 * Helper object to visualize a [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PlaneHelper) page for details.
 *
 * ### Examples
 * [webgl / clipping / intersection](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_clipping_intersection) |
 * [webgl / clipping / stencil](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_clipping_stencil)
 *
 * ### Code Example
 * ```js
 * const plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
 * const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
 * scene.add( helper );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-helper [type]="'PlaneHelper'"></ngx3js-helper>
 * ```
 */
export interface PlaneHelper extends LineSegments {
	/**
	 * Creates a new wireframe representation of the passed plane.
	 *
	 * @param plane The plane to visualize.
	 * @param size side length of plane helper. Default is 1.
	 * @param color The color of the helper. Default is 0xffff00.
	 */
	new (plane: Plane, size?: number, hex?: ColorRepresentation): this;

	/**
	 * @default 'PlaneHelper'
	 */
	type: string;

	/**
	 * The [plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane) being visualized.
	 */
	plane: Plane;

	/**
	 * The side lengths of plane helper.
	 * @default 1
	 */
	size: number;

	/**
	 * This overrides the method in the base [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D) class so that it also updates the helper object according to the [.plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PlaneHelper.plane) and [.size](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PlaneHelper.size) properties.
	 */
	updateMatrixWorld(force?: boolean): void;
}

/**
 * This displays a helper object consisting of a spherical [Mesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Mesh) for visualizing  a [PointLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PointLight).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PointLightHelper) page for details.
 *
 * ### Examples
 * [WebGL /  helpers](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_helpers)
 *
 * ### Code Example
 * ```js
 * const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
 * pointLight.position.set( 10, 10, 10 );
 * scene.add( pointLight );
 * const sphereSize = 1;
 * const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
 * scene.add( pointLightHelper );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-light [type]="'PointLight'" [color]="'0xffffff'" [intensity]="1" [distance]="100">
 * 	<ngx3js-helper [type]="'PointLightHelper'"></ngx3js-helper>
 * </ngx3js-light>
 * ```
 */
export interface PointLightHelper extends Object3D {
	/**
	 * @param light The light to be visualized.
	 * @param sphereSize The size of the sphere helper. Default is *1*.
	 * @param color if this is not the set the helper will take the color of the light.
	 */
	new (light: PointLight, sphereSize?: number, color?: ColorRepresentation): this;

	/**
	 * @default 'PointLightHelper'
	 */
	type: string;

	/**
	 * The [PointLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PointLight) that is being visualized.
	 */
	light: PointLight;

	/**
	 * The color parameter passed in the constructor. Default is *undefined*. If this is changed, the helper's color will update the next time *.update* is called.
	 */
	color: ColorRepresentation | undefined;

	/**
	 * Reference to the pointLight's [matrixWorld](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrixWorld).
	 */
	matrix: Matrix4;

	/**
	 * See [Object3D.matrixAutoUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrixAutoUpdate). Set to *false* here as the helper is using the pointLight's [matrixWorld](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrixWorld).
	 *
	 * @default false
	 */
	matrixAutoUpdate: boolean;

	/**
	 * Dispose of the pointLightHelper.
	 */
	dispose(): void;

	/**
	 * Updates the helper to match the position of the *.light*.
	 */
	update(): void;
}

/**
 * The PolarGridHelper is an object to define polar grids. Grids are two-dimensional arrays of lines.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PolarGridHelper) page for details.
 *
 * ### Code Example
 * ```js
 * const radius = 10;
 * const radials = 16;
 * const circles = 8;
 * const divisions = 64;
 * const helper = new THREE.PolarGridHelper( radius, radials, circles, divisions );
 * scene.add( helper );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-helper [type]="'PolarGridHelper'" [radius]="10" [radials]="16" [circles]="8" [divisions]="64"></ngx3js-helper>
 * ```
 *
 * ### Examples
 * [WebGL / helpers](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_helpers) |
 * [webgl / loader / mmd / audio](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_mmd_audio) |
 * [webgl / loader / mmd](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_mmd)
 */
export interface PolarGridHelper extends LineSegments {
	/**
	 * @param radius The radius of the polar grid. This can be any positive number. Default is 10.
	 * @param radials The number of radial lines. This can be any positive integer. Default is 16.
	 * @param circles The number of circles. This can be any positive integer. Default is 8.
	 * @param divisions The number of line segments used for each circle. This can be any positive integer that is 3 or greater. Default is 64.
	 * @param color1 The first color used for grid elements. This can be a [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color), a hexadecimal value and an CSS-Color name. Default is 0x444444
	 * @param color2 The second color used for grid elements. This can be a [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color), a hexadecimal value and an CSS-Color name. Default is 0x888888
	 */
	new (
		radius?: number,
		radials?: number,
		circles?: number,
		divisions?: number,
		color1?: ColorRepresentation,
		color2?: ColorRepresentation
	): this;

	/**
	 * @default 'PolarGridHelper'
	 */
	type: string;
}

/**
 * A helper object to assist with visualizing a [Skeleton](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Skeleton).
 * The helper is rendered using a [LineBasicMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineBasicMaterial).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SkeletonHelper) page for details.
 *
 * ### Examples
 * [WebGL / animation / skinning / blending](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_animation_skinning_blending) |
 * [WebGL / animation / skinning / morph](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_animation_skinning_morph) |
 * [WebGL / loader / bvh](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_bvh)
 *
 * ### Code Example
 * ```js
 * const helper = new THREE.SkeletonHelper( skinnedMesh );
 * scene.add( helper );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-helper [type]="'SkeletonHelper'"></ngx3js-helper>
 * ```
 */
export interface SkeletonHelper extends LineSegments {
	/**
	 * @param object Usually an instance of [SkinnedMesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SkinnedMesh). However, any instance of [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D) can be used if it represents a hierarchy of [Bone](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Bone)s (via [Object3D.children](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.children)).
	 */
	new (object: Object3D): this;

	/**
	 * @default 'SkeletonHelper'
	 */
	type: string;

	/**
	 * The list of bones that the helper renders as [Lines](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line).
	 */
	bones: Bone[];

	/**
	 * The object passed in the constructor.
	 */
	root: Object3D;

	/**
	 */
	readonly isSkeletonHelper: true;

	/**
	 */
	matrix: Matrix4;

	/**
	 * @default false
	 */
	matrixAutoUpdate: boolean;

	/**
	 */
	getBoneList(object: Object3D): Bone[];

	/**
	 */
	update(): void;
}

/**
 * This displays a cone shaped helper object for a [SpotLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpotLight).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpotLightHelper) page for details.
 *
 * ### Examples
 * [WebGL / lights / spotlights](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lights_spotlights)
 * [webgl / lights / spotlight](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lights_spotlight)
 *
 * ### Code Example
 * ```js
 * const spotLight = new THREE.SpotLight( 0xffffff );
 * spotLight.position.set( 10, 10, 10 );
 * scene.add( spotLight );
 * const spotLightHelper = new THREE.SpotLightHelper( spotLight );
 * scene.add( spotLightHelper );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-light [type]="'SpotLight'" [color]="'0xffffff'">
 * 	<ngx3js-position [x]="10" [y]="10" [z]="10"></ngx3js-position>
 * 	<ngx3js-helper [type]="'SpotLightHelper'"></ngx3js-helper>
 * </ngx3js-light>
 * ```
 */
export interface SpotLightHelper extends Object3D {
	/**
	 * @param light The [SpotLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpotLight) to be visualized.
	 * @param color if this is not the set the helper will take the color of the light.
	 */
	new (light: Light, color?: ColorRepresentation): this;

	/**
	 * Reference to the [SpotLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpotLight) being visualized.
	 */
	light: Light;

	/**
	 * Reference to the spotLight's [matrixWorld](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrixWorld).
	 */
	matrix: Matrix4;

	/**
	 * See [Object3D.matrixAutoUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrixAutoUpdate). Set to *false* here as the helper is using the spotLight's [matrixWorld](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrixWorld).
	 * @default false
	 */
	matrixAutoUpdate: boolean;

	/**
	 * The color parameter passed in the constructor. Default is *undefined*. If this is changed, the helper's color will update the next time *.update* is called.
	 */
	color: ColorRepresentation | undefined;

	/**
	 * [LineSegments](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineSegments) used to visualize the light.
	 */
	cone: LineSegments;

	/**
	 * Disposes of the light helper.
	 */
	dispose(): void;

	/**
	 * Updates the light helper.
	 */
	update(): void;
}
