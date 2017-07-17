import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import debounce from 'lodash/debounce';
import {Toast, Popup, List, Modal} from 'antd-mobile';
import {getApi, postApi, wx, number_format, setTitle} from 'utils';
import {setCashier, discount} from 'actions/cashier';
import ShopCashier from 'components/Shop/Cashier';

@connect(state => ({
  user: state.user,
  cashier: state.cashier
}), {
  setCashier,
  discount
})
export default class extends PureComponent {
  state = {
    shop: false,
    inputFocus: 1,
    isPaying: false,
    cashier: {}
  }

  componentDidMount() {
    const {location, setCashier, router} = this.props
    if (location.query.shop_id) {
      setCashier({
        shop_id: location.query.shop_id
      })
      getApi(`/shop/${location.query.shop_id}`).then(response => {
        if (response.code == 'SUCCESS') {
          setTitle(response.shop.title)
          this.setState({
            shop: response.shop
          })
        } else {
          Toast.fail('无效的商家信息', 2, () => {
            router.push({
              pathname: '/shop'
            })
          })
        }
      })
    }
  }

  onSwitchInput = (inputFocus) => {
    this.setState({
      inputFocus
    })
  }
  onKeyinput = (e, value) => {
    const {cashier, setCashier} = this.props
    const {inputFocus} = this.state
    let total_fee = cashier.total_fee.toString()
    if (inputFocus == 2) {
      total_fee = cashier.real_fee.toString()
    }
    switch (value) {
      case 'backspace':
        if (total_fee.length > 1) {
          total_fee = total_fee.substr(0, total_fee.length - 1)
        } else {
          total_fee = 0
        }
        break
      case '.':
        if (total_fee.indexOf('.') == -1) {
          total_fee += '.'
        }
        break
      default:
        if (total_fee == '0') {
          total_fee = ''
        }
        if (total_fee.length < 8) {
          if (total_fee.indexOf('.') !== -1) {
            if (total_fee.length - total_fee.indexOf('.') < 3) {
              total_fee += parseFloat(value)
            }
          } else {
            total_fee += parseFloat(value)
          }
        }
        break
    }
    if (inputFocus == 1) {
      setCashier({
        total_fee: total_fee,
        redpacket: false
      })
    } else {
      if (parseFloat(total_fee) > cashier.total_fee) {
        Toast.info('不参与优惠金额不能大于消费总金额')
      } else {
        setCashier({
          real_fee: total_fee,
          redpacket: false
        })
      }
    }
    this.discountFee()
  }

  discountFee = debounce((v) => {
    const {cashier, setCashier, discount} = this.props
    if (cashier.total_fee > 0) {
      discount(cashier.shop_id, cashier, v)
    } else {
      setCashier({
        discount: false,
        cash_fee: cashier.total_fee + cashier.real_fee
      })
    }
  }, 1000)

  onChooseRedpacket = () => {
    const {cashier} = this.props
    if (!cashier.discount.redpackets || cashier.discount.redpackets.length == 0) {
      return
    }
    Popup.show(<List
      renderHeader={<div className="flex-wrp flex-between">
        选择红包
        <i className="i i-close" onTouchEnd={() => Popup.hide()}/>
      </div>}
      style={{maxHeight: '70vh', overflowY: 'auto'}}
    >
      <List.Item onClick={e => this.setRedpacket(false)}>
        <div className="flex-wrp flex-align-center flex-between">
          <div className="size28">不使用红包</div>
          <div className="size26 color4"></div>
        </div>
      </List.Item>
      {cashier.discount.redpackets.map((n, i) => <List.Item key={i} onClick={e => this.setRedpacket(n)}>
        <div className="flex-wrp flex-align-center flex-between">
          <div className="size28">{number_format(n.fee)}元</div>
          <div className="size26 color4">满{number_format(n.condition.lower)}元可用</div>
        </div>
      </List.Item>)}
    </List>, {animationType: 'slide-up'})
  }

  setRedpacket = (redpacket) => {
    const {setCashier} = this.props
    setCashier({
      redpacket
    })
    this.discountFee(1)
    Popup.hide()
  }

  onChooseCoupon = () => {
    const {cashier} = this.props
    if (!cashier.discount.coupons || cashier.discount.coupons.length == 0) {
      return
    }
    Popup.show(<List
      renderHeader={<div className="flex-wrp flex-between">
        选择优惠券
        <i className="i i-close" onTouchEnd={() => Popup.hide()}/>
      </div>}
      style={{maxHeight: '70vh', overflowY: 'auto'}}
    >
      <List.Item onClick={e => this.setCoupon(false)}>
        <div className="flex-wrp flex-align-center flex-between">
          <div className="size28">不使用优惠券</div>
          <div className="size26 color4"></div>
        </div>
      </List.Item>
      {cashier.discount.coupons.map((n, i) => <List.Item key={i} onClick={e => this.setCoupon(n)}>
        {n.type == 1 && <div className="flex-wrp flex-align-center flex-between">
          <div className="size28">{number_format(n.value)}元</div>
          <div className="size26 color4">满{number_format(n.condition)}元可用</div>
        </div>}
        {n.type == 2 && <div className="flex-wrp flex-align-center flex-between">
          <div className="size28">{number_format(n.value)}折</div>
          <div className="size26 color4">最高减免{number_format(n.condition)}元</div>
        </div>}
        {n.type == 3 && <div className="flex-wrp flex-align-center flex-between">
          <div className="size28">减免{number_format(n.value)}元</div>
        </div>}
        {n.type == 4 && <div className="flex-wrp flex-align-center flex-between">
          <div className="size28">减免{number_format(n.value)}元</div>
        </div>}
      </List.Item>)}
    </List>, {animationType: 'slide-up'})
  }

  setCoupon = (coupon) => {
    const {setCashier} = this.props
    setCashier({
      coupon
    })
    this.discountFee(1)
    Popup.hide()
  }

  onPay = () => {
    const {cashier, router} = this.props
    if (cashier.total_fee <= 0) {
      return
    }
    this.setState({
      isPaying: true
    }, () => {
      postApi(`/shop/cashier/${cashier.shop_id}`, Object.assign({}, {
        fee: cashier.total_fee,
        real_fee: cashier.real_fee,
        redpacket_id: cashier.redpacket ? cashier.redpacket.id : 0,
        coupon_id: cashier.coupon ? cashier.coupon.id : 0
      })).then(response => {
        this.setState({
          isPaying: false
        })
        if (response.code == 'SUCCESS' && response.wxpayparams) {
          return wx.pay(response.wxpayparams).then(() => {
            return Promise.resolve(response)
          }, err => {
            if (err.errMsg != 'requestPayment:fail cancel') {
              return Promise.reject({msg: '支付失败'})
            }
            return Promise.reject(response)
          })
        } else {
          return Promise.reject(response)
        }
      }).then(response => {
        router.push({
          pathname: `/pay_success`,
          state: {
            order_id: response.order_id,
            finish_path: {
              pathname: `/shop_${cashier.shop_id}`
            }
          }
        })
      }, err => {
        return Modal.alert('下单失败', err.msg)
      })
    })
  }

  render() {
    const {cashier} = this.props
    const {inputFocus, shop, isPaying} = this.state
    return <ShopCashier
      shop={shop}
      inputFocus={inputFocus}
      isPaying={isPaying}
      cashier={cashier}
      onSwitchInput={this.onSwitchInput}
      onKeyinput={this.onKeyinput}
      onPay={this.onPay}
      onChooseRedpacket={this.onChooseRedpacket}
      onChooseCoupon={this.onChooseCoupon}
    />
  }
}