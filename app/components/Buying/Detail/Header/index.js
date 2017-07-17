import React from 'react';
import Header from 'components/Header'
import p from 'assets/images/s.gif';
import s from './style.scss';
export default ({buying, toggleFavor, onShowPhotos}) => <div className="relative">
  <Header
    className={`color10 w100 ${s.header}`}
    color="color10"
    right={<div onClick={toggleFavor}>
      <i className={`i color10 size48 ${buying.isfavor ? 'i-favor-o' : 'i-favor'}`}/>
    </div>}
  />
  {buying.thumb && <div style={{height: '43vw'}}>
    <img src={p} style={{backgroundImage: `url(${buying.thumb})`, height: '100%'}} className="bg-cover w100"
         onClick={onShowPhotos}/>
    <div className={`pb10 ${s.bg}`}>
      {buying.title && <div className={`size30 color10 pl30 pt20 pb10 ${s.title}`}>{buying.title}</div>}
      <div className={`flex-wrp flex-between`}>
        <div className={`pl30`}>
                    <span className="flex-wrp color10 size26 flex-align-center">
                        <i className="i i-yy pr10 color10 size26"/>
                      {buying.invitation ? '需预约' : '免预约'}
                    </span>
        </div>
        <div className={`pr30`}>
          <i className="i i-hot color7 size20 pl25"/>
          <span className="size20 color10">{buying.views}人在关注</span>
        </div>
      </div>
    </div>
  </div>}
</div>