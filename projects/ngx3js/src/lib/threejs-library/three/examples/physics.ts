import { Mesh, Vector3 } from '../index';

export interface AmmoPhysics {
    new() : this;
    addMesh(mesh: Mesh, mass: number): void;
    setMeshPosition(mesh: Mesh, position: Vector3, index: number): void;
}
