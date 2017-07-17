import React from 'react';
import Header from 'components/Header';
import Link from 'components/Link';
import List from '../List';
import s from './style.scss'

export default ({user, onSwitch, coupon, fetchCoupons, onDelete}) => <div>
  <Header title="优惠券"/>
  <div className="flex-wrp bg-white">
    <div className={`flex-item ptb30 text-center ${coupon.filter.status == 0 ? `color0 ${s.active}` : ''}`}
         onClick={() => onSwitch(0)}>未使用({user.weal.coupon.count[0]})
    </div>
    <div className={`flex-item ptb30 text-center ${coupon.filter.status == 1 ? `color0 ${s.active}` : ''}`}
         onClick={() => onSwitch(1)}>已使用({user.weal.coupon.count[1]})
    </div>
    <div className={`flex-item ptb30 text-center ${coupon.filter.status == -1 ? `color0 ${s.active}` : ''}`}
         onClick={() => onSwitch(-1)}>已过期({user.weal.coupon.count[-1]})
    </div>
  </div>
  <List
    coupon={coupon}
    fetchCoupons={fetchCoupons}
    onDelete={onDelete}
  />
  <div className="ptb40"></div>
  <Link href={{pathname: '/weal', query: {type: 1}}}
        className="fixed-bottom bg-white color16 size32 ptb30 text-center border-t z1">领取更多好券</Link>
</div>