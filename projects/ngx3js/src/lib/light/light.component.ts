import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { INgxColor, ITagAttributes } from '../ngx-interface';
import { NgxAbstractObject3dComponent } from '../object3d.abstract';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxAbstractTextureComponent } from '../texture.abstract';
import { I3JS, N3JS, NgxThreeUtil } from './../interface';

/**
 * The Light component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLightComponent) page for details.
 * See the [ngx light](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_light) page for a live demo.
 *
 * |  Three Type        | Type Key           | Acceptable Input          |
 * |:--------------------------|:--------------------------|:--------------------------|
 * | DirectionalLight | DirectionalLight, Directional | color, intensity |
 * | HemisphereLight | HemisphereLight, Hemisphere | skyColor, groundColor, intensity |
 * | LightProbe | LightProbe, Probe | sh, intensity, texture |
 * | PointLight | PointLight, Point | color, intensity, distance, decay |
 * | RectAreaLight | RectAreaLight, RectArea | color, intensity, width, height |
 * | SpotLight | SpotLight, Spot | color, intensity, distance, angle, penumbra, decay, shadowFocus |
 * | AmbientLight | AmbientLight, Ambient | color, intensity |
 *
 *
 * ```html
 * <ngx3js-light
 * 	[type]="'Hemisphere'" [skyColor]="'0xffffff'"
 * 	[groundColor]="'0x444444'"
 * >
 * 	<ngx3js-position [x]="0" [y]="20" [z]="0"></ngx3js-position>
 * </ngx3js-light>
 * <ngx3js-light
 * 	[type]="'directional'" [color]="'0xffffff'" [intensity]="1"
 * >
 * 	<ngx3js-position [x]="-3" [y]="10" [z]="-10"></ngx3js-position>
 * </ngx3js-light>
 * <ngx3js-light
 * 	[type]="'AmbientLight'" [color]="'0x6688cc'"
 * ></ngx3js-light>
 * <ngx3js-light
 * 	[type]="'SpotLight'"
 * 	[color]="'0xffffff'" [intensity]="1.5 "
 * 	[angle]="180/9" [castShadow]="true" [shadowCameraTop]="2 "
 * 	[shadowCameraBottom]="-2" [shadowCameraLeft]="-2 "
 * 	[shadowCameraRight]="2" [shadowCameraNear]="1000 "
 * 	[shadowCameraFar]="4000" [shadowMapSize]="1024"
 * >
 * 	<ngx3js-position [x]="0" [y]="500" [z]="2000"></ngx3js-position>
 * </ngx3js-light>
 * <ngx3js-light
 * 	[type]="'SpotLight'"
 * 	[color]="'0xffffff'" [intensity]="1.5 "
 * 	[angle]="20" [castShadow]="true" [shadowCameraNear]="1000 "
 * 	[shadowCameraFar]="4000" [shadowMapSize]="1024"
 * >
 * 	<ngx3js-position [x]="0" [y]="500" [z]="2000"></ngx3js-position>
 * </ngx3js-light>
 * ```
 * @see THREE.Light
 */
@Component({
	selector: 'ngx3js-light',
	templateUrl: './light.component.html',
	styleUrls: ['./light.component.scss'],
	providers: [
		{
			provide: NgxAbstractObject3dComponent,
			useExisting: forwardRef(() => NgxLightComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxLightComponent),
		},
	],
})
export class NgxLightComponent extends NgxAbstractObject3dComponent implements OnInit {
	/**
	 * The type of light
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.PointLight | PointLight, Point |
	 * | THREE.RectAreaLight | RectAreaLight, RectArea |
	 * | THREE.SpotLight | SpotLight, Spot |
	 * | THREE.DirectionalLight | DirectionalLight, Directional |
	 * | THREE.HemisphereLight | HemisphereLight, Hemisphere |
	 * | THREE.LightProbe | LightProbe, Probe |
	 * | THREE.AmbientLight | AmbientLight, Ambient |
	 */
	@Input() public type: string = 'spot';

	/**
	 * Numeric value of the RGB component of the color. Default is 0xffffff.
	 */
	@Input() public color: INgxColor = null;

	/**
	 * hexadecimal color of the sky. Default is 0xffffff.
	 */
	@Input() public skyColor: INgxColor = null;

	/**
	 * hexadecimal color of the ground. Default is 0xffffff.
	 */
	@Input() public groundColor: INgxColor = null;

	/**
	 * Numeric value of the light's strength/intensity. Default is 1.
	 */
	@Input() public intensity: number = null;

	/**
	 * Maximum range of the light. Default is 0 (no limit).
	 */
	@Input() public distance: number = null;

	/**
	 * Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2(360).
	 */
	@Input() public angle: number = null;

	/**
	 * Percent of the spotlight cone that is attenuated due to penumbra. Takes values between zero and 1. Default is zero.
	 */
	@Input() public penumbra: number = null;

	/**
	 * The amount the light dims along the distance of the light. Default is 1.
	 */
	@Input() public decay: number = null;

	/**
	 * width of the light. Default is 10.
	 */
	@Input() public width: number = null;

	/**
	 * height of the light. Default is 10.
	 */
	@Input() public height: number = null;

	/**
	 * Shadow map bias, how much to add or subtract from the normalized depth when deciding whether a surface is in shadow.
	 * The default is 0. Very tiny adjustments here (in the order of 0.0001) may help reduce artefacts in shadows
	 */
	@Input() public shadowBias: number = null;

	/**
	 * Setting this to values greater than 1 will blur the edges of the shadow.
	 * High values will cause unwanted banding effects in the shadows - a greater [LightShadow.mapSize](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/lights/shadows/LightShadow.mapSize) will allow for a higher value to be used here before these effects become visible.
	 * If [WebGLRenderer.shadowMap.type](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer.shadowMap.type) is set to [PCFSoftShadowMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Renderer), radius has no effect and it is recommended to increase softness by decreasing [LightShadow.mapSize](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/lights/shadows/LightShadow.mapSize) instead.
	 * Note that this has no effect if the [WebGLRenderer.shadowMap.type](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer.shadowMap.type) is set to [BasicShadowMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Renderer).
	 */
	@Input() public shadowRadius: number = null;

	/**
	 * Used to focus the shadow camera. The camera's field of view is set as a percentage of the spotlight's field-of-view. Range is [0, 1]. Default is 1.0.
	 */
	@Input() public shadowFocus: number = null;

	/**
	 * The shadowCameraNear of light component
	 */
	@Input() public shadowCameraNear: number = null;

	/**
	 * A [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector2) defining the width and height of the shadow map.
	 */
	@Input() public shadowMapSize: number = null;

	/**
	 * A [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector2) defining the width and height of the shadow map.
	 * vector2.width
	 */
	@Input() public shadowMapSizeWidth: number = null;

	/**
	 * A [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector2) defining the width and height of the shadow map.
	 * vector2.height
	 */
	@Input() public shadowMapSizeHeight: number = null;

	/**
	 * Camera frustum far plane. Default is *2000*.
	 * Must be greater than the current value of [Camera.near](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/cameras/Camera.near) plane.
	 */
	@Input() public shadowCameraFar: number = null;

	/**
	 * Camera frustum vertical field of view, from bottom to top of view, in degrees. Default is *50*.
	 */
	@Input() public shadowCameraFov: number = null;

	/**
	 * Camera frustum left plane.
	 */
	@Input() public shadowCameraLeft: number = null;

	/**
	 * Camera frustum right plane.
	 */
	@Input() public shadowCameraRight: number = null;

	/**
	 * Camera frustum top plane.
	 */
	@Input() public shadowCameraTop: number = null;

	/**
	 * Camera frustum bottom plane.
	 */
	@Input() public shadowCameraBottom: number = null;

	/**
	 * Gets or sets the zoom factor of the camera. Default is *1*.
	 */
	@Input() public shadowCameraZoom: number = null;

	/**
	 * An instance of [SphericalHarmonics3](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/SphericalHarmonics3).
	 */
	@Input() public sh: string = null;

	/**
	 * The texture of light component
	 */
	@Input() public texture: NgxAbstractTextureComponent = null;

	/**
	 * The target of light component
	 */
	@Input() public target: any = null;

	/**
	 * The targetX of light component
	 */
	@Input() public targetX: number = null;

	/**
	 * The targetY of light component
	 */
	@Input() public targetY: number = null;

	/**
	 * The targetZ of light component
	 */
	@Input() public targetZ: number = null;

	/**
	 * The renderer of light component
	 */
	@Input() public renderer: any = null;

	/**
	 * The renderTarget of light component
	 */
	@Input() public renderTarget: any = null;

	/**
	 * Gets shadow map size width
	 * @param [def]
	 * @returns shadow map size width
	 */
	private getShadowMapSizeWidth(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.shadowMapSizeWidth, this.shadowMapSize, def);
	}

	/**
	 * Gets shadow map size height
	 * @param [def]
	 * @returns shadow map size height
	 */
	private getShadowMapSizeHeight(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.shadowMapSizeHeight, this.shadowMapSize, def);
	}

	/**
	 * Gets shadow camera left
	 * @param [def]
	 * @returns shadow camera left
	 */
	private getShadowCameraLeft(def?: number): number {
		if (NgxThreeUtil.isNotNull(this.shadowCameraLeft)) {
			return NgxThreeUtil.getTypeSafe(this.shadowCameraLeft, def);
		} else if (NgxThreeUtil.isNotNull(this.shadowCameraRight)) {
			return NgxThreeUtil.getTypeSafe(this.shadowCameraRight * -1, def);
		} else {
			return def;
		}
	}

	/**
	 * Gets shadow camera right
	 * @param [def]
	 * @returns shadow camera right
	 */
	private getShadowCameraRight(def?: number): number {
		if (NgxThreeUtil.isNotNull(this.shadowCameraRight)) {
			return NgxThreeUtil.getTypeSafe(this.shadowCameraRight, def);
		} else if (NgxThreeUtil.isNotNull(this.shadowCameraLeft)) {
			return NgxThreeUtil.getTypeSafe(this.shadowCameraLeft * -1, def);
		} else {
			return def;
		}
	}

	/**
	 * Gets shadow camera top
	 * @param [def]
	 * @returns shadow camera top
	 */
	private getShadowCameraTop(def?: number): number {
		if (NgxThreeUtil.isNotNull(this.shadowCameraTop)) {
			return NgxThreeUtil.getTypeSafe(this.shadowCameraTop, def);
		} else if (NgxThreeUtil.isNotNull(this.shadowCameraBottom)) {
			return NgxThreeUtil.getTypeSafe(this.shadowCameraBottom * -1, def);
		} else {
			return def;
		}
	}

	/**
	 * Gets shadow camera bottom
	 * @param [def]
	 * @returns shadow camera bottom
	 */
	private getShadowCameraBottom(def?: number): number {
		if (NgxThreeUtil.isNotNull(this.shadowCameraBottom)) {
			return NgxThreeUtil.getTypeSafe(this.shadowCameraBottom, def);
		} else if (NgxThreeUtil.isNotNull(this.shadowCameraTop)) {
			return NgxThreeUtil.getTypeSafe(this.shadowCameraTop * -1, def);
		} else {
			return def;
		}
	}

	/**
	 * Gets sh
	 * @param [def]
	 * @returns sh
	 */
	private getSh(def?: string): I3JS.SphericalHarmonics3 {
		const sh = NgxThreeUtil.getTypeSafe(this.sh, def, 'harmonics3');
		if (NgxThreeUtil.isNotNull(sh) && sh != '') {
			switch (sh.toLowerCase()) {
				case 'harmonics3':
				default:
					return new N3JS.SphericalHarmonics3();
			}
		}
		return undefined;
	}

	/**
	 * Gets target
	 * @returns target
	 */
	private getTarget(): I3JS.Object3D {
		if (NgxThreeUtil.isNotNull(this.target)) {
			return NgxThreeUtil.getObject3d(this.target);
		}
		return undefined;
	}

	/**
	 * Gets three renderer
	 * @returns three renderer
	 */
	public getThreeRenderer(): I3JS.Renderer {
		if (NgxThreeUtil.isNotNull(this.renderer) && NgxThreeUtil.isNotNull(this.renderer.getRenderer)) {
			return this.renderer.getRenderer();
		} else {
			return NgxThreeUtil.getRenderer();
		}
	}

	/**
	 * Creates an instance of light component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('light');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
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
		if (changes && this.light) {
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
	 * Gets tag attribute
	 * @param [options]
	 * @returns
	 */
	public getTagAttribute(options: any = {}) {
		const tagAttributes: ITagAttributes = {
			tag: 'ngx3js-light',
			attributes: [],
			options: options,
			children: [],
		};
		super.getTagAttributeObject3d(tagAttributes);
		const attributesKeys: string[] = [
			'type',
			'color',
			'skyColor',
			'groundColor',
			'intensity',
			'distance',
			'angle',
			'penumbra',
			'decay',
			'width',
			'height',
			'castShadow',
			'shadowBias',
			'shadowFocus',
			'shadowCameraNear',
			'shadowMapSizeWidth',
			'shadowMapSizeHeight',
			'shadowCameraFar',
			'shadowCameraFov',
			'shadowCameraLeft',
			'shadowCameraRight',
			'shadowCameraTop',
			'shadowCameraBottom',
			'shadowCameraZoom',
			'sh',
			'texture',
			'target',
			'renderer',
			'renderTarget',
		];
		const light = this.light;
		if (NgxThreeUtil.isNotNull(light)) {
			const anyLight: any = light;
			attributesKeys.forEach((key) => {
				if (NgxThreeUtil.isNotNull(this.selfAny[key])) {
					switch (key) {
						case 'shadowBias':
						case 'shadowFocus':
							if (NgxThreeUtil.isNotNull(light['shadow'])) {
								switch (key) {
									case 'shadowBias':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['bias'],
										});
										break;
									case 'shadowFocus':
										tagAttributes.attributes.push({
											name: key,
											value: anyLight['shadow']['focus'],
										});
										break;
								}
							}
							break;
						case 'shadowMapSizeWidth':
						case 'shadowMapSizeHeight':
							if (NgxThreeUtil.isNotNull(light['shadow']) && NgxThreeUtil.isNotNull(light['shadow']['mapSize'])) {
								switch (key) {
									case 'shadowMapSizeWidth':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['mapSize']['width'],
										});
										break;
									case 'shadowMapSizeHeight':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['mapSize']['height'],
										});
										break;
								}
							}
							break;
						case 'angle':
							if (NgxThreeUtil.isNotNull(anyLight[key])) {
								tagAttributes.attributes.push({
									name: key,
									value: NgxThreeUtil.getRadian2AngleSafe(anyLight[key]),
								});
							}
							break;
						case 'shadowCameraNear':
						case 'shadowCameraFar':
						case 'shadowCameraFov':
						case 'shadowCameraLeft':
						case 'shadowCameraRight':
						case 'shadowCameraTop':
						case 'shadowCameraBottom':
						case 'shadowCameraZoom':
							if (NgxThreeUtil.isNotNull(light['shadow']) && NgxThreeUtil.isNotNull(light['shadow']['camera'])) {
								const anyLightShadowCamera: any = light['shadow']['camera'];
								switch (key) {
									case 'shadowCameraNear':
										tagAttributes.attributes.push({
											name: key,
											value: anyLightShadowCamera['near'],
										});
										break;
									case 'shadowCameraFar':
										tagAttributes.attributes.push({
											name: key,
											value: anyLightShadowCamera['far'],
										});
										break;
									case 'shadowCameraFov':
										tagAttributes.attributes.push({
											name: key,
											value: anyLightShadowCamera['fov'],
										});
										break;
									case 'shadowCameraLeft':
										tagAttributes.attributes.push({
											name: key,
											value: anyLightShadowCamera['left'],
										});
										break;
									case 'shadowCameraRight':
										tagAttributes.attributes.push({
											name: key,
											value: anyLightShadowCamera['right'],
										});
										break;
									case 'shadowCameraTop':
										tagAttributes.attributes.push({
											name: key,
											value: anyLightShadowCamera['top'],
										});
										break;
									case 'shadowCameraBottom':
										tagAttributes.attributes.push({
											name: key,
											value: anyLightShadowCamera['bottom'],
										});
										break;
									case 'shadowCameraZoom':
										tagAttributes.attributes.push({
											name: key,
											value: anyLightShadowCamera['zoom'],
										});
										break;
								}
							}
							break;
						default:
							if (NgxThreeUtil.isNotNull(anyLight[key])) {
								tagAttributes.attributes.push({
									name: key,
									value: anyLight[key],
								});
							}
							break;
					}
				}
			});
		}
		return tagAttributes;
	}

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: I3JS.Object3D): boolean {
		if (super.setParent(parent)) {
			this.getLight();
			return true;
		}
		return false;
	}

	/**
	 * Applys changes3d
	 * @param changes
	 */
	public applyChanges3d(changes: string[]) {
		if (this.light !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getLight();
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, ['helper']);
			}
			if (
				!NgxThreeUtil.isOnlyIndexOf(
					changes,
					[
						'shadowbias',
						'shadowradius',
						'shadowmapsizewidth',
						'shadowmapsize',
						'shadowmapsizeheight',
						'shadowcamerafov',
						'shadowcameranear',
						'shadowcamerafar',
						'shadowcamerazoom',
						'shadowcameraleft',
						'shadowcameraright',
						'shadowcameratop',
						'shadowcamerabottom',
					],
					this.OBJECT3D_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, ['shadowmapsizewidth', 'shadowmapsizeheight'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['shadowmapsize']);
			}
			if (
				NgxThreeUtil.isIndexOf(changes, [
					'shadowcamerafov',
					'shadowcameranear',
					'shadowcamerafar',
					'shadowcamerazoom',
					'shadowcameraleft',
					'shadowcameraright',
					'shadowcameratop',
					'shadowcamerabottom',
				])
			) {
				changes = NgxThreeUtil.pushUniq(changes, ['shadowcamera']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'shadowbias':
						if (NgxThreeUtil.isNotNull(this.shadowBias)) {
							this.light.shadow.bias = NgxThreeUtil.getTypeSafe(this.shadowBias, 0);
						}
						break;
					case 'shadowradius':
						if (NgxThreeUtil.isNotNull(this.shadowRadius)) {
							this.light.shadow.radius = NgxThreeUtil.getTypeSafe(this.shadowRadius, 1);
						}
						break;
					case 'shadowmapsize':
						if (NgxThreeUtil.isNotNull(this.shadowMapSizeWidth) || NgxThreeUtil.isNotNull(this.shadowMapSize)) {
							this.light.shadow.mapSize.width = this.getShadowMapSizeWidth(1024);
						}
						if (NgxThreeUtil.isNotNull(this.shadowMapSizeHeight) || NgxThreeUtil.isNotNull(this.shadowMapSize)) {
							this.light.shadow.mapSize.height = this.getShadowMapSizeHeight(1024);
						}
						break;
					case 'shadowcamera':
						if (this.light.shadow.camera) {
							if (this.light.shadow.camera instanceof N3JS.PerspectiveCamera) {
								if (NgxThreeUtil.isNotNull(this.shadowCameraFov)) {
									this.light.shadow.camera.fov = NgxThreeUtil.getTypeSafe(this.shadowCameraFov, 50);
								}
								if (NgxThreeUtil.isNotNull(this.shadowCameraNear)) {
									this.light.shadow.camera.near = NgxThreeUtil.getTypeSafe(this.shadowCameraNear, 0.5);
								}
								if (NgxThreeUtil.isNotNull(this.shadowCameraFar)) {
									this.light.shadow.camera.far = NgxThreeUtil.getTypeSafe(this.shadowCameraFar, 500);
								}
								if (NgxThreeUtil.isNotNull(this.shadowCameraZoom)) {
									this.light.shadow.camera.zoom = NgxThreeUtil.getTypeSafe(this.shadowCameraZoom, 1);
								}
							} else if (this.light.shadow.camera instanceof N3JS.OrthographicCamera) {
								if (NgxThreeUtil.isNotNull(this.shadowCameraLeft)) {
									this.light.shadow.camera.left = this.getShadowCameraLeft(-5);
								}
								if (NgxThreeUtil.isNotNull(this.shadowCameraRight)) {
									this.light.shadow.camera.right = this.getShadowCameraRight(5);
								}
								if (NgxThreeUtil.isNotNull(this.shadowCameraTop)) {
									this.light.shadow.camera.top = this.getShadowCameraTop(5);
								}
								if (NgxThreeUtil.isNotNull(this.shadowCameraBottom)) {
									this.light.shadow.camera.bottom = this.getShadowCameraBottom(-5);
								}
								if (NgxThreeUtil.isNotNull(this.shadowCameraNear)) {
									this.light.shadow.camera.near = NgxThreeUtil.getTypeSafe(this.shadowCameraNear, 0.5);
								}
								if (NgxThreeUtil.isNotNull(this.shadowCameraFar)) {
									this.light.shadow.camera.far = NgxThreeUtil.getTypeSafe(this.shadowCameraFar, 500);
								}
								if (NgxThreeUtil.isNotNull(this.shadowCameraZoom)) {
									this.light.shadow.camera.zoom = NgxThreeUtil.getTypeSafe(this.shadowCameraZoom, 1);
								}
							}
						}
						break;
					default:
						break;
				}
			});
			super.applyChanges3d(changes);
		}
	}

	/**
	 * The Light of light component
	 */
	private light: I3JS.Light = null;

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T extends I3JS.Object3D>(): T {
		return this.getLight() as any;
	}

	/**
	 * Gets light
	 * @template T
	 * @returns light
	 */
	public getLight<T extends I3JS.Light>(): T {
		if (this.light === null || this._needUpdate) {
			this.needUpdate = false;
			this.light = null;
			let basemesh: I3JS.Light = null;
			switch (this.type.toLowerCase()) {
				case 'directionallight':
				case 'directional':
					const directionalLight = new N3JS.DirectionalLight(
						NgxThreeUtil.getColorSafe(this.color, 0xffffff),
						NgxThreeUtil.getTypeSafe(this.intensity, 1)
					);
					basemesh = directionalLight;
					break;
				case 'hemispherelight':
				case 'hemisphere':
					const hemisphereLight = new N3JS.HemisphereLight(
						NgxThreeUtil.getColorSafe(this.skyColor, this.color, 0xffffff),
						NgxThreeUtil.getColorSafe(this.groundColor, this.color, 0xffffff),
						NgxThreeUtil.getTypeSafe(this.intensity, 1)
					);
					basemesh = hemisphereLight;
					break;
				case 'lightprobe':
				case 'probe':
					basemesh = new N3JS.LightProbe(this.getSh(), NgxThreeUtil.getTypeSafe(this.intensity, 1));
					if (NgxThreeUtil.isNotNull(this.texture)) {
						this.unSubscribeRefer('texture');
						const texture = this.texture.getTexture();
						if (NgxThreeUtil.isTextureLoaded(texture) && texture instanceof N3JS.CubeTexture) {
							basemesh.copy(N3JS.LightProbeGenerator.fromCubeTexture(texture));
						}
						this.subscribeRefer(
							'texture',
							NgxThreeUtil.getSubscribe(
								this.texture,
								() => {
									if (NgxThreeUtil.isTextureLoaded(texture) && texture instanceof N3JS.CubeTexture) {
										basemesh.copy(N3JS.LightProbeGenerator.fromCubeTexture(texture));
									}
								},
								'loaded'
							)
						);
					} else if (NgxThreeUtil.isNotNull(this.renderTarget)) {
						const renderer = this.getThreeRenderer();
						let renderTarget = null;
						if (NgxThreeUtil.isNotNull(this.renderTarget.getTool)) {
							renderTarget = this.renderTarget.getTool();
						} else if (NgxThreeUtil.isNotNull(this.renderTarget.getCubeRenderTarget)) {
							renderTarget = this.renderTarget.getCubeRenderTarget();
						} else {
							renderTarget = this.renderTarget;
						}
						if (renderer instanceof N3JS.WebGLRenderer && renderTarget instanceof N3JS.WebGLCubeRenderTarget) {
							try {
								basemesh.copy(N3JS.LightProbeGenerator.fromCubeRenderTarget(renderer, renderTarget));
							} catch (ex) {
								console.log(ex);
							}
						}
					}
					break;
				case 'pointlight':
				case 'point':
					const pointLight = new N3JS.PointLight(
						NgxThreeUtil.getColorSafe(this.color, 0xffffff),
						NgxThreeUtil.getTypeSafe(this.intensity, 1),
						NgxThreeUtil.getTypeSafe(this.distance),
						NgxThreeUtil.getTypeSafe(this.decay)
					);
					basemesh = pointLight;
					break;
				case 'arealight':
				case 'area':
				case 'rectarealight':
				case 'rectarea':
					basemesh = new N3JS.RectAreaLight(
						NgxThreeUtil.getColorSafe(this.color, 0xffffff),
						NgxThreeUtil.getTypeSafe(this.intensity, 1),
						NgxThreeUtil.getTypeSafe(this.width, 10),
						NgxThreeUtil.getTypeSafe(this.height, 10)
					);
					break;
				case 'spotlight':
				case 'spot':
					const spotLight = new N3JS.SpotLight(
						NgxThreeUtil.getColorSafe(this.color, 0xffffff),
						NgxThreeUtil.getTypeSafe(this.intensity, 1),
						NgxThreeUtil.getTypeSafe(this.distance),
						NgxThreeUtil.getAngleSafe(this.angle),
						NgxThreeUtil.getTypeSafe(this.penumbra),
						NgxThreeUtil.getTypeSafe(this.decay)
					);
					if (NgxThreeUtil.isNotNull(this.shadowFocus)) {
						spotLight.shadow.focus = NgxThreeUtil.getTypeSafe(this.shadowFocus, 1);
					}
					basemesh = spotLight;
					break;
				case 'ambientlight':
				case 'ambient':
				default:
					basemesh = new N3JS.AmbientLight(
						NgxThreeUtil.getColorSafe(this.color, 0x0c0c0c),
						NgxThreeUtil.getTypeSafe(this.intensity, 1)
					);
					break;
			}
			const anyBasemesh: any = basemesh;
			if (NgxThreeUtil.isNotNull(anyBasemesh['target'])) {
				if (NgxThreeUtil.isNotNull(this.target)) {
					anyBasemesh['target'] = this.getTarget();
				} else if (
					NgxThreeUtil.isNotNull(this.targetX) &&
					NgxThreeUtil.isNotNull(this.targetY) &&
					NgxThreeUtil.isNotNull(this.targetZ)
				) {
					anyBasemesh['target'].position.copy(NgxThreeUtil.getVector3Safe(this.targetX, this.targetY, this.targetZ));
				}
			}
			this.light = basemesh;
			if (this.light instanceof N3JS.SpotLight || this.light instanceof N3JS.DirectionalLight) {
				const target = this.getTarget();
				if (NgxThreeUtil.isNotNull(target)) {
					this.light.target = target;
				}
				if (NgxThreeUtil.isNotNull(this.light.target)) {
					if (this.parent !== null && this.light.target.parent === null && this.parent !== this.light.target) {
						this.parent.add(this.light.target);
					}
				}
			}
			if (this.light.shadow) {
				if (NgxThreeUtil.isNotNull(this.shadowBias)) {
					this.light.shadow.bias = NgxThreeUtil.getTypeSafe(this.shadowBias, 0);
				}
				if (NgxThreeUtil.isNotNull(this.shadowRadius)) {
					this.light.shadow.radius = NgxThreeUtil.getTypeSafe(this.shadowRadius, 1);
				}
				if (NgxThreeUtil.isNotNull(this.shadowMapSizeWidth) || NgxThreeUtil.isNotNull(this.shadowMapSize)) {
					this.light.shadow.mapSize.width = this.getShadowMapSizeWidth(1024);
				}
				if (NgxThreeUtil.isNotNull(this.shadowMapSizeHeight) || NgxThreeUtil.isNotNull(this.shadowMapSize)) {
					this.light.shadow.mapSize.height = this.getShadowMapSizeHeight(1024);
				}
				if (this.light.shadow.camera) {
					if (this.light.shadow.camera instanceof N3JS.PerspectiveCamera) {
						if (NgxThreeUtil.isNotNull(this.shadowCameraFov)) {
							this.light.shadow.camera.fov = NgxThreeUtil.getTypeSafe(this.shadowCameraFov, 50);
						}
						if (NgxThreeUtil.isNotNull(this.shadowCameraNear)) {
							this.light.shadow.camera.near = NgxThreeUtil.getTypeSafe(this.shadowCameraNear, 0.5);
						}
						if (NgxThreeUtil.isNotNull(this.shadowCameraFar)) {
							this.light.shadow.camera.far = NgxThreeUtil.getTypeSafe(this.shadowCameraFar, 500);
						}
						if (NgxThreeUtil.isNotNull(this.shadowCameraZoom)) {
							this.light.shadow.camera.zoom = NgxThreeUtil.getTypeSafe(this.shadowCameraZoom, 1);
						}
					} else if (this.light.shadow.camera instanceof N3JS.OrthographicCamera) {
						if (NgxThreeUtil.isNotNull(this.shadowCameraLeft)) {
							this.light.shadow.camera.left = this.getShadowCameraLeft(-5);
						}
						if (NgxThreeUtil.isNotNull(this.shadowCameraRight)) {
							this.light.shadow.camera.right = this.getShadowCameraRight(5);
						}
						if (NgxThreeUtil.isNotNull(this.shadowCameraTop)) {
							this.light.shadow.camera.top = this.getShadowCameraTop(5);
						}
						if (NgxThreeUtil.isNotNull(this.shadowCameraBottom)) {
							this.light.shadow.camera.bottom = this.getShadowCameraBottom(-5);
						}
						if (NgxThreeUtil.isNotNull(this.shadowCameraNear)) {
							this.light.shadow.camera.near = NgxThreeUtil.getTypeSafe(this.shadowCameraNear, 0.5);
						}
						if (NgxThreeUtil.isNotNull(this.shadowCameraFar)) {
							this.light.shadow.camera.far = NgxThreeUtil.getTypeSafe(this.shadowCameraFar, 500);
						}
						if (NgxThreeUtil.isNotNull(this.shadowCameraZoom)) {
							this.light.shadow.camera.zoom = NgxThreeUtil.getTypeSafe(this.shadowCameraZoom, 1);
						}
					}
				}
				// this.light.shadow.updateMatrices(this.light);
			}
			this.setObject3d(this.light);
		}
		return this.light as T;
	}
}
