import {
	AmbientLight as O3JS_AmbientLight,
	AmbientLightProbe as O3JS_AmbientLightProbe,
	DirectionalLight as O3JS_DirectionalLight,
	DirectionalLightShadow as O3JS_DirectionalLightShadow,
	HemisphereLight as O3JS_HemisphereLight,
	HemisphereLightProbe as O3JS_HemisphereLightProbe,
	Light as O3JS_Light,
	LightProbe as O3JS_LightProbe,
	LightShadow as O3JS_LightShadow,
	PointLight as O3JS_PointLight,
	PointLightShadow as O3JS_PointLightShadow,
	RectAreaLight as O3JS_RectAreaLight,
	SpotLight as O3JS_SpotLight,
	SpotLightShadow as O3JS_SpotLightShadow,
} from 'three';
import * as I3JS from '../../types/three/lights';

export type AmbientLight = I3JS.AmbientLight;
export const AmbientLight: AmbientLight = O3JS_AmbientLight as any;

export type AmbientLightProbe = I3JS.AmbientLightProbe;
export const AmbientLightProbe: AmbientLightProbe = O3JS_AmbientLightProbe as any;

export type DirectionalLight = I3JS.DirectionalLight;
export const DirectionalLight: DirectionalLight = O3JS_DirectionalLight as any;

export type DirectionalLightShadow = I3JS.DirectionalLightShadow;
export const DirectionalLightShadow: DirectionalLightShadow = O3JS_DirectionalLightShadow as any;

export type HemisphereLight = I3JS.HemisphereLight;
export const HemisphereLight: HemisphereLight = O3JS_HemisphereLight as any;

export type HemisphereLightProbe = I3JS.HemisphereLightProbe;
export const HemisphereLightProbe: HemisphereLightProbe = O3JS_HemisphereLightProbe as any;

export type Light = I3JS.Light;
export const Light: Light = O3JS_Light as any;

export type LightProbe = I3JS.LightProbe;
export const LightProbe: LightProbe = O3JS_LightProbe as any;

export type LightShadow = I3JS.LightShadow;
export const LightShadow: LightShadow = O3JS_LightShadow as any;

export type PointLight = I3JS.PointLight;
export const PointLight: PointLight = O3JS_PointLight as any;

export type PointLightShadow = I3JS.PointLightShadow;
export const PointLightShadow: PointLightShadow = O3JS_PointLightShadow as any;

export type RectAreaLight = I3JS.RectAreaLight;
export const RectAreaLight: RectAreaLight = O3JS_RectAreaLight as any;

export type SpotLight = I3JS.SpotLight;
export const SpotLight: SpotLight = O3JS_SpotLight as any;

export type SpotLightShadow = I3JS.SpotLightShadow;
export const SpotLightShadow: SpotLightShadow = O3JS_SpotLightShadow as any;
