$(document).ready(function() {
    Initialize();
    PopulateScenes();
    SetupComposers();

    animate();
});

ScreenBoundingBox = function(topRight, bottomLeft) {
    this.TopRight = topRight;
    this.BottomLeft = bottomLeft;
}

BoundingBoxVertices = function(width, height, depth) {
    var boundingBoxGeometry = new THREE.CubeGeometry(width, height, depth);

    this.UpdateScreenBoundingBox = function(matrixWorld, camera, screenBoundingBox) {
        screenBoundingBox.TopRight.x = 0;
        screenBoundingBox.TopRight.y = 0;
        screenBoundingBox.BottomLeft.x = 1;
        screenBoundingBox.BottomLeft.y = 1;

        for (var i = 0; i < boundingBoxGeometry.vertices.length; i++) {
            var transformedVertex = new THREE.Vector3()
                .copy(boundingBoxGeometry.vertices[i])
                .applyMatrix4(matrixWorld)
                .project(camera);

            transformedVertex.x = (transformedVertex.x * 0.5) + 0.5;
            transformedVertex.y = 1.0 - ((transformedVertex.y * -0.5) + 0.5);

            if (transformedVertex.x < screenBoundingBox.BottomLeft.x) screenBoundingBox.BottomLeft.x = transformedVertex.x;
            if (transformedVertex.y < screenBoundingBox.BottomLeft.y) screenBoundingBox.BottomLeft.y = transformedVertex.y;
            if (transformedVertex.x > screenBoundingBox.TopRight.x) screenBoundingBox.TopRight.x = transformedVertex.x;
            if (transformedVertex.y > screenBoundingBox.TopRight.y) screenBoundingBox.TopRight.y = transformedVertex.y;
        }
    }
}

// Scene-related variables that will be needed throughout various functions.
var camera = null;
var renderer = null;
var scene = null;
var blurScene = null;
var controls = null;
var blurComposer = null;
var sceneComposer = null;
var glowCube = null;

var screenBoundingBox = new ScreenBoundingBox(new THREE.Vector2(), new THREE.Vector2());
var glowCubeBoundingBoxVertices = null;


// Set up the scene camera, renderer and controls to control the camera.
var Initialize = function() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 200;

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        logarithmicDepthBuffer: true
    });
    renderer.setClearColor(0x000000, 0.0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    $('#glContainer').append(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    scene = new THREE.Scene();
    blurScene = new THREE.Scene();

    blurComposer = new THREE.EffectComposer(renderer);
    sceneComposer = new THREE.EffectComposer(renderer);
}

// Set up the main scene, blur scene, and blur mask.
var PopulateScenes = function() {
    // This cube will be the source from which the glow emanates.
    var cube = CreateCube({
        size: 50,
        color: 0xFFFFFF
    });

    // Cube that sits in front of the glowing cube.
    var opaqueCube = CreateCube({
        size: 30,
        color: 0xAAAAFF,
        position: new THREE.Vector3(0, 0, 60)
    });

    // This cube effectively creates a mask in the blur scene. It mirrors the position of the opaque cube.
    // If you examine the 'CreateCube' method, you'll see that we are creating a material with an opacity of 0, but a disabled transparent flag.
    // This material is equivalent to the following fragment shader: "gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);"
    var opaqueCube_BlurObstruction = CreateCube({
        size: 30,
        color: 0xFFFFFF,
        opacity: 0.0,
        position: new THREE.Vector3(0, 0, 60)
    });

    // This is the cube that represents the actual glow of the first cube we created.
    // Notice its size is slightly bigger than the source cube. The size can be adjusted creating a smaller/larger glow.
    glowCube = CreateCube({
        size: 60,
        color: 0xFFFFFF
    });

    // Create a bounding box that is slightly bigger than the glow cube.
    glowCubeBoundingBoxVertices = new BoundingBoxVertices(65, 65, 65);

    // Set up a point light in the main scene.
    var light = new THREE.PointLight(0xff0000, 1, 1000);
    light.position.set(50, 50, 50);

    // Mirror the same light in the blur scene.
    var blurLight = new THREE.PointLight(0xff0000, 1, 1000);
    blurLight.position.set(50, 50, 50);

    scene.add(light);
    scene.add(new THREE.AmbientLight(0x222222));
    scene.add(cube);
    scene.add(opaqueCube);

    blurScene.add(blurLight);
    blurScene.add(new THREE.AmbientLight(0x222222));
    blurScene.add(glowCube);
    blurScene.add(opaqueCube_BlurObstruction);
}

// Helper function that will create a cube and cube material based on the function parameters.
// Possible parameters: color, size, opacity, position
var CreateCube = function(params) {
    var cubeGeometry = new THREE.CubeGeometry(params.size, params.size, params.size);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: params.color,
        opacity: params.opacity != undefined ? params.opacity : 1.0,
        transparent: false,
        shading: THREE.SmoothShading
    });

    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    if (params.position != undefined)
        cube.position.copy(params.position);

    return cube;
}

// Set up THREE.Composer objects to render / blur the scenes.
var SetupComposers = function() {
    // To ensure the alpha channel is preserved while blurring, set the formats of both renderTarget1 and renderTarget2 to RGBA for the blur composer.
    blurComposer.renderTarget2.texture.format = blurComposer.renderTarget1.texture.format = THREE.RGBAFormat;

    // Create a couple blur passes to blur the regular scene output. Note that each one of these objects will have a horizontal blur pass and a vertical blur pass.
    var blur1Passes = CreateBlurShaderPasses(window.innerWidth, window.innerHeight, 4);
    var blur2Passes = CreateBlurShaderPasses(window.innerWidth, window.innerHeight, 2);

    var blurPass = new THREE.RenderPass(blurScene, camera);
    blurPass.clear = true;
    blurPass.clearAlpha = 0.0;

    blurComposer.addPass(blurPass);
    blurComposer.addPass(blur1Passes.horizontalPass);
    blurComposer.addPass(blur1Passes.verticalPass);
    blurComposer.addPass(blur2Passes.horizontalPass);
    blurComposer.addPass(blur2Passes.verticalPass);

    // Set up a simple shader that will overlay the blurred scene image over the regular scene image.
    var overlayShader = {
        uniforms: {
            tDiffuse: {
                type: "t",
                value: 0,
                texture: null
            }, // The base scene buffer
            tOverlay: {
                type: "t",
                value: 1,
                texture: null
            } // The glow scene buffer
        },

        vertexShader: $('#simpleVertex').html(),
        fragmentShader: $('#overlayFrag').html()
    };

    var scenePass = new THREE.RenderPass(scene, camera);
    scenePass.clear = true;

    overlayShader.uniforms["tOverlay"].value = blurComposer.renderTarget2;
    var overlayPass = new THREE.ShaderPass(overlayShader);
    overlayPass.renderToScreen = true;

    sceneComposer.addPass(scenePass);
    sceneComposer.addPass(overlayPass);
}

// This function simply creates a pair of THREE.ShaderPass objects (horizontal and vertical passes).
// Since we are using the THREEJS composer object, the blur shader uniforms must be specifically named to fit into the THREEJS composer pipeline.
// In a THREEJS composer, each pass takes in the result of the previous pass via a texture called 'tDiffuse'.
var CreateBlurShaderPasses = function(h, v, blurriness) {
    var HBlurShader = {
        uniforms: {
            tDiffuse: {
                type: "t",
                value: null
            },
            h: {
                type: "f",
                value: blurriness / h
            },
            screenBoundingBox: {
                value: null
            }
        },
        vertexShader: $('#simpleVertex').html(),
        fragmentShader: $('#horizontalBlurFrag').html()
    };

    var VBlurShader = {
        uniforms: {
            tDiffuse: {
                type: "t",
                value: null
            },
            v: {
                type: "f",
                value: blurriness / v
            },
            screenBoundingBox: {
                value: null
            }
        },
        vertexShader: $('#simpleVertex').html(),
        fragmentShader: $('#verticalBlurFrag').html()
    };

    var HBlur = new THREE.ShaderPass(HBlurShader);
    var VBlur = new THREE.ShaderPass(VBlurShader);

    // Important: When creating a ShaderPass, uniforms are cloned, and so will not have a valid pointer to the boundingBoxes object.
    // So, we'll set these uniform values AFTER the shader pass has been created, rather than in the definition of the shader as we do with other uniforms.
    HBlur.material.uniforms.screenBoundingBox.value = screenBoundingBox;
    VBlur.material.uniforms.screenBoundingBox.value = screenBoundingBox;

    return {
        horizontalPass: HBlur,
        verticalPass: VBlur
    };
}

var RenderGlowScene = function() {
    controls.update();

    // The 'matrixWorld' matrix will be used to update the bounding boxes. So, we need to make sure the matrix is updated before calculating.
    glowCube.updateMatrixWorld();
    glowCubeBoundingBoxVertices.UpdateScreenBoundingBox(glowCube.matrixWorld, camera, screenBoundingBox);

    blurComposer.render();
    sceneComposer.render();
}

function animate() {
    requestAnimationFrame(animate);

    RenderGlowScene();
}