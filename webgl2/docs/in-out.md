- in/ou用于定义渲染管线之间传递的变量
    顶点着色器中
    ```js
    in vec4 a_Position; // 等同于 webgl1 中 attibute vec4 a_Position;
    out vec2 v_uv; // 等同于 webgl1 中 varying vec2 v_uv;
    ```

    片元着色器中
    ```js
    in vec2 v_uv; // 等同于 webgl1 中 varying vec2 v_uv;
    out vec4 color; // 等同于 webgl1 中 gl_FragColor = color;
    ```
- uniform 变量在 shader 中的定义保持不变（与 1 相比）

- 顶点数组对象始终可用

- 着色器中可以获取纹理大小
```js
    vec2 size = textureSize(sampler, lod)
```

- GLSL中的矩阵函数
WebGL1中，如果需要获得矩阵的逆，你需要将它作为uniform传给着色器。
WebGL2 GLSL 300 es里有内置的inverse 函数，同样有转置函数transpose。