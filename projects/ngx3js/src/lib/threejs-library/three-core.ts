import * as O3JS from 'three';
import { I3JS } from '../threejs-library/three-interface';
import * as E_G_UTIL from 'three/examples/jsm/utils/BufferGeometryUtils';

export namespace THREE {
	export const AnimationUtils: I3JS.IAnimationUtils =
		O3JS.AnimationUtils as any;
	export const ShaderChunk: I3JS.IShaderChunk = O3JS.ShaderChunk as any;
	export const Box2: I3JS.IBox2 = O3JS.Box2 as any;
	export const Box3: I3JS.IBox3 = O3JS.Box3 as any;
	export const Color: I3JS.IColor = O3JS.Color as any;
	export const Cylindrical: I3JS.ICylindrical = O3JS.Cylindrical as any;
	export const Euler: I3JS.IEuler = O3JS.Euler as any;
	export const Frustum: I3JS.IFrustum = O3JS.Frustum as any;
	export const Line3: I3JS.ILine3 = O3JS.Line3 as any;
	export const Matrix3: I3JS.IMatrix3 = O3JS.Matrix3 as any;
	export const Matrix4: I3JS.IMatrix4 = O3JS.Matrix4 as any;
	export const Plane: I3JS.IPlane = O3JS.Plane as any;
	export const Quaternion: I3JS.IQuaternion = O3JS.Quaternion as any;
	export const Ray: I3JS.IRay = O3JS.Ray as any;
	export const Sphere: I3JS.ISphere = O3JS.Sphere as any;
	export const Spherical: I3JS.ISpherical = O3JS.Spherical as any;
	export const SphericalHarmonics3: I3JS.ISphericalHarmonics3 =
		O3JS.SphericalHarmonics3 as any;
	export const Triangle: I3JS.ITriangle = O3JS.Triangle as any;
	export const Vector2: I3JS.IVector2 = O3JS.Vector2 as any;
	export const Vector3: I3JS.IVector3 = O3JS.Vector3 as any;
	export const Vector4: I3JS.IVector4 = O3JS.Vector4 as any;
	export const MathUtils: I3JS.IMathUtils = O3JS.MathUtils as any;
	export const CubicInterpolant: I3JS.ICubicInterpolant =
		O3JS.CubicInterpolant as any;
	export const DiscreteInterpolant: I3JS.IDiscreteInterpolant =
		O3JS.DiscreteInterpolant as any;
	export const LinearInterpolant: I3JS.ILinearInterpolant =
		O3JS.LinearInterpolant as any;
	export const QuaternionLinearInterpolant: I3JS.IQuaternionLinearInterpolant =
		O3JS.QuaternionLinearInterpolant as any;
	export const BufferAttribute: I3JS.IBufferAttribute =
		O3JS.BufferAttribute as any;
	export const Int8BufferAttribute: I3JS.IInt8BufferAttribute =
		O3JS.Int8BufferAttribute as any;
	export const Uint8BufferAttribute: I3JS.IUint8BufferAttribute =
		O3JS.Uint8BufferAttribute as any;
	export const Uint8ClampedBufferAttribute: I3JS.IUint8ClampedBufferAttribute =
		O3JS.Uint8ClampedBufferAttribute as any;
	export const Int16BufferAttribute: I3JS.IInt16BufferAttribute =
		O3JS.Int16BufferAttribute as any;
	export const Uint16BufferAttribute: I3JS.IUint16BufferAttribute =
		O3JS.Uint16BufferAttribute as any;
	export const Int32BufferAttribute: I3JS.IInt32BufferAttribute =
		O3JS.Int32BufferAttribute as any;
	export const Uint32BufferAttribute: I3JS.IUint32BufferAttribute =
		O3JS.Uint32BufferAttribute as any;
	export const Float16BufferAttribute: I3JS.IFloat16BufferAttribute =
		O3JS.Float16BufferAttribute as any;
	export const Float32BufferAttribute: I3JS.IFloat32BufferAttribute =
		O3JS.Float32BufferAttribute as any;
	export const Float64BufferAttribute: I3JS.IFloat64BufferAttribute =
		O3JS.Float64BufferAttribute as any;

	export const BufferGeometryUtils: I3JS.IBufferGeometryUtils = {
		// computeTangents: O3JS.BufferGeometryUtils.computeTangents as any,
		mergeBufferAttributes: E_G_UTIL.mergeBufferAttributes as any,
		mergeBufferGeometries: E_G_UTIL.mergeBufferGeometries as any,
		interleaveAttributes: E_G_UTIL.interleaveAttributes as any,
		estimateBytesUsed: E_G_UTIL.estimateBytesUsed as any,
		mergeVertices: E_G_UTIL.mergeVertices as any,
		toTrianglesDrawMode: E_G_UTIL.toTrianglesDrawMode as any,
		computeMorphedAttributes: E_G_UTIL.computeMorphedAttributes as any,
	};

	export const BufferGeometry: I3JS.IBufferGeometry =
		O3JS.BufferGeometry as any;
	export const Clock: I3JS.IClock = O3JS.Clock as any;
	export const EventDispatcher: I3JS.IEventDispatcher =
		O3JS.EventDispatcher as any;
	export const GLBufferAttribute: I3JS.IGLBufferAttribute =
		O3JS.GLBufferAttribute as any;
	export const InstancedBufferAttribute: I3JS.IInstancedBufferAttribute =
		O3JS.InstancedBufferAttribute as any;
	export const InstancedBufferGeometry: I3JS.IInstancedBufferGeometry =
		O3JS.InstancedBufferGeometry as any;
	export const InstancedInterleavedBuffer: I3JS.IInstancedInterleavedBuffer =
		O3JS.InstancedInterleavedBuffer as any;
	export const InterleavedBuffer: I3JS.IInterleavedBuffer =
		O3JS.InterleavedBuffer as any;
	export const InterleavedBufferAttribute: I3JS.IInterleavedBufferAttribute =
		O3JS.InterleavedBufferAttribute as any;
	export const Layers: I3JS.ILayers = O3JS.Layers as any;
	export const Object3D: I3JS.IObject3D = O3JS.Object3D as any;
	export const Raycaster: I3JS.IRaycaster = O3JS.Raycaster as any;
	export const Uniform: I3JS.IUniform = O3JS.Uniform as any;
	export const UniformsUtils: I3JS.IUniformsUtils = O3JS.UniformsUtils as any;
	export const UniformsLib: I3JS.IUniformsLib = O3JS.UniformsLib as any;
	export const BoxGeometry: I3JS.IBoxGeometry = O3JS.BoxGeometry as any;
	export const BoxBufferGeometry: I3JS.IBoxGeometry = O3JS.BoxGeometry as any;
	export const CircleGeometry: I3JS.ICircleGeometry =
		O3JS.CircleGeometry as any;
	export const CircleBufferGeometry: I3JS.ICircleGeometry =
		O3JS.CircleGeometry as any;
	export const ConeGeometry: I3JS.IConeGeometry = O3JS.ConeGeometry as any;
	export const ConeBufferGeometry: I3JS.IConeGeometry =
		O3JS.ConeGeometry as any;
	export const CylinderGeometry: I3JS.ICylinderGeometry =
		O3JS.CylinderGeometry as any;
	export const CylinderBufferGeometry: I3JS.ICylinderGeometry =
		O3JS.CylinderGeometry as any;
	export const DodecahedronGeometry: I3JS.IDodecahedronGeometry =
		O3JS.DodecahedronGeometry as any;
	export const DodecahedronBufferGeometry: I3JS.IDodecahedronGeometry =
		O3JS.DodecahedronGeometry as any;
	export const EdgesGeometry: I3JS.IEdgesGeometry = O3JS.EdgesGeometry as any;
	export const EdgesBufferGeometry: I3JS.IEdgesGeometry =
		O3JS.EdgesGeometry as any;
	export const ExtrudeGeometry: I3JS.IExtrudeGeometry =
		O3JS.ExtrudeGeometry as any;
	export const ExtrudeBufferGeometry: I3JS.IExtrudeGeometry =
		O3JS.ExtrudeGeometry as any;
	export const IcosahedronGeometry: I3JS.IIcosahedronGeometry =
		O3JS.IcosahedronGeometry as any;
	export const IcosahedronBufferGeometry: I3JS.IIcosahedronGeometry =
		O3JS.IcosahedronGeometry as any;
	export const LatheGeometry: I3JS.ILatheGeometry = O3JS.LatheGeometry as any;
	export const LatheBufferGeometry: I3JS.ILatheGeometry =
		O3JS.LatheGeometry as any;
	export const OctahedronGeometry: I3JS.IOctahedronGeometry =
		O3JS.OctahedronGeometry as any;
	export const OctahedronBufferGeometry: I3JS.IOctahedronGeometry =
		O3JS.OctahedronGeometry as any;
	export const PlaneGeometry: I3JS.IPlaneGeometry = O3JS.PlaneGeometry as any;
	export const PlaneBufferGeometry: I3JS.IPlaneGeometry =
		O3JS.PlaneGeometry as any;
	export const PolyhedronGeometry: I3JS.IPolyhedronGeometry =
		O3JS.PolyhedronGeometry as any;
	export const PolyhedronBufferGeometry: I3JS.IPolyhedronGeometry =
		O3JS.PolyhedronGeometry as any;
	export const RingGeometry: I3JS.IRingGeometry = O3JS.RingGeometry as any;
	export const RingBufferGeometry: I3JS.IRingGeometry =
		O3JS.RingGeometry as any;
	export const ShapeGeometry: I3JS.IShapeGeometry = O3JS.ShapeGeometry as any;
	export const ShapeBufferGeometry: I3JS.IShapeGeometry =
		O3JS.ShapeGeometry as any;
	export const SphereGeometry: I3JS.ISphereGeometry =
		O3JS.SphereGeometry as any;
	export const SphereBufferGeometry: I3JS.ISphereGeometry =
		O3JS.SphereGeometry as any;
	export const TetrahedronGeometry: I3JS.ITetrahedronGeometry =
		O3JS.TetrahedronGeometry as any;
	export const TetrahedronBufferGeometry: I3JS.ITetrahedronGeometry =
		O3JS.TetrahedronGeometry as any;
	export const TorusGeometry: I3JS.ITorusGeometry = O3JS.TorusGeometry as any;
	export const TorusBufferGeometry: I3JS.ITorusGeometry =
		O3JS.TorusGeometry as any;
	export const TorusKnotGeometry: I3JS.ITorusKnotGeometry =
		O3JS.TorusKnotGeometry as any;
	export const TorusBufferKnotGeometry: I3JS.ITorusKnotGeometry =
		O3JS.TorusKnotGeometry as any;
	export const TubeGeometry: I3JS.ITubeGeometry = O3JS.TubeGeometry as any;
	export const TubeBufferGeometry: I3JS.ITubeGeometry =
		O3JS.TubeGeometry as any;
	export const WireframeGeometry: I3JS.IWireframeGeometry =
		O3JS.WireframeGeometry as any;
	export const WireframeBufferGeometry: I3JS.IWireframeGeometry =
		O3JS.WireframeGeometry as any;
	export const AmbientLight: I3JS.IAmbientLight = O3JS.AmbientLight as any;
	export const AmbientLightProbe: I3JS.IAmbientLightProbe =
		O3JS.AmbientLightProbe as any;
	export const DirectionalLight: I3JS.IDirectionalLight =
		O3JS.DirectionalLight as any;
	export const HemisphereLight: I3JS.IHemisphereLight =
		O3JS.HemisphereLight as any;
	export const HemisphereLightProbe: I3JS.IHemisphereLightProbe =
		O3JS.HemisphereLightProbe as any;
	export const Light: I3JS.ILight = O3JS.Light as any;
	export const LightProbe: I3JS.ILightProbe = O3JS.LightProbe as any;
	export const PointLight: I3JS.IPointLight = O3JS.PointLight as any;
	export const RectAreaLight: I3JS.IRectAreaLight = O3JS.RectAreaLight as any;
	export const SpotLight: I3JS.ISpotLight = O3JS.SpotLight as any;
	export const ArrayCamera: I3JS.IArrayCamera = O3JS.ArrayCamera as any;
	export const Camera: I3JS.ICamera = O3JS.Camera as any;
	export const CubeCamera: I3JS.ICubeCamera = O3JS.CubeCamera as any;
	export const OrthographicCamera: I3JS.IOrthographicCamera =
		O3JS.OrthographicCamera as any;
	export const PerspectiveCamera: I3JS.IPerspectiveCamera =
		O3JS.PerspectiveCamera as any;
	export const StereoCamera: I3JS.IStereoCamera = O3JS.StereoCamera as any;
	export const Audio: I3JS.IAudio = O3JS.Audio as any;
	export const AudioAnalyser: I3JS.IAudioAnalyser = O3JS.AudioAnalyser as any;
	export const AudioListener: I3JS.IAudioListener = O3JS.AudioListener as any;
	export const PositionalAudio: I3JS.IPositionalAudio =
		O3JS.PositionalAudio as any;
	export const AnimationClip: I3JS.IAnimationClip = O3JS.AnimationClip as any;
	export const AnimationMixer: I3JS.IAnimationMixer =
		O3JS.AnimationMixer as any;
	export const AnimationObjectGroup: I3JS.IAnimationObjectGroup =
		O3JS.AnimationObjectGroup as any;
	export const BooleanKeyframeTrack: I3JS.IBooleanKeyframeTrack =
		O3JS.BooleanKeyframeTrack as any;
	export const ColorKeyframeTrack: I3JS.IColorKeyframeTrack =
		O3JS.ColorKeyframeTrack as any;
	export const NumberKeyframeTrack: I3JS.INumberKeyframeTrack =
		O3JS.NumberKeyframeTrack as any;
	export const QuaternionKeyframeTrack: I3JS.IQuaternionKeyframeTrack =
		O3JS.QuaternionKeyframeTrack as any;
	export const StringKeyframeTrack: I3JS.IStringKeyframeTrack =
		O3JS.StringKeyframeTrack as any;
	export const VectorKeyframeTrack: I3JS.IVectorKeyframeTrack =
		O3JS.VectorKeyframeTrack as any;
	export const ArrowHelper: I3JS.IArrowHelper = O3JS.ArrowHelper as any;
	export const AxesHelper: I3JS.IAxesHelper = O3JS.AxesHelper as any;
	export const Box3Helper: I3JS.IBox3Helper = O3JS.Box3Helper as any;
	export const BoxHelper: I3JS.IBoxHelper = O3JS.BoxHelper as any;
	export const CameraHelper: I3JS.ICameraHelper = O3JS.CameraHelper as any;
	export const DirectionalLightHelper: I3JS.IDirectionalLightHelper =
		O3JS.DirectionalLightHelper as any;
	export const GridHelper: I3JS.IGridHelper = O3JS.GridHelper as any;
	export const HemisphereLightHelper: I3JS.IHemisphereLightHelper =
		O3JS.HemisphereLightHelper as any;
	export const PlaneHelper: I3JS.IPlaneHelper = O3JS.PlaneHelper as any;
	export const PointLightHelper: I3JS.IPointLightHelper =
		O3JS.PointLightHelper as any;
	export const PolarGridHelper: I3JS.IPolarGridHelper =
		O3JS.PolarGridHelper as any;
	export const SkeletonHelper: I3JS.ISkeletonHelper =
		O3JS.SkeletonHelper as any;
	export const SpotLightHelper: I3JS.ISpotLightHelper =
		O3JS.SpotLightHelper as any;
	export const LineBasicMaterial: I3JS.ILineBasicMaterial =
		O3JS.LineBasicMaterial as any;
	export const LineDashedMaterial: I3JS.ILineDashedMaterial =
		O3JS.LineDashedMaterial as any;
	export const Material: I3JS.IMaterial = O3JS.Material as any;
	export const MeshBasicMaterial: I3JS.IMeshBasicMaterial =
		O3JS.MeshBasicMaterial as any;
	export const MeshDepthMaterial: I3JS.IMeshDepthMaterial =
		O3JS.MeshDepthMaterial as any;
	export const MeshDistanceMaterial: I3JS.IMeshDistanceMaterial =
		O3JS.MeshDistanceMaterial as any;
	export const MeshLambertMaterial: I3JS.IMeshLambertMaterial =
		O3JS.MeshLambertMaterial as any;
	export const MeshMatcapMaterial: I3JS.IMeshMatcapMaterial =
		O3JS.MeshMatcapMaterial as any;
	export const MeshNormalMaterial: I3JS.IMeshNormalMaterial =
		O3JS.MeshNormalMaterial as any;
	export const MeshPhongMaterial: I3JS.IMeshPhongMaterial =
		O3JS.MeshPhongMaterial as any;
	export const MeshPhysicalMaterial: I3JS.IMeshPhysicalMaterial =
		O3JS.MeshPhysicalMaterial as any;
	export const MeshStandardMaterial: I3JS.IMeshStandardMaterial =
		O3JS.MeshStandardMaterial as any;
	export const MeshToonMaterial: I3JS.IMeshToonMaterial =
		O3JS.MeshToonMaterial as any;
	export const PointsMaterial: I3JS.IPointsMaterial =
		O3JS.PointsMaterial as any;
	export const RawShaderMaterial: I3JS.IRawShaderMaterial =
		O3JS.RawShaderMaterial as any;
	export const ShaderMaterial: I3JS.IShaderMaterial =
		O3JS.ShaderMaterial as any;
	export const ShadowMaterial: I3JS.IShadowMaterial =
		O3JS.ShadowMaterial as any;
	export const SpriteMaterial: I3JS.ISpriteMaterial =
		O3JS.SpriteMaterial as any;

	export const Bone: I3JS.IBone = O3JS.Bone as any;
	export const Group: I3JS.IGroup = O3JS.Group as any;
	export const InstancedMesh: I3JS.IInstancedMesh = O3JS.InstancedMesh as any;
	export const Line: I3JS.ILine = O3JS.Line as any;
	export const LineLoop: I3JS.ILineLoop = O3JS.LineLoop as any;
	export const LineSegments: I3JS.ILineSegments = O3JS.LineSegments as any;
	export const LOD: I3JS.ILOD = O3JS.LOD as any;
	export const Mesh: I3JS.IMesh = O3JS.Mesh as any;
	export const Points: I3JS.IPoints = O3JS.Points as any;
	export const Skeleton: I3JS.ISkeleton = O3JS.Skeleton as any;
	export const SkinnedMesh: I3JS.ISkinnedMesh = O3JS.SkinnedMesh as any;
	export const Sprite: I3JS.ISprite = O3JS.Sprite as any;

	export const PMREMGenerator: I3JS.IPMREMGenerator =
		O3JS.PMREMGenerator as any;
	export const WebGL1Renderer: I3JS.IWebGL1Renderer =
		O3JS.WebGL1Renderer as any;
	export const WebGLCubeRenderTarget: I3JS.IWebGLCubeRenderTarget =
		O3JS.WebGLCubeRenderTarget as any;
	export const WebGLMultipleRenderTargets: I3JS.IWebGLMultipleRenderTargets =
		O3JS.WebGLMultipleRenderTargets as any;
	export const WebGLMultisampleRenderTarget: I3JS.IWebGLMultisampleRenderTarget =
		O3JS.WebGLMultisampleRenderTarget as any;
	export const WebGLRenderer: I3JS.IWebGLRenderer = O3JS.WebGLRenderer as any;
	export const WebGLRenderTarget: I3JS.IWebGLRenderTarget =
		O3JS.WebGLRenderTarget as any;
	export const Fog: I3JS.IFog = O3JS.Fog as any;
	export const FogExp2: I3JS.IFogExp2 = O3JS.FogExp2 as any;
	export const Scene: I3JS.IScene = O3JS.Scene as any;
	export const CanvasTexture: I3JS.ICanvasTexture = O3JS.CanvasTexture as any;
	export const CompressedTexture: I3JS.ICompressedTexture =
		O3JS.CompressedTexture as any;
	export const CubeTexture: I3JS.ICubeTexture = O3JS.CubeTexture as any;
	export const DataTexture: I3JS.IDataTexture = O3JS.DataTexture as any;
	export const DataTexture2DArray: I3JS.IDataTexture2DArray =
		O3JS.DataTexture2DArray as any;
	export const DataTexture3D: I3JS.IDataTexture3D = O3JS.DataTexture3D as any;
	export const DepthTexture: I3JS.IDepthTexture = O3JS.DepthTexture as any;
	export const Texture: I3JS.ITexture = O3JS.Texture as any;
	export const VideoTexture: I3JS.IVideoTexture = O3JS.VideoTexture as any;
	export const AnimationLoader: I3JS.IAnimationLoader =
		O3JS.AnimationLoader as any;
	export const AudioLoader: I3JS.IAudioLoader = O3JS.AudioLoader as any;
	export const BufferGeometryLoader: I3JS.IBufferGeometryLoader =
		O3JS.BufferGeometryLoader as any;
	export const CompressedTextureLoader: I3JS.ICompressedTextureLoader =
		O3JS.CompressedTextureLoader as any;
	export const CubeTextureLoader: I3JS.ICubeTextureLoader =
		O3JS.CubeTextureLoader as any;
	export const DataTextureLoader: I3JS.IDataTextureLoader =
		O3JS.DataTextureLoader as any;
	export const FileLoader: I3JS.IFileLoader = O3JS.FileLoader as any;
	export const ImageBitmapLoader: I3JS.IImageBitmapLoader =
		O3JS.ImageBitmapLoader as any;
	export const ImageLoader: I3JS.IImageLoader = O3JS.ImageLoader as any;
	export const Loader: I3JS.ILoader = O3JS.Loader as any;
	export const LoadingManager: I3JS.ILoadingManager =
		O3JS.LoadingManager as any;
	export const MaterialLoader: I3JS.IMaterialLoader =
		O3JS.MaterialLoader as any;
	export const ObjectLoader: I3JS.IObjectLoader = O3JS.ObjectLoader as any;
	export const TextureLoader: I3JS.ITextureLoader = O3JS.TextureLoader as any;
	export const ArcCurve: I3JS.IArcCurve = O3JS.ArcCurve as any;
	export const CatmullRomCurve3: I3JS.ICatmullRomCurve3 =
		O3JS.CatmullRomCurve3 as any;
	export const CubicBezierCurve: I3JS.ICubicBezierCurve =
		O3JS.CubicBezierCurve as any;
	export const CubicBezierCurve3: I3JS.ICubicBezierCurve3 =
		O3JS.CubicBezierCurve3 as any;
	export const EllipseCurve: I3JS.IEllipseCurve = O3JS.EllipseCurve as any;
	export const LineCurve: I3JS.ILineCurve = O3JS.LineCurve as any;
	export const LineCurve3: I3JS.ILineCurve3 = O3JS.LineCurve3 as any;
	export const QuadraticBezierCurve: I3JS.IQuadraticBezierCurve =
		O3JS.QuadraticBezierCurve as any;
	export const QuadraticBezierCurve3: I3JS.IQuadraticBezierCurve3 =
		O3JS.QuadraticBezierCurve3 as any;
	export const SplineCurve: I3JS.ISplineCurve = O3JS.SplineCurve as any;
	export const Shape: I3JS.IShape = O3JS.Shape as any;
	export const ShapePath: I3JS.IShapePath = O3JS.ShapePath as any;
	export const Path: I3JS.IPath = O3JS.Path as any;
	export const Curve: I3JS.ICurve = O3JS.Curve as any;
	export const CurvePath: I3JS.ICurvePath = O3JS.CurvePath as any;

	export const CullFaceNone: O3JS.CullFace = O3JS.CullFaceNone;
	export const CullFaceBack: O3JS.CullFace = O3JS.CullFaceBack;
	export const CullFaceFront: O3JS.CullFace = O3JS.CullFaceFront;
	export const CullFaceFrontBack: O3JS.CullFace = O3JS.CullFaceFrontBack;

	export const BasicShadowMap: O3JS.ShadowMapType = O3JS.BasicShadowMap;
	export const PCFShadowMap: O3JS.ShadowMapType = O3JS.PCFShadowMap;
	export const PCFSoftShadowMap: O3JS.ShadowMapType = O3JS.PCFSoftShadowMap;
	export const VSMShadowMap: O3JS.ShadowMapType = O3JS.VSMShadowMap;

	export const FrontSide: O3JS.Side = O3JS.FrontSide;
	export const BackSide: O3JS.Side = O3JS.BackSide;
	export const DoubleSide: O3JS.Side = O3JS.DoubleSide;

	export const FlatShading: O3JS.Shading = O3JS.FlatShading;
	export const SmoothShading: O3JS.Shading = O3JS.SmoothShading;

	export const NoBlending: O3JS.Blending = O3JS.NoBlending;
	export const NormalBlending: O3JS.Blending = O3JS.NormalBlending;
	export const AdditiveBlending: O3JS.Blending = O3JS.AdditiveBlending;
	export const SubtractiveBlending: O3JS.Blending = O3JS.SubtractiveBlending;
	export const MultiplyBlending: O3JS.Blending = O3JS.MultiplyBlending;
	export const CustomBlending: O3JS.Blending = O3JS.CustomBlending;

	export const AddEquation: O3JS.BlendingEquation = O3JS.AddEquation;
	export const SubtractEquation: O3JS.BlendingEquation = O3JS.SubtractEquation;
	export const ReverseSubtractEquation: O3JS.BlendingEquation =
		O3JS.ReverseSubtractEquation;
	export const MinEquation: O3JS.BlendingEquation = O3JS.MinEquation;
	export const MaxEquation: O3JS.BlendingEquation = O3JS.MaxEquation;

	export const ZeroFactor: O3JS.BlendingDstFactor = O3JS.ZeroFactor;
	export const OneFactor: O3JS.BlendingDstFactor = O3JS.OneFactor;
	export const SrcColorFactor: O3JS.BlendingDstFactor = O3JS.SrcColorFactor;
	export const OneMinusSrcColorFactor: O3JS.BlendingDstFactor =
		O3JS.OneMinusSrcColorFactor;
	export const SrcAlphaFactor: O3JS.BlendingDstFactor = O3JS.SrcAlphaFactor;
	export const OneMinusSrcAlphaFactor: O3JS.BlendingDstFactor =
		O3JS.OneMinusSrcAlphaFactor;
	export const DstAlphaFactor: O3JS.BlendingDstFactor = O3JS.DstAlphaFactor;
	export const OneMinusDstAlphaFactor: O3JS.BlendingDstFactor =
		O3JS.OneMinusDstAlphaFactor;
	export const DstColorFactor: O3JS.BlendingDstFactor = O3JS.DstColorFactor;
	export const OneMinusDstColorFactor: O3JS.BlendingDstFactor =
		O3JS.OneMinusDstColorFactor;

	export const SrcAlphaSaturateFactor: O3JS.BlendingSrcFactor =
		O3JS.SrcAlphaSaturateFactor;

	export const NeverDepth: O3JS.DepthModes = O3JS.NeverDepth;
	export const AlwaysDepth: O3JS.DepthModes = O3JS.AlwaysDepth;
	export const LessDepth: O3JS.DepthModes = O3JS.LessDepth;
	export const LessEqualDepth: O3JS.DepthModes = O3JS.LessEqualDepth;
	export const EqualDepth: O3JS.DepthModes = O3JS.EqualDepth;
	export const GreaterEqualDepth: O3JS.DepthModes = O3JS.GreaterEqualDepth;
	export const GreaterDepth: O3JS.DepthModes = O3JS.GreaterDepth;
	export const NotEqualDepth: O3JS.DepthModes = O3JS.NotEqualDepth;

	export const MultiplyOperation: O3JS.Combine = O3JS.MultiplyOperation;
	export const MixOperation: O3JS.Combine = O3JS.MixOperation;
	export const AddOperation: O3JS.Combine = O3JS.AddOperation;

	export const NoToneMapping: O3JS.ToneMapping = O3JS.NoToneMapping;
	export const LinearToneMapping: O3JS.ToneMapping = O3JS.LinearToneMapping;
	export const ReinhardToneMapping: O3JS.ToneMapping = O3JS.ReinhardToneMapping;
	export const CineonToneMapping: O3JS.ToneMapping = O3JS.CineonToneMapping;
	export const ACESFilmicToneMapping: O3JS.ToneMapping =
		O3JS.ACESFilmicToneMapping;

	export const UVMapping: O3JS.Mapping = O3JS.UVMapping;
	export const CubeReflectionMapping: O3JS.Mapping = O3JS.CubeReflectionMapping;
	export const CubeRefractionMapping: O3JS.Mapping = O3JS.CubeRefractionMapping;
	export const EquirectangularReflectionMapping: O3JS.Mapping =
		O3JS.EquirectangularReflectionMapping;
	export const EquirectangularRefractionMapping: O3JS.Mapping =
		O3JS.EquirectangularRefractionMapping;
	export const CubeUVReflectionMapping: O3JS.Mapping =
		O3JS.CubeUVReflectionMapping;
	export const CubeUVRefractionMapping: O3JS.Mapping =
		O3JS.CubeUVRefractionMapping;
	export const DEFAULT_MAPPING: O3JS.Mapping = O3JS.Texture.DEFAULT_MAPPING;

	export const RepeatWrapping: O3JS.Wrapping = O3JS.RepeatWrapping;
	export const ClampToEdgeWrapping: O3JS.Wrapping = O3JS.ClampToEdgeWrapping;
	export const MirroredRepeatWrapping: O3JS.Wrapping =
		O3JS.MirroredRepeatWrapping;

	export const NearestFilter: O3JS.TextureFilter = O3JS.NearestFilter;
	export const NearestMipmapNearestFilter: O3JS.TextureFilter =
		O3JS.NearestMipmapNearestFilter;
	export const NearestMipMapNearestFilter: O3JS.TextureFilter =
		O3JS.NearestMipMapNearestFilter;
	export const NearestMipmapLinearFilter: O3JS.TextureFilter =
		O3JS.NearestMipmapLinearFilter;
	export const NearestMipMapLinearFilter: O3JS.TextureFilter =
		O3JS.NearestMipMapLinearFilter;
	export const LinearFilter: O3JS.TextureFilter = O3JS.LinearFilter;
	export const LinearMipmapNearestFilter: O3JS.TextureFilter =
		O3JS.LinearMipmapNearestFilter;
	export const LinearMipMapNearestFilter: O3JS.TextureFilter =
		O3JS.LinearMipMapNearestFilter;
	export const LinearMipmapLinearFilter: O3JS.TextureFilter =
		O3JS.LinearMipmapLinearFilter;
	export const LinearMipMapLinearFilter: O3JS.TextureFilter =
		O3JS.LinearMipMapLinearFilter;

	export const UnsignedByteType: O3JS.TextureDataType = O3JS.UnsignedByteType;
	export const ByteType: O3JS.TextureDataType = O3JS.ByteType;
	export const ShortType: O3JS.TextureDataType = O3JS.ShortType;
	export const UnsignedShortType: O3JS.TextureDataType = O3JS.UnsignedShortType;
	export const IntType: O3JS.TextureDataType = O3JS.IntType;
	export const UnsignedIntType: O3JS.TextureDataType = O3JS.UnsignedIntType;
	export const FloatType: O3JS.TextureDataType = O3JS.FloatType;
	export const HalfFloatType: O3JS.TextureDataType = O3JS.HalfFloatType;
	export const UnsignedShort4444Type: O3JS.TextureDataType =
		O3JS.UnsignedShort4444Type;
	export const UnsignedShort5551Type: O3JS.TextureDataType =
		O3JS.UnsignedShort5551Type;
	export const UnsignedShort565Type: O3JS.TextureDataType =
		O3JS.UnsignedShort565Type;
	export const UnsignedInt248Type: O3JS.TextureDataType =
		O3JS.UnsignedInt248Type;

	export const AlphaFormat: O3JS.PixelFormat = O3JS.AlphaFormat;
	export const RGBFormat: O3JS.PixelFormat = O3JS.RGBFormat;
	export const RGBAFormat: O3JS.PixelFormat = O3JS.RGBAFormat;
	export const LuminanceFormat: O3JS.PixelFormat = O3JS.LuminanceFormat;
	export const LuminanceAlphaFormat: O3JS.PixelFormat =
		O3JS.LuminanceAlphaFormat;
	export const RGBEFormat: O3JS.PixelFormat = O3JS.RGBEFormat;
	export const DepthFormat: O3JS.PixelFormat = O3JS.DepthFormat;
	export const DepthStencilFormat: O3JS.PixelFormat = O3JS.DepthStencilFormat;
	export const RedFormat: O3JS.PixelFormat = O3JS.RedFormat;
	export const RedIntegerFormat: O3JS.PixelFormat = O3JS.RedIntegerFormat;
	export const RGFormat: O3JS.PixelFormat = O3JS.RGFormat;
	export const RGIntegerFormat: O3JS.PixelFormat = O3JS.RGIntegerFormat;
	export const RGBIntegerFormat: O3JS.PixelFormat = O3JS.RGBIntegerFormat;
	export const RGBAIntegerFormat: O3JS.PixelFormat = O3JS.RGBAIntegerFormat;

	export const RGB_S3TC_DXT1_Format: O3JS.CompressedPixelFormat =
		O3JS.RGB_S3TC_DXT1_Format;
	export const RGBA_S3TC_DXT1_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_S3TC_DXT1_Format;
	export const RGBA_S3TC_DXT3_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_S3TC_DXT3_Format;
	export const RGBA_S3TC_DXT5_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_S3TC_DXT5_Format;
	export const RGB_PVRTC_4BPPV1_Format: O3JS.CompressedPixelFormat =
		O3JS.RGB_PVRTC_4BPPV1_Format;
	export const RGB_PVRTC_2BPPV1_Format: O3JS.CompressedPixelFormat =
		O3JS.RGB_PVRTC_2BPPV1_Format;
	export const RGBA_PVRTC_4BPPV1_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_PVRTC_4BPPV1_Format;
	export const RGBA_PVRTC_2BPPV1_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_PVRTC_2BPPV1_Format;
	export const RGB_ETC1_Format: O3JS.CompressedPixelFormat =
		O3JS.RGB_ETC1_Format;
	export const RGB_ETC2_Format: O3JS.CompressedPixelFormat =
		O3JS.RGB_ETC2_Format;
	export const RGBA_ETC2_EAC_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ETC2_EAC_Format;
	export const RGBA_ASTC_4x4_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_4x4_Format;
	export const RGBA_ASTC_5x4_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_5x4_Format;
	export const RGBA_ASTC_5x5_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_5x5_Format;
	export const RGBA_ASTC_6x5_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_6x5_Format;
	export const RGBA_ASTC_6x6_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_6x6_Format;
	export const RGBA_ASTC_8x5_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_8x5_Format;
	export const RGBA_ASTC_8x6_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_8x6_Format;
	export const RGBA_ASTC_8x8_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_8x8_Format;
	export const RGBA_ASTC_10x5_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_10x5_Format;
	export const RGBA_ASTC_10x6_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_10x6_Format;
	export const RGBA_ASTC_10x8_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_10x8_Format;
	export const RGBA_ASTC_10x10_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_10x10_Format;
	export const RGBA_ASTC_12x10_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_12x10_Format;
	export const RGBA_ASTC_12x12_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_ASTC_12x12_Format;
	export const SRGB8_ALPHA8_ASTC_4x4_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_4x4_Format;
	export const SRGB8_ALPHA8_ASTC_5x4_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_5x4_Format;
	export const SRGB8_ALPHA8_ASTC_5x5_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_5x5_Format;
	export const SRGB8_ALPHA8_ASTC_6x5_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_6x5_Format;
	export const SRGB8_ALPHA8_ASTC_6x6_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_6x6_Format;
	export const SRGB8_ALPHA8_ASTC_8x5_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_8x5_Format;
	export const SRGB8_ALPHA8_ASTC_8x6_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_8x6_Format;
	export const SRGB8_ALPHA8_ASTC_8x8_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_8x8_Format;
	export const SRGB8_ALPHA8_ASTC_10x5_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_10x5_Format;
	export const SRGB8_ALPHA8_ASTC_10x6_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_10x6_Format;
	export const SRGB8_ALPHA8_ASTC_10x8_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_10x8_Format;
	export const SRGB8_ALPHA8_ASTC_10x10_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_10x10_Format;
	export const SRGB8_ALPHA8_ASTC_12x10_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_12x10_Format;
	export const SRGB8_ALPHA8_ASTC_12x12_Format: O3JS.CompressedPixelFormat =
		O3JS.SRGB8_ALPHA8_ASTC_12x12_Format;
	export const RGBA_BPTC_Format: O3JS.CompressedPixelFormat =
		O3JS.RGBA_BPTC_Format;

	export const LoopOnce: O3JS.AnimationActionLoopStyles = O3JS.LoopOnce;
	export const LoopRepeat: O3JS.AnimationActionLoopStyles = O3JS.LoopRepeat;
	export const LoopPingPong: O3JS.AnimationActionLoopStyles = O3JS.LoopPingPong;

	export const InterpolateDiscrete: O3JS.InterpolationModes =
		O3JS.InterpolateDiscrete;
	export const InterpolateLinear: O3JS.InterpolationModes =
		O3JS.InterpolateLinear;
	export const InterpolateSmooth: O3JS.InterpolationModes =
		O3JS.InterpolateSmooth;

	export const ZeroCurvatureEnding: O3JS.InterpolationEndingModes =
		O3JS.ZeroCurvatureEnding;
	export const ZeroSlopeEnding: O3JS.InterpolationEndingModes =
		O3JS.ZeroSlopeEnding;
	export const WrapAroundEnding: O3JS.InterpolationEndingModes =
		O3JS.WrapAroundEnding;

	export const NormalAnimationBlendMode: O3JS.AnimationBlendMode =
		O3JS.NormalAnimationBlendMode;
	export const AdditiveAnimationBlendMode: O3JS.AnimationBlendMode =
		O3JS.AdditiveAnimationBlendMode;

	export const TrianglesDrawMode: O3JS.TrianglesDrawModes =
		O3JS.TrianglesDrawMode;
	export const TriangleStripDrawMode: O3JS.TrianglesDrawModes =
		O3JS.TriangleStripDrawMode;
	export const TriangleFanDrawMode: O3JS.TrianglesDrawModes =
		O3JS.TriangleFanDrawMode;

	export const LinearEncoding: O3JS.TextureEncoding = O3JS.LinearEncoding;
	export const sRGBEncoding: O3JS.TextureEncoding = O3JS.sRGBEncoding;
	export const GammaEncoding: O3JS.TextureEncoding = O3JS.GammaEncoding;
	export const RGBEEncoding: O3JS.TextureEncoding = O3JS.RGBEEncoding;
	// export const LogLuvEncoding: O3JS.TextureEncoding = O3JS.LogLuvEncoding;
	export const RGBM7Encoding: O3JS.TextureEncoding = O3JS.RGBM7Encoding;
	export const RGBM16Encoding: O3JS.TextureEncoding = O3JS.RGBM16Encoding;
	export const RGBDEncoding: O3JS.TextureEncoding = O3JS.RGBDEncoding;

	export const BasicDepthPacking: O3JS.DepthPackingStrategies =
		O3JS.BasicDepthPacking;
	export const RGBADepthPacking: O3JS.DepthPackingStrategies =
		O3JS.RGBADepthPacking;

	export const TangentSpaceNormalMap: O3JS.NormalMapTypes =
		O3JS.TangentSpaceNormalMap;
	export const ObjectSpaceNormalMap: O3JS.NormalMapTypes =
		O3JS.ObjectSpaceNormalMap;

	export const ZeroStencilOp: O3JS.StencilOp = O3JS.ZeroStencilOp;
	export const KeepStencilOp: O3JS.StencilOp = O3JS.KeepStencilOp;
	export const ReplaceStencilOp: O3JS.StencilOp = O3JS.ReplaceStencilOp;
	export const IncrementStencilOp: O3JS.StencilOp = O3JS.IncrementStencilOp;
	export const DecrementStencilOp: O3JS.StencilOp = O3JS.DecrementStencilOp;
	export const IncrementWrapStencilOp: O3JS.StencilOp =
		O3JS.IncrementWrapStencilOp;
	export const DecrementWrapStencilOp: O3JS.StencilOp =
		O3JS.DecrementWrapStencilOp;
	export const InvertStencilOp: O3JS.StencilOp = O3JS.InvertStencilOp;

	export const NeverStencilFunc: O3JS.StencilFunc = O3JS.NeverStencilFunc;
	export const LessStencilFunc: O3JS.StencilFunc = O3JS.LessStencilFunc;
	export const EqualStencilFunc: O3JS.StencilFunc = O3JS.EqualStencilFunc;
	export const LessEqualStencilFunc: O3JS.StencilFunc =
		O3JS.LessEqualStencilFunc;
	export const GreaterStencilFunc: O3JS.StencilFunc = O3JS.GreaterStencilFunc;
	export const NotEqualStencilFunc: O3JS.StencilFunc = O3JS.NotEqualStencilFunc;
	export const GreaterEqualStencilFunc: O3JS.StencilFunc =
		O3JS.GreaterEqualStencilFunc;
	export const AlwaysStencilFunc: O3JS.StencilFunc = O3JS.AlwaysStencilFunc;

	export const StaticDrawUsage: O3JS.Usage = O3JS.StaticDrawUsage;
	export const DynamicDrawUsage: O3JS.Usage = O3JS.DynamicDrawUsage;
	export const StreamDrawUsage: O3JS.Usage = O3JS.StreamDrawUsage;
	export const StaticReadUsage: O3JS.Usage = O3JS.StaticReadUsage;
	export const DynamicReadUsage: O3JS.Usage = O3JS.DynamicReadUsage;
	export const StreamReadUsage: O3JS.Usage = O3JS.StreamReadUsage;
	export const StaticCopyUsage: O3JS.Usage = O3JS.StaticCopyUsage;
	export const DynamicCopyUsage: O3JS.Usage = O3JS.DynamicCopyUsage;
	export const StreamCopyUsage: O3JS.Usage = O3JS.StreamCopyUsage;

	export const GLSL1: O3JS.GLSLVersion = O3JS.GLSL1;
	export const GLSL3: O3JS.GLSLVersion = O3JS.GLSL3;
}
