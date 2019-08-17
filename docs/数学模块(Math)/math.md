# properties
* DEG2RAD: Math.PI / 180
* RAD2DEG: 180 / Math.PI
# functions
* generateUUID() 用来生成一个36位的uuid通用唯一识别码
* clamp(value,min,max) 将输入的值 value 锁定在 min 和 max 之间
* mapLinear(x, a1, a2, b1, b2) 把 x 从范围 [a1, a2] 线性映射到 [b1, b2]
* euclideanModulo(x,y)  返回 y%x 
* randInt(low,high)     Random integer from <low, high> interval
* randFloat(low,high)   Random float from <low, high> interval
* randFloatSpread(range)Random float from <-range/2, range/2> interval
* isPowerOfTwo(value)   判断传入的 value 值是不是 2 的幂(倍数) 如 1、2、4、8、16、32...
* ceilPowerOfTwo(value) 将传入的 value 值向上 2 的幂取整
* floorPowerOfTwo(value)将传入的 value 值向下 2 的幂取整
* radToDeg(radians)     将传入的弧度值转换为角度值并返回
* degToRad(degrees)     将传入的角度值转换为弧度值并返回
* lerp(x,y t)           计算插值 t 是 0-1 之间的值  返回 x*(1-t) + y*t
* smoothstep( x, min, max )   与lerp类似，在最小和最大值之间的插值，并在限制处渐入渐出。三次平滑插值
* smootherstep( x, min, max ) 与lerp类似，在最小和最大值之间的插值，并在限制处渐入渐出。三次平滑插值