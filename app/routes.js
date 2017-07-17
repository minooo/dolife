export default {
  component: require('./containers/Boot').default,
  childRoutes: [
    {
      path: '/',
      component: require('./containers/App').default,
      indexRoute: {
        getComponent(state, cb){
          require.ensure([], require => cb(null, require('./containers/Home').default))
        }
      },
      childRoutes: [
        require('./containers/Shop/routes').default,
        require('./containers/Buying/routes').default,
        require('./containers/Pay/routes').default,
        require('./containers/User/routes').default,
        require('./containers/Weal/routes').default,
        require('./containers/Rim/routes').default,
        require('./containers/Vip/routes').default,
        require('./containers/Gift/routes').default,
        require('./containers/Search/routes').default,
        require('./containers/Lottery/routes').default,
        require('./containers/Home/routes').default,
      ]
    },
    {
      path: '*',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./containers/NotFound').default))
      }
    }
  ]
}
