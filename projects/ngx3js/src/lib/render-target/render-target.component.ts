import { Component, forwardRef, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgxThreeUtil, N3JS, I3JS } from '../interface';
import { NgxSizeComponent } from '../size/size.component';
import { NgxAbstractTextureComponent } from '../texture.abstract';

/**
 * The Render Target component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/RenderTargetComponent) page for details.
 *
 * @see THREE.RenderTarget
 */
@Component({
	selector: 'ngx3js-render-target',
	templateUrl: './render-target.component.html',
	styleUrls: ['./render-target.component.scss'],
	providers: [
		{
			provide: NgxAbstractTextureComponent,
			useExisting: forwardRef(() => NgxRenderTargetComponent),
		},
	],
})
export class NgxRenderTargetComponent extends NgxAbstractTextureComponent implements OnInit, OnDestroy {
	/**
	 * The Input of render target component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public type: string = 'RenderTarget';

	/**
	 * The size of render target component
	 */
	@Input() public size: number = 1024;

	/**
	 * The count of render target component
	 */
	@Input() public count: number = 1;

	/**
	 * The depthBuffer of composer component
	 */
	@Input() public depthBuffer: boolean = null;

	/**
	 * The stencilBuffer of composer component
	 */
	@Input() public stencilBuffer: boolean = null;

	/**
	 * The depthTexture of composer component
	 */
	@Input() public depthTexture: any = null;

	/**
	 * The targetSize of pass component
	 */
	@Input() public targetSize: I3JS.Vector2 | NgxSizeComponent = null;

	/**
	 * Gets height
	 * @param [def]
	 * @returns height
	 */
	private getTargetSize(width?: number, height?: number): I3JS.Vector2 {
		if (NgxThreeUtil.isNotNull(this.targetSize)) {
			if (this.targetSize instanceof N3JS.Vector2) {
				return this.targetSize;
			} else if (this.targetSize instanceof NgxSizeComponent) {
				return this.targetSize.getSize();
			}
		}
		return NgxThreeUtil.getVector2Safe(
			NgxThreeUtil.getTypeSafe(width, this.size, 1024),
			NgxThreeUtil.getTypeSafe(height, this.size, 1024),
			null,
			null,
			true
		).multiplyScalar(window.devicePixelRatio);
	}

	/**
	 * Gets depth texture
	 * @returns depth texture
	 */
	private getTargetTextureOptions(): I3JS.WebGLRenderTargetOptions {
		const options: I3JS.WebGLRenderTargetOptions = NgxAbstractTextureComponent.setTextureOptions(
			{},
			this.getTextureOptions()
		);
		if (NgxThreeUtil.isNotNull(this.depthBuffer)) {
			options.depthBuffer = NgxThreeUtil.getTypeSafe(this.depthBuffer, false);
		}
		if (NgxThreeUtil.isNotNull(this.stencilBuffer)) {
			options.stencilBuffer = NgxThreeUtil.getTypeSafe(this.stencilBuffer, false);
		}
		if (NgxThreeUtil.isNotNull(this.depthTexture)) {
			const targetSize = this.getTargetSize();
			options.depthTexture = new N3JS.DepthTexture(
				targetSize.x,
				targetSize.y,
				NgxThreeUtil.getTextureDataTypeSafe(this.depthTexture.type),
				NgxThreeUtil.getMappingSafe(this.depthTexture.mapping),
				NgxThreeUtil.getWrappingSafe(this.depthTexture.wrapS, this.depthTexture.wrap),
				NgxThreeUtil.getWrappingSafe(this.depthTexture.wrapT, this.depthTexture.wrap),
				NgxThreeUtil.getTextureFilterSafe(this.depthTexture.magFilter, this.depthTexture.filter),
				NgxThreeUtil.getTextureFilterSafe(this.depthTexture.minFilter, this.depthTexture.filter),
				NgxThreeUtil.getTypeSafe(this.depthTexture.anisotropy)
			);
		}
		return options;
	}
	/**
	 * Creates an instance of render target component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('render-target');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.renderTarget !== null) {
		}
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
		if (changes) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (this.renderTarget !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getRenderTarget();
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, [])) {
				this.needUpdate = true;
				return;
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * Gets texture
	 * @returns texture
	 */
	public getTexture<T extends I3JS.Texture>(): T {
		if (this.renderTarget === null) {
			this.getRenderTarget();
		}
		if (Array.isArray(this.renderTarget.texture)) {
			return this.renderTarget.texture[0] as T;
		} else {
			return this.renderTarget.texture as T;
		}
	}

	/**
	 * Render target of render target component
	 */
	private renderTarget: I3JS.WebGLRenderTarget | I3JS.WebGLMultipleRenderTargets = null;

	/**
	 * Gets render target
	 * @returns render target
	 */
	public getRenderTarget<T>(): T {
		if (this.renderTarget === null || this._needUpdate) {
			this.needUpdate = false;
			this.unSubscribeRefer('targetSize');
			const renderTargetSize = this.getTargetSize(this.width, this.height);
			switch (this.type.toLowerCase()) {
				case 'cube':
				case 'cuberender':
				case 'cuberendertarget':
				case 'webglcuberendertarget':
					const size = Math.max(renderTargetSize.x, renderTargetSize.y);
					this.renderTarget = new N3JS.WebGLCubeRenderTarget(size, this.getTargetTextureOptions());
					break;
				case 'multiple':
				case 'multiplerender':
				case 'webglmultiplerender':
				case 'webglmultiplerendertargets':
					this.renderTarget = new N3JS.WebGLMultipleRenderTargets(
						renderTargetSize.x,
						renderTargetSize.y,
						NgxThreeUtil.getTypeSafe(this.count, 1)
					);
					break;
				case 'sample':
				case 'multisample':
				case 'multisamplerender':
				case 'multisamplerendertarget':
				case 'webglmultisamplerendertarget':
					const webGLMultisampleRenderTarget = new N3JS.WebGLMultisampleRenderTarget(
						renderTargetSize.x,
						renderTargetSize.y,
						this.getTargetTextureOptions()
					);
					this.renderTarget = webGLMultisampleRenderTarget;
					break;
				case 'render':
				case 'rendertarget':
				case 'webglrendertarget':
				default:
					this.renderTarget = new N3JS.WebGLRenderTarget(
						renderTargetSize.x,
						renderTargetSize.y,
						this.getTargetTextureOptions()
					);
					break;
			}
			this.subscribeRefer(
				'targetSize',
				NgxThreeUtil.getSubscribe(
					this.size,
					() => {
						const size = this.getTargetSize();
						if (this.renderTarget instanceof N3JS.WebGLCubeRenderTarget) {
							const cubeSize = Math.max(size.x, size.y);
							this.renderTarget.setSize(cubeSize, cubeSize);
						} else {
							this.renderTarget.setSize(size.x, size.y);
							if (this.renderTarget instanceof N3JS.WebGLRenderTarget) {
								if (NgxThreeUtil.isNotNull(this.renderTarget.depthTexture)) {
									this.renderTarget.depthTexture.image.width = size.width;
									this.renderTarget.depthTexture.image.height = size.height;
								}
							}
						}
					},
					'loaded'
				)
			);
			let texture: I3JS.Texture = null;
			if (Array.isArray(this.renderTarget.texture)) {
				texture = this.renderTarget.texture[0];
			} else {
				texture = this.renderTarget.texture;
			}
			if (this.texture !== texture && texture.image !== null) {
				this.texture = texture;
				super.setObject(this.texture);
			}
			NgxAbstractTextureComponent.setTextureOptions(this.texture, this.getTextureOptions());
			this.synkMaterial(this.texture);
			this.setSubscribeNext(['texture', 'loaded']);
		}
		return this.renderTarget as any;
	}
}
