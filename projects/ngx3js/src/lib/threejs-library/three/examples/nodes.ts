import { Camera, Color, ColorRepresentation, CubeTexture, Material, Matrix3, Matrix4, Mesh, Object3D, OrthographicCamera, Scene, ShaderMaterial, Texture, TextureEncoding, Vector2, Vector3, Vector4, WebGLRenderer, WebGLRenderTarget, WebGLRenderTargetOptions } from '../index';
import { ReflectorRTT } from './objects';
import { ShaderPass } from './postprocessing';

export interface CameraNode extends TempNode {
    new(scope?: string, camera?: Camera) : this;

    scope: string;
    near: FloatNode | undefined;
    far: FloatNode | undefined;
    camera: Camera | undefined;
    updateFrame: boolean | undefined;
    nodeType: string;

    setCamera(camera: Camera): void;
    setScope(scope: string): void;
    onUpdateFrame(frame: NodeFrame): void;
    copy(source: CameraNode): this;

    Nodes: {
        depthColor: FunctionNode;
    };
    POSITION: string;
    DEPTH: string;
    TO_VERTEX: string;
}

export interface ColorsNode extends TempNode {
    new(index?: number) : this;

    index: number;
    nodeType: string;

    copy(source: ColorsNode): this;
}

export interface LightNode extends TempNode {
    new(scope?: string) : this;

    scope: string;
    nodeType: string;

    copy(source: LightNode): this;

    TOTAL: string;
}

export interface NormalNode extends TempNode {
    new(scope?: string) : this;

    scope: string;
    nodeType: string;

    copy(source: NormalNode): this;

    LOCAL: string;
    WORLD: string;
}

export interface PositionNode extends TempNode {
    new(scope?: string) : this;

    scope: string;
    nodeType: string;

    copy(source: PositionNode): this;

    LOCAL: string;
    WORLD: string;
    VIEW: string;
    PROJECTION: string;
}

export interface ReflectNode extends TempNode {
    new(scope?: string) : this;

    scope: string;
    nodeType: string;

    CUBE: string;
    SPHERE: string;
    VECTOR: string;
}

export interface ResolutionNode extends Vector2Node {
    new() : this;

    size: Vector2;
    nodeType: string;

    updateFrame(frame: NodeFrame): void;
    copy(source: ResolutionNode): this;
}

export interface ScreenUVNode extends TempNode {
    new(resolution?: ResolutionNode) : this;

    resolution: ResolutionNode;
    nodeType: string;

    copy(source: ScreenUVNode): this;
}

export interface UVNode extends TempNode {
    new(index?: number) : this;

    index: number;
    nodeType: string;

    copy(source: UVNode): this;
}

export interface AttributeNode extends TempNode {
    new(name: string, type?: string) : this;

    name: string;
    nodeType: string;

    getAttributeType(builder: NodeBuilder): string;
    getType(builder: NodeBuilder): string;
    copy(source: AttributeNode): this;
}

export interface ConstNode extends TempNode {
    new(src: string, useDefine?: boolean) : this;

    src: string;
    useDefine: boolean;
    nodeType: string;

    getType(builder: NodeBuilder): string;
    parse(src: string, useDefine?: boolean): void;
    build(builder: NodeBuilder, output: string): string;
    copy(source: ConstNode): this;

    PI: string;
    PI2: string;
    RECIPROCAL_PI: string;
    RECIPROCAL_PI2: string;
    LOG2: string;
    EPSILON: string;
}

export interface ExpressionNode extends FunctionNode {
    new(src: string, type?: string, keywords?: object, extensions?: object, includes?: object[]) : this;
}

export interface FunctionCallNode extends TempNode {
    new(func: FunctionNode, inputs?: NodeNode[]) : this;

    nodeType: string;

    value: FunctionNode;
    inputs: NodeNode[];

    setFunction(func: FunctionNode, inputs?: NodeNode[]): void;
    getFunction(): FunctionNode;
    getType(): string;
    copy(source: FunctionCallNode): this;
}

export interface FunctionNodeInput {
    name: string;
    type: string;
    qualifier: string;
}

export interface FunctionNode extends TempNode {
    new(src: string, includes?: object[], extensions?: object, keywords?: object, type?: string) : this;

    isMethod: boolean;
    nodeType: string;
    useKeywords: boolean;

    inputs: FunctionNodeInput[] | undefined;
    includes: object[] | undefined;
    extensions: object | undefined;
    keywords: object | undefined;

    getShared(builder: NodeBuilder, output: string): boolean;
    getType(builder: NodeBuilder): string;
    getInputByName(name: string): FunctionNodeInput | undefined;
    getIncludeByName(name: string): object | undefined;
    parse(src: string, includes?: object[], extensions?: object, keywords?: object): void;
    copy(source: FunctionNode): this;
}

export interface InputNode extends TempNode {
    new(type: string, params?: TempNodeParams) : this;

    readonly: boolean;

    setReadonly(value: boolean): this;
    getReadonly(builder: NodeBuilder): boolean;
    copy(source: InputNode): this;
}

export interface NodeFlow {
    result: string;
    code: string;
    extra: object;
}

export interface NodeNode {
    new(type?: string) : this;

    uuid: string;
    name: string;
    type: string | undefined;
    userData: object;
    readonly isNode: true;
    frameId: number | undefined;
    hashProperties: string[] | undefined;

    analyze(builder: NodeBuilder, settings?: object): void;
    analyzeAndFlow(builder: NodeBuilder, output: string, settings?: object): NodeFlow;
    flow(builder: NodeBuilder, output: string, settings?: object): NodeFlow;
    build(builder: NodeBuilder, output: string, uuid?: string): string;
    generate(builder: NodeBuilder, output: string, uuid?: string, type?: string, ns?: string): string;
    appendDepsNode(builder: NodeBuilder, data: object, output: string): void;
    setName(name: string): this;
    getName(builder: NodeBuilder): string;
    getType(builder: NodeBuilder, output?: string): string;
    getJSONNode(meta?: object | string): object | undefined;
    getHash(): string;
    copy(source: NodeNode): this;
    createJSONNode(meta?: object | string): object;
    toJSON(meta?: object | string): object;
}

export interface NodeBuilder {
    new() : this;

    slots: string[];
    caches: string[];
    contexts: object[];

    keywords: object;
    nodeData: object;

    requires: {
        uv: boolean[];
        color: boolean[];
        lights: boolean;
        fog: boolean;
        transparent: boolean;
        irradiance: boolean;
    };

    includes: {
        consts: object[];
        functions: object[];
        structs: object[];
    };

    attributes: object;
    prefixCode: string;

    parsCode: {
        vertex: string;
        fragment: string;
    };

    code: {
        vertex: string;
        fragment: string;
    };

    nodeCode: {
        vertex: string;
        fragment: string;
    };

    resultCode: {
        vertex: string;
        fragment: string;
    };

    finalCode: {
        vertex: string;
        fragment: string;
    };

    inputs: {
        uniforms: {
            list: object[];
            vertex: object[];
            fragment: object[];
        };
        vars: {
            varying: object[];
            vertex: object[];
            fragment: object[];
        };
    };

    defines: object;
    uniforms: object;
    extensions: object;
    updaters: object[];
    nodes: object[];

    analyzing: boolean;

    build(vertex: NodeNode, fragment: NodeNode): this;
    buildShader(shader: string, node: NodeNode): void;
    setMaterial(material: Material, renderer: WebGLRenderer): this;
    addFlow(slot: string, cache?: string, context?: object): this;
    removeFlow(): this;
    addCache(name: string): this;
    removeCache(): this;
    addContext(context: object): this;
    removeContext(): this;
    addSlot(name: string): this;
    removeSlot(): this;
    addVertexCode(code: string): void;
    addFragmentCode(code: string): void;
    addCode(code: string, shader?: string): void;
    addVertexNodeCode(code: string): void;
    addFragmentNodeCode(code: string): void;
    addNodeCode(code: string, shader?: string): void;
    clearNodeCode(shader: string): string;
    clearVertexNodeCode(): string;
    clearFragmentNodeCode(): string;
    addVertexFinalCode(code: string): void;
    addFragmentFinalCode(code: string): void;
    addFinalCode(code: string, shader?: string): void;
    addVertexParsCode(code: string): void;
    addFragmentParsCode(code: string): void;
    addParsCode(code: string, shader?: string): void;
    addVaryCode(code: string): void;
    isCache(name: string): boolean;
    isSlot(name: string): boolean;
    define(name: string, value: any): void;
    isDefined(name: string): boolean;
    getVar(uuid: string, type: string, ns: string, labelOrShader?: string, prefix?: string, label?: string): object;
    getAttribute(name: string, type: string): any;
    getCode(shader: string): string;
    getVarListCode(vars: object[], prefix?: string): string;
    getVars(shader: string): object[];
    getNodeData(node: NodeNode): object;
    createUniform(
        shader: string,
        type: string,
        node: NodeNode,
        ns?: string,
        needsUpdate?: boolean,
        label?: string,
    ): NodeUniform;
    createVertexUniform(type: string, node: NodeNode, ns?: string, needsUpdate?: boolean, label?: string): NodeUniform;
    createFragmentUniform(type: string, node: NodeNode, ns?: string, needsUpdate?: boolean, label?: string): NodeUniform;
    include(node: NodeNode, parent?: boolean, source?: string): void;
    colorToVectorProperties(color: string): string;
    colorToVector(color: string): string;
    getIncludes(type: string, shader: string): object[];
    getIncludesCode(type: string, shader: string): string;
    getConstructorFromLength(len: number): string;
    isTypeMatrix(format: string): boolean;
    getTypeLength(type: string): number;
    getTypeFromLength(len: number): string;
    findNode(): NodeNode;
    resolve(): void;
    format(code: string, from: string, to: string): string;
    getTypeByFormat(format: string): string;
    getFormatByType(type: string): string;
    getUuid(uuid: string, useCache?: boolean): string;
    getElementByIndex(index: number): string;
    getIndexByElement(elm: string): number;
    isShader(shader: string): boolean;
    setShader(shader: string): this;
    mergeDefines(defines: object): object;
    mergeUniform(uniforms: object): object;
    getTextureEncodingFromMap(map: Texture): TextureEncoding;
}

export interface NodeFrame {
    new(time: number) : this;
    time: number;
    id: number;
    delta: number | undefined;
    renderer: WebGLRenderer | undefined;
    renderTexture: Texture | undefined;

    update(delta: number): this;
    setRenderer(renderer: WebGLRenderer): this;
    setRenderTexture(renderTexture: Texture): this;
    updateNode(node: NodeNode): this;
}

export interface NodeLibKeyword {
    callback: (builder: NodeBuilder) => void;
    cache?: object;
}

export interface NodeLib {
    nodes: object;
    keywords: object;

    add(node: NodeNode): void;
    addKeyword(name: string, callback: (builder: NodeBuilder) => void, cache?: object): void;
    remove(node: NodeNode): void;
    removeKeyword(name: string): void;
    get(name: string): NodeNode;
    getKeyword(name: string, builder: NodeBuilder): any;
    getKeywordData(name: string): NodeLibKeyword;
    contains(name: string): boolean;
    containsKeyword(name: string): boolean;
}

export interface NodeUniformParams {
    name?: string;
    type?: string;
    node?: NodeNode;
    needsUpdate?: boolean;
}

export interface NodeUniform {
    new(params?: NodeUniformParams) : this;
    name: string | undefined;
    type: string | undefined;
    node: NodeNode | undefined;
    needsUpdate: boolean | undefined;
    value: any;
}

export interface NodeUtils {
    elements: string[];
    addShortcuts(proto: NodeNode, proxy: string, list: any[]): void;
}

export interface StructNodeInput {
    type: string;
    name: string;
}

export interface StructNode extends TempNode {
    new(src?: string) : this;

    inputs: StructNodeInput[];
    src: string;
    nodeType: string;

    getType(builder: NodeBuilder): string;
    getInputByName(name: string): StructNodeInput;
    parse(src: string): void;
}

export interface TempNodeParams {
    shared?: boolean;
    unique?: boolean;
}

export interface TempNode extends NodeNode {
    new(type: string, params?: TempNodeParams) : this;

    shared: boolean;
    unique: boolean;
    label: string | undefined;

    build(builder: NodeBuilder, output: string, uuid?: string, ns?: string): string;
    getShared(builder: NodeBuilder, output: string): boolean;
    getUnique(builder: NodeBuilder, output: string): boolean;
    setLabel(name: string): this;
    getLabel(builder: NodeBuilder): string;
    getUuid(unique: boolean): string;
    getTemp(builder: NodeBuilder, uuid: string): string | undefined;
}

export interface VarNode extends NodeNode {
    new(type: string, value?: any) : this;

    value: any;
    nodeType: string;

    getType(builder: NodeBuilder): string;
    copy(source: VarNode): this;
}

export interface BlurNode extends TempNode {
    new(value: TextureNode, uv?: UVNode, radius?: number, size?: Vector2) : this;

    value: TextureNode;
    uv: UVNode;
    radius: Vector2Node;
    size: Vector2;
    blurX: boolean;
    blurY: boolean;
    horizontal: FloatNode;
    vertical: FloatNode;
    nodeType: string;

    updateFrame(frame: NodeFrame): void;
    copy(source: BlurNode): this;

    Nodes: {
        blurX: FunctionNode;
        blurY: FunctionNode;
    };
}

export interface ColorAdjustmentNode extends TempNode {
    new(rgb: NodeNode, adjustment?: FloatNode, method?: string) : this;

    rgb: NodeNode;
    adjustment: FloatNode | undefined;
    method: string;
    nodeType: string;

    copy(source: ColorAdjustmentNode): this;

    Nodes: {
        hue: FunctionNode;
        saturation: FunctionNode;
        vibrance: FunctionNode;
    };

    SATURATION: string;
    HUE: string;
    VIBRANCE: string;
    BRIGHTNESS: string;
    CONTRAST: string;
}

export interface LuminanceNode extends TempNode {
    new(rgb: NodeNode) : this;

    rgb: NodeNode;
    nodeType: string;

    copy(source: LuminanceNode): this;

    Nodes: {
        LUMA: ConstNode;
        luminance: FunctionNode;
    };
}

export interface BoolNode extends InputNode {
    new(value?: boolean) : this;

    value: boolean;
    nodeType: string;

    generateReadonly(
        builder: NodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: BoolNode): this;
}

export interface ColorNode extends InputNode {
    new(color: ColorRepresentation, g?: number, b?: number) : this;

    value: Color;
    nodeType: string;

    generateReadonly(
        builder: NodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: ColorNode): this;
}

export interface CubeTextureNode extends InputNode {
    new(value: CubeTexture, uv?: NodeNode, bias?: NodeNode) : this;

    value: CubeTexture;
    uv: NodeNode | undefined;
    bias: NodeNode | undefined;
    nodeType: string;

    getTexture(builder: NodeBuilder, output: string): string;
    copy(source: CubeTextureNode): this;
}

export interface FloatNode extends InputNode {
    new(value?: number) : this;

    value: number;
    nodeType: string;

    generateReadonly(
        builder: NodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: FloatNode): this;
}

export interface IntNode extends InputNode {
    new(value?: number) : this;

    value: number;
    nodeType: string;

    generateReadonly(
        builder: NodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: IntNode): this;
}

export interface Matrix3Node extends InputNode {
    new(matrix?: Matrix3) : this;

    value: Matrix3;
    nodeType: string;
    elements: number[];

    generateReadonly(
        builder: NodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: Matrix3Node): this;
}

export interface Matrix4Node extends InputNode {
    new(matrix?: Matrix4) : this;

    value: Matrix4;
    nodeType: string;
    elements: number[];

    generateReadonly(
        builder: NodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: Matrix4Node): this;
}

export interface PropertyNode extends InputNode {
    new(object: object, property: string, type: string) : this;

    object: object;
    property: string;
    nodeType: string;
    value: any;
}

export interface RTTNodeOptions extends WebGLRenderTargetOptions {
    clear?: boolean;
}

export interface RTTNode extends TextureNode {
    new(width: number, height: number, input: TextureNode, options?: RTTNodeOptions) : this;

    input: TextureNode;
    clear: boolean;
    renderTarget: WebGLRenderTarget;
    material: object; // NodeMaterial
    camera: OrthographicCamera;
    scene: Scene;
    quad: Mesh;
    render: boolean;

    build(builder: NodeBuilder, output: string, uuid?: string): string;
    updateFramesaveTo(frame: NodeFrame): void;
    updateFrame(frame: NodeFrame): void;
    copy(source: RTTNode): this;
}

export interface ReflectorNode extends TempNode {
    new(mirror?: ReflectorRTT) : this;

    mirror: ReflectorRTT;
    textureMatrix: Matrix4Node;
    localPosition: PositionNode;
    uv: OperatorNode;
    uvResult: OperatorNode;
    texture: TextureNode;

    nodeType: string;

    copy(source: ReflectorNode): this;
}

export interface ScreenNode extends TextureNode {
    new(uv?: UVNode) : this;

    nodeType: string;

    getTexture(builder: NodeBuilder, output: string): string;
}

export interface TextureNode extends InputNode {
    new(value: Texture, uv?: UVNode | UVTransformNode, bias?: NodeNode, project?: boolean) : this;

    value: Texture;
    uv: UVNode | UVTransformNode;
    bias: NodeNode;
    project: boolean;
    nodeType: string;

    getTexture(builder: NodeBuilder, output: string): string;
    copy(source: TextureNode): this;
}

export interface Vector2Node extends InputNode {
    new(x: Vector2 | number, y?: number) : this;

    value: Vector2;
    nodeType: string;

    generateReadonly(
        builder: NodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: Vector2Node): this;
}

export interface Vector3Node extends InputNode {
    new(x: Vector3 | number, y?: number, z?: number) : this;

    value: Vector3;
    nodeType: string;

    generateReadonly(
        builder: NodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: Vector3Node): this;
}

export interface Vector4Node extends InputNode {
    new(x: Vector4 | number, y?: number, z?: number, w?: number) : this;

    value: Vector4;
    nodeType: string;

    generateReadonly(
        builder: NodeBuilder,
        output: string,
        uuid?: string,
        type?: string,
        ns?: string,
        needsUpdate?: boolean,
    ): string;
    copy(source: Vector4Node): this;
}

export interface BasicNodeMaterial extends NodeMaterial {
    new() : this;

    color: NodeNode;
    alpha: NodeNode;
    mask: NodeNode;
    position: NodeNode;
}

export interface MeshStandardNodeMaterial extends NodeMaterial {
    new() : this;

    color: Color | NodeNode;
    roughness: number | NodeNode;
    metalness: number | NodeNode;
    map: Texture | NodeNode;
    normalMap: Texture | NodeNode;
    normalScale: Vector2 | NodeNode;
    metalnessMap: Texture | NodeNode;
    roughnessMap: Texture | NodeNode;
    envMap: CubeTexture | NodeNode;
}

export interface NodeMaterialBuildParams {
    builder?: NodeBuilder;
    renderer?: WebGLRenderer;
}

export interface NodeMaterial extends ShaderMaterial {
    new(vertex: NodeNode, fragment: NodeNode) : this;

    vertex: NodeNode | RawNode;
    fragment: NodeNode | RawNode;

    updaters: object[];

    readonly isNodeMaterial: true;
    properties: object;

    updateFrame(frame: NodeFrame): void;
    build(params?: NodeMaterialBuildParams): this;
    getHash(): string;
    copy(source: NodeMaterial): this;
}

export interface PhongNodeMaterial extends NodeMaterial {
    new() : this;

    color: NodeNode;
    alpha: NodeNode;
    specular: NodeNode;
    shininess: NodeNode;
    normal: NodeNode;
    emissive: NodeNode;
    ambient: NodeNode;
    light: NodeNode;
    shadow: NodeNode;
    ao: NodeNode;
    environment: NodeNode;
    environmentAlpha: NodeNode;
    mask: NodeNode;
    position: NodeNode;
}

export interface SpriteNodeMaterial extends NodeMaterial {
    new() : this;

    color: NodeNode;
    alpha: NodeNode;
    mask: NodeNode;
    position: NodeNode;
    spherical: NodeNode;
}

export interface StandardNodeMaterial extends NodeMaterial {
    new() : this;

    color: NodeNode;
    alpha: NodeNode;
    roughness: NodeNode;
    metalness: NodeNode;
    reflectivity: NodeNode;
    clearcoat: NodeNode;
    clearcoatRoughness: NodeNode;
    clearcoatNormal: NodeNode;
    normal: NodeNode;
    emissive: NodeNode;
    ambient: NodeNode;
    light: NodeNode;
    shadow: NodeNode;
    ao: NodeNode;
    environment: NodeNode;
    mask: NodeNode;
    position: NodeNode;
    sheenColor: NodeNode;
}

export interface BasicNode extends NodeNode {
    new() : this;

    position: NodeNode;
    color: NodeNode;
    alpha: NodeNode;
    mask: NodeNode;
    nodeType: string;

    build(builder: NodeBuilder): string;
    copy(source: BasicNode): this;
}

export interface MeshStandardNode extends StandardNode {
    new() : this;

    properties: {
        color: Color;
        roughness: number;
        metalness: number;
        normalScale: Vector2;
    };

    inputs: {
        color: PropertyNode;
        roughness: PropertyNode;
        metalness: PropertyNode;
        normalScale: PropertyNode;
    };

    build(builder: NodeBuilder): string;
}

export interface PhongNode extends NodeNode {
    new() : this;

    color: NodeNode;
    specular: NodeNode;
    shininess: NodeNode;
    nodeType: string;

    build(builder: NodeBuilder): string;
    copy(source: PhongNode): this;
}

export interface RawNode extends NodeNode {
    new(value: NodeNode) : this;

    value: NodeNode;
    nodeType: string;

    copy(source: RawNode): this;
}

export interface SpriteNode extends NodeNode {
    new() : this;

    color: NodeNode;
    spherical: true;
    nodeType: string;

    build(builder: NodeBuilder): string;
    copy(source: SpriteNode): this;
}

export interface StandardNode extends NodeNode {
    new() : this;

    color: NodeNode;
    roughness: NodeNode;
    metalness: NodeNode;
    nodeType: string;
    sheenColor: NodeNode;

    build(builder: NodeBuilder): string;
    copy(source: StandardNode): this;
}

export interface CondNode extends TempNode {
    new(a: NodeNode, b: NodeNode, op: string, ifNode?: NodeNode, elseNode?: NodeNode) : this;

    a: NodeNode;
    b: NodeNode;
    op: string;
    ifNode: NodeNode | undefined;
    elseNode: NodeNode | undefined;
    nodeType: string;

    getCondType(builder: NodeBuilder): string;
    copy(source: CondNode): this;

    EQUAL: string;
    NOT_EQUAL: string;
    GREATER: string;
    GREATER_EQUAL: string;
    LESS: string;
    LESS_EQUAL: string;
    AND: string;
    OR: string;
}

export interface MathNode extends TempNode {
    new(a: NodeNode, bOrMethod: NodeNode | string, cOrMethod?: NodeNode | string, method?: string) : this;

    a: NodeNode;
    b: NodeNode | string | undefined;
    c: NodeNode | string | undefined;
    method: string;
    nodeType: string;

    getNumInputs(builder: NodeBuilder): number;
    getInputType(builder: NodeBuilder): string;
    copy(source: MathNode): this;

    RAD: string;
    DEG: string;
    EXP: string;
    EXP2: string;
    LOG: string;
    LOG2: string;
    SQRT: string;
    INV_SQRT: string;
    FLOOR: string;
    CEIL: string;
    NORMALIZE: string;
    SATURATE: string;
    SIN: string;
    COS: string;
    TAN: string;
    ASIN: string;
    ACOS: string;
    ARCTAN: string;
    ABS: string;
    SIGN: string;
    LENGTH: string;
    NEGATE: string;
    INVERT: string;

    MIN: string;
    MAX: string;
    MOD: string;
    STEP: string;
    REFLECT: string;
    DISTANCE: string;
    DOT: string;
    CROSS: string;
    POW: string;

    MIX: string;
    CLAMP: string;
    REFRACT: string;
    SMOOTHSTEP: string;
    FACEFORWARD: string;
}

export interface OperatorNode extends TempNode {
    new(a: NodeNode, b: NodeNode, op: string) : this;

    a: NodeNode;
    b: NodeNode;
    op: string;

    copy(source: OperatorNode): this;

    ADD: string;
    SUB: string;
    MUL: string;
    DIV: string;
}

export interface BumpMapNode extends TempNode {
    new(value: TextureNode, scale?: FloatNode) : this;

    value: TextureNode;
    scale: FloatNode;
    toNormalMap: boolean;
    nodeType: string;

    copy(source: BumpMapNode): this;

    Nodes: {
        dHdxy_fwd: FunctionNode;
        perturbNormalArb: FunctionNode;
        bumpToNormal: FunctionNode;
    };
}

export interface NormalMapNode extends TempNode {
    new(value: TextureNode, scale?: Vector2Node) : this;

    value: TextureNode;
    scale: Vector2Node;
    toNormalMap: boolean;
    nodeType: string;

    copy(source: NormalMapNode): this;

    Nodes: {
        perturbNormal2Arb: FunctionNode;
    };
}

export interface TextureCubeNode extends TempNode {
    new(value: TextureNode, textureSize?: FloatNode) : this;

    value: TextureNode;
    textureSize: FloatNode;
    radianceCache: {
        uv: TextureCubeUVNode;
    };
    irradianceCache: {
        uv: TextureCubeUVNode;
    };
    nodeType: string;

    generateTextureCubeUV(builder: NodeBuilder, output: string): string;
}

export interface TextureCubeUVNode extends TempNode {
    new(uv: NodeNode, textureSize: FloatNode) : this;

    uv: NodeNode;
    textureSize: FloatNode;
    nodeType: string;

    Nodes: {
        TextureCubeUVData: StructNode;
        textureCubeUV: FunctionNode;
    };
}

export interface NodePass extends ShaderPass {
    new() : this;

    name: string;
    uuid: string;
    userData: object;
    input: ScreenNode;
    needsUpdate: boolean;

    copy(source: NodePass): this;
    toJSON(meta?: object | string): object;
}

export interface NodePostProcessing {
    new(renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget) : this;

    renderer: WebGLRenderer;
    renderTarget: WebGLRenderTarget;

    output: ScreenNode;
    material: NodeMaterial;

    camera: OrthographicCamera;
    scene: Scene;

    quad: Mesh;
    needsUpdate: boolean;

    render(scene: Scene, camera: Camera, frame: NodeFrame): void;
    setSize(width: number, height: number): void;
    copy(source: NodePostProcessing): this;
    toJSON(meta?: object | string): object;
}

export interface CheckerNode extends TempNode {
    new(uv?: UVNode | UVTransformNode) : this;

    uv: UVNode | UVTransformNode;
    nodeType: string;

    copy(source: CheckerNode): this;

    Nodes: {
        checker: FunctionNode;
    };
}

export interface NoiseNode extends TempNode {
    new(uv?: UVNode | UVTransformNode) : this;

    uv: UVNode | UVTransformNode;
    nodeType: string;

    copy(source: NoiseNode): this;

    Nodes: {
        snoise: FunctionNode;
    };
}

export interface BypassNode extends NodeNode {
    new(code: NodeNode, value?: NodeNode) : this;

    code: NodeNode;
    value: NodeNode | undefined;
    nodeType: string;

    copy(source: BypassNode): this;
}

export interface ColorSpaceNode extends TempNode {
    new(input: NodeNode, method?: string) : this;

    input: NodeNode;
    method: string | undefined;
    nodeType: string;

    fromEncoding(encoding: number): void;
    fromDecoding(encoding: number): void;
    copy(source: ColorSpaceNode): this;

    Nodes: {
        LinearToLinear: FunctionNode;
        GammaToLinear: FunctionNode;
        LinearToGamma: FunctionNode;
        sRGBToLinear: FunctionNode;
        LinearTosRGB: FunctionNode;
        RGBEToLinear: FunctionNode;
        LinearToRGBE: FunctionNode;
        RGBMToLinear: FunctionNode;
        LinearToRGBM: FunctionNode;
        RGBDToLinear: FunctionNode;
        LinearToRGBD: FunctionNode;
        cLogLuvM: FunctionNode;
        LinearToLogLuv: FunctionNode;
        cLogLuvInverseM: FunctionNode;
        LogLuvToLinear: FunctionNode;
    };

    LINEAR_TO_LINEAR: string;

    GAMMA_TO_LINEAR: string;
    LINEAR_TO_GAMMA: string;

    SRGB_TO_LINEAR: string;
    LINEAR_TO_SRGB: string;

    RGBE_TO_LINEAR: string;
    LINEAR_TO_RGBE: string;

    RGBM_TO_LINEAR: string;
    LINEAR_TO_RGBM: string;

    RGBD_TO_LINEAR: string;
    LINEAR_TO_RGBD: string;

    LINEAR_TO_LOG_LUV: string;
    LOG_LUV_TO_LINEAR: string;

    getEncodingComponents(encoding: number): any[];
}

export interface JoinNode extends TempNode {
    new(x: NodeNode, y: NodeNode, z?: NodeNode, w?: NodeNode) : this;

    x: NodeNode;
    y: NodeNode;
    z: NodeNode | undefined;
    w: NodeNode | undefined;
    nodeType: string;

    getNumElements(): number;
    copy(source: JoinNode): this;
}

export interface MaxMIPLevelNode extends FloatNode {
    new(texture: NodeNode) : this;

    texture: NodeNode;
    maxMIPLevel: number;
    nodeType: string;
    value: number;
}

export interface SpecularMIPLevelNode extends TempNode {
    new(texture: NodeNode) : this;

    texture: NodeNode;
    maxMIPLevel: MaxMIPLevelNode;
    nodeType: string;

    copy(source: SpecularMIPLevelNode): this;

    Nodes: {
        getSpecularMIPLevel: FunctionNode;
    };
}

export interface SubSlots extends TempNode {
    new(slots?: object) : this;

    slots: NodeNode[];

    copy(source: SubSlots): this;
}

export interface SwitchNode extends NodeNode {
    new(node: NodeNode, components?: string) : this;

    node: NodeNode;
    components: string;
    nodeType: string;

    copy(source: SwitchNode): this;
}

export interface TimerNode extends FloatNode {
    new(scale?: number, scope?: string, timeScale?: boolean) : this;

    scale: number;
    scope: string;
    timeScale: boolean;
    nodeType: string;

    getUnique(): boolean;
    updateFrame(frame: NodeFrame): void;
    copy(source: TimerNode): this;

    GLOBAL: string;
    LOCAL: string;
    DELTA: string;
}

export interface UVTransformNode extends ExpressionNode {
    new(uv?: UVNode, position?: Matrix3Node) : this;

    uv: UVNode;
    position: Matrix3Node;

    nodeType: string;

    setUvTransform(tx: number, ty: number, sx: number, sy: number, rotation: number, cx?: number, cy?: number): void;
    copy(source: UVTransformNode): this;
}

export interface VelocityNodeParams {
    damping: number;
    spring: number;
    type: string;
}

export interface VelocityNode extends Vector3Node {
    new(target: Object3D, params?: VelocityNodeParams) : this;

    velocity: Vector3;
    moment: Vector3 | undefined;
    speed: Vector3 | undefined;
    springVelocity: Vector3 | undefined;
    lastVelocity: Vector3 | undefined;

    nodeType: string;

    setParams(params: VelocityNodeParams): void;
    setTarget(target: Object3D): void;
    updateFrameVelocity(frame: NodeFrame): void;
    updateFrame(frame: NodeFrame): void;
    copy(source: VelocityNode): this;
}
