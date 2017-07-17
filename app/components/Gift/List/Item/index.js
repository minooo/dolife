import React from 'react';
import Link from 'components/Link';
import p from 'assets/images/s.gif';
import s from './style.scss';

export default ({gift, user}) => <Link href={{pathname: `/gift_${gift.id}`}}
                                       className="pd20 flex-wrp flex-align-stretch bg-white border-t">
  <img src={p} className={`bg-cover ${s.img}`} style={{backgroundImage: `url(${gift.thumb})`}}/>
  <div className="flex-item flex-wrp flex-cell flex-align-stretch flex-between pl10 ptb10">
    <div className="nowrap size32">{gift.title}</div>
    <div className="flex-wrp flex-align-center">
      {gift.vip_info && <div className="flex-wrp border-radius5" style={{border: '1px solid #ff9051'}}>
        <div className="bg-orange size24 color10 ptb5 plr10">VIP专享</div>
        <div className="size24 color7 ptb5 plr10">{gift.vip_info.fee}积分</div>
      </div>}
      <div className={`${gift.vip_info ? 'pl20 color14' : 'color7'} size30`}>{gift.fee}积分</div>
    </div>
    <div className="flex-wrp flex-between size26 size26 color4">
      {gift.shop && <div>{gift.shop.title}</div>}
      <div>剩余{gift.stock}份</div>
    </div>
  </div>
</Link>