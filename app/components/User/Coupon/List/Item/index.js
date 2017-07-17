import React from 'react';
import Link from 'components/Link';
import {SwipeAction} from 'antd-mobile';
import {number_format} from 'utils';
import s from './style.scss';

export default ({coupon, onDelete}) => <div className="mt20 mlr20">
  <SwipeAction
    style={{}}
    right={[
      {
        text: '删除',
        onPress: () => onDelete(coupon),
        style: {backgroundColor: '#F4333C', color: 'white'},
      },
    ]}
  >
    <div className="bg-white flex-wrp relative">
      <div
        className={`flex-item flex-wrp flex-cell flex-center relative ${coupon.status == 0 ? `bg-white color7 ${s.box}` : `bg-smoke color10 ${s.box2}`}`}>
        <div className="flex-wrp flex-align-center pt10">
          {coupon.value && <div className="flex-wrp flex-end">
            {coupon.type == 2 ? <div className="size60">{parseFloat(coupon.value)} <span className="size30"
                                                                                         style={{lineHeight: '130%'}}>折</span>
            </div> : <div className="size60"><span className="size60">￥</span>{parseFloat(coupon.value)}</div>}
          </div>}
        </div>
        <div className="size24 pt10">
          {coupon.type == 1 && `满${number_format(coupon.condition)}立减`}
          {coupon.type == 2 && number_format(coupon.condition) != 0 && `最高抵扣${number_format(coupon.condition)}元`}
          {coupon.type == 3 && ``}
          {coupon.type == 4 && ``}
        </div>
      </div>
      <div className="pd20" style={{flex: 2}}>
        <div className="flex-wrp flex-align-center">
          <div className={`${coupon.status == 0 ? 'bg-orange' : 'bg-smoke'} color10 size16 pd5 ${s.tips}`}>
            {coupon.type == 1 && `满减优惠券`}
            {coupon.type == 2 && `折扣优惠券`}
            {coupon.type == 3 && `支付代金券`}
            {coupon.type == 4 && `新人专享券`}
          </div>
          <div className="size26 pl10 color16">
            {coupon.title}
          </div>
        </div>
        <div className="color14 size22 pt30">
          {coupon.use_time && `使用时间：${coupon.use_time}`}
        </div>
        <div className="flex-wrp flex-align-center pt10">
          {coupon.shop && <div className="flex-wrp size22 pt10 " style={{flex: 3}}>
            <div>
              <span className="pr10 color3">{coupon.shop.title}</span>
              {coupon.shop.distance &&
              <span className="color14">{coupon.shop.distance.number}{coupon.shop.distance.unit}</span>}
            </div>

          </div>}
          {coupon.status == 0 && <Link
            href={{pathname: `/shop_${(coupon.shops && coupon.shops.length > 0) ? coupon.shops[0].id : coupon.shop.id}`}}
            className={`size24 border-radius50 ptb10 plr30 color7 ${s.btn}`}>立即使用</Link>}
        </div>
      </div>
      {coupon.status == 1 && <i className={`i-ysy ${s.icon}`}/>}
    </div>
  </SwipeAction>
</div>