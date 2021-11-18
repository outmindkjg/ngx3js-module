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
import * as THREE from 'three';
import { CSM } from 'three/examples/jsm/csm/CSM';
import { ThreeTexture, ThreeUtil } from './interface';
import { PlaneComponent } from './plane/plane.component';
import { AbstractSubscribeComponent } from './subscribe.abstract';
import { AbstractTextureComponent } from './texture.abstract';

/**
 * Mesh material raw
 */
export interface MeshMaterialRaw {
	geometry?: THREE.BufferGeometry;
	userData?: any;
	material: THREE.Material | THREE.Material[];
	customDepthMaterial?: THREE.Material;
	customDistanceMaterial?: THREE.Material;
}

/**
 * Mesh Material
 */
export type MeshMaterial = MeshMaterialRaw | THREE.Scene;

/**
 * AbstractMaterialComponent
 *
 * ```ts
 * _@Component({
 * 	providers: [
 * 		{
 * 			provide: AbstractMaterialComponent,
 * 			useExisting: forwardRef(() => XxxComponent),
 * 		},
 * 	],
 * })
 * export class XxxComponent extends AbstractMaterialComponent implements OnInit {
 * 	constructor() {
 * 		super();
 * 	}
 * }
 * ```
 */
@Component({
	template: '',
})
export class AbstractMaterialComponent
	extends AbstractSubscribeComponent
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
	 * If the material's [page:Boolean transparent] property is not set to *true*, the material will remain fully opaque and this value will only affect its color.
	 * Default is *1.0*.
	 */
	@Input() public opacity: number = null;

	/**
	 * Enables alpha to coverage. Can only be used with MSAA-enabled contexts (meaning when the renderer was created with *antialias* parameter set to *true*). Default is *false*.
	 */
	@Input() public alphaToCoverage: number = null;

	/**
	 * Sets the alpha value to be used when running an alpha test.
	 * The material will not be renderered if the opacity is lower than this value.
	 * Default is *0*.
	 */
	@Input() public alphaTest: number = null;

	/**
	 * Which blending to use when displaying objects with this material.
	 * This must be set to [page:Materials CustomBlending] to use custom [page:Constant blendSrc], [page:Constant blendDst] or [page:Constant blendEquation].
	 * See the blending mode [page:Materials constants] for all possible values. Default is [page:Materials NormalBlending].
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.BlendingDstFactor
	 * @see THREE.ZeroFactor - ZeroFactor , Zero
	 * @see THREE.OneFactor - OneFactor , One
	 * @see THREE.SrcColorFactor - SrcColorFactor , SrcColor
	 * @see THREE.OneMinusSrcColorFactor - OneMinusSrcColorFactor , OneMinusSrcColor
	 * @see THREE.SrcAlphaFactor - SrcAlphaFactor , SrcAlpha
	 * @see THREE.OneMinusSrcAlphaFactor - OneMinusSrcAlphaFactor , OneMinusSrcAlpha
	 * @see THREE.DstAlphaFactor - DstAlphaFactor , DstAlpha
	 * @see THREE.OneMinusDstAlphaFactor - OneMinusDstAlphaFactor , OneMinusDstAlpha
	 * @see THREE.DstColorFactor - DstColorFactor , DstColor
	 * @see THREE.OneMinusDstColorFactor - OneMinusDstColorFactor , OneMinusDstColor
	 */
	@Input() public blendDst: string = null;

	/**
	 * The transparency of the [page:.blendDst]. Uses [page:.blendDst] value if null. Default is *null*.
	 */
	@Input() public blendDstAlpha: number = null;

	/**
	 * Blending equation to use when applying blending. Default is [page:CustomBlendingEquation AddEquation].
	 * See the blending equation [page:CustomBlendingEquation constants] for all possible values.
	 * The material's [page:Constant blending] must be set to [page:Materials CustomBlending] for this to have any effect.
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.BlendingEquation
	 * @see THREE.AddEquation - AddEquation , Add
	 * @see THREE.SubtractEquation - SubtractEquation , Subtract
	 * @see THREE.ReverseSubtractEquation - ReverseSubtractEquation , ReverseSubtract
	 * @see THREE.MinEquation - MinEquation , Min
	 * @see THREE.MaxEquation - MaxEquation , Max
	 *
	 */
	@Input() public blendEquation: string = null;

	/**
	 * The transparency of the [page:.blendEquation]. Uses [page:.blendEquation] value if null. Default is *null*.
	 */
	@Input() public blendEquationAlpha: number = null;

	/**
	 * Which blending to use when displaying objects with this material.
	 * This must be set to [page:Materials CustomBlending] to use custom [page:Constant blendSrc], [page:Constant blendDst] or [page:Constant blendEquation].
	 * See the blending mode [page:Materials constants] for all possible values. Default is [page:Materials NormalBlending].
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.NoBlending - NoBlending, No
	 * @see THREE.NormalBlending - NormalBlending, Normal
	 * @see THREE.AdditiveBlending - AdditiveBlending, Additive
	 * @see THREE.SubtractiveBlending - SubtractiveBlending, Subtractive
	 * @see THREE.MultiplyBlending - MultiplyBlending, Multiply
	 * @see THREE.CustomBlending - CustomBlending, Custom
	 */
	@Input() public blending: string = null;

	/**
	 * Blending source. Default is [page:CustomBlendingEquation SrcAlphaFactor].
	 * See the source factors [page:CustomBlendingEquation constants] for all possible values.
	 * The material's [page:Constant blending] must be set to [page:Materials CustomBlending] for this to have any effect.
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.Blending
	 * @see THREE.NoBlending - NoBlending , No
	 * @see THREE.NormalBlending - NormalBlending , Normal
	 * @see THREE.AdditiveBlending - AdditiveBlending , Additive
	 * @see THREE.SubtractiveBlending - SubtractiveBlending , Subtractive
	 * @see THREE.MultiplyBlending - MultiplyBlending , Multiply
	 * @see THREE.CustomBlending - CustomBlending , Custom
	 */
	@Input() public blendSrc: string = null;

	/**
	 * The transparency of the [page:.blendSrc]. Uses [page:.blendSrc] value if null. Default is *null*.
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
	 * This requires [page:WebGLRenderer.localClippingEnabled] to be *true*.
	 * See the [example:webgl_clipping_intersection WebGL / clipping /intersection] example.
	 * Default is *null*.
	 */
	@Input() public clippingPlanes: PlaneComponent[] | THREE.Plane[] = null;

	/**
	 * Defines whether to clip shadows according to the clipping planes specified on this material. Default is *false*.
	 */
	@Input() public clipShadows: boolean = null;

	/**
	 * Whether to render the material's color.
	 * This can be used in conjunction with a mesh's [page:Integer renderOrder] property to create invisible objects that occlude other objects. Default is *true*.
	 */
	@Input() public colorWrite: boolean = null;

	/**
	 * Custom defines to be injected into the shader. These are passed in form of an object literal, with key/value pairs. { MY_CUSTOM_DEFINE: '' , PI2: Math.PI * 2 }. The pairs are defined in both vertex and fragment shaders.  Default is *undefined*.
	 */
	@Input() public defines: any = null;

	/**
	 * Which depth function to use. Default is [page:Materials LessEqualDepth]. See the depth mode [page:Materials constants] for all possible values.
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.DepthModes
	 * @see THREE.NeverDepth - NeverDepth , Never
	 * @see THREE.AlwaysDepth - AlwaysDepth , Always
	 * @see THREE.LessDepth - LessDepth , Less
	 * @see THREE.LessEqualDepth - LessEqualDepth , LessEqual
	 * @see THREE.EqualDepth - EqualDepth , Equal
	 * @see THREE.GreaterEqualDepth - GreaterEqualDepth , GreaterEqual
	 * @see THREE.GreaterDepth - GreaterDepth , Greater
	 * @see THREE.NotEqualDepth - NotEqualDepth , NotEqual
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
	 * Define whether the material is rendered with flat shading. Default is false.
	 */
	@Input() public flatShading: boolean = null;

	/**
	 * Defines which side of faces will be rendered - front, back or both.
	 * Default is [page:Materials THREE.FrontSide].
	 * Other options are [page:Materials THREE.BackSide] and [page:Materials THREE.DoubleSide].
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.Side
	 * @see THREE.FrontSide - FrontSide , Front
	 * @see THREE.BackSide - BackSide , Back
	 * @see THREE.DoubleSide - DoubleSide , Double
	 */
	@Input() public side: string = null;

	/**
	 * Defines which side of faces cast shadows.
	 * When set, can be [page:Materials THREE.FrontSide], [page:Materials THREE.BackSide], or [page:Materials THREE.DoubleSide]. Default is *null*.
	 * If *null*, the side casting shadows is determined as follows:
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.Side
	 * @see THREE.FrontSide - FrontSide , Front
	 * @see THREE.BackSide - BackSide , Back
	 * @see THREE.DoubleSide - DoubleSide , Double
	 */
	@Input() public shadowSide: string = null;

	/**
	 * Defines whether this material is tone mapped according to the renderer's [page:WebGLRenderer.toneMapping toneMapping] setting. Default is *true*.
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
	 * The stencil comparison function to use. Default is [page:Materials AlwaysStencilFunc]. See stencil function [page:Materials constants] for all possible values.
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public stencilFunc: string = null;

	/**
	 * The value to use when performing stencil comparisons or stencil operations. Default is *0*.
	 *
	 * @see THREE.StencilFunc
	 * @see THREE.NeverStencilFunc - NeverStencilFunc , NeverStencil
	 * @see THREE.LessStencilFunc - LessStencilFunc , LessStencil
	 * @see THREE.EqualStencilFunc - EqualStencilFunc , EqualStencil
	 * @see THREE.LessEqualStencilFunc - LessEqualStencilFunc , LessEqualStencil
	 * @see THREE.GreaterStencilFunc - GreaterStencilFunc , GreaterStencil
	 * @see THREE.NotEqualStencilFunc - NotEqualStencilFunc , NotEqualStencil
	 * @see THREE.GreaterEqualStencilFunc - GreaterEqualStencilFunc , GreaterEqualStencil
	 * @see THREE.AlwaysStencilFunc - AlwaysStencilFunc , AlwaysStencil
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
	 * Which stencil operation to perform when the comparison function returns false. Default is [page:Materials KeepStencilOp]. See the stencil operations [page:Materials constants] for all possible values.
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.StencilOp
	 * @see THREE.ZeroStencilOp - ZeroStencilOp , ZeroStencil
	 * @see THREE.KeepStencilOp - KeepStencilOp , KeepStencil
	 * @see THREE.ReplaceStencilOp - ReplaceStencilOp , ReplaceStencil
	 * @see THREE.IncrementStencilOp - IncrementStencilOp , IncrementStencil
	 * @see THREE.DecrementStencilOp - DecrementStencilOp , DecrementStencil
	 * @see THREE.IncrementWrapStencilOp - IncrementWrapStencilOp , IncrementWrapStencil
	 * @see THREE.DecrementWrapStencilOp - DecrementWrapStencilOp , DecrementWrapStencil
	 * @see THREE.InvertStencilOp - InvertStencilOp , InvertStencil
	 */
	@Input() public stencilFail: string = null;

	/**
	 * Which stencil operation to perform when the comparison function returns true but the depth test fails. Default is [page:Materials KeepStencilOp]. See the stencil operations [page:Materials constants] for all possible values.
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.StencilOp
	 * @see THREE.ZeroStencilOp - ZeroStencilOp , ZeroStencil
	 * @see THREE.KeepStencilOp - KeepStencilOp , KeepStencil
	 * @see THREE.ReplaceStencilOp - ReplaceStencilOp , ReplaceStencil
	 * @see THREE.IncrementStencilOp - IncrementStencilOp , IncrementStencil
	 * @see THREE.DecrementStencilOp - DecrementStencilOp , DecrementStencil
	 * @see THREE.IncrementWrapStencilOp - IncrementWrapStencilOp , IncrementWrapStencil
	 * @see THREE.DecrementWrapStencilOp - DecrementWrapStencilOp , DecrementWrapStencil
	 * @see THREE.InvertStencilOp - InvertStencilOp , InvertStencil
	 */
	@Input() public stencilZFail: string = null;

	/**
	 * Which stencil operation to perform when the comparison function returns true and the depth test passes. Default is [page:Materials KeepStencilOp]. See the stencil operations [page:Materials constants] for all possible values.
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.StencilOp
	 * @see THREE.ZeroStencilOp - ZeroStencilOp , ZeroStencil
	 * @see THREE.KeepStencilOp - KeepStencilOp , KeepStencil
	 * @see THREE.ReplaceStencilOp - ReplaceStencilOp , ReplaceStencil
	 * @see THREE.IncrementStencilOp - IncrementStencilOp , IncrementStencil
	 * @see THREE.DecrementStencilOp - DecrementStencilOp , DecrementStencil
	 * @see THREE.IncrementWrapStencilOp - IncrementWrapStencilOp , IncrementWrapStencil
	 * @see THREE.DecrementWrapStencilOp - DecrementWrapStencilOp , DecrementWrapStencil
	 * @see THREE.InvertStencilOp - InvertStencilOp , InvertStencil
	 */
	@Input() public stencilZPass: string = null;

	/**
	 * Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects.
	 * When set to true, the extent to which the material is transparent is controlled by setting its [page:Float opacity] property.
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
	@Input() public onBeforeCompile: (
		shader: THREE.Shader,
		renderer?: THREE.WebGLRenderer
	) => void = null;

	/**
	 * Content children of abstract material component
	 */
	@ContentChildren(PlaneComponent)
	protected clippingPlanesList: QueryList<PlaneComponent>;

	/**
	 * Determines whether material type is
	 * @param materialType
	 * @returns true if material type
	 */
	public isMaterialType(materialType: string): boolean {
		return (
			(ThreeUtil.isNull(this.materialType) ||
				this.materialType.toLowerCase() === materialType.toLowerCase()) &&
			this.enabled &&
			(ThreeUtil.isNull(this.refName) || this.refName === '*') &&
			(this.visible === null || this.visible)
		);
	}

	/**
	 * Which blending to use when displaying objects with this material.
	 * This must be set to [page:Materials CustomBlending] to use custom [page:Constant blendSrc], [page:Constant blendDst] or [page:Constant blendEquation].
	 * See the blending mode [page:Materials constants] for all possible values. Default is [page:Materials NormalBlending].
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.BlendingDstFactor
	 * @see THREE.ZeroFactor - ZeroFactor , Zero
	 * @see THREE.OneFactor - OneFactor , One
	 * @see THREE.SrcColorFactor - SrcColorFactor , SrcColor
	 * @see THREE.OneMinusSrcColorFactor - OneMinusSrcColorFactor , OneMinusSrcColor
	 * @see THREE.SrcAlphaFactor - SrcAlphaFactor , SrcAlpha
	 * @see THREE.OneMinusSrcAlphaFactor - OneMinusSrcAlphaFactor , OneMinusSrcAlpha
	 * @see THREE.DstAlphaFactor - DstAlphaFactor , DstAlpha
	 * @see THREE.OneMinusDstAlphaFactor - OneMinusDstAlphaFactor , OneMinusDstAlpha
	 * @see THREE.DstColorFactor - DstColorFactor , DstColor
	 * @see THREE.OneMinusDstColorFactor - OneMinusDstColorFactor , OneMinusDstColor
	 *
	 * @param [def]
	 * @returns blend dst
	 */
	protected getBlendDst(def?: string): THREE.BlendingDstFactor {
		const blendDst = ThreeUtil.getTypeSafe(this.blendDst, def, '');
		switch (blendDst.toLowerCase()) {
			case 'zero':
				return THREE.ZeroFactor;
			case 'one':
				return THREE.OneFactor;
			case 'srccolor':
				return THREE.SrcColorFactor;
			case 'oneminussrccolor':
				return THREE.OneMinusSrcColorFactor;
			case 'srcalpha':
				return THREE.SrcAlphaFactor;
			case 'oneminussrcalpha':
				return THREE.OneMinusSrcAlphaFactor;
			case 'dstalpha':
				return THREE.DstAlphaFactor;
			case 'oneminusdstalpha':
				return THREE.OneMinusDstAlphaFactor;
			case 'dstcolor':
				return THREE.DstColorFactor;
			case 'oneminusdstcolor':
				return THREE.OneMinusDstColorFactor;
		}
		return undefined;
	}

	/**
	 * Gets blend equation
	 * @param [def]
	 * @returns blend equation
	 */
	protected getBlendEquation(def?: string): THREE.BlendingEquation {
		const blendEquation = ThreeUtil.getTypeSafe(this.blendEquation, def, '');
		switch (blendEquation.toLowerCase()) {
			case 'add':
				return THREE.AddEquation;
			case 'subtract':
				return THREE.SubtractEquation;
			case 'reversesubtract':
				return THREE.ReverseSubtractEquation;
			case 'min':
				return THREE.MinEquation;
			case 'max':
				return THREE.MaxEquation;
		}
		return undefined;
	}

	/**
	 * Which blending to use when displaying objects with this material.
	 * This must be set to [page:Materials CustomBlending] to use custom [page:Constant blendSrc], [page:Constant blendDst] or [page:Constant blendEquation].
	 * See the blending mode [page:Materials constants] for all possible values. Default is [page:Materials NormalBlending].
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.BlendingDstFactor
	 * @see THREE.ZeroFactor - ZeroFactor , Zero
	 * @see THREE.OneFactor - OneFactor , One
	 * @see THREE.SrcColorFactor - SrcColorFactor , SrcColor
	 * @see THREE.OneMinusSrcColorFactor - OneMinusSrcColorFactor , OneMinusSrcColor
	 * @see THREE.SrcAlphaFactor - SrcAlphaFactor , SrcAlpha
	 * @see THREE.OneMinusSrcAlphaFactor - OneMinusSrcAlphaFactor , OneMinusSrcAlpha
	 * @see THREE.DstAlphaFactor - DstAlphaFactor , DstAlpha
	 * @see THREE.OneMinusDstAlphaFactor - OneMinusDstAlphaFactor , OneMinusDstAlpha
	 * @see THREE.DstColorFactor - DstColorFactor , DstColor
	 * @see THREE.OneMinusDstColorFactor - OneMinusDstColorFactor , OneMinusDstColor
	 *
	 * @param [def]
	 * @returns blend src
	 */
	protected getBlendSrc(
		def?: string
	): THREE.BlendingSrcFactor | THREE.BlendingDstFactor {
		const blendSrc = ThreeUtil.getTypeSafe(this.blendSrc, def, '');
		switch (blendSrc.toLowerCase()) {
			case 'srcalphasaturatefactor':
			case 'srcalphasaturate':
				return THREE.SrcAlphaSaturateFactor;
			case 'zerofactor':
			case 'zero':
				return THREE.ZeroFactor;
			case 'onefactor':
			case 'one':
				return THREE.OneFactor;
			case 'srccolorfactor':
			case 'srccolor':
				return THREE.SrcColorFactor;
			case 'oneminussrccolorfactor':
			case 'oneminussrccolor':
				return THREE.OneMinusSrcColorFactor;
			case 'srcalphafactor':
			case 'srcalpha':
				return THREE.SrcAlphaFactor;
			case 'oneminussrcalphafactor':
			case 'oneminussrcalpha':
				return THREE.OneMinusSrcAlphaFactor;
			case 'dstalphafactor':
			case 'dstalpha':
				return THREE.DstAlphaFactor;
			case 'oneminusdstalphafactor':
			case 'oneminusdstalpha':
				return THREE.OneMinusDstAlphaFactor;
			case 'dstcolorfactor':
			case 'dstcolor':
				return THREE.DstColorFactor;
			case 'oneminusdstcolorfactor':
			case 'oneminusdstcolor':
				return THREE.OneMinusDstColorFactor;
		}
		return undefined;
	}

	/**
	 * Gets depth func
	 * @param [def]
	 * @returns depth func
	 */
	protected getDepthFunc(def?: string): THREE.DepthModes {
		const depthFunc = ThreeUtil.getTypeSafe(this.depthFunc, def, '');
		switch (depthFunc.toLowerCase()) {
			case 'never':
				return THREE.NeverDepth;
			case 'always':
				return THREE.AlwaysDepth;
			case 'less':
				return THREE.LessDepth;
			case 'lessequal':
				return THREE.LessEqualDepth;
			case 'equal':
				return THREE.EqualDepth;
			case 'greaterequal':
				return THREE.GreaterEqualDepth;
			case 'greater':
				return THREE.GreaterDepth;
			case 'notequal':
				return THREE.NotEqualDepth;
		}
		return undefined;
	}

	/**
	 * Gets precision
	 * @param [def]
	 * @returns precision
	 */
	protected getPrecision(def?: string): 'highp' | 'mediump' | 'lowp' | null {
		const precision = ThreeUtil.getTypeSafe(this.precision, def, '');
		switch (precision.toLowerCase()) {
			case 'highp':
				return 'highp';
			case 'mediump':
				return 'mediump';
			case 'lowp':
				return 'lowp';
		}
		return undefined;
	}

	/**
	 * Gets side
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.Side
	 * @see THREE.FrontSide - FrontSide , Front
	 * @see THREE.BackSide - BackSide , Back
	 * @see THREE.DoubleSide - DoubleSide , Double
	 *
	 * @param [def]
	 * @returns side
	 */
	protected getSide(def?: string): THREE.Side {
		const side = ThreeUtil.getTypeSafe(this.side, def, '');
		switch (side.toLowerCase()) {
			case 'backside':
			case 'back':
				return THREE.BackSide;
			case 'doubleside':
			case 'double':
				return THREE.DoubleSide;
			case 'frontside':
			case 'front':
				return THREE.FrontSide;
		}
		return undefined;
	}

	/**
	 * Gets shadow side
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.Side
	 * @see THREE.FrontSide - FrontSide , Front
	 * @see THREE.BackSide - BackSide , Back
	 * @see THREE.DoubleSide - DoubleSide , Double
	 *
	 * @param [def]
	 * @returns shadow side
	 */
	protected getShadowSide(def?: string): THREE.Side {
		const shadowSide = ThreeUtil.getTypeSafe(this.shadowSide, def, '');
		switch (shadowSide.toLowerCase()) {
			case 'backside':
			case 'back':
				return THREE.BackSide;
			case 'doubleside':
			case 'double':
				return THREE.DoubleSide;
			case 'frontside':
			case 'front':
				return THREE.FrontSide;
		}
		return undefined;
	}

	/**
	 * Gets vertex colors
	 * @param [def]
	 * @returns true if vertex colors
	 */
	protected getVertexColors(def?: boolean): boolean {
		return ThreeUtil.getTypeSafe(this.vertexColors, def);
	}

	/**
	 * Gets stencil func
	 * @param [def]
	 * @returns stencil func
	 */
	protected getStencilFunc(def?: string): THREE.StencilFunc {
		const stencilFunc = ThreeUtil.getTypeSafe(this.stencilFunc, def, '');
		switch (stencilFunc.toLowerCase()) {
			case 'never':
				return THREE.NeverStencilFunc;
			case 'less':
				return THREE.LessStencilFunc;
			case 'equal':
				return THREE.EqualStencilFunc;
			case 'lessequal':
				return THREE.LessEqualStencilFunc;
			case 'greater':
				return THREE.GreaterStencilFunc;
			case 'notequal':
				return THREE.NotEqualStencilFunc;
			case 'greaterequal':
				return THREE.GreaterEqualStencilFunc;
			case 'always':
				return THREE.AlwaysStencilFunc;
		}
		return undefined;
	}

	/**
	 * Gets stencil fail
	 * @param [def]
	 * @returns stencil fail
	 */
	protected getStencilFail(def?: string): THREE.StencilOp {
		const stencilFail = ThreeUtil.getTypeSafe(this.stencilFail, def, '');
		switch (stencilFail.toLowerCase()) {
			case 'zero':
				return THREE.ZeroStencilOp;
			case 'keep':
				return THREE.KeepStencilOp;
			case 'replace':
				return THREE.ReplaceStencilOp;
			case 'increment':
				return THREE.IncrementStencilOp;
			case 'decrement':
				return THREE.DecrementStencilOp;
			case 'incrementwrap':
				return THREE.IncrementWrapStencilOp;
			case 'decrementwrap':
				return THREE.DecrementWrapStencilOp;
			case 'invert':
				return THREE.InvertStencilOp;
		}
		return undefined;
	}

	/**
	 * Gets stencil zfail
	 * @param [def]
	 * @returns stencil zfail
	 */
	protected getStencilZFail(def?: string): THREE.StencilOp {
		const stencilZFail = ThreeUtil.getTypeSafe(this.stencilZFail, def, '');
		switch (stencilZFail.toLowerCase()) {
			case 'zero':
				return THREE.ZeroStencilOp;
			case 'keep':
				return THREE.KeepStencilOp;
			case 'replace':
				return THREE.ReplaceStencilOp;
			case 'increment':
				return THREE.IncrementStencilOp;
			case 'decrement':
				return THREE.DecrementStencilOp;
			case 'incrementwrap':
				return THREE.IncrementWrapStencilOp;
			case 'decrementwrap':
				return THREE.DecrementWrapStencilOp;
			case 'invert':
				return THREE.InvertStencilOp;
		}
		return undefined;
	}

	/**
	 * Gets stencil zpass
	 * @param [def]
	 * @returns stencil zpass
	 */
	protected getStencilZPass(def?: string): THREE.StencilOp {
		const stencilZPass = ThreeUtil.getTypeSafe(this.stencilZPass, def, '');
		switch (stencilZPass.toLowerCase()) {
			case 'zero':
				return THREE.ZeroStencilOp;
			case 'keep':
				return THREE.KeepStencilOp;
			case 'replace':
				return THREE.ReplaceStencilOp;
			case 'increment':
				return THREE.IncrementStencilOp;
			case 'decrement':
				return THREE.DecrementStencilOp;
			case 'incrementwrap':
				return THREE.IncrementWrapStencilOp;
			case 'decrementwrap':
				return THREE.DecrementWrapStencilOp;
			case 'invert':
				return THREE.InvertStencilOp;
		}
		return undefined;
	}

	/**
	 * Gets clipping planes
	 * @param [def]
	 * @returns clipping planes
	 */
	protected getClippingPlanes(def?: THREE.Plane[]): THREE.Plane[] {
		if (this.clippingPlanes !== null && this.clippingPlanes !== undefined) {
			const clippingPlanes: THREE.Plane[] = [];
			this.clippingPlanes.forEach((plane) => {
				if (plane instanceof PlaneComponent) {
					clippingPlanes.push(plane.getWorldPlane());
				} else {
					clippingPlanes.push(plane);
				}
			});
			if (clippingPlanes.length > 0) {
				return clippingPlanes;
			}
		} else if (
			this.clippingPlanesList !== null &&
			this.clippingPlanesList !== undefined
		) {
			const clippingPlanes: THREE.Plane[] = [];
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
	protected getTextureOption(map: ThreeTexture, name: string): THREE.Texture {
		if (ThreeUtil.isNotNull(map)) {
			if (typeof map === 'string') {
				const texture = AbstractTextureComponent.getTextureImageOption(
					map,
					null,
					'texture',
					null,
					() => {
						this.addChanges('texture');
					}
				);
				return texture;
			} else if (ThreeUtil.isNotNull(map['value'])) {
				const texture = AbstractTextureComponent.getTextureImageOption(
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
				const texture = ThreeUtil.getTexture(map, name);
				this.subscribeRefer(
					name,
					ThreeUtil.getSubscribe(
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
				mesh:
					| THREE.Scene
					| THREE.Mesh
					| THREE.Line
					| THREE.Points
					| THREE.Sprite;
			}[];
		};
	} = {};

	/**
	 * unSets object3d
	 * @param object3d
	 */
	public unsetObject3d(object3d: AbstractSubscribeComponent) {
		const key: string = object3d.getId();
		this.unSubscribeRefer('material_' + key);
		this.unSubscribeRefer('unmaterial_' + key);
		if (ThreeUtil.isNotNull(this._object3d[key])) {
			delete this._object3d[key];
		}
	}

	/**
	 * Sets object3d
	 * @param object3d
	 */
	public setObject3d(
		object3d: AbstractSubscribeComponent,
		refType: string = 'auto'
	) {
		if (ThreeUtil.isNotNull(object3d)) {
			const key: string = object3d.getId();
			if (refType === 'auto' && ThreeUtil.isNotNull(this._object3d[key])) {
				refType = this._object3d[key].refType;
			}
			let object = ThreeUtil.getObject3d(object3d);
			const objectList: THREE.Object3D[] = [];
			let meshes: {
				refIndex: number;
				mesh:
					| THREE.Scene
					| THREE.Mesh
					| THREE.Line
					| THREE.Points
					| THREE.Sprite;
			}[] = [];
			if (ThreeUtil.isNotNull(object)) {
				if (ThreeUtil.isNotNull(this.refName)) {
					if (this.refName === '*') {
						object.traverse((child: any) => {
							if (ThreeUtil.isNotNull(child['material'])) {
								objectList.push(child);
							}
						});
					} else if (Array.isArray(this.refName)) {
						this.refName.forEach((refName) => {
							const foundObj = object.getObjectByName(refName);
							if (ThreeUtil.isNotNull(foundObj)) {
								objectList.push(foundObj);
							}
						});
					} else {
						const foundObj = object.getObjectByName(this.refName);
						if (ThreeUtil.isNotNull(foundObj)) {
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
						object instanceof THREE.Mesh ||
						object instanceof THREE.Line ||
						object instanceof THREE.Points ||
						object instanceof THREE.Sprite
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
					} else if (object instanceof THREE.Scene) {
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
				ThreeUtil.getSubscribe(
					object3d,
					() => {
						this.setObject3d(object3d, refType);
					},
					'loaded'
				)
			);
			this.subscribeRefer(
				'unmaterial_' + key,
				ThreeUtil.getSubscribe(
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
	synkObject3d(material: THREE.Material = null, key: string = null) {
		if (ThreeUtil.isNotNull(material) && this.enabled) {
			if (ThreeUtil.isNotNull(this._object3d)) {
				const object3dList: {
					refType: string;
					meshes: {
						refIndex: number;
						mesh:
							| THREE.Scene
							| THREE.Mesh
							| THREE.Line
							| THREE.Points
							| THREE.Sprite;
					}[];
				}[] = [];
				if (ThreeUtil.isNotNull(key)) {
					if (
						ThreeUtil.isNotNull(this._object3d[key]) &&
						ThreeUtil.isNotNull(this._object3d[key].meshes) &&
						this._object3d[key].meshes.length > 0
					) {
						object3dList.push(this._object3d[key]);
					}
				} else {
					Object.entries(this._object3d).forEach(([_, object3d]) => {
						if (
							ThreeUtil.isNotNull(object3d) &&
							ThreeUtil.isNotNull(object3d.meshes) &&
							object3d.meshes.length > 0
						) {
							object3dList.push(object3d);
						}
					});
				}
				object3dList.forEach((object3d) => {
					let materialType: string = object3d.refType;
					if (
						materialType === 'auto' ||
						materialType === 'material' ||
						materialType === ''
					) {
						materialType = ThreeUtil.getTypeSafe(this.materialType, 'material');
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
								if (mesh instanceof THREE.Scene) {
									switch (materialType.toLowerCase()) {
										case 'background-angular':
										case 'backgroundangular':
										case 'background':
											const backgroundTexture: THREE.Texture =
												materialAny['map'];
											if (ThreeUtil.isNotNull(backgroundTexture)) {
												mesh.background = backgroundTexture;
											}
											break;
										case 'environment-angular':
										case 'environmentangular':
										case 'environment':
											const environmentTexture: THREE.Texture =
												materialAny['map'];
											if (ThreeUtil.isNotNull(environmentTexture)) {
												mesh.environment = environmentTexture;
											} else {
												const environmentTextureEnv: THREE.Texture =
													materialAny['envMap'];
												if (ThreeUtil.isNotNull(environmentTextureEnv)) {
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
											const bgEnvironmentTexture: THREE.Texture =
												materialAny['map'];
											if (ThreeUtil.isNotNull(bgEnvironmentTexture)) {
												mesh.environment = bgEnvironmentTexture;
												mesh.background = bgEnvironmentTexture;
											} else {
												const bgEnvironmentTextureEnv: THREE.Texture =
													materialAny['envMap'];
												if (ThreeUtil.isNotNull(bgEnvironmentTextureEnv)) {
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
								} else {
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
	protected getMaterialParameters(extendObj: any): THREE.MaterialParameters {
		const materialParameters: THREE.MaterialParameters = Object.assign(
			{
				alphaToCoverage: ThreeUtil.getTypeSafe(this.alphaToCoverage),
				blending: ThreeUtil.getBlendingSafe(this.blending),
				blendDst: this.getBlendDst(),
				blendDstAlpha: ThreeUtil.getTypeSafe(this.blendDstAlpha),
				blendEquation: this.getBlendEquation(),
				blendEquationAlpha: ThreeUtil.getTypeSafe(this.blendEquationAlpha),
				blendSrc: this.getBlendSrc(),
				blendSrcAlpha: ThreeUtil.getTypeSafe(this.blendSrcAlpha),
				clipIntersection: ThreeUtil.getTypeSafe(this.clipIntersection),
				clippingPlanes: this.getClippingPlanes(),
				clipShadows: ThreeUtil.getTypeSafe(this.clipShadows),
				colorWrite: ThreeUtil.getTypeSafe(this.colorWrite),
				defines: ThreeUtil.getTypeSafe(this.defines),
				depthFunc: this.getDepthFunc(),
				depthTest: ThreeUtil.getTypeSafe(this.depthTest),
				depthWrite: ThreeUtil.getTypeSafe(this.depthWrite),
				fog: ThreeUtil.getTypeSafe(this.fog),
				opacity: ThreeUtil.getTypeSafe(this.opacity),
				polygonOffset: ThreeUtil.getTypeSafe(this.polygonOffset),
				polygonOffsetFactor: ThreeUtil.getTypeSafe(this.polygonOffsetFactor),
				polygonOffsetUnits: ThreeUtil.getTypeSafe(this.polygonOffsetUnits),
				precision: this.getPrecision(),
				premultipliedAlpha: ThreeUtil.getTypeSafe(this.premultipliedAlpha),
				dithering: ThreeUtil.getTypeSafe(this.dithering),
				flatShading: ThreeUtil.getTypeSafe(this.flatShading),
				shadowSide: this.getShadowSide(),
				toneMapped: ThreeUtil.getTypeSafe(this.toneMapped),
				transparent: ThreeUtil.getTypeSafe(this.transparent),
				stencilWrite: ThreeUtil.getTypeSafe(this.stencilWrite),
				stencilFunc: this.getStencilFunc(),
				stencilRef: ThreeUtil.getTypeSafe(this.stencilRef),
				stencilWriteMask: ThreeUtil.getTypeSafe(this.stencilWriteMask),
				stencilFuncMask: ThreeUtil.getTypeSafe(this.stencilFuncMask),
				stencilFail: this.getStencilFail(),
				stencilZFail: this.getStencilZFail(),
				stencilZPass: this.getStencilZPass(),
				userData: {},
				alphaTest: ThreeUtil.getTypeSafe(this.alphaTest),
				name: ThreeUtil.getTypeSafe(this.name),
				side: this.getSide(),
				vertexColors: this.getVertexColors(),
				visible: ThreeUtil.getTypeSafe(this.visible),
			},
			extendObj
		);
		const materialParametersSafe: any = {};
		Object.entries(materialParameters).forEach(([key, value]) => {
			if (ThreeUtil.isNotNull(value)) {
				materialParametersSafe[key] = value;
			}
		});
		return materialParametersSafe;
	}

	/**
	 * The Material of abstract material component
	 */
	protected material: THREE.Material = null;

	/**
	 * Gets material
	 * @template T
	 * @returns material
	 */
	public getMaterial<T extends THREE.Material>(): T {
		return this.material as T;
	}

	/**
	 * Sets material
	 * @param material
	 */
	protected setMaterial(material: THREE.Material) {
		if (this.material !== material && ThreeUtil.isNotNull(material)) {
			if (this.material !== null) {
				this.material.dispose();
			}
			if (ThreeUtil.isNotNull(this.control)) {
				let control = this.control;
				if (ThreeUtil.isNotNull(control.getControl)) {
					control = control.getControl();
				}
				if (control instanceof CSM) {
					control.setupMaterial(material);
				}
			}
			this.setUserData('materialType', this.materialType.toLowerCase());
			this.setUserData('refName', ThreeUtil.getTypeSafe(this.refName, ''));
			if (ThreeUtil.isNotNull(this.onBeforeCompile)) {
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
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				return;
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'enabled':
						this.synkObject3d(this.material);
						break;
					case 'blending':
						if (ThreeUtil.isNotNull(this.blending)) {
							this.material.blending = ThreeUtil.getBlendingSafe(this.blending);
						}
						break;
					case 'blenddst':
						if (ThreeUtil.isNotNull(this.blendDst)) {
							this.material.blendDst = this.getBlendDst();
						}
						break;
					case 'blenddstalpha':
						if (ThreeUtil.isNotNull(this.blendDstAlpha)) {
							this.material.blendDstAlpha = ThreeUtil.getTypeSafe(
								this.blendDstAlpha
							);
						}
						break;
					case 'blendequation':
						if (ThreeUtil.isNotNull(this.blendEquation)) {
							this.material.blendEquation = this.getBlendEquation();
						}
						break;
					case 'blendequationalpha':
						if (ThreeUtil.isNotNull(this.blendEquationAlpha)) {
							this.material.blendEquationAlpha = ThreeUtil.getTypeSafe(
								this.blendEquationAlpha
							);
						}
						break;
					case 'blendsrc':
						if (ThreeUtil.isNotNull(this.blendSrc)) {
							this.material.blendSrc = this.getBlendSrc();
						}
						break;
					case 'blendsrcalpha':
						if (ThreeUtil.isNotNull(this.blendSrcAlpha)) {
							this.material.blendSrcAlpha = ThreeUtil.getTypeSafe(
								this.blendSrcAlpha
							);
						}
						break;
					case 'clipintersection':
						if (ThreeUtil.isNotNull(this.clipIntersection)) {
							this.material.clipIntersection = ThreeUtil.getTypeSafe(
								this.clipIntersection
							);
						}
						break;
					case 'clippingplanes':
						this.unSubscribeReferList('clippingPlanesList');
						this.material.clippingPlanes = this.getClippingPlanes();
						if (ThreeUtil.isNotNull(this.clippingPlanesList)) {
							this.subscribeListQuery(
								this.clippingPlanesList,
								'clippingPlanesList',
								'clippingPlanes'
							);
						}
						break;
					case 'clipshadows':
						if (ThreeUtil.isNotNull(this.clipShadows)) {
							this.material.clipShadows = ThreeUtil.getTypeSafe(
								this.clipShadows
							);
						}
						break;
					case 'colorwrite':
						if (ThreeUtil.isNotNull(this.colorWrite)) {
							this.material.colorWrite = ThreeUtil.getTypeSafe(this.colorWrite);
						}
						break;
					case 'defines':
						if (ThreeUtil.isNotNull(this.defines)) {
							this.material.defines = ThreeUtil.getTypeSafe(this.defines);
						}
						break;
					case 'depthfunc':
						if (ThreeUtil.isNotNull(this.depthFunc)) {
							this.material.depthFunc = this.getDepthFunc();
						}
						break;
					case 'depthtest':
						if (ThreeUtil.isNotNull(this.depthTest)) {
							this.material.depthTest = ThreeUtil.getTypeSafe(this.depthTest);
						}
						break;
					case 'depthwrite':
						if (ThreeUtil.isNotNull(this.depthWrite)) {
							this.material.depthWrite = ThreeUtil.getTypeSafe(this.depthWrite);
						}
						break;
					case 'fog':
						if (ThreeUtil.isNotNull(this.fog)) {
							this.material.fog = ThreeUtil.getTypeSafe(this.fog);
						}
						break;
					case 'opacity':
						if (ThreeUtil.isNotNull(this.opacity)) {
							this.material.opacity = ThreeUtil.getTypeSafe(this.opacity);
						}
						break;
					case 'polygonoffset':
						if (ThreeUtil.isNotNull(this.polygonOffset)) {
							this.material.polygonOffset = ThreeUtil.getTypeSafe(
								this.polygonOffset
							);
						}
						break;
					case 'polygonoffsetfactor':
						if (ThreeUtil.isNotNull(this.polygonOffsetFactor)) {
							this.material.polygonOffsetFactor = ThreeUtil.getTypeSafe(
								this.polygonOffsetFactor
							);
						}
						break;
					case 'polygonoffsetunits':
						if (ThreeUtil.isNotNull(this.polygonOffsetUnits)) {
							this.material.polygonOffsetUnits = ThreeUtil.getTypeSafe(
								this.polygonOffsetUnits
							);
						}
						break;
					case 'precision':
						if (ThreeUtil.isNotNull(this.precision)) {
							this.material.precision = this.getPrecision();
						}
						break;
					case 'premultipliedalpha':
						if (ThreeUtil.isNotNull(this.premultipliedAlpha)) {
							this.material.premultipliedAlpha = ThreeUtil.getTypeSafe(
								this.premultipliedAlpha
							);
						}
						break;
					case 'dithering':
						if (ThreeUtil.isNotNull(this.dithering)) {
							this.material.dithering = ThreeUtil.getTypeSafe(this.dithering);
						}
						break;
					case 'flatshading':
						if (ThreeUtil.isNotNull(this.flatShading)) {
							//  this.material.flatShading = ThreeUtil.getTypeSafe(this.flatShading);
						}
						break;
					case 'shadowside':
						if (ThreeUtil.isNotNull(this.shadowSide)) {
							this.material.shadowSide = this.getShadowSide();
						}
						break;
					case 'tonemapped':
						if (ThreeUtil.isNotNull(this.toneMapped)) {
							this.material.toneMapped = ThreeUtil.getTypeSafe(this.toneMapped);
						}
						break;
					case 'transparent':
						if (ThreeUtil.isNotNull(this.transparent)) {
							this.material.transparent = ThreeUtil.getTypeSafe(
								this.transparent
							);
						}
						break;
					case 'stencilwrite':
						if (ThreeUtil.isNotNull(this.stencilWrite)) {
							this.material.stencilWrite = ThreeUtil.getTypeSafe(
								this.stencilWrite
							);
						}
						break;
					case 'stencilfunc':
						if (ThreeUtil.isNotNull(this.stencilFunc)) {
							this.material.stencilFunc = this.getStencilFunc();
						}
						break;
					case 'stencilref':
						if (ThreeUtil.isNotNull(this.stencilRef)) {
							this.material.stencilRef = ThreeUtil.getTypeSafe(this.stencilRef);
						}
						break;
					case 'stencilwritemask':
						if (ThreeUtil.isNotNull(this.stencilWriteMask)) {
							this.material.stencilWriteMask = ThreeUtil.getTypeSafe(
								this.stencilWriteMask
							);
						}
						break;
					case 'stencilfuncmask':
						if (ThreeUtil.isNotNull(this.stencilFuncMask)) {
							this.material.stencilFuncMask = ThreeUtil.getTypeSafe(
								this.stencilFuncMask
							);
						}
						break;
					case 'stencilfail':
						if (ThreeUtil.isNotNull(this.stencilFail)) {
							this.material.stencilFail = this.getStencilFail();
						}
						break;
					case 'stencilzfail':
						if (ThreeUtil.isNotNull(this.stencilZFail)) {
							this.material.stencilZFail = this.getStencilZFail();
						}
						break;
					case 'stencilzpass':
						if (ThreeUtil.isNotNull(this.stencilZPass)) {
							this.material.stencilZPass = this.getStencilZPass();
						}
						break;
					case 'alphatest':
						if (ThreeUtil.isNotNull(this.alphaTest)) {
							this.material.alphaTest = ThreeUtil.getTypeSafe(this.alphaTest);
						}
						break;
					case 'name':
						if (ThreeUtil.isNotNull(this.name)) {
							this.material.name = ThreeUtil.getTypeSafe(this.name);
						}
						break;
					case 'side':
						if (ThreeUtil.isNotNull(this.side)) {
							this.material.side = this.getSide();
						}
						break;
					case 'vertexcolors':
						if (ThreeUtil.isNotNull(this.vertexColors)) {
							this.material.vertexColors = this.getVertexColors();
						}
						break;
					case 'visible':
						if (ThreeUtil.isNotNull(this.visible)) {
							this.material.visible = ThreeUtil.getTypeSafe(this.visible);
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
