import { MessageBox } from 'element-ui';
import util from '@/libs/util.js';
import router from '@/router';
import api from '@/api';

export default {
	namespaced: true,
	state: {
		isTokenValid: false,
		// 用户信息
		user: {},
	},
	actions: {
		/**
		 * @description token是否有效
		 * @param {Object} context
		 */
		async isTokenValid({ state, dispatch }) {
			if (state.isTokenValid) return Promise.resolve();
			//
			const user = await api.USER_LOGIN_BY_TOKEN();
			state.isTokenValid = true;
			state.user = user;
			util.cookies.set('uuid', user.uuid);
			//
			await dispatch('load');
		},
		/**
		 * @description 登录
		 * @param {Object} context
		 * @param {Object} payload username {String} 用户账号
		 * @param {Object} payload password {String} 密码
		 * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
		 */
		async login({ state, dispatch }, { username = '', password = '' } = {}) {
			const user = await api.USER_LOGIN({ username, password });
			state.isTokenValid = true;
			state.user = user;
			util.cookies.set('uuid', user.uuid);
			//
			await dispatch('load');
		},
		/**
		 * @description 注销用户并返回登录页面
		 * @param {Object} context
		 * @param {Object} payload confirm {Boolean} 是否需要确认
		 */
		async logout({ state, commit, dispatch }, { confirm = false } = {}) {
			/**
			 * @description 注销
			 */
			async function logout() {
				try {
					await api.USER_LOGOUT();
				} catch (e) {}
				//
				util.cookies.remove('uuid');
				util.cookies.remove('token');
				state.isTokenValid = false;
				state.user = {};
				//关闭所有窗口
				//await dispatch('d2admin/page/closeAll', null, { root: true });
				// 跳转路由
				router.push({ name: 'login' });
			}
			// 判断是否需要确认
			if (confirm) {
				commit('d2admin/gray/set', true, { root: true });
				MessageBox.confirm('确定要注销当前用户吗', '注销用户', { type: 'warning' })
					.then(() => {
						commit('d2admin/gray/set', false, { root: true });
						logout();
					})
					.catch(() => {
						commit('d2admin/gray/set', false, { root: true });
					});
			} else {
				logout();
			}
		},
		/**
		 * @description 用户登录后从持久化数据加载一系列的设置
		 * @param {Object} context
		 */
		async load({ state, dispatch }) {
			// 加载主题
			await dispatch('d2admin/theme/load', null, { root: true });
			// 加载页面过渡效果设置
			await dispatch('d2admin/transition/load', null, { root: true });
			// 持久化数据加载上次退出时的多页列表
			await dispatch('d2admin/page/openedLoad', null, { root: true });
			// 持久化数据加载侧边栏配置
			await dispatch('d2admin/menu/asideLoad', null, { root: true });
			// 持久化数据加载全局尺寸
			await dispatch('d2admin/size/load', null, { root: true });
			// 持久化数据加载颜色设置
			await dispatch('d2admin/color/load', null, { root: true });
		},
	},
};
