const { _import } = require('@/libs/util.import.' + process.env.NODE_ENV);

function handleRoutes(routes, flattens, imports) {
	for (let r of routes.children) {
		if (!r.path.startsWith('/')) r.path = `${routes.path}/${r.path}`;
		if (!r.name) r.name = `${r.path.split('/').slice(1).join('.')}`;
		//
		if (r.children) {
			//if (!r.component) r.component = _import(path.substring(1));
			handleRoutes(r, flattens, imports);
		} else {
			if (!r.component) {
				r.component = (imports || _import)(r.path.substring(1));
			}
			flattens.push(r);
		}
		//console.log(r);
	}
	return routes;
}

export function $route(routes, imports) {
	let flattens = [];
	handleRoutes(routes, flattens, imports);
	return { ...routes, children: flattens };
}

function handleMenu(routes, children) {
	for (let r of routes.children) {
		if (!r.meta || !r.meta.menu) continue;
		//
		let item = {};
		item.title = r.meta.title || '未命名';
		item.icon = r.meta.icon || '';
		item.icon_d2 = r.meta.icon_d2 || '';
		item.icon_el = r.meta.icon_el || '';
		if (r.children) {
			item.children = [];
			handleMenu(r, item.children);
			//也有可能没有子类
			if (item.children.length <= 0) {
				delete item.children;
				item.path = r.path;
			}
		} else {
			item.path = r.path;
		}
		//
		children.push(item);
	}
}

export function $menu(routes) {
	let menu = {};
	menu.path = routes.path;
	menu.title = routes.meta.title || '';
	if (routes.meta.auth && routes.meta.roles) menu.roles = [...routes.meta.roles];
	menu.children = [];
	handleMenu(routes, menu.children);
	//console.log(menu);
	return menu;
}
