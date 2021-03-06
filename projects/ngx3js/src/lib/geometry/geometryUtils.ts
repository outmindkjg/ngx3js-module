import { N3JS, I3JS } from '../interface';

export type GeometryFunctionType = (
	geometry: I3JS.BufferGeometry,
	options?: any
) => I3JS.BufferGeometry;

const GeometryConf: {
	[key: string]: GeometryFunctionType | string;
} = {};

GeometryConf.rainbowcolor1 = (
	geometry: I3JS.BufferGeometry,
	options?: any
) => {
	const count = geometry.attributes.position.count;
	const radius = NgxGeometryUtils.getGeometryRadius(geometry, options);
	geometry.setAttribute(
		'color',
		new N3JS.BufferAttribute(new Float32Array(count * 3), 3)
	);
	const color = new N3JS.Color();
	const positions = geometry.attributes.position;
	const colors = geometry.attributes.color;
	for (let i = 0; i < count; i++) {
		color.setHSL((positions.getY(i) / radius + 1) / 2, 1.0, 0.5);
		colors.setXYZ(i, color.r, color.g, color.b);
	}
	return geometry;
};
GeometryConf.rainbow = 'rainbowcolor1';
GeometryConf.rainbow1 = 'rainbowcolor1';
GeometryConf.rainbowcolor2 = (
	geometry: I3JS.BufferGeometry,
	options?: any
) => {
	const count = geometry.attributes.position.count;
	const radius = NgxGeometryUtils.getGeometryRadius(geometry, options);
	geometry.setAttribute(
		'color',
		new N3JS.BufferAttribute(new Float32Array(count * 3), 3)
	);
	const color = new N3JS.Color();
	const positions = geometry.attributes.position;
	const colors = geometry.attributes.color;
	for (let i = 0; i < count; i++) {
		color.setHSL(0, (positions.getY(i) / radius + 1) / 2, 0.5);
		colors.setXYZ(i, color.r, color.g, color.b);
	}
	return geometry;
};
GeometryConf.rainbow2 = 'rainbowcolor2';
GeometryConf.rainbowcolor3 = (
	geometry: I3JS.BufferGeometry,
	options?: any
) => {
	const count = geometry.attributes.position.count;
	const radius = NgxGeometryUtils.getGeometryRadius(geometry, options);
	geometry.setAttribute(
		'color',
		new N3JS.BufferAttribute(new Float32Array(count * 3), 3)
	);
	const color = new N3JS.Color();
	const positions = geometry.attributes.position;
	const colors = geometry.attributes.color;
	for (let i = 0; i < count; i++) {
		color.setRGB(1, 0.8 - (positions.getY(i) / radius + 1) / 2, 0);
		colors.setXYZ(i, color.r, color.g, color.b);
	}
	return geometry;
};
GeometryConf.rainbow3 = 'rainbowcolor3';

GeometryConf.terrainsin = (geometry: I3JS.BufferGeometry, options?: any) => {
	switch (geometry.type) {
		case 'PlaneGeometry':
			geometry.rotateX(-Math.PI / 2);
			break;
	}
	const positions = geometry.getAttribute('position') as I3JS.BufferAttribute;
	const count = positions.count;
	const radius = NgxGeometryUtils.getGeometryRadius(geometry, options);
	geometry.computeBoundingBox();
	const box = geometry.boundingBox;
	const center = box.min.clone().add(box.max).multiplyScalar(0.2);
	const minHeight = options.minHeight || radius * -0.1;
	const maxHeight = options.maxHeight || radius * 0.3;
	const repeat = options.repeat || 4;
	const hRange = maxHeight - minHeight;
	const distLength = ((Math.PI * 2) / radius) * repeat;
	for (let i = 0; i < count; i++) {
		const x = positions.getX(i) - center.x;
		const z = positions.getZ(i) - center.z;
		const dist = Math.sqrt(x * x + z * z);
		const y =
			positions.getY(i) +
			(Math.sin(dist * distLength) + 0.5) * hRange +
			minHeight;
		positions.setY(i, y);
	}
	positions.needsUpdate = true;
	geometry.computeVertexNormals();
	return geometry;
};

/**
 * Ngx Geometry Utils
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxGeometryUtils) page for details.
 *
 */
export class NgxGeometryUtils {
	/**
	 * Gets geometry radius
	 * @param geometry
	 * @param options
	 * @returns geometry radius
	 */
	public static getGeometryRadius(
		geometry: I3JS.BufferGeometry,
		options: any
	): number {
		let radius = options.radius || 0;
		if (radius <= 0) {
			geometry.computeBoundingSphere();
			radius = geometry.boundingSphere.radius;
		}
		return radius;
	}

	/**
	 * Gets flip geometry
	 *
	 * @param geometry
	 * @param [plane]
	 * @returns flip geometry
	 */
	public static getFlipGeometry(
		geometry: I3JS.BufferGeometry,
		plane: string = 'Z'
	): I3JS.BufferGeometry {
		geometry = geometry.clone();
		const attrVertices = geometry.getAttribute('position');
		const attrUvs = geometry.getAttribute('uv');
		const attrNormals = geometry.getAttribute('normal');
		const attrIndices = geometry.getIndex();
		switch (plane.toUpperCase()) {
			case 'Z':
				for (let i = 0; i < attrVertices.count; i++) {
					attrVertices.setZ(i, attrVertices.getZ(i) * -1);
				}
				for (let i = 0; i < attrUvs.count; i++) {
					attrUvs.setX(i, attrUvs.getX(i) * -1);
				}
				for (let i = 0; i < attrNormals.count; i++) {
					attrNormals.setZ(i, attrNormals.getZ(i) * -1);
				}
				for (let i = 0; i < attrIndices.count; i += 3) {
					let p1 = attrIndices.getX(i + 1);
					let p2 = attrIndices.getX(i + 2);
					attrIndices.setX(i + 1, p2);
					attrIndices.setX(i + 2, p1);
				}
				break;
		}
		return geometry;
	}

	/**
	 * Adds geometry
	 * @param key
	 * @param func
	 * @param [alias]
	 */
	public static addGeometry(
		key: string,
		func: GeometryFunctionType,
		alias?: string[]
	) {
		key = key.toLowerCase();
		if (alias !== null && alias !== undefined) {
			alias.forEach((aliasKey) => {
				if (aliasKey !== null && aliasKey.length > 3) {
					GeometryConf[aliasKey.toLowerCase()] = key;
				}
			});
		}
		GeometryConf[key] = func;
	}

	/**
	 * Gets geometry function
	 * @param key
	 * @returns geometry function
	 */
	public static getGeometryFunction(key: string): GeometryFunctionType {
		key = key.toLowerCase();
		if (GeometryConf[key] !== null && GeometryConf[key] !== undefined) {
			const func = GeometryConf[key.toLowerCase()];
			if (typeof func === 'string') {
				return this.getGeometryFunction(func);
			} else {
				return func;
			}
		} else {
			console.error('unknown curve :' + key);
			return (geometry) => {
				return geometry;
			};
		}
	}

	/**
	 * Gets geometry
	 * @param key
	 * @param geometry
	 * @param [options]
	 * @returns geometry
	 */
	public static getGeometry(
		key: string,
		geometry: I3JS.BufferGeometry,
		options?: any
	): I3JS.BufferGeometry {
		const keyList = key.split(',');
		keyList.forEach((funcName) => {
			const func = this.getGeometryFunction(funcName);
			options = options || {};
			func(geometry, options);
		});
		return geometry;
	}

	/**
	 * @param {BufferGeometry} geometry
	 * @param {number} tolerance
	 * @return {BufferGeometry>}
	 */
	static mergeVertices(
		geometry: I3JS.BufferGeometry,
		tolerance: number = 1e-4
	) {
		switch (geometry.type.toLowerCase()) {
			case 'planegeometry':
				return geometry;
		}
		tolerance = Math.max(tolerance, Number.EPSILON);
		const hashToIndex: any = {};
		const indices = geometry.getIndex();
		const positions = geometry.getAttribute('position');
		const vertexCount = indices ? indices.count : positions.count;
		let nextIndex = 0;
		const attributeNames = Object.keys(geometry.attributes);
		const attrArrays: any = {};
		const morphAttrsArrays: any = {};
		const newIndices = [];
		const getters = ['getX', 'getY', 'getZ', 'getW'];
		for (let i = 0, l = attributeNames.length; i < l; i++) {
			const name = attributeNames[i];
			attrArrays[name] = [];
			var morphAttr = geometry.morphAttributes[name];
			if (morphAttr) {
				const morphAttrsValue = [];
				for (let j = 0; (j = morphAttr.length); i++) {
					morphAttrsValue.push([]);
				}
				morphAttrsArrays[name] = morphAttrsValue;
			}
		}
		const decimalShift = Math.log10(1 / tolerance);
		const shiftMultiplier = Math.pow(10, decimalShift);
		for (let i = 0; i < vertexCount; i++) {
			const index = indices ? indices.getX(i) : i;
			let hash = '';
			for (let j = 0, l = attributeNames.length; j < l; j++) {
				const name = attributeNames[j];
				const attribute: any = geometry.getAttribute(name);
				const itemSize = attribute.itemSize;
				for (let k = 0; k < itemSize; k++) {
					hash += `${~~(attribute[getters[k]](index) * shiftMultiplier)},`;
				}
			}
			if (hash in hashToIndex) {
				newIndices.push(hashToIndex[hash]);
			} else {
				for (var j = 0, l = attributeNames.length; j < l; j++) {
					const name = attributeNames[j];
					const attribute: any = geometry.getAttribute(name);
					const morphAttr: any = geometry.morphAttributes[name];
					const itemSize = attribute.itemSize;
					const newarray = attrArrays[name];
					const newMorphArrays = morphAttrsArrays[name];
					for (let k = 0; k < itemSize; k++) {
						const getterFunc = getters[k];
						newarray.push(attribute[getterFunc](index));
						if (morphAttr) {
							for (let m = 0, ml = morphAttr.length; m < ml; m++) {
								newMorphArrays[m].push(morphAttr[m][getterFunc](index));
							}
						}
					}
				}
				hashToIndex[hash] = nextIndex;
				newIndices.push(nextIndex);
				nextIndex++;
			}
		}
		const result: any = geometry.clone();
		result.type = geometry.type;
		result['parameters'] = geometry.parameters;
		for (let i = 0, l = attributeNames.length; i < l; i++) {
			const name = attributeNames[i];
			const oldAttribute = geometry.getAttribute(name);
			const constructor = oldAttribute.array.constructor as any;
			const buffer = new constructor(attrArrays[name]);
			const attribute = new N3JS.BufferAttribute(
				buffer,
				oldAttribute.itemSize,
				oldAttribute.normalized
			);
			result.setAttribute(name, attribute);
		}
		result.setIndex(newIndices);
		return result;
	}
}
