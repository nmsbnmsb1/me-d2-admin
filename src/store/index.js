import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modules = {};
const files = require.context('./modules', true, /\.js$/);
files.keys().forEach((key) => {
	let mkey = key.replace(/(\.\/|\.js)/g, '');
	let de = files(key).default;
	//de.namespaced = true;
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

//console.log(modules);

const store = new Vuex.Store({ modules });
Vue.prototype.$storeInstance = store;
export default store;

//console.log(store);
