import {
	Component,
	forwardRef,
	Input,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { I3JS } from '../threejs-library/three-interface';

/**
 * The Audio component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AudioComponent) page for details.
 *
 * Create a ( global ) audio object.
 *
 * This uses the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).
 *
 * ```html
 * <ngx3-audio
 * 	[type]="'audio'"
 * 	[url]="'sounds/376737_Skullbeatz___Bad_Cat_Maste.mp3'"
 * 	[refDistance]="1" [coneInnerAngle]="180 "
 * 	[coneOuterAngle]="230" [cconeOuterGain]="0.1"
 * ></ngx3-audio>
 * <ngx3js-audio
 * 	[type]="'audio'" [url]="'sounds/Project_Utopia.ogg'"
 * 	[volume]="0.5" [loop]="true" [autoplay]="true"
 * ></ngx3js-audio>
 * <ngx3js-audio
 * 	[type]="'PositionalAudio'" [url]="'sounds/358232_j_s_song.ogg'"
 * 	[refDistance]="20" [autoplay]="true"
 * ></ngx3js-audio>
 * <ngx3js-audio
 * 	[type]="'PositionalAudio'" [urlType]="'listener'" [volume]="0.5 "
 * 	[refDistance]="20"
 * ></ngx3js-audio>
 * ```
 * @see THREE.PositionalAudio - PositionalAudio, Positional, Position
 * @see THREE.Audio - Audio
 */
@Component({
	selector: 'ngx3js-audio',
	templateUrl: './audio.component.html',
	styleUrls: ['./audio.component.scss'],
	providers: [
		{
			provide: AbstractObject3dComponent,
			useExisting: forwardRef(() => AudioComponent),
		},
		{
			provide: AbstractSubscribeComponent,
			useExisting: forwardRef(() => AudioComponent),
		},
	],
})
export class AudioComponent
	extends AbstractObject3dComponent
	implements OnInit
{
	/**
	 * The type  of audio component
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.PositionalAudio - PositionalAudio, Positional, Position
	 * @see THREE.Audio - Audio
	 *
	 */
	@Input() public type: string = 'position';

	/**
	 * The Audio/Video Url
	 */
	@Input() public url: any = null;

	/**
	 * The Url Type
	 *
	 * Notice - case insensitive.
	 * audio, video, listener, auto,
	 */
	@Input() public urlType: string = 'auto';

	/**
	 * Whether to start playback automatically. Default is *false*.
	 */
	@Input() public autoplay: boolean = true;

	/**
	 * Setup the [source](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/audio/Audio.source) to the audioBuffer, and sets [sourceType](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/audio/Audio.sourceType) to 'buffer'.
	 * If [autoplay](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/audio/Audio.autoplay), also starts playback.
	 */
	@Input() public play: boolean = true;

	/**
	 * Set [source.loop](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loop) to *value*
	 * (whether playback should loop).
	 */
	@Input() public loop: boolean = true;

	/**
	 * Set the volume.
	 */
	@Input() public volume: number = null;

	/**
	 * Sets the value of [panner.refDistance](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/refDistance).
	 */
	@Input() public refDistance: number = null;

	/**
	 * Sets the value of [panner.rolloffFactor](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/rolloffFactor).
	 */
	@Input() public rolloffFactor: number = null;

	/**
	 * Sets the value of [panner.distanceModel](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/distanceModel).
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public distanceModel: string = null; // "exponential" | "inverse" | "linear"

	/**
	 * Sets the value of [panner.maxDistance](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/maxDistance).
	 */
	@Input() public maxDistance: number = null;

	/**
	 * This method can be used in order to transform an omnidirectional sound into a [directional sound](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode).
	 */
	@Input() public coneInnerAngle: number = null;

	/**
	 * This method can be used in order to transform an omnidirectional sound into a [directional sound](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode).
	 */
	@Input() public coneOuterAngle: number = null;

	/**
	 * This method can be used in order to transform an omnidirectional sound into a [directional sound](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode).
	 */
	@Input() public coneOuterGain: number = 1;

	/**
	 * A non-zero power of two up to 2048, representing the size of the FFT (Fast Fourier Transform) to be used to determine the frequency domain.
	 * See [this page](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize) for details.
	 */
	@Input() public fftSize: number = 128;

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('audio');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.audio !== null) {
			if (this.audio.source !== null) {
				this.audio.stop();
			}
			if (this.video !== null) {
				this.video.pause();
			}
		}
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
		if (changes && this.audio) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
	}

	/**
	 * The Audio of audio component
	 */
	private audio: I3JS.IAudio<any> = null;

	/**
	 * The Video of audio component
	 */
	private video: HTMLVideoElement = null;

	/**
	 * The Listener of audio component
	 */
	private listener: I3JS.IAudioListener = null;

	/**
	 * The Analyser of audio component
	 */
	private analyser: I3JS.IAudioAnalyser = null;

	/**
	 * Audio loader of audio component
	 */
	private static audioLoader: I3JS.IAudioLoader = null;

	/**
	 * Loads audio
	 * @param url
	 * @param onLoad
	 */
	private loadAudio(url: string, onLoad: (audioBuffer: AudioBuffer) => void) {
		AudioComponent.loadAudio(url, onLoad);
	}

	/**
	 * Loads audio
	 * @param url
	 * @param onLoad
	 */
	public static loadAudio(
		url: string,
		onLoad: (audioBuffer: AudioBuffer) => void
	) {
		if (this.audioLoader === null) {
			this.audioLoader = new THREE.AudioLoader(ThreeUtil.getLoadingManager()) as any;
		}
		this.audioLoader.load(url, (audioBuffer: AudioBuffer): void => {
			onLoad(audioBuffer);
		});
	}

	/**
	 * The Renderer of audio component
	 */
	private _renderer: any = null;

	/**
	 * Sets listener
	 * @param listener
	 * @param renderer
	 */
	public setListener(listener: I3JS.IAudioListener, renderer: any) {
		if (this.listener !== listener) {
			this.listener = listener;
			this._renderer = renderer;
			this.addChanges('listener');
		}
	}

	/**
	 * Gets listener
	 * @returns listener
	 */
	private getListener(): I3JS.IAudioListener {
		if (this.listener !== null) {
			return this.listener;
		} else {
			return new THREE.AudioListener();
		}
	}

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: I3JS.IObject3D): boolean {
		if (super.setParent(parent)) {
			this.getAudio();
			return true;
		}
		return false;
	}

	/**
	 * Loaded video texture of audio component
	 */
	private loadedVideoTexture: I3JS.IVideoTexture = null;

	/**
	 * Loaded audio texture of audio component
	 */
	private loadedAudioTexture: I3JS.IDataTexture = null;

	/**
	 * Gets texture
	 * @returns texture
	 */
	public getTexture(): I3JS.ITexture {
		this.getAudio();
		if (this.video !== null) {
			if (this.loadedVideoTexture === null) {
				this.loadedVideoTexture = new THREE.VideoTexture(this.video);
			}
			return this.loadedVideoTexture;
		} else if (ThreeUtil.isNotNull(this.url)) {
			this.getAudio();
			const analyser = this.getAnalyser();
			let data: Uint8Array = null;
			let fftSize = 128;
			if (analyser !== null) {
				data = analyser.getFrequencyData();
				fftSize = analyser.analyser.fftSize;
			} else {
				data = new Uint8Array();
				fftSize = this.fftSize;
			}
			if (this.loadedAudioTexture === null) {
				this.loadedAudioTexture = new THREE.DataTexture(
					data,
					fftSize / 2,
					1,
					THREE.RedFormat
				);
			} else {
				(this.loadedAudioTexture.image as any) = {
					data: data,
					width: fftSize / 2,
					height: 1,
				};
				this.loadedAudioTexture.needsUpdate = true;
				this.setSubscribeNext('needsUpdate');
			}
			return this.loadedAudioTexture;
		}
		return new THREE.DataTexture(null, 1, 1);
	}

	/**
	 * Updates audio component
	 */
	public update() {
		if (this.loadedAudioTexture !== null && this.analyser !== null) {
			this.analyser.getFrequencyData();
			this.loadedAudioTexture.needsUpdate = true;
			this.setSubscribeNext('needsUpdate');
		}
	}

	/**
	 * Loaded url of audio component
	 */
	private loadedUrl: string = null;

	/**
	 * Gets analyser
	 * @param [fftSize] A non-zero power of two up to 2048, representing the size of the FFT (Fast Fourier Transform) to be used to determine the frequency domain.
	 *                  See [this page](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize) for details.
	 * @returns analyser
	 */
	public getAnalyser(fftSize?: number): I3JS.IAudioAnalyser {
		if (this.analyser === null && this.audio !== null) {
			this.analyser = new THREE.AudioAnalyser(
				this.audio,
				fftSize || this.fftSize
			);
		}
		return this.analyser;
	}

	/**
	 * Number analyser of audio component
	 */
	private _numberAnalyser: () => number = null;

	/**
	 * Gets number
	 * @returns number
	 */
	public getNumber(): () => number {
		this._numberAnalyser = () => {
			if (this.analyser !== null) {
				return this.analyser.getAverageFrequency() / 256;
			}
			return 0;
		};
		return this._numberAnalyser;
	}

	/**
	 * Applys changes3d
	 * @param changes
	 */
	public applyChanges3d(changes: string[]) {
		if (this.audio !== null) {
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, [
					'volume',
					'loop',
					'url',
					'positionalaudio',
					'play',
					'autoplay',
				]);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'loaded':
						if (this._numberAnalyser !== null && this.analyser === null) {
							this.getAnalyser();
						}
						if (this.loadedAudioTexture !== null) {
							this.getTexture();
						}
						this.setSubscribeNext('loaded');
						break;
					case 'url':
						if (this.loadedUrl !== this.url) {
							this.loadedUrl = this.url;
							let urlType: string = 'audio';
							let audioUrl: string = null;
							switch (this.urlType.toLowerCase()) {
								case 'audio':
								case 'video':
									urlType = this.urlType.toLowerCase();
									break;
								case 'auto':
								default:
									if (typeof this.url === 'string') {
										const fileName = this.url.toLowerCase();
										if (
											fileName.endsWith('.mp4') ||
											fileName.endsWith('.m4v') ||
											fileName.endsWith('.f4v') ||
											fileName.endsWith('.mov') ||
											fileName.endsWith('.mpg') ||
											fileName.endsWith('.mpeg') ||
											fileName.endsWith('.mpeg4') ||
											fileName.endsWith('.wmv') ||
											fileName.endsWith('.avi') ||
											fileName.endsWith('.mkv') ||
											fileName.endsWith('.ogv')
										) {
											urlType = 'video';
										} else {
											urlType = 'audio';
										}
										audioUrl = this.url;
									} else {
										urlType = this.urlType;
									}
									break;
							}
							if (audioUrl !== null) {
								switch (urlType.toLowerCase()) {
									case 'audio':
										this.loadAudio(
											ThreeUtil.getStoreUrl(audioUrl),
											(buffer: AudioBuffer) => {
												this.audio.setBuffer(buffer);
												this.addChanges('loaded');
											}
										);
										break;
									case 'video':
										if (this.video !== null) {
											this.video = document.createElement('video');
											(this.video as any).playsInline = true;
										}
										this.audio.setMediaElementSource(this.video);
										break;
								}
							} else {
								if (this.url instanceof AudioBuffer) {
									this.audio.setBuffer(this.url);
								} else if (this.url instanceof MediaStream) {
									this.audio.setMediaStreamSource(this.url);
								} else if (this.url instanceof AudioBufferSourceNode) {
									this.audio.setNodeSource(this.url);
								} else if (this.url instanceof HTMLMediaElement) {
									this.audio.setMediaElementSource(this.url);
								} else {
									switch (urlType.toLowerCase()) {
										case 'listener':
											const oscillator =
												this.listener.context.createOscillator() as any;
											oscillator.type = 'sine';
											oscillator.frequency.setValueAtTime(
												144,
												this.audio.context.currentTime
											);
											oscillator.start(0);
											this.audio.setNodeSource(oscillator);
											break;
									}
								}
							}
						}
						break;
					case 'listener':
						const listener = this.getListener();
						if (this.audio.listener !== listener) {
							this.audio.listener = listener;
						}
						break;
					case 'loop':
						if (ThreeUtil.isNotNull(this.loop)) {
							this.audio.loop = this.loop;
						}
						break;
					case 'volume':
						if (ThreeUtil.isNotNull(this.volume)) {
							this.audio.setVolume(this.volume);
						}
						break;
					case 'positionalaudio':
						if (this.audio instanceof THREE.PositionalAudio) {
							if (ThreeUtil.isNotNull(this.refDistance)) {
								this.audio.setRefDistance(this.refDistance);
							}
							if (ThreeUtil.isNotNull(this.rolloffFactor)) {
								this.audio.setRolloffFactor(this.rolloffFactor);
							}
							if (ThreeUtil.isNotNull(this.distanceModel)) {
								this.audio.setDistanceModel(this.distanceModel);
							}
							if (ThreeUtil.isNotNull(this.maxDistance)) {
								this.audio.setMaxDistance(this.maxDistance);
							}
							if (
								ThreeUtil.isNotNull(this.coneInnerAngle) &&
								ThreeUtil.isNotNull(this.coneOuterAngle)
							) {
								this.audio.setDirectionalCone(
									ThreeUtil.getTypeSafe(this.coneInnerAngle, 0),
									ThreeUtil.getTypeSafe(this.coneOuterAngle, 360),
									ThreeUtil.getTypeSafe(this.coneOuterGain, 1)
								);
							}
						}
						break;
					case 'play':
						if (ThreeUtil.isNotNull(this.play) && this.audio.buffer !== null) {
							if (this.play) {
								if (!this.audio.isPlaying) {
									this.audio.play();
								}
							} else {
								if (this.audio.isPlaying) {
									this.audio.pause();
								}
							}
						}
						break;
					case 'autoplay':
						if (ThreeUtil.isNotNull(this.autoplay)) {
							this.audio.autoplay = this.autoplay;
						}
						break;
				}
			});
			super.applyChanges3d(changes);
		}
	}

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T>(): T {
		return this.getAudio() as any;
	}

	/**
	 * Gets audio
	 * @template T
	 * @returns audio
	 */
	public getAudio<T extends THREE.Audio>(): T {
		if (this.audio === null || this._needUpdate) {
			this.needUpdate = false;
			this.loadedVideoTexture = null;
			this.video = null;
			switch (this.type.toLowerCase()) {
				case 'audio':
					this.audio = new THREE.Audio(this.getListener());
					break;
				case 'positionalaudio':
				case 'positional':
				case 'position':
				default:
					this.audio = new THREE.PositionalAudio(this.getListener());
					break;
			}
			this.setObject3d(this.audio as any);
		}
		return this.audio as T;
	}
}
