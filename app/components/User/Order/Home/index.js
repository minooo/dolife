import React from 'react';
import Header from 'components/Header';
import List from '../List';
import s from './style.scss';

const statuses = {
  '0': '全部',
  '1': '待付款',
  '6': '未核销',
  '3': '已完成',
  '7': '待评价',
}

export default ({order, fetchOrders, onSwitch, onPay, onComment}) => <div className="flex-wrp flex-cell">
  <Header title="我的订单"/>
  <div className="flex-wrp bg-white">
    {Object.keys(statuses).map((n, i) => <div key={i} className={`flex-item flex-wrp flex-center`}
                                              onClick={() => onSwitch(n)}>
      <div className={`ptb30 ${order.filter.status == n ? `color0 ${s.active}` : ''}`}>{statuses[n]}</div>
    </div>)}
  </div>
  <List order={order} fetchOrders={fetchOrders} onPay={onPay} onComment={onComment}/>
</div>