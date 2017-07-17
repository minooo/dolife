import React from 'react';
import Header from 'components/Header';

export default ({helpers}) => <div>
  <Header title="会员帮助中心"/>
  {helpers.map((n, i) => <div key={i}>
    <div className="flex-wrp flex-align-center pd30">
      <div><i className={`i ${n.icon} color15 size32`}/></div>
      <div className="size32 pl10">{n.title}</div>
    </div>
    <div className="bg-white pd30 lh150 color3 size26">{n.content}</div>
  </div>)}
</div>