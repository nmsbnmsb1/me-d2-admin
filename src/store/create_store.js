import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function setModules(files, modules = { namespaced: true, modules: {} }) {
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
	//
	return modules;
}

export function createStore(modules) {
	const store = new Vuex.Store({ modules });
	Vue.prototype.$storeInstance = store;
	return store;
}
