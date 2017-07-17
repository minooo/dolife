import React, {PureComponent} from 'react'
import Header from 'components/Header';
import GiftList from 'components/Gift/List';
import Filter from 'components/Filter';
import {connect} from 'react-redux';
import {getFilters} from 'actions/filter';
import {fetchGifts} from 'actions/gift';
import {setTitle, wx} from 'utils';

@connect((state) => ({
  config: state.config,
  user: state.user,
  gift: state.gift,
  filter: state.filter
}), {
  fetchGifts,
  getFilters
})
export default class extends PureComponent {
  componentDidMount() {
    const {config, getFilters} = this.props
    wx.setShare(config.shareConfig.gift)
    setTitle(config.siteConfig.sitename + '-积分商城')
    getFilters('gift')
  }

  loadGifts = (e, refresh = false, filter = {}) => {
    const {gift, fetchGifts} = this.props
    fetchGifts({
      ...filter,
      offset: refresh ? 0 : gift.gifts.length,
      isRefreshing: refresh
    })
  }
  onFilter = (filter) => {
    this.loadGifts(null, true, filter)
  }

  render() {
    const {gift, filter} = this.props
    return <div>
      <Header title="所有商品" className="border-b bg-white"/>
      {filter.gift && filter.gift.filters && filter.gift.filters.length > 0 &&
      <Filter filter={gift.filter} filters={filter.gift.filters} onFilter={this.onFilter}/>}
      <GiftList
        data={gift}
        loadHandle={this.loadGifts}
      />
    </div>
  }
}