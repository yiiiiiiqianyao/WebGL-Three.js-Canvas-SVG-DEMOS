
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
uniform float u_shadowVertex;
varying vec2 v_Uv;
varying vec3 v_Color;
void main(){
    v_Uv = a_Uv;
  
    if(u_shadowVertex > 0.0) {
        gl_Position = u_viewProjFromLightMatrix * u_modelMatrix * a_Position;
    } else {
        gl_Position = u_projMatrix * u_viewMatrix * u_modelMatrix * a_Position;
    }
    

    vec3 lightDirection = normalize(vec3(1.0, 1.0, 1.0));
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

uniform float u_shadow;
uniform sampler2D u_Sampler;

void main(){
    if(u_shadow > 0.0) {
        gl_FragColor = vec4( 0.0, 0.0, 0.0, gl_FragCoord.z);
    } else {
        vec4 tex = texture2D(u_Sampler, v_Uv);

        
        float l = 0.299 * v_Color.r + 0.578 * v_Color.g + 0.114 * v_Color.b;
        
        gl_FragColor = vec4(texture2D(u_Sampler, v_Uv).rgb * l, 1.0);
    }
}
`

var vertices = new Float32Array([
    // position         color               normal          uv
    0.0,  1.0, 0.0,     1.0, 1.0, 0.0,    0.0, 0.0, 1.0,   0.5, 0.0,
    -1.0, 0.0, 1.0,     1.0, 1.0, 0.0,    0.0, 0.0, 1.0,   0.0, 1.0,
    1.0,  0.0, 1.0,     1.0, 1.0, 0.0,    0.0, 0.0, 1.0,   1.0, 1.0,

    0.0, 1.0,  0.0,     1.0, 1.0, 0.0,    1.0, 0.0, -1.0,   0.5, 0.0,
    1.0, 0.0,  1.0,     1.0, 1.0, 0.0,    1.0, 0.0, -1.0,   0.0, 1.0,
    0.0, 0.0, -1.0,     1.0, 1.0, 0.0,    1.0, 0.0, -1.0,   1.0, 1.0,
    
    0.0, 0.0, -1.0,     1.0, 1.0, 0.0,    0.0, 1.0, -1.0,   0.5, 0.0,
    1.0, 0.0,  1.0,     1.0, 1.0, 0.0,    0.0, 1.0, -1.0,   1.0, 1.0,
    -1.0,0.0,  1.0,     1.0, 1.0, 0.0,    0.0, 1.0, -1.0,   0.0, 1.0,

    0.0, 1.0,  0.0,     1.0, 1.0, 0.0,    -1.0, 0.0, -1.0,   0.5, 0.0,
    0.0, 0.0, -1.0,     1.0, 1.0, 0.0,    -1.0, 0.0, -1.0,   0.0, 1.0,
    -1.0,0.0,  1.0,     1.0, 1.0, 0.0,    -1.0, 0.0, -1.0,   1.0, 1.0,
])



export class Pyramid extends Object3D {
    program;
    _map;

    constructor(gl) {
        super(gl);
        this.program = this.initProgram(vs, fs);
        
        this.init();
    }

    init() {
        this.modelMatrix = new Matrix4();
        this.setGeometry();
        this.setMap('./tq.png'); // 2 次大小
    }

    rotate() {
        const modelMatrix = this.modelMatrix;
        modelMatrix.rotate(0.1, 0, 1, 0);
        // modelMatrix.rotate(-0.5, 0, 0, 0);
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
        gl.drawArrays(gl.TRIANGLES, 0, 12);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    renderShadow(cameraPos, viewMatrix, viewProjectMatrixFromLight) {
        const gl = this.gl;
        gl.useProgram(this.program); // 上下文对象绑定程序对象
        this.setUniform('u_shadow', 'v1', [1]);
        this.setUniform('u_shadowVertex', 'v1', [1]);
        this.setUniform('u_CameraPos', 'v3', cameraPos);
        
        this.setUniform('u_viewProjFromLightMatrix', 'mat4', viewProjectMatrixFromLight.elements);
        this.viewMatrix = viewMatrix;
        this.rotate();
        this.draw();
    }

    render(cameraPos, viewMatrix, fbo) {
        const gl = this.gl;
        gl.useProgram(this.program); // 上下文对象绑定程序对象
        this.setUniform('u_shadow', 'v1', [0]);
        this.setUniform('u_shadowVertex', 'v1', [0]);
        this.setUniform('u_CameraPos', 'v3', cameraPos);
        this.viewMatrix = viewMatrix;
        this.rotate();
        this.draw();
    }

}