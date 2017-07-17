import React from 'react';
import {Carousel} from 'antd-mobile';
import RecordList from '../Record/List';
import p from 'assets/images/s.gif'
import s from './style.scss';
const awardsGrid = [
  [
    {
      index: 1
    },
    {
      index: 2
    },
    {
      index: 3
    },
  ],
  [
    {
      index: 8
    },
    {
      component: (onClick) => <div
        className={`flex-item border-radius10 flex-wrp flex-cell flex-center relative ${s.startBtn}`} onClick={onClick}>
        立即抽奖</div>,
      className: 'flex-wrp flex-align-stretch'
    },
    {
      index: 4
    },
  ],
  [
    {
      index: 7
    },
    {
      index: 6
    },
    {
      index: 5
    },
  ]
]
export default ({lottery, notice, activity, user, fetchUserAwards, modal, showModal, hideModal, onStart, onGetAward, lotteryDialog, lotteryDialogHide, recordDialog, toggleRecordDialog}) =>
  <div className="bg-warn" style={{minHeight: '100vh'}}>
    <div className="relative overflow-hidden">
      <img src={p} className="bg-cover w100 border-radius5"
           style={{backgroundImage: `url(${activity.thumb})`, height: '43vw'}}/>
      <div className={s.lottobg}/>
      <div className={s.rule}
           onClick={() => showModal('活动规则',
             <div
               className={`flex-item size26 pd30 color3 my-img ${s.modalmain}`}
               dangerouslySetInnerHTML={{
                 __html: activity.rule.replace(/:\s*(\d+\.?\d*)px/g, (a, b) => {
                   return `:${b * 0.02}rem`
                 })
               }}/>)}
      >
        <div className="ptb10 plr20 size24 color20">
          <div>活动</div>
          <div>规则</div>
        </div>
        <div className={`relative ${s.ruleArrow}`}/>
      </div>
    </div>
    <div className="pd30">
      <div className={`border-radius20 relative pd30 ${s.wrap}`}>
        <div className={`text-center color10 size28 ${s.title}`}>
          <div className="nowrap">{activity.title}</div>
        </div>
        <div className={`border-radius10 pd10 mt20 ${s.box}`}>
          <div className="flex-wrp bg-deepred border-radius5 mg5 pd10 color20 size24">
            <div>中奖名单：</div>
            <Carousel autoplay className="flex-item" dots={false} infinite vertical>
              {notice.map((n, i) => <div key={i}>{n}</div>)}
            </Carousel>
          </div>
          <div className="ptb5">
            {awardsGrid.map((box, index) => <div className="flex-wrp" key={index}>
              {box.map((n, i) => <div className={`flex-item w0 pd5 ${n.className || ''}`} key={i}>
                {n.component && n.component(onStart)}
                {n.index != undefined && <div
                  className={`border-radius10 flex-wrp flex-cell flex-center pd10 ${s.item} ${n.index == activity.focusIndex && s.focus}`}>
                  {activity.awards[n.index] && activity.awards[n.index].thumb &&
                  <img src={p} className={`border-radius10 w100 ${s.itemImg}`}
                       style={{backgroundImage: `url(${activity.awards[n.index].thumb})`}}/>}
                  {(!activity.awards[n.index] || !activity.awards[n.index].thumb) &&
                  <div className={`flex-wrp flex-center border-radius10 w100 ${s.itemImg}`}><i
                    className={`i i-ku size52 ${s.nothing}`}/></div>}
                  <div
                    className="size28 w100 pt10 nowrap color21 text-center">{activity.awards[n.index] && activity.awards[n.index].title}</div>
                </div>}
              </div>)}
            </div>)}
          </div>
        </div>
        <div className="text-center size28 color20 pt20">剩余{user.stock}次抽奖机会</div>
      </div>
    </div>
    <div className="pd30">
      <div className={`text-center ptb30 border-radius30 color20 ${s.btn}`} onClick={toggleRecordDialog}>我的中奖记录</div>
    </div>


    {modal.show && <div className="mask">
      <div className={`fixed-center bg-white flex-wrp flex-cell relative plr30 border-radius10 ptb50 ${s.modalbox}`}>
        {modal.title && <div className="size28 color21 text-center">{modal.title}</div>}
        {modal.content}
        <div className="close pd10" onClick={hideModal}>
          <i className="i-close size60 color21"/>
        </div>
      </div>
    </div>}

    {recordDialog.show && <div className="mask">
      <div className={`fixed-center bg-white flex-wrp flex-cell relative plr30 border-radius10 ptb50 ${s.modalbox}`}>
        <div className="size28 color21 text-center">中奖详情</div>
        <RecordList
          record={user.record}
          fetchRecords={fetchUserAwards}
          onGetAward={onGetAward}
          className={`flex-item size24 ${s.modalmain}`}
        />
        <div className="close pd10" onClick={toggleRecordDialog}>
          <i className="i-close size60 color21"/>
        </div>
      </div>
    </div>}

    {lotteryDialog.show && <div className="mask flex-wrp flex-center">
      <div className={`bg-white relative ptb50 plr30 border-radius20 ${s.modalbox2}`}>
        {lotteryDialog.win && <div className="pt15 size36 color21 text-center">恭喜您！中奖了</div>}
        <div className="pt50">
          {lotteryDialog.win && lotteryDialog.win.award && <div className="flex-wrp flex-align-stretch pb50">
            <div className="pr20">
              <img src={p} className={`bg-cover border-radius5 ${s.awardImg}`}
                   style={{backgroundImage: `url(${lotteryDialog.win.award.thumb})`}}/>
            </div>
            <div className="flex-item flex-wrp flex-cell">
              <div className="flex-item flex-wrp flex-align-center size28">{lotteryDialog.win.award.title}</div>
              <div
                className="flex-item flex-wrp flex-align-center size24 color4">{lotteryDialog.win.award.time_create}</div>
            </div>
          </div>}
          {!lotteryDialog.win && <div className="text-center size32 color6 pb50">与大奖擦肩而过</div>}
        </div>
        <div className="text-center pt30">
          <div className="plr50">
            {lotteryDialog.win && <div onClick={e => onGetAward(lotteryDialog.win)}
                                       className="border-radius50 mlr50 ptb25 plr50 bg-pink color10">立即领取</div>}
            {!lotteryDialog.win &&
            <div onClick={lotteryDialogHide} className="border-radius50 mlr50 ptb25 plr50 bg-pink color10">继续抽奖</div>}
          </div>
          <div className="size24 color4 pt30">
            <div>剩余抽奖次数：{user.stock}</div>
          </div>
        </div>
        <div className="close pd10" onClick={lotteryDialogHide}>
          <i className="i-close size40 color14"/>
        </div>
      </div>
    </div>}
  </div>