import React from 'react';
import Link from 'components/Link'
import {Button} from 'antd-mobile';
import p from 'assets/images/s.gif';
import s from './style.scss';

const statuses = {
  '-1': '支付超时',
  '-2': '已退款',
  '0': '已取消',
  '1': '待支付',
  '2': '已支付',
  '3': '已完成',
  '4': '待发货',
  '5': '待收货',
  '6': '待核销',
  '7': '待评价',
}
const modules = {
  '1': '大牌抢购',
  '6': '商家收款',
  '7': '优惠券支付',
  '8': '五折卡',
  '9': '刷卡支付',
  '10': '扫码支付',
  '11': '活动',
  '14': '会员卡'
}

export default ({order, onPay, onComment}) => <Link href={{pathname: `/user_order_detail`, query: {id: order.id}}}
                                                    className="block bg-white mt20 pd30">
  <div className="flex-wrp flex-between pb20 size28">
    <div className="color3">{order.time_create}</div>
    <div className="color0">{statuses[order.status]}</div>
  </div>
  <div className="flex-wrp">
    <div><img src={p} className={`bg-cover ${s.thumb}`} style={{backgroundImage: `url(${order.thumb})`}}/></div>
    <div className="flex-item pl30">
      <div className="size34 color16">{order.title}</div>
      <div className="size28 color4 pt10">来自：{modules[order.type]}</div>
      <div className="flex-wrp flex-between pt10">
        <div className="size36 color7">￥{order.cash_fee}</div>
        {order.status == 1 && <Button
          type="ghost"
          size="small"
          loading={order.isPaying}
          disabled={order.isPaying}
          className="bg-orange color10 nbr size28"
          onClick={e => {
            e.preventDefault()
            onPay(order)
          }}
        >支付</Button>}
        {order.status == 7 && <Button
          type="ghost"
          size="small"
          className="bg-orange color10 nbr size28"
          onClick={e => {
            e.preventDefault()
            onComment(order)
          }}
        >去评价</Button>}
      </div>
    </div>
  </div>
</Link>