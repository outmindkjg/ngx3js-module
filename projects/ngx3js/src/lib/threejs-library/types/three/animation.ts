import { AnimationActionLoopStyles, AnimationBlendMode, InterpolationModes } from './constants';
import { EventDispatcher, Object3D } from './core';
import { CubicInterpolant, DiscreteInterpolant, LinearInterpolant, Vector3 } from './math';
import { Bone } from './objects';

/**
 * AnimationActions schedule the performance of the animations which are stored in [AnimationClips](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationClip).
 * Note: Most of AnimationAction's methods can be chained.
 * For an overview of the different elements of the three.js animation system see the "Animation System" article in the "Next Steps" section of the manual.
 *
 * There are two events indicating when a single loop of the action respectively the entire action has finished. You can react to them with:
 * mixer.addEventListener( 'loop', function( e ) { …} ); // properties of e: type, action and loopDelta mixer.addEventListener( 'finished', function( e ) { …} ); // properties of e: type, action and direction
 */
export interface AnimationAction {
	/**
	 * Note: Instead of calling this constructor directly you should instantiate an AnimationAction with [AnimationMixer.clipAction](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationMixer.clipAction) since this method provides caching for better performance.
	 * @param mixer The *AnimationMixer* that is controlled by this action.
	 * @param clip The *AnimationClip* that holds the animation data for this action.
	 * @param localRoot The root object on which this action is performed.
	 */
	new (mixer: AnimationMixer, clip: AnimationClip, localRoot?: Object3D, blendMode?: AnimationBlendMode): this;

	/**
	 */
	blendMode: AnimationBlendMode;

	/**
	 * The looping mode (can be changed with *.setLoop*). Default is [THREE.LoopRepeat](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation) (with an infinite number of *.repetitions*)
	 * Must be one of these constants:
	 * THREE.LoopOnce - playing the clip once,
	 * THREE.LoopRepeat - playing the clip with the chosen number of *repetitions*, each time jumping from the end of the clip directly to its beginning,
	 * THREE.LoopPingPong - playing the clip with the chosen number of *repetitions*, alternately playing forward and backward.
	 * @default THREE.LoopRepeat
	 */
	loop: AnimationActionLoopStyles;

	/**
	 * The local time of this action (in seconds, starting with 0).
	 * The value gets clamped or wrapped to 0...clip.duration (according to the loop state). It can be scaled relatively to the global mixer time by changing *.timeScale* (using *.setEffectiveTimeScale* or *.setDuration*).
	 * @default 0
	 */
	time: number;

	/**
	 * Scaling factor for the *.time*. A value of 0 causes the animation to pause. Negative values cause the animation to play backwards. Default is 1.
	 * Properties/methods concerning *timeScale* (respectively *time*) are: *.getEffectiveTimeScale*, *.halt*, *.paused*, *.setDuration*, *.setEffectiveTimeScale*, *.stopWarping*, *.syncWith*, *.warp*.
	 * @default 1
	 */
	timeScale: number;

	/**
	 * The degree of influence of this action (in the interval [0, 1]). Values between 0 (no impact) and 1 (full impact) can be used to blend between several actions. Default is 1.
	 * Properties/methods concerning  *weight* are: *.crossFadeFrom*, *.crossFadeTo*, *.enabled*, *.fadeIn*, *.fadeOut*, *.getEffectiveWeight*, *.setEffectiveWeight*, *.stopFading*.
	 * @default 1
	 */
	weight: number;

	/**
	 * The number of repetitions of the performed [AnimationClip](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationClip) over the course of this action.
	 * Can be set via *.setLoop*. Default is *Infinity*.
	 * Setting this number has no effect, if the *.loop* is set to [THREE.LoopOnce](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation).
	 * @default Infinity
	 */
	repetitions: number;

	/**
	 * Setting *paused* to *true* pauses the execution of the action by setting the effective time scale to 0. Default is *false*.
	 * @default false
	 */
	paused: boolean;

	/**
	 * Setting *enabled* to *false* disables this action, so that it has no impact. Default is *true*.
	 * When the action is re-enabled, the animation continues from its current *.time*
	 * (setting *enabled* to *false* doesn't reset the action).
	 * Note: Setting *enabled* to *true* doesn’t automatically restart the animation. Setting *enabled* to *true* will only restart the animation immediately if the following condition is fulfilled: *.paused* is *false*, this action has not been deactivated in the meantime (by executing a *.stop* or *.reset* command), and neither *.weight* nor *.timeScale* is 0.
	 * @default true
	 */
	enabled: boolean;

	/**
	 * If *clampWhenFinished* is set to true the animation will automatically be *.paused* on its last frame.
	 * If *clampWhenFinished* is set to false, *.enabled* will automatically be switched to false when the last loop of the action has finished, so that this action has no further impact.
	 * Default is false.
	 * Note: *clampWhenFinished* has no impact if the action is interrupted (it has only an effect if its last loop has really finished).
	 * @default false
	 */
	clampWhenFinished: boolean;

	/**
	 * Enables smooth interpolation without separate clips for start, loop and end. Default is *true*.
	 * @default true
	 */
	zeroSlopeAtStart: boolean;

	/**
	 * Enables smooth interpolation without separate clips for start, loop and end. Default is *true*.
	 * @default true
	 */
	zeroSlopeAtEnd: boolean;

	/**
	 * Tells the mixer to activate the action. This method can be chained.
	 * Note: Activating this action doesn’t necessarily mean that the animation starts immediately:
	 * If the action had already finished before (by reaching the end of its last loop), or if a time for a delayed start has been set (via *.startAt*), a *.reset* must be executed first. Some other settings (*.paused*=true, *.enabled*=false, *.weight*=0, *.timeScale*=0) can prevent the animation from playing, too.
	 */
	play(): AnimationAction;

	/**
	 * Tells the mixer to deactivate this action. This method can be chained.
	 * The action will be immediately stopped and completely *.reset*.
	 * Note: You can stop all active actions on the same mixer in one go via [mixer.stopAllAction](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationMixer.stopAllAction).
	 */
	stop(): AnimationAction;

	/**
	 * Resets the action. This method can be chained.
	 * This method sets *.paused* to false, *.enabled* to true, *.time* to 0, interrupts any scheduled fading and warping, and removes the internal loop count and scheduling for delayed starting.
	 * Note: .*reset* is always called by *.stop*, but .*reset* doesn’t call .*stop* itself.
	 * This means: If you want both, resetting and stopping, don’t call .*reset*; call .*stop* instead.
	 */
	reset(): AnimationAction;

	/**
	 * In addition to being activated in the mixer (see *.isScheduled*) the following conditions must be fulfilled: *.paused* is equal to false, *.enabled* is equal to true, *.timeScale* is different from 0, and there is no scheduling for a delayed start (*.startAt*).
	 * Note: *isRunning* being true doesn’t necessarily mean that the animation can actually be seen.
	 * This is only the case, if *.weight* is additionally set to a non-zero value.
	 * @returns Returns true if the action’s *.time* is currently running.
	 */
	isRunning(): boolean;

	/**
	 * Note: This doesn’t necessarily mean that the animation is actually running (compare the additional conditions for *.isRunning*).
	 * @returns Returns true, if this action is activated in the mixer.
	 */
	isScheduled(): boolean;

	/**
	 * Defines the time for a delayed start (usually passed as [AnimationMixer.time](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationMixer.time) + deltaTimeInSeconds). This method can be chained.
	 * Note: The animation will only start at the given time, if .*startAt* is chained with *.play*, or if the action has already been activated in the mixer (by a previous call of .*play*, without stopping or resetting it in the meantime).
	 */
	startAt(time: number): AnimationAction;

	/**
	 * Sets the *.loop* and the number of *.repetitions*. This method can be chained.
	 */
	setLoop(mode: AnimationActionLoopStyles, repetitions: number): AnimationAction;

	/**
	 * Sets the *.weight* and stops any scheduled fading. This method can be chained.
	 * If *.enabled* is true, the effective weight (an internal property) will also be set to this value; otherwise the effective weight (directly affecting the animation at this moment) will be set to 0.
	 * Note: .*enabled* will not be switched to *false* automatically, if .*weight* is set to 0 by this method.
	 */
	setEffectiveWeight(weight: number): AnimationAction;

	/**
	 * @returns Returns the effective weight (considering the current states of fading and *.enabled*).
	 */
	getEffectiveWeight(): number;

	/**
	 * Increases the *.weight* of this action gradually from 0 to 1, within the passed time interval. This method can be chained.
	 */
	fadeIn(duration: number): AnimationAction;

	/**
	 * Decreases the *.weight* of this action gradually from 1 to 0, within the passed time interval. This method can be chained.
	 */
	fadeOut(duration: number): AnimationAction;

	/**
	 * Causes this action to *.fadeIn*, fading out another action simultaneously, within the passed time interval. This method can be chained.
	 * If warpBoolean is true, additional *.warp* (gradually changes of the time scales) will be applied.
	 * Note: Like with *fadeIn* / *fadeOut*, the fading starts/ends with a weight of 1.
	 */
	crossFadeFrom(fadeOutAction: AnimationAction, duration: number, warp: boolean): AnimationAction;

	/**
	 * Causes this action to *.fadeOut*, fading in another action simultaneously, within the passed time interval. This method can be chained.
	 * If warpBoolean is true, additional *.warp* (gradually changes of the time scales) will be applied.
	 * Note: Like with *fadeIn* / *fadeOut*, the fading starts/ends with a weight of 1.
	 */
	crossFadeTo(fadeInAction: AnimationAction, duration: number, warp: boolean): AnimationAction;

	/**
	 * Stops any scheduled *.fadeIn* which is applied to this action. This method can be chained.
	 */
	stopFading(): AnimationAction;

	/**
	 * Sets the *.timeScale* and stops any scheduled warping. This method can be chained.
	 * If *.paused* is false, the effective time scale (an internal property) will also be set to this value; otherwise the effective time scale (directly affecting the animation at this moment) will be set to 0.
	 * Note: .*paused* will not be switched to *true* automatically, if .*timeScale* is set to 0 by this method.
	 */
	setEffectiveTimeScale(timeScale: number): AnimationAction;

	/**
	 * @returns Returns the effective time scale (considering the current states of warping and *.paused*).
	 */
	getEffectiveTimeScale(): number;

	/**
	 * Sets the duration for a single loop of this action (by adjusting *.timeScale* and stopping any scheduled warping). This method can be chained.
	 */
	setDuration(duration: number): AnimationAction;

	/**
	 * Synchronizes this action with the passed other action. This method can be chained.
	 * Synchronizing is done by setting this action’s *.time* and *.timeScale* values to the corresponding values of the other action (stopping any scheduled warping).
	 * Note: Future changes of the other action's *time* and *timeScale* will not be detected.
	 */
	syncWith(action: AnimationAction): AnimationAction;

	/**
	 * Decelerates this animation's speed to 0 by decreasing *.timeScale* gradually (starting from its current value), within the passed time interval. This method can be chained.
	 */
	halt(duration: number): AnimationAction;

	/**
	 * Changes the playback speed, within the passed time interval, by modifying *.timeScale* gradually from *startTimeScale* to *endTimeScale*. This method can be chained.
	 */
	warp(statTimeScale: number, endTimeScale: number, duration: number): AnimationAction;

	/**
	 * Stops any scheduled *.warp* which is applied to this action. This method can be chained.
	 */
	stopWarping(): AnimationAction;

	/**
	 * @returns Returns the mixer which is responsible for playing this action.
	 */
	getMixer(): AnimationMixer;

	/**
	 * @returns Returns the clip which holds the animation data for this action.
	 */
	getClip(): AnimationClip;

	/**
	 * @returns Returns the root object on which this action is performed.
	 */
	getRoot(): Object3D;
}

/**
 */
export interface MorphTarget {
	name: string;
	vertices: Vector3[];
}

/**
 * An AnimationClip is a reusable set of keyframe tracks which represent an animation.
 * For an overview of the different elements of the three.js animation system see the "Animation System" article in the "Next Steps" section of the manual.
 */
export interface AnimationClip {
	/**
	 * Note: Instead of instantiating an AnimationClip directly with the constructor, you can use one of its static methods to create AnimationClips: from JSON (*.parse*), from morph target sequences (*.CreateFromMorphTargetSequence*,e *.CreateClipsFromMorphTargetSequences*) or frome animation hierarchies (*.parseAnimation*) - if your model doesn't already hold AnimationClips in its geometry's animations array.
	 * @param name A name for this clip.
	 * @param duration The duration of this clip (in seconds). If a negative value is passed, the duration will be calculated from the passed *tracks* array.
	 * @param tracks an array of [KeyframeTracks](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/KeyframeTrack).
	 */
	new (name?: string, duration?: number, tracks?: KeyframeTrack[], blendMode?: AnimationBlendMode): this;

	/**
	 * A name for this clip. A certain clip can be searched via *.findByName*.
	 */
	name: string;

	/**
	 * An array containing a [KeyframeTrack](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/KeyframeTrack) for each property that are animated by this clip.
	 */
	tracks: KeyframeTrack[];

	/**
	 * @default THREE.NormalAnimationBlendMode
	 */
	blendMode: AnimationBlendMode;

	/**
	 * The duration of this clip (in seconds). This can be calculated from the *.tracks* array via *.resetDuration*.
	 * @default -1
	 */
	duration: number;

	/**
	 * The [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier) of this clip instance.
	 * It gets automatically assigned and shouldn't be edited.
	 */
	uuid: string;

	/**
	 */
	results: any[];

	/**
	 * Sets the *.duration* of the clip to the duration of its longest [KeyframeTrack](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/KeyframeTrack).
	 */
	resetDuration(): AnimationClip;

	/**
	 * Trims all tracks to the clip's duration.
	 */
	trim(): AnimationClip;

	/**
	 * Performs minimal validation on each track in the clip. Returns true if all tracks are valid.
	 */
	validate(): boolean;

	/**
	 * Optimizes each track by removing equivalent sequential keys (which are common in morph target sequences).
	 */
	optimize(): AnimationClip;

	/**
	 * @returns Returns a copy of this clip.
	 */
	clone(): this;

	/**
	 * @returns Returns a JSON object representing the serialized animation clip.
	 */
	toJSON(clip: AnimationClip): any;

	/**
	 * Note: The fps parameter is required, but the animation speed can be overridden in an *AnimationAction* via [animationAction.setDuration](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationAction.setDuration).
	 * @returns Returns a new AnimationClip from the passed morph targets array of a geometry, taking a name and the number of frames per second.
	 * @static
	 */
	CreateFromMorphTargetSequence(
		name: string,
		morphTargetSequence: MorphTarget[],
		fps: number,
		noLoop: boolean
	): AnimationClip;

	/**
	 * Searches for an AnimationClip by name, taking as its first parameter either an array of AnimationClips, or a mesh or geometry that contains an array named "animations".
	 * @static
	 */
	findByName(clipArray: AnimationClip[], name: string): AnimationClip;

	/**
	 */
	CreateClipsFromMorphTargetSequences(morphTargets: MorphTarget[], fps: number, noLoop: boolean): AnimationClip[];

	/**
	 * Parses a JSON representation of a clip and returns an AnimationClip.
	 * @static
	 */
	parse(json: any): AnimationClip;

	/**
	 * Parses the animation.hierarchy format and returns an AnimationClip.
	 * @static
	 */
	parseAnimation(animation: any, bones: Bone[]): AnimationClip;

	/**
	 * Takes an AnimationClip and returns a JSON object.
	 * @static
	 */
	toJSON(clip: AnimationClip): any;
}

/**
 * The AnimationMixer is a player for animations on a particular object in the scene. When multiple objects in the scene are animated independently, one AnimationMixer may be used for each object.
 * For an overview of the different elements of the three.js animation system see the "Animation System" article in the "Next Steps" section of the manual.
 */
export interface AnimationMixer extends EventDispatcher {
	/**
	 * @param rootObject The object whose animations shall be played by this mixer.
	 */
	new (root: Object3D | AnimationObjectGroup): this;

	/**
	 * The global mixer time (in seconds; starting with 0 on the mixer's creation).
	 * @default 0
	 */
	time: number;

	/**
	 * A scaling factor for the global *.time*.
	 * Note: Setting the mixer's timeScale to 0 and later back to 1 is a possibility to pause/unpause all actions that are controlled by this mixer.
	 * @default 1.0
	 */
	timeScale: number;

	/**
	 * If an action fitting the clip and root parameters doesn't yet exist, it will be created by this method. Calling this method several times with the same clip and root parameters always returns the same clip instance.
	 * @returns Returns an [AnimationAction](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationAction) for the passed clip, optionally using a root object different from the mixer's default root. The first parameter can be either an [AnimationClip](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationClip) object or the name of an AnimationClip.
	 */
	clipAction(
		clip: AnimationClip,
		root?: Object3D | AnimationObjectGroup,
		blendMode?: AnimationBlendMode
	): AnimationAction;

	/**
	 * The first parameter can be either an [AnimationClip](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationClip) object or the name of an AnimationClip.
	 * @returns Returns an existing [AnimationAction](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationAction) for the passed clip, optionally using a root object different from the mixer's default root.
	 */
	existingAction(clip: AnimationClip, root?: Object3D | AnimationObjectGroup): AnimationAction | null;

	/**
	 * Deactivates all previously scheduled actions on this mixer.
	 */
	stopAllAction(): AnimationMixer;

	/**
	 * Advances the global mixer time and updates the animation.
	 * This is usually done in the render loop, passing [clock.getDelta](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Clock.getDelta) scaled by the mixer's *.timeScale*).
	 */
	update(deltaTime: number): AnimationMixer;

	/**
	 * Sets the global mixer to a specific time and updates the animation accordingly.
	 * This is useful when you need to jump to an exact time in an animation. The input parameter will be scaled by the mixer's *.timeScale*.
	 */
	setTime(timeInSeconds: number): AnimationMixer;

	/**
	 * @returns Returns this mixer's root object.
	 */
	getRoot(): Object3D | AnimationObjectGroup;

	/**
	 * Deallocates all memory resources for a clip. Before using this method make sure to call [AnimationAction.stop](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationAction.stop)() for all related actions.
	 */
	uncacheClip(clip: AnimationClip): void;

	/**
	 * Deallocates all memory resources for a root object. Before using this method make sure to call [AnimationAction.stop](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationAction.stop)() for all related actions.
	 */
	uncacheRoot(root: Object3D | AnimationObjectGroup): void;

	/**
	 * Deallocates all memory resources for an action. Before using this method make sure to call [AnimationAction.stop](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationAction.stop)() to deactivate the action.
	 */
	uncacheAction(clip: AnimationClip, root?: Object3D | AnimationObjectGroup): void;
}

/**
 * A group of objects that receives a shared animation state.
 * For an overview of the different elements of the three.js animation system see the "Animation System" article in the "Next Steps" section of the manual.
 *
 * Usage :
 * Add objects you would otherwise pass as 'root' to the constructor or the [clipAction](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationMixer.clipAction)
 * method of [AnimationMixer](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationMixer) and instead pass this object as 'root'.
 * Note that objects of this class appear as one object to the mixer, so cache control of the individual objects must be done	on the group.
 *
 * Limitations :
 * The animated properties must be compatible among all objects in the group.
 * A single property can either be controlled through a target group or directly, but not both.
 */
export interface AnimationObjectGroup {
	/**
	 * @param args an abitrary number of meshes that share the same animation state.
	 */
	new (...args: any[]): this;

	/**
	 * The [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier) of this *AnimationObjectGroup*. It gets automatically assigned and shouldn't be edited.
	 */
	uuid: string;

	/**
	 * An object that contains some informations of this *AnimationObjectGroup* (total number, number in use, number of bindings per object)
	 */
	stats: {
		bindingsPerObject: number;
		objects: {
			total: number;
			inUse: number;
		};
	};

	readonly isAnimationObjectGroup: true;

	/**
	 * Adds an arbitrary number of objects to this *AnimationObjectGroup*.
	 */
	add(...args: any[]): void;

	/**
	 * Removes an arbitrary number of objects from this *AnimationObjectGroup*.
	 */
	remove(...args: any[]): void;

	/**
	 * Deallocates all memory resources for the passed objects of this *AnimationObjectGroup*.
	 */
	uncache(...args: any[]): void;
}

/**
 * An object with various functions to assist with animations, used internally.
 */
export interface AnimationUtils {
	/**
	 * This is the same as  Array.prototype.slice, but also works on typed arrays.
	 */
	arraySlice(array: any, from: number, to: number): any;

	/**
	 * Converts an array to a specific type.
	 */
	convertArray(array: any, type: any, forceClone: boolean): any;

	/**
	 * @returns Returns *true* if the object is a typed array.
	 */
	isTypedArray(object: any): boolean;

	/**
	 * @returns Returns an array by which times and values can be sorted.
	 */
	getKeyFrameOrder(times: number[]): number[];

	/**
	 * Sorts the array previously returned by [getKeyframeOrder](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationUtils.getKeyframeOrder).
	 */
	sortedArray(values: any[], stride: number, order: number[]): any[];

	/**
	 * Used for parsing AOS keyframe formats.
	 */
	flattenJSON(jsonKeys: string[], times: any[], values: any[], valuePropertyName: string): void;

	/**
	 * Creates a new clip, containing only the segment of the original clip between the given frames.
	 */
	subclip(sourceClip: AnimationClip, name: string, startFrame: number, endFrame: number, fps?: number): AnimationClip;

	/**
	 * Converts the keyframes of the given animation clip to an additive format.
	 */
	makeClipAdditive(
		targetClip: AnimationClip,
		referenceFrame?: number,
		referenceClip?: AnimationClip,
		fps?: number
	): AnimationClip;
}

/**
 * A KeyframeTrack is a timed sequence of [keyframes](https://en.wikipedia.org/wiki/Key_frame), which are composed of lists of times and related values, and which are used to animate a specific property of an object.
 * For an overview of the different elements of the three.js animation system see the "Animation System" article in the "Next Steps" section of the manual.
 * In contrast to the animation hierarchy of the [JSON model format](https://github.com/mrdoob/three.js/wiki/JSON-Model-format-3) a *KeyframeTrack* doesn't store its single keyframes as objects in a "keys" array (holding the times and the values for each frame together in one place).
 * Instead of this there are always two arrays in a *KeyframeTrack*: the *.times* array stores the time values for all keyframes of this track in sequential order, and the *.values* array contains the corresponding changing values of the animated property.
 * A single value, belonging to a certain point of time, can not only be a simple number, but (for example) a vector (if a position is animated) or a quaternion (if a rotation is animated). For this reason the values array (which is a flat array, too) might be three or four times as long as the times array.
 * Corresponding to the different possible types of animated values there are several subclasses of *KeyframeTrack*, inheriting the most properties and methods:
 *
 * [BooleanKeyframeTrack](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BooleanKeyframeTrack)
 * [ColorKeyframeTrack](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ColorKeyframeTrack)
 * [NumberKeyframeTrack](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NumberKeyframeTrack)
 * [QuaternionKeyframeTrack](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/QuaternionKeyframeTrack)
 * [StringKeyframeTrack](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/StringKeyframeTrack)
 * [VectorKeyframeTrack](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/VectorKeyframeTrack)
 *
 * Some examples of how to manually create [AnimationClips](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationClip) with different sorts of KeyframeTracks can be found in the [AnimationClipCreator](https://threejs.org/examples/jsm/animation/AnimationClipCreator.js) file.
 * Since explicit values are only specified for the discrete points of time stored in the times array, all values in between have to be interpolated.
 * The track's name is important for the connection of this track with a specific property of the animated node (done by [PropertyBinding](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PropertyBinding)).
 */
export interface KeyframeTrack {
	/**
	 * @param name The identifier for the *KeyframeTrack*.
	 * @param times an array with the values related to the times array, converted internally to aa [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array).
	 * @param interpolation The type of interpolation to use. See [Animation Constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation) for possible values. Default is [InterpolateLinear](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation).
	 */
	new (name: string, times: ArrayLike<any>, values: ArrayLike<any>, interpolation?: InterpolationModes): this;

	/**
	 * The track's name can refer to  morph targets or [bones](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SkinnedMesh) or possibly other values within an animated object. See [PropertyBinding.parseTrackName](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PropertyBinding.parseTrackName) for the forms of strings that can be parsed for property binding:
	 * The name can specify the node either using its name or its uuid (although it needs to be in the subtree of the scene graph node passed into the mixer). Or, if the track name starts with a dot, the track applies to the root node that was passed into the mixer.
	 * Usually after the node a property will be specified directly. But you can also specify a subproperty, such as .rotation[x], if you just want to drive the X component of the rotation via a float track.
	 * You can also specify bones or multimaterials by using an object name, for example: .bones[R_hand].scale; the red channel of the diffuse color of the fourth material in a materials array - as a further example - can be accessed with .materials[3].diffuse[r].
	 * PropertyBinding will also resolve morph target names, for example: .morphTargetInfluences[run].
	 * Note: The track's name does not necessarily have to be unique. Multiple tracks can drive the same property. The result should be based on a weighted blend between the multiple tracks according to the weights of their respective actions.
	 */
	name: string;

	/**
	 * A [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array), converted from the times array which is passed in the constructor.
	 */
	times: Float32Array;

	/**
	 * A [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array), converted from the values array which is passed in the constructor.
	 */
	values: Float32Array;

	/**
	 * The default interpolation type: [InterpolateLinear](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation).
	 */
	ValueTypeName: string;

	/**
	 * [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array), the type of the buffer internally used for the times.
	 */
	TimeBufferType: Float32Array;

	/**
	 * [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array), the type of the buffer internally used for the values.
	 */
	ValueBufferType: Float32Array;

	/**
	 * @default THREE.InterpolateLinear
	 */
	DefaultInterpolation: InterpolationModes;

	/**
	 * Creates a new [DiscreteInterpolant](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DiscreteInterpolant) from the [times](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/KeyframeTrack.times) and [values](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/KeyframeTrack.times). A Float32Array can be passed which will receive the results. Otherwise a new array with the appropriate size will be created automatically.
	 */
	InterpolantFactoryMethodDiscrete(result: any): DiscreteInterpolant;

	/**
	 * Creates a new [LinearInterpolant](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LinearInterpolant) from the [times](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/KeyframeTrack.times) and [values](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/KeyframeTrack.times). A Float32Array can be passed which will receive the results. Otherwise a new array with the appropriate size will be created automatically.
	 */
	InterpolantFactoryMethodLinear(result: any): LinearInterpolant;

	/**
	 * Create a new [CubicInterpolant](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubicInterpolant) from the [times](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/KeyframeTrack.times) and [values](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/KeyframeTrack.times). A Float32Array can be passed which will receive the results. Otherwise a new array with the appropriate size will be created automatically.
	 */
	InterpolantFactoryMethodSmooth(result: any): CubicInterpolant;

	/**
	 * Sets the interpolation type. See [Animation Constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation) for choices.
	 */
	setInterpolation(interpolation: InterpolationModes): KeyframeTrack;

	/**
	 * Creates a [LinearInterpolant](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LinearInterpolant), [CubicInterpolant](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubicInterpolant) or [DiscreteInterpolant](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DiscreteInterpolant), depending on the value of the interpolation parameter passed in the constructor.
	 */
	createInterpolant(): InterpolationModes;

	/**
	 * @returns Returns the interpolation type.
	 */
	getInterpolation(): InterpolationModes;

	/**
	 * @returns Returns the size of each value (that is the length of the *.values* array divided by the length of the *.times* array).
	 */
	getValueSize(): number;

	/**
	 * Moves all keyframes either forward or backward in time.
	 */
	shift(timeOffset: number): KeyframeTrack;

	/**
	 * Scales all keyframe times by a factor.
	 * Note: This is useful, for example, for conversions to a certain rate of frames per seconds (as it is done internally by [animationClip.CreateFromMorphTargetSequence](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationClip.CreateFromMorphTargetSequence)).
	 */
	scale(timeScale: number): KeyframeTrack;

	/**
	 * Removes keyframes before *startTime* and after *endTime*, without changing any values within the range [*startTime*, *endTime*].
	 */
	trim(startTime: number, endTime: number): KeyframeTrack;

	/**
	 * Performs minimal validation on the tracks. Returns true if valid.
	 * This method logs errors to the console, if a track is empty, if the *.valueSize* is not valid, if an item in the *.times* or *.values* array is not a valid number or if the items in the *times* array are out of order.
	 */
	validate(): boolean;

	/**
	 * Removes equivalent sequential keys, which are common in morph target sequences.
	 */
	optimize(): KeyframeTrack;

	/**
	 * @returns Returns a copy of this track.
	 */
	clone(): this;

	/**
	 * Converts the track to JSON.
	 * @static
	 */
	toJSON(track: KeyframeTrack): any;
}

/**
 */
export interface ParseTrackNameResults {
	/**
	 */
	nodeName: string;

	/**
	 */
	objectName: string;

	/**
	 */
	objectIndex: string;

	/**
	 */
	propertyName: string;

	/**
	 */
	propertyIndex: string;
}

/**
 * This holds a reference to a real property in the scene graph; used internally.
 */
export interface PropertyBinding {
	/**
	 * @param rootNode
	 * @param path
	 * @param parsedPath
	 */
	new (rootNode: any, path: string, parsedPath?: any): this;

	/**
	 */
	path: string;

	/**
	 */
	parsedPath: any;

	/**
	 */
	node: any;

	/**
	 */
	rootNode: any;

	/**
	 */
	getValue(targetArray: any, offset: number): any;

	/**
	 */
	setValue(sourceArray: any, offset: number): void;

	/**
	 * Create getter / setter pair for a property in the scene graph. Used internally by [getValue](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PropertyBinding.getValue) and [setValue](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PropertyBinding.setValue).
	 */
	bind(): void;

	/**
	 * Unbind getter / setter pair for a property in the scene graph.
	 */
	unbind(): void;

	/**
	 */
	BindingType: { [bindingType: string]: number };

	/**
	 */
	Versioning: { [versioning: string]: number };

	/**
	 */
	GetterByBindingType: Array<() => void>;

	/**
	 */
	SetterByBindingTypeAndVersioning: Array<Array<() => void>>;

	/**
	 * Create a new Composite PropertyBinding (if root is an [AnimationObjectGroup](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AnimationObjectGroup)) or PropertyBinding.
	 */
	create(root: any, path: any, parsedPath?: any): PropertyBinding | PropertyBindingComposite;

	/**
	 */
	sanitizeNodeName(name: string): string;

	/**
	 * Matches strings in the following forms:
	 */
	parseTrackName(trackName: string): ParseTrackNameResults;

	/**
	 * Find a node in a node tree or [Skeleton](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Skeleton).
	 */
	findNode(root: any, nodeName: string): any;
}

/**
 * Create a new Composite PropertyBinding.
 */
export interface PropertyBindingComposite {
	/**
	 */
	new (targetGroup: any, path: any, parsedPath?: any): this;

	/**
	 */
	getValue(array: any, offset: number): any;

	/**
	 */
	setValue(array: any, offset: number): void;

	/**
	 * Create getter / setter pair for a property in the scene graph. Used internally by [getValue](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PropertyBinding.getValue) and [setValue](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PropertyBinding.setValue).
	 */
	bind(): void;

	/**
	 * Unbind getter / setter pair for a property in the scene graph.
	 */
	unbind(): void;
}

/**
 * Buffered scene graph property that allows weighted accumulation; used internally.
 */
export interface PropertyMixer {
	/**
	 */
	new (binding: any, typeName: string, valueSize: number): this;

	/**
	 */
	binding: any;

	/**
	 */
	valueSize: number;

	/**
	 * Buffer with size [valueSize](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PropertyMixer) * 4.
	 * This has the layout: [ incoming | accu0 | accu1 | orig ]
	 * Interpolators can use .buffer as their .result and the data then goes to 'incoming'.
	 * 'accu0' and 'accu1' are used frame-interleaved for the cumulative result and are compared to detect changes. 'orig' stores the original state of the property.
	 */
	buffer: any;

	/**
	 * Default is *0*.
	 */
	cumulativeWeight: number;

	/**
	 */
	cumulativeWeightAdditive: number;

	/**
	 * Default is *0*.
	 */
	useCount: number;

	/**
	 * Default is *0*.
	 */
	referenceCount: number;

	/**
	 * Accumulate data in [buffer](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PropertyMixer.buffer)[accuIndex] 'incoming' region into 'accu[i]'.
	 * If weight is *0* this does nothing.
	 */
	accumulate(accuIndex: number, weight: number): void;

	/**
	 */
	accumulateAdditive(weight: number): void;

	/**
	 * Apply the state of [buffer](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PropertyMixer.buffer) 'accu[i]' to the binding when accus differ.
	 */
	apply(accuIndex: number): void;

	/**
	 * Remember the state of the bound property and copy it to both accus.
	 */
	saveOriginalState(): void;

	/**
	 * Apply the state previously taken via 'saveOriginalState' to the binding.
	 */
	restoreOriginalState(): void;
}

/**
 * A Track of boolean keyframe values.
 */
export interface BooleanKeyframeTrack extends KeyframeTrack {
	/**
	 * @param name identifier for the KeyframeTrack.
	 * @param times array of keyframe times.
	 * @param values values for the keyframes at the times specified.
	 */
	new (name: string, times: any[], values: any[]): this;

	/**
	 * @default 'bool'
	 */
	ValueTypeName: string;
}

/**
 * A Track of keyframe values that represent color changes.
 * The very basic implementation of this subclass has nothing special yet. However, this is the place for color space parameterization.
 */
export interface ColorKeyframeTrack extends KeyframeTrack {
	/**
	 * @param name identifier for the KeyframeTrack.
	 * @param times array of keyframe times.
	 * @param values values for the keyframes at the times specified, a flat array of color components between 0 and 1.
	 * @param interpolation The type of interpolation to use. See [Animation Constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation) for possible values. Default is [InterpolateLinear](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation).
	 */
	new (name: string, times: any[], values: any[], interpolation?: InterpolationModes): this;

	/**
	 * @default 'color'
	 */
	ValueTypeName: string;
}

/**
 * A Track of numeric keyframe values.
 */
export interface NumberKeyframeTrack extends KeyframeTrack {
	/**
	 * @param name identifier for the KeyframeTrack.
	 * @param times array of keyframe times.
	 * @param values values for the keyframes at the times specified.
	 * @param interpolation The type of interpolation to use. See [Animation Constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation) for possible values. Default is [InterpolateLinear](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation).
	 */
	new (name: string, times: any[], values: any[], interpolation?: InterpolationModes): this;

	/**
	 * @default 'number'
	 */
	ValueTypeName: string;
}

/**
 * A Track of quaternion keyframe values.
 */
export interface QuaternionKeyframeTrack extends KeyframeTrack {
	/**
	 * @param name identifier for the KeyframeTrack.
	 * @param times array of keyframe times.
	 * @param values values for the keyframes at the times specified, a flat array of quaternion components.
	 * @param interpolation The type of interpolation to use. See [Animation Constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation) for possible values. Default is [InterpolateLinear](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation).
	 */
	new (name: string, times: any[], values: any[], interpolation?: InterpolationModes): this;

	/**
	 * @default 'quaternion'
	 */
	ValueTypeName: string;
}

/**
 * A Track of string keyframe values.
 */
export interface StringKeyframeTrack extends KeyframeTrack {
	/**
	 * @param name identifier for the KeyframeTrack.
	 * @param times array of keyframe times.
	 * @param values values for the keyframes at the times specified.
	 * @param interpolation The type of interpolation to use. See [Animation Constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation) for possible values. Default is [InterpolateDiscrete](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation).
	 */
	new (name: string, times: any[], values: any[], interpolation?: InterpolationModes): this;

	/**
	 * @default 'string'
	 */
	ValueTypeName: string;
}

/**
 * A Track of vector keyframe values.
 */
export interface VectorKeyframeTrack extends KeyframeTrack {
	/**
	 * @param name identifier for the KeyframeTrack.
	 * @param times array of keyframe times.
	 * @param values values for the keyframes at the times specified, a flat array of vector components.
	 * @param interpolation The type of interpolation to use. See [Animation Constants](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation) for possible values. Default is [InterpolateLinear](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Animation).
	 */
	new (name: string, times: any[], values: any[], interpolation?: InterpolationModes): this;

	/**
	 * @default 'vector'
	 */
	ValueTypeName: string;
}
