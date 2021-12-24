import {
	Component,
	ContentChildren, forwardRef, Input,
	OnInit,
	QueryList,
	SimpleChanges
} from '@angular/core';
import { ICharacterControl, IRendererTimer } from '../ngx-interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxClipComponent } from './../clip/clip.component';
import { I3JS, N3JS, NgxThreeUtil } from './../interface';
import { NgxPhysicsComponent } from './../physics/physics.component';


/**
 * The Mixer component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MixerComponent) page for details.
 *
 * ```html
 * <ngx3js-mixer [action]="'default'">
 * 	<ngx3js-clip [name]="'default'" [index]="0"></ngx3js-clip>
 * </ngx3js-mixer>
 * <ngx3js-mixer
 * 	[action]="controls.animation"
 * 	[type]="'Character'"
 * 	[skin]="controls.skinIdx" [weapon]="controls.weaponIdx"
 * ></ngx3js-mixer>
 * <ngx3js-mixer
 * 	[type]="'MMDAnimationHelper'"
 * 	[mmdHelpers]="['iksolver', 'physics']"
 * 	[afterglow]="2.0" [gravity]="-9.8 * 10" [physics]="true"
 * 	(onLoad)="setMixer($event)"
 * ></ngx3js-mixer>
 * <ngx3js-mixer
 * 	[type]="'MMDAnimationHelper'"
 * 	[animationHelper]="animationHelper"
 * ></ngx3js-mixer>
 * <ngx3js-mixer
 * 	[type]="'MMDAnimationHelper'"
 * 	[afterglow]="2.0" [gravity]="-9.8 * 10" [physics]="true"
 * ></ngx3js-mixer>
 * <ngx3js-mixer [action]="'run'" [delayTime]="info.delay">
 * 	<ngx3js-clip [name]="'run'" [index]="0"></ngx3js-clip>
 * </ngx3js-mixer>
 * ```
 */
@Component({
	selector: 'ngx3js-mixer',
	templateUrl: './mixer.component.html',
	styleUrls: ['./mixer.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxMixerComponent),
		},
	],
})
export class NgxMixerComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The Input of mixer component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public type: string = 'mixer';

	/**
	 * The Input of mixer component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public action: string = '';

	/**
	 * The fps of mixer component
	 */
	@Input() public fps: number = null;

	/**
	 * Sets the duration for a single loop of this action (by adjusting [AnimationAction.timeScale](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/animation/AnimationAction.timeScale) and stopping any scheduled warping). This method can be chained.
	 */
	@Input() public duration: number = 0.5;

	/**
	 * Scaling factor for the [KeyframeTrack.time](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/animation/KeyframeTrack.time). A value of 0 causes the animation to pause. Negative values cause the animation to play backwards. Default is 1.
	 * Properties/methods concerning *timeScale* (respectively *time*)
	 */
	@Input() public timeScale: number = 1;

	/**
	 * The sync of mixer component
	 */
	@Input() public sync: boolean = null;

	/**
	 * The afterglow of mixer component
	 */
	@Input() public afterglow: number = null;

	/**
	 * The resetPhysicsOnLoop of mixer component
	 */
	@Input() public resetPhysicsOnLoop: boolean = null;

	/**
	 * The physics of mixer component
	 */
	@Input() public physics: boolean = null;

	/**
	 * The warmup of mixer component
	 */
	@Input() public warmup: number = null;

	/**
	 * The unitStep of mixer component
	 */
	@Input() public unitStep: number = null;

	/**
	 * The maxStepNum of mixer component
	 */
	@Input() public maxStepNum: number = null;

	/**
	 * The gravity of mixer component
	 */
	@Input() public gravity: number = null;

	/**
	 * The delayTime of mixer component
	 */
	@Input() public delayTime: number = null;

	/**
	 * The animationHelper of mixer component
	 */
	@Input() public animationHelper: NgxMixerComponent = null;

	/**
	 * The skin of mixer component
	 */
	@Input() public skin: number | string = null;

	/**
	 * The weapon of mixer component
	 */
	@Input() public weapon: number | string = null;

	/**
	 * The controls of mixer component
	 */
	@Input() public controls: ICharacterControl = null;

	/**
	 * The wireframe of mixer component
	 */
	@Input() public wireframe: boolean = null;

	/**
	 * The rate of MD2Character
	 *
	 * @see I3JS.MD2Character.setPlaybackRate
	 */
	@Input() public rate: number = null;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() public scale: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() public animationFPS: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() public transitionFrames: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() public maxSpeed: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() public maxReverseSpeed: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() public frontAcceleration: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() public backAcceleration: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() public frontDecceleration: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() public angularSpeed: number;

	/**
	 * The mmdHelpers of mixer component
	 */
	@Input() public mmdHelpers: string[] = null;

	/**
	 * Content children of mixer component
	 */
	@ContentChildren(NgxClipComponent, { descendants: false }) private clipList: QueryList<NgxClipComponent>;

	/**
	 * Gets fps
	 * @param [def]
	 * @returns fps
	 */
	private getFps(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.fps, def);
	}

	/**
	 * Gets time scale
	 * @param [def]
	 * @returns time scale
	 */
	private getTimeScale(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.timeScale, def);
	}

	/**
	 * Gets sync
	 * @param [def]
	 * @returns true if sync
	 */
	private getSync(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.sync, def);
	}

	/**
	 * Gets afterglow
	 * @param [def]
	 * @returns afterglow
	 */
	private getAfterglow(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.afterglow, def);
	}

	/**
	 * Gets reset physics on loop
	 * @param [def]
	 * @returns true if reset physics on loop
	 */
	private getResetPhysicsOnLoop(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.resetPhysicsOnLoop, def);
	}

	/**
	 * Gets physics
	 * @param [def]
	 * @returns true if physics
	 */
	private getPhysics(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.physics, def);
	}

	/**
	 * Gets delay time
	 * @param [def]
	 * @returns delay time
	 */
	private getDelayTime(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.delayTime, def);
	}

	/**
	 * Creates an instance of mixer component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('mixer');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.mixer !== null) {
			if (this.mixer instanceof N3JS.AnimationMixer) {
				this.mixer.stopAllAction();
			} else if (this.mixer instanceof N3JS.MD2Character) {
				this.mixer.mixer.stopAllAction();
			}
		}
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
		if (changes && this.mixer) {
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
	 * The Mixer of mixer component
	 */
	private mixer:
		| I3JS.AnimationMixer
		| I3JS.MD2Character
		| I3JS.MD2CharacterComplex
		| I3JS.MMDAnimationHelper = null;

	/**
	 * The Model of mixer component
	 */
	private model: I3JS.Object3D | I3JS.AnimationObjectGroup = null;

	/**
	 * The Clips of mixer component
	 */
	private clips: I3JS.AnimationClip[] | any = null;

	private oldLoaded: {
		refTarget: any;
		clips: any;
	} = { refTarget: null, clips: null };
	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(
		parent: I3JS.Object3D | I3JS.AnimationObjectGroup
	): boolean {
		if (
			super.setParent(parent) ||
			(parent instanceof N3JS.Object3D &&
				(this.oldLoaded.refTarget !== parent.userData.refTarget ||
					this.oldLoaded.clips !== parent.userData.clips))
		) {
			if (parent instanceof N3JS.Object3D) {
				this.oldLoaded.refTarget = parent.userData.refTarget;
				this.oldLoaded.clips = parent.userData.clips;
			} else {
				this.oldLoaded.refTarget = null;
				this.oldLoaded.clips = null;
			}
			this.unSubscribeRefer('mixerReset');
			this.subscribeRefer(
				'mixerReset',
				NgxThreeUtil.getSubscribe(
					this.parent,
					() => {
						this.checkModel(parent);
					},
					'loaded'
				)
			);
			this.checkModel(parent);
			return true;
		}
		return false;
	}

	/**
	 * Gets target
	 * @param [target]
	 * @returns target
	 */
	private getTarget(
		target?: I3JS.Object3D | I3JS.AnimationObjectGroup
	): I3JS.Object3D | I3JS.AnimationObjectGroup {
		let targetMesh: I3JS.Object3D | I3JS.AnimationObjectGroup = null;
		if (NgxThreeUtil.isNotNull(target)) {
			if (
				target instanceof N3JS.AnimationObjectGroup ||
				target instanceof N3JS.Object3D
			) {
				targetMesh = target;
			} else {
				targetMesh = NgxThreeUtil.getObject3d(target, false);
			}
		}
		if (
			NgxThreeUtil.isNotNull(targetMesh) &&
			targetMesh instanceof N3JS.Object3D &&
			NgxThreeUtil.isNotNull(targetMesh.userData.refTarget)
		) {
			targetMesh =
				NgxThreeUtil.getObject3d(targetMesh.userData.refTarget, false) ||
				targetMesh;
		}
		return targetMesh;
	}

	/**
	 * Checks model
	 * @param parent
	 */
	public checkModel(parent: I3JS.Object3D | I3JS.AnimationObjectGroup) {
		const model = this.getTarget(parent);
		if (NgxThreeUtil.isNotNull(model)) {
			if (model instanceof N3JS.Object3D) {
				const clips =
					parent instanceof N3JS.Object3D ? parent.userData.clips : null;
				this.setModel(model, clips);
			} else {
				this.setModel(model, null);
			}
		}
	}

	/**
	 * Sets model
	 * @param model
	 * @param clips
	 */
	private setModel(
		model: I3JS.Object3D | I3JS.AnimationObjectGroup,
		clips: I3JS.AnimationClip[] | any
	) {
		if (this.model !== model || this.clips !== clips) {
			this.model = model;
			this.clips = clips;
			this.mixer = null;
			if (this.debug && this.clips) {
				const clipsNames: any[] = [];
				if (this.clips.forEach) {
					this.clips.forEach((clip: any) => {
						clipsNames.push(clip.name);
					});
				} else if (
					this.clips.meshBody &&
					this.clips.meshBody.geometry &&
					this.clips.meshBody.geometry.animations
				) {
					this.clips.meshBody.geometry.animations.forEach((clip: any) => {
						clipsNames.push(clip.name);
					});
				}
				this.consoleLog('clips', clipsNames, 'info');
			}
			this.lastAction = null;
			this.getMixer();
		}
	}

	/**
	 * Last action of mixer component
	 */
	private lastAction: string = null;

	/**
	 * The Physics of mixer component
	 */
	private _physics: NgxPhysicsComponent = null;

	/**
	 * The Ammo of mixer component
	 */
	private _ammo: any = null;

	/**
	 * Sets physics
	 * @param physics
	 */
	public setPhysics(physics: NgxPhysicsComponent) {
		this._physics = physics;
		if (
			this._physics !== null &&
			this._physics !== undefined &&
			this.mixer instanceof N3JS.MMDAnimationHelper
		) {
			const _physics = this._physics.getPhysics();
			const helper = this.mixer;
			if (_physics !== null) {
				this._ammo = this._physics.getAmmo();
				this.synkAnimationHelper(helper);
			} else {
				this.unSubscribeRefer('physics');
				this.subscribeRefer(
					'physics',
					NgxThreeUtil.getSubscribe(
						this._physics,
						() => {
							this._ammo = this._physics.getAmmo();
							this.synkAnimationHelper(helper);
						},
						'physics'
					)
				);
			}
		}
	}

	/**
	 * Fades to action
	 * @param endAction
	 * @param [duration]
	 * @param [restoreAction]
	 * @param [restoreDuration]
	 */
	public fadeToAction(
		endAction: string,
		duration?: number,
		restoreAction?: string,
		restoreDuration?: number
	) {
		if (this.mixer !== null && this.mixer instanceof N3JS.AnimationMixer) {
			if (this.play(endAction, duration)) {
				const mixer = this.mixer;
				if (NgxThreeUtil.isNotNull(restoreAction)) {
					const listener = () => {
						mixer.removeEventListener('finished', listener);
						this.play(restoreAction, restoreDuration);
					};
					mixer.addEventListener('finished', listener);
				}
			}
		}
	}

	/**
	 * Determines whether added is
	 */
	private isAdded: boolean = false;

	/**
	 * Mmd animation helpers of mixer component
	 */
	private mmdAnimationHelpers: I3JS.Object3D[] = [];

	/**
	 * Gets mmd animation helper
	 * @returns mmd animation helper
	 */
	public getMmdAnimationHelper(): I3JS.MMDAnimationHelper {
		if (this.mixer instanceof N3JS.MMDAnimationHelper) {
			return this.mixer;
		} else {
			return null;
		}
	}

	/**
	 * Gets mmd animation helper object3 d
	 * @returns mmd animation helper object3 d
	 */
	public getMmdAnimationHelperObject3D(): I3JS.Object3D[] {
		return this.mmdAnimationHelpers;
	}

	/**
	 * Synks animation helper
	 * @param helper
	 */
	public synkAnimationHelper(helper: I3JS.MMDAnimationHelper) {
		if (helper !== null && !this.isAdded) {
			if (
				this.model instanceof N3JS.SkinnedMesh ||
				this.model instanceof N3JS.Camera
			) {
				if (
					NgxThreeUtil.isNotNull(this.clips) &&
					Array.isArray(this.clips) &&
					(this._ammo || this.getPhysics(false) == false)
				) {
					const skinnedMesh = this.model;
					const oldParent = skinnedMesh.parent;
					if (NgxThreeUtil.isNotNull(oldParent)) {
						skinnedMesh.parent.remove(skinnedMesh);
						skinnedMesh.parent = null;
					}
					this.clips.forEach((clip) => {
						helper.add(skinnedMesh, {
							animation: clip,
							physics: this.getPhysics(),
							// warmup: this.getWarmup(),
							// unitStep: this.getUnitStep(),
							// maxStepNum: this.getMaxStepNum(),
							// gravity: this.getGravity(),
							// gravity: -1000,
							// gravity : new THREE.Vector3(0,0,-90),
							// delayTime: this.getDelayTime()
						});
					});
					if (NgxThreeUtil.isNotNull(oldParent)) {
						oldParent.add(skinnedMesh);
					}
					this.mmdAnimationHelpers.forEach((mmdHelper) => {
						if (mmdHelper.parent) {
							mmdHelper.parent.remove(mmdHelper);
						}
					});
					this.mmdAnimationHelpers = [];
					if (NgxThreeUtil.isNotNull(this.mmdHelpers)) {
						let rootObject3d: I3JS.Object3D = skinnedMesh;
						while (rootObject3d.parent) {
							rootObject3d = rootObject3d.parent;
						}
						let objectsHelper: any = helper['objects'].get(skinnedMesh);
						this.mmdHelpers.forEach((mmdHelper) => {
							switch (mmdHelper.toLowerCase()) {
								case 'iksolver':
									if (objectsHelper.ikSolver) {
										this.mmdAnimationHelpers.push(
											objectsHelper.ikSolver.createHelper()
										);
									}
									break;
								case 'physics':
									if (objectsHelper.physics) {
										this.mmdAnimationHelpers.push(
											objectsHelper.physics.createHelper()
										);
									}
									break;
							}
						});
						this.mmdAnimationHelpers.forEach((mmdAnimationHelper) => {
							rootObject3d.add(mmdAnimationHelper);
						});
					}
					super.callOnLoad();
					this.isAdded = true;
				}
			} else if (this.model instanceof N3JS.Audio) {
				const audioMode = this.model;
				if (audioMode.buffer !== null) {
					helper.add(audioMode, {
						delayTime: this.getDelayTime(),
					});
				} else {
					this.subscribeRefer(
						'audioLoad',
						NgxThreeUtil.getSubscribe(
							audioMode,
							() => {
								helper.add(audioMode, {
									delayTime: this.getDelayTime(),
								});
							},
							'loaded'
						)
					);
				}
			}
		}
	}

	/**
	 * Applys changes
	 * @param changes
	 */
	public applyChanges(changes: string[]) {
		if (this.mixer !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getMixer();
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, [
					'timescale',
					'fps',
					'clip',
					'action',
					'weapon',
					'skin',
					'pos',
					'wireframe',
					'rate',
					'scale',
					'animationfps',
					'transitionframes',
					'maxspeed',
					'maxreversespeed',
					'frontacceleration',
					'backacceleration',
					'frontdecceleration',
					'angularspeed',
				]);
			}
			if (this.mixer instanceof N3JS.AnimationMixer) {
				const mixer = this.mixer;
				changes.forEach((change) => {
					switch (change.toLowerCase()) {
						case 'action':
							if (this.delayTime > 0) {
								window.setTimeout(() => {
									this.play(this.action.toLowerCase());
								}, this.delayTime);
							} else {
								this.play(this.action.toLowerCase());
							}
							break;
						case 'timescale':
							mixer.timeScale = this.getTimeScale(1);
							break;
						case 'clip':
							this.clipList.forEach((clip) => {
								clip.setMixer(mixer, this.clips, this.model);
							});
							break;
					}
				});
			} else if (
				this.mixer instanceof N3JS.MD2Character ||
				this.mixer instanceof N3JS.MD2CharacterComplex
			) {
				const character: any = this.mixer;
				changes.forEach((change) => {
					switch (change.toLowerCase()) {
						case 'action':
							if (this.lastAction !== this.action) {
								if (this.delayTime > 0) {
									window.setTimeout(() => {
										this.play(this.action);
									}, this.delayTime);
								} else {
									this.play(this.action);
								}
							}
							break;
						case 'weapon':
							if (
								NgxThreeUtil.isNotNull(this.weapon) &&
								NgxThreeUtil.isNotNull(character.weapons) &&
								character.weapons.length > 0
							) {
								let weapon: number = -1;
								const weapons = character.weapons;
								if (typeof this.weapon === 'string') {
									const weaponName = this.weapon.toLowerCase();
									character.weapons.forEach((mesh: any, idx: any) => {
										if (
											mesh.name !== null &&
											mesh.name.toLowerCase().startsWith(weaponName)
										) {
											weapon = idx;
										}
									});
								} else {
									weapon = this.weapon;
								}
								if (weapon > -1 && weapon < weapons.length) {
									character.setWeapon(weapon);
								}
							}
							break;
						case 'wireframe':
							if (NgxThreeUtil.isNotNull(this.wireframe)) {
								character.setWireframe(
									NgxThreeUtil.getTypeSafe(this.wireframe, false)
								);
							}
							break;
						case 'rate':
							if (NgxThreeUtil.isNotNull(this.rate)) {
								character.setPlaybackRate(NgxThreeUtil.getTypeSafe(this.rate, 1));
							}
							break;
						case 'skin':
							if (
								NgxThreeUtil.isNotNull(this.skin) &&
								character.skinsBody.length > 0
							) {
								let skin: number = -1;
								const skinsBody = character.skinsBody;
								if (typeof this.skin === 'string') {
									const skinName = this.skin.toLowerCase();
									skinsBody.forEach((texture: any, idx: any) => {
										if (
											texture.name !== null &&
											texture.name.toLowerCase().startsWith(skinName)
										) {
											skin = idx;
										}
									});
								} else {
									skin = this.skin;
								}
								if (skin > -1 && skin < skinsBody.length) {
									character.setSkin(skin);
								}
							}
							break;
						case 'controls':
							if (character instanceof N3JS.MD2CharacterComplex) {
								if (NgxThreeUtil.isNotNull(this.controls)) {
									character.controls = this.controls;
								}
							}
							break;
						case 'scale':
							if (NgxThreeUtil.isNotNull(this.scale)) {
								character.scale = this.scale;
							}
							break;
						case 'animationfps':
							if (NgxThreeUtil.isNotNull(this.animationFPS)) {
								character.animationFPS = this.animationFPS;
							}
							break;
						case 'transitionframes':
							if (
								NgxThreeUtil.isNotNull(this.maxSpeed) &&
								NgxThreeUtil.isNotNull(character['transitionFrames'])
							) {
								character['transitionFrames'] = this.transitionFrames;
							}
							break;
						case 'maxspeed':
							if (
								NgxThreeUtil.isNotNull(this.maxSpeed) &&
								NgxThreeUtil.isNotNull(character['maxSpeed'])
							) {
								character['maxSpeed'] = this.maxSpeed;
							}
							break;
						case 'maxreversespeed':
							if (
								NgxThreeUtil.isNotNull(this.maxReverseSpeed) &&
								NgxThreeUtil.isNotNull(character['maxReverseSpeed'])
							) {
								character['maxReverseSpeed'] = this.maxReverseSpeed;
							}
							break;
						case 'frontacceleration':
							if (
								NgxThreeUtil.isNotNull(this.frontAcceleration) &&
								NgxThreeUtil.isNotNull(character['frontAcceleration'])
							) {
								character['frontAcceleration'] = this.frontAcceleration;
							}
							break;
						case 'backacceleration':
							if (
								NgxThreeUtil.isNotNull(this.backAcceleration) &&
								NgxThreeUtil.isNotNull(character['backAcceleration'])
							) {
								character['backAcceleration'] = this.backAcceleration;
							}
							break;
						case 'frontdecceleration':
							if (
								NgxThreeUtil.isNotNull(this.frontDecceleration) &&
								NgxThreeUtil.isNotNull(character['frontDecceleration'])
							) {
								character['frontDecceleration'] = this.frontDecceleration;
							}
							break;
						case 'angularspeed':
							if (
								NgxThreeUtil.isNotNull(this.angularSpeed) &&
								NgxThreeUtil.isNotNull(character['angularSpeed'])
							) {
								character['angularSpeed'] = this.angularSpeed;
							}
							break;
					}
				});
			} else if (this.mixer instanceof N3JS.MMDAnimationHelper) {
				const helper = this.mixer;
				changes.forEach((change) => {
					switch (change.toLowerCase()) {
						case 'pose':
							if (this.model instanceof N3JS.SkinnedMesh) {
								helper.pose(this.model, null);
							}
							break;
					}
				});
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * Resets mixer
	 */
	public getMixer():
		| I3JS.AnimationMixer
		| I3JS.MD2Character
		| I3JS.MD2CharacterComplex
		| I3JS.MMDAnimationHelper {
		if (this.mixer === null || this._needUpdate) {
			this.needUpdate = false;
			let mixer:
				| I3JS.AnimationMixer
				| I3JS.MD2Character
				| I3JS.MD2CharacterComplex
				| I3JS.MMDAnimationHelper = null;
			this.lastPlayedClip = null;
			switch (this.type.toLowerCase()) {
				case 'mmd':
				case 'mmdanimation':
				case 'mmdanimationhelper':
					if (this.animationHelper === null) {
						const helper = new N3JS.MMDAnimationHelper({
							sync: this.getSync(),
							afterglow: this.getAfterglow(),
							resetPhysicsOnLoop: this.getResetPhysicsOnLoop(),
						});
						if (NgxThreeUtil.isNotNull(this.clips)) {
							this.synkAnimationHelper(helper);
							this.setSubscribeNext('animation');
						} else {
							this.subscribeRefer(
								'mmdLoad',
								NgxThreeUtil.getSubscribe(
									this.model,
									() => {
										this.synkAnimationHelper(helper);
										this.setSubscribeNext('animation');
									},
									'loaded'
								)
							);
						}
						mixer = helper;
					} else {
						this.unSubscribeRefer('animation');
						this.subscribeRefer(
							'animation',
							NgxThreeUtil.getSubscribe(
								this.animationHelper,
								() => {
									this.synkAnimationHelper(
										this.animationHelper.getMmdAnimationHelper()
									);
								},
								'animation'
							)
						);
						const helper = this.animationHelper.getMmdAnimationHelper();
						this.synkAnimationHelper(helper);
						mixer = helper;
					}
					break;
				case 'mixer':
					const animationMixer = new N3JS.AnimationMixer(this.model);
					animationMixer.timeScale = this.getTimeScale(1);
					mixer = animationMixer;
					break;
				case 'virtulous':
				default:
					if (this.clips !== null) {
						if (
							this.clips instanceof N3JS.MD2Character ||
							this.clips instanceof N3JS.MD2CharacterComplex
						) {
							mixer = this.clips;
							if (this.clips instanceof N3JS.MD2CharacterComplex) {
								mixer.controls = this.controls || {};
							}
						}
					}
					break;
			}
			this.mixer = mixer;
			this.setObject(mixer);
		}
		return this.mixer;
	}

	/**
	 * Last played clip of mixer component
	 */
	private lastPlayedClip: NgxClipComponent = null;

	/**
	 * Plays mixer component
	 * @param name
	 * @param [duration]
	 * @returns true if play
	 */
	public play(name: string, duration: number = this.duration): boolean {
		if (
			this.mixer !== null &&
			NgxThreeUtil.isNotNull(name) &&
			name !== '' &&
			this.mixer !== null
		) {
			if (this.mixer instanceof N3JS.AnimationMixer) {
				if (NgxThreeUtil.isNotNull(this.clipList) && this.clipList.length > 0) {
					duration = NgxThreeUtil.getTypeSafe(duration, this.duration);
					let foundAction: NgxClipComponent = null;
					this.clipList.forEach((clip) => {
						if (clip.isPlayable()) {
							clip.action.paused = false;
							if (clip.name.toLowerCase() === name.toLowerCase()) {
								foundAction = clip;
							}
						}
					});
					if (this.lastPlayedClip !== null) {
						if (foundAction !== null) {
							this.lastPlayedClip.crossFadeTo(foundAction, duration);
						} else {
							this.lastPlayedClip.fadeOut(duration);
						}
					} else if (foundAction !== null) {
						foundAction.play();
						// foundAction.fadeIn(duration);
					}
					if (foundAction !== null) {
						this.lastAction = name.toLowerCase();
						this.lastPlayedClip = foundAction;
					}
					return true;
				}
			} else if (
				this.mixer instanceof N3JS.MD2Character ||
				this.mixer instanceof N3JS.MD2CharacterComplex
			) {
				this.mixer.setAnimation(name);
				return true;
			}
		}
		return false;
	}

	/**
	 * Updates mixer component
	 * @param timer
	 */
	public update(timer: IRendererTimer) {
		if (NgxThreeUtil.isNotNull(this.mixer)) {
			if (this.mixer instanceof N3JS.MMDAnimationHelper) {
				this.mixer.update(timer.delta);
			} else if (this.mixer instanceof N3JS.AnimationMixer) {
				this.mixer.update(timer.delta);
			} else if (
				this.mixer instanceof N3JS.MD2Character ||
				this.mixer instanceof N3JS.MD2CharacterComplex
			) {
				this.mixer.update(timer.delta);
			}
		} else if (NgxThreeUtil.isNotNull(this.clips)) {
			if (NgxThreeUtil.isNotNull(this.clips.setTime)) {
				this.clips.setTime(timer.elapsedTime * this.timeScale);
			} else if (NgxThreeUtil.isNotNull(this.clips.update)) {
				try {
					this.clips.update(timer.delta * this.timeScale);
				} catch (ex) {}
			}
		}
	}
}
