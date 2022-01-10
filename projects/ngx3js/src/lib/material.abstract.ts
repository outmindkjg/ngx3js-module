import {
	AfterContentInit,
	Component,
	ContentChildren,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	QueryList,
	SimpleChanges,
} from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from './interface';
import { INgxTexture } from './ngx-interface';
import { NgxPlaneComponent } from './plane/plane.component';
import { NgxAbstractSubscribeComponent } from './subscribe.abstract';
import { NgxAbstractTextureComponent } from './texture.abstract';

/**
 * NgxAbstractMaterialComponent
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AbstractMaterialComponent) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material) page for a live demo.
 *
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
 * ```ts
 * _@Component({
 * 	providers: [
 * 		{
 * 			provide: NgxAbstractMaterialComponent,
 * 			useExisting: forwardRef(() => NgxXxxComponent),
 * 		},
 * 		{
 * 			provide: NgxAbstractSubscribeComponent,
 * 			useExisting: forwardRef(() => NgxXxxComponent),
 * 		}
 * 	],
 * })
 * export class NgxXxxComponent extends NgxAbstractMaterialComponent implements OnInit {
 * 	constructor() {
 * 		super();
 * 	}
 * }
 * ```
 */
@Component({
	template: '',
})
export class NgxAbstractMaterialComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit, OnChanges, AfterContentInit, OnDestroy
{
	/**
	 * The name of the object (doesn't need to be unique). Default is an empty string.
	 */
	@Input() public name: string = null;

	/**
	 * The refName of material component
	 */
	@Input() public refName: string | string[] = null;

	/**
	 * The refIndex of material component
	 *
	 * if the material of mesh is array use this index
	 */
	@Input() public refIndex: number = -1;

	/**
	 * Defines whether this material is visible. Default is *true*.
	 */
	@Input() public visible: boolean = null;

	/**
	 * The Material type. can be material, background etc.
	 */
	@Input() public materialType: string = 'material';

	/**
	 * The refer Material. When this value is not null will override the material with clone.
	 */
	@Input() public refer: any = null;

	/**
	 * Float in the range of *0.0* - *1.0* indicating how transparent the material is.
	 * A value of *0.0* indicates fully transparent, *1.0* is fully opaque.
	 * If the material's transparent property is not set to *true*, the material will remain fully opaque and this value will only affect its color.
	 * Default is *1.0*.
	 */
	@Input() public opacity: number = null;

	/**
	 * Enables alpha to coverage. Can only be used with MSAA-enabled contexts (meaning when the renderer was created with *antialias* parameter set to *true*). Default is *false*.
	 */
	@Input() public alphaToCoverage: boolean = null;

	/**
	 * Sets the alpha value to be used when running an alpha test.
	 * The material will not be renderered if the opacity is lower than this value.
	 * Default is *0*.
	 */
	@Input() public alphaTest: number = null;

	/**
	 * Which blending to use when displaying objects with this material.
	 * This must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) to use custom [blendSrc](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendSrc), [blendDst](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendDst) or [blendEquation](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendEquation).
	 * See the blending mode [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) for all possible values. Default is [NormalBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials).
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.ZeroFactor | ZeroFactor , Zero |
	 * | THREE.OneFactor | OneFactor , One |
	 * | THREE.SrcColorFactor | SrcColorFactor , SrcColor |
	 * | THREE.OneMinusSrcColorFactor | OneMinusSrcColorFactor , OneMinusSrcColor |
	 * | THREE.SrcAlphaFactor | SrcAlphaFactor , SrcAlpha |
	 * | THREE.OneMinusSrcAlphaFactor | OneMinusSrcAlphaFactor , OneMinusSrcAlpha |
	 * | THREE.DstAlphaFactor | DstAlphaFactor , DstAlpha |
	 * | THREE.OneMinusDstAlphaFactor | OneMinusDstAlphaFactor , OneMinusDstAlpha |
	 * | THREE.DstColorFactor | DstColorFactor , DstColor |
	 * | THREE.OneMinusDstColorFactor | OneMinusDstColorFactor , OneMinusDstColor |
	 */
	@Input() public blendDst: string = null;

	/**
	 * The transparency of the [Material.blendDst](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/Material.blendDst). Uses [Material.blendDst](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/Material.blendDst) value if null. Default is *null*.
	 */
	@Input() public blendDstAlpha: number = null;

	/**
	 * Blending equation to use when applying blending. Default is [AddEquation](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.CustomBlendingEquation).
	 * See the blending equation [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.CustomBlendingEquation) for all possible values.
	 * The material's [blending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blending) must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) for this to have any effect.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.AddEquation | AddEquation , Add |
	 * | THREE.SubtractEquation | SubtractEquation , Subtract |
	 * | THREE.ReverseSubtractEquation | ReverseSubtractEquation , ReverseSubtract |
	 * | THREE.MinEquation | MinEquation , Min |
	 * | THREE.MaxEquation | MaxEquation , Max |
	 *
	 */
	@Input() public blendEquation: string = null;

	/**
	 * The transparency of the [Material.blendEquation](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/Material.blendEquation). Uses [Material.blendEquation](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/Material.blendEquation) value if null. Default is *null*.
	 */
	@Input() public blendEquationAlpha: number = null;

	/**
	 * Which blending to use when displaying objects with this material.
	 * This must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) to use custom [blendSrc](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendSrc), [blendDst](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendDst) or [blendEquation](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blendEquation).
	 * See the blending mode [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) for all possible values. Default is [NormalBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials).
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.NoBlending | NoBlending, No |
	 * | THREE.NormalBlending | NormalBlending, Normal |
	 * | THREE.AdditiveBlending | AdditiveBlending, Additive |
	 * | THREE.SubtractiveBlending | SubtractiveBlending, Subtractive |
	 * | THREE.MultiplyBlending | MultiplyBlending, Multiply |
	 * | THREE.CustomBlending | CustomBlending, Custom |
	 */
	@Input() public blending: string = null;

	/**
	 * Blending source. Default is [SrcAlphaFactor](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.CustomBlendingEquation).
	 * See the source factors [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.CustomBlendingEquation) for all possible values.
	 * The material's [blending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials.blending) must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) for this to have any effect.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.NoBlending | NoBlending , No |
	 * | THREE.NormalBlending | NormalBlending , Normal |
	 * | THREE.AdditiveBlending | AdditiveBlending , Additive |
	 * | THREE.SubtractiveBlending | SubtractiveBlending , Subtractive |
	 * | THREE.MultiplyBlending | MultiplyBlending , Multiply |
	 * | THREE.CustomBlending | CustomBlending , Custom |
	 */
	@Input() public blendSrc: string = null;

	/**
	 * The transparency of the [Material.blendSrc](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/Material.blendSrc). Uses [Material.blendSrc](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/materials/Material.blendSrc) value if null. Default is *null*.
	 */
	@Input() public blendSrcAlpha: number = null;

	/**
	 * Changes the behavior of clipping planes so that only their intersection is clipped, rather than their union.
	 * Default is *false*.
	 */
	@Input() public clipIntersection: boolean = null;

	/**
	 * User-defined clipping planes specified as THREE.Plane objects in world space.
	 * These planes apply to the objects this material is attached to.
	 * Points in space whose signed distance to the plane is negative are clipped (not rendered).
	 * This requires [WebGLRenderer.localClippingEnabled](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer.localClippingEnabled) to be *true*.
	 * See the [example:webgl_clipping_intersection WebGL / clipping /intersection] example.
	 * Default is *null*.
	 */
	@Input() public clippingPlanes: NgxPlaneComponent[] | I3JS.Plane[] = null;

	/**
	 * Defines whether to clip shadows according to the clipping planes specified on this material. Default is *false*.
	 */
	@Input() public clipShadows: boolean = null;

	/**
	 * Whether to render the material's color.
	 * This can be used in conjunction with a mesh's renderOrder property to create invisible objects that occlude other objects. Default is *true*.
	 */
	@Input() public colorWrite: boolean = null;

	/**
	 * Custom defines to be injected into the shader. These are passed in form of an object literal, with key/value pairs. { MY_CUSTOM_DEFINE: '' , PI2: Math.PI * 2 }. The pairs are defined in both vertex and fragment shaders.  Default is *undefined*.
	 */
	@Input() public defines: any = null;

	/**
	 * Which depth function to use. Default is [LessEqualDepth](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials). See the depth mode [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) for all possible values.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.NeverDepth | NeverDepth , Never |
	 * | THREE.AlwaysDepth | AlwaysDepth , Always |
	 * | THREE.LessDepth | LessDepth , Less |
	 * | THREE.LessEqualDepth | LessEqualDepth , LessEqual |
	 * | THREE.EqualDepth | EqualDepth , Equal |
	 * | THREE.GreaterEqualDepth | GreaterEqualDepth , GreaterEqual |
	 * | THREE.GreaterDepth | GreaterDepth , Greater |
	 * | THREE.NotEqualDepth | NotEqualDepth , NotEqual |
	 *
	 */
	@Input() public depthFunc: string = null;

	/**
	 * Whether to have depth test enabled when rendering this material. Default is *true*.
	 */
	@Input() public depthTest: boolean = null;

	/**
	 * Whether rendering this material has any effect on the depth buffer. Default is *true*.
	 * When drawing 2D overlays it can be useful to disable the depth writing in order to layer several things together without creating z-index artifacts.
	 */
	@Input() public depthWrite: boolean = null;

	/**
	 * Whether the material is affected by fog. Default is *true*.
	 */
	@Input() public fog: boolean = null;

	/**
	 * Whether to use polygon offset. Default is *false*. This corresponds to the *GL_POLYGON_OFFSET_FILL* WebGL feature.
	 */
	@Input() public polygonOffset: boolean = null;

	/**
	 * Sets the polygon offset factor. Default is *0*.
	 */
	@Input() public polygonOffsetFactor: number = null;

	/**
	 * Sets the polygon offset units. Default is *0*.
	 */
	@Input() public polygonOffsetUnits: number = null;

	/**
	 * Override the renderer's default precision for this material. Can be "*highp*", "*mediump*" or "*lowp*".
	 * Default is *null*.
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public precision: string = null;

	/**
	 * Whether to premultiply the alpha (transparency) value.
	 * See [Example:webgl_materials_physical_transmission WebGL / Materials / Physical / Transmission] for an example of the difference.
	 * Default is *false*.
	 *
	 * highp, mediump, lowp
	 */
	@Input() public premultipliedAlpha: boolean = null;

	/**
	 * Whether to apply dithering to the color to remove the appearance of banding.
	 * Default is *false*.
	 */
	@Input() public dithering: boolean = null;

	/**
	 * Defines which side of faces will be rendered - front, back or both.
	 * Default is [THREE.FrontSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials).
	 * Other options are [THREE.BackSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) and [THREE.DoubleSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials).
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.FrontSide | FrontSide , Front |
	 * | THREE.BackSide | BackSide , Back |
	 * | THREE.DoubleSide | DoubleSide , Double |
	 */
	@Input() public side: string = null;

	/**
	 * Defines which side of faces cast shadows.
	 * When set, can be [THREE.FrontSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials), [THREE.BackSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials), or [THREE.DoubleSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials). Default is *null*.
	 * If *null*, the side casting shadows is determined as follows:
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.FrontSide | FrontSide , Front |
	 * | THREE.BackSide | BackSide , Back |
	 * | THREE.DoubleSide | DoubleSide , Double |
	 */
	@Input() public shadowSide: string = null;

	/**
	 * Defines whether this material is tone mapped according to the renderer's [toneMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/renderers/WebGLRenderer.toneMapping) setting. Default is *true*.
	 */
	@Input() public toneMapped: boolean = null;

	/**
	 * Defines whether vertex coloring is used. Default is *false*.
	 */
	@Input() public vertexColors: boolean = null;

	/**
	 * Whether stencil operations are performed against the stencil buffer. In order to perform writes or comparisons against the stencil buffer this value must be *true*. Default is *false*.
	 */
	@Input() public stencilWrite: boolean = null;

	/**
	 * The stencil comparison function to use. Default is [AlwaysStencilFunc](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials). See stencil function [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) for all possible values.
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public stencilFunc: string = null;

	/**
	 * The value to use when performing stencil comparisons or stencil operations. Default is *0*.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.NeverStencilFunc | NeverStencilFunc , NeverStencil |
	 * | THREE.LessStencilFunc | LessStencilFunc , LessStencil |
	 * | THREE.EqualStencilFunc | EqualStencilFunc , EqualStencil |
	 * | THREE.LessEqualStencilFunc | LessEqualStencilFunc , LessEqualStencil |
	 * | THREE.GreaterStencilFunc | GreaterStencilFunc , GreaterStencil |
	 * | THREE.NotEqualStencilFunc | NotEqualStencilFunc , NotEqualStencil |
	 * | THREE.GreaterEqualStencilFunc | GreaterEqualStencilFunc , GreaterEqualStencil |
	 * | THREE.AlwaysStencilFunc | AlwaysStencilFunc , AlwaysStencil |
	 */
	@Input() public stencilRef: number = null;

	/**
	 * The bit mask to use when writing to the stencil buffer. Default is *0xFF*.
	 */
	@Input() public stencilWriteMask: number = null;

	/**
	 * The bit mask to use when comparing against the stencil buffer. Default is *0xFF*.
	 */
	@Input() public stencilFuncMask: number = null;

	/**
	 * Which stencil operation to perform when the comparison function returns false. Default is [KeepStencilOp](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials). See the stencil operations [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) for all possible values.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.ZeroStencilOp | ZeroStencilOp , ZeroStencil |
	 * | THREE.KeepStencilOp | KeepStencilOp , KeepStencil |
	 * | THREE.ReplaceStencilOp | ReplaceStencilOp , ReplaceStencil |
	 * | THREE.IncrementStencilOp | IncrementStencilOp , IncrementStencil |
	 * | THREE.DecrementStencilOp | DecrementStencilOp , DecrementStencil |
	 * | THREE.IncrementWrapStencilOp | IncrementWrapStencilOp , IncrementWrapStencil |
	 * | THREE.DecrementWrapStencilOp | DecrementWrapStencilOp , DecrementWrapStencil |
	 * | THREE.InvertStencilOp | InvertStencilOp , InvertStencil |
	 */
	@Input() public stencilFail: string = null;

	/**
	 * Which stencil operation to perform when the comparison function returns true but the depth test fails. Default is [KeepStencilOp](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials). See the stencil operations [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) for all possible values.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.ZeroStencilOp | ZeroStencilOp , ZeroStencil |
	 * | THREE.KeepStencilOp | KeepStencilOp , KeepStencil |
	 * | THREE.ReplaceStencilOp | ReplaceStencilOp , ReplaceStencil |
	 * | THREE.IncrementStencilOp | IncrementStencilOp , IncrementStencil |
	 * | THREE.DecrementStencilOp | DecrementStencilOp , DecrementStencil |
	 * | THREE.IncrementWrapStencilOp | IncrementWrapStencilOp , IncrementWrapStencil |
	 * | THREE.DecrementWrapStencilOp | DecrementWrapStencilOp , DecrementWrapStencil |
	 * | THREE.InvertStencilOp | InvertStencilOp , InvertStencil |
	 */
	@Input() public stencilZFail: string = null;

	/**
	 * Which stencil operation to perform when the comparison function returns true and the depth test passes. Default is [KeepStencilOp](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials). See the stencil operations [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/constants/Materials) for all possible values.
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.ZeroStencilOp | ZeroStencilOp , ZeroStencil |
	 * | THREE.KeepStencilOp | KeepStencilOp , KeepStencil |
	 * | THREE.ReplaceStencilOp | ReplaceStencilOp , ReplaceStencil |
	 * | THREE.IncrementStencilOp | IncrementStencilOp , IncrementStencil |
	 * | THREE.DecrementStencilOp | DecrementStencilOp , DecrementStencil |
	 * | THREE.IncrementWrapStencilOp | IncrementWrapStencilOp , IncrementWrapStencil |
	 * | THREE.DecrementWrapStencilOp | DecrementWrapStencilOp , DecrementWrapStencil |
	 * | THREE.InvertStencilOp | InvertStencilOp , InvertStencil |
	 */
	@Input() public stencilZPass: string = null;

	/**
	 * Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects.
	 * When set to true, the extent to which the material is transparent is controlled by setting its opacity property.
	 * Default is *false*.
	 */
	@Input() public transparent: boolean = null;

	/**
	 * The control of abstract material component
	 */
	@Input() public control: any = null;

	/**
	 * An callback that is executed immediately before the shader program is compiled.
	 * This function is called with the shader source code as a parameter. Useful for the modification of built-in materials.
	 */
	@Input() public onBeforeCompile: (shader: I3JS.Shader, renderer?: I3JS.WebGLRenderer) => void = null;

	/**
	 * Content children of abstract material component
	 */
	@ContentChildren(NgxPlaneComponent) protected clippingPlanesList: QueryList<NgxPlaneComponent>;

	/**
	 * Determines whether material type is
	 * @param materialType
	 * @returns true if material type
	 */
	public isMaterialType(materialType: string): boolean {
		return (
			(NgxThreeUtil.isNull(this.materialType) || this.materialType.toLowerCase() === materialType.toLowerCase()) &&
			this.enabled &&
			(NgxThreeUtil.isNull(this.refName) || this.refName === '*') &&
			(this.visible === null || this.visible)
		);
	}

	/**
	 * Gets vertex colors
	 * @param [def]
	 * @returns true if vertex colors
	 */
	protected getVertexColors(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.vertexColors, def);
	}

	/**
	 * Gets clipping planes
	 * @param [def]
	 * @returns clipping planes
	 */
	protected getClippingPlanes(def?: I3JS.Plane[]): I3JS.Plane[] {
		if (this.clippingPlanes !== null && this.clippingPlanes !== undefined) {
			const clippingPlanes: I3JS.Plane[] = [];
			this.clippingPlanes.forEach((plane) => {
				if (plane instanceof NgxPlaneComponent) {
					clippingPlanes.push(plane.getPlane());
				} else {
					clippingPlanes.push(plane);
				}
			});
			if (clippingPlanes.length > 0) {
				return clippingPlanes;
			}
		} else if (this.clippingPlanesList !== null && this.clippingPlanesList !== undefined) {
			const clippingPlanes: I3JS.Plane[] = [];
			this.clippingPlanesList.forEach((plane) => {
				clippingPlanes.push(plane.getWorldPlane());
			});
			if (clippingPlanes.length > 0) {
				return clippingPlanes;
			}
		}
		return undefined;
	}

	/**
	 * Gets texture option
	 * @param map
	 * @param name
	 * @returns texture option
	 */
	protected getTextureOption(map: INgxTexture, name: string): I3JS.Texture {
		if (NgxThreeUtil.isNotNull(map)) {
			if (typeof map === 'string') {
				if (map !== 'none') {
					const texture = NgxAbstractTextureComponent.getTextureImageOption(map, null, 'texture', null, () => {
						this.addChanges('texture');
					});
					return texture;
				}
			} else if (NgxThreeUtil.isNotNull(map['value'])) {
				const texture = NgxAbstractTextureComponent.getTextureImageOption(
					map['value'],
					map['options'],
					map['type'] as string,
					map['cubeImage'],
					() => {
						this.addChanges('texture');
					}
				);
				return texture;
			} else {
				this.unSubscribeRefer(name);
				const texture = NgxThreeUtil.getTexture(map, name);
				this.subscribeRefer(
					name,
					NgxThreeUtil.getSubscribe(
						map,
						(event) => {
							this.addChanges(event);
						},
						'texture'
					)
				);
				return texture;
			}
		}
		return undefined;
	}

	/**
	 * The base attribute can be fine without re-make Material
	 */
	protected MATERIAL_ATTR: string[] = [
		'blending',
		'blenddst',
		'blenddstalpha',
		'blendequation',
		'blendequationalpha',
		'blendsrc',
		'blendsrcalpha',
		'clipintersection',
		'clippingplanes',
		'clipshadows',
		'colorwrite',
		'defines',
		'depthfunc',
		'depthtest',
		'depthwrite',
		'fog',
		'opacity',
		'polygonoffset',
		'polygonoffsetfactor',
		'polygonoffsetunits',
		'precision',
		'premultipliedalpha',
		'dithering',
		'flatshading',
		'shadowside',
		'tonemapped',
		'transparent',
		'stencilwrite',
		'stencilfunc',
		'stencilref',
		'stencilwritemask',
		'stencilfuncmask',
		'stencilfail',
		'stencilzfail',
		'stencilzpass',
		'userdata',
		'alphatest',
		'name',
		'side',
		'vertexcolors',
		'visible',
		'texture',
		'color',
		'colormultiply',
	];

	/**
	 * Creates an instance of abstract material component.
	 */
	constructor() {
		super();
		this.MATERIAL_ATTR.push(...this.OBJECT_ATTR);
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 *
	 * @param subscribeType
	 */
	ngOnInit(subscribeType?: string): void {
		super.ngOnInit(subscribeType || 'material');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.material !== null) {
			this.material.dispose();
			this.material = null;
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
		if (changes && this.material !== null) {
			super.ngOnChanges(changes);
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
	 * The Object3d of Material component
	 */
	private _object3d: {
		[key: string]: {
			refType: string;
			meshes: {
				refIndex: number;
				mesh: I3JS.Scene | I3JS.Mesh | I3JS.Line | I3JS.Points | I3JS.Sprite;
			}[];
		};
	} = {};

	/**
	 * unSets object3d
	 * @param object3d
	 */
	public unsetObject3d(object3d: NgxAbstractSubscribeComponent) {
		const key: string = object3d.getId();
		this.unSubscribeRefer('material_' + key);
		this.unSubscribeRefer('unmaterial_' + key);
		if (NgxThreeUtil.isNotNull(this._object3d[key])) {
			delete this._object3d[key];
		}
	}

	/**
	 * Sets object3d
	 * @param object3d
	 */
	public setObject3d(object3d: NgxAbstractSubscribeComponent, refType: string = 'auto') {
		if (NgxThreeUtil.isNotNull(object3d)) {
			const key: string = object3d.getId();
			if (refType === 'auto' && NgxThreeUtil.isNotNull(this._object3d[key])) {
				refType = this._object3d[key].refType;
			}
			let object = NgxThreeUtil.getObject3d(object3d);
			const objectList: I3JS.Object3D[] = [];
			let meshes: {
				refIndex: number;
				mesh: I3JS.Scene | I3JS.Mesh | I3JS.Line | I3JS.Points | I3JS.Sprite;
			}[] = [];
			if (NgxThreeUtil.isNotNull(object)) {
				if (NgxThreeUtil.isNotNull(this.refName)) {
					if (this.refName === '*') {
						object.traverse((child: any) => {
							if (NgxThreeUtil.isNotNull(child['material'])) {
								objectList.push(child);
							}
						});
					} else if (Array.isArray(this.refName)) {
						this.refName.forEach((refName) => {
							const foundObj = object.getObjectByName(refName);
							if (NgxThreeUtil.isNotNull(foundObj)) {
								objectList.push(foundObj);
							}
						});
					} else {
						const foundObj = object.getObjectByName(this.refName);
						if (NgxThreeUtil.isNotNull(foundObj)) {
							objectList.push(foundObj);
						}
					}
				} else {
					objectList.push(object);
				}
			}
			if (objectList.length > 0) {
				objectList.forEach((object) => {
					if (
						object instanceof N3JS.Mesh ||
						object instanceof N3JS.Line ||
						object instanceof N3JS.Points ||
						object instanceof N3JS.Sprite
					) {
						let refIndex: number = -1;
						if (Array.isArray(object.material)) {
							if (this.refIndex > -1) {
								refIndex = this.refIndex;
							} else {
								refIndex = object.material.indexOf(this.material);
							}
						} else {
							refIndex = -1;
						}
						meshes.push({
							refIndex: refIndex,
							mesh: object,
						});
					} else if (object instanceof N3JS.Scene) {
						meshes.push({
							refIndex: -1,
							mesh: object,
						});
					}
				});
			}
			this._object3d[key] = {
				refType: refType,
				meshes: meshes,
			};
			this.subscribeRefer(
				'material_' + key,
				NgxThreeUtil.getSubscribe(
					object3d,
					() => {
						this.setObject3d(object3d, refType);
					},
					'loaded'
				)
			);
			this.subscribeRefer(
				'unmaterial_' + key,
				NgxThreeUtil.getSubscribe(
					object3d,
					() => {
						this.unsetObject3d(object3d);
					},
					'destroy'
				)
			);
			this.getMaterial();
			this.synkObject3d(this.material, key);
		}
	}

	/**
	 * Synks object3d
	 * @param [material]
	 */
	synkObject3d(material: I3JS.Material = null, key: string = null) {
		if (NgxThreeUtil.isNotNull(material) && this.enabled) {
			if (NgxThreeUtil.isNotNull(this._object3d)) {
				const object3dList: {
					refType: string;
					meshes: {
						refIndex: number;
						mesh: I3JS.Scene | I3JS.Mesh | I3JS.Line | I3JS.Points | I3JS.Sprite;
					}[];
				}[] = [];
				if (NgxThreeUtil.isNotNull(key)) {
					if (
						NgxThreeUtil.isNotNull(this._object3d[key]) &&
						NgxThreeUtil.isNotNull(this._object3d[key].meshes) &&
						this._object3d[key].meshes.length > 0
					) {
						object3dList.push(this._object3d[key]);
					}
				} else {
					Object.entries(this._object3d).forEach(([_, object3d]) => {
						if (
							NgxThreeUtil.isNotNull(object3d) &&
							NgxThreeUtil.isNotNull(object3d.meshes) &&
							object3d.meshes.length > 0
						) {
							object3dList.push(object3d);
						}
					});
				}
				object3dList.forEach((object3d) => {
					let materialType: string = object3d.refType;
					if (materialType === 'auto' || materialType === 'material' || materialType === '') {
						materialType = NgxThreeUtil.getTypeSafe(this.materialType, 'material');
					}
					object3d.meshes.forEach((info) => {
						const mesh = info.mesh;
						switch (materialType.toLowerCase()) {
							case 'customdepthmaterial':
							case 'customdepth':
								mesh.customDepthMaterial = material;
								break;
							case 'customdistancematerial':
							case 'customdistance':
								mesh.customDistanceMaterial = material;
								break;
							case 'material':
							default:
								const materialAny: any = material;
								if (mesh instanceof N3JS.Scene) {
									switch (materialType.toLowerCase()) {
										case 'background-angular':
										case 'backgroundangular':
										case 'background':
											const backgroundTexture: I3JS.Texture = materialAny['map'];
											if (NgxThreeUtil.isNotNull(backgroundTexture)) {
												mesh.background = backgroundTexture;
											}
											break;
										case 'environment-angular':
										case 'environmentangular':
										case 'environment':
											const environmentTexture: I3JS.Texture = materialAny['map'];
											if (NgxThreeUtil.isNotNull(environmentTexture)) {
												mesh.environment = environmentTexture;
											} else {
												const environmentTextureEnv: I3JS.Texture = materialAny['envMap'];
												if (NgxThreeUtil.isNotNull(environmentTextureEnv)) {
													mesh.environment = environmentTextureEnv;
												}
											}
											break;
										case 'backgroundenvironment':
										case 'environmentbackground':
										case 'background-environment':
										case 'environment-background':
										case 'background-environment-angular':
										case 'environment-background-angular':
										case 'backgroundenvironmentangular':
										case 'environmentbackgroundangular':
											const bgEnvironmentTexture: I3JS.Texture = materialAny['map'];
											if (NgxThreeUtil.isNotNull(bgEnvironmentTexture)) {
												mesh.environment = bgEnvironmentTexture;
												mesh.background = bgEnvironmentTexture;
											} else {
												const bgEnvironmentTextureEnv: I3JS.Texture = materialAny['envMap'];
												if (NgxThreeUtil.isNotNull(bgEnvironmentTextureEnv)) {
													mesh.environment = bgEnvironmentTextureEnv;
													mesh.background = bgEnvironmentTextureEnv;
												}
											}
											break;
										case 'overridematerial':
										default:
											mesh.overrideMaterial = material;
											break;
									}
								} else if (
									mesh instanceof N3JS.Mesh ||
									mesh instanceof N3JS.Line ||
									mesh instanceof N3JS.Points ||
									mesh instanceof N3JS.Sprite
								) {
									if (Array.isArray(mesh.material)) {
										const refIndex = info.refIndex;
										if (refIndex > -1) {
											mesh.material[refIndex] = material;
										} else {
											mesh.material.push(material);
											info.refIndex = mesh.material.length - 1;
										}
									} else {
										mesh.material = material;
									}
								}
						}
					});
				});
			} else if (this.material !== material) {
				this.material = material;
			}
		}
	}

	/**
	 * Gets material parameters
	 * @param extendObj
	 * @returns material parameters
	 */
	protected getMaterialParameters(extendObj: any): I3JS.MaterialParameters {
		const baseParameters: I3JS.MaterialParameters = {
			alphaToCoverage: NgxThreeUtil.getTypeSafe(this.alphaToCoverage),
			blending: NgxThreeUtil.getBlendingSafe(this.blending),
			blendDst: NgxThreeUtil.getBlendDstSafe(this.blendDst),
			blendDstAlpha: NgxThreeUtil.getTypeSafe(this.blendDstAlpha),
			blendEquation: NgxThreeUtil.getBlendEquationSafe(this.blendEquation),
			blendEquationAlpha: NgxThreeUtil.getTypeSafe(this.blendEquationAlpha),
			blendSrc: NgxThreeUtil.getBlendSrcSafe(this.blendSrc),
			blendSrcAlpha: NgxThreeUtil.getTypeSafe(this.blendSrcAlpha),
			clipIntersection: NgxThreeUtil.getTypeSafe(this.clipIntersection),
			clippingPlanes: this.getClippingPlanes(),
			clipShadows: NgxThreeUtil.getTypeSafe(this.clipShadows),
			colorWrite: NgxThreeUtil.getTypeSafe(this.colorWrite),
			defines: NgxThreeUtil.getTypeSafe(this.defines),
			depthFunc: NgxThreeUtil.getDepthModesSafe(this.depthFunc),
			depthTest: NgxThreeUtil.getTypeSafe(this.depthTest),
			depthWrite: NgxThreeUtil.getTypeSafe(this.depthWrite),
			fog: NgxThreeUtil.getTypeSafe(this.fog),
			opacity: NgxThreeUtil.getTypeSafe(this.opacity),
			polygonOffset: NgxThreeUtil.getTypeSafe(this.polygonOffset),
			polygonOffsetFactor: NgxThreeUtil.getTypeSafe(this.polygonOffsetFactor),
			polygonOffsetUnits: NgxThreeUtil.getTypeSafe(this.polygonOffsetUnits),
			precision: NgxThreeUtil.getPrecisionSafe(this.precision),
			premultipliedAlpha: NgxThreeUtil.getTypeSafe(this.premultipliedAlpha),
			dithering: NgxThreeUtil.getTypeSafe(this.dithering),
			shadowSide: NgxThreeUtil.getSideSafe(this.shadowSide),
			toneMapped: NgxThreeUtil.getTypeSafe(this.toneMapped),
			transparent: NgxThreeUtil.getTypeSafe(this.transparent),
			stencilWrite: NgxThreeUtil.getTypeSafe(this.stencilWrite),
			stencilFunc: NgxThreeUtil.getStencilFuncSafe(this.stencilFunc),
			stencilRef: NgxThreeUtil.getTypeSafe(this.stencilRef),
			stencilWriteMask: NgxThreeUtil.getTypeSafe(this.stencilWriteMask),
			stencilFuncMask: NgxThreeUtil.getTypeSafe(this.stencilFuncMask),
			stencilFail: NgxThreeUtil.getStencilOpSafe(this.stencilFail),
			stencilZFail: NgxThreeUtil.getStencilOpSafe(this.stencilZFail),
			stencilZPass: NgxThreeUtil.getStencilOpSafe(this.stencilZPass),
			userData: {},
			alphaTest: NgxThreeUtil.getTypeSafe(this.alphaTest),
			name: NgxThreeUtil.getTypeSafe(this.name),
			side: NgxThreeUtil.getSideSafe(this.side),
			vertexColors: this.getVertexColors(),
			visible: NgxThreeUtil.getTypeSafe(this.visible),
		};
		const materialParameters: I3JS.MaterialParameters = Object.assign(baseParameters, extendObj);
		const materialParametersSafe: any = {};
		Object.entries(materialParameters).forEach(([key, value]) => {
			if (NgxThreeUtil.isNotNull(value)) {
				materialParametersSafe[key] = value;
			}
		});
		return materialParametersSafe;
	}

	/**
	 * The Material of abstract material component
	 */
	protected material: I3JS.Material = null;

	/**
	 * Gets material
	 * @template T
	 * @returns material
	 */
	public getMaterial<T extends I3JS.Material>(): T {
		return this.material as T;
	}

	/**
	 * Sets material
	 * @param material
	 */
	protected setMaterial(material: I3JS.Material) {
		if (this.material !== material && NgxThreeUtil.isNotNull(material)) {
			if (this.material !== null) {
				this.material.dispose();
			}
			if (NgxThreeUtil.isNotNull(this.control)) {
				let control = this.control;
				if (NgxThreeUtil.isNotNull(control.getControl)) {
					control = control.getControl();
				}
				if (control instanceof N3JS.CsmControls) {
					control.setupMaterial(material);
				}
			}
			this.setUserData('materialType', this.materialType.toLowerCase());
			this.setUserData('refName', NgxThreeUtil.getTypeSafe(this.refName, ''));
			if (NgxThreeUtil.isNotNull(this.onBeforeCompile)) {
				material.onBeforeCompile = this.onBeforeCompile;
			}
			this.material = material;
			super.setObject(this.material);
			this.synkObject3d(this.material);
			this.setSubscribeNext('material');
		}
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (this.material !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				return;
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'enabled':
						this.synkObject3d(this.material);
						break;
					case 'blending':
						if (NgxThreeUtil.isNotNull(this.blending)) {
							this.material.blending = NgxThreeUtil.getBlendingSafe(this.blending);
						}
						break;
					case 'blenddst':
						if (NgxThreeUtil.isNotNull(this.blendDst)) {
							this.material.blendDst = NgxThreeUtil.getBlendDstSafe(this.blendDst);
						}
						break;
					case 'blenddstalpha':
						if (NgxThreeUtil.isNotNull(this.blendDstAlpha)) {
							this.material.blendDstAlpha = NgxThreeUtil.getTypeSafe(this.blendDstAlpha);
						}
						break;
					case 'blendequation':
						if (NgxThreeUtil.isNotNull(this.blendEquation)) {
							this.material.blendEquation = NgxThreeUtil.getBlendEquationSafe(this.blendEquation);
						}
						break;
					case 'blendequationalpha':
						if (NgxThreeUtil.isNotNull(this.blendEquationAlpha)) {
							this.material.blendEquationAlpha = NgxThreeUtil.getTypeSafe(this.blendEquationAlpha);
						}
						break;
					case 'blendsrc':
						if (NgxThreeUtil.isNotNull(this.blendSrc)) {
							this.material.blendSrc = NgxThreeUtil.getBlendSrcSafe(this.blendSrc);
						}
						break;
					case 'blendsrcalpha':
						if (NgxThreeUtil.isNotNull(this.blendSrcAlpha)) {
							this.material.blendSrcAlpha = NgxThreeUtil.getTypeSafe(this.blendSrcAlpha);
						}
						break;
					case 'clipintersection':
						if (NgxThreeUtil.isNotNull(this.clipIntersection)) {
							this.material.clipIntersection = NgxThreeUtil.getTypeSafe(this.clipIntersection);
						}
						break;
					case 'clippingplanes':
						this.unSubscribeReferList('clippingPlanesList');
						this.material.clippingPlanes = this.getClippingPlanes();
						if (NgxThreeUtil.isNotNull(this.clippingPlanesList)) {
							this.subscribeListQuery(this.clippingPlanesList, 'clippingPlanesList', 'clippingPlanes');
						}
						break;
					case 'clipshadows':
						if (NgxThreeUtil.isNotNull(this.clipShadows)) {
							this.material.clipShadows = NgxThreeUtil.getTypeSafe(this.clipShadows);
						}
						break;
					case 'colorwrite':
						if (NgxThreeUtil.isNotNull(this.colorWrite)) {
							this.material.colorWrite = NgxThreeUtil.getTypeSafe(this.colorWrite);
						}
						break;
					case 'defines':
						if (NgxThreeUtil.isNotNull(this.defines)) {
							this.material.defines = NgxThreeUtil.getTypeSafe(this.defines);
						}
						break;
					case 'depthfunc':
						if (NgxThreeUtil.isNotNull(this.depthFunc)) {
							this.material.depthFunc = NgxThreeUtil.getDepthModesSafe(this.depthFunc);
						}
						break;
					case 'depthtest':
						if (NgxThreeUtil.isNotNull(this.depthTest)) {
							this.material.depthTest = NgxThreeUtil.getTypeSafe(this.depthTest);
						}
						break;
					case 'depthwrite':
						if (NgxThreeUtil.isNotNull(this.depthWrite)) {
							this.material.depthWrite = NgxThreeUtil.getTypeSafe(this.depthWrite);
						}
						break;
					case 'fog':
						if (NgxThreeUtil.isNotNull(this.fog)) {
							this.material.fog = NgxThreeUtil.getTypeSafe(this.fog);
						}
						break;
					case 'opacity':
						if (NgxThreeUtil.isNotNull(this.opacity)) {
							this.material.opacity = NgxThreeUtil.getTypeSafe(this.opacity);
						}
						break;
					case 'polygonoffset':
						if (NgxThreeUtil.isNotNull(this.polygonOffset)) {
							this.material.polygonOffset = NgxThreeUtil.getTypeSafe(this.polygonOffset);
						}
						break;
					case 'polygonoffsetfactor':
						if (NgxThreeUtil.isNotNull(this.polygonOffsetFactor)) {
							this.material.polygonOffsetFactor = NgxThreeUtil.getTypeSafe(this.polygonOffsetFactor);
						}
						break;
					case 'polygonoffsetunits':
						if (NgxThreeUtil.isNotNull(this.polygonOffsetUnits)) {
							this.material.polygonOffsetUnits = NgxThreeUtil.getTypeSafe(this.polygonOffsetUnits);
						}
						break;
					case 'precision':
						if (NgxThreeUtil.isNotNull(this.precision)) {
							this.material.precision = NgxThreeUtil.getPrecisionSafe(this.precision);
						}
						break;
					case 'premultipliedalpha':
						if (NgxThreeUtil.isNotNull(this.premultipliedAlpha)) {
							this.material.premultipliedAlpha = NgxThreeUtil.getTypeSafe(this.premultipliedAlpha);
						}
						break;
					case 'dithering':
						if (NgxThreeUtil.isNotNull(this.dithering)) {
							this.material.dithering = NgxThreeUtil.getTypeSafe(this.dithering);
						}
						break;
					case 'shadowside':
						if (NgxThreeUtil.isNotNull(this.shadowSide)) {
							this.material.shadowSide = NgxThreeUtil.getSideSafe(this.shadowSide);
						}
						break;
					case 'tonemapped':
						if (NgxThreeUtil.isNotNull(this.toneMapped)) {
							this.material.toneMapped = NgxThreeUtil.getTypeSafe(this.toneMapped);
						}
						break;
					case 'transparent':
						if (NgxThreeUtil.isNotNull(this.transparent)) {
							this.material.transparent = NgxThreeUtil.getTypeSafe(this.transparent);
						}
						break;
					case 'stencilwrite':
						if (NgxThreeUtil.isNotNull(this.stencilWrite)) {
							this.material.stencilWrite = NgxThreeUtil.getTypeSafe(this.stencilWrite);
						}
						break;
					case 'stencilfunc':
						if (NgxThreeUtil.isNotNull(this.stencilFunc)) {
							this.material.stencilFunc = NgxThreeUtil.getStencilFuncSafe(this.stencilFunc);
						}
						break;
					case 'stencilref':
						if (NgxThreeUtil.isNotNull(this.stencilRef)) {
							this.material.stencilRef = NgxThreeUtil.getTypeSafe(this.stencilRef);
						}
						break;
					case 'stencilwritemask':
						if (NgxThreeUtil.isNotNull(this.stencilWriteMask)) {
							this.material.stencilWriteMask = NgxThreeUtil.getTypeSafe(this.stencilWriteMask);
						}
						break;
					case 'stencilfuncmask':
						if (NgxThreeUtil.isNotNull(this.stencilFuncMask)) {
							this.material.stencilFuncMask = NgxThreeUtil.getTypeSafe(this.stencilFuncMask);
						}
						break;
					case 'stencilfail':
						if (NgxThreeUtil.isNotNull(this.stencilFail)) {
							this.material.stencilFail = NgxThreeUtil.getStencilOpSafe(this.stencilFail);
						}
						break;
					case 'stencilzfail':
						if (NgxThreeUtil.isNotNull(this.stencilZFail)) {
							this.material.stencilZFail = NgxThreeUtil.getStencilOpSafe(this.stencilZFail);
						}
						break;
					case 'stencilzpass':
						if (NgxThreeUtil.isNotNull(this.stencilZPass)) {
							this.material.stencilZPass = NgxThreeUtil.getStencilOpSafe(this.stencilZPass);
						}
						break;
					case 'alphatest':
						if (NgxThreeUtil.isNotNull(this.alphaTest)) {
							this.material.alphaTest = NgxThreeUtil.getTypeSafe(this.alphaTest);
						}
						break;
					case 'name':
						if (NgxThreeUtil.isNotNull(this.name)) {
							this.material.name = NgxThreeUtil.getTypeSafe(this.name);
						}
						break;
					case 'side':
						if (NgxThreeUtil.isNotNull(this.side)) {
							this.material.side = NgxThreeUtil.getSideSafe(this.side);
						}
						break;
					case 'vertexcolors':
						if (NgxThreeUtil.isNotNull(this.vertexColors)) {
							this.material.vertexColors = this.getVertexColors();
						}
						break;
					case 'visible':
						if (NgxThreeUtil.isNotNull(this.visible)) {
							this.material.visible = NgxThreeUtil.getTypeSafe(this.visible);
						}
						break;
					default:
						break;
				}
			});
			this.material.needsUpdate = true;
		}
		super.applyChanges(changes);
	}
}
