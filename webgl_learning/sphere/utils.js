/**
 * {
      segments: number;
    }
 * @param {*} radius 
 * @param {*} opt 
 * @returns 
 */
function primitiveSphere( radius, opt ) {
    const matRotY = mat4.create();
    const matRotZ = mat4.create();
    const up = vec3.fromValues(0, 1, 0);
    const tmpVec3 = vec3.fromValues(0, 0, 0);
  
    opt = opt || {};
    radius = typeof radius !== 'undefined' ? radius : 1;
    const segments = typeof opt.segments !== 'undefined' ? opt.segments : 32;
  
    const totalZRotationSteps = 2 + segments;
    const totalYRotationSteps = 2 * totalZRotationSteps;
  
    const indices = [];
    const positions = [];
    var normals = []
    const uvs = [];
  
    for (
      let zRotationStep = 0;
      zRotationStep <= totalZRotationSteps;
      zRotationStep++
    ) {
      const normalizedZ = zRotationStep / totalZRotationSteps;
      const angleZ = normalizedZ * Math.PI;
  
      for (
        let yRotationStep = 0;
        yRotationStep <= totalYRotationSteps;
        yRotationStep++
      ) {
        const normalizedY = yRotationStep / totalYRotationSteps;
        const angleY = normalizedY * Math.PI * 2;
  
        mat4.identity(matRotZ);
        mat4.rotateZ(matRotZ, matRotZ, -angleZ);
  
        mat4.identity(matRotY);
        mat4.rotateY(matRotY, matRotY, angleY);
  
        vec3.transformMat4(tmpVec3, up, matRotZ);
        vec3.transformMat4(tmpVec3, tmpVec3, matRotY);
  
        vec3.scale(tmpVec3, tmpVec3, -radius);
  
        positions.push(tmpVec3.slice());
  
        vec3.normalize(tmpVec3, tmpVec3);
        normals.push(tmpVec3.slice())
  
        uvs.push([normalizedY, 1 - normalizedZ]);
  
        // position 和 uv 一起存储
      }
  
      if (zRotationStep > 0) {
        const verticesCount = positions.length;
        let firstIndex = verticesCount - 2 * (totalYRotationSteps + 1);
        for (
          ;
          firstIndex + totalYRotationSteps + 2 < verticesCount;
          firstIndex++
        ) {
          indices.push([
            firstIndex,
            firstIndex + 1,
            firstIndex + totalYRotationSteps + 1,
          ]);
       
          indices.push([
            firstIndex + totalYRotationSteps + 1,
            firstIndex + 1,
            firstIndex + totalYRotationSteps + 2,
          ]);
          
        }
      }
    }
  
    return {
      cells: indices,
      positions,
      uvs,
    };
  }