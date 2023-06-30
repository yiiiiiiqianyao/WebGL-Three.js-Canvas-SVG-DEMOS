1. 原生WebGL的shader中若是没有被使用到的变量无法在 gl 中获取地址

2. 缓冲区对象用于传递将多个顶点数据传递给顶点着色器

3. 在使用 enableVertexAttribArray 分配缓冲区后要记得使用 disableVertexAttribArray 关闭分配

4. webgl 多纹理使用方案，一是多次绘制，二是同时使用多个纹理单元（webgl 支持的纹理单元数量和系统、硬件浏览器的 WebGL 实现）
    gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS // 获取当前 webgl 支持的纹理单元数量

5. gl.texParameteri // 配置纹理对象中纹理的填充方式

6. attribute 变量只能出现在顶点着色器中传递顶点信息、且能容纳的数量是有限的，具体的上限与设备相关

7. precision mediump float; 我们需要在片元着色器中手动指定 float 类型的精度，因为在片元着色器中的 float 类型没有默认的
   精度，缺失会导致如下的编译错误：Failed to compile shader: ERROR: 0:6: '' : No precision specified for (float)

8. modelMatrix: 模型矩阵，表示模型的姿态（位置、角度）
   viewMatrix: 视图矩阵，表示相机的姿态（位置、角度）
   projectMatrix: 投影矩阵，表示相机的成像投影的方式（正交｜透视）
   gl_Position = projectMatrix * viewMatrix * modelMatrix * a_Position;

9. 在一个场景中只有一个下相机的情况下，场景中的所有物体，在顶点着色器中使用同一个 projectMatrix、viewMatrix

10. 开启隐藏面消除（深度测试）  gl.enable(gl.DEPTH_TEST) // 开启深度测试
                            gl.clear(gl.DEPTH_BUFFER_BIT) // 清除深度缓冲区（绘制任意一帧之前都需要执行）

11. 当出现深度冲突的时候 webgl 提供了多边形偏移的方法来

12. 使用 dFdx/dFdy
    gl.getExtension('OES_standard_derivatives');
    
     #ifdef GL_OES_standard_derivatives
        #extension GL_OES_standard_derivatives : enable
    #endif

13. gl_PointCoord 点精灵坐标纹理， 是内置变量，还有 gl_FrontFacing、gl_FragCoord

14. 在每一次绘制命令完成后，执行对应资源的解除绑定操作很重要
        
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);

15. gl_FragCoord 是个vec4，四个分量分别对应 x, y, z 和 1/w
    x和y是当前片元的窗口相对坐标，不过它们不是整数，小数部分恒为0.5。x - 0.5和y - 0.5分别位于[0, windowWidth - 1]和[0, windowHeight - 1]内
    windowWidth和windowHeight都以像素为单位，亦即用glViewPort指定的宽高.
    w 即为乘过了投影矩阵之后点坐标的 w，用于perspective divide的那个值。
    gl_FragCoord.z / gl_FragCoord.w可以得到当前片元和camera之间的距离。
