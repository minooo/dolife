import React from "react";
import List from 'components/List';
import Item from "./Item";

export default ({record, fetchRecords, className, onGetAward}) => <List
  className={className}
  useBodyScroll={false}
  isFetching={record.isFetching}
  isMore={record.isMore}
  dataSet={record.records}
  onEndReached={fetchRecords}
  renderRow={(rowData) => <Item record={rowData} onGetAward={onGetAward}/>}
/>