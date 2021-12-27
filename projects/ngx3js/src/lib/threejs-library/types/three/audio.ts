import { Object3D } from './core';

/**
 * Create a non-positional ( global ) audio object.
 * This uses the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio) page for details.
 *
 * ### Examples
 * [webaudio / sandbox](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_sandbox) |
 * [webaudio / visualizer](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_visualizer)
 *
 * ### Code Example
 * ```js
 * //  create an AudioListener and add it to the camera
 * const listener = new THREE.AudioListener();
 * camera.add( listener );
 * //  create a global audio source
 * const sound = new THREE.Audio( listener );
 * //  load a sound and set it as the Audio object's buffer
 * const audioLoader = new THREE.AudioLoader();
 * audioLoader.load(
 * 	'sounds/ambient.ogg',
 * 	function( buffer ) {
 * 		sound.setBuffer( buffer );
 * 		sound.setLoop( true );
 * 		sound.setVolume( 0.5 );
 * 		sound.play();
 * 	}
 * );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-camera>
 * 	<ngx3js-listener></ngx3js-listener>
 * </ngx3js-camera>
 * <ngx3js-audio [url]="'sounds/ambient.ogg'" [volume]="0.5" [loop]="true" [play]="true"></ngx3js-audio>
 * ```
 *
 * @template NodeType
 */
export interface Audio<NodeType extends AudioNode = GainNode> extends Object3D {
	/**
	 * @param listener  AudioListener instance.
	 */
	new (listener: AudioListener): this;

	/**
	 * String denoting the type, set to 'Audio'.
	 */
	type: 'Audio';

	/**
	 * A reference to the listener object of this audio.
	 */
	listener: AudioListener;

	/**
	 * The [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) of the [listener](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AudioListener) given in the constructor.
	 */
	context: AudioContext;

	/**
	 * A [GainNode](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) created using [AudioContext.createGain](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createGain)().
	 */
	gain: GainNode;

	/**
	 * Whether to start playback automatically. Default is *false*.
	 * @default false
	 */
	autoplay: boolean;

	/**
	 */
	buffer: null | AudioBuffer;

	/**
	 * Modify pitch, measured in cents. +/- 100 is a semitone. +/- 1200 is an octave. Default is *0*.
	 * @default 0
	 */
	detune: number;

	/**
	 * @default false
	 */
	loop: boolean;

	/**
	 * @default 0
	 */
	loopStart: number;

	/**
	 * @default 0
	 */
	loopEnd: number;

	/**
	 * An offset to the time within the audio buffer that playback should begin. Same as the *offset* parameter of [AudioBufferSourceNode.start](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/start)(). Default is *0*.
	 * @default 0
	 */
	offset: number;

	/**
	 * Overrides the duration of the audio. Same as the *duration* parameter of [AudioBufferSourceNode.start](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/start)(). Default is *undefined* to play the whole buffer.
	 * @default undefined
	 */
	duration: number | undefined;

	/**
	 * Speed of playback. Default is *1*.
	 * @default 1
	 */
	playbackRate: number;

	/**
	 * Whether the audio is currently playing.
	 * @default false
	 */
	isPlaying: boolean;

	/**
	 * Whether playback can be controlled using the [play](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.play)(),
	 * [pause](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.pause)() etc. methods. Default is *true*.
	 * @default true
	 */
	hasPlaybackControl: boolean;

	/**
	 * Type of the audio source. Default is string 'empty'.
	 * @default 'empty'
	 */
	sourceType: string;

	/**
	 * An [AudioBufferSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode) created using [AudioContext.createBufferSource](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createBufferSource)().
	 */
	source: null | AudioBufferSourceNode;

	/**
	 * Represents an array of [AudioNodes](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode). Can be used to apply a variety of low-order filters to create more complex sound effects.
	 * In most cases, the array contains instances of [BiquadFilterNodes](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode). Filters are set via [Audio.setFilter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.setFilter) or [Audio.setFilters](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.setFilters).
	 * @default []
	 */
	filters: AudioNode[];

	/**
	 * @returns Return the [gainNode](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.gain).
	 */
	getOutput(): NodeType;

	/**
	 * Setup the [source](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.source) to the audioBuffer, and sets [sourceType](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.sourceType) to 'audioNode'.
	 * Also sets [hasPlaybackControl](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.hasPlaybackControl) to false.
	 */
	setNodeSource(audioNode: AudioBufferSourceNode | OscillatorNode): this;

	/**
	 * Applies the given object of type [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) as the source of this audio.
	 * Also sets [hasPlaybackControl](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.hasPlaybackControl) to false.
	 */
	setMediaElementSource(mediaElement: HTMLMediaElement): this;

	/**
	 * Applies the given object of type [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) as the source of this audio.
	 * Also sets [hasPlaybackControl](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.hasPlaybackControl) to false.
	 */
	setMediaStreamSource(mediaStream: MediaStream): this;

	/**
	 * Setup the [source](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.source) to the audioBuffer, and sets [sourceType](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.sourceType) to 'buffer'.
	 * If [autoplay](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.autoplay), also starts playback.
	 */
	setBuffer(audioBuffer: AudioBuffer): this;

	/**
	 * If [hasPlaybackControl](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.hasPlaybackControl) is true, starts playback.
	 */
	play(delay?: number): this;

	/**
	 * Called automatically when playback finished.
	 */
	onEnded(): void;

	/**
	 * If [hasPlaybackControl](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.hasPlaybackControl) is true, pauses playback.
	 */
	pause(): this;

	/**
	 * If [hasPlaybackControl](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.hasPlaybackControl) is enabled, stops playback.
	 */
	stop(): this;

	/**
	 * Connect to the [Audio.source](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.source). This is used internally on initialisation and when setting / removing filters.
	 */
	connect(): this;

	/**
	 * Disconnect from the [Audio.source](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.source). This is used internally when setting / removing filters.
	 */
	disconnect(): this;

	/**
	 */
	setDetune(value: number): this;

	/**
	 */
	getDetune(): number;

	/**
	 * @returns Returns the [filters](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.filters) array.
	 */
	getFilters(): AudioNode[];

	/**
	 * Applies an array of filter nodes to the audio.
	 * @param value arrays of filters.
	 */
	setFilters(value: AudioNode[]): this;

	/**
	 * @returns Returns the first element of the [filters](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.filters) array.
	 */
	getFilter(): AudioNode;

	/**
	 * Applies a single filter node to the audio.
	 */
	setFilter(filter: AudioNode): this;

	/**
	 * If [hasPlaybackControl](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.hasPlaybackControl) is enabled, set the [playbackRate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.playbackRate) to *value*.
	 */
	setPlaybackRate(value: number): this;

	/**
	 * @returns Return the value of [playbackRate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio.playbackRate).
	 */
	getPlaybackRate(): number;

	/**
	 * @returns Return the value of [source.loop](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loop) (whether playback should loop).
	 */
	getLoop(): boolean;

	/**
	 * Set [source.loop](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loop) to *value* (whether playback should loop).
	 */
	setLoop(value: boolean): this;

	/**
	 * Set [source.loopStart](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loopStart) to *value*.
	 */
	setLoopStart(value: number): this;

	/**
	 * Set [source.loopEnd](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loopEnd) to *value*.
	 */
	setLoopEnd(value: number): this;

	/**
	 * @returns Return the current volume.
	 */
	getVolume(): number;

	/**
	 * Set the volume.
	 */
	setVolume(value: number): this;
}

/**
 * Create a AudioAnalyser object, which uses an [AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode)
 * to analyse audio data.
 *
 * This uses the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AudioAnalyser) page for details.
 *
 * ### Examples
 * [webaudio / sandbox](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_sandbox) |
 * [webaudio / visualizer](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_visualizer)
 *
 * ### Code Example
 * ```js
 * //  create an AudioListener and add it to the camera
 * const listener = new THREE.AudioListener();
 * camera.add( listener );
 * //  create an Audio source
 * const sound = new THREE.Audio( listener );
 * //  load a sound and set it as the Audio object's buffer
 * const audioLoader = new THREE.AudioLoader();
 * audioLoader.load(
 * 	'sounds/ambient.ogg',
 * 	function( buffer ) {
 * 		sound.setBuffer( buffer );
 * 		sound.setLoop(true);
 * 		sound.setVolume(0.5);
 * 		sound.play();
 * 	}
 * );
 * //  create an AudioAnalyser, passing in the sound and desired fftSize
 * const analyser = new THREE.AudioAnalyser( sound, 32 );
 * //  get the average frequency of the sound
 * const data = analyser.getAverageFrequency();
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-camera>
 * 	<ngx3js-listener></ngx3js-listener>
 * </ngx3js-camera>
 * <ngx3js-audio [url]="'sounds/ambient.ogg'" [volume]="0.5" [loop]="true" [play]="true"></ngx3js-audio>
 * ```
 */
export interface AudioAnalyser {
	/**
	 * Create a new [AudioAnalyser](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AudioAnalyser).
	 * @param audio
	 * @param [fftSize=2048]
	 */
	new (audio: Audio<AudioNode>, fftSize?: number): this;

	/**
	 * An [AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode) used to analyze audio.
	 */
	analyser: AnalyserNode;

	/**
	 * A non-zero power of two up to 2048, representing the size of the FFT (Fast Fourier Transform) to be used to determine the frequency domain.
	 * See [this page](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize) for details.
	 */
	fftSize: number;

	/**
	 * A Uint8Array with size determined by [analyser.frequencyBinCount](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount) used to hold analysis data.
	 */
	data: Uint8Array;

	/**
	 * Uses the Web Audio's [getByteFrequencyData](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData) method.
	 * See that page.
	 */
	getFrequencyData(): Uint8Array;

	/**
	 * Get the average of the frequencies returned by the [getFrequencyData](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AudioAnalyser.getFrequencyData) method.
	 */
	getAverageFrequency(): number;
}

/**
 * This contains methods for setting up an [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext).
 * Used internally by the [AudioListener](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AudioListener) and [AudioLoader](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AudioLoader) classes.
 * This uses the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AudioContext) page for details.
 * 
 */
export interface AudioContext {
	/**
	 * @returns Return the value of the variable *context* in the outer scope, if defined, otherwise set it to a new [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext).
	 */
	getContext(): AudioContext;

	/**
	 *  Set the variable *context* in the outer scope to *value*.
	 */
	setContext(): void;

	/**
	 */
	createOscillator(): OscillatorNode;

	/**
	 */
	readonly currentTime: number;

	/**
	 */
	readonly destination: AudioDestinationNode;

	/**
	 */
	readonly listener: AudioListener;

	/**
	 */
	readonly sampleRate: number;

	/**
	 */
	readonly state: any;
}

/**
 * The AudioListener represents a virtual [listener](https://developer.mozilla.org/en-US/docs/Web/API/AudioListener) of the all positional and non-positional audio effects in the scene.
 * A three.js application usually creates a single instance of AudioListener. It is a mandatory construtor parameter for audios entities like [Audio](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Audio) and [PositionalAudio](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PositionalAudio).
 * In most cases, the listener object is a child of the camera. So the 3D transformation of the camera represents the 3D transformation of the listener.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AudioListener) page for details.
 *
 * ### Examples
 * [webaudio / sandbox](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_sandbox) |
 * [webaudio / timing](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_timing) |
 * [webaudio / visualizer](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_visualizer)
 *
 * ### Code Example
 * ```js
 * //  create an AudioListener and add it to the camera
 * const listener = new THREE.AudioListener();
 * camera.add( listener );
 * //  create a global audio source
 * const sound = new THREE.Audio( listener );
 * //  load a sound and set it as the Audio object's buffer
 * const audioLoader = new THREE.AudioLoader();
 * audioLoader.load(
 * 	'sounds/ambient.ogg',
 * 	function( buffer ) {
 * 		sound.setBuffer( buffer );
 * 		sound.setLoop(true);
 * 		sound.setVolume(0.5);
 * 		sound.play();
 * 	}
 * );
 * ```
 *
 * ### Ngx3Js Code Example
 * <ngx3js-camera>
 * 	<ngx3js-listener></ngx3js-listener>
 * </ngx3js-camera>
 * <ngx3js-audio [url]="'sounds/ambient.ogg'" [volume]="0.5" [loop]="true"></ngx3js-audio>
 * ```
 */
export interface AudioListener extends Object3D {
	/**
	 * Create a new AudioListener.
	 */
	new (): this;

	/**
	 */
	type: 'AudioListener';

	/**
	 * The [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) of the [listener](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AudioListener) given in the constructor.
	 */
	context: AudioContext;

	/**
	 * A [GainNode](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) created using [AudioContext.createGain](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createGain)().
	 */
	gain: GainNode;

	/**
	 * @default null
	 */
	filter: any;

	/**
	 * Time delta value for audio entities. Use in context of [AudioParam.linearRampToValueAtTimeDefault](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/linearRampToValueAtTime)(). Default is *0*.
	 * @default 0
	 */
	timeDelta: number;

	/**
	 * @returns Return the [gainNode](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AudioListener.gain).
	 */
	getInput(): GainNode;

	/**
	 * Set the [filter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AudioListener.filter) property to *null*.
	 */
	removeFilter(): this;

	/**
	 * Set the [filter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AudioListener.filter) property to *value*.
	 */
	setFilter(value: AudioNode): this;

	/**
	 * @returns Returns the value of the [filter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AudioListener.filter) property.
	 */
	getFilter(): AudioNode;

	/**
	 * Set the volume.
	 */
	setMasterVolume(value: number): this;

	/**
	 * @returns Return the volume.
	 */
	getMasterVolume(): number;

	/**
	 */
	updateMatrixWorld(force?: boolean): void;
}

/**
 * Create a positional audio object.
 * This uses the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PositionalAudio) page for details.
 *
 * ### Examples
 * [webaudio / orientation](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_orientation) |
 * [webaudio / sandbox](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_sandbox) |
 * [webaudio / timing](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_timing)
 *
 * ### Code Example
 * ```js
 * //  create an AudioListener and add it to the camera
 * const listener = new THREE.AudioListener();
 * camera.add( listener );
 * //  create the PositionalAudio object (passing in the listener)
 * const sound = new THREE.PositionalAudio( listener );
 * //  load a sound and set it as the PositionalAudio object's buffer
 * const audioLoader = new THREE.AudioLoader();
 * audioLoader.load(
 * 	'sounds/song.ogg',
 * 	function( buffer ) {
 * 		sound.setBuffer( buffer );
 * 		sound.setRefDistance( 20 );
 * 		sound.play();
 * 	}
 * );
 * //  create an object for the sound to play from
 * const sphere = new THREE.SphereGeometry( 20, 32, 16 );
 * const material = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
 * const mesh = new THREE.Mesh( sphere, material );
 * scene.add( mesh );
 * //  finally add the sound to the mesh
 * mesh.add( sound );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-camera>
 * 	<ngx3js-listener></ngx3js-listener>
 * </ngx3js-camera>
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'SphereGeometry'" [radius]="20" [widthSegments]="32" [heightSegments]="16"></ngx3js-geometry>
 * 	<ngx3js-audio [url]="'sounds/ambient.ogg'" [volume]="0.5" [loop]="true"></ngx3js-audio>
 * </ngx3js-mesh>
 * 
 * ```
 */
export interface PositionalAudio extends Audio<PannerNode> {
	/**
	 * @param listener AudioListener instance.
	 */
	new (listener: AudioListener): this;

	/**
	 * The PositionalAudio's [PannerNode](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode).
	 */
	panner: PannerNode;

	/**
	 * @returns Returns the [panner](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PositionalAudio.panner).
	 */
	getOutput(): PannerNode;

	/**
	 * Sets the value of [panner.refDistance](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/refDistance).
	 */
	setRefDistance(value: number): this;

	/**
	 * @returns Returns the value of [panner.refDistance](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/refDistance).
	 */
	getRefDistance(): number;

	/**
	 * Sets the value of [panner.rolloffFactor](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/rolloffFactor).
	 */
	setRolloffFactor(value: number): this;

	/**
	 * @returns Returns the value of [panner.rolloffFactor](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/rolloffFactor).
	 */
	getRolloffFactor(): number;

	/**
	 * Sets the value of [panner.distanceModel](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/distanceModel).
	 */
	setDistanceModel(value: string): this;

	/**
	 * @returns Returns the value of [panner.distanceModel](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/distanceModel).
	 */
	getDistanceModel(): string;

	/**
	 * Sets the value of [panner.maxDistance](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/maxDistance).
	 */
	setMaxDistance(value: number): this;

	/**
	 * @returns Returns the value of [panner.maxDistance](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/maxDistance).
	 */
	getMaxDistance(): number;

	/**
	 * This method can be used in order to transform an omnidirectional sound into a [directional sound](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode).
	 */
	setDirectionalCone(coneInnerAngle: number, coneOuterAngle: number, coneOuterGain: number): this;

	/**
	 */
	updateMatrixWorld(force?: boolean): void;
}
