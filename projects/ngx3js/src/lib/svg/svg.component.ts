import { Component, ContentChildren, ElementRef, forwardRef, Input, QueryList, SimpleChanges } from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { NgxLocalStorageService } from '../local-storage.service';
import { INgxVector, ISvgGeometry } from '../ngx-interface';
import { NgxAbstractObject3dComponent } from '../object3d.abstract';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxTranslationComponent } from '../translation/translation.component';

/**
 * The Svg component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SvgComponent) page for details.
 *
 * ```html
 * <ngx3js-geometry
 * 	[type]="'Extrude'"
 * 	[depth]="map.depth" [steps]="1" [bevelEnabled]="false"
 * >
 * 	<ngx3js-svg [path]="map.path"></ngx3js-svg>
 * </ngx3js-geometry>
 * <ngx3js-mesh>
 * 	<ngx3js-svg
 * 		[type]="'line'"
 * 		[geometryType]="'buffer'"
 * 		[text]="'   Three.js\nSimple text.'"
 * 		[align]="'center'"
 * 		[font]="'helvetiker'"
 * 		[weight]="'regular'"
 * 		[size]="100"
 * 	>
 * 		<ngx3js-material
 * 			[type]="'LineBasic'"
 * 			[color]="'0x006699'"
 * 			[side]="'double'"
 * 		></ngx3js-material>
 * 	</ngx3js-svg>
 * </ngx3js-mesh>
 * ```
 */
@Component({
	selector: 'ngx3js-svg',
	templateUrl: './svg.component.html',
	styleUrls: ['./svg.component.scss'],
	providers: [
		{
			provide: NgxAbstractObject3dComponent,
			useExisting: forwardRef(() => NgxSvgComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxSvgComponent),
		},
	],
})
export class NgxSvgComponent extends NgxAbstractObject3dComponent {
	/**
	 * The type of svg component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public type: string = 'mesh';

	/**
	 * The geometryType of svg component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public geometryType: string = 'shape';

	/**
	 * The name of the object (doesn't need to be unique). Default is an empty string.
	 */
	@Input() public name: string = null;

	/**
	 * The url of svg component
	 */
	@Input() public url: string = null;

	/**
	 * The path of svg component
	 */
	@Input() public path: string = null;

	/**
	 * The curveSegments of svg component
	 */
	@Input() public curveSegments: number = null;

	/**
	 * The depth of svg component
	 */
	@Input() public depth: number = null;

	/**
	 * The steps of svg component
	 */
	@Input() public steps: number = null;

	/**
	 * The bevelEnabled of svg component
	 */
	@Input() public bevelEnabled: boolean = null;

	/**
	 * The bevelThickness of svg component
	 */
	@Input() public bevelThickness: number = null;

	/**
	 * The bevelSize of svg component
	 */
	@Input() public bevelSize: number = null;

	/**
	 * The bevelOffset of svg component
	 */
	@Input() public bevelOffset: number = null;

	/**
	 * The bevelSegments of svg component
	 */
	@Input() public bevelSegments: number = null;

	/**
	 * The closed of svg component
	 */
	@Input() public closed: boolean = null;

	/**
	 * The isCCW of svg component
	 */
	@Input() public isCCW: boolean = null;

	/**
	 * The noHoles of svg component
	 */
	@Input() public noHoles: boolean = null;

	/**
	 * The translation of svg component
	 */
	@Input() public translation: NgxTranslationComponent = null;

	/**
	 * The text of svg component
	 */
	@Input() public text: string = null;

	/**
	 * The textAlign of svg component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public textAlign: string = null;

	/**
	 * The align of svg component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public align: string = null;

	/**
	 * The center of svg component
	 */
	@Input() public center: boolean = false;

	/**
	 * The computeVertexNormals of svg component
	 */
	@Input() public computeVertexNormals: boolean = false;

	/**
	 * The font of svg component
	 */
	@Input() public font: string = null;

	/**
	 * The size of svg component
	 */
	@Input() public size: number = null;

	/**
	 * The weight of svg component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public weight: string = null;

	/**
	 * The color of svg component
	 */
	@Input() public color: string | number = null;

	/**
	 * The opacity of svg component
	 */
	@Input() public opacity: number = null;

	/**
	 * The transparent of svg component
	 */
	@Input() public transparent: boolean = null;

	/**
	 * The wireframe of svg component
	 */
	@Input() public wireframe: boolean = null;

	/**
	 * The shininess of svg component
	 */
	@Input() public shininess: number = null;

	/**
	 * The stroke of svg component
	 */
	@Input() public stroke: number = null;

	/**
	 * The extrudePath of svg component
	 */
	@Input() public extrudePath: INgxVector[] = null;

	/**
	 * The extrudePathType of svg component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public extrudePathType: string = null;

	/**
	 * The curvePath of svg component
	 */
	@Input() public curvePath: INgxVector[] = null;

	/**
	 * The curvePathType of svg component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public curvePathType: string = null;

	/**
	 * The curveType of svg component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public curveType: string = null;

	/**
	 * The tension of svg component
	 */
	@Input() public tension: number = null;

	/**
	 * The uVGenerator of svg component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public uVGenerator: string = null;

	/**
	 * Content children of svg component
	 */
	@ContentChildren(NgxTranslationComponent, { descendants: false }) private translationList: QueryList<NgxTranslationComponent>;

	/**
	 * Mesh positions of svg component
	 */
	private meshPositions: I3JS.Vector3[] = [];

	/**
	 * Mesh rotations of svg component
	 */
	private meshRotations: I3JS.Euler[] = [];

	/**
	 * Mesh scales of svg component
	 */
	private meshScales: I3JS.Vector3[] = [];

	/**
	 * Mesh translations of svg component
	 */
	private meshTranslations: I3JS.BufferGeometry[] = [];

	/**
	 * Mesh materials of svg component
	 */
	private meshMaterials: I3JS.Material[] = [];

	/**
	 * Creates an instance of svg component.
	 * @param ele
	 * @param localStorageService
	 */
	constructor(private ele: ElementRef, private localStorageService: NgxLocalStorageService) {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('svg');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy() {
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
		if (changes && this.meshes) {
			this.addChanges(changes);
			// this.resetMeshes(); todo
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(this.translationList, 'translationList', 'translation');
		super.ngAfterContentInit();
	}

	/**
	 * Gets curve segments
	 * @param [def]
	 * @returns curve segments
	 */
	private getCurveSegments(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.curveSegments, def);
	}

	/**
	 * Gets depth
	 * @param [def]
	 * @returns depth
	 */
	private getDepth(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.depth, def);
	}

	/**
	 * Gets steps
	 * @param [def]
	 * @returns steps
	 */
	private getSteps(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.steps, def);
	}

	/**
	 * Gets bevel enabled
	 * @param [def]
	 * @returns true if bevel enabled
	 */
	private getBevelEnabled(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.bevelEnabled, def);
	}

	/**
	 * Gets bevel thickness
	 * @param [def]
	 * @returns bevel thickness
	 */
	private getBevelThickness(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.bevelThickness, def);
	}

	/**
	 * Gets bevel size
	 * @param [def]
	 * @returns bevel size
	 */
	private getBevelSize(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.bevelSize, def);
	}

	/**
	 * Gets bevel offset
	 * @param [def]
	 * @returns bevel offset
	 */
	private getBevelOffset(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.bevelOffset, def);
	}

	/**
	 * Gets bevel segments
	 * @param [def]
	 * @returns bevel segments
	 */
	private getBevelSegments(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.bevelSegments, def);
	}

	/**
	 * Gets is ccw
	 * @param [def]
	 * @returns true if is ccw
	 */
	private getIsCCW(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.isCCW, def);
	}

	/**
	 * Gets no holes
	 * @param [def]
	 * @returns true if no holes
	 */
	private getNoHoles(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.noHoles, def);
	}

	/**
	 * Gets text
	 * @param [def]
	 * @returns text
	 */
	private getText(def?: string): string {
		return NgxThreeUtil.getTypeSafe(this.text, def);
	}

	/**
	 * Gets text align
	 * @param [def]
	 * @returns text align
	 */
	private getTextAlign(def?: string): string {
		return NgxThreeUtil.getTypeSafe(this.textAlign, this.align, def);
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
	 * Gets size
	 * @param [def]
	 * @returns size
	 */
	private getSize(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.size, def);
	}

	/**
	 * Gets closed
	 * @param [def]
	 * @returns true if closed
	 */
	private getClosed(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.closed, def);
	}

	/**
	 * Gets shininess
	 * @param [def]
	 * @returns shininess
	 */
	private getShininess(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.shininess, def);
	}

	/**
	 * Gets color
	 * @param [def]
	 * @returns color
	 */
	private getColor(def?: string | number): I3JS.Color {
		return NgxThreeUtil.getColorSafe(this.color, def);
	}

	/**
	 * Gets opacity
	 * @param [def]
	 * @returns opacity
	 */
	private getOpacity(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.opacity, def);
	}

	/**
	 * Gets transparent
	 * @param [def]
	 * @returns true if transparent
	 */
	private getTransparent(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.transparent, def);
	}

	/**
	 * Gets wireframe
	 * @param [def]
	 * @returns true if wireframe
	 */
	private getWireframe(def?: boolean): boolean {
		return NgxThreeUtil.getTypeSafe(this.wireframe, def);
	}

	/**
	 * Gets extrude path
	 * @returns extrude path
	 */
	private getExtrudePath(): I3JS.Curve<I3JS.Vector3> {
		if (NgxThreeUtil.isNotNull(this.extrudePath) || NgxThreeUtil.isNotNull(this.curvePath)) {
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
			switch (NgxThreeUtil.getTypeSafe(this.extrudePathType, this.curvePathType, 'catmullromcurve3').toLowerCase()) {
				case 'catmullromcurve3':
				default:
					return new N3JS.CatmullRomCurve3(
						vectors,
						this.getClosed(false),
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
	 * Gets materials
	 * @returns materials
	 */
	private getSvgMaterials(): I3JS.Material[] {
		const materials: I3JS.Material[] = [];
		if (this.materialList !== null && this.materialList.length > 0) {
			this.materialList.forEach((material) => {
				materials.push(material.getMaterial());
			});
		}
		if (materials.length === 0) {
			switch (this.type.toLowerCase()) {
				case 'sprite':
					materials.push(
						new N3JS.SpriteMaterial({
							color: this.getColor(),
							opacity: this.getOpacity(),
							transparent: this.getTransparent(),
							side: N3JS.DoubleSide,
						})
					);
					break;
				case 'points':
					materials.push(
						new N3JS.PointsMaterial({
							color: this.getColor(),
							opacity: this.getOpacity(),
							transparent: this.getTransparent(),
							side: N3JS.DoubleSide,
						})
					);
					break;
				case 'line':
					materials.push(
						new N3JS.MeshBasicMaterial({
							color: this.getColor(),
							opacity: this.getOpacity(),
							side: N3JS.DoubleSide,
						})
					);
					break;
				default:
					materials.push(
						new N3JS.MeshPhongMaterial({
							color: this.getColor(0x333333),
							shininess: this.getShininess(100),
							opacity: this.getOpacity(),
							transparent: this.getTransparent(),
							wireframe: this.getWireframe(),
						})
					);
			}
		}
		return materials;
	}

	/**
	 * Applys changes
	 * @param changes
	 */
	public applyChanges(changes: string[]) {
		if (this.meshes !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, ['translation', 'material']);
			}
			changes.forEach((change) => {
				switch (change) {
					case 'material':
						const mainMaterials = this.meshMaterials;
						if (this.material !== null && this.material.visible) {
							const materialClone = NgxThreeUtil.getMaterialOne(this.material);
							mainMaterials.forEach((material) => {
								if (material !== materialClone) {
									material.copy(materialClone);
								}
							});
						} else {
							this.materialList.forEach((material, idx) => {
								if (material.visible && mainMaterials.length > idx) {
									const materialClone = material.getMaterial();
									if (mainMaterials[idx] !== materialClone) {
										mainMaterials[idx].copy(materialClone);
									}
								}
							});
						}
						break;
					case 'translation':
						if (this.translation !== null) {
							this.meshTranslations.forEach((translation) => {
								translation.applyMatrix4(this.translation.getTranslation());
							});
						} else {
							this.translationList.forEach((translation, idx) => {
								if (this.meshTranslations.length > idx) {
									this.meshTranslations[idx].applyMatrix4(translation.getTranslation());
								}
							});
						}
						break;
				}
			});
		}
		super.applyChanges(changes);
	}

	/**
	 * The Meshes of svg component
	 */
	private meshes: I3JS.Object3D[] = null;

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: I3JS.Object3D): boolean {
		if (super.setParent(parent)) {
			this.meshes = null;
			this.resetMeshes();
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Svg mesh of svg component
	 */
	private svgMesh: I3JS.Group = null;

	/**
	 * Resets meshes
	 */
	public resetMeshes() {
		if (this.parent !== null && (this.svgMesh === null || this._needUpdate)) {
			this.needUpdate = false;
			this.svgMesh = new N3JS.Group();
			this.getPaths((result: ISvgGeometry[]) => {
				this.meshes = [];
				this.meshPositions = [];
				this.meshRotations = [];
				this.meshScales = [];
				this.meshTranslations = [];
				this.meshMaterials = [];
				const materials = this.getSvgMaterials();
				const materialList: I3JS.Material[] = [];
				for (let i = 0; i < result.length; i++) {
					materialList.push(materials[i % materials.length]);
				}
				result.forEach((data, idx) => {
					const geometry = data.geometry;
					let mesh: I3JS.Object3D = null;
					const meshMaterial: I3JS.Material = materialList[idx];
					switch (this.type.toLowerCase()) {
						case 'points':
							mesh = new N3JS.Points(geometry, meshMaterial);
							break;
						case 'line':
							const line = new N3JS.Line(geometry, meshMaterial);
							line.computeLineDistances();
							line.castShadow = this.castShadow;
							mesh = line;
							break;
						default:
							mesh = new N3JS.Mesh(geometry, meshMaterial);
							mesh.castShadow = this.castShadow;
							break;
					}
					this.meshPositions.push(mesh.position);
					this.meshRotations.push(mesh.rotation);
					this.meshScales.push(mesh.scale);
					this.meshTranslations.push(geometry);
					this.meshMaterials.push(meshMaterial);
					this.meshes.push(mesh);
					this.svgMesh.add(mesh);
				});
			});
			this.setObject3d(this.svgMesh);
		}
	}

	/**
	 * Applys text align
	 * @param geometry
	 * @param boundingSphere
	 * @param [def]
	 * @returns text align
	 */
	public applyTextAlign(
		geometry: I3JS.BufferGeometry,
		boundingSphere: I3JS.Sphere,
		def: string = 'left'
	): I3JS.BufferGeometry {
		if (geometry !== null && boundingSphere !== null) {
			switch (this.getTextAlign(def)) {
				case 'left':
					break;
				case 'center':
					geometry.translate(-boundingSphere.radius, 0, 0);
					break;
				case 'right':
					geometry.translate(boundingSphere.radius * 2, 0, 0);
					break;
			}
		}
		return geometry;
	}

	/**
	 * Gets geometries
	 * @param data
	 * @param boundingSphere
	 * @returns geometries
	 */
	private getGeometries(data: I3JS.SVGResult | I3JS.Shape[], boundingSphere: I3JS.Sphere): ISvgGeometry[] {
		const geometries: ISvgGeometry[] = [];
		const shapes: {
			shape: I3JS.Shape[];
			userData: any;
		}[] = [];
		if (data instanceof Array) {
			shapes.push({
				shape: data,
				userData: null,
			});
		} else if (data.paths) {
			data.paths.forEach((path) => {
				shapes.push({
					shape: path.toShapes(this.getIsCCW(true), this.getNoHoles(false)),
					userData: path['userData'] ? path['userData'] : null,
				});
			});
		}
		shapes.forEach((shape) => {
			let geometry: I3JS.BufferGeometry = null;
			switch (this.geometryType.toLowerCase()) {
				case 'extrudebuffer':
				case 'extrude':
					geometry = new N3JS.ExtrudeGeometry(shape.shape, {
						curveSegments: this.getCurveSegments(),
						steps: this.getSteps(),
						depth: this.getDepth(),
						bevelEnabled: this.getBevelEnabled(),
						bevelThickness: this.getBevelThickness(),
						bevelSize: this.getBevelSize(),
						bevelOffset: this.getBevelOffset(),
						bevelSegments: this.getBevelSegments(),
						extrudePath: this.getExtrudePath(),
						UVGenerator: this.getUVGenerator(),
					});
					break;
				case 'custom':
				case 'geometry':
				case 'buffer':
					const holeShape: I3JS.Path[] = [];
					const bufferShapes: I3JS.Shape[] = [];
					shape.shape.forEach((sh) => {
						bufferShapes.push(sh);
					});
					bufferShapes.forEach((sh) => {
						if (sh.holes && sh.holes.length > 0) {
							sh.holes.forEach((hole) => {
								holeShape.push(hole);
							});
						}
					});
					const sumShapes: I3JS.Shape[] = shape.shape;
					sumShapes.push.apply(shape.shape, holeShape as any);
					if (NgxThreeUtil.isNotNull(this.stroke)) {
						const AnySVGLoader = N3JS.SVGLoader;
						const style = AnySVGLoader.getStrokeStyle(this.stroke, this.getColor(0x006699).getStyle());
						sumShapes.forEach((shape) => {
							const outlineGeometry = AnySVGLoader.pointsToStroke(shape.getPoints() as any, style);
							geometries.push({
								geometry: this.applyTextAlign(outlineGeometry, boundingSphere),
								style: null,
							});
						});
					} else {
						sumShapes.forEach((shape) => {
							let outlineGeometry = new N3JS.BufferGeometry();
							outlineGeometry.setFromPoints(shape.getPoints());
							geometries.push({
								geometry: this.applyTextAlign(outlineGeometry, boundingSphere),
								style: null,
							});
						});
					}
					break;
				case 'shapebuffer':
				case 'shape':
				default:
					geometry = new N3JS.ShapeGeometry(shape.shape, this.getCurveSegments(12));
					break;
			}
			if (geometry !== null) {
				geometries.push({
					geometry: this.applyTextAlign(geometry, boundingSphere),
					style: shape.userData,
				});
			}
		});
		return geometries;
	}

	/**
	 * Gets paths
	 * @param onload
	 */
	public getPaths(onload: (geometry: ISvgGeometry[]) => void) {
		if (NgxThreeUtil.isNotNull(this.text) && this.text != '') {
			this.getFont('helvetiker', (font: I3JS.Font) => {
				const shapes = font.generateShapes(this.getText('test'), this.getSize(100));
				const geometry = new N3JS.ShapeGeometry(shapes, this.getCurveSegments(12));
				geometry.computeBoundingSphere();
				onload(this.getGeometries(shapes, geometry.boundingSphere));
			});
		} else {
			this.getSVGResult((data) => {
				const shapes: I3JS.Shape[] = [];
				data.paths.forEach((path: any) => {
					path.toShapes(this.getIsCCW(true), this.getNoHoles(false)).forEach((shape: any) => {
						shapes.push(shape);
					});
				});
				const geometry = new N3JS.ShapeGeometry(shapes, this.getCurveSegments(12));
				geometry.computeBoundingSphere();
				onload(this.getGeometries(data, null));
			});
		}
	}

	/**
	 * Gets svgresult
	 * @param onload
	 */
	public getSVGResult(onload: (data: I3JS.SVGResult) => void) {
		const svgLoader : I3JS.SVGLoader = NgxThreeUtil.getLoader('svgLoader', N3JS.SVGLoader);
		if (NgxThreeUtil.isNotNull(this.url)) {
			svgLoader.load(this.url, (data: I3JS.SVGResult) => {
				onload(data);
			});
		} else if (NgxThreeUtil.isNotNull(this.path) && this.path != '') {
			const svgContents: string[] = [];
			svgContents.push(
				'<svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1152px" height="1152px" xml:space="preserve">'
			);
			svgContents.push('<g>');
			svgContents.push('<path d="' + this.path + '"/>');
			svgContents.push('</g>');
			svgContents.push('</svg>');
			onload(svgLoader.parse(svgContents.join('')));
		} else {
			const svgs = this.ele.nativeElement.getElementsByTagName('svg');
			if (svgs.length > 0) {
				onload(svgLoader.parse(svgs[0].innerHTML.trim()));
			}
		}
	}

	/**
	 * Gets shapes
	 * @param onload
	 */
	public getShapes(onload: (data: I3JS.Shape[]) => void) {
		this.getSVGResult((data: I3JS.SVGResult) => {
			if (data.paths.length > 0) {
				const shapes: I3JS.Shape[] = [];
				data.paths.forEach((path) => {
					path.toShapes(this.getIsCCW(true), this.getNoHoles(false)).forEach((shape) => {
						shapes.push(shape);
					});
				});
				onload(shapes);
			}
		});
	}
}
