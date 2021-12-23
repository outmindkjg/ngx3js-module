import { Camera } from './cameras';
import { BufferGeometry, InstancedBufferAttribute, Intersection, Object3D, Raycaster } from './core';
import { Material, SpriteMaterial } from './materials';
import { Color, Matrix4, Vector2, Vector3 } from './math';
import { DataTexture } from './textures';

/**
 * A bone which is part of a [Skeleton](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Skeleton). The skeleton in turn is used by the [SkinnedMesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SkinnedMesh).
 * Bones are almost identical to a blank [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D).
 *
 * ### Code Example
 * ```js
 * const root = new THREE.Bone();
 * const child = new THREE.Bone();
 * root.add( child );
 * child.position.y = 5;
 * ```
 */
export interface Bone extends Object3D {
	/**
	 * Creates a new Bone.
	 */
	new (): this;

	readonly isBone: true;

	/**
	 * Set to 'Bone', this can be used to find all Bones in a scene.
	 */
	type: 'Bone';
}

/**
 * This is almost identical to an [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D). Its purpose is to make working with groups of objects syntactically clearer.
 *
 * ### Code Example
 * ```js
 * const geometry = new THREE.BoxGeometry( 1, 1, 1 );
 * const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
 * const cubeA = new THREE.Mesh( geometry, material );
 * cubeA.position.set( 100, 100, 0 );
 * const cubeB = new THREE.Mesh( geometry, material );
 * cubeB.position.set( -100, -100, 0 );
 * // create a group and add the two cubes //These cubes can now be rotated / scaled etc as a group 
 * const group = new THREE.Group();
 * group.add( cubeA );
 * group.add( cubeB );
 * scene.add( group );
 * ```
 */
export interface Group extends Object3D {
	new (): this;

	/**
	 * A string 'Group'. This should not be changed.
	 */
	type: 'Group';
	readonly isGroup: true;
}

/**
 * A special version of [Mesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Mesh) with instanced rendering support. Use InstancedMesh if you have to render a large number of objects with the same geometry and material but with different world transformations. The usage of InstancedMesh will help you to reduce the number of draw calls and thus improve the overall rendering performance in your application.
 *
 * ### Examples
 * [WebGL / instancing / dynamic](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_instancing_dynamic) |
 * [WebGL / instancing / modified](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_instancing_modified) |
 * [WebGL / instancing / performance](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_instancing_performance) |
 * [WebGL / instancing / scatter](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_instancing_scatter) |
 * [WebGL / instancing / raycast](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_instancing_raycast)
 *
 * @template TGeometry
 * @template TMaterial
 */
export interface InstancedMesh<
	TGeometry extends BufferGeometry = BufferGeometry,
	TMaterial extends Material | Material[] = Material | Material[]
> extends Mesh<TGeometry, TMaterial> {
	/**
	 * @param geometry an instance of [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
	 * @param material an instance of [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material). Default is a new [MeshBasicMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MeshBasicMaterial).
	 * @param count The number of instances.
	 */
	new (geometry: TGeometry | undefined, material: TMaterial | undefined, count: number): this;

	/**
	 * The number of instances. The *count* value passed into the constructor represents the maximum number of instances of this mesh. You can change the number of instances at runtime to an integer value in the range [0, count].
	 * If you need more instances than the original count value, you have to create a new InstancedMesh.
	 */
	count: number;

	/**
	 * Represents the colors of all instances. *null* by default.
	 * You have to set its [needsUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.needsUpdate) flag to true if you modify instanced data via *.setColorAt*().
	 */
	instanceColor: null | InstancedBufferAttribute;

	/**
	 * Represents the local transformation of all instances.
	 * You have to set its [needsUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.needsUpdate) flag to true if you modify instanced data via *.setMatrixAt*().
	 */
	instanceMatrix: InstancedBufferAttribute;

	readonly isInstancedMesh: true;

	/**
	 * Get the color of the defined instance.
	 * @param index The index of an instance. Values have to be in the range [0, count].
	 * @param color This color object will be set to the color of the defined instance.
	 */
	getColorAt(index: number, color: Color): void;

	/**
	 * Get the local transformation matrix of the defined instance.
	 * @param index The index of an instance. Values have to be in the range [0, count].
	 * @param matrix This 4x4 matrix will be set to the local transformation matrix of the defined instance.
	 */
	getMatrixAt(index: number, matrix: Matrix4): void;

	/**
	 * Sets the given color to the defined instance.
	 * Make sure you set *.instanceColor*[.needsUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.needsUpdate) to true after updating all the colors.
	 * @param index The index of an instance. Values have to be in the range [0, count].
	 * @param color The color of a single instance.
	 */
	setColorAt(index: number, color: Color): void;

	/**
	 * Sets the given local transformation matrix to the defined instance.
	 * Make sure you set *.instanceMatrix*[.needsUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.needsUpdate) to true after updating all the matrices.
	 * @param index The index of an instance. Values have to be in the range [0, count].
	 * @param matrix A 4x4 matrix representing the local transformation of a single instance.
	 */
	setMatrixAt(index: number, matrix: Matrix4): void;

	/**
	 * Frees the internal resources of this instance.
	 */
	dispose(): void;
}

/**
 * Level of Detail - show meshes with more or less geometry based on distance from the camera.
 * Every level is associated with an object, and rendering can be switched between them at the distances specified. Typically you would create, say, three meshes, one for far away (low detail), one for mid range (medium detail) and one for close up (high detail).
 *
 * ### Examples
 * [webgl / lod](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lod)
 *
 * ### Code Example
 * ```js
 * const lod = new THREE.LOD();
 * // Create spheres with 3 levels of detail and create new LOD levels for them
 * for( let i = 0; i < 3; i++ ) {
 * 	const geometry = new THREE.IcosahedronGeometry( 10, 3 - i )
 * 	const mesh = new THREE.Mesh( geometry, material );
 * 	lod.addLevel( mesh, i * 75 );
 * }
 * scene.add( lod );
 * ```
 */
export interface LOD extends Object3D {
	/**
	 * Creates a new LOD.
	 */
	new (): this;

	type: 'LOD';

	/**
	 * An array of [level](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object) objects Each level is an object with two properties:
	 * @param object The [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D) to display at this level.
	 * @param distance The distance at which to display this level of detail.
	 */
	levels: Array<{ distance: number; object: Object3D }>;

	/**
	 * Whether the LOD object is updated automatically by the renderer per frame or not.
	 * If set to false, you have to call [LOD.update](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LOD.update)() in the render loop by yourself.
	 * Default is true.
	 */
	autoUpdate: boolean;

	readonly isLOD: true;

	/**
	 * @param object The [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D) to display at this level.
	 * @param distance The distance at which to display this level of detail.
	 * Adds a mesh that will display at a certain distance and greater. Typically the further away the distance, the lower the detail on the mesh.
	 */
	addLevel(object: Object3D, distance?: number): this;

	/**
	 * Get the currently active LOD level. As index of the levels array.
	 */
	getCurrentLevel(): number;

	/**
	 * Get a reference to the first [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D) (mesh) that is greater than [distance](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	getObjectForDistance(distance: number): Object3D | null;

	/**
	 * Get intersections between a casted [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) and this LOD.
	 * [Raycaster.intersectObject](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Raycaster.intersectObject) will call this method.
	 */
	raycast(raycaster: Raycaster, intersects: Intersection[]): void;

	/**
	 * Set the visibility of each [level](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/levels)'s [object](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D) based on distance from the [camera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Camera).
	 */
	update(camera: Camera): void;

	/**
	 * Create a JSON structure with details of this LOD object.
	 */
	toJSON(meta: any): any;
}

/**
 * A continuous line.
 * This is nearly the same as [LineSegments](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineSegments); the only difference is that it is rendered using [gl.LINE_STRIP](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements)
 * instead of [gl.LINES](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements)
 *
 * ### Code Example
 * ```js
 * const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
 * const points = [];
 * points.push( new THREE.Vector3( - 10, 0, 0 ) );
 * points.push( new THREE.Vector3( 0, 10, 0 ) );
 * points.push( new THREE.Vector3( 10, 0, 0 ) );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 * const line = new THREE.Line( geometry, material );
 * scene.add( line );
 * ```
 * @template TGeometry
 * @template TMaterial
 */
export interface Line<
	TGeometry extends BufferGeometry = BufferGeometry,
	TMaterial extends Material | Material[] = Material | Material[]
> extends Object3D {
	/**
	 * @param geometry vertices representing the line segment(s). Default is a new [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
	 * @param material material for the line. Default is a new [LineBasicMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineBasicMaterial).
	 */
	new (geometry?: TGeometry, material?: TMaterial): this;

	/**
	 * Vertices representing the line segment(s).
	 */
	geometry: TGeometry;

	/**
	 * Material for the line.
	 */
	material: TMaterial;

	type: 'Line' | 'LineLoop' | 'LineSegments' | string;

	readonly isLine: true;

	/**
	 * An array of weights typically from 0-1 that specify how much of the morph is applied.
	 * Undefined by default, but reset to a blank array by *.updateMorphTargets*().
	 */
	morphTargetInfluences?: number[] | undefined;

	/**
	 * A dictionary of morphTargets based on the morphTarget.name property.
	 * Undefined by default, but rebuilt *.updateMorphTargets*().
	 */
	morphTargetDictionary?: { [key: string]: number } | undefined;

	/**
	 * Computes an array of distance values which are necessary for [LineDashedMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineDashedMaterial). For each vertex in the geometry, the method calculates the cumulative length from the current point to the very beginning of the line.
	 */
	computeLineDistances(): this;

	/**
	 * Get intersections between a casted [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) and this Line.
	 * [Raycaster.intersectObject](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Raycaster.intersectObject) will call this method.
	 */
	raycast(raycaster: Raycaster, intersects: Intersection[]): void;

	/**
	 * Updates the morphTargets to have no influence on the object. Resets the *.morphTargetInfluences* and *.morphTargetDictionary* properties.
	 */
	updateMorphTargets(): void;
}

/**
 * A continuous line that connects back to the start.
 * This is nearly the same	as [Line](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line); the only difference is that it is rendered using [gl.LINE_LOOP](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements)
 * instead of [gl.LINE_STRIP](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements), which draws a straight line to the next vertex, and connects the last vertex back to the first.
 */
export interface LineLoop<
	TGeometry extends BufferGeometry = BufferGeometry,
	TMaterial extends Material | Material[] = Material | Material[]
> extends Line<TGeometry, TMaterial> {
	/**
	 * @param geometry List of vertices representing points on the line loop.
	 * @param material Material for the line. Default is [LineBasicMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineBasicMaterial).
	 */
	new (geometry?: TGeometry, material?: TMaterial): this;

	type: 'LineLoop';
	readonly isLineLoop: true;
}

/**
 * A series of lines drawn between pairs of vertices.
 * This is nearly the same	as [Line](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line); the only difference is that it is rendered using [gl.LINES](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements)
 * instead of [gl.LINE_STRIP](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements).
 *
 * @template TGeometry
 * @template TMaterial
 */
export interface LineSegments<
	TGeometry extends BufferGeometry = BufferGeometry,
	TMaterial extends Material | Material[] = Material | Material[]
> extends Line<TGeometry, TMaterial> {
	/**
	 * @param geometry Pair(s) of vertices representing each line segment(s).
	 * @param material Material for the line. Default is [LineBasicMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineBasicMaterial).
	 */
	new (geometry?: TGeometry, material?: TMaterial): this;

	/**
	 * @default 'LineSegments'
	 */
	type: 'LineSegments' | string;
	readonly isLineSegments: true;
}

/**
 * Class representing triangular [polygon mesh](https://en.wikipedia.org/wiki/Polygon_mesh) based objects.
 * Also serves as a base for other classes such as [SkinnedMesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SkinnedMesh).
 *
 * ### Code Example
 * ```js
 * const geometry = new THREE.BoxGeometry( 1, 1, 1 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const mesh = new THREE.Mesh( geometry, material );
 * scene.add( mesh );
 * ```
 * @template TGeometry
 * @template TMaterial
 */
export interface Mesh<
	TGeometry extends BufferGeometry = BufferGeometry,
	TMaterial extends Material | Material[] = Material | Material[]
> extends Object3D {
	/**
	 * @param geometry an instance of [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry). Default is a new [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
	 * @param material A single or an array of [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material). Default is a new [MeshBasicMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MeshBasicMaterial)
	 */
	new (geometry?: TGeometry, material?: TMaterial): this;

	/**
	 * An instance of [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry) (or derived classes), defining the object's structure.
	 */
	geometry: TGeometry;

	/**
	 * An instance of material derived from the [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material) base class or an array of materials, defining the object's appearance. Default is a [MeshBasicMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MeshBasicMaterial).
	 */
	material: TMaterial;

	/**
	 * An array of weights typically from 0-1 that specify how much of the morph is applied.
	 * Undefined by default, but reset to a blank array by [updateMorphTargets](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Mesh.updateMorphTargets).
	 */
	morphTargetInfluences?: number[] | undefined;

	/**
	 * A dictionary of morphTargets based on the morphTarget.name property.
	 * Undefined by default, but rebuilt [updateMorphTargets](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Mesh.updateMorphTargets).
	 */
	morphTargetDictionary?: { [key: string]: number } | undefined;

	readonly isMesh: true;

	/**
	 *
	 */
	type: string;

	/**
	 * Updates the morphTargets to have no influence on the object. Resets the [morphTargetInfluences](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Mesh.morphTargetInfluences) and [morphTargetDictionary](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Mesh.morphTargetDictionary) properties.
	 */
	updateMorphTargets(): void;

	/**
	 * Get intersections between a casted ray and this mesh.
	 * [Raycaster.intersectObject](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Raycaster.intersectObject) will call this method, but the results are not ordered.
	 */
	raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}

/**
 * A class for displaying points.
 * The points are rendered by the [WebGLRenderer](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) using [gl.POINTS](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements).
 */
export interface Points<
	TGeometry extends BufferGeometry = BufferGeometry,
	TMaterial extends Material | Material[] = Material | Material[]
> extends Object3D {
	/**
	 * @param geometry an instance of [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).	Default is a new [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
	 * @param material A [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material). Default is a new [PointsMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PointsMaterial).
	 */
	new (geometry?: TGeometry, material?: TMaterial): this;

	type: 'Points';

	/**
	 * An array of weights typically from 0-1 that specify how much of the morph is applied.
	 * Undefined by default, but reset to a blank array by [updateMorphTargets](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Points.updateMorphTargets).
	 */
	morphTargetInfluences?: number[] | undefined;

	/**
	 * A dictionary of morphTargets based on the morphTarget.name property.
	 * Undefined by default, but rebuilt [updateMorphTargets](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Points.updateMorphTargets).
	 */
	morphTargetDictionary?: { [key: string]: number } | undefined;
	readonly isPoints: true;

	/**
	 * An instance of [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry) (or derived classes), defining the object's structure.
	 */
	geometry: TGeometry;

	/**
	 * An instance of [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material), defining the object's appearance.
	 * Default is a [PointsMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PointsMaterial).
	 */
	material: TMaterial;

	/**
	 * Get intersections between a casted ray and this Points.
	 * [Raycaster.intersectObject](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Raycaster.intersectObject) will call this method.
	 */
	raycast(raycaster: Raycaster, intersects: Intersection[]): void;

	/**
	 * Updates the morphTargets to have no influence on the object. Resets the [morphTargetInfluences](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Points.morphTargetInfluences) and [morphTargetDictionary](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Points.morphTargetDictionary) properties.
	 */
	updateMorphTargets(): void;
}

/**
 * Use an array of [bones](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Bone) to create a skeleton that can be used by a [SkinnedMesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SkinnedMesh).
 * See the [SkinnedMesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SkinnedMesh) page for an example of usage with standard [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
 *
 * ### Code Example
 * ```js
 * //  Create a simple "arm"
 * const bones = [];
 * const shoulder = new THREE.Bone();
 * const elbow = new THREE.Bone();
 * const hand = new THREE.Bone();
 * shoulder.add( elbow );
 * elbow.add( hand );
 * bones.push( shoulder );
 * bones.push( elbow );
 * bones.push( hand );
 * shoulder.position.y = -5;
 * elbow.position.y = 0;
 * hand.position.y = 5;
 * const armSkeleton = new THREE.Skeleton( bones );
 * ```
 */
export interface Skeleton {
	/**
	 * Creates a new Skeleton.
	 * @param bones The array of [bones](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Bone). Default is an empty array.
	 * @param boneInverses An array of [Matrix4s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4).
	 */
	new (bones: Bone[], boneInverses?: Matrix4[]): this;

	/**
	 */
	uuid: string;

	/**
	 * The array of [bones](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/bone). Note this is a copy of the original array, not a reference, so you can modify the original array without effecting this one.
	 */
	bones: Bone[];

	/**
	 * An array of [Matrix4s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) that represent the inverse of the [matrixWorld](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) of the individual bones.
	 */
	boneInverses: Matrix4[];

	/**
	 * The array buffer holding the bone data when using a vertex texture.
	 */
	boneMatrices: Float32Array;

	/**
	 * The [DataTexture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DataTexture) holding the bone data when using a vertex texture.
	 */
	boneTexture: null | DataTexture;

	/**
	 * The size of the *.boneTexture*.
	 */
	boneTextureSize: number;

	/**
	 */
	frame: number;

	/**
	 */
	init(): void;

	/**
	 * Generates the *.boneInverses* array if not provided in the constructor.
	 */
	calculateInverses(): void;

	/**
	 * Computes an instance of [DataTexture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DataTexture) in order to pass the bone data more efficiently to the shader. The texture is assigned to *.boneTexture*.
	 */
	computeBoneTexture(): this;

	/**
	 * @returns Returns the skeleton to the base pose.
	 */
	pose(): void;

	/**
	 * Updates the [boneMatrices](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float32Array) and [boneTexture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DataTexture) after changing the bones.
	 * This is called automatically by the [WebGLRenderer](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer) if the skeleton is used with a [SkinnedMesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SkinnedMesh).
	 */
	update(): void;

	/**
	 * @returns Returns a clone of this Skeleton object.
	 */
	clone(): Skeleton;

	/**
	 * Searches through the skeleton's bone array and returns the first with a matching name.
	 * @param name String to match to the Bone's .name property.
	 */
	getBoneByName(name: string): undefined | Bone;

	/**
	 * Can be used if an instance of Skeleton becomes obsolete in an application. The method will free internal resources.
	 */
	dispose(): void;
}

/**
 * A mesh that has a [Skeleton](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Skeleton) with [bones](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Bone) that can then be used to animate the vertices of the geometry.
 *
 * ### Code Example
 * ```js
 * const geometry = new THREE.CylinderGeometry( 5, 5, 5, 5, 15, 5, 30 );
 * //  create the skin indices and skin weights
 * const position = geometry.attributes.position;
 * const vertex = new THREE.Vector3();
 * const skinIndices = [];
 * const skinWeights = [];
 * for ( let i = 0; i < position.count; i ++ ) {
 * 	vertex.fromBufferAttribute( position, i );
 * 	//  compute skinIndex and skinWeight based on some configuration data 
 * 	const y = ( vertex.y + sizing.halfHeight );
 * 	const skinIndex = Math.floor( y / sizing.segmentHeight );
 * 	const skinWeight = ( y % sizing.segmentHeight ) / sizing.segmentHeight;
 * 	skinIndices.push( skinIndex, skinIndex + 1, 0, 0 );
 * 	skinWeights.push( 1 - skinWeight, skinWeight, 0, 0 );
 * }
 * geometry.setAttribute( 'skinIndex', new THREE.Uint16BufferAttribute( skinIndices, 4 ) );
 * geometry.setAttribute( 'skinWeight', new THREE.Float32BufferAttribute( skinWeights, 4 ) );
 * //  create skinned mesh and skeleton
 * const mesh = new THREE.SkinnedMesh( geometry, material );
 * const skeleton = new THREE.Skeleton( bones );
 * //  see example from THREE.Skeleton
 * const rootBone = skeleton.bones[ 0 ];
 * mesh.add( rootBone );
 * //  bind the skeleton to the mesh mesh.bind( skeleton );
 * //  move the bones and manipulate the model
 * skeleton.bones[ 0 ].rotation.x = -0.1;
 * skeleton.bones[ 1 ].rotation.x = 0.2;
 * ```
 * @template TGeometry
 * @template TMaterial
 */
export interface SkinnedMesh<
	TGeometry extends BufferGeometry = BufferGeometry,
	TMaterial extends Material | Material[] = Material | Material[]
> extends Mesh<TGeometry, TMaterial> {
	/**
	 * @param geometry an instance of [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
	 * @param material an instance of [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material). Default is a new [MeshBasicMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MeshBasicMaterial).
	 */
	new (geometry?: TGeometry, material?: TMaterial, useVertexTexture?: boolean): this;

	/**
	 * Either "attached" or "detached". "attached" uses the [SkinnedMesh.matrixWorld](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SkinnedMesh.matrixWorld) property for the base transform matrix of the bones. "detached" uses the [SkinnedMesh.bindMatrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SkinnedMesh.bindMatrix). Default is "attached".
	 */
	bindMode: string;

	/**
	 * The base matrix that is used for the bound bone transforms.
	 */
	bindMatrix: Matrix4;

	/**
	 * The base matrix that is used for resetting the bound bone transforms.
	 */
	bindMatrixInverse: Matrix4;

	/**
	 * [Skeleton](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Skeleton) representing the bone hierarchy of the skinned mesh.
	 */
	skeleton: Skeleton;

	readonly isSkinnedMesh: true;

	/**
	 * Bind a skeleton to the skinned mesh. The bindMatrix gets saved to .bindMatrix property and the .bindMatrixInverse gets calculated.
	 * @param skeleton Skeleton created from a [Bones](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Bone) tree.
	 * @param bindMatrix Matrix4 that represents the base transform of the skeleton.
	 */
	bind(skeleton: Skeleton, bindMatrix?: Matrix4): void;

	/**
	 * This method sets the skinned mesh in the rest pose (resets the pose).
	 */
	pose(): void;

	/**
	 * Normalizes the skin weights.
	 */
	normalizeSkinWeights(): void;

	/**
	 * Updates the [MatrixWorld](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4).
	 */
	updateMatrixWorld(force?: boolean): void;

	/**
	 * Calculates the position of the vertex at the given index relative to the current bone transformations.
	 */
	boneTransform(index: number, target: Vector3): Vector3;
}

/**
 * A sprite is a plane that always faces towards the camera, generally with a partially transparent texture applied.
 * Sprites do not cast shadows, setting castShadow = true will have no effect.
 *
 * ### Code Example
 * ```js
 * const map = new THREE.TextureLoader().load( 'sprite.png' );
 * const material = new THREE.SpriteMaterial( { map: map } );
 * const sprite = new THREE.Sprite( material );
 * scene.add( sprite );
 * ```
 */
export interface Sprite extends Object3D {
	/**
	 * Creates a new Sprite.
	 * @param material an instance of [SpriteMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpriteMaterial). Default is a white [SpriteMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpriteMaterial).
	 */
	new (material?: SpriteMaterial): this;

	/**
	 */
	type: 'Sprite';

	readonly isSprite: true;

	/**
	 * An instance of [SpriteMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpriteMaterial), defining the object's appearance.
	 * Default is a white [SpriteMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpriteMaterial).
	 */
	material: SpriteMaterial;

	/**
	 * The sprite's anchor point, and the point around which the sprite rotates. A value of (0.5, 0.5) corresponds to the midpoint of the sprite.
	 * A value of (0, 0) corresponds to the lower left corner of the sprite. The default is (0.5, 0.5).
	 */
	center: Vector2;

	/**
	 * Get intersections between a casted ray and this sprite. [Raycaster.intersectObject](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Raycaster.intersectObject)() will call this method.
	 * The raycaster must be initialized by calling [Raycaster.setFromCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Raycaster.setFromCamera)() before raycasting against sprites.
	 */
	raycast(raycaster: Raycaster, intersects: Intersection[]): void;

	/**
	 * Copies the properties of the passed sprite to this one.
	 */
	copy(source: this): this;
}
