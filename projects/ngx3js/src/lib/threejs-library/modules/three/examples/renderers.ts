import {
	CSS2DObject as O3JS_CSS2DObject,
	CSS2DRenderer as O3JS_CSS2DRenderer,
} from 'three/examples/jsm/renderers/CSS2DRenderer';
import {
	CSS3DObject as O3JS_CSS3DObject,
	CSS3DRenderer as O3JS_CSS3DRenderer,
	CSS3DSprite as O3JS_CSS3DSprite,
} from 'three/examples/jsm/renderers/CSS3DRenderer';
import { Projector as O3JS_Projector } from 'three/examples/jsm/renderers/Projector';
import { SVGObject as O3JS_SVGObject, SVGRenderer as O3JS_SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer';
import * as I3JS from '../../../types/three/examples/renderers';

export type CSS2DObject = I3JS.CSS2DObject;
export const CSS2DObject: CSS2DObject = O3JS_CSS2DObject as any;

export type CSS2DRenderer = I3JS.CSS2DRenderer;
export const CSS2DRenderer: CSS2DRenderer = O3JS_CSS2DRenderer as any;

export type CSS3DObject = I3JS.CSS3DObject;
export const CSS3DObject: CSS3DObject = O3JS_CSS3DObject as any;

export type CSS3DSprite = I3JS.CSS3DSprite;
export const CSS3DSprite: CSS3DSprite = O3JS_CSS3DSprite as any;

export type CSS3DRenderer = I3JS.CSS3DRenderer;
export const CSS3DRenderer: CSS3DRenderer = O3JS_CSS3DRenderer as any;

export type Projector = I3JS.Projector;
export const Projector: Projector = O3JS_Projector as any;

export type SVGObject = I3JS.SVGObject;
export const SVGObject: SVGObject = O3JS_SVGObject as any;

export type SVGRenderer = I3JS.SVGRenderer;
export const SVGRenderer: SVGRenderer = O3JS_SVGRenderer as any;
