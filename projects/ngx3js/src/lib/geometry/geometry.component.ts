import {
	Component,
	ContentChildren,
	forwardRef,
	Input,
	OnDestroy,
	OnInit,
	QueryList,
	SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
import * as THREE_GEO from './geometries/three-geometries';

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import { Font } from 'three/examples/jsm/loaders/FontLoader';
import { CurveComponent } from '../curve/curve.component';
import { CurveUtils } from '../curve/curveUtils';
import {
	AbstractGeometryComponent,
	GeometriesParametric,
} from '../geometry.abstract';
import { ThreeColor, ThreeUtil, ThreeVector } from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { ShapeComponent } from '../shape/shape.component';
import { SvgComponent } from '../svg/svg.component';
import { NgxCapsuleGeometry } from './geometries/capsule';
import { NgxCircleDepthGeometry } from './geometries/circle-depth';
import { NgxGridGeometry } from './geometries/grid';
import { NgxPlaneDepthGeometry } from './geometries/plane-depth';
import { NgxPlanePerlinGeometry } from './geometries/plane-perlin';
import { NgxRingDepthGeometry } from './geometries/ring-depth';
import { NgxRopeGeometry } from './geometries/rope';
import { NgxStarGeometry } from './geometries/star';
import { NgxStarDepthGeometry } from './geometries/star-depth';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

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
			provide: AbstractGeometryComponent,
			useExisting: forwardRef(() => GeometryComponent),
		},
		{
			provide: AbstractSubscribeComponent,
			useExisting: forwardRef(() => GeometryComponent),
		},
	],
})
export class GeometryComponent
	extends AbstractGeometryComponent
	implements OnInit, OnDestroy
{
	/**
	 * The type  of geometry
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.BufferGeometry
	 * @see THREE.BufferGeometry - BufferGeometry, CustomGeometry,  Custom, Buffer
	 * @see THREE.InstancedBufferGeometry - InstancedBufferGeometry, InstancedBuffer, Instanced,
	 * @see TeapotGeometry - TeapotGeometry, Teapot,
	 * @see PerlinGeometry - PerlinBufferGeometry, PerlinGeometry, Perlin, PerlinBuffer
	 * @see RopeGeometry - RopeBufferGeometry, RopeGeometry, Rope, RopeBuffer
	 * @see CapsuleGeometry - CapsuleGeometry, Capsule,
	 * @see LineGeometry - LineGeometry, Line,
	 * @see THREE.BoxGeometry - BoxGeometry, Box,
	 * @see THREE.CircleGeometry - CircleGeometry, Circle,
	 * @see THREE.ConeGeometry - ConeGeometry, Cone,
	 * @see THREE.CylinderGeometry - CylinderGeometry, Cylinder,
	 * @see THREE.DodecahedronGeometry - DodecahedronGeometry, Dodecahedron,
	 * @see MergeGeometry - mergebuffergeometries,  mergebuffergeometry, mergebuffer, merge
	 * @see THREE.ShapeGeometry - ShapeGeometry, Shape,
	 * @see THREE.IcosahedronGeometry - IcosahedronGeometry, Icosahedron,
	 * @see THREE.LatheGeometry - LatheGeometry, Lathe,
	 * @see THREE.OctahedronGeometry - OctahedronGeometry, Octahedron,
	 * @see THREE.ParametricBufferGeometry - ParametricBufferGeometry, ParametricBuffer, ParametricBuffer
	 * @see ParametricGeometries.TorusKnotGeometry - ,
	 * @see ParametricGeometries.SphereGeometry - ,
	 * @see ParametricGeometries.TubeGeometry - ,
	 * @see THREE.ParametricGeometry - ParametricGeometry , Parametric,
	 * @see THREE.PlaneGeometry - PlaneGeometry, Plane,
	 * @see THREE.RingGeometry - RingGeometry, Ring,
	 * @see THREE.SphereGeometry - SphereGeometry, Sphere,
	 * @see THREE.TetrahedronGeometry - TetrahedronGeometry, Tetrahedron,
	 * @see THREE.TextBufferGeometry - TextBufferGeometry, TextGeometry, TextBuffer, Text
	 * @see THREE.TorusGeometry - TorusGeometry, Torus,
	 * @see THREE.TorusKnotGeometry - TorusKnotGeometry, TorusKnot
	 * @see THREE.TubeGeometry - TubeGeometry, Tube,
	 * @see ConvexGeometry - ConvexGeometry, Convex,
	 * @see DecalGeometry - DecalGeometry, Decal,
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
	@Input() public color1: ThreeColor = null;

	/**
	 * Grid Color axis Y
	 */
	@Input() public color2: ThreeColor = null;

	/**
	 * The points of geometry component
	 */
	@Input() public points: ThreeVector[] = null;

	/**
	 * The shapes of geometry component
	 */
	@Input() public shapes: ThreeVector[] | THREE.Shape = null;

	/**
	 * The extrudePath of geometry component
	 */
	@Input() public extrudePath: ThreeVector[] = null;

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
	@Input() public curvePath: ThreeVector[] = null;

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
	@Input() public pointsGeometry: GeometryComponent = null;

	/**
	 * The Input of geometry component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public parametric: string | GeometriesParametric | any = null;

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
	@Input() public mesh: THREE.Mesh | any = null;

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
	@Input() public curve: string | THREE.Curve<THREE.Vector3> = null;

	/**
	 * The curveOption of geometry component
	 */
	@Input() public curveOption: any = null;

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
	@Input() public rayParams: THREE_GEO.RayParameters = {};

	/**
	 * Content children of geometry component
	 */
	@ContentChildren(GeometryComponent, { descendants: false })
	private geometryList: QueryList<GeometryComponent>;

	/**
	 * Content children of geometry component
	 */
	@ContentChildren(ShapeComponent, { descendants: false })
	private shapeList: QueryList<ShapeComponent>;

	/**
	 * Content children of geometry component
	 */
	@ContentChildren(CurveComponent, { descendants: false })
	private curveList: QueryList<CurveComponent>;

	/**
	 * Content children of geometry component
	 */
	@ContentChildren(SvgComponent, { descendants: false })
	private svgList: QueryList<SvgComponent>;

	/**
	 * Creates an instance of geometry component.
	 * @param localStorageService
	 */
	constructor(private localStorageService: LocalStorageService) {
		super();
	}

	/**
	 * Gets font
	 * @param [def]
	 * @param [callBack]
	 */
	private getFont(def?: string, callBack?: (font: Font) => void) {
		const font = ThreeUtil.getTypeSafe(this.font, def, 'helvetiker');
		const weight = ThreeUtil.getTypeSafe(this.weight, '');
		this.localStorageService.getFont(callBack, font, weight);
	}

	/**
	 * Gets points v3
	 * @param def
	 * @returns points v3
	 */
	private getPointsV3(
		def: { x: number; y: number; z: number }[]
	): THREE.Vector3[] {
		const points: THREE.Vector3[] = [];
		if (this.pointsGeometry !== null) {
			let pointsGeometry = this.pointsGeometry.getGeometry().clone();
			pointsGeometry.deleteAttribute('normal');
			pointsGeometry.deleteAttribute('uv');
			pointsGeometry = BufferGeometryUtils.mergeVertices(pointsGeometry);
			const positionAttribute = pointsGeometry.getAttribute('position');
			for (let i = 0; i < positionAttribute.count; i++) {
				const vertex = new THREE.Vector3();
				vertex.fromBufferAttribute(positionAttribute, i);
				points.push(vertex);
			}
		} else if (ThreeUtil.isNotNull(this.text)) {
			points.push(new THREE.Vector3(0, 0, 0));
			points.push(new THREE.Vector3(0, 0, 0));
			this.getFont('helvetiker', (font: Font) => {
				const shapes = font.generateShapes(
					ThreeUtil.getTypeSafe(this.text, 'test'),
					ThreeUtil.getTypeSafe(this.size, 1)
				);
				const points: THREE.Vector2[] = [];
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
				points.push(new THREE.Vector3(p.x, p.y, p.z));
			});
		}
		return points;
	}

	/**
	 * Gets points v2
	 * @param [def]
	 * @returns points v2
	 */
	private getPointsV2(def?: ThreeVector[]): THREE.Vector2[] {
		const points: THREE.Vector2[] = [];
		(this.points === null ? def : this.points).forEach((p) => {
			points.push(new THREE.Vector2(p.x, p.y));
		});
		return points;
	}

	/**
	 * Gets parametric
	 * @param def
	 * @returns parametric
	 */
	private getParametric(
		def: string | GeometriesParametric
	): (u: number, v: number, dest: THREE.Vector3) => void {
		const parametric = this.parametric === null ? def : this.parametric;
		switch (parametric) {
			case 'mobius3d':
				return THREE_GEO.ParametricGeometries.mobius3d;
			case 'klein':
				return THREE_GEO.ParametricGeometries.klein;
			case 'plane':
				return THREE_GEO.ParametricGeometries.plane(
					ThreeUtil.getTypeSafe(this.width, this.height, 10),
					ThreeUtil.getTypeSafe(this.height, this.width, 10)
				) as any;
			case 'mobius':
				return THREE_GEO.ParametricGeometries.mobius;
			default:
				if (parametric !== null) {
					if (typeof parametric === 'function') {
						return (u: number, v: number, dest: THREE.Vector3) => {
							const ov = parametric(u, v, dest);
							if (ov !== null && ov !== undefined) {
								dest.set(ov.x, ov.y, ov.z);
							}
						};
					} else if (typeof parametric.getPoint === 'function') {
						return (u: number, v: number, dest: THREE.Vector3) => {
							const ov = parametric.getPoint(u, v, dest);
							if (ov !== null && ov !== undefined) {
								dest.set(ov.x, ov.y, ov.z);
							}
						};
					}
				}
		}
		return THREE_GEO.ParametricGeometries.klein;
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
	private getShapes(onload: (data: THREE.Shape[] | THREE.Shape) => void): void {
		if (ThreeUtil.isNotNull(this.svgList) && this.svgList.length > 0) {
			window.setTimeout(() => {
				this.svgList.forEach((svg) => {
					svg.getShapes((shapes) => {
						onload(shapes);
					});
				});
			}, 1);
		} else if (ThreeUtil.isNotNull(this.shapes)) {
			if (this.shapes instanceof THREE.Shape) {
				window.setTimeout(() => {
					onload(this.shapes as THREE.Shape);
				}, 1);
			} else {
				const shapes: THREE.Shape[] = [];
				const shape = new THREE.Shape();
				const vectors: THREE.Vector2[] = [];
				this.shapes.forEach((p) => {
					vectors.push(new THREE.Vector2(p.x, p.y));
				});
				shape.setFromPoints(vectors);
				shapes.push(shape);
				window.setTimeout(() => {
					onload(shapes);
				}, 1);
			}
		} else if (ThreeUtil.isNotNull(this.text)) {
			this.getFont('helvetiker', (font: Font) => {
				const shapes = font.generateShapes(
					ThreeUtil.getTypeSafe(this.text, 'test'),
					ThreeUtil.getTypeSafe(this.size, 1)
				);
				onload(shapes);
			});
		} else {
			const shapes: THREE.Shape[] = [];
			if (this.shapeList !== null && this.shapeList.length > 0) {
				const shape = new THREE.Shape();
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
	private getExtrudePath(): THREE.Curve<THREE.Vector3> {
		if (
			ThreeUtil.isNotNull(this.extrudePath) ||
			ThreeUtil.isNotNull(this.curvePath)
		) {
			const vectors: THREE.Vector3[] = [];
			if (ThreeUtil.isNotNull(this.extrudePath)) {
				this.extrudePath.forEach((p) => {
					vectors.push(new THREE.Vector3(p.x, p.y, p.z));
				});
			}
			if (ThreeUtil.isNotNull(this.curvePath)) {
				this.curvePath.forEach((p) => {
					vectors.push(new THREE.Vector3(p.x, p.y, p.z));
				});
			}
			switch (
				ThreeUtil.getTypeSafe(
					this.extrudePathType,
					this.curvePathType,
					'catmullromcurve3'
				).toLowerCase()
			) {
				case 'catmullromcurve3':
				default:
					return new THREE.CatmullRomCurve3(
						vectors,
						ThreeUtil.getTypeSafe(this.closed, false),
						ThreeUtil.getTypeSafe(this.curveType, 'catmullrom'),
						ThreeUtil.getTypeSafe(this.tension, 0.5)
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
	private getUVGenerator(def?: string): THREE.UVGenerator {
		const uVGenerator = ThreeUtil.getTypeSafe(this.uVGenerator, def, '');
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
	private getCurve(def?: string): THREE.Curve<THREE.Vector3> {
		const curve = ThreeUtil.getTypeSafe(this.curve, def, '');
		let curveLine: THREE.Curve<THREE.Vector3> = null;
		if (ThreeUtil.isNotNull(curve) && curve !== '') {
			if (typeof curve === 'string') {
				curveLine = CurveUtils.getCurve(
					curve,
					ThreeUtil.getTypeSafe(this.scale, 1),
					this.curveOption
				);
			} else {
				curveLine = curve;
			}
		}
		if (curveLine === null) {
			if (this.curveList !== null && this.curveList.length > 0) {
				curveLine =
					this.curveList.first.getCurve() as THREE.Curve<THREE.Vector3>;
			} else {
				const extrudePath = this.getExtrudePath();
				if (ThreeUtil.isNotNull(extrudePath)) {
					curveLine = extrudePath;
				}
			}
		}
		if (curveLine !== null) {
			if (ThreeUtil.isNotNull(this.curveNormal) && this.curveNormal) {
				return CurveUtils.getCurveNormal(curveLine, {
					options: this.curveNormalOption,
				});
			} else {
				return curveLine;
			}
		} else {
			return new THREE.LineCurve3(
				new THREE.Vector3(0, 0, 0),
				new THREE.Vector3(0, 0, 0)
			);
		}
	}

	/**
	 * Gets mesh
	 * @param [def]
	 * @returns mesh
	 */
	private getMesh(def?: THREE.Mesh | any): THREE.Mesh {
		let value = ThreeUtil.getTypeSafe(this.mesh, def);
		let mesh: THREE.Object3D = null;
		if (ThreeUtil.isNotNull(value)) {
			mesh = ThreeUtil.getObject3d(value);
			while (mesh instanceof THREE.Group) {
				mesh = mesh.children[0];
			}
			if (mesh instanceof THREE.Mesh) {
				return mesh;
			} else if (
				mesh.children.length > 0 &&
				mesh.children[0] instanceof THREE.Mesh
			) {
				return mesh.children[0] as THREE.Mesh;
			}
		}
		return null;
	}

	/**
	 * Gets position v3
	 * @param [def]
	 * @returns position v3
	 */
	private getPositionV3(def?: THREE.Vector3): THREE.Vector3 {
		return ThreeUtil.getVector3Safe(
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
	private getOrientation(def?: THREE.Euler): THREE.Euler {
		return ThreeUtil.getEulerSafe(
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
	private getSizeV3(def?: THREE.Vector3): THREE.Vector3 {
		return ThreeUtil.getVector3Safe(this.sizeX, this.sizeY, this.sizeZ, def);
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
	private perlinGeometry: NgxPlanePerlinGeometry = null;

	/**
	 * Gets perlin geometry
	 * @returns perlin geometry
	 */
	private getPerlinGeometry(): NgxPlanePerlinGeometry {
		if (this.perlinGeometry === null) {
			this.perlinGeometry = new NgxPlanePerlinGeometry(
				ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 128),
				ThreeUtil.getTypeSafe(this.depthSegments, this.segments, 128),
				ThreeUtil.getTypeSafe(this.quality, 2)
			);
		}
		return this.perlinGeometry;
	}

	/**
	 * Gets geometry
	 * @template T
	 * @returns geometry
	 */
	public getGeometry<T extends THREE.BufferGeometry>(): T {
		if (this.geometry === null || this._needUpdate) {
			this.needUpdate = false;
			let geometry: THREE.BufferGeometry = null;
			this.unSubscribeRefer('refGeometry');
			if (this.refer !== null && this.refer !== undefined) {
				geometry = ThreeUtil.getGeometry(this.refer);
				this.subscribeRefer(
					'refGeometry',
					ThreeUtil.getSubscribe(
						this.refer,
						() => {
							this.needUpdate = true;
						},
						'geometry'
					)
				);
			} else if (ThreeUtil.isNotNull(this.storageName)) {
				geometry = new THREE_GEO.NgxBufferGeometry();
				this.localStorageService.getGeometry(
					this.storageName,
					(loadGeometry, model: THREE.Object3D) => {
						if (model !== null && this.storage2Buffer) {
							let count = 0;
							model.traverse((child: THREE.Object3D) => {
								if (child instanceof THREE.Mesh && child.isMesh) {
									const buffer = child.geometry.attributes['position'];
									count += buffer.array.length;
								}
							});
							const combined = new Float32Array(count);
							let offset = 0;
							model.traverse((child: THREE.Object3D) => {
								if (child instanceof THREE.Mesh && child.isMesh) {
									const buffer = child.geometry.attributes['position'];
									combined.set(buffer.array, offset);
									offset += buffer.array.length;
								}
							});
							const positions = new THREE.BufferAttribute(combined, 3);
							const loadGeometry = new THREE_GEO.NgxBufferGeometry();
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
						geometry = new THREE_GEO.NgxBufferGeometry();
						const attributes = this.getAttributes();
						if (ThreeUtil.isNotNull(attributes) && attributes.length > 0) {
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
							if (ThreeUtil.isNotNull(points) && points.length > 0) {
								geometry.setFromPoints(points);
							} else {
								const curve = this.getCurve();
								const curveSegments = ThreeUtil.getTypeSafe(
									this.curveSegments,
									this.segments,
									10
								);
								geometry.setAttribute(
									'position',
									new THREE.BufferAttribute(
										new Float32Array(curveSegments * 3),
										3
									)
								);
								const position = geometry.attributes.position;
								const point = new THREE.Vector3();
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
						const instancedBufferGeometry =
							new THREE_GEO.NgxInstancedBufferGeometry();
						if (ThreeUtil.isNotNull(this.instanceCount)) {
							instancedBufferGeometry.instanceCount = ThreeUtil.getTypeSafe(
								this.instanceCount,
								Infinity
							);
						}
						const instancedAttributes = this.getAttributes('instanced');
						if (
							ThreeUtil.isNotNull(instancedAttributes) &&
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
						const teapot = new THREE_GEO.NgxTeapotGeometry(
							ThreeUtil.getTypeSafe(this.size, this.radius),
							ThreeUtil.getTypeSafe(this.segments, this.radiusSegments),
							ThreeUtil.getTypeSafe(this.bottom),
							ThreeUtil.getTypeSafe(this.lid),
							ThreeUtil.getTypeSafe(this.body),
							ThreeUtil.getTypeSafe(this.fitLid),
							ThreeUtil.getTypeSafe(this.blinn)
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
									ThreeUtil.getTypeSafe(this.width, this.height, 100),
									ThreeUtil.getTypeSafe(this.height, this.width, 100),
									ThreeUtil.getTypeSafe(this.depth, this.width, 100),
									ThreeUtil.getColorSafe(this.light, 0xffffff),
									ThreeUtil.getColorSafe(this.shadow)
								);
								break;
							case 'terrain':
								geometry = planePerlin.getTerrain(
									ThreeUtil.getTypeSafe(this.width, this.height, 100),
									ThreeUtil.getTypeSafe(this.height, this.width, 100),
									ThreeUtil.getTypeSafe(this.depth, this.width, 100)
								);
								break;
							case 'minecraft':
							default:
								geometry = planePerlin.getMinecraft(
									ThreeUtil.getTypeSafe(this.width, this.height, 100),
									ThreeUtil.getTypeSafe(this.height, this.width, 100),
									ThreeUtil.getTypeSafe(this.depth, this.width, 100)
								);
								break;
						}
						break;
					case 'ropebuffergeometry':
					case 'ropegeometry':
					case 'ropebuffer':
					case 'rope':
						const ropeGeometry = new NgxRopeGeometry(
							ThreeUtil.getTypeSafe(this.width, this.height, 1),
							ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1)
						);
						geometry = ropeGeometry;
						break;
					case 'gridbuffergeometry':
					case 'gridgeometry':
					case 'gridbuffer':
					case 'grid':
						const gridGeometry = new NgxGridGeometry(
							ThreeUtil.getTypeSafe(this.width, this.height, 1),
							ThreeUtil.getTypeSafe(this.height, this.width, 1),
							ThreeUtil.getTypeSafe(this.depth, 0),
							ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1),
							ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
							ThreeUtil.getColorSafe(this.color1, 0x444444),
							ThreeUtil.getColorSafe(this.color2, 0x888888)
						);
						geometry = gridGeometry;
						break;
					case 'capsulebuffergeometry':
					case 'capsulegeometry':
					case 'capsulebuffer':
					case 'capsule':
						const capsuleGeometry = new NgxCapsuleGeometry(
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(
								this.radiusSegments,
								this.radialSegments,
								this.segments
							),
							ThreeUtil.getTypeSafe(this.height, this.width, 10),
							ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 3),
							ThreeUtil.getAngleSafe(this.phiStart, 0),
							ThreeUtil.getAngleSafe(this.phiLength, 360)
						);
						geometry = capsuleGeometry;
						break;
					case 'linebuffergeometry':
					case 'linegeometry':
					case 'linebuffer':
					case 'line':
						const lineGeometry = new THREE_GEO.NgxLineGeometry();
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
						geometry = new THREE_GEO.NgxRoundedBoxGeometry(
							ThreeUtil.getTypeSafe(this.width, this.height, 1),
							ThreeUtil.getTypeSafe(this.height, this.width, 1),
							ThreeUtil.getTypeSafe(this.depth, this.width, 1),
							ThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 2),
							ThreeUtil.getTypeSafe(this.radius, 0.1)
						);
						break;
					case 'boxlinebuffergeometry':
					case 'boxlinegeometry':
					case 'boxline':
						geometry = new THREE_GEO.NgxBoxLineGeometry(
							ThreeUtil.getTypeSafe(this.width, this.height, 1),
							ThreeUtil.getTypeSafe(this.height, this.width, 1),
							ThreeUtil.getTypeSafe(this.depth, this.width, 1),
							ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1),
							ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
							ThreeUtil.getTypeSafe(this.depthSegments, this.segments, 1)
						);
						break;

					case 'boxbuffergeometry':
					case 'boxgeometry':
					case 'boxbuffer':
					case 'box':
						geometry = new THREE_GEO.NgxBoxBufferGeometry(
							ThreeUtil.getTypeSafe(this.width, this.height, 1),
							ThreeUtil.getTypeSafe(this.height, this.width, 1),
							ThreeUtil.getTypeSafe(this.depth, this.width, 1),
							ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1),
							ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
							ThreeUtil.getTypeSafe(this.depthSegments, this.segments, 1)
						);
						break;
					case 'circlebuffergeometry':
					case 'circlegeometry':
					case 'circlebuffer':
					case 'circle':
						geometry = new THREE_GEO.NgxCircleBufferGeometry(
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 8),
							ThreeUtil.getAngleSafe(this.thetaStart, 0),
							ThreeUtil.getAngleSafe(this.thetaLength, 360)
						);
						break;
					case 'circledepthbuffergeometry':
					case 'circledepthgeometry':
					case 'circledepthbuffer':
					case 'circledepth':
						geometry = new NgxCircleDepthGeometry(
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(this.depth, 1),
							ThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 8),
							ThreeUtil.getAngleSafe(this.thetaStart, 0),
							ThreeUtil.getAngleSafe(this.thetaLength, 360),
							ThreeUtil.getTypeSafe(this.depthRate, 1)
						);
						break;
					case 'starbuffergeometry':
					case 'stargeometry':
					case 'starbuffer':
					case 'star':
						geometry = new NgxStarGeometry(
							ThreeUtil.getTypeSafe(this.innerRadius, 0.5),
							ThreeUtil.getTypeSafe(this.outerRadius, 1),
							ThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 5),
							ThreeUtil.getAngleSafe(this.thetaStart, 0),
							ThreeUtil.getAngleSafe(this.thetaLength, 360)
						);
						break;
					case 'stardepthbuffergeometry':
					case 'stardepthgeometry':
					case 'stardepthbuffer':
					case 'stardepth':
						geometry = new NgxStarDepthGeometry(
							ThreeUtil.getTypeSafe(this.innerRadius, 0.5),
							ThreeUtil.getTypeSafe(this.outerRadius, 1),
							ThreeUtil.getTypeSafe(this.depth, 1),
							ThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 5),
							ThreeUtil.getAngleSafe(this.thetaStart, 0),
							ThreeUtil.getAngleSafe(this.thetaLength, 360),
							ThreeUtil.getTypeSafe(this.depthRate, 1)
						);
						break;
					case 'conebuffergeometry':
					case 'conegeometry':
					case 'conebuffer':
					case 'cone':
						geometry = new THREE_GEO.NgxConeBufferGeometry(
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(this.height, this.width, 1),
							ThreeUtil.getTypeSafe(
								this.radialSegments,
								this.radiusSegments,
								8
							),
							ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
							ThreeUtil.getTypeSafe(this.openEnded, false),
							ThreeUtil.getAngleSafe(this.thetaStart, 0),
							ThreeUtil.getAngleSafe(this.thetaLength, 360)
						);
						break;
					case 'cylinderbuffergeometry':
					case 'cylindergeometry':
					case 'cylinderbuffer':
					case 'cylinder':
						geometry = new THREE_GEO.NgxCylinderBufferGeometry(
							ThreeUtil.getTypeSafe(this.radiusTop, this.radiusBottom, 1),
							ThreeUtil.getTypeSafe(this.radiusBottom, this.radiusTop, 1),
							ThreeUtil.getTypeSafe(this.height, this.width, 1),
							ThreeUtil.getTypeSafe(
								this.radialSegments,
								this.radiusSegments,
								8
							),
							ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
							ThreeUtil.getTypeSafe(this.openEnded, false),
							ThreeUtil.getAngleSafe(this.thetaStart, 0),
							ThreeUtil.getAngleSafe(this.thetaLength, 360)
						);
						break;
					case 'dodecahedronbuffergeometry':
					case 'dodecahedrongeometry':
					case 'dodecahedronbuffer':
					case 'dodecahedron':
						geometry = new THREE_GEO.NgxDodecahedronBufferGeometry(
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(this.detail, 0)
						);
						break;
					case 'mergebuffergeometries':
					case 'mergebuffergeometry':
					case 'mergebuffer':
					case 'merge':
						const geometries: THREE_GEO.NgxBufferGeometry[] = [];
						if (this.geometryList !== null && this.geometryList.length > 0) {
							this.geometryList.forEach((geometryComponent) => {
								const geometry = geometryComponent.getGeometry().clone();
								geometry.deleteAttribute('normal');
								geometry.deleteAttribute('uv');
								geometries.push(BufferGeometryUtils.mergeVertices(geometry));
							});
						}
						geometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
						break;
					case 'shapebuffergeometry':
					case 'extrudebuffergeometry':
					case 'extrudegeometry':
					case 'shapegeometry':
					case 'shapebuffer':
					case 'shape':
					case 'extrudebuffer':
					case 'extrude':
						geometry = new THREE_GEO.NgxShapeBufferGeometry(
							[],
							ThreeUtil.getTypeSafe(this.curveSegments, this.segments)
						);
						this.getShapes((shapes) => {
							let shapeGeometry: THREE_GEO.NgxBufferGeometry = null;
							switch (this.type.toLowerCase()) {
								case 'shapebuffergeometry':
								case 'shapegeometry':
								case 'shapebuffer':
								case 'shape':
									shapeGeometry = new THREE_GEO.NgxShapeBufferGeometry(
										shapes,
										ThreeUtil.getTypeSafe(this.curveSegments, this.segments)
									);
									break;
								case 'extrudebuffergeometry':
								case 'extrudegeometry':
								case 'extrudebuffer':
								case 'extrude':
								default:
									shapeGeometry = new THREE_GEO.NgxExtrudeBufferGeometry(
										shapes,
										{
											curveSegments: ThreeUtil.getTypeSafe(
												this.curveSegments,
												this.segments
											),
											steps: ThreeUtil.getTypeSafe(this.steps),
											depth: ThreeUtil.getTypeSafe(this.depth, this.width),
											bevelEnabled: ThreeUtil.getTypeSafe(this.bevelEnabled),
											bevelThickness: ThreeUtil.getTypeSafe(
												this.bevelThickness
											),
											bevelSize: ThreeUtil.getTypeSafe(this.bevelSize),
											bevelOffset: ThreeUtil.getTypeSafe(this.bevelOffset),
											bevelSegments: ThreeUtil.getTypeSafe(this.bevelSegments),
											extrudePath: this.getExtrudePath(),
											UVGenerator: this.getUVGenerator(),
										}
									);
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
						geometry = new THREE_GEO.NgxIcosahedronBufferGeometry(
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(this.detail, 0)
						);
						break;
					case 'lathebuffergeometry':
					case 'lathegeometry':
					case 'lathebuffer':
					case 'lathe':
						geometry = new THREE_GEO.NgxLatheBufferGeometry(
							this.getPointsV2([]),
							ThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 12),
							ThreeUtil.getAngleSafe(this.phiStart, 0),
							ThreeUtil.getAngleSafe(this.phiLength, 360)
						);
						break;
					case 'octahedronbuffergeometry':
					case 'octahedrongeometry':
					case 'octahedronbuffer':
					case 'octahedron':
						geometry = new THREE_GEO.NgxOctahedronBufferGeometry(
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(this.detail, 0)
						);
						break;
					case 'parametricgeometry':
					case 'parametric':
					case 'parametricbuffergeometry':
					case 'parametricbuffer':
						geometry = new THREE_GEO.NgxParametricGeometry(
							this.getParametric('mobius3d'),
							ThreeUtil.getTypeSafe(this.slices, 20),
							ThreeUtil.getTypeSafe(this.stacks, 20)
						);
						break;
					case 'parametrictorusknotgeometry':
					case 'parametrictorusknot':
						geometry = new THREE_GEO.NgxParametricTorusKnotGeometry(
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(this.tube, 0.4),
							ThreeUtil.getTypeSafe(
								this.radialSegments,
								this.radiusSegments,
								64
							),
							ThreeUtil.getTypeSafe(this.tubularSegments, 8),
							ThreeUtil.getTypeSafe(this.p, 2),
							ThreeUtil.getTypeSafe(this.q, 3)
						) as any;
						break;
					case 'parametricspheregeometry':
					case 'parametricsphere':
						geometry = new THREE_GEO.NgxParametricSphereGeometry(
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 8),
							ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 6)
						) as any;
						break;
					case 'parametrictubegeometry':
					case 'parametrictube':
						geometry = new THREE_GEO.NgxParametricTubeGeometry(
							this.getCurve(),
							ThreeUtil.getTypeSafe(this.tubularSegments, 64),
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(
								this.radiusSegments,
								this.radialSegments,
								8
							),
							ThreeUtil.getTypeSafe(this.closed, false)
						) as any;
						break;
					case 'parametricbuffergeometry':
					case 'parametricbuffer':
					case 'parametricgeometry':
					case 'parametric':
						geometry = new THREE_GEO.NgxParametricGeometry(
							this.getParametric('mobius3d'),
							ThreeUtil.getTypeSafe(this.slices, 20),
							ThreeUtil.getTypeSafe(this.stacks, 10)
						);
						break;
					case 'planebuffergeometry':
					case 'planebuffer':
					case 'planegeometry':
					case 'plane':
						geometry = new THREE_GEO.NgxPlaneBufferGeometry(
							ThreeUtil.getTypeSafe(this.width, this.height, 1),
							ThreeUtil.getTypeSafe(this.height, this.width, 1),
							ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1),
							ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1)
						);
						break;
					case 'planedepthbuffergeometry':
					case 'planedepthbuffer':
					case 'planedepthgeometry':
					case 'planedepth':
						geometry = new NgxPlaneDepthGeometry(
							ThreeUtil.getTypeSafe(this.width, this.height, 1),
							ThreeUtil.getTypeSafe(this.height, this.width, 1),
							ThreeUtil.getTypeSafe(this.depth, this.width, 1),
							ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1),
							ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
							ThreeUtil.getTypeSafe(this.depthRate, 1)
						);
						break;
					case 'polyhedronbuffergeometry':
					case 'polyhedrongeometry':
					case 'polyhedronbuffer':
					case 'polyhedron':
						geometry = new THREE_GEO.NgxPolyhedronBufferGeometry(
							this.getPolyVertices([]),
							this.getPolyIndices([]),
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(this.detail, 0)
						);
						break;
					case 'ringbuffergeometry':
					case 'ringgeometry':
					case 'ringbuffer':
					case 'ring':
						geometry = new THREE_GEO.NgxRingBufferGeometry(
							ThreeUtil.getTypeSafe(this.innerRadius, 0.5),
							ThreeUtil.getTypeSafe(this.outerRadius, 1),
							ThreeUtil.getTypeSafe(this.thetaSegments, 8),
							ThreeUtil.getTypeSafe(this.phiSegments, 1),
							ThreeUtil.getAngleSafe(this.thetaStart, 0),
							ThreeUtil.getAngleSafe(this.thetaLength, 360)
						);
						break;
					case 'ringdepthbuffergeometry':
					case 'ringdepthgeometry':
					case 'ringdepthbuffer':
					case 'ringdepth':
						geometry = new NgxRingDepthGeometry(
							ThreeUtil.getTypeSafe(this.innerRadius, 0.5),
							ThreeUtil.getTypeSafe(this.outerRadius, 1),
							ThreeUtil.getTypeSafe(this.depth, 1),
							ThreeUtil.getTypeSafe(this.thetaSegments, 8),
							ThreeUtil.getTypeSafe(this.phiSegments, 1),
							ThreeUtil.getAngleSafe(this.thetaStart, 0),
							ThreeUtil.getAngleSafe(this.thetaLength, 360),
							ThreeUtil.getTypeSafe(this.depthRate, 1)
						);
						break;
					case 'spherebuffergeometry':
					case 'spheregeometry':
					case 'spherebuffer':
					case 'sphere':
						geometry = new THREE_GEO.NgxSphereBufferGeometry(
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 8),
							ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 6),
							ThreeUtil.getAngleSafe(this.phiStart, 0),
							ThreeUtil.getAngleSafe(this.phiLength, 360),
							ThreeUtil.getAngleSafe(this.thetaStart, 0),
							ThreeUtil.getAngleSafe(this.thetaLength, 180)
						);
						break;
					case 'tetrahedronbuffergeometry':
					case 'tetrahedrongeometry':
					case 'tetrahedronbuffer':
					case 'tetrahedron':
						geometry = new THREE_GEO.NgxTetrahedronBufferGeometry(
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(this.detail, 0)
						);
						break;
					case 'textbuffergeometry':
					case 'textgeometry':
					case 'textbuffer':
					case 'text':
						geometry = new THREE_GEO.NgxBufferGeometry();
						this.getFont('helvetiker', (font: Font) => {
							const textParameters: THREE_GEO.TextGeometryParameters = {
								font: font,
								size: ThreeUtil.getTypeSafe(this.size, 1),
								height: ThreeUtil.getTypeSafe(this.height, this.width),
								curveSegments: ThreeUtil.getTypeSafe(
									this.curveSegments,
									this.segments
								),
								bevelEnabled: ThreeUtil.getTypeSafe(this.bevelEnabled),
								bevelThickness: ThreeUtil.getTypeSafe(this.bevelThickness),
								bevelSize: ThreeUtil.getTypeSafe(this.bevelSize),
								bevelOffset: ThreeUtil.getTypeSafe(this.bevelOffset),
								bevelSegments: ThreeUtil.getTypeSafe(this.bevelSegments),
							};
							switch (this.type.toLowerCase()) {
								case 'textbuffergeometry':
								case 'textgeometry':
								case 'textbuffer':
								case 'text':
								default:
									this.setGeometry(
										new THREE_GEO.NgxTextGeometry(
											ThreeUtil.getTypeSafe(this.text, 'test'),
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
						geometry = new THREE_GEO.NgxTorusBufferGeometry(
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(this.tube, 0.4),
							ThreeUtil.getTypeSafe(
								this.radialSegments,
								this.radiusSegments,
								8
							),
							ThreeUtil.getTypeSafe(this.tubularSegments, 6),
							ThreeUtil.getAngleSafe(this.arc, 360)
						);
						break;
					case 'torusknotbuffergeometry':
					case 'torusknotgeometry':
					case 'torusknotbuffer':
					case 'torusknot':
						geometry = new THREE_GEO.NgxTorusKnotBufferGeometry(
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(this.tube, 0.4),
							ThreeUtil.getTypeSafe(
								this.radialSegments,
								this.radiusSegments,
								64
							),
							ThreeUtil.getTypeSafe(this.tubularSegments, 8),
							ThreeUtil.getTypeSafe(this.p, 2),
							ThreeUtil.getTypeSafe(this.q, 3)
						);
						break;
					case 'tubebuffergeometry':
					case 'tubegeometry':
					case 'tubebuffer':
					case 'tube':
						geometry = new THREE_GEO.NgxTubeBufferGeometry(
							this.getCurve(),
							ThreeUtil.getTypeSafe(this.tubularSegments, 64),
							ThreeUtil.getTypeSafe(this.radius, 1),
							ThreeUtil.getTypeSafe(
								this.radiusSegments,
								this.radialSegments,
								8
							),
							ThreeUtil.getTypeSafe(this.closed, false)
						);
						break;
					case 'convexbuffergeometry':
					case 'convexgeometry':
					case 'convexbuffer':
					case 'convex':
						geometry = new THREE_GEO.NgxConvexGeometry(this.getPointsV3([]));
						break;
					case 'decalbuffergeometry':
					case 'decalgeometry':
					case 'decalbuffer':
					case 'decal':
						geometry = new THREE_GEO.NgxDecalGeometry(
							this.getMesh(),
							this.getPositionV3(),
							this.getOrientation(),
							this.getSizeV3()
						);
						break;
					case 'treesgeometry':
					case 'trees':
						geometry = new THREE_GEO.NgxRollerCoasterTreesGeometry(
							this.getMesh()
						);
						break;
					case 'skygeometry':
					case 'sky':
						geometry = new THREE_GEO.NgxRollerCoasterSkyGeometry(null, null);
						break;
					case 'rollercoastergeometry':
					case 'rollercoaster':
						geometry = new THREE_GEO.NgxRollerCoasterGeometry(
							this.getCurve(),
							ThreeUtil.getTypeSafe(this.slices, 1500)
						);
						break;
					case 'rollercoasterliftersgeometry':
					case 'rollercoasterlifters':
						geometry = new THREE_GEO.NgxRollerCoasterLiftersGeometry(
							this.getCurve(),
							ThreeUtil.getTypeSafe(this.slices, 1500)
						);
						break;
					case 'rollercoastershadowgeometry':
					case 'rollercoastershadow':
						geometry = new THREE_GEO.NgxRollerCoasterShadowGeometry(
							this.getCurve(),
							ThreeUtil.getTypeSafe(this.slices, 1500)
						);
						break;
					case 'lightning':
					case 'lightningstrike':
						geometry = new THREE_GEO.NgxLightningStrikeGeometry(
							this.rayParams
						) as any;
						break;
					default:
						geometry = new THREE_GEO.NgxPlaneBufferGeometry(
							ThreeUtil.getTypeSafe(this.width, this.height, 1),
							ThreeUtil.getTypeSafe(this.height, this.width, 1),
							ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1),
							ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1)
						);
						break;
				}
			}
			this.setGeometry(geometry);
		}
		return this.geometry as T;
	}
}
