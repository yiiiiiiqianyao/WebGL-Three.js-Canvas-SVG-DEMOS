regl 实现有三步
1. 获取的上下文对象需要支持模版缓冲
```js
 var gl = canvas.getContext('webgl', {
            antialias: true,
            stencil: true
          })
```
2. 绘制蒙层
```js
 const createMask = this.regl({
            stencil: {
                enable: true,
                mask: 0xff,
                func: {
                    cmp: 'always',
                    ref: 1,
                    mask: 0xff
                },
                opFront: {
                    fail: 'replace',
                    zfail: 'replace',
                    zpass: 'replace'
                }
            },
            // we want to write only to the stencil buffer,
            // so disable these masks.
            colorMask: [false, false, false, false],
            depth: {
                enable: true,
                mask: false
            }
        })
createMask(() => { // create mask
            whiteTilesMesh.draw({ scale: FLOOR_SCALE, color: TILE_WHITE, alpha: TILE_ALPHA })
          })
```
3. 绘制物体主要支持蒙层
```js
 const drawReflect = this.regl({
            uniforms: {
                yScale: -1.0
            },
            cull: {
                // must do this, since we mirrored the mesh.
                enable: true,
                face: 'front'
            },
            stencil: {
                enable: true,
                mask: 0xff,
                func: {
                    cmp: 'equal',
                    ref: 1,
                    mask: 0xff
                }
            }
        })

 drawReflect(() => { // draw reflect bunnys
              drawMeshes()
          })
```