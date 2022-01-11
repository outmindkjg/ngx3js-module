import { Component, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * The Shader component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderComponent) page for details.
 *
 */
@Component({
	selector: 'ngx3js-shader',
	templateUrl: './shader.component.html',
	styleUrls: ['./shader.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxShaderComponent),
		},
	],
})
export class NgxShaderComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The type of shader component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public type: string = 'x-shader/x-fragment';

	/**
	 * The refShader of shader component
	 */
	@Input() public refShader: NgxShaderComponent = null;

	/**
	 * Creates an instance of shader component.
	 * @param ele
	 */
	constructor(private ele: ElementRef) {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('shader');
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
	 * The Shader of shader component
	 */
	private shader: string = null;

	/**
	 * Gets shader
	 * @returns shader
	 */
	public getShader(): string {
		if (this.shader === null || this._needUpdate) {
			this.needUpdate = false;
			if (this.refShader !== null) {
				this.shader = this.refShader.getShader();
			} else {
				this.shader = this.ele.nativeElement.innerText;
			}
			super.setObject(this.shader);
		}
		return this.shader;
	}
}
