import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import Header from 'components/Header';

@connect(state => ({
  vip: state.vip
}))
export default class extends PureComponent {
  render() {
    const {vip} = this.props
    return <div>
      <Header title="微生活VIP协议"/>
      <div className="bg-white color4 size28 lh150 pd30">{vip.agreement}</div>
    </div>
  }
}