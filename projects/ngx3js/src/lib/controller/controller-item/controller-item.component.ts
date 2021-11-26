import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CurvesNormal, CurveUtils } from '../../curve/curveUtils';
import { RendererTimer, ThreeColor, ThreeUtil } from '../../interface';
import { AbstractSubscribeComponent } from '../../subscribe.abstract';

/**
 * Control object item
 */
export interface ControlObjectItem {
	/**
	 *
	 */
	object3d?: THREE.Object3D;

	/**
	 *
	 */
	component?: any;

	/**
	 *
	 */
	position?: THREE.Vector3;

	/**
	 *
	 */
	rotation?: THREE.Euler;

	/**
	 *
	 */
	scale?: THREE.Vector3;

	/**
	 *
	 */
	material?: THREE.Material;

	/**
	 *
	 */
	uniforms?: { [uniform: string]: THREE.IUniform };

	/**
	 *
	 */
	geometry?: THREE.BufferGeometry;

	/**
	 *
	 */
	attributes?: {
		[name: string]: THREE.BufferAttribute | THREE.InterleavedBufferAttribute;
	};

	/**
	 *
	 */
	morphAttributes?: {
		[name: string]: (
			| THREE.BufferAttribute
			| THREE.InterleavedBufferAttribute
		)[];
	};
}

/**
 * The Controller Item component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ControllerItemComponent) page for details.
 *
 * ```html
 * <ngx3js-controller>
 * 	<ngx3js-controller-item
 * 		[refRate]="analyser1"
 * 		[type]="'material'"
 * 		[material]="'emissive'"
 * 		[colorType]="'rate'"
 * 	></ngx3js-controller-item>
 * </ngx3js-controller>
 * <ngx3js-controller>
 * 	<ngx3js-controller-item [type]="'autoupdate'"></ngx3js-controller-item>
 * </ngx3js-controller>
 * <ngx3js-controller [type]="'auto'">
 * 	<ngx3js-controller-item
 * 		[type]="'uniforms'"
 * 		[uniform]="'cameraPos'"
 * 		[valueType]="'copyposition'"
 * 		[refValue]="camera"
 * 	></ngx3js-controller-item>
 * </ngx3js-controller>
 * ```
 */
@Component({
	selector: 'ngx3js-controller-item',
	templateUrl: './controller-item.component.html',
	styleUrls: ['./controller-item.component.scss'],
})
export class ControllerItemComponent
	extends AbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The type of controller item component
	 */
	@Input() public type: string = 'position';

	/**
	 * The lookathead of controller item component
	 */
	@Input() public lookathead: number = null;

	/**
	 * The curve of controller item component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public curve: string = null;

	/**
	 * The scale of controller item component
	 */
	@Input() public scale: number = null;

	/**
	 * The radius of controller item component
	 */
	@Input() public radius: number = null;

	/**
	 * The radiusInner of controller item component
	 */
	@Input() public radiusInner: number = null;

	/**
	 * The radiusX of controller item component
	 */
	@Input() public radiusX: number = null;

	/**
	 * The radiusY of controller item component
	 */
	@Input() public radiusY: number = null;

	/**
	 * The radiusZ of controller item component
	 */
	@Input() public radiusZ: number = null;

	/**
	 * The rotation of controller item component
	 */
	@Input() public rotation: number = null;

	/**
	 * The rotationX of controller item component
	 */
	@Input() public rotationX: number = null;

	/**
	 * The rotationY of controller item component
	 */
	@Input() public rotationY: number = null;

	/**
	 * The rotationZ of controller item component
	 */
	@Input() public rotationZ: number = null;

	/**
	 * The center of controller item component
	 */
	@Input() public center: number = null;

	/**
	 * The centerX of controller item component
	 */
	@Input() public centerX: number = null;

	/**
	 * The centerY of controller item component
	 */
	@Input() public centerY: number = null;

	/**
	 * The centerZ of controller item component
	 */
	@Input() public centerZ: number = null;

	/**
	 * The duration of controller item component
	 */
	@Input() public duration: number = 1;

	/**
	 * The delta of controller item component
	 */
	@Input() public delta: number = null;

	/**
	 * The multiply of controller item component
	 */
	@Input() public multiply: number = null;

	/**
	 * The Input of controller item component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public options: string = null;

	/**
	 * The visible of controller item component
	 */
	@Input() public visible: boolean = null;

	/**
	 * The color of controller item component
	 */
	@Input() public color: ThreeColor = null;

	/**
	 * The opacity of controller item component
	 */
	@Input() public opacity: number = null;

	/**
	 * The tubularSegments of controller item component
	 */
	@Input() public tubularSegments: number = null;

	/**
	 * The tubeRadius of controller item component
	 */
	@Input() public tubeRadius: number = null;

	/**
	 * The tubeRadiusSegments of controller item component
	 */
	@Input() public tubeRadiusSegments: number = null;

	/**
	 * The closed of controller item component
	 */
	@Input() public closed: boolean = null;

	/**
	 * The material of controller item component
	 */
	@Input() public material: string = null;

	/**
	 * The uniform of controller item component
	 */
	@Input() public uniform: string = null;

	/**
	 * The wave of controller item component
	 */
	@Input() public wave: number = 0;

	/**
	 * The waveR of controller item component
	 */
	@Input() public waveR: number = 0;

	/**
	 * The waveH of controller item component
	 */
	@Input() public waveH: number = 0;

	/**
	 * The rate of controller item component
	 */
	@Input() public rate: number = 1;

	/**
	 * The rateX of controller item component
	 */
	@Input() public rateX: number = null;

	/**
	 * The rateY of controller item component
	 */
	@Input() public rateY: number = null;

	/**
	 * The rateZ of controller item component
	 */
	@Input() public rateZ: number = null;

	/**
	 * The Input of controller item component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public valueType: string = 'auto';

	/**
	 * The refValue of controller item component
	 */
	@Input() public refValue: any = null;

	/**
	 * The minValue of controller item component
	 */
	@Input() public minValue: number = 0;

	/**
	 * The maxValue of controller item component
	 */
	@Input() public maxValue: number = 1;

	/**
	 * The Input of controller item component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public colorType: string = 'rgb';

	/**
	 * The refRate of controller item component
	 */
	@Input() public refRate: any = null;

	/**
	 * Gets curve
	 * @returns curve
	 */
	private getCurve(): THREE.Curve<THREE.Vector3> {
		let curve: string = 'line';
		switch (this.type.toLowerCase()) {
			case 'tween':
				curve = ThreeUtil.getTypeSafe(this.curve, 'linearinout');
				break;
			case 'position':
			default:
				curve = ThreeUtil.getTypeSafe(this.curve, 'line');
				break;
		}
		return CurveUtils.getCurve(curve, 1, {
			radiusInner: ThreeUtil.getTypeSafe(this.radiusInner, 0),
			waveH: ThreeUtil.getTypeSafe(this.waveH, this.wave, 0),
			waveR: ThreeUtil.getTypeSafe(this.waveR, this.wave, 0),
			rateX: ThreeUtil.getTypeSafe(this.rateX, this.rate, 1),
			rateY: ThreeUtil.getTypeSafe(this.rateY, this.rate, 1),
			rateZ: ThreeUtil.getTypeSafe(this.rateZ, this.rate, 1),
		});
	}

	/**
	 * Creates an instance of controller item component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('controllerItem');
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
		if (changes && this._curve) {
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
	 * The Helper of controller item component
	 */
	private _helper: THREE.Object3D = null;

	/**
	 * Helper point of controller item component
	 */
	private _helperPoint: THREE.Object3D = null;

	/**
	 * The Curve of controller item component
	 */
	private _curve: CurvesNormal = null;

	/**
	 * The Lookat of controller item component
	 */
	private _lookat: boolean = false;

	/**
	 * The Duration of controller item component
	 */
	private _duration: number = 60;

	/**
	 * The Delta of controller item component
	 */
	private _delta: number = 60;

	/**
	 * The Parent of controller item component
	 */
	private _parent: THREE.Object3D;

	/**
	 * The Lookathead of controller item component
	 */
	private _lookathead: number = 0.05;

	/**
	 * Gets options
	 * @returns options
	 */
	private getOptions(): string {
		switch (this.type.toLowerCase()) {
			case 'tween':
				return ThreeUtil.getTypeSafe(this.options, '') + ',once';
			default:
				return ThreeUtil.getTypeSafe(this.options, 'yoyo');
		}
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		if (this._curve !== null && this._parent !== null) {
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getController(this._controlItem, this._parent);
				return;
			}
			if (!ThreeUtil.isOnlyIndexOf(changes, ['init', 'type', 'enabled'])) {
				this.needUpdate = true;
				return;
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * Gets object
	 * @returns
	 */
	public getObject<T>(): T {
		return this.getController(this._controlItem, this._parent) as any;
	}

	/**
	 * Control item of controller item component
	 */
	private _controlItem: ControlObjectItem = {};

	/**
	 * Rate call back of controller item component
	 */
	private _rateCallBack: (timer?: RendererTimer) => number = null;

	/**
	 * Gets controller
	 * @param controlItem
	 * @param parent
	 * @returns controller
	 */
	public getController(
		controlItem: ControlObjectItem,
		parent: THREE.Object3D
	): this {
		if (this._curve === null || this._needUpdate) {
			this._needUpdate = false;
			this._lookat = false;
			if (this._helper !== null && this._helper.parent === null) {
				this._helper.parent.remove(this._helper);
			}
			if (this._helperPoint !== null && this._helperPoint.parent === null) {
				this._helperPoint.parent.remove(this._helperPoint);
			}
			this._helper = null;
			this._helperPoint = null;
			this._rateCallBack = null;
			if (ThreeUtil.isNotNull(this.refRate)) {
				if (typeof this.refRate === 'function') {
					this._rateCallBack = this.refRate;
				} else if (ThreeUtil.isNotNull(this.refRate.getNumber)) {
					this._rateCallBack = this.refRate.getNumber();
				}
			}
			const curve = this.getCurve();
			let scale: THREE.Vector3 = ThreeUtil.getVector3Safe(
				ThreeUtil.getTypeSafe(this.radiusX, this.radius, 1),
				ThreeUtil.getTypeSafe(this.radiusY, this.radius, 1),
				ThreeUtil.getTypeSafe(this.radiusZ, this.radius, 1)
			);
			let rotation: THREE.Euler = ThreeUtil.getEulerSafe(
				ThreeUtil.getTypeSafe(this.rotationX, this.rotation, 0),
				ThreeUtil.getTypeSafe(this.rotationY, this.rotation, 0),
				ThreeUtil.getTypeSafe(this.rotationZ, this.rotation, 0)
			);
			let center: THREE.Vector3 = ThreeUtil.getVector3Safe(
				ThreeUtil.getTypeSafe(this.centerX, this.center, 0),
				ThreeUtil.getTypeSafe(this.centerY, this.center, 0),
				ThreeUtil.getTypeSafe(this.centerZ, this.center, 0)
			);
			this._lookathead = Math.min(
				1,
				Math.max(0.001, ThreeUtil.getTypeSafe(this.lookathead, 0.05))
			);
			this._curve = new CurvesNormal(curve, {
				scale: scale,
				rotation: rotation,
				center: center,
				multiply: ThreeUtil.getTypeSafe(this.multiply, 1),
				options: this.getOptions(),
			});
			this._duration = ThreeUtil.getTypeSafe(this.duration, 60);
			this._delta = ThreeUtil.getTypeSafe(this.delta, 0);
			switch (this.type.toLowerCase()) {
				case 'position':
					this._curve.referCenter = parent.position;
					this._lookat = false;
					break;
				case 'positionlookat':
					this._curve.referCenter = parent.position;
					this._lookat = true;
					break;
			}
			if (this.visible) {
				this._helper = new THREE.Mesh(
					new THREE.TubeGeometry(
						this._curve,
						ThreeUtil.getTypeSafe(this.tubularSegments, 64),
						ThreeUtil.getTypeSafe(this.tubeRadius, 0.01),
						ThreeUtil.getTypeSafe(this.tubeRadiusSegments, 8),
						ThreeUtil.getTypeSafe(this.closed, false)
					),
					new THREE.MeshBasicMaterial({
						color: ThreeUtil.getColorSafe(this.color, 0xff0000),
						opacity: ThreeUtil.getTypeSafe(this.opacity, 0.2),
						depthTest: true,
						transparent: true,
						side: THREE.DoubleSide,
					})
				);
				this._helperPoint = new THREE.Mesh(
					new THREE.SphereGeometry(
						ThreeUtil.getTypeSafe(this.tubeRadius, 0.01) * 10,
						ThreeUtil.getTypeSafe(this.tubeRadiusSegments, 8),
						ThreeUtil.getTypeSafe(this.tubeRadiusSegments, 4)
					),
					new THREE.MeshBasicMaterial({
						color: ThreeUtil.getColorSafe(this.color, 0x0000ff),
						opacity: ThreeUtil.getTypeSafe(this.opacity, 0.7),
						depthTest: true,
						transparent: true,
						side: THREE.DoubleSide,
					})
				);
				this._helperPoint.visible = false;
				switch (this.type.toLowerCase()) {
					case 'position':
						this._helper.scale.set(1, 1, 1);
						this._helperPoint.visible = false;
						break;
					case 'positionlookat':
						this._helper.scale.set(1, 1, 1);
						this._helperPoint.visible = true;
						break;
					default:
						this._helper.scale
							.set(1, 1, 1)
							.multiplyScalar(ThreeUtil.getTypeSafe(this.scale, 1));
						this._helperPoint.scale
							.set(1, 1, 1)
							.multiplyScalar(ThreeUtil.getTypeSafe(this.scale, 1));
						this._helperPoint.visible = true;
						break;
				}
			}
			this.setObject(this._curve);
		}
		if (this._parent !== parent && parent !== null) {
			this._parent = parent;
			this._controlItem = controlItem;
			if (this._parent !== null) {
				if (this._helper !== null) {
					if (this._helper.parent !== this._parent.children[0]) {
						this._parent.children[0].add(this._helper);
					}
				}
				if (this._helperPoint !== null) {
					if (this._helperPoint.parent !== this._parent) {
						this._parent.add(this._helperPoint);
					}
				}
			}
		}
		return this;
	}

	/**
	 * Last look at of controller item component
	 */
	private _lastLookAt: THREE.Vector3 = null;

	/**
	 * Updates helper point
	 * @param itemTimer
	 * @param [scale]
	 */
	public updateHelperPoint(itemTimer: RendererTimer, scale: number = null) {
		if (this._helperPoint !== null) {
			this._curve.getPointV3(itemTimer, this._helperPoint.position);
			switch (this.type.toLowerCase()) {
				case 'positionlookat':
				case 'position':
					break;
				default:
					this._helperPoint.position.multiplyScalar(
						ThreeUtil.getTypeSafe(this.scale, 1)
					);
					if (scale !== null) {
						this._helperPoint.scale.set(scale, scale, scale);
					}
					break;
			}
		}
	}

	/**
	 * Updates color
	 * @param targetColor
	 * @param srcColor
	 */
	private updateColor(targetColor: THREE.Color, srcColor: THREE.Color) {
		switch (this.colorType) {
			case 'rate':
				if (this._rateCallBack !== null) {
					targetColor.b = this._rateCallBack();
				}
				break;
			case 'rgb':
				targetColor.setRGB(srcColor.r, srcColor.g, srcColor.b);
				break;
			case 'gray':
				const avgColor = (srcColor.r + srcColor.g + srcColor.b) / 3;
				targetColor.setRGB(avgColor, avgColor, avgColor);
				break;
			default:
				if (this.colorType.indexOf('r') > -1) {
					targetColor.r = srcColor.r;
				}
				if (this.colorType.indexOf('g') > -1) {
					targetColor.g = srcColor.g;
				}
				if (this.colorType.indexOf('b') > -1) {
					targetColor.b = srcColor.b;
				}
				break;
		}
	}

	/**
	 * Tmp color of controller item component
	 */
	private _tmpColor: THREE.Color = new THREE.Color();

	/**
	 * Gets lerp float
	 * @param s
	 * @param e
	 * @param alpha
	 * @returns lerp float
	 */
	private getLerpFloat(s: number, e: number, alpha: number): number {
		return s + (e - s) * alpha;
	}

	/**
	 * Updates controller item component
	 * @param timer
	 * @param events
	 * @returns true if update
	 */
	public update(timer: RendererTimer, events: string[]): boolean {
		if (
			this._curve !== null &&
			this._controlItem.object3d !== null &&
			this._controlItem.object3d.userData.initPosition
		) {
			const itemTimer: RendererTimer = {
				elapsedTime: timer.elapsedTime / this._duration + this._delta,
				delta: timer.delta / this._duration,
			};
			switch (this.type.toLowerCase()) {
				case 'positionlookat':
				case 'position':
					if (
						events.indexOf('position') === -1 &&
						this._controlItem.position !== null
					) {
						this._curve.getPointV3(itemTimer, this._controlItem.position);
						events.push('position');
						if (this._lookat) {
							itemTimer.elapsedTime += this._lookathead;
							itemTimer.delta += this._lookathead;
							if (this._lastLookAt === null) {
								this._lastLookAt = this._curve.getPointV3(
									itemTimer,
									new THREE.Vector3()
								);
							} else {
								this._curve.getPointV3(itemTimer, this._lastLookAt);
								this._controlItem.object3d.lookAt(this._lastLookAt);
							}
							this.updateHelperPoint(itemTimer);
							events.push('lookat');
						}
						return true;
					} else {
						return false;
					}
				case 'scale':
					if (
						events.indexOf('scale') === -1 &&
						this._controlItem.scale !== null
					) {
						this._curve.getPointV3(itemTimer, this._controlItem.scale);
						this.updateHelperPoint(itemTimer);
						events.push('scale');
						return true;
					} else {
						return false;
					}
				case 'rotation':
					if (
						events.indexOf('rotation') === -1 &&
						this._controlItem.rotation !== null
					) {
						this._curve.getPointEuler(itemTimer, this._controlItem.rotation);
						this.updateHelperPoint(itemTimer);
						events.push('rotation');
						return true;
					} else {
						return false;
					}
				case 'lookat':
					if (events.indexOf('lookat') === -1) {
						if (this._lastLookAt === null) {
							this._lastLookAt = this._curve.getPointV3(
								itemTimer,
								new THREE.Vector3()
							);
						} else {
							this._curve.getPointV3(itemTimer, this._lastLookAt);
							this._controlItem.object3d.lookAt(this._lastLookAt);
						}
						this.updateHelperPoint(itemTimer);
						events.push('lookat');
						return true;
					} else {
						return false;
					}
				case 'material':
					if (
						ThreeUtil.isNotNull(this.material) &&
						this._controlItem.material !== null
					) {
						const material: any = this._controlItem.material;
						if (
							ThreeUtil.isNotNull(material) &&
							ThreeUtil.isNotNull(material[this.material])
						) {
							let scale: number = 1;
							const oldValue = material[this.material];
							if (oldValue instanceof THREE.Color) {
								this._curve.getPointColor(itemTimer, this._tmpColor);
								this.updateColor(oldValue, this._tmpColor);
							} else if (oldValue instanceof THREE.Vector2) {
								this._curve.getPointV2(itemTimer, oldValue);
							} else if (oldValue instanceof THREE.Vector3) {
								this._curve.getPointV3(itemTimer, oldValue);
							} else if (typeof oldValue === 'number') {
								switch (this.material.toLowerCase()) {
									case 'opacity':
										material.opacity = this._curve.getPointFloat(
											itemTimer,
											0,
											1
										);
										scale = material.opacity * 3;
										break;
									default:
										material[this.material] = this._curve.getPointFloat(
											itemTimer,
											this.minValue,
											this.maxValue
										);
										break;
								}
							}
							this.updateHelperPoint(itemTimer, scale);
						}
					}
					break;
				case 'uniform':
				case 'uniforms':
					if (
						ThreeUtil.isNotNull(this.uniform) &&
						this._controlItem.uniforms !== null
					) {
						const uniforms = this._controlItem.uniforms;
						if (ThreeUtil.isNotNull(uniforms[this.uniform])) {
							const uniform: THREE.IUniform = uniforms[this.uniform];
							const oldValue = uniform.value;
							switch (this.valueType.toLowerCase()) {
								case 'copyposition':
									if (
										oldValue instanceof THREE.Vector3 &&
										ThreeUtil.isNotNull(this.refValue)
									) {
										oldValue.copy(ThreeUtil.getPosition(this.refValue));
									}
									break;
								case 'int':
								case 'integer':
									uniform.value = Math.round(
										this._curve.getPointFloat(
											itemTimer,
											this.minValue,
											this.maxValue
										)
									);
									break;
								case 'float':
								case 'double':
								case 'number':
									uniform.value = this._curve.getPointFloat(
										itemTimer,
										this.minValue,
										this.maxValue
									);
									break;
								default:
									if (oldValue instanceof THREE.Color) {
										this._curve.getPointColor(itemTimer, oldValue);
									} else if (oldValue instanceof THREE.Vector2) {
										this._curve.getPointV2(itemTimer, oldValue);
									} else if (oldValue instanceof THREE.Vector3) {
										this._curve.getPointV3(itemTimer, oldValue);
									} else if (typeof oldValue === 'number') {
										switch (this.uniform.toLowerCase()) {
											default:
												uniform.value = this._curve.getPointFloat(
													itemTimer,
													this.minValue,
													this.maxValue
												);
												break;
										}
									}
									break;
							}
						}
					}
					break;
				case 'update':
				case 'autoupdate':
					if (this._controlItem.component !== null) {
						if (ThreeUtil.isNotNull(this._controlItem.component.update)) {
							this._controlItem.component.update();
						}
					}
					break;
				case 'tween':
					const tween = this._controlItem.object3d.userData.tween;
					if (ThreeUtil.isNotNull(tween) && tween.elapsedTime < 1) {
						tween.elapsedTime = Math.min(
							1,
							tween.elapsedTime + timer.delta / this._duration
						);
						const lastElapsedAlpha = Math.min(0.99999, tween.elapsedAlpha || 0);
						const tweenTimer = {
							elapsedTime: tween.elapsedTime,
							delta: timer.delta / this._duration,
						};
						tween.elapsedAlpha = this._curve.getPointFloat(tweenTimer, 0, 1);
						const elapsedAlpha = Math.max(
							0,
							Math.min(
								1,
								(tween.elapsedAlpha - lastElapsedAlpha) / (1 - lastElapsedAlpha)
							)
						);
						this.updateHelperPoint(tweenTimer);
						Object.entries(tween).forEach(([key, value]) => {
							if (ThreeUtil.isNotNull(value)) {
								switch (key) {
									case 'position':
										this._controlItem.position.lerp(
											value as THREE.Vector3,
											elapsedAlpha
										);
										break;
									case 'scale':
										this._controlItem.scale.lerp(
											value as THREE.Vector3,
											elapsedAlpha
										);
										break;
									case 'rotation':
										const valueObj: any = value;
										const rotationX = this.getLerpFloat(
											this._controlItem.rotation.x,
											valueObj['x'],
											elapsedAlpha
										);
										const rotationY = this.getLerpFloat(
											this._controlItem.rotation.y,
											valueObj['y'],
											elapsedAlpha
										);
										const rotationZ = this.getLerpFloat(
											this._controlItem.rotation.z,
											valueObj['z'],
											elapsedAlpha
										);
										this._controlItem.rotation.set(
											rotationX,
											rotationY,
											rotationZ
										);
										break;
								}
							}
						});
					}
					break;
			}
		}
		return false;
	}
}
