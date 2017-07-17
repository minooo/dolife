import React from 'react';
import Loading from 'components/Loading';

export default ({user, config, onSign}) => <div className="bg-white flex-wrp flex-align-center pd30 border-t">
  <img src={user.avatar} className="img-90 border-radius"/>
  <div className="flex-item pl15">
    <div className="size32 color7">{user.credit}积分</div>
    <div className="size26 color14 pt15">今日签到可领取{config.credit.sign}积分</div>
  </div>
  <div className={`ptb20 plr30 border-radius50 size28 ${user.is_sign ? 'bg-gray color3' : 'bg-orange color10'}`}>
    <div className="plr30" onClick={onSign}>
      {user.signFetching && <Loading text=""/>}
      {!user.signFetching && (user.is_sign ? '已签到' : '签到')}
    </div>
  </div>
</div>