/** @format */

import { DrawingCanvasDirective } from './drawing-canvas.directive';
import { NumberDirective, NumberOptions } from './object3d-number.directive';
import { PositionDirective, PositionOptions } from './object3d-position.directive';
import { RotateDirective, RotateOptions } from './object3d-rotate.directive';
import { ScaleDirective, ScaleOptions } from './object3d-scale.directive';

export const NGX3JS_DIRECTIVES = [
	DrawingCanvasDirective,
	RotateDirective,
	ScaleDirective,
	PositionDirective,
	NumberDirective,
];

export {
	DrawingCanvasDirective,
	RotateDirective,
	ScaleDirective,
	PositionDirective,
	NumberDirective,
	NumberOptions,
	PositionOptions,
	RotateOptions,
	ScaleOptions
};
