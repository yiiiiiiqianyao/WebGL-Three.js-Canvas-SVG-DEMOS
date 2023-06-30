首先创建一个adapter

```js
// 获取适配器
const adapter = await navigator.gpu.requestAdapter(option);
// options { powerPreference: 'low-power' | 'high-performance' } 表示需要采用哪一种耗电类型的显卡

```

其次拿到具体设备
```js
const device = await adapter.requestDevice();
// 设备是一个实例化的对象，同一个adapter可以共享device实例，设备可以创建缓存，纹理，渲染管线，着色器模块
```

创建一个WebGPU Canvas Context实例
```js
const context = canvas.getContext('webgpu');
```
需要拿到canvas能绘制的最精细的像素
```js
const size = [
  canvas.clientWidth * devicePixelRatio,
  canvas.clientHeight * devicePixelRatio
]
```

然后需要声明图像色彩格式，比如brga8unorm，即用8位无符号整数和rgba来表示颜色，从adapter中也能直接获取
```js
const format = context.getPreferredFormat(adapter);
```

将参数配置化写入context中
```js
// 关联context和device实例
context.configure({
  device,
  format,
  size,
  usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
})
```

创建一个指令编码器 CommandEncoder，你需要让 GPU 执行的指令写入到 GPU 的指令缓冲区（例如我们要在渲染通道中输入顶点数据、设置背景颜色、绘制（draw call）等等）
```js
const cmdEncoder = device.createCommandEncoder();
```

创建一个渲染通道 RenderPass
```js
const renderPassDescriptor = {
  colorAttachments: [
    {
      view: context.getCurrentTexture().createView(),
      loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
      storeOp: 'store',
    },
  ],
};
// colorAttachments是必填字段 用于储存（或者临时储存）图像信息，可以将渲染结果存储到多个目标，所以这里是数组
// view 表示在哪里存储渲染结果的图像数据
// depthStencilAttachment 可选参数，表示附加在当前渲染通道用于储存渲染通道的深度信息和模板信息的附件
```

让指令编码器开启渲染管道
```js
const renderPassEncoder = cmdEncoder.beginRenderPass(renderPassDescriptor);
// 这里让cmd和renderpass产生了关联，接下来就可以运行pipeline了
```

创建渲染管线(pipeline)，这里会应用我们的着色器程序
```js
const pipeline = device.createRenderPipeline({
    vertex: {
      module: device.createShaderModule({
        code: triangleVertWGSL,  // 顶点着色器代码
      }),
      entryPoint: 'main',   // 入口函数
    },
    fragment: {
      module: device.createShaderModule({
        code: redFragWGSL,   // 片元着色器代码
      }),
      entryPoint: 'main',  // 入口函数
      targets: [
        {
          format: format,  // 即上文的最终渲染色彩格式
        },
      ],
    },
    primitive: {           // 绘制模式
      topology: 'triangle-list',   // 按照三角形绘制
    },
  });
```

将pipeline和passencoder产生关联
```js
renderPassEncoder.setPipeline(pipeline);
```

开始绘制
```js
renderPassEncoder.draw(3, 1, 0, 0);
/***
 * draw(op1, op2, op3, op4)
 * op1: 需要绘制的顶点数量
 * op2: 需要绘制几个实例
 * op3: 起始顶点位置
 * op4: 先绘制第几个实例
 * /
```

宣布绘制结束
```js
renderPassEncoder.end();
// 这行代码表示当前的渲染通道已经结束了，不再向 GPU 发送指令。
```

结束指令编码器并提交数据
```js
device.queue.submit([commandEncoder.finish()]);
```