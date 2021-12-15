import {
	Blending, BlendingDstFactor, BlendingEquation, BlendingSrcFactor, Combine, DepthModes, DepthPackingStrategies, GLSLVersion, NormalMapTypes, PixelFormat, Side, StencilFunc, StencilOp
} from './constants';
import { EventDispatcher } from './core';
import { Color, ColorRepresentation, Plane, Vector2, Vector3 } from './math';
import { IUniform, Shader, WebGLRenderer } from './renderers';
import { Texture } from './textures';

export interface LineBasicMaterialParameters extends MaterialParameters {
	color?: ColorRepresentation | undefined;
	linewidth?: number | undefined;
	linecap?: string | undefined;
	linejoin?: string | undefined;
}

export interface LineBasicMaterial extends Material {
	new (parameters?: LineBasicMaterialParameters): this;

	/**
	 * @default 'LineBasicMaterial'
	 */
	type: string;

	/**
	 * @default 0xffffff
	 */
	color: Color;

	/**
	 * @default 1
	 */
	linewidth: number;

	/**
	 * @default 'round'
	 */
	linecap: string;

	/**
	 * @default 'round'
	 */
	linejoin: string;

	setValues(parameters: LineBasicMaterialParameters): void;
}

export interface LineDashedMaterialParameters extends LineBasicMaterialParameters {
	scale?: number | undefined;
	dashSize?: number | undefined;
	gapSize?: number | undefined;
}

export interface LineDashedMaterial extends LineBasicMaterial {
	new (parameters?: LineDashedMaterialParameters): this;

	/**
	 * @default 'LineDashedMaterial'
	 */
	type: string;

	/**
	 * @default 1
	 */
	scale: number;

	/**
	 * @default 1
	 */
	dashSize: number;

	/**
	 * @default 1
	 */
	gapSize: number;
	readonly isLineDashedMaterial: true;

	setValues(parameters: LineDashedMaterialParameters): void;
}

export interface MaterialParameters {
	alphaTest?: number | undefined;
	alphaToCoverage?: boolean | undefined;
	blendDst?: BlendingDstFactor | undefined;
	blendDstAlpha?: number | undefined;
	blendEquation?: BlendingEquation | undefined;
	blendEquationAlpha?: number | undefined;
	blending?: Blending | undefined;
	blendSrc?: BlendingSrcFactor | BlendingDstFactor | undefined;
	blendSrcAlpha?: number | undefined;
	clipIntersection?: boolean | undefined;
	clippingPlanes?: Plane[] | undefined;
	clipShadows?: boolean | undefined;
	colorWrite?: boolean | undefined;
	defines?: any;
	depthFunc?: DepthModes | undefined;
	depthTest?: boolean | undefined;
	depthWrite?: boolean | undefined;
	fog?: boolean | undefined;
	name?: string | undefined;
	opacity?: number | undefined;
	polygonOffset?: boolean | undefined;
	polygonOffsetFactor?: number | undefined;
	polygonOffsetUnits?: number | undefined;
	precision?: 'highp' | 'mediump' | 'lowp' | null | undefined;
	premultipliedAlpha?: boolean | undefined;
	dithering?: boolean | undefined;
	side?: Side | undefined;
	shadowSide?: Side | undefined;
	toneMapped?: boolean | undefined;
	transparent?: boolean | undefined;
	vertexColors?: boolean | undefined;
	visible?: boolean | undefined;
	format?: PixelFormat | undefined;
	stencilWrite?: boolean | undefined;
	stencilFunc?: StencilFunc | undefined;
	stencilRef?: number | undefined;
	stencilWriteMask?: number | undefined;
	stencilFuncMask?: number | undefined;
	stencilFail?: StencilOp | undefined;
	stencilZFail?: StencilOp | undefined;
	stencilZPass?: StencilOp | undefined;
	userData?: any;
}

/**
 * Materials describe the appearance of objects. They are defined in a (mostly) renderer-independent way, so you don't have to rewrite materials if you decide to use a different renderer.
 */
export interface Material extends EventDispatcher {
	new (): this;

	/**
	 * Sets the alpha value to be used when running an alpha test. Default is 0.
	 * @default 0
	 */
	alphaTest: number;

	/**
	 * Enables alpha to coverage. Can only be used with MSAA-enabled rendering contexts.
	 * @default false
	 */
	alphaToCoverage: boolean;

	/**
	 * Blending destination. It's one of the blending mode constants defined in Three.js. Default is {@link OneMinusSrcAlphaFactor}.
	 * @default THREE.OneMinusSrcAlphaFactor
	 */
	blendDst: BlendingDstFactor;

	/**
	 * The tranparency of the .blendDst. Default is null.
	 * @default null
	 */
	blendDstAlpha: number | null;

	/**
	 * Blending equation to use when applying blending. It's one of the constants defined in Three.js. Default is {@link AddEquation}.
	 * @default THREE.AddEquation
	 */
	blendEquation: BlendingEquation;

	/**
	 * The tranparency of the .blendEquation. Default is null.
	 * @default null
	 */
	blendEquationAlpha: number | null;

	/**
	 * Which blending to use when displaying objects with this material. Default is {@link NormalBlending}.
	 * @default THREE.NormalBlending
	 */
	blending: Blending;

	/**
	 * Blending source. It's one of the blending mode constants defined in Three.js. Default is {@link SrcAlphaFactor}.
	 * @default THREE.SrcAlphaFactor
	 */
	blendSrc: BlendingSrcFactor | BlendingDstFactor;

	/**
	 * The tranparency of the .blendSrc. Default is null.
	 * @default null
	 */
	blendSrcAlpha: number | null;

	/**
	 * Changes the behavior of clipping planes so that only their intersection is clipped, rather than their union. Default is false.
	 * @default false
	 */
	clipIntersection: boolean;

	/**
	 * User-defined clipping planes specified as THREE.Plane objects in world space.
	 * These planes apply to the objects this material is attached to.
	 * Points in space whose signed distance to the plane is negative are clipped (not rendered).
	 * See the WebGL / clipping /intersection example. Default is null.
	 * @default null
	 */
	clippingPlanes: any;

	/**
	 * Defines whether to clip shadows according to the clipping planes specified on this material. Default is false.
	 * @default false
	 */
	clipShadows: boolean;

	/**
	 * Whether to render the material's color. This can be used in conjunction with a mesh's .renderOrder property to create invisible objects that occlude other objects. Default is true.
	 * @default true
	 */
	colorWrite: boolean;

	/**
	 * Custom defines to be injected into the shader. These are passed in form of an object literal, with key/value pairs. { MY_CUSTOM_DEFINE: '' , PI2: Math.PI * 2 }.
	 * The pairs are defined in both vertex and fragment shaders. Default is undefined.
	 * @default undefined
	 */
	defines: undefined | { [key: string]: any };

	/**
	 * Which depth function to use. Default is {@link LessEqualDepth}. See the depth mode constants for all possible values.
	 * @default THREE.LessEqualDepth
	 */
	depthFunc: DepthModes;

	/**
	 * Whether to have depth test enabled when rendering this material. Default is true.
	 * @default true
	 */
	depthTest: boolean;

	/**
	 * Whether rendering this material has any effect on the depth buffer. Default is true.
	 * When drawing 2D overlays it can be useful to disable the depth writing in order to layer several things together without creating z-index artifacts.
	 * @default true
	 */
	depthWrite: boolean;

	/**
	 * Whether the material is affected by fog. Default is true.
	 * @default fog
	 */
	fog: boolean;

	/**
	 * When this property is set to THREE.RGBFormat, the material is considered to be opaque and alpha values are ignored.
	 * @default THREE.RGBAFormat
	 */
	format: PixelFormat;

	/**
	 * Unique number of this material instance.
	 */
	id: number;

	/**
	 * Whether rendering this material has any effect on the stencil buffer. Default is *false*.
	 * @default false
	 */
	stencilWrite: boolean;

	/**
	 * The stencil comparison function to use. Default is {@link AlwaysStencilFunc}. See stencil operation constants for all possible values.
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
	 * Which stencil operation to perform when the comparison function returns false. Default is {@link KeepStencilOp}. See the stencil operation constants for all possible values.
	 * @default THREE.KeepStencilOp
	 */
	stencilFail: StencilOp;

	/**
	 * Which stencil operation to perform when the comparison function returns true but the depth test fails.
	 * Default is {@link KeepStencilOp}.
	 * See the stencil operation constants for all possible values.
	 * @default THREE.KeepStencilOp
	 */
	stencilZFail: StencilOp;

	/**
	 * Which stencil operation to perform when the comparison function returns true and the depth test passes.
	 * Default is {@link KeepStencilOp}.
	 * See the stencil operation constants for all possible values.
	 * @default THREE.KeepStencilOp
	 */
	stencilZPass: StencilOp;

	/**
	 * Used to check whether this or derived classes are materials. Default is true.
	 * You should not change this, as it used internally for optimisation.
	 */
	readonly isMaterial: true;

	/**
	 * Material name. Default is an empty string.
	 * @default ''
	 */
	name: string;

	/**
	 * Specifies that the material needs to be updated, WebGL wise. Set it to true if you made changes that need to be reflected in WebGL.
	 * This property is automatically set to true when instancing a new material.
	 * @default false
	 */
	needsUpdate: boolean;

	/**
	 * Opacity. Default is 1.
	 * @default 1
	 */
	opacity: number;

	/**
	 * Whether to use polygon offset. Default is false. This corresponds to the POLYGON_OFFSET_FILL WebGL feature.
	 * @default false
	 */
	polygonOffset: boolean;

	/**
	 * Sets the polygon offset factor. Default is 0.
	 * @default 0
	 */
	polygonOffsetFactor: number;

	/**
	 * Sets the polygon offset units. Default is 0.
	 * @default 0
	 */
	polygonOffsetUnits: number;

	/**
	 * Override the renderer's default precision for this material. Can be "highp", "mediump" or "lowp". Defaults is null.
	 * @default null
	 */
	precision: 'highp' | 'mediump' | 'lowp' | null;

	/**
	 * Whether to premultiply the alpha (transparency) value. See WebGL / Materials / Transparency for an example of the difference. Default is false.
	 * @default false
	 */
	premultipliedAlpha: boolean;

	/**
	 * Whether to apply dithering to the color to remove the appearance of banding. Default is false.
	 * @default false
	 */
	dithering: boolean;

	/**
	 * Defines which of the face sides will be rendered - front, back or both.
	 * Default is THREE.FrontSide. Other options are THREE.BackSide and THREE.DoubleSide.
	 * @default THREE.FrontSide
	 */
	side: Side;

	/**
	 * Defines which of the face sides will cast shadows. Default is *null*.
	 * If *null*, the value is opposite that of side, above.
	 * @default null
	 */
	shadowSide: Side | null;

	/**
	 * Defines whether this material is tone mapped according to the renderer's toneMapping setting.
	 * Default is true.
	 * @default true
	 */
	toneMapped: boolean;

	/**
	 * Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects.
	 * When set to true, the extent to which the material is transparent is controlled by setting it's .opacity property.
	 * Default is false.
	 * @default false
	 */
	transparent: boolean;

	/**
	 * Value is the string 'Material'. This shouldn't be changed, and can be used to find all objects of this type in a scene.
	 * @default 'Material'
	 */
	type: string;

	/**
	 * UUID of this material instance. This gets automatically assigned, so this shouldn't be edited.
	 */
	uuid: string;

	/**
	 * Defines whether vertex coloring is used. Default is false.
	 * @default false
	 */
	vertexColors: boolean;

	/**
	 * Defines whether this material is visible. Default is true.
	 * @default true
	 */
	visible: boolean;

	/**
	 * An object that can be used to store custom data about the Material. It should not hold references to functions as these will not be cloned.
	 * @default {}
	 */
	userData: any;

	/**
	 * This starts at 0 and counts how many times .needsUpdate is set to true.
	 * @default 0
	 */
	version: number;

	/**
	 * Return a new material with the same parameters as this material.
	 */
	clone(): this;

	/**
	 * Copy the parameters from the passed material into this material.
	 * @param material
	 */
	copy(material: Material): this;

	/**
	 * This disposes the material. Textures of a material don't get disposed. These needs to be disposed by {@link Texture}.
	 */
	dispose(): void;

	/**
	 * An optional callback that is executed immediately before the shader program is compiled.
	 * This function is called with the shader source code as a parameter.
	 * Useful for the modification of built-in materials.
	 * @param shader Source code of the shader
	 * @param renderer WebGLRenderer Context that is initializing the material
	 */
	onBeforeCompile(shader: Shader, renderer: WebGLRenderer): void;

	/**
	 * In case onBeforeCompile is used, this callback can be used to identify values of settings used in onBeforeCompile, so three.js can reuse a cached shader or recompile the shader as needed.
	 */
	customProgramCacheKey(): string;

	/**
	 * Sets the properties based on the values.
	 * @param values A container with parameters.
	 */
	setValues(values: MaterialParameters): void;

	/**
	 * Convert the material to three.js JSON format.
	 * @param meta Object containing metadata such as textures or images for the material.
	 */
	toJSON(meta?: any): any;
}

/**
 * parameters is an object with one or more properties defining the material's appearance.
 */
export interface MeshBasicMaterialParameters extends MaterialParameters {
	color?: ColorRepresentation | undefined;
	opacity?: number | undefined;
	map?: Texture | null | undefined;
	lightMap?: Texture | null;
	lightMapIntensity?: number | undefined;
	aoMap?: Texture | null | undefined;
	aoMapIntensity?: number | undefined;
	specularMap?: Texture | null | undefined;
	alphaMap?: Texture | null | undefined;
	envMap?: Texture | null | undefined;
	combine?: Combine | undefined;
	reflectivity?: number | undefined;
	refractionRatio?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;
	wireframeLinecap?: string | undefined;
	wireframeLinejoin?: string | undefined;
}

export interface MeshBasicMaterial extends Material {
	new (parameters?: MeshBasicMaterialParameters): this;

	/**
	 * @default 'MeshBasicMaterial'
	 */
	type: string;

	/**
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * @default null
	 */
	map: Texture | null;

	/**
	 * @default null
	 */
	lightMap: Texture | null;

	/**
	 * @default 1
	 */
	lightMapIntensity: number;

	/**
	 * @default null
	 */
	aoMap: Texture | null;

	/**
	 * @default 1
	 */
	aoMapIntensity: number;

	/**
	 * @default null
	 */
	specularMap: Texture | null;

	/**
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * @default null
	 */
	envMap: Texture | null;

	/**
	 * @default THREE.MultiplyOperation
	 */
	combine: Combine;

	/**
	 * @default 1
	 */
	reflectivity: number;

	/**
	 * @default 0.98
	 */
	refractionRatio: number;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * @default 'round'
	 */
	wireframeLinecap: string;

	/**
	 * @default 'round'
	 */
	wireframeLinejoin: string;

	setValues(parameters: MeshBasicMaterialParameters): void;
}

export interface MeshDepthMaterialParameters extends MaterialParameters {
	map?: Texture | null | undefined;
	alphaMap?: Texture | null | undefined;
	depthPacking?: DepthPackingStrategies | undefined;
	displacementMap?: Texture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;
}

export interface MeshDepthMaterial extends Material {
	new (parameters?: MeshDepthMaterialParameters): this;

	/**
	 * @default 'MeshDepthMaterial'
	 */
	type: string;

	/**
	 * @default null
	 */
	map: Texture | null;

	/**
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * @default THREE.BasicDepthPacking
	 */
	depthPacking: DepthPackingStrategies;

	/**
	 * @default null
	 */
	displacementMap: Texture | null;

	/**
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * @default false
	 */
	fog: boolean;

	setValues(parameters: MeshDepthMaterialParameters): void;
}

export interface MeshDistanceMaterialParameters extends MaterialParameters {
	map?: Texture | null | undefined;
	alphaMap?: Texture | null | undefined;
	displacementMap?: Texture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	farDistance?: number | undefined;
	nearDistance?: number | undefined;
	referencePosition?: Vector3 | undefined;
}

export interface MeshDistanceMaterial extends Material {
	new (parameters?: MeshDistanceMaterialParameters): this;

	/**
	 * @default 'MeshDistanceMaterial'
	 */
	type: string;

	/**
	 * @default null
	 */
	map: Texture | null;

	/**
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * @default null
	 */
	displacementMap: Texture | null;

	/**
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * @default 1000
	 */
	farDistance: number;

	/**
	 * @default 1
	 */
	nearDistance: number;

	/**
	 * @default new THREE.Vector3()
	 */
	referencePosition: Vector3;

	/**
	 * @default false
	 */
	fog: boolean;

	setValues(parameters: MeshDistanceMaterialParameters): void;
}

export interface MeshLambertMaterialParameters extends MaterialParameters {
	color?: ColorRepresentation | undefined;
	emissive?: ColorRepresentation | undefined;
	emissiveIntensity?: number | undefined;
	emissiveMap?: Texture | null | undefined;
	map?: Texture | null | undefined;
	lightMap?: Texture | null | undefined;
	lightMapIntensity?: number | undefined;
	aoMap?: Texture | null | undefined;
	aoMapIntensity?: number | undefined;
	specularMap?: Texture | null | undefined;
	alphaMap?: Texture | null | undefined;
	envMap?: Texture | null | undefined;
	combine?: Combine | undefined;
	reflectivity?: number | undefined;
	refractionRatio?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;
	wireframeLinecap?: string | undefined;
	wireframeLinejoin?: string | undefined;
}

export interface MeshLambertMaterial extends Material {
	new (parameters?: MeshLambertMaterialParameters): this;

	/**
	 * @default 'MeshLambertMaterial'
	 */
	type: string;

	/**
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * @default new THREE.Color( 0x000000 )
	 */
	emissive: Color;

	/**
	 * @default 1
	 */
	emissiveIntensity: number;

	/**
	 * @default null
	 */
	emissiveMap: Texture | null;

	/**
	 * @default null
	 */
	map: Texture | null;

	/**
	 * @default null
	 */
	lightMap: Texture | null;

	/**
	 * @default 1
	 */
	lightMapIntensity: number;

	/**
	 * @default null
	 */
	aoMap: Texture | null;

	/**
	 * @default 1
	 */
	aoMapIntensity: number;

	/**
	 * @default null
	 */
	specularMap: Texture | null;

	/**
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * @default null
	 */
	envMap: Texture | null;

	/**
	 * @default THREE.MultiplyOperation
	 */
	combine: Combine;

	/**
	 * @default 1
	 */
	reflectivity: number;

	/**
	 * @default 0.98
	 */
	refractionRatio: number;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * @default 'round'
	 */
	wireframeLinecap: string;

	/**
	 * @default 'round'
	 */
	wireframeLinejoin: string;

	setValues(parameters: MeshLambertMaterialParameters): void;
}

export interface MeshMatcapMaterialParameters extends MaterialParameters {
	color?: ColorRepresentation | undefined;
	matcap?: Texture | null | undefined;
	map?: Texture | null | undefined;
	bumpMap?: Texture | null | undefined;
	bumpScale?: number | undefined;
	normalMap?: Texture | null | undefined;
	normalMapType?: NormalMapTypes | undefined;
	normalScale?: Vector2 | undefined;
	displacementMap?: Texture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	alphaMap?: Texture | null | undefined;

	flatShading?: boolean | undefined;
}

export interface MeshMatcapMaterial extends Material {
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
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * @default null
	 */
	matcap: Texture | null;

	/**
	 * @default null
	 */
	map: Texture | null;

	/**
	 * @default null
	 */
	bumpMap: Texture | null;

	/**
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * @default null
	 */
	normalMap: Texture | null;

	/**
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: NormalMapTypes;

	/**
	 * @default new Vector2( 1, 1 )
	 */
	normalScale: Vector2;

	/**
	 * @default null
	 */
	displacementMap: Texture | null;

	/**
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 * @default false
	 */
	flatShading: boolean;

	setValues(parameters: MeshMatcapMaterialParameters): void;
}

export interface MeshNormalMaterialParameters extends MaterialParameters {
	bumpMap?: Texture | null | undefined;
	bumpScale?: number | undefined;
	normalMap?: Texture | null | undefined;
	normalMapType?: NormalMapTypes | undefined;
	normalScale?: Vector2 | undefined;
	displacementMap?: Texture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;

	flatShading?: boolean | undefined;
}

export interface MeshNormalMaterial extends Material {
	new (parameters?: MeshNormalMaterialParameters): this;

	/**
	 * @default 'MeshNormalMaterial'
	 */
	type: string;

	/**
	 * @default null
	 */
	bumpMap: Texture | null;

	/**
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * @default null
	 */
	normalMap: Texture | null;

	/**
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: NormalMapTypes;

	/**
	 * @default new THREE.Vector2( 1, 1 )
	 */
	normalScale: Vector2;

	/**
	 * @default null
	 */
	displacementMap: Texture | null;

	/**
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 * @default false
	 */
	flatShading: boolean;

	setValues(parameters: MeshNormalMaterialParameters): void;
}

export interface MeshPhongMaterialParameters extends MaterialParameters {
	/** geometry color in hexadecimal. Default is 0xffffff. */
	color?: ColorRepresentation | undefined;
	specular?: ColorRepresentation | undefined;
	shininess?: number | undefined;
	opacity?: number | undefined;
	map?: Texture | null | undefined;
	lightMap?: Texture | null | undefined;
	lightMapIntensity?: number | undefined;
	aoMap?: Texture | null | undefined;
	aoMapIntensity?: number | undefined;
	emissive?: ColorRepresentation | undefined;
	emissiveIntensity?: number | undefined;
	emissiveMap?: Texture | null | undefined;
	bumpMap?: Texture | null | undefined;
	bumpScale?: number | undefined;
	normalMap?: Texture | null | undefined;
	normalMapType?: NormalMapTypes | undefined;
	normalScale?: Vector2 | undefined;
	displacementMap?: Texture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	specularMap?: Texture | null | undefined;
	alphaMap?: Texture | null | undefined;
	envMap?: Texture | null | undefined;
	combine?: Combine | undefined;
	reflectivity?: number | undefined;
	refractionRatio?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;
	wireframeLinecap?: string | undefined;
	wireframeLinejoin?: string | undefined;

	flatShading?: boolean | undefined;
}

export interface MeshPhongMaterial extends Material {
	new (parameters?: MeshPhongMaterialParameters): this;

	/**
	 * @default 'MeshNormalMaterial'
	 */
	type: string;

	/**
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * @default new THREE.Color( 0x111111 )
	 */
	specular: Color;

	/**
	 * @default 30
	 */
	shininess: number;

	/**
	 * @default null
	 */
	map: Texture | null;

	/**
	 * @default null
	 */
	lightMap: Texture | null;

	/**
	 * @default null
	 */
	lightMapIntensity: number;

	/**
	 * @default null
	 */
	aoMap: Texture | null;

	/**
	 * @default null
	 */
	aoMapIntensity: number;

	/**
	 * @default new THREE.Color( 0x000000 )
	 */
	emissive: Color;

	/**
	 * @default 1
	 */
	emissiveIntensity: number;

	/**
	 * @default null
	 */
	emissiveMap: Texture | null;

	/**
	 * @default null
	 */
	bumpMap: Texture | null;

	/**
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * @default null
	 */
	normalMap: Texture | null;

	/**
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: NormalMapTypes;

	/**
	 * @default new Vector2( 1, 1 )
	 */
	normalScale: Vector2;

	/**
	 * @default null
	 */
	displacementMap: Texture | null;

	/**
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * @default null
	 */
	specularMap: Texture | null;

	/**
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * @default null
	 */
	envMap: Texture | null;

	/**
	 * @default THREE.MultiplyOperation
	 */
	combine: Combine;

	/**
	 * @default 1
	 */
	reflectivity: number;

	/**
	 * @default 0.98
	 */
	refractionRatio: number;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * @default 'round'
	 */
	wireframeLinecap: string;

	/**
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

	setValues(parameters: MeshPhongMaterialParameters): void;
}

export interface MeshPhysicalMaterialParameters extends MeshStandardMaterialParameters {
	clearcoat?: number | undefined;
	clearcoatMap?: Texture | null | undefined;
	clearcoatRoughness?: number | undefined;
	clearcoatRoughnessMap?: Texture | null | undefined;
	clearcoatNormalScale?: Vector2 | undefined;
	clearcoatNormalMap?: Texture | null | undefined;

	reflectivity?: number | undefined;
	ior?: number | undefined;

	sheen?: number | undefined;
	sheenColor?: Color | undefined;
	sheenRoughness?: number | undefined;

	transmission?: number | undefined;
	transmissionMap?: Texture | null | undefined;
	attenuationDistance?: number | undefined;
	attenuationColor?: Color | undefined;

	specularIntensity?: number | undefined;
	specularColor?: Color | undefined;
	specularIntensityMap?: Texture | null | undefined;
	specularColorMap?: Texture | null | undefined;
}

export interface MeshPhysicalMaterial extends MeshStandardMaterial {
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
	 * @default 0
	 */
	clearcoat: number;

	/**
	 * @default null
	 */
	clearcoatMap: Texture | null;

	/**
	 * @default 0
	 */
	clearcoatRoughness: number;

	/**
	 * @default null
	 */
	clearcoatRoughnessMap: Texture | null;

	/**
	 * @default new THREE.Vector2( 1, 1 )
	 */
	clearcoatNormalScale: Vector2;

	/**
	 * @default null
	 */
	clearcoatNormalMap: Texture | null;

	/**
	 * @default 0.5
	 */
	reflectivity: number;

	/**
	 * @default 1.5
	 */
	ior: number;

	/**
	 * @default 0.0
	 */
	sheen: number;

	/**
	 * @default Color( 0x000000 )
	 */
	sheenColor: Color;

	/**
	 * @default null
	 */
	sheenColorMap: Texture | null;

	/**
	 * @default 1.0
	 */
	sheenRoughness: number;

	/**
	 * @default null
	 */
	sheenRoughnessMap: Texture | null;

	/**
	 * @default 0
	 */
	transmission: number;

	/**
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

export interface MeshStandardMaterialParameters extends MaterialParameters {
	color?: ColorRepresentation | undefined;
	roughness?: number | undefined;
	metalness?: number | undefined;
	map?: Texture | null | undefined;
	lightMap?: Texture | null | undefined;
	lightMapIntensity?: number | undefined;
	aoMap?: Texture | null | undefined;
	aoMapIntensity?: number | undefined;
	emissive?: ColorRepresentation | undefined;
	emissiveIntensity?: number | undefined;
	emissiveMap?: Texture | null | undefined;
	bumpMap?: Texture | null | undefined;
	bumpScale?: number | undefined;
	normalMap?: Texture | null | undefined;
	normalMapType?: NormalMapTypes | undefined;
	normalScale?: Vector2 | undefined;
	displacementMap?: Texture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	roughnessMap?: Texture | null | undefined;
	metalnessMap?: Texture | null | undefined;
	alphaMap?: Texture | null | undefined;
	envMap?: Texture | null | undefined;
	envMapIntensity?: number | undefined;
	refractionRatio?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;

	flatShading?: boolean | undefined;
}

export interface MeshStandardMaterial extends Material {
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
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * @default 1
	 */
	roughness: number;

	/**
	 * @default 0
	 */
	metalness: number;

	/**
	 * @default null
	 */
	map: Texture | null;

	/**
	 * @default null
	 */
	lightMap: Texture | null;

	/**
	 * @default 1
	 */
	lightMapIntensity: number;

	/**
	 * @default null
	 */
	aoMap: Texture | null;

	/**
	 * @default 1
	 */
	aoMapIntensity: number;

	/**
	 * @default new THREE.Color( 0x000000 )
	 */
	emissive: Color;

	/**
	 * @default 1
	 */
	emissiveIntensity: number;

	/**
	 * @default null
	 */
	emissiveMap: Texture | null;

	/**
	 * @default null
	 */
	bumpMap: Texture | null;

	/**
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * @default null
	 */
	normalMap: Texture | null;

	/**
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: NormalMapTypes;

	/**
	 * @default new THREE.Vector2( 1, 1 )
	 */
	normalScale: Vector2;

	/**
	 * @default null
	 */
	displacementMap: Texture | null;

	/**
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * @default null
	 */
	roughnessMap: Texture | null;

	/**
	 * @default null
	 */
	metalnessMap: Texture | null;

	/**
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * @default null
	 */
	envMap: Texture | null;

	/**
	 * @default 1
	 */
	envMapIntensity: number;

	/**
	 * @default 0.98
	 */
	refractionRatio: number;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * @default 'round'
	 */
	wireframeLinecap: string;

	/**
	 * @default 'round'
	 */
	wireframeLinejoin: string;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 * @default false
	 */
	flatShading: boolean;

	isMeshStandardMaterial: boolean;

	setValues(parameters: MeshStandardMaterialParameters): void;
}

export interface MeshToonMaterialParameters extends MaterialParameters {
	/** geometry color in hexadecimal. Default is 0xffffff. */
	color?: ColorRepresentation | undefined;
	opacity?: number | undefined;
	gradientMap?: Texture | null | undefined;
	map?: Texture | null | undefined;
	lightMap?: Texture | null | undefined;
	lightMapIntensity?: number | undefined;
	aoMap?: Texture | null | undefined;
	aoMapIntensity?: number | undefined;
	emissive?: ColorRepresentation | undefined;
	emissiveIntensity?: number | undefined;
	emissiveMap?: Texture | null | undefined;
	bumpMap?: Texture | null | undefined;
	bumpScale?: number | undefined;
	normalMap?: Texture | null | undefined;
	normalMapType?: NormalMapTypes | undefined;
	normalScale?: Vector2 | undefined;
	displacementMap?: Texture | null | undefined;
	displacementScale?: number | undefined;
	displacementBias?: number | undefined;
	alphaMap?: Texture | null | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;
	wireframeLinecap?: string | undefined;
	wireframeLinejoin?: string | undefined;
}

export interface MeshToonMaterial extends Material {
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
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * @default null
	 */
	gradientMap: Texture | null;

	/**
	 * @default null
	 */
	map: Texture | null;

	/**
	 * @default null
	 */
	lightMap: Texture | null;

	/**
	 * @default 1
	 */
	lightMapIntensity: number;

	/**
	 * @default null
	 */
	aoMap: Texture | null;

	/**
	 * @default 1
	 */
	aoMapIntensity: number;

	/**
	 * @default new THREE.Color( 0x000000 )
	 */
	emissive: Color;

	/**
	 * @default 1
	 */
	emissiveIntensity: number;

	/**
	 * @default null
	 */
	emissiveMap: Texture | null;

	/**
	 * @default null
	 */
	bumpMap: Texture | null;

	/**
	 * @default 1
	 */
	bumpScale: number;

	/**
	 * @default null
	 */
	normalMap: Texture | null;

	/**
	 * @default THREE.TangentSpaceNormalMap
	 */
	normalMapType: NormalMapTypes;

	/**
	 * @default new THREE.Vector2( 1, 1 )
	 */
	normalScale: Vector2;

	/**
	 * @default null
	 */
	displacementMap: Texture | null;

	/**
	 * @default 1
	 */
	displacementScale: number;

	/**
	 * @default 0
	 */
	displacementBias: number;

	/**
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * @default 'round'
	 */
	wireframeLinecap: string;

	/**
	 * @default 'round'
	 */
	wireframeLinejoin: string;

	setValues(parameters: MeshToonMaterialParameters): void;
}

export interface PointsMaterialParameters extends MaterialParameters {
	color?: ColorRepresentation | undefined;
	map?: Texture | null | undefined;
	alphaMap?: Texture | null | undefined;
	size?: number | undefined;
	sizeAttenuation?: boolean | undefined;
}

export interface PointsMaterial extends Material {
	new (parameters?: PointsMaterialParameters): this;

	/**
	 * @default 'PointsMaterial'
	 */
	type: string;

	/**
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * @default null
	 */
	map: Texture | null;

	/**
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * @default 1
	 */
	size: number;

	/**
	 * @default true
	 */
	sizeAttenuation: boolean;

	setValues(parameters: PointsMaterialParameters): void;
}

export interface RawShaderMaterial extends ShaderMaterial {
	new (parameters?: ShaderMaterialParameters): this;
}

export interface ShaderMaterialParameters extends MaterialParameters {
	uniforms?: { [uniform: string]: IUniform } | undefined;
	vertexShader?: string | undefined;
	fragmentShader?: string | undefined;
	linewidth?: number | undefined;
	wireframe?: boolean | undefined;
	wireframeLinewidth?: number | undefined;
	lights?: boolean | undefined;
	clipping?: boolean | undefined;

	extensions?:
		| {
				derivatives?: boolean | undefined;
				fragDepth?: boolean | undefined;
				drawBuffers?: boolean | undefined;
				shaderTextureLOD?: boolean | undefined;
		  }
		| undefined;
	glslVersion?: GLSLVersion | undefined;
}

export interface ShaderMaterial extends Material {
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
	vertexShader: string;
	fragmentShader: string;

	/**
	 * @default 1
	 */
	linewidth: number;

	/**
	 * @default false
	 */
	wireframe: boolean;

	/**
	 * @default 1
	 */
	wireframeLinewidth: number;

	/**
	 * @default false
	 */
	fog: boolean;

	/**
	 * @default false
	 */
	lights: boolean;

	/**
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
	 * @default false
	 */
	uniformsNeedUpdate: boolean;

	/**
	 * @default null
	 */
	glslVersion: GLSLVersion | null;

	isShaderMaterial: boolean;

	setValues(parameters: ShaderMaterialParameters): void;
	toJSON(meta: any): any;
}

export interface ShadowMaterialParameters extends MaterialParameters {
	color?: ColorRepresentation | undefined;
}

export interface ShadowMaterial extends Material {
	new (parameters?: ShadowMaterialParameters): this;

	/**
	 * @default 'ShadowMaterial'
	 */
	type: string;

	/**
	 * @default new THREE.Color( 0x000000 )
	 */
	color: Color;

	/**
	 * @default true
	 */
	transparent: boolean;
}

export interface SpriteMaterialParameters extends MaterialParameters {
	color?: ColorRepresentation | undefined;
	map?: Texture | null | undefined;
	alphaMap?: Texture | null | undefined;
	rotation?: number | undefined;
	sizeAttenuation?: boolean | undefined;
}

export interface SpriteMaterial extends Material {
	new (parameters?: SpriteMaterialParameters): this;
	/**
	 * @default 'SpriteMaterial'
	 */
	type: string;

	/**
	 * @default new THREE.Color( 0xffffff )
	 */
	color: Color;

	/**
	 * @default null
	 */
	map: Texture | null;

	/**
	 * @default null
	 */
	alphaMap: Texture | null;

	/**
	 * @default 0
	 */
	rotation: number;

	/**
	 * @default true
	 */
	sizeAttenuation: boolean;

	/**
	 * @default true
	 */
	transparent: boolean;

	readonly isSpriteMaterial: true;

	setValues(parameters: SpriteMaterialParameters): void;
	copy(source: SpriteMaterial): this;
}
