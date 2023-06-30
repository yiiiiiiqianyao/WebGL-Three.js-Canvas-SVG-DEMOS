顶点着色器属性索引 layout(location = attribute index) in vec3 position;

 ``` GLSL 300
 #define POSITION_LOCATION 0
        #define COLOR_LOCATION 1
        
        precision highp float;
        precision highp int;

        layout(location = POSITION_LOCATION) in vec2 pos;
        layout(location = COLOR_LOCATION) in vec4 color;
```

布局限定符(layout)：布局限定符可以提供给单独的统一变量块，或者用于所有统一变量块。


- 在全局作用域内，为所以统一变量块设置默认布局的方法
``` GLSL 300
layout(shared, column_major) uniform;   // default if not

layout(packed, row_major) uniform;      // specified
```

- 提供给单独的统一变量块
``` GLSL 300
layout(std140) uniform TransformBlock
{
    mat4 matViewProj;
    layout(row_major) mat3 matNormal;
    mat3 matTexGen;
};
```

着色器输出变量的接口布局

如在使用 mtr 的情况下（multi target render）的时候指定输出变量的布局
``` GLSL 300        #version 300 es

        precision highp float;
        precision highp int;

        layout(location = 0) out vec4 color1;
        layout(location = 1) out vec4 color2;

        void main() {
            color1 = vec4(1.0, 0.0, 0.0, 1.0);
            color2 = vec4(0.0, 0.0, 1.0, 1.0);
        }
```