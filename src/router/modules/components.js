import layoutHeaderAside from '@/layout/header-aside';
import { $route } from '@/libs/util.router';

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const { _import_system } = require('@/libs/util.import.' + process.env.NODE_ENV);

export const base = {
	path: '/demo/components',
	name: 'demo-components',
	meta: { menu: true, auth: true, title: '组件' },
	redirect: { name: 'demo-components-index' },
	component: layoutHeaderAside,
	children: [
		{
			path: 'container',
			meta: { menu: true, title: '布局组件', icon: 'folder' },
			children: [
				{ path: 'full', meta: { menu: true, title: '布局组件 填充' } },
				{ path: 'full-slot', meta: { menu: true, title: '布局组件 填充 插槽' } },
				{ path: 'full-bs', meta: { menu: true, title: '布局组件 填充 滚动优化' } },
				{ path: 'ghost', meta: { menu: true, title: '布局组件 隐形' } },
				{ path: 'ghost-slot', meta: { menu: true, title: '布局组件 隐形 插槽' } },
				{ path: 'ghost-bs', meta: { menu: true, title: '布局组件 隐形 滚动优化' } },
				{ path: 'card', meta: { menu: true, title: '布局组件 卡片' } },
				{ path: 'card-slot', meta: { menu: true, title: '布局组件 卡片 插槽' } },
				{ path: 'card-bs', meta: { menu: true, title: '布局组件 卡片 滚动优化' } },
				{ path: 'api', meta: { menu: true, title: '布局组件 API' } },
			],
		},
		//
		{ path: 'countup', meta: { menu: true, title: '数字动画' } },
		//
		{ path: 'editor-quill', meta: { menu: true, title: '富文本编辑器' } },
		{ path: 'editor-ueditor', meta: { menu: true, title: 'UEditor' } },
		//
		{ path: 'highlight', meta: { menu: true, title: '代码高亮组件' } },
		//
		{
			path: 'icon',
			meta: { menu: true, title: '图标', icon: 'folder' },
			children: [
				{ path: 'icon', meta: { menu: true, title: '图标组件' } },
				{ path: 'icon-svg', meta: { menu: true, title: 'svg 图标' } },
				{ path: 'select', meta: { menu: true, title: '图标选择器' } },
				{ path: 'select-svg', meta: { menu: true, title: 'svg 图标选择器' } },
				{ path: 'list', meta: { menu: true, title: '图标列表' } },
			],
		},
		//
		{ path: 'json-tree', meta: { menu: true, title: 'JSON 展示' } },
		//
		{
			path: 'layout',
			meta: { menu: true, title: '布局', icon: 'folder' },
			children: [
				{ path: 'grid', meta: { menu: true, title: '拖拽网格布局' } },
				{ path: 'splitpane', meta: { menu: true, title: '区域布局' } },
			],
		},
		{
			path: 'markdown',
			meta: { menu: true, title: 'markdown', icon: 'folder' },
			children: [
				{ path: 'source', meta: { menu: true, title: 'markdown指定资源渲染' } },
				{ path: 'url', meta: { menu: true, title: 'markdown指定url渲染' } },
			],
		},
	],
};

export default $route(base, _import_system);
