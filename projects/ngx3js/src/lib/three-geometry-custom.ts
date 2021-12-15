import { Component, Input } from '@angular/core';
import { NgxThreeUtil } from './three-util';
import * as N3JS from './threejs-library/three-core';
import * as I3JS from './threejs-library/three-interface';

/**
 * NgxThreeGeometryCustom
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxThreeGeometryCustom) page for details.
 *
 */
 @Component({
	template: '',
})
export class NgxThreeGeometryCustom {
	/**
	 * Scale the geometry data. This is typically done as a one time operation, and not during a loop. Use [Object3D.scale](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/Object3D.scale) for typical real-time mesh scaling.
	 */
	@Input() scale: number = null;

	/**
	 * The Geometry of three geometry custom
	 */
	protected geometry: I3JS.BufferGeometry = null;

	/**
	 * Inits geometry
	 * @returns geometry
	 */
	public initGeometry(): I3JS.BufferGeometry {
		return new N3JS.BufferGeometry();
	}

	/**
	 * Sets geometry
	 * @param geometry
	 */
	public setGeometry(geometry: I3JS.BufferGeometry) {
		if (NgxThreeUtil.isNotNull(this.scale)) {
			const scale = NgxThreeUtil.getTypeSafe(this.scale, 1);
			geometry.scale(scale, scale, scale);
		}
		this.geometry = geometry;
	}

	/**
	 * Gets geometry
	 * @returns geometry
	 */
	public getGeometry(): I3JS.BufferGeometry {
		if (this.geometry === null) {
			this.setGeometry(this.initGeometry());
		}
		return this.geometry;
	}
}
