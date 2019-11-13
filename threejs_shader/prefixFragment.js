var prefixFragment = [

    customExtensions,

    'precision ' + parameters.precision + ' float;',
    'precision ' + parameters.precision + ' int;',

    '#define SHADER_NAME ' + shader.name,

    customDefines,

    parameters.alphaTest ? '#define ALPHATEST ' + parameters.alphaTest + ( parameters.alphaTest % 1 ? '' : '.0' ) : '', // add '.0' if integer

    '#define GAMMA_FACTOR ' + gammaFactorDefine,

    ( parameters.useFog && parameters.fog ) ? '#define USE_FOG' : '',
    ( parameters.useFog && parameters.fogExp ) ? '#define FOG_EXP2' : '',

    parameters.map ? '#define USE_MAP' : '',
    parameters.matcap ? '#define USE_MATCAP' : '',
    parameters.envMap ? '#define USE_ENVMAP' : '',
    parameters.envMap ? '#define ' + envMapTypeDefine : '',
    parameters.envMap ? '#define ' + envMapModeDefine : '',
    parameters.envMap ? '#define ' + envMapBlendingDefine : '',
    parameters.lightMap ? '#define USE_LIGHTMAP' : '',
    parameters.aoMap ? '#define USE_AOMAP' : '',
    parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
    parameters.bumpMap ? '#define USE_BUMPMAP' : '',
    parameters.normalMap ? '#define USE_NORMALMAP' : '',
    ( parameters.normalMap && parameters.objectSpaceNormalMap ) ? '#define OBJECTSPACE_NORMALMAP' : '',
    parameters.specularMap ? '#define USE_SPECULARMAP' : '',
    parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
    parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
    parameters.alphaMap ? '#define USE_ALPHAMAP' : '',

    parameters.vertexTangents ? '#define USE_TANGENT' : '',
    parameters.vertexColors ? '#define USE_COLOR' : '',

    parameters.gradientMap ? '#define USE_GRADIENTMAP' : '',

    parameters.flatShading ? '#define FLAT_SHADED' : '',

    parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
    parameters.flipSided ? '#define FLIP_SIDED' : '',

    parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
    parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

    parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',

    parameters.physicallyCorrectLights ? '#define PHYSICALLY_CORRECT_LIGHTS' : '',

    parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
    parameters.logarithmicDepthBuffer && ( capabilities.isWebGL2 || extensions.get( 'EXT_frag_depth' ) ) ? '#define USE_LOGDEPTHBUF_EXT' : '',

    parameters.envMap && ( capabilities.isWebGL2 || extensions.get( 'EXT_shader_texture_lod' ) ) ? '#define TEXTURE_LOD_EXT' : '',

    'uniform mat4 viewMatrix;',
    'uniform vec3 cameraPosition;',

    ( parameters.toneMapping !== NoToneMapping ) ? '#define TONE_MAPPING' : '',
    ( parameters.toneMapping !== NoToneMapping ) ? ShaderChunk[ 'tonemapping_pars_fragment' ] : '', // this code is required here because it is used by the toneMapping() function defined below
    ( parameters.toneMapping !== NoToneMapping ) ? getToneMappingFunction( 'toneMapping', parameters.toneMapping ) : '',

    parameters.dithering ? '#define DITHERING' : '',

    ( parameters.outputEncoding || parameters.mapEncoding || parameters.matcapEncoding || parameters.envMapEncoding || parameters.emissiveMapEncoding ) ?
        ShaderChunk[ 'encodings_pars_fragment' ] : '', // this code is required here because it is used by the various encoding/decoding function defined below
    parameters.mapEncoding ? getTexelDecodingFunction( 'mapTexelToLinear', parameters.mapEncoding ) : '',
    parameters.matcapEncoding ? getTexelDecodingFunction( 'matcapTexelToLinear', parameters.matcapEncoding ) : '',
    parameters.envMapEncoding ? getTexelDecodingFunction( 'envMapTexelToLinear', parameters.envMapEncoding ) : '',
    parameters.emissiveMapEncoding ? getTexelDecodingFunction( 'emissiveMapTexelToLinear', parameters.emissiveMapEncoding ) : '',
    parameters.outputEncoding ? getTexelEncodingFunction( 'linearToOutputTexel', parameters.outputEncoding ) : '',

    parameters.depthPacking ? '#define DEPTH_PACKING ' + material.depthPacking : '',

    '\n'

].filter( filterEmptyLine ).join( '\n' );

prefixFragment = [
    '#version 300 es\n',
    '#define varying in',
    isGLSL3ShaderMaterial ? '' : 'out highp vec4 pc_fragColor;',
    isGLSL3ShaderMaterial ? '' : '#define gl_FragColor pc_fragColor',
    '#define gl_FragDepthEXT gl_FragDepth',
    '#define texture2D texture',
    '#define textureCube texture',
    '#define texture2DProj textureProj',
    '#define texture2DLodEXT textureLod',
    '#define texture2DProjLodEXT textureProjLod',
    '#define textureCubeLodEXT textureLod',
    '#define texture2DGradEXT textureGrad',
    '#define texture2DProjGradEXT textureProjGrad',
    '#define textureCubeGradEXT textureGrad'
].join( '\n' ) + '\n' + prefixFragment;