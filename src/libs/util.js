import cookies from './util.cookies';
import db from './util.db';
import log from './util.log';

const util = {
	cookies,
	db,
	log,
};

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
	const processTitle = process.env.VUE_APP_TITLE || '$title';
	window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`;
};

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
	const a = document.createElement('a');
	a.setAttribute('href', url);
	a.setAttribute('target', '_blank');
	a.setAttribute('id', 'd2admin-link-temp');
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(document.getElementById('d2admin-link-temp'));
};

util.cancelDefine = function (m) {
	let newObj = {};
	for (const k in m) {
		// eslint-disable-next-line
		if (m[k].id != k) {
			newObj[k] = { ...m[k] };
		}
	}
	return newObj;
};

export default util;
