import layoutHeaderAside from '@/layout/header-aside';
import Constants from '@/constants';
import { $route } from '@/libs/util.router';
const { _import } = require('../util.import.' + process.env.NODE_ENV);

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const { admin } = Constants.Roles;

export const base = {
	path: '/admin',
	name: 'admin',
	meta: { menu: true, auth: true, roles: [admin.id] },
	redirect: '/admin/index',
	component: layoutHeaderAside,
	children: [
		{ path: 'index', meta: { menu: true, title: '首页', icon: 'home' } },
		//
	],
};

export default $route(base, _import);
