import { Layers, Object3D } from './core';
import { Matrix4, Vector3 } from './math';
import { WebGLCubeRenderTarget, WebGLRenderer } from './renderers';
import { Scene } from './scenes';

/**
 * ArrayCamera can be used in order to efficiently render a scene with a predefined set of cameras. This is an important performance aspect for rendering VR scenes.
 * An instance of ArrayCamera always has an array of sub cameras. It's mandatory to define for each sub camera the *viewport* property which determines the part of the viewport that is rendered with this camera.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ArrayCamera) page for details.
 * See the [ngx camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_camera/ArrayCamera) page for a live demo.
 *
 * ### Examples
 * [camera / array](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_camera_array)
 */
export interface ArrayCamera extends PerspectiveCamera {
	/**
	 * An array of cameras.
	 */
	new (cameras?: PerspectiveCamera[]): this;

	/**
	 * An array of cameras.
	 * @default []
	 */
	cameras: PerspectiveCamera[];
	readonly isArrayCamera: true;
}

/**
 * Abstract base class for cameras. This class should always be inherited when you build a new camera.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Camera) page for details.
 * See the [ngx camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_camera/Camera) page for a live demo.
 *
 */
export interface Camera extends Object3D {
	/**
	 * Creates a new Camera. Note that this class is not intended to be called directly; you probably want a [PerspectiveCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera) or [OrthographicCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/OrthographicCamera) instead.
	 */
	new (): this;

	/**
	 * This is the inverse of matrixWorld. MatrixWorld contains the Matrix which has the world transform of the Camera.
	 * @default new THREE.Matrix4()
	 */
	matrixWorldInverse: Matrix4;

	/**
	 * This is the matrix which contains the projection.
	 * @default new THREE.Matrix4()
	 */
	projectionMatrix: Matrix4;

	/**
	 * The inverse of projectionMatrix.
	 * @default new THREE.Matrix4()
	 */
	projectionMatrixInverse: Matrix4;

	/**
	 * The [layers](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Layers) that the camera is a member of. This is an inherited property from [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D).
	 * Objects must share at least one layer with the camera to be seen when the camera's viewpoint is rendered.
	 */
	layers: Layers;

	readonly isCamera: true;

	/**
	 * (Note: A camera looks down its local, negative z-axis).
	 * @param target The result will be copied into this Vector3.
	 * @returns Returns a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) representing the world space direction in which the camera is looking.
	 */
	getWorldDirection(target: Vector3): Vector3;
}

/**
 * Creates 6 cameras that render to a [WebGLCubeRenderTarget](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLCubeRenderTarget).
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubeCamera) page for details.
 * See the [ngx camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_camera/CubeCamera) page for a live demo.
 *
 * ### Examples
 * [materials / cubemap / dynamic](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_cubemap_dynamic)
 *
 * ### Code Example
 * ```js
 * //  Create cube render target
 * const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
 * 	128,
 * 	{
 * 		format: THREE.RGBFormat,
 * 		generateMipmaps: true,
 * 		minFilter: THREE.LinearMipmapLinearFilter
 * 	}
 * );
 * //  Create cube camera
 * const cubeCamera = new THREE.CubeCamera( 1, 100000, cubeRenderTarget );
 * scene.add( cubeCamera );
 * //  Create car
 * const chromeMaterial = new THREE.MeshLambertMaterial(
 * 	{ color: 0xffffff, envMap: cubeRenderTarget.texture }
 * );
 * const car = new Mesh( carGeometry, chromeMaterial );
 * scene.add( car );
 * //  Update the render target cube
 * car.visible = false;
 * cubeCamera.position.copy( car.position );
 * cubeCamera.update( renderer, scene );
 * //  Render the scene
 * car.visible = true;
 * renderer.render( scene, camera );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-camera #cubeCamera [type]="'cubeCamera'" [near]="1" [far]="100000"></ngx3js-camera>
 * 	<ngx3js-matrial [type]="'MeshLambertMaterial'" [envMap]="cubeCamera"></ngx3js-matrial>
 * </ngx3js-mesh>
 * ```
 */
export interface CubeCamera extends Object3D {
	/**
	 * Constructs a CubeCamera that contains 6 [PerspectiveCameras](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera) that render to a [WebGLCubeRenderTarget](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLCubeRenderTarget).
	 *
	 * @param near The near clipping distance.
	 * @param far The far clipping distance.
	 * @param renderTarget The destination cube render target.
	 */
	new (near: number, far: number, renderTarget: WebGLCubeRenderTarget): this;

	type: 'CubeCamera';

	/**
	 * The destination cube render target.
	 */
	renderTarget: WebGLCubeRenderTarget;

	/**
	 * @param renderer The current WebGL renderer
	 * @param scene The current scene Call this to update the [renderTarget](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubeCamera.renderTarget).
	 */
	update(renderer: WebGLRenderer, scene: Scene): void;
}

/**
 * Camera that uses [orthographic projection](https://en.wikipedia.org/wiki/Orthographic_projection).
 * In this projection mode, an object's size in the rendered image stays constant regardless of its distance from the camera.
 * This can be useful for rendering 2D scenes and UI elements, amongst other things.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/OrthographicCamera) page for details.
 * See the [ngx camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_camera/OrthographicCamera) page for a live demo.
 *
 * ### Examples
 * [camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_camera) |
 * [interactive / cubes / ortho](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_interactive_cubes_ortho) |
 * [materials / cubemap / dynamic](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_cubemap_dynamic) |
 * [postprocessing / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_advanced) |
 * [postprocessing / dof2](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_dof2) |
 * [postprocessing / godrays](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_godrays) |
 * [rtt](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_rtt) |
 * [shaders / tonemapping](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_shaders_tonemapping) |
 * [shadowmap](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_shadowmap)
 *
 * ### Code Example
 * ```js
 * const camera = new THREE.OrthographicCamera(
 * 		width / - 2,
 * 		width / 2,
 * 		height / 2,
 * 		height / - 2,
 * 		1,
 * 		1000
 * );
 * scene.add( camera );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-camera [type]="'OrthographicCamera'" [left]="-1" [right]="1" [top]="1" [bottom]="-1" [near]="1" [far]="1000"></ngx3js-camera>
 * ```
 */
export interface OrthographicCamera extends Camera {
	/**
	 * Together these define the camera's [viewing frustum](https://en.wikipedia.org/wiki/Viewing_frustum).
	 *
	 * @param left Camera frustum left plane.
	 * @param right Camera frustum right plane.
	 * @param top Camera frustum top plane.
	 * @param bottom Camera frustum bottom plane.
	 * @param near Camera frustum near plane.
	 * @param far Camera frustum far plane.
	 */
	new (left?: number, right?: number, top?: number, bottom?: number, near?: number, far?: number): this;

	type: 'OrthographicCamera';

	readonly isOrthographicCamera: true;

	/**
	 * Gets or sets the zoom factor of the camera. Default is *1*.
	 * @default 1
	 */
	zoom: number;

	/**
	 * Set by [setViewOffset](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/OrthographicCamera.setViewOffset). Default is *null*.
	 * @default null
	 */
	view: null | {
		enabled: boolean;
		fullWidth: number;
		fullHeight: number;
		offsetX: number;
		offsetY: number;
		width: number;
		height: number;
	};

	/**
	 * Camera frustum left plane.
	 * @default -1
	 */
	left: number;

	/**
	 * Camera frustum right plane.
	 * @default 1
	 */
	right: number;

	/**
	 * Camera frustum top plane.
	 * @default 1
	 */
	top: number;

	/**
	 * Camera frustum bottom plane.
	 * @default -1
	 */
	bottom: number;

	/**
	 * Camera frustum near plane. Default is *0.1*.
	 * The valid range is between 0 and the current value of the *.far* plane.
	 * Note that, unlike for the [PerspectiveCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera), *0* is a valid value for an OrthographicCamera's near plane.
	 * @default 0.1
	 */
	near: number;

	/**
	 * Camera frustum far plane. Default is *2000*.
	 * Must be greater than the current value of *.near* plane.
	 * @default 2000
	 */
	far: number;

	/**
	 * Updates the camera projection matrix. Must be called after change of parameters.
	 */
	updateProjectionMatrix(): void;

	/**
	 * This is useful for multi-window or multi-monitor/multi-machine setups.
	 * For an example on how to use it see [PerspectiveCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.setViewOffset).
	 * Sets an offset in a larger [viewing frustum](https://en.wikipedia.org/wiki/Viewing_frustum).
	 *
	 * @param fullWidth full width of multiview setup
	 * @param fullHeight full height of multiview setup
	 * @param offsetX horizontal offset of subcamera
	 * @param offsetY vertical offset of subcamera
	 * @param width width of subcamera
	 * @param height height of subcamera
	 */
	setViewOffset(
		fullWidth: number,
		fullHeight: number,
		offsetX: number,
		offsetY: number,
		width: number,
		height: number
	): void;

	/**
	 * Removes any offset set by the .setViewOffset method.
	 */
	clearViewOffset(): void;

	/**
	 * Convert the camera to three.js [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4).
	 * @param met A object containing metadata such as textures or images in objects' descendants
	 * @returns json
	 */
	toJSON(meta?: any): any;
}

/**
 * Camera that uses [perspective projection](https://en.wikipedia.org/wiki/Perspective_(graphical)).
 * This projection mode is designed to mimic the way the human eye sees. It is the most common projection mode used for rendering a 3D scene.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera) page for details.
 * See the [ngx camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_camera/PerspectiveCamera) page for a live demo.
 *
 * ### Examples
 * [animation / skinning / blending](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_animation_skinning_blending) |
 * [animation / skinning / morph](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_animation_skinning_morph) |
 * [effects / stereo](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_stereo) |
 * [interactive / cubes](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_interactive_cubes) |
 * [loader / collada / skinning](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_collada_skinning)
 *
 * ### Code Example
 * ```js
 * const camera = new THREE.PerspectiveCamera(
 * 	45,
 * 	width / height,
 * 	1,
 * 	1000
 * );
 * scene.add( camera );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-camera [type]="'PerspectiveCamera'" [fov]="45" [near]="1" [far]="1000"></ngx3js-camera>
 * ```
 */
export interface PerspectiveCamera extends Camera {
	/**
	 * Together these define the camera's [viewing frustum](https://en.wikipedia.org/wiki/Viewing_frustum).
	 * @param fov Camera frustum vertical field of view.
	 * @param aspect Camera frustum aspect ratio.
	 * @param near Camera frustum near plane.
	 * @param far Camera frustum far plane.
	 */
	new (fov?: number, aspect?: number, near?: number, far?: number): this;

	type: 'PerspectiveCamera';

	/**
	 */
	readonly isPerspectiveCamera: true;

	/**
	 * Gets or sets the zoom factor of the camera. Default is *1*.
	 * @default 1
	 */
	zoom: number;

	/**
	 * Camera frustum vertical field of view, from bottom to top of view, in degrees. Default is *50*.
	 * @default 50
	 */
	fov: number;

	/**
	 * Camera frustum aspect ratio, usually the canvas width / canvas height. Default is *1* (square canvas).
	 * @default 1
	 */
	aspect: number;

	/**
	 * Camera frustum near plane. Default is *0.1*.
	 * The valid range is greater than 0 and less than the current value of the *.far* plane.
	 * Note that, unlike for the [OrthographicCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/OrthographicCamera), *0* is <em>not</em> a valid value for a PerspectiveCamera's near plane.
	 * @default 0.1
	 */
	near: number;

	/**
	 * Camera frustum far plane. Default is *2000*.
	 * Must be greater than the current value of *.near* plane.
	 * @default 2000
	 */
	far: number;

	/**
	 * Object distance used for stereoscopy and depth-of-field effects.
	 * This parameter does not influence the projection matrix unless a [StereoCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/StereoCamera) is being used.
	 * @default 10
	 */
	focus: number;

	/**
	 * Frustum window specification or null.
	 * This is set using the [.setViewOffset](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.setViewOffset) method and cleared using [.clearViewOffset](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.clearViewOffset).
	 * @default null
	 */
	view: null | {
		enabled: boolean;
		fullWidth: number;
		fullHeight: number;
		offsetX: number;
		offsetY: number;
		width: number;
		height: number;
	};

	/**
	 * Film size used for the larger axis. Default is 35 (millimeters). This parameter does not influence the projection matrix unless .filmOffset is set to a nonzero value.
	 * @default 35
	 */
	filmGauge: number;

	/**
	 * Horizontal off-center offset in the same unit as .filmGauge. Default is *0*.
	 * @default 0
	 */
	filmOffset: number;

	/**
	 * Sets the FOV by focal length in respect to the current [.filmGauge](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.filmGauge).
	 * By default, the focal length is specified for a 35mm (full frame) camera.
	 */
	setFocalLength(focalLength: number): void;

	/**
	 * @returns Returns the focal length of the current .fov in respect to .filmGauge.
	 */
	getFocalLength(): number;

	/**
	 * @returns Returns the current vertical field of view angle in degrees considering .zoom.
	 */
	getEffectiveFOV(): number;

	/**
	 * @returns Returns the width of the image on the film. If .aspect is greater than or equal to one (landscape format), the result equals .filmGauge.
	 */
	getFilmWidth(): number;

	/**
	 * @returns Returns the height of the image on the film. If .aspect is less than or equal to one (portrait format), the result equals .filmGauge.
	 */
	getFilmHeight(): number;

	/**
	 * Sets an offset in a larger frustum. This is useful for multi-window or multi-monitor/multi-machine setups.
	 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and the monitors are in grid like this:
	 *
	 * +---+---+---+
	 * | A | B | C |
	 * +---+---+---+
	 * | D | E | F |
	 * +---+---+---+
	 *
	 * then for each monitor you would call it like this:
	 *
	 * const w = 1920;
	 * const h = 1080;
	 * const fullWidth = w * 3;
	 * const fullHeight = h * 2;
	 *
	 * // A
	 * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h ) : this;
	 * // B
	 * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h ) : this;
	 * // C
	 * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h ) : this;
	 * // D
	 * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h ) : this;
	 * // E
	 * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h ) : this;
	 * // F
	 * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h ) : this;
	 * Note there is no reason monitors have to be the same size or in a grid.
	 *
	 * @param fullWidth full width of multiview setup
	 * @param fullHeight full height of multiview setup
	 * @param x horizontal offset of subcamera
	 * @param y vertical offset of subcamera
	 * @param width width of subcamera
	 * @param height height of subcamera
	 */
	setViewOffset(fullWidth: number, fullHeight: number, x: number, y: number, width: number, height: number): void;

	/**
	 * Removes any offset set by the [.setViewOffset](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.setViewOffset) method.
	 */
	clearViewOffset(): void;

	/**
	 * Updates the camera projection matrix. Must be called after any change of parameters.
	 */
	updateProjectionMatrix(): void;

	/**
	 * Convert the camera to three.js [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4).
	 *
	 * @param met A object containing metadata such as textures or images in objects' descendants.
	 */
	toJSON(meta?: any): any;
}

/**
 * Dual [PerspectiveCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera)s used for effects such as [3D Anaglyph](https://en.wikipedia.org/wiki/Anaglyph_3D) or [Parallax Barrier](https://en.wikipedia.org/wiki/parallax_barrier).
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/StereoCamera) page for details.
 * See the [ngx camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_camera/StereoCamera) page for a live demo.
 *
 * ### Examples
 * [effects / anaglyph](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_anaglyph) |
 * [effects / parallaxbarrier](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_parallaxbarrier) |
 * [effects / stereo](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_stereo)
 */
export interface StereoCamera extends Camera {
	/**
	 */
	new (): this;

	/**
	 */
	type: 'StereoCamera';

	/**
	 * Default is *1*.
	 * @default 1
	 */
	aspect: number;

	/**
	 * Default is *0.064*.
	 * @default 0.064
	 */
	eyeSep: number;

	/**
	 * Left camera. This is added to [layer 1](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Layers) - objects to be rendered by the left camera must also be added to this layer.
	 */
	cameraL: PerspectiveCamera;

	/**
	 * Right camera.This is added to [layer 2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Layers) - objects to be rendered by the right camera must also be added to this layer.
	 */
	cameraR: PerspectiveCamera;

	/**
	 * Update the stereo cameras based on the camera passed in.
	 */
	update(camera: PerspectiveCamera): void;
}
