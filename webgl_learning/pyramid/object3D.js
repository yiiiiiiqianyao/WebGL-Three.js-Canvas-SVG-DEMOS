export class Object3D {
    gl;
    buffer;
    texture;
    _projMatrix = new Matrix4();
    _modelMatrix = new Matrix4();
    _viewMatrix = new Matrix4();
    _normalMatrix = new Matrix4();

    get projMatrix() {
        return _projMatrix;
    }

    set projMatrix(projMatrix) {
        this._projMatrix = projMatrix;
        this.bindUnifromMat4('u_projMatrix', projMatrix.elements, this.program);
    }

    get viewMatrix() {
        return this._viewMatrix;
    }
    
    set viewMatrix(viewMatrix) {
        this._viewMatrix = viewMatrix;
        this.bindUnifromMat4('u_viewMatrix', viewMatrix.elements, this.program);
    }

    get modelMatrix() {
        return this._modelMatrix;
    }

    set modelMatrix(modelMatrix) {
        this._modelMatrix = modelMatrix;
        this.bindUnifromMat4('u_modelMatrix', modelMatrix.elements, this.program);
    }

    get normalMatrix() {
        return this._normalMatrix;
    }

    set normalMatrix(normalMatrix) {
        this._normalMatrix = normalMatrix;
        this.bindUnifromMat4('u_normalMatrix', normalMatrix.elements, this.program);
    }

    get position() {
        return this._modelMatrix.elements;
    }

    set position(position) {
        this._modelMatrix.elements[12] = position[0];
        this._modelMatrix.elements[13] = position[1];
        this._modelMatrix.elements[14] = position[2];
    }

    constructor(gl, size) {
        this.gl = gl;
    }

    initProgram(vs, fs) {
        let vsShader = this.initShader('vertex', vs)
        let fsShader = this.initShader('fragment', fs)

        // 创建程序并连接着色器
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vsShader);
        this.gl.attachShader(program, fsShader);
        this.gl.linkProgram(program);
        return program;
    }

    initShader(type, shaderSource) {
        let gl = this.gl;
        let shader;
        if(type === 'vertex') {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        }

        // 编译着色器
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        return shader;
    }

    setUniform(name, type, value) {
        switch(type) {
            case 'v1':
                this.bindUnifrom1fv(name, value, this.program);
                break;
            case 'v3':
                this.bindUnifrom3fv(name, value, this.program);
                break;
            case 'mat4':
                this.bindUnifromMat4(name, value, this.program);
                break;
        }
    }

    setupMatrix() {
        this.modelMatrix = new Matrix4();
        this.normalMatrix = new Matrix4();
    }

    bindElementBuffer(indices) {
        const gl = this.gl;
        let indexBuffer = gl.createBuffer();
        if (!indexBuffer) {
            console.log("无法创建缓冲区对象");
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
        return { indexBuffer, indices }
    }

    bindAttriBufferOffset(attrName, count, program, all, offfset) {
        const gl = this.gl;
        let attr = gl.getAttribLocation(program, attrName);
        gl.vertexAttribPointer(attr, count, gl.FLOAT, false, all * FSIZE, offfset * FSIZE);
        gl.enableVertexAttribArray(attr);
        return attr;
    }

    bindUnifrom3fv(unifromName, data, program) {
        const uniform3f = this.gl.getUniformLocation(program, unifromName);
        this.gl.uniform3f(uniform3f, ...data);
        return uniform3f
    }

    bindUnifrom1fv(unifromName, data, program) {
        const uniform1f = this.gl.getUniformLocation(program, unifromName);
        this.gl.uniform1f(uniform1f, ...data)
        return uniform1f;
    }

    bindUnifromMat4(unifromName, data, program) {
        const uniform4f = this.gl.getUniformLocation(program, unifromName);
        this.gl.uniformMatrix4fv(uniform4f, false, data);
        return uniform4f
    }

    // 为 attribute 变量绑定 buffer 缓冲区并赋值（从一份数据中获取一份缓冲数据）
    bindAttriBuffer(attrName, vertices, count, program) {
        let gl = this.gl;
        let buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer) // 将缓冲区对象绑定到目标
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW) // 向缓冲区对象中写入数据
    
        let attr = gl.getAttribLocation(program, attrName);
        gl.vertexAttribPointer(attr, count, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(attr);
        return { buffer, attr }
    }
}