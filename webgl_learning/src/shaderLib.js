function getPointVSHADER(){
    return `
        attribute vec3 aPos;
        attribute float size;
        void main(){
            gl_Position = vec4(aPos, 1.0);
            gl_PointSize = size;
        }
    `
}

function getPointFSHADER(){
    return `
    
        precision mediump float;

        uniform vec4 color;
        void main(){
            gl_FragColor = color;
        }
    `
}

function getAnimTriangleVSHADER(){
    return `
        attribute vec3 trianglePos;
        uniform mat4 modelMatrix;
        void main(){
            gl_Position = modelMatrix * vec4(trianglePos, 1.0);
        }
    `
}

function getTriangleVSHADER(){
    return `
        attribute vec3 aPos;
        void main(){
            gl_Position = vec4(aPos, 1.0);
        }
    `
}

function getTriangleFSHADER(){
    return `
        precision mediump float;
        uniform vec4 color;
        void main(){
            gl_FragColor = color;
        }
    `
}