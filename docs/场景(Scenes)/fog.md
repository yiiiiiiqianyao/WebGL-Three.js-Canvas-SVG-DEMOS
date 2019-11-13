# Fog
	这个类包含定义线性雾的参数，也就是说，密度随着距离的增加呈线性增长。

# 构造器（Constructor）
	Fog( color, near, far )

# Properties
* name = '' 默认为空字符串
* color = new Color( color ) 雾的颜色。比如：如果设置为黑色，远处的物体将被渲染为黑色

* near = ( near !== undefined ) ? near : 1 开始应用雾的最小距离。距离当前相机小于near个单位的对象，将不会受到雾的影响。
	缺省为 1
* far = ( far !== undefined ) ? far : 1000 结束应用雾的最大距离。距离当前相机大于far个单位的对象，将不会受到雾的影响。
	缺省为 1000

# functions

* clone () 返回一个副本  
        ```return new Fog( this.color, this.near, this.far )```
* toJSON()  
        ```return {
			type: 'Fog',
			color: this.color.getHex(),
			near: this.near,
			far: this.far
		}```