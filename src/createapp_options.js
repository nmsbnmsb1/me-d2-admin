import Vue from 'vue';
import { calMenu } from '@/libs/util.menu';

export default function (App) {
	return {
		render: (h) => h(App),
		created() {
			// 处理路由 得到每一级的路由设置
			this.$store.commit('d2admin/page/init', Vue.prototype.$frameInRoutes);
			// // 设置顶栏菜单
			// this.$store.commit('d2admin/menu/headerSet', menuHeader);
			// // 初始化菜单搜索功能
			// this.$store.commit('d2admin/search/init', menuHeader);
			// 处理预加载数据
		},
		mounted() {
			// 展示系统信息
			this.$store.commit('d2admin/releases/versionShow');
			// 获取并记录用户 UA
			this.$store.commit('d2admin/ua/get');
			// 初始化全屏监听
			this.$store.dispatch('d2admin/fullscreen/listen');
			// 用户登录后从数据库加载一系列的设置
			this.$store.dispatch('d2admin/app/load');
		},
		watch: {
			// 检测路由变化切换侧边栏内容
			'$route.matched': {
				handler(matched) {
					if (!matched || matched.length <= 0) return;
					//
					let _side = Vue.prototype.$menuAside.filter((menu) => (matched[0].path === '' ? menu.path === '/' : menu.path === matched[0].path));
					let children = [];
					if (_side.length > 0) children = calMenu(_side[0].children);
					this.$store.commit('d2admin/menu/asideSet', children);
					//
					// let key = Constants.Roles[this.$store.state.user.currentRole.id]?.key || '';
					// if (key !== menuHeader[0].key) {
					// 	menuHeader[0].key = key;
					// 	menuHeader[0].path = `/${key}/index`;
					// 	// 设置顶栏菜单
					// 	this.$store.commit('d2admin/menu/headerSet', menuHeader);
					// 	// 初始化菜单搜索功能
					// 	this.$store.commit('d2admin/search/init', menuHeader);
					// }
				},
				immediate: true,
			},
		},
	};
}
