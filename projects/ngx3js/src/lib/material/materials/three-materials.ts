import * as THREE from 'three';
import {
	LineMaterial,
	LineMaterialParameters,
} from 'three/examples/jsm/lines/LineMaterial';
import * as NODES from 'three/examples/jsm/nodes/Nodes';
import { ShaderUtils } from '../../shader/shaders/shaderUtils';
import * as I3JS from '../../threejs-library/three-interface';

/**
 * LineBasic material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLineBasicMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/LineBasicMaterial) page for a live demo.
 *
 */
export class NgxLineBasicMaterial extends THREE.LineBasicMaterial implements I3JS.ILineBasicMaterial{
	/**
	 * Creates an instance of ngx line basic material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.LineBasicMaterialParameters) {
		super(parameters);
	}
}

/**
 * LineDashed material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLineDashedMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/LineDashedMaterial) page for a live demo.
 *
 */
export class NgxLineDashedMaterial extends THREE.LineDashedMaterial implements I3JS.ILineDashedMaterial {
	/**
	 * Creates an instance of ngx line dashed material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.LineDashedMaterialParameters) {
		super(parameters);
	}
}

/**
 * MeshBasic material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMeshBasicMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/MeshBasicMaterial) page for a live demo.
 *
 */
export class NgxMeshBasicMaterial extends THREE.MeshBasicMaterial implements I3JS.IMeshBasicMaterial {
	/**
	 * Creates an instance of ngx mesh basic material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.MeshBasicMaterialParameters) {
		super(parameters);
	}
}

/**
 * MeshDistance material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMeshDistanceMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/MeshDistanceMaterial) page for a live demo.
 *
 */
export class NgxMeshDistanceMaterial extends THREE.MeshDistanceMaterial implements I3JS.IMeshDistanceMaterial {
	/**
	 * Creates an instance of ngx mesh distance material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.MeshDistanceMaterialParameters) {
		super(parameters);
	}
}

/**
 * MeshMatcap material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMeshMatcapMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/MeshMatcapMaterial) page for a live demo.
 *
 */
export class NgxMeshMatcapMaterial extends THREE.MeshMatcapMaterial implements I3JS.IMeshMatcapMaterial {
	/**
	 * Creates an instance of ngx mesh matcap material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.MeshMatcapMaterialParameters) {
		super(parameters);
	}
}

/**
 * MeshNormal material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMeshNormalMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/MeshNormalMaterial) page for a live demo.
 *
 */
export class NgxMeshNormalMaterial extends THREE.MeshNormalMaterial implements I3JS.IMeshNormalMaterial {
	/**
	 * Creates an instance of ngx mesh normal material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.MeshNormalMaterialParameters) {
		super(parameters);
	}
}

/**
 * MeshPhong material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMeshPhongMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/MeshPhongMaterial) page for a live demo.
 *
 */
export class NgxMeshPhongMaterial extends THREE.MeshPhongMaterial implements I3JS.IMeshPhongMaterial {
	/**
	 * Creates an instance of ngx mesh phong material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.MeshPhongMaterialParameters) {
		super(parameters);
	}
}

/**
 * MeshPhysical material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMeshPhysicalMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/MeshPhysicalMaterial) page for a live demo.
 *
 */
export class NgxMeshPhysicalMaterial extends THREE.MeshPhysicalMaterial implements I3JS.IMeshPhysicalMaterial {
	/**
	 * Creates an instance of ngx mesh physical material.
	 * @param [parameters]
	 */
	/**
	 * Creates an instance of ngx mesh physical material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.MeshPhysicalMaterialParameters) {
		super(parameters);
	}
}

/**
 * MeshStandard material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMeshStandardMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/MeshStandardMaterial) page for a live demo.
 *
 */
export class NgxMeshStandardMaterial extends THREE.MeshStandardMaterial implements I3JS.IMeshStandardMaterial {
	/**
	 * Creates an instance of ngx mesh standard material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.MeshStandardMaterialParameters) {
		super(parameters);
	}
}

/**
 * MeshToon material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMeshToonMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/MeshToonMaterial) page for a live demo.
 *
 */
export class NgxMeshToonMaterial extends THREE.MeshToonMaterial implements I3JS.IMeshToonMaterial {
	/**
	 * Creates an instance of ngx mesh toon material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.MeshToonMaterialParameters) {
		super(parameters);
	}
}

/**
 * Points material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPointsMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/PointsMaterial) page for a live demo.
 *
 */
export class NgxPointsMaterial extends THREE.PointsMaterial implements I3JS.IPointsMaterial {
	/**
	 * Creates an instance of ngx points material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.PointsMaterialParameters) {
		super(parameters);
	}
}

/**
 * Shadow material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShadowMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShadowMaterial) page for a live demo.
 *
 */
export class NgxShadowMaterial extends THREE.ShadowMaterial implements I3JS.IShadowMaterial {
	/**
	 * Creates an instance of ngx shadow material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShadowMaterialParameters) {
		super(parameters);
	}
}

/**
 * Line material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLineMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/LineMaterial) page for a live demo.
 *
 */
export class NgxLineMaterial extends LineMaterial implements I3JS.IShaderMaterial {
	/**
	 * Creates an instance of ngx line material.
	 * @param [parameters]
	 */
	constructor(parameters?: LineMaterialParameters) {
		super(parameters);
	}
}

/**
 * Sprite material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSpriteMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/SpriteMaterial) page for a live demo.
 *
 */
export class NgxSpriteMaterial extends THREE.SpriteMaterial implements I3JS.ISpriteMaterial {
	/**
	 * Creates an instance of ngx sprite material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.SpriteMaterialParameters) {
		super(parameters);
	}
}

/**
 * MeshLambert material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMeshLambertMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/MeshLambertMaterial) page for a live demo.
 *
 */
export class NgxMeshLambertMaterial extends THREE.MeshLambertMaterial implements I3JS.IMeshLambertMaterial {
	/**
	 * Creates an instance of ngx mesh lambert material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.MeshLambertMaterialParameters) {
		super(parameters);
	}
}

/**
 * MeshDepth material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMeshDepthMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/MeshDepthMaterial) page for a live demo.
 *
 */
export class NgxMeshDepthMaterial extends THREE.MeshDepthMaterial implements I3JS.IMeshDepthMaterial {
	/**
	 * Creates an instance of ngx mesh depth material.
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.MeshDepthMaterialParameters) {
		super(parameters);
	}
}

/**
 * RawShader material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxRawShaderMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/RawShaderMaterial) page for a live demo.
 *
 */
export class NgxRawShaderMaterial extends THREE.RawShaderMaterial implements I3JS.IRawShaderMaterial {
	/**
	 * Creates an instance of ngx raw shader material.
	 *
	 * @param [parameters]
	 * @param [shaderId]
	 */
	constructor(
		parameters?: THREE.ShaderMaterialParameters,
		shaderId?: string,
		glslVersion?: THREE.GLSLVersion
	) {
		if (shaderId !== null && shaderId !== undefined) {
			const shader = ShaderUtils.getShaderClone(shaderId);
			parameters.vertexShader = shader.vertexShader;
			parameters.fragmentShader = shader.fragmentShader;
			parameters.uniforms = shader.uniforms;
			parameters.defines = shader.defines;
		}
		super(parameters);
		if (glslVersion !== undefined && glslVersion !== null) {
			this.glslVersion = glslVersion;
		}
	}
}

/**
 * Shader material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderMaterial) page for a live demo.
 *
 */
export class NgxShaderMaterial extends THREE.ShaderMaterial implements I3JS.IShaderMaterial {
	/**
	 * Creates an instance of ngx shader material.
	 *
	 * @param [parameters]
	 * @param [shaderId]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters, shaderId?: string) {
		if (shaderId !== null && shaderId !== undefined) {
			const shader = ShaderUtils.getShaderClone(shaderId);
			parameters.vertexShader = shader.vertexShader;
			parameters.fragmentShader = shader.fragmentShader;
			parameters.uniforms = shader.uniforms;
			parameters.defines = shader.defines;
		}
		super(parameters);
	}
}

/**
 * StandardNode material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxStandardNodeMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/StandardNodeMaterial) page for a live demo.
 *
 */
export class NgxStandardNodeMaterial extends NODES.StandardNodeMaterial implements I3JS.IShaderMaterial {
	/**
	 * Creates an instance of ngx standard node material.
	 */
	constructor() {
		super();
	}
}

/**
 * BasicNode material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxBasicNodeMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/BasicNodeMaterial) page for a live demo.
 *
 */
export class NgxBasicNodeMaterial extends NODES.BasicNodeMaterial {
	/**
	 * Creates an instance of ngx basic node material.
	 */
	constructor() {
		super();
	}
}

/**
 * MeshStandardNode material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxMeshStandardNodeMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/MeshStandardNodeMaterial) page for a live demo.
 *
 */
export class NgxMeshStandardNodeMaterial extends NODES.MeshStandardNodeMaterial {
	/**
	 * Creates an instance of ngx mesh standard node material.
	 */
	constructor() {
		super();
	}
}

/**
 * PhongNode material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxPhongNodeMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/PhongNodeMaterial) page for a live demo.
 *
 */
export class NgxPhongNodeMaterial extends NODES.PhongNodeMaterial {
	/**
	 * Creates an instance of ngx phong node material.
	 */
	constructor() {
		super();
	}
}

/**
 * SpriteNode material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxSpriteNodeMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/SpriteNodeMaterial) page for a live demo.
 *
 */
export class NgxSpriteNodeMaterial extends NODES.SpriteNodeMaterial {
	/**
	 * Creates an instance of ngx sprite node material.
	 */
	constructor() {
		super();
	}
}

/**
 * NormalMap node
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxNormalMapNode) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/PhongNodeMaterial) page for a live demo.
 *
 */
export class NgxNormalMapNode extends NODES.NormalMapNode {
	/**
	 * Creates an instance of ngx normal map node.
	 *
	 * @param value
	 * @param [scale]
	 */
	constructor(value: NODES.TextureNode, scale?: NODES.Vector2Node) {
		super(value, scale);
	}
}

/**
 * ShaderAudioVisualizer material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderAudioVisualizerMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderAudioVisualizerMaterial) page for a live demo.
 *
 */
export class NgxShaderAudioVisualizerMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader audio visualizer material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'AudioVisualizer');
	}
}

/**
 * AttributesParticles material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderAttributesParticlesMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderAttributesParticlesMaterial) page for a live demo.
 *
 */
export class NgxShaderAttributesParticlesMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader attributes particles material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'AttributesParticles');
	}
}

/**
 * SelectiveDraw material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderSelectiveDrawMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderSelectiveDrawMaterial) page for a live demo.
 *
 */
export class NgxShaderSelectiveDrawMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader selective draw material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'SelectiveDraw');
	}
}

/**
 * CustomAttributes material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderCustomAttributesMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderCustomAttributesMaterial) page for a live demo.
 *
 */
export class NgxShaderCustomAttributesMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader custom attributes material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'CustomAttributes');
	}
}

/**
 * CustomAttributesLines material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderCustomAttributesLinesMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderCustomAttributesLinesMaterial) page for a live demo.
 *
 */
export class NgxShaderCustomAttributesLinesMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader custom attributes lines material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'CustomAttributesLines');
	}
}

/**
 * CustomAttributesPoints material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderCustomAttributesPointsMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderCustomAttributesPointsMaterial) page for a live demo.
 *
 */
export class NgxShaderCustomAttributesPointsMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader custom attributes points material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'CustomAttributesPoints');
	}
}

/**
 * AttributeSizeColor material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderAttributeSizeColorMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderAttributeSizeColorMaterial) page for a live demo.
 *
 */
export class NgxShaderAttributeSizeColorMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader attribute size color material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'AttributeSizeColor');
	}
}

/**
 * AttributeSizeColor1 material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderAttributeSizeColor1Material) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderAttributeSizeColor1Material) page for a live demo.
 *
 */
export class NgxShaderAttributeSizeColor1Material extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader attribute size color1 material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'AttributeSizeColor1');
	}
}

/**
 * ShaderSkyDome material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderSkyDomeMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderSkyDomeMaterial) page for a live demo.
 *
 */
export class NgxShaderSkyDomeMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader shader sky dome material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'SkyDome');
	}
}

/**
 * ParallaxShader material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderParallaxMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderParallaxMaterial) page for a live demo.
 *
 */
export class NgxShaderParallaxMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader parallax material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'Parallax');
	}
}

/**
 * Fresnel material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderFresnelMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderFresnelMaterial) page for a live demo.
 *
 */
export class NgxShaderFresnelMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader fresnel material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'Fresnel');
	}
}

/**
 * SubsurfaceScattering material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderSubsurfaceScatteringMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderSubsurfaceScatteringMaterial) page for a live demo.
 *
 */
export class NgxShaderSubsurfaceScatteringMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader subsurface scattering material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'SubsurfaceScattering');
	}
}

/**
 * Wireframe material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderWireframeMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderWireframeMaterial) page for a live demo.
 *
 */
export class NgxShaderWireframeMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader wireframe material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'Wireframe');
	}
}

/**
 * NoiseRandom1D material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderNoiseRandom1DMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderNoiseRandom1DMaterial) page for a live demo.
 *
 */
export class NgxShaderNoiseRandom1DMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader noise random1 dmaterial.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'NoiseRandom1D');
	}
}

/**
 * NoiseRandom2D material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderNoiseRandom2DMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderNoiseRandom2DMaterial) page for a live demo.
 *
 */
export class NgxShaderNoiseRandom2DMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader noise random2 dmaterial.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'NoiseRandom2D');
	}
}

/**
 * NoiseRandom3D material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderNoiseRandom3DMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderNoiseRandom3DMaterial) page for a live demo.
 *
 */
export class NgxShaderNoiseRandom3DMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader noise random3 dmaterial.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'NoiseRandom3D');
	}
}

/**
 * ColorRainbow material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderColorRainbowMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderColorRainbowMaterial) page for a live demo.
 *
 */
export class NgxShaderColorRainbowMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader color rainbow material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'ColorRainbow');
	}
}

/**
 * VideoKinect material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderVideoKinectMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderVideoKinectMaterial) page for a live demo.
 *
 */
export class NgxShaderVideoKinectMaterial extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader video kinect material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'VideoKinect');
	}
}

/**
 * VolumeRenderShader1 material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderVolumeRenderShader1Material) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderVolumeRenderShader1Material) page for a live demo.
 *
 */
export class NgxShaderVolumeRenderShader1Material extends NgxShaderMaterial {
	/**
	 * Creates an instance of ngx shader volume render shader1 material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'VolumeRenderShader1');
	}
}

/**
 * Instancing material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderInstancingMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderInstancingMaterial) page for a live demo.
 *
 */
export class NgxShaderInstancingMaterial extends NgxRawShaderMaterial {
	/**
	 * Creates an instance of ngx shader instancing material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'Instancing');
	}
}

/**
 * ScaleColor material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderScaleColorMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderScaleColorMaterial) page for a live demo.
 *
 */
export class NgxShaderScaleColorMaterial extends NgxRawShaderMaterial {
	/**
	 * Creates an instance of ngx shader scale color material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'ScaleColor');
	}
}

/**
 * SinColor material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderSinColorMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderSinColorMaterial) page for a live demo.
 *
 */
export class NgxShaderSinColorMaterial extends NgxRawShaderMaterial {
	/**
	 * Creates an instance of ngx shader sin color material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'SinColor');
	}
}

/**
 * RaymarchingReflect material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderRaymarchingReflectMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderRaymarchingReflectMaterial) page for a live demo.
 *
 */
export class NgxShaderRaymarchingReflectMaterial extends NgxRawShaderMaterial {
	/**
	 * Creates an instance of ngx shader raymarching reflect material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'RaymarchingReflect');
	}
}

/**
 * Cloud material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderCloudMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderCloudMaterial) page for a live demo.
 *
 */
export class NgxShaderCloudMaterial extends NgxRawShaderMaterial {
	/**
	 * Creates an instance of ngx shader cloud material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'Cloud', THREE.GLSL3);
	}
}

/**
 * Perlin material
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxShaderPerlinMaterial) page for details.
 * See the [ngx material](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_material/ShaderPerlinMaterial) page for a live demo.
 *
 */
export class NgxShaderPerlinMaterial extends NgxRawShaderMaterial {
	/**
	 * Creates an instance of ngx shader perlin material.
	 *
	 * @param [parameters]
	 */
	constructor(parameters?: THREE.ShaderMaterialParameters) {
		super(parameters, 'Perlin', THREE.GLSL3);
	}
}

export { LineMaterial, LineMaterialParameters, NODES };
