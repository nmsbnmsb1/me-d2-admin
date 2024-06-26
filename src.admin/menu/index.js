import Vue from 'vue';
import { getBaseMenus, setModules, /*createHeaderMenu,*/ createSideMenu } from '@/menu/create_menu';

// 菜单 顶栏
// export const menuHeader = supplementPath([
// 	{ path: '/index', title: '首页', icon: 'home', key: '' },
// 	//demo
// 	...(() => {
// 		const modules = [];
// 		const files = require.context('./modules', true, /\.js$/);
// 		files.keys().forEach((key) => {
// 			if (key.startsWith('./demo-')) modules.push(files(key).default);
// 		});
// 		return modules;
// 	})(),
// ]);

//
Vue.prototype.$menuAside = createSideMenu([
	...getBaseMenus(),
	...setModules(require.context('./modules', true, /\.js$/)),
	//
]);
