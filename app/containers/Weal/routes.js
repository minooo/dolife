export default {
  component: require('./index').default,
  childRoutes: [
    {
      path: '/weal',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Home').default))
      }
    },
    {
      path: '/weal_rule',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Rule').default))
      }
    },
    {
      path: '/weal_redpacket_:id',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Redpacket').default))
      }
    },
    //兼容3.0路径
    {
      path: '/coupon',
      onEnter: ({params}, replace) => replace(`/weal?type=1`)
    },
  ]
}