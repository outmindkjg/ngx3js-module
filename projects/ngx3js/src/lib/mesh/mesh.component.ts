import {
	Component,
	ContentChildren,
	forwardRef,
	Input,
	OnInit,
	QueryList,
	SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
import { RayParameters } from 'three/examples/jsm/geometries/LightningStrike';
import { HTMLMesh } from 'three/examples/jsm/interactive/HTMLMesh';
import { InteractiveGroup } from 'three/examples/jsm/interactive/InteractiveGroup';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe';
import { MD2CharacterComplex } from 'three/examples/jsm/misc/MD2CharacterComplex';
import { MorphAnimMesh } from 'three/examples/jsm/misc/MorphAnimMesh';
import { TubePainter } from 'three/examples/jsm/misc/TubePainter';
import { Volume } from 'three/examples/jsm/misc/Volume';
import { VolumeSlice } from 'three/examples/jsm/misc/VolumeSlice';
import {
	Flow,
	InstancedFlow,
} from 'three/examples/jsm/modifiers/CurveModifier';
import {
	Lensflare,
	LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';
import {
	LightningStorm,
	StormParams,
} from 'three/examples/jsm/objects/LightningStorm';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import { ReflectorRTT } from 'three/examples/jsm/objects/ReflectorRTT';
import { Refractor } from 'three/examples/jsm/objects/Refractor';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { Water } from 'three/examples/jsm/objects/Water';
import { Water as Water2 } from 'three/examples/jsm/objects/Water2';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import {
	CSS3DObject,
	CSS3DSprite,
} from 'three/examples/jsm/renderers/CSS3DRenderer';
import { SVGObject } from 'three/examples/jsm/renderers/SVGRenderer';
import { WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import { MeshText } from './mesh.text';
import { CurveComponent } from '../curve/curve.component';
import { HtmlComponent } from '../html/html.component';
import { CssStyle, ThreeColor, ThreeUtil } from '../interface';
import { LensflareelementComponent } from '../lensflareelement/lensflareelement.component';
import { MaterialComponent } from '../material/material.component';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { SizeComponent } from '../size/size.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { AbstractTextureComponent } from '../texture.abstract';
import { SceneUtils } from '../threejs-library/SceneUtils';
import { HelperComponent, HelperOptions } from './../helper/helper.component';
import { LightComponent, LightOptions } from './../light/light.component';
import { LocalStorageService } from './../local-storage.service';
import { ReflectorForSSRPass } from './../threejs-library/ReflectorForSSRPass';

/**
 * Volume Options
 */
export interface VolumeOptions {
	/** x */
	x?: number;

	/** y */
	y?: number;

	/** z */
	z?: number;

	/** helperVisible */
	helperVisible?: boolean;

	/** helperColor */
	helperColor?: ThreeColor;

	/** boxVisible */
	boxVisible?: boolean;

	/** xVisible */
	xVisible?: boolean;

	/** yVisible */
	yVisible?: boolean;

	/** zVisible */
	zVisible?: boolean;

	/** lowerThreshold */
	lowerThreshold?: number;

	/** upperThreshold */
	upperThreshold?: number;

	/** windowLow */
	windowLow?: number;

	/** windowHigh */
	windowHigh?: number;
}

/**
 * MeshComponent
 *
 * ```html
 * <ngx3js-mesh [type]="'skybox'"
 * 	[skyboxType]="'sun'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'HTMLMesh'"
 * 	[domElement]="domElement"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'SVGObject'"
 * 	[cssTag]="'div'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'CSS2DObject'"
 * 	[cssTag]="'div'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'CSS3DSprite'"
 * 	[cssTag]="'div'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Reflector'"
 * 	[color]="'0x889999'"
 * 	[clipBias]="0.003"
 * 	[textureWidth]="1024"
 * 	[textureWidth]="1024"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'ReflectorRTT'"
 * 	[color]="'0x889999'"
 * 	[clipBias]="0.003"
 * 	[textureWidth]="1024"
 * 	[textureWidth]="1024"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Refractor'"
 * 	[color]="'0x999999'"
 * 	[textureWidth]="1024"
 * 	[textureHeight]="1024"
 * 	[shader]="'WaterRefraction'"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'ReflectorRTT'"
 * 	[color]="'0x889999'"
 * 	[clipBias]="0.003"
 * 	[textureWidth]="1024"
 * 	[textureWidth]="1024"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'ReflectorForSSRPass'"
 * 	[color]="'0x889999'"
 * 	[clipBias]="0.003"
 * 	[textureWidth]="1024"
 * 	[textureWidth]="1024"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Water'"
 * 	[sunColor]="'0xffffff'"
 * 	[waterColor]="'0x001e0f'"
 * 	[sunDirection]="sunDirection"
 * 	[textureWidth]="512"
 * 	[textureHeight]="512"
 * 	[alpha]="alpha"
 * 	[distortionScale]="distortionScale"
 * 	[uniforms]="uniforms"
 * ></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Water2'"
 * 	[color]="'#ffffff'"
 * 	[waterScale]="4"
 * 	[reflectivity]="0.02"
 * 	[flowDirectionX]="1"
 * 	[flowDirectionY]="1"
 * 	[textureWidth]="1024"
 * 	[textureHeight]="1024"></ngx3js-mesh>
 * <ngx3js-mesh [type]="'Sky'"
 * 	[uniforms]="{
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
			provide: AbstractObject3dComponent,
			useExisting: forwardRef(() => MeshComponent),
		},
		{
			provide: AbstractSubscribeComponent,
			useExisting: forwardRef(() => MeshComponent),
		},
	],
})
export class MeshComponent extends AbstractObject3dComponent implements OnInit {
	/**
	 * The type of mesh
	 *
	 * Notice - case insensitive.
	 *
	 * @see Lensflare - type : skybox, skyboxType : sun
	 * @see SVGObject - SVGObject, SVG
	 * @see CSS2DObject - CSS2DObject, CSS2D
	 * @see CSS3DSprite - CSS3DSprite
	 * @see CSS3DObject - CSS3DObject, CSS3D, CSS
	 * @see Reflector - Reflector
	 * @see ReflectorRTT - ReflectorRTT
	 * @see Refractor - Refractor
	 * @see ReflectorForSSRPass - RefractorForSSRPass
	 * @see Water - Water
	 * @see Water2 - Water2
	 * @see Sky - Sky
	 * @see Flow - Flow
	 * @see InstancedFlow - InstancedFlow
	 * @see THREE.Light - light
	 * @see THREE.LineLoop - LineLoop
	 * @see Lensflare - Lensflare, lensflareelement
	 * @see THREE.InstancedMesh - InstancedMesh, Instanced
	 * @see BufferGeometryUtils.mergeBufferGeometries - merged
	 * @see SceneUtils.createMultiMaterialObject - multimaterial, multi
	 * @see THREE.Sprite - Sprite
	 * @see Wireframe - wireframe
	 * @see THREE.LOD - lod
	 * @see MarchingCubes - marchingcubes
	 * @see THREE.Points - points
	 * @see THREE.Line - Line
	 * @see Line2 - line2
	 * @see THREE.LineSegments - linesegments
	 * @see MD2CharacterComplex - md2charactercomplex
	 * @see THREE.Group - group
	 * @see THREE.Mesh - mesh
	 */
	@Input() public type: string = 'mesh';

	/**
	 * The options of light
	 *
	 * @see LightOptions
	 */
	@Input() public lightOptions: LightOptions = null;

	/**
	 * The css tag of CSS2DObject, CSS3DObject
	 *
	 * @see HTMLDivElement - div
	 * @see HTMLSpanElement - span
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
	@Input() public cssStyle: string | CssStyle = null;

	/**
	 * The type of skybox
	 *
	 * @see Lensflare - sun
	 * @see THREE.BoxGeometry - box
	 * @see THREE.SphereGeometry - sphere
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
	@Input() public helperOptions: HelperOptions = null;

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
	@Input() public volumeOption: VolumeOptions = null;

	/**
	 * The color of sun etc
	 */
	@Input() public color: ThreeColor = null;

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
	@Input() public textureSize: THREE.Vector2 | SizeComponent = null;

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
	@Input() public sunColor: ThreeColor = null;

	/**
	 * The direction of sun
	 */
	@Input() public sunDirection: number[] | THREE.Vector3 = null;

	/**
	 * The position of sun
	 */
	@Input() public sunPosition: number[] | THREE.Vector3 = null;

	/**
	 * The uniform of sun, sky water etc
	 */
	@Input() public uniforms: {
		[uniform: string]:
			| { type: string; value: any; options?: any }
			| THREE.IUniform;
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
	 * Notice - case insensitive.
	 *
	 * @see THREE.StaticDrawUsage - StaticDrawUsage, StaticDraw
	 * @see THREE.DynamicDrawUsage - DynamicDrawUsage, DynamicDraw
	 * @see THREE.StreamDrawUsage - StreamDrawUsage, StreamDraw
	 * @see THREE.StaticReadUsage - StaticReadUsage, StaticRead
	 * @see THREE.DynamicReadUsage - DynamicReadUsage, DynamicRead
	 * @see THREE.StreamReadUsage - StreamReadUsage, StreamRead
	 * @see THREE.StaticCopyUsage - StaticCopyUsage, StaticCopy
	 * @see THREE.DynamicCopyUsage - DynamicCopyUsage, DynamicCopy
	 * @see THREE.StreamCopyUsage - StreamCopyUsage, StreamCopy
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
	@Input() public flowMap: string | THREE.Texture | AbstractTextureComponent =
		null;

	/**
	 * The normalMap0 of mesh component
	 */
	@Input() public normalMap0:
		| string
		| THREE.Texture
		| AbstractTextureComponent = null;

	/**
	 * The normalMap1 of mesh component
	 */
	@Input() public normalMap1:
		| string
		| THREE.Texture
		| AbstractTextureComponent = null;

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
	@Input() public makeMatrix: (mat: THREE.Matrix4, index?: number) => void =
		null;

	/**
	 * The makeColor of mesh component
	 */
	@Input() public makeColor: (color: THREE.Color, index?: number) => void =
		null;

	/**
	 * The refer texture
	 */
	@Input() public texture: AbstractTextureComponent | THREE.Texture = null;

	/**
	 * The curve
	 */
	@Input() public curve: CurveComponent | THREE.Curve<THREE.Vector3> = null;

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
	 * [page:Textures THREE.LinearEncoding] is the default.
	 * See the [page:Textures texture constants] page for details of other formats.
	 * Note that if this value is changed on a texture after the material has been used, it is necessary to trigger a Material.needsUpdate for this value to be realized in the shader.
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.TextureEncoding
	 *
	 * @see THREE.LinearEncoding - LinearEncoding ,
	 * @see THREE.sRGBEncoding - sRGBEncoding ,
	 * @see THREE.GammaEncoding - GammaEncoding ,
	 * @see THREE.RGBEEncoding - RGBEEncoding ,
	 * @see THREE.LogLuvEncoding - LogLuvEncoding ,
	 * @see THREE.RGBM7Encoding - RGBM7Encoding ,
	 * @see THREE.RGBM16Encoding - RGBM16Encoding ,
	 * @see THREE.RGBDEncoding - RGBDEncoding ,
	 */
	@Input() public encoding: string = null;

	/**
	 * The shareParts of mesh component
	 */
	@Input() public shareParts: MeshComponent = null;

	/**
	 * The sharedMesh of mesh component
	 */
	@Input() public sharedMesh: MeshComponent = null;

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
	@Input() public stormParams: StormParams = {
		size: 1024,
	};

	/**
	 * The rayParams of geometry component
	 */
	@Input() public rayParams: RayParameters = null;

	/**
	 * Content children of mesh component
	 */
	@ContentChildren(AbstractTextureComponent, { descendants: false })
	private textureList: QueryList<AbstractTextureComponent>;

	/**
	 * Content children of mesh component
	 */
	@ContentChildren(LensflareelementComponent, { descendants: false })
	private lensflareElementList: QueryList<LensflareelementComponent>;

	/**
	 * Content children of mesh component
	 */
	@ContentChildren(HtmlComponent, { descendants: false })
	private cssChildrenList: QueryList<HtmlComponent>;

	/**
	 * Content children of mesh component
	 */
	@ContentChildren(CurveComponent, { descendants: false })
	private curveList: QueryList<CurveComponent>;

	/**
	 * Creates an instance of mesh component.
	 * @param localStorageService
	 */
	constructor(private localStorageService: LocalStorageService) {
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
		this.subscribeListQueryChange(
			this.lensflareElementList,
			'lensflareElementList',
			'lensflareElement'
		);
		this.subscribeListQueryChange(
			this.cssChildrenList,
			'cssChildrenList',
			'cssChildren'
		);
		this.subscribeListQueryChange(this.curveList, 'curveList', 'curve');
		super.ngAfterContentInit();
	}

	/**
	 * Gets skybox size
	 * @param [def]
	 * @returns skybox size
	 */
	private getSkyboxSize(def?: number): number {
		const skyboxSize = ThreeUtil.getTypeSafe(this.distance, def, 10000);
		if (ThreeUtil.isNotNull(skyboxSize)) {
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
		if (ThreeUtil.isNotNull(this.domElement)) {
			return this.domElement;
		}
		const cssTag = ThreeUtil.getTypeSafe(this.cssTag, 'div');
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
	private getSkySunPosition(): THREE.Euler {
		return new THREE.Euler(
			ThreeUtil.getAngleSafe(this.skyboxSunX, 0),
			ThreeUtil.getAngleSafe(this.skyboxSunY, 0),
			ThreeUtil.getAngleSafe(this.skyboxSunZ, 0)
		);
	}

	/**
	 * Gets metalness
	 * @param [def]
	 * @returns metalness
	 */
	private getMetalness(def?: number): number {
		return ThreeUtil.getTypeSafe(this.metalness, def);
	}

	/**
	 * Gets roughness
	 * @param [def]
	 * @returns roughness
	 */
	private getRoughness(def?: number): number {
		return ThreeUtil.getTypeSafe(this.roughness, def);
	}

	/**
	 * Gets count
	 * @param [def]
	 * @returns count
	 */
	private getCount(def?: number): number {
		return ThreeUtil.getTypeSafe(this.count, def);
	}

	/**
	 * Gets axis
	 * @param [def]
	 * @returns axis
	 */
	private getAxis(def?: string): string {
		return ThreeUtil.getTypeSafe(this.axis, def);
	}

	/**
	 * Gets index
	 * @param baseSize
	 * @param def
	 * @returns index
	 */
	private getIndex(baseSize: number, def: number): number {
		const index = ThreeUtil.getTypeSafe(this.index, def);
		return Math.floor(baseSize * index);
	}

	/**
	 * Gets color
	 * @param [def]
	 * @returns color
	 */
	private getColor(def?: ThreeColor): THREE.Color {
		return ThreeUtil.getColorSafe(this.color, this.waterColor, def);
	}

	/**
	 * Gets height
	 * @param [def]
	 * @returns height
	 */
	private getTextureSize(width?: number, height?: number): THREE.Vector2 {
		if (ThreeUtil.isNotNull(this.textureSize)) {
			if (this.textureSize instanceof THREE.Vector2) {
				return this.textureSize;
			} else if (this.textureSize instanceof SizeComponent) {
				return this.textureSize.getSize();
			}
		}
		return ThreeUtil.getVector2Safe(
			ThreeUtil.getTypeSafe(this.textureWidth, width, 1024),
			ThreeUtil.getTypeSafe(this.textureHeight, height, 1024),
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
		return ThreeUtil.getTypeSafe(this.clipBias, def);
	}

	/**
	 * Gets sun color
	 * @param [def]
	 * @returns sun color
	 */
	private getSunColor(def?: string | number): THREE.Color {
		return ThreeUtil.getColorSafe(this.sunColor, def);
	}

	/**
	 * Gets undate uniforms
	 * @param [orgUniforms]
	 */
	private getUndateUniforms(orgUniforms?: {
		[uniform: string]: THREE.IUniform;
	}): void {
		const uniforms = ThreeUtil.getTypeSafe(this.uniforms, {});
		Object.entries(uniforms).forEach(([key, value]) => {
			if (ThreeUtil.isNotNull(orgUniforms[key])) {
				const anyValue: any = value;
				const uniformsValue = orgUniforms[key];
				if (
					ThreeUtil.isNotNull(anyValue['type']) &&
					ThreeUtil.isNotNull(anyValue['value'])
				) {
					switch (anyValue['type'].toLowerCase()) {
						case 'vector2':
						case 'v2':
							uniformsValue.value = ThreeUtil.getVector2Safe(
								value['value'][0],
								value['value'][1]
							);
							break;
						case 'vector3':
						case 'vector':
						case 'v3':
							uniformsValue.value = ThreeUtil.getVector3Safe(
								value['value'][0],
								value['value'][1],
								value['value'][2]
							);
							break;
						case 'color':
							uniformsValue.value = ThreeUtil.getColorSafe(
								value['value'],
								0xffffff
							);
							break;
						case 'texture':
							const texture = AbstractTextureComponent.getTextureImage(
								value['value']
							);
							if (ThreeUtil.isNotNull(anyValue['options'])) {
								switch (anyValue['options']) {
									case 'wrapRepeat':
										texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
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
	private getSunDirection(def?: THREE.Vector3): THREE.Vector3 {
		let sunDirection: THREE.Vector3 = null;
		if (ThreeUtil.isNotNull(this.sunDirection)) {
			sunDirection = ThreeUtil.getVector3VSafe(this.sunDirection, def);
		} else {
			sunDirection = ThreeUtil.getVector3VSafe(this.sunPosition, def);
		}
		if (ThreeUtil.isNotNull(sunDirection)) {
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
		return ThreeUtil.getTypeSafe(this.alpha, def);
	}

	/**
	 * Gets distortion scale
	 * @param [def]
	 * @returns distortion scale
	 */
	private getDistortionScale(def?: number): number {
		return ThreeUtil.getTypeSafe(this.distortionScale, def);
	}

	/**
	 * Gets sky color
	 * @param [def]
	 * @returns sky color
	 */
	private getSkyColor(def?: string | number): THREE.Color {
		return ThreeUtil.getColorSafe(this.skyColor, def);
	}

	/**
	 * Gets water color
	 * @param [def]
	 * @returns water color
	 */
	private getWaterColor(def?: string | number): THREE.Color {
		return ThreeUtil.getColorSafe(this.waterColor, def);
	}

	/**
	 * Gets size
	 * @param [def]
	 * @returns size
	 */
	private getSize(def?: number): number {
		return ThreeUtil.getTypeSafe(this.size, def);
	}

	/**
	 * Gets divisions
	 * @param [def]
	 * @returns divisions
	 */
	private getDivisions(def?: number): number {
		return ThreeUtil.getTypeSafe(this.divisions, def);
	}

	/**
	 * Gets usage
	 * @param [def]
	 * @returns usage
	 */
	private getUsage(def?: string): THREE.Usage {
		const usage = ThreeUtil.getTypeSafe(this.usage, def, '');
		switch (usage.toLowerCase()) {
			case 'streamdrawusage':
			case 'streamdraw':
				return THREE.StreamDrawUsage;
			case 'staticreadusage':
			case 'staticread':
				return THREE.StaticReadUsage;
			case 'dynamicreadusage':
			case 'dynamicread':
				return THREE.DynamicReadUsage;
			case 'streamreadusage':
			case 'streamread':
				return THREE.StreamReadUsage;
			case 'staticcopyusage':
			case 'staticcopy':
				return THREE.StaticCopyUsage;
			case 'dynamiccopyusage':
			case 'dynamiccopy':
				return THREE.DynamicCopyUsage;
			case 'streamcopyusage':
			case 'streamcopy':
				return THREE.StreamCopyUsage;
			case 'staticdrawusage':
			case 'staticdraw':
				return THREE.StaticDrawUsage;
			case 'dynamicdrawusage':
			case 'dynamicdraw':
			default:
				return THREE.DynamicDrawUsage;
		}
	}

	/**
	 * Gets enable colors
	 * @param [def]
	 * @returns true if enable colors
	 */
	private getEnableColors(def?: boolean): boolean {
		return ThreeUtil.getTypeSafe(this.enableColors, def);
	}

	/**
	 * Gets enable uvs
	 * @param [def]
	 * @returns true if enable uvs
	 */
	private getEnableUvs(def?: boolean): boolean {
		return ThreeUtil.getTypeSafe(this.enableUvs, def);
	}

	/**
	 * Gets resolution
	 * @param [def]
	 * @returns resolution
	 */
	private getResolution(def?: number): number {
		return ThreeUtil.getTypeSafe(this.resolution, def);
	}

	/**
	 * Gets isolation
	 * @param [def]
	 * @returns isolation
	 */
	private getIsolation(def?: number): number {
		return ThreeUtil.getTypeSafe(this.isolation, def);
	}

	/**
	 * Gets flow direction
	 * @param [def]
	 * @returns flow direction
	 */
	private getFlowDirection(def?: THREE.Vector2): THREE.Vector2 {
		return ThreeUtil.getVector2Safe(
			this.flowDirectionX,
			this.flowDirectionY,
			def
		);
	}

	/**
	 * Gets flow speed
	 * @param [def]
	 * @returns flow speed
	 */
	private getFlowSpeed(def?: number): number {
		return ThreeUtil.getTypeSafe(this.flowSpeed, def);
	}

	/**
	 * Gets reflectivity
	 * @param [def]
	 * @returns reflectivity
	 */
	private getReflectivity(def?: number): number {
		return ThreeUtil.getTypeSafe(this.reflectivity, def);
	}

	/**
	 * Gets water scale
	 * @param [def]
	 * @returns water scale
	 */
	private getWaterScale(def?: number): number {
		return ThreeUtil.getTypeSafe(this.waterScale, def);
	}

	/**
	 * Gets shader
	 * @param [def]
	 * @returns
	 */
	private getShader(def?: string) {
		const shader = ThreeUtil.getTypeSafe(this.shader, def, '');
		switch (shader.toLowerCase()) {
			case 'waterrefractionshader':
			case 'waterrefraction':
				return WaterRefractionShader;
			default:
				break;
		}
		return undefined;
	}

	/**
	 * Gets encoding
	 * @param [def]
	 * @returns encoding
	 */
	private getEncoding(def?: string): THREE.TextureEncoding {
		return ThreeUtil.getTextureEncodingSafe(this.encoding, def, '');
	}

	/**
	 * The Clips of mesh component
	 */
	private clips: THREE.AnimationClip[] | any = null;

	/**
	 * Clip mesh of mesh component
	 */
	private clipMesh: THREE.Object3D = null;

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
	public getMaterial(): THREE.Material {
		if (this.mesh !== null && this.object3d instanceof THREE.Mesh) {
			if (Array.isArray(this.object3d.material)) {
				return this.object3d.material[0];
			} else if (this.object3d.material instanceof THREE.Material) {
				return this.object3d.material;
			}
		}
		return null;
	}

	/**
	 * Gets curve
	 * @returns curve
	 */
	public getCurve(): THREE.Curve<THREE.Vector3> {
		if (this.curve !== null) {
			this.unSubscribeRefer('curve');
			if (this.curve instanceof THREE.Curve) {
				return this.curve;
			} else {
				const curve = this.curve.getCurve() as THREE.Curve<THREE.Vector3>;
				this.subscribeRefer(
					'curve',
					ThreeUtil.getSubscribe(
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
			return this.curveList.first.getCurve() as THREE.Curve<THREE.Vector3>;
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
		alterTexture?: string | THREE.Texture | AbstractTextureComponent,
		defImage?: string
	): THREE.Texture {
		if (this.texture !== null && this.texture !== undefined) {
			const texture = ThreeUtil.getTexture(this.texture, type, false);
			if (ThreeUtil.isNotNull(texture)) {
				return texture;
			}
		}
		if (this.textureList !== null && this.textureList.length > 0) {
			const foundTexture = this.textureList.find((texture) => {
				return texture.isTexture(type);
			});
			if (ThreeUtil.isNotNull(foundTexture)) {
				return foundTexture.getTexture();
			}
		}
		if (ThreeUtil.isNotNull(alterTexture)) {
			if (alterTexture instanceof THREE.Texture) {
				return alterTexture;
			} else if (alterTexture instanceof AbstractTextureComponent) {
				return alterTexture.getTexture();
			} else {
				return AbstractTextureComponent.getTextureImage(alterTexture);
			}
		}
		if (ThreeUtil.isNotNull(defImage)) {
			return AbstractTextureComponent.getTextureImage(defImage);
		}
		return undefined;
	}

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: THREE.Object3D): boolean {
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
	public setWireFrame(wireframe: boolean, child: THREE.Object3D = null) {
		if (child === null) {
			child = this.object3d;
		}
		if (child instanceof THREE.Mesh) {
			const anyMaterial: any = child.material;
			if (
				child.material instanceof THREE.Material &&
				anyMaterial['wireframe'] !== undefined
			) {
				anyMaterial['wireframe'] = wireframe;
			} else if (child.material instanceof Array) {
				child.material.forEach((material) => {
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
		if (
			this.helperComponent !== null &&
			helperVisible !== null &&
			helperVisible !== undefined
		) {
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
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getObject3d();
				return;
			}
			if (
				!ThreeUtil.isOnlyIndexOf(
					changes,
					[
						'geometry',
						'svg',
						'listener',
						'audio',
						'csschildren',
						'controller',
						'material',
						'mixer',
						'volumeoption',
					],
					this.OBJECT3D_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (
				!ThreeUtil.isIndexOf(changes, 'init') &&
				ThreeUtil.isIndexOf(changes, ['geometry', 'material'])
			) {
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
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, [
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
			if (ThreeUtil.isIndexOf(changes, 'html')) {
				changes = ThreeUtil.pushUniq(changes, ['csschildren']);
			}
			if (ThreeUtil.isIndexOf(changes, ['helpertype', 'helperoption'])) {
				changes = ThreeUtil.pushUniq(changes, ['helper']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'helper':
						this.resetHelper();
						break;
					case 'volumeoption':
						if (ThreeUtil.isNotNull(this.volumeOption)) {
							const volume: Volume = this.getUserData()['storageSource'];
							if (ThreeUtil.isNotNull(volume) && volume instanceof Volume) {
								const mesh = this.mesh;
								const rasDimensions = (volume as any).RASDimensions;
								const volumeMax: number = (volume as any).max;
								const volumeMin: number = (volume as any).min;
								Object.entries(this.volumeOption).forEach(([key, value]) => {
									let sliceMesh: THREE.Object3D = null;
									let rasDimensionsSize: number = 0;
									switch (key.toLowerCase()) {
										case 'helpervisible':
											const helper = mesh.getObjectByName('helper');
											if (ThreeUtil.isNotNull(helper)) {
												helper.visible = value as boolean;
											}
											break;
										case 'helpercolor':
											const helperMat: any = mesh.getObjectByName('helper');
											if (
												ThreeUtil.isNotNull(helperMat) &&
												ThreeUtil.isNotNull(helperMat['material'])
											) {
												helperMat['material'].color = ThreeUtil.getColorSafe(
													value as any,
													0xffff00
												);
											}
											break;
										case 'boxvisible':
											const box = mesh.getObjectByName('box');
											if (ThreeUtil.isNotNull(box)) {
												box.visible = value as boolean;
											}
											break;
										case 'xvisible':
											const sliceMeshx = mesh.getObjectByName('x');
											if (ThreeUtil.isNotNull(sliceMeshx)) {
												sliceMeshx.visible = value as boolean;
											}
											break;
										case 'yvisible':
											const sliceMeshy = mesh.getObjectByName('y');
											if (ThreeUtil.isNotNull(sliceMeshy)) {
												sliceMeshy.visible = value as boolean;
											}
											break;
										case 'zvisible':
											const sliceMeshz = mesh.getObjectByName('z');
											if (ThreeUtil.isNotNull(sliceMeshz)) {
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
												Math.max(
													volumeMin,
													(volumeMax - volumeMin) * (value as number) +
														volumeMin
												)
											);
											break;
										case 'upperthreshold':
										case 'upper':
											volume.upperThreshold = Math.min(
												volumeMax,
												Math.max(
													volumeMin,
													(volumeMax - volumeMin) * (value as number) +
														volumeMin
												)
											);
											break;
										case 'windowlow':
										case 'low':
											(volume as any).windowLow = Math.min(
												volumeMax,
												Math.max(
													volumeMin,
													(volumeMax - volumeMin) * (value as number) +
														volumeMin
												)
											);
											break;
										case 'windowhigh':
										case 'high':
											(volume as any).windowHigh = Math.min(
												volumeMax,
												Math.max(
													volumeMin,
													(volumeMax - volumeMin) * (value as number) +
														volumeMin
												)
											);
											break;
									}
									if (
										ThreeUtil.isNotNull(sliceMesh) &&
										ThreeUtil.isNotNull(sliceMesh.userData.volumeSlice)
									) {
										const valueNum: number = value as number;
										const volumeSlice: VolumeSlice =
											sliceMesh.userData.volumeSlice;
										volumeSlice.index = Math.max(
											0,
											Math.min(
												rasDimensionsSize - 1,
												Math.round(rasDimensionsSize * valueNum)
											)
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
						if (ThreeUtil.isNotNull(this.cssChildrenList)) {
							this.cssChildrenList.forEach((cssChild) => {
								cssChild.setParent(this.mesh);
							});
							this.subscribeListQuery(
								this.cssChildrenList,
								'cssChildrenList',
								'html'
							);
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
	private mesh: THREE.Object3D = null;

	/**
	 * Gets real mesh
	 * @returns real mesh
	 */
	public getRealMesh():
		| THREE.Mesh
		| THREE.LineSegments
		| THREE.Line
		| THREE.Points {
		if (
			this.mesh instanceof THREE.Mesh ||
			this.mesh instanceof THREE.LineSegments ||
			this.mesh instanceof THREE.Line ||
			this.mesh instanceof THREE.Points
		) {
			return this.mesh;
		}
		if (
			ThreeUtil.isNotNull(this.mesh.userData.refTarget) &&
			(this.mesh.userData.refTarget instanceof THREE.Mesh ||
				this.mesh.userData.refTarget instanceof THREE.LineSegments ||
				this.mesh.userData.refTarget instanceof THREE.Line ||
				this.mesh.userData.refTarget instanceof THREE.Points)
		) {
			return this.mesh.userData.refTarget;
		}
		let mesh: THREE.Object3D = this.mesh;
		while (mesh.children && mesh.children.length > 0) {
			mesh = mesh.children[0];
			if (
				mesh instanceof THREE.Mesh ||
				mesh instanceof THREE.LineSegments ||
				mesh instanceof THREE.Line ||
				mesh instanceof THREE.Points
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
	public getClips(): THREE.AnimationClip[] | any {
		return this.clips;
	}

	/**
	 * Gets uniforms
	 * @returns uniforms
	 */
	public getUniforms(): { [uniform: string]: THREE.IUniform } {
		const material: any = this.getMaterial();
		if (
			ThreeUtil.isNotNull(material) &&
			ThreeUtil.isNotNull(material['uniforms'])
		) {
			return material['uniforms'];
		}
		return null;
	}

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T extends THREE.Object3D>(): T {
		return this.getMesh();
	}

	/**
	 * Gets mesh
	 * @template T
	 * @returns mesh
	 */
	public getMesh<T extends THREE.Object3D>(): T {
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
			let geometry: THREE.BufferGeometry = null;
			if (
				(this.geometryList !== null && this.geometryList.length > 0) ||
				this.geometry !== null
			) {
				geometry = this.getGeometry();
			}
			let basemesh: THREE.Object3D = null;
			switch (this.type.toLowerCase()) {
				case 'skybox':
					const skyboxSize = this.getSkyboxSize(1500);
					switch (this.skyboxType.toLowerCase()) {
						case 'sun':
							const lensflare = new Lensflare();
							lensflare.addElement(
								new LensflareElement(
									AbstractTextureComponent.getTextureImage(this.skyboxSunImage),
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
							let skyGeometry: THREE.BufferGeometry = null;
							let skyMaterial: THREE.Material = null;
							switch (this.skyboxType.toLowerCase()) {
								case 'box':
									skyGeometry = new THREE.BoxGeometry(
										skyboxSize,
										skyboxSize,
										skyboxSize
									);
									break;
								case 'sphere':
								default:
									skyGeometry = new THREE.SphereGeometry(skyboxSize, 8, 6);
									break;
							}
							if (
								ThreeUtil.isNotNull(this.skyboxImage) ||
								ThreeUtil.isNotNull(this.skyboxCubeImage)
							) {
								const envMap = AbstractTextureComponent.getTextureImage(
									this.skyboxImage,
									this.skyboxCubeImage
								);
								skyMaterial = new THREE.MeshBasicMaterial({
									depthTest: false,
									envMap: envMap,
									side: THREE.BackSide,
								});
							} else {
								skyMaterial = new THREE.MeshBasicMaterial({
									depthTest: false,
									// depthWrite : false,
									color: this.getSkyColor(0xff0000),
									side: THREE.BackSide,
								});
							}
							basemesh = new THREE.Mesh(skyGeometry, skyMaterial);
							basemesh.receiveShadow = false;
							basemesh.castShadow = false;
							break;
					}
					break;
				case 'html':
				case 'htmlmesh':
					basemesh = new HTMLMesh(this.getCssTag());
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
					if (ThreeUtil.isNotNull(this.cssStyle)) {
						this.cssClazzName = ThreeUtil.addCssStyle(
							cssElement,
							this.cssStyle,
							this.cssClazzName,
							'mesh',
							'inline'
						);
					}
					switch (this.type.toLowerCase()) {
						case 'svg':
						case 'svgobject':
							basemesh = new SVGObject(cssElement as SVGElement);
							break;
						case 'css2d':
						case 'css2dobject':
							basemesh = new CSS2DObject(cssElement);
							break;
						case 'css3dsprite':
							basemesh = new CSS3DSprite(cssElement);
							break;
						case 'css3dobject':
						case 'css3d':
						case 'css':
						default:
							basemesh = new CSS3DObject(cssElement);
							break;
					}
					break;
				case 'reflector':
					const reflectorSize = this.getTextureSize();
					const reflector = new Reflector(geometry, {
						color: this.getColor(),
						textureWidth: reflectorSize.x,
						textureHeight: reflectorSize.y,
						clipBias: this.getClipBias(0.003),
						shader: this.getShader(),
						encoding: this.getEncoding(),
					});
					this.subscribeRefer(
						'textureSize',
						ThreeUtil.getSubscribe(
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
					const reflectorRTT = new ReflectorRTT(geometry, {
						color: this.getColor(),
						textureWidth: reflectorRTTSize.x,
						textureHeight: reflectorRTTSize.y,
						clipBias: this.getClipBias(0.003),
						shader: this.getShader(),
						encoding: this.getEncoding(),
					});
					this.subscribeRefer(
						'textureSize',
						ThreeUtil.getSubscribe(
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
					const refractor = new Refractor(geometry, {
						color: this.getColor(),
						textureWidth: refractorSize.x,
						textureHeight: refractorSize.y,
						clipBias: this.getClipBias(0.003),
						shader: this.getShader(),
						encoding: this.getEncoding(),
					});
					const refractorMaterial = refractor.material as THREE.ShaderMaterial;
					Object.entries(refractorMaterial.uniforms).forEach(([key, value]) => {
						switch (key.toLowerCase()) {
							case 'tdudv':
								value.value = this.getTexture('tdudv') || null;
								break;
						}
					});
					this.subscribeRefer(
						'textureSize',
						ThreeUtil.getSubscribe(
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
				case 'reflectorforssrpass':
					const reflectorForSSRPassSize = this.getTextureSize();
					const reflectorForSSRPass = new ReflectorForSSRPass(geometry, {
						textureWidth: reflectorForSSRPassSize.x,
						textureHeight: reflectorForSSRPassSize.y,
						clipBias: this.getClipBias(0.003),
						color: this.getColor(0x7f7f7f).getHex(),
						useDepthTexture: ThreeUtil.getTypeSafe(this.useDepthTexture, true),
					});
					this.subscribeRefer(
						'textureSize',
						ThreeUtil.getSubscribe(
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
					const waterAny: any = Water;
					const water = new waterAny(geometry, {
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
						ThreeUtil.getSubscribe(
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
					const water2Any: any = Water2;
					const water2 = new water2Any(geometry, {
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
						normalMap0: this.getTexture(
							'normalMap0',
							this.normalMap0,
							'textures/water/Water_1_M_Normal.jpg'
						),
						normalMap1: this.getTexture(
							'normalMap1',
							this.normalMap1,
							'textures/water/Water_2_M_Normal.jpg'
						),
						encoding: this.getEncoding(),
					});
					this.getUndateUniforms(water2.material['uniforms']);
					this.subscribeRefer(
						'textureSize',
						ThreeUtil.getSubscribe(
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
					const sky = new Sky();
					this.getUndateUniforms(sky.material.uniforms);
					basemesh = sky;
					break;
				case 'flow':
					const flowMaterial = this.getMaterialOne();
					const objectToCurve = new THREE.Mesh(geometry, flowMaterial);
					const flow = new Flow(objectToCurve);
					const flowCurve = this.getCurve();
					if (ThreeUtil.isNotNull(flowCurve)) {
						flow.updateCurve(0, flowCurve);
					}
					this.setUserData('storageSource', flow);
					basemesh = new THREE.Group();
					basemesh.add(flow.object3D);
					if (ThreeUtil.isNotNull(this.moveAlongCurve)) {
						flow.object3D.onBeforeRender = () => {
							flow.moveAlongCurve(
								ThreeUtil.getTypeSafe(this.moveAlongCurve, 0.001)
							);
						};
					}
					break;
				case 'instancedflow':
					const instancedFlowMaterial = this.getMaterialOne();
					const instancedFlowCount = this.getCount(1);
					const instancedFlow = new InstancedFlow(
						instancedFlowCount,
						1,
						geometry,
						instancedFlowMaterial
					);
					const instancedFlowCurve = this.getCurve();
					if (ThreeUtil.isNotNull(instancedFlowCurve)) {
						instancedFlow.updateCurve(0, instancedFlowCurve);
						instancedFlow.setCurve(0, 0);
						const instancedFlowColor = ThreeUtil.getTypeSafe(
							this.colors,
							'rand'
						);
						const instancedFlowColors: THREE.Color[] = [];
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
										instancedFlowColors.push(
											new THREE.Color(0xffffff * Math.random())
										);
									}
									break;
								default:
									const colorList = instancedFlowColor.split(',');
									for (let i = 0; i < instancedFlowCount; i++) {
										if (colorList.length > i) {
											instancedFlowColors.push(
												ThreeUtil.getColorSafe(colorList[i])
											);
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
									instancedFlowColors.push(
										ThreeUtil.getColorSafe(colorList[i])
									);
								} else {
									instancedFlowColors.push(null);
								}
							}
						} else {
							for (let i = 0; i < instancedFlowCount; i++) {
								instancedFlowColors.push(null);
							}
						}
						const instancedFlowOffset = ThreeUtil.getTypeSafe(
							this.moveIndividualAlongCurve,
							'equals'
						);
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
											instancedFlowOffsets.push(
												Math.min(1, Math.max(0, parseFloat(offsetList[0])))
											);
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
							if (ThreeUtil.isNotNull(instancedFlowOffsets[i])) {
								instancedFlow.moveIndividualAlongCurve(
									i,
									instancedFlowOffsets[i]
								);
							}
							if (ThreeUtil.isNotNull(instancedFlowColors[i])) {
								instancedFlow.object3D.setColorAt(i, instancedFlowColors[i]);
							}
						}
					}
					this.setUserData('storageSource', instancedFlow);
					basemesh = new THREE.Group();
					basemesh.add(instancedFlow.object3D);
					if (ThreeUtil.isNotNull(this.moveAlongCurve)) {
						instancedFlow.object3D.onBeforeRender = () => {
							instancedFlow.moveAlongCurve(
								ThreeUtil.getTypeSafe(this.moveAlongCurve, 0.001)
							);
						};
					}
					break;
				case 'lineloop':
					let points: any[] = [];
					const lineloopCurve = this.getCurve();
					if (ThreeUtil.isNotNull(lineloopCurve)) {
						points = lineloopCurve.getPoints(this.getDivisions(50));
					}
					const lineLoop = new THREE.LineLoop(
						new THREE.BufferGeometry().setFromPoints(points),
						this.getMaterials()
					);
					basemesh = lineLoop;
					break;
				case 'light':
					const light = this.initLocalComponent('light', new LightComponent());
					light.updateInputParams(this.lightOptions);
					basemesh = light.getObject3d();
					break;
				case 'lensflareelement':
				case 'lensflare':
					const lensflare = new Lensflare();
					this.lensflareElementList.forEach((lensflareElement) => {
						lensflareElement.setLensflare(lensflare);
					});
					basemesh = lensflare;
					break;
				case 'instancedmesh':
				case 'instanced':
					const instanced = new THREE.InstancedMesh(
						geometry,
						this.getMaterialOne(),
						this.getCount(1)
					);
					if (ThreeUtil.isNotNull(this.usage)) {
						instanced.instanceMatrix.setUsage(this.getUsage('dynamicdraw'));
					}
					if (ThreeUtil.isNotNull(this.makeMatrix)) {
						const matrix = new THREE.Matrix4();
						for (let i = 0; i < instanced.count; i++) {
							this.makeMatrix(matrix, i);
							instanced.setMatrixAt(i, matrix);
						}
					}
					if (ThreeUtil.isNotNull(this.makeColor)) {
						const color = new THREE.Color();
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
							if (ThreeUtil.isNotNull(this.makeMatrix)) {
								const matrix = new THREE.Matrix4();
								this.makeMatrix(matrix);
								instanceGeometry.applyMatrix4(matrix);
							}
							geometries.push(instanceGeometry);
						}
						const materials = this.getMaterials();
						const mergedGeometry =
							BufferGeometryUtils.mergeBufferGeometries(geometries);
						basemesh = new THREE.Mesh(mergedGeometry, materials);
					}
					break;
				case 'naive':
					{
						basemesh = new THREE.Group();
						const matrix = new THREE.Matrix4();
						const material = this.getMaterials();
						const count = this.getCount(1);
						for (let i = 0; i < count; i++) {
							if (ThreeUtil.isNotNull(this.makeMatrix)) {
								this.makeMatrix(matrix);
							}
							const mesh = new THREE.Mesh(geometry, material);
							mesh.applyMatrix4(matrix);
							basemesh.add(mesh);
						}
					}
					break;
				case 'multi':
				case 'multimaterial':
					basemesh = SceneUtils.createMultiMaterialObject(
						geometry,
						this.getMaterialsMulti()
					);
					basemesh.children.forEach(function (e) {
						e.castShadow = true;
					});
					if (this.scaleStep != 1) {
						let scaleStep = this.scaleStep;
						basemesh.children.forEach((mesh) => {
							mesh.scale.x *= scaleStep;
							mesh.scale.y *= scaleStep;
							mesh.scale.z *= scaleStep;
							scaleStep *= this.scaleStep;
						});
					}
					break;
				case 'sprite':
					const sprite = new THREE.Sprite(
						this.getMaterialOne() as THREE.SpriteMaterial
					);
					if (
						ThreeUtil.isNotNull(this.centerX) &&
						ThreeUtil.isNotNull(this.centerY)
					) {
						sprite.center.copy(
							ThreeUtil.getVector2Safe(
								this.centerX,
								this.centerY,
								new THREE.Vector2()
							)
						);
					}
					basemesh = sprite;
					break;
				case 'wireframe':
					basemesh = new Wireframe(
						geometry as LineSegmentsGeometry,
						this.getMaterialOne() as LineMaterial
					);
					break;
				case 'lod':
					basemesh = new THREE.LOD();
					break;
				case 'marchingcubes':
					const effect = new MarchingCubes(
						this.getResolution(28),
						this.getMaterialOne(),
						this.getEnableUvs(false),
						this.getEnableColors(false)
					);
					if (ThreeUtil.isNotNull(this.isolation)) {
						effect.isolation = this.getIsolation(80.0);
					}
					if (
						ThreeUtil.isNotNull(this.blobInfos) &&
						this.blobInfos.length > 0
					) {
						this.blobInfos.forEach((blobInfo) => {
							effect.addBall(
								blobInfo.x,
								blobInfo.y,
								blobInfo.z,
								blobInfo.strength,
								blobInfo.subtract,
								ThreeUtil.getColorSafe(blobInfo.colors)
							);
						});
					}
					if (
						ThreeUtil.isNotNull(this.planeInfos) &&
						this.planeInfos.length > 0
					) {
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
					basemesh = new THREE.Points(geometry, this.getMaterials());
					break;
				case 'line':
					const line = new THREE.Line(geometry, this.getMaterials());
					line.castShadow = this.castShadow;
					basemesh = line;
					break;
				case 'tubepainter':
					const tubePainter: any = new TubePainter();
					if (ThreeUtil.isNotNull(this.size)) {
						tubePainter['setSize'](this.size);
					}
					tubePainter.mesh.material['side'] = THREE.DoubleSide;
					tubePainter.moveTo(new THREE.Vector3(0, 0, 0));
					tubePainter.lineTo(new THREE.Vector3(0.1, 0.1, 0));
					tubePainter.lineTo(new THREE.Vector3(0.1, -0.1, 0));
					tubePainter.update();
					basemesh = tubePainter.mesh;
					break;
				case 'text':
					basemesh = new MeshText(
						ThreeUtil.getTypeSafe(this.text, 'test'),
						ThreeUtil.getTypeSafe(this.size, 1),
						ThreeUtil.getColorSafe(this.color, 0xffffff)
					);
					break;
				case 'line2':
					const lineMaterial = this.getMaterialOne();
					if (
						geometry instanceof LineGeometry &&
						lineMaterial instanceof LineMaterial
					) {
						const line2 = new Line2(geometry, lineMaterial);
						line2.computeLineDistances();
						line2.scale.set(1, 1, 1);
						basemesh = line2;
					} else {
						const line = new THREE.Line(geometry, this.getMaterials());
						line.computeLineDistances();
						line.castShadow = this.castShadow;
						basemesh = line;
					}
					break;
				case 'linesegments':
					const lineSegments = new THREE.LineSegments(
						geometry,
						this.getMaterials()
					);
					if (geometry.index === null) {
						// lineSegments.computeLineDistances();
					}
					lineSegments.castShadow = this.castShadow;
					basemesh = lineSegments;
					break;
				case 'md2charactercomplex':
					basemesh = new THREE.Group();
					if (this.shareParts !== null) {
						const loadShareParts = () => {
							const shareParts = ThreeUtil.getObject3d(this.shareParts).userData
								.clips;
							if (shareParts instanceof MD2CharacterComplex) {
								const character = new MD2CharacterComplex();
								character.shareParts(shareParts);
								if (this.receiveShadow) {
									character.enableShadows(this.receiveShadow);
								}
								basemesh.children.forEach((child) => {
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
							ThreeUtil.getSubscribe(
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
					const renderer = ThreeUtil.getRenderer() as THREE.WebGL1Renderer;
					let camera: THREE.Camera = null;
					if (ThreeUtil.isNotNull(this.sharedCamera)) {
						if (this.sharedCamera.getCamera) {
							camera = this.sharedCamera.getCamera();
						} else if (this.sharedCamera instanceof THREE.Camera) {
							camera = this.sharedCamera;
						}
					}
					if (camera === null) {
						camera = new THREE.Camera();
					}
					renderer.domElement.style.pointerEvents = 'all';
					renderer.domElement.style.touchAction = 'auto';
					basemesh = new InteractiveGroup(renderer, camera);
					break;
				case 'lightning':
				case 'lightningstorm':
					const stormParams: StormParams = ThreeUtil.getTypeSafe(
						this.stormParams,
						{}
					);
					if (ThreeUtil.isNotNull(this.rayParams)) {
						stormParams.lightningParameters = Object.assign(
							this.rayParams,
							stormParams.lightningParameters || {}
						);
					}
					const lightningMaterial = this.getMaterialOne(
						{ color: 0xffffff },
						false
					);
					if (ThreeUtil.isNotNull(lightningMaterial)) {
						stormParams.lightningMaterial = lightningMaterial;
					}
					basemesh = new LightningStorm(stormParams) as any;
					break;
				case 'group':
					basemesh = new THREE.Group();
					break;
				case 'mesh':
				default:
					if (ThreeUtil.isNotNull(this.storageName)) {
						basemesh = new THREE.Group();
						this.localStorageService.getObject(
							this.storageName,
							(
								loadedMesh: THREE.Object3D,
								clips?: THREE.AnimationClip[] | any,
								geometry?: THREE.BufferGeometry,
								morphTargets?: THREE.BufferAttribute[],
								source?: any
							) => {
								if (ThreeUtil.isNull(loadedMesh)) {
									if (ThreeUtil.isNotNull(geometry)) {
										geometry.computeVertexNormals();
										const anyGeometry: any = geometry;
										if (
											anyGeometry['animations'] !== null &&
											anyGeometry['animations'] !== undefined &&
											anyGeometry['animations'].length > 0
										) {
											const morphAnim = new MorphAnimMesh(
												geometry,
												this.getMaterialOne()
											);
											loadedMesh = morphAnim;
											if (anyGeometry['animations'] !== null) {
												clips = anyGeometry['animations'];
											}
										} else {
											loadedMesh = new THREE.Mesh(
												geometry,
												this.getMaterialOne()
											);
										}
									} else if (ThreeUtil.isNotNull(morphTargets)) {
										const baseGeometry = this.getGeometry();
										baseGeometry.morphAttributes.position = morphTargets;
										loadedMesh = new THREE.Mesh(
											baseGeometry,
											this.getMaterialOne()
										);
									}
								}
								if (this.castShadow && loadedMesh) {
									loadedMesh.traverse((object) => {
										if (object instanceof THREE.Mesh) {
											object.castShadow = this.castShadow;
											object.receiveShadow = this.receiveShadow;
										}
									});
								}
								if (
									ThreeUtil.isNotNull(this.morphTargets) &&
									loadedMesh instanceof THREE.Mesh
								) {
									if (loadedMesh.material instanceof THREE.Material) {
										(loadedMesh.material as any)['morphTargets'] =
											this.morphTargets;
									}
								}
								this.setUserData('refTarget', loadedMesh);
								this.setUserData('clips', clips);
								this.setUserData('storageSource', source);
								this.clips = clips;
								if (ThreeUtil.isNull(loadedMesh)) {
									loadedMesh = new THREE.Group();
								}
								if (ThreeUtil.isNotNull(loadedMesh)) {
									if (source instanceof Volume) {
										this.addChanges(['volumeoption']);
									}
									loadedMesh.parent = null;
									this.setMesh(loadedMesh);
									if (
										ThreeUtil.isNotNull(source) &&
										ThreeUtil.isNotNull(source.skeleton) &&
										ThreeUtil.isNotNull(source.skeleton.bones) &&
										source.skeleton.bones.length > 0
									) {
										this.addParentObject3d(source.skeleton.bones[0]);
									}
								}
							},
							this.storageOption
						);
					} else if (ThreeUtil.isNotNull(this.sharedMesh)) {
						this.unSubscribeRefer('sharedMesh');
						const mesh = this.sharedMesh.getObject3d();
						const clips = mesh.userData.clips;
						const clipMesh = mesh.userData.refTarget || mesh;
						let clipMeshClone: THREE.Object3D = null;
						this.setUserData('clips', clips);
						this.setUserData('storageSource', clipMesh.userData.storageSource);
						if (ThreeUtil.isNotNull(clipMesh)) {
							const oldUserData = clipMesh.userData;
							clipMesh.userData = {};
							clipMeshClone = clipMesh.clone(true);
							clipMesh.userData = oldUserData;
						}
						if (clipMeshClone !== null) {
							basemesh = clipMeshClone;
							basemesh.traverse((object) => {
								if (object instanceof THREE.Mesh) {
									object.castShadow = this.castShadow;
									object.receiveShadow = this.receiveShadow;
								}
							});
						}
						this.subscribeRefer(
							'sharedMesh',
							ThreeUtil.getSubscribe(
								this.sharedMesh,
								() => {
									this.needUpdate = true;
								},
								'loaded'
							)
						);
					} else {
						if (geometry !== null) {
							basemesh = new THREE.Mesh(geometry, this.getMaterials());
						} else {
							basemesh = new THREE.Mesh();
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
	private setMesh(mesh: THREE.Object3D) {
		if (mesh !== null && this.mesh !== mesh) {
			if (
				mesh instanceof THREE.Mesh ||
				mesh instanceof THREE.Points ||
				mesh instanceof THREE.Sprite
			) {
				if (mesh instanceof THREE.Mesh || mesh instanceof THREE.Points) {
					if (this.geometry instanceof MeshComponent) {
						const realMesh = this.geometry.getRealMesh();
						if (realMesh !== null && realMesh instanceof THREE.Mesh) {
							mesh.morphTargetInfluences = realMesh.morphTargetInfluences;
							mesh.morphTargetDictionary = realMesh.morphTargetDictionary;
						}
					}
				}
				if (mesh instanceof THREE.Mesh) {
					mesh.castShadow = this.castShadow;
					mesh.receiveShadow = this.receiveShadow;
					if (this.usePlaneStencil && mesh.material instanceof THREE.Material) {
						const clippingMaterial: any = mesh.material;
						const clippingPlanes =
							clippingMaterial.clippingPlanes as THREE.Plane[];
						if (clippingPlanes !== null && clippingPlanes.length > 0) {
							const planeGeom = new THREE.PlaneGeometry(4, 4);
							const poGroup = new THREE.Group();
							const object = new THREE.Group();
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
								meshStandardMaterialParameters.color = this.getColor(
									clippingMaterial['color']
								);
							}
							if (clippingMaterial['metalness'] !== undefined) {
								meshStandardMaterialParameters.metalness = this.getMetalness(
									clippingMaterial['metalness']
								);
							}
							if (clippingMaterial['roughness'] !== undefined) {
								meshStandardMaterialParameters.roughness = this.getRoughness(
									clippingMaterial['roughness']
								);
							}
							clippingPlanes.forEach((plane, idx) => {
								const group = this.createPlaneStencilGroup(
									mesh.geometry,
									plane,
									idx + 1
								);
								object.add(group);
								const materialComponent = this.initLocalComponent(
									'clippingPlanes_' + idx,
									new MaterialComponent(null)
								);
								materialComponent.updateInputParams(
									Object.assign(meshStandardMaterialParameters, {
										clippingPlanes: clippingPlanes.filter((p) => p !== plane),
									})
								);
								const planeMat = materialComponent.getMaterial();
								const po = new THREE.Mesh(planeGeom, planeMat);
								po.onBeforeRender = () => {
									plane.coplanarPoint(po.position);
									const position = po.position;
									po.lookAt(
										position.x - plane.normal.x,
										position.y - plane.normal.y,
										position.z - plane.normal.z
									);
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
					if (ThreeUtil.isNotNull(this.geometry)) {
						this.subscribeRefer(
							'geomeryChange',
							ThreeUtil.getSubscribe(
								this.geometry,
								() => {
									this.needUpdate = true;
								},
								'loaded'
							)
						);
					}
					if (ThreeUtil.isNotNull(this.geometryList)) {
						this.geometryList.forEach((geometry) => {
							this.subscribeReferList(
								'geomeryListChange',
								ThreeUtil.getSubscribe(
									geometry,
									() => {
										this.needUpdate = true;
									},
									'loaded'
								)
							);
						});
					}
					if (ThreeUtil.isNotNull(this.material)) {
						this.subscribeRefer(
							'materialChange',
							ThreeUtil.getSubscribe(
								this.material,
								() => {
									this.needUpdate = true;
								},
								'loaded'
							)
						);
					}
					if (ThreeUtil.isNotNull(this.materialList)) {
						this.materialList.forEach((material) => {
							this.subscribeReferList(
								'materialListChange',
								ThreeUtil.getSubscribe(
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

	private createPlaneStencilGroup(
		geometry: THREE.BufferGeometry,
		plane: THREE.Plane,
		renderOrder: number
	): THREE.Group {
		const group = new THREE.Group();
		const baseMat = new THREE.MeshBasicMaterial();
		baseMat.depthWrite = false;
		baseMat.depthTest = false;
		baseMat.colorWrite = false;
		baseMat.stencilWrite = true;
		baseMat.stencilFunc = THREE.AlwaysStencilFunc;
		const mat0 = baseMat.clone();
		mat0.side = THREE.BackSide;
		mat0.clippingPlanes = [plane];
		mat0.stencilFail = THREE.IncrementWrapStencilOp;
		mat0.stencilZFail = THREE.IncrementWrapStencilOp;
		mat0.stencilZPass = THREE.IncrementWrapStencilOp;
		const mesh0 = new THREE.Mesh(geometry, mat0);
		mesh0.renderOrder = renderOrder;
		group.add(mesh0);
		const mat1 = baseMat.clone();
		mat1.side = THREE.FrontSide;
		mat1.clippingPlanes = [plane];
		mat1.stencilFail = THREE.DecrementWrapStencilOp;
		mat1.stencilZFail = THREE.DecrementWrapStencilOp;
		mat1.stencilZPass = THREE.DecrementWrapStencilOp;
		const mesh1 = new THREE.Mesh(geometry, mat1);
		mesh1.renderOrder = renderOrder;
		group.add(mesh1);
		return group;
	}

	/**
	 * Helper component of mesh component
	 */
	public helperComponent: HelperComponent = null;

	/**
	 * Resets helper
	 */
	public resetHelper() {
		if (this.mesh !== null) {
			if (ThreeUtil.isNotNull(this.helperType)) {
				if (this.helperComponent === null) {
					this.helperComponent = this.initLocalComponent(
						'helper',
						new HelperComponent()
					);
				}
				this.helperComponent.updateInputParams(
					this.helperOptions,
					true,
					{},
					this.helperType
				);
				this.helperComponent.setParent(this.mesh);
			} else if (this.helperComponent !== null) {
				this.helperComponent.ngOnDestroy();
				this.helperComponent = null;
			}
		}
	}
}
