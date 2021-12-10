import * as THREE from 'three';
// import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { ArcballControls } from 'three/examples/jsm/controls/ArcballControls';
import { CSM } from 'three/examples/jsm/csm/CSM';
import * as I3JS from '../../threejs-library/three-interface';

/**
 * Drag controls
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxDragControls) page for details.
 * See the [ngx control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/DragControls) page for a live demo.
 *
 */
export class NgxDragControls extends DragControls {
	/**
	 * Creates an instance of ngx drag controls.
	 *
	 * @param objects
	 * @param camera
	 * @param [domElement]
	 */
	constructor(
		objects: I3JS.IObject3D[],
		camera: I3JS.ICamera,
		domElement?: HTMLElement
	) {
		super(objects, camera, domElement);
	}
}

/**
 * FirstPerson controls
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxFirstPersonControls) page for details.
 * See the [ngx control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/FirstPersonControls) page for a live demo.
 *
 */
export class NgxFirstPersonControls extends FirstPersonControls {
	/**
	 * Creates an instance of ngx first person controls.
	 *
	 * @param camera
	 * @param [domElement]
	 */
	constructor(camera: I3JS.ICamera, domElement?: HTMLElement) {
		super(camera, domElement);
	}
}

/**
 * Fly controls
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxFlyControls) page for details.
 * See the [ngx control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/FlyControls) page for a live demo.
 *
 */
export class NgxFlyControls extends FlyControls {
	/**
	 * Creates an instance of ngx fly controls.
	 *
	 * @param camera
	 * @param [domElement]
	 */
	constructor(camera: I3JS.ICamera, domElement?: HTMLElement) {
		super(camera, domElement);
	}
}

/**
 * Orbit controls
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxOrbitControls) page for details.
 * See the [ngx control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/OrbitControls) page for a live demo.
 *
 */
export class NgxOrbitControls extends OrbitControls {
	/**
	 * Creates an instance of ngx orbit controls.
	 *
	 * @param camera
	 * @param [domElement]
	 */
	constructor(camera: I3JS.ICamera, domElement?: HTMLElement) {
		super(camera, domElement);
	}
}

/**
 * PointerLock controls
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPointerLockControls) page for details.
 * See the [ngx control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/PointerLockControls) page for a live demo.
 *
 */
export class NgxPointerLockControls extends PointerLockControls {
	/**
	 * Creates an instance of ngx pointer lock controls.
	 *
	 * @param camera
	 * @param [domElement]
	 */
	constructor(camera: I3JS.ICamera, domElement?: HTMLElement) {
		super(camera, domElement);
	}
}

/**
 * Trackball controls
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTrackballControls) page for details.
 * See the [ngx control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/TrackballControls) page for a live demo.
 *
 */
export class NgxTrackballControls extends TrackballControls {
	/**
	 * Creates an instance of ngx trackball controls.
	 *
	 * @param camera
	 * @param [domElement]
	 */
	constructor(camera: I3JS.ICamera, domElement?: HTMLElement) {
		super(camera, domElement);
	}
}

/**
 * Transform controls
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTransformControls) page for details.
 * See the [ngx control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/TransformControls) page for a live demo.
 *
 */
export class NgxTransformControls extends TransformControls {
	/**
	 * Creates an instance of ngx transform controls.
	 *
	 * @param camera
	 * @param [domElement]
	 */
	constructor(camera: I3JS.ICamera, domElement?: HTMLElement) {
		super(camera, domElement);
	}
}

/**
 * Arcball controls
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxArcballControls) page for details.
 * See the [ngx control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/ArcballControls) page for a live demo.
 *
 */
export class NgxArcballControls extends ArcballControls {
	/**
	 * Creates an instance of ngx arcball controls.
	 *
	 * @param camera
	 * @param [domElement]
	 * @param [scene]
	 */
	constructor(
		camera: I3JS.ICamera,
		domElement?: HTMLElement,
		scene?: I3JS.IScene
	) {
		super(camera, domElement, scene);
	}
}

/**
 * CSM controls
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCsmControls) page for details.
 * See the [ngx control](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_control/CsmControls) page for a live demo.
 *
 */
export class NgxCsmControls extends CSM {
	/**
	 * Creates an instance of ngx csm controls.
	 *
	 * @param data
	 */
	constructor(data: any) {
		super(data);
	}
}

export {
	DragControls,
	FirstPersonControls,
	FlyControls,
	OrbitControls,
	PointerLockControls,
	TrackballControls,
	TransformControls,
	ArcballControls,
};
