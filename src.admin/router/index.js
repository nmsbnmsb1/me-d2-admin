import Vue from 'vue';
import { setModules, getBaseFramePages, getBaseErrorPages, createRouter } from '@/router/create_router';

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const { _import } = require('./util.import.' + process.env.NODE_ENV);
/**
 * 在主框架内显示
 */
const frameInRoutes = [
	...getBaseFramePages(),
	...setModules(require.context('./modules', true, /\.js$/)),
	//
];
Vue.prototype.$frameInRoutes = frameInRoutes;
/**
 * 在主框架之外显示
 */
const frameOut = [
	// 登录(用户登录 & 管理登录)
	{ path: '/login', name: 'login', component: _import('login') },
];
/**
 * 错误页面
 */
const errorPage = [
	...getBaseErrorPages(),
	//
];

//
export default createRouter([
	...frameInRoutes,
	...frameOut,
	...errorPage,
	//
]);
