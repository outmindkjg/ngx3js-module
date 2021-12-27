import { Curve, Vector2, Vector3, Vector4 } from '../index';

/**
 * Example custom curves
 */
export interface ExampleCustomCurves extends Curve<Vector3> {
    new(scale?: number) : this;
    scale: number;
}

/**
 * Curves
 */
export interface Curves {
    GrannyKnot : ExampleCustomCurves;
    HeartCurve : ExampleCustomCurves ;
    VivianiCurve : ExampleCustomCurves;
    KnotCurve : ExampleCustomCurves;
    HelixCurve : ExampleCustomCurves;
    TrefoilKnot : ExampleCustomCurves;
    TorusKnot : ExampleCustomCurves;
    CinquefoilKnot : ExampleCustomCurves;
    TrefoilPolynomialKnot : ExampleCustomCurves;
    FigureEightPolynomialKnot : ExampleCustomCurves;
    DecoratedTorusKnot4a : ExampleCustomCurves;
    DecoratedTorusKnot4b : ExampleCustomCurves;
    DecoratedTorusKnot5a : ExampleCustomCurves;
    DecoratedTorusKnot5c : ExampleCustomCurves;
}

/**
 * Nurbscurve
 */
export interface NURBSCurve extends Curve<Vector3> {
    new(
        degree: number,
        knots: number[],
        controlPoints: Vector2[] | Vector3[] | Vector4[],
        startKnot: number,
        endKnot: number,
    ) : this;
}

/**
 * Nurbssurface
 */
export interface NURBSSurface {
    new(
        degree1: number,
        degree2: number,
        knots1: number[],
        knots2: number[],
        controlPoints: Vector2[][] | Vector3[][] | Vector4[][],
    ) : this;

    getPoint(t1: number, t2: number, target: Vector3): void;
}

/**
 * Nurbsutils
 */
export interface NURBSUtils {
    findSpan(p: number, u: number, U: number[]): number;
    calcBasisFunctions(span: number, u: number, p: number, U: number[]): number[];
    calcBSplinePoint(p: number, U: number[], P: Vector4[], u: number): Vector4;
    calcBasisFunctionDerivatives(span: number, u: number, p: number, n: number, U: number[]): number[][];
    calcBSplineDerivatives(p: number, U: number[], P: Vector4[], u: number, nd: number): Vector4[];
    calcKoverI(k: number, i: number): number;
    calcRationalCurveDerivatives(Pders: Vector4[]): Vector3[];
    calcNURBSDerivatives(p: number, U: number[], P: Vector4[], u: number, nd: number): Vector3[];
    calcSurfacePoint(
        p: number,
        q: number,
        U: number[],
        V: number[],
        P: Vector4[],
        u: number,
        v: number,
        target: Vector3,
    ): Vector3;
}
