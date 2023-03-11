import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modules = {};

//手动导入
//导入d2admin
modules.d2admin = { namespaced: true, modules: {} };
let d2files = require.context('@/store/modules/d2admin', true, /\.js$/);
d2files.keys().forEach((key) => {
	let mkey = key.replace(/(\.\/|\.js)/g, '');
	let de = d2files(key).default;
	modules.d2admin.modules[mkey] = de;
});

//导入本地模块
let files = require.context('./modules', true, /\.js$/);
files.keys().forEach((key) => {
	let mkey = key.replace(/(\.\/|\.js)/g, '');
	let de = files(key).default;
	//
	if (mkey.indexOf('/') > 0) {
		let tmp = mkey.split('/');
		let mainModuleName = tmp[0];
		let childModuleName = tmp.slice(1).join('/');
		if (!modules[mainModuleName]) modules[mainModuleName] = { namespaced: true, modules: {} };
		modules[mainModuleName].modules[childModuleName] = de;
	} else {
		modules[mkey] = de;
	}
});

const store = new Vuex.Store({ modules });
Vue.prototype.$storeInstance = store;
export default store;
