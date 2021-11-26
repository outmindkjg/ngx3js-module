import {
	Component, OnInit
} from '@angular/core';

/**
 * The Asstes Fonts component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AsstesFontsComponent) page for details.
 *
 */
@Component({
	selector: 'ngx3js-assets-fonts',
	templateUrl: './fonts.component.html',
	styleUrls: ['./fonts.component.scss'],
})
export class AsstesFontsComponent implements OnInit
{
	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
	}

}
