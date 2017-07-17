export default {
  component: require('./index').default,
  childRoutes: [
    {
      path: '/buying',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Home').default))
      }
    },
    {
      path: '/buying_:id',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Detail').default))
      }
    },
    {
      path: '/order_buying',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Pay').default))
      }
    },
  ]
}