import React from 'react';
import Header from 'components/Header'
import Loading from 'components/Loading'
import Link from 'components/Link'
import {List, Stepper, Button} from 'antd-mobile';
import s from './style.scss';

export default ({cart, user, order, onSetQuantity, onPay}) => <div>
  <Header title="下单信息"/>
  {cart.detail && cart.detail.delivery && <div className={`bg-white ${s.box}`}>
    <Link href={{pathname: '/user_addresses', state: {back: '/order_buying'}}} className="block size32 pd30">
      {!cart.address && <div className="color0">选择收货地址</div>}
      {cart.address && <div className="flex-wrp flex-align-center">
        <div className="flex-item w0">
          <div className="flex-wrp flex-align-center">
            <div>收货人：</div>
            <div>{cart.address.truename}</div>
            <div className="pl10">{cart.address.mobile}</div>
          </div>
          <div className="flex-wrp flex-align-center pt20">
            <div>地 址：</div>
            <div className="flex-item w0 nowrap">{cart.address.address}</div>
          </div>
        </div>
        <i className="i i-right size52 color3"/>
      </div>}
    </Link>
  </div>}
  {!cart.detail && <Loading inline/>}
  {cart.detail && <List renderHeader={cart.detail.title}>
    <List.Item
      extra={<Stepper
        showNumber
        max={parseInt(parseInt(cart.detail.amount) < parseInt(cart.detail.stock) ? cart.detail.amount : cart.detail.stock)}
        min={1}
        value={cart.quantity}
        onChange={onSetQuantity}
      />}
    >
      数量：
    </List.Item>
    <List.Item
      extra={<div className="flex-wrp flex-bottom flex-end color5">
        <div className="size32">￥</div>
        <div className="size42" style={{lineHeight: '130%'}}>
          {parseFloat(parseFloat((user.is_vip && cart.detail.vip_info) ? cart.detail.vip_info.fee : cart.detail.fee) * cart.quantity).toFixed(2)}
        </div>
      </div>}
    >
      小计：
    </List.Item>
    {cart.detail.vip_info && !user.is_vip && <List.Item
      extra={<Link href={{pathname: '/order_vip'}} className="color5">
        立即开通
        <i className="i i-right size26"/>
      </Link>}
    >
      VIP购买仅需￥{parseFloat(cart.detail.vip_info.fee * cart.quantity).toFixed(2)}
    </List.Item>}
  </List>}
  <List renderHeader="您绑定的电话">
    <List.Item
      extra={<Link href={{pathname: '/user_setting_mobile'}} className="flex-wrp flex-bottom flex-align-center color3">
        修改电话
        <i className="i i-right size26"/>
      </Link>}
    >
      {user.mobile}
    </List.Item>
  </List>

  {/*<div className="plr30">*/}
  {/*{!order.isFetching &&<div className="bg-main color10 ptb30 flex-wrp flex-center border-radius5" onClick={onSave}>提交订单</div>}*/}
  {/*{order.isFetching &&<div className="bg-smoke color10 ptb30 flex-wrp flex-center border-radius5">提交订单</div>}*/}
  {/*</div>*/}
  <Button type="ghost" style={{backgroundColor: '#1bbc9b'}} className="fixed-bottom nbr color10 size32"
          loading={order.isFetching} disabled={order.isFetching} onClick={onPay}>
    提交订单
  </Button>
</div>