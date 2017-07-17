import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import WealHome from 'components/Weal/Home';
import {getCategorys} from 'actions/category';
import {getWeal, increaseMoney} from 'actions/user';
import {getApi, postApi, setTitle, wx} from 'utils';
import {getLocation} from 'utils/wxapi'

@connect(state => ({
  user: state.user,
  category: state.category
}), {
  getCategorys,
  getWeal,
  increaseMoney
})
export default class extends PureComponent {
  state = {
    tabIndex: 0,
    cash_redpacket: {
      isFetching: false,
      isMore: true,
      filter: {
        limit: 10
      },
      redpackets: []
    },
    coupon: {
      isFetching: false,
      isMore: true,
      filter: {
        limit: 10,
        cid: 0
      },
      coupons: []
    },
    redpacket: false
  }

  componentDidMount() {
    const {getCategorys, getWeal, location} = this.props
    location.query && location.query.type && this.setState({
      tabIndex: location.query.type
    })
    getCategorys('coupon')
    getWeal()
  }

  onSwitchTab = (tabIndex) => {
    this.setState({
      tabIndex
    })
  }
  onFilterCoupon = (key, value) => {
    this.setState(state => ({
      coupon: Object.assign({}, state.coupon, {
        filter: Object.assign({}, state.coupon.filter, {
          [key]: value
        }),
        coupons: [],
        isMore: true
      })
    }))
  }
  fetchRedpackets = (e) => {
    if (this.state.cash_redpacket.isFetching || !this.state.cash_redpacket.isMore) {
      return
    }
    this.setState(state => ({
      cash_redpacket: Object.assign({}, state.cash_redpacket, {
        isFetching: true
      })
    }), () => {
      getApi('/cash_red_packet', Object.assign({}, this.state.cash_redpacket.filter, {
        offset: this.state.cash_redpacket.redpackets.length
      })).then(response => {
        this.setState(state => ({
          cash_redpacket: Object.assign({}, state.cash_redpacket, {
            isFetching: false,
            isMore: (response.redpackets || []).length >= state.cash_redpacket.filter.limit,
            redpackets: state.cash_redpacket.redpackets.concat(response.redpackets || []),
          })
        }))
      })
    })
  }
  fetchCoupons = (e) => {
    if (this.state.coupon.isFetching || !this.state.coupon.isMore) {
      return
    }
    this.setState(state => ({
      coupon: Object.assign({}, state.coupon, {
        isFetching: true
      })
    }), () => {
      getApi('/new_coupon', Object.assign({}, this.state.coupon.filter, {
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
  onClickRedpacket = (redpacket) => {
    const {router} = this.props
    Toast.loading('加载中...')
    return getApi(`/cash_red_packet/${redpacket.id}`).then(response => {
      Toast.hide()
      if (response.code == 'SUCCESS') {
        if (response.redpacket.is_get) {
          router.push({
            pathname: `/weal_redpacket_${response.redpacket.id}`
          })
        } else {
          this.setState({
            redpacket: response.redpacket
          })
        }
      } else {
        response.msg && Toast.fail(response.msg)
      }
    })
  }
  onOpenRedpacket = (redpacket) => {
    const {router, increaseMoney} = this.props
    if (redpacket.isOpening) {
      return
    }
    this.setState(state => ({
      redpacket: Object.assign({}, state.redpacket, {
        isOpening: true
      })
    }))
    getApi(`/cash_red_packet/${redpacket.id}/open`).then(response => {
      this.setState(state => ({
        redpacket: Object.assign({}, state.redpacket, {
          isOpening: false
        })
      }))
      if (response.code == 'SUCCESS') {
        increaseMoney(response.money)
        router.push({
          pathname: `/weal_redpacket_${redpacket.id}`,
          state: {
            redpacket: response
          }
        })
      } else {
        response.msg && Toast.fail(response.msg)
      }
      return response
    })
  }
  onClickCoupon = (coupon) => {
    Toast.loading()
    if (!this.props.user.is_vip && coupon.is_vip) {
      return Toast.fail('仅限特权会员领取')
    } else {
      return postApi(`/new_coupon/${coupon.id}/receive`, {
        from: 1
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
  }
  onCloseRedpacket = () => {
    this.setState({
      redpacket: false
    })
  }

  render() {
    const {user, category} = this.props
    const {tabIndex, cash_redpacket, coupon, redpacket} = this.state
    return <div>
      <WealHome
        user={user}
        tabIndex={tabIndex}
        cash_redpacket={cash_redpacket}
        coupon={coupon}
        category={category}
        onSwitchTab={this.onSwitchTab}
        onFilterCoupon={this.onFilterCoupon}
        fetchRedpackets={this.fetchRedpackets}
        fetchCoupons={this.fetchCoupons}
        onClickRedpacket={this.onClickRedpacket}
        onOpenRedpacket={this.onOpenRedpacket}
        onCloseRedpacket={this.onCloseRedpacket}
        onClickCoupon={this.onClickCoupon}
        redpacket={redpacket}
      />
    </div>
  }
}