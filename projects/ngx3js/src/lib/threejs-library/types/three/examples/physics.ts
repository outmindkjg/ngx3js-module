import { Mesh, Vector3 } from '../index';

/**
 * Ammo physics
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AmmoPhysics) page for details.
 *
 * ### Examples
 * [physics / ammo / instancing](https://outmindkjg.github.io/ngx3js-doc/#/examples/physics_ammo_instancing)
 */
export interface AmmoPhysics {
	(): Promise<any>;
	new (): this;
	addMesh(mesh: Mesh, mass: number): void;
	setMeshPosition(mesh: Mesh, position: Vector3, index: number): void;
}

/**
 * Oimo physics
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/OimoPhysics) page for details.
 *
 * ### Examples
 * [physics / oimo / instancing](https://outmindkjg.github.io/ngx3js-doc/#/examples/physics_oimo_instancing)
 */
export interface OimoPhysics {
	(): Promise<any>;
	new (): this;
	addMesh(mesh: Mesh, mass: number): void;
	setMeshPosition(mesh: Mesh, position: Vector3, index: number): void;
}
