import Vue from 'vue';
import { supplementPath } from '@/libs/util.menu';

export function getBaseMenus() {
	return [
		{
			path: '/',
			title: '首页',
			icon: 'home',
			children: [
				{ path: '/log', title: '前端日志', icon: 'bug' },
				//
			],
		},
	];
}

export function setModules(files, modules = []) {
	files.keys().forEach((key) => modules.push(files(key).default));
	return modules;
}

export function createHeaderMenu(menus) {
	menus = supplementPath(menus);
	Vue.prototype.$menuHeader = menus;
	return menus;
}

export function createSideMenu(menus) {
	menus = supplementPath(menus);
	Vue.prototype.$menuAside = menus;
	return menus;
}
