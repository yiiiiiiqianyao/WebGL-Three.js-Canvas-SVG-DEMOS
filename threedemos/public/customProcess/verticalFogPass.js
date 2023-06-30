/**
 * @author huaqing / https://github.com/2912401452/
 */
THREE.VerticalFogPass = function(scene, camera, options) {
    THREE.Pass.call( this );

    this.scene = scene;
    this.camera = camera;
    options = options?options:{}
    this.fillColor = options.fillColor ? options.fillColor : new THREE.Color(1, 1, 1)

    this.renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
    this.renderTarget.texture.format = THREE.RGBFormat;
    this.renderTarget.texture.minFilter = THREE.NearestFilter;
    this.renderTarget.texture.magFilter = THREE.NearestFilter;
    this.renderTarget.texture.generateMipmaps = false;
    this.renderTarget.stencilBuffer = false;
    this.renderTarget.depthBuffer = true;
    this.renderTarget.depthTexture = new THREE.DepthTexture();
    this.renderTarget.depthTexture.type = THREE.UnsignedShortType;

    renderer.autoClear = false
    renderer.setRenderTarget( this.renderTarget );
    renderer.render(scene, camera)
    renderer.autoClear = true
    renderer.setRenderTarget( null );

    this.calCameraVectors()

    let { topLeftVec, topRightVec, bottomLeftVec, bottomRightVec } = this.baseMaterial = this.getBaseMaterial();
    this.baseMaterial.uniforms[ "topLeftVec" ].value = topLeftVec
    this.baseMaterial.uniforms[ "topRightVec" ].value = topRightVec
    this.baseMaterial.uniforms[ "bottomLeftVec" ].value = bottomLeftVec
    this.baseMaterial.uniforms[ "bottomRightVec" ].value = bottomRightVec

    this.baseMaterial.uniforms[ "fillColor" ].value = this.fillColor

    this.verticalFogMaterial = this.getFogMaterial()

    // this.fsQuad = new THREE.Pass.FullScreenQuad( this.verticalFogMaterial );
    this.fsQuad = new THREE.Pass.FullScreenQuad( this.baseMaterial );
}

THREE.VerticalFogPass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {
    constructor: THREE.VerticalFogPass,
    render: function(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
        
        this.baseMaterial.uniforms[ "colorTexture" ].value = readBuffer.texture;
        // this.baseMaterial.needsUpdate = true;

        let { topLeftVec, topRightVec, bottomLeftVec, bottomRightVec } = this.calCameraVectors()

        this.baseMaterial.uniforms[ "cameraPos" ].value = this.camera.position
        this.baseMaterial.uniforms[ "topLeftVec" ].value = topLeftVec
        this.baseMaterial.uniforms[ "topRightVec" ].value = topRightVec
        this.baseMaterial.uniforms[ "bottomLeftVec" ].value = bottomLeftVec
        this.baseMaterial.uniforms[ "bottomRightVec" ].value = bottomRightVec
        
        // this.verticalFogMaterial.uniforms[ "fogTexture" ].value = this.renderTarget.texture;
        // this.verticalFogMaterial.uniforms[ "colorTexture" ].value = readBuffer.texture;
        
        renderer.setRenderTarget( this.renderTarget );
        renderer.render( this.scene, this.camera );

        // console.log(this.baseMaterial)
        // console.log(this.renderTarget.texture)
        // this.verticalFogMaterial.uniforms[ "fogTexture" ].value = readBuffer.texture;
        // this.verticalFogMaterial.uniforms[ "fogTexture" ].value = this.renderTarget.texture;
        // this.verticalFogMaterial.uniforms[ "colorTexture" ].value = readBuffer.texture;
        // this.verticalFogMaterial.needsUpdate = true;
        
        renderer.setRenderTarget( null );
        this.fsQuad.render( renderer );

    },

    calCameraVectors() {
        let near = camera.near
        let { fov, aspect } = camera
        let h = Math.tan(this.ang2rad(fov/2))*near
        let w = h*aspect
  
        // let forwardDir = (new THREE.Vector3(0, 0, 1).applyMatrix4(camera.matrixWorld)).sub(camera.position.clone()).normalize()
        // let rightDir = (new THREE.Vector3(1, 0, 0).applyMatrix4(camera.matrixWorld)).sub(camera.position.clone()).normalize()
        // let topDir = (new THREE.Vector3(0, 1, 0).applyMatrix4(camera.matrixWorld)).sub(camera.position.clone()).normalize()
        
        let forwardDir = (new THREE.Vector3(0, 0, 1).applyMatrix4(camera.matrixWorld.clone()))
        forwardDir.sub(camera.position.clone())
        forwardDir.normalize()
        
        let rightDir = (new THREE.Vector3(-1, 0, 0).applyMatrix4(camera.matrixWorld.clone()))
        rightDir.sub(camera.position.clone())
        rightDir.normalize()

        let topDir = (new THREE.Vector3(0, -1, 0).applyMatrix4(camera.matrixWorld.clone()))
        topDir.sub(camera.position.clone())
        topDir.normalize()
       
       
        let toRight = rightDir.multiplyScalar(w);
        let toTop = topDir.multiplyScalar(h)
        
        let topLeftVec = (forwardDir.clone().multiplyScalar(near)).add(toTop.clone()).sub(toRight.clone())
        let scale = topLeftVec.length() / near;
       
        topLeftVec.normalize()
        topLeftVec.multiplyScalar(-scale)
        
        let topRightVec = (forwardDir.clone().multiplyScalar(near)).add(toRight.clone()).add(toTop.clone())
        topRightVec.normalize()
        topRightVec.multiplyScalar(-scale)
        
        let bottomLeftVec = (forwardDir.clone().multiplyScalar(near)).sub(toTop.clone()).sub(toRight.clone())
        bottomLeftVec.normalize()
        bottomLeftVec.multiplyScalar(-scale)
       
        let bottomRightVec = (forwardDir.clone().multiplyScalar(near)).add(toRight.clone()).sub(toTop.clone())
        bottomRightVec.normalize()
        bottomRightVec.multiplyScalar(-scale)

        return { topLeftVec, topRightVec, bottomLeftVec, bottomRightVec }

    },
    ang2rad(ang){ // 角度变弧度
        return (ang * Math.PI) / 180;
    },
    getBaseMaterial: function() {
        return new THREE.ShaderMaterial( {
            uniforms: {
                "colorTexture": { value: null },
                "renderTexture": { value: this.renderTarget.depthTexture },
                "cameraFar": { value: this.camera.far },
                "cameraNear": { value: this.camera.near },
                "cameraPos": { value: this.camera.position.clone() },
                "topLeftVec": { value: this.topLeftVec },
                "topRightVec": { value: this.topRightVec },
                "bottomLeftVec": { value: this.bottomLeftVec },
                "bottomRightVec": { value: this.bottomRightVec },
                "fillColor": { value: this.fillColor }
			},
            vertexShader:
                `
                uniform vec3 topLeftVec;
                uniform vec3 topRightVec;
                uniform vec3 bottomLeftVec;
                uniform vec3 bottomRightVec;
                
                varying vec2 vUv;
                varying vec3 cameraVec;
                
                void main() {
                    vUv = uv;
                    if(uv.x < 0.5 && uv.y < 0.5) { // bottom left 
                        cameraVec = bottomLeftVec;
                    }else if(uv.x < 0.5 && uv.y > 0.5) { // top left
                        cameraVec = topLeftVec;
                    }else if(uv.x > 0.5 && uv.y > 0.5) { // top right
                        cameraVec = topRightVec;
                    }else { // bottom right 
                        cameraVec = bottomRightVec;
                    }

					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
            fragmentShader:
                `
                #include <packing>
                varying vec2 vUv;
                varying vec3 cameraVec;

                uniform float cameraFar;
                uniform float cameraNear;
                uniform vec3 cameraPos;
                uniform sampler2D colorTexture;
                uniform sampler2D renderTexture;
         
                uniform vec3 fillColor;

                float readClipZ( sampler2D depthSampler, vec2 coord ) {
                    float fragCoordZ = texture2D( depthSampler, coord ).x;
                    return perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar ); // 返回相机空间的 viewZ（相对于相机空间的实际z）
                }

                void main() {
                    float clipZ = readClipZ( renderTexture, vUv );

                    vec4 diff = texture2D( colorTexture, vUv);
                    vec3 wP = cameraPos + (cameraVec)*abs(clipZ);
                    
                    float h = length(wP.y);
                    if(distance(wP, cameraPos) < cameraFar*0.5 && h < 2.0) {
                        vec4 color = mix(vec4(fillColor, 1.0), vec4(0.0), h/2.0);
                        gl_FragColor = vec4(color + diff);
                        // gl_FragColor = vec4(color, mix(1.0, 0.0, h/2.0));
                    }else{
                        gl_FragColor = diff;
                        //  discard;
                    }
                }`
        })
    },
    getFogMaterial: function() {
        return new THREE.ShaderMaterial( {
            uniforms: {
                "fogTexture": { value: null },
                "colorTexture": { value: null },
			},
            vertexShader:
                `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
            fragmentShader:
                `
                varying vec2 vUv;
              
                uniform sampler2D fogTexture;
                uniform sampler2D colorTexture;
           
                void main() {
                    vec4 fogDiff = texture2D( fogTexture, vUv);
                    vec4 diff = texture2D( colorTexture, vUv);
                    
                    gl_FragColor = diff;
                    gl_FragColor = fogDiff;

                    // vec4 sum = vec4( 0.0 );
                   
                    // float h = 0.4;

                    //横向高斯模糊
                    // sum += texture2D( fogTexture, vec2( (vUv.x - 4.0 * h) / vUv.w, vUv.y / vUv.w ) ) * (0.051/2.0);
                    // sum += texture2D( fogTexture, vec2( (vUv.x - 3.0 * h) / vUv.w, vUv.y / vUv.w ) ) * (0.0918/2.0);
                    // sum += texture2D( fogTexture, vec2( (vUv.x - 2.0 * h) / vUv.w, vUv.y / vUv.w ) ) * (0.12245/2.0);
                    // sum += texture2D( fogTexture, vec2( (vUv.x - 1.0 * h) / vUv.w, vUv.y / vUv.w ) ) * (0.1531/2.0);
                    // sum += texture2D( fogTexture, vec2( vUv.x / vUv.w, vUv.y / vUv.w ) ) * (0.1633/2.0);
                    // sum += texture2D( fogTexture, vec2( (vUv.x + 1.0 * h) / vUv.w, vUv.y / vUv.w ) ) * (0.1531/2.0);
                    // sum += texture2D( fogTexture, vec2( (vUv.x + 2.0 * h) / vUv.w, vUv.y / vUv.w ) ) * (0.12245/2.0);
                    // sum += texture2D( fogTexture, vec2( (vUv.x + 3.0 * h) / vUv.w, vUv.y / vUv.w ) ) * (0.0918/2.0);
                    // sum += texture2D( fogTexture, vec2( (vUv.x + 4.0 * h) / vUv.w, vUv.y / vUv.w ) ) * (0.051/2.0);
            
                    // gl_FragColor = diff;
                }`
        })
    }
})