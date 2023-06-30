在OpenGL4.0中，flat shading效果可以通过对着色器的输入和输出变量使用一个修饰符flat很方便的实现。
在顶点着色器的输出变量和片断着色器要使用作为颜色的输入变量前使用这个修饰符即可。
(这个修饰符表明了这个值在传递到片断着色器的时候没有插值发生。)
```GLSL 300
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

```GLSL 300
 #version 300 es
        precision highp float;
        precision highp int;

        flat in vec4 v_color;
        out vec4 color;

        void main()
        {
            color = v_color;
        }
```