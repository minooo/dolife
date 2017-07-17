import React from 'react';
import Link from 'components/Link';
import {Button} from 'antd-mobile';
import s from './style.scss';

export default ({result, onFinish, activity, onClickCoupon}) => <div className="bg-white fullHeight">
  <div className="flex-wrp flex-cell flex-center">
    <i className={`ptb50 i i-check-o color0 ${s.icon}`}/>
    <div className="color0 size36">支付成功</div>
    <div className="size52 color3 ptb30"></div>
    {result.credit && <div className="flex-wrp size32">
      <div className="color4">获得积分</div>
      <div className="color7">{result.credit}</div>
    </div>}
  </div>
  <div className="pd30">
    <Button type="ghost" className="bg-main color10" onClick={onFinish}>完成</Button>
  </div>
</div>