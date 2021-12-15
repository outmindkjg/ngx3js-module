import { NgxThreeUtil, N3JS, I3JS } from '../interface';

/**
 * Viewer canvas
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ViewerCanvas) page for details.
 *
 */
export class ViewerCanvas {
	/**
	 * The Position of viewer canvas
	 */
	position: { x: number; y: number } = null;

	/**
	 * The Size of viewer canvas
	 */
	size: { width: number; height: number } = null;

	/**
	 * The Enabled of viewer canvas
	 */
	enabled: boolean = true;

	/**
	 * The Camera of viewer canvas
	 */
	camera: I3JS.PerspectiveCamera = null;

	/**
	 * The Scene of viewer canvas
	 */
	scene: I3JS.Scene = null;

	/**
	 * The Renderer of viewer canvas
	 */
	private renderer: I3JS.Renderer = null;

	/**
	 * The Target of viewer canvas
	 */
	target: I3JS.Vector3 = null;

	/**
	 * Virtual camera of viewer canvas
	 */
	virtualCamera: I3JS.Group = null;

	/**
	 * Creates an instance of viewer canvas.
	 * @param renderer
	 * @param [options]
	 */
	constructor(renderer: I3JS.Renderer, options: any = {}) {
		this.target = new N3JS.Vector3();
		this.position = { x: 0, y: 0 };
		this.size = { width: 100, height: 100 };
		const camera = new N3JS.PerspectiveCamera(70, 1, 1, 20000);
		this.camera = camera;
		const virtualCamera = new N3JS.Group();
		this.virtualCamera = virtualCamera;
		this.scene = new N3JS.Scene();
		this.setOptions(options);
		this.setRenderer(renderer);
	}

	/**
	 * The Options of viewer canvas
	 */
	private options: any = null;

	/**
	 * Render type of viewer canvas
	 */
	private renderType: string = '';

	/**
	 * Changes multi view
	 */
	changeMultiView() {
		this.viewList.forEach((view) => {
			view.left = view._left * this.size.width + this.position.x;
			view.top = view._top * this.size.height + this.position.y;
			view.width = view._width * this.size.width;
			view.height = view._height * this.size.height;
		});
	}

	/**
	 * Sets options
	 * @param options
	 */
	public setOptions(options: any) {
		this.options = options || { type: null };
		this.scene.clear();
		this.virtualCamera.clear();
		this.renderType = (this.options.type || 'circlescreen').toLowerCase();
		switch (this.renderType) {
			case 'multiview':
				this.viewList = [];
				const views: any[] = options.views || [];
				views.forEach((view) => {
					const left = parseFloat(NgxThreeUtil.getTypeSafe(view.left, 0));
					const top = parseFloat(NgxThreeUtil.getTypeSafe(view.top, 0));
					const width = parseFloat(NgxThreeUtil.getTypeSafe(view.width, 0));
					const height = parseFloat(NgxThreeUtil.getTypeSafe(view.height, 0));
					this.viewList.push({
						_left: left,
						_top: top,
						_width: width,
						_height: height,
						left: 0,
						top: 0,
						width: 100,
						height: 100,
						background: NgxThreeUtil.getColorSafe(view.background),
					});
				});
				this.changeMultiView();
				break;
			case 'circlescreen':
				this.scene.add(this.virtualCamera);
				this.virtualCamera.add(this.camera);
				const screenWidth = NgxThreeUtil.getTypeSafe(this.options.width, 175);
				const screenHeight = NgxThreeUtil.getTypeSafe(
					this.options.height,
					screenWidth * 1.7
				);
				this.options.useClear = NgxThreeUtil.getTypeSafe(
					this.options.useClear,
					true
				);
				this.options.clearColor = NgxThreeUtil.getColorSafe(
					this.options.clearColor,
					0x555555
				);
				this.options.width = screenWidth;
				this.options.height = screenHeight;
				const frameColor = NgxThreeUtil.getColorSafe(
					this.options.frameColor,
					0x666666
				);
				const wireframeLinewidth = NgxThreeUtil.getTypeSafe(
					this.options.frameLinewidth,
					3
				);
				this.options.frameLinewidth = wireframeLinewidth;
				const planeGeometry = new N3JS.PlaneBufferGeometry(
					screenWidth,
					screenHeight,
					1,
					1
				);
				const planeFrameMaterial = new N3JS.MeshBasicMaterial({
					depthTest: false,
					depthWrite: false,
					side: N3JS.FrontSide,
					color: frameColor,
					wireframe: true,
					wireframeLinewidth: wireframeLinewidth,
				});
				this.canvasList = [];
				const screenCnt = NgxThreeUtil.getTypeSafe(this.options.cnt, 5);
				const screenAngle = -NgxThreeUtil.getAngleSafe(this.options.angle, 100);
				const screenRadius = NgxThreeUtil.getTypeSafe(this.options.radius, 400);
				this.camera.position.y = NgxThreeUtil.getTypeSafe(
					this.options.cameraY,
					-100
				);
				this.virtualCamera.position.z = -screenRadius * 1.2;
				const screenZ = NgxThreeUtil.getTypeSafe(this.options.screenZ, 200);
				for (let i = 0; i < screenCnt; i++) {
					const planeTarget = new N3JS.WebGLRenderTarget(1024, 1024, {
						minFilter: N3JS.LinearFilter,
						magFilter: N3JS.LinearFilter,
						format: N3JS.RGBAFormat,
					});
					const planeMaterial = new N3JS.MeshBasicMaterial({
						map: planeTarget.texture,
						depthTest: false,
						depthWrite: false,
						side: N3JS.FrontSide,
					});
					const planeMesh = new N3JS.Mesh(planeGeometry, planeMaterial);
					planeMesh.add(new N3JS.Mesh(planeGeometry, planeFrameMaterial));
					const angle = screenAngle * (i / (screenCnt - 1) - 0.5);
					planeMesh.position.x = Math.sin(angle) * screenRadius;
					planeMesh.position.y = 0;
					planeMesh.position.z = Math.cos(angle) * screenRadius + screenZ;
					planeMesh.rotation.y = angle + Math.PI;
					this.canvasList.push({
						mesh: planeMesh,
						planeTarget: planeTarget,
						rotation: planeMesh.rotation,
					});
					this.virtualCamera.add(planeMesh);
				}
				break;
		}
	}

	/**
	 * View list of viewer canvas
	 */
	viewList: any[] = [];

	/**
	 * Canvas list of viewer canvas
	 */
	canvasList: any[] = [];

	/**
	 * Sets renderer
	 * @param renderer
	 */
	public setRenderer(renderer: I3JS.Renderer) {
		if (this.renderer !== renderer) {
			this.renderer = renderer;
			this.updateForWindowResize();
		}
	}

	/**
	 * Disposes viewer canvas
	 */
	dispose() {}

	/**
	 * Updates for window resize
	 */
	updateForWindowResize() {
		this.camera.aspect = this.size.width / this.size.height;
		switch (this.renderType) {
			case 'multiview':
				this.changeMultiView();
				break;
		}
	}

	/**
	 * Clear color of viewer canvas
	 */
	private _clearColor = new N3JS.Color();

	/**
	 * Auto clear of viewer canvas
	 */
	private _autoClear: boolean = true;

	/**
	 * The Viewport of viewer canvas
	 */
	private _viewport = new N3JS.Vector4();

	/**
	 * The Aspect of viewer canvas
	 */
	private _aspect = 1;

	/**
	 * Camera rotation of viewer canvas
	 */
	private _cameraRotation = new N3JS.Euler();

	/**
	 * Renders viewer canvas
	 * @param renderer
	 * @param scene
	 * @param camera
	 */
	render(renderer: I3JS.Renderer, scene: I3JS.Scene, camera: I3JS.Camera) {
		if (this.enabled && renderer instanceof N3JS.WebGLRenderer) {
			this._autoClear = renderer.autoClear;
			renderer.getClearColor(this._clearColor);
			renderer.getViewport(this._viewport);
			if (camera instanceof N3JS.PerspectiveCamera) {
				this._aspect = camera.aspect;
			}
			this._cameraRotation.copy(camera.rotation);
			switch (this.renderType) {
				case 'circlescreen':
					if (camera instanceof N3JS.PerspectiveCamera) {
						camera.aspect = this.options.width / this.options.height;
						camera.updateProjectionMatrix();
					}
					this.camera.lookAt(new N3JS.Vector3(0, 0, 0));
					renderer.autoClear = false;
					this.canvasList.forEach((info) => {
						renderer.setRenderTarget(info.planeTarget);
						const infoRotation = this._cameraRotation.clone();
						infoRotation.x += info.rotation.x;
						infoRotation.y += info.rotation.y - Math.PI;
						infoRotation.z += info.rotation.z;
						camera.rotation.copy(infoRotation);
						renderer.render(scene, camera);
					});
					renderer.setRenderTarget(null);
					if (
						this.options.useClear &&
						NgxThreeUtil.isNotNull(this.options.clearColor)
					) {
						renderer.setClearColor(this.options.clearColor);
						renderer.clear();
					}
					renderer.setViewport(
						this.position.x,
						this.position.y,
						this.size.width,
						this.size.height
					);
					renderer.render(this.scene, this.camera);
					break;
				case 'multiview':
					this.viewList.forEach((view) => {
						renderer.setViewport(view.left, view.top, view.width, view.height);
						renderer.setScissor(view.left, view.top, view.width, view.height);
						renderer.setScissorTest(true);
						if (NgxThreeUtil.isNotNull(view.background)) {
							renderer.setClearColor(view.background);
							renderer.clear();
						}
						if (camera instanceof N3JS.PerspectiveCamera) {
							camera.aspect = view.width / view.height;
							camera.updateProjectionMatrix();
						}
						renderer.render(scene, camera);
						renderer.setScissorTest(false);
					});
					break;
			}
			renderer.setClearColor(this._clearColor);
			renderer.autoClear = this._autoClear;
			renderer.setViewport(this._viewport);
			camera.rotation.copy(this._cameraRotation);
			if (camera instanceof N3JS.PerspectiveCamera) {
				camera.aspect = this._aspect;
				camera.updateProjectionMatrix();
			}
		}
	}
}
