import { Mesh, Vector3 } from '../index';

export interface AmmoPhysics {
    () : Promise<any>;
    new() : this;
    addMesh(mesh: Mesh, mass: number): void;
    setMeshPosition(mesh: Mesh, position: Vector3, index: number): void;
}

export interface OimoPhysics {
    () : Promise<any>;
    new() : this;
    addMesh(mesh: Mesh, mass: number): void;
    setMeshPosition(mesh: Mesh, position: Vector3, index: number): void;
}
