import React from 'react';
import Link from 'components/Link';
import Header from 'components/Header';
import Card from './Card';
import News from './News';
import Item from './Item';
import VipGifts from './VipGift';

const nav_links = [
  {
    path: '/user_credit',
    icon: 'i-jf',
    title: '积分明细'
  },
  {
    path: '/user_gifts',
    icon: 'i-dhjl',
    title: '兑换记录'
  },
  {
    path: '/gift_rule',
    icon: 'i-jfgz',
    title: '积分规则'
  },
]
export default ({user, config, onSign, news, gifts, loadHandle, vip_gifts}) => <div>
  <Header title="积分商城"/>
  <Card user={user} config={config} onSign={onSign}/>
  <div className="bg-white flex-wrp border-t ptb30">
    {nav_links.map((n, i) => <Link href={n.path} key={i} className="flex-item flex-wrp flex-cell flex-center">
      <i className={`i size42 color7 ${n.icon}`}/>
      <div className="pt20 size28 color3">{n.title}</div>
    </Link>)}
  </div>
  <News news={news}/>
  {vip_gifts && vip_gifts.length > 0 && <div className="bg-white flex-wrp flex-align-center ptb30 plr30 mt20">
    <div className="bg-orange" style={{width: '.07rem'}}>&nbsp;</div>
    <div className="flex-item pl10 color16 size30">会员首开专享</div>
  </div>}
  {vip_gifts && vip_gifts.length > 0 && <VipGifts gifts={vip_gifts}/>}
  <div className="bg-white flex-wrp flex-align-center ptb30 plr30 mt20">
    <div className="bg-orange" style={{width: '.07rem'}}>&nbsp;</div>
    <div className="flex-item pl10 color16 size30">积分兑换专区</div>
    <Link href={{pathname: '/gift_list'}} className="size28 color4">
      更多
      <i className="i i-right size22"/>
    </Link>
  </div>
  <div className="bg-white pr30 pb30 clear">
    {gifts && gifts.map((n, i) => <Item key={i} gift={n} user={user}/>)}
  </div>
</div>