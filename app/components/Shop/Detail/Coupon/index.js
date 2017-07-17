import React from 'react';
import s from './style.scss';
import Item from './Item';

export default ({coupons, onClickCoupon}) => <div className={`pb20 border-t border-b mt20 ${s.box}`}>
  {coupons.map((n, i) => <Item key={i} coupon={n} onClickCoupon={onClickCoupon}/>)}
</div>