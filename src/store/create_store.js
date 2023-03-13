import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function setModules(files, modules = { namespaced: true, modules: {} }) {
	let m = modules.modules || modules;
	files.keys().forEach((key) => {
		let mkey = key.replace(/(\.\/|\.js)/g, '');
		let de = files(key).default;
		//
		if (mkey.indexOf('/') > 0) {
			let tmp = mkey.split('/');
			let mainModuleName = tmp[0];
			let childModuleName = tmp.slice(1).join('/');
			if (!m[mainModuleName]) m[mainModuleName] = { namespaced: true, modules: {} };
			m[mainModuleName].modules[childModuleName] = de;
		} else {
			m[mkey] = de;
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
