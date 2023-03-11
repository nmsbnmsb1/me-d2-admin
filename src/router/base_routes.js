import Vue from 'vue';
import layoutHeaderAside from '@/layout/header-aside';
import Constants from '@/libs/constants';
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const { _import, _import_system } = require('@/libs/util.import.' + process.env.NODE_ENV);
/**
 * 在主框架内显示
 */
export function getBaseFrameIn() {
	return [
		{
			path: '/',
			//redirect: { name: 'login' },
			redirect: () => {
				// 方法接收目标路由作为参数
				// return 重定向的字符串路径/路径对象
				let role_id = Vue.prototype.$storeInstance.state.user.currentRole.id;
				if (!role_id) return { path: '/login' };
				return { path: `/${Constants.Roles[role_id].key}/index` };
			},
			component: layoutHeaderAside,
			children: [
				// 首页
				//{ path: 'index', name: 'index', meta: { title: '首页', auth: true }, component: _import('index') },
				// 系统 前端日志
				...[
					{ path: 'log', name: 'log', meta: { title: '前端日志', auth: true }, component: _import_system('log') },
					// 刷新页面 必须保留
					{ path: 'refresh', name: 'refresh', hidden: true, component: _import_system('function/refresh') },
					// 页面重定向 必须保留
					{ path: 'redirect/:route*', name: 'redirect', hidden: true, component: _import_system('function/redirect') },
				],
				// 编辑资料
				{ path: 'profile/edit', name: 'profile', meta: { title: '修改资料', auth: true }, component: _import('profile/edit') },
			],
		},
	];
}

/**
 * 错误页面
 */
export function getBaseErrorPage() {
	return [{ path: '*', name: '404', component: _import_system('error/404') }];
}
