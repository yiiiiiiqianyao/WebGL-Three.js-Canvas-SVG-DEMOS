WebGL2RenderingContext.texImage3D(...)      
用于指定一个 3D 纹理贴图或者是指定一个 2D 纹理数组

```javascript
void gl.texImage3D(target, level, internalformat, width, height, depth, border, format, type, GLintptr offset);

void gl.texImage3D(target, level, internalformat, width, height, depth, border, format, type, HTMLCanvasElement source);

void gl.texImage3D(target, level, internalformat, width, height, depth, border, format, type, HTMLImageElement source);

void gl.texImage3D(target, level, internalformat, width, height, depth, border, format, type, HTMLVideoElement source);

void gl.texImage3D(target, level, internalformat, width, height, depth, border, format, type, ImageBitmap source);

void gl.texImage3D(target, level, internalformat, width, height, depth, border, format, type, ImageData source);

void gl.texImage3D(target, level, internalformat, width, height, depth, border, format, type, ArrayBufferView? srcData);

void gl.texImage3D(target, level, internalformat, width, height, depth, border, format, type, ArrayBufferView srcData, srcOffset);
```

https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL2RenderingContext/texImage3D