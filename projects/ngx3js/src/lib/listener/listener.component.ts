import {
	Component,
	forwardRef,
	Input,
	OnInit,
	SimpleChanges
} from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { NgxAbstractObject3dComponent } from '../object3d.abstract';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * The Listener component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ListenerComponent) page for details.
 *
 * The [name] represents a virtual [listener](https://developer.mozilla.org/de/docs/Web/API/AudioListener) of the all positional and non-positional audio effects in the scene.
 * A three.js application usually creates a single instance of [name]. It is a mandatory construtor parameter for audios entities like [Audio](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/audio/Audio) and [PositionalAudio](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/audio/PositionalAudio).
 * In most cases, the listener object is a child of the camera. So the 3D transformation of the camera represents the 3D transformation of the listener.
 *
 * ```html
 * <ngx3js-camera>
 *	<ngx3js-listener></ngx3js-listener>
 * </ngx3js-camera>
 * ```
 * @see THREE.AudioListener
 */
@Component({
	selector: 'ngx3js-listener',
	templateUrl: './listener.component.html',
	styleUrls: ['./listener.component.scss'],
	providers: [
		{
			provide: NgxAbstractObject3dComponent,
			useExisting: forwardRef(() => NgxListenerComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxListenerComponent),
		},
	],
})
export class NgxListenerComponent
	extends NgxAbstractObject3dComponent
	implements OnInit
{
	/**
	 * Set the volume.
	 */
	@Input() public volume: number = 1;

	/**
	 * Creates an instance of listener component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('listener');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.listener !== null && this.listener.parent !== null) {
			this.listener.parent.remove(this.listener);
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
		if (changes && this.listener) {
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
	 * The Listener of listener component
	 */
	private listener: I3JS.AudioListener = null;

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: I3JS.Object3D): boolean {
		if (super.setParent(parent)) {
			this.getListener();
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Applys changes3d
	 * @param changes
	 */
	public applyChanges3d(changes: string[]) {
		if (this.listener !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, ['volume', 'visible']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'visible':
						if (this.listener.parent !== null) {
							if (!this.visible) {
								this.listener.parent.remove(this.listener);
							} else if (this.parent !== this.listener.parent) {
								this.parent.add(this.listener);
							}
						}
						break;
					case 'volume':
						this.listener.setMasterVolume(this.volume);
						break;
					default:
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
	public getObject3d<T extends I3JS.Object3D>(): T {
		return this.getListener() as any;
	}

	/**
	 * Gets listener
	 * @returns listener
	 */
	public getListener(): I3JS.AudioListener {
		if (this.listener === null || this._needUpdate) {
			this.needUpdate = false;
			this.listener = new N3JS.AudioListener();
			super.setObject3d(this.listener);
		}
		return this.listener;
	}
}
