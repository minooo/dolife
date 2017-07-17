import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import {setTitle, getApi} from "utils";
import Header from 'components/Header';
import Loading from 'components/Loading';
import ResultFail from 'components/Result/Fail';
import UserFavorite from 'components/User/Favorite';

@connect(state => ({
  config: state.config
}))
export default class extends PureComponent {
  state = {
    sections: [],
    isFetched: false
  }

  componentDidMount() {
    const {config} = this.props
    setTitle(config.siteConfig.sitename)
    this.fetchFavorites()
  }

  fetchFavorites = () => {
    getApi('/user/favorite').then(response => {
      this.setState({
        sections: response.sections || [],
        isFetched: true
      })
    })
  }

  render() {
    const {sections, isFetched} = this.state
    if (!isFetched) {
      return <Loading inline/>
    }
    return <div>
      <Header title="我的收藏"/>
      {sections.length > 0 && <UserFavorite
        sections={sections}
      />}
      {sections.length == 0 && <div className="text-center size28 ptb30 color4">您还没有收藏商品</div>}
    </div>
  }
}