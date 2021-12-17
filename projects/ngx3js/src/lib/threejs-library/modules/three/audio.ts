import {
	Audio as O3JS_Audio,
	AudioAnalyser as O3JS_AudioAnalyser,
	AudioContext as O3JS_AudioContext,
	AudioListener as O3JS_AudioListener,
	PositionalAudio as O3JS_PositionalAudio,
} from 'three';
import * as I3JS from '../../types/three/audio';

export type Audio = I3JS.Audio;
export const Audio: Audio = O3JS_Audio as any;

export type AudioAnalyser = I3JS.AudioAnalyser;
export const AudioAnalyser: AudioAnalyser = O3JS_AudioAnalyser as any;

export type AudioContext = I3JS.AudioContext;
export const AudioContext: AudioContext = O3JS_AudioContext as any;

export type AudioListener = I3JS.AudioListener;
export const AudioListener: AudioListener = O3JS_AudioListener as any;

export type PositionalAudio = I3JS.PositionalAudio;
export const PositionalAudio: PositionalAudio = O3JS_PositionalAudio as any;
