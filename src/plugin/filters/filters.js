import moment from 'moment';
import Constants from '@/constants';

//time
export function date_ymd(time) {
	return moment(time).format('YYYY-MM-DD');
}
export function date_ymdhms(time) {
	return moment(time).format('YYYY-MM-DD HH:mm:ss');
}
export function date_ymdhs(time) {
	return moment(time).format('YYYY-MM-DD HH:mm');
}
export function date_hm(time) {
	return moment(time).format('HH:mm');
}
export function date_hms(time) {
	if (time === null || time === undefined) return '';
	return moment(time).format('HH:mm:ss');
}
//
function len(info, size) {
	if (!info) return '';
	if (info.length < size) return info;
	return `${info.substring(0, size)}...`;
}
export function len15(info) {
	return len(info, 15);
}
export function len30(info) {
	return len(info, 30);
}
export function role_name(role_id) {
	return Constants.Roles[role_id]?.name || '';
}
