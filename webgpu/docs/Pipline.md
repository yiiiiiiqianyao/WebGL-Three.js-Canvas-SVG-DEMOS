WebGPU 有两种 pipeline:
    render pipeline
    compute pipeline

1. renderPipeline
可以类比 webgl 的 program 对象

```js
const renderPipeline = device.createRenderPipeline({
  /*...*/,
  primitive: {
    /* ... */,
    clampDepth: false, // 设置为 true 开始 GPUPrimitiveState 接口的 clampDepth
  }
})
```