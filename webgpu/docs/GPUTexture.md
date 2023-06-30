webGPU 通过 device 创建纹理，有三种纹理类型

```js
enum GPUTextureDimension {
  "1d",
  "2d",
  "3d",
};

const texture = device.createTexture({
  /* ... */
  dimension: "2d", // <- dimension 字段是 GPUTextureDimension 类型
  format: "depth24unorm-stencil8", // 创建 "depth24unorm-stencil8" 格式的纹理对象
    // "depth32float-stencil8" 创建 "depth32float-stencil8" 格式的纹理对象
})
```