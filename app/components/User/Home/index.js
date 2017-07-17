import React from 'react';
import Link from 'components/Link';
import Loading from 'components/Loading';
import p from 'assets/images/user_header_bg.png';
import s from './style.scss';
const nav_links = [
  {
    href: {pathname: '/user_favorites'},
    icon: 'i-favor-o',
    title: '我的收藏'
  },
  {
    href: {pathname: '/gift'},
    icon: 'i-jf',
    title: '积分商城'
  },
  {
    href: {pathname: '/vip'},
    icon: 'i-tqhy',
    title: '特权会员'
  },
]
const asset_links = [
  {
    href: {pathname: '/user_finance'},
    icon: 'i-wdye color1',
    title: '我的余额'
  },
  {
    href: {pathname: '/user_redpackets'},
    icon: 'i-wdhb color11',
    title: '我的红包'
  },
  {
    href: {pathname: '/user_coupons'},
    icon: 'i-wdyh color8',
    title: '我的优惠券'
  },
]
export default ({user, onSign}) => {
  const order_links = [
    {
      href: {pathname: '/user_orders', query: {status: 1}},
      icon: 'i-dfk',
      title: '待付款',
      badge: user.order.pay > 9 ? '9+' : user.order.pay
    },
    {
      href: {pathname: '/user_orders', query: {status: 6}},
      icon: 'i-whx',
      title: '未核销',
      badge: user.order.verification > 9 ? '9+' : user.order.verification
    },
    {
      href: {pathname: '/user_orders', query: {status: 3}},
      icon: 'i-ywc',
      title: '已完成',
      badge: false
    },
    {
      href: {pathname: '/user_orders', query: {status: 7}},
      icon: 'i-wpj',
      title: '未评价',
      badge: user.order.comment > 9 ? '9+' : user.order.comment
    },
  ]
  return <div>
    <div className={`bg-main pb45 ${s.header}`} style={{backgroundImage: `url(${p})`}}>
      <div className="flex-wrp">
        <div className="flex-item"></div>
        <Link href={{pathname: `/user_setting`}} className="pt30 pr30 block">
          <i className="i i-set color10 size44"/>
        </Link>
      </div>

      <div className="flex-wrp flex-align-center color10">
        <Link href={{pathname: `/user_setting`}} className="pl30">
          <img src={user.avatar} className="img-120 border-radius"/>
        </Link>
        <div className="flex-item flex-wrp flex-cell flex-middle pl20 color10">
          <div className="size32 pb10">{user.nickname}&nbsp;</div>
          <Link href={{pathname: '/gift'}} className="flex-wrp">
            <div className={`size22 color10 ptb5 plr10 border-radius50 ${s.border}`}>当前积分{user.credit}&nbsp;></div>
          </Link>
        </div>
        {/*<Link href={{pathname: `/user_setting`}} className="pd30">*/}
        {/*<i className="i i-right color10 size36"/>*/}
        {/*</Link>*/}
      </div>
    </div>

    <div className="bg-white flex-wrp ptb30">
      <div onClick={onSign} className="flex-item flex-wrp flex-cell flex-center">
        <i className="i i-qd size36 color0"/>
        <div className="pt20 color3 size28">
          {user.signFetching && <Loading/>}
          {!user.signFetching && (user.is_sign ? '已签到' : '每日签到')}
        </div>
      </div>
      {nav_links.map((n, i) => <Link href={n.href} key={i}
                                     className="flex-item flex-wrp flex-cell flex-center">
        <i className={`i size42 color0 ${n.icon}`}/>
        <div className="pt20 color3 size28">{n.title}</div>
      </Link>)}
    </div>
    <div className="bg-white mt20">
      <div className="flex-wrp pd30 border-b">
        <div className="flex-item color3 size28">我的订单</div>
        <Link href={{pathname: 'user_orders', query: {status: 0}}} className="size24 color4">全部订单<i
          className="i i-right"/></Link>
      </div>
      <div className="flex-wrp ptb30">
        {order_links.map((n, i) => <Link href={n.href} key={i} query={n.href.query}
                                         className="flex-item flex-wrp flex-cell flex-center relative">
          <i className={`i size42 color7 ${n.icon}`}/>
          <div className="pt20 color3 size28">{n.title}</div>
          {n.badge && n.badge.substr(0, 1) > 0 &&
          <div
            className={`color10 border-radius flex-wrp flex-center ${s.badge} ${s.newmessage}`}>
            <span>{n.badge}</span>
          </div>
          }
        </Link>)}
      </div>
    </div>
    <div className="bg-white mt20">
      <div className="flex-wrp pd30 border-b">
        <div className="flex-item color3 size28">我的资产</div>
      </div>
      <div className="flex-wrp ptb30">
        {asset_links.map((n, i) => <Link href={n.href} key={i} className="flex-item flex-wrp flex-cell flex-center">
          <i className={`i size44 color1 ${n.icon}`}/>
          <div className="pt20 color3 size28">{n.title}</div>
        </Link>)}
      </div>
    </div>
    <div className="bg-white mt20 border-t">
      <Link href={{pathname: `/user_win`}} className="flex-wrp flex-align-center border-b pd30">
        <i className="i i-cjjl color9 size36"/>
        <div className="flex-item pl15 size32">中奖纪录</div>
        <i className="i i-right color4 size30"/>
      </Link>

      <Link href={{pathname: `/user_about`}} className="flex-wrp flex-align-center border-b pd30">
        <i className="i i-about color0 size36"/>
        <div className="flex-item pl15 size32">关于我们</div>
        <i className="i i-right color4 size30"/>
      </Link>
    </div>
  </div>
}