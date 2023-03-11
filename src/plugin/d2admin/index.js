// Element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// flex 布局库
import 'flex.css';
// 组件
import '@/components';
// svg 图标
import '@/assets/svg-icons';
// 国际化
import i18n from '@/locales/i18n';

// 功能插件
import pluginError from '@/plugin/error';
import pluginLog from '@/plugin/log';
import pluginOpen from '@/plugin/open';
//
import pluginConstants from '@/plugin/constants';
import pluginHelper from '@/plugin/helper';
import pluginFilters from '@/plugin/filters';

export default {
	async install(Vue, options) {
		// 设置为 false 以阻止 vue 在启动时生成生产提示
		// https://cn.vuejs.org/v2/api/#productionTip
		Vue.config.productionTip = false;
		// 当前环境
		Vue.prototype.$env = process.env.NODE_ENV;
		// 当前的 baseUrl
		Vue.prototype.$baseUrl = process.env.BASE_URL;
		// 当前版本
		Vue.prototype.$version = process.env.VUE_APP_VERSION;
		// 构建时间
		Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME;
		// Element
		Vue.use(ElementUI, {
			i18n: (key, value) => i18n.t(key, value),
		});
		// 插件
		Vue.use(pluginError);
		Vue.use(pluginLog);
		Vue.use(pluginOpen);

		//custom
		Vue.use(pluginConstants);
		Vue.use(pluginHelper);
		Vue.use(pluginFilters);
	},
};
