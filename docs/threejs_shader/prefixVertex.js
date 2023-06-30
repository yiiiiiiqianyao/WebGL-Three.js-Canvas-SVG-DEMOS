var prefixVertex = [

    'precision ' + parameters.precision + ' float;',
    'precision ' + parameters.precision + ' int;',

    '#define SHADER_NAME ' + shader.name,

    customDefines,

    parameters.supportsVertexTextures ? '#define VERTEX_TEXTURES' : '',

    '#define GAMMA_FACTOR ' + gammaFactorDefine,

    '#define MAX_BONES ' + parameters.maxBones,
    ( parameters.useFog && parameters.fog ) ? '#define USE_FOG' : '',
    ( parameters.useFog && parameters.fogExp ) ? '#define FOG_EXP2' : '',

    parameters.map ? '#define USE_MAP' : '',
    parameters.envMap ? '#define USE_ENVMAP' : '',
    parameters.envMap ? '#define ' + envMapModeDefine : '',
    parameters.lightMap ? '#define USE_LIGHTMAP' : '',
    parameters.aoMap ? '#define USE_AOMAP' : '',
    parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
    parameters.bumpMap ? '#define USE_BUMPMAP' : '',
    parameters.normalMap ? '#define USE_NORMALMAP' : '',
    ( parameters.normalMap && parameters.objectSpaceNormalMap ) ? '#define OBJECTSPACE_NORMALMAP' : '',
    parameters.displacementMap && parameters.supportsVertexTextures ? '#define USE_DISPLACEMENTMAP' : '',
    parameters.specularMap ? '#define USE_SPECULARMAP' : '',
    parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
    parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
    parameters.alphaMap ? '#define USE_ALPHAMAP' : '',

    parameters.vertexTangents ? '#define USE_TANGENT' : '',
    parameters.vertexColors ? '#define USE_COLOR' : '',

    parameters.flatShading ? '#define FLAT_SHADED' : '',

    parameters.skinning ? '#define USE_SKINNING' : '',
    parameters.useVertexTexture ? '#define BONE_TEXTURE' : '',

    parameters.morphTargets ? '#define USE_MORPHTARGETS' : '',
    parameters.morphNormals && parameters.flatShading === false ? '#define USE_MORPHNORMALS' : '',
    parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
    parameters.flipSided ? '#define FLIP_SIDED' : '',

    parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
    parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

    parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',

    parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
    parameters.logarithmicDepthBuffer && ( capabilities.isWebGL2 || extensions.get( 'EXT_frag_depth' ) ) ? '#define USE_LOGDEPTHBUF_EXT' : '',

    'uniform mat4 modelMatrix;',
    'uniform mat4 modelViewMatrix;',
    'uniform mat4 projectionMatrix;',
    'uniform mat4 viewMatrix;',
    'uniform mat3 normalMatrix;',
    'uniform vec3 cameraPosition;',

    'attribute vec3 position;',
    'attribute vec3 normal;',
    'attribute vec2 uv;',

    '#ifdef USE_TANGENT',

    '	attribute vec4 tangent;',

    '#endif',

    '#ifdef USE_COLOR',

    '	attribute vec3 color;',

    '#endif',

    '#ifdef USE_MORPHTARGETS',

    '	attribute vec3 morphTarget0;',
    '	attribute vec3 morphTarget1;',
    '	attribute vec3 morphTarget2;',
    '	attribute vec3 morphTarget3;',

    '	#ifdef USE_MORPHNORMALS',

    '		attribute vec3 morphNormal0;',
    '		attribute vec3 morphNormal1;',
    '		attribute vec3 morphNormal2;',
    '		attribute vec3 morphNormal3;',

    '	#else',

    '		attribute vec3 morphTarget4;',
    '		attribute vec3 morphTarget5;',
    '		attribute vec3 morphTarget6;',
    '		attribute vec3 morphTarget7;',

    '	#endif',

    '#endif',

    '#ifdef USE_SKINNING',

    '	attribute vec4 skinIndex;',
    '	attribute vec4 skinWeight;',

    '#endif',

    '\n'

].filter( filterEmptyLine ).join( '\n' );

prefixVertex = [
    '#version 300 es\n',
    '#define attribute in',
    '#define varying out',
    '#define texture2D texture'
].join( '\n' ) + '\n' + prefixVertex;