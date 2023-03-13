import Constants from '@/constants';

export default {
	install(Vue, options) {
		Vue.prototype.$Constants = Constants;
	},
};
