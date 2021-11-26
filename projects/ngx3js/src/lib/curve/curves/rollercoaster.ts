import * as THREE from 'three';

/**
 * Curves Roller Coaster
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CurvesRollerCoaster) page for details.
 *
 */
export class CurvesRollerCoaster extends THREE.Curve<THREE.Vector3> {
	/**
	 * Creates an instance of curves line.
	 * @param [radius]
	 * @param [options]
	 */
	constructor() {
		super();
	}

	/**
	 * Gets point
	 * @param t
	 * @param optionalTarget
	 * @returns
	 */
	public getPoint(t: number, optionalTarget: THREE.Vector3) {
		const point = optionalTarget || new THREE.Vector3();
		t = t * Math.PI * 2;
		const x = Math.sin(t * 3) * Math.cos(t * 4) * 50;
		const y = Math.sin(t * 10) * 2 + Math.cos(t * 17) * 2 + 5;
		const z = Math.sin(t) * Math.sin(t * 4) * 50;
		return point.set(x, y, z).multiplyScalar(2);
	}
}
