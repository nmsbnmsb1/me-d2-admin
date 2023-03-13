import Vue from 'vue';
import VueRouter from 'vue-router';
import { Message } from 'element-ui';
// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Constants from '@/constants';
import util from '@/libs/util.js';
import layoutHeaderAside from '@/layout/header-aside';

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const { _import_system } = require('@/libs/util.import.' + process.env.NODE_ENV);

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return VueRouterPush.call(this, location).catch((err) => err);
};
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
	return VueRouterReplace.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

/**
 * 在主框架内显示
 */
export function getBaseFramePages(otherPages = [], pageOptions = {}) {
	let base = {
		path: '/',
		//redirect: { name: 'login' },
		redirect: () => {
			// 方法接收目标路由作为参数
			// return 重定向的字符串路径/路径对象
			let role_id = Vue.prototype.$storeInstance.state.d2admin.user.role_id;
			return { path: !role_id ? '/login' : `/${Constants.Roles[role_id].key}/index` };
		},
		component: layoutHeaderAside,
	};
	//
	base.children = [
		// 刷新页面 必须保留
		{ path: 'refresh', name: 'refresh', hidden: true, component: _import_system('function/refresh') },
		// 页面重定向 必须保留
		{ path: 'redirect/:route*', name: 'redirect', hidden: true, component: _import_system('function/redirect') },
	];
	if (pageOptions.log !== false) {
		// 系统 前端日志
		base.children.push({ path: 'log', name: 'log', meta: { title: '前端日志', auth: true }, component: _import_system('log') });
	}
	//others
	base.children.push(...otherPages);
	//
	return [base];
}
/**
 * 错误页面
 */
export function getBaseErrorPages(otherPages = [], pageOptions = {}) {
	let pages = [];
	//
	if (pageOptions.default !== false) {
		//default
		pages.push({ path: '*', name: '404', component: _import_system('error/404') });
	}
	pages.push(...otherPages);
	//
	return pages;
}

export function setModules(files, modules = []) {
	files.keys().forEach((key) => {
		modules.push(files(key).default);
	});
	return modules;
}

export function createRouter(routes) {
	//console.log('crate', routes);
	// 导出路由 在 main.js 里使用
	const router = new VueRouter({ routes });
	/**
	 * 路由拦截
	 * 权限验证
	 */
	router.beforeEach(async (to, from, next) => {
		let store = Vue.prototype.$storeInstance;
		// 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
		await store.dispatch('d2admin/page/isLoaded');
		// 确认已经加载组件尺寸设置 https://github.com/d2-projects/d2-admin/issues/198
		await store.dispatch('d2admin/size/isLoaded');
		// 进度条
		NProgress.start();
		// 关闭搜索面板
		store.commit('d2admin/search/set', false);
		// 验证当前路由所有的匹配中是否需要有登录验证的
		if (to.matched.some((r) => r.meta.auth)) {
			const token = util.cookies.get('token');
			if (token && token !== 'undefined') {
				//校验token
				try {
					await store.dispatch('user/loginByToken');
				} catch (e) {
					next({ name: 'login' });
					return;
				}
				//
				if (to.matched.some((r) => r.roles && r.roles.indexOf(store.state.d2admin.user.role_id) < 0)) {
					//next({ name: 'index' });
					Message({ message: '当前角色没有权限', type: 'error', duration: 5 * 1000 });
				} else {
					next();
				}
			} else {
				// 没有登录的时候跳转到登录界面
				// 携带上登陆成功之后需要跳转的页面完整路径
				next({ name: 'login', query: { redirect: to.fullPath } });
				// https://github.com/d2-projects/d2-admin/issues/138
				NProgress.done();
			}
		} else {
			// 不需要身份校验 直接通过
			next();
		}
	});

	router.afterEach((to) => {
		// 进度条
		NProgress.done();
		// 多页控制 打开新的页面
		Vue.prototype.$storeInstance.dispatch('d2admin/page/open', to);
		// 更改标题
		util.title(to.meta.title);
	});

	Vue.prototype.$routerInstance = router;
	//
	return router;
}
