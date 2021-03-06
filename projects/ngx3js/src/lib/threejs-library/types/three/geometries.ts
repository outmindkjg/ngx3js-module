import { BufferGeometry } from './core';
import { Curve, Shape } from './extras';
import { Vector2, Vector3 } from './math';

/**
 * BoxGeometry is a geometry class for a rectangular cuboid with a given 'width', 'height', and 'depth'.
 * On creation, the cuboid is centred on the origin, with each edge parallel to one of the axes.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BoxGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/BoxGeometry) page for a live demo.
 *
 * ### Examples
 * [physics / ammo / volume](https://outmindkjg.github.io/ngx3js-doc/#/examples/physics_ammo_volume) |
 * [webaudio / orientation ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_orientation) |
 * [webgl / buffergeometry / drawrange](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_drawrange) |
 * [webgl / camera / cinematic](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_camera_cinematic) |
 * [webgl / custom / attributes / points3](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_custom_attributes_points3) |
 * [webgl / decals ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_decals)
 *
 * ### Code Example
 * 
 * ```js
 * const geometry = new THREE.BoxGeometry( 1, 1, 1 );
 * const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
 * const cube = new THREE.Mesh( geometry, material );
 * scene.add( cube );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'BoxGeometry'" [width]="1" [height]="1" [depth]="1"></ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [color]="'0x00ff00'"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface BoxGeometry extends BufferGeometry {
	/**
	 * @param width Width; that is, the length of the edges parallel to the X axis. Optional; defaults to 1.
	 * @param height Height; that is, the length of the edges parallel to the Y axis. Optional; defaults to 1.
	 * @param depth Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 * @param widthSegments Number of segmented rectangular faces along the width of the sides. Optional; defaults to 1.
	 * @param heightSegments Number of segmented rectangular faces along the height of the sides. Optional; defaults to 1.
	 * @param depthSegments Number of segmented rectangular faces along the depth of the sides. Optional; defaults to 1.
	 */
	new (
		width?: number,
		height?: number,
		depth?: number,
		widthSegments?: number,
		heightSegments?: number,
		depthSegments?: number
	): this;

	/**
	 * @default 'BoxGeometry'
	 */
	type: string;

	/**
	 * An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
	 * Using the above example:
	 * geometry.parameters; // {width: 1, height: 1, depth: 1, widthSegments: undefined, heightSegments: undefined, depthSegments: undefined}
	 * cube.geometry.parameters; // as above cube.geometry.parameters.width; // === 1
	 * cube.geometry.parameters.widthSegments; // === undefined.
	 */
	parameters: {
		width: number;
		height: number;
		depth: number;
		widthSegments: number;
		heightSegments: number;
		depthSegments: number;
	};

	fromJSON(data: any): BoxGeometry;
}

export { BoxGeometry as BoxBufferGeometry };
export { CircleGeometry as CircleBufferGeometry };
export { ConeGeometry as ConeBufferGeometry };
export { CylinderGeometry as CylinderBufferGeometry };
export { DodecahedronGeometry as DodecahedronBufferGeometry };
export { ExtrudeGeometry as ExtrudeBufferGeometry };
export { IcosahedronGeometry as IcosahedronBufferGeometry };
export { LatheGeometry as LatheBufferGeometry };
export { OctahedronGeometry as OctahedronBufferGeometry };
export { PlaneGeometry as PlaneBufferGeometry };
export { PolyhedronGeometry as PolyhedronBufferGeometry };
export { RingGeometry as RingBufferGeometry };
export { ShapeGeometry as ShapeBufferGeometry };
export { SphereGeometry as SphereBufferGeometry };
export { TetrahedronGeometry as TetrahedronBufferGeometry };
export { TorusGeometry as TorusBufferGeometry };
export { TorusKnotGeometry as TorusKnotBufferGeometry };
export { TubeGeometry as TubeBufferGeometry };

/**
 * CircleGeometry is a simple shape of Euclidean geometry.
 * It is contructed from a number of triangular segments that are oriented around a central point and extend as far out as a given radius.
 * It is built counter-clockwise from a start angle and a given central angle.
 * It can also be used to create regular polygons, where the number of segments determines the number of sides.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CircleGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/CircleGeometry) page for a live demo.
 *
 * ### Examples
 * [misc / exporter / gltf](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_gltf) |
 * [webgl / buffergeometry / instancing / billboards](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_instancing_billboards) |
 * [webgl / geometries ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometries) |
 * [webgl / mirror ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_mirror) |
 * [webgl / raycast / texture](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_raycast_texture)
 *
 * ### Code Example
 * 
 * ```js
 * const geometry = new THREE.CircleGeometry( 5, 32 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const circle = new THREE.Mesh( geometry, material );
 * scene.add( circle );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'CircleGeometry'" [radius]="5" [radialSegments]="32"></ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [color]="'0xffff00'"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface CircleGeometry extends BufferGeometry {
	/**
	 * @param radius Radius of the circle, default = 1.
	 * @param segments Number of segments (triangles), minimum = 3, default = 8.
	 * @param thetaStart Start angle for first segment, default = 0 (three o'clock position).
	 * @param thetaLength The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete circle.
	 */
	new (radius?: number, segments?: number, thetaStart?: number, thetaLength?: number): this;

	/**
	 * @default 'CircleGeometry'
	 */
	type: string;

	/**
	 * An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
	 */
	parameters: {
		radius: number;
		segments: number;
		thetaStart: number;
		thetaLength: number;
	};

	/**
	 */
	fromJSON(data: any): CircleGeometry;
}

/**
 * A class for generating cone geometries.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ConeGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ConeGeometry) page for a live demo.
 *
 * ### Examples
 * [physics / ammo / terrain](https://outmindkjg.github.io/ngx3js-doc/#/examples/physics_ammo_terrain) |
 * [webgl / geometry / terrain / raycast](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_terrain_raycast) |
 * [webgl / lightningstrike ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lightningstrike) |
 * [webgl / math / orientation / transform](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_math_orientation_transform) |
 * [webgl / postprocessing / pixel](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_pixel)
 *
 * ### Code Example
 * 
 * ```js
 * const geometry = new THREE.ConeGeometry( 5, 20, 32 );
 * const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
 * const cone = new THREE.Mesh( geometry, material );
 * scene.add( cone );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'ConeGeometry'" [radius]="5" [height]="20" [radialSegments]="32"></ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [color]="'0xffff00'"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface ConeGeometry extends CylinderGeometry {
	/**
	 * @param radius Radius of the cone base. Default is 1.
	 * @param height Height of the cone. Default is 1.
	 * @param radialSegments Number of segmented faces around the circumference of the cone. Default is 8
	 * @param heightSegments Number of rows of faces along the height of the cone. Default is 1.
	 * @param openEnded A Boolean indicating whether the base of the cone is open or capped. Default is false, meaning capped.
	 * @param thetaStart Start angle for first segment, default = 0 (three o'clock position).
	 * @param thetaLength The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete cone.
	 */
	new (
		radius?: number,
		height?: number,
		radialSegments?: number,
		heightSegments?: number,
		openEnded?: boolean,
		thetaStart?: number,
		thetaLength?: number
	): this;

	/**
	 * @default 'ConeGeometry'
	 */
	type: string;

	/**
	 */
	fromJSON(data: any): ConeGeometry;
}

/**
 * A class for generating cylinder geometries.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CylinderGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/CylinderGeometry) page for a live demo.
 *
 * ### Examples
 * [misc / controls / orbit](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_controls_orbit) |
 * [physics / ammo / terrain](https://outmindkjg.github.io/ngx3js-doc/#/examples/physics_ammo_terrain) |
 * [webgl / geometries ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometries) |
 * [misc / exporter / obj](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_obj) |
 * [webgl / mirror / nodes](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_mirror_nodes)
 *
 * ### Code Example
 * 
 * ```js
 * const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
 * const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
 * const cylinder = new THREE.Mesh( geometry, material );
 * scene.add( cylinder );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'CylinderGeometry'" [radiusTop]="5" [radiusBottom]="5" [height]="20" [radialSegments]="32"></ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [color]="'0xffff00'"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface CylinderGeometry extends BufferGeometry {
	/**
	 * @param radiusTop Radius of the cylinder at the top. Default is 1.
	 * @param radiusBottom Radius of the cylinder at the bottom. Default is 1.
	 * @param height Height of the cylinder. Default is 1.
	 * @param radialSegments Number of segmented faces around the circumference of the cylinder. Default is 8
	 * @param heightSegments Number of rows of faces along the height of the cylinder. Default is 1.
	 * @param openEnded A Boolean indicating whether the ends of the cylinder are open or capped. Default is false, meaning capped.
	 * @param thetaStart Start angle for first segment, default = 0 (three o'clock position).
	 * @param thetaLength The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete cylinder.
	 */
	new (
		radiusTop?: number,
		radiusBottom?: number,
		height?: number,
		radialSegments?: number,
		heightSegments?: number,
		openEnded?: boolean,
		thetaStart?: number,
		thetaLength?: number
	): this;

	/**
	 * @default 'CylinderGeometry'
	 */
	type: string;

	/**
	 * An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
	 */
	parameters: {
		radiusTop: number;
		radiusBottom: number;
		height: number;
		radialSegments: number;
		heightSegments: number;
		openEnded: boolean;
		thetaStart: number;
		thetaLength: number;
	};

	/**
	 */
	fromJSON(data: any): CylinderGeometry;
}

/**
 * A class for generating a dodecahedron geometries.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DodecahedronGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/DodecahedronGeometry) page for a live demo.
 *
 * ### Examples
 * [webgl / geometry / convex](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_convex)
 */
export interface DodecahedronGeometry extends PolyhedronGeometry {
	/**
	 * @param radius Radius of the dodecahedron. Default is 1.
	 * @param detail Default is 0. Setting this to a value greater than 0 adds vertices making it no longer a dodecahedron.
	 */
	new (radius?: number, detail?: number): this;

	/**
	 * @default 'DodecahedronGeometry'
	 */
	type: string;

	/**
	 */
	fromJSON(data: any): DodecahedronGeometry;
}

/**
 * This can be used as a helper object to view the edges of a [geometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry).
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/EdgesGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/EdgesGeometry) page for a live demo.
 *
 * ### Examples
 * [helpers](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_helpers)
 *
 * ### Code Example
 * 
 * ```js
 * const geometry = new THREE.BoxGeometry( 100, 100, 100 );
 * const edges = new THREE.EdgesGeometry( geometry );
 * const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
 * scene.add( line );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh [type]="'LineSegments'">
 * 	<ngx3js-geometry [type]="'EdgesGeometry'">
 * 		<ngx3js-geometry [type]="'BoxGeometry'" [width]="100" [height]="100" [depth]="100"></ngx3js-geometry>
 * 	</ngx3js-geometry>
 * 	<ngx3js-material [type]="'LineBasicMaterial'" [color]="'0xffffff'"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface EdgesGeometry<TBufferGeometry extends BufferGeometry = BufferGeometry> extends BufferGeometry {
	/**
	 * @param geometry Any geometry object.
	 * @param thresholdAngle An edge is only rendered if the angle (in degrees) between the face normals of the adjoining faces exceeds this value. default = 1 degree.
	 */
	new (geometry?: TBufferGeometry, thresholdAngle?: number): this;

	/**
	 * @default 'EdgesGeometry'
	 */
	type: string;

	/**
	 * An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
	 */
	parameters: {
		geometry: TBufferGeometry;
		thresholdAngle: number;
	};
}

/**
 * Extrude geometry options
 */
export interface ExtrudeGeometryOptions {
	/**
	 * int. Number of points on the curves. Default is 12.
	 * @default 12
	 */
	curveSegments?: number | undefined;

	/**
	 * int. Number of points used for subdividing segments along the depth of the extruded spline. Default is 1.
	 * @default 1
	 */
	steps?: number | undefined;

	/**
	 * float. Depth to extrude the shape. Default is 1.
	 * @default 100
	 */
	depth?: number | undefined;

	/**
	 * bool. Apply beveling to the shape. Default is true.
	 * @default true
	 */
	bevelEnabled?: boolean | undefined;

	/**
	 * float. How deep into the original shape the bevel goes. Default is 0.2.
	 * @default 6
	 */
	bevelThickness?: number | undefined;

	/**
	 * float. Distance from the shape outline that the bevel extends. Default is bevelThickness - 0.1.
	 */
	bevelSize?: number | undefined;

	/**
	 * float. Distance from the shape outline that the bevel starts. Default is 0.
	 * @default 0
	 */
	bevelOffset?: number | undefined;

	/**
	 * int. Number of bevel layers. Default is 3.
	 * @default 3
	 */
	bevelSegments?: number | undefined;

	/**
	 * THREE.Curve. A 3D spline path along which the shape should be extruded. Bevels not supported for path extrusion.
	 */
	extrudePath?: Curve<Vector3> | undefined;

	/**
	 * Object. object that provides UV generator functions
	 */
	UVGenerator?: UVGenerator | undefined;
}

/**
 * Uvgenerator
 */
export interface UVGenerator {
	/**
	 */
	generateTopUV(
		geometry: ExtrudeGeometry,
		vertices: number[],
		indexA: number,
		indexB: number,
		indexC: number
	): Vector2[];

	/**
	 */
	generateSideWallUV(
		geometry: ExtrudeGeometry,
		vertices: number[],
		indexA: number,
		indexB: number,
		indexC: number,
		indexD: number
	): Vector2[];
}

/**
 * Creates extruded geometry from a path shape.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ExtrudeGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ExtrudeGeometry) page for a live demo.
 *
 * ### Examples
 * [webgl / geometry / extrude / shapes](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_extrude_shapes) |
 * [webgl / geometry / extrude / shapes2](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_extrude_shapes2) |
 * [webgl / geometry / shapes](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_shapes)
 *
 * ### Code Example
 * 
 * ```js
 * const length = 12, width = 8;
 * const shape = new THREE.Shape();
 * shape.moveTo( 0,0 );
 * shape.lineTo( 0, width );
 * shape.lineTo( length, width );
 * shape.lineTo( length, 0 );
 * shape.lineTo( 0, 0 );
 * const extrudeSettings = {
 * 	steps: 2,
 * 	depth: 16,
 * 	bevelEnabled: true,
 * 	bevelThickness: 1,
 * 	bevelSize: 1,
 * 	bevelOffset: 0,
 * 	bevelSegments: 1
 * };
 * const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const mesh = new THREE.Mesh( geometry, material ) ;
 * scene.add( mesh );
 * ```
 */
export interface ExtrudeGeometry extends BufferGeometry {
	/**
	 * This object extrudes a 2D shape to a 3D geometry.
	 * When creating a Mesh with this geometry, if you'd like to have a separate material used for its face and its extruded sides, you can use an array of materials. The first material will be applied to the face; the second material will be applied to the sides.
	 *
	 * @param shapes Shape or an array of shapes.
	 * @param options Object that can contain the following parameters.
	 */
	new (shapes?: Shape | Shape[], options?: ExtrudeGeometryOptions): this;

	/**
	 * @default 'ExtrudeGeometry'
	 */
	type: string;

	/**
	 */
	addShapeList(shapes: Shape[], options?: any): void;

	/**
	 */
	addShape(shape: Shape, options?: any): void;

	/**
	 */
	fromJSON(data: any): ExtrudeGeometry;
}

/**
 * A class for generating an icosahedron geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/IcosahedronGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/IcosahedronGeometry) page for a live demo.
 *
 * ### Examples
 * [misc / exporter / gltf](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_gltf) |
 * [physics / ammo / instancing](https://outmindkjg.github.io/ngx3js-doc/#/examples/physics_ammo_instancing) |
 * [webgl / buffergeometry / compression](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_compression) |
 * [webgl / geometries ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometries) |
 * [webgl / geometry / colors](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_colors)
 *
 */
export interface IcosahedronGeometry extends PolyhedronGeometry {
	/**
	 * @param radius Default is 1.
	 * @param detail Default is 0.  Setting this to a value greater than 0 adds more vertices making it no longer an icosahedron.  When detail is greater than 1, it's effectively a sphere.
	 */
	new (radius?: number, detail?: number): this;

	/**
	 * @default 'IcosahedronGeometry'
	 */
	type: string;

	/**
	 */
	fromJSON(data: any): IcosahedronGeometry;
}

/**
 * Creates meshes with axial symmetry like vases. The lathe rotates around the Y axis.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LatheGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/LatheGeometry) page for a live demo.
 *
 * ### Examples
 * [misc / exporter / gltf](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_gltf) |
 * [misc / uv / tests](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_uv_tests) |
 * [webgl / geometries ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometries)
 *
 * ### Code Example
 * 
 * ```js
 * const points = [];
 * for ( let i = 0; i < 10; i ++ ) {
 * 	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
 * }
 * const geometry = new THREE.LatheGeometry( points );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const lathe = new THREE.Mesh( geometry, material );
 * scene.add( lathe );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'LatheGeometry'" [points]="points"></ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [color]="'0xffff00'"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface LatheGeometry extends BufferGeometry {
	/**
	 * This creates a LatheGeometry based on the parameters.
	 * @param points Array of Vector2s. The x-coordinate of each point must be greater than zero. Default is an array with (0,0.5), (0.5,0) and (0,-0.5) which creates a simple diamond shape.
	 * @param segments The number of circumference segments to generate. Default is 12.
	 * @param phiStart The starting angle in radians. Default is 0.
	 * @param phiLength The radian (0 to 2PI) range of the lathed section 2PI is a closed lathe, less than 2PI is a portion. Default is 2PI.
	 */
	new (points?: Vector2[], segments?: number, phiStart?: number, phiLength?: number): this;

	/**
	 * @default 'LatheGeometry'
	 */
	type: string;

	/**
	 * An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
	 */
	parameters: {
		points: Vector2[];
		segments: number;
		phiStart: number;
		phiLength: number;
	};

	/**
	 */
	fromJSON(data: any): LatheGeometry;
}

/**
 * A class for generating an octahedron geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/OctahedronGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/OctahedronGeometry) page for a live demo.
 *
 * ### Examples
 * [misc / exporter / gltf](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_gltf) |
 * [misc / uv / tests](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_uv_tests) |
 * [webgl / geometries ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometries)
 *
 */
export interface OctahedronGeometry extends PolyhedronGeometry {
	/**
	 * @param radius Radius of the octahedron. Default is 1.
	 * @param detail Default is 0.  Setting this to a value greater than zero add vertices making it no longer an octahedron.
	 */
	new (radius?: number, detail?: number): this;

	/**
	 * @default 'OctahedronGeometry'
	 */
	type: string;

	/**
	 */
	fromJSON(data: any): OctahedronGeometry;
}

/**
 * A class for generating plane geometries.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PlaneGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/PlaneGeometry) page for a live demo.
 *
 * ### Examples
 * [css3d / orthographic ](https://outmindkjg.github.io/ngx3js-doc/#/examples/css3d_orthographic) |
 * [misc / exporter / draco](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_draco) |
 * [physics / ammo / cloth](https://outmindkjg.github.io/ngx3js-doc/#/examples/physics_ammo_cloth) |
 * [webaudio / visualizer ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webaudio_visualizer) |
 * [webgl / animation / skinning / additive / blending](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_animation_skinning_additive_blending)
 *
 * ### Code Example
 * 
 * ```js
 * const geometry = new THREE.PlaneGeometry( 1, 1 );
 * const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
 * const plane = new THREE.Mesh( geometry, material );
 * scene.add( plane );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'PlaneGeometry'" [width]="1" [height]="1"></ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [color]="'0xffff00'" [side]="'DoubleSide'"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface PlaneGeometry extends BufferGeometry {
	/**
	 * @param width Width along the X axis. Default is 1.
	 * @param height Height along the Y axis. Default is 1.
	 * @param widthSegments Optional. Default is 1.
	 * @param heightSegments Optional. Default is 1.
	 */
	new (width?: number, height?: number, widthSegments?: number, heightSegments?: number): this;

	/**
	 * @default 'PlaneGeometry'
	 */
	type: string;

	/**
	 * An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
	 */
	parameters: {
		width: number;
		height: number;
		widthSegments: number;
		heightSegments: number;
	};

	/**
	 */
	fromJSON(data: any): PlaneGeometry;
}

/**
 * A polyhedron is a solid in three dimensions with flat faces. This class will take an array of vertices, project them onto a sphere, and then divide them up to the desired level of detail. This class is used by [DodecahedronGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DodecahedronGeometry), [IcosahedronGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/IcosahedronGeometry), [OctahedronGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/OctahedronGeometry), and [TetrahedronGeometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TetrahedronGeometry) to generate their respective geometries.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PolyhedronGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/PolyhedronGeometry) page for a live demo.
 *
 * ### Code Example
 * 
 * ```js
 * const verticesOfCube = [
 * 	-1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
 * 	-1,-1, 1,    1,-1,  1,    1, 1, 1,    -1, 1, 1,
 * ];
 * const indicesOfFaces = [
 * 	2,1,0,    0,3,2,
 * 	0,4,7,    7,3,0,
 * 	0,1,5,    5,4,0,
 * 	1,2,6,    6,5,1,
 * 	2,3,7,    7,6,2,
 * 	4,5,6,    6,7,4
 * ];
 * const geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'PolyhedronGeometry'"></ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [color]="'0xffff00'" [side]="'DoubleSide'"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface PolyhedronGeometry extends BufferGeometry {
	/**
	 * @param vertices Array of points of the form [1,1,1, -1,-1,-1, ... ]
	 * @param indices Array of indices that make up the faces of the form [0,1,2, 2,3,0, ... ]
	 * @param radius The radius of the final shape
	 * @param detail How many levels to subdivide the geometry. The more detail, the smoother the shape.
	 */
	new (vertices?: number[], indices?: number[], radius?: number, detail?: number): this;

	/**
	 * @default 'PolyhedronGeometry'
	 */
	type: string;

	/**
	 * An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
	 */
	parameters: {
		vertices: number[];
		indices: number[];
		radius: number;
		detail: number;
	};

	/**
	 */
	fromJSON(data: any): PolyhedronGeometry;
}

/**
 * A class for generating a two-dimensional ring geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/RingGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/RingGeometry) page for a live demo.
 *
 * ### Examples
 * [misc / exporter / gltf](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_gltf) |
 * [webgl / geometries ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometries) |
 * [webxr / ar / hittest](https://outmindkjg.github.io/ngx3js-doc/#/examples/webxr_ar_hittest) |
 * [webxr / vr / ballshooter](https://outmindkjg.github.io/ngx3js-doc/#/examples/webxr_vr_ballshooter) |
 * [webxr / vr / cubes](https://outmindkjg.github.io/ngx3js-doc/#/examples/webxr_vr_cubes)
 *
 * ### Code Example
 * 
 * ```js
 * const geometry = new THREE.RingGeometry( 1, 5, 32 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
 * const mesh = new THREE.Mesh( geometry, material );
 * scene.add( mesh );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'RingGeometry'" [innerRadius]="1" [outerRadius]="5" [thetaSegments]="32"></ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [color]="'0xffff00'" [side]="'DoubleSide'"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface RingGeometry extends BufferGeometry {
	/**
	 * @param innerRadius Default is 0.5.
	 * @param outerRadius Default is 1.
	 * @param thetaSegments Number of segments.  A higher number means the ring will be more round.  Minimum is 3.  Default is 8.
	 * @param phiSegments Minimum is 1.  Default is 1.
	 * @param thetaStart Starting angle. Default is 0.
	 * @param thetaLength Central angle.  Default is Math.PI * 2.
	 */
	new (
		innerRadius?: number,
		outerRadius?: number,
		thetaSegments?: number,
		phiSegments?: number,
		thetaStart?: number,
		thetaLength?: number
	): this;

	/**
	 * @default 'RingGeometry'
	 */
	type: string;

	/**
	 * An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
	 */
	parameters: {
		innerRadius: number;
		outerRadius: number;
		thetaSegments: number;
		phiSegments: number;
		thetaStart: number;
		thetaLength: number;
	};

	/**
	 */
	fromJSON(data: any): RingGeometry;
}

/**
 * Creates an one-sided polygonal geometry from one or more path shapes.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/ShapeGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/ShapeGeometry) page for a live demo.
 *
 * ### Examples
 * [webgl / geometry / shapes](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_shapes) |
 * [webgl / geometry / text / shapes](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_text_shapes) |
 * [webgl / geometry / text / stroke](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_text_stroke) |
 * [webgl / loader / svg](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_svg)
 *
 * ### Code Example
 * 
 * ```js
 * const x = 0, y = 0;
 * const heartShape = new THREE.Shape();
 * heartShape.moveTo( x + 5, y + 5 );
 * heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
 * heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
 * heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
 * heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
 * heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
 * heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
 * const geometry = new THREE.ShapeGeometry( heartShape );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const mesh = new THREE.Mesh( geometry, material ) ;
 * scene.add( mesh );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'ShapeGeometry'"></ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [color]="'0xffff00'"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface ShapeGeometry extends BufferGeometry {
	/**
	 * @param shapes Array of shapes or a single [shape](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Shape). Default is a single triangle shape.
	 * @param curveSegments Number of segments per shape. Default is 12.
	 */
	new (shapes?: Shape | Shape[], curveSegments?: number): this;

	/**
	 * @default 'ShapShapeGeometryeBufferGeometry'
	 */
	type: string;

	/**
	 */
	fromJSON(data: any): ShapeGeometry;
}

/**
 * A class for generating sphere geometries.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SphereGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/SphereGeometry) page for a live demo.
 *
 * ### Examples
 * [css2d / label ](https://outmindkjg.github.io/ngx3js-doc/#/examples/css2d_label) |
 * [misc / controls / fly](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_controls_fly) |
 * [misc / exporter / gltf](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_gltf) |
 * [physics / ammo / break](https://outmindkjg.github.io/ngx3js-doc/#/examples/physics_ammo_break) |
 * [webgl / camera ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_camera)
 *
 * ### Code Example
 * 
 * ```js
 * const geometry = new THREE.SphereGeometry( 15, 32, 16 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const sphere = new THREE.Mesh( geometry, material );
 * scene.add( sphere );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'SphereGeometry'" [radius]="15" [widthSegments]="32" [heightSegments]="16"></ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [color]="'0xffff00'"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface SphereGeometry extends BufferGeometry {
	/**
	 * The geometry is created by sweeping and calculating vertexes around the Y axis (horizontal sweep) and the Z axis (vertical sweep). Thus, incomplete spheres (akin to <em>'sphere slices'</em>) can be created through the use of different values of phiStart, phiLength, thetaStart and thetaLength, in order to define the points in which we start (or end) calculating those vertices.
	 * @param radius sphere radius. Default is 1.
	 * @param widthSegments number of horizontal segments. Minimum value is 3, and the default is 32.
	 * @param heightSegments number of vertical segments. Minimum value is 2, and the default is 16.
	 * @param phiStart specify horizontal starting angle. Default is 0.
	 * @param phiLength specify horizontal sweep angle size. Default is Math.PI * 2.
	 * @param thetaStart specify vertical starting angle. Default is 0.
	 * @param thetaLength specify vertical sweep angle size. Default is Math.PI.
	 */
	new (
		radius?: number,
		widthSegments?: number,
		heightSegments?: number,
		phiStart?: number,
		phiLength?: number,
		thetaStart?: number,
		thetaLength?: number
	): this;

	/**
	 * @default 'SphereGeometry'
	 */
	type: string;

	/**
	 * An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
	 */
	parameters: {
		radius: number;
		widthSegments: number;
		heightSegments: number;
		phiStart: number;
		phiLength: number;
		thetaStart: number;
		thetaLength: number;
	};

	/**
	 */
	fromJSON(data: any): SphereGeometry;
}

/**
 * A class for generating a tetrahedron geometries.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TetrahedronGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/TetrahedronGeometry) page for a live demo.
 *
 * ### Examples
 * [misc / exporter / gltf](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_gltf) |
 * [webgl / geometries ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometries) |
 * [webgl / postprocessing / fxaa](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_fxaa) |
 * [webgl / postprocessing / pixel](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_pixel)
 *
 */
export interface TetrahedronGeometry extends PolyhedronGeometry {
	/**
	 * @param radius Radius of the tetrahedron. Default is 1.
	 * @param detail Default is 0. Setting this to a value greater than 0 adds vertices making it no longer a tetrahedron.
	 */
	new (radius?: number, detail?: number): this;

	/**
	 * @default 'TetrahedronGeometry'
	 */
	type: string;

	/**
	 */
	fromJSON(data: any): TetrahedronGeometry;
}

/**
 * A class for generating torus geometries.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TorusGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/TorusGeometry) page for a live demo.
 *
 * ### Examples
 * [misc / uv / tests](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_uv_tests) |
 * [webgl / geometries ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometries) |
 * [webgl / loader / texture / dds](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_texture_dds) |
 * [webgl / postprocessing / outline](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_postprocessing_outline) |
 * [webgl / read / float / buffer](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_read_float_buffer)
 *
 * ### Code Example
 * 
 * ```js
 * const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const torus = new THREE.Mesh( geometry, material );
 * scene.add( torus );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'TorusGeometry'" [radius]="10" [tube]="3" [radialSegments]="16" [tubularSegments]="100"></ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [color]="'0xffff00'"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface TorusGeometry extends BufferGeometry {
	/**
	 * @param radius Radius of the torus, from the center of the torus to the center of the tube. Default is 1.
	 * @param tube Radius of the tube.  Default is 0.4.
	 * @param radialSegments Default is 8
	 * @param tubularSegments Default is 6.
	 * @param arc Central angle.  Default is Math.PI * 2.
	 */
	new (radius?: number, tube?: number, radialSegments?: number, tubularSegments?: number, arc?: number): this;

	/**
	 * @default 'TorusGeometry'
	 */
	type: string;

	/**
	 * An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
	 */
	parameters: {
		radius: number;
		tube: number;
		radialSegments: number;
		tubularSegments: number;
		arc: number;
	};

	/**
	 */
	fromJSON(data: any): TorusGeometry;
}

/**
 * Creates a torus knot, the particular shape of which is defined by a pair of coprime integers, p and q. If p and q are not coprime, the result will be a torus link.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TorusKnotGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/TorusKnotGeometry) page for a live demo.
 *
 * ### Examples
 * [misc / exporter / draco](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_draco) |
 * [misc / exporter / gltf](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_exporter_gltf) |
 * [webgl / buffergeometry / compression](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_compression) |
 * [webgl / clipping / stencil](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_clipping_stencil) |
 * [webgl / clipping ](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_clipping)
 *
 * ### Code Example
 * 
 * ```js
 * const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const torusKnot = new THREE.Mesh( geometry, material );
 * scene.add( torusKnot );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'TorusKnotGeometry'" [radius]="10" [tube]="3" [tubularSegments]="100" [radialSegments]="16"></ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [color]="'0xffff00'"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface TorusKnotGeometry extends BufferGeometry {
	/**
	 * @param radius Radius of the torus. Default is 1.
	 * @param tube Radius of the tube. Default is 0.4.
	 * @param tubularSegments Default is 64.
	 * @param radialSegments Default is 8.
	 * @param p This value determines, how many times the geometry winds around its axis of rotational symmetry. Default is 2.
	 * @param q This value determines, how many times the geometry winds around a circle in the interior of the torus. Default is 3.
	 */
	new (radius?: number, tube?: number, tubularSegments?: number, radialSegments?: number, p?: number, q?: number): this;

	/**
	 * @default 'TorusKnotGeometry'
	 */
	type: string;

	/**
	 * An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
	 */
	parameters: {
		radius: number;
		tube: number;
		tubularSegments: number;
		radialSegments: number;
		p: number;
		q: number;
	};

	/**
	 */
	fromJSON(data: any): TorusKnotGeometry;
}

/**
 * Creates a tube that extrudes along a 3d curve.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TubeGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/TubeGeometry) page for a live demo.
 *
 * ### Examples
 * [webgl / geometries / parametric](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometries_parametric) |
 * [webgl / geometry / extrude / splines](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_extrude_splines)
 *
 * ### Code Example
 * 
 * ```js
 * class CustomSinCurve extends THREE.Curve {
 * 	constructor( scale = 1 ) {
 * 		super();
 * 		this.scale = scale;
 * 	}
 * 	getPoint( t, optionalTarget = new THREE.Vector3() ) {
 * 		const tx = t  * 3 -1.5;
 * 		const ty = Math.sin( 2 * Math.PI * t );
 * 		const tz = 0;
 * 		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
 * 	}
 * }
 * const path = new CustomSinCurve( 10 );
 * const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const mesh = new THREE.Mesh( geometry, material );
 * scene.add( mesh );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh>
 * 	<ngx3js-geometry [type]="'TorusKnotGeometry'" [radius]="10" [tube]="3" [tubularSegments]="100" [radialSegments]="16"></ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [color]="'0xffff00'"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface TubeGeometry extends BufferGeometry {
	/**
	 * @param path A 3D path that inherits from the [Curve](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Curve) base class. Default is a quadratic bezier curve.
	 * @param tubularSegments The number of segments that make up the tube. Default is *64*.
	 * @param radius The radius of the tube. Default is *1*.
	 * @param radialSegments The number of segments that make up the cross-section. Default is *8*.
	 * @param closed Is the tube open or closed. Default is *false*.
	 */
	new (
		path?: Curve<Vector3>,
		tubularSegments?: number,
		radius?: number,
		radiusSegments?: number,
		closed?: boolean
	): this;

	/**
	 * @default 'TubeGeometry'
	 */
	type: string;

	/**
	 * An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
	 */
	parameters: {
		path: Curve<Vector3>;
		tubularSegments: number;
		radius: number;
		radialSegments: number;
		closed: boolean;
	};

	/**
	 * An array of [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) tangents
	 */
	tangents: Vector3[];

	/**
	 * An array of [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) normals
	 */
	normals: Vector3[];

	/**
	 * An array of [Vector3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector3) binormals
	 */
	binormals: Vector3[];

	/**
	 */
	fromJSON(data: any): TubeGeometry;
}

/**
 * This can be used as a helper object to view a [geometry](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/BufferGeometry) as a wireframe.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WireframeGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/WireframeGeometry) page for a live demo.
 *
 * ### Examples
 * [helpers](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_helpers)
 * [webgl / buffergeometry / compression](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_buffergeometry_compression) |
 * [webgl / lines / fat / wireframe](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lines_fat_wireframe)
 *
 * ### Code Example
 * 
 * ```js
 * const geometry = new THREE.SphereGeometry( 100, 100, 100 );
 * const wireframe = new THREE.WireframeGeometry( geometry );
 * const line = new THREE.LineSegments( wireframe );
 * line.material.depthTest = false;
 * line.material.opacity = 0.25;
 * line.material.transparent = true;
 * scene.add( line );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-mesh [type]="'LineSegments'">
 * 	<ngx3js-geometry [type]="'WireframeGeometry'">
 * 		<ngx3js-geometry [type]="'SphereGeometry'" [width]="100" [height]="100" [depth]="100"></ngx3js-geometry>
 * 	</ngx3js-geometry>
 * 	<ngx3js-material [type]="'MeshBasicMaterial'" [opacity]="0.25" [transparent]="true" [depthTest]="false"></ngx3js-material>
 * </ngx3js-mesh>
 * ```
 */
export interface WireframeGeometry<TBufferGeometry extends BufferGeometry = BufferGeometry> extends BufferGeometry {
	/**
	 * @param geometry any geometry object.
	 */
	new (geometry?: TBufferGeometry): this;

	/**
	 * @default 'WireframeGeometry'
	 */
	type: string;

	/**
	 * An object with a property for each of the constructor parameters. Any modification after instantiation does not change the geometry.
	 */
	parameters: {
		geometry: TBufferGeometry;
	};
}
