import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {wx} from 'utils';

@connect(state => ({
  user: state.user
}))
export default class extends PureComponent {
  componentDidMount() {
    const {user} = this.props
    wx.setShare({
      title: user.nickname,
      imgUrl: user.avatar,
      link: `${location.protocol}//${location.host}/user`
    })
  }

  render() {
    const {children} = this.props
    return children
  }
}