import layoutHeaderAside from '@/layout/header-aside';
import Constants from '@/constants';
import { $route } from '@/libs/util.router';

const { marketing } = Constants.Roles;

export const base = {
	path: '/marketing',
	name: 'marketing',
	meta: { menu: true, auth: true, title: '市场管理', roles: [marketing.id] },
	redirect: '/marketing/index',
	component: layoutHeaderAside,
	children: [
		{ path: 'index', meta: { menu: true, title: '首页', icon: 'home' } },
		{ path: 'edit_profile', meta: { title: '编辑资料' } },
		//探究管理
		{
			path: 'guanli',
			meta: { menu: true, title: '管理', icon: 'cogs' },
			children: [
				{ path: 'list', meta: { menu: true, title: '列表', icon: 'list' } },
				{ path: 'add', meta: { title: '添加' } },
			],
		},
	],
};

export default $route(base);
