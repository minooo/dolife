import React from 'react';
import Link from 'components/Link';
import p from 'assets/images/s.gif';
import s from './style.scss';

export default ({gift}) => <Link href={{pathname: `/gift_${gift.id}`}} className={`fl ${s.wrap}`}>
  <div className="pl20 pt20">
    <div className="bg-white pd20">
      <img src={p} className={`bg-cover ${s.thumb}`} style={{backgroundImage: `url(${gift.thumb})`}}/>
      <div className="flex-wrp">
        <div className="flex-item w0 nowrap size24 ptb10">{gift.title}</div>
      </div>
      <div className="flex-wrp mb5">
        <div className=" flex-wrp color17 bg-deepblue flex-end border-radius5 ptb5 plr10">
          <i className="i i-vip2 size16 pb5"/>
          <div className="size20">{gift.vip_info.fee > 0 ? `${gift.vip_info.fee}积分` : '免费兑换'}</div>
        </div>
      </div>
      <div className="flex-wrp flex-align-center flex-between size22">
        <div className="color14 del">{gift.fee}积分</div>

        <div className="color4">剩余{gift.stock}份</div>
      </div>
    </div>
  </div>
</Link>