import { Camera } from './cameras';
import { Object3D } from './core';
import { DirectionalLight, HemisphereLight, Light, PointLight } from './lights';
import { MeshBasicMaterial } from './materials';
import { Box3, Color, ColorRepresentation, Matrix4, Plane, Vector3 } from './math';
import { Bone, Line, LineSegments, Mesh } from './objects';

// Extras / Helpers /////////////////////////////////////////////////////////////////////

/**
 */
export interface ArrowHelper extends Object3D {
	/**
	 * @param [dir] Direction from origin. Must be a unit vector.
	 * @param [origin] Point at which the arrow starts.
	 * @param [length] Length of the arrow.
	 * @param [color] Hexadecimal value to define color.
	 * @param [headLength] The length of the head of the arrow.
	 * @param [headWidth] The width of the head of the arrow.
	 */
	new (
		dir?: Vector3,
		origin?: Vector3,
		length?: number,
		color?: ColorRepresentation,
		headLength?: number,
		headWidth?: number
	): this;

	/**
	 * @default 'ArrowHelper'
	 */
	type: string;

	/**
	 * Contains the line part of the arrowHelper.
	 */
	line: Line;

	/**
	 * Contains the cone part of the arrowHelper.
	 */
	cone: Mesh;

	/**
	 * @param dir The desired direction. Must be a unit vector.
	 */
	setDirection(dir: Vector3): void;

	/**
	 * @param length The desired length.
	 * @param [headLength] The length of the head of the arrow.
	 * @param [headWidth] The width of the head of the arrow.
	 */
	setLength(length: number, headLength?: number, headWidth?: number): void;

	/**
	 * @param color The desired color.
	 */
	setColor(color: ColorRepresentation): void;
}

export interface AxesHelper extends LineSegments {
	/**
	 * @param [size=1]
	 */
	new (size?: number): this;

	/**
	 * @default 'AxesHelper'
	 */
	type: string;

	/**
	 */
	setColors(xAxisColor: Color, yAxisColor: Color, zAxisColor: Color): this;

	/**
	 */
	dispose(): void;
}

export interface Box3Helper extends LineSegments {
	/**
	 * @param box
	 * @param [color=0xffff00]
	 */
	new (box: Box3, color?: Color): this;

	/**
	 * @default 'Box3Helper'
	 */
	type: string;

	/**
	 */
	box: Box3;
}

export interface BoxHelper extends LineSegments {
	/**
	 * @param object
	 * @param [color=0xffff00]
	 */
	new (object: Object3D, color?: ColorRepresentation): this;

	/**
	 * @default 'BoxHelper'
	 */
	type: string;

	/**
	 */
	update(object?: Object3D): void;

	/**
	 */
	setFromObject(object: Object3D): this;
}

/**
 */
export interface CameraHelper extends LineSegments {
	/**
	 */
	new (camera: Camera): this;

	/**
	 */
	camera: Camera;

	/**
	 */
	pointMap: { [id: string]: number[] };

	/**
	 * @default 'CameraHelper'
	 */
	type: string;

	/**
	 */
	update(): void;

	/**
	 */
	dispose(): void;
}

export interface DirectionalLightHelper extends Object3D {
	/**
	 * @param light
	 * @param [size=1]
	 * @param color
	 */
	new (light: DirectionalLight, size?: number, color?: ColorRepresentation): this;

	/**
	 */
	light: DirectionalLight;

	/**
	 */
	lightPlane: Line;

	/**
	 */
	targetLine: Line;

	/**
	 * @default undefined
	 */
	color: ColorRepresentation | undefined;

	/**
	 */
	matrix: Matrix4;

	/**
	 * @default false
	 */
	matrixAutoUpdate: boolean;

	/**
	 */
	dispose(): void;

	/**
	 */
	update(): void;
}

export interface GridHelper extends LineSegments {
	/**
	 * @param [size=10]
	 * @param [divisions=10]
	 * @param [color1=0x444444]
	 * @param [color2=0x888888]
	 */
	new (size?: number, divisions?: number, color1?: ColorRepresentation, color2?: ColorRepresentation): this;

	/**
	 * @default 'GridHelper'
	 */
	type: string;

	/**
	 * @deprecated Colors should be specified in the constructor.
	 */
	setColors(color1?: ColorRepresentation, color2?: ColorRepresentation): void;
}

/**
 */
export interface HemisphereLightHelper extends Object3D {
	/**
	 */
	new (light: HemisphereLight, size: number, color?: ColorRepresentation): this;

	/**
	 */
	light: HemisphereLight;

	/**
	 */
	matrix: Matrix4;

	/**
	 */
	matrixAutoUpdate: boolean;

	/**
	 */
	material: MeshBasicMaterial;

	/**
	 */
	color: ColorRepresentation | undefined;

	/**
	 */
	dispose(): void;

	/**
	 */
	update(): void;
}

/**
 */
export interface PlaneHelper extends LineSegments {
	/**
	 * @param plane
	 * @param [size=1]
	 * @param [hex=0xffff00]
	 */
	new (plane: Plane, size?: number, hex?: number): this;

	/**
	 * @default 'PlaneHelper'
	 */
	type: string;

	/**
	 */
	plane: Plane;

	/**
	 * @default 1
	 */
	size: number;

	/**
	 */
	updateMatrixWorld(force?: boolean): void;
}

/**
 */
export interface PointLightHelper extends Object3D {
	/**
	 */
	new (light: PointLight, sphereSize?: number, color?: ColorRepresentation): this;

	/**
	 * @default 'PointLightHelper'
	 */
	type: string;

	/**
	 */
	light: PointLight;

	/**
	 */
	color: ColorRepresentation | undefined;

	/**
	 */
	matrix: Matrix4;

	/**
	 * @default false
	 */
	matrixAutoUpdate: boolean;

	/**
	 */
	dispose(): void;

	/**
	 */
	update(): void;
}

/**
 */
export interface PolarGridHelper extends LineSegments {
	/**
	 * @param [radius=10]
	 * @param [radials=16]
	 * @param [circles=8]
	 * @param [divisions=64]
	 * @param [color1=0x444444]
	 * @param [color2=0x888888]
	 */
	new (
		radius?: number,
		radials?: number,
		circles?: number,
		divisions?: number,
		color1?: ColorRepresentation,
		color2?: ColorRepresentation
	): this;

	/**
	 * @default 'PolarGridHelper'
	 */
	type: string;
}

/**
 */
export interface SkeletonHelper extends LineSegments {
	/**
	 */
	new (object: Object3D): this;

	/**
	 * @default 'SkeletonHelper'
	 */
	type: string;

	/**
	 */
	bones: Bone[];

	/**
	 */
	root: Object3D;

	/**
	 */
	readonly isSkeletonHelper: true;

	/**
	 */
	matrix: Matrix4;

	/**
	 * @default false
	 */
	matrixAutoUpdate: boolean;

	/**
	 */
	getBoneList(object: Object3D): Bone[];

	/**
	 */
	update(): void;
}

/**
 */
export interface SpotLightHelper extends Object3D {
	/**
	 */
	new (light: Light, color?: ColorRepresentation): this;

	/**
	 */
	light: Light;

	/**
	 */
	matrix: Matrix4;

	/**
	 * @default false
	 */
	matrixAutoUpdate: boolean;

	/**
	 */
	color: ColorRepresentation | undefined;

	/**
	 */
	cone: LineSegments;

	/**
	 */
	dispose(): void;

	/**
	 */
	update(): void;
}
