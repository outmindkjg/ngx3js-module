import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { I3JS, N3JS } from '../interface';
import { IApplyMatrix4 } from '../ngx-interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * Translation Component
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTranslationComponent) page for details.
 *
 * ```html
 * <ngx3js-geometry>
 * 	<ngx3js-translation [x]="0" [y]="0.5" [z]="0"></ngx3js-translation>
 * </ngx3js-geometry>
 * <ngx3js-geometry>
 * 	<ngx3js-translation [y]="0.3"></ngx3js-translation>
 * </ngx3js-geometry>
 * ```
 */
@Component({
	selector: 'ngx3js-translation',
	templateUrl: './translation.component.html',
	styleUrls: ['./translation.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxTranslationComponent),
		},
	],
})
export class NgxTranslationComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The visible of translation component
	 */
	@Input() public visible: boolean = true;

	/**
	 * The x of translation component
	 */
	@Input() public x: number = 0;

	/**
	 * The y of translation component
	 */
	@Input() public y: number = 0;

	/**
	 * The z of translation component
	 */
	@Input() public z: number = 0;

	/**
	 * Creates an instance of translation component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('translation');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
	}

	/**
	 * The Translation of translation component
	 */
	private translation: I3JS.Matrix4 = null;

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: I3JS.Object3D | any): boolean {
		if (super.setParent(parent)) {
			this.resetTranslation();
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Resets translation
	 */
	public resetTranslation() {
		if (this.parent !== null && this.visible) {
			const refTranslation: IApplyMatrix4[] = [];
			if (this.parent instanceof N3JS.BufferGeometry) {
				refTranslation.push(this.parent);
			} else if (this.parent.getGeometry) {
				refTranslation.push(this.parent.getGeometry());
			} else if (this.parent.meshTranslations) {
				this.parent.meshTranslations.forEach((translations: any) => {
					refTranslation.push(translations);
				});
			}
			if (refTranslation.length > 0) {
				const translation: I3JS.Matrix4 = this.getTranslation();
				refTranslation.forEach((refTranslation) => {
					refTranslation.applyMatrix4(translation);
				});
			}
		}
	}

	/**
	 * Gets translation
	 * @returns translation
	 */
	public getTranslation(): I3JS.Matrix4 {
		if (this.translation === null || this._needUpdate) {
			this.needUpdate = false;
			this.translation = new N3JS.Matrix4().makeTranslation(
				this.x,
				this.y,
				this.z
			);
			super.setObject(this.translation);
		}
		return this.translation;
	}
}
