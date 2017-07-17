import React from 'react';
import Header from 'components/Header';
import p from 'assets/images/s.gif';
import s from './style.scss';

export default ({user, gift, onBuy}) => <div>
  <Header title="兑换详情"/>
  <div className="relative">
    <img src={p} className="bg-cover w100" style={{backgroundImage: `url(${gift.thumb})`, height: '43vw'}}/>
    <div className={`w100 color10 size28 ${s.title}`}>
      <div className="pd30">{gift.title}</div>
    </div>
  </div>
  <div className="flex-wrp flex-align-center bg-white pd30">
    <div>
      <i className="i i-jf color14 size26"/>
    </div>
    <div className="color7 size32 pl10">{user.is_vip && gift.vip_info ? gift.vip_info.fee : gift.fee}积分</div>
    <div className="flex-item"/>
    {gift.sold > 0 && <div className="color14 size28">{gift.sold}人兑换</div>}
  </div>
  <div className="bg-white pd30 mt20">
    <div className={`size32 color16 pb20 ${s.fontweight}`}>兑换须知</div>
    <div className="color3 lh150">兑换商家：{gift.shop.name}</div>
    <div className="color3 lh150">有效期至：{gift.time_end.substring(0, 10)}</div>
    {gift.limit_num > 0 && <div className="color3 lh150">限兑次数：{gift.limit_num}</div>}
    {gift.limit_time && gift.limit_time > 0 && <div className="color3 lh150">购买期限：{gift.limit_time}</div>}
    <div className={`size32 color16 pt30 ${s.fontweight}`}>兑换说明</div>
    <div className="color3 my-img size24 line12" dangerouslySetInnerHTML={{
      __html: gift.content.replace(/:\s*(\d+\.?\d*)px/g, (a, b) => {
        return `:${b * 0.02}rem`
      })
    }}/>
  </div>
  <div style={{height: '1rem'}}/>
  <div className="fixed-bottom bg-white border-t ptb20">
    <div className="plr30">
      <div className="bg-orange border-radius10 color10 size32 pd25 text-center" onClick={onBuy}>兑换</div>
    </div>
  </div>
</div>