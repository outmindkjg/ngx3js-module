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
export enum CullFace {
	CullFaceNone = 0,
	CullFaceBack = 1,
	CullFaceFront = 2,
	CullFaceFrontBack = 3,
}

// Shadowing Type
export enum ShadowMapType {
	BasicShadowMap = 0,
	PCFShadowMap = 1,
	PCFSoftShadowMap = 2,
	VSMShadowMap = 3,
}

// MATERIAL CONSTANTS

// side
export enum Side {
	FrontSide = 0,
	BackSide = 1,
	DoubleSide = 2,
}

// shading
export enum Shading {
	FlatShading = 1,
	SmoothShading = 2,
}

// blending modes
export enum Blending {
	NoBlending = 0,
	NormalBlending = 1,
	AdditiveBlending = 2,
	SubtractiveBlending = 3,
	MultiplyBlending = 4,
	CustomBlending = 5,
}

// custom blending equations
// (numbers start from 100 not to clash with other
// mappings to OpenGL constants defined in Texture.js)
export enum BlendingEquation {
	AddEquation = 100,
	SubtractEquation = 101,
	ReverseSubtractEquation = 102,
	MinEquation = 103,
	MaxEquation = 104,
}

// custom blending destination factors
export enum BlendingDstFactor {
	ZeroFactor = 200,
	OneFactor = 201,
	SrcColorFactor = 202,
	OneMinusSrcColorFactor = 203,
	SrcAlphaFactor = 204,
	OneMinusSrcAlphaFactor = 205,
	DstAlphaFactor = 206,
	OneMinusDstAlphaFactor = 207,
	DstColorFactor = 208,
	OneMinusDstColorFactor = 209,
}

// custom blending src factors
export enum BlendingSrcFactor {
	SrcAlphaSaturateFactor = 210,
}

// depth modes
export enum DepthModes {
	NeverDepth = 0,
	AlwaysDepth = 1,
	LessDepth = 2,
	LessEqualDepth = 3,
	EqualDepth = 4,
	GreaterEqualDepth = 5,
	GreaterDepth = 6,
	NotEqualDepth = 7,
}

// TEXTURE CONSTANTS
// Operations
export enum Combine {
	MultiplyOperation = 0,
	MixOperation = 1,
	AddOperation = 2,
}

// Tone Mapping modes
export enum ToneMapping {
	NoToneMapping = 0,
	LinearToneMapping = 1,
	ReinhardToneMapping = 2,
	CineonToneMapping = 3,
	ACESFilmicToneMapping = 4,
	CustomToneMapping = 5,
}

// Mapping modes
export enum Mapping {
	UVMapping = 300,
	CubeReflectionMapping = 301,
	CubeRefractionMapping = 302,
	EquirectangularReflectionMapping = 303,
	EquirectangularRefractionMapping = 304,
	CubeUVReflectionMapping = 306,
	CubeUVRefractionMapping = 307,
}

// Wrapping modes
export enum Wrapping {
	RepeatWrapping = 1000,
	ClampToEdgeWrapping = 1001,
	MirroredRepeatWrapping = 1002,
}

// Filters
export enum TextureFilter {
	NearestFilter = 1003,
	NearestMipmapNearestFilter = 1004,
	NearestMipMapNearestFilter = 1004,
	NearestMipmapLinearFilter = 1005,
	NearestMipMapLinearFilter = 1005,
	LinearFilter = 1006,
	LinearMipmapNearestFilter = 1007,
	LinearMipMapNearestFilter = 1007,
	LinearMipmapLinearFilter = 1008,
	LinearMipMapLinearFilter = 1008,
}

// Data types
export enum TextureDataType {
	UnsignedByteType = 1009,
	ByteType = 1010,
	ShortType = 1011,
	UnsignedShortType = 1012,
	IntType = 1013,
	UnsignedIntType = 1014,
	FloatType = 1015,
	HalfFloatType = 1016,
	UnsignedShort4444Type = 1017,
	UnsignedShort5551Type = 1018,
	UnsignedShort565Type = 1019,
	UnsignedInt248Type = 1020,
}

// Pixel formats
export enum PixelFormat {
	AlphaFormat = 1021,
	RGBFormat = 1022,
	RGBAFormat = 1023,
	LuminanceFormat = 1024,
	LuminanceAlphaFormat = 1025,
	RGBEFormat = RGBAFormat,
	DepthFormat = 1026,
	DepthStencilFormat = 1027,
	RedFormat = 1028,
	RedIntegerFormat = 1029,
	RGFormat = 1030,
	RGIntegerFormat = 1031,
	RGBIntegerFormat = 1032,
	RGBAIntegerFormat = 1033,
}

// Internal Pixel Formats
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

// Compressed texture formats
// DDS / ST3C Compressed texture formats
export enum CompressedPixelFormat {
	RGB_S3TC_DXT1_Format = 33776,
	RGBA_S3TC_DXT1_Format = 33777,
	RGBA_S3TC_DXT3_Format = 33778,
	RGBA_S3TC_DXT5_Format = 33779,
	RGB_PVRTC_4BPPV1_Format = 35840,
	RGB_PVRTC_2BPPV1_Format = 35841,
	RGBA_PVRTC_4BPPV1_Format = 35842,
	RGBA_PVRTC_2BPPV1_Format = 35843,
	RGB_ETC1_Format = 36196,
	RGB_ETC2_Format = 37492,
	RGBA_ETC2_EAC_Format = 37496,
	RGBA_ASTC_4x4_Format = 37808,
	RGBA_ASTC_5x4_Format = 37809,
	RGBA_ASTC_5x5_Format = 37810,
	RGBA_ASTC_6x5_Format = 37811,
	RGBA_ASTC_6x6_Format = 37812,
	RGBA_ASTC_8x5_Format = 37813,
	RGBA_ASTC_8x6_Format = 37814,
	RGBA_ASTC_8x8_Format = 37815,
	RGBA_ASTC_10x5_Format = 37816,
	RGBA_ASTC_10x6_Format = 37817,
	RGBA_ASTC_10x8_Format = 37818,
	RGBA_ASTC_10x10_Format = 37819,
	RGBA_ASTC_12x10_Format = 37820,
	RGBA_ASTC_12x12_Format = 37821,
	RGBA_BPTC_Format = 36492,
	SRGB8_ALPHA8_ASTC_4x4_Format = 37840,
	SRGB8_ALPHA8_ASTC_5x4_Format = 37841,
	SRGB8_ALPHA8_ASTC_5x5_Format = 37842,
	SRGB8_ALPHA8_ASTC_6x5_Format = 37843,
	SRGB8_ALPHA8_ASTC_6x6_Format = 37844,
	SRGB8_ALPHA8_ASTC_8x5_Format = 37845,
	SRGB8_ALPHA8_ASTC_8x6_Format = 37846,
	SRGB8_ALPHA8_ASTC_8x8_Format = 37847,
	SRGB8_ALPHA8_ASTC_10x5_Format = 37848,
	SRGB8_ALPHA8_ASTC_10x6_Format = 37849,
	SRGB8_ALPHA8_ASTC_10x8_Format = 37850,
	SRGB8_ALPHA8_ASTC_10x10_Format = 37851,
	SRGB8_ALPHA8_ASTC_12x10_Format = 37852,
	SRGB8_ALPHA8_ASTC_12x12_Format = 37853,
}

// Loop styles for AnimationAction
export enum AnimationActionLoopStyles {
	LoopOnce = 2200,
	LoopRepeat = 2201,
	LoopPingPong = 2202,
}

// Interpolation
export enum InterpolationModes {
	InterpolateDiscrete = 2300,
	InterpolateLinear = 2301,
	InterpolateSmooth = 2302,
}

// Interpolant ending modes
export enum InterpolationEndingModes {
	ZeroCurvatureEnding = 2400,
	ZeroSlopeEnding = 2401,
	WrapAroundEnding = 2402,
}

// Animation blending modes
export enum AnimationBlendMode {
	NormalAnimationBlendMode = 2500,
	AdditiveAnimationBlendMode = 2501,
}

// Triangle Draw modes
export enum TrianglesDrawModes {
	TrianglesDrawMode = 0,
	TriangleStripDrawMode = 1,
	TriangleFanDrawMode = 2,
}

// Texture Encodings
export enum TextureEncoding {
	LinearEncoding = 3000,
	sRGBEncoding = 3001,
	GammaEncoding = 3007,
	RGBEEncoding = 3002,
	RGBM7Encoding = 3004,
	RGBM16Encoding = 3005,
	RGBDEncoding = 3006,
}

// Depth packing strategies
export enum DepthPackingStrategies {
	BasicDepthPacking = 3200,
	RGBADepthPacking = 3201,
}

// Normal Map types
export enum NormalMapTypes {
	TangentSpaceNormalMap = 0,
	ObjectSpaceNormalMap = 1,
}

// Stencil Op types
export enum StencilOp {
	ZeroStencilOp = 0,
	KeepStencilOp = 7680,
	ReplaceStencilOp = 7681,
	IncrementStencilOp = 7682,
	DecrementStencilOp = 7683,
	IncrementWrapStencilOp = 34055,
	DecrementWrapStencilOp = 34056,
	InvertStencilOp = 5386,
}

// Stencil Func types
export enum StencilFunc {
	NeverStencilFunc = 512,
	LessStencilFunc = 513,
	EqualStencilFunc = 514,
	LessEqualStencilFunc = 515,
	GreaterStencilFunc = 516,
	NotEqualStencilFunc = 517,
	GreaterEqualStencilFunc = 518,
	AlwaysStencilFunc = 519,
}

// usage types
export enum Usage {
	StaticDrawUsage = 35044,
	DynamicDrawUsage = 35048,
	StreamDrawUsage = 35040,
	StaticReadUsage = 35045,
	DynamicReadUsage = 35049,
	StreamReadUsage = 35041,
	StaticCopyUsage = 35046,
	DynamicCopyUsage = 35050,
	StreamCopyUsage = 35042,
}

export enum GLSLVersion {
	GLSL1 = '100',
	GLSL3 = '300 es',
}


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
