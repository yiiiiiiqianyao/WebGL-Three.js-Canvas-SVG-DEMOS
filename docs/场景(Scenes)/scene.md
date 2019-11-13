# Scene

	场景允许你设置哪些对象被three.js渲染以及渲染在哪里。我们在场景中放置对象、灯光和相机。

# Propertyies

* type = 'Scene'
* Object3D.call( this )     // 场景对象的基类是 Object3D 对象
* background = null         // 默认没有设置背景
* fog = null                // 默认场景不受雾化影响
* overrideMaterial = null   // 默认没有场景覆盖纹理
* autoUpdate = true         // 默认自动更新

# functions

* copy(source, recursive)  该方法继承自object3D对象 将传入的 source 对象复制到当前的场景对象中 recursive是bool值，若为 true 则 source 对象的子对象也将会被复制
* toJSON(meta) 继承自 Object3D 对象 以json格式返回场景数据
* dispose() 清除当前场景对象在 render 中的缓存