import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { ThreeColor, ThreeUtil, THREE, I3JS } from './../interface';
import * as THREE_FOG from './fogs/three-fogs';

/**
 * The Fog component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/FogComponent) page for details.
 *
 * ```html
 * <ngx3js-fog
 * 	[color]="'0xa0a0a0'" [near]="10" [far]="50"
 * ></ngx3js-fog>
 * <ngx3js-fog
 * 	[type]="'FogExp2'" [color]="'0x000000'" [density]="0.00000025"
 * ></ngx3js-fog>
 * ```
 */
@Component({
	selector: 'ngx3js-fog',
	templateUrl: './fog.component.html',
	styleUrls: ['./fog.component.scss'],
})
export class FogComponent extends AbstractSubscribeComponent implements OnInit {
	/**
	 * The Fog type.
	 *
	 * @see THREE.Fog - fog (default),
	 * @see THREE.FogExp2 - fogexp2, exp, exp2
	 */
	@Input() public type: string = 'fog';

	/**
	 * Fog color.  Example: If set to black, far away objects will be rendered black.
	 */
	@Input() public color: ThreeColor = null;

	/**
	 * Defines how fast the fog will grow dense.
	 * Default is 0.00025.
	 */
	@Input() public density: number = 0.00025;

	/**
	 * The minimum distance to start applying fog. Objects that are less than 'near' units from the active camera won't be affected by fog.
	 * Default is 1.
	 */
	@Input() public near: number = 1;

	/**
	 * The maximum distance at which fog stops being calculated and applied. Objects that are more than 'far' units away from the active camera won't be affected by fog.
	 * Default is 1000.
	 */
	@Input() public far: number = 1000;

	/**
	 * Creates an instance of fog component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('fog');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		super.ngOnDestroy();
		if (this.refScene !== null && this.refScene.fog === this.fog) {
			this.refScene.fog = null;
		}
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
		if (changes && this.fog) {
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
	 * The Fog of fog component
	 */
	private fog: I3JS.IFogBase = null;

	/**
	 * Ref scene of fog component
	 */
	private refScene: I3JS.IScene = null;

	/**
	 * Sets scene
	 * @param refScene
	 */
	public setScene(refScene: I3JS.IScene) {
		if (this.refScene !== refScene) {
			this.refScene = refScene;
			this.refScene.fog = this.getFog();
		}
	}

	/**
	 * Sets object
	 * @param fog
	 */
	setObject(fog: I3JS.IFogBase) {
		super.setObject(fog);
		if (this.refScene !== null) {
			this.refScene.fog = fog;
		}
	}

	/**
	 * Applys changes3d
	 * @param changes
	 */
	public applyChanges(changes: string[]) {
		if (this.fog !== null) {
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getFog();
				return;
			}
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, []);
			}
			if (
				!ThreeUtil.isOnlyIndexOf(
					changes,
					['color', 'density', 'near', 'far'],
					this.OBJECT_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'color':
						if (ThreeUtil.isNotNull(this.color)) {
							this.fog.color = ThreeUtil.getColorSafe(this.color, 0xffffff);
						}
						break;
					case 'density':
						if (
							ThreeUtil.isNotNull(this.density) &&
							this.fog instanceof THREE.FogExp2
						) {
							this.fog.density = ThreeUtil.getTypeSafe(this.density, 0.00025);
						}
						break;
					case 'near':
						if (
							ThreeUtil.isNotNull(this.near) &&
							this.fog instanceof THREE.Fog
						) {
							this.fog.near = ThreeUtil.getTypeSafe(this.near);
						}
						break;
					case 'far':
						if (
							ThreeUtil.isNotNull(this.far) &&
							this.fog instanceof THREE.Fog
						) {
							this.fog.far = ThreeUtil.getTypeSafe(this.far);
						}
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	/**
	 * Gets fog
	 * @returns fog
	 */
	public getFog(): I3JS.IFogBase {
		if (this.fog === null || this._needUpdate) {
			this.needUpdate = false;
			switch (this.type.toLowerCase()) {
				case 'exp':
				case 'exp2':
				case 'fogexp2':
					this.fog = new THREE.FogExp2(
						ThreeUtil.getColorSafe(this.color, 0xffffff).getHex(),
						ThreeUtil.getTypeSafe(this.density, 0.00025)
					);
					break;
				case 'fog':
				default:
					this.fog = new THREE.Fog(
						ThreeUtil.getColorSafe(this.color, 0xffffff),
						ThreeUtil.getTypeSafe(this.near),
						ThreeUtil.getTypeSafe(this.far)
					);
					break;
			}
			this.setObject(this.fog);
		}
		return this.fog;
	}
}
