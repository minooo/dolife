import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import UserHome from 'components/User/Home';
import {setTitle} from "utils";
import {sign} from 'actions/user';

@connect(state => ({
  config: state.config,
  user: state.user
}), {
  sign
})
export default class extends PureComponent {
  componentDidMount() {
    const {config} = this.props
    setTitle(`${config.siteConfig.sitename}-个人中心`)
  }

  onSign = () => {
    const {sign} = this.props
    sign()
  }

  render() {
    const {user} = this.props
    return <UserHome
      user={user}
      onSign={this.onSign}
    />
  }
}