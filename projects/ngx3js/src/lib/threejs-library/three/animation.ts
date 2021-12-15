import { AnimationActionLoopStyles, AnimationBlendMode, InterpolationModes } from './constants';
import { EventDispatcher, Object3D } from './core';
import { CubicInterpolant, DiscreteInterpolant, LinearInterpolant, Vector3 } from './math';
import { Bone } from './objects';

export interface AnimationAction {
	new (mixer: AnimationMixer, clip: AnimationClip, localRoot?: Object3D, blendMode?: AnimationBlendMode): this;

	blendMode: AnimationBlendMode;

	/**
	 * @default THREE.LoopRepeat
	 */
	loop: AnimationActionLoopStyles;

	/**
	 * @default 0
	 */
	time: number;

	/**
	 * @default 1
	 */
	timeScale: number;

	/**
	 * @default 1
	 */
	weight: number;

	/**
	 * @default Infinity
	 */
	repetitions: number;

	/**
	 * @default false
	 */
	paused: boolean;

	/**
	 * @default true
	 */
	enabled: boolean;

	/**
	 * @default false
	 */
	clampWhenFinished: boolean;

	/**
	 * @default true
	 */
	zeroSlopeAtStart: boolean;

	/**
	 * @default true
	 */
	zeroSlopeAtEnd: boolean;

	play(): AnimationAction;
	stop(): AnimationAction;
	reset(): AnimationAction;
	isRunning(): boolean;
	isScheduled(): boolean;
	startAt(time: number): AnimationAction;
	setLoop(mode: AnimationActionLoopStyles, repetitions: number): AnimationAction;
	setEffectiveWeight(weight: number): AnimationAction;
	getEffectiveWeight(): number;
	fadeIn(duration: number): AnimationAction;
	fadeOut(duration: number): AnimationAction;
	crossFadeFrom(fadeOutAction: AnimationAction, duration: number, warp: boolean): AnimationAction;
	crossFadeTo(fadeInAction: AnimationAction, duration: number, warp: boolean): AnimationAction;
	stopFading(): AnimationAction;
	setEffectiveTimeScale(timeScale: number): AnimationAction;
	getEffectiveTimeScale(): number;
	setDuration(duration: number): AnimationAction;
	syncWith(action: AnimationAction): AnimationAction;
	halt(duration: number): AnimationAction;
	warp(statTimeScale: number, endTimeScale: number, duration: number): AnimationAction;
	stopWarping(): AnimationAction;
	getMixer(): AnimationMixer;
	getClip(): AnimationClip;
	getRoot(): Object3D;
}

export interface MorphTarget {
	name: string;
	vertices: Vector3[];
}

export interface AnimationClip {
	new (name?: string, duration?: number, tracks?: KeyframeTrack[], blendMode?: AnimationBlendMode): this;

	name: string;
	tracks: KeyframeTrack[];

	/**
	 * @default THREE.NormalAnimationBlendMode
	 */
	blendMode: AnimationBlendMode;

	/**
	 * @default -1
	 */
	duration: number;
	uuid: string;
	results: any[];

	resetDuration(): AnimationClip;
	trim(): AnimationClip;
	validate(): boolean;
	optimize(): AnimationClip;
	clone(): this;
	toJSON(clip: AnimationClip): any;

	CreateFromMorphTargetSequence(
		name: string,
		morphTargetSequence: MorphTarget[],
		fps: number,
		noLoop: boolean
	): AnimationClip;
	findByName(clipArray: AnimationClip[], name: string): AnimationClip;
	CreateClipsFromMorphTargetSequences(morphTargets: MorphTarget[], fps: number, noLoop: boolean): AnimationClip[];
	parse(json: any): AnimationClip;
	parseAnimation(animation: any, bones: Bone[]): AnimationClip;
	toJSON(clip: AnimationClip): any;
}

export interface AnimationMixer extends EventDispatcher {
	new (root: Object3D | AnimationObjectGroup): this;

	/**
	 * @default 0
	 */
	time: number;

	/**
	 * @default 1.0
	 */
	timeScale: number;

	clipAction(
		clip: AnimationClip,
		root?: Object3D | AnimationObjectGroup,
		blendMode?: AnimationBlendMode
	): AnimationAction;
	existingAction(clip: AnimationClip, root?: Object3D | AnimationObjectGroup): AnimationAction | null;
	stopAllAction(): AnimationMixer;
	update(deltaTime: number): AnimationMixer;
	setTime(timeInSeconds: number): AnimationMixer;
	getRoot(): Object3D | AnimationObjectGroup;
	uncacheClip(clip: AnimationClip): void;
	uncacheRoot(root: Object3D | AnimationObjectGroup): void;
	uncacheAction(clip: AnimationClip, root?: Object3D | AnimationObjectGroup): void;
}

export interface AnimationObjectGroup {
	new (...args: any[]): this;

	uuid: string;
	stats: {
		bindingsPerObject: number;
		objects: {
			total: number;
			inUse: number;
		};
	};
	readonly isAnimationObjectGroup: true;

	add(...args: any[]): void;
	remove(...args: any[]): void;
	uncache(...args: any[]): void;
}

export interface AnimationUtils {
	arraySlice(array: any, from: number, to: number): any;
	convertArray(array: any, type: any, forceClone: boolean): any;
	isTypedArray(object: any): boolean;
	getKeyFrameOrder(times: number[]): number[];
	sortedArray(values: any[], stride: number, order: number[]): any[];
	flattenJSON(jsonKeys: string[], times: any[], values: any[], valuePropertyName: string): void;

	/**
	 * @param sourceClip
	 * @param name
	 * @param startFrame
	 * @param endFrame
	 * @param [fps=30]
	 */
	subclip(sourceClip: AnimationClip, name: string, startFrame: number, endFrame: number, fps?: number): AnimationClip;

	/**
	 * @param targetClip
	 * @param [referenceFrame=0]
	 * @param [referenceClip=targetClip]
	 * @param [fps=30]
	 */
	makeClipAdditive(
		targetClip: AnimationClip,
		referenceFrame?: number,
		referenceClip?: AnimationClip,
		fps?: number
	): AnimationClip;
}

export interface KeyframeTrack {
	/**
	 * @param name
	 * @param times
	 * @param values
	 * @param [interpolation=THREE.InterpolateLinear]
	 */
	new (name: string, times: ArrayLike<any>, values: ArrayLike<any>, interpolation?: InterpolationModes): this;

	name: string;
	times: Float32Array;
	values: Float32Array;

	ValueTypeName: string;
	TimeBufferType: Float32Array;
	ValueBufferType: Float32Array;

	/**
	 * @default THREE.InterpolateLinear
	 */
	DefaultInterpolation: InterpolationModes;

	InterpolantFactoryMethodDiscrete(result: any): DiscreteInterpolant;
	InterpolantFactoryMethodLinear(result: any): LinearInterpolant;
	InterpolantFactoryMethodSmooth(result: any): CubicInterpolant;

	setInterpolation(interpolation: InterpolationModes): KeyframeTrack;
	getInterpolation(): InterpolationModes;

	getValueSize(): number;

	shift(timeOffset: number): KeyframeTrack;
	scale(timeScale: number): KeyframeTrack;
	trim(startTime: number, endTime: number): KeyframeTrack;
	validate(): boolean;
	optimize(): KeyframeTrack;
	clone(): this;

	toJSON(track: KeyframeTrack): any;
}

export interface ParseTrackNameResults {
	nodeName: string;
	objectName: string;
	objectIndex: string;
	propertyName: string;
	propertyIndex: string;
}

export interface PropertyBinding {
	new (rootNode: any, path: string, parsedPath?: any): this;

	path: string;
	parsedPath: any;
	node: any;
	rootNode: any;

	getValue(targetArray: any, offset: number): any;
	setValue(sourceArray: any, offset: number): void;
	bind(): void;
	unbind(): void;

	BindingType: { [bindingType: string]: number };
	Versioning: { [versioning: string]: number };

	GetterByBindingType: Array<() => void>;
	SetterByBindingTypeAndVersioning: Array<Array<() => void>>;

	create(root: any, path: any, parsedPath?: any): PropertyBinding | PropertyBindingComposite;
	sanitizeNodeName(name: string): string;
	parseTrackName(trackName: string): ParseTrackNameResults;
	findNode(root: any, nodeName: string): any;
}

export interface PropertyBindingComposite {
    new(targetGroup: any, path: any, parsedPath?: any): this;
    getValue(array: any, offset: number): any;
    setValue(array: any, offset: number): void;
    bind(): void;
    unbind(): void;
}

export interface PropertyMixer {
	new (binding: any, typeName: string, valueSize: number): this;

	binding: any;
	valueSize: number;
	buffer: any;
	cumulativeWeight: number;
	cumulativeWeightAdditive: number;
	useCount: number;
	referenceCount: number;

	accumulate(accuIndex: number, weight: number): void;
	accumulateAdditive(weight: number): void;
	apply(accuIndex: number): void;
	saveOriginalState(): void;
	restoreOriginalState(): void;
}

export interface BooleanKeyframeTrack extends KeyframeTrack {
	new (name: string, times: any[], values: any[]): this;

	/**
	 * @default 'bool'
	 */
	ValueTypeName: string;
}

export interface ColorKeyframeTrack extends KeyframeTrack {
	new (name: string, times: any[], values: any[], interpolation?: InterpolationModes): this;

	/**
	 * @default 'color'
	 */
	ValueTypeName: string;
}

export interface NumberKeyframeTrack extends KeyframeTrack {
	new (name: string, times: any[], values: any[], interpolation?: InterpolationModes): this;

	/**
	 * @default 'number'
	 */
	ValueTypeName: string;
}

export interface QuaternionKeyframeTrack extends KeyframeTrack {
	new (name: string, times: any[], values: any[], interpolation?: InterpolationModes): this;

	/**
	 * @default 'quaternion'
	 */
	ValueTypeName: string;
}

export interface StringKeyframeTrack extends KeyframeTrack {
	new (name: string, times: any[], values: any[], interpolation?: InterpolationModes): this;

	/**
	 * @default 'string'
	 */
	ValueTypeName: string;
}

export interface VectorKeyframeTrack extends KeyframeTrack {
	new (name: string, times: any[], values: any[], interpolation?: InterpolationModes): this;

	/**
	 * @default 'vector'
	 */
	ValueTypeName: string;
}
