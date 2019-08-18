# FogExp2
	这个类包含定义指数雾的参数，也就是说，密度随距离呈指数级增长。

# 构造器（Constructor）
	FogExp2( color, density )

# Properties

* name = '' 默认为空字符串
* color = new Color( color ) 雾的颜色。比如：如果设置为黑色，远处的物体将被渲染为黑色
* density = ( density !== undefined ) ? density : 0.00025 定义雾密度的增长速度。缺省为 0.00025

# functions

* clone () 返回一个副本。 
    ```return new FogExp2( this.color, this.density )```
* toJSON()  
    ```
    return {
			type: 'FogExp2',
			color: this.color.getHex(),
			density: this.density
		}
    ```