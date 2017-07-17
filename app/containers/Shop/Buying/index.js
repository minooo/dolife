import React, {PureComponent} from "react";
import Header from 'components/Header';
import BuyingList from 'components/Buying/List';
import {getApi} from 'utils';

export default class extends PureComponent {
  state = {
    isFetching: false,
    isMore: true,
    filter: {
      limit: 10
    },
    buyings: []
  }

  componentDidMount() {

  }

  fetchBuyings = () => {
    const {location} = this.props
    if (!this.state.isMore || this.state.isFetching) {
      return
    }
    this.setState(state => ({
      isFetching: true
    }), () => {
      getApi(`/buying`, Object.assign({}, this.state.filter, {
        shop_id: location.query.shop_id,
        offset: this.state.buyings.length
      })).then(response => {
        this.setState(state => ({
          isFetching: false,
          isMore: (response.buyings || []).length >= state.filter.limit,
          buyings: state.buyings.concat(response.buyings || [])
        }))
      })
    })
  }

  render() {
    const {isFetching, isMore, buyings} = this.state
    return <div>
      <Header title="店内抢购"/>
      <BuyingList
        data={{
          isFetching,
          isMore,
          buyings
        }}
        loadHandle={this.fetchBuyings}
      />
    </div>
  }
}