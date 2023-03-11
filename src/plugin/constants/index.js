import Constants from '@/libs/constants';

export default {
	install(Vue, options) {
		Vue.prototype.$Constants = Constants;
	},
};
