https://blog.csdn.net/fatcat123/article/details/103861403/

- xy

gl_FragCoord 表示当前片元着色器处理的候选片元窗口相对坐标信息，是一个 vec4 类型的变量 (x, y, z, 1/w)， 其中 x, y 是当前片元的窗口坐标，OpenGL 默认以窗口左下角为原点， 在 着色器中通过布局限定符可以重新设定原点，比如窗口左上角为原点 origin_upper_left，窗口大小由 glViewport() 函数指定。x, y 默认是像素中心 而非 整数， 原点 的窗口坐标值为 (0.5, 0.5), 小数部分恒为 0.5，  当viewport 范围 为（0，0，800，600）时， x, y 的取值范围为（0.5, 0.5, 799.5, 599.5), 当在着色器中布局限定符设置为 pixel_center_integer  时， x, y 取值为整数。


- z
第三个分量  z 表示的是当前片元的深度信息，由 vertex shader 处理过后系统插值得到, gl_FragCoord.z 的产生过程：
  

gl_FragCoord.z 生成过程：

（1）世界坐标系内的坐标乘以观察矩阵变换到眼坐标空间  eye.xyzw = viewMatrix * world.xyzw; ( 世界坐标系 = modelMatrix * pos )

（2）眼坐标系内的坐标通过乘上投影矩阵变换到裁剪空间 clip.xyzw = projectMatrix * eye.xyzw;

（3）裁剪坐标系内的坐标通过透视除法（也就是  w 为 1 化） 到 规范化设备坐标系 ndc.xyz = clip.xyz / clip.w;

（4）设备规范化坐标系到窗口坐标系 win.z = (dfar - dnear)/2 * ndc.z + (dfar+dnear)/2;

可以看出 gl_FragCoord.z 是 win.z 。
dnear ,dfar 是由 glDepthRange（dnear, dfar） 给定的，按openGL 默认值 （0，1） ， win.z = ndc.z/2 + 0.5。

有时候我们需要在 shader 内反算 眼坐标系 或 世界坐标系 内的坐标, 这在后处理或延迟着色中很有用，不需要另外使用颜色缓存保留物体位置信息，减少带宽占用。反算窗口空间内的片元的空间坐标： 

ndc.xyzw =  ( gl_FragCoord.xy/viewport.wh * 2.0  - 1.0,  gl_FragCoord.z * 2.0  - 1.0, 1.0 );
eye.xyzw    = projectionMatrixInverse * ndc.xyzw;
world.xyzw = modelViewProjectionMatrixInverse * ndc.xyzw

注意最终结果要除以 w 分量， eye.xyz = eye.xyz/eye.w;

gl_FragCoord.z / gl_FragCoord.w可以得到当前片元和camera之间的距离。

- w

gl_FragCoord.w 是裁剪空间 clip.w 的倒数即 1/clip.w, clip.w 值就是 眼坐标系 z 值的负数，也就是距离相机的距离。

对于透视投影， 由 gl_FragCoord.w  可以很方便的知道当前片元在眼坐标系中 距离相机的距离  ：
    gl_FragCoord.w = - 1/Ze  ---------->   Ze = - 1/gl_FragCoord.w;

正交投影




// Vertex Shader
varying vec4 position;
void main(void)
{
    position = gl_ModelViewMatrix * gl_Vertex;
    gl_Position = ftransform();
}
// Fragment Shader
uniform float zFar;
uniform float zNear;
varying vec4 position;
void main()
{
    float zDiff = zFar - zNear;
    float interpolatedDepth = (position.w / position.z) * zFar * zNear / zDiff + 0.5 * (zFar + zNear) / zDiff + 0.5;
    gl_FragColor = vec4(vec3(pow(interpolatedDepth, 15.0)), 1.0);
}


vec3 decodeCameraSpacePositionFromDepthBuffer(in vec2 texCoord){ 
	vec4 clipSpaceLocation;
	clipSpaceLocation.xy = texCoord*2.0-1.0; 
	clipSpaceLocation.z  = texture(depthTexture, texCoord).r * 2.0-1.0; 
	clipSpaceLocation.w  = 1.0; 
	vec4 homogenousLocation = projectionMatrixInverse * clipSpaceLocation; 
	return homogenousLocation.xyz/homogenousLocation.w; 
} 
vec3 decodeWorldSpacePositionFromDepthBuffer(in vec2 texCoord){ 
	vec4 clipSpaceLocation;	
 	clipSpaceLocation.xy = texCoord*2.0-1.0; 
	clipSpaceLocation.z  = texture(depthTexture, texCoord).r * 2.0-1.0; 
	clipSpaceLocation.w  = 1.0; 
	vec4 homogenousLocation = viewProjectionMatrixInverse * clipSpaceLocation; 
	return homogenousLocation.xyz/homogenousLocation.w; 
}