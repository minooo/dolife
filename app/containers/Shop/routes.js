export default {
  component: require('./index').default,
  childRoutes: [
    {
      path: '/shop',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Home').default))
      }
    },
    {
      path: '/shop_join',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Join').default))
      }
    }, {
      path: '/shop_join_form',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Join/Form').default))
      }
    },
    {
      path: '/shop_comment',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Comment').default))
      }
    },
    {
      path: '/shop_coupon',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Coupon').default))
      }
    },
    {
      path: '/shop_buying',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Buying').default))
      }
    },
    {
      path: '/order_cashier',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Cashier').default))
      }
    },
    {
      path: '/shop_branch',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Branch').default))
      }
    },
    {
      path: '/shop_:id',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./Detail').default))
      }
    },
  ]
}