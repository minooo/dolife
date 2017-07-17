import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import VipHelp from 'components/Vip/Help';

@connect(state => ({
  vip: state.vip
}))
export default class extends PureComponent {
  state = {
    helpers: []
  }

  componentDidMount() {
    const {vip} = this.props
    this.setState({
      helpers: [
        {
          title: '什么是VIP会员',
          content: vip.what_is_vip,
          icon: 'i-help-o'
        },
        {
          title: '如何开通VIP会员',
          content: vip.how_join_vip,
          icon: 'i-kttq'
        },
        {
          title: 'VIP会员权益',
          content: vip.privilege.map((n, i) => <div>{n.desc}</div>),
          icon: 'i-qy'
        },
        {
          title: '会员卡如何使用',
          content: vip.how_to_use,
          icon: 'i-sysm'
        },
        {
          title: '服务热线',
          content: vip.service_call,
          icon: 'i-fwrx'
        }
      ]
    })
  }

  render() {
    const {helpers} = this.state
    return <VipHelp
      helpers={helpers}
    />
  }
}