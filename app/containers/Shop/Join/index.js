import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import Loading from 'components/Loading';
import ShopJoin from'components/Shop/Join';
import {setTitle} from 'utils';
import {getJoinConfig} from 'actions/shop';

@connect(state => ({
  join: state.shop.join
}), {
  getJoinConfig
})
export default class index extends PureComponent {
  componentDidMount() {
    const {getJoinConfig} = this.props
    setTitle(`商家入驻`)
    getJoinConfig()
  }

  render() {
    const {join} = this.props
    if (!join.config.isFetched) {
      return <Loading inline/>
    }
    return <ShopJoin
      config={join.config}
    />
  }
}