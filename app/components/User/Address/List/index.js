import React from 'react';
import List from 'components/List';
import Item from './Item';

export default ({address, fetchAddresses, isManage, onEdit, onDelete, onRowClick}) => <List
  dataSet={address.addresses}
  isFetching={address.isFetching}
  isMore={address.isMore}
  onEndReached={fetchAddresses}
  renderRow={(rowData) => <Item
    address={rowData}
    isManage={isManage}
    onEdit={onEdit}
    onDelete={onDelete}
    onRowClick={onRowClick}
  />}
/>