import { merge } from 'lodash';
import Cookies from 'js-cookie';

const cookies = {};

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
	const currentCookieSetting = {
		expires: 1,
	};
	merge(currentCookieSetting, cookieSetting);
	Cookies.set(`${process.env.VUE_APP_ID}-${process.env.VUE_APP_VERSION}-${name}`, value, currentCookieSetting);
};

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = function (name = 'default') {
	return Cookies.get(`${process.env.VUE_APP_ID}-${process.env.VUE_APP_VERSION}-${name}`);
};

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = function () {
	return Cookies.get();
};

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = function (name = 'default') {
	return Cookies.remove(`${process.env.VUE_APP_ID}-${process.env.VUE_APP_VERSION}-${name}`);
};

export default cookies;
