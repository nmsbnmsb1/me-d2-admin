import Vue from 'vue';
import { MessageBox } from 'element-ui';
import { request } from '@/api';
import { Constants } from '@/constants';
import util from '@/libs/util.js';

export default {
	namespaced: true,
	state: {
		hasToken: false,
		user: {},
		role: {},
	},
	actions: {
		async loginByToken({ state, dispatch }) {
			if (state.hasToken) return Promise.resolve();
			//
			let user;
			if (!Constants.MOCK) {
				user = await request({ url: '/admin/loginByToken' });
			} else {
				user = { uuid: '0002', username: 'admin', role_id: Constants.Roles.admin.id };
			}
			//
			await dispatch('onLogin', user);
		},
		async loginByUsername({ dispatch }, data) {
			let user;
			if (!Constants.MOCK) {
				user = await request({ url: '/admin/loginByUsername' });
			} else {
				user = { uuid: '0002', username: 'admin', role_id: Constants.Roles.admin.id };
				util.cookies.set('token', 'aaaa');
			}
			await dispatch('onLogin', user);
		},
		//统一处理登陆
		async onLogin({ state, dispatch }, user) {
			state.hasToken = true;
			state.user = user;
			state.role = { ...Constants.Roles.admin };
			//
			await dispatch('d2admin/user/onLogin', { uuid: state.user.uuid, role_id: state.role.id }, { root: true });
		},
		async logout({ state, commit, dispatch }, { confirm = false } = {}) {
			//注销
			let logout = async function () {
				//
				if (!Constants.MOCK) {
					try {
						await request({ url: '/admin/logout' });
					} catch (e) {}
				}
				//
				state.hasToken = false;
				state.user = {};
				state.role = {};
				//关闭所有窗口
				//await dispatch('d2admin/page/closeAll', true, { root: true });
				await dispatch('d2admin/user/onLogout', undefined, { root: true });
				// 跳转路由
				Vue.prototype.$routerInstance.push({ name: 'login' });
			};
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
		//
		//获取上传的key
		async upload({ state }) {
			//
		},
	},
};
