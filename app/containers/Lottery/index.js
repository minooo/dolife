import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {getConfig} from 'actions/lottery';
import Loading from 'components/Loading';
import {setTitle} from 'utils';

@connect(state => ({
  config: state.config,
  lottery: state.lottery,
}), {
  getConfig
})
export default class extends PureComponent {
  componentDidMount() {
    const {config, getConfig} = this.props
    setTitle(config.siteConfig.sitename + '-抽奖')
    getConfig()
  }

  render() {
    const {lottery, children} = this.props
    if (lottery.config.isFetched) {
      return children
    }
    return <Loading inline/>
  }
}