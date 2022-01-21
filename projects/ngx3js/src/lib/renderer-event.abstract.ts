import {
	AfterContentInit,
	Component, OnChanges,
	OnDestroy,
	OnInit
} from '@angular/core';
import { IRendererEvent } from './ngx-interface';
import { NgxAbstractSubscribeComponent } from './subscribe.abstract';

/**
 * The Abstract Subscribe component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAbstractSubscribeComponent) page for details.
 *
 * ```ts
 * _@Component({
 * 	providers: [
 * 		{
 * 			provide: NgxAbstractSubscribeComponent,
 * 			useExisting: forwardRef(() => NgxXxxComponent),
 * 		},
 * 	],
 * })
 * export class NgxXxxComponent extends NgxAbstractSubscribeComponent implements OnInit {
 * 	constructor() {
 * 		super();
 * 	}
 * }
 * ```
 */
@Component({
	template: '',
})
export class NgxAbstractRendererEventComponent extends NgxAbstractSubscribeComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit {

	public eventTypes : string[] = [];

	/**
	 * Creates an instance of abstract subscribe component.
	 */
	constructor() {
		super();
	}

	public updateEvent(renderEvent: IRendererEvent) {

	}
}
