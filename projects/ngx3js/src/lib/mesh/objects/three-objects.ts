import * as THREE from 'three';
import { RayParameters } from 'three/examples/jsm/geometries/LightningStrike';
import { HTMLMesh } from 'three/examples/jsm/interactive/HTMLMesh';
import { InteractiveGroup } from 'three/examples/jsm/interactive/InteractiveGroup';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe';
import { TubePainter } from 'three/examples/jsm/misc/TubePainter';
import {
	Flow,
	InstancedFlow,
} from 'three/examples/jsm/modifiers/CurveModifier';
import {
	Lensflare,
	LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';
import {
	LightningStorm,
	StormParams,
} from 'three/examples/jsm/objects/LightningStorm';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';
import {
	Reflector,
	ReflectorOptions,
} from 'three/examples/jsm/objects/Reflector';
import { ReflectorRTT } from 'three/examples/jsm/objects/ReflectorRTT';
import {
	Refractor,
	RefractorOptions,
} from 'three/examples/jsm/objects/Refractor';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { Water, WaterOptions } from 'three/examples/jsm/objects/Water';
import {
	Water as Water2,
	Water2Options,
} from 'three/examples/jsm/objects/Water2';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import {
	CSS3DObject,
	CSS3DSprite,
} from 'three/examples/jsm/renderers/CSS3DRenderer';
import { SVGObject } from 'three/examples/jsm/renderers/SVGRenderer';
import { ThreeUtil, MaterialParameters } from '../../interface';
import { ReflectorForSSRPass } from './../../threejs-library/ReflectorForSSRPass';
import * as THREE_CORE from './../../threejs-library/three-core';

/**
 * Lensflare mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSkyboxLensflare) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Lensflare) page for a live demo.
 *
 */
export class NgxSkyboxLensflare extends Lensflare {
	/**
	 * Creates an instance of ngx skybox lensflare.
	 */
	constructor() {
		super();
	}
}

/**
 * HTMLMesh mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxHTMLMesh) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/HTMLMesh) page for a live demo.
 *
 */
export class NgxHTMLMesh extends HTMLMesh {
	/**
	 * Creates an instance of ngx htmlmesh.
	 * @param dom
	 */
	constructor(dom: HTMLElement, options?: MaterialParameters) {
		super(dom);
		if (options !== null && options !== undefined) {
			const material = this.material as THREE.Material;
			if (ThreeUtil.isNotNull(options.fog)) {
				material.fog = ThreeUtil.getBooleanSafe(options.fog, true);
			}
			if (ThreeUtil.isNotNull(options.side)) {
				material.side = ThreeUtil.getSideSafe(options.side, 'front');
			}
			if (ThreeUtil.isNotNull(options.opacity)) {
				material.opacity = ThreeUtil.getNumberSafe(options.opacity, 1);
			}
			if (ThreeUtil.isNotNull(options.shadowSide)) {
				material.shadowSide = ThreeUtil.getSideSafe(options.shadowSide, null);
			}
			if (ThreeUtil.isNotNull(options.toneMapped)) {
				material.toneMapped = ThreeUtil.getBooleanSafe(
					options.toneMapped,
					true
				);
			}
			if (ThreeUtil.isNotNull(options.transparent)) {
				material.transparent = ThreeUtil.getBooleanSafe(
					options.transparent,
					false
				);
			}
			if (ThreeUtil.isNotNull(options.vertexColors)) {
				material.vertexColors = ThreeUtil.getBooleanSafe(
					options.transparent,
					false
				);
			}
			if (ThreeUtil.isNotNull(options.visible)) {
				material.visible = ThreeUtil.getBooleanSafe(options.visible, true);
			}
		}
	}
}

/**
 * SVGObject mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSVGObject) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/SVGObject) page for a live demo.
 *
 */
export class NgxSVGObject extends SVGObject {
	/**
	 * Creates an instance of ngx svgobject.
	 * @param node
	 */
	constructor(node: SVGElement) {
		super(node);
	}
}

/**
 * CSS2DObject mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCSS2DObject) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/CSS2DObject) page for a live demo.
 *
 */
export class NgxCSS2DObject extends CSS2DObject {
	/**
	 * Creates an instance of ngx css2 dobject.
	 * @param element
	 */
	constructor(element: HTMLElement) {
		super(element);
	}
}

/**
 * CSS3DSprite mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCSS3DSprite) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/CSS3DSprite) page for a live demo.
 *
 */
export class NgxCSS3DSprite extends CSS3DSprite {
	/**
	 * Creates an instance of ngx css3 dsprite.
	 * @param element
	 */
	constructor(element: HTMLElement) {
		super(element);
	}
}

/**
 * CSS3DObject mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCSS3DObject) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/CSS3DObject) page for a live demo.
 *
 */
export class NgxCSS3DObject extends CSS3DObject {
	/**
	 * Creates an instance of ngx css3 dobject.
	 * @param element
	 */
	constructor(element: HTMLElement) {
		super(element);
	}
}

/**
 * Reflector mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxReflector) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Reflector) page for a live demo.
 *
 */
export class NgxReflector extends Reflector {
	/**
	 * Creates an instance of ngx reflector.
	 * @param [geometry]
	 * @param [options]
	 */
	constructor(geometry?: THREE_CORE.IBufferGeometry, options?: ReflectorOptions) {
		super(geometry, options);
	}
}

/**
 * ReflectorRTT mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxReflectorRTT) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/ReflectorRTT) page for a live demo.
 *
 */
export class NgxReflectorRTT extends ReflectorRTT {
	/**
	 * Creates an instance of ngx reflector rtt.
	 * @param [geometry]
	 * @param [options]
	 */
	constructor(geometry?: THREE_CORE.IBufferGeometry, options?: ReflectorOptions) {
		super(geometry, options);
	}
}

/**
 * Refractor mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRefractor) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Refractor) page for a live demo.
 *
 */
export class NgxRefractor extends Refractor {
	/**
	 * Creates an instance of ngx refractor.
	 * @param [geometry]
	 * @param [options]
	 */
	constructor(geometry?: THREE_CORE.IBufferGeometry, options?: RefractorOptions) {
		super(geometry, options);
	}
}

/**
 * ReflectorForSSRPass mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxReflectorForSSRMesh) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/ReflectorForSSRMesh) page for a live demo.
 *
 */
export class NgxReflectorForSSRMesh extends ReflectorForSSRPass {
	/**
	 * Creates an instance of ngx reflector for ssrpass.
	 * @param geometry
	 * @param options
	 */
	constructor(geometry: THREE_CORE.IBufferGeometry, options: any) {
		super(geometry, options);
	}
}

/**
 * Water mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxWater) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Water) page for a live demo.
 *
 */
export class NgxWater extends Water {
	/**
	 * Creates an instance of ngx water.
	 * @param geometry
	 * @param options
	 */
	constructor(geometry: THREE_CORE.IBufferGeometry, options: WaterOptions) {
		super(geometry, options);
	}
}

/**
 * Water2 mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxWater2) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Water2) page for a live demo.
 *
 */
export class NgxWater2 extends Water2 {
	/**
	 * Creates an instance of ngx water2.
	 * @param geometry
	 * @param options
	 */
	constructor(geometry: THREE_CORE.IBufferGeometry, options: Water2Options) {
		super(geometry, options);
	}
}

/**
 * Sky mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSky) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Sky) page for a live demo.
 *
 */
export class NgxSky extends Sky {
	/**
	 * Creates an instance of ngx sky.
	 */
	constructor() {
		super();
	}
}

/**
 * Flow mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxFlow) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Flow) page for a live demo.
 *
 */
export class NgxFlow extends Flow {
	/**
	 * Creates an instance of ngx flow.
	 * @param mesh
	 * @param [numberOfCurves]
	 */
	constructor(mesh: THREE_CORE.IMesh, numberOfCurves?: number) {
		super(mesh, numberOfCurves);
	}
}

/**
 * InstancedFlow mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxInstancedFlow) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/InstancedFlow) page for a live demo.
 *
 */
export class NgxInstancedFlow extends InstancedFlow {
	/**
	 * Creates an instance of ngx instanced flow.
	 * @param count
	 * @param curveCount
	 * @param geometry
	 * @param material
	 */
	constructor(
		count: number,
		curveCount: number,
		geometry: THREE_CORE.IBufferGeometry,
		material: THREE_CORE.IMaterial
	) {
		super(count, curveCount, geometry, material);
	}
}

/**
 * LineLoop mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLineLoop) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/LineLoop) page for a live demo.
 *
 */
export class NgxLineLoop extends THREE.LineLoop {
	/**
	 * Creates an instance of ngx line loop.
	 * @param [geometry]
	 * @param [material]
	 */
	constructor(
		geometry?: THREE_CORE.IBufferGeometry,
		material?: THREE_CORE.IMaterial | THREE_CORE.IMaterial[]
	) {
		super(geometry, material);
	}
}

/**
 * Lensflare mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLensflare) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Lensflare) page for a live demo.
 *
 */
export class NgxLensflare extends Lensflare {
	/**
	 * Creates an instance of ngx lensflare.
	 */
	constructor() {
		super();
	}
}

/**
 * InstancedMesh mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxInstancedMesh) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/InstancedMesh) page for a live demo.
 *
 */
export class NgxInstancedMesh extends THREE.InstancedMesh {
	/**
	 * Creates an instance of ngx instanced mesh.
	 * @param geometry
	 * @param material
	 * @param count
	 */
	constructor(
		geometry: THREE_CORE.IBufferGeometry,
		material: THREE_CORE.IMaterial | THREE_CORE.IMaterial[],
		count: number
	) {
		super(geometry, material, count);
	}
}

/**
 * Sprite mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSprite) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Sprite) page for a live demo.
 *
 */
export class NgxSprite extends THREE.Sprite {
	/**
	 * Creates an instance of ngx sprite.
	 * @param [material]
	 */
	constructor(material?: THREE_CORE.ISpriteMaterial) {
		super(material);
	}
}

/**
 * Wireframe mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxWireframe) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Wireframe) page for a live demo.
 *
 */
export class NgxWireframe extends Wireframe {
	/**
	 * Creates an instance of ngx wireframe.
	 * @param [geometry]
	 * @param [material]
	 */
	constructor(geometry?: LineSegmentsGeometry, material?: LineMaterial) {
		super(geometry, material);
	}
}

/**
 * MarchingCubes mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMarchingCubes) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/MarchingCubes) page for a live demo.
 *
 */
export class NgxMarchingCubes extends MarchingCubes {
	/**
	 * Creates an instance of ngx marching cubes.
	 * @param resolution
	 * @param material
	 * @param [enableUvs]
	 * @param [enableColors]
	 * @param [maxPolyCount]
	 */
	constructor(
		resolution: number,
		material: THREE_CORE.IMaterial,
		enableUvs?: boolean,
		enableColors?: boolean,
		maxPolyCount?: number
	) {
		super(resolution, material, enableUvs, enableColors, maxPolyCount);
	}
}

/**
 * Points mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPoints) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Points) page for a live demo.
 *
 */
export class NgxPoints extends THREE.Points {
	/**
	 * Creates an instance of ngx points.
	 * @param [geometry]
	 * @param [material]
	 */
	constructor(
		geometry?: THREE_CORE.IBufferGeometry,
		material?: THREE_CORE.IMaterial | THREE_CORE.IMaterial[]
	) {
		super(geometry, material);
	}
}

/**
 * Line mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLine) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Line) page for a live demo.
 *
 */
export class NgxLine extends THREE.Line {
	/**
	 * Creates an instance of ngx line.
	 * @param [geometry]
	 * @param [material]
	 */
	constructor(
		geometry?: THREE_CORE.IBufferGeometry,
		material?: THREE_CORE.IMaterial | THREE_CORE.IMaterial[]
	) {
		super(geometry, material);
	}
}

/**
 * TubePainter mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTubePainter) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/TubePainter) page for a live demo.
 *
 */
export class NgxTubePainter extends TubePainter {
	/**
	 * Creates an instance of ngx tube painter.
	 */
	constructor() {
		super();
	}
}

/**
 * MeshText mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMeshText) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/MeshText) page for a live demo.
 *
 */
export class NgxMeshText extends THREE.Mesh {
	/**
	 * Creates an instance of mesh text.
	 * @param message
	 * @param [height]
	 * @param [fontColor]
	 * @param [side]
	 */
	constructor(
		public message: string,
		public height: number = 20,
		public fontColor: THREE_CORE.TColorRepresentation = 0xffffff,
		public fontFamily: string = 'Arial',
		public side: THREE.Side = THREE.DoubleSide
	) {
		super(new THREE.BufferGeometry(), new THREE.Material());
		this.redraw();
	}

	/**
	 * Redraws mesh text
	 */
	redraw() {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		const textHeight = 100;
		context.font = 'normal ' + textHeight + 'px ' + this.fontFamily;
		const metrics = context.measureText(this.message);
		const textWidth = metrics.width;
		canvas.width = textWidth;
		canvas.height = textHeight;
		context.font = 'normal ' + textHeight + 'px ' + this.fontFamily;
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillStyle = '#ffffff';
		context.fillText(this.message, textWidth / 2, textHeight / 2);
		const texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;
		this.material = new THREE.MeshBasicMaterial({
			color: ThreeUtil.getColorSafe(this.fontColor, 0xffffff),
			side: this.side,
			map: texture,
			transparent: true,
		});
		this.geometry = new THREE.PlaneGeometry(
			(this.height * textWidth) / textHeight,
			this.height
		);
	}
}

/**
 * Line2 mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLine2) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Line2) page for a live demo.
 *
 */
export class NgxLine2 extends Line2 {
	/**
	 * Creates an instance of ngx line2.
	 * @param [geometry]
	 * @param [material]
	 */
	constructor(geometry?: LineGeometry, material?: LineMaterial) {
		super(geometry, material);
	}
}

/**
 * LineSegments mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLineSegments) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/LineSegments) page for a live demo.
 *
 */
export class NgxLineSegments extends THREE.LineSegments {
	/**
	 * Creates an instance of ngx line segments.
	 * @param [geometry]
	 * @param [material]
	 */
	constructor(
		geometry?: THREE_CORE.IBufferGeometry,
		material?: THREE_CORE.IMaterial | THREE_CORE.IMaterial[]
	) {
		super(geometry, material);
	}
}

/**
 * InteractiveGroup mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxInteractiveGroup) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/InteractiveGroup) page for a live demo.
 *
 */
export class NgxInteractiveGroup extends InteractiveGroup {
	/**
	 * Creates an instance of ngx interactive group.
	 * @param renderer
	 * @param camera
	 */
	constructor(renderer: THREE_CORE.IWebGLRenderer, camera: THREE_CORE.ICamera) {
		super(renderer, camera);
	}
}

/**
 * LightningStorm mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLightningStorm) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/LightningStorm) page for a live demo.
 *
 */
export class NgxLightningStorm extends LightningStorm {
	/**
	 * Creates an instance of ngx lightning storm.
	 * @param [stormParams]
	 */
	constructor(stormParams?: StormParams) {
		super(stormParams);
	}
}

/**
 * Group mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxGroup) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Group) page for a live demo.
 *
 */
export class NgxGroup extends THREE.Group {
	/**
	 * Creates an instance of ngx group.
	 */
	constructor() {
		super();
	}
}

/**
 * Mesh mesh
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMesh) page for details.
 * See the [ngx mesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_mesh/Mesh) page for a live demo.
 *
 */
export class NgxMesh extends THREE.Mesh {
	/**
	 * Creates an instance of ngx mesh.
	 *
	 * @param [geometry]
	 * @param [material]
	 */
	constructor(
		geometry?: THREE_CORE.IBufferGeometry,
		material?: THREE_CORE.IMaterial | THREE_CORE.IMaterial[]
	) {
		super(geometry, material);
	}
}

export { RayParameters, StormParams, LensflareElement };
