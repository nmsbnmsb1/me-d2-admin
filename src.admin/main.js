// Vue
//import '@/assets/style/tw_base.css';
import Vue from 'vue';
import i18n from '@/locales';
import store from './store';
import router from './router';
import './menu';
// 核心插件
import d2Admin from '@/plugin/d2admin';
import createApp from '@/create_app';
import App from '@/App';

import '@/assets/styles/tw_utilities.css';

// 核心插件

Vue.use(d2Admin);

new Vue({ i18n, store, router, ...createApp(App) }).$mount('#app');
