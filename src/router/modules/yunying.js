import layoutHeaderAside from '@/layout/header-aside';
import Constants from '@/libs/constants';
import { $route } from '@/libs/util.router';

const { yunying } = Constants.Roles;

export const base = {
	path: '/yunying',
	name: 'yunying',
	meta: { menu: true, auth: true, roles: [yunying.id] },
	redirect: '/yunying/index',
	component: layoutHeaderAside,
	children: [
		{ path: 'index', meta: { menu: true, title: '首页', icon: 'home' } },
		//{ path: 'edit_profile', meta: { title: '编辑资料' } },
		//管理
		{
			path: 'ex01',
			meta: { menu: true, title: '示例01', icon: 'cogs' },
			children: [
				{ path: 'list', meta: { menu: true, title: '列表', icon: 'list' } },
				{ path: 'add', meta: { title: '添加' } },
			],
		},
	],
};

//console.log($route(base));

export default $route(base);
