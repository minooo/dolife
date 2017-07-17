import React from "react";
import List from 'components/List';
import Item from "./Item";

export default ({cash_redpacket, fetchCashedpackets}) => <List
  isFetching={cash_redpacket.isFetching}
  isMore={cash_redpacket.isMore}
  dataSet={cash_redpacket.redpackets}
  onEndReached={fetchCashedpackets}
  renderRow={(rowData) => <Item redpacket={rowData}/>}
/>