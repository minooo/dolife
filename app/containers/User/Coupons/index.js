import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import {getWeal} from 'actions/user';
import {setTitle, getApi, callApi} from "utils";
import UserCouponHome from 'components/User/Coupon/Home';

@connect(state => ({
  config: state.config,
  user: state.user
}), {
  getWeal
})
export default class extends PureComponent {
  state = {
    coupon: {
      isFetching: false,
      isMore: true,
      filter: {
        status: 0,
        limit: 10
      },
      coupons: []
    }
  }

  componentDidMount() {
    const {config, location, getWeal} = this.props
    setTitle(config.siteConfig.sitename)
    getWeal()
    this.setState({
      coupon: Object.assign({}, this.state.coupon, {
        filter: Object.assign({}, this.state.coupon.filter, {
          status: location.query ? location.query.status || 0 : 0
        })
      })
    })
  }

  componentWillReceiveProps(newProps, overProps) {
    const {status} = newProps.location.query
    if (status != this.state.coupon.filter.status) {
      this.setState(state => ({
        coupon: Object.assign({}, state.coupon, {
          filter: Object.assign({}, state.coupon.filter, {
            status: status
          }),
          coupons: [],
          isMore: true
        })
      }))
    }
  }

  onSwitch = (status) => {
    const {router} = this.props
    router.replace({
      pathname: '/user_coupons',
      query: {
        status: status
      }
    })
  }
  fetchCoupons = () => {
    if (!this.state.coupon.isMore || this.state.coupon.isFetching) {
      return
    }
    this.setState(state => ({
      coupon: Object.assign({}, state.coupon, {
        isFetching: true,
      })
    }), () => {
      getApi(`/user/new_coupon`, Object.assign({}, this.state.coupon.filter, {
        offset: this.state.coupon.coupons.length
      })).then(response => {
        this.setState(state => ({
          coupon: Object.assign({}, state.coupon, {
            isFetching: false,
            isMore: (response.coupons || []).length >= state.coupon.filter.limit,
            coupons: state.coupon.coupons.concat(response.coupons || [])
          })
        }))
      })
    })
  }
  onDelete = (coupon) => {
    confirm('确认删除？') && callApi(`/user/new_coupon/${coupon.id}`, {}, 'DELETE').then(response => {
      if (response.code == 'SUCCESS') {
        this.setState(state => ({
          coupon: Object.assign({}, state.coupon, {
            coupons: state.coupon.coupons.filter((n) => {
              return n.id != coupon.id
            })
          })
        }))
      } else {
        response.msg && Toast.fail(response.msg)
      }
    })
  }

  render() {
    const {user} = this.props
    const {coupon} = this.state
    return <UserCouponHome
      user={user}
      onSwitch={this.onSwitch}
      coupon={coupon}
      fetchCoupons={this.fetchCoupons}
      onDelete={this.onDelete}
    />
  }
}