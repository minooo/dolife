import React from 'react';

export default ({win}) => <div className="flex-wrp flex-cell flex-align-center">
  <div style={{flex: 3}}>{win.stock}</div>
  <div className="flex-item text-center">
    <div className="border-radius50 ptb20 plr50 bg-yellow color21">{win.is_win ? '立即领取' : '继续抽奖'}</div>
    <div className="size24 color4 pt20">{win.stock > 0 ? <div>剩余抽奖次数：{win.stock}</div> : <div>您在抽奖机会已用完</div>}</div>
  </div>
</div>