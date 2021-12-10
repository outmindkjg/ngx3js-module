import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import * as I3JS from '../threejs-library/three-interface';

/**
 * The Keyframe component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/KeyframeComponent) page for details.
 *
 * ```html
 * <ngx3js-clip [duration]="3" [name]="'default'">
 * 	<ngx3js-keyframe
 * 		[type]="'quaternion'"
 * 		[times]="[0, 1, 2]"
 * 		[quaternions]="[
 * 			{ x: 0, y: 0, z: 0 },
 * 			{ x: 180, y: 0, z: 0 },
 * 			{ x: 0, y: 0, z: 0 }
 * 		]"
 * 	></ngx3js-keyframe>
 *	<ngx3js-keyframe
 *		[type]="'position'"
 *		[times]="[0, 1, 2]"
 *		[vectors]="[0, 0, 0, 30, 0, 0, 0, 0, 0]"
 *	></ngx3js-keyframe>
 *	<ngx3js-keyframe
 *		[type]="'scale'"
 *		[times]="[0, 1, 2]"
 *		[vectors]="[1, 1, 1, 2, 2, 2, 1, 1, 1]"
 *	></ngx3js-keyframe>
 *	<ngx3js-keyframe
 *		[type]="'quaternion'"
 *		[times]="[0, 1, 2]"
 *		[quaternions]="[
 *			{ x: 0, y: 0, z: 0 },
 *			{ x: 180, y: 0, z: 0 },
 *			{ x: 0, y: 0, z: 0 }
 *		]"
 *	></ngx3js-keyframe>
 *	<ngx3js-keyframe
 *		[type]="'color'"
 *		[times]="[0, 1, 2]"
 *		[colors]="['0xff0000', '0x00ff00', '0x0000ff']"
 *		[interpolation]="'InterpolateDiscrete'"
 *	></ngx3js-keyframe>
 *	<ngx3js-keyframe
 *		[type]="'opacity'"
 *		[times]="[0, 1, 2]"
 *		[values]="[1, 0, 1]"
 *	></ngx3js-keyframe>
 * </ngx3js-clip>
 * ```
 *
 * @see THREE.KeyframeTrack
 */
@Component({
	selector: 'ngx3js-keyframe',
	templateUrl: './keyframe.component.html',
	styleUrls: ['./keyframe.component.scss'],
})
export class KeyframeComponent
	extends AbstractSubscribeComponent
	implements OnInit
{
	/**
	 * identifier for the KeyframeTrack
	 *
	 * material.opacity - The material opacity
	 * material.color - The material color
	 */
	@Input() public name: string = '';

	/**
	 * identifier for the KeyframeTrack
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.VectorKeyframeTrack  - position - The position of object3d
	 * @see THREE.VectorKeyframeTrack  - scale - The scale of object3d
	 * @see THREE.QuaternionKeyframeTrack  - quaternion - The quaternion of object3d
	 * @see THREE.ColorKeyframeTrack  - color - The color of material
	 * @see THREE.ColorKeyframeTrack  - specular - The specular of material
	 * @see THREE.ColorKeyframeTrack  - emissive - The emissive of material
	 * @see THREE.ColorKeyframeTrack  - sheen - The sheen of material
	 * @see THREE.NumberKeyframeTrack  - shininess - The shininess of material
	 * @see THREE.NumberKeyframeTrack  - opacity - The opacity of material
	 * @see THREE.NumberKeyframeTrack  - reflectivity - The reflectivity of material
	 * @see THREE.BooleanKeyframeTrack  - transparent - The transparent of material
	 * @see THREE.BooleanKeyframeTrack  - wireframe - The wireframe of material
	 * @see THREE.VectorKeyframeTrack  - Vector, VectorKeyframe, VectorKeyframeTrack - The Vector of object3d
	 * @see THREE.QuaternionKeyframeTrack  - Quaternion, QuaternionKeyframe, QuaternionKeyframeTrack  - The quaternion of object3d
	 * @see THREE.ColorKeyframeTrack  - Color, ColorKeyframe, ColorKeyframeTrack - The Color of object3d
	 * @see THREE.NumberKeyframeTrack  - Number, NumberKeyframe, NumberKeyframeTrack - The Number of object3d
	 * @see THREE.BooleanKeyframeTrack  - Boolean, BooleanKeyframe, BooleanKeyframeTrack - The Boolean of object3d
	 */
	@Input() public type: string = '';

	/**
	 * (required) array of keyframe times.
	 */
	@Input() public times: number[] = null;

	/**
	 * values for the keyframes at the times specified.
	 */
	@Input() public vectors: number[] | { x: number; y: number; z: number }[] =
		[];

	/**
	 * values for the keyframes at the times specified.
	 */
	@Input() public quaternions:
		| number[]
		| { x: number; y: number; z: number; w?: number }[] = [];

	/**
	 * values for the keyframes at the times specified.
	 */
	@Input() public colors:
		| number[]
		| { r: number; g: number; b: number }[]
		| string[] = [];

	/**
	 * values for the keyframes at the times specified.
	 */
	@Input() public values: number[] = [];

	/**
	 * values for the keyframes at the times specified.
	 */
	@Input() public booleans: boolean[] | number[] = [];

	/**
	 * the type of interpolation to use. See
	 *
	 * @see THREE.InterpolateDiscrete - InterpolateDiscrete, Discrete
	 * @see THREE.InterpolateLinear - InterpolateLinear, Linear
	 * @see THREE.InterpolateSmooth - InterpolateSmooth, Smooth
	 *
	 */
	@Input() public interpolation: string = '';

	/**
	 * Creates an instance of keyframe component.
	 *
	 *
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('keyframe');
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
		if (changes && this.keyframe) {
			this.addChanges(changes);
		}
	}

	/**
	 * Gets vectors
	 * @param size
	 * @returns vectors
	 */
	private getVectors(size: number): number[] {
		const vectors: number[] = [];
		this.vectors.forEach((v) => {
			if (typeof v === 'number') {
				vectors.push(v);
			} else {
				vectors.push(v.x, v.y, v.z);
			}
		});
		return this.checkSize(vectors, size * 3, 0);
	}

	/**
	 * Gets quaternions
	 * @param size
	 * @returns quaternions
	 */
	private getQuaternions(size: number): number[] {
		const quaternions: number[] = [];
		const tmpQuaternion = new THREE.Quaternion();
		this.quaternions.forEach((v) => {
			if (typeof v === 'number') {
				quaternions.push(v);
			} else if (ThreeUtil.isNotNull(v.w)) {
				quaternions.push(v.x, v.y, v.z, v.w);
			} else {
				tmpQuaternion.setFromEuler(ThreeUtil.getEulerSafe(v.x, v.y, v.z));
				quaternions.push(
					tmpQuaternion.x,
					tmpQuaternion.y,
					tmpQuaternion.z,
					tmpQuaternion.w
				);
			}
		});
		return this.checkSize(quaternions, size * 4, 0);
	}

	/**
	 * Gets colors
	 * @param size
	 * @returns colors
	 */
	private getColors(size: number): number[] {
		const colors: number[] = [];
		this.colors.forEach((v) => {
			if (typeof v === 'number' || typeof v === 'string') {
				const tmp = ThreeUtil.getColorSafe(v, 0x000000);
				colors.push(tmp.r, tmp.g, tmp.b);
			} else {
				colors.push(v.r, v.g, v.b);
			}
		});
		return this.checkSize(colors, size * 3, 0);
	}

	/**
	 * Gets values
	 * @param size
	 * @returns values
	 */
	private getValues(size: number): number[] {
		const values: number[] = [];
		this.values.forEach((v) => {
			values.push(v);
		});
		return this.checkSize(values, size, 0);
	}

	/**
	 * Gets booleans
	 * @param size
	 * @returns booleans
	 */
	private getBooleans(size: number): boolean[] {
		const booleans: boolean[] = [];
		this.booleans.forEach((v) => {
			if (typeof v === 'boolean') {
				booleans.push(v);
			} else {
				booleans.push(v > 0);
			}
		});
		return this.checkSize(booleans, size, true);
	}

	/**
	 * Checks size
	 * @template T
	 * @param values
	 * @param size
	 * @param def
	 * @returns size
	 */
	private checkSize<T>(values: T[], size: number, def: T): T[] {
		const remind = size - values.length;
		if (remind > 0) {
			for (let i = 0; i < remind; i++) {
				values.push(def);
			}
		} else if (remind < 0) {
			for (let i = 0; i < remind * -1; i++) {
				values.pop();
			}
		}
		return values;
	}

	/**
	 * The Clip of keyframe component
	 */
	private clip: I3JS.IAnimationClip = null;

	/**
	 * Sets clip
	 * @param clip
	 */
	public setClip(clip: I3JS.IAnimationClip) {
		if (this.clip !== clip) {
			this.clip = clip;
			this.getKeyframe();
		}
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		if (this.keyframe !== null) {
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getKeyframe();
				return;
			}
			if (!ThreeUtil.isOnlyIndexOf(changes, ['init'], this.OBJECT_ATTR)) {
				this.needUpdate = true;
				return;
			}
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, ['mixer']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'mixer':
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	/**
	 * The Keyframe of keyframe component
	 */
	private keyframe: I3JS.IKeyframeTrack = null;

	/**
	 * Gets keyframe
	 * @returns keyframe
	 */
	public getKeyframe(): I3JS.IKeyframeTrack {
		if (this.clip !== null && (this.keyframe === null || this._needUpdate)) {
			this.needUpdate = false;
			if (this.keyframe !== null) {
				const idx = this.clip.tracks.indexOf(this.keyframe);
				if (idx > -1) {
					this.clip.tracks.splice(idx, 1);
				}
			}
			const times: number[] = ThreeUtil.getTypeSafe(this.times, [0, 1, 2]);
			const interpolation: THREE.InterpolationModes = ThreeUtil.getInterpolationSafe(this.interpolation);
			switch (this.type.toLowerCase()) {
				case 'position':
					this.keyframe = new THREE.VectorKeyframeTrack(
						'.position',
						times,
						this.getVectors(times.length),
						interpolation
					);
					break;
				case 'scale':
					this.keyframe = new THREE.VectorKeyframeTrack(
						'.scale',
						times,
						this.getVectors(times.length),
						interpolation
					);
					break;
				case 'quaternion':
					this.keyframe = new THREE.QuaternionKeyframeTrack(
						'.quaternion',
						times,
						this.getQuaternions(times.length),
						interpolation
					);
					break;
				case 'color':
				case 'specular':
				case 'emissive':
				case 'sheen':
					this.keyframe = new THREE.ColorKeyframeTrack(
						'.material.' + this.type.toLowerCase(),
						times,
						this.getColors(times.length),
						interpolation
					);
					break;
				case 'shininess':
				case 'opacity':
				case 'reflectivity':
					this.keyframe = new THREE.NumberKeyframeTrack(
						'.material.' + this.type.toLowerCase(),
						times,
						this.getValues(times.length),
						interpolation
					);
					break;
				case 'transparent':
				case 'wireframe':
					this.keyframe = new THREE.BooleanKeyframeTrack(
						'.material.' + this.type.toLowerCase(),
						times,
						this.getBooleans(times.length)
					);
					break;
				case 'string':
					// this.keyframe = new THREE.StringKeyframeTrack('.material.opacity', times, values, interpolation);
					break;
				case 'vector':
				case 'vectorkeyframe':
				case 'vectorkeyframetrack':
					this.keyframe = new THREE.VectorKeyframeTrack(
						'.' + ThreeUtil.getTypeSafe(this.name, 'position'),
						times,
						this.getVectors(times.length),
						interpolation
					);
					break;
				case 'quaternion':
				case 'quaternionkeyframe':
				case 'quaternionkeyframetrack':
					this.keyframe = new THREE.QuaternionKeyframeTrack(
						'.' + ThreeUtil.getTypeSafe(this.name, 'quaternion'),
						times,
						this.getQuaternions(times.length),
						interpolation
					);
					break;
				case 'color':
				case 'colorkeyframe':
				case 'colorkeyframetrack':
					this.keyframe = new THREE.ColorKeyframeTrack(
						'.' + ThreeUtil.getTypeSafe(this.name, 'quaternion'),
						times,
						this.getColors(times.length),
						interpolation
					);
					break;
				case 'number':
				case 'numberkeyframe':
				case 'numberkeyframetrack':
					this.keyframe = new THREE.NumberKeyframeTrack(
						'.' + ThreeUtil.getTypeSafe(this.name, 'opacity'),
						times,
						this.getValues(times.length),
						interpolation
					);
					break;
				case 'boolean':
				case 'booleankeyframe':
				case 'booleankeyframetrack':
					this.keyframe = new THREE.BooleanKeyframeTrack(
						'.' + ThreeUtil.getTypeSafe(this.name, 'transparent'),
						times,
						this.getBooleans(times.length)
					);
					break;
			}
			this.clip.tracks.push(this.keyframe);
			this.setObject(this.keyframe);
		}
		return this.keyframe;
	}
}
