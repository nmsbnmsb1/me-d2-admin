module.exports = {
	_import_system: (file) => () => import('@/views_system/' + file),
	_import: (file) => () => import('@/views/' + file),
	_admin_import: (file) => () => import('@.admin/views/' + file),
};
