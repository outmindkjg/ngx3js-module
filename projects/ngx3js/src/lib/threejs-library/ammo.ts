// @ts-nocheck

import * as _AMMO from './ammo.wasm';

import * as Ammo from './ammo-type';

let _loadedAmmo : Ammo.AmmoType = null;

/**
 * Ammos init
 * @template T
 * @param [target]
 * @returns init
 */
export function AmmoInit<T>(target?: T): Promise<T & Ammo.AmmoType> {
	if (_loadedAmmo !== null) {
		return _loadedAmmo;
	} else {
		_loadedAmmo = _AMMO.default(target);
		return _loadedAmmo;
	}
}

