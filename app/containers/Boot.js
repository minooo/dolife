import React, {PureComponent} from "react";
import {connect} from "react-redux";
import * as utils from "utils";
import Loading from 'components/Loading';
import {getConfig} from 'actions/config'
@connect(state => ({
  config: state.config
}), {
  getConfig
})
export default class extends PureComponent {
  componentDidMount() {
    const {getConfig} = this.props
    getConfig()
    utils.is_IOS && utils.setWxConfig()
  }

  render() {
    const {config, children} = this.props
    if (config.isFetching || !config.isFetched) {
      return <Loading inline/>
    }
    return children
  }
}