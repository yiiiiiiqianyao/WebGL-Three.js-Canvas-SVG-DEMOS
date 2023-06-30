webgl2 默认支持顶点数组     

以程序对象 program 为区分，每个 program 都有自己的一个或者多个顶点属性，在绘制当前 program 的时候我们需要为其对应的顶点属性分配数据，其固定操作如下：

1. 在全局绑定点上绑定当前顶点属性对应的缓冲区

```js
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
```
2. 告诉顶点属性如何从缓冲区中读取数据
```js
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
```

在每一次 program 渲染中，我们要为当前 program vertexShader 中配置的每一个属性执行一次上述操作。

为了简化操作，我们可以使用顶点数组 vertexArray（在 webgl1 中需要使用对应扩展、在 webgl2 中默认支持），通过 vertexArray 我们在完成第一次 program 的创建后，在后续的渲染中只需要可以执行一次绑定操作即可完成对当前 program N 个属性的绑定操作，其固定操作如下。

```javascript
var vertexArray = gl.createVertexArray(); // 构建顶点数组

gl.bindVertexArray(vertexArray); // 绑定当前顶点数组

// 第一次创建，正常绑定使用

var vertexPosLocation = 0; // layout(location=0)
gl.enableVertexAttribArray(vertexPosLocation);

gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
gl.vertexAttribPointer(vertexPosLocation, 2, gl.FLOAT, false, 0, 0);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

gl.bindVertexArray(null); // 取消绑定

// 在后续渲染中 - demo
gl.bindVertexArray(vertexArrayMaps[mid][i]);
gl.drawElements(primitive.mode, primitive.indices.length, primitive.indicesComponentType, 0);
gl.bindVertexArray(null);
```

## gl.vertexAttribPointer(0, 4, GL_FLOAT, GL_FALSE, 0, 0);

第一个参数指定从索引0开始取数据，与顶点着色器中layout(location=0)对应。

第二个参数指定顶点属性大小。

第三个参数指定数据类型。

第四个参数定义是否希望数据被标准化（归一化），只表示方向不表示大小。

第五个参数是步长（Stride），指定在连续的顶点属性之间的间隔。上面传0和传4效果相同，如果传1取值方式为0123、1234、2345……

第六个参数表示我们的位置数据在缓冲区起始位置的偏移量。