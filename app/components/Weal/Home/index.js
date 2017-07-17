import React from 'react';
import Header from 'components/Header';
import Link from 'components/Link';
import RedpacketList from '../Redpacket/List';
import CouponList from '../Coupon/List';
import RedpacketModalOpen from '../Redpacket/Modal/Open'
import {number_format} from 'utils';
import s from './style.scss';

export default ({user, category, tabIndex, onSwitchTab, onFilterCoupon, cash_redpacket, fetchRedpackets, coupon, fetchCoupons, onClickRedpacket, onOpenRedpacket, onClickCoupon, onCloseRedpacket, redpacket}) =>
  <div>
    <Header title="超级福利" right={<Link href={{pathname: '/weal_rule'}} clasName="color6 size32">规则</Link>}/>
    <div className="bg-deepblue pd45 color15">
      <div className="size30"><span className={`color19 ${s.fw}`}>{user.nickname && `${user.nickname}，`}</span>您已获得以下超级福利
      </div>
      <div className="flex-wrp pt40">
        <div className="flex-item w0">
          <div className="size30">已抢红包(元)</div>
          <div className={`size40 pt20 color19 ${s.fws}`}>{number_format(user.weal.redpacket.money.total)}</div>
        </div>
        <div className="flex-item w0">
          <div className={`pl45 ${s.split}`}>
            <div className="size30">已为您节省(元)</div>
            <div className={`size40 pt20 color19 ${s.fws}`}>{number_format(user.weal.coupon.money[1])}</div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white flex-wrp size34 color14">
      <div className={`flex-item ptb30 text-center ${tabIndex == 0 ? `color15 ${s.active}` : 'border-b'}`}
           onClick={() => onSwitchTab(0)}>抢红包
      </div>
      <div className={`flex-item ptb30 text-center ${tabIndex == 1 ? `color15 ${s.active}` : 'border-b'}`}
           onClick={() => onSwitchTab(1)}>抢优惠券
      </div>
    </div>
    {tabIndex == 0 && <div>
      <RedpacketList
        cash_redpacket={cash_redpacket}
        fetchRedpackets={fetchRedpackets}
        onClickRedpacket={onClickRedpacket}
      />
      <Link href={{pathname: '/user_redpackets'}}
            className="fixed-bottom bg-white color16 size32 ptb30 text-center border-t">我的红包</Link>
    </div>}
    {tabIndex == 1 && <div>
      <div className="bg-white flex-wrp">
        {category.coupon && category.coupon.categorys && category.coupon.categorys.map((n, i) => <div
          className={`flex-item flex-wrp flex-center ptb30 size28 ${coupon.filter.cid == n.id ? 'color15' : 'color14'}`}
          onClick={() => onFilterCoupon('cid', n.id)} key={i}>
          <i className={`i ${n.icon}`}/>
          <div className="pl10">{n.title}</div>
        </div>)}
      </div>
      <CouponList
        coupon={coupon}
        fetchCoupons={fetchCoupons}
        onClickCoupon={onClickCoupon}
      />
      <Link href={{pathname: '/user_coupons'}}
            className="fixed-bottom bg-white color16 size32 ptb30 text-center border-t">我的优惠券</Link>
    </div>}
    {redpacket && <RedpacketModalOpen
      redpacket={redpacket}
      onClose={onCloseRedpacket}
      onGet={onOpenRedpacket}
    />}
  </div>