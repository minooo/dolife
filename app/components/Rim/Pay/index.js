import React from 'react';
import Header from 'components/Header';
import {List, Stepper} from 'antd-mobile';

export default ({rim, user, quantity, onSetQuantity, onPay, onBindPhone}) => <div>
  <Header title="信息确认"/>
  <div className="pd20">{rim.title}</div>
  <div className="bg-white plr20">
    <div className="flex-wrp flex-between border-b ptb20">
      <div>联系人:</div>
      <div>{user.truename}</div>
    </div>
    <div className="flex-wrp flex-between ptb20">
      <div>联系方式:</div>
      <div onClick={onBindPhone}>{user.mobile ? user.mobile : '点击绑定手机号'} ></div>
    </div>
  </div>
  <div className="ptb20 plr20 flex-between">
    <div>出游人群</div>
    <div>共 <span className="color2">{quantity.adult + quantity.kid}</span> 人</div>
  </div>
  <div className="flex-item">
    <List className="border-b">
      <List.Item
        extra={<Stepper
          showNumber
          max={rim.stock - rim.sold - quantity.kid}
          min={0}
          value={quantity.adult}
          onChange={value => onSetQuantity('adult', value)}
        />}
      >
        成人
      </List.Item>
    </List>
    <List className="border-b">
      <List.Item
        extra={<Stepper
          showNumber
          max={rim.stock - rim.sold - quantity.adult}
          min={0}
          value={quantity.kid}
          onChange={value => onSetQuantity('kid', value)}
        />}
      >
        儿童
      </List.Item>
    </List>
    <div className="flex-wrp bg-white border-b ptb20 plr25 flex-between">
      <div className="color16 size34">成人：</div>
      <div className="size12">￥<span className="color13 size46">{rim.adult_price * quantity.adult}</span>元</div>
    </div>
    <div className="flex-wrp bg-white border-b ptb20 plr25 flex-between">
      <div className="color16 size34">儿童：</div>
      <div className="size12">￥<span className="color13 size46">{rim.kid_price * quantity.kid}</span>元</div>
    </div>
  </div>
  <div className="flex-wrp flex-between bg-white ptb15 plr25 mt30">
    <div><span className="i-dhjl color0 pr10"></span>开团时间：{rim.time_start}</div>
    <div className="color14">不要错过呦~</div>
  </div>
  <div style={{height: '1rem'}}/>
  <div
    className={`fixed-bottom ptb30 ${rim.stock - rim.sold - quantity.kid === 0 ? 'bg-smoke' : 'bg-main'} flex-wrp flex-center`}
    onClick={rim.stock - rim.sold - quantity.kid === 0 ? null : onPay}>
    <div className="color10">{rim.stock - rim.sold - quantity.kid === 0 ? '已售罄' : '提交订单'}</div>
  </div>
</div>