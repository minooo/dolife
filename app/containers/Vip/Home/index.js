import React, {PureComponent} from "react";
import {connect} from "react-redux";
import VipHome from "components/Vip/Home";
import {Toast} from "antd-mobile";
import {fetchBuyings, fetchGifts, fetchShops} from "actions/vip";
import {getApi, postApi} from "utils";

@connect(state => ({
  config: state.config,
  user: state.user,
  vip: state.vip
}), {
  fetchBuyings,
  fetchShops,
  fetchGifts
})
export default class extends PureComponent {
  state = {
    tabIndex: 0,
    share: 0,
    coupon: {
      isFetching: false,
      isMore: true,
      filter: {
        limit: 10,
        cid: 0
      },
      coupons: []
    },
    vip_gifts: []
  }

  componentDidMount() {
    this.fetchVipGifts()
  }

  onSwitchTab = (tabIndex) => {
    this.setState({
      tabIndex: tabIndex
    })
  }
  onShare = (share) => {
    this.setState({
      share: share
    })
  }
  fetchBuyings = () => {
    const {vip, fetchBuyings} = this.props
    fetchBuyings({
      offset: vip.buying.buyings.length,
      isRefreshing: false
    })
  }
  fetchShops = () => {
    const {vip, fetchShops} = this.props
    fetchShops({
      offset: vip.shop.shops.length,
      isRefreshing: false
    })
  }
  fetchGifts = () => {
    const {vip, fetchGifts} = this.props
    fetchGifts({
      offset: vip.gift.gifts.length,
      isRefreshing: false
    })
  }

  onClickCoupon = (coupon) => {
    Toast.loading();
    return postApi(`/new_coupon/${coupon.id}/receive`, {
      from: 4
    }).then(response => {
      if (response.code == 'SUCCESS') {
        this.setState(state => ({
          coupon: Object.assign({}, state.coupon, {
            coupons: state.coupon.coupons.map(n => {
              return Object.assign({}, n, n.id == coupon.id ? {
                is_receive: true,
                user_receive_num: parseInt(n.user_receive_num) + 1
              } : {})
            })
          })
        }))
        return Toast.success('领取成功')
      } else {
        response.msg && Toast.fail(response.msg)
      }
    })
  }
  fetchCoupons = (e) => {
    if (!this.state.coupon.isMore) {
      return
    }
    this.setState(state => ({
      coupon: Object.assign({}, state.coupon, {
        isFetching: true
      })
    }), () => {
      getApi('/new_coupon', Object.assign({}, this.state.coupon.filter, {
        is_vip: 1,
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
  fetchVipGifts = () => {
    return getApi(`/vip/vip_gifts`).then(response => {
      this.setState({
        vip_gifts: response.gifts || []
      })
    })
  }


  render() {
    const {user, vip} = this.props
    const {tabIndex, coupon, vip_gifts, share} = this.state
    return <VipHome
      user={user}
      vip={vip}
      coupon={coupon}
      fetchCoupons={this.fetchCoupons}
      onClickCoupon={this.onClickCoupon}
      tabIndex={tabIndex}
      onSwitchTab={this.onSwitchTab}
      share={share}
      onShare={this.onShare}
      loadBuyings={this.fetchBuyings}
      loadVipBuyings={this.fetchVipBuyings}
      loadShops={this.fetchShops}
      loadGifts={this.fetchGifts}
      vip_gifts={vip_gifts}
    />
  }
}