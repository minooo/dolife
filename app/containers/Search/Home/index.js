import React, {PureComponent} from "react";
import BuyingItem from 'components/Buying/List/Item';
import ShopItem from 'components/Shop/List/Item';
import {getApi} from 'utils';

export default class extends PureComponent {
  state = {
    buyings: [],
    shops: []
  }

  componentDidMount() {
    this.fetchResult()
  }

  fetchResult = () => {
    const {location} = this.props
    getApi(`/search`, {
      keyword: location.query.keyword
    }).then(response => {
      this.setState(state => ({
        buyings: response.buyings || [],
        shops: response.shops || []
      }))
    })
  }

  render() {
    const {shops, buyings} = this.state
    return <div>
      {shops && shops.map((n, i) => <ShopItem
        shop={n}
      />)}
      {buyings && buyings.map((n, i) => <BuyingItem
        buying={n}
      />)}
    </div>
  }
}