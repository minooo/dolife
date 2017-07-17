import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {setTitle, wx} from 'utils';
import Loading from 'components/Loading';
import ResultFail from 'components/Result/Fail';
import {Toast} from 'antd-mobile';
import {getVip, setInvite} from 'actions/vip';

@connect(state => ({
  config: state.config,
  vip: state.vip
}), {
  getVip,
  setInvite
})
export default class extends PureComponent {
  componentDidMount() {
    const {config, getVip, location, setInvite} = this.props
    location.query.invite_from && setInvite({invite_from: location.query.invite_from})
    location.query.invite_from_id && setInvite({invite_from_id: location.query.invite_from_id})
    setTitle(config.siteConfig.sitename + '-会员中心')
    wx.setShare(config.shareConfig.vip || {})
    getVip()
  }

  render() {
    const {children, vip} = this.props
    if (vip.isFetching || !vip.isFetched) {
      return <Loading inline/>
    }
    if (!vip.isOpen) {
      <ResultFail
        title="会员卡加载失败"
        message="平台暂未开启特权会员功能"
      />
    }
    return children
  }
}