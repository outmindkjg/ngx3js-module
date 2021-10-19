import { Color } from 'three';

import { InputNode } from 'three/examples/jsm/nodes/core/InputNode';
import { NodeBuilder } from 'three/examples/jsm/nodes/core/NodeBuilder';

export class ColorNode extends InputNode {
    constructor(color: any, g?: number, b?: number);

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
