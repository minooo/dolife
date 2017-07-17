import React from "react";
import Header from 'components/Header';
import Filter from 'components/Filter';
import Hot from "./Hot";
import List from "../List";

export default ({shop, config, filter, onSearch, loadShops, onFilter}) => <div className="flex-wrp flex-cell">
  <div className="bg-white">
    <Header.SearchBar currentCity={config.currentCity} onSearch={onSearch} mode="light"/>
  </div>
  {shop.hot && shop.hot.shops && shop.hot.shops.length > 0 && <Hot shops={shop.hot.shops}/>}
  <div className="mt20"/>
  {

    filter && filter.shop && filter.shop.filters && filter.shop.filters.length > 0 &&
    <Filter filter={shop.filter} filters={filter.shop.filters} onFilter={onFilter}/>
  }
  <List
    data={shop}
    header={null}
    loadHandle={loadShops}
  />
</div>