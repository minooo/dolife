import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import Loading from 'components/Loading';
import TabBar from 'components/TabBar';
import {getUser} from 'actions/user'

import "assets/scss/fonts.scss";
import "assets/scss/antd.scss";
import "assets/scss/app.scss";

@connect(state => ({
  user: state.user,
  config: state.config
}), {
  getUser
})
export default class extends PureComponent {
  componentDidMount() {
    const {getUser} = this.props
    getUser()
  }

  render() {
    const {config, user, children, location} = this.props
    if (user.isFetching || !user.isFetched) {
      return <Loading inline/>
    }
    if (user.auth == -1) {
      window.location.href = user.authUrl + '&backurl=' + encodeURIComponent(window.location.href)
    }
    if (user.auth == 1) {
      return <div>
        {children}
        {config.navs.find((n) => n.link == location.pathname) && <TabBar navs={config.navs}/>}
      </div>
    }
    return <Loading inline/>
  }
}