import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { AnimationGroupComponent } from './animation-group/animation-group.component';
import { AudioComponent } from './audio/audio.component';
import { BackgroundComponent } from './background/background.component';
import { CameraComponent } from './camera/camera.component';
import { CanvasComponent } from './canvas/canvas.component';
import { AbstractChartComponent } from './chart.abstract';
import { ChartAxesComponent } from './chart/axes/axes.component';
import { ChartBarComponent } from './chart/bar/bar.component';
import { ChartBubbleComponent } from './chart/bubble/bubble.component';
import { ChartComponent } from './chart/chart.component';
import { ChartControllerComponent } from './chart/controller/controller.component';
import { ChartDoughnutComponent } from './chart/doughnut/doughnut.component';
import { ChartLegendComponent } from './chart/legend/legend.component';
import { ChartLineComponent } from './chart/line/line.component';
import { ChartPieComponent } from './chart/pie/pie.component';
import { ChartPolarAreaComponent } from './chart/polar-area/polar-area.component';
import { ChartRadarComponent } from './chart/radar/radar.component';
import { ChartScatterComponent } from './chart/scatter/scatter.component';
import { ChartTitleComponent } from './chart/title/title.component';
import { ClipComponent } from './clip/clip.component';
import { EffectComponent } from './effect/effect.component';
import { ControlComponent } from './control/control.component';
import { AbstractControllerComponent } from './controller.component.abstract';
import { ControllerItemComponent } from './controller/controller-item/controller-item.component';
import { ControllerComponent } from './controller/controller.component';
import { CurveComponent } from './curve/curve.component';
import { NGX3JS_DIRECTIVES } from './directives/index';
import { FogComponent } from './fog/fog.component';
import { AbstractGeometryComponent } from './geometry.abstract';
import { GeometryBirdComponent } from './geometry/bird/bird.component';
import { GeometryComponent } from './geometry/geometry.component';
import { HelperComponent } from './helper/helper.component';
import { HtmlComponent } from './html/html.component';
import { ThreeGeometryCustom } from './interface';
import { KeyframeComponent } from './keyframe/keyframe.component';
import { LensflareelementComponent } from './lensflareelement/lensflareelement.component';
import { LightComponent } from './light/light.component';
import { ListenerComponent } from './listener/listener.component';
import { LocalStorageService } from './local-storage.service';
import { LookatComponent } from './lookat/lookat.component';
import { AbstractMaterialComponent } from './material.abstract';
import { MaterialComponent } from './material/material.component';
import { MeshComponent } from './mesh/mesh.component';
import { MixerComponent } from './mixer/mixer.component';
import { AbstractObject3dComponent } from './object3d.abstract';
import { PassComponent } from './pass/pass.component';
import { PhysicsConstraintComponent } from './physics/physics-constraint/physics-constraint.component';
import { PhysicsComponent } from './physics/physics.component';
import { NGX3JS_PIPES } from './pipes/index';
import { PlaneComponent } from './plane/plane.component';
import { PositionComponent } from './position/position.component';
import { RenderTargetComponent } from './render-target/render-target.component';
import { RendererComponent } from './renderer/renderer.component';
import { RigidbodyNodeComponent } from './rigidbody/rigidbody-node/rigidbody-node.component';
import { RigidbodyComponent } from './rigidbody/rigidbody.component';
import { RotationComponent } from './rotation/rotation.component';
import { ScaleComponent } from './scale/scale.component';
import { SceneComponent } from './scene/scene.component';
import { ShaderComponent } from './shader/shader.component';
import { ShapeComponent } from './shape/shape.component';
import { SharedComponent } from './shared/shared.component';
import { SizeComponent } from './size/size.component';
import { AbstractSubscribeComponent } from './subscribe.abstract';
import { SvgComponent } from './svg/svg.component';
import { AbstractTextureComponent } from './texture.abstract';
import { TextureComponent } from './texture/texture.component';
import { ToolsComponent } from './tools/tools.component';
import { TransformComponent } from './transform/transform.component';
import { TranslationComponent } from './translation/translation.component';
import { AbstractTweenComponent } from './tween.abstract';
import { TweenComponent } from './tween/tween.component';
import { ViewerComponent } from './viewer/viewer.component';
import { VisualComponent } from './visual/visual.component';
import { NgxViewportInComponent } from '.';

const NGX3JS_COMPONENTS: Array<Type<any>> = [
	LookatComponent,
	FogComponent,
	TextureComponent,
	LensflareelementComponent,
	ShaderComponent,
	SceneComponent,
	CameraComponent,
	RendererComponent,
	GeometryComponent,
	MaterialComponent,
	MeshComponent,
	PositionComponent,
	RotationComponent,
	ScaleComponent,
	ShapeComponent,
	CurveComponent,
	SvgComponent,
	TranslationComponent,
	PassComponent,
	EffectComponent,
	TweenComponent,
	SharedComponent,
	MixerComponent,
	ClipComponent,
	ListenerComponent,
	AudioComponent,
	PlaneComponent,
	HtmlComponent,
	CanvasComponent,
	VisualComponent,
	TransformComponent,
	BackgroundComponent,
	ControllerComponent,
	PhysicsComponent,
	RigidbodyComponent,
	ControlComponent,
	ToolsComponent,
	LightComponent,
	HelperComponent,
	ViewerComponent,
	GeometryBirdComponent,
	AnimationGroupComponent,
	ControllerItemComponent,
	KeyframeComponent,
	PhysicsConstraintComponent,
	RigidbodyNodeComponent,
	RenderTargetComponent,
	SizeComponent,
	ChartComponent,
	ChartLineComponent,
	ChartBarComponent,
	ChartRadarComponent,
	ChartDoughnutComponent,
	ChartPieComponent,
	ChartBubbleComponent,
	ChartScatterComponent,
	ChartAxesComponent,
	ChartLegendComponent,
	ChartTitleComponent,
	ChartPolarAreaComponent,
	ChartControllerComponent,
	AbstractSubscribeComponent,
	AbstractTweenComponent,
	AbstractTextureComponent,
	AbstractMaterialComponent,
	AbstractGeometryComponent,
	AbstractControllerComponent,
	AbstractObject3dComponent,
	ThreeGeometryCustom,
	AbstractChartComponent,
	NgxViewportInComponent
];

/**
 * Ngx3Js
 *
 * @export
 * @class Ngx3JsModule
 */
@NgModule({
	declarations: [...NGX3JS_PIPES, ...NGX3JS_DIRECTIVES, ...NGX3JS_COMPONENTS],
	entryComponents: [...NGX3JS_COMPONENTS],
	imports: [CommonModule],
	exports: [...NGX3JS_PIPES, ...NGX3JS_DIRECTIVES, ...NGX3JS_COMPONENTS],
	providers: [LocalStorageService],
})
export class Ngx3JsModule {}
