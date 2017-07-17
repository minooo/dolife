import React, {PureComponent} from 'react';
import Link from 'components/Link';
import moment from 'moment';
import {timeValue} from 'utils';
import p from 'assets/images/s.gif';

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
      return <div className="plr30"><i className="i-yqg color4 size82"/></div>
    }
    if (moment().isBefore(buying.time_start)) {
      return <div className="flex-wrp flex-cell flex-center">
        <div className="color6 size26">距开抢时间</div>
        <div className="pt10 flex-wrp">{timeValue(moment(buying.time_start)).map((n, i) => <div
          className={`bg-black ptb5 plr10 color10 size24 border-radius5`} key={i}>{n}</div>).map((n, i) => <div
          className="flex-wrp" key={i}>{i > 0 && <div className="plr5">:</div>}{n}</div>)}</div>
      </div>
    }
    if (moment().isBefore(buying.time_end)) {
      return <div className="ptb15 plr25 color18 size32 border-radius10 bg-yellow">
        <div className="ptb10 plr20">正在抢购</div>
      </div>
    }
    if (moment().isAfter(buying.time_end)) {
      return <div className="ptb20 plr30 color3 size28 border-radius10 bg-gray">
        <div className="ptb10 plr20">已结束</div>
      </div>
    }
  }

  render() {
    const {buying} = this.props
    const {actionBtn} = this.state
    return <Link href={{pathname: `/buying_${buying.id}`}} className="bg-white flex-wrp flex-cell mt20">
      <div className="flex-wrp border-b ptb30">
        <div className="flex-wrp flex-center flex-cell pl20 mr30">
          {buying.vip_info && <div className="flex-wrp flex-end">
            <div className="flex-wrp flex-align-center mt10">
              <div className={`size22 color10 bg-deepyellow ptb5 plr10 border-radius5`}>VIP</div>
              <div className="pl5 color17 size40">￥{buying.vip_info.fee}</div>
            </div>
          </div>}
        </div>
        <div className="plr30 pt5">
          <div className=" size28 color16">{buying.title}</div>
          <div className="flex-wrp plr10 color4 size24 pt25">
            <div className="del pt5 pr20">￥{buying.price}</div>
            <div className="pt5 color3 pb5">{buying.stock > 0 ? `剩余${buying.stock}份` : '抢完了'}</div>
          </div>
        </div>
      </div>
    </Link>
  }
}