import layoutHeaderAside from '@/layout/header-aside';
import { $route } from '@/libs/util.router';

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const { _import_system } = require('@/libs/util.import.' + process.env.NODE_ENV);

export const base = {
	path: '/demo/playground',
	name: 'demo-playground',
	meta: { menu: true, auth: true, title: '功能' },
	redirect: { name: 'demo-playground-index' },
	component: layoutHeaderAside,
	children: [
		{
			path: 'store',
			meta: { menu: true, title: '存储', icon: 'folder' },
			children: [
				{ path: 'page', meta: { menu: true, cache: true, title: '多标签页控制' } },
				{ path: 'menu', meta: { menu: true, title: '菜单控制' } },
				{ path: 'size', meta: { menu: true, title: '全局尺寸' } },
				{ path: 'ua', meta: { menu: true, title: '浏览器信息' } },
				{ path: 'gray', meta: { menu: true, title: '灰度模式' } },
				{ path: 'fullscreen', meta: { menu: true, title: '全屏' } },
				{ path: 'theme', meta: { menu: true, title: '主题' } },
				{ path: 'transition', meta: { menu: true, title: '页面过渡开关' } },
			],
		},
		//
		{
			path: 'page-cache',
			meta: { menu: true, title: '页面缓存', icon: 'folder' },
			children: [
				{ path: 'on', meta: { menu: true, cache: true, title: '开启缓存' } },
				{ path: 'off', meta: { menu: true, title: '关闭缓存' } },
				//{ path: 'params/:id', meta: { menu: true, cache: true, title: '带参路由缓存' }, props: true },
			],
		},
		{
			path: 'page-argu',
			meta: { menu: true, title: '传参', icon: 'folder' },
			children: [
				{ path: 'send', meta: { menu: true, title: '参数传递 发送' } },
				//{ path: 'get/:username', meta: { menu: true, title: '参数传递 接收' } },
			],
		},
		//
		{
			path: 'db',
			meta: { menu: true, title: 'db', icon: 'folder' },
			children: [
				{ path: 'all', meta: { menu: true, title: '总览' } },
				{ path: 'public', meta: { menu: true, title: '公共存储' } },
				{ path: 'user', meta: { menu: true, title: '私有存储' } },
				{ path: 'page-public', meta: { menu: true, title: '路由存储' } },
				{ path: 'page-user', meta: { menu: true, title: '私有路由存储' } },
				{ path: 'page-snapshot-public', meta: { menu: true, title: '路由快照' } },
				{ path: 'page-snapshot-user', meta: { menu: true, title: '私有路由快照' } },
			],
		},
		//
		{
			path: 'log',
			meta: { menu: true, title: 'log', icon: 'folder' },
			children: [
				{ path: 'ajax', meta: { menu: true, title: 'Ajax 错误' } },
				{ path: 'console', meta: { menu: true, title: '控制台日志' } },
				{ path: 'error', meta: { menu: true, title: '错误捕捉' } },
				{ path: 'log', meta: { menu: true, title: '日志记录' } },
			],
		},
		//
		{ path: 'add-routes/routes', meta: { menu: true, title: '添加页面' } },
		{ path: 'env', meta: { menu: true, title: '环境信息' } },
		{ path: 'locales', meta: { menu: true, title: '国际化' } },
		//
		{
			path: 'frame',
			meta: { menu: true, title: 'frame', icon: 'folder' },
			children: [
				{ path: 'html', meta: { menu: true, title: '静态 HTML' } },
				{ path: 'report', meta: { menu: true, title: 'Size report' } },
				{ path: 'd2-doc', meta: { menu: true, title: 'D2Admin 中文文档' } },
			],
		},
	],
};

export default $route(base, _import_system);
