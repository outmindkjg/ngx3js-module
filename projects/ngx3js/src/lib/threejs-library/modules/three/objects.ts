import {
	Bone as O3JS_Bone,
	Group as O3JS_Group,
	InstancedMesh as O3JS_InstancedMesh,
	Line as O3JS_Line,
	LineLoop as O3JS_LineLoop,
	LineSegments as O3JS_LineSegments,
	LOD as O3JS_LOD,
	Mesh as O3JS_Mesh,
	Points as O3JS_Points,
	Skeleton as O3JS_Skeleton,
	SkinnedMesh as O3JS_SkinnedMesh,
	Sprite as O3JS_Sprite,
} from 'three';
import * as I3JS from '../../types/three/objects';

export type Bone = I3JS.Bone;
export const Bone: Bone = O3JS_Bone as any;

export type Group = I3JS.Group;
export const Group: Group = O3JS_Group as any;

export type InstancedMesh = I3JS.InstancedMesh;
export const InstancedMesh: InstancedMesh = O3JS_InstancedMesh as any;

export type LOD = I3JS.LOD;
export const LOD: LOD = O3JS_LOD as any;

export type Line = I3JS.Line;
export const Line: Line = O3JS_Line as any;

export type LineLoop = I3JS.LineLoop;
export const LineLoop: LineLoop = O3JS_LineLoop as any;

export type LineSegments = I3JS.LineSegments;
export const LineSegments: LineSegments = O3JS_LineSegments as any;

export type Mesh = I3JS.Mesh;
export const Mesh: Mesh = O3JS_Mesh as any;

export type Points = I3JS.Points;
export const Points: Points = O3JS_Points as any;

export type Skeleton = I3JS.Skeleton;
export const Skeleton: Skeleton = O3JS_Skeleton as any;

export type SkinnedMesh = I3JS.SkinnedMesh;
export const SkinnedMesh: SkinnedMesh = O3JS_SkinnedMesh as any;

export type Sprite = I3JS.Sprite;
export const Sprite: Sprite = O3JS_Sprite as any;
