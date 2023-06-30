```javascript
// 在绑定 framebuffer 的时候记得同时设置 viewport
function bindFrambufferAndSetViewport(fb, width, height) {
   gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
   gl.viewport(0, 0, width, height);
}
```

- 帧缓冲没有深度缓冲，只有纹理、这意味着没有深度检测， 所以三维就不能正常体现
- 想要加深度缓冲就需要创建一个，然后附加到帧缓冲中

```javascript
// 创建一个深度缓冲
const depthBuffer = gl.createRenderbuffer();
gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
 
// 设置深度缓冲的大小和targetTexture相同
gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, targetTextureWidth, targetTextureHeight);
gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

```