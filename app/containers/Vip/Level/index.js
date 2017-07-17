import React, {PureComponent} from 'react'
import {connect} from 'react-redux';
import VipLevel from 'components/Vip/Level';

@connect(state => ({
  user: state.user,
  vip: state.vip
}))
export default class extends PureComponent {
  state = {
    tabIndex: 0,
    priviegies: [
      {
        title: '积分回馈',
        icon: 'i-jfhk'
      }
    ],
    unpriviegies: [
      {
        title: '积分回馈',
        icon: 'i-jfhk'
      },
      {
        title: '会员抢购',
        icon: 'i-buying-v'
      },
      {
        title: '会员优惠',
        icon: 'i-coupon-v'
      }, {
        title: '会员礼品',
        icon: 'i-gift-v'
      }, {
        title: '会员折扣',
        icon: 'i-vipdis'
      }
    ]

  }

  componentDidMount() {
    const {user} = this.props
    {
      user.is_vip &&
      this.setState({
        tabIndex: 1
      })
    }
  }

  onSwitchTab = (tabIndex) => {
    this.setState({
      tabIndex
    })
  }

  render() {
    const {user, vip} = this.props
    const {tabIndex, priviegies, unpriviegies} = this.state
    return <VipLevel
      user={user}
      vip={vip}
      tabIndex={tabIndex}
      priviegies={priviegies}
      unpriviegies={unpriviegies}
      onSwitchTab={this.onSwitchTab}
    />
  }
}