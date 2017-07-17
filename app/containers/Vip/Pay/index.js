import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import moment from 'moment';
import Header from 'components/Header';
import Link from 'components/Link';
import {List, Checkbox, Radio, Button, Modal, Toast} from 'antd-mobile';
import {postApi, wx} from 'utils';

@connect(state => ({
  config: state.config,
  user: state.user,
  vip: state.vip
}))
export default class extends PureComponent {
  state = {
    checkedValue: 0,
    agree: false,
    isPaying: false,
  }

  componentDidMount() {
    const {vip} = this.props
    vip.prices && vip.prices.length > 0 && this.setState({
      checkedValue: vip.prices[0].id
    })
  }

  onPay = () => {
    const {checkedValue} = this.state
    const {router, vip} = this.props
    if (!checkedValue) {
      return Toast.fail('请选择开通时长')
    }
    this.setState({
      isPaying: true
    })
    postApi(`/vip/order`, Object.assign({}, vip.invite, {
      price_id: checkedValue
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
          finish_path: '/vip'
        }
      })
    }, err => {
      return Modal.alert('下单失败', err.msg)
    })
  }

  render() {
    const {user, vip} = this.props
    const {checkedValue, isPaying} = this.state
    return <div>
      <Header title={`${(user.is_vip || user.vip_info) ? '续费' : '购买'}VIP会员`}/>
      {user.vip_info && <div className="pd30 bg-yellow color16 size28">
        您的特权会员{moment(user.vip_info.end_time).isAfter() ? '将于' : '已于'}{user.vip_info.end_time}过期
      </div>}
      <List>
        {vip.prices.map((n, i) => <Radio.RadioItem
          key={i}
          checked={checkedValue == n.id}
          onChange={() => {
            this.setState({
              checkedValue: n.id
            })
          }}
        >
          {n.title}
          <List.Item.Brief>￥{n.price}</List.Item.Brief>
        </Radio.RadioItem>)}
      </List>
      <div className="ptb30 vip">
        <Checkbox.AgreeItem
          onChange={() => this.setState({
            agree: !this.state.agree
          })}
        >
          <span className="color4">同意并遵守</span><Link href={{pathname: '/vip_pay_agree'}}
                                                     className="color15">《微生活VIP协议》</Link>
        </Checkbox.AgreeItem>
      </div>
      <div className="plr20">
        <Button disabled={isPaying || !this.state.agree} loading={isPaying} className="bg-deepblue color15"
                onClick={this.onPay}>立即支付</Button>
      </div>
    </div>
  }
}