export default {
  component: require('./index').default,
  childRoutes: [
    {
      path: '/vip',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Home').default))
      }
    },
    {
      path: '/vip_help',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Help').default))
      }
    },
    {
      path: '/vip_invite',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Invite').default))
      }
    },
    {
      path: '/order_vip',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Pay').default))
      }
    },
    {
      path: '/vip_pay_agree',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Pay/Agree').default))
      }
    },
    {
      path: '/vip_level',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Level').default))
      }
    },
    {
      path: '/vip_rank',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Rank').default))
      }
    },
    {
      path: '/vip_rank_about',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Rank/About').default))
      }
    },
    {
      path: '/vip_priviege',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Privilege').default))
      }
    },
    {
      path: '/vip_priviege_detail',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Privilege/Detail').default))
      }
    },
    //兼容3.0路径
    {
      path: '/vip_card',
      onEnter: ({params}, replace) => replace(`/vip`)
    },
  ]
}