import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { TCanvasFunctionType, TDataFunctionType } from '../ngx-interface';

function calc(v: number, scale: number): number {
	return v * scale;
}

const CanvasConf: {
	[key: string]: TCanvasFunctionType;
} = {};

CanvasConf.pacman = (
	ctx: CanvasRenderingContext2D,
	_: string,
	width: number,
	height: number
) => {
	const s = TextureUtils.scale(width, height, 32, 32);
	ctx.translate(calc(-81, s.x), calc(-84, s.y));
	ctx.fillStyle = 'orange';
	ctx.beginPath();
	ctx.moveTo(calc(83, s.x), calc(116, s.y));
	ctx.lineTo(calc(83, s.x), calc(102, s.y));
	ctx.bezierCurveTo(
		calc(83, s.x),
		calc(94, s.y),
		calc(89, s.x),
		calc(88, s.y),
		calc(97, s.x),
		calc(88, s.y)
	);
	ctx.bezierCurveTo(
		calc(105, s.x),
		calc(88, s.y),
		calc(111, s.x),
		calc(94, s.y),
		calc(111, s.x),
		calc(102, s.y)
	);
	ctx.lineTo(calc(111, s.x), calc(116, s.y));
	ctx.lineTo(calc(106.333, s.x), calc(111.333, s.y));
	ctx.lineTo(calc(101.666, s.x), calc(116, s.y));
	ctx.lineTo(calc(97, s.x), calc(111.333, s.y));
	ctx.lineTo(calc(92.333, s.x), calc(116, s.y));
	ctx.lineTo(calc(87.666, s.x), calc(111.333, s.y));
	ctx.lineTo(calc(83, s.x), calc(116, s.y));
	ctx.fill();
	// the eyes
	ctx.fillStyle = 'white';
	ctx.beginPath();
	ctx.moveTo(calc(91, s.x), calc(96, s.y));
	ctx.bezierCurveTo(
		calc(88, s.x),
		calc(96, s.y),
		calc(87, s.x),
		calc(99, s.y),
		calc(87, s.x),
		calc(101, s.y)
	);
	ctx.bezierCurveTo(
		calc(87, s.x),
		calc(103, s.y),
		calc(88, s.x),
		calc(106, s.y),
		calc(91, s.x),
		calc(106, s.y)
	);
	ctx.bezierCurveTo(
		calc(94, s.x),
		calc(106, s.y),
		calc(95, s.x),
		calc(103, s.y),
		calc(95, s.x),
		calc(101, s.y)
	);
	ctx.bezierCurveTo(
		calc(95, s.x),
		calc(99, s.y),
		calc(94, s.x),
		calc(96, s.y),
		calc(91, s.x),
		calc(96, s.y)
	);
	ctx.moveTo(calc(103, s.x), calc(96, s.y));
	ctx.bezierCurveTo(
		calc(100, s.x),
		calc(96, s.y),
		calc(99, s.x),
		calc(99, s.y),
		calc(99, s.x),
		calc(101, s.y)
	);
	ctx.bezierCurveTo(
		calc(99, s.x),
		calc(103, s.y),
		calc(100, s.x),
		calc(106, s.y),
		calc(103, s.x),
		calc(106, s.y)
	);
	ctx.bezierCurveTo(
		calc(106, s.x),
		calc(106, s.y),
		calc(107, s.x),
		calc(103, s.y),
		calc(107, s.x),
		calc(101, s.y)
	);
	ctx.bezierCurveTo(
		calc(107, s.x),
		calc(99, s.y),
		calc(106, s.x),
		calc(96, s.y),
		calc(103, s.x),
		calc(96, s.y)
	);
	ctx.fill();

	// the pupils
	ctx.fillStyle = 'blue';
	ctx.beginPath();
	ctx.arc(
		calc(101, s.x),
		calc(102, s.y),
		calc(2, s.x),
		calc(0, s.y),
		Math.PI * 2,
		true
	);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(
		calc(89, s.x),
		calc(102, s.y),
		calc(2, s.x),
		calc(0, s.y),
		Math.PI * 2,
		true
	);
	ctx.fill();
};
CanvasConf.radialgradient = (
	ctx: CanvasRenderingContext2D,
	_: string,
	width: number,
	height: number
) => {
	const s = TextureUtils.scale(width, height, 16, 16);
	var gradient = ctx.createRadialGradient(
		calc(8, s.x),
		calc(8, s.y),
		0,
		calc(8, s.x),
		calc(8, s.y),
		calc(8, s.x)
	);
	gradient.addColorStop(0, 'rgba(255,255,255,1)');
	gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
	gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
	gradient.addColorStop(1, 'rgba(0,0,0,1)');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, calc(16, s.x), calc(16, s.y));
};

CanvasConf.shadow = (
	ctx: CanvasRenderingContext2D,
	_: string,
	width: number,
	height: number
) => {
	const s = TextureUtils.scale(width, height, 128, 128);
	const gradient = ctx.createRadialGradient(
		calc(64, s.x),
		calc(64, s.y),
		0,
		calc(64, s.x),
		calc(64, s.y),
		calc(64, s.x)
	);
	gradient.addColorStop(0.1, 'rgba(0,0,0,0.15)');
	gradient.addColorStop(1, 'rgba(0,0,0,0)');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, calc(128, s.x), calc(128, s.y));
};
CanvasConf.shadow2 = (
	ctx: CanvasRenderingContext2D,
	_: string,
	width: number,
	height: number
) => {
	const s = TextureUtils.scale(width, height, 128, 128);
	const gradient = ctx.createRadialGradient(
		calc(64, s.x),
		calc(64, s.y),
		0,
		calc(64, s.x),
		calc(64, s.y),
		calc(64, s.x)
	);
	gradient.addColorStop(0.1, 'rgba(130,130,130,1)');
	gradient.addColorStop(1, 'rgba(255,255,255,1)');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, calc(128, s.x), calc(128, s.y));
};
CanvasConf.oblique = (
	ctx: CanvasRenderingContext2D,
	_: string,
	width: number,
	height: number
) => {
	const s = TextureUtils.scale(width, height, 256, 256);
	const image = ctx.getImageData(0, 0, calc(256, s.x), calc(256, s.y));
	let x = 0,
		y = 0;
	const repeat = Math.round(calc(256, s.x));
	for (let i = 0, j = 0, l = image.data.length; i < l; i += 4, j++) {
		x = j % repeat;
		y = x === 0 ? y + 1 : y;
		image.data[i] = 255;
		image.data[i + 1] = 255;
		image.data[i + 2] = 255;
		image.data[i + 3] = Math.floor(x ^ y);
	}
	ctx.putImageData(image, 0, 0);
};

CanvasConf.bgbox = (
	ctx: CanvasRenderingContext2D,
	_: string,
	width: number,
	height: number
) => {
	const s = TextureUtils.scale(width, height, 128, 128);
	ctx.fillStyle = '#ddd';
	ctx.fillRect(0, 0, calc(128, s.x), calc(128, s.y));
	ctx.fillStyle = '#555';
	ctx.fillRect(0, 0, calc(64, s.x), calc(64, s.y));
	ctx.fillStyle = '#999';
	ctx.fillRect(calc(32, s.x), calc(32, s.y), calc(32, s.x), calc(32, s.y));
	ctx.fillStyle = '#555';
	ctx.fillRect(calc(64, s.x), calc(64, s.y), calc(64, s.x), calc(64, s.y));
	ctx.fillStyle = '#777';
	ctx.fillRect(calc(96, s.x), calc(96, s.y), calc(32, s.x), calc(32, s.y));
};

CanvasConf.label = (
	ctx: CanvasRenderingContext2D,
	text: string,
	width: number,
	height: number
) => {
	const s = TextureUtils.scale(width, height, 128, 32);
	ctx.fillStyle = 'rgba( 0, 0, 0, 0.95 )';
	ctx.fillRect(0, 0, calc(128, s.x), calc(32, s.y));
	ctx.fillStyle = 'white';
	ctx.font = calc(12, s.x) + 'pt arial bold';
	ctx.fillText(text || 'test', calc(10, s.x), calc(22, s.y));
};

CanvasConf.labelred = (
	ctx: CanvasRenderingContext2D,
	text: string,
	width: number,
	height: number
) => {
	const s = TextureUtils.scale(width, height, 128, 32);
	ctx.fillStyle = 'rgba( 150, 0, 0, 1 )';
	ctx.fillRect(0, 0, calc(128, s.x), calc(32, s.y));
	ctx.fillStyle = 'white';
	ctx.font = calc(12, s.x) + 'pt arial bold';
	ctx.fillText(text || 'test', calc(8, s.x), calc(22, s.y));
};
CanvasConf.labelgreen = (
	ctx: CanvasRenderingContext2D,
	text: string,
	width: number,
	height: number
) => {
	const s = TextureUtils.scale(width, height, 128, 32);
	ctx.fillStyle = 'rgba( 0, 150, 0, 1 )';
	ctx.fillRect(0, 0, calc(128, s.x), calc(32, s.y));
	ctx.fillStyle = 'white';
	ctx.font = calc(12, s.x) + 'pt arial bold';
	ctx.fillText(text || 'test', calc(8, s.x), calc(22, s.y));
};
CanvasConf.labeltrans = (
	ctx: CanvasRenderingContext2D,
	text: string,
	width: number,
	height: number
) => {
	const s = TextureUtils.scale(width, height, 128, 32);
	ctx.fillStyle = 'rgba( 0, 0, 0, 0 )';
	ctx.fillRect(0, 0, calc(128, s.x), calc(32, s.y));
	ctx.fillStyle = 'white';
	ctx.font = calc(12, s.x) + 'pt arial bold';
	ctx.fillText(text || 'test', calc(8, s.x), calc(22, s.y));
};

CanvasConf.grass = (
	ctx: CanvasRenderingContext2D,
	_: string,
	width: number,
	height: number
) => {
	for (let i = 0; i < 20000; i++) {
		ctx.fillStyle = 'hsl(0,0%,' + (Math.random() * 50 + 50) + '%)';
		ctx.beginPath();
		ctx.arc(
			Math.random() * width,
			Math.random() * height,
			Math.random() + 0.15,
			0,
			Math.PI * 2,
			true
		);
		ctx.fill();
	}
	ctx.globalAlpha = 0.075;
	ctx.globalCompositeOperation = 'lighter';
};
CanvasConf.halfwhite = (
	ctx: CanvasRenderingContext2D,
	_: string,
	width: number,
	height: number
) => {
	const s = TextureUtils.scale(width, height, 2, 2);
	ctx.fillStyle = 'white';
	ctx.fillRect(0, calc(1, s.y), calc(2, s.x), calc(1, s.y));
};
CanvasConf.bluesky = (
	ctx: CanvasRenderingContext2D,
	_: string,
	width: number,
	height: number
) => {
	const s = TextureUtils.scale(width, height, 1, 32);
	const gradient = ctx.createLinearGradient(0, 0, 0, calc(32, s.y));
	gradient.addColorStop(0.0, '#014a84');
	gradient.addColorStop(0.5, '#0561a0');
	gradient.addColorStop(1.0, '#437ab6');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, calc(1, s.x), calc(32, s.y));
};
CanvasConf.white = (
	ctx: CanvasRenderingContext2D,
	_: string,
	width: number,
	height: number
) => {
	const s = TextureUtils.scale(width, height, 2, 2);
	ctx.fillStyle = 'white';
	ctx.fillRect(0, calc(1, s.y), calc(2, s.x), calc(1, s.y));
};
CanvasConf.checkpattern = (
	ctx: CanvasRenderingContext2D,
	_: string,
	width: number,
	height: number,
	options: any
) => {
	options = options || {};
	const color = options.color || '#f00';
	ctx.fillStyle = '#444';
	ctx.fillRect(0, 0, width, height);
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, width / 2, height / 2);
	ctx.fillRect(width / 2, height / 2, width / 2, height / 2);
};
CanvasConf.test4 = (
	ctx: CanvasRenderingContext2D,
	_: string,
	width: number,
	height: number
) => {
	const s = TextureUtils.scale(width, height, 16, 16);
};

export const DataTextureConf: { [key: string]: TDataFunctionType } = {};
DataTextureConf.cloud = (options: any) => {
	const size = options?.size || options?.width || options?.height || 128;
	const data = new Uint8Array(size * size * size);
	let i = 0;
	const scale = options?.scale || 0.05;
	const perlin = new N3JS.ImprovedNoise();
	const vector = new N3JS.Vector3();
	for (let z = 0; z < size; z++) {
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				const d =
					1.0 -
					vector
						.set(x, y, z)
						.subScalar(size / 2)
						.divideScalar(size)
						.length();
				data[i] =
					(128 +
						128 *
							perlin.noise((x * scale) / 1.5, y * scale, (z * scale) / 1.5)) *
					d *
					d;
				i++;
			}
		}
	}
	const texture = new N3JS.DataTexture3D(data, size, size, size);
	texture.format = N3JS.RedFormat;
	texture.minFilter = N3JS.LinearFilter;
	texture.magFilter = N3JS.LinearFilter;
	texture.unpackAlignment = 1;
	return texture;
};

DataTextureConf.perlin = (options: any) => {
	const size = options?.size || 128;
	const data = new Uint8Array(size * size * size);
	let i = 0;
	const perlin = new N3JS.ImprovedNoise();
	const vector = new N3JS.Vector3();
	for (let z = 0; z < size; z++) {
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				vector.set(x, y, z).divideScalar(size);
				const d = perlin.noise(vector.x * 6.5, vector.y * 6.5, vector.z * 6.5);
				data[i++] = d * size + size;
			}
		}
	}
	const texture = new N3JS.DataTexture3D(data, size, size, size);
	texture.format = N3JS.RedFormat;
	texture.minFilter = N3JS.LinearFilter;
	texture.magFilter = N3JS.LinearFilter;
	texture.unpackAlignment = 1;
	return texture;
};
DataTextureConf.datatexture3d = (options: any) => {
	const size = options?.size || 128;
	const width = options?.width || size;
	const height = options?.height || size;
	const depth = options?.depth || size;
	const texture = new N3JS.DataTexture3D(
		new Uint8Array(width * height * depth).fill(0),
		width,
		height,
		depth
	);
	texture.format = N3JS.RedFormat;
	texture.minFilter = N3JS.LinearFilter;
	texture.magFilter = N3JS.LinearFilter;
	texture.unpackAlignment = 1;
	return texture;
};
DataTextureConf.datatexture = (options: any) => {
	const size = options?.size || 10;
	const width = options?.width || size;
	const height = options?.height || size;
	const texture = new N3JS.DataTexture(
		new Uint8Array(width * height).fill(0),
		width,
		height
	);
	texture.format = N3JS.RedFormat;
	texture.minFilter = N3JS.LinearFilter;
	texture.magFilter = N3JS.LinearFilter;
	texture.unpackAlignment = 1;
	return texture;
};
DataTextureConf.datatexture2d = (options: any) => {
	return DataTextureConf.datatexture(options);
};

/**
 * Texture utils
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/TextureUtils) page for details.
 *
 */
export class TextureUtils {
	/**
	 * Scales texture utils
	 * @param w
	 * @param h
	 * @param ow
	 * @param oh
	 * @returns scale
	 */
	public static scale(
		w: number,
		h: number,
		ow: number,
		oh: number
	): I3JS.Vector2 {
		return new N3JS.Vector2(w / ow, h / oh);
	}

	/**
	 * Adds canvas
	 * @param key
	 * @param canvas
	 */
	public static addCanvas(key: string, canvas: TCanvasFunctionType) {
		CanvasConf[key.toLowerCase()] = canvas;
	}

	/**
	 * Gets canvas
	 * @param key
	 * @returns canvas
	 */
	public static getCanvas(
		key: string | TCanvasFunctionType
	): TCanvasFunctionType {
		if (key === null || key === undefined) {
			return () => {};
		} else if (typeof key === 'string') {
			if (NgxThreeUtil.isNotNull(CanvasConf[key.toLowerCase()])) {
				return CanvasConf[key.toLowerCase()];
			} else {
				console.error('unknown canvas :' + key);
				return () => {};
			}
		} else {
			return key;
		}
	}

	/**
	 * Adds data texture
	 * @param key
	 * @param data
	 */
	public static addDataTexture(key: string, data: TDataFunctionType) {
		DataTextureConf[key.toLowerCase()] = data;
	}

	/**
	 * Gets data texture
	 * @param key
	 * @returns data texture
	 */
	public static getDataTexture(
		key: string | TDataFunctionType
	): TDataFunctionType {
		if (key === null || key === undefined) {
			return null;
		} else if (typeof key === 'string') {
			if (NgxThreeUtil.isNotNull(DataTextureConf[key.toLowerCase()])) {
				return DataTextureConf[key.toLowerCase()];
			} else {
				console.error('unknown datatexture :' + key);
				return null;
			}
		} else {
			return key;
		}
	}

	/**
	 * Draws canvas
	 * @param program
	 * @param [ctx]
	 * @param [text]
	 * @param [width]
	 * @param [height]
	 * @param [programParam]
	 */
	public static drawCanvas(
		program: string | TCanvasFunctionType,
		ctx?: CanvasRenderingContext2D,
		text?: string,
		width?: number,
		height?: number,
		programParam?: any
	) {
		const canvasProgram = this.getCanvas(program);
		canvasProgram(ctx, text, width, height, programParam);
	}

	/**
	 * Datas texture
	 * @param value
	 * @param [onload]
	 * @param [options]
	 * @returns texture
	 */
	public static dataTexture(
		value: any,
		onload?: () => void,
		options?: any
	): I3JS.DataTexture | I3JS.DataTexture3D {
		const dataProgram = this.getDataTexture(value);
		const texture = dataProgram(options);
		texture.needsUpdate = true;
		window.setTimeout(() => {
			if (onload) {
				onload();
			}
		}, 100);
		return texture;
	}
}
