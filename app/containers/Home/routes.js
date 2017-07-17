export default {
  path: '/citys',
  getComponent(state, cb){
    require.ensure([], require => cb(null, require('./Citys').default))
  }
}