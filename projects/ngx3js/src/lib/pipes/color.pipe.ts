import { Pipe, PipeTransform } from '@angular/core';
import { NgxThreeUtil } from '../interface';
import { INgxColor } from '../ngx-interface';

type ReturnType =
	| 'string'
	| 'hex'
	| 'hexnumber'
	| 'rgb'
	| 'rgbf'
	| 'hsl'
	| 'number'
	| 'color'
	| 'STRING'
	| 'HEX'
	| 'HEXNUMBER'
	| 'RGB'
	| 'RGBF'
	| 'HSL'
	| 'NUMBER'
	| 'COLOR'
	| string;
type OperatorType =
	| '+'
	| '-'
	| '*'
	| 'add'
	| 'plus'
	| 'sub'
	| 'minus'
	| 'multiply'
	| 'div'
	| 'lerp'
	| 'ADD'
	| 'PLUS'
	| 'SUB'
	| 'MINUS'
	| 'MULTIPLY'
	| 'LERP'
	| string;
/**
 * Change Color Pipe
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxColorPipe) page for details.
 * See the [ngx pipes](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_pipes) page for a live demo.
 *
 * ```html
 * {{ '#ff0000' |  ngx3jsColor }}
 * ```
 * @export
 * @class NgxColorPipe
 * @implements {PipeTransform}
 */
@Pipe({
	name: 'ngx3jsColor',
})
export class NgxColorPipe implements PipeTransform {
	/**
	 * Creates an instance of NgxColorPipe.
	 *
	 * @constructor
	 */
	constructor() {}

	/**
	 * Transforms color pipe
	 *
	 * ```html
	 * {{ '#ff0000' |  ngx3jsColor }}
	 * ```
	 * @param color1
	 * @param [returnType]
	 * @param [color2]
	 * @param [operator]
	 * @param [alpha]
	 * @returns transform
	 */
	transform(
		color1: INgxColor,
		returnType: ReturnType = 'color',
		color2: INgxColor = null,
		operator: OperatorType = 'plus',
		alpha: number = 0.5
	): INgxColor {
		if (NgxThreeUtil.isNotNull(color1)) {
			let convColor = NgxThreeUtil.getColorSafe(color1, 0xffffff);
			if (NgxThreeUtil.isNotNull(color2)) {
				const optionColorConv = NgxThreeUtil.getColorSafe(color2, 0xffffff);
				switch (operator) {
					case '-':
					case 'minus':
					case 'sub':
					case 'MINUS':
					case 'SUB':
						convColor = convColor.sub(optionColorConv);
						break;
					case '*':
					case 'multiply':
					case 'MULTIPLY':
						convColor = convColor.multiply(optionColorConv);
						break;
					case 'lerp':
					case 'LERP':
						convColor = convColor.lerp(optionColorConv, alpha);
						break;
					case '+':
					case 'add':
					case 'plus':
					case 'ADD':
					case 'PLUS':
					default:
						convColor = convColor.add(optionColorConv);
						break;
				}
			}
			switch (returnType) {
				case 'rgb':
				case 'RGB':
					return (
						'rgb(' +
						Math.round(convColor.r * 255) +
						',' +
						Math.round(convColor.g * 255) +
						',' +
						Math.round(convColor.b * 255) +
						')'
					);
				case 'rgbf':
				case 'RGBF':
					return (
						'rgbf(' +
						convColor.r.toFixed(3) +
						',' +
						convColor.g.toFixed(3) +
						',' +
						convColor.b.toFixed(3) +
						')'
					);
				case 'string':
				case 'hex':
				case 'STRING':
				case 'HEX':
					return '#' + convColor.getHexString();
				case 'hexnumber':
				case 'HEXNUMBER':
					return '0x' + convColor.getHexString();
				case 'hsl':
				case 'HSL':
					const hsl = convColor.getHSL({ h: 0, s: 0, l: 0 });
					return (
						'hsl(' +
						hsl.h.toFixed(3) +
						',' +
						hsl.s.toFixed(3) +
						',' +
						hsl.l.toFixed(3) +
						')'
					);
				case 'number':
				case 'NUMBER':
					return convColor.getHex();
				case 'color':
				case 'COLOR':
				default:
					return convColor;
			}
		}
		return null;
	}
}
