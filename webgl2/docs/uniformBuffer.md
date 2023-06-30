webgl2 允许用户通过 uniformBuffer 一次性传递多个 uniform 变量

```GLSL 300
uniform Light {
    highp vec3 lightWorldPos;
    mediump vec4 lightColor;
} u_light; // 具名 uniform 块

uniform Matrix { // gl.getUniformBlockIndex(program, 'Matrix'); 1
    mat4 modelMatrix;
};  // 不具名 uniform 块，不具名 UBO 中的 uniform 变量不能与其他 UBO/Uniform 变量共名

vec3 pos = u_light.lightWorldPos;
mat4 mat = modelMatrix;
```

```javascript 
// 对应的 JS 
const lightUniformBlockBuffer = gl.createBuffer(); // create UBO
const lightUnifromBlockData = new Float32Array([
    0, 10, 30, 0,   // vec3 lightWorldPos，为了 8 byte 对齐因此在尾部填充一个 0
    1, 1, 1, 1,     // vec4 lightColor
]);


gl.bindBuffer(gl.UNIFORM_BUFFER, lightUniformBlockBuffer); // 绑定当前的 UBO
gl.bufferData(gl.UNIFORM_BUFFER, lightUnifromBlockData, gl.DYNAMIC_DRAW); // 将数据写入到当前绑定到 UBO


const uniformLightLocation = gl.getUniformBlockIndex(program, 'Light'); // 获取 UBO 在 webgl 程序中的索引位置
// UBO 的默认位置与其在 shader 中的位置相关
/**
 * VS：
 * uniform Light { // gl.getUniformBlockIndex(program, 'Light'); 0
 *  mediump vec4 lightColor;
 * } u_light;
 * 
 * uniform Matrix { // gl.getUniformBlockIndex(program, 'Matrix'); 1
 *  mat4 modelMatrix;
 * } u_Matrix;
 * 
 * FS：
 * unifrom Animate { // gl.getUniformBlockIndex(program, 'Animate'); 2
 *  float speed;
 * } u_animate;
 * 
 * */

gl.uniformBlockBinding(program, uniformLightLocation, 0); // 可以主动将着色器程序中的 UBO 位置绑定到某个位置
// 改变的是两个索引位置

gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, lightUniformBlockBuffer); // 将 UBO 绑定到 0 号索引对应的 uniformLocation 以供 shader 使用

// 我们还可以使用 gl.bindBufferBase 更新指定索引位置的 UBO
gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, newlightUniformBlockBuffer);

// gl.TRANSFORM_FEEDBACK_BUFFER/gl.UNIFORM_BUFFER
// gl.bindBufferRange/gl.bindBufferBase
```

