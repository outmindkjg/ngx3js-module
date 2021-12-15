import * as I3JS from './threejs-library/three-interface';
import * as N3JS from './threejs-library/three-core';
import { IRendererEvent, IRendererTimer } from './ngx-interface';

/**
 * Three clock
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxThreeClock) page for details.
 *
 */
 export class NgxThreeClock extends N3JS.Clock {
	/**
	 * Gets timer
	 * @param renderer
	 * @param event
	 * @returns timer
	 */
	public getTimer(renderer: I3JS.Renderer, event: IRendererEvent): IRendererTimer {
		const delta = this.getDelta();
		const elapsedTime = this.getElapsedTime();
		return {
			delta: delta,
			elapsedTime: elapsedTime,
			renderer: renderer,
			event: event,
		};
	}
}
