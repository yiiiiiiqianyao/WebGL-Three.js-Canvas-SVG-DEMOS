webgl2 在原有的 framebuffer target gl.FRAMEBUFFER 之上增加了 gl.DRAW_FRAMEBUFFER/gl.READ_FRAMEBUFFER

```javascript
void gl.bindFramebuffer(target, framebuffer);
```

- target 
gl.FRAMEBUFFER: 收集用于渲染图像的颜色，alpha，深度和模板缓冲区的缓冲区数据存储。 (webgl1)

gl.DRAW_FRAMEBUFFER: 相当于gl.FRAMEBUFFER， 用作绘图，渲染，清除和写入操作。(webgl2)

gl.READ_FRAMEBUFFER: 用作读取操作的资源.(webgl2)

- framebuffer
要绑定的 WebGLFramebuffer 对象。


🌟 为什么要使用 gl.DRAW_FRAMEBUFFER/gl.READ_FRAMEBUFFER
1. WebGL2RenderingContext.blitFramebuffer()
transfers a block of pixels from the read framebuffer to the draw framebuffer. Read and draw framebuffers are bound using

blitFramebuffer 绑定使用 gl.DRAW_FRAMEBUFFER/gl.READ_FRAMEBUFFER

2. readPixels


gl.drawBuffers  defines draw buffers to which fragment colors are written into

该方法用于定义（指定）将要被写入数据的绘制缓存
The draw buffer settings are part of the state of the currently bound framebuffer or the drawingbuffer if no framebuffer is bound.

```javascript
void gl.drawBuffers(buffers);
```
- buffers：specifying the buffers into which fragment colors will be written. 
Possible values are:
    gl.NONE: Fragment shader output is not written into any color buffer.
    gl.BACK: Fragment shader output is written into the back color buffer.
    gl.COLOR_ATTACHMENT{0-15}: Fragment shader output is written in the nth color attachment of the current framebuffer.