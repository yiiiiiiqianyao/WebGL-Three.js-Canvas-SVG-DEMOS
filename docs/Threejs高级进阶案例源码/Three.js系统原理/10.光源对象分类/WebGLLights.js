/**
 * @author mrdoob / http://mrdoob.com/
 */

import { Color } from '../../math/Color.js';
import { Matrix4 } from '../../math/Matrix4.js';
import { Vector2 } from '../../math/Vector2.js';
import { Vector3 } from '../../math/Vector3.js';
// 返回一个对象具有get方法，该方法根据光源type类型，返回一个特定的uniforms对象
function UniformsCache() {
// 声明一个lights对象
	var lights = {};

	return {
// 一个光照对象作为参数输入，根据光源对象的type进行提取信息，生成uniforms对象，然后把数据传入GPU
		get: function ( light ) {
// id标记了第几个对象
			if ( lights[ light.id ] !== undefined ) {

				return lights[ light.id ];

			}

			var uniforms;
// 规则：根据灯光对象的类型设置对应的uniforms生成规则    着色器材质手动合成或借助模块设置     非自定义材质对象要设置一个解析生成方案
			switch ( light.type ) {

				case 'DirectionalLight':
					uniforms = {
						direction: new Vector3(),
						color: new Color(),

						shadow: false,
						shadowBias: 0,
						shadowRadius: 1,
						shadowMapSize: new Vector2()
					};
					break;

				case 'SpotLight':
					uniforms = {
						position: new Vector3(),
						direction: new Vector3(),
						color: new Color(),
						distance: 0,
						coneCos: 0,
						penumbraCos: 0,
						decay: 0,

						shadow: false,
						shadowBias: 0,
						shadowRadius: 1,
						shadowMapSize: new Vector2()
					};
					break;

				case 'PointLight':
					uniforms = {
						position: new Vector3(),
						color: new Color(),
						distance: 0,
						decay: 0,

						shadow: false,
						shadowBias: 0,
						shadowRadius: 1,
						shadowMapSize: new Vector2(),
						shadowCameraNear: 1,
						shadowCameraFar: 1000
					};
					break;

				case 'HemisphereLight':
					uniforms = {
						direction: new Vector3(),
						skyColor: new Color(),
						groundColor: new Color()
					};
					break;

				case 'RectAreaLight':
					uniforms = {
						color: new Color(),
						position: new Vector3(),
						halfWidth: new Vector3(),
						halfHeight: new Vector3()
						// TODO (abelnation): set RectAreaLight shadow uniforms
					};
					break;

			}
// id作为属性名   lights此时此刻也可以理解为Array对象  只是好像没有length属性
			lights[ light.id ] = uniforms;

			return uniforms;

		}

	};

}

var count = 0;

function WebGLLights() {
// 返回对象cache具有get方法
	var cache = new UniformsCache();

	var state = {

		id: count ++,

		hash: '',

		ambient: [ 0, 0, 0 ],
		directional: [],
		directionalShadowMap: [],
		directionalShadowMatrix: [],
		spot: [],
		spotShadowMap: [],
		spotShadowMatrix: [],
		rectArea: [],
		point: [],
		pointShadowMap: [],
		pointShadowMatrix: [],
		hemi: []

	};

	var vector3 = new Vector3();
	var matrix4 = new Matrix4();
	var matrix42 = new Matrix4();
// WebGL渲染器递归遍历场景对象，判断是否属于光源对象
// 如果是光源对象，然后调用WebGL渲染对象的方法pushLights插入该对象属性值的数组中作为元素
//把通过渲染器和渲染状态对象获得光源对象数组作为setup的参数lights
	function setup( lights, shadows, camera ) {

		var r = 0, g = 0, b = 0;
// 灯光数量   初始值设定   会被用来替换着色器中
		var directionalLength = 0;
		var pointLength = 0;
		var spotLength = 0;
		var rectAreaLength = 0;
		var hemiLength = 0;

		var viewMatrix = camera.matrixWorldInverse;
// 遍历threejs光源对象作为元素构成的数组lights
		for ( var i = 0, l = lights.length; i < l; i ++ ) {
// 从这里看应该是数组
			var light = lights[ i ];
// 提取光源对象的颜色、强度、距离等信息
			var color = light.color;
			var intensity = light.intensity;
			var distance = light.distance;

			var shadowMap = ( light.shadow && light.shadow.map ) ? light.shadow.map.texture : null;
// 判断光源的类型：环境光、点光源、平行光....
			if ( light.isAmbientLight ) {
// 环境光颜色计算   color属性三个分量分别和强度属性的值相乘
// 强度属性intensity的值范围是0.0~1.0
				r += color.r * intensity;
				g += color.g * intensity;
				b += color.b * intensity;

			} else if ( light.isDirectionalLight ) {// 平行光光源

// 通过cache对象的get方法，可以通过判断light的类型type，返回一个具有特定属性的uniforms对象
				var uniforms = cache.get( light );
// 提取光源的信息，赋值给uniforms对象的属性
// 复制颜色，颜色向量成强度intensity
				uniforms.color.copy( light.color ).multiplyScalar( light.intensity );
				// 光源的世界矩阵对光源方向进行矩阵变换
				uniforms.direction.setFromMatrixPosition( light.matrixWorld );
				vector3.setFromMatrixPosition( light.target.matrixWorld );
				uniforms.direction.sub( vector3 );
				// 相机的视图矩阵对光源对象进行变换
				uniforms.direction.transformDirection( viewMatrix );

				uniforms.shadow = light.castShadow;

				if ( light.castShadow ) {

					var shadow = light.shadow;

					uniforms.shadowBias = shadow.bias;
					uniforms.shadowRadius = shadow.radius;
					uniforms.shadowMapSize = shadow.mapSize;

				}

				state.directionalShadowMap[ directionalLength ] = shadowMap;
				state.directionalShadowMatrix[ directionalLength ] = light.shadow.matrix;
				// 设置state的属性directional，uniforms对象作为directional的元素
				state.directional[ directionalLength ] = uniforms;

				directionalLength ++;

			} else if ( light.isSpotLight ) {

				var uniforms = cache.get( light );

				uniforms.position.setFromMatrixPosition( light.matrixWorld );
				uniforms.position.applyMatrix4( viewMatrix );

				uniforms.color.copy( color ).multiplyScalar( intensity );
				uniforms.distance = distance;

				uniforms.direction.setFromMatrixPosition( light.matrixWorld );
				vector3.setFromMatrixPosition( light.target.matrixWorld );
				uniforms.direction.sub( vector3 );
				uniforms.direction.transformDirection( viewMatrix );

				uniforms.coneCos = Math.cos( light.angle );
				uniforms.penumbraCos = Math.cos( light.angle * ( 1 - light.penumbra ) );
				uniforms.decay = ( light.distance === 0 ) ? 0.0 : light.decay;

				uniforms.shadow = light.castShadow;

				if ( light.castShadow ) {

					var shadow = light.shadow;

					uniforms.shadowBias = shadow.bias;
					uniforms.shadowRadius = shadow.radius;
					uniforms.shadowMapSize = shadow.mapSize;

				}

				state.spotShadowMap[ spotLength ] = shadowMap;
				state.spotShadowMatrix[ spotLength ] = light.shadow.matrix;
				state.spot[ spotLength ] = uniforms;

				spotLength ++;

			} else if ( light.isRectAreaLight ) {

				var uniforms = cache.get( light );

				// (a) intensity is the total visible light emitted
				//uniforms.color.copy( color ).multiplyScalar( intensity / ( light.width * light.height * Math.PI ) );

				// (b) intensity is the brightness of the light
				uniforms.color.copy( color ).multiplyScalar( intensity );

				uniforms.position.setFromMatrixPosition( light.matrixWorld );
				uniforms.position.applyMatrix4( viewMatrix );

				// extract local rotation of light to derive width/height half vectors
				matrix42.identity();
				matrix4.copy( light.matrixWorld );
				matrix4.premultiply( viewMatrix );
				matrix42.extractRotation( matrix4 );

				uniforms.halfWidth.set( light.width * 0.5, 0.0, 0.0 );
				uniforms.halfHeight.set( 0.0, light.height * 0.5, 0.0 );

				uniforms.halfWidth.applyMatrix4( matrix42 );
				uniforms.halfHeight.applyMatrix4( matrix42 );

				// TODO (abelnation): RectAreaLight distance?
				// uniforms.distance = distance;

				state.rectArea[ rectAreaLength ] = uniforms;

				rectAreaLength ++;

			} else if ( light.isPointLight ) {

				var uniforms = cache.get( light );

				uniforms.position.setFromMatrixPosition( light.matrixWorld );
				uniforms.position.applyMatrix4( viewMatrix );

				uniforms.color.copy( light.color ).multiplyScalar( light.intensity );
				uniforms.distance = light.distance;
				uniforms.decay = ( light.distance === 0 ) ? 0.0 : light.decay;

				uniforms.shadow = light.castShadow;

				if ( light.castShadow ) {

					var shadow = light.shadow;

					uniforms.shadowBias = shadow.bias;
					uniforms.shadowRadius = shadow.radius;
					uniforms.shadowMapSize = shadow.mapSize;
					uniforms.shadowCameraNear = shadow.camera.near;
					uniforms.shadowCameraFar = shadow.camera.far;

				}

				state.pointShadowMap[ pointLength ] = shadowMap;
				state.pointShadowMatrix[ pointLength ] = light.shadow.matrix;
				state.point[ pointLength ] = uniforms;

				pointLength ++;

			} else if ( light.isHemisphereLight ) {

				var uniforms = cache.get( light );

				uniforms.direction.setFromMatrixPosition( light.matrixWorld );
				uniforms.direction.transformDirection( viewMatrix );
				uniforms.direction.normalize();

				uniforms.skyColor.copy( light.color ).multiplyScalar( intensity );
				uniforms.groundColor.copy( light.groundColor ).multiplyScalar( intensity );

				state.hemi[ hemiLength ] = uniforms;

				hemiLength ++;

			}

		}

		state.ambient[ 0 ] = r;
		state.ambient[ 1 ] = g;
		state.ambient[ 2 ] = b;
		// WebGL的代码
		// numDirLights: lights.directional.length,
		// numPointLights: lights.point.length,
		// numSpotLights: lights.spot.length,
		// numRectAreaLights: lights.rectArea.length,
		// numHemiLights: lights.hemi.length,
		state.directional.length = directionalLength;
		state.spot.length = spotLength;
		state.rectArea.length = rectAreaLength;
		state.point.length = pointLength;
		state.hemi.length = hemiLength;

		state.hash = state.id + ',' + directionalLength + ',' + pointLength + ',' + spotLength + ',' + rectAreaLength + ',' + hemiLength + ',' + shadows.length;

	}
// 返回对象具有setup方法   state属性
// light构成的数组lights作为setup()方法参数，setup会批量处理数组中的每一个光源对象
// setup处理光源对象后得到每个光源对应一个uniforms对象，该对象存入state属性中，
// state对象具有多个属性，按照光源的类型type进行分类
	return {
		setup: setup,
		state: state
	};

}


export { WebGLLights };
