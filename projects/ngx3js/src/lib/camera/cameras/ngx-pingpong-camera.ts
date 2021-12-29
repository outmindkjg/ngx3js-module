import { I3JS, N3JS } from '../../interface';

/**
 * Ngx ping pong camera
 */
export class NgxPingPongCamera extends N3JS.Group {

	/**
	 * The Camera of camera component
	 */
	 private cameraExtra: I3JS.CubeCamera[] = [];
	 private cubePingPong: number = 0;

	/**
	 * The destination cube render target.
	 */
	public renderTarget: I3JS.WebGLCubeRenderTarget;

	/**
	 * Creates an instance of ngx ping pong camera.
	 * 
	 * @param [near] 
	 * @param [far] 
	 */
	constructor(near : number = 0.1, far : number = 2000) {
		super();
		const webGLCubeRenderTarget1 = new N3JS.WebGLCubeRenderTarget(512, {
			encoding: N3JS.sRGBEncoding,
			format: N3JS.RGBFormat,
			generateMipmaps: true,
			minFilter: N3JS.LinearMipmapLinearFilter,
		});
		const cubeCamera1 = new N3JS.CubeCamera(near, far, webGLCubeRenderTarget1);
		const webGLCubeRenderTarget2 = new N3JS.WebGLCubeRenderTarget(512, {
			encoding: N3JS.sRGBEncoding,
			format: N3JS.RGBFormat,
			generateMipmaps: true,
			minFilter: N3JS.LinearMipmapLinearFilter,
		});
		const cubeCamera2 = new N3JS.CubeCamera(near, far, webGLCubeRenderTarget2);
		this.add(cubeCamera1, cubeCamera2);
		this.cameraExtra = [];
		this.cameraExtra.push(cubeCamera1, cubeCamera2);
	}

	/**
	 * @param renderer The current WebGL renderer
	 * @param scene The current scene Call this to update the [renderTarget](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubeCamera.renderTarget).
	 */
	 update(renderer: I3JS.WebGLRenderer, scene: I3JS.Scene): void {
		this.cubePingPong = (this.cubePingPong + 1) % this.cameraExtra.length;
		const cubeCamera = this.cameraExtra[this.cubePingPong];
		this.renderTarget = cubeCamera.renderTarget;
		cubeCamera.update(renderer, scene);
	 }

}