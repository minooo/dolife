import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import {fetchRims, getRims} from 'actions/rim';
import {getCategorys} from 'actions/category';
import RimHome from 'components/Rim/Home';

@connect(state => ({
  rim: state.rim,
  config: state.config,
  category: state.category
}), {
  fetchRims,
  getCategorys
})
export default class extends PureComponent {
  componentDidMount() {
    const {getCategorys} = this.props
    getCategorys('rim')
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
  fetchRims = (e, refresh = false, filter = {}) => {
    const {rim, fetchRims} = this.props
    fetchRims({
      ...filter,
      offset: refresh ? 0 : rim.rims.length,
      isRefreshing: refresh
    })
  }
  onFilter = (key, value) => {
    this.fetchRims(null, true, {
      [key]: value
    })
  }

  render() {
    const {rim, config, category} = this.props
    return <RimHome
      rim={rim}
      config={config}
      category={category.rim}
      fetchRims={this.fetchRims}
      onSearch={this.onSearch}
      onFilter={this.onFilter}
    />
  }
}