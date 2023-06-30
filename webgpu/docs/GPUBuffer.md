1. 什么事 GPUBuffer ？
GPUBuffer 表示一块显存区域，有些 GPUBuffer 可以被映射，被映射后的 GPUBuffer 可以在 CPU 中通过 ArrayBuffer 进行访问

2. GPUBuffer 的创建，通过 GPUBufferDescriptor 类型对象来描述一个 GPUBuffer

可以通过设备对象来创建
```js
dictionary GPUBufferDescriptor : GPUObjectDescriptorBase {
  required GPUSize64 size;
  required GPUBufferUsageFlags usage;
  boolean mappedAtCreation = false;
};

const buffer = device.createBuffer(descriptor);
```

ps: 
  descriptor.usage 不能同时设置 MAP_READ 和 MAP_WRITE
  descriptor.usage 被设为 MAP_READ，那么联合的用法只能是 COPY_DST
  descriptor.usage 被设为 MAP_WRITE，那么联合的用法只能是 COPY_SRC
  descriptor.mappedAtCreation 被设为 true，那么 descriptor.size 必须是 4 的倍数

  2.1 使用 GPUBufferUsage 来标识 GPUBuffer 对象的用途
  ```js
  namespace GPUBufferUsage {
    const GPUFlagsConstant MAP_READ      = 0x0001; // 映射并用来读取
    const GPUFlagsConstant MAP_WRITE     = 0x0002; // 映射并用来写入
    const GPUFlagsConstant COPY_SRC      = 0x0004; // 可以作为拷贝源
    const GPUFlagsConstant COPY_DST      = 0x0008; // 可以作为拷贝目标
    const GPUFlagsConstant INDEX         = 0x0010; // 索引缓存
    const GPUFlagsConstant VERTEX        = 0x0020; // 顶点缓存
    const GPUFlagsConstant UNIFORM       = 0x0040; // Uniform 缓存
    const GPUFlagsConstant STORAGE       = 0x0080; // 仅存储型缓存
    const GPUFlagsConstant INDIRECT      = 0x0100; // 间接使用
    const GPUFlagsConstant QUERY_RESOLVE = 0x0200; // 用于查询
  };
  ```

3. GPUBuffer 的类型
webGPU 创建的 GPUBuffer 有多种类型，在不同的使用场景中我们应该创建不同类型的 GPUBuffer

```js
// 在支持 WebGPU 的环境中存在 GPUBufferUsage 命名空间
namespace GPUBufferUsage {
  const GPUFlagsConstant MAP_READ      = 0x0001;
  const GPUFlagsConstant MAP_WRITE     = 0x0002;
  const GPUFlagsConstant COPY_SRC      = 0x0004;
  const GPUFlagsConstant COPY_DST      = 0x0008;
  const GPUFlagsConstant INDEX         = 0x0010;
  const GPUFlagsConstant VERTEX        = 0x0020;
  const GPUFlagsConstant UNIFORM       = 0x0040;
  const GPUFlagsConstant STORAGE       = 0x0080;
  const GPUFlagsConstant INDIRECT      = 0x0100;
  const GPUFlagsConstant QUERY_RESOLVE = 0x0200;
};
```

4. GPUBuffer 对象的映射
GPUBuffer 对象在进行映射操作后可以在 CPU 中进行访问，此时这一块显存无法被 GPU 使用，因此在 GPUBuffer 提交给队列使用之前需要调用 unmap 方法解除映射。

- mapAsync 异步映射方法，返回的无定义的 Promise，有三个参数
mode: GPUMapMode 表示映射之后用来干什么，这个是必选参数
offset: unsigned longlong 表示从哪里开始映射，字节数量，默认是 0，必须是 8 的倍数
size: unsigned longlong 表示映射多少大小，字节数量，默认是 GPUBuffer 申请显存的大小减去 offset 的差，必须是 4 的倍数

```js
await buffer.mapAsync(mode);
```

- getMappedRange 获取映射后的范围，以 ArrayBuffer 表示
offset: 可选参数，表示从申请的显存的哪个字节开始获取，如果不给就是 0；必须是 8 的倍数且不超申请的大小
size: 可选参数，表示要多长，如果不给就是申请的显存的最大值减去 offset 的差；是 4 的倍数

- unmap 取消映射
- destroy 销毁并回收此 GPUBuffer 指向的显存

使用 device 创建 buffer

```js
const buffer = device.createBuffer({
    // 因为字面量是二进制数字值，所以可以用位运算来实现多种类型并设：
  usage: GPUBufferUsage.UNIFORM,
  /* ... */
})

const buffer = device.createBuffer({
  usage: GPUBufferUsage.VERTEX | GPUBufferUsage.MAP_WRITE,
  /* ... */
})
```

https://czhuanlan.zhihu.com/p/412773050