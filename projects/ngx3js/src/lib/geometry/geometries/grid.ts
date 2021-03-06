import { N3JS, I3JS, NgxThreeUtil } from '../../interface';

/**
 * The Grid geometry.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxGridGeometry) page for details.
 * See the [ngx geometey](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_geometry/GridGeometry) page for a live demo.
 *
 */
export class NgxGridGeometry extends N3JS.BufferGeometry {
	/**
	 * The Parameters of grid geometry
	 */
	public parameters: {
		width: number;
		height: number;
		widthSegments: number;
		heightSegments: number;
	};

	/**
	 * @param [width=1]
	 * @param [height=1]
	 * @param [depth=1]
	 * @param [widthSegments=1]
	 * @param [heightSegments=1]
	 */
	constructor(
		width: number = 1,
		height: number = 1,
		depth: number = 0,
		widthSegments: number = 1,
		heightSegments: number = 1,
		colorW: I3JS.Color = null,
		colorH: I3JS.Color = null
	) {
		super();
		this.type = 'GridGeometry';
		widthSegments = Math.max(1, widthSegments);
		width = Math.max(1, width);
		heightSegments = Math.max(1, heightSegments);
		height = Math.max(1, height);
		depth = Math.max(0, depth);
		if (NgxThreeUtil.isNull(colorW)) {
			colorW = new N3JS.Color(0x444444);
		}
		if (NgxThreeUtil.isNull(colorH)) {
			colorH = new N3JS.Color(0x888888);
		}
		this.parameters = {
			width: width,
			widthSegments: widthSegments,
			height: height,
			heightSegments: heightSegments,
		};
		const stepX = width / widthSegments;
		const halfSizeX = width / 2;
		const stepY = height / heightSegments;
		const halfSizeY = height / 2;
		const vertices: number[] = [],
			colors: number[] = [];
		let j = 0;
		for (let i = 0, k = -halfSizeY; i <= heightSegments; i++, k += stepY) {
			vertices.push(
				-halfSizeX,
				k,
				depth,
				-halfSizeX,
				k,
				0,
				-halfSizeX,
				k,
				0,
				halfSizeX,
				k,
				0
			);
			colorW.toArray(colors, j);
			j += 3;
			colorW.toArray(colors, j);
			j += 3;
			colorW.toArray(colors, j);
			j += 3;
			colorW.toArray(colors, j);
			j += 3;
		}
		for (let i = 0, k = -halfSizeX; i <= widthSegments; i++, k += stepX) {
			vertices.push(k, -halfSizeY, 0, k, halfSizeY, 0);
			colorH.toArray(colors, j);
			j += 3;
			colorH.toArray(colors, j);
			j += 3;
		}
		this.setAttribute(
			'position',
			new N3JS.Float32BufferAttribute(vertices, 3)
		);
		this.setAttribute('color', new N3JS.Float32BufferAttribute(colors, 3));
	}
}
