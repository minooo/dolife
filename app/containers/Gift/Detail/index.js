import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {setTitle, getApi, wx, postApi} from 'utils';
import {Modal, Toast} from 'antd-mobile';
import GiftDetail from 'components/Gift/Detail';
import Loading from 'components/Loading';
import ResultFail from 'components/Result/Fail';
import {sign, increaseCredit} from 'actions/user';

@connect(state => ({
  config: state.config,
  user: state.user
}), {
  sign,
  increaseCredit
})
export default class extends PureComponent {
  state = {
    gift: false,
    isFetching: false
  }

  componentDidMount() {
    const {params, config} = this.props
    getApi(`/gift/${params.id}`).then(response => {
      const {gift} = response
      this.setState({
        gift: gift,
        isFetching: true
      })
      if (gift) {
        setTitle(gift.title)
        wx.setShare({
          title: gift.title,
          imgUrl: gift.thumb,
          desc: `关注订阅【${config.siteConfig.sitename}】尊享全城特惠`
        })
      }
    })
  }

  postBuy = () => {
    const {user, increaseCredit} = this.props
    const {gift} = this.state
    return new Promise((resolive, reject) => {
      Modal.alert('', <div className="color4 lh150 ptb30">
        <div className="pt30">您确定要使用{user.is_vip && gift.vip_info ? gift.vip_info.fee : gift.fee}积分</div>
        <div>兑换{gift.title}么？</div>
      </div>, [
        {
          text: '取消',
          onPress: reject
        },
        {
          text: '确定',
          onPress: () => {
            postApi(`/gift/${gift.id}/buy`).then(response => {
              if (response.code == 'SUCCESS') {
                increaseCredit(response.credit)
                resolive(response)
              } else {
                reject(response)
              }
            })
          },
          style: {
            color: '#ff9501'
          }
        }
      ])
    })
  }
  onBuy = () => {
    const {router} = this.props
    this.postBuy().then(response => {
      Modal.alert('兑换成功', <div className="lh150">
        <div className="color4">可在"兑换记录"中查看</div>
      </div>, [
        {
          text: '取消',
          onPress: false
        },
        {
          text: '查看',
          onPress: () => {
            router.push({
              pathname: `/user_gifts`
            })
          },
          style: {
            color: '#ff9501'
          }
        }
      ])
    }, err => {
      err.msg && Toast.fail(err.msg)
    })
  }
  onSign = () => {
    const {sign} = this.props
    sign()
  }

  render() {
    const {user} = this.props
    const {gift, isFetching} = this.state
    if (!isFetching) {
      return <Loading inline/>
    }
    if (!gift) {
      return <ResultFail
        title="商品不存在"
        message="商品不存在或已下架"
      />
    }
    return <GiftDetail
      gift={gift}
      onBuy={this.onBuy}
      user={user}
      onSign={this.onSign}
    />
  }
}