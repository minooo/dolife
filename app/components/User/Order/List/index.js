import React from "react";
import List from "components/List";
import Item from "./Item";

export default ({order, fetchOrders, onPay, onComment}) => <List
  isFetching={order.isFetching}
  isMore={order.isMore}
  dataSet={order.orders}
  onEndReached={fetchOrders}
  renderRow={(rowData) => <Item order={rowData} onPay={onPay} onComment={onComment}/>}
/>