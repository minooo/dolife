import React from 'react';
import Header from 'components/Header'
import s from './style.scss';
export default ({onSwitch, status}) => <Header
  // right={<i className="i i-search size42 color3"/>}
>
  <div className={`flex-wrp mtb10 ${s.border}`}>
    <div className={`flex-item ptb10 plr20 ${status == 2 ? `color10 ${s.active}` : 'color0'}`}
         onClick={() => onSwitch(2)}>进行中
    </div>
    <div className={`flex-item ptb10 plr20 ${s.blr} ${status == 1 ? `color10 ${s.active}` : 'color0'}`}
         onClick={() => onSwitch(1)}>待抢购
    </div>
    <div className={`flex-item ptb10 plr20 ${status == 3 ? `color10 ${s.active}` : 'color0'}`}
         onClick={() => onSwitch(3)}>已结束
    </div>
  </div>
</Header>