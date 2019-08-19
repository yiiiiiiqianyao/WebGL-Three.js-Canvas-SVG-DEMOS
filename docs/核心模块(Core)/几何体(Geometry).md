# Geometry 是对 BufferGeometry 的用户有好替代。Geometry 利用 Vector3 或 Color 存储了几何体的相关 attributes（如顶点位置，面信息，颜色等）比起 BufferGeometry 更容易读写，但是运行效率不如有类型的队列。对于大型工程或正式工程，推荐采用 BufferGeometry。

