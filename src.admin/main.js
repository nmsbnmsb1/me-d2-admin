//import '@/assets/style/tw_base.css';

// Vue
import Vue from 'vue';
import i18n from '@/locales/i18n';
import store from './store/index';
import router from './router';
import './menu';
// 核心插件
import d2Admin from '@/plugin/d2admin';

import App from '@/App';
import createAppOptions from '@/createapp_options';

import '@/assets/style/tw_utilities.css';

// 核心插件

Vue.use(d2Admin);

new Vue({ i18n, store, router, ...createAppOptions(App) }).$mount('#app');
