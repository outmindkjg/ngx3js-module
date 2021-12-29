import { Component, ContentChildren, forwardRef, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { NgxCurveComponent } from '../curve/curve.component';
import { NgxHtmlComponent } from '../html/html.component';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { NgxLensflareelementComponent } from '../lensflareelement/lensflareelement.component';
import { NgxMaterialComponent } from '../material/material.component';
import { ICssStyle, IHelperOptions, ILightOptions, IMaterialParameters, INgxColor, IVolumeOptions } from '../ngx-interface';
import { NgxAbstractObject3dComponent } from '../object3d.abstract';
import { NgxSizeComponent } from '../size/size.component';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxAbstractTextureComponent } from '../texture.abstract';
import { NgxHelperComponent } from './../helper/helper.component';
import { NgxLightComponent } from './../light/light.component';
import { NgxLocalStorageService } from './../local-storage.service';
import * as THREE_OBJ from './objects/three-objects';

/**
 * The Mesh component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MeshComponent) page for details.
 *
 * ```html
 * <ngx3js-mesh [type]="'skybox'" [skyboxType]="'sun'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'HTMLMesh'" [domElement]="domElement"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'SVGObject'" [cssTag]="'div'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'CSS2DObject'" [cssTag]="'div'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'CSS3DSprite'" [cssTag]="'div'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Reflector'"
 * 	[color]="'0x889999'" [clipBias]="0.003"
 * 	[textureWidth]="1024" [textureWidth]="1024"
 * ></ngx3js-mesh>
 * <ngx3js-mesh [type]="'ReflectorRTT'"
 * 	[color]="'0x889999'" [clipBias]="0.003"
 * 	[textureWidth]="1024" [textureWidth]="1024"
 * ></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Refractor'"
 * 	[color]="'0x999999'"
 * 	[textureWidth]="1024" [textureHeight]="1024" [shader]="'WaterRefraction'"
 * ></ngx3js-mesh>
 * <ngx3js-mesh [type]="'ReflectorRTT'"
 * 	[color]="'0x889999'" [clipBias]="0.003"
 * 	[textureWidth]="1024" [textureWidth]="1024"
 * ></ngx3js-mesh>
 * <ngx3js-mesh [type]="'ReflectorForSSRPass'"
 * 	[color]="'0x889999'" [clipBias]="0.003"
 * 	[textureWidth]="1024" [textureWidth]="1024"
 * ></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Water'"
 * 	[sunColor]="'0xffffff'" [waterColor]="'0x001e0f'"
 * 	[sunDirection]="sunDirection"
 * 	[textureWidth]="512" [textureHeight]="512"
 * 	[alpha]="alpha" [distortionScale]="distortionScale"
 * 	[uniforms]="uniforms"
 * ></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Water2'"
 * 	[color]="'#ffffff'" [waterScale]="4" [reflectivity]="0.02"
 * 	[flowDirectionX]="1" [flowDirectionY]="1" [textureWidth]="1024"
 * 	[textureHeight]="1024"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Sky'" [uniforms]="{
 * 		sunPosition: { type: 'v3', value: sunDirection },
 * 		turbidity: { type: 'number', value: 10 },
 * 		rayleigh: { type: 'number', value: 2 },
 * 		mieCoefficient: { type: 'number', value: 0.005 },
 * 		mieDirectionalG: { type: 'number', value: 0.8 }}"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Flow'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'InstancedFlow'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'LineLoop'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Light'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Lensflare'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'InstancedMesh'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'merged'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'naive'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'multimaterial'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Sprite'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Wireframe'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'LOD'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'MarchingCubes'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Points'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Line'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'TubePainter'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Text'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Line2'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'LineSegments'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'MD2CharacterComplex'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'InteractiveGroup'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Group'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Mesh'"></ngx3js-mesh>
 * ```
 *
 * @see THREE.Mesh
 * @see THREE.Group
 */
@Component({
	selector: 'ngx3js-mesh',
	templateUrl: './mesh.component.html',
	styleUrls: ['./mesh.component.scss'],
	providers: [
		{
			provide: NgxAbstractObject3dComponent,
			useExisting: forwardRef(() => NgxMeshComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxMeshComponent),
		},
	],
})
export class NgxMeshComponent extends NgxAbstractObject3dComponent implements OnInit {
	/**
	 * The type of mesh
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | Lensflare | type : skybox, skyboxType : sun |
	 * | SVGObject | SVGObject, SVG |
	 * | CSS2DObject | CSS2DObject, CSS2D |
	 * | CSS3DSprite | CSS3DSprite |
	 * | CSS3DObject | CSS3DObject, CSS3D, CSS |
	 * | Reflector | Reflector |
	 * | ReflectorRTT | ReflectorRTT |
	 * | Refractor | Refractor |
	 * | ReflectorForSSRPass | RefractorForSSRPass |
	 * | Water | Water |
	 * | Water2 | Water2 |
	 * | Sky | Sky |
	 * | Flow | Flow |
	 * | InstancedFlow | InstancedFlow |
	 * | THREE.Light | light |
	 * | THREE.LineLoop | LineLoop |
	 * | Lensflare | Lensflare, lensflareelement |
	 * | THREE.InstancedMesh | InstancedMesh, Instanced |
	 * | BufferGeometryUtils.mergeBufferGeometries | merged |
	 * | SceneUtils.createMultiMaterialObject | multimaterial, multi |
	 * | THREE.Sprite | Sprite |
	 * | Wireframe | wireframe |
	 * | THREE.LOD | lod |
	 * | MarchingCubes | marchingcubes |
	 * | THREE.Points | points |
	 * | THREE.Line | Line |
	 * | Line2 | line2 |
	 * | THREE.LineSegments | linesegments |
	 * | MD2CharacterComplex | md2charactercomplex |
	 * | THREE.Group | group |
	 * | THREE.Mesh | mesh |
	 */
	@Input() public type: string = 'mesh';

	/**
	 * The options of light
	 *
	 * @see LightOptions
	 */
	@Input() public lightOptions: ILightOptions = null;

	/**
	 * The css tag of CSS2DObject, CSS3DObject
	 *
	 * | HTMLDivElement | div |
	 * | HTMLSpanElement | span |
	 */
	@Input() public cssTag: string | any = null;

	/**
	 * The domElement of CSS2DObject, CSS3DObject, HtmlMesh
	 *
	 */
	@Input() public domElement: HTMLElement = null;

	/**
	 * The css style of CSS2DObject, CSS3DObject
	 *
	 * @see CssStyle
	 */
	@Input() public cssStyle: string | ICssStyle = null;

	/**
	 * The type of skybox
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | Lensflare | sun |
	 * | THREE.BoxGeometry | box |
	 * | THREE.SphereGeometry | sphere |
	 *
	 */
	@Input() public skyboxType: string = 'auto';

	/**
	 * The rate of Skybox from distance
	 */
	@Input() public skyboxRate: number = 100;

	/**
	 * The image of skybox
	 */
	@Input() public skyboxImage: string | any = null;

	/**
	 * The cube image of skybox
	 */
	@Input() public skyboxCubeImage: string[] = null;

	/**
	 * The sun image of skybox
	 */
	@Input() public skyboxSunImage: string = null;

	/**
	 * The sun X direction in degree.
	 */
	@Input() public skyboxSunX: number = 0;

	/**
	 * The sun Y direction in degree.
	 */
	@Input() public skyboxSunY: number = 0;

	/**
	 * The sun Z direction in degree.
	 */
	@Input() public skyboxSunZ: number = 0;

	/**
	 * The type of helper
	 */
	@Input() public helperType: string = null;

	/**
	 * The options of helper
	 *
	 */
	@Input() public helperOptions: IHelperOptions = null;

	/**
	 * The scale step of MultiMaterialObject
	 */
	@Input() public scaleStep: number = 1;

	/**
	 * use Plane Stencil
	 */
	@Input() public usePlaneStencil: boolean = false;

	/**
	 * The storage Name
	 */
	@Input() public storageName: string = null;

	/**
	 * The storage Option
	 */
	@Input() public storageOption: any = null;

	/**
	 * The volume Option
	 */
	@Input() public volumeOption: IVolumeOptions = null;

	/**
	 * The color of sun etc
	 */
	@Input() public color: INgxColor = null;

	/**
	 * The texture Width
	 */
	@Input() public textureWidth: number = null;

	/**
	 * The texture Height
	 */
	@Input() public textureHeight: number = null;

	/**
	 * The texture size
	 */
	@Input() public textureSize: I3JS.Vector2 | NgxSizeComponent = null;

	/**
	 * The clip bias of Reflector
	 */
	@Input() public clipBias: number = null;

	/**
	 * The clip bias of Reflector
	 */
	@Input() public useDepthTexture: boolean = null;

	/**
	 * The color of sun
	 */
	@Input() public sunColor: INgxColor = null;

	/**
	 * The direction of sun
	 */
	@Input() public sunDirection: number[] | I3JS.Vector3 = null;

	/**
	 * The position of sun
	 */
	@Input() public sunPosition: number[] | I3JS.Vector3 = null;

	/**
	 * The uniform of sun, sky water etc
	 */
	@Input() public uniforms: {
		[uniform: string]: { type: string; value: any; options?: any } | I3JS.IUniform;
	} = null;

	/**
	 * The distortion scale of Water
	 */
	@Input() public distortionScale: number = null;

	/**
	 * The alpha of water
	 */
	@Input() public alpha: number = null;

	/**
	 * The color of sky
	 */
	@Input() public skyColor: string | number = null;

	/**
	 * The color water
	 */
	@Input() public waterColor: string | number = null;

	/**
	 * The distance of sun
	 */
	@Input() public distance: number = null;

	/**
	 * How much the material is like a metal. Non-metallic materials such as wood or stone use 0.0, metallic use 1.0, with nothing (usually) in between. Default is 0.0. A value between 0.0 and 1.0 could be used for a rusty metal look. If metalnessMap is also provided, both values are multiplied.
	 */
	@Input() public metalness: number = null;

	/**
	 * How rough the material appears. 0.0 means a smooth mirror reflection, 1.0 means fully diffuse. Default is 1.0.
	 * If roughnessMap is also provided, both values are multiplied.
	 */
	@Input() public roughness: number = null;

	/**
	 * The count of mesh component
	 */
	@Input() public count: number = null;

	/**
	 * The axis of mesh component
	 */
	@Input() public axis: string = null;

	/**
	 * The index of mesh component
	 */
	@Input() public index: number = null;

	/**
	 * The size of mesh component
	 */
	@Input() public size: number = null;

	/**
	 * The text of mesh component
	 */
	@Input() public text: string = null;

	/**
	 * The divisions of mesh component
	 */
	@Input() public divisions: number = null;

	/**
	 * The usage of InstancedMesh
	 * 
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.StaticDrawUsage | StaticDrawUsage, StaticDraw |
	 * | THREE.DynamicDrawUsage | DynamicDrawUsage, DynamicDraw |
	 * | THREE.StreamDrawUsage | StreamDrawUsage, StreamDraw |
	 * | THREE.StaticReadUsage | StaticReadUsage, StaticRead |
	 * | THREE.DynamicReadUsage | DynamicReadUsage, DynamicRead |
	 * | THREE.StreamReadUsage | StreamReadUsage, StreamRead |
	 * | THREE.StaticCopyUsage | StaticCopyUsage, StaticCopy |
	 * | THREE.DynamicCopyUsage | DynamicCopyUsage, DynamicCopy |
	 * | THREE.StreamCopyUsage | StreamCopyUsage, StreamCopy |
	 */
	@Input() public usage: string = null;

	/**
	 * The enableUvs of mesh component
	 */
	@Input() public enableUvs: boolean = null;

	/**
	 * The enableColors of mesh component
	 */
	@Input() public enableColors: boolean = null;

	/**
	 * The resolution of mesh component
	 */
	@Input() public resolution: number = null;

	/**
	 * The isolation of mesh component
	 */
	@Input() public isolation: number = null;

	/**
	 * The flowDirectionX of mesh component
	 */
	@Input() public flowDirectionX: number = null;

	/**
	 * The flowDirectionY of mesh component
	 */
	@Input() public flowDirectionY: number = null;

	/**
	 * The flowSpeed of mesh component
	 */
	@Input() public flowSpeed: number = null;

	/**
	 * The reflectivity of mesh component
	 */
	@Input() public reflectivity: number = null;

	/**
	 * The waterScale of mesh component
	 */
	@Input() public waterScale: number = null;

	/**
	 * The flowMap of mesh component
	 */
	@Input() public flowMap: string | I3JS.Texture | NgxAbstractTextureComponent = null;

	/**
	 * The normalMap0 of mesh component
	 */
	@Input() public normalMap0: string | I3JS.Texture | NgxAbstractTextureComponent = null;

	/**
	 * The normalMap1 of mesh component
	 */
	@Input() public normalMap1: string | I3JS.Texture | NgxAbstractTextureComponent = null;

	/**
	 * The planeInfos of mesh component
	 */
	@Input() public planeInfos: {
		type: string;
		strength: number;
		subtract: number;
	}[] = null;

	/**
	 * The blobInfos of mesh component
	 */
	@Input() public blobInfos: {
		x: number;
		y: number;
		z: number;
		strength: number;
		subtract: number;
		colors?: any;
	}[] = null;

	/**
	 * The makeMatrix of mesh component
	 */
	@Input() public makeMatrix: (matrix4: I3JS.Matrix4, index?: number) => void = null;

	/**
	 * The makeColor of mesh component
	 */
	@Input() public makeColor: (color: I3JS.Color, index?: number) => void = null;

	/**
	 * The refer texture
	 */
	@Input() public texture: NgxAbstractTextureComponent | I3JS.Texture = null;

	/**
	 * The curve
	 */
	@Input() public curve: NgxCurveComponent | I3JS.Curve<I3JS.Vector3> = null;

	/**
	 * Define whether the material uses morphTargets. Default is false.
	 */
	@Input() public morphTargets: boolean = null;

	/**
	 * The centerX of mesh component
	 */
	@Input() public centerX: number = null;

	/**
	 * The centerY of mesh component
	 */
	@Input() public centerY: number = null;

	/**
	 * The shader of mesh component
	 */
	@Input() public shader: string = null;

	/**
	 * [THREE.LinearEncoding](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) is the default.
	 * See the [texture constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) page for details of other formats.
	 * Note that if this value is changed on a texture after the material has been used, it is necessary to trigger a Material.needsUpdate for this value to be realized in the shader.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.LinearEncoding | LinearEncoding , |
	 * | THREE.sRGBEncoding | sRGBEncoding , |
	 * | THREE.GammaEncoding | GammaEncoding , |
	 * | THREE.RGBEEncoding | RGBEEncoding , |
	 * | THREE.LogLuvEncoding | LogLuvEncoding , |
	 * | THREE.RGBM7Encoding | RGBM7Encoding , |
	 * | THREE.RGBM16Encoding | RGBM16Encoding , |
	 * | THREE.RGBDEncoding | RGBDEncoding , |
	 */
	@Input() public encoding: string = null;

	/**
	 * Input  of mesh component
	 */
	@Input() public materialOption: IMaterialParameters = null;

	/**
	 * The shareParts of mesh component
	 */
	@Input() public shareParts: NgxMeshComponent = null;

	/**
	 * The sharedMesh of mesh component
	 */
	@Input() public sharedMesh: NgxMeshComponent = null;

	/**
	 * The sharedCamera of mesh component
	 */
	@Input() public sharedCamera: any = null;

	/**
	 * The moveAlongCurve of mesh component
	 */
	@Input() public moveAlongCurve: number = null;

	/**
	 * The moveIndividualAlongCurve of mesh component
	 */
	@Input() public moveIndividualAlongCurve: number[] | string = null;

	/**
	 * The colors of mesh component
	 */
	@Input() public colors: number[] | string = null;

	/**
	 * The stormParams  of mesh component
	 */
	@Input() public stormParams: I3JS.StormParams = {
		size: 1024,
	};

	/**
	 * The rayParams of geometry component
	 */
	@Input() public rayParams: I3JS.RayParameters = null;

	/**
	 * Content children of mesh component
	 */
	@ContentChildren(NgxAbstractTextureComponent, { descendants: false }) private textureList: QueryList<NgxAbstractTextureComponent>;

	/**
	 * Content children of mesh component
	 */
	@ContentChildren(NgxLensflareelementComponent, { descendants: false }) private lensflareElementList: QueryList<NgxLensflareelementComponent>;

	/**
	 * Content children of mesh component
	 */
	@ContentChildren(NgxHtmlComponent, { descendants: false }) private cssChildrenList: QueryList<NgxHtmlComponent>;

	/**
	 * Content children of mesh component
	 */
	@ContentChildren(NgxCurveComponent, { descendants: false }) private curveList: QueryList<NgxCurveComponent>;

	/**
	 * Creates an instance of mesh component.
	 * @param localStorageService
	 */
	constructor(private localStorageService: NgxLocalStorageService) {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('mesh');
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
		if (changes && this.mesh) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(this.textureList, 'textureList', 'texture');
		this.subscribeListQueryChange(this.lensflareElementList, 'lensflareElementList', 'lensflareElement');
		this.subscribeListQueryChange(this.cssChildrenList, 'cssChildrenList', 'cssChildren');
		this.subscribeListQueryChange(this.curveList, 'curveList', 'curve');
		super.ngAfterContentInit();
	}

	/**
	 * Gets skybox size
	 * @param [def]
	 * @returns skybox size
	 */
	private getSkyboxSize(def?: number): number {
		const skyboxSize = NgxThreeUtil.getTypeSafe(this.distance, def, 10000);
		if (NgxThreeUtil.isNotNull(skyboxSize)) {
			return (skyboxSize * this.skyboxRate) / 100;
		} else {
			return 10000;
		}
	}

	/**
	 * Gets css tag
	 * @returns css tag
	 */
	private getCssTag(): any {
		if (NgxThreeUtil.isNotNull(this.domElement)) {
			return this.domElement;
		}
		const cssTag = NgxThreeUtil.getTypeSafe(this.cssTag, 'div');
		if (typeof cssTag === 'string') {
			return document.createElement(cssTag);
		} else if (cssTag instanceof Element) {
			return cssTag.cloneNode();
		}
		return document.createElement('div');
	}

	/**
	 * Gets sky sun position
	 * @returns sky sun position
	 */
	private getSkySunPosition(): I3JS.Euler {
		return NgxThreeUtil.getEulerSafe(
			NgxThreeUtil.getAngleSafe(this.skyboxSunX, 0),
			NgxThreeUtil.getAngleSafe(this.skyboxSunY, 0),
			NgxThreeUtil.getAngleSafe(this.skyboxSunZ, 0)
		);
	}

	/**
	 * Gets metalness
	 * @param [def]
	 * @returns metalness
	 */
	private getMetalness(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.metalness, def);
	}

	/**
	 * Gets roughness
	 * @param [def]
	 * @returns roughness
	 */
	private getRoughness(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.roughness, def);
	}

	/**
	 * Gets count
	 * @param [def]
	 * @returns count
	 */
	private getCount(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.count, def);
	}

	/**
	 * Gets axis
	 * @param [def]
	 * @returns axis
	 */
	private getAxis(def?: string): string {
		return NgxThreeUtil.getTypeSafe(this.axis, def);
	}

	/**
	 * Gets index
	 * @param baseSize
	 * @param def
	 * @returns index
	 */
	private getIndex(baseSize: number, def: number): number {
		const index = NgxThreeUtil.getTypeSafe(this.index, def);
		return Math.floor(baseSize * index);
	}

	/**
	 * Gets color
	 * @param [def]
	 * @returns color
	 */
	private getColor(def?: INgxColor): I3JS.Color {
		return NgxThreeUtil.getColorSafe(this.color, this.waterColor, def);
	}

	/**
	 * Gets height
	 * @param [def]
	 * @returns height
	 */
	private getTextureSize(width?: number, height?: number): I3JS.Vector2 {
		if (NgxThreeUtil.isNotNull(this.textureSize)) {
			if (this.textureSize instanceof N3JS.Vector2) {
				return this.textureSize;
			} else if (this.textureSize instanceof NgxSizeComponent) {
				return this.textureSize.getSize();
			}
		}
		return NgxThreeUtil.getVector2Safe(
			NgxThreeUtil.getTypeSafe(this.textureWidth, width, 1024),
			NgxThreeUtil.getTypeSafe(this.textureHeight, height, 1024),
			null,
			null,
			true
		).multiplyScalar(window.devicePixelRatio);
	}

	/**
	 * Gets clip bias
	 * @param [def]
	 * @returns clip bias
	 */
	private getClipBias(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.clipBias, def);
	}

	/**
	 * Gets sun color
	 * @param [def]
	 * @returns sun color
	 */
	private getSunColor(def?: string | number): I3JS.Color {
		return NgxThreeUtil.getColorSafe(this.sunColor, def);
	}

	/**
	 * Gets undate uniforms
	 * @param [orgUniforms]
	 */
	private getUndateUniforms(orgUniforms?: { [uniform: string]: I3JS.IUniform }): void {
		const uniforms = NgxThreeUtil.getTypeSafe(this.uniforms, {});
		Object.entries(uniforms).forEach(([key, value]) => {
			if (NgxThreeUtil.isNotNull(orgUniforms[key])) {
				const anyValue: any = value;
				const uniformsValue = orgUniforms[key];
				if (NgxThreeUtil.isNotNull(anyValue['type']) && NgxThreeUtil.isNotNull(anyValue['value'])) {
					switch (anyValue['type'].toLowerCase()) {
						case 'vector2':
						case 'v2':
							uniformsValue.value = NgxThreeUtil.getVector2Safe(value['value'][0], value['value'][1]);
							break;
						case 'vector3':
						case 'vector':
						case 'v3':
							uniformsValue.value = NgxThreeUtil.getVector3Safe(value['value'][0], value['value'][1], value['value'][2]);
							break;
						case 'color':
							uniformsValue.value = NgxThreeUtil.getColorSafe(value['value'], 0xffffff);
							break;
						case 'texture':
							const texture = NgxAbstractTextureComponent.getTextureImage(value['value']);
							if (NgxThreeUtil.isNotNull(anyValue['options'])) {
								switch (anyValue['options']) {
									case 'wrapRepeat':
										texture.wrapS = texture.wrapT = N3JS.RepeatWrapping;
										break;
								}
							}
							uniformsValue.value = texture;
							break;
						case 'number':
							uniformsValue.value = parseFloat(value['value']);
							break;
					}
				} else {
					orgUniforms.value = value;
				}
			}
		});
	}

	/**
	 * Gets sun direction
	 * @param [def]
	 * @returns sun direction
	 */
	private getSunDirection(def?: I3JS.Vector3): I3JS.Vector3 {
		let sunDirection: I3JS.Vector3 = null;
		if (NgxThreeUtil.isNotNull(this.sunDirection)) {
			sunDirection = NgxThreeUtil.getVector3VSafe(this.sunDirection, def);
		} else {
			sunDirection = NgxThreeUtil.getVector3VSafe(this.sunPosition, def);
		}
		if (NgxThreeUtil.isNotNull(sunDirection)) {
			return sunDirection.normalize();
		} else {
			return undefined;
		}
	}

	/**
	 * Gets alpha
	 * @param [def]
	 * @returns alpha
	 */
	private getAlpha(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.alpha, def);
	}

	/**
	 * Gets distortion scale
	 * @param [def]
	 * @returns distortion scale
	 */
	private getDistortionScale(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.distortionScale, def);
	}

	/**
	 * Gets sky color
	 * @param [def]
	 * @returns sky color
	 */
	private getSkyColor(def?: string | number): I3JS.Color {
		return NgxThreeUtil.getColorSafe(this.skyColor, def);
	}

	/**
	 * Gets water color
	 * @param [def]
	 * @returns water color
	 */
	private getWaterColor(def?: string | number): I3JS.Color {
		return NgxThreeUtil.getColorSafe(this.waterColor, def);
	}

	/**
	 * Gets size
	 * @param [def]
	 * @returns size
	 */
	private getSize(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.size, def);
	}

	/**
	 * Gets divisions
	 * @param [def]
	 * @returns divisions
	 */
	private getDivisions(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.divisions, def);
	}

	/**
	 * Gets enable colors
	 * @param [def]
	 * @returns true if enable colors
	 */
	private getEnableColors(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.enableColors, def);
	}

	/**
	 * Gets enable uvs
	 * @param [def]
	 * @returns true if enable uvs
	 */
	private getEnableUvs(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.enableUvs, def);
	}

	/**
	 * Gets resolution
	 * @param [def]
	 * @returns resolution
	 */
	private getResolution(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.resolution, def);
	}

	/**
	 * Gets isolation
	 * @param [def]
	 * @returns isolation
	 */
	private getIsolation(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.isolation, def);
	}

	/**
	 * Gets flow direction
	 * @param [def]
	 * @returns flow direction
	 */
	private getFlowDirection(def?: I3JS.Vector2): I3JS.Vector2 {
		return NgxThreeUtil.getVector2Safe(this.flowDirectionX, this.flowDirectionY, def);
	}

	/**
	 * Gets flow speed
	 * @param [def]
	 * @returns flow speed
	 */
	private getFlowSpeed(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.flowSpeed, def);
	}

	/**
	 * Gets reflectivity
	 * @param [def]
	 * @returns reflectivity
	 */
	private getReflectivity(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.reflectivity, def);
	}

	/**
	 * Gets water scale
	 * @param [def]
	 * @returns water scale
	 */
	private getWaterScale(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.waterScale, def);
	}

	/**
	 * Gets shader
	 * @param [def]
	 * @returns
	 */
	private getShader(def?: string): I3JS.Shader {
		const shader = NgxThreeUtil.getTypeSafe(this.shader, def, '');
		switch (shader.toLowerCase()) {
			case 'waterrefractionshader':
			case 'waterrefraction':
				return N3JS.WaterRefractionShader;
			default:
				break;
		}
		return undefined;
	}

	/**
	 * The Clips of mesh component
	 */
	private clips: I3JS.AnimationClip[] | any = null;

	/**
	 * Clip mesh of mesh component
	 */
	private clipMesh: I3JS.Object3D = null;

	/**
	 * Storage source of mesh component
	 */
	public storageSource: any = null;

	/**
	 * Gets storage source
	 * @returns storage source
	 */
	public getStorageSource(): any {
		return this.storageSource;
	}

	/**
	 * Gets material
	 * @returns material
	 */
	public getMaterial(): I3JS.Material {
		if (this.mesh !== null && this.object3d instanceof N3JS.Mesh) {
			if (Array.isArray(this.object3d.material)) {
				return this.object3d.material[0];
			} else if (this.object3d.material instanceof N3JS.Material) {
				return this.object3d.material;
			}
		}
		return null;
	}

	/**
	 * Gets curve
	 * @returns curve
	 */
	public getCurve(): I3JS.Curve<I3JS.Vector3> {
		if (this.curve !== null) {
			this.unSubscribeRefer('curve');
			if (this.curve instanceof N3JS.Curve) {
				return this.curve;
			} else if (this.curve instanceof NgxCurveComponent) {
				const curve = this.curve.getCurve() as I3JS.Curve<I3JS.Vector3>;
				this.subscribeRefer(
					'curve',
					NgxThreeUtil.getSubscribe(
						this.curve,
						() => {
							this.needUpdate = true;
						},
						'curve'
					)
				);
				return curve;
			}
		}
		if (this.curveList !== null && this.curveList.length > 0) {
			return this.curveList.first.getCurve() as I3JS.Curve<I3JS.Vector3>;
		}
		return null;
	}

	/**
	 * Gets texture
	 * @param type
	 * @param [alterTexture]
	 * @param [defImage]
	 * @returns texture
	 */
	private getTexture(
		type: string,
		alterTexture?: string | I3JS.Texture | NgxAbstractTextureComponent,
		defImage?: string
	): I3JS.Texture {
		if (this.texture !== null && this.texture !== undefined) {
			const texture = NgxThreeUtil.getTexture(this.texture, type, false);
			if (NgxThreeUtil.isNotNull(texture)) {
				return texture;
			}
		}
		if (this.textureList !== null && this.textureList.length > 0) {
			const foundTexture = this.textureList.find((texture) => {
				return texture.isTexture(type);
			});
			if (NgxThreeUtil.isNotNull(foundTexture)) {
				return foundTexture.getTexture();
			}
		}
		if (NgxThreeUtil.isNotNull(alterTexture)) {
			if (alterTexture instanceof N3JS.Texture) {
				return alterTexture;
			} else if (alterTexture instanceof NgxAbstractTextureComponent) {
				return alterTexture.getTexture();
			} else if (typeof alterTexture === 'string') {
				return NgxAbstractTextureComponent.getTextureImage(alterTexture);
			}
		}
		if (NgxThreeUtil.isNotNull(defImage)) {
			return NgxAbstractTextureComponent.getTextureImage(defImage);
		}
		return undefined;
	}

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: I3JS.Object3D): boolean {
		if (super.setParent(parent)) {
			this.getMesh();
			return true;
		}
		return false;
	}

	/**
	 * Sets wire frame
	 * @param wireframe
	 * @param [child]
	 */
	public setWireFrame(wireframe: boolean, child: I3JS.Object3D = null) {
		if (child === null) {
			child = this.object3d;
		}
		if (child instanceof N3JS.Mesh) {
			const anyMaterial: any = child.material as I3JS.Material;
			if (child.material instanceof N3JS.Material && anyMaterial['wireframe'] !== undefined) {
				anyMaterial['wireframe'] = wireframe;
			} else if (child.material instanceof Array) {
				child.material.forEach((material: any) => {
					if (material['wireframe'] !== undefined) {
						material['wireframe'] = wireframe;
					}
				});
			}
		}
		child.children.forEach((obj) => {
			this.setWireFrame(wireframe, obj);
		});
	}

	/**
	 * Sets visible
	 * @param visible
	 * @param [helperVisible]
	 */
	public setVisible(visible: boolean, helperVisible: boolean = null) {
		super.setVisible(visible);
		if (this.helperComponent !== null && helperVisible !== null && helperVisible !== undefined) {
			this.helperComponent.updateInputParams({ visible: helperVisible });
		}
	}

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	public applyChanges3d(changes: string[]) {
		if (this.mesh !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getObject3d();
				return;
			}
			if (
				!NgxThreeUtil.isOnlyIndexOf(
					changes,
					['geometry', 'svg', 'listener', 'audio', 'csschildren', 'controller', 'material', 'mixer', 'volumeoption'],
					this.OBJECT3D_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (!NgxThreeUtil.isIndexOf(changes, 'init') && NgxThreeUtil.isIndexOf(changes, ['geometry', 'material'])) {
				switch (this.type.toLowerCase()) {
					case 'merged':
					case 'naive':
					case 'multi':
					case 'multimaterial':
					case 'marchingcubes':
					case 'reflectorrtt':
					case 'flow':
					case 'instancedflow':
						this.needUpdate = true;
						return;
				}
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, [
					'geometry',
					'svg',
					'listener',
					'audio',
					'csschildren',
					'material',
					'helper',
					'mixer',
				]);
			}
			if (NgxThreeUtil.isIndexOf(changes, 'html')) {
				changes = NgxThreeUtil.pushUniq(changes, ['csschildren']);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['helpertype', 'helperoption'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['helper']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'helper':
						this.resetHelper();
						break;
					case 'volumeoption':
						if (NgxThreeUtil.isNotNull(this.volumeOption)) {
							const volume: I3JS.Volume = this.getUserData()['storageSource'];
							if (NgxThreeUtil.isNotNull(volume) && volume instanceof N3JS.Volume) {
								const mesh = this.mesh;
								const rasDimensions = volume.RASDimensions;
								const volumeMax: number = volume.max;
								const volumeMin: number = volume.min;
								Object.entries(this.volumeOption).forEach(([key, value]) => {
									let sliceMesh: I3JS.Object3D = null;
									let rasDimensionsSize: number = 0;
									switch (key.toLowerCase()) {
										case 'helpervisible':
											const helper = mesh.getObjectByName('helper');
											if (NgxThreeUtil.isNotNull(helper)) {
												helper.visible = value as boolean;
											}
											break;
										case 'helpercolor':
											const helperMat: any = mesh.getObjectByName('helper');
											if (NgxThreeUtil.isNotNull(helperMat) && NgxThreeUtil.isNotNull(helperMat['material'])) {
												helperMat['material'].color = NgxThreeUtil.getColorSafe(value, 0xffff00);
											}
											break;
										case 'boxvisible':
											const box = mesh.getObjectByName('box');
											if (NgxThreeUtil.isNotNull(box)) {
												box.visible = value as boolean;
											}
											break;
										case 'xvisible':
											const sliceMeshx = mesh.getObjectByName('x');
											if (NgxThreeUtil.isNotNull(sliceMeshx)) {
												sliceMeshx.visible = value as boolean;
											}
											break;
										case 'yvisible':
											const sliceMeshy = mesh.getObjectByName('y');
											if (NgxThreeUtil.isNotNull(sliceMeshy)) {
												sliceMeshy.visible = value as boolean;
											}
											break;
										case 'zvisible':
											const sliceMeshz = mesh.getObjectByName('z');
											if (NgxThreeUtil.isNotNull(sliceMeshz)) {
												sliceMeshz.visible = value as boolean;
											}
											break;
										case 'x':
										case 'indexx':
											sliceMesh = mesh.getObjectByName('x');
											rasDimensionsSize = rasDimensions[0];
											break;
										case 'y':
										case 'indexx':
											sliceMesh = mesh.getObjectByName('y');
											rasDimensionsSize = rasDimensions[1];
											break;
										case 'z':
										case 'indexz':
											sliceMesh = mesh.getObjectByName('z');
											rasDimensionsSize = rasDimensions[2];
											break;
										case 'lowerthreshold':
										case 'lower':
											volume.lowerThreshold = Math.min(
												volumeMax,
												Math.max(volumeMin, (volumeMax - volumeMin) * (value as number) + volumeMin)
											);
											break;
										case 'upperthreshold':
										case 'upper':
											volume.upperThreshold = Math.min(
												volumeMax,
												Math.max(volumeMin, (volumeMax - volumeMin) * (value as number) + volumeMin)
											);
											break;
										case 'windowlow':
										case 'low':
											(volume).windowLow = Math.min(
												volumeMax,
												Math.max(volumeMin, (volumeMax - volumeMin) * (value as number) + volumeMin)
											);
											break;
										case 'windowhigh':
										case 'high':
											(volume).windowHigh = Math.min(
												volumeMax,
												Math.max(volumeMin, (volumeMax - volumeMin) * (value as number) + volumeMin)
											);
											break;
									}
									if (NgxThreeUtil.isNotNull(sliceMesh) && NgxThreeUtil.isNotNull(sliceMesh.userData.volumeSlice)) {
										const valueNum: number = value as number;
										const volumeSlice: I3JS.VolumeSlice = sliceMesh.userData.volumeSlice;
										volumeSlice.index = Math.max(
											0,
											Math.min(rasDimensionsSize - 1, Math.round(rasDimensionsSize * valueNum))
										);
										volumeSlice.repaint.call(volumeSlice);
									}
								});
								volume.repaintAllSlices();
							}
						}
						break;
					case 'csschildren':
						this.unSubscribeReferList('cssChildrenList');
						if (NgxThreeUtil.isNotNull(this.cssChildrenList)) {
							this.cssChildrenList.forEach((cssChild) => {
								cssChild.setParent(this.mesh);
							});
							this.subscribeListQuery(this.cssChildrenList, 'cssChildrenList', 'html');
						}
						break;
				}
			});
			super.applyChanges3d(changes);
		}
	}

	/**
	 * Gets json
	 * @returns json
	 */
	public getJson(): any {
		return this.getObject3d().toJSON();
	}

	/**
	 * Sets savelocal storage
	 * @param storageName
	 * @returns
	 */
	public setSavelocalStorage(storageName: string) {
		return this.localStorageService.setObject(storageName, this.getObject3d());
	}

	/**
	 * Css clazz name of mesh component
	 */
	private cssClazzName: string = null;
	private mesh: I3JS.Object3D = null;

	/**
	 * Gets real mesh
	 * @returns real mesh
	 */
	public getRealMesh(): I3JS.Mesh | I3JS.LineSegments | I3JS.Line | I3JS.Points {
		if (
			this.mesh instanceof N3JS.Mesh ||
			this.mesh instanceof N3JS.LineSegments ||
			this.mesh instanceof N3JS.Line ||
			this.mesh instanceof N3JS.Points
		) {
			return this.mesh;
		}
		if (
			NgxThreeUtil.isNotNull(this.mesh.userData.refTarget) &&
			(this.mesh.userData.refTarget instanceof N3JS.Mesh ||
				this.mesh.userData.refTarget instanceof N3JS.LineSegments ||
				this.mesh.userData.refTarget instanceof N3JS.Line ||
				this.mesh.userData.refTarget instanceof N3JS.Points)
		) {
			return this.mesh.userData.refTarget;
		}
		let mesh: I3JS.Object3D = this.mesh;
		while (mesh.children && mesh.children.length > 0) {
			mesh = mesh.children[0];
			if (
				mesh instanceof N3JS.Mesh ||
				mesh instanceof N3JS.LineSegments ||
				mesh instanceof N3JS.Line ||
				mesh instanceof N3JS.Points
			) {
				return mesh;
			}
		}
		return null;
	}

	/**
	 * Gets clips
	 * @returns clips
	 */
	public getClips(): I3JS.AnimationClip[] | any {
		return this.clips;
	}

	/**
	 * Gets uniforms
	 * @returns uniforms
	 */
	public getUniforms(): { [uniform: string]: I3JS.IUniform } {
		const material: any = this.getMaterial();
		if (NgxThreeUtil.isNotNull(material) && NgxThreeUtil.isNotNull(material['uniforms'])) {
			return material['uniforms'];
		}
		return null;
	}

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T extends I3JS.Object3D>(): T {
		return this.getMesh();
	}

	/**
	 * Gets mesh
	 * @template T
	 * @returns mesh
	 */
	public getMesh<T extends I3JS.Object3D>(): T {
		if (this.mesh === null || this._needUpdate) {
			this.needUpdate = false;
			this.setUserData('refTarget', null);
			this.setUserData('storageSource', null);
			this.setUserData('clips', null);
			this.clips = null;
			if (this.clipMesh !== null) {
				this.removeObject3d(this.clipMesh);
				this.clipMesh = null;
			}
			this.unSubscribeRefer('customGeometry');
			this.unSubscribeRefer('textureSize');
			let geometry: I3JS.BufferGeometry = null;
			if ((this.geometryList !== null && this.geometryList.length > 0) || this.geometry !== null) {
				geometry = this.getGeometry();
			}
			let basemesh: I3JS.Object3D = null;
			switch (this.type.toLowerCase()) {
				case 'skybox':
					const skyboxSize = this.getSkyboxSize(1500);
					switch (this.skyboxType.toLowerCase()) {
						case 'sun':
							const lensflare = new N3JS.Lensflare();
							lensflare.addElement(
								new N3JS.LensflareElement(
									NgxAbstractTextureComponent.getTextureImage(this.skyboxSunImage),
									this.getSize(100),
									0,
									this.getColor(null)
								)
							);
							lensflare.position.set(0, 0, skyboxSize * 0.99);
							lensflare.position.applyEuler(this.getSkySunPosition());
							basemesh = lensflare;
							break;
						case 'box':
						case 'sphere':
						default:
							let skyGeometry: I3JS.BufferGeometry = null;
							let skyMaterial: I3JS.Material = null;
							switch (this.skyboxType.toLowerCase()) {
								case 'box':
									skyGeometry = new N3JS.BoxGeometry(skyboxSize, skyboxSize, skyboxSize);
									break;
								case 'sphere':
								default:
									skyGeometry = new N3JS.SphereGeometry(skyboxSize, 8, 6);
									break;
							}
							if (NgxThreeUtil.isNotNull(this.skyboxImage) || NgxThreeUtil.isNotNull(this.skyboxCubeImage)) {
								const envMap = NgxAbstractTextureComponent.getTextureImage(this.skyboxImage, this.skyboxCubeImage);
								skyMaterial = new N3JS.MeshBasicMaterial({
									depthTest: false,
									envMap: envMap,
									side: N3JS.BackSide,
								});
							} else {
								skyMaterial = new N3JS.MeshBasicMaterial({
									depthTest: false,
									// depthWrite : false,
									color: this.getSkyColor(0xff0000),
									side: N3JS.BackSide,
								});
							}
							basemesh = new N3JS.Mesh(skyGeometry, skyMaterial);
							basemesh.receiveShadow = false;
							basemesh.castShadow = false;
							break;
					}
					break;
				case 'html':
				case 'htmlmesh':
					basemesh = new THREE_OBJ.NgxHTMLMesh(this.getCssTag(), this.materialOption);
					break;
				case 'svg':
				case 'svgobject':
				case 'css':
				case 'css2d':
				case 'css2dobject':
				case 'css3d':
				case 'css3dobject':
				case 'css3dsprite':
					const cssElement: any = this.getCssTag();
					if (NgxThreeUtil.isNotNull(this.cssStyle)) {
						this.cssClazzName = NgxThreeUtil.addCssStyle(cssElement, this.cssStyle, this.cssClazzName, 'mesh', 'inline');
					}
					switch (this.type.toLowerCase()) {
						case 'svg':
						case 'svgobject':
							basemesh = new N3JS.SVGObject(cssElement as SVGElement);
							break;
						case 'css2d':
						case 'css2dobject':
							basemesh = new N3JS.CSS2DObject(cssElement);
							break;
						case 'css3dsprite':
							basemesh = new N3JS.CSS3DSprite(cssElement);
							break;
						case 'css3dobject':
						case 'css3d':
						case 'css':
						default:
							basemesh = new N3JS.CSS3DObject(cssElement);
							break;
					}
					break;
				case 'reflector':
					const reflectorSize = this.getTextureSize();
					const reflector = new N3JS.Reflector(geometry, {
						color: this.getColor(),
						textureWidth: reflectorSize.x,
						textureHeight: reflectorSize.y,
						clipBias: this.getClipBias(0.003),
						shader: this.getShader(),
						encoding: NgxThreeUtil.getTextureEncodingSafe(this.encoding, null, ''),
					});
					this.subscribeRefer(
						'textureSize',
						NgxThreeUtil.getSubscribe(
							this.textureSize,
							() => {
								const size = this.getTextureSize();
								reflector.getRenderTarget().setSize(size.x, size.y);
							},
							'loaded'
						)
					);
					basemesh = reflector;
					break;
				case 'reflectorrtt':
					const reflectorRTTSize = this.getTextureSize();
					const reflectorRTT = new N3JS.ReflectorRTT(geometry, {
						color: this.getColor(),
						textureWidth: reflectorRTTSize.x,
						textureHeight: reflectorRTTSize.y,
						clipBias: this.getClipBias(0.003),
						shader: this.getShader(),
						encoding: NgxThreeUtil.getTextureEncodingSafe(this.encoding, null, ''),
					});
					this.subscribeRefer(
						'textureSize',
						NgxThreeUtil.getSubscribe(
							this.textureSize,
							() => {
								const size = this.getTextureSize();
								reflectorRTT.getRenderTarget().setSize(size.x, size.y);
							},
							'loaded'
						)
					);
					basemesh = reflectorRTT;
					break;
				case 'refractor':
					const refractorSize = this.getTextureSize();
					const refractor = new N3JS.Refractor(geometry, {
						color: this.getColor(),
						textureWidth: refractorSize.x,
						textureHeight: refractorSize.y,
						clipBias: this.getClipBias(0.003),
						shader: this.getShader(),
						encoding: NgxThreeUtil.getTextureEncodingSafe(this.encoding, null, ''),
					});
					const refractorMaterial : any = refractor.material;
					Object.entries(refractorMaterial.uniforms).forEach(([key, value]) => {
						const uniform: { value: any } = value as any;
						switch (key.toLowerCase()) {
							case 'tdudv':
								uniform.value = this.getTexture('tdudv') || null;
								break;
						}
					});
					this.subscribeRefer(
						'textureSize',
						NgxThreeUtil.getSubscribe(
							this.textureSize,
							() => {
								const size = this.getTextureSize();
								refractor.getRenderTarget().setSize(size.x, size.y);
							},
							'loaded'
						)
					);
					basemesh = refractor;
					break;
				case 'reflectorforssrmesh':
				case 'reflectorforssrpass':
				case 'reflectorforssr':
					const reflectorForSSRPassSize = this.getTextureSize();
					const reflectorForSSRPass = new N3JS.ReflectorForSSRPass(geometry, {
						textureWidth: reflectorForSSRPassSize.x,
						textureHeight: reflectorForSSRPassSize.y,
						clipBias: this.getClipBias(0.003),
						color: this.getColor(0x7f7f7f).getHex(),
						useDepthTexture: NgxThreeUtil.getTypeSafe(this.useDepthTexture, true),
					});
					this.subscribeRefer(
						'textureSize',
						NgxThreeUtil.getSubscribe(
							this.textureSize,
							() => {
								const size = this.getTextureSize();
								reflectorForSSRPass.getRenderTarget().setSize(size.x, size.y);
							},
							'loaded'
						)
					);
					basemesh = reflectorForSSRPass;
					break;
				case 'water':
					const waterSize = this.getTextureSize();
					const water = new N3JS.Water(geometry, {
						textureWidth: waterSize.x,
						textureHeight: waterSize.y,
						clipBias: this.getClipBias(0.003),
						alpha: this.getAlpha(),
						time: 0,
						waterNormals: this.getTexture('waterNormals'),
						sunDirection: this.getSunDirection(),
						sunColor: this.getSunColor(),
						waterColor: this.getWaterColor(),
						distortionScale: this.getDistortionScale(),
						fog: false,
					});
					this.getUndateUniforms(water.material['uniforms']);
					this.subscribeRefer(
						'textureSize',
						NgxThreeUtil.getSubscribe(
							this.textureSize,
							() => {
								// const size = this.getTextureSize();
								// todo
							},
							'loaded'
						)
					);
					basemesh = water;
					break;
				case 'water2':
					const water2Size = this.getTextureSize();
					const water2 = new N3JS.Water2(geometry, {
						textureWidth: water2Size.x,
						textureHeight: water2Size.y,
						clipBias: this.getClipBias(0.003),
						color: this.getColor(),
						flowDirection: this.getFlowDirection(),
						flowSpeed: this.getFlowSpeed(),
						reflectivity: this.getReflectivity(),
						scale: this.getWaterScale(),
						shader: this.getShader(),
						flowMap: this.getTexture('flowMap', this.flowMap),
						normalMap0: this.getTexture('normalMap0', this.normalMap0, 'textures/water/Water_1_M_Normal.jpg'),
						normalMap1: this.getTexture('normalMap1', this.normalMap1, 'textures/water/Water_2_M_Normal.jpg'),
						encoding: NgxThreeUtil.getTextureEncodingSafe(this.encoding, null, ''),
					});
					this.getUndateUniforms(water2.material['uniforms']);
					this.subscribeRefer(
						'textureSize',
						NgxThreeUtil.getSubscribe(
							this.textureSize,
							() => {
								// const size = this.getTextureSize();
								// todo
							},
							'loaded'
						)
					);
					basemesh = water2;
					break;
				case 'sky':
					const sky = new N3JS.Sky();
					this.getUndateUniforms(sky.material.uniforms);
					basemesh = sky;
					break;
				case 'flow':
					const flowMaterial = this.getMaterialOne();
					const objectToCurve = new N3JS.Mesh(geometry, flowMaterial);
					const flow = new N3JS.Flow(objectToCurve);
					const flowCurve = this.getCurve();
					if (NgxThreeUtil.isNotNull(flowCurve)) {
						flow.updateCurve(0, flowCurve);
					}
					this.setUserData('storageSource', flow);
					basemesh = new N3JS.Group();
					basemesh.add(flow.object3D);
					if (NgxThreeUtil.isNotNull(this.moveAlongCurve)) {
						flow.object3D.onBeforeRender = () => {
							flow.moveAlongCurve(NgxThreeUtil.getTypeSafe(this.moveAlongCurve, 0.001));
						};
					}
					break;
				case 'instancedflow':
					const instancedFlowMaterial = this.getMaterialOne();
					const instancedFlowCount = this.getCount(1);
					const instancedFlow = new N3JS.InstancedFlow(instancedFlowCount, 1, geometry, instancedFlowMaterial);
					const instancedFlowCurve = this.getCurve();
					if (NgxThreeUtil.isNotNull(instancedFlowCurve)) {
						instancedFlow.updateCurve(0, instancedFlowCurve);
						instancedFlow.setCurve(0, 0);
						const instancedFlowColor = NgxThreeUtil.getTypeSafe(this.colors, 'rand');
						const instancedFlowColors: I3JS.Color[] = [];
						if (typeof instancedFlowColor === 'string') {
							switch (instancedFlowColor.toLowerCase()) {
								case 'null':
									for (let i = 0; i < instancedFlowCount; i++) {
										instancedFlowColors.push(null);
									}
									break;
								case 'rand':
								case 'random':
									for (let i = 0; i < instancedFlowCount; i++) {
										instancedFlowColors.push(new N3JS.Color(0xffffff * Math.random()));
									}
									break;
								default:
									const colorList = instancedFlowColor.split(',');
									for (let i = 0; i < instancedFlowCount; i++) {
										if (colorList.length > i) {
											instancedFlowColors.push(NgxThreeUtil.getColorSafe(colorList[i]));
										} else {
											instancedFlowColors.push(null);
										}
									}
									break;
							}
						} else if (Array.isArray(instancedFlowColor)) {
							const colorList = instancedFlowColor;
							for (let i = 0; i < instancedFlowCount; i++) {
								if (colorList.length > i) {
									instancedFlowColors.push(NgxThreeUtil.getColorSafe(colorList[i]));
								} else {
									instancedFlowColors.push(null);
								}
							}
						} else {
							for (let i = 0; i < instancedFlowCount; i++) {
								instancedFlowColors.push(null);
							}
						}
						const instancedFlowOffset = NgxThreeUtil.getTypeSafe(this.moveIndividualAlongCurve, 'equals');
						const instancedFlowOffsets: number[] = [];
						if (typeof instancedFlowOffset === 'string') {
							switch (instancedFlowOffset.toLowerCase()) {
								case 'equals':
									for (let i = 0; i < instancedFlowCount; i++) {
										instancedFlowOffsets.push(i / instancedFlowCount);
									}
									break;
								case 'rand':
								case 'random':
									for (let i = 0; i < instancedFlowCount; i++) {
										instancedFlowOffsets.push(Math.random());
									}
									break;
								default:
									const offsetList = instancedFlowOffset.split(',');
									for (let i = 0; i < instancedFlowCount; i++) {
										if (offsetList.length > i) {
											instancedFlowOffsets.push(Math.min(1, Math.max(0, parseFloat(offsetList[0]))));
										} else {
											instancedFlowOffsets.push(null);
										}
									}
									break;
							}
						} else if (Array.isArray(instancedFlowOffset)) {
							const offsetList = instancedFlowOffset;
							for (let i = 0; i < instancedFlowCount; i++) {
								if (offsetList.length > i) {
									instancedFlowOffsets.push(offsetList[i]);
								} else {
									instancedFlowOffsets.push(null);
								}
							}
						} else {
							for (let i = 0; i < instancedFlowCount; i++) {
								instancedFlowOffsets.push(null);
							}
						}
						for (let i = 0; i < instancedFlowCount; i++) {
							if (NgxThreeUtil.isNotNull(instancedFlowOffsets[i])) {
								instancedFlow.moveIndividualAlongCurve(i, instancedFlowOffsets[i]);
							}
							if (NgxThreeUtil.isNotNull(instancedFlowColors[i])) {
								instancedFlow.object3D.setColorAt(i, instancedFlowColors[i]);
							}
						}
					}
					this.setUserData('storageSource', instancedFlow);
					basemesh = new N3JS.Group();
					basemesh.add(instancedFlow.object3D);
					if (NgxThreeUtil.isNotNull(this.moveAlongCurve)) {
						instancedFlow.object3D.onBeforeRender = () => {
							instancedFlow.moveAlongCurve(NgxThreeUtil.getTypeSafe(this.moveAlongCurve, 0.001));
						};
					}
					break;
				case 'lineloop':
					let points: any[] = [];
					const lineloopCurve = this.getCurve();
					if (NgxThreeUtil.isNotNull(lineloopCurve)) {
						points = lineloopCurve.getPoints(this.getDivisions(50));
					}
					const lineLoop = new N3JS.LineLoop(new N3JS.BufferGeometry().setFromPoints(points), this.getMaterials());
					basemesh = lineLoop;
					break;
				case 'light':
					const light = this.initLocalComponent('light', new NgxLightComponent());
					light.updateInputParams(this.lightOptions);
					basemesh = light.getObject3d();
					break;
				case 'lensflareelement':
				case 'lensflare':
					const lensflare = new N3JS.Lensflare();
					this.lensflareElementList.forEach((lensflareElement) => {
						lensflareElement.setLensflare(lensflare);
					});
					basemesh = lensflare;
					break;
				case 'instancedmesh':
				case 'instanced':
					const instanced = new N3JS.InstancedMesh(geometry, this.getMaterialOne(), this.getCount(1));
					if (NgxThreeUtil.isNotNull(this.usage)) {
						instanced.instanceMatrix.setUsage(NgxThreeUtil.getUsageSafe(this.usage, 'dynamicdraw'));
					}
					if (NgxThreeUtil.isNotNull(this.makeMatrix)) {
						const matrix = new N3JS.Matrix4();
						for (let i = 0; i < instanced.count; i++) {
							this.makeMatrix(matrix, i);
							instanced.setMatrixAt(i, matrix);
						}
					}
					if (NgxThreeUtil.isNotNull(this.makeColor)) {
						const color = new N3JS.Color();
						for (let i = 0; i < instanced.count; i++) {
							this.makeColor(color, i);
							instanced.setColorAt(i, color);
						}
					}
					basemesh = instanced;
					break;
				case 'merged':
					{
						const geometries = [];
						const count = this.getCount(1);
						for (let i = 0; i < count; i++) {
							const instanceGeometry = geometry.clone();
							if (NgxThreeUtil.isNotNull(this.makeMatrix)) {
								const matrix = new N3JS.Matrix4();
								this.makeMatrix(matrix);
								instanceGeometry.applyMatrix4(matrix);
							}
							geometries.push(instanceGeometry);
						}
						const materials = this.getMaterials();
						const mergedGeometry = N3JS.GeometryUtils.mergeBufferGeometries(geometries);
						basemesh = new N3JS.Mesh(mergedGeometry, materials);
					}
					break;
				case 'naive':
					{
						basemesh = new N3JS.Group();
						const matrix = new N3JS.Matrix4();
						const material = this.getMaterials();
						const count = this.getCount(1);
						for (let i = 0; i < count; i++) {
							if (NgxThreeUtil.isNotNull(this.makeMatrix)) {
								this.makeMatrix(matrix);
							}
							const mesh = new N3JS.Mesh(geometry, material);
							mesh.applyMatrix4(matrix);
							basemesh.add(mesh);
						}
					}
					break;
				case 'multi':
				case 'multimaterial':
					basemesh = N3JS.SceneUtils.createMultiMaterialObject(geometry, this.getMaterialsMulti());
					basemesh.children.forEach((e: any) => {
						e.castShadow = true;
					});
					if (this.scaleStep != 1) {
						let scaleStep = this.scaleStep;
						basemesh.children.forEach((mesh: any) => {
							mesh.scale.x *= scaleStep;
							mesh.scale.y *= scaleStep;
							mesh.scale.z *= scaleStep;
							scaleStep *= this.scaleStep;
						});
					}
					break;
				case 'sprite':
					const sprite = new N3JS.Sprite(this.getMaterialOne() as I3JS.SpriteMaterial);
					if (NgxThreeUtil.isNotNull(this.centerX) && NgxThreeUtil.isNotNull(this.centerY)) {
						sprite.center.copy(NgxThreeUtil.getVector2Safe(this.centerX, this.centerY, new N3JS.Vector2()));
					}
					basemesh = sprite;
					break;
				case 'wireframe':
					basemesh = new N3JS.Wireframe(geometry, this.getMaterialOne());
					break;
				case 'lod':
					basemesh = new N3JS.LOD();
					break;
				case 'marchingcubes':
					const effect = new N3JS.MarchingCubes(
						this.getResolution(28),
						this.getMaterialOne(),
						this.getEnableUvs(false),
						this.getEnableColors(false)
					);
					if (NgxThreeUtil.isNotNull(this.isolation)) {
						effect.isolation = this.getIsolation(80.0);
					}
					if (NgxThreeUtil.isNotNull(this.blobInfos) && this.blobInfos.length > 0) {
						this.blobInfos.forEach((blobInfo) => {
							effect.addBall(
								blobInfo.x,
								blobInfo.y,
								blobInfo.z,
								blobInfo.strength,
								blobInfo.subtract,
								NgxThreeUtil.getColorSafe(blobInfo.colors)
							);
						});
					}
					if (NgxThreeUtil.isNotNull(this.planeInfos) && this.planeInfos.length > 0) {
						this.planeInfos.forEach((plane) => {
							switch (plane.type.toLowerCase()) {
								case 'x':
									effect.addPlaneX(plane.strength, plane.subtract);
									break;
								case 'y':
									effect.addPlaneY(plane.strength, plane.subtract);
									break;
								case 'z':
									effect.addPlaneZ(plane.strength, plane.subtract);
									break;
							}
						});
					}
					basemesh = effect;
					break;
				case 'points':
					basemesh = new N3JS.Points(geometry, this.getMaterials());
					break;
				case 'line':
					const line = new N3JS.Line(geometry, this.getMaterials());
					line.castShadow = this.castShadow;
					basemesh = line;
					break;
				case 'tubepainter':
					const tubePainter: any = new N3JS.TubePainter();
					if (NgxThreeUtil.isNotNull(this.size)) {
						tubePainter['setSize'](this.size);
					}
					tubePainter.mesh.material['side'] = N3JS.DoubleSide;
					tubePainter.moveTo(new N3JS.Vector3(0, 0, 0));
					tubePainter.lineTo(new N3JS.Vector3(0.1, 0.1, 0));
					tubePainter.lineTo(new N3JS.Vector3(0.1, -0.1, 0));
					tubePainter.update();
					basemesh = tubePainter.mesh;
					break;
				case 'meshtext':
				case 'text':
					basemesh = new THREE_OBJ.NgxMeshText(
						NgxThreeUtil.getTypeSafe(this.text, 'test'),
						NgxThreeUtil.getTypeSafe(this.size, 1),
						NgxThreeUtil.getColorSafe(this.color, 0xffffff)
					);
					break;
				case 'line2':
					const lineMaterial = this.getMaterialOne();
					if (geometry instanceof N3JS.LineGeometry && lineMaterial instanceof N3JS.LineMaterial) {
						const line2 = new N3JS.Line2(geometry, lineMaterial);
						line2.computeLineDistances();
						line2.scale.set(1, 1, 1);
						basemesh = line2;
					} else {
						const line = new N3JS.Line(geometry, this.getMaterials());
						line.computeLineDistances();
						line.castShadow = this.castShadow;
						basemesh = line;
					}
					break;
				case 'linesegments':
					const lineSegments = new N3JS.LineSegments(geometry, this.getMaterials());
					if (geometry.index === null) {
						// lineSegments.computeLineDistances();
					}
					lineSegments.castShadow = this.castShadow;
					basemesh = lineSegments;
					break;
				case 'md2charactercomplex':
					basemesh = new N3JS.Group();
					if (this.shareParts !== null) {
						const loadShareParts = () => {
							const shareParts = NgxThreeUtil.getObject3d(this.shareParts).userData.clips;
							if (shareParts instanceof N3JS.MD2CharacterComplex) {
								const character = new N3JS.MD2CharacterComplex();
								character.shareParts(shareParts);
								if (this.receiveShadow) {
									character.enableShadows(this.receiveShadow);
								}
								basemesh.children.forEach((child: any) => {
									child.parent.remove(child);
								});
								basemesh.add(character.root);
								this.clipMesh = character.root;
								this.clips = character;
								this.setUserData('refTarget', character);
								this.setUserData('clips', this.clips);
								this.applyChanges3d(['mixer', 'material']);
								// this.setSubscribeNext(['loaded']);
								super.callOnLoad();
							}
						};
						this.unSubscribeReferList('shareParts');
						this.subscribeReferList(
							'shareParts',
							NgxThreeUtil.getSubscribe(
								this.shareParts,
								() => {
									loadShareParts();
								},
								'loaded'
							)
						);
						loadShareParts();
					}
					break;
				case 'interactive':
				case 'interactivegroup':
					const renderer = NgxThreeUtil.getRenderer() as I3JS.WebGLRenderer;
					let camera: I3JS.Camera = null;
					if (NgxThreeUtil.isNotNull(this.sharedCamera)) {
						if (this.sharedCamera.getCamera) {
							camera = this.sharedCamera.getCamera();
						} else if (this.sharedCamera instanceof N3JS.Camera) {
							camera = this.sharedCamera;
						}
					}
					if (camera === null) {
						camera = new N3JS.Camera();
					}
					renderer.domElement.style.pointerEvents = 'all';
					renderer.domElement.style.touchAction = 'auto';
					basemesh = new N3JS.InteractiveGroup(renderer, camera);
					break;
				case 'lightning':
				case 'lightningstorm':
					const stormParams: I3JS.StormParams = NgxThreeUtil.getTypeSafe(this.stormParams, {});
					if (NgxThreeUtil.isNotNull(this.rayParams)) {
						stormParams.lightningParameters = Object.assign(this.rayParams, stormParams.lightningParameters || {});
					}
					const lightningMaterial = this.getMaterialOne({ color: 0xffffff }, false);
					if (NgxThreeUtil.isNotNull(lightningMaterial)) {
						stormParams.lightningMaterial = lightningMaterial;
					}
					basemesh = new N3JS.LightningStorm(stormParams);
					break;
				case 'group':
					basemesh = new N3JS.Group();
					break;
				case 'mesh':
				default:
					if (NgxThreeUtil.isNotNull(this.storageName)) {
						basemesh = new N3JS.Group();
						this.localStorageService.getObject(
							this.storageName,
							(
								loadedMesh: I3JS.Object3D,
								clips?: I3JS.AnimationClip[] | any,
								geometry?: I3JS.BufferGeometry,
								morphTargets?: I3JS.BufferAttribute[],
								source?: any
							) => {
								if (NgxThreeUtil.isNull(loadedMesh)) {
									if (NgxThreeUtil.isNotNull(geometry)) {
										geometry.computeVertexNormals();
										const anyGeometry: any = geometry;
										if (
											anyGeometry['animations'] !== null &&
											anyGeometry['animations'] !== undefined &&
											anyGeometry['animations'].length > 0
										) {
											const morphAnim = new N3JS.MorphAnimMesh(geometry, this.getMaterialOne());
											loadedMesh = morphAnim;
											if (anyGeometry['animations'] !== null) {
												clips = anyGeometry['animations'];
											}
										} else {
											loadedMesh = new N3JS.Mesh(geometry, this.getMaterialOne());
										}
									} else if (NgxThreeUtil.isNotNull(morphTargets)) {
										const baseGeometry = this.getGeometry();
										baseGeometry.morphAttributes.position = morphTargets;
										loadedMesh = new N3JS.Mesh(baseGeometry, this.getMaterialOne());
									}
								}
								if (this.castShadow && loadedMesh) {
									loadedMesh.traverse((object) => {
										if (object instanceof N3JS.Mesh) {
											object.castShadow = this.castShadow;
											object.receiveShadow = this.receiveShadow;
										}
									});
								}
								if (NgxThreeUtil.isNotNull(this.morphTargets) && loadedMesh instanceof N3JS.Mesh) {
									if (loadedMesh.material instanceof N3JS.Material) {
										(loadedMesh.material as any)['morphTargets'] = this.morphTargets;
									}
								}
								this.setUserData('refTarget', loadedMesh);
								this.setUserData('clips', clips);
								this.setUserData('storageSource', source);
								this.clips = clips;
								if (NgxThreeUtil.isNull(loadedMesh)) {
									loadedMesh = new N3JS.Group();
								}
								if (NgxThreeUtil.isNotNull(loadedMesh)) {
									if (source instanceof N3JS.Volume) {
										this.addChanges(['volumeoption']);
									}
									loadedMesh.parent = null;
									this.setMesh(loadedMesh);
									if (
										NgxThreeUtil.isNotNull(source) &&
										NgxThreeUtil.isNotNull(source.skeleton) &&
										NgxThreeUtil.isNotNull(source.skeleton.bones) &&
										source.skeleton.bones.length > 0
									) {
										this.addParentObject3d(source.skeleton.bones[0]);
									}
								}
							},
							this.storageOption
						);
					} else if (NgxThreeUtil.isNotNull(this.sharedMesh)) {
						this.unSubscribeRefer('sharedMesh');
						const mesh = this.sharedMesh.getObject3d();
						const clips = mesh.userData.clips;
						const clipMesh = mesh.userData.refTarget || mesh;
						let clipMeshClone: I3JS.Object3D = null;
						this.setUserData('clips', clips);
						this.setUserData('storageSource', clipMesh.userData.storageSource);
						if (NgxThreeUtil.isNotNull(clipMesh)) {
							const oldUserData = clipMesh.userData;
							clipMesh.userData = {};
							clipMeshClone = clipMesh.clone(true);
							clipMesh.userData = oldUserData;
						}
						if (clipMeshClone !== null) {
							basemesh = clipMeshClone;
							basemesh.traverse((object: any) => {
								if (object instanceof N3JS.Mesh) {
									object.castShadow = this.castShadow;
									object.receiveShadow = this.receiveShadow;
								}
							});
						}
						this.subscribeRefer(
							'sharedMesh',
							NgxThreeUtil.getSubscribe(
								this.sharedMesh,
								() => {
									this.needUpdate = true;
								},
								'loaded'
							)
						);
					} else {
						if (geometry !== null) {
							basemesh = new N3JS.Mesh(geometry, this.getMaterials());
						} else {
							basemesh = new N3JS.Mesh();
						}
						basemesh.castShadow = this.castShadow;
					}
			}
			this.setMesh(basemesh);
		}
		return this.mesh as T;
	}

	/**
	 * Sets mesh
	 * @param mesh
	 */
	private setMesh(mesh: I3JS.Object3D) {
		if (mesh !== null && this.mesh !== mesh) {
			if (mesh instanceof N3JS.Mesh || mesh instanceof N3JS.Points || mesh instanceof N3JS.Sprite) {
				if (mesh instanceof N3JS.Mesh || mesh instanceof N3JS.Points) {
					if (this.geometry instanceof NgxMeshComponent) {
						const realMesh = this.geometry.getRealMesh();
						if (realMesh !== null && realMesh instanceof N3JS.Mesh) {
							mesh.morphTargetInfluences = realMesh.morphTargetInfluences;
							mesh.morphTargetDictionary = realMesh.morphTargetDictionary;
						}
					}
				}
				if (mesh instanceof N3JS.Mesh) {
					mesh.castShadow = this.castShadow;
					mesh.receiveShadow = this.receiveShadow;
					if (this.usePlaneStencil && mesh.material instanceof N3JS.Material) {
						const clippingMaterial: any = mesh.material;
						const clippingPlanes = clippingMaterial.clippingPlanes as I3JS.Plane[];
						if (clippingPlanes !== null && clippingPlanes.length > 0) {
							const planeGeom = new N3JS.PlaneGeometry(4, 4);
							const poGroup = new N3JS.Group();
							const object = new N3JS.Group();
							const meshStandardMaterialParameters = {
								type: 'MeshStandard',
								color: this.getColor(0x0000ff),
								metalness: this.getMetalness(0.1),
								roughness: this.getRoughness(0.75),
								stencilWrite: true,
								stencilRef: 0,
								stencilFunc: 'notequal',
								stencilFail: 'replace',
								stencilZFail: 'replace',
								stencilZPass: 'replace',
							};
							if (clippingMaterial['color'] !== undefined) {
								meshStandardMaterialParameters.color = this.getColor(clippingMaterial['color']);
							}
							if (clippingMaterial['metalness'] !== undefined) {
								meshStandardMaterialParameters.metalness = this.getMetalness(clippingMaterial['metalness']);
							}
							if (clippingMaterial['roughness'] !== undefined) {
								meshStandardMaterialParameters.roughness = this.getRoughness(clippingMaterial['roughness']);
							}
							clippingPlanes.forEach((plane, idx) => {
								const group = this.createPlaneStencilGroup(mesh.geometry, plane, idx + 1);
								object.add(group);
								const materialComponent = this.initLocalComponent(
									'clippingPlanes_' + idx,
									new NgxMaterialComponent(null)
								);
								materialComponent.updateInputParams(
									Object.assign(meshStandardMaterialParameters, {
										clippingPlanes: clippingPlanes.filter((p) => p !== plane),
									})
								);
								const planeMat = materialComponent.getMaterial();
								const po = new N3JS.Mesh(planeGeom, planeMat);
								po.onBeforeRender = () => {
									plane.coplanarPoint(po.position);
									const position = po.position;
									po.lookAt(position.x - plane.normal.x, position.y - plane.normal.y, position.z - plane.normal.z);
								};
								po.onAfterRender = (renderer) => {
									renderer.clearStencil();
								};
								po.renderOrder = idx + 1.1;
								poGroup.add(po);
							});
							if (poGroup.children.length > 0) {
								mesh.add(poGroup);
								mesh.add(object);
							}
						}
					}
				}
			}
			this.mesh = mesh;
			this.setObject3d(this.mesh);
			this.unSubscribeRefer('geomeryChange');
			this.unSubscribeRefer('materialChange');
			this.unSubscribeReferList('geomeryListChange');
			this.unSubscribeReferList('materialListChange');
			switch (this.type.toLowerCase()) {
				case 'merged':
				case 'naive':
				case 'multi':
				case 'multimaterial':
				case 'marchingcubes':
				case 'md2charactercomplex':
				case 'reflectorrtt':
				case 'flow':
				case 'instancedflow':
					if (NgxThreeUtil.isNotNull(this.geometry)) {
						this.subscribeRefer(
							'geomeryChange',
							NgxThreeUtil.getSubscribe(
								this.geometry,
								() => {
									this.needUpdate = true;
								},
								'loaded'
							)
						);
					}
					if (NgxThreeUtil.isNotNull(this.geometryList)) {
						this.geometryList.forEach((geometry) => {
							this.subscribeReferList(
								'geomeryListChange',
								NgxThreeUtil.getSubscribe(
									geometry,
									() => {
										this.needUpdate = true;
									},
									'loaded'
								)
							);
						});
					}
					if (NgxThreeUtil.isNotNull(this.material)) {
						this.subscribeRefer(
							'materialChange',
							NgxThreeUtil.getSubscribe(
								this.material,
								() => {
									this.needUpdate = true;
								},
								'loaded'
							)
						);
					}
					if (NgxThreeUtil.isNotNull(this.materialList)) {
						this.materialList.forEach((material) => {
							this.subscribeReferList(
								'materialListChange',
								NgxThreeUtil.getSubscribe(
									material,
									() => {
										this.needUpdate = true;
									},
									'loaded'
								)
							);
						});
					}
					break;
			}
		}
	}

	private createPlaneStencilGroup(geometry: I3JS.BufferGeometry, plane: I3JS.Plane, renderOrder: number): I3JS.Group {
		const group = new N3JS.Group();
		const baseMat = new N3JS.MeshBasicMaterial();
		baseMat.depthWrite = false;
		baseMat.depthTest = false;
		baseMat.colorWrite = false;
		baseMat.stencilWrite = true;
		baseMat.stencilFunc = N3JS.AlwaysStencilFunc;
		const mat0 = baseMat.clone();
		mat0.side = N3JS.BackSide;
		mat0.clippingPlanes = [plane];
		mat0.stencilFail = N3JS.IncrementWrapStencilOp;
		mat0.stencilZFail = N3JS.IncrementWrapStencilOp;
		mat0.stencilZPass = N3JS.IncrementWrapStencilOp;
		const mesh0 = new N3JS.Mesh(geometry, mat0);
		mesh0.renderOrder = renderOrder;
		group.add(mesh0);
		const mat1 = baseMat.clone();
		mat1.side = N3JS.FrontSide;
		mat1.clippingPlanes = [plane];
		mat1.stencilFail = N3JS.DecrementWrapStencilOp;
		mat1.stencilZFail = N3JS.DecrementWrapStencilOp;
		mat1.stencilZPass = N3JS.DecrementWrapStencilOp;
		const mesh1 = new N3JS.Mesh(geometry, mat1);
		mesh1.renderOrder = renderOrder;
		group.add(mesh1);
		return group;
	}

	/**
	 * Helper component of mesh component
	 */
	public helperComponent: NgxHelperComponent = null;

	/**
	 * Resets helper
	 */
	public resetHelper() {
		if (this.mesh !== null) {
			if (NgxThreeUtil.isNotNull(this.helperType)) {
				if (this.helperComponent === null) {
					this.helperComponent = this.initLocalComponent('helper', new NgxHelperComponent());
				}
				this.helperComponent.updateInputParams(this.helperOptions, true, {}, this.helperType);
				this.helperComponent.setParent(this.mesh);
			} else if (this.helperComponent !== null) {
				this.helperComponent.ngOnDestroy();
				this.helperComponent = null;
			}
		}
	}
}
