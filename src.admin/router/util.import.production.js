module.exports = {
	_import: (file) => () => import('@.admin/views/' + file),
};
