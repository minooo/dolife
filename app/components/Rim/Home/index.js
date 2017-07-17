import React from 'react';
import Header from 'components/Header';
import List from '../List';

export default ({config, category, rim, fetchRims, onSearch, onFilter}) => <div>
  <Header.SearchBar currentCity={config.currentCity} onSearch={onSearch} mode="light" className="bg-white"/>
  {category && category.categorys && category.categorys.length > 0 &&
  <div className="flex-wrp flex-item pt40 pb30 bg-white">
    {category.categorys.map((n, i) => <div onClick={e => onFilter('cid', n.id)} key={i}
                                           className="flex-wrp flex-item flex-cell flex-center">
      <img src={n.thumb} alt=""/>
      <div className="pt15 size28">{n.title}</div>
    </div>)}
  </div>}
  {category && category.locals && category.locals.length > 0 && <div className=" flex-wrp mt20 bg-white border-b">
    {category.locals.map((n, i) => <div onClick={e => onFilter('local_id', n.id)} key={i}
                                        className="flex-wrp flex-center ptb30 border-r size28" style={{width: '25%'}}>
      <span>{n.title}</span></div>)}
  </div>}
  <List
    rim={rim}
    fetchRims={fetchRims}
  />
</div>