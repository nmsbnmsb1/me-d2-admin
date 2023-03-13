import { setModules, createStore } from './create_store';

let base = setModules(require.context('./modules', true, /\.js$/));

let store = createStore(base);
//console.log(store);
export default store;
