const fs = require("fs");

function copyFile(soruce, target) {
    fs.readFile(soruce, (err, content) => {
        const planeContents = content.toString();
        fs.writeFile('../node_modules/' + target, planeContents, () => {});
        if (fs.existsSync('../dist/ngx3js/node_modules')) {
            fs.writeFile('../dist/ngx3js/node_modules/' + target, planeContents, () => {});
        }
        if (fs.existsSync('/Users/outmind/Library/Caches/typescript/4.4/node_modules')) {
            fs.writeFile('/Users/outmind/Library/Caches/typescript/4.4/node_modules/' + target, planeContents, () => {});
        }
        console.log('file : ' + '../node_modules/' + target);
    });
}

copyFile('ColorNode.d.ts','@types/three/examples/jsm/nodes/inputs/ColorNode.d.ts');
copyFile('dat.gui.module.d.ts','@types/three/examples/jsm/libs/dat.gui.module.d.ts');
copyFile('fflate.module.d.ts','@types/three/examples/jsm/libs/fflate.module.d.ts');
copyFile('GeometryCompressionUtils.d.ts', '@types/three/examples/jsm/utils/GeometryCompressionUtils.d.ts');
copyFile('GeometryUtils.d.ts', '@types/three/examples/jsm/utils/GeometryUtils.d.ts');
copyFile('NodeMaterialLoader.d.ts', '@types/three/examples/jsm/loaders/NodeMaterialLoader.d.ts');
copyFile('ReflectorForSSRPass.d.ts', '@types/three/examples/jsm/objects/ReflectorForSSRPass.d.ts');
copyFile('SceneUtils.d.ts','@types/three/examples/jsm/utils/SceneUtils.d.ts');
copyFile('meshopt_decoder.module.d.ts','@types/three/examples/jsm/libs/meshopt_decoder.module.d.ts');
copyFile('meshopt_decoder.module.d.ts','@types/three/examples/jsm/libs/meshopt_decoder.module.d.ts');
copyFile('AmmoPhysics.d.ts','@types/three/examples/jsm/physics/AmmoPhysics.d.ts');
copyFile('OimoPhysics.d.ts','@types/three/examples/jsm/physics/OimoPhysics.d.ts');

