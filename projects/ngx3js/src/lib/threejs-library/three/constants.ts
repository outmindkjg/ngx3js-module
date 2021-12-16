// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.button
export enum MOUSE {
	LEFT = 0,
	MIDDLE = 1,
	RIGHT = 2,
	ROTATE = 0,
	DOLLY = 1,
	PAN = 2,
}

export enum TOUCH {
	ROTATE,
	PAN,
	DOLLY_PAN,
	DOLLY_ROTATE,
}

// GL STATE CONSTANTS
export enum CullFace {}

// Shadowing Type
export enum ShadowMapType {}

// MATERIAL CONSTANTS

// side
export enum Side {}

// shading
export enum Shading {}

// blending modes
export enum Blending {}

// custom blending equations
// (numbers start from 100 not to clash with other
// mappings to OpenGL constants defined in Texture.js)
export enum BlendingEquation {}

// custom blending destination factors
export enum BlendingDstFactor {}

// custom blending src factors
export enum BlendingSrcFactor {}

// depth modes
export enum DepthModes {}

// TEXTURE CONSTANTS
// Operations
export enum Combine {}

// Tone Mapping modes
export enum ToneMapping {}

// Mapping modes
export enum Mapping {}

// Wrapping modes
export enum Wrapping {}

// Filters
export enum TextureFilter {}

// Data types
export enum TextureDataType {}

// Pixel formats
export enum PixelFormat {}

// Compressed texture formats
// DDS / ST3C Compressed texture formats
export enum CompressedPixelFormat {}

// Loop styles for AnimationAction
export enum AnimationActionLoopStyles {}

// Interpolation
export enum InterpolationModes {}

// Interpolant ending modes
export enum InterpolationEndingModes {}

// Animation blending modes
export enum AnimationBlendMode {}

// Triangle Draw modes
export enum TrianglesDrawModes {}

// Texture Encodings
export enum TextureEncoding {}

// Depth packing strategies
export enum DepthPackingStrategies {}

// Normal Map types
export enum NormalMapTypes {}

// Stencil Op types
export enum StencilOp {}

// Stencil Func types
export enum StencilFunc {}

// usage types
export enum Usage {}

export enum GLSLVersion {}

export type PixelFormatGPU =
	| 'ALPHA'
	| 'RGB'
	| 'RGBA'
	| 'LUMINANCE'
	| 'LUMINANCE_ALPHA'
	| 'RED_INTEGER'
	| 'R8'
	| 'R8_SNORM'
	| 'R8I'
	| 'R8UI'
	| 'R16I'
	| 'R16UI'
	| 'R16F'
	| 'R32I'
	| 'R32UI'
	| 'R32F'
	| 'RG8'
	| 'RG8_SNORM'
	| 'RG8I'
	| 'RG8UI'
	| 'RG16I'
	| 'RG16UI'
	| 'RG16F'
	| 'RG32I'
	| 'RG32UI'
	| 'RG32F'
	| 'RGB565'
	| 'RGB8'
	| 'RGB8_SNORM'
	| 'RGB8I'
	| 'RGB8UI'
	| 'RGB16I'
	| 'RGB16UI'
	| 'RGB16F'
	| 'RGB32I'
	| 'RGB32UI'
	| 'RGB32F'
	| 'RGB9_E5'
	| 'SRGB8'
	| 'R11F_G11F_B10F'
	| 'RGBA4'
	| 'RGBA8'
	| 'RGBA8_SNORM'
	| 'RGBA8I'
	| 'RGBA8UI'
	| 'RGBA16I'
	| 'RGBA16UI'
	| 'RGBA16F'
	| 'RGBA32I'
	| 'RGBA32UI'
	| 'RGBA32F'
	| 'RGB5_A1'
	| 'RGB10_A2'
	| 'RGB10_A2UI'
	| 'SRGB8_ALPHA8'
	| 'DEPTH_COMPONENT16'
	| 'DEPTH_COMPONENT24'
	| 'DEPTH_COMPONENT32F'
	| 'DEPTH24_STENCIL8'
	| 'DEPTH32F_STENCIL8';

export type BuiltinShaderAttributeName =
	| 'position'
	| 'normal'
	| 'uv'
	| 'color'
	| 'skinIndex'
	| 'skinWeight'
	| 'instanceMatrix'
	| 'morphTarget0'
	| 'morphTarget1'
	| 'morphTarget2'
	| 'morphTarget3'
	| 'morphTarget4'
	| 'morphTarget5'
	| 'morphTarget6'
	| 'morphTarget7'
	| 'morphNormal0'
	| 'morphNormal1'
	| 'morphNormal2'
	| 'morphNormal3';
