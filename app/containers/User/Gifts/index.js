import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import moment from 'moment';
import Header from 'components/Header';
import List from 'components/List';
import {setTitle, getApi} from "utils";

@connect(state => ({
  config: state.config
}))
export default class extends PureComponent {
  state = {
    gifts: [],
    isFetching: false,
    isMore: true
  }

  componentDidMount() {
    const {config} = this.props
    setTitle(config.siteConfig.sitename)
  }

  fetchGifts = (e) => {
    if (this.state.isFetching || !this.state.isMore) {
      return
    }
    this.setState({
      isFetching: true
    }, () => {
      getApi(`/user/gift`, {
        offset: this.state.gifts.length,
        limit: 10
      }).then(resposne => {
        this.setState({
          gifts: this.state.gifts.concat(resposne.gifts || []),
          isFetching: false,
          isMore: (resposne.gifts || []).length >= 10
        })
      })
    })
  }

  render() {
    const {gifts, isFetching, isMore} = this.state
    return <div>
      <Header title="兑换记录"/>
      <List
        isFetching={isFetching}
        isMore={isMore}
        dataSet={gifts}
        onEndReached={this.fetchGifts}
        renderRow={gift_log => <div className="bg-white border-t pd30">
          <div className="flex-wrp flex-align-center">
            <div className="flex-item w0 nowrap color6 size32">{gift_log.title}</div>
            <div><i className="i i-jf size22 color4"/></div>
            <div className="color7 pl10">{gift_log.fee}</div>
          </div>
          <div className="flex-wrp lh150 pt10 size26">
            <div className="flex-cell color4">
              <div className="flex-wrp flex-between">
                <div>券</div>
                <div>码</div>
              </div>
              <div className="flex-wrp flex-between">
                <div>兑</div>
                <div>换</div>
                <div>时</div>
                <div>间</div>
              </div>
            </div>
            <div className="flex-cell">
              <div>：{gift_log.code}</div>
              <div>：{moment(gift_log.time_create).format('YYYY-MM-DD H:mm')}</div>
            </div>
          </div>
        </div>}
      />
    </div>
  }
}