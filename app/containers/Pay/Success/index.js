import React, {PureComponent} from 'react';
import {Popup} from 'antd-mobile';
import PaySuccess from 'components/Pay/Success';
import Link from 'components/Link';
import WealCouponListItem from 'components/Weal/Coupon/List/Item';
import {getApi} from 'utils';
import s from 'components/Pay/Success/style.scss';

export default class extends PureComponent {
  state = {
    result: {},
    activity: false,
    finish_path: {
      pathname: '/'
    }
  }

  componentDidMount() {
    const {location} = this.props
    if (location.state) {
      location.state.order_id && this.fetchPopup(location.state.order_id)
      location.state.finish_path && this.setState({
        finish_path: location.state.finish_path
      })
    } else {
      this.fetchPopup('20170712091321894')
    }
  }

  fetchPopup = (order_id) => {
    return getApi(`/user/order/${order_id}/activity`).then(response => {
      this.showPopup(response.activity)
      response.activity && this.setState({
        activity: response.activity
      })
    })
  }
  showPopup = (popup) => {
    const {router} = this.props
    const closeBtn = <div className="close pd10 bg-alpha" onTouchEnd={this.hidePopup}>
      <i className="i-close size60 color10"/>
    </div>
    if (popup.type == 'image') {
      return Popup.show(<Link href={popup.link} className="block relative">
        <img src={popup.image} className="w100"/>
        {closeBtn}
      </Link>, {animationType: 'slide-up', maskClosable: false})
    }
    if (popup.type == 'lottery') {
      return Popup.show(<div className={`relative ${s.lottery}`}>
        <div className="flex-wrp flex-center color10 size36">恭喜您！获取{popup.new_count}次抽奖机会</div>
        <div className="flex-wrp flex-center ptb30">
          <div className="bg-yellow color21 border-raidus10 size52 ptb30 plr50" onClick={e => {
            Popup.hide()
            router.push({
              pathname: `/lottery`,
              query: {
                id: popup.activity.id
              }
            })
          }}>立即抽奖
          </div>
        </div>
        <div className="color19 text-center size36">剩余抽奖次数{popup.user.stock}</div>
        {closeBtn}
      </div>, {animationType: 'slide-up', maskClosable: false})
    }
    if (popup.type == 'coupon') {
      return Popup.show(<div className="relative bg-blue">
        <div className="ptb30">
          <div className="flex-wrp flex-center ptb20 color10 size36">恭喜您！您有{popup.coupons.length}张优惠券可领取</div>
          <div className="plr30">
            {popup.coupons.map((n, i) => <WealCouponListItem coupon={n} onClickCoupon={this.onClickCoupon} key={i}/>)}
          </div>
        </div>
        {closeBtn}
      </div>, {animationType: 'slide-up', maskClosable: false})
    }
  }
  hidePopup = (e) => {
    e.stopPropagation()
    Popup.hide()
  }
  onClickCoupon = (coupon) => {

  }
  onFinish = (e) => {
    const {finish_path} = this.state
    const {router} = this.props
    if (typeof(finish_path) == 'string') {
      window.location.href = finish_path
    } else {
      router.push(finish_path)
    }
  }

  render() {
    const {result, activity} = this.state
    return <PaySuccess
      result={result}
      activity={activity}
      onFinish={this.onFinish}
      onClickCoupon={this.onClickCoupon}
    />
  }
}