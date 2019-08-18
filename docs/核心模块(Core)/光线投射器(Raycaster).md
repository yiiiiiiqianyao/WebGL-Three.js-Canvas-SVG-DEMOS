# 光线投射器（Raycaster） 用来处理光线投射。光线投射主要用于物体选择、碰撞检测以及图像成像等方面

# 构造器（Constructor）

* Raycaster( origin, direction, near, far )
* .origin — 光线投射的起点向量。
* .direction — 光线投射的方向向量，应该是被归一化的。
* .near — 投射近点，用来限定返回比near要远的结果。near不能为负数。缺省为0。
* .far — 投射远点，用来限定返回比far要近的结果。far不能比near要小。缺省为无穷大。

# 属性（Properties）

* .ray 用于光线投射的射线。

# functions

* .set ( origin, direction )  用一个新的起点和方向向量来更新射线（ray）。  
origin — 光线投射的起点向量。  
direction — 被归一化的光线投射的方向向量。  
* .setFromCamera ( coords, camera ) 用一个新的原点和方向向量来更新射线（ray）。  
coords — 鼠标的二维坐标，在归一化的设备坐标(NDC)中，也就是X 和 Y 分量应该介于 -1 和 1 之间。  
camera — 射线起点处的相机，即把射线起点设置在该相机位置处。  
* .intersectObject ( object, recursive ) 检查射线和物体之间的所有交叉点（包含或不包含后代）。交叉点返回按距离排序，最接近的为第一个。 返回一个交叉点对象数组。  
object — 用来检测和射线相交的物体。     
recursive — 如果为true，它还检查所有后代。否则只检查该对象本身。缺省值为false。  
* .intersectObjects ( objects, recursive ) 检查射线和对象之间的所有交叉点（包含或不包含后代）。交叉点返回按距离排序，最接近的为第一个。返回结果类似于 .intersectObject。  
objects — 检查是否和射线相交的一组对象。  
recursive — 如果为true，还同时检查所有的后代对象。否则只检查对象本身。缺省值为 false。
