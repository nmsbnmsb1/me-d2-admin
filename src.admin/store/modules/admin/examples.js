import { request } from '@/api';
import Constants from '@/libs/constants';

export default {
	namespaced: true,
	state: {},
	actions: {
		//导师
		async getList({ state }, params) {
			let data;
			//
			//mock
			if (!Constants.MOCK) {
				data = await request({ url: '/admin/getList', params });
			} else {
				data = { count: 1, pageSize: 12, data: [{ id: 1, title: '这是一个示例' }] };
			}
			//
			return data;
		},
	},
};
