import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import Header from 'components/Header';
import List from 'components/List';
import {setTitle, getApi} from "utils";

@connect(state => ({
  config: state.config
}))
export default class extends PureComponent {
  state = {
    finance: {
      financeLogs: [],
      isFetching: false,
      isMore: true,
      filter: {
        limit: 10
      }
    }
  }

  componentDidMount() {
    const {config} = this.props
    setTitle(config.siteConfig.sitename)
  }

  fetchFinanceLogs = (e) => {
    if (!this.state.finance.isMore || this.state.finance.isFetching) {
      return
    }
    this.setState(state => ({
      finance: Object.assign({}, state.finance, {
        isFetching: true,
      })
    }), () => {
      getApi(`/user/money/log`, Object.assign({}, this.state.finance.filter, {
        offset: this.state.finance.financeLogs.length
      })).then(response => {
        this.setState(state => ({
          finance: Object.assign({}, state.finance, {
            isFetching: false,
            isMore: (response.money_logs || []).length >= state.finance.filter.limit,
            financeLogs: state.finance.financeLogs.concat(response.money_logs || [])
          })
        }))
      })
    })
  }

  render() {
    const {finance} = this.state
    return <div>
      <Header title="余额明细"/>
      <List
        isFetching={finance.isFetching}
        isMore={finance.isMore}
        dataSet={finance.financeLogs}
        onEndReached={this.fetchFinanceLogs}
        renderRow={rowData => <div className="bg-white border-t pd30">
          <div className="flex-wrp size32 color3">
            <div className="flex-item w0 nowrap">{rowData.title}</div>
            <div>{rowData.money > 0 && '+'}{rowData.money}</div>
          </div>
          <div className="flex-wrp flex-between size28 color14 pt20">
            <div>余额：{rowData.after_money}</div>
            <div>{rowData.time_create}</div>
          </div>
        </div>}
      />
    </div>
  }
}