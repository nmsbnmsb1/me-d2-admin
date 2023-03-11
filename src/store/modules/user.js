import Vue from 'vue';
import { MessageBox } from 'element-ui';
import { request } from '@/api';
import util from '@/libs/util.js';
import Constants from '@/libs/constants';

export default {
	namespaced: true,
	state: {
		hasToken: false,
		// 用户信息
		user: {},
		currentRole: {},
	},
	actions: {
		async loginByUsername({ dispatch }, data) {
			let user;
			//mock
			if (!Constants.MOCK) {
				user = await request({ url: '/user/loginByUsername', data });
			} else {
				user = { uuid: '0001', username: 'YunYing', role_id: Constants.Roles.yunying.id };
				util.cookies.set('token', 'aaaa');
			}
			await dispatch('onLogin', user);
		},
		async loginByToken({ state, dispatch }) {
			if (state.hasToken) return Promise.resolve();
			//
			let user;
			//mock
			if (!Constants.MOCK) {
				user = await request({ url: '/user/loginByToken' });
			} else {
				user = { uuid: '0001', username: 'YunYing', role_id: Constants.Roles.yunying.id };
				util.cookies.set('token', 'aaaa');
			}
			await dispatch('onLogin', user);
		},
		async loginByQrcode({ dispatch }, data) {
			let user = await request({ url: '/user/loginByQrcode', data });
			await dispatch('onLogin', user);
		},
		async loginByPhone({ dispatch }, data) {
			let user = await request({ url: '/user/loginByPhone', data });
			await dispatch('onLogin', user);
		},
		async onLogin({ state, dispatch }, user) {
			state.hasToken = true;
			util.cookies.set('uuid', user.uuid);
			state.user = user;
			//
			if (user.role_id) {
				for (let key in Constants.Roles) {
					let role = Constants.Roles[key];
					if (role.id === user.role_id) {
						state.currentRole = { ...role };
						util.cookies.set('role_id', role.id);
						break;
					}
				}
			} else {
				util.cookies.remove('role_id');
			}
			//
			await dispatch('d2admin/app/load', undefined, { root: true });
		},
		async logout({ state, commit, dispatch }, { confirm = false } = {}) {
			//注销
			let logout = async function () {
				try {
					await request({ url: '/user/logout' });
				} catch (e) {}
				//
				state.hasToken = false;
				state.currentRole = {};
				state.user = {};
				//关闭所有窗口
				//await dispatch('d2admin/page/closeAll', true, { root: true });
				util.cookies.remove('uuid');
				util.cookies.remove('role_id');
				util.cookies.remove('token');
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
		async upload({ state, commit, dispatch }, { bucket, filename, body, onProgress }) {
			//examples
			//import COS from 'cos-js-sdk-v5';
			// this.getUploadKey().then((uploadKey) => {
			// 	new COS({ SecretId: uploadKey.secretID, SecretKey: uploadKey.secretKey, SecurityToken: uploadKey.token }).putObject(
			// 		{
			// 			Bucket: this.bucket.bucket,
			// 			Region: this.bucket.region,
			// 			Key: `${this.dirname ? `${this.dirname}/` : ''}${file.url}`,
			// 			Body: param.file,
			// 			ProgressInterval: 10,
			// 			onProgress: (progressData) => Vue.set(file, 'percentage', parseInt(progressData.percent * 100)),
			// 		},
			// 		(err, data) => {
			// 			if (!err) {
			// 				Vue.set(file, 'status', 'success');
			// 				p.resolve(true);
			// 			} else {
			// 				Vue.set(file, 'status', 'error');
			// 				p.reject('error');
			// 			}
			// 		}
			// 	);
			// });
		},
	},
};
