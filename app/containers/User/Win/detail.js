import React, {PureComponent} from "react";
import {connect} from "react-redux";
import Header from "components/Header";
import {List} from 'antd-mobile';
import Link from 'components/Link';
import {getApi, setTitle} from "utils";

const Lists = ({order, fetchOrders}) => <List
  isFetching={order.isFetching}
  isMore={order.isMore}
  dataSet={order.orders}
  onEndReached={fetchOrders}
  renderRow={(rowData) => <Link to={{pathname: ''}}/>}
/>

@connect(state => ({
  config: state.config
}))
export default class extends PureComponent {
  state = {
    data: null
  }

  componentDidMount() {
    const {config, location, router} = this.props;
    location.state && location.state.data ? this.setState({data: location.state.data}) : router.push({pathname: '/Win'});
    setTitle(`${config.siteConfig.sitename}-我的中奖详情`);
    console.log(this.props)
  }

  render() {
    const {data} = this.state;
    if (!data) return null;
    return <div>
      <Header title="中奖详情"/>
      <List className="mt20">
        <List.Item>
          奖品名称
          <List.Item.Brief>{data.title}</List.Item.Brief>
        </List.Item>
      </List>

      <List className="mt20">
        <List.Item>
          核销码
          <List.Item.Brief>{data.code}</List.Item.Brief>
        </List.Item>
      </List>

      <List className="mt20">
        <List.Item>
          核销方
          <List.Item.Brief>{data.applyTo}</List.Item.Brief>
        </List.Item>
      </List>

      <List className="mt20">
        <List.Item>
          中奖状态
          <List.Item.Brief>{data.status === '2' ? '待核销' : '已核销'}</List.Item.Brief>
        </List.Item>
      </List>

      <List className="mt20">
        <List.Item>
          {data.status === '2' ? '领取时间' : '核销时间'}
          <List.Item.Brief>{data.datetime}</List.Item.Brief>
        </List.Item>
      </List>
    </div>
  }
}
