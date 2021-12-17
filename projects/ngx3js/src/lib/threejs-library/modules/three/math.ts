import {
	Box2 as O3JS_Box2,
	Color as O3JS_Color,
	CubicInterpolant as O3JS_CubicInterpolant,
	Cylindrical as O3JS_Cylindrical,
	DiscreteInterpolant as O3JS_DiscreteInterpolant,
	Frustum as O3JS_Frustum,
	Interpolant as O3JS_Interpolant,
	Line3 as O3JS_Line3,
	LinearInterpolant as O3JS_LinearInterpolant,
	MathUtils as O3JS_MathUtils,
	Matrix3 as O3JS_Matrix3,
	Matrix4 as O3JS_Matrix4,
	Plane as O3JS_Plane,
	Quaternion as O3JS_Quaternion,
	QuaternionLinearInterpolant as O3JS_QuaternionLinearInterpolant,
	Ray as O3JS_Ray,
	Sphere as O3JS_Sphere,
	Spherical as O3JS_Spherical,
	SphericalHarmonics3 as O3JS_SphericalHarmonics3,
	Triangle as O3JS_Triangle,
	Euler as O3JS_Euler,
	Vector2 as O3JS_Vector2,
	Vector3 as O3JS_Vector3,
	Vector4 as O3JS_Vector4,
} from 'three';
import * as I3JS from '../../types/three/math';

export type ColorRepresentation = I3JS.ColorRepresentation;

export type Box2 = I3JS.Box2;
export const Box2: Box2 = O3JS_Box2 as any;

export type Box3 = I3JS.Box3;
export const Box3: Box3 = O3JS_Box2 as any;

export type Color = I3JS.Color;
export const Color: Color = O3JS_Color as any;

export type Cylindrical = I3JS.Cylindrical;
export const Cylindrical: Cylindrical = O3JS_Cylindrical as any;

export type Frustum = I3JS.Frustum;
export const Frustum: Frustum = O3JS_Frustum as any;

export type Interpolant = I3JS.Interpolant;
export const Interpolant: Interpolant = O3JS_Interpolant as any;

export type Line3 = I3JS.Line3;
export const Line3: Line3 = O3JS_Line3 as any;

export type MathUtils = I3JS.MathUtils;
export const MathUtils: MathUtils = O3JS_MathUtils as any;

export type Matrix3 = I3JS.Matrix3;
export const Matrix3: Matrix3 = O3JS_Matrix3 as any;

export type Matrix4 = I3JS.Matrix4;
export const Matrix4: Matrix4 = O3JS_Matrix4 as any;

export type Plane = I3JS.Plane;
export const Plane: Plane = O3JS_Plane as any;

export type Quaternion = I3JS.Quaternion;
export const Quaternion: Quaternion = O3JS_Quaternion as any;

export type Ray = I3JS.Ray;
export const Ray: Ray = O3JS_Ray as any;

export type Sphere = I3JS.Sphere;
export const Sphere: Sphere = O3JS_Sphere as any;

export type Spherical = I3JS.Spherical;
export const Spherical: Spherical = O3JS_Spherical as any;

export type SphericalHarmonics3 = I3JS.SphericalHarmonics3;
export const SphericalHarmonics3: SphericalHarmonics3 = O3JS_SphericalHarmonics3 as any;

export type Triangle = I3JS.Triangle;
export const Triangle: Triangle = O3JS_Triangle as any;

export type Euler = I3JS.Euler;
export const Euler: Euler = O3JS_Euler as any;

export type Vector2Tuple = [number, number];

export type Vector2 = I3JS.Vector2;
export const Vector2: Vector2 = O3JS_Vector2 as any;

export type Vector3Tuple = [number, number, number];

export type Vector3 = I3JS.Vector3;
export const Vector3: Vector3 = O3JS_Vector3 as any;

export type Vector4Tuple = [number, number, number, number];

export type Vector4 = I3JS.Vector4;
export const Vector4: Vector4 = O3JS_Vector4 as any;

export type CubicInterpolant = I3JS.CubicInterpolant;
export const CubicInterpolant: CubicInterpolant = O3JS_CubicInterpolant as any;

export type DiscreteInterpolant = I3JS.DiscreteInterpolant;
export const DiscreteInterpolant: DiscreteInterpolant = O3JS_DiscreteInterpolant as any;

export type LinearInterpolant = I3JS.LinearInterpolant;
export const LinearInterpolant: LinearInterpolant = O3JS_LinearInterpolant as any;

export type QuaternionLinearInterpolant = I3JS.QuaternionLinearInterpolant;
export const QuaternionLinearInterpolant: QuaternionLinearInterpolant = O3JS_QuaternionLinearInterpolant as any;
