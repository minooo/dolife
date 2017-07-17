import React from 'react';
import {List, InputItem, Checkbox, Popup, Button} from 'antd-mobile';

export default ({joinInfo, config, onSave, agree, onAgreeChange, onFieldChange}) => <div
  className="flex-wrp flex-cell flex-align-stretch fullHeight">
  <div className="bg-white flex-item">
    <List className="border-b">
      <InputItem
        onChange={value => onFieldChange(value, 'shop_name')}
        clear
        // placeholder="请填写店铺名称"
      >店铺名称</InputItem>
      <InputItem
        onChange={value => onFieldChange(value, 'shop_address')}
        clear
        // placeholder="请填写店铺地址"
      >店铺地址</InputItem>
      <InputItem
        onChange={value => onFieldChange(value, 'contact_name')}
        clear
        // placeholder="请填写店铺联系人"
      >联系人姓名</InputItem>
      <InputItem
        onChange={value => onFieldChange(value, 'contact_phone')}
        clear
        // type="phone"
        // placeholder="请填写联系人电话"
      >联系人电话</InputItem>

    </List>
    <div className="ptb30 shop">
      <Checkbox.AgreeItem onChange={onAgreeChange}>
        <div className="flex-wrp">
          <div className="color4">同意并遵守</div>
          <div className="color23" onClick={e => {
            e.preventDefault()
            Popup.show(<div className="pd30 flex-wrp my-img flex-cell size26 flex-align-stretch fullHeight">
              <div className="flex-item" style={{overflowY: 'auto'}}
                   dangerouslySetInnerHTML={{__html: config.agreement}}/>
              <Button className="bg-main color10" onClick={e => Popup.hide()}>关闭</Button>
            </div>)
          }}>《好店入驻协议》
          </div>
        </div>
      </Checkbox.AgreeItem>
    </div>
    <div className="plr30">
      <Button disabled={!agree} className="bg-orange color10" onClick={onSave}>提交信息</Button>
    </div>
  </div>
</div>