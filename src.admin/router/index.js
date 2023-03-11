import Vue from 'vue';
import createRouter from '@/router/create_router';
import { getBaseFrameIn, getBaseErrorPage } from '@/router/base_routes';

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const { _admin_import } = require('@/libs/util.import.' + process.env.NODE_ENV);
/**
 * 在主框架内显示
 */
const frameInRoutes = [
	...getBaseFrameIn(),
	...(() => {
		const modules = [];
		const files = require.context('./modules', true, /\.js$/);
		files.keys().forEach((key) => {
			modules.push(files(key).default);
		});
		return modules;
	})(),
];
/**
 * 在主框架之外显示
 */
const frameOut = [
	// 登录(用户登录 & 管理登录)
	{ path: '/login', name: 'login', component: _admin_import('login') },
];

/**
 * 错误页面
 */
const errorPage = [...getBaseErrorPage()];
const routes = [...frameInRoutes, ...frameOut, ...errorPage];

const router = createRouter(routes);
Vue.prototype.$frameInRoutes = frameInRoutes;
Vue.prototype.$routerInstance = router;
export default router;
