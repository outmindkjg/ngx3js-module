import {
	ArcCurve as O3JS_ArcCurve,
	CatmullRomCurve3 as O3JS_CatmullRomCurve3,
	CubicBezierCurve as O3JS_CubicBezierCurve,
	CubicBezierCurve3 as O3JS_CubicBezierCurve3,
	Curve as O3JS_Curve,
	CurvePath as O3JS_CurvePath,
	CurveUtils as O3JS_CurveUtils,
	DataUtils as O3JS_DataUtils,
	EllipseCurve as O3JS_EllipseCurve,
	ImageUtils as O3JS_ImageUtils,
	LineCurve as O3JS_LineCurve,
	LineCurve3 as O3JS_LineCurve3,
	Path as O3JS_Path,
	PMREMGenerator as O3JS_PMREMGenerator,
	QuadraticBezierCurve as O3JS_QuadraticBezierCurve,
	QuadraticBezierCurve3 as O3JS_QuadraticBezierCurve3,
	Shape as O3JS_Shape,
	ShapePath as O3JS_ShapePath,
	ShapeUtils as O3JS_ShapeUtils,
	SplineCurve as O3JS_SplineCurve,
	Vector2 as O3JS_Vector2,
	Vector3 as O3JS_Vector3,
} from 'three';
import * as I3JS from '../../types/three/extras';

export type DataUtils = I3JS.DataUtils;
export const DataUtils: DataUtils = O3JS_DataUtils as any;

export type ImageUtils = I3JS.ImageUtils;
export const ImageUtils: ImageUtils = O3JS_ImageUtils as any;

export type PMREMGenerator = I3JS.PMREMGenerator;
export const PMREMGenerator: PMREMGenerator = O3JS_PMREMGenerator as any;

export type ShapeUtils = I3JS.ShapeUtils;
export const ShapeUtils: ShapeUtils = O3JS_ShapeUtils as any;

export type Curve = I3JS.Curve<any>;
export const Curve: Curve = O3JS_Curve as any;

class CurveVector2Class extends O3JS_Curve<O3JS_Vector2> {}
export type CurveVector2 = I3JS.CurveVector2;
export const CurveVector2: CurveVector2 = CurveVector2Class as any;

class CurveVector3Class extends O3JS_Curve<O3JS_Vector3> {}
export type CurveVector3 = I3JS.CurveVector3;
export const CurveVector3: CurveVector3 = CurveVector3Class as any;

export type CurvePath = I3JS.CurvePath<any>;
export const CurvePath: CurvePath = O3JS_CurvePath as any;

class CurvePathVector2Class extends O3JS_CurvePath<O3JS_Vector2> {}
export type CurvePathVector2 = I3JS.CurvePathVector2;
export const CurvePathVector2: CurvePathVector2 = CurvePathVector2Class as any;

class CurvePathVector3Class extends O3JS_CurvePath<O3JS_Vector3> {}
export type CurvePathVector3 = I3JS.CurvePathVector3;
export const CurvePathVector3: CurvePathVector3 = CurvePathVector3Class as any;

export type Path = I3JS.Path;
export const Path: Path = O3JS_Path as any;

export type Shape = I3JS.Shape;
export const Shape: Shape = O3JS_Shape as any;

export type ShapePath = I3JS.ShapePath;
export const ShapePath: ShapePath = O3JS_ShapePath as any;

export type ArcCurve = I3JS.ArcCurve;
export const ArcCurve: ArcCurve = O3JS_ArcCurve as any;

export type CurveUtils = I3JS.CurveUtils;
export const CurveUtils: CurveUtils = O3JS_CurveUtils as any;

export type CatmullRomCurve3 = I3JS.CatmullRomCurve3;
export const CatmullRomCurve3: CatmullRomCurve3 = O3JS_CatmullRomCurve3 as any;

export type CubicBezierCurve = I3JS.CubicBezierCurve;
export const CubicBezierCurve: CubicBezierCurve = O3JS_CubicBezierCurve as any;

export type CubicBezierCurve3 = I3JS.CubicBezierCurve3;
export const CubicBezierCurve3: CubicBezierCurve3 = O3JS_CubicBezierCurve3 as any;

export type EllipseCurve = I3JS.EllipseCurve;
export const EllipseCurve: EllipseCurve = O3JS_EllipseCurve as any;

export type LineCurve = I3JS.LineCurve;
export const LineCurve: LineCurve = O3JS_LineCurve as any;

export type LineCurve3 = I3JS.LineCurve3;
export const LineCurve3: LineCurve3 = O3JS_LineCurve3 as any;

export type QuadraticBezierCurve = I3JS.QuadraticBezierCurve;
export const QuadraticBezierCurve: QuadraticBezierCurve = O3JS_QuadraticBezierCurve as any;

export type QuadraticBezierCurve3 = I3JS.QuadraticBezierCurve3;
export const QuadraticBezierCurve3: QuadraticBezierCurve3 = O3JS_QuadraticBezierCurve3 as any;

export type SplineCurve = I3JS.SplineCurve;
export const SplineCurve: SplineCurve = O3JS_SplineCurve as any;
