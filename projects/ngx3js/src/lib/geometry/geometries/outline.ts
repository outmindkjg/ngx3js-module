import { N3JS, I3JS, NgxThreeUtil } from '../../interface';

/**
 * The Outline geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxOutlineGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/OutlineGeometry) page for a live demo.
 *
 */
export class NgxOutlineGeometry extends N3JS.WireframeGeometry {
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [segments=5]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	constructor(geometry: I3JS.BufferGeometry, scale: number = 1) {
		super(geometry);
		this.type = 'OutlineGeometry';
		if (scale !== 1) {
			this.scale(scale, scale, scale);
		}
		const vertices: number[] = [];
		const attrPosition = this.getAttribute('position');
		const parameters: any = geometry.parameters || {};
		switch (geometry.type) {
			case 'StarGeometry':
			case 'CircleGeometry':
				vertices.push(attrPosition.getX(0), attrPosition.getY(0), attrPosition.getZ(0));
				vertices.push(attrPosition.getX(1), attrPosition.getY(1), attrPosition.getZ(1));
				for (let i = 6; i < attrPosition.count; i += 4) {
					vertices.push(attrPosition.getX(i), attrPosition.getY(i), attrPosition.getZ(i));
					vertices.push(attrPosition.getX(i + 1), attrPosition.getY(i + 1), attrPosition.getZ(i + 1));
				}
				if (parameters.thetaLength < Math.PI * 2) {
					vertices.push(attrPosition.getX(0), attrPosition.getY(0), attrPosition.getZ(0));
					vertices.push(attrPosition.getX(2), attrPosition.getY(2), attrPosition.getZ(2));
					const endIdx = attrPosition.count - 1;
					vertices.push(attrPosition.getX(endIdx), attrPosition.getY(endIdx), attrPosition.getZ(endIdx));
					vertices.push(attrPosition.getX(2), attrPosition.getY(2), attrPosition.getZ(2));
				}
				break;
			case 'RingGeometry':
				{
					let thetaSegments = parameters.thetaSegments;
					thetaSegments = Math.max(3, thetaSegments);
					const outerRadius = parameters.outerRadius * scale;
					const innerRadius = (parameters.innerRadius * 1) / scale;
					const thetaStart = parameters.thetaStart;
					const thetaLength = parameters.thetaLength;
					const vertex = new N3JS.Vector3();
					for (let i = 0; i < thetaSegments; i++) {
						const segmentStart = thetaStart + (i / thetaSegments) * thetaLength;
						vertex.x = outerRadius * Math.cos(segmentStart);
						vertex.y = outerRadius * Math.sin(segmentStart);
						vertices.push(vertex.x, vertex.y, vertex.z);
						const segmentEnd = thetaStart + ((i + 1) / thetaSegments) * thetaLength;
						vertex.x = outerRadius * Math.cos(segmentEnd);
						vertex.y = outerRadius * Math.sin(segmentEnd);
						vertices.push(vertex.x, vertex.y, vertex.z);
					}
					for (let i = thetaSegments; i > 0; i--) {
						const segmentStart = thetaStart + (i / thetaSegments) * thetaLength;
						vertex.x = innerRadius * Math.cos(segmentStart);
						vertex.y = innerRadius * Math.sin(segmentStart);
						vertices.push(vertex.x, vertex.y, vertex.z);
						const segmentEnd = thetaStart + ((i - 1) / thetaSegments) * thetaLength;
						vertex.x = innerRadius * Math.cos(segmentEnd);
						vertex.y = innerRadius * Math.sin(segmentEnd);
						vertices.push(vertex.x, vertex.y, vertex.z);
					}
					if (parameters.thetaLength < Math.PI * 2) {
						const idx1 = (thetaSegments * 2 - 1) * 3;
						vertices.push(vertices[idx1 + 0], vertices[idx1 + 1], vertices[idx1 + 2]);
						vertices.push(vertices[idx1 + 3], vertices[idx1 + 4], vertices[idx1 + 5]);
						const idx2 = (thetaSegments * 4 - 1) * 3;
						vertices.push(vertices[idx2 + 0], vertices[idx2 + 1], vertices[idx2 + 2]);
						vertices.push(vertices[0], vertices[1], vertices[2]);
					}
				}
				break;
			case 'BoxGeometry':
				{
					const width_half = (parameters.width / 2) * scale;
					const height_half = (parameters.height / 2) * scale;
					const depth_half = (parameters.depth / 2) * scale;
					const p1 = new N3JS.Vector3(-width_half, height_half, -depth_half);
					const p2 = new N3JS.Vector3(-width_half, -height_half, -depth_half);
					const p3 = new N3JS.Vector3(width_half, -height_half, -depth_half);
					const p4 = new N3JS.Vector3(width_half, height_half, -depth_half);
					const p5 = new N3JS.Vector3(-width_half, height_half, depth_half);
					const p6 = new N3JS.Vector3(-width_half, -height_half, depth_half);
					const p7 = new N3JS.Vector3(width_half, -height_half, depth_half);
					const p8 = new N3JS.Vector3(width_half, height_half, depth_half);
					vertices.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
					vertices.push(p2.x, p2.y, p2.z, p3.x, p3.y, p3.z);
					vertices.push(p3.x, p3.y, p3.z, p4.x, p4.y, p4.z);
					vertices.push(p4.x, p4.y, p4.z, p1.x, p1.y, p1.z);
					vertices.push(p5.x, p5.y, p5.z, p6.x, p6.y, p6.z);
					vertices.push(p6.x, p6.y, p6.z, p7.x, p7.y, p7.z);
					vertices.push(p7.x, p7.y, p7.z, p8.x, p8.y, p8.z);
					vertices.push(p8.x, p8.y, p8.z, p5.x, p5.y, p5.z);
					vertices.push(p1.x, p1.y, p1.z, p5.x, p5.y, p5.z);
					vertices.push(p2.x, p2.y, p2.z, p6.x, p6.y, p6.z);
					vertices.push(p3.x, p3.y, p3.z, p7.x, p7.y, p7.z);
					vertices.push(p4.x, p4.y, p4.z, p8.x, p8.y, p8.z);
				}
				break;
			case 'PlaneGeometry':
				{
					const width_half = (parameters.width / 2) * scale;
					const height_half = (parameters.height / 2) * scale;
					const p1 = new N3JS.Vector3(-width_half, height_half, 0);
					const p2 = new N3JS.Vector3(-width_half, -height_half, 0);
					const p3 = new N3JS.Vector3(width_half, -height_half, 0);
					const p4 = new N3JS.Vector3(width_half, height_half, 0);
					vertices.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
					vertices.push(p2.x, p2.y, p2.z, p3.x, p3.y, p3.z);
					vertices.push(p3.x, p3.y, p3.z, p4.x, p4.y, p4.z);
					vertices.push(p4.x, p4.y, p4.z, p1.x, p1.y, p1.z);
				}
				break;
			case 'SphereGeometry':
				{
					const p1 = new N3JS.Vector3();
					const p2 = new N3JS.Vector3();
					const zero = new N3JS.Vector3(0, 0, 0);
					const plane = new N3JS.Plane();
					for (let i = 0; i < attrPosition.count; i += 2) {
						p1.set(attrPosition.getX(i), attrPosition.getY(i), attrPosition.getZ(i));
						p2.set(attrPosition.getX(i + 1), attrPosition.getY(i + 1), attrPosition.getZ(i + 1));
						plane.setFromCoplanarPoints(p1, p2, zero);
						if (this.isZero(p1.y - p2.y) || this.isZero(plane.normal.x) || this.isZero(plane.normal.y)) {
							vertices.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
						}
					}
				}
				break;
			default:
				for (let i = 0; i < attrPosition.count; i += 2) {
					console.log(
						i,
						attrPosition.getX(i).toFixed(2),
						attrPosition.getY(i).toFixed(2),
						attrPosition.getX(i + 1).toFixed(2),
						attrPosition.getY(i + 1).toFixed(2)
					);
				}
				break;
		}
		if (vertices.length > 0) {
			this.setAttribute('position', new N3JS.Float32BufferAttribute(vertices, 3));
		}
	}

	private isZero(v: number) {
		return Math.round(v * 10000) === 0;
	}
}
