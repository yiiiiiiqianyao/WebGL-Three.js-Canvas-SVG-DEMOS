GLSL提供给我们一个叫做gl_FragDepth的输出变量，我们可以使用它来在着色器内设置片段的深度值。
要想设置深度值，我们直接写入一个0.0到1.0之间的float值到输出变量就可以了：

```javascript
gl_FragDepth = 0.0; // 这个片段现在的深度值为 0.0
```

如果着色器没有写入值到gl_FragDepth，它会自动取用gl_FragCoord.z的值。