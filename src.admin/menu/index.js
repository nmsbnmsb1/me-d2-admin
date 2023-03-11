import Vue from 'vue';
import { supplementPath } from '@/libs/util.menu';

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
//
Vue.prototype.$menuAside = supplementPath([
	{ path: '/', title: '首页', icon: 'home', children: [{ path: '/log', title: '前端日志', icon: 'bug' }] },
	//
	...(() => {
		const modules = [];
		const files = require.context('./modules', true, /\.js$/);
		files.keys().forEach((key) => modules.push(files(key).default));
		return modules;
	})(),
]);
