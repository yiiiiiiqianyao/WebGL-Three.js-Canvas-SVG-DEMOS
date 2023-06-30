glReadBuffer — 选择像素的颜色缓冲源

```javascript
void glReadBuffer( GLenum src);
```

src
指定颜色缓冲区。 可接受的值为GL_BACK，GL_NONE和GL_COLOR_ATTACHMENTi。

glReadBuffer指定颜色缓冲区作为后续glReadPixels，glCopyTexImage2D，glCopyTexSubImage2D和glCopyTexSubImage3D命令的源。 src接受以下值之一：GL_NONE，GL_BACK（命名默认帧缓冲区的后缓冲区），而GL_COLOR_ATTACHMENTi（命名当前帧缓冲区的颜色附件）。