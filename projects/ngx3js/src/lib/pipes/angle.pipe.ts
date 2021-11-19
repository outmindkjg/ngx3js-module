/** @format */

import { Pipe, PipeTransform } from '@angular/core';
import { ThreeUtil } from '../interface';

type AngleType =
	| 'degree'
	| 'deg'
	| 'radian'
	| 'rad'
	| 'gradian'
	| 'gra'
	| 'DEGREE'
	| 'DEG'
	| 'RADIAN'
	| 'RAD'
	| 'GRADIAN'
	| 'GRA'
	| string;

/**
 * Change Angle Pipe
 *
 * ```html
 * {{ 120 | ngx3jsAngle : 'rad' }}
 * ```
 * @export
 * @class AnglePipe
 * @implements {PipeTransform}
 */
@Pipe({
	name: 'ngx3jsAngle',
})
export class AnglePipe implements PipeTransform {
	/**
	 * Creates an instance of AnglePipe.
	 *
	 * @constructor
	 */
	constructor() {}

	/**
	 * Transforms color pipe
	 *
	 * ```html
	 * {{ 120 | ngx3jsAngle : 'rad' }}
	 * ```
	 * @param color1
	 * @param [returnType]
	 * @param [color2]
	 * @param [operator]
	 * @param [alpha]
	 * @returns transform
	 */
	transform(
		angle: number,
		returnType: AngleType = 'degree',
		inType: AngleType = 'radian'
	): number {
		if (ThreeUtil.isNotNull(angle)) {
			let angleDegree: number = 0;
			switch (inType) {
				case 'deg':
				case 'degree':
				case 'DEG':
				case 'DEGREE':
					angleDegree = ThreeUtil.getTypeSafe(angle, 0);
					break;
				case 'gra':
				case 'gradian':
				case 'GRA':
				case 'GRADIAN':
					angleDegree = (ThreeUtil.getTypeSafe(angle, 0) / 400) * 360;
					break;
				case 'rad':
				case 'radian':
				case 'RAD':
				case 'RADIAN':
				default:
					angleDegree = ThreeUtil.getRadian2AngleSafe(angle, 0);
					break;
			}
			switch (returnType) {
				case 'gra':
				case 'gradian':
				case 'GRA':
				case 'GRADIAN':
					return (angleDegree / 360) * 400;
				case 'rad':
				case 'radian':
				case 'RAD':
				case 'RADIAN':
					return ThreeUtil.getAngle2RadianSafe(angleDegree, 0);
				case 'deg':
				case 'degree':
				case 'DEG':
				case 'DEGREE':
				default:
					return angleDegree;
			}
		}
		return null;
	}
}
