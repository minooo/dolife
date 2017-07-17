import React, {PureComponent} from 'react';
import Header from './Header';
import Link from'components/Link'
import CommentListItem from'components/Comment/List/Item'
import {timeValue, wx} from 'utils';
import p from 'assets/images/s.gif';

export default class extends PureComponent {
  state = {
    timeState: <div/>
  }
  timer = false

  componentDidMount() {
    this.setState({
      timeState: this.timeState()
    })
    this.timer = setInterval(() => {
      this.setState({
        timeState: this.timeState()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  timeState = () => {
    const {buying} = this.props
    if (buying.stock <= 0) {
      return <div className="plr30"><i className="i-yqg color4 size82"/></div>
    }
    if (moment().isBefore(buying.time_start)) {
      return <div className="flex-wrp">
        <div className="color6 size30">距开抢</div>
        <div className="flex-wrp">{timeValue(moment(buying.time_start)).map((n, i) => <div
          className={`color6 size30`} key={i}>{n}</div>).map((n, i) =>
          <div className="flex-wrp flex-align-center" key={i}>{i > 0 &&
          <div className="plr5">:</div>}{n}</div>)}</div>
      </div>
    }
    if (moment().isBefore(buying.time_end)) {
      return <div className="flex-wrp">
        <div className="color6 size30">距结束</div>
        <div className="flex-wrp">{timeValue(moment(buying.time_end)).map((n, i) => <div
          className={`color6 size30`} key={i}>{n}</div>).map((n, i) =>
          <div className="flex-wrp flex-align-center" key={i}>{i > 0 &&
          <div className="plr5">:</div>}{n}</div>)}</div>
      </div>
    }
    if (moment().isAfter(buying.time_end)) {
      return <div className="plr30 color3 size28">
        <div className="ptb10 plr20">已结束</div>
      </div>
    }
  }

  render() {
    const {buying, user, toggleFavor, onShowPhotos} = this.props
    const {timeState} = this.state
    return <div>
      <Header buying={buying} toggleFavor={toggleFavor} onShowPhotos={onShowPhotos}/>
      {buying.tags && buying.tags.length > 0 &&
      <div className="flex-wrp flex-flow-row bg-white clear plr30 ptb10 size28 color4">
        {buying.tags.map((n, i) => <div className="flex-wrp flex-align-center pr30 pt10 size24" key={i}>
          <i className="i i-tag color0 size26 pr10"/>
          {n}
        </div>)}
      </div>}
      <div className="bg-white flex-wrp flex-between flex-align-center ptb20 plr25 border-b">
        <div className="flex-wrp flex-align-center">
          <div className="size40 color23">￥{buying.fee}</div>
          <div className="del color3 pl20">￥{buying.price}</div>
        </div>
        {timeState}
      </div>
      <div className="bg-white flex-wrp flex-between flex-align-center ptb20 plr30 flex-between">
        <div className="color23 size30">剩余{buying.stock}份</div>
        {buying.vip_info && user.is_vip &&
        <div className="color23 size30">VIP专享<span className="size32">￥{buying.vip_info.fee}</span></div>}
        {buying.vip_info && !user.is_vip &&
        <Link href={{pathname: `/vip`}} className="color23 size30">立即开通VIP专享<span
          className="size32">￥{buying.vip_info.fee}</span> > </Link>}

      </div>
      {buying.time_expiry &&
      <div className="bg-white flex-wrp size28 color4 flex-between flex-align-center plr30 pt25 pb20 border-t">
        <div>此商品有效期至</div>
        <div>{buying.time_expiry}</div>
      </div>}
      {buying.buy_users && buying.buy_users.length > 0 &&
      <div className="bg-white flex-wrp border-t ptb20 plr30 flex-align-center">
        <div className="flex-item flex-wrp">
          {buying.buy_users.map((n, i) => <div className="pr10 flex-wrp flex-align-center" key={i}>
            <img src={p} className="img-60 bg-cover border-radius border "
                 style={{backgroundImage: `url(${n.avatar})`}}/>
          </div>)}
        </div>
        <div className="size24 color4">已有{buying.sold}人购买</div>
      </div>}
      {buying.shop && <div className="size28 color16 ptb25 plr30">适用门店</div>}
      {buying.shop && <div className="bg-white border-t border-b pl30">
        <div className="flex-wrp flex-align-center">
          <div className="flex-item flex-wrp ptb20" onClick={e => wx.openLocation({
            lat: buying.shop.lat,
            lng: buying.shop.lng
          })}>
            <div className="pr30">
              <i className="i i-map color4 size32"/>
            </div>
            <div className="color4 size28">{buying.shop.address}</div>
          </div>
          <div className="border-l">
            <Link href={`tel:${buying.shop.tel}`} className="block plr50 ptb20">
              <i className="i i-dianhua color0 size52"/>
            </Link>
          </div>
        </div>
        {buying.shops.length > 1 &&
        <Link href={{pathname: `/shop_branch`, query: {shop_id: buying.shop.id}, state: {shops: buying.shops}}}
              className="border-t flex-wrp color4 size28 ptb25">
          <div className="flex-item">查看全部 <span className="color0">{buying.shops.length}</span> 家分店</div>
          <div className="pr30"><i className="i i-right"/></div>
        </Link>}
      </div>}
      {buying.content && <div className="size28 color16 ptb25 plr30">抢购说明</div>}
      {buying.content && <div
        className="bg-white color3 pd30 overflow-hidden my-img size24 line12"
        dangerouslySetInnerHTML={{
          __html: buying.content.replace(/:\s*(\d+\.?\d*)px/g, (a, b) => {
            return `:${b * 0.02}rem`
          })
        }}/>}
      {buying.comments && buying.comments.length > 0 && <div className="border-t">
        <div className="flex-wrp pd30">
          <div className="flex-item color16 size28">评价专区</div>
          <Link href={{pathname: `/shop_comment`, query: {shop_id: buying.shop.id}}}
                className="flex-wrp flex-align-center color4 size28">
            <div>{buying.comment_num}条评价</div>
            <div><i className="i i-right size26"/></div>
          </Link>
        </div>
        {buying.comments.map((n, i) => <CommentListItem comment={n} key={i}/>)}
      </div>}
      {buying.stock > 0 && <div style={{height: '1rem'}}/>}
      {buying.stock > 0 && <Link href={{pathname: `/order_buying`, state: {buying: buying}}}
                                 className="fixed-bottom bg-main ptb30 flex-wrp flex-center color10 size32">
        <div>立即抢购</div>
      </Link>}
    </div>
  }
}