// 模型视图矩阵对顶点位置数据进行变换
// modelViewMatrix：模型视图矩阵，模型矩阵和视图矩阵的复合矩阵
vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
// projectionMatrix：相机的投影矩阵
gl_Position = projectionMatrix * mvPosition;
