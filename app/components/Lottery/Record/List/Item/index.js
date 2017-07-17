import React from 'react';
import p from 'assets/images/s.gif';

export default ({record, onGetAward}) => <div className="flex-wrp flex-align-center ptb30 border-t">
  <img src={p} className="bg-cover border-radius img-90" style={{backgroundImage: `url(${record.award.thumb})`}}/>
  <div className="flex-item plr20">
    <div className="size28">{record.award.title}</div>
    <div className="pt20 color4">{record.winning_time}</div>
  </div>
  <div className={`text-center border-radius50 ptb20 plr30 ${record.is_get ? 'bg-smoke' : 'bg-pink color10'}`}
       onClick={e => onGetAward(record)}>
    {record.is_get ? `已领取` : `立即领取`}
  </div>
</div>