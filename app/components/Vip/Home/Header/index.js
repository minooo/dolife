import React from "react";
import Header from "components/Header";
import Link from "components/Link";
import p from "assets/images/s.gif";
import bg from "assets/images/vip_header_bg.png";
import tuijian from "assets/images/tuijian.png";
import s from "./style.scss";

export default ({user, vip, onShare, share}) => <div className="relative">
  <Header title="会员卡" className={`color10 w100 ${s.header}`} color="color10"
          right={<Link href={{pathname: '/vip_help'}}>
            <i className={`i color10 size48 i-help`}/>
          </Link>}/>
  <div className={`bg-deepblue ${s.headerBox}`} style={{backgroundImage: `url(${bg})`}}>
    <div className="ptb45"/>
    <div className="flex-wrp flex-between pt20 pb10">
      <Link
        href={{pathname: '/vip_level'}}
        className="flex-wrp flex-cell flex-center"
        style={{width: '33%'}}
      >
        <div className={`bg-smoke img-70 border-radius flex-wrp flex-center border ${s.border}`}>
          <i className={`i ${user.is_vip ? 'i-tqhy' : 'i-pthy'} i-tqhy size40 ${user.is_vip ? 'color18' : 'color14'}`}/>
        </div>
        <div className="color15 size26 pt30">{user.is_vip ? '特权会员' : '普通会员'}</div>
      </Link>
      <div className="flex-item flex-wrp flex-cell flex-center" style={{width: '34%'}}>
        <img src={p} style={{backgroundImage: `url(${user.avatar})`}}
             className={`bg-cover img-150 border-radius border ${s.border}`}/>
        <div className="color15 size32 pt30">{user.nickname || '昵称'}</div>
      </div>
      <div
        // href={{pathname:'/vip_rank_about'}}
        className="flex-item flex-wrp flex-cell flex-center"
        style={{width: '33%'}}
      >
        <div className={`bg-smoke img-70 border-radius flex-wrp flex-center border ${s.border}`}>
          <i className="i i-phb size32 color18"/>
        </div>
        <div className="color15 size26 pt30">消费排名{vip.ranking}</div>
      </div>
    </div>
    <div className="flex-wrp flex-align-center flex-between">
      {user.is_vip && <Link onClick={e => onShare(1)}
                            className="flex-wrp flex-align-center color18 bg-yellow ptb15 plr20 border-radius50 mr10"
                            style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, width: '2.1rem'}}>
        <i className="i i-left size18" style={{lineHeight: '80%'}}/>
        <div className="pr10 size28">推荐好友</div>
        <i className="i i-tj size28" style={{lineHeight: '90%'}}/>
      </Link>}
      <div className="color15 size24 ptb30 text-center flex-item">昨天你超越了{Math.round(vip.yesterday_over)}%小伙伴</div>
      {user.is_vip && <Link
        href={{pathname: '/order_vip'}}
        className="flex-wrp flex-align-center color18 bg-yellow ptb15 plr20 border-radius50 ml10"
        style={{borderTopRightRadius: 0, borderBottomRightRadius: 0, width: '2.14rem', wordWrap: 'break-word'}}>
        <i className="i i-xfhy size32" style={{lineHeight: '90%'}}/>
        <div className="pl10 size28">续费会员</div>
        <i className="i i-right size18" style={{lineHeight: '80%'}}/>
      </Link>}
    </div>
    <div className="pt30"/>
    <div className="relative">
      <Link href={{pathname: '/gift'}}
            className={`block bg-deepblue color15 size28 ptb15 plr40 border-radius40 border ${s.border} ${s.creditLabel}`}>我的积分{user.credit}</Link>
    </div>
  </div>
  <div className="pb20 pt30"/>

  {share == 1 && <div className={`flex-wrp flex-cell flex-item ${s.model}`}>
    <div className="flex-wrp flex-reverse flex-item">
      <div className="flex-item bg-fill" style={{backgroundImage: `url(${tuijian})`}}/>
    </div>
    <div className={`flex-wrp flex-center`} style={{flex: 2}} onClick={e => onShare(0)}>
      <div className={` ptb20 plr45 size30 color10 ${s.button}`}>知道啦</div>
    </div>
  </div>}
</div>