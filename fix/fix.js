const fs = require("fs");

function copyFile(soruce, target) {
    fs.readFile(soruce, (err, content) => {
        const planeContents = content.toString();
        fs.writeFile(target, planeContents, () => {});
    });
}

copyFile('ColorNode.d.ts','../node_modules/@types/three/examples/jsm/nodes/inputs/ColorNode.d.ts');
copyFile('ReflectorForSSRPass.d.ts', '../node_modules/@types/three/examples/jsm/objects/ReflectorForSSRPass.d.ts');
copyFile('NodeMaterialLoader.d.ts', '../node_modules/@types/three/examples/jsm/loaders/NodeMaterialLoader.d.ts');
copyFile('dat.gui.module.d.ts','../node_modules/@types/three/examples/jsm/libs/dat.gui.module.d.ts');
copyFile('fflate.module.d.ts','../node_modules/@types/three/examples/jsm/libs/fflate.module.d.ts');
