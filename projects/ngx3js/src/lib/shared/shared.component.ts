import {
	AfterContentInit,
	Component,
	ContentChildren,
	OnInit,
	QueryList,
	SimpleChanges,
} from '@angular/core';
import { NgxAnimationGroupComponent } from '../animation-group/animation-group.component';
import { NgxAbstractGeometryComponent } from '../geometry.abstract';
import { NgxHtmlComponent } from '../html/html.component';
import { NgxThreeUtil } from '../interface';
import { NgxLensflareelementComponent } from '../lensflareelement/lensflareelement.component';
import { NgxAbstractMaterialComponent } from '../material.abstract';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';
import { NgxSvgComponent } from '../svg/svg.component';
import { NgxAbstractTextureComponent } from '../texture.abstract';
import { NgxAudioComponent } from './../audio/audio.component';
import { NgxCameraComponent } from './../camera/camera.component';
import { NgxAbstractControllerComponent } from './../controller.component.abstract';
import { NgxHelperComponent } from './../helper/helper.component';
import { NgxLightComponent } from './../light/light.component';
import { NgxListenerComponent } from './../listener/listener.component';
import { NgxLookatComponent } from './../lookat/lookat.component';
import { NgxMeshComponent } from './../mesh/mesh.component';
import { NgxPositionComponent } from './../position/position.component';
import { NgxRigidbodyComponent } from './../rigidbody/rigidbody.component';
import { NgxRotationComponent } from './../rotation/rotation.component';
import { NgxScaleComponent } from './../scale/scale.component';

/**
 * NgxSharedComponent
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSharedComponent) page for details.
 *
 * ```html
 * <ngx3js-shared></ngx3js-shared>
 * <ngx3js-shared (onLoad)="setShared($event)"></ngx3js-shared>
 * ```
 */
@Component({
	selector: 'ngx3js-shared',
	templateUrl: './shared.component.html',
	styleUrls: ['./shared.component.scss'],
})
export class NgxSharedComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit, AfterContentInit
{
	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxAbstractGeometryComponent, { descendants: false }) private geometryList: QueryList<NgxAbstractGeometryComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxAbstractMaterialComponent, { descendants: false }) private materialList: QueryList<NgxAbstractMaterialComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxAbstractTextureComponent, { descendants: false }) private textureList: QueryList<NgxAbstractTextureComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxLensflareelementComponent, { descendants: false }) private lensflareElementList: QueryList<NgxLensflareelementComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxSvgComponent, { descendants: false }) private svgList: QueryList<NgxSvgComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxListenerComponent, { descendants: false }) private listnerList: QueryList<NgxListenerComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxAudioComponent, { descendants: false }) private audioList: QueryList<NgxAudioComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxHtmlComponent, { descendants: false }) private cssChildrenList: QueryList<NgxHtmlComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxRigidbodyComponent, { descendants: false }) private rigidbodyList: QueryList<NgxRigidbodyComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxMeshComponent, { descendants: false }) private meshList: QueryList<NgxMeshComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxCameraComponent, { descendants: false }) private cameraList: QueryList<NgxCameraComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxHelperComponent, { descendants: false }) private helperList: QueryList<NgxHelperComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxLightComponent, { descendants: false }) private lightList: QueryList<NgxLightComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxAbstractControllerComponent, { descendants: false })
	public controllerList: QueryList<NgxAbstractControllerComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxPositionComponent, { descendants: false }) private positionList: QueryList<NgxPositionComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxRotationComponent, { descendants: false }) private rotationList: QueryList<NgxRotationComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxScaleComponent, { descendants: false }) private scaleList: QueryList<NgxScaleComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxLookatComponent, { descendants: false }) private lookatList: QueryList<NgxLookatComponent>;

	/**
	 * Content children of shared component
	 */
	@ContentChildren(NgxAnimationGroupComponent, { descendants: false }) private animationGroupList: QueryList<NgxAnimationGroupComponent>;

	/**
	 * Creates an instance of shared component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('shared');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
		if (changes) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(
			this.geometryList,
			'geometryList',
			'geometry'
		);
		this.subscribeListQueryChange(
			this.materialList,
			'materialList',
			'material'
		);
		this.subscribeListQueryChange(this.textureList, 'textureList', 'texture');
		this.subscribeListQueryChange(
			this.lensflareElementList,
			'lensflareElementList',
			'lensflareElement'
		);
		this.subscribeListQueryChange(this.svgList, 'svgList', 'svg');
		this.subscribeListQueryChange(this.listnerList, 'listnerList', 'listner');
		this.subscribeListQueryChange(this.audioList, 'audioList', 'audio');
		this.subscribeListQueryChange(
			this.cssChildrenList,
			'cssChildrenList',
			'cssChildren'
		);
		this.subscribeListQueryChange(
			this.rigidbodyList,
			'rigidbodyList',
			'rigidbody'
		);
		this.subscribeListQueryChange(this.meshList, 'meshList', 'mesh');
		this.subscribeListQueryChange(this.cameraList, 'cameraList', 'camera');
		this.subscribeListQueryChange(this.helperList, 'helperList', 'helper');
		this.subscribeListQueryChange(this.lightList, 'lightList', 'light');
		this.subscribeListQueryChange(
			this.controllerList,
			'controllerList',
			'controller'
		);
		this.subscribeListQueryChange(
			this.positionList,
			'positionList',
			'position'
		);
		this.subscribeListQueryChange(
			this.rotationList,
			'rotationList',
			'rotation'
		);
		this.subscribeListQueryChange(this.scaleList, 'scaleList', 'scale');
		this.subscribeListQueryChange(this.lookatList, 'lookatList', 'lookat');
		this.subscribeListQueryChange(
			this.animationGroupList,
			'animationGroupList',
			'animation-group'
		);
		super.ngAfterContentInit();
	}

	/**
	 * Shared obj of shared component
	 */
	private sharedObj: any = null;

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		if (this.sharedObj !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, [
					'geometry',
					'material',
					'texture',
					'lensflareelement',
					'svg',
					'listner',
					'audio',
					'csschildren',
					'rigidbody',
					'mesh',
					'camera',
					'helper',
					'light',
					'controller',
					'position',
					'rotation',
					'scale',
					'animation-group',
					'lookat',
				]);
			}
			if (NgxThreeUtil.isIndexOf(changes, ['type'])) {
				return;
			}
			changes.forEach((change) => {
				switch (change) {
					case 'geometry':
						this.geometryList.forEach((geometry) => {
							geometry.getGeometry();
						});
						break;
					case 'material':
						this.materialList.forEach((material) => {
							material.getMaterial();
						});
						break;
					case 'texture':
						this.textureList.forEach((texture) => {
							// texture.getTexture();
						});
						break;
					case 'lensflare':
						this.lensflareElementList.forEach((lensflareElement) => {
							lensflareElement.getLensflareElement();
						});
						break;
					case 'svg':
						this.svgList.forEach((svg) => {
							svg.getSVGResult(() => {});
						});
						break;
					case 'listner':
						this.listnerList.forEach((listner) => {
							listner.getListener();
						});
						break;
					case 'audio':
						this.audioList.forEach((audio) => {
							audio.getAudio();
						});
						break;
					case 'geometry':
						this.cssChildrenList.forEach((cssChildren) => {
							cssChildren.getHtml();
						});
						break;
					case 'rigidbody':
						this.rigidbodyList.forEach((rigidbody) => {
							rigidbody.getRigidBody();
						});
						break;
					case 'mesh':
						this.meshList.forEach((mesh) => {
							mesh.getObject3d();
						});
						break;
					case 'camera':
						this.cameraList.forEach((camera) => {
							camera.getObject3d();
						});
						break;
					case 'helper':
						this.helperList.forEach((helper) => {
							helper.getHelper();
						});
						break;
					case 'light':
						this.lightList.forEach((light) => {
							light.getObject3d();
						});
						break;
					case 'position':
						this.positionList.forEach((position) => {
							position.getPosition();
						});
						break;
					case 'rotation':
						this.rotationList.forEach((rotation) => {
							rotation.getRotation();
						});
						break;
					case 'scale':
						this.scaleList.forEach((scale) => {
							scale.getScale();
						});
						break;
					case 'animation-group':
						this.animationGroupList.forEach((animationGroup) => {
							animationGroup.getAnimationGroup();
						});
						break;
					case 'lookat':
						this.lookatList.forEach((lookat) => {
							lookat.getLookAt();
						});
						break;
				}
			});
		}
		super.applyChanges(changes);
	}

	/**
	 * Gets shared
	 * @returns shared
	 */
	public getShared(): any {
		if (this.sharedObj === null || this._needUpdate) {
			this.needUpdate = false;
			this.sharedObj = { shared: Math.random() };
			super.setObject(this.sharedObj);
		}
		return this.sharedObj;
	}

	/**
	 * Gets geometry components
	 * @returns geometry components
	 */
	public getGeometryComponents(): NgxAbstractGeometryComponent[] {
		return this.getComponents(this.geometryList);
	}

	/**
	 * Gets material components
	 * @returns material components
	 */
	public getMaterialComponents(): NgxAbstractMaterialComponent[] {
		return this.getComponents(this.materialList);
	}

	/**
	 * Gets texture components
	 * @returns texture components
	 */
	public getTextureComponents(): NgxAbstractTextureComponent[] {
		return this.getComponents(this.textureList);
	}

	/**
	 * Gets animation group components
	 * @returns animation group components
	 */
	public getAnimationGroupComponents(): NgxAnimationGroupComponent[] {
		return this.getComponents(this.animationGroupList);
	}

	/**
	 * Gets components
	 * @param list
	 * @returns components
	 */
	public getComponents(list: QueryList<any>): any[] {
		const result: any[] = [];
		list.forEach((ele) => {
			result.push(ele);
		});
		return result;
	}
}
