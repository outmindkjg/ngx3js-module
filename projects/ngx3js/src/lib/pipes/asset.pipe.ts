/** @format */

import { Pipe, PipeTransform } from '@angular/core';
import { NgxThreeUtil } from '../interface';

/**
 * Assets Pipe
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAssetsPipe) page for details.
 * See the [ngx pipes](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_pipes) page for a live demo.
 *
 * ```html
 * {{ 'image.gif' | ngx3jsAsset }}
 * ```
 * @export
 * @class NgxAssetsPipe
 * @implements {PipeTransform}
 */
@Pipe({
	name: 'ngx3jsAsset',
})
export class NgxAssetsPipe implements PipeTransform {
	/**
	 * Creates an instance of NgxAnglePipe.
	 *
	 * @constructor
	 */
	constructor() {}

	/**
	 * Transforms assets pipe
	 *
	 * ```html
	 * {{ 'image.gif' | ngx3jsAsset }}
	 * ```
	 * @param image
	 * @returns transform
	 */
	transform(image: string): string {
		if (NgxThreeUtil.isNotNull(image)) {
			return NgxThreeUtil.getStoreUrl(image);
		}
		return null;
	}
}
