import * as THREE from 'three';
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera';
import * as THREE_CORE from './../../threejs-library/three-core';

/**
 * Array camera
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxArrayCamera) page for details.
 * See the [ngx camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_camera/ArrayCamera) page for a live demo.
 *
 */
export class NgxArrayCamera extends THREE.ArrayCamera implements THREE_CORE.IArrayCamera{
	/**
	 * Creates an instance of ngx array camera.
	 * @param [cameras]
	 */
	constructor(cameras?: THREE_CORE.IPerspectiveCamera[]) {
		super(cameras);
	}
}

/**
 * Stereo camera
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxStereoCamera) page for details.
 * See the [ngx camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_camera/StereoCamera) page for a live demo.
 *
 */
export class NgxStereoCamera extends THREE.StereoCamera implements THREE_CORE.IStereoCamera {
	/**
	 * Creates an instance of ngx stereo camera.
	 */
	constructor() {
		super();
	}
}

/**
 * Cube camera
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCubeCamera) page for details.
 * See the [ngx camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_camera/CubeCamera) page for a live demo.
 *
 */
export class NgxCubeCamera extends THREE.CubeCamera implements THREE_CORE.ICubeCamera {
	/**
	 * Creates an instance of ngx cube camera.
	 *
	 * @param near
	 * @param far
	 * @param renderTarget
	 */
	constructor(
		near: number,
		far: number,
		renderTarget: THREE_CORE.IWebGLCubeRenderTarget
	) {
		super(near, far, renderTarget);
	}
}

/**
 * Cinematic camera
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCinematicCamera) page for details.
 * See the [ngx camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_camera/CinematicCamera) page for a live demo.
 *
 */
export class NgxCinematicCamera extends CinematicCamera implements THREE_CORE.ICamera {
	/**
	 * Creates an instance of ngx cinematic camera.
	 *
	 * @param fov
	 * @param aspect
	 * @param near
	 * @param far
	 */
	constructor(fov: number, aspect: number, near: number, far: number) {
		super(fov, aspect, near, far);
	}
}

/**
 * Orthographic camera
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxOrthographicCamera) page for details.
 * See the [ngx camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_camera/OrthographicCamera) page for a live demo.
 *
 */
export class NgxOrthographicCamera extends THREE.OrthographicCamera implements THREE_CORE.IOrthographicCamera {
	/**
	 * Creates an instance of ngx orthographic camera.
	 *
	 * @param left Camera frustum left plane.
	 * @param right Camera frustum right plane.
	 * @param top Camera frustum top plane.
	 * @param bottom Camera frustum bottom plane.
	 * @param [near] Camera frustum near plane.
	 * @param [far] Camera frustum far plane.
	 */
	constructor(
		left: number,
		right: number,
		top: number,
		bottom: number,
		near?: number,
		far?: number
	) {
		super(left, right, top, bottom, near, far);
	}
}

/**
 * Perspective camera
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPerspectiveCamera) page for details.
 * See the [ngx camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_camera/PerspectiveCamera) page for a live demo.
 *
 */
export class NgxPerspectiveCamera extends THREE.PerspectiveCamera implements THREE_CORE.IPerspectiveCamera {
	/**
	 * Creates an instance of ngx perspective camera.
	 *
	 * @param [fov] Camera frustum vertical field of view. Default value is 50.
	 * @param [aspect] Camera frustum aspect ratio. Default value is 1.
	 * @param [near] Camera frustum near plane. Default value is 0.1.
	 * @param [far] Camera frustum far plane. Default value is 2000.
	 */
	constructor(fov?: number, aspect?: number, near?: number, far?: number) {
		super(fov, aspect, near, far);
	}
}
