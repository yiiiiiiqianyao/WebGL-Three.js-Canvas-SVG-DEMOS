/**
 * @author tschw
 *
 * Uniforms of a program.
 * Those form a tree structure with a special top-level container for the root,
 * which you get by calling 'new WebGLUniforms( gl, program, renderer )'.
 *
 *
 * Properties of inner nodes including the top-level container:
 *
 * .seq - array of nested uniforms
 * .map - nested uniforms by name
 *
 *
 * Methods of all nodes except the top-level container:
 *
 * .setValue( gl, value, [renderer] )
 *
 * 		uploads a uniform value(s)
 *  	the 'renderer' parameter is needed for sampler uniforms
 *
 *
 * Static methods of the top-level container (renderer factorizations):
 *
 * .upload( gl, seq, values, renderer )
 *
 * 		sets uniforms in 'seq' to 'values[id].value'
 *
 * .seqWithValue( seq, values ) : filteredSeq
 *
 * 		filters 'seq' entries with corresponding entry in values
 *
 *
 * Methods of the top-level container (renderer factorizations):
 *
 * .setValue( gl, name, value )
 *
 * 		sets uniform with  name 'name' to 'value'
 *
 * .set( gl, obj, prop )
 *
 * 		sets uniform from object and property with same name than uniform
 *
 * .setOptional( gl, obj, prop )
 *
 * 		like .set for an optional property of the object
 *
 */

import { CubeTexture } from '../../textures/CubeTexture.js';
import { Texture } from '../../textures/Texture.js';

var emptyTexture = new Texture();
var emptyCubeTexture = new CubeTexture();

// --- Base for inner nodes (including the root) ---

function UniformContainer() {

	this.seq = [];
	this.map = {};

}

// --- Utilities ---

// Array Caches (provide typed arrays for temporary by size)

var arrayCacheF32 = [];
var arrayCacheI32 = [];

// Float32Array caches used for uploading Matrix uniforms

var mat4array = new Float32Array( 16 );
var mat3array = new Float32Array( 9 );

// Flattening for arrays of vectors and matrices
// 向量和矩阵数组的平坦化

function flatten( array, nBlocks, blockSize ) {

	var firstElem = array[ 0 ];

	if ( firstElem <= 0 || firstElem > 0 ) return array;
	// unoptimized: ! isNaN( firstElem )
	// see http://jacksondunstan.com/articles/983

	var n = nBlocks * blockSize,
		r = arrayCacheF32[ n ];

	if ( r === undefined ) {

		r = new Float32Array( n );
		arrayCacheF32[ n ] = r;

	}

	if ( nBlocks !== 0 ) {

		firstElem.toArray( r, 0 );

		for ( var i = 1, offset = 0; i !== nBlocks; ++ i ) {

			offset += blockSize;
			array[ i ].toArray( r, offset );

		}

	}

	return r;

}

// Texture unit allocation

function allocTexUnits( renderer, n ) {

	var r = arrayCacheI32[ n ];

	if ( r === undefined ) {

		r = new Int32Array( n );
		arrayCacheI32[ n ] = r;

	}

	for ( var i = 0; i !== n; ++ i )
		r[ i ] = renderer.allocTextureUnit();

	return r;

}

// --- Setters ---

// Note: Defining these methods externally, because they come in a bunch
// and this way their names minify.

// Single scalar

function setValue1f( gl, v ) {
// this.addr是uniform变量地址  用来传递数据
// v是什么？按照WebGL API标准  应该是要传递的数据  在这里应该是一个浮点数
// 至于浮点数  v是光照相关  还是其他应该是相通的
	gl.uniform1f( this.addr, v );

}

function setValue1i( gl, v ) {
// v这里是一个整数
	gl.uniform1i( this.addr, v );

}

// Single float vector (from flat array or THREE.VectorN)

function setValue2fv( gl, v ) {

	if ( v.x === undefined ) {

		gl.uniform2fv( this.addr, v );

	} else {

		gl.uniform2f( this.addr, v.x, v.y );

	}

}
// v对应着色器中的vec3数据类型     对应threejs中的Vector3
function setValue3fv( gl, v ) {

	if ( v.x !== undefined ) {

		gl.uniform3f( this.addr, v.x, v.y, v.z );

	} else if ( v.r !== undefined ) {

		gl.uniform3f( this.addr, v.r, v.g, v.b );

	} else {

		gl.uniform3fv( this.addr, v );

	}

}

function setValue4fv( gl, v ) {

	if ( v.x === undefined ) {

		gl.uniform4fv( this.addr, v );

	} else {

		 gl.uniform4f( this.addr, v.x, v.y, v.z, v.w );

	}

}

// Single matrix (from flat array or MatrixN)

function setValue2fm( gl, v ) {

	gl.uniformMatrix2fv( this.addr, false, v.elements || v );

}

function setValue3fm( gl, v ) {

	if ( v.elements === undefined ) {

		gl.uniformMatrix3fv( this.addr, false, v );

	} else {

		mat3array.set( v.elements );
		gl.uniformMatrix3fv( this.addr, false, mat3array );

	}

}
// v是threejs的对象Maatrix4
// 需要把Maatrix4中的16个元素提取出来传入new Float32Array( 16 )
function setValue4fm( gl, v ) {

	if ( v.elements === undefined ) {

		gl.uniformMatrix4fv( this.addr, false, v );

	} else {
// mat4array是对象new Float32Array( 16 )
// elements属性是一个普通的JavaScript数组，16个元素
// this.elements = [
// 	1, 0, 0, 0,
// 	0, 1, 0, 0,
// 	0, 0, 1, 0,
// 	0, 0, 0, 1
// ];
// uniformMatrix4fv API要求mat4array参数是浮点数类型化数组Float32Array( 16 )
// 类型化数组的set方法用于复制数组，也就是将一段内容完全复制到另一段内存
		mat4array.set( v.elements );
		gl.uniformMatrix4fv( this.addr, false, mat4array );

	}

}

// Single texture (2D / Cube)

function setValueT1( gl, v, renderer ) {

	var unit = renderer.allocTextureUnit();
	gl.uniform1i( this.addr, unit );
	renderer.setTexture2D( v || emptyTexture, unit );

}

function setValueT6( gl, v, renderer ) {

	var unit = renderer.allocTextureUnit();
	gl.uniform1i( this.addr, unit );
	renderer.setTextureCube( v || emptyCubeTexture, unit );

}

// Integer / Boolean vectors or arrays thereof (always flat arrays)

function setValue2iv( gl, v ) {

	gl.uniform2iv( this.addr, v );

}

function setValue3iv( gl, v ) {

	gl.uniform3iv( this.addr, v );

}

function setValue4iv( gl, v ) {

	gl.uniform4iv( this.addr, v );

}

// Helper to pick the right setter for the singular case

function getSingularSetter( type ) {

	switch ( type ) {

		case 0x1406: return setValue1f; // FLOAT
		case 0x8b50: return setValue2fv; // _VEC2
		case 0x8b51: return setValue3fv; // _VEC3
		case 0x8b52: return setValue4fv; // _VEC4

		case 0x8b5a: return setValue2fm; // _MAT2
		case 0x8b5b: return setValue3fm; // _MAT3
		case 0x8b5c: return setValue4fm; // _MAT4

		case 0x8b5e: case 0x8d66: return setValueT1; // SAMPLER_2D, SAMPLER_EXTERNAL_OES
		case 0x8b60: return setValueT6; // SAMPLER_CUBE

		case 0x1404: case 0x8b56: return setValue1i; // INT, BOOL
		case 0x8b53: case 0x8b57: return setValue2iv; // _VEC2
		case 0x8b54: case 0x8b58: return setValue3iv; // _VEC3
		case 0x8b55: case 0x8b59: return setValue4iv; // _VEC4

	}

}

// Array of scalars

function setValue1fv( gl, v ) {

	gl.uniform1fv( this.addr, v );

}
function setValue1iv( gl, v ) {

	gl.uniform1iv( this.addr, v );

}

// Array of vectors (flat or from THREE classes)

function setValueV2a( gl, v ) {

	gl.uniform2fv( this.addr, flatten( v, this.size, 2 ) );

}

function setValueV3a( gl, v ) {

	gl.uniform3fv( this.addr, flatten( v, this.size, 3 ) );

}

function setValueV4a( gl, v ) {

	gl.uniform4fv( this.addr, flatten( v, this.size, 4 ) );

}

// Array of matrices (flat or from THREE clases)

function setValueM2a( gl, v ) {

	gl.uniformMatrix2fv( this.addr, false, flatten( v, this.size, 4 ) );

}

function setValueM3a( gl, v ) {

	gl.uniformMatrix3fv( this.addr, false, flatten( v, this.size, 9 ) );

}

function setValueM4a( gl, v ) {

	gl.uniformMatrix4fv( this.addr, false, flatten( v, this.size, 16 ) );

}

// Array of textures (2D / Cube)

function setValueT1a( gl, v, renderer ) {

	var n = v.length,
		units = allocTexUnits( renderer, n );

	gl.uniform1iv( this.addr, units );

	for ( var i = 0; i !== n; ++ i ) {

		renderer.setTexture2D( v[ i ] || emptyTexture, units[ i ] );

	}

}

function setValueT6a( gl, v, renderer ) {

	var n = v.length,
		units = allocTexUnits( renderer, n );

	gl.uniform1iv( this.addr, units );

	for ( var i = 0; i !== n; ++ i ) {

		renderer.setTextureCube( v[ i ] || emptyCubeTexture, units[ i ] );

	}

}

// Helper to pick the right setter for a pure (bottom-level) array

function getPureArraySetter( type ) {

	switch ( type ) {

		case 0x1406: return setValue1fv; // FLOAT
		case 0x8b50: return setValueV2a; // _VEC2
		case 0x8b51: return setValueV3a; // _VEC3
		case 0x8b52: return setValueV4a; // _VEC4

		case 0x8b5a: return setValueM2a; // _MAT2
		case 0x8b5b: return setValueM3a; // _MAT3
		case 0x8b5c: return setValueM4a; // _MAT4

		case 0x8b5e: return setValueT1a; // SAMPLER_2D
		case 0x8b60: return setValueT6a; // SAMPLER_CUBE

		case 0x1404: case 0x8b56: return setValue1iv; // INT, BOOL
		case 0x8b53: case 0x8b57: return setValue2iv; // _VEC2
		case 0x8b54: case 0x8b58: return setValue3iv; // _VEC3
		case 0x8b55: case 0x8b59: return setValue4iv; // _VEC4

	}

}

// --- Uniform Classes ---
// id是着色器中uniform变量名字符串
// activeInfo包含变量的名字、type
// addr是变量的地址
// SingleUniform对象具有方法getSingularSetter
function SingleUniform( id, activeInfo, addr ) {

	this.id = id;
	this.addr = addr;
	this.setValue = getSingularSetter( activeInfo.type );

	// this.path = activeInfo.name; // DEBUG

}
// 结构体、数组对应的变量  多了一个  size属性
// 数组变量只调用一次
function PureArrayUniform( id, activeInfo, addr ) {

	this.id = id;
	this.addr = addr;
	this.size = activeInfo.size;
	this.setValue = getPureArraySetter( activeInfo.type );

	// this.path = activeInfo.name; // DEBUG

}

function StructuredUniform( id ) {

	this.id = id;
// 结构体uniform继承属性   sep、map两个属性webgluniforms对象具有   结构体变量对象也具有
// function UniformContainer() {
// 	this.seq = [];
// 	this.map = {};
// }
	UniformContainer.call( this ); // mix-in

}

StructuredUniform.prototype.setValue = function ( gl, value ) {

	// Note: Don't need an extra 'renderer' parameter, since samplers
	// are not allowed in structured uniforms.
// 批量设置   进行数据传递
	var seq = this.seq;

	for ( var i = 0, n = seq.length; i !== n; ++ i ) {

		var u = seq[ i ];
		u.setValue( gl, value[ u.id ] );

	}

};

// --- Top-level ---
// 解析器 - 从路径字符串path strings构建属性树property tree
// Parser - builds up the property tree from the path strings
// ([\w\d_]+)连续一个字母数字或下划线构成的字符串
// \]   \.  表示字符串含有  数组的下标或点符号
// (\[|\.)点或中括号的意思
var RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;

// extracts
// 	- the identifier (member name or array index)
// - 标识符（成员名称或数组索引）
//  - followed by an optional right bracket (found when array index)
// - 接着任选的右支架（当发现数组索引）
//  - followed by an optional left bracket or dot (type of subscript)
// - 接着任选的托架或左点（类型下标）
//
// Note: These portions can be read in a non-overlapping fashion and
// allow straightforward parsing of the hierarchy that WebGL encodes
// in the uniform names.
//注意：这些部分可以以非重叠的方式被读取并允许编码WebGL的层次结构的简单解析在统一的名称。

// container是renderer
function addUniform( container, uniformObject ) {
// sep包含了所有，无论id是否一样
// 插入seq中uniform变量对应的对象是否会过滤掉数组重复的部分，不考虑下标    结构体不考虑结构体的具体属性
	container.seq.push( uniformObject );
	// id相同的会覆盖吗
	container.map[ uniformObject.id ] = uniformObject;

}
// parseUniform( info, addr, this );    info含有着色器中uniform变量的名字  反应数据类型type的值
// this是renderer
function parseUniform( activeInfo, addr, container ) {
// 变量名字
	var path = activeInfo.name,
		pathLength = path.length;

	// reset RegExp object, because of the early exit of a previous run
	// 复位RegExp对象，因为以前运行的提前出局
	RePathPart.lastIndex = 0;

	for ( ; ; ) {
// exec 查找并返回当前的匹配结果，并以数组的形式返回
// path  uniform变量的名字   可能含点  可能含数组下标[i]
// 分解getUniformLocation返回的uniform名字name   数组   结构体对象
		var match = RePathPart.exec( path ),
			matchEnd = RePathPart.lastIndex,
// 无论是path是'modelMatrix'   arr[90]    directionalLight.color那种形式
// 返回数组的第二个元素字符串都是变量的名字，不包含下标和点
			id = match[ 1 ],
// 判断是不是数组变量
			idIsIndex = match[ 2 ] === ']',
			//第三个返回
				// modelMatrix   未定义
				// arr[90]    [
				// directionalLight.color   .
			subscript = match[ 3 ];
// 如果是数组变量
		if ( idIsIndex ) id = id | 0; // convert to integer转换为整数

		if ( subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength ) {

			// bare name or "pure" bottom-level array "[0]" suffix
// containerWebGLUniforms构造函数的参数renderer
// 名字翻译  SingleUniform：单独   PureArrayUniform：纯数组
// 未定义对应非结构体、非数组变量 调用SingleUniform函数
// 非未定义  数组变量  调用PureArrayUniform
			addUniform( container, subscript === undefined ?
				new SingleUniform( id, activeInfo, addr ) :
				new PureArrayUniform( id, activeInfo, addr ) );

			break;

		} else {

			// step into inner node / create it in case it doesn't exist

			var map = container.map, next = map[ id ];

			if ( next === undefined ) {
// 结构体uniform
				next = new StructuredUniform( id );
				addUniform( container, next );

			}

			container = next;

		}

	}

}

// Root Container
// 根容器

function WebGLUniforms( gl, program, renderer ) {
// 继承map、seq属性
	UniformContainer.call( this );

	this.renderer = renderer;
// 获得uniform变量的数量   编译着色器得到程序对象   从程序对象提取信息
	var n = gl.getProgramParameter( program, gl.ACTIVE_UNIFORMS );

	for ( var i = 0; i < n; ++ i ) {
// 返回第i+1个uniform变量的相关信息的集合info，info对象包含name、type、size属性
// 传递数据  name作为参数   gl.getUniformLocation(program,'directionalLight.color')
// type在WebGLUniforms.js用来判断数据类型，进而选择合适的webgl API来传递数据
		var info = gl.getActiveUniform( program, i ),
		// 通过变量在着色器中的名字返回uniform变量的引用地址
		// addr是变量地址   GPU和CPU数据进行通信
			addr = gl.getUniformLocation( program, info.name );
// 解析uniform
// this是什么   this包含光照、矩阵等信息吗
// this具有renderer属性   renderer属性的数值值来自参数renderer
// 参数renderer是什么  仅仅是渲染起吗
		parseUniform( info, addr, this );

	}

}

WebGLUniforms.prototype.setValue = function ( gl, name, value ) {

	var u = this.map[ name ];

	if ( u !== undefined ) u.setValue( gl, value, this.renderer );

};

WebGLUniforms.prototype.setOptional = function ( gl, object, name ) {

	var v = object[ name ];

	if ( v !== undefined ) this.setValue( gl, name, v );

};


// Static interface
// 被调用seq是uniformsList，来自seqWithValue方法的返回值
WebGLUniforms.upload = function ( gl, seq, values, renderer ) {

	for ( var i = 0, n = seq.length; i !== n; ++ i ) {

		var u = seq[ i ],
		// id是变量名字   如果是数组或结构体  去掉下标或点后面的
		// uniform名字是一致的，可以批量设置    普通变量 数组变量  对象变量都可以批量处理？
			v = values[ u.id ];

		if ( v.needsUpdate !== false ) {

			// note: always updating when .needsUpdate is undefined
			u.setValue( gl, v.value, renderer );

		}

	}

};
// sep来自着色器的uniform变量信息构成的集合
// values来自材质初始化从着色器模块获得uniforms模块，返回着色器库中的uniform相关属性后，
// 又进行了一些处理   比如从webgl渲染器状态对象获得光照对象对应的uniforms对象，进行赋值
// 材质初始化，提取材质中包含的uniforms，然后获得光源的uniforms，进行合并，然后通过WebGLUniforms模块处理
// 求解并集
WebGLUniforms.seqWithValue = function ( seq, values ) {

	var r = [];

	for ( var i = 0, n = seq.length; i !== n; ++ i ) {
// 从sep遍历出来一个uniform变量对应的对象
		var u = seq[ i ];
		// 通过uniform变量name点或下标前面的部分，来判断values是否存在
		// values中存储的uniform变量对相应的值的属性名字都是下标或点符号之前的，或者说是结构体变量的名字，不包含结构体内部信息
		if ( u.id in values ) r.push( u );

	}

	return r;

};

export { WebGLUniforms };
