import Helper from '@/libs/helper';

export default {
	install(Vue, options) {
		Vue.prototype.$Helper = Helper;
	},
};
