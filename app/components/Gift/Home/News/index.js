import React from 'react';
import s from './style.scss';
export default ({news}) => {
  return <div className="mt20 bg-white flex-wrp ptb20">
    <div className="plr30 border-r">
      <i className="i i-dtbb size62 color7"/>
    </div>
    <div className="flex-item flex-wrp plr30">
      <div className={`flex-item color4 size26 relative overflow-hidden ${s.wrap}`}>
        <div className={`nowrap ${s.animat}`} style={{animationDuration: `${news.join('　　').length / 2}s`}}>
          {news.join('　　')}
        </div>
      </div>
    </div>
  </div>
}