// import low from 'lowdb';
// import LocalStorage from 'lowdb/adapters/LocalStorage';
import lodash, { cloneDeep } from 'lodash';
import { LowSync } from 'lowdb';
import { LocalStorage } from 'lowdb/browser';
import util from '@/libs/util';

//创建Lowdb实例
let db = new LowSync(new LocalStorage(`${process.env.VUE_APP_ID}-${process.env.VUE_APP_VERSION}`), {});
db.read();
//db.defaults({ sys: {}, database: {} }).write();
if (db.data === null) {
	db.data = { sys: {}, database: {} };
	db.write();
}
export default db;

/**
 * @description 检查路径是否存在 不存在的话初始化
 * @param {Object} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 路径
 * @param {Object} payload user {Boolean} 区分用户
 * @param {Object} payload validator {Function} 数据校验钩子 返回 true 表示验证通过
 * @param {Object} payload defaultValue {*} 初始化默认值
 * @returns {String} 可以直接使用的路径
 */
export function pathInit({ dbName = 'database', path = '', user = true, validator, defaultValue }) {
	let names = [`${dbName}.`];
	//
	let uuid = util.cookies.get('uuid');
	if (!uuid) {
		names.push('public');
	} else {
		names.push(`user.${uuid}`);
		//
		let role_id = util.cookies.get('role_id');
		if (role_id) names.push(`/${role_id}`);
	}
	if (path) names.push(`.${path}`);
	//
	let currentPath = names.join('');
	let value = lodash.get(db.data, currentPath);
	if (!(value !== undefined && (!validator || validator(value)))) {
		lodash.set(db.data, currentPath, typeof defaultValue === 'function' ? defaultValue() : defaultValue);
		db.write();
	}
	return currentPath;
}

/**
 * @description 将数据存储到指定位置 | 路径不存在会自动初始化
 * @description 效果类似于取值 dbName.path = value
 * @param {Object} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 存储路径
 * @param {Object} payload value {*} 需要存储的值
 * @param {Object} payload user {Boolean} 是否区分用户
 */
export function dbSet({ dbName = 'database', path = '', value = '', user = false }) {
	lodash.set(db.data, pathInit({ dbName, path, user }), value);
	db.write();
}

/**
 * @description 获取数据
 * @description 效果类似于取值 dbName.path || defaultValue
 * @param {Object} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 存储路径
 * @param {Object} payload defaultValue {*} 取值失败的默认值
 * @param {Object} payload user {Boolean} 是否区分用户
 */
export function dbGet({ dbName = 'database', path = '', defaultValue, user = false }) {
	return cloneDeep(lodash.get(db.data, pathInit({ dbName, path, user, defaultValue })));
}

/**
 * @description 获取存储数据库对象
 * @param {Object} payload user {Boolean} 是否区分用户
 */
export function database({ dbName = 'database', path = '', user = false, validator, defaultValue } = {}) {
	return lodash.get(db.data, pathInit({ dbName, path, user, validator, defaultValue }));
}
