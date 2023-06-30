/**
 * @author mrdoob / http://mrdoob.com/
 */

function WebGLIndexedBufferRenderer( gl, extensions, info ) {

	var mode;
// 设置绘制绘制模式，value值为gl.LINES、gl.TRIANGLES等
	function setMode( value ) {

		mode = value;

	}

	var type, bytesPerElement;

	// index：BufferGeometry顶点索引属性index的值BufferAttribute对象
	// 参数value：attributes.get(index)返回值
	// 查看WebGLAttributes.js源码确定get方法返回值
	// {
	// 	buffer: buffer,
	// 	type: type,//根据类型化数组设置，比如gl.FLOAT、gl.SHORT....
	// 	bytesPerElement: array.BYTES_PER_ELEMENT,//BYTES_PER_ELEMENT属性代表了强类型数组中每个元素所占用的字节数
	// 	version: attribute.version
	// }
	function setIndex( value ) {
		// 数据类型
		type = value.type;
		// 类型化数组对象每个元素所占用的字节数
		bytesPerElement = value.bytesPerElement;

	}

	function render( start, count ) {

		gl.drawElements( mode, count, type, start * bytesPerElement );

		info.update( count, mode );

	}

	function renderInstances( geometry, start, count ) {

		var extension = extensions.get( 'ANGLE_instanced_arrays' );

		if ( extension === null ) {

			console.error( 'THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
			return;

		}

		extension.drawElementsInstancedANGLE( mode, count, type, start * bytesPerElement, geometry.maxInstancedCount );

		info.update( count, mode, geometry.maxInstancedCount );

	}

	//

	this.setMode = setMode;
	this.setIndex = setIndex;
	this.render = render;
	this.renderInstances = renderInstances;

}


export { WebGLIndexedBufferRenderer };
