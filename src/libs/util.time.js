import moment from 'moment';

export function makeTime(day, time) {
	let newTime = [];
	let str;
	if (day !== null && time !== null) {
		if (typeof day === 'object') {
			for (const d of day) {
				str = moment(d).format('YYYY-MM-DD') + ' ' + time;
				newTime.push(moment(str, 'YYYY-MM-DD HH:mm').valueOf());
			}
		} else {
			str = moment(day).format('YYYY-MM-DD') + ' ' + time;
			newTime.push(moment(str, 'YYYY-MM-DD HH:mm').valueOf());
		}
		return newTime;
	} else {
		return undefined;
	}
}
