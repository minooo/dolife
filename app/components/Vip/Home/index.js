import React from 'react';
import Header from './Header';
import Link from 'components/Link';
import BuyingList from '../Buying/List';
import ShopList from '../Shop/List';
import GiftList from '../Gift/List';
import CouponList from 'components/Weal/Coupon/List'
import VipGift from 'components/Gift/Home/VipGift';
import p from 'assets/images/s.gif';
import s from './style.scss';

export default ({user, vip, tabIndex, onSwitchTab, loadBuyings, loadShops, loadGifts, coupon, fetchCoupons, onClickCoupon, vip_gifts, onShare, share}) =>
  <div>
    <Header user={user} vip={vip} onShare={onShare} share={share}/>
    {!user.is_vip && <div>
      {vip_gifts && vip_gifts.length > 0 && <div className="bg-white pd30 flex-wrp flex-center color16 size32">
        开通会员即送礼品
      </div>}
      {vip_gifts && vip_gifts.length > 0 && <VipGift gifts={vip_gifts} title/>}
      {vip.privilege && vip.privilege.length > 0 && <div className="bg-white mt20">
        <div className="pd30 flex-wrp flex-center color16">
          <div className="pr20">一</div>
          <div className="size32">会员特权</div>
          <div className="pl20">一</div>
        </div>
        {vip.privilege.map((n, i) => <div className="flex-wrp flex-align-center" key={i}>
          <div className="pd30">
            <img src={p} className="bg-fill img-80" style={{backgroundImage: `url(${n.icon})`}}/>
          </div>
          <div className="flex-item border-b flex-wrp flex-align-center ptb30">
            <div className="flex-item w0">
              <div className="size32 color16">{n.title}</div>
              <div className="size28 color4 pt10">{n.desc}</div>
            </div>
            <div className="plr30">
              <Link href={{pathname: '/vip_priviege_detail', state: {priviege: n}}}
                    className={`ptb15 size28 plr30 color17 border border-radius40 ${s.btnBorder}`}>去看看</Link>
            </div>
          </div>
        </div>)}
      </div>}
      <div className="bg-white flex-wrp ptb15 flex-align-center border-t">
        <div className="flex-item pl20 size32 color16">开通VIP会员 畅享尊贵特权</div>
        <div className="pr20">
          <Link href={{pathname: '/order_vip'}} className="block bg-deepblue ptb25 plr45 color10 size32 border-radius5">立即开通</Link>
        </div>
      </div>
    </div>}
    {user.is_vip && <div>
      {/*<div className="bg-white pd30 size30 color16 border-b">特权会员专享</div>*/}
      <div className="flex-wrp bg-white">
        <div className="flex-item flex-wrp flex-middle" onClick={() => onSwitchTab(0)}>
          <div className={`ptb30 color4 size28 ${tabIndex == 0 && `color17 ${s.active}`}`}>会员抢购</div>
        </div>
        <div className="flex-item flex-wrp flex-middle" onClick={() => onSwitchTab(1)}>
          <div className={`ptb30 color4 size28 ${tabIndex == 1 && `color17 ${s.active}`}`}>会员优惠</div>
        </div>
        <div className="flex-item flex-wrp flex-middle" onClick={() => onSwitchTab(2)}>
          <div className={`ptb30 color4 size28 ${tabIndex == 2 && `color17 ${s.active}`}`}>会员礼品</div>
        </div>
        <div className="flex-item flex-wrp flex-middle" onClick={() => onSwitchTab(3)}>
          <div className={`ptb30 color4 size28 ${tabIndex == 3 && `color17 ${s.active}`}`}>会员折扣</div>
        </div>
      </div>
      {tabIndex == 0 && <BuyingList
        data={vip.buying}
        loadHandle={loadBuyings}
      />}
      {tabIndex == 1 && <CouponList
        coupon={coupon}
        fetchCoupons={fetchCoupons}
        onClickCoupon={onClickCoupon}
      />}
      {tabIndex == 2 && <GiftList
        data={vip.gift}
        loadHandle={loadGifts}
      />}
      {tabIndex == 3 && <ShopList
        data={vip.shop}
        loadHandle={loadShops}
      />}
    </div>}
  </div>