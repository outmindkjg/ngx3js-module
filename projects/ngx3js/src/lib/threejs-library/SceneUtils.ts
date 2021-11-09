import * as SceneUtilsAlias from 'three/examples/jsm/utils/SceneUtils';
const SceneUtilsAny: any = SceneUtilsAlias;
const SceneUtils = {
	createMeshesFromInstancedMesh : SceneUtilsAny.createMeshesFromInstancedMesh,
	createMultiMaterialObject : SceneUtilsAny.createMultiMaterialObject,
	detach : SceneUtilsAny.detach,
	attach : SceneUtilsAny.attach
}

export { SceneUtils }