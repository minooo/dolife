import React, {PureComponent} from "react";
import {connect} from "react-redux";
@connect()
export default class extends PureComponent {
  render() {
    const {children} = this.props
    return children
  }
}