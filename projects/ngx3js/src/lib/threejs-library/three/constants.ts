import * as O3JS from 'three';

export type MOUSE = O3JS.MOUSE;
export type TOUCH = O3JS.TOUCH;
// GL STATE CONSTANTS
export type CullFace = O3JS.CullFace;

// Shadowing Type
export type ShadowMapType = O3JS.ShadowMapType;

// MATERIAL CONSTANTS
// side
export type Side = O3JS.Side;
// shading
export type Shading = O3JS.Shading;
// blending modes
export type Blending = O3JS.Blending;
// custom blending equations
// (numbers start from 100 not to clash with other
// mappings to OpenGL constants defined in Texture.js)
export type BlendingEquation = O3JS.BlendingEquation;
// custom blending destination factors
export type BlendingDstFactor = O3JS.BlendingDstFactor;
// custom blending src factors
export type BlendingSrcFactor = O3JS.BlendingSrcFactor;
// depth modes
export type DepthModes = O3JS.DepthModes;

// TEXTURE CONSTANTS
// Operations
export type Combine = O3JS.Combine;
// Tone Mapping modes
export type ToneMapping = O3JS.ToneMapping;
// Mapping modes
export type Mapping = O3JS.Mapping;
// Wrapping modes
export type Wrapping = O3JS.Wrapping;
// Filters
export type TextureFilter = O3JS.TextureFilter;
// Data types
export type TextureDataType = O3JS.TextureDataType;
// Pixel formats
export type PixelFormat = O3JS.PixelFormat;
// Internal Pixel Formats
export type PixelFormatGPU = O3JS.PixelFormatGPU;

// Compressed texture formats
// DDS / ST3C Compressed texture formats
export type CompressedPixelFormat = O3JS.CompressedPixelFormat;

// BPTC compressed texture formats
// Loop styles for AnimationAction
export type AnimationActionLoopStyles = O3JS.AnimationActionLoopStyles;
// Interpolation
export type InterpolationModes = O3JS.InterpolationModes;
// Interpolant ending modes
export type InterpolationEndingModes = O3JS.InterpolationEndingModes;
// Animation blending modes
export type AnimationBlendMode = O3JS.AnimationBlendMode;
// Triangle Draw modes
export type TrianglesDrawModes = O3JS.TrianglesDrawModes;
// Texture Encodings
export type TextureEncoding = O3JS.TextureEncoding;
// Depth packing strategies
export type DepthPackingStrategies = O3JS.DepthPackingStrategies;
// Normal Map types
export type NormalMapTypes = O3JS.NormalMapTypes;
// Stencil Op types
export type StencilOp = O3JS.StencilOp;
// Stencil Func types
export type StencilFunc = O3JS.StencilFunc;
// usage types
export type Usage = O3JS.Usage;

export type GLSLVersion = O3JS.GLSLVersion;
export type BuiltinShaderAttributeName = O3JS.BuiltinShaderAttributeName;
