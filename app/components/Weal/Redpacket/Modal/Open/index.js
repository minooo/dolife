import React, {PureComponent} from 'react';
import Link from 'components/Link';
import p from 'assets/images/s.gif';
import {timeValue} from 'utils';
import s from './style.scss';

export default class extends PureComponent {
  state = {}
  timer = false

  componentDidMount() {
    this.setContent()
    this.timer = setInterval(this.setContent, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  setContent = () => {
    const {redpacket, onGet} = this.props
    if (moment().isBefore(redpacket.start_time)) {
      return this.setState({
        content: <div className="color20 size36">距红包开抢{timeValue(moment(redpacket.start_time)).join(':')}</div>
      })
    }
    if (parseInt(redpacket.send_num) >= parseInt(redpacket.total_num)) {
      return this.setState({
        content: <div className="color20 size36">出手慢了，红包已被抢完。</div>
      })
    }
    return this.setState({
      content: <div className={`border-radius mt30 flex-wrp flex-center img-150 ${s.circle}`}>
        <div onClick={e => onGet(redpacket)}
             className={`flex-wrp flex-center border-radius bg-deepyellow size80 color21 img-120 ${redpacket.isOpening ? s.rotate : ''}`}>
          抢
        </div>
      </div>
    })
  }
  renderFooter = () => {
    const {redpacket} = this.props
    if (moment().isBefore(redpacket.start_time)) {
      return <Link href={{pathname: `/shop_${redpacket.shop.id}`}} className="size24 color20">先去土豪店逛逛</Link>
    }
    if (parseInt(redpacket.send_num) >= parseInt(redpacket.total_num)) {
      return <Link href={{pathname: `/weal_redpacket_${redpacket.id}`}} className="color20 size24">查看领取记录&gt;</Link>
    }
  }

  render() {
    const {redpacket, onClose} = this.props
    const {content} = this.state
    return <div className="mask flex-wrp flex-center">
      <div className={`border-radius10 relative overflow-hidden flex-wrp flex-cell ${s.box}`}>
        <div className="flex-wrp flex-center flex-cell relative pt50" style={{flex: 4}}>
          <img src={p} className="bg-cover border-radius img-150"
               style={{backgroundImage: `url(${redpacket.shop.thumb})`}}/>
          <div className="color20 pt40 size30">{redpacket.shop.title}送的现金红包</div>
        </div>
        <div className="flex-wrp flex-middle relative pt50" style={{flex: 4}}>
          {content}
        </div>
        <div className="flex-wrp flex-center relative" style={{flex: 2}}>
          {this.renderFooter()}
        </div>
        <div className='pd20 close' onClick={onClose}>
          <i className="i-close color32 size40"/>
        </div>
      </div>
    </div>
  }
}