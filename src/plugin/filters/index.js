import * as filters from './filters';

export default {
	install(Vue, options) {
		Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]));
	},
};
