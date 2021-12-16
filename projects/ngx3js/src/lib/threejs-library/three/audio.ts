import { Object3D } from './core';

// Extras / Audio /////////////////////////////////////////////////////////////////////

export interface Audio<NodeType extends AudioNode = GainNode> extends Object3D {
	new (listener: AudioListener): this;
	type: 'Audio';

	listener: AudioListener;
	context: AudioContext;
	gain: GainNode;

	/**
	 * @default false
	 */
	autoplay: boolean;
	buffer: null | AudioBuffer;

	/**
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
	 * @default 0
	 */
	offset: number;

	/**
	 * @default undefined
	 */
	duration: number | undefined;

	/**
	 * @default 1
	 */
	playbackRate: number;

	/**
	 * @default false
	 */
	isPlaying: boolean;

	/**
	 * @default true
	 */
	hasPlaybackControl: boolean;

	/**
	 * @default 'empty'
	 */
	sourceType: string;
	source: null | AudioBufferSourceNode;

	/**
	 * @default []
	 */
	filters: AudioNode[];

	getOutput(): NodeType;
	setNodeSource(audioNode: AudioBufferSourceNode): this;
	setMediaElementSource(mediaElement: HTMLMediaElement): this;
	setMediaStreamSource(mediaStream: MediaStream): this;
	setBuffer(audioBuffer: AudioBuffer): this;
	play(delay?: number): this;
	onEnded(): void;
	pause(): this;
	stop(): this;
	connect(): this;
	disconnect(): this;
	setDetune(value: number): this;
	getDetune(): number;
	getFilters(): AudioNode[];
	setFilters(value: AudioNode[]): this;
	getFilter(): AudioNode;
	setFilter(filter: AudioNode): this;
	setPlaybackRate(value: number): this;
	getPlaybackRate(): number;
	getLoop(): boolean;
	setLoop(value: boolean): this;
	setLoopStart(value: number): this;
	setLoopEnd(value: number): this;
	getVolume(): number;
	setVolume(value: number): this;
	/**
	 * @deprecated Use {@link AudioLoader} instead.
	 */
	load(file: string): Audio;
}

export interface AudioAnalyser {
	/**
	 * @param audio
	 * @param [fftSize=2048]
	 */
	new (audio: Audio<AudioNode>, fftSize?: number): this;

	analyser: AnalyserNode;
	data: Uint8Array;

	getFrequencyData(): Uint8Array;
	getAverageFrequency(): number;

	/**
	 * @deprecated Use {@link AudioAnalyser#getFrequencyData .getFrequencyData()} instead.
	 */
	getData(file: any): any;
}
/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/audio/AudioContext.js|src/audio/AudioContext.js}
 */
export interface AudioContext {
	getContext(): AudioContext;

	setContext(): void;

	createOscillator(): OscillatorNode;

	readonly currentTime: number;
	readonly destination: AudioDestinationNode;
	readonly listener: AudioListener;
	readonly sampleRate: number;
	readonly state: any;
}

export interface AudioListener extends Object3D {
	new (): this;

	type: 'AudioListener';
	context: AudioContext;
	gain: GainNode;

	/**
	 * @default null
	 */
	filter: any;

	/**
	 * @default 0
	 */
	timeDelta: number;

	getInput(): GainNode;
	removeFilter(): this;
	setFilter(value: any): this;
	getFilter(): any;
	setMasterVolume(value: number): this;
	getMasterVolume(): number;
	updateMatrixWorld(force?: boolean): void;
}

export interface PositionalAudio extends Audio<PannerNode> {
	new (listener: AudioListener): this;

	panner: PannerNode;

	getOutput(): PannerNode;
	setRefDistance(value: number): this;
	getRefDistance(): number;
	setRolloffFactor(value: number): this;
	getRolloffFactor(): number;
	setDistanceModel(value: string): this;
	getDistanceModel(): string;
	setMaxDistance(value: number): this;
	getMaxDistance(): number;
	setDirectionalCone(coneInnerAngle: number, coneOuterAngle: number, coneOuterGain: number): this;
	updateMatrixWorld(force?: boolean): void;
}
