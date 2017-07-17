import React from 'react';
import Link from 'components/Link';
import p from 'assets/images/s.gif';
import s from './style.scss';
export default ({shops}) => <div className="bg-white">
  <div className="flex-wrp flex-center pb20">
    <i className="i i-hot color11 size36 pr10"/><i className="i i-rqhd"/>
  </div>
  <div className={`clear ptb20 pr20 ${s.wrap}`}>
    {shops.map((n, i) => <Link href={{pathname: `/shop_${n.id}`}} className={`pl20 ${s.item}`} key={i}>
      <img src={p} style={{backgroundImage: `url(${n.thumb})`}} className="img-200 border-radius5 bg-cover"/>
      <div className="size28 color3 pt10 w100 nowrap">{n.title}</div>
      <div className={`pd5 color10 size24 ${s.label}`}
           style={{backgroundColor: `rgb(255,${i <= 2 ? (i + 1) * 50 : 180},0)`}}>
        TOP {i + 1}
        <div className={s.labelArrow}/>
      </div>
    </Link>)}
  </div>
</div>