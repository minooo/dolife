import React from 'react';
import Link from 'components/Link';
import s from './style.scss';
import {number_format} from 'utils';

const status_text = (coupon, onClickCoupon) => {
  if (coupon.is_receive && parseFloat(coupon.user_receive_num) >= parseInt(coupon.limit_num)) {
    return <Link
      style={{width: '1.46rem', boxSizing: 'box'}}
      href={{pathname: `/shop_${coupon.shops[0].id}`}}
      className={`size26 border-radius5 ptb20 plr20 color18 border border-color2`}>
      立即使用
    </Link>
  }
  if (parseInt(coupon.receive_num) >= parseInt(coupon.send_num)) {
    return <div style={{width: '1.46rem', boxSizing: 'box'}}
                className={`size26 border-radius5 ptb20 plr20 color18 border border-color2`}>
      已被抢光
    </div>
  }
  return <div style={{width: '1.46rem'}} className={`size26 border-radius5 ptb20 plr20 color18 bg-yellow`}
              onClick={() => onClickCoupon(coupon)}>
    立即领取
  </div>
}
export default ({coupon, onClickCoupon}) => <div className="mt20 mlr20 overflow-hidden">
  <div className={`bg-white flex-wrp flex-item ${s.height}`}>
    <div style={{width: '33%'}} className={`flex-wrp flex-cell flex-center plr10 relative ${s.box}`}>
      <div className={`bg-yellow size22 color18 pd5 ${s.tips}`}>
        {coupon.type == 1 && `满减优惠券`}
        {coupon.type == 2 && `折扣优惠券`}
        {coupon.type == 3 && `支付代金券`}
        {coupon.type == 4 && `新人专享券`}
      </div>
      <div className="color15 flex-wrp flex-align-center pt10">
        {coupon.value && <div className="flex-wrp flex-end">
          {[1, 3, 4].findIndex(n => n == coupon.type) > -1 && <div className="size54">￥</div>}
          <div className="size60">{number_format(coupon.value)}</div>
          {coupon.type == 2 && <div className="size52" style={{lineHeight: '130%'}}>折</div>}
        </div>}
      </div>
      <div className="color15 size24 pt10">
        {coupon.type == 1 && `满${number_format(coupon.condition)}元可用`}
        {coupon.type == 2 && number_format(coupon.condition) != 0 && `最高抵${number_format(coupon.condition)}元`}
        {coupon.type == 3 && ``}
        {coupon.type == 4 && ``}
      </div>
    </div>
    <div style={{width: '67%'}} className="pd30 flex-item flex-wrp">
      <div className="flex-wrp flex-cell flex-item">
        <div className={`size28 color16 ${s.title}`}>{coupon.title}</div>
        <div className="color15 size24 flex-wrp flex-between pt10 flex-end">
          {coupon.is_vip ? <div className="flex-wrp flex-align-center color19 bg-deepblue border-radius5 ptb5 plr10">
            <i className="i-vip2 size16" style={{borderRadius: '3px'}}/>
            <div className="pl5 size20">专享</div>
          </div> : <div></div>}
        </div>
        {coupon.shop && <div className="flex-wrp size26 pt10 color3">
          <div>{coupon.shop.title}</div>
          {coupon.shop.distance &&
          <div className="pl10 color14">{coupon.shop.distance.number}{coupon.shop.distance.unit}</div>}
        </div>}
      </div>
      <div className="flex-wrp flex-center">
        {status_text(coupon, onClickCoupon)}
      </div>
    </div>
  </div>
</div>