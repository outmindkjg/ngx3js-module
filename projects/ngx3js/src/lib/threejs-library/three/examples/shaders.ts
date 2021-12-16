import { IUniform, Material, Matrix4, Texture, Uniform, Vector2 } from '../index';

export interface AfterimageShader{
    uniforms : {
        damp: Uniform;
        tOld: Uniform;
        tNew: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};
export interface BasicShader{
    uniforms : {};
    vertexShader: string;
    fragmentShader: string;
};

export interface BleachBypassShader{
    uniforms : {
        tDiffuse: Uniform;
        opacity: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface BlendShader{
    uniforms : {
        tDiffuse1: Uniform;
        tDiffuse2: Uniform;
        mixRatio: Uniform;
        opacity: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface BokehShader{
    defines : {
        DEPTH_PACKING: number;
        PERSPECTIVE_CAMERA: number;
    };
    uniforms : {
        tColor: Uniform;
        tDepth: Uniform;
        focus: Uniform;
        aspect: Uniform;
        aperture: Uniform;
        maxblur: Uniform;
        nearClip: Uniform;
        farClip: Uniform;
        textureWidth: Uniform;
        textureHeight: Uniform;
        focalDepth: Uniform;
        focalLength: Uniform;
        fstop: Uniform;
        showFocus: Uniform;
        manualdof: Uniform;
        vignetting: Uniform;
        depthblur: Uniform;
        threshold: Uniform;
        gain: Uniform;
        bias: Uniform;
        fringe: Uniform;
        znear: Uniform;
        zfar: Uniform;
        noise: Uniform;
        dithering: Uniform;
        pentagon: Uniform;
        shaderFocus: Uniform;
        focusCoords: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface BokehDepthShader{
    uniforms : {
        mNear: Uniform;
        mFar: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface BrightnessContrastShader{
    uniforms : {
        tDiffuse: Uniform;
        brightness: Uniform;
        contrast: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface ColorCorrectionShader{
    uniforms : {
        tDiffuse: Uniform;
        powRGB: Uniform;
        mulRGB: Uniform;
        addRGB: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface ColorifyShader{
    uniforms : {
        tDiffuse: Uniform;
        color: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface ConvolutionShader{
    defines : {
        KERNEL_SIZE_FLOAT: string;
        KERNEL_SIZE_INT: string;
    };
    uniforms : {
        tDiffuse: Uniform;
        uImageIncrement: Uniform;
        cKernel: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;

    buildKernel(sigma: number): number[];
};

export interface CopyShader{
    uniforms : {
        tDiffuse: Uniform;
        opacity: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface DOFMipMapShader{
    uniforms : {
        tColor: Uniform;
        tDepth: Uniform;
        focus: Uniform;
        maxblur: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface DepthLimitedBlurShader{
    defines : {
        KERNEL_RADIUS: number;
        DEPTH_PACKING: number;
        PERSPECTIVE_CAMERA: number;
    };
    uniforms : {
        tDiffuse: Uniform;
        size: Uniform;
        sampleUvOffsets: Uniform;
        sampleWeights: Uniform;
        tDepth: Uniform;
        cameraNear: Uniform;
        cameraFar: Uniform;
        depthCutoff: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface BlurShaderUtils{
    createSampleWeights(kernelRadius: number, stdDev: number): number[];
    createSampleOffsets(kernelRadius: number, uvIncrement: Vector2): Vector2[];
    configure(configure: Material, kernelRadius: number, stdDev: number, uvIncrement: Vector2): void;
};

export interface DigitalGlitch{
    uniforms : {
        tDiffuse: Uniform;
        tDisp: Uniform;
        byp: Uniform;
        amount: Uniform;
        angle: Uniform;
        seed: Uniform;
        seed_x: Uniform;
        seed_y: Uniform;
        distortion_x: Uniform;
        distortion_y: Uniform;
        col_s: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface DotScreenShader{
    uniforms : {
        tDiffuse: Uniform;
        tSize: Uniform;
        center: Uniform;
        angle: Uniform;
        scale: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface FXAAShader{
    uniforms : {
        tDiffuse: Uniform;
        resolution: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface FilmShader{
    uniforms : {
        tDiffuse: Uniform;
        time: Uniform;
        nIntensity: Uniform;
        sIntensity: Uniform;
        sCount: Uniform;
        grayscale: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface FocusShader{
    uniforms : {
        tDiffuse: Uniform;
        screenWidth: Uniform;
        screenHeight: Uniform;
        sampleDistance: Uniform;
        waveFactor: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface FreiChenShader{
    uniforms : {
        tDiffuse: Uniform;
        aspect: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface GammaCorrectionShader{
    uniforms : {
        tDiffuse: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface GodRaysDepthMaskShader{
    uniforms : {
        tInput: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface GodRaysGenerateShader{
    uniforms : {
        tInput: Uniform;
        fStepSize: Uniform;
        vSunPositionScreenSpace: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface GodRaysCombineShader{
    uniforms : {
        tColors: Uniform;
        tGodRays: Uniform;
        fGodRayIntensity: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface GodRaysFakeSunShader{
    uniforms : {
        vSunPositionScreenSpace: Uniform;
        fAspect: Uniform;
        sunColor: Uniform;
        bgColor: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface HalftoneShader{
    uniforms : {
        tDiffuse: Uniform;
        shape: Uniform;
        radius: Uniform;
        rotateR: Uniform;
        rotateG: Uniform;
        rotateB: Uniform;
        scatter: Uniform;
        width: Uniform;
        height: Uniform;
        blending: Uniform;
        blendingMode: Uniform;
        greyscale: Uniform;
        disable: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface HorizontalBlurShader{
    uniforms : {
        tDiffuse: Uniform;
        h: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface HorizontalTiltShiftShader{
    uniforms : {
        tDiffuse: Uniform;
        h: Uniform;
        r: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface HueSaturationShader{
    uniforms : {
        tDiffuse: Uniform;
        hue: Uniform;
        saturation: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface KaleidoShader{
    uniforms : {
        tDiffuse: Uniform;
        sides: Uniform;
        angle: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface LuminosityHighPassShader{
    shaderID: string;
    uniforms : {
        tDiffuse: Uniform;
        luminosityThreshold: Uniform;
        smoothWidth: Uniform;
        defaultColor: Uniform;
        defaultOpacity: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface LuminosityShader{
    uniforms : {
        tDiffuse: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface MirrorShader{
    uniforms : {
        tDiffuse: Uniform;
        side: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface NormalMapShader{
    uniforms : {
        heightMap: Uniform;
        resolution: Uniform;
        scale: Uniform;
        height: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface PixelShader{
    uniforms : {
        tDiffuse: Uniform;
        resolution: Uniform;
        pixelSize: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface RGBShiftShader{
    uniforms : {
        tDiffuse: Uniform;
        amount: Uniform;
        angle: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface SAOShader{
    defines : {
        NUM_SAMPLES: number;
        NUM_RINGS: number;
        NORMAL_TEXTURE: number;
        DIFFUSE_TEXTURE: number;
        DEPTH_PACKING: number;
        PERSPECTIVE_CAMERA: number;
    };
    uniforms : {
        tDepth: Uniform;
        tDiffuse: Uniform;
        tNormal: Uniform;
        size: Uniform;
        cameraNear: Uniform;
        cameraFar: Uniform;
        cameraProjectionMatrix: Uniform;
        cameraInverseProjectionMatrix: Uniform;
        scale: Uniform;
        intensity: Uniform;
        bias: Uniform;
        minResolution: Uniform;
        kernelRadius: Uniform;
        randomSeed: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface SMAAEdgesShader{
    defines : {
        SMAA_THRESHOLD: string;
    };
    uniforms : {
        tDiffuse: Uniform;
        resolution: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface SMAAWeightsShader{
    defines : {
        SMAA_MAX_SEARCH_STEPS: string;
        SMAA_AREATEX_MAX_DISTANCE: string;
        SMAA_AREATEX_PIXEL_SIZE: string;
        SMAA_AREATEX_SUBTEX_SIZE: string;
    };
    uniforms : {
        tDiffuse: Uniform;
        tArea: Uniform;
        tSearch: Uniform;
        resolution: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface SMAABlendShader{
    uniforms : {
        tDiffuse: Uniform;
        tColor: Uniform;
        resolution: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface SSAOShader{
    defines : {
        PERSPECTIVE_CAMERA: number;
        KERNEL_SIZE: number;
    };
    uniforms : {
        tDiffuse: Uniform;
        tNormal: Uniform;
        tDepth: Uniform;
        tNoise: Uniform;
        kernel: Uniform;
        cameraNear: Uniform;
        cameraFar: Uniform;
        resolution: Uniform;
        cameraProjectionMatrix: Uniform;
        cameraInverseProjectionMatrix: Uniform;
        kernelRadius: Uniform;
        minDistance: Uniform;
        maxDistance: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface SSAODepthShader{
    defines : {
        PERSPECTIVE_CAMERA: number;
    };
    uniforms : {
        tDepth: Uniform;
        cameraNear: Uniform;
        cameraFar: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface SSAOBlurShader{
    uniforms : {
        tDiffuse: Uniform;
        resolution: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};
/**
 * References:
 * https://lettier.github.io/3d-game-shaders-for-beginners/screen-space-reflection.html
 */

export interface SSRShader {
    defines : {
        MAX_STEP: number;
        isPerspectiveCamera: boolean;
        isDistanceAttenuation: boolean;
        isFresnel: boolean;
        isInfiniteThick: boolean;
        isSelective: boolean;
    };
    uniforms : {
        tDiffuse: IUniform<Texture | null>;
        tNormal: IUniform<Texture | null>;
        tMetalness: IUniform<Texture | null>;
        tDepth: IUniform<Texture | null>;
        cameraNear: IUniform<number>;
        cameraFar: IUniform<number>;
        resolution: IUniform<Vector2>;
        cameraProjectionMatrix: IUniform<Matrix4>;
        cameraInverseProjectionMatrix: IUniform<Matrix4>;
        opacity: IUniform<number>;
        maxDistance: IUniform<number>;
        cameraRange: IUniform<number>;
        thickness: IUniform<number>;
    };
    vertexShader: string;
    fragmentShader: string;
}

export interface SSRDepthShader {
    defines : {
        PERSPECTIVE_CAMERA: number;
    };
    uniforms : {
        tDepth: IUniform<Texture | null>;
        cameraNear: IUniform<number>;
        cameraFar: IUniform<number>;
    };
    vertexShader: string;
    fragmentShader: string;
}

export interface SSRBlurShader {
    uniforms : {
        tDiffuse: IUniform<Texture | null>;
        resolution: IUniform<Vector2>;
        opacity: IUniform<number>;
    };
    vertexShader: string;
    fragmentShader: string;
}

export interface SSRrShader {
    defines : {
        MAX_STEP: number;
        PERSPECTIVE_CAMERA: boolean;
        SPECULAR: boolean;
        FILL_HOLE: boolean;
        INFINITE_THICK: boolean;
    };

    uniforms : {
        tDiffuse: IUniform<Texture | null>;
        tSpecular: IUniform<Texture | null>;
        tNormalSelects: IUniform<Texture | null>;
        tRefractive: IUniform<Texture | null>;
        tDepthSelects: IUniform<Texture | null>;
        cameraNear: IUniform<number | null>;
        cameraFar: IUniform<number | null>;
        resolution: IUniform<Vector2>;
        cameraProjectionMatrix: IUniform<Matrix4>;
        cameraInverseProjectionMatrix: IUniform<Matrix4>;
        ior: IUniform<number>;
        cameraRange: IUniform<number>;
        maxDistance: IUniform<number>;
        surfDist: IUniform<number>;
    };

    vertexShader: string;

    fragmentShader: string;
}

export interface SSRrDepthShader {
    defines : {
        PERSPECTIVE_CAMERA: number;
    };

    uniforms : {
        tDepth: IUniform<Texture | null>;
        cameraNear: IUniform<number | null>;
        cameraFar: IUniform<number | null>;
    };

    vertexShader: string;

    fragmentShader: string;
}

export interface SepiaShader{
    uniforms : {
        tDiffuse: Uniform;
        amount: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface SobelOperatorShader{
    uniforms : {
        tDiffuse: Uniform;
        resolution: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface SubsurfaceScatteringShader{
    uniforms : {
        alphaMap: Uniform;
        ambientLightColor: Uniform;
        color: Uniform;
        diffuse: Uniform;
        directionalLights: Uniform;
        directionalShadowMap: Uniform;
        directionalShadowMatrix: Uniform;
        emissive: Uniform;
        hemisphereLights: Uniform;
        lightProbe: Uniform;
        map: Uniform;
        opacity: Uniform;
        pointLights: Uniform;
        pointShadowMap: Uniform;
        pointShadowMatrix: Uniform;
        rectAreaLights: Uniform;
        shininess: Uniform;
        specular: Uniform;
        spotLights: Uniform;
        spotShadowMap: Uniform;
        spotShadowMatrix: Uniform;
        thicknessAmbient: Uniform;
        thicknessAttenuation: Uniform;
        thicknessColor: Uniform;
        thicknessDistortion: Uniform;
        thicknessMap: Uniform;
        thicknessPower: Uniform;
        thicknessScale: Uniform;
        uvTransform: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface TechnicolorShader{
    uniforms : {
        tDiffuse: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface ToneMapShader{
    uniforms : {
        tDiffuse: Uniform;
        averageLuminance: Uniform;
        luminanceMap: Uniform;
        maxLuminance: Uniform;
        minLuminance: Uniform;
        middleGrey: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface ToonShader1{
    uniforms : {
        uDirLightPos: Uniform;
        uDirLightColor: Uniform;
        uAmbientLightColor: Uniform;
        uBaseColor: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface ToonShader2{
    uniforms : {
        uDirLightPos: Uniform;
        uDirLightColor: Uniform;
        uAmbientLightColor: Uniform;
        uBaseColor: Uniform;
        uLineColor1: Uniform;
        uLineColor2: Uniform;
        uLineColor3: Uniform;
        uLineColor4: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface ToonShaderHatching{
    uniforms : {
        uDirLightPos: Uniform;
        uDirLightColor: Uniform;
        uAmbientLightColor: Uniform;
        uBaseColor: Uniform;
        uLineColor1: Uniform;
        uLineColor2: Uniform;
        uLineColor3: Uniform;
        uLineColor4: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface ToonShaderDotted{
    uniforms : {
        uDirLightPos: Uniform;
        uDirLightColor: Uniform;
        uAmbientLightColor: Uniform;
        uBaseColor: Uniform;
        uLineColor1: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface TriangleBlurShader{
    uniforms : {
        texture: Uniform;
        delta: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface UnpackDepthRGBAShader{
    uniforms : {
        tDiffuse: Uniform;
        opacity: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface VerticalBlurShader{
    uniforms : {
        tDiffuse: Uniform;
        v: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface VerticalTiltShiftShader{
    uniforms : {
        tDiffuse: Uniform;
        v: Uniform;
        r: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface VignetteShader{
    uniforms : {
        tDiffuse: Uniform;
        offset: Uniform;
        darkness: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface VolumeRenderShader1{
    uniforms : {
        u_size: Uniform;
        u_renderstyle: Uniform;
        u_renderthreshold: Uniform;
        u_clim: Uniform;
        u_data: Uniform;
        u_cmdata: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};

export interface WaterRefractionShader{
    uniforms : {
        color: Uniform;
        time: Uniform;
        tDiffuse: Uniform;
        tDudv: Uniform;
        textureMatrix: Uniform;
    };
    vertexShader: string;
    fragmentShader: string;
};
