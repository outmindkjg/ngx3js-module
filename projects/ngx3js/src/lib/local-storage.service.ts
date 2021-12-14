import { Injectable } from '@angular/core';
import {
	LoadedNameMap,
	LoadedObject,
	StorageExportOption,
	StorageOption,
	I3JS,
	N3JS,
	ThreeUtil,
} from './interface';

/**
 * Local Storage Service
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/LocalStorageService) page for details.
 *
 */
@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
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
	public setObject(key: string, mesh: I3JS.IObject3D) {
		this.setItem(key, JSON.stringify(mesh.toJSON()));
	}

	/**
	 * Object loader of local storage service
	 */
	private objectLoader: I3JS.IObjectLoader = null;

	/**
	 * Geometry loader of local storage service
	 */
	private geometryLoader: I3JS.IBufferGeometryLoader = null;

	/**
	 * Obj loader of local storage service
	 */
	private objLoader: I3JS.IOBJLoader = null;

	/**
	 * Collada loader of local storage service
	 */
	private colladaLoader: I3JS.IColladaLoader = null;

	/**
	 * Stl loader of local storage service
	 */
	private stlLoader: I3JS.ISTLLoader = null;

	/**
	 * Vtk loader of local storage service
	 */
	private vtkLoader: I3JS.IVTKLoader = null;

	/**
	 * Pdb loader of local storage service
	 */
	private pdbLoader: I3JS.IPDBLoader = null;

	/**
	 * Ply loader of local storage service
	 */
	private plyLoader: I3JS.IPLYLoader = null;

	/**
	 * Rhino3dm loader of local storage service
	 */
	private rhino3dmLoader: I3JS.IRhino3dmLoader = null;

	/**
	 * Basis texture loader of local storage service
	 */
	private basisTextureLoader: I3JS.IBasisTextureLoader = null;

	/**
	 * Draco loader of local storage service
	 */
	private dracoLoader: I3JS.IDRACOLoader = null;

	/**
	 * Gltf loader of local storage service
	 */
	private gltfLoader: I3JS.IGLTFLoader = null;

	/**
	 * Mmd loader of local storage service
	 */
	private mmdLoader: I3JS.IMMDLoader = null;

	/**
	 * Mtl loader of local storage service
	 */
	private mtlLoader: I3JS.IMTLLoader = null;

	/**
	 * Pcd loader of local storage service
	 */
	private pcdLoader: I3JS.IPCDLoader = null;

	/**
	 * Prwm loader of local storage service
	 */
	private prwmLoader: I3JS.IPRWMLoader = null;

	/**
	 * Svg loader of local storage service
	 */
	private svgLoader: I3JS.ISVGLoader = null;

	/**
	 * Tga loader of local storage service
	 */
	private tgaLoader: I3JS.ITGALoader = null;

	/**
	 * Md2 loader of local storage service
	 */
	private md2Loader: I3JS.IMD2Loader = null;

	/**
	 * Amf loader of local storage service
	 */
	private amfLoader: I3JS.IAMFLoader = null;

	/**
	 * Bvh loader of local storage service
	 */
	private bvhLoader: I3JS.IBVHLoader = null;

	/**
	 * Dds loader of local storage service
	 */
	private ddsLoader: I3JS.IDDSLoader = null;

	/**
	 * Exr loader of local storage service
	 */
	private exrLoader: I3JS.IEXRLoader = null;

	/**
	 * Fbx loader of local storage service
	 */
	private fbxLoader: I3JS.IFBXLoader = null;

	/**
	 * G code loader of local storage service
	 */
	private gCodeLoader: I3JS.IGCodeLoader = null;

	/**
	 * Hdr cube texture loader of local storage service
	 */
	private hdrCubeTextureLoader: I3JS.IHDRCubeTextureLoader = null;

	/**
	 * Kmz loader of local storage service
	 */
	private kmzLoader: I3JS.IKMZLoader = null;

	/**
	 * Ktx2 loader of local storage service
	 */
	private ktx2Loader: I3JS.IKTX2Loader = null;

	/**
	 * Ktx loader of local storage service
	 */
	private ktxLoader: I3JS.IKTXLoader = null;

	/**
	 * Determines whether draw loader l
	 */
	private lDrawLoader: I3JS.ILDrawLoader = null;

	/**
	 * Lottie loader of local storage service
	 */
	private lottieLoader: I3JS.ILottieLoader = null;

	/**
	 * Lut3dl loader of local storage service
	 */
	private lut3dlLoader: I3JS.ILUT3dlLoader = null;

	/**
	 * Lut cube loader of local storage service
	 */
	private lutCubeLoader: I3JS.ILUTCubeLoader = null;

	/**
	 * Ifc loader of local storage service
	 */
	private ifcLoader: I3JS.IIFCLoader = null;

	/**
	 * Vox loader of local storage service
	 */
	private voxLoader: I3JS.IVOXLoader = null;

	/**
	 * The Chunk of local storage service
	 */
	private _chunk: I3JS.IChunk = null;

	/**
	 * Lwo loader of local storage service
	 */
	private lwoLoader: I3JS.ILWOLoader = null;

	/**
	 * Mdd loader of local storage service
	 */
	private mddLoader: I3JS.IMDDLoader = null;

	/**
	 * Nrrd loader of local storage service
	 */
	private nrrdLoader: I3JS.INRRDLoader = null;

	/**
	 * Pvr loader of local storage service
	 */
	private pvrLoader: I3JS.IPVRLoader = null;

	/**
	 * Rgbe loader of local storage service
	 */
	private rgbeLoader: I3JS.IRGBELoader = null;

	/**
	 * Tds loader of local storage service
	 */
	private tdsLoader: I3JS.ITDSLoader = null;

	/**
	 * Tilt loader of local storage service
	 */
	private tiltLoader: I3JS.ITiltLoader = null;

	/**
	 * Rgbm loader of local storage service
	 */
	private rgbmLoader: I3JS.IRGBMLoader = null;

	/**
	 * Ttf loader of local storage service
	 */
	private ttfLoader: I3JS.ITTFLoader = null;

	/**
	 * Vrml loader of local storage service
	 */
	private vrmlLoader: I3JS.IVRMLLoader = null;

	/**
	 * Vrm loader of local storage service
	 */
	private vrmLoader: I3JS.IVRMLoader = null;

	/**
	 * Xyz loader of local storage service
	 */
	private xyzLoader: I3JS.IXYZLoader = null;

	/**
	 * Three mfloader of local storage service
	 */
	private threeMFLoader: I3JS.IThreeMFLoader = null;

	/**
	 * Gets store url list
	 * @param url
	 * @returns
	 */
	private getStoreUrlList(url: string | string[]) {
		if (typeof url === 'string') {
			return ThreeUtil.getStoreUrl(url);
		} else {
			const modUrl: any[] = [];
			url.forEach((path) => {
				modUrl.push(ThreeUtil.getStoreUrl(path));
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
	private getStoreObject(
		object: I3JS.IObject3D,
		options: any = null
	): I3JS.IObject3D {
		if (
			object !== null &&
			options !== null &&
			options.onLoad !== null &&
			typeof options.onLoad === 'function'
		) {
			const result = options.onLoad(object);
			if (result !== null && result instanceof N3JS.Object3D) {
				return result;
			}
		}
		return object;
	}

	/**
	 * Collada exporter of local storage service
	 */
	private colladaExporter: I3JS.IColladaExporter = null;

	/**
	 * Obj exporter of local storage service
	 */
	private objExporter: I3JS.IOBJExporter = null;

	/**
	 * Draco exporter of local storage service
	 */
	private dracoExporter: I3JS.IDRACOExporter = null;

	/**
	 * Gltf exporter of local storage service
	 */
	private gltfExporter: I3JS.IGLTFExporter = null;

	/**
	 * Mmd exporter of local storage service
	 */
	private mmdExporter: I3JS.IMMDExporter = null;

	/**
	 * Ply exporter of local storage service
	 */
	private plyExporter: I3JS.IPLYExporter = null;

	/**
	 * Usdz exporter of local storage service
	 */
	private usdzExporter: I3JS.IUSDZExporter = null;

	/**
	 * Stl exporter of local storage service
	 */
	private stlExporter: I3JS.ISTLExporter = null;

	/**
	 * Gets export object
	 * @param fileName
	 * @param object
	 * @param [options]
	 */
	public getExportObject(
		fileName: string,
		object: I3JS.IObject3D | I3JS.IObject3D[],
		options?: StorageExportOption
	) {
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
			if (object instanceof N3JS.Mesh || object instanceof N3JS.Points) {
				const result = this.dracoExporter.parse(object as any, {});
				this.saveArrayBuffer(result, fileName);
			}
		} else if (fileName.endsWith('.usdz')) {
			if (this.usdzExporter === null) {
				this.usdzExporter = new N3JS.USDZExporter();
			}
			if (object instanceof N3JS.Object3D) {
				this.usdzExporter.parse(object as any).then((result) => {
					this.saveArrayBuffer(result, fileName);
				});
			}
		} else if (fileName.endsWith('.gltf') || fileName.endsWith('.glb')) {
			if (this.gltfExporter === null) {
				this.gltfExporter = new N3JS.GLTFExporter();
			}
			const fileNameOnly = fileName.substr(0, fileName.lastIndexOf('.'));
			this.gltfExporter.parse(
				object as any,
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
			const result = this.objExporter.parse(object as any);
			this.saveString(result, fileName);
		} else if (fileName.endsWith('.ply')) {
			if (this.plyExporter === null) {
				this.plyExporter = new N3JS.PLYExporter();
			}
			this.plyExporter.parse(
				object as any,
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
			const result: any = this.stlExporter.parse(object as any, options);
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
			const result: any = this.mmdExporter.parseVpd(
				object as any,
				false,
				false
			);
			if (result instanceof ArrayBuffer) {
				this.saveArrayBuffer(result, fileName);
			} else {
				this.saveString(result, fileName);
			}
		} else if (fileName.endsWith('.usdz')) {
			if (this.usdzExporter === null) {
				this.usdzExporter = new N3JS.USDZExporter();
			}
			const result: any = this.usdzExporter.parse(object as any);
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
		this.save(
			new Blob([buffer], { type: 'application/octet-stream' }),
			filename
		);
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
	private _loadedObject: { [key: string]: LoadedObject } = {};

	/**
	 * Gets object name map
	 * @param object
	 * @param nameMap
	 * @returns
	 */
	private getNameMap(
		object: I3JS.IObject3D,
		nameMap: LoadedNameMap
	): LoadedNameMap {
		const name = object.name || 'name';
		const map: LoadedNameMap = {};
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
	private getObjectFromKey(
		key: string,
		callBack: (mesh: LoadedObject) => void,
		options: StorageOption
	): void {
		options = options || {};
		let safeKey = '';
		if (ThreeUtil.isNotNull(options.path)) {
			safeKey = key.substr(key.lastIndexOf('/') + 1);
		} else {
			safeKey = ThreeUtil.getStoreUrl(key);
		}
		if (this._loadedObject[safeKey] !== undefined) {
			const result = this._loadedObject[safeKey];
			setTimeout(() => {
				let cloneObject3d: I3JS.IObject3D = null;
				if (ThreeUtil.isNotNull(result.object)) {
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
					material: ThreeUtil.isNotNull(result.material)
						? result.material
						: null,
					geometry: ThreeUtil.isNotNull(result.geometry)
						? result.geometry.clone()
						: null,
					texture: ThreeUtil.isNotNull(result.texture)
						? result.texture.clone()
						: null,
					clips: result.clips,
					morphTargets: result.morphTargets,
					source: result.source,
				});
			}, 10);
		} else {
			this._getObjectFromKey(
				safeKey,
				(result: LoadedObject) => {
					if (result.object && options.debugName) {
						console.log(this.getNameMap(result.object, {}));
					}
					if (result.source && options.debug) {
						console.log(result.source);
					}
					let cloneObject3d: I3JS.IObject3D = null;
					if (ThreeUtil.isNotNull(result.object)) {
						cloneObject3d = result.object;
						if (options.firstMesh) {
							let foundMesh: I3JS.IObject3D = null;
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
	public setLoaderWithOption(loader: I3JS.ILoader, options: StorageOption) {
		if (ThreeUtil.isNotNull(options)) {
			if (ThreeUtil.isNotNull(loader.setResourcePath)) {
				if (ThreeUtil.isNotNull(options.resourcePath)) {
					loader.setResourcePath(ThreeUtil.getStoreUrl(options.resourcePath));
				}
			}
			if (ThreeUtil.isNotNull(loader.setPath)) {
				if (ThreeUtil.isNotNull(options.path)) {
					loader.setPath(ThreeUtil.getStoreUrl(options.path));
				} else {
					loader.setPath('');
				}
			}
			const loaderAny: any = loader;
			if (ThreeUtil.isNotNull(loaderAny['setDataType'])) {
				if (ThreeUtil.isNotNull(options.dataType)) {
					loaderAny['setDataType'](
						ThreeUtil.getTextureDataTypeSafe(options.dataType)
					);
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
	private _getObjectFromKey(
		key: string,
		callBack: (mesh: LoadedObject) => void,
		options: StorageOption
	): void {
		if (key.endsWith('.dae')) {
			if (this.colladaLoader === null) {
				this.colladaLoader = new N3JS.ColladaLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.colladaLoader as any, options);
			this.colladaLoader.load(key, (result) => {
				callBack({
					object: result.scene as any,
					clips: result.scene.animations,
					source: result,
				});
			});
		} else if (key.endsWith('.obj')) {
			if (this.objLoader === null) {
				this.objLoader = new N3JS.OBJLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.objLoader as any, options);
			const materialUrl: string = options.material ? options.material : null;
			if (materialUrl !== null && materialUrl.length > 0) {
				this.getObjectFromKey(
					materialUrl,
					(result) => {
						if (result.material !== null && result.material !== undefined) {
							this.objLoader.setMaterials(result.material);
						}
						this.objLoader.load(
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
				this.objLoader.setMaterials(null);
				this.objLoader.load(
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
			if (this.mtlLoader === null) {
				this.mtlLoader = new N3JS.MTLLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.mtlLoader as any, options);
			this.mtlLoader.load(
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
			if (this.tdsLoader === null) {
				this.tdsLoader = new N3JS.TDSLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.tdsLoader as any, options);
			this.tdsLoader.load(
				key,
				(object) => {
					callBack({
						object: object as any,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.tilt')) {
			if (this.tiltLoader === null) {
				this.tiltLoader = new N3JS.TiltLoader(
					ThreeUtil.getLoadingManager(),
					ThreeUtil.getStoreUrl('')
				);
			}
			this.setLoaderWithOption(this.tiltLoader as any, options);
			this.tiltLoader.load(
				key,
				(object) => {
					callBack({
						object: object as any,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.amf')) {
			if (this.amfLoader === null) {
				this.amfLoader = new N3JS.AMFLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.amfLoader as any, options);
			this.amfLoader.load(
				key,
				(object) => {
					callBack({
						object: object as any,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.vox')) {
			if (this.voxLoader === null) {
				this.voxLoader = new N3JS.VOXLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.voxLoader as any, options);
			this.voxLoader.load(
				key,
				(chunks) => {
					const object3d = new N3JS.Group();
					chunks.forEach((chunk) => {
						object3d.add(new N3JS.VOXMesh(chunk) as any);
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
			if (this.exrLoader === null) {
				this.exrLoader = new N3JS.EXRLoader(ThreeUtil.getLoadingManager());
				this.exrLoader.setDataType(N3JS.UnsignedByteType);
			}
			this.setLoaderWithOption(this.exrLoader as any, options);
			this.exrLoader.load(
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
			if (this.pvrLoader === null) {
				this.pvrLoader = new N3JS.PVRLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.pvrLoader as any, options);
			this.pvrLoader.load(
				key,
				(texture) => {
					callBack({
						texture: texture as any,
						source: texture,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.hdr')) {
			if (this.rgbeLoader === null) {
				this.rgbeLoader = new N3JS.RGBELoader(ThreeUtil.getLoadingManager());
				this.rgbeLoader.setDataType(N3JS.UnsignedByteType);
			}
			this.setLoaderWithOption(this.rgbeLoader as any, options);
			this.rgbeLoader.load(
				key,
				(dataTexture) => {
					callBack({
						texture: dataTexture as any,
						source: dataTexture,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.ktx')) {
			if (this.ktxLoader === null) {
				this.ktxLoader = new N3JS.KTXLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.ktxLoader as any, options);
			this.ktxLoader.load(
				key,
				(texture) => {
					callBack({
						texture: texture as any,
						source: texture,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.ifc')) {
			if (this.ifcLoader === null) {
				this.ifcLoader = new N3JS.IFCLoader(ThreeUtil.getLoadingManager());
				this.ifcLoader.ifcManager.setWasmPath(
					ThreeUtil.getStoreUrl('jsm/loaders/ifc/')
				);
			}
			this.setLoaderWithOption(this.ifcLoader as any, options);
			this.ifcLoader.load(
				key,
				(ifc) => {
					callBack({
						object: ifc as any,
						source: ifc,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.ktx2')) {
			if (this.ktx2Loader === null) {
				this.ktx2Loader = new N3JS.KTX2Loader(ThreeUtil.getLoadingManager());
				this.ktx2Loader.setTranscoderPath(
					ThreeUtil.getStoreUrl('js/libs/basis/')
				);
				this.ktx2Loader.detectSupport(ThreeUtil.getRenderer() as any);
			}
			this.setLoaderWithOption(this.ktx2Loader as any, options);
			try {
				this.ktx2Loader.loadAsync(key, this.onProgress).then((texture) => {
					callBack({
						texture: texture as any,
						source: texture,
					});
				});
			} catch (ex) {
				this.onError(ex);
			}
		} else if (key.endsWith('.dds')) {
			if (this.ddsLoader === null) {
				this.ddsLoader = new N3JS.DDSLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.ddsLoader as any, options);
			this.ddsLoader.load(
				key,
				(texture) => {
					callBack({
						texture: texture as any,
						source: texture,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.bvh')) {
			if (this.bvhLoader === null) {
				this.bvhLoader = new N3JS.BVHLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.bvhLoader as any, options);
			this.bvhLoader.load(
				key,
				(object: any) => {
					if (
						object.skeleton &&
						object.skeleton.bones &&
						object.skeleton.bones.length > 0
					) {
						const skeletonHelper: any = new N3JS.SkeletonHelper(
							object.skeleton.bones[0]
						);
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
			if (this.fbxLoader === null) {
				this.fbxLoader = new N3JS.FBXLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.fbxLoader as any, options);
			this.fbxLoader.load(
				key,
				(object) => {
					callBack({
						object: object as any,
						clips: object.animations,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.kmz')) {
			if (this.kmzLoader === null) {
				this.kmzLoader = new N3JS.KMZLoader(ThreeUtil.getLoadingManager());
			}
			if (options.resourcePath) {
				this.kmzLoader.setResourcePath(
					ThreeUtil.getStoreUrl(options.resourcePath)
				);
			}
			this.kmzLoader.load(
				key,
				(object) => {
					callBack({
						object: object.scene as any,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.lwo')) {
			if (this.lwoLoader === null) {
				this.lwoLoader = new N3JS.LWOLoader(ThreeUtil.getLoadingManager());
			}
			if (options.resourcePath) {
				this.lwoLoader.setResourcePath(
					ThreeUtil.getStoreUrl(options.resourcePath)
				);
			}
			this.lwoLoader.load(
				key,
				(object) => {
					const mesh = new N3JS.Group();
					object.meshes.forEach((obj) => {
						mesh.add(obj as any);
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
			if (this.lDrawLoader === null) {
				this.lDrawLoader = new N3JS.LDrawLoader(ThreeUtil.getLoadingManager());
			}
			if (options.resourcePath) {
				this.lDrawLoader.setResourcePath(
					ThreeUtil.getStoreUrl(options.resourcePath)
				);
			}
			this.lDrawLoader.load(
				key,
				(object) => {
					callBack({
						object: object as any,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.gcode')) {
			if (this.gCodeLoader === null) {
				this.gCodeLoader = new N3JS.GCodeLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.gCodeLoader as any, options);
			this.gCodeLoader.load(
				key,
				(object) => {
					callBack({
						object: object as any,
						clips: object.animations,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.3mf')) {
			if (this.threeMFLoader === null) {
				this.threeMFLoader = new N3JS.ThreeMFLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.threeMFLoader as any, options);
			this.threeMFLoader.load(
				key,
				(object) => {
					callBack({
						object: object as any,
						source: object,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.3dm')) {
			if (this.rhino3dmLoader === null) {
				this.rhino3dmLoader = new N3JS.Rhino3dmLoader(ThreeUtil.getLoadingManager());
				this.rhino3dmLoader.setLibraryPath(
					ThreeUtil.getStoreUrl('jsm/libs/rhino3dm/')
				);
			}
			this.setLoaderWithOption(this.rhino3dmLoader as any, options);
			this.rhino3dmLoader.load(key, (result) => {
				callBack({
					object: result as any,
					clips: result.animations,
					source: result,
				});
			});
		} else if (key.endsWith('.basis')) {
			if (this.basisTextureLoader === null) {
				this.basisTextureLoader = new N3JS.BasisTextureLoader(
					ThreeUtil.getLoadingManager()
				);
				this.basisTextureLoader.setTranscoderPath(
					ThreeUtil.getStoreUrl('js/libs/basis/')
				);
				this.basisTextureLoader.detectSupport(new N3JS.WebGLRenderer() as any);
			}
			this.setLoaderWithOption(this.basisTextureLoader as any, options);
			this.basisTextureLoader.load(
				key,
				(texture) => {
					callBack({
						texture: texture as any,
						source: texture,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.drc')) {
			if (this.dracoLoader === null) {
				this.dracoLoader = new N3JS.DRACOLoader(ThreeUtil.getLoadingManager());
				this.dracoLoader.setDecoderPath(
					ThreeUtil.getStoreUrl('js/libs/draco/')
				);
				this.dracoLoader.setDecoderConfig({ type: 'js' });
			}
			this.setLoaderWithOption(this.dracoLoader as any, options);
			this.dracoLoader.load(
				key,
				(geometry) => {
					callBack({
						geometry: geometry as any,
						source: geometry,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.gltf') || key.endsWith('.glb')) {
			if (this.gltfLoader === null) {
				this.gltfLoader = new N3JS.GLTFLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.gltfLoader as any, options);
			if (options) {
				if (options.useDraco) {
					if (this.dracoLoader === null) {
						this.dracoLoader = new N3JS.DRACOLoader(ThreeUtil.getLoadingManager());
						this.dracoLoader.setDecoderPath(
							ThreeUtil.getStoreUrl('js/libs/draco/')
						);
					}
					this.gltfLoader.setDRACOLoader(this.dracoLoader);
				}
				if (options.useKtx2) {
					if (this.ktx2Loader === null) {
						this.ktx2Loader = new N3JS.KTX2Loader(ThreeUtil.getLoadingManager());
						this.ktx2Loader.setTranscoderPath(
							ThreeUtil.getStoreUrl('js/libs/basis/')
						);
						this.ktx2Loader.detectSupport(ThreeUtil.getRenderer() as any);
					}
					this.gltfLoader.setKTX2Loader(this.ktx2Loader);
					this.gltfLoader.setMeshoptDecoder(N3JS.MeshoptDecoder);
				}
			}
			this.gltfLoader.load(
				key,
				(result) => {
					callBack({
						object: this.getStoreObject(result.scene as any, options),
						clips: result.animations,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (
			key.endsWith('.pmd') ||
			key.endsWith('.pmx') ||
			key.endsWith('.vmd') ||
			key.endsWith('.vpd')
		) {
			if (this.mmdLoader === null) {
				this.mmdLoader = new N3JS.MMDLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.mmdLoader as any, options);
			const vmdUrl = options && options.vmdUrl ? options.vmdUrl : null;
			if (vmdUrl !== null) {
				this.mmdLoader.loadWithAnimation(
					key,
					this.getStoreUrlList(vmdUrl),
					(result) => {
						callBack({
							object: this.getStoreObject(result.mesh as any, options),
							clips: result.animation ? [result.animation] : null,
						});
					},
					this.onProgress,
					this.onError
				);
			} else if (key.endsWith('.vmd')) {
				const object: I3JS.ISkinnedMesh | I3JS.ICamera = options.object;
				this.mmdLoader.loadAnimation(
					key,
					object as any,
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
				this.mmdLoader.load(
					key,
					(result) => {
						callBack({
							object: this.getStoreObject(result as any, options),
						});
					},
					this.onProgress,
					this.onError
				);
			}
		} else if (key.endsWith('.pcd')) {
			if (this.pcdLoader === null) {
				this.pcdLoader = new N3JS.PCDLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.pcdLoader as any, options);
			this.pcdLoader.load(
				key,
				(points) => {
					callBack({
						object: points as any,
						source: points,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.prwm')) {
			if (this.prwmLoader === null) {
				this.prwmLoader = new N3JS.PRWMLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.prwmLoader as any, options);
			this.prwmLoader.load(
				key,
				(geometry) => {
					callBack({
						geometry: geometry as any,
						source: geometry,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.tga')) {
			if (this.tgaLoader === null) {
				this.tgaLoader = new N3JS.TGALoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.tgaLoader as any, options);
			this.tgaLoader.load(key, (texture) => {
				callBack({
					texture: texture as any,
					source: texture,
				});
			});
		} else if (key.endsWith('.svg')) {
			if (this.svgLoader === null) {
				this.svgLoader = new N3JS.SVGLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.svgLoader as any, options);
			this.svgLoader.load(
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
						if (
							drawFillShapes &&
							fillColor !== undefined &&
							fillColor !== 'none'
						) {
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
								const geometry = new N3JS.ShapeGeometry(shape as any);
								const mesh = new N3JS.Mesh(geometry, material);
								group.add(mesh);
							});
						}
						const strokeColor = path.userData.style.stroke;
						if (
							drawStrokes &&
							strokeColor !== undefined &&
							strokeColor !== 'none'
						) {
							const material = new N3JS.MeshBasicMaterial({
								color: new N3JS.Color().setStyle(strokeColor),
								opacity: path.userData.style.strokeOpacity,
								transparent: path.userData.style.strokeOpacity < 1,
								side: N3JS.DoubleSide,
								depthWrite: false,
								wireframe: strokesWireframe,
							});
							path.subPaths.forEach((subPath) => {
								const geometry = N3JS.SVGLoader.pointsToStroke(
									subPath.getPoints(),
									path.userData.style
								);
								if (geometry) {
									const mesh = new N3JS.Mesh(geometry as any, material);
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
			if (this.plyLoader === null) {
				this.plyLoader = new N3JS.PLYLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.plyLoader as any, options);
			this.plyLoader.load(
				key,
				(geometry) => {
					callBack({
						geometry: geometry as any,
						source: geometry,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.vtk') || key.endsWith('.vtp')) {
			if (this.vtkLoader === null) {
				this.vtkLoader = new N3JS.VTKLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.vtkLoader as any, options);
			this.vtkLoader.load(
				key,
				(geometry) => {
					callBack({
						geometry: geometry as any,
						source: geometry,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.mdd')) {
			if (this.mddLoader === null) {
				this.mddLoader = new N3JS.MDDLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.mddLoader as any, options);
			this.mddLoader.load(
				key,
				(mdd) => {
					callBack({
						clips: [mdd.clip],
						morphTargets: mdd.morphTargets as any,
						source: mdd,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.nrrd')) {
			if (this.nrrdLoader === null) {
				this.nrrdLoader = new N3JS.NRRDLoader(ThreeUtil.getLoadingManager());
			}
			this.nrrdLoader.load(
				key,
				(volume) => {
					const group = new N3JS.Group();
					const geometry = new N3JS.BoxGeometry(
						volume.xLength,
						volume.yLength,
						volume.zLength
					);
					const material = new N3JS.MeshBasicMaterial({ color: 0x00ff00 });
					const cube = new N3JS.Mesh(geometry, material);
					cube.visible = false;
					cube.name = 'box';
					cube.userData.volume = volume;
					const box = new N3JS.BoxHelper(cube as any);
					box.name = 'helper';
					box.applyMatrix4(volume.matrix as any);
					group.add(box);
					//z plane
					const rasDimensions = (volume as any).RASDimensions;
					const sliceZ = volume.extractSlice(
						'z',
						Math.floor(rasDimensions[2] / 4)
					);
					sliceZ.mesh.name = 'z';
					sliceZ.mesh.userData.volumeSlice = sliceZ;
					group.add(sliceZ.mesh as any);
					//y plane
					const sliceY = volume.extractSlice(
						'y',
						Math.floor(rasDimensions[1] / 2)
					);
					sliceY.mesh.name = 'y';
					sliceY.mesh.userData.volumeSlice = sliceY;
					group.add(sliceY.mesh as any);
					//x plane
					const sliceX = volume.extractSlice(
						'x',
						Math.floor(rasDimensions[0] / 2)
					);
					sliceX.mesh.name = 'x';
					sliceX.mesh.userData.volumeSlice = sliceX;
					group.add(sliceX.mesh as any);
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
				options.baseUrl = ThreeUtil.getStoreUrl(options.baseUrl);
				if (ThreeUtil.isNull(options.body)) {
					options.body = key;
				}
				character.onLoadComplete = function () {
					callBack({
						object: character.root as any,
						clips: character,
						source: character,
					});
				};
				character.loadParts(options as any);
			} else if (optionType === 'md2charactercomplex') {
				const character = new N3JS.MD2CharacterComplex();
				options.baseUrl = ThreeUtil.getStoreUrl(options.baseUrl);
				if (ThreeUtil.isNull(options.body)) {
					options.body = key;
				}
				character.onLoadComplete = function () {
					callBack({
						object: character.root as any,
						clips: character,
						source: character,
					});
				};
				character.loadParts(options);
			} else {
				if (this.md2Loader === null) {
					this.md2Loader = new N3JS.MD2Loader(ThreeUtil.getLoadingManager());
				}
				this.md2Loader.load(
					key,
					(geometry) => {
						callBack({
							geometry: geometry as any,
							source: geometry,
						});
					},
					this.onProgress,
					this.onError
				);
			}
		} else if (key.endsWith('.pdb')) {
			if (this.pdbLoader === null) {
				this.pdbLoader = new N3JS.PDBLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.pdbLoader as any, options);
			this.pdbLoader.load(
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
						text.style.color =
							'rgb(' + atom[3][0] + ',' + atom[3][1] + ',' + atom[3][2] + ')';
						text.style.marginTop = '1.5em';
						text.textContent = atom[4];
						let label: I3JS.IObject3D = null;
						switch (cssType.toLowerCase()) {
							case '3d':
							case 'css3d':
								label = new N3JS.CSS3DObject(text) as any;
								break;
							default:
								label = new N3JS.CSS2DObject(text) as any;
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
						const bond = new N3JS.Mesh(
							boxGeometry,
							new N3JS.MeshPhongMaterial({ color: 0xffffff })
						);
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
			if (this.stlLoader === null) {
				this.stlLoader = new N3JS.STLLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.stlLoader as any, options);
			this.stlLoader.load(
				key,
				(geometry) => {
					const mesh = new N3JS.Mesh();
					mesh.geometry = geometry as any;
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
			if (this.vrmlLoader === null) {
				this.vrmlLoader = new N3JS.VRMLLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.vrmlLoader as any, options);
			this.vrmlLoader.load(
				key,
				(scene) => {
					callBack({
						object: scene as any,
						source: scene,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.xyz')) {
			if (this.xyzLoader === null) {
				this.xyzLoader = new N3JS.XYZLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.xyzLoader as any, options);
			this.xyzLoader.load(
				key,
				(geometry) => {
					callBack({
						geometry: geometry as any,
						source: geometry,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.CUBE') || key.endsWith('.cube')) {
			if (this.lutCubeLoader === null) {
				this.lutCubeLoader = new N3JS.LUTCubeLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.lutCubeLoader as any, options);
			this.lutCubeLoader.load(
				key,
				(result) => {
					callBack({
						texture: result.texture as any,
						source: result,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (key.endsWith('.vrm')) {
			if (this.vrmLoader === null) {
				this.vrmLoader = new N3JS.VRMLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.vrmLoader as any, options);
			this.vrmLoader.load(
				key,
				(vrm) => {
					vrm.scene.traverse((object) => {
						if (object instanceof N3JS.Mesh && object.material) {
							if (Array.isArray(object.material)) {
								for (let i = 0, il = object.material.length; i < il; i++) {
									const objectMaterial = object.material[i] as any;
									const material = new N3JS.MeshPhongMaterial();
									N3JS.Material.prototype.copy.call(
										material,
										object.material[i]
									);
									material.color.copy(objectMaterial['color']);
									material.map = objectMaterial['map'];
									// material.skinning = objectMaterial['skinning'];
									// material.morphTargets = objectMaterial['morphTargets'];
									// material.morphNormals = objectMaterial['morphNormals'];
									object.material[i] = material;
								}
							} else {
								const objectMaterial = object.material as any;
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
						object: vrm.scene as any,
						source: vrm,
					});
				},
				this.onProgress,
				this.onError
			);
		} else if (
			key.endsWith('.png') ||
			key.endsWith('.jpg') ||
			key.endsWith('.jpeg')
		) {
			if (this.rgbmLoader === null) {
				this.rgbmLoader = new N3JS.RGBMLoader(ThreeUtil.getLoadingManager());
			}
			this.setLoaderWithOption(this.rgbmLoader as any, options);
			this.rgbmLoader.load(
				key,
				(dataTexture) => {
					callBack({
						texture: dataTexture as any,
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
							if (this.lottieLoader === null) {
								this.lottieLoader = new N3JS.LottieLoader(
									ThreeUtil.getLoadingManager()
								);
							}
							if (ThreeUtil.isNull(options.quality)) {
								this.lottieLoader.setQuality(options.quality);
							}
							this.setLoaderWithOption(this.lottieLoader as any, options);
							if ((window as any).bodymovin === undefined) {
								console.log(
									'script required in angular.json - projects/{project_name}/architect/build/options/scripts : ["node_modules/ngx3js/assets/js/libs/lottie_canvas.js"]'
								);
							} else {
								this.lottieLoader.load(
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
							if (this.objectLoader === null) {
								this.objectLoader = new N3JS.ObjectLoader(
									ThreeUtil.getLoadingManager()
								);
							}
							this.setLoaderWithOption(this.objectLoader, options);
							this.objectLoader.load(
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
					if (this.geometryLoader === null) {
						this.geometryLoader = new N3JS.BufferGeometryLoader(
							ThreeUtil.getLoadingManager()
						);
					}
					this.setLoaderWithOption(this.geometryLoader, options);
					this.geometryLoader.load(
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
			mesh: I3JS.IObject3D,
			clips?: I3JS.IAnimationClip[],
			geometry?: I3JS.IBufferGeometry,
			morphTargets?: any,
			source?: any
		) => void,
		options?: StorageOption
	): void {
		this.getObjectFromKey(
			key,
			(result) => {
				if (
					ThreeUtil.isNotNull(result.object) &&
					ThreeUtil.isNotNull(options)
				) {
					if (ThreeUtil.isNotNull(options.name)) {
						result.object = result.object.getObjectByName(options.name);
					}
					if (ThreeUtil.isNotNull(options.scale)) {
						result.object.scale.setScalar(options.scale);
						result.object.position.multiplyScalar(options.scale);
					}
				}
				callBack(
					result.object,
					result.clips,
					result.geometry,
					result.morphTargets,
					result.source
				);
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
		callBack: (mesh: I3JS.IBufferGeometry, source?: any) => void,
		options?: StorageOption
	): void {
		this.getObjectFromKey(
			key,
			(result) => {
				if (result.geometry instanceof N3JS.BufferGeometry) {
					callBack(result.geometry, result.source);
				} else if (result.object instanceof N3JS.Mesh) {
					callBack(result.object.geometry, result.source);
				} else if (
					result.object.children.length > 0 &&
					result.object.children[0] instanceof N3JS.Mesh
				) {
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
		callBack: (texture: I3JS.ITexture, source?: any) => void,
		options?: StorageOption
	): void {
		this.getObjectFromKey(
			key,
			(result) => {
				const resultMaterial: any = result.material;
				if (result.texture instanceof N3JS.Texture) {
					callBack(result.texture, result.source);
				} else if (
					result.material instanceof N3JS.Material &&
					resultMaterial['map'] instanceof N3JS.Texture
				) {
					callBack(resultMaterial['map'], result.source);
				} else {
					callBack(new N3JS.Texture());
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
		callBack: (material: I3JS.IMaterial, source?: any) => void,
		options?: StorageOption
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
	public setScene(key: string, scene: I3JS.IScene) {
		this.setItem(key, JSON.stringify(scene.toJSON()));
	}

	/**
	 * Gets scene
	 * @param key
	 * @param callBack
	 * @param [options]
	 */
	public getScene(
		key: string,
		callBack: (mesh: I3JS.IScene, source?: any) => void,
		options?: StorageOption
	): void {
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
	public getFont(
		callBack: (font: I3JS.IFont) => void,
		fontName: string = 'helvetiker',
		fontWeight: string = ''
	) {
		let fontPath: string = '';
		if (ThreeUtil.isNull(fontWeight) || fontWeight === '') {
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
						fontPath = 'fonts/helvetiker_bold.typeface.json';
						break;
					case 'regular':
					default:
						fontPath = 'fonts/helvetiker_regular.typeface.json';
						break;
				}
				break;
			case 'gentilis':
				switch (fontWeight.toLowerCase()) {
					case 'bold':
						fontPath = 'fonts/gentilis_bold.typeface.json';
						break;
					case 'regular':
					default:
						fontPath = 'fonts/gentilis_regular.typeface.json';
						break;
				}
				break;
			case 'optimer':
				switch (fontWeight.toLowerCase()) {
					case 'bold':
						fontPath = 'fonts/optimer_bold.typeface.json';
						break;
					case 'regular':
					default:
						fontPath = 'fonts/optimer_regular.typeface.json';
						break;
				}
				break;
			case 'sans':
			case 'droid_sans':
				switch (fontWeight.toLowerCase()) {
					case 'bold':
						fontPath = 'fonts/droid/droid_sans_bold.typeface.json';
						break;
					case 'regular':
					default:
						fontPath = 'fonts/droid/droid_sans_regular.typeface.json';
						break;
				}
				break;
			case 'sans_mono':
			case 'droid_sans_mono':
				fontPath = 'fonts/droid/droid_sans_mono_regular.typeface.json';
				break;
			case 'serif':
			case 'droid_serif':
				switch (fontWeight.toLowerCase()) {
					case 'bold':
						fontPath = 'fonts/droid/droid_serif_bold.typeface.json';
						break;
					case 'regular':
					default:
						fontPath = 'fonts/droid/droid_serif_regular.typeface.json';
						break;
				}
				break;
			default:
				console.log(fontName);
				if (
					fontName.startsWith('/') ||
					fontName.startsWith('http://') ||
					fontName.startsWith('https://') ||
					fontName.endsWith('.json') ||
					fontName.endsWith('.ttf')
				) {
					if (fontName.endsWith('.ttf') || fontName.endsWith('.json')) {
						fontPath = fontName;
					} else {
						fontPath = fontName + '_' + fontWeight + '.typeface.json';
					}
				} else {
					fontPath = 'fonts/helvetiker_regular.typeface.json';
				}
				break;
		}
		if (ThreeUtil.isNotNull(this._loadedFonts[fontPath])) {
			window.setTimeout(() => {
				callBack(this._loadedFonts[fontPath]);
			}, 1);
		} else {
			if (fontPath.endsWith('.ttf')) {
				if (this.ttfLoader === null) {
					this.ttfLoader = new N3JS.TTFLoader(ThreeUtil.getLoadingManager());
				}
				this.ttfLoader.load(ThreeUtil.getStoreUrl(fontPath), (json: any) => {
					this._loadedFonts[fontPath] = new N3JS.Font(json);
					callBack(this._loadedFonts[fontPath]);
				});
			} else {
				if (this.fontLoader === null) {
					this.fontLoader = new N3JS.FontLoader(ThreeUtil.getLoadingManager());
				}
				this.fontLoader.load(
					ThreeUtil.getStoreUrl(fontPath),
					(responseFont) => {
						this._loadedFonts[fontPath] = responseFont;
						callBack(this._loadedFonts[fontPath]);
					}
				);
			}
		}
	}

	/**
	 * Loaded fonts of local storage service
	 */
	private _loadedFonts: {
		[key: string]: I3JS.IFont;
	} = {};

	/**
	 * Font loader of local storage service
	 */
	private fontLoader: I3JS.IFontLoader = null;

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
