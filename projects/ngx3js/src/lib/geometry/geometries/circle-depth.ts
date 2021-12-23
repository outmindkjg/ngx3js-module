import { N3JS, I3JS, NgxThreeUtil } from '../../interface';
import { NgxGeometryUtils } from '../geometryUtils';

/**
 * The Circle Depth geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxCircleDepthGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/CircleDepthGeometry) page for a live demo.
 *
 */
export class NgxCircleDepthGeometry extends N3JS.BufferGeometry {
	/**
	 * @default 'CircleDepthGeometry'
	 */
	type: string = 'CircleDepthGeometry';

	/**
	 * The Parameters of circle depth geometry
	 */
	parameters: {
		radius: number;
		depth: number;
		segments: number;
		thetaStart: number;
		thetaLength: number;
		depthRate: number;
	};

	/**
	 * @param [radius=1]
	 * @param [depth=1]
	 * @param [segments=8]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 * @param [depthRate=1]
	 */
	constructor(
		radius: number = 1,
		depth: number = 1,
		segments: number = 8,
		thetaStart: number = 0,
		thetaLength: number = Math.PI * 2,
		depthRate: number = 1
	) {
		super();
		depth = Math.max(0.001, depth);
		this.parameters = {
			radius: radius,
			depth: depth,
			segments: segments,
			thetaStart: thetaStart,
			thetaLength: thetaLength,
			depthRate: depthRate,
		};
		const halfDepth = depth / 2;
		const frontGeometry = new N3JS.CircleBufferGeometry(
			radius,
			segments,
			thetaStart,
			thetaLength
		);
		frontGeometry.translate(0, 0, halfDepth);
		const backGeometry = NgxGeometryUtils.getFlipGeometry(frontGeometry);
		const vertices = [];
		const normals = [];
		const uvs = [];
		const indices = [];
		let groupStart = 0;
		let groupEnd = 0;

		let attribute: ArrayLike<number> = null;
		const positionSize = frontGeometry.getAttribute('position').count;
		attribute = frontGeometry.getAttribute('position').array;
		const frontVertices = [];
		const backVertices = [];
		for (let i = 0; i < attribute.length; i++) {
			vertices.push(attribute[i]);
			frontVertices.push(attribute[i]);
		}
		attribute = backGeometry.getAttribute('position').array;
		for (let i = 0; i < attribute.length; i++) {
			vertices.push(attribute[i]);
			backVertices.push(attribute[i]);
		}
		vertices.push(...frontVertices);
		vertices.push(...backVertices);
		attribute = frontGeometry.getAttribute('normal').array;
		for (let i = 0; i < attribute.length; i++) {
			normals.push(attribute[i]);
		}
		attribute = backGeometry.getAttribute('normal').array;
		for (let i = 0; i < attribute.length; i++) {
			normals.push(attribute[i]);
		}
		attribute = frontGeometry.getAttribute('uv').array;
		for (let i = 0; i < attribute.length; i++) {
			uvs.push(attribute[i]);
		}
		attribute = backGeometry.getAttribute('uv').array;
		for (let i = 0; i < attribute.length; i++) {
			uvs.push(attribute[i]);
		}
		const attrPosition = frontGeometry.getAttribute('position');
		const vertex = new N3JS.Vector3(0, 0, 0);
		const sideNormals = [];
		const sideUvsFront = [];
		const sideUvsBack = [];
		const uvDepth = depth / (Math.PI * 2 * radius);
		for (let i = 0; i < attrPosition.count; i++) {
			vertex.x = attrPosition.getX(i);
			vertex.y = attrPosition.getY(i);
			vertex.z = 0;
			const angle = Math.atan2(vertex.x, vertex.y) / Math.PI;
			sideUvsFront.push(angle, 0.5 - uvDepth);
			sideUvsBack.push(angle, 0.5 + uvDepth);
			vertex.normalize();
			sideNormals.push(vertex.x, vertex.y, 0);
		}
		if (depthRate !== 1) {
			let x = 0;
			let y = 0;
			let z = 0;
			let vector2 = new N3JS.Vector2();
			for (let i = 0; i < vertices.length; i += 3) {
				x = vertices[i];
				y = vertices[i + 1];
				z = vertices[i + 2];
				vector2.x = x;
				vector2.y = y;
				const rate = (vector2.length() / radius) * (1 - depthRate);
				vertices[i + 2] += -z * rate;
			}
		}
		normals.push(...sideNormals);
		normals.push(...sideNormals);
		uvs.push(...sideUvsFront);
		uvs.push(...sideUvsBack);
		this.clearGroups();
		attribute = frontGeometry.getIndex().array;
		for (let i = 0; i < attribute.length; i++) {
			indices.push(attribute[i]);
			groupEnd++;
		}
		this.addGroup(groupStart, groupEnd - groupStart, 0);
		groupStart = groupEnd;
		attribute = backGeometry.getIndex().array;
		for (let i = 0; i < attribute.length; i++) {
			indices.push(attribute[i] + positionSize);
			groupEnd++;
		}
		this.addGroup(groupStart, groupEnd - groupStart, 1);
		groupStart = groupEnd;
		const frontIdx = positionSize * 2;
		const backIdx = positionSize * 3;
		const isClosed = thetaLength >= Math.PI * 2 ? true : false;
		for (
			let i = isClosed ? 1 : 0;
			i < (isClosed ? positionSize - 1 : positionSize);
			i++
		) {
			const topIdx = (i + 1) % positionSize;
			indices.push(frontIdx + topIdx, frontIdx + i, backIdx + i);
			indices.push(backIdx + i, backIdx + topIdx, frontIdx + topIdx);
			groupEnd += 6;
		}
		this.addGroup(groupStart, groupEnd - groupStart, 2);
		groupStart = groupEnd;
		this.setIndex(indices);
		this.setAttribute(
			'position',
			new N3JS.Float32BufferAttribute(vertices, 3)
		);
		this.setAttribute('normal', new N3JS.Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new N3JS.Float32BufferAttribute(uvs, 2));
		this.computeVertexNormals();
	}
}
