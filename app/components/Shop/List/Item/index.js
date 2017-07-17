import React from 'react';
import Link from 'components/Link';
import s from './style.scss';
import p from 'assets/images/s.gif';

export default ({shop}) => {
  return <Link href={{pathname: `/shop_${shop.id}`}} className="bg-white flex-wrp pd30 border-b">
    <img src={p} className={`border-radius5 bg-cover ${s.thumb}`} style={{backgroundImage: `url(${shop.thumb})`}}/>
    <div className="flex-item flex-wrp ptb10 flex-cell flex-between pl20">
      <div className="flex-wrp">
        <div className="flex-item w0 size32 nowrap">{shop.title}</div>
        <div className="size28 color4">
          <i className="i i-hot size32 color7"/>
          {shop.uv}
        </div>
      </div>
      {(shop.tag || shop.distance) && <div className="pt15 size28 flex-wrp">
        <div>{shop.tag}</div>
        <div className="flex-item"/>
        <div className="color4 flex-wrp">{shop.distance.number}{shop.distance.unit}</div>
      </div>}
      {shop.discount_info && <div className="flex-wrp pt15 size28">
        {
          shop.discount_info.scale < 10 ? <div className="flex-item flex-wrp flex-align-center">
            <i className="i i-wxpay size32 color8"/>
            <span className="flex-item pl10 color4 w0 nowrap">{shop.discount_info.scale}折/酒水除外</span>
          </div> : <div className="flex-item"/>
        }
        {shop.discount_info.vip && shop.discount_info.vip.scale < 10 &&
        <div className="flex-wrp flex-align-center color25">
          <div className={`size22 color10 bg-deeporange ptb5 plr10 border-radius5 ${s.fw}`}>VIP</div>
          <div className="pl5">{shop.discount_info.vip.scale}</div>
          <div>折</div>
        </div>}
      </div>}
      {shop.redpackets && <div className="flex-wrp flex-align-center pt15 size28">
        <i className="i i-wdye-o size32 color2"/>
        <span className="pl10 color4">现金红包领不停</span>
      </div>}
      {shop.discount_info && <div className="flex-wrp flex-align-center pt15 size28">
        <i className="i i-shijian color4 size32"/>
        <span className="pl10 color4">{shop.discount_info.text}</span>
      </div>}
    </div>
  </Link>
}