import React from "react";
import List from 'components/List';
import Item from "./Item";

export default ({redpacket, fetchRedpackets, onDelete}) => <List
  isFetching={redpacket.isFetching}
  isMore={redpacket.isMore}
  dataSet={redpacket.redpackets}
  onEndReached={fetchRedpackets}
  renderRow={(rowData) => <Item redpacket={rowData} onDelete={onDelete}/>}
/>