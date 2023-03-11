import layoutHeaderAside from '@/layout/header-aside';
import Constants from '@/libs/constants';
import { $route } from '@/libs/util.router';

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
		{ path: 'edit_profile', meta: { title: '编辑资料' } },
		//管理
		{
			path: 'ex02',
			meta: { menu: true, title: '管理', icon: 'magic' },
			children: [
				{ path: 'list', meta: { menu: true, title: '列表', icon: 'list' } },
				{ path: 'add', meta: { title: '添加' } },
			],
		},
	],
};

export default $route(base);
