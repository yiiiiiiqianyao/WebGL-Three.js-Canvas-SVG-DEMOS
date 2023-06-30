/**
 * @author mrdoob / http://mrdoob.com/
 */
// Object3D的排序属性renderOrder
// painter画家  Sort排序  Stable稳定
function painterSortStable( a, b ) {

	if ( a.renderOrder !== b.renderOrder ) {

		return a.renderOrder - b.renderOrder;

	} else if ( a.program && b.program && a.program !== b.program ) {

		return a.program.id - b.program.id;

	} else if ( a.material.id !== b.material.id ) {

		return a.material.id - b.material.id;

	} else if ( a.z !== b.z ) {

		return a.z - b.z;

	} else {

		return a.id - b.id;

	}

}
// reverse反向
function reversePainterSortStable( a, b ) {

	if ( a.renderOrder !== b.renderOrder ) {

		return a.renderOrder - b.renderOrder;

	} if ( a.z !== b.z ) {

		return b.z - a.z;

	} else {

		return a.id - b.id;

	}

}

function WebGLRenderList() {

	var renderItems = [];
	var renderItemsIndex = 0;

	var opaque = [];
	var transparent = [];

	function init() {

		renderItemsIndex = 0;

		opaque.length = 0;
		transparent.length = 0;

	}

	function push( object, geometry, material, z, group ) {

		var renderItem = renderItems[ renderItemsIndex ];

		if ( renderItem === undefined ) {

			renderItem = {
				id: object.id,
				object: object,
				geometry: geometry,
				material: material,
				program: material.program,
				renderOrder: object.renderOrder,
				z: z,
				group: group
			};

			renderItems[ renderItemsIndex ] = renderItem;

		} else {

			renderItem.id = object.id;
			renderItem.object = object;
			renderItem.geometry = geometry;
			renderItem.material = material;
			renderItem.program = material.program;
			renderItem.renderOrder = object.renderOrder;
			renderItem.z = z;
			renderItem.group = group;

		}
// 判断材质是否开启透明，如果开启，则把renderItem对象归类到透明数组transparent中
// 如果transparent是flase，则把renderItem对象插入到不透明数组opaque中
		( material.transparent === true ? transparent : opaque ).push( renderItem );

		renderItemsIndex ++;

	}

	function sort() {

		if ( opaque.length > 1 ) opaque.sort( painterSortStable );
		if ( transparent.length > 1 ) transparent.sort( reversePainterSortStable );

	}

	return {
		opaque: opaque,
		transparent: transparent,

		init: init,
		push: push,

		sort: sort
	};

}

function WebGLRenderLists() {

	var lists = {};

	function get( scene, camera ) {

		var hash = scene.id + ',' + camera.id;
		var list = lists[ hash ];

		if ( list === undefined ) {

			// console.log( 'THREE.WebGLRenderLists:', hash );

			list = new WebGLRenderList();
			lists[ hash ] = list;

		}

		return list;

	}

	function dispose() {

		lists = {};

	}

	return {
		get: get,
		dispose: dispose
	};

}


export { WebGLRenderLists };
