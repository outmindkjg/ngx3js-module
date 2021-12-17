import {
	AnimationAction as O3JS_AnimationAction,
	AnimationClip as O3JS_AnimationClip,
	AnimationMixer as O3JS_AnimationMixer,
	AnimationObjectGroup as O3JS_AnimationObjectGroup,
	AnimationUtils as O3JS_AnimationUtils,
	BooleanKeyframeTrack as O3JS_BooleanKeyframeTrack,
	ColorKeyframeTrack as O3JS_ColorKeyframeTrack,
	KeyframeTrack as O3JS_KeyframeTrack,
	NumberKeyframeTrack as O3JS_NumberKeyframeTrack,
	PropertyBinding as O3JS_PropertyBinding,
	PropertyMixer as O3JS_PropertyMixer,
	QuaternionKeyframeTrack as O3JS_QuaternionKeyframeTrack,
	StringKeyframeTrack as O3JS_StringKeyframeTrack,
	VectorKeyframeTrack as O3JS_VectorKeyframeTrack,
} from 'three';
import * as I3JS from '../../types/three/animation';

export type AnimationAction = I3JS.AnimationAction;
export const AnimationAction: AnimationAction = O3JS_AnimationAction as any;

export type AnimationClip = I3JS.AnimationClip;
export const AnimationClip: AnimationClip = O3JS_AnimationClip as any;

export type AnimationMixer = I3JS.AnimationMixer;
export const AnimationMixer: AnimationMixer = O3JS_AnimationMixer as any;

export type AnimationObjectGroup = I3JS.AnimationObjectGroup;
export const AnimationObjectGroup: AnimationObjectGroup = O3JS_AnimationObjectGroup as any;

export type AnimationUtils = I3JS.AnimationUtils;
export const AnimationUtils: AnimationUtils = O3JS_AnimationUtils as any;

export type KeyframeTrack = I3JS.KeyframeTrack;
export const KeyframeTrack: KeyframeTrack = O3JS_KeyframeTrack as any;

export type PropertyBinding = I3JS.PropertyBinding;
export const PropertyBinding: PropertyBinding = O3JS_PropertyBinding as any;

export type PropertyMixer = I3JS.PropertyMixer;
export const PropertyMixer: PropertyMixer = O3JS_PropertyMixer as any;

export type BooleanKeyframeTrack = I3JS.BooleanKeyframeTrack;
export const BooleanKeyframeTrack: BooleanKeyframeTrack = O3JS_BooleanKeyframeTrack as any;

export type ColorKeyframeTrack = I3JS.ColorKeyframeTrack;
export const ColorKeyframeTrack: ColorKeyframeTrack = O3JS_ColorKeyframeTrack as any;

export type NumberKeyframeTrack = I3JS.NumberKeyframeTrack;
export const NumberKeyframeTrack: NumberKeyframeTrack = O3JS_NumberKeyframeTrack as any;

export type QuaternionKeyframeTrack = I3JS.QuaternionKeyframeTrack;
export const QuaternionKeyframeTrack: QuaternionKeyframeTrack = O3JS_QuaternionKeyframeTrack as any;

export type StringKeyframeTrack = I3JS.StringKeyframeTrack;
export const StringKeyframeTrack: StringKeyframeTrack = O3JS_StringKeyframeTrack as any;

export type VectorKeyframeTrack = I3JS.VectorKeyframeTrack;
export const VectorKeyframeTrack: VectorKeyframeTrack = O3JS_VectorKeyframeTrack as any;
