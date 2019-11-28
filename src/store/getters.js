const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  user: state => state.user.user,
  permissionAddRoutes: state => state.permission.addRoutes,
  permissionRoutes: state => state.permission.routes,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  allEnterprise: state => state.enterprise.enterpriseInfo
}
export default getters
