export default {
  component: require('./index').default,
  childRoutes: [
    {
      path: '/search',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Home').default))
      }
    },
    {
      path: '/search_:keyword',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Result').default))
      }
    },
  ]
}