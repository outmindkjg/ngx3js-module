import * as THREE from 'three';
import { CSM } from 'three/examples/jsm/csm/CSM';
import { CSMHelper } from 'three/examples/jsm/csm/CSMHelper';
import { LightProbeHelper } from 'three/examples/jsm/helpers/LightProbeHelper';
import { PositionalAudioHelper } from 'three/examples/jsm/helpers/PositionalAudioHelper';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper';
import { VertexTangentsHelper } from 'three/examples/jsm/helpers/VertexTangentsHelper';
import { Gyroscope } from 'three/examples/jsm/misc/Gyroscope';
import { I3JS } from '../../threejs-library/three-interface';

/**
 * Gyroscope helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxGyroscope) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/Gyroscope) page for a live demo.
 *
 */
export class NgxGyroscope extends Gyroscope {
	constructor() {
		super();
	}
}

/**
 * CSM helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCSMHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/CSMHelper) page for a live demo.
 *
 */
export class NgxCSMHelper extends CSMHelper {
	constructor(csm: CSM) {
		super(csm);
	}
}

/**
 * Box helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxBoxHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/BoxHelper) page for a live demo.
 *
 */
export class NgxBoxHelper extends THREE.BoxHelper {
	constructor(object: I3JS.IObject3D, color?: I3JS.TColorRepresentation) {
		super(object, color);
	}
}

/**
 * Box3 helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxBox3Helper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/Box3Helper) page for a live demo.
 *
 */
export class NgxBox3Helper extends THREE.Box3Helper {
	constructor(box: I3JS.IBox3, color?: I3JS.IColor) {
		super(box, color);
	}
}

/**
 * Grid helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxGridHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/GridHelper) page for a live demo.
 *
 */
export class NgxGridHelper extends THREE.GridHelper {
	constructor(
		size?: number,
		divisions?: number,
		color1?: I3JS.TColorRepresentation,
		color2?: I3JS.TColorRepresentation
	) {
		super(size, divisions, color1, color2);
	}
}

/**
 * PolarGrid helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPolarGridHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/PolarGridHelper) page for a live demo.
 *
 */
export class NgxPolarGridHelper extends THREE.PolarGridHelper {
	constructor(
		radius?: number,
		radials?: number,
		circles?: number,
		divisions?: number,
		color1?: I3JS.TColorRepresentation,
		color2?: I3JS.TColorRepresentation
	) {
		super(radius, radials, circles, divisions, color1, color2);
	}
}

/**
 * PositionalAudio helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPositionalAudioHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/PositionalAudioHelper) page for a live demo.
 *
 */
export class NgxPositionalAudioHelper extends PositionalAudioHelper {
	constructor(
		audio: THREE.PositionalAudio,
		range?: number,
		divisionsInnerAngle?: number,
		divisionsOuterAngle?: number
	) {
		super(audio, range, divisionsInnerAngle, divisionsOuterAngle);
	}
}

/**
 * Axes helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAxesHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/AxesHelper) page for a live demo.
 *
 */
export class NgxAxesHelper extends THREE.AxesHelper {
	constructor(size?: number) {
		super(size);
	}
}

/**
 * Camera helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCameraHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/CameraHelper) page for a live demo.
 *
 */
export class NgxCameraHelper extends THREE.CameraHelper {
	constructor(camera: I3JS.ICamera) {
		super(camera);
	}
}

/**
 * DirectionalLight helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxDirectionalLightHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/DirectionalLightHelper) page for a live demo.
 *
 */
export class NgxDirectionalLightHelper extends THREE.DirectionalLightHelper {
	constructor(
		light: THREE.DirectionalLight,
		size?: number,
		color?: I3JS.TColorRepresentation
	) {
		super(light, size, color);
	}
}

/**
 * HemisphereLight helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxHemisphereLightHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/HemisphereLightHelper) page for a live demo.
 *
 */
export class NgxHemisphereLightHelper extends THREE.HemisphereLightHelper {
	constructor(
		light: THREE.HemisphereLight,
		size: number,
		color?: I3JS.TColorRepresentation
	) {
		super(light, size, color);
	}
}

/**
 * PointLight helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPointLightHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/PointLightHelper) page for a live demo.
 *
 */
export class NgxPointLightHelper extends THREE.PointLightHelper {
	constructor(
		light: THREE.PointLight,
		sphereSize?: number,
		color?: I3JS.TColorRepresentation
	) {
		super(light, sphereSize, color);
	}
}

/**
 * SpotLight helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSpotLightHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/SpotLightHelper) page for a live demo.
 *
 */
export class NgxSpotLightHelper extends THREE.SpotLightHelper {
	constructor(light: I3JS.ILight, color?: I3JS.TColorRepresentation) {
		super(light, color);
	}
}

/**
 * RectAreaLight helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRectAreaLightHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/RectAreaLightHelper) page for a live demo.
 *
 */
export class NgxRectAreaLightHelper extends RectAreaLightHelper {
	constructor(light: THREE.RectAreaLight, color?: I3JS.TColorRepresentation) {
		super(light, color);
	}
}

/**
 * LightProbe helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLightProbeHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/LightProbeHelper) page for a live demo.
 *
 */
export class NgxLightProbeHelper extends LightProbeHelper {
	constructor(lightProbe: THREE.LightProbe, size: number) {
		super(lightProbe, size);
	}
}

/**
 * Plane helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPlaneHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/PlaneHelper) page for a live demo.
 *
 */
export class NgxPlaneHelper extends THREE.PlaneHelper {
	constructor(plane: I3JS.IPlane, size?: number, hex?: number) {
		super(plane, size, hex);
	}
}

/**
 * VertexTangents helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxVertexTangentsHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/VertexTangentsHelper) page for a live demo.
 *
 */
export class NgxVertexTangentsHelper extends VertexTangentsHelper {
	constructor(object: I3JS.IObject3D, size?: number, hex?: number) {
		super(object, size, hex);
	}
}

/**
 * VertexNormals helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxVertexNormalsHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/VertexNormalsHelper) page for a live demo.
 *
 */
export class NgxVertexNormalsHelper extends VertexNormalsHelper {
	constructor(object: I3JS.IObject3D, size?: number, hex?: number) {
		super(object, size, hex);
	}
}

/**
 * Skeleton helper
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSkeletonHelper) page for details.
 * See the [ngx helper](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_helper/SkeletonHelper) page for a live demo.
 *
 */
export class NgxSkeletonHelper extends THREE.SkeletonHelper {
	constructor(object: I3JS.IObject3D) {
		super(object);
	}
}