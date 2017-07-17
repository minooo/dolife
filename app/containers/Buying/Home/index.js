import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import BuyingHome from 'components/Buying/Home';
import {fetchBuyings} from 'actions/buying';
import {setTitle, wx} from 'utils';

@connect((state) => ({
  config: state.config,
  buying: state.buying
}), {
  fetchBuyings
})
export default class extends PureComponent {
  componentDidMount() {
    const {config} = this.props
    wx.setShare(config.shareConfig.buying)
    setTitle(config.siteConfig.sitename + '-大牌抢购')
  }

  loadBuyings = (e, refresh = false, filter = {}) => {
    const {buying, fetchBuyings} = this.props
    fetchBuyings({
      ...filter,
      offset: refresh ? 0 : buying.buyings.length,
      isRefreshing: refresh
    })
  }
  onSwitch = (status) => {
    this.loadBuyings(null, true, {
      typeid: status
    })
  }

  render() {
    const {buying} = this.props
    return <BuyingHome
      buying={buying}
      onSwitch={this.onSwitch}
      loadBuyings={this.loadBuyings}
    />
  }
}