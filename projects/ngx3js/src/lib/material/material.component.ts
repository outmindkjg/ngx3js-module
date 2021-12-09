import {
	Component,
	ContentChildren,
	forwardRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	QueryList,
	SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
import * as THREE_MAT from './materials/three-materials';
import { ReflectorOptions } from 'three/examples/jsm/objects/Reflector';
import { ReflectorRTT } from 'three/examples/jsm/objects/ReflectorRTT';
import {
	RendererTimer,
	ThreeColor,
	ThreeTexture,
	ThreeUniforms,
	ThreeUtil,
} from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { AbstractMaterialComponent } from '../material.abstract';
import { ShaderComponent } from '../shader/shader.component';
import { ShaderType, ShaderUtils } from '../shader/shaders/shaderUtils';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { AbstractTextureComponent } from '../texture.abstract';
import { NodeMaterialLoader } from '../threejs-library/NodeMaterialLoader';
import * as THREE_CORE from './../threejs-library/three-core';

/**
 * The Material component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MaterialComponent) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material) page for a live demo.
 *
 * Abstract base class for materials.
 *
 * Materials describe the appearance of objects.
 * They are defined in a (mostly) renderer-independent way, so you don't have to
 * rewrite materials if you decide to use a different renderer.
 *
 * The following properties and methods are inherited by all other material types
 * (although they may have different defaults).
 *
 * ```html
 * <ngx3js-material
 * 	[type]="'LineBasicMaterial'" [color]="'0xffff00'"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'LineDashedMaterial'"
 * 	[color]="'blue'" [linewidth]="1" [dashSize]="10" [gapSize]="10"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'MeshBasicMaterial'"
 * 	[color]="'0x000000'" [wireframe]="true"
 * 	[wireframeLinewidth]="1" [side]="'double'"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[materialType]="'overrideMaterial'"
 * 	[type]="'MeshDepthMaterial'"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'MeshDepth'"
 * 	[depthPacking]="'RGBA'" [displacementMap]="displacementMap"
 * 	[displacementScale]="2.436143" [displacementBias]="-0.428408"
 * 	[side]="controls.side"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'MeshDistance'"
 * 	[materialType]="'customdistance'" [alphaTest]="0.5" [alphaMap]="alphaMap"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'MeshMatcapMaterial'" [color]="'0xaa24df'" [matcap]="texture"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'MeshNormal'" [color]="'0xff0000'"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'MeshPhongMaterial'"
 * 	[specular]="'0x333333'" [shininess]="5"
 * 	[map]="'textures/planets/earth_atmos_2048.jpg'"
 * 	[specularMap]="'textures/planets/earth_specular_2048.jpg'"
 * 	[normalMap]="'textures/planets/earth_normal_2048.jpg'"
 * 	[normalScale]="0.85"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'MeshPhysicalMaterial'"
 * 	[roughness]="info.roughness" [metalness]="info.metalness"
 * 	[color]="'0xffffff'"
 * 	[envMap]="radianceMap" [envMapIntensity]="1" [reflectivity]="1"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	#sphereMaterial
 * 	[type]="'MeshStandardMaterial'"
 * 	[color]="'0x888855'" [roughness]="0.8" [metalness]="0.5"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'MeshToonMaterial'" [color]="info.color"
 * ></ngx3js-texture>
 * <ngx3js-material
 * 	[type]="'PointsMaterial'" [color]="'0xffff00'" [size]="5"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'RawShaderMaterial'" [uniforms]="{
 * 		time: { type: 'number', value: 1.0 },
 * 		sineTime: { type: 'number', value: 1.0 }
 * 	}" [shader]="'instancing'" [side]="'double'" [transparent]="true"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'ShaderMaterial'"
 * 	[shader]="'audioVisualizer'"
 * 	[uniforms]="{ tAudioData: { type: 'DataTexture', value: audio } }"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'ShadowMaterial'"
 * 	[color]="'0x111111'"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'Line'"
 * 	[color]="'0x4080ff'"
 * 	[linewidth]="5" [dashed]="true" [dashScale]="5" [dashSize]="2"
 * 	[gapSize]="3" [resolutionX]="1024" [resolutionY]="1024"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'SpriteMaterial'" [color]="info.color"
 * ></ngx3js-material>
 * <ngx3js-material
 * 	[type]="'meshlambert'" [color]="'0xff0000'"
 * ></ngx3js-material>
 * ```
 * @see THREE.Material
 */
@Component({
	selector: 'ngx3js-material',
	templateUrl: './material.component.html',
	styleUrls: ['./material.component.scss'],
	providers: [
		{
			provide: AbstractMaterialComponent,
			useExisting: forwardRef(() => MaterialComponent),
		},
		{
			provide: AbstractSubscribeComponent,
			useExisting: forwardRef(() => MaterialComponent),
		},
	],
})
export class MaterialComponent
	extends AbstractMaterialComponent
	implements OnInit, OnDestroy, OnChanges
{
	/**
	 * The type if matrial.
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.Material
	 * @see THREE.LineBasicMaterial - LineBasicMaterial, LineBasic
	 * @see THREE.LineDashedMaterial - LineDashedMaterial, LineDashed
	 * @see THREE.MeshBasicMaterial - MeshBasicMaterial, MeshBasic
	 * @see THREE.MeshDepthMaterial - MeshDepthMaterial, MeshDepth,
	 * @see THREE.MeshDistanceMaterial - MeshDistanceMaterial, MeshDistance,
	 * @see THREE.MeshMatcapMaterial - MeshMatcapMaterial, MeshMatcap,
	 * @see THREE.MeshNormalMaterial - MeshNormalMaterial, MeshNormal,
	 * @see THREE.MeshPhongMaterial - MeshPhongMaterial, MeshPhong,
	 * @see THREE.MeshPhysicalMaterial - MeshPhysicalMaterial, MeshPhysical,
	 * @see THREE.MeshStandardMaterial - MeshStandardMaterial, MeshStandard,
	 * @see THREE.MeshToonMaterial - MeshToonMaterial, MeshToon,
	 * @see THREE.PointsMaterial - PointsMaterial, Points,
	 * @see THREE.RawShaderMaterial - RawShaderMaterial, RawShader,
	 * @see THREE.ShaderMaterial - ShaderMaterial, Shader,
	 * @see THREE.ShadowMaterial - ShadowMaterial, Shadow,
	 * @see THREE.SpriteMaterial - SpriteMaterial, Sprite,
	 * @see THREE_MAT.NODES.StandardNodeMaterial - StandardNodeMaterial, StandardNode,
	 * @see THREE_MAT.NODES.BasicNodeMaterial - BasicNodeMaterial, BasicNode,
	 * @see THREE_MAT.NODES.MeshStandardNodeMaterial - MeshStandardNodeMaterial, MeshStandardNode,
	 * @see THREE_MAT.NODES.PhongNodeMaterial - PhongNodeMaterial, PhongNode,
	 * @see THREE_MAT.NODES.SpriteNodeMaterial - SpriteNodeMaterial, SpriteNode,
	 * @see THREE.MeshLambertMaterial - MeshLambertMaterial, MeshLambert
	 */
	@Input() public type: string = 'lambert';

	/**
	 * The storage name to restore.
	 */
	@Input() public storageName: string = null;

	/**
	 * The storage options when restore to be used.
	 */
	@Input() public storageOption: any = null;

	/**
	 * Color of the material, by default set to white (0xffffff).
	 */
	@Input() public color: ThreeColor = null;

	/**
	 * Color of the material multiply (1)
	 */
	@Input() public colorMultiply: number = null;

	/**
	 * Color of the material, by default set to white (0xffffff).
	 */
	@Input() public diffuseColor: ThreeColor = null;

	/**
	 * Color of the material multiply (1)
	 */
	@Input() public diffuseColorMultiply: number = null;

	/**
	 * The shader type
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public shader: string | ShaderType = null;

	/**
	 * An object of the form:
	 * ```json
	 * { "uniform1": { value: 1.0 }, "uniform2": { value: 2 } }
	 * ```
	 * specifying the uniforms to be passed to the shader code; keys are uniform names, values are definitions of the form
	 * ```json
	 * { value: 1.0 }
	 * ```
	 * where *value* is the value of the uniform. Names must match the name of the uniform, as defined in the GLSL code. Note that uniforms are refreshed on every frame, so updating the value of the uniform will immediately update the value available to the GLSL code.
	 */
	@Input() public uniforms: ThreeUniforms = null;

	/**
	 * Vertex shader GLSL code.  This is the actual code for the shader. In the example above, the *vertexShader* and *fragmentShader* code is extracted from the DOM; it could be passed as a string directly or loaded via AJAX instead.
	 */
	@Input() public vertexShader: string = null;

	/**
	 * Fragment shader GLSL code.  This is the actual code for the shader. In the example above, the *vertexShader* and *fragmentShader* code is extracted from the DOM; it could be passed as a string directly or loaded via AJAX instead.
	 */
	@Input() public fragmentShader: string = null;

	/**
	 * Defines whether this material uses lighting; true to pass uniform data related to lighting to this shader. Default is false.
	 */
	@Input() public lights: boolean = null;

	/**
	 * Defines whether this material supports clipping; true to let the renderer pass the clippingPlanes uniform. Default is false.
	 */
	@Input() public clipping: boolean = null;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 */
	@Input() public wireframe: boolean = null;

	/**
	 * Specular color of the material. Default is a [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Color) set to *0x111111* (very dark grey).
	 * This defines how shiny the material is and the color of its shine.
	 */
	@Input() public specular: ThreeColor = null;

	/**
	 * The specularMultiply of material component
	 */
	@Input() public specularMultiply: number = null;

	/**
	 * How shiny the [MeshPhongMaterial.specular](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/MeshPhongMaterial.specular) highlight is; a higher value gives a sharper highlight. Default is *30*.
	 */
	@Input() public shininess: number = null;

	/**
	 * Intensity of the baked light. Default is 1.
	 */
	@Input() public lightMapIntensity: number = null;

	/**
	 * Intensity of the ambient occlusion effect. Default is 1. Zero is no occlusion effect.
	 */
	@Input() public aoMapIntensity: number = null;

	/**
	 * Emissive (light) color of the material, essentially a solid color unaffected by other lighting.
	 * Default is black.
	 *
	 */
	@Input() public emissive: ThreeColor = null;

	/**
	 * Emissive (light) color multiply of the material, essentially a solid color unaffected by other lighting.
	 */
	@Input() public emissiveMultiply: number = null;

	/**
	 * Intensity of the emissive light. Modulates the emissive color. Default is 1.
	 */
	@Input() public emissiveIntensity: number = null;

	/**
	 * How much the bump map affects the material. Typical ranges are 0-1. Default is 1.
	 */
	@Input() public bumpScale: number = null;

	/**
	 * The type of normal map.
	 * Options are [THREE.TangentSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.THREE.TangentSpaceNormalMap) (default), and [THREE.ObjectSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.THREE.ObjectSpaceNormalMap).
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public normalMapType: string = null;

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 * Default is a [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector2) set to (1,1) *1*.
	 */
	@Input() public normalScale: number = null;

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 * Default is a [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector2) set to (1,1).
	 */
	@Input() public normalScaleX: number = null;

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 * Default is a [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Vector2) set to (1,1).
	 */
	@Input() public normalScaleY: number = null;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 * Default is 1.
	 */
	@Input() public displacementScale: number = null;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 */
	@Input() public displacementBias: number = null;

	/**
	 * How to combine the result of the surface's color with the environment map, if any.
	 * Options are [THREE.Multiply](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) (default), [THREE.MixOperation](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials), [THREE.AddOperation](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials). If mix is chosen, the [MeshBasicMaterial.reflectivity](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/MeshBasicMaterial.reflectivity) is used to blend between the two colors.
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.MultiplyOperation - MultiplyOperation, Multiply
	 * @see THREE.MixOperation - MixOperation, Mix
	 * @see THREE.AddOperation - AddOperation, Add
	 */
	@Input() public combine: string = null;

	/**
	 * How much the environment map affects the surface; also see [MeshBasicMaterial.combine](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/MeshBasicMaterial.combine).
	 * The default value is 1 and the valid range is between 0 (no reflections) and 1 (full reflections).
	 */
	@Input() public reflectivity: number = null;

	/**
	 * The index of refraction (IOR) of air (approximately 1) divided by the index of refraction of the material.
	 * It is used with environment mapping modes [THREE.CubeRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures) and [THREE.EquirectangularRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures).
	 * The refraction ratio should not exceed 1. Default is *0.98*.
	 */
	@Input() public refractionRatio: number = null;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf) with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 */
	@Input() public wireframeLinewidth: number = null;

	/**
	 * Define appearance of line ends. Possible values are "butt", "round" and "square". Default is 'round'.
	 * This corresponds to the [2D Canvas lineCap](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap) roperty and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer) renderer.
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public wireframeLinecap: string = null;

	/**
	 * Define appearance of line joints. Possible values are "round", "bevel" and "miter". Default is 'round'.
	 * This corresponds to the [2D Canvas lineJoin](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin) property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer) renderer.
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public wireframeLinejoin: string = null;

	/**
	 * Define whether the material uses morphTargets. Default is false.
	 */
	@Input() public morphTargets: boolean = null;

	/**
	 * Defines whether the material uses morphNormals. Set as true to pass morphNormal attributes from the geometry to the shader. Default is *false*.
	 */
	@Input() public morphNormals: boolean = null;

	/**
	 * Controls line thickness. Default is *1*.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf) with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 */
	@Input() public linewidth: number = null;

	/**
	 * Define appearance of line ends. Possible values are 'butt', 'round' and 'square'.
	 * Default is 'round'.
	 * This corresponds to the [2D Canvas lineCap](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap) property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer) renderer.
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public linecap: string = null;

	/**
	 * Define appearance of line joints. Possible values are 'round', 'bevel' and 'miter'. Default is 'round'.
	 * This corresponds to the [2D Canvas lineJoin](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin) property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer) renderer.
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public linejoin: string = null;

	/**
	 * The scale of the dashed part of a line. Default is *1*.
	 */
	@Input() public scale: number = null;

	/**
	 * The size of the dash. This is both the gap with the stroke. Default is *3*.
	 */
	@Input() public dashSize: number = null;

	/**
	 * The size of the gap. Default is *1*.
	 */
	@Input() public gapSize: number = null;

	/**
	 * Encoding for depth packing. Default is [BasicDepthPacking](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures).
	 */
	@Input() public depthPacking: string = null;

	/**
	 * Encoding for depth packing. Default is [BasicDepthPacking](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Textures).
	 */
	@Input() public farDistance: number = null;

	/**
	 * The near value of the point light's internal shadow camera.
	 */
	@Input() public nearDistance: number = null;

	/**
	 * The position of the point light in world space.
	 */
	@Input() public referencePositionX: number = null;

	/**
	 * The position of the point light in world space.
	 */
	@Input() public referencePositionY: number = null;

	/**
	 * The position of the point light in world space.
	 */
	@Input() public referencePositionZ: number = null;

	/**
	 * Represents the intensity of the clear coat layer, from *0.0* to *1.0*.
	 * Use clear coat related properties to enable multilayer materials that have a thin translucent layer over the base layer. Default is *0.0*.
	 */
	@Input() public clearcoat: number = null;

	/**
	 * Roughness of the clear coat layer, from *0.0* to *1.0*. Default is *0.0*.
	 */
	@Input() public clearcoatRoughness: number = null;

	/**
	 * How much [MeshPhysicalMaterial.clearcoatNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/MeshPhysicalMaterial.clearcoatNormalMap) affects the clear coat layer, from *(0,0)* to *(1,1)*. Default is *(1,1)*.
	 */
	@Input() public clearcoatNormalScale: number = null;

	/**
	 * How much [MeshPhysicalMaterial.clearcoatNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/MeshPhysicalMaterial.clearcoatNormalMap) affects the clear coat layer, from *(0,0)* to *(1,1)*. Default is *(1,1)*.
	 */
	@Input() public clearcoatNormalScaleX: number = null;

	/**
	 * How much [MeshPhysicalMaterial.clearcoatNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/MeshPhysicalMaterial.clearcoatNormalMap) affects the clear coat layer, from *(0,0)* to *(1,1)*. Default is *(1,1)*.
	 */
	@Input() public clearcoatNormalScaleY: number = null;

	/**
	 * If a color is assigned to this property, the material will use a special sheen BRDF intended for rendering cloth materials such as velvet.
	 * The sheen color provides the ability to create two-tone specular materials. *null* by default.
	 */
	@Input() public sheen: ThreeColor = null;

	/**
	 * The sheenMultiply of material component
	 */
	@Input() public sheenMultiply: number = null;

	/**
	 * Degree of transmission (or optical transparency), from *0.0* to *1.0*. Default is *0.0*.
	 * Thin, transparent or semitransparent, plastic or glass materials remain largely reflective even if they are fully transmissive.
	 * The transmission property can be used to model these materials.
	 * When transmission is non-zero, [opacity](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/Material.opacity) should be set to *1*.
	 */
	@Input() public transmission: number = null;

	/**
	 * How rough the material appears. 0.0 means a smooth mirror reflection, 1.0 means fully diffuse. Default is 1.0.
	 * If roughnessMap is also provided, both values are multiplied.
	 */
	@Input() public roughness: number = null;

	/**
	 * How much the material is like a metal. Non-metallic materials such as wood or stone use 0.0, metallic use 1.0, with nothing (usually) in between. Default is 0.0. A value between 0.0 and 1.0 could be used for a rusty metal look. If metalnessMap is also provided, both values are multiplied.
	 */
	@Input() public metalness: number = null;

	/**
	 * How much the material is like a metal. Non-metallic materials such as wood or stone use 0.0, metallic use 1.0, with nothing (usually) in between. Default is 0.0. A value between 0.0 and 1.0 could be used for a rusty metal look. If metalnessMap is also provided, both values are multiplied.
	 */
	@Input() public thickness: number = null;

	/**
	 * Scales the effect of the environment map by multiplying its color.
	 */
	@Input() public envMapIntensity: number = null;

	/**
	 * Defines whether precomputed vertex tangents, which must be provided in a vec4 "tangent" attribute, are used. When disabled, tangents are derived automatically. Using precomputed tangents will give more accurate normal map details in some cases, such as with mirrored UVs. Default is false.
	 *
	 */
	@Input() public vertexTangents: boolean = null;

	/**
	 * The rotation of the sprite in radians. Default is 0.
	 */
	@Input() public rotation: number = null;

	/**
	 * Sets the size of the points. Default is 1.0.
	 * Will be capped if it exceeds the hardware dependent parameter [gl.ALIASED_POINT_SIZE_RANGE](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter).
	 */
	@Input() public size: number = null;

	/**
	 * Specify whether points' size is attenuated by the camera depth. (Perspective camera only.) Default is true.
	 */
	@Input() public sizeAttenuation: boolean = null;

	/**
	 * The dashed of material component
	 */
	@Input() public dashed: boolean = null;

	/**
	 * The dashScale of material component
	 */
	@Input() public dashScale: number = null;

	/**
	 * The dashOffset of material component
	 */
	@Input() public dashOffset: number = null;

	/**
	 * The resolutionX of material component
	 */
	@Input() public resolutionX: number = null;

	/**
	 * The resolutionY of material component
	 */
	@Input() public resolutionY: number = null;

	/**
	 * Defines the GLSL version of custom shader code. Only relevant for WebGL 2 in order to define whether to specify GLSL 3.0 or not. Valid values are *THREE.GLSL1* or *THREE.GLSL3*. Default is *null*.
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public glslVersion: string = null;

	/**
	 * 	An object with the following properties:
	 * ```ts
	 * this.extensions = {
	 * 	derivatives: false, // set to use derivatives
	 * 	fragDepth: false, // set to use fragment depth values
	 * 	drawBuffers: false, // set to use draw buffers
	 * 	shaderTextureLOD: false // set to use shader texture LOD
	 * };
	 * ```
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public extensions: string = null;

	/**
	 * The environment map. Default is null.
	 */
	@Input() public envMap: ThreeTexture = null;

	/**
	 * The color map. Default is  null.
	 */
	@Input() public map: ThreeTexture = null;

	/**
	 * The matcap map. Default is null.
	 */
	@Input() public matcap: ThreeTexture = null;

	/**
	 * Specular map used by the material. Default is null.
	 */
	@Input() public specularMap: ThreeTexture = null;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 */
	@Input() public alphaMap: ThreeTexture = null;

	/**
	 * The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights.
	 * Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored.
	 */
	@Input() public bumpMap: ThreeTexture = null;

	/**
	 * The texture to create a normal map. The RGB values affect the surface normal for each pixel fragment and change the way the color is lit. Normal maps do not change the actual shape of the surface, only the lighting.
	 * In case the material has a normal map authored using the left handed convention, the y component of normalScale should be negated to compensate for the different handedness.
	 */
	@Input() public normalMap: ThreeTexture = null;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows, block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 */
	@Input() public displacementMap: ThreeTexture = null;

	/**
	 * Can be used to enable independent normals for the clear coat layer. Default is *null*.
	 */
	@Input() public clearcoatNormalMap: ThreeTexture = null;

	/**
	 * The green channel of this texture is used to alter the roughness of the material.
	 */
	@Input() public roughnessMap: ThreeTexture = null;

	/**
	 * The light map. Default is null. The lightMap requires a second set of UVs.
	 */
	@Input() public lightMap: ThreeTexture = null;

	/**
	 * The red channel of this texture is used as the ambient occlusion map. Default is null.
	 * The aoMap requires a second set of UVs.
	 */
	@Input() public aoMap: ThreeTexture = null;

	/**
	 * The red channel of this texture is used as the ambient occlusion map. Default is null.
	 * The aoMap requires a second set of UVs.
	 */
	@Input() public diffuseMap: ThreeTexture = null;

	/**
	 * The environmentType of material component
	 */
	@Input() public environmentType: string = 'mirror';

	/**
	 * The reflector of material component
	 */
	@Input() public reflector: any = null;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 */
	@Input() public flatShading: boolean = null;

	/**
	 * Content children of material component
	 */
	@ContentChildren(AbstractTextureComponent)
	protected textureList: QueryList<AbstractTextureComponent>;

	/**
	 * Content children of material component
	 */
	@ContentChildren(ShaderComponent)
	private shaderList: QueryList<ShaderComponent>;

	/**
	 * Creates an instance of material component.
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
		super.ngOnInit('material');
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
		if (changes && this.material) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(this.shaderList, 'shaderList', 'shader');
		this.subscribeListQueryChange(this.textureList, 'textureList', 'texture');
		super.ngAfterContentInit();
	}

	/**
	 * Gets emissive
	 * @param [def]
	 * @returns emissive
	 */
	private getEmissive(def?: ThreeColor): THREE_CORE.IColor {
		return ThreeUtil.getColorMultiplySafe(
			this.emissive,
			def,
			this.emissiveMultiply
		);
	}

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 *
	 * @param def
	 * @returns
	 */
	private getNormalScale(def?: THREE_CORE.IVector2): THREE_CORE.IVector2 {
		return ThreeUtil.getVector2Safe(
			ThreeUtil.getTypeSafe(this.normalScaleX, this.normalScale, 1),
			ThreeUtil.getTypeSafe(this.normalScaleY, this.normalScale, 1),
			def
		);
	}

	/**
	 * Gets reference position
	 * @param [def]
	 * @returns reference position
	 */
	private getReferencePosition(def?: THREE_CORE.IVector3): THREE_CORE.IVector3 {
		return ThreeUtil.getVector3Safe(
			this.referencePositionX,
			this.referencePositionY,
			this.referencePositionZ,
			def
		);
	}

	/**
	 * Gets clearcoat normal scale
	 * @param [def]
	 * @returns clearcoat normal scale
	 */
	private getClearcoatNormalScale(
		def?: THREE_CORE.IVector2
	): THREE_CORE.IVector2 {
		return ThreeUtil.getVector2Safe(
			ThreeUtil.getTypeSafe(
				this.clearcoatNormalScaleX,
				this.clearcoatNormalScale
			),
			ThreeUtil.getTypeSafe(
				this.clearcoatNormalScaleY,
				this.clearcoatNormalScale
			),
			def
		);
	}

	/**
	 * [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Color) of the material, by default set to white (0xffffff).
	 *
	 * @param def
	 * @returns
	 */
	private getColor(def?: ThreeColor): THREE_CORE.IColor {
		return ThreeUtil.getColorMultiplySafe(this.color, def, this.colorMultiply);
	}

	/**
	 * [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Color) of the material, by default set to white (0xffffff).
	 *
	 * @param def
	 * @returns
	 */
	private getDiffuseColor(def?: ThreeColor): THREE_CORE.IColor {
		return ThreeUtil.getColorMultiplySafe(
			this.diffuseColor,
			def,
			this.diffuseColorMultiply
		);
	}

	/**
	 * Gets sheen
	 * @param [def]
	 * @returns sheen
	 */
	private getSheen(def?: ThreeColor): THREE_CORE.IColor {
		return ThreeUtil.getColorMultiplySafe(this.sheen, def, this.sheenMultiply);
	}

	/**
	 * Gets specular
	 * @param [def]
	 * @returns specular
	 */
	private getSpecular(def?: ThreeColor): THREE_CORE.IColor {
		return ThreeUtil.getColorMultiplySafe(
			this.specular,
			def,
			this.specularMultiply
		);
	}

	/**
	 * The getter Color Node
	 *
	 * @param color
	 * @returns
	 */
	private getColorNode(color?: THREE_CORE.IColor): any {
		return new THREE_MAT.NODES.ColorNode(color);
	}

	/**
	 * The getter Float Node
	 *
	 * @param value
	 * @returns
	 */
	private getFloatNode(value?: number): THREE_MAT.NODES.FloatNode {
		return new THREE_MAT.NODES.FloatNode(value);
	}

	/**
	 * The getter Int Node
	 *
	 * @param value
	 * @returns
	 */
	private getIntNode(value?: number): THREE_MAT.NODES.IntNode {
		return new THREE_MAT.NODES.IntNode(value);
	}

	/**
	 * The getter Bool Node
	 *
	 * @param value
	 * @returns
	 */
	private getBoolNode(value?: boolean): THREE_MAT.NODES.BoolNode {
		return new THREE_MAT.NODES.BoolNode(value);
	}

	/**
	 * The getter Matrix3 Node
	 *
	 * @param matrix
	 * @returns
	 */
	private getMatrix3Node(
		matrix?: THREE_CORE.IMatrix3
	): THREE_MAT.NODES.Matrix3Node {
		return new THREE_MAT.NODES.Matrix3Node(matrix);
	}

	/**
	 * The getter Matrix4 Node
	 *
	 * @param matrix
	 * @returns
	 */
	private getMatrix4Node(
		matrix?: THREE_CORE.IMatrix4
	): THREE_MAT.NODES.Matrix4Node {
		return new THREE_MAT.NODES.Matrix4Node(matrix);
	}

	/**
	 * The getter Property Node
	 *
	 * @param object
	 * @param property
	 * @param type
	 * @returns
	 */
	private getPropertyNode(
		object: object,
		property: string,
		type: string
	): THREE_MAT.NODES.PropertyNode {
		return new THREE_MAT.NODES.PropertyNode(object, property, type);
	}

	/**
	 * The getter Screen Node
	 *
	 * @param uv
	 * @returns
	 */
	private getScreenNode(
		uv?: THREE_MAT.NODES.UVNode
	): THREE_MAT.NODES.ScreenNode {
		return new THREE_MAT.NODES.ScreenNode(uv);
	}

	/**
	 * The getter Texture Node
	 *
	 * @param value
	 * @param uv
	 * @param bias
	 * @param project
	 * @returns
	 */
	private getTextureNode(
		value: THREE_CORE.ITexture,
		uv?: THREE_MAT.NODES.UVNode,
		bias?: THREE_MAT.NODES.Node,
		project?: boolean
	): THREE_MAT.NODES.TextureNode {
		return new THREE_MAT.NODES.TextureNode(value, uv, bias, project);
	}

	/**
	 * The getter CubeTexture Node
	 *
	 * @param value
	 * @param uv
	 * @param bias
	 * @returns
	 */
	private getCubeTextureNode(
		value: THREE_CORE.ICubeTexture,
		uv?: THREE_MAT.NODES.UVNode,
		bias?: THREE_MAT.NODES.Node
	): THREE_MAT.NODES.CubeTextureNode {
		return new THREE_MAT.NODES.CubeTextureNode(value, uv, bias);
	}

	/**
	 * The getter Reflector Node
	 *
	 * @param mirror
	 * @returns
	 */
	private getReflectorNode(
		mirror: ReflectorRTT
	): THREE_MAT.NODES.ReflectorNode {
		return new THREE_MAT.NODES.ReflectorNode(mirror);
	}

	/**
	 * The getter Switch Node
	 *
	 * @param node
	 * @param components
	 * @returns
	 */
	private getSwitchNode(
		node: THREE_MAT.NODES.Node,
		components?: string
	): THREE_MAT.NODES.SwitchNode {
		return new THREE_MAT.NODES.SwitchNode(node, components);
	}

	/**
	 * The getter ReflectorRTT
	 *
	 * @param geometry
	 * @param options
	 * @returns
	 */
	private getReflectorRTT(
		geometry: THREE_CORE.IBufferGeometry,
		options?: ReflectorOptions
	): ReflectorRTT {
		return new ReflectorRTT(geometry, options);
	}

	/**
	 * The getter NodeFrame
	 *
	 * @param time
	 * @returns
	 */
	private getNodeFrame(time: number = 0): THREE_MAT.NODES.NodeFrame {
		return new THREE_MAT.NODES.NodeFrame(time);
	}

	/**
	 * The getter CondNode Node
	 *
	 * @param a
	 * @param b
	 * @param op
	 * @param ifNode
	 * @param elseNode
	 * @returns
	 */
	private getCondNode(
		a: THREE_MAT.NODES.Node,
		b: THREE_MAT.NODES.Node,
		op: string,
		ifNode?: THREE_MAT.NODES.Node,
		elseNode?: THREE_MAT.NODES.Node
	): THREE_MAT.NODES.CondNode {
		return new THREE_MAT.NODES.CondNode(a, b, op, ifNode, elseNode);
	}

	/**
	 * The getter Math Node
	 *
	 * @param a
	 * @param bOrMethod
	 * @param cOrMethod
	 * @param method
	 * @returns
	 */
	private getMathNode(
		a: THREE_MAT.NODES.Node,
		bOrMethod: THREE_MAT.NODES.Node | string,
		cOrMethod?: THREE_MAT.NODES.Node | string,
		method?: string
	): THREE_MAT.NODES.MathNode {
		return new THREE_MAT.NODES.MathNode(a, bOrMethod, cOrMethod, method);
	}

	/**
	 * The getter Operator Node
	 *
	 * @param a
	 * @param b
	 * @param op
	 * @returns
	 */
	private getOperatorNode(
		a: THREE_MAT.NODES.Node,
		b: THREE_MAT.NODES.Node,
		op: string
	): THREE_MAT.NODES.OperatorNode {
		return new THREE_MAT.NODES.OperatorNode(a, b, op);
	}

	/**
	 * The getter Timer Node
	 *
	 * @param scale
	 * @param scope
	 * @param timeScale
	 * @returns
	 */
	private getTimerNode(
		scale?: number,
		scope?: string,
		timeScale?: boolean
	): THREE_MAT.NODES.TimerNode {
		return new THREE_MAT.NODES.TimerNode(scale, scope, timeScale);
	}

	/**
	 * The getter Function Node
	 *
	 * @param scale
	 * @param scope
	 * @param timeScale
	 * @returns
	 */
	private getFunctionNode(
		src: string,
		includes?: object[],
		extensions?: object,
		keywords?: object,
		type?: string
	): THREE_MAT.NODES.FunctionNode {
		return new THREE_MAT.NODES.FunctionNode(
			src,
			includes,
			extensions,
			keywords,
			type
		);
	}

	/**
	 * The getter FunctionCallNode Node
	 *
	 * @param func
	 * @param inputs
	 * @returns
	 */
	private getFunctionCallNode(
		func: THREE_MAT.NODES.FunctionNode,
		inputs?: THREE_MAT.NODES.Node[]
	): THREE_MAT.NODES.FunctionCallNode {
		return new THREE_MAT.NODES.FunctionCallNode(func, inputs);
	}

	/**
	 * The getter PositionNode Node
	 *
	 * @param scope
	 * @returns
	 */
	private getPositionNode(scope?: string): THREE_MAT.NODES.PositionNode {
		return new THREE_MAT.NODES.PositionNode(scope);
	}

	/**
	 * The getter UVNode Node
	 *
	 * @param index
	 * @returns
	 */
	private getUVNode(index?: number): THREE_MAT.NODES.UVNode {
		return new THREE_MAT.NODES.UVNode(index);
	}

	/**
	 * The getter RTTN Node
	 *
	 * @param width
	 * @param height
	 * @param input
	 * @param options
	 * @returns
	 */
	private getRTTNode(
		width: number,
		height: number,
		input: THREE_MAT.NODES.TextureNode,
		options?: THREE_MAT.NODES.RTTNodeOptions
	): THREE_MAT.NODES.RTTNode {
		return new THREE_MAT.NODES.RTTNode(width, height, input, options);
	}

	/**
	 * The getter Vector2 Node
	 *
	 * @param x
	 * @param y
	 * @returns
	 */
	private getVector2Node(
		x: number | THREE.Vector2,
		y?: number
	): THREE_MAT.NODES.Vector2Node {
		return new THREE_MAT.NODES.Vector2Node(x, y);
	}

	/**
	 * The getter Vector3 Node
	 *
	 * @param x
	 * @param y
	 * @param z
	 * @returns
	 */
	private getVector3Node(
		x: number | THREE.Vector3 | THREE.Color,
		y?: number,
		z?: number
	): THREE_MAT.NODES.Vector3Node {
		if (x instanceof THREE.Color) {
			return new THREE_MAT.NODES.Vector3Node(x.r, x.g, x.b);
		} else {
			return new THREE_MAT.NODES.Vector3Node(x, y, z);
		}
	}

	/**
	 * The getter Vector4 Node
	 *
	 * @param x
	 * @param y
	 * @returns
	 */
	private getVector4Node(
		x: number,
		y: number,
		z: number,
		w: number
	): THREE_MAT.NODES.Vector4Node {
		return new THREE_MAT.NODES.Vector4Node(x, y, z, w);
	}

	/**
	 * Blur mirror of material component
	 */
	private _blurMirror: THREE_MAT.NODES.BlurNode = null;

	/**
	 * Gets environment
	 * @returns environment
	 */
	private getEnvironment(): THREE_MAT.NODES.Node {
		this._blurMirror = null;
		this.unSubscribeRefer('mirrorSize');
		switch (this.environmentType.toLowerCase()) {
			case 'mirror':
				const size = ThreeUtil.getRendererSize()
					.clone()
					.multiplyScalar(window.devicePixelRatio);
				const groundMirror: ReflectorRTT = ThreeUtil.getMesh(
					this.reflector
				) as ReflectorRTT;
				const mirror: any = this.getReflectorNode(groundMirror);
				const normalXYFlip = this.getMathNode(
					this.getSwitchNode(
						this.getTextureNode(this.getTexture('normalMap')),
						'xy'
					),
					THREE_MAT.NODES.MathNode.INVERT
				);
				const offsetNormal = this.getOperatorNode(
					normalXYFlip,
					this.getFloatNode(0.5),
					THREE_MAT.NODES.OperatorNode.SUB
				);
				mirror.offset = this.getOperatorNode(
					offsetNormal, // normal
					this.getFloatNode(6), // scale
					THREE_MAT.NODES.OperatorNode.MUL
				);
				const blurMirror = new THREE_MAT.NODES.BlurNode(mirror);
				blurMirror.size = size;
				const blurMirrorUv: any = new THREE_MAT.NODES.ExpressionNode(
					'projCoord.xyz / projCoord.q',
					'vec3'
				);
				blurMirrorUv.keywords['projCoord'] = this.getOperatorNode(
					mirror.offset,
					mirror.uv,
					THREE_MAT.NODES.OperatorNode.ADD
				);
				blurMirror.uv = blurMirrorUv;
				blurMirror.radius = this.getVector2Node(0, 0); // .x = blurMirror.radius.y = 0;
				this.subscribeRefer(
					'mirrorSize',
					ThreeUtil.getSizeSubscribe().subscribe((v2) => {
						if (this._blurMirror !== null) {
							const size = v2.clone().multiplyScalar(window.devicePixelRatio);
							this._blurMirror.size.set(size.x, size.y);
							this._blurMirror.updateFrame(undefined);
						}
					})
				);
				this._blurMirror = blurMirror;
				return this._blurMirror;
		}
		return undefined;
	}

	/**
	 * Gets environment alpha
	 * @returns environment alpha
	 */
	private getEnvironmentAlpha(): THREE_MAT.NODES.Node {
		switch (this.environmentType.toLowerCase()) {
			case 'mirror':
				return this.getSwitchNode(
					this.getTextureNode(this.getTexture('diffuseMap')),
					'w'
				);
		}
		return undefined;
	}

	/**
	 * Gets extensions
	 * @param extensions
	 * @returns extensions
	 */
	private getExtensions(extensions: {
		derivatives?: boolean;
		fragDepth?: boolean;
		drawBuffers?: boolean;
		shaderTextureLOD?: boolean;
	}): any {
		const extensionsList = ThreeUtil.getTypeSafe(this.extensions, '').split(
			','
		);
		extensionsList.forEach((txt) => {
			switch (txt.toLowerCase()) {
				case 'derivatives':
					extensions.derivatives = true;
					break;
				case 'frag':
				case 'depth':
				case 'fragdepth':
					extensions.fragDepth = true;
					break;
				case 'buffer':
				case 'buffers':
				case 'drawbuffers':
					extensions.drawBuffers = true;
					break;
				case 'lod':
				case 'texture':
				case 'texturelod':
				case 'shadertexturelod':
					extensions.shaderTextureLOD = true;
					break;
			}
		});
		return extensions;
	}

	/**
	 * Gets uniforms
	 * @param [def]
	 * @returns uniforms
	 */
	private getUniforms(
		def?: { [uniform: string]: THREE_CORE.IUniform },
		targetUniforms?: {
			[key: string]: THREE_CORE.IUniform;
		}
	): {
		[uniform: string]: THREE_CORE.IUniform;
	} {
		const uniforms: {
			[key: string]: THREE_CORE.IUniform;
		} = ThreeUtil.getTypeSafe(this.uniforms, def);
		const resultUniforms = targetUniforms
			? targetUniforms
			: ShaderUtils.getUniforms(this.shader);
		Object.entries(uniforms).forEach(([key, value]) => {
			const anyValue: any = value;
			if (
				ThreeUtil.isNotNull(value) &&
				ThreeUtil.isNotNull(anyValue['type']) &&
				ThreeUtil.isNotNull(anyValue['value'])
			) {
				const valueType: string = anyValue['type'];
				const valueValue: any = anyValue['value'];
				switch (valueType.toLowerCase()) {
					case 'projectionmatrixinverse':
					case 'projectionmatrix':
					case 'matrixworldinverse':
					case 'matrixworld':
					case 'matrix':
						if (ThreeUtil.isNotNull(valueValue.getObject3d)) {
							this.unSubscribeRefer('unforms_' + key);
							const object3d: THREE_CORE.IObject3D = valueValue.getObject3d();
							resultUniforms[key] = {
								value: ThreeUtil.getMatrix4Safe(object3d, valueType),
							};
							if (ThreeUtil.isNotNull(valueValue.getSubscribe)) {
								this.subscribeRefer(
									'unforms_' + key,
									valueValue.getSubscribe().subscribe((e: any) => {
										resultUniforms[key].value = ThreeUtil.getMatrix4Safe(
											e,
											valueType
										);
									})
								);
							}
						} else {
							resultUniforms[key] = {
								value: new THREE.Matrix4(),
							};
						}
						break;
					case 'vector2':
					case 'v2':
						if (ThreeUtil.isNotNull(valueValue.getSize)) {
							this.unSubscribeRefer('unforms_' + key);
							resultUniforms[key] = {
								value: valueValue.getSize(),
							};
							if (ThreeUtil.isNotNull(valueValue.sizeSubscribe)) {
								this.subscribeRefer(
									'unforms_' + key,
									valueValue.sizeSubscribe().subscribe((e: any) => {
										resultUniforms[key].value = e;
									})
								);
							}
						} else {
							resultUniforms[key] = {
								value: ThreeUtil.getVector2Safe(
									valueValue[0],
									valueValue[1],
									new THREE.Vector2()
								),
							};
						}
						break;
					case 'vector3':
					case 'vector':
					case 'v3':
						resultUniforms[key] = {
							value: ThreeUtil.getVector3Safe(
								valueValue[0],
								valueValue[1],
								valueValue[2],
								new THREE.Vector3()
							),
						};
						break;
					case 'color':
						resultUniforms[key] = {
							value: ThreeUtil.getColorSafe(valueValue, 0xffffff),
						};
						break;
					case 'image':
					case 'texture2d':
					case 'texture3d':
					case 'texture':
					case 'datatexture2d':
					case 'datatexture3d':
					case 'datatexture':
					case 'video':
					case 'videotexture':
						resultUniforms[key] = {
							value: AbstractTextureComponent.getTextureImageOption(
								valueValue,
								anyValue['options'],
								valueType.toLowerCase()
							),
						};
						break;
					case 'imagelist':
					case 'texturelist':
					case 'imagearray':
					case 'texturearray':
						const textureList: THREE_CORE.ITexture[] = [];
						const texturePathList: string[] = [];
						const textureOption = anyValue['options'];
						if (typeof valueValue === 'string') {
							valueValue.split(',').forEach((path) => {
								if (path !== '' && path.length > 3) {
									texturePathList.push(path);
								}
							});
						} else if (ThreeUtil.isNotNull(valueValue.forEach)) {
							valueValue.forEach((path: any) => {
								if (path !== '' && path.length > 3) {
									texturePathList.push(path);
								}
							});
						}
						texturePathList.forEach((texturePath) => {
							textureList.push(
								AbstractTextureComponent.getTextureImageOption(
									texturePath,
									textureOption,
									'texture'
								)
							);
						});
						resultUniforms[key] = {
							value: textureList,
						};
						break;
					case 'int':
					case 'integer':
						resultUniforms[key] = { value: parseInt(valueValue) };
						break;
					case 'str':
					case 'string':
						resultUniforms[key] = { value: valueValue.toString() };
						break;
					case 'double':
					case 'float':
					case 'number':
						resultUniforms[key] = { value: parseFloat(valueValue) };
						break;
					default:
						resultUniforms[key] = { value: valueValue };
						break;
				}
			} else if (ThreeUtil.isNotNull(value) && value['value'] !== undefined) {
				if (value['value'] instanceof AbstractTextureComponent) {
					resultUniforms[key] = {
						value: value['value'].getTexture(),
					};
				} else {
					resultUniforms[key] = value;
				}
			} else {
				if (value instanceof AbstractTextureComponent) {
					resultUniforms[key] = { value: value.getTexture() };
				} else {
					resultUniforms[key] = { value: value };
				}
			}
		});
		if (ThreeUtil.isNotNull(this.textureList)) {
			this.textureList.forEach((texture) => {
				const textureType = (texture.type + '..').split('.');
				switch (textureType[0].toLowerCase()) {
					case 'uniforms':
						const uniformKey = textureType[1];
						const uniformSeqn = parseInt(textureType[2] || '-1');
						if (uniformSeqn > -1) {
							if (!Array.isArray(resultUniforms[uniformKey].value)) {
								resultUniforms[uniformKey].value = [];
							}
							resultUniforms[uniformKey].value[uniformSeqn] =
								texture.getTexture();
						} else {
							resultUniforms[uniformKey].value = texture.getTexture();
						}
						break;
				}
			});
		}
		Object.entries(resultUniforms).forEach(([key, value]) => {
			uniforms[key] = value;
		});

		if (this.debug) {
			this.consoleLog('material-uniforms', resultUniforms);
		}
		return resultUniforms;
	}

	/**
	 * Gets shader material parameters
	 *
	 * @returns shader material parameters
	 */
	private getShaderMaterialParameters(): THREE.ShaderMaterialParameters {
		return this.getMaterialParameters({
			linewidth: ThreeUtil.getTypeSafe(this.linewidth),
			wireframe: ThreeUtil.getTypeSafe(this.wireframe),
			wireframeLinewidth: ThreeUtil.getTypeSafe(this.wireframeLinewidth),
			lights: ThreeUtil.getTypeSafe(this.lights),
			clipping: ThreeUtil.getTypeSafe(this.clipping),
			// skinning: this.getSkinning(),
			// morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
			// morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
		});
	}

	/**
	 * Gets shader material update
	 * @param shaderMaterial
	 * @returns shader material update
	 */
	private getShaderMaterialUpdate(
		shaderMaterial: THREE_CORE.IShaderMaterial
	): THREE_CORE.IShaderMaterial {
		this.getUniforms({}, shaderMaterial.uniforms);
		if (ThreeUtil.isNotNull(this.glslVersion)) {
			shaderMaterial.glslVersion = ThreeUtil.getGlslVersionSafe(this.glslVersion);
		}
		if (ThreeUtil.isNotNull(this.extensions)) {
			this.getExtensions(shaderMaterial.extensions);
		}
		this.setAssignUniforms(shaderMaterial.uniforms);
		return shaderMaterial;
	}

	/**
	 * Sets assign uniforms
	 * @param resultUniforms
	 */
	private setAssignUniforms(resultUniforms: {
		[key: string]: THREE_CORE.IUniform;
	}) {
		if (ThreeUtil.isNotNull(this.uniforms)) {
			Object.entries(resultUniforms).forEach(([key, value]) => {
				this.uniforms[key] = value;
			});
		}
	}

	/**
	 * Gets resolution
	 * @param [def]
	 * @returns resolution
	 */
	private getResolution(def?: THREE_CORE.IVector2): THREE_CORE.IVector2 {
		return ThreeUtil.getVector2Safe(this.resolutionX, this.resolutionY, def);
	}

	/**
	 * Gets shader
	 * @param type
	 * @returns
	 */
	private getShader(type: string) {
		if (type === 'x-shader/x-vertex') {
			if (
				ThreeUtil.isNotNull(this.vertexShader) ||
				ThreeUtil.isNotNull(this.shader)
			) {
				return ShaderUtils.getVertexShader(
					ThreeUtil.getTypeSafe(this.vertexShader, this.shader)
				);
			}
		} else if (type === 'x-shader/x-fragment') {
			if (
				ThreeUtil.isNotNull(this.fragmentShader) ||
				ThreeUtil.isNotNull(this.shader)
			) {
				return ShaderUtils.getFragmentShader(
					ThreeUtil.getTypeSafe(this.fragmentShader, this.shader)
				);
			}
		}
		if (this.shaderList !== null && this.shaderList.length > 0) {
			const foundShader = this.shaderList.find((shader) => {
				return shader.type.toLowerCase() === type;
			});
			if (foundShader !== null && foundShader !== undefined) {
				return foundShader.getShader();
			}
		}
		return undefined;
	}

	/**
	 * Gets texture
	 * @param type
	 * @returns texture
	 */
	protected getTexture(type: string): THREE_CORE.ITexture {
		let texture: THREE_CORE.ITexture = null;
		switch (type.toLowerCase()) {
			case 'envmap':
				if (ThreeUtil.isNotNull(this.envMap)) {
					texture = this.getTextureOption(this.envMap, 'envMap');
				}
				break;
			case 'diffusemap':
				if (ThreeUtil.isNotNull(this.diffuseMap)) {
					texture = this.getTextureOption(this.diffuseMap, 'diffuseMap');
				}
				break;
			case 'map':
				if (ThreeUtil.isNotNull(this.map)) {
					texture = this.getTextureOption(this.map, 'map');
				}
				break;
			case 'specularmap':
				if (ThreeUtil.isNotNull(this.specularMap)) {
					texture = this.getTextureOption(this.specularMap, 'specularMap');
				}
				break;
			case 'alphamap':
				if (ThreeUtil.isNotNull(this.alphaMap)) {
					texture = this.getTextureOption(this.alphaMap, 'alphaMap');
				}
				break;
			case 'bumpmap':
				if (ThreeUtil.isNotNull(this.bumpMap)) {
					texture = this.getTextureOption(this.bumpMap, 'bumpMap');
				}
				break;
			case 'normalmap':
				if (ThreeUtil.isNotNull(this.normalMap)) {
					texture = this.getTextureOption(this.normalMap, 'normalMap');
				}
				break;
			case 'aomap':
				if (ThreeUtil.isNotNull(this.aoMap)) {
					texture = this.getTextureOption(this.aoMap, 'aoMap');
				}
				break;
			case 'displacementmap':
				if (ThreeUtil.isNotNull(this.displacementMap)) {
					texture = this.getTextureOption(
						this.displacementMap,
						'displacementMap'
					);
				}
				break;
			case 'clearcoatnormalmap':
				if (ThreeUtil.isNotNull(this.clearcoatNormalMap)) {
					texture = this.getTextureOption(
						this.clearcoatNormalMap,
						'clearcoatNormalMap'
					);
				}
				break;
			case 'roughnessmap':
				if (ThreeUtil.isNotNull(this.roughnessMap)) {
					texture = this.getTextureOption(this.roughnessMap, 'roughnessMap');
				}
				break;
			case 'lightmap':
				if (ThreeUtil.isNotNull(this.lightMap)) {
					texture = this.getTextureOption(this.lightMap, 'lightMap');
				}
				break;
		}
		if (
			ThreeUtil.isNull(texture) &&
			ThreeUtil.isNotNull(this.textureList) &&
			this.textureList.length > 0
		) {
			const foundTexture = this.textureList.find((texture) => {
				return texture.isTexture(type);
			});
			if (ThreeUtil.isNotNull(foundTexture)) {
				texture = foundTexture.getTexture();
			}
		}
		if (ThreeUtil.isNotNull(texture)) {
			if (texture instanceof THREE.VideoTexture) {
				if (texture.image.readyState === 0) {
					return undefined;
				}
			}
			return texture;
		}
		return undefined;
	}

	/**
	 * Synks texture
	 * @param texture
	 * @param textureType
	 */
	private synkTexture(
		texture: any,
		textureType: string,
		textureList: {
			type: string;
			component: AbstractTextureComponent;
		}[]
	) {
		if (ThreeUtil.isNotNull(texture) && this.material !== null) {
			if (texture instanceof AbstractTextureComponent) {
				textureList.push({
					type: textureType,
					component: texture,
				});
			} else {
				const foundTexture = ThreeUtil.getTexture(texture, textureType, false);
				const anyMaterial: any = this.material;
				if (anyMaterial[textureType] !== undefined) {
					if (ThreeUtil.isNotNull(foundTexture)) {
						if (this.material instanceof THREE_MAT.NODES.NodeMaterial) {
							if (
								anyMaterial[textureType] instanceof THREE_MAT.NODES.TextureNode
							) {
								anyMaterial[textureType].value = foundTexture;
							} else {
								anyMaterial[textureType] = this.getTextureNode(foundTexture);
							}
						} else {
							anyMaterial[textureType] = foundTexture;
						}
					} else if (anyMaterial[textureType] !== undefined) {
						if (this.material instanceof THREE_MAT.NODES.NodeMaterial) {
							if (
								anyMaterial[textureType] instanceof THREE_MAT.NODES.TextureNode
							) {
								anyMaterial[textureType].value = null;
							}
						} else {
							anyMaterial[textureType] = null;
						}
					}
				}
			}
		}
	}

	private _cachedTextureList: AbstractTextureComponent[] = [];
	private _cachedUniformTextureList: AbstractTextureComponent[] = [];

	/**
	 * Apply changes to material
	 *
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]): void {
		if (this.material !== null) {
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getMaterial();
				return;
			}
			if (
				!ThreeUtil.isOnlyIndexOf(
					changes,
					[
						'color',
						'texture',
						'map',
						'envmap',
						'matcap',
						'specularmap',
						'alphamap',
						'bumpmap',
						'normalmap',
						'aomap',
						'displacementmap',
						'lights',
						'clipping',
						'wireframe',
						'specular',
						'specularmultiply',
						'shininess',
						'lightmapintensity',
						'aomapintensity',
						'emissive',
						'emissivemultiply',
						'emissiveintensity',
						'bumpscale',
						'normalmaptype',
						'normalscale',
						'normalscalex',
						'normalscaley',
						'displacementscale',
						'displacementbias',
						'combine',
						'reflectivity',
						'refractionratio',
						'wireframelinewidth',
						'wireframelinecap',
						'wireframelinejoin',
						'morphtargets',
						'morphnormals',
						'linewidth',
						'linecap',
						'linejoin',
						'scale',
						'dashsize',
						'gapsize',
						'depthpacking',
						'fardistance',
						'neardistance',
						'referencepositionx',
						'referencepositiony',
						'referencepositionz',
						'clearcoat',
						'clearcoatroughness',
						'clearcoatnormalscale',
						'clearcoatnormalscalex',
						'clearcoatnormalscaley',
						'sheen',
						'sheenmultiply',
						'transmission',
						'roughness',
						'metalness',
						'envmapintensity',
						'vertextangents',
						'rotation',
						'size',
						'sizeattenuation',
						'dashed',
						'dashscale',
						'dashoffset',
						'resolutionx',
						'resolutiony',
						'extensions',
					],
					this.MATERIAL_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, ['texture']);
			}
			if (
				ThreeUtil.isIndexOf(changes, [
					'map',
					'envmap',
					'matcap',
					'specularmap',
					'alphamap',
					'bumpmap',
					'normalmap',
					'aomap',
					'displacementmap',
				])
			) {
				changes = ThreeUtil.pushUniq(changes, ['texture']);
			}
			if (ThreeUtil.isIndexOf(changes, 'colormultiply')) {
				changes = ThreeUtil.pushUniq(changes, ['color']);
			}
			if (ThreeUtil.isIndexOf(changes, 'emissivemultiply')) {
				changes = ThreeUtil.pushUniq(changes, ['emissive']);
			}
			if (ThreeUtil.isIndexOf(changes, 'specularmultiply')) {
				changes = ThreeUtil.pushUniq(changes, ['specular']);
			}
			if (ThreeUtil.isIndexOf(changes, 'sheenmultiply')) {
				changes = ThreeUtil.pushUniq(changes, ['sheen']);
			}
			if (ThreeUtil.isIndexOf(changes, ['normalscalex', 'normalscaley'])) {
				changes = ThreeUtil.pushUniq(changes, ['normalscale']);
			}
			if (
				ThreeUtil.isIndexOf(changes, [
					'referencepositionx',
					'referencepositiony',
					'referencepositionz',
				])
			) {
				changes = ThreeUtil.pushUniq(changes, ['referenceposition']);
			}
			if (
				ThreeUtil.isIndexOf(changes, [
					'clearcoatnormalscalex',
					'clearcoatnormalscaley',
				])
			) {
				changes = ThreeUtil.pushUniq(changes, ['clearcoatnormalscale']);
			}
			if (
				ThreeUtil.isIndexOf(changes, [
					'clearcoatnormalscalex',
					'clearcoatnormalscaley',
				])
			) {
				changes = ThreeUtil.pushUniq(changes, ['clearcoatnormalscale']);
			}
			if (ThreeUtil.isIndexOf(changes, ['resolutionx', 'resolutiony'])) {
				changes = ThreeUtil.pushUniq(changes, ['resolution']);
			}
			const anyMaterial: any = this.material;
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'uniforms':
						const newUniformTextureList: {
							type: string;
							component: AbstractTextureComponent;
						}[] = [];
						if (ThreeUtil.isNotNull(this.uniforms)) {
							const uniforms = this.uniforms;
							Object.entries(uniforms).forEach(([key, value]) => {
								const anyValue: any = value;
								if (
									ThreeUtil.isNotNull(value) &&
									ThreeUtil.isNotNull(anyValue['type']) &&
									ThreeUtil.isNotNull(anyValue['value'])
								) {
									const valueType: string = anyValue['type'];
									const valueValue: any = anyValue['value'];
									switch (valueType.toLowerCase()) {
										case 'image':
										case 'texture2d':
										case 'texture3d':
										case 'texture':
										case 'datatexture2d':
										case 'datatexture3d':
										case 'datatexture':
										case 'video':
										case 'videotexture':
											if (valueValue instanceof AbstractTextureComponent) {
												newUniformTextureList.push({
													type: 'uniforms.' + key,
													component: valueValue,
												});
											}
											break;
										case 'imagelist':
										case 'texturelist':
										case 'imagearray':
										case 'texturearray':
											// todo
											break;
										default:
											break;
									}
								} else if (
									ThreeUtil.isNotNull(value) &&
									value['value'] !== undefined
								) {
									if (value['value'] instanceof AbstractTextureComponent) {
										newUniformTextureList.push({
											type: 'uniforms.' + key,
											component: value['value'],
										});
									}
								} else {
									if (value instanceof AbstractTextureComponent) {
										newUniformTextureList.push({
											type: 'uniforms.' + key,
											component: value['value'],
										});
									}
								}
							});
						}
						const cachedUniformTextureList: AbstractTextureComponent[] = [];
						newUniformTextureList.forEach((texture) => {
							cachedUniformTextureList.push(texture.component);
						});
						this._cachedUniformTextureList.forEach((texture) => {
							if (cachedUniformTextureList.indexOf(texture) === -1) {
								texture.unsetMaterial(this.selfAny);
							}
						});
						newUniformTextureList.forEach((material) => {
							if (
								this._cachedUniformTextureList.indexOf(material.component) ===
								-1
							) {
								material.component.setMaterial(this.selfAny, material.type);
							}
						});
						this._cachedUniformTextureList = cachedUniformTextureList;
						break;
					case 'texture':
						const newTextureList: {
							type: string;
							component: AbstractTextureComponent;
						}[] = [];
						this.synkTexture(this.envMap, 'envMap', newTextureList);
						this.synkTexture(this.matcap, 'matcap', newTextureList);
						this.synkTexture(this.map, 'map', newTextureList);
						this.synkTexture(this.specularMap, 'specularMap', newTextureList);
						this.synkTexture(this.alphaMap, 'alphaMap', newTextureList);
						this.synkTexture(this.bumpMap, 'bumpMap', newTextureList);
						this.synkTexture(this.normalMap, 'normalMap', newTextureList);
						this.synkTexture(this.aoMap, 'aoMap', newTextureList);
						this.synkTexture(
							this.displacementMap,
							'displacementMap',
							newTextureList
						);
						if (ThreeUtil.isNotNull(this.textureList)) {
							this.textureList.forEach((texture) => {
								newTextureList.push({
									type: 'auto',
									component: texture,
								});
							});
						}
						const cachedTextureList: AbstractTextureComponent[] = [];
						newTextureList.forEach((texture) => {
							cachedTextureList.push(texture.component);
						});
						this._cachedTextureList.forEach((texture) => {
							if (cachedTextureList.indexOf(texture) === -1) {
								texture.unsetMaterial(this.selfAny);
							}
						});
						newTextureList.forEach((material) => {
							if (this._cachedTextureList.indexOf(material.component) === -1) {
								material.component.setMaterial(this.selfAny, material.type);
							}
						});
						this._cachedTextureList = cachedTextureList;
						break;
					case 'color':
						if (
							ThreeUtil.isNotNull(this.color) &&
							anyMaterial['color'] !== undefined
						) {
							if (anyMaterial['color'] instanceof THREE_MAT.NODES.ColorNode) {
								anyMaterial['color'].value = this.getColor();
							} else {
								anyMaterial['color'] = this.getColor();
							}
						}
						break;
					case 'lights':
						if (
							ThreeUtil.isNotNull(this.lights) &&
							anyMaterial['lights'] !== undefined
						) {
							if (anyMaterial['lights'] instanceof THREE_MAT.NODES.BoolNode) {
								anyMaterial['lights'].value = ThreeUtil.getTypeSafe(
									this.lights,
									true
								);
							} else {
								anyMaterial['lights'] = ThreeUtil.getTypeSafe(
									this.lights,
									true
								);
							}
						}
						break;
					case 'clipping':
						if (
							ThreeUtil.isNotNull(this.clipping) &&
							anyMaterial['clipping'] !== undefined
						) {
							if (anyMaterial['clipping'] instanceof THREE_MAT.NODES.BoolNode) {
								anyMaterial['clipping'].value = ThreeUtil.getTypeSafe(
									this.clipping,
									true
								);
							} else {
								anyMaterial['clipping'] = ThreeUtil.getTypeSafe(
									this.clipping,
									true
								);
							}
						}
						break;
					case 'wireframe':
						if (
							ThreeUtil.isNotNull(this.wireframe) &&
							anyMaterial['wireframe'] !== undefined
						) {
							if (
								anyMaterial['wireframe'] instanceof THREE_MAT.NODES.BoolNode
							) {
								anyMaterial['wireframe'].value = ThreeUtil.getTypeSafe(
									this.wireframe,
									false
								);
							} else {
								anyMaterial['wireframe'] = ThreeUtil.getTypeSafe(
									this.wireframe,
									false
								);
							}
						}
						break;
					case 'specular':
						if (
							ThreeUtil.isNotNull(this.specular) &&
							anyMaterial['specular'] !== undefined
						) {
							if (
								anyMaterial['specular'] instanceof THREE_MAT.NODES.ColorNode
							) {
								anyMaterial['specular'].value = this.getSpecular();
							} else {
								anyMaterial['specular'] = this.getSpecular();
							}
						}
						break;
					case 'shininess':
						if (
							ThreeUtil.isNotNull(this.shininess) &&
							anyMaterial['shininess'] !== undefined
						) {
							if (
								anyMaterial['shininess'] instanceof THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['shininess'].value = ThreeUtil.getTypeSafe(
									this.shininess,
									1
								);
							} else {
								anyMaterial['shininess'] = ThreeUtil.getTypeSafe(
									this.shininess,
									1
								);
							}
						}
						break;
					case 'lightmapintensity':
						if (
							ThreeUtil.isNotNull(this.lightMapIntensity) &&
							anyMaterial['lightMapIntensity'] !== undefined
						) {
							if (
								anyMaterial['lightMapIntensity'] instanceof
								THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['lightMapIntensity'].value = ThreeUtil.getTypeSafe(
									this.lightMapIntensity,
									1
								);
							} else {
								anyMaterial['lightMapIntensity'] = ThreeUtil.getTypeSafe(
									this.lightMapIntensity,
									1
								);
							}
						}
						break;
					case 'aomapintensity':
						if (
							ThreeUtil.isNotNull(this.aoMapIntensity) &&
							anyMaterial['aoMapIntensity'] !== undefined
						) {
							if (
								anyMaterial['aoMapIntensity'] instanceof
								THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['aoMapIntensity'].value = ThreeUtil.getTypeSafe(
									this.aoMapIntensity,
									1
								);
							} else {
								anyMaterial['aoMapIntensity'] = ThreeUtil.getTypeSafe(
									this.aoMapIntensity,
									1
								);
							}
						}
						break;
					case 'emissive':
						if (
							ThreeUtil.isNotNull(this.emissive) &&
							anyMaterial['emissive'] !== undefined
						) {
							if (
								anyMaterial['emissive'] instanceof THREE_MAT.NODES.ColorNode
							) {
								anyMaterial['emissive'].value = this.getEmissive();
							} else {
								anyMaterial['emissive'] = this.getEmissive();
							}
						}
						break;
					case 'emissiveintensity':
						if (
							ThreeUtil.isNotNull(this.emissiveIntensity) &&
							anyMaterial['emissiveIntensity'] !== undefined
						) {
							if (
								anyMaterial['emissiveIntensity'] instanceof
								THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['emissiveIntensity'].value = ThreeUtil.getTypeSafe(
									this.emissiveIntensity,
									1
								);
							} else {
								anyMaterial['emissiveIntensity'] = ThreeUtil.getTypeSafe(
									this.emissiveIntensity,
									1
								);
							}
						}
						break;
					case 'bumpscale':
						if (
							ThreeUtil.isNotNull(this.bumpScale) &&
							anyMaterial['bumpScale'] !== undefined
						) {
							if (
								anyMaterial['bumpScale'] instanceof THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['bumpScale'].value = ThreeUtil.getTypeSafe(
									this.bumpScale,
									1
								);
							} else {
								anyMaterial['bumpScale'] = ThreeUtil.getTypeSafe(
									this.bumpScale,
									1
								);
							}
						}
						break;
					case 'normalmaptype':
						if (
							ThreeUtil.isNotNull(this.normalMapType) &&
							anyMaterial['normalMapType'] !== undefined
						) {
							anyMaterial['normalMapType'] = ThreeUtil.getNormalMapTypeSafe(
								this.normalMapType
							);
						}
						break;
					case 'normalscale':
						if (
							ThreeUtil.isNotNull(this.roughness) &&
							anyMaterial['normalScale'] !== undefined
						) {
							if (
								anyMaterial['normalScale'] instanceof
								THREE_MAT.NODES.Vector2Node
							) {
								anyMaterial['normalScale'].value = this.getNormalScale();
							} else {
								anyMaterial['normalScale'] = this.getNormalScale();
							}
						}
						break;
					case 'displacementscale':
						if (
							ThreeUtil.isNotNull(this.displacementScale) &&
							anyMaterial['displacementScale'] !== undefined
						) {
							if (
								anyMaterial['displacementScale'] instanceof
								THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['displacementScale'].value = ThreeUtil.getTypeSafe(
									this.displacementScale,
									1
								);
							} else {
								anyMaterial['displacementScale'] = ThreeUtil.getTypeSafe(
									this.displacementScale,
									1
								);
							}
						}
						break;
					case 'displacementbias':
						if (
							ThreeUtil.isNotNull(this.displacementBias) &&
							anyMaterial['displacementBias'] !== undefined
						) {
							if (
								anyMaterial['displacementBias'] instanceof
								THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['displacementBias'].value = ThreeUtil.getTypeSafe(
									this.displacementBias,
									1
								);
							} else {
								anyMaterial['displacementBias'] = ThreeUtil.getTypeSafe(
									this.displacementBias,
									1
								);
							}
						}
						break;
					case 'combine':
						if (
							ThreeUtil.isNotNull(this.combine) &&
							anyMaterial['combine'] !== undefined
						) {
							anyMaterial['combine'] = ThreeUtil.getCombineSafe(this.combine);
						}
						break;
					case 'reflectivity':
						if (
							ThreeUtil.isNotNull(this.reflectivity) &&
							anyMaterial['reflectivity'] !== undefined
						) {
							if (
								anyMaterial['reflectivity'] instanceof THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['reflectivity'].value = ThreeUtil.getTypeSafe(
									this.reflectivity,
									1
								);
							} else {
								anyMaterial['reflectivity'] = ThreeUtil.getTypeSafe(
									this.reflectivity,
									1
								);
							}
						}
						break;
					case 'refractionratio':
						if (
							ThreeUtil.isNotNull(this.refractionRatio) &&
							anyMaterial['refractionRatio'] !== undefined
						) {
							if (
								anyMaterial['refractionRatio'] instanceof
								THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['refractionRatio'].value = ThreeUtil.getTypeSafe(
									this.refractionRatio,
									1
								);
							} else {
								anyMaterial['refractionRatio'] = ThreeUtil.getTypeSafe(
									this.refractionRatio,
									1
								);
							}
						}
						break;
					case 'wireframelinewidth':
						if (
							ThreeUtil.isNotNull(this.wireframeLinewidth) &&
							anyMaterial['wireframeLinewidth'] !== undefined
						) {
							if (
								anyMaterial['wireframeLinewidth'] instanceof
								THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['wireframeLinewidth'].value = ThreeUtil.getTypeSafe(
									this.wireframeLinewidth,
									1
								);
							} else {
								anyMaterial['wireframeLinewidth'] = ThreeUtil.getTypeSafe(
									this.wireframeLinewidth,
									1
								);
							}
						}
						break;
					case 'wireframelinecap':
						if (
							ThreeUtil.isNotNull(this.wireframeLinecap) &&
							anyMaterial['wireframeLinecap'] !== undefined
						) {
							anyMaterial['wireframeLinecap'] = ThreeUtil.getTypeSafe(
								this.wireframeLinecap,
								'round'
							);
						}
						break;
					case 'wireframelinejoin':
						if (
							ThreeUtil.isNotNull(this.wireframeLinejoin) &&
							anyMaterial['wireframeLinejoin'] !== undefined
						) {
							anyMaterial['wireframeLinejoin'] = ThreeUtil.getTypeSafe(
								this.wireframeLinejoin,
								'round'
							);
						}
						break;
					case 'morphtargets':
						if (
							ThreeUtil.isNotNull(this.morphTargets) &&
							anyMaterial['morphTargets'] !== undefined
						) {
							if (
								anyMaterial['morphTargets'] instanceof THREE_MAT.NODES.BoolNode
							) {
								anyMaterial['morphTargets'].value = ThreeUtil.getTypeSafe(
									this.morphTargets,
									false
								);
							} else {
								anyMaterial['morphTargets'] = ThreeUtil.getTypeSafe(
									this.morphTargets,
									false
								);
							}
						}
						break;
					case 'morphNormals':
						if (
							ThreeUtil.isNotNull(this.morphNormals) &&
							anyMaterial['morphNormals'] !== undefined
						) {
							if (
								anyMaterial['morphNormals'] instanceof THREE_MAT.NODES.BoolNode
							) {
								anyMaterial['morphNormals'].value = ThreeUtil.getTypeSafe(
									this.morphNormals,
									false
								);
							} else {
								anyMaterial['morphNormals'] = ThreeUtil.getTypeSafe(
									this.morphNormals,
									false
								);
							}
						}
						break;
					case 'linewidth':
						if (
							ThreeUtil.isNotNull(this.linewidth) &&
							anyMaterial['linewidth'] !== undefined
						) {
							if (
								anyMaterial['linewidth'] instanceof THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['linewidth'].value = ThreeUtil.getTypeSafe(
									this.linewidth,
									1
								);
							} else {
								anyMaterial['linewidth'] = ThreeUtil.getTypeSafe(
									this.linewidth,
									1
								);
							}
						}
						break;
					case 'linecap':
						if (
							ThreeUtil.isNotNull(this.linecap) &&
							anyMaterial['linecap'] !== undefined
						) {
							anyMaterial['linecap'] = ThreeUtil.getTypeSafe(this.linecap);
						}
						break;
					case 'linejoin':
						if (
							ThreeUtil.isNotNull(this.linejoin) &&
							anyMaterial['linejoin'] !== undefined
						) {
							anyMaterial['linejoin'] = ThreeUtil.getTypeSafe(this.linejoin);
						}

						break;
					case 'scale':
						if (
							ThreeUtil.isNotNull(this.scale) &&
							anyMaterial['scale'] !== undefined
						) {
							if (anyMaterial['scale'] instanceof THREE_MAT.NODES.FloatNode) {
								anyMaterial['scale'].value = ThreeUtil.getTypeSafe(
									this.scale,
									1
								);
							} else {
								anyMaterial['scale'] = ThreeUtil.getTypeSafe(this.scale, 1);
							}
						}
						break;
					case 'dashsize':
						if (
							ThreeUtil.isNotNull(this.dashSize) &&
							anyMaterial['dashSize'] !== undefined
						) {
							if (
								anyMaterial['dashSize'] instanceof THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['dashSize'].value = ThreeUtil.getTypeSafe(
									this.dashSize,
									1
								);
							} else {
								anyMaterial['dashSize'] = ThreeUtil.getTypeSafe(
									this.dashSize,
									1
								);
							}
						}
						break;
					case 'gapsize':
						if (
							ThreeUtil.isNotNull(this.gapSize) &&
							anyMaterial['gapSize'] !== undefined
						) {
							if (anyMaterial['gapSize'] instanceof THREE_MAT.NODES.FloatNode) {
								anyMaterial['gapSize'].value = ThreeUtil.getTypeSafe(
									this.gapSize,
									1
								);
							} else {
								anyMaterial['gapSize'] = ThreeUtil.getTypeSafe(this.gapSize, 1);
							}
						}
						break;
					case 'depthpacking':
						if (
							ThreeUtil.isNotNull(this.depthPacking) &&
							anyMaterial['depthPacking'] !== undefined
						) {
							anyMaterial['depthPacking'] = ThreeUtil.getDepthPackingSafe(
								this.depthPacking
							);
						}
						break;
					case 'fardistance':
						if (
							ThreeUtil.isNotNull(this.farDistance) &&
							anyMaterial['farDistance'] !== undefined
						) {
							if (
								anyMaterial['farDistance'] instanceof THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['farDistance'].value = ThreeUtil.getTypeSafe(
									this.farDistance,
									1
								);
							} else {
								anyMaterial['farDistance'] = ThreeUtil.getTypeSafe(
									this.farDistance,
									1
								);
							}
						}
						break;
					case 'neardistance':
						if (
							ThreeUtil.isNotNull(this.nearDistance) &&
							anyMaterial['nearDistance'] !== undefined
						) {
							if (
								anyMaterial['nearDistance'] instanceof THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['nearDistance'].value = ThreeUtil.getTypeSafe(
									this.nearDistance,
									1
								);
							} else {
								anyMaterial['nearDistance'] = ThreeUtil.getTypeSafe(
									this.nearDistance,
									1
								);
							}
						}
						break;
					case 'referenceposition':
						if (
							ThreeUtil.isNotNull(this.referencePositionX) &&
							ThreeUtil.isNotNull(this.referencePositionY) &&
							ThreeUtil.isNotNull(this.referencePositionZ) &&
							anyMaterial['referencePosition'] !== undefined
						) {
							if (
								anyMaterial['referencePosition'] instanceof
								THREE_MAT.NODES.Vector3Node
							) {
								anyMaterial['referencePosition'].value =
									this.getReferencePosition();
							} else {
								anyMaterial['referencePosition'] = this.getReferencePosition();
							}
						}
						break;
					case 'clearcoat':
						if (
							ThreeUtil.isNotNull(this.clearcoat) &&
							anyMaterial['clearcoat'] !== undefined
						) {
							if (
								anyMaterial['clearcoat'] instanceof THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['clearcoat'].value = ThreeUtil.getTypeSafe(
									this.clearcoat,
									1
								);
							} else {
								anyMaterial['clearcoat'] = ThreeUtil.getTypeSafe(
									this.clearcoat,
									1
								);
							}
						}
						break;
					case 'clearcoatroughness':
						if (
							ThreeUtil.isNotNull(this.clearcoatRoughness) &&
							anyMaterial['clearcoatRoughness'] !== undefined
						) {
							if (
								anyMaterial['clearcoatRoughness'] instanceof
								THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['clearcoatRoughness'].value = ThreeUtil.getTypeSafe(
									this.clearcoatRoughness,
									1
								);
							} else {
								anyMaterial['clearcoatRoughness'] = ThreeUtil.getTypeSafe(
									this.clearcoatRoughness,
									1
								);
							}
						}
						break;
					case 'clearcoatNormalScale':
						if (
							ThreeUtil.isNotNull(this.clearcoatNormalScale) &&
							ThreeUtil.isNotNull(this.clearcoatNormalScaleX) &&
							ThreeUtil.isNotNull(this.clearcoatNormalScaleY) &&
							anyMaterial['clearcoatNormalScale'] !== undefined
						) {
							if (
								anyMaterial['clearcoatNormalScale'] instanceof
								THREE_MAT.NODES.Vector2Node
							) {
								anyMaterial['clearcoatNormalScale'].value =
									this.getClearcoatNormalScale();
							} else {
								anyMaterial['clearcoatNormalScale'] =
									this.getClearcoatNormalScale();
							}
						}
						break;
					case 'sheen':
						if (
							ThreeUtil.isNotNull(this.sheen) &&
							anyMaterial['sheen'] !== undefined
						) {
							if (anyMaterial['sheen'] instanceof THREE_MAT.NODES.ColorNode) {
								anyMaterial['sheen'].value = this.getSheen();
							} else {
								anyMaterial['sheen'] = this.getSheen();
							}
						}
						break;
					case 'transmission':
						if (
							ThreeUtil.isNotNull(this.transmission) &&
							anyMaterial['transmission'] !== undefined
						) {
							if (
								anyMaterial['transmission'] instanceof THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['transmission'].value = ThreeUtil.getTypeSafe(
									this.transmission,
									1
								);
							} else {
								anyMaterial['transmission'] = ThreeUtil.getTypeSafe(
									this.transmission,
									1
								);
							}
						}
						break;
					case 'roughness':
						if (
							ThreeUtil.isNotNull(this.roughness) &&
							anyMaterial['roughness'] !== undefined
						) {
							if (
								anyMaterial['roughness'] instanceof THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['roughness'].value = ThreeUtil.getTypeSafe(
									this.roughness,
									1
								);
							} else {
								anyMaterial['roughness'] = ThreeUtil.getTypeSafe(
									this.roughness,
									1
								);
							}
						}
						break;
					case 'metalness':
						if (
							ThreeUtil.isNotNull(this.metalness) &&
							anyMaterial['metalness'] !== undefined
						) {
							if (
								anyMaterial['metalness'] instanceof THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['metalness'].value = ThreeUtil.getTypeSafe(
									this.metalness,
									1
								);
							} else {
								anyMaterial['metalness'] = ThreeUtil.getTypeSafe(
									this.metalness,
									1
								);
							}
						}

						break;
					case 'envmapintensity':
						if (
							ThreeUtil.isNotNull(this.envMapIntensity) &&
							anyMaterial['envMapIntensity'] !== undefined
						) {
							if (
								anyMaterial['envMapIntensity'] instanceof
								THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['envMapIntensity'].value = ThreeUtil.getTypeSafe(
									this.envMapIntensity,
									1
								);
							} else {
								anyMaterial['envMapIntensity'] = ThreeUtil.getTypeSafe(
									this.envMapIntensity,
									1
								);
							}
						}
						break;
					case 'vertextangents':
						if (
							ThreeUtil.isNotNull(this.vertexTangents) &&
							anyMaterial['vertexTangents'] !== undefined
						) {
							if (
								anyMaterial['vertexTangents'] instanceof
								THREE_MAT.NODES.BoolNode
							) {
								anyMaterial['vertexTangents'].value = ThreeUtil.getTypeSafe(
									this.vertexTangents
								);
							} else {
								anyMaterial['vertexTangents'] = ThreeUtil.getTypeSafe(
									this.vertexTangents
								);
							}
						}
						break;
					case 'rotation':
						if (
							ThreeUtil.isNotNull(this.rotation) &&
							anyMaterial['rotation'] !== undefined
						) {
							if (
								anyMaterial['rotation'] instanceof THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['rotation'].value = ThreeUtil.getAngleSafe(
									this.rotation
								);
							} else {
								anyMaterial['rotation'] = ThreeUtil.getAngleSafe(this.rotation);
							}
						}
						break;
					case 'size':
						if (
							ThreeUtil.isNotNull(this.size) &&
							anyMaterial['size'] !== undefined
						) {
							if (anyMaterial['size'] instanceof THREE_MAT.NODES.FloatNode) {
								anyMaterial['size'].value = ThreeUtil.getTypeSafe(this.size, 1);
							} else {
								anyMaterial['size'] = ThreeUtil.getTypeSafe(this.size, 1);
							}
						}
						break;
					case 'sizeattenuation':
						if (
							ThreeUtil.isNotNull(this.sizeAttenuation) &&
							anyMaterial['sizeAttenuation'] !== undefined
						) {
							if (
								anyMaterial['sizeAttenuation'] instanceof
								THREE_MAT.NODES.BoolNode
							) {
								anyMaterial['sizeAttenuation'].value = ThreeUtil.getTypeSafe(
									this.sizeAttenuation
								);
							} else {
								anyMaterial['sizeAttenuation'] = ThreeUtil.getTypeSafe(
									this.sizeAttenuation
								);
							}
						}
						break;
					case 'dashed':
						if (
							ThreeUtil.isNotNull(this.dashed) &&
							anyMaterial['dashed'] !== undefined
						) {
							if (anyMaterial['dashed'] instanceof THREE_MAT.NODES.BoolNode) {
								anyMaterial['dashed'].value = ThreeUtil.getTypeSafe(
									this.dashed
								);
							} else {
								anyMaterial['dashed'] = ThreeUtil.getTypeSafe(this.dashed);
							}
						}
						break;
					case 'dashscale':
						if (
							ThreeUtil.isNotNull(this.dashScale) &&
							anyMaterial['dashScale'] !== undefined
						) {
							if (
								anyMaterial['dashScale'] instanceof THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['dashScale'].value = ThreeUtil.getTypeSafe(
									this.dashScale,
									1
								);
							} else {
								anyMaterial['dashScale'] = ThreeUtil.getTypeSafe(
									this.dashScale,
									1
								);
							}
						}
						break;
					case 'dashoffset':
						if (
							ThreeUtil.isNotNull(this.dashOffset) &&
							anyMaterial['dashOffset'] !== undefined
						) {
							if (
								anyMaterial['dashOffset'] instanceof THREE_MAT.NODES.FloatNode
							) {
								anyMaterial['dashOffset'].value = ThreeUtil.getTypeSafe(
									this.dashOffset,
									1
								);
							} else {
								anyMaterial['dashOffset'] = ThreeUtil.getTypeSafe(
									this.dashOffset,
									1
								);
							}
						}
						break;
					case 'resolution':
						if (
							ThreeUtil.isNotNull(this.resolutionX) &&
							ThreeUtil.isNotNull(this.resolutionY) &&
							anyMaterial['resolutionX'] !== undefined
						) {
							if (
								anyMaterial['resolutionX'] instanceof
								THREE_MAT.NODES.Vector2Node
							) {
								anyMaterial['resolutionX'].value = this.getResolution();
							} else {
								anyMaterial['resolutionX'] = this.getResolution();
							}
						}
						break;
					case 'extensions':
						if (
							ThreeUtil.isNotNull(this.extensions) &&
							anyMaterial['extensions'] !== undefined
						) {
							anyMaterial['extensions'] = this.getExtensions(
								anyMaterial['extensions']
							);
						}
						break;
					default:
						break;
				}
			});
		}
		super.applyChanges(changes);
	}

	/**
	 * Gets material
	 * @template T
	 * @returns material
	 */
	public getMaterial<T extends THREE.Material>(): T {
		if (this.material === null || this._needUpdate) {
			this.needUpdate = false;
			this.setUserData('storageSource', null);
			let material: THREE_CORE.IMaterial = null;
			if (ThreeUtil.isNotNull(this.storageName)) {
				material = new THREE_MAT.NgxMeshLambertMaterial(
					this.getMaterialParameters({})
				);
				switch (this.type.toLowerCase()) {
					case 'nodematerial':
					case 'node':
						const modeMateriallibrary: any = {};
						if (ThreeUtil.isNotNull(this.storageOption)) {
							Object.entries(this.storageOption).forEach(([key, value]) => {
								const anyValue: any = value;
								if (
									ThreeUtil.isNotNull(anyValue['type']) &&
									ThreeUtil.isNotNull(anyValue['value'])
								) {
									switch (anyValue['type'].toLowerCase()) {
										case 'texture':
											const texture =
												AbstractTextureComponent.getTextureImageOption(
													anyValue['value'],
													anyValue['options']
												);
											modeMateriallibrary[key] = texture;
											break;
									}
								}
							});
						}
						const NodeMaterialLoaderAlias: any = NodeMaterialLoader;
						const nodeMaterialLoader = new NodeMaterialLoaderAlias(
							undefined,
							modeMateriallibrary
						);
						nodeMaterialLoader.load(
							ThreeUtil.getStoreUrl(this.storageName),
							(material: THREE_CORE.IMaterial) => {
								this.setUserData('storageSource', nodeMaterialLoader);
								this.setMaterial(material);
							}
						);
						break;
					default:
						this.localStorageService.getMaterial(
							this.storageName,
							(material: THREE_CORE.IMaterial, storageSource: any) => {
								this.setUserData('storageSource', storageSource);
								this.setMaterial(material);
							},
							this.storageOption
						);
						break;
				}
			} else if (ThreeUtil.isNotNull(this.refer)) {
				this.unSubscribeRefer('refer');
				const refMaterial = ThreeUtil.getMaterialOne(this.refer);
				if (refMaterial !== null) {
					material = refMaterial.clone();
				}
				this.subscribeRefer(
					'refer',
					ThreeUtil.getSubscribe(
						this.refer,
						() => {
							this.needUpdate = true;
						},
						'material'
					)
				);
			}
			if (material === null) {
				switch (this.type.toLowerCase()) {
					case 'linebasicmaterial':
					case 'linebasic':
						const parametersLineBasicMaterial: THREE.LineBasicMaterialParameters =
							{
								color: this.getColor(),
								linewidth: ThreeUtil.getTypeSafe(this.linewidth),
								linecap: ThreeUtil.getTypeSafe(this.linecap),
								linejoin: ThreeUtil.getTypeSafe(this.linejoin),
								// morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
							};
						material = new THREE_MAT.NgxLineBasicMaterial(
							this.getMaterialParameters(parametersLineBasicMaterial)
						);
						break;
					case 'linedashedmaterial':
					case 'linedashed':
						const parametersLineDashedMaterial: THREE.LineDashedMaterialParameters =
							{
								color: this.getColor(),
								linewidth: ThreeUtil.getTypeSafe(this.linewidth),
								linecap: ThreeUtil.getTypeSafe(this.linecap),
								linejoin: ThreeUtil.getTypeSafe(this.linejoin),
								vertexColors: this.getVertexColors(),
								dashSize: ThreeUtil.getTypeSafe(this.dashSize),
								gapSize: ThreeUtil.getTypeSafe(this.gapSize),
								scale: ThreeUtil.getTypeSafe(this.scale),
							};
						material = new THREE_MAT.NgxLineDashedMaterial(
							this.getMaterialParameters(parametersLineDashedMaterial)
						);
						break;
					case 'meshbasicmaterial':
					case 'meshbasic':
						const parametersMeshBasicMaterial: THREE.MeshBasicMaterialParameters =
							{
								color: this.getColor(),
								aoMapIntensity: ThreeUtil.getTypeSafe(this.aoMapIntensity),
								refractionRatio: ThreeUtil.getTypeSafe(this.refractionRatio),
								wireframe: ThreeUtil.getTypeSafe(this.wireframe),
								wireframeLinewidth: ThreeUtil.getTypeSafe(
									this.wireframeLinewidth
								),
								// skinning: this.getSkinning(),
								// morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
								reflectivity: ThreeUtil.getTypeSafe(this.reflectivity),
								combine: ThreeUtil.getCombineSafe(this.combine),
								wireframeLinecap: ThreeUtil.getTypeSafe(this.wireframeLinecap),
								wireframeLinejoin: ThreeUtil.getTypeSafe(
									this.wireframeLinejoin
								),
								map: this.getTexture('map'),
								aoMap: this.getTexture('aoMap'),
								specularMap: this.getTexture('specularMap'),
								alphaMap: this.getTexture('alphaMap'),
								envMap: this.getTexture('envMap'),
							};
						material = new THREE_MAT.NgxMeshBasicMaterial(
							this.getMaterialParameters(parametersMeshBasicMaterial)
						);
						break;
					case 'meshdepthmaterial':
					case 'meshdepth':
						const parametersMeshDepthMaterial: THREE.MeshDepthMaterialParameters =
							{
								map: this.getTexture('map'),
								alphaMap: this.getTexture('alphaMap'),
								depthPacking: ThreeUtil.getDepthPackingSafe(this.depthPacking),
								displacementMap: this.getTexture('displacementMap'),
								displacementScale: ThreeUtil.getTypeSafe(
									this.displacementScale
								),
								displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
								wireframe: ThreeUtil.getTypeSafe(this.wireframe),
								wireframeLinewidth: ThreeUtil.getTypeSafe(
									this.wireframeLinewidth
								),
							};
						material = new THREE_MAT.NgxMeshDepthMaterial(
							this.getMaterialParameters(parametersMeshDepthMaterial)
						);
						break;
					case 'meshdistancematerial':
					case 'meshdistance':
						const parametersMeshDistanceMaterial: THREE.MeshDistanceMaterialParameters =
							{
								map: this.getTexture('map'),
								alphaMap: this.getTexture('alphaMap'),
								displacementMap: this.getTexture('displacementMap'),
								displacementScale: ThreeUtil.getTypeSafe(
									this.displacementScale
								),
								displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
								farDistance: ThreeUtil.getTypeSafe(this.farDistance),
								nearDistance: ThreeUtil.getTypeSafe(this.nearDistance),
								referencePosition: this.getReferencePosition(),
							};
						material = new THREE_MAT.NgxMeshDistanceMaterial(
							this.getMaterialParameters(parametersMeshDistanceMaterial)
						);
						break;
					case 'meshmatcapmaterial':
					case 'meshmatcap':
						const parametersMeshMatcapMaterial: THREE.MeshMatcapMaterialParameters =
							{
								color: this.getColor(),
								matcap: this.getTexture('matcap'),
								map: this.getTexture('map'),
								alphaMap: this.getTexture('alphaMap'),
								bumpMap: this.getTexture('bumpMap'),
								bumpScale: ThreeUtil.getTypeSafe(this.bumpScale),
								normalMap: this.getTexture('normalMap'),
								normalMapType: ThreeUtil.getNormalMapTypeSafe(
									this.normalMapType
								),
								normalScale: this.getNormalScale(),
								displacementMap: this.getTexture('displacementMap'),
								displacementScale: ThreeUtil.getTypeSafe(
									this.displacementScale
								),
								displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
								flatShading: ThreeUtil.getTypeSafe(this.flatShading),
								// skinning: this.getSkinning(),
								// morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
								// morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
							};
						material = new THREE_MAT.NgxMeshMatcapMaterial(
							this.getMaterialParameters(parametersMeshMatcapMaterial)
						);
						break;
					case 'meshnormalmaterial':
					case 'meshnormal':
					case 'normalmaterial':
					case 'normal':
						const parametersMeshNormalMaterial: THREE.MeshNormalMaterialParameters =
							{
								bumpMap: this.getTexture('bumpMap'),
								bumpScale: ThreeUtil.getTypeSafe(this.bumpScale),
								normalMap: this.getTexture('normalMap'),
								normalMapType: ThreeUtil.getNormalMapTypeSafe(
									this.normalMapType
								),
								normalScale: this.getNormalScale(),
								displacementMap: this.getTexture('displacementMap'),
								displacementScale: ThreeUtil.getTypeSafe(
									this.displacementScale
								),
								displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
								wireframe: ThreeUtil.getTypeSafe(this.wireframe),
								wireframeLinewidth: ThreeUtil.getTypeSafe(
									this.wireframeLinewidth
								),
								flatShading: ThreeUtil.getTypeSafe(this.flatShading),
								// skinning: this.getSkinning(),
								// morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
								// morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
							};
						material = new THREE_MAT.NgxMeshNormalMaterial(
							this.getMaterialParameters(parametersMeshNormalMaterial)
						);
						break;
					case 'meshphongmaterial':
					case 'meshphong':
					case 'phongmaterial':
					case 'phong':
						const parametersMeshPhongMaterial: THREE.MeshPhongMaterialParameters =
							{
								color: this.getColor(),
								map: this.getTexture('map'),
								lightMap: this.getTexture('lightMap'),
								lightMapIntensity: ThreeUtil.getTypeSafe(
									this.lightMapIntensity
								),
								aoMap: this.getTexture('aoMap'),
								aoMapIntensity: ThreeUtil.getTypeSafe(this.aoMapIntensity),
								emissive: this.getEmissive(),
								emissiveIntensity: ThreeUtil.getTypeSafe(
									this.emissiveIntensity
								),
								emissiveMap: this.getTexture('emissiveMap'),
								bumpMap: this.getTexture('bumpMap'),
								bumpScale: ThreeUtil.getTypeSafe(this.bumpScale),
								normalMap: this.getTexture('normalMap'),
								normalMapType: ThreeUtil.getNormalMapTypeSafe(
									this.normalMapType
								),
								normalScale: this.getNormalScale(),
								displacementMap: this.getTexture('displacementMap'),
								displacementScale: ThreeUtil.getTypeSafe(
									this.displacementScale
								),
								displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
								alphaMap: this.getTexture('alphaMap'),
								envMap: this.getTexture('envMap'),
								refractionRatio: ThreeUtil.getTypeSafe(this.refractionRatio),
								wireframe: ThreeUtil.getTypeSafe(this.wireframe),
								wireframeLinewidth: ThreeUtil.getTypeSafe(
									this.wireframeLinewidth
								),
								// skinning: this.getSkinning(),
								// morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
								// morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
								reflectivity: ThreeUtil.getTypeSafe(this.reflectivity),
								specular: this.getSpecular(),
								shininess: ThreeUtil.getTypeSafe(this.shininess),
								specularMap: this.getTexture('specularMap'),
								combine: ThreeUtil.getCombineSafe(this.combine),
								wireframeLinecap: ThreeUtil.getTypeSafe(this.wireframeLinecap),
								wireframeLinejoin: ThreeUtil.getTypeSafe(
									this.wireframeLinejoin
								),
								flatShading: ThreeUtil.getTypeSafe(this.flatShading),
							};
						material = new THREE_MAT.NgxMeshPhongMaterial(
							this.getMaterialParameters(parametersMeshPhongMaterial)
						);
						break;
					case 'meshphysicalmaterial':
					case 'meshphysical':
					case 'physicalmaterial':
					case 'physical':
						// const parametersMeshPhysicalMaterial: (THREE.MeshPhysicalMaterialParameters extends { thickness? : number }) =
						const parametersMeshPhysicalMaterial: any = {
							color: this.getColor(),
							roughness: ThreeUtil.getTypeSafe(this.roughness),
							metalness: ThreeUtil.getTypeSafe(this.metalness),
							map: this.getTexture('map'),
							lightMap: this.getTexture('lightMap'),
							lightMapIntensity: ThreeUtil.getTypeSafe(this.lightMapIntensity),
							aoMap: this.getTexture('aoMap'),
							aoMapIntensity: ThreeUtil.getTypeSafe(this.aoMapIntensity),
							emissive: this.getEmissive(),
							emissiveIntensity: ThreeUtil.getTypeSafe(this.emissiveIntensity),
							emissiveMap: this.getTexture('emissiveMap'),
							bumpMap: this.getTexture('bumpMap'),
							bumpScale: ThreeUtil.getTypeSafe(this.bumpScale),
							normalMap: this.getTexture('normalMap'),
							normalMapType: ThreeUtil.getNormalMapTypeSafe(
								this.normalMapType,
								'tangentspace'
							),
							normalScale: this.getNormalScale(),
							displacementMap: this.getTexture('displacementMap'),
							displacementScale: ThreeUtil.getTypeSafe(this.displacementScale),
							displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
							roughnessMap: this.getTexture('roughnessMap'),
							metalnessMap: this.getTexture('metalnessMap'),
							alphaMap: this.getTexture('alphaMap'),
							envMap: this.getTexture('envMap'),
							envMapIntensity: ThreeUtil.getTypeSafe(this.envMapIntensity),
							refractionRatio: ThreeUtil.getTypeSafe(this.refractionRatio),
							wireframe: ThreeUtil.getTypeSafe(this.wireframe),
							wireframeLinewidth: ThreeUtil.getTypeSafe(
								this.wireframeLinewidth
							),
							// skinning: this.getSkinning(),
							// vertexTangents: ThreeUtil.getTypeSafe(this.vertexTangents),
							// morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
							// morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
							clearcoat: ThreeUtil.getTypeSafe(this.clearcoat),
							// clearcoatMap: this.getTexture('clearcoatMap'),
							clearcoatRoughness: ThreeUtil.getTypeSafe(
								this.clearcoatRoughness
							),
							// clearcoatRoughnessMap: this.getTexture('clearcoatRoughnessMap'),
							clearcoatNormalScale: this.getClearcoatNormalScale(),
							clearcoatNormalMap: this.getTexture('clearcoatNormalMap'),
							reflectivity: ThreeUtil.getTypeSafe(this.reflectivity),
							// ior: this.getIor(),
							// sheen: this.getSheen(),
							transmission: ThreeUtil.getTypeSafe(this.transmission),
							thickness: ThreeUtil.getTypeSafe(this.thickness),
							// transmissionMap: this.getTexture('transmissionMap')
						};
						material = new THREE_MAT.NgxMeshPhysicalMaterial(
							this.getMaterialParameters(parametersMeshPhysicalMaterial)
						);
						break;
					case 'meshstandardmaterial':
					case 'meshstandard':
					case 'standardmaterial':
					case 'standard':
						const parametersMeshStandardMaterial: THREE.MeshStandardMaterialParameters =
							{
								color: this.getColor(),
								roughness: ThreeUtil.getTypeSafe(this.roughness),
								metalness: ThreeUtil.getTypeSafe(this.metalness),
								map: this.getTexture('map'),
								lightMap: this.getTexture('lightMap'),
								lightMapIntensity: ThreeUtil.getTypeSafe(
									this.lightMapIntensity
								),
								aoMap: this.getTexture('aoMap'),
								aoMapIntensity: ThreeUtil.getTypeSafe(this.aoMapIntensity),
								emissive: this.getEmissive(),
								emissiveIntensity: ThreeUtil.getTypeSafe(
									this.emissiveIntensity
								),
								emissiveMap: this.getTexture('emissiveMap'),
								bumpMap: this.getTexture('bumpMap'),
								bumpScale: ThreeUtil.getTypeSafe(this.bumpScale),
								normalMap: this.getTexture('normalMap'),
								normalMapType: ThreeUtil.getNormalMapTypeSafe(
									this.normalMapType,
									'tangentspace'
								),
								normalScale: this.getNormalScale(),
								displacementMap: this.getTexture('displacementMap'),
								displacementScale: ThreeUtil.getTypeSafe(
									this.displacementScale
								),
								displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
								roughnessMap: this.getTexture('roughnessMap'),
								metalnessMap: this.getTexture('metalnessMap'),
								alphaMap: this.getTexture('alphaMap'),
								envMap: this.getTexture('envMap'),
								envMapIntensity: ThreeUtil.getTypeSafe(this.envMapIntensity),
								refractionRatio: ThreeUtil.getTypeSafe(this.refractionRatio),
								wireframe: ThreeUtil.getTypeSafe(this.wireframe),
								wireframeLinewidth: ThreeUtil.getTypeSafe(
									this.wireframeLinewidth
								),
								flatShading: ThreeUtil.getTypeSafe(this.flatShading),
								// skinning: this.getSkinning(),
								// vertexTangents: ThreeUtil.getTypeSafe(this.vertexTangents),
								// morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
								// morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
							};
						const meshStandardMaterial = new THREE_MAT.NgxMeshStandardMaterial(
							this.getMaterialParameters(parametersMeshStandardMaterial)
						);
						material = meshStandardMaterial;
						break;
					case 'meshtoonmaterial':
					case 'meshtoon':
					case 'toonmaterial':
					case 'toon':
						const parametersMeshToonMaterial: THREE.MeshToonMaterialParameters =
							{
								color: this.getColor(),
								gradientMap: this.getTexture('gradientMap'),
								map: this.getTexture('map'),
								lightMap: this.getTexture('lightMap'),
								lightMapIntensity: ThreeUtil.getTypeSafe(
									this.lightMapIntensity
								),
								aoMap: this.getTexture('aoMap'),
								aoMapIntensity: ThreeUtil.getTypeSafe(this.aoMapIntensity),
								emissive: this.getEmissive(),
								emissiveIntensity: ThreeUtil.getTypeSafe(
									this.emissiveIntensity
								),
								emissiveMap: this.getTexture('emissiveMap'),
								bumpMap: this.getTexture('bumpMap'),
								bumpScale: ThreeUtil.getTypeSafe(this.bumpScale),
								normalMap: this.getTexture('normalMap'),
								normalMapType: ThreeUtil.getNormalMapTypeSafe(
									this.normalMapType,
									'tangentspace'
								),
								normalScale: this.getNormalScale(),
								displacementMap: this.getTexture('displacementMap'),
								displacementScale: ThreeUtil.getTypeSafe(
									this.displacementScale
								),
								displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
								alphaMap: this.getTexture('alphaMap'),
								wireframe: ThreeUtil.getTypeSafe(this.wireframe),
								wireframeLinewidth: ThreeUtil.getTypeSafe(
									this.wireframeLinewidth
								),
								wireframeLinecap: ThreeUtil.getTypeSafe(
									this.wireframeLinecap,
									'round'
								),
								wireframeLinejoin: ThreeUtil.getTypeSafe(
									this.wireframeLinejoin,
									'round'
								),
								// skinning: this.getSkinning(),
								// morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
								// morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
							};
						material = new THREE_MAT.NgxMeshToonMaterial(
							this.getMaterialParameters(parametersMeshToonMaterial)
						);
						break;
					case 'pointsmaterial':
					case 'points':
						const parametersPointsMaterial: THREE.PointsMaterialParameters = {
							color: this.getColor(),
							map: this.getTexture('map'),
							alphaMap: this.getTexture('alphaMap'),
							size: ThreeUtil.getTypeSafe(this.size),
							sizeAttenuation: ThreeUtil.getTypeSafe(this.sizeAttenuation),
							// morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
						};
						material = new THREE_MAT.NgxPointsMaterial(
							this.getMaterialParameters(parametersPointsMaterial)
						);
						break;
					case 'rawshadermaterial':
					case 'rawshader':
						const parametersRawShaderMaterial: THREE.ShaderMaterialParameters =
							{
								uniforms: this.getUniforms({}),
								vertexShader: this.getShader('x-shader/x-vertex'),
								fragmentShader: this.getShader('x-shader/x-fragment'),
								linewidth: ThreeUtil.getTypeSafe(this.linewidth),
								wireframe: ThreeUtil.getTypeSafe(this.wireframe),
								wireframeLinewidth: ThreeUtil.getTypeSafe(
									this.wireframeLinewidth
								),
								lights: ThreeUtil.getTypeSafe(this.lights),
								clipping: ThreeUtil.getTypeSafe(this.clipping),
								// skinning: this.getSkinning(),
								// morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
								// morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
							};
						const rawShaderMaterial = new THREE_MAT.NgxRawShaderMaterial(
							this.getMaterialParameters(parametersRawShaderMaterial)
						);
						if (ThreeUtil.isNotNull(this.glslVersion)) {
							rawShaderMaterial.glslVersion = ThreeUtil.getGlslVersionSafe(this.glslVersion);
						}
						if (ThreeUtil.isNotNull(this.extensions)) {
							this.getExtensions(rawShaderMaterial.extensions);
						}
						material = rawShaderMaterial;
						break;
					case 'shaderattributesparticlesmaterial':
					case 'shaderattributesparticles':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderAttributesParticlesMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shaderselectivedrawmaterial':
					case 'shaderselectivedraw':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderSelectiveDrawMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shadercustomattributesmaterial':
					case 'shadercustomattributes':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderCustomAttributesMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shadercustomattributeslinesmaterial':
					case 'shadercustomattributeslines':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderCustomAttributesLinesMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shadercustomattributespointsmaterial':
					case 'shadercustomattributespoints':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderCustomAttributesPointsMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shaderattributesizecolormaterial':
					case 'shaderattributesizecolor':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderAttributeSizeColorMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shaderattributesizecolor1material':
					case 'shaderattributesizecolor1':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderAttributeSizeColor1Material(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shaderskydomematerial':
					case 'shaderskydome':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderSkyDomeMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shaderparallaxmaterial':
					case 'shaderparallax':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderParallaxMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shaderfresnelmaterial':
					case 'shaderfresnel':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderFresnelMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shadersubsurfacescatteringmaterial':
					case 'shadersubsurfacescattering':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderSubsurfaceScatteringMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shaderwireframematerial':
					case 'shaderwireframe':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderWireframeMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shadernoiserandom1dmaterial':
					case 'shadernoiserandom1d':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderNoiseRandom1DMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shadernoiserandom2dmaterial':
					case 'shadernoiserandom2d':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderNoiseRandom2DMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shadernoiserandom3dmaterial':
					case 'shadernoiserandom3d':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderNoiseRandom3DMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shadercolorrainbowmaterial':
					case 'shadercolorrainbow':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderColorRainbowMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shadervideokinectmaterial':
					case 'shadervideokinect':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderVideoKinectMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shadervolumerendershader1material':
					case 'shadervolumerendershader1':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderVolumeRenderShader1Material(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shaderinstancingmaterial':
					case 'shaderinstancing':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderInstancingMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shaderscalecolormaterial':
					case 'shaderscalecolor':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderScaleColorMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shadersincolormaterial':
					case 'shadersincolor':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderSinColorMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shaderraymarchingreflectmaterial':
					case 'shaderraymarchingreflect':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderRaymarchingReflectMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shadercloudmaterial':
					case 'shadercloud':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderCloudMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shaderperlinmaterial':
					case 'shaderperlin':
						material = this.getShaderMaterialUpdate(
							new THREE_MAT.NgxShaderPerlinMaterial(
								this.getShaderMaterialParameters()
							)
						);
						break;
					case 'shadermaterial':
					case 'shader':
						const parametersShaderMaterial: THREE.ShaderMaterialParameters = {
							uniforms: this.getUniforms({}),
							vertexShader: this.getShader('x-shader/x-vertex'),
							fragmentShader: this.getShader('x-shader/x-fragment'),
							linewidth: ThreeUtil.getTypeSafe(this.linewidth),
							wireframe: ThreeUtil.getTypeSafe(this.wireframe),
							wireframeLinewidth: ThreeUtil.getTypeSafe(
								this.wireframeLinewidth
							),
							lights: ThreeUtil.getTypeSafe(this.lights),
							clipping: ThreeUtil.getTypeSafe(this.clipping),
							// skinning: this.getSkinning(),
							// morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
							// morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
						};
						const shaderMaterial = new THREE_MAT.NgxShaderMaterial(
							this.getMaterialParameters(parametersShaderMaterial)
						);
						if (ThreeUtil.isNotNull(this.glslVersion)) {
							shaderMaterial.glslVersion = ThreeUtil.getGlslVersionSafe(this.glslVersion);
						}
						if (ThreeUtil.isNotNull(this.extensions)) {
							this.getExtensions(shaderMaterial.extensions);
						}
						material = shaderMaterial;
						break;
					case 'shadowmaterial':
					case 'shadow':
						material = new THREE_MAT.NgxShadowMaterial(
							this.getMaterialParameters({
								color: this.getColor(),
							})
						);
						break;
					case 'linematerial':
					case 'line':
						material = new THREE_MAT.NgxLineMaterial(
							this.getMaterialParameters({
								color: this.getColor(),
								dashed: ThreeUtil.getTypeSafe(this.dashed),
								dashScale: ThreeUtil.getTypeSafe(this.dashScale),
								dashSize: ThreeUtil.getTypeSafe(this.dashSize),
								dashOffset: ThreeUtil.getTypeSafe(this.dashOffset),
								gapSize: ThreeUtil.getTypeSafe(this.gapSize),
								linewidth: ThreeUtil.getTypeSafe(this.linewidth),
								resolution: this.getResolution(),
							})
						);
						break;
					case 'spritematerial':
					case 'sprite':
						const parametersSpriteMaterial: THREE.SpriteMaterialParameters = {
							color: this.getColor(),
							map: this.getTexture('map'),
							alphaMap: this.getTexture('alphaMap'),
							rotation: ThreeUtil.getAngleSafe(this.rotation),
							sizeAttenuation: ThreeUtil.getTypeSafe(this.sizeAttenuation),
						};
						material = new THREE_MAT.NgxSpriteMaterial(
							this.getMaterialParameters(parametersSpriteMaterial)
						);
						break;
					case 'standardnodematerial':
					case 'standardnode':
						const standardNodeMaterial =
							new THREE_MAT.NgxStandardNodeMaterial();
						if (ThreeUtil.isNotNull(this.side)) {
							standardNodeMaterial.side = ThreeUtil.getSideSafe(this.side);
						}
						if (ThreeUtil.isNotNull(this.metalness)) {
							standardNodeMaterial.metalness = this.getFloatNode(
								ThreeUtil.getTypeSafe(this.metalness)
							);
						}
						if (ThreeUtil.isNotNull(this.reflectivity)) {
							standardNodeMaterial.reflectivity = this.getFloatNode(
								ThreeUtil.getTypeSafe(this.reflectivity)
							);
						}
						if (ThreeUtil.isNotNull(this.clearcoat)) {
							standardNodeMaterial.clearcoat = this.getFloatNode(
								ThreeUtil.getTypeSafe(this.clearcoat)
							);
						}
						if (ThreeUtil.isNotNull(this.clearcoatRoughness)) {
							standardNodeMaterial.clearcoatRoughness = this.getFloatNode(
								ThreeUtil.getTypeSafe(this.clearcoatRoughness)
							);
						}
						if (ThreeUtil.isNotNull(this.emissive)) {
							standardNodeMaterial.emissive = this.getColorNode(
								this.getEmissive()
							);
						}
						if (ThreeUtil.isNotNull(this.roughness)) {
							standardNodeMaterial.roughness = this.getFloatNode(
								ThreeUtil.getTypeSafe(this.roughness)
							);
						}
						if (ThreeUtil.isNotNull(this.color)) {
							standardNodeMaterial.color = this.getColorNode(this.getColor());
						}
						material = standardNodeMaterial;
						break;
					case 'basicnode':
					case 'basicnodematerial':
						const basicNodeMaterial = new THREE_MAT.NgxBasicNodeMaterial();
						material = basicNodeMaterial;
						break;
					case 'meshstandardnode':
					case 'meshstandardnodematerial':
						const meshStandardNodeMaterial =
							new THREE_MAT.NgxMeshStandardNodeMaterial();
						const diffuseMap = this.getTexture('diffuseMap');
						if (ThreeUtil.isNotNull(diffuseMap)) {
							meshStandardNodeMaterial.color = this.getOperatorNode(
								this.getTextureNode(diffuseMap),
								this.getVector3Node(this.getDiffuseColor(0xffffff)),
								'*'
							);
						} else {
							if (ThreeUtil.isNotNull(this.color)) {
								meshStandardNodeMaterial.color = this.getColorNode(
									this.getColor()
								);
							}
						}
						if (ThreeUtil.isNotNull(this.roughness)) {
							meshStandardNodeMaterial.roughness = this.getFloatNode(
								ThreeUtil.getTypeSafe(this.roughness)
							);
						}
						if (ThreeUtil.isNotNull(this.metalness)) {
							meshStandardNodeMaterial.metalness = this.getFloatNode(
								ThreeUtil.getTypeSafe(this.metalness)
							);
						}
						if (
							ThreeUtil.isNotNull(this.normalScale) ||
							ThreeUtil.isNotNull(this.normalScaleX) ||
							ThreeUtil.isNotNull(this.normalScaleY)
						) {
							meshStandardNodeMaterial.normalScale = this.getVector2Node(
								this.getNormalScale()
							);
						}
						material = meshStandardNodeMaterial;
						break;
					case 'phongnodematerial':
					case 'phongnode':
						const phongNodeMaterial = new THREE_MAT.NgxPhongNodeMaterial();
						if (ThreeUtil.isNotNull(this.color)) {
							phongNodeMaterial.color = this.getColorNode(this.getColor());
						}
						// phongNodeMaterial.alpha: Node;
						// phongNodeMaterial.specular: Node;
						// phongNodeMaterial.shininess: Node;
						const normalMapPhongNodeMaterial = this.getTexture('normalMap');
						if (ThreeUtil.isNotNull(normalMapPhongNodeMaterial)) {
							phongNodeMaterial.normal = new THREE_MAT.NgxNormalMapNode(
								this.getTextureNode(normalMapPhongNodeMaterial)
							);
						}
						// phongNodeMaterial.emissive: Node;
						// phongNodeMaterial.ambient: Node;
						// phongNodeMaterial.light: Node;
						// phongNodeMaterial.shadow: Node;
						// phongNodeMaterial.ao: Node;
						phongNodeMaterial.environment = this.getEnvironment();
						phongNodeMaterial.environmentAlpha = this.getEnvironmentAlpha();
						// phongNodeMaterial.mask: Node;
						// phongNodeMaterial.position: Node;
						const nodeFrame = this.getNodeFrame(0);
						this.subscribeRefer(
							'phongnodeUpdate',
							ThreeUtil.getUpdateSubscribe().subscribe(
								(timer: RendererTimer) => {
									nodeFrame
										.update(timer.delta)
										.updateNode(phongNodeMaterial as any);
								}
							)
						);
						material = phongNodeMaterial;
						break;
					case 'spritenodematerial':
					case 'spritenode':
						const spriteNodeMaterial = new THREE_MAT.NgxSpriteNodeMaterial();
						material = spriteNodeMaterial;
						break;
					case 'meshlambertmaterial':
					case 'meshlambert':
					case 'lambertmaterial':
					case 'lambert':
					default:
						const parametersMeshLambertMaterial: THREE.MeshLambertMaterialParameters =
							{
								color: this.getColor(),
								emissive: this.getEmissive(),
								emissiveIntensity: ThreeUtil.getTypeSafe(
									this.emissiveIntensity
								),
								emissiveMap: this.getTexture('emissiveMap'),
								map: this.getTexture('map'),
								lightMap: this.getTexture('lightMap'),
								lightMapIntensity: ThreeUtil.getTypeSafe(
									this.lightMapIntensity
								),
								aoMap: this.getTexture('aoMap'),
								aoMapIntensity: ThreeUtil.getTypeSafe(this.aoMapIntensity),
								specularMap: this.getTexture('specularMap'),
								alphaMap: this.getTexture('alphaMap'),
								envMap: this.getTexture('envMap'),
								combine: ThreeUtil.getCombineSafe(this.combine, 'multiply'),
								reflectivity: ThreeUtil.getTypeSafe(this.reflectivity),
								refractionRatio: ThreeUtil.getTypeSafe(this.refractionRatio),
								wireframe: ThreeUtil.getTypeSafe(this.wireframe),
								wireframeLinewidth: ThreeUtil.getTypeSafe(
									this.wireframeLinewidth
								),
								wireframeLinecap: ThreeUtil.getTypeSafe(
									this.wireframeLinecap,
									'round'
								),
								wireframeLinejoin: ThreeUtil.getTypeSafe(
									this.wireframeLinejoin,
									'round'
								),
								// skinning: this.getSkinning(),
								// morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
								// morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
							};
						const meshLambertMaterial = new THREE_MAT.NgxMeshLambertMaterial(
							this.getMaterialParameters(parametersMeshLambertMaterial)
						);
						material = meshLambertMaterial;
						break;
				}
			}
			this.setMaterial(material);
		}
		return this.material as T;
	}

	/**
	 * Node frame of material component
	 */
	private _nodeFrame: any = null;

	/**
	 * Updates node
	 * @param delta
	 */
	public updateNode(delta: any) {
		if (this.material instanceof THREE_MAT.NODES.NodeMaterial) {
			if (this._nodeFrame === null) {
				this._nodeFrame = new THREE_MAT.NODES.NodeFrame(0);
			}
			this._nodeFrame.update(delta).updateNode(this.material);
		}
	}
}
