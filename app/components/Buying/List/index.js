import React from "react";
import List from "components/List";
import Item from "./Item";

export default ({data, loadHandle}) => <List
  isFetching={data.isFetching}
  isMore={data.isMore}
  dataSet={data.buyings}
  onEndReached={loadHandle}
  renderRow={(rowData, sectionID, rowID) => <Item buying={rowData}/>}
/>