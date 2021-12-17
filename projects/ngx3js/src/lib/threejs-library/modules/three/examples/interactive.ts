import { HTMLMesh as O3JS_HTMLMesh } from 'three/examples/jsm/interactive/HTMLMesh';
import { InteractiveGroup as O3JS_InteractiveGroup } from 'three/examples/jsm/interactive/InteractiveGroup';
import { SelectionBox as O3JS_SelectionBox } from 'three/examples/jsm/interactive/SelectionBox';
import { SelectionHelper as O3JS_SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper';
import * as I3JS from '../../../types/three/examples/interactive';

export type HTMLMesh = I3JS.HTMLMesh;
export const HTMLMesh: HTMLMesh = O3JS_HTMLMesh as any;

export type InteractiveGroup = I3JS.InteractiveGroup;
export const InteractiveGroup: InteractiveGroup = O3JS_InteractiveGroup as any;

export type SelectionBox = I3JS.SelectionBox;
export const SelectionBox: SelectionBox = O3JS_SelectionBox as any;

export type SelectionHelper = I3JS.SelectionHelper;
export const SelectionHelper: SelectionHelper = O3JS_SelectionHelper as any;

