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
const Constants = {};
export default Constants;

Constants.default_page_size = 12;
Constants.default_page_params = { page: 1, page_size: Constants.default_page_size };

//业务常量
Constants.Title = process.env.VUE_APP_TITLE;
Constants.CDN = process.env.VUE_APP_CDN;
Constants.Buckets = {
	default: { bucket: 'xxxxxx', region: 'xxxxxx' },
};
Constants.MOCK = process.env.VUE_APP_MOCK;
//
Constants.Roles = $define({
	marketing: { id: '1001', name: '市场', key: 'marketing' },
	admin: { id: '1002', name: '管理', key: 'admin' },
});
Constants.roleUUIDToRoleID = function (roleUUID) {
	return parseInt(roleUUID.substring(0, 4), 10);
};
Constants.RolesOptions = (insertDefault) => $options(insertDefault ? { id: 0, value: '请选择角色' } : undefined, Constants.Roles);
