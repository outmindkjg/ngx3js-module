import * as I3JS from '../../types/three/constants';
import * as O3JS from './textures';

export const CullFaceNone: I3JS.CullFace = I3JS.CullFace.CullFaceNone;
export const CullFaceBack: I3JS.CullFace = I3JS.CullFace.CullFaceBack;
export const CullFaceFront: I3JS.CullFace = I3JS.CullFace.CullFaceFront;
export const CullFaceFrontBack: I3JS.CullFace = I3JS.CullFace.CullFaceFrontBack;

export const BasicShadowMap: I3JS.ShadowMapType = I3JS.ShadowMapType.BasicShadowMap;
export const PCFShadowMap: I3JS.ShadowMapType = I3JS.ShadowMapType.PCFShadowMap;
export const PCFSoftShadowMap: I3JS.ShadowMapType = I3JS.ShadowMapType.PCFSoftShadowMap;
export const VSMShadowMap: I3JS.ShadowMapType = I3JS.ShadowMapType.VSMShadowMap;

export const FrontSide: I3JS.Side = I3JS.Side.FrontSide;
export const BackSide: I3JS.Side = I3JS.Side.BackSide;
export const DoubleSide: I3JS.Side = I3JS.Side.DoubleSide;

export const FlatShading: I3JS.Shading = I3JS.Shading.FlatShading;
export const SmoothShading: I3JS.Shading = I3JS.Shading.SmoothShading;

export const NoBlending: I3JS.Blending = I3JS.Blending.NoBlending;
export const NormalBlending: I3JS.Blending = I3JS.Blending.NormalBlending;
export const AdditiveBlending: I3JS.Blending = I3JS.Blending.AdditiveBlending;
export const SubtractiveBlending: I3JS.Blending = I3JS.Blending.SubtractiveBlending;
export const MultiplyBlending: I3JS.Blending = I3JS.Blending.MultiplyBlending;
export const CustomBlending: I3JS.Blending = I3JS.Blending.CustomBlending;

export const AddEquation: I3JS.BlendingEquation = I3JS.BlendingEquation.AddEquation;
export const SubtractEquation: I3JS.BlendingEquation = I3JS.BlendingEquation.SubtractEquation;
export const ReverseSubtractEquation: I3JS.BlendingEquation = I3JS.BlendingEquation.ReverseSubtractEquation;
export const MinEquation: I3JS.BlendingEquation = I3JS.BlendingEquation.MinEquation;
export const MaxEquation: I3JS.BlendingEquation = I3JS.BlendingEquation.MaxEquation;

export const ZeroFactor: I3JS.BlendingDstFactor = I3JS.BlendingDstFactor.ZeroFactor;
export const OneFactor: I3JS.BlendingDstFactor = I3JS.BlendingDstFactor.OneFactor;
export const SrcColorFactor: I3JS.BlendingDstFactor = I3JS.BlendingDstFactor.SrcColorFactor;
export const OneMinusSrcColorFactor: I3JS.BlendingDstFactor = I3JS.BlendingDstFactor.OneMinusSrcColorFactor;
export const SrcAlphaFactor: I3JS.BlendingDstFactor = I3JS.BlendingDstFactor.SrcAlphaFactor;
export const OneMinusSrcAlphaFactor: I3JS.BlendingDstFactor = I3JS.BlendingDstFactor.OneMinusSrcAlphaFactor;
export const DstAlphaFactor: I3JS.BlendingDstFactor = I3JS.BlendingDstFactor.DstAlphaFactor;
export const OneMinusDstAlphaFactor: I3JS.BlendingDstFactor = I3JS.BlendingDstFactor.OneMinusDstAlphaFactor;
export const DstColorFactor: I3JS.BlendingDstFactor = I3JS.BlendingDstFactor.DstColorFactor;
export const OneMinusDstColorFactor: I3JS.BlendingDstFactor = I3JS.BlendingDstFactor.OneMinusDstColorFactor;

export const SrcAlphaSaturateFactor: I3JS.BlendingSrcFactor = I3JS.BlendingSrcFactor.SrcAlphaSaturateFactor;

export const NeverDepth: I3JS.DepthModes = I3JS.DepthModes.NeverDepth;
export const AlwaysDepth: I3JS.DepthModes = I3JS.DepthModes.AlwaysDepth;
export const LessDepth: I3JS.DepthModes = I3JS.DepthModes.LessDepth;
export const LessEqualDepth: I3JS.DepthModes = I3JS.DepthModes.LessEqualDepth;
export const EqualDepth: I3JS.DepthModes = I3JS.DepthModes.EqualDepth;
export const GreaterEqualDepth: I3JS.DepthModes = I3JS.DepthModes.GreaterEqualDepth;
export const GreaterDepth: I3JS.DepthModes = I3JS.DepthModes.GreaterDepth;
export const NotEqualDepth: I3JS.DepthModes = I3JS.DepthModes.NotEqualDepth;

export const MultiplyOperation: I3JS.Combine = I3JS.Combine.MultiplyOperation;
export const MixOperation: I3JS.Combine = I3JS.Combine.MixOperation;
export const AddOperation: I3JS.Combine = I3JS.Combine.AddOperation;

export const NoToneMapping: I3JS.ToneMapping = I3JS.ToneMapping.NoToneMapping;
export const LinearToneMapping: I3JS.ToneMapping = I3JS.ToneMapping.LinearToneMapping;
export const ReinhardToneMapping: I3JS.ToneMapping = I3JS.ToneMapping.ReinhardToneMapping;
export const CineonToneMapping: I3JS.ToneMapping = I3JS.ToneMapping.CineonToneMapping;
export const ACESFilmicToneMapping: I3JS.ToneMapping = I3JS.ToneMapping.ACESFilmicToneMapping;

export const UVMapping: I3JS.Mapping = I3JS.Mapping.UVMapping;
export const CubeReflectionMapping: I3JS.Mapping = I3JS.Mapping.CubeReflectionMapping;
export const CubeRefractionMapping: I3JS.Mapping = I3JS.Mapping.CubeRefractionMapping;
export const EquirectangularReflectionMapping: I3JS.Mapping = I3JS.Mapping.EquirectangularReflectionMapping;
export const EquirectangularRefractionMapping: I3JS.Mapping = I3JS.Mapping.EquirectangularRefractionMapping;
export const CubeUVReflectionMapping: I3JS.Mapping = I3JS.Mapping.CubeUVReflectionMapping;
export const CubeUVRefractionMapping: I3JS.Mapping = I3JS.Mapping.CubeUVRefractionMapping;
export const DEFAULT_MAPPING: I3JS.Mapping = O3JS.Texture.DEFAULT_MAPPING;

export const RepeatWrapping: I3JS.Wrapping = I3JS.Wrapping.RepeatWrapping;
export const ClampToEdgeWrapping: I3JS.Wrapping = I3JS.Wrapping.ClampToEdgeWrapping;
export const MirroredRepeatWrapping: I3JS.Wrapping = I3JS.Wrapping.MirroredRepeatWrapping;

export const NearestFilter: I3JS.TextureFilter = I3JS.TextureFilter.NearestFilter;
export const NearestMipmapNearestFilter: I3JS.TextureFilter = I3JS.TextureFilter.NearestMipmapNearestFilter;
export const NearestMipMapNearestFilter: I3JS.TextureFilter = I3JS.TextureFilter.NearestMipMapNearestFilter;
export const NearestMipmapLinearFilter: I3JS.TextureFilter = I3JS.TextureFilter.NearestMipmapLinearFilter;
export const NearestMipMapLinearFilter: I3JS.TextureFilter = I3JS.TextureFilter.NearestMipMapLinearFilter;
export const LinearFilter: I3JS.TextureFilter = I3JS.TextureFilter.LinearFilter;
export const LinearMipmapNearestFilter: I3JS.TextureFilter = I3JS.TextureFilter.LinearMipmapNearestFilter;
export const LinearMipMapNearestFilter: I3JS.TextureFilter = I3JS.TextureFilter.LinearMipMapNearestFilter;
export const LinearMipmapLinearFilter: I3JS.TextureFilter = I3JS.TextureFilter.LinearMipmapLinearFilter;
export const LinearMipMapLinearFilter: I3JS.TextureFilter = I3JS.TextureFilter.LinearMipMapLinearFilter;

export const UnsignedByteType: I3JS.TextureDataType = I3JS.TextureDataType.UnsignedByteType;
export const ByteType: I3JS.TextureDataType = I3JS.TextureDataType.ByteType;
export const ShortType: I3JS.TextureDataType = I3JS.TextureDataType.ShortType;
export const UnsignedShortType: I3JS.TextureDataType = I3JS.TextureDataType.UnsignedShortType;
export const IntType: I3JS.TextureDataType = I3JS.TextureDataType.IntType;
export const UnsignedIntType: I3JS.TextureDataType = I3JS.TextureDataType.UnsignedIntType;
export const FloatType: I3JS.TextureDataType = I3JS.TextureDataType.FloatType;
export const HalfFloatType: I3JS.TextureDataType = I3JS.TextureDataType.HalfFloatType;
export const UnsignedShort4444Type: I3JS.TextureDataType = I3JS.TextureDataType.UnsignedShort4444Type;
export const UnsignedShort5551Type: I3JS.TextureDataType = I3JS.TextureDataType.UnsignedShort5551Type;
export const UnsignedShort565Type: I3JS.TextureDataType = I3JS.TextureDataType.UnsignedShort565Type;
export const UnsignedInt248Type: I3JS.TextureDataType = I3JS.TextureDataType.UnsignedInt248Type;

export const AlphaFormat: I3JS.PixelFormat = I3JS.PixelFormat.AlphaFormat;
export const RGBFormat: I3JS.PixelFormat = I3JS.PixelFormat.RGBFormat;
export const RGBAFormat: I3JS.PixelFormat = I3JS.PixelFormat.RGBAFormat;
export const LuminanceFormat: I3JS.PixelFormat = I3JS.PixelFormat.LuminanceFormat;
export const LuminanceAlphaFormat: I3JS.PixelFormat = I3JS.PixelFormat.LuminanceAlphaFormat;
export const RGBEFormat: I3JS.PixelFormat = I3JS.PixelFormat.RGBEFormat;
export const DepthFormat: I3JS.PixelFormat = I3JS.PixelFormat.DepthFormat;
export const DepthStencilFormat: I3JS.PixelFormat = I3JS.PixelFormat.DepthStencilFormat;
export const RedFormat: I3JS.PixelFormat = I3JS.PixelFormat.RedFormat;
export const RedIntegerFormat: I3JS.PixelFormat = I3JS.PixelFormat.RedIntegerFormat;
export const RGFormat: I3JS.PixelFormat = I3JS.PixelFormat.RGFormat;
export const RGIntegerFormat: I3JS.PixelFormat = I3JS.PixelFormat.RGIntegerFormat;
export const RGBIntegerFormat: I3JS.PixelFormat = I3JS.PixelFormat.RGBIntegerFormat;
export const RGBAIntegerFormat: I3JS.PixelFormat = I3JS.PixelFormat.RGBAIntegerFormat;

export const RGB_S3TC_DXT1_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGB_S3TC_DXT1_Format;
export const RGBA_S3TC_DXT1_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_S3TC_DXT1_Format;
export const RGBA_S3TC_DXT3_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_S3TC_DXT3_Format;
export const RGBA_S3TC_DXT5_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_S3TC_DXT5_Format;

export const RGB_PVRTC_4BPPV1_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGB_PVRTC_4BPPV1_Format;
export const RGB_PVRTC_2BPPV1_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGB_PVRTC_2BPPV1_Format;
export const RGBA_PVRTC_4BPPV1_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_PVRTC_4BPPV1_Format;
export const RGBA_PVRTC_2BPPV1_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_PVRTC_2BPPV1_Format;

export const RGB_ETC1_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGB_ETC1_Format;
export const RGB_ETC2_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGB_ETC2_Format;
export const RGBA_ETC2_EAC_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ETC2_EAC_Format;

export const RGBA_ASTC_4x4_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ASTC_4x4_Format;
export const RGBA_ASTC_5x4_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ASTC_5x4_Format;
export const RGBA_ASTC_5x5_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ASTC_5x5_Format;
export const RGBA_ASTC_6x5_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ASTC_6x5_Format;
export const RGBA_ASTC_6x6_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ASTC_6x6_Format;
export const RGBA_ASTC_8x5_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ASTC_8x5_Format;
export const RGBA_ASTC_8x6_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ASTC_8x6_Format;
export const RGBA_ASTC_8x8_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ASTC_8x8_Format;
export const RGBA_ASTC_10x5_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ASTC_10x5_Format;
export const RGBA_ASTC_10x6_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ASTC_10x6_Format;
export const RGBA_ASTC_10x8_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ASTC_10x8_Format;
export const RGBA_ASTC_10x10_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ASTC_10x10_Format;
export const RGBA_ASTC_12x10_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ASTC_12x10_Format;
export const RGBA_ASTC_12x12_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_ASTC_12x12_Format;
export const SRGB8_ALPHA8_ASTC_4x4_Format: I3JS.CompressedPixelFormat =
	I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_4x4_Format;
export const SRGB8_ALPHA8_ASTC_5x4_Format: I3JS.CompressedPixelFormat =
	I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_5x4_Format;
export const SRGB8_ALPHA8_ASTC_5x5_Format: I3JS.CompressedPixelFormat =
	I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_5x5_Format;
export const SRGB8_ALPHA8_ASTC_6x5_Format: I3JS.CompressedPixelFormat =
	I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_6x5_Format;
export const SRGB8_ALPHA8_ASTC_6x6_Format: I3JS.CompressedPixelFormat =
	I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_6x6_Format;
export const SRGB8_ALPHA8_ASTC_8x5_Format: I3JS.CompressedPixelFormat =
	I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_8x5_Format;
export const SRGB8_ALPHA8_ASTC_8x6_Format: I3JS.CompressedPixelFormat =
	I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_8x6_Format;
export const SRGB8_ALPHA8_ASTC_8x8_Format: I3JS.CompressedPixelFormat =
	I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_8x8_Format;
export const SRGB8_ALPHA8_ASTC_10x5_Format: I3JS.CompressedPixelFormat =
	I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_10x5_Format;
export const SRGB8_ALPHA8_ASTC_10x6_Format: I3JS.CompressedPixelFormat =
	I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_10x6_Format;
export const SRGB8_ALPHA8_ASTC_10x8_Format: I3JS.CompressedPixelFormat =
	I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_10x8_Format;
export const SRGB8_ALPHA8_ASTC_10x10_Format: I3JS.CompressedPixelFormat =
	I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_10x10_Format;
export const SRGB8_ALPHA8_ASTC_12x10_Format: I3JS.CompressedPixelFormat =
	I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_12x10_Format;
export const SRGB8_ALPHA8_ASTC_12x12_Format: I3JS.CompressedPixelFormat =
	I3JS.CompressedPixelFormat.SRGB8_ALPHA8_ASTC_12x12_Format;

export const RGBA_BPTC_Format: I3JS.CompressedPixelFormat = I3JS.CompressedPixelFormat.RGBA_BPTC_Format;

export const LoopOnce: I3JS.AnimationActionLoopStyles = I3JS.AnimationActionLoopStyles.LoopOnce;
export const LoopRepeat: I3JS.AnimationActionLoopStyles = I3JS.AnimationActionLoopStyles.LoopRepeat;
export const LoopPingPong: I3JS.AnimationActionLoopStyles = I3JS.AnimationActionLoopStyles.LoopPingPong;

export const InterpolateDiscrete: I3JS.InterpolationModes = I3JS.InterpolationModes.InterpolateDiscrete;
export const InterpolateLinear: I3JS.InterpolationModes = I3JS.InterpolationModes.InterpolateLinear;
export const InterpolateSmooth: I3JS.InterpolationModes = I3JS.InterpolationModes.InterpolateSmooth;

export const ZeroCurvatureEnding: I3JS.InterpolationEndingModes = I3JS.InterpolationEndingModes.ZeroCurvatureEnding;
export const ZeroSlopeEnding: I3JS.InterpolationEndingModes = I3JS.InterpolationEndingModes.ZeroSlopeEnding;
export const WrapAroundEnding: I3JS.InterpolationEndingModes = I3JS.InterpolationEndingModes.WrapAroundEnding;

export const NormalAnimationBlendMode: I3JS.AnimationBlendMode = I3JS.AnimationBlendMode.NormalAnimationBlendMode;
export const AdditiveAnimationBlendMode: I3JS.AnimationBlendMode = I3JS.AnimationBlendMode.AdditiveAnimationBlendMode;

export const TrianglesDrawMode: I3JS.TrianglesDrawModes = I3JS.TrianglesDrawModes.TrianglesDrawMode;
export const TriangleStripDrawMode: I3JS.TrianglesDrawModes = I3JS.TrianglesDrawModes.TriangleStripDrawMode;
export const TriangleFanDrawMode: I3JS.TrianglesDrawModes = I3JS.TrianglesDrawModes.TriangleFanDrawMode;

export const LinearEncoding: I3JS.TextureEncoding = I3JS.TextureEncoding.LinearEncoding;
export const sRGBEncoding: I3JS.TextureEncoding = I3JS.TextureEncoding.sRGBEncoding;
export const GammaEncoding: I3JS.TextureEncoding = I3JS.TextureEncoding.GammaEncoding;
export const RGBEEncoding: I3JS.TextureEncoding = I3JS.TextureEncoding.RGBEEncoding;

export const RGBM7Encoding: I3JS.TextureEncoding = I3JS.TextureEncoding.RGBM7Encoding;
export const RGBM16Encoding: I3JS.TextureEncoding = I3JS.TextureEncoding.RGBM16Encoding;
export const RGBDEncoding: I3JS.TextureEncoding = I3JS.TextureEncoding.RGBDEncoding;

export const BasicDepthPacking: I3JS.DepthPackingStrategies = I3JS.DepthPackingStrategies.BasicDepthPacking;
export const RGBADepthPacking: I3JS.DepthPackingStrategies = I3JS.DepthPackingStrategies.RGBADepthPacking;

export const TangentSpaceNormalMap: I3JS.NormalMapTypes = I3JS.NormalMapTypes.TangentSpaceNormalMap;
export const ObjectSpaceNormalMap: I3JS.NormalMapTypes = I3JS.NormalMapTypes.ObjectSpaceNormalMap;

export const ZeroStencilOp: I3JS.StencilOp = I3JS.StencilOp.ZeroStencilOp;
export const KeepStencilOp: I3JS.StencilOp = I3JS.StencilOp.KeepStencilOp;
export const ReplaceStencilOp: I3JS.StencilOp = I3JS.StencilOp.ReplaceStencilOp;
export const IncrementStencilOp: I3JS.StencilOp = I3JS.StencilOp.IncrementStencilOp;
export const DecrementStencilOp: I3JS.StencilOp = I3JS.StencilOp.DecrementStencilOp;
export const IncrementWrapStencilOp: I3JS.StencilOp = I3JS.StencilOp.IncrementWrapStencilOp;
export const DecrementWrapStencilOp: I3JS.StencilOp = I3JS.StencilOp.DecrementWrapStencilOp;
export const InvertStencilOp: I3JS.StencilOp = I3JS.StencilOp.InvertStencilOp;

export const NeverStencilFunc: I3JS.StencilFunc = I3JS.StencilFunc.NeverStencilFunc;
export const LessStencilFunc: I3JS.StencilFunc = I3JS.StencilFunc.LessStencilFunc;
export const EqualStencilFunc: I3JS.StencilFunc = I3JS.StencilFunc.EqualStencilFunc;
export const LessEqualStencilFunc: I3JS.StencilFunc = I3JS.StencilFunc.LessEqualStencilFunc;
export const GreaterStencilFunc: I3JS.StencilFunc = I3JS.StencilFunc.GreaterStencilFunc;
export const NotEqualStencilFunc: I3JS.StencilFunc = I3JS.StencilFunc.NotEqualStencilFunc;
export const GreaterEqualStencilFunc: I3JS.StencilFunc = I3JS.StencilFunc.GreaterEqualStencilFunc;
export const AlwaysStencilFunc: I3JS.StencilFunc = I3JS.StencilFunc.AlwaysStencilFunc;

export const StaticDrawUsage: I3JS.Usage = I3JS.Usage.StaticDrawUsage;
export const DynamicDrawUsage: I3JS.Usage = I3JS.Usage.DynamicDrawUsage;
export const StreamDrawUsage: I3JS.Usage = I3JS.Usage.StreamDrawUsage;
export const StaticReadUsage: I3JS.Usage = I3JS.Usage.StaticReadUsage;
export const DynamicReadUsage: I3JS.Usage = I3JS.Usage.DynamicReadUsage;
export const StreamReadUsage: I3JS.Usage = I3JS.Usage.StreamReadUsage;
export const StaticCopyUsage: I3JS.Usage = I3JS.Usage.StaticCopyUsage;
export const DynamicCopyUsage: I3JS.Usage = I3JS.Usage.DynamicCopyUsage;
export const StreamCopyUsage: I3JS.Usage = I3JS.Usage.StreamCopyUsage;

export const GLSL1: I3JS.GLSLVersion = I3JS.GLSLVersion.GLSL1;
export const GLSL3: I3JS.GLSLVersion = I3JS.GLSLVersion.GLSL3;
