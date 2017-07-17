import React from 'react';
import Link from 'components/Link';
import s from './style.scss';
import p from 'assets/images/s.gif';
export default ({shop}) => {
  return <Link href={{pathname: `/shop_${shop.id}`}} className="bg-white flex-wrp pd30 border-b mt20">
    <img src={p} className={`bg-cover ${s.thumb}`} style={{backgroundImage: `url(${shop.thumb})`}}/>
    <div className="flex-item pl20 pt5">
      <div className="flex-wrp">
        <div className="flex-item w0 size36 nowrap">{shop.title}</div>
        <div className="size28 color4">
          <i className="i i-hot size32 color17"/>
          {shop.uv}
        </div>
      </div>
      <div className="flex-wrp">
        {shop.tag && <div className="color4 pt15 size28">{shop.tag}</div>}
        <div className="flex-item"/>
        {shop.distance && <div className="color4 size28">
          {shop.distance.number}{shop.distance.unit}
        </div>}
      </div>
      <div className="flex-wrp flex-align-center pt10 flex-between">
        {shop.discount_info && <div className="flex-wrp flex-align-center pt15 size28">
          <i className="i i-shijian color4 size32"/>
          <span className="pl10 color4">{shop.discount_info.text}</span>
        </div>}
        <div className="flex-item"/>
        {shop.discount_info.vip &&
        <div className="flex-wrp flex-align-center color19 bg-deepblue ptb10 plr15 border-radius5 size24">
          <i className="i i-vip2 size18"/>
          <div className="pl5">专享{shop.discount_info.vip.scale}折</div>
        </div>}
      </div>
    </div>
  </Link>
}