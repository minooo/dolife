import React, {PureComponent} from 'react';
import {Toast} from 'antd-mobile';
import ResultFail from 'components/Result/Fail';
import Loading from 'components/Loading';
import UserOrderDetail from 'components/User/Order/Detail';
import {getApi, postApi, wx} from 'utils';

export default class extends PureComponent {
  state = {
    isFetching: false,
    isFetched: false,
    isPaying: false,
    order: false
  }

  componentDidMount() {
    const {location} = this.props
    this.fetchOrder(location.query.id)
  }

  fetchOrder = (order_id) => {
    this.setState(state => {
      isFetching:true
    }, () => {
      return getApi(`/user/order/${order_id}`).then(response => {
        this.setState({
          isFetching: false,
          isFetched: true,
          order: response.order
        })
      })
    })
  }
  onPay = () => {
    const {router} = this.props
    const {order} = this.state
    this.setState({
      isPaying: true
    })
    postApi(`/user/order/pay`, {order_id: order.id}).then(response => {
      this.setState({
        isPaying: false
      })
      if (response.code == 'SUCCESS') {
        response.wxpayparams && wx.pay(response.wxpayparams).then(res => {
          Toast.success('支付成功', 2, () => {
            router.goBack()
          })
        })
      } else {
        response.msg && Toast.fail(response.msg)
      }
    })
  }
  onComment = (e) => {
    e.stopPropagation()
    const {order} = this.state
    router.push({
      pathname: '/user_comment_add',
      state: {
        order: order
      }
    })
  }

  render() {
    const {isFetching, isFetched, isPaying, order} = this.state
    if (isFetching || !isFetched) {
      return <Loading inline/>
    }
    if (!order) {
      return <ResultFail
        title="订单不存在"
        message="订单不存在或已删除"
      />
    }
    return <UserOrderDetail
      order={order}
      isPaying={isPaying}
      onPay={this.onPay}
      onComment={this.onComment}
    />
  }
}