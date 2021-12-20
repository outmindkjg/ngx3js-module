import { Object3D } from './core';
import { Matrix4, Vector3 } from './math';
import { WebGLCubeRenderTarget, WebGLRenderer } from './renderers';
import { Scene } from './scenes';

export interface ArrayCamera extends PerspectiveCamera {
    new( cameras?: PerspectiveCamera[]) : this;

    /**
     * @default []
     */
    cameras: PerspectiveCamera[];
    readonly isArrayCamera: true;
}

// Cameras ////////////////////////////////////////////////////////////////////////////////////////

/**
 * Abstract base class for cameras. This class should always be inherited when you build a new camera.
 */
export interface Camera extends Object3D {
    /**
     * This constructor sets following properties to the correct type: matrixWorldInverse, projectionMatrix and projectionMatrixInverse.
     */
    new( ) : this;

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
     * This is the inverse of projectionMatrix.
     * @default new THREE.Matrix4()
     */
    projectionMatrixInverse: Matrix4;

    readonly isCamera: true;

    getWorldDirection(target: Vector3): Vector3;

    updateMatrixWorld(force?: boolean): void;
}

export interface CubeCamera extends Object3D {
    new( near: number, far: number, renderTarget: WebGLCubeRenderTarget) : this;

    type: 'CubeCamera';

    renderTarget: WebGLCubeRenderTarget;

    update(renderer: WebGLRenderer, scene: Scene): void;
}

/**
 * Camera with orthographic projection
 *
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/cameras/OrthographicCamera.js|src/cameras/OrthographicCamera.js}
 *
 * @example
 * const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
 * scene.add( camera );
 */
export interface OrthographicCamera extends Camera {
    /**
     * @param left Camera frustum left plane.
     * @param right Camera frustum right plane.
     * @param top Camera frustum top plane.
     * @param bottom Camera frustum bottom plane.
     * @param [near=0.1] Camera frustum near plane.
     * @param [far=2000] Camera frustum far plane.
     */
    new( left?: number, right?: number, top?: number, bottom?: number, near?: number, far?: number) : this;

    type: 'OrthographicCamera';

    readonly isOrthographicCamera: true;

    /**
     * @default 1
     */
    zoom: number;

    /**
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
     * Camera frustum near plane.
     * @default 0.1
     */
    near: number;

    /**
     * Camera frustum far plane.
     * @default 2000
     */
    far: number;

    /**
     * Updates the camera projection matrix. Must be called after change of parameters.
     */
    updateProjectionMatrix(): void;
    setViewOffset(
        fullWidth: number,
        fullHeight: number,
        offsetX: number,
        offsetY: number,
        width: number,
        height: number,
    ): void;
    clearViewOffset(): void;
    toJSON(meta?: any): any;
}

/**
 * Camera with perspective projection.
 *
 * @source https://github.com/mrdoob/three.js/blob/master/src/cameras/PerspectiveCamera.js
 */
export interface PerspectiveCamera extends Camera {
    /**
     * @param [fov=50] Camera frustum vertical field of view. Default value is 50.
     * @param [aspect=1] Camera frustum aspect ratio. Default value is 1.
     * @param [near=0.1] Camera frustum near plane. Default value is 0.1.
     * @param [far=2000] Camera frustum far plane. Default value is 2000.
     */
    new( fov?: number, aspect?: number, near?: number, far?: number) : this;

    type: 'PerspectiveCamera';

    readonly isPerspectiveCamera: true;

    /**
     * @default 1
     */
    zoom: number;

    /**
     * Camera frustum vertical field of view, from bottom to top of view, in degrees.
     * @default 50
     */
    fov: number;

    /**
     * Camera frustum aspect ratio, window width divided by window height.
     * @default 1
     */
    aspect: number;

    /**
     * Camera frustum near plane.
     * @default 0.1
     */
    near: number;

    /**
     * Camera frustum far plane.
     * @default 2000
     */
    far: number;

    /**
     * @default 10
     */
    focus: number;

    /**
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
     * @default 35
     */
    filmGauge: number;

    /**
     * @default 0
     */
    filmOffset: number;

    setFocalLength(focalLength: number): void;
    getFocalLength(): number;
    getEffectiveFOV(): number;
    getFilmWidth(): number;
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
     * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h ) : this; Note there is no reason monitors have to be the same size or in a grid.
     *
     * @param fullWidth full width of multiview setup
     * @param fullHeight full height of multiview setup
     * @param x horizontal offset of subcamera
     * @param y vertical offset of subcamera
     * @param width width of subcamera
     * @param height height of subcamera
     */
    setViewOffset(fullWidth: number, fullHeight: number, x: number, y: number, width: number, height: number): void;
    clearViewOffset(): void;

    /**
     * Updates the camera projection matrix. Must be called after change of parameters.
     */
    updateProjectionMatrix(): void;
    toJSON(meta?: any): any;

    /**
     * @deprecated Use {@link PerspectiveCamera#setFocalLength .setFocalLength()} and {@link PerspectiveCamera#filmGauge .filmGauge} instead.
     */
    setLens(focalLength: number, frameHeight?: number): void;
}

export interface StereoCamera extends Camera {
    new( ) : this;

    type: 'StereoCamera';

    /**
     * @default 1
     */
    aspect: number;

    /**
     * @default 0.064
     */
    eyeSep: number;

    cameraL: PerspectiveCamera;
    cameraR: PerspectiveCamera;

    update(camera: PerspectiveCamera): void;
}
