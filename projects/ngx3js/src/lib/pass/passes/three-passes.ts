import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { ShaderUtils } from '../../shader/shaders/shaderUtils';

/**
 * Copy pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderCopyPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/CopyPass) page for a live demo.
 *
 */
export class ShaderCopyPass extends ShaderPass {
	/**
	 * Creates an instance of ngx copy pass.
	 *
	 * @param [textureId]
	 */
	constructor(textureId?: string) {
		super(ShaderUtils.getShaderClone('copyshader'), textureId);
	}
}

/**
 * RGBShift pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderRGBShiftPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/RGBShiftPass) page for a live demo.
 *
 */
export class ShaderRGBShiftPass extends ShaderPass {
	/**
	 * Creates an instance of ngx RGBShift pass.
	 *
	 * @param [textureId]
	 */
	constructor(textureId?: string) {
		super(ShaderUtils.getShaderClone('RGBShift'), textureId);
	}
}

/**
 * BleachBypass pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderBleachBypassPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/BleachBypassPass) page for a live demo.
 *
 */
export class ShaderBleachBypassPass extends ShaderPass {
	/**
	 * Creates an instance of ngx BleachBypass pass.
	 *
	 * @param [textureId]
	 */
	constructor(textureId?: string) {
		super(ShaderUtils.getShaderClone('BleachBypassShader'), textureId);
	}
}

/**
 * Sepia pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderSepiaPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SepiaPass) page for a live demo.
 *
 */
export class ShaderSepiaPass extends ShaderPass {
	/**
	 * Creates an instance of ngx Sepia pass.
	 *
	 * @param [textureId]
	 */
	constructor(textureId?: string) {
		super(ShaderUtils.getShaderClone('SepiaShader'), textureId);
	}
}

/**
 * Vignette pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderVignettePass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/VignettePass) page for a live demo.
 *
 */
export class ShaderVignettePass extends ShaderPass {
	/**
	 * Creates an instance of ngx Vignette pass.
	 *
	 * @param [textureId]
	 */
	constructor(textureId?: string) {
		super(ShaderUtils.getShaderClone('VignetteShader'), textureId);
	}
}

/**
 * GammaCorrection pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderGammaCorrectionPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/GammaCorrectionPass) page for a live demo.
 *
 */
export class ShaderGammaCorrectionPass extends ShaderPass {
	/**
	 * Creates an instance of ngx GammaCorrection pass.
	 *
	 * @param [textureId]
	 */
	constructor(textureId?: string) {
		super(ShaderUtils.getShaderClone('GammaCorrectionShader'), textureId);
	}
}

/**
 * FXAA pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderFXAAPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/FXAAPass) page for a live demo.
 *
 */
export class ShaderFXAAPass extends ShaderPass {
	/**
	 * Creates an instance of ngx FXAA pass.
	 *
	 * @param [textureId]
	 */
	constructor(textureId?: string) {
		super(ShaderUtils.getShaderClone('FXAAShader'), textureId);
	}
}

/**
 * Pixel pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderPixelPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/PixelPass) page for a live demo.
 *
 */
export class ShaderPixelPass extends ShaderPass {
	/**
	 * Creates an instance of ngx Pixel pass.
	 *
	 * @param [textureId]
	 */
	constructor(textureId?: string) {
		super(ShaderUtils.getShaderClone('PixelShader'), textureId);
	}
}

/**
 * Luminosity pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderLuminosityPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/LuminosityPass) page for a live demo.
 *
 */
export class ShaderLuminosityPass extends ShaderPass {
	/**
	 * Creates an instance of ngx Luminosity pass.
	 *
	 * @param [textureId]
	 */
	constructor(textureId?: string) {
		super(ShaderUtils.getShaderClone('LuminosityShader'), textureId);
	}
}

/**
 * DotScreen pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderDotScreenPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/DotScreenPass) page for a live demo.
 *
 */
export class ShaderDotScreenPass extends ShaderPass {
	/**
	 * Creates an instance of ngx Luminosity pass.
	 *
	 * @param [textureId]
	 */
	constructor(textureId?: string) {
		super(ShaderUtils.getShaderClone('DotScreen'), textureId);
	}
}

/**
 * SobelOperator pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSobelOperatorPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/SobelOperatorPass) page for a live demo.
 *
 */
export class SobelOperatorPass extends ShaderPass {
	/**
	 * Creates an instance of ngx SobelOperator pass.
	 *
	 * @param [textureId]
	 */
	constructor(textureId?: string) {
		super(ShaderUtils.getShaderClone('SobelOperatorShader'), textureId);
	}
}

/**
 * ShaderMaterial pass
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderMaterialPass) page for details.
 * See the [ngx effect](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_effect/ShaderMaterialPass) page for a live demo.
 *
 */
export class ShaderMaterialPass extends ShaderPass {
	/**
	 * Creates an instance of ngx ShaderMaterial pass.
	 *
	 * @param [textureId]
	 */
	constructor(textureId?: string) {
		super(ShaderUtils.getShaderClone('ShaderMaterial'), textureId);
	}
}


