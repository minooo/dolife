import React from 'react';
import List from 'components/List';
import Header from 'components/Header';
import s from './style.scss';
import p from 'assets/images/s.gif';


export default ({tabIndex, inviteConfig, onSwitchTab, inviteLog, fetchInviteLogs}) => <div
  className="flex-wrp flex-cell fullHeight">
  <Header title="会员推荐"/>
  <div className="flex-wrp bg-white border-b">
    <div className="flex-item flex-wrp plr20" onTouchEnd={e => onSwitchTab(0)}>
      <div
        className={`flex-item flex-wrp flex-center ptb20 size32 ${tabIndex == 0 ? `color19 ${s.active}` : 'color16'}`}>
        推荐会员
      </div>
    </div>
    <div className="flex-item flex-wrp plr20" onTouchEnd={e => onSwitchTab(1)}>
      <div
        className={`flex-item flex-wrp flex-center ptb20 size32 ${tabIndex == 1 ? `color19 ${s.active}` : 'color16'}`}>
        我的奖励
      </div>
    </div>
  </div>
  {tabIndex == 0 && <div className="flex-item bg-white lh150" style={{overflowY: 'auto'}}>
    <div className="pd30 color4">
      {inviteConfig.title}
    </div>
    <div className="flex-wrp flex-cell flex-align-center">
      <div className="ptb30">长按二维码保存图片，开始转发拓展吧（^_^）</div>
      <div className="pd30 border">
        <img src={inviteConfig.qrcode} className="img-200"/>
      </div>
    </div>
    <div className="pd30 color4">
      {inviteConfig.rule}
    </div>
  </div>}
  {tabIndex == 1 && <div>
    <div className="flex-wrp bg-white ptb30">
      <div className="flex-item ptb20 plr40">
        <div className="color16 size28">累计推荐(个)</div>
        <div className="color19 size46 pt10">{inviteLog.total_user_num}</div>
      </div>
      <div className="flex-item ptb20 plr40 border-l">
        <div className="color16 size28">累计奖励(元)</div>
        <div className="color19 size46 pt10">{inviteLog.total_bonus}</div>
      </div>
    </div>
    <div>
      <List
        isFetching={inviteLog.isFetching}
        isMore={inviteLog.isMore}
        dataSet={inviteLog.logs}
        onEndReached={fetchInviteLogs}
        renderRow={rowData => <div className="flex-wrp flex-align-center bg-white border-b ptb20 plr30">
          <img className="bg-cover img-80 border-radius" src={p} style={{backgroundImage: `url(${rowData.avatar})`}}/>
          <div className="flex-item size30 color16 pl30">{rowData.nickname}</div>
          <div className="size26 color14">{rowData.time_create}</div>
        </div>}
      />
    </div>
  </div>}
</div>