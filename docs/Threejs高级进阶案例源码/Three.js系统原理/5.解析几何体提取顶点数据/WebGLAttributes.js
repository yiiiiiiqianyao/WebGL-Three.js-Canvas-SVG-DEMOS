/**
 * @author mrdoob / http://mrdoob.com/
 */

function WebGLAttributes( gl ) {

// WeakMap语法链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
	var buffers = new WeakMap();

// 参数attribute：包含顶点数据的BufferAttribute对象
	function createBuffer( attribute, bufferType ) {

// 通过array属性从BufferAttribute对象获得顶点的数据
		var array = attribute.array;
		var usage = attribute.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;

// 创建存储顶点的缓冲区
		var buffer = gl.createBuffer();
// 绑定激活缓冲区
		gl.bindBuffer( bufferType, buffer );
// 顶点缓冲区传入BufferAttribute对象的顶点数据
		gl.bufferData( bufferType, array, usage );

		attribute.onUploadCallback();

		var type = gl.FLOAT;

// 根据BufferAttribute.array的类型数组构造函数名字设置对应的webgl参数
		if ( array instanceof Float32Array ) {

			type = gl.FLOAT;

		} else if ( array instanceof Float64Array ) {

			console.warn( 'THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.' );

		} else if ( array instanceof Uint16Array ) {

			type = gl.UNSIGNED_SHORT;

		} else if ( array instanceof Int16Array ) {

			type = gl.SHORT;

		} else if ( array instanceof Uint32Array ) {

			type = gl.UNSIGNED_INT;

		} else if ( array instanceof Int32Array ) {

			type = gl.INT;

		} else if ( array instanceof Int8Array ) {

			type = gl.BYTE;

		} else if ( array instanceof Uint8Array ) {

			type = gl.UNSIGNED_BYTE;

		}

		return {
			buffer: buffer,
			type: type,
			bytesPerElement: array.BYTES_PER_ELEMENT,
			version: attribute.version
		};

	}

	function updateBuffer( buffer, attribute, bufferType ) {

		var array = attribute.array;
		var updateRange = attribute.updateRange;

		gl.bindBuffer( bufferType, buffer );

		if ( attribute.dynamic === false ) {

			gl.bufferData( bufferType, array, gl.STATIC_DRAW );

		} else if ( updateRange.count === - 1 ) {

			// Not using update ranges

			gl.bufferSubData( bufferType, 0, array );

		} else if ( updateRange.count === 0 ) {

			console.error( 'THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.' );

		} else {

			gl.bufferSubData( bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
				array.subarray( updateRange.offset, updateRange.offset + updateRange.count ) );

			updateRange.count = - 1; // reset range

		}

	}

	//通过get函数可以获得WeakMap对象attribute键对应的值
	// get函数的参数attribute是Threejs的WebGLAttributes对象
	// attribute：WebGLAttributes对象
	function get( attribute ) {

		if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

		return buffers.get( attribute );

	}

	function remove( attribute ) {

		if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

		var data = buffers.get( attribute );

		if ( data ) {

			gl.deleteBuffer( data.buffer );

			buffers.delete( attribute );

		}

	}

	function update( attribute, bufferType ) {

		if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

		var data = buffers.get( attribute );

		if ( data === undefined ) {
// 通过WeakMap对象的set方法设置WeakMap对象的键值对
			buffers.set( attribute, createBuffer( attribute, bufferType ) );

		} else if ( data.version < attribute.version ) {

			updateBuffer( data.buffer, attribute, bufferType );

			data.version = attribute.version;

		}

	}

	return {
// 返回一个对象
		get: get,
		remove: remove,
		update: update

	};

}


export { WebGLAttributes };
