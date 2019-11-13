# 3D场景中图形对象的基类
# 构造器（Constructor） Object3D() 该构造函数没有参数。

# Properties

* .id 只读 – 此对象实例的唯一编号。
* .uuid 该对象的UUID 由程序自动分配，所以不可编辑。
* .name 对象的可选名称（不需要是唯一的）
* .type = 'Object3D'
* .parent = null 该对象在场景图中的父对象。
* .children = [] 该对象的子对象数组。
* .position = new Vector3() 对象的局部位置。
* .rotation = new Euler() 对象的局部旋转，单位为弧度。 (欧拉角（Euler angles）)。
* .scale = new Vector3( 1, 1, 1 ) 对象的局部缩放因子。
* .up = Object3D.DefaultUp.clone() 空间的向上方向。缺省是 THREE.Vector3( 0, 1, 0 )
* .modelViewMatrix = new Matrix4()
* .normalMatrix =  new Matrix3()
* .matrix = new Matrix4() 对象变换矩阵
* .matrixWorld = new Matrix4() 对象世界矩阵
* .quaternion = new Quaternion() 使用Quaternion表示的对象局部旋转。
* .visible = true 是否可见，如果为true，则对象被渲染。 缺省值 – true
* .castShadow = false 是否被渲染到阴影映射中。 缺省值 – false
* .receiveShadow = false 材料接受阴影效果。 缺省值 – false
* .frustumCulled = true 当设置为true时，每一帧都会检查该对象是否在相机的视椎体中。否则，即使它是不可见的，对象也会得到绘制。 缺省值 – true
* .matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate 当设置为true时会自动更新矩阵，包括计算位置矩阵（旋转或四元数），逐帧缩放，也会重新计算世界矩阵（matrixWorld）属性。
	缺省值 – true
* .matrixWorldNeedsUpdate = false 当设置为true时，会计算该帧中的世界矩阵属性，然后重置该属性为false。 缺省值 – false
* .userData = {} 可以用来存储该Object3D对象的自定义数据，它不应该保存有函数的引用，因为这些不会被克隆。
* .matrixWorld 对象的全局变换。如果该Object3D没有父对象，那么它和局部变换相同。

# functions

# 内部使用的监听器 自动转换 欧拉角 和 四元数 
```
    function onRotationChange() {
		quaternion.setFromEuler( rotation, false )
	}

	function onQuaternionChange() {
		rotation.setFromQuaternion( quaternion, undefined, false )
	}

	rotation.onChange( onRotationChange )
	quaternion.onChange( onQuaternionChange )
```

* .applyMatrix ( matrix ) matrix - 矩阵 使用矩阵变换更新对象的位置、旋转和大小。
* .applyQuaternion(q)   变化四元数以达到更新对象的位置矩阵的效果
* .setRotationFromAxisAngle(axis, angle) 通过四元数的方式旋转任意坐标轴(参数axis)旋转角度(参数angle),最后将结果返回到this.quternion属性中
* .setRotationFromEuler(euler) 通过一次欧拉旋转(参数euler)设置四元数旋转,最后将结果返回到this.quternion属性中
* .setRotationFromMatrix(m) 利用一个参数m(旋转矩阵),达到旋转变换的目的吧,最后将结果返回到this.quternion属性中
* .setRotationFromQuaternion(q) 通过规范化的旋转四元数直接应用旋转
* .translateX ( distance ) distance - 距离。 沿X轴平移对象。
* .translateY ( distance ) distance - 距离。 沿Y轴平移对象。
* .translateZ ( distance ) distance - 距离。 沿Z轴平移对象。
* .rotateX ( rad ) rad - 以弧度为单位的旋转角度 在局部空间中绕X轴旋转对象。
* .rotateY ( rad ) rad - 以弧度为单位的旋转角度 在局部空间中绕Y轴旋转对象。
* .rotateZ ( rad ) rad - 以弧度为单位的旋转角度 在局部空间中绕Z轴旋转对象。
* .localToWorld ( vector ) vector - 一个局部向量 从局部空间到世界空间（全局空间）的向量转换。
* .worldToLocal ( vector ) vector - 一个全局向量 从世界空间到局部空间的向量转换。
* .lookAt ( vector ) vector - 一个世界向量观察点 旋转模型以面对观察点。
* .add ( object, ... ) object - 一个对象 添加 object 为该对象的子对象。可以添加任意数量的对象。
* .remove ( object, ... ) object - 一个对象 删除该对象中的 object 子对象。可以删除任意数量的对象。
* .traverse ( callback ) callback - 第一个参数为Object3D对象的回调函数。 在这个对象和所有的子对象上执行回调。
* .traverseVisible ( callback ) callback - 第一个参数为Object3D对象的回调函数。和 traverse 方法类似，但是这个callback将只在可见对象上执行。 不可见对象的后代不会被遍历。
* .traverseAncestors ( callback ) callback - 第一个参数为Object3D对象的回调函数。执行所有祖先的回调。
* .updateMatrix () 更新对象的局部变换。
* .updateMatrixWorld ( force ) 更新对象和它的子对象的全局变换。
* .clone ( recursive ) recursive -- 如果为true，对象的后代也会被克隆（概念上类似于C语言的深度拷贝）。默认是true。
	返回该对象的克隆以及可选的所有后代对象。
* .getObjectByName ( name ) name -- 和子对象的Object3d.name属性匹配的字符串 搜索对象的子对象，并返回第一个和name匹配的对象。
* .getObjectById ( id ) id -- 对象实例的唯一编号 搜索对象的子对象，并返回第一个和id匹配的对象。
* .getWorldPosition ( optionalTarget ) optionalTarget — 用来保存结果的目标对象。否则，实例化一个新的`Vector3`对象。（可选）返回一个表示对象在世界空间中的位置的向量。
* .getWorldQuaternion ( optionalTarget ) optionalTarget — 用来保存结果的目标对象。否则，实例化一个新的`Quaternion`对象。 返回一个表示在世界空间中对象的旋转的四元数。
* .getWorldRotation ( optionalTarget ) optionalTarget — 用来保存结果的目标对象。否则，实例化一个新的`Euler`对象。返回一个表示在世界空间中对象的旋转的欧拉角。
* .getWorldScale ( optionalTarget ) optionalTarget — 用来保存结果的目标对象。否则，实例化一个新的`Vector3`对象。（可选）返回用在世界空间中每个轴的对象上的缩放因子的向量。
* .getWorldDirection ( optionalTarget ) optionalTarget — 用来保存结果的目标对象。否则，实例化一个新的`Vector3`对象。（可选）返回一个向量，表示在世界空间物体的正Z轴方向。
* .translateOnAxis ( axis, distance )  
	axis -- 对象空间中的正规化（也称之为归一化）轴向量。 
	distance -- 平移距离。 
	在对象空间中沿轴线平移一个物体。这里的轴假定为已正规化。 
* .rotateOnAxis ( axis, angle )  
	axis -- 对象空间中的正规化轴向量。 
	angle -- 以弧度为单位的角度。 
	在对象空间中绕轴线旋转一个物体。这里的轴假定为已正规化。


