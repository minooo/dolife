import React from 'react';
import Link from 'components/Link';
import p from 'assets/images/s.gif';
import s from './style.scss';

export default ({gift, user}) => <Link href={{pathname: `/gift_${gift.id}`}} className={`bg-white fl lh150 ${s.wrap}`}>
  <div className="pl30 pb30">
    <img src={p} className={`bg-cover ${s.thumb}`} style={{backgroundImage: `url(${gift.thumb})`}}/>
    <div className="flex-wrp">
      <div className="flex-item w0 nowrap size32 color3">{gift.title}</div>
    </div>
    <div className="flex-wrp flex-between size26">
      <div className="color7 size30">{gift.fee}积分</div>
      <div className="color4">剩余{gift.stock}份</div>
    </div>
  </div>
</Link>