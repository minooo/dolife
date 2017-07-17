import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import Header from 'components/Header';
import List from 'components/List';
import {setTitle, date_obj, getApi} from "utils";

@connect(state => ({
  config: state.config
}))
export default class extends PureComponent {
  state = {
    credit: {
      creditLogs: [],
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

  fetchCreditLogs = (e) => {
    if (!this.state.credit.isMore || this.state.credit.isFetching) {
      return
    }
    this.setState(state => ({
      credit: Object.assign({}, state.credit, {
        isFetching: true,
      })
    }), () => {
      getApi(`/user/credit`, Object.assign({}, this.state.credit.filter, {
        offset: this.state.credit.creditLogs.length
      })).then(response => {
        this.setState(state => ({
          credit: Object.assign({}, state.credit, {
            isFetching: false,
            isMore: (response.credit_logs || []).length >= state.credit.filter.limit,
            creditLogs: state.credit.creditLogs.concat(response.credit_logs || [])
          })
        }))
      })
    })
  }

  render() {
    const {credit} = this.state
    return <div>
      <Header title="积分明细"/>
      <List
        isFetching={credit.isFetching}
        isMore={credit.isMore}
        dataSet={credit.creditLogs}
        onEndReached={this.fetchCreditLogs}
        renderRow={rowData => <div className="bg-white border-t pd30 flex-wrp flex-align-center">
          <div className="flex-item">
            <div className="size32 color3 w100 nowrap">{rowData.title}</div>
            <div
              className="size24 color14 pt20">{date_obj(rowData.time_create).first_time} {date_obj(rowData.time_create).secend_time}</div>
          </div>
          <div className="size46 color7">
            {rowData.credit > 0 && '+'}{rowData.credit}
          </div>
        </div>}
      />
    </div>
  }
}