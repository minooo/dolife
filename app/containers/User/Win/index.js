import React, {PureComponent} from "react";
import {connect} from "react-redux";
import Header from "components/Header";
import List from "components/List";
import Link from 'components/Link';
import {getApi, setTitle} from "utils";

const Lists = ({order, fetchOrders}) => <List
  isFetching={order.isFetching}
  isMore={order.isMore}
  dataSet={order.orders}
  onEndReached={fetchOrders}
  renderRow={(rowData) => <Link className="flex-wrp bg-white mt20 pd20"
                                href={{pathname: '/user_win_detail', state: {data: rowData}}}>
    <img src={rowData.image} className="block mr20" style={{width: '1.6rem', height: '1.2rem'}} alt=""/>
    <div className="flex-item flex-wrp flex-cell flex-middle">
      <div className="flex-wrp flex-between mb20 size32">
        <div className="text-nowrap">{rowData.title}</div>
        <div className="color0 equal-no size26">{rowData.status === '2' ? '待核销' : '已核销'}</div>
      </div>
      <div className="color4 size20">{rowData.datetime}</div>
    </div>
  </Link>}
/>;

@connect(state => ({
  config: state.config
}))
export default class extends PureComponent {
  state = {
    order: {
      isFetching: false,
      isMore: true,
      orders: [],
      filter: {
        limit: 10,
        offset: 0
      }
    }
  }

  fetchOrders = (e) => {
    if (!this.state.order.isMore || this.state.order.isFetching) {
      return
    }
    this.setState(state => ({
      order: Object.assign({}, state.order, {
        isFetching: true,
      })
    }), () => {
      getApi(`/prizes`, Object.assign({}, this.state.order.filter, {
        offset: this.state.order.orders.length
      })).then(response => {
        this.setState(state => ({
          order: Object.assign({}, state.order, {
            isFetching: false,
            isMore: (response.prizes || []).length >= state.order.filter.limit,
            orders: state.order.orders.concat(response.prizes || [])
          })
        }))
      })
    })
  }

  componentDidMount() {
    const {config} = this.props
    setTitle(`${config.siteConfig.sitename}-我的中奖记录`)
  }

  render() {
    const {order} = this.state
    return <div>
      <Header title="中奖纪录"/>
      <Lists order={order} fetchOrders={this.fetchOrders}/>
    </div>
  }
}
