import React from "react";
import Item from "./Item";
import List from 'components/List';

export default ({rim, fetchRims}) => <List
  isFetching={rim.isFetching}
  isMore={rim.isMore}
  dataSet={rim.rims}
  onEndReached={fetchRims}
  renderRow={rowData => <Item rim={rowData}/>}
/>