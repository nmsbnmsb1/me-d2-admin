import Vue from 'vue';
import { getBaseMenus, setModules, createHeaderMenu, createSideMenu } from './create_menu';
import components from './modules/components';
import playground from './modules/playground';
import plugins from './modules/plugins';

// 菜单 顶栏
Vue.prototype.$menuHeader = createHeaderMenu([
	//...getBaseMenus(),
	components,
	playground,
	plugins,
	//
]);

//
Vue.prototype.$menuAside = createSideMenu([
	...getBaseMenus(),
	...setModules(require.context('./modules', true, /\.js$/)),
	//
]);
