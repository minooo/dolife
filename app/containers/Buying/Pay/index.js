import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import BuyingPay from 'components/Buying/Pay';
import {setDetail, setAddress, setQuantity} from 'actions/cart/buying';
import {Toast, Modal} from 'antd-mobile';
import {wx} from 'utils';
import {submitOrder, doneOrder} from 'actions/order';

@connect(state => ({
  cart: state.cart.buying,
  user: state.user,
  order: state.order
}), {
  setDetail,
  setAddress,
  setQuantity,
  submitOrder
})
export default class extends PureComponent {
  componentDidMount() {
    const {location, setDetail, setAddress} = this.props
    if (location.state && location.state.buying) {
      setDetail(location.state.buying)
    }
    if (location.state && location.state.address) {
      setAddress(location.state.address)
    }
  }

  onSetQuantity = (quantity) => {
    const {setQuantity} = this.props
    if (quantity < 1) {
      return
    }
    setQuantity(quantity)
  }
  onPay = () => {
    const {cart, router, submitOrder, doneOrder} = this.props
    if (!cart.detail) {
      Toast.fail('请选择商品')
      return
    }
    if (cart.detail.delivery && !cart.address) {
      Toast.fail('请选择收货地址')
      return
    }
    return submitOrder('/buying/order', {
      buying_id: cart.detail.id,
      address_id: cart.detail.delivery ? cart.address.id : 0,
      quantity: cart.quantity
    }).then(({response}) => {
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
            pathname: '/buying'
          }
        }
      })
    }, err => {
      switch (parseInt(err.err_code)) {
        case -1:
          return Modal.alert('下单失败', err.msg, [
            {
              text: '取消',
              onPress: false
            },
            {
              text: '查看',
              onPress: () => {
                router.push({
                  pathname: '/user_order_detail',
                  query: {
                    id: err.order_id
                  }
                })
              }
            }
          ])
        default:
          return Modal.alert('下单失败', err.msg)
      }
    })
  }

  render() {
    const {cart, user, order} = this.props
    return <BuyingPay
      cart={cart}
      user={user}
      order={order}
      onSetQuantity={this.onSetQuantity}
      onPay={this.onPay}
    />
  }
}