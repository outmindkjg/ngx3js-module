import { AnimationClipCreator as O3JS_AnimationClipCreator } from 'three/examples/jsm/animation/AnimationClipCreator';
import {
    // CCDIKHelper as O3JS_CCDIKHelper,
    CCDIKSolver as O3JS_CCDIKSolver
} from 'three/examples/jsm/animation/CCDIKSolver';
import {
    // AudioManager as O3JS_AudioManager,
    // GrantSolver as O3JS_GrantSolver,
    MMDAnimationHelper as O3JS_MMDAnimationHelper
} from 'three/examples/jsm/animation/MMDAnimationHelper';
import {
    MMDPhysics as O3JS_MMDPhysics,
    // MMDPhysicsHelper as O3JS_MMDPhysicsHelper,
    // ResourceManager as O3JS_ResourceManager,
    // RigidBody as O3JS_RigidBody
} from 'three/examples/jsm/animation/MMDPhysics';
import * as I3JS from '../../../types/three/examples/animation';

export type AnimationClipCreator = I3JS.AnimationClipCreator;
export const AnimationClipCreator: AnimationClipCreator = O3JS_AnimationClipCreator as any;

export type CCDIKSolver = I3JS.CCDIKSolver;
export const CCDIKSolver: CCDIKSolver = O3JS_CCDIKSolver as any;

// export type CCDIKHelper = I3JS.CCDIKHelper;
// export const CCDIKHelper: CCDIKHelper = O3JS_CCDIKHelper as any;

export type MMDAnimationHelper = I3JS.MMDAnimationHelper;
export const MMDAnimationHelper: MMDAnimationHelper = O3JS_MMDAnimationHelper as any;

// export type AudioManager = I3JS.AudioManager;
// export const AudioManager: AudioManager = O3JS_AudioManager as any;

// export type GrantSolver = I3JS.GrantSolver;
// export const GrantSolver: GrantSolver = O3JS_GrantSolver as any;

export type MMDPhysics = I3JS.MMDPhysics;
export const MMDPhysics: MMDPhysics = O3JS_MMDPhysics as any;

// export type ResourceManager = I3JS.ResourceManager;
// export const ResourceManager: ResourceManager = O3JS_ResourceManager as any;

// export type RigidBody = I3JS.RigidBody;
// export const RigidBody: RigidBody = O3JS_RigidBody as any;

// export type MMDPhysicsHelper = I3JS.MMDPhysicsHelper;
// export const MMDPhysicsHelper: MMDPhysicsHelper = O3JS_MMDPhysicsHelper as any;
