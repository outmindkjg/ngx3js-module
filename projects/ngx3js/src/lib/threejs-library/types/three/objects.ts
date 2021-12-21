import { Camera } from './cameras';
import { BufferGeometry, InstancedBufferAttribute, Intersection, Object3D, Raycaster } from './core';
import { Material, SpriteMaterial } from './materials';
import { Color, Matrix4, Vector2, Vector3 } from './math';
import { DataTexture } from './textures';

/**
 * A bone which is part of a [Skeleton](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Skeleton). The skeleton in turn is used by the [SkinnedMesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SkinnedMesh).
 * Bones are almost identical to a blank [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D).
 *
 * ```javascript
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
 * ```javascript
 * const geometry = new THREE.BoxGeometry( 1, 1, 1 );
 * const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
 * const cubeA = new THREE.Mesh( geometry, material );
 * cubeA.position.set( 100, 100, 0 );
 * const cubeB = new THREE.Mesh( geometry, material );
 * cubeB.position.set( -100, -100, 0 );
 * // create a group and add the two cubes //These cubes can now be rotated / scaled etc as a group const group = new THREE.Group();
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
 * A special version of [Mesh](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Mesh) with instanced rendering support. Use [name] if you have to render a large number of objects with the same geometry and material but with different world transformations. The usage of [name] will help you to reduce the number of draw calls and thus improve the overall rendering performance in your application.
 *
 * [WebGL / instancing / dynamic](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_instancing_dynamic)
 * [WebGL / instancing / modified](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_instancing_modified)
 * [WebGL / instancing / performance](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_instancing_performance)
 * [WebGL / instancing / scatter](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_instancing_scatter)
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
	 * @param geometry - an instance of [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
	 * @param material - an instance of [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material). Default is a new [MeshBasicMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MeshBasicMaterial).
	 * @param count - the number of instances.
	 */
	new (geometry: TGeometry | undefined, material: TMaterial | undefined, count: number): this;

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
	 * [index](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer): The index of an instance. Values have to be in the range [0, count].
	 * [color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color): This color object will be set to the color of the defined instance.
	 */
	getColorAt(index: number, color: Color): void;

	/**
	 * Get the local transformation matrix of the defined instance.
	 * [index](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer): The index of an instance. Values have to be in the range [0, count].
	 * [matrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4): This 4x4 matrix will be set to the local transformation matrix of the defined instance.
	 */
	getMatrixAt(index: number, matrix: Matrix4): void;

	/**
	 * Sets the given color to the defined instance.
	 * Make sure you set *.instanceColor*[.needsUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.needsUpdate) to true after updating all the colors.
	 * [index](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer): The index of an instance. Values have to be in the range [0, count].
	 * [color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color): The color of a single instance.
	 */
	setColorAt(index: number, color: Color): void;

	/**
	 * Sets the given local transformation matrix to the defined instance.
	 * Make sure you set *.instanceMatrix*[.needsUpdate](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute.needsUpdate) to true after updating all the matrices.
	 * [index](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer): The index of an instance. Values have to be in the range [0, count].
	 * [matrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4): A 4x4 matrix representing the local transformation of a single instance.
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
 * [webgl / lod](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lod)
 *
 * ```javascript
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
	 * @param object - The [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D) to display at this level.
	 * @param distance - The distance at which to display this level of detail.
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
	 * @param object - The [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D) to display at this level.
	 * @param distance - The distance at which to display this level of detail.
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
 * ```javascript
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
	 * @param geometry - vertices representing the line segment(s). Default is a new [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
	 * @param material - material for the line. Default is a new [LineBasicMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineBasicMaterial).
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
	 * @param geometry - List of vertices representing points on the line loop.
	 * @param material - Material for the line. Default is [LineBasicMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineBasicMaterial).
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
	 * @param geometry - Pair(s) of vertices representing each line segment(s).
	 * @param material - Material for the line. Default is [LineBasicMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LineBasicMaterial).
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
 * ```javascript
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
	 * @param geometry - an instance of [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry). Default is a new [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
	 * @param material - a single or an array of [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material). Default is a new [MeshBasicMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MeshBasicMaterial)
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
	 * @param geometry - an instance of [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).	Default is a new [BufferGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
	 * @param material - a [Material](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Material). Default is a new [PointsMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PointsMaterial).
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

export interface Skeleton {
	new (bones: Bone[], boneInverses?: Matrix4[]): this;

	uuid: string;
	bones: Bone[];
	boneInverses: Matrix4[];
	boneMatrices: Float32Array;
	boneTexture: null | DataTexture;
	boneTextureSize: number;
	frame: number;

	init(): void;
	calculateInverses(): void;
	computeBoneTexture(): this;
	pose(): void;
	update(): void;
	clone(): Skeleton;
	getBoneByName(name: string): undefined | Bone;
	dispose(): void;

	/**
	 * @deprecated This property has been removed completely.
	 */
	useVertexTexture: boolean;
}

export interface SkinnedMesh<
	TGeometry extends BufferGeometry = BufferGeometry,
	TMaterial extends Material | Material[] = Material | Material[]
> extends Mesh<TGeometry, TMaterial> {
	new (geometry?: TGeometry, material?: TMaterial, useVertexTexture?: boolean): this;

	bindMode: string;
	bindMatrix: Matrix4;
	bindMatrixInverse: Matrix4;
	skeleton: Skeleton;
	readonly isSkinnedMesh: true;

	bind(skeleton: Skeleton, bindMatrix?: Matrix4): void;
	pose(): void;
	normalizeSkinWeights(): void;
	updateMatrixWorld(force?: boolean): void;
	boneTransform(index: number, target: Vector3): Vector3;
}

export interface Sprite extends Object3D {
	new (material?: SpriteMaterial): this;

	type: 'Sprite';
	readonly isSprite: true;

	geometry: BufferGeometry;
	material: SpriteMaterial;
	center: Vector2;

	raycast(raycaster: Raycaster, intersects: Intersection[]): void;
	copy(source: this): this;
}
