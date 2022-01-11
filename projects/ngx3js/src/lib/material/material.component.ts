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
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { NgxLocalStorageService } from '../local-storage.service';
import { NgxAbstractMaterialComponent } from '../material.abstract';
import { INgxColor, INgxTexture, INgxUniforms, IRendererTimer, IShaderType } from '../ngx-interface';
import { NgxShaderComponent } from '../shader/shader.component';
import { ShaderUtils } from '../shader/shaders/shaderUtils';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxAbstractTextureComponent } from '../texture.abstract';
import * as NGX_MATERIAL from './index';

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
 * |   Common Three Type        | Common Type Key           | Acceptable Input          |
 * |:--------------------------|:--------------------------|:--------------------------|
 * | Boolean | alphaToCoverage | true, false |
 * | THREE.Blending | blending | NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending |
 * | THREE.BlendingDstFactor | blendDst | ZeroFactor, OneFactor, SrcColorFactor, OneMinusSrcColorFactor, SrcAlphaFactor, OneMinusSrcAlphaFactor, DstAlphaFactor, OneMinusDstAlphaFactor, DstColorFactor, OneMinusDstColorFactor |
 * | Number | blendDstAlpha | 0.0~1.0 |
 * | THREE.BlendingEquation | blendEquation | AddEquation, SubtractEquation, ReverseSubtractEquation, MinEquation, MaxEquation |
 * | Number | blendEquationAlpha | 0.0~1.0 |
 * | THREE.BlendingSrcFactor | blendSrc | SrcAlphaSaturateFactor |
 * | Number | blendSrcAlpha | 0.0~1.0 |
 * | Boolean | clipIntersection | true, false |
 * | THREE.Plane[] | clippingPlanes | Array |
 * | Boolean | clipShadows | true, false |
 * | Boolean | colorWrite | true, false |
 * | Any | defines | any |
 * | THREE.DepthModes | depthFunc | NeverDepth, AlwaysDepth, LessDepth, LessEqualDepth, EqualDepth, GreaterEqualDepth, NotEqualDepth |
 * | Boolean | depthTest | true, false |
 * | Boolean | depthWrite | true, false |
 * | Boolean | fog | true, false |
 * | Number | opacity | 0.0~1.0 |
 * | Boolean | polygonOffset | true, false |
 * | Number | polygonOffsetFactor | any |
 * | Number | polygonOffsetUnits | any |
 * | String | precision | highp, mediump, lowp |
 * | Number | premultipliedAlpha | any |
 * | Boolean | dithering | true, false |
 * | THREE.Side | shadowSide | FrontSide, BackSide, DoubleSide |
 * | Boolean | toneMapped | true, false |
 * | Boolean | transparent | true, false |
 * | Boolean | stencilWrite | true, false |
 * | THREE.StencilFunc | stencilFunc | 	NeverStencilFunc, LessStencilFunc, EqualStencilFunc, LessEqualStencilFunc, GreaterStencilFunc, NotEqualStencilFunc, GreaterEqualStencilFunc, AlwaysStencilFunc |
 * | Number | stencilRef | any |
 * | Number | stencilWriteMask | any |
 * | Number | stencilFuncMask | any |
 * | THREE.StencilOp | stencilFail | ZeroStencilOp, KeepStencilOp, ReplaceStencilOp, IncrementStencilOp, DecrementStencilOp, IncrementWrapStencilOp, DecrementWrapStencilOp, InvertStencilOp |
 * | THREE.StencilOp | stencilZFail | ZeroStencilOp, KeepStencilOp, ReplaceStencilOp, IncrementStencilOp, DecrementStencilOp, IncrementWrapStencilOp, DecrementWrapStencilOp, InvertStencilOp |
 * | THREE.StencilOp | stencilZPass | ZeroStencilOp, KeepStencilOp, ReplaceStencilOp, IncrementStencilOp, DecrementStencilOp, IncrementWrapStencilOp, DecrementWrapStencilOp, InvertStencilOp |
 * | Boolean | alphaTest | true, false |
 * | THREE.Side | side | FrontSide, BackSide, DoubleSide |
 * | Boolean | vertexColors | true, false |
 * | Boolean | visible | true, false |
 * 
 * |   Three Type               | Type Value | Acceptable Input |
 * |:--------------------------|:--------------------------|:--------------------------|
 * | THREE.LineBasicMaterial | LineBasicMaterial, LineBasic | color, linewidth, linecap, linejoin |
 * | THREE.LineDashedMaterial | LineDashedMaterial, LineDashed | color, linewidth, linecap, linejoin, vertexColors, dashSize, gapSize, scale |
 * | THREE.MeshBasicMaterial | MeshBasicMaterial, MeshBasic | color, aoMapIntensity, refractionRatio, wireframe, wireframeLinewidth, reflectivity, combine, wireframeLinecap, wireframeLinejoin, map, aoMap, specularMap, alphaMap, envMap |
 * | THREE.MeshDepthMaterial | MeshDepthMaterial, MeshDepth | map, alphaMap, depthPacking, displacementMap, displacementScale, displacementBias, wireframe, wireframeLinewidth |
 * | THREE.MeshDistanceMaterial | MeshDistanceMaterial, MeshDistance | map, alphaMap, displacementMap, displacementScale, displacementBias, farDistance, nearDistance, referencePosition |
 * | THREE.MeshMatcapMaterial | MeshMatcapMaterial, MeshMatcap | color, matcap, map, alphaMap, bumpMap, bumpScale, normalMap, normalMapType, normalScale, displacementMap, displacementScale, displacementBias, flatShading |
 * | THREE.MeshNormalMaterial | MeshNormalMaterial, MeshNormal | bumpMap, bumpScale, normalMap, normalMapType, normalScale, displacementMap, displacementScale, displacementBias, wireframe, wireframeLinewidth, flatShading |
 * | THREE.MeshPhongMaterial | MeshPhongMaterial, MeshPhong | color, map, lightMap, lightMapIntensity, aoMap, aoMapIntensity, emissive, emissiveIntensity, emissiveMap, bumpMap, bumpScale, normalMap, normalMapType, normalScale, displacementMap, displacementScale, displacementBias, alphaMap, envMap, refractionRatio, wireframe, wireframeLinewidth, reflectivity, specular, shininess, specularMap, combine, wireframeLinecap, wireframeLinejoin, flatShading |
 * | THREE.MeshPhysicalMaterial | MeshPhysicalMaterial, MeshPhysical | color, roughness, metalness, map, lightMap, lightMapIntensity, aoMap, aoMapIntensity, emissive, emissiveIntensity, emissiveMap, bumpMap, bumpScale, normalMap, normalMapType, normalScale, displacementMap, displacementScale, displacementBias, roughnessMap, metalnessMap, alphaMap, envMap, envMapIntensity, refractionRatio, wireframe, wireframeLinewidth, clearcoat, , clearcoatRoughness, clearcoatNormalScale, clearcoatNormalMap, reflectivity, transmission, thickness |
 * | THREE.MeshStandardMaterial | MeshStandardMaterial, MeshStandard | color, roughness, metalness, map, lightMap, lightMapIntensity, aoMap, aoMapIntensity, emissive, emissiveIntensity, emissiveMap, bumpMap, bumpScale, normalMap, normalMapType, normalScale, displacementMap, displacementScale, displacementBias, roughnessMap, metalnessMap, alphaMap, envMap, envMapIntensity, refractionRatio, wireframe, wireframeLinewidth, flatShading |
 * | THREE.MeshToonMaterial | MeshToonMaterial, MeshToon | color, gradientMap, map, lightMap, lightMapIntensity, aoMap, aoMapIntensity, emissive, emissiveIntensity, emissiveMap, bumpMap, bumpScale, normalMap, normalMapType, normalScale, displacementMap, displacementScale, displacementBias, alphaMap, wireframe, wireframeLinewidth, wireframeLinecap, wireframeLinejoin |
 * | THREE.PointsMaterial | PointsMaterial, Points | color, map, alphaMap, size, sizeAttenuation |
 * | THREE.RawShaderMaterial | RawShaderMaterial, RawShader | uniforms, vertexShader, fragmentShader, linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions |
 * | THREE.ShaderMaterial | ShaderMaterial, Shader | uniforms, vertexShader, fragmentShader, linewidth, wireframe, wireframeLinewidth, lights, clipping |
 * | THREE.ShadowMaterial | ShadowMaterial, Shadow | color |
 * | THREE.SpriteMaterial | SpriteMaterial, Sprite | color, map, alphaMap, rotation, sizeAttenuation |
 * | THREE.LineMaterial | LineMaterial, Line | color, dashed, dashScale, dashSize, dashOffset, gapSize, linewidth, resolution |
 * | THREE.StandardNodeMaterial | StandardNodeMaterial, StandardNode | color, metalness, reflectivity, clearcoat, clearcoatRoughness, emissive, roughness |
 * | THREE.BasicNodeMaterial | BasicNodeMaterial, BasicNode | |
 * | THREE.MeshStandardNodeMaterial | MeshStandardNodeMaterial, MeshStandardNode | diffuseMap, color, roughness, metalness, normalScale, |
 * | THREE.PhongNodeMaterial | PhongNodeMaterial, PhongNode | color, normalMap, environmentAlpha |
 * | THREE.SpriteNodeMaterial | SpriteNodeMaterial, SpriteNode | |
 * | THREE.MeshLambertMaterial | MeshLambertMaterial, MeshLambert | color, emissive, emissiveIntensity, emissiveMap, map, lightMap, lightMapIntensity, aoMap, aoMapIntensity, specularMap, alphaMap, envMap, combine, reflectivity, refractionRatio, wireframe, wireframeLinewidth, wireframeLinecap, wireframeLinejoin |
 * | THREE.NgxShaderAttributesParticlesMaterial  | ShaderAttributesParticlesMaterial, ShaderAttributesParticles | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderSelectiveDrawMaterial  | ShaderSelectiveDrawMaterial, ShaderSelectiveDraw | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderCustomAttributesMaterial  | ShaderCustomAttributesMaterial, ShaderCustomAttributes | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderCustomAttributesLinesMaterial  | ShaderCustomAttributesLinesMaterial, ShaderCustomAttributesLines | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderCustomAttributesPointsMaterial  | ShaderCustomAttributesPointsMaterial, ShaderCustomAttributesPoints | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderAttributeSizeColorMaterial  | ShaderAttributeSizeColorMaterial, ShaderAttributeSizeColor | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderAttributeSizeColor1Material  | ShaderAttributeSizeColor1Material, ShaderAttributeSizeColor1 | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderSkyDomeMaterial  | ShaderSkyDomeMaterial, ShaderSkyDome | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderParallaxMaterial  | ShaderParallaxMaterial, ShaderParallax | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderFresnelMaterial  | ShaderFresnelMaterial, ShaderFresnel | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderSubsurfaceScatteringMaterial  | ShaderSubsurfaceScatteringMaterial, ShaderSubsurfaceScattering | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderWireframeMaterial  | ShaderWireframeMaterial, ShaderWireframe | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderNoiseRandom1DMaterial  | ShaderNoiseRandom1DMaterial, ShaderNoiseRandom1D | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderNoiseRandom2DMaterial  | ShaderNoiseRandom2DMaterial, ShaderNoiseRandom2D | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderNoiseRandom3DMaterial  | ShaderNoiseRandom3DMaterial, ShaderNoiseRandom3D | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderColorRainbowMaterial  | ShaderColorRainbowMaterial, ShaderColorRainbow | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderVideoKinectMaterial  | ShaderVideoKinectMaterial, ShaderVideoKinect | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderVolumeRenderShader1Material  | ShaderVolumeRenderShader1Material, ShaderVolumeRenderShader1 | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderInstancingMaterial  | ShaderInstancingMaterial, ShaderInstancing | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderScaleColorMaterial  | ShaderScaleColorMaterial, ShaderScaleColor | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderSinColorMaterial  | ShaderSinColorMaterial, ShaderSinColor | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderRaymarchingReflectMaterial  | ShaderRaymarchingReflectMaterial, ShaderRaymarchingReflect | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderCloudMaterial  | ShaderCloudMaterial, ShaderCloud | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
 * | THREE.NgxShaderPerlinMaterial  | ShaderPerlinMaterial, ShaderPerlin | linewidth, wireframe, wireframeLinewidth, lights, clipping, glslVersion, extensions, uniforms |
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
			provide: NgxAbstractMaterialComponent,
			useExisting: forwardRef(() => NgxMaterialComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxMaterialComponent),
		},
	],
})
export class NgxMaterialComponent extends NgxAbstractMaterialComponent implements OnInit, OnDestroy, OnChanges {
	/**
	 * The type if matrial.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.LineBasicMaterial | LineBasicMaterial, LineBasic |
	 * | THREE.LineDashedMaterial | LineDashedMaterial, LineDashed |
	 * | THREE.MeshBasicMaterial | MeshBasicMaterial, MeshBasic |
	 * | THREE.MeshDepthMaterial | MeshDepthMaterial, MeshDepth, |
	 * | THREE.MeshDistanceMaterial | MeshDistanceMaterial, MeshDistance, |
	 * | THREE.MeshMatcapMaterial | MeshMatcapMaterial, MeshMatcap, |
	 * | THREE.MeshNormalMaterial | MeshNormalMaterial, MeshNormal, |
	 * | THREE.MeshPhongMaterial | MeshPhongMaterial, MeshPhong, |
	 * | THREE.MeshPhysicalMaterial | MeshPhysicalMaterial, MeshPhysical, |
	 * | THREE.MeshStandardMaterial | MeshStandardMaterial, MeshStandard, |
	 * | THREE.MeshToonMaterial | MeshToonMaterial, MeshToon, |
	 * | THREE.PointsMaterial | PointsMaterial, Points, |
	 * | THREE.RawShaderMaterial | RawShaderMaterial, RawShader, |
	 * | THREE.ShaderMaterial | ShaderMaterial, Shader, |
	 * | THREE.ShadowMaterial | ShadowMaterial, Shadow, |
	 * | THREE.SpriteMaterial | SpriteMaterial, Sprite, |
	 * | THREE.StandardNodeMaterial | StandardNodeMaterial, StandardNode, |
	 * | THREE.BasicNodeMaterial | BasicNodeMaterial, BasicNode, |
	 * | THREE.MeshStandardNodeMaterial | MeshStandardNodeMaterial, MeshStandardNode, |
	 * | THREE.PhongNodeMaterial | PhongNodeMaterial, PhongNode, |
	 * | THREE.SpriteNodeMaterial | SpriteNodeMaterial, SpriteNode, |
	 * | THREE.MeshLambertMaterial | MeshLambertMaterial, MeshLambert |
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
	@Input() public color: INgxColor = null;

	/**
	 * Color of the material multiply (1)
	 */
	@Input() public colorMultiply: number = null;

	/**
	 * Color of the material, by default set to white (0xffffff).
	 */
	@Input() public diffuseColor: INgxColor = null;

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
	@Input() public shader: string | IShaderType = null;

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
	@Input() public uniforms: INgxUniforms = null;

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
	@Input() public specular: INgxColor = null;

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
	@Input() public emissive: INgxColor = null;

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
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.MultiplyOperation | MultiplyOperation, Multiply |
	 * | THREE.MixOperation | MixOperation, Mix |
	 * | THREE.AddOperation | AddOperation, Add |
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
	@Input() public sheen: INgxColor = null;

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
	@Input() public envMap: INgxTexture = null;

	/**
	 * The color map. Default is  null.
	 */
	@Input() public map: INgxTexture = null;

	/**
	 * The matcap map. Default is null.
	 */
	@Input() public matcap: INgxTexture = null;

	/**
	 * Specular map used by the material. Default is null.
	 */
	@Input() public specularMap: INgxTexture = null;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 */
	@Input() public alphaMap: INgxTexture = null;

	/**
	 * The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights.
	 * Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored.
	 */
	@Input() public bumpMap: INgxTexture = null;

	/**
	 * The texture to create a normal map. The RGB values affect the surface normal for each pixel fragment and change the way the color is lit. Normal maps do not change the actual shape of the surface, only the lighting.
	 * In case the material has a normal map authored using the left handed convention, the y component of normalScale should be negated to compensate for the different handedness.
	 */
	@Input() public normalMap: INgxTexture = null;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows, block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 */
	@Input() public displacementMap: INgxTexture = null;

	/**
	 * Can be used to enable independent normals for the clear coat layer. Default is *null*.
	 */
	@Input() public clearcoatNormalMap: INgxTexture = null;

	/**
	 * The green channel of this texture is used to alter the roughness of the material.
	 */
	@Input() public roughnessMap: INgxTexture = null;

	/**
	 * The light map. Default is null. The lightMap requires a second set of UVs.
	 */
	@Input() public lightMap: INgxTexture = null;

	/**
	 * The red channel of this texture is used as the ambient occlusion map. Default is null.
	 * The aoMap requires a second set of UVs.
	 */
	@Input() public aoMap: INgxTexture = null;

	/**
	 * The red channel of this texture is used as the ambient occlusion map. Default is null.
	 * The aoMap requires a second set of UVs.
	 */
	@Input() public diffuseMap: INgxTexture = null;

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
	@ContentChildren(NgxAbstractTextureComponent)
	protected textureList: QueryList<NgxAbstractTextureComponent>;

	/**
	 * Content children of material component
	 */
	@ContentChildren(NgxShaderComponent) private shaderList: QueryList<NgxShaderComponent>;

	/**
	 * Creates an instance of material component.
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
	private getEmissive(def?: INgxColor): I3JS.Color {
		return NgxThreeUtil.getColorMultiplySafe(this.emissive, def, this.emissiveMultiply);
	}

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 *
	 * @param def
	 * @returns
	 */
	private getNormalScale(def?: I3JS.Vector2): I3JS.Vector2 {
		return NgxThreeUtil.getVector2Safe(
			NgxThreeUtil.getTypeSafe(this.normalScaleX, this.normalScale, 1),
			NgxThreeUtil.getTypeSafe(this.normalScaleY, this.normalScale, 1),
			def
		);
	}

	/**
	 * Gets reference position
	 * @param [def]
	 * @returns reference position
	 */
	private getReferencePosition(def?: I3JS.Vector3): I3JS.Vector3 {
		return NgxThreeUtil.getVector3Safe(this.referencePositionX, this.referencePositionY, this.referencePositionZ, def);
	}

	/**
	 * Gets clearcoat normal scale
	 * @param [def]
	 * @returns clearcoat normal scale
	 */
	private getClearcoatNormalScale(def?: I3JS.Vector2): I3JS.Vector2 {
		return NgxThreeUtil.getVector2Safe(
			NgxThreeUtil.getTypeSafe(this.clearcoatNormalScaleX, this.clearcoatNormalScale),
			NgxThreeUtil.getTypeSafe(this.clearcoatNormalScaleY, this.clearcoatNormalScale),
			def
		);
	}

	/**
	 * [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Color) of the material, by default set to white (0xffffff).
	 *
	 * @param def
	 * @returns
	 */
	private getColor(def?: INgxColor): I3JS.Color {
		return NgxThreeUtil.getColorMultiplySafe(this.color, def, this.colorMultiply);
	}

	/**
	 * [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/math/Color) of the material, by default set to white (0xffffff).
	 *
	 * @param def
	 * @returns
	 */
	private getDiffuseColor(def?: INgxColor): I3JS.Color {
		return NgxThreeUtil.getColorMultiplySafe(this.diffuseColor, def, this.diffuseColorMultiply);
	}

	/**
	 * Gets sheen
	 * @param [def]
	 * @returns sheen
	 */
	private getSheen(def?: INgxColor): I3JS.Color {
		return NgxThreeUtil.getColorMultiplySafe(this.sheen, def, this.sheenMultiply);
	}

	/**
	 * Gets specular
	 * @param [def]
	 * @returns specular
	 */
	private getSpecular(def?: INgxColor): I3JS.Color {
		return NgxThreeUtil.getColorMultiplySafe(this.specular, def, this.specularMultiply);
	}

	/**
	 * The getter Color Node
	 *
	 * @param color
	 * @returns
	 */
	private getColorNode(color?: I3JS.Color): any {
		return new N3JS.ColorNode(color);
	}

	/**
	 * The getter Float Node
	 *
	 * @param value
	 * @returns
	 */
	private getFloatNode(value?: number): I3JS.FloatNode {
		return new N3JS.FloatNode(value);
	}

	/**
	 * The getter Int Node
	 *
	 * @param value
	 * @returns
	 */
	private getIntNode(value?: number): I3JS.IntNode {
		return new N3JS.IntNode(value);
	}

	/**
	 * The getter Bool Node
	 *
	 * @param value
	 * @returns
	 */
	private getBoolNode(value?: boolean): I3JS.BoolNode {
		return new N3JS.BoolNode(value);
	}

	/**
	 * The getter Matrix3 Node
	 *
	 * @param matrix
	 * @returns
	 */
	private getMatrix3Node(matrix?: I3JS.Matrix3): I3JS.Matrix3Node {
		return new N3JS.Matrix3Node(matrix);
	}

	/**
	 * The getter Matrix4 Node
	 *
	 * @param matrix
	 * @returns
	 */
	private getMatrix4Node(matrix?: I3JS.Matrix4): I3JS.Matrix4Node {
		return new N3JS.Matrix4Node(matrix);
	}

	/**
	 * The getter Property Node
	 *
	 * @param object
	 * @param property
	 * @param type
	 * @returns
	 */
	private getPropertyNode(object: object, property: string, type: string): I3JS.PropertyNode {
		return new N3JS.PropertyNode(object, property, type);
	}

	/**
	 * The getter Screen Node
	 *
	 * @param uv
	 * @returns
	 */
	private getScreenNode(uv?: I3JS.UVNode): I3JS.ScreenNode {
		return new N3JS.ScreenNode(uv);
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
		value: I3JS.Texture,
		uv?: I3JS.UVNode,
		bias?: I3JS.NodeNode,
		project?: boolean
	): I3JS.TextureNode {
		return new N3JS.TextureNode(value, uv, bias, project);
	}

	/**
	 * The getter CubeTexture Node
	 *
	 * @param value
	 * @param uv
	 * @param bias
	 * @returns
	 */
	private getCubeTextureNode(value: I3JS.CubeTexture, uv?: I3JS.UVNode, bias?: I3JS.NodeNode): I3JS.CubeTextureNode {
		return new N3JS.CubeTextureNode(value, uv, bias);
	}

	/**
	 * The getter Reflector Node
	 *
	 * @param mirror
	 * @returns
	 */
	private getReflectorNode(mirror: I3JS.ReflectorRTT): I3JS.ReflectorNode {
		return new N3JS.ReflectorNode(mirror);
	}

	/**
	 * The getter Switch Node
	 *
	 * @param node
	 * @param components
	 * @returns
	 */
	private getSwitchNode(node: I3JS.NodeNode, components?: string): I3JS.SwitchNode {
		return new N3JS.SwitchNode(node, components);
	}

	/**
	 * The getter ReflectorRTT
	 *
	 * @param geometry
	 * @param options
	 * @returns
	 */
	private getReflectorRTT(geometry: I3JS.BufferGeometry, options?: I3JS.ReflectorOptions): I3JS.ReflectorRTT {
		return new N3JS.ReflectorRTT(geometry, options);
	}

	/**
	 * The getter NodeFrame
	 *
	 * @param time
	 * @returns
	 */
	private getNodeFrame(time: number = 0): I3JS.NodeFrame {
		return new N3JS.NodeFrame(time);
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
		a: I3JS.NodeNode,
		b: I3JS.NodeNode,
		op: string,
		ifNode?: I3JS.NodeNode,
		elseNode?: I3JS.NodeNode
	): I3JS.CondNode {
		return new N3JS.CondNode(a, b, op, ifNode, elseNode);
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
		a: I3JS.NodeNode,
		bOrMethod: I3JS.NodeNode | string,
		cOrMethod?: I3JS.NodeNode | string,
		method?: string
	): I3JS.MathNode {
		return new N3JS.MathNode(a, bOrMethod, cOrMethod, method);
	}

	/**
	 * The getter Operator Node
	 *
	 * @param a
	 * @param b
	 * @param op
	 * @returns
	 */
	private getOperatorNode(a: I3JS.NodeNode, b: I3JS.NodeNode, op: string): I3JS.OperatorNode {
		return new N3JS.OperatorNode(a, b, op);
	}

	/**
	 * The getter Timer Node
	 *
	 * @param scale
	 * @param scope
	 * @param timeScale
	 * @returns
	 */
	private getTimerNode(scale?: number, scope?: string, timeScale?: boolean): I3JS.TimerNode {
		return new N3JS.TimerNode(scale, scope, timeScale);
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
	): I3JS.FunctionNode {
		return new N3JS.FunctionNode(src, includes, extensions, keywords, type);
	}

	/**
	 * The getter FunctionCallNode Node
	 *
	 * @param func
	 * @param inputs
	 * @returns
	 */
	private getFunctionCallNode(func: I3JS.FunctionNode, inputs?: I3JS.NodeNode[]): I3JS.FunctionCallNode {
		return new N3JS.FunctionCallNode(func, inputs);
	}

	/**
	 * The getter PositionNode Node
	 *
	 * @param scope
	 * @returns
	 */
	private getPositionNode(scope?: string): I3JS.PositionNode {
		return new N3JS.PositionNode(scope);
	}

	/**
	 * The getter UVNode Node
	 *
	 * @param index
	 * @returns
	 */
	private getUVNode(index?: number): I3JS.UVNode {
		return new N3JS.UVNode(index);
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
		input: I3JS.TextureNode,
		options?: I3JS.RTTNodeOptions
	): I3JS.RTTNode {
		return new N3JS.RTTNode(width, height, input, options);
	}

	/**
	 * The getter Vector2 Node
	 *
	 * @param x
	 * @param y
	 * @returns
	 */
	private getVector2Node(x: number | I3JS.Vector2, y?: number): I3JS.Vector2Node {
		return new N3JS.Vector2Node(x, y);
	}

	/**
	 * The getter Vector3 Node
	 *
	 * @param x
	 * @param y
	 * @param z
	 * @returns
	 */
	private getVector3Node(x: number | I3JS.Vector3 | I3JS.Color, y?: number, z?: number): I3JS.Vector3Node {
		if (x instanceof N3JS.Color) {
			return new N3JS.Vector3Node(x.r, x.g, x.b);
		} else {
			return new N3JS.Vector3Node(x, y, z);
		}
	}

	/**
	 * The getter Vector4 Node
	 *
	 * @param x
	 * @param y
	 * @returns
	 */
	private getVector4Node(x: number, y: number, z: number, w: number): I3JS.Vector4Node {
		return new N3JS.Vector4Node(x, y, z, w);
	}

	/**
	 * Blur mirror of material component
	 */
	private _blurMirror: I3JS.BlurNode = null;

	/**
	 * Gets environment
	 * @returns environment
	 */
	private getEnvironment(): I3JS.NodeNode {
		this._blurMirror = null;
		this.unSubscribeRefer('mirrorSize');
		switch (this.environmentType.toLowerCase()) {
			case 'mirror':
				const size = NgxThreeUtil.getRendererSize().clone().multiplyScalar(window.devicePixelRatio);
				const groundMirror: I3JS.ReflectorRTT = NgxThreeUtil.getMesh(this.reflector) as any;
				const mirror: any = this.getReflectorNode(groundMirror);
				const normalXYFlip = this.getMathNode(
					this.getSwitchNode(this.getTextureNode(this.getTexture('normalMap')), 'xy'),
					N3JS.MathNode.INVERT
				);
				const offsetNormal = this.getOperatorNode(normalXYFlip, this.getFloatNode(0.5), N3JS.OperatorNode.SUB);
				mirror.offset = this.getOperatorNode(
					offsetNormal, // normal
					this.getFloatNode(6), // scale
					N3JS.OperatorNode.MUL
				);
				const blurMirror = new N3JS.BlurNode(mirror);
				blurMirror.size = size;
				const blurMirrorUv: any = new N3JS.ExpressionNode('projCoord.xyz / projCoord.q', 'vec3');
				blurMirrorUv.keywords['projCoord'] = this.getOperatorNode(mirror.offset, mirror.uv, N3JS.OperatorNode.ADD);
				blurMirror.uv = blurMirrorUv;
				blurMirror.radius = this.getVector2Node(0, 0); // .x = blurMirror.radius.y = 0;
				this.subscribeRefer(
					'mirrorSize',
					NgxThreeUtil.getSizeSubscribe().subscribe((v2) => {
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
	private getEnvironmentAlpha(): I3JS.NodeNode {
		switch (this.environmentType.toLowerCase()) {
			case 'mirror':
				return this.getSwitchNode(this.getTextureNode(this.getTexture('diffuseMap')), 'w');
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
		const extensionsList = NgxThreeUtil.getTypeSafe(this.extensions, '').split(',');
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
		def?: { [uniform: string]: I3JS.IUniform },
		targetUniforms?: {
			[key: string]: I3JS.IUniform;
		}
	): {
		[uniform: string]: I3JS.IUniform;
	} {
		const uniforms: {
			[key: string]: I3JS.IUniform;
		} = NgxThreeUtil.getTypeSafe(this.uniforms, def);
		const resultUniforms = targetUniforms ? targetUniforms : ShaderUtils.getUniforms(this.shader);
		Object.entries(uniforms).forEach(([key, value]) => {
			const anyValue: any = value;
			if (
				NgxThreeUtil.isNotNull(value) &&
				NgxThreeUtil.isNotNull(anyValue['type']) &&
				NgxThreeUtil.isNotNull(anyValue['value'])
			) {
				const valueType: string = anyValue['type'];
				const valueValue: any = anyValue['value'];
				switch (valueType.toLowerCase()) {
					case 'projectionmatrixinverse':
					case 'projectionmatrix':
					case 'matrixworldinverse':
					case 'matrixworld':
					case 'matrix':
						if (NgxThreeUtil.isNotNull(valueValue.getObject3d)) {
							this.unSubscribeRefer('unforms_' + key);
							const object3d: I3JS.Object3D = valueValue.getObject3d();
							resultUniforms[key] = {
								value: NgxThreeUtil.getMatrix4Safe(object3d, valueType),
							};
							if (NgxThreeUtil.isNotNull(valueValue.getSubscribe)) {
								this.subscribeRefer(
									'unforms_' + key,
									valueValue.getSubscribe().subscribe((e: any) => {
										resultUniforms[key].value = NgxThreeUtil.getMatrix4Safe(e, valueType);
									})
								);
							}
						} else {
							resultUniforms[key] = {
								value: new N3JS.Matrix4(),
							};
						}
						break;
					case 'vector2':
					case 'v2':
						if (NgxThreeUtil.isNotNull(valueValue.getSize)) {
							this.unSubscribeRefer('unforms_' + key);
							resultUniforms[key] = {
								value: valueValue.getSize(),
							};
							if (NgxThreeUtil.isNotNull(valueValue.sizeSubscribe)) {
								this.subscribeRefer(
									'unforms_' + key,
									valueValue.sizeSubscribe().subscribe((e: any) => {
										resultUniforms[key].value = e;
									})
								);
							}
						} else {
							resultUniforms[key] = {
								value: NgxThreeUtil.getVector2Safe(valueValue[0], valueValue[1], new N3JS.Vector2()),
							};
						}
						break;
					case 'vector3':
					case 'vector':
					case 'v3':
						resultUniforms[key] = {
							value: NgxThreeUtil.getVector3Safe(valueValue[0], valueValue[1], valueValue[2], new N3JS.Vector3()),
						};
						break;
					case 'color':
						resultUniforms[key] = {
							value: NgxThreeUtil.getColorSafe(valueValue, 0xffffff),
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
							value: NgxAbstractTextureComponent.getTextureImageOption(
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
						const textureList: I3JS.Texture[] = [];
						const texturePathList: string[] = [];
						const textureOption = anyValue['options'];
						if (typeof valueValue === 'string') {
							valueValue.split(',').forEach((path) => {
								if (path !== '' && path.length > 3) {
									texturePathList.push(path);
								}
							});
						} else if (NgxThreeUtil.isNotNull(valueValue.forEach)) {
							valueValue.forEach((path: any) => {
								if (path !== '' && path.length > 3) {
									texturePathList.push(path);
								}
							});
						}
						texturePathList.forEach((texturePath) => {
							textureList.push(
								NgxAbstractTextureComponent.getTextureImageOption(texturePath, textureOption, 'texture')
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
			} else if (NgxThreeUtil.isNotNull(value) && value['value'] !== undefined) {
				if (value['value'] instanceof NgxAbstractTextureComponent) {
					resultUniforms[key] = {
						value: value['value'].getTexture(),
					};
				} else {
					resultUniforms[key] = value;
				}
			} else {
				if (value instanceof NgxAbstractTextureComponent) {
					resultUniforms[key] = { value: value.getTexture() };
				} else {
					resultUniforms[key] = { value: value };
				}
			}
		});
		if (NgxThreeUtil.isNotNull(this.textureList)) {
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
							resultUniforms[uniformKey].value[uniformSeqn] = texture.getTexture();
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
	private getShaderMaterialParameters(): I3JS.ShaderMaterialParameters {
		return this.getMaterialParameters({
			linewidth: NgxThreeUtil.getTypeSafe(this.linewidth),
			wireframe: NgxThreeUtil.getTypeSafe(this.wireframe),
			wireframeLinewidth: NgxThreeUtil.getTypeSafe(this.wireframeLinewidth),
			lights: NgxThreeUtil.getTypeSafe(this.lights),
			clipping: NgxThreeUtil.getTypeSafe(this.clipping),
			// skinning: this.getSkinning(),
			// morphTargets: NgxThreeUtil.getTypeSafe(this.morphTargets),
			// morphNormals: NgxThreeUtil.getTypeSafe(this.morphNormals),
		});
	}

	/**
	 * Gets shader material update
	 * @param shaderMaterial
	 * @returns shader material update
	 */
	private getShaderMaterialUpdate(shaderMaterial: I3JS.ShaderMaterial): I3JS.ShaderMaterial {
		this.getUniforms({}, shaderMaterial.uniforms);
		if (NgxThreeUtil.isNotNull(this.glslVersion)) {
			shaderMaterial.glslVersion = NgxThreeUtil.getGlslVersionSafe(this.glslVersion);
		}
		if (NgxThreeUtil.isNotNull(this.extensions)) {
			this.getExtensions(shaderMaterial.extensions);
		}
		this.setAssignUniforms(shaderMaterial.uniforms);
		return shaderMaterial;
	}

	/**
	 * Sets assign uniforms
	 * @param resultUniforms
	 */
	private setAssignUniforms(resultUniforms: { [key: string]: I3JS.IUniform }) {
		if (NgxThreeUtil.isNotNull(this.uniforms)) {
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
	private getResolution(def?: I3JS.Vector2): I3JS.Vector2 {
		return NgxThreeUtil.getVector2Safe(this.resolutionX, this.resolutionY, def);
	}

	/**
	 * Gets shader
	 * @param type
	 * @returns
	 */
	private getShader(type: string) {
		if (type === 'x-shader/x-vertex') {
			if (NgxThreeUtil.isNotNull(this.vertexShader) || NgxThreeUtil.isNotNull(this.shader)) {
				return ShaderUtils.getVertexShader(NgxThreeUtil.getTypeSafe(this.vertexShader, this.shader));
			}
		} else if (type === 'x-shader/x-fragment') {
			if (NgxThreeUtil.isNotNull(this.fragmentShader) || NgxThreeUtil.isNotNull(this.shader)) {
				return ShaderUtils.getFragmentShader(NgxThreeUtil.getTypeSafe(this.fragmentShader, this.shader));
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
	protected getTexture(type: string): I3JS.Texture {
		let texture: I3JS.Texture = null;
		switch (type.toLowerCase()) {
			case 'envmap':
				if (NgxThreeUtil.isNotNull(this.envMap)) {
					texture = this.getTextureOption(this.envMap, 'envMap');
				}
				break;
			case 'diffusemap':
				if (NgxThreeUtil.isNotNull(this.diffuseMap)) {
					texture = this.getTextureOption(this.diffuseMap, 'diffuseMap');
				}
				break;
			case 'map':
				if (NgxThreeUtil.isNotNull(this.map)) {
					texture = this.getTextureOption(this.map, 'map');
				}
				break;
			case 'specularmap':
				if (NgxThreeUtil.isNotNull(this.specularMap)) {
					texture = this.getTextureOption(this.specularMap, 'specularMap');
				}
				break;
			case 'alphamap':
				if (NgxThreeUtil.isNotNull(this.alphaMap)) {
					texture = this.getTextureOption(this.alphaMap, 'alphaMap');
				}
				break;
			case 'bumpmap':
				if (NgxThreeUtil.isNotNull(this.bumpMap)) {
					texture = this.getTextureOption(this.bumpMap, 'bumpMap');
				}
				break;
			case 'normalmap':
				if (NgxThreeUtil.isNotNull(this.normalMap)) {
					texture = this.getTextureOption(this.normalMap, 'normalMap');
				}
				break;
			case 'aomap':
				if (NgxThreeUtil.isNotNull(this.aoMap)) {
					texture = this.getTextureOption(this.aoMap, 'aoMap');
				}
				break;
			case 'displacementmap':
				if (NgxThreeUtil.isNotNull(this.displacementMap)) {
					texture = this.getTextureOption(this.displacementMap, 'displacementMap');
				}
				break;
			case 'clearcoatnormalmap':
				if (NgxThreeUtil.isNotNull(this.clearcoatNormalMap)) {
					texture = this.getTextureOption(this.clearcoatNormalMap, 'clearcoatNormalMap');
				}
				break;
			case 'roughnessmap':
				if (NgxThreeUtil.isNotNull(this.roughnessMap)) {
					texture = this.getTextureOption(this.roughnessMap, 'roughnessMap');
				}
				break;
			case 'lightmap':
				if (NgxThreeUtil.isNotNull(this.lightMap)) {
					texture = this.getTextureOption(this.lightMap, 'lightMap');
				}
				break;
		}
		if (NgxThreeUtil.isNull(texture) && NgxThreeUtil.isNotNull(this.textureList) && this.textureList.length > 0) {
			const foundTexture = this.textureList.find((texture) => {
				return texture.isTexture(type);
			});
			if (NgxThreeUtil.isNotNull(foundTexture)) {
				texture = foundTexture.getTexture();
			}
		}
		if (NgxThreeUtil.isNotNull(texture)) {
			if (texture instanceof N3JS.VideoTexture) {
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
			component: NgxAbstractTextureComponent;
		}[]
	) {
		if (NgxThreeUtil.isNotNull(texture) && this.material !== null) {
			if (texture instanceof NgxAbstractTextureComponent) {
				textureList.push({
					type: textureType,
					component: texture,
				});
			} else if (typeof texture !== 'string'){
				const foundTexture = NgxThreeUtil.getTexture(texture, textureType, false);
				const anyMaterial: any = this.material;
				if (anyMaterial[textureType] !== undefined) {
					if (NgxThreeUtil.isNotNull(foundTexture)) {
						if (this.material instanceof N3JS.NodeMaterial) {
							if (anyMaterial[textureType] instanceof N3JS.TextureNode) {
								anyMaterial[textureType].value = foundTexture;
							} else {
								anyMaterial[textureType] = this.getTextureNode(foundTexture);
							}
						} else {
							anyMaterial[textureType] = foundTexture;
						}
					} else if (anyMaterial[textureType] !== undefined) {
						if (this.material instanceof N3JS.NodeMaterial) {
							if (anyMaterial[textureType] instanceof N3JS.TextureNode) {
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

	private _cachedTextureList: NgxAbstractTextureComponent[] = [];
	private _cachedUniformTextureList: NgxAbstractTextureComponent[] = [];

	/**
	 * Apply changes to material
	 *
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]): void {
		if (this.material !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getMaterial();
				return;
			}
			if (
				!NgxThreeUtil.isOnlyIndexOf(
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
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, ['texture']);
			}
			if (
				NgxThreeUtil.isIndexOf(changes, [
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
				changes = NgxThreeUtil.pushUniq(changes, ['texture']);
			}
			if (NgxThreeUtil.isIndexOf(changes, 'colormultiply')) {
				changes = NgxThreeUtil.pushUniq(changes, ['color']);
			}
			if (NgxThreeUtil.isIndexOf(changes, 'emissivemultiply')) {
				changes = NgxThreeUtil.pushUniq(changes, ['emissive']);
			}
			if (NgxThreeUtil.isIndexOf(changes, 'specularmultiply')) {
				changes = NgxThreeUtil.pushUniq(changes, ['specular']);
			}
			if (NgxThreeUtil.isIndexOf(changes, 'sheenmultiply')) {
				changes = NgxThreeUtil.pushUniq(changes, ['sheen']);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['normalscalex', 'normalscaley'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['normalscale']);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['referencepositionx', 'referencepositiony', 'referencepositionz'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['referenceposition']);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['clearcoatnormalscalex', 'clearcoatnormalscaley'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['clearcoatnormalscale']);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['clearcoatnormalscalex', 'clearcoatnormalscaley'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['clearcoatnormalscale']);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['resolutionx', 'resolutiony'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['resolution']);
			}
			const anyMaterial: any = this.material;
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'uniforms':
						const newUniformTextureList: {
							type: string;
							component: NgxAbstractTextureComponent;
						}[] = [];
						if (NgxThreeUtil.isNotNull(this.uniforms)) {
							const uniforms = this.uniforms;
							Object.entries(uniforms).forEach(([key, value]) => {
								const anyValue: any = value;
								if (
									NgxThreeUtil.isNotNull(value) &&
									NgxThreeUtil.isNotNull(anyValue['type']) &&
									NgxThreeUtil.isNotNull(anyValue['value'])
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
											if (valueValue instanceof NgxAbstractTextureComponent) {
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
								} else if (NgxThreeUtil.isNotNull(value) && value['value'] !== undefined) {
									if (value['value'] instanceof NgxAbstractTextureComponent) {
										newUniformTextureList.push({
											type: 'uniforms.' + key,
											component: value['value'],
										});
									}
								} else {
									if (value instanceof NgxAbstractTextureComponent) {
										newUniformTextureList.push({
											type: 'uniforms.' + key,
											component: value['value'],
										});
									}
								}
							});
						}
						const cachedUniformTextureList: NgxAbstractTextureComponent[] = [];
						newUniformTextureList.forEach((texture) => {
							cachedUniformTextureList.push(texture.component);
						});
						this._cachedUniformTextureList.forEach((texture) => {
							if (cachedUniformTextureList.indexOf(texture) === -1) {
								texture.unsetMaterial(this.selfAny);
							}
						});
						newUniformTextureList.forEach((material) => {
							if (this._cachedUniformTextureList.indexOf(material.component) === -1) {
								material.component.setMaterial(this.selfAny, material.type);
							}
						});
						this._cachedUniformTextureList = cachedUniformTextureList;
						break;
					case 'texture':
						const newTextureList: {
							type: string;
							component: NgxAbstractTextureComponent;
						}[] = [];
						this.synkTexture(this.envMap, 'envMap', newTextureList);
						this.synkTexture(this.matcap, 'matcap', newTextureList);
						this.synkTexture(this.map, 'map', newTextureList);
						this.synkTexture(this.specularMap, 'specularMap', newTextureList);
						this.synkTexture(this.alphaMap, 'alphaMap', newTextureList);
						this.synkTexture(this.bumpMap, 'bumpMap', newTextureList);
						this.synkTexture(this.normalMap, 'normalMap', newTextureList);
						this.synkTexture(this.aoMap, 'aoMap', newTextureList);
						this.synkTexture(this.displacementMap, 'displacementMap', newTextureList);
						if (NgxThreeUtil.isNotNull(this.textureList)) {
							this.textureList.forEach((texture) => {
								newTextureList.push({
									type: 'auto',
									component: texture,
								});
							});
						}
						const cachedTextureList: NgxAbstractTextureComponent[] = [];
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
						if (NgxThreeUtil.isNotNull(this.color) && anyMaterial['color'] !== undefined) {
							if (anyMaterial['color'] instanceof N3JS.ColorNode) {
								anyMaterial['color'].value = this.getColor();
							} else {
								anyMaterial['color'] = this.getColor();
							}
						}
						break;
					case 'lights':
						if (NgxThreeUtil.isNotNull(this.lights) && anyMaterial['lights'] !== undefined) {
							if (anyMaterial['lights'] instanceof N3JS.BoolNode) {
								anyMaterial['lights'].value = NgxThreeUtil.getTypeSafe(this.lights, true);
							} else {
								anyMaterial['lights'] = NgxThreeUtil.getTypeSafe(this.lights, true);
							}
						}
						break;
					case 'clipping':
						if (NgxThreeUtil.isNotNull(this.clipping) && anyMaterial['clipping'] !== undefined) {
							if (anyMaterial['clipping'] instanceof N3JS.BoolNode) {
								anyMaterial['clipping'].value = NgxThreeUtil.getTypeSafe(this.clipping, true);
							} else {
								anyMaterial['clipping'] = NgxThreeUtil.getTypeSafe(this.clipping, true);
							}
						}
						break;
					case 'wireframe':
						if (NgxThreeUtil.isNotNull(this.wireframe) && anyMaterial['wireframe'] !== undefined) {
							if (anyMaterial['wireframe'] instanceof N3JS.BoolNode) {
								anyMaterial['wireframe'].value = NgxThreeUtil.getTypeSafe(this.wireframe, false);
							} else {
								anyMaterial['wireframe'] = NgxThreeUtil.getTypeSafe(this.wireframe, false);
							}
						}
						break;
					case 'specular':
						if (NgxThreeUtil.isNotNull(this.specular) && anyMaterial['specular'] !== undefined) {
							if (anyMaterial['specular'] instanceof N3JS.ColorNode) {
								anyMaterial['specular'].value = this.getSpecular();
							} else {
								anyMaterial['specular'] = this.getSpecular();
							}
						}
						break;
					case 'shininess':
						if (NgxThreeUtil.isNotNull(this.shininess) && anyMaterial['shininess'] !== undefined) {
							if (anyMaterial['shininess'] instanceof N3JS.FloatNode) {
								anyMaterial['shininess'].value = NgxThreeUtil.getTypeSafe(this.shininess, 1);
							} else {
								anyMaterial['shininess'] = NgxThreeUtil.getTypeSafe(this.shininess, 1);
							}
						}
						break;
					case 'lightmapintensity':
						if (NgxThreeUtil.isNotNull(this.lightMapIntensity) && anyMaterial['lightMapIntensity'] !== undefined) {
							if (anyMaterial['lightMapIntensity'] instanceof N3JS.FloatNode) {
								anyMaterial['lightMapIntensity'].value = NgxThreeUtil.getTypeSafe(this.lightMapIntensity, 1);
							} else {
								anyMaterial['lightMapIntensity'] = NgxThreeUtil.getTypeSafe(this.lightMapIntensity, 1);
							}
						}
						break;
					case 'aomapintensity':
						if (NgxThreeUtil.isNotNull(this.aoMapIntensity) && anyMaterial['aoMapIntensity'] !== undefined) {
							if (anyMaterial['aoMapIntensity'] instanceof N3JS.FloatNode) {
								anyMaterial['aoMapIntensity'].value = NgxThreeUtil.getTypeSafe(this.aoMapIntensity, 1);
							} else {
								anyMaterial['aoMapIntensity'] = NgxThreeUtil.getTypeSafe(this.aoMapIntensity, 1);
							}
						}
						break;
					case 'emissive':
						if (NgxThreeUtil.isNotNull(this.emissive) && anyMaterial['emissive'] !== undefined) {
							if (anyMaterial['emissive'] instanceof N3JS.ColorNode) {
								anyMaterial['emissive'].value = this.getEmissive();
							} else {
								anyMaterial['emissive'] = this.getEmissive();
							}
						}
						break;
					case 'emissiveintensity':
						if (NgxThreeUtil.isNotNull(this.emissiveIntensity) && anyMaterial['emissiveIntensity'] !== undefined) {
							if (anyMaterial['emissiveIntensity'] instanceof N3JS.FloatNode) {
								anyMaterial['emissiveIntensity'].value = NgxThreeUtil.getTypeSafe(this.emissiveIntensity, 1);
							} else {
								anyMaterial['emissiveIntensity'] = NgxThreeUtil.getTypeSafe(this.emissiveIntensity, 1);
							}
						}
						break;
					case 'bumpscale':
						if (NgxThreeUtil.isNotNull(this.bumpScale) && anyMaterial['bumpScale'] !== undefined) {
							if (anyMaterial['bumpScale'] instanceof N3JS.FloatNode) {
								anyMaterial['bumpScale'].value = NgxThreeUtil.getTypeSafe(this.bumpScale, 1);
							} else {
								anyMaterial['bumpScale'] = NgxThreeUtil.getTypeSafe(this.bumpScale, 1);
							}
						}
						break;
					case 'normalmaptype':
						if (NgxThreeUtil.isNotNull(this.normalMapType) && anyMaterial['normalMapType'] !== undefined) {
							anyMaterial['normalMapType'] = NgxThreeUtil.getNormalMapTypeSafe(this.normalMapType);
						}
						break;
					case 'normalscale':
						if (NgxThreeUtil.isNotNull(this.roughness) && anyMaterial['normalScale'] !== undefined) {
							if (anyMaterial['normalScale'] instanceof N3JS.Vector2Node) {
								anyMaterial['normalScale'].value = this.getNormalScale();
							} else {
								anyMaterial['normalScale'] = this.getNormalScale();
							}
						}
						break;
					case 'displacementscale':
						if (NgxThreeUtil.isNotNull(this.displacementScale) && anyMaterial['displacementScale'] !== undefined) {
							if (anyMaterial['displacementScale'] instanceof N3JS.FloatNode) {
								anyMaterial['displacementScale'].value = NgxThreeUtil.getTypeSafe(this.displacementScale, 1);
							} else {
								anyMaterial['displacementScale'] = NgxThreeUtil.getTypeSafe(this.displacementScale, 1);
							}
						}
						break;
					case 'displacementbias':
						if (NgxThreeUtil.isNotNull(this.displacementBias) && anyMaterial['displacementBias'] !== undefined) {
							if (anyMaterial['displacementBias'] instanceof N3JS.FloatNode) {
								anyMaterial['displacementBias'].value = NgxThreeUtil.getTypeSafe(this.displacementBias, 1);
							} else {
								anyMaterial['displacementBias'] = NgxThreeUtil.getTypeSafe(this.displacementBias, 1);
							}
						}
						break;
					case 'combine':
						if (NgxThreeUtil.isNotNull(this.combine) && anyMaterial['combine'] !== undefined) {
							anyMaterial['combine'] = NgxThreeUtil.getCombineSafe(this.combine);
						}
						break;
					case 'reflectivity':
						if (NgxThreeUtil.isNotNull(this.reflectivity) && anyMaterial['reflectivity'] !== undefined) {
							if (anyMaterial['reflectivity'] instanceof N3JS.FloatNode) {
								anyMaterial['reflectivity'].value = NgxThreeUtil.getTypeSafe(this.reflectivity, 1);
							} else {
								anyMaterial['reflectivity'] = NgxThreeUtil.getTypeSafe(this.reflectivity, 1);
							}
						}
						break;
					case 'refractionratio':
						if (NgxThreeUtil.isNotNull(this.refractionRatio) && anyMaterial['refractionRatio'] !== undefined) {
							if (anyMaterial['refractionRatio'] instanceof N3JS.FloatNode) {
								anyMaterial['refractionRatio'].value = NgxThreeUtil.getTypeSafe(this.refractionRatio, 1);
							} else {
								anyMaterial['refractionRatio'] = NgxThreeUtil.getTypeSafe(this.refractionRatio, 1);
							}
						}
						break;
					case 'wireframelinewidth':
						if (NgxThreeUtil.isNotNull(this.wireframeLinewidth) && anyMaterial['wireframeLinewidth'] !== undefined) {
							if (anyMaterial['wireframeLinewidth'] instanceof N3JS.FloatNode) {
								anyMaterial['wireframeLinewidth'].value = NgxThreeUtil.getTypeSafe(this.wireframeLinewidth, 1);
							} else {
								anyMaterial['wireframeLinewidth'] = NgxThreeUtil.getTypeSafe(this.wireframeLinewidth, 1);
							}
						}
						break;
					case 'wireframelinecap':
						if (NgxThreeUtil.isNotNull(this.wireframeLinecap) && anyMaterial['wireframeLinecap'] !== undefined) {
							anyMaterial['wireframeLinecap'] = NgxThreeUtil.getTypeSafe(this.wireframeLinecap, 'round');
						}
						break;
					case 'wireframelinejoin':
						if (NgxThreeUtil.isNotNull(this.wireframeLinejoin) && anyMaterial['wireframeLinejoin'] !== undefined) {
							anyMaterial['wireframeLinejoin'] = NgxThreeUtil.getTypeSafe(this.wireframeLinejoin, 'round');
						}
						break;
					case 'morphtargets':
						if (NgxThreeUtil.isNotNull(this.morphTargets) && anyMaterial['morphTargets'] !== undefined) {
							if (anyMaterial['morphTargets'] instanceof N3JS.BoolNode) {
								anyMaterial['morphTargets'].value = NgxThreeUtil.getTypeSafe(this.morphTargets, false);
							} else {
								anyMaterial['morphTargets'] = NgxThreeUtil.getTypeSafe(this.morphTargets, false);
							}
						}
						break;
					case 'morphNormals':
						if (NgxThreeUtil.isNotNull(this.morphNormals) && anyMaterial['morphNormals'] !== undefined) {
							if (anyMaterial['morphNormals'] instanceof N3JS.BoolNode) {
								anyMaterial['morphNormals'].value = NgxThreeUtil.getTypeSafe(this.morphNormals, false);
							} else {
								anyMaterial['morphNormals'] = NgxThreeUtil.getTypeSafe(this.morphNormals, false);
							}
						}
						break;
					case 'linewidth':
						if (NgxThreeUtil.isNotNull(this.linewidth) && anyMaterial['linewidth'] !== undefined) {
							if (anyMaterial['linewidth'] instanceof N3JS.FloatNode) {
								anyMaterial['linewidth'].value = NgxThreeUtil.getTypeSafe(this.linewidth, 1);
							} else {
								anyMaterial['linewidth'] = NgxThreeUtil.getTypeSafe(this.linewidth, 1);
							}
						}
						break;
					case 'linecap':
						if (NgxThreeUtil.isNotNull(this.linecap) && anyMaterial['linecap'] !== undefined) {
							anyMaterial['linecap'] = NgxThreeUtil.getTypeSafe(this.linecap);
						}
						break;
					case 'linejoin':
						if (NgxThreeUtil.isNotNull(this.linejoin) && anyMaterial['linejoin'] !== undefined) {
							anyMaterial['linejoin'] = NgxThreeUtil.getTypeSafe(this.linejoin);
						}

						break;
					case 'scale':
						if (NgxThreeUtil.isNotNull(this.scale) && anyMaterial['scale'] !== undefined) {
							if (anyMaterial['scale'] instanceof N3JS.FloatNode) {
								anyMaterial['scale'].value = NgxThreeUtil.getTypeSafe(this.scale, 1);
							} else {
								anyMaterial['scale'] = NgxThreeUtil.getTypeSafe(this.scale, 1);
							}
						}
						break;
					case 'dashsize':
						if (NgxThreeUtil.isNotNull(this.dashSize) && anyMaterial['dashSize'] !== undefined) {
							if (anyMaterial['dashSize'] instanceof N3JS.FloatNode) {
								anyMaterial['dashSize'].value = NgxThreeUtil.getTypeSafe(this.dashSize, 1);
							} else {
								anyMaterial['dashSize'] = NgxThreeUtil.getTypeSafe(this.dashSize, 1);
							}
						}
						break;
					case 'gapsize':
						if (NgxThreeUtil.isNotNull(this.gapSize) && anyMaterial['gapSize'] !== undefined) {
							if (anyMaterial['gapSize'] instanceof N3JS.FloatNode) {
								anyMaterial['gapSize'].value = NgxThreeUtil.getTypeSafe(this.gapSize, 1);
							} else {
								anyMaterial['gapSize'] = NgxThreeUtil.getTypeSafe(this.gapSize, 1);
							}
						}
						break;
					case 'depthpacking':
						if (NgxThreeUtil.isNotNull(this.depthPacking) && anyMaterial['depthPacking'] !== undefined) {
							anyMaterial['depthPacking'] = NgxThreeUtil.getDepthPackingSafe(this.depthPacking);
						}
						break;
					case 'fardistance':
						if (NgxThreeUtil.isNotNull(this.farDistance) && anyMaterial['farDistance'] !== undefined) {
							if (anyMaterial['farDistance'] instanceof N3JS.FloatNode) {
								anyMaterial['farDistance'].value = NgxThreeUtil.getTypeSafe(this.farDistance, 1);
							} else {
								anyMaterial['farDistance'] = NgxThreeUtil.getTypeSafe(this.farDistance, 1);
							}
						}
						break;
					case 'neardistance':
						if (NgxThreeUtil.isNotNull(this.nearDistance) && anyMaterial['nearDistance'] !== undefined) {
							if (anyMaterial['nearDistance'] instanceof N3JS.FloatNode) {
								anyMaterial['nearDistance'].value = NgxThreeUtil.getTypeSafe(this.nearDistance, 1);
							} else {
								anyMaterial['nearDistance'] = NgxThreeUtil.getTypeSafe(this.nearDistance, 1);
							}
						}
						break;
					case 'referenceposition':
						if (
							NgxThreeUtil.isNotNull(this.referencePositionX) &&
							NgxThreeUtil.isNotNull(this.referencePositionY) &&
							NgxThreeUtil.isNotNull(this.referencePositionZ) &&
							anyMaterial['referencePosition'] !== undefined
						) {
							if (anyMaterial['referencePosition'] instanceof N3JS.Vector3Node) {
								anyMaterial['referencePosition'].value = this.getReferencePosition();
							} else {
								anyMaterial['referencePosition'] = this.getReferencePosition();
							}
						}
						break;
					case 'clearcoat':
						if (NgxThreeUtil.isNotNull(this.clearcoat) && anyMaterial['clearcoat'] !== undefined) {
							if (anyMaterial['clearcoat'] instanceof N3JS.FloatNode) {
								anyMaterial['clearcoat'].value = NgxThreeUtil.getTypeSafe(this.clearcoat, 1);
							} else {
								anyMaterial['clearcoat'] = NgxThreeUtil.getTypeSafe(this.clearcoat, 1);
							}
						}
						break;
					case 'clearcoatroughness':
						if (NgxThreeUtil.isNotNull(this.clearcoatRoughness) && anyMaterial['clearcoatRoughness'] !== undefined) {
							if (anyMaterial['clearcoatRoughness'] instanceof N3JS.FloatNode) {
								anyMaterial['clearcoatRoughness'].value = NgxThreeUtil.getTypeSafe(this.clearcoatRoughness, 1);
							} else {
								anyMaterial['clearcoatRoughness'] = NgxThreeUtil.getTypeSafe(this.clearcoatRoughness, 1);
							}
						}
						break;
					case 'clearcoatNormalScale':
						if (
							NgxThreeUtil.isNotNull(this.clearcoatNormalScale) &&
							NgxThreeUtil.isNotNull(this.clearcoatNormalScaleX) &&
							NgxThreeUtil.isNotNull(this.clearcoatNormalScaleY) &&
							anyMaterial['clearcoatNormalScale'] !== undefined
						) {
							if (anyMaterial['clearcoatNormalScale'] instanceof N3JS.Vector2Node) {
								anyMaterial['clearcoatNormalScale'].value = this.getClearcoatNormalScale();
							} else {
								anyMaterial['clearcoatNormalScale'] = this.getClearcoatNormalScale();
							}
						}
						break;
					case 'sheen':
						if (NgxThreeUtil.isNotNull(this.sheen) && anyMaterial['sheen'] !== undefined) {
							if (anyMaterial['sheen'] instanceof N3JS.ColorNode) {
								anyMaterial['sheen'].value = this.getSheen();
							} else {
								anyMaterial['sheen'] = this.getSheen();
							}
						}
						break;
					case 'transmission':
						if (NgxThreeUtil.isNotNull(this.transmission) && anyMaterial['transmission'] !== undefined) {
							if (anyMaterial['transmission'] instanceof N3JS.FloatNode) {
								anyMaterial['transmission'].value = NgxThreeUtil.getTypeSafe(this.transmission, 1);
							} else {
								anyMaterial['transmission'] = NgxThreeUtil.getTypeSafe(this.transmission, 1);
							}
						}
						break;
					case 'roughness':
						if (NgxThreeUtil.isNotNull(this.roughness) && anyMaterial['roughness'] !== undefined) {
							if (anyMaterial['roughness'] instanceof N3JS.FloatNode) {
								anyMaterial['roughness'].value = NgxThreeUtil.getTypeSafe(this.roughness, 1);
							} else {
								anyMaterial['roughness'] = NgxThreeUtil.getTypeSafe(this.roughness, 1);
							}
						}
						break;
					case 'metalness':
						if (NgxThreeUtil.isNotNull(this.metalness) && anyMaterial['metalness'] !== undefined) {
							if (anyMaterial['metalness'] instanceof N3JS.FloatNode) {
								anyMaterial['metalness'].value = NgxThreeUtil.getTypeSafe(this.metalness, 1);
							} else {
								anyMaterial['metalness'] = NgxThreeUtil.getTypeSafe(this.metalness, 1);
							}
						}

						break;
					case 'envmapintensity':
						if (NgxThreeUtil.isNotNull(this.envMapIntensity) && anyMaterial['envMapIntensity'] !== undefined) {
							if (anyMaterial['envMapIntensity'] instanceof N3JS.FloatNode) {
								anyMaterial['envMapIntensity'].value = NgxThreeUtil.getTypeSafe(this.envMapIntensity, 1);
							} else {
								anyMaterial['envMapIntensity'] = NgxThreeUtil.getTypeSafe(this.envMapIntensity, 1);
							}
						}
						break;
					case 'vertextangents':
						if (NgxThreeUtil.isNotNull(this.vertexTangents) && anyMaterial['vertexTangents'] !== undefined) {
							if (anyMaterial['vertexTangents'] instanceof N3JS.BoolNode) {
								anyMaterial['vertexTangents'].value = NgxThreeUtil.getTypeSafe(this.vertexTangents);
							} else {
								anyMaterial['vertexTangents'] = NgxThreeUtil.getTypeSafe(this.vertexTangents);
							}
						}
						break;
					case 'rotation':
						if (NgxThreeUtil.isNotNull(this.rotation) && anyMaterial['rotation'] !== undefined) {
							if (anyMaterial['rotation'] instanceof N3JS.FloatNode) {
								anyMaterial['rotation'].value = NgxThreeUtil.getAngleSafe(this.rotation);
							} else {
								anyMaterial['rotation'] = NgxThreeUtil.getAngleSafe(this.rotation);
							}
						}
						break;
					case 'size':
						if (NgxThreeUtil.isNotNull(this.size) && anyMaterial['size'] !== undefined) {
							if (anyMaterial['size'] instanceof N3JS.FloatNode) {
								anyMaterial['size'].value = NgxThreeUtil.getTypeSafe(this.size, 1);
							} else {
								anyMaterial['size'] = NgxThreeUtil.getTypeSafe(this.size, 1);
							}
						}
						break;
					case 'sizeattenuation':
						if (NgxThreeUtil.isNotNull(this.sizeAttenuation) && anyMaterial['sizeAttenuation'] !== undefined) {
							if (anyMaterial['sizeAttenuation'] instanceof N3JS.BoolNode) {
								anyMaterial['sizeAttenuation'].value = NgxThreeUtil.getTypeSafe(this.sizeAttenuation);
							} else {
								anyMaterial['sizeAttenuation'] = NgxThreeUtil.getTypeSafe(this.sizeAttenuation);
							}
						}
						break;
					case 'dashed':
						if (NgxThreeUtil.isNotNull(this.dashed) && anyMaterial['dashed'] !== undefined) {
							if (anyMaterial['dashed'] instanceof N3JS.BoolNode) {
								anyMaterial['dashed'].value = NgxThreeUtil.getTypeSafe(this.dashed);
							} else {
								anyMaterial['dashed'] = NgxThreeUtil.getTypeSafe(this.dashed);
							}
						}
						break;
					case 'dashscale':
						if (NgxThreeUtil.isNotNull(this.dashScale) && anyMaterial['dashScale'] !== undefined) {
							if (anyMaterial['dashScale'] instanceof N3JS.FloatNode) {
								anyMaterial['dashScale'].value = NgxThreeUtil.getTypeSafe(this.dashScale, 1);
							} else {
								anyMaterial['dashScale'] = NgxThreeUtil.getTypeSafe(this.dashScale, 1);
							}
						}
						break;
					case 'dashoffset':
						if (NgxThreeUtil.isNotNull(this.dashOffset) && anyMaterial['dashOffset'] !== undefined) {
							if (anyMaterial['dashOffset'] instanceof N3JS.FloatNode) {
								anyMaterial['dashOffset'].value = NgxThreeUtil.getTypeSafe(this.dashOffset, 1);
							} else {
								anyMaterial['dashOffset'] = NgxThreeUtil.getTypeSafe(this.dashOffset, 1);
							}
						}
						break;
					case 'resolution':
						if (
							NgxThreeUtil.isNotNull(this.resolutionX) &&
							NgxThreeUtil.isNotNull(this.resolutionY) &&
							anyMaterial['resolutionX'] !== undefined
						) {
							if (anyMaterial['resolutionX'] instanceof N3JS.Vector2Node) {
								anyMaterial['resolutionX'].value = this.getResolution();
							} else {
								anyMaterial['resolutionX'] = this.getResolution();
							}
						}
						break;
					case 'extensions':
						if (NgxThreeUtil.isNotNull(this.extensions) && anyMaterial['extensions'] !== undefined) {
							anyMaterial['extensions'] = this.getExtensions(anyMaterial['extensions']);
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
	public getMaterial<T extends I3JS.Material>(): T {
		if (this.material === null || this._needUpdate) {
			this.needUpdate = false;
			this.setUserData('storageSource', null);
			let material: I3JS.Material = null;
			if (NgxThreeUtil.isNotNull(this.storageName)) {
				material = new N3JS.MeshLambertMaterial(this.getMaterialParameters({}));
				switch (this.type.toLowerCase()) {
					case 'nodematerial':
					case 'node':
						const modeMateriallibrary: any = {};
						if (NgxThreeUtil.isNotNull(this.storageOption)) {
							Object.entries(this.storageOption).forEach(([key, value]) => {
								const anyValue: any = value;
								if (NgxThreeUtil.isNotNull(anyValue['type']) && NgxThreeUtil.isNotNull(anyValue['value'])) {
									switch (anyValue['type'].toLowerCase()) {
										case 'texture':
											const texture = NgxAbstractTextureComponent.getTextureImageOption(
												anyValue['value'],
												anyValue['options']
											);
											modeMateriallibrary[key] = texture;
											break;
									}
								}
							});
						}
						const nodeMaterialLoader : I3JS.NodeMaterialLoader = NgxThreeUtil.getLoader('nodeMaterialLoader', N3JS.NodeMaterialLoader, modeMateriallibrary);
						nodeMaterialLoader.load(NgxThreeUtil.getStoreUrl(this.storageName), (material: I3JS.Material) => {
							this.setUserData('storageSource', nodeMaterialLoader);
							this.setMaterial(material);
						});
						break;
					default:
						this.localStorageService.getMaterial(
							this.storageName,
							(material: I3JS.Material, storageSource: any) => {
								this.setUserData('storageSource', storageSource);
								this.setMaterial(material);
							},
							this.storageOption
						);
						break;
				}
			} else if (NgxThreeUtil.isNotNull(this.refer)) {
				this.unSubscribeRefer('refer');
				const refMaterial = NgxThreeUtil.getMaterialOne(this.refer);
				if (refMaterial !== null) {
					material = refMaterial.clone();
				}
				this.subscribeRefer(
					'refer',
					NgxThreeUtil.getSubscribe(
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
						const parametersLineBasicMaterial: I3JS.LineBasicMaterialParameters = {
							color: this.getColor(),
							linewidth: NgxThreeUtil.getTypeSafe(this.linewidth),
							linecap: NgxThreeUtil.getTypeSafe(this.linecap),
							linejoin: NgxThreeUtil.getTypeSafe(this.linejoin),
							// morphTargets: NgxThreeUtil.getTypeSafe(this.morphTargets),
						};
						material = new N3JS.LineBasicMaterial(this.getMaterialParameters(parametersLineBasicMaterial));
						break;
					case 'linedashedmaterial':
					case 'linedashed':
						const parametersLineDashedMaterial: I3JS.LineDashedMaterialParameters = {
							color: this.getColor(),
							linewidth: NgxThreeUtil.getTypeSafe(this.linewidth),
							linecap: NgxThreeUtil.getTypeSafe(this.linecap),
							linejoin: NgxThreeUtil.getTypeSafe(this.linejoin),
							vertexColors: this.getVertexColors(),
							dashSize: NgxThreeUtil.getTypeSafe(this.dashSize),
							gapSize: NgxThreeUtil.getTypeSafe(this.gapSize),
							scale: NgxThreeUtil.getTypeSafe(this.scale),
						};
						material = new N3JS.LineDashedMaterial(this.getMaterialParameters(parametersLineDashedMaterial));
						break;
					case 'meshbasicmaterial':
					case 'meshbasic':
						const parametersMeshBasicMaterial: I3JS.MeshBasicMaterialParameters = {
							color: this.getColor(),
							aoMapIntensity: NgxThreeUtil.getTypeSafe(this.aoMapIntensity),
							refractionRatio: NgxThreeUtil.getTypeSafe(this.refractionRatio),
							wireframe: NgxThreeUtil.getTypeSafe(this.wireframe),
							wireframeLinewidth: NgxThreeUtil.getTypeSafe(this.wireframeLinewidth),
							// skinning: this.getSkinning(),
							// morphTargets: NgxThreeUtil.getTypeSafe(this.morphTargets),
							reflectivity: NgxThreeUtil.getTypeSafe(this.reflectivity),
							combine: NgxThreeUtil.getCombineSafe(this.combine),
							wireframeLinecap: NgxThreeUtil.getTypeSafe(this.wireframeLinecap),
							wireframeLinejoin: NgxThreeUtil.getTypeSafe(this.wireframeLinejoin),
							map: this.getTexture('map'),
							aoMap: this.getTexture('aoMap'),
							specularMap: this.getTexture('specularMap'),
							alphaMap: this.getTexture('alphaMap'),
							envMap: this.getTexture('envMap'),
						};
						material = new N3JS.MeshBasicMaterial(this.getMaterialParameters(parametersMeshBasicMaterial));
						break;
					case 'meshdepthmaterial':
					case 'meshdepth':
						const parametersMeshDepthMaterial: I3JS.MeshDepthMaterialParameters = {
							map: this.getTexture('map'),
							alphaMap: this.getTexture('alphaMap'),
							depthPacking: NgxThreeUtil.getDepthPackingSafe(this.depthPacking),
							displacementMap: this.getTexture('displacementMap'),
							displacementScale: NgxThreeUtil.getTypeSafe(this.displacementScale),
							displacementBias: NgxThreeUtil.getTypeSafe(this.displacementBias),
							wireframe: NgxThreeUtil.getTypeSafe(this.wireframe),
							wireframeLinewidth: NgxThreeUtil.getTypeSafe(this.wireframeLinewidth),
						};
						material = new N3JS.MeshDepthMaterial(this.getMaterialParameters(parametersMeshDepthMaterial));
						break;
					case 'meshdistancematerial':
					case 'meshdistance':
						const parametersMeshDistanceMaterial: I3JS.MeshDistanceMaterialParameters = {
							map: this.getTexture('map'),
							alphaMap: this.getTexture('alphaMap'),
							displacementMap: this.getTexture('displacementMap'),
							displacementScale: NgxThreeUtil.getTypeSafe(this.displacementScale),
							displacementBias: NgxThreeUtil.getTypeSafe(this.displacementBias),
							farDistance: NgxThreeUtil.getTypeSafe(this.farDistance),
							nearDistance: NgxThreeUtil.getTypeSafe(this.nearDistance),
							referencePosition: this.getReferencePosition(),
						};
						material = new N3JS.MeshDistanceMaterial(this.getMaterialParameters(parametersMeshDistanceMaterial));
						break;
					case 'meshmatcapmaterial':
					case 'meshmatcap':
						const parametersMeshMatcapMaterial: I3JS.MeshMatcapMaterialParameters = {
							color: this.getColor(),
							matcap: this.getTexture('matcap'),
							map: this.getTexture('map'),
							alphaMap: this.getTexture('alphaMap'),
							bumpMap: this.getTexture('bumpMap'),
							bumpScale: NgxThreeUtil.getTypeSafe(this.bumpScale),
							normalMap: this.getTexture('normalMap'),
							normalMapType: NgxThreeUtil.getNormalMapTypeSafe(this.normalMapType),
							normalScale: this.getNormalScale(),
							displacementMap: this.getTexture('displacementMap'),
							displacementScale: NgxThreeUtil.getTypeSafe(this.displacementScale),
							displacementBias: NgxThreeUtil.getTypeSafe(this.displacementBias),
							flatShading: NgxThreeUtil.getTypeSafe(this.flatShading),
							// skinning: this.getSkinning(),
							// morphTargets: NgxThreeUtil.getTypeSafe(this.morphTargets),
							// morphNormals: NgxThreeUtil.getTypeSafe(this.morphNormals),
						};
						material = new N3JS.MeshMatcapMaterial(this.getMaterialParameters(parametersMeshMatcapMaterial));
						break;
					case 'meshnormalmaterial':
					case 'meshnormal':
					case 'normalmaterial':
					case 'normal':
						const parametersMeshNormalMaterial: I3JS.MeshNormalMaterialParameters = {
							bumpMap: this.getTexture('bumpMap'),
							bumpScale: NgxThreeUtil.getTypeSafe(this.bumpScale),
							normalMap: this.getTexture('normalMap'),
							normalMapType: NgxThreeUtil.getNormalMapTypeSafe(this.normalMapType),
							normalScale: this.getNormalScale(),
							displacementMap: this.getTexture('displacementMap'),
							displacementScale: NgxThreeUtil.getTypeSafe(this.displacementScale),
							displacementBias: NgxThreeUtil.getTypeSafe(this.displacementBias),
							wireframe: NgxThreeUtil.getTypeSafe(this.wireframe),
							wireframeLinewidth: NgxThreeUtil.getTypeSafe(this.wireframeLinewidth),
							flatShading: NgxThreeUtil.getTypeSafe(this.flatShading),
							// skinning: this.getSkinning(),
							// morphTargets: NgxThreeUtil.getTypeSafe(this.morphTargets),
							// morphNormals: NgxThreeUtil.getTypeSafe(this.morphNormals),
						};
						material = new N3JS.MeshNormalMaterial(this.getMaterialParameters(parametersMeshNormalMaterial));
						break;
					case 'meshphongmaterial':
					case 'meshphong':
					case 'phongmaterial':
					case 'phong':
						const parametersMeshPhongMaterial: I3JS.MeshPhongMaterialParameters = {
							color: this.getColor(),
							map: this.getTexture('map'),
							lightMap: this.getTexture('lightMap'),
							lightMapIntensity: NgxThreeUtil.getTypeSafe(this.lightMapIntensity),
							aoMap: this.getTexture('aoMap'),
							aoMapIntensity: NgxThreeUtil.getTypeSafe(this.aoMapIntensity),
							emissive: this.getEmissive(),
							emissiveIntensity: NgxThreeUtil.getTypeSafe(this.emissiveIntensity),
							emissiveMap: this.getTexture('emissiveMap'),
							bumpMap: this.getTexture('bumpMap'),
							bumpScale: NgxThreeUtil.getTypeSafe(this.bumpScale),
							normalMap: this.getTexture('normalMap'),
							normalMapType: NgxThreeUtil.getNormalMapTypeSafe(this.normalMapType),
							normalScale: this.getNormalScale(),
							displacementMap: this.getTexture('displacementMap'),
							displacementScale: NgxThreeUtil.getTypeSafe(this.displacementScale),
							displacementBias: NgxThreeUtil.getTypeSafe(this.displacementBias),
							alphaMap: this.getTexture('alphaMap'),
							envMap: this.getTexture('envMap'),
							refractionRatio: NgxThreeUtil.getTypeSafe(this.refractionRatio),
							wireframe: NgxThreeUtil.getTypeSafe(this.wireframe),
							wireframeLinewidth: NgxThreeUtil.getTypeSafe(this.wireframeLinewidth),
							// skinning: this.getSkinning(),
							// morphTargets: NgxThreeUtil.getTypeSafe(this.morphTargets),
							// morphNormals: NgxThreeUtil.getTypeSafe(this.morphNormals),
							reflectivity: NgxThreeUtil.getTypeSafe(this.reflectivity),
							specular: this.getSpecular(),
							shininess: NgxThreeUtil.getTypeSafe(this.shininess),
							specularMap: this.getTexture('specularMap'),
							combine: NgxThreeUtil.getCombineSafe(this.combine),
							wireframeLinecap: NgxThreeUtil.getTypeSafe(this.wireframeLinecap),
							wireframeLinejoin: NgxThreeUtil.getTypeSafe(this.wireframeLinejoin),
							flatShading: NgxThreeUtil.getTypeSafe(this.flatShading),
						};
						material = new N3JS.MeshPhongMaterial(this.getMaterialParameters(parametersMeshPhongMaterial));
						break;
					case 'meshphysicalmaterial':
					case 'meshphysical':
					case 'physicalmaterial':
					case 'physical':
						// const parametersMeshPhysicalMaterial: (THREE.MeshPhysicalMaterialParameters extends { thickness? : number }) =
						const parametersMeshPhysicalMaterial: any = {
							color: this.getColor(),
							roughness: NgxThreeUtil.getTypeSafe(this.roughness),
							metalness: NgxThreeUtil.getTypeSafe(this.metalness),
							map: this.getTexture('map'),
							lightMap: this.getTexture('lightMap'),
							lightMapIntensity: NgxThreeUtil.getTypeSafe(this.lightMapIntensity),
							aoMap: this.getTexture('aoMap'),
							aoMapIntensity: NgxThreeUtil.getTypeSafe(this.aoMapIntensity),
							emissive: this.getEmissive(),
							emissiveIntensity: NgxThreeUtil.getTypeSafe(this.emissiveIntensity),
							emissiveMap: this.getTexture('emissiveMap'),
							bumpMap: this.getTexture('bumpMap'),
							bumpScale: NgxThreeUtil.getTypeSafe(this.bumpScale),
							normalMap: this.getTexture('normalMap'),
							normalMapType: NgxThreeUtil.getNormalMapTypeSafe(this.normalMapType, 'tangentspace'),
							normalScale: this.getNormalScale(),
							displacementMap: this.getTexture('displacementMap'),
							displacementScale: NgxThreeUtil.getTypeSafe(this.displacementScale),
							displacementBias: NgxThreeUtil.getTypeSafe(this.displacementBias),
							roughnessMap: this.getTexture('roughnessMap'),
							metalnessMap: this.getTexture('metalnessMap'),
							alphaMap: this.getTexture('alphaMap'),
							envMap: this.getTexture('envMap'),
							envMapIntensity: NgxThreeUtil.getTypeSafe(this.envMapIntensity),
							refractionRatio: NgxThreeUtil.getTypeSafe(this.refractionRatio),
							wireframe: NgxThreeUtil.getTypeSafe(this.wireframe),
							wireframeLinewidth: NgxThreeUtil.getTypeSafe(this.wireframeLinewidth),
							// skinning: this.getSkinning(),
							// vertexTangents: NgxThreeUtil.getTypeSafe(this.vertexTangents),
							// morphTargets: NgxThreeUtil.getTypeSafe(this.morphTargets),
							// morphNormals: NgxThreeUtil.getTypeSafe(this.morphNormals),
							clearcoat: NgxThreeUtil.getTypeSafe(this.clearcoat),
							// clearcoatMap: this.getTexture('clearcoatMap'),
							clearcoatRoughness: NgxThreeUtil.getTypeSafe(this.clearcoatRoughness),
							// clearcoatRoughnessMap: this.getTexture('clearcoatRoughnessMap'),
							clearcoatNormalScale: this.getClearcoatNormalScale(),
							clearcoatNormalMap: this.getTexture('clearcoatNormalMap'),
							reflectivity: NgxThreeUtil.getTypeSafe(this.reflectivity),
							// ior: this.getIor(),
							// sheen: this.getSheen(),
							transmission: NgxThreeUtil.getTypeSafe(this.transmission),
							thickness: NgxThreeUtil.getTypeSafe(this.thickness),
							// transmissionMap: this.getTexture('transmissionMap')
						};
						material = new N3JS.MeshPhysicalMaterial(this.getMaterialParameters(parametersMeshPhysicalMaterial));
						break;
					case 'meshstandardmaterial':
					case 'meshstandard':
					case 'standardmaterial':
					case 'standard':
						const parametersMeshStandardMaterial: I3JS.MeshStandardMaterialParameters = {
							color: this.getColor(),
							roughness: NgxThreeUtil.getTypeSafe(this.roughness),
							metalness: NgxThreeUtil.getTypeSafe(this.metalness),
							map: this.getTexture('map'),
							lightMap: this.getTexture('lightMap'),
							lightMapIntensity: NgxThreeUtil.getTypeSafe(this.lightMapIntensity),
							aoMap: this.getTexture('aoMap'),
							aoMapIntensity: NgxThreeUtil.getTypeSafe(this.aoMapIntensity),
							emissive: this.getEmissive(),
							emissiveIntensity: NgxThreeUtil.getTypeSafe(this.emissiveIntensity),
							emissiveMap: this.getTexture('emissiveMap'),
							bumpMap: this.getTexture('bumpMap'),
							bumpScale: NgxThreeUtil.getTypeSafe(this.bumpScale),
							normalMap: this.getTexture('normalMap'),
							normalMapType: NgxThreeUtil.getNormalMapTypeSafe(this.normalMapType, 'tangentspace'),
							normalScale: this.getNormalScale(),
							displacementMap: this.getTexture('displacementMap'),
							displacementScale: NgxThreeUtil.getTypeSafe(this.displacementScale),
							displacementBias: NgxThreeUtil.getTypeSafe(this.displacementBias),
							roughnessMap: this.getTexture('roughnessMap'),
							metalnessMap: this.getTexture('metalnessMap'),
							alphaMap: this.getTexture('alphaMap'),
							envMap: this.getTexture('envMap'),
							envMapIntensity: NgxThreeUtil.getTypeSafe(this.envMapIntensity),
							refractionRatio: NgxThreeUtil.getTypeSafe(this.refractionRatio),
							wireframe: NgxThreeUtil.getTypeSafe(this.wireframe),
							wireframeLinewidth: NgxThreeUtil.getTypeSafe(this.wireframeLinewidth),
							flatShading: NgxThreeUtil.getTypeSafe(this.flatShading),
							// skinning: this.getSkinning(),
							// vertexTangents: NgxThreeUtil.getTypeSafe(this.vertexTangents),
							// morphTargets: NgxThreeUtil.getTypeSafe(this.morphTargets),
							// morphNormals: NgxThreeUtil.getTypeSafe(this.morphNormals),
						};
						const meshStandardMaterial = new N3JS.MeshStandardMaterial(
							this.getMaterialParameters(parametersMeshStandardMaterial)
						);
						material = meshStandardMaterial;
						break;
					case 'meshtoonmaterial':
					case 'meshtoon':
					case 'toonmaterial':
					case 'toon':
						const parametersMeshToonMaterial: I3JS.MeshToonMaterialParameters = {
							color: this.getColor(),
							gradientMap: this.getTexture('gradientMap'),
							map: this.getTexture('map'),
							lightMap: this.getTexture('lightMap'),
							lightMapIntensity: NgxThreeUtil.getTypeSafe(this.lightMapIntensity),
							aoMap: this.getTexture('aoMap'),
							aoMapIntensity: NgxThreeUtil.getTypeSafe(this.aoMapIntensity),
							emissive: this.getEmissive(),
							emissiveIntensity: NgxThreeUtil.getTypeSafe(this.emissiveIntensity),
							emissiveMap: this.getTexture('emissiveMap'),
							bumpMap: this.getTexture('bumpMap'),
							bumpScale: NgxThreeUtil.getTypeSafe(this.bumpScale),
							normalMap: this.getTexture('normalMap'),
							normalMapType: NgxThreeUtil.getNormalMapTypeSafe(this.normalMapType, 'tangentspace'),
							normalScale: this.getNormalScale(),
							displacementMap: this.getTexture('displacementMap'),
							displacementScale: NgxThreeUtil.getTypeSafe(this.displacementScale),
							displacementBias: NgxThreeUtil.getTypeSafe(this.displacementBias),
							alphaMap: this.getTexture('alphaMap'),
							wireframe: NgxThreeUtil.getTypeSafe(this.wireframe),
							wireframeLinewidth: NgxThreeUtil.getTypeSafe(this.wireframeLinewidth),
							wireframeLinecap: NgxThreeUtil.getTypeSafe(this.wireframeLinecap, 'round'),
							wireframeLinejoin: NgxThreeUtil.getTypeSafe(this.wireframeLinejoin, 'round'),
							// skinning: this.getSkinning(),
							// morphTargets: NgxThreeUtil.getTypeSafe(this.morphTargets),
							// morphNormals: NgxThreeUtil.getTypeSafe(this.morphNormals),
						};
						material = new N3JS.MeshToonMaterial(this.getMaterialParameters(parametersMeshToonMaterial));
						break;
					case 'pointsmaterial':
					case 'points':
						const parametersPointsMaterial: I3JS.PointsMaterialParameters = {
							color: this.getColor(),
							map: this.getTexture('map'),
							alphaMap: this.getTexture('alphaMap'),
							size: NgxThreeUtil.getTypeSafe(this.size),
							sizeAttenuation: NgxThreeUtil.getTypeSafe(this.sizeAttenuation),
							// morphTargets: NgxThreeUtil.getTypeSafe(this.morphTargets),
						};
						material = new N3JS.PointsMaterial(this.getMaterialParameters(parametersPointsMaterial));
						break;
					case 'rawshadermaterial':
					case 'rawshader':
						const parametersRawShaderMaterial: I3JS.ShaderMaterialParameters = {
							uniforms: this.getUniforms({}),
							vertexShader: this.getShader('x-shader/x-vertex'),
							fragmentShader: this.getShader('x-shader/x-fragment'),
							linewidth: NgxThreeUtil.getTypeSafe(this.linewidth),
							wireframe: NgxThreeUtil.getTypeSafe(this.wireframe),
							wireframeLinewidth: NgxThreeUtil.getTypeSafe(this.wireframeLinewidth),
							lights: NgxThreeUtil.getTypeSafe(this.lights),
							clipping: NgxThreeUtil.getTypeSafe(this.clipping),
							// skinning: this.getSkinning(),
							// morphTargets: NgxThreeUtil.getTypeSafe(this.morphTargets),
							// morphNormals: NgxThreeUtil.getTypeSafe(this.morphNormals),
						};
						const rawShaderMaterial = new N3JS.RawShaderMaterial(
							this.getMaterialParameters(parametersRawShaderMaterial)
						);
						if (NgxThreeUtil.isNotNull(this.glslVersion)) {
							rawShaderMaterial.glslVersion = NgxThreeUtil.getGlslVersionSafe(this.glslVersion);
						}
						if (NgxThreeUtil.isNotNull(this.extensions)) {
							this.getExtensions(rawShaderMaterial.extensions);
						}
						material = rawShaderMaterial;
						break;
					case 'shaderattributesparticlesmaterial':
					case 'shaderattributesparticles':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderAttributesParticlesMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shaderselectivedrawmaterial':
					case 'shaderselectivedraw':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderSelectiveDrawMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shadercustomattributesmaterial':
					case 'shadercustomattributes':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderCustomAttributesMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shadercustomattributeslinesmaterial':
					case 'shadercustomattributeslines':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderCustomAttributesLinesMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shadercustomattributespointsmaterial':
					case 'shadercustomattributespoints':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderCustomAttributesPointsMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shaderattributesizecolormaterial':
					case 'shaderattributesizecolor':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderAttributeSizeColorMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shaderattributesizecolor1material':
					case 'shaderattributesizecolor1':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderAttributeSizeColor1Material(this.getShaderMaterialParameters())
						);
						break;
					case 'shaderskydomematerial':
					case 'shaderskydome':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderSkyDomeMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shaderparallaxmaterial':
					case 'shaderparallax':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderParallaxMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shaderfresnelmaterial':
					case 'shaderfresnel':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderFresnelMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shadersubsurfacescatteringmaterial':
					case 'shadersubsurfacescattering':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderSubsurfaceScatteringMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shaderwireframematerial':
					case 'shaderwireframe':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderWireframeMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shadernoiserandom1dmaterial':
					case 'shadernoiserandom1d':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderNoiseRandom1DMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shadernoiserandom2dmaterial':
					case 'shadernoiserandom2d':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderNoiseRandom2DMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shadernoiserandom3dmaterial':
					case 'shadernoiserandom3d':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderNoiseRandom3DMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shadercolorrainbowmaterial':
					case 'shadercolorrainbow':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderColorRainbowMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shadervideokinectmaterial':
					case 'shadervideokinect':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderVideoKinectMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shadervolumerendershader1material':
					case 'shadervolumerendershader1':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderVolumeRenderShader1Material(this.getShaderMaterialParameters())
						);
						break;
					case 'shaderinstancingmaterial':
					case 'shaderinstancing':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderInstancingMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shaderscalecolormaterial':
					case 'shaderscalecolor':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderScaleColorMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shadersincolormaterial':
					case 'shadersincolor':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderSinColorMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shaderraymarchingreflectmaterial':
					case 'shaderraymarchingreflect':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderRaymarchingReflectMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shadercloudmaterial':
					case 'shadercloud':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderCloudMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shaderperlinmaterial':
					case 'shaderperlin':
						material = this.getShaderMaterialUpdate(
							new NGX_MATERIAL.NgxShaderPerlinMaterial(this.getShaderMaterialParameters())
						);
						break;
					case 'shadermaterial':
					case 'shader':
						const parametersShaderMaterial: I3JS.ShaderMaterialParameters = {
							uniforms: this.getUniforms({}),
							vertexShader: this.getShader('x-shader/x-vertex'),
							fragmentShader: this.getShader('x-shader/x-fragment'),
							linewidth: NgxThreeUtil.getTypeSafe(this.linewidth),
							wireframe: NgxThreeUtil.getTypeSafe(this.wireframe),
							wireframeLinewidth: NgxThreeUtil.getTypeSafe(this.wireframeLinewidth),
							lights: NgxThreeUtil.getTypeSafe(this.lights),
							clipping: NgxThreeUtil.getTypeSafe(this.clipping),
							// skinning: this.getSkinning(),
							// morphTargets: NgxThreeUtil.getTypeSafe(this.morphTargets),
							// morphNormals: NgxThreeUtil.getTypeSafe(this.morphNormals),
						};
						const shaderMaterial = new N3JS.ShaderMaterial(this.getMaterialParameters(parametersShaderMaterial));
						if (NgxThreeUtil.isNotNull(this.glslVersion)) {
							shaderMaterial.glslVersion = NgxThreeUtil.getGlslVersionSafe(this.glslVersion);
						}
						if (NgxThreeUtil.isNotNull(this.extensions)) {
							this.getExtensions(shaderMaterial.extensions);
						}
						material = shaderMaterial;
						break;
					case 'shadowmaterial':
					case 'shadow':
						material = new N3JS.ShadowMaterial(
							this.getMaterialParameters({
								color: this.getColor(),
							})
						);
						break;
					case 'linematerial':
					case 'line':
						material = new N3JS.LineMaterial(
							this.getMaterialParameters({
								color: this.getColor(),
								dashed: NgxThreeUtil.getTypeSafe(this.dashed),
								dashScale: NgxThreeUtil.getTypeSafe(this.dashScale),
								dashSize: NgxThreeUtil.getTypeSafe(this.dashSize),
								dashOffset: NgxThreeUtil.getTypeSafe(this.dashOffset),
								gapSize: NgxThreeUtil.getTypeSafe(this.gapSize),
								linewidth: NgxThreeUtil.getTypeSafe(this.linewidth),
								resolution: this.getResolution(),
							})
						);
						break;
					case 'spritematerial':
					case 'sprite':
						const parametersSpriteMaterial: I3JS.SpriteMaterialParameters = {
							color: this.getColor(),
							map: this.getTexture('map'),
							alphaMap: this.getTexture('alphaMap'),
							rotation: NgxThreeUtil.getAngleSafe(this.rotation),
							sizeAttenuation: NgxThreeUtil.getTypeSafe(this.sizeAttenuation),
						};
						material = new N3JS.SpriteMaterial(this.getMaterialParameters(parametersSpriteMaterial));
						break;
					case 'standardnodematerial':
					case 'standardnode':
						const standardNodeMaterial = new N3JS.StandardNodeMaterial();
						if (NgxThreeUtil.isNotNull(this.side)) {
							standardNodeMaterial.side = NgxThreeUtil.getSideSafe(this.side);
						}
						if (NgxThreeUtil.isNotNull(this.metalness)) {
							standardNodeMaterial.metalness = this.getFloatNode(NgxThreeUtil.getTypeSafe(this.metalness));
						}
						if (NgxThreeUtil.isNotNull(this.reflectivity)) {
							standardNodeMaterial.reflectivity = this.getFloatNode(NgxThreeUtil.getTypeSafe(this.reflectivity));
						}
						if (NgxThreeUtil.isNotNull(this.clearcoat)) {
							standardNodeMaterial.clearcoat = this.getFloatNode(NgxThreeUtil.getTypeSafe(this.clearcoat));
						}
						if (NgxThreeUtil.isNotNull(this.clearcoatRoughness)) {
							standardNodeMaterial.clearcoatRoughness = this.getFloatNode(
								NgxThreeUtil.getTypeSafe(this.clearcoatRoughness)
							);
						}
						if (NgxThreeUtil.isNotNull(this.emissive)) {
							standardNodeMaterial.emissive = this.getColorNode(this.getEmissive());
						}
						if (NgxThreeUtil.isNotNull(this.roughness)) {
							standardNodeMaterial.roughness = this.getFloatNode(NgxThreeUtil.getTypeSafe(this.roughness));
						}
						if (NgxThreeUtil.isNotNull(this.color)) {
							standardNodeMaterial.color = this.getColorNode(this.getColor());
						}
						material = standardNodeMaterial;
						break;
					case 'basicnode':
					case 'basicnodematerial':
						const basicNodeMaterial = new N3JS.BasicNodeMaterial();
						material = basicNodeMaterial;
						break;
					case 'meshstandardnode':
					case 'meshstandardnodematerial':
						const meshStandardNodeMaterial = new N3JS.MeshStandardNodeMaterial();
						const diffuseMap = this.getTexture('diffuseMap');
						if (NgxThreeUtil.isNotNull(diffuseMap)) {
							meshStandardNodeMaterial.color = this.getOperatorNode(
								this.getTextureNode(diffuseMap),
								this.getVector3Node(this.getDiffuseColor(0xffffff)),
								'*'
							);
						} else {
							if (NgxThreeUtil.isNotNull(this.color)) {
								meshStandardNodeMaterial.color = this.getColorNode(this.getColor());
							}
						}
						if (NgxThreeUtil.isNotNull(this.roughness)) {
							meshStandardNodeMaterial.roughness = this.getFloatNode(NgxThreeUtil.getTypeSafe(this.roughness));
						}
						if (NgxThreeUtil.isNotNull(this.metalness)) {
							meshStandardNodeMaterial.metalness = this.getFloatNode(NgxThreeUtil.getTypeSafe(this.metalness));
						}
						if (
							NgxThreeUtil.isNotNull(this.normalScale) ||
							NgxThreeUtil.isNotNull(this.normalScaleX) ||
							NgxThreeUtil.isNotNull(this.normalScaleY)
						) {
							meshStandardNodeMaterial.normalScale = this.getVector2Node(this.getNormalScale());
						}
						material = meshStandardNodeMaterial;
						break;
					case 'phongnodematerial':
					case 'phongnode':
						const phongNodeMaterial = new N3JS.PhongNodeMaterial();
						if (NgxThreeUtil.isNotNull(this.color)) {
							phongNodeMaterial.color = this.getColorNode(this.getColor());
						}
						// phongNodeMaterial.alpha: Node;
						// phongNodeMaterial.specular: Node;
						// phongNodeMaterial.shininess: Node;
						const normalMapPhongNodeMaterial = this.getTexture('normalMap');
						if (NgxThreeUtil.isNotNull(normalMapPhongNodeMaterial)) {
							phongNodeMaterial.normal = new N3JS.NormalMapNode(this.getTextureNode(normalMapPhongNodeMaterial));
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
							NgxThreeUtil.getUpdateSubscribe().subscribe((timer: IRendererTimer) => {
								nodeFrame.update(timer.delta).updateNode(phongNodeMaterial);
							})
						);
						material = phongNodeMaterial;
						break;
					case 'spritenodematerial':
					case 'spritenode':
						const spriteNodeMaterial = new N3JS.SpriteNodeMaterial();
						material = spriteNodeMaterial;
						break;
					case 'meshlambertmaterial':
					case 'meshlambert':
					case 'lambertmaterial':
					case 'lambert':
					default:
						const parametersMeshLambertMaterial: I3JS.MeshLambertMaterialParameters = {
							color: this.getColor(),
							emissive: this.getEmissive(),
							emissiveIntensity: NgxThreeUtil.getTypeSafe(this.emissiveIntensity),
							emissiveMap: this.getTexture('emissiveMap'),
							map: this.getTexture('map'),
							lightMap: this.getTexture('lightMap'),
							lightMapIntensity: NgxThreeUtil.getTypeSafe(this.lightMapIntensity),
							aoMap: this.getTexture('aoMap'),
							aoMapIntensity: NgxThreeUtil.getTypeSafe(this.aoMapIntensity),
							specularMap: this.getTexture('specularMap'),
							alphaMap: this.getTexture('alphaMap'),
							envMap: this.getTexture('envMap'),
							combine: NgxThreeUtil.getCombineSafe(this.combine, 'multiply'),
							reflectivity: NgxThreeUtil.getTypeSafe(this.reflectivity),
							refractionRatio: NgxThreeUtil.getTypeSafe(this.refractionRatio),
							wireframe: NgxThreeUtil.getTypeSafe(this.wireframe),
							wireframeLinewidth: NgxThreeUtil.getTypeSafe(this.wireframeLinewidth),
							wireframeLinecap: NgxThreeUtil.getTypeSafe(this.wireframeLinecap, 'round'),
							wireframeLinejoin: NgxThreeUtil.getTypeSafe(this.wireframeLinejoin, 'round'),
							// skinning: this.getSkinning(),
							// morphTargets: NgxThreeUtil.getTypeSafe(this.morphTargets),
							// morphNormals: NgxThreeUtil.getTypeSafe(this.morphNormals),
						};
						const meshLambertMaterial = new N3JS.MeshLambertMaterial(
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
		if (this.material instanceof N3JS.NodeMaterial) {
			if (this._nodeFrame === null) {
				this._nodeFrame = new N3JS.NodeFrame(0);
			}
			this._nodeFrame.update(delta).updateNode(this.material);
		}
	}
}
