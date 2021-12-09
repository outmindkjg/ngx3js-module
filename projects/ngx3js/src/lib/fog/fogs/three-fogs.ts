import * as THREE from 'three';
import * as THREE_CORE from './../../threejs-library/three-core';

/**
 * FogExp2 fog
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxFogExp2) page for details.
 * See the [ngx fog](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_fog/FogExp2) page for a live demo.
 *
 */
export class NgxFogExp2 extends THREE.FogExp2 implements THREE_CORE.IFogExp2{
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
export class NgxFog extends THREE.Fog implements THREE_CORE.IFog {
	constructor(color: THREE_CORE.TColorRepresentation, near?: number, far?: number) {
		super(color, near, far);
	}
}
