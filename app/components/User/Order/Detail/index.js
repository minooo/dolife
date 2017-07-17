import React from 'react';
import moment from 'moment';
import {List, Button, Popup} from 'antd-mobile';
import Header from 'components/Header'
import Rate from 'components/Rate'

const ticketStatus = (ticket) => {
  if (ticket.isrefund) {
    return <div>已退款</div>
  }
  if (ticket.time_finish) {
    return <div>已使用</div>
  }
  if (moment().isAfter(ticket.expiry)) {
    return <div>已过期</div>
  }
  return <i className="block i i-ewm size52"
            onClick={() => Popup.show(<div className="flex-wrp flex-cell flex-center ptb50">
              <div className="pb30">请将二维码出示给商家</div>
              <img src={ticket.qrcode}/>
            </div>)}/>
}
export default ({isPaying, order, onPay, onComment}) => <div>
  <Header title="订单详情"/>
  <List renderHeader="订单信息">
    <List.Item>
      订单号
      <List.Item.Brief>{order.id}</List.Item.Brief>
    </List.Item>
    <List.Item>
      商品名称
      <List.Item.Brief>{order.title}</List.Item.Brief>
    </List.Item>
  </List>
  {order.attach && (order.attach.buying || order.attach.coupon) && <List renderHeader="核销码">
    {(order.attach.buying || order.attach.coupon || []).map((n, i) => <List.Item
      key={i}
      extra={ticketStatus(n)}
    >
      <div className={`${(n.isrefund || n.time_finish || moment().isAfter(n.expiry)) && 'del'}`}>{n.code}</div>
      {(!n.isrefund && !n.time_finish && moment().isBefore(n.expiry)) &&
      <List.Item.Brief>过期时间：{n.expiry}</List.Item.Brief>}
    </List.Item>)}
  </List>}
  {order.status > 1 && <List renderHeader="评价信息">
    <List.Item
      extra={order.status == 7 && <Button type="ghost" size="small" className="nbr bg-orange color10 size28" inline
                                          onClick={() => onComment}>去评价</Button>}
    >
      {order.comment && <Rate num={order.comment.score}/>}
      {!order.comment && '未评价'}
    </List.Item>
  </List>}
  <List renderHeader="下单信息">
    <List.Item
      extra={order.realname}
    >联系人</List.Item>
    <List.Item
      extra={order.mobile}
    >联系电话</List.Item>
    <List.Item
      extra={order.time_create}
    >下单时间</List.Item>
    <List.Item
      extra={`￥${order.total_fee}`}
    >商品总额</List.Item>
    <List.Item
      extra={`￥${order.cash_fee}`}
    >实付金额</List.Item>
  </List>
  {order.status == 1 &&
  <Button type="ghost" className="fixed-bottom bg-main color10 size32" loading={isPaying} disabled={isPaying}
          onClick={onPay}>支付</Button>}
</div>