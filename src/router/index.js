// 路由数据
import Vue from 'vue';
import createRouter from './create_router';
import { getBaseFrameIn, getBaseErrorPage } from './base_routes';

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const { _import } = require('@/libs/util.import.' + process.env.NODE_ENV);
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
const frameOut = [
	// 登录(用户登录 & 管理登录)
	{ path: '/login', name: 'login', component: _import('login') },
];
const errorPage = [...getBaseErrorPage()];
const routes = [...frameInRoutes, ...frameOut, ...errorPage];

const router = createRouter(routes);
Vue.prototype.$frameInRoutes = frameInRoutes;
Vue.prototype.$routerInstance = router;
export default router;
