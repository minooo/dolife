import React from 'react';
import Header from 'components/Header';
import p from 'assets/images/s.gif';

export default ({priviege}) => <div className="flex-wrp flex-cell flex-align-stretch" style={{minHeight: '100vh'}}>
  <Header title="会员特权"/>
  <div className="bg-white flex-wrp flex-cell flex-align-center pb30">
    <div className="flex-wrp flex-center ptb20">
      <img src={p} className="bg-fill img-80" style={{backgroundImage: `url(${priviege.icon})`}}/>
    </div>
    <div className="size30 color16">{priviege.title}</div>
    <div className="size30 color4 pd20">{priviege.desc}</div>
  </div>
  <div className="flex-item mt20 pd30 bg-white">
    <div className="size32 color4">权益详情</div>
    <div
      className="size28 color4 lh150 pt30 my-img"
      dangerouslySetInnerHTML={{
        __html: priviege.content.replace(/:\s*(\d+\.?\d*)px/g, (a, b) => {
          return `:${b * 0.02}rem`
        })
      }}/>
  </div>
</div>