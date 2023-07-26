import { Object3D } from './object3D.js';
const vs = `
#define ambientRatio 0.5
#define diffuseRatio 0.3
#define specularRatio 0.4

attribute vec4 a_Position;
attribute vec3 a_Color;
attribute vec3 a_Normal;

uniform mat4 u_projMatrix;
uniform mat4 u_modelMatrix;
uniform mat4 u_viewMatrix;

uniform vec3 u_CameraPos;

uniform mat4 u_normalMatrix;

varying vec3 v_Color;
void main(){
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
   
    float specular = pow(max(0.0, dot(normal, halfDir)), 2.0);
    

    gl_Position = u_projMatrix * u_viewMatrix * worldPos;

    v_Color =  ambient * ambientRatio + diffuse * diffuseRatio + specular*specularRatio;
}
`;
const fs = `
#ifdef GL_ES
precision mediump float;
#endif
// varying vec2 v_Uv;
// uniform sampler2D u_Sampler;
varying vec3 v_Color;
void main(){
    // gl_FragColor = texture2D(u_Sampler, v_Uv);
    // gl_FragColor = vec4(v_Color, 1.0);
    gl_FragColor = vec4(v_Color, 1.0);
}
`

let CubeVCN = new Float32Array([ // 设置顶点、颜色、顶点法线
    1.0,  1.0,  1.0,     1.0,  1.0,  1.0,  0.0, 0.0, 1.0,// v0 front
    -1.0,  1.0,  1.0,    1.0,  1.0,  1.0,  0.0, 0.0, 1.0,// v1 
    -1.0, -1.0,  1.0,    1.0,  1.0,  1.0,  0.0, 0.0, 1.0,// v2 
    1.0, -1.0,  1.0,     1.0,  1.0,  1.0,  0.0, 0.0, 1.0,// v3 

    1.0, -1.0, -1.0,     0.0,  1.0,  1.0,  0.0, 0.0, -1.0,// v4 back
    1.0,  1.0, -1.0,     0.0,  1.0,  1.0,  0.0, 0.0, -1.0,// v5 
    -1.0,  1.0, -1.0,    0.0,  1.0,  1.0,  0.0, 0.0, -1.0,// v6 
    -1.0, -1.0, -1.0,    0.0,  1.0,  1.0,  0.0, 0.0, -1.0,// v7 

    1.0,  1.0, -1.0,     1.0,  1.0,  0.0,  1.0, 0.0, 0.0,// v8 right
    1.0,  1.0,  1.0,     1.0,  1.0,  0.0,  1.0, 0.0, 0.0,// v9 
    1.0, -1.0,  1.0,     1.0,  1.0,  0.0,  1.0, 0.0, 0.0,// v10 
    1.0, -1.0, -1.0,     1.0,  1.0,  0.0,  1.0, 0.0, 0.0,// v11

    -1.0,  1.0, -1.0,    1.0,  0.0,  0.0,  0.0, 1.0, 0.0,// v12 top
    -1.0,  1.0,  1.0,    1.0,  0.0,  0.0,  0.0, 1.0, 0.0,// v3 
    1.0,  1.0,  1.0,     1.0,  0.0,  0.0,  0.0, 1.0, 0.0,// v14
    1.0,  1.0, -1.0,     1.0,  0.0,  0.0,  0.0, 1.0, 0.0,// v15 

    1.0, -1.0,  1.0,     0.0,  1.0,  0.0,  0.0, -1.0, 0.0,// v16 down
    -1.0, -1.0,  1.0,    0.0,  1.0,  0.0,  0.0, -1.0, 0.0,// v17 
    -1.0, -1.0, -1.0,    0.0,  1.0,  0.0,  0.0, -1.0, 0.0,// v18 
    1.0, -1.0, -1.0,     0.0,  1.0,  0.0,  0.0, -1.0, 0.0,// v19

    -1.0,  1.0,  1.0,    0.0,  0.0,  1.0,  -1.0, 0.0, 0.0,// v1 left
    -1.0,  1.0, -1.0,    0.0,  0.0,  1.0,  -1.0, 0.0, 0.0,// v6 
    -1.0, -1.0, -1.0,    0.0,  0.0,  1.0,  -1.0, 0.0, 0.0,// v7 
    -1.0, -1.0,  1.0,    0.0,  0.0,  1.0,  -1.0, 0.0, 0.0,// v2 
]);

let cubeIndices = new Uint8Array([ //顶点索引
    0, 1, 2,    0, 2, 3,    // 前

    6, 5, 4,    6, 4, 7, // 后

    8, 9, 10,   8, 10, 11,

    12, 13, 14, 12, 14, 15,

    16, 17, 18, 16, 18, 19,

    20, 21, 22, 20, 22, 23
]);
export class Cube extends Object3D{
    program;

    set modelMatrix(modelMatrix) {
        this._modelMatrix = modelMatrix;
        this.bindUnifrom4fv('u_modelMatrix', modelMatrix.elements, this.program);
    }
    
    set projMatrix(projMatrix) {
        this._projMatrix = projMatrix;
        this.bindUnifrom4fv('u_projMatrix', projMatrix.elements, this.program);
    }
    set viewMatrix(viewMatrix) {
        this._viewMatrix = viewMatrix;
        this.bindUnifrom4fv('u_viewMatrix', viewMatrix.elements, this.program);
    }

    get modelMatrix() {
        return this._modelMatrix;
    }


    constructor(gl) {
        super(gl);
        this.program = this.initProgram(vs, fs);
            
    }

    setGeometry() {
        this.bindAttriBufferOffset('a_Position', CubeVCN, 3, this.program, 9, 0)
        this.bindAttriBufferOffset('a_Color', CubeVCN, 3, this.program, 9, 3)
        this.bindAttriBufferOffset('a_Normal', CubeVCN, 3, this.program, 9, 6)
        
        this.bindElementBuffer(cubeIndices)
    }

    draw() {
        const gl = this.gl;
        gl.useProgram(this.program); // 上下文对象绑定程序对象
        
        gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_BYTE, 0);
    }

}