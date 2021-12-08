import * as THREE from 'three';

/**
 * FogExp2 fog
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxFogExp2) page for details.
 * See the [ngx fog](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_fog/FogExp2) page for a live demo.
 *
 */
export class NgxFogExp2 extends THREE.FogExp2 {
	constructor(hex: number | string, density?: number) {
		super(hex, density);
	}
}

/**
 * Fog fog
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxFog) page for details.
 * See the [ngx fog](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_fog/Fog) page for a live demo.
 *
 */
export class NgxFog extends THREE.Fog {
	constructor(color: THREE.ColorRepresentation, near?: number, far?: number) {
		super(color, near, far);
	}
}
