import React, {PureComponent} from "react";
import {setTitle, getApi, wx, callApi} from 'utils';
import {connect} from "react-redux";
import RimDetail from 'components/Rim/Detail';
import ResultFail from 'components/Result/Fail';

@connect(state => ({
  rim: state.rim,
  config: state.config
}))
export default class index extends PureComponent {
  state = {
    rim: false,
    isFetching: true
  }

  componentDidMount() {
    const {config, params} = this.props
    getApi(`/rim/${params.id}`).then(response => {
      const rim = response.rim
      this.setState({
        rim: rim,
        isFetching: false
      })
      if (rim) {
        setTitle(rim.title)
        wx.setShare({
          title: `${rim.title}【${config.siteConfig.sitename}】`,
          imgUrl: rim.thumb,
          desc: `关注订阅【${config.siteConfig.sitename}】尊享全城特惠`
        })
      }
    })
  }

  onBuy = () => {
    const {rim} = this.state
    const {router} = this.props
    router.push({
      pathname: '/order_rim',
      state: {
        rim
      }
    })
  }

  render() {
    const {rim, isFetching} = this.state
    if (isFetching) {
      return <loading />
    }
    if (!rim) {
      return <ResultFail
        title="未找到活动信息"
        message="活动已不存在或已下架"
      />
    }
    return <RimDetail
      rim={rim}
      onBuy={this.onBuy}
    />
  }
}