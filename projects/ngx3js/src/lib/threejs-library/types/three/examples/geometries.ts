import { BoxGeometry, BufferGeometry, Curve, Euler, ExtrudeGeometry, Mesh, Vector3 } from '../index';
import { Font } from './loaders';

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

export interface ConvexGeometry extends BufferGeometry {
	new (points: Vector3[]): this;
}

export interface DecalGeometry extends BufferGeometry {
	new (mesh: Mesh, position: Vector3, orientation: Euler, size: Vector3): this;
}

export interface DecalVertex {
	new (position: Vector3, normal: Vector3): this;
	clone(): this;
}

export interface RandomGenerator {
	random(): number;
	getSeed(): number;
	setSeed(seed: number): void;
}

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

export interface LightningStrike {
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

	copy(source: LightningStrike): LightningStrike;
	clone(): this;
}

export interface ParametricTubeGeometry extends ParametricGeometry {
	new (path: Curve<Vector3>, segments?: number, radius?: number, segmentsRadius?: number, closed?: boolean): this;
}

export interface ParametricTorusKnotGeometry extends ParametricTubeGeometry {
	new (radius?: number, tube?: number, segmentsT?: number, segmentsR?: number, p?: number, q?: number): this;
}

export interface ParametricSphereGeometry extends ParametricGeometry {
	new (size: number, u: number, v: number): this;
}

export interface ParametricPlaneGeometry extends ParametricGeometry {
	new (width: number, depth: number, segmentsWidth: number, segmentsDepth: number): this;
}

export interface ParametricGeometries {
	klein(v: number, u: number, target: Vector3): Vector3;
	plane(width: number, height: number): (u: number, v: number, target: Vector3) => Vector3;
	mobius(u: number, t: number, target: Vector3): Vector3;
	mobius3d(u: number, t: number, target: Vector3): Vector3;
	TubeGeometry:ParametricTubeGeometry;
	TorusKnotGeometry:ParametricTorusKnotGeometry;
	SphereGeometry:ParametricSphereGeometry;
	PlaneGeometry:ParametricPlaneGeometry;
}

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

export interface RoundedBoxGeometry extends BoxGeometry {
	new (width?: number, height?: number, depth?: number, segments?: number, radius?: number): this;
}

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
