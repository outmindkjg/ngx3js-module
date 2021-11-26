import * as GeometryUtilsAlias from 'three/examples/jsm/utils/GeometryUtils';
const GeometryUtilsAny: any = GeometryUtilsAlias;
const GeometryUtils = {
	hilbert2D: GeometryUtilsAny.hilbert2D,
	hilbert3D: GeometryUtilsAny.hilbert3D,
	gosper: GeometryUtilsAny.gosper,
};

export { GeometryUtils };
