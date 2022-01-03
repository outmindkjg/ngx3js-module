import {
	Component,
	ContentChildren,
	forwardRef,
	Input,
	OnDestroy,
	OnInit,
	QueryList,
	SimpleChanges
} from '@angular/core';
import { NgxCurveComponent } from '../curve/curve.component';
import { NgxCurveUtils } from '../curve/curveUtils';
import { NgxAbstractGeometryComponent } from '../geometry.abstract';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { NgxLocalStorageService } from '../local-storage.service';
import { IGeometriesParametric, INgxColor, INgxVector } from '../ngx-interface';
import { NgxShapeComponent } from '../shape/shape.component';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxSvgComponent } from '../svg/svg.component';
import * as NGX_GEOMETRY from './index';

/**
 * The Geometry component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/GeometryComponent) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry) page for a live demo.
 * See the [ngx font](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_font) page for a live font demo.
 * See the [ngx curve](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_curve) page for a live curve demo.
 *
 * A representation of mesh, line, or point geometry. Includes vertex positions, face indices, normals, colors, UVs, and custom attributes within buffers, reducing the cost of passing all this data to the GPU.
 * To read and edit data in BufferGeometry attributes, see [BufferAttribute](https://outmindkjg.github.io/ngx3js-doc/#/docs/api/en/core/BufferAttribute) documentation.
 *
 * |  Three Type        | Type Key           | Acceptable Input          |
 * |:--------------------------|:--------------------------|:--------------------------|
 * | BufferGeometry | BufferGeometry, Buffer | attribute, points, curve, curveSegments  |
 * | InstancedBufferGeometry | InstancedBufferGeometry, Instanced | instanceCount, instanced   |
 * | TeapotGeometry | TeapotGeometry, Teapot | size, segments, bottom, lid, body, fitLid, blinn  |
 * | PerlinGeometry | PerlinGeometry, Perlin | perlinType, width, height, depth, light, shadow  |
 * | NgxRopeGeometry | RopeGeometry, Rope | width, widthSegments  |
 * | NgxGridGeometry | GridGeometry, Grid | width, height, depth, widthSegments, heightSegments, color1, color2  |
 * | NgxCapsuleGeometry | CapsuleGeometry, Capsule | radius, radiusSegments, height, heightSegments, phiStart, phiLength  |
 * | LineGeometry | LineGeometry, Line | attrPosition, attrColor  |
 * | RoundedBoxGeometry | RoundedBoxGeometry, RoundedBox | width, height, depth, segments, radius  |
 * | BoxLineGeometry | BoxLineGeometry, BoxLine | width, height, depth, widthSegments, heightSegments, depthSegments  |
 * | BoxBufferGeometry | BoxBufferGeometry, BoxGeometry, Box | width, height, depth, widthSegments, heightSegments, depthSegments  |
 * | CircleBufferGeometry | CircleBufferGeometry, CircleGeometry, Circle | radius, segments, thetaStart, thetaLength  |
 * | NgxCircleDepthGeometry | CircleDepthGeometry, CircleDepth | radius, depth, segments, thetaStart, thetaLength, depthRate  |
 * | NgxStarGeometry | StarGeometry, Star | innerRadius, outerRadius, segments, thetaStart, thetaLength |
 * | NgxStarDepthGeometry | StarDepthGeometry, StarDepth | innerRadius, outerRadius, segments, thetaStart, thetaLength, depthRate |
 * | ConeBufferGeometry | ConeBufferGeometry, ConeGeometry, Cone | radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength |
 * | CylinderBufferGeometry | CylinderBufferGeometry, CylinderGeometry, Cylinder | radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength |
 * | DodecahedronBufferGeometry | DodecahedronBufferGeometry, DodecahedronGeometry, Dodecahedron | radius, detail |
 * | mergeBufferGeometries | mergeBufferGeometries, merge | geometries |
 * | ShapeBufferGeometry | ShapeBufferGeometry, ShapeGeometry, Shape | shapes, curveSegments |
 * | ExtrudeBufferGeometry | ExtrudeBufferGeometry, ExtrudeGeometry, Extrude | shapes, curveSegments, steps, depth, bevelEnabled, bevelThickness, bevelSize, bevelOffset, bevelSegments, extrudePath |
 * | IcosahedronBufferGeometry | IcosahedronBufferGeometry, IcosahedronGeometry, Icosahedron | radius, detail |
 * | LatheBufferGeometry | LatheBufferGeometry, LatheGeometry, Lathe | points , segments, phiStart, phiLength |
 * | OctahedronBufferGeometry | OctahedronBufferGeometry, OctahedronGeometry, Octahedron | radius, detail |
 * | ParametricGeometry | ParametricGeometry, Parametric | slices, stacks |
 * | ParametricGeometries.TorusKnotGeometry | ParametrictorusKnotGeometry, ParametrictorusKnot | radius, tube, radialSegments, tubularSegments, p, q |
 * | ParametricGeometries.SphereGeometry | ParametrictorusSphereGeometry, ParametrictorusSphere | radius, widthSegments, heightSegments |
 * | ParametricGeometries.TubeGeometry | ParametrictorusTubeGeometry, ParametrictorusTube | curve, tubularSegments, radius, radiusSegments, closed |
 * | PlaneBufferGeometry | PlaneBufferGeometry, PlaneGeometry, Plane | width, height, widthSegments, heightSegments |
 * | NgxPlaneDepthGeometry | PlaneDepthBufferGeometry, PlaneDepthGeometry, PlaneDepth | width, height, depth, widthSegments, heightSegments, depthRate |
 * | PolyhedronBufferGeometry | PolyhedronBufferGeometry, PolyhedronGeometry, Polyhedron | radius, detail |
 * | RingBufferGeometry | RingBufferGeometry, RingGeometry, Ring | innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength |
 * | NgxRingDepthGeometry | RingDepthGeometry, RingDepth | innerRadius, outerRadius, depth, thetaSegments, phiSegments, thetaStart, thetaLength, depthRate |
 * | SphereBufferGeometry | SphereBufferGeometry, SphereGeometry, Sphere | radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength |
 * | TetrahedronBufferGeometry | TetrahedronBufferGeometry, TetrahedronGeometry, Tetrahedron | radius, detail |
 * | TextBufferGeometry | TextBufferGeometry, TextGeometry, Text | text, font, size, height, curveSegments, bevelEnabled, bevelThickness, bevelSize, bevelOffset, bevelSegments |
 * | TorusBufferGeometry | TorusBufferGeometry, TorusGeometry, Torus | radius, tube, radialSegments, tubularSegments, arc |
 * | TorusKnotBufferGeometry | TorusKnotBufferGeometry, TorusKnotGeometry, TorusKnot | radius, tube, radialSegments, tubularSegments, p, q |
 * | TubeBufferGeometry | TubeBufferGeometry, TubeGeometry, Tube | curve, tubularSegments, radius, radiusSegments, closed |
 * | ConvexGeometry | ConvexGeometry, Convex | points |
 * | DecalGeometry | DecalGeometry, Decal | mesh, ... |
 * | RollerCoasterTreesGeometry | TreesGeometry, Trees | mesh, ... |
 * | RollerCoasterSkyGeometry | SkyGeometry, Sky |  |
 * | RollerCoasterGeometry | RollerCoasterGeometry, RollerCoaster |  |
 * | RollerCoasterLiftersGeometry | RollerCoasterLiftersGeometry, RollerCoasterLifters | curves, slices |
 * | RollerCoasterShadowGeometry | RollerCoasterShadowGeometry, RollerCoasterShadow | curves, slices |
 * | LightningStrike | LightningStrike, Lightning | rayParams |
 * 
 * ```html
 * <ngx3js-geometry
 * 	[type]="'BoxGeometry'" [width]="16" [height]="16" [depth]="16 "
 * 	[widthSegments]="3" [heightSegments]="3" [depthSegments]="3"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'IcosahedronGeometry'" [radius]="8" [detail]="1">
 * </ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'PlaneGeometry'" [width]="16" [height]="16 "
 * 	[widthSegments]="3" [heightSegments]="3">
 * </ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'SphereGeometry'" [radius]="0.4 "
 * 	[widthSegments]="14" [heightSegments]="10">
 * </ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'TextGeometry'" [font]="'helvetiker'" [align]="'center bottom'"
 * 	[text]="'test contents'" [size]="10">
 * </ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'TorusKnotGeometry'" [radius]="0.4" [tube]="0.08 "
 * 	[radialSegments]="95" [tubularSegments]="20"
 * >
 * </ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'TeapotGeometry'" [size]="400" [segments]="30"
 * 	[bottom]="true" [lid]="true" [body]="true" [fitLid]="true" [blinn]="true"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * [type]="'perlin'"
 * 	[perlinType]="'minecraft'"
 * 	[width]="100" [height]="100" [depth]="100"
 * 	[widthSegments]="128" [depthSegments]="128" [quality]="2"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'RopeGeometry'" [width]="4" [widthSegments]="10"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'RoundedBox'"
 * 	[width]="1" [height]="1" [depth]="1"
 * 	[segments]="7" [radius]="0.2"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'BoxLineGeometry'"
 * 	[width]="6" [height]="6" [depth]="6"
 * 	[widthSegments]="10" [heightSegments]="10" [depthSegments]="10"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'CircleGeometry'"
 * 	[radius]="50" [radialSegments]="20" [thetaStart]="0" [thetaLength]="360"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'star'"
 * 	[outerRadius]="1" [innerRadius]="0.5" [depth]="0.5" [depthRate]="0.5"
 * 	[thetaStart]="0" [thetaLength]="220"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'ConeGeometry'"
 * 	[radius]="0.2" [height]="0.2"
 * 	[radiusSegments]="64"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * 	#dodecahedron
 * 	[type]="'Dodecahedron'"
 * 	[radius]="10"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'mergebuffergeometry'"
 * 	[autoCustomColor]="true" [autoCustomColorKey]="'ca'" [autoCustomColorSize]="3"
 * 	[autoSize]="true" [autoSizeSize]="1"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'shape'"
 * 	[text]="'   Three.js\nSimple text.'" [font]="'helvetiker'"
 * 	[align]="'center'"
 * 	[weight]="'regular'" [size]="100"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'Extrude'"
 * 	[shapes]="shapes1" [steps]="100"
 * 	[bevelEnabled]="false" [extrudePath]="extrudePath" [closed]="true"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'Icosahedron'"
 * 	[radius]="75" [detail]="1"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'LatheGeometry'"
 * 	[points]="lathePoints" [segments]="20"
 * ></ngx3js-geometry>
 * <ngx3js-geometry
 * 	[type]="'Octahedron'"
 * 	[radius]="75" [detail]="2"
 * ></ngx3js-geometry>
 * ```
 *
 * @see THREE.BufferGeometry
 */
@Component({
	selector: 'ngx3js-geometry',
	templateUrl: './geometry.component.html',
	styleUrls: ['./geometry.component.scss'],
	providers: [
		{
			provide: NgxAbstractGeometryComponent,
			useExisting: forwardRef(() => NgxGeometryComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxGeometryComponent),
		},
	],
})
export class NgxGeometryComponent
	extends NgxAbstractGeometryComponent
	implements OnInit, OnDestroy
{
	/**
	 * The type  of geometry
	 *
	 * |   Three Type               | Value String(case insensitive) |
	 * |:--------------------------|--------------------------:|
	 * | THREE.BufferGeometry | BufferGeometry, CustomGeometry,  Custom, Buffer |
	 * | THREE.InstancedBufferGeometry | InstancedBufferGeometry, InstancedBuffer, Instanced, |
	 * | TeapotGeometry | TeapotGeometry, Teapot, |
	 * | PerlinGeometry | PerlinBufferGeometry, PerlinGeometry, Perlin, PerlinBuffer |
	 * | RopeGeometry | RopeBufferGeometry, RopeGeometry, Rope, RopeBuffer |
	 * | CapsuleGeometry | CapsuleGeometry, Capsule, |
	 * | LineGeometry | LineGeometry, Line, |
	 * | THREE.BoxGeometry | BoxGeometry, Box, |
	 * | THREE.CircleGeometry | CircleGeometry, Circle, |
	 * | THREE.ConeGeometry | ConeGeometry, Cone, |
	 * | THREE.CylinderGeometry | CylinderGeometry, Cylinder, |
	 * | THREE.DodecahedronGeometry | DodecahedronGeometry, Dodecahedron, |
	 * | MergeGeometry | mergebuffergeometries,  mergebuffergeometry, mergebuffer, merge |
	 * | THREE.ShapeGeometry | ShapeGeometry, Shape, |
	 * | THREE.IcosahedronGeometry | IcosahedronGeometry, Icosahedron, |
	 * | THREE.LatheGeometry | LatheGeometry, Lathe, |
	 * | THREE.OctahedronGeometry | OctahedronGeometry, Octahedron, |
	 * | THREE.ParametricBufferGeometry | ParametricBufferGeometry, ParametricBuffer, ParametricBuffer |
	 * | ParametricGeometries.TorusKnotGeometry | , |
	 * | ParametricGeometries.SphereGeometry | , |
	 * | ParametricGeometries.TubeGeometry | , |
	 * | THREE.ParametricGeometry | ParametricGeometry , Parametric, |
	 * | THREE.PlaneGeometry | PlaneGeometry, Plane, |
	 * | THREE.RingGeometry | RingGeometry, Ring, |
	 * | THREE.SphereGeometry | SphereGeometry, Sphere, |
	 * | THREE.TetrahedronGeometry | TetrahedronGeometry, Tetrahedron, |
	 * | THREE.TextBufferGeometry | TextBufferGeometry, TextGeometry, TextBuffer, Text |
	 * | THREE.TorusGeometry | TorusGeometry, Torus, |
	 * | THREE.TorusKnotGeometry | TorusKnotGeometry, TorusKnot |
	 * | THREE.TubeGeometry | TubeGeometry, Tube, |
	 * | ConvexGeometry | ConvexGeometry, Convex, |
	 * | DecalGeometry | DecalGeometry, Decal, |
	 */
	@Input() public type: string = 'sphere';

	/**
	 * The refer of geometry component
	 */
	@Input() public refer: any = null;

	/**
	 * The storageName of geometry component
	 */
	@Input() public storageName: string = null;

	/**
	 * The storage2Buffer of geometry component
	 */
	@Input() public storage2Buffer: boolean = false;

	/**
	 * The Input of geometry component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public perlinType: string = 'minecraft';

	/**
	 * The light of geometry component
	 */
	@Input() public light: string | number = null;

	/**
	 * The shadow of geometry component
	 */
	@Input() public shadow: string | number = null;

	/**
	 * Radius of the circle/cone/dodecahedron/sphere..., default = 1.
	 */
	@Input() public radius: number = null;

	/**
	 * Number of segmented faces around the circumference of the cone/cylinder/torus/tube. Default is 8
	 */
	@Input() public radiusSegments: number = null;

	/**
	 * Number of segmented faces around the circumference of the cone/cylinder/torus/tube. Default is 8
	 */
	@Input() public radialSegments: number = null;

	/**
	 * Width; that is, the length of the edges parallel to the X axis. Optional; defaults to 1.
	 */
	@Input() public width: number = null;

	/**
	 * Number of segmented rectangular faces along the width of the sides. Optional; defaults to 1.
	 */
	@Input() public widthSegments: number = null;

	/**
	 * Height; that is, the length of the edges parallel to the Y axis. Optional; defaults to 1.
	 */
	@Input() public height: number = null;

	/**
	 * Number of segmented rectangular faces along the height of the sides. Optional; defaults to 1.
	 */
	@Input() public heightSegments: number = null;

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() public depth: number = null;

	/**
	 * Number of segmented rectangular faces along the depth of the sides. Optional; defaults to 1.
	 */
	@Input() public depthSegments: number = null;

	/**
	 * The Sharpen Rate of Depth
	 */
	@Input() public depthRate: number = null;

	/**
	 * The quality of geometry component
	 */
	@Input() public quality: number = null;

	/**
	 * Start angle for first segment, default = 0 (three o'clock position).
	 */
	@Input() public thetaStart: number = null;

	/**
	 * The central angle, often called theta, of the circular sector. The default is 360, which makes for a complete circle.
	 */
	@Input() public thetaLength: number = null;

	/**
	 * Number of segments.  A higher number means the ring will be more round.  Minimum is 3.  Default is 8.
	 */
	@Input() public thetaSegments: number = null;

	/**
	 * Radius of the cylinder at the top. Default is 1.
	 */
	@Input() public radiusTop: number = null;

	/**
	 * Radius of the cylinder at the bottom. Default is 1.
	 */
	@Input() public radiusBottom: number = null;

	/**
	 * Default is 0.  Setting this to a value greater than 0 adds more vertices making it no longer an icosahedron.  When detail is greater than 1, it's effectively a sphere
	 */
	@Input() public detail: number = null;

	/**
	 * Default is 0.5.
	 */
	@Input() public innerRadius: number = null;

	/**
	 * Default is 1.
	 */
	@Input() public outerRadius: number = null;

	/**
	 * A Boolean indicating whether the base of the cone is open or capped. Default is false, meaning capped.
	 */
	@Input() public openEnded: boolean = null;

	/**
	 * the starting angle in radians. Default is 0.
	 */
	@Input() public phiStart: number = null;

	/**
	 * the radian (0 to 2PI : 0 to 360) range of the lathed section 2PI(360) is a closed lathe, less than 2PI is a portion. Default is 2PI.
	 */
	@Input() public phiLength: number = null;

	/**
	 * the number of circumference segments to generate. Default is 12.
	 */
	@Input() public segments: number = null;

	/**
	 * Minimum is 1.  Default is 1.
	 */
	@Input() public phiSegments: number = null;

	/**
	 * The tube of geometry component
	 */
	@Input() public tube: number = null;

	/**
	 * Radius of the tube.  Default is 0.4.
	 */
	@Input() public tubularSegments: number = null;

	/**
	 * Central angle.  Default is Math.PI * 2.
	 */
	@Input() public arc: number = null;

	/**
	 * This value determines, how many times the geometry winds around its axis of rotational symmetry. Default is 2.
	 */
	@Input() public p: number = null;

	/**
	 * This value determines, how many times the geometry winds around a circle in the interior of the torus. Default is 3.
	 */
	@Input() public q: number = null;

	/**
	 * Grid Color axis X
	 */
	@Input() public color1: INgxColor = null;

	/**
	 * Grid Color axis Y
	 */
	@Input() public color2: INgxColor = null;

	/**
	 * The points of geometry component
	 */
	@Input() public points: INgxVector[] = null;

	/**
	 * The shapes of geometry component
	 */
	@Input() public shapes: INgxVector[] | I3JS.Shape = null;

	/**
	 * The extrudePath of geometry component
	 */
	@Input() public extrudePath: INgxVector[] = null;

	/**
	 * The Input of geometry component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public extrudePathType: string = null;

	/**
	 * The curvePath of geometry component
	 */
	@Input() public curvePath: INgxVector[] = null;

	/**
	 * The Input of geometry component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public curvePathType: string = null;

	/**
	 * The Input of geometry component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public curveType: string = null;

	/**
	 * The addGroup of geometry component
	 */
	@Input() public addGroup: boolean = null;

	/**
	 * The bottom of geometry component
	 */
	@Input() public bottom: boolean = null;

	/**
	 * The lid of geometry component
	 */
	@Input() public lid: boolean = null;

	/**
	 * The body of geometry component
	 */
	@Input() public body: boolean = null;

	/**
	 * The fitLid of geometry component
	 */
	@Input() public fitLid: boolean = null;

	/**
	 * The blinn of geometry component
	 */
	@Input() public blinn: boolean = null;

	/**
	 * The Input of geometry component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public uVGenerator: string = null;

	/**
	 * The pointsGeometry of geometry component
	 */
	@Input() public pointsGeometry: NgxGeometryComponent = null;

	/**
	 * The Input of geometry component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public parametric: string | IGeometriesParametric | any = null;

	/**
	 * The slices of geometry component
	 */
	@Input() public slices: number = null;

	/**
	 * The stacks of geometry component
	 */
	@Input() public stacks: number = null;

	/**
	 * The text of geometry component
	 */
	@Input() public text: string = null;

	/**
	 * The font of geometry component
	 */
	@Input() public font: string = null;

	/**
	 * The size of geometry component
	 */
	@Input() public size: number = null;

	/**
	 * The weight of geometry component
	 */
	@Input() public weight: string = null;

	/**
	 * The polyVertices of geometry component
	 */
	@Input() public polyVertices: number[] = null;

	/**
	 * The polyIndices of geometry component
	 */
	@Input() public polyIndices: number[] = null;

	/**
	 * The curveSegments of geometry component
	 */
	@Input() public curveSegments: number = null;

	/**
	 * The tension of geometry component
	 */
	@Input() public tension: number = null;

	/**
	 * The steps of geometry component
	 */
	@Input() public steps: number = null;

	/**
	 * The bevelEnabled of geometry component
	 */
	@Input() public bevelEnabled: boolean = null;

	/**
	 * The bevelThickness of geometry component
	 */
	@Input() public bevelThickness: number = null;

	/**
	 * The bevelSize of geometry component
	 */
	@Input() public bevelSize: number = null;

	/**
	 * The bevelOffset of geometry component
	 */
	@Input() public bevelOffset: number = null;

	/**
	 * The bevelSegments of geometry component
	 */
	@Input() public bevelSegments: number = null;

	/**
	 * The closed of geometry component
	 */
	@Input() public closed: boolean = null;

	/**
	 * The instanceCount of geometry component
	 */
	@Input() public instanceCount: number = null;

	/**
	 * The mesh of geometry component
	 */
	@Input() public mesh: I3JS.Mesh | any = null;

	/**
	 * The positionX of geometry component
	 */
	@Input() public positionX: number = null;

	/**
	 * The positionY of geometry component
	 */
	@Input() public positionY: number = null;

	/**
	 * The positionZ of geometry component
	 */
	@Input() public positionZ: number = null;

	/**
	 * The orientationX of geometry component
	 */
	@Input() public orientationX: number = null;

	/**
	 * The orientationY of geometry component
	 */
	@Input() public orientationY: number = null;

	/**
	 * The orientationZ of geometry component
	 */
	@Input() public orientationZ: number = null;

	/**
	 * The sizeX of geometry component
	 */
	@Input() public sizeX: number = null;

	/**
	 * The sizeY of geometry component
	 */
	@Input() public sizeY: number = null;

	/**
	 * The sizeZ of geometry component
	 */
	@Input() public sizeZ: number = null;

	/**
	 * The curve of geometry component
	 */
	@Input() public curve: string | I3JS.Curve<I3JS.Vector3> = null;

	/**
	 * The curveOption of geometry component
	 */
	@Input() public curveOption: any = null;

	/**
	 * The curveOption of geometry component
	 */
	 @Input() public curveScale: number = null;
	 

	/**
	 * The curveNormal of geometry component
	 */
	@Input() public curveNormal: boolean = null;

	/**
	 * The curveNormalOption of geometry component
	 */
	@Input() public curveNormalOption: string = null;

	/**
	 * The refGeometry of geometry component
	 */
	@Input() public refGeometry: any = null;

	/**
	 * The Input of geometry component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public refType: string = 'targetMesh';

	/**
	 * The rayParams of geometry component
	 */
	@Input() public rayParams: I3JS.RayParameters = {};

	/**
	 * Content children of geometry component
	 */
	@ContentChildren(NgxGeometryComponent, { descendants: false }) private geometryList: QueryList<NgxGeometryComponent>;

	/**
	 * Content children of geometry component
	 */
	@ContentChildren(NgxShapeComponent, { descendants: false }) private shapeList: QueryList<NgxShapeComponent>;

	/**
	 * Content children of geometry component
	 */
	@ContentChildren(NgxCurveComponent, { descendants: false }) private curveList: QueryList<NgxCurveComponent>;

	/**
	 * Content children of geometry component
	 */
	@ContentChildren(NgxSvgComponent, { descendants: false }) private svgList: QueryList<NgxSvgComponent>;

	/**
	 * Creates an instance of geometry component.
	 * @param localStorageService
	 */
	constructor(private localStorageService: NgxLocalStorageService) {
		super();
	}

	/**
	 * Gets font
	 * @param [def]
	 * @param [callBack]
	 */
	private getFont(def?: string, callBack?: (font: I3JS.Font) => void) {
		const font = NgxThreeUtil.getTypeSafe(this.font, def, 'helvetiker');
		const weight = NgxThreeUtil.getTypeSafe(this.weight, '');
		this.localStorageService.getFont(callBack, font, weight);
	}

	/**
	 * Gets points v3
	 * @param def
	 * @returns points v3
	 */
	private getPointsV3(
		def: { x: number; y: number; z: number }[]
	): I3JS.Vector3[] {
		const points: I3JS.Vector3[] = [];
		if (this.pointsGeometry !== null) {
			let pointsGeometry = this.pointsGeometry.getGeometry().clone();
			pointsGeometry.deleteAttribute('normal');
			pointsGeometry.deleteAttribute('uv');
			pointsGeometry = N3JS.GeometryUtils.mergeVertices(pointsGeometry);
			const positionAttribute = pointsGeometry.getAttribute('position');
			for (let i = 0; i < positionAttribute.count; i++) {
				const vertex = new N3JS.Vector3();
				vertex.fromBufferAttribute(positionAttribute, i);
				points.push(vertex);
			}
		} else if (NgxThreeUtil.isNotNull(this.text)) {
			points.push(new N3JS.Vector3(0, 0, 0));
			points.push(new N3JS.Vector3(0, 0, 0));
			this.getFont('helvetiker', (font: I3JS.Font) => {
				const shapes = font.generateShapes(
					NgxThreeUtil.getTypeSafe(this.text, 'test'),
					NgxThreeUtil.getTypeSafe(this.size, 1)
				);
				const points: I3JS.Vector2[] = [];
				shapes.forEach((shape) => {
					shape.getPoints().forEach((p) => {
						points.push(p);
					});
					if (shape.holes && shape.holes.length > 0) {
						shape.holes.forEach((hole) => {
							hole.getPoints().forEach((p) => {
								points.push(p);
							});
						});
					}
				});
				if (this.geometry !== null) {
					this.geometry.setFromPoints(points);
					this.applyChanges(['align']);
				}
			});
		} else {
			(this.points === null ? def : this.points).forEach((p) => {
				points.push(new N3JS.Vector3(p.x, p.y, p.z));
			});
		}
		return points;
	}

	/**
	 * Gets points v2
	 * @param [def]
	 * @returns points v2
	 */
	private getPointsV2(def?: INgxVector[]): I3JS.Vector2[] {
		const points: I3JS.Vector2[] = [];
		(this.points === null ? def : this.points).forEach((p) => {
			points.push(new N3JS.Vector2(p.x, p.y));
		});
		return points;
	}

	/**
	 * Gets parametric
	 * @param def
	 * @returns parametric
	 */
	private getParametric(
		def: string | IGeometriesParametric
	): (u: number, v: number, dest: I3JS.Vector3) => void {
		const parametric = this.parametric === null ? def : this.parametric;
		switch (parametric) {
			case 'mobius3d':
				return N3JS.ParametricGeometries.mobius3d;
			case 'klein':
				return N3JS.ParametricGeometries.klein;
			case 'plane':
				return N3JS.ParametricGeometries.plane(
					NgxThreeUtil.getTypeSafe(this.width, this.height, 10),
					NgxThreeUtil.getTypeSafe(this.height, this.width, 10)
				);
			case 'mobius':
				return N3JS.ParametricGeometries.mobius;
			default:
				if (parametric !== null) {
					if (typeof parametric === 'function') {
						return (u: number, v: number, dest: I3JS.Vector3) => {
							const ov = parametric(u, v, dest);
							if (ov !== null && ov !== undefined) {
								dest.set(ov.x, ov.y, ov.z);
							}
						};
					} else if (typeof parametric.getPoint === 'function') {
						return (u: number, v: number, dest: I3JS.Vector3) => {
							const ov = parametric.getPoint(u, v, dest);
							if (ov !== null && ov !== undefined) {
								dest.set(ov.x, ov.y, ov.z);
							}
						};
					}
				}
		}
		return N3JS.ParametricGeometries.klein;
	}

	/**
	 * Gets poly vertices
	 * @param [def]
	 * @returns poly vertices
	 */
	private getPolyVertices(def?: number[]): number[] {
		const vertices: number[] = [];
		(this.polyVertices === null ? def : this.polyVertices).forEach((p) => {
			vertices.push(p);
		});
		return vertices;
	}

	/**
	 * Gets poly indices
	 * @param [def]
	 * @returns poly indices
	 */
	private getPolyIndices(def?: number[]): number[] {
		const indices: number[] = [];
		(this.polyIndices === null ? def : this.polyIndices).forEach((p) => {
			indices.push(p);
		});
		return indices;
	}

	/**
	 * Gets shapes
	 * @param onload
	 */
	private getShapes(onload: (data: I3JS.Shape[] | I3JS.Shape) => void): void {
		if (NgxThreeUtil.isNotNull(this.svgList) && this.svgList.length > 0) {
			window.setTimeout(() => {
				this.svgList.forEach((svg) => {
					svg.getShapes((shapes) => {
						onload(shapes);
					});
				});
			}, 1);
		} else if (NgxThreeUtil.isNotNull(this.shapes)) {
			if (this.shapes instanceof N3JS.Shape) {
				window.setTimeout(() => {
					onload(this.shapes as N3JS.Shape);
				}, 1);
			} else {
				const shapes: I3JS.Shape[] = [];
				const shape = new N3JS.Shape();
				const vectors: I3JS.Vector2[] = [];
				this.shapes.forEach((p) => {
					vectors.push(new N3JS.Vector2(p.x, p.y));
				});
				shape.setFromPoints(vectors);
				shapes.push(shape);
				window.setTimeout(() => {
					onload(shapes);
				}, 1);
			}
		} else if (NgxThreeUtil.isNotNull(this.text)) {
			this.getFont('helvetiker', (font: I3JS.Font) => {
				const shapes = font.generateShapes(
					NgxThreeUtil.getTypeSafe(this.text, 'test'),
					NgxThreeUtil.getTypeSafe(this.size, 1)
				);
				onload(shapes);
			});
		} else {
			const shapes: I3JS.Shape[] = [];
			if (this.shapeList !== null && this.shapeList.length > 0) {
				const shape = new N3JS.Shape();
				this.shapeList.forEach((path) => {
					path.getShape(shape);
				});
				shapes.push(shape);
			}
			window.setTimeout(() => {
				onload(shapes);
			}, 1);
		}
	}

	/**
	 * Gets extrude path
	 * @returns extrude path
	 */
	private getExtrudePath(): I3JS.Curve<I3JS.Vector3> {
		if (
			NgxThreeUtil.isNotNull(this.extrudePath) ||
			NgxThreeUtil.isNotNull(this.curvePath)
		) {
			const vectors: I3JS.Vector3[] = [];
			if (NgxThreeUtil.isNotNull(this.extrudePath)) {
				this.extrudePath.forEach((p) => {
					vectors.push(new N3JS.Vector3(p.x, p.y, p.z));
				});
			}
			if (NgxThreeUtil.isNotNull(this.curvePath)) {
				this.curvePath.forEach((p) => {
					vectors.push(new N3JS.Vector3(p.x, p.y, p.z));
				});
			}
			switch (
				NgxThreeUtil.getTypeSafe(
					this.extrudePathType,
					this.curvePathType,
					'catmullromcurve3'
				).toLowerCase()
			) {
				case 'catmullromcurve3':
				default:
					return new N3JS.CatmullRomCurve3(
						vectors,
						NgxThreeUtil.getTypeSafe(this.closed, false),
						NgxThreeUtil.getTypeSafe(this.curveType, 'catmullrom'),
						NgxThreeUtil.getTypeSafe(this.tension, 0.5)
					);
			}
		}
		return undefined;
	}

	/**
	 * Gets uvgenerator
	 * @param [def]
	 * @returns uvgenerator
	 */
	private getUVGenerator(def?: string): I3JS.UVGenerator {
		const uVGenerator = NgxThreeUtil.getTypeSafe(this.uVGenerator, def, '');
		switch (uVGenerator.toLowerCase()) {
			case 'world':
				// return THREE.WorldUVGenerator;
				break;
		}
		return undefined;
	}

	/**
	 * Gets curve
	 * @param [def]
	 * @returns curve
	 */
	private getCurve(def?: string): I3JS.Curve<I3JS.Vector3> {
		const curve = NgxThreeUtil.getTypeSafe(this.curve, def, '');
		let curveLine: I3JS.Curve<I3JS.Vector3> = null;
		if (NgxThreeUtil.isNotNull(curve) && curve !== '') {
			if (typeof curve === 'string') {
				curveLine = NgxCurveUtils.getCurve(
					curve,
					NgxThreeUtil.getTypeSafe(this.curveScale, 1),
					this.curveOption
				);
			} else {
				curveLine = curve;
			}
		}
		if (curveLine === null) {
			if (this.curveList !== null && this.curveList.length > 0) {
				curveLine =
					this.curveList.first.getCurve() as I3JS.Curve<I3JS.Vector3>;
			} else {
				const extrudePath = this.getExtrudePath();
				if (NgxThreeUtil.isNotNull(extrudePath)) {
					curveLine = extrudePath;
				}
			}
		}
		if (curveLine !== null) {
			if (NgxThreeUtil.isNotNull(this.curveNormal) && this.curveNormal) {
				return NgxCurveUtils.getCurveNormal(curveLine, {
					options: this.curveNormalOption,
				});
			} else {
				return curveLine;
			}
		} else {
			return new N3JS.LineCurve3(
				new N3JS.Vector3(0, 0, 0),
				new N3JS.Vector3(0, 0, 0)
			);
		}
	}

	/**
	 * Gets mesh
	 * @param [def]
	 * @returns mesh
	 */
	private getMesh(def?: I3JS.Mesh | any): I3JS.Mesh {
		let value = NgxThreeUtil.getTypeSafe(this.mesh, def);
		let mesh: I3JS.Object3D = null;
		if (NgxThreeUtil.isNotNull(value)) {
			mesh = NgxThreeUtil.getObject3d(value);
			while (mesh instanceof N3JS.Group) {
				mesh = mesh.children[0];
			}
			if (mesh instanceof N3JS.Mesh) {
				return mesh;
			} else if (
				mesh.children.length > 0 &&
				mesh.children[0] instanceof N3JS.Mesh
			) {
				return mesh.children[0] as I3JS.Mesh;
			}
		}
		return null;
	}

	/**
	 * Gets position v3
	 * @param [def]
	 * @returns position v3
	 */
	private getPositionV3(def?: I3JS.Vector3): I3JS.Vector3 {
		return NgxThreeUtil.getVector3Safe(
			this.positionX,
			this.positionY,
			this.positionZ,
			def
		);
	}

	/**
	 * Gets orientation
	 * @param [def]
	 * @returns orientation
	 */
	private getOrientation(def?: I3JS.Euler): I3JS.Euler {
		return NgxThreeUtil.getEulerSafe(
			this.orientationX,
			this.orientationY,
			this.orientationZ,
			def
		);
	}

	/**
	 * Gets size v3
	 * @param [def]
	 * @returns size v3
	 */
	private getSizeV3(def?: I3JS.Vector3): I3JS.Vector3 {
		return NgxThreeUtil.getVector3Safe(this.sizeX, this.sizeY, this.sizeZ, def);
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('geometry');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
		if (changes && this.geometry) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(
			this.geometryList,
			'geometryList',
			'geometry'
		);
		this.subscribeListQueryChange(this.shapeList, 'shapeList', 'shape');
		this.subscribeListQueryChange(this.curveList, 'curveList', 'curve');
		this.subscribeListQueryChange(this.svgList, 'svgList', 'svg');
		super.ngAfterContentInit();
	}

	/**
	 * Perlin geometry of geometry component
	 */
	private perlinGeometry: NGX_GEOMETRY.NgxPlanePerlinGeometry = null;

	/**
	 * Gets perlin geometry
	 * @returns perlin geometry
	 */
	private getPerlinGeometry(): NGX_GEOMETRY.NgxPlanePerlinGeometry {
		if (this.perlinGeometry === null) {
			this.perlinGeometry = new NGX_GEOMETRY.NgxPlanePerlinGeometry(
				NgxThreeUtil.getTypeSafe(this.widthSegments, this.segments, 128),
				NgxThreeUtil.getTypeSafe(this.depthSegments, this.segments, 128),
				NgxThreeUtil.getTypeSafe(this.quality, 2)
			);
		}
		return this.perlinGeometry;
	}

	/**
	 * Gets geometry
	 * @template T
	 * @returns geometry
	 */
	public getGeometry<T extends I3JS.BufferGeometry>(): T {
		if (this.geometry === null || this._needUpdate) {
			this.needUpdate = false;
			let geometry: I3JS.BufferGeometry = null;
			this.unSubscribeRefer('refGeometry');
			if (this.refer !== null && this.refer !== undefined) {
				geometry = NgxThreeUtil.getGeometry(this.refer);
				this.subscribeRefer(
					'refGeometry',
					NgxThreeUtil.getSubscribe(
						this.refer,
						() => {
							this.needUpdate = true;
						},
						'geometry'
					)
				);
			} else if (NgxThreeUtil.isNotNull(this.storageName)) {
				geometry = new N3JS.BufferGeometry();
				this.localStorageService.getGeometry(
					this.storageName,
					(loadGeometry, model: I3JS.Object3D) => {
						if (model !== null && this.storage2Buffer) {
							let count = 0;
							model.traverse((child: I3JS.Object3D) => {
								if (child instanceof N3JS.Mesh && child.isMesh) {
									const buffer = child.geometry.attributes['position'];
									count += buffer.array.length;
								}
							});
							const combined = new Float32Array(count);
							let offset = 0;
							model.traverse((child: I3JS.Object3D) => {
								if (child instanceof N3JS.Mesh && child.isMesh) {
									const buffer = child.geometry.attributes['position'];
									combined.set(buffer.array, offset);
									offset += buffer.array.length;
								}
							});
							const positions = new N3JS.BufferAttribute(combined, 3);
							const loadGeometry = new N3JS.BufferGeometry();
							loadGeometry.setAttribute('position', positions.clone());
							this.setGeometry(loadGeometry);
						} else {
							this.setGeometry(loadGeometry);
						}
						this.setSubscribeNext(['loaded']);
					}
				);
			}
			if (geometry === null) {
				switch (this.type.toLowerCase()) {
					case 'buffergeometry':
					case 'customgeometry':
					case 'custom':
					case 'geometry':
					case 'buffer':
						geometry = new N3JS.BufferGeometry();
						const attributes = this.getAttributes();
						if (NgxThreeUtil.isNotNull(attributes) && attributes.length > 0) {
							attributes.forEach((attribute) => {
								switch (attribute.key.toLowerCase()) {
									case 'index':
										geometry.setIndex(attribute.value);
										if (this.addGroup) {
											geometry.addGroup(0, attribute.value.count);
										}
										attribute.value.needsUpdate = true;
										break;
									default:
										geometry.setAttribute(attribute.key, attribute.value);
										// attribute.value.needsUpdate = true;
										break;
								}
							});
						} else {
							const points = this.getPointsV3([]);
							if (NgxThreeUtil.isNotNull(points) && points.length > 0) {
								geometry.setFromPoints(points);
							} else {
								const curve = this.getCurve();
								const curveSegments = NgxThreeUtil.getTypeSafe(
									this.curveSegments,
									this.segments,
									10
								);
								geometry.setAttribute(
									'position',
									new N3JS.BufferAttribute(
										new Float32Array(curveSegments * 3),
										3
									)
								);
								const position = geometry.attributes.position;
								const point = new N3JS.Vector3();
								for (let i = 0; i < curveSegments; i++) {
									const t = i / (curveSegments - 1);
									curve.getPoint(t, point);
									position.setXYZ(i, point.x, point.y, point.z);
								}
								position.needsUpdate = true;
							}
						}
						break;
					case 'instancedbuffergeometry':
					case 'instancedbuffer':
					case 'instanced':
						const instancedBufferGeometry = new N3JS.InstancedBufferGeometry();
						if (NgxThreeUtil.isNotNull(this.instanceCount)) {
							instancedBufferGeometry.instanceCount = NgxThreeUtil.getTypeSafe(
								this.instanceCount,
								Infinity
							);
						}
						const instancedAttributes = this.getAttributes('instanced');
						if (
							NgxThreeUtil.isNotNull(instancedAttributes) &&
							instancedAttributes.length > 0
						) {
							instancedAttributes.forEach((attribute) => {
								switch (attribute.key.toLowerCase()) {
									case 'index':
										instancedBufferGeometry.setIndex(attribute.value);
										attribute.value.needsUpdate = true;
										break;
									default:
										instancedBufferGeometry.setAttribute(
											attribute.key,
											attribute.value
										);
										attribute.value.needsUpdate = true;
										break;
								}
							});
						}
						geometry = instancedBufferGeometry;
						break;
					case 'teapotbuffergeometry':
					case 'teapotgeometry':
					case 'teapotbuffer':
					case 'teapot':
						const teapot = new N3JS.TeapotGeometry(
							NgxThreeUtil.getTypeSafe(this.size, this.radius),
							NgxThreeUtil.getTypeSafe(this.segments, this.radiusSegments),
							NgxThreeUtil.getTypeSafe(this.bottom),
							NgxThreeUtil.getTypeSafe(this.lid),
							NgxThreeUtil.getTypeSafe(this.body),
							NgxThreeUtil.getTypeSafe(this.fitLid),
							NgxThreeUtil.getTypeSafe(this.blinn)
						);
						geometry = teapot;
						break;
					case 'perlinbuffergeometry':
					case 'perlingeometry':
					case 'perlinbuffer':
					case 'perlin':
						const planePerlin = this.getPerlinGeometry();
						switch (this.perlinType.toLowerCase()) {
							case 'minecraftao':
							case 'minecraft_ao':
								geometry = planePerlin.getMinecraftAo(
									NgxThreeUtil.getTypeSafe(this.width, this.height, 100),
									NgxThreeUtil.getTypeSafe(this.height, this.width, 100),
									NgxThreeUtil.getTypeSafe(this.depth, this.width, 100),
									NgxThreeUtil.getColorSafe(this.light, 0xffffff),
									NgxThreeUtil.getColorSafe(this.shadow)
								);
								break;
							case 'terrain':
								geometry = planePerlin.getTerrain(
									NgxThreeUtil.getTypeSafe(this.width, this.height, 100),
									NgxThreeUtil.getTypeSafe(this.height, this.width, 100),
									NgxThreeUtil.getTypeSafe(this.depth, this.width, 100)
								);
								break;
							case 'minecraft':
							default:
								geometry = planePerlin.getMinecraft(
									NgxThreeUtil.getTypeSafe(this.width, this.height, 100),
									NgxThreeUtil.getTypeSafe(this.height, this.width, 100),
									NgxThreeUtil.getTypeSafe(this.depth, this.width, 100)
								);
								break;
						}
						break;
					case 'ropebuffergeometry':
					case 'ropegeometry':
					case 'ropebuffer':
					case 'rope':
						const ropeGeometry = new NGX_GEOMETRY.NgxRopeGeometry(
							NgxThreeUtil.getTypeSafe(this.width, this.height, 1),
							NgxThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1)
						);
						geometry = ropeGeometry;
						break;
					case 'gridbuffergeometry':
					case 'gridgeometry':
					case 'gridbuffer':
					case 'grid':
						const gridGeometry = new NGX_GEOMETRY.NgxGridGeometry(
							NgxThreeUtil.getTypeSafe(this.width, this.height, 1),
							NgxThreeUtil.getTypeSafe(this.height, this.width, 1),
							NgxThreeUtil.getTypeSafe(this.depth, 0),
							NgxThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1),
							NgxThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
							NgxThreeUtil.getColorSafe(this.color1, 0x444444),
							NgxThreeUtil.getColorSafe(this.color2, 0x888888)
						);
						geometry = gridGeometry;
						break;
					case 'capsulebuffergeometry':
					case 'capsulegeometry':
					case 'capsulebuffer':
					case 'capsule':
						const capsuleGeometry = new NGX_GEOMETRY.NgxCapsuleGeometry(
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(
								this.radiusSegments,
								this.radialSegments,
								this.segments
							),
							NgxThreeUtil.getTypeSafe(this.height, this.width, 10),
							NgxThreeUtil.getTypeSafe(this.heightSegments, this.segments, 3),
							NgxThreeUtil.getAngleSafe(this.phiStart, 0),
							NgxThreeUtil.getAngleSafe(this.phiLength, 360)
						);
						geometry = capsuleGeometry;
						break;
					case 'linebuffergeometry':
					case 'linegeometry':
					case 'linebuffer':
					case 'line':
						const lineGeometry = new N3JS.LineGeometry();
						if (
							this.attrPosition instanceof Float32Array ||
							this.attrPosition instanceof Array
						) {
							lineGeometry.setPositions(this.attrPosition);
						}
						if (
							this.attrColor instanceof Float32Array ||
							this.attrColor instanceof Array
						) {
							lineGeometry.setColors(this.attrColor);
						}
						geometry = lineGeometry;
						break;
					case 'roundedboxbuffergeometry':
					case 'roundedboxgeometry':
					case 'roundedboxbuffer':
					case 'roundedbox':
						geometry = new N3JS.RoundedBoxGeometry(
							NgxThreeUtil.getTypeSafe(this.width, this.height, 1),
							NgxThreeUtil.getTypeSafe(this.height, this.width, 1),
							NgxThreeUtil.getTypeSafe(this.depth, this.width, 1),
							NgxThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 2),
							NgxThreeUtil.getTypeSafe(this.radius, 0.1)
						);
						break;
					case 'boxlinebuffergeometry':
					case 'boxlinegeometry':
					case 'boxline':
						geometry = new N3JS.BoxLineGeometry(
							NgxThreeUtil.getTypeSafe(this.width, this.height, 1),
							NgxThreeUtil.getTypeSafe(this.height, this.width, 1),
							NgxThreeUtil.getTypeSafe(this.depth, this.width, 1),
							NgxThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1),
							NgxThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
							NgxThreeUtil.getTypeSafe(this.depthSegments, this.segments, 1)
						);
						break;

					case 'boxbuffergeometry':
					case 'boxgeometry':
					case 'boxbuffer':
					case 'box':
						geometry = new N3JS.BoxBufferGeometry(
							NgxThreeUtil.getTypeSafe(this.width, this.height, 1),
							NgxThreeUtil.getTypeSafe(this.height, this.width, 1),
							NgxThreeUtil.getTypeSafe(this.depth, this.width, 1),
							NgxThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1),
							NgxThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
							NgxThreeUtil.getTypeSafe(this.depthSegments, this.segments, 1)
						);
						break;
					case 'circlebuffergeometry':
					case 'circlegeometry':
					case 'circlebuffer':
					case 'circle':
						geometry = new N3JS.CircleBufferGeometry(
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 8),
							NgxThreeUtil.getAngleSafe(this.thetaStart, 0),
							NgxThreeUtil.getAngleSafe(this.thetaLength, 360)
						);
						break;
					case 'circledepthbuffergeometry':
					case 'circledepthgeometry':
					case 'circledepthbuffer':
					case 'circledepth':
						geometry = new NGX_GEOMETRY.NgxCircleDepthGeometry(
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(this.depth, 1),
							NgxThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 8),
							NgxThreeUtil.getAngleSafe(this.thetaStart, 0),
							NgxThreeUtil.getAngleSafe(this.thetaLength, 360),
							NgxThreeUtil.getTypeSafe(this.depthRate, 1)
						);
						break;
					case 'starbuffergeometry':
					case 'stargeometry':
					case 'starbuffer':
					case 'star':
						geometry = new NGX_GEOMETRY.NgxStarGeometry(
							NgxThreeUtil.getTypeSafe(this.innerRadius, 0.5),
							NgxThreeUtil.getTypeSafe(this.outerRadius, 1),
							NgxThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 5),
							NgxThreeUtil.getAngleSafe(this.thetaStart, 0),
							NgxThreeUtil.getAngleSafe(this.thetaLength, 360)
						);
						break;
					case 'stardepthbuffergeometry':
					case 'stardepthgeometry':
					case 'stardepthbuffer':
					case 'stardepth':
						geometry = new NGX_GEOMETRY.NgxStarDepthGeometry(
							NgxThreeUtil.getTypeSafe(this.innerRadius, 0.5),
							NgxThreeUtil.getTypeSafe(this.outerRadius, 1),
							NgxThreeUtil.getTypeSafe(this.depth, 1),
							NgxThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 5),
							NgxThreeUtil.getAngleSafe(this.thetaStart, 0),
							NgxThreeUtil.getAngleSafe(this.thetaLength, 360),
							NgxThreeUtil.getTypeSafe(this.depthRate, 1)
						);
						break;
					case 'conebuffergeometry':
					case 'conegeometry':
					case 'conebuffer':
					case 'cone':
						geometry = new N3JS.ConeBufferGeometry(
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(this.height, this.width, 1),
							NgxThreeUtil.getTypeSafe(
								this.radialSegments,
								this.radiusSegments,
								8
							),
							NgxThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
							NgxThreeUtil.getTypeSafe(this.openEnded, false),
							NgxThreeUtil.getAngleSafe(this.thetaStart, 0),
							NgxThreeUtil.getAngleSafe(this.thetaLength, 360)
						);
						break;
					case 'cylinderbuffergeometry':
					case 'cylindergeometry':
					case 'cylinderbuffer':
					case 'cylinder':
						geometry = new N3JS.CylinderBufferGeometry(
							NgxThreeUtil.getTypeSafe(this.radiusTop, this.radiusBottom, 1),
							NgxThreeUtil.getTypeSafe(this.radiusBottom, this.radiusTop, 1),
							NgxThreeUtil.getTypeSafe(this.height, this.width, 1),
							NgxThreeUtil.getTypeSafe(
								this.radialSegments,
								this.radiusSegments,
								8
							),
							NgxThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
							NgxThreeUtil.getTypeSafe(this.openEnded, false),
							NgxThreeUtil.getAngleSafe(this.thetaStart, 0),
							NgxThreeUtil.getAngleSafe(this.thetaLength, 360)
						);
						break;
					case 'dodecahedronbuffergeometry':
					case 'dodecahedrongeometry':
					case 'dodecahedronbuffer':
					case 'dodecahedron':
						geometry = new N3JS.DodecahedronBufferGeometry(
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(this.detail, 0)
						);
						break;
					case 'mergebuffergeometries':
					case 'mergebuffergeometry':
					case 'mergebuffer':
					case 'merge':
						const geometries: I3JS.BufferGeometry[] = [];
						if (this.geometryList !== null && this.geometryList.length > 0) {
							this.geometryList.forEach((geometryComponent) => {
								const geometry = geometryComponent.getGeometry().clone();
								geometry.deleteAttribute('normal');
								geometry.deleteAttribute('uv');
								geometries.push(
									N3JS.GeometryUtils.mergeVertices(geometry)
								);
							});
						}
						geometry =
							N3JS.GeometryUtils.mergeBufferGeometries(geometries);
						break;
					case 'shapebuffergeometry':
					case 'extrudebuffergeometry':
					case 'extrudegeometry':
					case 'shapegeometry':
					case 'shapebuffer':
					case 'shape':
					case 'extrudebuffer':
					case 'extrude':
						geometry = new N3JS.ShapeBufferGeometry(
							[],
							NgxThreeUtil.getTypeSafe(this.curveSegments, this.segments)
						);
						this.getShapes((shapes) => {
							let shapeGeometry: I3JS.BufferGeometry = null;
							switch (this.type.toLowerCase()) {
								case 'shapebuffergeometry':
								case 'shapegeometry':
								case 'shapebuffer':
								case 'shape':
									shapeGeometry = new N3JS.ShapeBufferGeometry(
										shapes,
										NgxThreeUtil.getTypeSafe(this.curveSegments, this.segments)
									);
									break;
								case 'extrudebuffergeometry':
								case 'extrudegeometry':
								case 'extrudebuffer':
								case 'extrude':
								default:
									shapeGeometry = new N3JS.ExtrudeBufferGeometry(shapes, {
										curveSegments: NgxThreeUtil.getTypeSafe(
											this.curveSegments,
											this.segments
										),
										steps: NgxThreeUtil.getTypeSafe(this.steps),
										depth: NgxThreeUtil.getTypeSafe(this.depth, this.width),
										bevelEnabled: NgxThreeUtil.getTypeSafe(this.bevelEnabled),
										bevelThickness: NgxThreeUtil.getTypeSafe(this.bevelThickness),
										bevelSize: NgxThreeUtil.getTypeSafe(this.bevelSize),
										bevelOffset: NgxThreeUtil.getTypeSafe(this.bevelOffset),
										bevelSegments: NgxThreeUtil.getTypeSafe(this.bevelSegments),
										extrudePath: this.getExtrudePath(),
										UVGenerator: this.getUVGenerator(),
									});
									break;
							}
							this.setGeometry(shapeGeometry);
							this.setSubscribeNext('loaded');
						});
						break;
					case 'icosahedronbuffergeometry':
					case 'icosahedrongeometry':
					case 'icosahedronbuffer':
					case 'icosahedron':
						geometry = new N3JS.IcosahedronBufferGeometry(
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(this.detail, 0)
						);
						break;
					case 'lathebuffergeometry':
					case 'lathegeometry':
					case 'lathebuffer':
					case 'lathe':
						geometry = new N3JS.LatheBufferGeometry(
							this.getPointsV2([]),
							NgxThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 12),
							NgxThreeUtil.getAngleSafe(this.phiStart, 0),
							NgxThreeUtil.getAngleSafe(this.phiLength, 360)
						);
						break;
					case 'octahedronbuffergeometry':
					case 'octahedrongeometry':
					case 'octahedronbuffer':
					case 'octahedron':
						geometry = new N3JS.OctahedronBufferGeometry(
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(this.detail, 0)
						);
						break;
					case 'parametricgeometry':
					case 'parametric':
					case 'parametricbuffergeometry':
					case 'parametricbuffer':
						geometry = new N3JS.ParametricGeometry(
							this.getParametric('mobius3d'),
							NgxThreeUtil.getTypeSafe(this.slices, 20),
							NgxThreeUtil.getTypeSafe(this.stacks, 20)
						);
						break;
					case 'parametrictorusknotgeometry':
					case 'parametrictorusknot':
						geometry = new N3JS.ParametricGeometries.TorusKnotGeometry(
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(this.tube, 0.4),
							NgxThreeUtil.getTypeSafe(
								this.radialSegments,
								this.radiusSegments,
								64
							),
							NgxThreeUtil.getTypeSafe(this.tubularSegments, 8),
							NgxThreeUtil.getTypeSafe(this.p, 2),
							NgxThreeUtil.getTypeSafe(this.q, 3)
						);
						break;
					case 'parametricspheregeometry':
					case 'parametricsphere':
						geometry = new N3JS.ParametricGeometries.SphereGeometry(
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(this.widthSegments, this.segments, 8),
							NgxThreeUtil.getTypeSafe(this.heightSegments, this.segments, 6)
						);
						break;
					case 'parametrictubegeometry':
					case 'parametrictube':
						geometry = new N3JS.ParametricGeometries.TubeGeometry(
							this.getCurve(),
							NgxThreeUtil.getTypeSafe(this.tubularSegments, 64),
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(
								this.radiusSegments,
								this.radialSegments,
								8
							),
							NgxThreeUtil.getTypeSafe(this.closed, false)
						);
						break;
					case 'parametricbuffergeometry':
					case 'parametricbuffer':
					case 'parametricgeometry':
					case 'parametric':
						geometry = new N3JS.ParametricGeometry(
							this.getParametric('mobius3d'),
							NgxThreeUtil.getTypeSafe(this.slices, 20),
							NgxThreeUtil.getTypeSafe(this.stacks, 10)
						);
						break;
					case 'planebuffergeometry':
					case 'planebuffer':
					case 'planegeometry':
					case 'plane':
						geometry = new N3JS.PlaneBufferGeometry(
							NgxThreeUtil.getTypeSafe(this.width, this.height, 1),
							NgxThreeUtil.getTypeSafe(this.height, this.width, 1),
							NgxThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1),
							NgxThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1)
						);
						break;
					case 'planedepthbuffergeometry':
					case 'planedepthbuffer':
					case 'planedepthgeometry':
					case 'planedepth':
						geometry = new NGX_GEOMETRY.NgxPlaneDepthGeometry(
							NgxThreeUtil.getTypeSafe(this.width, this.height, 1),
							NgxThreeUtil.getTypeSafe(this.height, this.width, 1),
							NgxThreeUtil.getTypeSafe(this.depth, this.width, 1),
							NgxThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1),
							NgxThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
							NgxThreeUtil.getTypeSafe(this.depthRate, 1)
						);
						break;
					case 'polyhedronbuffergeometry':
					case 'polyhedrongeometry':
					case 'polyhedronbuffer':
					case 'polyhedron':
						geometry = new N3JS.PolyhedronBufferGeometry(
							this.getPolyVertices([]),
							this.getPolyIndices([]),
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(this.detail, 0)
						);
						break;
					case 'ringbuffergeometry':
					case 'ringgeometry':
					case 'ringbuffer':
					case 'ring':
						geometry = new N3JS.RingBufferGeometry(
							NgxThreeUtil.getTypeSafe(this.innerRadius, 0.5),
							NgxThreeUtil.getTypeSafe(this.outerRadius, 1),
							NgxThreeUtil.getTypeSafe(this.thetaSegments, 8),
							NgxThreeUtil.getTypeSafe(this.phiSegments, 1),
							NgxThreeUtil.getAngleSafe(this.thetaStart, 0),
							NgxThreeUtil.getAngleSafe(this.thetaLength, 360)
						);
						break;
					case 'ringdepthbuffergeometry':
					case 'ringdepthgeometry':
					case 'ringdepthbuffer':
					case 'ringdepth':
						geometry = new NGX_GEOMETRY.NgxRingDepthGeometry(
							NgxThreeUtil.getTypeSafe(this.innerRadius, 0.5),
							NgxThreeUtil.getTypeSafe(this.outerRadius, 1),
							NgxThreeUtil.getTypeSafe(this.depth, 1),
							NgxThreeUtil.getTypeSafe(this.thetaSegments, 8),
							NgxThreeUtil.getTypeSafe(this.phiSegments, 1),
							NgxThreeUtil.getAngleSafe(this.thetaStart, 0),
							NgxThreeUtil.getAngleSafe(this.thetaLength, 360),
							NgxThreeUtil.getTypeSafe(this.depthRate, 1)
						);
						break;
					case 'spherebuffergeometry':
					case 'spheregeometry':
					case 'spherebuffer':
					case 'sphere':
						geometry = new N3JS.SphereBufferGeometry(
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(this.widthSegments, this.segments, 8),
							NgxThreeUtil.getTypeSafe(this.heightSegments, this.segments, 6),
							NgxThreeUtil.getAngleSafe(this.phiStart, 0),
							NgxThreeUtil.getAngleSafe(this.phiLength, 360),
							NgxThreeUtil.getAngleSafe(this.thetaStart, 0),
							NgxThreeUtil.getAngleSafe(this.thetaLength, 180)
						);
						break;
					case 'tetrahedronbuffergeometry':
					case 'tetrahedrongeometry':
					case 'tetrahedronbuffer':
					case 'tetrahedron':
						geometry = new N3JS.TetrahedronBufferGeometry(
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(this.detail, 0)
						);
						break;
					case 'textbuffergeometry':
					case 'textgeometry':
					case 'textbuffer':
					case 'text':
						geometry = new N3JS.BufferGeometry();
						this.getFont('helvetiker', (font: I3JS.Font) => {
							const textParameters: I3JS.TextGeometryParameters = {
								font: font,
								size: NgxThreeUtil.getTypeSafe(this.size, 1),
								height: NgxThreeUtil.getTypeSafe(this.height, this.width),
								curveSegments: NgxThreeUtil.getTypeSafe(
									this.curveSegments,
									this.segments
								),
								bevelEnabled: NgxThreeUtil.getTypeSafe(this.bevelEnabled),
								bevelThickness: NgxThreeUtil.getTypeSafe(this.bevelThickness),
								bevelSize: NgxThreeUtil.getTypeSafe(this.bevelSize),
								bevelOffset: NgxThreeUtil.getTypeSafe(this.bevelOffset),
								bevelSegments: NgxThreeUtil.getTypeSafe(this.bevelSegments),
							};
							switch (this.type.toLowerCase()) {
								case 'textbuffergeometry':
								case 'textgeometry':
								case 'textbuffer':
								case 'text':
								default:
									this.setGeometry(
										new N3JS.TextGeometry(
											NgxThreeUtil.getTypeSafe(this.text, 'test'),
											textParameters
										)
									);
									this.setSubscribeNext('loaded');
									break;
							}
						});
						break;
					case 'torusbuffergeometry':
					case 'torusgeometry':
					case 'torusbuffer':
					case 'torus':
						geometry = new N3JS.TorusBufferGeometry(
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(this.tube, 0.4),
							NgxThreeUtil.getTypeSafe(
								this.radialSegments,
								this.radiusSegments,
								8
							),
							NgxThreeUtil.getTypeSafe(this.tubularSegments, 6),
							NgxThreeUtil.getAngleSafe(this.arc, 360)
						);
						break;
					case 'torusknotbuffergeometry':
					case 'torusknotgeometry':
					case 'torusknotbuffer':
					case 'torusknot':
						geometry = new N3JS.TorusKnotBufferGeometry(
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(this.tube, 0.4),
							NgxThreeUtil.getTypeSafe(
								this.radialSegments,
								this.radiusSegments,
								64
							),
							NgxThreeUtil.getTypeSafe(this.tubularSegments, 8),
							NgxThreeUtil.getTypeSafe(this.p, 2),
							NgxThreeUtil.getTypeSafe(this.q, 3)
						);
						break;
					case 'tubebuffergeometry':
					case 'tubegeometry':
					case 'tubebuffer':
					case 'tube':
						geometry = new N3JS.TubeBufferGeometry(
							this.getCurve(),
							NgxThreeUtil.getTypeSafe(this.tubularSegments, 64),
							NgxThreeUtil.getTypeSafe(this.radius, 1),
							NgxThreeUtil.getTypeSafe(
								this.radiusSegments,
								this.radialSegments,
								8
							),
							NgxThreeUtil.getTypeSafe(this.closed, false)
						);
						break;
					case 'convexbuffergeometry':
					case 'convexgeometry':
					case 'convexbuffer':
					case 'convex':
						geometry = new N3JS.ConvexGeometry(
							this.getPointsV3([])
						);
						break;
					case 'decalbuffergeometry':
					case 'decalgeometry':
					case 'decalbuffer':
					case 'decal':
						geometry = new N3JS.DecalGeometry(
							this.getMesh(),
							this.getPositionV3(),
							this.getOrientation(),
							this.getSizeV3()
						);
						break;
					case 'treesgeometry':
					case 'trees':
						geometry = new N3JS.RollerCoasterTreesGeometry(
							this.getMesh()
						);
						break;
					case 'skygeometry':
					case 'sky':
						geometry = new N3JS.RollerCoasterSkyGeometry(
							null,
							null
						);
						break;
					case 'rollercoastergeometry':
					case 'rollercoaster':
						geometry = new N3JS.RollerCoasterGeometry(
							this.getCurve(),
							NgxThreeUtil.getTypeSafe(this.slices, 1500)
						);
						break;
					case 'rollercoasterliftersgeometry':
					case 'rollercoasterlifters':
						geometry = new N3JS.RollerCoasterLiftersGeometry(
							this.getCurve(),
							NgxThreeUtil.getTypeSafe(this.slices, 1500)
						);
						break;
					case 'rollercoastershadowgeometry':
					case 'rollercoastershadow':
						geometry = new N3JS.RollerCoasterShadowGeometry(
							this.getCurve(),
							NgxThreeUtil.getTypeSafe(this.slices, 1500)
						);
						break;
					case 'lightning':
					case 'lightningstrike':
						geometry = new N3JS.LightningStrike(
							this.rayParams
						);
						break;
					default:
						geometry = new N3JS.PlaneBufferGeometry(
							NgxThreeUtil.getTypeSafe(this.width, this.height, 1),
							NgxThreeUtil.getTypeSafe(this.height, this.width, 1),
							NgxThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1),
							NgxThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1)
						);
						break;
				}
			}
			this.setGeometry(geometry);
		}
		return this.geometry as T;
	}
}
