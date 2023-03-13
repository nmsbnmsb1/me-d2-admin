export default {
	// 快捷键
	// 支持快捷键 例如 ctrl+shift+s
	hotkey: {
		search: {
			open: 's',
			close: 'esc',
		},
	},
	// 侧边栏默认配置
	menu: {
		asideCollapse: false,
		asideTransition: true,
	},
	// 在读取持久化数据失败时默认页面
	page: {
		opened: [
			// {
			// 	name: 'index',
			// 	fullPath: '/index',
			// 	meta: { title: '首页', auth: false },
			// },
		],
	},
	// 菜单搜索
	search: { enable: true },
	log: { enable: true },
	fullscreen: { enable: true },
	// 注册的主题
	theme: {
		enable: true,
		list: [
			{
				title: 'd2admin 经典',
				name: 'd2',
				preview: 'image/theme/d2/preview@2x.png',
			},
		],
	},
	size: { enable: true },
	locales: { enable: true },
	color: { enable: true },
	// 是否默认开启页面切换动画
	transition: {
		active: true,
	},
};
