import React from 'react';
import {List, NoticeBar} from 'antd-mobile';
import Loading from 'components/Loading';
import s from './style.scss';

const keyBtn = `flex-wrp bg-white ptb30 flex-center size42 ${s.keyBtn}`
const redpacketState = (cashier) => {
  if (cashier.redpacket && cashier.discount.discount_activity_fee > 0) {
    return <div className="color5">-{cashier.discount.discount_activity_fee}元</div>
  }
  if (cashier.discount.redpackets && cashier.discount.redpackets.length > 0) {
    return <div className="color5">{cashier.discount.redpackets.length}个红包可用</div>
  }
  return <div>没有可用红包</div>
}
const couponState = (cashier) => {
  if (cashier.coupon && cashier.discount.discount_coupon_fee > 0) {
    return <div className="color5">-{cashier.discount.discount_coupon_fee}元</div>
  }
  if (cashier.discount.coupons && cashier.discount.coupons.length > 0) {
    return <div className="color5">{cashier.discount.coupons.length}个优惠券可用</div>
  }
  return <div>没有可用优惠券</div>
}
export default ({shop, inputFocus, cashier, onKeyinput, onPay, onSwitchInput, onChooseRedpacket, onChooseCoupon, isPaying}) =>
  <div className="flex-wrp flex-cell flex-align-stretch fullHeight">
    <div className="flex-item plr20 pt20" style={{overflowY: 'auto'}}>
      <List
        className="border-radius10"
      >
        <List.Item
          className="flex-between"
          extra={<div className={`size58 ${inputFocus == 1 && s.inputFocus}`}>
            {cashier.total_fee}
          </div>}
          onTouchEnd={() => onSwitchInput(1)}
          multipleLine
        >
          <div className={`ptb10 size36 ${inputFocus == 1 ? 'color0' : 'color3'}`}>消费总金额：</div>
          <div className="size28 color4">询问服务员后输入</div>
        </List.Item>
        <List.Item
          className="flex-between"
          extra={<div className={`size38 ${inputFocus == 2 && s.inputFocus}`}>
            {cashier.real_fee}
          </div>}
          onTouchEnd={() => onSwitchInput(2)}
        >
          <div className={`ptb10 size30 ${inputFocus == 2 ? 'color0' : 'color3'}`}>不参与优惠：</div>
        </List.Item>
      </List>
      <List
        className="border-radius10 mt20"
      >
        <List.Item
          onClick={onChooseRedpacket}
          arrow="horizontal"
          extra={<div className="flex-wrp flex-align-center flex-bottom size28"
          >
            {redpacketState(cashier)}
          </div>}
        >
          <div className="size28">使用红包</div>
        </List.Item>
        <List.Item
          onClick={onChooseCoupon}
          arrow="horizontal"
          extra={<div className="flex-wrp flex-align-center flex-bottom size28"
          >
            {couponState(cashier)}
          </div>}
        >
          <div className="size28">使用优惠券</div>
        </List.Item>
        {cashier.discount && cashier.discount.discount_shop_fee && cashier.discount.discount_shop_fee > 0 && <List.Item
          extra={`-${cashier.discount.discount_shop_fee}元`}
        >
          <div className="size28">商家优惠</div>
        </List.Item>}
        {cashier.discount && cashier.discount.vip_discount_shop_fee && cashier.discount.vip_discount_shop_fee > 0 &&
        <List.Item
          extra={`-${cashier.discount.vip_discount_shop_fee}元`}
        >
          <div className="size28">VIP减免</div>
        </List.Item>}
      </List>
      <List
        className="border-radius10 mt20"
      >
        <List.Item
          extra={<div className="color5">{cashier.cash_fee}元</div>}
        >
          <div className="size28">实付金额</div>

        </List.Item>
        <div className="pt20">
          <span className="color4 size24 pl30">收银台买单仅限于到店支付，不支持大牌抢购。</span>
        </div>
      </List>
    </div>
    {shop && <NoticeBar className="text-center" icon={null}>
      {isPaying && <Loading text="支付中"/>}
      {!isPaying && `您正在向${shop.title}付款`}
    </NoticeBar>}
    <div className="flex-wrp flex-align-stretch">
      <div className="flex-item flex-wrp flex-cell">
        <div className={keyBtn} onTouchEnd={e => onKeyinput(e, 1)}>1</div>
        <div className={keyBtn} onTouchEnd={e => onKeyinput(e, 4)}>4</div>
        <div className={keyBtn} onTouchEnd={e => onKeyinput(e, 7)}>7</div>
        <div className={keyBtn} onTouchEnd={e => onKeyinput(e, '.')}>.</div>
      </div>
      <div className="flex-item flex-wrp flex-cell">
        <div className={keyBtn} onTouchEnd={e => onKeyinput(e, 2)}>2</div>
        <div className={keyBtn} onTouchEnd={e => onKeyinput(e, 5)}>5</div>
        <div className={keyBtn} onTouchEnd={e => onKeyinput(e, 8)}>8</div>
        <div className={keyBtn} onTouchEnd={e => onKeyinput(e, 0)}>0</div>
      </div>
      <div className="flex-item flex-wrp flex-cell">
        <div className={keyBtn} onTouchEnd={e => onKeyinput(e, 3)}>3</div>
        <div className={keyBtn} onTouchEnd={e => onKeyinput(e, 6)}>6</div>
        <div className={keyBtn} onTouchEnd={e => onKeyinput(e, 9)}>9</div>
        <div className={keyBtn}>&nbsp;</div>
      </div>
      <div className="flex-item flex-wrp flex-cell">
        <div onTouchEnd={e => onKeyinput(e, 'backspace')}
             className={`flex-item bg-white ptb30 flex-wrp flex-center size42 ${s.backspaceBtn}`}>
          <i className="i i-fanhui size52"/>
        </div>
        <div onTouchEnd={e => !isPaying && onPay()}
             className={`flex-item ptb30 flex-wrp flex-center size42 color10 ${s.payBtn}`}>支付
        </div>
      </div>
    </div>
  </div>