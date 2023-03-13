module.exports = {
	_import_system: (file) => require('@/views_system/' + file).default,
	_import: (file) => require('@/views/' + file).default,
};
