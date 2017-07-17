import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import VipInvite from 'components/Vip/Invite';
import {getApi} from 'utils';

@connect(state => ({
  user: state.user
}))
export default class extends PureComponent {
  state = {
    tabIndex: 0,
    inviteConfig: {},
    inviteLog: {
      isFetching: false,
      isMore: true,
      logs: [],
      filter: {
        limit: 10
      }
    }
  }

  componentDidMount() {
    this.fetchInviteConfig()
  }

  fetchInviteConfig = () => {
    return getApi(`/user/invite`).then(response => {
      this.setState({
        inviteConfig: response
      })
    })
  }
  fetchInviteLogs = () => {
    if (this.state.inviteLog.isFetching || !this.state.inviteLog.isMore) {
      return
    }
    return this.setState(state => ({
      inviteLog: Object.assign({}, state.inviteLog, {
        isFetching: true
      })
    }), () => {
      return getApi('/user/invite/log', Object.assign({}, this.state.inviteLog.filter, {
        offset: this.state.inviteLog.logs.length
      })).then(response => {
        this.setState(state => ({
          inviteLog: Object.assign({}, state.inviteLog, {
            isFetching: false,
            isMore: (response.logs || []).length > state.inviteLog.filter.limit,
            logs: state.inviteLog.logs.concat(response.logs || []),
            total_bonus: response.total_bonus || state.inviteLog.total_bonus,
            total_user_num: response.total_user_num || state.inviteLog.total_user_num
          })
        }))
      })
    })
  }
  onSwitchTab = (tabIndex) => {
    this.setState({
      tabIndex
    })
  }

  render() {
    const {tabIndex, inviteLog, inviteConfig} = this.state
    return <VipInvite
      tabIndex={tabIndex}
      inviteConfig={inviteConfig}
      inviteLog={inviteLog}
      onSwitchTab={this.onSwitchTab}
      fetchInviteLogs={this.fetchInviteLogs}
    />
  }
}