import React from "react";
import List from 'components/List';
import Item from "./Item";

export default ({cash_redpacket, fetchRedpackets, onClickRedpacket}) => <List
  isFetching={cash_redpacket.isFetching}
  isMore={cash_redpacket.isMore}
  dataSet={cash_redpacket.redpackets}
  onEndReached={fetchRedpackets}
  renderRow={(rowData) => <Item redpacket={rowData} onClickRedpacket={onClickRedpacket}/>}
/>