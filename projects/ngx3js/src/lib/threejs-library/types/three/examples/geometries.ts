import { BoxGeometry, BufferGeometry, Curve, Euler, ExtrudeGeometry, Mesh, Vector3 } from '../index';
import { Font } from './loaders';

/**
 * Box line geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BoxLineGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/BoxLineGeometry) page for a live demo.
 *
 * ### Examples
 * [webxr / vr / ballshooter](https://outmindkjg.github.io/ngx3js-doc/#/examples/webxr_vr_ballshooter) |
 * [webxr / vr / cubes](https://outmindkjg.github.io/ngx3js-doc/#/examples/webxr_vr_cubes)
 */
export interface BoxLineGeometry extends BufferGeometry {
	new (
		width?: number,
		height?: number,
		depth?: number,
		widthSegments?: number,
		heightSegments?: number,
		depthSegments?: number
	): this;
}

/**
 * Convex geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ConvexGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ConvexGeometry) page for a live demo.
 *
 * ### Examples
 * [physics / ammo / break](https://outmindkjg.github.io/ngx3js-doc/#/examples/physics_ammo_break) |
 * [webgl / geometry / convex](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_convex)
 *
 */
export interface ConvexGeometry extends BufferGeometry {
	new (points: Vector3[]): this;
}

/**
 * Decal geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DecalGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/DecalGeometry) page for a live demo.
 *
 * ### Examples
 * [webgl / decals ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_decals)
 *
 */
export interface DecalGeometry extends BufferGeometry {
	new (mesh: Mesh, position: Vector3, orientation: Euler, size: Vector3): this;
}

/**
 * Decal vertex
 */
export interface DecalVertex {
	new (position: Vector3, normal: Vector3): this;
	clone(): this;
}

/**
 * Random generator
 */
export interface RandomGenerator {
	random(): number;
	getSeed(): number;
	setSeed(seed: number): void;
}

/**
 * Lightning segment
 */
export interface LightningSegment {
	iteration: number;
	pos0: Vector3;
	pos1: Vector3;
	linPos0: Vector3;
	linPos1: Vector3;
	up0: Vector3;
	up1: Vector3;
	radius0: number;
	radius1: number;
	fraction0: number;
	fraction1: number;
	positionVariationFactor: number;
}

/**
 * Lightning subray
 */
export interface LightningSubray {
	seed: number;
	maxIterations: number;
	recursion: number;
	pos0: Vector3;
	pos1: Vector3;
	linPos0: Vector3;
	linPos1: Vector3;
	up0: Vector3;
	up1: Vector3;
	radius0: number;
	radius1: number;
	birthTime: number;
	deathTime: number;
	timeScale: number;
	roughness: number;
	straightness: number;
	propagationTimeFactor: number;
	vanishingTimeFactor: number;
	endPropagationTime: number;
	beginVanishingTime: number;
}

/**
 * Ray parameters
 */
export interface RayParameters {
	sourceOffset?: Vector3;
	destOffset?: Vector3;

	timeScale?: number;
	roughness?: number;
	straightness?: number;

	up0?: Vector3;
	up1?: Vector3;
	radius0?: number;
	radius1?: number;
	radius0Factor?: number;
	radius1Factor?: number;
	minRadius?: number;

	isEternal?: boolean;
	birthTime?: number;
	deathTime?: number;
	propagationTimeFactor?: number;
	vanishingTimeFactor?: number;
	subrayPeriod?: number;
	subrayDutyCycle?: number;

	maxIterations?: number;
	isStatic?: boolean;
	ramification?: number;
	maxSubrayRecursion?: number;
	recursionProbability?: number;
	generateUVs?: boolean;

	randomGenerator?: RandomGenerator;
	noiseSeed?: number;

	onDecideSubrayCreation?: (segment: LightningSegment, lightningStrike: LightningStrike) => void;
	onSubrayCreation?: (
		segment: LightningSegment,
		parentSubray: LightningSubray,
		childSubray: LightningSubray,
		lightningStrike: LightningStrike
	) => void;
}

/**
 * Lightning strike
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LightningStrike) page for details.
 *
 * ### Examples
 * [webgl / lightningstrike ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lightningstrike)
 */
export interface LightningStrike extends BufferGeometry {
	new (rayParameters?: RayParameters): this;
	copyParameters(dest?: RayParameters, source?: RayParameters): RayParameters;

	// Ray states
	readonly RAY_INITIALIZED: number;
	readonly RAY_UNBORN: number;
	readonly RAY_PROPAGATING: number;
	readonly RAY_STEADY: number;
	readonly RAY_VANISHING: number;
	readonly RAY_EXTINGUISHED: number;

	state: number;

	update(time: number): void;

	clone(): this;
}

/**
 * Parametric tube geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ParametricTubeGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ParametricTubeGeometry) page for a live demo.
 *
 * ### Examples
 * [webgl / geometries / parametric](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometries_parametric)
 *
 */
export interface ParametricTubeGeometry extends ParametricGeometry {
	new (path: Curve<Vector3>, segments?: number, radius?: number, segmentsRadius?: number, closed?: boolean): this;
}

/**
 * Parametric torus knot geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ParametricTorusKnotGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ParametricTorusKnotGeometry) page for a live demo.
 *
 * ### Examples
 * [webgl / geometries / parametric](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometries_parametric)
 *
 */
export interface ParametricTorusKnotGeometry extends ParametricTubeGeometry {
	new (radius?: number, tube?: number, segmentsT?: number, segmentsR?: number, p?: number, q?: number): this;
}

/**
 * Parametric sphere geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ParametricSphereGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ParametricSphereGeometry) page for a live demo.
 *
 * ### Examples
 * [webgl / geometries / parametric](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometries_parametric)
 *
 */
export interface ParametricSphereGeometry extends ParametricGeometry {
	new (size: number, u: number, v: number): this;
}

/**
 * Parametric plane geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ParametricPlaneGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ParametricPlaneGeometry) page for a live demo.
 *
 * ### Examples
 * [webgl / geometries / parametric](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometries_parametric)
 *
 */
export interface ParametricPlaneGeometry extends ParametricGeometry {
	new (width: number, depth: number, segmentsWidth: number, segmentsDepth: number): this;
}

export interface ParametricGeometries {
	/**
	 *
	 * @param v
	 * @param u
	 * @param target
	 * @returns klein
	 */
	klein(v: number, u: number, target: Vector3): Vector3;

	/**
	 *
	 * @param width
	 * @param height
	 * @returns plane
	 */
	plane(width: number, height: number): (u: number, v: number, target: Vector3) => Vector3;

	/**
	 *
	 * @param u
	 * @param t
	 * @param target
	 * @returns mobius
	 */
	mobius(u: number, t: number, target: Vector3): Vector3;

	/**
	 *
	 * @param u
	 * @param t
	 * @param target
	 * @returns mobius3d
	 */
	mobius3d(u: number, t: number, target: Vector3): Vector3;

	/**
	 *
	 */
	TubeGeometry: ParametricTubeGeometry;

	/**
	 *
	 */
	TorusKnotGeometry: ParametricTorusKnotGeometry;

	/**
	 *
	 */
	SphereGeometry: ParametricSphereGeometry;

	/**
	 *
	 */
	PlaneGeometry: ParametricPlaneGeometry;
}

/**
 * Parametric geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ParametricGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ParametricGeometry) page for a live demo.
 *
 * ### Examples
 * [webgl / geometry / nurbs](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_nurbs)
 */
export interface ParametricGeometry extends BufferGeometry {
	new (func?: (u: number, v: number, target: Vector3) => void, slices?: number, stacks?: number): this;

	/**
	 * @default 'ParametricGeometry'
	 */
	type: string;

	parameters: {
		func: (u: number, v: number, dest: Vector3) => void;
		slices: number;
		stacks: number;
	};
}

export { ParametricGeometry as ParametricBufferGeometry };
export { TextGeometry as TextBufferGeometry };

/**
 * Rounded box geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/RoundedBoxGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/RoundedBoxGeometry) page for a live demo.
 *
 * ### Examples
 * [webgl / loader / texture / lottie](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_texture_lottie)
 */
export interface RoundedBoxGeometry extends BoxGeometry {
	new (width?: number, height?: number, depth?: number, segments?: number, radius?: number): this;
}

/**
 * Teapot geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TeapotGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/TeapotGeometry) page for a live demo.
 *
 * ### Examples
 * [webgl / geometry / teapot](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_teapot) |
 * [misc / exporter / collada](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_collada) |
 * [webgl / buffergeometry / compression](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_compression) |
 * [webgl / loader / nodes](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_nodes) |
 * [webgl / materials / compile](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_compile)
 */
export interface TeapotGeometry extends BufferGeometry {
	new (
		size?: number,
		segments?: number,
		bottom?: boolean,
		lid?: boolean,
		body?: boolean,
		fitLid?: boolean,
		blinn?: boolean
	): this;
}

/**
 * Text geometry parameters
 */
export interface TextGeometryParameters {
	font: Font;
	size?: number | undefined;
	height?: number | undefined;
	curveSegments?: number | undefined;
	bevelEnabled?: boolean | undefined;
	bevelThickness?: number | undefined;
	bevelSize?: number | undefined;
	bevelOffset?: number | undefined;
	bevelSegments?: number | undefined;
}

/**
 * Text geometry
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TextGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/TextGeometry) page for a live demo.
 *
 * ### Examples
 * [webgl / camera / logarithmicdepthbuffer](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_camera_logarithmicdepthbuffer) |
 * [webgl / custom / attributes / lines](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_custom_attributes_lines) |
 * [webgl / geometry / text](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_text) |
 * [webgl / loader / ttf](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_ttf) |
 * [webgl / materials / variations / basic](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_variations_basic)
 */
export interface TextGeometry extends ExtrudeGeometry {
	/**
	 * @default 'TextGeometry'
	 */
	type: string;

	new (text: string, parameters: TextGeometryParameters): this;

	parameters: {
		font: Font;
		size: number;
		height: number;
		curveSegments: number;
		bevelEnabled: boolean;
		bevelThickness: number;
		bevelSize: number;
		bevelOffset: number;
		bevelSegments: number;
	};
}
