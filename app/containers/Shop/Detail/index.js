import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {setTitle, getApi, wx, callApi, postApi} from 'utils';
import ShopDetail from 'components/Shop/Detail';
import {Toast} from 'antd-mobile';
import Loading from 'components/Loading';
import ResultFail from 'components/Result/Fail';
import {FAVORITE} from 'app/constants';

@connect(state => ({
  user: state.user,
  config: state.config
}))
export default class extends PureComponent {
  state = {
    shop: false,
    isFetching: false,
    coupon: {
      isFetching: false,
      isMore: true,
      filter: {
        limit: 10,
        cid: 0
      },
      coupons: []
    },
  }

  componentDidMount() {
    const {params, config} = this.props
    setTitle(config.siteConfig.sitename)
    getApi(`/shop/${params.id}`).then(response => {
      const {shop} = response
      this.setState({
        shop: shop,
        isFetching: true
      }, () => {
        if (shop) {
          wx.setShare({
            title: `${shop.title}强势入驻【${config.siteConfig.sitename}】`,
            imgUrl: shop.thumb,
            desc: `关注订阅【${config.siteConfig.sitename}】尊享全城特惠`
          })
          this.fetchBuyings(shop.id)
          this.fetchCoupons(shop.id)
          getApi(`/comment`, {shop_id: shop.id, limit: 5}).then(response => {
            this.setState(state => ({
              shop: Object.assign({}, state.shop, {
                comments: response.comments || []
              })
            }))
          })
        }
      })
    })
  }

  fetchBuyings = (shop_id) => {
    return getApi(`/buying`, {shop_id, limit: 1}).then(response => {
      this.setState(state => ({
        shop: Object.assign({}, state.shop, {
          buyings: response.buyings || []
        })
      }))
    })
  }
  fetchCoupons = (shop_id) => {
    return getApi(`/new_coupon`, {shop_id, limit: 10}).then(response => {
      this.setState(state => ({
        shop: Object.assign({}, state.shop, {
          coupons: response.coupons || []
        })
      }))
    })
  }
  toggleFavor = () => {
    this.setState(state => {
      callApi(`/user/favorite/switch`, {
        type: FAVORITE.SHOP, target_id: state.shop.id
      }, 'PUT')
      return {
        shop: Object.assign({}, state.shop, {
          isfavor: !state.shop.isfavor
        })
      }
    })
  }
  onShowPhotos = () => {
    const {shop} = this.state
    wx.previewImage(shop.cover, [shop.cover].concat((shop.photos || []).map(item => {
      return item.thumb
    })))
  }
  onClickCoupon = (coupon) => {
    const {user} = this.props
    const {shop} = this.state
    Toast.loading('加载中...')
    if (!user.is_vip && coupon.is_vip) {
      return Toast.fail('仅限特权会员领取')
    }
    return postApi(`/new_coupon/${coupon.id}/receive`, {
      from: 2,
      shop_id: shop.id
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

  render() {
    const {shop, isFetching} = this.state
    if (!isFetching) {
      return <Loading inline/>
    }
    if (!shop) {
      return <ResultFail
        title="店铺不存在"
        message="店铺不存在或已停用"
      />
    }
    return <ShopDetail
      shop={shop}
      toggleFavor={this.toggleFavor}
      onShowPhotos={this.onShowPhotos}
      onClickCoupon={this.onClickCoupon}
    />
  }
}