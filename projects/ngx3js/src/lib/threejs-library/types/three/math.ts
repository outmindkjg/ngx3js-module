import { Camera } from './cameras';
import { BufferAttribute, InterleavedBufferAttribute, Object3D } from './core';
import { Sprite } from './objects';

// Math //////////////////////////////////////////////////////////////////////////////////
export type ColorRepresentation = Color | string | number;

/**
 * Represents an axis-aligned bounding box (AABB) in 2D space.
 */
export interface Box2 {
	/**
	 * Creates a Box2 bounded by min and max.
	 *
	 * @param min Vector2 representing the lower (x, y) boundary of the box. Default is ( + Infinity, + Infinity ).
	 * @param max Vector2 representing the upper (x, y) boundary of the box. Default is ( - Infinity, - Infinity ).
	 */
	new (min?: Vector2, max?: Vector2): this;

	/**
	 * [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) representing the lower (x, y) boundary of the box.
	 * Default is ( + Infinity, + Infinity ).
	 */
	min: Vector2;

	/**
	 * [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) representing the lower upper (x, y) boundary of the box.
	 * Default is ( - Infinity, - Infinity ).
	 */
	max: Vector2;

	/**
	 * Sets the lower and upper (x, y) boundaries of this box.
	 * Please note that this method only copies the values from the given objects.
	 *
	 * @param min Vector2 representing the lower (x, y) boundary of the box.
	 * @param max Vector2 representing the upper (x, y) boundary of the box.
	 */
	set(min: Vector2, max: Vector2): Box2;

	/**
	 * Sets the upper and lower bounds of this box to include all of the points in [points](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array).
	 *
	 * @param points Array of [Vector2s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) that the resulting box will contain.
	 */
	setFromPoints(points: Vector2[]): Box2;

	/**
	 * Centers this box on [center](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) and sets this box's width and height to the values specified in [size](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 *
	 * @param center Desired center position of the box ([Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2)).
	 * @param size Desired x and y dimensions of the box ([Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2)).
	 */
	setFromCenterAndSize(center: Vector2, size: Vector2): Box2;

	/**
	 * @returns Returns a new [Box2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box2) with the same *.min* and *.max* as this one.
	 */
	clone(): this;

	/**
	 * Copies the *.min* and *.max* from [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box2) to this box.
	 */
	copy(box: Box2): this;

	/**
	 * Makes this box empty.
	 */
	makeEmpty(): Box2;

	/**
	 * @returns Returns true if this box includes zero points within its bounds.
	 * Note that a box with equal lower and upper bounds still includes one point, the one both bounds share.
	 */
	isEmpty(): boolean;

	/**
	 * @param target The result will be copied into this Vector2.
	 * @returns Returns the center point of the box as a [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 */
	getCenter(target: Vector2): Vector2;

	/**
	 * @param target The result will be copied into this Vector2.
	 * @returns Returns the width and height of this box.
	 */
	getSize(target: Vector2): Vector2;

	/**
	 * Expands the boundaries of this box to include [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 *
	 * @param point Vector2 that should be included in the box.
	 */
	expandByPoint(point: Vector2): Box2;

	/**
	 * Expands this box equilaterally by [vector](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2). The width of this box will be expanded by the x component of [vector](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) in both directions. The height of this box will be expanded by the y component of [vector](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) in both directions.
	 *
	 * @param vector Vector2 to expand the box by.
	 */
	expandByVector(vector: Vector2): Box2;

	/**
	 * Expands each dimension of the box by [scalar](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float). If negative, the dimensions of the box will be contracted.
	 *
	 * @param scalar Distance to expand the box by.
	 */
	expandByScalar(scalar: number): Box2;

	/**
	 * Returns true if the specified point lies within or on the boundaries of this box.
	 *
	 * @param point Vector2 to check for inclusion.
	 * @returns Returns true if the specified [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) lies within or on the boundaries of this box.
	 */
	containsPoint(point: Vector2): boolean;

	/**
	 * @param box Box2 to test for inclusion.
	 * @returns Returns true if this box includes the entirety of [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box2). If this and [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box2) are identical,  this function also returns true.
	 */
	containsBox(box: Box2): boolean;

	/**
	 * @param point Vector2.
	 * @param target The result will be copied into this Vector2.
	 * @returns Returns a point as a proportion of this box's width and height.
	 */
	getParameter(point: Vector2, target: Vector2): Vector2;

	/**
	 * Determines whether or not this box intersects [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box2).
	 * @param box Box to check for intersection against.
	 */
	intersectsBox(box: Box2): boolean;

	/**
	 * [Clamps](https://en.wikipedia.org/wiki/Clamping_(graphics)) the [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) within the bounds of this box.
	 *
	 * @param point Vector2 to clamp.
	 * @param target The result will be copied into this Vector2.
	 */
	clampPoint(point: Vector2, target: Vector2): Vector2;

	/**
	 * If the [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) lies inside of this box, the distance will be 0.
	 *
	 * @param point Vector2 to measure distance to.
	 * @returns Returns the distance from any edge of this box to the specified point.
	 */
	distanceToPoint(point: Vector2): number;

	/**
	 * @param box Box to intersect with.
	 * @returns Returns the intersection of this and [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box2), setting the upper bound of this box to the lesser of the two boxes' upper bounds and the lower bound of this box to the greater of the two boxes' lower bounds.
	 */
	intersect(box: Box2): Box2;

	/**
	 * Unions this box with [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box2), setting the upper bound of this box to the greater of the two boxes' upper bounds and the lower bound of this box to the lesser of the two boxes' lower bounds.
	 *
	 * @param box Box that will be unioned with this box.
	 */
	union(box: Box2): Box2;

	/**
	 * Adds [offset](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) to both the upper and lower bounds of this box, effectively moving this box [offset](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) units in 2D space.
	 *
	 * @param offset Direction and distance of offset.
	 */
	translate(offset: Vector2): Box2;

	/**
	 * @param box Box to compare with this one.
	 * @returns Returns true if this box and [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box2) share the same lower and upper bounds.
	 */
	equals(box: Box2): boolean;
}

/**
 * Represents an axis-aligned bounding box (AABB) in 3D space.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3) page for details.
 *
 * ### Examples
 * [webgl / loader / 3mf](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_3mf) |
 * [webgl / loader / ldraw](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_ldraw) |
 * [webgl / materials / normalmap / object / space](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_normalmap_object_space) |
 * [webxr / vr / haptics](https://outmindkjg.github.io/ngx3js-doc/#/examples/webxr_vr_haptics)
 *
 * ```js
 * const box = new THREE.Box3();
 * const mesh = new THREE.Mesh(
 * 	new THREE.SphereGeometry(),
 * 	new THREE.MeshBasicMaterial()
 * );
 * //  ensure the bounding box is computed for its geometry
 * // this should be done only once (assuming static geometries)
 * mesh.geometry.computeBoundingBox();
 * //  ...
 * //  in the animation loop, compute the current bounding box with the world matrix
 * box.copy( mesh.geometry.boundingBox ).applyMatrix4( mesh.matrixWorld );
 * ```
 */
export interface Box3 {
	/**
	 * Creates a Box3 bounded by min and max.
	 * @param min Vector3 representing the lower (x, y, z) boundary of the box. Default is ( + Infinity, + Infinity, + Infinity ).
	 * @param max Vector3 representing the upper (x, y, z) boundary of the box. Default is ( - Infinity, - Infinity, - Infinity ).
	 */
	new (min?: Vector3, max?: Vector3): this;

	/**
	 * [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) representing the lower (x, y, z) boundary of the box.
	 * Default is ( + Infinity, + Infinity, + Infinity ).
	 */
	min: Vector3;

	/**
	 * [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) representing the upper (x, y, z) boundary of the box.
	 * Default is ( - Infinity, - Infinity, - Infinity ).
	 */
	max: Vector3;

	readonly isBox3: true;

	/**
	 * Sets the lower and upper (x, y, z) boundaries of this box.
	 * Please note that this method only copies the values from the given objects.
	 * @param min Vector3 representing the lower (x, y, z) boundary of the box.
	 * @param max Vector3 representing the lower upper (x, y, z) boundary of the box.
	 */
	set(min: Vector3, max: Vector3): this;

	/**
	 * Sets the upper and lower bounds of this box to include all of the data in *array*.
	 * @param array An array of position data that the resulting box will envelop.
	 */
	setFromArray(array: ArrayLike<number>): this;

	/**
	 * Sets the upper and lower bounds of this box to include all of the data in [attribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute).
	 * @param attribute A buffer attribute of position data that the resulting box will envelop.
	 */
	setFromBufferAttribute(bufferAttribute: BufferAttribute): this;

	/**
	 * Sets the upper and lower bounds of this box to include all of the points in [points](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array).
	 * @param points Array of [Vector3s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) that the resulting box will contain.
	 */
	setFromPoints(points: Vector3[]): this;

	/**
	 * Centers this box on [center](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) and sets this box's width, height and depth to the values specified  in [size](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3)
	 * @param center Desired center position of the box.
	 * @param size Desired x, y and z dimensions of the box.
	 */
	setFromCenterAndSize(center: Vector3, size: Vector3): this;

	/**
	 * Computes the world-axis-aligned bounding box of an [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D) (including its children), accounting for the object's, and children's, world transforms.
	 * The function may result in a larger box than strictly necessary.
	 * @param object Object3D to compute the bounding box of.
	 */
	setFromObject(object: Object3D): this;

	/**
	 * @returns Returns a new [Box3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3) with the same *.min* and *.max* as this one.
	 */
	clone(): this;

	/**
	 * Copies the *.min* and *.max* from [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3) to this box.
	 * @param box Box3 to copy.
	 */
	copy(box: Box3): this;

	/**
	 * Makes this box empty.
	 */
	makeEmpty(): this;

	/**
	 * Note that a box with equal lower and upper bounds still includes one point, the one both bounds share.
	 * @returns Returns true if this box includes zero points within its bounds.
	 */
	isEmpty(): boolean;

	/**
	 * @param target The result will be copied into this Vector3.
	 * @returns Returns the center point of the box as a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	getCenter(target: Vector3): Vector3;

	/**
	 * @param target The result will be copied into this Vector3.
	 * @returns Returns the width, height and depth of this box.
	 */
	getSize(target: Vector3): Vector3;

	/**
	 *
	 * @param point
	 * @returns by point
	 */
	expandByPoint(point: Vector3): this;

	/**
	 * Expands this box equilaterally by [vector](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3). The width of this box will be expanded by the x component of [vector](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) in both directions. The height of this box will be expanded by the y component of [vector](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) in both directions.
	 * The depth of this box will be expanded by the z component of *vector* in both directions.
	 * @param vector Vector3 to expand the box by.
	 */
	expandByVector(vector: Vector3): this;

	/**
	 * Expands each dimension of the box by [scalar](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float). If negative, the dimensions of the box will be contracted.
	 * @param scalar Distance to expand the box by.
	 */
	expandByScalar(scalar: number): this;

	/**
	 * Expands the boundaries of this box to include [object](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D) and its children, accounting for the object's, and children's, world transforms.
	 * The function may result in a larger box than strictly necessary.
	 * @param object Object3D to expand the box by.
	 */
	expandByObject(object: Object3D): this;

	/**
	 * Expands the boundaries of this box to include [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 * @param point Vector3 that should be included in the box.
	 */
	containsPoint(point: Vector3): boolean;

	/**
	 * @param box Box3 to test for inclusion.
	 * @returns Returns true if this box includes the entirety of [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3). If this and [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3) are identical,  this function also returns true.
	 */
	containsBox(box: Box3): boolean;

	/**
	 * @param point Vector3.
	 * @param target The result will be copied into this Vector3.
	 * @returns Returns a point as a proportion of this box's width, height and depth.
	 */
	getParameter(point: Vector3, target: Vector3): Vector3;

	/**
	 * Determines whether or not this box intersects [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3).
	 * @param box Box to check for intersection against.
	 */
	intersectsBox(box: Box3): boolean;

	/**
	 * Determines whether or not this box intersects [sphere](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sphere).
	 * @param sphere Sphere to check for intersection against.
	 */
	intersectsSphere(sphere: Sphere): boolean;

	/**
	 * Determines whether or not this box intersects [plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 * @param plane Plane to check for intersection against.
	 */
	intersectsPlane(plane: Plane): boolean;

	/**
	 * Determines whether or not this box intersects [triangle](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Triangle).
	 * @param triangle Triangle to check for intersection against.
	 */
	intersectsTriangle(triangle: Triangle): boolean;

	/**
	 * [Clamps](https://en.wikipedia.org/wiki/Clamping_(graphics)) the [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) within the bounds of this box.
	 * @param point Vector3 to clamp.
	 * @param target The result will be copied into this Vector3.
	 */
	clampPoint(point: Vector3, target: Vector3): Vector3;

	/**
	 * If the [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) lies inside of this box, the distance will be 0.
	 * @param point Vector3 to measure distance to.
	 * @returns Returns the distance from any edge of this box to the specified point.
	 */
	distanceToPoint(point: Vector3): number;

	/**
	 * Gets a [Sphere](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sphere) that bounds the box.
	 * @param target The result will be copied into this Sphere.
	 */
	getBoundingSphere(target: Sphere): Sphere;

	/**
	 * Computes the intersection of this and [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3), setting the upper bound of this box to the lesser of the two boxes' upper bounds and the lower bound of this box to the greater of the two boxes' lower bounds. If there's no overlap, makes this box empty.
	 * @param box Box to intersect with.
	 */
	intersect(box: Box3): this;

	/**
	 * Computes the union of this box and [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3), setting the upper bound of this box to the greater of the two boxes' upper bounds and the lower bound of this box to the lesser of the two boxes' lower bounds.
	 * @param box Box that will be unioned with this box.
	 */
	union(box: Box3): this;

	/**
	 * @param matrix The [Matrix4](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) to apply Transforms this Box3 with the supplied matrix.
	 */
	applyMatrix4(matrix: Matrix4): this;

	/**
	 * Adds [offset](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) to both the upper and lower bounds of this box, effectively moving this box [offset](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) units in 3D space.
	 * @param offset Direction and distance of offset.
	 */
	translate(offset: Vector3): this;

	/**
	 * @param box Box to compare with this one.
	 * @returns Returns true if this box and [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3) share the same lower and upper bounds.
	 */
	equals(box: Box3): boolean;
}

/**
 * Hsl
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/HSL) page for details.
 */
export interface HSL {
	h: number;
	s: number;
	l: number;
}

/**
 * Class representing a color.
 *
 * A Color can be initialised in any of the following ways:
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) page for details.
 *
 * ### Examples
 * [misc / exporter / collada](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_collada) |
 * [webgl / camera / logarithmicdepthbuffer](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_camera_logarithmicdepthbuffer) |
 * [webgl / clipping / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_clipping_advanced) |
 * [webgl / framebuffer / texture](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_framebuffer_texture) |
 * [webgl / geometry / colors](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_colors)
 *
 * ### Code Example
 * 
 * ```js
 * // empty constructor - will default white
 * const color1 = new THREE.Color();
 * // Hexadecimal color (recommended)
 * const color2 = new THREE.Color( 0xff0000 );
 * // RGB string
 * const color3 = new THREE.Color("rgb(255, 0, 0)");
 * const color4 = new THREE.Color("rgb(100%, 0%, 0%)");
 * // X11 color name - all 140 color names are supported.
 * // Note the lack of CamelCase in the name
 * const color5 = new THREE.Color( 'skyblue' );
 * // HSL string
 * const color6 = new THREE.Color("hsl(0, 100%, 50%)");
 * // Separate RGB values between 0 and 1
 * const color7 = new THREE.Color( 1, 0, 0 );
 * ```
 * @example const color = new THREE.Color( 0xff0000 );
 */
export interface Color {
	/**
	 * Note that standard method of specifying color in three.js is with a [hexadecimal triplet](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet), and that method is used throughout the rest of the documentation.
	 * When all arguments are defined then [r](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color_Hex_or_String) is the red component, [g](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) is the green component and [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) is the blue component of the color.
	 * When only [r](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color_Hex_or_String) is defined:

	 * It can be a [hexadecimal triplet](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet) representing the color (recommended).
	 * It can be an another Color instance.
	 * It can be a CSS-style string. For example:
	
	 * 'rgb(250, 0,0)', 'rgb(100%,0%,0%)', 'hsl(0, 100%, 50%)', '#ff0000', '#f00', 'red'

	 * @param r If arguments [g](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) and [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) are defined, the red component of the color. If they are not defined, it can be a [hexadecimal triplet](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet) (recommended), a CSS-style string, or another Color instance.
	 * @param g If it is defined, the green component of the color.
	 * @param b If it is defined, the blue component of the color.
	*/
	new (r?: number | ColorRepresentation, g?: number, b?: number): this;

	readonly isColor: true;

	/**
	 * Red channel value between 0 and 1. Default is 1.
	 */
	r: number;

	/**
	 * Green channel value between 0 and 1. Default is 1.
	 */
	g: number;

	/**
	 * Blue channel value between 0 and 1. Default is 1.
	 */
	b: number;

	/**
	 * See the Constructor above for full details of what [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color_Hex_or_String) can be.
	 * Delegates to *.copy*, *.setStyle*, or *.setHex* depending on input type.
	 * @param color Value to set this color to.
	 */
	set(color: ColorRepresentation): Color;

	/**
	 * Sets all three color components to the value [scalar](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * @param scalar A value between 0.0 and 1.0.
	 */
	setScalar(scalar: number): Color;

	/**
	 * Sets this color from a hexadecimal value.
	 * @param hex [hexadecimal triplet](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet) format.
	 */
	setHex(hex: number): Color;

	/**
	 * Sets this color from RGB values.
	 * @param r Red channel value between 0.0 and 1.0.
	 * @param g Green channel value between 0.0 and 1.0.
	 * @param b Blue channel value between 0.0 and 1.0.
	 */
	setRGB(r: number, g: number, b: number): Color;

	/**
	 * Sets color from HSL values.
	 *
	 * @param h hue value between 0.0 and 1.0
	 * @param s saturation value between 0.0 and 1.0
	 * @param l lightness value between 0.0 and 1.0
	 */
	setHSL(h: number, s: number, l: number): Color;

	/**
	 * Sets this color from a CSS-style string. For example,  "rgb(250, 0,0)", "rgb(100%, 0%, 0%)", "hsl(0, 100%, 50%)", "#ff0000", "#f00", or "red" ( or any [X11 color name](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) - all 140 color names are supported ).
	 * Translucent colors such as "rgba(255, 0, 0, 0.5)" and "hsla(0, 100%, 50%, 0.5)" are also accepted, but the alpha-channel coordinate will be discarded.
	 * Note that for X11 color names, multiple words such as Dark Orange become the string 'darkorange'.
	 * @param style color as a CSS-style string.
	 */
	setStyle(style: string): Color;

	/**
	 * Sets this color from a color name. Faster than *.setStyle* method if you don't need the other CSS-style formats.
	 * For convenience, the list of names is exposed in Color.NAMES as a hash:
	 * Color.NAMES.aliceblue // returns 0xF0F8FF
	 * @param style color name ( from [X11 color names](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) ).
	 */
	setColorName(style: string): Color;

	/**
	 * @returns Returns a new Color with the same *.r*, *.g* and *.b* values as this one.
	 */
	clone(): this;

	/**
	 * Copies the *.r*, *.g* and *.b* parameters from [color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) in to this color.
	 */
	copy(color: Color): this;

	/**
	 * Copies the given color into this color, and then converts this color from gamma space to linear space by taking *.r*, *.g* and *.b* to the power of [gammaFactor](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * @param color Color to copy.
	 * @param gammaFactor Default is *2.0*.
	 */
	copyGammaToLinear(color: Color, gammaFactor?: number): Color;

	/**
	 * Copies the given color into this color, and then converts this color from linear space to gamma space by taking *.r*, *.g* and *.b* to the power of 1 / [gammaFactor](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * @param color Color to copy.
	 * @param gammaFactor Default is *2.0*.
	 */
	copyLinearToGamma(color: Color, gammaFactor?: number): Color;

	/**
	 * Converts this color from gamma space to linear space by taking *.r*, *.g* and *.b* to the power of [gammaFactor](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * @param gammaFactor Default is *2.0*.
	 */
	convertGammaToLinear(gammaFactor?: number): Color;

	/**
	 * Converts this color from linear space to gamma space by taking *.r*, *.g* and *.b* to the power of 1 / [gammaFactor](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * @param gammaFactor Default is *2.0*.
	 */
	convertLinearToGamma(gammaFactor?: number): Color;

	/**
	 * Converts this color from sRGB space to linear space.
	 */
	copySRGBToLinear(color: Color): Color;

	/**
	 * Copies the given color into this color, and then converts this color from linear space to sRGB space.
	 * @param color Color to copy.
	 */
	copyLinearToSRGB(color: Color): Color;

	/**
	 * Copies the given color into this color, and then converts this color from sRGB space to linear space.
	 * @param color Color to copy.
	 */
	convertSRGBToLinear(): Color;

	/**
	 * Converts this color from linear to sRGB space.
	 */
	convertLinearToSRGB(): Color;

	/**
	 * @returns Returns the hexadecimal value of this color.
	 */
	getHex(): number;

	/**
	 * @returns Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
	 */
	getHexString(): string;

	/**
	 * Convert this Color's *.r*, *.g* and *.b* values to [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) format and returns an object of the form: { h: 0, s: 0, l: 0 }
	 * @param target The result will be copied into this Object. Adds h, s and l keys to the object (if not already present).
	 */
	getHSL(target: HSL): HSL;

	/**
	 * @returns Returns the value of this color as a CSS style string. Example: 'rgb(255,0,0)'.
	 */
	getStyle(): string;

	/**
	 * Adds the given [h](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), and [l](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) to this color's values.
	 * Internally, this converts the color's *.r*, *.g* and *.b* values to HSL, adds [h](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), and [l](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), and then converts the color back to RGB.
	 */
	offsetHSL(h: number, s: number, l: number): this;

	/**
	 * Adds the RGB values of [color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) to the RGB values of this color.
	 */
	add(color: Color): this;

	/**
	 * Sets this color's RGB values to the sum of the RGB values of [color1](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) and [color2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color).
	 */
	addColors(color1: Color, color2: Color): this;

	/**
	 * Adds [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Number) to the RGB values of this color.
	 */
	addScalar(s: number): this;

	/**
	 * Subtracts the RGB components of the given color from the RGB components of this color.
	 * If this results in a negative component, that component is set to zero.
	 */
	sub(color: Color): this;

	/**
	 * Multiplies this color's RGB values by the given [color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color)'s RGB values.
	 */
	multiply(color: Color): this;

	/**
	 * Multiplies this color's RGB values by [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Number).
	 */
	multiplyScalar(s: number): this;

	/**
	 * Linearly interpolates this color's RGB values toward the RGB values of the passed argument.
	 * The alpha argument can be thought of as the ratio between the two colors, where 0.0 is this color and 1.0 is the first argument.
	 * @param color color to converge on.
	 * @param alph A interpolation factor in the closed interval [0, 1].
	 */
	lerp(color: Color, alpha: number): this;

	/**
	 * Sets this color to be the color linearly interpolated between [color1](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) and [color2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) where alpha is the percent distance along the line connecting the two colors - alpha = 0 will be [color1](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color), and alpha = 1 will be [color2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color).
	 * @param color1 The starting [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color).
	 * @param color2 Color to interpolate towards.
	 * @param alph A interpolation factor, typically in the closed interval [0, 1].
	 */
	lerpColors(color1: Color, color2: Color, alpha: number): this;

	/**
	 * Linearly interpolates this color's HSL values toward the HSL values of the passed argument.
	 * It differs from the classic *.lerp* by not interpolating straight from one color to the other, but instead going through all the hues in between those two colors.
	 * The alpha argument can be thought of as the ratio between the two colors, where 0.0 is this color and 1.0 is the first argument.
	 * @param color color to converge on.
	 * @param alph A interpolation factor in the closed interval [0, 1].
	 */
	lerpHSL(color: Color, alpha: number): this;

	/**
	 * Compares the RGB values of [color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) with those of this object. Returns true if they are the same, false otherwise.
	 */
	equals(color: Color): boolean;

	/**
	 * Sets this color's components based on an array formatted like [ [r](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), [g](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) ].
	 * @param array Array of floats in the form [ [r](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), [g](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) ].
	 * @param offset An optional offset into the array.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): this;

	/**
	 * Returns an array [red, green, blue], or copies red, green and blue into the provided array.
	 * @param array An optional array to store the color to.
	 * @param offset An optional offset into the array.
	 * @returns Returns an array of the form [ r, g, b ].
	 */
	toArray(array?: number[] | ArrayLike<number>, offset?: number): number[];

	/**
	 * Sets this color's components from the [attribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute).
	 * @param attribute The source attribute.
	 * @param index index in the attribute.
	 */
	fromBufferAttribute(attribute: BufferAttribute, index: number): this;

	/**
	 * List of X11 color names.
	 */
	NAMES: Record<string, number>;
}

/**
 * A point's [cylindrical coordinates](https://en.wikipedia.org/wiki/Cylindrical_coordinate_system).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Cylindrical) page for details.
 */
export interface Cylindrical {
	/**
	 * @param radius distance from the origin to a point in the x-z plane. Default is *1.0*.
	 * @param thet A counterclockwise angle in the x-z plane measured in radians from the positive z-axis. Default is *0*.
	 * @param y height above the x-z plane. Default is *0*.
	 */
	new (radius?: number, theta?: number, y?: number): this;

	/**
	 * Distance from the origin to a point in the x-z plane. Default is *1.0*.
	 */
	radius: number;

	/**
	 * Counterclockwise angle in the x-z plane measured in radians from the positive z-axis. Default is *0*.
	 */
	theta: number;

	/**
	 * Height above the x-z plane. Default is *0*.
	 */
	y: number;

	/**
	 * @returns Returns a new cylindrical with the same *.radius*, *.theta* and *.y* properties as this one.
	 */
	clone(): this;

	/**
	 * Copies the values of the passed Cylindrical's *.radius*, *.theta* and *.y* properties to this cylindrical.
	 */
	copy(other: Cylindrical): this;

	/**
	 * Sets values of this cylindrical's *.radius*, *.theta* and *.y* properties.
	 */
	set(radius: number, theta: number, y: number): this;

	/**
	 * Sets values of this cylindrical's *.radius*, *.theta* and *.y* properties from the [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	setFromVector3(vec3: Vector3): this;

	/**
	 * Sets values of this cylindrical's *.radius*, *.theta* and *.y* properties from Cartesian coordinates.
	 */
	setFromCartesianCoords(x: number, y: number, z: number): this;
}

/**
 * A class representing [Euler Angles](http://en.wikipedia.org/wiki/Euler_angles).
 * Euler angles describe a rotational transformation by rotating an object on its various axes in specified amounts per axis, and a specified axis order.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Euler) page for details.
 *
 * ### Examples
 * [css3d / orthographic](https://outmindkjg.github.io/ngx3js-doc/#/examples/css3d_orthographic)
 * [webgl / custom / attributes / points3](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_custom_attributes_points3)
 * [webgl / decals](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_decals)
 * [webgl / instancing / performance](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_instancing_performance)
 * [webgl / interactive / cubes / gpu](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_interactive_cubes_gpu)
 *
 * ### Code Example
 * 
 * ```js
 * const a = new THREE.Euler( 0, 1, 1.57, 'XYZ' );
 * const b = new THREE.Vector3( 1, 0, 1 );
 * b.applyEuler(a);
 * ```
 */
export interface Euler {
	/**
	 * @param x The angle of the x axis in radians. Default is *0*.
	 * @param y The angle of the y axis in radians. Default is *0*.
	 * @param z The angle of the z axis in radians. Default is *0*.
	 * @param order A string representing the order that the rotations are applied, defaults to 'XYZ' (must be upper case).
	 */
	new (x?: number, y?: number, z?: number, order?: string): this;

	/**
	 * The angle of the x axis in radians. Default is *0*.
	 */
	x: number;

	/**
	 * The angle of the y axis in radians. Default is *0*.
	 */
	y: number;

	/**
	 * The angle of the z axis in radians. Default is *0*.
	 */
	z: number;

	/**
	 * The order in which to apply rotations. Default is 'XYZ', which means that the object will first be rotated around its X axis, then its Y axis and finally its Z axis. Other possibilities are:
	 * 'YZX', 'ZXY', 'XZY', 'YXZ' and 'ZYX'. These must be in upper case.
	 * Three.js uses <em>intrinsic</em> Tait-Bryan angles. This means that rotations are performed with respect to the <em>local</em> coordinate system. That is, for order 'XYZ', the rotation is first around the local-Xt axis (which is the same as the world-X axis), then around local-Y (which may now be different from the world Y-axis), then local-Z (which may be different from the world Z-axis).
	 */
	order: string;

	readonly isEuler: true;

	_onChangeCallback: () => void;

	/**
	 * Sets the angles of this euler transform and optionally the *.order*.
	 *
	 * @param x The angle of the x axis in radians.
	 * @param y The angle of the y axis in radians.
	 * @param z The angle of the z axis in radians.
	 * @param order A string representing the order that the rotations are applied.
	 */
	set(x: number, y: number, z: number, order?: string): Euler;

	/**
	 * @returns Returns a new Euler with the same parameters as this one.
	 */
	clone(): this;

	/**
	 * Copies value of [euler](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Euler) to this euler.
	 */
	copy(euler: Euler): this;

	/**
	 * Sets the angles of this euler transform from a pure rotation matrix based on the orientation specified by order.
	 *
	 * @param m A [Matrix4](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) of which the upper 3x3 of matrix is a pure [rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix) (i.e. unscaled).
	 * @param order A string representing the order that the rotations are applied.
	 * @param update
	 */
	setFromRotationMatrix(m: Matrix4, order?: string, update?: boolean): Euler;

	/**
	 * Sets the angles of this euler transform from a normalized quaternion based on the orientation specified by *.order*.
	 *
	 * @param q A normalized quaternion.
	 * @param order A string representing the order that the rotations are applied.
	 * @param update
	 */
	setFromQuaternion(q: Quaternion, order?: string, update?: boolean): Euler;

	/**
	 * Set the *.x*, *.y* and *.z*, and optionally update the *.order*.
	 *
	 * @param v Vector3.
	 * @param order A string representing the order that the rotations are applied.
	 */
	setFromVector3(v: Vector3, order?: string): Euler;

	/**
	 * Resets the euler angle with a new order by creating a quaternion from this euler angle and then setting this euler angle with the quaternion and the new order.
	 * <em>WARNING</em>: this discards revolution information.
	 */
	reorder(newOrder: string): Euler;

	/**
	 * Checks for strict equality of this euler and [euler](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Euler).
	 */
	equals(euler: Euler): boolean;

	/**
	 * Assigns this euler's *.x* angle to array[0].
	 * Assigns this euler's *.y* angle to array[1].
	 * Assigns this euler's *.z* angle to array[2].
	 * Optionally assigns this euler's *.order* to array[3].
	 * @param array of length 3 or 4. The optional 4th argument corresponds to the *.order*.
	 */
	fromArray(xyzo: any[]): Euler;

	/**
	 *
	 * @param array array to store the euler in.
	 * @param offset offset in the array.
	 * @returns Returns an array of the form [*.x*, *.y*, *.z*, *.order*].
	 */
	toArray(array?: number[], offset?: number): number[];

	/**
	 * @param optionalResult If specified, the result will be copied into this Vector, otherwise a new one will be created.
	 * @returns Returns the Euler's *.x*, *.y* and *.z* properties as a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	toVector3(optionalResult?: Vector3): Vector3;

	_onChange(callback: () => void): this;

	RotationOrders: string[];
	DefaultOrder: string;
}

/**
 * [Frustums](http://en.wikipedia.org/wiki/Frustum) are used to determine what is inside the camera's field of view. They help speed up the rendering process - objects which lie outside a camera's frustum can safely be excluded from rendering.
 * This class is mainly intended for use internally by a renderer for calculating a [camera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Camera) or [shadowCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LightShadow.camera)'s frustum.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Frustum) page for details.
 *
 * ### Examples
 * [webgl / performance / shader](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_performance_shader)
 *
 */
export interface Frustum {
	/**
	 * Creates a new Frustum.
	 *
	 * @param p0 defaults to a new [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 * @param p1 defaults to a new [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 * @param p2 defaults to a new [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 * @param p3 defaults to a new [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 * @param p4 defaults to a new [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 * @param p5 defaults to a new [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 */
	new (p0?: Plane, p1?: Plane, p2?: Plane, p3?: Plane, p4?: Plane, p5?: Plane): this;

	/**
	 * Array of 6 [planes](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 */
	planes: Plane[];

	/**
	 * Sets the frustum from the passed planes. No plane order is implied.
	 * Note that this method only copies the values from the given objects.
	 *
	 * @param p0 defaults to a new [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 * @param p1 defaults to a new [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 * @param p2 defaults to a new [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 * @param p3 defaults to a new [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 * @param p4 defaults to a new [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 * @param p5 defaults to a new [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 */
	set(p0: Plane, p1: Plane, p2: Plane, p3: Plane, p4: Plane, p5: Plane): Frustum;

	/**
	 * @returns Return a new Frustum with the same parameters as this one.
	 */
	clone(): this;

	/**
	 * @param frustum The frustum to copy Copies the properties of the passed [frustum](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Frustum) into this one.
	 */
	copy(frustum: Frustum): this;

	/**
	 * Sets the frustum planes from the projection matrix.
	 * @param matrix Projection [Matrix4](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) used to set the *.planes*
	 */
	setFromProjectionMatrix(m: Matrix4): this;

	/**
	 * Checks whether the [object](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D)'s [bounding sphere](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry.boundingSphere) is intersecting the Frustum.
	 * Note that the object must have a [geometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry) so that the bounding sphere can be calculated.
	 */
	intersectsObject(object: Object3D): boolean;

	/**
	 * Checks whether the [sprite](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sprite) is intersecting the Frustum.
	 *
	 * @returns true if sprite
	 */
	intersectsSprite(sprite: Sprite): boolean;

	/**
	 * @param sphere Sphere to check for intersection.
	 * @returns Return true if [sphere](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sphere) intersects with this frustum.
	 */
	intersectsSphere(sphere: Sphere): boolean;

	/**
	 * @param box Box3 to check for intersection.
	 * @returns Return true if [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3) intersects with this frustum.
	 */
	intersectsBox(box: Box3): boolean;

	/**
	 * Checks to see if the frustum contains the [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 * @param point Vector3 to test.
	 */
	containsPoint(point: Vector3): boolean;
}

/**
 * Abstract base class of interpolants over parametric samples.
 * The parameter domain is one dimensional, typically the time or a path along a curve defined by the data.
 * The sample values can have any dimensionality and derived classes may apply special interpretations to the data.
 * This class provides the interval seek in a Template Method, deferring the actual interpolation to derived classes.
 * Time complexity is *O(1)* for linear access crossing at most two points and *O(log N)* for random access, where *N* is the number of positions.
 * References:	[http://www.oodesign.com/template-method-pattern.html](http://www.oodesign.com/template-method-pattern.html)
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Interpolant) page for details.
 */
export interface Interpolant {
	/**
	 * Note: This is not designed to be called directly.
	 *
	 * @param parameterPositions - array of positions
	 * @param sampleValues - array of samples
	 * @param sampleSize - number of samples
	 * @param resultBuffer - buffer to store the interpolation results.
	 */
	new (parameterPositions: any, sampleValues: any, sampleSize: number, resultBuffer?: any): this;

	/**
	 * Array of positions
	 */
	parameterPositions: any;

	/**
	 * Array of samples
	 */
	sampleValues: any;

	/**
	 * Number of samples
	 */
	valueSize: number;

	/**
	 * Buffer to store the interpolation results.
	 */
	resultBuffer: any;

	/**
	 * Evaluate the interpolant at position *t*.
	 *
	 * @param time
	 */
	evaluate(time: number): any;
}

/**
 * A geometric line segment represented by a start and end point.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line3) page for details.
 */
export interface Line3 {
	/**
	 * Creates a new Line3.
	 *
	 * @param start Start of the line segment. Default is (0, 0, 0).
	 * @param end End of the line segment. Default is (0, 0, 0).
	 */
	new (start?: Vector3, end?: Vector3): this;

	/**
	 * [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) representing the start point of the line.
	 */
	start: Vector3;

	/**
	 * [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) representing the end point of the line.
	 */
	end: Vector3;

	/**
	 * Sets the start and end values by copying the provided vectors.
	 * @param start set the *.start* of the line.
	 * @param end set the *.end* of the line.
	 */
	set(start?: Vector3, end?: Vector3): Line3;

	/**
	 * @returns Returns a new [Line3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line3) with the same *.start* and *.end* vectors as this one.
	 */
	clone(): this;

	/**
	 * Copies the passed line's *.start* and *.end* vectors to this line.
	 */
	copy(line: Line3): this;

	/**
	 * @param target The result will be copied into this Vector3.
	 * @returns Returns the center of the line segment.
	 */
	getCenter(target: Vector3): Vector3;

	/**
	 * @param target The result will be copied into this Vector3.
	 * @returns Returns the delta vector of the line segment ( *.end* vector minus the *.start* vector).
	 */
	delta(target: Vector3): Vector3;

	/**
	 * @returns Returns the square of the [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) (straight-line distance) between the line's *.start* and *.end* vectors.
	 */
	distanceSq(): number;

	/**
	 * (straight-line distance) between the line's *.start* and *.end* points.
	 * @returns Returns the [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)
	 */
	distance(): number;

	/**
	 * @param t Use values 0-1 to return a position along the line segment.
	 * @param target The result will be copied into this Vector3.
	 * @returns Returns a vector at a certain position along the line. When [t](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) = 0, it returns the start vector, and when [t](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) = 1 it returns the end vector.
	 */
	at(t: number, target: Vector3): Vector3;

	/**
	 * If [clampToLine](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is true, then the returned value will be between 0 and 1.
	 *
	 * @param point The point for which to return a point parameter.
	 * @param clampToLine Whether to clamp the result to the range [0, 1].
	 * @returns Returns a point parameter based on the closest point as projected on the line segement.
	 */
	closestPointToPointParameter(point: Vector3, clampToLine?: boolean): number;

	/**
	 * @param point return the closest point on the line to this point.
	 * @param clampToLine whether to clamp the returned value to the line segment.
	 * @param target The result will be copied into this Vector3.
	 * @returns Returns the closets point on the line. If [clampToLine](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Boolean) is true, then the returned value will be clamped to the line segment.
	 */
	closestPointToPoint(point: Vector3, clampToLine: boolean, target: Vector3): Vector3;

	/**
	 * Applies a matrix transform to the line segment.
	 */
	applyMatrix4(matrix: Matrix4): Line3;

	/**
	 * @param line Line3 to compare with this one.
	 * @returns Returns true if both line's *.start* and *.end* points are equal.
	 */
	equals(line: Line3): boolean;
}

/**
 * An object with several math utility functions.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MathUtils) page for details.
 *
 * ### Examples
 * [css3d / orthographic](https://outmindkjg.github.io/ngx3js-doc/#/examples/css3d_orthographic)
 * [misc / controls / transform](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_controls_transform)
 * [webgl / camera / logarithmicdepthbuffer](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_camera_logarithmicdepthbuffer)
 * [webgl / camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_camera)
 * [webgl / geometry / extrude / shapes](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_extrude_shapes)
 *
 */
export interface MathUtils {
	/**
	 * Generate a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) (universally unique identifier).
	 */
	generateUUID(): string;

	/**
	 * Clamps the [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) to be between [min](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) and [max](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * @param value Value to be clamped.
	 * @param min Minimum value.
	 * @param max Maximum value.
	 */
	clamp(value: number, min: number, max: number): number;

	/**
	 * @param n Integers Computes the Euclidean modulo of [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) % [n](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer), that is: ( ( n % m ) + m ) % m
	 */
	euclideanModulo(n: number, m: number): number;

	/**
	 * Linear mapping of [x](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) from range [[a1](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), [a2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float)] to range [[b1](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), [b2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float)].
	 * @param x Value to be mapped.
	 * @param a1 Minimum value for range A.
	 * @param a2 Maximum value for range A.
	 * @param b1 Minimum value for range B.
	 * @param b2 Maximum value for range B.
	 */
	mapLinear(x: number, a1: number, a2: number, b1: number, b2: number): number;

	/**
	 * See [Smoothstep](http://en.wikipedia.org/wiki/Smoothstep) for details.
	 *
	 * @param x The value to evaluate based on its position between min and max.
	 * @param min Any x value below min will be 0.
	 * @param max Any x value above max will be 1.
	 * @returns Returns a value between 0-1 that represents the percentage that x has moved between min and max, but smoothed or slowed down the closer X is to the min and max.
	 */
	smoothstep(x: number, min: number, max: number): number;

	/**
	 * @param x The value to evaluate based on its position between min and max.
	 * @param min Any x value below min will be 0.
	 * @param max Any x value above max will be 1.
	 * @returns Returns a value between 0-1. A [variation on smoothstep](https://en.wikipedia.org/wiki/Smoothstep#Variations) that has zero 1st and 2nd order derivatives at x=0 and x=1.
	 */
	smootherstep(x: number, min: number, max: number): number;

	/**
	 * Random integer from low to high interval.
	 */
	randInt(low: number, high: number): number;

	/**
	 * Random float in the interval
	 * @param low
	 * @param high
	 */
	randFloat(low: number, high: number): number;

	/**
	 * Random float from - range / 2 to range / 2 interval.
	 * @param range
	 */
	randFloatSpread(range: number): number;

	/**
	 * Deterministic pseudo-random float in the interval [0, 1].
	 * The integer *seed* is optional.
	 */
	seededRandom(seed?: number): number;

	/**
	 * Converts degrees to radians.
	 */
	degToRad(degrees: number): number;

	/**
	 * Converts radians to degrees.
	 */
	radToDeg(radians: number): number;

	/**
	 * @returns Return *true* if [n](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Number) is a power of 2.
	 */
	isPowerOfTwo(value: number): boolean;

	/**
	 * @param x Start point.
	 * @param y End point.
	 * @param t A value between start and end.
	 * @returns Returns the percentage in the closed interval [0, 1] of the given value between the start and end point.
	 */
	inverseLerp(x: number, y: number, t: number): number;

	/**
	 * @param x Start point.
	 * @param y End point.
	 * @param t interpolation factor in the closed interval [0, 1].
	 * @returns Returns a value [linearly interpolated](https://en.wikipedia.org/wiki/Linear_interpolation) from two known points based on the given interval - [t](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) = 0 will return [x](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) and [t](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) = 1 will return [y](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	lerp(x: number, y: number, t: number): number;

	/**
	 * Smoothly interpolate a number from [x](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) toward [y](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) in a spring-like manner using the [dt](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) to maintain frame rate independent movement.
	 * For details, see [Frame rate independent damping using lerp](http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/).
	 * @param x Current point.
	 * @param y Target point.
	 * @param lambda A higher lambda value will make the movement more sudden, and a lower value will make the movement more gradual.
	 * @param dt Delta time in seconds.
	 */
	damp(x: number, y: number, lambda: number, dt: number): number;

	/**
	 * @param x The value to pingpong.
	 * @param length The positive value the function will pingpong to. Default is 1.
	 * @returns Returns a value that alternates between 0 and [param:Float length].
	 */
	pingpong(x: number, length?: number): number;

	/**
	 * @returns Returns the largest power of 2 that is less than or equal to [n](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Number).
	 */
	floorPowerOfTwo(value: number): number;

	/**
	 * @returns Returns the smallest power of 2 that is greater than or equal to [n](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Number).
	 */
	ceilPowerOfTwo(value: number): number;

	/**
	 * Rotations are applied to the axes in the order specified by [order](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/String): rotation by angle [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) is applied first, then by angle [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), then by angle [c](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float). Angles are in radians.
	 *
	 * @param q
	 * @param a The rotation applied to the first axis, in radians
	 * @param b The rotation applied to the second axis, in radians
	 * @param c The rotation applied to the third axis, in radians
	 * @param order A string specifying the axes order: 'XYX', 'XZX', 'YXY', 'YZY', 'ZXZ', or 'ZYZ' Sets quaternion [q](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion) from the [intrinsic Proper Euler Angles](http://en.wikipedia.org/wiki/Euler_angles) defined by angles [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), and [c](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), and order [order](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/String).
	 */
	setQuaternionFromProperEuler(q: Quaternion, a: number, b: number, c: number, order: string): void;

	/**
	 * degree to radian
	 */
	DEG2RAD : number ;

	/**
	 * radian to degree
	 */
	RAD2DEG : number;

}

export type Matrix3Tuple = [number, number, number, number, number, number, number, number, number];

/**
 * A class representing a [matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics)).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix) page for details.
 */
export interface Matrix {
	/**
	 * Array with matrix values.
	 */
	elements: number[];

	/**
	 * Resets this matrix to the [identity matrix](https://en.wikipedia.org/wiki/Identity_matrix).
	 */
	identity(): Matrix;

	/**
	 * Copies the *.elements* of matrix [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix) into this matrix.
	 */
	copy(m: this): this;

	/**
	 * Multiplies every component of the matrix by a scalar value [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	multiplyScalar(s: number): Matrix;

	/**
	 * Computes and returns the [determinant](https://en.wikipedia.org/wiki/Determinant) of this matrix.
	 */
	determinant(): number;

	/**
	 * [Transposes](https://en.wikipedia.org/wiki/Transpose) this matrix.
	 */
	transpose(): Matrix;

	/**
	 * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
	 * You can not invert with a determinant of zero. If you attempt this, the method produces a zero matrix instead.
	 */
	invert(): Matrix;

	/**
	 * Creates a new Matrix4 with identical *.elements* to this one.
	 */
	clone(): Matrix;
}

/**
 * A class representing a 3x3 [matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics)).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3) page for details.
 *
 * ### Examples
 * [webgl / simple / gi](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_simple_gi)
 *
 *
 * ### Code Example
 * 
 * ```js
 * const m = new Matrix3();
 * ```
 * A Note on Row-Major and Column-Major Ordering
 * The [set](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/set)() method takes arguments in [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)
 * order, while internally they are stored in the *.elements* array in column-major order.
 * This means that calling m.set( 11, 12, 13, 21, 22, 23, 31, 32, 33 );
 * will result in the *.elements* array containing:
 * m.elements = [ 11, 21, 31, 12, 22, 32, 13, 23, 33 ];
 * and internally all calculations are performed using column-major ordering. However, as the actual ordering makes no difference mathematically and most people are used to thinking about matrices in row-major order,g the three.js documentation shows matrices in row-major order. Just bear in mind that if you are reading the source code, you'll have to take the [transpose](https://en.wikipedia.org/wiki/Transpose) of any matrices outlined here to make sense of the calculations.
 *
 */
export interface Matrix3 extends Matrix {
	/**
	 * Creates and initializes the Matrix3 to the 3x3
	 * [identity matrix](https://en.wikipedia.org/wiki/Identity_matrix).
	 */
	new (): this;

	/**
	 * A [column-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order) list of matrix values.
	 * @default [1, 0, 0, 0, 1, 0, 0, 0, 1]
	 */
	elements: number[];

	/**
	 * Sets the 3x3 matrix values to the given [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order) sequence of values.
	 * @param n11 value to put in row 1, col 1.
	 * @param n12 value to put in row 1, col 2.
	 * @param n13 value to put in row 1, col 3.
	 * @param n21 value to put in row 2, col 1.
	 * @param n22 value to put in row 2, col 2.
	 * @param n23 value to put in row 2, col 3.
	 * @param n31 value to put in row 3, col 1.
	 * @param n32 value to put in row 3, col 2.
	 * @param n33 value to put in row 3, col 3.
	 */
	set(
		n11: number,
		n12: number,
		n13: number,
		n21: number,
		n22: number,
		n23: number,
		n31: number,
		n32: number,
		n33: number
	): Matrix3;

	/**
	 * Resets this matrix to the 3x3 identity matrix:
	 * 1, 0, 0
	 * 0, 1, 0
	 * 0, 0, 1
	 */
	identity(): Matrix3;

	/**
	 * Creates a new Matrix3 and with identical elements to this one.
	 */
	clone(): this;

	/**
	 * Copies the elements of matrix [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3) into this matrix.
	 */
	copy(m: Matrix3): this;

	/**
	 * Extracts the [basis](https://en.wikipedia.org/wiki/Basis_(linear_algebra)) of this matrix into the three axis vectors provided. If this matrix is:
	 * a, b, c, d, e, f, g, h, i
	 * then the [xAxis](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3), [yAxis](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3), [zAxis](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) will be set to:
	 * xAxis = (a, d, g)
	 * yAxis = (b, e, h)
	 * zAxis = (c, f, i)
	 *
	 * @param xAxis
	 * @param yAxis
	 * @param zAxis
	 */
	extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): Matrix3;

	/**
	 * Set this matrix to the upper 3x3 matrix of the Matrix4 [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4).
	 */
	setFromMatrix4(m: Matrix4): Matrix3;
	multiplyScalar(s: number): Matrix3;

	/**
	 * Computes and returns the [determinant](https://en.wikipedia.org/wiki/Determinant) of this matrix.
	 */
	determinant(): number;

	/**
	 * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
	 * You can not invert with a determinant of zero. If you attempt this, the method produces a zero matrix instead.
	 */
	invert(): Matrix3;

	/**
	 * [Transposes](https://en.wikipedia.org/wiki/Transpose) this matrix in place.
	 */
	transpose(): Matrix3;

	/**
	 * Sets this matrix as the upper left 3x3 of the [normal matrix](https://en.wikipedia.org/wiki/Normal_matrix) of the passed [matrix4](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4). The normal matrix is the [inverse](https://en.wikipedia.org/wiki/Invertible_matrix) [transpose](https://en.wikipedia.org/wiki/Transpose) of the matrix [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4).
	 *
	 * @param m Matrix4
	 */
	getNormalMatrix(matrix4: Matrix4): Matrix3;

	/**
	 * [Transposes](https://en.wikipedia.org/wiki/Transpose) this matrix into the supplied array, and returns itself unchanged.
	 * @param array array to store the resulting vector in.
	 */
	transposeIntoArray(r: number[]): Matrix3;

	/**
	 * Sets the UV transform matrix from offset, repeat, rotation, and center.
	 * @param tx center x of rotation
	 * @param ty center y of rotation
	 * @param sx
	 * @param sy
	 * @param rotation
	 * @param cx
	 * @param cy
	 * @returns uv transform
	 */
	setUvTransform(tx: number, ty: number, sx: number, sy: number, rotation: number, cx: number, cy: number): Matrix3;

	scale(sx: number, sy: number): Matrix3;

	rotate(theta: number): Matrix3;

	translate(tx: number, ty: number): Matrix3;

	/**
	 * @returns Return true if this matrix and [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3) are equal.
	 */
	equals(matrix: Matrix3): boolean;

	/**
	 * Sets the elements of this matrix based on an array in [column-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order) format.
	 *
	 * @param array The array to read the elements from.
	 * @param offset index of first element in the array. Default is 0.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): Matrix3;

	/**
	 * Writes the elements of this matrix to an array in [column-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order) format.
	 * @param array array to store the resulting vector in. If not given a new array will be created.
	 * @param offset offset in the array at which to put the result.
	 */
	toArray(array?: number[], offset?: number): number[];

	/**
	 * Post-multiplies this matrix by [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3).
	 */
	multiply(m: Matrix3): Matrix3;

	/**
	 * Pre-multiplies this matrix by [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3).
	 */
	premultiply(m: Matrix3): Matrix3;

	/**
	 * Sets this matrix to [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3) x [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3).
	 */
	multiplyMatrices(a: Matrix3, b: Matrix3): Matrix3;

	/**
	 * Multiplies every component of the matrix by the scalar value *s*.
	 */
	multiplyScalar(s: number): Matrix3;
}

export type Matrix4Tuple = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number
];

/**
 * A class representing a 4x4 [matrix](https://en.wikipedia.org/wiki/Matrix_(mathematics)).
 * The most common use of a 4x4 matrix in 3D computer graphics is as a [Transformation Matrix](https://en.wikipedia.org/wiki/Transformation_matrix).a For an introduction to transformation matrices as used in WebGL, check out [this tutorial](http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices).
 * This allows a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) representing a point in 3D space to undergo transformations such as translation, rotation, shear, scale, reflection, orthogonal or perspective projection and so on, by being multiplied by the matrix. This is known as	<em>applying</em> the matrix to the vector.
 * Every [Object3D](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D) has three associated Matrix4s:
 * [Object3D.matrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrix): This stores the local transform of the object. This is the object's transformation relative to its parent.
 * [Object3D.matrixWorld](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrixWorld): The global or world transform of the object. If the object has no parent, then this is identical to the local transform stored in [matrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrix).
 * [Object3D.modelViewMatrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.modelViewMatrix): This represents the object's transformation relative to the camera's coordinate system.
 * An object's modelViewMatrix is the object's matrixWorld pre-multiplied by the camera's matrixWorldInverse.
 *
 * [Cameras](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Camera) have three additional Matrix4s:
 * [Camera.matrixWorldInverse](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Camera.matrixWorldInverse): The view matrix - the inverse of the Camera's [matrixWorld](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrixWorld).
 * [Camera.projectionMatrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Camera.projectionMatrix): Represents the information how to project the scene to clip space.
 * [Camera.projectionMatrixInverse](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Camera.projectionMatrixInverse): The inverse of projectionMatrix.
 * Note: [Object3D.normalMatrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.normalMatrix) is not a Matrix4, but a [Matrix3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3).
 *
 * A Note on Row-Major and Column-Major Ordering
 * The [set](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/set)() method takes arguments in [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)
 * order, while internally they are stored in the *.elements* array in column-major order.
 * This means that calling
 * const m = new THREE.Matrix4();
 * m.set( 11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44 );
 * will result in the *.elements* array containing:
 * m.elements = [ 11, 21, 31, 41, 12, 22, 32, 42, 13, 23, 33, 43, 14, 24, 34, 44 ];
 * and internally all calculations are performed using column-major ordering. However, as the actual ordering makes no difference mathematically and most people are used to thinking about matrices in row-major order,g the three.js documentation shows matrices in row-major order. Just bear in mind that if you are reading the source code, you'll have to take the [transpose](https://en.wikipedia.org/wiki/Transpose) of any matrices outlined here to make sense of the calculations.
 *
 * Extracting position, rotation and scale
 * There are several options available for extracting position, rotation and scale from a Matrix4.
 * [Vector3.setFromMatrixPosition](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3.setFromMatrixPosition): can be used to extract the translation component.
 * [Vector3.setFromMatrixScale](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3.setFromMatrixScale): can be used to extract the scale component.
 * [Quaternion.setFromRotationMatrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion.setFromRotationMatrix), [Euler.setFromRotationMatrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Euler.setFromRotationMatrix) or *.extractRotation* can be used to extract the rotation component from a pure (unscaled) matrix.
 * *.decompose* can be used to extract position, rotation and scale all at once.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) page for details.
 *
 * ### Examples
 * [css3d / molecules](https://outmindkjg.github.io/ngx3js-doc/#/examples/css3d_molecules)
 * [physics / ammo / instancing](https://outmindkjg.github.io/ngx3js-doc/#/examples/physics_ammo_instancing)
 * [webgl / custom / attributes / points2](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_custom_attributes_points2)
 * [webgl / clipping / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_clipping_advanced)
 * [webgl / geometry / minecraft](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_minecraft)
 *
 */
export interface Matrix4 extends Matrix {
	/**
	 * Creates and initializes the Matrix4 to the 4x4
	 * [identity matrix](https://en.wikipedia.org/wiki/Identity_matrix).
	 */
	new (): this;

	/**
	 * A [column-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order) list of matrix values.
	 * @default [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
	 */
	elements: number[];

	/**
	 * Set the *.elements* of this matrix to the supplied row-major values [n11](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float),
	 * [n12](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float), ... [n44](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	set(
		n11: number,
		n12: number,
		n13: number,
		n14: number,
		n21: number,
		n22: number,
		n23: number,
		n24: number,
		n31: number,
		n32: number,
		n33: number,
		n34: number,
		n41: number,
		n42: number,
		n43: number,
		n44: number
	): Matrix4;

	/**
	 * Resets this matrix to the [identity matrix](https://en.wikipedia.org/wiki/Identity_matrix).
	 */
	identity(): Matrix4;

	/**
	 * Creates a new Matrix4 with identical *.elements* to this one.
	 */
	clone(): Matrix4;

	/**
	 * Copies the *.elements* of matrix [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) into this matrix.
	 */
	copy(m: Matrix4): this;

	/**
	 * Copies the translation component of the supplied matrix [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) into this matrix's translation component.
	 */
	copyPosition(m: Matrix4): Matrix4;

	/**
	 * Extracts the [basis](https://en.wikipedia.org/wiki/Basis_(linear_algebra)) of this matrix into the three axis vectors provided. If this matrix is:

	 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p 
	 * then the [xAxis](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3), [yAxis](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3), [zAxis](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) will be set to:

	 * xAxis = (a, e, i)
	 * yAxis = (b, f, j)
	 * zAxis = (c, g, k)
	 * 
	 * @param xAxis 
	 * @param yAxis 
	 * @param zAxis 
	 * @returns basis 
	 */
	extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): Matrix4;

	/**
	 * Set this to the [basis](https://en.wikipedia.org/wiki/Basis_(linear_algebra)) matrix consisting of the three provided basis vectors:

	 * xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0,
	 * 0,       0,       0,       1
	 */
	makeBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): Matrix4;

	/**
	 * Extracts the rotation component of the supplied matrix [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) into this matrix's rotation component.
	 */
	extractRotation(m: Matrix4): Matrix4;
	makeRotationFromEuler(euler: Euler): Matrix4;

	/**
	 * Sets the rotation component of this matrix to the rotation specified by [q](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion), as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion).
	 * The rest of the matrix is set to the identity. So, given [q](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion) = w + xi + yj + zk, the resulting matrix will be:

	 * 1-2y²-2z²    2xy-2zw    2xz+2yw    0
	 * 2xy+2zw      1-2x²-2z²  2yz-2xw    0
	 * 2xz-2yw      2yz+2xw    1-2x²-2y²  0
	 * 0            0          0          1
	 */
	makeRotationFromQuaternion(q: Quaternion): Matrix4;

	/**
	 * Constructs a rotation matrix, looking from [eye](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) towards [target](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3)
	 * oriented by the [up](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) vector.
	 */
	lookAt(eye: Vector3, target: Vector3, up: Vector3): Matrix4;

	/**
	 * Post-multiplies this matrix by [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4).
	 */
	multiply(m: Matrix4): Matrix4;

	/**
	 * Pre-multiplies this matrix by [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4).
	 */
	premultiply(m: Matrix4): Matrix4;

	/**
	 * Sets this matrix to [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) x [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4).
	 */
	multiplyMatrices(a: Matrix4, b: Matrix4): Matrix4;

	/**
	 * Multiplies every component of the matrix by a scalar value [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	multiplyScalar(s: number): Matrix4;

	/**
	 * Computes and returns the [determinant](https://en.wikipedia.org/wiki/Determinant) of this matrix.
	 * Based on the method outlined [here](http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm).
	 */
	determinant(): number;

	/**
	 * [Transposes](https://en.wikipedia.org/wiki/Transpose) this matrix.
	 */
	transpose(): Matrix4;

	/**
	 * Sets the position component for this matrix from vector [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3), without affecting the rest of the matrix - i.e. if the matrix is currently:
	 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p
	 * This becomes:
	 * a, b, c, v.x, e, f, g, v.y, i, j, k, v.z, m, n, o, p
	 */
	setPosition(v: Vector3 | number, y?: number, z?: number): Matrix4;

	/**
	 * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
	 * You can not invert with a determinant of zero. If you attempt this, the method produces a zero matrix instead.
	 */
	invert(): Matrix4;

	/**
	 * Multiplies the columns of this matrix by vector [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	scale(v: Vector3): Matrix4;

	/**
	 *
	 * Gets the maximum scale value of the 3 axes.
	 */
	getMaxScaleOnAxis(): number;

	/**
	 * Sets this matrix as a translation transform:
	 * 1, 0, 0, x,
	 * 0, 1, 0, y,
	 * 0, 0, 1, z,
	 * 0, 0, 0, 1
	 * @param x The amount to translate in the X axis.
	 * @param y The amount to translate in the Y axis.
	 * @param z The amount to translate in the Z axis.
	 */
	makeTranslation(x: number, y: number, z: number): Matrix4;

	/**
	 * Sets this matrix as a rotational transformation around the X axis by [theta](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) (&theta;) radians.
	 * The resulting matrix will be:

	 * 1 0      0        0
	 * 0 cos(&theta;) -sin(&theta;)  0
	 * 0 sin(&theta;) cos(&theta;)   0
	 * 0 0      0        1
	 * @param thet A Rotation angle in radians.
	 */
	makeRotationX(theta: number): Matrix4;

	/**
	 * Sets this matrix as a rotational transformation around the Y axis by [theta](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) (&theta;) radians.
	 * The resulting matrix will be:

	 * cos(&theta;)  0 sin(&theta;) 0
	 * 0       1 0      0
	 * -sin(&theta;) 0 cos(&theta;) 0
	 * 0       0 0      1
	 *
	 * @param thet A Rotation angle in radians.
	 */
	makeRotationY(theta: number): Matrix4;

	/**
	 * Sets this matrix as a rotational transformation around the Z axis by [theta](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) (&theta;) radians.
	 * The resulting matrix will be:
	 * cos(&theta;) -sin(&theta;) 0 0
	 * sin(&theta;) cos(&theta;)  0 0
	 * 0      0       1 0
	 * 0      0       0 1
	 * @param thet A Rotation angle in radians.
	 */
	makeRotationZ(theta: number): Matrix4;

	/**
	 * Sets this matrix as rotation transform around [axis](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) by [theta](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) radians.
	 * This is a somewhat controversial but mathematically sound alternative to rotating via [Quaternions](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternions).
	 * See the discussion [here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199).
	 * @param axis Rotation axis, should be normalized.
	 * @param thet A Rotation angle in radians.
	 */
	makeRotationAxis(axis: Vector3, angle: number): Matrix4;

	/**
	 * @param x The amount to scale in the X axis.
	 * @param y The amount to scale in the Y axis.
	 * @param z The amount to scale in the Z axis.
	 * Sets this matrix as scale transform:
	 * x, 0, 0, 0,
	 * 0, y, 0, 0,
	 * 0, 0, z, 0,
	 * 0, 0, 0, 1
	 */
	makeScale(x: number, y: number, z: number): Matrix4;

	/**
	 * Sets this matrix as a shear transform:
	 * 1,   yx,  zx,  0, xy,   1,  zy,  0, xz,  yz,   1,  0,
	 * 0,    0,   0,  1
	 * @param xy The amount to shear X by Y.
	 * @param xz The amount to shear X by Z.
	 * @param yx The amount to shear Y by X.
	 * @param yz The amount to shear Y by Z.
	 * @param zx The amount to shear Z by X.
	 * @param zy The amount to shear Z by Y.
	 */
	makeShear(xy: number, xz: number, yx: number, yz: number, zx: number, zy: number): Matrix4;

	/**
	 * Sets this matrix to the transformation composed of [position](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3),
	 * [quaternion](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion) and [scale](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	compose(translation: Vector3, rotation: Quaternion, scale: Vector3): Matrix4;

	/**
	 * Decomposes this matrix into its [position](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3), [quaternion](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion) and [scale](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) components.
	 * Note: Not all matrices are decomposable in this way. For example, if an object has a non-uniformly scaled parent, then the object's world matrix may not be decomposable, and this method may not be appropriate.
	 */
	decompose(translation: Vector3, rotation: Quaternion, scale: Vector3): Matrix4;

	/**
	 * Creates a [perspective projection](https://en.wikipedia.org/wiki/3D_projection#Perspective_projection) matrix.
	 * This is used internally by [PerspectiveCamera.updateProjectionMatrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.updateProjectionMatrix)()
	 */
	makePerspective(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4;

	/**
	 * Creates a [perspective projection](https://en.wikipedia.org/wiki/3D_projection#Perspective_projection) matrix.
	 * This is used internally by [PerspectiveCamera.updateProjectionMatrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.updateProjectionMatrix)()
	 */
	makePerspective(fov: number, aspect: number, near: number, far: number): Matrix4;

	/**
	 * Creates an [orthographic projection](https://en.wikipedia.org/wiki/Orthographic_projection) matrix.
	 * This is used internally by [OrthographicCamera.updateProjectionMatrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/OrthographicCamera.updateProjectionMatrix)().
	 */
	makeOrthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): Matrix4;

	/**
	 * @returns Return true if this matrix and [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) are equal.
	 */
	equals(matrix: Matrix4): boolean;

	/**
	 * Sets the elements of this matrix based on an [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) in [column-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order) format.
	 * @param array The array to read the elements from.
	 * @param offset ( optional ) offset into the array. Default is 0.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): Matrix4;

	/**
	 * @param array array to store the resulting vector in.
	 * @param offset offset in the array at which to put the result.
	 * Writes the elements of this matrix to an array in [column-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order) format.
	 */
	toArray(array?: number[], offset?: number): number[];

	/**
	 * Set the upper 3x3 elements of this matrix to the values of the Matrix3 [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3).
	 */
	setFromMatrix3(m: Matrix3): Matrix4;
}

/**
 * A two dimensional surface that extends infinitely in 3d space, represented in [Hessian normal form](http://mathworld.wolfram.com/HessianNormalForm.html)
 * by a unit length normal vector and a constant.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane) page for details.
 *
 * ### Examples
 * [webgl / clipping / advanced](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_clipping_advanced) |
 * [webgl / clipping / intersection](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_clipping_intersection) |
 * [webgl / clipping / stencil](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_clipping_stencil) |
 * [webgl / clipping](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_clipping) |
 * [webgl / portal](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_portal)
 *
 */
export interface Plane {
	/**
	 * @param normal A unit length [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) defining the normal of the plane. Default is *(1, 0, 0)*.
	 * @param constant The signed distance from the origin to the plane. Default is *0*.
	 */
	new (normal?: Vector3, constant?: number): this;

	/**
	 * A unit length [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) defining the normal of the plane. Default is *(1, 0, 0)*.
	 * @default new THREE.Vector3( 1, 0, 0 )
	 */
	normal: Vector3;

	/**
	 * The signed distance from the origin to the plane. Default is *0*.
	 *
	 * @default 0
	 */
	constant: number;

	readonly isPlane: true;

	/**
	 * Sets this plane's *.normal* and *.constant* properties by copying the values from the given normal.
	 * @param normal A unit length [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) defining the normal of the plane.
	 * @param constant The signed distance from the origin to the plane. Default is *0*.
	 */
	set(normal: Vector3, constant: number): Plane;

	/**
	 * Set the individual components that define the plane.
	 * @param x x value of the unit length normal vector.
	 * @param y y value of the unit length normal vector.
	 * @param z z value of the unit length normal vector.
	 * @param w The value of the plane's *.constant* property.
	 */
	setComponents(x: number, y: number, z: number, w: number): Plane;

	/**
	 * Sets the plane's properties as defined by a [normal](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) and an arbitrary coplanar [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 * @param normal A unit length [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) defining the normal of the plane.
	 * @param point Vector3
	 */
	setFromNormalAndCoplanarPoint(normal: Vector3, point: Vector3): Plane;

	/**
	 * Defines the plane based on the 3 provided points. The winding order is assumed to be counter-clockwise, and determines the direction of the *.normal*.
	 *
	 * @param a first point on the plane.
	 * @param b second point on the plane.
	 * @param c third point on the plane.
	 */
	setFromCoplanarPoints(a: Vector3, b: Vector3, c: Vector3): Plane;

	/**
	 * @returns Returns a new plane with the same *.normal* and *.constant* as this one.
	 */
	clone(): this;

	/**
	 * Copies the values of the passed plane's *.normal* and *.constant* properties to this plane.
	 */
	copy(plane: Plane): this;

	/**
	 * Normalizes the *.normal* vector, and adjusts the *.constant* value accordingly.
	 */
	normalize(): Plane;

	/**
	 * Negates both the normal vector and the constant.
	 */
	negate(): Plane;

	/**
	 * @returns Returns the signed distance from the [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) to the plane.
	 */
	distanceToPoint(point: Vector3): number;

	/**
	 * @returns Returns the signed distance from the [sphere](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sphere) to the plane.
	 */
	distanceToSphere(sphere: Sphere): number;

	/**
	 * Projects a [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) onto the plane.
	 * @param point The [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) to project onto the plane.
	 * @param target The result will be copied into this Vector3.
	 */
	projectPoint(point: Vector3, target: Vector3): Vector3;

	/**
	 *
	 * @param point
	 * @param target
	 * @returns point
	 */
	orthoPoint(point: Vector3, target: Vector3): Vector3;

	/**
	 * @param line The [Line3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line3) to check for intersection.
	 * @param target The result will be copied into this Vector3.
	 * @returns Returns the intersection point of the passed line and the plane. Returns null  if the line does not intersect. Returns the line's starting point if the line is  coplanar with the plane.
	 */
	intersectLine(line: Line3, target: Vector3): Vector3 | null;

	/**
	 * Tests whether a line segment intersects with (passes through) the plane.
	 * @param line The [Line3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Line3) to check for intersection.
	 */
	intersectsLine(line: Line3): boolean;

	/**
	 * Determines whether or not this plane intersects [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3).
	 * @param box The [Box3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3) to check for intersection.
	 */
	intersectsBox(box: Box3): boolean;

	/**
	 * Determines whether or not this plane intersects [sphere](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sphere).
	 * @param sphere The [Sphere](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sphere) to check for intersection.
	 */
	intersectsSphere(sphere: Sphere): boolean;

	/**
	 * @param target The result will be copied into this Vector3.
	 * @returns Returns a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) coplanar to the plane, by calculating the projection of the normal vector at the origin onto the plane.
	 */
	coplanarPoint(target: Vector3): Vector3;

	/**
	 * Apply a Matrix4 to the plane. The matrix must be an affine, homogeneous transform.
	 * If supplying an [optionalNormalMatrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3), it can be created like so:
	 * const optionalNormalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );
	 * @param matrix The [Page:Matrix4] to apply.
	 * @param optionalNormalMatrix pre-computed normal [Page:Matrix3] of the Matrix4 being applied.
	 */
	applyMatrix4(matrix: Matrix4, optionalNormalMatrix?: Matrix3): Plane;

	/**
	 * Translates the plane by the distance defined by the [offset](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) vector.
	 * Note that this only affects the plane constant and will not affect the normal vector.
	 * @param offset The amount to move the plane by.
	 */
	translate(offset: Vector3): Plane;

	/**
	 * Checks to see if two planes are equal (their *.normal* and *.constant* properties match).
	 */
	equals(plane: Plane): boolean;
}

/**
 * Implementation of a [quaternion](http://en.wikipedia.org/wiki/Quaternion).
 * Quaternions are used in three.js to represent [rotations](https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion) page for details.
 *
 * ### Examples
 * [misc / animation / groups](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_animation_groups)
 * [misc / animation / keys](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_animation_keys)
 * [physics / ammo / break](https://outmindkjg.github.io/ngx3js-doc/#/examples/physics_ammo_break)
 * [webgl / buffergeometry / instancing / interleaved](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_instancing_interleaved)
 * [webgl / custom / attributes / points3](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_custom_attributes_points3)
 *
 * ### Code Example
 * 
 * ```js
 * const quaternion = new THREE.Quaternion();
 * quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );
 * const vector = new THREE.Vector3( 1, 0, 0 );
 * vector.applyQuaternion( quaternion );
 * ```
 */
export interface Quaternion {
	/**
	 * @param x x coordinate
	 * @param y y coordinate
	 * @param z z coordinate
	 * @param w w coordinate
	 */
	new (x?: number, y?: number, z?: number, w?: number): this;

	/**
	 * x coordinate
	 * @default 0
	 */
	x: number;

	/**
	 * y coordinate
	 * @default 0
	 */
	y: number;

	/**
	 * z coordinate
	 * @default 0
	 */
	z: number;

	/**
	 * w coordinate
	 * @default 1
	 */
	w: number;

	readonly isQuaternion: true;

	/**
	 * Sets *.x*, *.y*, *.z*, *.w* properties of this quaternion.
	 */
	set(x: number, y: number, z: number, w: number): Quaternion;

	/**
	 * Creates a new Quaternion with identical *.x*, *.y*, *.z* and *.w* properties to this one.
	 */
	clone(): this;

	/**
	 * Copies the *.x*, *.y*,	*.z* and *.w* properties of [q](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion) into this quaternion.
	 */
	copy(q: Quaternion): this;

	/**
	 * Sets this quaternion from the rotation specified by [Euler](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Euler) angle.
	 */
	setFromEuler(euler: Euler, update?: boolean): Quaternion;

	/**
	 * Sets this quaternion from rotation specified by [axis](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) and [angle](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * Adapted from the method [here](http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm).
	 * *Axis* is assumed to be normalized, *angle* is in radians.
	 */
	setFromAxisAngle(axis: Vector3, angle: number): Quaternion;

	/**
	 * Sets this quaternion from rotation component of [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4).
	 * Adapted from the method [here](http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm).
	 * @param m A [Matrix4](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) of which the upper 3x3 of matrix is a pure [rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix) (i.e. unscaled).
	 */
	setFromRotationMatrix(m: Matrix4): Quaternion;

	/**
	 * Sets this quaternion to the rotation required to rotate direction vector [vFrom](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) to direction vector [vTo](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 * Adapted from the method [here](http://lolengine.net/blog/2013/09/18/beautiful-maths-quaternion-from-vectors).
	 * [vFrom](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) and [vTo](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) are assumed to be normalized.
	 */
	setFromUnitVectors(vFrom: Vector3, vTo: Vector3): Quaternion;

	/**
	 * @returns Returns the angle between this quaternion and quaternion [q](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion) in radians.
	 */
	angleTo(q: Quaternion): number;

	/**
	 * @param q The target quaternion.
	 * @param step The angular step in radians.
	 * Rotates this quaternion by a given angular step to the defined quaternion *q*.
	 * The method ensures that the final quaternion will not overshoot *q*.
	 */
	rotateTowards(q: Quaternion, step: number): Quaternion;

	/**
	 * Sets this quaternion to the identity quaternion; that is, to the quaternion that represents "no rotation".
	 */
	identity(): Quaternion;

	/**
	 * Inverts this quaternion - calculates the *.conjugate*. The quaternion is assumed to have unit length.
	 */
	invert(): Quaternion;

	/**
	 * @returns Returns the rotational conjugate of this quaternion. The conjugate of a quaternion represents the same rotation in the opposite direction about the rotational axis.
	 */
	conjugate(): Quaternion;

	/**
	 * Calculates the [dot product](https://en.wikipedia.org/wiki/Dot_product) of quaternions [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion) and this one.
	 */
	dot(v: Quaternion): number;

	/**
	 * Computes the squared [Euclidean length](https://en.wikipedia.org/wiki/Euclidean_distance) (straight-line length) of this quaternion, considered as a 4 dimensional vector. This can be useful if you are comparing the lengths of two quaternions, as this is a slightly more efficient calculation than *.length*().
	 */
	lengthSq(): number;

	/**
	 * Computes the [Euclidean length](https://en.wikipedia.org/wiki/Euclidean_distance) (straight-line length) of this quaternion, considered as a 4 dimensional vector.
	 */
	length(): number;

	/**
	 * [Normalizes](https://en.wikipedia.org/wiki/Normalized_vector) this quaternion - that is, calculated the quaternion that performs the same rotation as this one, but has  *.length* equal to *1*.
	 */
	normalize(): Quaternion;

	/**
	 * Multiplies this quaternion by [q](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion).
	 */
	multiply(q: Quaternion): Quaternion;

	/**
	 * Pre-multiplies this quaternion by [q](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion).
	 */
	premultiply(q: Quaternion): Quaternion;

	/**
	 * Sets this quaternion to [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion) x [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion).
	 * Adapted from the method outlined [here](http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm).
	 */
	multiplyQuaternions(a: Quaternion, b: Quaternion): Quaternion;

	/**
	 * @param qb interpolation factor in the closed interval [0, 1].
	 * Handles the spherical linear interpolation between quaternions. [t](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) represents the amount of rotation between this quaternion (where [t](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) is 0) and [qb](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion) (where [t](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) is 1). This quaternion is set to the result. Also see the static version of the *slerp* below.
	 * // rotate a mesh towards a target quaternion
	 * mesh.quaternion.slerp( endQuaternion, 0.01 );
	 */
	slerp(qb: Quaternion, t: number): Quaternion;

	/**
	 * Performs a spherical linear interpolation between the given quaternions and stores the result in this quaternion.
	 */
	slerpQuaternions(qa: Quaternion, qb: Quaternion, t: number): Quaternion;

	/**
	 * Compares the *.x*, *.y*,	*.z* and *.w* properties of [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion) to the equivalent properties of this quaternion to determine if they represent the same rotation.
	 * @param v Quaternion that this quaternion will be compared to.
	 */
	equals(v: Quaternion): boolean;

	/**
	 * Sets this quaternion's *.x*, *.y*,	*.z* and *.w* properties from an array.
	 * @param array array of format (x, y, z, w) used to construct the quaternion.
	 * @param offset an offset into the array.
	 */
	toArray(array?: number[], offset?: number): number[];

	/**
	 * Sets *.x*, *.y*, *.z*, *.w* properties of this quaternion from the [attribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute).
	 * @param attribute The source attribute.
	 * @param index index in the attribute.
	 */
	fromBufferAttribute(attribute: BufferAttribute, index?: number): this;

	/**
	 * Copies x, y, z and w into the provided array-like.
	 * @param array array-like to store the quaternion to.
	 * @param offset (optional) optional offset into the array.
	 * @return The provided array-like.
	 */
	toArray(array: ArrayLike<number>, offset?: number): ArrayLike<number>;

	_onChange(callback: () => void): Quaternion;
	_onChangeCallback: () => void;

	/**
	 * @param dst The output array.
	 * @param dstOffset An offset into the output array.
	 * @param src0 The source array of the starting quaternion.
	 * @param srcOffset0 An offset into the array *src0*.
	 * @param src1 The source array of the target quatnerion.
	 * @param srcOffset1 An offset into the array *src1*.
	 * @param t Normalized interpolation factor (between 0 and 1).
	 * Like the static *slerp* method above, but operates directly on flat arrays of numbers.
	 */
	slerpFlat(
		dst: number[],
		dstOffset: number,
		src0: number[],
		srcOffset: number,
		src1: number[],
		stcOffset1: number,
		t: number
	): Quaternion;

	multiplyQuaternionsFlat(
		dst: number[],
		dstOffset: number,
		src0: number[],
		srcOffset: number,
		src1: number[],
		stcOffset1: number
	): number[];

	/**
	 * Sets this quaternion to a uniformly random, normalized quaternion.
	 */
	random(): Quaternion;
}

/**
 * A ray that emits from an origin in a certain direction. This is used by the [Raycaster](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Raycaster) to assist with [raycasting](https://en.wikipedia.org/wiki/Ray_casting).e Raycasting is used for mouse picking (working out what objects in the 3D space the mouse is over) amongst other things.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) page for details.
 */
export interface Ray {
	/**
	 * Creates a new Ray.
	 * @param origin The origin of the [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray). Default is a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) at (0, 0, 0).
	 * @param direction Vector3 The direction of the [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray). This must be normalized  (with [Vector3.normalize](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3.normalize)) for the methods to operate properly.  Default is a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) at (0, 0, -1).
	 */
	new (origin?: Vector3, direction?: Vector3): this;

	/**
	 * The origin of the [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray). Default is a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) at (0, 0, 0).
	 * @default new THREE.Vector3()
	 */
	origin: Vector3;

	/**
	 * The direction of the [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray). This must be normalized (with [Vector3.normalize](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3.normalize)) for the methods to operate properly. Default is a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) at (0, 0, -1).
	 * @default new THREE.Vector3( 0, 0, - 1 )
	 */
	direction: Vector3;

	/**
	 * This must be normalized (with [Vector3.normalize](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3.normalize)) for the methods to operate properly.
	 * Sets this ray's *.origin* and *.direction* properties by copying the values from the given objects.
	 * @param origin The *.origin* of the [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray).
	 * @param origin The *.direction* of the [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray).
	 */
	set(origin: Vector3, direction: Vector3): Ray;

	/**
	 * Creates a new Ray with identical *.origin* and *.direction*  to this one.
	 */
	clone(): this;

	/**
	 * Copies the *.origin* and *.direction* properties of [ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) into this ray.
	 */
	copy(ray: Ray): this;

	/**
	 * Get a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) that is a given distance along this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray).
	 * @param t The distance along the [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) to retrieve a position for.
	 * @param target The result will be copied into this Vector3.
	 */
	at(t: number, target: Vector3): Vector3;

	/**
	 * Adjusts the direction of the ray to point at the vector in world coordinates.
	 * @param v The [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) to look at.
	 */
	lookAt(v: Vector3): Ray;

	/**
	 * @param t The distance along the [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) to interpolate.
	 * Shift the origin of this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) along its direction by the distance given.
	 */
	recast(t: number): Ray;

	/**
	 * Get the point along this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) that is closest to the [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) provided.
	 * @param point The point to get the closest approach to.
	 * @param target The result will be copied into this Vector3.
	 */
	closestPointToPoint(point: Vector3, target: Vector3): Vector3;

	/**
	 * Get the distance of the closest approach between the [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) and the [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 * @param point Vector3 The [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) to compute a distance to.
	 */
	distanceToPoint(point: Vector3): number;

	/**
	 * Get the squared distance of the closest approach between the [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) and the [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 * @param point The [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) to compute a distance to.
	 */
	distanceSqToPoint(point: Vector3): number;

	/**
	 * Get the squared distance between this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) and a line segment.
	 * @param v0 The start of the line segment.
	 * @param v1 The end of the line segment.
	 * @param optionalPointOnRay  if this is provided, it receives the point on this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) that is closest to the segment.
	 * @param optionalPointOnSegment  if this is provided, it receives the point on the line segment that is closest to this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray).
	 */
	distanceSqToSegment(v0: Vector3, v1: Vector3, optionalPointOnRay?: Vector3, optionalPointOnSegment?: Vector3): number;

	/**
	 * Intersect this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) with a [Sphere](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sphere), returning the intersection point or *null* if there is no intersection.
	 * @param sphere The [Sphere](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sphere) to intersect with.
	 * @param target The result will be copied into this Vector3.
	 */
	intersectSphere(sphere: Sphere, target: Vector3): Vector3 | null;

	/**
	 * @param sphere The [Sphere](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sphere) to intersect with.
	 * @returns Return true if this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) intersects with the [Sphere](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sphere).
	 */
	intersectsSphere(sphere: Sphere): boolean;

	/**
	 * Get the distance from *.origin* to the [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane), or *null* if the [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) doesn't intersect the [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 * @param plane The [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane) to get the distance to.
	 */
	distanceToPlane(plane: Plane): number;

	/**
	 * Intersect this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) with a [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane), returning the intersection point or *null* if there is no intersection.
	 * @param plane The [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane) to intersect with.
	 * @param target The result will be copied into this Vector3.
	 */
	intersectPlane(plane: Plane, target: Vector3): Vector3 | null;

	/**
	 * @param plane The [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane) to intersect with.
	 * @returns Return true if this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) intersects with the [Plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 */
	intersectsPlane(plane: Plane): boolean;

	/**
	 * Intersect this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) with a [Box3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3), returning the intersection point or *null* if there is no intersection.
	 * @param box The [Box3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3) to intersect with.
	 * @param target The result will be copied into this Vector3.
	 */
	intersectBox(box: Box3, target: Vector3): Vector3 | null;

	/**
	 * @param box The [Box3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3) to intersect with.
	 * @returns Return true if this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) intersects with the [Box3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3).
	 */
	intersectsBox(box: Box3): boolean;

	/**
	 * Intersect this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) with a triangle, returning the intersection point or *null* if there is no intersection.
	 * @param a The [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) points making up the triangle.
	 * @param backfaceCulling whether to use backface culling.
	 * @param target The result will be copied into this Vector3.
	 */
	intersectTriangle(a: Vector3, b: Vector3, c: Vector3, backfaceCulling: boolean, target: Vector3): Vector3 | null;

	/**
	 * Transform this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) by the [Matrix4](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4).
	 * @param matrix4 The [Matrix4](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) to apply to this [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray).
	 */
	applyMatrix4(matrix4: Matrix4): Ray;

	/**
	 * @param ray The [Ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) to compare to.
	 * @returns Returns true if this and the other [ray](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Ray) have equal *.origin*
	 */
	equals(ray: Ray): boolean;
}

/**
 * A sphere defined by a center and radius.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Sphere) page for details.
 *
 * ### Examples
 * [games / fps](https://outmindkjg.github.io/ngx3js-doc/#/examples/games_fps)
 */
export interface Sphere {
	/**
	 * Creates a new Sphere.
	 *
	 * @param center center of the sphere. Default is a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) at (0, 0, 0).
	 * @param radius radius of the sphere. Default is -1.
	 */
	new (center?: Vector3, radius?: number): this;

	/**
	 * A [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) defining the center of the sphere. Default is (0, 0, 0).
	 * @default new Vector3()
	 */
	center: Vector3;

	/**
	 * The radius of the sphere. Default is -1.
	 * @default 1
	 */
	radius: number;

	/**
	 * Sets the *.center* and *.radius* properties of this sphere.
	 * Please note that this method only copies the values from the given center.
	 * @param center center of the sphere.
	 * @param radius radius of the sphere.
	 */
	set(center: Vector3, radius: number): Sphere;

	/**
	 *
	 * Computes the minimum bounding sphere for an array of [points](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array). If  [optionalCenter](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3)is given, it is used as the sphere's center. Otherwise, the center of the axis-aligned bounding box encompassing [points](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) is calculated.
	 * @param points an [Array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array) of [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) positions.
	 * @param optionalCenter Optional [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) position for the sphere's center.
	 */
	setFromPoints(points: Vector3[], optionalCenter?: Vector3): Sphere;

	/**
	 * @returns Returns a new sphere with the same *.center* and *.radius* as this one.
	 */
	clone(): this;

	/**
	 * Copies the values of the passed sphere's *.center* and *.radius* properties to this sphere.
	 */
	copy(sphere: Sphere): this;

	/**
	 * Expands the boundaries of this sphere to include [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 *
	 * @param point Vector3 that should be included in the sphere.
	 */
	expandByPoint(point: Vector3): this;

	/**
	 * Checks to see if the sphere is empty (the radius set to a negative number).</br>
	 * Spheres with a radius of 0 contain only their center point and are not considered to be empty.
	 */
	isEmpty(): boolean;

	/**
	 * Makes the sphere empty by setting *.center* to (0, 0, 0) and *.radius* to -1.
	 */
	makeEmpty(): this;

	/**
	 * @param point The [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) to be checked Checks to see if the sphere contains the provided [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) inclusive of the surface of the sphere.
	 */
	containsPoint(point: Vector3): boolean;

	/**
	 * @returns Returns the closest distance from the boundary of the sphere to the [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3). If the sphere contains the point, the distance will be negative.
	 */
	distanceToPoint(point: Vector3): number;

	/**
	 * Checks to see if two spheres intersect.
	 * @param sphere Sphere to check for intersection against.
	 */
	intersectsSphere(sphere: Sphere): boolean;

	/**
	 * Determines whether or not this sphere intersects a given [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3).
	 * @param box Box3 to check for intersection against.
	 */
	intersectsBox(box: Box3): boolean;

	/**
	 * @param plane Plane to check for intersection against.
	 * Determines whether or not this sphere intersects a given [plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane).
	 */
	intersectsPlane(plane: Plane): boolean;

	/**
	 * Clamps a point within the sphere. If the point is outside the sphere, it will clamp it to the closest point on the edge of the sphere. Points already inside the sphere will not be affected.
	 * @param point Vector3 The point to clamp.
	 * @param target The result will be copied into this Vector3.
	 */
	clampPoint(point: Vector3, target: Vector3): Vector3;

	/**
	 * @param target The result will be copied into this Box3.
	 * @returns Returns a[Minimum Bounding Box](https://en.wikipedia.org/wiki/Minimum_bounding_box) for the sphere.
	 */
	getBoundingBox(target: Box3): Box3;

	/**
	 * @param matrix The [Page:Matrix4] to apply
	 * Transforms this sphere with the provided [Matrix4](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4).
	 */
	applyMatrix4(matrix: Matrix4): Sphere;
	translate(offset: Vector3): Sphere;

	/**
	 * Checks to see if the two spheres' centers and radii are equal.
	 */
	equals(sphere: Sphere): boolean;

	/**
	 * Expands this sphere to enclose both the original sphere and the given sphere.
	 * @param sphere Bounding sphere that will be unioned with this sphere.
	 */
	union(sphere: Sphere): this;
}

/**
 * A point's [spherical coordinates](https://en.wikipedia.org/wiki/Spherical_coordinate_system).
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Spherical) page for details.
 *
 * ### Examples
 * [webgl / math / orientation / transform](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_math_orientation_transform)
 *
 */
export interface Spherical {
	/**
	 * The poles (phi) are at the positive and negative y axis. The equator (theta) starts at positive z.
	 * @param radius The radius, or the [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) (straight-line distance) from the point to the origin. Default is *1.0*.
	 * @param phi polar angle in radians from the y (up) axis. Default is *0*.
	 * @param thet A equator angle in radians around the y (up) axis. Default is *0*.
	 */
	new (radius?: number, phi?: number, theta?: number): this;

	/**
	 * The radius, or the [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) (straight-line distance) from the point to the origin. Default is *1.0*.
	 * @default 1
	 */
	radius: number;

	/**
	 * Polar angle in radians from the y (up) axis. Default is *0*.
	 * @default 0
	 */
	phi: number;

	/**
	 * Equator angle in radians around the y (up) axis. Default is *0*.
	 * @default 0
	 */
	theta: number;

	/**
	 * Sets values of this spherical's *.radius*, *.phi* and *.theta* properties.
	 */
	set(radius: number, phi: number, theta: number): this;

	/**
	 * @returns Returns a new spherical with the same *.radius*, *.phi* and *.theta* properties as this one.
	 */
	clone(): this;

	/**
	 * Copies the values of the passed Spherical's *.radius*, *.phi* and *.theta* properties to this spherical.
	 */
	copy(other: Spherical): this;

	/**
	 * Restricts the polar angle *.phi* to be between 0.000001 and pi - 0.000001.
	 */
	makeSafe(): this;

	/**
	 * Sets values of this spherical's *.radius*, *.phi* and *.theta* properties from the [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	setFromVector3(v: Vector3): this;

	/**
	 * Sets values of this spherical's *.radius*, *.phi* and *.theta* properties from Cartesian coordinates.
	 */
	setFromCartesianCoords(x: number, y: number, z: number): this;
}

/**
 * Represents a third-order spherical harmonics (SH). Light probes use this class to encode lighting information.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SphericalHarmonics3) page for details.
 */
export interface SphericalHarmonics3 {
	/**
	 * Creates a new instance of SphericalHarmonics3.
	 */
	new (): this;

	/**
	 * An array holding the (9) SH coefficients. A single coefficient is represented as an instance of [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	coefficients: Vector3[];

	readonly isSphericalHarmonics3: true;

	/**
	 * Sets the given SH coefficients to this instance.
	 * @param coefficients An array of SH coefficients.
	 */
	set(coefficients: Vector3[]): SphericalHarmonics3;

	/**
	 * Sets all SH coefficients to 0.
	 */
	zero(): SphericalHarmonics3;

	/**
	 * Adds the given SH to this instance.
	 * @param sh The SH to add.
	 */
	add(sh: SphericalHarmonics3): SphericalHarmonics3;

	/**
	 * A convenience method for performing *.add*() and *.scale*() at once.
	 * @param sh The SH to add.
	 * @param scale The scale factor.
	 */
	addScaledSH(sh: SphericalHarmonics3, s: number): SphericalHarmonics3;

	/**
	 * Scales this SH by the given scale factor.
	 *
	 * @param scale The scale factor.
	 */
	scale(s: number): SphericalHarmonics3;

	/**
	 * Linear interpolates between the given SH and this instance by the given alpha factor.
	 * @param sh The SH to interpolate with.
	 * @param alph A The alpha factor.
	 */
	lerp(sh: SphericalHarmonics3, alpha: number): SphericalHarmonics3;

	/**
	 * @param sh The SH to compare with.
	 * @returns Returns true if the given SH and this instance have equal coefficients.
	 */
	equals(sh: SphericalHarmonics3): boolean;

	/**
	 * Copies the given SH to this instance.
	 * @param sh The SH to copy.
	 */
	copy(sh: SphericalHarmonics3): SphericalHarmonics3;

	/**
	 * @returns Returns a new instance of SphericalHarmonics3 with equal coefficients.
	 */
	clone(): this;

	/**
	 * Sets the coefficients of this instance from the given array.
	 * @param array The array holding the numbers of the SH coefficients.
	 * @param offset The array offset.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): this;

	/**
	 * @param array The target array.
	 * @param offset The array offset.
	 * @returns Returns an array with the coefficients, or copies them into the provided array. The coefficients are represented as numbers.
	 */
	toArray(array?: number[], offset?: number): number[];

	/**
	 * Returns an array with the values of this spherical harmonics, or copies them into the provided array-like.
	 * @param array array-like to store the spherical harmonics to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray(array: ArrayLike<number>, offset?: number): ArrayLike<number>;

	/**
	 * @param normal The normal vector (assumed to be unit length).
	 * @param target The result vector.
	 * @returns Returns the radiance in the direction of the given normal.
	 */
	getAt(normal: Vector3, target: Vector3): Vector3;

	/**
	 * @param normal The normal vector (assumed to be unit length).
	 * @param target The result vector.
	 * @returns Returns the irradiance (radiance convolved with cosine lobe) in the direction of the given normal.
	 */
	getIrradianceAt(normal: Vector3, target: Vector3): Vector3;

	/**
	 * Computes the SH basis for the given normal vector.
	 * @param normal The normal vector (assumed to be unit length).
	 * @param shBasis The resulting SH basis.
	 * @static
	 */
	getBasisAt(normal: Vector3, shBasis: number[]): void;
}

/**
 * A geometric triangle as defined by three [Vector3s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) representing its three corners.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Triangle) page for details.
 */
export interface Triangle {
	/**
	 * Creates a new Triangle.
	 * @param a The first corner of the triangle. Default is a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) at (0, 0, 0).
	 * @param b The second corner of the triangle. Default is a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) at (0, 0, 0).
	 * @param c The final corner of the triangle. Default is a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) at (0, 0, 0).
	 */
	new (a?: Vector3, b?: Vector3, c?: Vector3): this;

	/**
	 * The first corner of the triangle. Default is a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) at (0, 0, 0).
	 * @default new THREE.Vector3()
	 */
	a: Vector3;

	/**
	 * The second corner of the triangle. Default is a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) at (0, 0, 0).
	 * @default new THREE.Vector3()
	 */
	b: Vector3;

	/**
	 * The final corner of the triangle. Default is a [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) at (0, 0, 0)
	 * @default new THREE.Vector3()
	 */
	c: Vector3;

	/**
	 * Sets the triangle's *.a*, *.b* and *.c* properties to the passed [vector3s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 * Please note that this method only copies the values from the given objects.
	 */
	set(a: Vector3, b: Vector3, c: Vector3): Triangle;

	/**
	 * @param points  Array of [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3)s
	 * @param i0 Integer index
	 * @param i1 Integer index
	 * @param i2 Integer index Sets the triangle's vectors to the vectors in the array.
	 */
	setFromPointsAndIndices(points: Vector3[], i0: number, i1: number, i2: number): this;

	/**
	 * @param attribute BufferAttribute of vertex data
	 * @param i0 Integer index
	 * @param i1 Integer index
	 * @param i2 Integer index Sets the triangle's vertices from the buffer attribute vertex data.
	 */
	setFromAttributeAndIndices(
		attribute: BufferAttribute | InterleavedBufferAttribute,
		i0: number,
		i1: number,
		i2: number
	): this;

	/**
	 * @returns Returns a new triangle with the same *.a*, *.b* and  *.c* properties as this one.
	 */
	clone(): this;

	/**
	 * Copies the values of the passed triangles's *.a*, *.b* and *.c* properties to this triangle.
	 */
	copy(triangle: Triangle): this;

	/**
	 * @returns Return the area of the triangle.
	 */
	getArea(): number;

	/**
	 * Calculate the midpoint of the triangle.
	 * @param target The result will be copied into this Vector3.
	 */
	getMidpoint(target: Vector3): Vector3;

	/**
	 * Calculate the [normal vector](https://en.wikipedia.org/wiki/Normal_(geometry)) of the triangle.
	 * @param target The result will be copied into this Vector3.
	 */
	getNormal(target: Vector3): Vector3;

	/**
	 * Calculate a [plane](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Plane) based on the triangle. .
	 * @param target The result will be copied into this Plane.
	 */
	getPlane(target: Plane): Plane;

	/**
	 * [Picture of barycentric coordinates](http://commons.wikimedia.org/wiki/File:Barycentric_coordinates_1.png)
	 * @param point Vector3
	 * @param target The result will be copied into this Vector3.
	 * @returns Return a [barycentric coordinate](https://en.wikipedia.org/wiki/Barycentric_coordinate_system) from the given vector.
	 */
	getBarycoord(point: Vector3, target: Vector3): Vector3;

	/**
	 *
	 * @param point
	 * @param uv1
	 * @param uv2
	 * @param uv3
	 * @param target
	 * @returns uv
	 */
	getUV(point: Vector3, uv1: Vector2, uv2: Vector2, uv3: Vector2, target: Vector2): Vector2;

	/**
	 *
	 * @param point
	 * @returns true if point
	 */
	containsPoint(point: Vector3): boolean;

	/**
	 * Determines whether or not this triangle intersects [box](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Box3).
	 * @param box Box to check for intersection against.
	 */
	intersectsBox(box: Box3): boolean;

	/**
	 *
	 * @param direction
	 * @returns true if front facing
	 */
	isFrontFacing(direction: Vector3): boolean;

	/**
	 * @param point Vector3
	 * @param target The result will be copied into this Vector3.
	 * @returns Returns the closest point on the triangle to [point](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	closestPointToPoint(point: Vector3, target: Vector3): Vector3;

	/**
	 * @returns Returns true if the two triangles have identical *.a*, *.b* and *.c* properties.
	 */
	equals(triangle: Triangle): boolean;

	/**
	 *
	 * @param a
	 * @param b
	 * @param c
	 * @param target
	 * @returns normal
	 */
	getNormal(a: Vector3, b: Vector3, c: Vector3, target: Vector3): Vector3;

	/**
	 *
	 * @param point
	 * @param a
	 * @param b
	 * @param c
	 * @param target
	 * @returns barycoord
	 */
	getBarycoord(point: Vector3, a: Vector3, b: Vector3, c: Vector3, target: Vector3): Vector3;

	/**
	 * @param point Vector3 to check.
	 * @returns Returns true if the passed point, when projected onto the plane of the triangle, lies within the triangle.
	 */
	containsPoint(point: Vector3, a: Vector3, b: Vector3, c: Vector3): boolean;

	/**
	 *
	 * @param point
	 * @param p1
	 * @param p2
	 * @param p3
	 * @param uv1
	 * @param uv2
	 * @param uv3
	 * @param target
	 * @returns uv
	 */
	getUV(
		point: Vector3,
		p1: Vector3,
		p2: Vector3,
		p3: Vector3,
		uv1: Vector2,
		uv2: Vector2,
		uv3: Vector2,
		target: Vector2
	): Vector2;

	/**
	 *
	 * @param a
	 * @param b
	 * @param c
	 * @param direction
	 * @returns true if front facing
	 */
	isFrontFacing(a: Vector3, b: Vector3, c: Vector3, direction: Vector3): boolean;
}

export type Vector2Tuple = [number, number];

/**
 * ( interface Vector<T> )
 *
 * Abstract interface of [Vector2](https://github.com/mrdoob/three.js/blob/master/src/math/Vector2.js),
 * [Vector3](https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js)
 * and [Vector4](https://github.com/mrdoob/three.js/blob/master/src/math/Vector4.js).
 *
 * Currently the members of Vector is NOT type safe because it accepts different typed vectors.
 *
 * Those definitions will be changed when TypeScript innovates Generics to be type safe.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector) page for details.
 *
 * @example
 * const v:THREE.Vector = new THREE.Vector3();
 * v.addVectors(new THREE.Vector2(0, 1), new THREE.Vector2(2, 3)); // invalid but compiled successfully
 */
export interface Vector {
	/**
	 *
	 */
	new (): this;

	/**
	 * @param index 0 or 1.
	 * @param value Float
	 * If index equals 0 set *.x* to [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * If index equals 1 set *.y* to [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float)
	 */
	setComponent(index: number, value: number): this;

	/**
	 * @param index 0 or 1.
	 * If index equals 0 returns the *.x* value.
	 * If index equals 1 returns the *.y* value.
	 */
	getComponent(index: number): number;

	/**
	 * Sets the *.x* and *.y* components of this vector.
	 */
	set(...args: number[]): this;

	/**
	 * Sets the *.x* and *.y* values of this vector both equal to [scalar](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	setScalar(scalar: number): this;

	/**
	 * Copies the values of the passed Vector2's *.x* and *.y* properties to this Vector2.
	 */
	copy(v: Vector): this;

	/**
	 * Adds [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector) to this vector.
	 */
	add(v: Vector): this;

	/**
	 * Sets this vector to [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector) + [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector).
	 */
	addVectors(a: Vector, b: Vector): this;

	/**
	 * Adds the multiple of [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector) and [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) to this vector.
	 */
	addScaledVector(vector: Vector, scale: number): this;

	/**
	 * Adds the scalar value s to this vector's values.
	 */
	addScalar(scalar: number): this;

	/**
	 * Subtracts [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector) from this vector.
	 */
	sub(v: Vector): this;

	/**
	 * Sets this vector to [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector) - [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector).
	 */
	subVectors(a: Vector, b: Vector): this;

	/**
	 * Multiplies this vector by scalar [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	multiplyScalar(s: number): this;

	/**
	 * Divides this vector by scalar [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * Sets vector to *( 0, 0 )* if [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) = 0.
	 */
	divideScalar(s: number): this;

	/**
	 * Inverts this vector - i.e. sets x = -x and y = -y.
	 */
	negate(): this;

	/**
	 * Calculates the [dot product](https://en.wikipedia.org/wiki/Dot_product) of this   vector and [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector).
	 */
	dot(v: Vector): number;

	/**
	 * Computes the square of the [Euclidean length](https://en.wikipedia.org/wiki/Euclidean_distance)
	 * (straight-line length) from (0, 0) to (x, y). If you are 	comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate.
	 */
	lengthSq(): number;

	/**
	 * Computes the [Euclidean length](https://en.wikipedia.org/wiki/Euclidean_distance)
	 * (straight-line length) from (0, 0) to (x, y).
	 */
	length(): number;

	/**
	 * Converts this vector to a [unit vector](https://en.wikipedia.org/wiki/Unit_vector) - that is, sets it equal to a vector with the same direction as this one, but *.length* 1.
	 */
	normalize(): this;

	/**
	 * Computes the distance from this vector to [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector).
	 */
	distanceTo?(v: Vector): number;

	/**
	 * Computes the squared distance from this vector to [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector). If you are just comparing the distance with another distance, you should compare the distance squared instead as it is slightly more efficient to calculate.
	 */
	distanceToSquared?(v: Vector): number;

	/**
	 * Sets this vector to a vector with the same direction as this one, but *.length*
	 * @param l
	 */
	setLength(l: number): this;

	/**
	 * Linearly interpolates between this vector and [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector), where alpha is the percent distance along the line - alpha = 0 will be this vector, and alpha = 1 will be [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector).
	 * @param v Vector to interpolate towards.
	 * @param alph A interpolation factor, typically in the closed interval [0, 1].
	 */
	lerp(v: Vector, alpha: number): this;

	/**
	 * equals(v:T):boolean;
	 */
	equals(v: Vector): boolean;

	/**
	 * @returns Returns a new Vector with the same *.x* and *.y* values as this one.
	 */
	clone(): Vector;
}

/**
 * Class representing a 2D [vector](https://en.wikipedia.org/wiki/Vector_space).
 * A 2D vector is an ordered pair of numbers (labeled x and y), which can be used to represent a number of things, such as:
 * A point in 2D space (i.e. a position on a plane).
 * A direction and length across a plane. In three.js the length will always be the [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)e (straight-line distance) from (0, 0) to (x, y) and the direction is also measured from (0, 0) towards (x, y).
 * Any arbitrary ordered pair of numbers.
 * There are other things a 2D vector can be used to represent, such as momentum vectors, complex numbers and so on,	however these are the most common uses in three.js.
 * Iterating through a Vector2 instance will yield its components (x, y) in the corresponding order.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) page for details.
 *
 * ### Examples
 * [css2d / label](https://outmindkjg.github.io/ngx3js-doc/#/examples/css2d_label) |
 * [misc / controls / drag](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_controls_drag) |
 * [misc / controls / fly](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_controls_fly) |
 * [misc / uv / tests](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_uv_tests) |
 * [physics / ammo / break](https://outmindkjg.github.io/ngx3js-doc/#/examples/physics_ammo_break)
 *
 *
 * ### Code Example
 * 
 * ```js
 * const a = new THREE.Vector2( 0, 1 );
 * // no arguments; will be initialised to (0, 0)
 * const b = new THREE.Vector2( );
 * const d = a.distanceTo( b );
 * ```
 */
export interface Vector2 extends Vector {
	/**
	 * Creates a new Vector2.
	 * @param x The x value of this vector. Default is *0*.
	 * @param y The y value of this vector. Default is *0*.
	 */
	new (x?: number, y?: number): this;

	/**
	 * the x value of this vector. Default is *0*
	 * @default 0
	 */
	x: number;

	/**
	 * the y value of this vector. Default is *0*.
	 * @default 0
	 */
	y: number;

	/**
	 * Alias for x
	 */
	width: number;

	/**
	 * Alias for y
	 */
	height: number;

	readonly isVector2: true;

	/**
	 * Sets the *.x* and *.y* components of this vector.
	 */
	set(x: number, y: number): this;

	/**
	 * Sets the *.x* and *.y* values of this vector both equal to [scalar](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	setScalar(scalar: number): this;

	/**
	 * Replaces this vector's *.x* value with [x](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	setX(x: number): this;

	/**
	 * Replaces this vector's *.y* value with [y](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	setY(y: number): this;

	/**
	 * If index equals 0 set *.x* to [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * If index equals 1 set *.y* to [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float)
	 * @param index 0 or 1.
	 * @param value Float
	 */
	setComponent(index: number, value: number): this;

	/**
	 * If index equals 0 returns the *.x* value.
	 * If index equals 1 returns the *.y* value.
	 * @param index 0 or 1.
	 */
	getComponent(index: number): number;

	/**
	 * @returns Returns a new Vector2 with the same *.x* and *.y* values as this one.
	 */
	clone(): this;

	/**
	 * Copies the values of the passed Vector2's *.x* and *.y* properties to this Vector2.
	 */
	copy(v: Vector2): this;

	/**
	 * Adds v to this vector.
	 */
	add(v: Vector2, w?: Vector2): this;

	/**
	 * Adds the scalar value [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) to this vector's *.x* and *.y* values.
	 */
	addScalar(s: number): this;

	/**
	 * Sets this vector to [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) + [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 */
	addVectors(a: Vector2, b: Vector2): this;

	/**
	 * Adds the multiple of [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) and [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) to this vector.
	 */
	addScaledVector(v: Vector2, s: number): this;

	/**
	 * Subtracts [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) from this vector.
	 */
	sub(v: Vector2): this;

	/**
	 * Subtracts [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float)  from this vector's *.x* and *.y* components.
	 */
	subScalar(s: number): this;

	/**
	 * Sets this vector to [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) - [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 */
	subVectors(a: Vector2, b: Vector2): this;

	/**
	 * Multiplies this vector by [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 */
	multiply(v: Vector2): this;

	/**
	 * Multiplies this vector by scalar [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	multiplyScalar(scalar: number): this;

	/**
	 * Divides this vector by [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 */
	divide(v: Vector2): this;

	/**
	 * Divides this vector by scalar [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * Sets vector to *( 0, 0 )* if [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) = 0.
	 */
	divideScalar(s: number): this;

	/**
	 * Multiplies this vector (with an implicit 1 as the 3rd component) by m.
	 */
	applyMatrix3(m: Matrix3): this;

	/**
	 * If this vector's x or y value is greater than [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2)'s x or y value, replace that value with the corresponding min value.
	 */
	min(v: Vector2): this;

	/**
	 * If this vector's x or y value is less than [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2)'s x or y value, replace that value with the corresponding max value.
	 */
	max(v: Vector2): this;

	/**
	 * If this vector's x or y value is less than the min vector's x or y value, it is replaced by the corresponding value.
	 * @param min The minimum x and y values.
	 * @param max The maximum x and y values in the desired range If this vector's x or y value is greater than the max vector's x or y value, it is replaced by the corresponding value.
	 */
	clamp(min: Vector2, max: Vector2): this;

	/**
	 * If this vector's x or y values are less than the min value, they are replaced by the min value.
	 * @param min The minimum value the components will be clamped to
	 * @param max The maximum value the components will be clamped to If this vector's x or y values are greater than the max value, they are replaced by the max value.
	 */
	clampScalar(min: number, max: number): this;

	/**
	 * If this vector's length is less than the min value, it is replaced by the min value.
	 * @param min The minimum value the length will be clamped to
	 * @param max The maximum value the length will be clamped to If this vector's length is greater than the max value, it is replaced by the max value.
	 */
	clampLength(min: number, max: number): this;

	/**
	 * The components of this vector are rounded down to the nearest integer value.
	 */
	floor(): this;

	/**
	 * The *.x* and *.y* components of this vector are rounded up to the nearest integer value.
	 */
	ceil(): this;

	/**
	 * The components of this vector are rounded to the nearest integer value.
	 */
	round(): this;

	/**
	 * The components of this vector are rounded towards zero (up if negative, down if positive) to an integer value.
	 */
	roundToZero(): this;

	/**
	 * Inverts this vector - i.e. sets x = -x and y = -y.
	 */
	negate(): this;

	/**
	 * Calculates the [dot product](https://en.wikipedia.org/wiki/Dot_product) of this   vector and [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 */
	dot(v: Vector2): number;

	/**
	 * Calculates the [cross product](https://en.wikipedia.org/wiki/Cross_product) of this   vector and [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2). Note that a 'cross-product' in 2D is not well-defined. This function computes a geometric cross-product often used in 2D graphics <h3>[method:Boolean equals]( [param:Vector2 v] )</h3>
	 * @returns Returns *true* if the components of this vector and [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) are strictly equal; *false* otherwise.
	 */
	cross(v: Vector2): number;

	/**
	 * Computes the square of the [Euclidean length](https://en.wikipedia.org/wiki/Euclidean_distance)
	 * (straight-line length) from (0, 0) to (x, y). If you are comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate.
	 */
	lengthSq(): number;

	/**
	 * Computes the [Euclidean length](https://en.wikipedia.org/wiki/Euclidean_distance) (straight-line length) from (0, 0) to (x, y).
	 */
	length(): number;

	/**
	 * Computes the [Manhattan length](http://en.wikipedia.org/wiki/Taxicab_geometry) of this vector.
	 */
	manhattanLength(): number;

	/**
	 * Converts this vector to a [unit vector](https://en.wikipedia.org/wiki/Unit_vector) - that is, sets it equal to a vector with the same direction as this one, but *.length* 1.
	 */
	normalize(): this;

	/**
	 * Computes the angle in radians of this vector with respect to the positive x-axis.
	 */
	angle(): number;

	/**
	 * Computes the distance from this vector to [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 */
	distanceTo(v: Vector2): number;

	/**
	 * Computes the squared distance from this vector to [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2). If you are just comparing the distance with another distance, you should compare the distance squared instead as it is slightly more efficient to calculate.
	 */
	distanceToSquared(v: Vector2): number;

	/**
	 * Computes the [Manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry) from this vector to [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 */
	manhattanDistanceTo(v: Vector2): number;

	/**
	 * Sets this vector to a vector with the same direction as this one, but *.length*
	 * @param l
	 */
	setLength(length: number): this;

	/**
	 * Linearly interpolates between this vector and [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2), where alpha is the percent distance along the line - alpha = 0 will be this vector, and alpha = 1 will be [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 * @param v Vector2 to interpolate towards.
	 * @param alph A interpolation factor, typically in the closed interval [0, 1].
	 */
	lerp(v: Vector2, alpha: number): this;

	/**
	 * Sets this vector to be the vector linearly interpolated between [v1](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) and [v2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) where alpha is the percent distance along the line connecting the two vectors - alpha = 0 will be [v1](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2), and alpha = 1 will be [v2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 * @param v1 The starting [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2).
	 * @param v2 Vector2 to interpolate towards.
	 * @param alph A interpolation factor, typically in the closed interval [0, 1].
	 */
	lerpVectors(v1: Vector2, v2: Vector2, alpha: number): this;

	/**
	 * Checks for strict equality of this vector and v.
	 */
	equals(v: Vector2): boolean;

	/**
	 * @param array array to store this vector to. If this is not provided, a new array will be created.
	 * @param offset optional offset into the array.
	 * @returns Returns an array [x, y], or copies x and y into the provided [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array).
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): this;

	/**
	 * Sets this vector's *.x* and *.y* values from the [attribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute).
	 * @param attribute The source attribute.
	 * @param index index in the attribute.
	 */
	fromBufferAttribute(attribute: BufferAttribute, index: number): this;

	/**
	 * Rotates this vector around [center](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) by [angle](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) radians.
	 * @param center The point around which to rotate.
	 * @param angle The angle to rotate, in radians.
	 */
	rotateAround(center: Vector2, angle: number): this;

	/**
	 * Sets each component of this vector to a pseudo-random value between 0 and 1, excluding 1.
	 */
	random(): this;
}

export type Vector3Tuple = [number, number, number];

/**
 * Class representing a 3D [vector](https://en.wikipedia.org/wiki/Vector_space).
 * A 3D vector is an ordered triplet of numbers (labeled x, y, and z), which can be used to represent a number of things, such as:
 * A point in 3D space.
 * A direction and length in 3D space. In three.js the length will always be the [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)e (straight-line distance) from (0, 0, 0) to (x, y, z) and the direction is also measured from (0, 0, 0) towards (x, y, z).
 * Any arbitrary ordered triplet of numbers.
 * There are other things a 3D vector can be used to represent, such as momentum vectors and so on, however these are the most common uses in three.js.
 * Iterating through a Vector3 instance will yield its components (x, y, z) in the corresponding order.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) page for details.
 *
 * ### Examples
 * [css3d / molecules](https://outmindkjg.github.io/ngx3js-doc/#/examples/css3d_molecules) |
 * [css3d / orthographic](https://outmindkjg.github.io/ngx3js-doc/#/examples/css3d_orthographic) |
 * [games / fps](https://outmindkjg.github.io/ngx3js-doc/#/examples/games_fps) |
 * [misc / animation / keys](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_animation_keys) |
 * [physics / ammo / break](https://outmindkjg.github.io/ngx3js-doc/#/examples/physics_ammo_break)
 *
 * ### Code Example
 * 
 * ```js
 * const a = new THREE.Vector3( 0, 1, 0 );
 * // no arguments; will be initialised to (0, 0, 0)
 * const b = new THREE.Vector3( );
 * const d = a.distanceTo( b );
 * ```
 */
export interface Vector3 extends Vector {
	/**
	 * @param x The x value of this vector. Default is *0*.
	 * @param y The y value of this vector. Default is *0*.
	 * @param z The z value of this vector. Default is *0*.
	 * Creates a new Vector3.
	 */
	new (x?: number, y?: number, z?: number): this;

	/**
	 * the x value of this vector. Default is *0*.
	 * @default 0
	 */
	x: number;

	/**
	 * the y value of this vector. Default is *0*.
	 * @default 0
	 */
	y: number;

	/**
	 * the z value of this vector. Default is *0*.
	 * @default 0
	 */
	z: number;

	readonly isVector3: true;

	/**
	 * Sets the *.x*, *.y* and *.z* components of this vector.
	 */
	set(x: number, y: number, z: number): this;

	/**
	 * Set the *.x*, *.y* and *.z* values of this vector both equal to [scalar](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	setScalar(scalar: number): this;

	/**
	 * Replace this vector's *.y* value with [y](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	setX(x: number): Vector3;

	/**
	 * Replace this vector's *.y* value with [y](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	setY(y: number): Vector3;

	/**
	 * Replace this vector's *.z* value with [z](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	setZ(z: number): Vector3;

	/**
	 * If index equals 0 set *.x* to [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * If index equals 1 set *.y* to [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * If index equals 2 set *.z* to [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float)
	 * @param index 0, 1 or 2.
	 * @param value Float
	 */
	setComponent(index: number, value: number): this;

	/**
	 * If index equals 0 returns the *.x* value.
	 * If index equals 1 returns the *.y* value.
	 * If index equals 2 returns the *.z* value.
	 * @param index 0, 1 or 2.
	 */
	getComponent(index: number): number;

	/**
	 * @returns Returns a new vector3 with the same *.x*, *.y* and *.z* values as this one.
	 */
	clone(): this;

	/**
	 * Copies the values of the passed vector3's *.x*, *.y* and *.z* properties to this vector3.
	 */
	copy(v: Vector3): this;

	/**
	 * Adds [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) to this vector.
	 */
	add(v: Vector3): this;

	/**
	 * Adds the scalar value s to this vector's *.x*, *.y* and *.z* values.
	 */
	addScalar(s: number): this;

	/**
	 * Adds the multiple of [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) and [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) to this vector.
	 */
	addScaledVector(v: Vector3, s: number): this;

	/**
	 * Sets this vector to [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) + [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	addVectors(a: Vector3, b: Vector3): this;

	/**
	 * Subtracts [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) from this vector.
	 */
	sub(a: Vector3): this;

	/**
	 * Subtracts [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float)  from this vector's *.x*, *.y* and *.z* compnents.
	 */
	subScalar(s: number): this;

	/**
	 * Sets this vector to [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) - [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	subVectors(a: Vector3, b: Vector3): this;

	/**
	 * Multiplies this vector by [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	multiply(v: Vector3): this;

	/**
	 * Multiplies this vector by scalar [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	multiplyScalar(s: number): this;

	/**
	 * Sets this vector equal to [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) * [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3), component-wise.
	 */
	multiplyVectors(a: Vector3, b: Vector3): this;

	/**
	 * Applies euler transform to this vector by converting the [Euler](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Euler) object to a [Quaternion](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion) and applying.
	 */
	applyEuler(euler: Euler): this;

	/**
	 * Applies a rotation specified by an axis and an angle to this vector.
	 * @param axis A normalized [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 * @param angle An angle in radians.
	 */
	applyAxisAngle(axis: Vector3, angle: number): this;

	/**
	 * Multiplies this vector by [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3)
	 */
	applyMatrix3(m: Matrix3): this;

	/**
	 * Multiplies this vector by normal matrix [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3) and normalizes the result.
	 */
	applyNormalMatrix(m: Matrix3): this;

	/**
	 * Multiplies this vector (with an implicit 1 in the 4th dimension) and m, and divides by perspective.
	 */
	applyMatrix4(m: Matrix4): this;

	/**
	 * Applies a [Quaternion](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaternion) transform to this vector.
	 */
	applyQuaternion(q: Quaternion): this;

	/**
	 * Projects this vector from world space into the camera's normalized device coordinate (NDC) space.
	 * @param camer A camera to use in the projection.
	 */
	project(camera: Camera): this;

	/**
	 * Projects this vector from the camera's normalized device coordinate (NDC) space into world space.
	 * @param camer A camera to use in the projection.
	 */
	unproject(camera: Camera): this;

	/**
	 * Transforms the direction of this vector by a matrix (the upper left 3 x 3 subset of a [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4)) and then *.normalize* the result.
	 */
	transformDirection(m: Matrix4): this;

	/**
	 * Divides this vector by [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	divide(v: Vector3): this;

	/**
	 * Divides this vector by scalar [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * Sets vector to *( 0, 0, 0 )* if *[s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) = 0*.
	 */
	divideScalar(s: number): this;

	/**
	 * If this vector's x, y or z value is greater than [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3)'s x, y or z value, replace that value with the corresponding min value.
	 */
	min(v: Vector3): this;

	/**
	 * If this vector's x, y or z value is less than [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3)'s x, y or z value, replace that value with the corresponding max value.
	 */
	max(v: Vector3): this;

	/**
	 * If this vector's x, y or z value is less than the min vector's x, y or z value, it is replaced by the corresponding value.
	 * @param min The minimum *.x*, *.y* and *.z* values.
	 * @param max The maximum *.x*, *.y* and *.z* values in the desired range If this vector's x, y or z value is greater than the max vector's x, y or z value, it is replaced by the corresponding value.
	 */
	clamp(min: Vector3, max: Vector3): this;

	/**
	 * If this vector's x, y or z values are less than the min value, they are replaced by the min value.
	 * @param min The minimum value the components will be clamped to
	 * @param max The maximum value the components will be clamped to If this vector's x, y or z values are greater than the max value, they are replaced by the max value.
	 */
	clampScalar(min: number, max: number): this;

	/**
	 * If this vector's length is less than the min value, the vector will be scaled up so its length is the min value.
	 * @param min The minimum value the length will be clamped to
	 * @param max The maximum value the length will be clamped to If this vector's length is greater than the max value, the vector will be scaled down so its length is the max value.
	 */
	clampLength(min: number, max: number): this;

	/**
	 * The components of this vector are rounded down to the nearest integer value.
	 */
	floor(): this;

	/**
	 * The *.x*, *.y* and *.z* components of this vector are rounded up to the nearest integer value.
	 */
	ceil(): this;

	/**
	 * The components of this vector are rounded to the nearest integer value.
	 */
	round(): this;

	/**
	 * The components of this vector are rounded towards zero (up if negative, down if positive) to an integer value.
	 */
	roundToZero(): this;

	/**
	 * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
	 */
	negate(): this;

	/**
	 * Calculate the [dot product](https://en.wikipedia.org/wiki/Dot_product) of this vector and [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	dot(v: Vector3): number;

	/**
	 * Computes the square of the [Euclidean length](https://en.wikipedia.org/wiki/Euclidean_distance)
	 * (straight-line length) from (0, 0, 0) to (x, y, z). If you are 	comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate.
	 */
	lengthSq(): number;

	/**
	 * Computes the [Euclidean length](https://en.wikipedia.org/wiki/Euclidean_distance) (straight-line length) from (0, 0, 0) to (x, y, z).
	 */
	length(): number;

	/**
	 * Computes the [Manhattan length](http://en.wikipedia.org/wiki/Taxicab_geometry) of this vector.
	 */
	manhattanLength(): number;

	/**
	 * Computes the [Manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry) from this vector to [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	manhattanDistanceTo(v: Vector3): number;

	/**
	 * Convert this vector to a [unit vector](https://en.wikipedia.org/wiki/Unit_vector) - that is, sets it equal to a vector with the same direction as this one, but *.length* 1.
	 */
	normalize(): this;

	/**
	 * Set this vector to a vector with the same direction as this one, but *.length*
	 * @param l
	 */
	setLength(l: number): this;

	/**
	 * Linearly interpolate between this vector and [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3), where alpha is the percent distance along the line - alpha = 0 will be this vector, and alpha = 1 will be [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 * @param v Vector3 to interpolate towards.
	 * @param alph A interpolation factor, typically in the closed interval [0, 1].
	 */
	lerp(v: Vector3, alpha: number): this;

	/**
	 * Sets this vector to be the vector linearly interpolated between [v1](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) and [v2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) where alpha is the percent distance along the line connecting the two vectors - alpha = 0 will be [v1](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3), and alpha = 1 will be [v2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 * @param v1 The starting [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 * @param v2 Vector3 to interpolate towards.
	 * @param alph A interpolation factor, typically in the closed interval [0, 1].
	 */
	lerpVectors(v1: Vector3, v2: Vector3, alpha: number): this;

	/**
	 * Sets this vector to [cross product](https://en.wikipedia.org/wiki/Cross_product) of itself and [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	cross(a: Vector3): this;

	/**
	 * Sets this vector to [cross product](https://en.wikipedia.org/wiki/Cross_product) of [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) and [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	crossVectors(a: Vector3, b: Vector3): this;

	/**
	 * [Projects](https://en.wikipedia.org/wiki/Vector_projection) this vector onto [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	projectOnVector(v: Vector3): this;

	/**
	 * [Projects](https://en.wikipedia.org/wiki/Vector_projection) this vector onto a plane by subtracting this vector projected onto the plane's normal from this vector.
	 * @param planeNormal A vector representing a plane normal.
	 */
	projectOnPlane(planeNormal: Vector3): this;

	/**
	 * @param normal The normal to the reflecting plane Reflect this vector off of plane orthogonal to [normal](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3). Normal is assumed to have unit length.
	 */
	reflect(vector: Vector3): this;

	/**
	 * @returns Returns the angle between this vector and vector [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) in radians.
	 */
	angleTo(v: Vector3): number;

	/**
	 * Computes the distance from this vector to [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3).
	 */
	distanceTo(v: Vector3): number;

	/**
	 * Computes the squared distance from this vector to [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3). If you are just comparing the distance with another distance, you should compare the distance squared instead as it is slightly more efficient to calculate.
	 */
	distanceToSquared(v: Vector3): number;

	/**
	 * Sets this vector from the spherical coordinates [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Spherical).
	 */
	setFromSpherical(s: Spherical): this;

	/**
	 * Sets this vector from the spherical coordinates [radius](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Spherical), [phi](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Spherical) and [theta](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Spherical).
	 */
	setFromSphericalCoords(r: number, phi: number, theta: number): this;

	/**
	 * Sets this vector from the cylindrical coordinates [c](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Cylindrical).
	 */
	setFromCylindrical(s: Cylindrical): this;

	/**
	 * Sets this vector from the cylindrical coordinates [radius](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Cylindrical), [theta](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Cylindrical) and [y](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Cylindrical).
	 */
	setFromCylindricalCoords(radius: number, theta: number, y: number): this;

	/**
	 * Sets this vector to the position elements of the [transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix) [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4).
	 */
	setFromMatrixPosition(m: Matrix4): this;

	/**
	 * Sets this vector to the scale elements of the [transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix) [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4).
	 */
	setFromMatrixScale(m: Matrix4): this;

	/**
	 * Sets this vector's *.x*, *.y* and *.z* components from [index](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) column of [matrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4).
	 */
	setFromMatrixColumn(matrix: Matrix4, index: number): this;

	/**
	 * Sets this vector's *.x*, *.y* and *.z* components from [index](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Integer) column of [matrix](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix3).
	 */
	setFromMatrix3Column(matrix: Matrix3, index: number): this;

	/**
	 * @returns Returns *true* if the components of this vector and [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) are strictly equal; *false* otherwise.
	 */
	equals(v: Vector3): boolean;

	/**
	 * Sets this vector's *.x* value to be array[ offset + 0 ], *.y* value to be array[ offset + 1 ] and *.z* value to be array[ offset + 2 ].
	 * @param array The source array.
	 * @param offset ( optional) offset into the array. Default is 0.
	 */
	fromArray(array: number[] | ArrayLike<number>, offset?: number): this;

	/**
	 * @param array array to store this vector to. If this is not provided a new array will be created.
	 * @param offset optional offset into the array.
	 * @returns Returns an array [x, y, z], or copies x, y and z into the provided [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array).
	 */
	toArray(array?: number[] | ArrayLike<number>, offset?: number): number[];

	/**
	 * Sets this vector's *.x*, *.y* and *.z* values from the [attribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute).
	 * @param attribute The source attribute.
	 * @param index index in the attribute.
	 */
	fromBufferAttribute(attribute: BufferAttribute | InterleavedBufferAttribute, index: number): this;

	/**
	 * Sets each component of this vector to a pseudo-random value between 0 and 1, excluding 1.
	 */
	random(): this;

	/**
	 * Sets this vector to a uniformly random point on a unit sphere.
	 */
	randomDirection(): this;
}

export type Vector4Tuple = [number, number, number, number];

/**
 * Class representing a 4D [vector](https://en.wikipedia.org/wiki/Vector_space).
 * A 4D vector is an ordered quadruplet of numbers (labeled x, y, z, and w), which can be used to represent a number of things, such as:
 * A point in 4D space.
 * A direction and length in 4D space. In three.js the length will always be the [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance)e (straight-line distance) from (0, 0, 0, 0) to (x, y, z, w) and the direction is also measured from (0, 0, 0, 0) towards (x, y, z, w).
 * Any arbitrary ordered quadruplet of numbers.
 * There are other things a 4D vector can be used to represent, however these are the most common uses in three.js.
 * Iterating through a Vector4 instance will yield its components (x, y, z, w) in the corresponding order.
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4) page for details.
 *
 * ### Examples
 * [webgl / buffergeometry / instancing](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_instancing) |
 * [webgl / camera / array](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_camera_array) |
 * [webgl / geometry / nurbs](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_nurbs) |
 * [webgl / postprocessing / godrays](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_godrays) |
 * [webgl / shadowmesh](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_shadowmesh)
 *
 * ### Code Example
 * 
 * ```js
 * const a = new THREE.Vector4( 0, 1, 0, 0 );
 * // no arguments; will be initialised to (0, 0, 0, 1)
 * const b = new THREE.Vector4( );
 * const d = a.dot( b );
 * ```
 */
export interface Vector4 extends Vector {
	/**
	 * Creates a new Vector4.
	 * @param x The x value of this vector. Default is *0*.
	 * @param y The y value of this vector. Default is *0*.
	 * @param z The z value of this vector. Default is *0*.
	 * @param w The w value of this vector. Default is *1*.
	 */
	new (x?: number, y?: number, z?: number, w?: number): this;

	/**
	 * the x value of this vector. Default is *0*.
	 * @default 0
	 */
	x: number;

	/**
	 * the y value of this vector. Default is *0*.
	 * @default 0
	 */
	y: number;

	/**
	 * the z value of this vector. Default is *0*.
	 * @default 0
	 */
	z: number;

	/**
	 * the w value of this vector. Default is *0*.
	 * @default 0
	 */
	w: number;

	/**
	 * Alias for *.z*.
	 */
	width: number;

	/**
	 * Alias for *.w*.
	 */
	height: number;

	readonly isVector4: true;

	/**
	 * Sets the *.x*, *.y*, *.z* and *.w* components of this vector.
	 */
	set(x: number, y: number, z: number, w: number): this;

	/**
	 * Sets the *.x*, *.y*, *.z* and *.w* values of this vector both equal to [scalar](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	setScalar(scalar: number): this;

	/**
	 * Replaces this vector's *.x* value with [x](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	setX(x: number): this;

	/**
	 * Replaces this vector's *.y* value with [y](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	setY(y: number): this;

	/**
	 * Replaces this vector's *.z* value with [z](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	setZ(z: number): this;

	/**
	 * Replaces this vector's *.w* value with [w](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	setW(w: number): this;

	/**
	 * If index equals 0 set *.x* to [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * If index equals 1 set *.y* to [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * If index equals 2 set *.z* to [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * If index equals 3 set *.w* to [value](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * @param index 0, 1 or 2, 3.
	 * @param value Float
	 */
	setComponent(index: number, value: number): this;

	/**
	 * If index equals 0 returns the *.x* value.
	 * If index equals 1 returns the *.y* value.
	 * If index equals 2 returns the *.z* value.
	 * If index equals 3 returns the *.w* value.
	 * @param index 0, 1, 2 or 3.
	 */
	getComponent(index: number): number;

	/**
	 * @returns Returns a new Vector4 with the same *.x*, *.y*, *.z* and *.w* values as this one.
	 */
	clone(): this;

	/**
	 * Copies the values of the passed Vector4's *.x*, *.y*, *.z* and *.w* properties to this Vector4.
	 */
	copy(v: Vector4): this;

	/**
	 * Adds the scalar value s to this vector's *.x*, *.y*, *.z* and *.w* values.
	 */
	add(v: Vector4): this;

	/**
	 * Adds the scalar value s to this vector's *.x*, *.y*, *.z* and *.w* values.
	 */
	addScalar(scalar: number): this;

	/**
	 * Sets this vector to [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4) + [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4).
	 */
	addVectors(a: Vector4, b: Vector4): this;

	/**
	 * Adds the multiple of [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4) and [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) to this vector.
	 */
	addScaledVector(v: Vector4, s: number): this;

	/**
	 * Subtracts [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4) from this vector.
	 */
	sub(v: Vector4): this;

	/**
	 * Subtracts [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float)  from this vector's *.x*, *.y*, *.z* and *.w* compnents.
	 */
	subScalar(s: number): this;

	/**
	 * Sets this vector to [a](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4) - [b](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4).
	 */
	subVectors(a: Vector4, b: Vector4): this;

	/**
	 * Multiplies this vector by [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4).
	 */
	multiply(v: Vector4): this;

	/**
	 * Multiplies this vector by scalar [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 */
	multiplyScalar(s: number): this;

	/**
	 * Multiplies this vector by 4 x 4 [m](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4).
	 */
	applyMatrix4(m: Matrix4): this;

	/**
	 * Divides this vector by scalar [s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float).
	 * Sets vector to *( 0, 0, 0, 0 )* if *[s](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Float) = 0*.
	 */
	divideScalar(s: number): this;

	/**
	 * Sets the *.x*, *.y* and *.z* components of this vector to the quaternion's axis and *.w* to the angle.
	 * @param q A normalized [Quaterion](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Quaterion)
	 */
	setAxisAngleFromQuaternion(q: Quaternion): this;

	/**
	 * Sets the *.x*, *.y* and *.z* to the axis of rotation and *.w* to the angle.
	 * @param m (https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) - a [Matrix4](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4) of which the upper left 3x3 matrix is a pure rotation matrix.
	 */
	setAxisAngleFromRotationMatrix(m: Matrix4): this;

	/**
	 * If this vector's x, y, z or w value is greater than [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4)'s x, y, z or w value, replace that value with the corresponding min value.
	 */
	min(v: Vector4): this;

	/**
	 * If this vector's x, y, z or w value is less than [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4)'s x, y, z or w value, replace that value with the corresponding max value.
	 */
	max(v: Vector4): this;

	/**
	 * If this vector's x, y, z or w value is less than the min vector's x, y, z or w value, it is replaced by the corresponding value.
	 * @param min The minimum *.x*, *.y*, *.z* and *.w* values.
	 * @param max The maximum *.x*, *.y*, *.z* and *.w* values in the desired range If this vector's x, y, z or w value is greater than the max vector's x, y, z or w value, it is replaced by the corresponding value.
	 */
	clamp(min: Vector4, max: Vector4): this;

	/**
	 * If this vector's length is less than the min value, it is replaced by the min value.
	 * @param min The minimum value the length will be clamped to
	 * @param max The maximum value the length will be clamped to If this vector's length is greater than the max value, it is replaced by the max value.
	 */
	clampLength(min: number, max: number): this;

	/**
	 * If this vector's x, y, z or w values are less than the min value, they are replaced by the min value.
	 * @param min The minimum value the components will be clamped to
	 * @param max The maximum value the components will be clamped to If this vector's x, y, z or w values are greater than the max value, they are replaced by the max value.
	 */
	clampScalar(min: number, max: number): this;

	/**
	 * The components of this vector are rounded down to the nearest integer value.
	 */
	floor(): this;

	/**
	 * The *.x*, *.y*, *.z* and *.w* components of this vector are rounded up to the nearest integer value.
	 */
	ceil(): this;

	/**
	 * The components of this vector are rounded to the nearest integer value.
	 */
	round(): this;

	/**
	 * The components of this vector are rounded towards zero (up if negative, down if positive) to an integer value.
	 */
	roundToZero(): this;

	/**
	 * Inverts this vector - i.e. sets x = -x, y = -y, z = -z and w = -w.
	 */
	negate(): this;

	/**
	 * Calculates the [dot product](https://en.wikipedia.org/wiki/Dot_product) of this vector and [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4).
	 */
	dot(v: Vector4): number;

	/**
	 * Computes the square of the [Euclidean length](https://en.wikipedia.org/wiki/Euclidean_distance)
	 * (straight-line length) from (0, 0, 0, 0) to (x, y, z, w). If you are 	comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate.
	 */
	lengthSq(): number;

	/**
	 * Computes the [Euclidean length](https://en.wikipedia.org/wiki/Euclidean_distance) (straight-line length) from (0, 0, 0, 0) to (x, y, z, w).
	 */
	length(): number;

	/**
	 * Computes the [Manhattan length](http://en.wikipedia.org/wiki/Taxicab_geometry) of this vector.
	 */
	manhattanLength(): number;

	/**
	 * Converts this vector to a [unit vector](https://en.wikipedia.org/wiki/Unit_vector) - that is, sets it equal to a vector with the same direction as this one, but *.length* 1.
	 */
	normalize(): this;

	/**
	 * Sets this vector to a vector with the same direction as this one, but *.length*
	 */
	setLength(length: number): this;

	/**
	 * Linearly interpolates between this vector and [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4), where alpha is the percent distance along the line - alpha = 0 will be this vector, and alpha = 1 will be [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4).
	 * @param v Vector4 to interpolate towards.
	 * @param alph A interpolation factor, typically in the closed interval [0, 1].
	 */
	lerp(v: Vector4, alpha: number): this;

	/**
	 * Sets this vector to be the vector linearly interpolated between [v1](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4) and [v2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4) where alpha is the percent distance along the line connecting the two vectors - alpha = 0 will be [v1](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4), and alpha = 1 will be [v2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4).
	 * @param v1 The starting [Vector4](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4).
	 * @param v2 Vector4 to interpolate towards.
	 * @param alph A interpolation factor, typically in the closed interval [0, 1].
	 */
	lerpVectors(v1: Vector4, v2: Vector4, alpha: number): this;

	/**
	 * @returns Returns *true* if the components of this vector and [v](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector4) are strictly equal; *false* otherwise.
	 */
	equals(v: Vector4): boolean;

	/**
	 * Sets this vector's *.x* value to be array[ offset + 0 ], *.y* value to be array[ offset + 1 ] *.z* value to be array[ offset + 2 ] and *.w* value to be array[ offset + 3 ].
	 * @param array The source array.
	 * @param offset offset into the array. Default is 0.
	 */
	fromArray(array: number[], offset?: number): this;

	/**
	 * @param array array to store this vector to. If this is not provided, a new array will be created.
	 * @param offset optional offset into the array.
	 * @returns Returns an array [x, y, z, w], or copies x, y, z and w into the provided [array](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Array).
	 */
	toArray(array?: number[], offset?: number): number[];

	/**
	 * Sets this vector's *.x*, *.y*, *.z* and *.w* values from the [attribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferAttribute).
	 * @param attribute The source attribute.
	 * @param index index in the attribute.
	 */
	fromBufferAttribute(attribute: BufferAttribute, index: number): this;

	/**
	 * Sets each component of this vector to a pseudo-random value between 0 and 1, excluding 1.
	 */
	random(): this;
}

/**
 * Cubic interpolant
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubicInterpolant) page for details.
 *
 * ### Code Example
 * 
 * ```js
 * const interpolant = new THREE.CubicInterpolant(
 * new Float32Array( 2 ), new Float32Array( 2 ),, n, new Float32Array( 1 ) );
 * interpolant.evaluate( 0.5 );
 * ```
 */
export interface CubicInterpolant extends Interpolant {
	/**
	 * @param parameterPositions array of positions
	 * @param samplesValues array of samples
	 * @param sampleSize number of samples
	 * @param resultBuffer buffer to store the interpolation results.
	 */
	new (parameterPositions: any, samplesValues: any, sampleSize: number, resultBuffer?: any): this;

	/**
	 *
	 * @param i1
	 * @param t0
	 * @param t
	 * @param t1
	 * @returns
	 */
	interpolate_(i1: number, t0: number, t: number, t1: number): any;

	/**
	 * Evaluate the interpolant at position *t*.
	 */
	evaluate(t: number): number[];
}

/**
 * Discrete Interpolant
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DiscreteInterpolant) page for details.
 *
 * ### Code Example
 * 
 * ```js
 * const interpolant = new THREE.DiscreteInterpolant(
 * new Float32Array( 2 ), new Float32Array( 2 ),, n, new Float32Array( 1 ) );
 * interpolant.evaluate( 0.5 );
 * ```
 */
export interface DiscreteInterpolant extends Interpolant {
	/**
	 * @param parameterPositions array of positions
	 * @param samplesValues array of samples
	 * @param sampleSize number of samples
	 * @param resultBuffer buffer to store the interpolation results.
	 */
	new (parameterPositions: any, samplesValues: any, sampleSize: number, resultBuffer?: any): this;

	/**
	 *
	 * @param i1
	 * @param t0
	 * @param t
	 * @param t1
	 * @returns
	 */
	interpolate_(i1: number, t0: number, t: number, t1: number): any;

	/**
	 * Evaluate the interpolant at position *t*.
	 */
	evaluate(t: number): number[];
}

/**
 * Linear interpolant
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LinearInterpolant) page for details.
 *
 * ### Code Example
 * 
 * ```js
 * const interpolant = new THREE.LinearInterpolant(
 * new Float32Array( 2 ), new Float32Array( 2 ),, n, new Float32Array( 1 ) );
 * interpolant.evaluate( 0.5 );
 * ```
 */
export interface LinearInterpolant extends Interpolant {
	/**
	 * @param parameterPositions array of positions
	 * @param samplesValues array of samples
	 * @param sampleSize number of samples
	 * @param resultBuffer buffer to store the interpolation results.
	 */
	new (parameterPositions: any, samplesValues: any, sampleSize: number, resultBuffer?: any): this;

	/**
	 *
	 * @param i1
	 * @param t0
	 * @param t
	 * @param t1
	 * @returns
	 */
	interpolate_(i1: number, t0: number, t: number, t1: number): any;

	/**
	 * Evaluate the interpolant at position *t*.
	 */
	evaluate(t: number): number[];
}

/**
 * Quaternion linear interpolant
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/QuaternionLinearInterpolant) page for details.
 *
 * ### Code Example
 * 
 * ```js
 * const interpolant = new THREE.QuaternionLinearInterpolant(
 * new Float32Array( 2 ), new Float32Array( 2 ),, n, new Float32Array( 1 ) );
 * interpolant.evaluate( 0.5 );
 * ```
 */
export interface QuaternionLinearInterpolant extends Interpolant {
	/**
	 * @param parameterPositions array of positions
	 * @param samplesValues array of samples
	 * @param sampleSize number of samples
	 * @param resultBuffer buffer to store the interpolation results.
	 */
	new (parameterPositions: any, samplesValues: any, sampleSize: number, resultBuffer?: any): this;

	/**
	 *
	 * @param i1
	 * @param t0
	 * @param t
	 * @param t1
	 * @returns
	 */
	interpolate_(i1: number, t0: number, t: number, t1: number): any;

	/**
	 * Evaluate the interpolant at position *t*.
	 */
	evaluate(t: number): number[];
}
