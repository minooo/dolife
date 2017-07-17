import React from 'react';
import moment from 'moment';
import s from './style.scss';
import {number_format} from 'utils';

export default ({coupon, onClickCoupon}) => <div
  className={`relative mr20 plr20 ptb10 bg-white color23 size26 border-radius5 ${s.box}`}
  onClick={() => onClickCoupon(coupon)}>
  <div className="flex-wrp flex-end pb10">
    {coupon.type != 2 && <div>￥</div>}
    <div className="size42" style={{lineHeight: '93%'}}>{number_format(coupon.value)}</div>
    {coupon.type == 2 && <div>折</div>}
  </div>
  <div className="size24">
    {coupon.type != 2 && <div>满{number_format(coupon.condition)}元使用</div>}
    {coupon.type == 2 && <div>最高减免{number_format(coupon.condition)}</div>}
  </div>
  <div className="size22 color14 pt5">
    {moment(coupon.use_end_time).format('YYYY.MM.DD')}前有效
  </div>
</div>