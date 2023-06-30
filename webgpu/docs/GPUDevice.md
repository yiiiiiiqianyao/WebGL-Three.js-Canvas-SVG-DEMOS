WebGPU 通过 adapter 适配器对象请求得到 GPUDevice 设备对象，GPUDevice 用来来封装并提供统一的操作方法

```js
const device = await adapter.requestDevice();
```
在请求设备的时候可以传入描述对象，用于描述适配器请求一个怎样的设备对象。

```js
dictionary GPUDeviceDescriptor : GPUObjectDescriptorBase {
  sequence<GPUFeatureName> requiredFeatures = [];
  record<DOMString, GPUSize64> requiredLimits = {};
};

enum GPUFeatureName {
  "depth-clamping",
  "depth24unorm-stencil8",
  "depth32float-stencil8",
  "pipeline-statistics-query",
  "texture-compression-bc",
  "timestamp-query",
};
```

GPUDevice 是 WebGPU 的顶级对象，类似 WebGL 的 gl 实例，可以创建其他对象

```js
interface GPUDevice : EventTarget {
  [SameObject] readonly attribute GPUSupportedFeatures features;
  [SameObject] readonly attribute GPUSupportedLimits limits;
  [SameObject] readonly attribute GPUQueue queue;

  undefined destroy();

  GPUBuffer createBuffer(GPUBufferDescriptor descriptor);
  GPUTexture createTexture(GPUTextureDescriptor descriptor);
  GPUSampler createSampler(optional GPUSamplerDescriptor descriptor = {});
  GPUExternalTexture importExternalTexture(GPUExternalTextureDescriptor descriptor);

  GPUBindGroupLayout createBindGroupLayout(GPUBindGroupLayoutDescriptor descriptor);
  GPUPipelineLayout createPipelineLayout(GPUPipelineLayoutDescriptor descriptor);
  GPUBindGroup createBindGroup(GPUBindGroupDescriptor descriptor);

  GPUShaderModule createShaderModule(GPUShaderModuleDescriptor descriptor);
  GPUComputePipeline createComputePipeline(GPUComputePipelineDescriptor descriptor);
  GPURenderPipeline createRenderPipeline(GPURenderPipelineDescriptor descriptor);
  Promise<GPUComputePipeline> createComputePipelineAsync(GPUComputePipelineDescriptor descriptor);
  Promise<GPURenderPipeline> createRenderPipelineAsync(GPURenderPipelineDescriptor descriptor);

  GPUCommandEncoder createCommandEncoder(optional GPUCommandEncoderDescriptor descriptor = {});
  GPURenderBundleEncoder createRenderBundleEncoder(GPURenderBundleEncoderDescriptor descriptor);

  GPUQuerySet createQuerySet(GPUQuerySetDescriptor descriptor);
};
```