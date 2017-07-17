export default {
  component: require('./index').default,
  childRoutes: [
    {
      path: '/lottery',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Home').default))
      }
    },
  ]
}