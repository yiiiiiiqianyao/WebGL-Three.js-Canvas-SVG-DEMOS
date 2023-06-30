当我们希望与其他 buffer 共享数据或者是从一个 buffer 拷贝数据到另一个 buffer 的时候我们可以使用 copyBufferSubData 方法

The WebGL2RenderingContext.copyBufferSubData() method of the WebGL 2 API copies part of the data of a buffer to another buffer.

https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/copyBufferSubData

```javascript
gl.copyBufferSubData(readTarget, writeTarget, readOffset, writeOffset, size);
```

在使用 copyBufferSubData 之前我们需要为它准备好对应的 readTarget buffer 和 writeTarget buffer

```javascript
var vertices = new Float32Array([
    -1.0, -1.0,
    1.0, -1.0,
    1.0,  1.0,
    1.0,  1.0,
    -1.0,  1.0,
    -1.0, -1.0
]);

var vertexPosBufferSrc = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBufferSrc);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.bindBuffer(gl.COPY_READ_BUFFER, vertexPosBufferSrc);

var vertexPosBufferDst = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBufferDst);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices.length), gl.STATIC_DRAW);
gl.bindBuffer(gl.COPY_WRITE_BUFFER, vertexPosBufferDst);
```