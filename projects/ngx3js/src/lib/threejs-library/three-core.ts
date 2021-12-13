import * as O3JS from 'three';
import { ColladaExporter as EX_ColladaExporter } from 'three/examples/jsm/exporters/ColladaExporter';
import { DRACOExporter as EX_DRACOExporter } from 'three/examples/jsm/exporters/DRACOExporter';
import { GLTFExporter as EX_GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { MMDExporter as EX_MMDExporter } from 'three/examples/jsm/exporters/MMDExporter';
import { OBJExporter as EX_OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
import { PLYExporter as EX_PLYExporter } from 'three/examples/jsm/exporters/PLYExporter';
import { STLExporter as EX_STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { USDZExporter as EX_USDZExporter } from 'three/examples/jsm/exporters/USDZExporter';
import { Rhino3dmLoader as EX_Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader';
import { ThreeMFLoader as EX_ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';
import { AMFLoader as EX_AMFLoader } from 'three/examples/jsm/loaders/AMFLoader';
import { BasisTextureLoader as EX_BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader';
import { BVHLoader as EX_BVHLoader } from 'three/examples/jsm/loaders/BVHLoader';
import { ColladaLoader as EX_ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { DDSLoader as EX_DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
import { DRACOLoader as EX_DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { EXRLoader as EX_EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
import { FBXLoader as EX_FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Font as EX_Font, FontLoader as EX_FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { GCodeLoader as EX_GCodeLoader } from 'three/examples/jsm/loaders/GCodeLoader';
import { GLTFLoader as EX_GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { HDRCubeTextureLoader as EX_HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader';
import { IFCLoader as EX_IFCLoader } from 'three/examples/jsm/loaders/IFCLoader';
import { KMZLoader as EX_KMZLoader } from 'three/examples/jsm/loaders/KMZLoader';
import { KTX2Loader as EX_KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { KTXLoader as EX_KTXLoader } from 'three/examples/jsm/loaders/KTXLoader';
import { LDrawLoader as EX_LDrawLoader } from 'three/examples/jsm/loaders/LDrawLoader';
import { LottieLoader as EX_LottieLoader } from 'three/examples/jsm/loaders/LottieLoader';
import { LUT3dlLoader as EX_LUT3dlLoader } from 'three/examples/jsm/loaders/LUT3dlLoader';
import { LUTCubeLoader as EX_LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader';
import { LWOLoader as EX_LWOLoader } from 'three/examples/jsm/loaders/LWOLoader';
import { MD2Loader as EX_MD2Loader } from 'three/examples/jsm/loaders/MD2Loader';
import { MDDLoader as EX_MDDLoader } from 'three/examples/jsm/loaders/MDDLoader';
import { MMDLoader as EX_MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';
import { MTLLoader as EX_MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { NRRDLoader as EX_NRRDLoader } from 'three/examples/jsm/loaders/NRRDLoader';
import { OBJLoader as EX_OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { PCDLoader as EX_PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { PDBLoader as EX_PDBLoader } from 'three/examples/jsm/loaders/PDBLoader';
import { PLYLoader as EX_PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { PRWMLoader as EX_PRWMLoader } from 'three/examples/jsm/loaders/PRWMLoader';
import { PVRLoader as EX_PVRLoader } from 'three/examples/jsm/loaders/PVRLoader';
import { RGBELoader as EX_RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { RGBMLoader as EX_RGBMLoader } from 'three/examples/jsm/loaders/RGBMLoader';
import { STLLoader as EX_STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { SVGLoader as EX_SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { TDSLoader as EX_TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import { TGALoader as EX_TGALoader } from 'three/examples/jsm/loaders/TGALoader';
import { TTFLoader as EX_TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { VOXDataTexture3D as EX_VOXDataTexture3D, VOXLoader as EX_VOXLoader, VOXMesh as EX_VOXMesh } from 'three/examples/jsm/loaders/VOXLoader';
import { VRMLLoader as EX_VRMLLoader } from 'three/examples/jsm/loaders/VRMLLoader';
import { VRMLoader as EX_VRMLoader } from 'three/examples/jsm/loaders/VRMLoader';
import { VTKLoader as EX_VTKLoader } from 'three/examples/jsm/loaders/VTKLoader';
import { XYZLoader as EX_XYZLoader } from 'three/examples/jsm/loaders/XYZLoader';

import { MD2Character as EX_MD2Character } from 'three/examples/jsm/misc/MD2Character';
import { MD2CharacterComplex as EX_MD2CharacterComplex } from 'three/examples/jsm/misc/MD2CharacterComplex';
import { Volume as EX_Volume } from 'three/examples/jsm/misc/Volume';
import { CSS2DObject as EX_CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DObject as EX_CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import * as E_GF_UTIL from 'three/examples/jsm/utils/BufferGeometryUtils';
import * as E_G_UTIL from 'three/examples/jsm/utils/GeometryUtils';
import * as I3JS from '../threejs-library/three-interface';

import { RoomEnvironment as EX_RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

import * as NODES from 'three/examples/jsm/nodes/Nodes';

import { MeshoptDecoder as EX_MeshoptDecoder } from './meshopt_decoder.module';
import { TiltLoader as EX_TiltLoader } from './TiltLoader';
import { LineSegmentsGeometry as EX_LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry';
import { WireframeGeometry2 as EX_WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2';
import { EdgeSplitModifier as EX_EdgeSplitModifier } from 'three/examples/jsm/modifiers/EdgeSplitModifier';
import { SimplifyModifier as EX_SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier';
import { TessellateModifier as EX_TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier';
import * as EX_GeometryCompressionUtils from 'three/examples/jsm/utils/GeometryCompressionUtils';
import * as EX_Stats from 'three/examples/jsm/libs/stats.module';
import { CSM as EX_CSM } from 'three/examples/jsm/csm/CSM';
import { CSMHelper as EX_CSMHelper } from 'three/examples/jsm/csm/CSMHelper';
import { Gyroscope as EX_Gyroscope} from 'three/examples/jsm/misc/Gyroscope';
import { LightProbeHelper as EX_LightProbeHelper } from 'three/examples/jsm/helpers/LightProbeHelper';
import { PositionalAudioHelper as EX_PositionalAudioHelper  } from 'three/examples/jsm/helpers/PositionalAudioHelper';
import { RectAreaLightHelper as EX_RectAreaLightHelper  } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { VertexNormalsHelper as EX_VertexNormalsHelper  } from 'three/examples/jsm/helpers/VertexNormalsHelper';
import { VertexTangentsHelper as EX_VertexTangentsHelper  } from 'three/examples/jsm/helpers/VertexTangentsHelper';
import { CSS2DRenderer as EX_CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DRenderer as EX_CSS3DRenderer  } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { SVGRenderer as EX_SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer';
import { ArcballControls as EX_ArcballControls } from 'three/examples/jsm/controls/ArcballControls';
// import { DeviceOrientationControls as EX_DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls';
import { DragControls as EX_DragControls } from 'three/examples/jsm/controls/DragControls';
import { FirstPersonControls as EX_FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { FlyControls as EX_FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { OrbitControls as EX_OrbitControls, MapControls as EX_MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls as EX_PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { TrackballControls as EX_TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { TransformControls as EX_TransformControls } from 'three/examples/jsm/controls/TransformControls';

import { AdaptiveToneMappingPass as EX_AdaptiveToneMappingPass } from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass';
import { AfterimagePass as EX_AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { BloomPass as EX_BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import { BokehPass as EX_BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { ClearPass as EX_ClearPass } from 'three/examples/jsm/postprocessing/ClearPass';
import { CubeTexturePass as EX_CubeTexturePass } from 'three/examples/jsm/postprocessing/CubeTexturePass';
import { DotScreenPass as EX_DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
import { FilmPass as EX_FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { GlitchPass as EX_GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { HalftonePass as EX_HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass';
import { LUTPass as EX_LUTPass } from 'three/examples/jsm/postprocessing/LUTPass';
import { MaskPass as EX_MaskPass, ClearMaskPass as EX_ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass';
import { OutlinePass as EX_OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { Pass as EX_Pass } from 'three/examples/jsm/postprocessing/Pass';
import { RenderPass as EX_RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SAOPass as EX_SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { SavePass as EX_SavePass } from 'three/examples/jsm/postprocessing/SavePass';
import { ShaderPass as EX_ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { SMAAPass as EX_SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { SSAARenderPass as EX_SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass';
import { SSAOPass as EX_SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { SSRPass as EX_SSRPass } from 'three/examples/jsm/postprocessing/SSRPass';
import { SSRrPass as EX_SSRrPass } from 'three/examples/jsm/postprocessing/SSRrPass';
import { TAARenderPass as EX_TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass';
import { TexturePass as EX_TexturePass } from 'three/examples/jsm/postprocessing/TexturePass';
import { UnrealBloomPass as EX_UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import { BoxLineGeometry as EX_BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry';
import { ConvexGeometry as EX_ConvexGeometry  } from 'three/examples/jsm/geometries/ConvexGeometry';
import { DecalGeometry as EX_DecalGeometry, DecalVertex as  EX_DecalVertex  } from 'three/examples/jsm/geometries/DecalGeometry';
import { LightningStrike as EX_LightningStrike  } from 'three/examples/jsm/geometries/LightningStrike';
import { ParametricGeometries as EX_ParametricGeometries  } from 'three/examples/jsm/geometries/ParametricGeometries';
import { ParametricGeometry as EX_ParametricGeometry  } from 'three/examples/jsm/geometries/ParametricGeometry';
import { RoundedBoxGeometry as EX_RoundedBoxGeometry  } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import { TeapotGeometry as EX_TeapotGeometry  } from 'three/examples/jsm/geometries/TeapotGeometry';
import { TextGeometry as EX_TextGeometry  } from 'three/examples/jsm/geometries/TextGeometry';
import { LineGeometry as EX_LineGeometry  } from 'three/examples/jsm/lines/LineGeometry';

import * as EX_RollerCoaster from 'three/examples/jsm/misc/RollerCoaster';

import { NgxCapsuleGeometry } from '../geometry/geometries/capsule';
import { NgxCircleDepthGeometry } from '../geometry/geometries/circle-depth';
import { NgxGridGeometry } from '../geometry/geometries/grid';
import { NgxPlaneDepthGeometry } from '../geometry/geometries/plane-depth';
import { NgxPlanePerlinGeometry } from '../geometry/geometries/plane-perlin';
import { NgxRingDepthGeometry } from '../geometry/geometries/ring-depth';
import { NgxRopeGeometry } from '../geometry/geometries/rope';
import { NgxStarGeometry } from '../geometry/geometries/star';
import { NgxOutlineGeometry } from '../geometry/geometries/outline';
import { NgxStarDepthGeometry } from '../geometry/geometries/star-depth';

import { AsciiEffect as EX_AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect';
import { OutlineEffect as EX_OutlineEffect  } from 'three/examples/jsm/effects/OutlineEffect';
import { ParallaxBarrierEffect as EX_ParallaxBarrierEffect  } from 'three/examples/jsm/effects/ParallaxBarrierEffect';
import { PeppersGhostEffect as EX_PeppersGhostEffect  } from 'three/examples/jsm/effects/PeppersGhostEffect';
import { EffectComposer as EX_EffectComposer  } from 'three/examples/jsm/postprocessing/EffectComposer';

import { ProgressiveLightMap as EX_ProgressiveLightMap } from 'three/examples/jsm/misc/ProgressiveLightMap';
import { ShadowMesh as EX_ShadowMesh } from 'three/examples/jsm/objects/ShadowMesh';
import { ShadowMapViewer as EX_ShadowMapViewer } from 'three/examples/jsm/utils/ShadowMapViewer';


import * as EX_SceneUtils from 'three/examples/jsm/utils/SceneUtils';

import * as EX_ReflectorForSSRPass from 'three/examples/jsm/objects/ReflectorForSSRPass';
import * as NGX_PASS from './../pass/passes/three-passes';

export const Stats: I3JS.IStats = EX_Stats.default as any;
export const SceneUtils: I3JS.ISceneUtils = EX_SceneUtils as any;

export const CSM: I3JS.ICSM = EX_CSM as any;
export const CSMHelper: I3JS.ICSMHelper = EX_CSMHelper as any;
export const Gyroscope: I3JS.IGyroscope = EX_Gyroscope as any;
export const LightProbeHelper: I3JS.ILightProbeHelper = EX_LightProbeHelper as any;
export const PositionalAudioHelper: I3JS.IPositionalAudioHelper = EX_PositionalAudioHelper as any;
export const RectAreaLightHelper: I3JS.IRectAreaLightHelper = EX_RectAreaLightHelper as any;
export const VertexNormalsHelper: I3JS.IVertexNormalsHelper = EX_VertexNormalsHelper as any;
export const VertexTangentsHelper: I3JS.IVertexTangentsHelper = EX_VertexTangentsHelper as any;

export const CSS2DRenderer: I3JS.ICSS2DRenderer = EX_CSS2DRenderer as any;
export const CSS3DRenderer: I3JS.ICSS3DRenderer = EX_CSS3DRenderer as any;
export const SVGRenderer: I3JS.ISVGRenderer = EX_SVGRenderer as any;

export const ArcballControls: I3JS.IArcballControls = EX_ArcballControls as any;
// export const DeviceOrientationControls: I3JS.IDeviceOrientationControls = EX_DeviceOrientationControls as any;
export const DragControls: I3JS.IDragControls = EX_DragControls as any;
export const FirstPersonControls: I3JS.IFirstPersonControls = EX_FirstPersonControls as any;
export const FlyControls: I3JS.IFlyControls = EX_FlyControls as any;
export const OrbitControls: I3JS.IOrbitControls = EX_OrbitControls as any;
export const MapControls: I3JS.IMapControls = EX_MapControls as any;
export const CsmControls: I3JS.ICSM = EX_CSM as any;

export const PointerLockControls: I3JS.IPointerLockControls = EX_PointerLockControls as any;
export const TrackballControls: I3JS.ITrackballControls = EX_TrackballControls as any;
export const TransformControls: I3JS.ITransformControls = EX_TransformControls as any;


export const AdaptiveToneMappingPass: I3JS.IAdaptiveToneMappingPass = EX_AdaptiveToneMappingPass as any;
export const AfterimagePass: I3JS.IAfterimagePass = EX_AfterimagePass as any;
export const BloomPass: I3JS.IBloomPass = EX_BloomPass as any;
export const BokehPass: I3JS.IBokehPass = EX_BokehPass as any;
export const ClearPass: I3JS.IClearPass = EX_ClearPass as any;
export const CubeTexturePass: I3JS.ICubeTexturePass = EX_CubeTexturePass as any;
export const DotScreenPass: I3JS.IDotScreenPass = EX_DotScreenPass as any;
export const FilmPass: I3JS.IFilmPass = EX_FilmPass as any;
export const GlitchPass: I3JS.IGlitchPass = EX_GlitchPass as any;
export const HalftonePass: I3JS.IHalftonePass = EX_HalftonePass as any;
export const LUTPass: I3JS.ILUTPass = EX_LUTPass as any;
export const MaskPass: I3JS.IMaskPass = EX_MaskPass as any;
export const ClearMaskPass: I3JS.IClearMaskPass = EX_ClearMaskPass as any;
export const OutlinePass: I3JS.IOutlinePass = EX_OutlinePass as any;
export const Pass: I3JS.IPass = EX_Pass as any;
export const RenderPass: I3JS.IRenderPass = EX_RenderPass as any;
export const SAOPass: I3JS.ISAOPass = EX_SAOPass as any;
export const SavePass: I3JS.ISavePass = EX_SavePass as any;
export const ShaderPass: I3JS.IShaderPass = EX_ShaderPass as any;
export const SMAAPass: I3JS.ISMAAPass = EX_SMAAPass as any;
export const SSAARenderPass: I3JS.ISSAARenderPass = EX_SSAARenderPass as any;
export const SSAOPass: I3JS.ISSAOPass = EX_SSAOPass as any;
export const SSRPass: I3JS.ISSRPass = EX_SSRPass as any;
export const SSRrPass: I3JS.ISSRrPass = EX_SSRrPass as any;
export const TAARenderPass: I3JS.ITAARenderPass = EX_TAARenderPass as any;
export const TexturePass: I3JS.ITexturePass = EX_TexturePass as any;
export const UnrealBloomPass: I3JS.IUnrealBloomPass = EX_UnrealBloomPass as any;

export const ShaderCopyPass: I3JS.IShaderCopyPass = NGX_PASS.ShaderCopyPass as any;
export const ShaderRGBShiftPass: I3JS.IShaderRGBShiftPass = NGX_PASS.ShaderRGBShiftPass as any;
export const ShaderBleachBypassPass: I3JS.IShaderBleachBypassPass = NGX_PASS.ShaderBleachBypassPass as any;
export const ShaderSepiaPass: I3JS.IShaderSepiaPass = NGX_PASS.ShaderSepiaPass as any;
export const ShaderVignettePass: I3JS.IShaderVignettePass = NGX_PASS.ShaderVignettePass as any;
export const ShaderGammaCorrectionPass: I3JS.IShaderGammaCorrectionPass = NGX_PASS.ShaderGammaCorrectionPass as any;
export const ShaderFXAAPass: I3JS.IShaderFXAAPass = NGX_PASS.ShaderFXAAPass as any;
export const ShaderPixelPass: I3JS.IShaderPixelPass = NGX_PASS.ShaderPixelPass as any;
export const ShaderLuminosityPass: I3JS.IShaderLuminosityPass = NGX_PASS.ShaderLuminosityPass as any;
export const ShaderDotScreenPass: I3JS.IShaderDotScreenPass = NGX_PASS.ShaderDotScreenPass as any;
export const SobelOperatorPass: I3JS.ISobelOperatorPass = NGX_PASS.SobelOperatorPass as any;
export const ShaderMaterialPass: I3JS.IShaderMaterialPass = NGX_PASS.ShaderMaterialPass as any;
export const ReflectorForSSRPass: any = (EX_ReflectorForSSRPass as any).ReflectorForSSRPass as any;

export const AsciiEffect: I3JS.IAsciiEffect = EX_AsciiEffect as any;
export const OutlineEffect: I3JS.IOutlineEffect = EX_OutlineEffect as any;
export const ParallaxBarrierEffect: I3JS.IParallaxBarrierEffect = EX_ParallaxBarrierEffect as any;
export const PeppersGhostEffect: I3JS.IPeppersGhostEffect = EX_PeppersGhostEffect as any;
export const EffectComposer: I3JS.IEffectComposer = EX_EffectComposer as any;

export const ProgressiveLightMap: I3JS.IProgressiveLightMap = EX_ProgressiveLightMap as any;
export const ShadowMesh: I3JS.IShadowMesh = EX_ShadowMesh as any;
export const ShadowMapViewer: I3JS.IShadowMapViewer = EX_ShadowMapViewer as any;

export const AnimationUtils: I3JS.IAnimationUtils = O3JS.AnimationUtils as any;
export const ShaderChunk: I3JS.IShaderChunk = O3JS.ShaderChunk as any;
export const ShaderLib: I3JS.IShaderLib = O3JS.ShaderLib as any;
export const Box2: I3JS.IBox2 = O3JS.Box2 as any;
export const Box3: I3JS.IBox3 = O3JS.Box3 as any;
export const Color: I3JS.IColor = O3JS.Color as any;
export const Cylindrical: I3JS.ICylindrical = O3JS.Cylindrical as any;
export const Euler: I3JS.IEuler = O3JS.Euler as any;
export const Frustum: I3JS.IFrustum = O3JS.Frustum as any;
export const Line3: I3JS.ILine3 = O3JS.Line3 as any;
export const Matrix3: I3JS.IMatrix3 = O3JS.Matrix3 as any;
export const Matrix4: I3JS.IMatrix4 = O3JS.Matrix4 as any;
export const Plane: I3JS.IPlane = O3JS.Plane as any;
export const Quaternion: I3JS.IQuaternion = O3JS.Quaternion as any;
export const Ray: I3JS.IRay = O3JS.Ray as any;
export const Sphere: I3JS.ISphere = O3JS.Sphere as any;
export const Spherical: I3JS.ISpherical = O3JS.Spherical as any;
export const SphericalHarmonics3: I3JS.ISphericalHarmonics3 = O3JS.SphericalHarmonics3 as any;
export const Triangle: I3JS.ITriangle = O3JS.Triangle as any;
export const Vector2: I3JS.IVector2 = O3JS.Vector2 as any;
export const Vector3: I3JS.IVector3 = O3JS.Vector3 as any;
export const Vector4: I3JS.IVector4 = O3JS.Vector4 as any;
export const MathUtils: I3JS.IMathUtils = O3JS.MathUtils as any;
export const CubicInterpolant: I3JS.ICubicInterpolant = O3JS.CubicInterpolant as any;
export const DiscreteInterpolant: I3JS.IDiscreteInterpolant = O3JS.DiscreteInterpolant as any;
export const LinearInterpolant: I3JS.ILinearInterpolant = O3JS.LinearInterpolant as any;
export const QuaternionLinearInterpolant: I3JS.IQuaternionLinearInterpolant = O3JS.QuaternionLinearInterpolant as any;
export const BufferAttribute: I3JS.IBufferAttribute = O3JS.BufferAttribute as any;
export const Int8BufferAttribute: I3JS.IInt8BufferAttribute = O3JS.Int8BufferAttribute as any;
export const Uint8BufferAttribute: I3JS.IUint8BufferAttribute = O3JS.Uint8BufferAttribute as any;
export const Uint8ClampedBufferAttribute: I3JS.IUint8ClampedBufferAttribute = O3JS.Uint8ClampedBufferAttribute as any;
export const Int16BufferAttribute: I3JS.IInt16BufferAttribute = O3JS.Int16BufferAttribute as any;
export const Uint16BufferAttribute: I3JS.IUint16BufferAttribute = O3JS.Uint16BufferAttribute as any;
export const Int32BufferAttribute: I3JS.IInt32BufferAttribute = O3JS.Int32BufferAttribute as any;
export const Uint32BufferAttribute: I3JS.IUint32BufferAttribute = O3JS.Uint32BufferAttribute as any;
export const Float16BufferAttribute: I3JS.IFloat16BufferAttribute = O3JS.Float16BufferAttribute as any;
export const Float32BufferAttribute: I3JS.IFloat32BufferAttribute = O3JS.Float32BufferAttribute as any;
export const Float64BufferAttribute: I3JS.IFloat64BufferAttribute = O3JS.Float64BufferAttribute as any;

export const GeometryUtils: I3JS.IGeometryUtils = {
	mergeBufferAttributes: E_GF_UTIL.mergeBufferAttributes as any,
	mergeBufferGeometries: E_GF_UTIL.mergeBufferGeometries as any,
	interleaveAttributes: E_GF_UTIL.interleaveAttributes as any,
	estimateBytesUsed: E_GF_UTIL.estimateBytesUsed as any,
	mergeVertices: E_GF_UTIL.mergeVertices as any,
	toTrianglesDrawMode: E_GF_UTIL.toTrianglesDrawMode as any,
	computeMorphedAttributes: E_GF_UTIL.computeMorphedAttributes as any,
	 hilbert2D: (E_G_UTIL as any).hilbert2D,
	 hilbert3D: (E_G_UTIL as any).hilbert3D,
	 gosper: (E_G_UTIL as any).gosper
};

export const RoomEnvironment: I3JS.IRoomEnvironment = EX_RoomEnvironment as any;

export const Node: I3JS.INode = NODES.Node as any;
export const TempNode: I3JS.ITempNode = NODES.TempNode as any;
export const InputNode: I3JS.IInputNode = NODES.InputNode as any;
export const ConstNode: I3JS.IConstNode = NODES.ConstNode as any;
export const VarNode: I3JS.IVarNode = NODES.VarNode as any;
export const StructNode: I3JS.IStructNode = NODES.StructNode as any;
export const AttributeNode: I3JS.IAttributeNode = NODES.AttributeNode as any;
export const FunctionNode: I3JS.IFunctionNode = NODES.FunctionNode as any;
export const ExpressionNode: I3JS.IExpressionNode = NODES.ExpressionNode as any;
export const FunctionCallNode: I3JS.IFunctionCallNode = NODES.FunctionCallNode as any;
export const NodeLib: I3JS.INodeLib = NODES.NodeLib as any;
export const NodeUtils: I3JS.INodeUtils = NODES.NodeUtils as any;
export const NodeFrame: I3JS.INodeFrame = NODES.NodeFrame as any;
export const NodeUniform: I3JS.INodeUniform = NODES.NodeUniform as any;
export const NodeBuilder: I3JS.INodeBuilder = NODES.NodeBuilder as any;

// inputs

export const BoolNode: I3JS.IBoolNode = NODES.BoolNode as any;
export const IntNode: I3JS.IIntNode = NODES.IntNode as any;
export const FloatNode: I3JS.IFloatNode = NODES.FloatNode as any;
export const Vector2Node: I3JS.IVector2Node = NODES.Vector2Node as any;
export const Vector3Node: I3JS.IVector3Node = NODES.Vector3Node as any;
export const Vector4Node: I3JS.IVector4Node = NODES.Vector4Node as any;
export const ColorNode: I3JS.IColorNode = NODES.ColorNode as any;
export const Matrix3Node: I3JS.IMatrix3Node = NODES.Matrix3Node as any;
export const Matrix4Node: I3JS.IMatrix4Node = NODES.Matrix4Node as any;
export const TextureNode: I3JS.ITextureNode = NODES.TextureNode as any;
export const CubeTextureNode: I3JS.ICubeTextureNode = NODES.CubeTextureNode as any;
export const ScreenNode: I3JS.IScreenNode = NODES.ScreenNode as any;
export const ReflectorNode: I3JS.IReflectorNode = NODES.ReflectorNode as any;
export const PropertyNode: I3JS.IPropertyNode = NODES.PropertyNode as any;
export const RTTNode: I3JS.IRTTNode = NODES.RTTNode as any;

// accessors

export const UVNode: I3JS.IUVNode = NODES.UVNode as any;
export const ColorsNode: I3JS.IColorsNode = NODES.ColorsNode as any;
export const PositionNode: I3JS.IPositionNode = NODES.PositionNode as any;
export const NormalNode: I3JS.INormalNode = NODES.NormalNode as any;
export const CameraNode: I3JS.ICameraNode = NODES.CameraNode as any;
export const LightNode: I3JS.ILightNode = NODES.LightNode as any;
export const ReflectNode: I3JS.IReflectNode = NODES.ReflectNode as any;
export const ScreenUVNode: I3JS.IScreenUVNode = NODES.ScreenUVNode as any;
export const ResolutionNode: I3JS.IResolutionNode = NODES.ResolutionNode as any;

// math

export const MathNode: I3JS.IMathNode = NODES.MathNode as any;
export const OperatorNode: I3JS.IOperatorNode = NODES.OperatorNode as any;
export const CondNode: I3JS.ICondNode = NODES.CondNode as any;

// procedural

// export const NoiseNode: I3JS.INoiseNode = NODES.NoiseNode as any;
export const CheckerNode: I3JS.ICheckerNode = NODES.CheckerNode as any;

// misc

export const TextureCubeUVNode: I3JS.ITextureCubeUVNode = NODES.TextureCubeUVNode as any;
export const TextureCubeNode: I3JS.ITextureCubeNode = NODES.TextureCubeNode as any;
export const NormalMapNode: I3JS.INormalMapNode = NODES.NormalMapNode as any;
export const BumpMapNode: I3JS.IBumpMapNode = NODES.BumpMapNode as any;

// utils

export const BypassNode: I3JS.IBypassNode = NODES.BypassNode as any;
export const JoinNode: I3JS.IJoinNode = NODES.JoinNode as any;
export const SwitchNode: I3JS.ISwitchNode = NODES.SwitchNode as any;
export const TimerNode: I3JS.ITimerNode = NODES.TimerNode as any;
export const VelocityNode: I3JS.IVelocityNode = NODES.VelocityNode as any;
export const UVTransformNode: I3JS.IUVTransformNode = NODES.UVTransformNode as any;
export const MaxMIPLevelNode: I3JS.IMaxMIPLevelNode = NODES.MaxMIPLevelNode as any;
export const SpecularMIPLevelNode: I3JS.ISpecularMIPLevelNode = NODES.SpecularMIPLevelNode as any;
export const ColorSpaceNode: I3JS.IColorSpaceNode = NODES.ColorSpaceNode as any;

// effects

export const BlurNode: I3JS.IBlurNode = NODES.BlurNode as any;
export const ColorAdjustmentNode: I3JS.IColorAdjustmentNode = NODES.ColorAdjustmentNode as any;
export const LuminanceNode: I3JS.ILuminanceNode = NODES.LuminanceNode as any;

// material nodes

export const RawNode: I3JS.IRawNode = NODES.RawNode as any;
export const BasicNode: I3JS.IBasicNode = NODES.BasicNode as any;
export const SpriteNode: I3JS.ISpriteNode = NODES.SpriteNode as any;
export const PhongNode: I3JS.IPhongNode = NODES.PhongNode as any;
export const StandardNode: I3JS.IStandardNode = NODES.StandardNode as any;
export const MeshStandardNode: I3JS.IMeshStandardNode = NODES.MeshStandardNode as any;

// materials

export const NodeMaterial: I3JS.INodeMaterial = NODES.NodeMaterial as any;
export const BasicNodeMaterial: I3JS.IBasicNodeMaterial = NODES.BasicNodeMaterial as any;
export const SpriteNodeMaterial: I3JS.ISpriteNodeMaterial = NODES.SpriteNodeMaterial as any;
export const PhongNodeMaterial: I3JS.IPhongNodeMaterial = NODES.PhongNodeMaterial as any;
export const StandardNodeMaterial: I3JS.IStandardNodeMaterial = NODES.StandardNodeMaterial as any;
export const MeshStandardNodeMaterial: I3JS.IMeshStandardNodeMaterial = NODES.MeshStandardNodeMaterial as any;

// postprocessing

export const NodePostProcessing: I3JS.INodePostProcessing = NODES.NodePostProcessing as any;
// export const NodePass: I3JS.INodePass = NODES.NodePass as any;


export const BufferGeometry: I3JS.IBufferGeometry = O3JS.BufferGeometry as any;
export const Clock: I3JS.IClock = O3JS.Clock as any;
export const EventDispatcher: I3JS.IEventDispatcher = O3JS.EventDispatcher as any;
export const GLBufferAttribute: I3JS.IGLBufferAttribute = O3JS.GLBufferAttribute as any;
export const InstancedBufferAttribute: I3JS.IInstancedBufferAttribute = O3JS.InstancedBufferAttribute as any;
export const InstancedBufferGeometry: I3JS.IInstancedBufferGeometry = O3JS.InstancedBufferGeometry as any;
export const InstancedInterleavedBuffer: I3JS.IInstancedInterleavedBuffer = O3JS.InstancedInterleavedBuffer as any;
export const InterleavedBuffer: I3JS.IInterleavedBuffer = O3JS.InterleavedBuffer as any;
export const InterleavedBufferAttribute: I3JS.IInterleavedBufferAttribute = O3JS.InterleavedBufferAttribute as any;
export const Layers: I3JS.ILayers = O3JS.Layers as any;
export const Object3D: I3JS.IObject3D = O3JS.Object3D as any;
export const Raycaster: I3JS.IRaycaster = O3JS.Raycaster as any;
export const Uniform: I3JS.IUniform = O3JS.Uniform as any;
export const UniformsUtils: I3JS.IUniformsUtils = O3JS.UniformsUtils as any;
export const UniformsLib: I3JS.IUniformsLib = O3JS.UniformsLib as any;
export const BoxGeometry: I3JS.IBoxGeometry = O3JS.BoxGeometry as any;
export const BoxBufferGeometry: I3JS.IBoxGeometry = O3JS.BoxGeometry as any;
export const CircleGeometry: I3JS.ICircleGeometry = O3JS.CircleGeometry as any;
export const CircleBufferGeometry: I3JS.ICircleGeometry = O3JS.CircleGeometry as any;
export const ConeGeometry: I3JS.IConeGeometry = O3JS.ConeGeometry as any;
export const ConeBufferGeometry: I3JS.IConeGeometry = O3JS.ConeGeometry as any;
export const CylinderGeometry: I3JS.ICylinderGeometry = O3JS.CylinderGeometry as any;
export const CylinderBufferGeometry: I3JS.ICylinderGeometry = O3JS.CylinderGeometry as any;
export const DodecahedronGeometry: I3JS.IDodecahedronGeometry = O3JS.DodecahedronGeometry as any;
export const DodecahedronBufferGeometry: I3JS.IDodecahedronGeometry = O3JS.DodecahedronGeometry as any;
export const EdgesGeometry: I3JS.IEdgesGeometry = O3JS.EdgesGeometry as any;
export const EdgesBufferGeometry: I3JS.IEdgesGeometry = O3JS.EdgesGeometry as any;
export const ExtrudeGeometry: I3JS.IExtrudeGeometry = O3JS.ExtrudeGeometry as any;
export const ExtrudeBufferGeometry: I3JS.IExtrudeGeometry = O3JS.ExtrudeGeometry as any;
export const IcosahedronGeometry: I3JS.IIcosahedronGeometry = O3JS.IcosahedronGeometry as any;
export const IcosahedronBufferGeometry: I3JS.IIcosahedronGeometry = O3JS.IcosahedronGeometry as any;
export const LatheGeometry: I3JS.ILatheGeometry = O3JS.LatheGeometry as any;
export const LatheBufferGeometry: I3JS.ILatheGeometry = O3JS.LatheGeometry as any;
export const OctahedronGeometry: I3JS.IOctahedronGeometry = O3JS.OctahedronGeometry as any;
export const OctahedronBufferGeometry: I3JS.IOctahedronGeometry = O3JS.OctahedronGeometry as any;
export const PlaneGeometry: I3JS.IPlaneGeometry = O3JS.PlaneGeometry as any;
export const PlaneBufferGeometry: I3JS.IPlaneGeometry = O3JS.PlaneGeometry as any;
export const PolyhedronGeometry: I3JS.IPolyhedronGeometry = O3JS.PolyhedronGeometry as any;
export const PolyhedronBufferGeometry: I3JS.IPolyhedronGeometry = O3JS.PolyhedronGeometry as any;
export const RingGeometry: I3JS.IRingGeometry = O3JS.RingGeometry as any;
export const RingBufferGeometry: I3JS.IRingGeometry = O3JS.RingGeometry as any;
export const ShapeGeometry: I3JS.IShapeGeometry = O3JS.ShapeGeometry as any;
export const ShapeBufferGeometry: I3JS.IShapeGeometry = O3JS.ShapeGeometry as any;
export const SphereGeometry: I3JS.ISphereGeometry = O3JS.SphereGeometry as any;
export const SphereBufferGeometry: I3JS.ISphereGeometry = O3JS.SphereGeometry as any;
export const TetrahedronGeometry: I3JS.ITetrahedronGeometry = O3JS.TetrahedronGeometry as any;
export const TetrahedronBufferGeometry: I3JS.ITetrahedronGeometry = O3JS.TetrahedronGeometry as any;
export const TorusGeometry: I3JS.ITorusGeometry = O3JS.TorusGeometry as any;
export const TorusBufferGeometry: I3JS.ITorusGeometry = O3JS.TorusGeometry as any;
export const TorusKnotGeometry: I3JS.ITorusKnotGeometry = O3JS.TorusKnotGeometry as any;
export const TorusKnotBufferGeometry: I3JS.ITorusKnotGeometry = O3JS.TorusKnotGeometry as any;
export const TubeGeometry: I3JS.ITubeGeometry = O3JS.TubeGeometry as any;
export const TubeBufferGeometry: I3JS.ITubeGeometry = O3JS.TubeGeometry as any;
export const WireframeGeometry: I3JS.IWireframeGeometry = O3JS.WireframeGeometry as any;
export const WireframeBufferGeometry: I3JS.IWireframeGeometry = O3JS.WireframeGeometry as any;
export const LineSegmentsGeometry: I3JS.ILineSegmentsGeometry = EX_LineSegmentsGeometry as any;
export const WireframeGeometry2: I3JS.IWireframeGeometry2 = EX_WireframeGeometry2 as any;
export const EdgeSplitModifier: I3JS.IEdgeSplitModifier = EX_EdgeSplitModifier as any;
export const SimplifyModifier: I3JS.ISimplifyModifier = EX_SimplifyModifier as any;

export const BoxLineGeometry: I3JS.IBoxLineGeometry = EX_BoxLineGeometry as any;
export const ConvexGeometry: I3JS.IConvexGeometry = EX_ConvexGeometry as any;
export const DecalGeometry: I3JS.IDecalGeometry = EX_DecalGeometry as any;
export const DecalVertex: I3JS.IDecalVertex = EX_DecalVertex as any;

export const LightningStrike: I3JS.ILightningStrike = EX_LightningStrike as any;
export const ParametricGeometries: I3JS.IParametricGeometries = EX_ParametricGeometries as any;
export const ParametricGeometry: I3JS.IParametricGeometry = EX_ParametricGeometry as any;
export const RoundedBoxGeometry: I3JS.IRoundedBoxGeometry = EX_RoundedBoxGeometry as any;
export const TeapotGeometry: I3JS.ITeapotGeometry = EX_TeapotGeometry as any;
export const TextGeometry: I3JS.ITextGeometry = EX_TextGeometry as any;
export const LineGeometry: I3JS.ILineGeometry = EX_LineGeometry as any;

export const RollerCoasterGeometry: I3JS.IRollerCoasterGeometry = EX_RollerCoaster.RollerCoasterGeometry as any;
export const RollerCoasterLiftersGeometry: I3JS.IRollerCoasterLiftersGeometry = EX_RollerCoaster.RollerCoasterLiftersGeometry as any;
export const RollerCoasterShadowGeometry: I3JS.IRollerCoasterShadowGeometry = EX_RollerCoaster.RollerCoasterShadowGeometry as any;
export const RollerCoasterSkyGeometry: I3JS.IRollerCoasterSkyGeometry = EX_RollerCoaster.SkyGeometry as any;
export const RollerCoasterTreesGeometry: I3JS.IRollerCoasterTreesGeometry = EX_RollerCoaster.TreesGeometry as any;

export const CapsuleGeometry: I3JS.ICapsuleGeometry = NgxCapsuleGeometry as any;
export const CircleDepthGeometry: I3JS.ICircleDepthGeometry = NgxCircleDepthGeometry as any;
export const GridGeometry: I3JS.IGridGeometry = NgxGridGeometry as any;
export const PlaneDepthGeometry: I3JS.IPlaneDepthGeometry = NgxPlaneDepthGeometry as any;
export const PlanePerlinGeometry: I3JS.IPlanePerlinGeometry = NgxPlanePerlinGeometry as any;
export const RingDepthGeometry: I3JS.IRingDepthGeometry = NgxRingDepthGeometry as any;
export const RopeGeometry: I3JS.IRopeGeometry = NgxRopeGeometry as any;
export const StarGeometry: I3JS.IStarGeometry = NgxStarGeometry as any;
export const StarDepthGeometry: I3JS.IStarDepthGeometry = NgxStarDepthGeometry as any;
export const OutlineGeometry: I3JS.IOutlineGeometry = NgxOutlineGeometry as any;


export const GeometryCompressionUtils: I3JS.IGeometryCompressionUtils = {
	compressNormals: (EX_GeometryCompressionUtils as any).compressNormals,
	compressPositions: (EX_GeometryCompressionUtils as any).compressPositions,
	compressUvs: (EX_GeometryCompressionUtils as any).compressUvs,
};
export const TessellateModifier: I3JS.ITessellateModifier = EX_TessellateModifier as any;
export const AmbientLight: I3JS.IAmbientLight = O3JS.AmbientLight as any;
export const AmbientLightProbe: I3JS.IAmbientLightProbe = O3JS.AmbientLightProbe as any;
export const DirectionalLight: I3JS.IDirectionalLight = O3JS.DirectionalLight as any;
export const HemisphereLight: I3JS.IHemisphereLight = O3JS.HemisphereLight as any;
export const HemisphereLightProbe: I3JS.IHemisphereLightProbe = O3JS.HemisphereLightProbe as any;
export const Light: I3JS.ILight = O3JS.Light as any;
export const LightProbe: I3JS.ILightProbe = O3JS.LightProbe as any;
export const PointLight: I3JS.IPointLight = O3JS.PointLight as any;
export const RectAreaLight: I3JS.IRectAreaLight = O3JS.RectAreaLight as any;
export const SpotLight: I3JS.ISpotLight = O3JS.SpotLight as any;
export const ArrayCamera: I3JS.IArrayCamera = O3JS.ArrayCamera as any;
export const Camera: I3JS.ICamera = O3JS.Camera as any;
export const CubeCamera: I3JS.ICubeCamera = O3JS.CubeCamera as any;
export const OrthographicCamera: I3JS.IOrthographicCamera = O3JS.OrthographicCamera as any;
export const PerspectiveCamera: I3JS.IPerspectiveCamera = O3JS.PerspectiveCamera as any;
export const StereoCamera: I3JS.IStereoCamera = O3JS.StereoCamera as any;
export const Audio: I3JS.IAudio = O3JS.Audio as any;
export const AudioAnalyser: I3JS.IAudioAnalyser = O3JS.AudioAnalyser as any;
export const AudioListener: I3JS.IAudioListener = O3JS.AudioListener as any;
export const PositionalAudio: I3JS.IPositionalAudio = O3JS.PositionalAudio as any;
export const AnimationClip: I3JS.IAnimationClip = O3JS.AnimationClip as any;
export const AnimationMixer: I3JS.IAnimationMixer = O3JS.AnimationMixer as any;
export const AnimationObjectGroup: I3JS.IAnimationObjectGroup = O3JS.AnimationObjectGroup as any;
export const BooleanKeyframeTrack: I3JS.IBooleanKeyframeTrack = O3JS.BooleanKeyframeTrack as any;
export const ColorKeyframeTrack: I3JS.IColorKeyframeTrack = O3JS.ColorKeyframeTrack as any;
export const NumberKeyframeTrack: I3JS.INumberKeyframeTrack = O3JS.NumberKeyframeTrack as any;
export const QuaternionKeyframeTrack: I3JS.IQuaternionKeyframeTrack = O3JS.QuaternionKeyframeTrack as any;
export const StringKeyframeTrack: I3JS.IStringKeyframeTrack = O3JS.StringKeyframeTrack as any;
export const VectorKeyframeTrack: I3JS.IVectorKeyframeTrack = O3JS.VectorKeyframeTrack as any;
export const ArrowHelper: I3JS.IArrowHelper = O3JS.ArrowHelper as any;
export const AxesHelper: I3JS.IAxesHelper = O3JS.AxesHelper as any;
export const Box3Helper: I3JS.IBox3Helper = O3JS.Box3Helper as any;
export const BoxHelper: I3JS.IBoxHelper = O3JS.BoxHelper as any;
export const CameraHelper: I3JS.ICameraHelper = O3JS.CameraHelper as any;
export const DirectionalLightHelper: I3JS.IDirectionalLightHelper = O3JS.DirectionalLightHelper as any;
export const GridHelper: I3JS.IGridHelper = O3JS.GridHelper as any;
export const HemisphereLightHelper: I3JS.IHemisphereLightHelper = O3JS.HemisphereLightHelper as any;
export const PlaneHelper: I3JS.IPlaneHelper = O3JS.PlaneHelper as any;
export const PointLightHelper: I3JS.IPointLightHelper = O3JS.PointLightHelper as any;
export const PolarGridHelper: I3JS.IPolarGridHelper = O3JS.PolarGridHelper as any;
export const SkeletonHelper: I3JS.ISkeletonHelper = O3JS.SkeletonHelper as any;
export const SpotLightHelper: I3JS.ISpotLightHelper = O3JS.SpotLightHelper as any;
export const LineBasicMaterial: I3JS.ILineBasicMaterial = O3JS.LineBasicMaterial as any;
export const LineDashedMaterial: I3JS.ILineDashedMaterial = O3JS.LineDashedMaterial as any;
export const Material: I3JS.IMaterial = O3JS.Material as any;
export const MeshBasicMaterial: I3JS.IMeshBasicMaterial = O3JS.MeshBasicMaterial as any;
export const MeshDepthMaterial: I3JS.IMeshDepthMaterial = O3JS.MeshDepthMaterial as any;
export const MeshDistanceMaterial: I3JS.IMeshDistanceMaterial = O3JS.MeshDistanceMaterial as any;
export const MeshLambertMaterial: I3JS.IMeshLambertMaterial = O3JS.MeshLambertMaterial as any;
export const MeshMatcapMaterial: I3JS.IMeshMatcapMaterial = O3JS.MeshMatcapMaterial as any;
export const MeshNormalMaterial: I3JS.IMeshNormalMaterial = O3JS.MeshNormalMaterial as any;
export const MeshPhongMaterial: I3JS.IMeshPhongMaterial = O3JS.MeshPhongMaterial as any;
export const MeshPhysicalMaterial: I3JS.IMeshPhysicalMaterial = O3JS.MeshPhysicalMaterial as any;
export const MeshStandardMaterial: I3JS.IMeshStandardMaterial = O3JS.MeshStandardMaterial as any;
export const MeshToonMaterial: I3JS.IMeshToonMaterial = O3JS.MeshToonMaterial as any;
export const PointsMaterial: I3JS.IPointsMaterial = O3JS.PointsMaterial as any;
export const RawShaderMaterial: I3JS.IRawShaderMaterial = O3JS.RawShaderMaterial as any;
export const ShaderMaterial: I3JS.IShaderMaterial = O3JS.ShaderMaterial as any;
export const ShadowMaterial: I3JS.IShadowMaterial = O3JS.ShadowMaterial as any;
export const SpriteMaterial: I3JS.ISpriteMaterial = O3JS.SpriteMaterial as any;

export const Bone: I3JS.IBone = O3JS.Bone as any;
export const Group: I3JS.IGroup = O3JS.Group as any;
export const InstancedMesh: I3JS.IInstancedMesh = O3JS.InstancedMesh as any;
export const Line: I3JS.ILine = O3JS.Line as any;
export const LineLoop: I3JS.ILineLoop = O3JS.LineLoop as any;
export const LineSegments: I3JS.ILineSegments = O3JS.LineSegments as any;
export const LOD: I3JS.ILOD = O3JS.LOD as any;
export const Mesh: I3JS.IMesh = O3JS.Mesh as any;
export const Points: I3JS.IPoints = O3JS.Points as any;
export const Skeleton: I3JS.ISkeleton = O3JS.Skeleton as any;
export const SkinnedMesh: I3JS.ISkinnedMesh = O3JS.SkinnedMesh as any;
export const Sprite: I3JS.ISprite = O3JS.Sprite as any;

export const PMREMGenerator: I3JS.IPMREMGenerator = O3JS.PMREMGenerator as any;
export const WebGL1Renderer: I3JS.IWebGL1Renderer = O3JS.WebGL1Renderer as any;
export const WebGLCubeRenderTarget: I3JS.IWebGLCubeRenderTarget = O3JS.WebGLCubeRenderTarget as any;
export const WebGLMultipleRenderTargets: I3JS.IWebGLMultipleRenderTargets = O3JS.WebGLMultipleRenderTargets as any;
export const WebGLMultisampleRenderTarget: I3JS.IWebGLMultisampleRenderTarget =
	O3JS.WebGLMultisampleRenderTarget as any;
export const WebGLRenderer: I3JS.IWebGLRenderer = O3JS.WebGLRenderer as any;
export const WebGLRenderTarget: I3JS.IWebGLRenderTarget = O3JS.WebGLRenderTarget as any;
export const Fog: I3JS.IFog = O3JS.Fog as any;
export const FogExp2: I3JS.IFogExp2 = O3JS.FogExp2 as any;
export const Scene: I3JS.IScene = O3JS.Scene as any;
export const CanvasTexture: I3JS.ICanvasTexture = O3JS.CanvasTexture as any;
export const CompressedTexture: I3JS.ICompressedTexture = O3JS.CompressedTexture as any;
export const CubeTexture: I3JS.ICubeTexture = O3JS.CubeTexture as any;
export const DataTexture: I3JS.IDataTexture = O3JS.DataTexture as any;
export const DataTexture2DArray: I3JS.IDataTexture2DArray = O3JS.DataTexture2DArray as any;
export const DataTexture3D: I3JS.IDataTexture3D = O3JS.DataTexture3D as any;
export const DepthTexture: I3JS.IDepthTexture = O3JS.DepthTexture as any;
export const Texture: I3JS.ITexture = O3JS.Texture as any;
export const VideoTexture: I3JS.IVideoTexture = O3JS.VideoTexture as any;
export const Loader: I3JS.ILoader = O3JS.Loader as any;
export const LoadingManager: I3JS.ILoadingManager = O3JS.LoadingManager as any;
export const AnimationLoader: I3JS.IAnimationLoader = O3JS.AnimationLoader as any;
export const AudioLoader: I3JS.IAudioLoader = O3JS.AudioLoader as any;
export const MaterialLoader: I3JS.IMaterialLoader = O3JS.MaterialLoader as any;
export const ObjectLoader: I3JS.IObjectLoader = O3JS.ObjectLoader as any;
export const TextureLoader: I3JS.ITextureLoader = O3JS.TextureLoader as any;
export const BufferGeometryLoader: I3JS.IBufferGeometryLoader = O3JS.BufferGeometryLoader as any;
export const CompressedTextureLoader: I3JS.ICompressedTextureLoader = O3JS.CompressedTextureLoader as any;
export const CubeTextureLoader: I3JS.ICubeTextureLoader = O3JS.CubeTextureLoader as any;
export const DataTextureLoader: I3JS.IDataTextureLoader = O3JS.DataTextureLoader as any;
export const FileLoader: I3JS.IFileLoader = O3JS.FileLoader as any;
export const ImageBitmapLoader: I3JS.IImageBitmapLoader = O3JS.ImageBitmapLoader as any;
export const ImageLoader: I3JS.IImageLoader = O3JS.ImageLoader as any;

export const ColladaExporter: I3JS.IColladaExporter = EX_ColladaExporter as any;
export const DRACOExporter: I3JS.IDRACOExporter = EX_DRACOExporter as any;
export const GLTFExporter: I3JS.IGLTFExporter = EX_GLTFExporter as any;
export const MMDExporter: I3JS.IMMDExporter = EX_MMDExporter as any;
export const OBJExporter: I3JS.IOBJExporter = EX_OBJExporter as any;
export const PLYExporter: I3JS.IPLYExporter = EX_PLYExporter as any;
export const STLExporter: I3JS.ISTLExporter = EX_STLExporter as any;
export const USDZExporter: I3JS.IUSDZExporter = EX_USDZExporter as any;
export const Rhino3dmLoader: I3JS.IRhino3dmLoader = EX_Rhino3dmLoader as any;
export const ThreeMFLoader: I3JS.IThreeMFLoader = EX_ThreeMFLoader as any;
export const AMFLoader: I3JS.IAMFLoader = EX_AMFLoader as any;
export const BasisTextureLoader: I3JS.IBasisTextureLoader = EX_BasisTextureLoader as any;
export const BVHLoader: I3JS.IBVHLoader = EX_BVHLoader as any;
export const ColladaLoader: I3JS.IColladaLoader = EX_ColladaLoader as any; 
export const DDSLoader: I3JS.IDDSLoader = EX_DDSLoader as any;
export const DRACOLoader: I3JS.IDRACOLoader = EX_DRACOLoader as any;
export const EXRLoader: I3JS.IEXRLoader = EX_EXRLoader as any;
export const FBXLoader: I3JS.IFBXLoader = EX_FBXLoader as any;
export const Font: I3JS.IFont = EX_Font as any;
export const FontLoader: I3JS.IFontLoader = EX_FontLoader as any;
export const GCodeLoader: I3JS.IGCodeLoader = EX_GCodeLoader as any;
export const GLTFLoader: I3JS.IGLTFLoader = EX_GLTFLoader as any;
export const HDRCubeTextureLoader: I3JS.IHDRCubeTextureLoader = EX_HDRCubeTextureLoader as any;
export const IFCLoader: I3JS.IIFCLoader = EX_IFCLoader as any;
export const KMZLoader: I3JS.IKMZLoader = EX_KMZLoader as any;
export const KTX2Loader: I3JS.IKTX2Loader = EX_KTX2Loader as any;
export const KTXLoader: I3JS.IKTXLoader = EX_KTXLoader as any;
export const LDrawLoader: I3JS.ILDrawLoader = EX_LDrawLoader as any;
export const LottieLoader: I3JS.ILottieLoader = EX_LottieLoader as any;
export const LUT3dlLoader: I3JS.ILUT3dlLoader = EX_LUT3dlLoader as any;
export const LUTCubeLoader: I3JS.ILUTCubeLoader = EX_LUTCubeLoader as any;
export const LWOLoader: I3JS.ILWOLoader = EX_LWOLoader as any;
export const MD2Loader: I3JS.IMD2Loader = EX_MD2Loader as any;
export const MDDLoader: I3JS.IMDDLoader = EX_MDDLoader as any;
export const MMDLoader: I3JS.IMMDLoader = EX_MMDLoader as any;
export const MTLLoader: I3JS.IMTLLoader = EX_MTLLoader as any;
export const NRRDLoader: I3JS.INRRDLoader = EX_NRRDLoader as any;
export const OBJLoader: I3JS.IOBJLoader = EX_OBJLoader as any;
export const PCDLoader: I3JS.IPCDLoader = EX_PCDLoader as any;
export const PDBLoader: I3JS.IPDBLoader = EX_PDBLoader as any;
export const PLYLoader: I3JS.IPLYLoader = EX_PLYLoader as any;
export const PRWMLoader: I3JS.IPRWMLoader = EX_PRWMLoader as any;
export const PVRLoader: I3JS.IPVRLoader = EX_PVRLoader as any;
export const RGBELoader: I3JS.IRGBELoader = EX_RGBELoader as any;
export const RGBMLoader: I3JS.IRGBMLoader = EX_RGBMLoader as any;
export const STLLoader: I3JS.ISTLLoader = EX_STLLoader as any;
export const SVGLoader: I3JS.ISVGLoader = EX_SVGLoader as any;
export const TDSLoader: I3JS.ITDSLoader = EX_TDSLoader as any;
export const TGALoader: I3JS.ITGALoader = EX_TGALoader as any;
export const TTFLoader: I3JS.ITTFLoader = EX_TTFLoader as any;
export const VOXLoader: I3JS.IVOXLoader = EX_VOXLoader as any;
export const VOXMesh: I3JS.IVOXMesh = EX_VOXMesh as any;
export const VOXDataTexture3D: I3JS.IVOXDataTexture3D = EX_VOXDataTexture3D as any;
export const VRMLLoader: I3JS.IVRMLLoader = EX_VRMLLoader as any;
export const VRMLoader: I3JS.IVRMLoader = EX_VRMLoader as any;
export const VTKLoader: I3JS.IVTKLoader = EX_VTKLoader as any;
export const XYZLoader: I3JS.IXYZLoader = EX_XYZLoader as any;
export const MD2Character: I3JS.IMD2Character = EX_MD2Character as any;
export const MD2CharacterComplex: I3JS.IMD2CharacterComplex = EX_MD2CharacterComplex as any;
export const Volume: I3JS.IVolume = EX_Volume as any;
export const CSS2DObject: I3JS.ICSS2DObject = EX_CSS2DObject as any;
export const CSS3DObject: I3JS.ICSS3DObject = EX_CSS3DObject as any;
export const MeshoptDecoder: any = EX_MeshoptDecoder as any;
export const TiltLoader: I3JS.ITiltLoader = EX_TiltLoader as any;


export const ArcCurve: I3JS.IArcCurve = O3JS.ArcCurve as any;
export const CatmullRomCurve3: I3JS.ICatmullRomCurve3 = O3JS.CatmullRomCurve3 as any;
export const CubicBezierCurve: I3JS.ICubicBezierCurve = O3JS.CubicBezierCurve as any;
export const CubicBezierCurve3: I3JS.ICubicBezierCurve3 = O3JS.CubicBezierCurve3 as any;
export const EllipseCurve: I3JS.IEllipseCurve = O3JS.EllipseCurve as any;
export const LineCurve: I3JS.ILineCurve = O3JS.LineCurve as any;
export const LineCurve3: I3JS.ILineCurve3 = O3JS.LineCurve3 as any;
export const QuadraticBezierCurve: I3JS.IQuadraticBezierCurve = O3JS.QuadraticBezierCurve as any;
export const QuadraticBezierCurve3: I3JS.IQuadraticBezierCurve3 = O3JS.QuadraticBezierCurve3 as any;
export const SplineCurve: I3JS.ISplineCurve = O3JS.SplineCurve as any;
export const Shape: I3JS.IShape = O3JS.Shape as any;
export const ShapePath: I3JS.IShapePath = O3JS.ShapePath as any;
export const Path: I3JS.IPath = O3JS.Path as any;
export const Curve: I3JS.ICurve = O3JS.Curve as any;
export const CurvePath: I3JS.ICurvePath = O3JS.CurvePath as any;

export const CullFaceNone: O3JS.CullFace = O3JS.CullFaceNone;
export const CullFaceBack: O3JS.CullFace = O3JS.CullFaceBack;
export const CullFaceFront: O3JS.CullFace = O3JS.CullFaceFront;
export const CullFaceFrontBack: O3JS.CullFace = O3JS.CullFaceFrontBack;

export const BasicShadowMap: O3JS.ShadowMapType = O3JS.BasicShadowMap;
export const PCFShadowMap: O3JS.ShadowMapType = O3JS.PCFShadowMap;
export const PCFSoftShadowMap: O3JS.ShadowMapType = O3JS.PCFSoftShadowMap;
export const VSMShadowMap: O3JS.ShadowMapType = O3JS.VSMShadowMap;

export const FrontSide: O3JS.Side = O3JS.FrontSide;
export const BackSide: O3JS.Side = O3JS.BackSide;
export const DoubleSide: O3JS.Side = O3JS.DoubleSide;

export const FlatShading: O3JS.Shading = O3JS.FlatShading;
export const SmoothShading: O3JS.Shading = O3JS.SmoothShading;

export const NoBlending: O3JS.Blending = O3JS.NoBlending;
export const NormalBlending: O3JS.Blending = O3JS.NormalBlending;
export const AdditiveBlending: O3JS.Blending = O3JS.AdditiveBlending;
export const SubtractiveBlending: O3JS.Blending = O3JS.SubtractiveBlending;
export const MultiplyBlending: O3JS.Blending = O3JS.MultiplyBlending;
export const CustomBlending: O3JS.Blending = O3JS.CustomBlending;

export const AddEquation: O3JS.BlendingEquation = O3JS.AddEquation;
export const SubtractEquation: O3JS.BlendingEquation = O3JS.SubtractEquation;
export const ReverseSubtractEquation: O3JS.BlendingEquation = O3JS.ReverseSubtractEquation;
export const MinEquation: O3JS.BlendingEquation = O3JS.MinEquation;
export const MaxEquation: O3JS.BlendingEquation = O3JS.MaxEquation;

export const ZeroFactor: O3JS.BlendingDstFactor = O3JS.ZeroFactor;
export const OneFactor: O3JS.BlendingDstFactor = O3JS.OneFactor;
export const SrcColorFactor: O3JS.BlendingDstFactor = O3JS.SrcColorFactor;
export const OneMinusSrcColorFactor: O3JS.BlendingDstFactor = O3JS.OneMinusSrcColorFactor;
export const SrcAlphaFactor: O3JS.BlendingDstFactor = O3JS.SrcAlphaFactor;
export const OneMinusSrcAlphaFactor: O3JS.BlendingDstFactor = O3JS.OneMinusSrcAlphaFactor;
export const DstAlphaFactor: O3JS.BlendingDstFactor = O3JS.DstAlphaFactor;
export const OneMinusDstAlphaFactor: O3JS.BlendingDstFactor = O3JS.OneMinusDstAlphaFactor;
export const DstColorFactor: O3JS.BlendingDstFactor = O3JS.DstColorFactor;
export const OneMinusDstColorFactor: O3JS.BlendingDstFactor = O3JS.OneMinusDstColorFactor;

export const SrcAlphaSaturateFactor: O3JS.BlendingSrcFactor = O3JS.SrcAlphaSaturateFactor;

export const NeverDepth: O3JS.DepthModes = O3JS.NeverDepth;
export const AlwaysDepth: O3JS.DepthModes = O3JS.AlwaysDepth;
export const LessDepth: O3JS.DepthModes = O3JS.LessDepth;
export const LessEqualDepth: O3JS.DepthModes = O3JS.LessEqualDepth;
export const EqualDepth: O3JS.DepthModes = O3JS.EqualDepth;
export const GreaterEqualDepth: O3JS.DepthModes = O3JS.GreaterEqualDepth;
export const GreaterDepth: O3JS.DepthModes = O3JS.GreaterDepth;
export const NotEqualDepth: O3JS.DepthModes = O3JS.NotEqualDepth;

export const MultiplyOperation: O3JS.Combine = O3JS.MultiplyOperation;
export const MixOperation: O3JS.Combine = O3JS.MixOperation;
export const AddOperation: O3JS.Combine = O3JS.AddOperation;

export const NoToneMapping: O3JS.ToneMapping = O3JS.NoToneMapping;
export const LinearToneMapping: O3JS.ToneMapping = O3JS.LinearToneMapping;
export const ReinhardToneMapping: O3JS.ToneMapping = O3JS.ReinhardToneMapping;
export const CineonToneMapping: O3JS.ToneMapping = O3JS.CineonToneMapping;
export const ACESFilmicToneMapping: O3JS.ToneMapping = O3JS.ACESFilmicToneMapping;

export const UVMapping: O3JS.Mapping = O3JS.UVMapping;
export const CubeReflectionMapping: O3JS.Mapping = O3JS.CubeReflectionMapping;
export const CubeRefractionMapping: O3JS.Mapping = O3JS.CubeRefractionMapping;
export const EquirectangularReflectionMapping: O3JS.Mapping = O3JS.EquirectangularReflectionMapping;
export const EquirectangularRefractionMapping: O3JS.Mapping = O3JS.EquirectangularRefractionMapping;
export const CubeUVReflectionMapping: O3JS.Mapping = O3JS.CubeUVReflectionMapping;
export const CubeUVRefractionMapping: O3JS.Mapping = O3JS.CubeUVRefractionMapping;
export const DEFAULT_MAPPING: O3JS.Mapping = O3JS.Texture.DEFAULT_MAPPING;

export const RepeatWrapping: O3JS.Wrapping = O3JS.RepeatWrapping;
export const ClampToEdgeWrapping: O3JS.Wrapping = O3JS.ClampToEdgeWrapping;
export const MirroredRepeatWrapping: O3JS.Wrapping = O3JS.MirroredRepeatWrapping;

export const NearestFilter: O3JS.TextureFilter = O3JS.NearestFilter;
export const NearestMipmapNearestFilter: O3JS.TextureFilter = O3JS.NearestMipmapNearestFilter;
export const NearestMipMapNearestFilter: O3JS.TextureFilter = O3JS.NearestMipMapNearestFilter;
export const NearestMipmapLinearFilter: O3JS.TextureFilter = O3JS.NearestMipmapLinearFilter;
export const NearestMipMapLinearFilter: O3JS.TextureFilter = O3JS.NearestMipMapLinearFilter;
export const LinearFilter: O3JS.TextureFilter = O3JS.LinearFilter;
export const LinearMipmapNearestFilter: O3JS.TextureFilter = O3JS.LinearMipmapNearestFilter;
export const LinearMipMapNearestFilter: O3JS.TextureFilter = O3JS.LinearMipMapNearestFilter;
export const LinearMipmapLinearFilter: O3JS.TextureFilter = O3JS.LinearMipmapLinearFilter;
export const LinearMipMapLinearFilter: O3JS.TextureFilter = O3JS.LinearMipMapLinearFilter;

export const UnsignedByteType: O3JS.TextureDataType = O3JS.UnsignedByteType;
export const ByteType: O3JS.TextureDataType = O3JS.ByteType;
export const ShortType: O3JS.TextureDataType = O3JS.ShortType;
export const UnsignedShortType: O3JS.TextureDataType = O3JS.UnsignedShortType;
export const IntType: O3JS.TextureDataType = O3JS.IntType;
export const UnsignedIntType: O3JS.TextureDataType = O3JS.UnsignedIntType;
export const FloatType: O3JS.TextureDataType = O3JS.FloatType;
export const HalfFloatType: O3JS.TextureDataType = O3JS.HalfFloatType;
export const UnsignedShort4444Type: O3JS.TextureDataType = O3JS.UnsignedShort4444Type;
export const UnsignedShort5551Type: O3JS.TextureDataType = O3JS.UnsignedShort5551Type;
export const UnsignedShort565Type: O3JS.TextureDataType = O3JS.UnsignedShort565Type;
export const UnsignedInt248Type: O3JS.TextureDataType = O3JS.UnsignedInt248Type;

export const AlphaFormat: O3JS.PixelFormat = O3JS.AlphaFormat;
export const RGBFormat: O3JS.PixelFormat = O3JS.RGBFormat;
export const RGBAFormat: O3JS.PixelFormat = O3JS.RGBAFormat;
export const LuminanceFormat: O3JS.PixelFormat = O3JS.LuminanceFormat;
export const LuminanceAlphaFormat: O3JS.PixelFormat = O3JS.LuminanceAlphaFormat;
export const RGBEFormat: O3JS.PixelFormat = O3JS.RGBEFormat;
export const DepthFormat: O3JS.PixelFormat = O3JS.DepthFormat;
export const DepthStencilFormat: O3JS.PixelFormat = O3JS.DepthStencilFormat;
export const RedFormat: O3JS.PixelFormat = O3JS.RedFormat;
export const RedIntegerFormat: O3JS.PixelFormat = O3JS.RedIntegerFormat;
export const RGFormat: O3JS.PixelFormat = O3JS.RGFormat;
export const RGIntegerFormat: O3JS.PixelFormat = O3JS.RGIntegerFormat;
export const RGBIntegerFormat: O3JS.PixelFormat = O3JS.RGBIntegerFormat;
export const RGBAIntegerFormat: O3JS.PixelFormat = O3JS.RGBAIntegerFormat;

export const RGB_S3TC_DXT1_Format: O3JS.CompressedPixelFormat = O3JS.RGB_S3TC_DXT1_Format;
export const RGBA_S3TC_DXT1_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_S3TC_DXT1_Format;
export const RGBA_S3TC_DXT3_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_S3TC_DXT3_Format;
export const RGBA_S3TC_DXT5_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_S3TC_DXT5_Format;
export const RGB_PVRTC_4BPPV1_Format: O3JS.CompressedPixelFormat = O3JS.RGB_PVRTC_4BPPV1_Format;
export const RGB_PVRTC_2BPPV1_Format: O3JS.CompressedPixelFormat = O3JS.RGB_PVRTC_2BPPV1_Format;
export const RGBA_PVRTC_4BPPV1_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_PVRTC_4BPPV1_Format;
export const RGBA_PVRTC_2BPPV1_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_PVRTC_2BPPV1_Format;
export const RGB_ETC1_Format: O3JS.CompressedPixelFormat = O3JS.RGB_ETC1_Format;
export const RGB_ETC2_Format: O3JS.CompressedPixelFormat = O3JS.RGB_ETC2_Format;
export const RGBA_ETC2_EAC_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ETC2_EAC_Format;
export const RGBA_ASTC_4x4_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ASTC_4x4_Format;
export const RGBA_ASTC_5x4_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ASTC_5x4_Format;
export const RGBA_ASTC_5x5_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ASTC_5x5_Format;
export const RGBA_ASTC_6x5_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ASTC_6x5_Format;
export const RGBA_ASTC_6x6_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ASTC_6x6_Format;
export const RGBA_ASTC_8x5_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ASTC_8x5_Format;
export const RGBA_ASTC_8x6_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ASTC_8x6_Format;
export const RGBA_ASTC_8x8_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ASTC_8x8_Format;
export const RGBA_ASTC_10x5_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ASTC_10x5_Format;
export const RGBA_ASTC_10x6_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ASTC_10x6_Format;
export const RGBA_ASTC_10x8_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ASTC_10x8_Format;
export const RGBA_ASTC_10x10_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ASTC_10x10_Format;
export const RGBA_ASTC_12x10_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ASTC_12x10_Format;
export const RGBA_ASTC_12x12_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ASTC_12x12_Format;
export const SRGB8_ALPHA8_ASTC_4x4_Format: O3JS.CompressedPixelFormat = O3JS.SRGB8_ALPHA8_ASTC_4x4_Format;
export const SRGB8_ALPHA8_ASTC_5x4_Format: O3JS.CompressedPixelFormat = O3JS.SRGB8_ALPHA8_ASTC_5x4_Format;
export const SRGB8_ALPHA8_ASTC_5x5_Format: O3JS.CompressedPixelFormat = O3JS.SRGB8_ALPHA8_ASTC_5x5_Format;
export const SRGB8_ALPHA8_ASTC_6x5_Format: O3JS.CompressedPixelFormat = O3JS.SRGB8_ALPHA8_ASTC_6x5_Format;
export const SRGB8_ALPHA8_ASTC_6x6_Format: O3JS.CompressedPixelFormat = O3JS.SRGB8_ALPHA8_ASTC_6x6_Format;
export const SRGB8_ALPHA8_ASTC_8x5_Format: O3JS.CompressedPixelFormat = O3JS.SRGB8_ALPHA8_ASTC_8x5_Format;
export const SRGB8_ALPHA8_ASTC_8x6_Format: O3JS.CompressedPixelFormat = O3JS.SRGB8_ALPHA8_ASTC_8x6_Format;
export const SRGB8_ALPHA8_ASTC_8x8_Format: O3JS.CompressedPixelFormat = O3JS.SRGB8_ALPHA8_ASTC_8x8_Format;
export const SRGB8_ALPHA8_ASTC_10x5_Format: O3JS.CompressedPixelFormat = O3JS.SRGB8_ALPHA8_ASTC_10x5_Format;
export const SRGB8_ALPHA8_ASTC_10x6_Format: O3JS.CompressedPixelFormat = O3JS.SRGB8_ALPHA8_ASTC_10x6_Format;
export const SRGB8_ALPHA8_ASTC_10x8_Format: O3JS.CompressedPixelFormat = O3JS.SRGB8_ALPHA8_ASTC_10x8_Format;
export const SRGB8_ALPHA8_ASTC_10x10_Format: O3JS.CompressedPixelFormat = O3JS.SRGB8_ALPHA8_ASTC_10x10_Format;
export const SRGB8_ALPHA8_ASTC_12x10_Format: O3JS.CompressedPixelFormat = O3JS.SRGB8_ALPHA8_ASTC_12x10_Format;
export const SRGB8_ALPHA8_ASTC_12x12_Format: O3JS.CompressedPixelFormat = O3JS.SRGB8_ALPHA8_ASTC_12x12_Format;
export const RGBA_BPTC_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_BPTC_Format;

export const LoopOnce: O3JS.AnimationActionLoopStyles = O3JS.LoopOnce;
export const LoopRepeat: O3JS.AnimationActionLoopStyles = O3JS.LoopRepeat;
export const LoopPingPong: O3JS.AnimationActionLoopStyles = O3JS.LoopPingPong;

export const InterpolateDiscrete: O3JS.InterpolationModes = O3JS.InterpolateDiscrete;
export const InterpolateLinear: O3JS.InterpolationModes = O3JS.InterpolateLinear;
export const InterpolateSmooth: O3JS.InterpolationModes = O3JS.InterpolateSmooth;

export const ZeroCurvatureEnding: O3JS.InterpolationEndingModes = O3JS.ZeroCurvatureEnding;
export const ZeroSlopeEnding: O3JS.InterpolationEndingModes = O3JS.ZeroSlopeEnding;
export const WrapAroundEnding: O3JS.InterpolationEndingModes = O3JS.WrapAroundEnding;

export const NormalAnimationBlendMode: O3JS.AnimationBlendMode = O3JS.NormalAnimationBlendMode;
export const AdditiveAnimationBlendMode: O3JS.AnimationBlendMode = O3JS.AdditiveAnimationBlendMode;

export const TrianglesDrawMode: O3JS.TrianglesDrawModes = O3JS.TrianglesDrawMode;
export const TriangleStripDrawMode: O3JS.TrianglesDrawModes = O3JS.TriangleStripDrawMode;
export const TriangleFanDrawMode: O3JS.TrianglesDrawModes = O3JS.TriangleFanDrawMode;

export const LinearEncoding: O3JS.TextureEncoding = O3JS.LinearEncoding;
export const sRGBEncoding: O3JS.TextureEncoding = O3JS.sRGBEncoding;
export const GammaEncoding: O3JS.TextureEncoding = O3JS.GammaEncoding;
export const RGBEEncoding: O3JS.TextureEncoding = O3JS.RGBEEncoding;
// export const LogLuvEncoding: O3JS.TextureEncoding = O3JS.LogLuvEncoding;
export const RGBM7Encoding: O3JS.TextureEncoding = O3JS.RGBM7Encoding;
export const RGBM16Encoding: O3JS.TextureEncoding = O3JS.RGBM16Encoding;
export const RGBDEncoding: O3JS.TextureEncoding = O3JS.RGBDEncoding;

export const BasicDepthPacking: O3JS.DepthPackingStrategies = O3JS.BasicDepthPacking;
export const RGBADepthPacking: O3JS.DepthPackingStrategies = O3JS.RGBADepthPacking;

export const TangentSpaceNormalMap: O3JS.NormalMapTypes = O3JS.TangentSpaceNormalMap;
export const ObjectSpaceNormalMap: O3JS.NormalMapTypes = O3JS.ObjectSpaceNormalMap;

export const ZeroStencilOp: O3JS.StencilOp = O3JS.ZeroStencilOp;
export const KeepStencilOp: O3JS.StencilOp = O3JS.KeepStencilOp;
export const ReplaceStencilOp: O3JS.StencilOp = O3JS.ReplaceStencilOp;
export const IncrementStencilOp: O3JS.StencilOp = O3JS.IncrementStencilOp;
export const DecrementStencilOp: O3JS.StencilOp = O3JS.DecrementStencilOp;
export const IncrementWrapStencilOp: O3JS.StencilOp = O3JS.IncrementWrapStencilOp;
export const DecrementWrapStencilOp: O3JS.StencilOp = O3JS.DecrementWrapStencilOp;
export const InvertStencilOp: O3JS.StencilOp = O3JS.InvertStencilOp;

export const NeverStencilFunc: O3JS.StencilFunc = O3JS.NeverStencilFunc;
export const LessStencilFunc: O3JS.StencilFunc = O3JS.LessStencilFunc;
export const EqualStencilFunc: O3JS.StencilFunc = O3JS.EqualStencilFunc;
export const LessEqualStencilFunc: O3JS.StencilFunc = O3JS.LessEqualStencilFunc;
export const GreaterStencilFunc: O3JS.StencilFunc = O3JS.GreaterStencilFunc;
export const NotEqualStencilFunc: O3JS.StencilFunc = O3JS.NotEqualStencilFunc;
export const GreaterEqualStencilFunc: O3JS.StencilFunc = O3JS.GreaterEqualStencilFunc;
export const AlwaysStencilFunc: O3JS.StencilFunc = O3JS.AlwaysStencilFunc;

export const StaticDrawUsage: O3JS.Usage = O3JS.StaticDrawUsage;
export const DynamicDrawUsage: O3JS.Usage = O3JS.DynamicDrawUsage;
export const StreamDrawUsage: O3JS.Usage = O3JS.StreamDrawUsage;
export const StaticReadUsage: O3JS.Usage = O3JS.StaticReadUsage;
export const DynamicReadUsage: O3JS.Usage = O3JS.DynamicReadUsage;
export const StreamReadUsage: O3JS.Usage = O3JS.StreamReadUsage;
export const StaticCopyUsage: O3JS.Usage = O3JS.StaticCopyUsage;
export const DynamicCopyUsage: O3JS.Usage = O3JS.DynamicCopyUsage;
export const StreamCopyUsage: O3JS.Usage = O3JS.StreamCopyUsage;

export const GLSL1: O3JS.GLSLVersion = O3JS.GLSL1;
export const GLSL3: O3JS.GLSLVersion = O3JS.GLSL3;

