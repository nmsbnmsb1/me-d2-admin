import Vue from 'vue';
import { uniqueId } from 'lodash';

export function calMenu(element) {
	let menu = [];
	let role_id = Vue.prototype.$storeInstance.state.user.currentRole.id;
	// console.log(role);
	element.forEach((el) => {
		if (el.roles && !el.roles.includes(role_id)) return;
		//
		let newel = { ...el };
		if (el.roles) newel.roles = el.roles.slice();
		if (el.children) newel.children = calMenu(el.children);
		menu.push(newel);
	});
	//
	return menu;
}

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
export function supplementPath(menu) {
	return menu.map((e) => ({
		...e,
		path: e.path || uniqueId('d2-menu-empty-'),
		...(e.children ? { children: supplementPath(e.children) } : {}),
	}));
}
