import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {MODULE} from 'app/constants';
import {setTitle, getApi, wx, callApi} from 'utils';
import {notAnyTipsFollow} from 'actions/config';
import BuyingDetail from 'components/Buying/Detail';
import Loading from 'components/Loading';
import ResultFail from 'components/Result/Fail';
import FollowTips from 'components/FollowTips';
import {FAVORITE} from 'app/constants';

@connect(state => ({
  config: state.config,
  user: state.user
}), {
  notAnyTipsFollow
})
export default class extends PureComponent {
  state = {
    buying: false,
    isFetching: false
  }

  componentDidMount() {
    const {params, config} = this.props
    setTitle(config.siteConfig.sitename)
    getApi(`/buying/${params.id}`, {user_limit: 7}).then(response => {
      const {buying} = response
      this.setState({
        buying: buying,
        isFetching: true
      }, () => {
        if (buying) {

          wx.setShare({
            title: buying.title,
            imgUrl: buying.thumb,
            desc: `关注订阅【${config.siteConfig.sitename}】尊享全城特惠`
          })
          getApi(`/comment`, {
            module_id: MODULE.BUYING,
            shop_id: buying.shop.id,
            target_id: buying.id,
            limit: 5
          }).then(response => {
            this.setState(state => ({
              buying: Object.assign({}, state.buying, {
                comments: response.comments || []
              })
            }))
          })
        }
      })
    }, err => {
      this.setState({
        isFetching: false,
        buying: false
      })
    })
  }

  toggleFavor = () => {
    this.setState(state => {
      callApi(`/user/favorite/switch`, {
        type: FAVORITE.BUYING, target_id: state.buying.id
      }, 'PUT')
      return {
        buying: Object.assign({}, state.buying, {
          isfavor: !state.buying.isfavor
        })
      }
    })
  }
  onShowPhotos = () => {
    const {buying} = this.state
    wx.previewImage(buying.thumb, [buying.thumb].concat(buying.show_img || []))
  }
  onNotAnyTips = () => {
    const {notAnyTipsFollow} = this.props
    notAnyTipsFollow()
  }

  render() {
    const {buying, isFetching} = this.state
    if (!isFetching) {
      return <Loading inline/>
    }
    if (!buying) {
      return <ResultFail
        title="抢购活动不存在"
        message="抢购活动不存在或已下架"
      />
    }
    const {config, user} = this.props
    return <div className="flex-wrp flex-cell">
      {config.siteConfig.remind_follow && <FollowTips
        follow={config.siteConfig.remind_follow}
        onNotAnyTips={this.onNotAnyTips}
      />}
      <BuyingDetail
        buying={buying}
        user={user}
        toggleFavor={this.toggleFavor}
        onShowPhotos={this.onShowPhotos}
      />
    </div>
  }
}