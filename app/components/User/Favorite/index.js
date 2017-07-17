import React from 'react';
import Link from 'components/Link';
import {Tabs} from 'antd-mobile';
import p from 'assets/images/s.gif';
import s from './style.scss';

export default ({sections}) => <Tabs>
  {sections && sections.map((item, index) => <Tabs.TabPane
    tab={item.label}
    key={index}
  >
    {item.items && item.items.map((n, i) => <div key={i} className="flex-wrp pd30 bg-white border-b">
      <img src={p} className={`bg-cover ${s.thumb}`} style={{backgroundImage: `url(${n.thumb})`}}/>
      {item.type == "shop" && <Link href={{pathname: `/shop_${n.id}`}} className="pl20 color16 flex-item">
        <div className="lh150">{n.title}</div>
        <div className="color14 lh150">{n.tag}</div>
        <div className="color14 lh150">{n.distance.number}{n.distance.unit}</div>
      </Link>}
      {item.type == "buying" && <Link href={{pathname: `/buying_${n.id}`}} className="pl20 color16 flex-item">
        <div className="lh150">{n.title}</div>
        <div className="lh150 pt20 color7 ">￥<span className="size60">{n.price}</span>元</div>
      </Link>}
    </div>)}
  </Tabs.TabPane>)}
</Tabs>