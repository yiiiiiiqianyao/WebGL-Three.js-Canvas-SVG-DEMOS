sin
cos
mat
fract
vec2/vec3/vec4
mat2/mat3/mat4
float
int
length
distance
mix

GLSL 300

inverse
transpose

- vec2 = textureSize(sampler, lod);
获取纹理的大小

- vec4 values = texelFetch(sampler, ivec2Position, lod);
根据像素/纹素坐标取值

- vec4 color = texture(someSampler2DArray, vec3(u, v, slice));
纹理数组