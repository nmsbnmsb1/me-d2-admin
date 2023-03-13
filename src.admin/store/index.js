import { setModules, createStore } from '@/store/create_store';

let base = setModules(require.context('@/store/modules', true, /\.js$/));
let admin = setModules(require.context('@.admin/store/modules', true, /\.js$/));

let store = createStore({ ...base, admin });
//console.log(store);
export default store;
