import Vue from 'vue';
import VueRouter from 'vue-router';
import { Message } from 'element-ui';

// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import util from '@/libs/util.js';

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

export default function (routes) {
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
				if (to.matched.some((r) => r.roles && r.roles.indexOf(store.state.user.currentRole.id) < 0)) {
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

	return router;
}
