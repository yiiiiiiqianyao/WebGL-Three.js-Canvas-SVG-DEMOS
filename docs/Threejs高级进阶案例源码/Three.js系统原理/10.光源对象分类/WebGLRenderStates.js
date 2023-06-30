/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { WebGLLights } from './WebGLLights.js';

function WebGLRenderState() {

	var lights = new WebGLLights();

	var lightsArray = [];
	var shadowsArray = [];
	var spritesArray = [];

	function init() {

		lightsArray.length = 0;
		shadowsArray.length = 0;
		spritesArray.length = 0;

	}
// 插入光源数组函数
	function pushLight( light ) {

		lightsArray.push( light );

	}
// 阴影
	function pushShadow( shadowLight ) {

		shadowsArray.push( shadowLight );

	}
// 精灵
	function pushSprite( shadowLight ) {

		spritesArray.push( shadowLight );

	}

	function setupLights( camera ) {
// WebGLLights封装的set方法
// 渲染器调用WebGL渲染对象的方法生成了lightsArray,在这里调用WebGLLights对象的setup方法，作为他的参数使用
		lights.setup( lightsArray, shadowsArray, camera );

	}

	var state = {
		lightsArray: lightsArray,
		shadowsArray: shadowsArray,
		spritesArray: spritesArray,
// lights是WebGLLights返回的对象，具有setup方法和state属性
		lights: lights
	};

	return {
		init: init,
		state: state,
		setupLights: setupLights,

		pushLight: pushLight,
		pushShadow: pushShadow,
		pushSprite: pushSprite
	};

}

function WebGLRenderStates() {

	var renderStates = {};

	function get( scene, camera ) {
// 哈希码   一种算法，让同一个类的对象按照自己不同的特征尽量的有不同的哈希码
// 获得一个相机对象和一个场景对象的id    一个应用中可能有多个场景或多个相机对象
		var hash = scene.id + ',' + camera.id;
// renderStates对象设置一个属性，属性名字是hash
		var renderState = renderStates[ hash ];

		if ( renderState === undefined ) {
// 执行该构造函数，返回一个对象
// {
// 	init: init,state: state,setupLights: setupLights,pushLight: pushLight,
// 	pushShadow: pushShadow,pushSprite: pushSprite
// }
			renderState = new WebGLRenderState();
			// 给renderStates的hash属性赋值
			renderStates[ hash ] = renderState;

		}

		return renderState;

	}

	function dispose() {

		renderStates = {};

	}

	return {
		get: get,
		dispose: dispose
	};

}


export { WebGLRenderStates };
