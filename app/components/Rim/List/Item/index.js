import React from 'react';
import Link from 'components/Link';
import s from './style.scss';

export default ({rim}) => <Link href={{pathname: `/rim_${rim.id}`}} className="plr20">
  <div style={{backgroundImage: `url(${rim.thumb})`}} className={`bg-cover ${s.pt100}`}>
    <div className={`pl15 ${s.bg}`}>
      <div className={`lh150 color10 ${s.fontw}`}>
        {rim.title}
      </div>
      <div className="lh150 color10 ">
        {rim.desc}
      </div>
    </div>
  </div>
  <div className="flex-wrp flex-between ptb25 bg-white size24">
    <div className="flex-wrp flex-between color16">
      <div className="plr15"><span className="i-rimmap color11"></span>{rim.target}</div>
      <div><span className="i-shijian"></span> {rim.time_start} 出发</div>
    </div>
    <div className={`color16 pr15 ${s.fontw}`}><span className="color11">￥</span><span
      className="color11 size40">{rim.adult_price} </span>起
    </div>
  </div>
</Link>