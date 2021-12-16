import { ShaderPass } from './three/examples/index';
import {
	BufferAttribute,
	BufferGeometry, CircleGeometry, Color, Curve, CurvePath, GLSLVersion,
	InterleavedBufferAttribute,
	Line,
	Mesh,
	Points,
	RawShaderMaterial,
	ShaderMaterial,
	ShaderMaterialParameters, TrianglesDrawModes, Vector2, Vector3, WireframeGeometry
} from './three/index';
export * from './three/examples/index';
export * from './three/index';

export interface GeometryUtils {
	mergeBufferAttributes(attributes: BufferAttribute[]): BufferAttribute;
	mergeBufferGeometries(geometries: BufferGeometry[], useGroups?: boolean): BufferGeometry;
	interleaveAttributes(attributes: BufferAttribute[]): InterleavedBufferAttribute;
	estimateBytesUsed(geometry: BufferGeometry): number;
	mergeVertices(geometry: BufferGeometry, tolerance?: number): BufferGeometry;
	toTrianglesDrawMode(geometry: BufferGeometry, drawMode: TrianglesDrawModes): BufferGeometry;
	computeMorphedAttributes(object: Mesh | Line | Points): object;
	hilbert2D(
		center?: Vector3,
		size?: number,
		iterations?: number,
		v0?: number,
		v1?: number,
		v2?: number,
		v3?: number
	): Vector3[];
	hilbert3D(
		center?: Vector3,
		size?: number,
		iterations?: number,
		v0?: number,
		v1?: number,
		v2?: number,
		v3?: number,
		v4?: number,
		v5?: number,
		v6?: number,
		v7?: number
	): Vector3[];
	gosper(size?: number): number[];
}

export interface NgxRawShaderMaterial extends RawShaderMaterial {
	new (parameters?: ShaderMaterialParameters, shaderId?: string, glslVersion?: GLSLVersion): this;
}

export interface NgxShaderMaterial extends ShaderMaterial {
	new (parameters?: ShaderMaterialParameters, shaderId?: string, glslVersion?: GLSLVersion): this;
}

/**
 * ShaderMaterial pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderMaterialPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/ShaderMaterialPass) page for a live demo.
 *
 */
export interface ShaderMaterialPass extends ShaderPass {
	/**
	 * Creates an instance of ngx ShaderMaterial pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * Copy pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderCopyPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/CopyPass) page for a live demo.
 *
 */
export interface ShaderCopyPass extends ShaderPass {
	/**
	 * Creates an instance of ngx copy pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * RGBShift pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderRGBShiftPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/RGBShiftPass) page for a live demo.
 *
 */
export interface ShaderRGBShiftPass extends ShaderPass {
	/**
	 * Creates an instance of ngx RGBShift pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * BleachBypass pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderBleachBypassPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/BleachBypassPass) page for a live demo.
 *
 */
export interface ShaderBleachBypassPass extends ShaderPass {
	/**
	 * Creates an instance of ngx BleachBypass pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * Sepia pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderSepiaPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SepiaPass) page for a live demo.
 *
 */
export interface ShaderSepiaPass extends ShaderPass {
	/**
	 * Creates an instance of ngx Sepia pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * Vignette pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderVignettePass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/VignettePass) page for a live demo.
 *
 */
export interface ShaderVignettePass extends ShaderPass {
	/**
	 * Creates an instance of ngx Vignette pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * GammaCorrection pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderGammaCorrectionPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/GammaCorrectionPass) page for a live demo.
 *
 */
export interface ShaderGammaCorrectionPass extends ShaderPass {
	/**
	 * Creates an instance of ngx GammaCorrection pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * FXAA pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderFXAAPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/FXAAPass) page for a live demo.
 *
 */
export interface ShaderFXAAPass extends ShaderPass {
	/**
	 * Creates an instance of ngx FXAA pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * Pixel pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderPixelPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/PixelPass) page for a live demo.
 *
 */
export interface ShaderPixelPass extends ShaderPass {
	/**
	 * Creates an instance of ngx Pixel pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * Luminosity pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderLuminosityPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/LuminosityPass) page for a live demo.
 *
 */
export interface ShaderLuminosityPass extends ShaderPass {
	/**
	 * Creates an instance of ngx Luminosity pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * DotScreen pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderDotScreenPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/DotScreenPass) page for a live demo.
 *
 */
export interface ShaderDotScreenPass extends ShaderPass {
	/**
	 * Creates an instance of ngx Luminosity pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * SobelOperator pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSobelOperatorPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SobelOperatorPass) page for a live demo.
 *
 */
export interface SobelOperatorPass extends ShaderPass {
	/**
	 * Creates an instance of ngx SobelOperator pass.
	 *
	 * @param [textureId]
	 */
	new (textureId?: string): this;
}

/**
 * The Capsule geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCapsuleGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/CapsuleGeometry) page for a live demo.
 *
 */
 export interface CapsuleGeometry extends BufferGeometry {
	/**
	 * The Parameters of capsule geometry
	 */
	parameters: {
		radius: number;
		radiusSegments: number;
		height: number;
		heightSegments: number;
		phiStart: number;
		phiLength: number;
	};

	/**
	 * @param [radius=50] — sphere radius. Default is 50.
	 * @param [radiusSegments=30] — number of horizontal segments. Minimum value is 3, and the default is 8.
	 * @param [height=10] — specify vertical starting angle. Default is 0.
	 * @param [heightSegments=1] — specify vertical sweep angle size. Default is Math.PI.
	 * @param [phiStart=0] — specify horizontal starting angle. Default is 0.
	 * @param [phiLength=Math.PI * 2] — specify horizontal sweep angle size. Default is Math.PI * 2.
	 */
	new (
		radius?: number,
		radiusSegments?: number,
		height?: number,
		heightSegments?: number,
		phiStart?: number,
		phiLength?: number
	): this;
}

/**
 * The Circle Depth geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCircleDepthGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/CircleDepthGeometry) page for a live demo.
 *
 */
export interface CircleDepthGeometry extends BufferGeometry {
	/**
	 * @default 'CircleDepthGeometry'
	 */
	type: string;

	/**
	 * The Parameters of circle depth geometry
	 */
	parameters: {
		radius: number;
		depth: number;
		segments: number;
		thetaStart: number;
		thetaLength: number;
		depthRate: number;
	};

	/**
	 * @param [radius=1]
	 * @param [depth=1]
	 * @param [segments=8]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 * @param [depthRate=1]
	 */
	new (
		radius?: number,
		depth?: number,
		segments?: number,
		thetaStart?: number,
		thetaLength?: number,
		depthRate?: number
	): this;
}

/**
 * The Grid geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxGridGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/GridGeometry) page for a live demo.
 *
 */
export interface GridGeometry extends BufferGeometry {
	/**
	 * The Parameters of grid geometry
	 */
	parameters: {
		width: number;
		height: number;
		depth: number;
		widthSegments: number;
		heightSegments: number;
		colorW: Color;
		colorH: Color;
	};

	/**
	 * @param [width=1]
	 * @param [height=1]
	 * @param [depth=1]
	 * @param [widthSegments=1]
	 * @param [heightSegments=1]
	 */
	new (
		width?: number,
		height?: number,
		depth?: number,
		widthSegments?: number,
		heightSegments?: number,
		colorW?: Color,
		colorH?: Color
	): this;
}

export interface PlaneDepthGeometry extends BufferGeometry {
	/**
	 * @default 'PlaneDepthGeometry'
	 */
	type: string;

	/**
	 * The Parameters of plane depth geometry
	 */
	parameters: {
		width: number;
		height: number;
		depth: number;
		widthSegments: number;
		heightSegments: number;
		depthRate: number;
	};

	/**
	 * @param [width=1] — Width of the sides on the X axis.
	 * @param [height=1] — Height of the sides on the Y axis.
	 * @param [depth=1] — Depth of the sides on the Z axis.
	 * @param [widthSegments=1] — Number of segmented faces along the width of the sides.
	 * @param [heightSegments=1] — Number of segmented faces along the height of the sides.
	 * @param [depthRate=1]
	 */
	new (
		width?: number,
		height?: number,
		depth?: number,
		widthSegments?: number,
		heightSegments?: number,
		depthRate?: number
	): this;
}

/**
 * The Plane Perlin geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPlanePerlinGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/PlanePerlinGeometry) page for a live demo.
 *
 */
 export interface PlanePerlinGeometry {
	/**
	 * The Data of plane perlin geometry
	 */
	data: number[];
	/**
	 * Creates an instance of plane perlin geometry.
	 * @param worldWidth
	 * @param worldDepth
	 * @param [quality]
	 */
	new (worldWidth: number, worldDepth: number, quality?: number): this;
	/**
	 * Gets y
	 * @param x
	 * @param z
	 * @returns
	 */
	getY(x: number, z: number): number;
	/**
	 * Generates height
	 * @param width
	 * @param height
	 * @param [quality]
	 * @returns height
	 */
	generateHeight(width: number, height: number, quality?: number): number[];
	/**
	 * Gets terrain
	 * @param planeWidth
	 * @param planeHeight
	 * @param planeDepth
	 * @returns terrain
	 */
	getTerrain(planeWidth: number, planeHeight: number, planeDepth: number): BufferGeometry;
	/**
	 * Gets minecraft
	 * @param planeWidth
	 * @param planeHeight
	 * @param planeDepth
	 * @returns minecraft
	 */
	getMinecraft(planeWidth: number, planeHeight: number, planeDepth: number): BufferGeometry;
	/**
	 * Gets minecraft ao
	 * @param planeWidth
	 * @param planeHeight
	 * @param planeDepth
	 * @param light
	 * @param shadow
	 * @returns minecraft ao
	 */
	getMinecraftAo(
		planeWidth: number,
		planeHeight: number,
		planeDepth: number,
		light: Color,
		shadow: Color
	): BufferGeometry;
	/**
	 * Gets geometry
	 * @param planeGeometry
	 * @param uv
	 * @param rotate
	 * @param translate
	 * @param [colors]
	 * @returns geometry
	 */
	getGeometry(
		planeGeometry: BufferGeometry,
		uv: number[],
		rotate: {
			x: number;
			y: number;
			z: number;
		},
		translate: {
			x: number;
			y: number;
			z: number;
		},
		colors?: Color[]
	): BufferGeometry;
	/**
	 * Gets texture
	 * @param sun
	 * @param color
	 * @param add
	 * @returns texture
	 */
	getTexture(sun: Vector3, color: Color, add: Color): HTMLCanvasElement;
}

/**
 * The RingDepth geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRingDepthGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/RingDepthGeometry) page for a live demo.
 *
 */
export interface RingDepthGeometry extends BufferGeometry {
	/**
	 * @default 'RingDepthGeometry'
	 */
	type: string;
	/**
	 * The Parameters of ring depth geometry
	 */
	parameters: {
		innerRadius: number;
		outerRadius: number;
		depth: number;
		thetaSegments: number;
		phiSegments: number;
		thetaStart: number;
		thetaLength: number;
		depthRate: number;
	};
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [depth=1]
	 * @param [thetaSegments=8]
	 * @param [phiSegments=1]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 * @param [depthRate=1]
	 */
	new (
		innerRadius?: number,
		outerRadius?: number,
		depth?: number,
		thetaSegments?: number,
		phiSegments?: number,
		thetaStart?: number,
		thetaLength?: number,
		depthRate?: number
	): this;
}

/**
 * The Rope geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRopeGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/RopeGeometry) page for a live demo.
 *
 */
export interface RopeGeometry extends BufferGeometry {
	/**
	 * The Parameters of rope geometry
	 */
	parameters: {
		width: number;
		widthSegments: number;
	};
	/**
	 * @param [width=1]
	 * @param [widthSegments=1]
	 */
	new (width?: number, widthSegments?: number): this;
}

/**
 * The Star Depth geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxStarDepthGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/StarDepthGeometry) page for a live demo.
 *
 */
export interface StarDepthGeometry extends BufferGeometry {
	/**
	 * @default 'StarDepthGeometry'
	 */
	type: string;
	/**
	 * The Parameters of star depth geometry
	 */
	parameters: {
		innerRadius: number;
		outerRadius: number;
		depth: number;
		segments: number;
		thetaStart: number;
		thetaLength: number;
		depthRate: number;
	};
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [depth=1]
	 * @param [segments=5]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 * @param [depthRate=1]
	 */
	new (
		innerRadius?: number,
		outerRadius?: number,
		depth?: number,
		segments?: number,
		thetaStart?: number,
		thetaLength?: number,
		depthRate?: number
	): this;
}

/**
 * The Outline geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxOutlineGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/OutlineGeometry) page for a live demo.
 *
 */
export interface OutlineGeometry extends WireframeGeometry {
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [segments=5]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	new (geometry: BufferGeometry, scale?: number): this;
}

/**
 * The Star geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxStarGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/StarGeometry) page for a live demo.
 *
 */
export interface StarGeometry extends CircleGeometry {
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [segments=5]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	new (innerRadius?: number, outerRadius?: number, segments?: number, thetaStart?: number, thetaLength?: number): this;
}

export interface CurveVector2 extends Curve<Vector2> {}
export interface CurveVector3 extends Curve<Vector3> {}
export interface CurvePathVector2 extends CurvePath<Vector2> {}
export interface CurvePathVector3 extends CurvePath<Vector3> {}
