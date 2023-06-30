```wgsl
[[stage(vertex)]]   // 是内置关键词，用来声明这是顶点着色器
fn main([[builtin(vertex_index)]] VertexIndex : u32) -> [[builtin(position)]] vec4<f32> { // 定义了名字为main的函数，对应上文中的entryPoint
  var pos = array<vec2<f32>, 3>(
      vec2<f32>(0.0, 0.5),
      vec2<f32>(-0.5, -0.5),
      vec2<f32>(0.5, -0.5));
 
  return vec4<f32>(pos[VertexIndex], 0.0, 1.0); // 根据传入的下标VertexIndex，找到刚才定义数组具体值并返回，之前draw函数指定有3个顶点，这个顶点着色器就会运行3次，就能获取三个不同顶点了
}
```

```wgsl
[[stage(fragment)]] // 声明这是片元着色器
fn main() -> [[location(0)]] vec4<f32> {
  return vec4<f32>(1.0, 0.0, 0.0, 1.0);
}
```