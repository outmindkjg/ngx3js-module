import { Injectable } from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from './interface';
import { ILoadedNameMap, ILoadedObject, IStorageExportOption, IStorageOption } from './ngx-interface';
import * as Ammo from './threejs-library/ammo';

/**
 * Local Storage Service
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxLocalStorageService) page for details.
 *
 */
@Injectable({
	providedIn: 'root',
})
export class NgxLocalStorageService {
	/**
	 * Creates an instance of local storage service.
	 */
	constructor() {}

	/**
	 * Sets item
	 * @param key
	 * @param value
	 */
	public setItem(key: string, value: string) {
		localStorage.setItem(key, value);
	}

	/**
	 * Gets item
	 * @param key
	 * @returns
	 */
	public getItem(key: string) {
		return localStorage.getItem(key);
	}

	/**
	 * Sets object
	 * @param key
	 * @param mesh
	 */
	public setObject(key: string, mesh: I3JS.Object3D) {
		this.setItem(key, JSON.stringify(mesh.toJSON()));
	}

	/**
	 * Gets store url list
	 * @param url
	 * @returns
	 */
	private getStoreUrlList(url: string | string[]) {
		if (typeof url === 'string') {
			return NgxThreeUtil.getStoreUrl(url);
		} else {
			const modUrl: any[] = [];
			url.forEach((path) => {
				modUrl.push(NgxThreeUtil.getStoreUrl(path));
			});
			return modUrl;
		}
	}

	/**
	 * Determines whether progress on
	 * @param xhr
	 */
	public onProgress(xhr: any) {
		if (xhr.lengthComputable) {
			const percentComplete = (xhr.loaded / xhr.total) * 100;
			console.log(Math.round(percentComplete * 100) / 100 + '% downloaded');
		}
	}

	/**
	 * Determines whether error on
	 * @param event
	 */
	public onError(event: any) {
		console.log(event);
	}

	/**
	 * Gets store object
	 * @param object
	 * @param [options]
	 * @returns store object
	 */
	private getStoreObject(object: I3JS.Object3D, options: any = null): I3JS.Object3D {
		if (options !== null && object !== null) {
			if (options.firstChild && object.children.length > 0) {
				object = object.children[0];
			}
			if (options.onLoad !== null && typeof options.onLoad === 'function') {
				const result = options.onLoad(object);
				if (result !== null && result instanceof N3JS.Object3D) {
					return result;
				}
			}
		}
		return object;
	}

	/**
	 * Collada exporter of local storage service
	 */
	private colladaExporter: I3JS.ColladaExporter = null;

	/**
	 * Obj exporter of local storage service
	 */
	private objExporter: I3JS.OBJExporter = null;

	/**
	 * Draco exporter of local storage service
	 */
	private dracoExporter: I3JS.DRACOExporter = null;

	/**
	 * Gltf exporter of local storage service
	 */
	private gltfExporter: I3JS.GLTFExporter = null;

	/**
	 * Mmd exporter of local storage service
	 */
	private mmdExporter: I3JS.MMDExporter = null;

	/**
	 * Ply exporter of local storage service
	 */
	private plyExporter: I3JS.PLYExporter = null;

	/**
	 * Usdz exporter of local storage service
	 */
	private usdzExporter: I3JS.USDZExporter = null;

	/**
	 * Stl exporter of local storage service
	 */
	private stlExporter: I3JS.STLExporter = null;

	/**
	 * Gets export object
	 * @param fileName
	 * @param object
	 * @param [options]
	 */
	public getExportObject(fileName: string, object: I3JS.Object3D | I3JS.Object3D[], options?: IStorageExportOption) {
		if (object instanceof N3JS.Object3D) {
			object.traverse((child) => {
				Object.entries(child.userData).forEach(([key, value]) => {
					if (typeof value === 'object') {
						delete child.userData[key];
					}
				});
			});
		} else if (Array.isArray(object)) {
			object.forEach((gchild) => {
				gchild.traverse((child) => {
					Object.entries(child.userData).forEach(([key, value]) => {
						if (typeof value === 'object') {
							delete child.userData[key];
						}
					});
				});
			});
		}
		if (fileName.endsWith('.dae')) {
			if (this.colladaExporter === null) {
				this.colladaExporter = new N3JS.ColladaExporter();
			}
			if (object instanceof N3JS.Object3D) {
				this.colladaExporter.parse(
					object,
					(res) => {
						this.saveString(res.data, fileName);
						res.textures.forEach((tex: any) => {
							this.saveArrayBuffer(tex.data, `${tex.name}.${tex.ext}`);
						});
					},
					{}
				);
			}
		} else if (fileName.endsWith('.drc')) {
			if (this.dracoExporter === null) {
				this.dracoExporter = new N3JS.DRACOExporter();
			}
			//
			if (object instanceof N3JS.Mesh || object instanceof N3JS.Points) {
				if ((window as any).DracoEncoderModule === undefined) {
					console.log(
						'script required in angular.json - projects/{project_name}/architect/build/options/scripts : ["node_modules/ngx3js/assets/js/libs/draco/draco_encoder.js"]'
					);
				} else {
					const result = this.dracoExporter.parse(object, {});
					this.saveArrayBuffer(result, fileName);
				}
			}
		} else if (fileName.endsWith('.usdz')) {
			if (this.usdzExporter === null) {
				this.usdzExporter = new N3JS.USDZExporter();
			}
			if (object instanceof N3JS.Object3D) {
				this.usdzExporter.parse(object).then((result) => {
					this.saveArrayBuffer(result, fileName);
				});
			}
		} else if (fileName.endsWith('.gltf') || fileName.endsWith('.glb')) {
			if (this.gltfExporter === null) {
				this.gltfExporter = new N3JS.GLTFExporter();
			}
			const fileNameOnly = fileName.substr(0, fileName.lastIndexOf('.'));
			this.gltfExporter.parse(
				Array.isArray(object) ? object[0] : object,
				(result) => {
					if (result instanceof ArrayBuffer) {
						this.saveArrayBuffer(result, fileNameOnly + '.glb');
					} else {
						const output = JSON.stringify(result, null, 2);
						this.saveString(output, fileNameOnly + '.gltf');
					}
				},
				options
			);
		} else if (fileName.endsWith('.obj')) {
			if (this.objExporter === null) {
				this.objExporter = new N3JS.OBJExporter();
			}
			const result = this.objExporter.parse(Array.isArray(object) ? object[0] : object);
			this.saveString(result, fileName);
		} else if (fileName.endsWith('.ply')) {
			if (this.plyExporter === null) {
				this.plyExporter = new N3JS.PLYExporter();
			}
			this.plyExporter.parse(
				Array.isArray(object) ? object[0] : object,
				(result: any) => {
					if (result instanceof ArrayBuffer) {
						this.saveArrayBuffer(result, fileName);
					} else {
						this.saveString(result, fileName);
					}
				},
				options
			);
		} else if (fileName.endsWith('.stl')) {
			if (this.stlExporter === null) {
				this.stlExporter = new N3JS.STLExporter();
			}
			const result: any = this.stlExporter.parse(Array.isArray(object) ? object[0] : object, options);
			if (result instanceof ArrayBuffer) {
				this.saveArrayBuffer(result, fileName);
			} else {
				this.saveString(result, fileName);
			}
		} else if (
			fileName.endsWith('.pmd') ||
			fileName.endsWith('.pmx') ||
			fileName.endsWith('.vmd') ||
			fileName.endsWith('.vpd')
		) {
			if (this.mmdExporter === null) {
				this.mmdExporter = new N3JS.MMDExporter();
			}
			const result: any = this.mmdExporter.parseVpd(Array.isArray(object) ? object[0] : object, false, false);
			if (result instanceof ArrayBuffer) {
				this.saveArrayBuffer(result, fileName);
			} else {
				this.saveString(result, fileName);
			}
		} else if (fileName.endsWith('.usdz')) {
			if (this.usdzExporter === null) {
				this.usdzExporter = new N3JS.USDZExporter();
			}
			const result: any = this.usdzExporter.parse(Array.isArray(object) ? object[0] : object);
			if (result instanceof ArrayBuffer) {
				this.saveArrayBuffer(result, fileName);
			} else {
				this.saveString(result, fileName);
			}
		}
	}

	/**
	 * Saves local storage service
	 * @param blob
	 * @param filename
	 */
	private save(blob: any, filename: string) {
		const link = document.createElement('a');
		link.style.display = 'none';
		document.body.appendChild(link);
		link.href = URL.createObjectURL(blob);
		link.download = filename;
		link.click();
		link.parentNode.removeChild(link);
	}

	/**
	 * Saves array buffer
	 * @param buffer
	 * @param filename
	 */
	private saveArrayBuffer(buffer: any, filename: string) {
		this.save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
	}

	/**
	 * Saves string
	 * @param text
	 * @param filename
	 */
	private saveString(text: string, filename: string) {
		this.save(new Blob([text], { type: 'text/plain' }), filename);
	}

	/**
	 * Loaded object of local storage service
	 */
	private _loadedObject: { [key: string]: ILoadedObject } = {};

	/**
	 * Gets object name map
	 * @param object
	 * @param nameMap
	 * @returns
	 */
	private getNameMap(object: I3JS.Object3D, nameMap: ILoadedNameMap): ILoadedNameMap {
		const name = object.name || 'name';
		const map: ILoadedNameMap = {};
		nameMap[name] = map;
		object.children.forEach((child) => {
			this.getNameMap(child, map);
		});
		return nameMap;
	}

	/**
	 * Gets object from key
	 * @param key
	 * @param callBack
	 * @param options
	 */
	private getObjectFromKey(key: string, callBack: (mesh: ILoadedObject) => void, options: IStorageOption): void {
		options = options || {};
		let safeKey = '';
		if (NgxThreeUtil.isNotNull(options.path)) {
			safeKey = key.substr(key.lastIndexOf('/') + 1);
		} else {
			safeKey = NgxThreeUtil.getStoreUrl(key);
		}
		if (this._loadedObject[safeKey] !== undefined) {
			const result = this._loadedObject[safeKey];
			setTimeout(() => {
				let cloneObject3d: I3JS.Object3D = null;
				if (NgxThreeUtil.isNotNull(result.object)) {
					result.object.userData = {};
					cloneObject3d = result.object.clone(true);
					if (options.autoCenter) {
						const object = cloneObject3d;
						const objectBox = new N3JS.Box3().setFromObject(object);
						const center = objectBox.getCenter(new N3JS.Vector3());
						object.position.x += object.position.x - center.x;
						object.position.y += object.position.y - center.y;
						object.position.z += object.position.z - center.z;
						cloneObject3d = new N3JS.Group();
						cloneObject3d.add(object);
					}
				}
				callBack({
					object: cloneObject3d,
					material: NgxThreeUtil.isNotNull(result.material) ? result.material : null,
					geometry: NgxThreeUtil.isNotNull(result.geometry) ? result.geometry.clone() : null,
					texture: NgxThreeUtil.isNotNull(result.texture) ? result.texture.clone() : null,
					clips: result.clips,
					morphTargets: result.morphTargets,
					source: result.source,
				});
			}, 10);
		} else {
			this._getObjectFromKey(
				safeKey,
				(result: ILoadedObject) => {
					if (result.object && options.debugName) {
						console.log(this.getNameMap(result.object, {}));
					}
					if (result.source && options.debug) {
						console.log(result.source);
					}
					let cloneObject3d: I3JS.Object3D = null;
					if (NgxThreeUtil.isNotNull(result.object)) {
						cloneObject3d = result.object;
						if (options.firstMesh) {
							let foundMesh: I3JS.Object3D = null;
							cloneObject3d.traverse((node: any) => {
								if (foundMesh === null && node['isMesh']) {
									foundMesh = node;
								}
							});
							if (foundMesh !== null) {
								cloneObject3d = foundMesh;
							}
						}
						if (options.autoCenter) {
							const object = cloneObject3d;
							const objectBox = new N3JS.Box3().setFromObject(object);
							const center = objectBox.getCenter(new N3JS.Vector3());
							object.position.x += object.position.x - center.x;
							object.position.y += object.position.y - center.y;
							object.position.z += object.position.z - center.z;
							cloneObject3d = new N3JS.Group();
							cloneObject3d.add(object);
						}
					}
					result.object = cloneObject3d;
					// this._loadedObject[safeKey] = result;
					callBack(result);
					// this.getObjectFromKey(key, callBack, options);
				},
				options
			);
		}
	}

	/**
	 * Sets loader with option
	 * @param loader
	 * @param options
	 * @returns
	 */
	public setLoaderWithOption(loader: I3JS.Loader, options: IStorageOption) {
		if (NgxThreeUtil.isNotNull(options)) {
			if (NgxThreeUtil.isNotNull(loader.setResourcePath)) {
				if (NgxThreeUtil.isNotNull(options.resourcePath)) {
					loader.setResourcePath(NgxThreeUtil.getStoreUrl(options.resourcePath));
				}
			}
			if (NgxThreeUtil.isNotNull(loader.setPath)) {
				if (NgxThreeUtil.isNotNull(options.path)) {
					loader.setPath(NgxThreeUtil.getStoreUrl(options.path));
				} else {
					loader.setPath('');
				}
			}
			const loaderAny: any = loader;
			if (NgxThreeUtil.isNotNull(loaderAny['setDataType'])) {
				if (NgxThreeUtil.isNotNull(options.dataType)) {
					loaderAny['setDataType'](NgxThreeUtil.getTextureDataTypeSafe(options.dataType));
				}
			}
		}
		return loader;
	}

	/**
	 * Gets object from key
	 * @param key
	 * @param callBack
	 * @param options
	 */
	private _getObjectFromKey(key: string, callBack: (mesh: ILoadedObject) => void, options: IStorageOption): void {
		if (key.endsWith('.dae')) {
			const colladaLoader: I3JS.ColladaLoader = NgxThreeUtil.getLoader('colladaLoader', N3JS.ColladaLoader);
			this.setLoaderWithOption(colladaLoader, options);
			colladaLoader.load(key, (result) => {
				callBack({
					object: result.scene,
					clips: result.scene.animations,
					source: result,
				});
			});
		} else if (key.endsWith('.obj')) {
			const objLoader: I3JS.OBJLoader = NgxThreeUtil.getLoader('objLoader', N3JS.OBJLoader);
			this.setLoaderWithOption(objLoader, options);
			const materialUrl: string = options.material ? options.material : null;
			if (materialUrl !== null && materialUrl.length > 0) {
				this.getObjectFromKey(
					materialUrl,
					(result) => {
						if (result.material !== null && result.material !== undefined) {
							objLoader.setMaterials(result.material);
						}
						objLoader.load(
							key,
							(result: any) => {
								callBack({
									object: this.getStoreObject(result, options),
									source: result,
								});
							},
							this.onProgress,
							this.onError
						);
					},
					options
				);
			} else {
				objLoader.setMaterials(null);
				objLoader.load(
					key,
					(result: any) => {
						callBack({
							object: result,
							source: result,
						});
					},
					this.onProgress,
					this.onError
				);
			}
		} else if (key.endsWith('.mtl')) {
			const mtlLoader: I3JS.MTLLoader = NgxThreeUtil.getLoader('mtlLoader', N3JS.MTLLoader);
			this.setLoaderWithOption(mtlLoader, options);
			mtlLoader.load(
				key,
				(materials) => {
					materials.preload();
					callBack({
						material: materials,
						source: materials,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.3ds')) {
			const tdsLoader: I3JS.TDSLoader = NgxThreeUtil.getLoader('tdsLoader', N3JS.TDSLoader);
			this.setLoaderWithOption(tdsLoader, options);
			tdsLoader.load(
				key,
				(object) => {
					callBack({
						object: object,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.tilt')) {
			const tiltLoader: I3JS.TiltLoader = NgxThreeUtil.getLoader(
				'tiltLoader',
				N3JS.TiltLoader,
				NgxThreeUtil.getStoreUrl('')
			);
			this.setLoaderWithOption(tiltLoader, options);
			tiltLoader.load(
				key,
				(object) => {
					callBack({
						object: object,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.amf')) {
			const amfLoader: I3JS.AMFLoader = NgxThreeUtil.getLoader('amfLoader', N3JS.AMFLoader);
			this.setLoaderWithOption(amfLoader, options);
			amfLoader.load(
				key,
				(object) => {
					callBack({
						object: object,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.vox')) {
			const voxLoader: I3JS.VOXLoader = NgxThreeUtil.getLoader('voxLoader', N3JS.VOXLoader);
			this.setLoaderWithOption(voxLoader, options);
			voxLoader.load(
				key,
				(chunks) => {
					const object3d = new N3JS.Group();
					chunks.forEach((chunk) => {
						object3d.add(new N3JS.VOXMesh(chunk));
					});
					callBack({
						object: object3d,
						source: chunks,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.exr')) {
			const exrLoader: I3JS.EXRLoader = NgxThreeUtil.getLoader('exrLoader', N3JS.EXRLoader);
			this.setLoaderWithOption(exrLoader, options);
			exrLoader.load(
				key,
				(dataTexture: any) => {
					callBack({
						texture: dataTexture,
						source: dataTexture,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.pvr')) {
			const pvrLoader: I3JS.PVRLoader = NgxThreeUtil.getLoader('pvrLoader', N3JS.PVRLoader);
			this.setLoaderWithOption(pvrLoader, options);
			pvrLoader.load(
				key,
				(texture) => {
					callBack({
						texture: texture,
						source: texture,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.hdr')) {
			const rgbeLoader: I3JS.RGBELoader = NgxThreeUtil.getLoader('rgbeLoader', N3JS.RGBELoader);
			this.setLoaderWithOption(rgbeLoader, options);
			rgbeLoader.load(
				key,
				(dataTexture) => {
					callBack({
						texture: dataTexture,
						source: dataTexture,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.ktx')) {
			const ktxLoader: I3JS.KTXLoader = NgxThreeUtil.getLoader('ktxLoader', N3JS.KTXLoader);
			this.setLoaderWithOption(ktxLoader, options);
			ktxLoader.load(
				key,
				(texture) => {
					callBack({
						texture: texture,
						source: texture,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.ifc')) {
			const ifcLoader: I3JS.IFCLoader = NgxThreeUtil.getLoader('ifcLoader', N3JS.IFCLoader);
			this.setLoaderWithOption(ifcLoader, options);
			ifcLoader.load(
				key,
				(ifc) => {
					callBack({
						object: ifc,
						source: ifc,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.ktx2')) {
			const ktx2Loader: I3JS.KTX2Loader = NgxThreeUtil.getLoader('ktx2Loader', N3JS.KTX2Loader);
			this.setLoaderWithOption(ktx2Loader, options);
			ktx2Loader.loadAsync(key, this.onProgress).then((texture) => {
				callBack({
					texture: texture,
					source: texture,
				});
			});
		} else if (key.endsWith('.dds')) {
			const ddsLoader: I3JS.DDSLoader = NgxThreeUtil.getLoader('ddsLoader', N3JS.DDSLoader);
			this.setLoaderWithOption(ddsLoader, options);
			ddsLoader.load(
				key,
				(texture) => {
					callBack({
						texture: texture,
						source: texture,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.bvh')) {
			const bvhLoader: I3JS.BVHLoader = NgxThreeUtil.getLoader('bvhLoader', N3JS.BVHLoader);
			this.setLoaderWithOption(bvhLoader, options);
			bvhLoader.load(
				key,
				(object: any) => {
					if (object.skeleton && object.skeleton.bones && object.skeleton.bones.length > 0) {
						const skeletonHelper: any = new N3JS.SkeletonHelper(object.skeleton.bones[0]);
						skeletonHelper['skeleton'] = object.skeleton; // allow animation mixer to bind to THREE.SkeletonHelper directly
						callBack({
							object: skeletonHelper,
							clips: [object.clip],
							source: object,
						});
					}
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.fbx')) {
			const fbxLoader: I3JS.FBXLoader = NgxThreeUtil.getLoader('fbxLoader', N3JS.FBXLoader);
			this.setLoaderWithOption(fbxLoader, options);
			fbxLoader.load(
				key,
				(object) => {
					callBack({
						object: this.getStoreObject(object, options),
						clips: object.animations,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.kmz')) {
			const kmzLoader: I3JS.KMZLoader = NgxThreeUtil.getLoader('kmzLoader', N3JS.KMZLoader);
			if (options.resourcePath) {
				kmzLoader.setResourcePath(NgxThreeUtil.getStoreUrl(options.resourcePath));
			}
			kmzLoader.load(
				key,
				(object) => {
					callBack({
						object: object.scene,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.lwo')) {
			const lwoLoader: I3JS.LWOLoader = NgxThreeUtil.getLoader('lwoLoader', N3JS.LWOLoader);
			if (options.resourcePath) {
				lwoLoader.setResourcePath(NgxThreeUtil.getStoreUrl(options.resourcePath));
			}
			lwoLoader.load(
				key,
				(object) => {
					const mesh = new N3JS.Group();
					object.meshes.forEach((obj) => {
						mesh.add(obj);
					});
					callBack({
						object: mesh,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.mpd')) {
			const lDrawLoader: I3JS.LDrawLoader = NgxThreeUtil.getLoader('lDrawLoader', N3JS.LDrawLoader);
			if (options.resourcePath) {
				lDrawLoader.setResourcePath(NgxThreeUtil.getStoreUrl(options.resourcePath));
			}
			lDrawLoader.load(
				key,
				(object) => {
					callBack({
						object: object,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.gcode')) {
			const gCodeLoader: I3JS.GCodeLoader = NgxThreeUtil.getLoader('gCodeLoader', N3JS.GCodeLoader);
			this.setLoaderWithOption(gCodeLoader, options);
			gCodeLoader.load(
				key,
				(object) => {
					callBack({
						object: object,
						clips: object.animations,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.3mf')) {
			const threeMFLoader: I3JS.ThreeMFLoader = NgxThreeUtil.getLoader('threeMFLoader', N3JS.ThreeMFLoader);
			this.setLoaderWithOption(threeMFLoader, options);
			threeMFLoader.load(
				key,
				(object) => {
					callBack({
						object: object,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.3dm')) {
			const rhino3dmLoader: I3JS.Rhino3dmLoader = NgxThreeUtil.getLoader('rhino3dmLoader', N3JS.Rhino3dmLoader);
			this.setLoaderWithOption(rhino3dmLoader, options);
			rhino3dmLoader.load(key, (result) => {
				callBack({
					object: result,
					clips: result.animations,
					source: result,
				});
			});
		} else if (key.endsWith('.basis')) {
			const basisTextureLoader: I3JS.BasisTextureLoader = NgxThreeUtil.getLoader(
				'basisTextureLoader',
				N3JS.BasisTextureLoader
			);
			this.setLoaderWithOption(basisTextureLoader, options);
			basisTextureLoader.load(
				key,
				(texture) => {
					callBack({
						texture: texture,
						source: texture,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.drc')) {
			const dracoLoader: I3JS.DRACOLoader = NgxThreeUtil.getLoader('dracoLoader', N3JS.DRACOLoader);
			this.setLoaderWithOption(dracoLoader, options);
			dracoLoader.load(
				key,
				(geometry) => {
					callBack({
						geometry: geometry,
						source: geometry,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.gltf') || key.endsWith('.glb')) {
			const gltfLoader: I3JS.GLTFLoader = NgxThreeUtil.getLoader('gltfLoader', N3JS.GLTFLoader);
			if (options) {
				if (options.useDraco) {
					const dracoLoader: I3JS.DRACOLoader = NgxThreeUtil.getLoader('dracoLoader', N3JS.DRACOLoader);
					gltfLoader.setDRACOLoader(dracoLoader);
				}
				if (options.useKtx2) {
					const ktx2Loader: I3JS.KTX2Loader = NgxThreeUtil.getLoader('ktx2Loader', N3JS.KTX2Loader);
					gltfLoader.setKTX2Loader(ktx2Loader);
					gltfLoader.setMeshoptDecoder(N3JS.MeshoptDecoder);
				}
				this.setLoaderWithOption(gltfLoader, options);
			}
			gltfLoader.load(
				key,
				(result) => {
					callBack({
						object: this.getStoreObject(result.scene, options),
						clips: result.animations,
						source: result,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.pmd') || key.endsWith('.pmx') || key.endsWith('.vmd') || key.endsWith('.vpd')) {
			const mmdLoader: I3JS.MMDLoader = NgxThreeUtil.getLoader('mmdLoader', N3JS.MMDLoader);
			this.setLoaderWithOption(mmdLoader, options);
			const vmdUrl = options && options.vmdUrl ? options.vmdUrl : null;
			if (vmdUrl !== null) {
				if ((window as any).Ammo === undefined) {
					Ammo.AmmoInit({
						Ammo: null,
						locateFile: (ammoFile: string) => {
							return NgxThreeUtil.getStoreUrl(ammoFile);
						},
					}).then((ammoLib: any) => {
						(window as any).Ammo = ammoLib;
						mmdLoader.loadWithAnimation(
							key,
							this.getStoreUrlList(vmdUrl),
							(result) => {
								callBack({
									object: this.getStoreObject(result.mesh, options),
									clips: result.animation ? [result.animation] : null,
								});
							},
							this.onProgress,
							this.onError
						);
					});
				} else {
					mmdLoader.loadWithAnimation(
						key,
						this.getStoreUrlList(vmdUrl),
						(result) => {
							callBack({
								object: this.getStoreObject(result.mesh, options),
								clips: result.animation ? [result.animation] : null,
							});
						},
						this.onProgress,
						this.onError
					);
				}
			} else if (key.endsWith('.vmd')) {
				const object: I3JS.SkinnedMesh | I3JS.Camera = options.object;
				mmdLoader.loadAnimation(
					key,
					object,
					(result) => {
						if (result instanceof N3JS.SkinnedMesh) {
							callBack({
								object: this.getStoreObject(result, options),
								source: result,
							});
						} else {
							callBack({
								clips: [result],
								source: result,
							});
						}
					},
					this.onProgress,
					this.onError
				);
			} else {
				mmdLoader.load(
					key,
					(result) => {
						callBack({
							object: this.getStoreObject(result, options),
						});
					},
					this.onProgress,
					this.onError
				);
			}
		} else if (key.endsWith('.pcd')) {
			const pcdLoader: I3JS.PCDLoader = NgxThreeUtil.getLoader('pcdLoader', N3JS.PCDLoader);
			this.setLoaderWithOption(pcdLoader, options);
			pcdLoader.load(
				key,
				(points) => {
					callBack({
						object: points,
						source: points,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.prwm')) {
			const prwmLoader: I3JS.PRWMLoader = NgxThreeUtil.getLoader('prwmLoader', N3JS.PRWMLoader);
			this.setLoaderWithOption(prwmLoader, options);
			prwmLoader.load(
				key,
				(geometry) => {
					callBack({
						geometry: geometry,
						source: geometry,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.tga')) {
			const tgaLoader: I3JS.TGALoader = NgxThreeUtil.getLoader('tgaLoader', N3JS.TGALoader);
			this.setLoaderWithOption(tgaLoader, options);
			tgaLoader.load(key, (texture) => {
				callBack({
					texture: texture,
					source: texture,
				});
			});
		} else if (key.endsWith('.svg')) {
			const svgLoader: I3JS.SVGLoader = NgxThreeUtil.getLoader('svgLoader', N3JS.SVGLoader);
			this.setLoaderWithOption(svgLoader, options);
			svgLoader.load(
				key,
				(data) => {
					const paths = data.paths;
					const group = new N3JS.Group();
					const drawFillShapes = options.drawFillShapes || false;
					const drawStrokes = options.drawStrokes || false;
					const fillShapesWireframe = options.fillShapesWireframe || false;
					const strokesWireframe = options.strokesWireframe || false;
					paths.forEach((path) => {
						const fillColor = path.userData.style.fill;
						if (drawFillShapes && fillColor !== undefined && fillColor !== 'none') {
							const material = new N3JS.MeshBasicMaterial({
								color: new N3JS.Color().setStyle(fillColor),
								opacity: path.userData.style.fillOpacity,
								transparent: path.userData.style.fillOpacity < 1,
								side: N3JS.DoubleSide,
								depthWrite: false,
								wireframe: fillShapesWireframe,
							});
							const shapes = path.toShapes(true);
							shapes.forEach((shape) => {
								const geometry = new N3JS.ShapeGeometry(shape);
								const mesh = new N3JS.Mesh(geometry, material);
								group.add(mesh);
							});
						}
						const strokeColor = path.userData.style.stroke;
						if (drawStrokes && strokeColor !== undefined && strokeColor !== 'none') {
							const material = new N3JS.MeshBasicMaterial({
								color: new N3JS.Color().setStyle(strokeColor),
								opacity: path.userData.style.strokeOpacity,
								transparent: path.userData.style.strokeOpacity < 1,
								side: N3JS.DoubleSide,
								depthWrite: false,
								wireframe: strokesWireframe,
							});
							path.subPaths.forEach((subPath) => {
								const geometry = N3JS.SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);
								if (geometry) {
									const mesh = new N3JS.Mesh(geometry, material);
									group.add(mesh);
								}
							});
						}
					});
					callBack({
						object: group,
						source: data,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.ply')) {
			const plyLoader: I3JS.PLYLoader = NgxThreeUtil.getLoader('plyLoader', N3JS.PLYLoader);
			this.setLoaderWithOption(plyLoader, options);
			plyLoader.load(
				key,
				(geometry) => {
					callBack({
						geometry: geometry,
						source: geometry,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.vtk') || key.endsWith('.vtp')) {
			const vtkLoader: I3JS.VTKLoader = NgxThreeUtil.getLoader('vtkLoader', N3JS.VTKLoader);
			this.setLoaderWithOption(vtkLoader, options);
			vtkLoader.load(
				key,
				(geometry) => {
					callBack({
						geometry: geometry,
						source: geometry,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.mdd')) {
			const mddLoader: I3JS.MDDLoader = NgxThreeUtil.getLoader('mddLoader', N3JS.MDDLoader);
			this.setLoaderWithOption(mddLoader, options);
			mddLoader.load(
				key,
				(mdd) => {
					callBack({
						clips: [mdd.clip],
						morphTargets: mdd.morphTargets,
						source: mdd,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.nrrd')) {
			const nrrdLoader: I3JS.NRRDLoader = NgxThreeUtil.getLoader('nrrdLoader', N3JS.NRRDLoader);
			nrrdLoader.load(
				key,
				(volume) => {
					const group = new N3JS.Group();
					const geometry = new N3JS.BoxGeometry(volume.xLength, volume.yLength, volume.zLength);
					const material = new N3JS.MeshBasicMaterial({ color: 0x00ff00 });
					const cube = new N3JS.Mesh(geometry, material);
					cube.visible = false;
					cube.name = 'box';
					cube.userData.volume = volume;
					const box = new N3JS.BoxHelper(cube);
					box.name = 'helper';
					box.applyMatrix4(volume.matrix as I3JS.Matrix4);
					group.add(box);
					//z plane
					const rasDimensions = volume.RASDimensions;
					const sliceZ = volume.extractSlice('z', Math.floor(rasDimensions[2] / 4));
					sliceZ.mesh.name = 'z';
					sliceZ.mesh.userData.volumeSlice = sliceZ;
					group.add(sliceZ.mesh);
					//y plane
					const sliceY = volume.extractSlice('y', Math.floor(rasDimensions[1] / 2));
					sliceY.mesh.name = 'y';
					sliceY.mesh.userData.volumeSlice = sliceY;
					group.add(sliceY.mesh);
					//x plane
					const sliceX = volume.extractSlice('x', Math.floor(rasDimensions[0] / 2));
					sliceX.mesh.name = 'x';
					sliceX.mesh.userData.volumeSlice = sliceX;
					group.add(sliceX.mesh);
					callBack({
						object: group,
						source: volume,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.md2')) {
			const optionType = (options.type || '').toLowerCase();
			if (optionType === 'md2character') {
				const character = new N3JS.MD2Character();
				options.baseUrl = NgxThreeUtil.getStoreUrl(options.baseUrl);
				if (NgxThreeUtil.isNull(options.body)) {
					options.body = key;
				}
				character.onLoadComplete = function () {
					callBack({
						object: character.root,
						clips: character,
						source: character,
					});
				};
				character.loadParts(options as any);
			} else if (optionType === 'md2charactercomplex') {
				const character = new N3JS.MD2CharacterComplex();
				options.baseUrl = NgxThreeUtil.getStoreUrl(options.baseUrl);
				if (NgxThreeUtil.isNull(options.body)) {
					options.body = key;
				}
				character.onLoadComplete = function () {
					callBack({
						object: character.root,
						clips: character,
						source: character,
					});
				};
				character.loadParts(options);
			} else {
				const md2Loader: I3JS.MD2Loader = NgxThreeUtil.getLoader('md2Loader', N3JS.MD2Loader);
				this.setLoaderWithOption(md2Loader, options);
				md2Loader.load(
					key,
					(geometry) => {
						callBack({
							geometry: geometry,
							source: geometry,
						});
					},
					this.onProgress,
					this.onError
				);
			}
		} else if (key.endsWith('.pdb')) {
			const pdbLoader: I3JS.PDBLoader = NgxThreeUtil.getLoader('pdbLoader', N3JS.PDBLoader);
			this.setLoaderWithOption(pdbLoader, options);
			pdbLoader.load(
				key,
				(pdb) => {
					const geometryAtoms = pdb.geometryAtoms;
					const geometryBonds = pdb.geometryBonds;
					const json = pdb.json;
					const cssType: string = options.cssType || 'css2d';
					const group = new N3JS.Mesh();
					const boxGeometry = new N3JS.BoxBufferGeometry(1, 1, 1);
					const sphereGeometry = new N3JS.IcosahedronBufferGeometry(1, 3);
					let positions = geometryAtoms.getAttribute('position');
					const colors = geometryAtoms.getAttribute('color');
					const position = new N3JS.Vector3();
					const color = new N3JS.Color();
					const tmpVec = new N3JS.Vector3();
					for (let i = 0; i < positions.count; i++) {
						position.x = positions.getX(i);
						position.y = positions.getY(i);
						position.z = positions.getZ(i);
						color.r = colors.getX(i);
						color.g = colors.getY(i);
						color.b = colors.getZ(i);
						const material = new N3JS.MeshPhongMaterial({
							color: color.clone(),
						});
						const object = new N3JS.Mesh(sphereGeometry, material);
						object.name = 'atom';
						object.position.copy(position);
						object.position.multiplyScalar(75);
						object.scale.multiplyScalar(25);
						group.add(object);
						const atom = json.atoms[i];
						const text = document.createElement('div');
						text.className = 'label';
						text.style.color = 'rgb(' + atom[3][0] + ',' + atom[3][1] + ',' + atom[3][2] + ')';
						text.style.marginTop = '1.5em';
						text.textContent = atom[4];
						let label: I3JS.Object3D = null;
						switch (cssType.toLowerCase()) {
							case '3d':
							case 'css3d':
								label = new N3JS.CSS3DObject(text);
								break;
							default:
								label = new N3JS.CSS2DObject(text);
								break;
						}
						label.name = 'label';
						const labelPostion = object.position.clone();
						labelPostion.y += 13;
						label.position.copy(labelPostion);
						group.add(label);
					}
					positions = geometryBonds.getAttribute('position');
					const start = new N3JS.Vector3();
					const end = new N3JS.Vector3();
					for (let i = 0; i < positions.count; i += 2) {
						start.x = positions.getX(i);
						start.y = positions.getY(i);
						start.z = positions.getZ(i);
						end.x = positions.getX(i + 1);
						end.y = positions.getY(i + 1);
						end.z = positions.getZ(i + 1);
						start.multiplyScalar(75);
						end.multiplyScalar(75);
						const bond = new N3JS.Mesh(boxGeometry, new N3JS.MeshPhongMaterial({ color: 0xffffff }));
						bond.name = 'bone';
						bond.position.copy(start);
						bond.position.lerp(end, 0.5);
						bond.scale.set(5, 5, start.distanceTo(end));
						bond.lookAt(end);
						group.add(bond);
					}
					callBack({ object: group, geometry: null, source: pdb });
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.stl')) {
			const stlLoader: I3JS.STLLoader = NgxThreeUtil.getLoader('stlLoader', N3JS.STLLoader);
			this.setLoaderWithOption(stlLoader, options);
			stlLoader.load(
				key,
				(geometry) => {
					const mesh = new N3JS.Mesh();
					mesh.geometry = geometry;
					mesh.material = new N3JS.MeshLambertMaterial({ color: 0x7777ff });
					callBack({
						object: mesh,
						source: geometry,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.wrl')) {
			const vrmlLoader: I3JS.VRMLLoader = NgxThreeUtil.getLoader('vrmlLoader', N3JS.VRMLLoader);
			this.setLoaderWithOption(vrmlLoader, options);
			vrmlLoader.load(
				key,
				(scene) => {
					callBack({
						object: scene,
						source: scene,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.xyz')) {
			const xyzLoader: I3JS.XYZLoader = NgxThreeUtil.getLoader('xyzLoader', N3JS.XYZLoader);
			this.setLoaderWithOption(xyzLoader, options);
			xyzLoader.load(
				key,
				(geometry) => {
					callBack({
						geometry: geometry,
						source: geometry,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.CUBE') || key.endsWith('.cube')) {
			const lutCubeLoader: I3JS.LUTCubeLoader = NgxThreeUtil.getLoader('lutCubeLoader', N3JS.LUTCubeLoader);
			this.setLoaderWithOption(lutCubeLoader, options);
			lutCubeLoader.load(
				key,
				(result) => {
					callBack({
						texture: result.texture,
						source: result,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.vrm')) {
			const vrmLoader: I3JS.VRMLoader = NgxThreeUtil.getLoader('vrmLoader', N3JS.VRMLoader);
			this.setLoaderWithOption(vrmLoader, options);
			vrmLoader.load(
				key,
				(vrm) => {
					vrm.scene.traverse((object) => {
						if (object instanceof N3JS.Mesh && object.material) {
							if (Array.isArray(object.material)) {
								for (let i = 0, il = object.material.length; i < il; i++) {
									const objectMaterial: any = object.material[i];
									const material = new N3JS.MeshPhongMaterial();
									N3JS.Material.prototype.copy.call(material, object.material[i]);
									material.color.copy(objectMaterial['color']);
									material.map = objectMaterial['map'];
									// material.skinning = objectMaterial['skinning'];
									// material.morphTargets = objectMaterial['morphTargets'];
									// material.morphNormals = objectMaterial['morphNormals'];
									object.material[i] = material;
								}
							} else {
								const objectMaterial: any = object.material;
								const material = new N3JS.MeshPhongMaterial();
								N3JS.Material.prototype.copy.call(material, object.material);
								material.color.copy(objectMaterial['color']);
								material.map = objectMaterial['map'];
								// material.skinning = objectMaterial['skinning'];
								// material.morphTargets = objectMaterial['morphTargets'];
								// material.morphNormals = objectMaterial['morphNormals'];
								object.material = material;
							}
						}
					});
					callBack({
						object: vrm.scene,
						source: vrm,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.png') || key.endsWith('.jpg') || key.endsWith('.jpeg')) {
			const rgbmLoader: I3JS.RGBMLoader = NgxThreeUtil.getLoader('rgbmLoader', N3JS.RGBMLoader);
			this.setLoaderWithOption(rgbmLoader, options);
			rgbmLoader.load(
				key,
				(dataTexture) => {
					callBack({
						texture: dataTexture,
						source: dataTexture,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.tif')) {
			const logLuvLoader: I3JS.LogLuvLoader = NgxThreeUtil.getLoader('logLuvLoader', N3JS.LogLuvLoader);
			this.setLoaderWithOption(logLuvLoader, options);
			logLuvLoader.load(
				key,
				(dataTexture) => {
					callBack({
						texture: dataTexture,
						source: dataTexture,
					});
				},
				this.onProgress,
				this.onError
			);
		} else {
			if (key.endsWith('.js') || key.endsWith('.json')) {
				const isGeometryLoader = options.geometry ? true : false;
				if (!isGeometryLoader) {
					const loaderType = options.loaderType || '';
					switch (loaderType.toLowerCase()) {
						case 'lottie':
							const lottieLoader: I3JS.LottieLoader = NgxThreeUtil.getLoader('lottieLoader', N3JS.LottieLoader);
							if (NgxThreeUtil.isNull(options.quality)) {
								lottieLoader.setQuality(options.quality);
							}
							this.setLoaderWithOption(lottieLoader, options);
							if ((window as any).bodymovin === undefined) {
								console.log(
									'script required in angular.json - projects/{project_name}/architect/build/options/scripts : ["node_modules/ngx3js/assets/js/libs/lottie_canvas.js"]'
								);
							} else {
								lottieLoader.load(
									key,
									(texture: any) => {
										callBack({
											texture: texture,
											source: texture,
										});
									},
									this.onProgress,
									this.onError
								);
							}
							break;
						default:
							const objectLoader: I3JS.ObjectLoader = NgxThreeUtil.getLoader('objectLoader', N3JS.ObjectLoader);
							this.setLoaderWithOption(objectLoader, options);
							objectLoader.load(
								key,
								(result) => {
									callBack({
										object: result,
										source: result,
									});
								},
								this.onProgress,
								this.onError
							);
							break;
					}
				} else {
					const geometryLoader: I3JS.BufferGeometryLoader = NgxThreeUtil.getLoader(
						'geometryLoader',
						N3JS.BufferGeometryLoader
					);
					this.setLoaderWithOption(geometryLoader, options);
					geometryLoader.load(
						key,
						(geometry) => {
							callBack({ geometry: geometry, source: geometry });
						},
						this.onProgress,
						this.onError
					);
				}
			} else {
				const json = this.getItem(key);
				const loadedGeometry = JSON.parse(json);
				if (json) {
					// callBack(this.objectLoader.parse(loadedGeometry));
				} else {
					// callBack(new THREE.Object3D());
				}
			}
		}
	}

	/**
	 * Gets object
	 * @param key
	 * @param callBack
	 * @param [options]
	 */
	public getObject(
		key: string,
		callBack: (
			mesh: I3JS.Object3D,
			clips?: I3JS.AnimationClip[],
			geometry?: I3JS.BufferGeometry,
			morphTargets?: any,
			source?: any
		) => void,
		options?: IStorageOption
	): void {
		this.getObjectFromKey(
			key,
			(result) => {
				if (NgxThreeUtil.isNotNull(result.object) && NgxThreeUtil.isNotNull(options)) {
					if (NgxThreeUtil.isNotNull(options.name)) {
						result.object = result.object.getObjectByName(options.name);
					}
					if (NgxThreeUtil.isNotNull(options.scale)) {
						result.object.scale.setScalar(options.scale);
						result.object.position.multiplyScalar(options.scale);
					}
				}
				callBack(result.object, result.clips, result.geometry, result.morphTargets, result.source);
			},
			options
		);
	}

	/**
	 * Gets geometry
	 * @param key
	 * @param callBack
	 * @param [options]
	 */
	public getGeometry(
		key: string,
		callBack: (mesh: I3JS.BufferGeometry, source?: any) => void,
		options?: IStorageOption
	): void {
		this.getObjectFromKey(
			key,
			(result) => {
				if (result.geometry instanceof N3JS.BufferGeometry) {
					callBack(result.geometry, result.source);
				} else if (result.object instanceof N3JS.Mesh) {
					callBack(result.object.geometry, result.source);
				} else if (result.object.children.length > 0 && result.object.children[0] instanceof N3JS.Mesh) {
					callBack(result.object.children[0]['geometry'], result.source);
				} else {
					callBack(new N3JS.BufferGeometry());
				}
			},
			Object.assign(options || {}, { geometry: true })
		);
	}

	/**
	 * Gets texture
	 * @param key
	 * @param callBack
	 * @param [options]
	 */
	public getTexture(
		key: string,
		callBack: (texture: I3JS.Texture, source?: any) => void,
		options?: IStorageOption
	): void {
		this.getObjectFromKey(
			key,
			(result) => {
				const resultMaterial: any = result.material;
				if (result.texture instanceof N3JS.Texture) {
					callBack(result.texture, result.source);
				} else if (result.material instanceof N3JS.Material && resultMaterial['map'] instanceof N3JS.Texture) {
					callBack(resultMaterial['map'], result.source);
				} else {
					callBack(new N3JS.Texture(), result.source);
				}
			},
			Object.assign(options || {}, { texture: true })
		);
	}

	/**
	 * Gets material
	 * @param key
	 * @param callBack
	 * @param [options]
	 */
	public getMaterial(
		key: string,
		callBack: (material: I3JS.Material, source?: any) => void,
		options?: IStorageOption
	): void {
		this.getObjectFromKey(
			key,
			(result) => {
				if (result.material instanceof N3JS.Material) {
					callBack(result.material, result.source);
				} else if (result.texture instanceof N3JS.Texture) {
					const material = new N3JS.MeshLambertMaterial();
					material.map = result.texture;
					callBack(material, result.source);
				}
			},
			options
		);
	}

	/**
	 * Sets scene
	 * @param key
	 * @param scene
	 */
	public setScene(key: string, scene: I3JS.Scene) {
		this.setItem(key, JSON.stringify(scene.toJSON()));
	}

	/**
	 * Gets scene
	 * @param key
	 * @param callBack
	 * @param [options]
	 */
	public getScene(key: string, callBack: (mesh: I3JS.Scene, source?: any) => void, options?: IStorageOption): void {
		this.getObjectFromKey(
			key,
			(result) => {
				if (result.object instanceof N3JS.Scene) {
					callBack(result.object, result.source);
				} else {
					const scene = new N3JS.Scene();
					scene.add(result.object);
					callBack(scene, result.source);
				}
			},
			options
		);
	}

	/**
	 * Gets font
	 * @param callBack
	 * @param [fontName]
	 * @param [fontWeight]
	 */
	public getFont(callBack: (font: I3JS.Font) => void, fontName: string = 'helvetiker', fontWeight: string = '') {
		let fontPath: string = '';
		if (NgxThreeUtil.isNull(fontWeight) || fontWeight === '') {
			if (
				fontName.indexOf('-') > 0 &&
				!(
					fontName.endsWith('.json') ||
					fontName.endsWith('.ttf') ||
					fontName.startsWith('http://') ||
					fontName.startsWith('https://')
				)
			) {
				[fontName, fontWeight] = fontName.split('-');
			}
		}
		switch (fontName.toLowerCase()) {
			case 'helvetiker':
				switch (fontWeight.toLowerCase()) {
					case 'bold':
						fontPath = 'fonts/helvetiker_bold.typeface.json.zip';
						break;
					case 'regular':
					default:
						fontPath = 'fonts/helvetiker_regular.typeface.json.zip';
						break;
				}
				break;
			case 'gentilis':
				switch (fontWeight.toLowerCase()) {
					case 'bold':
						fontPath = 'fonts/gentilis_bold.typeface.json.zip';
						break;
					case 'regular':
					default:
						fontPath = 'fonts/gentilis_regular.typeface.json.zip';
						break;
				}
				break;
			case 'optimer':
				switch (fontWeight.toLowerCase()) {
					case 'bold':
						fontPath = 'fonts/optimer_bold.typeface.json.zip';
						break;
					case 'regular':
					default:
						fontPath = 'fonts/optimer_regular.typeface.json.zip';
						break;
				}
				break;
			case 'sans':
			case 'droid_sans':
				switch (fontWeight.toLowerCase()) {
					case 'bold':
						fontPath = 'fonts/droid/droid_sans_bold.typeface.json.zip';
						break;
					case 'regular':
					default:
						fontPath = 'fonts/droid/droid_sans_regular.typeface.json.zip';
						break;
				}
				break;
			case 'sans_mono':
			case 'droid_sans_mono':
				fontPath = 'fonts/droid/droid_sans_mono_regular.typeface.json.zip';
				break;
			case 'serif':
			case 'droid_serif':
				switch (fontWeight.toLowerCase()) {
					case 'bold':
						fontPath = 'fonts/droid/droid_serif_bold.typeface.json.zip';
						break;
					case 'regular':
					default:
						fontPath = 'fonts/droid/droid_serif_regular.typeface.json.zip';
						break;
				}
				break;
			case 'materialicons':
			case 'materialicons-regular':
			case 'material-icon':
			case 'icon':
				fontPath = 'fonts/materialicons/materialicons-regular.typeface.json.zip';
				break;
			case 'materialiconsoutlined':
			case 'materialiconsoutlined-regular':
			case 'materialoutlined-icon':
			case 'iconoutlined':
				fontPath = 'fonts/materialicons/materialiconsoutlined-regular.typeface.json.zip';
				break;
			case 'materialiconsround':
			case 'materialiconsround-regular':
			case 'materialround-icon':
			case 'iconround':
				fontPath = 'fonts/materialicons/materialiconsround-regular.typeface.json.zip';
				break;
			case 'materialiconssharp':
			case 'materialiconssharp-regular':
			case 'materialsharp-icon':
			case 'iconsharp':
				fontPath = 'fonts/materialicons/materialiconssharp-regular.typeface.json.zip';
				break;
			default:
				if (
					fontName.startsWith('/') ||
					fontName.startsWith('http://') ||
					fontName.startsWith('https://') ||
					fontName.endsWith('.json') ||
					fontName.endsWith('.ttf')
				) {
					if (fontName.endsWith('.ttf') || fontName.endsWith('.json') || fontName.endsWith('.json.zip')) {
						fontPath = fontName;
					} else {
						fontPath = fontName + '_' + fontWeight + '.typeface.json';
					}
				} else {
					fontPath = 'fonts/helvetiker_regular.typeface.json.zip';
				}
				break;
		}
		if (NgxThreeUtil.isNotNull(this._loadedFonts[fontPath])) {
			window.setTimeout(() => {
				callBack(this._loadedFonts[fontPath]);
			}, 1);
		} else {
			if (fontPath.endsWith('.ttf')) {
				const ttfLoader: I3JS.TTFLoader = NgxThreeUtil.getLoader('ttfLoader', N3JS.TTFLoader);
				ttfLoader.load(NgxThreeUtil.getStoreUrl(fontPath), (json: any) => {
					this._loadedFonts[fontPath] = new N3JS.Font(json);
					callBack(this._loadedFonts[fontPath]);
				});
			} else if (fontPath.endsWith('.json.zip')) {
				const fontLoader: I3JS.FontLoader = NgxThreeUtil.getLoader('fontZipLoader', N3JS.FontZipLoader);
				fontLoader.load(NgxThreeUtil.getStoreUrl(fontPath), (responseFont) => {
					this._loadedFonts[fontPath] = responseFont;
					callBack(this._loadedFonts[fontPath]);
				});
			} else {
				const fontLoader: I3JS.FontLoader = NgxThreeUtil.getLoader('fontLoader', N3JS.FontLoader);
				fontLoader.load(NgxThreeUtil.getStoreUrl(fontPath), (responseFont) => {
					this._loadedFonts[fontPath] = responseFont;
					callBack(this._loadedFonts[fontPath]);
				});
			}
		}
	}

	/**
	 * Loaded fonts of local storage service
	 */
	private _loadedFonts: {
		[key: string]: I3JS.Font;
	} = {};

	/**
	 * Removes item
	 * @param key
	 */
	public removeItem(key: string) {
		localStorage.removeItem(key);
	}

	/**
	 * Clears local storage service
	 */
	public clear() {
		localStorage.clear();
	}
}
