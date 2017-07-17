export default {
  component: require('./index').default,
  childRoutes: [
    {
      path: '/gift',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Home').default))
      }
    },
    {
      path: '/gift_list',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./List').default))
      }
    },
    {
      path: '/gift_rule',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Rule').default))
      }
    },
    {
      path: '/gift_:id',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Detail').default))
      }
    },
  ]
}