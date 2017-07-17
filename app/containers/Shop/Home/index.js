import React, {PureComponent} from "react";
import {connect} from "react-redux";
import ShopHome from 'components/Shop/Home';
import {updateLocation} from 'actions/user';
import {fetchShops, getShops} from 'actions/shop';
import {getFilters} from 'actions/filter';
import {setTitle, wx} from 'utils';

@connect(state => ({
  config: state.config,
  shop: state.shop,
  filter: state.filter,
  user: state.user
}), {
  fetchShops,
  getShops,
  getFilters,
  updateLocation
})
export default class extends PureComponent {
  componentDidMount() {
    const {config, user, getShops, getFilters, updateLocation} = this.props
    wx.setShare(config.shareConfig.shop)
    setTitle(config.siteConfig.sitename + '-热门好店')
    getShops('hot', {
      limit: 10,
      sort: 'hot'
    })
    if (user.request_location) {
      updateLocation().then(() => {
        getFilters('shop')
      })
    } else {
      getFilters('shop')
    }
  }

  loadShops = (e, refresh = false, filter = {}) => {
    const {shop, fetchShops} = this.props
    fetchShops({
      ...filter,
      offset: refresh ? 0 : shop.shops.length,
      isRefreshing: refresh
    })
  }
  onSearch = (keyword) => {
    const {router} = this.props
    router.push({
      pathname: `/search`,
      query: {
        keyword: keyword
      }
    })
  }
  onFilter = (filter) => {
    this.loadShops(null, true, filter)
  }

  render() {
    const {shop, config, filter} = this.props
    return <ShopHome
      config={config}
      shop={shop}
      filter={filter}
      onSearch={this.onSearch}
      onFilter={this.onFilter}
      loadShops={this.loadShops}
    />
  }
}