import { request } from '@/api';

export default {
	namespaced: true,
	state: {},
	actions: {
		//导师
		async getList(state, data) {
			return request({ url: '/admin/getList', data });
		},
	},
};
