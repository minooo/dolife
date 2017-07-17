import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import GiftHome from 'components/Gift/Home';
import {fetchGifts} from 'actions/gift';
import {sign} from 'actions/user';
import {setTitle, wx, getApi} from 'utils';

@connect((state) => ({
  config: state.config,
  user: state.user
}), {
  fetchGifts,
  sign
})
export default class extends PureComponent {
  state = {
    gifts: [],
    record: [],
    vip_gifts: []
  }

  componentDidMount() {
    const {config} = this.props
    wx.setShare(config.shareConfig.gift)
    setTitle(config.siteConfig.sitename + '-积分商城')
    this.fetchGifts()
    this.fetchRecord()
    this.fetchVipGifts()
  }

  onSign = () => {
    const {sign} = this.props
    sign()
  }
  fetchGifts = () => {
    return getApi(`/gift`, {offset: 0, limit: 4}).then(response => {
      this.setState({
        gifts: response.gifts || []
      })
    })
  }
  fetchRecord = () => {
    return getApi(`/gift/record`, {offset: 0, limit: 4}).then(response => {
      this.setState({
        record: response.record || []
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
    const {user, config} = this.props
    const {gifts, record, vip_gifts} = this.state
    return <GiftHome
      user={user}
      config={config}
      onSign={this.onSign}
      news={record}
      gifts={gifts}
      vip_gifts={vip_gifts}
    />
  }
}