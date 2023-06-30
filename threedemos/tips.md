当前片元和camera之间的距离：gl_FragCoord.z / gl_FragCoord.w
当前片元在屏幕上的坐标：gl_FragCoord.x/gl_FragCoord.y
当前片元的深度值：
世界坐标：worldPosition = modelMatrix * vec4( position, 1.0 );
开启高精度：precision highp float;

vec4 worldPosition = modelMatrix * vec4( position, 1.0 );

three.js中的投影运算
1. modelViewMatrix = camera.matrixWorldInverse * object.matrixWorld

2. viewMatrix = camera.matrixWorldInverse

3. modelMatrix = object.matrixWorld

4. project = applyMatrix4( camera.matrixWorldInverse ).applyMatrix4( camera.projectionMatrix )

5. unproject = applyMatrix4( camera.projectionMatrixInverse ).applyMatrix4( camera.matrixWorld )

6. gl_Position = projectionMatrix * modelViewMatrix * position
                      = projectionMatrix * camera.matrixWorldInverse * matrixWorld * position
                      = projectionMatrix * viewMatrix * modelMatrix * position

7. 找出一个点和一条线间的距离是经常遇见的几何问题之一。
    假设给出三个点，A，B和C，你想找出点C到点A、B定出的直线间距离。第一步是找出A到B的向量AB和A到C的向量AC，现在我们用该两向量的叉积除以|AB|，这就是我们要找的的距离了

--- three shader 中默认的参数

vertex shader
    
    normal: vec3
    normalMatrix
        => varying vec3 v_Normal = normalize(vec3(normalMatrix*normal)); // 计算各个差值后的片元的法向量
        <!-- https://blog.csdn.net/niuge8905/article/details/108967102 -->
    uv: vec2
    projectionMatrix: mat4
    modelViewMatrix: mat4
    modelMatrix: mat4
    position: vec3 // 模型坐标
       vec4 worldPosition = modelMatrix * vec4( position, 1.0 ); // 世界坐标
    gl_Position: vec4 = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

fragment shader

    gl_FragCoord: vec4
    gl_FragColor: vec4
    discard;    // 关键词 在 fragment shader 中使用，表示放弃渲染当前片元
    cameraPosition

functions
    fract
    step
    smoothstep
    sign
    abs
    floor
    ceil
    mix
    mod
    max
    min
    pow
    sqrt
    length: 
        float length(float x);
        float length(vec2 x);
        float length(vec3 x);
        float length(vec4 x); // 返回矢量 x 的长度
    cross: vec3 cross(vec3 x, vec3 y); // 返回 x 和 y 的差积
    dot: |a|*|b| 
    clamp
    texture2D
    distance(v1, v2)
    normalize
    sin
    cos
    tan
    asin
    acos
    atan
    radians: 角度转弧度
    degrees: 弧度转角度

    HLSL中的ddx和ddy，GLSL中的dFdx和dFdy/dFdy:
        是片元着色器中的一个用于计算任何变量基于屏幕空间坐标的变化率的指令。
        只能在片段着色器中使用。HLSL中的ddx和ddy，GLSL中的dFdx和dFdy
        需要在片元着色器前面加上: // 需要在 #ifdef 中做判断

         #ifdef GL_OES_standard_derivatives
            #extension GL_OES_standard_derivatives : enable
        #endif

        normalize(  cross(dFdx(pos),  dFdy(pos))  ); // 计算当前面的法线向量
        
        fwidth = dFdx + dFdy

        若是在原生 webgl 中使用还需要额外操作: gl.getExtension('OES_standard_derivatives');

    --- mapTexelToLinear
    --- objectNormal

    当代GPGPU在像素化的时候一般是以2x2像素为基本单位，那么在这个2x2像素块当中，右侧的像素对应的fragment的x坐标减去左侧的像素对应的fragment的x坐标就是ddx；下侧像素对应的fragment的坐标y减去上侧像素对应的fragment的坐标y就是ddy。ddx和ddy代表了相邻两个像素在设备坐标系当中的距离，据此可以判断应该使用哪一层的贴图LOD（如果贴图支持LOD，也就是MIPS）。这个距离越大表示三角形离开摄像机越远，需要使用更小分辨率的贴图；反之表示离开摄像机近，需要使用更高分辨率的贴图。


    fwidth（v） = abs( ddx(v) + ddy(v))

ddx(v) = 该像素点右边的v值 - 该像素点的v值 

ddy(v) = 该像素点下面的v值 - 该像素点的v值 


数据类型
    vec2/vec3/vec4
    float
    int
    sampler2D
    mat4
    bool

