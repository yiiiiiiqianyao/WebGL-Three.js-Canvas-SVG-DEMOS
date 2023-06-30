function createShader(gl, source, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

function createProgram(gl, VSHADER, FSHADER) {
    var program = gl.createProgram();

    var vshader = createShader(gl, VSHADER, gl.VERTEX_SHADER);
    var fshader = createShader(gl, FSHADER, gl.FRAGMENT_SHADER);
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);

    gl.linkProgram(program);

    return program;
}

function getShaderSource(id) {
    return document.getElementById(id).textContent.replace(/^\s+|\s+$/g, '');
}

function createColorTexture(gl, unit, width, height, data) {
    gl.activeTexture(unit);
    var color1Texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, color1Texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(gl.TEXTURE_2D,
        0,
        gl.RGBA,
        width,
        height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        data);
    return color1Texture;
}