import React, {Component} from "react";
import RimPay from 'components/Rim/Pay';
import Loading from 'components/Loading';
import {Toast} from 'antd-mobile';
import {setTitle, getApi, wx, callApi} from 'utils';
import {connect} from "react-redux";

@connect(state => ({
  user: state.user,
  rim: state.rim,
  config: state.config,
  order: state.order
}))
export default class extends Component {
  state = {
    rim: false,
    isFetching: true,
    quantity: {
      adult: 0,
      kid: 0
    }
  }

  componentDidMount() {
    const {location} = this.props
    if (location.state && location.state.rim) {
      this.setState({
        rim: location.state.rim,
        isFetching: false
      })
    }
  }

  onSetQuantity = (type, value) => {
    this.setState(state => ({
      quantity: Object.assign({}, state.quantity, {
        [type]: value
      })
    }))
  }
  onBindPhone = () => {
    const {router} = this.props;
    router.push('/user_setting_mobile')
  }
  onPay = () => {
    const {doneOrder, user} = this.props;
    const {rim, quantity} = this.state;
    if (!user.mobile) {
      Toast.info('请先绑定手机号哦！');
      return
    }
    return callApi('/rim/order', {
      rim_id: rim.id,
      realname: user.truename,
      mobile: user.mobile,
      people: quantity.adult,
      child: quantity.kid
    }, 'POST').then((response) => {
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
        // return Promise.reject(response)
        response.msg && Toast.fail(response.msg)
      }
    })
  }

  render() {
    const {rim, isFetching, quantity} = this.state
    const {config, user, location} = this.props
    if (isFetching) {
      return <Loading inline/>
    }
    return <RimPay
      rim={rim}
      user={user}
      quantity={quantity}
      onSetQuantity={this.onSetQuantity}
      onPay={this.onPay}
      onBindPhone={this.onBindPhone}
    />
  }
}