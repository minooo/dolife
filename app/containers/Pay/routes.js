export default {
  component: require('./index').default,
  childRoutes: [
    {
      path: '/pay_success',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Success').default))
      }
    },
    {
      path: '/pay_fail',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Fail').default))
      }
    },
  ]
}