import React, {PureComponent} from 'react';
import Header from 'components/Header';
import bg from 'assets/images/vip_header_bg.png';
import s from './style.scss';
import p from 'assets/images/s.gif';

export default class extends PureComponent {
  render() {
    const {user, vip, tabIndex, priviegies, onSwitchTab, unpriviegies} = this.props;
    return <div className="bg-white flex-wrp flex-cell flex-align-stretch" style={{height: '100vh'}}>
      <Header title="会员等级"/>
      <div className="flex-item" style={{overflowY: 'auto'}}>
        <div className={`bg-deepblue ${s.headerBox}`} style={{backgroundImage: `url(${bg})`}}>
          <div className="flex-item flex-wrp flex-cell flex-center pt30">
            <img src={p} style={{backgroundImage: `url(${user.avatar})`}}
                 className={`bg-cover img-150 border-radius ${s.border}`}/>
            <div className="color15 size32 pt30">{user.nickname}</div>
            <div className="color15 size24 ptb30">昨天你超越了{Math.round(vip.yesterday_over)}%名小伙伴</div>
          </div>
          <div className="flex-wrp pb30">
            <div className="flex-item flex-wrp flex-cell flex-align-center" onTouchEnd={e => onSwitchTab(0)}>
              <div className={`img-70 border-radius flex-wrp flex-center ${s.border}`}>
                <i className={`i i-pthy size46 ${tabIndex == 0 ? 'color10' : 'color3'}`}/>
              </div>
              <div className="color15 size26 pt10">普通会员</div>
            </div>

            <div className="flex-item flex-wrp flex-end">
            </div>

            <div className="flex-item flex-wrp flex-cell flex-align-center" onTouchEnd={e => onSwitchTab(1)}>
              <div className={` img-70 border-radius flex-wrp flex-center ${s.border}`}>
                <i className={`i i-tqhy size46 ${tabIndex == 1 ? 'color10' : 'color3'}`}/>
              </div>
              <div className="color15 size26 pt10">特权会员</div>
            </div>

          </div>
        </div>
        <div className="bg-white flex-wrp">
          <div className={`flex-item flex-wrp flex-center relative color3 size28 ptb30 ${tabIndex == 0 && s.active}`}>
            <span className="hide">普通会员特权</span>
          </div>
          <div className="flex-item"/>
          <div className={`flex-item flex-wrp flex-center relative color3 size28 ptb30 ${tabIndex == 1 && s.active}`}>
            <span className="hide">特权会员特权</span>
          </div>
        </div>
        {tabIndex == 0 && <div className="flex-wrp flex-flow-row plr20">
          {priviegies.map((n, i) => <div className="flex-wrp flex-cell flex-align-center pd15" style={{width: '25%'}}
                                         key={i}>
            <i className={`i size60 color19 ${n.icon}`}/>
            <div className="size28 pt15">{n.title}</div>
          </div>)}
        </div>}
        {tabIndex == 1 && <div className="flex-wrp flex-flow-row plr15 " style={{}}>
          {unpriviegies.map((n, i) => <div className="flex-wrp flex-cell flex-align-center pd20" style={{width: '25%'}}
                                           key={i}>
            <i className={`i size60 color19 ${n.icon}`}/>
            <div className="size28 pt15">{n.title}</div>
          </div>)}
        </div>}

      </div>

    </div>
  }
}