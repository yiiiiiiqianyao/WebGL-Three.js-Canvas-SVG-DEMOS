WebGPU 有三个类型的 Uniform 资源：标量/向量/矩阵、纹理、采样器。
标量/向量/矩阵     GPUBuffer
纹理              GPUTexture
采样器            GPUSampler

资源绑定组，上述三类资源，把它们通过打成一组，也就是 GPUBindGroup
```js
const someUbo = device.createBuffer({ /* 注意 usage 要有 UNIFORM */ })
const texture = device.createTexture({ /* 创建常规纹理 */ })
const sampler = device.createSampler({ /* 创建常规采样器 */ })
 
// 布局对象联系管线布局和绑定组本身
const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0, // <- 绑定在 0 号资源
      visibility: GPUShaderStage.FRAGMENT,
      sampler: {
        type: 'filtering'
      }
    },
    {
      binding: 1, // <- 绑定在 1 号资源
      visibility: GPUShaderStage.FRAGMENT,
      texture: {
        sampleType: 'float'
      }
    },
    {
      binding: 2,
      visibility: GPUShaderStage.FRAGMENT,
      buffer: {
        type: 'uniform'
      }
    }
  ]
})
const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [
    {
      binding: 0,
      resource: sampler, // <- 传入采样器对象
    },
    {
      binding: 1,
      resource: texture.createView() // <- 传入纹理对象的视图
    },
    {
      binding: 2,
      resource: {
        buffer: someUbo // <- 传入 UBO
      }
    }
  ]
})

// 管线
const pipelineLayout = device.createPipelineLayout({
  bindGroupLayouts: [bindGroupLayout]
})
const renderingPipeline = device.createRenderPipeline({
  layout: pipelineLayout
  // ... 其它配置
})

// ... renderPass 切换 pipeline 和 bindGroup 进行绘制 ...
```

更新 Uniform 与绑定组的意义
如果是 UBO，一般会更新前端修改的灯光、材质、时间帧参数以及单帧变化的矩阵等，使用 device.queue.writeBuffer 即可
```js
device.queue.writeBuffer(
  someUbo, // 传给谁
  0, 
  buffer, // 传递 ArrayBuffer，即当前帧中的新数据
  byteOffset, // 从哪里开始
  byteLength // 取多长
)
// 使用 writeBuffer 就可以保证用的还是原来创建那个 GPUBuffer，它与绑定组、管线的绑定关系还在；不用映射、解映射的方式传值是减少 CPU/GPU 双端通信成本
```
