import { setModules, createStore } from '@/store/create_store';

let d2admin = setModules(require.context('@/store/modules/d2admin', true, /\.js$/));
let admin = setModules(require.context('@.admin/store/modules', true, /\.js$/), {});

// console.log(d2admin);
// console.log(admin);

let store = createStore({ d2admin, ...admin });
//console.log(store);
export default store;
