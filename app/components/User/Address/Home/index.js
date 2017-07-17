import React from 'react';
import Header from 'components/Header';
import Link from 'components/Link';
import List from '../List';

export default ({address, fetchAddresses, isManage, toggleManage, onEdit, onDelete, onRowClick}) => <div>
  <Header title="收货地址"/>
  <List
    address={address}
    isManage={isManage}
    onEdit={onEdit}
    onDelete={onDelete}
    onRowClick={onRowClick}
    fetchAddresses={fetchAddresses}
  />
  <Link href={{pathname: `/user_address_add`}}
        className="fixed-bottom bg-white ptb30 flex-wrp flex-center color0 size32">
    <div>新增地址</div>
  </Link>
</div>