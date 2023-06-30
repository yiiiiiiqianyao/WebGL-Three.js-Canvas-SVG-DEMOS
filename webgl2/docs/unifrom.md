- 在 webgl2 中，普通 unform 的使用与 webgl1 的使用保持相同
- 在 webgl2 中支持 unifrom 数组
- 在 webgl2 中支持 unifrom 结构体

```GLSL 300
#version 300 es
 
in vec4 a_position;
uniform vec4 u_offset; // 普通 uniform 变量

uniform vec2 u_someVec2[3]; // unifrom 数组

struct SomeStruct { // unifrom 结构体
  bool active;
  vec2 someVec2;
};
uniform SomeStruct u_someThing;
 
void main() {
   gl_Position = a_position + u_offset;
}
```

```javascript
// 查找 uniform 的位置
var offsetLoc = gl.getUniformLocation(someProgram, "u_offset");
// 赋值
gl.uniform4fv(offsetLoc, [1, 0, 0, 0]);

// 对于 unifrom 数组我们可以一次性赋值也可以分别赋值
// 一次性赋值
var someVec2Loc = gl.getUniformLocation(someProgram, "u_someVec2"); // 查找 uniform 的位置
gl.uniform2fv(someVec2Loc, [1, 2, 3, 4, 5, 6]); // 一次性赋值

// 分别赋值
var someVec2Element0Loc = gl.getUniformLocation(someProgram, "u_someVec2[0]"); // 查找 uniform 的位置
var someVec2Element1Loc = gl.getUniformLocation(someProgram, "u_someVec2[1]");
var someVec2Element2Loc = gl.getUniformLocation(someProgram, "u_someVec2[2]");
gl.uniform2fv(someVec2Element0Loc, [1, 2]);  // set element 0 分别赋值
gl.uniform2fv(someVec2Element1Loc, [3, 4]);  // set element 1
gl.uniform2fv(someVec2Element2Loc, [5, 6]);  // set element 2

// 对于 unifrom 的结构体我们只能单独查找和赋值
var someThingActiveLoc = gl.getUniformLocation(someProgram, "u_someThing.active"); // 查找 uniform 的位置
var someThingSomeVec2Loc = gl.getUniformLocation(someProgram, "u_someThing.someVec2");
gl.uniform1fv(someVec2Element0Loc, [1]);
gl.uniform2fv(someVec2Element0Loc, [1, 2]);

```