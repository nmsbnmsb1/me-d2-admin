import { assign } from 'lodash';

const api = {};
const files = require.context('./modules', true, /\.js$/);
files.keys().map((key) => {
	assign(api, files(key));
	return 1;
});

export default api;
