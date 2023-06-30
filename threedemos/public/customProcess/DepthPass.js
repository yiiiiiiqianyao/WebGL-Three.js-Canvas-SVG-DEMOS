THREE.DepthPass = function(scene, camera) {
    THREE.Pass.call( this );

    this.scene = scene;
    this.camera = camera;


    this.depthTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
    
    this.depthTarget.texture.format = THREE.RGBFormat;
    this.depthTarget.texture.minFilter = THREE.NearestFilter;
    this.depthTarget.texture.magFilter = THREE.NearestFilter;
    this.depthTarget.texture.generateMipmaps = false;
    this.depthTarget.stencilBuffer = false;
    this.depthTarget.depthBuffer = true;
    this.depthTarget.depthTexture = new THREE.DepthTexture();
    this.depthTarget.depthTexture.type = THREE.UnsignedShortType;
    // this.depthTarget.depthTexture.anisotropy = 16

    renderer.autoClear = false
    renderer.setRenderTarget( this.depthTarget );
    renderer.render(scene, camera) // plane1的深度图
    renderer.autoClear = true
    renderer.setRenderTarget( null );

    this.calCameraVectors()

    this.depthMaterial = this.getDepthMaterial();
    this.fsQuad = new THREE.Pass.FullScreenQuad( this.depthMaterial );
}

THREE.DepthPass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {
    constructor: THREE.DepthPass,
    render: function(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
        
        this.depthMaterial.uniforms[ "colorTexture" ].value = readBuffer.texture;

        renderer.setRenderTarget( this.depthTarget );
        renderer.render( this.scene, this.camera );
        
        renderer.setRenderTarget( null );
        this.fsQuad.render( renderer );
    },

    calCameraVectors() { // 计算透视相机空间中四个角的相对向量
      
        let dis = camera.near
        let { fov, aspect } = camera
        let h = Math.tan(this.ang2rad(fov/2))*dis
        let w = h*aspect
        
        this.topLeftVec = new THREE.Vector3(-w, h, dis) // 边角向量
        let scale = this.topLeftVec.length()/dis // 斜边和中心的比例
        
        this.topLeftVec.normalize()
        this.topLeftVec.multiplyScalar(scale)
  
        
        this.topRightVec = new THREE.Vector3(w, h, dis)
        this.topRightVec.normalize()
        this.topRightVec.multiplyScalar(scale)
        
        this.bottomLeftVec = new THREE.Vector3(-w, -h, dis)
        this.bottomLeftVec.normalize()
        this.bottomLeftVec.multiplyScalar(scale)
      
        this.bottomRightVec = new THREE.Vector3(w, -h, dis)
        this.bottomRightVec.normalize()
        this.bottomRightVec.multiplyScalar(scale)
    },

    ang2rad(ang){ // 角度变弧度
        return (ang * Math.PI) / 180;
    },

    getDepthMaterial: function() {
        return new THREE.ShaderMaterial( {
            uniforms: {
                "colorTexture": { value: null },
                "depthTexture": { value: this.depthTarget.depthTexture },
                "cameraFar": { value: this.camera.far },
                "cameraNear": { value: this.camera.near },
                "cameraPos": { value: this.camera.position },
                "topLeftVec": { value: this.topLeftVec },
                "topRightVec": { value: this.topRightVec },
                "bottomLeftVec": { value: this.bottomLeftVec },
                "bottomRightVec": { value: this.bottomRightVec },
                "cameraMat": { value: this.camera.matrixWorldInverse } 
                // "cameraMat": { value: this.camera.matrix }
                // "cameraMat": { value: this.camera.matrixWorld }
			},
            vertexShader:
                `
                precision mediump sampler2D;
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
                precision mediump sampler2D;
                #include <packing>
                varying vec2 vUv;
                varying vec3 cameraVec;

                uniform float cameraFar;
                uniform float cameraNear;
                uniform vec3 cameraPos;
                uniform sampler2D colorTexture;
                uniform sampler2D depthTexture;

                uniform mat4 cameraMat;


                float readClipZ( sampler2D depthSampler, vec2 coord ) {
                    float fragCoordZ = texture2D( depthSampler, coord ).x;
                    return perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar ); // 返回相机空间的 viewZ（相对于相机空间的实际z）
                }

                void main() {
                    float clipZ = readClipZ( depthTexture, vUv );

                    vec4 diff = texture2D( colorTexture, vUv);
                    vec3 wP = cameraPos + (vec4(clipZ*cameraVec, 1.0)*cameraMat).xyz;
                    //vec3 wP = cameraPos + (vec4(vec3(clipZ), 1.0)*cameraMat).xyz*cameraVec;
                    //vec3 wP = cameraPos + clipZ*normalize(cameraVec);
               
                    //gl_FragColor = vec4(wP, 1.0);

                    if(distance(wP, (vec4(10.0, 0.0, 0.0, 1.0) * cameraMat).xyz) < 10.0) {
                    // if(distance(wP, vec3(0.0, 0.0, 0.0)) < 10.0) {
                        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
                    }else {
                        gl_FragColor = diff;
                    }
                }`
        })
    }
})