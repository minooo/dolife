import React from 'react';
import Header from 'components/Header'
import s from './style.scss';
export default ({rim, toggleFavor, onShowPhotos, onBuy}) => <div>
  <Header title="活动详情"/>
  <div className=" bg-white">
    <div style={{backgroundImage: `url(${rim.thumb})`}} className={`bg-cover ${s.pt200}`}>
      <div className={`pl15 ${s.bg}`}>
        <div className={`lh150 color10 ${s.fontw}`}>
          {rim.title}
        </div>
        <div className="lh150 color10 ">
          {rim.desc}
        </div>
      </div>
    </div>
    <div className="flex-wrp ptb25 plr20 flex-between flex-end">
      <div className="flex-wrp flex-end">
        <div className="color11">￥<span className="size60">{rim.adult_price}</span></div>
        <div className="color4 size30 plr20 del">立省：{rim.price}</div>
        <div><span className="ptb2 plr4 bg-redpacket2 border-radius5 color10">{rim.sold}人参与</span></div>
      </div>
      <div className="color16">剩余{rim.stock - rim.sold}份</div>
    </div>
    <div className="flex-wrp plr20 ptb20">
      {rim.tags.map((n, i) =>
        <div key={i} className="pr30">
          <sapn className="i-check-o color0 mr10"></sapn>
          {n}</div>
      )}
    </div>
  </div>
  <div className="mt20 bg-white plr20">
    <div className="flex-wrp border-b ptb20">
      <div><i className="i-shijian color0 mr10"/>开团时间：</div>
      <div className="flex-item color16">{rim.time_start}</div>
    </div>
    <div className="flex-wrp ptb20">
      <div><i className="i-map color0 mr10"/>出发地点：</div>
      <div className="flex-item color16">{rim.address}</div>
    </div>
  </div>
  <div className="pl20 ptb30">活动介绍</div>
  <div className="bg-white pd20 lh150 mb50"
       dangerouslySetInnerHTML={{
         __html: [rim.content.replace(/:\s*(\d+\.?\d*)px/g, (a, b) => {
           return `:${b * 0.02}rem`
         })]
       }}/>
  <div className="bg-main ptb30 flex-wrp flex-center fixed-bottom" onClick={onBuy}>
    <span className="color10">去下单</span>
  </div>
</div>