import React from "react";
import {number_format} from 'utils';
import s from "./style.scss";

export default ({redpackets, onHideRedpacket, onGetRedpacket}) => <div className="mask">
  <div className={`${s.root}`}>
    <div className={s.roottop}/>
    <div className={`${s.radius} bg-red pd20`}>
      <div className={`${s.rootmain} pd20`}>
        {redpackets && redpackets.map((n, i) => <div key={i}
                                                     className={`flex-wrp flex-align-center flex-between overflow-hidden bg-white ${s.rootlist}`}
                                                     style={{maxHeight: '40vh', overflowY: 'auto'}}>
          <div className="pl20 color5" style={{flex: 1}}>
            <span className="size52">{number_format(n.fee)}</span>
            <span className="size22">元</span>
          </div>
          <div className="size28" style={{flex: 3}}>
            <div className="color3">
              满{number_format(n.condition.lower)}元减{number_format(n.fee)}元
            </div>
            <div className="color4">
              有效期至：{moment(n.time_end).format('YYYY.MM.DD')}
            </div>
          </div>
          <div className={`${n.is_get ? 'bg-gray color3' : 'bg-red color10'} pd20 text-center size28`}
               onClick={e => !n.is_get && onGetRedpacket(n)}>
            {n.is_get ? '已' : '立即'}<br/>领取
          </div>
        </div>)}
      </div>
      <div className="flex-wrp flex-align-center color10 mt10 size26">
        <i className="i i-about"/>
        <div className="pl10">店内使用微信支付即可使用</div>
      </div>
    </div>
    <div className="flex-wrp flex-center mt20" onClick={onHideRedpacket}>
      <span className={`text-center color10 size28 ${s.icon}`}>✕</span>
    </div>
  </div>
</div>