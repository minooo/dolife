import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {setTitle} from 'utils';
@connect(state => ({
  config: state.config
}))
export default class extends PureComponent {
  componentDidMount() {
    const {config} = this.props
    setTitle(config.siteConfig.sitename + '-周边活动')
  }

  render() {
    const {children} = this.props
    return children
  }
}