配置和加载纹理的流程
1、创建纹理对象、获取着色器中纹理采样器的地址
    var texture = gl.createTextue() // gl.deleteTexture(texture) - 删除一个纹理对象
    var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');

2、创建、获取图像对象
    var image = new Image();
    image.src = 'imgsrc';
    image.onLoad = () => { ... }

3、对纹理图像进行 Y 轴翻转（可以不进行）
    gl.pixelStorei(gl.TEXTURE0);

4、开启对应的纹理单元
    gl.activeTexture(gl.TEXTURE0); // 开启零号纹理单元

5、绑定纹理单元
    gl.bindTexture(gl.TEXTURE_2D, texture); 
    // 将纹理对象绑定到对应的纹理类型，确定我们使用那种类型的纹理

6、配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FLITER, gl.LINER);
    // gl.texParameteri(target, pname, param);
    // 可以同时设置多个纹理对象的参数、用来设置纹理图像映射到图形上的具体方式
    /*
    1、放大方法（uv没有超过1，且纹理的绘制区域比纹理本身的范围要大时生效）
        gl.TEXTURE_MAG_FILTER - 放大滤波
        默认参数：gl.LINEAR

    2、缩小方法（uv没有超过1，且纹理的绘制区域比纹理本身的范围要小时生效）
        gl.TEXTURE_MIN_FILTER - 缩小滤波
        默认参数：gl.NEAREST_MIPMAP_LINEAR

    3、水平填充方法（uv超过1的部分，纹理应该如何映射）
        gl.TEXTURE_WRAP_S
        默认参数：gl.REPEAT

    4、垂直填充方法（uv超过1的部分，纹理应该如何映射）
        gl.TEXTURE_WRAP_T
        默认参数：gl.REPEAT

    参数（params）
        gl.TEXTURE_MAG_FILTER/gl.TEXTURE_MIN_FILTER 可以选择的参数
            gl.NEAREST 使用原纹理距离映射后新像素中心最近的像素的颜色值
            gl.LINEAR  使用原纹理距离映射后新像素中心的四个像素颜色值的加权平均（效果更好、消耗更大）
            gl.NEAREST_MIPMAP_NEAREST
            gl.LINEAR_MIPMAP_NEAREST
            gl.NEAREST_MIPMAP_LINEAR
            gl.LINEAR_MIPMAP_LINEAR

        gl.TEXTURE_WRAP_S/gl.TEXTURE_WRAP_T 可以选择的参数
            gl.REPEAT           平铺
            gl.MIRRORED_REPEAT  镜像平铺
            gl.CLAMP_TO_EDGE    边缘像素
    */

7、配置纹理图像
    gl.texParameteri(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(target, level, imageFormat, textureFormat, dataType, image)
    // level, mipmap 的图片 mipmap 级别
    // 将纹理图像分配给纹理对象 - 将图片中的数据传送到纹理对象中

8、将纹理单元中的纹理对象传递给着色器中的取样器采样
    gl.uniforml1(u_Sampler, 0);


gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS - 浏览器的 webgl 支持的的纹理单元数量