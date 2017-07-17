import React from 'react';
import {SwipeAction} from 'antd-mobile';

export default ({address, isManage, onEdit, onDelete, onRowClick}) => <div className="bg-white mb20 border-t"
                                                                           onClick={e => onRowClick(e, address)}>
  <SwipeAction
    style={{}}
    right={[
      {
        text: '编辑',
        onPress: e => onEdit(e, address),
        style: {backgroundColor: '#ddd', color: 'white'},
      },
      {
        text: '删除',
        onPress: e => onDelete(e, address),
        style: {backgroundColor: '#F4333C', color: 'white'},
      },
    ]}
  >
    <div className="pd30">
      <div className="flex-wrp flex-between">
        <div className="color16 size32">{address.realname}</div>
        <div className="color16 size28">{address.mobile}</div>
      </div>
      <div className="pt20 color16 size28">{address.address}</div>
    </div>
  </SwipeAction>
</div>