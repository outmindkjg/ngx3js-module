import { Component, forwardRef, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgxAbstractGeometryComponent } from '../geometry.abstract';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { NgxLocalStorageService } from '../local-storage.service';
import { IIconInfo } from '../ngx-interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * The Geometry Icon component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxGeometryIconComponent) page for details.
 * See the [ngx icon](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_icons) page for a live demo.
 * See the [Icons - Google Fonts](https://fonts.google.com/icons) page for detail.
 *
 * @see THREE.BufferGeometry
 */
@Component({
	selector: 'ngx3js-geometry-icon',
	templateUrl: './geometry-icon.component.html',
	styleUrls: ['./geometry-icon.component.scss'],
	providers: [
		{
			provide: NgxAbstractGeometryComponent,
			useExisting: forwardRef(() => NgxGeometryIconComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxGeometryIconComponent),
		},
	],
})
export class NgxGeometryIconComponent extends NgxAbstractGeometryComponent implements OnInit, OnDestroy {
	/**
	 * The type  of geometry
	 *
	 * |   Icon Name               | File Name | Icon Alias |
	 * |:--------------------------|:------------:|:------------:|
	 * | icon | materialicons-regular.typeface.json.zip | materialicons, materialicons-regular, material-icon |
	 * | outlined | materialiconsoutlined-regular.typeface.json.zip | materialiconsoutlined, materialiconsoutlined-regular, materialoutlined-icon |
	 * | round | materialiconsround-regular.typeface.json.zip | materialiconsround, materialiconsround-regular, materialround-icon |
	 * | sharp | materialiconssharp-regular.typeface.json.zip | materialiconssharp, materialiconssharp-regular, materialsharp-icon |
	 *
	 *
	 */
	@Input() private type: string = 'icon';

	/**
	 * Height; that is, the length of the edges parallel to the Y axis. Optional; defaults to 1.
	 */
	@Input() private height: number = null;

	/**
	 * The icon of geometry component
	 *
	 * |   Icon Name               | Code Point | Code Hex | Category |
	 * |:--------------------------|:------------:|:------------:|:------------:|
	 * | account_circle | 59475 | e853 | action |
	 * | add | 57669 | e145 | content |
	 * | add_circle | 57671 | e147 | content |
	 * | add_circle_outline | 57672 | e148 | content |
	 * | arrow_back | 58820 | e5c4 | navigation |
	 * | arrow_back_ios | 58848 | e5e0 | navigation |
	 * | arrow_drop_down | 58821 | e5c5 | navigation |
	 * | arrow_forward | 58824 | e5c8 | navigation |
	 * | arrow_forward_ios | 58849 | e5e1 | navigation |
	 * | article | 61250 | ef42 | action |
	 * | calendar_today | 59701 | e935 | action |
	 * | call | 57520 | e0b0 | communication |
	 * | cancel | 58825 | e5c9 | navigation |
	 * | check | 58826 | e5ca | navigation |
	 * | check_box | 59444 | e834 | toggle |
	 * | check_box_outline_blank | 59445 | e835 | toggle |
	 * | check_circle | 59500 | e86c | action |
	 * | check_circle_outline | 59693 | e92d | action |
	 * | chevron_left | 58827 | e5cb | navigation |
	 * | chevron_right | 58828 | e5cc | navigation |
	 * | clear | 57676 | e14c | content |
	 * | close | 58829 | e5cd | navigation |
	 * | content_copy | 57677 | e14d | content |
	 * | dashboard | 59505 | e871 | action |
	 * | date_range | 59670 | e916 | action |
	 * | delete | 59506 | e872 | action |
	 * | description | 59507 | e873 | action |
	 * | done | 59510 | e876 | action |
	 * | edit | 58313 | e3c9 | image |
	 * | email | 57534 | e0be | communication |
	 * | error | 57344 | e000 | alert |
	 * | event | 59512 | e878 | action |
	 * | expand_less | 58830 | e5ce | navigation |
	 * | expand_more | 58831 | e5cf | navigation |
	 * | face | 59516 | e87c | action |
	 * | favorite | 59517 | e87d | action |
	 * | favorite_border | 59518 | e87e | action |
	 * | file_download | 58052 | e2c4 | file |
	 * | file_upload | 58054 | e2c6 | file |
	 * | filter_alt | 61263 | ef4f | action |
	 * | fingerprint | 59661 | e90d | action |
	 * | groups | 62003 | f233 | social |
	 * | help | 59527 | e887 | action |
	 * | help_outline | 59645 | e8fd | action |
	 * | highlight_off | 59528 | e888 | action |
	 * | home | 59530 | e88a | action |
	 * | image | 58356 | e3f4 | image |
	 * | info | 59534 | e88e | action |
	 * | language | 59540 | e894 | action |
	 * | lightbulb | 57584 | e0f0 | action |
	 * | list | 59542 | e896 | action |
	 * | local_shipping | 58712 | e558 | maps |
	 * | location_on | 57544 | e0c8 | communication |
	 * | lock | 59543 | e897 | action |
	 * | login | 60023 | ea77 | action |
	 * | logout | 59834 | e9ba | action |
	 * | manage_accounts | 61486 | f02e | action |
	 * | menu | 58834 | e5d2 | navigation |
	 * | more_horiz | 58835 | e5d3 | navigation |
	 * | more_vert | 58836 | e5d4 | navigation |
	 * | navigate_next | 58377 | e409 | image |
	 * | notifications | 59380 | e7f4 | social |
	 * | open_in_new | 59550 | e89e | action |
	 * | paid | 61505 | f041 | action |
	 * | people | 59387 | e7fb | social |
	 * | person | 59389 | e7fd | social |
	 * | person_outline | 59391 | e7ff | social |
	 * | phone | 57549 | e0cd | communication |
	 * | photo_camera | 58386 | e412 | image |
	 * | place | 58719 | e55f | maps |
	 * | play_arrow | 57399 | e037 | av |
	 * | question_answer | 59567 | e8af | action |
	 * | schedule | 59573 | e8b5 | action |
	 * | school | 59404 | e80c | social |
	 * | search | 59574 | e8b6 | action |
	 * | send | 57699 | e163 | content |
	 * | settings | 59576 | e8b8 | action |
	 * | share | 59405 | e80d | social |
	 * | shopping_bag | 61900 | f1cc | action |
	 * | shopping_cart | 59596 | e8cc | action |
	 * | star | 59448 | e838 | toggle |
	 * | task_alt | 58086 | e2e6 | action |
	 * | thumb_up | 59612 | e8dc | action |
	 * | verified | 61302 | ef76 | action |
	 * | visibility | 59636 | e8f4 | action |
	 * | visibility_off | 59637 | e8f5 | action |
	 * | warning | 57346 | e002 | alert |
	 *
	 * See the [Icons - Google Fonts](https://fonts.google.com/icons) page for more detail.
	 *
	 */
	@Input() private icon: string | number | (string | number)[] = null;

	/**
	 * The size of geometry component
	 */
	@Input() private size: number = null;

	/**
	 * The curveSegments of geometry component
	 */
	@Input() private curveSegments: number = null;

	/**
	 * The bevelEnabled of geometry component
	 */
	@Input() private bevelEnabled: boolean = null;

	/**
	 * The bevelThickness of geometry component
	 */
	@Input() private bevelThickness: number = null;

	/**
	 * The bevelSize of geometry component
	 */
	@Input() private bevelSize: number = null;

	/**
	 * The bevelOffset of geometry component
	 */
	@Input() private bevelOffset: number = null;

	/**
	 * The bevelSegments of geometry component
	 */
	@Input() private bevelSegments: number = null;

	/**
	 * Creates an instance of geometry component.
	 * @param localStorageService
	 */
	constructor(private localStorageService: NgxLocalStorageService) {
		super();
	}

	private static _loadedIconInfo: {
		list: IIconInfo[];
		map: { [key: string]: IIconInfo };
	} = null;

	/**
	 * Gets icon infos
	 *
	 * @returns icon infos
	 */
	public static getIconInfos(): Promise<{
		list: IIconInfo[];
		map: { [key: string]: IIconInfo };
	}> {
		return new Promise((resolve) => {
			if (this._loadedIconInfo === null) {
				const fileLoader: I3JS.FileLoader = NgxThreeUtil.getLoader('fileLoader', N3JS.FileLoader);
				fileLoader.load(NgxThreeUtil.getStoreUrl('fonts/materialicons/material_icons.json'), (text) => {
					const list: IIconInfo[] = JSON.parse(text as string);
					const map: { [key: string]: IIconInfo } = {};
					list.forEach((info) => {
						info.char = String.fromCodePoint(info.codepoint);
						info.codehex = info.codepoint.toString(16);
						map[info.name.toLowerCase()] = info;
						map[info.codehex] = info;
					});
					this._loadedIconInfo = {
						list: list,
						map: map,
					};
					resolve(this._loadedIconInfo);
				});
			} else {
				resolve(this._loadedIconInfo);
			}
		});
	}

	/**
	 * Gets font
	 * @param [def]
	 * @param [callBack]
	 */
	private getFont(def?: string, callBack?: (font: I3JS.Font, text: string) => void) {
		const font = NgxThreeUtil.getTypeSafe(this.type, def, 'icon');
		this.localStorageService.getFont(
			(font: I3JS.Font) => {
				NgxGeometryIconComponent.getIconInfos().then((iconInfos) => {
					let text: number[] = [];
					let icon = NgxThreeUtil.getTypeSafe(this.icon, '0xe876');
					let iconList: (number | string)[] = [];
					if (Array.isArray(icon)) {
						icon.forEach((value) => {
							if (value) {
								iconList.push(value);
							}
						});
						iconList = icon;
					} else {
						if (typeof icon === 'string') {
							icon.split(' ').forEach((txt) => {
								iconList.push(txt);
							});
						} else {
							iconList.push(icon);
						}
					}
					iconList.forEach((value) => {
						if (typeof value === 'string') {
							if (value.startsWith('0x')) {
								text.push(parseInt(value, 16));
							} else if (iconInfos.map[value.toLowerCase()] !== undefined) {
								text.push(iconInfos.map[value.toLowerCase()].codepoint);
							} else {
								for (let i = 0; i < value.length; i++) {
									text.push(value.codePointAt(i));
								}
							}
						} else if (typeof value === 'number') {
							text.push(value);
						}
					});
					callBack(font, String.fromCodePoint(...text));
				});
			},
			font,
			''
		);
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('geometry');
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
		if (changes && this.geometry) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
	}

	/**
	 * Gets geometry
	 * @template T
	 * @returns geometry
	 */
	public getGeometry<T extends I3JS.BufferGeometry>(): T {
		if (this.geometry === null || this._needUpdate) {
			this.needUpdate = false;
			let geometry: I3JS.BufferGeometry = new N3JS.BufferGeometry();
			this.getFont('icon', (font: I3JS.Font, text: string) => {
				const textParameters: I3JS.TextGeometryParameters = {
					font: font,
					size: NgxThreeUtil.getTypeSafe(this.size, 1),
					height: NgxThreeUtil.getTypeSafe(this.height),
					curveSegments: NgxThreeUtil.getTypeSafe(this.curveSegments),
					bevelEnabled: NgxThreeUtil.getTypeSafe(this.bevelEnabled),
					bevelThickness: NgxThreeUtil.getTypeSafe(this.bevelThickness),
					bevelSize: NgxThreeUtil.getTypeSafe(this.bevelSize),
					bevelOffset: NgxThreeUtil.getTypeSafe(this.bevelOffset),
					bevelSegments: NgxThreeUtil.getTypeSafe(this.bevelSegments),
				};
				this.setGeometry(new N3JS.TextGeometry(text, textParameters));
				this.setSubscribeNext('loaded');
			});
			this.setGeometry(geometry);
		}
		return this.geometry as T;
	}
}
