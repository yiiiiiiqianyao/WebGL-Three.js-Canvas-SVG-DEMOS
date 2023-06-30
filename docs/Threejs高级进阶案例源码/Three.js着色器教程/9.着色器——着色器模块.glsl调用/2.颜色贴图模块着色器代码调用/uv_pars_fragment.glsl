// 如果使用了任何纹理贴图，就需要进行纹理坐标的插值计算，也就是说需要使用varying关键字声明变量vUv
#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )
	// 片元着色器中：声明一个变量vUv用于插值计算
	varying vec2 vUv;

#endif
