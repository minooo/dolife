export default {
  component: require('./index').default,
  childRoutes: [
    {
      path: '/rim',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Home').default))
      }
    },
    {
      path: '/rim_:id',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Detail').default))
      }
    },
    {
      path: '/order_rim',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Pay').default))
      }
    },
  ]
}