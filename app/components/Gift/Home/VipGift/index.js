import React from 'react';
import Link from 'components/Link';
import p from 'assets/images/s.gif';
import s from './style.scss';

export default ({gifts, title}) => <div className={`bg-white ptb20 border-b ${s.box}`}>
  <div className=" flex-wrp ">
    {gifts.map((n, i) => <Link href={{pathname: `/gift_${n.id}`}} key={i}
                               className={`flex-item text-center relative plr20 ptb10 ${i > 0 && s.split}`}>
      <img src={p} className="bg-cover img-150" style={{backgroundImage: `url(${n.thumb})`}}/>
      <div className="ptb10 size26 color4 w100 nowrap">{title ? n.title : `${n.fee}积分`}</div>
    </Link>)}
  </div>
</div>
