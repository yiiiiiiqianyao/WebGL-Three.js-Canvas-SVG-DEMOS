import { Pyramid } from './pyramid.js'
import { Plane } from './plane.js';

const offset_width = 512;
const offset_height = 512;
const canvas = document.getElementById('canvas')
canvas.width = 512;
canvas.height = 512;

// 获取 webgl 绘图上下文
var gl = getWebGLContext(canvas)

const pyramid = new Pyramid(gl);
const plane = new Plane(gl);

gl.enable(gl.DEPTH_TEST)
gl.enable(gl.BLEND) // 开启混合
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA) // 指定混合函数
gl.clearColor(0.0, 1.0, 1.0, 1.0)

const lightPos = [1, 1, 1];
const cameraPos = [0, 5, 10]
let viewMatrix = new Matrix4();
let projMatrix = new Matrix4();

// eyeX, eyeY, eyeZ
// centerX, centerY, centerZ
// upX, upY, upZ
viewMatrix.setLookAt(
    cameraPos[0], cameraPos[1], cameraPos[2], 
    0, 0, 0, 
    0, 1, 0
);
projMatrix.setPerspective(45, canvas.width/canvas.height, 1, 100);

 //声明一个光源的变换矩阵
 var viewProjectMatrixFromLight = new Matrix4();
 viewProjectMatrixFromLight.setPerspective(75.0, offset_width/offset_height, 1.0, 100.0);
//  viewProjectMatrixFromLight.lookAt(lightPos[0], lightPos[1], lightPos[2],0.0,0.0,0.0,0.0,1.0,0.0);
viewProjectMatrixFromLight.lookAt(
    3, 3, 3,
    0.0,0.0,0.0,
    0.0,1.0,0.0
);

gl.useProgram(pyramid.program); // 上下文对象绑定程序对象
pyramid.projMatrix = projMatrix;
pyramid.setupMatrix();
pyramid.position = [0.5, 0.5, 0]

gl.useProgram(plane.program);
plane.projMatrix = projMatrix;
plane.setupMatrix();
plane.position = [0, 0, 0]

const fbo = initFramebufferObject(gl);
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, fbo.texture);

// plane.shadowTexture = fbo.texture;

gl.bindFramebuffer(gl.FRAMEBUFFER, null)

animate()
function animate() {
    // draw shadow map
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.viewport(0.0,0.0,offset_height,offset_height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    pyramid.renderShadow(cameraPos, viewMatrix, viewProjectMatrixFromLight);
    plane.renderShadow(cameraPos, viewMatrix, viewProjectMatrixFromLight);
    
    // draw scene
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0.0, 0.0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    pyramid.render(cameraPos, viewMatrix, fbo);
    plane.render(cameraPos, viewMatrix, fbo);
   
    requestAnimationFrame(animate)
}

function initFramebufferObject(gl) {
    var framebuffer, texture, depthBuffer;

    //定义错误函数
    function error() {
        if(framebuffer) gl.deleteFramebuffer(framebuffer);
        if(texture) gl.deleteFramebuffer(texture);
        if(depthBuffer) gl.deleteFramebuffer(depthBuffer);
        return null;
    }

    //创建帧缓冲区对象
    framebuffer = gl.createFramebuffer();
    if(!framebuffer){
        console.log("无法创建帧缓冲区对象");
        return error();
    }

    //创建纹理对象并设置其尺寸和参数
    texture = gl.createTexture();
    if(!texture){
        console.log("无法创建纹理对象");
        return error();
    }
    
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, offset_width, offset_height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    framebuffer.texture = texture;//将纹理对象存入framebuffer

    //创建渲染缓冲区对象并设置其尺寸和参数
    depthBuffer = gl.createRenderbuffer();
    if(!depthBuffer){
        console.log("无法创建渲染缓冲区对象");
        return error();
    }

    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, offset_width, offset_height);

    //将纹理和渲染缓冲区对象关联到帧缓冲区对象上
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER,depthBuffer);

    //检查帧缓冲区对象是否被正确设置
    var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if(gl.FRAMEBUFFER_COMPLETE !== e){
        console.log("渲染缓冲区设置错误"+e.toString());
        return error();
    }

    //取消当前的focus对象
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);

    return framebuffer;
}