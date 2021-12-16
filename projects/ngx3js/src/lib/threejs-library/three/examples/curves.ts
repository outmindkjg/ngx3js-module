import { Curve, Vector2, Vector3, Vector4 } from '../index';

export namespace Curves {
    interface GrannyKnot extends Curve<Vector3> {
        new() : this;
    }

    interface HeartCurve extends Curve<Vector3> {
        new(scale?: number) : this;
        scale: number;
    }

    interface VivianiCurve extends Curve<Vector3> {
        new(scale?: number) : this;
        scale: number;
    }

    interface KnotCurve extends Curve<Vector3> {
        new() : this;
    }

    interface HelixCurve extends Curve<Vector3> {
        new() : this;
    }

    interface TrefoilKnot extends Curve<Vector3> {
        new(scale?: number) : this;
        scale: number;
    }

    interface TorusKnot extends Curve<Vector3> {
        new(scale?: number) : this;
        scale: number;
    }

    interface CinquefoilKnot extends Curve<Vector3> {
        new(scale?: number) : this;
        scale: number;
    }

    interface TrefoilPolynomialKnot extends Curve<Vector3> {
        new(scale?: number) : this;
        scale: number;
    }

    interface FigureEightPolynomialKnot extends Curve<Vector3> {
        new(scale?: number) : this;
        scale: number;
    }

    interface DecoratedTorusKnot4a extends Curve<Vector3> {
        new(scale?: number) : this;
        scale: number;
    }

    interface DecoratedTorusKnot4b extends Curve<Vector3> {
        new(scale?: number) : this;
        scale: number;
    }

    interface DecoratedTorusKnot5a extends Curve<Vector3> {
        new(scale?: number) : this;
        scale: number;
    }

    interface DecoratedTorusKnot5c extends Curve<Vector3> {
        new(scale?: number) : this;
        scale: number;
    }
}

export interface NURBSCurve extends Curve<Vector3> {
    new(
        degree: number,
        knots: number[],
        controlPoints: Vector2[] | Vector3[] | Vector4[],
        startKnot: number,
        endKnot: number,
    ) : this;
}

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
