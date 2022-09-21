import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const d2admin = { namespaced: true, modules: {} };
const d2adminFiles = require.context('./d2admin', false, /\.js$/);
d2adminFiles.keys().forEach((key) => {
	d2admin.modules[key.replace(/(\.\/|\.js)/g, '')] = d2adminFiles(key).default;
});

const modules = {};
const files = require.context('./', false, /\.js$/);
files.keys().forEach((key) => {
	if (key.endsWith('index.js')) return;
	modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default new Vuex.Store({
	modules: {
		d2admin,
		...modules,
	},
});
