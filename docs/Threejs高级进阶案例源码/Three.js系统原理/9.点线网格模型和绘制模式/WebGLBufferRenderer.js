/**
 * @author mrdoob / http://mrdoob.com/
 */

function WebGLBufferRenderer( gl, extensions, info ) {
	// mode表示gl.drawArrays方法的绘制模式参数
	var mode;
	// 设置绘制绘制模式，value值为gl.LINES、gl.TRIANGLES等
	// WebGLRenderer.js的renderBufferDirect方法会调用该函数setMode
	function setMode( value ) {

		mode = value;

	}
	// 封装了WebGL API：gl.drawArrays()
	// WebGLRenderer.js的renderBufferDirect方法会调用该函数render
	function render( start, count ) {

		gl.drawArrays( mode, start, count );

		info.update( count, mode );

	}
// Instances：实例
// WebGLRenderer.js的renderBufferDirect方法会调用该函数renderInstances
// 渲染实例化缓冲几何体InstancedBufferGeometry
// 实例化缓冲几何体InstancedBufferGeometry的基类是BufferGeometry
	function renderInstances( geometry, start, count ) {

		var extension = extensions.get( 'ANGLE_instanced_arrays' );

		if ( extension === null ) {

			console.error( 'THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
			return;

		}

		var position = geometry.attributes.position;

		if ( position.isInterleavedBufferAttribute ) {

			count = position.data.count;

			extension.drawArraysInstancedANGLE( mode, 0, count, geometry.maxInstancedCount );

		} else {

			extension.drawArraysInstancedANGLE( mode, start, count, geometry.maxInstancedCount );

		}

		info.update( count, mode, geometry.maxInstancedCount );

	}

	//

	this.setMode = setMode;
	this.render = render;
	this.renderInstances = renderInstances;

}


export { WebGLBufferRenderer };
