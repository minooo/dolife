import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import {Modal} from 'antd-mobile';
import UserOrderHome from 'components/User/Order/Home';
import {setTitle, getApi, postApi, wx} from "utils";

@connect(state => ({
  config: state.config,
  user: state.user
}))
export default class extends PureComponent {
  state = {
    order: {
      isFetching: false,
      isMore: true,
      orders: [],
      filter: {
        limit: 10,
        offset: 0,
        status: 0
      },
    }
  }

  componentDidMount() {
    const {location, config} = this.props;
    setTitle(config.siteConfig.sitename);
    this.setState({
      order: Object.assign({}, this.state.order, {
        filter: Object.assign({}, this.state.order.filter, {
          status: location.query ? location.query.status || 0 : 0
        })
      })
    })
  }

  componentWillReceiveProps(newProps, overProps) {
    const {status} = newProps.location.query
    if (status != this.state.order.filter.status) {
      this.setState(state => ({
        order: Object.assign({}, state.order, {
          filter: Object.assign({}, state.order.filter, {
            status: status
          }),
          orders: [],
          isMore: true
        })
      }))
    }
  }

  fetchOrders = (e) => {
    if (!this.state.order.isMore || this.state.order.isFetching) {
      return
    }
    this.setState(state => ({
      order: Object.assign({}, state.order, {
        isFetching: true,
      })
    }), () => {
      getApi(`/user/order`, Object.assign({}, this.state.order.filter, {
        offset: this.state.order.orders.length
      })).then(response => {
        this.setState(state => ({
          order: Object.assign({}, state.order, {
            isFetching: false,
            isMore: (response.orders || []).length >= state.order.filter.limit,
            orders: state.order.orders.concat(response.orders || [])
          })
        }))
      })
    })
  }
  onSwitch = (status) => {
    const {router} = this.props
    router.replace({
      pathname: '/user_orders',
      query: {
        status: status
      }
    })
  }
  onPay = (order) => {
    this.payingState(order.id, true).then(() => {
      postApi('/user/order/pay', {
        order_id: order.id
      }).then(response => {
        this.payingState(order.id, false)
        if (response.code == 'SUCCESS') {
          if (response.wxpayparams) {
            return wx.pay(response.wxpayparams).then(res => {
              return Promise.resolve(response)
            }, err => {
              if (err.errMsg != 'requestPayment:fail cancel') {
                return Promise.reject({msg: '支付失败'})
              }
              return Promise.reject(response)
            })
          }
          doneOrder(response.order_id, response.status)
          return Promise.resolve(response)
        } else {
          return Promise.reject(response)
        }
      }).then(response => {
        response.order_id && router.replace({
          pathname: '/pay_success',
          state: {
            order_id: response.order_id,
            finish_path: {
              pathname: `/user_orders`,
              query: {
                status: this.state.order.filter.status
              }
            }
          }
        })
      }, err => {
        return Modal.alert('支付失败', err.msg)
      })
    })
  }
  payingState = (order_id, isPaying = true) => {
    return new Promise((resolve, reject) => {
      this.setState(state => ({
        order: Object.assign({}, state.order, {
          orders: state.order.orders.map((n, i) => n.id == order_id ? Object.assign({}, n, {isPaying}) : n)
        })
      }), resolve)
    })
  }
  onComment = (order) => {
    const {router} = this.props
    router.push({
      pathname: '/user_comment_add',
      state: {
        order: order
      }
    })
  }

  render() {
    const {order} = this.state
    return <UserOrderHome
      onSwitch={this.onSwitch}
      order={order}
      fetchOrders={this.fetchOrders}
      onPay={this.onPay}
      onComment={this.onComment}
    />
  }
}