import { Camera, OrthographicCamera, PerspectiveCamera } from './cameras';
import { Object3D } from './core';
import { Color, ColorRepresentation, Matrix4, SphericalHarmonics3, Vector2, Vector3, Vector4 } from './math';
import { WebGLRenderTarget } from './renderers';

/**
 * This light globally illuminates all objects in the scene equally.
 * This light cannot be used to cast shadows as it does not have a direction.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/AmbientLight) page for details.
 * See the [ngx light](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_light/AmbientLight) page for a live demo.
 *
 * ### Examples
 * [animation / skinning / blending](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_animation_skinning_blending)
 *
 * ### Code Example
 * ```js
 * const light = new THREE.AmbientLight( 0x404040 ); // soft white light scene.add( light );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-light [type]="'AmbientLight'" [color]="'0x404040'"></ngx3js-light>
 * ```
 */
export interface AmbientLight extends Light {
	/**
	 * Creates a new AmbientLight.
	 * @param color Numeric value of the RGB component of the color. Default is 0xffffff.
	 * @param intensity Numeric value of the light's strength/intensity. Default is 1.
	 */
	new (color?: ColorRepresentation, intensity?: number): this;

	/**
	 * @default 'AmbientLight'
	 */
	type: string;

	readonly isAmbientLight: true;
}

/**
 * Light probes are an alternative way of adding light to a 3D scene. AmbientLightProbe is the light estimation data of a single ambient light in the scene. For more information about light probes, go to [LightProbe](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LightProbe).
 */
export interface AmbientLightProbe extends LightProbe {
	/**
	 * Creates a new AmbientLightProbe.
	 * @param color An instance of Color, string representing a color or a number representing a color.
	 * @param intensity Numeric value of the light probe's intensity. Default is 1.
	 */
	new (color?: ColorRepresentation, intensity?: number): this;

	readonly isAmbientLightProbe: true;
}

/**
 * A light that gets emitted in a specific direction. This light will behave as though it is infinitely far away and the rays produced from it are all parallel. The common use case for this is to simulate daylight; the sun is far enough away that its position can be considered to be infinite, and all light rays coming from it are parallel.
 * This light can cast shadows - see the [DirectionalLightShadow](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DirectionalLightShadow) page for details.
 *
 * ### A Note about Position, Target and rotation
 * A common point of confusion for directional lights is that setting the rotation has no effect.
 * This is because three.js's DirectionalLight is the equivalent to what is often called a 'Target Direct Light' in other applications.
 * This means that its direction is calculated as pointing from the light's [position](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.position) to	the *.target*'s position (as opposed to a 'Free Direct Light' that just has a rotation component).
 * The reason for this is to allow the light to cast shadows - the *.shadow* camera needs a position to calculate shadows from.
 * See the *.target* property below for details on updating the target.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DirectionalLight) page for details.
 * See the [ngx light](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_light/DirectionalLight) page for a live demo.
 *
 * ### Examples
 * [controls / fly](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_controls_fly) |
 * [effects / parallaxbarrier](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_parallaxbarrier) |
 * [effects / stereo](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_stereo) |
 * [geometry / extrude / splines](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_extrude_splines) |
 * [materials / bumpmap](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_materials_bumpmap)
 *
 * ### Code Example
 * ```js
 * //  White directional light at half intensity shining from the top.
 * const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
 * scene.add( directionalLight );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-light [type]="'DirectionalLight'" [color]="'0xffffff'" [intensity]="0.5"></ngx3js-light>
 * ```
 */
export interface DirectionalLight extends Light {
	/**
	 * Creates a new DirectionalLight.
	 * @param color hexadecimal color of the light. Default is 0xffffff (white).
	 * @param intensity numeric value of the light's strength/intensity. Default is 1.
	 */
	new (color?: ColorRepresentation, intensity?: number): this;

	/**
	 * @default 'DirectionalLight'
	 */
	type: string;

	/**
	 * This is set equal to [Object3D.DefaultUp](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.DefaultUp) (0, 1, 0), so that the light shines from the top down.
	 * @default THREE.Object3D.DefaultUp
	 */
	readonly position: Vector3;

	/**
	 * The DirectionalLight points from its *.position* to target.position. The default position of the target is *(0, 0, 0)*.
	 * *Note*: For the target's position to be changed to anything other than the default, it must be added to the [scene](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Scene) using scene.add( light.target );
	 *
	 * This is so that the target's [matrixWorld](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrixWorld) gets automatically updated each frame.
	 * It is also possible to set the target to be another object in the scene (anything with a [position](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.position) property), like so:
	 *
	 * ### Code Example
	 * ```js
	 * const targetObject = new THREE.Object3D();
	 * scene.add(targetObject);
	 * light.target = targetObject;
	 * ```
	 * The directionalLight will now track the target object.
	 *
	 * @default new THREE.Object3D()
	 */
	target: Object3D;

	/**
	 * Light's intensity.
	 * @default 1
	 */
	intensity: number;

	/**
	 * If set to *true* light will cast dynamic shadows. *Warning*: This is expensive and requires tweaking to get shadows looking right. See the [DirectionalLightShadow](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DirectionalLightShadow) for details.
	 * The default is *false*.
	 * @default false
	 */
	castShadow: boolean;

	/**
	 * A [DirectionalLightShadow](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DirectionalLightShadow) used to calculate shadows for this light.
	 * @default new THREE.DirectionalLightShadow()
	 */
	shadow: DirectionalLightShadow;

	readonly isDirectionalLight: true;
}

/**
 */
export interface DirectionalLightShadow extends LightShadow {
	/**
	 */
	camera: OrthographicCamera;

	/**
	 */
	readonly isDirectionalLightShadow: true;
}

/**
 * A light source positioned directly above the scene, with color fading from the sky color to the ground color.
 * This light cannot be used to cast shadows.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/HemisphereLight) page for details.
 * See the [ngx light](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_light/HemisphereLight) page for a live demo.
 *
 * ### Examples
 * [animation / skinning / blending](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_animation_skinning_blending) |
 * [lights / hemisphere](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lights_hemisphere) |
 * [controls / pointerlock](https://outmindkjg.github.io/ngx3js-doc/#/examples/misc_controls_pointerlock) |
 * [loader / collada / kinematics](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_collada_kinematics) |
 * [loader / stl](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_loader_stl)
 *
 * ### Code Example
 * ```js
 * const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
 * scene.add( light );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-light [type]="'HemisphereLight'" [skyColor]="'0xffffbb'" [groundColor]="'0x080820'" [intensity]="0.5"></ngx3js-light>
 * ```
 */
export interface HemisphereLight extends Light {
	/**
	 * Creates a new HemisphereLight.
	 * @param skyColor hexadecimal color of the sky. Default is 0xffffff.
	 * @param groundColor hexadecimal color of the ground. Default is 0xffffff.
	 * @param intensity numeric value of the light's strength/intensity. Default is 1.
	 */
	new (skyColor?: ColorRepresentation, groundColor?: ColorRepresentation, intensity?: number): this;

	/**
	 * @default 'HemisphereLight'
	 */
	type: string;

	/**
	 * This is set equal to [Object3D.DefaultUp](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.DefaultUp) (0, 1, 0), so that the light shines from the top down.
	 * @default THREE.Object3D.DefaultUp
	 */
	position: Vector3;

	/**
	 * The light's sky color, as passed in the constructor.
	 * Default is a new [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) set to white (0xffffff).
	 */
	color: Color;

	/**
	 * The light's ground color, as passed in the constructor.
	 * Default is a new [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) set to white (0xffffff).
	 */
	groundColor: Color;

	readonly isHemisphereLight: true;
}

/**
 * Light probes are an alternative way of adding light to a 3D scene. HemisphereLightProbe is the light estimation data of a single hemisphere light in the scene. For more information about light probes, go to [LightProbe](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LightProbe).
 */
export interface HemisphereLightProbe extends LightProbe {
	/**
	 * Creates a new HemisphereLightProbe.
	 * @param skyColor An instance of Color, string representing a color or a number representing a color.
	 * @param groundColor An instance of Color, string representing a color or a number representing a color.
	 */
	new (skyColor?: ColorRepresentation, groundColor?: ColorRepresentation, intensity?: number): this;

	/**
	 */
	readonly isHemisphereLightProbe: true;
}

/**
 * Abstract base class for lights - all other light types inherit the properties and methods described here.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Light) page for details.
 * See the [ngx light](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_light/Light) page for a live demo.
 *
 */
export interface Light extends Object3D {
	/**
	 * Creates a new Light. Note that this is not intended to be called directly (use one of derived classes instead).
	 *
	 * @param color hexadecimal color of the light. Default is 0xffffff (white).
	 * @param intensity numeric value of the light's strength/intensity. Default is 1.
	 */
	new (hex?: number | string, intensity?: number): this;

	/**
	 * @default 'Light'
	 */
	type: string;

	/**
	 * Color of the light. Defaults to a new [Color](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Color) set to white, if not passed in the constructor.
	 */
	color: Color;

	/**
	 * The light's intensity, or strength.
	 * In [physically correct](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.physicallyCorrectLights) mode, the units of intensity depend on the type of light.
	 * @default 1
	 */
	intensity: number;

	readonly isLight: true;

	shadow: LightShadow;

	/**
	 * Abstract dispose method for lights; implemented by subclasses that have disposable resources.
	 */
	dispose(): void;
}

/**
 * Light probes are an alternative way of adding light to a 3D scene. Unlike classical light sources (e.g. directional, point or spot lights), light probes do not emit light. Instead they store information about light passing through 3D space. During rendering, the light that hits a 3D object is approximated by using the data from the light probe.
 * Light probes are usually created from (radiance) environment maps. The class [LightProbeGenerator](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LightProbeGenerator) can be used to create light probes from instances of [CubeTexture](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CubeTexture) or [WebGLCubeRenderTarget](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLCubeRenderTarget).n However, light estimation data could also be provided in other forms e.g. by WebXR. This enables the rendering of augmented reality content that reacts to real world lighting.
 * The current probe implementation in three.js supports so-called diffuse light probes. This type of light probe is functionally equivalent to an irradiance environment map.
 *
 * ### Examples
 * [WebGL / light probe](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lightprobe) |
 * [WebGL / light probe / cube camera](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lightprobe_cubecamera)
 */
export interface LightProbe extends Light {
	/**
	 * Creates a new LightProbe.
	 * @param sh An instance of [SphericalHarmonics3](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SphericalHarmonics3).
	 * @param intensity Numeric value of the light probe's intensity. Default is 1.
	 */
	new (sh?: SphericalHarmonics3, intensity?: number): this;

	/**
	 * @default 'LightProbe'
	 */
	type: string;

	/**
	 */
	readonly isLightProbe: true;

	/**
	 * A light probe uses spherical harmonics to encode lighting information.
	 * @default new THREE.SphericalHarmonics3()
	 */
	sh: SphericalHarmonics3;

	fromJSON(json: object): LightProbe;
}

/**
 * Serves as a base class for the other shadow classes.
 */
export interface LightShadow {
	/**
	 * Create a new LightShadow. This is not intended to be called directly - it is used as a base class by other light shadows.
	 * @param camer A The light's view of the world.
	 */
	new (camera: Camera): this;

	/**
	 * The light's view of the world. This is used to generate a depth map of the scene; objects behind other objects from the light's perspective will be in shadow.
	 */
	camera: Camera;

	/**
	 * Shadow map bias, how much to add or subtract from the normalized depth when deciding whether a surface is in shadow.
	 * The default is 0. Very tiny adjustments here (in the order of 0.0001) may help reduce artifacts in shadows <h3>[property:Integer blurSamples]</h3>
	 * The amount of samples to use when blurring a VSM shadow map.
	 * @default 0
	 */
	bias: number;

	/**
	 * Defines how much the position used to query the shadow map is offset along the object normal.
	 * The default is 0. Increasing this value can be used to reduce shadow acne especially in large scenes where light shines onto geometry at a shallow angle. The cost is that shadows may appear distorted.
	 * @default 0
	 */
	normalBias: number;

	/**
	 * Setting this to values greater than 1 will blur the edges of the shadow.
	 * High values will cause unwanted banding effects in the shadows - a greater *.mapSize* will allow for a higher value to be used here before these effects become visible.
	 * If [WebGLRenderer.shadowMap.type](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.shadowMap.type) is set to [PCFSoftShadowMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Renderer), radius has no effect and it is recommended to increase softness by decreasing *.mapSize* instead.
	 * Note that this has no effect if the [WebGLRenderer.shadowMap.type](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.shadowMap.type) is set to [BasicShadowMap](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Renderer).
	 * @default 1
	 */
	radius: number;

	/**
	 * @default 8
	 */
	blurSamples: number;

	/**
	 * A [Vector2](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Vector2) defining the width and height of the shadow map.
	 * Higher values give better quality shadows at the cost of computation time. Values must be powers of 2, up to the [WebGLRenderer.capabilities](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.capabilities).maxTextureSize for a given device, although the width and height don't have to be the same (so, for example, (512, 1024) is valid).
	 * The default is *( 512, 512 )*.
	 * @default new THREE.Vector2( 512, 512 )
	 */
	mapSize: Vector2;

	/**
	 * The depth map generated using the internal camera; a location beyond a pixel's depth is in shadow. Computed internally during rendering.
	 * @default null
	 */
	map: WebGLRenderTarget;

	/**
	 * The distribution map generated using the internal camera; an occlusion is calculated based on the distribution of depths. Computed internally during rendering.
	 * @default null
	 */
	mapPass: WebGLRenderTarget;

	/**
	 * Model to shadow camera space, to compute location and depth in shadow map. Stored in a [Matrix4](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Matrix4). This is computed internally during rendering.
	 * @default new THREE.Matrix4()
	 */
	matrix: Matrix4;

	/**
	 * Enables automatic updates of the light's shadow. Default is *true*.
	 * If you do not require dynamic lighting / shadows, you may set this to *false*.
	 * @default true
	 */
	autoUpdate: boolean;

	/**
	 * When set to *true*, shadow maps will be updated in the next *render* call. Default is *false*.
	 * If you have set *.autoUpdate* to *false*, you will need to set this property to *true* and then make a render call to update the light's shadow.
	 * @default false
	 */
	needsUpdate: boolean;

	/**
	 * Copies value of all the properties from the [source](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LightShadow) to this Light.
	 */
	copy(source: LightShadow): this;

	/**
	 * Creates a new LightShadow with the same properties as this one.
	 */
	clone(recursive?: boolean): this;

	/**
	 * Serialize this LightShadow.
	 */
	toJSON(): any;

	/**
	 * Gets the shadow cameras frustum. Used internally by the renderer to cull objects.
	 */
	getFrustum(): number;

	/**
	 */
	updateMatrices(light: Light, viewportIndex?: number): void;

	/**
	 */
	getViewport(viewportIndex: number): Vector4;

	/**
	 * Used internally by the renderer to get the number of viewports that need to be rendered for this shadow.
	 */
	getViewportCount(): Vector4;

	/**
	 * Used internally by the renderer to extend the shadow map to contain all viewports <h3>[method:undefined updateMatrices]( [param:Light light] )</h3>
	 * Update the matrices for the camera and shadow, used internally by the renderer.
	 */
	getFrameExtents(): Vector2;

	/**
	 * Disposes of this shadow's textures ([map](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LightShadow.map) and [mapPass](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LightShadow.mapPass)).
	 */
	dispose(): void;
}

/**
 * A light that gets emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb.
 * This light can cast shadows - see [PointLightShadow](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PointLightShadow) page for details.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PointLight) page for details.
 * See the [ngx light](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_light/PointLight) page for a live demo.
 *
 * ### Examples
 * [lights / pointlights](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lights_pointlights) |
 * [effects / anaglyph](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_effects_anaglyph) |
 * [geometry / text](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_geometry_text) |
 * [lensflares](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lensflares)
 *
 * ### Code Example
 * ```js
 * const light = new THREE.PointLight( 0xff0000, 1, 100 );
 * light.position.set( 50, 50, 50 );
 * scene.add( light );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-light [type]="'PointLight'" [color]="'0xff0000'" [intensity]="0.5" [distance]="100">
 * 	<ngx3js-position [x]="50" [y]="50" [z]="50" ></ngx3js-position>
 * </ngx3js-light>
 * ```
 */
export interface PointLight extends Light {
	/**
	 * For [physically correct](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.physicallyCorrectLights) lighting, set this to 2.
	 * Creates a new PointLight.
	 * @param color hexadecimal color of the light. Default is 0xffffff (white).
	 * @param intensity numeric value of the light's strength/intensity. Default is 1.
	 * @param distance Maximum range of the light. Default is 0 (no limit).
	 * @param decay The amount the light dims along the distance of the light. Default is 1.
	 */
	new (color?: ColorRepresentation, intensity?: number, distance?: number, decay?: number): this;

	/**
	 * @default 'PointLight'
	 */
	type: string;

	/**
	 * The light's intensity. Default is *1*.
	 * In [physically correct](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.physicallyCorrectLights) mode, intensity is the luminous intensity of the light measured in candela (cd).
	 * Changing the intensity will also change the light's power.
	 * @default 1
	 */
	intensity: number;

	/**
	 * <em>Default mode</em> - When distance is zero, light does not attenuate. When distance is non-zero, light will attenuate linearly from maximum intensity at the light's position down to zero at this distance from the light.
	 * <em>[Physically correct](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.physicallyCorrectLights) mode</em> - When distance is zero, light will attenuate according to inverse-square law to infinite distance. When distance is non-zero, light will attenuate according to inverse-square law until near the distance cutoff, where it will then attenuate quickly and smoothly to 0. Inherently, cutoffs are not physically correct.
	 * Default is *0.0*.
	 * @default 0
	 */
	distance: number;

	/**
	 * The amount the light dims along the distance of the light In [physically correct](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.physicallyCorrectLights) mode, decay = 2 leads to physically realistic light falloff.
	 * Default is *1*.
	 * @default 1
	 */
	decay: number;

	/**
	 * A [PointLightShadow](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PointLightShadow) used to calculate shadows for this light.
	 * The lightShadow's [camera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LightShadow.camera) is set to a  [PerspectiveCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera) with [fov](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.fov) of 90, [aspect](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.aspect) of 1, [near](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.near) clipping plane at 0.5 and	[far](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.far) clipping plane at 500.
	 * @default new THREE.PointLightShadow()
	 */
	shadow: PointLightShadow;

	/**
	 * The light's power.
	 * In [physically correct](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.physicallyCorrectLights) mode, power is the luminous power of the light measured in lumens (lm).
	 * Changing the power will also change the light's intensity.
	 */
	power: number;
}

/**
 * This is used internally by [PointLights](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PointLight) for calculating shadows.
 *
 * ### Code Example
 * ```js
 * // Create a WebGLRenderer and turn on shadows in the renderer
 * const renderer = new THREE.WebGLRenderer();
 * renderer.shadowMap.enabled = true;
 * renderer.shadowMap.type = THREE.PCFSoftShadowMap;
 * // default THREE.PCFShadowMap
 * // Create a PointLight and turn on shadows for the light
 * const light = new THREE.PointLight( 0xffffff, 1, 100 );
 * light.position.set( 0, 10, 4 );
 * light.castShadow = true; // default false
 * scene.add( light );
 * // Set up shadow properties for the light
 * light.shadow.mapSize.width = 512; // default
 * light.shadow.mapSize.height = 512; // default
 * light.shadow.camera.near = 0.5; // default
 * light.shadow.camera.far = 500; // default
 * //Create a sphere that cast shadows (but does not receive them)
 * const sphereGeometry = new THREE.SphereGeometry( 5, 32, 32 );
 * const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
 * const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
 * sphere.castShadow = true; //default is false
 * sphere.receiveShadow = false; //default
 * scene.add( sphere );
 * // Create a plane that receives shadows (but does not cast them)
 * const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
 * const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
 * const plane = new THREE.Mesh( planeGeometry, planeMaterial );
 * plane.receiveShadow = true;
 * scene.add( plane );
 * // Create a helper for the shadow camera (optional)
 * const helper = new THREE.CameraHelper( light.shadow.camera );
 * scene.add( helper );
 * ```
 */
export interface PointLightShadow extends LightShadow {
	/**
	 * Creates a new PointLightShadow. This is not intended to be called directly - it is called internally by [PointLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PointLight).
	 */
	new (): this;

	/**
	 */
	camera: PerspectiveCamera;
}

/**
 * RectAreaLight emits light uniformly across the face a rectangular plane. This light type can be used to simulate light sources such as bright windows or strip lighting.
 * Important Notes:
 * There is no shadow support.
 * Only [MeshStandardMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MeshStandardMaterial) and [MeshPhysicalMaterial](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/MeshPhysicalMaterial) are supported.
 * You have to include [RectAreaLightUniformsLib](https://threejs.org/examples/jsm/lights/RectAreaLightUniformsLib.js) into your scene and call *init()*.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/RectAreaLight) page for details.
 * See the [ngx light](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_light/RectAreaLight) page for a live demo.
 *
 * ### Code Example
 * ```js
 * const width = 10;
 * const height = 10;
 * const intensity = 1;
 * const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
 * rectLight.position.set( 5, 5, 0 );
 * rectLight.lookAt( 0, 0, 0 );
 * scene.add( rectLight )
 * const rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
 * rectLight.add( rectLightHelper );
 * ```
 *
 * ### Ngx3Js Code Example
 * ```html
 * <ngx3js-light [type]="'RectAreaLight'" [color]="'0xffffff'" [intensity]="1" [width]="10" [height]="10">
 * 	<ngx3js-position [x]="5" [y]="5" [z]="0" ></ngx3js-position>
 * 	<ngx3js-lookat [x]="0" [y]="0" [z]="0" ></ngx3js-lookat>
 * 	<ngx3js-helper [type]="'RectAreaLightHelper'"></ngx3js-helper>
 * </ngx3js-light>
 * ```
 *
 * ### Examples
 * [WebGL / rectarealight](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lights_rectarealight)
 */
export interface RectAreaLight extends Light {
	/**
	 * Creates a new RectAreaLight.
	 * @param color hexadecimal color of the light. Default is 0xffffff (white).
	 * @param intensity The light's intensity, or brightness. Default is 1.
	 * @param width width of the light. Default is 10.
	 * @param height height of the light. Default is 10.
	 */
	new (color?: ColorRepresentation, intensity?: number, width?: number, height?: number): this;

	/**
	 * @default 'RectAreaLight'
	 */
	type: string;

	/**
	 * width of the light. Default is 10
	 * @default 10
	 */
	width: number;

	/**
	 * height of the light. Default is 10.
	 * @default 10
	 */
	height: number;

	/**
	 * The light's intensity. Default is *1*.
	 * In [physically correct](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.physicallyCorrectLights) mode, intensity is the luminance (brightness) of the light measured in nits (cd/m^2).
	 * Changing the intensity will also change the light's power.
	 * @default 1
	 */
	intensity: number;

	/**
	 * The light's power.
	 * In [physically correct](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.physicallyCorrectLights) mode, power is the luminous power of the light measured in lumens (lm).
	 * Changing the power will also change the light's intensity.
	 */
	power: number;

	/**
	 */
	readonly isRectAreaLight: true;
}

/**
 * This light gets emitted from a single point in one direction, along a cone that increases in size the further from the light it gets.
 * This light can cast shadows - see the [SpotLightShadow](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpotLightShadow) page for details.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpotLight) page for details.
 * See the [ngx light](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_light/SpotLight) page for a live demo.
 *
 * ### Examples
 * [lights / spotlight](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lights_spotlight) |
 * [lights / spotlights](https://outmindkjg.github.io/ngx3js-doc/#/examples/webgl_lights_spotlights)
 *
 * ### Code Example
 * ```js
 * //  white spotlight shining from the side, casting a shadow
 * const spotLight = new THREE.SpotLight( 0xffffff );
 * spotLight.position.set( 100, 1000, 100 );
 * spotLight.castShadow = true;
 * spotLight.shadow.mapSize.width = 1024;
 * spotLight.shadow.mapSize.height = 1024;
 * spotLight.shadow.camera.near = 500;
 * spotLight.shadow.camera.far = 4000;
 * spotLight.shadow.camera.fov = 30;
 * scene.add( spotLight );
 * ```
 *
 * ### Ngx3Js Code Example
 * 
 * ```html
 * <ngx3js-light [type]="'SpotLight'" [color]="'0xffffff'" [intensity]="1.5" [castShadow]="true"
 * 	[shadowCameraNear]="500" [shadowCameraFar]="4000" [shadowCameraFov]="30" [shadowMapSize]="1024"
 * ><ngx3js-position [x]="100" [y]="1000" [z]="100"></ngx3js-position></ngx3js-light>
 * ```
 */
export interface SpotLight extends Light {
	/**
	 * Creates a new SpotLight.
	 * @param color hexadecimal color of the light. Default is 0xffffff (white).
	 * @param intensity numeric value of the light's strength/intensity. Default is 1.
	 * @param distance Maximum range of the light. Default is 0 (no limit).
	 * @param angle Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.
	 * @param penumbr A Percent of the spotlight cone that is attenuated due to penumbra. Takes values between zero and 1. Default is zero.
	 * @param decay The amount the light dims along the distance of the light.
	 */
	new (
		color?: ColorRepresentation,
		intensity?: number,
		distance?: number,
		angle?: number,
		penumbra?: number,
		decay?: number
	): this;

	/**
	 * @default 'SpotLight'
	 */
	type: string;

	/**
	 * This is set equal to [Object3D.DefaultUp](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.DefaultUp) (0, 1, 0), so that the light shines from the top down.
	 * @default THREE.Object3D.DefaultUp
	 */
	position: Vector3;

	/**
	 * The Spotlight points from its *.position* to target.position. The default position of the target is *(0, 0, 0)*.
	 * *Note*: For the target's position to be changed to anything other than the default, it must be added to the [scene](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Scene) using scene.add( light.target );
	 * This is so that the target's [matrixWorld](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.matrixWorld) gets automatically updated each frame.
	 * It is also possible to set the target to be another object in the scene (anything with a [position](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/Object3D.position) property), like so:
	 *
	 * ### Code Example
	 * ```js
	 * const targetObject = new THREE.Object3D();
	 * scene.add(targetObject);
	 * light.target = targetObject;
	 * ```
	 * The spotlight will now track the target object.
	 *
	 * @default new THREE.Object3D()
	 */
	target: Object3D;

	/**
	 * The light's intensity. Default is *1*.
	 * In [physically correct](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.physicallyCorrectLights) mode, intensity is the luminous intensity of the light measured in candela (cd).
	 * Changing the power will also change the light's intensity.
	 * @default 1
	 */
	intensity: number;

	/**
	 * <em>Default mode</em> - When distance is zero, light does not attenuate. When distance is non-zero, light will attenuate linearly from maximum intensity at the light's position down to zero at this distance from the light.
	 * <em>[Physically correct](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.physicallyCorrectLights) mode</em> - When distance is zero, light will attenuate according to inverse-square law to infinite distance. When distance is non-zero, light will attenuate according to inverse-square law until near the distance cutoff, where it will then attenuate quickly and smoothly to 0. Inherently, cutoffs are not physically correct.
	 * Default is *0.0*.
	 * @default 0
	 */
	distance: number;

	/**
	 * Maximum extent of the spotlight, in radians, from its direction. Should be no more than *Math.PI/2*. The default is *Math.PI/3*.
	 * @default Math.PI / 3.
	 */
	angle: number;

	/**
	 * The amount the light dims along the distance of the light.
	 * In [physically correct](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.physicallyCorrectLights) mode, decay = 2 leads to physically realistic light falloff. The default is *1*.
	 * @default 1
	 */
	decay: number;

	/**
	 * A [SpotLightShadow](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpotLightShadow) used to calculate shadows for this light.
	 * @default new THREE.SpotLightShadow()
	 */
	shadow: SpotLightShadow;

	/**
	 * If set to *true* light will cast dynamic shadows. *Warning*: This is expensive and requires tweaking to get shadows looking right. See the [SpotLightShadow](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpotLightShadow) for details.
	 * @default false
	 */
	castShadow: boolean;

	/**
	 * The light's power.
	 * In [physically correct](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/WebGLRenderer.physicallyCorrectLights) mode, power is the luminous power of the light measured in lumens (lm).
	 * Changing this will also change the light's intensity.
	 */
	power: number;

	/**
	 * Percent of the spotlight cone that is attenuated due to penumbra. Takes values between zero and 1. The default is *0.0*.
	 * @default 0
	 */
	penumbra: number;

	/**
	 */
	readonly isSpotLight: true;
}

/**
 * This is used internally by [SpotLights](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpotLight) for calculating shadows.
 *
 * ### Code Example
 * ```js
 * // Create a WebGLRenderer and turn on shadows in the renderer
 * const renderer = new THREE.WebGLRenderer();
 * renderer.shadowMap.enabled = true;
 * renderer.shadowMap.type = THREE.PCFSoftShadowMap;
 * // default THREE.PCFShadowMap
 * // Create a SpotLight and turn on shadows for the light
 * const light = new THREE.SpotLight( 0xffffff );
 * light.castShadow = true; // default false
 * scene.add( light );
 * // Set up shadow properties for the light
 * light.shadow.mapSize.width = 512; // default
 * light.shadow.mapSize.height = 512; // default
 * light.shadow.camera.near = 0.5; // default
 * light.shadow.camera.far = 500; // default
 * light.shadow.focus = 1; // default
 * // Create a sphere that cast shadows (but does not receive them)
 * const sphereGeometry = new THREE.SphereGeometry( 5, 32, 32 );
 * const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
 * const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
 * sphere.castShadow = true; //default is false
 * sphere.receiveShadow = false; //default
 * scene.add( sphere );
 * // Create a plane that receives shadows (but does not cast them)
 * const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
 * const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
 * const plane = new THREE.Mesh( planeGeometry, planeMaterial );
 * plane.receiveShadow = true;
 * scene.add( plane );
 * // Create a helper for the shadow camera (optional)
 * const helper = new THREE.CameraHelper( light.shadow.camera );
 * scene.add( helper );
 * ```
 */
export interface SpotLightShadow extends LightShadow {
	/**
	 * The light's view of the world. This is used to generate a depth map of the scene; objects behind other objects from the light's perspective will be in shadow.
	 * The default is a  [PerspectiveCamera](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera) with [near](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.near) clipping plane at 0.5.
	 * The [fov](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.fov) will track the [angle](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpotLight.angle) property of the owning [SpotLight](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpotLight) via the [update](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpotLightShadow.update) method. Similarly, the [aspect](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.aspect) property will track the aspect of the [mapSize](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LightShadow.mapSize). If the [distance](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/SpotLight.distance) property of the light is set, the [far](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/PerspectiveCamera.far) clipping plane will track that, otherwise it defaults to 500.
	 */
	camera: PerspectiveCamera;

	/**
	 */
	readonly isSpotLightShadow: true;

	/**
	 * Used to focus the shadow camera. The camera's field of view is set as a percentage of the spotlight's field-of-view. Range is [0, 1]. Default is 1.0.
	 * @default 1
	 */
	focus: number;
}
