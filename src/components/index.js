import Vue from 'vue';

import d2Container from './d2-container';
import d2LinkBtn from './d2-link-btn';
import d2Icon from './d2-icon';
import d2IconSVG from './d2-icon-svg/index.vue';
import Scrollbar from './d2-scrollbar';
//
import Pagination from './pagination';
import Upload from './upload';

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container);
Vue.component('d2-link-btn', d2LinkBtn);
Vue.component('d2-icon', d2Icon);
Vue.component('d2-icon-svg', d2IconSVG);
Vue.component('d2-scrollbar', Scrollbar);
Vue.component('d2-quill', () => import('./d2-quill'));
Vue.component('d2-count-up', () => import('./d2-count-up'));
//
Vue.component('pagination', Pagination);
Vue.component('upload', Upload);
