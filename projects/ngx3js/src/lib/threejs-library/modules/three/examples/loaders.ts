import { Rhino3dmLoader as O3JS_Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader';
import { ThreeMFLoader as O3JS_ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';
import { AMFLoader as O3JS_AMFLoader } from 'three/examples/jsm/loaders/AMFLoader';
import { BasisTextureLoader as O3JS_BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader';
import { BVHLoader as O3JS_BVHLoader } from 'three/examples/jsm/loaders/BVHLoader';
import { ColladaLoader as O3JS_ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { DDSLoader as O3JS_DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
import { DRACOLoader as O3JS_DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { EXRLoader as O3JS_EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
import { FBXLoader as O3JS_FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Font as O3JS_Font, FontLoader as O3JS_FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { GCodeLoader as O3JS_GCodeLoader } from 'three/examples/jsm/loaders/GCodeLoader';
import { GLTFLoader as O3JS_GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { HDRCubeTextureLoader as O3JS_HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader';
import {
	IFCLoader as O3JS_IFCLoader
} from 'three/examples/jsm/loaders/IFCLoader';
import { KMZLoader as O3JS_KMZLoader } from 'three/examples/jsm/loaders/KMZLoader';
import { KTX2Loader as O3JS_KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { KTXLoader as O3JS_KTXLoader } from 'three/examples/jsm/loaders/KTXLoader';
import { LDrawLoader as O3JS_LDrawLoader } from 'three/examples/jsm/loaders/LDrawLoader';
import { LogLuvLoader as O3JS_LogLuvLoader } from 'three/examples/jsm/loaders/LogLuvLoader';
import { LottieLoader as O3JS_LottieLoader } from 'three/examples/jsm/loaders/LottieLoader';
import { LUT3dlLoader as O3JS_LUT3dlLoader } from 'three/examples/jsm/loaders/LUT3dlLoader';
import { LUTCubeLoader as O3JS_LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader';
import { LWOLoader as O3JS_LWOLoader } from 'three/examples/jsm/loaders/LWOLoader';
import { MD2Loader as O3JS_MD2Loader } from 'three/examples/jsm/loaders/MD2Loader';
import { MDDLoader as O3JS_MDDLoader } from 'three/examples/jsm/loaders/MDDLoader';
import { MMDLoader as O3JS_MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';
import { MTLLoader as O3JS_MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { NRRDLoader as O3JS_NRRDLoader } from 'three/examples/jsm/loaders/NRRDLoader';
import { OBJLoader as O3JS_OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { PCDLoader as O3JS_PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { PDBLoader as O3JS_PDBLoader } from 'three/examples/jsm/loaders/PDBLoader';
import { PLYLoader as O3JS_PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { PRWMLoader as O3JS_PRWMLoader } from 'three/examples/jsm/loaders/PRWMLoader';
import { PVRLoader as O3JS_PVRLoader } from 'three/examples/jsm/loaders/PVRLoader';
import { RGBELoader as O3JS_RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { RGBMLoader as O3JS_RGBMLoader } from 'three/examples/jsm/loaders/RGBMLoader';
import { STLLoader as O3JS_STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { SVGLoader as O3JS_SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { TDSLoader as O3JS_TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import { TGALoader as O3JS_TGALoader } from 'three/examples/jsm/loaders/TGALoader';
import { TTFLoader as O3JS_TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { VOXLoader as O3JS_VOXLoader, VOXMesh as O3JS_VOXMesh } from 'three/examples/jsm/loaders/VOXLoader';
import { VRMLLoader as O3JS_VRMLLoader } from 'three/examples/jsm/loaders/VRMLLoader';
import { VRMLoader as O3JS_VRMLoader } from 'three/examples/jsm/loaders/VRMLoader';
import { VTKLoader as O3JS_VTKLoader } from 'three/examples/jsm/loaders/VTKLoader';
import { XYZLoader as O3JS_XYZLoader } from 'three/examples/jsm/loaders/XYZLoader';
import * as I3JS from '../../../types/three/examples/loaders';
import { NodeMaterialLoader as O3JS_NodeMaterialLoader } from './NodeMaterialLoader';
import { TiltLoader as O3JS_TiltLoader } from './TiltLoader';

export type Rhino3dmLoader = I3JS.Rhino3dmLoader;
export const Rhino3dmLoader: Rhino3dmLoader = O3JS_Rhino3dmLoader as any;

export type ThreeMFLoader = I3JS.ThreeMFLoader;
export const ThreeMFLoader: ThreeMFLoader = O3JS_ThreeMFLoader as any;

export type AMFLoader = I3JS.AMFLoader;
export const AMFLoader: AMFLoader = O3JS_AMFLoader as any;

export type BVHLoader = I3JS.BVHLoader;
export const BVHLoader: BVHLoader = O3JS_BVHLoader as any;

export type BasisTextureLoader = I3JS.BasisTextureLoader;
export const BasisTextureLoader: BasisTextureLoader = O3JS_BasisTextureLoader as any;

export type ColladaLoader = I3JS.ColladaLoader;
export const ColladaLoader: ColladaLoader = O3JS_ColladaLoader as any;

export type DDSLoader = I3JS.DDSLoader;
export const DDSLoader: DDSLoader = O3JS_DDSLoader as any;

export type DRACOLoader = I3JS.DRACOLoader;
export const DRACOLoader: DRACOLoader = O3JS_DRACOLoader as any;

export type EXRLoader = I3JS.EXRLoader;
export const EXRLoader: EXRLoader = O3JS_EXRLoader as any;

export type FBXLoader = I3JS.FBXLoader;
export const FBXLoader: FBXLoader = O3JS_FBXLoader as any;

export type FontLoader = I3JS.FontLoader;
export const FontLoader: FontLoader = O3JS_FontLoader as any;

export type Font = I3JS.Font;
export const Font: Font = O3JS_Font as any;

export type GCodeLoader = I3JS.GCodeLoader;
export const GCodeLoader: GCodeLoader = O3JS_GCodeLoader as any;

export type GLTFLoader = I3JS.GLTFLoader;
export const GLTFLoader: GLTFLoader = O3JS_GLTFLoader as any;

export type HDRCubeTextureLoader = I3JS.HDRCubeTextureLoader;
export const HDRCubeTextureLoader: HDRCubeTextureLoader = O3JS_HDRCubeTextureLoader as any;

export type IFCLoader = I3JS.IFCLoader;
export const IFCLoader: IFCLoader = O3JS_IFCLoader as any;

// export type IFCManager = I3JS.IFCManager;
// export const IFCManager: IFCManager = O3JS_IFCManager as any;

// export type IFCModel = I3JS.IFCModel;
// export const IFCModel: IFCModel = O3JS_IFCModel as any;

export type KMZLoader = I3JS.KMZLoader;
export const KMZLoader: KMZLoader = O3JS_KMZLoader as any;

export type KTX2Loader = I3JS.KTX2Loader;
export const KTX2Loader: KTX2Loader = O3JS_KTX2Loader as any;

export type KTXLoader = I3JS.KTXLoader;
export const KTXLoader: KTXLoader = O3JS_KTXLoader as any;

export type LDrawLoader = I3JS.LDrawLoader;
export const LDrawLoader: LDrawLoader = O3JS_LDrawLoader as any;

export type LUT3dlLoader = I3JS.LUT3dlLoader;
export const LUT3dlLoader: LUT3dlLoader = O3JS_LUT3dlLoader as any;

export type LUTCubeLoader = I3JS.LUTCubeLoader;
export const LUTCubeLoader: LUTCubeLoader = O3JS_LUTCubeLoader as any;

export type LWOLoader = I3JS.LWOLoader;
export const LWOLoader: LWOLoader = O3JS_LWOLoader as any;

export type LogLuvLoader = I3JS.LogLuvLoader;
export const LogLuvLoader: LogLuvLoader = O3JS_LogLuvLoader as any;

export type LottieLoader = I3JS.LottieLoader;
export const LottieLoader: LottieLoader = O3JS_LottieLoader as any;

export type MD2Loader = I3JS.MD2Loader;
export const MD2Loader: MD2Loader = O3JS_MD2Loader as any;

export type MDDLoader = I3JS.MDDLoader;
export const MDDLoader: MDDLoader = O3JS_MDDLoader as any;

export type MMDLoader = I3JS.MMDLoader;
export const MMDLoader: MMDLoader = O3JS_MMDLoader as any;

export type MTLLoader = I3JS.MTLLoader;
export const MTLLoader: MTLLoader = O3JS_MTLLoader as any;

export type NRRDLoader = I3JS.NRRDLoader;
export const NRRDLoader: NRRDLoader = O3JS_NRRDLoader as any;

export type OBJLoader = I3JS.OBJLoader;
export const OBJLoader: OBJLoader = O3JS_OBJLoader as any;

export type PCDLoader = I3JS.PCDLoader;
export const PCDLoader: PCDLoader = O3JS_PCDLoader as any;

export type PDBLoader = I3JS.PDBLoader;
export const PDBLoader: PDBLoader = O3JS_PDBLoader as any;

export type PLYLoader = I3JS.PLYLoader;
export const PLYLoader: PLYLoader = O3JS_PLYLoader as any;

export type PRWMLoader = I3JS.PRWMLoader;
export const PRWMLoader: PRWMLoader = O3JS_PRWMLoader as any;

export type PVRLoader = I3JS.PVRLoader;
export const PVRLoader: PVRLoader = O3JS_PVRLoader as any;

export type RGBELoader = I3JS.RGBELoader;
export const RGBELoader: RGBELoader = O3JS_RGBELoader as any;

export type RGBMLoader = I3JS.RGBMLoader;
export const RGBMLoader: RGBMLoader = O3JS_RGBMLoader as any;

export type STLLoader = I3JS.STLLoader;
export const STLLoader: STLLoader = O3JS_STLLoader as any;

export type SVGLoader = I3JS.SVGLoader;
export const SVGLoader: SVGLoader = O3JS_SVGLoader as any;

export type TDSLoader = I3JS.TDSLoader;
export const TDSLoader: TDSLoader = O3JS_TDSLoader as any;

export type TGALoader = I3JS.TGALoader;
export const TGALoader: TGALoader = O3JS_TGALoader as any;

export type TTFLoader = I3JS.TTFLoader;
export const TTFLoader: TTFLoader = O3JS_TTFLoader as any;

export type TiltLoader = I3JS.TiltLoader;
export const TiltLoader: TiltLoader = O3JS_TiltLoader as any;

export type VOXMesh = I3JS.VOXMesh;
export const VOXMesh: VOXMesh = O3JS_VOXMesh as any;

export type VOXLoader = I3JS.VOXLoader;
export const VOXLoader: VOXLoader = O3JS_VOXLoader as any;

export type VRMLLoader = I3JS.VRMLLoader;
export const VRMLLoader: VRMLLoader = O3JS_VRMLLoader as any;

export type VRMLoader = I3JS.VRMLoader;
export const VRMLoader: VRMLoader = O3JS_VRMLoader as any;

export type VTKLoader = I3JS.VTKLoader;
export const VTKLoader: VTKLoader = O3JS_VTKLoader as any;

export type XYZLoader = I3JS.XYZLoader;
export const XYZLoader: XYZLoader = O3JS_XYZLoader as any;

export type NodeMaterialLoader = I3JS.NodeMaterialLoader;
export const NodeMaterialLoader: NodeMaterialLoader = O3JS_NodeMaterialLoader as any;
