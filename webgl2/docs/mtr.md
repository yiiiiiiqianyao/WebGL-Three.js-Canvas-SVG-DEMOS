webgl2 支持将 fbo 的绘制结果输出到多个目标纹理中，使用的基本步骤如下：
（在 webgl1 中需要使用 WEBGL_draw_buffers 的扩展实现）
1. 在 fbo 绘制的 shader 中指定输出的目标纹理
```GLSL 300 #version 300 es

    precision highp float;
    precision highp int;

    layout(location = 0) out vec4 color1;
    layout(location = 1) out vec4 color2;

    void main() {
        color1 = vec4(1.0, 0.0, 0.0, 1.0);
        color2 = vec4(0.0, 0.0, 1.0, 1.0);
    }
```
layout 指定输出变量接口的布局

2. 创建 fbo 并绑定多个输出目标（多个纹理）
```javascript
    var frameBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, frameBuffer);
    gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, color1Texture, 0);
    gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, color2Texture, 0);

    gl.drawBuffers([ // 指定当前帧缓存的绘制缓存
        gl.COLOR_ATTACHMENT0,
        gl.COLOR_ATTACHMENT1
    ]);
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
```

void gl.framebufferTexture2D(target, attachment, textarget, texture, level);

target：gl.DRAW_FRAMEBUFFER/gl.READ_FRAMEBUFFER

attachment：gl.DEPTH_STENCIL_ATTACHMENT/gl.COLOR_ATTACHMENT0/gl.COLOR_ATTACHMENT1...
    指定当前帧缓存的第几个缓存

textarget：gl.TEXTURE_2D/gl.TEXTURE_CUBE_MAP_POSITIVE_X/gl.TEXTURE_CUBE_MAP_NEGATIVE_X...

texture：A WebGLTexture object whose image to attach.

level：A GLint specifying the mipmap level of the texture image to be attached. Must be 0.