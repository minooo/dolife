import React from 'react';
import p from 'assets/images/s.gif';
import s from './style.scss';
import {setTitle, date_obj, getApi} from "utils";

export default ({redpacket, onClickRedpacket}) => <div>
  <div className="flex-wrp flex-center ptb30">
    <div
      className={`size26 color10 border-radius10 ${s.time} ptb5 plr10`}>{date_obj(redpacket.start_time).first_time} {date_obj(redpacket.start_time).secend_time}</div>
  </div>
  <div className="flex-wrp">
    <div className="plr20">
      <img src={p} className="bg-cover border-radius img-80" style={{backgroundImage: `url(${redpacket.shop.thumb})`}}/>
    </div>
    <div className="flex-item pr30">
      <div className="size28">{redpacket.shop.title}</div>
      <div className="border-radius15 bg-white mt10" onClick={() => onClickRedpacket(redpacket)}>
        <div className={`pd25 flex-wrp bg-redpacket relative ${s.redpacket}`}>
                    <span className="i-hb size70">
                        <span className="path1"/>
                        <span className="path2"/>
                        <span className="path3"/>
                        <span className="path4"/>
                    </span>
          <div className="flex-item w0 size28 pl20 lh150 color10">{redpacket.title}</div>
        </div>
        <div className="size24 color3 ptb10 plr25">领取现金红包</div>
      </div>
    </div>
    <div className="plr50"/>
  </div>
</div>