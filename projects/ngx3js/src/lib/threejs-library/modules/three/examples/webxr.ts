import { ARButton as O3JS_ARButton } from 'three/examples/jsm/webxr/ARButton';
import { OculusHandModel as O3JS_OculusHandModel } from 'three/examples/jsm/webxr/OculusHandModel';
import { OculusHandPointerModel as O3JS_OculusHandPointerModel } from 'three/examples/jsm/webxr/OculusHandPointerModel';
import { VRButton as O3JS_VRButton } from 'three/examples/jsm/webxr/VRButton';
import { XRControllerModelFactory as O3JS_XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory';
import { XREstimatedLight as O3JS_XREstimatedLight } from 'three/examples/jsm/webxr/XREstimatedLight';
import { XRHandMeshModel as O3JS_XRHandMeshModel } from 'three/examples/jsm/webxr/XRHandMeshModel';
import { XRHandModelFactory as O3JS_XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory';
import { XRHandPrimitiveModel as O3JS_XRHandPrimitiveModel } from 'three/examples/jsm/webxr/XRHandPrimitiveModel';
import * as I3JS from '../../../types/three/examples/webxr';

export type ARButton = I3JS.ARButton;
export const ARButton: ARButton = O3JS_ARButton as any;

export type OculusHandModel = I3JS.OculusHandModel;
export const OculusHandModel: OculusHandModel = O3JS_OculusHandModel as any;

export type OculusHandPointerModel = I3JS.OculusHandPointerModel;
export const OculusHandPointerModel: OculusHandPointerModel = O3JS_OculusHandPointerModel as any;

export type VRButton = I3JS.VRButton;
export const VRButton: VRButton = O3JS_VRButton as any;

export type XRControllerModelFactory = I3JS.XRControllerModelFactory;
export const XRControllerModelFactory: XRControllerModelFactory = O3JS_XRControllerModelFactory as any;

export type XREstimatedLight = I3JS.XREstimatedLight;
export const XREstimatedLight: XREstimatedLight = O3JS_XREstimatedLight as any;

export type XRHandMeshModel = I3JS.XRHandMeshModel;
export const XRHandMeshModel: XRHandMeshModel = O3JS_XRHandMeshModel as any;

export type XRHandModelFactory = I3JS.XRHandModelFactory;
export const XRHandModelFactory: XRHandModelFactory = O3JS_XRHandModelFactory as any;

export type XRHandPrimitiveModel = I3JS.XRHandPrimitiveModel;
export const XRHandPrimitiveModel: XRHandPrimitiveModel = O3JS_XRHandPrimitiveModel as any;
