import {
	Blending,
	BlendingDstFactor,
	BlendingEquation,
	BlendingSrcFactor,
	Combine,
	DepthModes,
	DepthPackingStrategies,
	GLSLVersion,
	NormalMapTypes,
	PixelFormat,
	Side,
	StencilFunc,
	StencilOp,
} from './constants';
import { EventDispatcher } from './core';
import { Color, ColorRepresentation, Plane, Vector2, Vector3 } from './math';
import { IUniform, Shader, WebGLRenderer } from './renderers';
import { Texture } from './textures';

export interface LineBasicMaterialParameters extends MaterialParameters {
	/**
	 * Color of the material, by default set to white (0xffffff).
	 */
	color?: ColorRepresentation | undefined;

	/**
	 * Controls line thickness. Default is *1*.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 */
	linewidth?: number | undefined;

	/**
	 * Define appearance of line ends. Possible values are 'butt', 'round' and 'square'.
	 * Default is 'round'.
	 * This corresponds to the [2D Canvas lineCap](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 */
	linecap?: string | undefined;

	/**
	 * Define appearance of line joints. Possible values are 'round', 'bevel' and 'miter'. Default is 'round'.
	 * This corresponds to the [2D Canvas lineJoin](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 */
	linejoin?: string | undefined;
}

/**
 * A material for drawing wireframe-style geometries.
 *
 * ### Code Example
 * ```javascript
 * const material = new THREE.LineBasicMaterial( {
 * 	color: 0xffffff,
 * 	linewidth: 1,
 * 	linecap: 'round', //ignored by WebGLRenderer
 * 	linejoin:  'round' //ignored by WebGLRenderer
 * });
 * ```
 *
 * ### Examples
 * [WebGL / buffergeometry / drawrange](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_drawrange) |
 * [WebGL / buffergeometry / lines](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_lines) |
 * [WebGL / buffergeometry / lines / indexed](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_lines_indexed) |
 * [WebGL / decals](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_decals) |
 * [WebGL / geometry / nurbs](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_nurbs) |
 * [WebGL / geometry / shapes](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_shapes) |
 * [WebGL / geometry / spline / editor](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_spline_editor) |
 * [WebGL / interactive / buffergeometry](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_interactive_buffergeometry) |
 * [WebGL / interactive / voxelpainter](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_interactive_voxelpainter) |
 * [WebGL / lines / colors](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lines_colors) |
 * [WebGL / lines / dashed](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lines_dashed) |
 * [WebGL / lines / sphere](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lines_sphere) |
 * [WebGL / materials](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials) |
 * [physics / ammo / rope](https://outmindkjg.github.io/ngx3js-doc/#/examples/physics_ammo_rope)
 */
export interface LineBasicMaterial extends Material {
	/**
	 * Any property of the material (including any property inherited from [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material)) can be passed in here.
	 * The exception is the property [color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Hexadecimal), which can be passed in as a hexadecimal string and is *0xffffff* (white) by default. [Color.set](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color.set)( color ) is called internally.
	 * @param parameters - an object with one or more properties defining the material's appearance.
	 */
	new (parameters?: LineBasicMaterialParameters): this;

	/**
	 * @default 'LineBasicMaterial'
	 */
	type: string;

	/**
	 * Color of the material, by default set to white (0xffffff).
	 * @default 0xffffff
	 */
	color: Color;

	/**
	 * Controls line thickness. Default is *1*.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 * @default 1
	 */
	linewidth: number;

	/**
	 * Define appearance of line ends. Possible values are 'butt', 'round' and 'square'.
	 * Default is 'round'.
	 * This corresponds to the [2D Canvas lineCap](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 * @default 'round'
	 */
	linecap: string;

	/**
	 * Define appearance of line joints. Possible values are 'round', 'bevel' and 'miter'. Default is 'round'.
	 * This corresponds to the [2D Canvas lineJoin](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 * @default 'round'
	 */
	linejoin: string;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(parameters: LineBasicMaterialParameters): void;
}

/**
 * Line dashed material parameters
 */
export interface LineDashedMaterialParameters extends LineBasicMaterialParameters {
	/**
	 * The scale of the dashed part of a line. Default is *1*.
	 */
	scale?: number | undefined;

	/**
	 * The size of the dash. This is both the gap with the stroke. Default is *3*.
	 */
	dashSize?: number | undefined;

	/**
	 * The size of the gap. Default is *1*.
	 */
	gapSize?: number | undefined;
}

/**
 * A material for drawing wireframe-style geometries with dashed lines.
 * ### Code Example
 * ```javascript
 * const material = new THREE.LineDashedMaterial( {
 * 	color: 0xffffff,
 * 	linewidth: 1,
 * 	scale: 1,
 * 	dashSize: 3,
 * 	gapSize: 1,
 * } );
 * ```
 * ### Examples
 * [WebGL / lines / dashed](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lines_dashed)
 */
export interface LineDashedMaterial extends LineBasicMaterial {
	/**
	 * Any property of the material (including any property inherited from [LineBasicMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineBasicMaterial)) can be passed in here.
	 * @param parameters - an object with one or more properties defining the material's appearance.
	 */
	new (parameters?: LineDashedMaterialParameters): this;

	/**
	 * @default 'LineDashedMaterial'
	 */
	type: string;

	/**
	 * The scale of the dashed part of a line. Default is *1*.
	 * @default 1
	 */
	scale: number;

	/**
	 * The size of the dash. This is both the gap with the stroke. Default is *3*.
	 * @default 1
	 */
	dashSize: number;

	/**
	 * The size of the gap. Default is *1*.
	 * @default 1
	 */
	gapSize: number;

	readonly isLineDashedMaterial: true;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(parameters: LineDashedMaterialParameters): void;
}

/**
 * Abstract base parameters for materials.
 */
export interface MaterialParameters {
	/**
	 * Sets the alpha value to be used when running an alpha test.
	 * The material will not be rendered if the opacity is lower than this value.
	 * Default is *0*.
	 */
	alphaTest?: number | undefined;

	/**
	 * Enables alpha to coverage. Can only be used with MSAA-enabled contexts (meaning when the renderer was created with *antialias* parameter set to *true*).
	 * Default is *false*.
	 */
	alphaToCoverage?: boolean | undefined;

	/**
	 * Blending destination. Default is [OneMinusSrcAlphaFactor](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CustomBlendingEquation).
	 * See the destination factors [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CustomBlendingEquation) for all possible values.
	 * The material's [blending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Constant) must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for this to have any effect.
	 */
	blendDst?: BlendingDstFactor | undefined;

	/**
	 * The transparency of the *.blendDst*. Uses *.blendDst* value if null. Default is *null*.
	 */
	blendDstAlpha?: number | undefined;

	/**
	 * Blending equation to use when applying blending. Default is [AddEquation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CustomBlendingEquation).
	 * See the blending equation [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CustomBlendingEquation) for all possible values.
	 * The material's [blending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Constant) must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for this to have any effect.
	 */
	blendEquation?: BlendingEquation | undefined;

	/**
	 * The transparency of the *.blendEquation*. Uses *.blendEquation* value if null. Default is *null*.
	 */
	blendEquationAlpha?: number | undefined;

	/**
	 * Which blending to use when displaying objects with this material.
	 * This must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) to use custom [blendSrc](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Constant), [blendDst](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Constant) or [blendEquation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Constant).
	 * See the blending mode [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for all possible values. Default is [NormalBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials).
	 */
	blending?: Blending | undefined;

	/**
	 * Blending source. Default is [SrcAlphaFactor](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CustomBlendingEquation).
	 * See the source factors [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CustomBlendingEquation) for all possible values.
	 * The material's [blending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Constant) must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for this to have any effect.
	 */
	blendSrc?: BlendingSrcFactor | BlendingDstFactor | undefined;

	/**
	 * The transparency of the *.blendSrc*. Uses *.blendSrc* value if null. Default is *null*.
	 */
	blendSrcAlpha?: number | undefined;

	/**
	 * Changes the behavior of clipping planes so that only their intersection is clipped, rather than their union.
	 * Default is *false*.
	 */
	clipIntersection?: boolean | undefined;

	/**
	 * User-defined clipping planes specified as THREE.Plane objects in world space.
	 * These planes apply to the objects this material is attached to.
	 * Points in space whose signed distance to the plane is negative are clipped (not rendered).
	 * This requires [WebGLRenderer.localClippingEnabled](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.localClippingEnabled) to be *true*.
	 * See the [WebGL / clipping /intersection](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_clipping_intersection) example.
	 * Default is *null*.
	 */
	clippingPlanes?: Plane[] | undefined;

	/**
	 * Defines whether to clip shadows according to the clipping planes specified on this material. Default is *false*.
	 */
	clipShadows?: boolean | undefined;

	/**
	 * Whether to render the material's color.
	 * This can be used in conjunction with a mesh's [renderOrder](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) property to create invisible objects that occlude other objects. Default is *true*.
	 */
	colorWrite?: boolean | undefined;

	/**
	 * Custom defines to be injected into the shader. These are passed in form of an object literal, with key/value pairs. { MY_CUSTOM_DEFINE: '' , PI2: Math.PI * 2 }. The pairs are defined in both vertex and fragment shaders.  Default is *undefined*.
	 */
	defines?: any;

	/**
	 * Which depth function to use. Default is [LessEqualDepth](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). See the depth mode [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for all possible values.
	 */
	depthFunc?: DepthModes | undefined;

	/**
	 * Whether to have depth test enabled when rendering this material. Default is *true*.
	 */
	depthTest?: boolean | undefined;

	/**
	 * Whether rendering this material has any effect on the depth buffer. Default is *true*.
	 * When drawing 2D overlays it can be useful to disable the depth writing in order to layer several things together without creating z-index artifacts.
	 */
	depthWrite?: boolean | undefined;

	/**
	 * Whether the material is affected by fog. Default is *true*.
	 */
	fog?: boolean | undefined;

	/**
	 * Optional name of the object (doesn't need to be unique). Default is an empty string.
	 */
	name?: string | undefined;

	/**
	 * Float in the range of *0.0* - *1.0* indicating how transparent the material is.
	 * A value of *0.0* indicates fully transparent, *1.0* is fully opaque.
	 * If the material's [transparent](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) property is not set to *true*, the material will remain fully opaque and this value will only affect its color.
	 * Default is *1.0*.
	 */
	opacity?: number | undefined;

	/**
	 * Whether to use polygon offset. Default is *false*. This corresponds to the *GL_POLYGON_OFFSET_FILL* WebGL feature.
	 */
	polygonOffset?: boolean | undefined;

	/**
	 * Sets the polygon offset factor. Default is *0*.
	 */
	polygonOffsetFactor?: number | undefined;

	/**
	 * Sets the polygon offset units. Default is *0*.
	 */
	polygonOffsetUnits?: number | undefined;

	/**
	 * Override the renderer's default precision for this material. Can be "*highp*", "*mediump*" or "*lowp*".
	 * Default is *null*.
	 */
	precision?: 'highp' | 'mediump' | 'lowp' | null | undefined;

	/**
	 * Whether to premultiply the alpha (transparency) value.
	 * See [Example:webgl_materials_physical_transmission WebGL / Materials / Physical / Transmission] for an example of the difference.
	 * Default is *false*.
	 */
	premultipliedAlpha?: boolean | undefined;

	/**
	 * Whether to apply dithering to the color to remove the appearance of banding.
	 * Default is *false*.
	 */
	dithering?: boolean | undefined;

	/**
	 * Defines which side of faces will be rendered - front, back or both.
	 * Default is [THREE.FrontSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials).
	 * Other options are [THREE.BackSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) and [THREE.DoubleSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials).
	 */
	side?: Side | undefined;

	/**
	 * Defines which side of faces cast shadows.
	 * When set, can be [THREE.FrontSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials), [THREE.BackSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials), or [THREE.DoubleSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). Default is *null*.
	 * If *null*, the side casting shadows is determined as follows:
	 */
	shadowSide?: Side | undefined;

	/**
	 * Defines whether this material is tone mapped according to the renderer's [toneMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.toneMapping) setting. Default is *true*.
	 */
	toneMapped?: boolean | undefined;

	/**
	 * Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects. g When set to true, the extent to which the material is transparent is controlled by setting its [opacity](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) property.
	 * Default is *false*.
	 */
	transparent?: boolean | undefined;

	/**
	 * Defines whether vertex coloring is used. Default is *false*.
	 */
	vertexColors?: boolean | undefined;

	/**
	 * Defines whether this material is visible. Default is *true*.
	 */
	visible?: boolean | undefined;

	/**
	 * When this property is set to [THREE.RGBFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), the material is considered to be opaque and alpha values are ignored. Default is [THREE.RGBAFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 */
	format?: PixelFormat | undefined;

	/**
	 * Whether stencil operations are performed against the stencil buffer. In order to perform writes or comparisons against the stencil buffer this value must be *true*. Default is *false*.
	 */
	stencilWrite?: boolean | undefined;

	/**
	 * The stencil comparison function to use. Default is [AlwaysStencilFunc](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). See stencil function [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for all possible values.
	 */
	stencilFunc?: StencilFunc | undefined;

	/**
	 * The value to use when performing stencil comparisons or stencil operations. Default is *0*.
	 */
	stencilRef?: number | undefined;

	/**
	 * The bit mask to use when writing to the stencil buffer. Default is *0xFF*.
	 */
	stencilWriteMask?: number | undefined;

	/**
	 * The bit mask to use when comparing against the stencil buffer. Default is *0xFF*.
	 */
	stencilFuncMask?: number | undefined;

	/**
	 * Which stencil operation to perform when the comparison function returns false. Default is [KeepStencilOp](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). See the stencil operations [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for all possible values.
	 */
	stencilFail?: StencilOp | undefined;

	/**
	 * Which stencil operation to perform when the comparison function returns true but the depth test fails. Default is [KeepStencilOp](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). See the stencil operations [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for all possible values.
	 */
	stencilZFail?: StencilOp | undefined;

	/**
	 * Which stencil operation to perform when the comparison function returns true and the depth test passes. Default is [KeepStencilOp](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). See the stencil operations [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for all possible values.
	 */
	stencilZPass?: StencilOp | undefined;

	/**
	 * An object that can be used to store custom data about the Material. It should not hold references to functions as these will not be cloned.
	 */
	userData?: any;
}

/**
 * Abstract base class for materials.
 * Materials describe the appearance of [objects](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object).
 * They are defined in a (mostly) renderer-independent way, so you don't have to rewrite materials if you decide to use a different renderer.
 * The following properties and methods are inherited by all other material types (although they may have different defaults).
 */
export interface Material extends EventDispatcher {
	/**
	 * This creates a generic material.
	 */
	new (): this;

	/**
	 * Color of the material, by default set to white (0xffffff).
	 */
	color: Color | any;

	/**
	 * Sets the alpha value to be used when running an alpha test.
	 * The material will not be rendered if the opacity is lower than this value.
	 * Default is *0*.
	 * @default 0
	 */
	alphaTest: number;

	/**
	 * Enables alpha to coverage. Can only be used with MSAA-enabled contexts (meaning when the renderer was created with *antialias* parameter set to *true*).
	 * Default is *false*.
	 * @default false
	 */
	alphaToCoverage: boolean;

	/**
	 * Blending destination. Default is [OneMinusSrcAlphaFactor](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CustomBlendingEquation).
	 * See the destination factors [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CustomBlendingEquation) for all possible values.
	 * The material's [blending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Constant) must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for this to have any effect.
	 * @default THREE.OneMinusSrcAlphaFactor
	 */
	blendDst: BlendingDstFactor;

	/**
	 * The transparency of the *.blendDst*. Uses *.blendDst* value if null. Default is *null*.
	 * @default null
	 */
	blendDstAlpha: number | null;

	/**
	 * Blending equation to use when applying blending. Default is [AddEquation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CustomBlendingEquation).
	 * See the blending equation [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CustomBlendingEquation) for all possible values.
	 * The material's [blending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Constant) must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for this to have any effect.
	 * @default THREE.AddEquation
	 */
	blendEquation: BlendingEquation;

	/**
	 * The transparency of the *.blendEquation*. Uses *.blendEquation* value if null. Default is *null*.
	 * @default null
	 */
	blendEquationAlpha: number | null;

	/**
	 * Which blending to use when displaying objects with this material.
	 * This must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) to use custom [blendSrc](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Constant), [blendDst](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Constant) or [blendEquation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Constant).
	 * See the blending mode [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for all possible values. Default is [NormalBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials).
	 * @default THREE.NormalBlending
	 */
	blending: Blending;

	/**
	 * Blending source. Default is [SrcAlphaFactor](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CustomBlendingEquation).
	 * See the source factors [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CustomBlendingEquation) for all possible values.
	 * The material's [blending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Constant) must be set to [CustomBlending](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for this to have any effect.
	 * @default THREE.SrcAlphaFactor
	 */
	blendSrc: BlendingSrcFactor | BlendingDstFactor;

	/**
	 * The transparency of the *.blendSrc*. Uses *.blendSrc* value if null. Default is *null*.
	 * @default null
	 */
	blendSrcAlpha: number | null;

	/**
	 * Changes the behavior of clipping planes so that only their intersection is clipped, rather than their union.
	 * Default is *false*.
	 * @default false
	 */
	clipIntersection: boolean;

	/**
	 * User-defined clipping planes specified as THREE.Plane objects in world space.
	 * These planes apply to the objects this material is attached to.
	 * Points in space whose signed distance to the plane is negative are clipped (not rendered).
	 * This requires [WebGLRenderer.localClippingEnabled](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.localClippingEnabled) to be *true*.
	 * See the [WebGL / clipping /intersection](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_clipping_intersection) example.
	 * Default is *null*.
	 * @default null
	 */
	clippingPlanes: any;

	/**
	 * Defines whether to clip shadows according to the clipping planes specified on this material. Default is *false*.
	 * @default false
	 */
	clipShadows: boolean;

	/**
	 * Whether to render the material's color.
	 * This can be used in conjunction with a mesh's [renderOrder](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) property to create invisible objects that occlude other objects. Default is *true*.
	 * @default true
	 */
	colorWrite: boolean;

	/**
	 * Custom defines to be injected into the shader. These are passed in form of an object literal, with key/value pairs. { MY_CUSTOM_DEFINE: '' , PI2: Math.PI * 2 }. The pairs are defined in both vertex and fragment shaders.  Default is *undefined*.
	 * @default undefined
	 */
	defines: undefined | { [key: string]: any };

	/**
	 * Which depth function to use. Default is [LessEqualDepth](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). See the depth mode [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for all possible values.
	 * @default THREE.LessEqualDepth
	 */
	depthFunc: DepthModes;

	/**
	 * Whether to have depth test enabled when rendering this material. Default is *true*.
	 * @default true
	 */
	depthTest: boolean;

	/**
	 * Whether rendering this material has any effect on the depth buffer. Default is *true*.
	 * When drawing 2D overlays it can be useful to disable the depth writing in order to layer several things together without creating z-index artifacts.
	 * @default true
	 */
	depthWrite: boolean;

	/**
	 * Whether the material is affected by fog. Default is *true*.
	 * @default true
	 */
	fog: boolean;

	/**
	 * When this property is set to [THREE.RGBFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures), the material is considered to be opaque and alpha values are ignored. Default is [THREE.RGBAFormat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * @default THREE.RGBAFormat
	 */
	format: PixelFormat;

	/**
	 * Unique number for this material instance.
	 */
	id: number;

	/**
	 * Whether stencil operations are performed against the stencil buffer. In order to perform writes or comparisons against the stencil buffer this value must be *true*. Default is *false*.
	 * @default false
	 */
	stencilWrite: boolean;

	/**
	 * The stencil comparison function to use. Default is [AlwaysStencilFunc](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). See stencil function [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for all possible values.
	 * @default THREE.AlwaysStencilFunc
	 */
	stencilFunc: StencilFunc;

	/**
	 * The value to use when performing stencil comparisons or stencil operations. Default is *0*.
	 * @default 0
	 */
	stencilRef: number;

	/**
	 * The bit mask to use when writing to the stencil buffer. Default is *0xFF*.
	 * @default 0xff
	 */
	stencilWriteMask: number;

	/**
	 * The bit mask to use when comparing against the stencil buffer. Default is *0xFF*.
	 * @default 0xff
	 */
	stencilFuncMask: number;

	/**
	 * Which stencil operation to perform when the comparison function returns false. Default is [KeepStencilOp](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). See the stencil operations [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for all possible values.
	 * @default THREE.KeepStencilOp
	 */
	stencilFail: StencilOp;

	/**
	 * Which stencil operation to perform when the comparison function returns true but the depth test fails. Default is [KeepStencilOp](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). See the stencil operations [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for all possible values.
	 * @default THREE.KeepStencilOp
	 */
	stencilZFail: StencilOp;

	/**
	 * Which stencil operation to perform when the comparison function returns true and the depth test passes. Default is [KeepStencilOp](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). See the stencil operations [constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) for all possible values.
	 * @default THREE.KeepStencilOp
	 */
	stencilZPass: StencilOp;

	/**
	 * Used to check whether this or derived classes are materials. Default is true.
	 * You should not change this, as it used internally for optimisation.
	 */
	readonly isMaterial: true;

	/**
	 * Optional name of the object (doesn't need to be unique). Default is an empty string.
	 * @default ''
	 */
	name: string;

	/**
	 * Specifies that the material needs to be recompiled.
	 * @default false
	 */
	needsUpdate: boolean;

	/**
	 * Float in the range of *0.0* - *1.0* indicating how transparent the material is.
	 * A value of *0.0* indicates fully transparent, *1.0* is fully opaque.
	 * If the material's [transparent](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) property is not set to *true*, the material will remain fully opaque and this value will only affect its color.
	 * Default is *1.0*.
	 * @default 1
	 */
	opacity: number;

	/**
	 * Whether to use polygon offset. Default is *false*. This corresponds to the *GL_POLYGON_OFFSET_FILL* WebGL feature.
	 * @default false
	 */
	polygonOffset: boolean;

	/**
	 * Sets the polygon offset factor. Default is *0*.
	 * @default 0
	 */
	polygonOffsetFactor: number;

	/**
	 * Sets the polygon offset units. Default is *0*.
	 * @default 0
	 */
	polygonOffsetUnits: number;

	/**
	 * Override the renderer's default precision for this material. Can be "*highp*", "*mediump*" or "*lowp*".
	 * Default is *null*.
	 * @default null
	 */
	precision: 'highp' | 'mediump' | 'lowp' | null;

	/**
	 * Whether to premultiply the alpha (transparency) value.
	 * See [Example:webgl_materials_physical_transmission WebGL / Materials / Physical / Transmission] for an example of the difference.
	 * Default is *false*.
	 * @default false
	 */
	premultipliedAlpha: boolean;

	/**
	 * Whether to apply dithering to the color to remove the appearance of banding.
	 * Default is *false*.
	 * @default false
	 */
	dithering: boolean;

	/**
	 * Defines which side of faces will be rendered - front, back or both.
	 * Default is [THREE.FrontSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials).
	 * Other options are [THREE.BackSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) and [THREE.DoubleSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials).
	 * @default THREE.FrontSide
	 */
	side: Side;

	/**
	 * Defines which side of faces cast shadows.
	 * When set, can be [THREE.FrontSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials), [THREE.BackSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials), or [THREE.DoubleSide](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). Default is *null*.
	 * If *null*, the side casting shadows is determined as follows:
	 * @default null
	 */
	shadowSide: Side | null;

	/**
	 * Defines whether this material is tone mapped according to the renderer's [toneMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.toneMapping) setting. Default is *true*.
	 * @default true
	 */
	toneMapped: boolean;

	/**
	 * Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects. g When set to true, the extent to which the material is transparent is controlled by setting its [opacity](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) property.
	 * Default is *false*.
	 * @default false
	 */
	transparent: boolean;

	/**
	 * Value is the string 'Material'. This shouldn't be changed, and can be used to find all objects of this type in a scene.
	 * @default 'Material'
	 */
	type: string;

	/**
	 * [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier) of this material instance.
	 * This gets automatically assigned, so this shouldn't be edited.
	 */
	uuid: string;

	/**
	 * Defines whether vertex coloring is used. Default is *false*.
	 * @default false
	 */
	vertexColors: boolean;

	/**
	 * Defines whether this material is visible. Default is *true*.
	 * @default true
	 */
	visible: boolean;

	/**
	 * An object that can be used to store custom data about the Material. It should not hold references to functions as these will not be cloned.
	 * @default {}
	 */
	userData: any;

	/**
	 * This starts at *0* and counts how many times [property:Boolean needsUpdate] is set to *true*.
	 * @default 0
	 */
	version: number;

	/**
	 * @returns Return a new material with the same parameters as this material.
	 */
	clone(): this;

	/**
	 * Copy the parameters from the passed material into this material.
	 * @param material
	 */
	copy(material: Material): this;

	/**
	 * This disposes the material. Textures of a material don't get disposed.
	 * These needs to be disposed by [Texture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture).
	 */
	dispose(): void;

	/**
	 * An optional callback that is executed immediately before the shader program is compiled.
	 * This function is called with the shader source code as a parameter. Useful for the modification of built-in materials.
	 * Unlike properties, the callback is not supported by [.clone](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material.clone)(), [.copy](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material.copy)() and [.toJSON](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material.toJSON)().
	 * @param shader Source code of the shader
	 * @param renderer WebGLRenderer Context that is initializing the material
	 */
	onBeforeCompile(shader: Shader, renderer: WebGLRenderer): void;

	/**
	 * In case onBeforeCompile is used, this callback can be used to identify values of settings used in onBeforeCompile, so three.js can reuse a cached shader or recompile the shader for this material as needed.
	 * For example, if onBeforeCompile contains a conditional statement like:
	 * ```javascript
	 * if ( black ) {
	 * 	shader.fragmentShader = shader.fragmentShader.replace('gl_FragColor = vec4(1)', 'gl_FragColor = vec4(0)')
	 * }
	 * // then customProgramCacheKey should be set like this:
	 * material.customProgramCacheKey = function() {
	 * 	return black ? '1' : '0';
	 * }
	 * ```
	 * Unlike properties, the callback is not supported by [.clone](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material.clone)(), [.copy](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material.copy)() and [.toJSON](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material.toJSON)().
	 */
	customProgramCacheKey(): string;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(values: MaterialParameters): void;

	/**
	 * Convert the material to three.js [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4).
	 * @param met - object containing metadata such as textures or images for the material.
	 */
	toJSON(meta?: any): any;
}

/**
 * Mesh basic material parameters
 */
export interface MeshBasicMaterialParameters extends MaterialParameters {
	/**
	 * Color of the material, by default set to white (0xffffff).
	 */
	color?: ColorRepresentation | undefined;

	/**
	 * The color map. Default is  null.
	 */
	map?: Texture | null | undefined;

	/**
	 * The light map. Default is null. The lightMap requires a second set of UVs.
	 */
	lightMap?: Texture | null;

	/**
	 * Intensity of the baked light. Default is 1.
	 */
	lightMapIntensity?: number | undefined;

	/**
	 * The red channel of this texture is used as the ambient occlusion map. Default is null.
	 * The aoMap requires a second set of UVs.
	 */
	aoMap?: Texture | null | undefined;

	/**
	 * Intensity of the ambient occlusion effect. Default is 1. Zero is no occlusion effect.
	 */
	aoMapIntensity?: number | undefined;

	/**
	 * Specular map used by the material. Default is null.
	 */
	specularMap?: Texture | null | undefined;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 */
	alphaMap?: Texture | null | undefined;

	/**
	 * The environment map. Default is null.
	 */
	envMap?: Texture | null | undefined;

	/**
	 * How to combine the result of the surface's color with the environment map, if any.
	 * Options are [THREE.Multiply](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) (default), [THREE.MixOperation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials),
	 * [THREE.AddOperation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). If mix is chosen, the *.reflectivity* is used to blend between the two colors.
	 */
	combine?: Combine | undefined;

	/**
	 * How much the environment map affects the surface; also see *.combine*.
	 * The default value is 1 and the valid range is between 0 (no reflections) and 1 (full reflections).
	 */
	reflectivity?: number | undefined;

	/**
	 * The index of refraction (IOR) of air (approximately 1) divided by the index of refraction of the material.
	 * It is used with environment mapping modes [THREE.CubeRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) and [THREE.EquirectangularRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * The refraction ratio should not exceed 1. Default is *0.98*.
	 */
	refractionRatio?: number | undefined;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 */
	wireframe?: boolean | undefined;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 */
	wireframeLinewidth?: number | undefined;

	/**
	 * Define appearance of line ends. Possible values are "butt", "round" and "square". Default is 'round'.
	 * This corresponds to the [2D Canvas lineCap](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 */
	wireframeLinecap?: string | undefined;

	/**
	 * Define appearance of line joints. Possible values are "round", "bevel" and "miter". Default is 'round'.
	 * This corresponds to the [2D Canvas lineJoin](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 */
	wireframeLinejoin?: string | undefined;
}

/**
 * A material for drawing geometries in a simple shaded (flat or wireframe) way.
 * This material is not affected by lights.
 */
export interface MeshBasicMaterial extends Material {
	/**
	 * Any property of the material (including any property inherited from [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material)) can be passed in here.
	 * The exception is the property [color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Hexadecimal), which can be passed in as a hexadecimal string and is *0xffffff* (white) by default. [Color.set](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color.set)( color ) is called internally.
	 * @param parameters - an object with one or more properties defining the material's appearance.
	 */
	new (parameters?: MeshBasicMaterialParameters): this;

	/**
	 * @default 'MeshBasicMaterial'
	 */
	type: string;

	/**
	 * Color of the material, by default set to white (0xffffff).
	 */
	color: Color;

	/**
	 * The color map. Default is  null.
	 */
	map: Texture | null | undefined;

	/**
	 * The light map. Default is null. The lightMap requires a second set of UVs.
	 */
	lightMap: Texture | null;

	/**
	 * Intensity of the baked light. Default is 1.
	 */
	lightMapIntensity: number | undefined;

	/**
	 * The red channel of this texture is used as the ambient occlusion map. Default is null.
	 * The aoMap requires a second set of UVs.
	 */
	aoMap: Texture | null | undefined;

	/**
	 * Intensity of the ambient occlusion effect. Default is 1. Zero is no occlusion effect.
	 */
	aoMapIntensity: number | undefined;

	/**
	 * Specular map used by the material. Default is null.
	 */
	specularMap: Texture | null | undefined;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 */
	alphaMap: Texture | null | undefined;

	/**
	 * The environment map. Default is null.
	 */
	envMap: Texture | null | undefined;

	/**
	 * How to combine the result of the surface's color with the environment map, if any.
	 * Options are [THREE.Multiply](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) (default), [THREE.MixOperation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials),
	 * [THREE.AddOperation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). If mix is chosen, the *.reflectivity* is used to blend between the two colors.
	 */
	combine: Combine | undefined;

	/**
	 * How much the environment map affects the surface; also see *.combine*.
	 * The default value is 1 and the valid range is between 0 (no reflections) and 1 (full reflections).
	 */
	reflectivity: number | undefined;

	/**
	 * The index of refraction (IOR) of air (approximately 1) divided by the index of refraction of the material.
	 * It is used with environment mapping modes [THREE.CubeRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) and [THREE.EquirectangularRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * The refraction ratio should not exceed 1. Default is *0.98*.
	 */
	refractionRatio: number | undefined;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 */
	wireframe: boolean | undefined;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 */
	wireframeLinewidth: number | undefined;

	/**
	 * Define appearance of line ends. Possible values are "butt", "round" and "square". Default is 'round'.
	 * This corresponds to the [2D Canvas lineCap](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 */
	wireframeLinecap: string | undefined;

	/**
	 * Define appearance of line joints. Possible values are "round", "bevel" and "miter". Default is 'round'.
	 * This corresponds to the [2D Canvas lineJoin](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 */
	wireframeLinejoin: string | undefined;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(parameters: MeshBasicMaterialParameters): void;
}

/**
 * Mesh depth material parameters
 */
export interface MeshDepthMaterialParameters extends MaterialParameters {
	/**
	 * The color map. Default is  null.
	 */
	map?: Texture | null | undefined;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 */
	alphaMap?: Texture | null | undefined;

	/**
	 * Encoding for depth packing. Default is [BasicDepthPacking](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 */
	depthPacking?: DepthPackingStrategies | undefined;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows,s block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 */
	displacementMap?: Texture | null | undefined;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 */
	displacementScale?: number | undefined;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 */
	displacementBias?: number | undefined;

	/**
	 * Render geometry as wireframe. Default is false (i.e. render as smooth shaded).
	 */
	wireframe?: boolean | undefined;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 */
	wireframeLinewidth?: number | undefined;
}

/**
 * A material for drawing geometry by depth. Depth is based off of the camera near and far plane. White is nearest, black is farthest.
 */
export interface MeshDepthMaterial extends Material {
	/**
	 * @param parameters - an object with one or more properties defining the material's appearance.
	 * Any property of the material (including any property inherited from [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material)) can be passed in here.
	 */
	new (parameters?: MeshDepthMaterialParameters): this;

	/**
	 * @default 'MeshDepthMaterial'
	 */
	type: string;

	/**
	 * The color map. Default is  null.
	 * @default null
	 */
	map: Texture | null;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * Encoding for depth packing. Default is [BasicDepthPacking](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * @default THREE.BasicDepthPacking
	 */
	depthPacking: DepthPackingStrategies;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows,s block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 * @default null
	 */
	displacementMap: Texture | null;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * Render geometry as wireframe. Default is false (i.e. render as smooth shaded).
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * Whether the material is affected by fog. Default is *false*.
	 * @default false
	 */
	fog: boolean;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(parameters: MeshDepthMaterialParameters): void;
}

/**
 * Mesh distance material parameters
 */
export interface MeshDistanceMaterialParameters extends MaterialParameters {
	/**
	 * The color map. Default is  null.
	 */
	map?: Texture | null | undefined;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 */
	alphaMap?: Texture | null | undefined;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows,s block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 */
	displacementMap?: Texture | null | undefined;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 */
	displacementScale?: number | undefined;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 */
	displacementBias?: number | undefined;

	/**
	 * The far value of the point light's internal shadow camera.
	 */
	farDistance?: number | undefined;

	/**
	 * The near value of the point light's internal shadow camera.
	 */
	nearDistance?: number | undefined;

	/**
	 */
	referencePosition?: Vector3 | undefined;
}

/**
 * MeshDistanceMaterial is internally used for implementing shadow mapping with [PointLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PointLight)s.
 * Can also be used to customize the shadow casting of an object by assigning an instance of [name] to [Object3D.customDistanceMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.customDistanceMaterial).
 * The following examples demonstrates this approach in order to ensure transparent parts of objects do no cast shadows.
 * 
 * ### Examples
 * [WebGL / shadowmap / pointlight](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_shadowmap_pointlight)
 */
export interface MeshDistanceMaterial extends Material {
	/**
	 * Any property of the material (including any property inherited from [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material)) can be passed in here.
	 * @param parameters - an object with one or more properties defining the material's appearance.
	 */
	new (parameters?: MeshDistanceMaterialParameters): this;

	/**
	 * @default 'MeshDistanceMaterial'
	 */
	type: string;

	/**
	 * The color map. Default is  null.
	 * @default null
	 */
	map: Texture | null;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows,s block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 * @default null
	 */
	displacementMap: Texture | null;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * The far value of the point light's internal shadow camera.
	 * @default 1000
	 */
	farDistance: number;

	/**
	 * The near value of the point light's internal shadow camera.
	 * @default 1
	 */
	nearDistance: number;

	/**
	 * @default new THREE.Vector3()
	 */
	referencePosition: Vector3;

	/**
	 * Whether the material is affected by fog. Default is *false*.
	 * @default false
	 */
	fog: boolean;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(parameters: MeshDistanceMaterialParameters): void;
}

/**
 */
export interface MeshLambertMaterialParameters extends MaterialParameters {
	/**
	 * Color of the material, by default set to white (0xffffff).
	 */
	color?: ColorRepresentation | undefined;

	/**
	 * Emissive (light) color of the material, essentially a solid color unaffected by other lighting.
	 * Default is black.
	 */
	emissive?: ColorRepresentation | undefined;

	/**
	 * Intensity of the emissive light. Modulates the emissive color. Default is 1.
	 */
	emissiveIntensity?: number | undefined;

	/**
	 * Set emissive (glow) map. Default is null. The emissive map color is modulated by the emissive color and the emissive intensity. If you have an emissive map, be sure to set the emissive color to something other than black.
	 */
	emissiveMap?: Texture | null | undefined;

	/**
	 * The color map. Default is  null.
	 */
	map?: Texture | null | undefined;

	/**
	 * The light map. Default is null. The lightMap requires a second set of UVs.
	 */
	lightMap?: Texture | null | undefined;

	/**
	 * Intensity of the baked light. Default is 1.
	 */
	lightMapIntensity?: number | undefined;

	/**
	 * The red channel of this texture is used as the ambient occlusion map. Default is null.
	 * The aoMap requires a second set of UVs.
	 */
	aoMap?: Texture | null | undefined;

	/**
	 * Intensity of the ambient occlusion effect. Default is 1. Zero is no occlusion effect.
	 */
	aoMapIntensity?: number | undefined;

	/**
	 * Specular map used by the material. Default is null.
	 */
	specularMap?: Texture | null | undefined;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 */
	alphaMap?: Texture | null | undefined;

	/**
	 * The environment map. Default is null.
	 */
	envMap?: Texture | null | undefined;

	/**
	 * How to combine the result of the surface's color with the environment map, if any.
	 * Options are [THREE.Multiply](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) (default), [THREE.MixOperation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials),
	 * [THREE.AddOperation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). If mix is chosen, the *.reflectivity* is used to blend between the two colors.
	 */
	combine?: Combine | undefined;

	/**
	 * How much the environment map affects the surface; also see *.combine*.
	 * The default value is 1 and the valid range is between 0 (no reflections) and 1 (full reflections).
	 */
	reflectivity?: number | undefined;

	/**
	 * The index of refraction (IOR) of air (approximately 1) divided by the index of refraction of the material.
	 * It is used with environment mapping modes [THREE.CubeRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) and [THREE.EquirectangularRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * The refraction ratio should not exceed 1. Default is *0.98*.
	 */
	refractionRatio?: number | undefined;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 */
	wireframe?: boolean | undefined;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 */
	wireframeLinewidth?: number | undefined;

	/**
	 * Define appearance of line ends. Possible values are "butt", "round" and "square". Default is 'round'.
	 * This corresponds to the [2D Canvas lineCap](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 */
	wireframeLinecap?: string | undefined;

	/**
	 * Define appearance of line joints. Possible values are "round", "bevel" and "miter". Default is 'round'.
	 * This corresponds to the [2D Canvas lineJoin](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 */
	wireframeLinejoin?: string | undefined;
}

/**
 */
export interface MeshLambertMaterial extends Material {
	/**
	 */
	new (parameters?: MeshLambertMaterialParameters): this;

	/**
	 * @default 'MeshLambertMaterial'
	 */
	type: string;

	/**
	 * Color of the material, by default set to white (0xffffff).
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * Emissive (light) color of the material, essentially a solid color unaffected by other lighting.
	 * Default is black.
	 * @default new THREE.Color( 0x000000 )
	 */
	emissive: Color;

	/**
	 * Intensity of the emissive light. Modulates the emissive color. Default is 1.
	 * @default 1
	 */
	emissiveIntensity: number;

	/**
	 * Set emissive (glow) map. Default is null. The emissive map color is modulated by the emissive color and the emissive intensity. If you have an emissive map, be sure to set the emissive color to something other than black.
	 * @default null
	 */
	emissiveMap: Texture | null;

	/**
	 * The color map. Default is  null.
	 * @default null
	 */
	map: Texture | null;

	/**
	 * The light map. Default is null. The lightMap requires a second set of UVs.
	 * @default null
	 */
	lightMap: Texture | null;

	/**
	 * Intensity of the baked light. Default is 1.
	 * @default 1
	 */
	lightMapIntensity: number;

	/**
	 * The red channel of this texture is used as the ambient occlusion map. Default is null.
	 * The aoMap requires a second set of UVs.
	 * @default null
	 */
	aoMap: Texture | null;

	/**
	 * Intensity of the ambient occlusion effect. Default is 1. Zero is no occlusion effect.
	 * @default 1
	 */
	aoMapIntensity: number;

	/**
	 * Specular map used by the material. Default is null.
	 * @default null
	 */
	specularMap: Texture | null;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * The environment map. Default is null.
	 * @default null
	 */
	envMap: Texture | null;

	/**
	 * How to combine the result of the surface's color with the environment map, if any.
	 * Options are [THREE.Multiply](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) (default), [THREE.MixOperation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials),
	 * [THREE.AddOperation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). If mix is chosen, the *.reflectivity* is used to blend between the two colors.
	 * @default THREE.MultiplyOperation
	 */
	combine: Combine;

	/**
	 * How much the environment map affects the surface; also see *.combine*.
	 * The default value is 1 and the valid range is between 0 (no reflections) and 1 (full reflections).
	 * @default 1
	 */
	reflectivity: number;

	/**
	 * The index of refraction (IOR) of air (approximately 1) divided by the index of refraction of the material.
	 * It is used with environment mapping modes [THREE.CubeRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) and [THREE.EquirectangularRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * The refraction ratio should not exceed 1. Default is *0.98*.
	 * @default 0.98
	 */
	refractionRatio: number;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * Define appearance of line ends. Possible values are "butt", "round" and "square". Default is 'round'.
	 * This corresponds to the [2D Canvas lineCap](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 * @default 'round'
	 */
	wireframeLinecap: string;

	/**
	 * Define appearance of line joints. Possible values are "round", "bevel" and "miter". Default is 'round'.
	 * This corresponds to the [2D Canvas lineJoin](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 * @default 'round'
	 */
	wireframeLinejoin: string;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(parameters: MeshLambertMaterialParameters): void;
}

/**
 */
export interface MeshMatcapMaterialParameters extends MaterialParameters {
	/**
	 * Color of the material, by default set to white (0xffffff).
	 */
	color?: ColorRepresentation | undefined;

	/**
	 * The matcap map. Default is null.
	 */
	matcap?: Texture | null | undefined;

	/**
	 * The color map. Default is  null.
	 */
	map?: Texture | null | undefined;

	/**
	 * The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights.
	 * Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored.
	 */
	bumpMap?: Texture | null | undefined;

	/**
	 * How much the bump map affects the material. Typical ranges are 0-1. Default is 1.
	 */
	bumpScale?: number | undefined;

	/**
	 * The texture to create a normal map. The RGB values affect the surface normal for each pixel fragment and change the way the color is lit. Normal maps do not change the actual shape of the surface, only the lighting.e In case the material has a normal map authored using the left handed convention, the y component of normalScale should be negated to compensate for the different handedness.
	 */
	normalMap?: Texture | null | undefined;

	/**
	 * The type of normal map.
	 * Options are [THREE.TangentSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant) (default), and [THREE.ObjectSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant).
	 */
	normalMapType?: NormalMapTypes | undefined;

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 * Default is a [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) set to (1,1).
	 */
	normalScale?: Vector2 | undefined;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows,s block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 */
	displacementMap?: Texture | null | undefined;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 */
	displacementScale?: number | undefined;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 */
	displacementBias?: number | undefined;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 */
	alphaMap?: Texture | null | undefined;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 */
	flatShading?: boolean | undefined;
}

/**
 */
export interface MeshMatcapMaterial extends Material {
	/**
	 */
	new (parameters?: MeshMatcapMaterialParameters): this;

	/**
	 * @default 'MeshMatcapMaterial'
	 */
	type: string;

	/**
	 * @default { 'MATCAP': '' }
	 */
	defines: { [key: string]: any };

	/**
	 * Color of the material, by default set to white (0xffffff).
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * The matcap map. Default is null.
	 * @default null
	 */
	matcap: Texture | null;

	/**
	 * The color map. Default is  null.
	 * @default null
	 */
	map: Texture | null;

	/**
	 * The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights.
	 * Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored.
	 * @default null
	 */
	bumpMap: Texture | null;

	/**
	 * How much the bump map affects the material. Typical ranges are 0-1. Default is 1.
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * The texture to create a normal map. The RGB values affect the surface normal for each pixel fragment and change the way the color is lit. Normal maps do not change the actual shape of the surface, only the lighting.e In case the material has a normal map authored using the left handed convention, the y component of normalScale should be negated to compensate for the different handedness.
	 * @default null
	 */
	normalMap: Texture | null;

	/**
	 * The type of normal map.
	 * Options are [THREE.TangentSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant) (default), and [THREE.ObjectSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant).
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: NormalMapTypes;

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 * Default is a [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) set to (1,1).
	 * @default new Vector2( 1, 1 )
	 */
	normalScale: Vector2;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows,s block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 * @default null
	 */
	displacementMap: Texture | null;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 * @default false
	 */
	flatShading: boolean;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(parameters: MeshMatcapMaterialParameters): void;
}

/**
 */
export interface MeshNormalMaterialParameters extends MaterialParameters {
	/**
	 * The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights.
	 * Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored.
	 */
	bumpMap?: Texture | null | undefined;

	/**
	 * How much the bump map affects the material. Typical ranges are 0-1. Default is 1.
	 */
	bumpScale?: number | undefined;

	/**
	 * The texture to create a normal map. The RGB values affect the surface normal for each pixel fragment and change the way the color is lit. Normal maps do not change the actual shape of the surface, only the lighting.e In case the material has a normal map authored using the left handed convention, the y component of normalScale should be negated to compensate for the different handedness.
	 */
	normalMap?: Texture | null | undefined;

	/**
	 * The type of normal map.
	 * Options are [THREE.TangentSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant) (default), and [THREE.ObjectSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant).
	 */
	normalMapType?: NormalMapTypes | undefined;

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 * Default is a [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) set to (1,1).
	 */
	normalScale?: Vector2 | undefined;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows,s block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 */
	displacementMap?: Texture | null | undefined;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 */
	displacementScale?: number | undefined;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 */
	displacementBias?: number | undefined;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 */
	wireframe?: boolean | undefined;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 */
	wireframeLinewidth?: number | undefined;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 */
	flatShading?: boolean | undefined;
}

/**
 */
export interface MeshNormalMaterial extends Material {
	/**
	 */
	new (parameters?: MeshNormalMaterialParameters): this;

	/**
	 * @default 'MeshNormalMaterial'
	 */
	type: string;

	/**
	 * The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights.
	 * Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored.
	 * @default null
	 */
	bumpMap: Texture | null;

	/**
	 * How much the bump map affects the material. Typical ranges are 0-1. Default is 1.
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * The texture to create a normal map. The RGB values affect the surface normal for each pixel fragment and change the way the color is lit. Normal maps do not change the actual shape of the surface, only the lighting.e In case the material has a normal map authored using the left handed convention, the y component of normalScale should be negated to compensate for the different handedness.
	 * @default null
	 */
	normalMap: Texture | null;

	/**
	 * The type of normal map.
	 * Options are [THREE.TangentSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant) (default), and [THREE.ObjectSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant).
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: NormalMapTypes;

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 * Default is a [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) set to (1,1).
	 * @default new THREE.Vector2( 1, 1 )
	 */
	normalScale: Vector2;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows,s block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 * @default null
	 */
	displacementMap: Texture | null;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 * @default false
	 */
	flatShading: boolean;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(parameters: MeshNormalMaterialParameters): void;
}

/**
 */
export interface MeshPhongMaterialParameters extends MaterialParameters {
	/**
	 * Color of the material, by default set to white (0xffffff).
	 */
	color?: ColorRepresentation | undefined;

	/**
	 * Specular color of the material. Default is a [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) set to *0x111111* (very dark grey).
	 * This defines how shiny the material is and the color of its shine.
	 */
	specular?: ColorRepresentation | undefined;

	/**
	 * How shiny the *.specular* highlight is; a higher value gives a sharper highlight. Default is *30*.
	 */
	shininess?: number | undefined;

	/**
	 * Float in the range of *0.0* - *1.0* indicating how transparent the material is.
	 * A value of *0.0* indicates fully transparent, *1.0* is fully opaque.
	 * If the material's [transparent](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) property is not set to *true*, the material will remain fully opaque and this value will only affect its color. 
	 * Default is *1.0*.
	 */
	opacity?: number | undefined;

	/**
	 * The color map. Default is  null.
	 */
	map?: Texture | null | undefined;

	/**
	 * The light map. Default is null. The lightMap requires a second set of UVs.
	 */
	lightMap?: Texture | null | undefined;

	/**
	 * Intensity of the baked light. Default is 1.
	 */
	lightMapIntensity?: number | undefined;

	/**
	 * The red channel of this texture is used as the ambient occlusion map. Default is null.
	 * The aoMap requires a second set of UVs.
	 */
	aoMap?: Texture | null | undefined;

	/**
	 * Intensity of the ambient occlusion effect. Default is 1. Zero is no occlusion effect.
	 */
	aoMapIntensity?: number | undefined;

	/**
	 * Emissive (light) color of the material, essentially a solid color unaffected by other lighting.
	 * Default is black.
	 */
	emissive?: ColorRepresentation | undefined;

	/**
	 * Intensity of the emissive light. Modulates the emissive color. Default is 1.
	 */
	emissiveIntensity?: number | undefined;

	/**
	 * Set emissive (glow) map. Default is null. The emissive map color is modulated by the emissive color and the emissive intensity. If you have an emissive map, be sure to set the emissive color to something other than black.
	 */
	emissiveMap?: Texture | null | undefined;

	/**
	 * The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights.
	 * Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored.
	 */
	bumpMap?: Texture | null | undefined;

	/**
	 * How much the bump map affects the material. Typical ranges are 0-1. Default is 1.
	 */
	bumpScale?: number | undefined;

	/**
	 * The texture to create a normal map. The RGB values affect the surface normal for each pixel fragment and change the way the color is lit. Normal maps do not change the actual shape of the surface, only the lighting.e In case the material has a normal map authored using the left handed convention, the y component of normalScale should be negated to compensate for the different handedness.
	 */
	normalMap?: Texture | null | undefined;

	/**
	 * The type of normal map.
	 * Options are [THREE.TangentSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant) (default), and [THREE.ObjectSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant).
	 */
	normalMapType?: NormalMapTypes | undefined;

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 * Default is a [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) set to (1,1).
	 */
	normalScale?: Vector2 | undefined;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows,s block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 */
	displacementMap?: Texture | null | undefined;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 */
	displacementScale?: number | undefined;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 */
	displacementBias?: number | undefined;

	/**
	 * Specular map used by the material. Default is null.
	 */
	specularMap?: Texture | null | undefined;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 */
	alphaMap?: Texture | null | undefined;

	/**
	 * The environment map. Default is null.
	 */
	envMap?: Texture | null | undefined;

	/**
	 * How to combine the result of the surface's color with the environment map, if any.
	 * Options are [THREE.Multiply](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) (default), [THREE.MixOperation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials),
	 * [THREE.AddOperation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). If mix is chosen, the *.reflectivity* is used to blend between the two colors.
	 */
	combine?: Combine | undefined;

	/**
	 * How much the environment map affects the surface; also see *.combine*.
	 * The default value is 1 and the valid range is between 0 (no reflections) and 1 (full reflections).
	 */
	reflectivity?: number | undefined;

	/**
	 * The index of refraction (IOR) of air (approximately 1) divided by the index of refraction of the material.
	 * It is used with environment mapping modes [THREE.CubeRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) and [THREE.EquirectangularRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * The refraction ratio should not exceed 1. Default is *0.98*.
	 */
	refractionRatio?: number | undefined;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 */
	wireframe?: boolean | undefined;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 */
	wireframeLinewidth?: number | undefined;

	/**
	 * Define appearance of line ends. Possible values are "butt", "round" and "square". Default is 'round'.
	 * This corresponds to the [2D Canvas lineCap](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 */
	wireframeLinecap?: string | undefined;

	/**
	 * Define appearance of line joints. Possible values are "round", "bevel" and "miter". Default is 'round'.
	 * This corresponds to the [2D Canvas lineJoin](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 */
	wireframeLinejoin?: string | undefined;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 */
	flatShading?: boolean | undefined;
}

/**
 */
export interface MeshPhongMaterial extends Material {
	/**
	 */
	new (parameters?: MeshPhongMaterialParameters): this;

	/**
	 * @default 'MeshNormalMaterial'
	 */
	type: string;

	/**
	 * Color of the material, by default set to white (0xffffff).
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * Specular color of the material. Default is a [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) set to *0x111111* (very dark grey).
	 * This defines how shiny the material is and the color of its shine.
	 * @default new THREE.Color( 0x111111 )
	 */
	specular: Color;

	/**
	 * How shiny the *.specular* highlight is; a higher value gives a sharper highlight. Default is *30*.
	 * @default 30
	 */
	shininess: number;

	/**
	 * The color map. Default is  null.
	 * @default null
	 */
	map: Texture | null;

	/**
	 * The light map. Default is null. The lightMap requires a second set of UVs.
	 * @default null
	 */
	lightMap: Texture | null;

	/**
	 * Intensity of the baked light. Default is 1.
	 * @default null
	 */
	lightMapIntensity: number;

	/**
	 * The red channel of this texture is used as the ambient occlusion map. Default is null.
	 * The aoMap requires a second set of UVs.
	 * @default null
	 */
	aoMap: Texture | null;

	/**
	 * Intensity of the ambient occlusion effect. Default is 1. Zero is no occlusion effect.
	 * @default null
	 */
	aoMapIntensity: number;

	/**
	 * Emissive (light) color of the material, essentially a solid color unaffected by other lighting.
	 * Default is black.
	 * @default new THREE.Color( 0x000000 )
	 */
	emissive: Color;

	/**
	 * Intensity of the emissive light. Modulates the emissive color. Default is 1.
	 * @default 1
	 */
	emissiveIntensity: number;

	/**
	 * Set emissive (glow) map. Default is null. The emissive map color is modulated by the emissive color and the emissive intensity. If you have an emissive map, be sure to set the emissive color to something other than black.
	 * @default null
	 */
	emissiveMap: Texture | null;

	/**
	 * The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights.
	 * Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored.
	 * @default null
	 */
	bumpMap: Texture | null;

	/**
	 * How much the bump map affects the material. Typical ranges are 0-1. Default is 1.
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * The texture to create a normal map. The RGB values affect the surface normal for each pixel fragment and change the way the color is lit. Normal maps do not change the actual shape of the surface, only the lighting.e In case the material has a normal map authored using the left handed convention, the y component of normalScale should be negated to compensate for the different handedness.
	 * @default null
	 */
	normalMap: Texture | null;

	/**
	 * The type of normal map.
	 * Options are [THREE.TangentSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant) (default), and [THREE.ObjectSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant).
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: NormalMapTypes;

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 * Default is a [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) set to (1,1).
	 * @default new Vector2( 1, 1 )
	 */
	normalScale: Vector2;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows,s block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 * @default null
	 */
	displacementMap: Texture | null;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * Specular map used by the material. Default is null.
	 * @default null
	 */
	specularMap: Texture | null;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * The environment map. Default is null.
	 * @default null
	 */
	envMap: Texture | null;

	/**
	 * How to combine the result of the surface's color with the environment map, if any.
	 * Options are [THREE.Multiply](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials) (default), [THREE.MixOperation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials),
	 * [THREE.AddOperation](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Materials). If mix is chosen, the *.reflectivity* is used to blend between the two colors.
	 * @default THREE.MultiplyOperation
	 */
	combine: Combine;

	/**
	 * How much the environment map affects the surface; also see *.combine*.
	 * The default value is 1 and the valid range is between 0 (no reflections) and 1 (full reflections).
	 * @default 1
	 */
	reflectivity: number;

	/**
	 * The index of refraction (IOR) of air (approximately 1) divided by the index of refraction of the material.
	 * It is used with environment mapping modes [THREE.CubeRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) and [THREE.EquirectangularRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * The refraction ratio should not exceed 1. Default is *0.98*.
	 * @default 0.98
	 */
	refractionRatio: number;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * Define appearance of line ends. Possible values are "butt", "round" and "square". Default is 'round'.
	 * This corresponds to the [2D Canvas lineCap](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 * @default 'round'
	 */
	wireframeLinecap: string;

	/**
	 * Define appearance of line joints. Possible values are "round", "bevel" and "miter". Default is 'round'.
	 * This corresponds to the [2D Canvas lineJoin](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 * @default 'round'
	 */
	wireframeLinejoin: string;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 * @default false
	 */
	flatShading: boolean;

	/**
	 * @deprecated Use {@link MeshStandardMaterial THREE.MeshStandardMaterial} instead.
	 */
	metal: boolean;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(parameters: MeshPhongMaterialParameters): void;
}

/**
 */
export interface MeshPhysicalMaterialParameters extends MeshStandardMaterialParameters {
	/**
	 * Represents the intensity of the clear coat layer, from *0.0* to *1.0*. Use clear coat related properties to enable multilayer materials that have a thin translucent layer over the base layer. Default is *0.0*.
	 */
	clearcoat?: number | undefined;

	/**
	 * The red channel of this texture is multiplied against *.clearcoat*, for per-pixel control over a coating's intensity. Default is *null*.
	 */
	clearcoatMap?: Texture | null | undefined;

	/**
	 * Roughness of the clear coat layer, from *0.0* to *1.0*. Default is *0.0*.
	 */
	clearcoatRoughness?: number | undefined;

	/**
	 * The green channel of this texture is multiplied against *.clearcoatRoughness*, for per-pixel control over a coating's roughness. Default is *null*.
	 */
	clearcoatRoughnessMap?: Texture | null | undefined;

	/**
	 * How much *.clearcoatNormalMap* affects the clear coat layer, from *(0,0)* to *(1,1)*. Default is *(1,1)*.
	 */
	clearcoatNormalScale?: Vector2 | undefined;

	/**
	 * Can be used to enable independent normals for the clear coat layer. Default is *null*.
	 */
	clearcoatNormalMap?: Texture | null | undefined;

	/**
	 * How much the environment map affects the surface; also see *.combine*.
	 * The default value is 1 and the valid range is between 0 (no reflections) and 1 (full reflections).
	 */
	reflectivity?: number | undefined;

	/**
	 * Index-of-refraction for non-metallic materials, from *1.0* to *2.333*. Default is *1.5*.
	 */
	ior?: number | undefined;

	/**
	 */
	sheen?: number | undefined;

	/**
	 * The sheen tint. Default is *0xffffff*, white.
	 */
	sheenColor?: Color | undefined;

	/**
	 * Roughness of the sheen layer, from *0.0* to *1.0*. Default is *1.0*.
	 */
	sheenRoughness?: number | undefined;

	/**
	 * Degree of transmission (or optical transparency), from *0.0* to *1.0*. Default is *0.0*.
	 * Thin, transparent or semitransparent, plastic or glass materials remain largely reflective even if they are fully transmissive.
	 * The transmission property can be used to model these materials.
	 * When transmission is non-zero, [opacity](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material.opacity) should be set to *1*.
	 */
	transmission?: number | undefined;

	/**
	 * The red channel of this texture is multiplied against *.transmission*, for per-pixel control over optical transparency. Default is *null*.
	 */
	transmissionMap?: Texture | null | undefined;

	/**
	 */
	attenuationDistance?: number | undefined;

	/**
	 */
	attenuationColor?: Color | undefined;

	/**
	 */
	specularIntensity?: number | undefined;

	/**
	 */
	specularColor?: Color | undefined;

	/**
	 */
	specularIntensityMap?: Texture | null | undefined;

	/**
	 */
	specularColorMap?: Texture | null | undefined;
}

/**
 */
export interface MeshPhysicalMaterial extends MeshStandardMaterial {
	/**
	 */
	new (parameters?: MeshPhysicalMaterialParameters): this;

	/**
	 * @default 'MeshPhysicalMaterial'
	 */
	type: string;

	/**
	 * @default { 'STANDARD': '', 'PHYSICAL': '' }
	 */
	defines: { [key: string]: any };

	/**
	 * Represents the intensity of the clear coat layer, from *0.0* to *1.0*. Use clear coat related properties to enable multilayer materials that have a thin translucent layer over the base layer. Default is *0.0*.
	 * @default 0
	 */
	clearcoat: number;

	/**
	 * The red channel of this texture is multiplied against *.clearcoat*, for per-pixel control over a coating's intensity. Default is *null*.
	 * @default null
	 */
	clearcoatMap: Texture | null;

	/**
	 * Roughness of the clear coat layer, from *0.0* to *1.0*. Default is *0.0*.
	 * @default 0
	 */
	clearcoatRoughness: number;

	/**
	 * The green channel of this texture is multiplied against *.clearcoatRoughness*, for per-pixel control over a coating's roughness. Default is *null*.
	 * @default null
	 */
	clearcoatRoughnessMap: Texture | null;

	/**
	 * How much *.clearcoatNormalMap* affects the clear coat layer, from *(0,0)* to *(1,1)*. Default is *(1,1)*.
	 * @default new THREE.Vector2( 1, 1 )
	 */
	clearcoatNormalScale: Vector2;

	/**
	 * Can be used to enable independent normals for the clear coat layer. Default is *null*.
	 * @default null
	 */
	clearcoatNormalMap: Texture | null;

	/**
	 * How much the environment map affects the surface; also see *.combine*.
	 * The default value is 1 and the valid range is between 0 (no reflections) and 1 (full reflections).
	 * @default 0.5
	 */
	reflectivity: number;

	/**
	 * Index-of-refraction for non-metallic materials, from *1.0* to *2.333*. Default is *1.5*.
	 * @default 1.5
	 */
	ior: number;

	/**
	 * @default 0.0
	 */
	sheen: number;

	/**
	 * The sheen tint. Default is *0xffffff*, white.
	 * @default Color( 0x000000 )
	 */
	sheenColor: Color;

	/**
	 * The RGB channels of this texture are multiplied against *.sheenColor*, for per-pixel control over sheen tint. Default is *null*.
	 * @default null
	 */
	sheenColorMap: Texture | null;

	/**
	 * Roughness of the sheen layer, from *0.0* to *1.0*. Default is *1.0*.
	 * @default 1.0
	 */
	sheenRoughness: number;

	/**
	 * @default null
	 */
	sheenRoughnessMap: Texture | null;

	/**
	 * Degree of transmission (or optical transparency), from *0.0* to *1.0*. Default is *0.0*.
	 * Thin, transparent or semitransparent, plastic or glass materials remain largely reflective even if they are fully transmissive.
	 * The transmission property can be used to model these materials.
	 * When transmission is non-zero, [opacity](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material.opacity) should be set to *1*.
	 * @default 0
	 */
	transmission: number;

	/**
	 * The red channel of this texture is multiplied against *.transmission*, for per-pixel control over optical transparency. Default is *null*.
	 * @default null
	 */
	transmissionMap: Texture | null;

	/**
	 * @default 0.01
	 */
	thickness: number;

	/**
	 * @default null
	 */
	thicknessMap: Texture | null;

	/**
	 * @default 0.0
	 */
	attenuationDistance: number;

	/**
	 * @default Color( 1, 1, 1 )
	 */
	attenuationColor: Color;

	/**
	 * @default 1.0
	 */
	specularIntensity: number;

	/**
	 * @default Color(1, 1, 1)
	 */
	specularColor: Color;

	/**
	 * @default null
	 */
	specularIntensityMap: Texture | null;

	/**
	 * @default null
	 */
	specularColorMap: Texture | null;
}

/**
 */
export interface MeshStandardMaterialParameters extends MaterialParameters {
	/**
	 * Color of the material, by default set to white (0xffffff).
	 */
	color?: ColorRepresentation | undefined;

	/**
	 * How rough the material appears. 0.0 means a smooth mirror reflection, 1.0 means fully diffuse. Default is 1.0.
	 * If roughnessMap is also provided, both values are multiplied.
	 */
	roughness?: number | undefined;

	/**
	 * How much the material is like a metal. Non-metallic materials such as wood or stone use 0.0, metallic use 1.0, with nothing (usually) in between. Default is 0.0. A value between 0.0 and 1.0 could be used for a rusty metal look. If metalnessMap is also provided, both values are multiplied.
	 */
	metalness?: number | undefined;

	/**
	 * The color map. Default is  null.
	 */
	map?: Texture | null | undefined;

	/**
	 * The light map. Default is null. The lightMap requires a second set of UVs.
	 */
	lightMap?: Texture | null | undefined;

	/**
	 * Intensity of the baked light. Default is 1.
	 */
	lightMapIntensity?: number | undefined;

	/**
	 * The red channel of this texture is used as the ambient occlusion map. Default is null.
	 * The aoMap requires a second set of UVs.
	 */
	aoMap?: Texture | null | undefined;

	/**
	 * Intensity of the ambient occlusion effect. Default is 1. Zero is no occlusion effect.
	 */
	aoMapIntensity?: number | undefined;

	/**
	 * Emissive (light) color of the material, essentially a solid color unaffected by other lighting.
	 * Default is black.
	 */
	emissive?: ColorRepresentation | undefined;

	/**
	 * Intensity of the emissive light. Modulates the emissive color. Default is 1.
	 */
	emissiveIntensity?: number | undefined;

	/**
	 * Set emissive (glow) map. Default is null. The emissive map color is modulated by the emissive color and the emissive intensity. If you have an emissive map, be sure to set the emissive color to something other than black.
	 */
	emissiveMap?: Texture | null | undefined;

	/**
	 * The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights.
	 * Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored.
	 */
	bumpMap?: Texture | null | undefined;

	/**
	 * How much the bump map affects the material. Typical ranges are 0-1. Default is 1.
	 */
	bumpScale?: number | undefined;

	/**
	 * The texture to create a normal map. The RGB values affect the surface normal for each pixel fragment and change the way the color is lit. Normal maps do not change the actual shape of the surface, only the lighting.e In case the material has a normal map authored using the left handed convention, the y component of normalScale should be negated to compensate for the different handedness.
	 */
	normalMap?: Texture | null | undefined;

	/**
	 * The type of normal map.
	 * Options are [THREE.TangentSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant) (default), and [THREE.ObjectSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant).
	 */
	normalMapType?: NormalMapTypes | undefined;

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 * Default is a [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) set to (1,1).
	 */
	normalScale?: Vector2 | undefined;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows,s block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 */
	displacementMap?: Texture | null | undefined;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 */
	displacementScale?: number | undefined;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 */
	displacementBias?: number | undefined;

	/**
	 * The green channel of this texture is used to alter the roughness of the material.
	 */
	roughnessMap?: Texture | null | undefined;

	/**
	 * The blue channel of this texture is used to alter the metalness of the material.
	 */
	metalnessMap?: Texture | null | undefined;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 */
	alphaMap?: Texture | null | undefined;

	/**
	 * The environment map. Default is null.
	 */
	envMap?: Texture | null | undefined;

	/**
	 * Scales the effect of the environment map by multiplying its color.
	 */
	envMapIntensity?: number | undefined;

	/**
	 * The index of refraction (IOR) of air (approximately 1) divided by the index of refraction of the material.
	 * It is used with environment mapping modes [THREE.CubeRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) and [THREE.EquirectangularRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * The refraction ratio should not exceed 1. Default is *0.98*.
	 */
	refractionRatio?: number | undefined;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 */
	wireframe?: boolean | undefined;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 */
	wireframeLinewidth?: number | undefined;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 */
	flatShading?: boolean | undefined;
}

/**
 */
export interface MeshStandardMaterial extends Material {
	/**
	 */
	new (parameters?: MeshStandardMaterialParameters): this;

	/**
	 * @default 'MeshStandardMaterial'
	 */
	type: string;

	/**
	 * @default { 'STANDARD': '' }
	 */
	defines: { [key: string]: any };

	/**
	 * Color of the material, by default set to white (0xffffff).
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * How rough the material appears. 0.0 means a smooth mirror reflection, 1.0 means fully diffuse. Default is 1.0.
	 * If roughnessMap is also provided, both values are multiplied.
	 * @default 1
	 */
	roughness: number;

	/**
	 * How much the material is like a metal. Non-metallic materials such as wood or stone use 0.0, metallic use 1.0, with nothing (usually) in between. Default is 0.0. A value between 0.0 and 1.0 could be used for a rusty metal look. If metalnessMap is also provided, both values are multiplied.
	 * @default 0
	 */
	metalness: number;

	/**
	 * The color map. Default is  null.
	 * @default null
	 */
	map: Texture | null;

	/**
	 * The light map. Default is null. The lightMap requires a second set of UVs.
	 * @default null
	 */
	lightMap: Texture | null;

	/**
	 * Intensity of the baked light. Default is 1.
	 * @default 1
	 */
	lightMapIntensity: number;

	/**
	 * The red channel of this texture is used as the ambient occlusion map. Default is null.
	 * The aoMap requires a second set of UVs.
	 * @default null
	 */
	aoMap: Texture | null;

	/**
	 * Intensity of the ambient occlusion effect. Default is 1. Zero is no occlusion effect.
	 * @default 1
	 */
	aoMapIntensity: number;

	/**
	 * Emissive (light) color of the material, essentially a solid color unaffected by other lighting.
	 * Default is black.
	 * @default new THREE.Color( 0x000000 )
	 */
	emissive: Color;

	/**
	 * Intensity of the emissive light. Modulates the emissive color. Default is 1.
	 * @default 1
	 */
	emissiveIntensity: number;

	/**
	 * Set emissive (glow) map. Default is null. The emissive map color is modulated by the emissive color and the emissive intensity. If you have an emissive map, be sure to set the emissive color to something other than black.
	 * @default null
	 */
	emissiveMap: Texture | null;

	/**
	 * The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights.
	 * Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored.
	 * @default null
	 */
	bumpMap: Texture | null;

	/**
	 * How much the bump map affects the material. Typical ranges are 0-1. Default is 1.
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * The texture to create a normal map. The RGB values affect the surface normal for each pixel fragment and change the way the color is lit. Normal maps do not change the actual shape of the surface, only the lighting.e In case the material has a normal map authored using the left handed convention, the y component of normalScale should be negated to compensate for the different handedness.
	 * @default null
	 */
	normalMap: Texture | null;

	/**
	 * The type of normal map.
	 * Options are [THREE.TangentSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant) (default), and [THREE.ObjectSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant).
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: NormalMapTypes;

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 * Default is a [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) set to (1,1).
	 * @default new THREE.Vector2( 1, 1 )
	 */
	normalScale: Vector2;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows,s block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 * @default null
	 */
	displacementMap: Texture | null;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * The green channel of this texture is used to alter the roughness of the material.
	 * @default null
	 */
	roughnessMap: Texture | null;

	/**
	 * The blue channel of this texture is used to alter the metalness of the material.
	 * @default null
	 */
	metalnessMap: Texture | null;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * The environment map. Default is null.
	 * @default null
	 */
	envMap: Texture | null;

	/**
	 * Scales the effect of the environment map by multiplying its color.
	 * @default 1
	 */
	envMapIntensity: number;

	/**
	 * The index of refraction (IOR) of air (approximately 1) divided by the index of refraction of the material.
	 * It is used with environment mapping modes [THREE.CubeRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) and [THREE.EquirectangularRefractionMapping](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures).
	 * The refraction ratio should not exceed 1. Default is *0.98*.
	 * @default 0.98
	 */
	refractionRatio: number;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * Define appearance of line ends. Possible values are "butt", "round" and "square". Default is 'round'.
	 * This corresponds to the [2D Canvas lineCap](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 * @default 'round'
	 */
	wireframeLinecap: string;

	/**
	 * Define appearance of line joints. Possible values are "round", "bevel" and "miter". Default is 'round'.
	 * This corresponds to the [2D Canvas lineJoin](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 * @default 'round'
	 */
	wireframeLinejoin: string;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 * @default false
	 */
	flatShading: boolean;

	/**
	 */
	isMeshStandardMaterial: boolean;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(parameters: MeshStandardMaterialParameters): void;
}

export interface MeshToonMaterialParameters extends MaterialParameters {
	/** 
	 * Color of the material, by default set to white (0xffffff).
	 */
	color?: ColorRepresentation | undefined;

	/**
	 * Float in the range of *0.0* - *1.0* indicating how transparent the material is.
	 * A value of *0.0* indicates fully transparent, *1.0* is fully opaque.
	 * If the material's [transparent](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) property is not set to *true*, the material will remain fully opaque and this value will only affect its color. 
	 * Default is *1.0*.
	 */
	opacity?: number | undefined;

	/**
	 * Gradient map for toon shading. It's required to set [Texture.minFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.minFilter) and [Texture.magFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.magFilter) to [THREE.NearestFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) when using this type of texture. Default is *null*.
	 */
	gradientMap?: Texture | null | undefined;

	/**
	 * The color map. Default is  null.
	 */
	map?: Texture | null | undefined;

	/**
	 * The light map. Default is null. The lightMap requires a second set of UVs.
	 */
	lightMap?: Texture | null | undefined;

	/**
	 * Intensity of the baked light. Default is 1.
	 */
	lightMapIntensity?: number | undefined;

	/**
	 * The red channel of this texture is used as the ambient occlusion map. Default is null.
	 * The aoMap requires a second set of UVs.
	 */
	aoMap?: Texture | null | undefined;

	/**
	 * Intensity of the ambient occlusion effect. Default is 1. Zero is no occlusion effect.
	 */
	aoMapIntensity?: number | undefined;

	/**
	 * Emissive (light) color of the material, essentially a solid color unaffected by other lighting.
	 * Default is black.
	 */
	emissive?: ColorRepresentation | undefined;

	/**
	 * Intensity of the emissive light. Modulates the emissive color. Default is 1.
	 */
	emissiveIntensity?: number | undefined;

	/**
	 * Set emissive (glow) map. Default is null. The emissive map color is modulated by the emissive color and the emissive intensity. If you have an emissive map, be sure to set the emissive color to something other than black.
	 */
	emissiveMap?: Texture | null | undefined;

	/**
	 * The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights.
	 * Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored.
	 */
	bumpMap?: Texture | null | undefined;

	/**
	 * How much the bump map affects the material. Typical ranges are 0-1. Default is 1.
	 */
	bumpScale?: number | undefined;

	/**
	 * The texture to create a normal map. The RGB values affect the surface normal for each pixel fragment and change the way the color is lit. Normal maps do not change the actual shape of the surface, only the lighting.e In case the material has a normal map authored using the left handed convention, the y component of normalScale should be negated to compensate for the different handedness.
	 */
	normalMap?: Texture | null | undefined;

	/**
	 * The type of normal map.
	 * Options are [THREE.TangentSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant) (default), and [THREE.ObjectSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant).
	 */
	normalMapType?: NormalMapTypes | undefined;

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 * Default is a [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) set to (1,1).
	 */
	normalScale?: Vector2 | undefined;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows,s block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 */
	displacementMap?: Texture | null | undefined;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 */
	displacementScale?: number | undefined;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 */
	displacementBias?: number | undefined;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 */
	alphaMap?: Texture | null | undefined;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 */
	wireframe?: boolean | undefined;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 */
	wireframeLinewidth?: number | undefined;

	/**
	 * Define appearance of line ends. Possible values are "butt", "round" and "square". Default is 'round'.
	 * This corresponds to the [2D Canvas lineCap](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 */
	wireframeLinecap?: string | undefined;

	/**
	 * Define appearance of line joints. Possible values are "round", "bevel" and "miter". Default is 'round'.
	 * This corresponds to the [2D Canvas lineJoin](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 */
	wireframeLinejoin?: string | undefined;
}

/**
 */
export interface MeshToonMaterial extends Material {
	/**
	 */
	new (parameters?: MeshToonMaterialParameters): this;

	/**
	 * @default 'MeshToonMaterial'
	 */
	type: string;

	/**
	 * @default { 'TOON': '' }
	 */
	defines: { [key: string]: any };

	/**
	 * Color of the material, by default set to white (0xffffff).
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * Gradient map for toon shading. It's required to set [Texture.minFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.minFilter) and [Texture.magFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Texture.magFilter) to [THREE.NearestFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Textures) when using this type of texture. Default is *null*.
	 * @default null
	 */
	gradientMap: Texture | null;

	/**
	 * The color map. Default is  null.
	 * @default null
	 */
	map: Texture | null;

	/**
	 * The light map. Default is null. The lightMap requires a second set of UVs.
	 * @default null
	 */
	lightMap: Texture | null;

	/**
	 * Intensity of the baked light. Default is 1.
	 * @default 1
	 */
	lightMapIntensity: number;

	/**
	 * The red channel of this texture is used as the ambient occlusion map. Default is null.
	 * The aoMap requires a second set of UVs.
	 * @default null
	 */
	aoMap: Texture | null;

	/**
	 * Intensity of the ambient occlusion effect. Default is 1. Zero is no occlusion effect.
	 * @default 1
	 */
	aoMapIntensity: number;

	/**
	 * Emissive (light) color of the material, essentially a solid color unaffected by other lighting.
	 * Default is black.
	 * @default new THREE.Color( 0x000000 )
	 */
	emissive: Color;

	/**
	 * Intensity of the emissive light. Modulates the emissive color. Default is 1.
	 * @default 1
	 */
	emissiveIntensity: number;

	/**
	 * Set emissive (glow) map. Default is null. The emissive map color is modulated by the emissive color and the emissive intensity. If you have an emissive map, be sure to set the emissive color to something other than black.
	 * @default null
	 */
	emissiveMap: Texture | null;

	/**
	 * The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights.
	 * Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored.
	 * @default null
	 */
	bumpMap: Texture | null;

	/**
	 * How much the bump map affects the material. Typical ranges are 0-1. Default is 1.
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * The texture to create a normal map. The RGB values affect the surface normal for each pixel fragment and change the way the color is lit. Normal maps do not change the actual shape of the surface, only the lighting.e In case the material has a normal map authored using the left handed convention, the y component of normalScale should be negated to compensate for the different handedness.
	 * @default null
	 */
	normalMap: Texture | null;

	/**
	 * The type of normal map.
	 * Options are [THREE.TangentSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant) (default), and [THREE.ObjectSpaceNormalMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/constant).
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: NormalMapTypes;

	/**
	 * How much the normal map affects the material. Typical ranges are 0-1.
	 * Default is a [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) set to (1,1).
	 * @default new THREE.Vector2( 1, 1 )
	 */
	normalScale: Vector2;

	/**
	 * The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows,s block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.
	 * @default null
	 */
	displacementMap: Texture | null;

	/**
	 * How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * The offset of the displacement map's values on the mesh's vertices.
	 * Without a displacement map set, this value is not applied. Default is 0.
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * Define appearance of line ends. Possible values are "butt", "round" and "square". Default is 'round'.
	 * This corresponds to the [2D Canvas lineCap](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 * @default 'round'
	 */
	wireframeLinecap: string;

	/**
	 * Define appearance of line joints. Possible values are "round", "bevel" and "miter". Default is 'round'.
	 * This corresponds to the [2D Canvas lineJoin](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin)
	 * property and it is ignored by the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer.
	 * @default 'round'
	 */
	wireframeLinejoin: string;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(parameters: MeshToonMaterialParameters): void;
}

/**
 */
export interface PointsMaterialParameters extends MaterialParameters {
	/**
	 */
	color?: ColorRepresentation | undefined;

	/**
	 * The color map. Default is  null.
	 */
	map?: Texture | null | undefined;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 */
	alphaMap?: Texture | null | undefined;

	/**
	 * Sets the size of the points. Default is 1.0.
	 * Will be capped if it exceeds the hardware dependent parameter [gl.ALIASED_POINT_SIZE_RANGE](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter).
	 */
	size?: number | undefined;

	/**
	 * Specify whether points' size is attenuated by the camera depth. (Perspective camera only.) Default is true.
	 */
	sizeAttenuation?: boolean | undefined;
}

/**
 */
export interface PointsMaterial extends Material {
	/**
	 */
	new (parameters?: PointsMaterialParameters): this;

	/**
	 * @default 'PointsMaterial'
	 */
	type: string;

	/**
	 * Color of the material, by default set to white (0xffffff).
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * The color map. Default is  null.
	 * @default null
	 */
	map: Texture | null;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * Sets the size of the points. Default is 1.0.
	 * Will be capped if it exceeds the hardware dependent parameter [gl.ALIASED_POINT_SIZE_RANGE](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter).
	 * @default 1
	 */
	size: number;

	/**
	 * Specify whether points' size is attenuated by the camera depth. (Perspective camera only.) Default is true.
	 * @default true
	 */
	sizeAttenuation: boolean;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(parameters: PointsMaterialParameters): void;
}

/**
 */
export interface RawShaderMaterial extends ShaderMaterial {
	/**
	 */
	new (parameters?: ShaderMaterialParameters): this;
}

/**
 */
export interface ShaderMaterialParameters extends MaterialParameters {
	/**
	 */
	uniforms?: { [uniform: string]: IUniform } | undefined;

	/**
	 * Vertex shader GLSL code.  This is the actual code for the shader. In the example above, the *vertexShader* and *fragmentShader* code is extracted from the DOM; it could be passed as a string directly or loaded via AJAX instead.
	 */
	vertexShader?: string | undefined;

	/**
	 * Fragment shader GLSL code.  This is the actual code for the shader. In the example above, the *vertexShader* and *fragmentShader* code is extracted from the DOM; it could be passed as a string directly or loaded via AJAX instead.
	 */
	fragmentShader?: string | undefined;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 */
	linewidth?: number | undefined;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 */
	wireframe?: boolean | undefined;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 */
	wireframeLinewidth?: number | undefined;

	/**
	 * Defines whether this material uses lighting; true to pass uniform data related to lighting to this shader. Default is false.
	 */
	lights?: boolean | undefined;

	/**
	 * Defines whether this material supports clipping; true to let the renderer pass the clippingPlanes uniform. Default is false.
	 */
	clipping?: boolean | undefined;

	/**
	 */
	extensions?:
		| {
				derivatives?: boolean | undefined;
				fragDepth?: boolean | undefined;
				drawBuffers?: boolean | undefined;
				shaderTextureLOD?: boolean | undefined;
		  }
		| undefined;

	/**
	 * Defines the GLSL version of custom shader code. Only relevant for WebGL 2 in order to define whether to specify GLSL 3.0 or not. Valid values are *THREE.GLSL1* or *THREE.GLSL3*. Default is *null*.
	 */
	glslVersion?: GLSLVersion | undefined;
}

/**
 */
export interface ShaderMaterial extends Material {
	/**
	 */
	new (parameters?: ShaderMaterialParameters): this;

	/**
	 * @default 'ShaderMaterial'
	 */
	type: string;

	/**
	 * @default {}
	 */
	defines: { [key: string]: any };

	/**
	 * @default {}
	 */
	uniforms: { [uniform: string]: IUniform };

	/**
	 * Vertex shader GLSL code.  This is the actual code for the shader. In the example above, the *vertexShader* and *fragmentShader* code is extracted from the DOM; it could be passed as a string directly or loaded via AJAX instead.
	 */
	 vertexShader: string;
	
	/**
	 * Fragment shader GLSL code.  This is the actual code for the shader. In the example above, the *vertexShader* and *fragmentShader* code is extracted from the DOM; it could be passed as a string directly or loaded via AJAX instead.
	 */
	fragmentShader: string;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 * @default 1
	 */
	linewidth: number;

	/**
	 * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * Controls wireframe thickness. Default is 1.
	 * Due to limitations of the [OpenGL Core Profile](https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf)
	 * with the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer on most platforms linewidth will always be 1 regardless of the set value.
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * Whether the material is affected by fog. Default is *false*.
	 * @default false
	 */
	fog: boolean;

	/**
	 * Defines whether this material uses lighting; true to pass uniform data related to lighting to this shader. Default is false.
	 * @default false
	 */
	lights: boolean;

	/**
	 * Defines whether this material supports clipping; true to let the renderer pass the clippingPlanes uniform. Default is false.
	 * @default false
	 */
	clipping: boolean;

	/**
	 * @deprecated Use {@link ShaderMaterial#extensions.derivatives extensions.derivatives} instead.
	 */
	derivatives: any;

	/**
	 * @default { derivatives: false, fragDepth: false, drawBuffers: false, shaderTextureLOD: false }
	 */
	extensions: {
		derivatives: boolean;
		fragDepth: boolean;
		drawBuffers: boolean;
		shaderTextureLOD: boolean;
	};

	/**
	 * @default { 'color': [ 1, 1, 1 ], 'uv': [ 0, 0 ], 'uv2': [ 0, 0 ] }
	 */
	defaultAttributeValues: any;

	/**
	 * @default undefined
	 */
	index0AttributeName: string | undefined;

	/**
	 * Can be used to force a uniform update while changing uniforms in [Object3D.onBeforeRender](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.onBeforeRender)(). Default is *false*.
	 * @default false
	 */
	uniformsNeedUpdate: boolean;

	/**
	 * Defines the GLSL version of custom shader code. Only relevant for WebGL 2 in order to define whether to specify GLSL 3.0 or not. Valid values are *THREE.GLSL1* or *THREE.GLSL3*. Default is *null*.
	 * @default null
	 */
	glslVersion: GLSLVersion | null;

	/**
	 */
	isShaderMaterial: boolean;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(parameters: ShaderMaterialParameters): void;

	/**
	 */
	toJSON(meta: any): any;
}

/**
 */
export interface ShadowMaterialParameters extends MaterialParameters {
	/**
	 * Color of the material, by default set to white (0xffffff).
	 */
	color?: ColorRepresentation | undefined;
}

/**
 */
export interface ShadowMaterial extends Material {
	/**
	 */
	new (parameters?: ShadowMaterialParameters): this;

	/**
	 * @default 'ShadowMaterial'
	 */
	type: string;

	/**
	 * Color of the material, by default set to white (0xffffff).
	 * @default new THREE.Color( 0x000000 )
	 */
	color: Color;

	/**
	 * Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects. g When set to true, the extent to which the material is transparent is controlled by setting its [opacity](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) property. 
	 * Default is *true*.
	 * @default true
	 */
	transparent: boolean;
}

/**
 */
export interface SpriteMaterialParameters extends MaterialParameters {
	/**
	 * Color of the material, by default set to white (0xffffff).
	 */
	color?: ColorRepresentation | undefined;

	/**
	 * The color map. Default is  null.
	 */
	map?: Texture | null | undefined;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 */
	alphaMap?: Texture | null | undefined;

	/**
	 * The rotation of the sprite in radians. Default is 0.
	 */
	rotation?: number | undefined;

	/**
	 * Specify whether points' size is attenuated by the camera depth. (Perspective camera only.) Default is true.
	 */
	sizeAttenuation?: boolean | undefined;
}

/**
 */
export interface SpriteMaterial extends Material {
	/**
	 */
	new (parameters?: SpriteMaterialParameters): this;

	/**
	 * @default 'SpriteMaterial'
	 */
	type: string;

	/**
	 * Color of the material, by default set to white (0xffffff).
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * The color map. Default is  null.
	 * @default null
	 */
	map: Texture | null;

	/**
	 * The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque). Default is null.
	 * Only the color of the texture is used, ignoring the alpha channel if one exists.
	 * For RGB and RGBA textures, the [WebGL](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * The rotation of the sprite in radians. Default is 0.
	 * @default 0
	 */
	rotation: number;

	/**
	 * Specify whether points' size is attenuated by the camera depth. (Perspective camera only.) Default is true.
	 * @default true
	 */
	sizeAttenuation: boolean;

	/**
	 * Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects. g When set to true, the extent to which the material is transparent is controlled by setting its [opacity](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) property. 
	 * Default is *true*.
	 * @default true
	 */
	transparent: boolean;

	readonly isSpriteMaterial: true;

	/**
	 * Sets the properties based on the *values*.
	 * @param value - a container with parameters.
	 */
	setValues(parameters: SpriteMaterialParameters): void;

	/**
	 */
	copy(source: SpriteMaterial): this;
}
