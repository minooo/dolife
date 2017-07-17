import React from 'react';
import Header from 'components/Header';
import {List, InputItem, TextareaItem, Button} from 'antd-mobile';

export default ({address, onAddressChange, onSave}) => <div>
  <Header title="收货地址"/>
  <List>
    <InputItem
      value={address.realname}
      clear
      onChange={value => onAddressChange(value, 'realname')}
    >收货人</InputItem>
    <InputItem
      value={address.mobile}
      // type="phone"
      clear
      onChange={value => onAddressChange(value, 'mobile')}
    >联系电话</InputItem>
    <TextareaItem
      value={address.address}
      clear
      rows={2}
      count={50}
      title="详细地址"
      onChange={value => onAddressChange(value, 'address')}
    />
  </List>
  <div className="pd30">
    <Button className="bg-main color10 size32" onClick={onSave}>保存</Button>
  </div>
</div>