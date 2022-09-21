import { find } from 'lodash';
import faker from 'faker/locale/zh_CN';
import util from '@/libs/util.js';
import { requestForMock, mock } from '../service.js';
import * as tools from '../tools.js';

const users = [
	{ username: 'admin', password: 'admin', uuid: 'admin-uuid', name: 'Admin' },
	{ username: 'editor', password: 'editor', uuid: 'editor-uuid', name: 'Editor' },
	{ username: 'user1', password: 'user1', uuid: 'user1-uuid', name: 'User1' },
];

export function USER_LOGIN_BY_TOKEN() {
	// 模拟数据
	mock.onAny('/loginByToken').reply(() => {
		const token = util.cookies.get('token');
		let user;
		for (const u of users) {
			if (token.startsWith(u.username)) {
				user = u;
				break;
			}
		}
		if (user) {
			util.cookies.set('token', `${user.username}-${faker.datatype.uuid()}`);
			return tools.responseSuccess({ ...user });
		}
		return tools.responseError({}, '账号或密码不正确');
	});
	// 接口请求
	return requestForMock({
		url: '/loginByToken',
		method: 'post',
	});
}

/**
 * @description 登录
 * @param {Object} data 登录携带的信息
 */
export function USER_LOGIN(data = {}) {
	// 模拟数据
	mock.onAny('/login').reply((config) => {
		const user = find(users, tools.parse(config.data));
		if (user) {
			util.cookies.set('token', `${user.username}-${faker.datatype.uuid()}`);
			return tools.responseSuccess({ ...user });
		}
		tools.responseError({}, '账号或密码不正确');
	});
	// 接口请求
	return requestForMock({
		url: '/login',
		method: 'post',
		data,
	});
}

/**
 * @description 登录
 * @param {Object} data 登录携带的信息
 */
export function USER_LOGOUT() {
	// 模拟数据
	mock.onAny('/logout').reply(() => {
		util.cookies.set('token', '');
		return tools.responseSuccess({});
	});
	// 接口请求
	return requestForMock({
		url: '/logout',
		method: 'post',
	});
}
