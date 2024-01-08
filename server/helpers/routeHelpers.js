function isActiveRoute(route,currentRoute) {
    return route === currentRoute ? 'active' : '';
}

module.export = { isActiveRoute}