import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import WealRedpacketDetail from 'components/Weal/Redpacket/Detail';
import {getApi} from 'utils';

@connect()
export default class extends PureComponent {
  state = {
    redpacket: false,
    log: {
      isFetching: false,
      isMore: true,
      logs: [],
      filter: {
        limit: 10
      }
    }
  }

  componentDidMount() {
    const {location, params} = this.props
    if (location.state && location.state.redpacket) {
      this.setState({
        redpacket: location.state.redpacket
      })
    } else {
      this.fetchRedpacket(params.id)
    }
  }

  fetchRedpacket = (redpacket_id) => {
    getApi(`/cash_red_packet/${redpacket_id}`).then(response => {
      if (response.code == 'SUCCESS') {
        this.setState({
          redpacket: response.redpacket
        })
      }
    })
  }
  fetchLogs = (e) => {
    if (this.state.log.isFetching || !this.state.log.isMore) {
      return
    }
    return this.setState(state => ({
      log: Object.assign({}, state.log, {
        isFetching: true
      })
    }), () => {
      const {params} = this.props
      return getApi(`/cash_red_packet/${params.id}/log`, Object.assign({}, this.state.log.filter, {
        offset: this.state.log.logs.length
      })).then(response => {
        this.setState(state => ({
          log: Object.assign({}, state.log, {
            isFetching: false,
            isMore: (response.logs || []).length >= state.log.filter.limit,
            logs: state.log.logs.concat(response.logs || [])
          })
        }))
      })
    })
  }

  render() {
    const {router} = this.props
    const {redpacket, log} = this.state
    return <WealRedpacketDetail
      redpacket={redpacket}
      log={log}
      fetchLogs={this.fetchLogs}
      router={router}
    />
  }
}