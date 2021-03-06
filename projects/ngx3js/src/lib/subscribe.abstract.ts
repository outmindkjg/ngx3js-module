import {
	AfterContentInit,
	Component,
	ContentChildren,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	QueryList,
	SimpleChange,
	SimpleChanges
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { NgxThreeUtil } from './interface';
import { NgxTweenComponent } from './tween/tween.component';

/**
 * The Abstract Subscribe component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAbstractSubscribeComponent) page for details.
 *
 * ```ts
 * _@Component({
 * 	providers: [
 * 		{
 * 			provide: NgxAbstractSubscribeComponent,
 * 			useExisting: forwardRef(() => NgxXxxComponent),
 * 		},
 * 	],
 * })
 * export class NgxXxxComponent extends NgxAbstractSubscribeComponent implements OnInit {
 * 	constructor() {
 * 		super();
 * 	}
 * }
 * ```
 */
@Component({
	template: '',
})
export class NgxAbstractSubscribeComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit {
	/**
	 * Debug this Object
	 */
	@Input() public debug: boolean = false;

	/**
	 * Export this Object to window global variables
	 */
	@Input() public windowExport: string = null;

	/**
	 * Enabled or Not
	 */
	@Input() public enabled: boolean = true;

	/**
	 * The override params
	 */
	@Input() public overrideParams: { [key: string]: any } = null;

	/**
	 * An object that can be used to store custom data about the Object3D. It should not hold references to functions as these will not be cloned.
	 */
	@Input() public userData: any = null;

	/**
	 * Tween animation params
	 */
	@Input() public tween: { [key: string]: any } = null;

	/**
	 * Content children of abstract tween component
	 */
	@ContentChildren(NgxTweenComponent, { descendants: false }) private tweenList: QueryList<NgxTweenComponent>;

	/**
	 * Will be called when load completes. The argument will be the loaded self
	 */
	@Output() public onLoad: EventEmitter<this> = new EventEmitter<this>();

	/**
	 * Will be called when before destory. The argument will be the loaded self
	 */
	@Output() public onDestory: EventEmitter<this> = new EventEmitter<this>();

	/**
	 * Object attr of abstract subscribe component
	 */
	protected OBJECT_ATTR: string[] = ['init', 'debug', 'enabled', 'userdata', 'overrideparams', 'windowexport', 'tween'];

	protected selfAny: any = this;

	/**
	 * Creates an instance of abstract subscribe component.
	 */
	constructor() {
		this.selfAny = this;
	}

	/**
	 * The Id of abstract subscribe component
	 */
	protected id: string = '';

	/**
	 * Gets id
	 *
	 * @returns id
	 */
	public getId(): string {
		return this.id;
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 *
	 * @param subscribeType
	 */
	ngOnInit(subscribeType?: string): void {
		this.id =
			subscribeType + '_' + NgxThreeUtil.getUUID();
		this.setSubscribeType(subscribeType);
		NgxThreeUtil.setThreeComponent(this.id, this);
		this._userData.component = this.id;
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		this.setSubscribeNext('destroy');
		if (this._subscribe !== null) {
			for (let key in this._subscribe) {
				this._subscribe[key].unsubscribe();
			}
			this._subscribe = {};
		}
		if (this._subscribeList !== null) {
			for (let key in this._subscribeList) {
				this._subscribeList[key].forEach((subscribe) => {
					subscribe.unsubscribe();
				});
			}
			this._subscribeList = {};
		}
		this.dispose();
		NgxThreeUtil.setThreeComponent(this.id, null);
		this.onDestory.emit(this);
		this.parent = null;
		this._cashedObj = null;
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		if (changes.tween) {
			this.setTween(this.tween);
			delete changes.tween;
		}
		if (changes.overrideParams) {
			this.updateInputParams(this.overrideParams, false, changes);
			delete changes.overrideParams;
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {}

	/**
	 * Sets tween
	 * @param tweenData
	 */
	public setTween(tweenData: { [key: string]: any }) {
		if (NgxThreeUtil.isNotNull(tweenData)) {
			const tween: { [key: string]: any } = {
				elapsedTime: 0,
				elapsedAlpha: 0,
			};
			let tweenLength = 0;
			Object.entries(tweenData).forEach(([key, value]) => {
				if (NgxThreeUtil.isNotNull(value)) {
					switch (key.toLowerCase()) {
						case 'position':
							tween.position = NgxThreeUtil.getPosition(value);
							tweenLength++;
							break;
						case 'scale':
							tween.scale = NgxThreeUtil.getScale(value);
							tweenLength++;
							break;
						case 'lookat':
							tween.lookat = NgxThreeUtil.getLookAt(value);
							tweenLength++;
							break;
						case 'rotation':
							tween.rotation = NgxThreeUtil.getRotation(value);
							tweenLength++;
							break;
						case 'specular':
						case 'emissive':
						case 'sheen':
						case 'specular':
						case 'specular':
						case 'color':
							tween[key] = NgxThreeUtil.getColor(value);
							tweenLength++;
							break;
						default:
							tween[key] = value;
							tweenLength++;
							break;
					}
				}
			});
			if (tweenLength > 0) {
				this.setUserData('tween', tween);
			} else {
				this.setUserData('tween', null);
			}
		} else {
			this.setUserData('tween', null);
		}
	}

	/**
	 * Disposes abstract subscribe component
	 */
	public dispose() {}

	/**
	 * Sets subscribe type
	 * @param subscribeType
	 */
	public setSubscribeType(subscribeType: string) {
		this.subscribeType = subscribeType || 'nonamed';
	}

	/**
	 * Determines whether id euals is
	 * @param id
	 * @returns true if id euals
	 */
	protected isIdEuals(id: string): boolean {
		if (id === undefined || id === null || id === '' || id === this.id) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Calls on load
	 */
	protected callOnLoad() {
		this.onLoad.emit(this);
	}

	/**
	 * Need update of abstract subscribe component
	 */
	protected _needUpdate: boolean = true;

	/**
	 * Sets need update
	 */
	public set needUpdate(value: boolean) {
		if (value && !this._needUpdate) {
			this._needUpdate = true;
			this.clearChanges();
			this.addChanges('clearinit');
		} else if (!value && this._needUpdate) {
			this._needUpdate = false;
			this.clearChanges();
		}
	}

	/**
	 * Change list of abstract subscribe component
	 */
	protected _changeList: string[] = null;

	/**
	 * Checks changes
	 * @param changes
	 * @returns changes
	 */
	protected checkChanges(changes: SimpleChanges): SimpleChanges {
		return changes;
	}

	/**
	 * Log time seqn of abstract subscribe component
	 */
	private _logTimeSeqn: number = 0;

	/**
	 * Consoles log time
	 * @param key
	 * @param object
	 * @param [repeat]
	 */
	protected consoleLogTime(key: string, object: any, repeat: number = 300): void {
		this._logTimeSeqn++;
		if (this._logTimeSeqn % repeat === 0) {
			this.consoleLog(key, object, 'info');
		}
	}

	/**
	 * Consoles log
	 * @param key
	 * @param object
	 * @param [level]
	 */
	protected consoleLog(key: string, object: any, level: string = 'log'): void {
		switch (level) {
			case 'error':
				console.error(this.subscribeType, key, object);
				break;
			case 'info':
				console.info(this.subscribeType, key, object);
				break;
			case 'trace':
				console.trace(this.subscribeType, key, object);
				break;
			case 'log':
			default:
				break;
		}
	}

	/**
	 * Apply change bind of abstract subscribe component
	 */
	private _applyChangeBind: any = null;

	/**
	 * Adds changes
	 * @param key
	 */
	public addChanges(key: string | string[] | SimpleChanges) {
		if (this._changeList === null) {
			this._changeList = [];
		}
		if (typeof key === 'string') {
			if (this._changeList.indexOf(key) === -1) {
				this._changeList.push(key);
			}
		} else if (Array.isArray(key)) {
			key.forEach((subKey) => {
				if (this._changeList.indexOf(subKey) === -1) {
					this._changeList.push(subKey);
				}
			});
		} else {
			Object.entries(key).forEach(([subKey, _]) => {
				if (this._changeList.indexOf(subKey) === -1) {
					this._changeList.push(subKey);
				}
			});
		}
		if (this._applyChangeBind === null && this._changeList.length > 0) {
			this._applyChangeBind = window.setTimeout(() => {
				this._applyChangeBind = null;
				if (this._changeList !== null && this._changeList.length > 0) {
					this.applyChanges(this.getChanges());
				}
			}, 5);
		}
	}

	/**
	 * Gets changes
	 * @returns changes
	 */
	protected getChanges(): string[] {
		const changes: string[] = [];
		(this._changeList || []).forEach((change) => {
			const key = change.toLowerCase();
			if (changes.indexOf(key) === -1) {
				changes.push(key);
			}
		});
		if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
			this._needUpdate = true;
		}
		this._changeList = [];
		return changes;
	}

	/**
	 * Clears changes
	 */
	protected clearChanges() {
		this._changeList = null;
	}

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
			return;
		}
		if (NgxThreeUtil.isIndexOf(changes, ['init'])) {
			changes = NgxThreeUtil.pushUniq(changes, ['userdata']);
		}
		changes.forEach((change) => {
			switch (change.toLowerCase()) {
				case 'userdata':
					if (NgxThreeUtil.isNotNull(this.userData)) {
						Object.entries(this.userData).forEach(([key, value]) => {
							switch (key) {
								case 'component':
									break;
								default:
									this._userData[key] = value;
									break;
							}
						});
					}
					break;
			}
		});
		this.clearChanges();
	}

	/**
	 * Cashed obj of abstract subscribe component
	 */
	private _cashedObj: any = null;

	/**
	 * Gets object
	 * @returns object
	 */
	public getObject<T>(): T {
		return this._cashedObj as T;
	}

	/**
	 * User data of abstract subscribe component
	 */
	private _userData: { [key: string]: any } = {};

	/**
	 * Gets user data
	 * @returns
	 */
	public getUserData() {
		return this._userData;
	}

	/**
	 * Sets user data
	 * @param key
	 * @param value
	 */
	public setUserData(key: string, value: any) {
		if (NgxThreeUtil.isNotNull(value)) {
			this._userData[key] = value;
		} else if (NgxThreeUtil.isNotNull(this._userData[key])) {
			delete this._userData[key];
		}
	}

	/**
	 * Sets object
	 * @param obj
	 */
	protected setObject(obj: any) {
		if (this._cashedObj !== obj) {
			let isLoaded: boolean = this._cashedObj === null ? false : true;
			this._cashedObj = obj;
			this.needUpdate = false;
			if (NgxThreeUtil.isNotNull(this._cashedObj)) {
				if (NgxThreeUtil.isNotNull(this._cashedObj.userData)) {
					Object.entries(this._cashedObj.userData).forEach(([key, value]) => {
						switch (key) {
							case 'component':
								break;
							default:
								this._userData[key] = value;
								break;
						}
					});
					this._cashedObj.userData = this._userData;
				}
				if (this.debug) {
					this.consoleLog(this.subscribeType, this._cashedObj);
				}
				this.applyChanges(['init']);
				this.callOnLoad();
				if (isLoaded) {
					this.setSubscribeNext('loaded');
				}
				if (NgxThreeUtil.isNotNull(this.windowExport) && this.windowExport != '') {
					(window as any)[this.windowExport] = this._cashedObj;
				}
			}
		}
	}

	/**
	 * The Subject of abstract subscribe component
	 */
	private _subject: Subject<string[]> = new Subject<string[]>();

	/**
	 * Gets subscribe
	 * @returns subscribe
	 */
	public getSubscribe(): Observable<string[]> {
		return this._subject.asObservable();
	}

	/**
	 * Subscribe next of abstract subscribe component
	 */
	private _subscribeNext: string[] = [];

	/**
	 * Subscribe timeout of abstract subscribe component
	 */
	private _subscribeTimeout: any = null;

	/**
	 * Sets subscribe next
	 * @param key
	 */
	public setSubscribeNext(key: string | string[]) {
		if (key !== null && key !== '') {
			if (Array.isArray(key)) {
				key.forEach((subKey) => {
					subKey = subKey.toLowerCase();
					if (this._subscribeNext.indexOf(subKey) === -1) {
						this._subscribeNext.push(subKey);
					}
				});
			} else {
				key = key.toLowerCase();
				if (this._subscribeNext.indexOf(key) === -1) {
					this._subscribeNext.push(key);
				}
				switch (key) {
					case 'scene':
					case 'camera':
					case 'ligher':
					case 'mesh':
					case 'helper':
					case 'audio':
						if (this._subscribeNext.indexOf('object3d') === -1) {
							this._subscribeNext.push('object3d');
						}
						break;
				}
			}
			if (this._subscribeTimeout === null && this._subscribeNext.length > 0) {
				this._subscribeTimeout = window.setTimeout(() => {
					this._subscribeTimeout = null;
					if (this._subscribeNext.length > 0) {
						const subscribeNext: string[] = [];
						this._subscribeNext.forEach((text) => {
							subscribeNext.push(text);
						});
						this._subscribeNext = [];
						if (subscribeNext.indexOf('loaded') > -1) {
							this.onLoad.emit(this);
						}
						this._subject.next(subscribeNext);
					}
				}, 5);
			}
		} else {
			console.trace(this);
		}
	}

	/**
	 * Runs subscribe next
	 * @param key
	 */
	public runSubscribeNext(key: string | string[]) {
		this._subject.next(Array.isArray(key) ? key : [key]);
	}

	/**
	 * subscription
	 * @param subscriptions
	 * @returns subscription
	 */
	protected unSubscription(subscriptions: Subscription[]): Subscription[] {
		if (subscriptions !== null && subscriptions.length > 0) {
			subscriptions.forEach((subscription) => {
				subscription.unsubscribe();
			});
		}
		return [];
	}

	/**
	 * The Subscribe of abstract subscribe component
	 */
	private _subscribe: { [key: string]: Subscription } = {};

	/**
	 * subscribe refer
	 * @param key
	 */
	protected unSubscribeRefer(key: string) {
		if (NgxThreeUtil.isNotNull(this._subscribe[key])) {
			this._subscribe[key].unsubscribe();
			delete this._subscribe[key];
		}
	}

	/**
	 * Subscribes refer
	 * @param key
	 * @param subscription
	 */
	protected subscribeRefer(key: string, subscription: Subscription) {
		if (NgxThreeUtil.isNotNull(this._subscribe[key])) {
			this.unSubscribeRefer(key);
		}
		if (NgxThreeUtil.isNotNull(subscription)) {
			this._subscribe[key] = subscription;
		}
	}

	/**
	 * Subscribe type of abstract subscribe component
	 */
	protected subscribeType: string = null;

	/**
	 * Local components of abstract subscribe component
	 */
	private _localComponents: { [key: string]: OnInit & OnDestroy } = {};

	/**
	 * Subscribe list of abstract subscribe component
	 */
	private _subscribeList: { [key: string]: Subscription[] } = {};

	/**
	 * Destroys local component
	 * @param key
	 */
	protected destroyLocalComponent(key: string) {
		if (NgxThreeUtil.isNotNull(this._localComponents[key])) {
			this._localComponents[key].ngOnDestroy();
			delete this._localComponents[key];
		}
	}

	/**
	 * Inits local component
	 * @template T
	 * @param key
	 * @param component
	 * @returns local component
	 */
	protected initLocalComponent<T extends OnInit & OnDestroy>(key: string, component: T): T {
		if (NgxThreeUtil.isNotNull(this._localComponents[key])) {
			this.destroyLocalComponent(key);
		}
		if (NgxThreeUtil.isNotNull(component)) {
			component.ngOnInit();
			this._localComponents[key] = component;
		}
		return component;
	}

	/**
	 * Updates input params
	 * @param params
	 * @param [firstChange]
	 * @param [changes]
	 * @param [type]
	 */
	public updateInputParams(
		params: { [key: string]: any },
		firstChange: boolean = true,
		changes: SimpleChanges = {},
		type: string = null
	) {
		if (NgxThreeUtil.isNotNull(params)) {
			Object.entries(params).forEach(([key, value]) => {
				if (this.selfAny[key] !== undefined && this.selfAny[key] !== value && NgxThreeUtil.isNotNull(value)) {
					changes[key] = new SimpleChange(this.selfAny[key], value, firstChange);
					this.selfAny[key] = value;
				}
			});
		}
		if (NgxThreeUtil.isNotNull(type)) {
			if (this.selfAny['type'] !== undefined) {
				if (this.selfAny['type'] !== type) {
					changes.type = new SimpleChange(this.selfAny['type'], type, firstChange);
					this.selfAny['type'] = type;
				}
			}
		}
		if (firstChange) {
			this.ngAfterContentInit();
			this.ngOnChanges(changes);
		}
	}

	/**
	 * subscribe refer list
	 * @param key
	 */
	protected unSubscribeReferList(key: string) {
		if (NgxThreeUtil.isNotNull(this._subscribeList[key])) {
			this._subscribeList[key].forEach((subscribe) => {
				subscribe.unsubscribe();
			});
			delete this._subscribeList[key];
		}
	}

	/**
	 * Subscribes refer list
	 * @param key
	 * @param subscription
	 */
	protected subscribeReferList(key: string, subscription: Subscription) {
		if (NgxThreeUtil.isNull(this._subscribeList[key])) {
			this._subscribeList[key] = [];
		}
		if (NgxThreeUtil.isNotNull(subscription)) {
			this._subscribeList[key].push(subscription);
		}
	}

	/**
	 * Subscribes list query change
	 * @param queryList
	 * @param subscribeKey
	 * @param changeKey
	 */
	protected subscribeListQueryChange(queryList: QueryList<any>, subscribeKey: string, changeKey: string) {
		if (NgxThreeUtil.isNotNull(queryList)) {
			this.unSubscribeRefer(subscribeKey + 'Changes');
			this.subscribeRefer(
				subscribeKey,
				queryList.changes.subscribe(() => {
					this.addChanges(changeKey.toLowerCase());
				})
			);
		}
	}

	/**
	 * Subscribes list query
	 * @param queryList
	 * @param subscribeKey
	 * @param changeKey
	 */
	protected subscribeListQuery(queryList: QueryList<any>, subscribeKey: string, changeKey: string) {
		if (NgxThreeUtil.isNotNull(queryList)) {
			this.unSubscribeReferList(subscribeKey);
			queryList.forEach((query) => {
				this.subscribeReferList(
					subscribeKey,
					NgxThreeUtil.getSubscribe(
						query,
						(event) => {
							this.addChanges(event);
						},
						changeKey.toLowerCase()
					)
				);
			});
		}
	}

	/**
	 * The Parent of abstract subscribe component
	 */
	protected parent: any = null;

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: any): boolean {
		if (this.parent !== parent) {
			this.parent = parent;
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Gets timeout
	 * ?????? ???????????? ????????? ???????????????
	 *
	 * @param [timeDelay]
	 * @returns timeout
	 */
	protected getTimeout(timeDelay: number = 50): Promise<void> {
		return new Promise<void>((resolve) => {
			window.setTimeout(() => {
				resolve();
			}, timeDelay);
		});
	}

	/**
	 * Sets tween target
	 * @param tweenTarget
	 */
	public setTweenTarget(tweenTarget: any) {
		if (this.tweenTarget !== tweenTarget) {
			this.tweenTarget = tweenTarget;
			this.resetTween();
		}
	}

	/**
	 * Tween target of abstract tween component
	 */
	private tweenTarget: any = null;

	/**
	 * Resets tween
	 */
	public resetTween() {
		if (
			NgxThreeUtil.isNotNull(this.tweenTarget) &&
			NgxThreeUtil.isNotNull(this.tweenList) &&
			this.tweenList.length > 0
		) {
			this.tweenList.forEach((tween) => {
				tween.getTween(this.tweenTarget, this);
			});
		}
	}
}
