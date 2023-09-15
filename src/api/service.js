import Vue from 'vue';
import axios from 'axios';
//import Adapter from 'axios-mock-adapter';
import { get } from 'lodash';
import qs from 'qs';
import util from '@/libs/util';
import { errorLog, errorCreate } from './tools';

// 需要跳转登录页面的code
const loginCode = ['sys.invalid_token', 'sys.invalid_user', 'sys.user_forbidden'];

/**
 * @description 创建请求实例
 */
function createService() {
	// 创建一个 axios 实例
	const service = axios.create({
		method: 'post',
		baseURL: process.env.VUE_APP_API,
		timeout: 15000, // 请求超时时间
		headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
		transformRequest: [(data) => qs.stringify(data)],
	});
	// 请求拦截
	service.interceptors.request.use(
		(config) => {
			// 在请求发送之前做一些处理
			const token = util.cookies.get('token');
			// 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
			if (token) config.headers.Token = token;
			//
			//console.log(config);
			return config;
		},
		(error) => {
			// 发送失败
			errorLog(error);
			return Promise.reject(error);
		}
	);
	// 响应拦截
	service.interceptors.response.use(
		(response) => {
			const headers = response.headers;
			if (headers && headers.token) util.cookies.set('token', headers.token);
			//
			// dataAxios 是 axios 返回数据中的 data
			const dataAxios = response.data;
			// 这个状态码是和后端约定的
			const { code } = dataAxios;
			// 根据 code 进行判断
			if (code === 10000) {
				// 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
				return dataAxios.data;
			}
			//
			// 有 code 代表这是一个后端接口 可以进行进一步的判断
			// switch (code) {
			// 	case 0:
			// 		// [ 示例 ] code === 0 代表没有错误
			// 		return dataAxios.data;
			// 	case 'xxx':
			// 		// [ 示例 ] 其它和后台约定的 code
			// 		errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`);
			// 		break;
			// 	default:
			// 		// 不是正确的 code
			// 		errorCreate(`${dataAxios.msg}: ${response.config.url}`);
			// 		break;
			// }
			if (dataAxios.code) {
				errorCreate(`${dataAxios.data.desc || dataAxios.data}`);
			} else {
				errorCreate(`${dataAxios.msg}: ${(dataAxios.data && dataAxios.data.desc) || dataAxios.data}`);
			}
			if (loginCode.includes(dataAxios.code) || loginCode.includes(dataAxios.msg)) {
				if (location.href.search('login') !== -1) {
					setTimeout(() => location.reload(), 500);
				} else {
					setTimeout(() => Vue.prototype.$routerInstance.push({ name: 'login' }), 500);
				}
			}
			//
			return Promise.reject(dataAxios);
		},
		(error) => {
			const status = get(error, 'response.status');
			switch (status) {
				case 400:
					error.message = '请求错误';
					break;
				case 401:
					error.message = '未授权，请登录';
					break;
				case 403:
					error.message = '拒绝访问';
					break;
				case 404:
					error.message = `请求地址出错: ${error.response.config.url}`;
					break;
				case 408:
					error.message = '请求超时';
					break;
				case 500:
					error.message = '服务器内部错误';
					break;
				case 501:
					error.message = '服务未实现';
					break;
				case 502:
					error.message = '网关错误';
					break;
				case 503:
					error.message = '服务不可用';
					break;
				case 504:
					error.message = '网关超时';
					break;
				case 505:
					error.message = 'HTTP版本不受支持';
					break;
				default:
					break;
			}
			errorLog(error);
			return Promise.reject(error);
		}
	);
	return service;
}

/**
 * @description 创建请求方法
 * @param {Object} service axios 实例
 */
function createRequest(service) {
	return function (config) {
		const token = util.cookies.get('token');
		const configDefault = {
			method: 'post',
			headers: {
				'Content-Type': get(config, 'headers.Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8'),
				Token: token,
			},
			timeout: 15000,
			baseURL: process.env.VUE_APP_API,
			data: {},
		};
		return service(Object.assign(configDefault, config));
	};
}

// 用于真实网络请求的实例和请求方法
export const service = createService();
export const request = createRequest(service);
export const download = function (config) {
	return axios({
		method: 'get',
		timeout: 15000,
		baseURL: process.env.VUE_APP_API,
		...config,
	}).then((data) => data.data);
};

// 用于模拟网络请求的实例和请求方法
// export const serviceForMock = createService();
// export const requestForMock = createRequest(serviceForMock);

// 网络请求数据模拟工具
// export const mock = new Adapter(serviceForMock);
