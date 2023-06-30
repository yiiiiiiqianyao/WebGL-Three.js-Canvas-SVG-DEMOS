- webgl2 支持在 shader 中直接获取 texture 的大小
```js
vec2 size = textureSize(sampler, lod)
```