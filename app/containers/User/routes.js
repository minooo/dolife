export default {
  component: require('./index').default,
  childRoutes: [
    {
      path: '/user',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Home').default))
      }
    },
    {
      path: '/user_finance',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Finance').default))
      }
    },
    {
      path: '/user_finance_logs',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Finance/Log').default))
      }
    },
    {
      path: '/user_finance_result',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Finance/Result').default))
      }
    },
    {
      path: '/user_orders',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Orders').default))
      }
    },
    {
      path: '/user_order_detail',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Orders/Detail').default))
      }
    },
    {
      path: '/user_setting',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Setting').default))
      }
    },
    {
      path: '/user_coupons',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Coupons').default))
      }
    },
    {
      path: '/user_redpackets',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Redpackets').default))
      }
    },
    {
      path: '/user_favorites',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Favorites').default))
      }
    },
    {
      path: '/user_gifts',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Gifts').default))
      }
    },
    {
      path: '/user_about',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./About').default))
      }
    },
    {
      path: '/user_win',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Win').default))
      }
    },
    {
      path: '/user_win_detail',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Win/detail').default))
      }
    },
    {
      path: '/user_setting_mobile',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Setting/Mobile').default))
      }
    },
    {
      path: '/user_credit',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Credit').default))
      }
    },
    {
      path: '/user_addresses',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Addresses').default))
      }
    },
    {
      path: '/user_address_edit',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Addresses/Edit').default))
      }
    },
    {
      path: '/user_address_add',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Addresses/Edit').default))
      }
    },
    {
      path: '/user_comments',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Comment').default))
      }
    },
    {
      path: '/user_comment_add',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Comment/Add').default))
      }
    },
    //兼容3.0路径
    {
      path: '/user_gift',
      onEnter: ({params}, replace) => replace(`/user_gifts`)
    },
    {
      path: 'user_redpacket',
      onEnter: ({params}, replace) => replace(`/user_redpackets`)
    },
    {
      path: 'user_coupon',
      onEnter: ({params}, replace) => replace(`/user_coupons`)
    },
    {
      path: 'order_list',
      onEnter: ({params}, replace) => replace(`/user_orders`)
    },
    {
      path: 'order_info',
      onEnter: ({location}, replace) => replace(`/user_order_detail?id=${location.query.order_id}`)
    }
  ]
}