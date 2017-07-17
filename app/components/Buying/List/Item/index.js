import React, {PureComponent} from 'react';
import Link from 'components/Link';
import moment from 'moment';
import {timeValue} from 'utils';
import p from 'assets/images/s.gif';
import s from './style.scss'

export default class extends PureComponent {
  state = {
    actionBtn: <div/>
  }
  timer = false

  componentDidMount() {
    this.setState({
      actionBtn: this.actionBtn()
    })
    this.timer = setInterval(() => {
      this.setState({
        actionBtn: this.actionBtn()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  actionBtn = () => {
    const {buying} = this.props
    if (buying.stock <= 0) {
      return <div className="ptb20 plr20 color4 size26 border-radius5 bg-gray">
        已抢光
      </div>
    }
    if (moment().isBefore(buying.time_start)) {
      return <div className="ptb20 plr20 color10 size26 border-radius5 bg-deeporange">
        待抢购
      </div>
    }
    if (moment().isBefore(buying.time_end)) {
      return <div className="ptb20 plr20 color10 size26 border-radius5 bg-deeporange">
        正在抢购
      </div>
    }
    if (moment().isAfter(buying.time_end)) {
      return <div className="ptb20 plr20 color3 size28 border-radius5 bg-gray">
        已结束
      </div>
    }
  }

  render() {
    const {buying} = this.props
    const {actionBtn} = this.state
    return <Link href={{pathname: `/buying_${buying.id}`}} className="block bg-white pb20 mb20">
      <div className={`${s.head}`}>
        <img src={p} className="bg-cover w100"
             style={{backgroundImage: `url(${buying.thumb})`, height: '43vw'}}/>
        <div className={`flex-wrp pb20 plr20 flex-between ${s.bg}`}>
          <div className="flex-wrp">
            {moment().isBefore(buying.time_end) && moment().isAfter(buying.time_start) &&
            <div className={`flex-wrp flex-align-center`}>
              <div className="color10 size26 pr10">距结束</div>
              <div className="flex-wrp">{timeValue(moment(buying.time_end)).map((n, i) => <span
                className={`color10 size26 `} key={i}>{n}</span>).map((n, i) => <span key={i}>{i > 0 &&
              <span className="plr5 color10">:</span>}{n}</span>)}
              </div>
            </div>}
            {moment().isBefore(buying.time_start) && <div className={`flex-wrp flex-align-center`}>
              <div className="color10 size26 pr10">距开抢</div>
              <div className="flex-wrp">{timeValue(moment(buying.time_start)).map((n, i) => <span
                className={`color10 size26 `} key={i}>{n}</span>).map((n, i) => <span key={i}>{i > 0 &&
              <span className="plr5 color10">:</span>}{n}</span>)}</div>
            </div>}
          </div>
          <div className="flex-wrp flex-align-center">
            <i className="i i-hot color7 plr10 size20 pl25"/>
            <span className="size24 color10">{buying.views}人在关注</span>
          </div>
        </div>
        <div className={`flex-wrp flex-center ptb10 color10 size24 ${s.stock}`}>
          <span>剩余{buying.stock}份</span>
        </div>
      </div>
      <div className="pd20 size30 color6 lh150">{buying.title}</div>
      <div className="flex-wrp plr20 flex-align-center">
        <div className="flex-wrp flex-item">
          <div className="flex-wrp flex-align-center">
            <div className="size40 color23">￥</div>
            <div className="size40 color23" style={{lineHeight: '90%'}}>{buying.fee}</div>
          </div>
          <div className="flex-wrp plr30 color3 size26 flex-align-center">
            <div className="del pt5">￥{buying.price}</div>
          </div>
          {buying.vip_info && <div className="flex-wrp flex-align-center">
            <div className={`size22 color10 bg-deeporange ptb5 plr10 border-radius5 ${s.fw}`}>VIP</div>
            <div className="color25 size36 pl10"> ￥{buying.vip_info.fee}</div>
          </div>}
        </div>
        <div className="pl20 flex-wrp flex-align-center flex-bottom">
          {actionBtn}
        </div>
      </div>
    </Link>
  }
}