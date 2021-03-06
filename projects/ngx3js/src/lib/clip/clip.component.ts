import {
	Component,
	ContentChildren, forwardRef, Input,
	OnInit,
	QueryList,
	SimpleChanges
} from '@angular/core';
import { NgxKeyframeComponent } from '../keyframe/keyframe.component';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { I3JS, N3JS, NgxThreeUtil } from './../interface';

/**
 * The Clip component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxClipComponent) page for details.
 *
 * An AnimationClip is a reusable set of keyframe tracks which represent an animation.
 *
 * For an overview of the different elements of the three.js animation system see the "Animation System" article in the "Next Steps" section of the manual.
 *
 * ```html
 * <ngx3js-mixer [action]="'base'">
 * 	<ngx3js-clip [name]="'base'" [index]="0"></ngx3js-clip>
 * </ngx3js-mixer>
 * <ngx3js-mixer [action]="'Run'">
 * 	<ngx3js-clip [name]="'Run'"></ngx3js-clip>
 * </ngx3js-mixer>
 * ```
 */
@Component({
	selector: 'ngx3js-clip',
	templateUrl: './clip.component.html',
	styleUrls: ['./clip.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxClipComponent),
		},
	],
})
export class NgxClipComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit
{
	/**
	 * A name for this clip. A certain clip can be searched via [AnimationClip.findByName](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/animation/AnimationClip.findByName).
	 */
	@Input() public name: string = '';

	/**
	 * The index of clip component
	 */
	@Input() public index: number = -1;

	/**
	 * The blendMode of clip component
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.NormalAnimationBlendMode | NormalAnimationBlendMode, NormalAnimation, Normal |
	 * | THREE.AdditiveAnimationBlendMode | AdditiveAnimationBlendMode, AdditiveAnimation, Additive |
	 *
	 */
	@Input() public blendMode: string = '';

	/**
	 * makeClipAdditive
	 *
	 * @see THREE.AnimationUtils.makeClipAdditive
	 *
	 */
	@Input() public additive: boolean = false;

	/**
	 * subclip
	 *
	 * @see THREE.AnimationUtils.subclip
	 */
	@Input() public subclip: boolean = false;

	/**
	 * Creates a new clip, containing only the segment of the original clip between the given frames.
	 */
	@Input() public startFrame: number = 2;

	/**
	 * Creates a new clip, containing only the segment of the original clip between the given frames.
	 */
	@Input() public endFrame: number = 3;

	/**
	 * Creates a new clip, containing only the segment of the original clip between the given frames.
	 */
	@Input() public fps: number = null;

	/**
	 * The degree of influence of this action (in the interval [0, 1]). Values between 0 (no impact)
	 * and 1 (full impact) can be used to blend between several actions. Default is 1.
	 * Properties/methods concerning  *weight* are:
	 */
	@Input() public weight: number = 1;

	/**
	 * Scaling factor for the [AnimationClip.time](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/animation/AnimationClip.time). A value of 0 causes the animation to pause. Negative values cause the animation to play backwards. Default is 1.
	 */
	@Input() public timeScale: number = 1;

	/**
	 * The duration of this clip (in seconds). This can be calculated from the [AnimationClip.tracks](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/animation/AnimationClip.tracks) array via [AnimationClip.resetDuration](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/animation/AnimationClip.resetDuration).
	 */
	@Input() public duration: number = 3;

	/**
	 * If *clampWhenFinished* is set to true the animation will automatically be [AnimationClip.paused](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/animation/AnimationClip.paused) on its last frame.
	 * If *clampWhenFinished* is set to false, [AnimationClip.enabled](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/animation/AnimationClip.enabled) will automatically be switched to false when the last loop of the action has finished, so that this action has no further impact.
	 * Default is false.
	 * Note: *clampWhenFinished* has no impact if the action is interrupted (it has only an effect if its last loop has really finished).
	 */
	@Input() public clampWhenFinished: boolean = false;

	/**
	 * The looping mode (can be changed with [AnimationClip.setLoop](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/animation/AnimationClip.setLoop)). Default is [THREE.LoopRepeat](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/animation/Animation) (with an infinite number of [AnimationClip.repetitions](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/animation/AnimationClip.repetitions))
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.LoopOnce | LoopOnce, Once |
	 * | THREE.LoopRepeat | LoopRepeat, Repeat |
	 * | THREE.LoopPingPong | LoopPingPong, PingPong |
	 */
	@Input() public loop: string = null;

	/**
	 * The keyframe list of NgxKeyframeComponent
	 */
	@ContentChildren(NgxKeyframeComponent, { descendants: false }) private keyframeList: QueryList<NgxKeyframeComponent>;

	/**
	 * Gets fps
	 * @param [def]
	 * @returns fps
	 */
	private getFps(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.fps, def);
	}

	/**
	 * Gets clamp when finished
	 * @param [def]
	 * @returns true if clamp when finished
	 */
	private getClampWhenFinished(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.clampWhenFinished, def);
	}

	/**
	 * Creates an instance of clip component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('clip');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
		if (changes && this.clip) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(
			this.keyframeList,
			'keyframeList',
			'keyframe'
		);
		super.ngAfterContentInit();
	}

	/**
	 * The Mixer of clip component
	 */
	private mixer: I3JS.AnimationMixer = null;

	private model: any = null;

	/**
	 * The Clips of clip component
	 */
	private clips: I3JS.AnimationClip[] = null;

	/**
	 * The Clip of clip component
	 */
	private clip: I3JS.AnimationClip = null;

	/**
	 * The Action of clip component
	 */
	public action: I3JS.AnimationAction = null;

	/**
	 * Sets mixer
	 * @param mixer
	 * @param clips
	 * @param [fps]
	 */
	public setMixer(
		mixer: I3JS.AnimationMixer,
		clips: I3JS.AnimationClip[],
		model: any
	) {
		if (this.mixer !== mixer) {
			this.mixer = mixer;
			this.model = model;
			this.clips = clips || null;
			this.clip = null;
			this.action = null;
			this.getClip();
		}
	}

	/**
	 * Sets fps
	 * @param fps
	 */
	public setFps(fps: number) {
		if (this.action !== null && this.clip !== null) {
			const clipFps = this.getFps(fps);
			if (NgxThreeUtil.isNotNull(clipFps)) {
				this.action.timeScale =
					(this.clip.tracks.length * clipFps) / this.clip.duration;
			}
		}
	}

	/**
	 * Plays clip component
	 */
	public play() {
		if (this.action !== null && !this.additive) {
			this.action.play();
		}
	}

	/**
	 * Cross fade to
	 * @param [endAction]
	 * @param [duration]
	 */
	public crossFadeTo(endAction?: NgxClipComponent, duration?: number) {
		if (this.isPlayable()) {
			if (
				endAction !== null &&
				endAction !== undefined &&
				endAction.action !== null
			) {
				endAction.resetAction();
				this.action.crossFadeTo(endAction.action, duration, false).play();
			} else {
				this.fadeIn(duration);
			}
		}
	}

	/**
	 * Resets action
	 */
	public resetAction() {
		if (this.action !== null) {
			this.action.time = 0;
			this.action.enabled = true;
			// this.action.setEffectiveTimeScale( this.timeScale );
			// this.action.setEffectiveWeight( this.weight );
		}
	}

	/**
	 * Fades in
	 * @param [duration]
	 */
	public fadeIn(duration?: number) {
		if (this.isPlayable()) {
			this.resetAction();
			this.action.fadeIn(duration).play();
		}
	}

	/**
	 * Fades out
	 * @param [duration]
	 */
	public fadeOut(duration?: number) {
		if (this.isPlayable()) {
			this.action.fadeOut(duration).play();
		}
	}

	/**
	 * Determines whether playable is
	 * @returns
	 */
	public isPlayable() {
		return this.clip !== null && this.action !== null && !this.additive;
	}

	/**
	 * Stops clip component
	 */
	public stop() {
		if (this.action !== null) {
			this.action.stop();
		}
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		if (this.clip !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getClip();
				return;
			}
			if (!NgxThreeUtil.isOnlyIndexOf(changes, ['init', 'weight','timescale'], this.OBJECT_ATTR)) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, ['weight', 'timescale']);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['weight', 'timescale'])) {
				changes = NgxThreeUtil.pushUniq(changes, ['weighttimescale']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'weighttimescale' :
						if (this.action !== null && NgxThreeUtil.isNotNull(this.weight)) {
							this.action.setEffectiveTimeScale(NgxThreeUtil.getTypeSafe(this.timeScale, 1));
							this.action.setEffectiveWeight(NgxThreeUtil.getTypeSafe(this.weight, 1))
						}
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	/**
	 * Gets object
	 * @returns object
	 */
	public getObject<T>(): T {
		return this.getClip() as any;
	}

	/**
	 * Gets clip
	 * @returns
	 */
	public getClip(): I3JS.AnimationClip {
		if (this.clip === null || this._needUpdate) {
			this.needUpdate = false;
			let clip: I3JS.AnimationClip = null;
			if (this.clips !== null) {
				if (this.index > -1 || NgxThreeUtil.isNotNull(this.name)) {
					clip =
						this.index > -1
							? this.clips[this.index]
							: N3JS.AnimationClip.findByName(this.clips, this.name);
				} else {
					clip = null;
				}
			} else {
				clip = new N3JS.AnimationClip(
					NgxThreeUtil.getTypeSafe(this.name, 'default'),
					this.duration,
					[],
					NgxThreeUtil.getBlendModeSafe(this.blendMode)
				);
			}
			if (clip !== null) {
				if (this.action !== null) {
					this.action.stop();
				}
				if (this.additive) {
					N3JS.AnimationUtils.makeClipAdditive(clip);
					if (this.subclip) {
						const subClip = N3JS.AnimationUtils.subclip(
							clip,
							clip.name,
							this.startFrame,
							this.endFrame,
							this.getFps()
						);
						this.action = this.mixer.clipAction(
							subClip,
							null,
							NgxThreeUtil.getBlendModeSafe(this.blendMode)
						);
						this.clip = subClip;
					} else {
						this.action = this.mixer.clipAction(
							clip,
							null,
							NgxThreeUtil.getBlendModeSafe(this.blendMode)
						);
						this.clip = clip;
					}
					this.action.enabled = true;
					this.action.setEffectiveTimeScale(this.timeScale);
					this.action.setEffectiveWeight(this.weight);
					this.action.play();
				} else {
					this.clip = clip;
					if (NgxThreeUtil.isNotNull(this.keyframeList)) {
						this.keyframeList.forEach((keyframe) => {
							keyframe.setClip(this.clip);
						});
					}
					if (
						this.model instanceof N3JS.Object3D ||
						this.model instanceof N3JS.AnimationObjectGroup
					) {
						this.action = this.mixer.clipAction(
							clip,
							this.model,
							NgxThreeUtil.getBlendModeSafe(this.blendMode)
						);
					} else {
						this.action = this.mixer.clipAction(
							clip,
							null,
							NgxThreeUtil.getBlendModeSafe(this.blendMode)
						);
					}
				}
				if (this.getClampWhenFinished(false)) {
					this.action.clampWhenFinished = true;
				}
				this.action.loop = NgxThreeUtil.getLoopSafe(this.loop, 'repeat');
			} else {
				this.action = null;
			}
			this.setObject(this.clip);
		}
		return this.clip;
	}
}
