import layoutHeaderAside from '@/layout/header-aside';
import { $route } from '@/libs/util.router';

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const { _import_system } = require('@/libs/util.import.' + process.env.NODE_ENV);

export const base = {
	path: '/demo/plugins',
	name: 'demo-plugins',
	meta: { menu: true, auth: true, title: '插件' },
	redirect: { name: 'demo-plugins-index' },
	component: layoutHeaderAside,
	children: [
		{ path: 'clipboard-polyfill', meta: { menu: true, title: '剪贴板访问' } },
		{ path: 'day', meta: { menu: true, title: '日期计算' } },
		{ path: 'export/table', meta: { menu: true, title: '导出表格' } },
		{ path: 'export/txt', meta: { menu: true, title: '导出文本' } },
		{ path: 'import/csv', meta: { menu: true, title: '导入 csv' } },
		{ path: 'import/xlsx', meta: { menu: true, title: '导入 xlsx' } },
		{ path: 'js-cookie', meta: { menu: true, title: 'Cookie' } },
	],
};

export default $route(base, _import_system);
