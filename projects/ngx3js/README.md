ngx3js
========

[![NPM Package][npm]][npm-url]
[![Build Size][build-size]][build-size-url]
[![NPM Downloads][npm-downloads]][npmtrends-url]

#### JavaScript 3D library ####

The aim of the project is to create an easy to use, lightweight, cross-browser, general purpose 3D library. The current builds only include a WebGL renderer but WebGPU (experimental), SVG and CSS3D renderers are also available in the examples.

[Examples](https://outmindkjg.github.io/ngx3js-doc/#/examples/) &mdash;
[Documentation](https://outmindkjg.github.io/ngx3js-doc/#/docs)

### FIX dependencies ###
I found some errors on three.js. Before use this source. You muse fix them by you self.
current theejs verion "^0.131.0"
I found some errors on @types/three. Before use this source. You muse fix them by you self.
current theejs verion "^0.131.0"
```javascript

// node_modules/@types/three/examples/jsm/objects/ReflectorForSSRPass.d.ts
 + 59   export { Reflector as ReflectorForSSRPass };

// node_modules/@types/three/examples/jsm/nodes/inputs/ColorNode.d.ts
 + 7    constructor(color: any, g?: number, b?: number);

// node_modules/@types/three/examples/jsm/loaders/NodeMaterialLoader.d.ts - create
 + 1    export class NodeMaterialLoader {}

// node_modules/@types/three/examples/jsm/libs/dat.gui.module.d.ts
 + 1    export class GUI {}

```

### Usage ###

This code creates a scene, a camera, and a geometric cube, and it adds the cube to the scene. It then creates a `WebGL` renderer for the scene and camera, and it adds that viewport to the `document.body` element. Finally, it animates the cube within the scene for the camera.

```sh
npm install -g @angular/cli
npm install ngx3js@0.131.0
npm install gsap@3.7.1
npm install ammojs-typed@1.0.6
npm install chroma-js@2.1.2
npm i --save-dev @types/three
npm i --save-dev @types/chroma-js

```

```sh
# prettier format change
npx prettier --write src/**/*.json
npx prettier --write src/**/*.ts
npx prettier --write src/**/*.html
npx prettier --write src/**/*.scss
```

```javascript
// src/app/app.module.ts

import { Ngx3JsModule } from 'ngx3js';

@NgModule({
	....
	imports: [..., Ngx3JsModule],
	....
})

// angular.json
{
  .......
  "projects": {
    "your-project-name": {
      ......
      "architect": {
        "build": {
		  ......
          "options": {
            "allowedCommonJsDependencies" : [
              "ammojs-typed"
            ],
		    ......
            "assets": [
    		    ......
                {
                    "glob": "**/*",
                    "input": "./node_modules/ngx3js/assets",
                    "output": "/assets/examples/"
                }
	    	    ......
            ],
		    ......
          },
	      ......
        },
	    ......
      }
    }
  },
  ......
}

// tsconfig.json
{
  ....
  "compilerOptions": {
    ....
    "paths": {
      "fs": ["./node_modules/fs-web"]
    },
    .....
  }
  ....
}
```

// src/app/app.component.html
~~~
<div style="width:200px;height:200px;display: block;position: relative;">
    <ngx3js-renderer [controlType]="'orbit'"
        [controlOptions]="{ enablePan : false , enableDamping : true , minDistance: 10 , maxDistance: 500 }"
        [statsMode]="0" [antialias]="true" [clearColor]="'0x000000'" [clearAlpha]="0" [shadowMapEnabled]="true">
        <ngx3js-lookat [x]="0" [y]="0" [z]="0"></ngx3js-lookat>
        <ngx3js-camera [type]="'perspective'" #mainCamera [clearColor]="'0x000000'" [clearAlpha]="0" [fov]="40"
            [near]="1" [far]="1000" [viewport]="true" [x]="0" [y]="0" [width]="'100%'" [height]="'100%'">
            <ngx3js-position [x]="-50" [y]="0" [z]="50"></ngx3js-position>
        </ngx3js-camera>
        <ngx3js-camera [type]="'perspective'" [clearColor]="'0x222222'" [clearAlpha]="1" [clearDepth]="true" [fov]="40"
            [near]="1" [far]="1000" [viewport]="true" [x]="20" [y]="20" [width]="'25%'" [height]="'width'"
            [scissorTest]="true" [scissorX]="'x'" [scissorY]="'y'" [scissorWidth]="'width'" [scissorHeight]="'height'"
            [referObject3d]="mainCamera">
            <ngx3js-position [x]="-50" [y]="0" [z]="50"></ngx3js-position>
        </ngx3js-camera>
        <ngx3js-shared>
            <ngx3js-material #matLine1 [type]="'Line'" [color]="'0x4080ff'" [linewidth]="5" [dashed]="true"
                [dashScale]="5" [dashSize]="2" [gapSize]="3" [resolutionX]="1024" [resolutionY]="1024">
            </ngx3js-material>
            <ngx3js-material #matLine2 [type]="'LineDashed'" [color]="'0x4080ff'" [scale]="2" [dashSize]="2"
                [gapSize]="1" [linewidth]="3" [dashed]="true" [resolutionX]="1024" [resolutionY]="1024">
            </ngx3js-material>
            <ngx3js-material #matLine3 [type]="'meshlambert'" [color]="'0xff0000'"></ngx3js-material>
        </ngx3js-shared>
        <ngx3js-scene #scene>
            <ngx3js-light [type]="'Hemisphere'" [skyColor]="'0xffffff'" [groundColor]="'0x444444'">
                <ngx3js-position [x]="0" [y]="20" [z]="0"></ngx3js-position>
            </ngx3js-light>
            <ngx3js-light [type]="'directional'" [color]="'0xffffff'" [intensity]="1" [castShadow]="true"
                [shadowCameraTop]="2" [shadowCameraBottom]="-2" [shadowCameraLeft]="-2" [shadowCameraRight]="2"
                [shadowCameraNear]="0.1" [shadowCameraFar]="40">
                <ngx3js-position [x]="-3" [y]="10" [z]="-10"></ngx3js-position>
            </ngx3js-light>
            <ngx3js-mesh>
                <ngx3js-mesh [type]="'Wireframe'" [material]="matLine1">
                    <ngx3js-position [x]="-10" [y]="-10" [z]="10"></ngx3js-position>
                    <ngx3js-geometry [type]="'Icosahedron'" [radius]="8" [detail]="1" [lineType]="'WireframeGeometry2'">
                    </ngx3js-geometry>
                </ngx3js-mesh>
                <ngx3js-mesh [type]="'LineSegments'" [material]="matLine2">
                    <ngx3js-position [x]="10" [y]="-10" [z]="10"></ngx3js-position>
                    <ngx3js-geometry [type]="'Icosahedron'" [radius]="8" [detail]="1"></ngx3js-geometry>
                </ngx3js-mesh>
                <ngx3js-mesh [type]="'Wireframe'" [material]="matLine1">
                    <ngx3js-position [x]="-10" [y]="10" [z]="10"></ngx3js-position>
                    <ngx3js-geometry [type]="'Box'" [width]="16" [height]="16" [depth]="16" [widthSegments]="3"
                        [heightSegments]="3" [depthSegments]="3" [lineType]="'WireframeGeometry2'"></ngx3js-geometry>
                </ngx3js-mesh>
                <ngx3js-mesh [type]="'LineSegments'" [material]="matLine2">
                    <ngx3js-position [x]="10" [y]="10" [z]="10"></ngx3js-position>
                    <ngx3js-geometry [type]="'Box'" [width]="16" [height]="16" [depth]="16" [widthSegments]="3"
                        [heightSegments]="3" [depthSegments]="3"></ngx3js-geometry>
                </ngx3js-mesh>
                <ngx3js-mesh [type]="'Wireframe'" [material]="matLine1">
                    <ngx3js-position [x]="-10" [y]="10" [z]="-10"></ngx3js-position>
                    <ngx3js-geometry [type]="'Plane'" [width]="16" [height]="16" [depth]="16" [widthSegments]="3"
                        [heightSegments]="3" [depthSegments]="3" [lineType]="'WireframeGeometry2'"></ngx3js-geometry>
                </ngx3js-mesh>
                <ngx3js-mesh [type]="'LineSegments'" [material]="matLine2">
                    <ngx3js-position [x]="10" [y]="10" [z]="-10"></ngx3js-position>
                    <ngx3js-geometry [type]="'Plane'" [width]="16" [height]="16" [depth]="16" [widthSegments]="3"
                        [heightSegments]="3" [depthSegments]="3"></ngx3js-geometry>
                </ngx3js-mesh>
                <ngx3js-mesh [type]="'Wireframe'" [material]="matLine1">
                    <ngx3js-position [x]="-10" [y]="-10" [z]="-10"></ngx3js-position>
                    <ngx3js-geometry [type]="'Circle'" [radius]="8" [depth]="3" [radiusSegments]="5" [thetaStart]="30"
                        [thetaLength]="90" [lineType]="'WireframeGeometry2'"></ngx3js-geometry>
                </ngx3js-mesh>
                <ngx3js-mesh [type]="'LineSegments'" [material]="matLine2">
                    <ngx3js-position [x]="10" [y]="-10" [z]="-10"></ngx3js-position>
                    <ngx3js-geometry [type]="'Circle'" [radius]="8" [depth]="3" [radiusSegments]="5" [thetaStart]="30"
                        [thetaLength]="90"></ngx3js-geometry>
                </ngx3js-mesh>
                <ngx3js-mesh [material]="matLine3">
                    <ngx3js-position [x]="10" [y]="0" [z]="-10"></ngx3js-position>
                    <ngx3js-geometry [type]="'Circle'" [radius]="8" [depth]="3" [radiusSegments]="5" [thetaStart]="30"
                        [thetaLength]="90"></ngx3js-geometry>
                </ngx3js-mesh>
                <ngx3js-mesh [type]="'Wireframe'" [material]="matLine1">
                    <ngx3js-position [x]="-10" [y]="-10" [z]="0"></ngx3js-position>
                    <ngx3js-geometry [type]="'RingGeometry'" [outerRadius]="8" [innerRadius]="3" [depth]="3"
                        [phiSegments]="3" [radiusSegments]="15" [thetaStart]="30" [thetaLength]="90"
                        [lineType]="'WireframeGeometry2'"></ngx3js-geometry>
                </ngx3js-mesh>
                <ngx3js-mesh [type]="'LineSegments'" [material]="matLine2">
                    <ngx3js-position [x]="10" [y]="-10" [z]="0"></ngx3js-position>
                    <ngx3js-geometry [type]="'RingGeometry'" [outerRadius]="8" [innerRadius]="3" [depth]="3"
                        [phiSegments]="3" [radiusSegments]="15" [thetaStart]="30" [thetaLength]="90"></ngx3js-geometry>
                </ngx3js-mesh>
                <ngx3js-mesh [material]="matLine3">
                    <ngx3js-position [x]="10" [y]="0" [z]="0"></ngx3js-position>
                    <ngx3js-geometry [type]="'RingGeometry'" [outerRadius]="8" [innerRadius]="3" [depth]="3"
                        [phiSegments]="3" [radiusSegments]="15" [thetaStart]="30" [thetaLength]="90"></ngx3js-geometry>
                </ngx3js-mesh>
            </ngx3js-mesh>
        </ngx3js-scene>
    </ngx3js-renderer>
</div>
~~~

### Cloning this repository ###

Cloning the repo with all its history results in a ~2 GB download. If you don't need the whole history you can use the `depth` parameter to significantly reduce download size.

```sh
git clone --depth=1 https://github.com/outmindkjg/ngx3js.git
```

### Change log ###

[Releases](https://github.com/outmindkjg/ngx3js/releases)


[npm]: https://img.shields.io/npm/v/ngx3js
[npm-url]: https://www.npmjs.com/package/ngx3js
[build-size]: https://badgen.net/bundlephobia/minzip/ngx3js
[build-size-url]: https://bundlephobia.com/result?p=ngx3js
[npm-downloads]: https://img.shields.io/npm/dw/ngx3js
[npmtrends-url]: https://www.npmtrends.com/ngx3js
