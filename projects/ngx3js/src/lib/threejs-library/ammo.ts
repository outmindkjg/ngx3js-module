// @ts-nocheck
// @ignore

import * as _AMMO from './ammo.wasm';

import * as Ammo from './ammo-type';

/**
 * Ammos init
 * @template T
 * @param [target]
 * @returns init
 */
export function AmmoInit<T>(target?: T): Promise<T & Ammo.AmmoType> {
	return _AMMO.default(target);
}

