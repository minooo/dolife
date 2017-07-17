import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import {getWeal} from 'actions/user';
import {setTitle, getApi, callApi} from "utils";
import {Toast} from 'antd-mobile';
import UserRedpacketHome from 'components/User/Redpacket/Home';

@connect(state => ({
  config: state.config,
  user: state.user
}), {
  getWeal
})
export default class extends PureComponent {
  state = {
    tabIndex: 0,
    redpacket: {
      isFetching: false,
      isMore: true,
      filter: {
        limit: 10,
        status: 0
      },
      redpackets: []
    },
    cash_redpacket: {
      isFetching: false,
      isMore: true,
      filter: {
        limit: 10
      },
      redpackets: []
    }
  }

  componentDidMount() {
    const {config, getWeal} = this.props
    setTitle(config.siteConfig.sitename)
    getWeal()
  }

  onSwitchTab = (tabIndex) => {
    this.setState({
      tabIndex
    })
  }
  onSwitchStatus = (status) => {
    this.setState(state => ({
      redpacket: Object.assign({}, state.redpacket, {
        isMore: true,
        redpackets: [],
        filter: Object.assign({}, state.redpacket.filter, {
          status
        })
      })
    }))
  }
  fetchRedpackets = () => {
    if (!this.state.redpacket.isMore || this.state.redpacket.isFetching) {
      return
    }
    this.setState(state => ({
      redpacket: Object.assign({}, state.redpacket, {
        isFetching: true,
      })
    }), () => {
      getApi(`/user/redpacket`, Object.assign({}, this.state.redpacket.filter, {
        offset: this.state.redpacket.redpackets.length
      })).then(response => {
        this.setState(state => ({
          redpacket: Object.assign({}, state.redpacket, {
            isFetching: false,
            isMore: (response.redpackets || []).length >= state.redpacket.filter.limit,
            redpackets: state.redpacket.redpackets.concat(response.redpackets || [])
          })
        }))
      })
    })
  }
  fetchCashedpackets = () => {
    if (!this.state.cash_redpacket.isMore || this.state.cash_redpacket.isFetching) {
      return
    }
    this.setState(state => ({
      cash_redpacket: Object.assign({}, state.cash_redpacket, {
        isFetching: true,
      })
    }), () => {
      getApi(`/user/cash_redpacket`, Object.assign({}, this.state.cash_redpacket.filter, {
        offset: this.state.cash_redpacket.redpackets.length
      })).then(response => {
        this.setState(state => ({
          cash_redpacket: Object.assign({}, state.cash_redpacket, {
            isFetching: false,
            isMore: (response.redpackets || []).length >= state.cash_redpacket.filter.limit,
            redpackets: state.cash_redpacket.redpackets.concat(response.redpackets || [])
          })
        }))
      })
    })
  }
  onDelete = (redpacket) => {
    confirm('确认删除？') && callApi(`/user/redpacket/${redpacket.id}`, {}, 'DELETE').then(response => {
      if (response.code == 'SUCCESS') {
        this.setState(state => ({
          redpacket: Object.assign({}, state.redpacket, {
            redpackets: state.redpacket.redpackets.filter((n) => {
              return n.id != redpacket.id
            })
          })
        }))
      } else {
        response.msg && Toast.fail(response.msg)
      }
    })
  }

  render() {
    const {user} = this.props
    const {tabIndex, redpacket, cash_redpacket} = this.state
    return <UserRedpacketHome
      user={user}
      tabIndex={tabIndex}
      onSwitchTab={this.onSwitchTab}
      onSwitchStatus={this.onSwitchStatus}
      redpacket={redpacket}
      cash_redpacket={cash_redpacket}
      fetchRedpackets={this.fetchRedpackets}
      fetchCashedpackets={this.fetchCashedpackets}
      onDelete={this.onDelete}
    />
  }
}