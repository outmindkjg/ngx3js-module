import {
	AsciiEffect,
	AsciiEffectOptions
} from 'three/examples/jsm/effects/AsciiEffect';
import {
	OutlineEffect,
	OutlineEffectParameters
} from 'three/examples/jsm/effects/OutlineEffect';
import { ParallaxBarrierEffect } from 'three/examples/jsm/effects/ParallaxBarrierEffect';
import { PeppersGhostEffect } from 'three/examples/jsm/effects/PeppersGhostEffect';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { I3JS } from '../../interface';

/**
 * Ascii effect
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxAsciiEffect) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/AsciiEffect) page for a live demo.
 *
 */
export class NgxAsciiEffect extends AsciiEffect {
	/**
	 * Creates an instance of ngx ascii effect.
	 *
	 * @param renderer
	 * @param [charSet]
	 * @param [options]
	 */
	constructor(
		renderer: I3JS.IWebGLRenderer,
		charSet?: string,
		options?: AsciiEffectOptions
	) {
		super(renderer as any, charSet, options);
	}
}

/**
 * Outline effect
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxOutlineEffect) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/OutlineEffect) page for a live demo.
 *
 */
export class NgxOutlineEffect extends OutlineEffect {
	/**
	 * Creates an instance of ngx outline effect.
	 *
	 * @param renderer
	 * @param [parameters]
	 */
	constructor(
		renderer: I3JS.IWebGLRenderer,
		parameters?: OutlineEffectParameters
	) {
		super(renderer as any, parameters);
	}
}

/**
 * ParallaxBarrier effect
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxParallaxBarrierEffect) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/ParallaxBarrierEffect) page for a live demo.
 *
 */
export class NgxParallaxBarrierEffect extends ParallaxBarrierEffect {
	/**
	 * Creates an instance of ngx parallax barrier effect.
	 *
	 * @param renderer
	 */
	constructor(renderer: I3JS.IWebGLRenderer) {
		super(renderer as any);
	}
}

/**
 * PeppersGhost effect
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPeppersGhostEffect) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/PeppersGhostEffect) page for a live demo.
 *
 */
export class NgxPeppersGhostEffect extends PeppersGhostEffect {
	/**
	 * Creates an instance of ngx peppers ghost effect.
	 *
	 * @param renderer
	 */
	constructor(renderer: I3JS.IWebGLRenderer) {
		super(renderer as any);
	}
}

/**
 * NgxEffect composer
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxEffectComposer) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/EffectComposer) page for a live demo.
 *
 */
export class NgxEffectComposer extends EffectComposer {
	/**
	 * Creates an instance of ngx effect composer.
	 *
	 * @param renderer
	 * @param [renderTarget]
	 */
	constructor(
		renderer: I3JS.IWebGLRenderer,
		renderTarget?: I3JS.IWebGLRenderTarget
	) {
		super(renderer as any, renderTarget as any);
	}
}

export {
	AsciiEffect,
	AsciiEffectOptions,
	OutlineEffect,
	OutlineEffectParameters,
	ParallaxBarrierEffect,
	PeppersGhostEffect,
	EffectComposer,
};
