import React from 'react';
import Header from 'components/Header';
import p from 'assets/images/s.gif';
import s from './style.scss';
export default ({shop, toggleFavor, onShowPhotos}) => <div className="relative" style={{height: '43vw'}}>
  <Header
    // title={shop.title}
    className={`color10 w100 ${s.header}`} color="color10" right={<div onClick={toggleFavor}>
    <i className={`i color10 size48 ${shop.isfavor ? 'i-favor-o' : 'i-favor'}`}/>
  </div>}/>
  {shop.thumb && <img src={p} onClick={onShowPhotos} style={{backgroundImage: `url(${shop.cover})`, height: '100%'}}
                      className="bg-cover w100"/>}
</div>