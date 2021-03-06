import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { NgxAnimationGroupComponent } from './animation-group/animation-group.component';
import { NgxAudioComponent } from './audio/audio.component';
import { NgxBackgroundComponent } from './background/background.component';
import { NgxCameraComponent } from './camera/camera.component';
import { NgxCanvasComponent } from './canvas/canvas.component';
import { NgxTextureChartJsComponent, NgxTextureEChartsComponent,NgxEventProxyComponent } from './chart/index';
import { NgxClipComponent } from './clip/clip.component';
import { NgxControlComponent } from './control/control.component';
import { NgxAbstractControllerComponent } from './controller.component.abstract';
import { NgxControllerItemComponent } from './controller/controller-item/controller-item.component';
import { NgxControllerComponent } from './controller/controller.component';
import { NgxCurveComponent } from './curve/curve.component';
import { N3JS_DIRECTIVES } from './directives/index';
import { NgxEffectComponent } from './effect/effect.component';
import { NgxFogComponent } from './fog/fog.component';
import { NgxAbstractGeometryComponent } from './geometry.abstract';
import { NgxGeometryBirdComponent } from './geometry/bird/bird.component';
import { NgxGeometryComponent } from './geometry/geometry.component';
import { NgxGeometryIconComponent }from './geometry-icon/geometry-icon.component';

import { NgxHelperComponent } from './helper/helper.component';
import { NgxHtmlComponent } from './html/html.component';
import { NgxKeyframeComponent } from './keyframe/keyframe.component';
import { NgxLensflareelementComponent } from './lensflareelement/lensflareelement.component';
import { NgxLightComponent } from './light/light.component';
import { NgxListenerComponent } from './listener/listener.component';
import { NgxLocalStorageService } from './local-storage.service';
import { NgxLookatComponent } from './lookat/lookat.component';
import { NgxAbstractMaterialComponent } from './material.abstract';
import { NgxMaterialComponent } from './material/material.component';
import { NgxMeshComponent } from './mesh/mesh.component';
import { NgxMixerComponent } from './mixer/mixer.component';
import { NgxAbstractObject3dComponent } from './object3d.abstract';
import { NgxPassComponent } from './pass/pass.component';
import { NgxPhysicsConstraintComponent } from './physics/physics-constraint/physics-constraint.component';
import { NgxPhysicsComponent } from './physics/physics.component';
import { N3JS_PIPES } from './pipes/index';
import { NgxPlaneComponent } from './plane/plane.component';
import { NgxPositionComponent } from './position/position.component';
import { NgxRenderTargetComponent } from './render-target/render-target.component';
import { NgxRendererComponent } from './renderer/renderer.component';
import { NgxRigidbodyNodeComponent } from './rigidbody/rigidbody-node/rigidbody-node.component';
import { NgxRigidbodyComponent } from './rigidbody/rigidbody.component';
import { NgxRotationComponent } from './rotation/rotation.component';
import { NgxScaleComponent } from './scale/scale.component';
import { NgxSceneComponent } from './scene/scene.component';
import { NgxShaderComponent } from './shader/shader.component';
import { NgxShapeComponent } from './shape/shape.component';
import { NgxSharedComponent } from './shared/shared.component';
import { NgxSizeComponent } from './size/size.component';
import { NgxAbstractSubscribeComponent } from './subscribe.abstract';
import { NgxSvgComponent } from './svg/svg.component';
import { NgxAbstractTextureComponent } from './texture.abstract';
import { NgxTextureComponent } from './texture/texture.component';
import { NgxThreeGeometryCustom } from './three-geometry-custom';
import { NgxToolsComponent } from './tools/tools.component';
import { NgxTransformComponent } from './transform/transform.component';
import { NgxTranslationComponent } from './translation/translation.component';
import { NgxTweenComponent } from './tween/tween.component';
import { NgxViewerComponent } from './viewer/viewer.component';
import { NgxViewportInComponent } from './viewport-in/viewport-in.component';
import { NgxVisualComponent } from './visual/visual.component';

const N3JS_COMPONENTS: Array<Type<any>> = [
	NgxLookatComponent,
	NgxFogComponent,
	NgxTextureComponent,
	NgxLensflareelementComponent,
	NgxShaderComponent,
	NgxSceneComponent,
	NgxCameraComponent,
	NgxRendererComponent,
	NgxGeometryComponent,
	NgxGeometryIconComponent,
	NgxMaterialComponent,
	NgxMeshComponent,
	NgxPositionComponent,
	NgxRotationComponent,
	NgxScaleComponent,
	NgxShapeComponent,
	NgxCurveComponent,
	NgxSvgComponent,
	NgxTranslationComponent,
	NgxPassComponent,
	NgxEffectComponent,
	NgxTweenComponent,
	NgxSharedComponent,
	NgxMixerComponent,
	NgxClipComponent,
	NgxListenerComponent,
	NgxAudioComponent,
	NgxPlaneComponent,
	NgxHtmlComponent,
	NgxCanvasComponent,
	NgxVisualComponent,
	NgxTransformComponent,
	NgxBackgroundComponent,
	NgxControllerComponent,
	NgxPhysicsComponent,
	NgxRigidbodyComponent,
	NgxControlComponent,
	NgxToolsComponent,
	NgxLightComponent,
	NgxHelperComponent,
	NgxViewerComponent,
	NgxGeometryBirdComponent,
	NgxAnimationGroupComponent,
	NgxControllerItemComponent,
	NgxKeyframeComponent,
	NgxPhysicsConstraintComponent,
	NgxRigidbodyNodeComponent,
	NgxRenderTargetComponent,
	NgxSizeComponent,
	NgxTextureChartJsComponent, 
	NgxTextureEChartsComponent,
	NgxEventProxyComponent,
	NgxAbstractSubscribeComponent,
	NgxAbstractTextureComponent,
	NgxAbstractMaterialComponent,
	NgxAbstractGeometryComponent,
	NgxAbstractControllerComponent,
	NgxAbstractObject3dComponent,
	NgxThreeGeometryCustom,
	NgxViewportInComponent,
];

/**
 * Ngx3Js
 *
 * @export
 * @class Ngx3JsModule
 */
@NgModule({
	declarations: [...N3JS_PIPES, ...N3JS_DIRECTIVES, ...N3JS_COMPONENTS],
	entryComponents: [...N3JS_COMPONENTS],
	imports: [CommonModule],
	exports: [...N3JS_PIPES, ...N3JS_DIRECTIVES, ...N3JS_COMPONENTS],
	providers: [NgxLocalStorageService],
})
export class Ngx3JsModule {}
