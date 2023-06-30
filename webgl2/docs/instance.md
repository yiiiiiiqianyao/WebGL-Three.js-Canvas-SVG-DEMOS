实例化技术的实现思路就是把原本的uniform变量，比如变换矩阵，变成attribute变量，然后把多个对象的矩阵数据，写在一起，然后创建所有矩阵的VBO对象
https://zhuanlan.zhihu.com/p/50173825

和普通的VBO差异的部分：该缓冲区可以在多个对象之间共享。每个对象 取该缓冲区的一部分数据，作为attribute变量的值
```js
// gl.vertexAttribDivisor方法指定缓冲区中的每一个值，用于多少个对象
gl.vertexAttribDivisor(index, divisor)
// index表示的attribute变量的地址
// divisor = 1，表示每一个值用于一个对象；如果divisor=2，表示一个值用于两个对象

```

最后，通过调用如下方法进行绘制
```js
gl.drawArraysInstanced(mode, first, count, instanceCount);
gl.drawElementsInstanced(mode, count, type, offset, instanceCount);
// instanceCount  表示一次绘制多少个对象
```

通过 gl_InstanceID 可以在 shader 中获取实例对象的索引
```glsl
 #version 300 es
        #define POSITION_LOCATION 0
        #define COLOR_LOCATION 1
        
        precision highp float;
        precision highp int;

        layout(location = POSITION_LOCATION) in vec2 pos;
        layout(location = COLOR_LOCATION) in vec4 color;
        flat out vec4 v_color;

        void main()
        {
            v_color = color;
            gl_Position = vec4(pos + vec2(float(gl_InstanceID) - 0.5, 0.0), 0.0, 1.0);
        }
```