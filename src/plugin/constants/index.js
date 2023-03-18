import { Constants, Filters } from '@/constants';

export default {
	install(Vue, options) {
		Vue.prototype.$Constants = Constants;
		//
		Object.keys(Filters).forEach((key) => Vue.filter(key, Filters[key]));
		//
	},
};
