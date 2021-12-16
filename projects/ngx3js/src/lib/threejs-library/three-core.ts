import * as O3JS from 'three';
import { ArcballControls as EX_ArcballControls } from 'three/examples/jsm/controls/ArcballControls';
// import { DeviceOrientationControls as EX_DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls';
import { DragControls as EX_DragControls } from 'three/examples/jsm/controls/DragControls';
import { FirstPersonControls as EX_FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { FlyControls as EX_FlyControls } from 'three/examples/jsm/controls/FlyControls';
import {
	MapControls as EX_MapControls,
	OrbitControls as EX_OrbitControls,
} from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls as EX_PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { TrackballControls as EX_TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { TransformControls as EX_TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { CSM as EX_CSM } from 'three/examples/jsm/csm/CSM';
import { CSMHelper as EX_CSMHelper } from 'three/examples/jsm/csm/CSMHelper';
import { AsciiEffect as EX_AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect';
import { OutlineEffect as EX_OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';
import { ParallaxBarrierEffect as EX_ParallaxBarrierEffect } from 'three/examples/jsm/effects/ParallaxBarrierEffect';
import { PeppersGhostEffect as EX_PeppersGhostEffect } from 'three/examples/jsm/effects/PeppersGhostEffect';
import { RoomEnvironment as EX_RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { ColladaExporter as EX_ColladaExporter } from 'three/examples/jsm/exporters/ColladaExporter';
import { DRACOExporter as EX_DRACOExporter } from 'three/examples/jsm/exporters/DRACOExporter';
import { GLTFExporter as EX_GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { MMDExporter as EX_MMDExporter } from 'three/examples/jsm/exporters/MMDExporter';
import { OBJExporter as EX_OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
import { PLYExporter as EX_PLYExporter } from 'three/examples/jsm/exporters/PLYExporter';
import { STLExporter as EX_STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { USDZExporter as EX_USDZExporter } from 'three/examples/jsm/exporters/USDZExporter';
import { BoxLineGeometry as EX_BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry';
import { ConvexGeometry as EX_ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import {
	DecalGeometry as EX_DecalGeometry,
	DecalVertex as EX_DecalVertex,
} from 'three/examples/jsm/geometries/DecalGeometry';
import { LightningStrike as EX_LightningStrike } from 'three/examples/jsm/geometries/LightningStrike';
import { ParametricGeometries as EX_ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries';
import { ParametricGeometry as EX_ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import { RoundedBoxGeometry as EX_RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import { TeapotGeometry as EX_TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry';
import { TextGeometry as EX_TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { LightProbeHelper as EX_LightProbeHelper } from 'three/examples/jsm/helpers/LightProbeHelper';
import { PositionalAudioHelper as EX_PositionalAudioHelper } from 'three/examples/jsm/helpers/PositionalAudioHelper';
import { RectAreaLightHelper as EX_RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { VertexNormalsHelper as EX_VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper';
import { VertexTangentsHelper as EX_VertexTangentsHelper } from 'three/examples/jsm/helpers/VertexTangentsHelper';
import * as EX_Stats from 'three/examples/jsm/libs/stats.module';
import { LineGeometry as EX_LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial as EX_LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineSegmentsGeometry as EX_LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry';
import { WireframeGeometry2 as EX_WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2';
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
import {
	VOXDataTexture3D as EX_VOXDataTexture3D,
	VOXLoader as EX_VOXLoader,
	VOXMesh as EX_VOXMesh,
} from 'three/examples/jsm/loaders/VOXLoader';
import { VRMLLoader as EX_VRMLLoader } from 'three/examples/jsm/loaders/VRMLLoader';
import { VRMLoader as EX_VRMLoader } from 'three/examples/jsm/loaders/VRMLoader';
import { VTKLoader as EX_VTKLoader } from 'three/examples/jsm/loaders/VTKLoader';
import { XYZLoader as EX_XYZLoader } from 'three/examples/jsm/loaders/XYZLoader';
import { Gyroscope as EX_Gyroscope } from 'three/examples/jsm/misc/Gyroscope';
import { MD2Character as EX_MD2Character } from 'three/examples/jsm/misc/MD2Character';
import { MMDAnimationHelper as EX_MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';

import { MD2CharacterComplex as EX_MD2CharacterComplex } from 'three/examples/jsm/misc/MD2CharacterComplex';
import { ProgressiveLightMap as EX_ProgressiveLightMap } from 'three/examples/jsm/misc/ProgressiveLightMap';
import * as EX_RollerCoaster from 'three/examples/jsm/misc/RollerCoaster';
import { Volume as EX_Volume } from 'three/examples/jsm/misc/Volume';
import { EdgeSplitModifier as EX_EdgeSplitModifier } from 'three/examples/jsm/modifiers/EdgeSplitModifier';
import { SimplifyModifier as EX_SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier';
import { TessellateModifier as EX_TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier';
import * as NODES from 'three/examples/jsm/nodes/Nodes';
import * as EX_ReflectorForSSRPass from 'three/examples/jsm/objects/ReflectorForSSRPass';
import { ReflectorRTT as EX_ReflectorRTT } from 'three/examples/jsm/objects/ReflectorRTT';
import { ShadowMesh as EX_ShadowMesh } from 'three/examples/jsm/objects/ShadowMesh';
import { AdaptiveToneMappingPass as EX_AdaptiveToneMappingPass } from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass';
import { AfterimagePass as EX_AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { BloomPass as EX_BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import { BokehPass as EX_BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { ClearPass as EX_ClearPass } from 'three/examples/jsm/postprocessing/ClearPass';
import { CubeTexturePass as EX_CubeTexturePass } from 'three/examples/jsm/postprocessing/CubeTexturePass';
import { DotScreenPass as EX_DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
import { EffectComposer as EX_EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { FilmPass as EX_FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { GlitchPass as EX_GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { HalftonePass as EX_HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass';
import { LUTPass as EX_LUTPass } from 'three/examples/jsm/postprocessing/LUTPass';
import { ClearMaskPass as EX_ClearMaskPass, MaskPass as EX_MaskPass } from 'three/examples/jsm/postprocessing/MaskPass';
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
import {
	CSS2DObject as EX_CSS2DObject,
	CSS2DRenderer as EX_CSS2DRenderer,
} from 'three/examples/jsm/renderers/CSS2DRenderer';
import {
	CSS3DObject as EX_CSS3DObject,
	CSS3DSprite as EX_CSS3DSprite,
	CSS3DRenderer as EX_CSS3DRenderer,
} from 'three/examples/jsm/renderers/CSS3DRenderer';
import { SVGRenderer as EX_SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer';
import { AfterimageShader as EX_AfterimageShader } from 'three/examples/jsm/shaders/AfterimageShader';
import { BasicShader as EX_BasicShader } from 'three/examples/jsm/shaders/BasicShader';
import { BleachBypassShader as EX_BleachBypassShader } from 'three/examples/jsm/shaders/BleachBypassShader';
import { BlendShader as EX_BlendShader } from 'three/examples/jsm/shaders/BlendShader';
import { BokehShader as EX_BokehShader } from 'three/examples/jsm/shaders/BokehShader';
import {
	BokehDepthShader as EX_BokehDepthShader,
	BokehShader as EX_BokehShader2,
} from 'three/examples/jsm/shaders/BokehShader2';
import { BrightnessContrastShader as EX_BrightnessContrastShader } from 'three/examples/jsm/shaders/BrightnessContrastShader';
import { ColorCorrectionShader as EX_ColorCorrectionShader } from 'three/examples/jsm/shaders/ColorCorrectionShader';
import { ColorifyShader as EX_ColorifyShader } from 'three/examples/jsm/shaders/ColorifyShader';
import { ConvolutionShader as EX_ConvolutionShader } from 'three/examples/jsm/shaders/ConvolutionShader';
import { CopyShader as EX_CopyShader } from 'three/examples/jsm/shaders/CopyShader';
import { DepthLimitedBlurShader as EX_DepthLimitedBlurShader } from 'three/examples/jsm/shaders/DepthLimitedBlurShader';
import { DigitalGlitch as EX_DigitalGlitch } from 'three/examples/jsm/shaders/DigitalGlitch';
import { DOFMipMapShader as EX_DOFMipMapShader } from 'three/examples/jsm/shaders/DOFMipMapShader';
import { DotScreenShader as EX_DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader';
import { FilmShader as EX_FilmShader } from 'three/examples/jsm/shaders/FilmShader';
import { FocusShader as EX_FocusShader } from 'three/examples/jsm/shaders/FocusShader';
import { FreiChenShader as EX_FreiChenShader } from 'three/examples/jsm/shaders/FreiChenShader';
import { FXAAShader as EX_FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { GammaCorrectionShader as EX_GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';
import {
	GodRaysCombineShader as EX_GodRaysCombineShader,
	GodRaysDepthMaskShader as EX_GodRaysDepthMaskShader,
	GodRaysFakeSunShader as EX_GodRaysFakeSunShader,
	GodRaysGenerateShader as EX_GodRaysGenerateShader,
} from 'three/examples/jsm/shaders/GodRaysShader';
import { HalftoneShader as EX_HalftoneShader } from 'three/examples/jsm/shaders/HalftoneShader';
import { HorizontalBlurShader as EX_HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader';
import { HorizontalTiltShiftShader as EX_HorizontalTiltShiftShader } from 'three/examples/jsm/shaders/HorizontalTiltShiftShader';
import { HueSaturationShader as EX_HueSaturationShader } from 'three/examples/jsm/shaders/HueSaturationShader';
import { KaleidoShader as EX_KaleidoShader } from 'three/examples/jsm/shaders/KaleidoShader';
import { LuminosityHighPassShader as EX_LuminosityHighPassShader } from 'three/examples/jsm/shaders/LuminosityHighPassShader';
import { LuminosityShader as EX_LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader';
import { MirrorShader as EX_MirrorShader } from 'three/examples/jsm/shaders/MirrorShader';
import { NormalMapShader as EX_NormalMapShader } from 'three/examples/jsm/shaders/NormalMapShader';
import { PixelShader as EX_PixelShader } from 'three/examples/jsm/shaders/PixelShader';
import { RGBShiftShader as EX_RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader';
import { SAOShader as EX_SAOShader } from 'three/examples/jsm/shaders/SAOShader';
import { SepiaShader as EX_SepiaShader } from 'three/examples/jsm/shaders/SepiaShader';
import {
	SMAABlendShader as EX_SMAABlendShader,
	SMAAEdgesShader as EX_SMAAEdgesShader,
	SMAAWeightsShader as EX_SMAAWeightsShader,
} from 'three/examples/jsm/shaders/SMAAShader';
import { SobelOperatorShader as EX_SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader';
import * as EX_SSAOShader from 'three/examples/jsm/shaders/SSAOShader';
import * as EX_SSRrShader from 'three/examples/jsm/shaders/SSRrShader';
import * as EX_SSRShader from 'three/examples/jsm/shaders/SSRShader';
import { SubsurfaceScatteringShader as EX_SubsurfaceScatteringShader } from 'three/examples/jsm/shaders/SubsurfaceScatteringShader';
import { TechnicolorShader as EX_TechnicolorShader } from 'three/examples/jsm/shaders/TechnicolorShader';
import { ToneMapShader as EX_ToneMapShader } from 'three/examples/jsm/shaders/ToneMapShader';
import * as EX_ToonShader from 'three/examples/jsm/shaders/ToonShader';
import { TriangleBlurShader as EX_TriangleBlurShader } from 'three/examples/jsm/shaders/TriangleBlurShader';
import { UnpackDepthRGBAShader as EX_UnpackDepthRGBAShader } from 'three/examples/jsm/shaders/UnpackDepthRGBAShader';
import { VerticalBlurShader as EX_VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader';
import { VerticalTiltShiftShader as EX_VerticalTiltShiftShader } from 'three/examples/jsm/shaders/VerticalTiltShiftShader';
import { VignetteShader as EX_VignetteShader } from 'three/examples/jsm/shaders/VignetteShader';
import { VolumeRenderShader1 as EX_VolumeRenderShader1 } from 'three/examples/jsm/shaders/VolumeShader';
import { WaterRefractionShader as EX_WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader';
import * as E_GF_UTIL from 'three/examples/jsm/utils/BufferGeometryUtils';
import * as EX_GeometryCompressionUtils from 'three/examples/jsm/utils/GeometryCompressionUtils';
import * as E_G_UTIL from 'three/examples/jsm/utils/GeometryUtils';
import * as EX_SceneUtils from 'three/examples/jsm/utils/SceneUtils';
import { ShadowMapViewer as EX_ShadowMapViewer } from 'three/examples/jsm/utils/ShadowMapViewer';
import { NgxCapsuleGeometry } from '../geometry/geometries/capsule';
import { NgxCircleDepthGeometry } from '../geometry/geometries/circle-depth';
import { NgxGridGeometry } from '../geometry/geometries/grid';
import { NgxOutlineGeometry } from '../geometry/geometries/outline';
import { NgxPlaneDepthGeometry } from '../geometry/geometries/plane-depth';
import { NgxPlanePerlinGeometry } from '../geometry/geometries/plane-perlin';
import { NgxRingDepthGeometry } from '../geometry/geometries/ring-depth';
import { NgxRopeGeometry } from '../geometry/geometries/rope';
import { NgxStarGeometry } from '../geometry/geometries/star';
import { NgxStarDepthGeometry } from '../geometry/geometries/star-depth';
import * as THREE_MAT from '../material/materials/three-materials';
import * as I3JS from '../threejs-library/three-interface';
import * as NGX_PASS from './../pass/passes/three-passes';
import { MeshoptDecoder as EX_MeshoptDecoder } from './meshopt_decoder.module';
import { TiltLoader as EX_TiltLoader } from './TiltLoader';
import { LightProbeGenerator as EX_LightProbeGenerator } from 'three/examples/jsm/lights/LightProbeGenerator';
import {
	Lensflare as EX_Lensflare,
	LensflareElement as EX_LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';
import { MorphAnimMesh as EX_MorphAnimMesh } from 'three/examples/jsm/misc/MorphAnimMesh';
import { InteractiveGroup as EX_InteractiveGroup } from 'three/examples/jsm/interactive/InteractiveGroup';
import { Line2 as EX_Line2 } from 'three/examples/jsm/lines/Line2';
import { Wireframe as EX_Wireframe } from 'three/examples/jsm/lines/Wireframe';
import { TubePainter as EX_TubePainter } from 'three/examples/jsm/misc/TubePainter';
import { Flow as EX_Flow, InstancedFlow as EX_InstancedFlow } from 'three/examples/jsm/modifiers/CurveModifier';
import { LightningStorm as EX_LightningStorm } from 'three/examples/jsm/objects/LightningStorm';
import { MarchingCubes as EX_MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';
import { Reflector as EX_Reflector } from 'three/examples/jsm/objects/Reflector';
import { Refractor as EX_Refractor } from 'three/examples/jsm/objects/Refractor';
import { Sky as EX_Sky } from 'three/examples/jsm/objects/Sky';
import { Water as EX_Water } from 'three/examples/jsm/objects/Water';
import { Water as EX_Water2 } from 'three/examples/jsm/objects/Water2';
import { SVGObject as EX_SVGObject } from 'three/examples/jsm/renderers/SVGRenderer';

import { CinematicCamera as EX_CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera';
import { NURBSCurve as EX_NURBSCurve } from 'three/examples/jsm/curves/NURBSCurve';
import { NURBSSurface as EX_NURBSSurface } from 'three/examples/jsm/curves/NURBSSurface';
import { Capsule as EX_Capsule } from 'three/examples/jsm/math/Capsule';
import { Lut as EX_Lut } from 'three/examples/jsm/math/Lut';
import { MeshSurfaceSampler as EX_MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
import { OBB as EX_OBB } from 'three/examples/jsm/math/OBB';
import { Octree as EX_Octree } from 'three/examples/jsm/math/Octree';
import { GPUComputationRenderer as EX_GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer';
import { UVsDebug as EX_UVsDebug } from 'three/examples/jsm/utils/UVsDebug';


export type Stats = I3JS.Stats;
export const Stats: Stats = EX_Stats.default as any;

export type SceneUtils = I3JS.SceneUtils;
export const SceneUtils: SceneUtils = EX_SceneUtils as any;


export type CSM = I3JS.CSM;
export const CSM: CSM = EX_CSM as any;

export type CSMHelper = I3JS.CSMHelper;
export const CSMHelper: CSMHelper = EX_CSMHelper as any;

export type Gyroscope = I3JS.Gyroscope;
export const Gyroscope: Gyroscope = EX_Gyroscope as any;

export type LightProbeHelper = I3JS.LightProbeHelper;
export const LightProbeHelper: LightProbeHelper = EX_LightProbeHelper as any;

export type PositionalAudioHelper = I3JS.PositionalAudioHelper;
export const PositionalAudioHelper: PositionalAudioHelper = EX_PositionalAudioHelper as any;

export type RectAreaLightHelper = I3JS.RectAreaLightHelper;
export const RectAreaLightHelper: RectAreaLightHelper = EX_RectAreaLightHelper as any;

export type VertexNormalsHelper = I3JS.VertexNormalsHelper;
export const VertexNormalsHelper: VertexNormalsHelper = EX_VertexNormalsHelper as any;

export type VertexTangentsHelper = I3JS.VertexTangentsHelper;
export const VertexTangentsHelper: VertexTangentsHelper = EX_VertexTangentsHelper as any;

export type LightProbeGenerator = I3JS.LightProbeGenerator;
export const LightProbeGenerator: LightProbeGenerator = EX_LightProbeGenerator as any;

export type Lensflare = I3JS.Lensflare;
export const Lensflare: Lensflare = EX_Lensflare as any;

export type LensflareElement = I3JS.LensflareElement;
export const LensflareElement: LensflareElement = EX_LensflareElement as any;

export type MorphAnimMesh = I3JS.MorphAnimMesh;
export const MorphAnimMesh: MorphAnimMesh = EX_MorphAnimMesh as any;


export type CinematicCamera = I3JS.CinematicCamera;
export const CinematicCamera: CinematicCamera = EX_CinematicCamera as any;

export type NURBSCurve = I3JS.NURBSCurve;
export const NURBSCurve: NURBSCurve = EX_NURBSCurve as any;

export type NURBSSurface = I3JS.NURBSSurface;
export const NURBSSurface: NURBSSurface = EX_NURBSSurface as any;

export type Capsule = I3JS.Capsule;
export const Capsule: Capsule = EX_Capsule as any;

export type Lut = I3JS.Lut;
export const Lut: Lut = EX_Lut as any;

export type MeshSurfaceSampler = I3JS.MeshSurfaceSampler;
export const MeshSurfaceSampler: MeshSurfaceSampler = EX_MeshSurfaceSampler as any;

export type OBB = I3JS.OBB;
export const OBB: OBB = EX_OBB as any;

export type Octree = I3JS.Octree;
export const Octree: Octree = EX_Octree as any;

export type GPUComputationRenderer = I3JS.GPUComputationRenderer;
export const GPUComputationRenderer: GPUComputationRenderer = EX_GPUComputationRenderer as any;

export type UVsDebug = I3JS.UVsDebug;
export const UVsDebug: UVsDebug = EX_UVsDebug as any;


export type CSS2DRenderer = I3JS.CSS2DRenderer;
export const CSS2DRenderer: CSS2DRenderer = EX_CSS2DRenderer as any;

export type CSS3DRenderer = I3JS.CSS3DRenderer;
export const CSS3DRenderer: CSS3DRenderer = EX_CSS3DRenderer as any;

export type SVGRenderer = I3JS.SVGRenderer;
export const SVGRenderer: SVGRenderer = EX_SVGRenderer as any;


export type ArcballControls = I3JS.ArcballControls;
export const ArcballControls: ArcballControls = EX_ArcballControls as any;
// export type DeviceOrientationControls = I3JS.DeviceOrientationControls;
// export const DeviceOrientationControls: DeviceOrientationControls = EX_DeviceOrientationControls as any;

export type DragControls = I3JS.DragControls;
export const DragControls: DragControls = EX_DragControls as any;

export type FirstPersonControls = I3JS.FirstPersonControls;
export const FirstPersonControls: FirstPersonControls = EX_FirstPersonControls as any;

export type FlyControls = I3JS.FlyControls;
export const FlyControls: FlyControls = EX_FlyControls as any;

export type OrbitControls = I3JS.OrbitControls;
export const OrbitControls: OrbitControls = EX_OrbitControls as any;

export type MapControls = I3JS.MapControls;
export const MapControls: MapControls = EX_MapControls as any;

export type CsmControls = I3JS.CSM;
export const CsmControls: CsmControls = EX_CSM as any;


export type PointerLockControls = I3JS.PointerLockControls;
export const PointerLockControls: PointerLockControls = EX_PointerLockControls as any;

export type TrackballControls = I3JS.TrackballControls;
export const TrackballControls: TrackballControls = EX_TrackballControls as any;

export type TransformControls = I3JS.TransformControls;
export const TransformControls: TransformControls = EX_TransformControls as any;


export type AdaptiveToneMappingPass = I3JS.AdaptiveToneMappingPass;
export const AdaptiveToneMappingPass: AdaptiveToneMappingPass = EX_AdaptiveToneMappingPass as any;

export type AfterimagePass = I3JS.AfterimagePass;
export const AfterimagePass: AfterimagePass = EX_AfterimagePass as any;

export type BloomPass = I3JS.BloomPass;
export const BloomPass: BloomPass = EX_BloomPass as any;

export type BokehPass = I3JS.BokehPass;
export const BokehPass: BokehPass = EX_BokehPass as any;

export type ClearPass = I3JS.ClearPass;
export const ClearPass: ClearPass = EX_ClearPass as any;

export type CubeTexturePass = I3JS.CubeTexturePass;
export const CubeTexturePass: CubeTexturePass = EX_CubeTexturePass as any;

export type DotScreenPass = I3JS.DotScreenPass;
export const DotScreenPass: DotScreenPass = EX_DotScreenPass as any;

export type FilmPass = I3JS.FilmPass;
export const FilmPass: FilmPass = EX_FilmPass as any;

export type GlitchPass = I3JS.GlitchPass;
export const GlitchPass: GlitchPass = EX_GlitchPass as any;

export type HalftonePass = I3JS.HalftonePass;
export const HalftonePass: HalftonePass = EX_HalftonePass as any;

export type LUTPass = I3JS.LUTPass;
export const LUTPass: LUTPass = EX_LUTPass as any;

export type MaskPass = I3JS.MaskPass;
export const MaskPass: MaskPass = EX_MaskPass as any;

export type ClearMaskPass = I3JS.ClearMaskPass;
export const ClearMaskPass: ClearMaskPass = EX_ClearMaskPass as any;

export type OutlinePass = I3JS.OutlinePass;
export const OutlinePass: OutlinePass = EX_OutlinePass as any;

export type Pass = I3JS.Pass;
export const Pass: Pass = EX_Pass as any;

export type RenderPass = I3JS.RenderPass;
export const RenderPass: RenderPass = EX_RenderPass as any;

export type SAOPass = I3JS.SAOPass;
export const SAOPass: SAOPass = EX_SAOPass as any;

export type SavePass = I3JS.SavePass;
export const SavePass: SavePass = EX_SavePass as any;

export type ShaderPass = I3JS.ShaderPass;
export const ShaderPass: ShaderPass = EX_ShaderPass as any;

export type SMAAPass = I3JS.SMAAPass;
export const SMAAPass: SMAAPass = EX_SMAAPass as any;

export type SSAARenderPass = I3JS.SSAARenderPass;
export const SSAARenderPass: SSAARenderPass = EX_SSAARenderPass as any;

export type SSAOPass = I3JS.SSAOPass;
export const SSAOPass: SSAOPass = EX_SSAOPass as any;

export type SSRPass = I3JS.SSRPass;
export const SSRPass: SSRPass = EX_SSRPass as any;

export type SSRrPass = I3JS.SSRrPass;
export const SSRrPass: SSRrPass = EX_SSRrPass as any;

export type TAARenderPass = I3JS.TAARenderPass;
export const TAARenderPass: TAARenderPass = EX_TAARenderPass as any;

export type TexturePass = I3JS.TexturePass;
export const TexturePass: TexturePass = EX_TexturePass as any;

export type UnrealBloomPass = I3JS.UnrealBloomPass;
export const UnrealBloomPass: UnrealBloomPass = EX_UnrealBloomPass as any;


export type ShaderCopyPass = I3JS.ShaderCopyPass;
export const ShaderCopyPass: ShaderCopyPass = NGX_PASS.NgxShaderCopyPass as any;

export type ShaderRGBShiftPass = I3JS.ShaderRGBShiftPass;
export const ShaderRGBShiftPass: ShaderRGBShiftPass = NGX_PASS.NgxShaderRGBShiftPass as any;

export type ShaderBleachBypassPass = I3JS.ShaderBleachBypassPass;
export const ShaderBleachBypassPass: ShaderBleachBypassPass = NGX_PASS.NgxShaderBleachBypassPass as any;

export type ShaderSepiaPass = I3JS.ShaderSepiaPass;
export const ShaderSepiaPass: ShaderSepiaPass = NGX_PASS.NgxShaderSepiaPass as any;

export type ShaderVignettePass = I3JS.ShaderVignettePass;
export const ShaderVignettePass: ShaderVignettePass = NGX_PASS.NgxShaderVignettePass as any;

export type ShaderGammaCorrectionPass = I3JS.ShaderGammaCorrectionPass;
export const ShaderGammaCorrectionPass: ShaderGammaCorrectionPass = NGX_PASS.NgxShaderGammaCorrectionPass as any;

export type ShaderFXAAPass = I3JS.ShaderFXAAPass;
export const ShaderFXAAPass: ShaderFXAAPass = NGX_PASS.NgxShaderFXAAPass as any;

export type ShaderPixelPass = I3JS.ShaderPixelPass;
export const ShaderPixelPass: ShaderPixelPass = NGX_PASS.NgxShaderPixelPass as any;

export type ShaderLuminosityPass = I3JS.ShaderLuminosityPass;
export const ShaderLuminosityPass: ShaderLuminosityPass = NGX_PASS.NgxShaderLuminosityPass as any;

export type ShaderDotScreenPass = I3JS.ShaderDotScreenPass;
export const ShaderDotScreenPass: ShaderDotScreenPass = NGX_PASS.NgxShaderDotScreenPass as any;

export type SobelOperatorPass = I3JS.SobelOperatorPass;
export const SobelOperatorPass: SobelOperatorPass = NGX_PASS.NgxSobelOperatorPass as any;

export type ShaderMaterialPass = I3JS.ShaderMaterialPass;
export const ShaderMaterialPass: ShaderMaterialPass = NGX_PASS.NgxShaderMaterialPass as any;
export const ReflectorForSSRPass: any = (EX_ReflectorForSSRPass as any).ReflectorForSSRPass as any;


export type ReflectorRTT = I3JS.ReflectorRTT;
export const ReflectorRTT: ReflectorRTT = EX_ReflectorRTT as any;


export type AsciiEffect = I3JS.AsciiEffect;
export const AsciiEffect: AsciiEffect = EX_AsciiEffect as any;

export type OutlineEffect = I3JS.OutlineEffect;
export const OutlineEffect: OutlineEffect = EX_OutlineEffect as any;

export type ParallaxBarrierEffect = I3JS.ParallaxBarrierEffect;
export const ParallaxBarrierEffect: ParallaxBarrierEffect = EX_ParallaxBarrierEffect as any;

export type PeppersGhostEffect = I3JS.PeppersGhostEffect;
export const PeppersGhostEffect: PeppersGhostEffect = EX_PeppersGhostEffect as any;

export type EffectComposer = I3JS.EffectComposer;
export const EffectComposer: EffectComposer = EX_EffectComposer as any;


export type ProgressiveLightMap = I3JS.ProgressiveLightMap;
export const ProgressiveLightMap: ProgressiveLightMap = EX_ProgressiveLightMap as any;

export type ShadowMesh = I3JS.ShadowMesh;
export const ShadowMesh: ShadowMesh = EX_ShadowMesh as any;

export type ShadowMapViewer = I3JS.ShadowMapViewer;
export const ShadowMapViewer: ShadowMapViewer = EX_ShadowMapViewer as any;


export type AnimationUtils = I3JS.AnimationUtils;
export const AnimationUtils: AnimationUtils = O3JS.AnimationUtils as any;

export type ShaderChunk = I3JS.ShaderChunk;
export const ShaderChunk: ShaderChunk = O3JS.ShaderChunk as any;

export type ShaderLib = I3JS.ShaderLib;
export const ShaderLib: ShaderLib = O3JS.ShaderLib as any;

export type Box2 = I3JS.Box2;
export const Box2: Box2 = O3JS.Box2 as any;

export type Box3 = I3JS.Box3;
export const Box3: Box3 = O3JS.Box3 as any;

export type Color = I3JS.Color;
export const Color: Color = O3JS.Color as any;

export type Cylindrical = I3JS.Cylindrical;
export const Cylindrical: Cylindrical = O3JS.Cylindrical as any;

export type Euler = I3JS.Euler;
export const Euler: Euler = O3JS.Euler as any;

export type Frustum = I3JS.Frustum;
export const Frustum: Frustum = O3JS.Frustum as any;

export type Line3 = I3JS.Line3;
export const Line3: Line3 = O3JS.Line3 as any;

export type Matrix3 = I3JS.Matrix3;
export const Matrix3: Matrix3 = O3JS.Matrix3 as any;

export type Matrix4 = I3JS.Matrix4;
export const Matrix4: Matrix4 = O3JS.Matrix4 as any;

export type Plane = I3JS.Plane;
export const Plane: Plane = O3JS.Plane as any;

export type Quaternion = I3JS.Quaternion;
export const Quaternion: Quaternion = O3JS.Quaternion as any;

export type Ray = I3JS.Ray;
export const Ray: Ray = O3JS.Ray as any;

export type Sphere = I3JS.Sphere;
export const Sphere: Sphere = O3JS.Sphere as any;

export type Spherical = I3JS.Spherical;
export const Spherical: Spherical = O3JS.Spherical as any;

export type SphericalHarmonics3 = I3JS.SphericalHarmonics3;
export const SphericalHarmonics3: SphericalHarmonics3 = O3JS.SphericalHarmonics3 as any;

export type Triangle = I3JS.Triangle;
export const Triangle: Triangle = O3JS.Triangle as any;

export type Vector2 = I3JS.Vector2;
export const Vector2: Vector2 = O3JS.Vector2 as any;

export type Vector3 = I3JS.Vector3;
export const Vector3: Vector3 = O3JS.Vector3 as any;

export type Vector4 = I3JS.Vector4;
export const Vector4: Vector4 = O3JS.Vector4 as any;

export type MathUtils = I3JS.MathUtils;
export const MathUtils: MathUtils = O3JS.MathUtils as any;

export type CubicInterpolant = I3JS.CubicInterpolant;
export const CubicInterpolant: CubicInterpolant = O3JS.CubicInterpolant as any;

export type DiscreteInterpolant = I3JS.DiscreteInterpolant;
export const DiscreteInterpolant: DiscreteInterpolant = O3JS.DiscreteInterpolant as any;

export type LinearInterpolant = I3JS.LinearInterpolant;
export const LinearInterpolant: LinearInterpolant = O3JS.LinearInterpolant as any;

export type QuaternionLinearInterpolant = I3JS.QuaternionLinearInterpolant;
export const QuaternionLinearInterpolant: QuaternionLinearInterpolant = O3JS.QuaternionLinearInterpolant as any;

export type BufferAttribute = I3JS.BufferAttribute;
export const BufferAttribute: BufferAttribute = O3JS.BufferAttribute as any;

export type Int8BufferAttribute = I3JS.Int8BufferAttribute;
export const Int8BufferAttribute: Int8BufferAttribute = O3JS.Int8BufferAttribute as any;

export type Uint8BufferAttribute = I3JS.Uint8BufferAttribute;
export const Uint8BufferAttribute: Uint8BufferAttribute = O3JS.Uint8BufferAttribute as any;

export type Uint8ClampedBufferAttribute = I3JS.Uint8ClampedBufferAttribute;
export const Uint8ClampedBufferAttribute: Uint8ClampedBufferAttribute = O3JS.Uint8ClampedBufferAttribute as any;

export type Int16BufferAttribute = I3JS.Int16BufferAttribute;
export const Int16BufferAttribute: Int16BufferAttribute = O3JS.Int16BufferAttribute as any;

export type Uint16BufferAttribute = I3JS.Uint16BufferAttribute;
export const Uint16BufferAttribute: Uint16BufferAttribute = O3JS.Uint16BufferAttribute as any;

export type Int32BufferAttribute = I3JS.Int32BufferAttribute;
export const Int32BufferAttribute: Int32BufferAttribute = O3JS.Int32BufferAttribute as any;

export type Uint32BufferAttribute = I3JS.Uint32BufferAttribute;
export const Uint32BufferAttribute: Uint32BufferAttribute = O3JS.Uint32BufferAttribute as any;

export type Float16BufferAttribute = I3JS.Float16BufferAttribute;
export const Float16BufferAttribute: Float16BufferAttribute = O3JS.Float16BufferAttribute as any;

export type Float32BufferAttribute = I3JS.Float32BufferAttribute;
export const Float32BufferAttribute: Float32BufferAttribute = O3JS.Float32BufferAttribute as any;

export type Float64BufferAttribute = I3JS.Float64BufferAttribute;
export const Float64BufferAttribute: Float64BufferAttribute = O3JS.Float64BufferAttribute as any;


export type GeometryUtils = I3JS.GeometryUtils;
export const GeometryUtils: GeometryUtils = {
	mergeBufferAttributes: E_GF_UTIL.mergeBufferAttributes as any,
	mergeBufferGeometries: E_GF_UTIL.mergeBufferGeometries as any,
	interleaveAttributes: E_GF_UTIL.interleaveAttributes as any,
	estimateBytesUsed: E_GF_UTIL.estimateBytesUsed as any,
	mergeVertices: E_GF_UTIL.mergeVertices as any,
	toTrianglesDrawMode: E_GF_UTIL.toTrianglesDrawMode as any,
	computeMorphedAttributes: E_GF_UTIL.computeMorphedAttributes as any,
	hilbert2D: (E_G_UTIL as any).hilbert2D,
	hilbert3D: (E_G_UTIL as any).hilbert3D,
	gosper: (E_G_UTIL as any).gosper,
};


export type RoomEnvironment = I3JS.RoomEnvironment;
export const RoomEnvironment: RoomEnvironment = EX_RoomEnvironment as any;


export type Node = I3JS.Node;
export const Node: Node = NODES.Node as any;

export type TempNode = I3JS.TempNode;
export const TempNode: TempNode = NODES.TempNode as any;

export type InputNode = I3JS.InputNode;
export const InputNode: InputNode = NODES.InputNode as any;

export type ConstNode = I3JS.ConstNode;
export const ConstNode: ConstNode = NODES.ConstNode as any;

export type VarNode = I3JS.VarNode;
export const VarNode: VarNode = NODES.VarNode as any;

export type StructNode = I3JS.StructNode;
export const StructNode: StructNode = NODES.StructNode as any;

export type AttributeNode = I3JS.AttributeNode;
export const AttributeNode: AttributeNode = NODES.AttributeNode as any;

export type FunctionNode = I3JS.FunctionNode;
export const FunctionNode: FunctionNode = NODES.FunctionNode as any;

export type ExpressionNode = I3JS.ExpressionNode;
export const ExpressionNode: ExpressionNode = NODES.ExpressionNode as any;

export type FunctionCallNode = I3JS.FunctionCallNode;
export const FunctionCallNode: FunctionCallNode = NODES.FunctionCallNode as any;

export type NodeLib = I3JS.NodeLib;
export const NodeLib: NodeLib = NODES.NodeLib as any;

export type NodeUtils = I3JS.NodeUtils;
export const NodeUtils: NodeUtils = NODES.NodeUtils as any;

export type NodeFrame = I3JS.NodeFrame;
export const NodeFrame: NodeFrame = NODES.NodeFrame as any;

export type NodeUniform = I3JS.NodeUniform;
export const NodeUniform: NodeUniform = NODES.NodeUniform as any;

export type NodeBuilder = I3JS.NodeBuilder;
export const NodeBuilder: NodeBuilder = NODES.NodeBuilder as any;

// inputs


export type BoolNode = I3JS.BoolNode;
export const BoolNode: BoolNode = NODES.BoolNode as any;

export type IntNode = I3JS.IntNode;
export const IntNode: IntNode = NODES.IntNode as any;

export type FloatNode = I3JS.FloatNode;
export const FloatNode: FloatNode = NODES.FloatNode as any;

export type Vector2Node = I3JS.Vector2Node;
export const Vector2Node: Vector2Node = NODES.Vector2Node as any;

export type Vector3Node = I3JS.Vector3Node;
export const Vector3Node: Vector3Node = NODES.Vector3Node as any;

export type Vector4Node = I3JS.Vector4Node;
export const Vector4Node: Vector4Node = NODES.Vector4Node as any;

export type ColorNode = I3JS.ColorNode;
export const ColorNode: ColorNode = NODES.ColorNode as any;

export type Matrix3Node = I3JS.Matrix3Node;
export const Matrix3Node: Matrix3Node = NODES.Matrix3Node as any;

export type Matrix4Node = I3JS.Matrix4Node;
export const Matrix4Node: Matrix4Node = NODES.Matrix4Node as any;

export type TextureNode = I3JS.TextureNode;
export const TextureNode: TextureNode = NODES.TextureNode as any;

export type CubeTextureNode = I3JS.CubeTextureNode;
export const CubeTextureNode: CubeTextureNode = NODES.CubeTextureNode as any;

export type ScreenNode = I3JS.ScreenNode;
export const ScreenNode: ScreenNode = NODES.ScreenNode as any;

export type ReflectorNode = I3JS.ReflectorNode;
export const ReflectorNode: ReflectorNode = NODES.ReflectorNode as any;

export type PropertyNode = I3JS.PropertyNode;
export const PropertyNode: PropertyNode = NODES.PropertyNode as any;

export type RTTNode = I3JS.RTTNode;
export const RTTNode: RTTNode = NODES.RTTNode as any;

// accessors


export type UVNode = I3JS.UVNode;
export const UVNode: UVNode = NODES.UVNode as any;

export type ColorsNode = I3JS.ColorsNode;
export const ColorsNode: ColorsNode = NODES.ColorsNode as any;

export type PositionNode = I3JS.PositionNode;
export const PositionNode: PositionNode = NODES.PositionNode as any;

export type NormalNode = I3JS.NormalNode;
export const NormalNode: NormalNode = NODES.NormalNode as any;

export type CameraNode = I3JS.CameraNode;
export const CameraNode: CameraNode = NODES.CameraNode as any;

export type LightNode = I3JS.LightNode;
export const LightNode: LightNode = NODES.LightNode as any;

export type ReflectNode = I3JS.ReflectNode;
export const ReflectNode: ReflectNode = NODES.ReflectNode as any;

export type ScreenUVNode = I3JS.ScreenUVNode;
export const ScreenUVNode: ScreenUVNode = NODES.ScreenUVNode as any;

export type ResolutionNode = I3JS.ResolutionNode;
export const ResolutionNode: ResolutionNode = NODES.ResolutionNode as any;

// math


export type MathNode = I3JS.MathNode;
export const MathNode: MathNode = NODES.MathNode as any;

export type OperatorNode = I3JS.OperatorNode;
export const OperatorNode: OperatorNode = NODES.OperatorNode as any;

export type CondNode = I3JS.CondNode;
export const CondNode: CondNode = NODES.CondNode as any;

// procedural
// export type NoiseNode = I3JS.NoiseNode;
// export const NoiseNode: NoiseNode = NODES.NoiseNode as any;

export type CheckerNode = I3JS.CheckerNode;
export const CheckerNode: CheckerNode = NODES.CheckerNode as any;

// misc


export type TextureCubeUVNode = I3JS.TextureCubeUVNode;
export const TextureCubeUVNode: TextureCubeUVNode = NODES.TextureCubeUVNode as any;

export type TextureCubeNode = I3JS.TextureCubeNode;
export const TextureCubeNode: TextureCubeNode = NODES.TextureCubeNode as any;

export type NormalMapNode = I3JS.NormalMapNode;
export const NormalMapNode: NormalMapNode = NODES.NormalMapNode as any;

export type BumpMapNode = I3JS.BumpMapNode;
export const BumpMapNode: BumpMapNode = NODES.BumpMapNode as any;

// utils


export type BypassNode = I3JS.BypassNode;
export const BypassNode: BypassNode = NODES.BypassNode as any;

export type JoinNode = I3JS.JoinNode;
export const JoinNode: JoinNode = NODES.JoinNode as any;

export type SwitchNode = I3JS.SwitchNode;
export const SwitchNode: SwitchNode = NODES.SwitchNode as any;

export type TimerNode = I3JS.TimerNode;
export const TimerNode: TimerNode = NODES.TimerNode as any;

export type VelocityNode = I3JS.VelocityNode;
export const VelocityNode: VelocityNode = NODES.VelocityNode as any;

export type UVTransformNode = I3JS.UVTransformNode;
export const UVTransformNode: UVTransformNode = NODES.UVTransformNode as any;

export type MaxMIPLevelNode = I3JS.MaxMIPLevelNode;
export const MaxMIPLevelNode: MaxMIPLevelNode = NODES.MaxMIPLevelNode as any;

export type SpecularMIPLevelNode = I3JS.SpecularMIPLevelNode;
export const SpecularMIPLevelNode: SpecularMIPLevelNode = NODES.SpecularMIPLevelNode as any;

export type ColorSpaceNode = I3JS.ColorSpaceNode;
export const ColorSpaceNode: ColorSpaceNode = NODES.ColorSpaceNode as any;

// effects


export type BlurNode = I3JS.BlurNode;
export const BlurNode: BlurNode = NODES.BlurNode as any;

export type ColorAdjustmentNode = I3JS.ColorAdjustmentNode;
export const ColorAdjustmentNode: ColorAdjustmentNode = NODES.ColorAdjustmentNode as any;

export type LuminanceNode = I3JS.LuminanceNode;
export const LuminanceNode: LuminanceNode = NODES.LuminanceNode as any;

// material nodes


export type RawNode = I3JS.RawNode;
export const RawNode: RawNode = NODES.RawNode as any;

export type BasicNode = I3JS.BasicNode;
export const BasicNode: BasicNode = NODES.BasicNode as any;

export type SpriteNode = I3JS.SpriteNode;
export const SpriteNode: SpriteNode = NODES.SpriteNode as any;

export type PhongNode = I3JS.PhongNode;
export const PhongNode: PhongNode = NODES.PhongNode as any;

export type StandardNode = I3JS.StandardNode;
export const StandardNode: StandardNode = NODES.StandardNode as any;

export type MeshStandardNode = I3JS.MeshStandardNode;
export const MeshStandardNode: MeshStandardNode = NODES.MeshStandardNode as any;

// materials


export type NodeMaterial = I3JS.NodeMaterial;
export const NodeMaterial: NodeMaterial = NODES.NodeMaterial as any;

export type BasicNodeMaterial = I3JS.BasicNodeMaterial;
export const BasicNodeMaterial: BasicNodeMaterial = NODES.BasicNodeMaterial as any;

export type SpriteNodeMaterial = I3JS.SpriteNodeMaterial;
export const SpriteNodeMaterial: SpriteNodeMaterial = NODES.SpriteNodeMaterial as any;

export type PhongNodeMaterial = I3JS.PhongNodeMaterial;
export const PhongNodeMaterial: PhongNodeMaterial = NODES.PhongNodeMaterial as any;

export type StandardNodeMaterial = I3JS.StandardNodeMaterial;
export const StandardNodeMaterial: StandardNodeMaterial = NODES.StandardNodeMaterial as any;

export type MeshStandardNodeMaterial = I3JS.MeshStandardNodeMaterial;
export const MeshStandardNodeMaterial: MeshStandardNodeMaterial = NODES.MeshStandardNodeMaterial as any;

// postprocessing


export type NodePostProcessing = I3JS.NodePostProcessing;
export const NodePostProcessing: NodePostProcessing = NODES.NodePostProcessing as any;
// export type NodePass = I3JS.NodePass;
// export const NodePass: NodePass = NODES.NodePass as any;


export type BufferGeometry = I3JS.BufferGeometry;
export const BufferGeometry: BufferGeometry = O3JS.BufferGeometry as any;

export type Clock = I3JS.Clock;
export const Clock: Clock = O3JS.Clock as any;

export type EventDispatcher = I3JS.EventDispatcher;
export const EventDispatcher: EventDispatcher = O3JS.EventDispatcher as any;

export type GLBufferAttribute = I3JS.GLBufferAttribute;
export const GLBufferAttribute: GLBufferAttribute = O3JS.GLBufferAttribute as any;

export type InstancedBufferAttribute = I3JS.InstancedBufferAttribute;
export const InstancedBufferAttribute: InstancedBufferAttribute = O3JS.InstancedBufferAttribute as any;

export type InstancedBufferGeometry = I3JS.InstancedBufferGeometry;
export const InstancedBufferGeometry: InstancedBufferGeometry = O3JS.InstancedBufferGeometry as any;

export type InstancedInterleavedBuffer = I3JS.InstancedInterleavedBuffer;
export const InstancedInterleavedBuffer: InstancedInterleavedBuffer = O3JS.InstancedInterleavedBuffer as any;

export type InterleavedBuffer = I3JS.InterleavedBuffer;
export const InterleavedBuffer: InterleavedBuffer = O3JS.InterleavedBuffer as any;

export type InterleavedBufferAttribute = I3JS.InterleavedBufferAttribute;
export const InterleavedBufferAttribute: InterleavedBufferAttribute = O3JS.InterleavedBufferAttribute as any;

export type Layers = I3JS.Layers;
export const Layers: Layers = O3JS.Layers as any;

export type Object3D = I3JS.Object3D;
export const Object3D: Object3D = O3JS.Object3D as any;

export type Raycaster = I3JS.Raycaster;
export const Raycaster: Raycaster = O3JS.Raycaster as any;

export type Uniform = I3JS.IUniform;
export const Uniform: Uniform = O3JS.Uniform as any;

export type UniformsUtils = I3JS.UniformsUtils;
export const UniformsUtils: UniformsUtils = O3JS.UniformsUtils as any;

export type UniformsLib = I3JS.UniformsLib;
export const UniformsLib: UniformsLib = O3JS.UniformsLib as any;

export type BoxGeometry = I3JS.BoxGeometry;
export const BoxGeometry: BoxGeometry = O3JS.BoxGeometry as any;

export type BoxBufferGeometry = I3JS.BoxGeometry;
export const BoxBufferGeometry: BoxBufferGeometry = O3JS.BoxGeometry as any;

export type CircleGeometry = I3JS.CircleGeometry;
export const CircleGeometry: CircleGeometry = O3JS.CircleGeometry as any;

export type CircleBufferGeometry = I3JS.CircleGeometry;
export const CircleBufferGeometry: CircleBufferGeometry = O3JS.CircleGeometry as any;

export type ConeGeometry = I3JS.ConeGeometry;
export const ConeGeometry: ConeGeometry = O3JS.ConeGeometry as any;

export type ConeBufferGeometry = I3JS.ConeGeometry;
export const ConeBufferGeometry: ConeBufferGeometry = O3JS.ConeGeometry as any;

export type CylinderGeometry = I3JS.CylinderGeometry;
export const CylinderGeometry: CylinderGeometry = O3JS.CylinderGeometry as any;

export type CylinderBufferGeometry = I3JS.CylinderGeometry;
export const CylinderBufferGeometry: CylinderBufferGeometry = O3JS.CylinderGeometry as any;

export type DodecahedronGeometry = I3JS.DodecahedronGeometry;
export const DodecahedronGeometry: DodecahedronGeometry = O3JS.DodecahedronGeometry as any;

export type DodecahedronBufferGeometry = I3JS.DodecahedronGeometry;
export const DodecahedronBufferGeometry: DodecahedronBufferGeometry = O3JS.DodecahedronGeometry as any;

export type EdgesGeometry = I3JS.EdgesGeometry;
export const EdgesGeometry: EdgesGeometry = O3JS.EdgesGeometry as any;

export type EdgesBufferGeometry = I3JS.EdgesGeometry;
export const EdgesBufferGeometry: EdgesBufferGeometry = O3JS.EdgesGeometry as any;

export type ExtrudeGeometry = I3JS.ExtrudeGeometry;
export const ExtrudeGeometry: ExtrudeGeometry = O3JS.ExtrudeGeometry as any;

export type ExtrudeBufferGeometry = I3JS.ExtrudeGeometry;
export const ExtrudeBufferGeometry: ExtrudeBufferGeometry = O3JS.ExtrudeGeometry as any;

export type IcosahedronGeometry = I3JS.IcosahedronGeometry;
export const IcosahedronGeometry: IcosahedronGeometry = O3JS.IcosahedronGeometry as any;

export type IcosahedronBufferGeometry = I3JS.IcosahedronGeometry;
export const IcosahedronBufferGeometry: IcosahedronBufferGeometry = O3JS.IcosahedronGeometry as any;

export type LatheGeometry = I3JS.LatheGeometry;
export const LatheGeometry: LatheGeometry = O3JS.LatheGeometry as any;

export type LatheBufferGeometry = I3JS.LatheGeometry;
export const LatheBufferGeometry: LatheBufferGeometry = O3JS.LatheGeometry as any;

export type OctahedronGeometry = I3JS.OctahedronGeometry;
export const OctahedronGeometry: OctahedronGeometry = O3JS.OctahedronGeometry as any;

export type OctahedronBufferGeometry = I3JS.OctahedronGeometry;
export const OctahedronBufferGeometry: OctahedronBufferGeometry = O3JS.OctahedronGeometry as any;

export type PlaneGeometry = I3JS.PlaneGeometry;
export const PlaneGeometry: PlaneGeometry = O3JS.PlaneGeometry as any;

export type PlaneBufferGeometry = I3JS.PlaneGeometry;
export const PlaneBufferGeometry: PlaneBufferGeometry = O3JS.PlaneGeometry as any;

export type PolyhedronGeometry = I3JS.PolyhedronGeometry;
export const PolyhedronGeometry: PolyhedronGeometry = O3JS.PolyhedronGeometry as any;

export type PolyhedronBufferGeometry = I3JS.PolyhedronGeometry;
export const PolyhedronBufferGeometry: PolyhedronBufferGeometry = O3JS.PolyhedronGeometry as any;

export type RingGeometry = I3JS.RingGeometry;
export const RingGeometry: RingGeometry = O3JS.RingGeometry as any;

export type RingBufferGeometry = I3JS.RingGeometry;
export const RingBufferGeometry: RingBufferGeometry = O3JS.RingGeometry as any;

export type ShapeGeometry = I3JS.ShapeGeometry;
export const ShapeGeometry: ShapeGeometry = O3JS.ShapeGeometry as any;

export type ShapeBufferGeometry = I3JS.ShapeGeometry;
export const ShapeBufferGeometry: ShapeBufferGeometry = O3JS.ShapeGeometry as any;

export type SphereGeometry = I3JS.SphereGeometry;
export const SphereGeometry: SphereGeometry = O3JS.SphereGeometry as any;

export type SphereBufferGeometry = I3JS.SphereGeometry;
export const SphereBufferGeometry: SphereBufferGeometry = O3JS.SphereGeometry as any;

export type TetrahedronGeometry = I3JS.TetrahedronGeometry;
export const TetrahedronGeometry: TetrahedronGeometry = O3JS.TetrahedronGeometry as any;

export type TetrahedronBufferGeometry = I3JS.TetrahedronGeometry;
export const TetrahedronBufferGeometry: TetrahedronBufferGeometry = O3JS.TetrahedronGeometry as any;

export type TorusGeometry = I3JS.TorusGeometry;
export const TorusGeometry: TorusGeometry = O3JS.TorusGeometry as any;

export type TorusBufferGeometry = I3JS.TorusGeometry;
export const TorusBufferGeometry: TorusBufferGeometry = O3JS.TorusGeometry as any;

export type TorusKnotGeometry = I3JS.TorusKnotGeometry;
export const TorusKnotGeometry: TorusKnotGeometry = O3JS.TorusKnotGeometry as any;

export type TorusKnotBufferGeometry = I3JS.TorusKnotGeometry;
export const TorusKnotBufferGeometry: TorusKnotBufferGeometry = O3JS.TorusKnotGeometry as any;

export type TubeGeometry = I3JS.TubeGeometry;
export const TubeGeometry: TubeGeometry = O3JS.TubeGeometry as any;

export type TubeBufferGeometry = I3JS.TubeGeometry;
export const TubeBufferGeometry: TubeBufferGeometry = O3JS.TubeGeometry as any;

export type WireframeGeometry = I3JS.WireframeGeometry;
export const WireframeGeometry: WireframeGeometry = O3JS.WireframeGeometry as any;

export type WireframeBufferGeometry = I3JS.WireframeGeometry;
export const WireframeBufferGeometry: WireframeBufferGeometry = O3JS.WireframeGeometry as any;

export type LineSegmentsGeometry = I3JS.LineSegmentsGeometry;
export const LineSegmentsGeometry: LineSegmentsGeometry = EX_LineSegmentsGeometry as any;

export type WireframeGeometry2 = I3JS.WireframeGeometry2;
export const WireframeGeometry2: WireframeGeometry2 = EX_WireframeGeometry2 as any;

export type EdgeSplitModifier = I3JS.EdgeSplitModifier;
export const EdgeSplitModifier: EdgeSplitModifier = EX_EdgeSplitModifier as any;

export type SimplifyModifier = I3JS.SimplifyModifier;
export const SimplifyModifier: SimplifyModifier = EX_SimplifyModifier as any;


export type BoxLineGeometry = I3JS.BoxLineGeometry;
export const BoxLineGeometry: BoxLineGeometry = EX_BoxLineGeometry as any;

export type ConvexGeometry = I3JS.ConvexGeometry;
export const ConvexGeometry: ConvexGeometry = EX_ConvexGeometry as any;

export type DecalGeometry = I3JS.DecalGeometry;
export const DecalGeometry: DecalGeometry = EX_DecalGeometry as any;

export type DecalVertex = I3JS.DecalVertex;
export const DecalVertex: DecalVertex = EX_DecalVertex as any;


export type LightningStrike = I3JS.LightningStrike;
export const LightningStrike: LightningStrike = EX_LightningStrike as any;

export type ParametricGeometries = I3JS.ParametricGeometries;
export const ParametricGeometries: ParametricGeometries = EX_ParametricGeometries as any;

export type ParametricGeometry = I3JS.ParametricGeometry;
export const ParametricGeometry: ParametricGeometry = EX_ParametricGeometry as any;

export type RoundedBoxGeometry = I3JS.RoundedBoxGeometry;
export const RoundedBoxGeometry: RoundedBoxGeometry = EX_RoundedBoxGeometry as any;

export type TeapotGeometry = I3JS.TeapotGeometry;
export const TeapotGeometry: TeapotGeometry = EX_TeapotGeometry as any;

export type TextGeometry = I3JS.TextGeometry;
export const TextGeometry: TextGeometry = EX_TextGeometry as any;

export type LineGeometry = I3JS.LineGeometry;
export const LineGeometry: LineGeometry = EX_LineGeometry as any;


export type RollerCoasterGeometry = I3JS.RollerCoasterGeometry;
export const RollerCoasterGeometry: RollerCoasterGeometry = EX_RollerCoaster.RollerCoasterGeometry as any;

export type RollerCoasterLiftersGeometry = I3JS.RollerCoasterLiftersGeometry;
export const RollerCoasterLiftersGeometry: RollerCoasterLiftersGeometry =
	EX_RollerCoaster.RollerCoasterLiftersGeometry as any;

export type RollerCoasterShadowGeometry = I3JS.RollerCoasterShadowGeometry;
export const RollerCoasterShadowGeometry: RollerCoasterShadowGeometry =
	EX_RollerCoaster.RollerCoasterShadowGeometry as any;

export type RollerCoasterSkyGeometry = I3JS.RollerCoasterSkyGeometry;
export const RollerCoasterSkyGeometry: RollerCoasterSkyGeometry = EX_RollerCoaster.SkyGeometry as any;

export type RollerCoasterTreesGeometry = I3JS.RollerCoasterTreesGeometry;
export const RollerCoasterTreesGeometry: RollerCoasterTreesGeometry = EX_RollerCoaster.TreesGeometry as any;


export type CapsuleGeometry = I3JS.CapsuleGeometry;
export const CapsuleGeometry: CapsuleGeometry = NgxCapsuleGeometry as any;

export type CircleDepthGeometry = I3JS.CircleDepthGeometry;
export const CircleDepthGeometry: CircleDepthGeometry = NgxCircleDepthGeometry as any;

export type GridGeometry = I3JS.GridGeometry;
export const GridGeometry: GridGeometry = NgxGridGeometry as any;

export type PlaneDepthGeometry = I3JS.PlaneDepthGeometry;
export const PlaneDepthGeometry: PlaneDepthGeometry = NgxPlaneDepthGeometry as any;

export type PlanePerlinGeometry = I3JS.PlanePerlinGeometry;
export const PlanePerlinGeometry: PlanePerlinGeometry = NgxPlanePerlinGeometry as any;

export type RingDepthGeometry = I3JS.RingDepthGeometry;
export const RingDepthGeometry: RingDepthGeometry = NgxRingDepthGeometry as any;

export type RopeGeometry = I3JS.RopeGeometry;
export const RopeGeometry: RopeGeometry = NgxRopeGeometry as any;

export type StarGeometry = I3JS.StarGeometry;
export const StarGeometry: StarGeometry = NgxStarGeometry as any;

export type StarDepthGeometry = I3JS.StarDepthGeometry;
export const StarDepthGeometry: StarDepthGeometry = NgxStarDepthGeometry as any;

export type OutlineGeometry = I3JS.OutlineGeometry;
export const OutlineGeometry: OutlineGeometry = NgxOutlineGeometry as any;


export type GeometryCompressionUtils = I3JS.GeometryCompressionUtils;
export const GeometryCompressionUtils: GeometryCompressionUtils = {
	compressNormals: (EX_GeometryCompressionUtils as any).compressNormals,
	compressPositions: (EX_GeometryCompressionUtils as any).compressPositions,
	compressUvs: (EX_GeometryCompressionUtils as any).compressUvs,
};


export type TessellateModifier = I3JS.TessellateModifier;
export const TessellateModifier: TessellateModifier = EX_TessellateModifier as any;

export type AmbientLight = I3JS.AmbientLight;
export const AmbientLight: AmbientLight = O3JS.AmbientLight as any;

export type AmbientLightProbe = I3JS.AmbientLightProbe;
export const AmbientLightProbe: AmbientLightProbe = O3JS.AmbientLightProbe as any;

export type DirectionalLight = I3JS.DirectionalLight;
export const DirectionalLight: DirectionalLight = O3JS.DirectionalLight as any;

export type HemisphereLight = I3JS.HemisphereLight;
export const HemisphereLight: HemisphereLight = O3JS.HemisphereLight as any;

export type HemisphereLightProbe = I3JS.HemisphereLightProbe;
export const HemisphereLightProbe: HemisphereLightProbe = O3JS.HemisphereLightProbe as any;

export type Light = I3JS.Light;
export const Light: Light = O3JS.Light as any;

export type LightProbe = I3JS.LightProbe;
export const LightProbe: LightProbe = O3JS.LightProbe as any;

export type PointLight = I3JS.PointLight;
export const PointLight: PointLight = O3JS.PointLight as any;

export type RectAreaLight = I3JS.RectAreaLight;
export const RectAreaLight: RectAreaLight = O3JS.RectAreaLight as any;

export type SpotLight = I3JS.SpotLight;
export const SpotLight: SpotLight = O3JS.SpotLight as any;

export type ArrayCamera = I3JS.ArrayCamera;
export const ArrayCamera: ArrayCamera = O3JS.ArrayCamera as any;

export type Camera = I3JS.Camera;
export const Camera: Camera = O3JS.Camera as any;

export type CubeCamera = I3JS.CubeCamera;
export const CubeCamera: CubeCamera = O3JS.CubeCamera as any;

export type OrthographicCamera = I3JS.OrthographicCamera;
export const OrthographicCamera: OrthographicCamera = O3JS.OrthographicCamera as any;

export type PerspectiveCamera = I3JS.PerspectiveCamera;
export const PerspectiveCamera: PerspectiveCamera = O3JS.PerspectiveCamera as any;

export type StereoCamera = I3JS.StereoCamera;
export const StereoCamera: StereoCamera = O3JS.StereoCamera as any;

export type Audio = I3JS.Audio;
export const Audio: Audio = O3JS.Audio as any;

export type AudioAnalyser = I3JS.AudioAnalyser;
export const AudioAnalyser: AudioAnalyser = O3JS.AudioAnalyser as any;

export type AudioListener = I3JS.AudioListener;
export const AudioListener: AudioListener = O3JS.AudioListener as any;

export type PositionalAudio = I3JS.PositionalAudio;
export const PositionalAudio: PositionalAudio = O3JS.PositionalAudio as any;

export type AnimationClip = I3JS.AnimationClip;
export const AnimationClip: AnimationClip = O3JS.AnimationClip as any;

export type AnimationMixer = I3JS.AnimationMixer;
export const AnimationMixer: AnimationMixer = O3JS.AnimationMixer as any;

export type AnimationObjectGroup = I3JS.AnimationObjectGroup;
export const AnimationObjectGroup: AnimationObjectGroup = O3JS.AnimationObjectGroup as any;

export type BooleanKeyframeTrack = I3JS.BooleanKeyframeTrack;
export const BooleanKeyframeTrack: BooleanKeyframeTrack = O3JS.BooleanKeyframeTrack as any;

export type ColorKeyframeTrack = I3JS.ColorKeyframeTrack;
export const ColorKeyframeTrack: ColorKeyframeTrack = O3JS.ColorKeyframeTrack as any;

export type NumberKeyframeTrack = I3JS.NumberKeyframeTrack;
export const NumberKeyframeTrack: NumberKeyframeTrack = O3JS.NumberKeyframeTrack as any;

export type QuaternionKeyframeTrack = I3JS.QuaternionKeyframeTrack;
export const QuaternionKeyframeTrack: QuaternionKeyframeTrack = O3JS.QuaternionKeyframeTrack as any;

export type StringKeyframeTrack = I3JS.StringKeyframeTrack;
export const StringKeyframeTrack: StringKeyframeTrack = O3JS.StringKeyframeTrack as any;

export type VectorKeyframeTrack = I3JS.VectorKeyframeTrack;
export const VectorKeyframeTrack: VectorKeyframeTrack = O3JS.VectorKeyframeTrack as any;

export type ArrowHelper = I3JS.ArrowHelper;
export const ArrowHelper: ArrowHelper = O3JS.ArrowHelper as any;

export type AxesHelper = I3JS.AxesHelper;
export const AxesHelper: AxesHelper = O3JS.AxesHelper as any;

export type Box3Helper = I3JS.Box3Helper;
export const Box3Helper: Box3Helper = O3JS.Box3Helper as any;

export type BoxHelper = I3JS.BoxHelper;
export const BoxHelper: BoxHelper = O3JS.BoxHelper as any;

export type CameraHelper = I3JS.CameraHelper;
export const CameraHelper: CameraHelper = O3JS.CameraHelper as any;

export type DirectionalLightHelper = I3JS.DirectionalLightHelper;
export const DirectionalLightHelper: DirectionalLightHelper = O3JS.DirectionalLightHelper as any;

export type GridHelper = I3JS.GridHelper;
export const GridHelper: GridHelper = O3JS.GridHelper as any;

export type HemisphereLightHelper = I3JS.HemisphereLightHelper;
export const HemisphereLightHelper: HemisphereLightHelper = O3JS.HemisphereLightHelper as any;

export type PlaneHelper = I3JS.PlaneHelper;
export const PlaneHelper: PlaneHelper = O3JS.PlaneHelper as any;

export type PointLightHelper = I3JS.PointLightHelper;
export const PointLightHelper: PointLightHelper = O3JS.PointLightHelper as any;

export type PolarGridHelper = I3JS.PolarGridHelper;
export const PolarGridHelper: PolarGridHelper = O3JS.PolarGridHelper as any;

export type SkeletonHelper = I3JS.SkeletonHelper;
export const SkeletonHelper: SkeletonHelper = O3JS.SkeletonHelper as any;

export type SpotLightHelper = I3JS.SpotLightHelper;
export const SpotLightHelper: SpotLightHelper = O3JS.SpotLightHelper as any;

export type LineBasicMaterial = I3JS.LineBasicMaterial;
export const LineBasicMaterial: LineBasicMaterial = O3JS.LineBasicMaterial as any;

export type LineDashedMaterial = I3JS.LineDashedMaterial;
export const LineDashedMaterial: LineDashedMaterial = O3JS.LineDashedMaterial as any;

export type Material = I3JS.Material;
export const Material: Material = O3JS.Material as any;

export type MeshBasicMaterial = I3JS.MeshBasicMaterial;
export const MeshBasicMaterial: MeshBasicMaterial = O3JS.MeshBasicMaterial as any;

export type MeshDepthMaterial = I3JS.MeshDepthMaterial;
export const MeshDepthMaterial: MeshDepthMaterial = O3JS.MeshDepthMaterial as any;

export type MeshDistanceMaterial = I3JS.MeshDistanceMaterial;
export const MeshDistanceMaterial: MeshDistanceMaterial = O3JS.MeshDistanceMaterial as any;

export type MeshLambertMaterial = I3JS.MeshLambertMaterial;
export const MeshLambertMaterial: MeshLambertMaterial = O3JS.MeshLambertMaterial as any;

export type MeshMatcapMaterial = I3JS.MeshMatcapMaterial;
export const MeshMatcapMaterial: MeshMatcapMaterial = O3JS.MeshMatcapMaterial as any;

export type MeshNormalMaterial = I3JS.MeshNormalMaterial;
export const MeshNormalMaterial: MeshNormalMaterial = O3JS.MeshNormalMaterial as any;

export type MeshPhongMaterial = I3JS.MeshPhongMaterial;
export const MeshPhongMaterial: MeshPhongMaterial = O3JS.MeshPhongMaterial as any;

export type MeshPhysicalMaterial = I3JS.MeshPhysicalMaterial;
export const MeshPhysicalMaterial: MeshPhysicalMaterial = O3JS.MeshPhysicalMaterial as any;

export type MeshStandardMaterial = I3JS.MeshStandardMaterial;
export const MeshStandardMaterial: MeshStandardMaterial = O3JS.MeshStandardMaterial as any;

export type MeshToonMaterial = I3JS.MeshToonMaterial;
export const MeshToonMaterial: MeshToonMaterial = O3JS.MeshToonMaterial as any;

export type PointsMaterial = I3JS.PointsMaterial;
export const PointsMaterial: PointsMaterial = O3JS.PointsMaterial as any;

export type RawShaderMaterial = I3JS.RawShaderMaterial;
export const RawShaderMaterial: RawShaderMaterial = O3JS.RawShaderMaterial as any;

export type ShaderMaterial = I3JS.ShaderMaterial;
export const ShaderMaterial: ShaderMaterial = O3JS.ShaderMaterial as any;

export type ShadowMaterial = I3JS.ShadowMaterial;
export const ShadowMaterial: ShadowMaterial = O3JS.ShadowMaterial as any;

export type SpriteMaterial = I3JS.SpriteMaterial;
export const SpriteMaterial: SpriteMaterial = O3JS.SpriteMaterial as any;


export type LineMaterial = I3JS.LineMaterial;
export const LineMaterial: LineMaterial = EX_LineMaterial as any;


export type NgxShaderIdMaterial = I3JS.NgxShaderMaterial;
export const NgxShaderIdMaterial: NgxShaderIdMaterial = THREE_MAT.NgxShaderMaterial as any;

export type NgxRawShaderIdMaterial = I3JS.NgxRawShaderMaterial;
export const NgxRawShaderIdMaterial: NgxRawShaderIdMaterial = THREE_MAT.NgxRawShaderMaterial as any;

export type ShaderAudioVisualizerMaterial = I3JS.ShaderMaterial;
export const ShaderAudioVisualizerMaterial: ShaderAudioVisualizerMaterial = THREE_MAT.NgxShaderAudioVisualizerMaterial as any;

export type ShaderAttributesParticlesMaterial = I3JS.ShaderMaterial;
export const ShaderAttributesParticlesMaterial: ShaderAttributesParticlesMaterial =
	THREE_MAT.NgxShaderAttributesParticlesMaterial as any;

export type ShaderSelectiveDrawMaterial = I3JS.ShaderMaterial;
export const ShaderSelectiveDrawMaterial: ShaderSelectiveDrawMaterial = THREE_MAT.NgxShaderSelectiveDrawMaterial as any;

export type ShaderCustomAttributesMaterial = I3JS.ShaderMaterial;
export const ShaderCustomAttributesMaterial: ShaderCustomAttributesMaterial = THREE_MAT.NgxShaderCustomAttributesMaterial as any;

export type ShaderCustomAttributesLinesMaterial = I3JS.ShaderMaterial;
export const ShaderCustomAttributesLinesMaterial: ShaderCustomAttributesLinesMaterial =
	THREE_MAT.NgxShaderCustomAttributesLinesMaterial as any;

export type ShaderCustomAttributesPointsMaterial = I3JS.ShaderMaterial;
export const ShaderCustomAttributesPointsMaterial: ShaderCustomAttributesPointsMaterial =
	THREE_MAT.NgxShaderCustomAttributesPointsMaterial as any;

export type ShaderAttributeSizeColorMaterial = I3JS.ShaderMaterial;
export const ShaderAttributeSizeColorMaterial: ShaderAttributeSizeColorMaterial =
	THREE_MAT.NgxShaderAttributeSizeColorMaterial as any;

export type ShaderAttributeSizeColor1Material = I3JS.ShaderMaterial;
export const ShaderAttributeSizeColor1Material: ShaderAttributeSizeColor1Material =
	THREE_MAT.NgxShaderAttributeSizeColor1Material as any;

export type ShaderSkyDomeMaterial = I3JS.ShaderMaterial;
export const ShaderSkyDomeMaterial: ShaderSkyDomeMaterial = THREE_MAT.NgxShaderSkyDomeMaterial as any;

export type ShaderParallaxMaterial = I3JS.ShaderMaterial;
export const ShaderParallaxMaterial: ShaderParallaxMaterial = THREE_MAT.NgxShaderParallaxMaterial as any;

export type ShaderFresnelMaterial = I3JS.ShaderMaterial;
export const ShaderFresnelMaterial: ShaderFresnelMaterial = THREE_MAT.NgxShaderFresnelMaterial as any;

export type ShaderSubsurfaceScatteringMaterial = I3JS.ShaderMaterial;
export const ShaderSubsurfaceScatteringMaterial: ShaderSubsurfaceScatteringMaterial =
	THREE_MAT.NgxShaderSubsurfaceScatteringMaterial as any;

export type ShaderWireframeMaterial = I3JS.ShaderMaterial;
export const ShaderWireframeMaterial: ShaderWireframeMaterial = THREE_MAT.NgxShaderWireframeMaterial as any;

export type ShaderNoiseRandom1DMaterial = I3JS.ShaderMaterial;
export const ShaderNoiseRandom1DMaterial: ShaderNoiseRandom1DMaterial = THREE_MAT.NgxShaderNoiseRandom1DMaterial as any;

export type ShaderNoiseRandom2DMaterial = I3JS.ShaderMaterial;
export const ShaderNoiseRandom2DMaterial: ShaderNoiseRandom2DMaterial = THREE_MAT.NgxShaderNoiseRandom2DMaterial as any;

export type ShaderNoiseRandom3DMaterial = I3JS.ShaderMaterial;
export const ShaderNoiseRandom3DMaterial: ShaderNoiseRandom3DMaterial = THREE_MAT.NgxShaderNoiseRandom3DMaterial as any;

export type ShaderColorRainbowMaterial = I3JS.ShaderMaterial;
export const ShaderColorRainbowMaterial: ShaderColorRainbowMaterial = THREE_MAT.NgxShaderColorRainbowMaterial as any;

export type ShaderVideoKinectMaterial = I3JS.ShaderMaterial;
export const ShaderVideoKinectMaterial: ShaderVideoKinectMaterial = THREE_MAT.NgxShaderVideoKinectMaterial as any;

export type ShaderVolumeRenderShader1Material = I3JS.ShaderMaterial;
export const ShaderVolumeRenderShader1Material: ShaderVolumeRenderShader1Material =
	THREE_MAT.NgxShaderVolumeRenderShader1Material as any;

export type ShaderInstancingMaterial = I3JS.ShaderMaterial;
export const ShaderInstancingMaterial: ShaderInstancingMaterial = THREE_MAT.NgxShaderInstancingMaterial as any;

export type ShaderScaleColorMaterial = I3JS.ShaderMaterial;
export const ShaderScaleColorMaterial: ShaderScaleColorMaterial = THREE_MAT.NgxShaderScaleColorMaterial as any;

export type ShaderSinColorMaterial = I3JS.ShaderMaterial;
export const ShaderSinColorMaterial: ShaderSinColorMaterial = THREE_MAT.NgxShaderSinColorMaterial as any;

export type ShaderRaymarchingReflectMaterial = I3JS.ShaderMaterial;
export const ShaderRaymarchingReflectMaterial: ShaderRaymarchingReflectMaterial =
	THREE_MAT.NgxShaderRaymarchingReflectMaterial as any;

export type ShaderCloudMaterial = I3JS.ShaderMaterial;
export const ShaderCloudMaterial: ShaderCloudMaterial = THREE_MAT.NgxShaderCloudMaterial as any;

export type ShaderPerlinMaterial = I3JS.ShaderMaterial;
export const ShaderPerlinMaterial: ShaderPerlinMaterial = THREE_MAT.NgxShaderPerlinMaterial as any;


export type AfterimageShader = I3JS.Shader;
export const AfterimageShader: AfterimageShader = EX_AfterimageShader as any;

export type BasicShader = I3JS.Shader;
export const BasicShader: BasicShader = EX_BasicShader as any;

export type BleachBypassShader = I3JS.Shader;
export const BleachBypassShader: BleachBypassShader = EX_BleachBypassShader as any;

export type BlendShader = I3JS.Shader;
export const BlendShader: BlendShader = EX_BlendShader as any;

export type BokehShader = I3JS.Shader;
export const BokehShader: BokehShader = EX_BokehShader as any;

export type BokehShader2 = I3JS.Shader;
export const BokehShader2: BokehShader2 = EX_BokehShader2 as any;

export type BokehDepthShader = I3JS.Shader;
export const BokehDepthShader: BokehDepthShader = EX_BokehDepthShader as any;

export type BrightnessContrastShader = I3JS.Shader;
export const BrightnessContrastShader: BrightnessContrastShader = EX_BrightnessContrastShader as any;

export type ColorCorrectionShader = I3JS.Shader;
export const ColorCorrectionShader: ColorCorrectionShader = EX_ColorCorrectionShader as any;

export type ColorifyShader = I3JS.Shader;
export const ColorifyShader: ColorifyShader = EX_ColorifyShader as any;

export type ConvolutionShader = I3JS.Shader;
export const ConvolutionShader: ConvolutionShader = EX_ConvolutionShader as any;

export type CopyShader = I3JS.Shader;
export const CopyShader: CopyShader = EX_CopyShader as any;

export type DepthLimitedBlurShader = I3JS.Shader;
export const DepthLimitedBlurShader: DepthLimitedBlurShader = EX_DepthLimitedBlurShader as any;

export type DigitalGlitch = I3JS.Shader;
export const DigitalGlitch: DigitalGlitch = EX_DigitalGlitch as any;

export type DOFMipMapShader = I3JS.Shader;
export const DOFMipMapShader: DOFMipMapShader = EX_DOFMipMapShader as any;

export type DotScreenShader = I3JS.Shader;
export const DotScreenShader: DotScreenShader = EX_DotScreenShader as any;

export type FilmShader = I3JS.Shader;
export const FilmShader: FilmShader = EX_FilmShader as any;

export type FocusShader = I3JS.Shader;
export const FocusShader: FocusShader = EX_FocusShader as any;

export type FreiChenShader = I3JS.Shader;
export const FreiChenShader: FreiChenShader = EX_FreiChenShader as any;

export type FXAAShader = I3JS.Shader;
export const FXAAShader: FXAAShader = EX_FXAAShader as any;

export type GammaCorrectionShader = I3JS.Shader;
export const GammaCorrectionShader: GammaCorrectionShader = EX_GammaCorrectionShader as any;

export type GodRaysDepthMaskShader = I3JS.Shader;
export const GodRaysDepthMaskShader: GodRaysDepthMaskShader = EX_GodRaysDepthMaskShader as any;

export type GodRaysGenerateShader = I3JS.Shader;
export const GodRaysGenerateShader: GodRaysGenerateShader = EX_GodRaysGenerateShader as any;

export type GodRaysCombineShader = I3JS.Shader;
export const GodRaysCombineShader: GodRaysCombineShader = EX_GodRaysCombineShader as any;

export type GodRaysFakeSunShader = I3JS.Shader;
export const GodRaysFakeSunShader: GodRaysFakeSunShader = EX_GodRaysFakeSunShader as any;


export type HalftoneShader = I3JS.Shader;
export const HalftoneShader: HalftoneShader = EX_HalftoneShader as any;

export type HorizontalBlurShader = I3JS.Shader;
export const HorizontalBlurShader: HorizontalBlurShader = EX_HorizontalBlurShader as any;

export type HorizontalTiltShiftShader = I3JS.Shader;
export const HorizontalTiltShiftShader: HorizontalTiltShiftShader = EX_HorizontalTiltShiftShader as any;

export type HueSaturationShader = I3JS.Shader;
export const HueSaturationShader: HueSaturationShader = EX_HueSaturationShader as any;

export type KaleidoShader = I3JS.Shader;
export const KaleidoShader: KaleidoShader = EX_KaleidoShader as any;

export type LuminosityHighPassShader = I3JS.Shader;
export const LuminosityHighPassShader: LuminosityHighPassShader = EX_LuminosityHighPassShader as any;

export type LuminosityShader = I3JS.Shader;
export const LuminosityShader: LuminosityShader = EX_LuminosityShader as any;

export type MirrorShader = I3JS.Shader;
export const MirrorShader: MirrorShader = EX_MirrorShader as any;

export type NormalMapShader = I3JS.Shader;
export const NormalMapShader: NormalMapShader = EX_NormalMapShader as any;

export type PixelShader = I3JS.Shader;
export const PixelShader: PixelShader = EX_PixelShader as any;

export type RGBShiftShader = I3JS.Shader;
export const RGBShiftShader: RGBShiftShader = EX_RGBShiftShader as any;

export type SAOShader = I3JS.Shader;
export const SAOShader: SAOShader = EX_SAOShader as any;

export type SepiaShader = I3JS.Shader;
export const SepiaShader: SepiaShader = EX_SepiaShader as any;

export type SMAAEdgesShader = I3JS.Shader;
export const SMAAEdgesShader: SMAAEdgesShader = EX_SMAAEdgesShader as any;

export type SMAAWeightsShader = I3JS.Shader;
export const SMAAWeightsShader: SMAAWeightsShader = EX_SMAAWeightsShader as any;

export type SMAABlendShader = I3JS.Shader;
export const SMAABlendShader: SMAABlendShader = EX_SMAABlendShader as any;

export type SobelOperatorShader = I3JS.Shader;
export const SobelOperatorShader: SobelOperatorShader = EX_SobelOperatorShader as any;

export type SSAOShader = I3JS.Shader;
export const SSAOShader: SSAOShader = (EX_SSAOShader as any).SSAOShader;

export type SSAODepthShader = I3JS.Shader;
export const SSAODepthShader: SSAODepthShader = (EX_SSAOShader as any).SSAODepthShader;

export type SSAOBlurShader = I3JS.Shader;
export const SSAOBlurShader: SSAOBlurShader = (EX_SSAOShader as any).SSAOBlurShader;


export type SSRrShader = I3JS.Shader;
export const SSRrShader: SSRrShader = (EX_SSRrShader as any).SSRrShader;

export type SSRrDepthShader = I3JS.Shader;
export const SSRrDepthShader: SSRrDepthShader = (EX_SSRrShader as any).SSRrDepthShader;


export type SSRShader = I3JS.Shader;
export const SSRShader: SSRShader = (EX_SSRShader as any).SSRShader;

export type SSRDepthShader = I3JS.Shader;
export const SSRDepthShader: SSRDepthShader = (EX_SSRShader as any).SSRDepthShader;

export type SSRBlurShader = I3JS.Shader;
export const SSRBlurShader: SSRBlurShader = (EX_SSRShader as any).SSRBlurShader;


export type SubsurfaceScatteringShader = I3JS.Shader;
export const SubsurfaceScatteringShader: SubsurfaceScatteringShader = EX_SubsurfaceScatteringShader as any;

export type TechnicolorShader = I3JS.Shader;
export const TechnicolorShader: TechnicolorShader = EX_TechnicolorShader as any;

export type ToneMapShader = I3JS.Shader;
export const ToneMapShader: ToneMapShader = EX_ToneMapShader as any;

export type ToonShader1 = I3JS.Shader;
export const ToonShader1: ToonShader1 = (EX_ToonShader as any).ToonShader1;

export type ToonShader2 = I3JS.Shader;
export const ToonShader2: ToonShader2 = (EX_ToonShader as any).ToonShader2;

export type ToonShaderHatching = I3JS.Shader;
export const ToonShaderHatching: ToonShaderHatching = (EX_ToonShader as any).ToonShaderHatching;

export type ToonShaderDotted = I3JS.Shader;
export const ToonShaderDotted: ToonShaderDotted = (EX_ToonShader as any).ToonShaderDotted;

export type TriangleBlurShader = I3JS.Shader;
export const TriangleBlurShader: TriangleBlurShader = EX_TriangleBlurShader as any;

export type UnpackDepthRGBAShader = I3JS.Shader;
export const UnpackDepthRGBAShader: UnpackDepthRGBAShader = EX_UnpackDepthRGBAShader as any;

export type VerticalBlurShader = I3JS.Shader;
export const VerticalBlurShader: VerticalBlurShader = EX_VerticalBlurShader as any;

export type VerticalTiltShiftShader = I3JS.Shader;
export const VerticalTiltShiftShader: VerticalTiltShiftShader = EX_VerticalTiltShiftShader as any;

export type VignetteShader = I3JS.Shader;
export const VignetteShader: VignetteShader = EX_VignetteShader as any;

export type VolumeRenderShader1 = I3JS.Shader;
export const VolumeRenderShader1: VolumeRenderShader1 = EX_VolumeRenderShader1 as any;

export type WaterRefractionShader = I3JS.Shader;
export const WaterRefractionShader: WaterRefractionShader = EX_WaterRefractionShader as any;


export type Bone = I3JS.Bone;
export const Bone: Bone = O3JS.Bone as any;

export type Group = I3JS.Group;
export const Group: Group = O3JS.Group as any;

export type InstancedMesh = I3JS.InstancedMesh;
export const InstancedMesh: InstancedMesh = O3JS.InstancedMesh as any;

export type Line = I3JS.Line;
export const Line: Line = O3JS.Line as any;

export type LineLoop = I3JS.LineLoop;
export const LineLoop: LineLoop = O3JS.LineLoop as any;

export type LineSegments = I3JS.LineSegments;
export const LineSegments: LineSegments = O3JS.LineSegments as any;

export type LOD = I3JS.LOD;
export const LOD: LOD = O3JS.LOD as any;

export type Mesh = I3JS.Mesh;
export const Mesh: Mesh = O3JS.Mesh as any;

export type Points = I3JS.Points;
export const Points: Points = O3JS.Points as any;

export type Skeleton = I3JS.Skeleton;
export const Skeleton: Skeleton = O3JS.Skeleton as any;

export type SkinnedMesh = I3JS.SkinnedMesh;
export const SkinnedMesh: SkinnedMesh = O3JS.SkinnedMesh as any;

export type Sprite = I3JS.Sprite;
export const Sprite: Sprite = O3JS.Sprite as any;


export type PMREMGenerator = I3JS.PMREMGenerator;
export const PMREMGenerator: PMREMGenerator = O3JS.PMREMGenerator as any;

export type WebGL1Renderer = I3JS.WebGL1Renderer;
export const WebGL1Renderer: WebGL1Renderer = O3JS.WebGL1Renderer as any;

export type WebGLCubeRenderTarget = I3JS.WebGLCubeRenderTarget;
export const WebGLCubeRenderTarget: WebGLCubeRenderTarget = O3JS.WebGLCubeRenderTarget as any;

export type WebGLMultipleRenderTargets = I3JS.WebGLMultipleRenderTargets;
export const WebGLMultipleRenderTargets: WebGLMultipleRenderTargets = O3JS.WebGLMultipleRenderTargets as any;

export type WebGLMultisampleRenderTarget = I3JS.WebGLMultisampleRenderTarget;
export const WebGLMultisampleRenderTarget: WebGLMultisampleRenderTarget = O3JS.WebGLMultisampleRenderTarget as any;

export type WebGLRenderer = I3JS.WebGLRenderer;
export const WebGLRenderer: WebGLRenderer = O3JS.WebGLRenderer as any;

export type WebGLRenderTarget = I3JS.WebGLRenderTarget;
export const WebGLRenderTarget: WebGLRenderTarget = O3JS.WebGLRenderTarget as any;

export type Fog = I3JS.Fog;
export const Fog: Fog = O3JS.Fog as any;

export type FogExp2 = I3JS.FogExp2;
export const FogExp2: FogExp2 = O3JS.FogExp2 as any;

export type Scene = I3JS.Scene;
export const Scene: Scene = O3JS.Scene as any;

export type CanvasTexture = I3JS.CanvasTexture;
export const CanvasTexture: CanvasTexture = O3JS.CanvasTexture as any;

export type CompressedTexture = I3JS.CompressedTexture;
export const CompressedTexture: CompressedTexture = O3JS.CompressedTexture as any;

export type CubeTexture = I3JS.CubeTexture;
export const CubeTexture: CubeTexture = O3JS.CubeTexture as any;

export type DataTexture = I3JS.DataTexture;
export const DataTexture: DataTexture = O3JS.DataTexture as any;

export type DataTexture2DArray = I3JS.DataTexture2DArray;
export const DataTexture2DArray: DataTexture2DArray = O3JS.DataTexture2DArray as any;

export type DataTexture3D = I3JS.DataTexture3D;
export const DataTexture3D: DataTexture3D = O3JS.DataTexture3D as any;

export type DepthTexture = I3JS.DepthTexture;
export const DepthTexture: DepthTexture = O3JS.DepthTexture as any;

export type Texture = I3JS.Texture;
export const Texture: Texture = O3JS.Texture as any;

export type VideoTexture = I3JS.VideoTexture;
export const VideoTexture: VideoTexture = O3JS.VideoTexture as any;

export type Loader = I3JS.Loader;
export const Loader: Loader = O3JS.Loader as any;

export type LoadingManager = I3JS.LoadingManager;
export const LoadingManager: LoadingManager = O3JS.LoadingManager as any;

export type AnimationLoader = I3JS.AnimationLoader;
export const AnimationLoader: AnimationLoader = O3JS.AnimationLoader as any;

export type AudioLoader = I3JS.AudioLoader;
export const AudioLoader: AudioLoader = O3JS.AudioLoader as any;

export type MaterialLoader = I3JS.MaterialLoader;
export const MaterialLoader: MaterialLoader = O3JS.MaterialLoader as any;

export type ObjectLoader = I3JS.ObjectLoader;
export const ObjectLoader: ObjectLoader = O3JS.ObjectLoader as any;

export type TextureLoader = I3JS.TextureLoader;
export const TextureLoader: TextureLoader = O3JS.TextureLoader as any;

export type BufferGeometryLoader = I3JS.BufferGeometryLoader;
export const BufferGeometryLoader: BufferGeometryLoader = O3JS.BufferGeometryLoader as any;

export type CompressedTextureLoader = I3JS.CompressedTextureLoader;
export const CompressedTextureLoader: CompressedTextureLoader = O3JS.CompressedTextureLoader as any;

export type CubeTextureLoader = I3JS.CubeTextureLoader;
export const CubeTextureLoader: CubeTextureLoader = O3JS.CubeTextureLoader as any;

export type DataTextureLoader = I3JS.DataTextureLoader;
export const DataTextureLoader: DataTextureLoader = O3JS.DataTextureLoader as any;

export type FileLoader = I3JS.FileLoader;
export const FileLoader: FileLoader = O3JS.FileLoader as any;

export type ImageBitmapLoader = I3JS.ImageBitmapLoader;
export const ImageBitmapLoader: ImageBitmapLoader = O3JS.ImageBitmapLoader as any;

export type ImageLoader = I3JS.ImageLoader;
export const ImageLoader: ImageLoader = O3JS.ImageLoader as any;


export type ColladaExporter = I3JS.ColladaExporter;
export const ColladaExporter: ColladaExporter = EX_ColladaExporter as any;

export type DRACOExporter = I3JS.DRACOExporter;
export const DRACOExporter: DRACOExporter = EX_DRACOExporter as any;

export type GLTFExporter = I3JS.GLTFExporter;
export const GLTFExporter: GLTFExporter = EX_GLTFExporter as any;

export type MMDExporter = I3JS.MMDExporter;
export const MMDExporter: MMDExporter = EX_MMDExporter as any;

export type OBJExporter = I3JS.OBJExporter;
export const OBJExporter: OBJExporter = EX_OBJExporter as any;

export type PLYExporter = I3JS.PLYExporter;
export const PLYExporter: PLYExporter = EX_PLYExporter as any;

export type STLExporter = I3JS.STLExporter;
export const STLExporter: STLExporter = EX_STLExporter as any;

export type USDZExporter = I3JS.USDZExporter;
export const USDZExporter: USDZExporter = EX_USDZExporter as any;

export type Rhino3dmLoader = I3JS.Rhino3dmLoader;
export const Rhino3dmLoader: Rhino3dmLoader = EX_Rhino3dmLoader as any;

export type ThreeMFLoader = I3JS.ThreeMFLoader;
export const ThreeMFLoader: ThreeMFLoader = EX_ThreeMFLoader as any;

export type AMFLoader = I3JS.AMFLoader;
export const AMFLoader: AMFLoader = EX_AMFLoader as any;

export type BasisTextureLoader = I3JS.BasisTextureLoader;
export const BasisTextureLoader: BasisTextureLoader = EX_BasisTextureLoader as any;

export type BVHLoader = I3JS.BVHLoader;
export const BVHLoader: BVHLoader = EX_BVHLoader as any;

export type ColladaLoader = I3JS.ColladaLoader;
export const ColladaLoader: ColladaLoader = EX_ColladaLoader as any;

export type DDSLoader = I3JS.DDSLoader;
export const DDSLoader: DDSLoader = EX_DDSLoader as any;

export type DRACOLoader = I3JS.DRACOLoader;
export const DRACOLoader: DRACOLoader = EX_DRACOLoader as any;

export type EXRLoader = I3JS.EXRLoader;
export const EXRLoader: EXRLoader = EX_EXRLoader as any;

export type FBXLoader = I3JS.FBXLoader;
export const FBXLoader: FBXLoader = EX_FBXLoader as any;

export type Font = I3JS.Font;
export const Font: Font = EX_Font as any;

export type FontLoader = I3JS.FontLoader;
export const FontLoader: FontLoader = EX_FontLoader as any;

export type GCodeLoader = I3JS.GCodeLoader;
export const GCodeLoader: GCodeLoader = EX_GCodeLoader as any;

export type GLTFLoader = I3JS.GLTFLoader;
export const GLTFLoader: GLTFLoader = EX_GLTFLoader as any;

export type HDRCubeTextureLoader = I3JS.HDRCubeTextureLoader;
export const HDRCubeTextureLoader: HDRCubeTextureLoader = EX_HDRCubeTextureLoader as any;

export type IFCLoader = I3JS.IFCLoader;
export const IFCLoader: IFCLoader = EX_IFCLoader as any;

export type KMZLoader = I3JS.KMZLoader;
export const KMZLoader: KMZLoader = EX_KMZLoader as any;

export type KTX2Loader = I3JS.KTX2Loader;
export const KTX2Loader: KTX2Loader = EX_KTX2Loader as any;

export type KTXLoader = I3JS.KTXLoader;
export const KTXLoader: KTXLoader = EX_KTXLoader as any;

export type LDrawLoader = I3JS.LDrawLoader;
export const LDrawLoader: LDrawLoader = EX_LDrawLoader as any;

export type LottieLoader = I3JS.LottieLoader;
export const LottieLoader: LottieLoader = EX_LottieLoader as any;

export type LUT3dlLoader = I3JS.LUT3dlLoader;
export const LUT3dlLoader: LUT3dlLoader = EX_LUT3dlLoader as any;

export type LUTCubeLoader = I3JS.LUTCubeLoader;
export const LUTCubeLoader: LUTCubeLoader = EX_LUTCubeLoader as any;

export type LWOLoader = I3JS.LWOLoader;
export const LWOLoader: LWOLoader = EX_LWOLoader as any;

export type MD2Loader = I3JS.MD2Loader;
export const MD2Loader: MD2Loader = EX_MD2Loader as any;

export type MDDLoader = I3JS.MDDLoader;
export const MDDLoader: MDDLoader = EX_MDDLoader as any;

export type MMDLoader = I3JS.MMDLoader;
export const MMDLoader: MMDLoader = EX_MMDLoader as any;

export type MTLLoader = I3JS.MTLLoader;
export const MTLLoader: MTLLoader = EX_MTLLoader as any;

export type NRRDLoader = I3JS.NRRDLoader;
export const NRRDLoader: NRRDLoader = EX_NRRDLoader as any;

export type OBJLoader = I3JS.OBJLoader;
export const OBJLoader: OBJLoader = EX_OBJLoader as any;

export type PCDLoader = I3JS.PCDLoader;
export const PCDLoader: PCDLoader = EX_PCDLoader as any;

export type PDBLoader = I3JS.PDBLoader;
export const PDBLoader: PDBLoader = EX_PDBLoader as any;

export type PLYLoader = I3JS.PLYLoader;
export const PLYLoader: PLYLoader = EX_PLYLoader as any;

export type PRWMLoader = I3JS.PRWMLoader;
export const PRWMLoader: PRWMLoader = EX_PRWMLoader as any;

export type PVRLoader = I3JS.PVRLoader;
export const PVRLoader: PVRLoader = EX_PVRLoader as any;

export type RGBELoader = I3JS.RGBELoader;
export const RGBELoader: RGBELoader = EX_RGBELoader as any;

export type RGBMLoader = I3JS.RGBMLoader;
export const RGBMLoader: RGBMLoader = EX_RGBMLoader as any;

export type STLLoader = I3JS.STLLoader;
export const STLLoader: STLLoader = EX_STLLoader as any;

export type SVGLoader = I3JS.SVGLoader;
export const SVGLoader: SVGLoader = EX_SVGLoader as any;

export type TDSLoader = I3JS.TDSLoader;
export const TDSLoader: TDSLoader = EX_TDSLoader as any;

export type TGALoader = I3JS.TGALoader;
export const TGALoader: TGALoader = EX_TGALoader as any;

export type TTFLoader = I3JS.TTFLoader;
export const TTFLoader: TTFLoader = EX_TTFLoader as any;

export type VOXLoader = I3JS.VOXLoader;
export const VOXLoader: VOXLoader = EX_VOXLoader as any;

export type VOXMesh = I3JS.VOXMesh;
export const VOXMesh: VOXMesh = EX_VOXMesh as any;

export type VOXDataTexture3D = I3JS.VOXDataTexture3D;
export const VOXDataTexture3D: VOXDataTexture3D = EX_VOXDataTexture3D as any;

export type VRMLLoader = I3JS.VRMLLoader;
export const VRMLLoader: VRMLLoader = EX_VRMLLoader as any;

export type VRMLoader = I3JS.VRMLoader;
export const VRMLoader: VRMLoader = EX_VRMLoader as any;

export type VTKLoader = I3JS.VTKLoader;
export const VTKLoader: VTKLoader = EX_VTKLoader as any;

export type XYZLoader = I3JS.XYZLoader;
export const XYZLoader: XYZLoader = EX_XYZLoader as any;

export type MD2Character = I3JS.MD2Character;
export const MD2Character: MD2Character = EX_MD2Character as any;

export type MMDAnimationHelper = I3JS.MMDAnimationHelper;
export const MMDAnimationHelper: MMDAnimationHelper = EX_MMDAnimationHelper as any;


export type MD2CharacterComplex = I3JS.MD2CharacterComplex;
export const MD2CharacterComplex: MD2CharacterComplex = EX_MD2CharacterComplex as any;

export type Volume = I3JS.Volume;
export const Volume: Volume = EX_Volume as any;

export type CSS2DObject = I3JS.CSS2DObject;
export const CSS2DObject: CSS2DObject = EX_CSS2DObject as any;

export type CSS3DObject = I3JS.CSS3DObject;
export const CSS3DObject: CSS3DObject = EX_CSS3DObject as any;

export type CSS3DSprite = I3JS.CSS3DSprite;
export const CSS3DSprite: CSS3DSprite = EX_CSS3DSprite as any;


export type InteractiveGroup = I3JS.InteractiveGroup;
export const InteractiveGroup: InteractiveGroup = EX_InteractiveGroup as any;

export type Line2 = I3JS.Line2;
export const Line2: Line2 = EX_Line2 as any;

export type Wireframe = I3JS.Wireframe;
export const Wireframe: Wireframe = EX_Wireframe as any;

export type TubePainter = I3JS.TubePainter;
export const TubePainter: TubePainter = EX_TubePainter as any;

export type Flow = I3JS.Flow;
export const Flow: Flow = EX_Flow as any;

export type InstancedFlow = I3JS.InstancedFlow;
export const InstancedFlow: InstancedFlow = EX_InstancedFlow as any;

export type LightningStorm = I3JS.LightningStorm;
export const LightningStorm: LightningStorm = EX_LightningStorm as any;

export type MarchingCubes = I3JS.MarchingCubes;
export const MarchingCubes: MarchingCubes = EX_MarchingCubes as any;

export type Reflector = I3JS.Reflector;
export const Reflector: Reflector = EX_Reflector as any;

export type Refractor = I3JS.Refractor;
export const Refractor: Refractor = EX_Refractor as any;

export type Sky = I3JS.Sky;
export const Sky: Sky = EX_Sky as any;

export type Water = I3JS.Water;
export const Water: Water = EX_Water as any;

export type Water2 = I3JS.Water2;
export const Water2: Water2 = EX_Water2 as any;

export type SVGObject = I3JS.SVGObject;
export const SVGObject: SVGObject = EX_SVGObject as any;

export const MeshoptDecoder: any = EX_MeshoptDecoder as any;

export type TiltLoader = I3JS.TiltLoader;
export const TiltLoader: TiltLoader = EX_TiltLoader as any;


export type ArcCurve = I3JS.ArcCurve;
export const ArcCurve: ArcCurve = O3JS.ArcCurve as any;

export type CatmullRomCurve3 = I3JS.CatmullRomCurve3;
export const CatmullRomCurve3: CatmullRomCurve3 = O3JS.CatmullRomCurve3 as any;

export type CubicBezierCurve = I3JS.CubicBezierCurve;
export const CubicBezierCurve: CubicBezierCurve = O3JS.CubicBezierCurve as any;

export type CubicBezierCurve3 = I3JS.CubicBezierCurve3;
export const CubicBezierCurve3: CubicBezierCurve3 = O3JS.CubicBezierCurve3 as any;

export type EllipseCurve = I3JS.EllipseCurve;
export const EllipseCurve: EllipseCurve = O3JS.EllipseCurve as any;

export type LineCurve = I3JS.LineCurve;
export const LineCurve: LineCurve = O3JS.LineCurve as any;

export type LineCurve3 = I3JS.LineCurve3;
export const LineCurve3: LineCurve3 = O3JS.LineCurve3 as any;

export type QuadraticBezierCurve = I3JS.QuadraticBezierCurve;
export const QuadraticBezierCurve: QuadraticBezierCurve = O3JS.QuadraticBezierCurve as any;

export type QuadraticBezierCurve3 = I3JS.QuadraticBezierCurve3;
export const QuadraticBezierCurve3: QuadraticBezierCurve3 = O3JS.QuadraticBezierCurve3 as any;

export type SplineCurve = I3JS.SplineCurve;
export const SplineCurve: SplineCurve = O3JS.SplineCurve as any;

export type Shape = I3JS.Shape;
export const Shape: Shape = O3JS.Shape as any;

export type ShapePath = I3JS.ShapePath;
export const ShapePath: ShapePath = O3JS.ShapePath as any;

export type Path = I3JS.Path;
export const Path: Path = O3JS.Path as any;

export type Curve = I3JS.Curve<any>;
export const Curve: Curve = O3JS.Curve as any;

class CurveVector2Class extends O3JS.Curve<O3JS.Vector2> { }
export type CurveVector2 = I3JS.CurveVector2;
export const CurveVector2: CurveVector2 = CurveVector2Class as any;

class CurveVector3Class extends O3JS.Curve<O3JS.Vector3> { }
export type CurveVector3 = I3JS.CurveVector3;
export const CurveVector3: CurveVector3 = CurveVector3Class as any;

export type CurvePath = I3JS.CurvePath<any>;
export const CurvePath: CurvePath = O3JS.CurvePath as any;

class CurvePathVector2Class extends O3JS.CurvePath<O3JS.Vector2> { }
export type CurvePathVector2 = I3JS.CurvePathVector2;
export const CurvePathVector2: CurvePathVector2 = CurvePathVector2Class as any;

class CurvePathVector3Class extends O3JS.CurvePath<O3JS.Vector3> { }
export type CurvePathVector3 = I3JS.CurvePathVector3;
export const CurvePathVector3: CurvePathVector3 = CurvePathVector3Class as any;


// GL STATE CONSTANTS
export const CullFaceNone: O3JS.CullFace = O3JS.CullFaceNone;
export const CullFaceBack: O3JS.CullFace = O3JS.CullFaceBack;
export const CullFaceFront: O3JS.CullFace = O3JS.CullFaceFront;
export const CullFaceFrontBack: O3JS.CullFace = O3JS.CullFaceFrontBack;

// Shadowing Type
export const BasicShadowMap: O3JS.ShadowMapType = O3JS.BasicShadowMap;
export const PCFShadowMap: O3JS.ShadowMapType = O3JS.PCFShadowMap;
export const PCFSoftShadowMap: O3JS.ShadowMapType = O3JS.PCFSoftShadowMap;
export const VSMShadowMap: O3JS.ShadowMapType = O3JS.VSMShadowMap;

// MATERIAL CONSTANTS

// side
export const FrontSide: O3JS.Side = O3JS.FrontSide;
export const BackSide: O3JS.Side = O3JS.BackSide;
export const DoubleSide: O3JS.Side = O3JS.DoubleSide;

// shading
export const FlatShading: O3JS.Shading = O3JS.FlatShading;
export const SmoothShading: O3JS.Shading = O3JS.SmoothShading;

// blending modes
export const NoBlending: O3JS.Blending = O3JS.NoBlending;
export const NormalBlending: O3JS.Blending = O3JS.NormalBlending;
export const AdditiveBlending: O3JS.Blending = O3JS.AdditiveBlending;
export const SubtractiveBlending: O3JS.Blending = O3JS.SubtractiveBlending;
export const MultiplyBlending: O3JS.Blending = O3JS.MultiplyBlending;
export const CustomBlending: O3JS.Blending = O3JS.CustomBlending;

// custom blending equations
// (numbers start from 100 not to clash with other
// mappings to OpenGL constants defined in Texture.js)
export const AddEquation: O3JS.BlendingEquation = O3JS.AddEquation;
export const SubtractEquation: O3JS.BlendingEquation = O3JS.SubtractEquation;
export const ReverseSubtractEquation: O3JS.BlendingEquation = O3JS.ReverseSubtractEquation;
export const MinEquation: O3JS.BlendingEquation = O3JS.MinEquation;
export const MaxEquation: O3JS.BlendingEquation = O3JS.MaxEquation;

// custom blending destination factors
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

// custom blending src factors
export const SrcAlphaSaturateFactor: O3JS.BlendingSrcFactor = O3JS.SrcAlphaSaturateFactor;

// depth modes
export const NeverDepth: O3JS.DepthModes = O3JS.NeverDepth;
export const AlwaysDepth: O3JS.DepthModes = O3JS.AlwaysDepth;
export const LessDepth: O3JS.DepthModes = O3JS.LessDepth;
export const LessEqualDepth: O3JS.DepthModes = O3JS.LessEqualDepth;
export const EqualDepth: O3JS.DepthModes = O3JS.EqualDepth;
export const GreaterEqualDepth: O3JS.DepthModes = O3JS.GreaterEqualDepth;
export const GreaterDepth: O3JS.DepthModes = O3JS.GreaterDepth;
export const NotEqualDepth: O3JS.DepthModes = O3JS.NotEqualDepth;

// TEXTURE CONSTANTS
// Operations
export const MultiplyOperation: O3JS.Combine = O3JS.MultiplyOperation;
export const MixOperation: O3JS.Combine = O3JS.MixOperation;
export const AddOperation: O3JS.Combine = O3JS.AddOperation;

// Tone Mapping modes
export const NoToneMapping: O3JS.ToneMapping = O3JS.NoToneMapping;
export const LinearToneMapping: O3JS.ToneMapping = O3JS.LinearToneMapping;
export const ReinhardToneMapping: O3JS.ToneMapping = O3JS.ReinhardToneMapping;
export const CineonToneMapping: O3JS.ToneMapping = O3JS.CineonToneMapping;
export const ACESFilmicToneMapping: O3JS.ToneMapping = O3JS.ACESFilmicToneMapping;


// Mapping modes
export const UVMapping: O3JS.Mapping = O3JS.UVMapping;
export const CubeReflectionMapping: O3JS.Mapping = O3JS.CubeReflectionMapping;
export const CubeRefractionMapping: O3JS.Mapping = O3JS.CubeRefractionMapping;
export const EquirectangularReflectionMapping: O3JS.Mapping = O3JS.EquirectangularReflectionMapping;
export const EquirectangularRefractionMapping: O3JS.Mapping = O3JS.EquirectangularRefractionMapping;
export const CubeUVReflectionMapping: O3JS.Mapping = O3JS.CubeUVReflectionMapping;
export const CubeUVRefractionMapping: O3JS.Mapping = O3JS.CubeUVRefractionMapping;
export const DEFAULT_MAPPING: O3JS.Mapping = O3JS.Texture.DEFAULT_MAPPING;

// Wrapping modes
export const RepeatWrapping: O3JS.Wrapping = O3JS.RepeatWrapping;
export const ClampToEdgeWrapping: O3JS.Wrapping = O3JS.ClampToEdgeWrapping;
export const MirroredRepeatWrapping: O3JS.Wrapping = O3JS.MirroredRepeatWrapping;

// Filters
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

// Data types
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

// Pixel formats
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

// Compressed texture formats
// DDS / ST3C Compressed texture formats
export const RGB_S3TC_DXT1_Format: O3JS.CompressedPixelFormat = O3JS.RGB_S3TC_DXT1_Format;
export const RGBA_S3TC_DXT1_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_S3TC_DXT1_Format;
export const RGBA_S3TC_DXT3_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_S3TC_DXT3_Format;
export const RGBA_S3TC_DXT5_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_S3TC_DXT5_Format;

// PVRTC compressed './texture formats
export const RGB_PVRTC_4BPPV1_Format: O3JS.CompressedPixelFormat = O3JS.RGB_PVRTC_4BPPV1_Format;
export const RGB_PVRTC_2BPPV1_Format: O3JS.CompressedPixelFormat = O3JS.RGB_PVRTC_2BPPV1_Format;
export const RGBA_PVRTC_4BPPV1_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_PVRTC_4BPPV1_Format;
export const RGBA_PVRTC_2BPPV1_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_PVRTC_2BPPV1_Format;

// ETC compressed texture formats
export const RGB_ETC1_Format: O3JS.CompressedPixelFormat = O3JS.RGB_ETC1_Format;
export const RGB_ETC2_Format: O3JS.CompressedPixelFormat = O3JS.RGB_ETC2_Format;
export const RGBA_ETC2_EAC_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_ETC2_EAC_Format;

// ASTC compressed texture formats
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

// BPTC compressed texture formats
export const RGBA_BPTC_Format: O3JS.CompressedPixelFormat = O3JS.RGBA_BPTC_Format;

// Loop styles for AnimationAction
export const LoopOnce: O3JS.AnimationActionLoopStyles = O3JS.LoopOnce;
export const LoopRepeat: O3JS.AnimationActionLoopStyles = O3JS.LoopRepeat;
export const LoopPingPong: O3JS.AnimationActionLoopStyles = O3JS.LoopPingPong;

// Interpolation
export const InterpolateDiscrete: O3JS.InterpolationModes = O3JS.InterpolateDiscrete;
export const InterpolateLinear: O3JS.InterpolationModes = O3JS.InterpolateLinear;
export const InterpolateSmooth: O3JS.InterpolationModes = O3JS.InterpolateSmooth;

// Interpolant ending modes
export const ZeroCurvatureEnding: O3JS.InterpolationEndingModes = O3JS.ZeroCurvatureEnding;
export const ZeroSlopeEnding: O3JS.InterpolationEndingModes = O3JS.ZeroSlopeEnding;
export const WrapAroundEnding: O3JS.InterpolationEndingModes = O3JS.WrapAroundEnding;

// Animation blending modes
export const NormalAnimationBlendMode: O3JS.AnimationBlendMode = O3JS.NormalAnimationBlendMode;
export const AdditiveAnimationBlendMode: O3JS.AnimationBlendMode = O3JS.AdditiveAnimationBlendMode;

// Triangle Draw modes
export const TrianglesDrawMode: O3JS.TrianglesDrawModes = O3JS.TrianglesDrawMode;
export const TriangleStripDrawMode: O3JS.TrianglesDrawModes = O3JS.TriangleStripDrawMode;
export const TriangleFanDrawMode: O3JS.TrianglesDrawModes = O3JS.TriangleFanDrawMode;

// Texture Encodings
export const LinearEncoding: O3JS.TextureEncoding = O3JS.LinearEncoding;
export const sRGBEncoding: O3JS.TextureEncoding = O3JS.sRGBEncoding;
export const GammaEncoding: O3JS.TextureEncoding = O3JS.GammaEncoding;
export const RGBEEncoding: O3JS.TextureEncoding = O3JS.RGBEEncoding;
export const LogLuvEncoding: O3JS.TextureEncoding = O3JS.LogLuvEncoding;
export const RGBM7Encoding: O3JS.TextureEncoding = O3JS.RGBM7Encoding;
export const RGBM16Encoding: O3JS.TextureEncoding = O3JS.RGBM16Encoding;
export const RGBDEncoding: O3JS.TextureEncoding = O3JS.RGBDEncoding;

// Depth packing strategies
export const BasicDepthPacking: O3JS.DepthPackingStrategies = O3JS.BasicDepthPacking;
export const RGBADepthPacking: O3JS.DepthPackingStrategies = O3JS.RGBADepthPacking;

// Normal Map types
export const TangentSpaceNormalMap: O3JS.NormalMapTypes = O3JS.TangentSpaceNormalMap;
export const ObjectSpaceNormalMap: O3JS.NormalMapTypes = O3JS.ObjectSpaceNormalMap;

// Stencil Op types
export const ZeroStencilOp: O3JS.StencilOp = O3JS.ZeroStencilOp;
export const KeepStencilOp: O3JS.StencilOp = O3JS.KeepStencilOp;
export const ReplaceStencilOp: O3JS.StencilOp = O3JS.ReplaceStencilOp;
export const IncrementStencilOp: O3JS.StencilOp = O3JS.IncrementStencilOp;
export const DecrementStencilOp: O3JS.StencilOp = O3JS.DecrementStencilOp;
export const IncrementWrapStencilOp: O3JS.StencilOp = O3JS.IncrementWrapStencilOp;
export const DecrementWrapStencilOp: O3JS.StencilOp = O3JS.DecrementWrapStencilOp;
export const InvertStencilOp: O3JS.StencilOp = O3JS.InvertStencilOp;

// Stencil Func types
export const NeverStencilFunc: O3JS.StencilFunc = O3JS.NeverStencilFunc;
export const LessStencilFunc: O3JS.StencilFunc = O3JS.LessStencilFunc;
export const EqualStencilFunc: O3JS.StencilFunc = O3JS.EqualStencilFunc;
export const LessEqualStencilFunc: O3JS.StencilFunc = O3JS.LessEqualStencilFunc;
export const GreaterStencilFunc: O3JS.StencilFunc = O3JS.GreaterStencilFunc;
export const NotEqualStencilFunc: O3JS.StencilFunc = O3JS.NotEqualStencilFunc;
export const GreaterEqualStencilFunc: O3JS.StencilFunc = O3JS.GreaterEqualStencilFunc;
export const AlwaysStencilFunc: O3JS.StencilFunc = O3JS.AlwaysStencilFunc;

// usage types
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


