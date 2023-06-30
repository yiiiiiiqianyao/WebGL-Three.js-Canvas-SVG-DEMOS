请求适配器 navigator.gpu.requestAdapter

适配器 GPUAdapter 对接的是物理显卡端，而对不同物理显卡在不同操作系统的现代图形 API（D3D12、Vulkan、Mental）的差异，则由 GPUDevice 来封装并提供统一的操作方法，例如创建 GPUBuffer、GPUBindGroup 等。

```js
const adapter = await navigator.gpu.requestAdapter()
const features = adapter.features;

device.features: GPUSupportedFeatures

enum GPUFeatureName {
    "depth-clamping",
    "depth24unorm-stencil8",
    "depth32float-stencil8",
    "pipeline-statistics-query",
    "texture-compression-bc",
    "timestamp-query",
}
```

webGPU 在请求适配器的时候可以选择传入非空的对象 GPURequestAdapterOptions、

```js
dictionary GPURequestAdapterOptions {
  GPUPowerPreference powerPreference;
  boolean forceFallbackAdapter = false;
};
enum GPUPowerPreference {
  "low-power",
  "high-performance"
};
```

- 适配器对象 GPUAdapter
我们请求到的适配器对象有以下常见的属性

```js
interface GPUAdapter {
  readonly attribute DOMString name;
  [SameObject] readonly attribute GPUSupportedFeatures features;
  [SameObject] readonly attribute GPUSupportedLimits limits;
  readonly attribute boolean isFallbackAdapter;

  Promise<GPUDevice> requestDevice(optional GPUDeviceDescriptor descriptor = {});
};
```

每个 GPUAdapter 都会带有一个 features 对象，在请求设备对象时只能用这个对象内的功能

只有在请求设备对象时，才能设置这个即将被创建的设备对象能有哪些功能

- 请求设备对象 requestDevice
