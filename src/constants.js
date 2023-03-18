import moment from 'moment';
import Helper from '@/libs/helper';

export function $define(m) {
	for (const k in m) m[m[k].id] = m[k];
	return m;
}
export function $options(defaultItem, m, showField = 'name') {
	let options = [];
	if (defaultItem) options.push(Helper.isObject(defaultItem) ? defaultItem : { id: 0, value: '请选择' });
	for (const k in m) {
		if (isNaN(k)) options.push({ id: m[k].id, value: m[k][showField] });
	}
	return options;
}
export function len(info, size) {
	if (!info) return '';
	if (info.length < size) return info;
	return `${info.substring(0, size)}...`;
}

export class Constants {
	static default_page_size = 12;
	static default_page_params = { page: 1, pageSize: Constants.default_page_size };

	//业务常量
	static MOCK = process.env.VUE_APP_MOCK;
	static Title = process.env.VUE_APP_TITLE;
	static CDN = process.env.VUE_APP_CDN;
	static Buckets = {
		default: { bucket: 'xxxxxx', region: 'xxxxxx' },
	};

	static Roles = $define({
		marketing: { id: '1001', name: '市场', key: 'marketing' },
		admin: { id: '1002', name: '管理', key: 'admin' },
	});
	static roleUUIDToRoleID = function (roleUUID) {
		return parseInt(roleUUID.substring(0, 4), 10);
	};
	static RolesOptions = (insertDefault) => $options(insertDefault ? { id: 0, value: '请选择角色' } : undefined, Constants.Roles);
}

export const Filters = {
	date_ymd(time) {
		return moment(time).format('YYYY-MM-DD');
	},
	date_ymdhms(time) {
		return moment(time).format('YYYY-MM-DD HH:mm:ss');
	},
	date_ymdhs(time) {
		return moment(time).format('YYYY-MM-DD HH:mm');
	},
	date_hm(time) {
		return moment(time).format('HH:mm');
	},
	date_hms(time) {
		if (time === null || time === undefined) return '';
		return moment(time).format('HH:mm:ss');
	},
	//
	len15(info) {
		return len(info, 15);
	},
	len30(info) {
		return len(info, 30);
	},
	role_name(role_id) {
		return Constants.Roles[role_id]?.name || '';
	},
};
