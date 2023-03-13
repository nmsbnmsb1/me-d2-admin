import { request } from '@/api';

export default {
	namespaced: true,
	state: {},
	actions: {
		// 获取列表
		async getList({ state }, data) {
			return request({ url: '/marketing/getKetiList', data });
		},
	},
};
