
// constants for the shaders
var bounces = '5';
var epsilon = '0.0001';
var infinity = '10000.0';



// start of fragment shader
var tracerFragmentSourceHeader =
' precision highp float;' +
' uniform vec3 eye;' +
' varying vec3 initialRay;' +
' uniform float textureWeight;' +
' uniform float timeSinceStart;' +
' uniform sampler2D texture;' +
' uniform float glossiness;' +
' vec3 roomCubeMin = vec3(-1.0, -1.0, -1.0);' +
' vec3 roomCubeMax = vec3(1.0, 1.0, 1.0);';

// compute the near and far intersections of the cube (stored in the x and y components) using the slab method
// no intersection means vec.x > vec.y (really tNear > tFar)
var intersectCubeSource =
' vec2 intersectCube(vec3 origin, vec3 ray, vec3 cubeMin, vec3 cubeMax) {' +
'   vec3 tMin = (cubeMin - origin) / ray;' +
'   vec3 tMax = (cubeMax - origin) / ray;' +
'   vec3 t1 = min(tMin, tMax);' +
'   vec3 t2 = max(tMin, tMax);' +
'   float tNear = max(max(t1.x, t1.y), t1.z);' +
'   float tFar = min(min(t2.x, t2.y), t2.z);' +
'   return vec2(tNear, tFar);' +
' }';

// given that hit is a point on the cube, what is the surface normal?
// TODO: do this with fewer branches
var normalForCubeSource =
' vec3 normalForCube(vec3 hit, vec3 cubeMin, vec3 cubeMax)' +
' {' +
'   if(hit.x < cubeMin.x + ' + epsilon + ') return vec3(-1.0, 0.0, 0.0);' +
'   else if(hit.x > cubeMax.x - ' + epsilon + ') return vec3(1.0, 0.0, 0.0);' +
'   else if(hit.y < cubeMin.y + ' + epsilon + ') return vec3(0.0, -1.0, 0.0);' +
'   else if(hit.y > cubeMax.y - ' + epsilon + ') return vec3(0.0, 1.0, 0.0);' +
'   else if(hit.z < cubeMin.z + ' + epsilon + ') return vec3(0.0, 0.0, -1.0);' +
'   else return vec3(0.0, 0.0, 1.0);' +
' }';

// compute the near intersection of a sphere
// no intersection returns a value of +infinity
var intersectSphereSource =
' float intersectSphere(vec3 origin, vec3 ray, vec3 sphereCenter, float sphereRadius) {' +
'   vec3 toSphere = origin - sphereCenter;' +
'   float a = dot(ray, ray);' +
'   float b = 2.0 * dot(toSphere, ray);' +
'   float c = dot(toSphere, toSphere) - sphereRadius*sphereRadius;' +
'   float discriminant = b*b - 4.0*a*c;' +
'   if(discriminant > 0.0) {' +
'     float t = (-b - sqrt(discriminant)) / (2.0 * a);' +
'     if(t > 0.0) return t;' +
'   }' +
'   return ' + infinity + ';' +
' }';

// given that hit is a point on the sphere, what is the surface normal?
var normalForSphereSource =
' vec3 normalForSphere(vec3 hit, vec3 sphereCenter, float sphereRadius) {' +
'   return (hit - sphereCenter) / sphereRadius;' +
' }';

// use the fragment position for randomness
var randomSource =
' float random(vec3 scale, float seed) {' +
'   return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);' +
' }';

// random cosine-weighted distributed vector
// from http://www.rorydriscoll.com/2009/01/07/better-sampling/
var cosineWeightedDirectionSource =
' vec3 cosineWeightedDirection(float seed, vec3 normal) {' +
'   float u = random(vec3(12.9898, 78.233, 151.7182), seed);' +
'   float v = random(vec3(63.7264, 10.873, 623.6736), seed);' +
'   float r = sqrt(u);' +
'   float angle = 6.283185307179586 * v;' +
    // compute basis from normal
'   vec3 sdir, tdir;' +
'   if (abs(normal.x)<.5) {' +
'     sdir = cross(normal, vec3(1,0,0));' +
'   } else {' +
'     sdir = cross(normal, vec3(0,1,0));' +
'   }' +
'   tdir = cross(normal, sdir);' +
'   return r*cos(angle)*sdir + r*sin(angle)*tdir + sqrt(1.-u)*normal;' +
' }';

// random normalized vector
var uniformlyRandomDirectionSource =
' vec3 uniformlyRandomDirection(float seed) {' +
'   float u = random(vec3(12.9898, 78.233, 151.7182), seed);' +
'   float v = random(vec3(63.7264, 10.873, 623.6736), seed);' +
'   float z = 1.0 - 2.0 * u;' +
'   float r = sqrt(1.0 - z * z);' +
'   float angle = 6.283185307179586 * v;' +
'   return vec3(r * cos(angle), r * sin(angle), z);' +
' }';

// random vector in the unit sphere
// note: this is probably not statistically uniform, saw raising to 1/3 power somewhere but that looks wrong?
var uniformlyRandomVectorSource =
' vec3 uniformlyRandomVector(float seed) {' +
'   return uniformlyRandomDirection(seed) * sqrt(random(vec3(36.7539, 50.3658, 306.2759), seed));' +
' }';

// compute specular lighting contribution
var specularReflection =
' vec3 reflectedLight = normalize(reflect(light - hit, normal));' +
' specularHighlight = max(0.0, dot(reflectedLight, normalize(hit - origin)));';

// update ray using normal and bounce according to a diffuse reflection
var newDiffuseRay =
' ray = cosineWeightedDirection(timeSinceStart + float(bounce), normal);';

// update ray using normal according to a specular reflection
var newReflectiveRay =
' ray = reflect(ray, normal);' +
  specularReflection +
' specularHighlight = 2.0 * pow(specularHighlight, 20.0);';

// update ray using normal and bounce according to a glossy reflection
var newGlossyRay =
' ray = normalize(reflect(ray, normal)) + uniformlyRandomVector(timeSinceStart + float(bounce)) * glossiness;' +
  specularReflection +
' specularHighlight = pow(specularHighlight, 3.0);';

var yellowBlueCornellBox =
' if(hit.x < -0.9999) surfaceColor = vec3(0.1, 0.5, 1.0);' + // blue
' else if(hit.x > 0.9999) surfaceColor = vec3(1.0, 0.9, 0.1);'; // yellow

var redGreenCornellBox =
' if(hit.x < -0.9999) surfaceColor = vec3(1.0, 0.3, 0.1);' + // red
' else if(hit.x > 0.9999) surfaceColor = vec3(0.3, 1.0, 0.1);'; // green

function makeShadow(objects) {
  return '' +
' float shadow(vec3 origin, vec3 ray) {' +
    concat(objects, function(o){ return o.getShadowTestCode(); }) +
'   return 1.0;' +
' }';
}

function makeCalculateColor(objects) {
  return '' +
' vec3 calculateColor(vec3 origin, vec3 ray, vec3 light) {' +
'   vec3 colorMask = vec3(1.0);' +
'   vec3 accumulatedColor = vec3(0.0);' +
  
    // main raytracing loop
'   for(int bounce = 0; bounce < ' + bounces + '; bounce++) {' +
      // compute the intersection with everything
'     vec2 tRoom = intersectCube(origin, ray, roomCubeMin, roomCubeMax);' +
      concat(objects, function(o){ return o.getIntersectCode(); }) +

      // find the closest intersection
'     float t = ' + infinity + ';' +
'     if(tRoom.x < tRoom.y) t = tRoom.y;' +
      concat(objects, function(o){ return o.getMinimumIntersectCode(); }) +

      // info about hit
'     vec3 hit = origin + ray * t;' +
'     vec3 surfaceColor = vec3(0.75);' +
'     float specularHighlight = 0.0;' +
'     vec3 normal;' +

      // calculate the normal (and change wall color)
'     if(t  ==  tRoom.y) {' +
'       normal = -normalForCube(hit, roomCubeMin, roomCubeMax);' +
        [yellowBlueCornellBox, redGreenCornellBox][0] +
        newDiffuseRay +
'     } else if(t  ==  ' + infinity + ') {' +
'       break;' +
'     } else {' +
'       if(false) ;' + // hack to discard the first 'else' in 'else if'
        concat(objects, function(o){ return o.getNormalCalculationCode(); }) +
        [newDiffuseRay, newReflectiveRay, newGlossyRay][0] +
'     }' +

      // compute diffuse lighting contribution
'     vec3 toLight = light - hit;' +
'     float diffuse = max(0.0, dot(normalize(toLight), normal));' +

      // trace a shadow ray to the light
'     float shadowIntensity = shadow(hit + normal * ' + epsilon + ', toLight);' +

      // do light bounce
'     colorMask *= surfaceColor;' +
'     float lightVal = 0.5;' + 
'     accumulatedColor += colorMask * (lightVal * diffuse * shadowIntensity);' +
'     accumulatedColor += colorMask * specularHighlight * shadowIntensity;' +

      // calculate next origin
'     origin = hit;' +
'   }' +

'   return accumulatedColor;' +
' }';
}

function makeMain() {
  return '' +
' void main() {' +
'   float lightSize = 0.1;' + 
'   vec3 newLight = light + uniformlyRandomVector(timeSinceStart - 53.0) * lightSize;' +
'   vec3 texture = texture2D(texture, gl_FragCoord.xy / 512.0).rgb;' +
'   gl_FragColor = vec4(mix(calculateColor(eye, initialRay, newLight), texture, textureWeight), 1.0);' +
' }';
}

function makeTracerFragmentSource(objects) {
  return tracerFragmentSourceHeader +
  concat(objects, function(o){ return o.getGlobalCode(); }) +
  intersectCubeSource +
  normalForCubeSource +
  intersectSphereSource +
  normalForSphereSource +
  randomSource +
  cosineWeightedDirectionSource +
  uniformlyRandomDirectionSource +
  uniformlyRandomVectorSource +
  makeShadow(objects) +
  makeCalculateColor(objects) +
  makeMain();
}

////////////////////////////////////////////////////////////////////////////////
// utility functions
////////////////////////////////////////////////////////////////////////////////

function getEyeRay(matrix, x, y) {
  return matrix.multiply(Vector.create([x, y, 0, 1])).divideByW().ensure3().subtract(eye);
}

function setUniforms(program, uniforms) {
  for(var name in uniforms) {
    var value = uniforms[name];
    var location = gl.getUniformLocation(program, name);
    if(location  ==  null) continue;
    if(value instanceof Vector) {
      gl.uniform3fv(location, new Float32Array([value.elements[0], value.elements[1], value.elements[2]]));
    } else if(value instanceof Matrix) {
      gl.uniformMatrix4fv(location, false, new Float32Array(value.flatten()));
    } else {
      gl.uniform1f(location, value);
    }
  }
}

function concat(objects, func) {
  var text = '';
  for(var i = 0; i < objects.length; i++) {
    text += func(objects[i]);
  }
  return text;
}

Vector.prototype.ensure3 = function() {
  return Vector.create([this.elements[0], this.elements[1], this.elements[2]]);
};

Vector.prototype.ensure4 = function(w) {
  return Vector.create([this.elements[0], this.elements[1], this.elements[2], w]);
};

Vector.prototype.divideByW = function() {
  var w = this.elements[this.elements.length - 1];
  var newElements = [];
  for(var i = 0; i < this.elements.length; i++) {
    newElements.push(this.elements[i] / w);
  }
  return Vector.create(newElements);
};

Vector.min = function(a, b) {
  if(a.length != b.length) {
    return null;
  }
  var newElements = [];
  for(var i = 0; i < a.elements.length; i++) {
    newElements.push(Math.min(a.elements[i], b.elements[i]));
  }
  return Vector.create(newElements);
};

Vector.max = function(a, b) {
  if(a.length != b.length) {
    return null;
  }
  var newElements = [];
  for(var i = 0; i < a.elements.length; i++) {
    newElements.push(Math.max(a.elements[i], b.elements[i]));
  }
  return Vector.create(newElements);
};

function compileSource(source, type) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw 'compile error: ' + gl.getShaderInfoLog(shader);
  }
  return shader;
}

function compileShader(vertexSource, fragmentSource) {
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, compileSource(vertexSource, gl.VERTEX_SHADER));
  gl.attachShader(shaderProgram, compileSource(fragmentSource, gl.FRAGMENT_SHADER));
  gl.linkProgram(shaderProgram);
  if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    throw 'link error: ' + gl.getProgramInfoLog(shaderProgram);
  }
  return shaderProgram;
}

////////////////////////////////////////////////////////////////////////////////
// class Sphere
////////////////////////////////////////////////////////////////////////////////

function Sphere(center, radius, id) {
  this.center = center;
  this.radius = radius;
  this.centerStr = 'sphereCenter' + id;
  this.radiusStr = 'sphereRadius' + id;
  this.intersectStr = 'tSphere' + id;
  this.temporaryTranslation = Vector.create([0, 0, 0]);
}

Sphere.prototype.getGlobalCode = function() {
  return '' +
' uniform vec3 ' + this.centerStr + ';' +
' uniform float ' + this.radiusStr + ';';
};

Sphere.prototype.getIntersectCode = function() {
  return '' +
' float ' + this.intersectStr + ' = intersectSphere(origin, ray, ' + this.centerStr + ', ' + this.radiusStr + ');';
};

Sphere.prototype.getShadowTestCode = function() {
  return '' +
  this.getIntersectCode() + 
' if(' + this.intersectStr + ' < 1.0) return 0.0;';
};

Sphere.prototype.getMinimumIntersectCode = function() {
  return '' +
' if(' + this.intersectStr + ' < t) t = ' + this.intersectStr + ';';
};

Sphere.prototype.getNormalCalculationCode = function() {
  return '' +
' else if(t  ==  ' + this.intersectStr + ') normal = normalForSphere(hit, ' + this.centerStr + ', ' + this.radiusStr + ');';
};

Sphere.prototype.setUniforms = function(renderer) {
  renderer.uniforms[this.centerStr] = this.center.add(this.temporaryTranslation);
  renderer.uniforms[this.radiusStr] = this.radius;
};

Sphere.prototype.intersect = function(origin, ray) {
  return Sphere.intersect(origin, ray, this.center.add(this.temporaryTranslation), this.radius);
};

Sphere.intersect = function(origin, ray, center, radius) {
  var toSphere = origin.subtract(center);
  var a = ray.dot(ray);
  var b = 2*toSphere.dot(ray);
  var c = toSphere.dot(toSphere) - radius*radius;
  var discriminant = b*b - 4*a*c;
  if(discriminant > 0) {
    var t = (-b - Math.sqrt(discriminant)) / (2*a);
    if(t > 0) {
      return t;
    }
  }
  return Number.MAX_VALUE;
};

////////////////////////////////////////////////////////////////////////////////
// class Light
////////////////////////////////////////////////////////////////////////////////

function Light() {
  this.temporaryTranslation = Vector.create([0, 0, 0]);
}

Light.prototype.getGlobalCode = function() {
  return 'uniform vec3 light;';
};

Light.prototype.getIntersectCode = function() {
  return '';
};

Light.prototype.getShadowTestCode = function() {
  return '';
};

Light.prototype.getMinimumIntersectCode = function() {
  return '';
};

Light.prototype.getNormalCalculationCode = function() {
  return '';
};

Light.prototype.setUniforms = function(renderer) {
  renderer.uniforms.light = light.add(this.temporaryTranslation);
};

Light.prototype.intersect = function(origin, ray) {
  return Number.MAX_VALUE;
};

function PathTracer() {
  
  // create vertex buffer
  var vertices = [
    -1, -1,
    -1, +1,
    +1, -1,
    +1, +1
  ];
  this.vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // create framebuffer
  this.framebuffer = gl.createFramebuffer();

  // create textures => two textures
  var type = gl.getExtension('OES_texture_float') ? gl.FLOAT : gl.UNSIGNED_BYTE;
  this.textures = [];
  for(var i = 0; i < 2; i++) {
      this.textures.push(gl.createTexture());
    gl.bindTexture(gl.TEXTURE_2D, this.textures[i]);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 512, 512, 0, gl.RGB, type, null);
  }
  gl.bindTexture(gl.TEXTURE_2D, null);

  // create render shader
  const renderVertexSource = `
  attribute vec3 vertex;
  varying vec2 texCoord;
  void main() {
    texCoord = vertex.xy * 0.5 + 0.5;
    gl_Position = vec4(vertex, 1.0);
  }
  `
  const renderFragmentSource = `
  precision highp float;
  varying vec2 texCoord;
  uniform sampler2D texture;
  void main() {
    gl_FragColor = texture2D(texture, texCoord);
  }
  `
  this.renderProgram = compileShader(renderVertexSource, renderFragmentSource);
  this.renderVertexAttribute = gl.getAttribLocation(this.renderProgram, 'vertex');
  gl.enableVertexAttribArray(this.renderVertexAttribute);

  // objects and shader will be filled in when setObjects() is called
  this.objects = [];
  this.sampleCount = 0;
  this.tracerProgram = null;
}

PathTracer.prototype.setObjects = function(objects) {
  this.uniforms = {};
  this.sampleCount = 0;
  this.objects = objects;
  
  const tracerVertexSource = ` // vertex shader, interpolate ray per-pixel
  attribute vec3 vertex; 
  uniform vec3 eye, ray00, ray01, ray10, ray11; 
  varying vec3 initialRay; 
  void main() {   
    vec2 percent = vertex.xy * 0.5 + 0.5;  // -1 ~ 1 => 0 ~ 1 
    initialRay = mix(mix(ray00, ray01, percent.y), mix(ray10, ray11, percent.y), percent.x);   
    gl_Position = vec4(vertex, 1.0); 
  }`

  const tracerFragmentSource = `
precision highp float;
uniform vec3 eye;
uniform vec3 light;
uniform float glossiness;
uniform sampler2D texture;

varying vec3 initialRay; // 

uniform float textureWeight;
uniform float timeSinceStart;

vec3 roomCubeMin=vec3(-1.,-1.,-1.);
vec3 roomCubeMax=vec3(1.,1.,1.);

uniform vec3 sphereCenter0;
uniform float sphereRadius0;

vec2 intersectCube(vec3 origin,vec3 ray,vec3 cubeMin,vec3 cubeMax){
    vec3 tMin=(cubeMin-origin) / ray;
    vec3 tMax=(cubeMax-origin) / ray;
    vec3 t1=min(tMin,tMax);
    vec3 t2=max(tMin,tMax);
    float tNear=max(max(t1.x,t1.y),t1.z);
    float tFar=min(min(t2.x,t2.y),t2.z);
    return vec2(tNear,tFar);
}
vec3 normalForCube(vec3 hit,vec3 cubeMin,vec3 cubeMax){
  if(hit.x<cubeMin.x+.0001) {
    return vec3(-1.,0.,0.);
  } else if(hit.x>cubeMax.x-.0001) {
    return vec3(1.,0.,0.);
  } else if(hit.y<cubeMin.y+.0001) {
    return vec3(0.,-1.,0.);
  } else if(hit.y>cubeMax.y-.0001) {
    return vec3(0.,1.,0.);
  } else if(hit.z<cubeMin.z+.0001) {
    return vec3(0.,0.,-1.);
  } else {
    return vec3(0.,0.,1.);
  }
}
float intersectSphere(vec3 origin,vec3 ray,vec3 sphereCenter,float sphereRadius){
  vec3 toSphere = origin - sphereCenter;
  float a = dot(ray,ray);
  float b = 2. * dot(toSphere,ray);
  float c = dot(toSphere,toSphere) - sphereRadius * sphereRadius;
  float discriminant = b * b - 4. * a * c;
  if(discriminant > 0.){
    float t = (-b - sqrt(discriminant)) / ( 2.* a);
    if( t > 0. ){
      return t;
    }
  }
  return 10000.;
}
vec3 normalForSphere(vec3 hit,vec3 sphereCenter,float sphereRadius){
  return(hit-sphereCenter)/sphereRadius;
}
float random(vec3 scale,float seed){
  return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);
}
vec3 cosineWeightedDirection(float seed,vec3 normal){
  float u = random(vec3(12.9898,78.233,151.7182),seed);
  float v = random(vec3(63.7264,10.873,623.6736),seed);
  float r = sqrt(u);
  float angle=6.283185307179586 * v;
  vec3 sdir, tdir;
  if(abs(normal.x)<.5){
    sdir = cross(normal,vec3(1,0,0));
  }else{
    sdir = cross(normal,vec3(0,1,0));
  }
  tdir = cross(normal,sdir);
  return r*cos(angle)*sdir+r*sin(angle)*tdir+sqrt(1.-u)*normal;
}
vec3 uniformlyRandomDirection(float seed){
  float u = random(vec3(12.9898,78.233,151.7182),seed);
  float v = random(vec3(63.7264,10.873,623.6736),seed);
  float z = 1.-2.*u;
  float r = sqrt(1.-z*z);
  float angle=6.283185307179586*v;
  return vec3(r*cos(angle),r*sin(angle),z);
}
vec3 uniformlyRandomVector(float seed){
  return uniformlyRandomDirection(seed)*sqrt(random(vec3(36.7539,50.3658,306.2759),seed));
}
float shadow(vec3 origin,vec3 ray){
  float tSphere0=intersectSphere(origin,ray,sphereCenter0,sphereRadius0);
  if(tSphere0<1.) {
    return 0.;
  }
  return 1.;
}
vec3 calculateColor(vec3 origin,vec3 ray,vec3 light){
  vec3 colorMask = vec3(1.);
  vec3 accumulatedColor = vec3(0.);
  for(int bounce = 0;bounce<5;bounce++) {
      vec2 tRoom = intersectCube(origin, ray, roomCubeMin, roomCubeMax);
      float tSphere0=intersectSphere(origin,ray,sphereCenter0,sphereRadius0);
      float t = 10000.;
      if(tRoom.x < tRoom.y) {
          t = tRoom.y;
      }  
      if(tSphere0<t) {
          t = tSphere0;
      }
      vec3 hit = origin+ray*t;
      vec3 surfaceColor = vec3(.75);
      float specularHighlight = 0.;
      vec3 normal;
      if(t == tRoom.y){
          normal =- normalForCube(hit,roomCubeMin,roomCubeMax);
          if(hit.x<-.9999) {
              surfaceColor = vec3(.1,.5,1.);
          } else if(hit.x > .9999) {
              surfaceColor = vec3(1., .9, .1);
          }
          ray = cosineWeightedDirection(timeSinceStart+float(bounce),normal);
      }else if(t == 10000.){
          break;
      }else{
          if(false);
          else if(t == tSphere0) {
              normal = normalForSphere(hit,sphereCenter0,sphereRadius0);
          }
          ray = cosineWeightedDirection(timeSinceStart+float(bounce),normal);
      }
      vec3 toLight = light - hit;
      float diffuse = max(0.,dot(normalize(toLight),normal));
      float shadowIntensity = shadow(hit+normal*.0001,toLight);
      colorMask *= surfaceColor;
      float lightVal =.5;
      accumulatedColor += colorMask*(lightVal*diffuse*shadowIntensity);
      accumulatedColor += colorMask*specularHighlight*shadowIntensity;
      origin = hit;
    }
    return accumulatedColor;
  }
  void main(){
      float lightSize =.1;
      vec3 newLight = light + uniformlyRandomVector(timeSinceStart - 53.) * lightSize;
      vec3 texture = texture2D(texture, gl_FragCoord.xy/512.).rgb;
      vec3 diffuse = mix(calculateColor(eye, initialRay, newLight), texture, textureWeight);
      gl_FragColor = vec4(diffuse, 1.);
  }
  `

  this.tracerProgram = compileShader(tracerVertexSource, tracerFragmentSource);
  this.tracerVertexAttribute = gl.getAttribLocation(this.tracerProgram, 'vertex');
  gl.enableVertexAttribArray(this.tracerVertexAttribute);
};

PathTracer.prototype.update = function(matrix, timeSinceStart) {
  // calculate uniforms
  for(var i = 0; i < this.objects.length; i++) {
    this.objects[i].setUniforms(this);
  }
  this.uniforms.eye = eye;
  this.uniforms.glossiness = 0.6;
  this.uniforms.ray00 = getEyeRay(matrix, -1, -1);
  this.uniforms.ray01 = getEyeRay(matrix, -1, +1);
  this.uniforms.ray10 = getEyeRay(matrix, +1, -1);
  this.uniforms.ray11 = getEyeRay(matrix, +1, +1);
  this.uniforms.timeSinceStart = timeSinceStart;
  this.uniforms.textureWeight = this.sampleCount / (this.sampleCount + 1);
  // console.log('this.uniforms.textureWeight', this.uniforms.textureWeight)

  // set uniforms
  gl.useProgram(this.tracerProgram);
  setUniforms(this.tracerProgram, this.uniforms);

  // render to texture
  gl.useProgram(this.tracerProgram);
  gl.bindTexture(gl.TEXTURE_2D, this.textures[0]);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textures[1], 0);
  gl.vertexAttribPointer(this.tracerVertexAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  // ping pong textures
  this.textures.reverse();
  this.sampleCount++;
};

PathTracer.prototype.render = function() {
  gl.useProgram(this.renderProgram);
  gl.bindTexture(gl.TEXTURE_2D, this.textures[0]);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.vertexAttribPointer(this.renderVertexAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};


var gl;

var eye = Vector.create([0, 0, 2.5]);
var light = Vector.create([0.4, 0.5, -0.6]);
var mvp =  Matrix.create([
  [1.9209821269711662, 0, 0, 0],
  [0, 1.9209821269711662, 0, 0],
  [0, 0, -1.002002002002002, 2.304804804804805],
  [0, 0, -1, 2.5]
])


window.onload = function() {
  gl = document.getElementById('canvas').getContext('webgl');

  var pathTracer = new PathTracer();
  
  pathTracer.setObjects([new Light(), new Sphere(Vector.create([0, 0, 0]), 0.25, 0)]);

  // const renderFrameDuration = 1000 / 60;
  const renderFrameDuration = 1000;
  var start = new Date();
  setInterval(function(){ 
    var timeSinceStart = (new Date() - start) * 0.001
    
    // jitter 抖动
    var jitter = Matrix.Translation(
      Vector.create(
        [
          Math.random() * 2 - 1, 
          Math.random() * 2 - 1, 
          0
        ])
        .multiply(1 / 512));
    var inverse = jitter.multiply(mvp).inverse();
    pathTracer.update(inverse, timeSinceStart);


    pathTracer.render();
  }, renderFrameDuration);
};