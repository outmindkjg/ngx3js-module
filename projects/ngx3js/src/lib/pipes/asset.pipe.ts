/** @format */

import { Pipe, PipeTransform } from '@angular/core';
import { ThreeUtil } from '../interface';

/**
 * Change Assets Pipe
 *
 * ```html
 * {{ 'image.gif' | ngx3jsAsset }}
 * ```
 * @export
 * @class AssetsPipe
 * @implements {PipeTransform}
 */
@Pipe({
	name: 'ngx3jsAsset',
})
export class AssetsPipe implements PipeTransform {
	/**
	 * Creates an instance of AnglePipe.
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
		if (ThreeUtil.isNotNull(image)) {
			return ThreeUtil.getStoreUrl(image);
		}
		return null;
	}
}
