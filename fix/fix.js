const fs = require("fs");

function copyFile(soruce, target) {
    fs.readFile(soruce, (err, content) => {
        const planeContents = content.toString();
        fs.writeFile('../node_modules/@types/' + target, planeContents, () => {});
        if (fs.statSync('../dist/ngx3js/node_modules/@types').isDirectory()) {
            fs.writeFile('../dist/ngx3js/node_modules/@types/' + target, planeContents, () => {});
        } else {
            console.log('error : ' + target);
        }
    });
}

copyFile('ColorNode.d.ts','three/examples/jsm/nodes/inputs/ColorNode.d.ts');
copyFile('dat.gui.module.d.ts','three/examples/jsm/libs/dat.gui.module.d.ts');
copyFile('fflate.module.d.ts','three/examples/jsm/libs/fflate.module.d.ts');
copyFile('GeometryCompressionUtils.d.ts', 'three/examples/jsm/utils/GeometryCompressionUtils.d.ts');
copyFile('GeometryUtils.d.ts', 'three/examples/jsm/utils/GeometryUtils.d.ts');
copyFile('NodeMaterialLoader.d.ts', 'three/examples/jsm/loaders/NodeMaterialLoader.d.ts');
copyFile('ReflectorForSSRPass.d.ts', 'three/examples/jsm/objects/ReflectorForSSRPass.d.ts');
copyFile('SceneUtils.d.ts','three/examples/jsm/utils/SceneUtils.d.ts');
