
import { Object3D } from './object3D.js';
const vs = `
#define ambientRatio 0.5
#define diffuseRatio 0.3
#define specularRatio 0.4

attribute vec4 a_Position;
attribute vec3 a_Color;
attribute vec3 a_Normal;
attribute vec2 a_Uv;

uniform mat4 u_projMatrix;
uniform mat4 u_modelMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_viewProjFromLightMatrix;

uniform vec3 u_CameraPos;
uniform mat4 u_normalMatrix;


varying vec2 v_Uv;
varying vec3 v_Color;
varying vec4 v_PositionFromLight;

void main(){
    v_Uv = a_Uv;

    v_PositionFromLight = u_viewProjFromLightMatrix * a_Position;
    gl_Position = u_projMatrix * u_viewMatrix * u_modelMatrix * a_Position;

    vec3 lightDirection = normalize(vec3(10.0, 10.0, 10.0));
    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vec3 ambientLightColor = vec3(1.0, 1.0, 1.0);

    vec3 normal = normalize(vec3(u_normalMatrix * vec4(a_Normal, 1.0))); // 计算后的顶点法线
    
    float normalDotLight = max(dot(lightDirection, normal), 0.0);
    vec3 diffuse = lightColor * a_Color * normalDotLight;

    vec3 ambient = ambientLightColor * a_Color;

    vec4 worldPos = u_modelMatrix * a_Position;
    vec3 viewDir = normalize(u_CameraPos - worldPos.xyz);
    vec3 halfDir = normalize(viewDir + lightDirection);
   
    float specular = pow(max(0.0, dot(normal, halfDir)), 4.0);

    v_Color =  ambient * ambientRatio + diffuse * diffuseRatio + specular*specularRatio;

}
`;
const fs = `
precision mediump float;

varying vec2 v_Uv;
varying vec3 v_Color;
varying vec4 v_PositionFromLight;

uniform float u_shadow;
uniform sampler2D u_Sampler;
uniform sampler2D u_Shadow;

void main(){
    if(u_shadow > 0.0) {
        gl_FragColor = vec4( 0.0, 0.0, 0.0, gl_FragCoord.z);
    } else {
        vec3 shadowCoord = (v_PositionFromLight.xyz/v_PositionFromLight.w)/2.0 + 0.5;
        vec4 rgbaDepth = texture2D(u_Shadow, vec2(shadowCoord.x, shadowCoord.y));
        float depth = rgbaDepth.a;
        float visibility = (shadowCoord.z > depth) ? 0.5 : 1.0;
        gl_FragColor = texture2D(u_Sampler, v_Uv);
        gl_FragColor.rgb *= visibility;
    }
}
`
const size = 2;
const vertices = new Float32Array([
    // position         color               normal          uv
    -size,  0.0, -size,     1.0, 1.0, 0.0,    0.0, 1.0, 0.0,   0.0, 1.0,
    -size, 0.0, size,     1.0, 1.0, 0.0,    0.0, 1.0, 0.0,   0.0, 0.0,
    size,  0.0, -size,     1.0, 1.0, 0.0,    0.0, 1.0, 0.0,   1.0, 1.0,
    size, 0.0,  size,     1.0, 1.0, 0.0,    0.0, 1.0, 0.0,   1.0, 0.0,
])

export class Plane extends Object3D {
    program;
    _map;
    shadowTexture;

    constructor(gl) {
        super(gl);
        this.program = this.initProgram(vs, fs);
        
        this.init();
    }

    init() {
        this.modelMatrix = new Matrix4();
        this.setGeometry();
        this.setMap('./zfb.png'); // 2 次大小
    }

    rotate() {
        const modelMatrix = this.modelMatrix;
        modelMatrix.rotate(-1, 0, 1, 0);
        this._modelMatrix = modelMatrix;
        this.bindUnifromMat4('u_modelMatrix', modelMatrix.elements, this.program);

        const normalMatrix = this.normalMatrix;
        normalMatrix.setInverseOf(modelMatrix);
        normalMatrix.transpose();

        this._normalMatrix = normalMatrix;
        this.bindUnifromMat4('u_normalMatrix', normalMatrix.elements, this.program);
    }

    setMap(mapSrc) {
        const gl = this.gl;
        const program = this.program;
        const image = new Image();
        image.src = mapSrc;
        image.crossOrigin = 'none';
        image.onload = () => {
            const texture = gl.createTexture(); // 创建用于存储纹理图像的纹理对象
            this.texture = texture;
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1) // 对纹理图像进行 Y 轴反转
            
			gl.activeTexture(gl.TEXTURE0); // 激活0号纹理单元
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

            const u_Sampler = gl.getUniformLocation(program, 'u_Sampler');
	        gl.uniform1i(u_Sampler, 0);
        }
    }

    setGeometry() {
        const gl = this.gl;
        const buffer = gl.createBuffer();
        this.buffer = buffer;
        
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer) // 将缓冲区对象绑定到目标
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW) // 向缓冲区对象中写入数据
        this.bindAttr();
    }

    bindAttr() {
        this.bindAttriBufferOffset('a_Position', 3, this.program, 11, 0)
        this.bindAttriBufferOffset('a_Color', 3, this.program, 11, 3)
        this.bindAttriBufferOffset('a_Normal', 3, this.program, 11, 6)
        this.bindAttriBufferOffset('a_Uv', 2, this.program, 11, 9)
    }

    draw() {
        const gl = this.gl;
        gl.useProgram(this.program); // 上下文对象绑定程序对象
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer) // 将缓冲区对象绑定到目标
        this.bindAttr();

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        const u_Sampler = gl.getUniformLocation(this.program, 'u_Sampler');
        gl.uniform1i(u_Sampler, 0);
    
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.shadowTexture);
        const u_Shadow = gl.getUniformLocation(this.program, 'u_Shadow');
        gl.uniform1i(u_Shadow, 1);
    
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

}