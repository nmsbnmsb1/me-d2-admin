import util from '@/libs/util.js';

export default {
	namespaced: true,
	state: {
		uuid: '',
		role_id: '',
	},
	actions: {
		//统一处理登陆
		async onLogin({ state, dispatch }, { uuid, role_id }) {
			//
			util.cookies.set('uuid', uuid);
			//
			if (role_id) util.cookies.set('role_id', role_id);
			else util.cookies.remove('role_id');
			//
			await dispatch('d2admin/app/load', undefined, { root: true });
		},
		async onLogout({ state }) {
			util.cookies.remove('uuid');
			util.cookies.remove('role_id');
			util.cookies.remove('token');
			//
			state.uuid = '';
			state.role_id = '';
		},
	},
};
